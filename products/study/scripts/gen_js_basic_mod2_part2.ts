import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/basic/module02');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 07 ---
const lesson07: Lesson = {
  id: "js_lesson_7",
  courseId: "javascript",
  levelId: "basic",
  moduleId: "js_mod_2",
  order: 7,
  title: {
    en: "Loops & Iteration: for, while, for...of, and for...in",
    vi: "Vòng Lặp & Duyệt Dữ Liệu: for, while, for...of và for...in"
  },
  summary: {
    en: "Master traditional for/while loops, modern iterable iteration with for...of, object property enumeration with for...in, break, continue, and loop labels.",
    vi: "Làm chủ vòng lặp for/while truyền thống, duyệt cấu trúc iterable với for...of, duyệt thuộc tính object với for...in, ngắt/bỏ qua bằng break, continue và nhãn vòng lặp."
  },
  estimatedMinutes: 20,
  topicId: "js_loops_iteration",
  learn: {
    introduction: {
      en: "Loops automate repetitive computational tasks and array processing. JavaScript provides multiple looping mechanisms: traditional index-based `for` loops, condition-driven `while` and `do...while` loops, modern iterable iteration via `for...of`, and property key enumeration with `for...in`. Understanding which loop to choose—and how to control execution with `break` and `continue`—is fundamental to writing efficient algorithms.",
      vi: "Vòng lặp giúp tự động hóa các tác vụ tính toán lặp đi lặp lại và xử lý mảng. JavaScript cung cấp nhiều cơ chế lặp: vòng lặp `for` truyền thống qua chỉ số, `while` và `do...while` theo điều kiện, `for...of` hiện đại cho các đối tượng lặp (iterable) và `for...in` để duyệt key của object. Hiểu đúng thời điểm sử dụng từng loại vòng lặp và cách kiểm soát bằng `break` / `continue` là nền tảng quan trọng."
    },
    conceptExplanation: {
      en: "1. Traditional `for` & `while` Loops: Standard `for (let i = 0; i < len; i++)` is fastest for raw numeric indexing and matrix manipulations. `while (cond)` loops while a condition is true, and `do { ... } while (cond)` guarantees at least one execution.\n\n2. `for...of` (Iterables): Iterates directly over VALUES of iterable objects (Arrays, Strings, Sets, Maps, NodeLists, Generators). Supports `break` and `continue` (unlike `Array.prototype.forEach`).\n\n3. `for...in` (Object Keys): Enumerates all enumerable property KEYS of an object, including inherited prototype properties. Always guard with `Object.hasOwn(obj, key)` or prefer `Object.keys()` / `Object.entries()`.\n\n4. `break`, `continue` & Labels: `break` exits the nearest enclosing loop immediately; `continue` skips the current iteration step. Labeled statements (`outerLoop: for (...)`) permit breaking out of deeply nested multi-dimensional loops directly.",
      vi: "1. Vòng lặp `for` & `while` truyền thống: `for (let i = 0; i < len; i++)` tối ưu tốc độ cho thao tác ma trận và mảng lớn. `while (cond)` lặp khi điều kiện còn đúng, và `do...while` đảm bảo khối lệnh được chạy ít nhất một lần.\n\n2. `for...of` (Duyệt giá trị Iterable): Duyệt trực tiếp qua GIÁ TRỊ của mảng, chuỗi, Set, Map, NodeList. Cho phép dùng `break` và `continue` linh hoạt (điều mà `forEach` không làm được).\n\n3. `for...in` (Duyệt key của Object): Duyệt qua các TÊN THUỘC TÍNH (keys) có thể liệt kê, bao gồm cả thuộc tính kế thừa từ prototype. Nên dùng `Object.hasOwn(obj, key)` hoặc ưu tiên `Object.keys()` / `Object.entries()`.\n\n4. `break`, `continue` & Labeled Loops: `break` ngắt vòng lặp gần nhất; `continue` bỏ qua lần lặp hiện tại. Gắn nhãn (`outerLoop: for (...)`) cho phép ngắt trực tiếp vòng lặp ngoài cùng trong các thuật toán ma trận nhiều chiều."
    },
    syntax: `// 1. Modern for...of over arrays and strings
const tokens = ["AUTH", "BEARER", "TOKEN_XYZ"];
for (const token of tokens) {
  if (token === "BEARER") continue;
  console.log("Processing:", token);
}

// 2. Destructuring entries in for...of
const userScores = new Map([["Alice", 95], ["Bob", 82]]);
for (const [name, score] of userScores) {
  console.log(\`\${name}: \${score}\`);
}

// 3. Labeled loop for matrix pathfinding
outerGrid: for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 5; c++) {
    if (r === 2 && c === 3) {
      console.log("Target found at (2,3)!");
      break outerGrid; // Exits both loops directly!
    }
  }
}`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Batch Transaction Processor with Early Break",
          vi: "Bộ Xử Lý Giao Dịch Hàng Loạt Với Cơ Chế Ngắt Sớm"
        },
        description: {
          en: "Demonstrates processing transactional arrays with loop controls and balance validation.",
          vi: "Minh họa xử lý mảng giao dịch tài chính với kiểm soát vòng lặp và kiểm tra số dư."
        },
        code: `function processLedger(transactions, initialBalance) {
  let balance = initialBalance;
  const processed = [];

  for (const tx of transactions) {
    if (tx.type === "CREDIT") {
      balance += tx.amount;
      processed.push({ ...tx, status: "completed", newBalance: balance });
    } else if (tx.type === "DEBIT") {
      if (balance < tx.amount) {
        console.warn(\`Transaction \${tx.id} declined: Insufficient funds\`);
        processed.push({ ...tx, status: "declined", currentBalance: balance });
        break; // Stop processing further debit transactions
      }
      balance -= tx.amount;
      processed.push({ ...tx, status: "completed", newBalance: balance });
    }
  }

  return { finalBalance: balance, history: processed };
}

const ledger = [
  { id: "TX-1", type: "CREDIT", amount: 100 },
  { id: "TX-2", type: "DEBIT", amount: 40 },
  { id: "TX-3", type: "DEBIT", amount: 150 }
];
console.log(processLedger(ledger, 50));`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using `for...in` to iterate over elements of an Array.",
          vi: "Dùng `for...in` để duyệt các phần tử trong một Mảng."
        },
        correction: {
          en: "Use `for...of` or standard `for (let i = 0; ...)` instead.",
          vi: "Sử dụng `for...of` hoặc vòng lặp `for` thông thường."
        },
        explanation: {
          en: "`for...in` iterates over string indices, does not guarantee numeric order, and includes arbitrary custom properties or prototype extensions added to the array.",
          vi: "`for...in` duyệt qua các chỉ số dưới dạng chuỗi, không đảm bảo đúng thứ tự số học và sẽ duyệt qua cả các thuộc tính tùy chỉnh được thêm vào prototype của mảng."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Prefer for...of for readable iterable traversal",
          vi: "Ưu tiên dùng for...of để duyệt cấu trúc iterable một cách trực quan"
        },
        description: {
          en: "`for...of` avoids index bookkeeping, works seamlessly with Sets, Maps, and Arrays, and fully supports break, continue, and async/await.",
          vi: "`for...of` giúp tránh việc phải quản lý biến đếm chỉ số, hoạt động tốt với Set, Map, Array và hỗ trợ đầy đủ break, continue cũng như async/await."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_7_1",
      title: {
        en: "Matrix Search with Labeled Loop",
        vi: "Tìm Kiếm Phần Tử Trong Ma Trận 2D Bằng Vòng Lặp Có Nhãn"
      },
      instruction: {
        en: "Write a function `findMatrixCoordinates(matrix, target)` that iterates through a 2D array and returns `{ row, col }` of the first match, terminating both loops immediately with a labeled break. Return `null` if not found.",
        vi: "Viết hàm `findMatrixCoordinates(matrix, target)` duyệt qua mảng 2 chiều và trả về `{ row, col }` của phần tử đầu tiên khớp với target, thoát ngay cả 2 vòng lặp bằng labeled break. Trả về `null` nếu không tìm thấy."
      },
      starterCode: `function findMatrixCoordinates(matrix, target) {
  // Use labeled loops
}

const grid = [
  [10, 20, 30],
  [40, 50, 60],
  [70, 80, 90]
];
console.log(findMatrixCoordinates(grid, 50)); // { row: 1, col: 1 }`,
      solutionCode: `function findMatrixCoordinates(matrix, target) {
  let result = null;

  matrixSearch: for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === target) {
        result = { row: r, col: c };
        break matrixSearch;
      }
    }
  }

  return result;
}`,
      hints: [
        {
          en: "Declare `matrixSearch: for(...)` and use `break matrixSearch;` when matrix[r][c] === target.",
          vi: "Khai báo nhãn `matrixSearch: for(...)` và gọi `break matrixSearch;` khi matrix[r][c] === target."
        }
      ]
    },
    {
      id: "js_ex_7_2",
      title: {
        en: "Object Property Frequency Counter",
        vi: "Đếm Tần Suất Thuộc Tính Bằng for...in và Object.hasOwn",
        },
      instruction: {
        en: "Write a function `countPrimitiveValues(obj)` that uses `for...in` and `Object.hasOwn` to iterate over all own properties of an object and returns an object counting how many times each type ('string', 'number', 'boolean') appears as a value.",
        vi: "Viết hàm `countPrimitiveValues(obj)` dùng `for...in` và `Object.hasOwn` để duyệt các thuộc tính riêng của object và trả về đối tượng đếm số lần xuất hiện của các kiểu giá trị ('string', 'number', 'boolean')."
      },
      starterCode: `function countPrimitiveValues(obj) {
  // Count value types
}

console.log(countPrimitiveValues({ a: 1, b: "hello", c: 2, d: true, e: "world" }));
// { number: 2, string: 2, boolean: 1 }`,
      solutionCode: `function countPrimitiveValues(obj) {
  const counts = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const type = typeof obj[key];
      counts[type] = (counts[type] || 0) + 1;
    }
  }
  return counts;
}`,
      hints: [
        {
          en: "Check Object.hasOwn(obj, key), get typeof obj[key], and increment counts[type].",
          vi: "Kiểm tra Object.hasOwn(obj, key), lấy typeof obj[key] và tăng biến đếm counts[type]."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_7",
    title: {
      en: "Chunked Stream Pipeline Aggregator",
      vi: "Bộ Gom Nhóm & Xử Lý Dòng Dữ Liệu Theo Phân Đoạn (Chunks)"
    },
    description: {
      en: "Create a function `processChunkedData(items, chunkSize, transformFn)` that iterates through an array using a `while` loop, divides it into chunks of size `chunkSize`, applies `transformFn` to each item in the chunk, filters out any null/undefined results, and returns the flattened transformed list.",
      vi: "Xây dựng hàm `processChunkedData(items, chunkSize, transformFn)` duyệt mảng bằng vòng lặp `while`, chia mảng thành các phân đoạn có độ dài `chunkSize`, áp dụng `transformFn` cho từng phần tử trong phân đoạn, lọc bỏ các kết quả null/undefined và trả về mảng kết quả cuối cùng."
    },
    starterCode: `function processChunkedData(items, chunkSize, transformFn) {
  // Implement chunked processor with while loop
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const squares = processChunkedData(numbers, 3, n => n % 2 === 0 ? n * n : null);
console.log(squares); // [4, 16, 36, 64]`,
    solutionCode: `function processChunkedData(items, chunkSize, transformFn) {
  if (!Array.isArray(items) || chunkSize <= 0) return [];
  const results = [];
  let index = 0;

  while (index < items.length) {
    const chunk = items.slice(index, index + chunkSize);
    for (const item of chunk) {
      const transformed = transformFn(item);
      if (transformed !== null && transformed !== undefined) {
        results.push(transformed);
      }
    }
    index += chunkSize;
  }

  return results;
}`,
    hints: [
      {
        en: "Maintain an index counter in the while loop, slice chunks, iterate through each chunk with for...of, and collect non-null transformed values.",
        vi: "Duy trì biến index trong vòng lặp while, cắt mảng con bằng slice, duyệt qua từng chunk với for...of và gom các giá trị khác null vào kết quả."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_7_1",
      type: "single_choice",
      question: {
        en: "Which loop construct is specifically designed to iterate over values of Iterable objects (Arrays, Strings, Maps, Sets)?",
        vi: "Cấu trúc vòng lặp nào được thiết kế chuyên biệt để duyệt qua các giá trị của đối tượng Iterable (Array, String, Map, Set)?"
      },
      options: [
        { id: "a", text: { en: "for...of", vi: "for...of" } },
        { id: "b", text: { en: "for...in", vi: "for...in" } },
        { id: "c", text: { en: "while...do", vi: "while...do" } },
        { id: "d", text: { en: "switch...case", vi: "switch...case" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`for...of` invokes the object's `[Symbol.iterator]` and steps through values directly.",
        vi: "`for...of` gọi phương thức `[Symbol.iterator]` của đối tượng và duyệt qua từng giá trị một cách trực quan."
      }
    },
    {
      id: "js_q_7_2",
      type: "single_choice",
      question: {
        en: "What is the primary difference between `for...in` and `for...of` in JavaScript?",
        vi: "Điểm khác biệt cốt lõi giữa `for...in` và `for...of` trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "`for...in` iterates over enumerable property KEYS; `for...of` iterates over iterable collection VALUES", vi: "`for...in` duyệt qua các TÊN THUỘC TÍNH (keys); `for...of` duyệt qua các GIÁ TRỊ (values) của tập hợp" } },
        { id: "b", text: { en: "`for...in` is asynchronous; `for...of` is synchronous", vi: "`for...in` là bất đồng bộ; `for...of` là đồng bộ" } },
        { id: "c", text: { en: "`for...of` cannot be used with Arrays", vi: "`for...of` không thể dùng được với Mảng" } },
        { id: "d", text: { en: "`for...in` only works in Node.js", vi: "`for...in` chỉ chạy được trong Node.js" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`for...in` loops over property names (keys) of an object. `for...of` loops over values provided by an iterable.",
        vi: "`for...in` lặp qua tên các thuộc tính (keys) của đối tượng. `for...of` lặp qua các phần tử dữ liệu (values) của iterable."
      }
    },
    {
      id: "js_q_7_3",
      type: "predict_output",
      question: {
        en: "What will the following code output?\n```js\nlet count = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) continue;\n  count += i;\n}\nconsole.log(count);\n```",
        vi: "Đoạn mã sau sẽ in ra kết quả gì?\n```js\nlet count = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) continue;\n  count += i;\n}\nconsole.log(count);\n```"
      },
      options: [
        { id: "a", text: { en: "8", vi: "8" } },
        { id: "b", text: { en: "10", vi: "10" } },
        { id: "c", text: { en: "3", vi: "3" } },
        { id: "d", text: { en: "0", vi: "0" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The loop sums `0 + 1 + 3 + 4` because `i === 2` is skipped with `continue`. Sum = 8.",
        vi: "Vòng lặp tính tổng `0 + 1 + 3 + 4` vì khi `i === 2` bị bỏ qua bởi `continue`. Tổng là 8."
      }
    },
    {
      id: "js_q_7_4",
      type: "predict_output",
      question: {
        en: "How many times does the loop body execute in a `do...while (false)` loop?",
        vi: "Thân vòng lặp trong `do...while (false)` được thực thi bao nhiêu lần?"
      },
      options: [
        { id: "a", text: { en: "Exactly 1 time", vi: "Đúng 1 lần" } },
        { id: "b", text: { en: "0 times", vi: "0 lần" } },
        { id: "c", text: { en: "Infinite times", vi: "Vô hạn lần" } },
        { id: "d", text: { en: "Throws SyntaxError", vi: "Báo lỗi SyntaxError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`do...while` evaluates the condition after executing the body once, guaranteeing at least one execution.",
        vi: "`do...while` kiểm tra điều kiện sau khi đã chạy thân vòng lặp, đảm bảo khối lệnh được chạy tối thiểu 1 lần."
      }
    },
    {
      id: "js_q_7_5",
      type: "single_choice",
      question: {
        en: "What is a 'Labeled Statement' in JavaScript (e.g. `mainLoop: for (...)`)?",
        vi: "'Labeled Statement' trong JavaScript (ví dụ `mainLoop: for (...)`) là gì?"
      },
      options: [
        { id: "a", text: { en: "An identifier prefix that allows `break` or `continue` to target a specific outer loop from within nested loops", vi: "Một nhãn định danh cho phép `break` hoặc `continue` tác động trực tiếp tới vòng lặp ngoài cụ thể từ trong các vòng lặp lồng nhau" } },
        { id: "b", text: { en: "A CSS tag selector inside JS", vi: "Một bộ chọn tag CSS bên trong JS" } },
        { id: "c", text: { en: "A TypeScript type annotation", vi: "Một chú thích kiểu dữ liệu TypeScript" } },
        { id: "d", text: { en: "A debugging marker for DevTools", vi: "Một đánh dấu gỡ lỗi trong DevTools" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Labels provide statement references that enable jumping out of multi-level nested loops directly with `break labelName;`.",
        vi: "Nhãn giúp tham chiếu khối lệnh, cho phép thoát trực tiếp ra khỏi nhiều tầng vòng lặp lồng nhau bằng `break labelName;`."
      }
    },
    {
      id: "js_q_7_6",
      type: "predict_output",
      question: {
        en: "What will `console.log` print?\n```js\nconst obj = { x: 10, y: 20 };\nlet keys = '';\nfor (const k in obj) keys += k;\nconsole.log(keys);\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nconst obj = { x: 10, y: 20 };\nlet keys = '';\nfor (const k in obj) keys += k;\nconsole.log(keys);\n```"
      },
      options: [
        { id: "a", text: { en: "'xy'", vi: "'xy'" } },
        { id: "b", text: { en: "'30'", vi: "'30'" } },
        { id: "c", text: { en: "'1020'", vi: "'1020'" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`for...in` iterates over the property keys `'x'` and `'y'`, concatenating to `'xy'`.",
        vi: "`for...in` duyệt qua tên các thuộc tính `'x'` và `'y'`, ghép chuỗi thành `'xy'`."
      }
    },
    {
      id: "js_q_7_7",
      type: "single_choice",
      question: {
        en: "Why is `Array.prototype.forEach()` unable to stop early with the `break` keyword?",
        vi: "Tại sao không thể dùng từ khóa `break` để dừng sớm phương thức `Array.prototype.forEach()`?"
      },
      options: [
        { id: "a", text: { en: "`forEach` executes a callback function for every element; `break` is only syntactically valid inside loop statements", vi: "`forEach` thực thi một hàm callback cho mỗi phần tử; `break` chỉ hợp lệ về mặt cú pháp bên trong các câu lệnh vòng lặp" } },
        { id: "b", text: { en: "`forEach` is asynchronous", vi: "`forEach` là bất đồng bộ" } },
        { id: "c", text: { en: "`forEach` is deprecated in ES6", vi: "`forEach` đã bị khai tử trong ES6" } },
        { id: "d", text: { en: "`break` causes memory leaks in arrays", vi: "`break` gây rò rỉ bộ nhớ trong mảng" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`break` cannot cross function boundaries. To exit early from an array traversal, use `for...of`, `some()`, or `every()`.",
        vi: "`break` không thể nhảy qua ranh giới hàm callback. Để dừng sớm duyệt mảng, hãy dùng `for...of`, `some()`, hoặc `every()`."
      }
    },
    {
      id: "js_q_7_8",
      type: "fill_blank",
      question: {
        en: "To terminate the current iteration immediately and proceed to the next iteration step of a loop, use the _____ keyword.",
        vi: "Để kết thúc ngay lần lặp hiện tại và chuyển sang bước lặp tiếp theo của vòng lặp, sử dụng từ khóa _____."
      },
      correctAnswer: "continue",
      explanation: {
        en: "The `continue` statement skips remaining statements in the current iteration and advances the loop.",
        vi: "Câu lệnh `continue` bỏ qua các câu lệnh còn lại trong vòng lặp hiện tại và nhảy tới bước lặp kế tiếp."
      }
    },
    {
      id: "js_q_7_9",
      type: "single_choice",
      question: {
        en: "Which method is the modern standard replacement for `hasOwnProperty` when checking if an object directly owns a property?",
        vi: "Phương thức chuẩn hiện đại nào thay thế cho `hasOwnProperty` khi kiểm tra đối tượng có sở hữu trực tiếp thuộc tính không?"
      },
      options: [
        { id: "a", text: { en: "Object.hasOwn(obj, prop)", vi: "Object.hasOwn(obj, prop)" } },
        { id: "b", text: { en: "Object.contains(obj, prop)", vi: "Object.contains(obj, prop)" } },
        { id: "c", text: { en: "Reflect.owns(obj, prop)", vi: "Reflect.owns(obj, prop)" } },
        { id: "d", text: { en: "obj.hasProperty(prop)", vi: "obj.hasProperty(prop)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Object.hasOwn()` was introduced in ES2022 as a safe static method that works even on `Object.create(null)` objects.",
        vi: "`Object.hasOwn()` được giới thiệu trong ES2022, an toàn hơn và hoạt động tốt ngay cả với các object tạo từ `Object.create(null)`."
      }
    },
    {
      id: "js_q_7_10",
      type: "code_reasoning",
      question: {
        en: "What causes an infinite loop in a `while (i < 10)` statement?",
        vi: "Nguyên nhân nào dẫn đến vòng lặp vô tận trong câu lệnh `while (i < 10)`?"
      },
      options: [
        { id: "a", text: { en: "Failing to increment or modify the variable `i` inside the loop body", vi: "Quên không tăng hoặc thay đổi giá trị của biến `i` bên trong thân vòng lặp" } },
        { id: "b", text: { en: "Declaring `i` with `let`", vi: "Khai báo `i` bằng `let`" } },
        { id: "c", text: { en: "Using strict mode", vi: "Chạy trong strict mode" } },
        { id: "d", text: { en: "Placing console.log inside the loop", vi: "Đặt console.log bên trong vòng lặp" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "If the termination condition never becomes false (because the loop counter is never updated), the loop runs indefinitely and hangs the thread.",
        vi: "Nếu điều kiện dừng không bao giờ chuyển thành false (do biến đếm không được cập nhật), vòng lặp sẽ chạy vô hạn và làm treo luồng JS."
      }
    }
  ]
};

// --- LESSON 08 ---
const lesson08: Lesson = {
  id: "js_lesson_8",
  courseId: "javascript",
  levelId: "basic",
  moduleId: "js_mod_2",
  order: 8,
  title: {
    en: "Functions: Declarations, Arrow Functions, Parameters & First-Class Functions",
    vi: "Hàm: Khai Báo, Arrow Functions, Tham Số & First-Class Functions"
  },
  summary: {
    en: "Master function declarations vs expressions, arrow functions and lexical this, default parameters, rest parameters, and higher-order function patterns.",
    vi: "Làm chủ khai báo hàm vs biểu thức hàm, arrow function và lexical this, tham số mặc định, rest parameters và hàm bậc cao (higher-order functions)."
  },
  estimatedMinutes: 20,
  topicId: "js_functions_fundamentals",
  learn: {
    introduction: {
      en: "Functions are the primary building blocks of JavaScript applications. In JavaScript, functions are 'First-Class Citizens', meaning they can be assigned to variables, passed as arguments to other functions, and returned from functions. ES6 introduced Arrow Functions (`() => {}`), default parameters, and rest parameters, giving JavaScript a modern, concise, and expressive functional syntax.",
      vi: "Hàm là khối xây dựng nền tảng của mọi ứng dụng JavaScript. Trong JavaScript, hàm là 'Công dân hạng nhất' (First-Class Citizens), có nghĩa là hàm có thể gán vào biến, truyền làm tham số cho hàm khác và được trả về từ một hàm. ES6 bổ sung Arrow Functions (`() => {}`), tham số mặc định và rest parameters, mang lại cú pháp lập trình hàm hiện đại và gọn gàng."
    },
    conceptExplanation: {
      en: "1. Function Declarations vs Expressions: Function declarations (`function name() {}`) are hoisted completely, allowing them to be called before their definition line. Function expressions (`const fn = function() {}`) and arrow functions are NOT hoisted before their assignment.\n\n2. Arrow Functions (`() => {}`): Provide concise syntax with implicit returns for single expressions. Crucially, arrow functions do NOT have their own `this`, `arguments`, or `super` bindings; they inherit `this` lexically from their enclosing scope.\n\n3. Default & Rest Parameters: Default parameters (`function(a, b = 10)`) replace legacy `||` checks. Rest parameters (`function(first, ...rest)`) gather arbitrary trailing arguments into a real JavaScript Array.\n\n4. Higher-Order Functions: Functions that accept other functions as arguments (callbacks) or return new functions (factories/currying).",
      vi: "1. Khai Báo Hàm (Declaration) vs Biểu Thức Hàm (Expression): Khai báo hàm (`function name() {}`) được hoist toàn bộ, có thể gọi trước dòng định nghĩa. Biểu thức hàm và Arrow Function không thể gọi trước khi gán biến.\n\n2. Arrow Functions (`() => {}`): Cung cấp cú pháp ngắn gọn với return ngầm định cho biểu thức đơn. Đặc biệt, Arrow Function KHÔNG có ngữ cảnh `this`, `arguments` riêng mà kế thừa `this` theo ngữ cảnh tĩnh (lexical this) từ scope bao quanh.\n\n3. Tham Số Mặc Định & Rest Parameters: Tham số mặc định (`function(a, b = 10)`) thay thế cách gán `||` cũ. Rest parameters (`function(first, ...rest)`) gom tất cả đối số còn lại thành một Mảng Array thực sự.\n\n4. Hàm Bậc Cao (Higher-Order Functions): Là các hàm nhận hàm khác làm đối số (callbacks) hoặc trả về một hàm mới (function factories)."
    },
    syntax: `// 1. Arrow function with implicit return and lexical this
const multiply = (a, b) => a * b;

// 2. Default parameters and rest parameters
function formatInvoice(client, taxRate = 0.1, ...items) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal * (1 + taxRate);
  return { client, subtotal, total, itemCount: items.length };
}

// 3. Higher-order function (Function Factory)
function createMultiplier(factor) {
  return (num) => num * factor;
}
const double = createMultiplier(2);
console.log(double(15)); // 30`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Lexical this in Event Callbacks and Timers",
          vi: "Ngữ Cảnh Lexical this Trong Timer và Callback"
        },
        description: {
          en: "Demonstrates why arrow functions solve the classic `this` loss problem in asynchronous methods.",
          vi: "Minh họa cách arrow function giải quyết triệt để lỗi mất ngữ cảnh this trong các phương thức bất đồng bộ."
        },
        code: `class Stopwatch {
  constructor() {
    this.seconds = 0;
    this.timerId = null;
  }

  start() {
    // Arrow function preserves 'this' of Stopwatch instance lexically!
    this.timerId = setInterval(() => {
      this.seconds++;
      console.log(\`Elapsed: \${this.seconds}s\`);
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using an arrow function as an object method that requires dynamic `this`.",
          vi: "Dùng arrow function làm phương thức trong object khi cần truy cập `this` của object đó."
        },
        correction: {
          en: "Use standard method shorthand syntax `methodName() {}` instead.",
          vi: "Sử dụng cú pháp phương thức chuẩn `methodName() {}`."
        },
        explanation: {
          en: "Arrow functions capture `this` from outer lexical scope (usually `window` or `global`), so `this.prop` inside an arrow method evaluates to `undefined`.",
          vi: "Arrow function kế thừa `this` từ scope ngoài (thường là window/global), nên `this.prop` bên trong arrow method sẽ trả về `undefined`."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use Rest Parameters (...args) instead of legacy 'arguments' object",
          vi: "Dùng Rest Parameters (...args) thay cho đối tượng 'arguments' kiểu cũ"
        },
        description: {
          en: "`...args` produces a real JavaScript Array with full access to `.map()`, `.filter()`, and `.reduce()`, whereas `arguments` is an array-like object lacking array methods.",
          vi: "`...args` trả về một mảng Array chuẩn có đầy đủ các phương thức `.map()`, `.filter()`, `.reduce()`, trong khi `arguments` chỉ là object dạng mảng thiếu các phương thức xử lý."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_8_1",
      title: {
        en: "Build a Pipe Function Combinator",
        vi: "Xây Dựng Hàm Nối Đường Ống Pipe Function"
      },
      instruction: {
        en: "Implement a higher-order function `pipe(...fns)` that takes any number of single-argument functions and returns a new function that passes an initial value sequentially through each function from left to right.",
        vi: "Cài đặt hàm bậc cao `pipe(...fns)` nhận số lượng hàm tùy ý và trả về một hàm mới truyền giá trị ban đầu tuần tự qua từng hàm từ trái sang phải."
      },
      starterCode: `function pipe(...fns) {
  // Return piped function
}

const add5 = x => x + 5;
const double = x => x * 2;
const square = x => x * x;

const compute = pipe(add5, double, square);
console.log(compute(2)); // (2 + 5) * 2 = 14; 14^2 = 196`,
      solutionCode: `function pipe(...fns) {
  return function(initialValue) {
    return fns.reduce((acc, fn) => fn(acc), initialValue);
  };
}`,
      hints: [
        {
          en: "Return a function taking initialValue and use fns.reduce((acc, fn) => fn(acc), initialValue).",
          vi: "Trả về một hàm nhận initialValue và dùng fns.reduce((acc, fn) => fn(acc), initialValue)."
        }
      ]
    },
    {
      id: "js_ex_8_2",
      title: {
        en: "Function Call Memoizer",
        vi: "Bộ Nhớ Đệm Kết Quả Hàm (Memoizer)"
      },
      instruction: {
        en: "Write a function `memoize(fn)` that wraps a single-argument function with a cache Map, returning cached results for previously seen arguments and computing/caching new ones.",
        vi: "Viết hàm `memoize(fn)` bọc một hàm nhận một đối số bằng bộ nhớ đệm Map, trả về kết quả đã lưu trong cache nếu đối số từng được gọi và chỉ tính toán/lưu cache khi gặp đối số mới."
      },
      starterCode: `function memoize(fn) {
  // Implement memoizer
}

const slowSquare = n => { console.log('Computing...'); return n * n; };
const fastSquare = memoize(slowSquare);
console.log(fastSquare(5)); // logs Computing..., 25
console.log(fastSquare(5)); // returns 25 immediately without logging`,
      solutionCode: `function memoize(fn) {
  const cache = new Map();
  return function(arg) {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}`,
      hints: [
        {
          en: "Store computed outputs in a Map instance within the closure keyed by arg.",
          vi: "Lưu trữ kết quả đã tính vào một Map bên trong closure với key là arg."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_8",
    title: {
      en: "Event Emitter & Middleware Dispatcher",
      vi: "Bộ Phát Sự Kiện & Điều Phối Middleware Đa Tầng"
    },
    description: {
      en: "Create a function `createDispatcher()` that returns an object with methods: `use(middlewareFn)` (registers a middleware function `(context, next) => void`), and `dispatch(context)` (runs registered middlewares in sequential pipeline order, calling each `next()` to advance).",
      vi: "Xây dựng hàm `createDispatcher()` trả về đối tượng có các phương thức: `use(middlewareFn)` (đăng ký middleware `(context, next) => void`), và `dispatch(context)` (thực thi các middleware theo thứ tự đường ống, gọi `next()` để chuyển sang middleware kế tiếp)."
    },
    starterCode: `function createDispatcher() {
  // Implement middleware dispatcher
}

const app = createDispatcher();
app.use((ctx, next) => { ctx.auth = true; next(); });
app.use((ctx, next) => { ctx.timestamp = Date.now(); next(); });

const context = {};
app.dispatch(context);
console.log(context.auth, context.timestamp);`,
    solutionCode: `function createDispatcher() {
  const middlewares = [];

  return {
    use(fn) {
      if (typeof fn === 'function') {
        middlewares.push(fn);
      }
      return this;
    },
    dispatch(context) {
      let index = 0;

      function next() {
        if (index < middlewares.length) {
          const currentMiddleware = middlewares[index++];
          currentMiddleware(context, next);
        }
      }

      next();
      return context;
    }
  };
}`,
    hints: [
      {
        en: "Maintain an array of middleware functions and write a recursive next() function that steps through the index.",
        vi: "Duy trì mảng các hàm middleware và viết hàm đệ quy next() để duyệt qua từng chỉ số."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_8_1",
      type: "single_choice",
      question: {
        en: "How does the `this` keyword behave inside an Arrow Function compared to a standard function declaration?",
        vi: "Từ khóa `this` bên trong Arrow Function hoạt động như thế nào so với khai báo hàm thông thường?"
      },
      options: [
        { id: "a", text: { en: "Arrow functions do not bind their own `this`; they inherit `this` lexically from the surrounding enclosing scope", vi: "Arrow function không tự gán `this` riêng; nó kế thừa `this` theo ngữ cảnh tĩnh (lexical this) từ scope bao quanh" } },
        { id: "b", text: { en: "Arrow functions always set `this` to undefined", vi: "Arrow function luôn đặt `this` là undefined" } },
        { id: "c", text: { en: "Arrow functions bind `this` dynamically at call time", vi: "Arrow function gán `this` động tại thời điểm gọi hàm" } },
        { id: "d", text: { en: "Arrow functions can be used as constructors with `new`", vi: "Arrow function có thể dùng làm constructor với từ khóa `new`" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Arrow functions have lexical `this` resolution, preventing the common bug where `this` changes when passed as a callback.",
        vi: "Arrow function giải quyết `this` theo lexical scope, giúp tránh lỗi phổ biến bị mất ngữ cảnh `this` khi truyền callback."
      }
    },
    {
      id: "js_q_8_2",
      type: "predict_output",
      question: {
        en: "What happens when you call a standard function declaration before its line of code?\n```js\ngreet();\nfunction greet() { console.log('Hello'); }\n```",
        vi: "Điều gì xảy ra khi bạn gọi hàm khai báo chuẩn trước dòng định nghĩa của nó?\n```js\ngreet();\nfunction greet() { console.log('Hello'); }\n```"
      },
      options: [
        { id: "a", text: { en: "Prints 'Hello' (Function declarations are fully hoisted)", vi: "In ra 'Hello' (Khai báo hàm được hoist toàn bộ)" } },
        { id: "b", text: { en: "Throws ReferenceError", vi: "Ném lỗi ReferenceError" } },
        { id: "c", text: { en: "Throws TypeError: greet is not a function", vi: "Ném lỗi TypeError: greet is not a function" } },
        { id: "d", text: { en: "Prints undefined", vi: "In ra undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Function declarations are hoisted with their complete function body during the compilation phase.",
        vi: "Khai báo hàm (Function declaration) được hoist toàn bộ cả tên lẫn thân hàm trong giai đoạn biên dịch."
      }
    },
    {
      id: "js_q_8_3",
      type: "predict_output",
      question: {
        en: "What happens when calling an arrow function assigned to a `const` before its definition?\n```js\ngreet();\nconst greet = () => { console.log('Hello'); };\n```",
        vi: "Điều gì xảy ra khi gọi arrow function gán vào `const` trước dòng định nghĩa?\n```js\ngreet();\nconst greet = () => { console.log('Hello'); };\n```"
      },
      options: [
        { id: "a", text: { en: "Throws ReferenceError: Cannot access 'greet' before initialization (TDZ)", vi: "Ném lỗi ReferenceError: Cannot access 'greet' before initialization (TDZ)" } },
        { id: "b", text: { en: "Prints 'Hello'", vi: "In ra 'Hello'" } },
        { id: "c", text: { en: "Prints undefined", vi: "In ra undefined" } },
        { id: "d", text: { en: "Executes silently with no output", vi: "Thực thi trong im lặng không có output" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Because `greet` is declared with `const`, it resides in the Temporal Dead Zone prior to evaluation.",
        vi: "Vì `greet` được khai báo bằng `const`, nó nằm trong Temporal Dead Zone cho tới khi dòng gán được chạy."
      }
    },
    {
      id: "js_q_8_4",
      type: "single_choice",
      question: {
        en: "What does it mean that JavaScript functions are 'First-Class Citizens'?",
        vi: "Ý nghĩa của việc hàm trong JavaScript là 'Công dân hạng nhất' (First-Class Citizens) là gì?"
      },
      options: [
        { id: "a", text: { en: "Functions can be assigned to variables, stored in data structures, passed as arguments, and returned from other functions", vi: "Hàm có thể gán vào biến, lưu trong cấu trúc dữ liệu, truyền làm tham số và được trả về từ hàm khác" } },
        { id: "b", text: { en: "Functions execute on dedicated CPU cores", vi: "Hàm chạy trên các nhân CPU chuyên dụng" } },
        { id: "c", text: { en: "Functions are compiled to C++", vi: "Hàm được biên dịch sang C++" } },
        { id: "d", text: { en: "Functions are guaranteed never to throw errors", vi: "Hàm được đảm bảo không bao giờ ném lỗi" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "First-class status means functions are treated as regular values and can be manipulated like any other object.",
        vi: "Tính chất first-class nghĩa là hàm được đối xử như các giá trị thông thường, có thể thao tác linh hoạt như bất kỳ đối tượng nào."
      }
    },
    {
      id: "js_q_8_5",
      type: "predict_output",
      question: {
        en: "What will `console.log` output?\n```js\nfunction calculate(a, b = 20) {\n  return a + b;\n}\nconsole.log(calculate(10, undefined));\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nfunction calculate(a, b = 20) {\n  return a + b;\n}\nconsole.log(calculate(10, undefined));\n```"
      },
      options: [
        { id: "a", text: { en: "30", vi: "30" } },
        { id: "b", text: { en: "NaN", vi: "NaN" } },
        { id: "c", text: { en: "10", vi: "10" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Passing `undefined` triggers the default parameter value `20`, so `10 + 20 = 30`.",
        vi: "Truyền `undefined` sẽ kích hoạt giá trị tham số mặc định `20`, do đó phép tính là `10 + 20 = 30`."
      }
    },
    {
      id: "js_q_8_6",
      type: "predict_output",
      question: {
        en: "What will `console.log` output?\n```js\nfunction calculate(a, b = 20) {\n  return a + b;\n}\nconsole.log(calculate(10, null));\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nfunction calculate(a, b = 20) {\n  return a + b;\n}\nconsole.log(calculate(10, null));\n```"
      },
      options: [
        { id: "a", text: { en: "10", vi: "10" } },
        { id: "b", text: { en: "30", vi: "30" } },
        { id: "c", text: { en: "NaN", vi: "NaN" } },
        { id: "d", text: { en: "null", vi: "null" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`null` is a valid passed value and does NOT trigger default parameters. `10 + null` coerces `null` to `0`, resulting in `10`.",
        vi: "`null` là một giá trị hợp lệ được truyền vào nên KHÔNG kích hoạt tham số mặc định. `10 + null` ép null thành 0 nên kết quả là `10`."
      }
    },
    {
      id: "js_q_8_7",
      type: "single_choice",
      question: {
        en: "Can an Arrow Function be instantiated with the `new` keyword?",
        vi: "Arrow Function có thể được khởi tạo bằng từ khóa `new` không?"
      },
      options: [
        { id: "a", text: { en: "No, it throws a TypeError: ... is not a constructor", vi: "Không, nó sẽ ném lỗi TypeError: ... is not a constructor" } },
        { id: "b", text: { en: "Yes, exactly like standard functions", vi: "Có, hoàn toàn giống hàm thông thường" } },
        { id: "c", text: { en: "Only if declared with const", vi: "Chỉ khi khai báo bằng const" } },
        { id: "d", text: { en: "Only in Node.js", vi: "Chỉ chạy được trong Node.js" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Arrow functions lack an internal `[[Construct]]` method and prototype property, so they cannot serve as constructors.",
        vi: "Arrow function không có phương thức nội bộ `[[Construct]]` và không có thuộc tính prototype nên không thể làm hàm tạo."
      }
    },
    {
      id: "js_q_8_8",
      type: "fill_blank",
      question: {
        en: "In ES6 function signatures, gathering trailing arguments into an array using `...args` is known as _____ parameters.",
        vi: "Trong cú pháp hàm ES6, việc gom các đối số còn lại thành một mảng bằng `...args` được gọi là _____ parameters."
      },
      correctAnswer: "rest",
      explanation: {
        en: "The `...` parameter syntax in function definitions is called Rest Parameters.",
        vi: "Cú pháp `...` trong định nghĩa hàm được gọi là Rest Parameters."
      }
    },
    {
      id: "js_q_8_9",
      type: "single_choice",
      question: {
        en: "What is a Higher-Order Function in JavaScript?",
        vi: "Hàm Bậc Cao (Higher-Order Function) trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "A function that takes one or more functions as arguments, or returns a function as its result", vi: "Một hàm nhận một hoặc nhiều hàm làm đối số, hoặc trả về một hàm làm kết quả" } },
        { id: "b", text: { en: "A function with over 10 parameters", vi: "Một hàm có hơn 10 tham số" } },
        { id: "c", text: { en: "A function executed at root administrative privileges", vi: "Một hàm chạy dưới quyền quản trị hệ thống" } },
        { id: "d", text: { en: "An asynchronous generator function", vi: "Một hàm generator bất đồng bộ" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Higher-order functions (like `map`, `filter`, `reduce`, or decorators) treat functions as inputs or outputs.",
        vi: "Hàm bậc cao (như `map`, `filter`, `reduce` hay decorator) xem hàm như dữ liệu đầu vào hoặc kết quả đầu ra."
      }
    },
    {
      id: "js_q_8_10",
      type: "code_reasoning",
      question: {
        en: "Why does the concise arrow function `const getObj = () => ({ status: 'ok' });` require parentheses around the object literal?",
        vi: "Tại sao hàm mũi tên `const getObj = () => ({ status: 'ok' });` lại cần cặp dấu ngoặc đơn bọc ngoài object literal?"
      },
      options: [
        { id: "a", text: { en: "Without parentheses, the JS parser interprets `{ ... }` as a function block rather than an object literal expression", vi: "Nếu không có ngoặc đơn, trình phân tích cú pháp JS sẽ hiểu nhầm `{ ... }` là khối thân hàm thay vì đối tượng trả về" } },
        { id: "b", text: { en: "Parentheses are mandatory for all arrow functions", vi: "Ngoặc đơn là bắt buộc cho mọi arrow function" } },
        { id: "c", text: { en: "To prevent memory leaks", vi: "Để ngăn ngừa rò rỉ bộ nhớ" } },
        { id: "d", text: { en: "It is a TypeScript type requirement", vi: "Đó là yêu cầu kiểu của TypeScript" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Wrapping in `({ ... })` disambiguates the curly braces as an expression to return rather than the beginning of a function body block.",
        vi: "Bọc `({ ... })` giúp phân định rõ ràng dấu ngoặc nhọn là một biểu thức object cần trả về chứ không phải khối lệnh của thân hàm."
      }
    }
  ]
};

// Write Lesson 07 and 08
fs.writeFileSync(path.join(dir, 'lesson07.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson07: Lesson = ${JSON.stringify(lesson07, null, 2)};\nexport default lesson07;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson08.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson08: Lesson = ${JSON.stringify(lesson08, null, 2)};\nexport default lesson08;\n`, 'utf8');
console.log('Lessons 07 and 08 generated.');
