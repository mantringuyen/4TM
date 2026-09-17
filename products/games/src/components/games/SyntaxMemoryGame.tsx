import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { RefreshCw, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

export interface SyntaxMemoryGameProps {
  language: Language;
}

interface CardItem {
  id: string;
  pairId: string;
  label: string;
  detail: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARDS_DATA = [
  { pairId: 'p1', label: 'Stack', detail: 'LIFO (Last In, First Out)' },
  { pairId: 'p1', label: 'LIFO', detail: 'Push & Pop from Top only' },
  { pairId: 'p2', label: 'Queue', detail: 'FIFO (First In, First Out)' },
  { pairId: 'p2', label: 'FIFO', detail: 'Enqueue at Tail, Dequeue at Head' },
  { pairId: 'p3', label: 'Hash Map', detail: 'Key-Value Associative Store' },
  { pairId: 'p3', label: 'O(1) Access', detail: 'Direct Hashing Hash Function' },
  { pairId: 'p4', label: 'Binary Tree', detail: 'Max 2 Children Per Node' },
  { pairId: 'p4', label: 'BST Invariant', detail: 'Left < Parent < Right' },
  { pairId: 'p5', label: 'Graph', detail: 'Non-linear Nodes & Edges' },
  { pairId: 'p5', label: 'Adjacency', detail: 'Vertices, Edges, Cycles' },
  { pairId: 'p6', label: 'Array', detail: 'Contiguous Memory Blocks' },
  { pairId: 'p6', label: 'O(1) Index', detail: 'Instant Offset Memory Math' },
];

export const SyntaxMemoryGame: React.FC<SyntaxMemoryGameProps> = ({ language }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    // Shuffle cards
    const shuffled = [...CARDS_DATA]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: `card-${index}`,
        pairId: item.pairId,
        label: item.label,
        detail: item.detail,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const nextFlipped = [...flippedIndices, index];
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextFlipped;
      if (cards[firstIdx].pairId === cards[secondIdx].pairId) {
        // Matched!
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            next[firstIdx].isMatched = true;
            next[secondIdx].isMatched = true;
            if (next.every((c) => c.isMatched)) {
              setIsWon(true);
            }
            return next;
          });
          setFlippedIndices([]);
        }, 400);
      } else {
        // Not matched
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            next[firstIdx].isFlipped = false;
            next[secondIdx].isFlipped = false;
            return next;
          });
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-3xl text-white shadow-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
            6 Pairs &bull; 12 Cards
          </span>
          <h3 className="text-lg font-black tracking-tight">
            {language === 'vi' ? 'Ma Trận Cấu Trúc Dữ Liệu' : 'Data Structures Memory Matrix'}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono">
            <span className="text-slate-400">Moves: </span>
            <span className="font-bold text-purple-400">{moves}</span>
          </div>

          <button
            type="button"
            onClick={initGame}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Restart"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isWon ? (
        <div className="p-8 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-center space-y-4">
          <Trophy className="w-12 h-12 text-purple-400 mx-auto animate-bounce" />
          <h4 className="text-2xl font-black text-purple-400">
            {language === 'vi' ? 'LÀM CHỦ TẤT CẢ CẶP THẺ!' : 'ALL PAIRS MATCHED!'}
          </h4>
          <p className="text-xs text-slate-300 font-mono">
            Completed in <span className="font-bold text-purple-400">{moves}</span> moves!
          </p>
          <button
            type="button"
            onClick={initGame}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer transition-all"
          >
            {language === 'vi' ? 'Chơi Ván Mới' : 'Play Another Round'}
          </button>
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {cards.map((card, idx) => {
            const showFace = card.isFlipped || card.isMatched;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`h-28 rounded-2xl p-3 flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-300 border ${
                  card.isMatched
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-950/40'
                    : showFace
                    ? 'bg-purple-950/80 border-purple-500 text-white shadow-lg'
                    : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-400 hover:bg-slate-750'
                }`}
              >
                {showFace ? (
                  <div className="space-y-1">
                    <div className="font-black text-xs sm:text-sm">{card.label}</div>
                    <div className="text-[10px] opacity-80 line-clamp-2 leading-tight font-mono">
                      {card.detail}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 opacity-50">
                    <Sparkles className="w-5 h-5 text-slate-500" />
                    <span className="text-[10px] font-mono font-bold">4TM</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
