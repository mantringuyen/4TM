import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/intermediate/module02');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 17 ---
const lesson17: Lesson = {
  id: "js_lesson_17",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_4",
  order: 17,
  title: {
    en: "ES6 Classes, Private Fields & Object-Oriented Patterns",
    vi: "ES6 Classes, Trường Riêng Tư (#) & Các Mẫu Hướng Đối Tượng"
  },
  summary: {
    en: "Master ES6 class syntax, constructors, getters/setters, static properties, true private `#field` encapsulation, subclassing with `extends`, and `super` invocation.",
    vi: "Làm chủ cú pháp ES6 class, hàm khởi tạo constructor, getter/setter, thuộc tính tĩnh static, đóng gói dữ liệu riêng tư thực thụ bằng `#field`, kế thừa bằng `extends` và gọi `super`."
  },
  estimatedMinutes: 22,
  topicId: "js_classes_oop",
  learn: {
    introduction: {
      en: "ES6 Classes provide clean, declarative syntax for object-oriented programming in JavaScript. Under the hood, classes are syntactic sugar over the prototypal inheritance model, but modern features like true private class fields (`#privateField`), static blocks, and ergonomic inheritance (`extends` and `super`) make JavaScript classes robust and expressive for enterprise domain modeling.",
      vi: "ES6 Classes mang đến cú pháp khai báo rõ ràng, chuẩn mực cho lập trình hướng đối tượng trong JavaScript. Về bản chất, class là lớp vỏ cú pháp (syntactic sugar) trên nền tảng Prototypal Inheritance, nhưng các tính năng hiện đại như trường riêng tư thực sự (`#privateField`), khối static và cơ chế kế thừa (`extends`, `super`) giúp việc thiết kế mô hình nghiệp vụ trở nên mạch lạc và an toàn tuyệt đối."
    },
    conceptExplanation: {
      en: "1. Class Declaration & Constructors: The `constructor()` method runs upon `new ClassName()`. Instance fields can be declared directly in the class body without assigning in the constructor.\n\n2. True Private Fields (`#`): Properties prefixed with `#` (e.g. `#apiKey`) are enforced at the engine level. They cannot be accessed, read, or deleted outside the class body, solving the legacy `_private` naming convention defect.\n\n3. Getters & Setters: Define computed accessors using `get prop()` and `set prop(value)` to encapsulate validation rules.\n\n4. Static Members & Static Blocks: `static` methods and fields belong to the class constructor itself rather than instances. Static initialization blocks `static { ... }` execute once when the class is loaded.\n\n5. Subclassing with `extends` and `super`: In derived classes, `super()` MUST be invoked before accessing `this` in the constructor. `super.method()` delegates to the parent prototype.",
      vi: "1. Khai Báo Class & Constructor: Hàm `constructor()` thực thi khi gọi `new ClassName()`. Các trường instance có thể khai báo trực tiếp trong thân class.\n\n2. Trường Riêng Tư Thực Sự (`#`): Các trường bắt đầu bằng `#` (ví dụ `#apiKey`) được bảo vệ ở cấp độ engine. Không thể truy cập, đọc hay xóa từ bên ngoài class, giải quyết triệt để vấn đề của quy ước `_private` trước đây.\n\n3. Getters & Setters: Định nghĩa hàm truy cập và gán dữ liệu qua `get prop()` và `set prop(value)` để đóng gói logic kiểm tra hợp lệ.\n\n4. Thành Viên Static: Phương thức và trường `static` thuộc về chính class chứ không thuộc về instance. Khối `static { ... }` chạy 1 lần duy nhất khi class được nạp vào bộ nhớ.\n\n5. Kế Thừa Bằng `extends` và `super`: Trong class con, `super()` BẮT BUỘC phải được gọi trước khi dùng `this` trong constructor. `super.method()` cho phép gọi phương thức của class cha."
    },
    syntax: `// 1. Modern class with private field, getters, and static factory
class SecureUser {
  #passwordHash; // True private field!
  static #minPasswordLength = 8;

  constructor(email, rawPassword) {
    this.email = email;
    this.#setPassword(rawPassword);
  }

  #setPassword(rawPassword) {
    if (rawPassword.length < SecureUser.#minPasswordLength) {
      throw new Error("Password too short");
    }
    this.#passwordHash = \`hash_\${rawPassword}\`;
  }

  verifyPassword(candidate) {
    return this.#passwordHash === \`hash_\${candidate}\`;
  }

  static createGuest() {
    return new SecureUser("guest@app.local", "GuestSecret123");
  }
}`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Polymorphic Payment Processing Hierarchy",
          vi: "Hệ Thống Phân Cấp Xử Lý Thanh Toán Đa Hình Bằng ES6 Classes"
        },
        description: {
          en: "Demonstrates an abstract-like base class with private state, inheritance, and polymorphic method overrides.",
          vi: "Minh họa class cha với trạng thái riêng tư, kế thừa class con và ghi đè phương thức đa hình."
        },
        code: `class PaymentProcessor {
  #transactionLog = [];

  constructor(merchantId) {
    if (new.target === PaymentProcessor) {
      throw new Error("PaymentProcessor cannot be instantiated directly");
    }
    this.merchantId = merchantId;
  }

  #record(status, amount) {
    this.#transactionLog.push({ status, amount, timestamp: Date.now() });
  }

  async process(amount) {
    throw new Error("process() must be implemented by subclass");
  }

  getLogCount() {
    return this.#transactionLog.length;
  }
}

class StripeProcessor extends PaymentProcessor {
  constructor(merchantId, apiKey) {
    super(merchantId);
    this.apiKey = apiKey;
  }

  async process(amount) {
    console.log(\`Charging \$\${amount} via Stripe (Merchant: \${this.merchantId})\`);
    return { success: true, txnId: "ch_stripe_999" };
  }
}

const stripe = new StripeProcessor("acct_123", "sk_live_abc");
stripe.process(99.99);`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Accessing `this` before calling `super()` inside a derived class constructor.",
          vi: "Truy cập `this` trước khi gọi `super()` bên trong constructor của class con."
        },
        correction: {
          en: "Always call `super(...args)` on the very first line of a derived class constructor before referencing `this`.",
          vi: "Luôn gọi `super(...args)` ở dòng đầu tiên trong constructor của class con trước khi dùng `this`."
        },
        explanation: {
          en: "Until `super()` executes, the derived instance environment is uninitialized in the TDZ (ReferenceError: Must call super constructor).",
          vi: "Trước khi `super()` chạy, instance của class con chưa được khởi tạo trong TDZ (sẽ ném lỗi ReferenceError)."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use true #private fields instead of underscores for sensitive internals",
          vi: "Dùng trường #private thay vì tiền tố gạch dưới _ cho dữ liệu nhạy cảm"
        },
        description: {
          en: "The `#` syntax is strictly enforced by JavaScript runtimes, preventing external modification and leaking private state.",
          vi: "Cú pháp `#` được runtime JS bảo vệ tuyệt đối, ngăn chặn can thiệp trái phép và rò rỉ dữ liệu nhạy cảm."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_17_1",
      title: {
        en: "Build a Validated BankAccount Class with Private Balance",
        vi: "Xây Dựng Class BankAccount Có Kiểm Soát Số Dư Riêng Tư"
      },
      instruction: {
        en: "Create a class `BankAccount` with private field `#balance`. Provide getter `balance`, method `deposit(amount)`, and method `withdraw(amount)`. Prevent negative deposits/withdrawals and prevent overdrafts with descriptive Error throws.",
        vi: "Tạo class `BankAccount` có trường riêng tư `#balance`. Cung cấp getter `balance`, phương thức `deposit(amount)` và `withdraw(amount)`. Ngăn chặn nạp/rút số âm và không cho rút quá số dư bằng cách ném Error."
      },
      starterCode: `class BankAccount {
  // Implement BankAccount class with #balance
}

const acc = new BankAccount(100);
acc.deposit(50);
console.log(acc.balance); // 150
acc.withdraw(30);
console.log(acc.balance); // 120`,
      solutionCode: `class BankAccount {
  #balance;

  constructor(initialBalance = 0) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative");
    }
    this.#balance = initialBalance;
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be greater than 0");
    }
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be greater than 0");
    }
    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }
    this.#balance -= amount;
    return this.#balance;
  }
}`,
      hints: [
        {
          en: "Declare `#balance;` at top of class. In methods, validate amount > 0 and amount <= #balance before updating.",
          vi: "Khai báo `#balance;` ở đầu class. Trong các method, kiểm tra amount > 0 và amount <= #balance trước khi cập nhật."
        }
      ]
    },
    {
      id: "js_ex_17_2",
      title: {
        en: "Class Inheritance with Shape & Rectangle Geometry",
        vi: "Kế Thừa Hình Học Đa Giác Bằng Class Shape & Rectangle"
      },
      instruction: {
        en: "Create a base class `Shape` with property `name` and method `getArea()`. Create a subclass `Rectangle` inheriting from `Shape` with properties `width` and `height`, overriding `getArea()` and adding `getPerimeter()`.",
        vi: "Tạo class cha `Shape` có thuộc tính `name` và phương thức `getArea()`. Tạo class con `Rectangle` kế thừa từ `Shape` có thuộc tính `width` và `height`, ghi đè `getArea()` và bổ sung `getPerimeter()`."
      },
      starterCode: `// Implement Shape and Rectangle classes
const rect = new Rectangle(10, 5);
console.log(rect.name); // "Rectangle"
console.log(rect.getArea()); // 50
console.log(rect.getPerimeter()); // 30`,
      solutionCode: `class Shape {
  constructor(name = "Shape") {
    this.name = name;
  }

  getArea() {
    return 0;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super("Rectangle");
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}`,
      hints: [
        {
          en: "Call `super('Rectangle')` inside `Rectangle` constructor, and calculate width * height in getArea().",
          vi: "Gọi `super('Rectangle')` trong constructor của `Rectangle` và tính width * height trong getArea()."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_17",
    title: {
      en: "Enterprise Event Emitter Class with Once & Wildcards",
      vi: "Xây Dựng Class EventEmitter Doanh Nghiệp Hỗ Trợ Once & Wildcard"
    },
    description: {
      en: "Build a robust `EventEmitter` class with private field `#events`. Implement `on(event, listener)`, `once(event, listener)` (auto-unsubscribes after 1 call), `off(event, listener)`, and `emit(event, ...args)`. Return an unsubscribe function from `on()`.",
      vi: "Xây dựng class `EventEmitter` hoàn chỉnh với trường riêng tư `#events`. Cài đặt các phương thức `on(event, listener)`, `once(event, listener)` (tự hủy sau 1 lần gọi), `off(event, listener)` và `emit(event, ...args)`. Phương thức `on()` phải trả về hàm unsubscribe."
    },
    starterCode: `class EventEmitter {
  // Implement full EventEmitter
}

const bus = new EventEmitter();
const unsub = bus.on("data", val => console.log("Received:", val));
bus.emit("data", 42); // "Received: 42"
unsub();
bus.emit("data", 99); // Nothing emitted`,
    solutionCode: `class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (typeof listener !== 'function') throw new TypeError("Listener must be a function");
    if (!this.#events.has(event)) {
      this.#events.set(event, new Set());
    }
    this.#events.get(event).add(listener);

    return () => this.off(event, listener);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener.apply(this, args);
    };
    return this.on(event, wrapper);
  }

  off(event, listener) {
    if (this.#events.has(event)) {
      this.#events.get(event).delete(listener);
      if (this.#events.get(event).size === 0) {
        this.#events.delete(event);
      }
    }
  }

  emit(event, ...args) {
    if (!this.#events.has(event)) return false;
    const listeners = [...this.#events.get(event)];
    for (const fn of listeners) {
      fn(...args);
    }
    return true;
  }
}`,
    hints: [
      {
        en: "Use a Map of Sets for `#events`. Wrap listeners in a self-cleaning handler for `once`.",
        vi: "Dùng Map chứa các Set cho `#events`. Bọc listener trong một hàm tự hủy cho `once`."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_17_1",
      type: "single_choice",
      question: {
        en: "How are true private instance fields declared in modern ES6+ classes?",
        vi: "Trường riêng tư thực sự (private field) được khai báo như thế nào trong ES6+ Class?"
      },
      options: [
        { id: "a", text: { en: "Prefixing the field name with `#` (e.g. `#balance`)", vi: "Thêm tiền tố `#` trước tên trường (ví dụ `#balance`)" } },
        { id: "b", text: { en: "Prefixing with `private ` keyword", vi: "Dùng từ khóa `private `" } },
        { id: "c", text: { en: "Prefixing with an underscore `_balance`", vi: "Dùng tiền tố gạch dưới `_balance`" } },
        { id: "d", text: { en: "Wrapping with Object.seal()", vi: "Bọc bằng Object.seal()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The `#field` syntax is enforced directly by the JavaScript runtime engine.",
        vi: "Cú pháp `#field` được runtime engine của JavaScript kiểm soát và bảo vệ trực tiếp."
      }
    },
    {
      id: "js_q_17_2",
      type: "predict_output",
      question: {
        en: "What happens if external code tries to access `user.#secret` from outside the class?",
        vi: "Điều gì xảy ra nếu mã bên ngoài cố tình truy cập `user.#secret` từ ngoài class?"
      },
      options: [
        { id: "a", text: { en: "Throws a SyntaxError at parse time / runtime", vi: "Ném lỗi SyntaxError ngay tại thời điểm phân tích cú pháp / runtime" } },
        { id: "b", text: { en: "Returns undefined", vi: "Trả về undefined" } },
        { id: "c", text: { en: "Returns null", vi: "Trả về null" } },
        { id: "d", text: { en: "Prints a console warning", vi: "In cảnh báo ra console" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Private identifier `#secret` is not accessible outside class declaration syntax, resulting in a fatal SyntaxError.",
        vi: "Mã định danh riêng tư `#secret` không thể truy cập bên ngoài class, gây lỗi SyntaxError."
      }
    },
    {
      id: "js_q_17_3",
      type: "single_choice",
      question: {
        en: "What must be called in a derived class constructor before accessing `this`?",
        vi: "Lệnh nào BẮT BUỘC phải gọi trong constructor của class con trước khi truy cập `this`?"
      },
      options: [
        { id: "a", text: { en: "super(...args)", vi: "super(...args)" } },
        { id: "b", text: { en: "this.init()", vi: "this.init()" } },
        { id: "c", text: { en: "Object.create(this)", vi: "Object.create(this)" } },
        { id: "d", text: { en: "parent.constructor()", vi: "parent.constructor()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Calling `super()` initializes the parent constructor and binds the instance `this`.",
        vi: "Gọi `super()` khởi chạy constructor của class cha và liên kết instance `this`."
      }
    },
    {
      id: "js_q_17_4",
      type: "predict_output",
      question: {
        en: "What is a `static` method attached to in a JavaScript class?",
        vi: "Phương thức `static` trong class JavaScript được gắn vào đâu?"
      },
      options: [
        { id: "a", text: { en: "The Class constructor function itself, NOT the instances or prototype", vi: "Chính hàm constructor của Class, KHÔNG nằm trên instance hay prototype" } },
        { id: "b", text: { en: "Every individual instance object", vi: "Từng đối tượng instance riêng biệt" } },
        { id: "c", text: { en: "The window global object", vi: "Đối tượng toàn cục window" } },
        { id: "d", text: { en: "Array.prototype", vi: "Array.prototype" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Static members are called directly on the class (e.g. `Math.max()` or `User.create()`).",
        vi: "Thành viên static được gọi trực tiếp thông qua tên class (ví dụ `Math.max()` hoặc `User.create()`)."
      }
    },
    {
      id: "js_q_17_5",
      type: "single_choice",
      question: {
        en: "What is `new.target` inside a constructor?",
        vi: "`new.target` bên trong một constructor mang ý nghĩa gì?"
      },
      options: [
        { id: "a", text: { en: "A reference to the constructor function that was invoked with `new` (useful for detecting abstract classes)", vi: "Tham chiếu tới hàm constructor được gọi cùng với từ khóa `new` (dùng để phát hiện class trừu tượng)" } },
        { id: "b", text: { en: "The DOM click target element", vi: "Phần tử DOM mục tiêu click" } },
        { id: "c", text: { en: "The timestamp when the object was created", vi: "Timestamp lúc đối tượng được tạo" } },
        { id: "d", text: { en: "The IP address of the user", vi: "Địa chỉ IP của người dùng" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`new.target` points to the class invoked by `new`. If `new.target === BaseClass`, you can block direct instantiation.",
        vi: "`new.target` trỏ tới class được gọi bởi `new`. Nếu `new.target === BaseClass`, bạn có thể chặn việc khởi tạo trực tiếp class cha."
      }
    },
    {
      id: "js_q_17_6",
      type: "predict_output",
      question: {
        en: "What will `console.log` print?\n```js\nclass Box {\n  #val = 10;\n  get double() { return this.#val * 2; }\n}\nconst b = new Box();\nconsole.log(b.double);\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nclass Box {\n  #val = 10;\n  get double() { return this.#val * 2; }\n}\nconst b = new Box();\nconsole.log(b.double);\n```"
      },
      options: [
        { id: "a", text: { en: "20", vi: "20" } },
        { id: "b", text: { en: "undefined", vi: "undefined" } },
        { id: "c", text: { en: "Function double", vi: "Function double" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The getter method is accessed like a normal property `b.double`, invoking the getter function and returning 20.",
        vi: "Phương thức getter được truy cập như một thuộc tính thông thường `b.double`, thực thi hàm và trả về 20."
      }
    },
    {
      id: "js_q_17_7",
      type: "fill_blank",
      question: {
        en: "To inherit a parent class in ES6, use the class Child _____ Parent syntax.",
        vi: "Để kế thừa class cha trong ES6, sử dụng cú pháp class Child _____ Parent."
      },
      correctAnswer: "extends",
      explanation: {
        en: "The `extends` keyword establishes prototypal inheritance between classes.",
        vi: "Từ khóa `extends` thiết lập quan hệ kế thừa prototype giữa các class."
      }
    },
    {
      id: "js_q_17_8",
      type: "single_choice",
      question: {
        en: "Can class declarations be hoisted before their definition line like `function` declarations?",
        vi: "Khai báo class có được hoist để sử dụng trước dòng định nghĩa như khai báo `function` không?"
      },
      options: [
        { id: "a", text: { en: "No, classes reside in the Temporal Dead Zone (TDZ) and throw a ReferenceError if accessed before declaration", vi: "Không, class nằm trong Temporal Dead Zone (TDZ) và ném lỗi ReferenceError nếu gọi trước dòng khai báo" } },
        { id: "b", text: { en: "Yes, classes are fully hoisted", vi: "Có, class được hoist hoàn toàn" } },
        { id: "c", text: { en: "Only static classes are hoisted", vi: "Chỉ class static mới được hoist" } },
        { id: "d", text: { en: "Only in Node.js", vi: "Chỉ trong Node.js" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Unlike function declarations, class declarations are let/const-like and cannot be evaluated before declaration.",
        vi: "Khác với khai báo function, class có hành vi giống let/const và không thể sử dụng trước khi được định nghĩa."
      }
    },
    {
      id: "js_q_17_9",
      type: "predict_output",
      question: {
        en: "What does the `super` keyword reference inside a method of a subclass?",
        vi: "Từ khóa `super` bên trong một phương thức của subclass tham chiếu tới cái gì?"
      },
      options: [
        { id: "a", text: { en: "The prototype of the parent superclass", vi: "Prototype của class cha" } },
        { id: "b", text: { en: "The window object", vi: "Đối tượng window" } },
        { id: "c", text: { en: "The document object", vi: "Đối tượng document" } },
        { id: "d", text: { en: "The child instance", vi: "Instance của class con" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`super.method()` invokes the method defined on the parent class prototype, binding `this` to current instance.",
        vi: "`super.method()` thực thi phương thức định nghĩa trên prototype của class cha với `this` trỏ vào instance hiện tại."
      }
    },
    {
      id: "js_q_17_10",
      type: "code_reasoning",
      question: {
        en: "Why is composition often preferred over deep multi-level class inheritance hierarchies?",
        vi: "Tại sao nguyên lý Composition (kết hợp) thường được ưu tiên hơn kế thừa đa tầng (Inheritance) sâu?"
      },
      options: [
        { id: "a", text: { en: "Composition avoids fragile base class issues and tight coupling by combining focused modular behaviors rather than rigid tree hierarchies", vi: "Composition tránh được lỗi class cha mỏng manh và giảm phụ thuộc cứng bằng cách lắp ghép các module hành vi độc lập thay vì cây kế thừa cứng nhắc" } },
        { id: "b", text: { en: "Inheritance is forbidden in TypeScript", vi: "TypeScript cấm dùng kế thừa" } },
        { id: "c", text: { en: "Classes use too much memory", vi: "Class tốn quá nhiều RAM" } },
        { id: "d", text: { en: "Composition makes code execute 100x faster", vi: "Composition giúp code chạy nhanh gấp 100 lần" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Favoring composition ('has-a') over inheritance ('is-a') produces more flexible, testable, and maintainable software architectures.",
        vi: "Ưu tiên Composition ('has-a') hơn Inheritance ('is-a') giúp kiến trúc phần mềm linh hoạt, dễ test và dễ bảo trì hơn."
      }
    }
  ]
};

// --- LESSON 18 ---
const lesson18: Lesson = {
  id: "js_lesson_18",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_4",
  order: 18,
  title: {
    en: "DOM Manipulation, Traversal & High-Performance Rendering",
    vi: "Thao Tác DOM, Điều Hướng & Kết Xuất Hiệu Năng Cao"
  },
  summary: {
    en: "Master DOM queries, node creation, subtree traversal, classList/dataset APIs, DocumentFragment batching, and eliminating layout thrashing / reflows.",
    vi: "Làm chủ truy vấn DOM, tạo thẻ động, duyệt cây phân cấp, API classList/dataset, tối ưu gom cụm bằng DocumentFragment và phòng chống giật lag layout reflow."
  },
  estimatedMinutes: 22,
  topicId: "js_dom_manipulation",
  learn: {
    introduction: {
      en: "The Document Object Model (DOM) is an object-oriented structural representation of an HTML document. JavaScript communicates with the browser layout engine through the DOM API to dynamically query elements, insert nodes, alter CSS styling, and handle user interactions. Writing performant DOM code requires understanding the expensive costs of browser reflows and repaints.",
      vi: "Document Object Model (DOM) là mô hình hướng đối tượng đại diện cho tài liệu HTML. JavaScript giao tiếp với engine giao diện của trình duyệt thông qua DOM API để tìm kiếm phần tử, chèn thẻ động, thay đổi style CSS và xử lý tương tác. Viết mã DOM hiệu năng cao đòi hỏi hiểu rõ chi phí đắt đỏ của các quá trình Reflow (tính toán lại bố cục) và Repaint (vẽ lại điểm ảnh)."
    },
    conceptExplanation: {
      en: "1. Modern Querying: `document.querySelector(selector)` (returns first match or null) and `document.querySelectorAll(selector)` (returns static NodeList, compatible with `.forEach()`).\n\n2. Creating & Inserting Elements: `document.createElement(tagName)`, `element.append(...nodesOrStrings)`, `element.prepend()`, `element.before()`, `element.after()`, and `element.remove()`.\n\n3. High-Performance Batching with `DocumentFragment`: An in-memory lightweight node container. Appending 1,000 items to a Fragment and mounting the Fragment into the DOM triggers ONLY 1 reflow instead of 1,000!\n\n4. Class & Data Manipulation: `element.classList.add()`, `.remove()`, `.toggle()`, `.contains()`, and custom data attributes via `element.dataset.myKey`.\n\n5. Layout Thrashing Prevention: Reading geometric properties (`offsetWidth`, `getBoundingClientRect()`) immediately after writing styles (`element.style.width = ...`) forces synchronous layout calculations.",
      vi: "1. Truy Vấn Hiện Đại: `document.querySelector(selector)` (trả về phần tử đầu tiên hoặc null) và `document.querySelectorAll(selector)` (trả về NodeList tĩnh, hỗ trợ `.forEach()`).\n\n2. Tạo & Chèn Thẻ Động: `document.createElement(tagName)`, `element.append()`, `element.prepend()`, `element.before()`, `element.after()` và `element.remove()`.\n\n3. Gom Cụm Hiệu Năng Cao Bằng `DocumentFragment`: Vùng chứa node ảo trong bộ nhớ. Chèn 1,000 thẻ vào Fragment rồi mới gắn Fragment vào DOM chỉ gây ra ĐÚNG 1 lần Reflow thay vì 1,000 lần!\n\n4. Thao Tác Class & Data: `element.classList.add()`, `.remove()`, `.toggle()`, `.contains()` và thuộc tính dữ liệu qua `element.dataset.myKey`.\n\n5. Chống Giật Lag Layout Thrashing: Đọc kích thước hình học (`offsetWidth`, `getBoundingClientRect()`) ngay sau khi vừa gán style sẽ ép trình duyệt phải tính toán lại bố cục đồng bộ cực kỳ tốn tài nguyên."
    },
    syntax: `// 1. Efficient batched insertion with DocumentFragment
const userList = document.querySelector("#user-list");
const fragment = document.createDocumentFragment();

const users = ["Alex", "Elena", "Marcus", "Jessica"];
users.forEach(name => {
  const li = document.createElement("li");
  li.className = "user-item flex items-center p-2";
  li.dataset.userId = name.toLowerCase();
  li.textContent = name;
  fragment.appendChild(li); // No DOM reflow yet!
});

userList.appendChild(fragment); // Triggers exactly ONE layout reflow!

// 2. ClassList toggling with boolean force
const modal = document.querySelector(".modal");
modal.classList.toggle("hidden", false); // Forces modal to show`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Dynamic Virtual List Component Renderer",
          vi: "Bộ Render Danh Sách Dữ Liệu Động Hiệu Năng Cao"
        },
        description: {
          en: "Demonstrates building, updating, and clearing a dynamic data table using modern DOM methods and DocumentFragment.",
          vi: "Minh họa khởi tạo, cập nhật và dọn sạch bảng dữ liệu động bằng các phương thức DOM hiện đại và DocumentFragment."
        },
        code: `function renderProductTable(container, products) {
  // Clear container cleanly
  container.replaceChildren();

  const fragment = document.createDocumentFragment();

  products.forEach(prod => {
    const row = document.createElement("tr");
    row.dataset.productId = prod.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = prod.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = \`$\${prod.price.toFixed(2)}\`;

    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.textContent = prod.inStock ? "In Stock" : "Out of Stock";
    badge.className = prod.inStock ? "badge-success" : "badge-danger";
    statusCell.appendChild(badge);

    row.append(nameCell, priceCell, statusCell);
    fragment.appendChild(row);
  });

  container.appendChild(fragment);
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Setting `innerHTML` in a loop (e.g. `container.innerHTML += '<div>' + item + '</div>'`).",
          vi: "Nối chuỗi `innerHTML` trong vòng lặp (ví dụ `container.innerHTML += '<div>' + item + '</div>'`)."
        },
        correction: {
          en: "Use `DocumentFragment` with `createElement`, or construct the full HTML string first and assign `innerHTML` once outside the loop.",
          vi: "Dùng `DocumentFragment` với `createElement`, hoặc ghép chuỗi HTML hoàn chỉnh rồi mới gán `innerHTML` một lần duy nhất ngoài vòng lặp."
        },
        explanation: {
          en: "`innerHTML += ...` forces the browser to serialize the entire existing DOM subtree, parse the HTML string, rebuild all DOM nodes, and destroy attached event listeners on every iteration.",
          vi: "`innerHTML += ...` ép trình duyệt phân tích cú pháp lại toàn bộ cây DOM hiện tại, tạo lại tất cả node và làm mất sạch các event listener đã gắn trước đó."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use textContent instead of innerHTML when rendering untrusted text",
          vi: "Dùng textContent thay vì innerHTML khi render nội dung văn bản của người dùng"
        },
        description: {
          en: "`textContent` safely escapes script tags and special characters, preventing Cross-Site Scripting (XSS) vulnerabilities.",
          vi: "`textContent` tự động escape các thẻ độc hại, ngăn chặn hoàn toàn lỗ hổng bảo mật tấn công Cross-Site Scripting (XSS)."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_18_1",
      title: {
        en: "Dynamic Breadcrumb Builder",
        vi: "Tạo Thanh Điều Hướng Breadcrumb Động Bằng DOM API"
      },
      instruction: {
        en: "Write a function `buildBreadcrumbs(crumbs)` that takes an array of `{ label, href }` and returns a `<nav>` element containing an `<ol>` list with `<li>` links. The last item must be a `<span>` with `aria-current=\"page\"` instead of a link.",
        vi: "Viết hàm `buildBreadcrumbs(crumbs)` nhận mảng `{ label, href }` và trả về thẻ `<nav>` chứa danh sách `<ol>` với các thẻ `<li>` liên kết. Phần tử cuối cùng phải là thẻ `<span>` có `aria-current=\"page\"` thay vì liên kết `<a>`."
      },
      starterCode: `function buildBreadcrumbs(crumbs) {
  // Construct DOM breadcrumbs
}

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Keyboards", href: "/products/keyboards" }
];
const nav = buildBreadcrumbs(items);
console.log(nav.outerHTML);`,
      solutionCode: `function buildBreadcrumbs(crumbs) {
  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "Breadcrumb");

  const ol = document.createElement("ol");
  ol.className = "breadcrumb-list";

  crumbs.forEach((crumb, index) => {
    const li = document.createElement("li");
    const isLast = index === crumbs.length - 1;

    if (isLast) {
      const span = document.createElement("span");
      span.textContent = crumb.label;
      span.setAttribute("aria-current", "page");
      li.appendChild(span);
    } else {
      const a = document.createElement("a");
      a.href = crumb.href;
      a.textContent = crumb.label;
      li.appendChild(a);
    }

    ol.appendChild(li);
  });

  nav.appendChild(ol);
  return nav;
}`,
      hints: [
        {
          en: "Iterate with index. Check `index === crumbs.length - 1` to create span with aria-current or anchor link.",
          vi: "Duyệt qua chỉ số index. Kiểm tra `index === crumbs.length - 1` để tạo span với aria-current hoặc thẻ a."
        }
      ]
    },
    {
      id: "js_ex_18_2",
      title: {
        en: "DOM Tree Deep Search by Attribute",
        vi: "Tìm Kiếm Node Sâu Trong Cây DOM Theo Thuộc Tính"
      },
      instruction: {
        en: "Write a function `findNodesByDataAttr(rootNode, attrName, attrValue)` that recursively traverses child nodes of `rootNode` and returns an array of all element nodes having `element.dataset[attrName] === attrValue`.",
        vi: "Viết hàm `findNodesByDataAttr(rootNode, attrName, attrValue)` duyệt đệ quy cây con của `rootNode` và trả về mảng tất cả các element node có `element.dataset[attrName] === attrValue`."
      },
      starterCode: `function findNodesByDataAttr(rootNode, attrName, attrValue) {
  // Recursively find matching nodes
}`,
      solutionCode: `function findNodesByDataAttr(rootNode, attrName, attrValue) {
  const matches = [];

  function traverse(node) {
    if (!node || node.nodeType !== 1) return; // Only element nodes

    if (node.dataset && node.dataset[attrName] === attrValue) {
      matches.push(node);
    }

    for (const child of node.children) {
      traverse(child);
    }
  }

  traverse(rootNode);
  return matches;
}`,
      hints: [
        {
          en: "Check node.nodeType === 1 and compare node.dataset[attrName], then recurse on node.children.",
          vi: "Kiểm tra node.nodeType === 1 và so sánh node.dataset[attrName], sau đó đệ quy trên node.children."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_18",
    title: {
      en: "Lightweight Declarative Virtual DOM / Hyperscript Builder",
      vi: "Bộ Tạo Cây DOM Khai Báo Phong Cách Hyperscript (Mini JSX Engine)"
    },
    description: {
      en: "Build a hyperscript DOM factory function `h(tag, props, ...children)` that creates real DOM nodes. `props` can contain attributes, classes (`class` or `className`), dataset properties (`dataset`), and event listeners (keys starting with `on`, e.g. `onClick`). Children can be nested elements or strings/numbers.",
      vi: "Xây dựng hàm tạo DOM khai báo `h(tag, props, ...children)` tạo ra các DOM node thực tế. `props` có thể chứa thuộc tính, class, dataset và event listener (key bắt đầu bằng `on`, ví dụ `onClick`). Children có thể là các element lồng nhau hoặc chuỗi/số."
    },
    starterCode: `function h(tag, props, ...children) {
  // Implement hyperscript DOM generator
}

const vdom = h("div", { className: "card", dataset: { role: "admin" } },
  h("h2", null, "Title"),
  h("button", { onClick: () => console.log("Clicked") }, "Save")
);
console.log(vdom.outerHTML);`,
    solutionCode: `function h(tag, props, ...children) {
  const el = document.createElement(tag);

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, value);
      } else if (key === "className" || key === "class") {
        el.className = value;
      } else if (key === "dataset" && typeof value === "object") {
        Object.assign(el.dataset, value);
      } else if (key === "style" && typeof value === "object") {
        Object.assign(el.style, value);
      } else if (value !== null && value !== undefined) {
        el.setAttribute(key, value);
      }
    }
  }

  children.flat().forEach(child => {
    if (child === null || child === undefined) return;
    if (typeof child === "string" || typeof child === "number") {
      el.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });

  return el;
}`,
    hints: [
      {
        en: "Create element with document.createElement(tag). Process event handlers starting with 'on', apply className/dataset, and append text or element children.",
        vi: "Tạo thẻ với document.createElement(tag). Xử lý event handler bắt đầu bằng 'on', gán className/dataset và nối text node hoặc element con."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_18_1",
      type: "single_choice",
      question: {
        en: "What is the key performance benefit of using a `DocumentFragment` when adding multiple DOM nodes?",
        vi: "Lợi ích hiệu năng then chốt khi sử dụng `DocumentFragment` để thêm nhiều DOM node là gì?"
      },
      options: [
        { id: "a", text: { en: "It exists purely in memory; appending it to the real DOM triggers only a single layout reflow and repaint", vi: "Nó chỉ tồn tại trong bộ nhớ; khi gắn vào DOM thật chỉ kích hoạt đúng 1 lần Reflow và Repaint" } },
        { id: "b", text: { en: "It compresses the HTML file size", vi: "Nó nén dung lượng file HTML" } },
        { id: "c", text: { en: "It automatically translates text to English", vi: "Nó tự động dịch văn bản sang tiếng Anh" } },
        { id: "d", text: { en: "It bypasses JavaScript single-threading", vi: "Nó chạy bỏ qua mô hình đơn luồng của JavaScript" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "A DocumentFragment acts as an off-screen node buffer, minimizing expensive DOM rendering reflows.",
        vi: "DocumentFragment đóng vai trò như bộ đệm node ngoài màn hình, giảm thiểu các đợt reflow đắt đỏ."
      }
    },
    {
      id: "js_q_18_2",
      type: "predict_output",
      question: {
        en: "What does `document.querySelectorAll()` return?",
        vi: "`document.querySelectorAll()` trả về kiểu dữ liệu gì?"
      },
      options: [
        { id: "a", text: { en: "A static (non-live) NodeList containing all matched elements", vi: "Một NodeList tĩnh (không tự cập nhật) chứa toàn bộ phần tử khớp điều kiện" } },
        { id: "b", text: { en: "A standard JavaScript Array", vi: "Một mảng Array tiêu chuẩn của JavaScript" } },
        { id: "c", text: { en: "A live HTMLCollection", vi: "Một HTMLCollection động tự cập nhật" } },
        { id: "d", text: { en: "The first matched element or null", vi: "Phần tử đầu tiên khớp hoặc null" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`querySelectorAll()` returns a static NodeList representing a snapshot of elements matching the CSS selector at query time.",
        vi: "`querySelectorAll()` trả về một NodeList tĩnh đại diện cho ảnh chụp các phần tử khớp CSS selector tại thời điểm truy vấn."
      }
    },
    {
      id: "js_q_18_3",
      type: "single_choice",
      question: {
        en: "Why is `element.textContent` preferred over `element.innerHTML` for user-supplied string data?",
        vi: "Tại sao `element.textContent` an toàn hơn `element.innerHTML` khi hiển thị dữ liệu do người dùng nhập?"
      },
      options: [
        { id: "a", text: { en: "`textContent` treats all input as plain text without parsing HTML tags, preventing XSS attacks", vi: "`textContent` xử lý toàn bộ dữ liệu như văn bản thô không phân tích thẻ HTML, ngăn chặn tấn công XSS" } },
        { id: "b", text: { en: "`innerHTML` is deprecated in HTML5", vi: "`innerHTML` đã bị xóa bỏ trong HTML5" } },
        { id: "c", text: { en: "`textContent` converts text to uppercase", vi: "`textContent` tự động viết hoa văn bản" } },
        { id: "d", text: { en: "`textContent` only accepts numbers", vi: "`textContent` chỉ nhận số" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`textContent` avoids parsing input as HTML markup, mitigating injection vulnerabilities.",
        vi: "`textContent` không phân tích chuỗi thành mã HTML, giúp loại bỏ nguy cơ bị tấn công chèn mã độc."
      }
    },
    {
      id: "js_q_18_4",
      type: "predict_output",
      question: {
        en: "How do you access the custom HTML attribute `data-user-role=\"admin\"` in JavaScript?",
        vi: "Cách truy cập thuộc tính tùy biến `data-user-role=\"admin\"` trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "element.dataset.userRole", vi: "element.dataset.userRole" } },
        { id: "b", text: { en: "element.dataset['user-role']", vi: "element.dataset['user-role']" } },
        { id: "c", text: { en: "element.dataUserRole", vi: "element.dataUserRole" } },
        { id: "d", text: { en: "element.role", vi: "element.role" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The HTML dataset API maps kebab-case attributes `data-user-role` to camelCase properties `dataset.userRole`.",
        vi: "Dataset API tự động chuyển đổi thuộc tính dạng kebab-case `data-user-role` thành camelCase `dataset.userRole`."
      }
    },
    {
      id: "js_q_18_5",
      type: "single_choice",
      question: {
        en: "What is 'Layout Thrashing' in web performance?",
        vi: "'Layout Thrashing' trong tối ưu hiệu năng web là hiện tượng gì?"
      },
      options: [
        { id: "a", text: { en: "Rapidly interleaving DOM style writes and layout property reads, forcing repeated synchronous reflows", vi: "Việc đọc kích thước layout và ghi style xen kẽ liên tục, ép trình duyệt phải tính toán reflow đồng bộ nhiều lần" } },
        { id: "b", text: { en: "A CSS animation that runs at 120 FPS", vi: "Một animation CSS chạy ở 120 FPS" } },
        { id: "c", text: { en: "A server crash caused by heavy traffic", vi: "Server bị sập do lưu lượng truy cập cao" } },
        { id: "d", text: { en: "Using Tailwind with Bootstrap together", vi: "Sử dụng đồng thời Tailwind và Bootstrap" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Alternating writes (`el.style.width = '10px'`) and reads (`el.offsetWidth`) forces synchronous layout thrashing.",
        vi: "Xen kẽ lệnh ghi style và đọc kích thước ép trình duyệt phải tính toán lại layout liên tục, gây tụt khung hình nghiêm trọng."
      }
    },
    {
      id: "js_q_18_6",
      type: "predict_output",
      question: {
        en: "What does `element.classList.toggle('active', isOpened)` do when `isOpened` is a boolean?",
        vi: "Phương thức `element.classList.toggle('active', isOpened)` thực hiện điều gì khi `isOpened` là biến boolean?"
      },
      options: [
        { id: "a", text: { en: "If `isOpened` is true, adds the 'active' class; if false, removes the 'active' class", vi: "Nếu `isOpened` là true, thêm class 'active'; nếu false, xóa class 'active'" } },
        { id: "b", text: { en: "Always deletes the class regardless of boolean", vi: "Luôn xóa class bất kể giá trị boolean" } },
        { id: "c", text: { en: "Throws a TypeError", vi: "Ném lỗi TypeError" } },
        { id: "d", text: { en: "Toggles the class twice", vi: "Bật tắt class 2 lần" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The second parameter of `classList.toggle` acts as a force flag: `true` adds, `false` removes.",
        vi: "Tham số thứ hai của `classList.toggle` đóng vai trò là cờ ép buộc: `true` sẽ thêm, `false` sẽ xóa."
      }
    },
    {
      id: "js_q_18_7",
      type: "fill_blank",
      question: {
        en: "To instantly empty all child nodes of a parent element in modern browsers, call parentElement._____ ().",
        vi: "Để xóa sạch toàn bộ các node con của một phần tử cha trong trình duyệt hiện đại, gọi parentElement._____ ()."
      },
      correctAnswer: "replaceChildren",
      explanation: {
        en: "`parentElement.replaceChildren()` with no arguments cleanly empties all children without innerHTML overhead.",
        vi: "`parentElement.replaceChildren()` khi không truyền tham số sẽ xóa sạch toàn bộ node con một cách tối ưu."
      }
    },
    {
      id: "js_q_18_8",
      type: "single_choice",
      question: {
        en: "What is the difference between `element.remove()` and `parentElement.removeChild(child)`?",
        vi: "Điểm khác biệt giữa `element.remove()` và `parentElement.removeChild(child)` là gì?"
      },
      options: [
        { id: "a", text: { en: "`element.remove()` directly deletes the element without needing a reference to its parent node", vi: "`element.remove()` xóa trực tiếp phần tử mà không cần phải truy vết tới thẻ cha" } },
        { id: "b", text: { en: "`removeChild()` is asynchronous", vi: "`removeChild()` là bất đồng bộ" } },
        { id: "c", text: { en: "`element.remove()` only works on input tags", vi: "`element.remove()` chỉ hoạt động trên thẻ input" } },
        { id: "d", text: { en: "There is no difference in syntax", vi: "Không có sự khác biệt về cú pháp" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`element.remove()` is the modern convenient DOM method that removes the node directly from its tree.",
        vi: "`element.remove()` là phương thức hiện đại cho phép tự gỡ bỏ node khỏi cây DOM một cách thuận tiện."
      }
    },
    {
      id: "js_q_18_9",
      type: "predict_output",
      question: {
        en: "What will `console.log(document.getElementById('missing'))` return if no such element exists?",
        vi: "`document.getElementById('missing')` sẽ trả về giá trị gì nếu không tìm thấy phần tử?"
      },
      options: [
        { id: "a", text: { en: "null", vi: "null" } },
        { id: "b", text: { en: "undefined", vi: "undefined" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "An empty HTMLCollection", vi: "Một HTMLCollection rỗng" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`getElementById` and `querySelector` return `null` when no element matches the query.",
        vi: "`getElementById` và `querySelector` luôn trả về `null` khi không tìm thấy phần tử khớp."
      }
    },
    {
      id: "js_q_18_10",
      type: "code_reasoning",
      question: {
        en: "Why is `element.append('Hello ', node)` more versatile than `element.appendChild(node)`?",
        vi: "Tại sao `element.append('Hello ', node)` lại linh hoạt hơn `element.appendChild(node)`?"
      },
      options: [
        { id: "a", text: { en: "`append()` accepts multiple arguments and can insert plain strings directly as text nodes, whereas `appendChild()` accepts only 1 Node object", vi: "`append()` nhận nhiều đối số và có thể chèn chuỗi văn bản trực tiếp thành text node, trong khi `appendChild()` chỉ nhận đúng 1 Node object" } },
        { id: "b", text: { en: "`append()` runs in WebAssembly", vi: "`append()` chạy trong WebAssembly" } },
        { id: "c", text: { en: "`appendChild()` deletes the CSS stylesheet", vi: "`appendChild()` xóa file CSS" } },
        { id: "d", text: { en: "`append()` is deprecated", vi: "`append()` đã bị lỗi thời" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The modern `append()` API supports variadic arguments and automatic DOMString-to-TextNode conversion.",
        vi: "API hiện đại `append()` hỗ trợ truyền nhiều tham số và tự động chuyển đổi chuỗi thành TextNode."
      }
    }
  ]
};

// Write Lesson 17 and 18
fs.writeFileSync(path.join(dir, 'lesson17.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson17: Lesson = ${JSON.stringify(lesson17, null, 2)};\nexport default lesson17;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson18.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson18: Lesson = ${JSON.stringify(lesson18, null, 2)};\nexport default lesson18;\n`, 'utf8');
console.log('Lessons 17 and 18 generated.');
