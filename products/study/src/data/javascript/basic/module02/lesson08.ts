import { Lesson } from '../../../../types';

export const lesson08: Lesson = {
  "id": "js_lesson_8",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_2",
  "order": 8,
  "title": {
    "en": "Functions: Declarations, Arrow Functions, Parameters & First-Class Functions",
    "vi": "Hàm: Khai Báo, Arrow Functions, Tham Số & First-Class Functions"
  },
  "summary": {
    "en": "Master function declarations vs expressions, arrow functions and lexical this, default parameters, rest parameters, and higher-order function patterns.",
    "vi": "Làm chủ khai báo hàm vs biểu thức hàm, arrow function và lexical this, tham số mặc định, rest parameters và hàm bậc cao (higher-order functions)."
  },
  "estimatedMinutes": 20,
  "topicId": "js_functions_fundamentals",
  "learn": {
    "introduction": {
      "en": "Functions are the primary building blocks of JavaScript applications. In JavaScript, functions are 'First-Class Citizens', meaning they can be assigned to variables, passed as arguments to other functions, and returned from functions. ES6 introduced Arrow Functions (`() => {}`), default parameters, and rest parameters, giving JavaScript a modern, concise, and expressive functional syntax.",
      "vi": "Hàm là khối xây dựng nền tảng của mọi ứng dụng JavaScript. Trong JavaScript, hàm là 'Công dân hạng nhất' (First-Class Citizens), có nghĩa là hàm có thể gán vào biến, truyền làm tham số cho hàm khác và được trả về từ một hàm. ES6 bổ sung Arrow Functions (`() => {}`), tham số mặc định và rest parameters, mang lại cú pháp lập trình hàm hiện đại và gọn gàng."
    },
    "conceptExplanation": {
      "en": "1. Function Declarations vs Expressions: Function declarations (`function name() {}`) are hoisted completely, allowing them to be called before their definition line. Function expressions (`const fn = function() {}`) and arrow functions are NOT hoisted before their assignment.\n\n2. Arrow Functions (`() => {}`): Provide concise syntax with implicit returns for single expressions. Crucially, arrow functions do NOT have their own `this`, `arguments`, or `super` bindings; they inherit `this` lexically from their enclosing scope.\n\n3. Default & Rest Parameters: Default parameters (`function(a, b = 10)`) replace legacy `||` checks. Rest parameters (`function(first, ...rest)`) gather arbitrary trailing arguments into a real JavaScript Array.\n\n4. Higher-Order Functions: Functions that accept other functions as arguments (callbacks) or return new functions (factories/currying).",
      "vi": "1. Khai Báo Hàm (Declaration) vs Biểu Thức Hàm (Expression): Khai báo hàm (`function name() {}`) được hoist toàn bộ, có thể gọi trước dòng định nghĩa. Biểu thức hàm và Arrow Function không thể gọi trước khi gán biến.\n\n2. Arrow Functions (`() => {}`): Cung cấp cú pháp ngắn gọn với return ngầm định cho biểu thức đơn. Đặc biệt, Arrow Function KHÔNG có ngữ cảnh `this`, `arguments` riêng mà kế thừa `this` theo ngữ cảnh tĩnh (lexical this) từ scope bao quanh.\n\n3. Tham Số Mặc Định & Rest Parameters: Tham số mặc định (`function(a, b = 10)`) thay thế cách gán `||` cũ. Rest parameters (`function(first, ...rest)`) gom tất cả đối số còn lại thành một Mảng Array thực sự.\n\n4. Hàm Bậc Cao (Higher-Order Functions): Là các hàm nhận hàm khác làm đối số (callbacks) hoặc trả về một hàm mới (function factories)."
    },
    "syntax": "// 1. Arrow function with implicit return and lexical this\nconst multiply = (a, b) => a * b;\n\n// 2. Default parameters and rest parameters\nfunction formatInvoice(client, taxRate = 0.1, ...items) {\n  const subtotal = items.reduce((sum, item) => sum + item.price, 0);\n  const total = subtotal * (1 + taxRate);\n  return { client, subtotal, total, itemCount: items.length };\n}\n\n// 3. Higher-order function (Function Factory)\nfunction createMultiplier(factor) {\n  return (num) => num * factor;\n}\nconst double = createMultiplier(2);\nconsole.log(double(15)); // 30",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Lexical this in Event Callbacks and Timers",
          "vi": "Ngữ Cảnh Lexical this Trong Timer và Callback"
        },
        "description": {
          "en": "Demonstrates why arrow functions solve the classic `this` loss problem in asynchronous methods.",
          "vi": "Minh họa cách arrow function giải quyết triệt để lỗi mất ngữ cảnh this trong các phương thức bất đồng bộ."
        },
        "code": "class Stopwatch {\n  constructor() {\n    this.seconds = 0;\n    this.timerId = null;\n  }\n\n  start() {\n    // Arrow function preserves 'this' of Stopwatch instance lexically!\n    this.timerId = setInterval(() => {\n      this.seconds++;\n      console.log(`Elapsed: ${this.seconds}s`);\n    }, 1000);\n  }\n\n  stop() {\n    clearInterval(this.timerId);\n  }\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using an arrow function as an object method that requires dynamic `this`.",
          "vi": "Dùng arrow function làm phương thức trong object khi cần truy cập `this` của object đó."
        },
        "correction": {
          "en": "Use standard method shorthand syntax `methodName() {}` instead.",
          "vi": "Sử dụng cú pháp phương thức chuẩn `methodName() {}`."
        }
      }
    ],
    "tips": [
      {
        "en": "Use Rest Parameters (...args) instead of legacy 'arguments' object: `...args` produces a real JavaScript Array with full access to `.map()`, `.filter()`, and `.reduce()`, whereas `arguments` is an array-like object lacking array methods.",
        "vi": "Dùng Rest Parameters (...args) thay cho đối tượng 'arguments' kiểu cũ: `...args` trả về một mảng Array chuẩn có đầy đủ các phương thức `.map()`, `.filter()`, `.reduce()`, trong khi `arguments` chỉ là object dạng mảng thiếu các phương thức xử lý."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_8_1",
      "type": "complete_code",
      "title": {
        "en": "Build a Pipe Function Combinator",
        "vi": "Xây Dựng Hàm Nối Đường Ống Pipe Function"
      },
      "instruction": {
        "en": "Implement a higher-order function `pipe(...fns)` that takes any number of single-argument functions and returns a new function that passes an initial value sequentially through each function from left to right.",
        "vi": "Cài đặt hàm bậc cao `pipe(...fns)` nhận số lượng hàm tùy ý và trả về một hàm mới truyền giá trị ban đầu tuần tự qua từng hàm từ trái sang phải."
      },
      "starterCode": "function pipe(...fns) {\n  // Return piped function\n}\n\nconst add5 = x => x + 5;\nconst double = x => x * 2;\nconst square = x => x * x;\n\nconst compute = pipe(add5, double, square);\nconsole.log(compute(2)); // (2 + 5) * 2 = 14; 14^2 = 196",
      "solutionCode": "function pipe(...fns) {\n  return function(initialValue) {\n    return fns.reduce((acc, fn) => fn(acc), initialValue);\n  };\n}",
      "hint": {
        "en": "Return a function taking initialValue and use fns.reduce((acc, fn) => fn(acc), initialValue).",
        "vi": "Trả về một hàm nhận initialValue và dùng fns.reduce((acc, fn) => fn(acc), initialValue)."
      }
    },
    {
      "id": "js_ex_8_2",
      "type": "complete_code",
      "title": {
        "en": "Function Call Memoizer",
        "vi": "Bộ Nhớ Đệm Kết Quả Hàm (Memoizer)"
      },
      "instruction": {
        "en": "Write a function `memoize(fn)` that wraps a single-argument function with a cache Map, returning cached results for previously seen arguments and computing/caching new ones.",
        "vi": "Viết hàm `memoize(fn)` bọc một hàm nhận một đối số bằng bộ nhớ đệm Map, trả về kết quả đã lưu trong cache nếu đối số từng được gọi và chỉ tính toán/lưu cache khi gặp đối số mới."
      },
      "starterCode": "function memoize(fn) {\n  // Implement memoizer\n}\n\nconst slowSquare = n => { console.log('Computing...'); return n * n; };\nconst fastSquare = memoize(slowSquare);\nconsole.log(fastSquare(5)); // logs Computing..., 25\nconsole.log(fastSquare(5)); // returns 25 immediately without logging",
      "solutionCode": "function memoize(fn) {\n  const cache = new Map();\n  return function(arg) {\n    if (cache.has(arg)) {\n      return cache.get(arg);\n    }\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}",
      "hint": {
        "en": "Store computed outputs in a Map instance within the closure keyed by arg.",
        "vi": "Lưu trữ kết quả đã tính vào một Map bên trong closure với key là arg."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_8",
    "title": {
      "en": "Event Emitter & Middleware Dispatcher",
      "vi": "Bộ Phát Sự Kiện & Điều Phối Middleware Đa Tầng"
    },
    "description": {
      "en": "Create a function `createDispatcher()` that returns an object with methods: `use(middlewareFn)` (registers a middleware function `(context, next) => void`), and `dispatch(context)` (runs registered middlewares in sequential pipeline order, calling each `next()` to advance).",
      "vi": "Xây dựng hàm `createDispatcher()` trả về đối tượng có các phương thức: `use(middlewareFn)` (đăng ký middleware `(context, next) => void`), và `dispatch(context)` (thực thi các middleware theo thứ tự đường ống, gọi `next()` để chuyển sang middleware kế tiếp)."
    },
    "starterCode": "function createDispatcher() {\n  // Implement middleware dispatcher\n}\n\nconst app = createDispatcher();\napp.use((ctx, next) => { ctx.auth = true; next(); });\napp.use((ctx, next) => { ctx.timestamp = Date.now(); next(); });\n\nconst context = {};\napp.dispatch(context);\nconsole.log(context.auth, context.timestamp);",
    "solutionCode": "function createDispatcher() {\n  const middlewares = [];\n\n  return {\n    use(fn) {\n      if (typeof fn === 'function') {\n        middlewares.push(fn);\n      }\n      return this;\n    },\n    dispatch(context) {\n      let index = 0;\n\n      function next() {\n        if (index < middlewares.length) {\n          const currentMiddleware = middlewares[index++];\n          currentMiddleware(context, next);\n        }\n      }\n\n      next();\n      return context;\n    }\n  };\n}",
    "hints": [
      {
        "en": "Maintain an array of middleware functions and write a recursive next() function that steps through the index.",
        "vi": "Duy trì mảng các hàm middleware và viết hàm đệ quy next() để duyệt qua từng chỉ số."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Event Emitter & Middleware Dispatcher according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Phát Sự Kiện & Điều Phối Middleware Đa Tầng theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_8_1",
      "type": "single_choice",
      "question": {
        "en": "How does the `this` keyword behave inside an Arrow Function compared to a standard function declaration?",
        "vi": "Từ khóa `this` bên trong Arrow Function hoạt động như thế nào so với khai báo hàm thông thường?"
      },
      "options": [
        {
          "en": "Arrow functions do not bind their own `this`; they inherit `this` lexically from the surrounding enclosing scope",
          "vi": "Arrow function không tự gán `this` riêng; nó kế thừa `this` theo ngữ cảnh tĩnh (lexical this) từ scope bao quanh"
        },
        {
          "en": "Arrow functions always set `this` to undefined",
          "vi": "Arrow function luôn đặt `this` là undefined"
        },
        {
          "en": "Arrow functions bind `this` dynamically at call time",
          "vi": "Arrow function gán `this` động tại thời điểm gọi hàm"
        },
        {
          "en": "Arrow functions can be used as constructors with `new`",
          "vi": "Arrow function có thể dùng làm constructor với từ khóa `new`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Arrow functions have lexical `this` resolution, preventing the common bug where `this` changes when passed as a callback.",
        "vi": "Arrow function giải quyết `this` theo lexical scope, giúp tránh lỗi phổ biến bị mất ngữ cảnh `this` khi truyền callback."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "js_q_8_2",
      "type": "predict_output",
      "question": {
        "en": "What happens when you call a standard function declaration before its line of code?\n```js\ngreet();\nfunction greet() { console.log('Hello'); }\n```",
        "vi": "Điều gì xảy ra khi bạn gọi hàm khai báo chuẩn trước dòng định nghĩa của nó?\n```js\ngreet();\nfunction greet() { console.log('Hello'); }\n```"
      },
      "options": [
        {
          "en": "Prints 'Hello' (Function declarations are fully hoisted)",
          "vi": "In ra 'Hello' (Khai báo hàm được hoist toàn bộ)"
        },
        {
          "en": "Throws ReferenceError",
          "vi": "Ném lỗi ReferenceError"
        },
        {
          "en": "Throws TypeError: greet is not a function",
          "vi": "Ném lỗi TypeError: greet is not a function"
        },
        {
          "en": "Prints undefined",
          "vi": "In ra undefined"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Function declarations are hoisted with their complete function body during the compilation phase.",
        "vi": "Khai báo hàm (Function declaration) được hoist toàn bộ cả tên lẫn thân hàm trong giai đoạn biên dịch."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "js_q_8_3",
      "type": "predict_output",
      "question": {
        "en": "What happens when calling an arrow function assigned to a `const` before its definition?\n```js\ngreet();\nconst greet = () => { console.log('Hello'); };\n```",
        "vi": "Điều gì xảy ra khi gọi arrow function gán vào `const` trước dòng định nghĩa?\n```js\ngreet();\nconst greet = () => { console.log('Hello'); };\n```"
      },
      "options": [
        {
          "en": "Throws ReferenceError: Cannot access 'greet' before initialization (TDZ)",
          "vi": "Ném lỗi ReferenceError: Cannot access 'greet' before initialization (TDZ)"
        },
        {
          "en": "Prints 'Hello'",
          "vi": "In ra 'Hello'"
        },
        {
          "en": "Prints undefined",
          "vi": "In ra undefined"
        },
        {
          "en": "Executes silently with no output",
          "vi": "Thực thi trong im lặng không có output"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Because `greet` is declared with `const`, it resides in the Temporal Dead Zone prior to evaluation.",
        "vi": "Vì `greet` được khai báo bằng `const`, nó nằm trong Temporal Dead Zone cho tới khi dòng gán được chạy."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "easy"
    },
    {
      "id": "js_q_8_4",
      "type": "single_choice",
      "question": {
        "en": "What does it mean that JavaScript functions are 'First-Class Citizens'?",
        "vi": "Ý nghĩa của việc hàm trong JavaScript là 'Công dân hạng nhất' (First-Class Citizens) là gì?"
      },
      "options": [
        {
          "en": "Functions can be assigned to variables, stored in data structures, passed as arguments, and returned from other functions",
          "vi": "Hàm có thể gán vào biến, lưu trong cấu trúc dữ liệu, truyền làm tham số và được trả về từ hàm khác"
        },
        {
          "en": "Functions execute on dedicated CPU cores",
          "vi": "Hàm chạy trên các nhân CPU chuyên dụng"
        },
        {
          "en": "Functions are compiled to C++",
          "vi": "Hàm được biên dịch sang C++"
        },
        {
          "en": "Functions are guaranteed never to throw errors",
          "vi": "Hàm được đảm bảo không bao giờ ném lỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "First-class status means functions are treated as regular values and can be manipulated like any other object.",
        "vi": "Tính chất first-class nghĩa là hàm được đối xử như các giá trị thông thường, có thể thao tác linh hoạt như bất kỳ đối tượng nào."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_8_5",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output?\n```js\nfunction calculate(a, b = 20) {\n  return a + b;\n}\nconsole.log(calculate(10, undefined));\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nfunction calculate(a, b = 20) {\n  return a + b;\n}\nconsole.log(calculate(10, undefined));\n```"
      },
      "options": [
        {
          "en": "30",
          "vi": "30"
        },
        {
          "en": "NaN",
          "vi": "NaN"
        },
        {
          "en": "10",
          "vi": "10"
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
        "en": "Passing `undefined` triggers the default parameter value `20`, so `10 + 20 = 30`.",
        "vi": "Truyền `undefined` sẽ kích hoạt giá trị tham số mặc định `20`, do đó phép tính là `10 + 20 = 30`."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_8_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output?\n```js\nfunction calculate(a, b = 20) {\n  return a + b;\n}\nconsole.log(calculate(10, null));\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nfunction calculate(a, b = 20) {\n  return a + b;\n}\nconsole.log(calculate(10, null));\n```"
      },
      "options": [
        {
          "en": "10",
          "vi": "10"
        },
        {
          "en": "30",
          "vi": "30"
        },
        {
          "en": "NaN",
          "vi": "NaN"
        },
        {
          "en": "null",
          "vi": "null"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`null` is a valid passed value and does NOT trigger default parameters. `10 + null` coerces `null` to `0`, resulting in `10`.",
        "vi": "`null` là một giá trị hợp lệ được truyền vào nên KHÔNG kích hoạt tham số mặc định. `10 + null` ép null thành 0 nên kết quả là `10`."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_8_7",
      "type": "single_choice",
      "question": {
        "en": "Can an Arrow Function be instantiated with the `new` keyword?",
        "vi": "Arrow Function có thể được khởi tạo bằng từ khóa `new` không?"
      },
      "options": [
        {
          "en": "No, it throws a TypeError: ... is not a constructor",
          "vi": "Không, nó sẽ ném lỗi TypeError: ... is not a constructor"
        },
        {
          "en": "Yes, exactly like standard functions",
          "vi": "Có, hoàn toàn giống hàm thông thường"
        },
        {
          "en": "Only if declared with const",
          "vi": "Chỉ khi khai báo bằng const"
        },
        {
          "en": "Only in Node.js",
          "vi": "Chỉ chạy được trong Node.js"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Arrow functions lack an internal `[[Construct]]` method and prototype property, so they cannot serve as constructors.",
        "vi": "Arrow function không có phương thức nội bộ `[[Construct]]` và không có thuộc tính prototype nên không thể làm hàm tạo."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_8_8",
      "type": "fill_blank",
      "question": {
        "en": "In ES6 function signatures, gathering trailing arguments into an array using `...args` is known as _____ parameters.",
        "vi": "Trong cú pháp hàm ES6, việc gom các đối số còn lại thành một mảng bằng `...args` được gọi là _____ parameters."
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
        "en": "The `...` parameter syntax in function definitions is called Rest Parameters.",
        "vi": "Cú pháp `...` trong định nghĩa hàm được gọi là Rest Parameters."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "rest"
      ]
    },
    {
      "id": "js_q_8_9",
      "type": "single_choice",
      "question": {
        "en": "What is a Higher-Order Function in JavaScript?",
        "vi": "Hàm Bậc Cao (Higher-Order Function) trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "A function that takes one or more functions as arguments, or returns a function as its result",
          "vi": "Một hàm nhận một hoặc nhiều hàm làm đối số, hoặc trả về một hàm làm kết quả"
        },
        {
          "en": "A function with over 10 parameters",
          "vi": "Một hàm có hơn 10 tham số"
        },
        {
          "en": "A function executed at root administrative privileges",
          "vi": "Một hàm chạy dưới quyền quản trị hệ thống"
        },
        {
          "en": "An asynchronous generator function",
          "vi": "Một hàm generator bất đồng bộ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Higher-order functions (like `map`, `filter`, `reduce`, or decorators) treat functions as inputs or outputs.",
        "vi": "Hàm bậc cao (như `map`, `filter`, `reduce` hay decorator) xem hàm như dữ liệu đầu vào hoặc kết quả đầu ra."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "hard"
    },
    {
      "id": "js_q_8_10",
      "type": "single_choice",
      "question": {
        "en": "Why does the concise arrow function `const getObj = () => ({ status: 'ok' });` require parentheses around the object literal?",
        "vi": "Tại sao hàm mũi tên `const getObj = () => ({ status: 'ok' });` lại cần cặp dấu ngoặc đơn bọc ngoài object literal?"
      },
      "options": [
        {
          "en": "Without parentheses, the JS parser interprets `{ ... }` as a function block rather than an object literal expression",
          "vi": "Nếu không có ngoặc đơn, trình phân tích cú pháp JS sẽ hiểu nhầm `{ ... }` là khối thân hàm thay vì đối tượng trả về"
        },
        {
          "en": "Parentheses are mandatory for all arrow functions",
          "vi": "Ngoặc đơn là bắt buộc cho mọi arrow function"
        },
        {
          "en": "To prevent memory leaks",
          "vi": "Để ngăn ngừa rò rỉ bộ nhớ"
        },
        {
          "en": "It is a TypeScript type requirement",
          "vi": "Đó là yêu cầu kiểu của TypeScript"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Wrapping in `({ ... })` disambiguates the curly braces as an expression to return rather than the beginning of a function body block.",
        "vi": "Bọc `({ ... })` giúp phân định rõ ràng dấu ngoặc nhọn là một biểu thức object cần trả về chứ không phải khối lệnh của thân hàm."
      },
      "topicId": "js_functions_fundamentals",
      "difficulty": "hard"
    }
  ]
};
export default lesson08;
