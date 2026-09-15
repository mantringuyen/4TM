import { Lesson } from '../../types';
import { basicLessons } from './basic';
import { intermediateLessons } from './intermediate';
import { advancedLessons } from './advanced';

export const allJavascriptLessons: Lesson[] = [
  ...basicLessons,
  ...intermediateLessons,
  ...advancedLessons,
];

export const javascriptLessonMetadataList: Lesson[] = allJavascriptLessons.map(raw => ({
  id: raw.id,
  moduleId: raw.moduleId,
  levelId: raw.levelId,
  courseId: 'javascript',
  order: raw.order,
  topicId: raw.topicId,
  title: { en: raw.title.en, vi: raw.title.vi },
  summary: { en: raw.summary.en, vi: raw.summary.vi },
  estimatedMinutes: raw.estimatedMinutes || 15,
  learn: raw.learn,
  exercisePool: raw.exercisePool,
  challenge: raw.challenge,
  quizQuestionPool: raw.quizQuestionPool
}));

export default javascriptLessonMetadataList;
