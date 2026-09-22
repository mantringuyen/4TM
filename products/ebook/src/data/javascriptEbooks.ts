import { Book } from "../types";
import {
  JAVASCRIPT_HANDBOOK_BOOK,
  JAVASCRIPT_DEFINITIONS_BOOK,
  JAVASCRIPT_PRACTICAL_GUIDE_BOOK,
  JAVASCRIPT_COMMON_ERRORS_BOOK,
} from "./migrated";

export const JAVASCRIPT_EBOOKS: Book[] = [
  JAVASCRIPT_HANDBOOK_BOOK,
  JAVASCRIPT_DEFINITIONS_BOOK,
  JAVASCRIPT_PRACTICAL_GUIDE_BOOK,
  JAVASCRIPT_COMMON_ERRORS_BOOK,

  // 5. JavaScript Best Practices
  {
    id: 'javascript-best-practices',
    slug: 'javascript-best-practices',
    title: 'Modern ES6+ Best Practices',
    subtitle: {
      en: 'Immutability, Functional Methods, Modules & Clean Architecture',
      vi: 'Tính Bất Biến, Hàm Functional, ES Modules & Kiến Trúc Sạch',
    },
    bookType: 'Best Practices',
    categoryId: 'javascript',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-01',
    accentColor: 'from-amber-600 to-yellow-900',
    tags: ['ES6+', 'Immutability', 'Clean Code', 'Best Practices'],
    description: {
      en: 'Standards for writing clean modern JavaScript: preferring const/let over var, immutable array transformations (map, filter, reduce), structured ES Modules, and avoiding global state pollution.',
      vi: 'Tiêu chuẩn viết code JavaScript hiện đại: dùng const/let thay var, biến đổi mảng bất biến (map, filter, reduce), cấu trúc ES Modules và tránh làm bẩn global state.',
    },
    prerequisites: {
      en: ['Experience writing JavaScript applications'],
      vi: ['Kinh nghiệm lập trình ứng dụng JavaScript'],
    },
    outcomes: {
      en: ['Master pure array methods (map, filter, reduce, flatMap) without side effects', 'Organize clean ES Module imports'],
      vi: ['Làm chủ các hàm biến đổi mảng thuần khiết không tạo side-effect', 'Tổ chức import ES Module gọn gàng'],
    },
    chapters: [
      {
        id: 'jbp-ch-1',
        number: 1,
        slug: 'immutable-array-transformations',
        title: {
          en: 'Immutable Array Transformations (map, filter, reduce)',
          vi: 'Biến Đổi Mảng Bất Biến Với map, filter, reduce',
        },
        summary: {
          en: 'Avoiding push/splice mutations; leveraging pure array functions.',
          vi: 'Tránh biến đổi trực tiếp bằng push/splice; tận dụng hàm mảng thuần khiết.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'jbp-1-1',
            title: {
              en: 'Pure Array Mapping & Filtering',
              vi: 'Hàm Biến Đổi Mảng Pure Function',
            },
            content: {
              en: 'Pure array operations return brand new instances instead of mutating original arrays in place, making state changes predictable and React-friendly.',
              vi: 'Các hàm mảng pure function trả về mảng hoàn toàn mới thay vì sửa mảng ban đầu, giúp việc quản lý trạng thái trở nên an toàn.',
            },
          },
        ],
      },
      {
        id: 'jbp-ch-2',
        number: 2,
        slug: 'es-modules-and-clean-imports',
        title: {
          en: 'ES Modules & Code Decoupling',
          vi: 'Hệ Thống ES Modules & Tách Biệt Mã Nguồn',
        },
        summary: {
          en: 'Named exports vs default exports, tree-shaking, and cyclic dependency prevention.',
          vi: 'Named export vs default export, cơ chế tree-shaking và phòng tránh phụ thuộc vòng.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'jbp-2-1',
            title: {
              en: 'Preferring Explicit Named Exports for Tree-Shaking',
              vi: 'Ưu Tiên Named Export Để Tối Ưu Tree-Shaking',
            },
            content: {
              en: 'Named exports enable bundlers (Vite, Webpack) to perform dead-code elimination (tree-shaking) far more reliably than default exports.',
              vi: 'Named export cho phép các công cụ build (Vite, Webpack) loại bỏ code thừa không dùng (tree-shaking) hiệu quả hơn default export.',
            },
          },
        ],
      },
    ],
  },

  // 6. JavaScript Patterns / Recipes
  {
    id: 'javascript-patterns',
    slug: 'javascript-patterns',
    title: 'JavaScript Design Patterns & Recipes',
    subtitle: {
      en: 'Module Pattern, Factory, Pub/Sub & Debounce/Throttle Recipes',
      vi: 'Module Pattern, Factory, Mẫu Pub/Sub & Công Thức Debounce/Throttle',
    },
    bookType: 'Patterns / Recipes',
    categoryId: 'javascript',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-18',
    accentColor: 'from-amber-600 to-amber-900',
    tags: ['Patterns', 'Debounce', 'Throttle', 'PubSub', 'Recipes'],
    description: {
      en: 'A collection of essential JavaScript design patterns and formulas: Debounce, Throttle, Publisher/Subscriber Event Emitter, Singleton, and Factory functions.',
      vi: 'Bộ công thức và mẫu thiết kế JavaScript hữu ích: Debounce, Throttle, Hệ thống sự kiện Pub/Sub, Singleton và Factory functions.',
    },
    prerequisites: {
      en: ['Understanding of closures and event callbacks'],
      vi: ['Hiểu về closure và hàm callback sự kiện'],
    },
    outcomes: {
      en: ['Implement custom debounce and throttle helper functions from scratch', 'Build lightweight Event Emitter Pub/Sub messaging buses'],
      vi: ['Tự viết hàm hỗ trợ Debounce và Throttle từ đầu', 'Xây dựng kênh truyền tin Event Emitter Pub/Sub mượt mà'],
    },
    chapters: [
      {
        id: 'jpat-ch-1',
        number: 1,
        slug: 'debounce-and-throttle-recipes',
        title: {
          en: 'Debounce & Throttle Helper Recipes',
          vi: 'Công Thức Viết Hàm Debounce & Throttle',
        },
        summary: {
          en: 'Rate-limiting high-frequency DOM events (scroll, resize, search input).',
          vi: 'Tiết chế tần suất sự kiện DOM dồn dập (scroll, resize, gõ ô tìm kiếm).',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'jpat-1-1',
            title: {
              en: 'Custom Debounce Implementation',
              vi: 'Tự Viết Hàm Debounce Nhẹ Nhàng',
            },
            content: {
              en: 'Debounce delays function invocation until a specified silent period has elapsed since the last trigger event.',
              vi: 'Debounce hoãn việc gọi hàm cho đến khi hết khoảng thời gian im lặng chỉ định kể từ lần kích hoạt cuối cùng.',
            },
            codeBlock: {
              language: 'javascript',
              filename: 'debounce.js',
              code: `function debounce(fn, delayMs) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}`,
            },
          },
        ],
      },
      {
        id: 'jpat-ch-2',
        number: 2,
        slug: 'pub-sub-event-emitter',
        title: {
          en: 'Publisher/Subscriber (Pub/Sub) Pattern',
          vi: 'Mẫu Thiết Kế Publisher/Subscriber (Pub/Sub)',
        },
        summary: {
          en: 'Decoupling component communication with a custom EventEmitter bus.',
          vi: 'Tách biệt giao tiếp giữa các component bằng kênh EventEmitter tự chế.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'jpat-2-1',
            title: {
              en: 'Building an In-Memory Event Bus',
              vi: 'Xây Dựng Kênh Event Bus Trong Bộ Nhớ',
            },
            content: {
              en: 'Implement `on(event, cb)`, `off(event, cb)`, and `emit(event, data)` methods on a simple class to enable decoupled event-driven communication.',
              vi: 'Hiện thực các phương thức `on(event, cb)`, `off(event, cb)` và `emit(event, data)` trên một lớp đơn giản để gửi nhận sự kiện linh hoạt.',
            },
          },
        ],
      },
    ],
  },
];
