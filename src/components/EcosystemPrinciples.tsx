import React from 'react';
import { Palette, Globe2, Cpu, ShieldCheck } from 'lucide-react';

export const EcosystemPrinciples: React.FC = () => {
  const principles = [
    {
      icon: Palette,
      title: 'Unified Brand & Design',
      description: 'A shared visual foundation across all subdomains powered by shared design tokens, standardizing typography, colors, dark/light themes, and UX primitives.'
    },
    {
      icon: Globe2,
      title: 'Dedicated Web Subdomains',
      description: 'Every product serves a distinct mission under 4tm.io.vn (Study, Ebook, Tools, Apps, Games), maintaining clear separation of content and function.'
    },
    {
      icon: Cpu,
      title: 'Client-Side Autonomy',
      description: 'Zero-latency browser environments with WebAssembly runners, sandbox sandboxing, and offline-first state persistence.'
    },
    {
      icon: ShieldCheck,
      title: 'Open Standards & Integrity',
      description: 'Built with modern web standards, strict accessibility (WCAG AA), responsive mobile-first ergonomics, and zero unsolicited tracking.'
    }
  ];

  return (
    <section id="architecture" className="py-12 md:py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/40 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Architecture &amp; Mission
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            One Brand. Distinct Missions.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The 4TM ecosystem is designed to remove friction from programming education, software exploration, and developer productivity by combining deep tools with an effortless user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
