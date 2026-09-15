import { UserProfile, AccountStatus, MfaFactor, MfaAssuranceLevel, MfaAssuranceResult, MfaEnrollResult, Language } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { getCurrentUser, saveCurrentUser, getDefaultUser, getAdminUser, syncUserDataFromSupabase, isDemoUser } from './storageService';

export interface AuthResponse {
  success: boolean;
  user?: UserProfile;
  error?: string;
  needsVerification?: boolean;
  needsMfa?: boolean;
  mfaFactorId?: string;
  email?: string;
  status?: AccountStatus;
}

const OTP_COOLDOWN_SECONDS = 60;
const PWD_RESET_COOLDOWN_SECONDS = 60;

export const getOtpCooldownRemaining = (email: string): number => {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return 0;
  try {
    const raw = sessionStorage.getItem(`4tm_otp_sent_${trimmed}`);
    if (!raw) return 0;
    const sentTime = parseInt(raw, 10);
    if (isNaN(sentTime)) return 0;
    const elapsed = Math.floor((Date.now() - sentTime) / 1000);
    return Math.max(0, OTP_COOLDOWN_SECONDS - elapsed);
  } catch {
    return 0;
  }
};

export const recordOtpSent = (email: string): void => {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return;
  try {
    sessionStorage.setItem(`4tm_otp_sent_${trimmed}`, Date.now().toString());
  } catch {
    // Ignore storage errors in restricted iframe environments
  }
};

/**
 * Resolves the canonical application base URL for redirects (e.g. password recovery).
 * Priority:
 * 1. Explicit VITE_APP_URL or APP_URL from runtime / build config.
 * 2. window.location.origin from current browser runtime.
 * 3. Localhost fallback (http://localhost:3000).
 */
export const getAppBaseUrl = (): string => {
  const envUrl = (
    import.meta.env.VITE_APP_URL ||
    (import.meta.env as any).APP_URL ||
    ''
  ).trim();

  if (envUrl && envUrl !== 'MY_APP_URL') {
    return envUrl.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }

  return 'http://localhost:3000';
};

export const getPasswordResetCooldownRemaining = (email: string): number => {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return 0;
  try {
    const raw = sessionStorage.getItem(`4tm_pwd_reset_sent_${trimmed}`);
    if (!raw) return 0;
    const sentTime = parseInt(raw, 10);
    if (isNaN(sentTime)) return 0;
    const elapsed = Math.floor((Date.now() - sentTime) / 1000);
    return Math.max(0, PWD_RESET_COOLDOWN_SECONDS - elapsed);
  } catch {
    return 0;
  }
};

export const recordPasswordResetSent = (email: string): void => {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) return;
  try {
    sessionStorage.setItem(`4tm_pwd_reset_sent_${trimmed}`, Date.now().toString());
  } catch {
    // Ignore storage errors in restricted iframe environments
  }
};

export const authService = {
  getCurrentUser(): UserProfile {
    return getCurrentUser();
  },

  async initializeAuthSession(): Promise<UserProfile | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // If MFA is required for this user (nextLevel === 'aal2' and currentLevel !== 'aal2')
          // Do not restore as an active authenticated session
          const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
          if (aal?.nextLevel === 'aal2' && aal?.currentLevel !== 'aal2') {
            await supabase.auth.signOut();
            localStorage.removeItem('4tm_user_profile');
            return null;
          }

          const syncedUser = await syncUserDataFromSupabase(session.user.id);
          if (syncedUser) {
            // Check if suspended
            if (syncedUser.status === 'suspended') {
              await supabase.auth.signOut();
              localStorage.removeItem('4tm_user_profile');
              const defaultUser = getDefaultUser();
              saveCurrentUser(defaultUser);
              return defaultUser;
            }
            saveCurrentUser(syncedUser);
            return syncedUser;
          }
        } else {
          // No authenticated Supabase session: purge stale stored user to prevent leakage
          localStorage.removeItem('4tm_user_profile');
          return null;
        }
      } catch (err) {
        console.error('Failed to restore Supabase auth session:', err);
        localStorage.removeItem('4tm_user_profile');
      }
    }
    return null;
  },

  async signUp(email: string, password: string, displayName: string): Promise<AuthResponse> {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      return { success: false, error: 'Email and password are required.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        error: 'Authentication service is not configured. Please verify Supabase environment settings.'
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: { display_name: displayName.trim() || trimmedEmail.split('@')[0] }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Record OTP sent timestamp for cooldown tracking
      recordOtpSent(trimmedEmail);

      // Email OTP is sent via Supabase Auth + Resend SMTP
      return {
        success: true,
        needsVerification: true,
        email: trimmedEmail,
        status: 'pending_verification'
      };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to sign up.' };
    }
  },

  async verifyOtp(email: string, token: string): Promise<AuthResponse> {
    const trimmedEmail = email.trim().toLowerCase();
    const cleanToken = token.trim();

    if (!cleanToken || cleanToken.length !== 6 || !/^\d{6}$/.test(cleanToken)) {
      return { success: false, error: 'Please enter a valid 6-digit verification code.' };
    }

    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        error: 'Authentication service is not configured. Verification is unavailable.'
      };
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: trimmedEmail,
        token: cleanToken,
        type: 'signup'
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // 1. Obtain and verify the current Supabase session
      let session = data?.session;
      if (!session) {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          return {
            success: false,
            error: sessionError.message || 'Failed to retrieve authenticated session.'
          };
        }
        session = sessionData?.session;
      }

      // 2. Only call confirm_user_email when an authenticated session is available
      if (!session || !session.user) {
        return {
          success: false,
          error: 'Email verified in Auth, but active session could not be established. Please sign in.'
        };
      }

      // 3. Transition profile from pending_verification to pending_approval via secure RPC
      const { data: rpcData, error: rpcError } = await supabase.rpc('confirm_user_email');
      if (rpcError) {
        console.error('confirm_user_email RPC error:', rpcError);
        return {
          success: false,
          error: rpcError.message || 'Failed to update account status. Please try again.'
        };
      }

      if (rpcData && typeof rpcData === 'object' && 'success' in rpcData && !rpcData.success) {
        return {
          success: false,
          error: (rpcData as any).message || 'Failed to update account status.'
        };
      }

      // 4 & 5. Only sync and set local user state to pending_approval & emailVerified after RPC succeeds
      const userId = session.user.id || data?.user?.id;
      const syncedUser = userId ? await syncUserDataFromSupabase(userId) : null;
      const currentUser = getCurrentUser();

      const verifiedUser: UserProfile = syncedUser || {
        ...currentUser,
        id: userId || currentUser.id,
        email: trimmedEmail,
        status: 'pending_approval',
        emailVerified: true,
      };

      verifiedUser.status = 'pending_approval';
      verifiedUser.emailVerified = true;
      saveCurrentUser(verifiedUser);

      return {
        success: true,
        user: verifiedUser,
        status: 'pending_approval'
      };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Verification failed. Please try again.' };
    }
  },

  async resendOtp(email: string): Promise<{ success: boolean; error?: string }> {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, error: 'Email is required to resend verification code.' };
    }

    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        error: 'Authentication service is not configured. Unable to resend verification code.'
      };
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: trimmedEmail,
      });
      if (error) {
        const msg = error.message.toLowerCase();
        if (msg.includes('60 seconds') || msg.includes('security purposes') || (error as any).status === 429) {
          recordOtpSent(trimmedEmail);
        }
        return { success: false, error: error.message };
      }
      recordOtpSent(trimmedEmail);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to resend code.' };
    }
  },

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

        if (error) {
          // Detect unconfirmed email state
          const msg = error.message.toLowerCase();
          if (msg.includes('email not confirmed') || msg.includes('not verified')) {
            return {
              success: false,
              error: 'Please verify your email address to continue.',
              needsVerification: true,
              email: trimmedEmail,
              status: 'pending_verification'
            };
          }
          return { success: false, error: error.message };
        }

        // Check MFA assurance level
        const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aal?.nextLevel === 'aal2' && aal?.currentLevel !== 'aal2') {
          // TOTP Challenge is required. Do NOT finalize/save the user as authenticated yet.
          const { data: factorData } = await supabase.auth.mfa.listFactors();
          const verifiedFactor = factorData?.totp?.find((f: any) => f.status === 'verified');
          if (verifiedFactor) {
            return {
              success: true,
              needsMfa: true,
              mfaFactorId: verifiedFactor.id,
              email: trimmedEmail,
            };
          }
        }

        // Pull full cloud state from Supabase
        const syncedUser = await syncUserDataFromSupabase(data.user.id);
        if (syncedUser) {
          if (syncedUser.status === 'suspended') {
            await supabase.auth.signOut();
            return {
              success: false,
              error: 'Your account has been suspended by an administrator.',
              status: 'suspended'
            };
          }
          return { success: true, user: syncedUser, status: syncedUser.status };
        }

        const user: UserProfile = {
          id: data.user.id,
          email: data.user.email || trimmedEmail,
          displayName: data.user.user_metadata?.display_name || trimmedEmail.split('@')[0],
          preferredLanguage: 'en',
          role: 'user',
          status: data.user.email_confirmed_at ? 'pending_approval' : 'pending_verification',
          emailVerified: !!data.user.email_confirmed_at,
          xp: 0,
          streak: 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          lessonProgress: {},
          topicMastery: {},
          bookmarks: [],
          notes: [],
          achievements: [],
        };
        saveCurrentUser(user);
        return { success: true, user, status: user.status };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Sign in failed.' };
      }
    }

    // Quick demo handling (dev only)
    if (trimmedEmail === 'admin@4tm.dev') {
      if (!import.meta.env.DEV) {
        return { success: false, error: 'Admin demo is unavailable in production.' };
      }
      const admin = getAdminUser();
      saveCurrentUser(admin);
      return { success: true, user: admin, status: 'active' };
    }

    return {
      success: false,
      error: 'Authentication service is not configured. Please verify Supabase environment settings.'
    };
  },

  loginAsDemoStudent(): UserProfile {
    const student = getDefaultUser();
    saveCurrentUser(student);
    return student;
  },

  loginAsDemoAdmin(): UserProfile {
    if (!import.meta.env.DEV) {
      return this.loginAsDemoStudent();
    }
    const admin = getAdminUser();
    saveCurrentUser(admin);
    return admin;
  },

  async signOut(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut().catch(() => null);
    }
    localStorage.removeItem('4tm_user_profile');
    localStorage.removeItem('4tm_lesson_progress');
    localStorage.removeItem('4tm_bookmarks');
    localStorage.removeItem('4tm_notes');
    localStorage.removeItem('4tm_topic_mastery');
    localStorage.removeItem('4tm_quiz_attempts');
    const defaultUser = getDefaultUser();
    saveCurrentUser(defaultUser);
  },

  async resetPasswordForEmail(email: string): Promise<{ success: boolean; error?: string }> {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, error: 'Email is required.' };
    }

    const remaining = getPasswordResetCooldownRemaining(trimmedEmail);
    if (remaining > 0) {
      return { 
        success: false, 
        error: `Please wait ${remaining} seconds before requesting another password reset.` 
      };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const redirectTo = getAppBaseUrl();
        const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
          redirectTo,
        });

        if (error) {
          const errMsg = error.message.toLowerCase();
          if (errMsg.includes('60 seconds') || errMsg.includes('security purposes') || errMsg.includes('rate limit')) {
            recordPasswordResetSent(trimmedEmail);
          }
          return { success: false, error: error.message };
        }

        recordPasswordResetSent(trimmedEmail);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Failed to send password reset email.' };
      }
    }

    return {
      success: false,
      error: 'Authentication service is not configured. Please verify Supabase environment settings.'
    };
  },

  async updateUserPassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    if (!isSupabaseConfigured || !supabase) {
      return {
        success: false,
        error: 'Authentication service is not configured. Please verify Supabase environment settings.'
      };
    }

    try {
      // Ensure there is an active session
      const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
      if (sessionErr || !sessionData?.session) {
        return {
          success: false,
          error: 'Your password reset session has expired or is invalid. Please request a new link.'
        };
      }

      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data.user) {
        return { success: false, error: 'Password update failed. Please try again.' };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update password.' };
    }
  },

  async updateProfile(updates: {
    displayName?: string;
    avatar?: string;
    preferredLanguage?: Language;
  }): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      const current = getCurrentUser();
      const updated: UserProfile = {
        ...current,
        ...(updates.displayName !== undefined ? { displayName: updates.displayName.trim() } : {}),
        ...(updates.avatar !== undefined ? { avatar: updates.avatar } : {}),
        ...(updates.preferredLanguage !== undefined ? { preferredLanguage: updates.preferredLanguage } : {}),
      };
      saveCurrentUser(updated);
      return { success: true, user: updated };
    }

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        return { success: false, error: 'User is not authenticated.' };
      }

      const patch: {
        display_name?: string;
        avatar?: string;
        preferred_language?: string;
        updated_at: string;
      } = {
        updated_at: new Date().toISOString(),
      };

      if (updates.displayName !== undefined) {
        const trimmed = updates.displayName.trim();
        if (trimmed.length < 2) {
          return { success: false, error: 'Display name must be at least 2 characters.' };
        }
        if (trimmed.length > 50) {
          return { success: false, error: 'Display name cannot exceed 50 characters.' };
        }
        patch.display_name = trimmed;
      }

      if (updates.avatar !== undefined) {
        patch.avatar = updates.avatar;
      }

      if (updates.preferredLanguage !== undefined) {
        patch.preferred_language = updates.preferredLanguage;
      }

      // Strictly update ONLY safe, non-sensitive columns
      const { error: dbError } = await supabase
        .from('profiles')
        .update(patch)
        .eq('id', userData.user.id);

      if (dbError) {
        return { success: false, error: dbError.message };
      }

      // Update current user in local cache
      const current = getCurrentUser();
      const updated: UserProfile = {
        ...current,
        ...(patch.display_name !== undefined ? { displayName: patch.display_name } : {}),
        ...(patch.avatar !== undefined ? { avatar: patch.avatar } : {}),
        ...(patch.preferred_language !== undefined ? { preferredLanguage: patch.preferred_language as Language } : {}),
      };
      saveCurrentUser(updated);

      return { success: true, user: updated };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update profile.' };
    }
  },

  // --- Native Supabase TOTP MFA (Phase 3) ---

  async getMfaAssuranceLevel(): Promise<MfaAssuranceResult | null> {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (error || !data) return null;
      return {
        currentLevel: (data.currentLevel as MfaAssuranceLevel) || null,
        nextLevel: (data.nextLevel as MfaAssuranceLevel) || null,
        currentAuthenticationMethods: data.currentAuthenticationMethods || [],
      };
    } catch {
      return null;
    }
  },

  async listMfaFactors(): Promise<{
    all: MfaFactor[];
    totp: MfaFactor[];
    verifiedTotp: MfaFactor[];
    unverifiedTotp: MfaFactor[];
  }> {
    if (!isSupabaseConfigured || !supabase) {
      return { all: [], totp: [], verifiedTotp: [], unverifiedTotp: [] };
    }
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error || !data) {
        return { all: [], totp: [], verifiedTotp: [], unverifiedTotp: [] };
      }

      const mapFactor = (f: any): MfaFactor => ({
        id: f.id,
        factorType: (f.factor_type || f.factorType || 'totp') as 'totp',
        friendlyName: f.friendly_name || f.friendlyName,
        status: (f.status || 'unverified') as 'verified' | 'unverified',
        createdAt: f.created_at || f.createdAt || '',
        updatedAt: f.updated_at || f.updatedAt || '',
      });

      // Supabase GoTrue puts all factors (verified and unverified) into data.all.
      // Notice: data.totp in GoTrue contains ONLY verified factors.
      // Therefore, we must inspect data.all to capture both verified and unverified TOTP factors.
      const all = (data.all || []).map(mapFactor);
      const totp = all.filter(f => f.factorType === 'totp');
      const verifiedTotp = totp.filter(f => f.status === 'verified');
      const unverifiedTotp = totp.filter(f => f.status === 'unverified');

      return { all, totp, verifiedTotp, unverifiedTotp };
    } catch {
      return { all: [], totp: [], verifiedTotp: [], unverifiedTotp: [] };
    }
  },

  async enrollTotpFactor(): Promise<{
    success: boolean;
    data?: MfaEnrollResult;
    error?: string;
  }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service is not configured.' };
    }

    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userData?.user) {
        return { success: false, error: 'You must be signed in to enroll in two-step verification.' };
      }

      // Step 1: Inspect existing TOTP factors before calling enroll()
      const factorList = await this.listMfaFactors();

      // If user already has a verified TOTP factor, NEVER re-enroll or delete it
      if (factorList.verifiedTotp.length > 0) {
        return {
          success: false,
          error: 'Two-step verification is already enabled on this account.'
        };
      }

      // Step 2: Clean up any incomplete/unverified draft TOTP factors.
      // Supabase listFactors() does not return the secret or qr_code for security reasons (RFC 6238),
      // so an unverified factor cannot be resumed without them.
      // We safely remove only unverified factors with mfa.unenroll() to prevent "already configured" errors.
      for (const unverified of factorList.unverifiedTotp) {
        try {
          await supabase.auth.mfa.unenroll({ factorId: unverified.id });
        } catch (cleanupErr) {
          console.warn('Failed to clean up incomplete unverified factor:', unverified.id, cleanupErr);
        }
      }

      // Step 3: Now call mfa.enroll()
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        issuer: '4TM',
        friendlyName: userData.user.email || '4TM User',
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data || !data.totp) {
        return { success: false, error: 'Invalid response from authenticator enrollment.' };
      }

      return {
        success: true,
        data: {
          factorId: data.id,
          secret: data.totp.secret,
          qrCodeSvg: data.totp.qr_code,
          uri: data.totp.uri,
        },
      };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to start authenticator enrollment.' };
    }
  },

  async verifyAndActivateTotp(factorId: string, code: string): Promise<{ success: boolean; error?: string }> {
    const cleanCode = code.trim();
    if (!cleanCode || cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
      return { success: false, error: 'Please enter a valid 6-digit verification code.' };
    }

    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service is not configured.' };
    }

    try {
      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: cleanCode,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Confirm session is now AAL2
      const aal = await this.getMfaAssuranceLevel();
      if (aal?.currentLevel !== 'aal2') {
        return { success: false, error: 'Verification succeeded but session assurance level was not updated to AAL2.' };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Verification failed.' };
    }
  },

  async challengeAndVerifyLoginTotp(factorId: string, code: string): Promise<AuthResponse> {
    const cleanCode = code.trim();
    if (!cleanCode || cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
      return { success: false, error: 'Please enter a valid 6-digit code.' };
    }

    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service is not configured.' };
    }

    try {
      const { error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: cleanCode,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Confirm session is now AAL2
      const aal = await this.getMfaAssuranceLevel();
      if (aal?.currentLevel !== 'aal2') {
        return { success: false, error: 'Verification failed to achieve AAL2 assurance.' };
      }

      // Session is now confirmed AAL2. Retrieve current user and sync authoritative profile.
      const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
      if (sessionErr || !sessionData?.session?.user) {
        return { success: false, error: 'Failed to retrieve authenticated session.' };
      }

      const userObj = sessionData.session.user;
      const syncedUser = await syncUserDataFromSupabase(userObj.id);
      if (syncedUser) {
        if (syncedUser.status === 'suspended') {
          await supabase.auth.signOut();
          return {
            success: false,
            error: 'Your account has been suspended by an administrator.',
            status: 'suspended',
          };
        }
        saveCurrentUser(syncedUser);
        return { success: true, user: syncedUser, status: syncedUser.status };
      }

      const user: UserProfile = {
        id: userObj.id,
        email: userObj.email || '',
        displayName: userObj.user_metadata?.display_name || (userObj.email || '').split('@')[0],
        preferredLanguage: 'en',
        role: 'user',
        status: userObj.email_confirmed_at ? 'pending_approval' : 'pending_verification',
        emailVerified: !!userObj.email_confirmed_at,
        xp: 0,
        streak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        lessonProgress: {},
        topicMastery: {},
        bookmarks: [],
        notes: [],
        achievements: [],
      };
      saveCurrentUser(user);
      return { success: true, user, status: user.status };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Verification failed.' };
    }
  },

  async unenrollTotpFactor(factorId: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service is not configured.' };
    }

    try {
      // Disabling must require strong authentication (AAL2)
      const aal = await this.getMfaAssuranceLevel();
      if (aal?.currentLevel !== 'aal2') {
        return {
          success: false,
          error: 'Two-step verification is required to disable 2FA. Current assurance is insufficient.',
        };
      }

      const { error } = await supabase.auth.mfa.unenroll({
        factorId,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to disable two-step verification.' };
    }
  },

  isAdmin(): boolean {
    const user = getCurrentUser();
    if (!user || user.status !== 'active') return false;
    if (isDemoUser(user)) {
      return import.meta.env.DEV && user.role === 'admin';
    }
    return user.role === 'admin';
  },

  async verifyAdminSession(): Promise<boolean> {
    const user = getCurrentUser();
    if (!user || user.status !== 'active' || user.role !== 'admin') return false;
    if (isDemoUser(user)) {
      return import.meta.env.DEV;
    }
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aal?.nextLevel === 'aal2' && aal?.currentLevel !== 'aal2') {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    }
    return true;
  }
};

export const signInUser = (email: string, pass: string) => authService.signIn(email, pass);
export const signUpUser = (email: string, pass: string, name: string) => authService.signUp(email, pass, name);
export const verifyUserOtp = (email: string, token: string) => authService.verifyOtp(email, token);
export const resendUserOtp = (email: string) => authService.resendOtp(email);
export const resetUserPassword = (email: string) => authService.resetPasswordForEmail(email);
export const updateUserPassword = (password: string) => authService.updateUserPassword(password);
export const updateProfile = (updates: Parameters<typeof authService.updateProfile>[0]) => authService.updateProfile(updates);
export const enrollTotpMfa = () => authService.enrollTotpFactor();
export const enrollTotpFactor = () => authService.enrollTotpFactor();
export const verifyAndActivateTotpMfa = (factorId: string, code: string) => authService.verifyAndActivateTotp(factorId, code);
export const verifyAndActivateTotp = (factorId: string, code: string) => authService.verifyAndActivateTotp(factorId, code);
export const challengeAndVerifyLoginMfa = (factorId: string, code: string) => authService.challengeAndVerifyLoginTotp(factorId, code);
export const unenrollTotpMfa = (factorId: string) => authService.unenrollTotpFactor(factorId);
export const unenrollTotpFactor = (factorId: string) => authService.unenrollTotpFactor(factorId);
export const listUserMfaFactors = () => authService.listMfaFactors();
export const listMfaFactors = () => authService.listMfaFactors();
export const getStoredUser = () => authService.getCurrentUser();
export const saveUserToStorage = (user: UserProfile) => saveCurrentUser(user);
export const clearStoredUser = () => authService.signOut();
