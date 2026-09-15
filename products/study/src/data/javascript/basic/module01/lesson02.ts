import { Lesson } from '../../../../types';

export const lesson02: Lesson = {
  "id": "js_lesson_2",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_1",
  "order": 2,
  "title": {
    "en": "Variables & Scope: let, const and Legacy var",
    "vi": "Khai Báo Biến & Phạm Vi (Scope): let, const và var Cũ"
  },
  "summary": {
    "en": "Master block scope, function scope, hoisting, Temporal Dead Zone (TDZ), and mutability rules of const object references.",
    "vi": "Làm chủ phạm vi khối (block scope), phạm vi hàm, hoisting, Vùng Chết Tạm Thời (TDZ) và tính khả biến của đối tượng khai báo const."
  },
  "estimatedMinutes": 20,
  "topicId": "js_variables_scope",
  "learn": {
    "introduction": {
      "en": "Variables are named storage locations for values in JavaScript memory. ECMAScript 2015 (ES6) modernized JavaScript variable declarations by introducing `let` and `const` with lexical block scoping, effectively replacing legacy function-scoped `var`. Understanding scoping rules, variable hoisting, and the Temporal Dead Zone is critical to writing bug-free, predictable code.",
      "vi": "Biến là vùng nhớ có tên dùng để lưu trữ giá trị trong bộ nhớ JavaScript. Bản cập nhật ES6 (2015) đã hiện đại hóa việc khai báo biến với `let` và `const` có phạm vi khối (block scope), thay thế `var` với phạm vi hàm dễ sinh lỗi. Hiểu rõ quy tắc phạm vi, cơ chế hoisting và Vùng Chết Tạm Thời (Temporal Dead Zone - TDZ) là điều tối quan trọng để viết code an toàn và dễ đoán."
    },
    "conceptExplanation": {
      "en": "1. Scope Hierarchies: Global Scope (accessible everywhere), Function Scope (confined within function body - `var`), and Block Scope (confined within `{ ... }` blocks - `let` and `const`).\n\n2. Hoisting & Temporal Dead Zone (TDZ): `var` declarations are hoisted to the top of their function/global scope and initialized as `undefined`. In contrast, `let` and `const` declarations are also hoisted, but they remain uninitialized in the TDZ from the start of the block until the evaluation of the declaration line. Accessing them before initialization throws a `ReferenceError`.\n\n3. Mutability of `const`: `const` creates an immutable variable binding (the identifier cannot be reassigned). However, if the value is an Object or Array, the internal properties or elements remain mutable unless frozen with `Object.freeze()`.\n\n4. Best Practice Guideline: Use `const` by default for all identifiers. Switch to `let` only when the variable binding must change over time (such as loop accumulators). Never use `var` in modern JavaScript codebases.",
      "vi": "1. Các tầng phạm vi: Toàn cục (Global Scope), Phạm vi hàm (Function Scope - biến `var`), và Phạm vi khối (Block Scope - biến `let` và `const` trong `{ ... }`).\n\n2. Hoisting & Vùng Chết Tạm Thời (TDZ): `var` được đẩy lên đầu phạm vi và tự gán `undefined`. Ngược lại, `let` và `const` cũng được hoist nhưng nằm trong TDZ và chưa được khởi tạo cho đến khi chạy tới dòng khai báo. Truy cập biến trong TDZ sẽ ném lỗi `ReferenceError`.\n\n3. Tính bất biến của `const`: `const` khóa định danh (không thể gán lại bằng dấu `=`). Tuy nhiên nếu giá trị là Object hay Array, các thuộc tính hoặc phần tử bên trong vẫn có thể chỉnh sửa trừ khi dùng `Object.freeze()`.\n\n4. Thực hành tốt nhất: Luôn ưu tiên dùng `const` làm mặc định. Chỉ chuyển sang `let` khi giá trị biến thực sự cần thay đổi (như biến đếm vòng lặp). Tuyệt đối tránh dùng `var` trong các dự án hiện đại."
    },
    "syntax": "// 1. Block scope with const and let\nconst API_URL = \"https://api.example.com/v1\";\nlet retryCount = 0;\n\nif (true) {\n  const localSecret = \"xyz789\";\n  let retryCount = 5; // Shadowing outer retryCount within this block\n  console.log(\"Inner retryCount:\", retryCount); // 5\n}\n// console.log(localSecret); // ReferenceError: localSecret is not defined\n\n// 2. const with objects (reassignment forbidden, mutation allowed)\nconst config = { theme: \"dark\", autoSave: true };\nconfig.theme = \"light\"; // Valid mutation\n// config = {}; // TypeError: Assignment to constant variable",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Demonstrating Block Scope and TDZ",
          "vi": "Minh Họa Block Scope và Hiện Tượng TDZ"
        },
        "description": {
          "en": "Explores the practical difference between var, let, and const in loops and conditional blocks.",
          "vi": "Khám phá sự khác biệt thực tế giữa var, let và const trong vòng lặp và khối điều kiện."
        },
        "code": "function runCartSimulation() {\n  const discountRate = 0.15;\n  let subtotal = 100;\n\n  for (let i = 0; i < 3; i++) {\n    // i is fresh in each iteration's block scope\n    subtotal += i * 10;\n  }\n\n  const order = { id: \"ORD-902\", total: subtotal * (1 - discountRate) };\n  order.status = \"processed\"; // Allowed object mutation\n\n  return order;\n}\n\nconsole.log(runCartSimulation());"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Believing that `const obj = {}` prevents object properties from being modified.",
          "vi": "Nghĩ rằng `const obj = {}` sẽ ngăn chặn hoàn toàn việc sửa đổi các thuộc tính bên trong."
        },
        "correction": {
          "en": "Use `Object.freeze(obj)` if you require shallow immutability of object properties.",
          "vi": "Sử dụng `Object.freeze(obj)` nếu bạn cần ngăn chặn sửa đổi thuộc tính của object."
        }
      }
    ],
    "tips": [
      {
        "en": "Adhere to the 'const by default' convention: Declare all variables with `const`. If and only if a reassignment is necessary, change the declaration to `let`. This prevents accidental mutations.",
        "vi": "Tuân thủ quy tắc 'const làm mặc định': Khai báo mọi biến với `const`. Chỉ khi nào cần gán lại giá trị mới đổi sang `let`. Điều này ngăn ngừa các đột biến giá trị ngoài ý muốn."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_2_1",
      "type": "complete_code",
      "title": {
        "en": "Refactor Legacy var to Scoped let and const",
        "vi": "Tái Cấu Trúc var Sang let và const Có Phạm Vi Khối"
      },
      "instruction": {
        "en": "Refactor the legacy checkout calculation function to use `const` for non-reassigned bindings and `let` for variables that change, eliminating all `var` statements.",
        "vi": "Tái cấu trúc hàm tính toán hóa đơn bằng cách dùng `const` cho các giá trị không đổi và `let` cho biến cần gán lại, loại bỏ toàn bộ `var`."
      },
      "starterCode": "function calculateInvoice(items, taxRate) {\n  var total = 0;\n  for (var i = 0; i < items.length; i++) {\n    var item = items[i];\n    var itemTotal = item.price * item.quantity;\n    total = total + itemTotal;\n  }\n  var taxAmount = total * taxRate;\n  var finalAmount = total + taxAmount;\n  return finalAmount;\n}",
      "solutionCode": "function calculateInvoice(items, taxRate) {\n  let total = 0;\n  for (let i = 0; i < items.length; i++) {\n    const item = items[i];\n    const itemTotal = item.price * item.quantity;\n    total = total + itemTotal;\n  }\n  const taxAmount = total * taxRate;\n  const finalAmount = total + taxAmount;\n  return finalAmount;\n}",
      "hint": {
        "en": "Use let for total and the loop counter i; use const for items, item, itemTotal, taxAmount, and finalAmount.",
        "vi": "Dùng let cho total và biến đếm i; dùng const cho item, itemTotal, taxAmount và finalAmount."
      }
    },
    {
      "id": "js_ex_2_2",
      "type": "complete_code",
      "title": {
        "en": "Immutable Settings Creator with Object.freeze",
        "vi": "Tạo Cấu Hình Bất Biến Với Object.freeze"
      },
      "instruction": {
        "en": "Write a function `createImmutableConfig(appName, version)` that creates a config object with properties `{ appName, version, createdAt: Date.now() }`, freezes it with `Object.freeze()`, and returns it.",
        "vi": "Viết hàm `createImmutableConfig(appName, version)` tạo đối tượng cấu hình `{ appName, version, createdAt: Date.now() }`, đóng băng nó bằng `Object.freeze()` và trả về."
      },
      "starterCode": "function createImmutableConfig(appName, version) {\n  // Create and freeze config object\n}\n\nconst config = createImmutableConfig(\"PaymentGateway\", \"2.1.0\");\nconsole.log(config);",
      "solutionCode": "function createImmutableConfig(appName, version) {\n  const config = {\n    appName,\n    version,\n    createdAt: Date.now()\n  };\n  return Object.freeze(config);\n}",
      "hint": {
        "en": "Create the object with const, then return Object.freeze(config).",
        "vi": "Tạo đối tượng với const, sau đó trả về Object.freeze(config)."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_2",
    "title": {
      "en": "Scoped Rate Limiter Window",
      "vi": "Bộ Giới Hạn Tần Suất Theo Cửa Sổ Thời Gian"
    },
    "description": {
      "en": "Create a factory function `createRateLimiter(maxRequests, windowMs)` that returns an object with a method `attempt(clientId)`. It should use block and lexical scoping to track request timestamps per client, allow requests if under `maxRequests` within `windowMs`, or reject with `{ allowed: false, retryAfterMs }`.",
      "vi": "Tạo hàm factory `createRateLimiter(maxRequests, windowMs)` trả về đối tượng có phương thức `attempt(clientId)`. Sử dụng phạm vi khối và lexical scope để theo dõi timestamp của từng client, cho phép nếu chưa vượt quá `maxRequests` trong `windowMs`, hoặc từ chối với `{ allowed: false, retryAfterMs }`."
    },
    "starterCode": "function createRateLimiter(maxRequests, windowMs) {\n  // Implement scoped rate limiter\n}\n\nconst limiter = createRateLimiter(3, 10000);\nconsole.log(limiter.attempt(\"client_1\")); // { allowed: true }",
    "solutionCode": "function createRateLimiter(maxRequests, windowMs) {\n  const clientHistory = new Map();\n\n  return {\n    attempt(clientId) {\n      const now = Date.now();\n      if (!clientHistory.has(clientId)) {\n        clientHistory.set(clientId, []);\n      }\n\n      const timestamps = clientHistory.get(clientId);\n      // Filter out timestamps outside window\n      const validTimestamps = timestamps.filter(t => now - t < windowMs);\n      clientHistory.set(clientId, validTimestamps);\n\n      if (validTimestamps.length >= maxRequests) {\n        const oldest = validTimestamps[0];\n        const retryAfterMs = windowMs - (now - oldest);\n        return { allowed: false, retryAfterMs };\n      }\n\n      validTimestamps.push(now);\n      return { allowed: true, remaining: maxRequests - validTimestamps.length };\n    }\n  };\n}",
    "hints": [
      {
        "en": "Use a Map inside the closure to store an array of timestamp numbers for each clientId.",
        "vi": "Dùng một Map bên trong closure để lưu trữ mảng timestamp cho từng clientId."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Scoped Rate Limiter Window according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Giới Hạn Tần Suất Theo Cửa Sổ Thời Gian theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_2_1",
      "type": "single_choice",
      "question": {
        "en": "What is the Temporal Dead Zone (TDZ) in JavaScript?",
        "vi": "Vùng Chết Tạm Thời (Temporal Dead Zone - TDZ) trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "The period of time between entering a scope and the variable's declaration line where let/const cannot be accessed",
          "vi": "Khoảng thời gian từ khi bắt đầu bước vào scope đến khi chạy tới dòng khai báo let/const mà biến không thể truy cập"
        },
        {
          "en": "A memory leak caused by uncollected closures",
          "vi": "Rò rỉ bộ nhớ gây ra bởi các closure không được thu gom"
        },
        {
          "en": "The time required for an async network fetch to complete",
          "vi": "Thời gian chờ một tác vụ fetch mạng bất đồng bộ hoàn thành"
        },
        {
          "en": "A browser crash zone when stack overflow occurs",
          "vi": "Hiện tượng trình duyệt bị treo khi tràn ngăn xếp"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Variables declared with let and const exist in the TDZ from the start of the block until the declaration statement is evaluated. Accessing them inside the TDZ throws a ReferenceError.",
        "vi": "Biến let và const nằm trong TDZ từ đầu khối lệnh cho đến khi dòng khai báo được thực thi. Cố tình truy cập biến trong TDZ sẽ ném lỗi ReferenceError."
      },
      "topicId": "js_variables_scope",
      "difficulty": "easy"
    },
    {
      "id": "js_q_2_2",
      "type": "predict_output",
      "question": {
        "en": "What happens when this code is executed?\n```js\nconsole.log(a);\nvar a = 10;\n```",
        "vi": "Điều gì xảy ra khi thực thi đoạn mã sau?\n```js\nconsole.log(a);\nvar a = 10;\n```"
      },
      "options": [
        {
          "en": "Prints 10",
          "vi": "In ra 10"
        },
        {
          "en": "Prints undefined",
          "vi": "In ra undefined"
        },
        {
          "en": "Throws ReferenceError",
          "vi": "Ném lỗi ReferenceError"
        },
        {
          "en": "Throws TypeError",
          "vi": "Ném lỗi TypeError"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "`var a` is hoisted and initialized with `undefined`. The assignment `a = 10` happens on line 2, so line 1 prints `undefined`.",
        "vi": "`var a` được hoist lên đầu và tự gán giá trị `undefined`. Phép gán `a = 10` chỉ diễn ra ở dòng 2, nên dòng 1 in ra `undefined`."
      },
      "topicId": "js_variables_scope",
      "difficulty": "easy"
    },
    {
      "id": "js_q_2_3",
      "type": "predict_output",
      "question": {
        "en": "What happens when this code is executed?\n```js\nconsole.log(b);\nlet b = 20;\n```",
        "vi": "Điều gì xảy ra khi thực thi đoạn mã sau?\n```js\nconsole.log(b);\nlet b = 20;\n```"
      },
      "options": [
        {
          "en": "Prints undefined",
          "vi": "In ra undefined"
        },
        {
          "en": "Throws ReferenceError: Cannot access 'b' before initialization",
          "vi": "Ném lỗi ReferenceError: Cannot access 'b' before initialization"
        },
        {
          "en": "Prints 20",
          "vi": "In ra 20"
        },
        {
          "en": "Prints null",
          "vi": "In ra null"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "`let b` is hoisted but remains in the Temporal Dead Zone until initialized. Accessing it triggers a ReferenceError.",
        "vi": "`let b` được hoist nhưng nằm trong TDZ và chưa được khởi tạo, nên việc truy cập trước dòng khai báo sẽ ném ReferenceError."
      },
      "topicId": "js_variables_scope",
      "difficulty": "easy"
    },
    {
      "id": "js_q_2_4",
      "type": "single_choice",
      "question": {
        "en": "Which of the following describes the scoping behavior of `var` versus `let` and `const`?",
        "vi": "Phát biểu nào sau đây mô tả đúng về phạm vi của `var` so với `let` và `const`?"
      },
      "options": [
        {
          "en": "`var` is function-scoped; `let` and `const` are block-scoped",
          "vi": "`var` có phạm vi hàm; `let` và `const` có phạm vi khối (block-scoped)"
        },
        {
          "en": "`var` is block-scoped; `let` is function-scoped",
          "vi": "`var` có phạm vi khối; `let` có phạm vi hàm"
        },
        {
          "en": "All three have identical scoping rules",
          "vi": "Cả ba đều có quy tắc phạm vi hoàn toàn giống nhau"
        },
        {
          "en": "`const` is global-only",
          "vi": "`const` chỉ có phạm vi toàn cục"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`var` is constrained only by functions or global scope, ignoring `{ ... }` blocks. `let` and `const` are strictly bound to the enclosing `{ ... }` block.",
        "vi": "`var` chỉ bị giới hạn bởi hàm hoặc toàn cục, bỏ qua các khối `{ ... }`. `let` và `const` bị ràng buộc chặt chẽ trong khối `{ ... }` gần nhất."
      },
      "topicId": "js_variables_scope",
      "difficulty": "medium"
    },
    {
      "id": "js_q_2_5",
      "type": "predict_output",
      "question": {
        "en": "What will the following code output?\n```js\nconst user = { name: 'Sarah' };\nuser.name = 'Jessica';\nconsole.log(user.name);\n```",
        "vi": "Đoạn mã sau sẽ in ra kết quả gì?\n```js\nconst user = { name: 'Sarah' };\nuser.name = 'Jessica';\nconsole.log(user.name);\n```"
      },
      "options": [
        {
          "en": "'Jessica'",
          "vi": "'Jessica'"
        },
        {
          "en": "TypeError: Assignment to constant variable",
          "vi": "TypeError: Assignment to constant variable"
        },
        {
          "en": "'Sarah'",
          "vi": "'Sarah'"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`const` prevents reassignment of the variable `user`, but properties of the referenced object in heap memory can still be mutated.",
        "vi": "`const` ngăn gán lại biến `user` thành một đối tượng khác, nhưng các thuộc tính bên trong đối tượng vẫn có thể chỉnh sửa tự do."
      },
      "topicId": "js_variables_scope",
      "difficulty": "medium"
    },
    {
      "id": "js_q_2_6",
      "type": "predict_output",
      "question": {
        "en": "What is the output of the classic async loop bug below?\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n```",
        "vi": "Kết quả in ra của đoạn mã lặp bất đồng bộ với var dưới đây là gì?\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n```"
      },
      "options": [
        {
          "en": "0, 1, 2",
          "vi": "0, 1, 2"
        },
        {
          "en": "3, 3, 3",
          "vi": "3, 3, 3"
        },
        {
          "en": "undefined, undefined, undefined",
          "vi": "undefined, undefined, undefined"
        },
        {
          "en": "0, 0, 0",
          "vi": "0, 0, 0"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "Because `var i` is function/global scoped, all three setTimeout callbacks share the same `i` variable, which equals 3 after the loop finishes.",
        "vi": "Do `var i` có phạm vi hàm/toàn cục, cả 3 callback của setTimeout đều cùng tham chiếu đến một biến `i` duy nhất có giá trị là 3 sau khi vòng lặp kết thúc."
      },
      "topicId": "js_variables_scope",
      "difficulty": "medium"
    },
    {
      "id": "js_q_2_7",
      "type": "single_choice",
      "question": {
        "en": "How does changing `var i` to `let i` fix the async loop problem?",
        "vi": "Tại sao đổi `var i` thành `let i` lại giải quyết được lỗi trong vòng lặp bất đồng bộ?"
      },
      "options": [
        {
          "en": "`let` creates a new lexical binding of `i` for each iteration of the loop",
          "vi": "`let` tạo một binding lexical mới của `i` cho mỗi vòng lặp riêng biệt"
        },
        {
          "en": "`let` makes setTimeout synchronous",
          "vi": "`let` biến setTimeout thành hàm đồng bộ"
        },
        {
          "en": "`let` converts numbers to strings automatically",
          "vi": "`let` tự động chuyển số thành chuỗi"
        },
        {
          "en": "`let` disables the event loop",
          "vi": "`let` tắt cơ chế event loop"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The ECMAScript specification dictates that `for (let i ...)` binds a fresh copy of `i` for each iteration step.",
        "vi": "Chuẩn ECMAScript quy định rằng `for (let i ...)` khởi tạo một bản sao `i` mới trong phạm vi khối của từng vòng lặp."
      },
      "topicId": "js_variables_scope",
      "difficulty": "medium"
    },
    {
      "id": "js_q_2_8",
      "type": "fill_blank",
      "question": {
        "en": "To prevent any modifications or additions to an object's top-level properties, you pass it to Object._____().",
        "vi": "Để ngăn chặn mọi chỉnh sửa hoặc thêm mới thuộc tính trên một đối tượng, bạn truyền đối tượng vào Object._____()."
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
        "en": "Object.freeze() makes an object shallowly immutable.",
        "vi": "Object.freeze() làm cho đối tượng trở nên bất biến ở cấp nông (shallow immutable)."
      },
      "topicId": "js_variables_scope",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "freeze"
      ]
    },
    {
      "id": "js_q_2_9",
      "type": "single_choice",
      "question": {
        "en": "Can a variable declared with `let` be re-declared in the same block scope?",
        "vi": "Một biến đã khai báo bằng `let` có thể được khai báo lại (re-declare) trong cùng một phạm vi khối không?"
      },
      "options": [
        {
          "en": "Yes, it overrides the previous declaration",
          "vi": "Có, nó sẽ ghi đè khai báo trước"
        },
        {
          "en": "No, it throws a SyntaxError: Identifier has already been declared",
          "vi": "Không, nó sẽ ném lỗi SyntaxError: Identifier has already been declared"
        },
        {
          "en": "Yes, but only if the data type changes",
          "vi": "Có, nhưng chỉ khi đổi kiểu dữ liệu"
        },
        {
          "en": "Only in strict mode",
          "vi": "Chỉ xảy ra trong strict mode"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "`let` and `const` forbid duplicate declarations in the exact same scope.",
        "vi": "`let` và `const` nghiêm cấm khai báo trùng tên biến trong cùng một phạm vi khối."
      },
      "topicId": "js_variables_scope",
      "difficulty": "hard"
    },
    {
      "id": "js_q_2_10",
      "type": "single_choice",
      "question": {
        "en": "What is variable shadowing in JavaScript?",
        "vi": "Hiện tượng Che Khuất Biến (Variable Shadowing) trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "When an inner block declares a variable with the same name as an outer scope variable, temporarily masking the outer one",
          "vi": "Khi một khối lệnh bên trong khai báo biến trùng tên với biến ở scope ngoài, tạm thời che khuất biến ngoài"
        },
        {
          "en": "When a variable is deleted by garbage collection",
          "vi": "Khi một biến bị thu gom rác xóa bỏ"
        },
        {
          "en": "When variables are converted to binary format",
          "vi": "Khi biến được chuyển đổi sang định dạng nhị phân"
        },
        {
          "en": "When global variables are hidden from the window object",
          "vi": "Khi biến toàn cục bị ẩn khỏi đối tượng window"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Variable shadowing occurs when a variable declared within a local scope has the same name as a variable in an outer scope, resolving references to the innermost binding.",
        "vi": "Variable shadowing xảy ra khi biến trong scope con trùng tên với scope cha, JavaScript sẽ ưu tiên lấy giá trị ở scope con gần nhất."
      },
      "topicId": "js_variables_scope",
      "difficulty": "hard"
    }
  ]
};
export default lesson02;
