import { Lesson } from '../../types';

// Lightweight Lesson Stubs containing only navigation and indexing metadata
// Full lesson content (learn text, exercisePool, quizQuestionPool, challenge) is loaded on demand.
export interface LessonMetadataStub extends Omit<Lesson, 'learn' | 'exercisePool' | 'challenge' | 'quizQuestionPool' | 'project'> {
  learn?: Lesson['learn'];
  exercisePool?: Lesson['exercisePool'];
  challenge?: Lesson['challenge'];
  quizQuestionPool?: Lesson['quizQuestionPool'];
  project?: Lesson['project'];
}

// Generate the 56 lightweight lesson stubs
import { basicLessons } from './basicLessons';
import { pythonIntermediateLessonsPart1 } from './intermediateLessonsPart1';
import { pythonIntermediateLessonsPart2 } from './intermediateLessonsPart2';
import { pythonAdvancedLessonsPart1 } from './advancedLessonsPart1';
import { pythonAdvancedLessonsPart2 } from './advancedLessonsPart2';
import { pythonAdvancedLessonsPart3 } from './advancedLessonsPart3';

const allFullLessons = [
  ...basicLessons,
  ...pythonIntermediateLessonsPart1,
  ...pythonIntermediateLessonsPart2,
  ...pythonAdvancedLessonsPart1,
  ...pythonAdvancedLessonsPart2,
  ...pythonAdvancedLessonsPart3,
];

export const pythonLessonMetadataList: Lesson[] = allFullLessons.map(l => ({
  id: l.id,
  moduleId: l.moduleId,
  levelId: l.levelId,
  courseId: l.courseId,
  order: l.order,
  topicId: l.topicId,
  title: l.title,
  summary: l.summary,
  estimatedMinutes: l.estimatedMinutes,
  // Empty placeholders to fulfill Lesson interface statically; hydrated dynamically upon lesson open
  learn: undefined as any,
  exercisePool: [],
  challenge: undefined as any,
  quizQuestionPool: [],
}));
