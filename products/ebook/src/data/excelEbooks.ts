import { Book } from '../types';
import {
  EXCEL_HANDBOOK_BOOK,
  EXCEL_DEFINITIONS_BOOK,
  EXCEL_FORMULAS_RECIPES_BOOK,
  EXCEL_COMMON_ERRORS_BOOK,
  EXCEL_BEST_PRACTICES_BOOK,
  EXCEL_PRACTICAL_GUIDE_BOOK,
} from './migrated';

export const EXCEL_EBOOKS: Book[] = [
  // 1. Excel Handbook (Migrated)
  EXCEL_HANDBOOK_BOOK,

  // 2. Excel Definitions (Migrated)
  EXCEL_DEFINITIONS_BOOK,

  // 3. Excel Formulas Recipes (Migrated - Batch 6)
  EXCEL_FORMULAS_RECIPES_BOOK,

  // 4. Excel Common Errors (Migrated - Batch 7)
  EXCEL_COMMON_ERRORS_BOOK,

  // 5. Excel Best Practices (Migrated - Batch 7)
  EXCEL_BEST_PRACTICES_BOOK,

  // 6. Excel Practical Guide (Migrated - Batch 7)
  EXCEL_PRACTICAL_GUIDE_BOOK,
];

