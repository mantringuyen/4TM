import fs from 'fs';
import path from 'path';
import { q, ex } from './questionHelper';
import { RawQ, RawEx } from './banks/topicsData';
import { Lesson, QuizQuestion, ExerciseItem } from '../src/types';

import { basicLessons } from '../src/data/python/basicLessons';
import { pythonIntermediateLessonsPart1 } from '../src/data/python/intermediateLessonsPart1';
import { pythonIntermediateLessonsPart2 } from '../src/data/python/intermediateLessonsPart2';
import { pythonAdvancedLessonsPart1 } from '../src/data/python/advancedLessonsPart1';
import { pythonAdvancedLessonsPart2 } from '../src/data/python/advancedLessonsPart2';
import { pythonAdvancedLessonsPart3 } from '../src/data/python/advancedLessonsPart3';

const allLessons: Lesson[] = [
  ...basicLessons,
  ...pythonIntermediateLessonsPart1,
  ...pythonIntermediateLessonsPart2,
  ...pythonAdvancedLessonsPart1,
  ...pythonAdvancedLessonsPart2,
  ...pythonAdvancedLessonsPart3
];

console.log(`Processing all ${allLessons.length} lessons...`);
