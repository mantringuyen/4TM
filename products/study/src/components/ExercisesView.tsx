import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  Zap,
  Code2,
  Eye,
  Check
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ExerciseItem } from '../types';
import { CodeEditor } from './CodeEditor';
import { getStorageKey } from '../services/storageService';

interface ExercisesViewProps {
  exercises: ExerciseItem[];
  language: string;
  onCompleteAll: () => void;
  isCompleted: boolean;
  lessonId?: string;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({
  exercises,
  language,
  onCompleteAll,
  isCompleted,
  lessonId = 'default',
}) => {
  const { t, dict } = useLanguage();

  // Helper to select/shuffle exercises per attempt
  const selectAttemptExercises = (pool: ExerciseItem[], lId: string, forceNew = false): ExerciseItem[] => {
    if (!pool || pool.length === 0) return [];
    if (pool.length <= 2) return [...pool];

    const storageKey = getStorageKey(`attempt_ex_${lId}`);
    if (!forceNew && typeof window !== 'undefined') {
      try {
        const savedRaw = sessionStorage.getItem(storageKey) || localStorage.getItem(storageKey);
        if (savedRaw) {
          const savedIds: string[] = JSON.parse(savedRaw);
          if (Array.isArray(savedIds) && savedIds.length > 0) {
            const mapped = savedIds
              .map(id => pool.find(e => e.id === id))
              .filter((e): e is ExerciseItem => !!e);
            if (mapped.length >= 2) {
              return mapped;
            }
          }
        }
      } catch {
        // Fallback to fresh selection
      }
    }

    // Pick 2-3 random exercises from pool or shuffle
    const countToPick = Math.min(pool.length, 3);
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, countToPick);
    if (typeof window !== 'undefined') {
      try {
        const idsToSave = JSON.stringify(shuffled.map(e => e.id));
        sessionStorage.setItem(storageKey, idsToSave);
        localStorage.setItem(storageKey, idsToSave);
      } catch {
        // Ignore storage errors
      }
    }
    return shuffled;
  };

  const [activeExercises, setActiveExercises] = useState<ExerciseItem[]>(() => {
    return selectAttemptExercises(exercises, lessonId, false);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [exerciseCodeKey, setExerciseCodeKey] = useState<number>(0);
  const [activeCode, setActiveCode] = useState<string>(activeExercises[0]?.starterCode || '');

  // Reset or update activeExercises when pool changes
  React.useEffect(() => {
    const selected = selectAttemptExercises(exercises, lessonId, false);
    setActiveExercises(selected);
    setCurrentIndex(0);
    setCompletedIndices([]);
    setFeedback(null);
    setSelectedOption(null);
    setShowHint(false);
    setAnswerRevealed(false);
    setActiveCode(selected[0]?.starterCode || '');
    setExerciseCodeKey(prev => prev + 1);
  }, [lessonId, exercises]);

  const handleRandomizeNewAttempt = () => {
    const selected = selectAttemptExercises(exercises, lessonId, true);
    setActiveExercises(selected);
    setCurrentIndex(0);
    setCompletedIndices([]);
    setFeedback(null);
    setSelectedOption(null);
    setShowHint(false);
    setAnswerRevealed(false);
    setActiveCode(selected[0]?.starterCode || '');
    setExerciseCodeKey(prev => prev + 1);
  };

  const currentEx = activeExercises[currentIndex] || activeExercises[0];

  const handleCheckPredict = () => {
    if (selectedOption === null || currentEx.correctOptionIndex === undefined) return;
    const isCorrect = selectedOption === currentEx.correctOptionIndex;
    setFeedback({
      isCorrect,
      message: isCorrect ? dict.exercises.correct : dict.exercises.incorrect,
    });

    if (isCorrect && !completedIndices.includes(currentIndex)) {
      const next = [...completedIndices, currentIndex];
      setCompletedIndices(next);
      if (next.length === activeExercises.length) {
        onCompleteAll();
      }
    }
  };

  const handleCodeExecution = (result: any, code?: string) => {
    if (currentEx.type === 'fix_code' || currentEx.type === 'modify_example') {
      const cleanCode = (code || '').replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/#[^\r\n]*/g, '').trim();
      if (!cleanCode) {
        setFeedback({
          isCorrect: false,
          message: dict.challenge.emptyCodeWarning || dict.editor.emptyCodeWarning || 'Please write your solution before running the code.',
        });
        return;
      }
      
      // Do not consider "Code executed with no output." as success if the exercise has solution output
      if (result.isSuccess && !result.error && result.output && result.output.trim() !== 'Code executed with no output.') {
        setFeedback({
          isCorrect: true,
          message: dict.exercises.correct,
        });
        if (!completedIndices.includes(currentIndex)) {
          const next = [...completedIndices, currentIndex];
          setCompletedIndices(next);
          if (next.length === activeExercises.length) {
            onCompleteAll();
          }
        }
      } else {
        setFeedback({
          isCorrect: false,
          message: dict.exercises.incorrect,
        });
      }
    }
  };

  const handleShowAnswer = () => {
    setAnswerRevealed(true);
    if (currentEx.type === 'predict_output' && currentEx.correctOptionIndex !== undefined) {
      setSelectedOption(currentEx.correctOptionIndex);
      setFeedback({
        isCorrect: true,
        message: dict.exercises.answerRevealed,
      });
    } else if (currentEx.solutionCode) {
      setActiveCode(currentEx.solutionCode);
      setExerciseCodeKey(prev => prev + 1);
      setFeedback({
        isCorrect: true,
        message: dict.exercises.answerRevealed,
      });
    }

    if (!completedIndices.includes(currentIndex)) {
      const next = [...completedIndices, currentIndex];
      setCompletedIndices(next);
      if (next.length === activeExercises.length) {
        onCompleteAll();
      }
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOption(null);
    setShowHint(false);
    setAnswerRevealed(false);
    if (currentIndex < activeExercises.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setActiveCode(activeExercises[nextIdx]?.starterCode || '');
      setExerciseCodeKey(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            {dict.exercises.heading}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {dict.exercises.subheading} ({completedIndices.length}/{activeExercises.length} passed)
          </p>
        </div>

        {/* Progress Pills & Draw Random Set */}
        <div className="flex items-center gap-2">
          {exercises.length > 2 && (
            <button
              onClick={handleRandomizeNewAttempt}
              title="Draw new randomized exercises from the pool"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 mr-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
          )}

          {activeExercises.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setFeedback(null);
                setSelectedOption(null);
                setShowHint(false);
                setAnswerRevealed(false);
                setActiveCode(activeExercises[idx]?.starterCode || '');
                setExerciseCodeKey(prev => prev + 1);
              }}
              className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400/50 shadow-sm'
                  : completedIndices.includes(idx)
                  ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Exercise Card */}
      {currentEx && (
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 transition-colors">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {currentEx.type.replace('_', ' ')}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-2">{t(currentEx.title)}</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">{t(currentEx.instruction)}</p>
          </div>

          {/* Interactive Area according to Exercise Type */}
          {currentEx.type === 'predict_output' && currentEx.options ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap">
                {currentEx.starterCode}
              </div>

              <p className="text-xs font-semibold text-slate-800 dark:text-slate-300">{dict.exercises.optionsTitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentEx.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`p-3 rounded-xl border text-left font-mono text-xs transition-all cursor-pointer ${
                      selectedOption === idx
                        ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-blue-900 dark:text-white shadow-md shadow-blue-500/10 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="inline-block w-5 text-slate-400 dark:text-slate-500 font-bold">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCheckPredict}
                  disabled={selectedOption === null}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 disabled:opacity-40 transition-all cursor-pointer active:scale-95"
                >
                  {dict.exercises.checkAnswer}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <CodeEditor
                key={`ex-${currentIndex}-${exerciseCodeKey}`}
                initialCode={activeCode || currentEx.starterCode}
                language={language}
                mode="exercise"
                onExecutionComplete={handleCodeExecution}
              />
            </div>
          )}

          {/* Feedback & Explanations */}
          {feedback && (
            <div className={`p-4 rounded-xl flex items-start gap-3 border ${
              feedback.isCorrect 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300' 
                : 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300'
            }`}>
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="text-xs space-y-1">
                <p className="font-bold">{feedback.message}</p>
                {feedback.isCorrect && currentEx.explanation && (
                  <p className="text-slate-700 dark:text-slate-300 mt-1">{t(currentEx.explanation)}</p>
                )}
              </div>
            </div>
          )}

          {/* Bottom Action Footer: Hint (Left), Show Answer (Bottom near Next), Next/Continue (Right) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            {/* Left: Hint */}
            <div>
              {currentEx.hint && (
                <div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 flex items-center gap-1.5 font-medium cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4" />
                    {dict.exercises.hintLabel}
                  </button>
                  {showHint && (
                    <p className="text-xs text-amber-900 dark:text-amber-200/90 mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                      💡 {t(currentEx.hint)}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Right Group: Show Answer & Next Exercise */}
            <div className="flex items-center gap-3 ml-auto">
              {(currentEx.solutionCode || currentEx.correctOptionIndex !== undefined) && !answerRevealed && (
                <button
                  onClick={handleShowAnswer}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {dict.exercises.showAnswer}
                </button>
              )}

              {currentIndex < activeExercises.length - 1 && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-blue-600/20"
                >
                  {dict.exercises.nextExercise}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Completion Banner */}
      {completedIndices.length === activeExercises.length && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 dark:from-emerald-950/40 to-teal-50 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{dict.exercises.allPassed}</h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-200/80 mt-0.5">{dict.exercises.allPassedDesc}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            {dict.exercises.allPassed}
          </span>
        </div>
      )}
    </div>
  );
};
