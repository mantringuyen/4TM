import { Lesson } from '../../../../types';

export const lesson07: Lesson = {
  "id": "js_lesson_7",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_2",
  "order": 7,
  "title": {
    "en": "Loops & Iteration: for, while, for...of, and for...in",
    "vi": "Vòng Lặp & Duyệt Dữ Liệu: for, while, for...of và for...in"
  },
  "summary": {
    "en": "Master traditional for/while loops, modern iterable iteration with for...of, object property enumeration with for...in, break, continue, and loop labels.",
    "vi": "Làm chủ vòng lặp for/while truyền thống, duyệt cấu trúc iterable với for...of, duyệt thuộc tính object với for...in, ngắt/bỏ qua bằng break, continue và nhãn vòng lặp."
  },
  "estimatedMinutes": 20,
  "topicId": "js_loops_iteration",
  "learn": {
    "introduction": {
      "en": "Loops automate repetitive computational tasks and array processing. JavaScript provides multiple looping mechanisms: traditional index-based `for` loops, condition-driven `while` and `do...while` loops, modern iterable iteration via `for...of`, and property key enumeration with `for...in`. Understanding which loop to choose—and how to control execution with `break` and `continue`—is fundamental to writing efficient algorithms.",
      "vi": "Vòng lặp giúp tự động hóa các tác vụ tính toán lặp đi lặp lại và xử lý mảng. JavaScript cung cấp nhiều cơ chế lặp: vòng lặp `for` truyền thống qua chỉ số, `while` và `do...while` theo điều kiện, `for...of` hiện đại cho các đối tượng lặp (iterable) và `for...in` để duyệt key của object. Hiểu đúng thời điểm sử dụng từng loại vòng lặp và cách kiểm soát bằng `break` / `continue` là nền tảng quan trọng."
    },
    "conceptExplanation": {
      "en": "1. Traditional `for` & `while` Loops: Standard `for (let i = 0; i < len; i++)` is fastest for raw numeric indexing and matrix manipulations. `while (cond)` loops while a condition is true, and `do { ... } while (cond)` guarantees at least one execution.\n\n2. `for...of` (Iterables): Iterates directly over VALUES of iterable objects (Arrays, Strings, Sets, Maps, NodeLists, Generators). Supports `break` and `continue` (unlike `Array.prototype.forEach`).\n\n3. `for...in` (Object Keys): Enumerates all enumerable property KEYS of an object, including inherited prototype properties. Always guard with `Object.hasOwn(obj, key)` or prefer `Object.keys()` / `Object.entries()`.\n\n4. `break`, `continue` & Labels: `break` exits the nearest enclosing loop immediately; `continue` skips the current iteration step. Labeled statements (`outerLoop: for (...)`) permit breaking out of deeply nested multi-dimensional loops directly.",
      "vi": "1. Vòng lặp `for` & `while` truyền thống: `for (let i = 0; i < len; i++)` tối ưu tốc độ cho thao tác ma trận và mảng lớn. `while (cond)` lặp khi điều kiện còn đúng, và `do...while` đảm bảo khối lệnh được chạy ít nhất một lần.\n\n2. `for...of` (Duyệt giá trị Iterable): Duyệt trực tiếp qua GIÁ TRỊ của mảng, chuỗi, Set, Map, NodeList. Cho phép dùng `break` và `continue` linh hoạt (điều mà `forEach` không làm được).\n\n3. `for...in` (Duyệt key của Object): Duyệt qua các TÊN THUỘC TÍNH (keys) có thể liệt kê, bao gồm cả thuộc tính kế thừa từ prototype. Nên dùng `Object.hasOwn(obj, key)` hoặc ưu tiên `Object.keys()` / `Object.entries()`.\n\n4. `break`, `continue` & Labeled Loops: `break` ngắt vòng lặp gần nhất; `continue` bỏ qua lần lặp hiện tại. Gắn nhãn (`outerLoop: for (...)`) cho phép ngắt trực tiếp vòng lặp ngoài cùng trong các thuật toán ma trận nhiều chiều."
    },
    "syntax": "// 1. Modern for...of over arrays and strings\nconst tokens = [\"AUTH\", \"BEARER\", \"TOKEN_XYZ\"];\nfor (const token of tokens) {\n  if (token === \"BEARER\") continue;\n  console.log(\"Processing:\", token);\n}\n\n// 2. Destructuring entries in for...of\nconst userScores = new Map([[\"Alice\", 95], [\"Bob\", 82]]);\nfor (const [name, score] of userScores) {\n  console.log(`${name}: ${score}`);\n}\n\n// 3. Labeled loop for matrix pathfinding\nouterGrid: for (let r = 0; r < 5; r++) {\n  for (let c = 0; c < 5; c++) {\n    if (r === 2 && c === 3) {\n      console.log(\"Target found at (2,3)!\");\n      break outerGrid; // Exits both loops directly!\n    }\n  }\n}",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Batch Transaction Processor with Early Break",
          "vi": "Bộ Xử Lý Giao Dịch Hàng Loạt Với Cơ Chế Ngắt Sớm"
        },
        "description": {
          "en": "Demonstrates processing transactional arrays with loop controls and balance validation.",
          "vi": "Minh họa xử lý mảng giao dịch tài chính với kiểm soát vòng lặp và kiểm tra số dư."
        },
        "code": "function processLedger(transactions, initialBalance) {\n  let balance = initialBalance;\n  const processed = [];\n\n  for (const tx of transactions) {\n    if (tx.type === \"CREDIT\") {\n      balance += tx.amount;\n      processed.push({ ...tx, status: \"completed\", newBalance: balance });\n    } else if (tx.type === \"DEBIT\") {\n      if (balance < tx.amount) {\n        console.warn(`Transaction ${tx.id} declined: Insufficient funds`);\n        processed.push({ ...tx, status: \"declined\", currentBalance: balance });\n        break; // Stop processing further debit transactions\n      }\n      balance -= tx.amount;\n      processed.push({ ...tx, status: \"completed\", newBalance: balance });\n    }\n  }\n\n  return { finalBalance: balance, history: processed };\n}\n\nconst ledger = [\n  { id: \"TX-1\", type: \"CREDIT\", amount: 100 },\n  { id: \"TX-2\", type: \"DEBIT\", amount: 40 },\n  { id: \"TX-3\", type: \"DEBIT\", amount: 150 }\n];\nconsole.log(processLedger(ledger, 50));"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using `for...in` to iterate over elements of an Array.",
          "vi": "Dùng `for...in` để duyệt các phần tử trong một Mảng."
        },
        "correction": {
          "en": "Use `for...of` or standard `for (let i = 0; ...)` instead.",
          "vi": "Sử dụng `for...of` hoặc vòng lặp `for` thông thường."
        }
      }
    ],
    "tips": [
      {
        "en": "Prefer for...of for readable iterable traversal: `for...of` avoids index bookkeeping, works seamlessly with Sets, Maps, and Arrays, and fully supports break, continue, and async/await.",
        "vi": "Ưu tiên dùng for...of để duyệt cấu trúc iterable một cách trực quan: `for...of` giúp tránh việc phải quản lý biến đếm chỉ số, hoạt động tốt với Set, Map, Array và hỗ trợ đầy đủ break, continue cũng như async/await."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_7_1",
      "type": "complete_code",
      "title": {
        "en": "Matrix Search with Labeled Loop",
        "vi": "Tìm Kiếm Phần Tử Trong Ma Trận 2D Bằng Vòng Lặp Có Nhãn"
      },
      "instruction": {
        "en": "Write a function `findMatrixCoordinates(matrix, target)` that iterates through a 2D array and returns `{ row, col }` of the first match, terminating both loops immediately with a labeled break. Return `null` if not found.",
        "vi": "Viết hàm `findMatrixCoordinates(matrix, target)` duyệt qua mảng 2 chiều và trả về `{ row, col }` của phần tử đầu tiên khớp với target, thoát ngay cả 2 vòng lặp bằng labeled break. Trả về `null` nếu không tìm thấy."
      },
      "starterCode": "function findMatrixCoordinates(matrix, target) {\n  // Use labeled loops\n}\n\nconst grid = [\n  [10, 20, 30],\n  [40, 50, 60],\n  [70, 80, 90]\n];\nconsole.log(findMatrixCoordinates(grid, 50)); // { row: 1, col: 1 }",
      "solutionCode": "function findMatrixCoordinates(matrix, target) {\n  let result = null;\n\n  matrixSearch: for (let r = 0; r < matrix.length; r++) {\n    for (let c = 0; c < matrix[r].length; c++) {\n      if (matrix[r][c] === target) {\n        result = { row: r, col: c };\n        break matrixSearch;\n      }\n    }\n  }\n\n  return result;\n}",
      "hint": {
        "en": "Declare `matrixSearch: for(...)` and use `break matrixSearch;` when matrix[r][c] === target.",
        "vi": "Khai báo nhãn `matrixSearch: for(...)` và gọi `break matrixSearch;` khi matrix[r][c] === target."
      }
    },
    {
      "id": "js_ex_7_2",
      "type": "complete_code",
      "title": {
        "en": "Object Property Frequency Counter",
        "vi": "Đếm Tần Suất Thuộc Tính Bằng for...in và Object.hasOwn"
      },
      "instruction": {
        "en": "Write a function `countPrimitiveValues(obj)` that uses `for...in` and `Object.hasOwn` to iterate over all own properties of an object and returns an object counting how many times each type ('string', 'number', 'boolean') appears as a value.",
        "vi": "Viết hàm `countPrimitiveValues(obj)` dùng `for...in` và `Object.hasOwn` để duyệt các thuộc tính riêng của object và trả về đối tượng đếm số lần xuất hiện của các kiểu giá trị ('string', 'number', 'boolean')."
      },
      "starterCode": "function countPrimitiveValues(obj) {\n  // Count value types\n}\n\nconsole.log(countPrimitiveValues({ a: 1, b: \"hello\", c: 2, d: true, e: \"world\" }));\n// { number: 2, string: 2, boolean: 1 }",
      "solutionCode": "function countPrimitiveValues(obj) {\n  const counts = {};\n  for (const key in obj) {\n    if (Object.hasOwn(obj, key)) {\n      const type = typeof obj[key];\n      counts[type] = (counts[type] || 0) + 1;\n    }\n  }\n  return counts;\n}",
      "hint": {
        "en": "Check Object.hasOwn(obj, key), get typeof obj[key], and increment counts[type].",
        "vi": "Kiểm tra Object.hasOwn(obj, key), lấy typeof obj[key] và tăng biến đếm counts[type]."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_7",
    "title": {
      "en": "Chunked Stream Pipeline Aggregator",
      "vi": "Bộ Gom Nhóm & Xử Lý Dòng Dữ Liệu Theo Phân Đoạn (Chunks)"
    },
    "description": {
      "en": "Create a function `processChunkedData(items, chunkSize, transformFn)` that iterates through an array using a `while` loop, divides it into chunks of size `chunkSize`, applies `transformFn` to each item in the chunk, filters out any null/undefined results, and returns the flattened transformed list.",
      "vi": "Xây dựng hàm `processChunkedData(items, chunkSize, transformFn)` duyệt mảng bằng vòng lặp `while`, chia mảng thành các phân đoạn có độ dài `chunkSize`, áp dụng `transformFn` cho từng phần tử trong phân đoạn, lọc bỏ các kết quả null/undefined và trả về mảng kết quả cuối cùng."
    },
    "starterCode": "function processChunkedData(items, chunkSize, transformFn) {\n  // Implement chunked processor with while loop\n}\n\nconst numbers = [1, 2, 3, 4, 5, 6, 7, 8];\nconst squares = processChunkedData(numbers, 3, n => n % 2 === 0 ? n * n : null);\nconsole.log(squares); // [4, 16, 36, 64]",
    "solutionCode": "function processChunkedData(items, chunkSize, transformFn) {\n  if (!Array.isArray(items) || chunkSize <= 0) return [];\n  const results = [];\n  let index = 0;\n\n  while (index < items.length) {\n    const chunk = items.slice(index, index + chunkSize);\n    for (const item of chunk) {\n      const transformed = transformFn(item);\n      if (transformed !== null && transformed !== undefined) {\n        results.push(transformed);\n      }\n    }\n    index += chunkSize;\n  }\n\n  return results;\n}",
    "hints": [
      {
        "en": "Maintain an index counter in the while loop, slice chunks, iterate through each chunk with for...of, and collect non-null transformed values.",
        "vi": "Duy trì biến index trong vòng lặp while, cắt mảng con bằng slice, duyệt qua từng chunk với for...of và gom các giá trị khác null vào kết quả."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Chunked Stream Pipeline Aggregator according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Gom Nhóm & Xử Lý Dòng Dữ Liệu Theo Phân Đoạn (Chunks) theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_7_1",
      "type": "single_choice",
      "question": {
        "en": "Which loop construct is specifically designed to iterate over values of Iterable objects (Arrays, Strings, Maps, Sets)?",
        "vi": "Cấu trúc vòng lặp nào được thiết kế chuyên biệt để duyệt qua các giá trị của đối tượng Iterable (Array, String, Map, Set)?"
      },
      "options": [
        {
          "en": "for...of",
          "vi": "for...of"
        },
        {
          "en": "for...in",
          "vi": "for...in"
        },
        {
          "en": "while...do",
          "vi": "while...do"
        },
        {
          "en": "switch...case",
          "vi": "switch...case"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`for...of` invokes the object's `[Symbol.iterator]` and steps through values directly.",
        "vi": "`for...of` gọi phương thức `[Symbol.iterator]` của đối tượng và duyệt qua từng giá trị một cách trực quan."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "easy"
    },
    {
      "id": "js_q_7_2",
      "type": "single_choice",
      "question": {
        "en": "What is the primary difference between `for...in` and `for...of` in JavaScript?",
        "vi": "Điểm khác biệt cốt lõi giữa `for...in` và `for...of` trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "`for...in` iterates over enumerable property KEYS; `for...of` iterates over iterable collection VALUES",
          "vi": "`for...in` duyệt qua các TÊN THUỘC TÍNH (keys); `for...of` duyệt qua các GIÁ TRỊ (values) của tập hợp"
        },
        {
          "en": "`for...in` is asynchronous; `for...of` is synchronous",
          "vi": "`for...in` là bất đồng bộ; `for...of` là đồng bộ"
        },
        {
          "en": "`for...of` cannot be used with Arrays",
          "vi": "`for...of` không thể dùng được với Mảng"
        },
        {
          "en": "`for...in` only works in Node.js",
          "vi": "`for...in` chỉ chạy được trong Node.js"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`for...in` loops over property names (keys) of an object. `for...of` loops over values provided by an iterable.",
        "vi": "`for...in` lặp qua tên các thuộc tính (keys) của đối tượng. `for...of` lặp qua các phần tử dữ liệu (values) của iterable."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "easy"
    },
    {
      "id": "js_q_7_3",
      "type": "predict_output",
      "question": {
        "en": "What will the following code output?\n```js\nlet count = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) continue;\n  count += i;\n}\nconsole.log(count);\n```",
        "vi": "Đoạn mã sau sẽ in ra kết quả gì?\n```js\nlet count = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i === 2) continue;\n  count += i;\n}\nconsole.log(count);\n```"
      },
      "options": [
        {
          "en": "8",
          "vi": "8"
        },
        {
          "en": "10",
          "vi": "10"
        },
        {
          "en": "3",
          "vi": "3"
        },
        {
          "en": "0",
          "vi": "0"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The loop sums `0 + 1 + 3 + 4` because `i === 2` is skipped with `continue`. Sum = 8.",
        "vi": "Vòng lặp tính tổng `0 + 1 + 3 + 4` vì khi `i === 2` bị bỏ qua bởi `continue`. Tổng là 8."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "easy"
    },
    {
      "id": "js_q_7_4",
      "type": "predict_output",
      "question": {
        "en": "How many times does the loop body execute in a `do...while (false)` loop?",
        "vi": "Thân vòng lặp trong `do...while (false)` được thực thi bao nhiêu lần?"
      },
      "options": [
        {
          "en": "Exactly 1 time",
          "vi": "Đúng 1 lần"
        },
        {
          "en": "0 times",
          "vi": "0 lần"
        },
        {
          "en": "Infinite times",
          "vi": "Vô hạn lần"
        },
        {
          "en": "Throws SyntaxError",
          "vi": "Báo lỗi SyntaxError"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`do...while` evaluates the condition after executing the body once, guaranteeing at least one execution.",
        "vi": "`do...while` kiểm tra điều kiện sau khi đã chạy thân vòng lặp, đảm bảo khối lệnh được chạy tối thiểu 1 lần."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "medium"
    },
    {
      "id": "js_q_7_5",
      "type": "single_choice",
      "question": {
        "en": "What is a 'Labeled Statement' in JavaScript (e.g. `mainLoop: for (...)`)?",
        "vi": "'Labeled Statement' trong JavaScript (ví dụ `mainLoop: for (...)`) là gì?"
      },
      "options": [
        {
          "en": "An identifier prefix that allows `break` or `continue` to target a specific outer loop from within nested loops",
          "vi": "Một nhãn định danh cho phép `break` hoặc `continue` tác động trực tiếp tới vòng lặp ngoài cụ thể từ trong các vòng lặp lồng nhau"
        },
        {
          "en": "A CSS tag selector inside JS",
          "vi": "Một bộ chọn tag CSS bên trong JS"
        },
        {
          "en": "A TypeScript type annotation",
          "vi": "Một chú thích kiểu dữ liệu TypeScript"
        },
        {
          "en": "A debugging marker for DevTools",
          "vi": "Một đánh dấu gỡ lỗi trong DevTools"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Labels provide statement references that enable jumping out of multi-level nested loops directly with `break labelName;`.",
        "vi": "Nhãn giúp tham chiếu khối lệnh, cho phép thoát trực tiếp ra khỏi nhiều tầng vòng lặp lồng nhau bằng `break labelName;`."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "medium"
    },
    {
      "id": "js_q_7_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` print?\n```js\nconst obj = { x: 10, y: 20 };\nlet keys = '';\nfor (const k in obj) keys += k;\nconsole.log(keys);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nconst obj = { x: 10, y: 20 };\nlet keys = '';\nfor (const k in obj) keys += k;\nconsole.log(keys);\n```"
      },
      "options": [
        {
          "en": "'xy'",
          "vi": "'xy'"
        },
        {
          "en": "'30'",
          "vi": "'30'"
        },
        {
          "en": "'1020'",
          "vi": "'1020'"
        },
        {
          "en": "TypeError",
          "vi": "TypeError"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`for...in` iterates over the property keys `'x'` and `'y'`, concatenating to `'xy'`.",
        "vi": "`for...in` duyệt qua tên các thuộc tính `'x'` và `'y'`, ghép chuỗi thành `'xy'`."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "medium"
    },
    {
      "id": "js_q_7_7",
      "type": "single_choice",
      "question": {
        "en": "Why is `Array.prototype.forEach()` unable to stop early with the `break` keyword?",
        "vi": "Tại sao không thể dùng từ khóa `break` để dừng sớm phương thức `Array.prototype.forEach()`?"
      },
      "options": [
        {
          "en": "`forEach` executes a callback function for every element; `break` is only syntactically valid inside loop statements",
          "vi": "`forEach` thực thi một hàm callback cho mỗi phần tử; `break` chỉ hợp lệ về mặt cú pháp bên trong các câu lệnh vòng lặp"
        },
        {
          "en": "`forEach` is asynchronous",
          "vi": "`forEach` là bất đồng bộ"
        },
        {
          "en": "`forEach` is deprecated in ES6",
          "vi": "`forEach` đã bị khai tử trong ES6"
        },
        {
          "en": "`break` causes memory leaks in arrays",
          "vi": "`break` gây rò rỉ bộ nhớ trong mảng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`break` cannot cross function boundaries. To exit early from an array traversal, use `for...of`, `some()`, or `every()`.",
        "vi": "`break` không thể nhảy qua ranh giới hàm callback. Để dừng sớm duyệt mảng, hãy dùng `for...of`, `some()`, hoặc `every()`."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "medium"
    },
    {
      "id": "js_q_7_8",
      "type": "fill_blank",
      "question": {
        "en": "To terminate the current iteration immediately and proceed to the next iteration step of a loop, use the _____ keyword.",
        "vi": "Để kết thúc ngay lần lặp hiện tại và chuyển sang bước lặp tiếp theo của vòng lặp, sử dụng từ khóa _____."
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
        "en": "The `continue` statement skips remaining statements in the current iteration and advances the loop.",
        "vi": "Câu lệnh `continue` bỏ qua các câu lệnh còn lại trong vòng lặp hiện tại và nhảy tới bước lặp kế tiếp."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "continue"
      ]
    },
    {
      "id": "js_q_7_9",
      "type": "single_choice",
      "question": {
        "en": "Which method is the modern standard replacement for `hasOwnProperty` when checking if an object directly owns a property?",
        "vi": "Phương thức chuẩn hiện đại nào thay thế cho `hasOwnProperty` khi kiểm tra đối tượng có sở hữu trực tiếp thuộc tính không?"
      },
      "options": [
        {
          "en": "Object.hasOwn(obj, prop)",
          "vi": "Object.hasOwn(obj, prop)"
        },
        {
          "en": "Object.contains(obj, prop)",
          "vi": "Object.contains(obj, prop)"
        },
        {
          "en": "Reflect.owns(obj, prop)",
          "vi": "Reflect.owns(obj, prop)"
        },
        {
          "en": "obj.hasProperty(prop)",
          "vi": "obj.hasProperty(prop)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Object.hasOwn()` was introduced in ES2022 as a safe static method that works even on `Object.create(null)` objects.",
        "vi": "`Object.hasOwn()` được giới thiệu trong ES2022, an toàn hơn và hoạt động tốt ngay cả với các object tạo từ `Object.create(null)`."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "hard"
    },
    {
      "id": "js_q_7_10",
      "type": "single_choice",
      "question": {
        "en": "What causes an infinite loop in a `while (i < 10)` statement?",
        "vi": "Nguyên nhân nào dẫn đến vòng lặp vô tận trong câu lệnh `while (i < 10)`?"
      },
      "options": [
        {
          "en": "Failing to increment or modify the variable `i` inside the loop body",
          "vi": "Quên không tăng hoặc thay đổi giá trị của biến `i` bên trong thân vòng lặp"
        },
        {
          "en": "Declaring `i` with `let`",
          "vi": "Khai báo `i` bằng `let`"
        },
        {
          "en": "Using strict mode",
          "vi": "Chạy trong strict mode"
        },
        {
          "en": "Placing console.log inside the loop",
          "vi": "Đặt console.log bên trong vòng lặp"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "If the termination condition never becomes false (because the loop counter is never updated), the loop runs indefinitely and hangs the thread.",
        "vi": "Nếu điều kiện dừng không bao giờ chuyển thành false (do biến đếm không được cập nhật), vòng lặp sẽ chạy vô hạn và làm treo luồng JS."
      },
      "topicId": "js_loops_iteration",
      "difficulty": "hard"
    }
  ]
};
export default lesson07;
