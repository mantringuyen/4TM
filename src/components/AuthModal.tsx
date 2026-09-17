import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, UserPlus, KeyRound, ArrowLeft, AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { authService } from '../services/authService';
import { useLanguage } from '../i18n/LanguageContext';

export type AuthMode = 'signin' | 'signup' | 'magiclink' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const { language } = useLanguage();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isVi = language === 'vi';

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccessMessage(null);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setError(isVi ? 'Vui lòng nhập đầy đủ email và mật khẩu.' : 'Please enter both email and password.');
      return;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setError(isVi ? 'Mật khẩu phải có ít nhất 6 ký tự.' : 'Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError(isVi ? 'Mật khẩu xác nhận không khớp.' : 'Passwords do not match.');
        return;
      }

      setLoading(true);
      const res = await authService.signUp(email.trim(), password);
      setLoading(false);

      if (!res.success) {
        setError(res.error || (isVi ? 'Đăng ký không thành công.' : 'Sign up failed.'));
      } else {
        setSuccessMessage(
          isVi
            ? 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản nếu được yêu cầu.'
            : 'Account created! Please check your email to confirm your account if required.'
        );
      }
      return;
    }

    setLoading(true);
    const res = await authService.signInWithPassword(email.trim(), password);
    setLoading(false);

    if (!res.success) {
      setError(res.error || (isVi ? 'Đăng nhập không thành công.' : 'Invalid email or password.'));
    } else {
      onClose();
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setError(isVi ? 'Vui lòng nhập email.' : 'Please enter your email.');
      return;
    }

    setLoading(true);
    const res = await authService.signInWithOtp(email.trim());
    setLoading(false);

    if (!res.success) {
      setError(res.error || (isVi ? 'Gửi liên kết không thành công.' : 'Failed to send magic link.'));
    } else {
      setSuccessMessage(
        isVi
          ? 'Liên kết đăng nhập một lần đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư!'
          : 'Magic link has been sent to your email. Check your inbox!'
      );
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setError(isVi ? 'Vui lòng nhập email.' : 'Please enter your email.');
      return;
    }

    setLoading(true);
    const res = await authService.resetPassword(email.trim());
    setLoading(false);

    if (!res.success) {
      setError(res.error || (isVi ? 'Không thể gửi email đặt lại mật khẩu.' : 'Failed to send password reset email.'));
    } else {
      setSuccessMessage(
        isVi
          ? 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn!'
          : 'Password reset instructions have been sent to your email.'
      );
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    const res = await authService.signInWithGoogle();
    if (!res.success) {
      setLoading(false);
      setError(res.error || (isVi ? 'Đăng nhập Google thất bại.' : 'Google sign-in failed.'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label={isVi ? 'Đóng cửa sổ' : 'Close modal'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 mb-3 font-bold text-lg">
            4TM
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {mode === 'signin' && (isVi ? 'Đăng Nhập 4TM Ecosystem' : 'Sign In to 4TM')}
            {mode === 'signup' && (isVi ? 'Tạo Tài Khoản 4TM' : 'Create 4TM Account')}
            {mode === 'magiclink' && (isVi ? 'Đăng Nhập Bằng Magic Link' : 'Magic Link Sign In')}
            {mode === 'forgot' && (isVi ? 'Khôi Phục Mật Khẩu' : 'Reset Password')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isVi
              ? 'Tài khoản thống nhất cho toàn bộ hệ sinh thái 4TM'
              : 'One unified account for all 4TM ecosystem platforms'}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-start gap-2 animate-in fade-in duration-100">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in duration-100">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        {/* Forms */}
        {(mode === 'signin' || mode === 'signup') && (
          <form onSubmit={handlePasswordAuth} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isVi ? 'Địa chỉ Email' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {isVi ? 'Mật khẩu' : 'Password'}
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {isVi ? 'Quên mật khẩu?' : 'Forgot password?'}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isVi ? 'Xác nhận Mật khẩu' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : mode === 'signin' ? (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{isVi ? 'Đăng Nhập' : 'Sign In'}</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>{isVi ? 'Đăng Ký Tài Khoản' : 'Create Account'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {mode === 'magiclink' && (
          <form onSubmit={handleMagicLink} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isVi ? 'Địa chỉ Email của bạn' : 'Your Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isVi ? 'Gửi Magic Link' : 'Send Magic Link'}</span>
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isVi ? 'Địa chỉ Email' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
              <span>{isVi ? 'Gửi Hướng Dẫn Đặt Lại' : 'Send Reset Instructions'}</span>
            </button>
          </form>
        )}

        {/* Social / Alternative Methods */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isVi ? 'Đăng nhập với Google' : 'Continue with Google'}</span>
          </button>

          {/* Mode Switchers */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            {mode === 'signin' ? (
              <>
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {isVi ? 'Chưa có tài khoản? Đăng ký' : 'New to 4TM? Sign up'}
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('magiclink')}
                  className="text-slate-600 dark:text-slate-400 hover:underline cursor-pointer"
                >
                  {isVi ? 'Dùng Magic Link' : 'Magic Link'}
                </button>
              </>
            ) : mode === 'signup' ? (
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="w-full text-center font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {isVi ? 'Đã có tài khoản? Đăng nhập' : 'Already have an account? Sign in'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="w-full flex items-center justify-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isVi ? 'Quay lại Đăng nhập' : 'Back to Sign In'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
