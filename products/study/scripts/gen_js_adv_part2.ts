import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/advanced/module01');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 23 ---
const lesson23: Lesson = {
  id: "js_lesson_23",
  courseId: "javascript",
  levelId: "advanced",
  moduleId: "js_mod_5",
  order: 23,
  title: {
    en: "Proxy & Reflect APIs: Metaprogramming & Reactive State",
    vi: "Proxy & Reflect API: Siêu Lập Trình & Hệ Thống Phản Ứng (Reactivity)"
  },
  summary: {
    en: "Master deep object interception with `Proxy` traps (`get`, `set`, `has`, `deleteProperty`, `apply`), companion `Reflect` methods, revocable proxies, schema validators, and building a mini Vue 3-style reactivity engine.",
    vi: "Làm chủ cơ chế can thiệp tầng sâu với các trap của `Proxy` (`get`, `set`, `has`, `deleteProperty`, `apply`), bộ API bổ trợ `Reflect`, proxy có thể thu hồi, hệ thống xác thực dữ liệu và xây dựng engine phản ứng kiểu Vue 3."
  },
  estimatedMinutes: 24,
  topicId: "js_proxy_reflect",
  learn: {
    introduction: {
      en: "Metaprogramming allows a program to inspect and alter its own core operations. ES6 `Proxy` enables wrapping target objects to intercept fundamental language operations (property access, assignment, enumeration, function invocation). Paired with `Reflect`—which provides standardized, functional equivalents of engine internal methods—Proxies empower modern frameworks (like Vue 3 and MobX) to build elegant reactive state systems.",
      vi: "Siêu lập trình (Metaprogramming) cho phép một chương trình tự kiểm tra và thay đổi các hành vi cốt lõi của chính nó. ES6 `Proxy` cho phép bọc đối tượng mục tiêu để can thiệp vào các thao tác cơ bản của ngôn ngữ (đọc thuộc tính, gán giá trị, duyệt phần tử, gọi hàm). Kết hợp cùng `Reflect`—bộ phương thức chuẩn hóa tương ứng với các cơ chế nội bộ của engine—Proxy là nền tảng giúp các framework hiện đại (như Vue 3, MobX) xây dựng hệ thống trạng thái phản ứng (reactive state) mượt mà."
    },
    conceptExplanation: {
      en: "1. Proxy Structure: `new Proxy(target, handler)`. The `handler` contains 'traps' (interception functions).\n\n2. Key Proxy Traps:\n   - `get(target, prop, receiver)`: Intercepts reading properties.\n   - `set(target, prop, value, receiver)`: Intercepts writing properties (must return `true` on success in strict mode).\n   - `has(target, prop)`: Intercepts `prop in obj` operator.\n   - `deleteProperty(target, prop)`: Intercepts `delete obj.prop`.\n   - `apply(target, thisArg, argList)`: Intercepts function invocations.\n   - `construct(target, argList, newTarget)`: Intercepts `new FunctionName()`.\n\n3. The `Reflect` API: Every Proxy trap has an identical matching method on `Reflect` (`Reflect.get`, `Reflect.set`). Always delegate to `Reflect` inside traps to preserve proper prototype receiver binding (`this`).\n\n4. Revocable Proxies: `Proxy.revocable(target, handler)` returns `{ proxy, revoke }` to permanently disable access upon security timeouts.",
      vi: "1. Cấu Trúc Proxy: `new Proxy(target, handler)`. `handler` chứa các 'trap' (hàm can thiệp).\n\n2. Các Trap Quan Trọng:\n   - `get(target, prop, receiver)`: Can thiệp khi đọc thuộc tính.\n   - `set(target, prop, value, receiver)`: Can thiệp khi gán giá trị (bắt buộc trả về `true` khi thành công trong strict mode).\n   - `has(target, prop)`: Can thiệp toán tử `prop in obj`.\n   - `deleteProperty(target, prop)`: Can thiệp khi `delete obj.prop`.\n   - `apply(target, thisArg, argList)`: Can thiệp khi gọi hàm.\n   - `construct(target, argList, newTarget)`: Can thiệp khi gọi `new FunctionName()`.\n\n3. API `Reflect`: Mỗi trap của Proxy đều có một phương thức tương ứng trên `Reflect` (`Reflect.get`, `Reflect.set`). Luôn ủy quyền cho `Reflect` bên trong trap để bảo toàn ngữ cảnh receiver (`this`) trên chuỗi prototype.\n\n4. Proxy Thu Hồi (Revocable): `Proxy.revocable(target, handler)` trả về `{ proxy, revoke }` giúp vô hiệu hóa quyền truy cập vĩnh viễn sau khi hết hạn bảo mật."
    },
    syntax: `// 1. Validated Schema Store with Proxy & Reflect
const validator = {
  set(target, prop, value, receiver) {
    if (prop === "age") {
      if (typeof value !== "number" || value < 0) {
        throw new TypeError("Age must be a positive number");
      }
    }
    // Delegate to Reflect.set to ensure correct prototype binding
    return Reflect.set(target, prop, value, receiver);
  }
};

const user = new Proxy({}, validator);
user.age = 28; // OK
// user.age = -5; // Throws TypeError!

// 2. Revocable Security Proxy
const { proxy: secureDoc, revoke } = Proxy.revocable({ secretKey: "XYZ123" }, {});
console.log(secureDoc.secretKey); // "XYZ123"
revoke();
// secureDoc.secretKey; // Throws TypeError: Cannot perform 'get' on a proxy that has been revoked`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Mini Reactive State & Auto-Rendering Engine (Vue 3 Style)",
          vi: "Engine Quản Lý Trạng Thái Phản Ứng Tự Động Render (Phong Cách Vue 3)"
        },
        description: {
          en: "Demonstrates an observable reactive state function that automatically runs tracking subscriber effects when mutated.",
          vi: "Minh họa hàm reactive theo dõi và tự động kích hoạt các subscriber effect khi dữ liệu thay đổi."
        },
        code: `let activeEffect = null;
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let dep = depsMap.get(key);
  if (!dep) depsMap.set(key, (dep = new Set()));
  dep.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) dep.forEach(effect => effect());
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return res;
    }
  });
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Returning `false` or omitting return inside a `set()` trap in strict mode.",
          vi: "Trả về `false` hoặc quên return bên trong trap `set()` trong strict mode."
        },
        correction: {
          en: "Always return `true` (or `Reflect.set(...)`) from the `set` trap upon successful assignment.",
          vi: "Luôn return `true` (hoặc `Reflect.set(...)`) từ trap `set` khi gán giá trị thành công."
        },
        explanation: {
          en: "In strict mode (`'use strict'`), a `set` trap returning a falsy value throws a fatal `TypeError: 'set' on proxy: trap returned falsish for property`.",
          vi: "Trong strict mode, trap `set` trả về giá trị falsy sẽ ném lỗi fatal `TypeError: 'set' on proxy: trap returned falsish`."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Always pass the `receiver` argument to Reflect methods",
          vi: "Luôn truyền tham số `receiver` vào các phương thức Reflect"
        },
        description: {
          en: "`Reflect.get(target, prop, receiver)` ensures that getter functions inside inherited prototypes receive the correct Proxy instance as `this`.",
          vi: "`Reflect.get(target, prop, receiver)` đảm bảo các hàm getter trong prototype kế thừa nhận đúng instance Proxy làm `this`."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_23_1",
      title: {
        en: "Safe Default Dictionary (Python-Style defaultdict) with Proxy",
        vi: "Tạo Từ Điển Mặc Định An Toàn (defaultdict) Bằng Proxy"
      },
      instruction: {
        en: "Write a function `createDefaultDict(defaultFactory)` that takes a factory function and returns a Proxy. When accessing an undefined property, it automatically invokes `defaultFactory(key)`, assigns the returned value to the target object, and returns it.",
        vi: "Viết hàm `createDefaultDict(defaultFactory)` nhận hàm factory và trả về một Proxy. Khi truy cập một thuộc tính chưa tồn tại, nó tự động gọi `defaultFactory(key)`, gán giá trị trả về vào object và trả về giá trị đó."
      },
      starterCode: `function createDefaultDict(defaultFactory) {
  // Implement defaultdict
}

const counts = createDefaultDict(() => 0);
counts.apple += 1;
counts.apple += 2;
console.log(counts.apple);  // 3
console.log(counts.banana); // 0`,
      solutionCode: `function createDefaultDict(defaultFactory) {
  return new Proxy({}, {
    get(target, prop, receiver) {
      if (typeof prop === 'symbol') {
        return Reflect.get(target, prop, receiver);
      }
      if (!(prop in target)) {
        target[prop] = defaultFactory(prop);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}`,
      hints: [
        {
          en: "In get trap, check `!(prop in target)`. If missing, set `target[prop] = defaultFactory(prop)` then return Reflect.get.",
          vi: "Trong trap get, kiểm tra `!(prop in target)`. Nếu chưa có, gán `target[prop] = defaultFactory(prop)` rồi trả về Reflect.get."
        }
      ]
    },
    {
      id: "js_ex_23_2",
      title: {
        en: "Deep Immutable Read-Only Proxy Wrapper",
        vi: "Bọc Đối Tượng Bất Biến Sâu (Deep Read-Only) Bằng Proxy"
      },
      instruction: {
        en: "Write a function `deepFreezeProxy(obj)` that returns a deep read-only Proxy. Any attempt to set (`set`) or delete (`deleteProperty`) properties must throw an Error. Nested objects accessed via `get` must also be wrapped in a read-only Proxy automatically.",
        vi: "Viết hàm `deepFreezeProxy(obj)` trả về Proxy chỉ đọc bất biến sâu. Mọi hành vi gán (`set`) hoặc xóa (`deleteProperty`) đều phải ném Error. Các object con lồng nhau khi được đọc qua `get` cũng phải tự động được bọc trong read-only Proxy."
      },
      starterCode: `function deepFreezeProxy(obj) {
  // Implement deep readonly proxy
}`,
      solutionCode: `function deepFreezeProxy(obj) {
  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return obj;
  }

  return new Proxy(obj, {
    get(target, prop, receiver) {
      const val = Reflect.get(target, prop, receiver);
      return deepFreezeProxy(val);
    },
    set(target, prop) {
      throw new Error(\`Cannot modify read-only property '\${String(prop)}'\`);
    },
    deleteProperty(target, prop) {
      throw new Error(\`Cannot delete read-only property '\${String(prop)}'\`);
    }
  });
}`,
      hints: [
        {
          en: "In get trap: return deepFreezeProxy(val). In set and deleteProperty traps: throw new Error.",
          vi: "Trong trap get: trả về deepFreezeProxy(val). Trong trap set và deleteProperty: ném new Error."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_23",
    title: {
      en: "Smart Negative-Index & Array Slicing Proxy",
      vi: "Proxy Mở Rộng Hỗ Trợ Chỉ Số Âm & Cắt Mảng Thông Minh Cho Array"
    },
    description: {
      en: "Build a wrapper function `enhanceArray(arr)` that returns a Proxy over an array supporting Python-like negative indexing (`arr[-1]` gets last item, `arr[-1] = 99` sets last item) and string range slicing syntax (e.g. `arr['1:4']` returns a slice from index 1 to 4).",
      vi: "Xây dựng hàm `enhanceArray(arr)` trả về một Proxy trên mảng hỗ trợ truy cập chỉ số âm kiểu Python (`arr[-1]` lấy phần tử cuối, `arr[-1] = 99` gán phần tử cuối) và cú pháp cắt dải chuỗi (ví dụ `arr['1:4']` trả về mảng con từ vị trí 1 tới 4)."
    },
    starterCode: `function enhanceArray(arr) {
  // Implement negative index & range slicing proxy
}

const list = enhanceArray(["A", "B", "C", "D", "E"]);
console.log(list[-1]);     // "E"
console.log(list[-2]);     // "D"
console.log(list["1:4"]);  // ["B", "C", "D"]
list[-1] = "Z";
console.log(list[4]);      // "Z"`,
    solutionCode: `function enhanceArray(arr) {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      if (typeof prop === "string") {
        if (prop.includes(":")) {
          const [startStr, endStr] = prop.split(":");
          const start = startStr === "" ? 0 : Number(startStr);
          const end = endStr === "" ? target.length : Number(endStr);
          const actualStart = start < 0 ? Math.max(0, target.length + start) : start;
          const actualEnd = end < 0 ? Math.max(0, target.length + end) : end;
          return target.slice(actualStart, actualEnd);
        }

        const index = Number(prop);
        if (Number.isInteger(index) && index < 0) {
          const actualIndex = target.length + index;
          return Reflect.get(target, actualIndex, receiver);
        }
      }

      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      if (typeof prop === "string") {
        const index = Number(prop);
        if (Number.isInteger(index) && index < 0) {
          const actualIndex = target.length + index;
          return Reflect.set(target, actualIndex, value, receiver);
        }
      }
      return Reflect.set(target, prop, value, receiver);
    }
  });
}`,
    hints: [
      {
        en: "In get/set: parse numeric prop, convert negative index `target.length + index`. If string contains ':', split and call target.slice().",
        vi: "Trong get/set: parse prop sang số, đổi chỉ số âm thành `target.length + index`. Nếu chuỗi chứa ':', tách chuỗi và gọi target.slice()."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_23_1",
      type: "single_choice",
      question: {
        en: "What is a Proxy in JavaScript?",
        vi: "Proxy trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "An object that wraps another target object to intercept and redefine fundamental operations like property reading, writing, and function calls", vi: "Một đối tượng bọc đối tượng mục tiêu khác để can thiệp và định nghĩa lại các thao tác cơ bản như đọc, ghi thuộc tính và gọi hàm" } },
        { id: "b", text: { en: "A network proxy server for fetching images", vi: "Một máy chủ proxy mạng để tải hình ảnh" } },
        { id: "c", text: { en: "A tool for compressing JavaScript code", vi: "Một công cụ nén mã nguồn JavaScript" } },
        { id: "d", text: { en: "A replacement for HTML div tags", vi: "Một giải pháp thay thế thẻ div trong HTML" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Proxies allow deep metaprogramming interception of low-level object behaviors.",
        vi: "Proxy cho phép siêu lập trình can thiệp tầng sâu vào các hành vi đối tượng cấp thấp."
      }
    },
    {
      id: "js_q_23_2",
      type: "predict_output",
      question: {
        en: "What happens in strict mode if a Proxy `set()` trap returns `false`?",
        vi: "Điều gì xảy ra trong strict mode nếu một trap `set()` của Proxy trả về `false`?"
      },
      options: [
        { id: "a", text: { en: "A TypeError is thrown indicating the set trap returned falsish", vi: "Ném lỗi TypeError thông báo trap set trả về giá trị falsy" } },
        { id: "b", text: { en: "The value is set anyway", vi: "Giá trị vẫn được gán bình thường" } },
        { id: "c", text: { en: "Target object is deleted", vi: "Đối tượng target bị xóa" } },
        { id: "d", text: { en: "Nothing happens", vi: "Không có gì xảy ra" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "In strict mode, the JavaScript runtime expects `set()` traps to return `true` on successful assignment; returning `false` triggers a TypeError.",
        vi: "Trong strict mode, runtime JavaScript yêu cầu trap `set()` phải trả về `true`; trả về `false` sẽ ném lỗi TypeError."
      }
    },
    {
      id: "js_q_23_3",
      type: "single_choice",
      question: {
        en: "Why should you use `Reflect.get(target, prop, receiver)` inside a `get()` trap instead of `target[prop]`?",
        vi: "Tại sao nên dùng `Reflect.get(target, prop, receiver)` trong trap `get()` thay vì `target[prop]`?"
      },
      options: [
        { id: "a", text: { en: "Passing `receiver` ensures getter functions on prototypes correctly bind `this` to the Proxy instance rather than the raw target object", vi: "Truyền `receiver` đảm bảo các hàm getter trên prototype liên kết đúng ngữ cảnh `this` vào instance Proxy thay vì đối tượng target thô" } },
        { id: "b", text: { en: "Reflect is 1000x faster than square brackets", vi: "Reflect nhanh gấp 1000 lần dấu ngoặc vuông" } },
        { id: "c", text: { en: "Target square brackets are deprecated in ES6", vi: "Dấu ngoặc vuông bị cấm trong ES6" } },
        { id: "d", text: { en: "Reflect converts all values to strings", vi: "Reflect tự động chuyển mọi giá trị sang chuỗi" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The `receiver` parameter maintains correct context for prototype getter methods.",
        vi: "Tham số `receiver` bảo toàn ngữ cảnh `this` chính xác cho các phương thức getter trên chuỗi prototype."
      }
    },
    {
      id: "js_q_23_4",
      type: "predict_output",
      question: {
        en: "Which Proxy trap intercepts the `in` operator (e.g. `'key' in proxy`)?",
        vi: "Trap nào của Proxy dùng để can thiệp vào toán tử `in` (ví dụ `'key' in proxy`)?"
      },
      options: [
        { id: "a", text: { en: "has(target, prop)", vi: "has(target, prop)" } },
        { id: "b", text: { en: "in(target, prop)", vi: "in(target, prop)" } },
        { id: "c", text: { en: "contains(target, prop)", vi: "contains(target, prop)" } },
        { id: "d", text: { en: "check(target, prop)", vi: "check(target, prop)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The `has` trap intercepts `prop in object` checks.",
        vi: "Trap `has` chịu trách nhiệm can thiệp phép kiểm tra `prop in object`."
      }
    },
    {
      id: "js_q_23_5",
      type: "single_choice",
      question: {
        en: "How do you create a Proxy that can be permanently deactivated on demand?",
        vi: "Cách tạo một Proxy có thể bị vô hiệu hóa vĩnh viễn theo yêu cầu là gì?"
      },
      options: [
        { id: "a", text: { en: "Proxy.revocable(target, handler)", vi: "Proxy.revocable(target, handler)" } },
        { id: "b", text: { en: "new Proxy(target, { revocable: true })", vi: "new Proxy(target, { revocable: true })" } },
        { id: "c", text: { en: "delete Proxy.target", vi: "delete Proxy.target" } },
        { id: "d", text: { en: "Proxy.kill(target)", vi: "Proxy.kill(target)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Proxy.revocable()` returns `{ proxy, revoke }`. Calling `revoke()` severs all access to the target.",
        vi: "`Proxy.revocable()` trả về `{ proxy, revoke }`. Gọi `revoke()` sẽ ngắt toàn bộ quyền truy cập tới target."
      }
    },
    {
      id: "js_q_23_6",
      type: "predict_output",
      question: {
        en: "Which Proxy trap intercepts function calls when the proxy itself is wrapping a function?",
        vi: "Trap nào của Proxy can thiệp khi gọi hàm nếu đối tượng target là một hàm?"
      },
      options: [
        { id: "a", text: { en: "apply(target, thisArg, argList)", vi: "apply(target, thisArg, argList)" } },
        { id: "b", text: { en: "call(target, argList)", vi: "call(target, argList)" } },
        { id: "c", text: { en: "invoke(target, thisArg)", vi: "invoke(target, thisArg)" } },
        { id: "d", text: { en: "execute(target, args)", vi: "execute(target, args)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The `apply` trap intercepts function invocations `proxy(...args)`, `.call()`, and `.apply()`.",
        vi: "Trap `apply` can thiệp các lệnh gọi hàm `proxy(...args)`, `.call()`, và `.apply()`."
      }
    },
    {
      id: "js_q_23_7",
      type: "fill_blank",
      question: {
        en: "To intercept object instantiation with the `new` keyword, implement the _____ trap in the Proxy handler.",
        vi: "Để can thiệp vào quá trình khởi tạo đối tượng bằng từ khóa `new`, cài đặt trap _____ trong handler của Proxy."
      },
      correctAnswer: "construct",
      explanation: {
        en: "The `construct(target, argList, newTarget)` trap intercepts constructor `new` invocations.",
        vi: "Trap `construct(target, argList, newTarget)` can thiệp khi gọi `new` trên constructor."
      }
    },
    {
      id: "js_q_23_8",
      type: "single_choice",
      question: {
        en: "Which Proxy trap intercepts the `delete obj.prop` statement?",
        vi: "Trap nào của Proxy can thiệp vào câu lệnh `delete obj.prop`?"
      },
      options: [
        { id: "a", text: { en: "deleteProperty(target, prop)", vi: "deleteProperty(target, prop)" } },
        { id: "b", text: { en: "remove(target, prop)", vi: "remove(target, prop)" } },
        { id: "c", text: { en: "del(target, prop)", vi: "del(target, prop)" } },
        { id: "d", text: { en: "destroy(target, prop)", vi: "destroy(target, prop)" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`deleteProperty` handles the property deletion lifecycle.",
        vi: "`deleteProperty` xử lý vòng đời xóa bỏ thuộc tính."
      }
    },
    {
      id: "js_q_23_9",
      type: "predict_output",
      question: {
        en: "If a Proxy does NOT define a specific trap (e.g. no `set` trap is defined in handler), what happens when that operation occurs?",
        vi: "Nếu Proxy KHÔNG định nghĩa một trap cụ thể (ví dụ không có trap `set` trong handler), điều gì sẽ xảy ra khi thao tác đó diễn ra?"
      },
      options: [
        { id: "a", text: { en: "The operation falls through and executes the default behavior directly on the target object", vi: "Thao tác tự động chuyển tiếp và thực thi hành vi mặc định trực tiếp trên đối tượng target" } },
        { id: "b", text: { en: "A SyntaxError is thrown", vi: "Ném lỗi SyntaxError" } },
        { id: "c", text: { en: "The operation is blocked and silently ignored", vi: "Thao tác bị chặn và bỏ qua trong im lặng" } },
        { id: "d", text: { en: "The target is destroyed", vi: "Đối tượng target bị hủy" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Omitted traps default to standard passthrough operations on the target.",
        vi: "Các trap bị khuyết sẽ tự động chuyển tiếp hành vi mặc định xuống target."
      }
    },
    {
      id: "js_q_23_10",
      type: "code_reasoning",
      question: {
        en: "How does Vue 3's Reactivity System use Proxy over Vue 2's `Object.defineProperty`?",
        vi: "Hệ thống phản ứng của Vue 3 sử dụng Proxy vượt trội hơn `Object.defineProperty` của Vue 2 ở điểm nào?"
      },
      options: [
        { id: "a", text: { en: "Proxy intercepts newly added properties, deleted properties, and array index assignments dynamically without requiring upfront key iteration or Vue.set() hacks", vi: "Proxy can thiệp động việc thêm thuộc tính mới, xóa thuộc tính và gán chỉ số mảng mà không cần duyệt lặp key từ đầu hay dùng thủ thuật Vue.set()" } },
        { id: "b", text: { en: "Proxy executes in C++ WebAssembly", vi: "Proxy chạy trong C++ WebAssembly" } },
        { id: "c", text: { en: "Vue 2 used SQL databases for reactivity", vi: "Vue 2 dùng database SQL để phản ứng" } },
        { id: "d", text: { en: "Proxy saves 100% of network bandwidth", vi: "Proxy tiết kiệm 100% băng thông mạng" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Proxies intercept operations on the whole object at the language boundary, eliminating the need to mutate individual property descriptors.",
        vi: "Proxy can thiệp toàn bộ thao tác trên đối tượng ở cấp độ ngôn ngữ, loại bỏ hoàn toàn việc phải sửa descriptor từng thuộc tính."
      }
    }
  ]
};

// --- LESSON 24 ---
const lesson24: Lesson = {
  id: "js_lesson_24",
  courseId: "javascript",
  levelId: "advanced",
  moduleId: "js_mod_5",
  order: 24,
  title: {
    en: "WeakMap, WeakSet, Garbage Collection & Memory Management",
    vi: "WeakMap, WeakSet, Cơ Chế Dọn Rác (Garbage Collection) & Quản Lý Bộ Nhớ"
  },
  summary: {
    en: "Master V8 Generational Garbage Collection (Scavenger, Mark-Sweep-Compact), weak references with `WeakMap`/`WeakSet`/`WeakRef`, `FinalizationRegistry`, identifying memory leaks, and DOM node caching.",
    vi: "Làm chủ cơ chế dọn rác phân thế hệ của V8 Engine (Scavenger, Mark-Sweep-Compact), tham chiếu yếu với `WeakMap`/`WeakSet`/`WeakRef`, `FinalizationRegistry`, chẩn đoán rò rỉ bộ nhớ (memory leaks) và cache DOM node."
  },
  estimatedMinutes: 24,
  topicId: "js_memory_weak_collections",
  learn: {
    introduction: {
      en: "JavaScript features automatic memory management via an engine Garbage Collector (GC). However, unintentional object retention in closures, global caches, and detached DOM subtrees leads to memory leaks. Understanding V8's Generational GC hypothesis and utilizing Weak collections (`WeakMap`, `WeakSet`, and `WeakRef`) allows you to associate auxiliary data with objects without blocking them from being reclaimed by the garbage collector.",
      vi: "JavaScript quản lý bộ nhớ tự động thông qua bộ dọn rác Garbage Collector (GC) của engine. Tuy nhiên, việc giữ tham chiếu không mong muốn trong closure, cache toàn cục và các cây DOM bị tách rời (detached DOM) là nguyên nhân gây rò rỉ bộ nhớ (Memory Leak). Hiểu rõ giả thuyết phân thế hệ của V8 GC và sử dụng các tập hợp yếu (`WeakMap`, `WeakSet`, `WeakRef`) cho phép bạn gắn dữ liệu phụ trợ vào object mà không ngăn cản bộ dọn rác giải phóng bộ nhớ."
    },
    conceptExplanation: {
      en: "1. V8 Generational GC Architecture:\n   - Generational Hypothesis: Most objects die young.\n   - Young Generation (Nursery & Intermediate): Cleaned frequently via ultra-fast Scavenger copying algorithm (Minor GC).\n   - Old Generation: Long-lived surviving objects; cleaned via Mark-Sweep-Compact algorithm (Major GC).\n\n2. Strong vs Weak References:\n   - Strong Reference: Standard variables/objects; prevents GC from freeing the target as long as it is reachable from GC Roots (global window, active call stack).\n   - Weak Reference: Does NOT prevent garbage collection. When no strong references remain, the object is reclaimed.\n\n3. `WeakMap` & `WeakSet` Characteristics:\n   - Keys MUST be Objects (or non-registered Symbols).\n   - Not iterable (no `.size`, no `for...of`, no `.keys()`) because GC timing is non-deterministic.\n\n4. `WeakRef` & `FinalizationRegistry` (ES2021):\n   - `new WeakRef(target)`: Allows holding a weak reference with `weakRef.deref()`.\n   - `new FinalizationRegistry(cleanupCallback)`: Executes a cleanup hook after an object has been garbage collected.",
      vi: "1. Kiến Trúc V8 Generational GC:\n   - Giả thuyết phân thế hệ: Hầu hết các đối tượng đều 'chết trẻ'.\n   - Thế Hệ Mới (Young Gen): Dọn dẹp thường xuyên bằng thuật toán sao chép Scavenger siêu tốc (Minor GC).\n   - Thế Hệ Cũ (Old Gen): Chứa các đối tượng sống lâu; dọn dẹp bằng thuật toán Mark-Sweep-Compact (Major GC).\n\n2. Phân Biệt Tham Chiếu Mạnh (Strong) vs Yếu (Weak):\n   - Tham Chiếu Mạnh: Biến/object thông thường; ngăn GC giải phóng bộ nhớ khi vẫn còn đường dẫn từ GC Roots (window, call stack).\n   - Tham Chiếu Yếu: KHÔNG ngăn cản GC. Khi hết tham chiếu mạnh, object tự động bị giải phóng.\n\n3. Đặc Tính Của `WeakMap` & `WeakSet`:\n   - Key BẮT BUỘC phải là Object (hoặc Symbol không đăng ký).\n   - Không thể duyệt lặp (không có `.size`, không có `for...of`) vì thời điểm GC dọn rác là bất định.\n\n4. `WeakRef` & `FinalizationRegistry` (ES2021):\n   - `new WeakRef(target)`: Giữ tham chiếu yếu với hàm đọc `weakRef.deref()`.\n   - `new FinalizationRegistry(cleanupCallback)`: Chạy hàm dọn dẹp sau khi một object đã bị GC giải phóng."
    },
    syntax: `// 1. WeakMap for Private Metadata without Memory Leaks
const privateData = new WeakMap();

class SecureSession {
  constructor(userId, token) {
    // Key is 'this' instance; when session is dereferenced, metadata is auto-GCed!
    privateData.set(this, { userId, token, createdAt: Date.now() });
  }

  getUserId() {
    return privateData.get(this)?.userId;
  }
}

// 2. WeakSet for Tracking Object State
const processedNodes = new WeakSet();

function processDOMElement(el) {
  if (processedNodes.has(el)) return;
  processedNodes.add(el);
  // Perform transformation...
}`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "DOM Node Auxiliary State Cache without Memory Leaks",
          vi: "Cache Trạng Thái Bổ Trợ Cho DOM Node Phòng Tránh Rò Rỉ Bộ Nhớ"
        },
        description: {
          en: "Demonstrates caching rich widget state attached to DOM elements using WeakMap so that removing DOM elements automatically frees memory.",
          vi: "Minh họa lưu trữ trạng thái widget gắn với thẻ DOM bằng WeakMap để khi thẻ DOM bị xóa, RAM tự động được giải phóng."
        },
        code: `const widgetCache = new WeakMap();

function getOrCreateWidget(domElement) {
  if (widgetCache.has(domElement)) {
    return widgetCache.get(domElement);
  }

  const widgetInstance = {
    element: domElement,
    analyticsId: \`widget_\${Math.random().toString(36).slice(2)}\`,
    renderCount: 0,
    render() {
      this.renderCount++;
      console.log(\`Rendered \${this.analyticsId} \${this.renderCount} times\`);
    }
  };

  widgetCache.set(domElement, widgetInstance);
  return widgetInstance;
}

// When domElement is removed from document and dereferenced, 
// its cached widgetInstance is automatically collected by GC!`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using a standard `Map` to cache data keyed by DOM elements or temporary objects.",
          vi: "Dùng `Map` thông thường để cache dữ liệu có key là thẻ DOM hoặc object tạm."
        },
        correction: {
          en: "Use a `WeakMap` for object-keyed metadata caches.",
          vi: "Sử dụng `WeakMap` cho các kho cache metadata có key là object."
        },
        explanation: {
          en: "A standard `Map` holds strong references to its keys forever. Even if the DOM element is removed from the webpage, the Map prevents it from being garbage collected (Detached DOM Tree leak).",
          vi: "`Map` thông thường giữ tham chiếu mạnh vĩnh viễn tới các key. Khi thẻ DOM bị xóa khỏi trang web, Map vẫn giữ nó trong RAM gây rò rỉ bộ nhớ Detached DOM."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Prefer WeakMap for associating lifecycle-bound metadata with objects",
          vi: "Ưu tiên WeakMap để liên kết dữ liệu metadata theo vòng đời của đối tượng"
        },
        description: {
          en: "WeakMap ensures that the metadata dies the exact moment the host object becomes unreachable, with zero manual cleanup code required.",
          vi: "WeakMap đảm bảo metadata tự động biến mất ngay khi đối tượng chủ không còn sử dụng, không cần viết code dọn dẹp thủ công."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_24_1",
      title: {
        en: "Leak-Free Event Listener Tracker with WeakSet",
        vi: "Bộ Theo Dõi Đăng Ký Listener Chống Trùng Lặp Bằng WeakSet"
      },
      instruction: {
        en: "Create a function `createOnceEmitter()` that returns `{ emit(targetObj, eventName) }` using a `WeakSet` to track if an object has already emitted an event, ensuring an object only emits once throughout its lifecycle without memory leaks.",
        vi: "Tạo hàm `createOnceEmitter()` trả về `{ emit(targetObj, eventName) }` sử dụng `WeakSet` để theo dõi xem đối tượng đã từng phát sự kiện chưa, đảm bảo mỗi đối tượng chỉ phát 1 lần trong suốt vòng đời mà không gây rò rỉ RAM."
      },
      starterCode: `function createOnceEmitter() {
  // Implement leak-free once emitter
}`,
      solutionCode: `function createOnceEmitter() {
  const emittedObjects = new WeakSet();

  return {
    emit(targetObj, eventName) {
      if (!targetObj || typeof targetObj !== 'object') {
        throw new TypeError("Target must be an object");
      }
      if (emittedObjects.has(targetObj)) {
        return false; // Already emitted
      }
      emittedObjects.add(targetObj);
      console.log(\`Emitted \${eventName} for object\`);
      return true;
    }
  };
}`,
      hints: [
        {
          en: "Instantiate `new WeakSet()`. Check `emittedObjects.has(targetObj)`, if false add to WeakSet and return true.",
          vi: "Khởi tạo `new WeakSet()`. Kiểm tra `emittedObjects.has(targetObj)`, nếu false thì add vào WeakSet và return true."
        }
      ]
    },
    {
      id: "js_ex_24_2",
      title: {
        en: "Safe Memoization Cache for Objects with WeakMap",
        vi: "Hàm Memoize An Toàn Cho Object Sử Dụng WeakMap"
      },
      instruction: {
        en: "Write a function `memoizeObject(fn)` that takes a function `fn(obj)` and returns a memoized version using a `WeakMap`. If the same object reference is passed, return the cached result without recalculating.",
        vi: "Viết hàm `memoizeObject(fn)` nhận vào hàm `fn(obj)` và trả về phiên bản memoize sử dụng `WeakMap`. Nếu truyền cùng một tham chiếu object, trả về kết quả đã cache mà không cần tính toán lại."
      },
      starterCode: `function memoizeObject(fn) {
  // Implement WeakMap memoization
}`,
      solutionCode: `function memoizeObject(fn) {
  const cache = new WeakMap();

  return function memoized(obj) {
    if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
      return fn(obj);
    }
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}`,
      hints: [
        {
          en: "Store computed results in WeakMap with `obj` as the key. Return `cache.get(obj)` if present.",
          vi: "Lưu kết quả đã tính vào WeakMap với `obj` là key. Trả về `cache.get(obj)` nếu đã tồn tại."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_24",
    title: {
      en: "Ephemeral Cache with WeakRef & FinalizationRegistry",
      vi: "Bộ Nhớ Cache Tạm Thời Tự Giải Phóng Bằng WeakRef & FinalizationRegistry"
    },
    description: {
      en: "Build an ephemeral cache `createAutoCleaningCache()` using `Map`, `WeakRef`, and `FinalizationRegistry`. It stores `{ key: WeakRef(value) }`. When the GC reclaims an unreferenced value, the `FinalizationRegistry` cleans up the dead key from the internal Map automatically.",
      vi: "Xây dựng bộ cache tạm thời `createAutoCleaningCache()` sử dụng `Map`, `WeakRef`, và `FinalizationRegistry`. Lưu `{ key: WeakRef(value) }`. Khi bộ dọn rác GC thu hồi một value không còn ai trỏ tới, `FinalizationRegistry` sẽ tự động dọn sạch key chết ra khỏi Map."
    },
    starterCode: `function createAutoCleaningCache() {
  // Implement auto-cleaning cache with WeakRef & FinalizationRegistry
}`,
    solutionCode: `function createAutoCleaningCache() {
  const map = new Map();
  const registry = new FinalizationRegistry((heldKey) => {
    const ref = map.get(heldKey);
    if (ref && !ref.deref()) {
      map.delete(heldKey);
      console.log(\`Cleaned up dead cache key: \${heldKey}\`);
    }
  });

  return {
    set(key, value) {
      if (!value || typeof value !== 'object') {
        throw new TypeError("Value must be an object to hold a WeakRef");
      }
      map.set(key, new WeakRef(value));
      registry.register(value, key);
    },
    get(key) {
      const ref = map.get(key);
      if (!ref) return undefined;
      const cached = ref.deref();
      if (!cached) {
        map.delete(key);
        return undefined;
      }
      return cached;
    },
    size() {
      return map.size;
    }
  };
}`,
    hints: [
      {
        en: "In set(), save `map.set(key, new WeakRef(value))` and register with `registry.register(value, key)`. In get(), return `ref.deref()`.",
        vi: "Trong set(), lưu `map.set(key, new WeakRef(value))` và đăng ký `registry.register(value, key)`. Trong get(), trả về `ref.deref()`."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_24_1",
      type: "single_choice",
      question: {
        en: "What is the key difference between `Map` and `WeakMap` in JavaScript?",
        vi: "Điểm khác biệt then chốt giữa `Map` và `WeakMap` trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "`WeakMap` holds weak references to its object keys, allowing them to be garbage collected when no other strong references exist", vi: "`WeakMap` giữ tham chiếu yếu tới các key là object, cho phép chúng bị dọn rác giải phóng bộ nhớ khi không còn tham chiếu mạnh nào khác" } },
        { id: "b", text: { en: "`WeakMap` only accepts numbers as keys", vi: "`WeakMap` chỉ nhận số làm key" } },
        { id: "c", text: { en: "`WeakMap` is stored on the server", vi: "`WeakMap` được lưu trên server" } },
        { id: "d", text: { en: "`WeakMap` can be iterated with forEach", vi: "`WeakMap` có thể duyệt bằng forEach" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "WeakMap keys are weakly referenced, preventing memory leaks for object-associated metadata.",
        vi: "Key trong WeakMap là tham chiếu yếu, giúp loại bỏ nguy cơ rò rỉ RAM khi liên kết metadata với object."
      }
    },
    {
      id: "js_q_24_2",
      type: "predict_output",
      question: {
        en: "Why is a `WeakMap` NOT iterable (no `.size`, `.keys()`, or `for...of`)?",
        vi: "Tại sao `WeakMap` KHÔNG THỂ duyệt lặp (không có thuộc tính `.size`, `.keys()`, hay `for...of`)?"
      },
      options: [
        { id: "a", text: { en: "Because garbage collection is non-deterministic; exposing iteration or size would reveal the unpredictable timing of internal GC runs", vi: "Vì thời điểm thu gom rác của GC là bất định; cho phép duyệt hoặc xem size sẽ làm lộ trạng thái dọn rác không thể đoán trước của engine" } },
        { id: "b", text: { en: "Because WeakMap is an async primitive", vi: "Vì WeakMap là kiểu nguyên thủy bất đồng bộ" } },
        { id: "c", text: { en: "Because browsers forgot to implement it", vi: "Vì các trình duyệt quên chưa cài đặt" } },
        { id: "d", text: { en: "Because it is encrypted with SHA-256", vi: "Vì nó được mã hóa bằng SHA-256" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Iteration would make language execution non-deterministic based on unpredictable garbage collection cycles.",
        vi: "Việc cho phép duyệt lặp sẽ khiến mã nguồn chạy bất định tùy thuộc vào thời điểm chạy ngầm của bộ dọn rác."
      }
    },
    {
      id: "js_q_24_3",
      type: "single_choice",
      question: {
        en: "What types can be used as keys in a `WeakMap`?",
        vi: "Những kiểu dữ liệu nào có thể được dùng làm key trong một `WeakMap`?"
      },
      options: [
        { id: "a", text: { en: "Objects and non-registered Symbols only", vi: "Chỉ Object và các Symbol không đăng ký toàn cục" } },
        { id: "b", text: { en: "Strings and Numbers only", vi: "Chỉ Chuỗi và Số" } },
        { id: "c", text: { en: "Any primitive data type", vi: "Bất kỳ kiểu nguyên thủy nào" } },
        { id: "d", text: { en: "Booleans only", vi: "Chỉ Boolean" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Primitives cannot be weakly referenced because they don't have unique heap lifetimes like objects.",
        vi: "Kiểu nguyên thủy không thể tham chiếu yếu vì chúng không có vòng đời bộ nhớ heap riêng như object."
      }
    },
    {
      id: "js_q_24_4",
      type: "predict_output",
      question: {
        en: "What does `weakRef.deref()` return if the target object has already been garbage collected?",
        vi: "`weakRef.deref()` trả về giá trị gì nếu đối tượng mục tiêu đã bị bộ dọn rác GC thu hồi?"
      },
      options: [
        { id: "a", text: { en: "undefined", vi: "undefined" } },
        { id: "b", text: { en: "null", vi: "null" } },
        { id: "c", text: { en: "Throws a ReferenceError", vi: "Ném lỗi ReferenceError" } },
        { id: "d", text: { en: "An empty object {}", vi: "Một object rỗng {}" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`.deref()` returns the target object if alive, or `undefined` if reclaimed by the GC.",
        vi: "`.deref()` trả về đối tượng nếu còn sống trong bộ nhớ, hoặc trả về `undefined` nếu đã bị dọn rác."
      }
    },
    {
      id: "js_q_24_5",
      type: "single_choice",
      question: {
        en: "What is a 'Detached DOM Tree' memory leak in single-page applications?",
        vi: "Hiện tượng rò rỉ bộ nhớ 'Detached DOM Tree' trong ứng dụng SPA là gì?"
      },
      options: [
        { id: "a", text: { en: "A DOM node that was removed from the visible HTML document but remains retained in RAM because JavaScript variables still hold strong references to it", vi: "Một thẻ DOM đã bị gỡ khỏi cây HTML hiển thị nhưng vẫn bị giữ trong RAM do biến JavaScript vẫn giữ tham chiếu mạnh tới nó" } },
        { id: "b", text: { en: "An HTML file missing its doctype", vi: "Một file HTML thiếu doctype" } },
        { id: "c", text: { en: "A broken CSS stylesheet link", vi: "Một liên kết CSS bị hỏng" } },
        { id: "d", text: { en: "An invalid image src tag", vi: "Một thẻ ảnh có đường dẫn src không hợp lệ" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Holding strong references to detached DOM nodes prevents V8 from freeing the node and its entire subtree.",
        vi: "Giữ tham chiếu mạnh tới thẻ DOM đã tách khỏi tài liệu ngăn V8 giải phóng thẻ đó cùng toàn bộ cây con của nó."
      }
    },
    {
      id: "js_q_24_6",
      type: "predict_output",
      question: {
        en: "What is the purpose of the `FinalizationRegistry` API in modern JavaScript?",
        vi: "Mục đích của API `FinalizationRegistry` trong JavaScript hiện đại là gì?"
      },
      options: [
        { id: "a", text: { en: "To register a callback that runs after a registered target object has been reclaimed by the garbage collector", vi: "Đăng ký hàm callback chạy sau khi đối tượng mục tiêu đã bị bộ dọn rác GC thu hồi thành công" } },
        { id: "b", text: { en: "To force the browser to immediately crash", vi: "Ép trình duyệt crash ngay lập tức" } },
        { id: "c", text: { en: "To register CSS custom properties", vi: "Đăng ký các biến CSS custom property" } },
        { id: "d", text: { en: "To validate JSON schemas", vi: "Xác thực cấu trúc JSON" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`FinalizationRegistry` lets you perform cleanup operations associated with garbage-collected objects.",
        vi: "`FinalizationRegistry` cho phép thực hiện các thao tác dọn dẹp tài nguyên đi kèm khi đối tượng bị GC thu hồi."
      }
    },
    {
      id: "js_q_24_7",
      type: "fill_blank",
      question: {
        en: "In V8's Generational Garbage Collector, young short-lived objects are rapidly collected by the _____ GC algorithm.",
        vi: "Trong bộ dọn rác phân thế hệ của V8, các đối tượng mới sống ngắn được thu dọn nhanh chóng bằng thuật toán _____ GC."
      },
      correctAnswer: "Scavenger",
      explanation: {
        en: "The Scavenger algorithm handles Minor GC cycles in the young generation heap space.",
        vi: "Thuật toán Scavenger đảm nhiệm các chu kỳ Minor GC trong vùng nhớ heap thế hệ trẻ."
      }
    },
    {
      id: "js_q_24_8",
      type: "single_choice",
      question: {
        en: "Which of the following creates a classic JavaScript memory leak?",
        vi: "Trường hợp nào dưới đây tạo ra một lỗi rò rỉ bộ nhớ (Memory Leak) kinh điển trong JavaScript?"
      },
      options: [
        { id: "a", text: { en: "Setting up a `setInterval()` timer that captures outer variables in its closure and forgetting to call `clearInterval()`", vi: "Thiết lập `setInterval()` bắt các biến bên ngoài trong closure mà quên không gọi `clearInterval()`" } },
        { id: "b", text: { en: "Declaring a const variable inside a function", vi: "Khai báo biến const trong một hàm" } },
        { id: "c", text: { en: "Using JSON.stringify()", vi: "Sử dụng JSON.stringify()" } },
        { id: "d", text: { en: "Using Math.random()", vi: "Sử dụng Math.random()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Active timers retain references to their closure scopes indefinitely until explicitly cleared.",
        vi: "Timer đang chạy giữ tham chiếu tới phạm vi closure của nó vĩnh viễn cho đến khi được clear."
      }
    },
    {
      id: "js_q_24_9",
      type: "predict_output",
      question: {
        en: "What are GC Roots in a JavaScript runtime environment?",
        vi: "GC Roots trong môi trường runtime JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "Directly accessible base references (such as global `window`/`globalThis`, the active execution call stack, and DOM trees)", vi: "Các tham chiếu gốc truy cập trực tiếp (như `window`/`globalThis` toàn cục, ngăn xếp call stack đang chạy và cây DOM)" } },
        { id: "b", text: { en: "The root directory of the hard drive", vi: "Thư mục gốc của ổ cứng" } },
        { id: "c", text: { en: "The CSS root variables", vi: "Các biến CSS root" } },
        { id: "d", text: { en: "HTML body tags", vi: "Thẻ HTML body" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The GC traverses outward from GC roots to determine which objects are reachable. Unreachable objects are collected.",
        vi: "Bộ GC duyệt từ các GC Root để tìm các đối tượng còn khả năng chạm tới (reachable). Đối tượng nào không tới được sẽ bị thu hồi."
      }
    },
    {
      id: "js_q_24_10",
      type: "code_reasoning",
      question: {
        en: "Why should you never write critical business logic that strictly depends on `FinalizationRegistry` running at an exact timestamp?",
        vi: "Tại sao không bao giờ nên viết logic nghiệp vụ quan trọng phụ thuộc tuyệt đối vào việc `FinalizationRegistry` phải chạy đúng thời điểm?"
      },
      options: [
        { id: "a", text: { en: "Because Garbage Collection runs at unpredictable times determined solely by engine heuristics, and callbacks may be delayed or never executed before the process exits", vi: "Vì việc dọn rác GC diễn ra vào các thời điểm bất định do thuật toán phỏng đoán của engine quyết định, callback có thể bị hoãn hoặc không bao giờ chạy trước khi tắt tiến trình" } },
        { id: "b", text: { en: "Because FinalizationRegistry only works on Tuesdays", vi: "Vì FinalizationRegistry chỉ chạy vào thứ Ba" } },
        { id: "c", text: { en: "Because FinalizationRegistry is blocked by ad-blockers", vi: "Vì FinalizationRegistry bị chặn bởi trình chặn quảng cáo" } },
        { id: "d", text: { en: "Because FinalizationRegistry consumes 100% CPU", vi: "Vì FinalizationRegistry tốn 100% CPU" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "GC timing is non-deterministic; FinalizationRegistry is intended only for auxiliary cleanup (like logging/metrics).",
        vi: "Thời điểm GC dọn rác là bất định; FinalizationRegistry chỉ nên dùng cho các tác vụ phụ trợ (như ghi log/chỉ số)."
      }
    }
  ]
};

// Write Lesson 23 and 24
fs.writeFileSync(path.join(dir, 'lesson23.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson23: Lesson = ${JSON.stringify(lesson23, null, 2)};\nexport default lesson23;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson24.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson24: Lesson = ${JSON.stringify(lesson24, null, 2)};\nexport default lesson24;\n`, 'utf8');
console.log('Lessons 23 and 24 generated.');
