import React from 'react';
import { 
  Play, 
  Flame, 
  Trophy, 
  Bookmark, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  Award,
  Clock,
  ChevronRight,
  TrendingUp,
  Compass
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { UserProfile, CourseId, LevelId } from '../types';
import { coreCourses, getCourseSyllabusStats, getFirstAvailableLesson } from '../data/coursesData';
import { CourseBrandIcon, getCourseTheme } from './CourseBrandIcon';
import { isDemoUser, isUserLoggedIn } from '../services/storageService';

interface DashboardViewProps {
  user: UserProfile;
  onNavigate: (view: string, payload?: any) => void;
  onStartReview: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onNavigate,
  onStartReview,
}) => {
  const { t, dict, language } = useLanguage();

  if (!isUserLoggedIn(user)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6 animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center border border-blue-500/20">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {language === 'vi' ? 'Đăng nhập để xem Bảng điều khiển' : 'Sign In to View Your Dashboard'}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          {language === 'vi'
            ? 'Theo dõi tiến độ học tập, chuỗi ngày học và làm bài tập thực hành cá nhân hóa sau khi đăng nhập.'
            : 'Track your learning progress, study streaks, and personalized coding practice by signing in to your account.'}
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

  // Find weak topics (< 70%)
  const weakTopics = Object.entries(user.topicMastery).filter(([_, score]) => (score as number) < 70);

  // Calculate total completed lessons
  const completedLessonCount = Object.values(user.lessonProgress).filter(p => (p as any)?.isCompleted).length;

  // Compute Courses in Progress (only courses the learner has started)
  const coursesInProgress = coreCourses
    .map(course => {
      const stats = getCourseSyllabusStats(course.id, user.lessonProgress);
      const theme = getCourseTheme(course.id);
      const nextLesson = getFirstAvailableLesson(course.id, user.lessonProgress);
      const isStarted = stats.progressPercent > 0 || stats.completedLessons > 0 || nextLesson.isStarted;
      
      return {
        course,
        stats,
        theme,
        nextLesson,
        isStarted,
        isCompleted: stats.progressPercent >= 100,
      };
    })
    .filter(c => c.isStarted);

  // Dynamically find nearest lesson to continue
  const getNearestLesson = () => {
    for (const course of coreCourses) {
      for (const levelKey of ['basic', 'intermediate', 'advanced'] as LevelId[]) {
        const level = course.levels[levelKey];
        if (!level) continue;
        for (const mod of level.modules) {
          for (const lesson of mod.lessons) {
            const isCompleted = user.lessonProgress[lesson.id]?.isCompleted;
            if (!isCompleted) {
              const levelLabel = levelKey === 'basic' ? dict.course.basic : levelKey === 'intermediate' ? dict.course.intermediate : dict.course.advanced;
              return {
                courseId: course.id,
                levelId: levelKey,
                lessonId: lesson.id,
                lessonTitle: t(lesson.title),
                courseTitle: t(course.title),
                levelLabel,
                tagline: t(course.tagline),
                estMinutes: lesson.estimatedMinutes || 10,
                isStarted: !!user.lessonProgress[lesson.id],
              };
            }
          }
        }
      }
    }
    const firstCourse = coreCourses[0];
    const firstLesson = firstCourse.levels.basic.modules[0].lessons[0];
    return {
      courseId: firstCourse.id,
      levelId: 'basic' as LevelId,
      lessonId: firstLesson.id,
      lessonTitle: t(firstLesson.title),
      courseTitle: t(firstCourse.title),
      levelLabel: dict.course.basic,
      tagline: t(firstCourse.tagline),
      estMinutes: firstLesson.estimatedMinutes || 10,
      isStarted: false,
    };
  };

  const nearest = getNearestLesson();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Top Welcome & Quick Streak Stat (XP removed completely) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gradient-to-r dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 border border-slate-200 dark:border-blue-500/20 shadow-xl dark:shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-500/30 font-bold">
              {dict.dashboard.title}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {dict.dashboard.welcome}, {user.displayName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {dict.dashboard.subtitle}
          </p>
        </div>

        {/* Actions & Streak */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            id="dashboard-open-my-courses-btn"
            onClick={() => onNavigate('my-courses')}
            className="px-4 sm:px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === 'vi' ? 'Khóa học của tôi' : 'My Courses'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center gap-3 shadow-sm">
            <Flame className="w-5 sm:w-6 h-5 sm:h-6 text-amber-500 animate-pulse" />
            <div>
              <p className="text-[10px] sm:text-[11px] font-mono uppercase font-bold text-amber-600 dark:text-amber-500">{dict.dashboard.streakDays}</p>
              <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">{user.streak}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Row: Continue Learning & Weak Topics Review */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Continue Learning Banner */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 fill-current" />
                {dict.dashboard.continueLearning}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {completedLessonCount} {dict.dashboard.lessonsMastered}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {nearest.courseTitle} ({nearest.levelLabel}): {nearest.lessonTitle}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {nearest.tagline}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>~{nearest.estMinutes} {dict.lesson?.estimatedMinutes || (language === 'vi' ? 'phút' : 'minutes')}</span>
            </div>

            <button
              id="dashboard-resume-btn"
              onClick={() => onNavigate('lesson', { courseId: nearest.courseId, levelId: nearest.levelId, lessonId: nearest.lessonId })}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95"
            >
              <span>{nearest.isStarted ? dict.course.resumeLevel : dict.course.startLevel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Smart Review Weak Topics Drill Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono uppercase font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {dict.review.modalTitle}
              </span>
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400/80 font-bold">
                {weakTopics.length} {dict.dashboard.areasNeedPractice}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">{dict.dashboard.weakTopicsHeading}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {dict.dashboard.targetedDrillDesc}
            </p>
          </div>

          <button
            id="start-weak-review-btn"
            onClick={onStartReview}
            className="w-full px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{dict.dashboard.startReview}</span>
          </button>
        </div>

      </div>

      {/* Courses in Progress / Khóa học đang tham gia Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{dict.dashboard?.coursesInProgress || 'Courses in Progress'}</span>
            </h2>
            {coursesInProgress.length > 0 && (
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                {coursesInProgress.length}
              </span>
            )}
          </div>

          <button
            id="dashboard-view-all-courses-btn"
            onClick={() => onNavigate('my-courses')}
            className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{language === 'vi' ? 'Xem tất cả khóa học của tôi' : 'View All My Courses'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {coursesInProgress.length === 0 ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {dict.dashboard?.noCoursesInProgress || 'No courses in progress yet.'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {dict.dashboard?.startFirstCourse || 'Start your first course to begin tracking real-time progress here!'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('courses')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Khám phá các khóa học' : 'Explore Courses'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesInProgress.map(({ course, stats, theme, nextLesson, isCompleted }) => {
              const courseTitle = course.title[language] || course.title.en;

              return (
                <div
                  key={course.id}
                  id={`dashboard-course-${course.id}`}
                  className={`p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 ${theme.cardBorder} shadow-sm flex flex-col justify-between space-y-4 transition-all hover:shadow-md`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CourseBrandIcon courseId={course.id} size="sm" />
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {courseTitle}
                          </h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                            {stats.completedLessons} / {stats.totalLessons} {language === 'vi' ? 'bài học' : 'lessons'}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        {stats.progressPercent}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      onClick={() => onNavigate('course-detail', { courseId: course.id })}
                      className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{dict.dashboard.viewSyllabus}</span>
                    </button>

                    <button
                      onClick={() => onNavigate('lesson', { courseId: nextLesson.courseId, levelId: nextLesson.levelId, lessonId: nextLesson.lessonId })}
                      className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title={language === 'vi' ? 'Tiếp tục học' : 'Continue'}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{language === 'vi' ? 'Học tiếp' : 'Resume'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Topic Mastery Radar Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{dict.dashboard.masteryHeading}</span>
          </h2>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{dict.dashboard.targetThreshold}</span>
        </div>

        {Object.entries(user.topicMastery).length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            {language === 'vi'
              ? 'Chưa có dữ liệu độ thuần thục. Hãy hoàn thành các bài trắc nghiệm và thử thách để tạo biểu đồ năng lực theo từng chủ đề!'
              : 'No topic mastery data recorded yet. Complete quizzes and challenges across courses to build your personal mastery radar!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {Object.entries(user.topicMastery).map(([topic, score]) => {
              const numScore = Number(score);
              const isHigh = numScore >= 80;
              const isLow = numScore < 70;

              return (
                <div
                  key={topic}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{topic}</span>
                    <span className={`font-mono font-bold ${
                      isHigh ? 'text-emerald-600 dark:text-emerald-400' : isLow ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-300'
                    }`}>
                      {numScore}%
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isHigh
                          ? 'bg-emerald-500'
                          : isLow
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${numScore}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Badges & Achievements Gallery */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>{dict.dashboard.badgesHeading}</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {user.achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                ach.unlocked
                  ? 'bg-amber-500/5 dark:bg-slate-950 border-amber-500/30 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'bg-slate-100/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/60 text-slate-400 dark:text-slate-600 grayscale'
              }`}
            >
              <div className="text-2xl">{ach.icon}</div>
              <p className="text-xs font-bold truncate">{t(ach.title)}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">{t(ach.description)}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

