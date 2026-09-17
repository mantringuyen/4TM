import React from 'react';
import { getProductAccent } from './tokens';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  productName?: string;
  showText?: boolean;
  showMark?: boolean;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  as?: 'a' | 'div' | 'button';
}

export const BRAND_CONFIG = {
  name: '4TM',
  tagline: 'Learning by Doing',
  domain: '4tm.io.vn',
  colors: {
    primary: '#2563EB',
    dark: '#0B1E3B',
  },
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  productName,
  showText = true,
  showMark = true,
  className = '',
  href = !productName ? '/' : undefined,
  onClick,
  as = (href !== undefined || !productName) ? 'a' : onClick ? 'button' : 'div',
}) => {
  const getProductLabel = (name?: string): string => {
    if (name && name.trim()) {
      return name.trim().toLowerCase();
    }
    if (typeof window !== 'undefined' && window.location?.hostname) {
      const host = window.location.hostname.toLowerCase();
      if (host.includes('study')) return 'study';
      if (host.includes('ebook')) return 'ebook';
      if (host.includes('games')) return 'games';
      if (host.includes('apps')) return 'apps';
      if (host.includes('tools')) return 'tools';
    }
    return 'ecosystem';
  };

  const label = getProductLabel(productName);
  const accent = getProductAccent(label);

  const sizeClasses = {
    sm: {
      mark: 'w-7 h-7 text-xs rounded-lg',
      text: 'text-base font-black',
      badge: 'text-[10px] px-1.5 py-0.5',
    },
    md: {
      mark: 'w-9 h-9 text-sm rounded-xl',
      text: 'text-xl font-black',
      badge: 'text-xs px-2 py-0.5',
    },
    lg: {
      mark: 'w-12 h-12 text-base rounded-2xl',
      text: 'text-2xl font-black',
      badge: 'text-sm px-2.5 py-1',
    },
  }[size];

  const content = (
    <>
      {showMark && (
        <div
          className={`flex items-center justify-center font-black tracking-tighter text-white bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200 shrink-0 ${sizeClasses.mark}`}
        >
          <span>4TM</span>
        </div>
      )}

      {showText && (
        <div className="flex items-center leading-none">
          <span
            className={`rounded-lg border font-bold lowercase tracking-wider ${accent.classes.badge} ${sizeClasses.badge}`}
          >
            {label}
          </span>
        </div>
      )}
    </>
  );

  const containerClasses = `inline-flex items-center gap-2.5 group cursor-pointer select-none text-left ${className}`;
  const ariaLabel = label === 'ecosystem' ? '4TM Ecosystem' : `${label} — 4TM`;

  if (as === 'a' || (href && as !== 'button' && as !== 'div')) {
    return (
      <a
        href={href !== undefined ? href : 'https://4tm.io.vn'}
        onClick={onClick}
        className={containerClasses}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  if (as === 'button' || onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={containerClasses}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={containerClasses} aria-label={ariaLabel}>
      {content}
    </div>
  );
};
