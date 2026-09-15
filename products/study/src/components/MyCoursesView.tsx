import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Filter
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { UserProfile, CourseId, LevelId } from '../types';
import { coreCourses, getCourseSyllabusStats, getFirstAvailableLesson } from '../data/coursesData';
import { CourseBrandIcon, getCourseTheme } from './CourseBrandIcon';
import { isUserLoggedIn } from '../services/storageService';

interface MyCoursesViewProps {
  user: UserProfile;
  onNavigate: (view: string, payload?: any) => void;
  onSelectCourse?: (courseId: CourseId, levelId?: LevelId) => void;
}

type FilterStatus = 'all' | 'in_progress' | 'completed' | 'not_started';

export const MyCoursesView: React.FC<MyCoursesViewProps> = ({
  user,
  onNavigate,
  onSelectCourse,
}) => {
  const { t, dict, language } = useLanguage();
  const [filter, setFilter] = useState<FilterStatus>('all');

  if (!isUserLoggedIn(user)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center border border-blue-500/20">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {language === 'vi' ? 'Đăng nhập để xem Khóa học của tôi' : 'Sign In to View My Courses'}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          {language === 'vi'
            ? 'Theo dõi toàn bộ các khóa học bạn đang tham gia, xem chi tiết tiến độ từng cấp độ và tiếp tục học tập.'
            : 'Track all your enrolled courses, monitor level completion rates, and resume lessons seamlessly.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('auth')}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            {dict.nav.signIn}
          </button>
          <button
            onClick={() => onNavigate('courses')}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            {dict.nav.courses}
          </button>
        </div>
      </div>
    );
  }

  // Compute stats for all 6 core courses with real lessonProgress data
  const coursesData = coreCourses.map(course => {
    const stats = getCourseSyllabusStats(course.id, user.lessonProgress);
    const theme = getCourseTheme(course.id);
    const nextLessonInfo = getFirstAvailableLesson(course.id, user.lessonProgress);

    let status: 'not_started' | 'in_progress' | 'completed' = 'not_started';
    if (stats.progressPercent >= 100) {
      status = 'completed';
    } else if (stats.progressPercent > 0 || stats.completedLessons > 0 || nextLessonInfo.isStarted) {
      status = 'in_progress';
    }

    const levelOrder: { id: LevelId; label: string }[] = [
      { id: 'basic', label: dict.course?.basic || 'Basic' },
      { id: 'intermediate', label: dict.course?.intermediate || 'Intermediate' },
      { id: 'advanced', label: dict.course?.advanced || 'Advanced' },
    ];

    const levels = levelOrder
      .filter(lvl => course.levels[lvl.id] && course.levels[lvl.id].modules.length > 0)
      .map(lvl => {
        const lvlStats = stats.levels[lvl.id];
        let lvlStatus: 'not_started' | 'in_progress' | 'completed' = 'not_started';
        if (lvlStats.progressPercent >= 100) {
          lvlStatus = 'completed';
        } else if (lvlStats.progressPercent > 0 || lvlStats.completedCount > 0) {
          lvlStatus = 'in_progress';
        }
        return {
          id: lvl.id,
          label: lvl.label,
          progressPercent: lvlStats.progressPercent,
          completedCount: lvlStats.completedCount,
          lessonsCount: lvlStats.lessonsCount,
          status: lvlStatus,
        };
      });

    return {
      course,
      theme,
      stats,
      status,
      levels,
      nextLessonInfo,
    };
  });

  // Global counts and percentages across all 6 core courses
  const totalLessons = coursesData.reduce((acc, c) => acc + c.stats.totalLessons, 0);
  const totalCompletedLessons = coursesData.reduce((acc, c) => acc + c.stats.completedLessons, 0);
  const overallPercentage = totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0;

  const inProgressCount = coursesData.filter(c => c.status === 'in_progress').length;
  const completedCount = coursesData.filter(c => c.status === 'completed').length;
  const notStartedCount = coursesData.filter(c => c.status === 'not_started').length;

  const filteredCourses = coursesData.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const handleOpenCourse = (courseId: CourseId, levelId: LevelId = 'basic') => {
    if (onSelectCourse) {
      onSelectCourse(courseId, levelId);
    } else {
      onNavigate('course-detail', { courseId, levelId });
    }
  };

  const handleResumeLesson = (courseId: CourseId, levelId: LevelId, lessonId: string) => {
    if (lessonId) {
      onNavigate('lesson', { courseId, levelId, lessonId });
    } else {
      handleOpenCourse(courseId, levelId);
    }
  };

  const getStatusBadge = (status: 'not_started' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            {dict.myCourses?.coursesCompleted || 'Completed'}
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
            <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            {dict.myCourses?.coursesInProgress || 'In Progress'}
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {dict.myCourses?.coursesNotStarted || 'Not Started'}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-blue-950/60 dark:via-slate-900 dark:to-slate-900 border border-slate-200 dark:border-blue-500/30 shadow-xl dark:shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-500/30 font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {dict.myCourses?.title || 'My Courses'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {dict.myCourses?.title || 'My Courses & Progress'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {dict.myCourses?.subtitle || 'Track your real-time learning progress across all 6 core courses and progression levels.'}
          </p>
        </div>

        {/* Global Progress Gauge */}
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 flex items-center gap-4 shadow-sm shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 dark:bg-blue-500 text-white flex flex-col items-center justify-center font-black shadow-md">
            <span className="text-lg leading-tight">{overallPercentage}%</span>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
              {dict.myCourses?.overallProgress || 'Overall Progress'}
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {totalCompletedLessons} / {totalLessons} {dict.myCourses?.lessonsFinished || 'lessons finished'}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Quick KPI Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {dict.myCourses?.filterAll || 'All Courses'} ({coursesData.length})
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              filter === 'in_progress'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Clock className="w-3 h-3 text-blue-500" />
            {dict.myCourses?.filterInProgress || 'In Progress'} ({inProgressCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              filter === 'completed'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            {dict.myCourses?.filterCompleted || 'Completed'} ({completedCount})
          </button>
          <button
            onClick={() => setFilter('not_started')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'not_started'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {dict.myCourses?.filterNotStarted || 'Not Started'} ({notStartedCount})
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span>{coursesData.length} {language === 'vi' ? 'Khóa học cốt lõi' : 'Core Courses'}</span>
          <span>•</span>
          <span>18 {language === 'vi' ? 'Cấp độ' : 'Levels'}</span>
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {dict.myCourses?.emptyFilter || 'No courses found in this category.'}
          </h3>
          <button
            onClick={() => setFilter('all')}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors cursor-pointer"
          >
            {dict.myCourses?.filterAll || 'Show All Courses'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map(({ course, theme, stats, status, levels, nextLessonInfo }) => {
            const courseTitle = course.title[language] || course.title.en;
            const courseDesc = course.description[language] || course.description.en;
            const isCompleted = status === 'completed';
            const isInProgress = status === 'in_progress';

            return (
              <div
                key={course.id}
                id={`my-course-card-${course.id}`}
                className={`p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 ${theme.cardBorder} shadow-md flex flex-col justify-between space-y-5 transition-all hover:shadow-lg`}
              >
                {/* Course Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <CourseBrandIcon courseId={course.id} size="md" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                            {courseTitle}
                          </h2>
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${theme.badgeBg}`}>
                            {course.id}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {stats.completedLessons} / {stats.totalLessons} {dict.myCourses?.lessonsFinished || 'lessons completed'}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {getStatusBadge(status)}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {courseDesc}
                  </p>

                  {/* Overall Course Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                        {language === 'vi' ? 'Tiến độ khóa học' : 'Course Progress'}
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {stats.progressPercent}%
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
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

                  {/* Level Breakdown: Beginner, Intermediate, Advanced */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3 h-3" />
                      {dict.course?.levels || 'Learning Levels'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {levels.map(lvl => (
                        <button
                          key={lvl.id}
                          onClick={() => handleOpenCourse(course.id, lvl.id)}
                          className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 text-left transition-all group flex flex-col justify-between cursor-pointer space-y-2"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                              {lvl.label}
                            </span>
                            <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                              {lvl.progressPercent}%
                            </span>
                          </div>

                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                lvl.progressPercent === 100
                                  ? 'bg-emerald-500'
                                  : 'bg-blue-500'
                              }`}
                              style={{ width: `${lvl.progressPercent}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            <span>{lvl.completedCount}/{lvl.lessonsCount}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Course Action Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 gap-3">
                  <button
                    onClick={() => handleOpenCourse(course.id, 'basic')}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{dict.myCourses?.viewSyllabus || 'View Syllabus'}</span>
                  </button>

                  {isInProgress && (
                    <button
                      onClick={() => handleResumeLesson(nextLessonInfo.courseId, nextLessonInfo.levelId, nextLessonInfo.lessonId)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{dict.myCourses?.continueLearning || 'Continue Learning'}</span>
                    </button>
                  )}

                  {isCompleted && (
                    <button
                      onClick={() => handleOpenCourse(course.id, 'basic')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{dict.myCourses?.reviewCourse || 'Review Course'}</span>
                    </button>
                  )}

                  {status === 'not_started' && (
                    <button
                      onClick={() => handleOpenCourse(course.id, 'basic')}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
                    >
                      <span>{dict.myCourses?.startCourse || 'Start Course'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
