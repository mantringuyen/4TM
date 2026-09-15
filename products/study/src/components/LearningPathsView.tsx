import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  ArrowRight, 
  Clock, 
  Award, 
  BookOpen, 
  Terminal, 
  Layers, 
  ChevronRight, 
  Sparkles,
  Play,
  Briefcase,
  GraduationCap,
  Code2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { UserProfile, CourseId, LevelId } from '../types';
import { learningPaths, LearningPath, LearningPathId, getLearningPathStats, isStepUnlocked } from '../data/learningPathsData';
import { CourseBrandIcon, getCourseTheme } from './CourseBrandIcon';
import { getCourseById, getLevelById, getFirstAvailableLesson } from '../data/coursesData';
import { isUserLoggedIn } from '../services/storageService';

interface LearningPathsViewProps {
  user: UserProfile;
  onNavigate: (view: string, payload?: any) => void;
  onSelectCourse?: (courseId: CourseId) => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({
  user,
  onNavigate,
  onSelectCourse,
}) => {
  const { t, dict, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<LearningPathId | 'all'>('all');
  const isLoggedIn = isUserLoggedIn(user);

  const filteredPaths = activeTab === 'all' 
    ? learningPaths 
    : learningPaths.filter(p => p.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="relative p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>{dict.nav.learningPath || 'Learning Path'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {language === 'vi' ? 'Lộ Trình Học Tập Định Hướng' : 'Curated Career Learning Paths'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {language === 'vi' 
              ? 'Khám phá các lộ trình được thiết kế bài bản theo thứ tự từ dễ đến nâng cao. Mỗi lộ trình liên kết chặt chẽ các khóa học, cấp độ và dự án thực chiến giúp bạn đạt được kỹ năng nghề nghiệp vững chắc.'
              : 'Follow structured sequential roadmaps connecting courses, progression levels, and hands-on capstone projects designed to take you from foundational concepts to job-ready engineering proficiency.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              {language === 'vi' ? '3 Lộ trình nghề nghiệp' : '3 Career Tracks'}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-500" />
              {language === 'vi' ? 'Tuần tự theo cấp độ (Cơ bản → Nâng cao)' : 'Sequential Level Progression'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {language === 'vi' ? 'Đồng bộ tiến độ tức thì' : 'Real-time Progress Tracking'}
            </span>
          </div>
        </div>
      </div>

      {/* Path Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          id="path-filter-all"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          {language === 'vi' ? 'Tất Cả Lộ Trình' : 'All Learning Paths'}
        </button>

        {learningPaths.map(path => (
          <button
            key={path.id}
            id={`path-filter-${path.id}`}
            onClick={() => setActiveTab(path.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === path.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {t(path.title)}
          </button>
        ))}
      </div>

      {/* Learning Paths List */}
      <div className="space-y-16">
        {filteredPaths.map(path => {
          const stats = getLearningPathStats(path, isLoggedIn ? user.lessonProgress : {});

          return (
            <div 
              key={path.id}
              id={`path-section-${path.id}`}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-lg space-y-8"
            >
              {/* Path Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                      {t(path.badge)}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                      <span>{t(path.targetRole)}</span>
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <Clock className="w-3.5 h-3.5 text-teal-500" />
                      <span>~{path.estimatedHours} {dict.course.hoursTotal}</span>
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {t(path.title)}
                  </h2>

                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {t(path.subtitle)}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(path.description)}
                  </p>
                </div>

                {/* Progress Summary Card */}
                {isLoggedIn ? (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 lg:min-w-[280px] flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                        <span className="text-slate-500 dark:text-slate-400">
                          {language === 'vi' ? 'Tiến độ lộ trình' : 'Track Progress'}
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {stats.progressPercent}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-emerald-400 transition-all duration-500"
                          style={{ width: `${stats.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <span>{stats.completedSteps}/{stats.totalSteps} {language === 'vi' ? 'giai đoạn hoàn tất' : 'steps completed'}</span>
                      <span>{stats.completedLessons}/{stats.totalLessons} {dict.course.lessonCount}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 lg:min-w-[280px] flex flex-col justify-between space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {language === 'vi' ? 'Quy mô lộ trình' : 'Track Scope'}
                    </span>
                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      <div>{stats.totalSteps} {language === 'vi' ? 'giai đoạn học tập' : 'learning stages'}</div>
                      <div>{stats.totalLessons} {dict.course.totalLessonsLabel} • ~{path.estimatedHours} {dict.course.hoursTotal}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step by Step Sequence */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    <span>{language === 'vi' ? 'Thứ tự các khóa học & cấp độ' : 'Recommended Course & Level Order'}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {path.steps.length} {language === 'vi' ? 'Bước' : 'Steps'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {path.steps.map((step, idx) => {
                    const course = getCourseById(step.courseId);
                    const level = getLevelById(step.courseId, step.levelId);
                    if (!course || !level) return null;

                    const unlocked = isStepUnlocked(path, idx, isLoggedIn ? user.lessonProgress : {}, user.role);
                    const theme = getCourseTheme(step.courseId);
                    
                    // Calculate step progress
                    let stepLessons = 0;
                    let stepCompleted = 0;
                    level.modules.forEach(m => {
                      m.lessons.forEach(l => {
                        stepLessons++;
                        if (isLoggedIn && user.lessonProgress[l.id]?.isCompleted) {
                          stepCompleted++;
                        }
                      });
                    });
                    const stepPercent = isLoggedIn && stepLessons > 0 ? Math.round((stepCompleted / stepLessons) * 100) : 0;
                    const isCompleted = isLoggedIn && stepLessons > 0 && stepCompleted === stepLessons;
                    const isInProgress = isLoggedIn && stepCompleted > 0 && !isCompleted;

                    return (
                      <div
                        key={`${step.courseId}-${step.levelId}-${idx}`}
                        id={`path-step-${path.id}-${idx + 1}`}
                        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                          !unlocked
                            ? 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/80 dark:border-slate-800/60 opacity-85'
                            : isCompleted
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-500/30 shadow-sm'
                            : isInProgress
                            ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-500/40 shadow-md ring-1 ring-blue-500/20'
                            : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          
                          {/* Left: Step number, Course Icon, Title, Description, Skills */}
                          <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                            
                            {/* Step Number Badge */}
                            <div className="flex flex-col items-center shrink-0">
                              <span className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs flex items-center justify-center">
                                0{step.stepNumber}
                              </span>
                              <div className="mt-2">
                                <CourseBrandIcon courseId={step.courseId} size="sm" />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${theme.badgeBg}`}>
                                  {step.courseId.toUpperCase()}
                                </span>
                                
                                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md ${
                                  step.levelId === 'basic'
                                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                    : step.levelId === 'intermediate'
                                    ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                                    : 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                                }`}>
                                  {step.levelId === 'basic' ? dict.course.levelBeginnerTitle : step.levelId === 'intermediate' ? dict.course.levelIntermediateTitle : dict.course.levelAdvancedTitle}
                                </span>

                                {isCompleted ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>{dict.course.completed}</span>
                                  </span>
                                ) : isInProgress ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                                    <BookOpen className="w-3 h-3" />
                                    <span>{dict.course.inProgress} ({stepPercent}%)</span>
                                  </span>
                                ) : !unlocked ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                    <Lock className="w-3 h-3" />
                                    <span>{dict.course.locked}</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                                    <Unlock className="w-3 h-3" />
                                    <span>{dict.course.unlocked}</span>
                                  </span>
                                )}
                              </div>

                              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                {t(step.title)}
                              </h4>

                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {t(step.description)}
                              </p>

                              {/* Skills chips */}
                              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                {(step.keySkills[language] || step.keySkills.en).map((skill, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right: Action Buttons and Mini Progress */}
                          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                            {isLoggedIn && (
                              <div className="text-right font-mono text-xs text-slate-500 dark:text-slate-400">
                                <span>{stepCompleted}/{stepLessons} {dict.course.lessonCount}</span>
                                <span className="mx-1.5">•</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">{stepPercent}%</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                              <button
                                onClick={() => onNavigate('course-detail', { courseId: step.courseId, levelId: step.levelId })}
                                className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer active:scale-95"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{dict.course.viewCourse}</span>
                              </button>

                              <button
                                disabled={!unlocked}
                                onClick={() => {
                                  const first = getFirstAvailableLesson(step.courseId, isLoggedIn ? user.lessonProgress : {});
                                  if (first.lessonId && first.levelId === step.levelId) {
                                    onNavigate('lesson', { courseId: step.courseId, levelId: step.levelId, lessonId: first.lessonId });
                                  } else {
                                    onNavigate('course-detail', { courseId: step.courseId, levelId: step.levelId });
                                  }
                                }}
                                className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
                                  !unlocked
                                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                                    : isCompleted
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
                                }`}
                              >
                                <span>
                                  {isCompleted
                                    ? (language === 'vi' ? 'Ôn Tập Cấp Độ' : 'Review Level')
                                    : isInProgress
                                    ? (language === 'vi' ? 'Học Tiếp' : 'Continue')
                                    : (language === 'vi' ? 'Bắt Đầu Cấp Độ' : 'Start Level')}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
