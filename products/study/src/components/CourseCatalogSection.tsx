import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Layers,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CourseId, LevelId, UserProfile, Course } from '../types';
import { coreCourses, getFirstAvailableLesson } from '../data/coursesData';
import { isUserLoggedIn } from '../services/storageService';
import { CourseBrandIcon, getCourseTheme } from './CourseBrandIcon';

export interface CourseCatalogSectionProps {
  user?: UserProfile;
  onNavigate: (view: string, payload?: any) => void;
  onSelectCourse?: (courseId: CourseId) => void;
  initialSearchQuery?: string;
  onSearchChange?: (query: string) => void;
  onResultCountChange?: (count: number) => void;
  headingText?: string;
  subheadingText?: string;
  showSectionHeader?: boolean;
}

export const CourseCatalogSection: React.FC<CourseCatalogSectionProps> = ({
  user,
  onNavigate,
  onSelectCourse,
  initialSearchQuery = '',
  onSearchChange,
  onResultCountChange,
  headingText,
  subheadingText,
  showSectionHeader = true,
}) => {
  const { t, dict, language } = useLanguage();
  const isLoggedIn = user ? isUserLoggedIn(user) : false;

  // Filter states
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [internalSearchQuery, setInternalSearchQuery] = useState<string>(initialSearchQuery);

  const searchQuery = onSearchChange !== undefined ? initialSearchQuery : internalSearchQuery;
  const setSearchQuery = (val: string) => {
    if (onSearchChange) {
      onSearchChange(val);
    } else {
      setInternalSearchQuery(val);
    }
  };

  // Domain definitions mapped to actual catalog courses
  const DOMAIN_OPTIONS = [
    { id: 'all', label: dict.course.allTracksFilter },
    { id: 'data', label: dict.course.backendFilter },
    { id: 'programming', label: dict.course.programmingFilter },
    { id: 'web', label: dict.course.webFilter },
    { id: 'ai', label: dict.course.aiFilter },
  ];

  const LEVEL_OPTIONS = [
    { id: 'all', label: dict.course.allLevelsFilter },
    { id: 'basic', label: dict.course.basicLevelFilter },
    { id: 'intermediate', label: dict.course.intermediateLevelFilter },
    { id: 'advanced', label: dict.course.advancedLevelFilter },
  ];

  // Deep search matching across course titles, taglines, descriptions, modules, and lessons
  const matchCourse = (
    course: Course,
    q: string,
    levelFilter: string
  ): { matches: boolean; matchedLessonTitle?: string } => {
    const cleanQ = q.toLowerCase().trim();

    // Check level filter eligibility
    if (levelFilter !== 'all') {
      const targetLvl = course.levels[levelFilter as LevelId];
      if (!targetLvl || !targetLvl.modules || targetLvl.modules.length === 0) {
        return { matches: false };
      }
    }

    if (!cleanQ) return { matches: true };

    const title = (course.title[language] || course.title.en || '').toLowerCase();
    const desc = (course.description[language] || course.description.en || '').toLowerCase();
    const tagline = (course.tagline[language] || course.tagline.en || '').toLowerCase();
    const id = course.id.toLowerCase();

    if (title.includes(cleanQ) || desc.includes(cleanQ) || tagline.includes(cleanQ) || id.includes(cleanQ)) {
      return { matches: true };
    }

    // Inspect modules and lessons (within selected level if specified, or all levels)
    const levelsToCheck = levelFilter !== 'all'
      ? [course.levels[levelFilter as LevelId]].filter(Boolean)
      : Object.values(course.levels).filter(Boolean);

    for (const lvl of levelsToCheck) {
      if (!lvl || !lvl.modules) continue;
      for (const mod of lvl.modules) {
        const modTitle = (mod.title[language] || mod.title.en || '').toLowerCase();
        if (modTitle.includes(cleanQ)) {
          return { matches: true, matchedLessonTitle: mod.title[language] || mod.title.en };
        }
        if (mod.lessons) {
          for (const lesson of mod.lessons) {
            const lTitle = (lesson.title[language] || lesson.title.en || '').toLowerCase();
            const lSummary = (lesson.summary[language] || lesson.summary.en || '').toLowerCase();
            const lTopic = (lesson.topicId || '').toLowerCase();
            if (lTitle.includes(cleanQ) || lSummary.includes(cleanQ) || lTopic.includes(cleanQ)) {
              return { matches: true, matchedLessonTitle: lesson.title[language] || lesson.title.en };
            }
          }
        }
      }
    }

    return { matches: false };
  };

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return coreCourses
      .map((course) => ({ course, ...matchCourse(course, searchQuery, selectedLevel) }))
      .filter((item) => {
        if (!item.matches) return false;

        // Domain filtering
        if (selectedDomain === 'data') {
          if (item.course.id !== 'excel' && item.course.id !== 'sql' && item.course.id !== 'powerbi') {
            return false;
          }
        } else if (selectedDomain === 'programming') {
          if (item.course.id !== 'python') return false;
        } else if (selectedDomain === 'web') {
          if (item.course.id !== 'html' && item.course.id !== 'css' && item.course.id !== 'javascript') {
            return false;
          }
        } else if (selectedDomain === 'ai') {
          if (item.course.id !== 'ai') return false;
        }

        return true;
      });
  }, [selectedDomain, selectedLevel, searchQuery, language]);

  useEffect(() => {
    onResultCountChange?.(filteredCourses.length);
  }, [filteredCourses.length, onResultCountChange]);

  const hasActiveFilters = useMemo(() => {
    return selectedDomain !== 'all' || selectedLevel !== 'all' || searchQuery.trim().length > 0;
  }, [selectedDomain, selectedLevel, searchQuery]);

  const handleResetFilters = () => {
    setSelectedDomain('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  const handleViewCourse = (courseId: CourseId) => {
    if (onSelectCourse) {
      onSelectCourse(courseId);
    } else {
      onNavigate('course-detail', {
        courseId,
        levelId: selectedLevel !== 'all' ? selectedLevel : 'basic',
      });
    }
  };

  const handleStartLearning = (courseId: CourseId) => {
    const first = getFirstAvailableLesson(courseId, isLoggedIn && user ? user.lessonProgress : {});
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

  const renderCourseCard = (item: { course: Course; matchedLessonTitle?: string }) => {
    const { course, matchedLessonTitle } = item;
    const theme = getCourseTheme(course.id);
    const allLessonIds: string[] = [];

    // Tally lessons: for active level if selected, or entire course
    const targetLevels = selectedLevel !== 'all'
      ? [course.levels[selectedLevel as LevelId]].filter(Boolean)
      : Object.values(course.levels).filter(Boolean);

    targetLevels.forEach((lvl) => {
      lvl.modules.forEach((m) => m.lessons.forEach((l) => allLessonIds.push(l.id)));
    });

    const completed = isLoggedIn && user
      ? allLessonIds.filter((id) => user.lessonProgress[id]?.isCompleted).length
      : 0;
    const progressPercent =
      isLoggedIn && allLessonIds.length > 0 ? Math.round((completed / allLessonIds.length) * 100) : 0;

    return (
      <div
        key={course.id}
        id={`course-card-${course.id}`}
        className={`p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 ${theme.cardBorder} shadow-md dark:shadow-xl flex flex-col justify-between space-y-5 transition-all hover:scale-[1.01]`}
      >
        <div>
          {/* Badge & Track Header with Official Logo */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <div className="flex items-center gap-2.5">
              <CourseBrandIcon courseId={course.id} size="md" />
              <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border ${theme.badgeBg}`}>
                {course.id.toUpperCase()}
              </span>
            </div>

            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {selectedLevel !== 'all'
                ? LEVEL_OPTIONS.find((l) => l.id === selectedLevel)?.label
                : dict.course.threeLevels}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t(course.title)}
          </h3>
          <p className={`text-xs font-semibold mt-1 ${theme.accentText}`}>{t(course.tagline)}</p>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
            {t(course.description)}
          </p>

          {/* Search match highlight pill */}
          {matchedLessonTitle && (
            <div className="mt-3.5 p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-[11px] text-blue-700 dark:text-blue-300 flex items-center gap-1.5 truncate">
              <span className="font-semibold shrink-0">{dict.course.matchedLesson}</span>
              <span className="truncate italic">&quot;{matchedLessonTitle}&quot;</span>
            </div>
          )}
        </div>

        {/* Progress & Dual Action Buttons */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {isLoggedIn && (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                <span>
                  {progressPercent}
                  {dict.course.percentCompleted}
                </span>
                <span>
                  {completed}/{allLessonIds.length} {dict.course.lessonCount}
                </span>
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
              type="button"
              id={`view-course-btn-${course.id}`}
              onClick={() => handleViewCourse(course.id)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 border border-slate-200 dark:border-slate-700"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="truncate">{dict.course.viewCourse}</span>
            </button>

            <button
              type="button"
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
    <section aria-label="Course Catalog & Discovery" className="space-y-6">
      {/* Optional Section Header */}
      {showSectionHeader && (
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono uppercase tracking-wider border border-blue-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{dict.home.coursesHeading}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {headingText || dict.home.coursesHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {subheadingText || dict.home.coursesSubheading}
          </p>
        </div>
      )}

      {/* Discovery & Filter Controls */}
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            id="course-catalog-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearchQuery('');
            }}
            placeholder={dict.course.searchCoursesPlaceholder}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs transition-all"
            aria-label={dict.course.searchCoursesPlaceholder}
          />
          {searchQuery && (
            <button
              type="button"
              id="course-catalog-search-clear-btn"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              aria-label={dict.course.clearAllFilters}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Compact Dropdown Filter Menus (Responsive & Clean) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {/* Dropdown 1: Domain / Track */}
          <div className="relative">
            <select
              id="filter-course-domain-select"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 truncate ${
                selectedDomain !== 'all'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              {DOMAIN_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-slate-400" />
          </div>

          {/* Dropdown 2: Level */}
          <div className="relative">
            <select
              id="filter-course-level-select"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 truncate ${
                selectedLevel !== 'all'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              {LEVEL_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-slate-400" />
          </div>
        </div>

        {/* Active Filter Chips & Result Counter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Result count */}
            <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-300 mr-1">
              {filteredCourses.length === 1
                ? dict.course.showingCoursesCountSingle?.replace('{total}', String(coreCourses.length)) ||
                  `Showing 1 of ${coreCourses.length} courses`
                : dict.course.showingCoursesCount
                    ?.replace('{count}', String(filteredCourses.length))
                    ?.replace('{total}', String(coreCourses.length)) ||
                  `Showing ${filteredCourses.length} of ${coreCourses.length} courses`}
            </span>

            {/* Active Domain Chip */}
            {selectedDomain !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-bold border border-blue-500/20">
                <span>{dict.course.filterDomainLabel}: {DOMAIN_OPTIONS.find((d) => d.id === selectedDomain)?.label}</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-blue-800 dark:hover:text-blue-200"
                  onClick={() => setSelectedDomain('all')}
                  aria-label="Remove domain filter"
                />
              </span>
            )}

            {/* Active Level Chip */}
            {selectedLevel !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold">
                <span>{dict.course.filterLevelLabel}: {LEVEL_OPTIONS.find((l) => l.id === selectedLevel)?.label}</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => setSelectedLevel('all')}
                  aria-label="Remove level filter"
                />
              </span>
            )}

            {/* Active Search Query Chip */}
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-semibold">
                <span>&quot;{searchQuery}&quot;</span>
                <X
                  className="w-3 h-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => setSearchQuery('')}
                  aria-label="Remove search filter"
                />
              </span>
            )}
          </div>

          {/* Reset All Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              id="course-catalog-reset-filters-btn"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-bold text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{dict.course.clearAllFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredCourses.map((item) => renderCourseCard(item))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto shadow-sm">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
            {dict.course.noCoursesFound}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {dict.course.noCoursesFoundDesc}
          </p>
          <button
            type="button"
            id="empty-course-catalog-reset-btn"
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white cursor-pointer hover:bg-blue-500 shadow-md shadow-blue-600/20"
          >
            {dict.course.clearAllFilters}
          </button>
        </div>
      )}
    </section>
  );
};
