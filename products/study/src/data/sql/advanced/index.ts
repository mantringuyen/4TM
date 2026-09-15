import { Lesson } from '../../../types';
export * from './module05';

import { module05Lessons } from './module05';

export const advancedLessons: Lesson[] = [
  ...module05Lessons,
];

export default advancedLessons;
