import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  Forward,
  Info,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ChallengeSpec, CodeExecutionResult } from '../types';
import { CodeEditor } from './CodeEditor';
import { getChallengeVariant } from '../services/challengeVariants';
import { validateChallengeSolution, ChallengeValidationResult } from '../services/challengeValidator';
import { getStorageKey } from '../services/storageService';

interface ChallengeViewProps {
  challenge: ChallengeSpec;
  challengePool?: ChallengeSpec[];
  lessonId?: string;
  language: string;
  onChallengePassed: () => void;
  isPassed: boolean;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  challenge,
  challengePool,
  lessonId = 'default',
  language,
  onChallengePassed,
  isPassed,
}) => {
  const { t, dict } = useLanguage();
  const getSavedVariantIndex = (lId: string): number => {
    if (typeof window === 'undefined') return 0;
    try {
      const storageKey = getStorageKey(`attempt_ch_${lId}`);
      const saved = sessionStorage.getItem(storageKey) || localStorage.getItem(storageKey);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return 0;
  };

  const saveVariantIndex = (lId: string, idx: number) => {
    if (typeof window === 'undefined') return;
    try {
      const storageKey = getStorageKey(`attempt_ch_${lId}`);
      sessionStorage.setItem(storageKey, idx.toString());
      localStorage.setItem(storageKey, idx.toString());
    } catch {
      // Ignore storage errors
    }
  };

  const [variantIndex, setVariantIndex] = useState(() => getSavedVariantIndex(lessonId));

  const getActiveChallenge = (idx: number, baseChallenge: ChallengeSpec): ChallengeSpec => {
    if (challengePool && challengePool.length > 0) {
      const poolIdx = Math.abs(idx) % challengePool.length;
      return challengePool[poolIdx];
    }
    if (idx === 0) return baseChallenge;
    return getChallengeVariant(baseChallenge, idx);
  };

  const [currentChallenge, setCurrentChallenge] = useState<ChallengeSpec>(() => {
    const initialIdx = getSavedVariantIndex(lessonId);
    return getActiveChallenge(initialIdx, challenge);
  });
  const [showHints, setShowHints] = useState(false);
  const [skipNotice, setSkipNotice] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [passed, setPassed] = useState(isPassed);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ChallengeValidationResult | null>(null);
  const [showExpectedOutput, setShowExpectedOutput] = useState(false);

  useEffect(() => {
    const savedIdx = getSavedVariantIndex(lessonId);
    setVariantIndex(savedIdx);
    setCurrentChallenge(getActiveChallenge(savedIdx, challenge));
    setPassed(isPassed);
    setSkipNotice(false);
    setValidationResult(null);
  }, [challenge, challengePool, isPassed, lessonId]);

  const handleExecution = async (result: CodeExecutionResult, submittedCode?: string) => {
    const code = submittedCode || '';
    setIsValidating(true);

    try {
      const validation = await validateChallengeSolution(code, result, currentChallenge, language);
      setValidationResult(validation);
      
      if (validation.isValid) {
        setPassed(true);
        onChallengePassed();
      } else {
        setPassed(false);
      }
    } catch (err) {
      console.error('Challenge validation error:', err);
      setPassed(false);
      setValidationResult({
        isValid: false,
        message: {
          en: 'Validation could not be completed. Please check your code.',
          vi: 'Không thể kiểm tra lời giải. Vui lòng xem lại mã nguồn của bạn.',
        },
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSkipChallenge = () => {
    const nextVariantIdx = variantIndex + 1;
    saveVariantIndex(lessonId, nextVariantIdx);
    const nextChallenge = getActiveChallenge(nextVariantIdx, challenge);
    setVariantIndex(nextVariantIdx);
    setCurrentChallenge(nextChallenge);
    setPassed(false);
    setSkipNotice(true);
    setShowHints(false);
    setValidationResult(null);
    setEditorKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-slate-100 dark:from-amber-950/40 dark:via-blue-950/30 dark:to-slate-900 border border-amber-300 dark:border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
              <Trophy className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase font-bold text-amber-700 dark:text-amber-400">
              {dict.challenge.heading}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{t(currentChallenge.title)}</h2>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {t(currentChallenge.description)}
          </p>
        </div>

        {/* Skip Challenge Action (Assesses independent application) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSkipChallenge}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-800 dark:hover:bg-amber-500/20 dark:hover:border-amber-500/40 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            title={dict.challenge.skipTooltip || 'Switch to another challenge with the same topic and difficulty'}
          >
            <Forward className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{dict.challenge.skipChallenge}</span>
          </button>
        </div>
      </div>

      {/* Skip Notice Banner */}
      {skipNotice && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-3 animate-in fade-in">
          <Info className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <p>{dict.challenge.skipNotice}</p>
        </div>
      )}

      {/* Requirements Card */}
      <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {dict.challenge.requirementsTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {currentChallenge.requirements.map((req, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-start gap-2.5"
            >
              <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-600'}`} />
              <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{t(req)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Code Editor for Challenge (mode="challenge" restricts Fix to technical syntax/formatting only) */}
      <div className="space-y-3">
        <CodeEditor
          key={`ch-${currentChallenge.id}-${editorKey}`}
          initialCode={currentChallenge.starterCode}
          language={language}
          mode="challenge"
          onExecutionComplete={handleExecution}
        />
      </div>

      {/* Validation Feedback Banner */}
      {isValidating && (
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs flex items-center gap-3">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400" />
          <span>{dict.challenge.verifying}</span>
        </div>
      )}

      {validationResult && !validationResult.isValid && !isValidating && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-500/40 text-xs space-y-2 animate-in fade-in">
          <div className="flex items-start gap-2.5 text-amber-900 dark:text-amber-200 font-semibold">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>{t(validationResult.message)}</span>
          </div>

          {/* Expected vs Actual Output Comparison toggle */}
          {validationResult.expectedOutput && (
            <div className="pt-2 border-t border-amber-200 dark:border-amber-500/30">
              <button
                onClick={() => setShowExpectedOutput(!showExpectedOutput)}
                className="text-[11px] font-medium text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {showExpectedOutput ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{showExpectedOutput ? (dict.challenge.hideExpectedOutput || 'Hide Expected Output') : (dict.challenge.seeExpectedOutput || 'See Expected Output')}</span>
              </button>

              {showExpectedOutput && (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                      {dict.challenge.expectedOutputLabel || 'Expected Output:'}
                    </span>
                    <pre className="whitespace-pre-wrap text-emerald-950 dark:text-emerald-100">{validationResult.expectedOutput}</pre>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 block mb-1">
                      {dict.challenge.actualOutputLabel || 'Your Output:'}
                    </span>
                    <pre className="whitespace-pre-wrap text-rose-950 dark:text-rose-100">{validationResult.actualOutput || '[No output]'}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Hints & Completion Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {currentChallenge.hints && currentChallenge.hints.length > 0 ? (
          <div>
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              {dict.challenge.showHint} ({currentChallenge.hints.length})
            </button>
            {showHints && (
              <div className="mt-2 space-y-2 max-w-xl">
                {currentChallenge.hints.map((h, i) => (
                  <p key={i} className="text-xs text-amber-900 dark:text-amber-200/90 p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    💡 <strong>{dict.challenge.hintPrefix || 'Hint'} {i + 1}:</strong> {t(h)}
                  </p>
                ))}
              </div>
            )}
          </div>
        ) : <div />}

        {passed && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>{dict.challenge.congratulations}</span>
          </div>
        )}
      </div>

      {/* Solution Explanation if passed */}
      {passed && currentChallenge.solutionExplanation && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <span className="font-bold text-slate-900 dark:text-slate-200">{dict.challenge.solutionAnalysis || 'Solution Analysis:'}</span>
          <p className="text-slate-600 dark:text-slate-400">{t(currentChallenge.solutionExplanation)}</p>
        </div>
      )}
    </div>
  );
};
