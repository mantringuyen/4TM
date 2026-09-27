import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  Award, 
  FolderKanban, 
  CheckCircle2, 
  Bookmark, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  Terminal, 
  HelpCircle,
  Lightbulb,
  AlertCircle,
  Clock,
  Layers,
  Save,
  Lock
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CourseId, LevelId, Lesson, Course, Module, UserProfile } from '../types';
import { getLessonById, getLevelById, getNextLessonInfo } from '../data/coursesData';
import { loadLessonDetails } from '../services/curriculumLoader';
import { CodeEditor } from './CodeEditor';
import { ExercisesView } from './ExercisesView';
import { ChallengeView } from './ChallengeView';
import { QuizView } from './QuizView';
import { ProjectView } from './ProjectView';
import { PowerBiWorkspace } from './PowerBiWorkspace';
import { LearnPracticeRunner } from './LearnPracticeRunner';
import { CourseBrandIcon, getCourseTheme } from './CourseBrandIcon';

interface LessonViewProps {
  courseId: CourseId;
  levelId: LevelId;
  lessonId: string;
  initialStage?: 'learn' | 'exercises' | 'challenge' | 'quiz' | 'project';
  user: UserProfile;
  onNavigate: (view: string, payload?: any) => void;
  onUpdateProgress: (lessonId: string, stage: 'learn' | 'exercises' | 'challenge' | 'quiz' | 'project', payload?: any) => void;
  onToggleBookmark: (lessonId: string, title: string, courseId: CourseId, levelId: LevelId) => void;
  onSaveNote: (lessonId: string, noteContent: string) => void;
  onContentReadyChange?: (ready: boolean) => void;
  onErrorChange?: (hasError: boolean) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  courseId,
  levelId,
  lessonId,
  initialStage,
  user,
  onNavigate,
  onUpdateProgress,
  onToggleBookmark,
  onSaveNote,
  onContentReadyChange,
  onErrorChange,
}) => {
  const { t, dict, language } = useLanguage();
  const { lesson: initialLessonStub, module, course } = getLessonById(courseId, levelId, lessonId);
  const currentLevel = getLevelById(courseId, levelId);
  const theme = getCourseTheme(courseId);

  const [fullLesson, setFullLesson] = useState<Lesson | null>(() => {
    return initialLessonStub && initialLessonStub.learn ? initialLessonStub : null;
  });
  const [isLoadingLesson, setIsLoadingLesson] = useState<boolean>(!fullLesson);
  const [lessonLoadError, setLessonLoadError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLessonLoadError(false);
    if (!fullLesson || fullLesson.id !== lessonId) {
      setIsLoadingLesson(true);
      loadLessonDetails(courseId, levelId, lessonId)
        .then(loaded => {
          if (isMounted) {
            if (loaded) {
              setFullLesson(loaded);
              setLessonLoadError(false);
            } else if (!initialLessonStub?.learn) {
              setLessonLoadError(true);
            }
            setIsLoadingLesson(false);
          }
        })
        .catch(err => {
          console.error("Failed to load lesson:", err);
          if (isMounted) {
            setLessonLoadError(true);
            setIsLoadingLesson(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [courseId, levelId, lessonId]);

  const lesson = fullLesson || initialLessonStub;
  const isLessonNotFound = !lesson || !course || !currentLevel;
  const isLessonContentReady = Boolean(!isLoadingLesson && !lessonLoadError && !isLessonNotFound && lesson?.learn);

  useEffect(() => {
    onContentReadyChange?.(isLessonContentReady);
    onErrorChange?.(lessonLoadError || isLessonNotFound);
    return () => {
      onContentReadyChange?.(false);
      onErrorChange?.(false);
    };
  }, [isLessonContentReady, lessonLoadError, isLessonNotFound, onContentReadyChange, onErrorChange]);

  // Compute latest incomplete stage for resuming
  const computeResumeStage = (targetLessonId: string): 'learn' | 'exercises' | 'challenge' | 'quiz' | 'project' => {
    const prog = user.lessonProgress[targetLessonId];
    if (!prog || !prog.learnCompleted) return 'learn';
    if (!prog.exercisesCompleted) return 'exercises';
    if (!prog.challengeCompleted) return 'challenge';
    if (!prog.quizPassed) return 'quiz';
    const { lesson: targetLesson } = getLessonById(courseId, levelId, targetLessonId);
    if (targetLesson?.project && !prog.projectCompleted) return 'project';
    return 'learn';
  };

  const [activeStage, setActiveStage] = useState<'learn' | 'exercises' | 'challenge' | 'quiz' | 'project'>(() => {
    if (initialStage) return initialStage;
    return computeResumeStage(lessonId);
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notesDrawerOpen, setNotesDrawerOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  // Load existing note
  useEffect(() => {
    const existingNote = user.notes.find(n => n.lessonId === lessonId);
    setNoteContent(existingNote ? existingNote.content : '');
  }, [lessonId, user.notes]);

  // Resume from latest incomplete stage when lessonId or initialStage changes
  useEffect(() => {
    if (initialStage) {
      setActiveStage(initialStage);
    } else {
      setActiveStage(computeResumeStage(lessonId));
    }
  }, [lessonId, initialStage]);

  if (!lesson || !course || !currentLevel) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center text-slate-500 dark:text-slate-400">
        <p>Lesson not found.</p>
        <button
          onClick={() => onNavigate('courses')}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
        >
          Return to Courses
        </button>
      </div>
    );
  }

  const isBookmarked = user.bookmarks.some(b => b.lessonId === lessonId);
  const lessonProgress = user.lessonProgress[lessonId] || {
    learnCompleted: false,
    exercisesCompleted: false,
    challengeCompleted: false,
    quizPassed: false,
    bestQuizScore: 0,
    projectCompleted: false,
    isCompleted: false,
  };

  const nextInfo = getNextLessonInfo(courseId, levelId, lessonId);

  const handleProceedToNextLesson = () => {
    if (nextInfo.hasNextLesson && nextInfo.nextCourseId && nextInfo.nextLevelId && nextInfo.nextLessonId) {
      onNavigate('lesson', {
        courseId: nextInfo.nextCourseId,
        levelId: nextInfo.nextLevelId,
        lessonId: nextInfo.nextLessonId,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('course-detail', { courseId, levelId });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveCurrentNote = () => {
    onSaveNote(lessonId, noteContent);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2000);
  };

  // Stage unlocking helpers
  const isLearnUnlocked = true;
  const isExercisesUnlocked = !!lessonProgress.learnCompleted;
  const isChallengeUnlocked = !!lessonProgress.exercisesCompleted;
  const isQuizUnlocked = !!lessonProgress.challengeCompleted;
  const isProjectUnlocked = !!lessonProgress.quizPassed;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Left Curriculum Sidebar (Collapsible) */}
      <aside className={`border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 backdrop-blur-sm transition-all flex flex-col shrink-0 ${
        sidebarOpen ? 'w-full lg:w-80' : 'w-full lg:w-16'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="min-w-0">
              <button
                onClick={() => onNavigate('course-detail', { courseId, levelId })}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 flex items-center gap-1.5 font-semibold mb-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <CourseBrandIcon courseId={course.id} size="sm" />
                <span>{t(course.title)}</span>
              </button>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{t(currentLevel.title)}</h3>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <CourseBrandIcon courseId={course.id} size="sm" />
            </div>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hidden lg:block cursor-pointer"
            title="Toggle Sidebar"
          >
            {sidebarOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Modules & Lessons Tree */}
        {sidebarOpen && (
          <div className="flex-1 overflow-y-auto p-3 space-y-4 max-h-[calc(100vh-130px)]">
            {currentLevel.modules.map(mod => (
              <div key={mod.id} className="space-y-1.5">
                <div className="px-2 py-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>{t(mod.title)}</span>
                </div>

                <div className="space-y-1">
                  {mod.lessons.map(l => {
                    const active = l.id === lessonId;
                    const prog = user.lessonProgress[l.id];
                    const isDone = prog?.isCompleted;

                    return (
                      <button
                        key={l.id}
                        id={`sidebar-lesson-${l.id}`}
                        onClick={() => onNavigate('lesson', { courseId, levelId, lessonId: l.id })}
                        className={`w-full p-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                          active
                            ? 'bg-blue-50 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/40 text-blue-700 dark:text-white font-semibold shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <div className={`w-2 h-2 rounded-full shrink-0 ${active ? 'bg-blue-500' : 'bg-slate-400 dark:bg-slate-600'}`} />
                          )}
                          <span className="truncate">{t(l.title)}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          {l.estimatedMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Lesson Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Sticky Lesson Bar */}
        <div className="sticky top-0 z-20 px-6 py-3.5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${theme.badgeBg}`}>
                {lesson.topicId}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {lesson.estimatedMinutes} min
              </span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{t(lesson.title)}</h1>
          </div>

          {/* Quick Tools: Bookmark & Notes Drawer Toggle */}
          <div className="flex items-center gap-2">
            <button
              id="lesson-bookmark-btn"
              onClick={() => onToggleBookmark(lessonId, t(lesson.title), courseId, levelId)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Bookmark Lesson"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? dict.lesson.bookmarked : dict.lesson.bookmarkLesson}</span>
            </button>

            <button
              id="lesson-notes-btn"
              onClick={() => setNotesDrawerOpen(!notesDrawerOpen)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                notesDrawerOpen
                  ? 'bg-blue-50 dark:bg-blue-600/20 border-blue-300 dark:border-blue-500/40 text-blue-700 dark:text-blue-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Personal Lesson Notes"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{dict.nav.notes}</span>
            </button>
          </div>
        </div>

        {/* Notes Inline Flyout (If Open) */}
        {notesDrawerOpen && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-3 animate-in slide-in-from-top-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                {dict.nav.notes} for "{t(lesson.title)}"
              </span>
              <div className="flex items-center gap-2">
                {noteSavedFeedback && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {dict.lesson.noteSaved}
                  </span>
                )}
                <button
                  onClick={handleSaveCurrentNote}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{dict.lesson.addNote}</span>
                </button>
              </div>
            </div>
            <textarea
              value={noteContent}
              onChange={e => setNoteContent(e.target.value)}
              placeholder={dict.lesson.yourNotePlaceholder}
              rows={3}
              className="w-full p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
            />
          </div>
        )}

        {/* 5-Stage Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2 overflow-x-auto">
          
          {/* Stage 1: Learn */}
          <button
            id="stage-tab-learn"
            onClick={() => setActiveStage('learn')}
            className={`py-3 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 cursor-pointer ${
              activeStage === 'learn'
                ? 'border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-extrabold'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{dict.lesson.stages.learn}</span>
            {lessonProgress.learnCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />}
          </button>

          {/* Stage 2: Exercises */}
          <button
            id="stage-tab-exercises"
            onClick={() => {
              if (isExercisesUnlocked) {
                setActiveStage('exercises');
              }
            }}
            disabled={!isExercisesUnlocked}
            title={!isExercisesUnlocked ? dict.lesson.unlockRequirementExercise : ''}
            className={`py-3 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              !isExercisesUnlocked
                ? 'opacity-50 cursor-not-allowed border-transparent text-slate-400 dark:text-slate-600'
                : activeStage === 'exercises'
                ? 'border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-extrabold cursor-pointer'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>{dict.lesson.stages.exercises}</span>
            {lessonProgress.exercisesCompleted ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            ) : !isExercisesUnlocked ? (
              <Lock className="w-3 h-3 text-slate-400" />
            ) : null}
          </button>

          {/* Stage 3: Challenge */}
          <button
            id="stage-tab-challenge"
            onClick={() => {
              if (isChallengeUnlocked) {
                setActiveStage('challenge');
              }
            }}
            disabled={!isChallengeUnlocked}
            title={!isChallengeUnlocked ? dict.lesson.unlockRequirementChallenge : ''}
            className={`py-3 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              !isChallengeUnlocked
                ? 'opacity-50 cursor-not-allowed border-transparent text-slate-400 dark:text-slate-600'
                : activeStage === 'challenge'
                ? 'border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-extrabold cursor-pointer'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>{dict.lesson.stages.challenge}</span>
            {lessonProgress.challengeCompleted ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            ) : !isChallengeUnlocked ? (
              <Lock className="w-3 h-3 text-slate-400" />
            ) : null}
          </button>

          {/* Stage 4: Quiz */}
          <button
            id="stage-tab-quiz"
            onClick={() => {
              if (isQuizUnlocked) {
                setActiveStage('quiz');
              }
            }}
            disabled={!isQuizUnlocked}
            title={!isQuizUnlocked ? dict.lesson.unlockRequirementQuiz : ''}
            className={`py-3 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              !isQuizUnlocked
                ? 'opacity-50 cursor-not-allowed border-transparent text-slate-400 dark:text-slate-600'
                : activeStage === 'quiz'
                ? 'border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-extrabold cursor-pointer'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{dict.lesson.stages.quiz}</span>
            {lessonProgress.quizPassed ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            ) : !isQuizUnlocked ? (
              <Lock className="w-3 h-3 text-slate-400" />
            ) : null}
          </button>

          {/* Stage 5: Project (If Available) */}
          {lesson.project && (
            <button
              id="stage-tab-project"
              onClick={() => {
                if (isProjectUnlocked) {
                  setActiveStage('project');
                }
              }}
              disabled={!isProjectUnlocked}
              title={!isProjectUnlocked ? dict.lesson.unlockRequirementProject : ''}
              className={`py-3 px-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                !isProjectUnlocked
                  ? 'opacity-50 cursor-not-allowed border-transparent text-slate-400 dark:text-slate-600'
                  : activeStage === 'project'
                  ? 'border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-extrabold cursor-pointer'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>{dict.lesson.stages.project}</span>
              {lessonProgress.projectCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              ) : !isProjectUnlocked ? (
                <Lock className="w-3 h-3 text-slate-400" />
              ) : null}
            </button>
          )}

        </div>

        {/* Stage Content Render */}
        <div className="p-6 max-w-5xl w-full mx-auto space-y-8 flex-1">
          {isLoadingLesson || !lesson.learn ? (
            <div className="p-12 flex flex-col items-center justify-center min-h-[360px] bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {language === 'vi' ? 'Đang nạp dữ liệu bài học...' : 'Loading lesson curriculum...'}
              </p>
              <p className="text-xs text-slate-500 font-mono">{t(lesson.title)}</p>
            </div>
          ) : (
            <>
              {/* ===================== STAGE 1: LEARN ===================== */}
          {activeStage === 'learn' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Introduction Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {dict.lesson.keyConcepts}
                </h3>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  {t(lesson.learn.introduction)}
                </p>
                <div className="pt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t(lesson.learn.conceptExplanation)}
                </div>
              </div>

              {/* Syntax Reference Box */}
              {lesson.learn.syntax && (
                <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 font-bold">
                    {dict.lesson.syntaxHeading}
                  </h4>
                  <pre className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-amber-700 dark:text-amber-300 overflow-x-auto whitespace-pre-wrap">
                    {lesson.learn.syntax}
                  </pre>
                </div>
              )}

              {/* Interactive Code Examples (Read-only Demos) */}
              {lesson.learn.examples.map((ex, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {dict.lesson.exampleBadge || 'Example'}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        {t(ex.title)}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {dict.lesson.exampleRunnerLabel || 'Example — Run to see the result'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t(ex.explanation)}
                  </p>

                  <CodeEditor
                    initialCode={ex.code}
                    language={ex.language || courseId}
                    readOnly={true}
                    mode="learn"
                  />
                </div>
              ))}

              {/* Common Mistakes & Pro Tips */}
              {(lesson.learn.commonMistakes || lesson.learn.tips) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lesson.learn.commonMistakes && (
                    <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase">
                        <AlertCircle className="w-4 h-4" />
                        <span>{dict.lesson.commonMistakes}</span>
                      </div>
                      <ul className="text-xs text-rose-900 dark:text-rose-200/90 space-y-1.5 list-disc list-inside leading-relaxed">
                        {lesson.learn.commonMistakes.map((m, i) => (
                          <li key={i}>
                            <strong className="text-rose-700 dark:text-rose-300">{t(m.mistake)}:</strong> {t(m.correction)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lesson.learn.tips && (
                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase">
                        <Lightbulb className="w-4 h-4" />
                        <span>{dict.lesson.proTips}</span>
                      </div>
                      <ul className="text-xs text-emerald-900 dark:text-emerald-200/90 space-y-1.5 list-disc list-inside leading-relaxed">
                        {lesson.learn.tips.map((tip, i) => (
                          <li key={i}>{t(tip)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Editable Error-Fixing Practice Runner */}
              <LearnPracticeRunner
                lesson={lesson}
                courseId={courseId}
                isCompleted={Boolean(lessonProgress.learnCompleted)}
                onComplete={() => onUpdateProgress(lessonId, 'learn')}
                onContinueToExercises={() => {
                  onUpdateProgress(lessonId, 'learn');
                  setActiveStage('exercises');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Sequential Stage Navigation Bar: Learn -> Exercise */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {lessonProgress.learnCompleted ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      {dict.lesson.lessonCompleted}
                    </span>
                  ) : (
                    <span>{dict.lesson.unlockRequirementExercise}</span>
                  )}
                </div>

                <button
                  id="learn-continue-to-exercise-btn"
                  onClick={() => {
                    onUpdateProgress(lessonId, 'learn');
                    setActiveStage('exercises');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{dict.lesson.learnCompletionBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ===================== STAGE 2: EXERCISES ===================== */}
          {activeStage === 'exercises' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <ExercisesView
                exercises={lesson.exercisePool}
                lessonId={lesson.id}
                language={courseId}
                isCompleted={lessonProgress.exercisesCompleted}
                onCompleteAll={() => onUpdateProgress(lessonId, 'exercises')}
              />

              {/* Sequential Stage Navigation Bar: Exercises -> Challenge */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {lessonProgress.exercisesCompleted ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      {dict.lesson.exercisesCompletedBanner || 'All exercises passed! Proceed to independent challenge.'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      {dict.lesson.unlockRequirementChallenge}
                    </span>
                  )}
                </div>

                <button
                  id="proceed-to-challenge-btn"
                  onClick={() => {
                    if (lessonProgress.exercisesCompleted) {
                      setActiveStage('challenge');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={!lessonProgress.exercisesCompleted}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                    lessonProgress.exercisesCompleted
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 cursor-pointer active:scale-95'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                  }`}
                >
                  {!lessonProgress.exercisesCompleted && <Lock className="w-3.5 h-3.5" />}
                  <span>{dict.lesson.nextChallenge}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ===================== STAGE 3: CHALLENGE ===================== */}
          {activeStage === 'challenge' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <ChallengeView
                challenge={lesson.challenge}
                challengePool={lesson.challengePool}
                lessonId={lesson.id}
                language={courseId}
                isPassed={lessonProgress.challengeCompleted}
                onChallengePassed={() => onUpdateProgress(lessonId, 'challenge')}
              />

              {/* Sequential Stage Navigation Bar: Challenge -> Quiz */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {lessonProgress.challengeCompleted ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      {dict.lesson.challengeCompletedBanner || 'Challenge conquered! Prove your knowledge in the 10-question quiz.'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      {dict.lesson.unlockRequirementQuiz}
                    </span>
                  )}
                </div>

                <button
                  id="proceed-to-quiz-btn"
                  onClick={() => {
                    if (lessonProgress.challengeCompleted) {
                      setActiveStage('quiz');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={!lessonProgress.challengeCompleted}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                    lessonProgress.challengeCompleted
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 cursor-pointer active:scale-95'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                  }`}
                >
                  {!lessonProgress.challengeCompleted && <Lock className="w-3.5 h-3.5" />}
                  <span>{dict.lesson.nextQuiz}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ===================== STAGE 4: QUIZ ===================== */}
          {activeStage === 'quiz' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <QuizView
                questionPool={lesson.quizQuestionPool}
                lessonId={lesson.id}
                bestScore={lessonProgress.bestQuizScore}
                onQuizCompleted={(score, topicResults) => {
                  onUpdateProgress(lessonId, 'quiz', { score, topicResults });
                }}
              />

              {/* Sequential Stage Navigation Bar: Quiz -> Project or Next Lesson */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {lessonProgress.quizPassed ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      {dict.lesson.quizPassedBanner || 'Quiz passed'} ({lessonProgress.bestQuizScore || lessonProgress.quizScore}%)!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      {dict.lesson.unlockRequirementProject}
                    </span>
                  )}
                </div>

                {lesson.project ? (
                  <button
                    id="proceed-to-project-btn"
                    onClick={() => {
                      if (lessonProgress.quizPassed) {
                        setActiveStage('project');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={!lessonProgress.quizPassed}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                      lessonProgress.quizPassed
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20 cursor-pointer active:scale-95'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {!lessonProgress.quizPassed && <Lock className="w-3.5 h-3.5" />}
                    <span>{dict.lesson.nextProject}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    id="proceed-to-next-lesson-btn"
                    onClick={() => {
                      if (lessonProgress.quizPassed) {
                        handleProceedToNextLesson();
                      }
                    }}
                    disabled={!lessonProgress.quizPassed}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                      lessonProgress.quizPassed
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 cursor-pointer active:scale-95'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {!lessonProgress.quizPassed && <Lock className="w-3.5 h-3.5" />}
                    <span>{nextInfo.hasNextLesson ? dict.lesson.nextLesson : dict.lesson.completeCourse}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ===================== STAGE 5: PROJECT ===================== */}
          {activeStage === 'project' && lesson.project && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <ProjectView
                project={lesson.project}
                language={courseId}
                isCompleted={lessonProgress.projectCompleted}
                onProjectCompleted={() => onUpdateProgress(lessonId, 'project')}
              />

              {/* Sequential Stage Navigation Bar: Project -> Next Lesson */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {lessonProgress.projectCompleted ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      {dict.lesson.projectCompletedBanner || 'Capstone project complete! Ready for next lesson.'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      {dict.lesson.unlockRequirementProjectFinish || 'Complete the project to finish this lesson.'}
                    </span>
                  )}
                </div>

                <button
                  id="project-proceed-to-next-lesson-btn"
                  onClick={() => {
                    if (lessonProgress.projectCompleted) {
                      handleProceedToNextLesson();
                    }
                  }}
                  disabled={!lessonProgress.projectCompleted}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                    lessonProgress.projectCompleted
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 cursor-pointer active:scale-95'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                  }`}
                >
                  {!lessonProgress.projectCompleted && <Lock className="w-3.5 h-3.5" />}
                  <span>{nextInfo.hasNextLesson ? dict.lesson.nextLesson : dict.lesson.completeCourse}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          </>
          )}

        </div>

      </main>

    </div>
  );
};

