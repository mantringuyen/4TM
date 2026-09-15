import { Lesson } from '../../../../types';

export const lesson22: Lesson = {
  "id": "js_lesson_22",
  "courseId": "javascript",
  "levelId": "advanced",
  "moduleId": "js_mod_5",
  "order": 22,
  "title": {
    "en": "Symbols, Well-Known Symbols & Meta-Programming Hooks",
    "vi": "Symbols, Well-Known Symbols & Các Điểm Móc Siêu Lập Trình (Meta-Programming Hooks)"
  },
  "summary": {
    "en": "Master ES6 Symbol primitives, global registry (`Symbol.for`, `Symbol.keyFor`), well-known symbols (`Symbol.toPrimitive`, `Symbol.toStringTag`, `Symbol.hasInstance`, `Symbol.species`), and private branding.",
    "vi": "Làm chủ kiểu dữ liệu nguyên thủy Symbol, registry toàn cục (`Symbol.for`), các well-known symbol tùy biến hành vi ngôn ngữ (`Symbol.toPrimitive`, `Symbol.toStringTag`, `Symbol.hasInstance`) và kỹ thuật private branding."
  },
  "estimatedMinutes": 22,
  "topicId": "js_symbols_metaprogramming",
  "learn": {
    "introduction": {
      "en": "Symbols are unique, immutable primitive values introduced in ES6 primarily to serve as guaranteed unique object property keys. Beyond preventing property collision in third-party libraries, JavaScript exposes 'Well-Known Symbols'—internal engine extension points that allow developers to customize core language behaviors such as type coercion (`Symbol.toPrimitive`), string tagging (`Symbol.toStringTag`), and instance verification (`Symbol.hasInstance`).",
      "vi": "Symbol là kiểu dữ liệu nguyên thủy bất biến và duy nhất được bổ sung trong ES6 để làm key thuộc tính object mà không bao giờ bị trùng lặp. Ngoài việc chống xung đột tên thuộc tính trong các thư viện, JavaScript còn cung cấp các 'Well-Known Symbols'—các điểm móc can thiệp nội bộ cho phép lập trình viên tùy biến sâu hành vi cốt lõi của ngôn ngữ như ép kiểu (`Symbol.toPrimitive`), định dạng chuỗi (`Symbol.toStringTag`) và kiểm tra instance (`Symbol.hasInstance`)."
    },
    "conceptExplanation": {
      "en": "1. Symbol Uniqueness: Every `Symbol('desc')` creates a globally unique identity. `Symbol('a') !== Symbol('a')`.\n\n2. Global Symbol Registry: `Symbol.for(key)` retrieves or creates a shared symbol across iframes and service workers. `Symbol.keyFor(sym)` retrieves its registry key.\n\n3. Property Visibility: Symbol keys are non-enumerable in `for...in` and `Object.keys()`. They can be accessed via `Object.getOwnPropertySymbols(obj)` or `Reflect.ownKeys(obj)`.\n\n4. Essential Well-Known Symbols:\n   - `Symbol.toPrimitive(hint)`: Customizes how an object converts to 'number', 'string', or 'default'.\n   - `Symbol.toStringTag`: Customizes `Object.prototype.toString.call(obj)` to return `[object CustomTag]`.\n   - `Symbol.hasInstance`: Customizes `obj instanceof Constructor` logic.\n   - `Symbol.species`: Specifies the constructor used to create derived objects in methods like `.map()`.",
      "vi": "1. Tính Duy Nhất Của Symbol: Mỗi lần gọi `Symbol('desc')` đều tạo một định danh duy nhất toàn cầu. `Symbol('a') !== Symbol('a')`.\n\n2. Global Symbol Registry: `Symbol.for(key)` tìm hoặc tạo một symbol dùng chung xuyên suốt các iframe và service worker. `Symbol.keyFor(sym)` lấy lại key đăng ký.\n\n3. Tính Ẩn Của Thuộc Tính Symbol: Key symbol không xuất hiện trong `for...in` hay `Object.keys()`. Có thể đọc qua `Object.getOwnPropertySymbols(obj)` hoặc `Reflect.ownKeys(obj)`.\n\n4. Các Well-Known Symbols Thiết Yếu:\n   - `Symbol.toPrimitive(hint)`: Tùy biến cách đối tượng tự ép kiểu sang 'number', 'string', hoặc 'default'.\n   - `Symbol.toStringTag`: Tùy biến kết quả của `Object.prototype.toString.call(obj)` thành `[object CustomTag]`.\n   - `Symbol.hasInstance`: Tùy biến logic kiểm tra của toán tử `obj instanceof Constructor`.\n   - `Symbol.species`: Chỉ định constructor dùng để tạo đối tượng phái sinh trong các hàm như `.map()`."
    },
    "syntax": "// 1. Symbol.toPrimitive hook for explicit type coercion\nconst money = {\n  amount: 250,\n  currency: \"USD\",\n  [Symbol.toPrimitive](hint) {\n    if (hint === \"number\") return this.amount;\n    if (hint === \"string\") return `${this.amount} ${this.currency}`;\n    return this.amount; // default\n  }\n};\n\nconsole.log(+money);        // 250 (hint: 'number')\nconsole.log(`Total: ${money}`); // \"Total: 250 USD\" (hint: 'string')\nconsole.log(money + 50);    // 300 (hint: 'default')\n\n// 2. Custom Symbol.toStringTag\nclass Vector {\n  get [Symbol.toStringTag]() { return \"Vector3D\"; }\n}\nconsole.log(Object.prototype.toString.call(new Vector())); // \"[object Vector3D]\"",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Custom Instance Validator with Symbol.hasInstance",
          "vi": "Tùy Biến Toán Tử instanceof Bằng Symbol.hasInstance"
        },
        "description": {
          "en": "Demonstrates overriding instanceof behavior to validate structural duck-typing rather than prototype chain inheritance.",
          "vi": "Minh họa ghi đè toán tử instanceof để kiểm tra cấu trúc (Duck Typing) thay vì kế thừa prototype chain thông thường."
        },
        "code": "class IntegerOnly {\n  static [Symbol.hasInstance](instance) {\n    return typeof instance === \"number\" && Number.isInteger(instance);\n  }\n}\n\nconsole.log(42 instanceof IntegerOnly);    // true\nconsole.log(3.14 instanceof IntegerOnly);  // false\nconsole.log(\"42\" instanceof IntegerOnly);  // false"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Trying to instantiate a symbol with the `new` keyword (`new Symbol()`).",
          "vi": "Cố gắng khởi tạo symbol bằng từ khóa `new` (`new Symbol()`)."
        },
        "correction": {
          "en": "Call `Symbol(description)` directly as a primitive factory function.",
          "vi": "Gọi trực tiếp `Symbol(description)` như một hàm tạo giá trị nguyên thủy."
        }
      }
    ],
    "tips": [
      {
        "en": "Use Symbol.for() when sharing symbols across micro-frontends or iframes: `Symbol.for('app.state')` accesses the cross-realm global runtime symbol registry, ensuring exact reference equality across separate global window contexts.",
        "vi": "Dùng Symbol.for() khi cần chia sẻ symbol giữa các iframe hoặc micro-frontend: `Symbol.for('app.state')` truy cập vào registry toàn cục, đảm bảo tính đồng nhất tham chiếu xuyên suốt các iframe và realm khác nhau."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_22_1",
      "type": "complete_code",
      "title": {
        "en": "Implement Temperature with Symbol.toPrimitive",
        "vi": "Cài Đặt Đối Tượng Temperature Với Symbol.toPrimitive"
      },
      "instruction": {
        "en": "Create a class `Temperature(celsius)` that implements `[Symbol.toPrimitive](hint)`. When coerced to 'number' or 'default', return the numeric celsius value. When coerced to 'string', return `\"${celsius}°C\"`.",
        "vi": "Tạo class `Temperature(celsius)` cài đặt phương thức `[Symbol.toPrimitive](hint)`. Khi ép kiểu sang 'number' hoặc 'default', trả về giá trị số celsius. Khi ép kiểu sang 'string', trả về `\"${celsius}°C\"`."
      },
      "starterCode": "class Temperature {\n  constructor(celsius) {\n    this.celsius = celsius;\n  }\n  // Implement Symbol.toPrimitive\n}\n\nconst t = new Temperature(25);\nconsole.log(+t); // 25\nconsole.log(`It is ${t}`); // \"It is 25°C\"\nconsole.log(t + 5); // 30",
      "solutionCode": "class Temperature {\n  constructor(celsius) {\n    this.celsius = celsius;\n  }\n\n  [Symbol.toPrimitive](hint) {\n    if (hint === \"string\") {\n      return `${this.celsius}°C`;\n    }\n    return this.celsius;\n  }\n}",
      "hint": {
        "en": "Check `if (hint === 'string') return `${this.celsius}°C``, otherwise return `this.celsius`.",
        "vi": "Kiểm tra `if (hint === 'string') return `${this.celsius}°C``, ngược lại trả về `this.celsius`."
      }
    },
    {
      "id": "js_ex_22_2",
      "type": "complete_code",
      "title": {
        "en": "Custom Duck-Typing Interface Validator with Symbol.hasInstance",
        "vi": "Kiểm Tra Giao Diện Duck-Typing Bằng Symbol.hasInstance"
      },
      "instruction": {
        "en": "Write a factory function `createInterface(...requiredMethodNames)` that returns an object with a custom `[Symbol.hasInstance](instance)` checking if `instance` has all specified method names as functions.",
        "vi": "Viết hàm factory `createInterface(...requiredMethodNames)` trả về đối tượng có cài đặt `[Symbol.hasInstance](instance)` kiểm tra xem `instance` có đầy đủ các phương thức được yêu cầu hay không."
      },
      "starterCode": "function createInterface(...requiredMethods) {\n  // Return interface checker with Symbol.hasInstance\n}\n\nconst Serializable = createInterface(\"serialize\", \"deserialize\");\nconst validObj = { serialize() {}, deserialize() {} };\nconst invalidObj = { serialize() {} };\n\nconsole.log(validObj instanceof Serializable);   // true\nconsole.log(invalidObj instanceof Serializable); // false",
      "solutionCode": "function createInterface(...requiredMethods) {\n  return {\n    [Symbol.hasInstance](instance) {\n      if (!instance || (typeof instance !== 'object' && typeof instance !== 'function')) {\n        return false;\n      }\n      return requiredMethods.every(method => typeof instance[method] === 'function');\n    }\n  };\n}",
      "hint": {
        "en": "Use requiredMethods.every() checking `typeof instance[method] === 'function'`.",
        "vi": "Dùng requiredMethods.every() kiểm tra `typeof instance[method] === 'function'`."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_22",
    "title": {
      "en": "Private Brand Weak Metadata Store via Symbols",
      "vi": "Kho Lưu Trữ Siêu Dữ Liệu Riêng Tư Bằng Symbol Branding"
    },
    "description": {
      "en": "Implement a metadata branding system `createBrand(brandName)` that returns `{ tag(obj, data)`, `read(obj)`, `has(obj)` } using a secret unexported Symbol key to store hidden metadata on objects without appearing in `Object.keys()` or JSON output.",
      "vi": "Cài đặt hệ thống đóng dấu siêu dữ liệu `createBrand(brandName)` trả về `{ tag(obj, data)`, `read(obj)`, `has(obj)` } sử dụng key Symbol bí mật để lưu metadata ẩn trên đối tượng mà không hiển thị trong `Object.keys()` hay đầu ra JSON."
    },
    "starterCode": "function createBrand(brandName) {\n  // Implement symbol branding store\n}\n\nconst SecureBrand = createBrand(\"SECURE_TOKEN\");\nconst user = { name: \"Elena\" };\nSecureBrand.tag(user, { role: \"SUPERADMIN\", expires: 999999 });\n\nconsole.log(SecureBrand.has(user)); // true\nconsole.log(SecureBrand.read(user).role); // \"SUPERADMIN\"\nconsole.log(JSON.stringify(user)); // '{\"name\":\"Elena\"}' (Metadata is hidden!)",
    "solutionCode": "function createBrand(brandName) {\n  const brandKey = Symbol(brandName);\n\n  return {\n    tag(obj, data) {\n      if (!obj || typeof obj !== 'object') throw new TypeError(\"Target must be an object\");\n      Object.defineProperty(obj, brandKey, {\n        value: Object.freeze({ ...data }),\n        writable: false,\n        enumerable: false,\n        configurable: false\n      });\n      return obj;\n    },\n    read(obj) {\n      if (!obj || typeof obj !== 'object') return null;\n      return obj[brandKey] || null;\n    },\n    has(obj) {\n      if (!obj || typeof obj !== 'object') return false;\n      return brandKey in obj;\n    }\n  };\n}",
    "hints": [
      {
        "en": "Use an unexported `const brandKey = Symbol(brandName)` and assign via `Object.defineProperty` with enumerable: false.",
        "vi": "Dùng một `const brandKey = Symbol(brandName)` không export và gán bằng `Object.defineProperty` với enumerable: false."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Private Brand Weak Metadata Store via Symbols according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Kho Lưu Trữ Siêu Dữ Liệu Riêng Tư Bằng Symbol Branding theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_22_1",
      "type": "single_choice",
      "question": {
        "en": "What is the return value of `Symbol('id') === Symbol('id')`?",
        "vi": "Kết quả của phép so sánh `Symbol('id') === Symbol('id')` là gì?"
      },
      "options": [
        {
          "en": "false (every Symbol call produces a completely unique identity)",
          "vi": "false (mỗi lần gọi Symbol đều tạo ra một định danh hoàn toàn duy nhất)"
        },
        {
          "en": "true",
          "vi": "true"
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
        "en": "Symbols are guaranteed unique; the description string passed to `Symbol()` is purely for debugging.",
        "vi": "Symbol được đảm bảo luôn duy nhất; chuỗi mô tả truyền vào `Symbol()` chỉ nhằm mục đích gỡ lỗi."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "easy"
    },
    {
      "id": "js_q_22_2",
      "type": "predict_output",
      "question": {
        "en": "How do you access the global shared symbol registry across different realms/iframes?",
        "vi": "Làm thế nào để truy cập vào registry symbol chia sẻ toàn cục giữa các iframe hoặc realm khác nhau?"
      },
      "options": [
        {
          "en": "Symbol.for(key)",
          "vi": "Symbol.for(key)"
        },
        {
          "en": "Symbol.global(key)",
          "vi": "Symbol.global(key)"
        },
        {
          "en": "Symbol.shared(key)",
          "vi": "Symbol.shared(key)"
        },
        {
          "en": "Symbol.registry(key)",
          "vi": "Symbol.registry(key)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Symbol.for(key)` searches the global runtime registry and returns the existing symbol or creates a new shared one.",
        "vi": "`Symbol.for(key)` tìm trong registry toàn cục và trả về symbol đang có hoặc tạo symbol chia sẻ mới."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "easy"
    },
    {
      "id": "js_q_22_3",
      "type": "single_choice",
      "question": {
        "en": "Which Well-Known Symbol customizes the result of `Object.prototype.toString.call(obj)`?",
        "vi": "Well-Known Symbol nào dùng để tùy biến chuỗi trả về của `Object.prototype.toString.call(obj)`?"
      },
      "options": [
        {
          "en": "Symbol.toStringTag",
          "vi": "Symbol.toStringTag"
        },
        {
          "en": "Symbol.toPrimitive",
          "vi": "Symbol.toPrimitive"
        },
        {
          "en": "Symbol.asString",
          "vi": "Symbol.asString"
        },
        {
          "en": "Symbol.inspect",
          "vi": "Symbol.inspect"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Symbol.toStringTag` defines the tag string returned inside `[object <Tag>]`.",
        "vi": "`Symbol.toStringTag` định nghĩa tên thẻ hiển thị bên trong `[object <Tag>]`."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "easy"
    },
    {
      "id": "js_q_22_4",
      "type": "predict_output",
      "question": {
        "en": "Do Symbol-keyed properties appear in `Object.keys(obj)` or `JSON.stringify(obj)`?",
        "vi": "Các thuộc tính có key là Symbol có xuất hiện trong `Object.keys(obj)` hay `JSON.stringify(obj)` không?"
      },
      "options": [
        {
          "en": "No, they are completely ignored by Object.keys() and JSON.stringify()",
          "vi": "Không, chúng hoàn toàn bị bỏ qua trong Object.keys() và JSON.stringify()"
        },
        {
          "en": "Yes, always",
          "vi": "Có, luôn xuất hiện"
        },
        {
          "en": "Only if stringify replacer is null",
          "vi": "Chỉ khi hàm replacer của stringify là null"
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
        "en": "Symbol properties are non-enumerable to standard reflection tools, making them ideal for hidden metadata.",
        "vi": "Thuộc tính symbol ẩn với các công cụ duyệt thông thường, rất lý tưởng để lưu metadata ẩn."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "medium"
    },
    {
      "id": "js_q_22_5",
      "type": "single_choice",
      "question": {
        "en": "How can you retrieve all Symbol keys defined directly on an object?",
        "vi": "Cách lấy toàn bộ danh sách key Symbol định nghĩa trực tiếp trên một đối tượng là gì?"
      },
      "options": [
        {
          "en": "Object.getOwnPropertySymbols(obj) or Reflect.ownKeys(obj)",
          "vi": "Object.getOwnPropertySymbols(obj) hoặc Reflect.ownKeys(obj)"
        },
        {
          "en": "Object.keys(obj)",
          "vi": "Object.keys(obj)"
        },
        {
          "en": "Object.values(obj)",
          "vi": "Object.values(obj)"
        },
        {
          "en": "for...in loop",
          "vi": "Vòng lặp for...in"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Object.getOwnPropertySymbols(obj)` returns an array of all Symbol property keys on the object.",
        "vi": "`Object.getOwnPropertySymbols(obj)` trả về mảng chứa tất cả các key Symbol trên đối tượng."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "medium"
    },
    {
      "id": "js_q_22_6",
      "type": "predict_output",
      "question": {
        "en": "What are the 3 possible values of the `hint` parameter passed into `[Symbol.toPrimitive](hint)`?",
        "vi": "3 giá trị có thể có của tham số `hint` truyền vào phương thức `[Symbol.toPrimitive](hint)` là gì?"
      },
      "options": [
        {
          "en": "'number', 'string', 'default'",
          "vi": "'number', 'string', 'default'"
        },
        {
          "en": "'int', 'float', 'text'",
          "vi": "'int', 'float', 'text'"
        },
        {
          "en": "'boolean', 'object', 'null'",
          "vi": "'boolean', 'object', 'null'"
        },
        {
          "en": "'strict', 'loose', 'coerced'",
          "vi": "'strict', 'loose', 'coerced'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The JS engine passes `'number'` (math ops), `'string'` (template literals), or `'default'` (+ operator with strings/numbers).",
        "vi": "JS engine truyền `'number'` (phép toán số), `'string'` (chuỗi mẫu), hoặc `'default'` (toán tử + giữa chuỗi/số)."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "medium"
    },
    {
      "id": "js_q_22_7",
      "type": "fill_blank",
      "question": {
        "en": "To customize the behavior of the `instanceof` operator on a class, define the static method [Symbol._____](instance) { ... }.",
        "vi": "Để tùy biến hành vi của toán tử `instanceof` trên một class, định nghĩa phương thức static [Symbol._____](instance) { ... }."
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
        "en": "`Function.prototype[Symbol.hasInstance]` determines if a constructor recognizes an object as its instance.",
        "vi": "`[Symbol.hasInstance]` quyết định xem một constructor có công nhận đối tượng là instance của nó không."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "hasinstance"
      ]
    },
    {
      "id": "js_q_22_8",
      "type": "single_choice",
      "question": {
        "en": "What does `Symbol.keyFor(sym)` return?",
        "vi": "`Symbol.keyFor(sym)` trả về giá trị gì?"
      },
      "options": [
        {
          "en": "The string key of a symbol registered in the global symbol registry, or undefined if not in the global registry",
          "vi": "Chuỗi key của symbol đăng ký trong global registry, hoặc undefined nếu không nằm trong global registry"
        },
        {
          "en": "The memory address of the symbol",
          "vi": "Địa chỉ bộ nhớ của symbol"
        },
        {
          "en": "The description passed to local Symbol()",
          "vi": "Chuỗi mô tả truyền vào hàm Symbol() cục bộ"
        },
        {
          "en": "A random UUID",
          "vi": "Một mã UUID ngẫu nhiên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Symbol.keyFor` looks up the key in the global registry created via `Symbol.for()`.",
        "vi": "`Symbol.keyFor` tra cứu key trong global registry được tạo qua `Symbol.for()`."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "hard"
    },
    {
      "id": "js_q_22_9",
      "type": "predict_output",
      "question": {
        "en": "What will `typeof Symbol()` return?",
        "vi": "`typeof Symbol()` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "'symbol'",
          "vi": "'symbol'"
        },
        {
          "en": "'object'",
          "vi": "'object'"
        },
        {
          "en": "'function'",
          "vi": "'function'"
        },
        {
          "en": "'string'",
          "vi": "'string'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Symbol is a distinct primitive data type with `typeof === 'symbol'`.",
        "vi": "Symbol là kiểu dữ liệu nguyên thủy riêng biệt có kết quả `typeof === 'symbol'`."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "hard"
    },
    {
      "id": "js_q_22_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `Symbol.species` used in built-in collection classes like Array or Promise?",
        "vi": "Tại sao `Symbol.species` được sử dụng trong các class tập hợp tích hợp sẵn như Array hay Promise?"
      },
      "options": [
        {
          "en": "It specifies which constructor function is used when derived methods (like `.map()` or `.filter()`) create new instance copies",
          "vi": "Nó chỉ định hàm constructor nào sẽ được sử dụng khi các phương thức phái sinh (như `.map()` hoặc `.filter()`) tạo ra instance bản sao mới"
        },
        {
          "en": "It detects browser vendor species",
          "vi": "Nó phát hiện trình duyệt thuộc loại nào"
        },
        {
          "en": "It optimizes garbage collection speeds",
          "vi": "Nó tối ưu tốc độ dọn rác"
        },
        {
          "en": "It encrypts array contents",
          "vi": "Nó mã hóa nội dung mảng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`[Symbol.species]` allows a subclass of `Array` to return standard `Array` instances from `.map()` instead of custom subclass instances.",
        "vi": "`[Symbol.species]` cho phép class con kế thừa từ `Array` có thể trả về instance `Array` chuẩn từ `.map()` thay vì instance của class con."
      },
      "topicId": "js_symbols_metaprogramming",
      "difficulty": "hard"
    }
  ]
};
export default lesson22;
