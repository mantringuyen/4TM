import { Lesson } from '../../../types';
export * from './module03';
export * from './module04';

import { module03Lessons } from './module03';
import { module04Lessons } from './module04';

export const intermediateLessons: Lesson[] = [
  ...module03Lessons,
  ...module04Lessons,
];

export default intermediateLessons;
