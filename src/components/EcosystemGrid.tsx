import React from 'react';
import { ECOSYSTEM_PRODUCTS_CONFIG } from '../config/products';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../i18n/LanguageContext';

export const EcosystemGrid: React.FC = () => {
  const { dict } = useLanguage();

  const primaryProducts = ECOSYSTEM_PRODUCTS_CONFIG.filter((p) =>
    ['study', 'apps', 'games'].includes(p.id)
  );
  const secondaryProducts = ECOSYSTEM_PRODUCTS_CONFIG.filter((p) =>
    ['ebook', 'tools'].includes(p.id)
  );

  return (
    <section id="products" className="py-12 md:py-20 scroll-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
        <h2 className="text-2xl sm:text-4xl font-black text-[#0B1E3B] dark:text-white tracking-tight">
          {dict.products.heading}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {dict.products.subheading}
        </p>
      </div>

      {/* Row 1: Flagship Interactive Platforms (Study — 4TM, Apps — 4TM, Games — 4TM) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        {primaryProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            featured={product.id === 'study'}
          />
        ))}
      </div>

      {/* Row 2: Knowledge & Developer Utility (Ebook — 4TM, Tools — 4TM) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        {secondaryProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
