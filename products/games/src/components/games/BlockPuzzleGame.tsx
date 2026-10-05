import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { RotateCcw, Maximize2, Minimize2, Sparkles, Gamepad2, Loader2, X } from 'lucide-react';

export interface BlockPuzzleGameProps {
  language: Language;
}

export const BlockPuzzleGame: React.FC<BlockPuzzleGameProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Helper to check if any element is currently in native full screen
  const getFullscreenElement = useCallback(() => {
    if (typeof document === 'undefined') return null;
    return (
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement ||
      null
    );
  }, []);

  // Listen to native browser fullscreen change events
  useEffect(() => {
    const handleFsChange = () => {
      const fsElem = getFullscreenElement();
      if (fsElem) {
        setIsFullscreen(true);
      } else {
        // Exited native fullscreen
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);
    document.addEventListener('MSFullscreenChange', handleFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
      document.removeEventListener('MSFullscreenChange', handleFsChange);
    };
  }, [getFullscreenElement]);

  // Prevent outer background scrolling when in full/expanded screen mode (especially for iOS Safari)
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Reload the game engine instance
  const handleRestart = useCallback(() => {
    setIsLoading(true);
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.location.reload();
      } catch (_) {
        iframeRef.current.src = '/games/block-puzzle/index.html';
      }
    }
  }, []);

  // Toggle fullscreen mode (with iOS Safari / WebView fallback)
  const handleToggleFullscreen = useCallback(() => {
    const elem = containerRef.current;
    if (!elem) return;

    const isCurrentlyNativeFs = !!getFullscreenElement();

    if (!isFullscreen && !isCurrentlyNativeFs) {
      // Enter Fullscreen Mode
      let nativeFsSuccess = false;

      if (elem.requestFullscreen) {
        elem
          .requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
            nativeFsSuccess = true;
          })
          .catch(() => {
            // Rejected (e.g. mobile Safari) -> fallback to pseudo-fullscreen overlay
            setIsFullscreen(true);
          });
      } else if ((elem as any).webkitRequestFullscreen) {
        try {
          (elem as any).webkitRequestFullscreen();
          setIsFullscreen(true);
          nativeFsSuccess = true;
        } catch (_) {
          setIsFullscreen(true);
        }
      } else if ((elem as any).mozRequestFullScreen) {
        try {
          (elem as any).mozRequestFullScreen();
          setIsFullscreen(true);
          nativeFsSuccess = true;
        } catch (_) {
          setIsFullscreen(true);
        }
      } else if ((elem as any).msRequestFullscreen) {
        try {
          (elem as any).msRequestFullscreen();
          setIsFullscreen(true);
          nativeFsSuccess = true;
        } catch (_) {
          setIsFullscreen(true);
        }
      } else {
        // Browser does not support Fullscreen API (e.g. iPhone iOS Safari) -> pseudo-fullscreen modal
        setIsFullscreen(true);
      }
    } else {
      // Exit Fullscreen Mode
      if (isCurrentlyNativeFs) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
      setIsFullscreen(false);
    }
  }, [isFullscreen, getFullscreenElement]);

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
        className={`relative transition-all overflow-hidden flex flex-col items-center justify-center ${
          isFullscreen
            ? 'fixed inset-0 z-[9999] w-screen h-screen max-w-none max-h-none rounded-none bg-slate-950 p-2 sm:p-4'
            : 'w-full rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl p-2 sm:p-3 aspect-[9/16] max-h-[740px]'
        }`}
      >
        {/* Floating Quick Action Overlay in Fullscreen Mode */}
        {isFullscreen && (
          <div className="absolute top-3 right-3 z-30 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-lg">
            <button
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-rose-400 hover:bg-slate-700 transition-colors cursor-pointer"
              title={dict.playView.restart}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="p-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Exit Fullscreen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
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
          className="w-full h-full aspect-[9/16] max-w-full max-h-full rounded-2xl border-0 bg-black object-contain"
          allow="autoplay; fullscreen; focus-without-user-activation *"
          tabIndex={0}
        />
      </div>
    </div>
  );
};

export default BlockPuzzleGame;
