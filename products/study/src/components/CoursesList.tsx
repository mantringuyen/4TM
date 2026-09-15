import React, { useState } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Clock,
  Database,
  Globe,
  FileSpreadsheet,
  BarChart3,
  Terminal,
  Code2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CourseId, UserProfile } from '../types';
import { coreCourses, getFirstAvailableLesson } from '../data/coursesData';
import { isUserLoggedIn } from '../services/storageService';
import { CourseBrandIcon, getCourseTheme } from './CourseBrandIcon';

interface CoursesListProps {
  user: UserProfile;
  onNavigate: (view: string, payload?: any) => void;
  onSelectCourse?: (courseId: CourseId) => void;
}

export const CoursesList: React.FC<CoursesListProps> = ({
  user,
  onNavigate,
  onSelectCourse,
}) => {
  const { t, dict, language } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const isLoggedIn = isUserLoggedIn(user);

  const programmingCourses = coreCourses.filter(c => c.id === 'python');
  const dataCourses = coreCourses.filter(c => c.id === 'excel' || c.id === 'sql' || c.id === 'powerbi');
  const webCourses = coreCourses.filter(c => c.id === 'html' || c.id === 'css' || c.id === 'javascript');

  const handleViewCourse = (courseId: CourseId) => {
    if (onSelectCourse) {
      onSelectCourse(courseId);
    } else {
      onNavigate('course-detail', { courseId, levelId: 'basic' });
    }
  };

  const handleStartLearning = (courseId: CourseId) => {
    const first = getFirstAvailableLesson(courseId, isLoggedIn ? user.lessonProgress : {});
    if (first.lessonId) {
      onNavigate('lesson', {
        courseId: first.courseId,
        levelId: first.levelId,
        lessonId: first.lessonId,
      });
    } else {
      handleViewCourse(courseId);
    }
  };

  const renderCourseCard = (course: typeof coreCourses[0]) => {
    const theme = getCourseTheme(course.id);
    const allLessonIds: string[] = [];
    Object.values(course.levels).forEach(lvl => {
      lvl.modules.forEach(m => m.lessons.forEach(l => allLessonIds.push(l.id)));
    });

    const completed = isLoggedIn ? allLessonIds.filter(id => user.lessonProgress[id]?.isCompleted).length : 0;
    const progressPercent = isLoggedIn && allLessonIds.length > 0 ? Math.round((completed / allLessonIds.length) * 100) : 0;

    return (
      <div
        key={course.id}
        id={`course-card-${course.id}`}
        className={`p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 ${theme.cardBorder} shadow-lg dark:shadow-xl flex flex-col justify-between space-y-6 transition-all hover:scale-[1.01]`}
      >
        <div>
          {/* Badge & Track Header with Official Logo */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-3">
              <CourseBrandIcon courseId={course.id} size="md" />
              <div>
                <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border ${theme.badgeBg}`}>
                  {course.id.toUpperCase()}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {dict.course.threeLevels}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{t(course.title)}</h3>
          <p className={`text-xs font-semibold mt-1 ${theme.accentText}`}>{t(course.tagline)}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
            {t(course.description)}
          </p>
        </div>

        {/* Progress & Dual Action Buttons */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {isLoggedIn && (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                <span>{progressPercent}{dict.course.percentCompleted}</span>
                <span>{completed}/{allLessonIds.length} {dict.course.lessonCount}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-300`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Two Distinct Actions */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              id={`view-course-btn-${course.id}`}
              onClick={() => handleViewCourse(course.id)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 border border-slate-200 dark:border-slate-700"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="truncate">{dict.course.viewCourse}</span>
            </button>

            <button
              id={`start-learning-btn-${course.id}`}
              onClick={() => handleStartLearning(course.id)}
              className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer active:scale-95"
            >
              <span>{isLoggedIn && completed > 0 ? dict.course.continueCourse : dict.course.startLesson}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      
      {/* Header */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl dark:shadow-2xl transition-colors">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-500/30 font-bold">
              {dict.home.coursesHeading}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {dict.home.coursesHeading}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {dict.home.coursesSubheading}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="w-full sm:w-auto grid grid-cols-2 sm:flex sm:items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0 self-stretch sm:self-start md:self-center">
          {[
            { id: 'all', label: dict.course.allTracksFilter },
            { id: 'programming', label: dict.course.programmingFilter },
            { id: 'data', label: dict.course.backendFilter },
            { id: 'web', label: dict.course.webFilter }
          ].map(f => (
            <button
              key={f.id}
              id={`filter-course-${f.id}-btn`}
              onClick={() => setFilterCategory(f.id)}
              className={`px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all cursor-pointer text-center flex items-center justify-center whitespace-nowrap ${
                filterCategory === f.id
                  ? 'bg-blue-600 text-white shadow-md font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-900/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Domain Section 1: Programming (Python) */}
      {(filterCategory === 'all' || filterCategory === 'programming') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate sm:text-clip">
                  {language === 'vi' ? 'Lập Trình' : 'Programming'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                  {language === 'vi' ? 'Python • Xây dựng kỹ năng lập trình, giải quyết bài toán thuật toán, tự động hóa và xử lý dữ liệu' : 'Python • Build programming, problem-solving, automation, and practical Python skills'}
                </p>
              </div>
            </div>

            {/* Course Count */}
            <div className="shrink-0 flex items-center">
              <span 
                className="sm:hidden inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shrink-0"
                title={language === 'vi' ? '1 khóa học' : '1 course'}
              >
                [1]
              </span>
              <span className="hidden sm:inline-flex text-xs font-mono font-bold text-slate-400 shrink-0">
                1 {language === 'vi' ? 'Khóa học' : 'Course'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programmingCourses.map(course => renderCourseCard(course))}
          </div>
        </section>
      )}

      {/* Domain Section 2: Data Analytics & BI (Excel, SQL, Power BI) */}
      {(filterCategory === 'all' || filterCategory === 'data') && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate sm:text-clip">
                  {language === 'vi' ? 'Phân Tích Dữ Liệu & BI' : 'Data & BI'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                  {language === 'vi' ? 'Excel → SQL → Power BI • Xây dựng kỹ năng phân tích dữ liệu từ bảng tính đến cơ sở dữ liệu và báo cáo BI' : 'Excel → SQL → Power BI • Spreadsheet modeling to relational databases and executive BI dashboards'}
                </p>
              </div>
            </div>

            {/* Course Count */}
            <div className="shrink-0 flex items-center">
              <span 
                className="sm:hidden inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shrink-0"
                title={language === 'vi' ? '3 khóa học' : '3 courses'}
              >
                [3]
              </span>
              <span className="hidden sm:inline-flex text-xs font-mono font-bold text-slate-400 shrink-0">
                3 {language === 'vi' ? 'Khóa học' : 'Courses'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dataCourses.map(course => renderCourseCard(course))}
          </div>
        </section>
      )}

      {/* Domain Section 3: Frontend Web Development (HTML, CSS, JavaScript) */}
      {(filterCategory === 'all' || filterCategory === 'web') && (
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate sm:text-clip">
                  {language === 'vi' ? 'Lập Trình Web' : 'Web Development'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 sm:line-clamp-none">
                  {language === 'vi' ? 'HTML → CSS → JavaScript • Xây dựng website từ cấu trúc ngữ nghĩa đến giao diện responsive và tương tác dynamic' : 'HTML → CSS → JavaScript • Build websites from structure to responsive design and interactive browser applications'}
                </p>
              </div>
            </div>

            {/* Course Count */}
            <div className="shrink-0 flex items-center">
              <span 
                className="sm:hidden inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shrink-0"
                title={language === 'vi' ? '3 khóa học' : '3 courses'}
              >
                [3]
              </span>
              <span className="hidden sm:inline-flex text-xs font-mono font-bold text-slate-400 shrink-0">
                3 {language === 'vi' ? 'Khóa học' : 'Courses'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {webCourses.map(course => renderCourseCard(course))}
          </div>
        </section>
      )}

    </div>
  );
};
