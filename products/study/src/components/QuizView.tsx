import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { QuizQuestion } from '../types';
import { getStorageKey } from '../services/storageService';

interface QuizViewProps {
  questionPool: QuizQuestion[];
  onQuizCompleted: (scorePercentage: number, topicResults: Record<string, boolean>) => void;
  bestScore?: number;
  lessonId?: string;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questionPool,
  onQuizCompleted,
  bestScore = 0,
  lessonId = 'default',
}) => {
  const { t, dict } = useLanguage();

  // Helper to select 10 questions stably or randomly
  const selectAttemptQuestions = (pool: QuizQuestion[], lId: string, forceNew = false): QuizQuestion[] => {
    if (!pool || pool.length === 0) return [];
    if (pool.length <= 10) return [...pool];

    const storageKey = getStorageKey(`attempt_quiz_${lId}`);
    if (!forceNew && typeof window !== 'undefined') {
      try {
        const savedRaw = sessionStorage.getItem(storageKey) || localStorage.getItem(storageKey);
        if (savedRaw) {
          const savedIds: string[] = JSON.parse(savedRaw);
          if (Array.isArray(savedIds) && savedIds.length === 10) {
            const mapped = savedIds
              .map(id => pool.find(q => q.id === id))
              .filter((q): q is QuizQuestion => !!q);
            if (mapped.length === 10) {
              return mapped;
            }
          }
        }
      } catch {
        // Fallback to fresh selection
      }
    }

    // Pick a fresh random 10 questions from the pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    if (typeof window !== 'undefined') {
      try {
        const idsToSave = JSON.stringify(shuffled.map(q => q.id));
        sessionStorage.setItem(storageKey, idsToSave);
        localStorage.setItem(storageKey, idsToSave);
      } catch {
        // Ignore storage errors
      }
    }
    return shuffled;
  };

  const [questions, setQuestions] = useState<QuizQuestion[]>(() => {
    return selectAttemptQuestions(questionPool, lessonId, false);
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    correctCount: number;
    total: number;
    percentage: number;
    passed: boolean;
  } | null>(null);

  // Sync questions when lessonId or questionPool changes
  React.useEffect(() => {
    setQuestions(selectAttemptQuestions(questionPool, lessonId, false));
    setCurrentIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
  }, [lessonId, questionPool]);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted || !currentQ) return;
    const currentSelected = userAnswers[currentIdx] || [];
    
    if (currentQ.type === 'multiple_choice') {
      const next = currentSelected.includes(optIdx)
        ? currentSelected.filter(i => i !== optIdx)
        : [...currentSelected, optIdx];
      setUserAnswers({ ...userAnswers, [currentIdx]: next });
    } else {
      setUserAnswers({ ...userAnswers, [currentIdx]: [optIdx] });
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    const topicResults: Record<string, boolean> = {};

    questions.forEach((q, idx) => {
      const selected = (userAnswers[idx] || []).sort();
      const correct = [...q.correctAnswers].sort();
      const isCorrect = 
        selected.length === correct.length &&
        selected.every((val, i) => val === correct[i]);

      if (isCorrect) {
        correctCount += 1;
      }

      if (q.topicId) {
        topicResults[q.topicId] = isCorrect;
      }
    });

    const total = questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= 80;

    setScoreResult({
      correctCount,
      total,
      percentage,
      passed,
    });
    setIsSubmitted(true);

    onQuizCompleted(percentage, topicResults);
  };

  const handleRetry = () => {
    // Generate fresh random 10 questions for new attempt
    const freshQuestions = selectAttemptQuestions(questionPool, lessonId, true);
    setQuestions(freshQuestions);
    setCurrentIdx(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-blue-600/10 to-slate-100 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 border border-blue-200 dark:border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase font-bold text-blue-700 dark:text-blue-400">
              {dict.quiz.heading}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {dict.quiz.validationTitle || '10-Question Knowledge Validation'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            {dict.quiz.passThreshold} {bestScore > 0 && `(${scoreResult ? '' : ''}${bestScore}%)`}
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {questions.map((_, idx) => {
            const isAnswered = (userAnswers[idx] || []).length > 0;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  currentIdx === idx
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-sm'
                    : isAnswered
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card or Score Summary Card */}
      {!isSubmitted ? (
        currentQ && (
          <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            
            {/* Question Info */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {dict.quiz.questionProgress} {currentIdx + 1} {dict.quiz.of} {questions.length}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 border border-slate-200 dark:border-slate-700">
                {dict.quiz.topicPrefix || 'Topic:'} {currentQ.topicId}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {t(currentQ.question)}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = (userAnswers[currentIdx] || []).includes(optIdx);
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-500 text-blue-950 dark:text-white shadow-md font-semibold'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold border ${
                        isSelected ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{t(opt)}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold disabled:opacity-30 cursor-pointer"
              >
                {dict.quiz.prevQuestion}
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/20 cursor-pointer"
                >
                  <span>{dict.quiz.nextQuestion}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(userAnswers).length < questions.length}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 disabled:opacity-40 cursor-pointer"
                >
                  {dict.quiz.submitQuiz}
                </button>
              )}
            </div>

          </div>
        )
      ) : (
        /* Results Breakdown & Question-by-Question Review */
        scoreResult && (
          <div className="space-y-6 animate-in fade-in">
            {/* Scorecard Banner */}
            <div className={`p-6 rounded-2xl border ${
              scoreResult.passed 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300' 
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-300'
            } flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm`}>
              
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${scoreResult.passed ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'}`}>
                  {scoreResult.passed ? <Sparkles className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {scoreResult.percentage}% ({scoreResult.correctCount}/{scoreResult.total})
                  </h3>
                  <p className="text-xs font-medium mt-0.5">
                    {scoreResult.passed ? dict.quiz.quizPassed : dict.quiz.quizFailed}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  {dict.quiz.retryQuiz}
                </button>
              </div>
            </div>

            {/* Detailed Question Review */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{dict.quiz.reviewIncorrect}</h4>

              {questions.map((q, idx) => {
                const selected = userAnswers[idx] || [];
                const isCorrect = 
                  selected.length === q.correctAnswers.length &&
                  selected.every((val, i) => val === q.correctAnswers[i]);

                return (
                  <div 
                    key={idx}
                    className={`p-5 rounded-2xl border ${
                      isCorrect 
                        ? 'bg-white dark:bg-slate-900/60 border-emerald-300 dark:border-emerald-500/30' 
                        : 'bg-white dark:bg-slate-900/60 border-rose-300 dark:border-rose-500/30'
                    } shadow-sm space-y-3`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                        )}
                        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                          {dict.quiz.questionPrefix || 'Question'} {idx + 1}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {q.topicId}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t(q.question)}</p>

                    {/* Options status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        const wasChosen = selected.includes(oIdx);
                        const isRightAnswer = q.correctAnswers.includes(oIdx);
                        
                        let optStyle = 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400';
                        if (isRightAnswer) {
                          optStyle = 'bg-emerald-50 dark:bg-emerald-500/15 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-semibold';
                        } else if (wasChosen && !isRightAnswer) {
                          optStyle = 'bg-rose-50 dark:bg-rose-500/15 border-rose-300 dark:border-rose-500/40 text-rose-800 dark:text-rose-300';
                        }

                        return (
                          <div key={oIdx} className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${optStyle}`}>
                            <span>{t(opt)}</span>
                            {isRightAnswer && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-slate-900 dark:text-slate-200">
                          {dict.quiz.explanationPrefix || 'Explanation:'}{' '}
                        </span>
                        {t(q.explanation)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
};
