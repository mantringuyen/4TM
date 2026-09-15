import { Lesson } from '../../../../types';

export const lesson13: Lesson = {
  "id": "js_lesson_13",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_3",
  "order": 13,
  "title": {
    "en": "The 'this' Keyword, call(), apply(), bind() & Method Binding",
    "vi": "Từ Khóa 'this', call(), apply(), bind() & Ràng Buộc Phương Thức"
  },
  "summary": {
    "en": "Master JavaScript's 4 binding rules for `this` (Default, Implicit, Explicit, New), method borrowing, and resolving lost `this` contexts with `bind()` and arrow functions.",
    "vi": "Làm chủ 4 quy tắc ràng buộc `this` (Mặc định, Ngầm định, Tường minh, Khởi tạo New), mượn phương thức (method borrowing) và sửa lỗi mất ngữ cảnh bằng `bind()` và arrow function."
  },
  "estimatedMinutes": 22,
  "topicId": "js_this_binding",
  "learn": {
    "introduction": {
      "en": "In JavaScript, `this` is not an author-time lexical binding (like variables); it is an execution-time context established entirely by HOW and WHERE a function is called (the call-site). Understanding the 4 rules of `this` binding, along with the explicit control utilities `call()`, `apply()`, and `bind()`, is critical for architecting object-oriented systems and event-driven architectures.",
      "vi": "Trong JavaScript, `this` không phụ thuộc vào nơi bạn viết hàm (như biến thông thường) mà được xác định hoàn toàn lúc chạy dựa trên CÁCH và NƠI hàm được gọi (call-site). Hiểu rõ 4 quy tắc ràng buộc `this` và các công cụ điều khiển tường minh `call()`, `apply()`, `bind()` là kiến thức bắt buộc để xây dựng hệ thống hướng đối tượng và kiến trúc hướng sự kiện."
    },
    "conceptExplanation": {
      "en": "1. The 4 Rules of `this` Binding (in order of precedence):\n   - Rule 1 (New Binding): When called with `new`, `this` points to the newly constructed object instance.\n   - Rule 2 (Explicit Binding): When invoked with `.call(context, ...args)`, `.apply(context, [args])`, or `.bind(context)`, `this` is explicitly forced to `context`.\n   - Rule 3 (Implicit Binding): When called as an object method `obj.method()`, `this` points to the owning context object (`obj`).\n   - Rule 4 (Default Binding): When invoked standalone `fn()`, `this` is `undefined` in strict mode (or `window`/`global` in non-strict mode).\n\n2. `call` vs `apply` vs `bind`: `.call()` invokes immediately with comma-separated arguments; `.apply()` invokes immediately with an array of arguments; `.bind()` does NOT invoke immediately, but returns a brand-new function with `this` permanently bound.\n\n3. Method Borrowing: Reusing generic prototype methods on foreign objects: `Array.prototype.slice.call(arguments)`.\n\n4. Arrow Functions Exception: Arrow functions completely bypass these 4 rules, adopting `this` lexically from their enclosing scope at creation time.",
      "vi": "1. 4 Quy Tắc Ràng Buộc `this` (Theo thứ tự ưu tiên):\n   - Quy tắc 1 (New Binding): Khi gọi với từ khóa `new`, `this` trỏ tới đối tượng mới được tạo.\n   - Quy tắc 2 (Explicit Binding - Tường minh): Khi gọi qua `.call(context, ...args)`, `.apply(context, [args])`, hoặc `.bind(context)`, `this` bị ép trỏ về `context` chỉ định.\n   - Quy tắc 3 (Implicit Binding - Ngầm định): Khi gọi dạng phương thức `obj.method()`, `this` trỏ vào đối tượng chứa nó (`obj`).\n   - Quy tắc 4 (Default Binding - Mặc định): Khi gọi hàm độc lập `fn()`, `this` là `undefined` trong strict mode (hoặc `window`/`global` ở non-strict).\n\n2. Phân biệt `call`, `apply`, `bind`: `.call()` thực thi ngay với danh sách tham số phân cách bằng dấu phẩy; `.apply()` thực thi ngay với mảng tham số; `.bind()` KHÔNG thực thi ngay mà trả về một hàm mới đã được khóa chặt `this` vĩnh viễn.\n\n3. Mượn Phương Thức (Method Borrowing): Tái sử dụng phương thức từ prototype đối tượng khác.\n\n4. Ngoại Lệ Arrow Function: Arrow function bỏ qua cả 4 quy tắc trên và kế thừa `this` theo lexical scope tại nơi nó được khai báo."
    },
    "syntax": "// 1. Implicit vs Lost Binding\nconst user = {\n  name: \"Alex\",\n  greet() { return `Hello, I am ${this.name}`; }\n};\nconsole.log(user.greet()); // \"Hello, I am Alex\" (Implicit binding)\n\nconst detachedGreet = user.greet;\n// console.log(detachedGreet()); // In strict mode: TypeError (this is undefined!)\n\n// 2. Explicit binding with call, apply, bind\nconst visitor = { name: \"Elena\" };\nconsole.log(user.greet.call(visitor)); // \"Hello, I am Elena\"\n\nconst permanentlyBound = user.greet.bind(visitor);\nconsole.log(permanentlyBound()); // \"Hello, I am Elena\"",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Event Listener Callback Binding & Partial Application",
          "vi": "Ràng Buộc Ngữ Cảnh Callback & Áp Dụng Một Phần Đối Số (Partial Application)"
        },
        "description": {
          "en": "Demonstrates using bind() to preserve class instance state in DOM event handlers and partially apply configurations.",
          "vi": "Minh họa sử dụng bind() để giữ nguyên trạng thái instance của class trong event handler và truyền trước tham số."
        },
        "code": "class UIModal {\n  constructor(modalId, title) {\n    this.modalId = modalId;\n    this.title = title;\n    this.isOpen = false;\n\n    // Fix callback this binding permanently\n    this.handleEscapeKey = this.handleEscapeKey.bind(this);\n  }\n\n  handleEscapeKey(event) {\n    if (event.key === \"Escape\" && this.isOpen) {\n      console.log(`Closing modal ${this.modalId}: ${this.title}`);\n      this.isOpen = false;\n    }\n  }\n\n  open() {\n    this.isOpen = true;\n    console.log(`Opened ${this.title}`);\n  }\n}\n\nconst loginModal = new UIModal(\"m_auth\", \"User Login\");\nloginModal.open();\nloginModal.handleEscapeKey({ key: \"Escape\" }); // Closes safely without losing this!"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Passing an object method directly as an async callback or event listener without binding.",
          "vi": "Truyền trực tiếp phương thức của object làm callback bất đồng bộ mà quên bind `this`."
        },
        "correction": {
          "en": "Use `.bind(this)` or wrap in an arrow function `() => this.method()`.",
          "vi": "Sử dụng `.bind(this)` hoặc bọc trong hàm mũi tên `() => this.method()`."
        }
      }
    ],
    "tips": [
      {
        "en": "Use Arrow Class Properties or constructor binding for reliable method references: In modern classes, binding methods in the constructor or defining methods as arrow properties (`handleClick = () => {}`) prevents runtime `this` disconnection errors.",
        "vi": "Dùng arrow class properties hoặc bind trong constructor để bảo toàn ngữ cảnh: Trong class, bind phương thức trong constructor hoặc định nghĩa bằng arrow property giúp đảm bảo phương thức luôn trỏ đúng instance khi truyền làm callback."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_13_1",
      "type": "complete_code",
      "title": {
        "en": "Implement Function.prototype.myBind Polyfill",
        "vi": "Tự Cài Đặt Polyfill Cho Phương Thức Function.prototype.bind"
      },
      "instruction": {
        "en": "Implement a polyfill function `customBind(fn, context, ...boundArgs)` that returns a new function which, when invoked with `...callArgs`, executes `fn` with `this` set to `context` and all combined arguments `[...boundArgs, ...callArgs]`.",
        "vi": "Cài đặt hàm polyfill `customBind(fn, context, ...boundArgs)` trả về một hàm mới mà khi được gọi với `...callArgs`, sẽ thực thi `fn` với `this` là `context` và toàn bộ danh sách tham số kết hợp `[...boundArgs, ...callArgs]`."
      },
      "starterCode": "function customBind(fn, context, ...boundArgs) {\n  // Implement custom bind\n}\n\nfunction introduce(greeting, punctuation) {\n  return `${greeting}, I am ${this.name}${punctuation}`;\n}\n\nconst person = { name: \"Jessica\" };\nconst boundIntro = customBind(introduce, person, \"Hello\");\nconsole.log(boundIntro(\"!\")); // \"Hello, I am Jessica!\"",
      "solutionCode": "function customBind(fn, context, ...boundArgs) {\n  return function(...callArgs) {\n    return fn.apply(context, [...boundArgs, ...callArgs]);\n  };\n}",
      "hint": {
        "en": "Return a closure function that collects callArgs and delegates to fn.apply(context, [...boundArgs, ...callArgs]).",
        "vi": "Trả về một hàm closure gom callArgs và gọi fn.apply(context, [...boundArgs, ...callArgs])."
      }
    },
    {
      "id": "js_ex_13_2",
      "type": "complete_code",
      "title": {
        "en": "Dynamic Method Borrowing Aggregator",
        "vi": "Mượn Phương Thức Tính Toán Đa Năng Bằng .call và .apply"
      },
      "instruction": {
        "en": "Write a function `borrowCompute(calculatorObj, methodName, targetData, ...extraArgs)` that uses `call` or `apply` to invoke `calculatorObj[methodName]` on `targetData` as `this`, passing `...extraArgs`.",
        "vi": "Viết hàm `borrowCompute(calculatorObj, methodName, targetData, ...extraArgs)` dùng `call` hoặc `apply` để thực thi phương thức `calculatorObj[methodName]` với ngữ cảnh `this` là `targetData` và truyền các tham số `...extraArgs`."
      },
      "starterCode": "function borrowCompute(calculatorObj, methodName, targetData, ...extraArgs) {\n  // Borrow and execute method\n}\n\nconst taxCalculator = {\n  calculateTotal(rate, flatFee) {\n    return this.subtotal * (1 + rate) + flatFee;\n  }\n};\n\nconst myOrder = { subtotal: 100 };\nconsole.log(borrowCompute(taxCalculator, \"calculateTotal\", myOrder, 0.1, 5)); // 115",
      "solutionCode": "function borrowCompute(calculatorObj, methodName, targetData, ...extraArgs) {\n  const method = calculatorObj[methodName];\n  if (typeof method !== 'function') {\n    throw new TypeError(`Method ${methodName} not found on calculator`);\n  }\n  return method.apply(targetData, extraArgs);\n}",
      "hint": {
        "en": "Retrieve method from calculatorObj and invoke method.apply(targetData, extraArgs).",
        "vi": "Lấy method từ calculatorObj và gọi method.apply(targetData, extraArgs)."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_13",
    "title": {
      "en": "Dynamic Proxy Context Method Interceptor",
      "vi": "Bộ Đánh Chặn & Tự Động Bind Ngữ Cảnh Phương Thức (Auto-Binder Proxy)"
    },
    "description": {
      "en": "Create a function `autoBind(instance)` that wraps an object or class instance so that any function property accessed on it is automatically and permanently bound to `instance`, preventing `this` loss even when methods are destructured or passed as callbacks.",
      "vi": "Xây dựng hàm `autoBind(instance)` bọc một đối tượng hoặc instance của class sao cho bất kỳ phương thức nào khi được truy cập sẽ tự động được bind vĩnh viễn vào `instance`, ngăn chặn lỗi mất `this` ngay cả khi bóc tách hàm hoặc truyền làm callback."
    },
    "starterCode": "function autoBind(instance) {\n  // Implement auto-binding proxy or prototype binder\n}\n\nclass Counter {\n  constructor() { this.val = 10; }\n  inc() { return ++this.val; }\n}\n\nconst c = autoBind(new Counter());\nconst { inc } = c;\nconsole.log(inc()); // Should return 11 without losing this!",
    "solutionCode": "function autoBind(instance) {\n  return new Proxy(instance, {\n    get(target, prop, receiver) {\n      const value = Reflect.get(target, prop, receiver);\n      if (typeof value === 'function') {\n        return value.bind(target);\n      }\n      return value;\n    }\n  });\n}",
    "hints": [
      {
        "en": "Use JavaScript Proxy to intercept property get requests. If the property is a function, return value.bind(target).",
        "vi": "Dùng JavaScript Proxy để chặn thao tác get thuộc tính. Nếu giá trị là hàm, trả về value.bind(target)."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Dynamic Proxy Context Method Interceptor according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Đánh Chặn & Tự Động Bind Ngữ Cảnh Phương Thức (Auto-Binder Proxy) theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_13_1",
      "type": "single_choice",
      "question": {
        "en": "What determines the value of `this` inside a standard JavaScript function at runtime?",
        "vi": "Yếu tố nào quyết định giá trị của `this` trong một hàm JavaScript thông thường tại thời điểm chạy?"
      },
      "options": [
        {
          "en": "How and where the function is invoked (the call-site)",
          "vi": "Cách thức và vị trí hàm được gọi (call-site)"
        },
        {
          "en": "Where the function was declared in source code",
          "vi": "Vị trí hàm được khai báo trong mã nguồn"
        },
        {
          "en": "The number of parameters declared",
          "vi": "Số lượng tham số được khai báo"
        },
        {
          "en": "Whether the function is named or anonymous",
          "vi": "Hàm có tên hay là hàm ẩn danh"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Standard function `this` is dynamically bound at the call-site when the function is executed.",
        "vi": "`this` trong hàm chuẩn được gán động tại thời điểm và ngữ cảnh mà hàm được gọi (call-site)."
      },
      "topicId": "js_this_binding",
      "difficulty": "easy"
    },
    {
      "id": "js_q_13_2",
      "type": "predict_output",
      "question": {
        "en": "What will this code log in strict mode?\n```js\n'use strict';\nfunction show() { console.log(this); }\nshow();\n```",
        "vi": "Đoạn mã sau sẽ in ra gì trong strict mode?\n```js\n'use strict';\nfunction show() { console.log(this); }\nshow();\n```"
      },
      "options": [
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "window / global object",
          "vi": "đối tượng window / global"
        },
        {
          "en": "TypeError",
          "vi": "TypeError"
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
        "en": "Under strict mode, Default Binding resolves standalone function calls to `undefined` rather than the global object.",
        "vi": "Trong strict mode, quy tắc Default Binding gán `this` của hàm độc lập là `undefined` thay vì đối tượng toàn cục window/global."
      },
      "topicId": "js_this_binding",
      "difficulty": "easy"
    },
    {
      "id": "js_q_13_3",
      "type": "single_choice",
      "question": {
        "en": "What is the key difference between `Function.prototype.call` and `Function.prototype.apply`?",
        "vi": "Điểm khác biệt cốt lõi giữa `Function.prototype.call` và `Function.prototype.apply` là gì?"
      },
      "options": [
        {
          "en": "`.call()` accepts arguments as a comma-separated list; `.apply()` accepts arguments as a single array",
          "vi": "`.call()` nhận danh sách đối số phân cách bằng dấu phẩy; `.apply()` nhận đối số dưới dạng một mảng duy nhất"
        },
        {
          "en": "`.apply()` returns a Promise while `.call()` is synchronous",
          "vi": "`.apply()` trả về Promise còn `.call()` là đồng bộ"
        },
        {
          "en": "`.call()` is deprecated",
          "vi": "`.call()` đã bị lỗi thời"
        },
        {
          "en": "`.apply()` only works with Arrow Functions",
          "vi": "`.apply()` chỉ hoạt động với Arrow Functions"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Both invoke the function immediately with explicit `this`. `.call(ctx, arg1, arg2)` takes separate arguments, whereas `.apply(ctx, [arg1, arg2])` takes an array.",
        "vi": "Cả hai đều thực thi hàm ngay với `this` chỉ định. `.call(ctx, arg1, arg2)` nhận các đối số riêng rẽ, còn `.apply(ctx, [arg1, arg2])` nhận một mảng đối số."
      },
      "topicId": "js_this_binding",
      "difficulty": "easy"
    },
    {
      "id": "js_q_13_4",
      "type": "predict_output",
      "question": {
        "en": "What does `Function.prototype.bind` do?",
        "vi": "Phương thức `Function.prototype.bind` thực hiện điều gì?"
      },
      "options": [
        {
          "en": "It returns a new target function with `this` permanently set to the provided context and optional prepended arguments",
          "vi": "Nó trả về một hàm mới với `this` được khóa chặt vĩnh viễn vào context chỉ định cùng các đối số truyền trước tùy chọn"
        },
        {
          "en": "It executes the function immediately and returns its value",
          "vi": "Nó thực thi hàm ngay lập tức và trả về giá trị của hàm"
        },
        {
          "en": "It deletes the prototype of the function",
          "vi": "Nó xóa prototype của hàm"
        },
        {
          "en": "It converts the function to WebAssembly",
          "vi": "Nó biên dịch hàm sang WebAssembly"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.bind()` creates a new bound function wrapping the original, guaranteeing `this` cannot be overridden at subsequent call-sites.",
        "vi": "`.bind()` tạo ra một hàm mới bọc hàm ban đầu, đảm bảo `this` không bao giờ bị ghi đè ở các lần gọi sau."
      },
      "topicId": "js_this_binding",
      "difficulty": "medium"
    },
    {
      "id": "js_q_13_5",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output?\n```js\nconst obj = {\n  num: 42,\n  getNum: () => this.num\n};\nconsole.log(obj.getNum());\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nconst obj = {\n  num: 42,\n  getNum: () => this.num\n};\nconsole.log(obj.getNum());\n```"
      },
      "options": [
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "42",
          "vi": "42"
        },
        {
          "en": "TypeError",
          "vi": "TypeError"
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
        "en": "Object literals `{ ... }` do NOT create a lexical scope. The arrow function captures `this` from outer scope (window/global/module), where `num` is undefined.",
        "vi": "Khối object literal `{ ... }` KHÔNG tạo lexical scope. Arrow function kế thừa `this` từ scope ngoài bao quanh nó (nơi không có biến `num`), nên trả về `undefined`."
      },
      "topicId": "js_this_binding",
      "difficulty": "medium"
    },
    {
      "id": "js_q_13_6",
      "type": "single_choice",
      "question": {
        "en": "Which rule of `this` binding has the highest precedence in JavaScript?",
        "vi": "Quy tắc ràng buộc `this` nào có độ ưu tiên cao nhất trong JavaScript?"
      },
      "options": [
        {
          "en": "New Binding (constructor invocation with `new`)",
          "vi": "New Binding (khởi tạo đối tượng bằng từ khóa `new`)"
        },
        {
          "en": "Explicit Binding (`call` / `apply` / `bind`)",
          "vi": "Explicit Binding (`call` / `apply` / `bind`)"
        },
        {
          "en": "Implicit Binding (`obj.method()`)",
          "vi": "Implicit Binding (`obj.method()`)"
        },
        {
          "en": "Default Binding (`fn()`)",
          "vi": "Default Binding (`fn()`)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`new` binding overrides explicit binding (except hard-bound functions without prototype), implicit binding, and default binding.",
        "vi": "Toán tử `new` có độ ưu tiên cao nhất, ghi đè cả explicit binding, implicit binding và default binding."
      },
      "topicId": "js_this_binding",
      "difficulty": "medium"
    },
    {
      "id": "js_q_13_7",
      "type": "fill_blank",
      "question": {
        "en": "To invoke a function with an array of arguments and an explicit context, use fn._____ (context, [args]).",
        "vi": "Để thực thi một hàm với một mảng các đối số và ngữ cảnh chỉ định, dùng fn._____ (context, [args])."
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
        "en": "`fn.apply(context, [argArray])` passes an array of arguments to the target function.",
        "vi": "`fn.apply(context, [argArray])` truyền một mảng đối số vào hàm mục tiêu."
      },
      "topicId": "js_this_binding",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "apply"
      ]
    },
    {
      "id": "js_q_13_8",
      "type": "predict_output",
      "question": {
        "en": "What is printed when `Math.max.apply(null, [10, 50, 20])` is called?",
        "vi": "Kết quả in ra khi gọi `Math.max.apply(null, [10, 50, 20])` là gì?"
      },
      "options": [
        {
          "en": "50",
          "vi": "50"
        },
        {
          "en": "NaN",
          "vi": "NaN"
        },
        {
          "en": "[10, 50, 20]",
          "vi": "[10, 50, 20]"
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
        "en": "`.apply(null, [10, 50, 20])` spreads the array as individual arguments to `Math.max(10, 50, 20)`, returning 50.",
        "vi": "`.apply(null, [10, 50, 20])` trải mảng thành các đối số riêng rẽ cho `Math.max(10, 50, 20)`, trả về giá trị lớn nhất là 50."
      },
      "topicId": "js_this_binding",
      "difficulty": "hard"
    },
    {
      "id": "js_q_13_9",
      "type": "single_choice",
      "question": {
        "en": "What is 'Method Borrowing' in JavaScript?",
        "vi": "Kỹ thuật 'Mượn Phương Thức' (Method Borrowing) trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "Invoking a method from one object or prototype on a different target object using `.call()` or `.apply()`",
          "vi": "Thực thi phương thức của một đối tượng hoặc prototype trên một đối tượng mục tiêu khác bằng `.call()` hoặc `.apply()`"
        },
        {
          "en": "Importing modules from npm",
          "vi": "Import thư viện từ npm"
        },
        {
          "en": "Cloning objects with structuredClone",
          "vi": "Sao chép object bằng structuredClone"
        },
        {
          "en": "Inheriting classes with the extends keyword",
          "vi": "Kế thừa class bằng từ khóa extends"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Method borrowing allows an object to use another object's method without inheriting or copying it.",
        "vi": "Method borrowing cho phép một đối tượng sử dụng phương thức của đối tượng khác mà không cần kế thừa trực tiếp."
      },
      "topicId": "js_this_binding",
      "difficulty": "hard"
    },
    {
      "id": "js_q_13_10",
      "type": "single_choice",
      "question": {
        "en": "Why does `setTimeout(user.login, 1000)` fail to authenticate if `login` relies on `this.username`?",
        "vi": "Tại sao `setTimeout(user.login, 1000)` lại thất bại nếu phương thức `login` phụ thuộc vào `this.username`?"
      },
      "options": [
        {
          "en": "Passing `user.login` passes the raw function reference; when the timer executes, it invokes the function standalone without `user.` context, so `this` is undefined",
          "vi": "Truyền `user.login` chỉ truyền tham chiếu hàm thô; khi bộ đếm thời gian kích hoạt, hàm được gọi độc lập không có ngữ cảnh `user.`, nên `this` bị undefined"
        },
        {
          "en": "setTimeout is blocked by CORS",
          "vi": "setTimeout bị chặn bởi chính sách CORS"
        },
        {
          "en": "Timers only accept strings",
          "vi": "Bộ đếm thời gian chỉ nhận chuỗi"
        },
        {
          "en": "Because passwords expire after 1000ms",
          "vi": "Vì mật khẩu hết hạn sau 1000ms"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The callback invocation site is disconnected from the original object. Fix by using `setTimeout(() => user.login(), 1000)` or `setTimeout(user.login.bind(user), 1000)`.",
        "vi": "Điểm gọi callback bị tách rời khỏi object gốc. Sửa bằng cách dùng `setTimeout(() => user.login(), 1000)` hoặc `user.login.bind(user)`."
      },
      "topicId": "js_this_binding",
      "difficulty": "hard"
    }
  ]
};
export default lesson13;
