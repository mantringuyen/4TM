import { Lesson } from '../../../../types';

export const lesson23: Lesson = {
  "id": "js_lesson_23",
  "courseId": "javascript",
  "levelId": "advanced",
  "moduleId": "js_mod_5",
  "order": 23,
  "title": {
    "en": "Proxy & Reflect APIs: Metaprogramming & Reactive State",
    "vi": "Proxy & Reflect API: Siêu Lập Trình & Hệ Thống Phản Ứng (Reactivity)"
  },
  "summary": {
    "en": "Master deep object interception with `Proxy` traps (`get`, `set`, `has`, `deleteProperty`, `apply`), companion `Reflect` methods, revocable proxies, schema validators, and building a mini Vue 3-style reactivity engine.",
    "vi": "Làm chủ cơ chế can thiệp tầng sâu với các trap của `Proxy` (`get`, `set`, `has`, `deleteProperty`, `apply`), bộ API bổ trợ `Reflect`, proxy có thể thu hồi, hệ thống xác thực dữ liệu và xây dựng engine phản ứng kiểu Vue 3."
  },
  "estimatedMinutes": 24,
  "topicId": "js_proxy_reflect",
  "learn": {
    "introduction": {
      "en": "Metaprogramming allows a program to inspect and alter its own core operations. ES6 `Proxy` enables wrapping target objects to intercept fundamental language operations (property access, assignment, enumeration, function invocation). Paired with `Reflect`—which provides standardized, functional equivalents of engine internal methods—Proxies empower modern frameworks (like Vue 3 and MobX) to build elegant reactive state systems.",
      "vi": "Siêu lập trình (Metaprogramming) cho phép một chương trình tự kiểm tra và thay đổi các hành vi cốt lõi của chính nó. ES6 `Proxy` cho phép bọc đối tượng mục tiêu để can thiệp vào các thao tác cơ bản của ngôn ngữ (đọc thuộc tính, gán giá trị, duyệt phần tử, gọi hàm). Kết hợp cùng `Reflect`—bộ phương thức chuẩn hóa tương ứng với các cơ chế nội bộ của engine—Proxy là nền tảng giúp các framework hiện đại (như Vue 3, MobX) xây dựng hệ thống trạng thái phản ứng (reactive state) mượt mà."
    },
    "conceptExplanation": {
      "en": "1. Proxy Structure: `new Proxy(target, handler)`. The `handler` contains 'traps' (interception functions).\n\n2. Key Proxy Traps:\n   - `get(target, prop, receiver)`: Intercepts reading properties.\n   - `set(target, prop, value, receiver)`: Intercepts writing properties (must return `true` on success in strict mode).\n   - `has(target, prop)`: Intercepts `prop in obj` operator.\n   - `deleteProperty(target, prop)`: Intercepts `delete obj.prop`.\n   - `apply(target, thisArg, argList)`: Intercepts function invocations.\n   - `construct(target, argList, newTarget)`: Intercepts `new FunctionName()`.\n\n3. The `Reflect` API: Every Proxy trap has an identical matching method on `Reflect` (`Reflect.get`, `Reflect.set`). Always delegate to `Reflect` inside traps to preserve proper prototype receiver binding (`this`).\n\n4. Revocable Proxies: `Proxy.revocable(target, handler)` returns `{ proxy, revoke }` to permanently disable access upon security timeouts.",
      "vi": "1. Cấu Trúc Proxy: `new Proxy(target, handler)`. `handler` chứa các 'trap' (hàm can thiệp).\n\n2. Các Trap Quan Trọng:\n   - `get(target, prop, receiver)`: Can thiệp khi đọc thuộc tính.\n   - `set(target, prop, value, receiver)`: Can thiệp khi gán giá trị (bắt buộc trả về `true` khi thành công trong strict mode).\n   - `has(target, prop)`: Can thiệp toán tử `prop in obj`.\n   - `deleteProperty(target, prop)`: Can thiệp khi `delete obj.prop`.\n   - `apply(target, thisArg, argList)`: Can thiệp khi gọi hàm.\n   - `construct(target, argList, newTarget)`: Can thiệp khi gọi `new FunctionName()`.\n\n3. API `Reflect`: Mỗi trap của Proxy đều có một phương thức tương ứng trên `Reflect` (`Reflect.get`, `Reflect.set`). Luôn ủy quyền cho `Reflect` bên trong trap để bảo toàn ngữ cảnh receiver (`this`) trên chuỗi prototype.\n\n4. Proxy Thu Hồi (Revocable): `Proxy.revocable(target, handler)` trả về `{ proxy, revoke }` giúp vô hiệu hóa quyền truy cập vĩnh viễn sau khi hết hạn bảo mật."
    },
    "syntax": "// 1. Validated Schema Store with Proxy & Reflect\nconst validator = {\n  set(target, prop, value, receiver) {\n    if (prop === \"age\") {\n      if (typeof value !== \"number\" || value < 0) {\n        throw new TypeError(\"Age must be a positive number\");\n      }\n    }\n    // Delegate to Reflect.set to ensure correct prototype binding\n    return Reflect.set(target, prop, value, receiver);\n  }\n};\n\nconst user = new Proxy({}, validator);\nuser.age = 28; // OK\n// user.age = -5; // Throws TypeError!\n\n// 2. Revocable Security Proxy\nconst { proxy: secureDoc, revoke } = Proxy.revocable({ secretKey: \"XYZ123\" }, {});\nconsole.log(secureDoc.secretKey); // \"XYZ123\"\nrevoke();\n// secureDoc.secretKey; // Throws TypeError: Cannot perform 'get' on a proxy that has been revoked",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Mini Reactive State & Auto-Rendering Engine (Vue 3 Style)",
          "vi": "Engine Quản Lý Trạng Thái Phản Ứng Tự Động Render (Phong Cách Vue 3)"
        },
        "description": {
          "en": "Demonstrates an observable reactive state function that automatically runs tracking subscriber effects when mutated.",
          "vi": "Minh họa hàm reactive theo dõi và tự động kích hoạt các subscriber effect khi dữ liệu thay đổi."
        },
        "code": "let activeEffect = null;\nconst targetMap = new WeakMap();\n\nfunction track(target, key) {\n  if (!activeEffect) return;\n  let depsMap = targetMap.get(target);\n  if (!depsMap) targetMap.set(target, (depsMap = new Map()));\n  let dep = depsMap.get(key);\n  if (!dep) depsMap.set(key, (dep = new Set()));\n  dep.add(activeEffect);\n}\n\nfunction trigger(target, key) {\n  const depsMap = targetMap.get(target);\n  if (!depsMap) return;\n  const dep = depsMap.get(key);\n  if (dep) dep.forEach(effect => effect());\n}\n\nfunction reactive(target) {\n  return new Proxy(target, {\n    get(target, key, receiver) {\n      track(target, key);\n      return Reflect.get(target, key, receiver);\n    },\n    set(target, key, value, receiver) {\n      const res = Reflect.set(target, key, value, receiver);\n      trigger(target, key);\n      return res;\n    }\n  });\n}\n\nfunction effect(fn) {\n  activeEffect = fn;\n  fn();\n  activeEffect = null;\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Returning `false` or omitting return inside a `set()` trap in strict mode.",
          "vi": "Trả về `false` hoặc quên return bên trong trap `set()` trong strict mode."
        },
        "correction": {
          "en": "Always return `true` (or `Reflect.set(...)`) from the `set` trap upon successful assignment.",
          "vi": "Luôn return `true` (hoặc `Reflect.set(...)`) từ trap `set` khi gán giá trị thành công."
        }
      }
    ],
    "tips": [
      {
        "en": "Always pass the `receiver` argument to Reflect methods: `Reflect.get(target, prop, receiver)` ensures that getter functions inside inherited prototypes receive the correct Proxy instance as `this`.",
        "vi": "Luôn truyền tham số `receiver` vào các phương thức Reflect: `Reflect.get(target, prop, receiver)` đảm bảo các hàm getter trong prototype kế thừa nhận đúng instance Proxy làm `this`."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_23_1",
      "type": "complete_code",
      "title": {
        "en": "Safe Default Dictionary (Python-Style defaultdict) with Proxy",
        "vi": "Tạo Từ Điển Mặc Định An Toàn (defaultdict) Bằng Proxy"
      },
      "instruction": {
        "en": "Write a function `createDefaultDict(defaultFactory)` that takes a factory function and returns a Proxy. When accessing an undefined property, it automatically invokes `defaultFactory(key)`, assigns the returned value to the target object, and returns it.",
        "vi": "Viết hàm `createDefaultDict(defaultFactory)` nhận hàm factory và trả về một Proxy. Khi truy cập một thuộc tính chưa tồn tại, nó tự động gọi `defaultFactory(key)`, gán giá trị trả về vào object và trả về giá trị đó."
      },
      "starterCode": "function createDefaultDict(defaultFactory) {\n  // Implement defaultdict\n}\n\nconst counts = createDefaultDict(() => 0);\ncounts.apple += 1;\ncounts.apple += 2;\nconsole.log(counts.apple);  // 3\nconsole.log(counts.banana); // 0",
      "solutionCode": "function createDefaultDict(defaultFactory) {\n  return new Proxy({}, {\n    get(target, prop, receiver) {\n      if (typeof prop === 'symbol') {\n        return Reflect.get(target, prop, receiver);\n      }\n      if (!(prop in target)) {\n        target[prop] = defaultFactory(prop);\n      }\n      return Reflect.get(target, prop, receiver);\n    }\n  });\n}",
      "hint": {
        "en": "In get trap, check `!(prop in target)`. If missing, set `target[prop] = defaultFactory(prop)` then return Reflect.get.",
        "vi": "Trong trap get, kiểm tra `!(prop in target)`. Nếu chưa có, gán `target[prop] = defaultFactory(prop)` rồi trả về Reflect.get."
      }
    },
    {
      "id": "js_ex_23_2",
      "type": "complete_code",
      "title": {
        "en": "Deep Immutable Read-Only Proxy Wrapper",
        "vi": "Bọc Đối Tượng Bất Biến Sâu (Deep Read-Only) Bằng Proxy"
      },
      "instruction": {
        "en": "Write a function `deepFreezeProxy(obj)` that returns a deep read-only Proxy. Any attempt to set (`set`) or delete (`deleteProperty`) properties must throw an Error. Nested objects accessed via `get` must also be wrapped in a read-only Proxy automatically.",
        "vi": "Viết hàm `deepFreezeProxy(obj)` trả về Proxy chỉ đọc bất biến sâu. Mọi hành vi gán (`set`) hoặc xóa (`deleteProperty`) đều phải ném Error. Các object con lồng nhau khi được đọc qua `get` cũng phải tự động được bọc trong read-only Proxy."
      },
      "starterCode": "function deepFreezeProxy(obj) {\n  // Implement deep readonly proxy\n}",
      "solutionCode": "function deepFreezeProxy(obj) {\n  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {\n    return obj;\n  }\n\n  return new Proxy(obj, {\n    get(target, prop, receiver) {\n      const val = Reflect.get(target, prop, receiver);\n      return deepFreezeProxy(val);\n    },\n    set(target, prop) {\n      throw new Error(`Cannot modify read-only property '${String(prop)}'`);\n    },\n    deleteProperty(target, prop) {\n      throw new Error(`Cannot delete read-only property '${String(prop)}'`);\n    }\n  });\n}",
      "hint": {
        "en": "In get trap: return deepFreezeProxy(val). In set and deleteProperty traps: throw new Error.",
        "vi": "Trong trap get: trả về deepFreezeProxy(val). Trong trap set và deleteProperty: ném new Error."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_23",
    "title": {
      "en": "Smart Negative-Index & Array Slicing Proxy",
      "vi": "Proxy Mở Rộng Hỗ Trợ Chỉ Số Âm & Cắt Mảng Thông Minh Cho Array"
    },
    "description": {
      "en": "Build a wrapper function `enhanceArray(arr)` that returns a Proxy over an array supporting Python-like negative indexing (`arr[-1]` gets last item, `arr[-1] = 99` sets last item) and string range slicing syntax (e.g. `arr['1:4']` returns a slice from index 1 to 4).",
      "vi": "Xây dựng hàm `enhanceArray(arr)` trả về một Proxy trên mảng hỗ trợ truy cập chỉ số âm kiểu Python (`arr[-1]` lấy phần tử cuối, `arr[-1] = 99` gán phần tử cuối) và cú pháp cắt dải chuỗi (ví dụ `arr['1:4']` trả về mảng con từ vị trí 1 tới 4)."
    },
    "starterCode": "function enhanceArray(arr) {\n  // Implement negative index & range slicing proxy\n}\n\nconst list = enhanceArray([\"A\", \"B\", \"C\", \"D\", \"E\"]);\nconsole.log(list[-1]);     // \"E\"\nconsole.log(list[-2]);     // \"D\"\nconsole.log(list[\"1:4\"]);  // [\"B\", \"C\", \"D\"]\nlist[-1] = \"Z\";\nconsole.log(list[4]);      // \"Z\"",
    "solutionCode": "function enhanceArray(arr) {\n  return new Proxy(arr, {\n    get(target, prop, receiver) {\n      if (typeof prop === \"string\") {\n        if (prop.includes(\":\")) {\n          const [startStr, endStr] = prop.split(\":\");\n          const start = startStr === \"\" ? 0 : Number(startStr);\n          const end = endStr === \"\" ? target.length : Number(endStr);\n          const actualStart = start < 0 ? Math.max(0, target.length + start) : start;\n          const actualEnd = end < 0 ? Math.max(0, target.length + end) : end;\n          return target.slice(actualStart, actualEnd);\n        }\n\n        const index = Number(prop);\n        if (Number.isInteger(index) && index < 0) {\n          const actualIndex = target.length + index;\n          return Reflect.get(target, actualIndex, receiver);\n        }\n      }\n\n      return Reflect.get(target, prop, receiver);\n    },\n    set(target, prop, value, receiver) {\n      if (typeof prop === \"string\") {\n        const index = Number(prop);\n        if (Number.isInteger(index) && index < 0) {\n          const actualIndex = target.length + index;\n          return Reflect.set(target, actualIndex, value, receiver);\n        }\n      }\n      return Reflect.set(target, prop, value, receiver);\n    }\n  });\n}",
    "hints": [
      {
        "en": "In get/set: parse numeric prop, convert negative index `target.length + index`. If string contains ':', split and call target.slice().",
        "vi": "Trong get/set: parse prop sang số, đổi chỉ số âm thành `target.length + index`. Nếu chuỗi chứa ':', tách chuỗi và gọi target.slice()."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Smart Negative-Index & Array Slicing Proxy according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Proxy Mở Rộng Hỗ Trợ Chỉ Số Âm & Cắt Mảng Thông Minh Cho Array theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_23_1",
      "type": "single_choice",
      "question": {
        "en": "What is a Proxy in JavaScript?",
        "vi": "Proxy trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "An object that wraps another target object to intercept and redefine fundamental operations like property reading, writing, and function calls",
          "vi": "Một đối tượng bọc đối tượng mục tiêu khác để can thiệp và định nghĩa lại các thao tác cơ bản như đọc, ghi thuộc tính và gọi hàm"
        },
        {
          "en": "A network proxy server for fetching images",
          "vi": "Một máy chủ proxy mạng để tải hình ảnh"
        },
        {
          "en": "A tool for compressing JavaScript code",
          "vi": "Một công cụ nén mã nguồn JavaScript"
        },
        {
          "en": "A replacement for HTML div tags",
          "vi": "Một giải pháp thay thế thẻ div trong HTML"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Proxies allow deep metaprogramming interception of low-level object behaviors.",
        "vi": "Proxy cho phép siêu lập trình can thiệp tầng sâu vào các hành vi đối tượng cấp thấp."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "easy"
    },
    {
      "id": "js_q_23_2",
      "type": "predict_output",
      "question": {
        "en": "What happens in strict mode if a Proxy `set()` trap returns `false`?",
        "vi": "Điều gì xảy ra trong strict mode nếu một trap `set()` của Proxy trả về `false`?"
      },
      "options": [
        {
          "en": "A TypeError is thrown indicating the set trap returned falsish",
          "vi": "Ném lỗi TypeError thông báo trap set trả về giá trị falsy"
        },
        {
          "en": "The value is set anyway",
          "vi": "Giá trị vẫn được gán bình thường"
        },
        {
          "en": "Target object is deleted",
          "vi": "Đối tượng target bị xóa"
        },
        {
          "en": "Nothing happens",
          "vi": "Không có gì xảy ra"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In strict mode, the JavaScript runtime expects `set()` traps to return `true` on successful assignment; returning `false` triggers a TypeError.",
        "vi": "Trong strict mode, runtime JavaScript yêu cầu trap `set()` phải trả về `true`; trả về `false` sẽ ném lỗi TypeError."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "easy"
    },
    {
      "id": "js_q_23_3",
      "type": "single_choice",
      "question": {
        "en": "Why should you use `Reflect.get(target, prop, receiver)` inside a `get()` trap instead of `target[prop]`?",
        "vi": "Tại sao nên dùng `Reflect.get(target, prop, receiver)` trong trap `get()` thay vì `target[prop]`?"
      },
      "options": [
        {
          "en": "Passing `receiver` ensures getter functions on prototypes correctly bind `this` to the Proxy instance rather than the raw target object",
          "vi": "Truyền `receiver` đảm bảo các hàm getter trên prototype liên kết đúng ngữ cảnh `this` vào instance Proxy thay vì đối tượng target thô"
        },
        {
          "en": "Reflect is 1000x faster than square brackets",
          "vi": "Reflect nhanh gấp 1000 lần dấu ngoặc vuông"
        },
        {
          "en": "Target square brackets are deprecated in ES6",
          "vi": "Dấu ngoặc vuông bị cấm trong ES6"
        },
        {
          "en": "Reflect converts all values to strings",
          "vi": "Reflect tự động chuyển mọi giá trị sang chuỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `receiver` parameter maintains correct context for prototype getter methods.",
        "vi": "Tham số `receiver` bảo toàn ngữ cảnh `this` chính xác cho các phương thức getter trên chuỗi prototype."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "easy"
    },
    {
      "id": "js_q_23_4",
      "type": "predict_output",
      "question": {
        "en": "Which Proxy trap intercepts the `in` operator (e.g. `'key' in proxy`)?",
        "vi": "Trap nào của Proxy dùng để can thiệp vào toán tử `in` (ví dụ `'key' in proxy`)?"
      },
      "options": [
        {
          "en": "has(target, prop)",
          "vi": "has(target, prop)"
        },
        {
          "en": "in(target, prop)",
          "vi": "in(target, prop)"
        },
        {
          "en": "contains(target, prop)",
          "vi": "contains(target, prop)"
        },
        {
          "en": "check(target, prop)",
          "vi": "check(target, prop)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `has` trap intercepts `prop in object` checks.",
        "vi": "Trap `has` chịu trách nhiệm can thiệp phép kiểm tra `prop in object`."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "medium"
    },
    {
      "id": "js_q_23_5",
      "type": "single_choice",
      "question": {
        "en": "How do you create a Proxy that can be permanently deactivated on demand?",
        "vi": "Cách tạo một Proxy có thể bị vô hiệu hóa vĩnh viễn theo yêu cầu là gì?"
      },
      "options": [
        {
          "en": "Proxy.revocable(target, handler)",
          "vi": "Proxy.revocable(target, handler)"
        },
        {
          "en": "new Proxy(target, { revocable: true })",
          "vi": "new Proxy(target, { revocable: true })"
        },
        {
          "en": "delete Proxy.target",
          "vi": "delete Proxy.target"
        },
        {
          "en": "Proxy.kill(target)",
          "vi": "Proxy.kill(target)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Proxy.revocable()` returns `{ proxy, revoke }`. Calling `revoke()` severs all access to the target.",
        "vi": "`Proxy.revocable()` trả về `{ proxy, revoke }`. Gọi `revoke()` sẽ ngắt toàn bộ quyền truy cập tới target."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "medium"
    },
    {
      "id": "js_q_23_6",
      "type": "predict_output",
      "question": {
        "en": "Which Proxy trap intercepts function calls when the proxy itself is wrapping a function?",
        "vi": "Trap nào của Proxy can thiệp khi gọi hàm nếu đối tượng target là một hàm?"
      },
      "options": [
        {
          "en": "apply(target, thisArg, argList)",
          "vi": "apply(target, thisArg, argList)"
        },
        {
          "en": "call(target, argList)",
          "vi": "call(target, argList)"
        },
        {
          "en": "invoke(target, thisArg)",
          "vi": "invoke(target, thisArg)"
        },
        {
          "en": "execute(target, args)",
          "vi": "execute(target, args)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `apply` trap intercepts function invocations `proxy(...args)`, `.call()`, and `.apply()`.",
        "vi": "Trap `apply` can thiệp các lệnh gọi hàm `proxy(...args)`, `.call()`, và `.apply()`."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "medium"
    },
    {
      "id": "js_q_23_7",
      "type": "fill_blank",
      "question": {
        "en": "To intercept object instantiation with the `new` keyword, implement the _____ trap in the Proxy handler.",
        "vi": "Để can thiệp vào quá trình khởi tạo đối tượng bằng từ khóa `new`, cài đặt trap _____ trong handler của Proxy."
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
        "en": "The `construct(target, argList, newTarget)` trap intercepts constructor `new` invocations.",
        "vi": "Trap `construct(target, argList, newTarget)` can thiệp khi gọi `new` trên constructor."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "construct"
      ]
    },
    {
      "id": "js_q_23_8",
      "type": "single_choice",
      "question": {
        "en": "Which Proxy trap intercepts the `delete obj.prop` statement?",
        "vi": "Trap nào của Proxy can thiệp vào câu lệnh `delete obj.prop`?"
      },
      "options": [
        {
          "en": "deleteProperty(target, prop)",
          "vi": "deleteProperty(target, prop)"
        },
        {
          "en": "remove(target, prop)",
          "vi": "remove(target, prop)"
        },
        {
          "en": "del(target, prop)",
          "vi": "del(target, prop)"
        },
        {
          "en": "destroy(target, prop)",
          "vi": "destroy(target, prop)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`deleteProperty` handles the property deletion lifecycle.",
        "vi": "`deleteProperty` xử lý vòng đời xóa bỏ thuộc tính."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "hard"
    },
    {
      "id": "js_q_23_9",
      "type": "predict_output",
      "question": {
        "en": "If a Proxy does NOT define a specific trap (e.g. no `set` trap is defined in handler), what happens when that operation occurs?",
        "vi": "Nếu Proxy KHÔNG định nghĩa một trap cụ thể (ví dụ không có trap `set` trong handler), điều gì sẽ xảy ra khi thao tác đó diễn ra?"
      },
      "options": [
        {
          "en": "The operation falls through and executes the default behavior directly on the target object",
          "vi": "Thao tác tự động chuyển tiếp và thực thi hành vi mặc định trực tiếp trên đối tượng target"
        },
        {
          "en": "A SyntaxError is thrown",
          "vi": "Ném lỗi SyntaxError"
        },
        {
          "en": "The operation is blocked and silently ignored",
          "vi": "Thao tác bị chặn và bỏ qua trong im lặng"
        },
        {
          "en": "The target is destroyed",
          "vi": "Đối tượng target bị hủy"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Omitted traps default to standard passthrough operations on the target.",
        "vi": "Các trap bị khuyết sẽ tự động chuyển tiếp hành vi mặc định xuống target."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "hard"
    },
    {
      "id": "js_q_23_10",
      "type": "single_choice",
      "question": {
        "en": "How does Vue 3's Reactivity System use Proxy over Vue 2's `Object.defineProperty`?",
        "vi": "Hệ thống phản ứng của Vue 3 sử dụng Proxy vượt trội hơn `Object.defineProperty` của Vue 2 ở điểm nào?"
      },
      "options": [
        {
          "en": "Proxy intercepts newly added properties, deleted properties, and array index assignments dynamically without requiring upfront key iteration or Vue.set() hacks",
          "vi": "Proxy can thiệp động việc thêm thuộc tính mới, xóa thuộc tính và gán chỉ số mảng mà không cần duyệt lặp key từ đầu hay dùng thủ thuật Vue.set()"
        },
        {
          "en": "Proxy executes in C++ WebAssembly",
          "vi": "Proxy chạy trong C++ WebAssembly"
        },
        {
          "en": "Vue 2 used SQL databases for reactivity",
          "vi": "Vue 2 dùng database SQL để phản ứng"
        },
        {
          "en": "Proxy saves 100% of network bandwidth",
          "vi": "Proxy tiết kiệm 100% băng thông mạng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Proxies intercept operations on the whole object at the language boundary, eliminating the need to mutate individual property descriptors.",
        "vi": "Proxy can thiệp toàn bộ thao tác trên đối tượng ở cấp độ ngôn ngữ, loại bỏ hoàn toàn việc phải sửa descriptor từng thuộc tính."
      },
      "topicId": "js_proxy_reflect",
      "difficulty": "hard"
    }
  ]
};
export default lesson23;
