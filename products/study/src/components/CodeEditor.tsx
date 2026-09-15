import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  Terminal, 
  Eye, 
  Clock, 
  CheckCircle2,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import { executeCode } from '../services/codeRunner';
import { parseErrorDetails, analyzeAndFixError } from '../services/codeFixer';
import { CodeExecutionResult, SuggestedFix } from '../types';
import { stripCommentsAndWhitespace } from '../services/challengeValidator';
import { CodeErrorPanel } from './CodeErrorPanel';
import { ErrorFixModal } from './ErrorFixModal';

interface CodeEditorProps {
  initialCode: string;
  language: string; // 'python' | 'sql' | 'html' | 'css' | 'javascript'
  mode?: 'exercise' | 'challenge' | 'playground' | 'learn';
  onExecutionComplete?: (result: CodeExecutionResult, code?: string) => void;
  onSuccess?: (result: CodeExecutionResult) => void;
  onError?: (result: CodeExecutionResult) => void;
  height?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  mode = 'exercise',
  onExecutionComplete,
  onSuccess,
  onError,
  height,
  readOnly = false,
}) => {
  const { currentLanguage, dict } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<'console' | 'preview'>(
    language === 'html' || language === 'css' ? 'preview' : 'console'
  );
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<CodeExecutionResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeFix, setActiveFix] = useState<SuggestedFix | null>(null);
  const [fixToast, setFixToast] = useState<string | null>(null);

  // References for Monaco editor and error decorations
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  // Compute language for Monaco
  const getMonacoLanguage = (lang: string): string => {
    const l = (lang || '').toLowerCase().trim();
    if (l === 'python' || l === 'py') return 'python';
    if (l === 'sql' || l === 'sqlite') return 'sql';
    if (l === 'javascript' || l === 'js') return 'javascript';
    if (l === 'html' || l === 'html5') return 'html';
    if (l === 'css' || l === 'css3') return 'css';
    if (l === 'powerbi' || l === 'dax') return 'sql';
    if (l === 'excel' || l === 'xlsx' || l === 'formula') return 'sql';
    return 'plaintext';
  };

  const monacoLang = getMonacoLanguage(language);

  // Dynamic content height calculation (minimum 130px)
  const computeInitialHeight = (codeStr: string) => {
    const lineCount = (codeStr || '').split('\n').length;
    return Math.max(130, Math.min(650, lineCount * 21 + 32));
  };

  const [editorContentHeight, setEditorContentHeight] = useState<number>(() =>
    computeInitialHeight(initialCode)
  );

  // Sync state when initialCode or language changes
  useEffect(() => {
    setCode(initialCode);
    setResult(null);
    setActiveFix(null);
    setEditorContentHeight(computeInitialHeight(initialCode));
    if (language === 'html' || language === 'css') {
      setActiveTab('preview');
    } else {
      setActiveTab('console');
    }
  }, [initialCode, language]);

  // Helper to enforce mobile keyboard configuration (no auto-caps, no auto-correct, no spellcheck)
  const enforceMobileCodeInputAttributes = (domNode: HTMLElement | null) => {
    if (!domNode) return;
    try {
      const textareas = domNode.querySelectorAll<HTMLTextAreaElement>('textarea');
      textareas.forEach((ta) => {
        ta.setAttribute('autocapitalize', 'none');
        ta.setAttribute('autocorrect', 'off');
        ta.setAttribute('autocomplete', 'off');
        ta.setAttribute('spellcheck', 'false');
        ta.setAttribute('enterkeyhint', 'enter');
        ta.setAttribute('data-gramm', 'false');
        ta.setAttribute('data-enable-grammarly', 'false');
        // Direct property assignment for iOS WebKit & Android Chrome
        (ta as any).autocapitalize = 'none';
        (ta as any).autocorrect = 'off';
        ta.spellcheck = false;
        ta.autocomplete = 'off';
      });
    } catch (err) {
      console.warn('Failed setting mobile code input attributes:', err);
    }
  };

  // Handle Monaco mounting and auto-height dynamic listener
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    const domNode = editor.getDomNode?.();
    if (domNode) {
      enforceMobileCodeInputAttributes(domNode);

      // MutationObserver in case Monaco re-creates/swaps textarea elements
      const observer = new MutationObserver(() => {
        enforceMobileCodeInputAttributes(domNode);
      });
      observer.observe(domNode, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });

      // Enforce on mobile touch, pointerdown, and focusin interactions
      const handleInteraction = () => {
        enforceMobileCodeInputAttributes(domNode);
      };
      domNode.addEventListener('touchstart', handleInteraction, { passive: true });
      domNode.addEventListener('pointerdown', handleInteraction, { passive: true });
      domNode.addEventListener('focusin', handleInteraction, { passive: true });
    }

    // Monaco focus and cursor hooks to guarantee autocapitalize="none" remains active
    editor.onDidFocusEditorText?.(() => {
      enforceMobileCodeInputAttributes(editor.getDomNode?.());
    });
    editor.onDidFocusEditorWidget?.(() => {
      enforceMobileCodeInputAttributes(editor.getDomNode?.());
    });
    editor.onDidChangeCursorPosition?.(() => {
      enforceMobileCodeInputAttributes(editor.getDomNode?.());
    });

    // Attach shortcut: Ctrl+Enter or Cmd+Enter to Run
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
    });

    const updateHeight = () => {
      if (isFullscreen) return;
      const contentH = editor.getContentHeight();
      if (contentH > 0) {
        // Expand to fit content without inner scrollbar (minimum 130px, maximum 700px before scrolling)
        const targetHeight = Math.max(130, Math.min(contentH + 16, 700));
        setEditorContentHeight(targetHeight);
      }
    };

    editor.onDidContentSizeChange(updateHeight);
    updateHeight();
  };

  // Error line decoration in Monaco
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    const errorLine = result && !result.isSuccess ? result.errorDetail?.lineNumber : undefined;

    if (errorLine && errorLine > 0) {
      const newDecorations = [
        {
          range: new monaco.Range(errorLine, 1, errorLine, 1),
          options: {
            isWholeLine: true,
            className: 'bg-rose-500/20 border-l-4 border-rose-500',
            glyphMarginClassName: 'bg-rose-500 rounded-full',
          },
        },
      ];
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, newDecorations);
    } else {
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
    }
  }, [result]);

  const handleRun = async () => {
    const codeToRun = editorRef.current ? editorRef.current.getValue() : code;
    setIsRunning(true);
    setFixToast(null);

    // Empty or comment-only code guard: do not execute or treat as successful
    const stripped = stripCommentsAndWhitespace(codeToRun, language);
    if (!stripped) {
      setIsRunning(false);
      const emptyMsg = dict.editor.emptyCodeWarning || 'Please write your solution before running the code.';
      const emptyRes: CodeExecutionResult = {
        isSuccess: false,
        output: '',
        error: emptyMsg,
        simpleExplanation: emptyMsg,
        detailedError: emptyMsg,
        executionTimeMs: 0,
      };
      setResult(emptyRes);
      if (language !== 'html' && language !== 'css') {
        setActiveTab('console');
      }
      if (onExecutionComplete) {
        onExecutionComplete(emptyRes, codeToRun);
      }
      return;
    }

    try {
      const res = await executeCode(codeToRun, language);
      const langPref = currentLanguage === 'vi' ? 'vi' : 'en';
      if (!res.isSuccess && res.error) {
        const parsedDetail = parseErrorDetails(res.error, language, codeToRun, langPref);
        const suggestedFix = analyzeAndFixError(codeToRun, language, parsedDetail, { 
          mode: mode as 'exercise' | 'challenge' | 'playground' | 'learn' 
        });
        parsedDetail.suggestedFix = suggestedFix;
        res.errorDetail = parsedDetail;
      }
      setResult(res);
      if (language !== 'html' && language !== 'css') {
        setActiveTab('console');
      }
      if (onExecutionComplete) {
        onExecutionComplete(res, codeToRun);
      }
      if (res.isSuccess) {
        if (onSuccess) onSuccess(res);
      } else {
        if (onError) onError(res);
      }
    } catch (err: any) {
      const langPref = currentLanguage === 'vi' ? 'vi' : 'en';
      const parsedDetail = parseErrorDetails(String(err), language, codeToRun, langPref);
      const suggestedFix = analyzeAndFixError(codeToRun, language, parsedDetail, { 
        mode: mode as 'exercise' | 'challenge' | 'playground' | 'learn' 
      });
      parsedDetail.suggestedFix = suggestedFix;

      const errRes: CodeExecutionResult = {
        isSuccess: false,
        output: '',
        error: String(err),
        simpleExplanation: currentLanguage === 'vi' ? 'Trình chạy mã gặp lỗi hệ thống bất ngờ.' : 'Code runner experienced an unexpected internal error.',
        detailedError: String(err),
        executionTimeMs: 0,
        errorDetail: parsedDetail,
      };
      setResult(errRes);
      if (onExecutionComplete) {
        onExecutionComplete(errRes, codeToRun);
      }
      if (onError) {
        onError(errRes);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    if (editorRef.current) {
      editorRef.current.setValue(initialCode);
    }
    setResult(null);
    setActiveFix(null);
    setFixToast(null);
  };

  const handleCopy = async () => {
    try {
      const currentCode = editorRef.current ? editorRef.current.getValue() : code;
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleOpenFix = () => {
    if (!result) return;
    const currentCode = editorRef.current ? editorRef.current.getValue() : code;
    const langPref = currentLanguage === 'vi' ? 'vi' : 'en';
    
    // Check if errorDetail already has a suggested fix
    if (result.errorDetail?.suggestedFix) {
      setActiveFix(result.errorDetail.suggestedFix);
      return;
    }

    // Compute fix dynamically
    const errDetail = result.errorDetail || parseErrorDetails(result.error || '', language, currentCode, langPref);
    const computedFix = analyzeAndFixError(currentCode, language, errDetail, { 
      mode: mode as 'exercise' | 'challenge' | 'playground' | 'learn' 
    });

    if (computedFix) {
      setActiveFix(computedFix);
    } else {
      setFixToast(dict.editor.noFixAvailable || 'No automatic fix could be reliably determined. Please check hints or review the explanation.');
      setTimeout(() => setFixToast(null), 4500);
    }
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
    if (editorRef.current) {
      editorRef.current.setValue(fixedCode);
    }
    setActiveFix(null);
    setFixToast(dict.editor.fixAppliedToast || 'Fix applied! Press Run to test.');
    setTimeout(() => setFixToast(null), 4000);
  };

  const handleJumpToLine = (lineNumber: number) => {
    if (!editorRef.current) return;
    editorRef.current.revealLineInCenter(lineNumber);
    editorRef.current.setPosition({ lineNumber, column: 1 });
    editorRef.current.focus();
  };

  const monacoTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'vs';

  return (
    <div 
      id="4tm-code-editor-container"
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95 shadow-xl transition-all duration-200 ${
        isFullscreen 
          ? 'fixed inset-4 z-50 bg-white dark:bg-slate-950 shadow-2xl flex flex-col h-[calc(100vh-32px)] overflow-hidden' 
          : 'w-full flex flex-col'
      }`}
    >
      {/* Fix Preview Modal */}
      {activeFix && (
        <ErrorFixModal
          suggestedFix={activeFix}
          language={language}
          onApplyFix={handleApplyFix}
          onClose={() => setActiveFix(null)}
        />
      )}

      {/* Top Toolbar */}
      <div className="px-4 py-2.5 bg-slate-100/90 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 rounded-t-2xl transition-colors">
        
        {/* Language Badge & Mode */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-300 font-mono text-xs font-bold uppercase flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {language}
          </span>

          {readOnly && (
            <span 
              id="editor-readonly-badge"
              className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] font-semibold flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              <span>{dict.editor.exampleBanner || 'Example — Run to see the result'}</span>
            </span>
          )}

          {!readOnly && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
              {dict.editor.shortcutHint}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Quick Fix Button in Toolbar if error is present */}
          {result && !result.isSuccess && (
            <button
              id="toolbar-fix-btn"
              onClick={handleOpenFix}
              className="px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-600 dark:text-blue-300 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer mr-1 animate-pulse"
              title="Fix code error"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{dict.editor.fixButton || 'Fix'}</span>
            </button>
          )}

          <button
            id="editor-copy-btn"
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title={dict.editor.copy}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? dict.editor.copied : dict.editor.copy}</span>
          </button>

          <button
            id="editor-reset-btn"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title={dict.editor.reset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{dict.editor.reset}</span>
          </button>

          <button
            id="editor-fullscreen-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-xs cursor-pointer"
            title={dict.editor.fullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Run Button */}
          <button
            id="editor-run-btn"
            onClick={handleRun}
            disabled={isRunning}
            className="ml-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? dict.editor.running : dict.editor.run}</span>
          </button>
        </div>

      </div>

      {/* Editor & Output Split Body */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 ${
        isFullscreen ? 'flex-1 overflow-hidden min-h-0' : 'w-full'
      }`}>
        
        {/* Left Pane: Code Display or Monaco Editor Container */}
        <div className={`relative flex flex-col bg-slate-50/50 dark:bg-slate-950/40 ${
          isFullscreen ? 'h-full overflow-hidden' : 'w-full'
        }`}>
          {readOnly ? (
            <div 
              id="readonly-code-display"
              className="w-full h-full p-4 overflow-x-auto select-none pointer-events-none font-mono text-[13px] leading-[21px] text-slate-800 dark:text-slate-200 bg-slate-50/70 dark:bg-slate-950/70 border-r border-slate-200 dark:border-slate-800/60"
              tabIndex={-1}
              aria-hidden="true"
              style={{ minHeight: `${editorContentHeight}px` }}
            >
              <div className="flex select-none">
                {/* Line numbers column */}
                <div className="pr-4 select-none text-slate-400 dark:text-slate-600 text-right shrink-0 border-r border-slate-200 dark:border-slate-800/80 mr-4 font-mono select-none">
                  {code.split('\n').map((_, idx) => (
                    <div key={idx} className="h-[21px] text-xs leading-[21px]">{idx + 1}</div>
                  ))}
                </div>
                {/* Static Read-only Code Content */}
                <pre className="flex-1 overflow-x-auto whitespace-pre font-mono text-[13px] leading-[21px] text-slate-900 dark:text-slate-100 m-0 p-0 select-none">
                  <code>{code}</code>
                </pre>
              </div>
            </div>
          ) : (
            <div 
              className="w-full relative"
              style={{ height: isFullscreen ? '100%' : `${editorContentHeight}px` }}
            >
              <Editor
                height="100%"
                language={monacoLang}
                value={code}
                theme={monacoTheme}
                onChange={val => {
                  setCode(val || '');
                }}
                onMount={handleEditorDidMount}
                loading={
                  <div className="flex items-center justify-center p-8 text-xs text-slate-400 font-mono gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span>Loading editor...</span>
                  </div>
                }
                options={{
                  readOnly: false,
                  cursorStyle: 'line',
                  cursorWidth: 2,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 13,
                  lineHeight: 21,
                  fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
                  fontLigatures: true,
                  lineNumbers: 'on',
                  lineNumbersMinChars: 3,
                  glyphMargin: false,
                  folding: false,
                  lineDecorationsWidth: 6,
                  renderLineHighlight: 'all',
                  matchBrackets: 'always',
                  selectionHighlight: true,
                  occurrencesHighlight: 'singleFile',
                  links: true,
                  contextmenu: true,
                  quickSuggestions: true,
                  suggestOnTriggerCharacters: true,
                  tabIndex: 0,
                  automaticLayout: true,
                  wordWrap: 'on',
                  wrappingStrategy: 'advanced',
                  tabSize: language === 'html' || language === 'css' ? 2 : 4,
                  insertSpaces: true,
                  scrollbar: {
                    vertical: isFullscreen ? 'auto' : 'hidden',
                    horizontal: 'auto',
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                    alwaysConsumeMouseWheel: false,
                  },
                  overviewRulerBorder: false,
                  overviewRulerLanes: 0,
                  hideCursorInOverviewRuler: false,
                  smoothScrolling: true,
                  padding: { top: 12, bottom: 12 },
                  fixedOverflowWidgets: true,
                }}
              />
            </div>
          )}

          {/* Fix Applied Toast Overlay */}
          {fixToast && (
            <div 
              id="fix-applied-toast"
              className="absolute bottom-3 right-3 z-20 px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-mono text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{fixToast}</span>
            </div>
          )}
        </div>

        {/* Right Pane: Output Console / Live Preview */}
        <div className={`flex flex-col bg-slate-100/60 dark:bg-slate-950/80 ${
          isFullscreen ? 'flex-1 overflow-y-auto min-h-0' : 'w-full'
        }`}>
          
          {/* Output Header Tabs */}
          <div className="px-3 py-2 bg-slate-200/70 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1">
              <button
                id="tab-console-btn"
                onClick={() => setActiveTab('console')}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'console'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                {dict.editor.outputTab}
              </button>

              {(language === 'html' || language === 'css') && (
                <button
                  id="tab-preview-btn"
                  onClick={() => setActiveTab('preview')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {dict.editor.previewTab}
                </button>
              )}
            </div>

            {/* Timing & Clear */}
            <div className="flex items-center gap-2">
              {result && (
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {result.executionTimeMs}ms
                </span>
              )}
              {result && (
                <button
                  id="clear-output-btn"
                  onClick={() => setResult(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 transition-colors cursor-pointer"
                  title={dict.editor.clearOutput}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Output Content */}
          <div className={`p-4 font-mono text-xs ${
            isFullscreen ? 'flex-1 overflow-y-auto min-h-0' : 'w-full'
          }`}>
            
            {activeTab === 'preview' && (language === 'html' || language === 'css') ? (
              <div className={`w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shadow-inner ${
                isFullscreen ? 'h-full min-h-[300px]' : 'min-h-[220px]'
              }`}>
                <iframe
                  id="sandboxed-preview-frame"
                  title="Sandboxed Output"
                  sandbox="allow-scripts"
                  srcDoc={code}
                  className="w-full flex-1 min-h-[220px] border-none bg-white text-black"
                />
              </div>
            ) : result ? (
              <div className="space-y-3">
                
                {/* Success Banner */}
                {result.isSuccess ? (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{dict.editor.executionSuccess} ({result.executionTimeMs}ms)</span>
                    </div>
                    <pre className="text-slate-900 dark:text-slate-100 whitespace-pre-wrap break-words font-mono text-xs bg-white/80 dark:bg-slate-900/70 p-3 rounded-lg border border-emerald-500/20 max-h-[500px] overflow-y-auto">
                      {result.output}
                    </pre>
                  </div>
                ) : (
                  /* Dedicated Error UX Panel with Error Type, Line Number, Message, and Fix Button */
                  <CodeErrorPanel
                    result={result}
                    language={language}
                    onOpenFix={handleOpenFix}
                    onJumpToLine={handleJumpToLine}
                  />
                )}

              </div>
            ) : (
              <div className={`flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500 ${
                isFullscreen ? 'h-full min-h-[200px]' : 'min-h-[140px]'
              }`}>
                <Terminal className="w-7 h-7 mb-2 opacity-40 text-slate-400" />
                <p className="text-xs max-w-xs">{dict.editor.noOutput}</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
