import React, { useState } from 'react';
import { 
  FolderKanban, 
  CheckCircle, 
  Sparkles, 
  CheckCircle2,
  ExternalLink,
  Code2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ProjectSpec } from '../types';
import { CodeEditor } from './CodeEditor';
import { PowerBiWorkspace } from './PowerBiWorkspace';

interface ProjectViewProps {
  project: ProjectSpec;
  language: string;
  onProjectCompleted: () => void;
  isCompleted: boolean;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
  project,
  language,
  onProjectCompleted,
  isCompleted,
}) => {
  const { t, dict } = useLanguage();
  const [completed, setCompleted] = useState(isCompleted);

  const handleExecution = (res: any) => {
    if (res.isSuccess && !res.error) {
      // successful run
    }
  };

  const handleMarkComplete = () => {
    setCompleted(true);
    onProjectCompleted();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-slate-100 dark:from-purple-950/40 dark:via-blue-950/40 dark:to-slate-900 border border-purple-200 dark:border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
              <FolderKanban className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase font-bold text-purple-700 dark:text-purple-400">
              {dict.project.heading}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{t(project.title)}</h2>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {t(project.description)}
          </p>
        </div>

        <div>
          <button
            onClick={handleMarkComplete}
            disabled={completed}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
              completed
                ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 cursor-default'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-purple-600/20 cursor-pointer active:scale-95'
            }`}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{dict.project.markProjectDone} (Done)</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>{dict.project.markProjectDone}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Requirements List */}
      <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {dict.project.specifications}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {project.requirements.map((req, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}`} />
              <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{t(req)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Project Workspace */}
      <div className="space-y-3">
        {language === 'powerbi' ? (
          <PowerBiWorkspace
            initialDax={project.starterCode}
            height="580px"
          />
        ) : (
          <CodeEditor
            initialCode={project.starterCode}
            language={language}
            onExecutionComplete={handleExecution}
          />
        )}
      </div>
    </div>
  );
};
