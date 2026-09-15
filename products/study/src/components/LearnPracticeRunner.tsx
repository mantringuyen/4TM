import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { Lesson, CodeExecutionResult, LearnPractice } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { getLessonLearnPractice, validateLearnPractice, PracticeValidationResult } from '../services/learnPracticeService';
import { CodeEditor } from './CodeEditor';
import { PowerBiWorkspace } from './PowerBiWorkspace';
import { getStorageKey } from '../services/storageService';

interface LearnPracticeRunnerProps {
  lesson: Lesson;
  courseId: string;
  isCompleted: boolean;
  onComplete: () => void;
  onContinueToExercises: () => void;
}

export const LearnPracticeRunner: React.FC<LearnPracticeRunnerProps> = ({
  lesson,
  courseId,
  isCompleted,
  onComplete,
  onContinueToExercises,
}) => {
  const { currentLanguage, dict } = useLanguage();
  const isVi = currentLanguage === 'vi';

  // Helper to pick/save practice index per attempt
  const getSavedPracticeIndex = (lId: string, max: number): number => {
    if (typeof window === 'undefined' || max <= 1) return 0;
    const storageKey = getStorageKey(`attempt_practice_${lId}`);
    try {
      const saved = sessionStorage.getItem(storageKey) || localStorage.getItem(storageKey);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < max) return parsed;
      }
    } catch {
      // Ignore
    }
    const rand = Math.floor(Math.random() * max);
    try {
      sessionStorage.setItem(storageKey, rand.toString());
      localStorage.setItem(storageKey, rand.toString());
    } catch {
      // Ignore
    }
    return rand;
  };

  const practicePool = lesson.learn.practicePool && lesson.learn.practicePool.length > 0 
    ? lesson.learn.practicePool 
    : [getLessonLearnPractice(lesson, courseId)];

  const [poolIndex, setPoolIndex] = useState<number>(() => getSavedPracticeIndex(lesson.id, practicePool.length));
  const [activePractice, setActivePractice] = useState<LearnPractice>(() => practicePool[poolIndex] || practicePool[0]);

  // Stage 1: Learn Practice, Stage 2: Consolidation Practice (if available)
  const hasConsolidation = !!(lesson.learn.consolidationPractice || (lesson.learn.consolidationPracticePool && lesson.learn.consolidationPracticePool.length > 0));
  const consolidationPractice = lesson.learn.consolidationPractice || lesson.learn.consolidationPracticePool?.[0];

  const [currentStep, setCurrentStep] = useState<'learn' | 'consolidation'>('learn');
  const [step1Passed, setStep1Passed] = useState(isCompleted);
  const [step2Passed, setStep2Passed] = useState(isCompleted);
  const [showHint, setShowHint] = useState(false);
  const [lastResult, setLastResult] = useState<CodeExecutionResult | null>(null);
  const [validationStatus, setValidationStatus] = useState<PracticeValidationResult | null>(null);
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    const pPool = lesson.learn.practicePool && lesson.learn.practicePool.length > 0 
      ? lesson.learn.practicePool 
      : [getLessonLearnPractice(lesson, courseId)];
    const savedIdx = getSavedPracticeIndex(lesson.id, pPool.length);
    setPoolIndex(savedIdx);
    setActivePractice(pPool[savedIdx] || pPool[0]);
    setCurrentStep('learn');
    setStep1Passed(isCompleted);
    setStep2Passed(isCompleted);
    setShowHint(false);
    setValidationStatus(null);
    setEditorKey(prev => prev + 1);
  }, [lesson.id, isCompleted, courseId]);

  const activeTask = currentStep === 'learn' ? activePractice : consolidationPractice!;

  const taskTitle = activeTask?.task 
    ? (isVi ? activeTask.task.vi : activeTask.task.en)
    : (currentStep === 'consolidation' 
        ? (isVi ? 'Thực hành củng cố kiến thức' : 'Consolidation Practice') 
        : (dict.lesson.practiceHeading || (isVi ? 'Thực hành sửa lỗi nhanh' : 'Learn Practice')));

  const instructionText = activeTask?.instruction
    ? (isVi ? activeTask.instruction.vi : activeTask.instruction.en)
    : (dict.lesson.practiceSubheading || (isVi ? 'Sửa lỗi và nhấn Chạy mã để kiểm tra.' : 'Fix the code and click Run Code.'));

  const hintText = activeTask?.hint
    ? (isVi ? activeTask.hint.vi : activeTask.hint.en)
    : null;

  const handleExecutionComplete = (result: CodeExecutionResult, currentCode?: string) => {
    setLastResult(result);
    const code = currentCode || activeTask.starterCode;

    // If code threw a runtime or syntax error
    if (!result.isSuccess) {
      setValidationStatus({
        isValid: false,
        message: isVi
          ? 'Mã nguồn vẫn còn lỗi khi thực thi. Hãy sửa lỗi dựa theo thông báo bên dưới.'
          : 'The code encountered errors during execution. Please fix the error and try again.',
      });
      return;
    }

    // Validate the actual intended fix and verify logic & output preservation
    const validation = validateLearnPractice(code, result, activeTask, isVi ? 'vi' : 'en');
    setValidationStatus(validation);

    if (validation.isValid) {
      if (currentStep === 'learn') {
        setStep1Passed(true);
        if (!hasConsolidation) {
          onComplete();
        }
      } else {
        setStep2Passed(true);
        onComplete();
      }
    }
  };

  const handleShufflePractice = () => {
    if (practicePool.length <= 1) return;
    const nextIdx = (poolIndex + 1) % practicePool.length;
    setPoolIndex(nextIdx);
    setActivePractice(practicePool[nextIdx]);
    setShowHint(false);
    setValidationStatus(null);
    setStep1Passed(false);
    setEditorKey(prev => prev + 1);
    try {
      const storageKey = getStorageKey(`attempt_practice_${lesson.id}`);
      sessionStorage.setItem(storageKey, nextIdx.toString());
      localStorage.setItem(storageKey, nextIdx.toString());
    } catch {
      // Ignore
    }
  };

  const isAllPracticeDone = hasConsolidation ? (step1Passed && step2Passed) : step1Passed;

  return (
    <div 
      id="learn-practice-runner-container"
      className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800"
    >
      {/* Practice Header Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              {currentStep === 'consolidation' ? (
                <>
                  <Layers className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{isVi ? 'Củng cố kiến thức' : 'Consolidation'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{dict.lesson.practiceBadge || (isVi ? 'Thực hành' : 'Learn Practice')}</span>
                </>
              )}
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{taskTitle}</span>
            </h4>
          </div>

          <div className="flex items-center gap-2">
            {practicePool.length > 1 && currentStep === 'learn' && (
              <button
                id="shuffle-practice-pool-btn"
                type="button"
                onClick={handleShufflePractice}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                title={isVi ? 'Đổi biến thể thực hành khác' : 'Try another practice variation'}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isVi ? 'Đổi bài khác' : 'Shuffle'}</span>
              </button>
            )}

            {hintText && (
              <button
                id="toggle-practice-hint-btn"
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? (dict.lesson.practiceHideHint || 'Hide Hint') : (dict.lesson.practiceShowHint || 'Show Hint')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Task Instruction */}
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {instructionText}
        </p>

        {/* Expandable Hint Box */}
        {showHint && hintText && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 space-y-1 animate-in fade-in duration-150">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{dict.lesson.practiceHint || (isVi ? 'Gợi ý' : 'Hint')}:</span>
            </div>
            <p className="pl-5 leading-relaxed">{hintText}</p>
          </div>
        )}
      </div>

      {/* Editable Code Runner */}
      {courseId === 'powerbi' ? (
        <PowerBiWorkspace
          key={`${lesson.id}_${currentStep}_${editorKey}`}
          initialDax={activeTask.starterCode}
          height="520px"
        />
      ) : (
        <CodeEditor
          key={`${lesson.id}_${currentStep}_${editorKey}`}
          initialCode={activeTask.starterCode}
          language={lesson.courseId || courseId}
          mode="learn"
          readOnly={false}
          onExecutionComplete={handleExecutionComplete}
        />
      )}

      {/* Validation Failed Feedback Card */}
      {validationStatus && !validationStatus.isValid && lastResult?.isSuccess && (
        <div 
          id="learn-practice-validation-fail-card"
          className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3 animate-in fade-in duration-200"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-amber-900 dark:text-amber-100">
              {isVi ? 'Chưa đạt yêu cầu sửa lỗi' : 'Validation Check Failed'}
            </p>
            <p className="leading-relaxed">
              {validationStatus.message}
            </p>
          </div>
        </div>
      )}

      {/* Step 1 Passed (with Consolidation available) */}
      {hasConsolidation && step1Passed && currentStep === 'learn' && (
        <div 
          id="step1-completed-banner"
          className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200"
        >
          <div className="flex items-center gap-3 text-emerald-900 dark:text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold">
                {isVi ? 'Đã hoàn thành bước 1! Chuyển sang Thực hành củng cố' : 'Step 1 Complete! Continue to Consolidation Practice'}
              </p>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300/90">
                {isVi ? 'Áp dụng tổng hợp kiến thức vừa học qua một bài toán ngắn gọn tiếp theo.' : 'Consolidate newly acquired concepts in a quick follow-up challenge.'}
              </p>
            </div>
          </div>

          <button
            id="practice-continue-to-consolidation-btn"
            type="button"
            onClick={() => {
              setCurrentStep('consolidation');
              setShowHint(false);
              setValidationStatus(null);
              setEditorKey(prev => prev + 1);
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>{isVi ? 'Thực hành củng cố' : 'Consolidation Practice'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* All Practice Completed Banner */}
      {isAllPracticeDone && (
        <div 
          id="learn-practice-completed-banner"
          className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200"
        >
          <div className="flex items-center gap-3 text-emerald-900 dark:text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold">
                {dict.lesson.practiceCompleted || (isVi ? 'Đã hoàn thành thực hành!' : 'Practice Completed!')}
              </p>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300/90">
                {dict.lesson.practiceCompletedDesc || (isVi ? 'Bạn đã sửa lỗi thành công. Đã sẵn sàng chuyển sang phần Bài tập.' : 'You fixed the error successfully. Ready to continue to the Exercises.')}
              </p>
            </div>
          </div>

          <button
            id="practice-continue-to-exercises-btn"
            type="button"
            onClick={onContinueToExercises}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>{dict.course.stageExercises || 'Exercises'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

