import React, { useState } from 'react';
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
  variant?: 'portal' | 'study' | 'ebook' | 'tools' | 'games' | 'apps' | 'ecosystem';
  useProductMark?: boolean;
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

export const PRODUCT_LOGOS: Record<string, string> = {
  ecosystem: '/brand/4tm-logo-1024.png',
  hub: '/brand/4tm-logo-1024.png',
  portal: '/brand/4tm-logo-1024.png',
  '4tm': '/brand/4tm-logo-1024.png',
  study: '/brand/study-logo-1024.png',
  ebook: '/brand/ebook-logo-1024.png',
  tools: '/brand/tools-logo-1024.png',
  games: '/brand/games-logo-1024.png',
  apps: '/brand/apps-logo-1024.png',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  productName,
  showText = true,
  showMark = true,
  className = '',
  href,
  onClick,
  as,
  variant,
  useProductMark = true,
}) => {
  const [hasError, setHasError] = useState(false);

  const getProductLabel = (name?: string, v?: string): string => {
    const raw = v || name;
    if (raw && raw.trim()) {
      const lower = raw.trim().toLowerCase();
      if (lower === '4tm' || lower === 'hub' || lower === 'ecosystem' || lower === 'portal') return 'ecosystem';
      return lower;
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

  const label = getProductLabel(productName, variant);
  const accent = getProductAccent(label);

  const resolvedHref = (href && href !== '#') ? href : (onClick ? undefined : '/');
  const resolvedAs = as || (onClick ? 'button' : (resolvedHref ? 'a' : 'div'));

  const sizeClasses = {
    sm: {
      mark: 'w-7 h-7 rounded-[7px]',
      badge: 'text-[10px] px-1.5 py-0.5',
    },
    md: {
      mark: 'w-9 h-9 rounded-[9px]',
      badge: 'text-xs px-2 py-0.5',
    },
    lg: {
      mark: 'w-12 h-12 rounded-[12px]',
      badge: 'text-sm px-2.5 py-1',
    },
  }[size];

  const primaryLogo = (useProductMark && PRODUCT_LOGOS[label]) ? PRODUCT_LOGOS[label] : PRODUCT_LOGOS.ecosystem;
  const logoSrc = hasError ? '/favicon.svg' : primaryLogo;

  const content = (
    <>
      {showMark && (
        <div
          className={`relative flex items-center justify-center shrink-0 shadow-xs group-hover:scale-[1.03] transition-transform duration-200 overflow-hidden bg-[#090D16] ${sizeClasses.mark}`}
          aria-hidden="true"
        >
          <img
            src={logoSrc}
            alt={label === 'ecosystem' ? '4TM Logo' : `4TM ${label} Logo`}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="eager"
            decoding="async"
            onError={() => {
              if (!hasError) setHasError(true);
            }}
          />
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
  const ariaLabel = label === 'ecosystem' ? '4TM Ecosystem' : `4TM ${label}`;

  if (resolvedAs === 'a') {
    return (
      <a
        href={resolvedHref || '/'}
        onClick={onClick}
        className={containerClasses}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  if (resolvedAs === 'button') {
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
