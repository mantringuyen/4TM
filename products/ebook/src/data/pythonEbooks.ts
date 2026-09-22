import { Book } from '../types';
import { PYTHON_HANDBOOK } from './pythonHandbook';

/**
 * Consolidated Python Ebooks:
 * The 6 legacy placeholder publications (python-definitions, python-tips,
 * python-common-errors, python-best-practices, python-practical-guides, python-patterns)
 * have been retired and superseded by the 6 authoritative Phase 3B Python pilots
 * registered via PILOT_PUBLICATIONS.
 *
 * Only the authoritative Python Handbook is exported from this catalog module.
 */
export const PYTHON_EBOOKS: Book[] = [
  PYTHON_HANDBOOK,
];
