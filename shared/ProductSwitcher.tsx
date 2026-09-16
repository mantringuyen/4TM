import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ExternalLink, Check, Layers } from 'lucide-react';

export interface EcosystemProduct {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  url: string;
  current?: boolean;
}

export const DEFAULT_ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  { id: 'hub', name: '4TM', shortName: '4TM', url: 'https://4tm.io.vn', description: 'Central ecosystem portal' },
  { id: 'study', name: 'Study — 4TM', shortName: 'Study', url: 'https://study.4tm.io.vn', description: 'Interactive learning platform' },
];

export interface ProductSwitcherProps {
  currentProductId?: string;
  products?: EcosystemProduct[];
  className?: string;
}

export const ProductSwitcher: React.FC<ProductSwitcherProps> = ({
  currentProductId = 'hub',
  products = DEFAULT_ECOSYSTEM_PRODUCTS,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentProduct =
    products.find((p) => p.id === currentProductId || p.current) || products[0];

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer shadow-2xs"
      >
        <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span className="font-semibold">{currentProduct?.name || '4TM Ecosystem'}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 mt-2 w-64 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden"
        >
          <div className="px-3.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 mb-1">
            4TM Digital Ecosystem
          </div>

          <div className="space-y-0.5 px-1">
            {products.map((product) => {
              const isSelected = product.id === currentProductId || product.current;
              return (
                <a
                  key={product.id}
                  href={product.url}
                  target="_self"
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-start justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <span>{product.name}</span>
                      {product.id !== 'hub' && (
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      )}
                    </div>
                    {product.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-normal">
                        {product.description}
                      </p>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 ml-2" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
