import { Lesson } from '../../../../types';

export const lesson17: Lesson = {
  "id": "js_lesson_17",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_4",
  "order": 17,
  "title": {
    "en": "ES6 Classes, Private Fields & Object-Oriented Patterns",
    "vi": "ES6 Classes, Trường Riêng Tư (#) & Các Mẫu Hướng Đối Tượng"
  },
  "summary": {
    "en": "Master ES6 class syntax, constructors, getters/setters, static properties, true private `#field` encapsulation, subclassing with `extends`, and `super` invocation.",
    "vi": "Làm chủ cú pháp ES6 class, hàm khởi tạo constructor, getter/setter, thuộc tính tĩnh static, đóng gói dữ liệu riêng tư thực thụ bằng `#field`, kế thừa bằng `extends` và gọi `super`."
  },
  "estimatedMinutes": 22,
  "topicId": "js_classes_oop",
  "learn": {
    "introduction": {
      "en": "ES6 Classes provide clean, declarative syntax for object-oriented programming in JavaScript. Under the hood, classes are syntactic sugar over the prototypal inheritance model, but modern features like true private class fields (`#privateField`), static blocks, and ergonomic inheritance (`extends` and `super`) make JavaScript classes robust and expressive for enterprise domain modeling.",
      "vi": "ES6 Classes mang đến cú pháp khai báo rõ ràng, chuẩn mực cho lập trình hướng đối tượng trong JavaScript. Về bản chất, class là lớp vỏ cú pháp (syntactic sugar) trên nền tảng Prototypal Inheritance, nhưng các tính năng hiện đại như trường riêng tư thực sự (`#privateField`), khối static và cơ chế kế thừa (`extends`, `super`) giúp việc thiết kế mô hình nghiệp vụ trở nên mạch lạc và an toàn tuyệt đối."
    },
    "conceptExplanation": {
      "en": "1. Class Declaration & Constructors: The `constructor()` method runs upon `new ClassName()`. Instance fields can be declared directly in the class body without assigning in the constructor.\n\n2. True Private Fields (`#`): Properties prefixed with `#` (e.g. `#apiKey`) are enforced at the engine level. They cannot be accessed, read, or deleted outside the class body, solving the legacy `_private` naming convention defect.\n\n3. Getters & Setters: Define computed accessors using `get prop()` and `set prop(value)` to encapsulate validation rules.\n\n4. Static Members & Static Blocks: `static` methods and fields belong to the class constructor itself rather than instances. Static initialization blocks `static { ... }` execute once when the class is loaded.\n\n5. Subclassing with `extends` and `super`: In derived classes, `super()` MUST be invoked before accessing `this` in the constructor. `super.method()` delegates to the parent prototype.",
      "vi": "1. Khai Báo Class & Constructor: Hàm `constructor()` thực thi khi gọi `new ClassName()`. Các trường instance có thể khai báo trực tiếp trong thân class.\n\n2. Trường Riêng Tư Thực Sự (`#`): Các trường bắt đầu bằng `#` (ví dụ `#apiKey`) được bảo vệ ở cấp độ engine. Không thể truy cập, đọc hay xóa từ bên ngoài class, giải quyết triệt để vấn đề của quy ước `_private` trước đây.\n\n3. Getters & Setters: Định nghĩa hàm truy cập và gán dữ liệu qua `get prop()` và `set prop(value)` để đóng gói logic kiểm tra hợp lệ.\n\n4. Thành Viên Static: Phương thức và trường `static` thuộc về chính class chứ không thuộc về instance. Khối `static { ... }` chạy 1 lần duy nhất khi class được nạp vào bộ nhớ.\n\n5. Kế Thừa Bằng `extends` và `super`: Trong class con, `super()` BẮT BUỘC phải được gọi trước khi dùng `this` trong constructor. `super.method()` cho phép gọi phương thức của class cha."
    },
    "syntax": "// 1. Modern class with private field, getters, and static factory\nclass SecureUser {\n  #passwordHash; // True private field!\n  static #minPasswordLength = 8;\n\n  constructor(email, rawPassword) {\n    this.email = email;\n    this.#setPassword(rawPassword);\n  }\n\n  #setPassword(rawPassword) {\n    if (rawPassword.length < SecureUser.#minPasswordLength) {\n      throw new Error(\"Password too short\");\n    }\n    this.#passwordHash = `hash_${rawPassword}`;\n  }\n\n  verifyPassword(candidate) {\n    return this.#passwordHash === `hash_${candidate}`;\n  }\n\n  static createGuest() {\n    return new SecureUser(\"guest@app.local\", \"GuestSecret123\");\n  }\n}",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Polymorphic Payment Processing Hierarchy",
          "vi": "Hệ Thống Phân Cấp Xử Lý Thanh Toán Đa Hình Bằng ES6 Classes"
        },
        "description": {
          "en": "Demonstrates an abstract-like base class with private state, inheritance, and polymorphic method overrides.",
          "vi": "Minh họa class cha với trạng thái riêng tư, kế thừa class con và ghi đè phương thức đa hình."
        },
        "code": "class PaymentProcessor {\n  #transactionLog = [];\n\n  constructor(merchantId) {\n    if (new.target === PaymentProcessor) {\n      throw new Error(\"PaymentProcessor cannot be instantiated directly\");\n    }\n    this.merchantId = merchantId;\n  }\n\n  #record(status, amount) {\n    this.#transactionLog.push({ status, amount, timestamp: Date.now() });\n  }\n\n  async process(amount) {\n    throw new Error(\"process() must be implemented by subclass\");\n  }\n\n  getLogCount() {\n    return this.#transactionLog.length;\n  }\n}\n\nclass StripeProcessor extends PaymentProcessor {\n  constructor(merchantId, apiKey) {\n    super(merchantId);\n    this.apiKey = apiKey;\n  }\n\n  async process(amount) {\n    console.log(`Charging $${amount} via Stripe (Merchant: ${this.merchantId})`);\n    return { success: true, txnId: \"ch_stripe_999\" };\n  }\n}\n\nconst stripe = new StripeProcessor(\"acct_123\", \"sk_live_abc\");\nstripe.process(99.99);"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Accessing `this` before calling `super()` inside a derived class constructor.",
          "vi": "Truy cập `this` trước khi gọi `super()` bên trong constructor của class con."
        },
        "correction": {
          "en": "Always call `super(...args)` on the very first line of a derived class constructor before referencing `this`.",
          "vi": "Luôn gọi `super(...args)` ở dòng đầu tiên trong constructor của class con trước khi dùng `this`."
        }
      }
    ],
    "tips": [
      {
        "en": "Use true #private fields instead of underscores for sensitive internals: The `#` syntax is strictly enforced by JavaScript runtimes, preventing external modification and leaking private state.",
        "vi": "Dùng trường #private thay vì tiền tố gạch dưới _ cho dữ liệu nhạy cảm: Cú pháp `#` được runtime JS bảo vệ tuyệt đối, ngăn chặn can thiệp trái phép và rò rỉ dữ liệu nhạy cảm."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_17_1",
      "type": "complete_code",
      "title": {
        "en": "Build a Validated BankAccount Class with Private Balance",
        "vi": "Xây Dựng Class BankAccount Có Kiểm Soát Số Dư Riêng Tư"
      },
      "instruction": {
        "en": "Create a class `BankAccount` with private field `#balance`. Provide getter `balance`, method `deposit(amount)`, and method `withdraw(amount)`. Prevent negative deposits/withdrawals and prevent overdrafts with descriptive Error throws.",
        "vi": "Tạo class `BankAccount` có trường riêng tư `#balance`. Cung cấp getter `balance`, phương thức `deposit(amount)` và `withdraw(amount)`. Ngăn chặn nạp/rút số âm và không cho rút quá số dư bằng cách ném Error."
      },
      "starterCode": "class BankAccount {\n  // Implement BankAccount class with #balance\n}\n\nconst acc = new BankAccount(100);\nacc.deposit(50);\nconsole.log(acc.balance); // 150\nacc.withdraw(30);\nconsole.log(acc.balance); // 120",
      "solutionCode": "class BankAccount {\n  #balance;\n\n  constructor(initialBalance = 0) {\n    if (initialBalance < 0) {\n      throw new Error(\"Initial balance cannot be negative\");\n    }\n    this.#balance = initialBalance;\n  }\n\n  get balance() {\n    return this.#balance;\n  }\n\n  deposit(amount) {\n    if (amount <= 0) {\n      throw new Error(\"Deposit amount must be greater than 0\");\n    }\n    this.#balance += amount;\n    return this.#balance;\n  }\n\n  withdraw(amount) {\n    if (amount <= 0) {\n      throw new Error(\"Withdrawal amount must be greater than 0\");\n    }\n    if (amount > this.#balance) {\n      throw new Error(\"Insufficient funds\");\n    }\n    this.#balance -= amount;\n    return this.#balance;\n  }\n}",
      "hint": {
        "en": "Declare `#balance;` at top of class. In methods, validate amount > 0 and amount <= #balance before updating.",
        "vi": "Khai báo `#balance;` ở đầu class. Trong các method, kiểm tra amount > 0 và amount <= #balance trước khi cập nhật."
      }
    },
    {
      "id": "js_ex_17_2",
      "type": "complete_code",
      "title": {
        "en": "Class Inheritance with Shape & Rectangle Geometry",
        "vi": "Kế Thừa Hình Học Đa Giác Bằng Class Shape & Rectangle"
      },
      "instruction": {
        "en": "Create a base class `Shape` with property `name` and method `getArea()`. Create a subclass `Rectangle` inheriting from `Shape` with properties `width` and `height`, overriding `getArea()` and adding `getPerimeter()`.",
        "vi": "Tạo class cha `Shape` có thuộc tính `name` và phương thức `getArea()`. Tạo class con `Rectangle` kế thừa từ `Shape` có thuộc tính `width` và `height`, ghi đè `getArea()` và bổ sung `getPerimeter()`."
      },
      "starterCode": "// Implement Shape and Rectangle classes\nconst rect = new Rectangle(10, 5);\nconsole.log(rect.name); // \"Rectangle\"\nconsole.log(rect.getArea()); // 50\nconsole.log(rect.getPerimeter()); // 30",
      "solutionCode": "class Shape {\n  constructor(name = \"Shape\") {\n    this.name = name;\n  }\n\n  getArea() {\n    return 0;\n  }\n}\n\nclass Rectangle extends Shape {\n  constructor(width, height) {\n    super(\"Rectangle\");\n    this.width = width;\n    this.height = height;\n  }\n\n  getArea() {\n    return this.width * this.height;\n  }\n\n  getPerimeter() {\n    return 2 * (this.width + this.height);\n  }\n}",
      "hint": {
        "en": "Call `super('Rectangle')` inside `Rectangle` constructor, and calculate width * height in getArea().",
        "vi": "Gọi `super('Rectangle')` trong constructor của `Rectangle` và tính width * height trong getArea()."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_17",
    "title": {
      "en": "Enterprise Event Emitter Class with Once & Wildcards",
      "vi": "Xây Dựng Class EventEmitter Doanh Nghiệp Hỗ Trợ Once & Wildcard"
    },
    "description": {
      "en": "Build a robust `EventEmitter` class with private field `#events`. Implement `on(event, listener)`, `once(event, listener)` (auto-unsubscribes after 1 call), `off(event, listener)`, and `emit(event, ...args)`. Return an unsubscribe function from `on()`.",
      "vi": "Xây dựng class `EventEmitter` hoàn chỉnh với trường riêng tư `#events`. Cài đặt các phương thức `on(event, listener)`, `once(event, listener)` (tự hủy sau 1 lần gọi), `off(event, listener)` và `emit(event, ...args)`. Phương thức `on()` phải trả về hàm unsubscribe."
    },
    "starterCode": "class EventEmitter {\n  // Implement full EventEmitter\n}\n\nconst bus = new EventEmitter();\nconst unsub = bus.on(\"data\", val => console.log(\"Received:\", val));\nbus.emit(\"data\", 42); // \"Received: 42\"\nunsub();\nbus.emit(\"data\", 99); // Nothing emitted",
    "solutionCode": "class EventEmitter {\n  #events = new Map();\n\n  on(event, listener) {\n    if (typeof listener !== 'function') throw new TypeError(\"Listener must be a function\");\n    if (!this.#events.has(event)) {\n      this.#events.set(event, new Set());\n    }\n    this.#events.get(event).add(listener);\n\n    return () => this.off(event, listener);\n  }\n\n  once(event, listener) {\n    const wrapper = (...args) => {\n      this.off(event, wrapper);\n      listener.apply(this, args);\n    };\n    return this.on(event, wrapper);\n  }\n\n  off(event, listener) {\n    if (this.#events.has(event)) {\n      this.#events.get(event).delete(listener);\n      if (this.#events.get(event).size === 0) {\n        this.#events.delete(event);\n      }\n    }\n  }\n\n  emit(event, ...args) {\n    if (!this.#events.has(event)) return false;\n    const listeners = [...this.#events.get(event)];\n    for (const fn of listeners) {\n      fn(...args);\n    }\n    return true;\n  }\n}",
    "hints": [
      {
        "en": "Use a Map of Sets for `#events`. Wrap listeners in a self-cleaning handler for `once`.",
        "vi": "Dùng Map chứa các Set cho `#events`. Bọc listener trong một hàm tự hủy cho `once`."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Enterprise Event Emitter Class with Once & Wildcards according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Xây Dựng Class EventEmitter Doanh Nghiệp Hỗ Trợ Once & Wildcard theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_17_1",
      "type": "single_choice",
      "question": {
        "en": "How are true private instance fields declared in modern ES6+ classes?",
        "vi": "Trường riêng tư thực sự (private field) được khai báo như thế nào trong ES6+ Class?"
      },
      "options": [
        {
          "en": "Prefixing the field name with `#` (e.g. `#balance`)",
          "vi": "Thêm tiền tố `#` trước tên trường (ví dụ `#balance`)"
        },
        {
          "en": "Prefixing with `private ` keyword",
          "vi": "Dùng từ khóa `private `"
        },
        {
          "en": "Prefixing with an underscore `_balance`",
          "vi": "Dùng tiền tố gạch dưới `_balance`"
        },
        {
          "en": "Wrapping with Object.seal()",
          "vi": "Bọc bằng Object.seal()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `#field` syntax is enforced directly by the JavaScript runtime engine.",
        "vi": "Cú pháp `#field` được runtime engine của JavaScript kiểm soát và bảo vệ trực tiếp."
      },
      "topicId": "js_classes_oop",
      "difficulty": "easy"
    },
    {
      "id": "js_q_17_2",
      "type": "predict_output",
      "question": {
        "en": "What happens if external code tries to access `user.#secret` from outside the class?",
        "vi": "Điều gì xảy ra nếu mã bên ngoài cố tình truy cập `user.#secret` từ ngoài class?"
      },
      "options": [
        {
          "en": "Throws a SyntaxError at parse time / runtime",
          "vi": "Ném lỗi SyntaxError ngay tại thời điểm phân tích cú pháp / runtime"
        },
        {
          "en": "Returns undefined",
          "vi": "Trả về undefined"
        },
        {
          "en": "Returns null",
          "vi": "Trả về null"
        },
        {
          "en": "Prints a console warning",
          "vi": "In cảnh báo ra console"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Private identifier `#secret` is not accessible outside class declaration syntax, resulting in a fatal SyntaxError.",
        "vi": "Mã định danh riêng tư `#secret` không thể truy cập bên ngoài class, gây lỗi SyntaxError."
      },
      "topicId": "js_classes_oop",
      "difficulty": "easy"
    },
    {
      "id": "js_q_17_3",
      "type": "single_choice",
      "question": {
        "en": "What must be called in a derived class constructor before accessing `this`?",
        "vi": "Lệnh nào BẮT BUỘC phải gọi trong constructor của class con trước khi truy cập `this`?"
      },
      "options": [
        {
          "en": "super(...args)",
          "vi": "super(...args)"
        },
        {
          "en": "this.init()",
          "vi": "this.init()"
        },
        {
          "en": "Object.create(this)",
          "vi": "Object.create(this)"
        },
        {
          "en": "parent.constructor()",
          "vi": "parent.constructor()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Calling `super()` initializes the parent constructor and binds the instance `this`.",
        "vi": "Gọi `super()` khởi chạy constructor của class cha và liên kết instance `this`."
      },
      "topicId": "js_classes_oop",
      "difficulty": "easy"
    },
    {
      "id": "js_q_17_4",
      "type": "predict_output",
      "question": {
        "en": "What is a `static` method attached to in a JavaScript class?",
        "vi": "Phương thức `static` trong class JavaScript được gắn vào đâu?"
      },
      "options": [
        {
          "en": "The Class constructor function itself, NOT the instances or prototype",
          "vi": "Chính hàm constructor của Class, KHÔNG nằm trên instance hay prototype"
        },
        {
          "en": "Every individual instance object",
          "vi": "Từng đối tượng instance riêng biệt"
        },
        {
          "en": "The window global object",
          "vi": "Đối tượng toàn cục window"
        },
        {
          "en": "Array.prototype",
          "vi": "Array.prototype"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Static members are called directly on the class (e.g. `Math.max()` or `User.create()`).",
        "vi": "Thành viên static được gọi trực tiếp thông qua tên class (ví dụ `Math.max()` hoặc `User.create()`)."
      },
      "topicId": "js_classes_oop",
      "difficulty": "medium"
    },
    {
      "id": "js_q_17_5",
      "type": "single_choice",
      "question": {
        "en": "What is `new.target` inside a constructor?",
        "vi": "`new.target` bên trong một constructor mang ý nghĩa gì?"
      },
      "options": [
        {
          "en": "A reference to the constructor function that was invoked with `new` (useful for detecting abstract classes)",
          "vi": "Tham chiếu tới hàm constructor được gọi cùng với từ khóa `new` (dùng để phát hiện class trừu tượng)"
        },
        {
          "en": "The DOM click target element",
          "vi": "Phần tử DOM mục tiêu click"
        },
        {
          "en": "The timestamp when the object was created",
          "vi": "Timestamp lúc đối tượng được tạo"
        },
        {
          "en": "The IP address of the user",
          "vi": "Địa chỉ IP của người dùng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`new.target` points to the class invoked by `new`. If `new.target === BaseClass`, you can block direct instantiation.",
        "vi": "`new.target` trỏ tới class được gọi bởi `new`. Nếu `new.target === BaseClass`, bạn có thể chặn việc khởi tạo trực tiếp class cha."
      },
      "topicId": "js_classes_oop",
      "difficulty": "medium"
    },
    {
      "id": "js_q_17_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` print?\n```js\nclass Box {\n  #val = 10;\n  get double() { return this.#val * 2; }\n}\nconst b = new Box();\nconsole.log(b.double);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nclass Box {\n  #val = 10;\n  get double() { return this.#val * 2; }\n}\nconst b = new Box();\nconsole.log(b.double);\n```"
      },
      "options": [
        {
          "en": "20",
          "vi": "20"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "Function double",
          "vi": "Function double"
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
        "en": "The getter method is accessed like a normal property `b.double`, invoking the getter function and returning 20.",
        "vi": "Phương thức getter được truy cập như một thuộc tính thông thường `b.double`, thực thi hàm và trả về 20."
      },
      "topicId": "js_classes_oop",
      "difficulty": "medium"
    },
    {
      "id": "js_q_17_7",
      "type": "fill_blank",
      "question": {
        "en": "To inherit a parent class in ES6, use the class Child _____ Parent syntax.",
        "vi": "Để kế thừa class cha trong ES6, sử dụng cú pháp class Child _____ Parent."
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
        "en": "The `extends` keyword establishes prototypal inheritance between classes.",
        "vi": "Từ khóa `extends` thiết lập quan hệ kế thừa prototype giữa các class."
      },
      "topicId": "js_classes_oop",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "extends"
      ]
    },
    {
      "id": "js_q_17_8",
      "type": "single_choice",
      "question": {
        "en": "Can class declarations be hoisted before their definition line like `function` declarations?",
        "vi": "Khai báo class có được hoist để sử dụng trước dòng định nghĩa như khai báo `function` không?"
      },
      "options": [
        {
          "en": "No, classes reside in the Temporal Dead Zone (TDZ) and throw a ReferenceError if accessed before declaration",
          "vi": "Không, class nằm trong Temporal Dead Zone (TDZ) và ném lỗi ReferenceError nếu gọi trước dòng khai báo"
        },
        {
          "en": "Yes, classes are fully hoisted",
          "vi": "Có, class được hoist hoàn toàn"
        },
        {
          "en": "Only static classes are hoisted",
          "vi": "Chỉ class static mới được hoist"
        },
        {
          "en": "Only in Node.js",
          "vi": "Chỉ trong Node.js"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Unlike function declarations, class declarations are let/const-like and cannot be evaluated before declaration.",
        "vi": "Khác với khai báo function, class có hành vi giống let/const và không thể sử dụng trước khi được định nghĩa."
      },
      "topicId": "js_classes_oop",
      "difficulty": "hard"
    },
    {
      "id": "js_q_17_9",
      "type": "predict_output",
      "question": {
        "en": "What does the `super` keyword reference inside a method of a subclass?",
        "vi": "Từ khóa `super` bên trong một phương thức của subclass tham chiếu tới cái gì?"
      },
      "options": [
        {
          "en": "The prototype of the parent superclass",
          "vi": "Prototype của class cha"
        },
        {
          "en": "The window object",
          "vi": "Đối tượng window"
        },
        {
          "en": "The document object",
          "vi": "Đối tượng document"
        },
        {
          "en": "The child instance",
          "vi": "Instance của class con"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`super.method()` invokes the method defined on the parent class prototype, binding `this` to current instance.",
        "vi": "`super.method()` thực thi phương thức định nghĩa trên prototype của class cha với `this` trỏ vào instance hiện tại."
      },
      "topicId": "js_classes_oop",
      "difficulty": "hard"
    },
    {
      "id": "js_q_17_10",
      "type": "single_choice",
      "question": {
        "en": "Why is composition often preferred over deep multi-level class inheritance hierarchies?",
        "vi": "Tại sao nguyên lý Composition (kết hợp) thường được ưu tiên hơn kế thừa đa tầng (Inheritance) sâu?"
      },
      "options": [
        {
          "en": "Composition avoids fragile base class issues and tight coupling by combining focused modular behaviors rather than rigid tree hierarchies",
          "vi": "Composition tránh được lỗi class cha mỏng manh và giảm phụ thuộc cứng bằng cách lắp ghép các module hành vi độc lập thay vì cây kế thừa cứng nhắc"
        },
        {
          "en": "Inheritance is forbidden in TypeScript",
          "vi": "TypeScript cấm dùng kế thừa"
        },
        {
          "en": "Classes use too much memory",
          "vi": "Class tốn quá nhiều RAM"
        },
        {
          "en": "Composition makes code execute 100x faster",
          "vi": "Composition giúp code chạy nhanh gấp 100 lần"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Favoring composition ('has-a') over inheritance ('is-a') produces more flexible, testable, and maintainable software architectures.",
        "vi": "Ưu tiên Composition ('has-a') hơn Inheritance ('is-a') giúp kiến trúc phần mềm linh hoạt, dễ test và dễ bảo trì hơn."
      },
      "topicId": "js_classes_oop",
      "difficulty": "hard"
    }
  ]
};
export default lesson17;
