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
      title: 'Browser-Native Computer Science & Puzzle Games',
      description:
        'Sharpen spatial logic, master algorithmic reflexes, and unblock challenges through real-time browser-native games.',
      searchPlaceholder: 'Search games, puzzles, algorithms...',
      allCategories: 'All Categories',
      casual: 'Casual',
      intermediate: 'Intermediate',
      master: 'Master',
    },
    status: {
      inDevelopment: 'In Development',
      planned: 'Planned',
      filterAll: 'All Statuses',
      label: 'Status',
    },
    categories: {
      puzzle: 'Spatial Puzzle',
      algorithms: 'Algorithms',
      memory: 'Memory & Logic',
      visualizer: 'Visualizers',
      syntax: 'Syntax & Regex',
    },
    platforms: {
      title: 'Supported Platforms',
      web: 'Web Play',
      appStore: 'App Store',
      googlePlay: 'Google Play',
      comingSoon: 'Coming Soon',
    },
    card: {
      playNow: 'Play Web',
      viewDetails: 'View Game',
      difficulty: 'Difficulty',
      rating: 'Score',
      estimate: 'Time',
      status: 'Status',
    },
    catalog: {
      emptyTitle: 'No Games Found',
      emptyDesc: 'No games match your current filter criteria. Try adjusting your search or category filter.',
      resetFilters: 'Reset Filters',
    },
    playView: {
      backToCatalog: 'Back to Catalog',
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
      title: 'Trò Chơi Khoa Học Máy Tính & Xếp Hình Trực Quan',
      description:
        'Rèn luyện tư duy không gian, phản xạ thuật toán và giải mã câu đố logic thông qua các trò chơi tương tác chạy trực tiếp trên trình duyệt.',
      searchPlaceholder: 'Tìm trò chơi, xếp gạch, thuật toán...',
      allCategories: 'Tất Cả Thể Loại',
      casual: 'Dễ Tiếp Cận',
      intermediate: 'Thử Thách',
      master: 'Bậc Thầy',
    },
    status: {
      inDevelopment: 'Đang Phát Triển',
      planned: 'Dự Kiến',
      filterAll: 'Tất Cả Trạng Thái',
      label: 'Trạng Thái',
    },
    categories: {
      puzzle: 'Xếp Hình & Logic',
      algorithms: 'Thuật Toán',
      memory: 'Trí Nhớ & Logic',
      visualizer: 'Trực Quan Hóa',
      syntax: 'Cú Pháp & Regex',
    },
    platforms: {
      title: 'Nền Tảng Hỗ Trợ',
      web: 'Chơi Trên Web',
      appStore: 'App Store',
      googlePlay: 'Google Play',
      comingSoon: 'Sắp Ra Mắt',
    },
    card: {
      playNow: 'Chơi Trên Web',
      viewDetails: 'Xem Chi Tiết',
      difficulty: 'Độ Khó',
      rating: 'Đánh Giá',
      estimate: 'Thời Gian',
      status: 'Trạng Thái',
    },
    catalog: {
      emptyTitle: 'Không Tìm Thấy Trò Chơi',
      emptyDesc: 'Không có trò chơi nào phù hợp với bộ lọc hiện tại. Vui lòng thử tìm kiếm hoặc chọn danh mục khác.',
      resetFilters: 'Xóa Bộ Lọc',
    },
    playView: {
      backToCatalog: 'Quay Lại Danh Mục',
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
