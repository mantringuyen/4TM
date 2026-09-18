import { supabase } from './supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import { fetchSystemSettings, isPublicRegistrationEnabled } from '@shared';

export interface AuthResult {
  success: boolean;
  user?: User | null;
  session?: Session | null;
  error?: string | null;
}

export const authService = {
  /**
   * Returns current active session if configured
   */
  async getSession(): Promise<Session | null> {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  /**
   * Signs in user with email & password
   */
  async signInWithPassword(email: string, password: string): Promise<AuthResult> {
    if (!supabase) return { success: false, error: 'Supabase client is not configured' };
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      return { success: true, user: data.user, session: data.session };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Authentication error' };
    }
  },

  /**
   * Signs up user with email & password
   */
  async signUp(email: string, password: string): Promise<AuthResult> {
    if (!supabase) return { success: false, error: 'Supabase client is not configured' };
    
    // Check global public registration setting
    try {
      const settings = await fetchSystemSettings(supabase);
      if (!settings.public_registration_enabled) {
        return {
          success: false,
          error: 'Public registration is currently unavailable. Please contact an administrator.',
        };
      }
    } catch {
      if (!isPublicRegistrationEnabled()) {
        return {
          success: false,
          error: 'Public registration is currently unavailable. Please contact an administrator.',
        };
      }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : 'https://4tm.io.vn',
        },
      });
      if (error) return { success: false, error: error.message };
      return { success: true, user: data.user, session: data.session };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Sign up error' };
    }
  },

  /**
   * Signs in user with Magic Link OTP
   */
  async signInWithOtp(email: string): Promise<AuthResult> {
    if (!supabase) return { success: false, error: 'Supabase client is not configured' };
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : 'https://4tm.io.vn',
        },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'OTP request error' };
    }
  },

  /**
   * Triggers Google OAuth sign-in targeting Root as redirect origin
   */
  async signInWithGoogle(): Promise<AuthResult> {
    if (!supabase) return { success: false, error: 'Supabase client is not configured' };
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: typeof window !== 'undefined' ? window.location.origin : 'https://4tm.io.vn',
        },
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Google OAuth error' };
    }
  },

  /**
   * Triggers password reset email
   */
  async resetPassword(email: string): Promise<AuthResult> {
    if (!supabase) return { success: false, error: 'Supabase client is not configured' };
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : 'https://4tm.io.vn',
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Reset password error' };
    }
  },

  /**
   * Signs out current user on Root origin
   */
  async signOut(): Promise<{ error?: AuthError | null }> {
    if (!supabase) return { error: null };
    return await supabase.auth.signOut();
  },
};
