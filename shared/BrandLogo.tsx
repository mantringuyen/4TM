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
  href,
  onClick,
  as,
}) => {
  const getProductLabel = (name?: string): string => {
    if (name && name.trim()) {
      const lower = name.trim().toLowerCase();
      if (lower === '4tm' || lower === 'hub' || lower === 'ecosystem') return 'ecosystem';
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

  const label = getProductLabel(productName);
  const accent = getProductAccent(label);

  const resolvedHref = (href && href !== '#') ? href : (onClick ? undefined : '/');
  const resolvedAs = as || (onClick ? 'button' : (resolvedHref ? 'a' : 'div'));

  const sizeClasses = {
    sm: {
      mark: 'w-7 h-7 rounded-[7px] p-[1.5px]',
      inner: 'rounded-[5.5px]',
      markText: 'text-[11px] tracking-tight font-black',
      badge: 'text-[10px] px-1.5 py-0.5',
    },
    md: {
      mark: 'w-9 h-9 rounded-[9px] p-[1.5px]',
      inner: 'rounded-[7.5px]',
      markText: 'text-[13px] tracking-tight font-black',
      badge: 'text-xs px-2 py-0.5',
    },
    lg: {
      mark: 'w-12 h-12 rounded-[12px] p-[2px]',
      inner: 'rounded-[10px]',
      markText: 'text-[17px] tracking-tight font-black',
      badge: 'text-sm px-2.5 py-1',
    },
  }[size];

  // Rich continuous multicolor spectrum ring gradient (Blue -> Cyan -> Green -> Yellow -> Orange -> Red -> Magenta -> Purple -> Blue)
  const brandSpectrumRingGradient = 'bg-[conic-gradient(from_135deg_at_50%_50%,#2563EB_0%,#06B6D4_12%,#10B981_25%,#F59E0B_37%,#F97316_50%,#EF4444_62%,#EC4899_75%,#8B5CF6_87%,#2563EB_100%)]';

  const content = (
    <>
      {showMark && (
        <div
          className={`relative flex items-center justify-center shrink-0 shadow-xs group-hover:scale-[1.03] transition-transform duration-200 ${sizeClasses.mark} ${brandSpectrumRingGradient}`}
          aria-hidden="true"
        >
          {/* Solid near-black background core */}
          <div
            className={`w-full h-full bg-[#090D16] dark:bg-[#070A10] flex items-center justify-center select-none ${sizeClasses.inner}`}
          >
            {/* Clean, bold solid white 4TM lettering inside mark */}
            <span className={`text-white leading-none ${sizeClasses.markText}`}>
              4TM
            </span>
          </div>
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
