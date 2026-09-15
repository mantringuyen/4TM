import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Terminal, 
  Flame, 
  Search, 
  Globe, 
  BookOpen, 
  LayoutDashboard, 
  ShieldCheck, 
  Bookmark, 
  FileText, 
  LogOut, 
  LogIn, 
  User as UserIcon,
  ChevronDown,
  Menu as MenuIcon,
  X,
  Compass,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code2,
  GraduationCap,
  Shield,
  Home
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ThemeSelector } from './ThemeSelector';
import { BrandLogo, ProductSwitcher, Avatar, Badge } from '@shared';
import { UserProfile, CourseId, LevelId } from '../types';
import { coreCourses, getCourseSyllabusStats } from '../data/coursesData';
import { CourseProgressPanel } from './CourseProgressPanel';
import { CourseBrandIcon } from './CourseBrandIcon';
import { isDemoUser, isUserLoggedIn } from '../services/storageService';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, payload?: any) => void;
  user: UserProfile;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onOpenSearch: () => void;
  onOpenSecuritySettings?: () => void;
  onOpenAccountSettings?: (initialTab?: 'profile' | 'security' | 'appearance') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onOpenAuth,
  onSignOut,
  onOpenSearch,
  onOpenSecuritySettings,
  onOpenAccountSettings,
}) => {
  const { language, setLanguage, dict } = useLanguage();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progressPanelOpen, setProgressPanelOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileToggleBtnRef = useRef<HTMLButtonElement>(null);

  const isLoggedIn = isUserLoggedIn(user);

  // Admin Entry Guard: Only verified non-demo Supabase administrators can access admin entry points.
  const canAccessAdmin = user.role === 'admin' && user.status === 'active' && isLoggedIn;

  // Calculate real-time overall progress across all Core Courses (empty for guest)
  const coreStats = coreCourses.map(c => getCourseSyllabusStats(c.id, isLoggedIn ? user.lessonProgress : {}));
  const totalLessons = coreStats.reduce((acc, s) => acc + s.totalLessons, 0);
  const totalCompleted = coreStats.reduce((acc, s) => acc + s.completedLessons, 0);
  const overallCorePercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Close desktop dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile navigation drawer when tapping/clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsideInteraction = (e: PointerEvent | MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      // Keep drawer open if interacting with elements inside the mobile drawer
      if (mobileDrawerRef.current && mobileDrawerRef.current.contains(target)) {
        return;
      }

      // If clicking/tapping the hamburger / X toggle button, let its own handler toggle cleanly
      if (mobileToggleBtnRef.current && mobileToggleBtnRef.current.contains(target)) {
        return;
      }

      // Outside tap or click detected (backdrop, Home logo, or any external page element):
      // Dismiss the mobile drawer immediately
      setMobileMenuOpen(false);
    };

    // Use capture phase on pointerdown to ensure immediate dismissal before or during event dispatch
    document.addEventListener('pointerdown', handleOutsideInteraction, true);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideInteraction, true);
    };
  }, [mobileMenuOpen]);

  // Guarantee mobile menu/overlay is automatically closed whenever navigation occurs
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentView]);

  const handleSelectCourseFromMenu = (courseId: CourseId) => {
    setMenuDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate('course-detail', { courseId, levelId: 'basic' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors duration-200 shadow-sm dark:shadow-none">
        
        {/* =========================================================================
            DESKTOP ROW 1: [Logo]  [Theme]  [EN] [VI]  [🔥 Streak]  [📚 Courses]  [Avatar/Login]
           ========================================================================= */}
        <div className="border-b border-slate-100 dark:border-slate-800/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-15 flex items-center justify-between gap-3">
            
            {/* [Brand & Ecosystem Navigation] */}
            <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
              <button 
                id="brand-logo-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('home');
                }}
                className="flex items-center gap-2 group text-left focus:outline-none shrink-0 cursor-pointer"
                aria-label="4TM Study Home"
              >
                <BrandLogo
                  size="md"
                  productName="Study"
                  showText={true}
                  showMark={true}
                />
              </button>

              <div className="hidden sm:block border-l border-slate-200 dark:border-slate-800 pl-2">
                <ProductSwitcher currentProductId="study" />
              </div>

              <span className="hidden lg:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold tracking-wider">
                LMS
              </span>
            </div>

            {/* Desktop Row 1 Right Utility Cluster: [Theme] [EN] [VI] [🔥 Streak] [📚 Courses] [Avatar/Login] */}
            <div className="hidden md:flex items-center gap-2.5 lg:gap-3">
              
              {/* [Theme] Selector */}
              <div id="nav-theme-selector-container" className="flex items-center">
                <ThemeSelector variant="dropdown" />
              </div>

              {/* [EN] [VI] Language Switcher Segment */}
              <div 
                id="nav-language-switcher-segment"
                className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner"
              >
                <button
                  id="nav-lang-en-btn"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Switch to English"
                >
                  EN
                </button>
                <button
                  id="nav-lang-vi-btn"
                  onClick={() => setLanguage('vi')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    language === 'vi'
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Chuyển sang Tiếng Việt"
                >
                  VI
                </button>
              </div>

              {/* [🔥 Streak] (Authenticated only) */}
              {isLoggedIn && (
                <div 
                  id="nav-streak-badge"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold select-none shadow-sm"
                  title={`${user.streak} ${dict.nav.streak}`}
                >
                  <Flame className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                  <span>{user.streak}</span>
                </div>
              )}

              {/* [📚 Courses] Progress Trigger (Authenticated only) */}
              {isLoggedIn && (
                <button
                  id="nav-courses-progress-trigger-btn"
                  onClick={() => setProgressPanelOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 dark:bg-blue-500/15 dark:hover:bg-blue-500/25 border border-blue-500/30 text-blue-600 dark:text-blue-300 text-xs font-bold transition-all cursor-pointer group shadow-sm hover:scale-[1.02]"
                  title={dict.nav?.courseProgress || 'Course Progress'}
                  aria-label="View course progress breakdown"
                >
                  <span className="text-sm">📚</span>
                  <span>{dict.nav?.courses || 'Courses'}</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-mono font-bold shadow-xs">
                    {overallCorePercent}%
                  </span>
                </button>
              )}

              {/* [Avatar/Login] Profile Menu */}
              {isLoggedIn ? (
                <div ref={profileRef} className="relative">
                  <button
                    id="profile-dropdown-btn"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-blue-500/40 transition-all focus:outline-none cursor-pointer"
                    aria-label="User profile menu"
                  >
                    <Avatar
                      src={user.avatar}
                      name={user.displayName || user.email || 'User'}
                      size="sm"
                    />
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileDropdownOpen && (
                    <div 
                      id="profile-dropdown-menu"
                      className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.displayName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <Badge
                            variant={user.role === 'admin' ? 'danger' : 'primary'}
                            size="sm"
                          >
                            {user.role.toUpperCase()}
                          </Badge>
                          {user.status === 'pending_approval' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700">
                              {dict.auth.pendingApprovalBadge}
                            </span>
                          )}
                          {user.status === 'active' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                              Active
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {overallCorePercent}% completed
                          </span>
                        </div>
                      </div>

                      <div className="py-1">
                        {/* Profile / Account Settings Entry */}
                        <button
                          id="dropdown-account-settings-btn"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            (onOpenAccountSettings || onOpenSecuritySettings)?.('profile');
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center gap-2.5 font-bold transition-colors cursor-pointer"
                        >
                          <UserIcon className="w-4 h-4 text-blue-500" />
                          <span>{dict.nav?.accountSettings || 'Profile / Account'}</span>
                        </button>

                        <button
                          id="dropdown-dashboard-btn"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigate('dashboard');
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" />
                          {dict.nav.dashboard}
                        </button>

                        <button
                          id="dropdown-my-courses-btn"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigate('my-courses');
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <GraduationCap className="w-4 h-4 text-slate-400" />
                          {dict.myCourses?.title || 'My Courses'}
                        </button>

                        <button
                          id="dropdown-course-progress-btn"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            setProgressPanelOpen(true);
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          {dict.nav?.courseProgress || 'Course Progress'}
                        </button>

                        <button
                          id="dropdown-bookmarks-btn"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigate('bookmarks');
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <Bookmark className="w-4 h-4 text-slate-400" />
                          {dict.nav.bookmarks}
                        </button>

                        <button
                          id="dropdown-notes-btn"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigate('notes');
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-slate-400" />
                          {dict.nav.notes}
                        </button>

                        <button
                          id="dropdown-review-btn"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onNavigate('review');
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-amber-600 dark:text-amber-300 hover:bg-amber-500/10 flex items-center gap-2.5 font-medium transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          {dict.nav.review}
                        </button>

                        {canAccessAdmin && (
                          <button
                            id="dropdown-admin-btn"
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              onNavigate('admin');
                            }}
                            className="w-full px-4 py-2 text-left text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 flex items-center gap-2.5 font-medium transition-colors cursor-pointer"
                          >
                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                            {dict.nav.admin}
                          </button>
                        )}
                      </div>

                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          id="dropdown-signout-btn"
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onSignOut();
                          }}
                          className="w-full px-4 py-2 text-left text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 flex items-center gap-2.5 transition-colors cursor-pointer font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          {dict.nav.signOut}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="nav-signin-btn"
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{dict.auth?.signInTitle || 'Sign In'}</span>
                </button>
              )}

            </div>

            {/* Mobile Header Controls */}
            <div className="flex md:hidden items-center gap-2">
              
              {/* Mobile Streak (Authenticated only) */}
              {isLoggedIn && (
                <div 
                  id="mobile-streak-badge"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{user.streak}</span>
                </div>
              )}

              {/* Mobile Course Progress Button (Authenticated only) */}
              {isLoggedIn && (
                <button
                  id="mobile-course-progress-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setProgressPanelOpen(true);
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold"
                  aria-label="Course Progress"
                >
                  <span>📚</span>
                  <span className="text-[11px] font-mono">{overallCorePercent}%</span>
                </button>
              )}

              {/* Mobile Theme Selector */}
              <ThemeSelector variant="dropdown" />

              {/* Mobile Language Switcher */}
              <button
                id="mobile-lang-btn"
                onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
                className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300"
              >
                {language.toUpperCase()}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                ref={mobileToggleBtnRef}
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* =========================================================================
            DESKTOP ROW 2: [Menu] [Courses] [Learning Path] [Playground] [Dashboard]
           ========================================================================= */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
            
            {/* Primary Nav Links */}
            <nav className="flex items-center gap-1.5">
              
              {/* [Menu] Courses Catalog Dropdown */}
              <div ref={menuRef} className="relative">
                <button
                  id="nav-menu-btn"
                  onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    menuDropdownOpen
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                  aria-expanded={menuDropdownOpen}
                  aria-haspopup="true"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{dict.nav?.menu || 'Menu'}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${menuDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* [Menu] Catalog Popup */}
                {menuDropdownOpen && (
                  <div 
                    id="nav-menu-catalog-dropdown"
                    className="absolute left-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2"
                  >
                    <div className="px-2 py-1 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {dict.nav?.courseProgressTitle || 'Core Courses'}
                      </span>
                      <button
                        onClick={() => {
                          setMenuDropdownOpen(false);
                          onNavigate('courses');
                        }}
                        className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        {dict.home?.viewAllTracks || 'View All'}
                      </button>
                    </div>

                    <div className="space-y-1">
                      {coreCourses.map(course => {
                        const title = course.title[language] || course.title.en;
                        const stats = getCourseSyllabusStats(course.id, isLoggedIn ? user.lessonProgress : {});

                        return (
                          <button
                            key={course.id}
                            onClick={() => handleSelectCourseFromMenu(course.id)}
                            className="w-full p-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="shrink-0 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                <CourseBrandIcon courseId={course.id} size="sm" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                  {title}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {isLoggedIn ? `${stats.completedLessons}/${stats.totalLessons} lessons • ${stats.progressPercent}%` : `${stats.totalLessons} lessons`}
                                </p>
                              </div>
                            </div>

                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* [Courses] Button */}
              <button
                id="nav-courses-btn"
                onClick={() => onNavigate('courses')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'courses'
                    ? 'bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{dict.nav.courses}</span>
              </button>

              {/* [Learning Path] Button */}
              <button
                id="nav-learning-path-btn"
                onClick={() => onNavigate('learning-paths')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'learning-paths' || currentView === 'learning-path'
                    ? 'bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{dict.nav?.learningPath || 'Learning Path'}</span>
              </button>

              {/* [Learning Process] Button */}
              <button
                id="nav-learning-process-btn"
                onClick={() => onNavigate('learning-process')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'learning-process'
                    ? 'bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dict.nav?.learningProcess || (language === 'vi' ? 'Quy trình học' : 'Learning Process')}</span>
              </button>

              {/* [Playground] Button */}
              <button
                id="nav-playground-btn"
                onClick={() => onNavigate('playground')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentView === 'playground'
                    ? 'bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{dict.nav.playground}</span>
              </button>

              {/* [Dashboard] Button (Only when logged in) */}
              {isLoggedIn && (
                <button
                  id="nav-dashboard-btn"
                  onClick={() => onNavigate('dashboard')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'dashboard'
                      ? 'bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 font-bold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{dict.nav.dashboard}</span>
                </button>
              )}

              {/* Admin Button if Admin */}
              {canAccessAdmin && (
                <button
                  id="nav-admin-btn"
                  onClick={() => onNavigate('admin')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentView === 'admin'
                      ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/40 font-bold'
                      : 'text-blue-600 dark:text-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{dict.nav.admin}</span>
                </button>
              )}
            </nav>

            {/* Global Search Bar Shortcut */}
            <div className="flex items-center">
              <button
                id="global-search-trigger-btn"
                onClick={onOpenSearch}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs flex items-center gap-3 hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-colors shadow-inner cursor-pointer"
              >
                <span className="flex items-center gap-2 truncate max-w-[200px] lg:max-w-xs">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{dict.nav.searchPlaceholder.slice(0, 32)}...</span>
                </span>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-mono border border-slate-300 dark:border-slate-700 shadow-xs">
                  Ctrl+K
                </kbd>
              </button>
            </div>

          </div>
        </div>

        {/* Full-screen backdrop portaled to document.body so header backdrop-filter doesn't constrain it */}
        {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
          <div
            id="mobile-menu-backdrop"
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-35 md:hidden animate-in fade-in duration-150"
            onClick={() => setMobileMenuOpen(false)}
            onPointerDown={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />,
          document.body
        )}

        {/* =========================================================================
            MOBILE COLLAPSIBLE MENU
           ========================================================================= */}
        {mobileMenuOpen && (
          <div 
            ref={mobileDrawerRef}
            id="mobile-navigation-drawer"
            className="relative z-40 md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-2xl max-h-[calc(100vh-64px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
              {/* Search Trigger */}
              <button
                id="mobile-menu-search-trigger"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  <span>{dict.nav.searchPlaceholder.slice(0, 28)}...</span>
                </span>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] font-mono border border-slate-300 dark:border-slate-700">
                  Ctrl+K
                </kbd>
              </button>

              {/* Navigation Links Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  id="mobile-nav-home-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('home');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                    currentView === 'home' || currentView === ''
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-850'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>{dict.nav.home}</span>
                </button>

                <button
                  id="mobile-nav-courses-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('courses');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                    currentView === 'courses'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-850'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{dict.nav.courses}</span>
                </button>

                <button
                  id="mobile-nav-learning-path-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('learning-paths');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                    currentView === 'learning-paths' || currentView === 'learning-path'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-850'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  <span>{dict.nav?.learningPath || 'Learning Path'}</span>
                </button>

                <button
                  id="mobile-nav-learning-process-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('learning-process');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                    currentView === 'learning-process'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-850'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{dict.nav?.learningProcess || (language === 'vi' ? 'Quy trình học' : 'Learning Process')}</span>
                </button>

                <button
                  id="mobile-nav-playground-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('playground');
                  }}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                    currentView === 'playground'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-850'
                  }`}
                >
                  <Terminal className="w-4 h-4" />
                  <span>{dict.nav.playground}</span>
                </button>

                {isLoggedIn && (
                  <button
                    id="mobile-nav-my-courses-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('my-courses');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      currentView === 'my-courses' || currentView === '/my-courses'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-850'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>{dict.myCourses?.title || 'My Courses'}</span>
                  </button>
                )}

                {isLoggedIn && (
                  <button
                    id="mobile-nav-dashboard-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('dashboard');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      currentView === 'dashboard'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-850'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{dict.nav.dashboard}</span>
                  </button>
                )}

                {canAccessAdmin && (
                  <button
                    id="mobile-nav-admin-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate('admin');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                      currentView === 'admin'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{dict.nav.admin}</span>
                  </button>
                )}
              </div>

              {/* Quick Course Selector */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {dict.nav?.courseProgressTitle || 'Core Courses'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {coreCourses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => handleSelectCourseFromMenu(course.id)}
                      className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-left flex items-center gap-2 group"
                    >
                      <CourseBrandIcon courseId={course.id} size="sm" />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                        {course.title[language] || course.title.en}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme & User Profile Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <ThemeSelector variant="dropdown" />
                
                <div className="flex items-center gap-2">
                  {isLoggedIn ? (
                    <>
                      <button
                        id="mobile-account-settings-btn"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          (onOpenAccountSettings || onOpenSecuritySettings)?.('profile');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-blue-500" />
                        <span>{dict.nav?.accountSettings || 'Account'}</span>
                      </button>
                      <button
                        id="mobile-signout-btn"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onSignOut();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                      >
                        {dict.nav.signOut}
                      </button>
                    </>
                  ) : (
                    <button
                      id="mobile-signin-btn"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>{dict.auth?.signInTitle || 'Sign In'}</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
        )}

      </header>

      {/* Course Progress Modal / Panel */}
      <CourseProgressPanel
        isOpen={progressPanelOpen}
        onClose={() => setProgressPanelOpen(false)}
        user={user}
        onNavigate={onNavigate}
      />
    </>
  );
};
