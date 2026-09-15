import fs from 'fs';

// 1. Basic Module 01 index
const basicMod1Index = `import { Lesson } from '../../../../types';
import { lesson01 } from './lesson01';
import { lesson02 } from './lesson02';
import { lesson03 } from './lesson03';
import { lesson04 } from './lesson04';

export { lesson01 } from './lesson01';
export { lesson02 } from './lesson02';
export { lesson03 } from './lesson03';
export { lesson04 } from './lesson04';

export const module01Lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
];

export default module01Lessons;
`;
fs.writeFileSync('src/data/css/basic/module01/index.ts', basicMod1Index, 'utf8');

// 2. Basic Module 02 index
const basicMod2Index = `import { Lesson } from '../../../../types';
import { lesson05 } from './lesson05';
import { lesson06 } from './lesson06';
import { lesson07 } from './lesson07';
import { lesson08 } from './lesson08';

export { lesson05 } from './lesson05';
export { lesson06 } from './lesson06';
export { lesson07 } from './lesson07';
export { lesson08 } from './lesson08';

export const module02Lessons: Lesson[] = [
  lesson05,
  lesson06,
  lesson07,
  lesson08,
];

export default module02Lessons;
`;
fs.writeFileSync('src/data/css/basic/module02/index.ts', basicMod2Index, 'utf8');

// 3. Basic Level index
const basicIndex = `import { Lesson } from '../../../types';
export * from './module01';
export * from './module02';

import { module01Lessons } from './module01';
import { module02Lessons } from './module02';

export const basicLessons: Lesson[] = [
  ...module01Lessons,
  ...module02Lessons,
];

export default basicLessons;
`;
fs.writeFileSync('src/data/css/basic/index.ts', basicIndex, 'utf8');

// 4. Intermediate Module 01 index
const intMod1Index = `import { Lesson } from '../../../../types';
import { lesson09 } from './lesson09';
import { lesson10 } from './lesson10';
import { lesson11 } from './lesson11';
import { lesson12 } from './lesson12';
import { lesson13 } from './lesson13';

export { lesson09 } from './lesson09';
export { lesson10 } from './lesson10';
export { lesson11 } from './lesson11';
export { lesson12 } from './lesson12';
export { lesson13 } from './lesson13';

export const module01Lessons: Lesson[] = [
  lesson09,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
];

export default module01Lessons;
`;
fs.writeFileSync('src/data/css/intermediate/module01/index.ts', intMod1Index, 'utf8');

// 5. Intermediate Module 02 index
const intMod2Index = `import { Lesson } from '../../../../types';
import { lesson14 } from './lesson14';
import { lesson15 } from './lesson15';
import { lesson16 } from './lesson16';
import { lesson17 } from './lesson17';
import { lesson18 } from './lesson18';

export { lesson14 } from './lesson14';
export { lesson15 } from './lesson15';
export { lesson16 } from './lesson16';
export { lesson17 } from './lesson17';
export { lesson18 } from './lesson18';

export const module02Lessons: Lesson[] = [
  lesson14,
  lesson15,
  lesson16,
  lesson17,
  lesson18,
];

export default module02Lessons;
`;
fs.writeFileSync('src/data/css/intermediate/module02/index.ts', intMod2Index, 'utf8');

// 6. Intermediate Level index
const intIndex = `import { Lesson } from '../../../types';
export * from './module01';
export * from './module02';

import { module01Lessons } from './module01';
import { module02Lessons } from './module02';

export const intermediateLessons: Lesson[] = [
  ...module01Lessons,
  ...module02Lessons,
];

export default intermediateLessons;
`;
fs.writeFileSync('src/data/css/intermediate/index.ts', intIndex, 'utf8');

// 7. Advanced Module 01 index
const advMod1Index = `import { Lesson } from '../../../../types';
import { lesson19 } from './lesson19';
import { lesson20 } from './lesson20';
import { lesson21 } from './lesson21';
import { lesson22 } from './lesson22';
import { lesson23 } from './lesson23';
import { lesson24 } from './lesson24';

export { lesson19 } from './lesson19';
export { lesson20 } from './lesson20';
export { lesson21 } from './lesson21';
export { lesson22 } from './lesson22';
export { lesson23 } from './lesson23';
export { lesson24 } from './lesson24';

export const module01Lessons: Lesson[] = [
  lesson19,
  lesson20,
  lesson21,
  lesson22,
  lesson23,
  lesson24,
];

export default module01Lessons;
`;
fs.writeFileSync('src/data/css/advanced/module01/index.ts', advMod1Index, 'utf8');

// 8. Advanced Level index
const advIndex = `import { Lesson } from '../../../types';
export * from './module01';

import { module01Lessons } from './module01';

export const advancedLessons: Lesson[] = [
  ...module01Lessons,
];

export default advancedLessons;
`;
fs.writeFileSync('src/data/css/advanced/index.ts', advIndex, 'utf8');

// 9. Root CSS index
const cssRootIndex = `export { basicLessons as cssBasicLessons } from './basic';
export { intermediateLessons as cssIntermediateLessons } from './intermediate';
export { advancedLessons as cssAdvancedLessons } from './advanced';
`;
fs.writeFileSync('src/data/css/index.ts', cssRootIndex, 'utf8');

console.log('All CSS aggregators configured successfully.');
