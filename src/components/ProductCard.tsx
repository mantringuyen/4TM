import React from 'react';
import { EcosystemProductItem } from '../config/products';
import { useLanguage } from '../i18n/LanguageContext';
import {
  GraduationCap,
  LayoutGrid,
  Gamepad2,
  BookOpen,
  Wrench,
  ArrowUpRight,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface ProductCardProps {
  product: EcosystemProductItem;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { language, dict } = useLanguage();

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6' };
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'LayoutGrid':
        return <LayoutGrid {...props} />;
      case 'Gamepad2':
        return <Gamepad2 {...props} />;
      case 'BookOpen':
        return <BookOpen {...props} />;
      case 'Wrench':
        return <Wrench {...props} />;
      default:
        return <Layers {...props} />;
    }
  };

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md ${
        featured
          ? 'border-blue-400/80 dark:border-blue-600/80 ring-1 ring-blue-500/20'
          : 'border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40'
      }`}
    >
      <div className="p-6 sm:p-7">
        {/* Card Header: Icon, Subdomain & Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-200">
              {renderIcon(product.icon)}
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">
                {product.subdomain}
              </span>
              <span
                className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border mt-1 ${product.statusBadgeClass}`}
              >
                {product.statusLabel[language]}
              </span>
            </div>
          </div>

          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${product.name}`}
            className="text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        {/* Product Title (e.g. "Study — 4TM") & Descriptor */}
        <div className="mb-3">
          <h3 className="text-xl font-black text-[#0B1E3B] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
            {product.descriptor[language]}
          </p>
        </div>

        {/* Product Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {product.description[language]}
        </p>

        {/* Feature Highlights list */}
        <ul className="space-y-2 mb-6 text-xs text-slate-600 dark:text-slate-400">
          {product.highlights[language].map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer with CTA button matching Study styling */}
      <div className="px-6 py-4 sm:px-7 sm:py-5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40 rounded-b-2xl flex items-center justify-between">
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          {product.subdomain}
        </span>

        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <span>{product.ctaText[language]}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
