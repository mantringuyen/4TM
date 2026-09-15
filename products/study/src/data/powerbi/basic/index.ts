import { Lesson } from '../../../types';
import { module01Lessons } from './module01';
import { module02Lessons } from './module02';

export { module01Lessons } from './module01';
export { module02Lessons } from './module02';

export const basicLessons: Lesson[] = [
  ...module01Lessons,
  ...module02Lessons,
];

export default basicLessons;
