import React, { useState } from 'react';
import { Language } from '../../types';
import { ShieldAlert, Unlock, Lock, CheckCircle2, XCircle, Trophy, RefreshCw } from 'lucide-react';

export interface RegexDoorGameProps {
  language: Language;
}

interface RoomChallenge {
  roomNumber: number;
  mission: {
    en: string;
    vi: string;
  };
  hint: string;
  testCases: Array<{ input: string; shouldMatch: boolean }>;
}

const ROOMS: RoomChallenge[] = [
  {
    roomNumber: 1,
    mission: {
      en: 'Match all 4TM system usernames (starts with letter, 3-12 alphanumeric characters or underscores)',
      vi: 'Khớp toàn bộ tên người dùng hệ thống 4TM (bắt đầu bằng chữ cái, 3-12 ký tự chữ, số hoặc gạch dưới)',
    },
    hint: '^[a-zA-Z][a-zA-Z0-9_]{2,11}$',
    testCases: [
      { input: 'alice_12', shouldMatch: true },
      { input: 'dev4tm', shouldMatch: true },
      { input: 'admin_root', shouldMatch: true },
      { input: '12user', shouldMatch: false },
      { input: 'ab', shouldMatch: false },
      { input: 'invalid@user#', shouldMatch: false },
    ],
  },
  {
    roomNumber: 2,
    mission: {
      en: 'Match valid 3 or 6 digit CSS Hex Colors (e.g. #FFF or #4F46E5)',
      vi: 'Khớp mã màu CSS Hex 3 hoặc 6 ký tự hợp lệ (ví dụ #FFF hoặc #4F46E5)',
    },
    hint: '^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$',
    testCases: [
      { input: '#FFF', shouldMatch: true },
      { input: '#4F46E5', shouldMatch: true },
      { input: '#123456', shouldMatch: true },
      { input: '#12', shouldMatch: false },
      { input: '#GGGGGG', shouldMatch: false },
      { input: 'rgb(0,0,0)', shouldMatch: false },
    ],
  },
  {
    roomNumber: 3,
    mission: {
      en: 'Match Semantic Versions starting with optional "v" (e.g. v1.0.0, 2.14.3)',
      vi: 'Khớp phiên bản Semantic Versioning có thể bắt đầu bằng "v" (ví dụ v1.0.0, 2.14.3)',
    },
    hint: '^v?[0-9]+\\.[0-9]+\\.[0-9]+$',
    testCases: [
      { input: 'v1.0.0', shouldMatch: true },
      { input: '2.14.3', shouldMatch: true },
      { input: 'v0.9.12', shouldMatch: true },
      { input: '1.0', shouldMatch: false },
      { input: 'alpha-1.0.0', shouldMatch: false },
      { input: 'version_2', shouldMatch: false },
    ],
  },
];

export const RegexDoorGame: React.FC<RegexDoorGameProps> = ({ language }) => {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [regexInput, setRegexInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const room = ROOMS[currentRoomIndex];

  let regex: RegExp | null = null;
  let regexError = '';
  try {
    if (regexInput) {
      regex = new RegExp(regexInput);
    }
  } catch (err: any) {
    regexError = err.message;
  }

  const results = room.testCases.map((tc) => {
    if (!regex) return { ...tc, passed: false };
    const matched = regex.test(tc.input);
    const passed = matched === tc.shouldMatch;
    return { ...tc, matched, passed };
  });

  const allPassed = regex !== null && results.every((r) => r.passed);

  const handleUnlockDoor = () => {
    if (!allPassed) return;

    if (currentRoomIndex < ROOMS.length - 1) {
      setCurrentRoomIndex((r) => r + 1);
      setRegexInput('');
      setShowHint(false);
    } else {
      setIsVictory(true);
    }
  };

  const handleReset = () => {
    setCurrentRoomIndex(0);
    setRegexInput('');
    setShowHint(false);
    setIsVictory(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-900 dark:text-white shadow-lg">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-rose-700 dark:text-rose-400 font-bold uppercase tracking-wider">
            Vault Room {room.roomNumber} of {ROOMS.length}
          </span>
          <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            {language === 'vi' ? 'Giải Mã Cửa Bảo Mật Regex' : 'Regex Vault Gatekeeper'}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          title="Reset"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {isVictory ? (
        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-4">
          <Trophy className="w-12 h-12 text-rose-600 dark:text-rose-400 mx-auto animate-bounce" />
          <h4 className="text-2xl font-black text-rose-700 dark:text-rose-400">
            {language === 'vi' ? 'TOÀN BỘ CỬA BẢO MẬT ĐÃ MỞ!' : 'ALL VAULTS BREACHED!'}
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-mono">
            You successfully navigated all 3 challenge security doors using verified regular expressions!
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer transition-all"
          >
            {language === 'vi' ? 'Chơi Lại Từ Đầu' : 'Restart Challenge'}
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Mission Objective */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-700 dark:text-rose-400 font-bold uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>Door #{room.roomNumber} Security Protocol</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">{room.mission[language]}</p>
          </div>

          {/* Regex Input Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
              <span>Pattern: /.../</span>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 underline cursor-pointer"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={regexInput}
                onChange={(e) => setRegexInput(e.target.value)}
                placeholder="e.g. ^[a-zA-Z0-9_]+$"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-rose-700 dark:text-rose-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
              />
            </div>

            {regexError && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-mono">Syntax error: {regexError}</p>
            )}

            {showHint && (
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 text-xs font-mono text-rose-800 dark:text-rose-300">
                Hint pattern: <code className="font-bold">{room.hint}</code>
              </div>
            )}
          </div>

          {/* Test Cases Matrix */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Verification Test Cases ({results.filter((r) => r.passed).length}/{room.testCases.length})
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {results.map((tc, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-colors ${
                    tc.passed
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="space-x-2 truncate mr-2">
                    <span className="text-slate-900 dark:text-white font-bold">{tc.input}</span>
                    <span className="text-[10px] opacity-70">
                      ({tc.shouldMatch ? 'must match' : 'must reject'})
                    </span>
                  </div>

                  {tc.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Unlock Door Action Button */}
          <button
            type="button"
            disabled={!allPassed}
            onClick={handleUnlockDoor}
            className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              allPassed
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700'
            }`}
          >
            {allPassed ? (
              <>
                <Unlock className="w-4 h-4" />
                <span>
                  {currentRoomIndex === ROOMS.length - 1
                    ? language === 'vi'
                      ? 'Mở Khóa Cửa Cuối Cùng!'
                      : 'Unlock Final Chamber!'
                    : language === 'vi'
                    ? 'Mở Khóa & Sang Phòng Kế Tiếp'
                    : 'Door Unlocked — Proceed to Next Room'}
                </span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {language === 'vi'
                    ? 'Khóa Đang Đóng (Cần Thỏa Mãn 100% Test Cases)'
                    : 'Gate Locked (Must Satisfy 100% Test Cases)'}
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
