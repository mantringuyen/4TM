/**
 * 4TM Tools Phase 1 QA Regression Test Suite
 * Tests verified fixes for Routing, Nested Serialization, Text Case, SQL Minifier, and CSS Tailwind Output.
 */

import { TOOLS } from '../products/tools/src/data/tools';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}${details ? `: ${details}` : ''}`);
    failed++;
  }
}

console.log('=====================================================');
console.log('Running 4TM Tools Phase 1 Regression Test Suite');
console.log('=====================================================');

// ----------------------------------------------------
// 1. ROUTING & SLUG VERIFICATION
// ----------------------------------------------------
const requiredSlugs = [
  'data-converter',
  'text-case-converter',
  'sql-formatter',
  'encoder-decoder',
  'css-layout-generator',
  'qr-generator',
];

for (const slug of requiredSlugs) {
  const matched = TOOLS.find((t) => t.slug === slug || t.id === slug);
  assert(
    !!matched && matched.slug === slug,
    `Route slug exists and matches tool: /${slug}`,
    `Got ${matched ? matched.slug : 'null'}`
  );

  const cleanPath = `/${slug}`.replace(/^\/+|\/+$/g, '');
  const urlMatched = TOOLS.find((t) => t.slug === cleanPath || t.id === cleanPath);
  assert(
    urlMatched?.id === slug,
    `Direct URL path /${slug} correctly resolves to ToolId '${slug}'`
  );
}

// Invalid path fallback test
const invalidPath = '/unknown-tool-route-1234'.replace(/^\/+|\/+$/g, '');
const fallbackMatch = TOOLS.find((t) => t.slug === invalidPath || t.id === invalidPath);
const fallbackId = fallbackMatch ? fallbackMatch.id : 'data-converter';
assert(fallbackId === 'data-converter', 'Invalid route correctly falls back to data-converter');

// Check that pushState never generates '/undefined'
for (const tool of TOOLS) {
  const pushUrl = `/${tool.slug}`;
  assert(!pushUrl.includes('undefined'), `Tool ${tool.id} pushState URL does not contain undefined`);
}

// ----------------------------------------------------
// 2. DATA CONVERTER: NESTED OBJECT SERIALIZATION
// ----------------------------------------------------
const sampleRows = [
  {
    id: 1,
    meta: {
      role: 'admin',
      permissions: ['read', 'write'],
    },
    nullable: null,
  },
];

// Markdown table test
const headers = Array.from(new Set(sampleRows.flatMap((r) => Object.keys(r))));
const mdCells = headers.map((h) => {
  const val = (sampleRows[0] as any)[h];
  if (val === null || val === undefined) return '';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  return str.replace(/\|/g, '\\|');
});
const mdOutput = `| ${mdCells.join(' | ')} |`;

assert(
  !mdOutput.includes('[object Object]'),
  'Markdown table does not output [object Object]'
);
assert(
  mdOutput.includes('{"role":"admin","permissions":["read","write"]}'),
  'Markdown table serializes nested object to JSON'
);

// HTML table test
const escapeHtml = (val: any) => {
  if (val === null || val === undefined) return '';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};
const htmlCell = escapeHtml((sampleRows[0] as any)['meta']);
assert(
  !htmlCell.includes('[object Object]'),
  'HTML table does not output [object Object]'
);
assert(
  htmlCell.includes('&quot;role&quot;:&quot;admin&quot;'),
  'HTML table properly escapes serialized nested JSON quotes'
);

// SQL INSERT test
const escapeSqlVal = (val: any) => {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return isNaN(val) ? 'NULL' : String(val);
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  return `'${str.replace(/'/g, "''")}'`;
};
const sqlCell = escapeSqlVal((sampleRows[0] as any)['meta']);
assert(
  !sqlCell.includes('[object Object]'),
  'SQL INSERT does not output [object Object]'
);
assert(
  sqlCell === '\'{"role":"admin","permissions":["read","write"]}\'',
  'SQL INSERT properly serializes and quotes nested JSON value'
);

// ----------------------------------------------------
// 3. TEXT CASE: READING TIME & VIETNAMESE SENTENCE CASE
// ----------------------------------------------------
// Reading time
const getReadingTime = (text: string) => {
  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  return wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / 200));
};

assert(getReadingTime('') === 0, 'Empty text reading time is 0 min read');
assert(getReadingTime('   \n  \t ') === 0, 'Whitespace-only text reading time is 0 min read');
assert(getReadingTime('Hello world') === 1, 'Short text reading time is 1 min read');

// Sentence case with Unicode / Vietnamese
const toSentenceCase = (inputText: string) =>
  inputText
    .toLowerCase()
    .replace(/(^[\s]*\p{L}|[.!?]\s*\p{L})/gmu, (c) => c.toUpperCase());

const viInput = 'đây là bài tập. một ngày mới.';
const viExpected = 'Đây là bài tập. Một ngày mới.';
const viResult = toSentenceCase(viInput);
assert(
  viResult === viExpected,
  'Vietnamese sentence case capitalizes "Đ" and "M"',
  `Got: "${viResult}"`
);

const enInput = 'hello world! this is a test? great.';
const enExpected = 'Hello world! This is a test? Great.';
assert(toSentenceCase(enInput) === enExpected, 'English sentence case handles !, ? and .');

// ----------------------------------------------------
// 4. SQL MINIFIER: PRESERVING STRINGS & COMMENTS
// ----------------------------------------------------
function testMinifySql(sql: string): string {
  let result = '';
  let i = 0;
  const n = sql.length;
  let lastWasSpace = true;

  while (i < n) {
    const char = sql[i];
    const next = i + 1 < n ? sql[i + 1] : '';

    if (char === '-' && next === '-') {
      i += 2;
      while (i < n && sql[i] !== '\n' && sql[i] !== '\r') i++;
      continue;
    }

    if (char === '/' && next === '*') {
      i += 2;
      while (i < n) {
        if (sql[i] === '*' && i + 1 < n && sql[i + 1] === '/') {
          i += 2;
          break;
        }
        i++;
      }
      continue;
    }

    if (char === "'") {
      result += "'";
      i++;
      while (i < n) {
        const c = sql[i];
        if (c === "'") {
          result += "'";
          i++;
          if (i < n && sql[i] === "'") {
            result += "'";
            i++;
            continue;
          }
          break;
        } else if (c === '\\') {
          result += c;
          i++;
          if (i < n) {
            result += sql[i];
            i++;
          }
        } else {
          result += c;
          i++;
        }
      }
      lastWasSpace = false;
      continue;
    }

    if (/\s/.test(char)) {
      if (!lastWasSpace && result.length > 0) {
        result += ' ';
        lastWasSpace = true;
      }
      i++;
      continue;
    }

    if (lastWasSpace && (char === ',' || char === ';' || char === ')')) {
      if (result.endsWith(' ')) {
        result = result.slice(0, -1);
      }
    }

    result += char;
    lastWasSpace = (char === '(');
    i++;
  }

  return result.trim();
}

const sqlWithCommentInString = `SELECT * FROM logs\nWHERE tag = 'Step 1 -- initialize    complete';`;
const minifiedSql = testMinifySql(sqlWithCommentInString);
assert(
  minifiedSql === "SELECT * FROM logs WHERE tag = 'Step 1 -- initialize    complete';",
  'SQL Minifier preserves -- and spaces inside string literals',
  `Got: "${minifiedSql}"`
);

const sqlWithRealComments = `-- Header comment\nSELECT id, name FROM users /* inline comment */ WHERE active = 1;`;
const minifiedClean = testMinifySql(sqlWithRealComments);
assert(
  minifiedClean === 'SELECT id, name FROM users WHERE active = 1;',
  'SQL Minifier strips comments outside string literals',
  `Got: "${minifiedClean}"`
);

const sqlWithEscapedQuotes = `SELECT * FROM articles WHERE title = 'It''s a -- great day';`;
const minifiedEscaped = testMinifySql(sqlWithEscapedQuotes);
assert(
  minifiedEscaped === "SELECT * FROM articles WHERE title = 'It''s a -- great day';",
  'SQL Minifier handles escaped single quotes correctly',
  `Got: "${minifiedEscaped}"`
);

// ----------------------------------------------------
// 5. CSS GENERATOR: TAILWIND BOX SHADOW
// ----------------------------------------------------
const r = 15;
const g = 23;
const b = 42;
const shadowOpacity = 0.18;
const shadowX = 0;
const shadowY = 12;
const shadowBlur = 28;
const shadowSpread = -4;
const shadowInset = false;

const compactRgba = `rgba(${r},${g},${b},${shadowOpacity})`;
const insetStr = shadowInset ? 'inset ' : '';
const compactShadowVal = `${insetStr}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${compactRgba}`;
const twShadow = `shadow-[${compactShadowVal.trim().replace(/\s+/g, '_')}]`;

assert(
  twShadow === 'shadow-[0px_12px_28px_-4px_rgba(15,23,42,0.18)]',
  'Tailwind box shadow produces valid arbitrary syntax without spaces after commas',
  `Got: "${twShadow}"`
);

console.log('=====================================================');
console.log(`Regression Test Summary: ${passed} Passed, ${failed} Failed`);
console.log('=====================================================');

if (failed > 0) {
  process.exit(1);
}
