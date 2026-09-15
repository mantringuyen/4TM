import fs from 'fs';
import path from 'path';
import { RawQ, RawEx } from './banks/topicsData';

// Helper to create multiple choice / single choice questions
export function q(
  qEn: string,
  qVi: string,
  opts: [string, string][],
  ans: number[],
  expEn: string,
  expVi: string,
  diff: 'easy' | 'medium' | 'hard' = 'medium',
  type: 'single_choice' | 'multiple_choice' = 'single_choice'
): RawQ {
  return {
    qEn,
    qVi,
    opts: opts.map(([en, vi]) => ({ en, vi })),
    ans,
    expEn,
    expVi,
    diff,
    type
  };
}

// Helper to create exercises
export function ex(
  type: 'write_code' | 'fix_code' | 'complete_code' | 'predict_output' | 'problem_solving',
  titleEn: string,
  titleVi: string,
  instEn: string,
  instVi: string,
  starter: string,
  solution: string,
  hintEn: string,
  hintVi: string,
  expEn: string,
  expVi: string
): RawEx {
  return {
    type,
    titleEn,
    titleVi,
    instEn,
    instVi,
    starter,
    solution,
    hintEn,
    hintVi,
    expEn,
    expVi
  };
}
