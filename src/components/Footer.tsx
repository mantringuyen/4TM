import React from 'react';
import { BrandLogo } from '@shared';
import { ECOSYSTEM_PRODUCTS_CONFIG } from '../config/products';
import { useLanguage } from '../i18n/LanguageContext';
import { ThemeSelector } from './ThemeSelector';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { language, setLanguage, dict } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100 dark:border-slate-900">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo size="md" showText={true} showMark={true} href="/" />
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {dict.footer.tagline}
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-400 dark:text-slate-500">
              <span>Domain: 4tm.io.vn</span>
              <span>&bull;</span>
              <span>Master Ecosystem</span>
            </div>
          </div>

          {/* Column 1: Ecosystem Web Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B1E3B] dark:text-white">
              {dict.footer.productsCol}
            </h4>
            <ul className="space-y-2 list-none p-0 m-0 text-xs">
              {ECOSYSTEM_PRODUCTS_CONFIG.map((prod) => (
                <li key={prod.id}>
                  {prod.id === 'study' ? (
                    <a
                      href={prod.href}
                      className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span>{prod.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-slate-400 dark:text-slate-500 cursor-default">
                      <span>{prod.name}</span>
                      <span className="text-[10px] px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-900 text-slate-400 font-mono">
                        {prod.status === 'in-development' ? 'dev' : 'soon'}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Platform & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B1E3B] dark:text-white">
              {dict.footer.platformCol}
            </h4>
            <ul className="space-y-2 list-none p-0 m-0 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="#why"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {dict.footer.architectureLink}
                </a>
              </li>
              <li>
                <a
                  href="#synergy"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {dict.footer.synergyLink}
                </a>
              </li>
              <li>
                <a
                  href="https://study.4tm.io.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>{dict.footer.studyLink}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Language toggle and Theme selector */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            &copy; {currentYear} 4TM Ecosystem. {dict.footer.rights}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher Segment in Footer */}
            <div
              id="footer-language-switcher-segment"
              className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'vi'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Chuyển sang Tiếng Việt"
              >
                VI
              </button>
            </div>

            {/* Theme Selector in Footer */}
            <ThemeSelector variant="dropdown" />
          </div>
        </div>
      </div>
    </footer>
  );
};
