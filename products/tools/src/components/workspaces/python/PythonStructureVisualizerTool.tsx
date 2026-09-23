import React, { useState } from 'react';
import { Language } from '../../../types';
import {
  Layers,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Code,
  Sliders,
} from 'lucide-react';

interface PythonStructureVisualizerToolProps {
  language: Language;
}

type StructType = 'list' | 'dict' | 'set' | 'tuple';

export const PythonStructureVisualizerTool: React.FC<PythonStructureVisualizerToolProps> = ({
  language,
}) => {
  const [structType, setStructType] = useState<StructType>('list');
  const [sliceStart, setSliceStart] = useState('1');
  const [sliceStop, setSliceStop] = useState('4');
  const [sliceStep, setSliceStep] = useState('1');

  const sampleList = ['Python', 'SQL', 'DAX', 'React', 'TypeScript', 'Pandas'];
  const sampleDict = [
    { key: "'user_id'", hash: '0x7FA1', val: '1048' },
    { key: "'username'", hash: '0x3BC8', val: "'alex_dev'" },
    { key: "'role'", hash: '0x99D2', val: "'admin'" },
    { key: "'is_active'", hash: '0x1F2E', val: 'True' },
  ];
  const sampleSet = ['apple', 'banana', 'orange', 'grape'];
  const sampleTuple = ['GET', 'https://api.4tm.io.vn', 200];

  const slicedList = sampleList.slice(
    parseInt(sliceStart, 10) || 0,
    parseInt(sliceStop, 10) || sampleList.length
  );

  return (
    <div className="space-y-6">
      {/* Structure Type Picker */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setStructType('list')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            structType === 'list'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          List (Mutable, 0-indexed, Slicing)
        </button>
        <button
          type="button"
          onClick={() => setStructType('dict')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            structType === 'dict'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Dictionary (Hash Map O(1))
        </button>
        <button
          type="button"
          onClick={() => setStructType('set')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            structType === 'set'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Set (Unique Hashable Elements)
        </button>
        <button
          type="button"
          onClick={() => setStructType('tuple')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            structType === 'tuple'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Tuple (Immutable Sequence)
        </button>
      </div>

      {/* List Visualizer & Slicing Explorer */}
      {structType === 'list' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
              {language === 'vi' ? 'Sơ đồ bộ nhớ & Chỉ số Index (Positive & Negative Indexing)' : 'Memory Layout & Index Pointers'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
              {sampleList.map((item, idx) => {
                const isSelected = idx >= (parseInt(sliceStart, 10) || 0) && idx < (parseInt(sliceStop, 10) || sampleList.length);
                const negIdx = idx - sampleList.length;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-blue-500/10 border-blue-500 text-blue-900 dark:text-blue-300 ring-2 ring-blue-500/30'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      +{idx}
                    </div>
                    <div className="my-1 text-xs font-bold font-mono truncate">
                      "{item}"
                    </div>
                    <div className="text-[10px] font-mono text-rose-500 font-bold">
                      {negIdx}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slicing Controls */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-slate-500">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span>{language === 'vi' ? 'Trực quan hóa cắt lát (Slicing Syntax: list[start:stop:step])' : 'List Slicing Simulator'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-600 dark:text-slate-400 font-mono font-bold">start index</label>
                <input
                  type="number"
                  value={sliceStart}
                  onChange={(e) => setSliceStart(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-600 dark:text-slate-400 font-mono font-bold">stop index</label>
                <input
                  type="number"
                  value={sliceStop}
                  onChange={(e) => setSliceStop(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-600 dark:text-slate-400 font-mono font-bold">step</label>
                <input
                  type="number"
                  value={sliceStep}
                  onChange={(e) => setSliceStep(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-blue-400 font-mono text-xs overflow-x-auto mt-2">
              {`sample_list[${sliceStart}:${sliceStop}:${sliceStep}] -> [${slicedList.map((x) => `"${x}"`).join(', ')}]`}
            </div>
          </div>
        </div>
      )}

      {/* Dictionary Visualizer */}
      {structType === 'dict' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
            {language === 'vi' ? 'Bảng băm (Hash Table) & Cặp Key-Value' : 'Dictionary Hash Table & Buckets'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 font-mono text-slate-400">
                  <th className="py-2 px-3">Hash Address</th>
                  <th className="py-2 px-3">Key (Hashable)</th>
                  <th className="py-2 px-3">Value Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {sampleDict.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <td className="py-2 px-3 text-purple-600 dark:text-purple-400 font-bold">{d.hash}</td>
                    <td className="py-2 px-3 text-cyan-600 dark:text-cyan-400">{d.key}</td>
                    <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">{d.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Set Visualizer */}
      {structType === 'set' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
            {language === 'vi' ? 'Tập hợp (Set - Duy nhất & Không có thứ tự)' : 'Set Characteristics (Unordered & Unique)'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'vi'
              ? 'Tập hợp sử dụng bảng băm để loại bỏ trùng lặp và hỗ trợ kiểm tra `x in s` với độ phức tạp trung bình O(1).'
              : 'Sets rely on hash tables to ensure elements are unique and provide O(1) average lookup speed.'}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900 text-blue-400 font-mono text-xs">
            {`my_set = {${sampleSet.map((s) => `"${s}"`).join(', ')}}\n\n# Union: A | B\n# Intersection: A & B\n# Difference: A - B`}
          </div>
        </div>
      )}

      {/* Tuple Visualizer */}
      {structType === 'tuple' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
            {language === 'vi' ? 'Bộ giá trị (Tuple - Bất biến / Immutable)' : 'Tuple (Immutable & Hashable)'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {language === 'vi'
              ? 'Tuple không thể thay đổi sau khi tạo (không thể append/pop/reassign). Vì bất biến, Tuple có thể dùng làm khóa (Key) trong Dictionary.'
              : 'Tuples cannot be modified after instantiation. Because they are immutable, tuples containing hashable elements can be used as dictionary keys.'}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-900 text-blue-400 font-mono text-xs">
            {`response = ("GET", "https://api.4tm.io.vn", 200)\n\n# Unpacking syntax:\nmethod, url, status_code = response`}
          </div>
        </div>
      )}
    </div>
  );
};
