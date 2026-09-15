import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/advanced/module01');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 27 ---
const lesson27: Lesson = {
  id: "js_lesson_27",
  courseId: "javascript",
  levelId: "advanced",
  moduleId: "js_mod_5",
  order: 27,
  title: {
    en: "Modern ES2020–ES2024 Ergonomic Language Features",
    vi: "Các Tính Năng Ngôn Ngữ Hiện Đại ES2020–ES2024"
  },
  summary: {
    en: "Master recent ECMAScript additions: Optional Chaining (`?.`), Nullish Coalescing (`??`), Logical Assignment (`||=`, `&&=`, `??=`), `structuredClone`, `Object.hasOwn`, `Object.groupBy`, `Promise.withResolvers`, and immutable Array methods (`toSorted`, `with`).",
    vi: "Làm chủ các tính năng ECMAScript mới nhất: Optional Chaining (`?.`), Nullish Coalescing (`??`), Phép gán logic (`||=`, `&&=`, `??=`), `structuredClone`, `Object.hasOwn`, `Object.groupBy`, `Promise.withResolvers` và các hàm Array bất biến (`toSorted`, `with`)."
  },
  estimatedMinutes: 22,
  topicId: "js_es2020_es2024",
  learn: {
    introduction: {
      en: "ECMAScript releases yearly updates that enhance language ergonomics, type safety, and functional programming capabilities. Recent specifications (ES2020 through ES2024) have introduced transformative features that eliminate boilerplate code, replace outdated utility libraries (like lodash deep cloning and grouping), and bring native immutable data manipulation into core JavaScript.",
      vi: "ECMAScript liên tục cập nhật các phiên bản mới hàng năm nhằm tối ưu cú pháp, tăng cường độ an toàn kiểu dữ liệu và nâng cao năng lực lập trình hàm. Các đặc tả gần đây (từ ES2020 đến ES2024) mang lại những tính năng đột phá giúp loại bỏ code dài dòng, thay thế các thư viện tiện ích cũ (như lodash deep clone, group by) và hỗ trợ thao tác dữ liệu bất biến nguyên bản trong JavaScript."
    },
    conceptExplanation: {
      en: "1. Safe Traversal & Fallbacks:\n   - Optional Chaining (`?.`): `user?.profile?.address?.zipCode` or `fn?.()` stops evaluation and returns `undefined` if target is `null` or `undefined`.\n   - Nullish Coalescing (`??`): Returns right-hand side ONLY if left is `null` or `undefined` (unlike `||`, it preserves `0`, `\"\"`, and `false`).\n\n2. Logical Assignment Operators:\n   - `a ||= b`: Assigns `b` only if `a` is falsy.\n   - `a &&= b`: Assigns `b` only if `a` is truthy.\n   - `a ??= b`: Assigns `b` only if `a` is nullish (`null` or `undefined`).\n\n3. Modern Core Utilities:\n   - `structuredClone(obj)`: Native deep clone supporting circular references, Maps, Sets, and Dates.\n   - `Object.hasOwn(obj, prop)`: Modern, robust replacement for `Object.prototype.hasOwnProperty`.\n   - `Object.groupBy(iterable, callback)`: Native categorical grouping.\n   - `Promise.withResolvers()`: Returns `{ promise, resolve, reject }` without wrapping in a Promise constructor callback.\n\n4. Change Array by Copy (Immutable Array Methods):\n   - `.toSorted()`, `.toReversed()`, `.toSpliced()`, and `.with(index, value)` return new transformed arrays without mutating the original!",
      vi: "1. Truy Cập An Toàn & Giá Trị Mặc Định:\n   - Optional Chaining (`?.`): `user?.profile?.address?.zipCode` hoặc `fn?.()` tự dừng và trả về `undefined` nếu gặp `null` hoặc `undefined`.\n   - Nullish Coalescing (`??`): Chỉ lấy vế phải khi vế trái là `null` hoặc `undefined` (khác với `||`, nó giữ nguyên `0`, `\"\"`, và `false`).\n\n2. Toán Tử Gán Logic:\n   - `a ||= b`: Chỉ gán `b` nếu `a` là falsy.\n   - `a &&= b`: Chỉ gán `b` nếu `a` là truthy.\n   - `a ??= b`: Chỉ gán `b` nếu `a` là nullish (`null` hoặc `undefined`).\n\n3. Tiện Ích Chuẩn Hiện Đại:\n   - `structuredClone(obj)`: Deep clone nguyên bản hỗ trợ tham chiếu vòng, Map, Set và Date.\n   - `Object.hasOwn(obj, prop)`: Thay thế chuẩn an toàn cho `hasOwnProperty`.\n   - `Object.groupBy(iterable, callback)`: Gom nhóm mảng theo danh mục nguyên bản.\n   - `Promise.withResolvers()`: Trả về `{ promise, resolve, reject }` mà không cần bọc callback constructor.\n\n4. Thao Tác Mảng Bất Biến (Change Array by Copy):\n   - `.toSorted()`, `.toReversed()`, `.toSpliced()`, và `.with(index, value)` trả về mảng mới mà không làm thay đổi mảng gốc!"
    },
    syntax: `// 1. Immutable Array Updates & Object Grouping (ES2023/ES2024)
const originalList = ["Banana", "Apple", "Cherry"];
const sortedList = originalList.toSorted(); // ['Apple', 'Banana', 'Cherry']
const updatedList = originalList.with(1, "Avocado"); // ['Banana', 'Avocado', 'Cherry']
console.log("Original list untouched:", originalList); // ['Banana', 'Apple', 'Cherry']

// Grouping by category
const inventory = [
  { name: "Asparagus", type: "vegetables" },
  { name: "Bananas", type: "fruit" },
  { name: "Cherries", type: "fruit" }
];
const grouped = Object.groupBy(inventory, item => item.type);
// { vegetables: [...], fruit: [...] }

// 2. Promise.withResolvers() (ES2024)
const { promise, resolve, reject } = Promise.withResolvers();
setTimeout(() => resolve("Data loaded!"), 500);
console.log(await promise); // "Data loaded!"`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Configuration Merger with Nullish Coalescing & Logical Assignment",
          vi: "Hợp Nhất Cấu Hình Ứng Dụng Bằng Nullish Coalescing & Phép Gán Logic"
        },
        description: {
          en: "Demonstrates writing ultra-clean, defect-free configuration merging without overriding legitimate falsy values (like 0 or false).",
          vi: "Minh họa hợp nhất cấu hình sạch sẽ, không ghi đè nhầm các giá trị falsy hợp lệ (như 0 hoặc false)."
        },
        code: `function initializeAppSettings(userConfig = {}) {
  // Deep clone to prevent mutating input
  const config = structuredClone(userConfig);

  // Logical nullish assignment: only set if undefined/null
  config.timeoutMs ??= 5000;
  config.retries ??= 3;
  config.enableLogging ??= true;
  config.debugPort ??= 0; // Preserves port 0!

  // Optional chaining with fallback
  const theme = config.ui?.theme?.mode ?? "system";
  const authHeader = config.auth?.token ? \`Bearer \${config.auth.token}\` : null;

  return { ...config, computed: { theme, authHeader } };
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using the logical OR operator `||` when setting default options (e.g. `const limit = options.limit || 10`).",
          vi: "Dùng toán tử OR `||` khi thiết lập giá trị mặc định (ví dụ `const limit = options.limit || 10`)."
        },
        correction: {
          en: "Use the Nullish Coalescing operator `??` (`const limit = options.limit ?? 10`).",
          vi: "Sử dụng toán tử Nullish Coalescing `??` (`const limit = options.limit ?? 10`)."
        },
        explanation: {
          en: "If the user explicitly passes `limit = 0`, `0 || 10` evaluates to `10`, silently overriding the user's intended value of zero.",
          vi: "Nếu người dùng chủ động truyền `limit = 0`, biểu thức `0 || 10` sẽ trả về `10`, vô tình ghi đè mất số 0 hợp lệ của người dùng."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use native Object.hasOwn() instead of obj.hasOwnProperty()",
          vi: "Dùng Object.hasOwn() thay vì obj.hasOwnProperty()"
        },
        description: {
          en: "`Object.hasOwn(obj, 'prop')` is safe against objects created with `Object.create(null)` that do not inherit from `Object.prototype`.",
          vi: "`Object.hasOwn(obj, 'prop')` hoạt động an toàn tuyệt đối với cả các object tạo từ `Object.create(null)` không có prototype."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_27_1",
      title: {
        en: "Clean Nested State Updaters with Immutable Array.with & toSorted",
        vi: "Cập Nhật Trạng Thái Bất Biến Bằng Array.with & toSorted"
      },
      instruction: {
        en: "Write a pure function `updateUserScore(leaderboard, targetIndex, newScore)` that returns a new leaderboard array with the score at `targetIndex` updated and sorted descending by `score` without mutating the input array.",
        vi: "Viết hàm thuần túy `updateUserScore(leaderboard, targetIndex, newScore)` trả về mảng bảng xếp hạng mới có điểm tại `targetIndex` được cập nhật và sắp xếp giảm dần theo `score` mà không làm thay đổi mảng đầu vào."
      },
      starterCode: `function updateUserScore(leaderboard, targetIndex, newScore) {
  // Pure update using .with() and .toSorted()
}`,
      solutionCode: `function updateUserScore(leaderboard, targetIndex, newScore) {
  const currentItem = leaderboard[targetIndex];
  if (!currentItem) return leaderboard;

  const updatedItem = { ...currentItem, score: newScore };
  return leaderboard
    .with(targetIndex, updatedItem)
    .toSorted((a, b) => b.score - a.score);
}`,
      hints: [
        {
          en: "Use `leaderboard.with(targetIndex, updatedItem)` then chain `.toSorted((a, b) => b.score - a.score)`.",
          vi: "Dùng `leaderboard.with(targetIndex, updatedItem)` rồi nối tiếp `.toSorted((a, b) => b.score - a.score)`."
        }
      ]
    },
    {
      id: "js_ex_27_2",
      title: {
        en: "Categorical Analytics Aggregator with Object.groupBy",
        vi: "Tổng Hợp Thống Kê Danh Mục Bằng Object.groupBy"
      },
      instruction: {
        en: "Write a function `summarizeTransactions(transactions)` that groups transactions by `type` (e.g. 'income' vs 'expense') using `Object.groupBy` and calculates the `totalAmount` and `count` for each category.",
        vi: "Viết hàm `summarizeTransactions(transactions)` gom nhóm các giao dịch theo `type` (như 'income' vs 'expense') sử dụng `Object.groupBy` và tính `totalAmount` cùng `count` cho từng danh mục."
      },
      starterCode: `function summarizeTransactions(transactions) {
  // Group and summarize
}`,
      solutionCode: `function summarizeTransactions(transactions) {
  const grouped = Object.groupBy(transactions, t => t.type);
  const summary = {};

  for (const [type, items] of Object.entries(grouped)) {
    summary[type] = {
      count: items.length,
      totalAmount: items.reduce((acc, curr) => acc + curr.amount, 0)
    };
  }

  return summary;
}`,
      hints: [
        {
          en: "Use `Object.groupBy(transactions, t => t.type)`. Iterate over `Object.entries(grouped)` calculating count and sum.",
          vi: "Dùng `Object.groupBy(transactions, t => t.type)`. Lặp qua `Object.entries(grouped)` tính count và tổng sum."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_27",
    title: {
      en: "Concurrent Request Gate with Promise.withResolvers()",
      vi: "Cổng Khóa Yêu Cầu Đồng Thời Bằng Promise.withResolvers()"
    },
    description: {
      en: "Build an async concurrency barrier `createGate()` that allows multiple tasks to pause at `await gate.wait()` until `gate.open(payload)` is called, which resolves all waiting tasks with `payload`. If opened, subsequent `wait()` calls resolve immediately.",
      vi: "Xây dựng rào chắn đồng bộ bất đồng bộ `createGate()` cho phép nhiều tác vụ tạm dừng tại `await gate.wait()` cho đến khi `gate.open(payload)` được gọi, giải phóng tất cả các tác vụ đang chờ với `payload`. Nếu đã mở, các lệnh `wait()` tiếp theo resolve ngay lập tức."
    },
    starterCode: `function createGate() {
  // Implement gate using Promise.withResolvers
}`,
    solutionCode: `function createGate() {
  const { promise, resolve, reject } = Promise.withResolvers();
  let isOpen = false;
  let result = null;

  return {
    wait() {
      if (isOpen) return Promise.resolve(result);
      return promise;
    },
    open(payload) {
      if (!isOpen) {
        isOpen = true;
        result = payload;
        resolve(payload);
      }
    },
    fail(error) {
      if (!isOpen) {
        isOpen = true;
        reject(error);
      }
    }
  };
}`,
    hints: [
      {
        en: "Use `Promise.withResolvers()`. In wait(), return the promise if not open, or Promise.resolve(result) if already open.",
        vi: "Dùng `Promise.withResolvers()`. Trong wait(), trả về promise nếu chưa mở hoặc Promise.resolve(result) nếu đã mở."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_27_1",
      type: "single_choice",
      question: {
        en: "What is the difference between `a ?? b` (Nullish Coalescing) and `a || b` (Logical OR)?",
        vi: "Điểm khác biệt giữa `a ?? b` (Nullish Coalescing) và `a || b` (Logical OR) là gì?"
      },
      options: [
        { id: "a", text: { en: "`??` falls back to `b` ONLY when `a` is `null` or `undefined`, preserving valid falsy values like `0`, `\"\"`, and `false`", vi: "`??` chỉ lấy giá trị `b` KHI `a` là `null` hoặc `undefined`, bảo toàn các giá trị falsy hợp lệ như `0`, `\"\"`, và `false`" } },
        { id: "b", text: { en: "`??` only works on numbers", vi: "`??` chỉ dùng được cho kiểu số" } },
        { id: "c", text: { en: "`||` is faster than `??`", vi: "`||` chạy nhanh hơn `??`" } },
        { id: "d", text: { en: "There is no functional difference", vi: "Không có sự khác biệt nào về chức năng" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`??` strictly checks for nullish values (`null` / `undefined`), preventing bugs when `0` or `false` are valid user values.",
        vi: "`??` chỉ kiểm tra giá trị nullish (`null`/`undefined`), tránh lỗi khi `0` hoặc `false` là dữ liệu hợp lệ."
      }
    },
    {
      id: "js_q_27_2",
      type: "predict_output",
      question: {
        en: "What will `console.log(0 ?? 42)` and `console.log(0 || 42)` print?",
        vi: "`console.log(0 ?? 42)` và `console.log(0 || 42)` sẽ in ra kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "0 and 42", vi: "0 và 42" } },
        { id: "b", text: { en: "42 and 42", vi: "42 và 42" } },
        { id: "c", text: { en: "0 and 0", vi: "0 và 0" } },
        { id: "d", text: { en: "undefined and 42", vi: "undefined và 42" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`0 ?? 42` returns `0` because `0` is not nullish. `0 || 42` returns `42` because `0` is falsy.",
        vi: "`0 ?? 42` trả về `0` vì `0` không phải nullish. `0 || 42` trả về `42` vì `0` là giá trị falsy."
      }
    },
    {
      id: "js_q_27_3",
      type: "single_choice",
      question: {
        en: "What is the primary capability of `structuredClone()` compared to `JSON.parse(JSON.stringify(obj))`?",
        vi: "Ưu điểm vượt trội của `structuredClone()` so với `JSON.parse(JSON.stringify(obj))` là gì?"
      },
      options: [
        { id: "a", text: { en: "It accurately clones circular references, Maps, Sets, Dates, RegExps, ArrayBuffers, and BigInts without data loss or exceptions", vi: "Nó sao chép chính xác tham chiếu vòng, Map, Set, Date, RegExp, ArrayBuffer và BigInt mà không làm mất dữ liệu hay gây lỗi" } },
        { id: "b", text: { en: "It converts JavaScript into WebAssembly", vi: "Nó chuyển JavaScript thành WebAssembly" } },
        { id: "c", text: { en: "It encrypts cloned data with AES-256", vi: "Nó mã hóa dữ liệu clone bằng AES-256" } },
        { id: "d", text: { en: "It compresses images", vi: "Nó nén hình ảnh" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`structuredClone` uses the browser's native structured clone algorithm, supporting complex graphs and types.",
        vi: "`structuredClone` dùng thuật toán clone có cấu trúc của trình duyệt, hỗ trợ trọn vẹn các kiểu dữ liệu phức tạp."
      }
    },
    {
      id: "js_q_27_4",
      type: "predict_output",
      question: {
        en: "What does the immutable array method `[10, 20, 30].with(1, 99)` return?",
        vi: "Phương thức mảng bất biến `[10, 20, 30].with(1, 99)` trả về kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "A new array `[10, 99, 30]`, leaving the original array completely untouched", vi: "Một mảng mới `[10, 99, 30]`, giữ nguyên vẹn mảng gốc không bị biến đổi" } },
        { id: "b", text: { en: "Mutates the original array to [10, 99, 30] and returns length", vi: "Biến đổi trực tiếp mảng gốc thành [10, 99, 30] và trả về độ dài" } },
        { id: "c", text: { en: "99", vi: "99" } },
        { id: "d", text: { en: "Throws a TypeError", vi: "Ném lỗi TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The ES2023 `.with(index, value)` method returns a new array with the element at index replaced.",
        vi: "Hàm `.with(index, value)` trong ES2023 trả về mảng mới có phần tử tại vị trí index được thay thế."
      }
    },
    {
      id: "js_q_27_5",
      type: "single_choice",
      question: {
        en: "What does `Promise.withResolvers()` return in ES2024?",
        vi: "`Promise.withResolvers()` trong ES2024 trả về cấu trúc gì?"
      },
      options: [
        { id: "a", text: { en: "An object `{ promise, resolve, reject }` allowing promise resolution from outside callback scope", vi: "Một đối tượng `{ promise, resolve, reject }` cho phép resolve/reject promise từ bên ngoài phạm vi callback" } },
        { id: "b", text: { en: "An array of 3 resolved values", vi: "Một mảng gồm 3 giá trị đã resolve" } },
        { id: "c", text: { en: "A cancelled Promise", vi: "Một Promise đã bị hủy" } },
        { id: "d", text: { en: "A Web Worker thread", vi: "Một luồng Web Worker" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Promise.withResolvers()` exposes `{ promise, resolve, reject }` without manual deferred closure patterns.",
        vi: "`Promise.withResolvers()` cung cấp trực tiếp `{ promise, resolve, reject }` mà không cần viết pattern deferred thủ công."
      }
    },
    {
      id: "js_q_27_6",
      type: "predict_output",
      question: {
        en: "What does the logical assignment `x ??= 10` do when `x` is `undefined`?",
        vi: "Phép gán logic `x ??= 10` thực hiện điều gì khi `x` đang có giá trị `undefined`?"
      },
      options: [
        { id: "a", text: { en: "Assigns 10 to `x` (`x` becomes 10)", vi: "Gán 10 cho `x` (`x` trở thành 10)" } },
        { id: "b", text: { en: "Leaves `x` as undefined", vi: "Giữ nguyên `x` là undefined" } },
        { id: "c", text: { en: "Throws a ReferenceError", vi: "Ném lỗi ReferenceError" } },
        { id: "d", text: { en: "Sets x to null", vi: "Gán x thành null" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`x ??= 10` is equivalent to `if (x === null || x === undefined) x = 10`.",
        vi: "`x ??= 10` tương đương với câu lệnh `if (x === null || x === undefined) x = 10`."
      }
    },
    {
      id: "js_q_27_7",
      type: "fill_blank",
      question: {
        en: "To check if an object possesses a direct property safely without relying on prototype methods, use Object._____(obj, prop).",
        vi: "Để kiểm tra an toàn xem đối tượng có sở hữu trực tiếp thuộc tính mà không dựa vào prototype, dùng Object._____(obj, prop)."
      },
      correctAnswer: "hasOwn",
      explanation: {
        en: "`Object.hasOwn(obj, prop)` is the modern standard replacement for `hasOwnProperty`.",
        vi: "`Object.hasOwn(obj, prop)` là chuẩn hiện đại thay thế cho `hasOwnProperty`."
      }
    },
    {
      id: "js_q_27_8",
      type: "single_choice",
      question: {
        en: "Which modern array method returns a sorted copy of an array without mutating the original?",
        vi: "Phương thức mảng hiện đại nào trả về bản sao đã sắp xếp mà không làm thay đổi mảng ban đầu?"
      },
      options: [
        { id: "a", text: { en: ".toSorted()", vi: ".toSorted()" } },
        { id: "b", text: { en: ".sort()", vi: ".sort()" } },
        { id: "c", text: { en: ".sorted()", vi: ".sorted()" } },
        { id: "d", text: { en: ".asSorted()", vi: ".asSorted()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.toSorted()` is the non-mutating version of `.sort()` introduced in ES2023.",
        vi: "`.toSorted()` là phiên bản không gây biến đổi mảng của `.sort()` được bổ sung trong ES2023."
      }
    },
    {
      id: "js_q_27_9",
      type: "predict_output",
      question: {
        en: "What will `user?.getAddress?.()?.zip` return if `getAddress` is not a function on `user`?",
        vi: "`user?.getAddress?.()?.zip` sẽ trả về gì nếu `getAddress` không phải là hàm trên `user`?"
      },
      options: [
        { id: "a", text: { en: "undefined (without throwing a TypeError)", vi: "undefined (mà không ném lỗi TypeError)" } },
        { id: "b", text: { en: "Throws TypeError: getAddress is not a function", vi: "Ném lỗi TypeError: getAddress is not a function" } },
        { id: "c", text: { en: "null", vi: "null" } },
        { id: "d", text: { en: "false", vi: "false" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The `?.()` syntax safely checks function existence before invoking, returning `undefined` if absent.",
        vi: "Cú pháp `?.()` kiểm tra an toàn sự tồn tại của hàm trước khi gọi, trả về `undefined` nếu không tồn tại."
      }
    },
    {
      id: "js_q_27_10",
      type: "code_reasoning",
      question: {
        en: "Why is `Object.groupBy()` a significant addition to native JavaScript?",
        vi: "Tại sao `Object.groupBy()` là một bổ sung quan trọng cho JavaScript nguyên bản?"
      },
      options: [
        { id: "a", text: { en: "It eliminates the need for external libraries (like Lodash `_.groupBy`) or complex custom `.reduce()` accumulator boilerplate for categorical data partitioning", vi: "Nó loại bỏ nhu cầu phải cài thư viện ngoài (như Lodash `_.groupBy`) hay phải viết `.reduce()` gom nhóm thủ công phức tạp" } },
        { id: "b", text: { en: "It connects directly to SQL databases", vi: "Nó kết nối trực tiếp với database SQL" } },
        { id: "c", text: { en: "It formats JSON files into XML", vi: "Nó định dạng file JSON sang XML" } },
        { id: "d", text: { en: "It renders HTML tables", vi: "Nó tự động render bảng HTML" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Object.groupBy` provides native, highly optimized categorical partitioning in core JavaScript.",
        vi: "`Object.groupBy` cung cấp cơ chế phân nhóm danh mục nguyên bản được tối ưu cao trong core JavaScript."
      }
    }
  ]
};

// --- LESSON 28 ---
const lesson28: Lesson = {
  id: "js_lesson_28",
  courseId: "javascript",
  levelId: "advanced",
  moduleId: "js_mod_5",
  order: 28,
  title: {
    en: "JavaScript Engine Internals: AST, JIT Compilation & TurboFan",
    vi: "Kiến Trúc V8 Engine: Cây AST, Biên Dịch JIT & Trình Tối Ưu TurboFan"
  },
  summary: {
    en: "Master V8 JavaScript engine internals: Parsing & AST generation, Ignition bytecode interpreter, TurboFan JIT compiler, Hidden Classes / Shapes, Inline Caching (IC), monomorphic vs megamorphic call sites, and avoiding deoptimization traps.",
    vi: "Làm chủ kiến trúc động cơ V8 JavaScript: Phân tích cú pháp & cây AST, trình thông dịch bytecode Ignition, trình biên dịch TurboFan JIT, Hidden Classes / Shapes, Inline Caching (IC), phân loại điểm gọi monomorphic vs megamorphic và phòng chống bẫy Deoptimization."
  },
  estimatedMinutes: 24,
  topicId: "js_v8_jit_internals",
  learn: {
    introduction: {
      en: "To write ultra-high-performance JavaScript, you must understand how modern engines (like Google V8 in Chrome & Node.js, SpiderMonkey in Firefox, and JavaScriptCore in Safari) execute code. V8 combines a fast baseline bytecode interpreter (Ignition) with an optimizing Just-In-Time (JIT) compiler (TurboFan). Writing shape-stable, monomorphic code allows V8 to generate machine code nearly as fast as native C++.",
      vi: "Để viết mã JavaScript có hiệu năng đỉnh cao, bạn cần thấu hiểu cách các engine hiện đại (như Google V8 trong Chrome & Node.js, SpiderMonkey trong Firefox, JavaScriptCore trong Safari) thực thi mã. V8 kết hợp trình thông dịch bytecode nền tảng (Ignition) với trình biên dịch JIT tối ưu hóa (TurboFan). Viết code ổn định cấu trúc (Shape/Hidden Class) và monomorphic cho phép V8 sinh mã máy chạy nhanh tiệm cận mã C++ gốc."
    },
    conceptExplanation: {
      en: "1. The V8 Compilation Pipeline:\n   - Parser: Lexical analysis converts source code into an Abstract Syntax Tree (AST).\n   - Ignition Interpreter: Generates and executes compact bytecode, collecting runtime type feedback.\n   - TurboFan Optimizing Compiler: Hot functions with stable type feedback are compiled into highly optimized machine code.\n   - Deoptimization (Bailout): If an assumption is violated (e.g. passing a string to an optimized math function), TurboFan bails out back to Ignition bytecode!\n\n2. Hidden Classes / Shapes (Maps):\n   - JavaScript objects are dynamically structured. V8 assigns an internal 'Shape' to every object.\n   - Objects initialized with the SAME properties in the SAME order share the same Shape pointer.\n\n3. Inline Caching (IC) & Call Site Polymorphism:\n   - Monomorphic (1 Shape): 100% inline cached; blazing fast direct offset memory read.\n   - Polymorphic (2–4 Shapes): Small switch table lookup.\n   - Megamorphic (5+ Shapes): Cache miss; falls back to slow hash table lookup.\n\n4. Engine Optimization Golden Rules:\n   - Always initialize object properties in the exact same order.\n   - Avoid deleting properties with `delete obj.prop` (mutates shape to dictionary mode); assign `undefined` or `null` instead.",
      vi: "1. Đường Ống Biên Dịch Của V8 Engine:\n   - Trình Phân Tích (Parser): Chuyển mã nguồn JavaScript thành Cây Cú Pháp Trừu Tượng (AST).\n   - Trình Thông Dịch Ignition: Sinh và chạy bytecode nhanh chóng, đồng thời thu thập phản hồi kiểu dữ liệu (Type Feedback).\n   - Trình Biên Dịch Tối Ưu TurboFan: Các hàm 'nóng' (chạy nhiều lần) có kiểu dữ liệu ổn định sẽ được biên dịch thành mã máy tối ưu.\n   - Deoptimization (Bailout): Nếu giả định kiểu bị phá vỡ (ví dụ truyền chuỗi vào hàm tính toán đã tối ưu), TurboFan lập tức hủy mã tối ưu và quay về chạy bytecode Ignition!\n\n2. Hidden Classes / Shapes (Cấu Trúc Ẩn):\n   - Object trong JS có cấu trúc động. V8 gắn một 'Shape' nội bộ cho mỗi object.\n   - Các object được khởi tạo CÙNG thuộc tính theo CÙNG thứ tự sẽ dùng chung một con trỏ Shape.\n\n3. Inline Caching (IC) & Tính Đa Hình Điểm Gọi:\n   - Monomorphic (1 Shape): Cache nội tuyến 100%; đọc trực tiếp ô nhớ với tốc độ tối đa.\n   - Polymorphic (2–4 Shapes): Tra cứu qua bảng rẽ nhánh nhỏ.\n   - Megamorphic (5+ Shapes): Trượt cache; rơi về tra cứu bảng băm (hash table) chậm chạp.\n\n4. Các Quy Tắc Vàng Tối Ưu Engine:\n   - Luôn khởi tạo các thuộc tính của object theo đúng một thứ tự duy nhất.\n   - Tránh xóa thuộc tính bằng `delete obj.prop` (sẽ biến object thành Dictionary Mode chậm); hãy gán `undefined` hoặc `null` thay thế."
    },
    syntax: `// 1. Monomorphic Shape Alignment (TurboFan JIT Optimized)
class Point {
  constructor(x, y) {
    this.x = x; // Shape transition: {} -> {x}
    this.y = y; // Shape transition: {x} -> {x, y}
  }
}

const p1 = new Point(10, 20);
const p2 = new Point(30, 40);
// p1 and p2 share the EXACT SAME V8 Hidden Class / Shape!

// 2. Anti-Pattern: Polymorphic Shape Mutation
function badObjectCreation() {
  const o1 = {}; o1.a = 1; o1.b = 2; // Shape A -> B
  const o2 = {}; o2.b = 2; o2.a = 1; // Shape C -> D (Different order creates different shapes!)
}`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Monomorphic vs Megamorphic Property Access Benchmark",
          vi: "Đo Lường Hiệu Năng Truy Cập Thuộc Tính Monomorphic vs Megamorphic"
        },
        description: {
          en: "Demonstrates how passing objects of identical hidden class shapes enables V8 TurboFan to inline field offsets directly into CPU registers.",
          vi: "Minh họa việc truyền các đối tượng có cùng Hidden Class giúp V8 TurboFan nạp trực tiếp offset vào thanh ghi CPU."
        },
        code: `// Hot function monitored by TurboFan JIT
function calculateTotal(order) {
  return order.price * order.quantity;
}

// 1. Monomorphic: Always passing orders with exact shape { price, quantity }
const stableOrders = Array.from({ length: 1_000_000 }, () => ({
  price: 19.99,
  quantity: 2
}));

console.time("Monomorphic");
let sum = 0;
for (let i = 0; i < stableOrders.length; i++) {
  sum += calculateTotal(stableOrders[i]);
}
console.timeEnd("Monomorphic"); // Blazing fast ~2ms due to Inline Caching!`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using the `delete` operator on high-frequency hot objects (e.g. `delete user.tempKey`).",
          vi: "Dùng toán tử `delete` trên các đối tượng chạy lặp tần suất cao (ví dụ `delete user.tempKey`)."
        },
        correction: {
          en: "Assign `user.tempKey = undefined` or `null` instead of `delete`.",
          vi: "Gán `user.tempKey = undefined` hoặc `null` thay vì dùng `delete`."
        },
        explanation: {
          en: "The `delete` operator alters the object's hidden class layout, forcing V8 to transition the object into 'Dictionary / Slow Mode' hash tables.",
          vi: "Toán tử `delete` làm thay đổi cấu trúc Shape ẩn, ép V8 phải chuyển đối tượng về chế độ tra cứu bảng băm 'Dictionary Mode' chậm chạp."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Initialize all instance fields in constructor in a consistent order",
          vi: "Khởi tạo tất cả các trường trong constructor theo một thứ tự nhất quán"
        },
        description: {
          en: "Ensuring all instances follow identical shape transition trees enables V8's TurboFan to optimize property lookups via Monomorphic Inline Caching.",
          vi: "Đảm bảo mọi instance tuân thủ đúng cây chuyển đổi Shape giúp TurboFan tối ưu hóa việc truy cập thuộc tính bằng Monomorphic Inline Caching."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_28_1",
      title: {
        en: "Refactor Shape-Mismatched Factory to Monomorphic Alignment",
        vi: "Tối Ưu Hàm Factory Bất Đồng Bộ Dạng Thành Chuẩn Monomorphic"
      },
      instruction: {
        en: "Given an un-optimized factory that creates objects with different property insertion orders based on flags, refactor it into a unified class `UserRecord` that always declares all properties (`id`, `name`, `role`, `permissions`) in the exact same deterministic order, setting unused fields to `null`.",
        vi: "Cho hàm factory chưa tối ưu tạo object với thứ tự thêm thuộc tính lộn xộn, hãy tái cấu trúc thành class `UserRecord` luôn khai báo toàn bộ các trường (`id`, `name`, `role`, `permissions`) theo đúng một thứ tự duy nhất, gán trường chưa dùng bằng `null`."
      },
      starterCode: `// Refactor into shape-stable UserRecord class
class UserRecord {
  // Implement shape-stable class
}`,
      solutionCode: `class UserRecord {
  constructor(id, name, role = "user", permissions = null) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.permissions = permissions;
  }
}`,
      hints: [
        {
          en: "In constructor, always initialize this.id, this.name, this.role, and this.permissions in the same sequence.",
          vi: "Trong constructor, luôn khởi tạo this.id, this.name, this.role, và this.permissions theo đúng thứ tự đó."
        }
      ]
    },
    {
      id: "js_ex_28_2",
      title: {
        en: "Fast Dense Array Builder without Hole Deoptimizations",
        vi: "Tạo Mảng Dày (Packed SMI) Tránh Lỗi Thủng Mảng (Sparse Holes)"
      },
      instruction: {
        en: "Write a function `createPackedIntegerArray(size)` that creates a pre-allocated dense array of sequential integers from 0 to `size - 1` without creating sparse holes (`PACKED_SMI_ELEMENTS` optimization in V8).",
        vi: "Viết hàm `createPackedIntegerArray(size)` tạo mảng số nguyên dày liên tục từ 0 đến `size - 1` mà không tạo lỗ thủng phần tử (giữ chế độ tối ưu `PACKED_SMI_ELEMENTS` trong V8)."
      },
      starterCode: `function createPackedIntegerArray(size) {
  // Create dense packed integer array
}`,
      solutionCode: `function createPackedIntegerArray(size) {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = i;
  }
  return arr;
}`,
      hints: [
        {
          en: "Allocate `new Array(size)` and immediately populate every index from 0 to size-1 in a simple loop.",
          vi: "Cấp phát `new Array(size)` và gán ngay toàn bộ chỉ số từ 0 tới size-1 trong một vòng lặp đơn giản."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_28",
    title: {
      en: "High-Performance Monomorphic Vector Math Engine",
      vi: "Engine Tính Toán Vector 3D Hiệu Năng Cao Chuẩn Monomorphic"
    },
    description: {
      en: "Build a high-performance 3D vector arithmetic engine with class `Vector3(x, y, z)` and methods `add(v)`, `dot(v)`, `cross(v)`, and `magnitude()`. Optimize for V8 by reusing instances, avoiding property additions, and preventing type bailing.",
      vi: "Xây dựng engine tính toán vector 3D hiệu năng cao với class `Vector3(x, y, z)` cùng các phương thức `add(v)`, `dot(v)`, `cross(v)` và `magnitude()`. Tối ưu cho V8 bằng cách tái sử dụng instance, tránh thêm thuộc tính động và chống deoptimization."
    },
    starterCode: `class Vector3 {
  // Implement V8 JIT optimized Vector3 engine
}`,
    solutionCode: `class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = Number(x);
    this.y = Number(y);
    this.z = Number(z);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v) {
    const cx = this.y * v.z - this.z * v.y;
    const cy = this.z * v.x - this.x * v.z;
    const cz = this.x * v.y - this.y * v.x;
    this.x = cx;
    this.y = cy;
    this.z = cz;
    return this;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}`,
    hints: [
      {
        en: "Maintain strict `this.x`, `this.y`, `this.z` properties. Mutate in-place to prevent object allocations.",
        vi: "Duy trì cấu trúc cố định `this.x`, `this.y`, `this.z`. Biến đổi trực tiếp tại chỗ để tránh tạo thêm object thừa trong RAM."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_28_1",
      type: "single_choice",
      question: {
        en: "What are the two primary execution components of Google's V8 JavaScript engine?",
        vi: "Hai thành phần thực thi cốt lõi của động cơ Google V8 JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "Ignition (Bytecode Interpreter) and TurboFan (Optimizing JIT Compiler)", vi: "Ignition (Trình thông dịch Bytecode) và TurboFan (Trình biên dịch JIT tối ưu hóa)" } },
        { id: "b", text: { en: "Babel and Webpack", vi: "Babel và Webpack" } },
        { id: "c", text: { en: "SpiderMonkey and JavaScriptCore", vi: "SpiderMonkey và JavaScriptCore" } },
        { id: "d", text: { en: "Node and NPM", vi: "Node và NPM" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Ignition interprets bytecode quickly and collects type feedback; TurboFan compiles hot code to machine instructions.",
        vi: "Ignition thông dịch bytecode và thu thập type feedback; TurboFan biên dịch hàm nóng thành mã máy."
      }
    },
    {
      id: "js_q_28_2",
      type: "predict_output",
      question: {
        en: "What is a 'Hidden Class' or 'Shape' in the V8 engine?",
        vi: "'Hidden Class' hay 'Shape' trong động cơ V8 là gì?"
      },
      options: [
        { id: "a", text: { en: "An internal descriptor created by the engine that tracks object property offsets, allowing fast direct memory addressing instead of dictionary lookups", vi: "Một cấu trúc mô tả nội bộ do engine tạo ra để theo dõi offset của các thuộc tính, cho phép truy cập trực tiếp ô nhớ siêu tốc thay vì tra cứu từ điển" } },
        { id: "b", text: { en: "A CSS class hidden with `display: none`", vi: "Một class CSS bị ẩn bằng `display: none`" } },
        { id: "c", text: { en: "A secret private JavaScript class", vi: "Một class JavaScript bí mật riêng tư" } },
        { id: "d", text: { en: "A database encryption schema", vi: "Một lược đồ mã hóa cơ sở dữ liệu" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Hidden classes (Shapes) enable V8 to treat dynamic JavaScript objects like fixed-layout C++ structs.",
        vi: "Hidden Class (Shape) giúp V8 xử lý đối tượng động của JavaScript với hiệu năng tương đương struct cố định trong C++."
      }
    },
    {
      id: "js_q_28_3",
      type: "single_choice",
      question: {
        en: "What is 'Inline Caching' (IC) in modern JIT compilers?",
        vi: "'Inline Caching' (IC) trong các trình biên dịch JIT hiện đại là gì?"
      },
      options: [
        { id: "a", text: { en: "A technique that remembers the memory offset of property lookups for specific object Shapes directly at the call site in machine code", vi: "Kỹ thuật ghi nhớ trực tiếp offset bộ nhớ của thuộc tính cho các Shape đối tượng cụ thể ngay tại điểm gọi trong mã máy" } },
        { id: "b", text: { en: "Caching HTML files in the browser cache", vi: "Lưu file HTML trong bộ nhớ cache trình duyệt" } },
        { id: "c", text: { en: "Storing images in localStorage", vi: "Lưu hình ảnh vào localStorage" } },
        { id: "d", text: { en: "Compressing CSS inline styles", vi: "Nén các style inline trong CSS" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Inline caches bypass expensive property resolution by caching the shape and offset.",
        vi: "Inline Caching bỏ qua quá trình tra cứu thuộc tính đắt đỏ bằng cách ghi nhớ sẵn Shape và vị trí offset."
      }
    },
    {
      id: "js_q_28_4",
      type: "predict_output",
      question: {
        en: "What is the difference between a 'Monomorphic' and a 'Megamorphic' call site?",
        vi: "Điểm khác biệt giữa điểm gọi 'Monomorphic' và 'Megamorphic' là gì?"
      },
      options: [
        { id: "a", text: { en: "Monomorphic sees only 1 object shape (100% cache hit, fastest machine code); Megamorphic sees 5+ different shapes (cache miss, falls back to slow generic lookup)", vi: "Monomorphic chỉ gặp đúng 1 dạng Shape (trúng cache 100%, mã máy chạy nhanh nhất); Megamorphic gặp từ 5 dạng Shape khác nhau trở lên (trượt cache, rơi về tra cứu chậm)" } },
        { id: "b", text: { en: "Monomorphic is for arrays, Megamorphic is for objects", vi: "Monomorphic dành cho mảng, Megamorphic dành cho object" } },
        { id: "c", text: { en: "Monomorphic runs on single-core CPUs", vi: "Monomorphic chạy trên CPU đơn nhân" } },
        { id: "d", text: { en: "Megamorphic is deprecated in ES6", vi: "Megamorphic đã bị xóa bỏ trong ES6" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Keeping functions monomorphic allows TurboFan to generate raw machine instructions without branching.",
        vi: "Giữ cho các hàm đạt chuẩn Monomorphic giúp TurboFan sinh mã máy trực tiếp mà không cần rẽ nhánh kiểm tra."
      }
    },
    {
      id: "js_q_28_5",
      type: "single_choice",
      question: {
        en: "What causes a JIT 'Deoptimization' (Bailout) in V8?",
        vi: "Nguyên nhân nào dẫn đến hiện tượng 'Deoptimization' (Bailout) trong trình JIT của V8?"
      },
      options: [
        { id: "a", text: { en: "Passing a value with an unexpected type or shape to a function that was previously optimized under speculative type assumptions", vi: "Truyền một giá trị có kiểu dữ liệu hoặc Shape bất thường vào một hàm đã được biên dịch tối ưu hóa trước đó" } },
        { id: "b", text: { en: "Calling console.log()", vi: "Gọi hàm console.log()" } },
        { id: "c", text: { en: "Using ES6 let and const", vi: "Sử dụng let và const trong ES6" } },
        { id: "d", text: { en: "Writing comments in JavaScript", vi: "Viết chú thích (comment) trong mã nguồn JavaScript" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "When speculative type assumptions fail, TurboFan must discard optimized machine code and bail out to bytecode.",
        vi: "Khi giả định về kiểu bị sai, TurboFan buộc phải hủy mã máy đã tối ưu và quay về chạy thông dịch bytecode."
      }
    },
    {
      id: "js_q_28_6",
      type: "predict_output",
      question: {
        en: "Why is initializing properties in different orders (`{a:1, b:2}` vs `{b:2, a:1}`) bad for performance in V8?",
        vi: "Tại sao việc khởi tạo các thuộc tính theo thứ tự khác nhau (`{a:1, b:2}` vs `{b:2, a:1}`) lại gây hại cho hiệu năng trong V8?"
      },
      options: [
        { id: "a", text: { en: "Because V8 creates two completely distinct Hidden Classes / Shapes for each property transition path, turning downstream functions polymorphic or megamorphic", vi: "Vì V8 tạo ra 2 Hidden Class / Shape hoàn toàn khác nhau cho từng nhánh chuyển đổi thuộc tính, khiến các hàm phía sau bị đa hình hóa (polymorphic/megamorphic)" } },
        { id: "b", text: { en: "Because it corrupts the hard drive", vi: "Vì nó làm hỏng ổ cứng" } },
        { id: "c", text: { en: "Because JavaScript sorts properties alphabetically automatically", vi: "Vì JavaScript tự động sắp xếp thuộc tính theo thứ tự bảng chữ cái" } },
        { id: "d", text: { en: "Because V8 throws a SyntaxError", vi: "Vì V8 sẽ ném lỗi SyntaxError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Property insertion order dictates shape transitions in V8. Mismatched orders produce different hidden classes.",
        vi: "Thứ tự thêm thuộc tính quyết định chuỗi chuyển đổi Shape trong V8. Thứ tự lệch nhau sẽ tạo ra các hidden class khác nhau."
      }
    },
    {
      id: "js_q_28_7",
      type: "fill_blank",
      question: {
        en: "The intermediate tree representation produced by the parser before bytecode generation is called an _____ (Abstract Syntax Tree).",
        vi: "Cấu trúc cây trung gian do parser tạo ra trước khi sinh bytecode được gọi là _____ (Abstract Syntax Tree)."
      },
      correctAnswer: "AST",
      explanation: {
        en: "An AST represents the syntactic structure of source code in a hierarchical tree format.",
        vi: "AST đại diện cho cấu trúc ngữ pháp của mã nguồn dưới dạng cây phân cấp."
      }
    },
    {
      id: "js_q_28_8",
      type: "single_choice",
      question: {
        en: "Why should you avoid using `delete obj.prop` in performance-critical code?",
        vi: "Tại sao nên tránh dùng `delete obj.prop` trong các đoạn mã đòi hỏi hiệu năng cao?"
      },
      options: [
        { id: "a", text: { en: "It mutates the object's shape into 'Dictionary / Slow Mode', disabling fast inline caching and inline field offset reads", vi: "Nó làm biến đổi cấu trúc Shape của đối tượng sang 'Dictionary Mode' chậm chạp, vô hiệu hóa cơ chế Inline Caching và đọc trực tiếp ô nhớ" } },
        { id: "b", text: { en: "`delete` is forbidden in strict mode", vi: "`delete` bị cấm trong strict mode" } },
        { id: "c", text: { en: "`delete` deletes the entire object from RAM", vi: "`delete` xóa toàn bộ object khỏi RAM" } },
        { id: "d", text: { en: "`delete` runs asynchronously", vi: "`delete` chạy bất đồng bộ" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`delete` changes object representation to hash maps, destroying hidden class optimizations.",
        vi: "`delete` chuyển cấu trúc lưu trữ của object sang bảng băm (hash map), làm mất sạch các tối ưu hóa của hidden class."
      }
    },
    {
      id: "js_q_28_9",
      type: "predict_output",
      question: {
        en: "What is an 'Array Hole' (Sparse Array) in V8 and why does it hurt performance?",
        vi: "'Array Hole' (Mảng Thưa / Sparse Array) trong V8 là gì và tại sao nó làm giảm hiệu năng?"
      },
      options: [
        { id: "a", text: { en: "An unassigned index (e.g. `[1, , 3]`) that forces V8 to search up the prototype chain on every element access to confirm the hole is truly empty", vi: "Một chỉ số chưa được gán giá trị (ví dụ `[1, , 3]`) ép V8 phải tra cứu ngược lên chuỗi prototype ở mọi lần đọc phần tử để kiểm tra xem vị trí đó có rỗng thật không" } },
        { id: "b", text: { en: "An array with negative numbers", vi: "Một mảng chứa số âm" } },
        { id: "c", text: { en: "An array containing strings", vi: "Một mảng chứa chuỗi ký tự" } },
        { id: "d", text: { en: "An empty array `[]`", vi: "Một mảng rỗng `[]`" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Holes deoptimize V8's array element kind from `PACKED` to `HOLEY`, triggering prototype chain checks on every access.",
        vi: "Các lỗ thủng làm chuyển đổi kiểu mảng từ `PACKED` sang `HOLEY`, gây tốn tài nguyên tra cứu prototype chain ở mỗi lần đọc."
      }
    },
    {
      id: "js_q_28_10",
      type: "code_reasoning",
      question: {
        en: "How does writing clean, type-consistent, shape-stable JavaScript help the V8 engine achieve near C++ speeds?",
        vi: "Lối viết JavaScript sạch sẽ, đồng nhất kiểu dữ liệu và ổn định cấu trúc Shape giúp động cơ V8 đạt tốc độ tiệm cận C++ như thế nào?"
      },
      options: [
        { id: "a", text: { en: "It allows TurboFan to generate deterministic, unbranched native machine code with direct register operations and inlined method calls without type checks or bailout deoptimizations", vi: "Nó cho phép TurboFan sinh mã máy trực tiếp không cần rẽ nhánh với các thao tác thanh ghi và inline hàm mà không cần kiểm tra kiểu hay bị deoptimization" } },
        { id: "b", text: { en: "It automatically translates JavaScript to Rust", vi: "Nó tự động dịch JavaScript sang Rust" } },
        { id: "c", text: { en: "It disables the browser security sandbox", vi: "Nó tắt sandbox bảo mật của trình duyệt" } },
        { id: "d", text: { en: "It increases GPU clock speeds", vi: "Nó tăng xung nhịp GPU" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Predictable, monomorphic patterns enable TurboFan to emit optimal CPU instructions identical to compiled native languages.",
        vi: "Các mẫu mã nhất quán và monomorphic cho phép TurboFan xuất ra các tập lệnh CPU tối ưu tương đương các ngôn ngữ biên dịch gốc."
      }
    }
  ]
};

// Write Lesson 27 and 28
fs.writeFileSync(path.join(dir, 'lesson27.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson27: Lesson = ${JSON.stringify(lesson27, null, 2)};\nexport default lesson27;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson28.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson28: Lesson = ${JSON.stringify(lesson28, null, 2)};\nexport default lesson28;\n`, 'utf8');
console.log('Lessons 27 and 28 generated.');
