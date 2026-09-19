import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { Sparkles, RotateCcw, Trophy, Flame, Layers, CheckCircle2 } from 'lucide-react';

export interface BlockPuzzleGameProps {
  language: Language;
}

// 8x8 Board matrix
const BOARD_SIZE = 8;

// Shape definition: matrix of [row, col] offsets relative to top-left [0,0]
interface Shape {
  id: string;
  name: string;
  color: string; // Tailwind color class or hex
  bgClass: string;
  borderClass: string;
  blocks: [number, number][]; // Relative coordinates
}

const SHAPES_CATALOG: Omit<Shape, 'id'>[] = [
  // Single
  { name: '1x1', color: 'amber', bgClass: 'bg-amber-500', borderClass: 'border-amber-400', blocks: [[0, 0]] },
  // 2-lines
  { name: '1x2', color: 'blue', bgClass: 'bg-blue-500', borderClass: 'border-blue-400', blocks: [[0, 0], [0, 1]] },
  { name: '2x1', color: 'blue', bgClass: 'bg-blue-500', borderClass: 'border-blue-400', blocks: [[0, 0], [1, 0]] },
  // 3-lines
  { name: '1x3', color: 'rose', bgClass: 'bg-rose-500', borderClass: 'border-rose-400', blocks: [[0, 0], [0, 1], [0, 2]] },
  { name: '3x1', color: 'rose', bgClass: 'bg-rose-500', borderClass: 'border-rose-400', blocks: [[0, 0], [1, 0], [2, 0]] },
  // Squares
  { name: '2x2', color: 'emerald', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-400', blocks: [[0, 0], [0, 1], [1, 0], [1, 1]] },
  // L-shapes
  { name: 'L-2x2', color: 'purple', bgClass: 'bg-purple-500', borderClass: 'border-purple-400', blocks: [[0, 0], [1, 0], [1, 1]] },
  { name: 'L-inv', color: 'purple', bgClass: 'bg-purple-500', borderClass: 'border-purple-400', blocks: [[0, 1], [1, 0], [1, 1]] },
  // T-shape
  { name: 'T-small', color: 'cyan', bgClass: 'bg-cyan-500', borderClass: 'border-cyan-400', blocks: [[0, 1], [1, 0], [1, 1], [1, 2]] },
];

function getRandomShape(): Shape {
  const template = SHAPES_CATALOG[Math.floor(Math.random() * SHAPES_CATALOG.length)];
  return {
    ...template,
    id: Math.random().toString(36).substring(2, 9),
  };
}

export const BlockPuzzleGame: React.FC<BlockPuzzleGameProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];

  // 8x8 Board State: null or bgClass string
  const [board, setBoard] = useState<(string | null)[][]>(() =>
    Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null))
  );

  // Available 3 shapes to place
  const [availableShapes, setAvailableShapes] = useState<(Shape | null)[]>([
    getRandomShape(),
    getRandomShape(),
    getRandomShape(),
  ]);

  // Selected shape index
  const [selectedShapeIdx, setSelectedShapeIdx] = useState<number | null>(null);

  // Hover cell [r, c] for placement preview
  const [hoverCell, setHoverCell] = useState<[number, number] | null>(null);

  // Stats
  const [score, setScore] = useState(0);
  const [combos, setCombos] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('4tm_block_puzzle_highscore');
      return saved ? parseInt(saved, 10) || 0 : 0;
    }
    return 0;
  });

  const [gameOver, setGameOver] = useState(false);

  // Check if shape can be placed at [row, col]
  const canPlaceShape = useCallback(
    (shape: Shape, startRow: number, startCol: number, currentBoard: (string | null)[][]): boolean => {
      for (const [dr, dc] of shape.blocks) {
        const r = startRow + dr;
        const c = startCol + dc;
        if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) {
          return false;
        }
        if (currentBoard[r][c] !== null) {
          return false;
        }
      }
      return true;
    },
    []
  );

  // Check if any of the available shapes can fit anywhere on the board
  const checkGameOver = useCallback(
    (shapes: (Shape | null)[], currentBoard: (string | null)[][]): boolean => {
      const activeShapes = shapes.filter((s): s is Shape => s !== null);
      if (activeShapes.length === 0) return false;

      for (const shape of activeShapes) {
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            if (canPlaceShape(shape, r, c, currentBoard)) {
              return false; // Found a valid spot!
            }
          }
        }
      }
      return true; // No available shape fits anywhere!
    },
    [canPlaceShape]
  );

  // Place shape onto board
  const handlePlaceShape = (row: number, col: number) => {
    if (selectedShapeIdx === null) return;
    const shape = availableShapes[selectedShapeIdx];
    if (!shape) return;

    if (!canPlaceShape(shape, row, col, board)) return;

    // Clone board and fill
    const newBoard = board.map((r) => [...r]);
    for (const [dr, dc] of shape.blocks) {
      newBoard[row + dr][col + dc] = shape.bgClass;
    }

    // Calculate filled rows & cols
    const rowsToClear: number[] = [];
    const colsToClear: number[] = [];

    for (let r = 0; r < BOARD_SIZE; r++) {
      if (newBoard[r].every((cell) => cell !== null)) {
        rowsToClear.push(r);
      }
    }

    for (let c = 0; c < BOARD_SIZE; c++) {
      let fullCol = true;
      for (let r = 0; r < BOARD_SIZE; r++) {
        if (newBoard[r][c] === null) {
          fullCol = false;
          break;
        }
      }
      if (fullCol) colsToClear.push(c);
    }

    // Clear completed lines
    for (const r of rowsToClear) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        newBoard[r][c] = null;
      }
    }
    for (const c of colsToClear) {
      for (let r = 0; r < BOARD_SIZE; r++) {
        newBoard[r][c] = null;
      }
    }

    // Calculate score
    const totalLinesCleared = rowsToClear.length + colsToClear.length;
    const blockPoints = shape.blocks.length * 10;
    let linePoints = 0;
    if (totalLinesCleared > 0) {
      linePoints = totalLinesCleared * 100 * totalLinesCleared; // Bonus multiplier for multi-line clear
      setCombos((prev) => prev + 1);
    } else {
      setCombos(0);
    }

    const addedScore = blockPoints + linePoints;
    const nextScore = score + addedScore;
    setScore(nextScore);

    if (nextScore > highScore) {
      setHighScore(nextScore);
      localStorage.setItem('4tm_block_puzzle_highscore', nextScore.toString());
    }

    // Remove used shape
    const nextShapes = [...availableShapes];
    nextShapes[selectedShapeIdx] = null;

    // If all 3 shapes used, replenish 3 new ones
    if (nextShapes.every((s) => s === null)) {
      nextShapes[0] = getRandomShape();
      nextShapes[1] = getRandomShape();
      nextShapes[2] = getRandomShape();
    }

    setBoard(newBoard);
    setAvailableShapes(nextShapes);
    setSelectedShapeIdx(null);
    setHoverCell(null);

    // Check game over
    if (checkGameOver(nextShapes, newBoard)) {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setBoard(
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(null))
    );
    const initialShapes = [getRandomShape(), getRandomShape(), getRandomShape()];
    setAvailableShapes(initialShapes);
    setSelectedShapeIdx(null);
    setHoverCell(null);
    setScore(0);
    setCombos(0);
    setGameOver(false);
  };

  // Compute preview cells for selected shape when hovering over cell [r, c]
  const previewCells = useMemo(() => {
    if (selectedShapeIdx === null || !hoverCell) return null;
    const shape = availableShapes[selectedShapeIdx];
    if (!shape) return null;

    const [startR, startC] = hoverCell;
    const valid = canPlaceShape(shape, startR, startC, board);

    const cells: { r: number; c: number; valid: boolean }[] = [];
    for (const [dr, dc] of shape.blocks) {
      const r = startR + dr;
      const c = startC + dc;
      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
        cells.push({ r, c, valid });
      }
    }
    return { valid, cells };
  }, [selectedShapeIdx, hoverCell, availableShapes, board, canPlaceShape]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Top Header & Scoreboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              {dict.playView.bestScore}
            </div>
            <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
              {highScore}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              {language === 'vi' ? 'Điểm Trận' : 'Current Score'}
            </div>
            <div className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400 font-mono">
              {score}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 col-span-2 sm:col-span-1 justify-between sm:justify-end">
          {combos > 1 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold animate-pulse">
              <Flame className="w-4 h-4 fill-current" />
              <span>Combo x{combos}</span>
            </div>
          )}

          <button
            type="button"
            id="block-puzzle-restart-btn"
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
            title={dict.playView.restart}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 8x8 Grid */}
      <div className="relative p-3 sm:p-4 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl flex justify-center">
        <div className="grid grid-cols-8 gap-1 sm:gap-1.5 w-full max-w-[380px] aspect-square">
          {board.map((rowArr, r) =>
            rowArr.map((cellBg, c) => {
              // Check if cell is in hover preview
              const isPreview = previewCells?.cells.find((item) => item.r === r && item.c === c);

              let cellStyle = 'bg-slate-800/80 border-slate-700/50 hover:bg-slate-800';
              if (cellBg) {
                cellStyle = `${cellBg} border-white/20 shadow-inner`;
              } else if (isPreview) {
                cellStyle = isPreview.valid
                  ? 'bg-emerald-500/50 border-emerald-400 animate-pulse'
                  : 'bg-rose-500/40 border-rose-400';
              }

              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  id={`block-cell-${r}-${c}`}
                  onMouseEnter={() => setHoverCell([r, c])}
                  onMouseLeave={() => setHoverCell(null)}
                  onClick={() => handlePlaceShape(r, c)}
                  className={`aspect-square rounded-lg border transition-all duration-100 cursor-pointer ${cellStyle}`}
                  aria-label={`Cell ${r + 1}, ${c + 1}`}
                />
              );
            })
          )}
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in duration-200">
            <div className="p-3 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/30">
              <Layers className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {language === 'vi' ? 'Hết Không Gian Đặt Gạch!' : 'No More Moves!'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'vi'
                  ? `Bạn đạt tổng cộng ${score} điểm trong trận đấu này.`
                  : `You scored ${score} points in this game.`}
              </p>
            </div>
            <button
              type="button"
              id="game-over-restart-btn"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{dict.playView.tryAgain}</span>
            </button>
          </div>
        )}
      </div>

      {/* Available Shapes Selection Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
          <span>{language === 'vi' ? 'Chọn Khối Gạch Tiếp Theo:' : 'Select Block Shape to Place:'}</span>
          {selectedShapeIdx !== null && (
            <span className="text-rose-600 dark:text-rose-400 font-sans text-xs">
              {language === 'vi' ? 'Nhấn vào ô lưới để đặt' : 'Click target cell on grid'}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {availableShapes.map((shape, idx) => {
            if (!shape) {
              return (
                <div
                  key={idx}
                  className="h-24 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 text-xs font-mono"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-60" />
                </div>
              );
            }

            const isSelected = selectedShapeIdx === idx;

            // Calculate grid dimensions for mini shape view
            const maxR = Math.max(...shape.blocks.map(([r]) => r)) + 1;
            const maxC = Math.max(...shape.blocks.map(([, c]) => c)) + 1;

            return (
              <button
                key={shape.id}
                type="button"
                id={`shape-slot-${idx}`}
                onClick={() => setSelectedShapeIdx(isSelected ? null : idx)}
                className={`h-24 rounded-2xl border-2 p-2 flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 shadow-md scale-102'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div
                  className="grid gap-1"
                  style={{
                    gridTemplateRows: `repeat(${maxR}, minmax(0, 1fr))`,
                    gridTemplateColumns: `repeat(${maxC}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: maxR }).map((_, r) =>
                    Array.from({ length: maxC }).map((_, c) => {
                      const hasBlock = shape.blocks.some(([br, bc]) => br === r && bc === c);
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm ${
                            hasBlock ? `${shape.bgClass} shadow-xs` : 'bg-transparent'
                          }`}
                        />
                      );
                    })
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
