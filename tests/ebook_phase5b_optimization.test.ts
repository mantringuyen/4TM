import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { BOOK_METADATA_CATALOG } from '../products/ebook/src/data/metadataCatalog';
import { EBOOKS } from '../products/ebook/src/data/ebooks';
import { CONTENT_LOADERS, loadBookContent, getCachedBookContent, hasBookContentLoader } from '../products/ebook/src/data/loaders';

describe('Phase 5B: Ebook Client Bundle Optimization Test Suite', () => {
  it('1. Metadata catalog contains exactly 54 authoritative publications', () => {
    assert.equal(BOOK_METADATA_CATALOG.length, 54);
    assert.equal(EBOOKS.length, 54);
  });

  it('2. Topic and Domain distribution in metadata is complete and accurate', () => {
    const topicsCount: Record<string, number> = {};
    for (const book of EBOOKS) {
      topicsCount[book.categoryId] = (topicsCount[book.categoryId] || 0) + 1;
    }

    assert.equal(topicsCount['python'], 7, 'Python must have exactly 7 publications');
    assert.equal(topicsCount['sql'], 6, 'SQL must have exactly 6 publications');
    assert.equal(topicsCount['html'], 5, 'HTML must have exactly 5 publications');
    assert.equal(topicsCount['css'], 5, 'CSS must have exactly 5 publications');
    assert.equal(topicsCount['javascript'], 6, 'JavaScript must have exactly 6 publications');
    assert.equal(topicsCount['excel'], 6, 'Excel must have exactly 6 publications');
    assert.equal(topicsCount['powerbi'], 6, 'Power BI must have exactly 6 publications');
    assert.equal(topicsCount['ai'], 13, 'AI must have exactly 13 publications');
  });

  it('3. Every publication has a registered asynchronous content loader', () => {
    for (const book of EBOOKS) {
      assert.ok(hasBookContentLoader(book.slug), `Missing loader for slug ${book.slug}`);
      assert.ok(typeof CONTENT_LOADERS[book.slug] === 'function', `Loader for ${book.slug} is not a function`);
    }
  });

  it('4. All 54 loaders resolve their respective full publication accurately', async () => {
    for (const meta of EBOOKS) {
      const fullBook = await loadBookContent(meta.slug);
      assert.ok(fullBook, `Failed to load book for ${meta.slug}`);
      assert.equal(fullBook.id, meta.id, `ID mismatch for ${meta.slug}`);
      assert.equal(fullBook.slug, meta.slug, `Slug mismatch for ${meta.slug}`);
      assert.equal(fullBook.chapters.length, meta.chaptersCount, `Chapters count mismatch for ${meta.slug}`);
      assert.equal(fullBook.chapters.length, meta.chapters.length, `Meta chapters count mismatch for ${meta.slug}`);
      
      // Verify every chapter has sections
      for (const ch of fullBook.chapters) {
        assert.ok(Array.isArray(ch.sections), `Chapter ${ch.id} in ${meta.slug} missing sections array`);
        assert.ok(ch.sections.length > 0, `Chapter ${ch.id} in ${meta.slug} has 0 sections`);
      }
    }
  });

  it('5. In-memory cache returns loaded books immediately without re-import', async () => {
    const cached = getCachedBookContent('python-handbook');
    assert.ok(cached, 'Cached book should exist after loading');
    assert.equal(cached.slug, 'python-handbook');
    
    // Fast retrieval
    const start = Date.now();
    const retrieved = await loadBookContent('python-handbook');
    const elapsed = Date.now() - start;
    assert.equal(retrieved, cached);
    assert.ok(elapsed < 10, 'Cached lookup should take less than 10ms');
  });

  it('6. Legacy Python aliases map accurately to canonical slugs', () => {
    const LEGACY_SLUG_ALIASES: Record<string, string> = {
      'python-definitions': 'python-core-concepts-definitions',
      'python-tips': 'python-engineering-tips',
      'python-common-errors': 'python-common-errors-diagnosis',
      'python-best-practices': 'python-engineering-best-practices',
      'python-practical-guides': 'python-practical-guides-solutions',
      'python-patterns': 'python-patterns-recipes',
    };

    for (const [legacy, canonical] of Object.entries(LEGACY_SLUG_ALIASES)) {
      const canonicalBook = EBOOKS.find(b => b.slug === canonical);
      assert.ok(canonicalBook, `Canonical publication not found for legacy alias ${legacy} -> ${canonical}`);
      assert.ok(hasBookContentLoader(canonical), `Loader missing for canonical slug ${canonical}`);
    }
  });
});
