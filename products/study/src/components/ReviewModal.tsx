import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  X, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  AlertTriangle, 
  Award,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { QuizQuestion, UserProfile } from '../types';
import { pythonCourse } from '../data/pythonData';
import { sqlCourse } from '../data/sqlData';
import { javascriptCourse } from '../data/webData';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onDrillCompleted: (results: Record<string, boolean>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  user,
  onDrillCompleted,
}) => {
  const { t, dict } = useLanguage();

  const [drillQuestions, setDrillQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [resultsMap, setResultsMap] = useState<Record<string, boolean>>({});

  // Generate target drill questions only when modal is actively opened
  useEffect(() => {
    if (!isOpen) return;

    const allPlatformQuestions: QuizQuestion[] = [];
    [pythonCourse, sqlCourse, javascriptCourse].forEach(c => {
      Object.values(c.levels).forEach(lvl => {
        lvl.modules.forEach(m => {
          m.lessons.forEach(l => {
            if (l.quizQuestionPool && l.quizQuestionPool.length > 0) {
              allPlatformQuestions.push(...l.quizQuestionPool);
            }
          });
        });
      });
    });

    const weakTopics = Object.entries(user.topicMastery)
      .filter(([_, score]) => (score as number) < 70)
      .map(([topic]) => topic);

    const targeted = allPlatformQuestions.filter(q => weakTopics.includes(q.topicId));
    const pool = targeted.length >= 5 ? targeted : allPlatformQuestions;
    const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);

    setDrillQuestions(selected);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setResultsMap({});
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQ = drillQuestions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: [optIdx] });
  };

  const handleSubmitDrill = () => {
    const topicRes: Record<string, boolean> = {};
    drillQuestions.forEach((q, idx) => {
      const selected = (selectedAnswers[idx] || []).sort();
      const correct = [...q.correctAnswers].sort();
      const isCorrect = selected.length === correct.length && selected.every((v, i) => v === correct[i]);
      topicRes[q.topicId] = isCorrect;
    });

    setResultsMap(topicRes);
    setSubmitted(true);
    onDrillCompleted(topicRes);
  };

  return (
    <div 
      id="review-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 dark:bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        id="review-modal-container"
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto transition-colors"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Smart Targeted Weak Topic Drill</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">5 rapid-fire questions to reinforce your mastery.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          currentQ && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>Question {currentIdx + 1} of {drillQuestions.length}</span>
                <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-transparent font-medium">
                  Target: {currentQ.topicId}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t(currentQ.question)}</h3>

              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = (selectedAnswers[currentIdx] || []).includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50 dark:bg-amber-500/20 border-amber-400 dark:border-amber-500 text-amber-950 dark:text-white font-semibold'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold border ${
                        isSelected ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{t(opt)}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold disabled:opacity-30 cursor-pointer"
                >
                  Previous
                </button>

                {currentIdx < drillQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitDrill}
                    disabled={Object.keys(selectedAnswers).length < drillQuestions.length}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs disabled:opacity-40 cursor-pointer shadow-sm"
                  >
                    Complete Drill
                  </button>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
              <Sparkles className="w-6 h-6 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Drill Completed!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-200/80 mt-0.5">
                  Your topic mastery scores have been updated in your dashboard.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {drillQuestions.map((q, i) => {
                const isCorrect = resultsMap[q.topicId];
                return (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                        {q.topicId}
                      </span>
                      {isCorrect ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> +15% Boost
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Keep Practicing
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-800 dark:text-slate-300 font-semibold">{t(q.question)}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
