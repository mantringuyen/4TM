import React from 'react';
import { AppItem, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { X, ExternalLink, Heart, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { StudyCompanionSandbox } from './sandboxes/StudyCompanionSandbox';
import { SnippetNotebookSandbox } from './sandboxes/SnippetNotebookSandbox';
import { ApiStudioSandbox } from './sandboxes/ApiStudioSandbox';
import { ColorPaletteSandbox } from './sandboxes/ColorPaletteSandbox';

export interface AppModalProps {
  app: AppItem;
  language: Language;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const AppModal: React.FC<AppModalProps> = ({
  app,
  language,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const dict = TRANSLATIONS[language];

  const renderSandbox = () => {
    switch (app.id) {
      case 'study-companion':
        return <StudyCompanionSandbox language={language} />;
      case 'snippet-notebook':
        return <SnippetNotebookSandbox language={language} />;
      case 'api-studio':
        return <ApiStudioSandbox language={language} />;
      case 'color-palette-studio':
        return <ColorPaletteSandbox language={language} />;
      default:
        return (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">
            Interactive sandbox in active development.
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black">{app.name}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                  v{app.version}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{app.tagline[language]}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(app.id)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-500'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500'
              }`}
              title={isFavorite ? dict.modal.removeFromFavorites : dict.modal.addToFavorites}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Interactive Live Sandbox Section */}
          {app.hasInteractiveSandbox && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <span>{dict.modal.interactiveSandbox}</span>
              </div>
              {renderSandbox()}
            </div>
          )}

          {/* Description & Key Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {dict.modal.featuresList}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {app.keyFeatures[language].map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {dict.modal.techStack}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {app.techSpecs.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 leading-relaxed">
                {app.description[language]}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
          >
            {dict.modal.close}
          </button>

          {app.launchUrl && (
            <a
              href={app.launchUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
            >
              <span>{dict.modal.launchFullApp}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
