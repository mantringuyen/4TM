import React, { useState, useRef, useCallback } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { RotateCcw, Maximize2, Minimize2, Sparkles, Gamepad2, Loader2 } from 'lucide-react';

export interface BlockPuzzleGameProps {
  language: Language;
}

export const BlockPuzzleGame: React.FC<BlockPuzzleGameProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reload the game engine instance
  const handleRestart = useCallback(() => {
    setIsLoading(true);
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.location.reload();
      } catch (_) {
        // Fallback: reset iframe src
        iframeRef.current.src = '/games/block-puzzle/index.html';
      }
    }
  }, []);

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
