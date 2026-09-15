import React from 'react';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  Award, 
  FolderKanban, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Check, 
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CourseId } from '../types';

interface LearningProcessViewProps {
  onNavigate: (view: string, payload?: any) => void;
  onSelectCourse?: (courseId: CourseId) => void;
}

export const LearningProcessView: React.FC<LearningProcessViewProps> = ({
  onNavigate,
  onSelectCourse,
}) => {
  const { dict, language } = useLanguage();

  const stages = [
    {
      step: '01',
      title: {
        en: 'Stage 1: Learn (Foundational Theory)',
        vi: 'Bước 1: Học Lý Thuyết (Learn)',
      },
      shortName: {
        en: 'Learn',
        vi: 'Học lý thuyết',
      },
      icon: BookOpen,
      color: 'blue',
      badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      iconContainer: 'p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
      purpose: {
        en: 'High-yield conceptual acquisition without cognitive overload or passive video watching.',
        vi: 'Tiếp thu các mô hình tư duy và khái niệm cốt lõi một cách nhanh chóng, loại bỏ việc xem video thụ động.',
      },
      learnerActivity: {
        en: 'Read concise conceptual breakdowns, study syntax templates, observe inline execution flows, and run live interactive sandboxed code snippets directly in the browser.',
        vi: 'Đọc hiểu các khái niệm súc tích, phân tích cấu trúc cú pháp chuẩn mực, chạy thử các đoạn mã mẫu trực tiếp trong môi trường sandbox trình duyệt.',
      },
      completionCondition: {
        en: 'Review the theoretical concepts and successfully run/verify the interactive code demonstration.',
        vi: 'Đọc hết nội dung lý thuyết và chạy thử/xác nhận thành công đoạn mã thực thi minh họa.',
      },
      highlights: {
        en: [
          'No passive 40-minute video lectures',
          'Interactive WebAssembly runtime execution',
          'Dual-language syntax definitions (EN & VI)',
          'Instant console feedback & execution visualization'
        ],
        vi: [
          'Không tốn hàng giờ xem bài giảng video thụ động',
          'Trình thực thi WebAssembly (WASM) trực tiếp',
          'Cú pháp chuẩn mực và giải thích song ngữ (EN/VI)',
          'Phản hồi luồng chạy và kết quả console tức thì'
        ]
      }
    },
    {
      step: '02',
      title: {
        en: 'Stage 2: Exercise (Procedural Drills)',
        vi: 'Bước 2: Luyện Tập (Exercise)',
      },
      shortName: {
        en: 'Exercise',
        vi: 'Luyện tập',
      },
      icon: Code2,
      color: 'blue',
      badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      iconContainer: 'p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
      purpose: {
        en: 'Build muscle memory, procedural fluency, and rapid syntax recall through low-stakes micro-tasks.',
        vi: 'Hình thành phản xạ viết mã, ghi nhớ cú pháp và độ nhạy xử lý lỗi thông qua các bài tập nhỏ.',
      },
      learnerActivity: {
        en: 'Solve interactive coding drills: fix broken syntax bugs, predict code execution outputs, fill missing code blanks, and test immediate verification feedback.',
        vi: 'Giải các bài tập nhỏ linh hoạt: sửa lỗi cú pháp (fix_code), dự đoán kết quả thực thi (predict_output), điền khuyết và kiểm tra kết quả ngay lập tức.',
      },
      completionCondition: {
        en: 'Pass 100% of all interactive drill exercises within the lesson’s randomized problem pool.',
        vi: 'Hoàn thành và vượt qua chính xác toàn bộ các bài tập trong danh sách bài tập của bài học.',
      },
      highlights: {
        en: [
          'Multiple randomized exercise formats',
          'Instant error highlighting & AST parsing hints',
          'Repeatable practice for syntax fluency',
          'Builds confidence before tackling hard challenges'
        ],
        vi: [
          'Đa dạng các dạng bài tập thực hành nhỏ',
          'Gợi ý chẩn đoán lỗi AST tự động',
          'Có thể làm lại để rèn luyện phản xạ',
          'Tạo nền tảng vững chắc trước khi làm thử thách'
        ]
      }
    },
    {
      step: '03',
      title: {
        en: 'Stage 3: Challenge (Algorithmic Drill)',
        vi: 'Bước 3: Thử Thách (Challenge)',
      },
      shortName: {
        en: 'Challenge',
        vi: 'Thử thách',
      },
      icon: Trophy,
      color: 'amber',
      badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      iconContainer: 'p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      purpose: {
        en: 'Develop independent problem-solving capabilities, resilience, and edge-case handling without hand-holding.',
        vi: 'Rèn luyện năng lực giải quyết vấn đề độc lập, tư duy thuật toán và xử lý các trường hợp biên (edge cases).',
      },
      learnerActivity: {
        en: 'Implement complete algorithmic functions from scratch based on engineering specifications. Test against automated unit test suites and hidden edge cases.',
        vi: 'Tự viết mã giải quyết bài toán hoàn chỉnh dựa trên yêu cầu kỹ thuật. Chạy kiểm thử tự động với bộ test cases và các trường hợp biên.',
      },
      completionCondition: {
        en: 'Pass 100% of automated unit test assertions and edge cases without viewing the hidden solution.',
        vi: 'Vượt qua 100% các ca kiểm thử tự động (Unit Tests & Edge Cases). Khóa xem lời giải yêu cầu xác nhận.',
      },
      highlights: {
        en: [
          'Realistic standalone engineering problem prompts',
          'Automated multi-test assertion runner',
          'Progressive hints unlocked upon request',
          'Detailed reference solution & time-complexity explanation'
        ],
        vi: [
          'Bài toán thực tế yêu cầu tư duy thuật toán độc lập',
          'Bộ kiểm thử tự động nhiều trường hợp kiểm tra',
          'Gợi ý mở theo từng bước khi gặp khó khăn',
          'Đáp án chuẩn mực kèm phân tích độ phức tạp thời gian'
        ]
      }
    },
    {
      step: '04',
      title: {
        en: 'Stage 4: Quiz (Mastery Assessment)',
        vi: 'Bước 4: Kiểm Tra (Quiz)',
      },
      shortName: {
        en: 'Quiz',
        vi: 'Kiểm tra',
      },
      icon: Award,
      color: 'emerald',
      badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      iconContainer: 'p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
      purpose: {
        en: 'Rigorous diagnostic assessment ensuring deep conceptual mastery and identifying weak topic areas.',
        vi: 'Kiểm tra đánh giá kiến thức nghiêm ngặt, phát hiện chính xác lỗ hổng khái niệm cần ôn tập.',
      },
      learnerActivity: {
        en: 'Answer 10 randomized multiple-choice, code diagnosis, and edge-case questions drawn from an extensive question pool under randomized order.',
        vi: 'Trả lời 10 câu hỏi trắc nghiệm và phân tích mã nguồn được chọn ngẫu nhiên từ ngân hàng câu hỏi.',
      },
      completionCondition: {
        en: 'Achieve a passing score of at least 80% (8/10 correct). Detailed diagnostic feedback tags mistakes back to specific learning objectives.',
        vi: 'Đạt điểm số tối thiểu từ 80% trở lên (đúng ít nhất 8/10 câu). Hệ thống phân tích điểm yếu để ôn tập lại.',
      },
      highlights: {
        en: [
          '10 rigorous questions randomized each attempt',
          'High passing standard (≥ 80%)',
          'Explanations for every correct and incorrect answer',
          'Direct integration with Topic Mastery & Weak Area Review'
        ],
        vi: [
          '10 câu hỏi ngẫu nhiên cho mỗi lần làm bài',
          'Tiêu chuẩn đạt chất lượng cao (≥ 80%)',
          'Giải thích chi tiết cho từng phương án lựa chọn',
          'Tự động đồng bộ vào mục Ôn tập điểm yếu'
        ]
      }
    },
    {
      step: '05',
      title: {
        en: 'Stage 5: Project (Capstone Artifact)',
        vi: 'Bước 5: Dự Án (Project)',
      },
      shortName: {
        en: 'Project',
        vi: 'Dự án thực tế',
      },
      icon: FolderKanban,
      color: 'purple',
      badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      iconContainer: 'p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
      purpose: {
        en: 'Synthesize all module concepts into a cohesive, production-grade software or analytical artifact.',
        vi: 'Tổng hợp toàn diện kiến thức của toàn bộ mô-đun vào một sản phẩm phần mềm hoặc báo cáo thực chiến.',
      },
      learnerActivity: {
        en: 'Build and run an end-to-end working application (e.g. Student Grade Analyzer, Banking System, E-commerce SQL DB, Sales KPI Power BI Dashboard).',
        vi: 'Xây dựng và chạy một sản phẩm phần mềm hoàn chỉnh (ví dụ: Hệ thống Quản lý Điểm sinh viên, Hệ thống Ngân hàng OOP, Cơ sở dữ liệu E-commerce, Báo cáo Doanh thu Power BI).',
      },
      completionCondition: {
        en: 'Implement all functional requirements, satisfy architectural constraints, and validate full project criteria.',
        vi: 'Đáp ứng đầy đủ các yêu cầu chức năng, thỏa mãn cấu trúc kiến trúc và xác thực hoàn thành dự án.',
      },
      highlights: {
        en: [
          'End-to-end production software capstones',
          'Integrates multiple concepts into one cohesive codebase',
          'Verified with comprehensive requirements',
          'Tangible portfolio artifact ready for real-world application'
        ],
        vi: [
          'Dự án tổng hợp có tính ứng dụng thực tế cao',
          'Kết hợp nhiều khái niệm thành một hệ thống hoàn chỉnh',
          'Tiêu chí đánh giá chất lượng rõ ràng',
          'Tạo sản phẩm thực tế bổ sung vào Portfolio'
        ]
      }
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Phương Pháp Đào Tạo 4TM' : '4TM Learning Methodology'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {language === 'vi' ? 'Quy Trình Học Tập 5 Bước' : 'The 5-Stage Learning Process'}
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {language === 'vi'
              ? 'Tại 4TM, mọi bài học và khóa học đều tuân thủ nghiêm ngặt chu trình 5 bước: Học Lý Thuyết → Luyện Tập → Thử Thách → Kiểm Tra → Dự Án Thực Tế. Điều này đảm bảo bạn không chỉ hiểu lý thuyết mà còn có năng lực viết mã độc lập.'
              : 'Every lesson and module on 4TM is engineered around an unbreakable 5-stage learning loop: Learn → Exercise → Challenge → Quiz → Project. This structure eliminates passive watching and guarantees true procedural programming fluency.'}
          </p>

          {/* Quick Flow Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {stages.map((st, i) => (
              <React.Fragment key={st.step}>
                <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${st.badgeClass}`}>
                  {st.step}. {st.shortName[language] || st.shortName.en}
                </span>
                {i < stages.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Methodology Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 w-fit">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {language === 'vi' ? 'Thực Thi Client-Side WASM' : 'Client-Side WASM Engine'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {language === 'vi'
              ? 'Không có độ trễ gửi về máy chủ. Mã Python và SQL chạy trực tiếp trên CPU của bạn thông qua Pyodide và SQLite WebAssembly với độ trễ 0ms.'
              : 'Zero server latency. Python and SQL execute locally on your machine via Pyodide and SQLite WebAssembly, providing instant feedback and error diagnostics.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {language === 'vi' ? 'Tiêu Chuẩn Đạt Khắt Khe (≥80%)' : 'High Mastery Bar (≥80%)'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {language === 'vi'
              ? 'Không cho phép vượt qua bài học nếu chỉ đoán mò. Bạn phải đạt tối thiểu 80% ở bài kiểm tra và vượt qua toàn bộ test cases của thử thách.'
              : 'Guesswork is eliminated. You must score 80%+ on randomized quizzes and pass 100% of algorithmic test assertions to mark a lesson completed.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 w-fit">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {language === 'vi' ? 'Ôn Tập Chủ Động Điểm Yếu' : 'Targeted Weak Area Review'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {language === 'vi'
              ? 'Hệ thống tự động theo dõi các câu hỏi làm sai, phân loại theo chủ đề và đưa vào chế độ Ôn tập điểm yếu để rèn luyện lại.'
              : 'Diagnostic mistakes automatically update your topic mastery matrix, generating targeted review sessions to ensure no foundational syntax is forgotten.'}
          </p>
        </div>
      </div>

      {/* Detailed Stage by Stage Cards */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {language === 'vi' ? 'Chi Tiết Từng Giai Đoạn Trong Bài Học' : 'In-Depth Breakdown of Each Stage'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {language === 'vi' 
              ? 'Mỗi giai đoạn giải quyết một mục tiêu rèn luyện cụ thể, kèm hoạt động của người học và điều kiện hoàn thành rõ ràng.'
              : 'Every stage addresses a specific pedagogical objective with clear learner activities and validation criteria.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {stages.map(stage => {
            const Icon = stage.icon;

            return (
              <div
                key={stage.step}
                id={`process-stage-${stage.step}`}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className={stage.iconContainer}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {language === 'vi' ? `BƯỚC ${stage.step}` : `STAGE ${stage.step}`}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        {stage.title[language] || stage.title.en}
                      </h3>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold self-start sm:self-center border ${stage.badgeClass}`}>
                    {stage.shortName[language] || stage.shortName.en}
                  </span>
                </div>

                {/* 3 Columns: Purpose, Learner Activity, Completion Condition */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Column 1: Purpose */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                    <h4 className="text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? 'Mục Đích (Purpose)' : 'Stage Purpose'}</span>
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {stage.purpose[language] || stage.purpose.en}
                    </p>
                  </div>

                  {/* Column 2: Learner Activity */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                    <h4 className="text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? 'Hoạt Động Của Bạn (Activity)' : 'Learner Activity'}</span>
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {stage.learnerActivity[language] || stage.learnerActivity.en}
                    </p>
                  </div>

                  {/* Column 3: Completion Condition */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                    <h4 className="text-xs font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? 'Điều Kiện Đạt (Completion)' : 'Completion Condition'}</span>
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {stage.completionCondition[language] || stage.completionCondition.en}
                    </p>
                  </div>

                </div>

                {/* Key Highlights Bullets */}
                <div className="pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(stage.highlights[language] || stage.highlights.en).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Footer Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-[#0B1E3B] border border-blue-500/30 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-2xl font-black">
            {language === 'vi' ? 'Sẵn Sàng Rèn Luyện Với Phương Pháp 5 Bước?' : 'Ready to Experience the 5-Stage Methodology?'}
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
            {language === 'vi'
              ? 'Chọn bất kỳ khóa học hoặc lộ trình nghề nghiệp nào và trải nghiệm viết mã tương tác ngay trên trình duyệt.'
              : 'Choose any core course or career roadmap to start writing code directly in your browser with real-time feedback.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('learning-paths')}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
          >
            {dict.nav.learningPath || 'Learning Paths'}
          </button>

          <button
            onClick={() => onNavigate('courses')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <span>{dict.home.startLearning}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
