import { Lesson } from '../../../../types';

export const lesson24: Lesson = {
  "id": "js_lesson_24",
  "courseId": "javascript",
  "levelId": "advanced",
  "moduleId": "js_mod_5",
  "order": 24,
  "title": {
    "en": "WeakMap, WeakSet, Garbage Collection & Memory Management",
    "vi": "WeakMap, WeakSet, Cơ Chế Dọn Rác (Garbage Collection) & Quản Lý Bộ Nhớ"
  },
  "summary": {
    "en": "Master V8 Generational Garbage Collection (Scavenger, Mark-Sweep-Compact), weak references with `WeakMap`/`WeakSet`/`WeakRef`, `FinalizationRegistry`, identifying memory leaks, and DOM node caching.",
    "vi": "Làm chủ cơ chế dọn rác phân thế hệ của V8 Engine (Scavenger, Mark-Sweep-Compact), tham chiếu yếu với `WeakMap`/`WeakSet`/`WeakRef`, `FinalizationRegistry`, chẩn đoán rò rỉ bộ nhớ (memory leaks) và cache DOM node."
  },
  "estimatedMinutes": 24,
  "topicId": "js_memory_weak_collections",
  "learn": {
    "introduction": {
      "en": "JavaScript features automatic memory management via an engine Garbage Collector (GC). However, unintentional object retention in closures, global caches, and detached DOM subtrees leads to memory leaks. Understanding V8's Generational GC hypothesis and utilizing Weak collections (`WeakMap`, `WeakSet`, and `WeakRef`) allows you to associate auxiliary data with objects without blocking them from being reclaimed by the garbage collector.",
      "vi": "JavaScript quản lý bộ nhớ tự động thông qua bộ dọn rác Garbage Collector (GC) của engine. Tuy nhiên, việc giữ tham chiếu không mong muốn trong closure, cache toàn cục và các cây DOM bị tách rời (detached DOM) là nguyên nhân gây rò rỉ bộ nhớ (Memory Leak). Hiểu rõ giả thuyết phân thế hệ của V8 GC và sử dụng các tập hợp yếu (`WeakMap`, `WeakSet`, `WeakRef`) cho phép bạn gắn dữ liệu phụ trợ vào object mà không ngăn cản bộ dọn rác giải phóng bộ nhớ."
    },
    "conceptExplanation": {
      "en": "1. V8 Generational GC Architecture:\n   - Generational Hypothesis: Most objects die young.\n   - Young Generation (Nursery & Intermediate): Cleaned frequently via ultra-fast Scavenger copying algorithm (Minor GC).\n   - Old Generation: Long-lived surviving objects; cleaned via Mark-Sweep-Compact algorithm (Major GC).\n\n2. Strong vs Weak References:\n   - Strong Reference: Standard variables/objects; prevents GC from freeing the target as long as it is reachable from GC Roots (global window, active call stack).\n   - Weak Reference: Does NOT prevent garbage collection. When no strong references remain, the object is reclaimed.\n\n3. `WeakMap` & `WeakSet` Characteristics:\n   - Keys MUST be Objects (or non-registered Symbols).\n   - Not iterable (no `.size`, no `for...of`, no `.keys()`) because GC timing is non-deterministic.\n\n4. `WeakRef` & `FinalizationRegistry` (ES2021):\n   - `new WeakRef(target)`: Allows holding a weak reference with `weakRef.deref()`.\n   - `new FinalizationRegistry(cleanupCallback)`: Executes a cleanup hook after an object has been garbage collected.",
      "vi": "1. Kiến Trúc V8 Generational GC:\n   - Giả thuyết phân thế hệ: Hầu hết các đối tượng đều 'chết trẻ'.\n   - Thế Hệ Mới (Young Gen): Dọn dẹp thường xuyên bằng thuật toán sao chép Scavenger siêu tốc (Minor GC).\n   - Thế Hệ Cũ (Old Gen): Chứa các đối tượng sống lâu; dọn dẹp bằng thuật toán Mark-Sweep-Compact (Major GC).\n\n2. Phân Biệt Tham Chiếu Mạnh (Strong) vs Yếu (Weak):\n   - Tham Chiếu Mạnh: Biến/object thông thường; ngăn GC giải phóng bộ nhớ khi vẫn còn đường dẫn từ GC Roots (window, call stack).\n   - Tham Chiếu Yếu: KHÔNG ngăn cản GC. Khi hết tham chiếu mạnh, object tự động bị giải phóng.\n\n3. Đặc Tính Của `WeakMap` & `WeakSet`:\n   - Key BẮT BUỘC phải là Object (hoặc Symbol không đăng ký).\n   - Không thể duyệt lặp (không có `.size`, không có `for...of`) vì thời điểm GC dọn rác là bất định.\n\n4. `WeakRef` & `FinalizationRegistry` (ES2021):\n   - `new WeakRef(target)`: Giữ tham chiếu yếu với hàm đọc `weakRef.deref()`.\n   - `new FinalizationRegistry(cleanupCallback)`: Chạy hàm dọn dẹp sau khi một object đã bị GC giải phóng."
    },
    "syntax": "// 1. WeakMap for Private Metadata without Memory Leaks\nconst privateData = new WeakMap();\n\nclass SecureSession {\n  constructor(userId, token) {\n    // Key is 'this' instance; when session is dereferenced, metadata is auto-GCed!\n    privateData.set(this, { userId, token, createdAt: Date.now() });\n  }\n\n  getUserId() {\n    return privateData.get(this)?.userId;\n  }\n}\n\n// 2. WeakSet for Tracking Object State\nconst processedNodes = new WeakSet();\n\nfunction processDOMElement(el) {\n  if (processedNodes.has(el)) return;\n  processedNodes.add(el);\n  // Perform transformation...\n}",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "DOM Node Auxiliary State Cache without Memory Leaks",
          "vi": "Cache Trạng Thái Bổ Trợ Cho DOM Node Phòng Tránh Rò Rỉ Bộ Nhớ"
        },
        "description": {
          "en": "Demonstrates caching rich widget state attached to DOM elements using WeakMap so that removing DOM elements automatically frees memory.",
          "vi": "Minh họa lưu trữ trạng thái widget gắn với thẻ DOM bằng WeakMap để khi thẻ DOM bị xóa, RAM tự động được giải phóng."
        },
        "code": "const widgetCache = new WeakMap();\n\nfunction getOrCreateWidget(domElement) {\n  if (widgetCache.has(domElement)) {\n    return widgetCache.get(domElement);\n  }\n\n  const widgetInstance = {\n    element: domElement,\n    analyticsId: `widget_${Math.random().toString(36).slice(2)}`,\n    renderCount: 0,\n    render() {\n      this.renderCount++;\n      console.log(`Rendered ${this.analyticsId} ${this.renderCount} times`);\n    }\n  };\n\n  widgetCache.set(domElement, widgetInstance);\n  return widgetInstance;\n}\n\n// When domElement is removed from document and dereferenced, \n// its cached widgetInstance is automatically collected by GC!"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using a standard `Map` to cache data keyed by DOM elements or temporary objects.",
          "vi": "Dùng `Map` thông thường để cache dữ liệu có key là thẻ DOM hoặc object tạm."
        },
        "correction": {
          "en": "Use a `WeakMap` for object-keyed metadata caches.",
          "vi": "Sử dụng `WeakMap` cho các kho cache metadata có key là object."
        }
      }
    ],
    "tips": [
      {
        "en": "Prefer WeakMap for associating lifecycle-bound metadata with objects: WeakMap ensures that the metadata dies the exact moment the host object becomes unreachable, with zero manual cleanup code required.",
        "vi": "Ưu tiên WeakMap để liên kết dữ liệu metadata theo vòng đời của đối tượng: WeakMap đảm bảo metadata tự động biến mất ngay khi đối tượng chủ không còn sử dụng, không cần viết code dọn dẹp thủ công."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_24_1",
      "type": "complete_code",
      "title": {
        "en": "Leak-Free Event Listener Tracker with WeakSet",
        "vi": "Bộ Theo Dõi Đăng Ký Listener Chống Trùng Lặp Bằng WeakSet"
      },
      "instruction": {
        "en": "Create a function `createOnceEmitter()` that returns `{ emit(targetObj, eventName) }` using a `WeakSet` to track if an object has already emitted an event, ensuring an object only emits once throughout its lifecycle without memory leaks.",
        "vi": "Tạo hàm `createOnceEmitter()` trả về `{ emit(targetObj, eventName) }` sử dụng `WeakSet` để theo dõi xem đối tượng đã từng phát sự kiện chưa, đảm bảo mỗi đối tượng chỉ phát 1 lần trong suốt vòng đời mà không gây rò rỉ RAM."
      },
      "starterCode": "function createOnceEmitter() {\n  // Implement leak-free once emitter\n}",
      "solutionCode": "function createOnceEmitter() {\n  const emittedObjects = new WeakSet();\n\n  return {\n    emit(targetObj, eventName) {\n      if (!targetObj || typeof targetObj !== 'object') {\n        throw new TypeError(\"Target must be an object\");\n      }\n      if (emittedObjects.has(targetObj)) {\n        return false; // Already emitted\n      }\n      emittedObjects.add(targetObj);\n      console.log(`Emitted ${eventName} for object`);\n      return true;\n    }\n  };\n}",
      "hint": {
        "en": "Instantiate `new WeakSet()`. Check `emittedObjects.has(targetObj)`, if false add to WeakSet and return true.",
        "vi": "Khởi tạo `new WeakSet()`. Kiểm tra `emittedObjects.has(targetObj)`, nếu false thì add vào WeakSet và return true."
      }
    },
    {
      "id": "js_ex_24_2",
      "type": "complete_code",
      "title": {
        "en": "Safe Memoization Cache for Objects with WeakMap",
        "vi": "Hàm Memoize An Toàn Cho Object Sử Dụng WeakMap"
      },
      "instruction": {
        "en": "Write a function `memoizeObject(fn)` that takes a function `fn(obj)` and returns a memoized version using a `WeakMap`. If the same object reference is passed, return the cached result without recalculating.",
        "vi": "Viết hàm `memoizeObject(fn)` nhận vào hàm `fn(obj)` và trả về phiên bản memoize sử dụng `WeakMap`. Nếu truyền cùng một tham chiếu object, trả về kết quả đã cache mà không cần tính toán lại."
      },
      "starterCode": "function memoizeObject(fn) {\n  // Implement WeakMap memoization\n}",
      "solutionCode": "function memoizeObject(fn) {\n  const cache = new WeakMap();\n\n  return function memoized(obj) {\n    if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {\n      return fn(obj);\n    }\n    if (cache.has(obj)) {\n      return cache.get(obj);\n    }\n    const result = fn(obj);\n    cache.set(obj, result);\n    return result;\n  };\n}",
      "hint": {
        "en": "Store computed results in WeakMap with `obj` as the key. Return `cache.get(obj)` if present.",
        "vi": "Lưu kết quả đã tính vào WeakMap với `obj` là key. Trả về `cache.get(obj)` nếu đã tồn tại."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_24",
    "title": {
      "en": "Ephemeral Cache with WeakRef & FinalizationRegistry",
      "vi": "Bộ Nhớ Cache Tạm Thời Tự Giải Phóng Bằng WeakRef & FinalizationRegistry"
    },
    "description": {
      "en": "Build an ephemeral cache `createAutoCleaningCache()` using `Map`, `WeakRef`, and `FinalizationRegistry`. It stores `{ key: WeakRef(value) }`. When the GC reclaims an unreferenced value, the `FinalizationRegistry` cleans up the dead key from the internal Map automatically.",
      "vi": "Xây dựng bộ cache tạm thời `createAutoCleaningCache()` sử dụng `Map`, `WeakRef`, và `FinalizationRegistry`. Lưu `{ key: WeakRef(value) }`. Khi bộ dọn rác GC thu hồi một value không còn ai trỏ tới, `FinalizationRegistry` sẽ tự động dọn sạch key chết ra khỏi Map."
    },
    "starterCode": "function createAutoCleaningCache() {\n  // Implement auto-cleaning cache with WeakRef & FinalizationRegistry\n}",
    "solutionCode": "function createAutoCleaningCache() {\n  const map = new Map();\n  const registry = new FinalizationRegistry((heldKey) => {\n    const ref = map.get(heldKey);\n    if (ref && !ref.deref()) {\n      map.delete(heldKey);\n      console.log(`Cleaned up dead cache key: ${heldKey}`);\n    }\n  });\n\n  return {\n    set(key, value) {\n      if (!value || typeof value !== 'object') {\n        throw new TypeError(\"Value must be an object to hold a WeakRef\");\n      }\n      map.set(key, new WeakRef(value));\n      registry.register(value, key);\n    },\n    get(key) {\n      const ref = map.get(key);\n      if (!ref) return undefined;\n      const cached = ref.deref();\n      if (!cached) {\n        map.delete(key);\n        return undefined;\n      }\n      return cached;\n    },\n    size() {\n      return map.size;\n    }\n  };\n}",
    "hints": [
      {
        "en": "In set(), save `map.set(key, new WeakRef(value))` and register with `registry.register(value, key)`. In get(), return `ref.deref()`.",
        "vi": "Trong set(), lưu `map.set(key, new WeakRef(value))` và đăng ký `registry.register(value, key)`. Trong get(), trả về `ref.deref()`."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Ephemeral Cache with WeakRef & FinalizationRegistry according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Nhớ Cache Tạm Thời Tự Giải Phóng Bằng WeakRef & FinalizationRegistry theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_24_1",
      "type": "single_choice",
      "question": {
        "en": "What is the key difference between `Map` and `WeakMap` in JavaScript?",
        "vi": "Điểm khác biệt then chốt giữa `Map` và `WeakMap` trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "`WeakMap` holds weak references to its object keys, allowing them to be garbage collected when no other strong references exist",
          "vi": "`WeakMap` giữ tham chiếu yếu tới các key là object, cho phép chúng bị dọn rác giải phóng bộ nhớ khi không còn tham chiếu mạnh nào khác"
        },
        {
          "en": "`WeakMap` only accepts numbers as keys",
          "vi": "`WeakMap` chỉ nhận số làm key"
        },
        {
          "en": "`WeakMap` is stored on the server",
          "vi": "`WeakMap` được lưu trên server"
        },
        {
          "en": "`WeakMap` can be iterated with forEach",
          "vi": "`WeakMap` có thể duyệt bằng forEach"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "WeakMap keys are weakly referenced, preventing memory leaks for object-associated metadata.",
        "vi": "Key trong WeakMap là tham chiếu yếu, giúp loại bỏ nguy cơ rò rỉ RAM khi liên kết metadata với object."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "easy"
    },
    {
      "id": "js_q_24_2",
      "type": "predict_output",
      "question": {
        "en": "Why is a `WeakMap` NOT iterable (no `.size`, `.keys()`, or `for...of`)?",
        "vi": "Tại sao `WeakMap` KHÔNG THỂ duyệt lặp (không có thuộc tính `.size`, `.keys()`, hay `for...of`)?"
      },
      "options": [
        {
          "en": "Because garbage collection is non-deterministic; exposing iteration or size would reveal the unpredictable timing of internal GC runs",
          "vi": "Vì thời điểm thu gom rác của GC là bất định; cho phép duyệt hoặc xem size sẽ làm lộ trạng thái dọn rác không thể đoán trước của engine"
        },
        {
          "en": "Because WeakMap is an async primitive",
          "vi": "Vì WeakMap là kiểu nguyên thủy bất đồng bộ"
        },
        {
          "en": "Because browsers forgot to implement it",
          "vi": "Vì các trình duyệt quên chưa cài đặt"
        },
        {
          "en": "Because it is encrypted with SHA-256",
          "vi": "Vì nó được mã hóa bằng SHA-256"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Iteration would make language execution non-deterministic based on unpredictable garbage collection cycles.",
        "vi": "Việc cho phép duyệt lặp sẽ khiến mã nguồn chạy bất định tùy thuộc vào thời điểm chạy ngầm của bộ dọn rác."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "easy"
    },
    {
      "id": "js_q_24_3",
      "type": "single_choice",
      "question": {
        "en": "What types can be used as keys in a `WeakMap`?",
        "vi": "Những kiểu dữ liệu nào có thể được dùng làm key trong một `WeakMap`?"
      },
      "options": [
        {
          "en": "Objects and non-registered Symbols only",
          "vi": "Chỉ Object và các Symbol không đăng ký toàn cục"
        },
        {
          "en": "Strings and Numbers only",
          "vi": "Chỉ Chuỗi và Số"
        },
        {
          "en": "Any primitive data type",
          "vi": "Bất kỳ kiểu nguyên thủy nào"
        },
        {
          "en": "Booleans only",
          "vi": "Chỉ Boolean"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Primitives cannot be weakly referenced because they don't have unique heap lifetimes like objects.",
        "vi": "Kiểu nguyên thủy không thể tham chiếu yếu vì chúng không có vòng đời bộ nhớ heap riêng như object."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "easy"
    },
    {
      "id": "js_q_24_4",
      "type": "predict_output",
      "question": {
        "en": "What does `weakRef.deref()` return if the target object has already been garbage collected?",
        "vi": "`weakRef.deref()` trả về giá trị gì nếu đối tượng mục tiêu đã bị bộ dọn rác GC thu hồi?"
      },
      "options": [
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "null",
          "vi": "null"
        },
        {
          "en": "Throws a ReferenceError",
          "vi": "Ném lỗi ReferenceError"
        },
        {
          "en": "An empty object {}",
          "vi": "Một object rỗng {}"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`.deref()` returns the target object if alive, or `undefined` if reclaimed by the GC.",
        "vi": "`.deref()` trả về đối tượng nếu còn sống trong bộ nhớ, hoặc trả về `undefined` nếu đã bị dọn rác."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "medium"
    },
    {
      "id": "js_q_24_5",
      "type": "single_choice",
      "question": {
        "en": "What is a 'Detached DOM Tree' memory leak in single-page applications?",
        "vi": "Hiện tượng rò rỉ bộ nhớ 'Detached DOM Tree' trong ứng dụng SPA là gì?"
      },
      "options": [
        {
          "en": "A DOM node that was removed from the visible HTML document but remains retained in RAM because JavaScript variables still hold strong references to it",
          "vi": "Một thẻ DOM đã bị gỡ khỏi cây HTML hiển thị nhưng vẫn bị giữ trong RAM do biến JavaScript vẫn giữ tham chiếu mạnh tới nó"
        },
        {
          "en": "An HTML file missing its doctype",
          "vi": "Một file HTML thiếu doctype"
        },
        {
          "en": "A broken CSS stylesheet link",
          "vi": "Một liên kết CSS bị hỏng"
        },
        {
          "en": "An invalid image src tag",
          "vi": "Một thẻ ảnh có đường dẫn src không hợp lệ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Holding strong references to detached DOM nodes prevents V8 from freeing the node and its entire subtree.",
        "vi": "Giữ tham chiếu mạnh tới thẻ DOM đã tách khỏi tài liệu ngăn V8 giải phóng thẻ đó cùng toàn bộ cây con của nó."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "medium"
    },
    {
      "id": "js_q_24_6",
      "type": "predict_output",
      "question": {
        "en": "What is the purpose of the `FinalizationRegistry` API in modern JavaScript?",
        "vi": "Mục đích của API `FinalizationRegistry` trong JavaScript hiện đại là gì?"
      },
      "options": [
        {
          "en": "To register a callback that runs after a registered target object has been reclaimed by the garbage collector",
          "vi": "Đăng ký hàm callback chạy sau khi đối tượng mục tiêu đã bị bộ dọn rác GC thu hồi thành công"
        },
        {
          "en": "To force the browser to immediately crash",
          "vi": "Ép trình duyệt crash ngay lập tức"
        },
        {
          "en": "To register CSS custom properties",
          "vi": "Đăng ký các biến CSS custom property"
        },
        {
          "en": "To validate JSON schemas",
          "vi": "Xác thực cấu trúc JSON"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`FinalizationRegistry` lets you perform cleanup operations associated with garbage-collected objects.",
        "vi": "`FinalizationRegistry` cho phép thực hiện các thao tác dọn dẹp tài nguyên đi kèm khi đối tượng bị GC thu hồi."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "medium"
    },
    {
      "id": "js_q_24_7",
      "type": "fill_blank",
      "question": {
        "en": "In V8's Generational Garbage Collector, young short-lived objects are rapidly collected by the _____ GC algorithm.",
        "vi": "Trong bộ dọn rác phân thế hệ của V8, các đối tượng mới sống ngắn được thu dọn nhanh chóng bằng thuật toán _____ GC."
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
        "en": "The Scavenger algorithm handles Minor GC cycles in the young generation heap space.",
        "vi": "Thuật toán Scavenger đảm nhiệm các chu kỳ Minor GC trong vùng nhớ heap thế hệ trẻ."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "scavenger"
      ]
    },
    {
      "id": "js_q_24_8",
      "type": "single_choice",
      "question": {
        "en": "Which of the following creates a classic JavaScript memory leak?",
        "vi": "Trường hợp nào dưới đây tạo ra một lỗi rò rỉ bộ nhớ (Memory Leak) kinh điển trong JavaScript?"
      },
      "options": [
        {
          "en": "Setting up a `setInterval()` timer that captures outer variables in its closure and forgetting to call `clearInterval()`",
          "vi": "Thiết lập `setInterval()` bắt các biến bên ngoài trong closure mà quên không gọi `clearInterval()`"
        },
        {
          "en": "Declaring a const variable inside a function",
          "vi": "Khai báo biến const trong một hàm"
        },
        {
          "en": "Using JSON.stringify()",
          "vi": "Sử dụng JSON.stringify()"
        },
        {
          "en": "Using Math.random()",
          "vi": "Sử dụng Math.random()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Active timers retain references to their closure scopes indefinitely until explicitly cleared.",
        "vi": "Timer đang chạy giữ tham chiếu tới phạm vi closure của nó vĩnh viễn cho đến khi được clear."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "hard"
    },
    {
      "id": "js_q_24_9",
      "type": "predict_output",
      "question": {
        "en": "What are GC Roots in a JavaScript runtime environment?",
        "vi": "GC Roots trong môi trường runtime JavaScript là gì?"
      },
      "options": [
        {
          "en": "Directly accessible base references (such as global `window`/`globalThis`, the active execution call stack, and DOM trees)",
          "vi": "Các tham chiếu gốc truy cập trực tiếp (như `window`/`globalThis` toàn cục, ngăn xếp call stack đang chạy và cây DOM)"
        },
        {
          "en": "The root directory of the hard drive",
          "vi": "Thư mục gốc của ổ cứng"
        },
        {
          "en": "The CSS root variables",
          "vi": "Các biến CSS root"
        },
        {
          "en": "HTML body tags",
          "vi": "Thẻ HTML body"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The GC traverses outward from GC roots to determine which objects are reachable. Unreachable objects are collected.",
        "vi": "Bộ GC duyệt từ các GC Root để tìm các đối tượng còn khả năng chạm tới (reachable). Đối tượng nào không tới được sẽ bị thu hồi."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "hard"
    },
    {
      "id": "js_q_24_10",
      "type": "single_choice",
      "question": {
        "en": "Why should you never write critical business logic that strictly depends on `FinalizationRegistry` running at an exact timestamp?",
        "vi": "Tại sao không bao giờ nên viết logic nghiệp vụ quan trọng phụ thuộc tuyệt đối vào việc `FinalizationRegistry` phải chạy đúng thời điểm?"
      },
      "options": [
        {
          "en": "Because Garbage Collection runs at unpredictable times determined solely by engine heuristics, and callbacks may be delayed or never executed before the process exits",
          "vi": "Vì việc dọn rác GC diễn ra vào các thời điểm bất định do thuật toán phỏng đoán của engine quyết định, callback có thể bị hoãn hoặc không bao giờ chạy trước khi tắt tiến trình"
        },
        {
          "en": "Because FinalizationRegistry only works on Tuesdays",
          "vi": "Vì FinalizationRegistry chỉ chạy vào thứ Ba"
        },
        {
          "en": "Because FinalizationRegistry is blocked by ad-blockers",
          "vi": "Vì FinalizationRegistry bị chặn bởi trình chặn quảng cáo"
        },
        {
          "en": "Because FinalizationRegistry consumes 100% CPU",
          "vi": "Vì FinalizationRegistry tốn 100% CPU"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "GC timing is non-deterministic; FinalizationRegistry is intended only for auxiliary cleanup (like logging/metrics).",
        "vi": "Thời điểm GC dọn rác là bất định; FinalizationRegistry chỉ nên dùng cho các tác vụ phụ trợ (như ghi log/chỉ số)."
      },
      "topicId": "js_memory_weak_collections",
      "difficulty": "hard"
    }
  ]
};
export default lesson24;
