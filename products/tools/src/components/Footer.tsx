import React from 'react';
import { BrandLogo } from '@shared';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ExternalLink } from 'lucide-react';

export interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const currentYear = new Date().getFullYear();
  const dict = TRANSLATIONS[language];

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950 mt-auto transition-colors text-slate-600 dark:text-slate-400">
      {/* Bottom Ad Container Slot (Prepared for Ecosystem Ad Distribution, currently empty) */}
      <div
        id="bottom-ad-container"
        className="w-full max-w-5xl mx-auto px-4 pt-8 pb-4 text-center"
        aria-hidden="true"
      >
        <div className="min-h-[1px] w-full" data-ad-slot="tools-bottom" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-100 dark:border-slate-900">
          {/* Brand Column */}
          <div className="space-y-3">
            <BrandLogo size="md" productName="Tools" showText={true} showMark={true} href="#" />
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {dict.footer.tagline}
            </p>
            <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              <span>Domain: tools.4tm.io.vn</span>
            </div>
          </div>

          {/* Ecosystem Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              4TM Ecosystem
            </h4>
            <ul className="space-y-1.5 list-none p-0 m-0 text-xs">
              <li>
                <a
                  href="https://4tm.io.vn"
                  className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>4TM Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://study.4tm.io.vn"
                  className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Study — 4TM</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://ebook.4tm.io.vn"
                  className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Ebook — 4TM</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://games.4tm.io.vn"
                  className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Games — 4TM</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://apps.4tm.io.vn"
                  className="text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Apps — 4TM</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & Security */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Zero-Server Privacy Guarantee
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              All computations, base64 transformations, cryptography hashes, and JWT decodes occur strictly client-side inside your browser sandbox.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <div>
            &copy; {currentYear} 4TM Ecosystem. {dict.footer.rights}
          </div>
          <div className="font-mono text-[11px]">
            tools.4tm.io.vn
          </div>
        </div>
      </div>
    </footer>
  );
};
