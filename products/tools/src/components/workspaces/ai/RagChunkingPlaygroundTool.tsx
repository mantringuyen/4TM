import React, { useState, useMemo } from 'react';
import { Language } from '../../../types';
import {
  Sparkles,
  Layers,
  Copy,
  Check,
  Scissors,
  Sliders,
} from 'lucide-react';

interface RagChunkingPlaygroundToolProps {
  language: Language;
}

const SAMPLE_DOC = `PostgreSQL is a powerful, open-source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance. 

Vector embeddings allow large language models to search documents semantically. In Retrieval-Augmented Generation (RAG), text documents are split into smaller chunks, embedded using a neural network, and indexed in vector databases like pgvector. 

When choosing chunk size and overlap, developers must balance context preservation with retrieval precision. A chunk size that is too small loses semantic narrative, while a chunk size that is too large pollutes the embedding with unrelated concepts and exhausts LLM context windows.`;

export const RagChunkingPlaygroundTool: React.FC<RagChunkingPlaygroundToolProps> = ({
  language,
}) => {
  const [docText, setDocText] = useState(SAMPLE_DOC);
  const [chunkSize, setChunkSize] = useState(150);
  const [chunkOverlap, setChunkOverlap] = useState(30);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const chunks = useMemo(() => {
    const text = docText.trim();
    if (!text) return [];

    const result: { id: number; text: string; charLen: number; estTokens: number }[] = [];
    let start = 0;
    let id = 1;

    while (start < text.length) {
      let end = start + chunkSize;
      if (end > text.length) end = text.length;

      const chunkStr = text.substring(start, end).trim();
      if (chunkStr) {
        result.push({
          id,
          text: chunkStr,
          charLen: chunkStr.length,
          estTokens: Math.ceil(chunkStr.length / 3.8),
        });
        id++;
      }

      start += chunkSize - chunkOverlap;
      if (start >= text.length || chunkSize <= chunkOverlap) break;
    }

    return result;
  }, [docText, chunkSize, chunkOverlap]);

  const handleCopyChunk = (txt: string, idx: number) => {
    navigator.clipboard.writeText(txt);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Parameters Form */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
              <span>{language === 'vi' ? 'Kích thước đoạn (Chunk Size)' : 'Chunk Size (Characters)'}</span>
              <span className="text-purple-600 dark:text-purple-400">{chunkSize} chars</span>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={chunkSize}
              onChange={(e) => setChunkSize(parseInt(e.target.value, 10))}
              className="w-full accent-purple-600"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
              <span>{language === 'vi' ? 'Độ gối đầu (Chunk Overlap)' : 'Chunk Overlap (Characters)'}</span>
              <span className="text-purple-600 dark:text-purple-400">{chunkOverlap} chars</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={chunkOverlap}
              onChange={(e) => setChunkOverlap(parseInt(e.target.value, 10))}
              className="w-full accent-purple-600"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold font-mono text-slate-600 dark:text-slate-300">
            {language === 'vi' ? 'Văn bản nguồn để phân đoạn (Source Document)' : 'Source Document Text'}
          </label>
          <textarea
            value={docText}
            onChange={(e) => setDocText(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
          />
        </div>
      </div>

      {/* Chunks List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Scissors className="w-4 h-4 text-purple-500" />
            <span>{language === 'vi' ? `Kết quả phân mảnh (${chunks.length} đoạn Chunks)` : `Generated RAG Chunks (${chunks.length} total)`}</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {chunks.map((chunk, idx) => (
            <div
              key={chunk.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 relative"
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="text-purple-600 dark:text-purple-400">Chunk #{chunk.id}</span>
                <span>{chunk.charLen} chars • ~{chunk.estTokens} tokens</span>
              </div>

              <p className="text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                "{chunk.text}"
              </p>

              <button
                type="button"
                onClick={() => handleCopyChunk(chunk.text, idx)}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-600 dark:text-purple-400 hover:underline pt-1 cursor-pointer"
              >
                {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIdx === idx ? 'Copied' : 'Copy Chunk'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
