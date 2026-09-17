import { Language } from '../types';

export const TRANSLATIONS = {
  en: {
    nav: {
      workbench: 'Tools Workbench',
      signIn: 'Sign In',
      signOut: 'Sign Out',
    },
    hero: {
      eyebrow: '4TM Technical Utilities',
      title: 'Browser-Native Developer Tooling Suite',
      description:
        'Zero-latency, client-side developer utilities — encoders, formatters, cryptography hashers, JWT inspectors, and generators running securely in your browser.',
      searchPlaceholder: 'Search tools, encoders, formatters, hashers...',
      allCategories: 'All Categories',
    },
    categories: {
      encoding: 'Encoding & Escaping',
      formatters: 'Formatters & Parsers',
      crypto: 'Cryptography & Hash',
      network: 'Web & Security',
      generators: 'Generators',
    },
    common: {
      input: 'Input',
      output: 'Output',
      copy: 'Copy',
      copied: 'Copied!',
      clear: 'Clear',
      sample: 'Load Sample',
      characters: 'chars',
      bytes: 'bytes',
      options: 'Options',
    },
    footer: {
      tagline: 'Tools — 4TM provides client-side developer utilities within the 4TM Ecosystem.',
      rights: 'All rights reserved.',
      backToEcosystem: 'Return to 4TM Ecosystem',
    },
  },
  vi: {
    nav: {
      workbench: 'Bàn Làm Việc Tiện Ích',
      signIn: 'Đăng Nhập',
      signOut: 'Đăng Xuất',
    },
    hero: {
      eyebrow: 'Bộ Tiện Ích Kỹ Thuật 4TM',
      title: 'Công Cụ Lập Trình Chạy Trực Tiếp Trên Trình Duyệt',
      description:
        'Các tiện ích lập trình viên độ trễ bằng 0, bảo mật phía client — mã hóa, làm đẹp dữ liệu, tạo mã băm, kiểm tra JWT và tạo UUID không gửi dữ liệu ra ngoài.',
      searchPlaceholder: 'Tìm công cụ, mã hóa, format, băm dữ liệu...',
      allCategories: 'Tất Cả Danh Mục',
    },
    categories: {
      encoding: 'Mã Hóa & Escape',
      formatters: 'Định Dạng & Phân Tích',
      crypto: 'Mật Mã & Băm',
      network: 'Web & Bảo Mật',
      generators: 'Tạo Dữ Liệu',
    },
    common: {
      input: 'Đầu Vào',
      output: 'Kết Quả',
      copy: 'Sao Chép',
      copied: 'Đã Chép!',
      clear: 'Xóa',
      sample: 'Nạp Mẫu',
      characters: 'ký tự',
      bytes: 'bytes',
      options: 'Tùy Chọn',
    },
    footer: {
      tagline: 'Tools — 4TM là bộ công cụ kỹ thuật và tiện ích lập trình viên thuộc Hệ sinh thái 4TM.',
      rights: 'Bảo lưu mọi quyền.',
      backToEcosystem: 'Về Cổng Hệ Sinh Thái 4TM',
    },
  },
};

export const LANGUAGE_STORAGE_KEY = '4tm_tools_lang';
