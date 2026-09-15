import React, { useEffect, useRef } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { UserProfile, CourseId, LevelId } from '../types';
import { coreCourses, getCourseSyllabusStats } from '../data/coursesData';
import { CourseBrandIcon, getCourseTheme } from './CourseBrandIcon';

interface CourseProgressPanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onNavigate: (view: string, payload?: any) => void;
}

export const CourseProgressPanel: React.FC<CourseProgressPanelProps> = ({
  isOpen,
  onClose,
  user,
  onNavigate,
}) => {
  const { language, dict } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate stats for all 6 core courses
  const coursesProgressData = coreCourses.map(course => {
    const stats = getCourseSyllabusStats(course.id, user.lessonProgress);
    const theme = getCourseTheme(course.id);

    let status: 'not_started' | 'in_progress' | 'completed' = 'not_started';
    if (stats.progressPercent >= 100) {
      status = 'completed';
    } else if (stats.progressPercent > 0 || stats.completedLessons > 0) {
      status = 'in_progress';
    }

    return {
      course,
      theme,
      stats,
      status,
    };
  });

  // Calculate platform-wide average core completion
  const totalCoreLessons = coursesProgressData.reduce((acc, c) => acc + c.stats.totalLessons, 0);
  const totalCompletedCoreLessons = coursesProgressData.reduce((acc, c) => acc + c.stats.completedLessons, 0);
  const totalCorePercentage = totalCoreLessons > 0 
    ? Math.round((totalCompletedCoreLessons / totalCoreLessons) * 100) 
    : 0;

  const completedCoursesCount = coursesProgressData.filter(c => c.status === 'completed').length;
  const inProgressCoursesCount = coursesProgressData.filter(c => c.status === 'in_progress').length;
  const totalCoursesCount = coursesProgressData.length;

  const handleSelectCourse = (courseId: CourseId, levelId: LevelId = 'basic') => {
    onNavigate('course-detail', { courseId, levelId });
    onClose();
  };

  const handleGoToMyCourses = () => {
    onNavigate('my-courses');
    onClose();
  };

  const getStatusBadge = (status: 'not_started' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            {dict.nav?.statusCompleted || 'Completed'}
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" />
            {dict.nav?.statusInProgress || 'In Progress'}
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {dict.nav?.statusNotStarted || 'Not Started'}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={panelRef}
        id="course-progress-panel"
        className="w-full max-w-xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Panel Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {dict.nav?.courseProgressTitle || 'Courses Overview'}
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white shadow-sm">
                  {totalCorePercentage}%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {dict.nav?.courseProgressSubtitle || 'Quick progress summary of your courses'}
              </p>
            </div>
          </div>

          <button
            id="close-course-progress-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Independent Statistics Strip */}
        <div className="px-4 sm:px-6 py-3 bg-blue-50/60 dark:bg-blue-950/30 border-b border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-800/90 border border-blue-100 dark:border-slate-700 shadow-xs flex items-center gap-1.5 sm:gap-2 justify-center text-center">
              <span className="text-sm sm:text-base leading-none">📖</span>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                {inProgressCoursesCount} {language === 'vi' ? 'đang học' : 'In Progress'}
              </span>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-slate-700 shadow-xs flex items-center gap-1.5 sm:gap-2 justify-center text-center">
              <span className="text-sm sm:text-base leading-none">✅</span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                {completedCoursesCount} {language === 'vi' ? 'hoàn thành' : 'Completed'}
              </span>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-1.5 sm:gap-2 justify-center text-center">
              <span className="text-sm sm:text-base leading-none">📚</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {totalCoursesCount} {language === 'vi' ? 'khóa học' : 'Courses'}
              </span>
            </div>
          </div>
        </div>

        {/* Simplified Courses Overview List (No level breakdown) */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 max-h-[calc(85vh-180px)] divide-y divide-slate-100 dark:divide-slate-800/60">
          {coursesProgressData.map(({ course, theme, stats, status }) => {
            const courseTitle = course.title[language] || course.title.en;

            return (
              <div 
                key={course.id} 
                id={`popup-course-${course.id}`}
                onClick={() => handleSelectCourse(course.id)}
                className="pt-3 first:pt-0 group cursor-pointer space-y-2 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform">
                      <CourseBrandIcon courseId={course.id} size="sm" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {courseTitle}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {stats.completedLessons} / {stats.totalLessons} {language === 'vi' ? 'bài học' : 'lessons'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                      {stats.progressPercent}%
                    </span>
                    {getStatusBadge(status)}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* Course Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      stats.progressPercent === 100
                        ? 'bg-emerald-500'
                        : 'bg-blue-600 dark:bg-blue-500'
                    }`}
                    style={{ 
                      width: `${stats.progressPercent}%`,
                      backgroundColor: stats.progressPercent < 100 ? theme.primaryColor : undefined
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Panel Footer: Single Primary Action Button */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 flex items-center justify-center">
          <button
            id="popup-footer-my-courses-btn"
            onClick={handleGoToMyCourses}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-600/20 active:scale-[0.99]"
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === 'vi' ? 'Xem tất cả khóa học của tôi' : 'View All My Courses'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
