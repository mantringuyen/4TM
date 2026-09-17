import { Language } from '../types';

export const TRANSLATIONS = {
  en: {
    nav: {
      arcade: 'Game Arena',
      leaderboard: 'Scores',
      signIn: 'Sign In',
      signOut: 'Sign Out',
    },
    hero: {
      eyebrow: '4TM Interactive Playground',
      title: 'Browser-Native Computer Science Games',
      description:
        'Sharpen algorithmic reflexes, master data structures, and unravel syntax puzzles through real-time interactive challenges.',
      searchPlaceholder: 'Search games, algorithms, syntax...',
      allCategories: 'All Arenas',
      casual: 'Casual',
      intermediate: 'Intermediate',
      master: 'Master',
    },
    categories: {
      algorithms: 'Algorithms',
      memory: 'Memory & Logic',
      visualizer: 'Visualizers',
      syntax: 'Syntax & Regex',
    },
    card: {
      playNow: 'Launch Game',
      difficulty: 'Difficulty',
      rating: 'Score',
      estimate: 'Time',
    },
    playView: {
      backToCatalog: 'Exit to Arena',
      howToPlay: 'Mission & Rules',
      controls: 'Controls & Inputs',
      restart: 'Restart Game',
      bestScore: 'Personal Best',
      currentScore: 'Current Moves',
      timeElapsed: 'Time Elapsed',
      victory: 'Mission Accomplished!',
      tryAgain: 'Try Again',
    },
    footer: {
      tagline: 'Games — 4TM provides interactive browser-native challenges within the 4TM Ecosystem.',
      rights: 'All rights reserved.',
      backToEcosystem: 'Return to 4TM Ecosystem',
    },
  },
  vi: {
    nav: {
      arcade: 'Đấu Trường Game',
      leaderboard: 'Bảng Điểm',
      signIn: 'Đăng Nhập',
      signOut: 'Đăng Xuất',
    },
    hero: {
      eyebrow: 'Sân Chơi Tương Tác 4TM',
      title: 'Trò Chơi Khoa Học Máy Tính Trực Quan',
      description:
        'Rèn luyện tư duy thuật toán, cấu trúc dữ liệu và giải mã câu đố cú pháp thông qua các trò chơi tương tác chạy trực tiếp trên trình duyệt.',
      searchPlaceholder: 'Tìm trò chơi, thuật toán, regex...',
      allCategories: 'Tất Cả Thể Loại',
      casual: 'Dễ Tiếp Cận',
      intermediate: 'Thử Thách',
      master: 'Bậc Thầy',
    },
    categories: {
      algorithms: 'Thuật Toán',
      memory: 'Trí Nhớ & Logic',
      visualizer: 'Trực Quan Hóa',
      syntax: 'Cú Pháp & Regex',
    },
    card: {
      playNow: 'Chơi Ngay',
      difficulty: 'Độ Khó',
      rating: 'Đánh Giá',
      estimate: 'Thời Gian',
    },
    playView: {
      backToCatalog: 'Thoát Ra Đấu Trường',
      howToPlay: 'Luật Chơi & Mục Tiêu',
      controls: 'Thao Tác & Phím Bấm',
      restart: 'Chơi Lại Từ Đầu',
      bestScore: 'Kỷ Lục Cá Nhân',
      currentScore: 'Số Bước Hiện Tại',
      timeElapsed: 'Thời Gian',
      victory: 'Chúc Mừng! Bạn Đã Chiến Thắng!',
      tryAgain: 'Thử Lại',
    },
    footer: {
      tagline: 'Games — 4TM là nền tảng trò chơi tư duy logic và thuật toán thuộc Hệ sinh thái 4TM.',
      rights: 'Bảo lưu mọi quyền.',
      backToEcosystem: 'Về Cổng Hệ Sinh Thái 4TM',
    },
  },
};

export const LANGUAGE_STORAGE_KEY = '4tm_games_lang';
