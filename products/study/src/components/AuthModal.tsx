import React, { useState, useEffect } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  User, 
  Sparkles, 
  Mail, 
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { fetchSystemSettings, isPublicRegistrationEnabled, subscribeSystemSettings } from '@shared';
import { 
  signInUser, 
  signUpUser, 
  verifyUserOtp, 
  resendUserOtp, 
  resetUserPassword,
  updateUserPassword,
  challengeAndVerifyLoginMfa,
  getStoredUser, 
  saveUserToStorage,
  getOtpCooldownRemaining,
  recordOtpSent,
  getPasswordResetCooldownRemaining,
  recordPasswordResetSent,
  authService
} from '../services/authService';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { UserProfile } from '../types';

export type AuthModalMode = 'signin' | 'signup' | 'verify_otp' | 'pending_approval' | 'forgot_password' | 'reset_password' | 'totp_challenge';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  initialMode?: AuthModalMode;
  initialErrorMsg?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode,
  initialErrorMsg,
}) => {
  const { dict, language } = useLanguage();
  const [mode, setMode] = useState<AuthModalMode>(initialMode || 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState(initialErrorMsg || '');
  const [infoMsg, setInfoMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [pwdResetCooldown, setPwdResetCooldown] = useState(0);
  const [mfaFactorId, setMfaFactorId] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [verifiedUser, setVerifiedUser] = useState<UserProfile | null>(null);
  const [hasValidRecoverySession, setHasValidRecoverySession] = useState<boolean | null>(null);
  const [checkingRecoverySession, setCheckingRecoverySession] = useState(false);
  const [publicRegistrationEnabled, setPublicRegistrationEnabled] = useState<boolean>(() => isPublicRegistrationEnabled());

  useEffect(() => {
    fetchSystemSettings(supabase).then((s) => {
      setPublicRegistrationEnabled(s.public_registration_enabled);
    });

    const unsubscribe = subscribeSystemSettings((s) => {
      setPublicRegistrationEnabled(s.public_registration_enabled);
    });
    return () => unsubscribe();
  }, []);

  // Sync mode and error when initial props change
  useEffect(() => {
    if (isOpen) {
      if (initialMode) setMode(initialMode);
      if (initialErrorMsg) setErrorMsg(initialErrorMsg);
    }
  }, [isOpen, initialMode, initialErrorMsg]);

  // Synchronize recovery session status when reset_password mode is active
  useEffect(() => {
    if (isOpen && mode === 'reset_password') {
      if (isSupabaseConfigured && supabase) {
        setCheckingRecoverySession(true);

        const verifyRecoverySession = async () => {
          try {
            let res = await supabase.auth.getSession();
            // If session is not immediately visible, allow up to 300ms for gotrue local storage persistence
            if (!res.data?.session) {
              await new Promise(r => setTimeout(r, 300));
              res = await supabase.auth.getSession();
            }

            setCheckingRecoverySession(false);
            if (res.error || !res.data?.session) {
              setHasValidRecoverySession(false);
              setErrorMsg(dict.auth.invalidOrExpiredLinkMessage);
            } else {
              setHasValidRecoverySession(true);
            }
          } catch {
            setCheckingRecoverySession(false);
            setHasValidRecoverySession(false);
            setErrorMsg(dict.auth.invalidOrExpiredLinkMessage);
          }
        };

        verifyRecoverySession();
      } else {
        setHasValidRecoverySession(false);
      }
    }
  }, [isOpen, mode, dict.auth.invalidOrExpiredLinkMessage]);

  // Synchronize cooldown for password reset requests
  useEffect(() => {
    if (isOpen && mode === 'forgot_password' && email) {
      const remaining = getPasswordResetCooldownRemaining(email);
      setPwdResetCooldown(remaining);
    }
  }, [isOpen, mode, email]);

  // Cooldown countdown timer for password reset
  useEffect(() => {
    if (pwdResetCooldown <= 0) return;
    const timer = setInterval(() => {
      setPwdResetCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [pwdResetCooldown > 0]);

  // Synchronize cooldown when modal opens or mode transitions to verify_otp
  useEffect(() => {
    if (isOpen && mode === 'verify_otp' && email) {
      const remaining = getOtpCooldownRemaining(email);
      setResendCooldown(remaining);
    }
  }, [isOpen, mode, email]);

  // Cooldown countdown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown > 0]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        const res = await signInUser(email, password);
        if (res.needsVerification) {
          const remaining = getOtpCooldownRemaining(email);
          if (remaining > 0) {
            // An OTP was already sent in this flow; navigate to OTP screen without duplicate resend
            setMode('verify_otp');
            setResendCooldown(remaining);
            setInfoMsg(dict.auth.pendingVerificationNotice);
          } else {
            // No active cooldown: send OTP now so the unverified user receives their 6-digit code
            const resendRes = await resendUserOtp(email);
            if (resendRes.success) {
              setMode('verify_otp');
              setResendCooldown(60);
              setInfoMsg(dict.auth.verifyEmailSubtitle);
            } else {
              const errMsg = resendRes.error || '';
              if (errMsg.toLowerCase().includes('60 seconds') || errMsg.toLowerCase().includes('security purposes')) {
                recordOtpSent(email);
                setMode('verify_otp');
                setResendCooldown(60);
                setInfoMsg(dict.auth.pendingVerificationNotice);
              } else {
                setMode('verify_otp');
                setResendCooldown(0);
                setErrorMsg(resendRes.error || dict.auth.pendingVerificationNotice);
              }
            }
          }
        } else if (res.needsMfa && res.mfaFactorId) {
          // TOTP Two-Step Challenge required: transition to totp_challenge mode
          setMfaFactorId(res.mfaFactorId);
          setTotpCode('');
          setErrorMsg('');
          setInfoMsg('');
          setMode('totp_challenge');
        } else if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMsg(res.error || 'Authentication error');
        }
      } else if (mode === 'signup') {
        if (!publicRegistrationEnabled) {
          setErrorMsg(
            language === 'vi'
              ? 'Đăng ký công khai hiện đang tạm khóa. Vui lòng liên hệ quản trị viên hoặc đăng nhập bằng tài khoản hiện có.'
              : 'Public registration is currently disabled. Please contact the administrator or sign in with an existing account.'
          );
          return;
        }
        const res = await signUpUser(email, password, displayName || 'New Student');
        if (res.success) {
          // Transition to OTP verification step
          setMode('verify_otp');
          setResendCooldown(60);
          setInfoMsg(dict.auth.verifyEmailSubtitle);
        } else {
          setErrorMsg(res.error || 'Registration error');
        }
      } else if (mode === 'verify_otp') {
        const res = await verifyUserOtp(email, otpCode);
        if (res.success && res.user) {
          setVerifiedUser(res.user);
          setMode('pending_approval');
          onAuthSuccess(res.user);
        } else {
          setErrorMsg(res.error || 'Invalid verification code. Please check and try again.');
        }
      } else if (mode === 'forgot_password') {
        const trimmedEmail = email.trim().toLowerCase();
        if (!trimmedEmail) {
          setErrorMsg(dict.auth.email + ' is required.');
          return;
        }
        const res = await resetUserPassword(trimmedEmail);
        if (res.success) {
          setPwdResetCooldown(60);
          setInfoMsg(dict.auth.resetLinkSentMessage);
        } else {
          const errMsg = res.error || '';
          if (errMsg.toLowerCase().includes('60 seconds') || errMsg.toLowerCase().includes('security purposes')) {
            recordPasswordResetSent(trimmedEmail);
            setPwdResetCooldown(60);
            setInfoMsg(dict.auth.resetLinkSentMessage);
          } else {
            setErrorMsg(res.error || 'Failed to send reset link.');
          }
        }
      } else if (mode === 'reset_password') {
        if (!newPassword || newPassword.length < 6) {
          setErrorMsg(dict.auth.passwordLengthError);
          return;
        }
        if (newPassword !== confirmPassword) {
          setErrorMsg(dict.auth.passwordsDoNotMatch);
          return;
        }
        const res = await updateUserPassword(newPassword);
        if (res.success) {
          setInfoMsg(dict.auth.passwordUpdatedMessage);
          setNewPassword('');
          setConfirmPassword('');
          await authService.signOut();
          setTimeout(() => {
            setMode('signin');
            setPassword('');
            setInfoMsg(dict.auth.passwordUpdatedMessage);
          }, 2000);
        } else {
          setErrorMsg(res.error || 'Failed to update password.');
        }
      } else if (mode === 'totp_challenge') {
        const cleanTotp = totpCode.trim();
        if (cleanTotp.length !== 6) {
          setErrorMsg(dict.mfa.invalidCodeError);
          return;
        }
        const res = await challengeAndVerifyLoginMfa(mfaFactorId, cleanTotp);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMsg(res.error || dict.mfa.invalidCodeError);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleTotpVerify = async (codeToVerify?: string) => {
    const cleanCode = (codeToVerify ?? totpCode).trim();
    if (cleanCode.length !== 6) {
      setErrorMsg(dict.mfa.invalidCodeError);
      return;
    }
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);
    try {
      const res = await challengeAndVerifyLoginMfa(mfaFactorId, cleanCode);
      if (res.success && res.user) {
        onAuthSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error || dict.mfa.invalidCodeError);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || dict.mfa.invalidCodeError);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelChallenge = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Signout on cancel challenge error:', err);
    }
    setTotpCode('');
    setMfaFactorId('');
    setErrorMsg('');
    setInfoMsg('');
    setMode('signin');
  };

  const handleModalClose = async () => {
    if (mode === 'totp_challenge') {
      try {
        if (isSupabaseConfigured && supabase) {
          await supabase.auth.signOut();
        }
      } catch (err) {
        console.warn('Signout on modal close error:', err);
      }
      setTotpCode('');
      setMfaFactorId('');
      setMode('signin');
    }
    onClose();
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || !email || loading) return;
    setErrorMsg('');
    setInfoMsg('');
    setLoading(true);

    try {
      const res = await resendUserOtp(email);
      if (res.success) {
        setResendCooldown(60);
        setInfoMsg(dict.auth.resendSuccess);
      } else {
        const errMsg = res.error || '';
        if (errMsg.toLowerCase().includes('60 seconds') || errMsg.toLowerCase().includes('security purposes')) {
          recordOtpSent(email);
          setResendCooldown(60);
          setInfoMsg(dict.auth.pendingVerificationNotice);
        } else {
          setErrorMsg(res.error || 'Failed to resend code.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  // Demo accounts for instant testing
  const handleQuickDemo = (role: 'student' | 'admin') => {
    // DEV-ONLY Admin Demo Security Guard:
    // In production builds, Admin Demo is blocked completely and falls back to Student Demo
    if (role === 'admin' && !import.meta.env.DEV) {
      role = 'student';
    }

    const demoUser: UserProfile = {
      id: role === 'admin' ? 'demo_admin_id' : 'demo_student_id',
      email: role === 'admin' ? 'admin@4tm.dev' : 'student@4tm.dev',
      displayName: role === 'admin' ? '4TM Platform Admin' : 'Alex Dev (Student)',
      avatar: role === 'admin' 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: role === 'admin' ? 'admin' : 'user',
      status: 'active',
      emailVerified: true,
      preferredLanguage: 'en',
      xp: role === 'admin' ? 850 : 120,
      streak: role === 'admin' ? 14 : 3,
      lastActiveDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      lessonProgress: role === 'admin' ? {} : {
        py_lesson_1: {
          lessonId: 'py_lesson_1',
          courseId: 'python',
          levelId: 'basic',
          learnCompleted: true,
          exercisesCompleted: true,
          challengeCompleted: true,
          challengeSolutionViewed: false,
          quizPassed: true,
          quizScore: 90,
          bestQuizScore: 90,
          quizAttemptsCount: 1,
          projectCompleted: false,
          isCompleted: true,
          updatedAt: new Date().toISOString(),
        }
      },
      topicMastery: role === 'admin' ? {
        python_variables: 100,
        python_loops: 95,
        sql_select: 100,
        sql_join: 90,
      } : {
        python_variables: 92,
        python_loops: 65,
        sql_select: 88,
        sql_join: 55,
        html_structure: 90,
        css_flexbox: 82,
        js_arrays: 74,
      },
      bookmarks: role === 'admin' ? [] : [
        {
          id: 'bm_demo_1',
          userId: 'demo_student_id',
          lessonId: 'py_lesson_1',
          lessonTitle: { en: 'Variables & Data Types', vi: 'Biến & Kiểu Dữ Liệu' },
          courseId: 'python',
          levelId: 'basic',
          createdAt: new Date().toISOString()
        }
      ],
      notes: role === 'admin' ? [] : [
        {
          id: 'nt_demo_1',
          userId: 'demo_student_id',
          courseId: 'python',
          levelId: 'basic',
          lessonId: 'py_lesson_1',
          lessonTitle: { en: 'Variables & Data Types', vi: 'Biến & Kiểu Dữ Liệu' },
          content: 'Python variables are dynamically typed and snake_case is PEP8 standard.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      achievements: [
        {
          id: 'first_code',
          title: { en: 'First Code Run', vi: 'Chạy Code Đầu Tiên' },
          description: { en: 'Successfully executed code in the WASM runner', vi: 'Chạy mã thành công trên trình duyệt' },
          icon: '⚡',
          category: 'exercise',
          unlocked: true,
        },
        {
          id: 'streak_3',
          title: { en: '3-Day Streak', vi: 'Chuỗi 3 Ngày' },
          description: { en: 'Maintained a 3-day learning streak', vi: 'Duy trì học tập 3 ngày liên tiếp' },
          icon: '🔥',
          category: 'streak',
          unlocked: true,
        }
      ]
    };

    saveUserToStorage(demoUser);
    onAuthSuccess(demoUser);
    onClose();
  };

  return (
    <div 
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 dark:bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleModalClose}
    >
      <div 
        id="auth-modal-container"
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 transition-colors"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm">
              4TM
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {mode === 'signin' && dict.auth.signInTitle}
                {mode === 'signup' && dict.auth.signUpTitle}
                {mode === 'verify_otp' && dict.auth.verifyEmailTitle}
                {mode === 'pending_approval' && dict.auth.pendingApprovalTitle}
                {mode === 'forgot_password' && dict.auth.forgotPasswordTitle}
                {mode === 'reset_password' && dict.auth.resetPasswordTitle}
                {mode === 'totp_challenge' && dict.mfa.loginChallengeTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {mode === 'verify_otp' 
                  ? dict.auth.verifyEmailSubtitle
                  : mode === 'pending_approval'
                  ? dict.auth.pendingApprovalBadge
                  : mode === 'forgot_password'
                  ? dict.auth.forgotPasswordSubtitle
                  : mode === 'reset_password'
                  ? dict.auth.resetPasswordSubtitle
                  : mode === 'totp_challenge'
                  ? dict.mfa.loginChallengeSubtitle
                  : 'Save progress and sync topic mastery across devices.'}
              </p>
            </div>
          </div>
          <button onClick={handleModalClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Instant Demo Login (Only in signin/signup) */}
        {(mode === 'signin' || mode === 'signup') && (
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30 space-y-2.5">
            <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
              {import.meta.env.DEV ? '⚡ Quick 1-Click Demo Profiles' : '⚡ Quick 1-Click Demo Profile'}
            </span>
            <div className={import.meta.env.DEV ? "grid grid-cols-2 gap-2" : "grid grid-cols-1 gap-2"}>
              <button
                type="button"
                id="demo-student-btn"
                onClick={() => handleQuickDemo('student')}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Student Demo</span>
              </button>

              {import.meta.env.DEV && (
                <button
                  type="button"
                  id="demo-admin-btn"
                  onClick={() => handleQuickDemo('admin')}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-500/20 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Admin Demo</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Alerts */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {infoMsg && (
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs">
            {infoMsg}
          </div>
        )}

        {/* Registration Disabled Notice */}
        {mode === 'signup' && !publicRegistrationEnabled && (
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div className="leading-relaxed">
              <p className="font-bold">
                {language === 'vi' ? 'Đăng ký công khai đang tạm khóa' : 'Public Registration Disabled'}
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                {language === 'vi'
                  ? 'Hệ thống hiện không nhận đăng ký mới từ công chúng. Vui lòng đăng nhập nếu bạn đã có tài khoản.'
                  : 'New user self-registration is closed. Please sign in if you already have an approved account.'}
              </p>
            </div>
          </div>
        )}

        {/* Mode: Sign In or Sign Up Form */}
        {(mode === 'signin' || mode === 'signup') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {dict.auth.displayName}
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                  placeholder="Alex Dev"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {dict.auth.email}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  {dict.auth.password}
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    id="forgot-password-btn"
                    onClick={() => {
                      setMode('forgot_password');
                      setErrorMsg('');
                      setInfoMsg('');
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                  >
                    {dict.auth.forgotPassword}
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading || (mode === 'signup' && !publicRegistrationEnabled)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? dict.auth.verifying
                : mode === 'signin'
                ? dict.auth.submitSignIn
                : !publicRegistrationEnabled
                ? (language === 'vi' ? 'Đăng Ký Đang Khóa' : 'Registration Closed')
                : dict.auth.submitSignUp}
            </button>
          </form>
        )}

        {/* Mode: OTP Verification Form */}
        {mode === 'verify_otp' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {dict.auth.enterOtp}
              </label>
              <input
                id="otp-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                required
                autoFocus
                maxLength={6}
                value={otpCode}
                onChange={e => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center text-2xl tracking-[0.4em] font-mono font-bold text-blue-600 dark:text-blue-400 focus:outline-none focus:border-blue-500"
                placeholder="••••••"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 text-center">
                Supabase Auth Email OTP via Resend SMTP
              </p>
            </div>

            <button
              type="submit"
              id="verify-otp-btn"
              disabled={loading || otpCode.length !== 6}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? dict.auth.verifying : dict.auth.verifyBtn}
            </button>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                id="resend-otp-btn"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || loading}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                {resendCooldown > 0 
                  ? dict.auth.resendIn.replace('{seconds}', String(resendCooldown))
                  : dict.auth.resendCode}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg('');
                  setInfoMsg('');
                }}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:underline cursor-pointer"
              >
                {dict.auth.changeEmail}
              </button>
            </div>
          </form>
        )}

        {/* Mode: Pending Approval State */}
        {mode === 'pending_approval' && (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center shadow-inner">
              <Clock className="w-7 h-7 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {dict.auth.pendingApprovalMessage}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed px-2">
                {dict.auth.pendingApprovalNotice}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-left space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email Status:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Account Access:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {dict.auth.pendingApprovalBadge}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              Continue Exploring Courses
            </button>
          </div>
        )}

        {/* Mode: Forgot Password Form */}
        {mode === 'forgot_password' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {dict.auth.email}
              </label>
              <input
                id="forgot-password-email-input"
                type="email"
                required
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                placeholder="you@domain.com"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Supabase Auth password reset link via Resend SMTP
              </p>
            </div>

            <button
              type="submit"
              id="send-reset-link-btn"
              disabled={loading || !email || pwdResetCooldown > 0}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading 
                ? dict.auth.sendingResetLink 
                : (pwdResetCooldown > 0 
                    ? dict.auth.resetLinkCooldown.replace('{seconds}', String(pwdResetCooldown)) 
                    : dict.auth.sendResetLink)}
            </button>

            <div className="pt-2 text-center text-xs">
              <button
                type="button"
                id="back-to-signin-from-forgot-btn"
                onClick={() => {
                  setMode('signin');
                  setErrorMsg('');
                  setInfoMsg('');
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
              >
                ← {dict.auth.backToSignIn}
              </button>
            </div>
          </form>
        )}

        {/* Mode: Reset Password Form */}
        {mode === 'reset_password' && (
          <div className="space-y-4">
            {checkingRecoverySession ? (
              <div className="py-8 text-center space-y-3">
                <RefreshCw className="w-6 h-6 text-blue-500 animate-spin mx-auto" />
                <p className="text-xs text-slate-500 dark:text-slate-400">Verifying recovery session...</p>
              </div>
            ) : hasValidRecoverySession === false ? (
              <div className="space-y-4 text-center py-2">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
                  <X className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {dict.auth.invalidOrExpiredLinkTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                    {dict.auth.invalidOrExpiredLinkMessage}
                  </p>
                </div>
                <button
                  type="button"
                  id="request-new-link-btn"
                  onClick={() => {
                    setMode('forgot_password');
                    setErrorMsg('');
                    setInfoMsg('');
                  }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                >
                  {dict.auth.requestNewLinkBtn}
                </button>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setErrorMsg('');
                      setInfoMsg('');
                    }}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:underline cursor-pointer"
                  >
                    ← {dict.auth.backToSignIn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {dict.auth.newPassword}
                  </label>
                  <input
                    id="new-password-input"
                    type="password"
                    required
                    minLength={6}
                    autoFocus
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    placeholder="••••••••"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {dict.auth.passwordLengthError}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {dict.auth.confirmPassword}
                  </label>
                  <input
                    id="confirm-password-input"
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  id="submit-new-password-btn"
                  disabled={loading || newPassword.length < 6 || confirmPassword.length < 6}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? dict.auth.updatingPassword : dict.auth.updatePasswordBtn}
                </button>

                <div className="pt-2 text-center text-xs">
                  <button
                    type="button"
                    id="back-to-signin-from-reset-btn"
                    onClick={() => {
                      setMode('signin');
                      setErrorMsg('');
                      setInfoMsg('');
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                  >
                    ← {dict.auth.backToSignIn}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Mode: TOTP Two-Step Authentication Challenge */}
        {mode === 'totp_challenge' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTotpVerify();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="totp-challenge-input" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {dict.mfa.loginChallengeTitle}
              </label>
              <input
                id="totp-challenge-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                required
                autoFocus
                maxLength={6}
                value={totpCode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setTotpCode(val);
                  setErrorMsg('');
                  if (val.length === 6) {
                    handleTotpVerify(val);
                  }
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center text-2xl tracking-[0.4em] font-mono font-bold text-blue-600 dark:text-blue-400 focus:outline-none focus:border-blue-500"
                placeholder="••••••"
                aria-label={dict.mfa.loginChallengeTitle}
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 text-center">
                {dict.mfa.timeSyncNotice}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                id="cancel-totp-challenge-btn"
                onClick={handleCancelChallenge}
                disabled={loading}
                className="w-1/3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {dict.mfa.cancelBtn}
              </button>
              <button
                type="submit"
                id="verify-totp-challenge-btn"
                disabled={loading || totpCode.length !== 6}
                className="w-2/3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? dict.mfa.verifying : dict.mfa.verifyAndActivateBtn}
              </button>
            </div>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {dict.mfa.lostDeviceGuidance}
              </p>
            </div>
          </form>
        )}

        {/* Switch Mode Footer */}
        {(mode === 'signin' || mode === 'signup') && (
          <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
            {mode === 'signin' ? (
              <p>
                {dict.auth.dontHaveAccount}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                    setInfoMsg('');
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                >
                  {dict.auth.submitSignUp}
                </button>
              </p>
            ) : (
              <p>
                {dict.auth.alreadyHaveAccount}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMsg('');
                    setInfoMsg('');
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                >
                  {dict.auth.submitSignIn}
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
