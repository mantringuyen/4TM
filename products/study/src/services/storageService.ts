import { 
  CourseId, 
  LevelId, 
  LessonProgress, 
  QuizAttempt, 
  TopicMastery, 
  Badge, 
  BookmarkItem, 
  NoteItem, 
  UserProfile,
  AccountStatus
} from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

// Centralized Demo Identities Registry
export const DEMO_USER_IDS = new Set<string>([
  'guest-learner',
  'demo_student_id',
  'demo_admin_id',
  'admin-lead',
  'demo-learner-pending-1',
  'demo-learner-pending-2',
  'demo-learner-suspended-1',
]);

export const DEMO_ADMIN_IDS = new Set<string>([
  'demo_admin_id',
  'admin-lead',
]);

/**
 * Checks if a user ID belongs to the Demo Admin.
 */
export const isDemoAdminId = (userId?: string | null): boolean => {
  if (!userId) return false;
  if (DEMO_ADMIN_IDS.has(userId)) return true;
  const lower = userId.toLowerCase();
  return lower === 'demo_admin_id' || lower === 'admin-lead';
};

/**
 * Checks if a user profile represents a Demo Admin identity.
 */
export const isDemoAdminUser = (user?: { id?: string | null; role?: string; email?: string } | null): boolean => {
  if (!user) return false;
  if (isDemoAdminId(user.id)) return true;
  if (user.email === 'admin@4tm.dev') return true;
  if (user.role === 'admin' && isDemoUserId(user.id)) return true;
  return false;
};

/**
 * Predicate to check whether a user ID belongs to a demo / local identity.
 * Identifies guest-learner, demo_student_id, demo_admin_id, admin-lead,
 * and any identifier prefixed with guest-, demo_, or demo-.
 */
export const isDemoUserId = (userId?: string | null): boolean => {
  if (!userId) return true;
  if (DEMO_USER_IDS.has(userId)) return true;
  if (userId.startsWith('guest-') || userId.startsWith('demo_') || userId.startsWith('demo-')) return true;
  return false;
};

/**
 * Centralized predicate to check whether a UserProfile is a demo / local identity.
 * Guards all background Supabase synchronization paths.
 */
export const isDemoUser = (user?: { id?: string | null } | null): boolean => {
  if (!user || !user.id) return true;
  return isDemoUserId(user.id);
};

/**
 * Checks if a user is actively authenticated (not a demo/guest).
 */
export const isUserLoggedIn = (user?: { id?: string | null } | null): boolean => {
  if (!user || !user.id) return false;
  return !isDemoUser(user);
};

/**
 * Resolves the demo storage namespace:
 * - 'demo_admin' for demo_admin_id, admin-lead, or admin demo profiles (DEV-ONLY)
 * - 'demo_student' for guest-learner, demo_student_id, and other demo learners
 */
export const getDemoScope = (userId?: string | null): 'demo_admin' | 'demo_student' => {
  if (!userId) return 'demo_student';
  // In production builds, Demo Admin is completely disabled; all demo scopes default to student
  if (!import.meta.env.DEV) {
    return 'demo_student';
  }
  const lower = userId.toLowerCase();
  if (lower === 'demo_admin_id' || lower === 'admin-lead' || lower.includes('admin')) {
    return 'demo_admin';
  }
  return 'demo_student';
};

export type StorageKeyType =
  | 'PROGRESS'
  | 'QUIZ_ATTEMPTS'
  | 'TOPIC_MASTERY'
  | 'BOOKMARKS'
  | 'NOTES'
  | 'CUSTOM_LESSONS'
  | 'SAVED_SNIPPETS';

export const BASE_STORAGE_KEYS: Record<StorageKeyType, string> = {
  PROGRESS: 'lesson_progress',
  QUIZ_ATTEMPTS: 'quiz_attempts',
  TOPIC_MASTERY: 'topic_mastery',
  BOOKMARKS: 'bookmarks',
  NOTES: 'notes',
  CUSTOM_LESSONS: 'custom_lessons',
  SAVED_SNIPPETS: 'saved_snippets',
};

/**
 * Centralized storage namespace resolver:
 * - Demo Student (guest-learner / demo_student_id): 4tm_demo_student_<suffix>
 * - Demo Admin (demo_admin_id / admin-lead): 4tm_demo_admin_<suffix>
 * - Real Authenticated Users: 4tm_<suffix>
 */
export const getStorageKey = (
  baseKey: StorageKeyType | string,
  userOrId?: UserProfile | string | null
): string => {
  let suffix: string;
  if (baseKey in BASE_STORAGE_KEYS) {
    suffix = BASE_STORAGE_KEYS[baseKey as StorageKeyType];
  } else if (baseKey.startsWith('4tm_')) {
    suffix = baseKey.replace(/^4tm_/, '');
  } else {
    suffix = baseKey;
  }

  let userId: string | null = null;
  if (typeof userOrId === 'string') {
    userId = userOrId;
  } else if (userOrId && typeof userOrId === 'object' && 'id' in userOrId) {
    userId = userOrId.id;
  } else {
    try {
      const raw = localStorage.getItem('4tm_user_profile');
      if (raw) {
        const u = JSON.parse(raw);
        userId = u?.id || null;
      }
    } catch {}
  }

  if (!userId || isDemoUserId(userId)) {
    const scope = getDemoScope(userId);
    return `4tm_${scope}_${suffix}`;
  }

  return `4tm_${suffix}`;
};

export const STORAGE_KEYS = {
  USER: '4tm_user_profile',
  PROGRESS: '4tm_lesson_progress',
  QUIZ_ATTEMPTS: '4tm_quiz_attempts',
  TOPIC_MASTERY: '4tm_topic_mastery',
  BOOKMARKS: '4tm_bookmarks',
  NOTES: '4tm_notes',
  CUSTOM_LESSONS: '4tm_custom_lessons',
  SAVED_SNIPPETS: '4tm_saved_snippets',
};

// Seed Data for Student Demo
const INITIAL_STUDENT_PROGRESS: Record<string, LessonProgress> = {
  py_lesson_1: {
    lessonId: 'py_lesson_1',
    courseId: 'python',
    levelId: 'basic',
    learnCompleted: true,
    exercisesCompleted: true,
    challengeCompleted: true,
    challengeSolutionViewed: false,
    quizPassed: true,
    quizScore: 90,
    bestQuizScore: 90,
    quizAttemptsCount: 1,
    projectCompleted: false,
    isCompleted: true,
    updatedAt: new Date().toISOString(),
  }
};

const INITIAL_STUDENT_BOOKMARKS: BookmarkItem[] = [
  {
    id: 'bm_1',
    userId: 'guest-learner',
    courseId: 'python',
    levelId: 'basic',
    lessonId: 'py_lesson_1',
    lessonTitle: { en: 'Variables & Data Types', vi: 'Biến & Kiểu Dữ Liệu' },
    createdAt: new Date().toISOString()
  }
];

const INITIAL_STUDENT_NOTES: NoteItem[] = [
  {
    id: 'nt_1',
    userId: 'guest-learner',
    courseId: 'python',
    levelId: 'basic',
    lessonId: 'py_lesson_1',
    lessonTitle: { en: 'Variables & Data Types', vi: 'Biến & Kiểu Dữ Liệu' },
    content: 'Python variables are dynamically typed and snake_case is standard.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Initial default guest user
export const getDefaultUser = (): UserProfile => {
  const id = 'guest-learner';
  return {
    id,
    email: '',
    displayName: 'Guest',
    preferredLanguage: 'en',
    role: 'user',
    status: 'active',
    emailVerified: false,
    xp: 0,
    streak: 0,
    lastActiveDate: '',
    createdAt: new Date().toISOString(),
    lessonProgress: {},
    topicMastery: {},
    bookmarks: [],
    notes: [],
    achievements: []
  };
};

// Admin Demo User (DEV-ONLY)
export const getAdminUser = (): UserProfile => {
  // In production builds, Admin Demo is completely disabled and inaccessible
  if (!import.meta.env.DEV) {
    return getDefaultUser();
  }

  const id = 'admin-lead';
  return {
    id,
    email: 'admin@4tm.dev',
    displayName: 'Platform Admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    preferredLanguage: 'en',
    role: 'admin',
    status: 'active',
    emailVerified: true,
    xp: 1540,
    streak: 14,
    lastActiveDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    lessonProgress: getProgressMap(id),
    topicMastery: getTopicMasteryRecord(id),
    bookmarks: getBookmarks(id),
    notes: getNotes(id),
    achievements: []
  };
};

// User profile management
export const getCurrentUser = (): UserProfile => {
  const raw = localStorage.getItem(STORAGE_KEYS.USER);
  if (!raw) {
    return getDefaultUser();
  }
  try {
    const parsed: UserProfile = JSON.parse(raw);

    // If demo or unauthenticated guest identity, return clean default state without stale metrics
    if (isDemoUserId(parsed.id)) {
      return getDefaultUser();
    }

    // DEV-ONLY Admin Demo Security Guard:
    // In production builds, Admin Demo is completely disabled.
    // If a demo admin profile or crafted unauthenticated admin profile is detected in localStorage,
    // immediately purge it and revert to standard guest learner.
    if (!import.meta.env.DEV && (isDemoAdminUser(parsed) || (parsed.role === 'admin' && isDemoUserId(parsed.id)))) {
      return getDefaultUser();
    }

    parsed.lessonProgress = getProgressMap(parsed);
    parsed.bookmarks = getBookmarks(parsed);
    parsed.notes = getNotes(parsed);
    parsed.topicMastery = getTopicMasteryRecord(parsed);
    return parsed;
  } catch {
    return getDefaultUser();
  }
};

export const saveCurrentUser = (user: UserProfile): void => {
  // DEV-ONLY Admin Demo Security Guard:
  // In production builds, prevent persisting any demo admin identity
  if (!import.meta.env.DEV && (isDemoAdminUser(user) || (user.role === 'admin' && isDemoUserId(user.id)))) {
    user = getDefaultUser();
  }

  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

  // Keep the isolated storage namespace updated for this user
  if (user.lessonProgress) {
    const progressKey = getStorageKey('PROGRESS', user);
    localStorage.setItem(progressKey, JSON.stringify(user.lessonProgress));
  }
  if (user.bookmarks) {
    const bookmarksKey = getStorageKey('BOOKMARKS', user);
    localStorage.setItem(bookmarksKey, JSON.stringify(user.bookmarks));
  }
  if (user.notes) {
    const notesKey = getStorageKey('NOTES', user);
    localStorage.setItem(notesKey, JSON.stringify(user.notes));
  }

  // Sync to Supabase profiles table: only safe user-editable attributes
  // Never let user mutate role or status directly via client upsert!
  // DEMO USERS NEVER REACH SUPABASE!
  if (isSupabaseConfigured && supabase && !isDemoUser(user) && user.status === 'active') {
    supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      display_name: user.displayName,
      avatar: user.avatar,
      preferred_language: user.preferredLanguage || 'en',
      xp: user.xp,
      streak: user.streak,
      last_active_date: user.lastActiveDate,
      updated_at: new Date().toISOString(),
    }).then();
  }
};

export const addXp = (amount: number): UserProfile => {
  const user = getCurrentUser();
  user.xp += amount;
  
  // Check and update streak
  const today = new Date().toISOString().split('T')[0];
  if (user.lastActiveDate !== today) {
    const lastActive = new Date(user.lastActiveDate);
    const now = new Date(today);
    const diffDays = Math.round((now.getTime() - lastActive.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays === 1) {
      user.streak += 1;
    } else if (diffDays > 1) {
      user.streak = 1;
    }
    user.lastActiveDate = today;
  }

  saveCurrentUser(user);
  return user;
};

// Lesson Progress Storage
export const getProgressMap = (userOrId?: UserProfile | string | null): Record<string, LessonProgress> => {
  const key = getStorageKey('PROGRESS', userOrId);
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }

  // Determine user ID
  let userId: string | null = null;
  if (typeof userOrId === 'string') userId = userOrId;
  else if (userOrId && typeof userOrId === 'object' && 'id' in userOrId) userId = userOrId.id;
  else {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER);
      if (u) userId = JSON.parse(u)?.id || null;
    } catch {}
  }

  if (!userId || isDemoUserId(userId)) {
    return {};
  }

  return {};
};

export const getLessonProgress = (
  lessonId: string, 
  courseId: CourseId, 
  levelId: LevelId,
  userOrId?: UserProfile | string | null
): LessonProgress => {
  const map = getProgressMap(userOrId);
  if (map[lessonId]) return map[lessonId];

  return {
    lessonId,
    courseId,
    levelId,
    learnCompleted: false,
    exercisesCompleted: false,
    challengeCompleted: false,
    challengeSolutionViewed: false,
    quizPassed: false,
    quizScore: 0,
    quizAttemptsCount: 0,
    projectCompleted: false,
    updatedAt: new Date().toISOString(),
  };
};

export const saveLessonProgress = (
  progress: LessonProgress,
  userOrId?: UserProfile | string
): void => {
  const user = typeof userOrId === 'object' && userOrId !== null 
    ? userOrId 
    : (typeof userOrId === 'string' ? { id: userOrId } as UserProfile : getCurrentUser());

  const key = getStorageKey('PROGRESS', user);
  const map = getProgressMap(user);
  map[progress.lessonId] = {
    ...progress,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify(map));

  // Keep stored active user in sync if this is the active user
  const currentRaw = localStorage.getItem(STORAGE_KEYS.USER);
  if (currentRaw) {
    try {
      const current = JSON.parse(currentRaw);
      if (current.id === user.id) {
        current.lessonProgress = { ...(current.lessonProgress || {}), [progress.lessonId]: map[progress.lessonId] };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(current));
      }
    } catch {}
  }

  // Supabase sync: ONLY FOR REAL AUTHENTICATED USERS
  if (isSupabaseConfigured && supabase && !isDemoUser(user)) {
    if (user.status === 'active') {
      supabase.from('lesson_progress').upsert({
        user_id: user.id,
        lesson_id: progress.lessonId,
        course_id: progress.courseId,
        level_id: progress.levelId,
        learn_completed: progress.learnCompleted,
        exercises_completed: progress.exercisesCompleted,
        challenge_completed: progress.challengeCompleted,
        challenge_solution_viewed: progress.challengeSolutionViewed || false,
        quiz_passed: progress.quizPassed,
        quiz_score: progress.quizScore,
        best_quiz_score: progress.bestQuizScore || progress.quizScore,
        quiz_attempts_count: progress.quizAttemptsCount || 1,
        project_completed: progress.projectCompleted,
        is_completed: progress.isCompleted || false,
        completed_at: progress.completedAt || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,lesson_id' }).then();
    }
  }
};

// Check if a Level is Unlocked
export const isLevelUnlocked = (
  courseId: CourseId, 
  levelId: LevelId, 
  allLevelLessons: Record<LevelId, string[]>,
  userOrId?: UserProfile | string | null
): { isUnlocked: boolean; reason?: string } => {
  if (levelId === 'basic') {
    return { isUnlocked: true };
  }

  const map = getProgressMap(userOrId);

  if (levelId === 'intermediate') {
    const basicLessonIds = allLevelLessons.basic || [];
    if (basicLessonIds.length === 0) return { isUnlocked: true };

    const completedBasicCount = basicLessonIds.filter(id => {
      const p = map[id];
      return p && (p.quizPassed || (p.learnCompleted && p.exercisesCompleted));
    }).length;

    const isComplete = completedBasicCount >= Math.max(1, Math.ceil(basicLessonIds.length * 0.8));
    return {
      isUnlocked: isComplete,
      reason: isComplete ? undefined : `Complete at least 80% of ${courseId.toUpperCase()} Basic lessons to unlock Intermediate.`
    };
  }

  if (levelId === 'advanced') {
    // Intermediate must be complete
    const intermediateLessonIds = allLevelLessons.intermediate || [];
    if (intermediateLessonIds.length === 0) return { isUnlocked: false, reason: 'Complete Intermediate level first.' };

    const completedIntermediateCount = intermediateLessonIds.filter(id => {
      const p = map[id];
      return p && (p.quizPassed || (p.learnCompleted && p.exercisesCompleted));
    }).length;

    const isComplete = completedIntermediateCount >= Math.max(1, Math.ceil(intermediateLessonIds.length * 0.8));
    return {
      isUnlocked: isComplete,
      reason: isComplete ? undefined : `Complete at least 80% of ${courseId.toUpperCase()} Intermediate lessons to unlock Advanced.`
    };
  }

  return { isUnlocked: true };
};

// Topic Mastery Calculation
export const getTopicMasteryMap = (userOrId?: UserProfile | string | null): Record<string, TopicMastery> => {
  const key = getStorageKey('TOPIC_MASTERY', userOrId);
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }

  let userId: string | null = null;
  if (typeof userOrId === 'string') userId = userOrId;
  else if (userOrId && typeof userOrId === 'object' && 'id' in userOrId) userId = userOrId.id;
  else {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER);
      if (u) userId = JSON.parse(u)?.id || null;
    } catch {}
  }

  const isDemo = !userId || isDemoUserId(userId);
  if (isDemo) {
    return {};
  }
};

export const getTopicMasteryRecord = (userOrId?: UserProfile | string | null): Record<string, number> => {
  const map = getTopicMasteryMap(userOrId);
  const res: Record<string, number> = {};
  for (const [k, v] of Object.entries(map)) {
    res[k] = v.percentage;
  }
  return res;
};

export const updateTopicMastery = (
  topicId: string, 
  courseId: CourseId, 
  isSuccess: boolean,
  userOrId?: UserProfile | string
): void => {
  const user = typeof userOrId === 'object' && userOrId !== null 
    ? userOrId 
    : (typeof userOrId === 'string' ? { id: userOrId } as UserProfile : getCurrentUser());

  const key = getStorageKey('TOPIC_MASTERY', user);
  const map = getTopicMasteryMap(user);
  const existing = map[topicId] || {
    topicId,
    courseId,
    percentage: 50,
    totalAttempts: 0,
    successfulAttempts: 0,
    lastUpdated: new Date().toISOString(),
  };

  existing.totalAttempts += 1;
  if (isSuccess) existing.successfulAttempts += 1;
  existing.percentage = Math.round((existing.successfulAttempts / existing.totalAttempts) * 100);
  existing.lastUpdated = new Date().toISOString();

  map[topicId] = existing;
  localStorage.setItem(key, JSON.stringify(map));

  // Supabase sync: ONLY FOR REAL AUTHENTICATED USERS
  if (isSupabaseConfigured && supabase && !isDemoUser(user)) {
    if (user.status === 'active') {
      supabase.from('topic_mastery').upsert({
        user_id: user.id,
        topic_id: topicId,
        course_id: courseId,
        percentage: existing.percentage,
        total_attempts: existing.totalAttempts,
        successful_attempts: existing.successfulAttempts,
        last_updated: existing.lastUpdated,
      }, { onConflict: 'user_id,topic_id' }).then();
    }
  }
};

// Bookmarks
export const getBookmarks = (userOrId?: UserProfile | string | null): BookmarkItem[] => {
  const key = getStorageKey('BOOKMARKS', userOrId);
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }

  let userId: string | null = null;
  if (typeof userOrId === 'string') userId = userOrId;
  else if (userOrId && typeof userOrId === 'object' && 'id' in userOrId) userId = userOrId.id;
  else {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER);
      if (u) userId = JSON.parse(u)?.id || null;
    } catch {}
  }

  if (!userId || isDemoUserId(userId)) {
    return [];
  }

  return [];
};

export const toggleBookmark = (
  item: Omit<BookmarkItem, 'id' | 'createdAt' | 'userId'> & { userId?: string },
  userOrId?: UserProfile | string
): boolean => {
  const user = typeof userOrId === 'object' && userOrId !== null 
    ? userOrId 
    : (typeof userOrId === 'string' ? { id: userOrId } as UserProfile : getCurrentUser());

  const effectiveUserId = item.userId || user.id;
  const key = getStorageKey('BOOKMARKS', user);
  const list = getBookmarks(user);
  const existingIndex = list.findIndex(b => b.lessonId === item.lessonId);
  const isCloudAllowed = !isDemoUserId(effectiveUserId) && !isDemoUser(user) && user.status === 'active';
  
  if (existingIndex >= 0) {
    list.splice(existingIndex, 1);
    localStorage.setItem(key, JSON.stringify(list));

    if (isSupabaseConfigured && supabase && isCloudAllowed) {
      supabase.from('bookmarks').delete().match({ user_id: effectiveUserId, lesson_id: item.lessonId }).then();
    }
    return false; // removed
  } else {
    const newBookmark: BookmarkItem = {
      ...item,
      id: `bm_${Date.now()}`,
      userId: effectiveUserId,
      createdAt: new Date().toISOString(),
    };
    list.push(newBookmark);
    localStorage.setItem(key, JSON.stringify(list));

    if (isSupabaseConfigured && supabase && isCloudAllowed) {
      supabase.from('bookmarks').upsert({
        id: newBookmark.id,
        user_id: effectiveUserId,
        course_id: item.courseId,
        level_id: item.levelId,
        lesson_id: item.lessonId,
        lesson_title_en: typeof item.lessonTitle === 'object' ? item.lessonTitle.en : item.lessonTitle,
        lesson_title_vi: typeof item.lessonTitle === 'object' ? item.lessonTitle.vi : item.lessonTitle,
        created_at: newBookmark.createdAt,
      }, { onConflict: 'user_id,lesson_id' }).then();
    }
    return true; // added
  }
};

export const isBookmarked = (lessonId: string, userOrId?: UserProfile | string | null): boolean => {
  const list = getBookmarks(userOrId);
  return list.some(b => b.lessonId === lessonId);
};

// Notes
export const getNotes = (userOrId?: UserProfile | string | null): NoteItem[] => {
  const key = getStorageKey('NOTES', userOrId);
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }

  let userId: string | null = null;
  if (typeof userOrId === 'string') userId = userOrId;
  else if (userOrId && typeof userOrId === 'object' && 'id' in userOrId) userId = userOrId.id;
  else {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.USER);
      if (u) userId = JSON.parse(u)?.id || null;
    } catch {}
  }

  if (!userId || isDemoUserId(userId)) {
    return [];
  }

  return [];
};

export const getLessonNote = (lessonId: string, userOrId?: UserProfile | string | null): string => {
  const list = getNotes(userOrId);
  const found = list.find(n => n.lessonId === lessonId);
  return found ? found.content : '';
};

export const saveLessonNote = (
  note: Omit<NoteItem, 'id' | 'createdAt' | 'updatedAt' | 'userId'> & { userId?: string },
  userOrId?: UserProfile | string
): void => {
  const user = typeof userOrId === 'object' && userOrId !== null 
    ? userOrId 
    : (typeof userOrId === 'string' ? { id: userOrId } as UserProfile : getCurrentUser());

  const effectiveUserId = note.userId || user.id;
  const key = getStorageKey('NOTES', user);
  const list = getNotes(user);
  const existingIndex = list.findIndex(n => n.lessonId === note.lessonId);
  const isCloudAllowed = !isDemoUserId(effectiveUserId) && !isDemoUser(user) && user.status === 'active';

  if (existingIndex >= 0) {
    if (!note.content.trim()) {
      list.splice(existingIndex, 1);
      if (isSupabaseConfigured && supabase && isCloudAllowed) {
        supabase.from('notes').delete().match({ user_id: effectiveUserId, lesson_id: note.lessonId }).then();
      }
    } else {
      list[existingIndex].content = note.content;
      list[existingIndex].updatedAt = new Date().toISOString();
      if (isSupabaseConfigured && supabase && isCloudAllowed) {
        supabase.from('notes').upsert({
          id: list[existingIndex].id,
          user_id: effectiveUserId,
          course_id: note.courseId,
          level_id: note.levelId,
          lesson_id: note.lessonId,
          lesson_title_en: typeof note.lessonTitle === 'object' ? note.lessonTitle.en : note.lessonTitle,
          lesson_title_vi: typeof note.lessonTitle === 'object' ? note.lessonTitle.vi : note.lessonTitle,
          content: note.content,
          updated_at: list[existingIndex].updatedAt,
        }, { onConflict: 'user_id,lesson_id' }).then();
      }
    }
  } else if (note.content.trim()) {
    const newNote: NoteItem = {
      ...note,
      id: `note_${Date.now()}`,
      userId: effectiveUserId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.push(newNote);
    if (isSupabaseConfigured && supabase && isCloudAllowed) {
      supabase.from('notes').upsert({
        id: newNote.id,
        user_id: effectiveUserId,
        course_id: note.courseId,
        level_id: note.levelId,
        lesson_id: note.lessonId,
        lesson_title_en: typeof note.lessonTitle === 'object' ? note.lessonTitle.en : note.lessonTitle,
        lesson_title_vi: typeof note.lessonTitle === 'object' ? note.lessonTitle.vi : note.lessonTitle,
        content: note.content,
        created_at: newNote.createdAt,
        updated_at: newNote.updatedAt,
      }, { onConflict: 'user_id,lesson_id' }).then();
    }
  }

  localStorage.setItem(key, JSON.stringify(list));
};

// Cloud Data Full Synchronization on Sign-In
export const syncUserDataFromSupabase = async (userId: string): Promise<UserProfile | null> => {
  if (!isSupabaseConfigured || !supabase || !userId || isDemoUserId(userId)) {
    return null;
  }

  try {
    const [profileRes, progressRes, bookmarksRes, notesRes, masteryRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabase.from('lesson_progress').select('*').eq('user_id', userId),
      supabase.from('bookmarks').select('*').eq('user_id', userId),
      supabase.from('notes').select('*').eq('user_id', userId),
      supabase.from('topic_mastery').select('*').eq('user_id', userId),
    ]);

    const profileData = profileRes.data;
    const progressData = progressRes.data || [];
    const bookmarksData = bookmarksRes.data || [];
    const notesData = notesRes.data || [];
    const masteryData = masteryRes.data || [];

    // Map lesson progress
    const progressMap: Record<string, LessonProgress> = {};
    progressData.forEach((row: any) => {
      progressMap[row.lesson_id] = {
        lessonId: row.lesson_id,
        courseId: row.course_id as CourseId,
        levelId: row.level_id as LevelId,
        learnCompleted: Boolean(row.learn_completed),
        exercisesCompleted: Boolean(row.exercises_completed),
        challengeCompleted: Boolean(row.challenge_completed),
        challengeSolutionViewed: Boolean(row.challenge_solution_viewed),
        quizPassed: Boolean(row.quiz_passed),
        quizScore: row.quiz_score || 0,
        bestQuizScore: row.best_quiz_score || row.quiz_score || 0,
        quizAttemptsCount: row.quiz_attempts_count || 1,
        projectCompleted: Boolean(row.project_completed),
        isCompleted: Boolean(row.is_completed),
        completedAt: row.completed_at || undefined,
        updatedAt: row.updated_at || new Date().toISOString(),
      };
    });

    const progressKey = getStorageKey('PROGRESS', userId);
    localStorage.setItem(progressKey, JSON.stringify(progressMap));

    // Map bookmarks
    const bookmarksList: BookmarkItem[] = bookmarksData.map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      courseId: row.course_id,
      levelId: row.level_id,
      lessonId: row.lesson_id,
      lessonTitle: {
        en: row.lesson_title_en || row.lesson_id,
        vi: row.lesson_title_vi || row.lesson_id,
      },
      createdAt: row.created_at,
    }));
    const bookmarksKey = getStorageKey('BOOKMARKS', userId);
    localStorage.setItem(bookmarksKey, JSON.stringify(bookmarksList));

    // Map notes
    const notesList: NoteItem[] = notesData.map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      courseId: row.course_id,
      levelId: row.level_id,
      lessonId: row.lesson_id,
      lessonTitle: {
        en: row.lesson_title_en || row.lesson_id,
        vi: row.lesson_title_vi || row.lesson_id,
      },
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
    const notesKey = getStorageKey('NOTES', userId);
    localStorage.setItem(notesKey, JSON.stringify(notesList));

    // Map topic mastery
    const topicMasteryRecord: Record<string, number> = {};
    const topicMasteryMap: Record<string, TopicMastery> = {};
    masteryData.forEach((row: any) => {
      topicMasteryRecord[row.topic_id] = row.percentage;
      topicMasteryMap[row.topic_id] = {
        topicId: row.topic_id,
        courseId: row.course_id,
        percentage: row.percentage,
        totalAttempts: row.total_attempts,
        successfulAttempts: row.successful_attempts,
        lastUpdated: row.last_updated,
      };
    });
    const masteryKey = getStorageKey('TOPIC_MASTERY', userId);
    if (masteryData.length > 0) {
      localStorage.setItem(masteryKey, JSON.stringify(topicMasteryMap));
    }

    const currentUser = getCurrentUser();
    const mergedUser: UserProfile = {
      ...currentUser,
      id: userId,
      email: profileData?.email || currentUser.email,
      displayName: profileData?.display_name || currentUser.displayName,
      avatar: profileData?.avatar || currentUser.avatar,
      preferredLanguage: profileData?.preferred_language || currentUser.preferredLanguage || 'en',
      role: profileData?.role || 'user',
      status: profileData?.status || 'pending_verification',
      emailVerified: Boolean(profileData?.email_verified),
      approvedAt: profileData?.approved_at,
      approvedBy: profileData?.approved_by,
      xp: profileData?.xp !== undefined ? profileData.xp : currentUser.xp,
      streak: profileData?.streak !== undefined ? profileData.streak : currentUser.streak,
      lastActiveDate: profileData?.last_active_date || currentUser.lastActiveDate,
      lessonProgress: progressMap,
      topicMastery: topicMasteryRecord,
      bookmarks: bookmarksList,
      notes: notesList,
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mergedUser));
    return mergedUser;
  } catch (err) {
    console.error('Error syncing data from Supabase:', err);
    return null;
  }
};

// Admin Learner Management: Fetch all registered users
export interface LearnerSummary {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  status: AccountStatus;
  emailVerified: boolean;
  ad_free?: boolean;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
  xp?: number;
}

export const fetchLearnerProfiles = async (): Promise<LearnerSummary[]> => {
  const current = getCurrentUser();

  // In production, unauthenticated or demo users cannot access learner profiles
  if (!import.meta.env.DEV && (current.role !== 'admin' || isDemoUser(current))) {
    return [];
  }

  if (isSupabaseConfigured && supabase && !isDemoUser(current)) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, display_name, role, status, email_verified, ad_free, created_at, approved_at, approved_by, xp')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        return data.map((p: any) => ({
          id: p.id,
          email: p.email,
          displayName: p.display_name || p.email,
          role: p.role || 'user',
          status: (p.status as AccountStatus) || (p.role === 'admin' ? 'active' : 'pending_approval'),
          emailVerified: Boolean(p.email_verified),
          ad_free: Boolean(p.ad_free),
          createdAt: p.created_at,
          approvedAt: p.approved_at,
          approvedBy: p.approved_by,
          xp: p.xp || 0,
        }));
      }
    } catch (err) {
      console.error('Error fetching learner profiles from Supabase:', err);
    }
  }

  // Fallback demo list (DEV preview only)
  if (!import.meta.env.DEV) {
    return [];
  }
  const demoList: LearnerSummary[] = [
    {
      id: current.id,
      email: current.email,
      displayName: current.displayName,
      role: current.role,
      status: current.status || 'active',
      emailVerified: current.emailVerified ?? true,
      ad_free: (current as any).ad_free ?? false,
      createdAt: current.createdAt,
      xp: current.xp,
    },
    {
      id: 'demo-learner-pending-1',
      email: 'alex.nguyen@example.com',
      displayName: 'Alex Nguyễn',
      role: 'user',
      status: 'pending_approval',
      emailVerified: true,
      ad_free: false,
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      xp: 0,
    },
    {
      id: 'demo-learner-pending-2',
      email: 'linh.tran@techvn.io',
      displayName: 'Linh Trần',
      role: 'user',
      status: 'pending_verification',
      emailVerified: false,
      ad_free: false,
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      xp: 0,
    },
    {
      id: 'demo-learner-suspended-1',
      email: 'spammer@botmail.com',
      displayName: 'Spam Account',
      role: 'user',
      status: 'suspended',
      emailVerified: true,
      ad_free: false,
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      xp: 10,
    }
  ];
  return demoList;
};

// Admin: Set learner status (active, suspended, etc.)
export const adminSetUserStatus = async (
  userId: string,
  newStatus: AccountStatus
): Promise<{ success: boolean; error?: string }> => {
  const current = getCurrentUser();
  if (current.role !== 'admin') {
    return { success: false, error: 'Only administrators can modify user approval status.' };
  }

  // DEV-ONLY Guard: In production builds, demo users cannot execute administrative operations
  if (!import.meta.env.DEV && isDemoUser(current)) {
    return { success: false, error: 'Administrative operations are not permitted for demo accounts in production.' };
  }

  // Only call Supabase RPC if this is a real admin modifying a real user account
  if (isSupabaseConfigured && supabase && !isDemoUser(current) && !isDemoUserId(userId)) {
    try {
      const { error } = await supabase.rpc('admin_set_user_status', {
        target_user_id: userId,
        new_status: newStatus,
      });

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Database error occurred' };
    }
  }

  // Update local session if target is current user
  if (current.id === userId) {
    current.status = newStatus;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(current));
  }

  return { success: true };
};

// Admin: Set learner Ad-Free entitlement status
export const adminSetUserAdFree = async (
  userId: string,
  adFree: boolean
): Promise<{ success: boolean; error?: string }> => {
  const current = getCurrentUser();
  if (current.role !== 'admin') {
    return { success: false, error: 'Only administrators can modify user ad-free entitlement.' };
  }

  if (!import.meta.env.DEV && isDemoUser(current)) {
    return { success: false, error: 'Administrative operations are not permitted for demo accounts in production.' };
  }

  if (isSupabaseConfigured && supabase && !isDemoUser(current) && !isDemoUserId(userId)) {
    try {
      const { error } = await supabase.rpc('admin_set_user_ad_free', {
        target_user_id: userId,
        is_ad_free: adFree,
      });

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Database error occurred' };
    }
  }

  if (current.id === userId) {
    (current as any).ad_free = adFree;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(current));
  }

  return { success: true };
};

// Badges Engine
export const getBadges = (): Badge[] => [
  {
    id: 'first_lesson',
    icon: '🚀',
    title: { en: 'First Step', vi: 'Bước Đi Đầu Tiên' },
    description: { en: 'Completed your first lesson.', vi: 'Hoàn thành bài học đầu tiên.' },
    category: 'lesson',
    unlockedAt: '2026-08-15',
  },
  {
    id: 'first_exercise',
    icon: '⚡',
    title: { en: 'Code Tinkerer', vi: 'Tay Thợ Sửa Mã' },
    description: { en: 'Passed all randomized exercises in a lesson.', vi: 'Hoàn thành tất cả bài tập ngẫu nhiên trong bài.' },
    category: 'exercise',
    unlockedAt: '2026-08-16',
  },
  {
    id: 'first_challenge',
    icon: '🏆',
    title: { en: 'Independent Coder', vi: 'Lập Trình Độc Lập' },
    description: { en: 'Solved a challenge without viewing the solution.', vi: 'Giải quyết thử thách mà không cần xem đáp án.' },
    category: 'challenge',
    unlockedAt: '2026-08-18',
  },
  {
    id: 'quiz_master',
    icon: '🎯',
    title: { en: 'Quiz Marksman', vi: 'Xạ Thủ Trắc Nghiệm' },
    description: { en: 'Scored 100% on a 10-question lesson quiz.', vi: 'Đạt điểm tuyệt đối 10/10 trong bài trắc nghiệm.' },
    category: 'quiz',
    unlockedAt: '2026-08-19',
  },
  {
    id: 'streak_master',
    icon: '🔥',
    title: { en: 'Consistent Learner', vi: 'Chiến Binh Kỷ Luật' },
    description: { en: 'Maintained a continuous daily study streak.', vi: 'Duy trì chuỗi học tập liên tục hàng ngày.' },
    category: 'streak',
    unlockedAt: '2026-08-20',
  },
  {
    id: 'python_basic_capstone',
    icon: '🐍',
    title: { en: 'Python Apprentice', vi: 'Môn Đồ Python' },
    description: { en: 'Completed Python Basic Level and built the capstone.', vi: 'Hoàn thành cấp độ Python Cơ Bản và xây dựng dự án.' },
    category: 'course',
  },
];
