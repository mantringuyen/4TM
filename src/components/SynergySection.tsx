import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { GraduationCap, BookOpen, Wrench, ArrowRight, ExternalLink } from 'lucide-react';

export const SynergySection: React.FC = () => {
  const { dict } = useLanguage();

  const synergyPillars = [
    {
      title: dict.featured.studyColTitle,
      desc: dict.featured.studyColDesc,
      icon: GraduationCap,
      href: 'https://study.4tm.io.vn',
      linkText: 'study.4tm.io.vn',
      accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      btnBg: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20',
    },
    {
      title: dict.featured.ebookColTitle,
      desc: dict.featured.ebookColDesc,
      icon: BookOpen,
      href: 'https://ebook.4tm.io.vn',
      linkText: 'ebook.4tm.io.vn',
      accentBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
      btnBg: 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20',
    },
    {
      title: dict.featured.toolsColTitle,
      desc: dict.featured.toolsColDesc,
      icon: Wrench,
      href: 'https://tools.4tm.io.vn',
      linkText: 'tools.4tm.io.vn',
      accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
      btnBg: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20',
    },
  ];

  return (
    <section id="synergy" className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
          <span>{dict.featured.badge}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3B] dark:text-white tracking-tight">
          {dict.featured.heading}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {dict.featured.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {synergyPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${pillar.accentBg}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-black text-[#0B1E3B] dark:text-white mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  {pillar.linkText}
                </span>

                <a
                  href={pillar.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  <span>Launch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
