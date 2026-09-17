export type Language = 'en' | 'vi';

export type GameId = 'binary-search' | 'syntax-memory' | 'sorting-visualizer' | 'regex-door';

export type GameCategory = 'algorithms' | 'memory' | 'visualizer' | 'syntax';

export type GameDifficulty = 'Casual' | 'Intermediate' | 'Master';

export interface Game {
  id: GameId;
  slug: string;
  title: string;
  genre: {
    en: string;
    vi: string;
  };
  category: GameCategory;
  difficulty: GameDifficulty;
  badge: string;
  accentColor: string;
  rating: number;
  playEstimate: string;
  description: {
    en: string;
    vi: string;
  };
  objective: {
    en: string;
    vi: string;
  };
  controls: {
    en: string[];
    vi: string[];
  };
  techTags: string[];
}
