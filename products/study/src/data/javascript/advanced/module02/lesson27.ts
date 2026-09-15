import { Lesson } from '../../../../types';

export const lesson27: Lesson = {
  "id": "js_lesson_27",
  "courseId": "javascript",
  "levelId": "advanced",
  "moduleId": "js_mod_6",
  "order": 27,
  "title": {
    "en": "Modern ES2020–ES2024 Ergonomic Language Features",
    "vi": "Các Tính Năng Ngôn Ngữ Hiện Đại ES2020–ES2024"
  },
  "summary": {
    "en": "Master recent ECMAScript additions: Optional Chaining (`?.`), Nullish Coalescing (`??`), Logical Assignment (`||=`, `&&=`, `??=`), `structuredClone`, `Object.hasOwn`, `Object.groupBy`, `Promise.withResolvers`, and immutable Array methods (`toSorted`, `with`).",
    "vi": "Làm chủ các tính năng ECMAScript mới nhất: Optional Chaining (`?.`), Nullish Coalescing (`??`), Phép gán logic (`||=`, `&&=`, `??=`), `structuredClone`, `Object.hasOwn`, `Object.groupBy`, `Promise.withResolvers` và các hàm Array bất biến (`toSorted`, `with`)."
  },
  "estimatedMinutes": 22,
  "topicId": "js_es2020_es2024",
  "learn": {
    "introduction": {
      "en": "ECMAScript releases yearly updates that enhance language ergonomics, type safety, and functional programming capabilities. Recent specifications (ES2020 through ES2024) have introduced transformative features that eliminate boilerplate code, replace outdated utility libraries (like lodash deep cloning and grouping), and bring native immutable data manipulation into core JavaScript.",
      "vi": "ECMAScript liên tục cập nhật các phiên bản mới hàng năm nhằm tối ưu cú pháp, tăng cường độ an toàn kiểu dữ liệu và nâng cao năng lực lập trình hàm. Các đặc tả gần đây (từ ES2020 đến ES2024) mang lại những tính năng đột phá giúp loại bỏ code dài dòng, thay thế các thư viện tiện ích cũ (như lodash deep clone, group by) và hỗ trợ thao tác dữ liệu bất biến nguyên bản trong JavaScript."
    },
    "conceptExplanation": {
      "en": "1. Safe Traversal & Fallbacks:\n   - Optional Chaining (`?.`): `user?.profile?.address?.zipCode` or `fn?.()` stops evaluation and returns `undefined` if target is `null` or `undefined`.\n   - Nullish Coalescing (`??`): Returns right-hand side ONLY if left is `null` or `undefined` (unlike `||`, it preserves `0`, `\"\"`, and `false`).\n\n2. Logical Assignment Operators:\n   - `a ||= b`: Assigns `b` only if `a` is falsy.\n   - `a &&= b`: Assigns `b` only if `a` is truthy.\n   - `a ??= b`: Assigns `b` only if `a` is nullish (`null` or `undefined`).\n\n3. Modern Core Utilities:\n   - `structuredClone(obj)`: Native deep clone supporting circular references, Maps, Sets, and Dates.\n   - `Object.hasOwn(obj, prop)`: Modern, robust replacement for `Object.prototype.hasOwnProperty`.\n   - `Object.groupBy(iterable, callback)`: Native categorical grouping.\n   - `Promise.withResolvers()`: Returns `{ promise, resolve, reject }` without wrapping in a Promise constructor callback.\n\n4. Change Array by Copy (Immutable Array Methods):\n   - `.toSorted()`, `.toReversed()`, `.toSpliced()`, and `.with(index, value)` return new transformed arrays without mutating the original!",
      "vi": "1. Truy Cập An Toàn & Giá Trị Mặc Định:\n   - Optional Chaining (`?.`): `user?.profile?.address?.zipCode` hoặc `fn?.()` tự dừng và trả về `undefined` nếu gặp `null` hoặc `undefined`.\n   - Nullish Coalescing (`??`): Chỉ lấy vế phải khi vế trái là `null` hoặc `undefined` (khác với `||`, nó giữ nguyên `0`, `\"\"`, và `false`).\n\n2. Toán Tử Gán Logic:\n   - `a ||= b`: Chỉ gán `b` nếu `a` là falsy.\n   - `a &&= b`: Chỉ gán `b` nếu `a` là truthy.\n   - `a ??= b`: Chỉ gán `b` nếu `a` là nullish (`null` hoặc `undefined`).\n\n3. Tiện Ích Chuẩn Hiện Đại:\n   - `structuredClone(obj)`: Deep clone nguyên bản hỗ trợ tham chiếu vòng, Map, Set và Date.\n   - `Object.hasOwn(obj, prop)`: Thay thế chuẩn an toàn cho `hasOwnProperty`.\n   - `Object.groupBy(iterable, callback)`: Gom nhóm mảng theo danh mục nguyên bản.\n   - `Promise.withResolvers()`: Trả về `{ promise, resolve, reject }` mà không cần bọc callback constructor.\n\n4. Thao Tác Mảng Bất Biến (Change Array by Copy):\n   - `.toSorted()`, `.toReversed()`, `.toSpliced()`, và `.with(index, value)` trả về mảng mới mà không làm thay đổi mảng gốc!"
    },
    "syntax": "// 1. Immutable Array Updates & Object Grouping (ES2023/ES2024)\nconst originalList = [\"Banana\", \"Apple\", \"Cherry\"];\nconst sortedList = originalList.toSorted(); // ['Apple', 'Banana', 'Cherry']\nconst updatedList = originalList.with(1, \"Avocado\"); // ['Banana', 'Avocado', 'Cherry']\nconsole.log(\"Original list untouched:\", originalList); // ['Banana', 'Apple', 'Cherry']\n\n// Grouping by category\nconst inventory = [\n  { name: \"Asparagus\", type: \"vegetables\" },\n  { name: \"Bananas\", type: \"fruit\" },\n  { name: \"Cherries\", type: \"fruit\" }\n];\nconst grouped = Object.groupBy(inventory, item => item.type);\n// { vegetables: [...], fruit: [...] }\n\n// 2. Promise.withResolvers() (ES2024)\nconst { promise, resolve, reject } = Promise.withResolvers();\nsetTimeout(() => resolve(\"Data loaded!\"), 500);\nconsole.log(await promise); // \"Data loaded!\"",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Configuration Merger with Nullish Coalescing & Logical Assignment",
          "vi": "Hợp Nhất Cấu Hình Ứng Dụng Bằng Nullish Coalescing & Phép Gán Logic"
        },
        "description": {
          "en": "Demonstrates writing ultra-clean, defect-free configuration merging without overriding legitimate falsy values (like 0 or false).",
          "vi": "Minh họa hợp nhất cấu hình sạch sẽ, không ghi đè nhầm các giá trị falsy hợp lệ (như 0 hoặc false)."
        },
        "code": "function initializeAppSettings(userConfig = {}) {\n  // Deep clone to prevent mutating input\n  const config = structuredClone(userConfig);\n\n  // Logical nullish assignment: only set if undefined/null\n  config.timeoutMs ??= 5000;\n  config.retries ??= 3;\n  config.enableLogging ??= true;\n  config.debugPort ??= 0; // Preserves port 0!\n\n  // Optional chaining with fallback\n  const theme = config.ui?.theme?.mode ?? \"system\";\n  const authHeader = config.auth?.token ? `Bearer ${config.auth.token}` : null;\n\n  return { ...config, computed: { theme, authHeader } };\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using the logical OR operator `||` when setting default options (e.g. `const limit = options.limit || 10`).",
          "vi": "Dùng toán tử OR `||` khi thiết lập giá trị mặc định (ví dụ `const limit = options.limit || 10`)."
        },
        "correction": {
          "en": "Use the Nullish Coalescing operator `??` (`const limit = options.limit ?? 10`).",
          "vi": "Sử dụng toán tử Nullish Coalescing `??` (`const limit = options.limit ?? 10`)."
        }
      }
    ],
    "tips": [
      {
        "en": "Use native Object.hasOwn() instead of obj.hasOwnProperty(): `Object.hasOwn(obj, 'prop')` is safe against objects created with `Object.create(null)` that do not inherit from `Object.prototype`.",
        "vi": "Dùng Object.hasOwn() thay vì obj.hasOwnProperty(): `Object.hasOwn(obj, 'prop')` hoạt động an toàn tuyệt đối với cả các object tạo từ `Object.create(null)` không có prototype."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_27_1",
      "type": "complete_code",
      "title": {
        "en": "Clean Nested State Updaters with Immutable Array.with & toSorted",
        "vi": "Cập Nhật Trạng Thái Bất Biến Bằng Array.with & toSorted"
      },
      "instruction": {
        "en": "Write a pure function `updateUserScore(leaderboard, targetIndex, newScore)` that returns a new leaderboard array with the score at `targetIndex` updated and sorted descending by `score` without mutating the input array.",
        "vi": "Viết hàm thuần túy `updateUserScore(leaderboard, targetIndex, newScore)` trả về mảng bảng xếp hạng mới có điểm tại `targetIndex` được cập nhật và sắp xếp giảm dần theo `score` mà không làm thay đổi mảng đầu vào."
      },
      "starterCode": "function updateUserScore(leaderboard, targetIndex, newScore) {\n  // Pure update using .with() and .toSorted()\n}",
      "solutionCode": "function updateUserScore(leaderboard, targetIndex, newScore) {\n  const currentItem = leaderboard[targetIndex];\n  if (!currentItem) return leaderboard;\n\n  const updatedItem = { ...currentItem, score: newScore };\n  return leaderboard\n    .with(targetIndex, updatedItem)\n    .toSorted((a, b) => b.score - a.score);\n}",
      "hint": {
        "en": "Use `leaderboard.with(targetIndex, updatedItem)` then chain `.toSorted((a, b) => b.score - a.score)`.",
        "vi": "Dùng `leaderboard.with(targetIndex, updatedItem)` rồi nối tiếp `.toSorted((a, b) => b.score - a.score)`."
      }
    },
    {
      "id": "js_ex_27_2",
      "type": "complete_code",
      "title": {
        "en": "Categorical Analytics Aggregator with Object.groupBy",
        "vi": "Tổng Hợp Thống Kê Danh Mục Bằng Object.groupBy"
      },
      "instruction": {
        "en": "Write a function `summarizeTransactions(transactions)` that groups transactions by `type` (e.g. 'income' vs 'expense') using `Object.groupBy` and calculates the `totalAmount` and `count` for each category.",
        "vi": "Viết hàm `summarizeTransactions(transactions)` gom nhóm các giao dịch theo `type` (như 'income' vs 'expense') sử dụng `Object.groupBy` và tính `totalAmount` cùng `count` cho từng danh mục."
      },
      "starterCode": "function summarizeTransactions(transactions) {\n  // Group and summarize\n}",
      "solutionCode": "function summarizeTransactions(transactions) {\n  const grouped = Object.groupBy(transactions, t => t.type);\n  const summary = {};\n\n  for (const [type, items] of Object.entries(grouped)) {\n    summary[type] = {\n      count: items.length,\n      totalAmount: items.reduce((acc, curr) => acc + curr.amount, 0)\n    };\n  }\n\n  return summary;\n}",
      "hint": {
        "en": "Use `Object.groupBy(transactions, t => t.type)`. Iterate over `Object.entries(grouped)` calculating count and sum.",
        "vi": "Dùng `Object.groupBy(transactions, t => t.type)`. Lặp qua `Object.entries(grouped)` tính count và tổng sum."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_27",
    "title": {
      "en": "Concurrent Request Gate with Promise.withResolvers()",
      "vi": "Cổng Khóa Yêu Cầu Đồng Thời Bằng Promise.withResolvers()"
    },
    "description": {
      "en": "Build an async concurrency barrier `createGate()` that allows multiple tasks to pause at `await gate.wait()` until `gate.open(payload)` is called, which resolves all waiting tasks with `payload`. If opened, subsequent `wait()` calls resolve immediately.",
      "vi": "Xây dựng rào chắn đồng bộ bất đồng bộ `createGate()` cho phép nhiều tác vụ tạm dừng tại `await gate.wait()` cho đến khi `gate.open(payload)` được gọi, giải phóng tất cả các tác vụ đang chờ với `payload`. Nếu đã mở, các lệnh `wait()` tiếp theo resolve ngay lập tức."
    },
    "starterCode": "function createGate() {\n  // Implement gate using Promise.withResolvers\n}",
    "solutionCode": "function createGate() {\n  const { promise, resolve, reject } = Promise.withResolvers();\n  let isOpen = false;\n  let result = null;\n\n  return {\n    wait() {\n      if (isOpen) return Promise.resolve(result);\n      return promise;\n    },\n    open(payload) {\n      if (!isOpen) {\n        isOpen = true;\n        result = payload;\n        resolve(payload);\n      }\n    },\n    fail(error) {\n      if (!isOpen) {\n        isOpen = true;\n        reject(error);\n      }\n    }\n  };\n}",
    "hints": [
      {
        "en": "Use `Promise.withResolvers()`. In wait(), return the promise if not open, or Promise.resolve(result) if already open.",
        "vi": "Dùng `Promise.withResolvers()`. Trong wait(), trả về promise nếu chưa mở hoặc Promise.resolve(result) nếu đã mở."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Concurrent Request Gate with Promise.withResolvers() according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Cổng Khóa Yêu Cầu Đồng Thời Bằng Promise.withResolvers() theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_27_1",
      "type": "single_choice",
      "question": {
        "en": "What is the difference between `a ?? b` (Nullish Coalescing) and `a || b` (Logical OR)?",
        "vi": "Điểm khác biệt giữa `a ?? b` (Nullish Coalescing) và `a || b` (Logical OR) là gì?"
      },
      "options": [
        {
          "en": "`??` falls back to `b` ONLY when `a` is `null` or `undefined`, preserving valid falsy values like `0`, `\"\"`, and `false`",
          "vi": "`??` chỉ lấy giá trị `b` KHI `a` là `null` hoặc `undefined`, bảo toàn các giá trị falsy hợp lệ như `0`, `\"\"`, và `false`"
        },
        {
          "en": "`??` only works on numbers",
          "vi": "`??` chỉ dùng được cho kiểu số"
        },
        {
          "en": "`||` is faster than `??`",
          "vi": "`||` chạy nhanh hơn `??`"
        },
        {
          "en": "There is no functional difference",
          "vi": "Không có sự khác biệt nào về chức năng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`??` strictly checks for nullish values (`null` / `undefined`), preventing bugs when `0` or `false` are valid user values.",
        "vi": "`??` chỉ kiểm tra giá trị nullish (`null`/`undefined`), tránh lỗi khi `0` hoặc `false` là dữ liệu hợp lệ."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "easy"
    },
    {
      "id": "js_q_27_2",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log(0 ?? 42)` and `console.log(0 || 42)` print?",
        "vi": "`console.log(0 ?? 42)` và `console.log(0 || 42)` sẽ in ra kết quả gì?"
      },
      "options": [
        {
          "en": "0 and 42",
          "vi": "0 và 42"
        },
        {
          "en": "42 and 42",
          "vi": "42 và 42"
        },
        {
          "en": "0 and 0",
          "vi": "0 và 0"
        },
        {
          "en": "undefined and 42",
          "vi": "undefined và 42"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`0 ?? 42` returns `0` because `0` is not nullish. `0 || 42` returns `42` because `0` is falsy.",
        "vi": "`0 ?? 42` trả về `0` vì `0` không phải nullish. `0 || 42` trả về `42` vì `0` là giá trị falsy."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "easy"
    },
    {
      "id": "js_q_27_3",
      "type": "single_choice",
      "question": {
        "en": "What is the primary capability of `structuredClone()` compared to `JSON.parse(JSON.stringify(obj))`?",
        "vi": "Ưu điểm vượt trội của `structuredClone()` so với `JSON.parse(JSON.stringify(obj))` là gì?"
      },
      "options": [
        {
          "en": "It accurately clones circular references, Maps, Sets, Dates, RegExps, ArrayBuffers, and BigInts without data loss or exceptions",
          "vi": "Nó sao chép chính xác tham chiếu vòng, Map, Set, Date, RegExp, ArrayBuffer và BigInt mà không làm mất dữ liệu hay gây lỗi"
        },
        {
          "en": "It converts JavaScript into WebAssembly",
          "vi": "Nó chuyển JavaScript thành WebAssembly"
        },
        {
          "en": "It encrypts cloned data with AES-256",
          "vi": "Nó mã hóa dữ liệu clone bằng AES-256"
        },
        {
          "en": "It compresses images",
          "vi": "Nó nén hình ảnh"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`structuredClone` uses the browser's native structured clone algorithm, supporting complex graphs and types.",
        "vi": "`structuredClone` dùng thuật toán clone có cấu trúc của trình duyệt, hỗ trợ trọn vẹn các kiểu dữ liệu phức tạp."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "easy"
    },
    {
      "id": "js_q_27_4",
      "type": "predict_output",
      "question": {
        "en": "What does the immutable array method `[10, 20, 30].with(1, 99)` return?",
        "vi": "Phương thức mảng bất biến `[10, 20, 30].with(1, 99)` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "A new array `[10, 99, 30]`, leaving the original array completely untouched",
          "vi": "Một mảng mới `[10, 99, 30]`, giữ nguyên vẹn mảng gốc không bị biến đổi"
        },
        {
          "en": "Mutates the original array to [10, 99, 30] and returns length",
          "vi": "Biến đổi trực tiếp mảng gốc thành [10, 99, 30] và trả về độ dài"
        },
        {
          "en": "99",
          "vi": "99"
        },
        {
          "en": "Throws a TypeError",
          "vi": "Ném lỗi TypeError"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The ES2023 `.with(index, value)` method returns a new array with the element at index replaced.",
        "vi": "Hàm `.with(index, value)` trong ES2023 trả về mảng mới có phần tử tại vị trí index được thay thế."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "medium"
    },
    {
      "id": "js_q_27_5",
      "type": "single_choice",
      "question": {
        "en": "What does `Promise.withResolvers()` return in ES2024?",
        "vi": "`Promise.withResolvers()` trong ES2024 trả về cấu trúc gì?"
      },
      "options": [
        {
          "en": "An object `{ promise, resolve, reject }` allowing promise resolution from outside callback scope",
          "vi": "Một đối tượng `{ promise, resolve, reject }` cho phép resolve/reject promise từ bên ngoài phạm vi callback"
        },
        {
          "en": "An array of 3 resolved values",
          "vi": "Một mảng gồm 3 giá trị đã resolve"
        },
        {
          "en": "A cancelled Promise",
          "vi": "Một Promise đã bị hủy"
        },
        {
          "en": "A Web Worker thread",
          "vi": "Một luồng Web Worker"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Promise.withResolvers()` exposes `{ promise, resolve, reject }` without manual deferred closure patterns.",
        "vi": "`Promise.withResolvers()` cung cấp trực tiếp `{ promise, resolve, reject }` mà không cần viết pattern deferred thủ công."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "medium"
    },
    {
      "id": "js_q_27_6",
      "type": "predict_output",
      "question": {
        "en": "What does the logical assignment `x ??= 10` do when `x` is `undefined`?",
        "vi": "Phép gán logic `x ??= 10` thực hiện điều gì khi `x` đang có giá trị `undefined`?"
      },
      "options": [
        {
          "en": "Assigns 10 to `x` (`x` becomes 10)",
          "vi": "Gán 10 cho `x` (`x` trở thành 10)"
        },
        {
          "en": "Leaves `x` as undefined",
          "vi": "Giữ nguyên `x` là undefined"
        },
        {
          "en": "Throws a ReferenceError",
          "vi": "Ném lỗi ReferenceError"
        },
        {
          "en": "Sets x to null",
          "vi": "Gán x thành null"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`x ??= 10` is equivalent to `if (x === null || x === undefined) x = 10`.",
        "vi": "`x ??= 10` tương đương với câu lệnh `if (x === null || x === undefined) x = 10`."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "medium"
    },
    {
      "id": "js_q_27_7",
      "type": "fill_blank",
      "question": {
        "en": "To check if an object possesses a direct property safely without relying on prototype methods, use Object._____(obj, prop).",
        "vi": "Để kiểm tra an toàn xem đối tượng có sở hữu trực tiếp thuộc tính mà không dựa vào prototype, dùng Object._____(obj, prop)."
      },
      "options": [
        {
          "en": "Option A",
          "vi": "Đáp án A"
        },
        {
          "en": "Option B",
          "vi": "Đáp án B"
        },
        {
          "en": "Option C",
          "vi": "Đáp án C"
        },
        {
          "en": "Option D",
          "vi": "Đáp án D"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Object.hasOwn(obj, prop)` is the modern standard replacement for `hasOwnProperty`.",
        "vi": "`Object.hasOwn(obj, prop)` là chuẩn hiện đại thay thế cho `hasOwnProperty`."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "hasown"
      ]
    },
    {
      "id": "js_q_27_8",
      "type": "single_choice",
      "question": {
        "en": "Which modern array method returns a sorted copy of an array without mutating the original?",
        "vi": "Phương thức mảng hiện đại nào trả về bản sao đã sắp xếp mà không làm thay đổi mảng ban đầu?"
      },
      "options": [
        {
          "en": ".toSorted()",
          "vi": ".toSorted()"
        },
        {
          "en": ".sort()",
          "vi": ".sort()"
        },
        {
          "en": ".sorted()",
          "vi": ".sorted()"
        },
        {
          "en": ".asSorted()",
          "vi": ".asSorted()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.toSorted()` is the non-mutating version of `.sort()` introduced in ES2023.",
        "vi": "`.toSorted()` là phiên bản không gây biến đổi mảng của `.sort()` được bổ sung trong ES2023."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "hard"
    },
    {
      "id": "js_q_27_9",
      "type": "predict_output",
      "question": {
        "en": "What will `user?.getAddress?.()?.zip` return if `getAddress` is not a function on `user`?",
        "vi": "`user?.getAddress?.()?.zip` sẽ trả về gì nếu `getAddress` không phải là hàm trên `user`?"
      },
      "options": [
        {
          "en": "undefined (without throwing a TypeError)",
          "vi": "undefined (mà không ném lỗi TypeError)"
        },
        {
          "en": "Throws TypeError: getAddress is not a function",
          "vi": "Ném lỗi TypeError: getAddress is not a function"
        },
        {
          "en": "null",
          "vi": "null"
        },
        {
          "en": "false",
          "vi": "false"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `?.()` syntax safely checks function existence before invoking, returning `undefined` if absent.",
        "vi": "Cú pháp `?.()` kiểm tra an toàn sự tồn tại của hàm trước khi gọi, trả về `undefined` nếu không tồn tại."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "hard"
    },
    {
      "id": "js_q_27_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `Object.groupBy()` a significant addition to native JavaScript?",
        "vi": "Tại sao `Object.groupBy()` là một bổ sung quan trọng cho JavaScript nguyên bản?"
      },
      "options": [
        {
          "en": "It eliminates the need for external libraries (like Lodash `_.groupBy`) or complex custom `.reduce()` accumulator boilerplate for categorical data partitioning",
          "vi": "Nó loại bỏ nhu cầu phải cài thư viện ngoài (như Lodash `_.groupBy`) hay phải viết `.reduce()` gom nhóm thủ công phức tạp"
        },
        {
          "en": "It connects directly to SQL databases",
          "vi": "Nó kết nối trực tiếp với database SQL"
        },
        {
          "en": "It formats JSON files into XML",
          "vi": "Nó định dạng file JSON sang XML"
        },
        {
          "en": "It renders HTML tables",
          "vi": "Nó tự động render bảng HTML"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Object.groupBy` provides native, highly optimized categorical partitioning in core JavaScript.",
        "vi": "`Object.groupBy` cung cấp cơ chế phân nhóm danh mục nguyên bản được tối ưu cao trong core JavaScript."
      },
      "topicId": "js_es2020_es2024",
      "difficulty": "hard"
    }
  ]
};
export default lesson27;
