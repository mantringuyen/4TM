import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { RotateCcw, Maximize2, Minimize2, Sparkles, Gamepad2, Loader2 } from 'lucide-react';

export interface BlockPuzzleGameProps {
  language: Language;
}

export const BlockPuzzleGame: React.FC<BlockPuzzleGameProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const portalIframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isNativeFs, setIsNativeFs] = useState(false);
  // Default to true so opening Block Puzzle automatically enters the pseudo-fullscreen presentation
  const [isPseudoFs, setIsPseudoFs] = useState(true);

  const isFullscreen = isNativeFs || isPseudoFs;

  // Helper to check native fullscreen element
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

  // Sync native fullscreen events
  useEffect(() => {
    const handleFsChange = () => {
      const fsElem = getFullscreenElement();
      if (fsElem) {
        setIsNativeFs(true);
      } else {
        setIsNativeFs(false);
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

  // Lock scroll, prevent Safari bounce, and synchronize dark document state while fullscreen takeover is active
  useEffect(() => {
    if (isFullscreen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyTouchAction = document.body.style.touchAction;
      const originalBodyOverscroll = document.body.style.overscrollBehavior;
      const originalBodyBg = document.body.style.backgroundColor;

      const originalDocOverflow = document.documentElement.style.overflow;
      const originalDocTouchAction = document.documentElement.style.touchAction;
      const originalDocOverscroll = document.documentElement.style.overscrollBehavior;
      const originalDocBg = document.documentElement.style.backgroundColor;
      const originalColorScheme = document.documentElement.style.colorScheme;

      // Capture original <html> light/dark classes
      const rootClassList = document.documentElement.classList;
      const hadLight = rootClassList.contains('light');
      const hadDark = rootClassList.contains('dark');

      // 1. Lock host page scroll and prevent Safari bounce / rubber-band
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'none';
      document.body.style.backgroundColor = '#000000';

      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.touchAction = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
      document.documentElement.style.backgroundColor = '#000000';
      document.documentElement.style.colorScheme = 'dark';

      // 2. Toggle Tailwind classes for color-scheme and dynamic theme sync
      if (hadLight) {
        rootClassList.remove('light');
      }
      if (!hadDark) {
        rootClassList.add('dark');
      }

      // 3. Dynamic theme-color metadata handling (Safari UI / status-bar configuration)
      const themeColorMeta = (document.getElementById('theme-color-meta') ||
        document.querySelector('meta[name="theme-color"]')) as HTMLMetaElement | null;
      let originalThemeColor = '';

      if (themeColorMeta) {
        originalThemeColor = themeColorMeta.content;
        themeColorMeta.content = '#000000';
      }

      return () => {
        // Restore previous settings exactly on exit / unmount
        document.body.style.overflow = originalBodyOverflow || '';
        document.body.style.touchAction = originalBodyTouchAction || '';
        document.body.style.overscrollBehavior = originalBodyOverscroll || '';
        document.body.style.backgroundColor = originalBodyBg || '';

        document.documentElement.style.overflow = originalDocOverflow || '';
        document.documentElement.style.touchAction = originalDocTouchAction || '';
        document.documentElement.style.overscrollBehavior = originalDocOverscroll || '';
        document.documentElement.style.backgroundColor = originalDocBg || '';
        document.documentElement.style.colorScheme = originalColorScheme || '';

        // Restore original <html> classes
        if (hadLight) {
          rootClassList.add('light');
        }
        if (!hadDark) {
          rootClassList.remove('dark');
        }

        // Restore theme-color
        if (themeColorMeta) {
          themeColorMeta.content = originalThemeColor;
        }
      };
    }
  }, [isFullscreen]);

  // Allow desktop users to exit pseudo-fullscreen via Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPseudoFs) {
        setIsPseudoFs(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPseudoFs]);

  // Restart handler (for normal inline mode)
  const handleRestart = useCallback(() => {
    setIsLoading(true);
    const activeIframe = isPseudoFs ? portalIframeRef.current : iframeRef.current;
    if (activeIframe) {
      try {
        activeIframe.contentWindow?.location.reload();
      } catch (_) {
        activeIframe.src = '/games/block-puzzle/index.html';
      }
    }
  }, [isPseudoFs]);

  // Toggle fullscreen mode with strict feature detection & iOS pseudo-fullscreen fallback
  const handleToggleFullscreen = useCallback(() => {
    const elem = containerRef.current;
    const isCurrentlyNative = !!getFullscreenElement();

    if (!isFullscreen && !isCurrentlyNative) {
      let nativeAttempted = false;

      // Check native Fullscreen API with strict function checks before invoking
      if (elem && typeof elem.requestFullscreen === 'function') {
        try {
          const promise = elem.requestFullscreen();
          nativeAttempted = true;
          if (promise && typeof promise.catch === 'function') {
            promise
              .then(() => setIsNativeFs(true))
              .catch(() => {
                // If rejected (e.g. mobile Safari / gesture issue), fallback to pseudo-fullscreen portal
                setIsPseudoFs(true);
              });
          } else {
            setIsNativeFs(true);
          }
        } catch (_) {
          setIsPseudoFs(true);
        }
      } else if (elem && typeof (elem as any).webkitRequestFullscreen === 'function') {
        try {
          (elem as any).webkitRequestFullscreen();
          setIsNativeFs(true);
          nativeAttempted = true;
        } catch (_) {
          setIsPseudoFs(true);
        }
      } else if (elem && typeof (elem as any).webkitRequestFullScreen === 'function') {
        try {
          (elem as any).webkitRequestFullScreen();
          setIsNativeFs(true);
          nativeAttempted = true;
        } catch (_) {
          setIsPseudoFs(true);
        }
      } else if (elem && typeof (elem as any).mozRequestFullScreen === 'function') {
        try {
          (elem as any).mozRequestFullScreen();
          setIsNativeFs(true);
          nativeAttempted = true;
        } catch (_) {
          setIsPseudoFs(true);
        }
      } else if (elem && typeof (elem as any).msRequestFullscreen === 'function') {
        try {
          (elem as any).msRequestFullscreen();
          setIsNativeFs(true);
          nativeAttempted = true;
        } catch (_) {
          setIsPseudoFs(true);
        }
      }

      // If native Fullscreen API is unavailable (e.g. iPhone / iOS Safari), activate viewport portal
      if (!nativeAttempted) {
        setIsPseudoFs(true);
      }
    } else {
      // Exit Fullscreen Mode
      if (isCurrentlyNative || getFullscreenElement()) {
        if (typeof document.exitFullscreen === 'function') {
          try {
            const p = document.exitFullscreen();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } catch (_) {}
        } else if (typeof (document as any).webkitExitFullscreen === 'function') {
          try {
            (document as any).webkitExitFullscreen();
          } catch (_) {}
        } else if (typeof (document as any).webkitCancelFullScreen === 'function') {
          try {
            (document as any).webkitCancelFullScreen();
          } catch (_) {}
        } else if (typeof (document as any).mozCancelFullScreen === 'function') {
          try {
            (document as any).mozCancelFullScreen();
          } catch (_) {}
        } else if (typeof (document as any).msExitFullscreen === 'function') {
          try {
            (document as any).msExitFullscreen();
          } catch (_) {}
        }
      }
      setIsNativeFs(false);
      setIsPseudoFs(false);
    }
  }, [isFullscreen, getFullscreenElement]);

  // Pseudo-fullscreen viewport portal view (unconstrained by parent layout)
  // No floating Reset or Exit controls over the game per specification #2.
  const renderPseudoFsPortal = () => {
    if (!isPseudoFs || typeof document === 'undefined') return null;

    return createPortal(
      <div
        className="fixed inset-0 z-[99999] w-full h-full w-[100vw] h-[100vh] h-[100dvh] bg-black flex flex-col items-center justify-center p-0 m-0 overflow-hidden select-none touch-none"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100dvh',
          backgroundColor: '#000000',
          zIndex: 99999,
          touchAction: 'none',
          overscrollBehavior: 'none',
        }}
      >
        {/* Loading Overlay in Pseudo-Fullscreen */}
        {isLoading && (
          <div
            className="absolute inset-0 z-10 bg-black flex flex-col items-center justify-center p-6 text-center space-y-3"
            style={{ backgroundColor: '#000000' }}
          >
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

        {/* Game Iframe extending to maximum available viewport centered at 9:16 portrait ratio */}
        <iframe
          ref={portalIframeRef}
          src="/games/block-puzzle/index.html"
          title="Block Puzzle — 4TM"
          onLoad={() => setIsLoading(false)}
          className="w-full h-full aspect-[9/16] max-w-full max-h-full rounded-none border-0 bg-black object-contain shadow-none block"
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '9 / 16',
            maxWidth: '100%',
            maxHeight: '100%',
            border: 0,
            display: 'block',
            backgroundColor: '#000000',
          }}
          allow="autoplay; fullscreen; focus-without-user-activation *"
          tabIndex={0}
        />
      </div>,
      document.body
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Top Controls & Status Bar (Visible when inline) */}
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
          isNativeFs
            ? 'w-screen h-screen bg-slate-950 p-0 m-0'
            : 'w-full rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl p-2 sm:p-3 aspect-[9/16] max-h-[740px]'
        }`}
      >
        {/* If pseudo-fullscreen portal is active, show placeholder in inline slot */}
        {isPseudoFs ? (
          <div className="w-full h-full aspect-[9/16] flex flex-col items-center justify-center text-slate-400 font-mono text-xs p-4 text-center space-y-2">
            <Gamepad2 className="w-8 h-8 text-rose-500 animate-bounce" />
            <div>Playing in Fullscreen Mode</div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Render Viewport Portal for iPhone / Unsupported Fullscreen API */}
      {renderPseudoFsPortal()}
    </div>
  );
};

export default BlockPuzzleGame;
