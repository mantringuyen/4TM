import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  name,
  fallback,
  size = 'md',
  className = '',
}) => {
  const displayFallback = fallback || (name ? name.charAt(0).toUpperCase() : 'U');
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold ${sizeClasses} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || ''}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{displayFallback}</span>
      )}
    </div>
  );
};

export interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    secondary: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    info: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  }[variant];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  }[size] || 'px-2.5 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};

export function getSupabaseConfig() {
  return {
    url: (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || '',
    anonKey: (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || '',
  };
}

export function createSupabaseClient() {
  return null;
}

export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}
