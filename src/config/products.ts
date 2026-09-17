/**
 * Centralized 4TM Ecosystem Product Configuration
 * Source of truth for canonical domains, subdomains, and product representations.
 * Adheres strictly to the naming pattern: "Product Name — 4TM"
 */

import { Language } from '../i18n/translations';

export const ECOSYSTEM_DOMAIN = '4tm.io.vn';

export interface EcosystemProductItem {
  id: 'study' | 'apps' | 'games' | 'ebook' | 'tools';
  name: string; // "Product Name — 4TM"
  shortName: string; // e.g. "Study", "Apps", "Games"
  href: string;
  subdomain: string;
  descriptor: {
    en: string;
    vi: string;
  };
  description: {
    en: string;
    vi: string;
  };
  status: 'active' | 'in-development' | 'showcase';
  statusLabel: {
    en: string;
    vi: string;
  };
  statusBadgeClass: string;
  ctaText: {
    en: string;
    vi: string;
  };
  icon: 'GraduationCap' | 'LayoutGrid' | 'Gamepad2' | 'BookOpen' | 'Wrench';
  highlights: {
    en: string[];
    vi: string[];
  };
}

export const ECOSYSTEM_PRODUCTS_CONFIG: EcosystemProductItem[] = [
  {
    id: 'study',
    name: 'Study — 4TM',
    shortName: 'Study',
    href: 'https://study.4tm.io.vn',
    subdomain: 'study.4tm.io.vn',
    descriptor: {
      en: 'Interactive Learning Platform',
      vi: 'Nền Tảng Lập Trình Tương Tác',
    },
    description: {
      en: 'Master programming through interactive hands-on feedback, structured curricula (Basic, Intermediate, Advanced), quizzes, and client-side code execution.',
      vi: 'Học lập trình thực chiến qua phản hồi tương tác tức thì, lộ trình bài bản (Cơ bản, Trung cấp, Nâng cao), câu đố và trình chạy code ngay trên trình duyệt.',
    },
    status: 'active',
    statusLabel: {
      en: 'Active Platform',
      vi: 'Nền Tảng Hoạt Động',
    },
    statusBadgeClass: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20',
    ctaText: {
      en: 'Launch Platform',
      vi: 'Khởi Chạy Nền Tảng',
    },
    icon: 'GraduationCap',
    highlights: {
      en: [
        'Interactive client-side execution (Python, SQL, Web)',
        'Structured 5-stage progressive learning methodology',
        'Offline-first client-side persistence and review engine',
      ],
      vi: [
        'Trình chạy code tương tác không độ trễ (Python, SQL, Web)',
        'Quy trình học tập 5 bước tiến bộ từng ngày',
        'Học tập ngoại tuyến và hệ thống ôn tập tự động',
      ],
    },
  },
  {
    id: 'apps',
    name: 'Apps — 4TM',
    shortName: 'Apps',
    href: 'https://apps.4tm.io.vn',
    subdomain: 'apps.4tm.io.vn',
    descriptor: {
      en: 'Application Ecosystem',
      vi: 'Hệ Sinh Thái Ứng Dụng Web',
    },
    description: {
      en: 'Curated directory and launchpad for modern web software, productivity tools, and specialized business applications built across the 4TM ecosystem.',
      vi: 'Danh mục và cổng khởi chạy các phần mềm web hiện đại, công cụ năng suất và ứng dụng chuyên ngành được phát triển trong hệ sinh thái 4TM.',
    },
    status: 'showcase',
    statusLabel: {
      en: 'App Ecosystem',
      vi: 'Hệ Sinh Thái Apps',
    },
    statusBadgeClass: 'bg-amber-600/10 text-amber-800 dark:text-amber-400 border-amber-600/25',
    ctaText: {
      en: 'Discover Apps',
      vi: 'Khám Phá Ứng Dụng',
    },
    icon: 'LayoutGrid',
    highlights: {
      en: [
        'Curated ecosystem directory of production web apps',
        'Live interactive demonstrations and web prototypes',
        'Consistent visual identity and unified account access',
      ],
      vi: [
        'Danh mục phần mềm web thực tế được kiểm duyệt',
        'Bản dùng thử tương tác và mẫu ứng dụng sống động',
        'Đồng bộ nhận diện thương hiệu và tài khoản đăng nhập',
      ],
    },
  },
  {
    id: 'games',
    name: 'Games — 4TM',
    shortName: 'Games',
    href: 'https://games.4tm.io.vn',
    subdomain: 'games.4tm.io.vn',
    descriptor: {
      en: 'Interactive Game Ecosystem',
      vi: 'Hệ Sinh Thái Trò Chơi Web',
    },
    description: {
      en: 'Lightweight browser-native games, gamified algorithmic puzzles, and interactive creative canvas experiments designed for fast, frictionless play.',
      vi: 'Các trò chơi web gọn nhẹ, câu đố thuật toán được game hóa và các trải nghiệm đồ họa canvas tương tác mượt mà không cần cài đặt.',
    },
    status: 'showcase',
    statusLabel: {
      en: 'Game Ecosystem',
      vi: 'Hệ Sinh Thái Games',
    },
    statusBadgeClass: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
    ctaText: {
      en: 'Play & Explore',
      vi: 'Chơi & Trải Nghiệm',
    },
    icon: 'Gamepad2',
    highlights: {
      en: [
        'Instant zero-installation browser gaming',
        'Gamified programming challenges and logical puzzles',
        'Interactive 2D/3D canvas and WebGL visual experiences',
      ],
      vi: [
        'Chơi ngay tức thì trên trình duyệt không cần cài đặt',
        'Thử thách lập trình và câu đố tư duy logic lôi cuốn',
        'Đồ họa 2D/3D canvas và trải nghiệm WebGL sống động',
      ],
    },
  },
  {
    id: 'ebook',
    name: 'Ebook — 4TM',
    shortName: 'Ebook',
    href: 'https://ebook.4tm.io.vn',
    subdomain: 'ebook.4tm.io.vn',
    descriptor: {
      en: 'Digital Technical Publications',
      vi: 'Tủ Sách Kỹ Thuật Số',
    },
    description: {
      en: 'In-depth software engineering manuals, architectural guides, and a distraction-free digital reading platform optimized for continuous technical learning.',
      vi: 'Sách tham khảo kỹ thuật chuyên sâu, tài liệu kiến trúc hệ thống và trình đọc sách số tập trung, tối ưu cho quá trình nghiên cứu công nghệ.',
    },
    status: 'active',
    statusLabel: {
      en: 'Technical Library',
      vi: 'Thư Viện Kỹ Thuật',
    },
    statusBadgeClass: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20',
    ctaText: {
      en: 'Explore Ebooks',
      vi: 'Đọc Sách Kỹ Thuật',
    },
    icon: 'BookOpen',
    highlights: {
      en: [
        'Comprehensive technical manuals and software guides',
        'Distraction-free digital reader with clean typography',
        'Curated bilingual engineering references',
      ],
      vi: [
        'Cẩm nang chuyên môn và tài liệu phần mềm chuyên sâu',
        'Trình đọc số tập trung với kiểu chữ tối ưu thị giác',
        'Tài liệu tham khảo kỹ thuật song ngữ được tuyển chọn',
      ],
    },
  },
  {
    id: 'tools',
    name: 'Tools — 4TM',
    shortName: 'Tools',
    href: 'https://tools.4tm.io.vn',
    subdomain: 'tools.4tm.io.vn',
    descriptor: {
      en: 'Web Utilities & Developer Suite',
      vi: 'Bộ Tiện Ích Web & Công Cụ Dev',
    },
    description: {
      en: 'Zero-latency browser utilities, code formatters, converters, diff tools, calculators, and developer productivity essentials that run entirely on the client.',
      vi: 'Bộ công cụ web chạy tức thì trên trình duyệt: định dạng code, chuyển đổi dữ liệu, so sánh diff, máy tính và các tiện ích tăng năng suất.',
    },
    status: 'in-development',
    statusLabel: {
      en: 'Developer Suite',
      vi: 'Bộ Tiện Ích Dev',
    },
    statusBadgeClass: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
    ctaText: {
      en: 'Open Tools',
      vi: 'Mở Bộ Công Cụ',
    },
    icon: 'Wrench',
    highlights: {
      en: [
        'Zero-latency browser-native execution without server roundtrips',
        'Formatters, encodings, JSON tools, and schema converters',
        'Privacy-preserving local computation with no data leakage',
      ],
      vi: [
        'Xử lý trực tiếp trên trình duyệt, không gửi dữ liệu ra ngoài',
        'Định dạng code, chuyển mã, xử lý JSON và cấu trúc dữ liệu',
        'Bảo mật dữ liệu tuyệt đối với tính toán cục bộ',
      ],
    },
  },
];

/**
 * Adapter providing canonical EcosystemProduct structure for ProductSwitcher
 */
export function getCanonicalEcosystemProducts(currentId = 'hub', lang: Language = 'en') {
  return [
    {
      id: 'hub',
      name: '4TM Ecosystem',
      shortName: '4TM',
      description: lang === 'vi' ? 'Trang chủ hệ sinh thái 4TM' : '4TM Ecosystem Homepage',
      url: 'https://4tm.io.vn',
      current: currentId === 'hub',
    },
    ...ECOSYSTEM_PRODUCTS_CONFIG.map((p) => ({
      id: p.id,
      name: p.name,
      shortName: p.shortName,
      description: p.descriptor[lang],
      url: p.href,
      current: currentId === p.id,
    })),
  ];
}
