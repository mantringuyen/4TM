import { Lesson } from '../../../types';
export * from './module01';
export * from './module02';

import { module01Lessons } from './module01';
import { module02Lessons } from './module02';

export const intermediateLessons: Lesson[] = [
  ...module01Lessons,
  ...module02Lessons,
];

export default intermediateLessons;
