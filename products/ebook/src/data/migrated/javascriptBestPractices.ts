import { Book } from '../../types';

export const JAVASCRIPT_BEST_PRACTICES_BOOK: Book = {
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
    en: [
      'Experience writing modern JavaScript applications and working with ECMAScript 2015+ features',
    ],
    vi: [
      'Kinh nghiệm lập trình ứng dụng JavaScript hiện đại và làm việc với các tính năng ECMAScript 2015+',
    ],
  },
  outcomes: {
    en: [
      'Master pure, immutable array transformations using map, filter, reduce, and toSorted without mutation side-effects',
      'Architect robust ES Module systems using explicit named exports for optimal bundler tree-shaking and cyclic dependency prevention',
      'Enforce variable scoping discipline and eliminate legacy mutable state anti-patterns across production applications',
    ],
    vi: [
      'Làm chủ các phép biến đổi mảng thuần khiết, bất biến bằng map, filter, reduce và toSorted không gây tác dụng phụ',
      'Kiến trúc hệ thống ES Module vững chắc dùng named export tường minh để tối ưu tree-shaking và phòng tránh phụ thuộc vòng',
      'Thiết lập kỷ luật phạm vi biến số và loại bỏ hoàn toàn các sai lầm quản lý trạng thái đột biến trong môi trường production',
    ],
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
        en: 'Avoiding push/splice in-place mutations; leveraging pure array functions for predictable state management.',
        vi: 'Tránh biến đổi trực tiếp bằng push/splice; tận dụng hàm mảng thuần khiết để quản lý trạng thái an toàn.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'jbp-1-1',
          title: {
            en: 'Pure Array Mapping & Filtering',
            vi: 'Hàm Biến Đổi Mảng Pure Function',
          },
          keyIdea: {
            en: 'Pure array transformation functions return brand new array instances instead of mutating original input arrays, making data flows deterministic, concurrency-safe, and compatible with modern reactive UI frameworks.',
            vi: 'Các hàm biến đổi mảng thuần khiết (pure function) trả về phiên bản mảng hoàn toàn mới thay vì đột biến mảng đầu vào, giúp luồng dữ liệu mang tính tiền định, an toàn đa luồng và tương thích tối đa với các framework UI phản ứng.',
          },
          content: {
            en: 'Mutating arrays in place with methods such as `push()`, `splice()`, and `sort()` creates subtle bugs across asynchronous event loops and reactive state management systems (such as React or Redux, which rely on object identity comparisons `prev !== next`). By utilizing immutable alternatives like `map()`, `filter()`, `reduce()`, spread operators `[...arr]`, and ECMAScript 2023 methods (`toSorted()`, `toReversed()`, `toSpliced()`), developers eliminate side effects and guarantee clean data pipelines.',
            vi: 'Việc sửa đổi mảng trực tiếp bằng các phương thức như `push()`, `splice()`, và `sort()` gây ra nhiều lỗi tiềm ẩn nghiêm trọng trong vòng lặp bất đồng bộ và các hệ thống quản lý trạng thái phản ứng (như React hay Redux vốn phụ thuộc vào so sánh tham chiếu `prev !== next`). Bằng cách sử dụng các giải pháp bất biến như `map()`, `filter()`, `reduce()`, toán tử spread `[...arr]` và các phương thức ECMAScript 2023 (`toSorted()`, `toReversed()`, `toSpliced()`), lập trình viên triệt tiêu tác dụng phụ và đảm bảo luồng dữ liệu luôn trong sạch.',
          },
          practiceDetails: {
            context: {
              en: 'Authoring data transformation pipelines and UI state mutations in modern JavaScript and TypeScript codebases.',
              vi: 'Xây dựng đường ống xử lý dữ liệu và cập nhật trạng thái giao diện trong mã nguồn JavaScript và TypeScript hiện đại.',
            },
            recommendedPractice: {
              en: 'Treat all input arrays as strictly immutable. Use map/filter/reduce or modern non-mutating methods (toSorted, toSpliced) to produce new transformed collections.',
              vi: 'Coi tất cả mảng đầu vào là bất biến tuyệt đối. Sử dụng map/filter/reduce hoặc các phương thức không đột biến hiện đại (toSorted, toSpliced) để tạo tập dữ liệu mới.',
            },
            whyItMatters: {
              en: 'In-place array mutations cause difficult-to-trace bugs where distant functions unexpectedly alter shared data. Immutable transformations make state changes explicit and simplify debugging.',
              vi: 'Đột biến mảng tại chỗ gây ra các lỗi cực kỳ khó dò khi một hàm ở xa vô tình sửa đổi dữ liệu dùng chung. Biến đổi bất biến giúp các thay đổi dữ liệu trở nên tường minh và đơn giản hóa việc gỡ lỗi.',
            },
            goodExample: {
              language: 'javascript',
              filename: 'immutable_transformation.js',
              explanation: {
                en: 'Non-mutating filter and map transformations returning fresh array instances.',
                vi: 'Biến đổi lọc và ánh xạ không đột biến trả về các phiên bản mảng mới hoàn toàn.',
              },
              code: `// Recommended: Pure pipeline returning new immutable arrays
const users = [
  { id: 1, name: 'Alice', active: true, score: 85 },
  { id: 2, name: 'Bob', active: false, score: 92 },
  { id: 3, name: 'Charlie', active: true, score: 95 },
];

// 1. Filter active users and extract uppercase names
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name.toUpperCase());

// 2. Sort by score without mutating original array (ES2023 toSorted)
const leaderboard = users.toSorted((a, b) => b.score - a.score);`,
            },
            riskyExample: {
              language: 'javascript',
              filename: 'mutating_array_anti_pattern.js',
              explanation: {
                en: 'Mutating input array directly with splice and in-place sort.',
                vi: 'Sửa đổi trực tiếp mảng đầu vào bằng splice và sort tại chỗ.',
              },
              code: `// RISKY ANTI-PATTERN: Mutating original shared data
function processUsers(usersList) {
  // In-place sort mutates the caller's array directly!
  usersList.sort((a, b) => b.score - a.score);
  
  // Splice mutates and deletes items from original array!
  usersList.splice(2);
  
  return usersList;
}`,
            },
            tradeOffs: {
              en: [
                'Memory allocation: Creating new arrays incurs minor garbage collection overhead, which is negligible for UI datasets but should be profiled in million-item numerical computations.',
              ],
              vi: [
                'Cấp phát bộ nhớ: Tạo mảng mới tiêu tốn một phần nhỏ chi phí dọn rác (GC), không đáng kể với dữ liệu UI nhưng cần lưu ý khi xử lý hàng triệu phần tử số học.',
              ],
            },
            checklist: {
              en: [
                'Avoid array.push(), array.splice(), array.sort(), and array.reverse() on shared state',
                'Use map(), filter(), reduce(), and flatMap() for declarative data transformations',
                'Leverage ES2023 toSorted() / toReversed() / toSpliced() when non-destructive sorting is required',
              ],
              vi: [
                'Tránh dùng array.push(), array.splice(), array.sort() và array.reverse() trên trạng thái dùng chung',
                'Sử dụng map(), filter(), reduce() và flatMap() cho các biến đổi dữ liệu khai báo',
                'Tận dụng toSorted() / toReversed() / toSpliced() của ES2023 khi cần sắp xếp không phá hủy dữ liệu gốc',
              ],
            },
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
        en: 'Named exports vs default exports, tree-shaking mechanics, and cyclic dependency prevention.',
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
          keyIdea: {
            en: 'Explicit named exports provide precise static analysis bindings that modern bundlers (Vite, Rollup, Webpack) can reliably tree-shake, while default exports often force bundling of entire object graphs.',
            vi: 'Các named export tường minh cung cấp liên kết phân tích tĩnh chuẩn xác giúp các công cụ build (Vite, Rollup, Webpack) loại bỏ triệt để code thừa (tree-shaking), trong khi default export thường buộc phải đóng gói toàn bộ đối tượng.',
          },
          content: {
            en: 'Standardizing on explicit named exports (`export const calculateTotal = ...`) over default exports (`export default { ... }`) provides significant architectural benefits: it enforces consistent naming across the entire codebase, facilitates IDE auto-import refactoring, prevents accidental circular dependency deadlocks, and allows build tooling to strip unused functions from final production bundles via Dead Code Elimination (tree-shaking).',
            vi: 'Chuẩn hóa việc sử dụng named export (`export const calculateTotal = ...`) thay vì default export (`export default { ... }`) mang lại nhiều lợi thế kiến trúc to lớn: nó đảm bảo tính nhất quán khi đặt tên trên toàn bộ dự án, hỗ trợ IDE tự động import khi refactor, ngăn ngừa lỗi khóa chết do phụ thuộc vòng và cho phép công cụ build gọt bỏ hoàn toàn các hàm không dùng đến qua cơ chế Dead Code Elimination (tree-shaking).',
          },
          practiceDetails: {
            context: {
              en: 'Structuring library modules, utilities, and API client layers in scalable web applications.',
              vi: 'Cấu trúc các module thư viện, tiện ích và tầng API client trong ứng dụng web quy mô lớn.',
            },
            recommendedPractice: {
              en: 'Export functions and constants individually using explicit named exports. Use default exports sparingly, primarily for top-level page route components.',
              vi: 'Xuất các hàm và hằng số riêng biệt bằng named export tường minh. Chỉ dùng default export khi thật sự cần thiết, chủ yếu cho component định tuyến trang cấp cao.',
            },
            whyItMatters: {
              en: 'Bundlers cannot reliably tree-shake properties off a single default-exported object, leading to bloated client JavaScript bundles.',
              vi: 'Công cụ build không thể loại bỏ code thừa đối với các thuộc tính nằm trong một đối tượng default export, dẫn đến bundle JavaScript bị phình to.',
            },
            goodExample: {
              language: 'javascript',
              filename: 'mathUtils.js',
              explanation: {
                en: 'Fine-grained named exports enabling optimal bundler tree-shaking.',
                vi: 'Các named export chi tiết cho phép công cụ build tối ưu tree-shaking tốt nhất.',
              },
              code: `// mathUtils.js - Explicit named exports
export function sum(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export function complexStatisticalModel(data) {
  // Heavy 50KB calculation function
  return data.reduce((acc, val) => acc + val, 0) / data.length;
}

// Consumer file:
// import { sum } from './mathUtils.js';
// -> complexStatisticalModel is completely eliminated from the production build!`,
            },
            riskyExample: {
              language: 'javascript',
              filename: 'mathUtils_default_bad.js',
              explanation: {
                en: 'Default object export preventing dead code elimination.',
                vi: 'Default export đối tượng khiến công cụ build không thể loại bỏ code thừa.',
              },
              code: `// mathUtils_default_bad.js - Default object export
export default {
  sum(a, b) { return a + b; },
  multiply(a, b) { return a * b; },
  complexStatisticalModel(data) {
    // Heavy 50KB function ALWAYS included in bundle even if only sum is used!
    return data.reduce((acc, val) => acc + val, 0) / data.length;
  }
};`,
            },
            tradeOffs: {
              en: [
                'Refactoring consistency: Renaming an export requires updating all import references (though modern IDEs automate this flawlessly).',
              ],
              vi: [
                'Tính nhất quán khi refactor: Đổi tên export đòi hỏi cập nhật tất cả vị trí import (tuy nhiên IDE hiện đại tự động làm việc này hoàn hảo).',
              ],
            },
            checklist: {
              en: [
                'Utility modules and API services use explicit named exports',
                'Avoid grouping utility functions into a single monolithic default-exported object',
                'Verify with bundle analyzers that unused module exports are eliminated from production output',
              ],
              vi: [
                'Các module tiện ích và dịch vụ API đều sử dụng named export tường minh',
                'Tránh gom các hàm tiện ích vào một đối tượng default export cồng kềnh duy nhất',
                'Kiểm tra bằng công cụ phân tích bundle để đảm bảo các hàm không dùng bị loại bỏ khỏi output build',
              ],
            },
          },
        },
      ],
    },
  ],
};
