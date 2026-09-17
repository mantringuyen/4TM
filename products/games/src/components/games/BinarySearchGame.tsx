import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { Target, RefreshCw, Trophy, ArrowUp, ArrowDown, Check, Zap } from 'lucide-react';

export interface BinarySearchGameProps {
  language: Language;
}

export const BinarySearchGame: React.FC<BinarySearchGameProps> = ({ language }) => {
  const [target, setTarget] = useState<number>(() => Math.floor(Math.random() * 1000) + 1);
  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(1000);
  const [customGuess, setCustomGuess] = useState('');
  const [steps, setSteps] = useState(0);
  const [history, setHistory] = useState<Array<{ guess: number; result: 'HIGH' | 'LOW' | 'CORRECT' }>>([]);
  const [isWon, setIsWon] = useState(false);

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 1000) + 1);
    setLow(1);
    setHigh(1000);
    setCustomGuess('');
    setSteps(0);
    setHistory([]);
    setIsWon(false);
  };

  const mid = Math.floor((low + high) / 2);

  const handleGuess = (val: number) => {
    if (isWon || isNaN(val) || val < 1 || val > 1000) return;

    const newSteps = steps + 1;
    setSteps(newSteps);

    if (val === target) {
      setIsWon(true);
      setHistory((prev) => [{ guess: val, result: 'CORRECT' }, ...prev]);
    } else if (val < target) {
      setLow(Math.max(low, val + 1));
      setHistory((prev) => [{ guess: val, result: 'LOW' }, ...prev]);
    } else {
      setHigh(Math.min(high, val - 1));
      setHistory((prev) => [{ guess: val, result: 'HIGH' }, ...prev]);
    }
    setCustomGuess('');
  };

  // Remaining search space percentage
  const rangeRemaining = Math.max(1, high - low + 1);
  const reductionPercentage = Math.round((1 - rangeRemaining / 1000) * 100);

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-3xl text-white shadow-xl">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            Range: [1 .. 1000]
          </span>
          <h3 className="text-lg font-black tracking-tight">
            {language === 'vi' ? 'Săn Số Nhị Phân' : 'Binary Search Arena'}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono">
            <span className="text-slate-400">Steps: </span>
            <span className="font-bold text-cyan-400">{steps}</span>
            <span className="text-slate-500"> / 10</span>
          </div>

          <button
            type="button"
            onClick={resetGame}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Restart"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Search Space Range Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Active Window: [{low} .. {high}]</span>
          <span className="text-cyan-400">{reductionPercentage}% Eliminated</span>
        </div>

        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
            style={{
              marginLeft: `${((low - 1) / 1000) * 100}%`,
              width: `${(rangeRemaining / 1000) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Won Message */}
      {isWon ? (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
          <Trophy className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
          <h4 className="text-xl font-black text-emerald-400">
            {language === 'vi' ? 'BẮT TRÚNG MỤC TIÊU!' : 'TARGET LOCATED!'}
          </h4>
          <p className="text-xs text-slate-300 font-mono">
            Target was <span className="font-bold text-white">{target}</span>. Found in{' '}
            <span className="font-bold text-emerald-400">{steps}</span> steps! (Theoretical bound:{' '}
            &le;10 steps).
          </p>
          <button
            type="button"
            onClick={resetGame}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer transition-all"
          >
            {language === 'vi' ? 'Chơi Lượt Mới' : 'Play Again'}
          </button>
        </div>
      ) : (
        /* Action Inputs */
        <div className="space-y-4">
          {/* Midpoint Recommended Action */}
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase">
                {language === 'vi' ? 'Điểm Giữa Tối Ưu (Midpoint)' : 'Optimal Midpoint'}
              </div>
              <div className="text-2xl font-black text-white font-mono">{mid}</div>
            </div>

            <button
              type="button"
              onClick={() => handleGuess(mid)}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Đoán Điểm Này' : 'Test Midpoint'}</span>
            </button>
          </div>

          {/* Custom Number Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const val = parseInt(customGuess, 10);
              if (!isNaN(val)) handleGuess(val);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="number"
              min={1}
              max={1000}
              value={customGuess}
              onChange={(e) => setCustomGuess(e.target.value)}
              placeholder={language === 'vi' ? 'Hoặc nhập số tùy chọn (1-1000)...' : 'Or type a custom number (1-1000)...'}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {language === 'vi' ? 'Đoán' : 'Submit'}
            </button>
          </form>
        </div>
      )}

      {/* Guess History Log */}
      {history.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            {language === 'vi' ? 'Nhật Ký Suy Luận:' : 'Deduction History:'}
          </span>
          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-800 text-xs font-mono"
              >
                <span className="text-white font-bold">Guess: {item.guess}</span>
                {item.result === 'LOW' && (
                  <span className="inline-flex items-center gap-1 text-amber-400">
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>{language === 'vi' ? 'Quá Thấp (Mục tiêu cao hơn)' : 'Too Low (Target is higher)'}</span>
                  </span>
                )}
                {item.result === 'HIGH' && (
                  <span className="inline-flex items-center gap-1 text-rose-400">
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span>{language === 'vi' ? 'Quá Cao (Mục tiêu thấp hơn)' : 'Too High (Target is lower)'}</span>
                  </span>
                )}
                {item.result === 'CORRECT' && (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Exact Hit!</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
