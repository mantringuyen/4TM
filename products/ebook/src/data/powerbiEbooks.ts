import { Book } from '../types';
import {
  POWERBI_HANDBOOK_BOOK,
  POWERBI_DEFINITIONS_BOOK,
  POWERBI_COMMON_ERRORS_BOOK,
  POWERBI_BEST_PRACTICES_BOOK,
  BUILDING_AN_EXECUTIVE_POWER_BI_REPORT_BOOK,
  POWER_BI_AND_DAX_PATTERNS_RECIPES_BOOK,
} from './migrated';

export const POWERBI_EBOOKS: Book[] = [
  // 1. Power BI Handbook (Migrated)
  POWERBI_HANDBOOK_BOOK,

  // 2. Power BI Definitions (Migrated)
  POWERBI_DEFINITIONS_BOOK,

  // 3. Power BI Common Errors (Migrated)
  POWERBI_COMMON_ERRORS_BOOK,

  // 4. Power BI Best Practices (Migrated)
  POWERBI_BEST_PRACTICES_BOOK,

  // 5. Building an Executive Power BI Report (Migrated in Batch 2)
  BUILDING_AN_EXECUTIVE_POWER_BI_REPORT_BOOK,

  // 6. Power BI & DAX Patterns / Recipes (Migrated in Batch 2)
  POWER_BI_AND_DAX_PATTERNS_RECIPES_BOOK,
];
