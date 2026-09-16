import React from 'react';

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
  as = href ? 'a' : onClick ? 'button' : 'div',
}) => {
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
        <div className="flex items-center gap-2 leading-none">
          <span className={`tracking-tight text-[#0B1E3B] dark:text-white ${sizeClasses.text}`}>
            4TM
          </span>
          {productName && (
            <span
              className={`rounded-lg bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider ${sizeClasses.badge}`}
            >
              {productName}
            </span>
          )}
        </div>
      )}
    </>
  );

  const containerClasses = `inline-flex items-center gap-2.5 group cursor-pointer select-none text-left ${className}`;

  if (as === 'a' || (href && as !== 'button' && as !== 'div')) {
    return (
      <a
        href={href || 'https://4tm.io.vn'}
        onClick={onClick}
        className={containerClasses}
        aria-label={productName ? `${productName} — 4TM` : '4TM Ecosystem'}
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
        aria-label={productName ? `${productName} — 4TM` : '4TM Ecosystem'}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={containerClasses} aria-label={productName ? `${productName} — 4TM` : '4TM Ecosystem'}>
      {content}
    </div>
  );
};
