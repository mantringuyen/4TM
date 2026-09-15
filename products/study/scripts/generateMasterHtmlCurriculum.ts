import * as fs from 'fs';
import * as path from 'path';

// Let's create the master generator that produces all 20 lessons with 100% complete content directly into the destination files:
// 1. /src/data/html/htmlLessonMetadata.ts
// 2. /src/data/html/htmlBasicLessonsPart1.ts (L1-L4)
// 3. /src/data/html/htmlBasicLessonsPart2.ts (L5-L8)
// 4. /src/data/html/htmlIntermediateLessonsPart1.ts (L9-L11)
// 5. /src/data/html/htmlIntermediateLessonsPart2.ts (L12-L14)
// 6. /src/data/html/htmlAdvancedLessonsPart1.ts (L15-L17)
// 7. /src/data/html/htmlAdvancedLessonsPart2.ts (L18-L20)

console.log('Starting Master Generator for HTML Curriculum...');
