import React, { useState, useEffect, useMemo } from 'react';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  BookOpen, 
  Award, 
  ArrowLeft,
  ChevronRight,
  Terminal,
  Code2,
  Trophy,
  FolderKanban,
  Check,
  Users,
  GraduationCap,
  Play
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CourseId, LevelId, UserProfile, Lesson } from '../types';
import { getCourseById, getFirstAvailableLesson, getCourseSyllabusStats } from '../data/coursesData';
import { getCourseMetadata } from '../data/courseMetadata';
import { CourseBrandIcon, getCourseTheme } from './CourseBrandIcon';
import { isUserLoggedIn } from '../services/storageService';

interface CourseDetailProps {
  courseId: CourseId;
  initialLevelId?: LevelId | null;
  user: UserProfile;
  onNavigate: (view: string, payload?: any) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  courseId,
  initialLevelId = null,
  user,
  onNavigate,
}) => {
  const { language, t, dict } = useLanguage();
  const course = getCourseById(courseId);
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId | null>(initialLevelId || null);

  // Sync state if initialLevelId or courseId changes from navigation payload
  useEffect(() => {
    setSelectedLevelId(initialLevelId || null);
  }, [initialLevelId, courseId]);

  const levelKeys: LevelId[] = ['basic', 'intermediate', 'advanced'];

  const theme = course ? getCourseTheme(course.id) : null;
  const metadata = course ? getCourseMetadata(course.id) : null;
  const isLoggedIn = isUserLoggedIn(user);
  const stats = useMemo(() => course ? getCourseSyllabusStats(course.id, isLoggedIn ? user.lessonProgress : {}) : null, [course, user.lessonProgress, isLoggedIn]);
  const firstAvailable = useMemo(() => course ? getFirstAvailableLesson(course.id, isLoggedIn ? user.lessonProgress : {}) : null, [course, user.lessonProgress, isLoggedIn]);

  if (!course || !theme || !metadata || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-slate-500 dark:text-slate-400">Course not found.</p>
        <button
          onClick={() => onNavigate('courses')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
        >
          {dict.course.backToCourses}
        </button>
      </div>
    );
  }

  // Check level lock status
  const isLevelUnlocked = (lvlId: LevelId): boolean => {
    if (user.role === 'admin') return true;
    if (lvlId === 'basic') return true;
    
    if (lvlId === 'intermediate') {
      const basicModules = course.levels.basic?.modules || [];
      const basicLessonIds: string[] = [];
      basicModules.forEach(m => m.lessons.forEach(l => basicLessonIds.push(l.id)));
      if (basicLessonIds.length === 0) return true;
      return basicLessonIds.every(id => user.lessonProgress[id]?.isCompleted);
    }

    if (lvlId === 'advanced') {
      const intModules = course.levels.intermediate?.modules || [];
      const intLessonIds: string[] = [];
      intModules.forEach(m => m.lessons.forEach(l => intLessonIds.push(l.id)));
      if (intLessonIds.length === 0) return true;
      return intLessonIds.every(id => user.lessonProgress[id]?.isCompleted);
    }

    return true;
  };

  // Helper for launching first available lesson
  const handleStartLearning = () => {
    if (firstAvailable && firstAvailable.lessonId) {
      onNavigate('lesson', {
        courseId: firstAvailable.courseId,
        levelId: firstAvailable.levelId,
        lessonId: firstAvailable.lessonId,
      });
    } else {
      // Open beginner level view
      setSelectedLevelId('basic');
    }
  };

  // Helper to determine lesson status
  const getLessonStatus = (lesson: Lesson, levelUnlocked: boolean) => {
    if (!levelUnlocked) return 'locked';
    if (!isLoggedIn) return 'not_started';
    const prog = user.lessonProgress[lesson.id];
    if (prog?.isCompleted) return 'completed';
    if (prog && (prog.learnCompleted || prog.exercisesCompleted || prog.challengeCompleted || (prog.quizAttemptsCount && prog.quizAttemptsCount > 0))) {
      return 'in_progress';
    }
    return 'not_started';
  };

  const selectedLevel = selectedLevelId ? course.levels[selectedLevelId] : null;
  const isSelectedLevelUnlocked = selectedLevelId ? isLevelUnlocked(selectedLevelId) : true;
  const selectedLevelStats = selectedLevelId ? stats.levels[selectedLevelId] : null;

  // =========================================================================
  // VIEW B: LEVEL-SPECIFIC LESSON PAGE (When a level is selected)
  // =========================================================================
  if (selectedLevelId && selectedLevel && selectedLevelStats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
        
        {/* Top Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            id="level-back-to-course-btn"
            onClick={() => setSelectedLevelId(null)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{dict.course.backToCourseOverview}</span>
          </button>

          {/* Breadcrumb Hierarchy: Courses > Course Title > Level Name */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500">
            <button 
              onClick={() => onNavigate('courses')}
              className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
            >
              {dict.nav.courses}
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button 
              onClick={() => setSelectedLevelId(null)}
              className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium"
            >
              {t(course.title)}
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-bold">
              {selectedLevelId === 'basic' ? dict.course.levelBeginnerTitle : selectedLevelId === 'intermediate' ? dict.course.levelIntermediateTitle : dict.course.levelAdvancedTitle}
            </span>
          </div>
        </div>

        {/* Level Overview Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900/95 dark:to-blue-950/30 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <CourseBrandIcon courseId={course.id} size="md" />
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border ${theme.badgeBg}`}>
                  {course.id.toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border ${
                  selectedLevelId === 'basic'
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                    : selectedLevelId === 'intermediate'
                    ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30'
                    : 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30'
                }`}>
                  {selectedLevelId === 'basic' ? dict.course.levelBeginnerTitle : selectedLevelId === 'intermediate' ? dict.course.levelIntermediateTitle : dict.course.levelAdvancedTitle}
                </span>

                {isSelectedLevelUnlocked ? (
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                    <Unlock className="w-3 h-3" />
                    <span>{dict.course.unlocked}</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>{dict.course.locked}</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                {t(selectedLevel.title)}
              </h1>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {t(selectedLevel.description)}
              </p>
            </div>

            {/* Level Progress & Quick Level Switcher */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 lg:min-w-[280px]">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">{dict.course.progress}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{selectedLevelStats.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-500`}
                      style={{ width: `${selectedLevelStats.progressPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 text-right">
                    {selectedLevelStats.completedCount}/{selectedLevelStats.lessonsCount} {dict.course.lessonCount}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 block">
                    {language === 'vi' ? 'Quy mô cấp độ' : 'Level Overview'}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {selectedLevel.modules.length} {dict.course.moduleCount} • {selectedLevelStats.lessonsCount} {dict.course.lessonCount}
                  </p>
                </div>
              )}

              {/* Level Quick Switcher Buttons */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 block">
                  {dict.course.switchLevel}:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {levelKeys.map(lvlKey => {
                    const unlocked = isLevelUnlocked(lvlKey);
                    const isCur = selectedLevelId === lvlKey;
                    return (
                      <button
                        key={lvlKey}
                        onClick={() => setSelectedLevelId(lvlKey)}
                        className={`px-2 py-1.5 rounded-lg text-[11px] font-bold font-mono transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isCur
                            ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-500'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        {!unlocked && <Lock className="w-2.5 h-2.5 text-amber-500 shrink-0" />}
                        <span className="capitalize">{lvlKey === 'basic' ? 'Basic' : lvlKey === 'intermediate' ? 'Inter' : 'Adv'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Lock Warning Notice if level is locked */}
        {!isSelectedLevelUnlocked && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <p className="font-bold">{dict.course.locked} — {dict.course.unlockRequirement}</p>
              <p className="text-[11px] opacity-90 mt-0.5">{dict.course.unlockPrecedingNotice}</p>
            </div>
          </div>
        )}

        {/* Level Modules & Lessons List (ONLY FOR THIS LEVEL) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{dict.course.levelLessonsHeading}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {dict.course.lessonsOnlyForLevel} ({selectedLevel.modules.reduce((acc, m) => acc + m.lessons.length, 0)} {dict.course.lessonCount})
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {selectedLevel.modules.length > 0 ? (
              selectedLevel.modules.map((mod, modIdx) => (
                <div 
                  key={mod.id}
                  className="rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
                >
                  {/* Module Header */}
                  <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                          {dict.course.moduleCount} {modIdx + 1}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{t(mod.title)}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{t(mod.description)}</p>
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 self-start sm:self-center px-2.5 py-1 rounded-md bg-slate-200/60 dark:bg-slate-800">
                      {mod.lessons.length} {dict.course.lessonCount}
                    </span>
                  </div>

                  {/* Module Lessons */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {mod.lessons.map((lesson, idx) => {
                      const status = getLessonStatus(lesson, isSelectedLevelUnlocked);
                      const prog = user.lessonProgress[lesson.id];

                      return (
                        <div
                          key={lesson.id}
                          id={`course-lesson-row-${lesson.id}`}
                          className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:bg-slate-50/80 dark:hover:bg-slate-850/40 transition-colors"
                        >
                          <div className="flex items-start gap-4 min-w-0">
                            {/* Status Icon */}
                            <div className="mt-0.5 shrink-0">
                              {status === 'completed' ? (
                                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  <CheckCircle2 className="w-5 h-5" />
                                </div>
                              ) : status === 'in_progress' ? (
                                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                  <BookOpen className="w-5 h-5" />
                                </div>
                              ) : status === 'locked' ? (
                                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                  <Lock className="w-5 h-5" />
                                </div>
                              ) : (
                                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400">
                                  <BookOpen className="w-5 h-5" />
                                </div>
                              )}
                            </div>

                            {/* Lesson Text & Breakdown */}
                            <div className="space-y-2 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                                  {modIdx + 1}.{idx + 1}
                                </span>
                                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                                  {t(lesson.title)}
                                </h4>

                                {/* Status Chip */}
                                {status === 'completed' ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    {dict.course.completed}
                                  </span>
                                ) : status === 'in_progress' ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                    {dict.course.inProgress}
                                  </span>
                                ) : status === 'locked' ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                    {dict.course.locked}
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                                    {dict.course.notStarted}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {t(lesson.summary)}
                              </p>

                              {/* 5-Stage Content Breakdown Chips */}
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                                  <BookOpen className="w-3 h-3" />
                                  <span>{dict.course.stageLearn}</span>
                                </span>

                                {lesson.exercisePool && lesson.exercisePool.length > 0 && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60">
                                    <Code2 className="w-3 h-3" />
                                    <span>{lesson.exercisePool.length} {dict.course.stageExercises}</span>
                                  </span>
                                )}

                                {lesson.challenge && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                                    <Trophy className="w-3 h-3" />
                                    <span>{dict.course.stageChallenge}</span>
                                  </span>
                                )}

                                {lesson.quizQuestionPool && lesson.quizQuestionPool.length > 0 && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                                    <Award className="w-3 h-3" />
                                    <span>{lesson.quizQuestionPool.length} {dict.course.stageQuiz}</span>
                                  </span>
                                )}

                                {lesson.project && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60">
                                    <FolderKanban className="w-3 h-3" />
                                    <span>{dict.course.stageProject}</span>
                                  </span>
                                )}

                                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 ml-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{lesson.estimatedMinutes || 10}m</span>
                                </span>

                                {prog?.bestQuizScore !== undefined && prog.bestQuizScore > 0 && (
                                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                                    Quiz: {prog.bestQuizScore}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="self-end lg:self-center shrink-0">
                            {isSelectedLevelUnlocked ? (
                              <button
                                id={`start-lesson-btn-${lesson.id}`}
                                onClick={() => onNavigate('lesson', { courseId, levelId: selectedLevelId, lessonId: lesson.id })}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
                                  status === 'completed'
                                    ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                                }`}
                              >
                                <span>{status === 'completed' ? dict.course.reviewLesson : dict.course.startLesson}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                disabled
                                className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 bg-slate-100 dark:bg-slate-850 text-slate-400 cursor-not-allowed opacity-75"
                              >
                                <Lock className="w-3.5 h-3.5" />
                                <span>{dict.course.locked}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 space-y-2">
                <p className="text-sm font-medium">{dict.course.unlockSequentialNotice}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW A: COURSE OVERVIEW (Default - No level selected)
  // Shows course overview, what learner will learn, skills, structure, and 3 level cards.
  // Must NOT display lesson list until a level is explicitly chosen.
  // =========================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      
      {/* Top Breadcrumb / Back Link */}
      <div className="flex items-center justify-between gap-4">
        <button
          id="course-back-btn"
          onClick={() => onNavigate('courses')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{dict.course.backToCourses}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500">
          <span>{dict.nav.courses}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 dark:text-slate-200 font-bold">{t(course.title)}</span>
        </div>
      </div>

      {/* Course Hero Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/30 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          
          {/* Main Info */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <CourseBrandIcon courseId={course.id} size="lg" />
              <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border ${theme.badgeBg}`}>
                {course.id.toUpperCase()} TRACK
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 font-bold">
                {dict.course.freeTierVerified}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t(course.title)}
            </h1>
            
            <p className={`text-base font-semibold ${theme.accentText}`}>
              {t(course.tagline)}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t(course.description)}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span>3 {dict.course.levelsCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                <span>{stats.totalLessons} {dict.course.totalLessonsLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>{stats.totalExercises} {dict.course.totalExercisesLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>{stats.totalChallenges} {dict.course.totalChallengesLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                <span>~{stats.estimatedHours} {dict.course.hoursTotal}</span>
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/90 shadow-sm flex flex-col justify-between space-y-5 lg:min-w-[280px]">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">{dict.course.progress}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{stats.progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-500`}
                    style={{ width: `${stats.progressPercent}%` }}
                  />
                </div>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 text-right">
                  {stats.completedLessons}/{stats.totalLessons} {dict.course.lessonCount}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  {language === 'vi' ? 'Khóa học miễn phí' : 'Free Tier Course'}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {stats.totalLessons} {dict.course.totalLessonsLabel} • {stats.estimatedHours} {dict.course.hoursTotal}
                </p>
              </div>
            )}

            <button
              id="course-hero-start-btn"
              onClick={handleStartLearning}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isLoggedIn && stats.completedLessons > 0 ? dict.course.continueLearning : dict.course.startLearning}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Course Overview & Learning Objectives Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* What You Will Learn (2 Columns) */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {dict.course.whatYouWillLearn}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {dict.course.objectivesHeading}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {metadata.whatYouWillLearn.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800/80 flex items-start gap-3"
              >
                <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {t(item)}
                </p>
              </div>
            ))}
          </div>

          {/* Learning Objectives Detailed List */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
            <h3 className="text-xs font-mono uppercase font-bold text-slate-400 dark:text-slate-500">
              {dict.course.objectivesHeading}
            </h3>
            <ul className="space-y-2">
              {metadata.learningObjectives.map((obj, i) => (
                <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 mt-1.5 shrink-0" />
                  <span>{t(obj)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prerequisites & Target Audience Side Cards */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* Prerequisites */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {dict.course.prerequisitesHeading}
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {metadata.prerequisites.map((pr, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{t(pr)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Target Audience */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {dict.course.targetAudienceHeading}
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {metadata.targetAudience.map((ta, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{t(ta)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Execution Environment Card */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>{dict.course.interactiveWasmSandbox}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {t(metadata.keyHighlights[0])}
            </p>
          </div>

        </div>

      </div>

      {/* Course Structure & Progression Levels Section (3 Level Cards) */}
      <div className="space-y-6 pt-4">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>{dict.course.courseStructureLevels}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {dict.course.courseStructureSubtitle}
            </p>
          </div>
        </div>

        {/* 3 Level Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {levelKeys.map(lvlKey => {
            const lvl = course.levels[lvlKey];
            if (!lvl) return null;
            const unlocked = isLevelUnlocked(lvlKey);
            const lvlStats = stats.levels[lvlKey];

            return (
              <div
                key={lvlKey}
                id={`level-card-${lvlKey}`}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all shadow-md flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-lg ${
                      lvlKey === 'basic' 
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                        : lvlKey === 'intermediate'
                        ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                        : 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                    }`}>
                      {lvlKey === 'basic' ? dict.course.levelBeginnerTitle : lvlKey === 'intermediate' ? dict.course.levelIntermediateTitle : dict.course.levelAdvancedTitle}
                    </span>

                    {unlocked ? (
                      <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" title={dict.course.unlocked}>
                        <Unlock className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" title={dict.course.unlockRequirement}>
                        <Lock className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t(lvl.title)}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(lvl.description)}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {isLoggedIn ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <span>{lvlStats.progressPercent}% {dict.course.completed}</span>
                        <span>{lvlStats.completedCount}/{lvlStats.lessonsCount} {dict.course.lessonCount}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-emerald-400 transition-all duration-300"
                          style={{ width: `${lvlStats.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span>{lvl.modules.length} {dict.course.moduleCount}</span>
                      <span>{lvlStats.lessonsCount} {dict.course.lessonCount}</span>
                    </div>
                  )}

                  {/* Dedicated Action CTA for each level */}
                  <button
                    id={`open-level-btn-${lvlKey}`}
                    onClick={() => setSelectedLevelId(lvlKey)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                      unlocked
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>
                      {unlocked 
                        ? (isLoggedIn && lvlStats.completedCount === lvlStats.lessonsCount && lvlStats.lessonsCount > 0 
                            ? dict.course.reviewLevelLessons 
                            : (isLoggedIn && lvlStats.completedCount > 0 ? dict.course.resumeLevelLessons : dict.course.exploreLevelLessons))
                        : `${dict.course.locked} (${dict.course.exploreLevelLessons})`
                      }
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
