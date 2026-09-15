import { RawQ, RawEx } from '../banks/topicsData';
import { q, ex } from '../questionHelper';

export const all56TopicBanks: Record<number, { questions: RawQ[]; exercises: RawEx[] }> = {};

// Helper to register a topic
export function registerTopic(lessonNum: number, questions: RawQ[], exercises: RawEx[]) {
  all56TopicBanks[lessonNum] = { questions, exercises };
}
