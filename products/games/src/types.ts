export type Language = 'en' | 'vi';

export type GameStatus =
  | 'in-development'
  | 'planned'
  | 'temporary'
  | 'test'
  | 'prototype'
  | 'archived'
  | 'internal';

export type GameId =
  | 'block-puzzle'
  | 'binary-search'
  | 'syntax-memory'
  | 'sorting-visualizer'
  | 'regex-door'
  | 'graph-pathfinder'
  | string;

export type GameCategory = 'puzzle' | 'algorithms' | 'memory' | 'visualizer' | 'syntax';

export type GameDifficulty = 'Casual' | 'Intermediate' | 'Master';

export interface GamePlatforms {
  web?: boolean;
  webPlayUrl?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
}

export interface Game {
  id: GameId;
  slug: string;
  title: string | { en: string; vi: string };
  genre: {
    en: string;
    vi: string;
  };
  category: GameCategory;
  difficulty: GameDifficulty;
  status: GameStatus;
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
  platforms?: GamePlatforms;
  screenshots?: string[];
}

export function getGameTitle(game: Game, language: Language): string {
  if (typeof game.title === 'string') return game.title;
  return game.title[language] || game.title.en;
}

/**
 * Programmatic filter rule: Only games with status 'in-development' or 'planned'
 * are visible on the public catalog. All temporary, test, prototype, archived,
 * or unknown statuses are strictly excluded.
 */
export function isPublicGameStatus(status: string): boolean {
  return status === 'in-development' || status === 'planned';
}
