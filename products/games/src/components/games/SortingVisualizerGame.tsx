import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../../types';
import { Play, Pause, RefreshCw, BarChart2, Check } from 'lucide-react';

export interface SortingVisualizerGameProps {
  language: Language;
}

type AlgorithmType = 'bubble' | 'selection' | 'insertion';

export const SortingVisualizerGame: React.FC<SortingVisualizerGameProps> = ({ language }) => {
  const [array, setArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(60);
  const [comparisons, setComparisons] = useState(0);

  const isSortingRef = useRef(false);

  const generateRandomArray = () => {
    isSortingRef.current = false;
    setIsPlaying(false);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    const newArr: number[] = [];
    for (let i = 0; i < 20; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 15);
    }
    setArray(newArr);
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const runBubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comps = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSortingRef.current) return;
        setActiveIndices([j, j + 1]);
        comps++;
        setComparisons(comps);
        await sleep(speedMs);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setActiveIndices([]);
    setIsPlaying(false);
  };

  const runSelectionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comps = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (!isSortingRef.current) return;
        setActiveIndices([minIdx, j]);
        comps++;
        setComparisons(comps);
        await sleep(speedMs);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        setArray([...arr]);
      }
      setSortedIndices((prev) => [...prev, i]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setActiveIndices([]);
    setIsPlaying(false);
  };

  const runInsertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comps = 0;

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        if (!isSortingRef.current) return;
        setActiveIndices([j, j + 1]);
        comps++;
        setComparisons(comps);
        await sleep(speedMs);

        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setActiveIndices([]);
    setIsPlaying(false);
  };

  const startSort = () => {
    if (isPlaying) {
      isSortingRef.current = false;
      setIsPlaying(false);
      return;
    }

    isSortingRef.current = true;
    setIsPlaying(true);
    setSortedIndices([]);

    if (algorithm === 'bubble') runBubbleSort();
    else if (algorithm === 'selection') runSelectionSort();
    else if (algorithm === 'insertion') runInsertionSort();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-3xl text-white shadow-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            N = 20 Elements
          </span>
          <h3 className="text-lg font-black tracking-tight">
            {language === 'vi' ? 'Đấu Trường Thuật Toán Sắp Xếp' : 'Sorting Algorithm Visualizer'}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono">
            <span className="text-slate-400">Comps: </span>
            <span className="font-bold text-amber-400">{comparisons}</span>
          </div>

          <button
            type="button"
            onClick={generateRandomArray}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Shuffle"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Algorithm Selector & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-800 border border-slate-700 text-xs">
          {(['bubble', 'selection', 'insertion'] as AlgorithmType[]).map((alg) => (
            <button
              key={alg}
              type="button"
              disabled={isPlaying}
              onClick={() => setAlgorithm(alg)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer capitalize ${
                algorithm === alg
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white disabled:opacity-50'
              }`}
            >
              {alg} Sort
            </button>
          ))}
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Speed:</span>
          <input
            type="range"
            min={10}
            max={200}
            step={10}
            value={210 - speedMs}
            onChange={(e) => setSpeedMs(210 - Number(e.target.value))}
            className="w-20 accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={startSort}
          className={`px-4 py-2 rounded-xl font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-all ${
            isPlaying
              ? 'bg-rose-600 hover:bg-rose-500 text-white'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Pause' : 'Run Sorting'}</span>
        </button>
      </div>

      {/* Visualizer Canvas / Bar Chart */}
      <div className="h-48 sm:h-56 w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-end justify-between gap-1 sm:gap-1.5">
        {array.map((val, idx) => {
          const isActive = activeIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-end h-full"
            >
              <div
                className={`w-full rounded-t-md transition-all duration-75 ${
                  isActive
                    ? 'bg-rose-500 shadow-md shadow-rose-500/50'
                    : isSorted
                    ? 'bg-emerald-500'
                    : 'bg-amber-500/80 hover:bg-amber-400'
                }`}
                style={{ height: `${val}%` }}
              />
              <span className="text-[9px] font-mono text-slate-500 mt-1 hidden sm:block">
                {val}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-xs bg-rose-500" />
          <span>Active Compare</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
          <span>Sorted Segment</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
};
