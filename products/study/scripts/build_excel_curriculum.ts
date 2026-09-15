import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

// Import existing lessons to preserve and enhance their contents
import { basicLessons as origBasic } from '../src/data/excel/basicLessons';
import { intermediateLessons as origInt } from '../src/data/excel/intermediateLessons';
import { advancedLessons as origAdv } from '../src/data/excel/advancedLessons';

console.log('Building 24 Excel lessons...');
