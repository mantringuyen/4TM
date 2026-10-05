import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { RotateCcw, Maximize2, Minimize2, Sparkles, Gamepad2, Loader2, Bug, Trash2, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

export interface BlockPuzzleGameProps {
  language: Language;
}

interface DebugLogEntry {
  id: number;
  time: string;
  level: 'log' | 'warn' | 'error';
  message: string;
}

export const BlockPuzzleGame: React.FC<BlockPuzzleGameProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logScrollRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDebugOpen, setIsDebugOpen] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [logs, setLogs] = useState<DebugLogEntry[]>([]);
  const logIdRef = useRef(0);

  // Helper to add a log entry (max 200 items in memory)
  const appendLog = useCallback((level: 'log' | 'warn' | 'error', message: string, timeStr?: string) => {
    const time = timeStr || new Date().toTimeString().split(' ')[0];
    setLogs((prev) => {
      const next = [...prev, { id: ++logIdRef.current, time, level, message }];
      if (next.length > 200) {
        return next.slice(next.length - 200);
      }
      return next;
    });
  }, []);

  // Listen for logs from both iframe postMessage and parent window
  useEffect(() => {
    appendLog('log', '[4TM Debug Panel] Initialized on iPhone/Web');

    // 1. Iframe Message Bridge
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object' && event.data.type === '4TM_GAME_LOG') {
        appendLog(event.data.level || 'log', event.data.message || '', event.data.time);
      }
    };
    window.addEventListener('message', handleMessage);

    // 2. Parent Window Errors & Rejections
    const handleError = (event: ErrorEvent) => {
      appendLog('error', `[Parent Error] ${event.message || 'Unknown error'}`);
    };
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reasonText = event.reason instanceof Error ? (event.reason.stack || event.reason.message) : String(event.reason);
      appendLog('error', `[Parent Unhandled Rejection] ${reasonText}`);
    };
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    // 3. Parent Console Interceptor
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = (...args: unknown[]) => {
      originalLog.apply(console, args);
      const text = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
      if (text.includes('[4TM') || text.includes('Godot')) {
        appendLog('log', text);
      }
    };

    console.warn = (...args: unknown[]) => {
      originalWarn.apply(console, args);
      const text = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
      appendLog('warn', text);
    };

    console.error = (...args: unknown[]) => {
      originalError.apply(console, args);
      const text = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
      appendLog('error', text);
    };

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, [appendLog]);

  // Auto-scroll to latest log entry
  useEffect(() => {
    if (isDebugOpen && logScrollRef.current) {
      logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
    }
  }, [logs, isDebugOpen]);

  // Copy logs to clipboard
  const handleCopyLogs = useCallback(() => {
    const text = logs.map((l) => `[${l.time}] [${l.level.toUpperCase()}] ${l.message}`).join('\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }).catch(() => {});
    }
  }, [logs]);

  // Clear logs
  const handleClearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  // Reload the game engine instance
  const handleRestart = useCallback(() => {
    setIsLoading(true);
    appendLog('log', '[4TM Debug Panel] Reloading game engine iframe...');
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.location.reload();
      } catch (_) {
        iframeRef.current.src = '/games/block-puzzle/index.html';
      }
    }
  }, [appendLog]);

  // Toggle fullscreen mode
  const handleToggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.warn('Fullscreen request failed:', err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.warn('Exit fullscreen failed:', err));
    }
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Top Controls & Status Bar */}
      <div className="flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                Godot 4.3 Web
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              720 &times; 1280 &bull; {language === 'vi' ? 'Chơi Ngay' : 'Playable'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Debug Toggle Button */}
          <button
            type="button"
            onClick={() => setIsDebugOpen((prev) => !prev)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDebugOpen
                ? 'bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Toggle Debug Console"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>DEBUG</span>
            <span className="text-[10px] px-1 rounded-full bg-black/20">{logs.length}</span>
          </button>

          {/* Restart Button */}
          <button
            type="button"
            id="block-puzzle-restart-btn"
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title={dict.playView.restart}
            aria-label={dict.playView.restart}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            id="block-puzzle-fullscreen-btn"
            onClick={handleToggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Game Arena Container */}
      <div
        ref={containerRef}
        className={`relative w-full rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center justify-center transition-all ${
          isFullscreen ? 'p-0 w-screen h-screen rounded-none' : 'p-2 sm:p-3 aspect-[9/16] max-h-[740px]'
        }`}
      >
        {/* On-Screen Mobile Debug Console Panel */}
        {isDebugOpen && (
          <div className="absolute top-2 left-2 right-2 z-40 bg-slate-950/92 backdrop-blur-md border border-slate-700/70 rounded-2xl p-2.5 shadow-2xl flex flex-col max-h-[50%] transition-all">
            {/* Panel Header */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Bug className="w-3.5 h-3.5" />
                <span>iPhone / Web Console ({logs.length}/200)</span>
              </div>
              <div className="flex items-center gap-1">
                {navigator.clipboard && (
                  <button
                    type="button"
                    onClick={handleCopyLogs}
                    className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-1 text-[10px] cursor-pointer"
                    title="Copy all logs"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopied ? 'Copied' : 'COPY'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClearLogs}
                  className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-1 text-[10px] cursor-pointer"
                  title="Clear logs"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>CLEAR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsDebugOpen(false)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-[10px] cursor-pointer"
                  title="Minimize"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Logs Body */}
            <div
              ref={logScrollRef}
              className="overflow-y-auto space-y-1 font-mono text-[10px] sm:text-[11px] leading-tight text-slate-200 max-h-52 select-text overscroll-contain pr-1"
            >
              {logs.length === 0 ? (
                <div className="text-slate-500 italic py-2 text-center">Waiting for game loader events...</div>
              ) : (
                logs.map((log) => {
                  const isV4 = log.message.includes('[4TM Block Puzzle Loader v4]');
                  const isBoot = log.message.includes('Godot boot completed') || log.message.includes('Engine started successfully') || log.message.includes('Hiding loading overlay');
                  let badgeBg = 'bg-slate-800 text-slate-400';
                  if (log.level === 'error') badgeBg = 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
                  else if (log.level === 'warn') badgeBg = 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
                  else if (isBoot) badgeBg = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold';
                  else if (isV4) badgeBg = 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30';

                  return (
                    <div
                      key={log.id}
                      className={`p-1 rounded-md flex items-start gap-1.5 break-words ${
                        log.level === 'error'
                          ? 'bg-rose-950/40 text-rose-300'
                          : log.level === 'warn'
                          ? 'bg-amber-950/30 text-amber-300'
                          : isBoot
                          ? 'bg-emerald-950/40 text-emerald-200 font-semibold'
                          : 'bg-slate-900/40 text-slate-200'
                      }`}
                    >
                      <span className="text-[9px] text-slate-500 shrink-0 select-none pt-0.5">{log.time}</span>
                      <span className={`px-1 py-0.2 rounded text-[9px] uppercase shrink-0 select-none ${badgeBg}`}>
                        {log.level}
                      </span>
                      <span className="flex-1 whitespace-pre-wrap break-all">{log.message}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Collapsed Floating Debug Quick Pill */}
        {!isDebugOpen && (
          <button
            type="button"
            onClick={() => setIsDebugOpen(true)}
            className="absolute top-3 left-3 z-30 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700 text-amber-400 text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-lg hover:bg-slate-900 cursor-pointer"
          >
            <Bug className="w-3 h-3" />
            <span>DEBUG ({logs.length})</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="relative">
              <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
              <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight">
                {language === 'vi' ? 'Đang Khởi Động Godot Web Engine...' : 'Initializing Godot Web Engine...'}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                {language === 'vi'
                  ? 'Tải tài nguyên trò chơi từ R2 CDN'
                  : 'Loading game assets from R2 CDN'}
              </div>
            </div>
          </div>
        )}

        {/* Embedded Godot Web Runner */}
        <iframe
          ref={iframeRef}
          src="/games/block-puzzle/index.html"
          title="Block Puzzle — 4TM"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full rounded-2xl border-0 bg-black"
          allow="autoplay; fullscreen; focus-without-user-activation *"
          tabIndex={0}
        />
      </div>
    </div>
  );
};

export default BlockPuzzleGame;
