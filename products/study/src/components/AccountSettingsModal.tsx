import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Sun, 
  Moon, 
  Laptop, 
  Copy, 
  Check, 
  KeyRound, 
  ArrowLeft, 
  RefreshCw, 
  Mail, 
  Globe, 
  Lock, 
  AlertCircle, 
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme, ThemeMode } from '../theme/ThemeContext';
import { 
  authService, 
  enrollTotpFactor, 
  verifyAndActivateTotp, 
  unenrollTotpFactor, 
  listMfaFactors,
  resetUserPassword,
  updateProfile
} from '../services/authService';
import { isSupabaseConfigured } from '../services/supabase';
import { UserProfile, MfaFactor, MfaEnrollResult, Language } from '../types';

export type AccountSettingsTab = 'profile' | 'security' | 'appearance';

import memoji1 from '../assets/images/memoji_avatar_1_1788683505977.jpg';
import memoji2 from '../assets/images/memoji_avatar_2_1788683536131.jpg';
import memoji3 from '../assets/images/memoji_avatar_3_1788683553234.jpg';
import memoji4 from '../assets/images/memoji_avatar_4_1788683572960.jpg';
import memoji5 from '../assets/images/memoji_avatar_5_1788683588432.jpg';
import memoji6 from '../assets/images/memoji_avatar_6_1788683605610.jpg';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  initialTab?: AccountSettingsTab;
  onUserUpdated?: (user: UserProfile) => void;
}

// Curated 3D Memoji character avatar presets (no external file upload or external service needed)
const AVATAR_PRESETS = [memoji1, memoji2, memoji3, memoji4, memoji5, memoji6];

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  initialTab = 'profile',
  onUserUpdated,
}) => {
  const { language, setLanguage, dict } = useLanguage();
  const { themeMode, setThemeMode } = useTheme();

  // Active tab state
  const [activeTab, setActiveTab] = useState<AccountSettingsTab>(initialTab);

  // Profile tab states
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar || '');
  const [useInitials, setUseInitials] = useState(!currentUser.avatar);
  const [profileLang, setProfileLang] = useState<Language>(currentUser.preferredLanguage || language);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');
  const [profileErrorMsg, setProfileErrorMsg] = useState('');

  // Security (MFA & Password) states
  const [mfaLoading, setMfaLoading] = useState(true);
  const [mfaActionLoading, setMfaActionLoading] = useState(false);
  const [verifiedFactor, setVerifiedFactor] = useState<MfaFactor | null>(null);
  const [mfaViewState, setMfaViewState] = useState<'status' | 'enroll' | 'confirm_disable'>('status');
  const [enrollData, setEnrollData] = useState<MfaEnrollResult | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [mfaErrorMsg, setMfaErrorMsg] = useState('');
  const [mfaSuccessMsg, setMfaSuccessMsg] = useState('');
  const [sessionAal, setSessionAal] = useState<'aal1' | 'aal2' | null>(null);

  // Password reset cooldown
  const [resetEmailSending, setResetEmailSending] = useState(false);
  const [resetEmailSentMsg, setResetEmailSentMsg] = useState('');
  const [resetCooldown, setResetCooldown] = useState(0);

  // Sync state whenever modal opens or currentUser changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setDisplayName(currentUser.displayName || '');
      setSelectedAvatar(currentUser.avatar || '');
      setUseInitials(!currentUser.avatar);
      setProfileLang(currentUser.preferredLanguage || language);
      setProfileSuccessMsg('');
      setProfileErrorMsg('');
      setMfaViewState('status');
      setMfaErrorMsg('');
      setMfaSuccessMsg('');
      setEnrollData(null);
      setVerifyCode('');
      setCopiedKey(false);
      refreshSecurityStatus();
    }
  }, [isOpen, initialTab, currentUser]);

  // Load MFA factors and assurance level
  const refreshSecurityStatus = async () => {
    if (!isSupabaseConfigured) {
      setMfaLoading(false);
      return;
    }
    setMfaLoading(true);
    setMfaErrorMsg('');
    try {
      const [res, aalRes] = await Promise.all([
        listMfaFactors(),
        authService.getMfaAssuranceLevel(),
      ]);

      const verified = res.verifiedTotp.length > 0 ? res.verifiedTotp[0] : null;
      setVerifiedFactor(verified);
      if (aalRes?.currentLevel) {
        setSessionAal(aalRes.currentLevel);
      }

      // Cleanup orphan unverified factors if no verified factor exists
      if (!verified && res.unverifiedTotp.length > 0) {
        for (const unverified of res.unverifiedTotp) {
          try {
            await unenrollTotpFactor(unverified.id);
          } catch (cleanErr) {
            console.warn('Orphan factor cleanup error:', cleanErr);
          }
        }
      }
    } catch (err: any) {
      console.warn('Failed to fetch MFA status:', err);
    } finally {
      setMfaLoading(false);
    }
  };

  // Cooldown timer for password reset
  useEffect(() => {
    if (resetCooldown <= 0) return;
    const timer = setInterval(() => {
      setResetCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resetCooldown]);

  if (!isOpen) return null;

  // Safe modal close handler
  const handleCloseModal = async () => {
    if (mfaViewState === 'enroll' && enrollData?.factorId) {
      const orphanId = enrollData.factorId;
      setEnrollData(null);
      setVerifyCode('');
      onClose();
      try {
        await unenrollTotpFactor(orphanId);
      } catch (cleanErr) {
        console.warn('Failed to clean up draft TOTP factor on modal close:', cleanErr);
      }
    } else {
      onClose();
    }
  };

  // --- Profile Actions ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrorMsg('');
    setProfileSuccessMsg('');

    const trimmedName = displayName.trim();
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      setProfileErrorMsg(
        dict.accountSettings?.profile?.displayNameError || 
        'Display name must be between 2 and 50 characters.'
      );
      return;
    }

    setSavingProfile(true);
    try {
      const finalAvatar = useInitials ? '' : (selectedAvatar || '');
      const res = await updateProfile({
        displayName: trimmedName,
        avatar: finalAvatar,
        preferredLanguage: profileLang,
      });

      if (!res.success) {
        setProfileErrorMsg(res.error || dict.accountSettings?.profile?.errorMsg || 'Failed to update profile.');
      } else {
        setProfileSuccessMsg(dict.accountSettings?.profile?.successMsg || 'Profile updated successfully!');
        if (profileLang !== language) {
          setLanguage(profileLang);
        }
        if (res.user && onUserUpdated) {
          onUserUpdated(res.user);
        }
      }
    } catch (err: any) {
      setProfileErrorMsg(err?.message || 'Failed to update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  // --- Security Actions ---
  const handleStartEnroll = async () => {
    setMfaErrorMsg('');
    setMfaSuccessMsg('');
    setMfaActionLoading(true);
    try {
      const res = await enrollTotpFactor();
      if (!res.success || !res.data || !res.data.factorId) {
        setMfaErrorMsg(res.error || dict.mfa?.enrollError || 'Failed to initiate authenticator setup.');
        return;
      }
      setEnrollData(res.data);
      setViewStateEnroll();
    } catch (err: any) {
      setMfaErrorMsg(err?.message || dict.mfa?.enrollError || 'Failed to initiate authenticator setup.');
    } finally {
      setMfaActionLoading(false);
    }
  };

  const setViewStateEnroll = () => {
    setMfaViewState('enroll');
    setVerifyCode('');
    setCopiedKey(false);
  };

  const handleCancelEnroll = async () => {
    if (enrollData?.factorId) {
      const orphanId = enrollData.factorId;
      setEnrollData(null);
      setVerifyCode('');
      setMfaViewState('status');
      try {
        await unenrollTotpFactor(orphanId);
      } catch (cleanErr) {
        console.warn('Failed to clean up draft TOTP factor on cancel:', cleanErr);
      }
    } else {
      setMfaViewState('status');
    }
  };

  const handleVerifyAndActivate = async (codeToVerify?: string) => {
    const code = (codeToVerify || verifyCode).trim();
    if (!enrollData?.factorId || !code) return;

    setMfaErrorMsg('');
    setMfaActionLoading(true);
    try {
      const res = await verifyAndActivateTotp(enrollData.factorId, code);
      if (!res.success) {
        setMfaErrorMsg(res.error || dict.mfa?.verificationFailed || 'Invalid verification code.');
        return;
      }
      setMfaSuccessMsg(dict.mfa?.verificationSuccess || 'Two-Step Verification has been successfully enabled!');
      setEnrollData(null);
      setVerifyCode('');
      setMfaViewState('status');
      await refreshSecurityStatus();
    } catch (err: any) {
      setMfaErrorMsg(err?.message || dict.mfa?.verificationFailed || 'Verification failed.');
    } finally {
      setMfaActionLoading(false);
    }
  };

  const handleConfirmDisable = async () => {
    if (!verifiedFactor) return;
    setMfaErrorMsg('');
    setMfaActionLoading(true);
    try {
      const res = await unenrollTotpFactor(verifiedFactor.id);
      if (!res.success) {
        setMfaErrorMsg(res.error || 'Failed to disable two-step verification.');
        return;
      }
      setMfaSuccessMsg(dict.mfa?.unenrollSuccess || 'Two-step verification has been disabled.');
      setVerifiedFactor(null);
      setMfaViewState('status');
      await refreshSecurityStatus();
    } catch (err: any) {
      setMfaErrorMsg(err?.message || 'Failed to disable two-step verification.');
    } finally {
      setMfaActionLoading(false);
    }
  };

  const handleSendPasswordReset = async () => {
    if (!currentUser.email || resetCooldown > 0) return;
    setResetEmailSending(true);
    setMfaErrorMsg('');
    setResetEmailSentMsg('');
    try {
      const res = await resetUserPassword(currentUser.email);
      if (!res.success) {
        setMfaErrorMsg(res.error || 'Failed to send password reset email.');
      } else {
        setResetEmailSentMsg(
          dict.accountSettings?.security?.resetEmailSent || 
          'A password reset link has been dispatched to your email address.'
        );
        setResetCooldown(60);
      }
    } catch (err: any) {
      setMfaErrorMsg(err?.message || 'Failed to send password reset email.');
    } finally {
      setResetEmailSending(false);
    }
  };

  const handleCopySecretKey = async () => {
    if (!enrollData?.secret) return;
    try {
      await navigator.clipboard.writeText(enrollData.secret);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 3000);
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  };

  // Compute initials for display
  const userInitials = (currentUser.displayName || 'Learner')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

  return (
    <div 
      id="account-settings-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/75 dark:bg-slate-950/85 backdrop-blur-sm overflow-y-auto overscroll-contain flex flex-col items-center justify-start sm:justify-center p-3 sm:p-6"
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top, 16px))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 16px))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 12px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 12px))',
      }}
      onClick={handleCloseModal}
    >
      <div 
        id="account-settings-modal-container"
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 my-auto shrink-0 animate-in fade-in zoom-in-95 transition-colors overflow-x-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {dict.accountSettings?.title || 'Account Settings'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {dict.accountSettings?.subtitle || 'Manage your profile details, authenticator security, and display preferences.'}
            </p>
          </div>
          <button
            id="account-settings-close-btn"
            onClick={handleCloseModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Hidden when in nested enroll or confirm disable flow) */}
        {mfaViewState === 'status' && (
          <div 
            id="account-settings-tabs"
            className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-800"
            role="tablist"
          >
            <button
              id="tab-profile-btn"
              onClick={() => setActiveTab('profile')}
              role="tab"
              aria-selected={activeTab === 'profile'}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{dict.accountSettings?.tabs?.profile || 'Profile'}</span>
            </button>

            <button
              id="tab-security-btn"
              onClick={() => setActiveTab('security')}
              role="tab"
              aria-selected={activeTab === 'security'}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                activeTab === 'security'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>{dict.accountSettings?.tabs?.security || 'Security'}</span>
              {verifiedFactor && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" title="2FA Active" />
              )}
            </button>

            <button
              id="tab-appearance-btn"
              onClick={() => setActiveTab('appearance')}
              role="tab"
              aria-selected={activeTab === 'appearance'}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'appearance'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>{dict.accountSettings?.tabs?.appearance || 'Appearance'}</span>
            </button>
          </div>
        )}

        {/* =========================================================================
            TAB 1: PROFILE
           ========================================================================= */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {profileSuccessMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{profileSuccessMsg}</span>
              </div>
            )}

            {profileErrorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-medium flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{profileErrorMsg}</span>
              </div>
            )}

            {/* Avatar Section */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {dict.accountSettings?.profile?.avatarTitle || 'Profile Avatar'}
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                {/* Avatar Preview */}
                <div className="relative shrink-0">
                  {useInitials || !selectedAvatar ? (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-[#0B1E3B] text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                      {userInitials}
                    </div>
                  ) : (
                    <img 
                      src={selectedAvatar} 
                      alt="Avatar preview" 
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
                    />
                  )}
                </div>

                {/* Preset Avatar Selection */}
                <div className="flex-1 space-y-2 text-center sm:text-left min-w-0">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {dict.accountSettings?.profile?.avatarSubtitle || 'Choose a 3D Memoji character avatar or use your initials.'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    {AVATAR_PRESETS.map((presetUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(presetUrl);
                          setUseInitials(false);
                        }}
                        className={`w-10 h-10 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer p-0.5 bg-white dark:bg-slate-800 ${
                          !useInitials && selectedAvatar === presetUrl
                            ? 'border-blue-600 ring-2 ring-blue-500/30 scale-105 shadow-md shadow-blue-500/20'
                            : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                        }`}
                        aria-label={`3D Memoji Avatar ${idx + 1}`}
                      >
                        <img 
                          src={presetUrl} 
                          alt={`Memoji ${idx + 1}`} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-xl" 
                        />
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        setUseInitials(true);
                        setSelectedAvatar('');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                        useInitials
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/20'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {dict.accountSettings?.profile?.initialsOption || 'Use Initials'}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                    {dict.accountSettings?.profile?.avatarNote || 'Custom photo upload will be available in an upcoming update.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Display Name Input */}
            <div className="space-y-1.5">
              <label htmlFor="account-display-name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {dict.accountSettings?.profile?.displayNameLabel || 'Display Name'}
              </label>
              <input
                id="account-display-name"
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                maxLength={50}
                placeholder={dict.accountSettings?.profile?.displayNamePlaceholder || 'Enter your name'}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Email (Read-Only) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {dict.accountSettings?.profile?.emailLabel || 'Email Address'}
                </label>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Read-only
                </span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={currentUser.email || ''}
                  readOnly
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 text-sm font-mono cursor-not-allowed"
                />
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                {dict.accountSettings?.profile?.emailHelp || 'Email is linked to your Supabase credentials and is read-only here.'}
              </p>
            </div>

            {/* Preferred Language */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {dict.accountSettings?.profile?.preferredLanguageLabel || 'Preferred Language'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setProfileLang('en')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    profileLang === 'en'
                      ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>🇺🇸 English (EN)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfileLang('vi')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    profileLang === 'vi'
                      ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>🇻🇳 Tiếng Việt (VI)</span>
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex justify-end">
              <button
                id="account-save-profile-btn"
                type="submit"
                disabled={savingProfile}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {savingProfile ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{dict.accountSettings?.profile?.savingBtn || 'Saving...'}</span>
                  </>
                ) : (
                  <span>{dict.accountSettings?.profile?.saveBtn || 'Save Changes'}</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* =========================================================================
            TAB 2: SECURITY & TOTP MFA
           ========================================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {mfaSuccessMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{mfaSuccessMsg}</span>
              </div>
            )}

            {mfaErrorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-medium flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{mfaErrorMsg}</span>
              </div>
            )}

            {/* VIEW A: STATUS OVERVIEW */}
            {mfaViewState === 'status' && (
              <div className="space-y-6">
                {/* Session Assurance Banner */}
                {sessionAal && (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {dict.accountSettings?.security?.sessionLevelTitle || 'Session Assurance'}:
                    </span>
                    <span className={`font-mono font-bold px-2.5 py-1 rounded-md self-start sm:self-auto break-words max-w-full text-xs ${
                      sessionAal === 'aal2'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {sessionAal === 'aal2'
                        ? (dict.accountSettings?.security?.sessionLevelAal2 || 'AAL2 — TOTP Verified')
                        : (dict.accountSettings?.security?.sessionLevelAal1 || 'AAL1 — Password Only')}
                    </span>
                  </div>
                )}

                {/* 2FA TOTP Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                        verifiedFactor 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}>
                        {verifiedFactor ? <ShieldCheck className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white break-words">
                          {dict.accountSettings?.security?.mfaSectionTitle || 'Two-Step Verification (TOTP)'}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 break-words leading-relaxed">
                          {verifiedFactor 
                            ? (dict.mfa?.statusEnabledDesc || 'Your account is strongly protected with a second factor.') 
                            : (dict.mfa?.statusDisabledDesc || 'Require a 6-digit code from an authenticator app when signing in.')}
                        </p>
                      </div>
                    </div>

                    {/* Fully responsive 2FA status indicator: wraps naturally and never overflows */}
                    <div className="self-start sm:self-start shrink-0 max-w-full">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full max-w-full text-left break-words ${
                        verifiedFactor
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-200/90 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${verifiedFactor ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        <span className="break-words">
                          {verifiedFactor ? (dict.mfa?.statusEnabled || 'Two-Step Verification is enabled') : (dict.mfa?.statusDisabled || 'Two-Step Verification is off')}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 min-w-0 flex-1 break-words">
                      {dict.mfa?.compatibleApps || 'Works with Google Authenticator, 1Password, Microsoft Authenticator.'}
                    </p>

                    <div className="shrink-0 w-full sm:w-auto">
                      {mfaLoading ? (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 py-1">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Loading...</span>
                        </div>
                      ) : verifiedFactor ? (
                        <button
                          id="disable-mfa-btn"
                          onClick={() => setMfaViewState('confirm_disable')}
                          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-all cursor-pointer text-center"
                        >
                          {dict.mfa?.disableBtn || 'Disable 2FA'}
                        </button>
                      ) : (
                        <button
                          id="enable-mfa-btn"
                          onClick={handleStartEnroll}
                          disabled={mfaActionLoading}
                          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {mfaActionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                          <span>{dict.mfa?.enableBtn || 'Enable 2FA'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Password Management Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white break-words">
                        {dict.accountSettings?.security?.passwordSectionTitle || 'Password Management'}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 break-words leading-relaxed">
                        {dict.accountSettings?.security?.passwordSectionDesc || 'Request an official password reset link delivered to your email inbox.'}
                      </p>
                    </div>
                  </div>

                  {resetEmailSentMsg && (
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-medium break-words">
                      {resetEmailSentMsg}
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-full">
                      {currentUser.email}
                    </span>
                    <button
                      id="send-pwd-reset-btn"
                      type="button"
                      onClick={handleSendPasswordReset}
                      disabled={resetEmailSending || resetCooldown > 0}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer text-center"
                    >
                      {resetEmailSending 
                        ? (dict.accountSettings?.security?.sendingResetEmail || 'Resetting Password...') 
                        : resetCooldown > 0 
                          ? (dict.accountSettings?.security?.resetCooldown ? dict.accountSettings.security.resetCooldown.replace('{seconds}', String(resetCooldown)) : `Resend in ${resetCooldown}s`) 
                          : (dict.accountSettings?.security?.sendResetEmailBtn || 'Reset Password')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW B: MOBILE-SAFE TOTP QR ENROLLMENT */}
            {mfaViewState === 'enroll' && enrollData && (
              <div id="totp-enrollment-view" className="space-y-5">
                {/* Back Button Header */}
                <div className="flex items-center justify-between">
                  <button
                    id="back-to-security-btn"
                    onClick={handleCancelEnroll}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    Step 1 of 2
                  </span>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {dict.mfa?.step1Title || '1. Scan this QR Code'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {dict.mfa?.step1Desc || 'Open your authenticator app and scan this QR code.'}
                  </p>
                </div>

                {/* Clean QR Code Container */}
                <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
                  {enrollData.qrCodeSvg ? (
                    <img 
                      id="totp-qr-image"
                      src={enrollData.qrCodeSvg} 
                      alt="TOTP Authenticator QR Code"
                      className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-44 h-44 flex items-center justify-center text-slate-400 text-xs">
                      No QR Code Available
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-mono">
                    RFC 6238 TOTP standard
                  </p>
                </div>

                {/* Secret Key Fallback */}
                {enrollData.secret && (
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {dict.mfa?.step2Title || 'Or Enter Secret Key Manually'}
                    </p>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <code className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 flex-1 break-all select-all">
                        {enrollData.secret}
                      </code>
                      <button
                        id="copy-secret-key-btn"
                        type="button"
                        onClick={handleCopySecretKey}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1 hover:bg-blue-500 transition-colors shrink-0 cursor-pointer"
                        title="Copy Key"
                      >
                        {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey ? (dict.mfa?.keyCopied || 'Copied!') : (dict.mfa?.copyKey || 'Copy')}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Verification Code Input */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label htmlFor="totp-verify-code-input" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    {dict.mfa?.step3Title || '2. Enter 6-digit Verification Code'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="totp-verify-code-input"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]*"
                      maxLength={6}
                      autoFocus
                      value={verifyCode}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setVerifyCode(val);
                        if (val.length === 6) {
                          handleVerifyAndActivate(val);
                        }
                      }}
                      placeholder="000000"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-lg font-mono tracking-widest font-extrabold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      id="verify-activate-mfa-btn"
                      type="button"
                      disabled={verifyCode.length !== 6 || mfaActionLoading}
                      onClick={() => handleVerifyAndActivate()}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20"
                    >
                      {mfaActionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      <span>{dict.mfa?.verifyAndActivateBtn || 'Verify & Activate'}</span>
                    </button>
                  </div>
                </div>

                {/* Cancel & Time Sync notice */}
                <div className="flex items-center justify-between pt-1">
                  <p className="text-[11px] text-slate-400">
                    {dict.mfa?.timeSyncNotice || 'Ensure device time is set to Automatic.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleCancelEnroll}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium cursor-pointer"
                  >
                    {dict.mfa?.cancelBtn || 'Cancel'}
                  </button>
                </div>
              </div>
            )}

            {/* VIEW C: CONFIRM DISABLE */}
            {mfaViewState === 'confirm_disable' && (
              <div className="space-y-4 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-rose-800 dark:text-rose-200">
                      {dict.mfa?.disableConfirmationTitle || 'Disable Two-Step Verification?'}
                    </h3>
                    <p className="text-xs text-rose-600 dark:text-rose-300">
                      {dict.mfa?.disableConfirmationDesc || 'Disabling two-step verification reduces your account security.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setMfaViewState('status')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {dict.mfa?.cancelBtn || 'Cancel'}
                  </button>
                  <button
                    id="confirm-disable-mfa-btn"
                    type="button"
                    disabled={mfaActionLoading}
                    onClick={handleConfirmDisable}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    {mfaActionLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>{dict.mfa?.confirmDisableBtn || 'Confirm Disable'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3: APPEARANCE
           ========================================================================= */}
        {activeTab === 'appearance' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {dict.accountSettings?.appearance?.themeTitle || 'Theme Mode'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {dict.accountSettings?.appearance?.subtitle || 'Select your preferred visual style for learning and coding.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Light Theme Card */}
              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  themeMode === 'light'
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                  <Sun className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {dict.accountSettings?.appearance?.light || 'Light'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {dict.accountSettings?.appearance?.lightDesc || 'Clean, high-contrast light palette.'}
                </p>
                {themeMode === 'light' && (
                  <span className="absolute top-3 right-3 text-blue-600 dark:text-blue-400">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </button>

              {/* Dark Theme Card */}
              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  themeMode === 'dark'
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                  <Moon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {dict.accountSettings?.appearance?.dark || 'Dark'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {dict.accountSettings?.appearance?.darkDesc || 'Modern deep slate aesthetic.'}
                </p>
                {themeMode === 'dark' && (
                  <span className="absolute top-3 right-3 text-blue-600 dark:text-blue-400">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </button>

              {/* System Theme Card */}
              <button
                type="button"
                onClick={() => setThemeMode('system')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  themeMode === 'system'
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center mb-3">
                  <Laptop className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {dict.accountSettings?.appearance?.system || 'System'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {dict.accountSettings?.appearance?.systemDesc || 'Matches your device settings.'}
                </p>
                {themeMode === 'system' && (
                  <span className="absolute top-3 right-3 text-blue-600 dark:text-blue-400">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
