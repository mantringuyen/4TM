import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/intermediate/module01');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 13 ---
const lesson13: Lesson = {
  id: "js_lesson_13",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_3",
  order: 13,
  title: {
    en: "The 'this' Keyword, call(), apply(), bind() & Method Binding",
    vi: "Từ Khóa 'this', call(), apply(), bind() & Ràng Buộc Phương Thức"
  },
  summary: {
    en: "Master JavaScript's 4 binding rules for `this` (Default, Implicit, Explicit, New), method borrowing, and resolving lost `this` contexts with `bind()` and arrow functions.",
    vi: "Làm chủ 4 quy tắc ràng buộc `this` (Mặc định, Ngầm định, Tường minh, Khởi tạo New), mượn phương thức (method borrowing) và sửa lỗi mất ngữ cảnh bằng `bind()` và arrow function."
  },
  estimatedMinutes: 22,
  topicId: "js_this_binding",
  learn: {
    introduction: {
      en: "In JavaScript, `this` is not an author-time lexical binding (like variables); it is an execution-time context established entirely by HOW and WHERE a function is called (the call-site). Understanding the 4 rules of `this` binding, along with the explicit control utilities `call()`, `apply()`, and `bind()`, is critical for architecting object-oriented systems and event-driven architectures.",
      vi: "Trong JavaScript, `this` không phụ thuộc vào nơi bạn viết hàm (như biến thông thường) mà được xác định hoàn toàn lúc chạy dựa trên CÁCH và NƠI hàm được gọi (call-site). Hiểu rõ 4 quy tắc ràng buộc `this` và các công cụ điều khiển tường minh `call()`, `apply()`, `bind()` là kiến thức bắt buộc để xây dựng hệ thống hướng đối tượng và kiến trúc hướng sự kiện."
    },
    conceptExplanation: {
      en: "1. The 4 Rules of `this` Binding (in order of precedence):\n   - Rule 1 (New Binding): When called with `new`, `this` points to the newly constructed object instance.\n   - Rule 2 (Explicit Binding): When invoked with `.call(context, ...args)`, `.apply(context, [args])`, or `.bind(context)`, `this` is explicitly forced to `context`.\n   - Rule 3 (Implicit Binding): When called as an object method `obj.method()`, `this` points to the owning context object (`obj`).\n   - Rule 4 (Default Binding): When invoked standalone `fn()`, `this` is `undefined` in strict mode (or `window`/`global` in non-strict mode).\n\n2. `call` vs `apply` vs `bind`: `.call()` invokes immediately with comma-separated arguments; `.apply()` invokes immediately with an array of arguments; `.bind()` does NOT invoke immediately, but returns a brand-new function with `this` permanently bound.\n\n3. Method Borrowing: Reusing generic prototype methods on foreign objects: `Array.prototype.slice.call(arguments)`.\n\n4. Arrow Functions Exception: Arrow functions completely bypass these 4 rules, adopting `this` lexically from their enclosing scope at creation time.",
      vi: "1. 4 Quy Tắc Ràng Buộc `this` (Theo thứ tự ưu tiên):\n   - Quy tắc 1 (New Binding): Khi gọi với từ khóa `new`, `this` trỏ tới đối tượng mới được tạo.\n   - Quy tắc 2 (Explicit Binding - Tường minh): Khi gọi qua `.call(context, ...args)`, `.apply(context, [args])`, hoặc `.bind(context)`, `this` bị ép trỏ về `context` chỉ định.\n   - Quy tắc 3 (Implicit Binding - Ngầm định): Khi gọi dạng phương thức `obj.method()`, `this` trỏ vào đối tượng chứa nó (`obj`).\n   - Quy tắc 4 (Default Binding - Mặc định): Khi gọi hàm độc lập `fn()`, `this` là `undefined` trong strict mode (hoặc `window`/`global` ở non-strict).\n\n2. Phân biệt `call`, `apply`, `bind`: `.call()` thực thi ngay với danh sách tham số phân cách bằng dấu phẩy; `.apply()` thực thi ngay với mảng tham số; `.bind()` KHÔNG thực thi ngay mà trả về một hàm mới đã được khóa chặt `this` vĩnh viễn.\n\n3. Mượn Phương Thức (Method Borrowing): Tái sử dụng phương thức từ prototype đối tượng khác.\n\n4. Ngoại Lệ Arrow Function: Arrow function bỏ qua cả 4 quy tắc trên và kế thừa `this` theo lexical scope tại nơi nó được khai báo."
    },
    syntax: `// 1. Implicit vs Lost Binding
const user = {
  name: "Alex",
  greet() { return \`Hello, I am \${this.name}\`; }
};
console.log(user.greet()); // "Hello, I am Alex" (Implicit binding)

const detachedGreet = user.greet;
// console.log(detachedGreet()); // In strict mode: TypeError (this is undefined!)

// 2. Explicit binding with call, apply, bind
const visitor = { name: "Elena" };
console.log(user.greet.call(visitor)); // "Hello, I am Elena"

const permanentlyBound = user.greet.bind(visitor);
console.log(permanentlyBound()); // "Hello, I am Elena"`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Event Listener Callback Binding & Partial Application",
          vi: "Ràng Buộc Ngữ Cảnh Callback & Áp Dụng Một Phần Đối Số (Partial Application)"
        },
        description: {
          en: "Demonstrates using bind() to preserve class instance state in DOM event handlers and partially apply configurations.",
          vi: "Minh họa sử dụng bind() để giữ nguyên trạng thái instance của class trong event handler và truyền trước tham số."
        },
        code: `class UIModal {
  constructor(modalId, title) {
    this.modalId = modalId;
    this.title = title;
    this.isOpen = false;

    // Fix callback this binding permanently
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  handleEscapeKey(event) {
    if (event.key === "Escape" && this.isOpen) {
      console.log(\`Closing modal \${this.modalId}: \${this.title}\`);
      this.isOpen = false;
    }
  }

  open() {
    this.isOpen = true;
    console.log(\`Opened \${this.title}\`);
  }
}

const loginModal = new UIModal("m_auth", "User Login");
loginModal.open();
loginModal.handleEscapeKey({ key: "Escape" }); // Closes safely without losing this!`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Passing an object method directly as an async callback or event listener without binding.",
          vi: "Truyền trực tiếp phương thức của object làm callback bất đồng bộ mà quên bind `this`."
        },
        correction: {
          en: "Use `.bind(this)` or wrap in an arrow function `() => this.method()`.",
          vi: "Sử dụng `.bind(this)` hoặc bọc trong hàm mũi tên `() => this.method()`."
        },
        explanation: {
          en: "Passing `setTimeout(obj.method, 1000)` detaches the method from its object, causing it to be called as a standalone function with `this === undefined`.",
          vi: "Truyền `setTimeout(obj.method, 1000)` làm tách rời phương thức khỏi object sở hữu, khiến nó bị gọi như hàm độc lập và `this === undefined`."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use Arrow Class Properties or constructor binding for reliable method references",
          vi: "Dùng arrow class properties hoặc bind trong constructor để bảo toàn ngữ cảnh"
        },
        description: {
          en: "In modern classes, binding methods in the constructor or defining methods as arrow properties (`handleClick = () => {}`) prevents runtime `this` disconnection errors.",
          vi: "Trong class, bind phương thức trong constructor hoặc định nghĩa bằng arrow property giúp đảm bảo phương thức luôn trỏ đúng instance khi truyền làm callback."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_13_1",
      title: {
        en: "Implement Function.prototype.myBind Polyfill",
        vi: "Tự Cài Đặt Polyfill Cho Phương Thức Function.prototype.bind"
      },
      instruction: {
        en: "Implement a polyfill function `customBind(fn, context, ...boundArgs)` that returns a new function which, when invoked with `...callArgs`, executes `fn` with `this` set to `context` and all combined arguments `[...boundArgs, ...callArgs]`.",
        vi: "Cài đặt hàm polyfill `customBind(fn, context, ...boundArgs)` trả về một hàm mới mà khi được gọi với `...callArgs`, sẽ thực thi `fn` với `this` là `context` và toàn bộ danh sách tham số kết hợp `[...boundArgs, ...callArgs]`."
      },
      starterCode: `function customBind(fn, context, ...boundArgs) {
  // Implement custom bind
}

function introduce(greeting, punctuation) {
  return \`\${greeting}, I am \${this.name}\${punctuation}\`;
}

const person = { name: "Jessica" };
const boundIntro = customBind(introduce, person, "Hello");
console.log(boundIntro("!")); // "Hello, I am Jessica!"`,
      solutionCode: `function customBind(fn, context, ...boundArgs) {
  return function(...callArgs) {
    return fn.apply(context, [...boundArgs, ...callArgs]);
  };
}`,
      hints: [
        {
          en: "Return a closure function that collects callArgs and delegates to fn.apply(context, [...boundArgs, ...callArgs]).",
          vi: "Trả về một hàm closure gom callArgs và gọi fn.apply(context, [...boundArgs, ...callArgs])."
        }
      ]
    },
    {
      id: "js_ex_13_2",
      title: {
        en: "Dynamic Method Borrowing Aggregator",
        vi: "Mượn Phương Thức Tính Toán Đa Năng Bằng .call và .apply"
      },
      instruction: {
        en: "Write a function `borrowCompute(calculatorObj, methodName, targetData, ...extraArgs)` that uses `call` or `apply` to invoke `calculatorObj[methodName]` on `targetData` as `this`, passing `...extraArgs`.",
        vi: "Viết hàm `borrowCompute(calculatorObj, methodName, targetData, ...extraArgs)` dùng `call` hoặc `apply` để thực thi phương thức `calculatorObj[methodName]` với ngữ cảnh `this` là `targetData` và truyền các tham số `...extraArgs`."
      },
      starterCode: `function borrowCompute(calculatorObj, methodName, targetData, ...extraArgs) {
  // Borrow and execute method
}

const taxCalculator = {
  calculateTotal(rate, flatFee) {
    return this.subtotal * (1 + rate) + flatFee;
  }
};

const myOrder = { subtotal: 100 };
console.log(borrowCompute(taxCalculator, "calculateTotal", myOrder, 0.1, 5)); // 115`,
      solutionCode: `function borrowCompute(calculatorObj, methodName, targetData, ...extraArgs) {
  const method = calculatorObj[methodName];
  if (typeof method !== 'function') {
    throw new TypeError(\`Method \${methodName} not found on calculator\`);
  }
  return method.apply(targetData, extraArgs);
}`,
      hints: [
        {
          en: "Retrieve method from calculatorObj and invoke method.apply(targetData, extraArgs).",
          vi: "Lấy method từ calculatorObj và gọi method.apply(targetData, extraArgs)."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_13",
    title: {
      en: "Dynamic Proxy Context Method Interceptor",
      vi: "Bộ Đánh Chặn & Tự Động Bind Ngữ Cảnh Phương Thức (Auto-Binder Proxy)"
    },
    description: {
      en: "Create a function `autoBind(instance)` that wraps an object or class instance so that any function property accessed on it is automatically and permanently bound to `instance`, preventing `this` loss even when methods are destructured or passed as callbacks.",
      vi: "Xây dựng hàm `autoBind(instance)` bọc một đối tượng hoặc instance của class sao cho bất kỳ phương thức nào khi được truy cập sẽ tự động được bind vĩnh viễn vào `instance`, ngăn chặn lỗi mất `this` ngay cả khi bóc tách hàm hoặc truyền làm callback."
    },
    starterCode: `function autoBind(instance) {
  // Implement auto-binding proxy or prototype binder
}

class Counter {
  constructor() { this.val = 10; }
  inc() { return ++this.val; }
}

const c = autoBind(new Counter());
const { inc } = c;
console.log(inc()); // Should return 11 without losing this!`,
    solutionCode: `function autoBind(instance) {
  return new Proxy(instance, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof value === 'function') {
        return value.bind(target);
      }
      return value;
    }
  });
}`,
    hints: [
      {
        en: "Use JavaScript Proxy to intercept property get requests. If the property is a function, return value.bind(target).",
        vi: "Dùng JavaScript Proxy để chặn thao tác get thuộc tính. Nếu giá trị là hàm, trả về value.bind(target)."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_13_1",
      type: "single_choice",
      question: {
        en: "What determines the value of `this` inside a standard JavaScript function at runtime?",
        vi: "Yếu tố nào quyết định giá trị của `this` trong một hàm JavaScript thông thường tại thời điểm chạy?"
      },
      options: [
        { id: "a", text: { en: "How and where the function is invoked (the call-site)", vi: "Cách thức và vị trí hàm được gọi (call-site)" } },
        { id: "b", text: { en: "Where the function was declared in source code", vi: "Vị trí hàm được khai báo trong mã nguồn" } },
        { id: "c", text: { en: "The number of parameters declared", vi: "Số lượng tham số được khai báo" } },
        { id: "d", text: { en: "Whether the function is named or anonymous", vi: "Hàm có tên hay là hàm ẩn danh" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Standard function `this` is dynamically bound at the call-site when the function is executed.",
        vi: "`this` trong hàm chuẩn được gán động tại thời điểm và ngữ cảnh mà hàm được gọi (call-site)."
      }
    },
    {
      id: "js_q_13_2",
      type: "predict_output",
      question: {
        en: "What will this code log in strict mode?\n```js\n'use strict';\nfunction show() { console.log(this); }\nshow();\n```",
        vi: "Đoạn mã sau sẽ in ra gì trong strict mode?\n```js\n'use strict';\nfunction show() { console.log(this); }\nshow();\n```"
      },
      options: [
        { id: "a", text: { en: "undefined", vi: "undefined" } },
        { id: "b", text: { en: "window / global object", vi: "đối tượng window / global" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "null", vi: "null" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Under strict mode, Default Binding resolves standalone function calls to `undefined` rather than the global object.",
        vi: "Trong strict mode, quy tắc Default Binding gán `this` của hàm độc lập là `undefined` thay vì đối tượng toàn cục window/global."
      }
    },
    {
      id: "js_q_13_3",
      type: "single_choice",
      question: {
        en: "What is the key difference between `Function.prototype.call` and `Function.prototype.apply`?",
        vi: "Điểm khác biệt cốt lõi giữa `Function.prototype.call` và `Function.prototype.apply` là gì?"
      },
      options: [
        { id: "a", text: { en: "`.call()` accepts arguments as a comma-separated list; `.apply()` accepts arguments as a single array", vi: "`.call()` nhận danh sách đối số phân cách bằng dấu phẩy; `.apply()` nhận đối số dưới dạng một mảng duy nhất" } },
        { id: "b", text: { en: "`.apply()` returns a Promise while `.call()` is synchronous", vi: "`.apply()` trả về Promise còn `.call()` là đồng bộ" } },
        { id: "c", text: { en: "`.call()` is deprecated", vi: "`.call()` đã bị lỗi thời" } },
        { id: "d", text: { en: "`.apply()` only works with Arrow Functions", vi: "`.apply()` chỉ hoạt động với Arrow Functions" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Both invoke the function immediately with explicit `this`. `.call(ctx, arg1, arg2)` takes separate arguments, whereas `.apply(ctx, [arg1, arg2])` takes an array.",
        vi: "Cả hai đều thực thi hàm ngay với `this` chỉ định. `.call(ctx, arg1, arg2)` nhận các đối số riêng rẽ, còn `.apply(ctx, [arg1, arg2])` nhận một mảng đối số."
      }
    },
    {
      id: "js_q_13_4",
      type: "predict_output",
      question: {
        en: "What does `Function.prototype.bind` do?",
        vi: "Phương thức `Function.prototype.bind` thực hiện điều gì?"
      },
      options: [
        { id: "a", text: { en: "It returns a new target function with `this` permanently set to the provided context and optional prepended arguments", vi: "Nó trả về một hàm mới với `this` được khóa chặt vĩnh viễn vào context chỉ định cùng các đối số truyền trước tùy chọn" } },
        { id: "b", text: { en: "It executes the function immediately and returns its value", vi: "Nó thực thi hàm ngay lập tức và trả về giá trị của hàm" } },
        { id: "c", text: { en: "It deletes the prototype of the function", vi: "Nó xóa prototype của hàm" } },
        { id: "d", text: { en: "It converts the function to WebAssembly", vi: "Nó biên dịch hàm sang WebAssembly" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.bind()` creates a new bound function wrapping the original, guaranteeing `this` cannot be overridden at subsequent call-sites.",
        vi: "`.bind()` tạo ra một hàm mới bọc hàm ban đầu, đảm bảo `this` không bao giờ bị ghi đè ở các lần gọi sau."
      }
    },
    {
      id: "js_q_13_5",
      type: "predict_output",
      question: {
        en: "What will `console.log` output?\n```js\nconst obj = {\n  num: 42,\n  getNum: () => this.num\n};\nconsole.log(obj.getNum());\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nconst obj = {\n  num: 42,\n  getNum: () => this.num\n};\nconsole.log(obj.getNum());\n```"
      },
      options: [
        { id: "a", text: { en: "undefined", vi: "undefined" } },
        { id: "b", text: { en: "42", vi: "42" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "null", vi: "null" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Object literals `{ ... }` do NOT create a lexical scope. The arrow function captures `this` from outer scope (window/global/module), where `num` is undefined.",
        vi: "Khối object literal `{ ... }` KHÔNG tạo lexical scope. Arrow function kế thừa `this` từ scope ngoài bao quanh nó (nơi không có biến `num`), nên trả về `undefined`."
      }
    },
    {
      id: "js_q_13_6",
      type: "single_choice",
      question: {
        en: "Which rule of `this` binding has the highest precedence in JavaScript?",
        vi: "Quy tắc ràng buộc `this` nào có độ ưu tiên cao nhất trong JavaScript?"
      },
      options: [
        { id: "a", text: { en: "New Binding (constructor invocation with `new`)", vi: "New Binding (khởi tạo đối tượng bằng từ khóa `new`)" } },
        { id: "b", text: { en: "Explicit Binding (`call` / `apply` / `bind`)", vi: "Explicit Binding (`call` / `apply` / `bind`)" } },
        { id: "c", text: { en: "Implicit Binding (`obj.method()`)", vi: "Implicit Binding (`obj.method()`)" } },
        { id: "d", text: { en: "Default Binding (`fn()`)", vi: "Default Binding (`fn()`)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`new` binding overrides explicit binding (except hard-bound functions without prototype), implicit binding, and default binding.",
        vi: "Toán tử `new` có độ ưu tiên cao nhất, ghi đè cả explicit binding, implicit binding và default binding."
      }
    },
    {
      id: "js_q_13_7",
      type: "fill_blank",
      question: {
        en: "To invoke a function with an array of arguments and an explicit context, use fn._____ (context, [args]).",
        vi: "Để thực thi một hàm với một mảng các đối số và ngữ cảnh chỉ định, dùng fn._____ (context, [args])."
      },
      correctAnswer: "apply",
      explanation: {
        en: "`fn.apply(context, [argArray])` passes an array of arguments to the target function.",
        vi: "`fn.apply(context, [argArray])` truyền một mảng đối số vào hàm mục tiêu."
      }
    },
    {
      id: "js_q_13_8",
      type: "predict_output",
      question: {
        en: "What is printed when `Math.max.apply(null, [10, 50, 20])` is called?",
        vi: "Kết quả in ra khi gọi `Math.max.apply(null, [10, 50, 20])` là gì?"
      },
      options: [
        { id: "a", text: { en: "50", vi: "50" } },
        { id: "b", text: { en: "NaN", vi: "NaN" } },
        { id: "c", text: { en: "[10, 50, 20]", vi: "[10, 50, 20]" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.apply(null, [10, 50, 20])` spreads the array as individual arguments to `Math.max(10, 50, 20)`, returning 50.",
        vi: "`.apply(null, [10, 50, 20])` trải mảng thành các đối số riêng rẽ cho `Math.max(10, 50, 20)`, trả về giá trị lớn nhất là 50."
      }
    },
    {
      id: "js_q_13_9",
      type: "single_choice",
      question: {
        en: "What is 'Method Borrowing' in JavaScript?",
        vi: "Kỹ thuật 'Mượn Phương Thức' (Method Borrowing) trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "Invoking a method from one object or prototype on a different target object using `.call()` or `.apply()`", vi: "Thực thi phương thức của một đối tượng hoặc prototype trên một đối tượng mục tiêu khác bằng `.call()` hoặc `.apply()`" } },
        { id: "b", text: { en: "Importing modules from npm", vi: "Import thư viện từ npm" } },
        { id: "c", text: { en: "Cloning objects with structuredClone", vi: "Sao chép object bằng structuredClone" } },
        { id: "d", text: { en: "Inheriting classes with the extends keyword", vi: "Kế thừa class bằng từ khóa extends" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Method borrowing allows an object to use another object's method without inheriting or copying it.",
        vi: "Method borrowing cho phép một đối tượng sử dụng phương thức của đối tượng khác mà không cần kế thừa trực tiếp."
      }
    },
    {
      id: "js_q_13_10",
      type: "code_reasoning",
      question: {
        en: "Why does `setTimeout(user.login, 1000)` fail to authenticate if `login` relies on `this.username`?",
        vi: "Tại sao `setTimeout(user.login, 1000)` lại thất bại nếu phương thức `login` phụ thuộc vào `this.username`?"
      },
      options: [
        { id: "a", text: { en: "Passing `user.login` passes the raw function reference; when the timer executes, it invokes the function standalone without `user.` context, so `this` is undefined", vi: "Truyền `user.login` chỉ truyền tham chiếu hàm thô; khi bộ đếm thời gian kích hoạt, hàm được gọi độc lập không có ngữ cảnh `user.`, nên `this` bị undefined" } },
        { id: "b", text: { en: "setTimeout is blocked by CORS", vi: "setTimeout bị chặn bởi chính sách CORS" } },
        { id: "c", text: { en: "Timers only accept strings", vi: "Bộ đếm thời gian chỉ nhận chuỗi" } },
        { id: "d", text: { en: "Because passwords expire after 1000ms", vi: "Vì mật khẩu hết hạn sau 1000ms" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The callback invocation site is disconnected from the original object. Fix by using `setTimeout(() => user.login(), 1000)` or `setTimeout(user.login.bind(user), 1000)`.",
        vi: "Điểm gọi callback bị tách rời khỏi object gốc. Sửa bằng cách dùng `setTimeout(() => user.login(), 1000)` hoặc `user.login.bind(user)`."
      }
    }
  ]
};

// --- LESSON 14 ---
const lesson14: Lesson = {
  id: "js_lesson_14",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_3",
  order: 14,
  title: {
    en: "Asynchronous JavaScript: Event Loop, Microtasks & Timers",
    vi: "JavaScript Bất Đồng Bộ: Event Loop, Microtasks & Timers"
  },
  summary: {
    en: "Master the single-threaded JavaScript concurrency model, Call Stack, Event Loop, Microtask Queue (Promises, queueMicrotask) vs Macrotask Queue (setTimeout, I/O), and timer diagnostics.",
    vi: "Làm chủ mô hình đơn luồng bất đồng bộ trong JavaScript, Call Stack, Event Loop, hàng đợi Microtask (Promise) vs Macrotask (setTimeout, I/O) và chẩn đoán timer."
  },
  estimatedMinutes: 24,
  topicId: "js_event_loop_asynchrony",
  learn: {
    introduction: {
      en: "JavaScript is single-threaded, meaning it has only one Call Stack and can execute only one line of JavaScript code at any given instant. To perform long-running I/O operations (network requests, timers, file reads) without freezing the user interface, JavaScript relies on an asynchronous event-driven architecture powered by Web APIs, the Task (Macrotask) Queue, the Microtask Queue, and the Event Loop.",
      vi: "JavaScript là ngôn ngữ đơn luồng (single-threaded), nghĩa là nó chỉ có một Call Stack duy nhất và chỉ có thể thực thi một dòng lệnh tại một thời điểm. Để xử lý các tác vụ tốn thời gian (gọi mạng, đọc file, hẹn giờ) mà không làm đơ giao diện người dùng, JavaScript sử dụng kiến trúc hướng sự kiện bất đồng bộ gồm Web APIs, Hàng đợi Macrotask, Hàng đợi Microtask và Event Loop."
    },
    conceptExplanation: {
      en: "1. The Event Loop Algorithm:\n   - Step 1: Execute all synchronous code on the Call Stack until empty.\n   - Step 2: Flush ALL pending jobs in the Microtask Queue (Promises `.then()`, `queueMicrotask()`, `MutationObserver`) until the Microtask Queue is completely drained.\n   - Step 3: Check UI rendering updates (if running in browser).\n   - Step 4: Pick the OLDEST task from the Macrotask (Callback) Queue (`setTimeout`, `setInterval`, `setImmediate`, I/O events), push it onto the Call Stack, and execute.\n   - Step 5: Repeat continuously.\n\n2. Microtasks vs Macrotasks: Microtasks always have strict priority over Macrotasks. If a microtask schedules another microtask, it will run before any `setTimeout(..., 0)` or UI render step.\n\n3. Timers (`setTimeout`, `setInterval`): `setTimeout(fn, delay)` specifies the MINIMUM delay before the callback is placed in the task queue, NOT the guaranteed exact execution time.\n\n4. Breaking CPU-intensive Tasks: Long synchronous loops block the event loop. Use `queueMicrotask()` or `setTimeout(..., 0)` to yield control back to the browser.",
      vi: "1. Thuật Toán Event Loop:\n   - Bước 1: Thực thi toàn bộ mã đồng bộ trên Call Stack cho đến khi ngăn xếp rỗng.\n   - Bước 2: Xử lý TOÀN BỘ công việc trong Hàng đợi Microtask (Promise `.then()`, `queueMicrotask()`) cho đến khi hàng đợi rỗng hoàn toàn.\n   - Bước 3: Cập nhật giao diện Render UI (nếu chạy trên trình duyệt).\n   - Bước 4: Lấy tác vụ cũ nhất từ Hàng đợi Macrotask (`setTimeout`, `setInterval`, I/O), đẩy vào Call Stack và thực thi.\n   - Bước 5: Lặp lại liên tục.\n\n2. Microtasks vs Macrotasks: Microtask luôn có độ ưu tiên tuyệt đối trước Macrotask. Một microtask lên lịch cho một microtask khác sẽ chạy trước bất kỳ `setTimeout(..., 0)` nào.\n\n3. Timers (`setTimeout`, `setInterval`): `setTimeout(fn, delay)` chỉ đảm bảo khoảng thời gian TỐI THIỂU trước khi callback được đưa vào hàng đợi, không cam kết thời điểm chạy chính xác tuyệt đối.\n\n4. Phân Tách Tác Vụ Nặng: Vòng lặp nặng đồng bộ sẽ làm treo Event Loop. Dùng `queueMicrotask()` hoặc `setTimeout(..., 0)` để nhường luồng cho trình duyệt phản hồi."
    },
    syntax: `// 1. Classic Event Loop Execution Order
console.log("1: Synchronous");

setTimeout(() => {
  console.log("4: Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Microtask (Promise.then)");
});

console.log("2: Synchronous");
// Output order: 1 -> 2 -> 3 -> 4!

// 2. queueMicrotask explicit queuing
queueMicrotask(() => {
  console.log("High priority microtask before next paint");
});`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Non-Blocking Background Chunk Processor",
          vi: "Bộ Xử Lý Dữ Liệu Lớn Không Làm Khóa Luồng Giao Diện"
        },
        description: {
          en: "Demonstrates yielding to the Event Loop using setTimeout to process 100,000 items without freezing the browser thread.",
          vi: "Minh họa kỹ thuật nhường luồng cho Event Loop bằng setTimeout để xử lý 100,000 phần tử mà không gây đơ giao diện."
        },
        code: `function processLargeDatasetAsync(items, onProgress, onComplete) {
  let index = 0;
  const chunkSize = 2000;

  function processChunk() {
    const end = Math.min(index + chunkSize, items.length);
    while (index < end) {
      // Perform heavy calculation per item
      items[index] = items[index] * 2;
      index++;
    }

    onProgress(index, items.length);

    if (index < items.length) {
      // Yield to the Macrotask queue so UI events and clicks can be handled!
      setTimeout(processChunk, 0);
    } else {
      onComplete(items);
    }
  }

  processChunk();
}

const largeArray = new Array(10000).fill(5);
processLargeDatasetAsync(
  largeArray,
  (done, total) => console.log(\`Progress: \${((done / total) * 100).toFixed(0)}%\`),
  result => console.log("Processing complete!")
);`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Expecting `setTimeout(fn, 0)` to execute immediately before synchronous code.",
          vi: "Nghĩ rằng `setTimeout(fn, 0)` sẽ thực thi ngay lập tức trước mã đồng bộ."
        },
        correction: {
          en: "Recognize that `setTimeout(fn, 0)` is a macrotask that runs ONLY after the Call Stack and all microtasks are empty.",
          vi: "Hiểu rằng `setTimeout(fn, 0)` là một macrotask, CHỈ chạy sau khi Call Stack và toàn bộ hàng đợi microtask đã được dọn sạch."
        },
        explanation: {
          en: "Even with 0ms delay, the callback is dispatched to the host timer and pushed to the Macrotask Queue.",
          vi: "Dù đặt delay là 0ms, callback vẫn phải được đưa vào Hàng đợi Macrotask và chờ tới lượt xử lý."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use queueMicrotask() for urgent asynchronous callbacks",
          vi: "Dùng queueMicrotask() cho các callback bất đồng bộ khẩn cấp"
        },
        description: {
          en: "If you need an async callback to run immediately after the current synchronous frame before UI paints or timers, `queueMicrotask()` is faster and cleaner than `Promise.resolve().then()`.",
          vi: "Khi cần chạy một tác vụ bất đồng bộ ngay sau khối đồng bộ hiện tại trước khi trình duyệt vẽ lại giao diện, `queueMicrotask()` là lựa chọn nhanh và sạch sẽ nhất."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_14_1",
      title: {
        en: "Async Debounce Function with Timers",
        vi: "Xây Dựng Hàm Debounce Chống Rung Bằng Timer"
      },
      instruction: {
        en: "Write a function `debounce(fn, delayMs)` that returns a debounced version of `fn`. Subsequent invocations within `delayMs` should cancel the pending timer and restart the delay window. The callback must preserve `this` and receive all passed arguments.",
        vi: "Viết hàm `debounce(fn, delayMs)` trả về phiên bản debounce của `fn`. Các lần gọi hàm tiếp theo trong khoảng `delayMs` sẽ hủy timer đang chờ và đặt lại khoảng chờ mới. Hàm callback phải giữ nguyên `this` và nhận đầy đủ tham số."
      },
      starterCode: `function debounce(fn, delayMs) {
  // Implement debounce
}

const searchApi = debounce(query => console.log("Searching for:", query), 300);
searchApi("j");
searchApi("jav");
searchApi("javascript"); // Only this final call executes after 300ms!`,
      solutionCode: `function debounce(fn, delayMs) {
  let timerId = null;

  return function(...args) {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(this, args);
      timerId = null;
    }, delayMs);
  };
}`,
      hints: [
        {
          en: "Maintain timerId in closure. In the returned function, call clearTimeout(timerId) and schedule setTimeout.",
          vi: "Lưu timerId trong closure. Trong hàm trả về, gọi clearTimeout(timerId) và lên lịch setTimeout mới."
        }
      ]
    },
    {
      id: "js_ex_14_2",
      title: {
        en: "Periodic Interval Poller with Auto-Stop",
        vi: "Bộ Thăm Dò Định Kỳ (Poller) Có Cơ Chế Tự Động Hủy"
      },
      instruction: {
        en: "Write a function `startPoller(checkFn, intervalMs, maxAttempts)` that polls `checkFn()` every `intervalMs`. If `checkFn()` returns `true` (success condition) or attempts exceed `maxAttempts`, it clears the interval and returns `{ attempts, completed: boolean }` via a Promise.",
        vi: "Viết hàm `startPoller(checkFn, intervalMs, maxAttempts)` kiểm tra `checkFn()` định kỳ mỗi `intervalMs`. Nếu `checkFn()` trả về `true` hoặc số lần thử vượt quá `maxAttempts`, hàm dừng interval và trả về `{ attempts, completed: boolean }` qua một Promise."
      },
      starterCode: `function startPoller(checkFn, intervalMs, maxAttempts) {
  // Implement poller returning a Promise
}

let count = 0;
startPoller(() => ++count >= 3, 100, 5).then(res => console.log(res));
// { attempts: 3, completed: true }`,
      solutionCode: `function startPoller(checkFn, intervalMs, maxAttempts) {
  return new Promise((resolve) => {
    let attempts = 0;

    const intervalId = setInterval(() => {
      attempts++;
      let isSuccess = false;
      try {
        isSuccess = Boolean(checkFn());
      } catch (err) {
        isSuccess = false;
      }

      if (isSuccess) {
        clearInterval(intervalId);
        resolve({ attempts, completed: true });
      } else if (attempts >= maxAttempts) {
        clearInterval(intervalId);
        resolve({ attempts, completed: false });
      }
    }, intervalMs);
  });
}`,
      hints: [
        {
          en: "Wrap setInterval in a Promise. In each tick increment attempts, check condition, call clearInterval and resolve.",
          vi: "Bọc setInterval trong một Promise. Mỗi nhịp tăng attempts, kiểm tra điều kiện, gọi clearInterval và resolve."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_14",
    title: {
      en: "Priority Microtask & Macrotask Scheduler Engine",
      vi: "Engine Điều Phối Tác Vụ Đa Tầng Ưu Tiên (Task Scheduler)"
    },
    description: {
      en: "Create a scheduler object `createTaskScheduler()` with methods: `scheduleMicrotask(taskFn)`, `scheduleMacrotask(taskFn, delayMs = 0)`, `flushSync(taskFn)` (runs immediately), and `getMetrics()` tracking completed task counts by category `{ sync: number, micro: number, macro: number }`.",
      vi: "Xây dựng đối tượng điều phối `createTaskScheduler()` có các phương thức: `scheduleMicrotask(taskFn)`, `scheduleMacrotask(taskFn, delayMs = 0)`, `flushSync(taskFn)` (chạy đồng bộ ngay), và `getMetrics()` thống kê số lượng task đã hoàn thành theo phân loại `{ sync: number, micro: number, macro: number }`."
    },
    starterCode: `function createTaskScheduler() {
  // Implement task scheduler
}

const scheduler = createTaskScheduler();
scheduler.scheduleMacrotask(() => console.log("Macro 1"));
scheduler.scheduleMicrotask(() => console.log("Micro 1"));
scheduler.flushSync(() => console.log("Sync 1"));`,
    solutionCode: `function createTaskScheduler() {
  const metrics = { sync: 0, micro: 0, macro: 0 };

  return {
    flushSync(taskFn) {
      taskFn();
      metrics.sync++;
    },
    scheduleMicrotask(taskFn) {
      queueMicrotask(() => {
        taskFn();
        metrics.micro++;
      });
    },
    scheduleMacrotask(taskFn, delayMs = 0) {
      setTimeout(() => {
        taskFn();
        metrics.macro++;
      }, delayMs);
    },
    getMetrics() {
      return { ...metrics };
    }
  };
}`,
    hints: [
      {
        en: "Execute sync tasks immediately, wrap microtasks in queueMicrotask, and wrap macrotasks in setTimeout while updating metrics.",
        vi: "Thực thi task đồng bộ trực tiếp, bọc microtask trong queueMicrotask và macrotask trong setTimeout đồng thời cập nhật metrics."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_14_1",
      type: "single_choice",
      question: {
        en: "Which task queue has the highest priority in the JavaScript Event Loop after synchronous code finishes?",
        vi: "Hàng đợi tác vụ nào có độ ưu tiên cao nhất trong Event Loop sau khi mã đồng bộ thực thi xong?"
      },
      options: [
        { id: "a", text: { en: "The Microtask Queue (Promises, queueMicrotask)", vi: "Hàng đợi Microtask (Promises, queueMicrotask)" } },
        { id: "b", text: { en: "The Macrotask Queue (setTimeout, setInterval)", vi: "Hàng đợi Macrotask (setTimeout, setInterval)" } },
        { id: "c", text: { en: "The Network I/O Queue", vi: "Hàng đợi Network I/O" } },
        { id: "d", text: { en: "The Garbage Collection Queue", vi: "Hàng đợi Garbage Collection" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The Event Loop flushes all microtasks completely before selecting the next task from the Macrotask Queue.",
        vi: "Event Loop luôn giải quyết sạch sẽ toàn bộ hàng đợi microtask trước khi lấy tác vụ kế tiếp từ hàng đợi macrotask."
      }
    },
    {
      id: "js_q_14_2",
      type: "predict_output",
      question: {
        en: "What is the exact execution order of the following snippet?\n```js\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');\n```",
        vi: "Thứ tự in ra chính xác của đoạn mã sau là gì?\n```js\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');\n```"
      },
      options: [
        { id: "a", text: { en: "'A', 'D', 'C', 'B'", vi: "'A', 'D', 'C', 'B'" } },
        { id: "b", text: { en: "'A', 'B', 'C', 'D'", vi: "'A', 'B', 'C', 'D'" } },
        { id: "c", text: { en: "'A', 'D', 'B', 'C'", vi: "'A', 'D', 'B', 'C'" } },
        { id: "d", text: { en: "'C', 'A', 'D', 'B'", vi: "'C', 'A', 'D', 'B'" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Synchronous 'A' and 'D' execute first on Call Stack. Then microtask 'C' runs. Finally, macrotask 'B' runs from the callback queue.",
        vi: "Mã đồng bộ 'A' và 'D' chạy trước trên Call Stack. Tiếp theo microtask 'C' được giải quyết. Cuối cùng macrotask 'B' mới được chạy."
      }
    },
    {
      id: "js_q_14_3",
      type: "single_choice",
      question: {
        en: "Why is JavaScript referred to as 'Single-Threaded'?",
        vi: "Tại sao JavaScript được gọi là ngôn ngữ 'Đơn Luồng' (Single-Threaded)?"
      },
      options: [
        { id: "a", text: { en: "It has only one main Call Stack and can execute only one sequence of instructions at a time in the main thread", vi: "Nó chỉ có một Call Stack chính duy nhất và chỉ có thể thực thi một chuỗi lệnh tại một thời điểm trên luồng chính" } },
        { id: "b", text: { en: "It cannot make HTTP requests", vi: "Nó không thể gửi request HTTP" } },
        { id: "c", text: { en: "It cannot run on multi-core CPUs", vi: "Nó không thể chạy trên chip đa nhân" } },
        { id: "d", text: { en: "It only runs inside single-tab browsers", vi: "Nó chỉ chạy trong trình duyệt đơn tab" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The JS execution thread processes one frame at a time on its single Call Stack, delegating asynchronous I/O to background system/browser threads.",
        vi: "Luồng thực thi JS xử lý từng khung lệnh một trên Call Stack đơn, giao các tác vụ I/O bất đồng bộ cho các luồng nền của trình duyệt/hệ điều hành."
      }
    },
    {
      id: "js_q_14_4",
      type: "predict_output",
      question: {
        en: "What will `setTimeout(fn, 100)` do if the main thread is occupied by an intensive synchronous loop for 500ms?",
        vi: "`setTimeout(fn, 100)` sẽ hoạt động thế nào nếu luồng chính bị chiếm dụng bởi một vòng lặp đồng bộ nặng kéo dài 500ms?"
      },
      options: [
        { id: "a", text: { en: "`fn` will only execute AFTER the 500ms synchronous loop completes and the Call Stack clears", vi: "`fn` sẽ CHỈ được thực thi SAU KHI vòng lặp đồng bộ 500ms chạy xong và Call Stack được giải phóng" } },
        { id: "b", text: { en: "`fn` interrupts the loop precisely at 100ms", vi: "`fn` ngắt vòng lặp chính xác tại thời điểm 100ms" } },
        { id: "c", text: { en: "`fn` is cancelled and dropped", vi: "`fn` bị hủy bỏ và bỏ qua" } },
        { id: "d", text: { en: "Throws a TimeoutError", vi: "Ném lỗi TimeoutError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Timers represent a minimum delay. JavaScript cannot preempt running synchronous code on the Call Stack.",
        vi: "Timer chỉ đại diện cho khoảng chờ tối thiểu. JavaScript không thể ngắt ngang mã đồng bộ đang chạy trên Call Stack."
      }
    },
    {
      id: "js_q_14_5",
      type: "single_choice",
      question: {
        en: "Which standard Web API explicitly enqueues a microtask directly onto the Microtask Queue?",
        vi: "Web API chuẩn nào đưa trực tiếp một microtask vào Hàng đợi Microtask?"
      },
      options: [
        { id: "a", text: { en: "queueMicrotask(fn)", vi: "queueMicrotask(fn)" } },
        { id: "b", text: { en: "setMicrotask(fn)", vi: "setMicrotask(fn)" } },
        { id: "c", text: { en: "process.macro(fn)", vi: "process.macro(fn)" } },
        { id: "d", text: { en: "EventLoop.post(fn)", vi: "EventLoop.post(fn)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`queueMicrotask(callback)` is the standard ECMAScript / Web API for scheduling high-priority microtasks.",
        vi: "`queueMicrotask(callback)` là API chuẩn để lên lịch thực thi các microtask ưu tiên cao."
      }
    },
    {
      id: "js_q_14_6",
      type: "predict_output",
      question: {
        en: "What happens if a recursive microtask continuously schedules another microtask via `queueMicrotask()`?",
        vi: "Điều gì xảy ra nếu một microtask đệ quy liên tục lên lịch một microtask khác qua `queueMicrotask()`?"
      },
      options: [
        { id: "a", text: { en: "It starves the Event Loop, indefinitely blocking Macrotasks (timers, I/O) and UI rendering", vi: "Nó làm nghẽn Event Loop, chặn vô thời hạn các Macrotask (timer, I/O) và thao tác render giao diện" } },
        { id: "b", text: { en: "It throws a Stack Overflow error", vi: "Nó ném lỗi Stack Overflow" } },
        { id: "c", text: { en: "The browser terminates the tab immediately", vi: "Trình duyệt tắt tab ngay lập tức" } },
        { id: "d", text: { en: "It automatically converts to setTimeout", vi: "Nó tự động chuyển thành setTimeout" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Because the Event Loop drains microtasks completely before advancing to rendering or macrotasks, infinite microtasks cause starvation (freezing the page).",
        vi: "Vì Event Loop xử lý hết toàn bộ microtask trước khi chuyển sang render hay macrotask, microtask vô hạn sẽ làm đóng băng ứng dụng hoàn toàn."
      }
    },
    {
      id: "js_q_14_7",
      type: "fill_blank",
      question: {
        en: "To cancel a pending timer scheduled with setTimeout(fn, ms), pass the returned timer ID to _____ (timerId).",
        vi: "Để hủy một timer đang chờ được lên lịch bằng setTimeout(fn, ms), truyền ID của timer vào hàm _____ (timerId)."
      },
      correctAnswer: "clearTimeout",
      explanation: {
        en: "`clearTimeout(timerId)` cancels the timer and prevents its callback from being pushed to the queue.",
        vi: "`clearTimeout(timerId)` hủy bộ đếm thời gian và ngăn không cho callback của nó được đưa vào hàng đợi."
      }
    },
    {
      id: "js_q_14_8",
      type: "single_choice",
      question: {
        en: "Which of the following is categorized as a Macrotask in browser environments?",
        vi: "Tác vụ nào sau đây được phân loại là một Macrotask trong môi trường trình duyệt?"
      },
      options: [
        { id: "a", text: { en: "setTimeout callback", vi: "Callback của setTimeout" } },
        { id: "b", text: { en: "Promise.then handler", vi: "Hàm xử lý Promise.then" } },
        { id: "c", text: { en: "queueMicrotask callback", vi: "Callback của queueMicrotask" } },
        { id: "d", text: { en: "MutationObserver notification", vi: "Thông báo của MutationObserver" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`setTimeout`, `setInterval`, and I/O callbacks are Macrotasks. `Promise.then`, `queueMicrotask`, and `MutationObserver` are Microtasks.",
        vi: "`setTimeout`, `setInterval`, và I/O callbacks là Macrotask. `Promise.then`, `queueMicrotask`, và `MutationObserver` là Microtask."
      }
    },
    {
      id: "js_q_14_9",
      type: "predict_output",
      question: {
        en: "What does `setInterval(fn, 1000)` return?",
        vi: "`setInterval(fn, 1000)` trả về giá trị gì?"
      },
      options: [
        { id: "a", text: { en: "A positive integer (numeric timer ID in browsers) or Timeout object (in Node.js) used to cancel the interval", vi: "Một số nguyên dương (ID bộ đếm trong trình duyệt) hoặc Timeout object (trong Node.js) dùng để hủy interval" } },
        { id: "b", text: { en: "A Promise that resolves every 1000ms", vi: "Một Promise resolve sau mỗi 1000ms" } },
        { id: "c", text: { en: "undefined", vi: "undefined" } },
        { id: "d", text: { en: "The return value of `fn`", vi: "Giá trị trả về của hàm `fn`" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`setInterval` returns an identifier token that must be passed to `clearInterval(id)` to stop recurring executions.",
        vi: "`setInterval` trả về một mã định danh dùng để truyền vào `clearInterval(id)` khi muốn dừng việc lặp lại."
      }
    },
    {
      id: "js_q_14_10",
      type: "code_reasoning",
      question: {
        en: "Why is `setTimeout(fn, 0)` often used when you need to let the browser re-render or handle user clicks during a long operation?",
        vi: "Tại sao `setTimeout(fn, 0)` thường được dùng khi bạn muốn nhường quyền cho trình duyệt re-render hoặc nhận click của người dùng trong tác vụ dài?"
      },
      options: [
        { id: "a", text: { en: "It breaks up the long execution by scheduling the next step as a macrotask, allowing the browser rendering engine to paint frames between chunks", vi: "Nó chia nhỏ tác vụ bằng cách lên lịch bước tiếp theo vào macrotask, cho phép engine trình duyệt vẽ lại giao diện giữa các phân đoạn" } },
        { id: "b", text: { en: "It forces the CPU to overclock", vi: "Nó ép CPU ép xung" } },
        { id: "c", text: { en: "It compresses the JS bundle size", vi: "Nó nén dung lượng bundle JS" } },
        { id: "d", text: { en: "It disables browser security headers", vi: "Nó tắt các header bảo mật của trình duyệt" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Yielding via macrotask allows the Event Loop to process UI render steps and user input events between computational chunks.",
        vi: "Nhường luồng qua macrotask cho phép Event Loop cập nhật render UI và tiếp nhận tương tác chuột/bàn phím giữa các phân đoạn tính toán."
      }
    }
  ]
};

// Write Lesson 13 and 14
fs.writeFileSync(path.join(dir, 'lesson13.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson13: Lesson = ${JSON.stringify(lesson13, null, 2)};\nexport default lesson13;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson14.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson14: Lesson = ${JSON.stringify(lesson14, null, 2)};\nexport default lesson14;\n`, 'utf8');
console.log('Lessons 13 and 14 generated.');
