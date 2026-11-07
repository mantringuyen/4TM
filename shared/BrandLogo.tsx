import React, { useState, useEffect } from 'react';
import { getProductAccent } from './tokens';
import { useTheme } from './theme';

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
  ecosystem: 'https://cdn.4tm.io.vn/brand/logos/adaptive/4tm-logo.svg',
  hub: 'https://cdn.4tm.io.vn/brand/logos/adaptive/4tm-logo.svg',
  portal: 'https://cdn.4tm.io.vn/brand/logos/adaptive/4tm-logo.svg',
  '4tm': 'https://cdn.4tm.io.vn/brand/logos/adaptive/4tm-logo.svg',
  study: 'https://cdn.4tm.io.vn/brand/logos/adaptive/study-logo.svg',
  ebook: 'https://cdn.4tm.io.vn/brand/logos/adaptive/ebook-logo.svg',
  tools: 'https://cdn.4tm.io.vn/brand/logos/adaptive/tools-logo.svg',
  games: 'https://cdn.4tm.io.vn/brand/logos/adaptive/games-logo.svg',
  apps: 'https://cdn.4tm.io.vn/brand/logos/adaptive/apps-logo.svg',
  'block-puzzle': 'https://cdn.4tm.io.vn/brand/logos/adaptive/block-puzzle-logo.svg',
};

export const PRODUCT_LOGOS_DARK: Record<string, string> = {
  ecosystem: 'https://cdn.4tm.io.vn/brand/logos/dark/svg/4tm.svg',
  hub: 'https://cdn.4tm.io.vn/brand/logos/dark/svg/4tm.svg',
  portal: 'https://cdn.4tm.io.vn/brand/logos/dark/svg/4tm.svg',
  '4tm': 'https://cdn.4tm.io.vn/brand/logos/dark/svg/4tm.svg',
  study: 'https://cdn.4tm.io.vn/brand/logos/dark/svg/study.svg',
  ebook: 'https://cdn.4tm.io.vn/brand/logos/dark/svg/ebook.svg',
  tools: 'https://cdn.4tm.io.vn/brand/logos/dark/svg/tools.svg',
  games: 'https://cdn.4tm.io.vn/brand/logos/dark/svg/games.svg',
  apps: 'https://cdn.4tm.io.vn/brand/logos/dark/svg/apps.svg',
  'block-puzzle': 'https://cdn.4tm.io.vn/brand/logos/dark/svg/block-puzzle.svg',
};

export const PRODUCT_LOGOS_LIGHT: Record<string, string> = {
  ecosystem: 'https://cdn.4tm.io.vn/brand/logos/light/svg/4tm.svg',
  hub: 'https://cdn.4tm.io.vn/brand/logos/light/svg/4tm.svg',
  portal: 'https://cdn.4tm.io.vn/brand/logos/light/svg/4tm.svg',
  '4tm': 'https://cdn.4tm.io.vn/brand/logos/light/svg/4tm.svg',
  study: 'https://cdn.4tm.io.vn/brand/logos/light/svg/study.svg',
  ebook: 'https://cdn.4tm.io.vn/brand/logos/light/svg/ebook.svg',
  tools: 'https://cdn.4tm.io.vn/brand/logos/light/svg/tools.svg',
  games: 'https://cdn.4tm.io.vn/brand/logos/light/svg/games.svg',
  apps: 'https://cdn.4tm.io.vn/brand/logos/light/svg/apps.svg',
  'block-puzzle': 'https://cdn.4tm.io.vn/brand/logos/light/svg/block-puzzle.svg',
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
  const { resolvedTheme } = useTheme();
  const [errorLevel, setErrorLevel] = useState<number>(0);

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
      dimension: 28,
      mark: 'w-7 h-7',
      badge: 'text-[10px] px-1.5 py-0.5',
    },
    md: {
      dimension: 36,
      mark: 'w-9 h-9',
      badge: 'text-xs px-2 py-0.5',
    },
    lg: {
      dimension: 48,
      mark: 'w-12 h-12',
      badge: 'text-sm px-2.5 py-1',
    },
  }[size];

  const themedLogos = resolvedTheme === 'light' ? PRODUCT_LOGOS_LIGHT : PRODUCT_LOGOS_DARK;
  const themedLogo = (useProductMark && themedLogos[label]) ? themedLogos[label] : themedLogos.ecosystem;
  const adaptiveLogo = (useProductMark && PRODUCT_LOGOS[label]) ? PRODUCT_LOGOS[label] : PRODUCT_LOGOS.ecosystem;
  const fallbackLogo = 'https://cdn.4tm.io.vn/brand/icons/4tm/favicon.svg';

  useEffect(() => {
    setErrorLevel(0);
  }, [themedLogo]);

  let logoSrc = themedLogo;
  if (errorLevel === 1) {
    logoSrc = adaptiveLogo;
  } else if (errorLevel >= 2) {
    logoSrc = fallbackLogo;
  }

  const content = (
    <>
      {showMark && (
        <div
          className={`relative flex items-center justify-center shrink-0 aspect-square group-hover:scale-[1.03] transition-transform duration-200 bg-transparent ${sizeClasses.mark}`}
          aria-hidden="true"
        >
          <img
            key={logoSrc}
            src={logoSrc}
            alt={label === 'ecosystem' ? '4TM Logo' : `4TM ${label} Logo`}
            width={sizeClasses.dimension}
            height={sizeClasses.dimension}
            className="w-full h-full object-contain aspect-square select-none pointer-events-none drop-shadow-xs"
            loading="eager"
            decoding="async"
            onError={() => {
              setErrorLevel((prev) => (prev === 0 && adaptiveLogo && adaptiveLogo !== themedLogo ? 1 : 2));
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
