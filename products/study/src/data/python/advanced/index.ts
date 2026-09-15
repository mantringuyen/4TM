import { Lesson } from '../../../types';
export * from './module01';
export * from './module02';
export * from './module03';
export * from './module04';
export * from './module05';

import { module01Lessons } from './module01';
import { module02Lessons } from './module02';
import { module03Lessons } from './module03';
import { module04Lessons } from './module04';
import { module05Lessons } from './module05';

export const advancedLessons: Lesson[] = [
  ...module01Lessons,
  ...module02Lessons,
  ...module03Lessons,
  ...module04Lessons,
  ...module05Lessons,
];

export default advancedLessons;
