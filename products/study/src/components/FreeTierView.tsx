import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  HardDrive, 
  Cloud, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Code2, 
  FileSpreadsheet, 
  BarChart3, 
  Terminal, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  HeartHandshake
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CostAndSecurityAuditor } from './CostAndSecurityAuditor';

interface FreeTierViewProps {
  onNavigate: (view: string, payload?: any) => void;
}

export const FreeTierView: React.FC<FreeTierViewProps> = ({ onNavigate }) => {
  const { language, dict } = useLanguage();
  const [showTechnicalAudit, setShowTechnicalAudit] = useState(true);

  // Guarantee the Free Tier view always opens at the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const pillars = [
    {
      icon: Cpu,
      title: language === 'vi' ? '100% Chạy Mã Phía Client (WASM)' : '100% Client-Side WASM Execution',
      desc: language === 'vi'
        ? 'Python chạy trên Pyodide WebAssembly, SQL chạy trên SQLite WASM, công thức Excel và chỉ số DAX tính toán trực tiếp trong trình duyệt. Không cần máy chủ backend đắt đỏ.'
        : 'Python executes via Pyodide WebAssembly, SQL executes via SQLite WASM, and Excel formulas & DAX calculate client-side in your browser. Zero backend compute bottlenecks.',
      badge: language === 'vi' ? 'Không Tốn Phí Máy Chủ' : 'Zero Server Cost',
      color: 'text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/10'
    },
    {
      icon: Lock,
      title: language === 'vi' ? 'Không Cần Thẻ Tín Dụng & Không Phí Ẩn' : 'No Credit Card & No Hidden Paywalls',
      desc: language === 'vi'
        ? 'Tất cả 7 khóa học cốt lõi từ Cơ bản đến Nâng cao, bài tập tương tác, thử thách code và dự án capstone hoàn toàn miễn phí cho tất cả học viên.'
        : 'All 7 Core Courses from Basic to Advanced, interactive exercises, coding challenges, and capstone projects are completely free for all learners.',
      badge: language === 'vi' ? 'Miễn Phí Mãi Mãi' : '100% Free Forever',
      color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      icon: ShieldCheck,
      title: language === 'vi' ? 'Môi Trường Sandbox Cô Lập An Toàn' : 'Isolated Secure Browser Sandbox',
      desc: language === 'vi'
        ? 'Mã nguồn của bạn được thực thi an toàn trong sandbox trình duyệt cục bộ. Dữ liệu tiến độ học tập được lưu trữ an toàn mà không xâm phạm quyền riêng tư.'
        : 'Your code executes safely in an isolated browser sandbox. Progress and notes sync seamlessly without compromising learner privacy.',
      badge: language === 'vi' ? 'Bảo Mật Cao' : 'Isolated Sandbox',
      color: 'text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/10'
    },
    {
      icon: Sparkles,
      title: language === 'vi' ? 'Quy Trình Học 5 Bước Chuẩn Mực' : 'Rigorous 5-Stage Learning Pipeline',
      desc: language === 'vi'
        ? 'Học lý thuyết súc tích (Learn) → Luyện tập tương tác (Exercises) → Vượt thử thách (Challenge) → Kiểm tra trắc nghiệm 80%+ (Quiz) → Dự án thực tế (Project).'
        : 'Concise conceptual learning (Learn) → Dynamic practice (Exercises) → Algorithmic challenge (Challenge) → 80%+ mastery quiz (Quiz) → Working project (Project).',
      badge: language === 'vi' ? 'Học Đi Đôi Với Hành' : 'Learning By Doing',
      color: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10'
    }
  ];

  const technologies = [
    { name: 'Python 3.11', note: 'Pyodide WebAssembly' },
    { name: 'Microsoft Excel', note: 'In-Browser Formula Engine' },
    { name: 'SQLite SQL', note: 'sql.js WebAssembly' },
    { name: 'Power BI & DAX', note: 'In-Browser DAX Engine' },
    { name: 'HTML5 & CSS3', note: 'Isolated Iframe Sandbox' },
    { name: 'JavaScript (ES6+)', note: 'Secure Browser VM' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      
      {/* 4 Architectural Pillars Header */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Báo Cáo Kiến Trúc & Chi Phí Hạ Tầng' : 'Architecture & Zero-Cost Report'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {language === 'vi' ? 'Nguyên Lý Kiến Trúc Zero-Cost' : 'Zero-Cost Architecture Principles'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            {language === 'vi'
              ? 'Lý do 4TM có thể cung cấp miễn phí vĩnh viễn toàn bộ 7 khóa học cốt lõi, công cụ thực hành và môi trường Sandbox.'
              : 'How 4TM delivers comprehensive 7-course curricula, interactive sandboxes, and automated grading with zero server cost.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-2xl border ${p.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Supported Client-Side Technologies Grid */}
      <section className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'vi' ? 'Công Nghệ Thực Thi Phía Client' : 'Client-Side Execution Engines'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {language === 'vi' 
                ? 'Tất cả engine được tải trực tiếp về trình duyệt và chạy an toàn trên thiết bị của bạn' 
                : 'All calculation engines load directly into your browser and execute safely on your device'}
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 self-start sm:self-center">
            Zero Server Latency
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {technologies.map((tech, i) => (
            <div 
              key={i} 
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-center space-y-1 shadow-xs"
            >
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{tech.name}</p>
              <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">{tech.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Cost & Security Audit Component */}
      <section className="border-t border-slate-200 dark:border-slate-800 pt-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'vi' ? 'Báo Cáo Kiểm Tra Kỹ Thuật & Chi Phí Hạ Tầng' : 'Technical Architecture & Security Audit'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {language === 'vi'
                ? 'Xem chi tiết các chứng chỉ kiểm tra bảo mật sandbox và cấu hình hạ tầng $0.00/tháng'
                : 'Inspect full verification metrics for browser sandboxing, storage layers, and $0.00/mo infrastructure'}
            </p>
          </div>

          <button
            id="toggle-audit-btn"
            onClick={() => setShowTechnicalAudit(!showTechnicalAudit)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{showTechnicalAudit ? (language === 'vi' ? 'Thu gọn' : 'Hide Audit') : (language === 'vi' ? 'Xem chi tiết kỹ thuật' : 'View Audit Details')}</span>
            {showTechnicalAudit ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showTechnicalAudit && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-200 pt-2">
            <CostAndSecurityAuditor />
          </div>
        )}
      </section>

    </div>
  );
};
