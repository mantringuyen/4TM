import React, { useState } from 'react';
import {
  Flame,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  Bookmark,
  FileText,
  LogOut,
  LogIn,
  User as UserIcon,
  Compass,
  Sparkles,
  Terminal,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Header, HeaderNavItem, Avatar, Badge } from '@shared';
import { UserProfile } from '../types';
import { coreCourses, getCourseSyllabusStats } from '../data/coursesData';
import { CourseProgressPanel } from './CourseProgressPanel';
import { isUserLoggedIn } from '../services/storageService';

export interface NavbarProps {
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
  const [progressPanelOpen, setProgressPanelOpen] = useState(false);

  const isLoggedIn = isUserLoggedIn(user);
  const canAccessAdmin = user.role === 'admin' && user.status === 'active' && isLoggedIn;

  // Calculate real-time overall progress across all Core Courses
  const coreStats = coreCourses.map((c) =>
    getCourseSyllabusStats(c.id, isLoggedIn ? user.lessonProgress : {})
  );
  const totalLessons = coreStats.reduce((acc, s) => acc + s.totalLessons, 0);
  const totalCompleted = coreStats.reduce((acc, s) => acc + s.completedLessons, 0);
  const overallCorePercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Desktop navigation items
  const navItems: HeaderNavItem[] = [
    {
      id: 'nav-courses',
      label: dict.nav.courses,
      icon: BookOpen,
      active: currentView === 'courses',
      onClick: () => onNavigate('courses'),
    },
    {
      id: 'nav-learning-path',
      label: dict.nav?.learningPath || 'Learning Path',
      icon: Compass,
      active: currentView.startsWith('learning-path'),
      onClick: () => onNavigate('learning-paths'),
    },
    {
      id: 'nav-learning-process',
      label: dict.nav?.learningProcess || (language === 'vi' ? 'Quy trình học' : 'Learning Process'),
      icon: Sparkles,
      active: currentView === 'learning-process',
      onClick: () => onNavigate('learning-process'),
    },
    {
      id: 'nav-playground',
      label: dict.nav.playground,
      icon: Terminal,
      active: currentView === 'playground',
      onClick: () => onNavigate('playground'),
    },
    ...(isLoggedIn
      ? [
          {
            id: 'nav-dashboard',
            label: dict.nav.dashboard,
            icon: LayoutDashboard,
            active: currentView === 'dashboard',
            onClick: () => onNavigate('dashboard'),
          },
        ]
      : []),
    ...(canAccessAdmin
      ? [
          {
            id: 'nav-admin',
            label: dict.nav.admin,
            icon: ShieldCheck,
            active: currentView === 'admin',
            onClick: () => onNavigate('admin'),
          },
        ]
      : []),
  ];

  // Quick access controls in navigation area: Streak & Progress
  const quickAccessControls = isLoggedIn ? (
    <div className="hidden lg:flex items-center gap-2">
      {/* Streak */}
      <div
        id="nav-streak-badge"
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold select-none shadow-2xs"
        title={`${user.streak} ${dict.nav.streak}`}
      >
        <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
        <span>{user.streak}</span>
      </div>

      {/* Courses Progress Trigger */}
      <button
        id="nav-courses-progress-trigger-btn"
        type="button"
        onClick={() => setProgressPanelOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 dark:bg-indigo-500/15 dark:hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold transition-all cursor-pointer shadow-2xs"
        title={dict.nav?.courseProgress || 'Course Progress'}
      >
        <span>📚</span>
        <span className="hidden xl:inline">{dict.nav?.courses || 'Courses'}</span>
        <span className="px-1.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-mono font-bold shadow-xs">
          {overallCorePercent}%
        </span>
      </button>
    </div>
  ) : null;

  return (
    <>
      <Header
        productId="study"
        productName="study"
        navItems={navItems}
        extraHeaderControls={quickAccessControls}
        onOpenSearch={onOpenSearch}
        searchPlaceholder={dict.nav.searchPlaceholder || 'Search lessons, topics, courses...'}
        language={language}
        onLanguageChange={setLanguage}
        onLogoClick={(e) => {
          e.preventDefault();
          onNavigate('home');
        }}
        renderCustomMenuContent={({ closeMenu }) => (
          <div className="space-y-3">
            {/* User Profile / Status */}
            {isLoggedIn ? (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Avatar
                    src={user.avatar}
                    name={user.displayName || user.email || 'User'}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Badge variant={user.role === 'admin' ? 'danger' : 'primary'} size="sm">
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
                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold ml-auto">
                    {overallCorePercent}% completed
                  </span>
                </div>

                {/* Account & Learning Shortcuts */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      (onOpenAccountSettings || onOpenSecuritySettings)?.('profile');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{dict.nav?.accountSettings || 'Profile / Account'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      onNavigate('dashboard');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dict.nav.dashboard}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      onNavigate('my-courses');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dict.myCourses?.title || 'My Courses'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      setProgressPanelOpen(true);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dict.nav?.courseProgress || 'Course Progress'} ({overallCorePercent}%)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      onNavigate('bookmarks');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dict.nav.bookmarks}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      onNavigate('notes');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dict.nav.notes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      onNavigate('review');
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{dict.nav.review}</span>
                  </button>

                  {canAccessAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        closeMenu();
                        onNavigate('admin');
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 flex items-center gap-2 transition-colors cursor-pointer font-semibold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                      <span>{dict.nav.admin}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      onSignOut();
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors cursor-pointer font-semibold pt-2 border-t border-slate-200 dark:border-slate-700/60"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{dict.nav.signOut}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {language === 'vi' ? 'Tham gia học tập' : 'Join Study'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'vi' ? 'Đăng nhập để lưu tiến độ' : 'Sign in to save progress'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onOpenAuth();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{dict.auth?.signInTitle || 'Sign In'}</span>
                </button>
              </div>
            )}

            {/* Mobile / Responsive Navigation Links */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 md:hidden">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                {language === 'vi' ? 'Điều hướng Study' : 'Study Navigation'}
              </p>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        closeMenu();
                        item.onClick?.();
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        item.active
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      />

      {/* Course Progress Breakdown Panel */}
      {progressPanelOpen && (
        <CourseProgressPanel
          isOpen={progressPanelOpen}
          onClose={() => setProgressPanelOpen(false)}
          user={user}
          onNavigate={(view, payload) => {
            setProgressPanelOpen(false);
            onNavigate(view, payload);
          }}
        />
      )}
    </>
  );
};
