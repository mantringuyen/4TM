import { Course, CourseId, LevelId, Lesson, Module } from '../types';
import { pythonCourse } from './pythonData';
import { excelCourse } from './excelData';
import { sqlCourse } from './sqlData';
import { powerBiCourse } from './powerBiData';
import { htmlCourse } from './htmlData';
import { cssCourse } from './cssData';
import { javascriptCourse } from './javascriptData';
import { aiCourseData } from './aiData';

/**
 * Core Displayed Courses
 */
export const coreCourses: Course[] = [
  pythonCourse,
  excelCourse,
  sqlCourse,
  powerBiCourse,
  htmlCourse,
  cssCourse,
  javascriptCourse,
  aiCourseData,
];

/**
 * Central registry of all active courses
 */
export const allCourses: Course[] = [
  pythonCourse,
  excelCourse,
  sqlCourse,
  powerBiCourse,
  htmlCourse,
  cssCourse,
  javascriptCourse,
  aiCourseData,
];

export const getCourseById = (id: CourseId): Course | undefined => {
  return allCourses.find(c => c.id === id);
};

export const getLevelById = (courseId: CourseId, levelId: LevelId) => {
  const course = getCourseById(courseId);
  return course?.levels[levelId];
};

export const getLessonById = (
  courseId: CourseId,
  levelId: LevelId,
  lessonId: string
): { lesson?: Lesson; module?: Module; course?: Course } => {
  const course = getCourseById(courseId);
  if (!course) return {};

  const level = course.levels[levelId];
  if (!level) return { course };

  for (const mod of level.modules) {
    const found = mod.lessons.find(l => l.id === lessonId);
    if (found) {
      return { lesson: found, module: mod, course };
    }
  }

  return { course };
};

export interface FirstAvailableLessonInfo {
  courseId: CourseId;
  levelId: LevelId;
  lessonId: string;
  lessonTitle?: { en: string; vi: string };
  isStarted: boolean;
  isCompleted: boolean;
}

export const getFirstAvailableLesson = (
  courseId: CourseId,
  userLessonProgress: Record<string, any> = {}
): FirstAvailableLessonInfo => {
  const course = getCourseById(courseId);
  if (!course) {
    return { courseId, levelId: 'basic', lessonId: '', isStarted: false, isCompleted: false };
  }

  const levelOrder: LevelId[] = ['basic', 'intermediate', 'advanced'];

  let firstFoundLesson: { levelId: LevelId; lessonId: string; lessonTitle: { en: string; vi: string } } | null = null;
  let allCompleted = true;

  for (const lvlKey of levelOrder) {
    const level = course.levels[lvlKey];
    if (!level) continue;

    for (const mod of level.modules) {
      for (const lesson of mod.lessons) {
        if (!firstFoundLesson) {
          firstFoundLesson = { levelId: lvlKey, lessonId: lesson.id, lessonTitle: lesson.title };
        }
        const prog = userLessonProgress[lesson.id];
        if (!prog?.isCompleted) {
          allCompleted = false;
          return {
            courseId,
            levelId: lvlKey,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            isStarted: Object.keys(userLessonProgress).some(id => {
              // check if any lesson in this course is recorded
              const lInfo = getLessonById(courseId, lvlKey, id);
              return !!lInfo.lesson;
            }),
            isCompleted: false,
          };
        }
      }
    }
  }

  if (firstFoundLesson) {
    return {
      courseId,
      levelId: firstFoundLesson.levelId,
      lessonId: firstFoundLesson.lessonId,
      lessonTitle: firstFoundLesson.lessonTitle,
      isStarted: true,
      isCompleted: allCompleted,
    };
  }

  return { courseId, levelId: 'basic', lessonId: '', isStarted: false, isCompleted: false };
};

export interface CourseSyllabusStats {
  totalLessons: number;
  totalExercises: number;
  totalChallenges: number;
  totalQuizzes: number;
  totalProjects: number;
  completedLessons: number;
  progressPercent: number;
  estimatedHours: number;
  levels: Record<LevelId, {
    lessonsCount: number;
    completedCount: number;
    exercisesCount: number;
    challengesCount: number;
    quizzesCount: number;
    projectsCount: number;
    progressPercent: number;
  }>;
}

export const getCourseSyllabusStats = (
  courseId: CourseId,
  userLessonProgress: Record<string, any> = {}
): CourseSyllabusStats => {
  const course = getCourseById(courseId);
  const result: CourseSyllabusStats = {
    totalLessons: 0,
    totalExercises: 0,
    totalChallenges: 0,
    totalQuizzes: 0,
    totalProjects: 0,
    completedLessons: 0,
    progressPercent: 0,
    estimatedHours: 0,
    levels: {
      basic: { lessonsCount: 0, completedCount: 0, exercisesCount: 0, challengesCount: 0, quizzesCount: 0, projectsCount: 0, progressPercent: 0 },
      intermediate: { lessonsCount: 0, completedCount: 0, exercisesCount: 0, challengesCount: 0, quizzesCount: 0, projectsCount: 0, progressPercent: 0 },
      advanced: { lessonsCount: 0, completedCount: 0, exercisesCount: 0, challengesCount: 0, quizzesCount: 0, projectsCount: 0, progressPercent: 0 },
    },
  };

  if (!course) return result;

  let totalMinutes = 0;

  (['basic', 'intermediate', 'advanced'] as LevelId[]).forEach(lvlKey => {
    const level = course.levels[lvlKey];
    if (!level) return;

    let lvlLessons = 0;
    let lvlCompleted = 0;
    let lvlExercises = 0;
    let lvlChallenges = 0;
    let lvlQuizzes = 0;
    let lvlProjects = 0;

    level.modules.forEach(mod => {
      mod.lessons.forEach(lesson => {
        lvlLessons++;
        totalMinutes += lesson.estimatedMinutes || 10;
        if (userLessonProgress[lesson.id]?.isCompleted) {
          lvlCompleted++;
        }
        lvlExercises += lesson.exercisePool?.length || 0;
        if (lesson.challenge) lvlChallenges++;
        lvlQuizzes += lesson.quizQuestionPool?.length || 0;
        if (lesson.project) lvlProjects++;
      });
    });

    result.levels[lvlKey] = {
      lessonsCount: lvlLessons,
      completedCount: lvlCompleted,
      exercisesCount: lvlExercises,
      challengesCount: lvlChallenges,
      quizzesCount: lvlQuizzes,
      projectsCount: lvlProjects,
      progressPercent: lvlLessons > 0 ? Math.round((lvlCompleted / lvlLessons) * 100) : 0,
    };

    result.totalLessons += lvlLessons;
    result.completedLessons += lvlCompleted;
    result.totalExercises += lvlExercises;
    result.totalChallenges += lvlChallenges;
    result.totalQuizzes += lvlQuizzes;
    result.totalProjects += lvlProjects;
  });

  result.progressPercent = result.totalLessons > 0 ? Math.round((result.completedLessons / result.totalLessons) * 100) : 0;
  result.estimatedHours = Math.max(4, Math.round(totalMinutes / 60) + 4);

  return result;
};

export const getAllLevelLessonIds = (courseId: CourseId): Record<LevelId, string[]> => {
  const course = getCourseById(courseId);
  const result: Record<LevelId, string[]> = {
    basic: [],
    intermediate: [],
    advanced: [],
  };

  if (!course) return result;

  (['basic', 'intermediate', 'advanced'] as LevelId[]).forEach(levelId => {
    const level = course.levels[levelId];
    if (level) {
      level.modules.forEach(mod => {
        mod.lessons.forEach(l => result[levelId].push(l.id));
      });
    }
  });

  return result;
};

export interface NextLessonInfo {
  hasNextLesson: boolean;
  nextCourseId?: CourseId;
  nextLevelId?: LevelId;
  nextLessonId?: string;
  nextLessonTitle?: { en: string; vi: string };
  isCourseComplete?: boolean;
}

export const getNextLessonInfo = (
  courseId: CourseId,
  levelId: LevelId,
  lessonId: string
): NextLessonInfo => {
  const course = getCourseById(courseId);
  if (!course) return { hasNextLesson: false };

  const currentLevel = course.levels[levelId];
  if (!currentLevel) return { hasNextLesson: false };

  // All lessons in current level in linear order
  const currentLevelLessons: Lesson[] = [];
  currentLevel.modules.forEach(m => {
    currentLevelLessons.push(...m.lessons);
  });

  const currentIndex = currentLevelLessons.findIndex(l => l.id === lessonId);
  if (currentIndex !== -1 && currentIndex < currentLevelLessons.length - 1) {
    const nextLesson = currentLevelLessons[currentIndex + 1];
    return {
      hasNextLesson: true,
      nextCourseId: courseId,
      nextLevelId: levelId,
      nextLessonId: nextLesson.id,
      nextLessonTitle: nextLesson.title,
    };
  }

  // If last lesson in level, check next level
  const levelOrder: LevelId[] = ['basic', 'intermediate', 'advanced'];
  const curLvlIdx = levelOrder.indexOf(levelId);
  if (curLvlIdx !== -1 && curLvlIdx < levelOrder.length - 1) {
    const nextLevelId = levelOrder[curLvlIdx + 1];
    const nextLevel = course.levels[nextLevelId];
    if (nextLevel && nextLevel.modules.length > 0 && nextLevel.modules[0].lessons.length > 0) {
      const nextLesson = nextLevel.modules[0].lessons[0];
      return {
        hasNextLesson: true,
        nextCourseId: courseId,
        nextLevelId: nextLevelId,
        nextLessonId: nextLesson.id,
        nextLessonTitle: nextLesson.title,
      };
    }
  }

  return {
    hasNextLesson: false,
    isCourseComplete: true,
  };
};

export interface SearchResultItem {
  type: 'course' | 'level' | 'lesson';
  courseId: CourseId;
  courseTitle: string;
  levelId?: LevelId;
  lessonId?: string;
  title: string;
  snippet: string;
}

export const searchPlatformContent = (query: string, language: 'en' | 'vi'): SearchResultItem[] => {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const results: SearchResultItem[] = [];

  allCourses.forEach(course => {
    const courseTitle = course.title[language] || course.title.en;
    const courseDesc = course.description[language] || course.description.en;

    if (courseTitle.toLowerCase().includes(q) || courseDesc.toLowerCase().includes(q)) {
      results.push({
        type: 'course',
        courseId: course.id,
        courseTitle,
        title: courseTitle,
        snippet: courseDesc,
      });
    }

    (['basic', 'intermediate', 'advanced'] as LevelId[]).forEach(levelId => {
      const level = course.levels[levelId];
      if (!level) return;

      level.modules.forEach(mod => {
        mod.lessons.forEach(lesson => {
          const lTitle = lesson.title[language] || lesson.title.en;
          const lSummary = lesson.summary[language] || lesson.summary.en;
          const lIntro = lesson.learn.introduction[language] || lesson.learn.introduction.en;
          const lTopic = lesson.topicId;

          if (
            lTitle.toLowerCase().includes(q) ||
            lSummary.toLowerCase().includes(q) ||
            lIntro.toLowerCase().includes(q) ||
            lTopic.toLowerCase().includes(q)
          ) {
            results.push({
              type: 'lesson',
              courseId: course.id,
              courseTitle,
              levelId,
              lessonId: lesson.id,
              title: `${lTitle} (${courseTitle} - ${level.title[language] || level.title.en})`,
              snippet: lSummary,
            });
          }
        });
      });
    });
  });

  return results.slice(0, 10);
};
