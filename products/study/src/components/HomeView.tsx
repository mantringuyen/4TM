import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Layers, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  BookOpen,
  Code2,
  Trophy,
  FolderKanban,
  FileSpreadsheet,
  Database,
  BarChart3,
  Globe,
  Compass,
  Play,
  Check,
  Search,
  X
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CourseId } from '../types';
import { CourseBrandIcon } from './CourseBrandIcon';

interface HomeViewProps {
  onNavigate: (view: string, payload?: any) => void;
  onSelectCourse: (courseId: CourseId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectCourse,
}) => {
  const { t, dict, language } = useLanguage();
  const [heroSearch, setHeroSearch] = useState<string>('');

  const structuredPaths = [
    {
      id: 'data-analytics',
      title: language === 'vi' ? 'Phân Tích Dữ Liệu & Business Intelligence' : 'Data Analytics & BI',
      tagline: 'Excel → SQL → Power BI',
      description: language === 'vi'
        ? 'Xây dựng kỹ năng phân tích dữ liệu và Business Intelligence thực tế từ nền tảng bảng tính Excel đến cơ sở dữ liệu và BI.'
        : 'Build practical data-analysis and business-intelligence skills from spreadsheet fundamentals to databases and BI.',
      flow: [
        { name: 'Excel', icon: FileSpreadsheet, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
        { name: 'SQL', icon: Database, color: 'text-sky-500 bg-sky-500/10 border-sky-500/30' },
        { name: 'Power BI', icon: BarChart3, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
      ],
      badge: language === 'vi' ? 'Lộ Trình Dữ Liệu' : 'Analytics Track',
      accentBorder: 'hover:border-emerald-500/40',
      badgeStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      btnStyle: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
    },
    {
      id: 'programming',
      title: language === 'vi' ? 'Lập Trình & Tư Duy Thuật Toán' : 'Programming',
      tagline: 'Python',
      description: language === 'vi'
        ? 'Xây dựng kỹ năng lập trình, giải quyết bài toán thuật toán, tự động hóa và kỹ năng Python thực chiến.'
        : 'Build programming, problem-solving, automation, and practical Python skills.',
      flow: [
        { name: 'Python Basics', icon: Terminal, color: 'text-blue-500 bg-blue-500/10 border-blue-500/30' },
        { name: 'Data Structures', icon: Code2, color: 'text-sky-500 bg-sky-500/10 border-sky-500/30' },
        { name: 'Engineering', icon: Trophy, color: 'text-blue-600 bg-blue-600/10 border-blue-600/30' },
      ],
      badge: language === 'vi' ? 'Nền Tảng Cốt Lõi' : 'Core Programming',
      accentBorder: 'hover:border-blue-500/40',
      badgeStyle: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      btnStyle: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
    },
    {
      id: 'web-dev',
      title: language === 'vi' ? 'Lập Trình Web Frontend' : 'Frontend Web Development',
      tagline: 'HTML → CSS → JavaScript',
      description: language === 'vi'
        ? 'Xây dựng website từ cấu trúc semantic, giao diện responsive đến ứng dụng tương tác trên trình duyệt.'
        : 'Build websites from structure to responsive design and interactive browser applications.',
      flow: [
        { name: 'HTML5', icon: Globe, color: 'text-orange-500 bg-orange-500/10 border-orange-500/30' },
        { name: 'CSS3', icon: Layers, color: 'text-sky-500 bg-sky-500/10 border-sky-500/30' },
        { name: 'JavaScript', icon: Code2, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
      ],
      badge: language === 'vi' ? 'Lộ Trình Web' : 'Web Dev Track',
      accentBorder: 'hover:border-orange-500/40',
      badgeStyle: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
      btnStyle: 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/20'
    }
  ];

  return (
    <div className="space-y-16 pb-16 animate-in fade-in">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{dict.home.heroBadge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#0B1E3B] dark:text-slate-100 tracking-tight leading-[1.1]">
            {dict.home.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 dark:from-blue-400 dark:via-sky-300 dark:to-cyan-300">{dict.home.heroHighlight}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {dict.home.heroDescription}
          </p>

          {/* Landing Body Search Input */}
          <div className="max-w-xl mx-auto w-full pt-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                id="study-home-search-input"
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && heroSearch.trim()) {
                    onNavigate('courses', { searchQuery: heroSearch.trim() });
                  }
                  if (e.key === 'Escape') {
                    setHeroSearch('');
                  }
                }}
                placeholder={
                  dict.nav.searchPlaceholder ||
                  (language === 'vi'
                    ? 'Tìm bài học, chủ đề (ví dụ: Python, SQL JOIN, Excel)...'
                    : 'Search lessons, topics (e.g. Python, SQL JOIN, Excel)...')
                }
                className="w-full pl-11 pr-24 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs transition-all text-left"
                aria-label={language === 'vi' ? 'Tìm kiếm bài học và khóa học' : 'Search lessons and courses'}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {heroSearch && (
                  <button
                    type="button"
                    id="study-home-search-clear-btn"
                    onClick={() => setHeroSearch('')}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    aria-label={language === 'vi' ? 'Xóa tìm kiếm' : 'Clear search'}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  id="study-home-search-submit-btn"
                  onClick={() => {
                    if (heroSearch.trim()) {
                      onNavigate('courses', { searchQuery: heroSearch.trim() });
                    } else {
                      onNavigate('courses');
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Search className="w-3 h-3" />
                  <span className="hidden sm:inline">{language === 'vi' ? 'Tìm' : 'Search'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              id="hero-start-learning-btn"
              onClick={() => onNavigate('courses')}
              className="px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center gap-2.5 shadow-xl shadow-blue-600/30 transition-all transform active:scale-95 cursor-pointer"
            >
              <span>{dict.home.startLearning}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-open-playground-btn"
              onClick={() => onNavigate('playground')}
              className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>{dict.home.explorePlayground}</span>
            </button>
          </div>

          {/* 3 Pillars List in Exact Requested Order: 1. Song ngữ (EN/VI), 2. Quy trình học 5 bước, 3. Cơ bản -> Trung cấp -> Nâng cao */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              {dict.home.bilingualBadge}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              {dict.home.methodologyBadge}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {dict.home.levelsBadge}
            </span>
          </div>

        </div>
      </section>

      {/* 5-Stage Learning Methodology Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3B] dark:text-white">
            {dict.home.pipelineHeading}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {dict.home.pipelineSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: dict.home.stage1Title,
              icon: BookOpen,
              color: 'text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/10',
              desc: dict.home.stage1Desc
            },
            {
              step: '02',
              title: dict.home.stage2Title,
              icon: Code2,
              color: 'text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10',
              desc: dict.home.stage2Desc
            },
            {
              step: '03',
              title: dict.home.stage3Title,
              icon: Trophy,
              color: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10',
              desc: dict.home.stage3Desc
            },
            {
              step: '04',
              title: dict.home.stage4Title,
              icon: Award,
              color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
              desc: dict.home.stage4Desc
            },
            {
              step: '05',
              title: dict.home.stage5Title,
              icon: FolderKanban,
              color: 'text-blue-700 dark:text-blue-300 border-blue-500/30 bg-blue-500/10',
              desc: dict.home.stage5Desc
            }
          ].map(stage => {
            const Icon = stage.icon;
            const stepLabel = `${dict.home?.stepPrefix || (language === 'vi' ? 'Bước ' : 'Step ')}${stage.step}`;
            return (
              <div
                key={stage.step}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                      {stepLabel}
                    </span>
                    <div className={`p-2 rounded-xl border ${stage.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">{stage.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Learning Process CTA */}
        <div className="mt-6 text-center">
          <button
            id="home-view-learning-process-btn"
            onClick={() => onNavigate('learning-process')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer active:scale-95"
          >
            <span>{dict.home?.viewDetailedProcess || (language === 'vi' ? 'Tìm hiểu chi tiết quy trình 5 bước' : 'Explore Detailed 5-Stage Methodology')}</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
          </button>
        </div>
      </section>

      {/* Curated Structured Career Learning Paths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E3B] dark:text-white">
              {dict.home.curatedCurriculum}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {dict.home.curatedCurriculumDesc}
            </p>
          </div>

          <button
            onClick={() => onNavigate('learning-paths')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center gap-1 self-start sm:self-center cursor-pointer"
          >
            <span>{language === 'vi' ? 'Xem tất cả lộ trình nghề nghiệp' : 'Explore All Learning Paths'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {structuredPaths.map(path => (
            <div
              key={path.id}
              className={`p-7 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 ${path.accentBorder} shadow-lg dark:shadow-xl flex flex-col justify-between space-y-6 transition-all hover:scale-[1.01]`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border ${path.badgeStyle}`}>
                    {path.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {path.tagline}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{path.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {path.description}
                  </p>
                </div>

                {/* Structured Step Sequence Badges */}
                <div className="pt-2">
                  <p className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                    {language === 'vi' ? 'Tiến trình các giai đoạn:' : 'Sequential Steps:'}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {path.flow.map((step, idx) => {
                      const StepIcon = step.icon;
                      return (
                        <React.Fragment key={idx}>
                          <div className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold ${step.color}`}>
                            <StepIcon className="w-3.5 h-3.5" />
                            <span>{step.name}</span>
                          </div>
                          {idx < path.flow.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onNavigate('learning-paths', { pathId: path.id })}
                  className={`w-full py-3 px-4 rounded-xl ${path.btnStyle} font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-md`}
                >
                  <Compass className="w-4 h-4" />
                  <span>{language === 'vi' ? 'Khám phá lộ trình này' : 'Explore This Learning Path'}</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zero Cost & Security Transparency Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-gradient-to-r dark:from-emerald-950/30 dark:via-slate-900 dark:to-blue-950/30 border border-emerald-300 dark:border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl dark:shadow-2xl transition-colors">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400">
                {dict.home.freeTierHeading}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {dict.home.freeTierTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {dict.home.freeTierDesc}
            </p>
          </div>

          <button
            id="home-view-free-tier-btn"
            onClick={() => onNavigate('free-tier')}
            className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-200 dark:border-slate-700 shrink-0 self-start md:self-center cursor-pointer shadow-sm active:scale-95"
          >
            <span>{dict.home.viewArchitectureAudit}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
