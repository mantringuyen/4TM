export interface RawQ {
  qEn: string;
  qVi: string;
  opts: { en: string; vi: string }[];
  ans: number[];
  expEn: string;
  expVi: string;
  diff?: 'easy' | 'medium' | 'hard';
  type?: 'single_choice' | 'multiple_choice';
}

export interface RawEx {
  type: 'write_code' | 'fix_code' | 'complete_code' | 'predict_output' | 'problem_solving';
  titleEn: string;
  titleVi: string;
  instEn: string;
  instVi: string;
  starter: string;
  solution: string;
  hintEn: string;
  hintVi: string;
  expEn: string;
  expVi: string;
}

export interface TopicDef {
  questions: RawQ[];
  exercises: RawEx[];
}

export const topicBanks: Record<number, TopicDef> = {};
