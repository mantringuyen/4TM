import { Book } from '../types';

export type BookContentLoader = () => Promise<Book>;

export const CONTENT_LOADERS: Record<string, BookContentLoader> = {
  // 1. Python (7)
  'python-handbook': () => import('./pythonHandbook').then(m => m.PYTHON_HANDBOOK),
  'python-core-concepts-definitions': () => import('./pilots/definitionsPilot').then(m => m.DEFINITIONS_PILOT_BOOK),
  'python-engineering-tips': () => import('./pilots/tipsPilot').then(m => m.TIPS_PILOT_BOOK),
  'python-practical-guides-solutions': () => import('./pilots/practicalGuidesPilot').then(m => m.PRACTICAL_GUIDES_PILOT_BOOK),
  'python-common-errors-diagnosis': () => import('./pilots/commonErrorsPilot').then(m => m.COMMON_ERRORS_PILOT_BOOK),
  'python-engineering-best-practices': () => import('./pilots/bestPracticesPilot').then(m => m.BEST_PRACTICES_PILOT_BOOK),
  'python-patterns-recipes': () => import('./pilots/patternsPilot').then(m => m.PATTERNS_PILOT_BOOK),

  // 2. SQL (6)
  'sql-handbook': () => import('./migrated/sqlHandbook').then(m => m.SQL_HANDBOOK_BOOK),
  'sql-definitions': () => import('./migrated/sqlDefinitions').then(m => m.SQL_DEFINITIONS_BOOK),
  'sql-query-patterns': () => import('./migrated/sqlQueryPatterns').then(m => m.SQL_QUERY_PATTERNS_BOOK),
  'sql-common-errors': () => import('./migrated/sqlCommonErrors').then(m => m.SQL_COMMON_ERRORS_BOOK),
  'sql-best-practices': () => import('./migrated/sqlBestPractices').then(m => m.SQL_BEST_PRACTICES_BOOK),
  'sql-practical-guides': () => import('./migrated/sqlPracticalGuides').then(m => m.SQL_PRACTICAL_GUIDES_BOOK),

  // 3. HTML (5)
  'html-handbook': () => import('./migrated/htmlHandbook').then(m => m.HTML_HANDBOOK_BOOK),
  'html-definitions': () => import('./migrated/htmlDefinitions').then(m => m.HTML_DEFINITIONS_BOOK),
  'html-practical-guide': () => import('./migrated/htmlPracticalGuide').then(m => m.HTML_PRACTICAL_GUIDE_BOOK),
  'html-common-errors': () => import('./migrated/htmlCommonErrors').then(m => m.HTML_COMMON_ERRORS_BOOK),
  'html-best-practices': () => import('./migrated/htmlBestPractices').then(m => m.HTML_BEST_PRACTICES_BOOK),

  // 4. CSS (5)
  'css-handbook': () => import('./migrated/cssHandbook').then(m => m.CSS_HANDBOOK_BOOK),
  'css-definitions': () => import('./migrated/cssDefinitions').then(m => m.CSS_DEFINITIONS_BOOK),
  'css-practical-guide': () => import('./migrated/cssPracticalGuide').then(m => m.CSS_PRACTICAL_GUIDE_BOOK),
  'css-common-errors': () => import('./migrated/cssCommonErrors').then(m => m.CSS_COMMON_ERRORS_BOOK),
  'css-best-practices': () => import('./migrated/cssBestPractices').then(m => m.CSS_BEST_PRACTICES_BOOK),

  // 5. JavaScript (6)
  'javascript-handbook': () => import('./migrated/javascriptHandbook').then(m => m.JAVASCRIPT_HANDBOOK_BOOK),
  'javascript-definitions': () => import('./migrated/javascriptDefinitions').then(m => m.JAVASCRIPT_DEFINITIONS_BOOK),
  'javascript-practical-guide': () => import('./migrated/javascriptPracticalGuide').then(m => m.JAVASCRIPT_PRACTICAL_GUIDE_BOOK),
  'javascript-common-errors': () => import('./migrated/javascriptCommonErrors').then(m => m.JAVASCRIPT_COMMON_ERRORS_BOOK),
  'javascript-best-practices': () => import('./migrated/javascriptBestPractices').then(m => m.JAVASCRIPT_BEST_PRACTICES_BOOK),
  'javascript-patterns': () => import('./migrated/javascriptPatterns').then(m => m.JAVASCRIPT_PATTERNS_BOOK),

  // 6. Excel (6)
  'excel-handbook': () => import('./migrated/excelHandbook').then(m => m.EXCEL_HANDBOOK_BOOK),
  'excel-definitions': () => import('./migrated/excelDefinitions').then(m => m.EXCEL_DEFINITIONS_BOOK),
  'excel-formulas-recipes': () => import('./migrated/excelFormulasRecipes').then(m => m.EXCEL_FORMULAS_RECIPES_BOOK),
  'excel-common-errors': () => import('./migrated/excelCommonErrors').then(m => m.EXCEL_COMMON_ERRORS_BOOK),
  'excel-best-practices': () => import('./migrated/excelBestPractices').then(m => m.EXCEL_BEST_PRACTICES_BOOK),
  'excel-practical-guide': () => import('./migrated/excelPracticalGuide').then(m => m.EXCEL_PRACTICAL_GUIDE_BOOK),

  // 7. Power BI (6)
  'powerbi-handbook': () => import('./migrated/powerBiHandbook').then(m => m.POWERBI_HANDBOOK_BOOK),
  'powerbi-definitions': () => import('./migrated/powerBiDefinitions').then(m => m.POWERBI_DEFINITIONS_BOOK),
  'powerbi-common-errors': () => import('./migrated/powerBiCommonErrors').then(m => m.POWERBI_COMMON_ERRORS_BOOK),
  'powerbi-best-practices': () => import('./migrated/powerBiBestPractices').then(m => m.POWERBI_BEST_PRACTICES_BOOK),
  'building-an-executive-power-bi-report': () => import('./migrated/buildingAnExecutivePowerBiReport').then(m => m.BUILDING_AN_EXECUTIVE_POWER_BI_REPORT_BOOK),
  'power-bi-and-dax-patterns-recipes': () => import('./migrated/powerBiAndDaxPatternsRecipes').then(m => m.POWER_BI_AND_DAX_PATTERNS_RECIPES_BOOK),

  // 8. AI (13)
  'ai-fundamentals-handbook': () => import('./migrated/aiFundamentalsHandbook').then(m => m.AI_FUNDAMENTALS_HANDBOOK_BOOK),
  'ai-definitions': () => import('./migrated/aiDefinitions').then(m => m.AI_DEFINITIONS_BOOK),
  'prompt-engineering-guide': () => import('./migrated/promptEngineeringGuide').then(m => m.PROMPT_ENGINEERING_GUIDE_BOOK),
  'rag-architecture-handbook': () => import('./migrated/ragArchitectureHandbook').then(m => m.RAG_ARCHITECTURE_HANDBOOK_BOOK),
  'rag-patterns-recipes': () => import('./migrated/ragPatternsRecipes').then(m => m.RAG_PATTERNS_RECIPES_BOOK),
  'ai-agent-patterns': () => import('./migrated/aiAgentPatterns').then(m => m.AI_AGENT_PATTERNS_BOOK),
  'llm-common-errors': () => import('./migrated/llmCommonErrors').then(m => m.LLM_COMMON_ERRORS_BOOK),
  'ai-best-practices': () => import('./migrated/aiBestPractices').then(m => m.AI_BEST_PRACTICES_BOOK),
  'vector-embeddings-guide': () => import('./migrated/vectorEmbeddingsGuide').then(m => m.VECTOR_EMBEDDINGS_GUIDE_BOOK),
  'fine-tuning-handbook': () => import('./migrated/fineTuningHandbook').then(m => m.FINE_TUNING_HANDBOOK_BOOK),
  'ai-safety-alignment-definitions': () => import('./migrated/aiSafetyAlignmentDefinitions').then(m => m.AI_SAFETY_ALIGNMENT_DEFINITIONS_BOOK),
  'llm-eval-practical-guide': () => import('./migrated/llmEvalPracticalGuide').then(m => m.LLM_EVAL_PRACTICAL_GUIDE_BOOK),
  'gemini-api-recipes': () => import('./migrated/geminiApiRecipes').then(m => m.GEMINI_API_RECIPES_BOOK),
};

const bookCache = new Map<string, Book>();

export function hasBookContentLoader(slugOrId: string): boolean {
  return Boolean(CONTENT_LOADERS[slugOrId]);
}

export function getCachedBookContent(slugOrId: string): Book | null {
  return bookCache.get(slugOrId) || null;
}

export async function loadBookContent(slugOrId: string): Promise<Book | null> {
  if (bookCache.has(slugOrId)) {
    return bookCache.get(slugOrId)!;
  }

  const loader = CONTENT_LOADERS[slugOrId];
  if (!loader) {
    return null;
  }

  try {
    const rawBook = await loader();
    if (!rawBook) return null;

    // Enhance with standard domain metadata if not already present
    const domainIds =
      rawBook.categoryId === 'javascript'
        ? ['programming', 'web']
        : rawBook.categoryId === 'python'
        ? ['programming']
        : rawBook.categoryId === 'html' || rawBook.categoryId === 'css'
        ? ['web']
        : rawBook.categoryId === 'sql' || rawBook.categoryId === 'excel' || rawBook.categoryId === 'powerbi'
        ? ['data-analytics']
        : ['ai'];

    const fullBook: Book = {
      ...rawBook,
      fieldId: 'computer-science',
      domainIds: rawBook.domainIds || domainIds,
      topicId: rawBook.topicId || rawBook.categoryId,
    };

    bookCache.set(rawBook.slug, fullBook);
    bookCache.set(rawBook.id, fullBook);
    return fullBook;
  } catch (err) {
    console.error(`Failed to asynchronously load publication content for '${slugOrId}':`, err);
    throw err;
  }
}
