import { CourseId, LevelId, Lesson } from '../types';
import { getLessonById as getStaticLessonById } from '../data/coursesData';

// Cache for loaded full lessons in memory
const lessonCache = new Map<string, Lesson>();

/**
 * Dynamically loads full lesson data on-demand (learn sections, exercisePool, quizQuestionPool, challenge).
 * This ensures the initial JavaScript bundle does not load the massive curriculum data chunks at application startup.
 */
export async function loadLessonDetails(
  courseId: CourseId,
  levelId: LevelId,
  lessonId: string
): Promise<Lesson | undefined> {
  const cacheKey = `${courseId}_${levelId}_${lessonId}`;
  if (lessonCache.has(cacheKey)) {
    return lessonCache.get(cacheKey);
  }

  // Check if statically loaded with full content already
  const staticResult = getStaticLessonById(courseId, levelId, lessonId);
  if (staticResult.lesson && staticResult.lesson.learn && staticResult.lesson.quizQuestionPool && staticResult.lesson.quizQuestionPool.length > 0) {
    lessonCache.set(cacheKey, staticResult.lesson);
    return staticResult.lesson;
  }

  if (courseId === 'python') {
    let fullLesson: Lesson | undefined;

    if (levelId === 'basic') {
      const mod = await import('../data/python/basic');
      fullLesson = mod.basicLessons.find(l => l.id === lessonId);
    } else if (levelId === 'intermediate') {
      const mod = await import('../data/python/intermediate');
      fullLesson = mod.intermediateLessons.find(l => l.id === lessonId);
    } else if (levelId === 'advanced') {
      const mod = await import('../data/python/advanced');
      fullLesson = mod.advancedLessons.find(l => l.id === lessonId);
    }

    // Comprehensive fallback search across all levels if levelId was mismatched
    if (!fullLesson) {
      const [bMod, iMod, aMod] = await Promise.all([
        import('../data/python/basic'),
        import('../data/python/intermediate'),
        import('../data/python/advanced'),
      ]);
      fullLesson = bMod.basicLessons.find(l => l.id === lessonId)
        || iMod.intermediateLessons.find(l => l.id === lessonId)
        || aMod.advancedLessons.find(l => l.id === lessonId);
    }

    if (fullLesson) {
      lessonCache.set(cacheKey, fullLesson);
      return fullLesson;
    }
  }

  if (courseId === 'sql') {
    let fullLesson: Lesson | undefined;

    if (levelId === 'basic') {
      const mod = await import('../data/sql/basic');
      fullLesson = mod.basicLessons.find(l => l.id === lessonId);
    } else if (levelId === 'intermediate') {
      const mod = await import('../data/sql/intermediate');
      fullLesson = mod.intermediateLessons.find(l => l.id === lessonId);
    } else if (levelId === 'advanced') {
      const mod = await import('../data/sql/advanced');
      fullLesson = mod.advancedLessons.find(l => l.id === lessonId);
    }

    // Comprehensive fallback search across all levels if levelId was mismatched
    if (!fullLesson) {
      const [bMod, iMod, aMod] = await Promise.all([
        import('../data/sql/basic'),
        import('../data/sql/intermediate'),
        import('../data/sql/advanced'),
      ]);
      fullLesson = bMod.basicLessons.find(l => l.id === lessonId)
        || iMod.intermediateLessons.find(l => l.id === lessonId)
        || aMod.advancedLessons.find(l => l.id === lessonId);
    }

    if (fullLesson) {
      lessonCache.set(cacheKey, fullLesson);
      return fullLesson;
    }
  }

  if (courseId === 'html') {
    let fullLesson: Lesson | undefined;

    if (levelId === 'basic') {
      const mod = await import('../data/html/basic');
      fullLesson = mod.basicLessons.find(l => l.id === lessonId);
    } else if (levelId === 'intermediate') {
      const mod = await import('../data/html/intermediate');
      fullLesson = mod.intermediateLessons.find(l => l.id === lessonId);
    } else if (levelId === 'advanced') {
      const mod = await import('../data/html/advanced');
      fullLesson = mod.advancedLessons.find(l => l.id === lessonId);
    }

    // Comprehensive fallback search across all levels if levelId was mismatched
    if (!fullLesson) {
      const [bMod, iMod, aMod] = await Promise.all([
        import('../data/html/basic'),
        import('../data/html/intermediate'),
        import('../data/html/advanced'),
      ]);
      fullLesson = bMod.basicLessons.find(l => l.id === lessonId)
        || iMod.intermediateLessons.find(l => l.id === lessonId)
        || aMod.advancedLessons.find(l => l.id === lessonId);
    }

    if (fullLesson) {
      lessonCache.set(cacheKey, fullLesson);
      return fullLesson;
    }
  }

  if (courseId === 'css') {
    let fullLesson: Lesson | undefined;

    if (levelId === 'basic') {
      const mod = await import('../data/css/basic');
      fullLesson = mod.basicLessons.find(l => l.id === lessonId);
    } else if (levelId === 'intermediate') {
      const mod = await import('../data/css/intermediate');
      fullLesson = mod.intermediateLessons.find(l => l.id === lessonId);
    } else if (levelId === 'advanced') {
      const mod = await import('../data/css/advanced');
      fullLesson = mod.advancedLessons.find(l => l.id === lessonId);
    }

    // Comprehensive fallback search across all levels if levelId was mismatched
    if (!fullLesson) {
      const [bMod, iMod, aMod] = await Promise.all([
        import('../data/css/basic'),
        import('../data/css/intermediate'),
        import('../data/css/advanced'),
      ]);
      fullLesson = bMod.basicLessons.find(l => l.id === lessonId)
        || iMod.intermediateLessons.find(l => l.id === lessonId)
        || aMod.advancedLessons.find(l => l.id === lessonId);
    }

    if (fullLesson) {
      lessonCache.set(cacheKey, fullLesson);
      return fullLesson;
    }
  }

  if (courseId === 'javascript') {
    let fullLesson: Lesson | undefined;

    if (levelId === 'basic') {
      const mod = await import('../data/javascript/basic');
      fullLesson = mod.basicLessons.find(l => l.id === lessonId);
    } else if (levelId === 'intermediate') {
      const mod = await import('../data/javascript/intermediate');
      fullLesson = mod.intermediateLessons.find(l => l.id === lessonId);
    } else if (levelId === 'advanced') {
      const mod = await import('../data/javascript/advanced');
      fullLesson = mod.advancedLessons.find(l => l.id === lessonId);
    }

    // Comprehensive fallback search across all levels if levelId was mismatched
    if (!fullLesson) {
      const [bMod, iMod, aMod] = await Promise.all([
        import('../data/javascript/basic'),
        import('../data/javascript/intermediate'),
        import('../data/javascript/advanced'),
      ]);
      fullLesson = bMod.basicLessons.find(l => l.id === lessonId)
        || iMod.intermediateLessons.find(l => l.id === lessonId)
        || aMod.advancedLessons.find(l => l.id === lessonId);
    }

    if (fullLesson) {
      lessonCache.set(cacheKey, fullLesson);
      return fullLesson;
    }
  }

  if (courseId === 'excel') {
    let fullLesson: Lesson | undefined;

    if (levelId === 'basic') {
      const mod = await import('../data/excel/basic');
      fullLesson = mod.basicLessons.find(l => l.id === lessonId);
    } else if (levelId === 'intermediate') {
      const mod = await import('../data/excel/intermediate');
      fullLesson = mod.intermediateLessons.find(l => l.id === lessonId);
    } else if (levelId === 'advanced') {
      const mod = await import('../data/excel/advanced');
      fullLesson = mod.advancedLessons.find(l => l.id === lessonId);
    }

    // Comprehensive fallback search across all levels if levelId was mismatched
    if (!fullLesson) {
      const [bMod, iMod, aMod] = await Promise.all([
        import('../data/excel/basic'),
        import('../data/excel/intermediate'),
        import('../data/excel/advanced'),
      ]);
      fullLesson = bMod.basicLessons.find(l => l.id === lessonId)
        || iMod.intermediateLessons.find(l => l.id === lessonId)
        || aMod.advancedLessons.find(l => l.id === lessonId);
    }

    if (fullLesson) {
      lessonCache.set(cacheKey, fullLesson);
      return fullLesson;
    }
  }

  if (courseId === 'powerbi') {
    let fullLesson: Lesson | undefined;

    if (levelId === 'basic') {
      const mod = await import('../data/powerbi/basic');
      fullLesson = mod.basicLessons.find(l => l.id === lessonId);
    } else if (levelId === 'intermediate') {
      const mod = await import('../data/powerbi/intermediate');
      fullLesson = mod.intermediateLessons.find(l => l.id === lessonId);
    } else if (levelId === 'advanced') {
      const mod = await import('../data/powerbi/advanced');
      fullLesson = mod.advancedLessons.find(l => l.id === lessonId);
    }

    // Comprehensive fallback search across all levels if levelId was mismatched
    if (!fullLesson) {
      const [bMod, iMod, aMod] = await Promise.all([
        import('../data/powerbi/basic'),
        import('../data/powerbi/intermediate'),
        import('../data/powerbi/advanced'),
      ]);
      fullLesson = bMod.basicLessons.find(l => l.id === lessonId)
        || iMod.intermediateLessons.find(l => l.id === lessonId)
        || aMod.advancedLessons.find(l => l.id === lessonId);
    }

    if (fullLesson) {
      lessonCache.set(cacheKey, fullLesson);
      return fullLesson;
    }
  }

  return staticResult.lesson;
}
