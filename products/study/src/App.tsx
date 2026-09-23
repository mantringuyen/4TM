import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { UserProfile, CourseId, LevelId, LessonProgress } from './types';
import { getStoredUser, saveUserToStorage, clearStoredUser, authService } from './services/authService';
import { saveLessonProgress, toggleBookmark, saveLessonNote, updateTopicMastery, isDemoUser, getDefaultUser, isUserLoggedIn } from './services/storageService';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';

// Code-split all heavy views with React.lazy for fast initial bundle and instant homepage loading
const CoursesList = lazy(() => import('./components/CoursesList').then(m => ({ default: m.CoursesList })));
const CourseDetail = lazy(() => import('./components/CourseDetail').then(m => ({ default: m.CourseDetail })));
const LessonView = lazy(() => import('./components/LessonView').then(m => ({ default: m.LessonView })));
const DashboardView = lazy(() => import('./components/DashboardView').then(m => ({ default: m.DashboardView })));
const PlaygroundView = lazy(() => import('./components/PlaygroundView').then(m => ({ default: m.PlaygroundView })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const FreeTierView = lazy(() => import('./components/FreeTierView').then(m => ({ default: m.FreeTierView })));
const LearningPathsView = lazy(() => import('./components/LearningPathsView').then(m => ({ default: m.LearningPathsView })));
const LearningProcessView = lazy(() => import('./components/LearningProcessView').then(m => ({ default: m.LearningProcessView })));
const MyCoursesView = lazy(() => import('./components/MyCoursesView').then(m => ({ default: m.MyCoursesView })));

import { GlobalSearch } from './components/GlobalSearch';
import { AuthModal, AuthModalMode } from './components/AuthModal';
import { AccountSettingsModal, AccountSettingsTab } from './components/AccountSettingsModal';
import { SecuritySettingsModal } from './components/SecuritySettingsModal';
import { ReviewModal } from './components/ReviewModal';
import { BookmarksModal, NotesModal } from './components/BookmarksAndNotesModals';
import { Terminal, ShieldCheck, Heart, Sparkles, Globe, Clock } from 'lucide-react';
import { supabase, isSupabaseConfigured } from './services/supabase';
import {
  BrandLogo,
  BRAND_CONFIG,
  processSsoCallback,
  issuePeerRootHandoff,
  AdSlot,
  useSEO,
  SchemaGenerators,
} from '@shared';

const STUDY_COURSES_SEO: Record<CourseId, { en: string; vi: string; descEn: string; descVi: string }> = {
  python: {
    en: 'Python Programming Course — From Core Syntax to OOP Engineering',
    vi: 'Khóa học Lập trình Python — Từ Cú pháp Cơ bản đến OOP Nâng cao',
    descEn: 'Master Python 3 fundamentals, dynamic typing, data structures, object-oriented programming, and error handling with browser code execution.',
    descVi: 'Làm chủ Python 3 từ biến số, kiểu dữ liệu, hàm, cấu trúc dữ liệu List/Dict đến lập trình hướng đối tượng với trình chạy code trực tiếp.',
  },
  javascript: {
    en: 'Modern JavaScript (ES6+) Course — Web Runtimes & Async Programming',
    vi: 'Khóa học Lập trình JavaScript Hiện Đại (ES6+) — Web Runtimes & Bất đồng bộ',
    descEn: 'Learn modern JavaScript ES6+, DOM manipulation, closures, promises, async/await, and browser runtime execution.',
    descVi: 'Học JavaScript hiện đại từ ES6+, thao tác DOM, bao đóng (closures), Promise, async/await và kiến trúc runtime trình duyệt.',
  },
  html: {
    en: 'Semantic HTML5 Course — Accessible Web Architecture & SEO',
    vi: 'Khóa học HTML5 Ngữ Nghĩa — Kiến trúc Web Chuẩn Accessibility & SEO',
    descEn: 'Build semantic, accessible, SEO-optimized HTML5 document structures, forms, audio/video media, and web components.',
    descVi: 'Xây dựng cấu trúc tài liệu HTML5 chuẩn ngữ nghĩa, biểu mẫu form nâng cao, đa phương tiện và khả năng tiếp cận (Accessibility).',
  },
  css: {
    en: 'Modern CSS3 & Responsive Design Course — Flexbox, Grid & Animations',
    vi: 'Khóa học CSS3 & Thiết Kế Đáp Ứng — Flexbox, CSS Grid & Animation',
    descEn: 'Master modern CSS styling, Flexbox layouts, CSS Grid systems, custom properties, responsive breakpoints, and keyframe animations.',
    descVi: 'Làm chủ tạo kiểu CSS hiện đại, bố cục Flexbox, CSS Grid, biến CSS tùy chỉnh, media queries và hoạt ảnh mượt mà.',
  },
  sql: {
    en: 'SQL & Relational Database Engineering Course — Queries, Joins & Indexing',
    vi: 'Khóa học SQL & Cơ Sở Dữ Liệu Quan Hệ — Truy vấn, Phép Join & Đánh chỉ mục',
    descEn: 'Master relational databases, SQL queries, complex multi-table JOINs, GROUP BY aggregations, window functions, and indexing strategies.',
    descVi: 'Làm chủ cơ sở dữ liệu quan hệ, câu lệnh truy vấn SQL, phép nối JOIN phức tạp, hàm tổng hợp và tối ưu hóa chỉ mục Index.',
  },
  excel: {
    en: 'Advanced Excel & Data Modeling Course — Formulas, XLOOKUP & Analytics',
    vi: 'Khóa học Excel Nâng Cao & Mô Hình Dữ Liệu — Công thức, XLOOKUP & Phân tích',
    descEn: 'Master business Excel formulas, dynamic arrays, XLOOKUP, INDEX/MATCH, PivotTables, and analytical financial modeling.',
    descVi: 'Làm chủ công thức phân tích kinh doanh Excel, mảng động (Dynamic Arrays), XLOOKUP, PivotTable và mô hình hóa dữ liệu.',
  },
  powerbi: {
    en: 'Power BI & DAX Analytics Course — Data Modeling & Interactive Dashboards',
    vi: 'Khóa học Power BI & DAX — Mô hình hóa Dữ liệu & Thiết kế Dashboard',
    descEn: 'Build production Power BI dashboards, star-schema data models, Power Query M ETL transformations, and time-intelligence DAX measures.',
    descVi: 'Thiết kế dashboard báo cáo Power BI chuyên nghiệp, mô hình sao (Star Schema), xử lý ETL Power Query và công thức DAX thời gian.',
  },
  ai: {
    en: 'AI Engineering & LLM Architecture Course — Prompts, RAG & Agents',
    vi: 'Khóa học Kỹ Thuật AI & Kiến Trúc LLM — Kỹ nghệ Prompt, RAG & AI Agent',
    descEn: 'Master Large Language Models, prompt engineering architectures, Retrieval-Augmented Generation (RAG), vector embeddings, and autonomous agents.',
    descVi: 'Làm chủ mô hình ngôn ngữ lớn LLM, kỹ nghệ Prompt, mô hình truy xuất tăng cường RAG, vector embeddings và tác tử AI tự trị.',
  },
};

function AppContent() {
  const { language, setLanguage, dict } = useLanguage();

  // User & State Management (Supabase session is the single source of truth)
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>(() => getDefaultUser());
  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\//, '');
      if (path === 'my-courses') return 'my-courses';
      if (path === 'learning-paths' || path === 'learning-path') return 'learning-paths';
      if (path === 'learning-process') return 'learning-process';
      if (path === 'dashboard') return 'dashboard';
      if (path === 'playground') return 'playground';
      if (path === 'courses') return 'courses';
    }
    return 'home';
  });
  const [viewPayload, setViewPayload] = useState<{
    courseId?: CourseId;
    levelId?: LevelId;
    lessonId?: string;
  }>({});

  // Dynamic SEO Synchronization
  const currentCourseInfo = viewPayload.courseId ? STUDY_COURSES_SEO[viewPayload.courseId] : null;
  const isCourseView = (currentView === 'course-detail' || currentView === 'lesson') && !!currentCourseInfo;
  
  const pageTitle = isCourseView && currentCourseInfo
    ? `${currentCourseInfo[language]} | 4TM Study`
    : currentView === 'learning-paths'
    ? language === 'vi' ? 'Lộ trình học Lập trình & Kỹ thuật phần mềm | 4TM Study' : 'Software Engineering Learning Paths | 4TM Study'
    : currentView === 'learning-process'
    ? language === 'vi' ? 'Quy trình & Phương pháp Học thực chiến | 4TM Study' : 'Mastery Learning Methodology | 4TM Study'
    : currentView === 'playground'
    ? language === 'vi' ? 'Trình chạy Code trực tiếp & Thử nghiệm | 4TM Study' : 'Interactive Code Playground | 4TM Study'
    : currentView === 'courses'
    ? language === 'vi' ? 'Danh mục Khóa học Lập trình & Phân tích Dữ liệu | 4TM Study' : 'Engineering & Data Courses Catalog | 4TM Study'
    : language === 'vi'
    ? '4TM Study — Nền tảng Học Lập trình Tương tác & Khóa học Kỹ thuật'
    : '4TM Study — Interactive Programming LMS & Engineering Courses';

  const pageDescription = isCourseView && currentCourseInfo
    ? language === 'vi' ? currentCourseInfo.descVi : currentCourseInfo.descEn
    : language === 'vi'
    ? 'Nền tảng học lập trình tương tác với trình chạy code trực tiếp trên trình duyệt, lộ trình bài bản Python, JavaScript, HTML, CSS, SQL, Excel, Power BI, AI và hệ thống bài tập thực chiến.'
    : 'Autonomous full-stack learning platform with client-side code execution, structured courses across Python, JavaScript, HTML, CSS, SQL, Excel, Power BI, and AI with bilingual EN/VI support.';

  const canonicalUrl = isCourseView && viewPayload.courseId
    ? `https://study.4tm.io.vn/course/${viewPayload.courseId}`
    : currentView === 'learning-paths'
    ? 'https://study.4tm.io.vn/learning-path'
    : currentView === 'learning-process'
    ? 'https://study.4tm.io.vn/process'
    : 'https://study.4tm.io.vn/';

  useSEO({
    title: pageTitle,
    description: pageDescription,
    canonicalUrl,
    language,
    jsonLd: isCourseView && viewPayload.courseId && currentCourseInfo
      ? [
          SchemaGenerators.course({
            id: viewPayload.courseId,
            name: currentCourseInfo[language],
            description: language === 'vi' ? currentCourseInfo.descVi : currentCourseInfo.descEn,
            provider: '4TM Study',
            url: `https://study.4tm.io.vn/course/${viewPayload.courseId}`,
          }),
          SchemaGenerators.website('https://study.4tm.io.vn', '4TM Study', pageDescription),
        ]
      : [
          SchemaGenerators.website('https://study.4tm.io.vn', '4TM Study', pageDescription),
        ],
  });
  const [authModalInitialMode, setAuthModalInitialMode] = useState<AuthModalMode>('signin');
  const [authModalInitialError, setAuthModalInitialError] = useState<string>('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [accountSettingsModalOpen, setAccountSettingsModalOpen] = useState(false);
  const [accountSettingsInitialTab, setAccountSettingsInitialTab] = useState<AccountSettingsTab>('profile');

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        if (typeof window !== 'undefined') {
          const pathname = window.location.pathname;
          const hash = window.location.hash || '';
          const search = window.location.search || '';

          // A. Handle incoming SP-initiated Root handoff request: /sso/handoff?state=...
          if (pathname.startsWith('/sso/handoff') || search.includes('state=')) {
            const searchParams = new URLSearchParams(search.startsWith('?') ? search.substring(1) : search);
            const stateFromRoot = searchParams.get('state');

            if (stateFromRoot) {
              const { data: { session } } = supabase ? await supabase.auth.getSession() : { data: { session: null } };
              if (!session) {
                // If user is not yet logged into Study, prompt Study login modal and preserve state
                setAuthModalInitialMode('signin');
                setAuthModalInitialError('');
                setAuthModalOpen(true);
              } else {
                // User is authenticated on Study: issue Root handoff ticket with the Root-provided state
                const handoffRes = await issuePeerRootHandoff({
                  supabaseClient: supabase,
                  state: stateFromRoot,
                });
                if (handoffRes.success && handoffRes.redirectUrl) {
                  window.location.replace(handoffRes.redirectUrl);
                  return;
                }
              }
            }
          }

          // B. Handle incoming SSO callback from Root (Root -> Study)
          if (hash.includes('ticket=') || search.includes('ticket=')) {
            const callbackRes = await processSsoCallback({
              supabaseClient: supabase,
            });
            if (callbackRes.success && callbackRes.user) {
              const synced = await authService.initializeAuthSession();
              if (isMounted && synced && isUserLoggedIn(synced)) {
                setUser(synced);
                if (synced.preferredLanguage && synced.preferredLanguage !== language) {
                  setLanguage(synced.preferredLanguage);
                }
                return;
              }
            }
          }
        }

        // Supabase session is the single source of truth
        const synced = await authService.initializeAuthSession();
        if (!isMounted) return;
        if (synced && isUserLoggedIn(synced)) {
          setUser(synced);
          if (synced.preferredLanguage && synced.preferredLanguage !== language) {
            setLanguage(synced.preferredLanguage);
          }
        } else {
          setUser(getDefaultUser());
        }
      } catch (err) {
        console.error('Failed to initialize auth session:', err);
        if (isMounted) setUser(getDefaultUser());
      } finally {
        if (isMounted) setAuthLoading(false);
      }
    };

    initAuth();

    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '');
      if (path === 'my-courses') setCurrentView('my-courses');
      else if (path === 'learning-paths' || path === 'learning-path') setCurrentView('learning-paths');
      else if (path === 'learning-process') setCurrentView('learning-process');
      else if (path === 'dashboard') setCurrentView('dashboard');
      else if (path === 'playground') setCurrentView('playground');
      else if (path === 'courses') setCurrentView('courses');
      else if (!path) setCurrentView('home');
    };

    window.addEventListener('popstate', handlePopState);

    // Listen for Supabase password recovery event and detect recovery URL parameters
    let authUnsubscribe: (() => void) | undefined;
    if (isSupabaseConfigured && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          if (isMounted) setUser(getDefaultUser());
        } else if (event === 'PASSWORD_RECOVERY') {
          setAuthModalInitialMode('reset_password');
          setAuthModalInitialError('');
          setAuthModalOpen(true);

          // Allow Supabase Gotrue to finalize session establishment before clearing the URL fragment
          setTimeout(() => {
            if (typeof window !== 'undefined' && (window.location.hash || window.location.search)) {
              window.history.replaceState({}, document.title, window.location.pathname);
            }
          }, 600);
        }
      });
      authUnsubscribe = () => subscription.unsubscribe();

      // Check URL on initial mount for auth query parameters or recovery/errors
      if (typeof window !== 'undefined') {
        const hash = window.location.hash || '';
        const search = window.location.search || '';
        const searchParams = new URLSearchParams(search.startsWith('?') ? search.substring(1) : search);
        const authParam = searchParams.get('auth') || (searchParams.get('login') === 'true' ? 'signin' : null);

        if (authParam === 'signin' || authParam === 'login') {
          setAuthModalInitialMode('signin');
          setAuthModalInitialError('');
          setAuthModalOpen(true);
        } else if (authParam === 'signup' || authParam === 'register') {
          setAuthModalInitialMode('signup');
          setAuthModalInitialError('');
          setAuthModalOpen(true);
        }

        if (hash.includes('error=') || search.includes('error=')) {
          const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.substring(1) : hash);

          const errorCode = hashParams.get('error_code') || searchParams.get('error_code');
          const rawDesc = hashParams.get('error_description') || searchParams.get('error_description') || hashParams.get('error');

          let friendlyMsg = rawDesc ? decodeURIComponent(rawDesc.replace(/\+/g, ' ')) : '';
          if (errorCode === 'otp_expired' || friendlyMsg.toLowerCase().includes('expired') || friendlyMsg.toLowerCase().includes('invalid')) {
            friendlyMsg = 'The password reset link is invalid or has expired. Please request a new one.';
          }

          setAuthModalInitialMode('forgot_password');
          setAuthModalInitialError(friendlyMsg || 'The password reset link is invalid or has expired.');
          setAuthModalOpen(true);

          // Clean up error params after reading to avoid repeated triggers on manual refresh
          setTimeout(() => {
            if (typeof window !== 'undefined' && (window.location.hash || window.location.search)) {
              window.history.replaceState({}, document.title, window.location.pathname);
            }
          }, 300);
        } else if (hash.includes('type=recovery') || search.includes('type=recovery')) {
          // Recovery credentials present: let Supabase client consume the tokens first.
          // Do NOT call replaceState here to avoid wiping tokens before session resolution.
          setAuthModalInitialMode('reset_password');
          setAuthModalInitialError('');
          setAuthModalOpen(true);
        }
      }
    } else {
      // Supabase not configured in current build, but check if user attempted to open auth
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const authParam = searchParams.get('auth') || (searchParams.get('login') === 'true' ? 'signin' : null);
        if (authParam === 'signin' || authParam === 'login') {
          setAuthModalInitialMode('signin');
          setAuthModalInitialError('');
          setAuthModalOpen(true);
        } else if (authParam === 'signup' || authParam === 'register') {
          setAuthModalInitialMode('signup');
          setAuthModalInitialError('');
          setAuthModalOpen(true);
        }
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (authUnsubscribe) authUnsubscribe();
    };
  }, []);

  // Sync user state changes to storage
  const updateUser = (updater: (prev: UserProfile) => UserProfile) => {
    setUser(prev => {
      const next = updater(prev);
      saveUserToStorage(next);
      return next;
    });
  };

  // DEV-ONLY Admin Demo Security Guard:
  // In production builds, Admin Demo is disabled. Only verified non-demo Supabase administrators can access admin features.
  const canAccessAdmin = import.meta.env.DEV
    ? (user.role === 'admin' && isUserLoggedIn(user))
    : (user.role === 'admin' && user.status === 'active' && isUserLoggedIn(user));

  const handleNavigate = (view: string, payload?: any) => {
    if (view === 'admin') {
      if (!canAccessAdmin) {
        setCurrentView('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    if (view === 'bookmarks') {
      setBookmarksModalOpen(true);
      return;
    }
    if (view === 'notes') {
      setNotesModalOpen(true);
      return;
    }
    if (view === 'review') {
      setReviewModalOpen(true);
      return;
    }
    if (view === 'learning-path' || view === 'learning-paths') {
      setCurrentView('learning-paths');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (view === 'learning-process') {
      setCurrentView('learning-process');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (view === 'my-courses' || view === '/my-courses') {
      setCurrentView('my-courses');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (view === 'course-detail') {
      setCurrentView('course-detail');
      setViewPayload(prev => ({
        courseId: payload?.courseId || prev.courseId || 'python',
        levelId: payload?.levelId || null,
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    if (payload) {
      setViewPayload(payload);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lesson Progress & Gamification updater
  const handleUpdateProgress = (
    lessonId: string,
    stage: 'learn' | 'exercises' | 'challenge' | 'quiz' | 'project',
    payload?: any
  ) => {
    updateUser(prev => {
      const currentProg: LessonProgress = prev.lessonProgress[lessonId] || {
        lessonId,
        courseId: (viewPayload.courseId || 'python') as CourseId,
        levelId: (viewPayload.levelId || 'basic') as LevelId,
        learnCompleted: false,
        exercisesCompleted: false,
        challengeCompleted: false,
        challengeSolutionViewed: false,
        quizPassed: false,
        quizScore: 0,
        bestQuizScore: 0,
        quizAttemptsCount: 0,
        projectCompleted: false,
        isCompleted: false,
        updatedAt: new Date().toISOString(),
      };

      const updatedProg = { ...currentProg, updatedAt: new Date().toISOString() };
      const updatedTopicMastery = { ...prev.topicMastery };

      if (stage === 'learn' && !currentProg.learnCompleted) {
        updatedProg.learnCompleted = true;
      } else if (stage === 'exercises' && !currentProg.exercisesCompleted) {
        updatedProg.exercisesCompleted = true;
      } else if (stage === 'challenge' && !currentProg.challengeCompleted) {
        updatedProg.challengeCompleted = true;
      } else if (stage === 'quiz') {
        const score = payload?.score || 0;
        const topicResults = payload?.topicResults || {};

        if (score >= 80) {
          updatedProg.quizPassed = true;
        }
        updatedProg.bestQuizScore = Math.max(currentProg.bestQuizScore || 0, score);
        updatedProg.quizScore = score;
        updatedProg.quizAttemptsCount = (currentProg.quizAttemptsCount || 0) + 1;

        // Update topic mastery
        Object.entries(topicResults).forEach(([topic, passed]) => {
          const prevScore = updatedTopicMastery[topic] || 70;
          updatedTopicMastery[topic] = passed
            ? Math.min(100, prevScore + 10)
            : Math.max(20, prevScore - 8);
        });
      } else if (stage === 'project' && !currentProg.projectCompleted) {
        updatedProg.projectCompleted = true;
      }

      // Check if lesson is completely finished
      if (
        updatedProg.learnCompleted &&
        updatedProg.exercisesCompleted &&
        updatedProg.challengeCompleted &&
        updatedProg.quizPassed
      ) {
        updatedProg.isCompleted = true;
        updatedProg.completedAt = updatedProg.completedAt || new Date().toISOString();
      }

      // Persist to local & Supabase
      saveLessonProgress(updatedProg);

      return {
        ...prev,
        topicMastery: updatedTopicMastery,
        lessonProgress: {
          ...prev.lessonProgress,
          [lessonId]: updatedProg,
        },
      };
    });
  };

  // Toggle Bookmark
  const handleToggleBookmark = (
    lessonId: string,
    title: string,
    courseId: CourseId,
    levelId: LevelId
  ) => {
    toggleBookmark({
      lessonId,
      lessonTitle: { en: title, vi: title },
      courseId,
      levelId,
    });

    updateUser(prev => {
      const exists = prev.bookmarks.some(b => b.lessonId === lessonId);
      let updatedBookmarks;
      if (exists) {
        updatedBookmarks = prev.bookmarks.filter(b => b.lessonId !== lessonId);
      } else {
        updatedBookmarks = [
          ...prev.bookmarks,
          {
            id: `bm_${Date.now()}`,
            userId: prev.id,
            lessonId,
            lessonTitle: { en: title, vi: title },
            courseId,
            levelId,
            createdAt: new Date().toISOString(),
          },
        ];
      }
      return { ...prev, bookmarks: updatedBookmarks };
    });
  };

  // Save Note
  const handleSaveNote = (lessonId: string, content: string) => {
    saveLessonNote({
      lessonId,
      courseId: (viewPayload.courseId || 'python') as CourseId,
      levelId: (viewPayload.levelId || 'basic') as LevelId,
      lessonTitle: { en: lessonId, vi: lessonId },
      content,
    });

    updateUser(prev => {
      const existing = prev.notes.filter(n => n.lessonId !== lessonId);
      const updatedNotes = [
        ...existing,
        {
          id: `nt_${Date.now()}`,
          userId: prev.id,
          lessonId,
          courseId: (viewPayload.courseId || 'python') as CourseId,
          levelId: (viewPayload.levelId || 'basic') as LevelId,
          lessonTitle: { en: lessonId, vi: lessonId },
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      return { ...prev, notes: updatedNotes };
    });
  };

  // Delete Note
  const handleDeleteNote = (lessonId: string) => {
    saveLessonNote({
      lessonId,
      courseId: (viewPayload.courseId || 'python') as CourseId,
      levelId: (viewPayload.levelId || 'basic') as LevelId,
      lessonTitle: { en: lessonId, vi: lessonId },
      content: '',
    });

    updateUser(prev => ({
      ...prev,
      notes: prev.notes.filter(n => n.lessonId !== lessonId),
    }));
  };

  // Drill Completed
  const handleDrillCompleted = (results: Record<string, boolean>) => {
    updateUser(prev => {
      const mastery = { ...prev.topicMastery };
      Object.entries(results).forEach(([topic, passed]) => {
        const cur = mastery[topic] || 60;
        mastery[topic] = passed ? Math.min(100, cur + 15) : cur;
        updateTopicMastery(topic, 'python', passed);
      });
      return {
        ...prev,
        xp: prev.xp + 25,
        topicMastery: mastery,
      };
    });
  };

  const handleSignOut = () => {
    clearStoredUser();
    setUser(getDefaultUser());
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 transition-colors">
      
      {/* Top Main Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        user={user}
        onOpenAuth={() => {
          setAuthModalInitialMode('signin');
          setAuthModalInitialError('');
          setAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenAccountSettings={(initialTab = 'profile') => {
          setAccountSettingsInitialTab(initialTab);
          setAccountSettingsModalOpen(true);
        }}
        onOpenSecuritySettings={() => {
          setAccountSettingsInitialTab('security');
          setAccountSettingsModalOpen(true);
        }}
      />

      {/* Pending Approval Notice Banner */}
      {user.status === 'pending_approval' && !user.id.startsWith('guest-') && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-800 dark:text-amber-300">
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                <strong>{dict.auth.pendingApprovalBadge}:</strong> {dict.auth.pendingApprovalNotice}
              </span>
            </div>
            {canAccessAdmin && (
              <button
                onClick={() => handleNavigate('admin')}
                className="underline font-bold text-amber-900 dark:text-amber-200 cursor-pointer shrink-0 self-start sm:self-auto"
              >
                Go to Admin
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main View Router */}
      <div className="flex-1">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-mono text-slate-500">Loading view...</p>
          </div>
        }>
          {currentView === 'home' && (
            <HomeView
              user={user}
              onNavigate={handleNavigate}
              onSelectCourse={cId => handleNavigate('course-detail', { courseId: cId })}
              initialSearchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {currentView === 'courses' && (
            <CoursesList
              user={user}
              onNavigate={handleNavigate}
              onSelectCourse={cId => handleNavigate('course-detail', { courseId: cId })}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {(currentView === 'learning-paths' || currentView === 'learning-path') && (
            <LearningPathsView
              user={user}
              onNavigate={handleNavigate}
              onSelectCourse={cId => handleNavigate('course-detail', { courseId: cId })}
            />
          )}

          {currentView === 'learning-process' && (
            <LearningProcessView
              onNavigate={handleNavigate}
              onSelectCourse={cId => handleNavigate('course-detail', { courseId: cId })}
            />
          )}

          {(currentView === 'my-courses' || currentView === '/my-courses') && (
            authLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-mono text-slate-500">Checking authentication...</p>
              </div>
            ) : (
              <MyCoursesView
                user={user}
                onNavigate={handleNavigate}
                onSelectCourse={(cId, lvlId) => handleNavigate('course-detail', { courseId: cId, levelId: lvlId || null })}
              />
            )
          )}

          {currentView === 'course-detail' && viewPayload.courseId && (
            <CourseDetail
              courseId={viewPayload.courseId}
              initialLevelId={viewPayload.levelId || null}
              user={user}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'lesson' && viewPayload.courseId && viewPayload.levelId && viewPayload.lessonId && (
            <LessonView
              courseId={viewPayload.courseId}
              levelId={viewPayload.levelId}
              lessonId={viewPayload.lessonId}
              user={user}
              onNavigate={handleNavigate}
              onUpdateProgress={handleUpdateProgress}
              onToggleBookmark={handleToggleBookmark}
              onSaveNote={handleSaveNote}
            />
          )}

          {currentView === 'dashboard' && (
            authLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-mono text-slate-500">Checking authentication...</p>
              </div>
            ) : (
              <DashboardView
                user={user}
                onNavigate={handleNavigate}
                onStartReview={() => setReviewModalOpen(true)}
              />
            )
          )}

          {currentView === 'playground' && (
            <PlaygroundView />
          )}

          {currentView === 'free-tier' && (
            <FreeTierView onNavigate={handleNavigate} />
          )}

          {currentView === 'admin' && (
            canAccessAdmin ? (
              <AdminDashboard />
            ) : (
              <DashboardView
                user={user}
                onNavigate={handleNavigate}
                onStartReview={() => setReviewModalOpen(true)}
              />
            )
          )}
        </Suspense>
      </div>

      {/* Global Modals */}
      <GlobalSearch
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={res => {
          if (res.type === 'lesson' && res.levelId && res.lessonId) {
            handleNavigate('lesson', { courseId: res.courseId, levelId: res.levelId, lessonId: res.lessonId });
          } else {
            handleNavigate('course-detail', { courseId: res.courseId, levelId: res.levelId || 'basic' });
          }
        }}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setAuthModalInitialMode('signin');
          setAuthModalInitialError('');
        }}
        onAuthSuccess={u => setUser(u)}
        initialMode={authModalInitialMode}
        initialErrorMsg={authModalInitialError}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        user={user}
        onDrillCompleted={handleDrillCompleted}
      />

      <BookmarksModal
        isOpen={bookmarksModalOpen}
        onClose={() => setBookmarksModalOpen(false)}
        user={user}
        onNavigateLesson={(cId, lvlId, lId) => handleNavigate('lesson', { courseId: cId, levelId: lvlId, lessonId: lId })}
        onRemoveBookmark={lId => handleToggleBookmark(lId, '', 'python', 'basic')}
      />

      <NotesModal
        isOpen={notesModalOpen}
        onClose={() => setNotesModalOpen(false)}
        user={user}
        onNavigateLesson={lId => handleNavigate('lesson', { courseId: 'python', levelId: 'basic', lessonId: lId })}
        onDeleteNote={handleDeleteNote}
      />

      <AccountSettingsModal
        isOpen={accountSettingsModalOpen}
        onClose={() => setAccountSettingsModalOpen(false)}
        currentUser={user}
        initialTab={accountSettingsInitialTab}
        onUserUpdated={updatedUser => {
          setUser(updatedUser);
        }}
      />

      {/* Platform AdSlot */}
      <AdSlot product="study" user={user} supabaseClient={supabase} />

      {/* Platform Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
          
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" productName="Study" showText={true} showMark={true} />
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">{dict.brand?.tagline || BRAND_CONFIG.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 dark:text-slate-400 font-medium">
            <a
              href="https://4tm.io.vn"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              4TM Ecosystem
            </a>
            <button onClick={() => handleNavigate('courses')} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              {dict.nav.courses}
            </button>
            <button onClick={() => handleNavigate('learning-paths')} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              {dict.nav.learningPath || 'Learning Path'}
            </button>
            <button onClick={() => handleNavigate('learning-process')} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              {dict.nav.learningProcess || (language === 'vi' ? 'Quy trình học' : 'Learning Process')}
            </button>
            <button onClick={() => handleNavigate('playground')} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              {dict.nav.playground}
            </button>
            <button onClick={() => handleNavigate('dashboard')} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              {dict.nav.dashboard}
            </button>
            {canAccessAdmin && (
              <button onClick={() => handleNavigate('admin')} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer">
                {dict.nav.admin}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate('free-tier')}
              className="px-2.5 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono text-[11px] transition-colors cursor-pointer"
            >
              100% Free-Tier & WASM
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center gap-1 font-bold transition-colors cursor-pointer"
            >
              <Globe className="w-3 h-3 text-slate-500 dark:text-slate-400" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
