import { Lesson } from '../../../../types';

export const lesson16: Lesson = {
  "id": "js_lesson_16",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_4",
  "order": 16,
  "title": {
    "en": "Prototypes & Prototypal Inheritance Mechanics",
    "vi": "Prototypes & Cơ Chế Kế Thừa Nguyên Mẫu (Prototypal Inheritance)"
  },
  "summary": {
    "en": "Master the JavaScript prototype chain, Object.prototype, constructor functions, Object.create, the difference between __proto__ and prototype, and property shadowing.",
    "vi": "Làm chủ chuỗi prototype chain, Object.prototype, hàm khởi tạo constructor, Object.create, phân biệt __proto__ vs prototype và cơ chế property shadowing."
  },
  "estimatedMinutes": 22,
  "topicId": "js_prototypes_inheritance",
  "learn": {
    "introduction": {
      "en": "Unlike traditional class-based languages (Java, C++) which instantiate objects by copying class blueprints, JavaScript utilizes prototypal inheritance. Every object has an internal link (`[[Prototype]]`) pointing to another object. When accessing a property or method, the JavaScript engine traverses up the prototype chain until it finds the member or reaches `null` at the top of `Object.prototype`.",
      "vi": "Khác với các ngôn ngữ hướng đối tượng cổ điển dựa trên class (Java, C++) vốn tạo đối tượng bằng cách sao chép khuôn mẫu, JavaScript sử dụng mô hình kế thừa nguyên mẫu (Prototypal Inheritance). Mỗi đối tượng đều có một liên kết nội bộ (`[[Prototype]]`) trỏ tới một đối tượng khác. Khi truy cập thuộc tính hoặc phương thức, engine JavaScript sẽ duyệt ngược lên chuỗi Prototype Chain cho đến khi tìm thấy hoặc chạm tới `null` ở đỉnh của `Object.prototype`."
    },
    "conceptExplanation": {
      "en": "1. The Prototype Chain: If `obj.prop` is not found on `obj`, the engine checks `Object.getPrototypeOf(obj)`, then that object's prototype, up to `Object.prototype`, then `null`.\n\n2. `prototype` vs `__proto__` / `[[Prototype]]`:\n   - `ConstructorFunction.prototype`: The blueprint object attached to constructor functions that will become the `[[Prototype]]` of any instances created with `new`.\n   - `Object.getPrototypeOf(instance)` (formerly `__proto__`): The actual live reference on an instance pointing to its fallback prototype object.\n\n3. Property Shadowing: Defining a property directly on an instance overrides (shadows) a property of the same name on its prototype without modifying the prototype.\n\n4. `Object.create(proto)`: Creates a brand-new object with its `[[Prototype]]` set directly to `proto` without running a constructor.",
      "vi": "1. Chuỗi Prototype Chain: Nếu `obj.prop` không có trên `obj`, engine kiểm tra `Object.getPrototypeOf(obj)`, rồi tiếp tục duyệt lên cho đến `Object.prototype`, và cuối cùng là `null`.\n\n2. Phân Biệt `prototype` vs `[[Prototype]]` (hoặc `__proto__`):\n   - `ConstructorFunction.prototype`: Đối tượng khuôn mẫu gắn trên hàm constructor, sẽ trở thành `[[Prototype]]` của các instance được tạo bằng từ khóa `new`.\n   - `Object.getPrototypeOf(instance)`: Tham chiếu thực tế trên instance trỏ tới đối tượng prototype của nó.\n\n3. Cơ Chế Che Khuất (Property Shadowing): Khai báo thuộc tính trực tiếp trên instance sẽ che khuất thuộc tính cùng tên trên prototype mà không làm thay đổi prototype.\n\n4. `Object.create(proto)`: Khởi tạo một đối tượng mới hoàn toàn với `[[Prototype]]` trỏ trực tiếp tới `proto` mà không cần chạy qua hàm constructor."
    },
    "syntax": "// 1. Classic Constructor Function and Prototype Attachment\nfunction Vehicle(make, model) {\n  this.make = make;\n  this.model = model;\n}\n\n// Methods are placed on .prototype to share memory across all instances!\nVehicle.prototype.getInfo = function() {\n  return `${this.make} ${this.model}`;\n};\n\nconst car = new Vehicle(\"Toyota\", \"Corolla\");\nconsole.log(car.getInfo()); // \"Toyota Corolla\"\nconsole.log(Object.getPrototypeOf(car) === Vehicle.prototype); // true\n\n// 2. Pure Prototypal Linkage with Object.create\nconst baseLogger = {\n  log(msg) { console.log(`[${this.prefix || \"LOG\"}] ${msg}`); }\n};\nconst appLogger = Object.create(baseLogger);\nappLogger.prefix = \"APP\";\nappLogger.log(\"Started successfully\"); // \"[APP] Started successfully\"",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Classical Prototypal Subclassing Chain",
          "vi": "Kế Thừa Đa Tầng Bằng Chuỗi Prototype Cổ Điển"
        },
        "description": {
          "en": "Demonstrates subclassing with Constructor.prototype = Object.create(Super.prototype) and fixing the constructor property.",
          "vi": "Minh họa kế thừa giữa các hàm constructor bằng Object.create và phục hồi thuộc tính constructor."
        },
        "code": "function Animal(name) {\n  this.name = name;\n}\nAnimal.prototype.speak = function() {\n  return `${this.name} makes a sound.`;\n};\n\nfunction Dog(name, breed) {\n  Animal.call(this, name); // Super call\n  this.breed = breed;\n}\n\n// Wire the prototype chain: Dog.prototype inherits from Animal.prototype\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog; // Repair constructor reference\n\nDog.prototype.bark = function() {\n  return `${this.name} barks loudly!`;\n};\n\nconst d = new Dog(\"Buddy\", \"Golden Retriever\");\nconsole.log(d.bark());  // \"Buddy barks loudly!\"\nconsole.log(d.speak()); // \"Buddy makes a sound.\" (from Animal.prototype)\nconsole.log(d instanceof Dog);    // true\nconsole.log(d instanceof Animal); // true"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Declaring methods directly inside the constructor function `this.method = function() {}` instead of on `Constructor.prototype`.",
          "vi": "Khai báo phương thức trực tiếp trong thân constructor `this.method = function() {}` thay vì gán trên `Constructor.prototype`."
        },
        "correction": {
          "en": "Attach shared methods to `Constructor.prototype` so 10,000 instances share a single memory reference.",
          "vi": "Gắn các phương thức dùng chung lên `Constructor.prototype` để 10,000 instance cùng chia sẻ 1 bản copy duy nhất trong bộ nhớ."
        }
      }
    ],
    "tips": [
      {
        "en": "Use Object.getPrototypeOf() and Object.setPrototypeOf() instead of __proto__: `__proto__` is an accessor property that is considered legacy. Use the standard static `Object.getPrototypeOf(obj)` for clean inspection.",
        "vi": "Dùng Object.getPrototypeOf() thay cho thuộc tính __proto__: `__proto__` là cú pháp cũ. Hãy dùng `Object.getPrototypeOf(obj)` chuẩn hóa để kiểm tra prototype an toàn."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_16_1",
      "type": "complete_code",
      "title": {
        "en": "Inspect Prototype Chain Depth",
        "vi": "Đo Độ Sâu Của Chuỗi Prototype Chain"
      },
      "instruction": {
        "en": "Write a function `getPrototypeChain(obj)` that traverses up the prototype chain of `obj` using `Object.getPrototypeOf()` and returns an array of all prototype objects up to (and including) `Object.prototype`.",
        "vi": "Viết hàm `getPrototypeChain(obj)` duyệt ngược lên chuỗi prototype của `obj` bằng `Object.getPrototypeOf()` và trả về mảng chứa tất cả các đối tượng prototype cho tới (và bao gồm) `Object.prototype`."
      },
      "starterCode": "function getPrototypeChain(obj) {\n  // Traverse and return array of prototypes\n}\n\nconst arr = [1, 2, 3];\nconst chain = getPrototypeChain(arr);\nconsole.log(chain.length); // 2 (Array.prototype, Object.prototype)",
      "solutionCode": "function getPrototypeChain(obj) {\n  if (obj === null || obj === undefined) return [];\n  const prototypes = [];\n  let current = Object.getPrototypeOf(obj);\n  while (current !== null) {\n    prototypes.push(current);\n    current = Object.getPrototypeOf(current);\n  }\n  return prototypes;\n}",
      "hint": {
        "en": "Use a while loop checking `current !== null` and step up with `current = Object.getPrototypeOf(current)`.",
        "vi": "Dùng vòng lặp while kiểm tra `current !== null` và bước lên bằng `current = Object.getPrototypeOf(current)`."
      }
    },
    {
      "id": "js_ex_16_2",
      "type": "complete_code",
      "title": {
        "en": "Custom Object.create Polyfill Implementation",
        "vi": "Tự Cài Đặt Hàm Khởi Tạo Object.create"
      },
      "instruction": {
        "en": "Implement a function `customCreate(proto, propertiesObject)` that creates a new object whose `[[Prototype]]` is `proto`. If `propertiesObject` is supplied, define those properties on the new object using `Object.defineProperties()`.",
        "vi": "Cài đặt hàm `customCreate(proto, propertiesObject)` tạo ra đối tượng mới có `[[Prototype]]` là `proto`. Nếu có `propertiesObject`, định nghĩa các thuộc tính đó lên đối tượng mới bằng `Object.defineProperties()`."
      },
      "starterCode": "function customCreate(proto, propertiesObject) {\n  // Implement Object.create polyfill\n}\n\nconst parent = { greet() { return \"Hello from parent\"; } };\nconst child = customCreate(parent, {\n  name: { value: \"ChildObj\", enumerable: true }\n});\nconsole.log(child.greet()); // \"Hello from parent\"\nconsole.log(child.name);    // \"ChildObj\"",
      "solutionCode": "function customCreate(proto, propertiesObject) {\n  if (typeof proto !== 'object' && typeof proto !== 'function') {\n    throw new TypeError('Object prototype may only be an Object or null');\n  }\n\n  function F() {}\n  F.prototype = proto;\n  const obj = new F();\n\n  if (proto === null) {\n    Object.setPrototypeOf(obj, null);\n  }\n\n  if (propertiesObject !== undefined) {\n    Object.defineProperties(obj, propertiesObject);\n  }\n\n  return obj;\n}",
      "hint": {
        "en": "Create a temporary constructor F, assign F.prototype = proto, instantiate `new F()`, and define properties if provided.",
        "vi": "Tạo hàm constructor tạm F, gán F.prototype = proto, khởi tạo `new F()` và định nghĩa thuộc tính nếu có."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_16",
    "title": {
      "en": "Multiple Mixin Inheritance Composer via Prototypes",
      "vi": "Bộ Ghép Nối Đa Kế Thừa Mixins Bằng Prototype Chain"
    },
    "description": {
      "en": "Create a utility function `composeMixins(TargetConstructor, ...mixins)` that copies all methods (including getters and non-enumerable descriptor configurations) from multiple mixin objects onto `TargetConstructor.prototype` without overwriting existing prototype methods unless explicitly intended.",
      "vi": "Xây dựng hàm tiện ích `composeMixins(TargetConstructor, ...mixins)` sao chép toàn bộ phương thức (bao gồm getter/setter và cấu hình descriptor) từ nhiều mixin object lên `TargetConstructor.prototype` mà không ghi đè phương thức đang có trừ khi được chỉ định."
    },
    "starterCode": "function composeMixins(TargetConstructor, ...mixins) {\n  // Compose mixins onto TargetConstructor.prototype\n}\n\nconst SerializableMixin = {\n  toJSON() { return JSON.stringify(this); }\n};\nconst ObservableMixin = {\n  emit(event) { console.log(`Emitted ${event} from ${this.name}`); }\n};\n\nfunction User(name) { this.name = name; }\ncomposeMixins(User, SerializableMixin, ObservableMixin);\n\nconst u = new User(\"Elena\");\nu.emit(\"login\");\nconsole.log(u.toJSON());",
    "solutionCode": "function composeMixins(TargetConstructor, ...mixins) {\n  const targetProto = TargetConstructor.prototype;\n\n  for (const mixin of mixins) {\n    const descriptors = Object.getOwnPropertyDescriptors(mixin);\n    for (const [key, descriptor] of Object.entries(descriptors)) {\n      if (key !== 'constructor') {\n        Object.defineProperty(targetProto, key, descriptor);\n      }\n    }\n  }\n\n  return TargetConstructor;\n}",
    "hints": [
      {
        "en": "Use Object.getOwnPropertyDescriptors(mixin) and Object.defineProperty(targetProto, key, descriptor).",
        "vi": "Dùng Object.getOwnPropertyDescriptors(mixin) và Object.defineProperty(targetProto, key, descriptor)."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Multiple Mixin Inheritance Composer via Prototypes according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Ghép Nối Đa Kế Thừa Mixins Bằng Prototype Chain theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_16_1",
      "type": "single_choice",
      "question": {
        "en": "What is at the top end of almost every JavaScript prototype chain?",
        "vi": "Đối tượng nào nằm ở đỉnh cao nhất của hầu hết các chuỗi Prototype Chain trong JavaScript?"
      },
      "options": [
        {
          "en": "`Object.prototype` (whose internal prototype is `null`)",
          "vi": "`Object.prototype` (có prototype nội bộ là `null`)"
        },
        {
          "en": "`Function.prototype`",
          "vi": "`Function.prototype`"
        },
        {
          "en": "`window` / `global`",
          "vi": "`window` / `global`"
        },
        {
          "en": "`undefined`",
          "vi": "`undefined`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The prototype chain terminates at `Object.prototype`, and `Object.getPrototypeOf(Object.prototype)` returns `null`.",
        "vi": "Chuỗi prototype kết thúc tại `Object.prototype`, và `Object.getPrototypeOf(Object.prototype)` trả về `null`."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "easy"
    },
    {
      "id": "js_q_16_2",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` print?\n```js\nconst proto = { answer: 42 };\nconst obj = Object.create(proto);\nobj.answer = 100;\nconsole.log(obj.answer, proto.answer);\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nconst proto = { answer: 42 };\nconst obj = Object.create(proto);\nobj.answer = 100;\nconsole.log(obj.answer, proto.answer);\n```"
      },
      "options": [
        {
          "en": "100 42 (Property Shadowing)",
          "vi": "100 42 (Cơ chế che khuất - Property Shadowing)"
        },
        {
          "en": "100 100",
          "vi": "100 100"
        },
        {
          "en": "42 42",
          "vi": "42 42"
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
        "en": "Assigning `obj.answer = 100` creates an own property on `obj`, shadowing `proto.answer` without altering `proto`.",
        "vi": "Gán `obj.answer = 100` tạo thuộc tính riêng trên `obj`, che khuất `proto.answer` mà không làm thay đổi `proto`."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "easy"
    },
    {
      "id": "js_q_16_3",
      "type": "single_choice",
      "question": {
        "en": "What is the recommended standard way to retrieve the prototype of an object instance?",
        "vi": "Cách chuẩn được khuyến nghị để lấy prototype của một instance đối tượng là gì?"
      },
      "options": [
        {
          "en": "Object.getPrototypeOf(instance)",
          "vi": "Object.getPrototypeOf(instance)"
        },
        {
          "en": "instance.__proto__",
          "vi": "instance.__proto__"
        },
        {
          "en": "instance.prototype",
          "vi": "instance.prototype"
        },
        {
          "en": "instance.getProto()",
          "vi": "instance.getProto()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Object.getPrototypeOf(obj)` is the official ECMAScript standard method.",
        "vi": "`Object.getPrototypeOf(obj)` là phương thức chuẩn chính thức của ECMAScript."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "easy"
    },
    {
      "id": "js_q_16_4",
      "type": "predict_output",
      "question": {
        "en": "What does `Object.hasOwn(obj, prop)` or `obj.hasOwnProperty(prop)` do?",
        "vi": "Phương thức `Object.hasOwn(obj, prop)` hoặc `obj.hasOwnProperty(prop)` có tác dụng gì?"
      },
      "options": [
        {
          "en": "Returns true ONLY if `prop` is a direct own property of `obj`, returning false if it comes from the prototype chain",
          "vi": "Trả về true CHỈ KHI `prop` là thuộc tính trực tiếp của `obj`, trả về false nếu thuộc tính kế thừa từ prototype chain"
        },
        {
          "en": "Returns true for all prototype properties",
          "vi": "Trả về true cho tất cả thuộc tính trong prototype"
        },
        {
          "en": "Deletes the property from the prototype",
          "vi": "Xóa thuộc tính khỏi prototype"
        },
        {
          "en": "Freezes the property value",
          "vi": "Đóng băng giá trị thuộc tính"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Object.hasOwn()` checks direct own ownership, disregarding inherited prototype members.",
        "vi": "`Object.hasOwn()` kiểm tra quyền sở hữu trực tiếp trên đối tượng, bỏ qua các thuộc tính kế thừa từ prototype."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "medium"
    },
    {
      "id": "js_q_16_5",
      "type": "single_choice",
      "question": {
        "en": "How do you create an object that has NO prototype chain at all (completely dictionary-pure)?",
        "vi": "Làm thế nào để tạo ra một đối tượng hoàn toàn KHÔNG CÓ prototype chain (đối tượng từ điển thuần khiết)?"
      },
      "options": [
        {
          "en": "Object.create(null)",
          "vi": "Object.create(null)"
        },
        {
          "en": "{}",
          "vi": "{}"
        },
        {
          "en": "new Object()",
          "vi": "new Object()"
        },
        {
          "en": "Object.freeze({})",
          "vi": "Object.freeze({})"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Object.create(null)` creates an object with no prototype link, making it immune to prototype pollution attacks.",
        "vi": "`Object.create(null)` tạo đối tượng không có liên kết prototype, giúp chống lại các cuộc tấn công Prototype Pollution."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "medium"
    },
    {
      "id": "js_q_16_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log([] instanceof Object)` return?",
        "vi": "`console.log([] instanceof Object)` sẽ trả về kết quả gì?"
      },
      "options": [
        {
          "en": "true (because Array.prototype inherits from Object.prototype)",
          "vi": "true (vì Array.prototype kế thừa từ Object.prototype)"
        },
        {
          "en": "false",
          "vi": "false"
        },
        {
          "en": "TypeError",
          "vi": "TypeError"
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
        "en": "`instanceof` tests whether `Object.prototype` appears anywhere in the prototype chain of `[]`.",
        "vi": "Toán tử `instanceof` kiểm tra xem `Object.prototype` có xuất hiện trong chuỗi prototype của `[]` hay không."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "medium"
    },
    {
      "id": "js_q_16_7",
      "type": "fill_blank",
      "question": {
        "en": "The operator used to test if a constructor's prototype property appears anywhere in the prototype chain of an object is _____ .",
        "vi": "Toán tử dùng để kiểm tra xem prototype của một constructor có xuất hiện trong chuỗi prototype của đối tượng không là _____ ."
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
        "en": "`obj instanceof Constructor` inspects the prototype chain for `Constructor.prototype`.",
        "vi": "`obj instanceof Constructor` kiểm tra sự hiện diện của `Constructor.prototype` trên chuỗi prototype."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "instanceof"
      ]
    },
    {
      "id": "js_q_16_8",
      "type": "single_choice",
      "question": {
        "en": "What happens when you modify a property on a shared prototype object `Constructor.prototype.shared = 99`?",
        "vi": "Điều gì xảy ra khi bạn thay đổi thuộc tính trên prototype dùng chung `Constructor.prototype.shared = 99`?"
      },
      "options": [
        {
          "en": "All existing and future instances that inherit from that prototype immediately see the updated value",
          "vi": "Tất cả các instance hiện tại và tương lai kế thừa từ prototype đó ngay lập tức thấy giá trị mới"
        },
        {
          "en": "Only newly created instances see it",
          "vi": "Chỉ các instance tạo mới sau đó mới thấy"
        },
        {
          "en": "Throws a PrototypeMutationError",
          "vi": "Ném lỗi PrototypeMutationError"
        },
        {
          "en": "It converts all instances to numbers",
          "vi": "Nó chuyển toàn bộ instance thành số"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Because prototypal lookup is a dynamic live reference, mutations to the prototype are immediately reflected across all instances.",
        "vi": "Vì tra cứu prototype là một tham chiếu động thời gian thực, thay đổi trên prototype lập tức phản ánh lên mọi instance liên kết."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "hard"
    },
    {
      "id": "js_q_16_9",
      "type": "predict_output",
      "question": {
        "en": "What is Prototype Pollution in JavaScript security?",
        "vi": "Lỗ hổng Prototype Pollution trong bảo mật JavaScript là gì?"
      },
      "options": [
        {
          "en": "An attacker injecting malicious properties into `Object.prototype`, which then infects every object across the entire runtime",
          "vi": "Kẻ tấn công chèn các thuộc tính độc hại vào `Object.prototype`, từ đó lây lan sang toàn bộ mọi đối tượng trong runtime"
        },
        {
          "en": "Running out of RAM memory",
          "vi": "Hết bộ nhớ RAM"
        },
        {
          "en": "Using too many classes in one file",
          "vi": "Sử dụng quá nhiều class trong 1 file"
        },
        {
          "en": "A slow internet connection",
          "vi": "Tốc độ mạng chậm"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Prototype pollution occurs when unsanitized user keys (like `__proto__`) mutate base prototypes, allowing RCE or privilege escalation.",
        "vi": "Prototype pollution xảy ra khi dữ liệu người dùng không lọc (như `__proto__`) sửa đổi prototype gốc, dẫn tới leo thang đặc quyền."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "hard"
    },
    {
      "id": "js_q_16_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `Object.hasOwn(obj, key)` preferred over `obj.hasOwnProperty(key)` in modern JavaScript (ES2022)?",
        "vi": "Tại sao `Object.hasOwn(obj, key)` được khuyến khích hơn `obj.hasOwnProperty(key)` trong JS hiện đại (ES2022)?"
      },
      "options": [
        {
          "en": "`obj.hasOwnProperty()` will crash if `obj` was created with `Object.create(null)` or if the object has an own property named 'hasOwnProperty'",
          "vi": "`obj.hasOwnProperty()` sẽ gây crash nếu `obj` được tạo từ `Object.create(null)` hoặc nếu đối tượng có một thuộc tính tự định nghĩa tên là 'hasOwnProperty'"
        },
        {
          "en": "`Object.hasOwn` is asynchronous",
          "vi": "`Object.hasOwn` là hàm bất đồng bộ"
        },
        {
          "en": "`hasOwnProperty` is forbidden in CSS",
          "vi": "`hasOwnProperty` bị cấm trong CSS"
        },
        {
          "en": "Because `hasOwn` only works on numbers",
          "vi": "Vì `hasOwn` chỉ chạy với số"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Object.hasOwn(obj, key)` is safe against null-prototype objects and overridden `hasOwnProperty` properties.",
        "vi": "`Object.hasOwn(obj, key)` hoàn toàn an toàn khi xử lý các đối tượng không có prototype hoặc bị ghi đè phương thức."
      },
      "topicId": "js_prototypes_inheritance",
      "difficulty": "hard"
    }
  ]
};
export default lesson16;
