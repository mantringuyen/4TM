import { Lesson } from '../../../../types';

export const lesson28: Lesson = {
  "id": "js_lesson_28",
  "courseId": "javascript",
  "levelId": "advanced",
  "moduleId": "js_mod_6",
  "order": 28,
  "title": {
    "en": "JavaScript Engine Internals: AST, JIT Compilation & TurboFan",
    "vi": "Kiến Trúc V8 Engine: Cây AST, Biên Dịch JIT & Trình Tối Ưu TurboFan"
  },
  "summary": {
    "en": "Master V8 JavaScript engine internals: Parsing & AST generation, Ignition bytecode interpreter, TurboFan JIT compiler, Hidden Classes / Shapes, Inline Caching (IC), monomorphic vs megamorphic call sites, and avoiding deoptimization traps.",
    "vi": "Làm chủ kiến trúc động cơ V8 JavaScript: Phân tích cú pháp & cây AST, trình thông dịch bytecode Ignition, trình biên dịch TurboFan JIT, Hidden Classes / Shapes, Inline Caching (IC), phân loại điểm gọi monomorphic vs megamorphic và phòng chống bẫy Deoptimization."
  },
  "estimatedMinutes": 24,
  "topicId": "js_v8_jit_internals",
  "learn": {
    "introduction": {
      "en": "To write ultra-high-performance JavaScript, you must understand how modern engines (like Google V8 in Chrome & Node.js, SpiderMonkey in Firefox, and JavaScriptCore in Safari) execute code. V8 combines a fast baseline bytecode interpreter (Ignition) with an optimizing Just-In-Time (JIT) compiler (TurboFan). Writing shape-stable, monomorphic code allows V8 to generate machine code nearly as fast as native C++.",
      "vi": "Để viết mã JavaScript có hiệu năng đỉnh cao, bạn cần thấu hiểu cách các engine hiện đại (như Google V8 trong Chrome & Node.js, SpiderMonkey trong Firefox, JavaScriptCore trong Safari) thực thi mã. V8 kết hợp trình thông dịch bytecode nền tảng (Ignition) với trình biên dịch JIT tối ưu hóa (TurboFan). Viết code ổn định cấu trúc (Shape/Hidden Class) và monomorphic cho phép V8 sinh mã máy chạy nhanh tiệm cận mã C++ gốc."
    },
    "conceptExplanation": {
      "en": "1. The V8 Compilation Pipeline:\n   - Parser: Lexical analysis converts source code into an Abstract Syntax Tree (AST).\n   - Ignition Interpreter: Generates and executes compact bytecode, collecting runtime type feedback.\n   - TurboFan Optimizing Compiler: Hot functions with stable type feedback are compiled into highly optimized machine code.\n   - Deoptimization (Bailout): If an assumption is violated (e.g. passing a string to an optimized math function), TurboFan bails out back to Ignition bytecode!\n\n2. Hidden Classes / Shapes (Maps):\n   - JavaScript objects are dynamically structured. V8 assigns an internal 'Shape' to every object.\n   - Objects initialized with the SAME properties in the SAME order share the same Shape pointer.\n\n3. Inline Caching (IC) & Call Site Polymorphism:\n   - Monomorphic (1 Shape): 100% inline cached; blazing fast direct offset memory read.\n   - Polymorphic (2–4 Shapes): Small switch table lookup.\n   - Megamorphic (5+ Shapes): Cache miss; falls back to slow hash table lookup.\n\n4. Engine Optimization Golden Rules:\n   - Always initialize object properties in the exact same order.\n   - Avoid deleting properties with `delete obj.prop` (mutates shape to dictionary mode); assign `undefined` or `null` instead.",
      "vi": "1. Đường Ống Biên Dịch Của V8 Engine:\n   - Trình Phân Tích (Parser): Chuyển mã nguồn JavaScript thành Cây Cú Pháp Trừu Tượng (AST).\n   - Trình Thông Dịch Ignition: Sinh và chạy bytecode nhanh chóng, đồng thời thu thập phản hồi kiểu dữ liệu (Type Feedback).\n   - Trình Biên Dịch Tối Ưu TurboFan: Các hàm 'nóng' (chạy nhiều lần) có kiểu dữ liệu ổn định sẽ được biên dịch thành mã máy tối ưu.\n   - Deoptimization (Bailout): Nếu giả định kiểu bị phá vỡ (ví dụ truyền chuỗi vào hàm tính toán đã tối ưu), TurboFan lập tức hủy mã tối ưu và quay về chạy bytecode Ignition!\n\n2. Hidden Classes / Shapes (Cấu Trúc Ẩn):\n   - Object trong JS có cấu trúc động. V8 gắn một 'Shape' nội bộ cho mỗi object.\n   - Các object được khởi tạo CÙNG thuộc tính theo CÙNG thứ tự sẽ dùng chung một con trỏ Shape.\n\n3. Inline Caching (IC) & Tính Đa Hình Điểm Gọi:\n   - Monomorphic (1 Shape): Cache nội tuyến 100%; đọc trực tiếp ô nhớ với tốc độ tối đa.\n   - Polymorphic (2–4 Shapes): Tra cứu qua bảng rẽ nhánh nhỏ.\n   - Megamorphic (5+ Shapes): Trượt cache; rơi về tra cứu bảng băm (hash table) chậm chạp.\n\n4. Các Quy Tắc Vàng Tối Ưu Engine:\n   - Luôn khởi tạo các thuộc tính của object theo đúng một thứ tự duy nhất.\n   - Tránh xóa thuộc tính bằng `delete obj.prop` (sẽ biến object thành Dictionary Mode chậm); hãy gán `undefined` hoặc `null` thay thế."
    },
    "syntax": "// 1. Monomorphic Shape Alignment (TurboFan JIT Optimized)\nclass Point {\n  constructor(x, y) {\n    this.x = x; // Shape transition: {} -> {x}\n    this.y = y; // Shape transition: {x} -> {x, y}\n  }\n}\n\nconst p1 = new Point(10, 20);\nconst p2 = new Point(30, 40);\n// p1 and p2 share the EXACT SAME V8 Hidden Class / Shape!\n\n// 2. Anti-Pattern: Polymorphic Shape Mutation\nfunction badObjectCreation() {\n  const o1 = {}; o1.a = 1; o1.b = 2; // Shape A -> B\n  const o2 = {}; o2.b = 2; o2.a = 1; // Shape C -> D (Different order creates different shapes!)\n}",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Monomorphic vs Megamorphic Property Access Benchmark",
          "vi": "Đo Lường Hiệu Năng Truy Cập Thuộc Tính Monomorphic vs Megamorphic"
        },
        "description": {
          "en": "Demonstrates how passing objects of identical hidden class shapes enables V8 TurboFan to inline field offsets directly into CPU registers.",
          "vi": "Minh họa việc truyền các đối tượng có cùng Hidden Class giúp V8 TurboFan nạp trực tiếp offset vào thanh ghi CPU."
        },
        "code": "// Hot function monitored by TurboFan JIT\nfunction calculateTotal(order) {\n  return order.price * order.quantity;\n}\n\n// 1. Monomorphic: Always passing orders with exact shape { price, quantity }\nconst stableOrders = Array.from({ length: 1_000_000 }, () => ({\n  price: 19.99,\n  quantity: 2\n}));\n\nconsole.time(\"Monomorphic\");\nlet sum = 0;\nfor (let i = 0; i < stableOrders.length; i++) {\n  sum += calculateTotal(stableOrders[i]);\n}\nconsole.timeEnd(\"Monomorphic\"); // Blazing fast ~2ms due to Inline Caching!"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using the `delete` operator on high-frequency hot objects (e.g. `delete user.tempKey`).",
          "vi": "Dùng toán tử `delete` trên các đối tượng chạy lặp tần suất cao (ví dụ `delete user.tempKey`)."
        },
        "correction": {
          "en": "Assign `user.tempKey = undefined` or `null` instead of `delete`.",
          "vi": "Gán `user.tempKey = undefined` hoặc `null` thay vì dùng `delete`."
        }
      }
    ],
    "tips": [
      {
        "en": "Initialize all instance fields in constructor in a consistent order: Ensuring all instances follow identical shape transition trees enables V8's TurboFan to optimize property lookups via Monomorphic Inline Caching.",
        "vi": "Khởi tạo tất cả các trường trong constructor theo một thứ tự nhất quán: Đảm bảo mọi instance tuân thủ đúng cây chuyển đổi Shape giúp TurboFan tối ưu hóa việc truy cập thuộc tính bằng Monomorphic Inline Caching."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_28_1",
      "type": "complete_code",
      "title": {
        "en": "Refactor Shape-Mismatched Factory to Monomorphic Alignment",
        "vi": "Tối Ưu Hàm Factory Bất Đồng Bộ Dạng Thành Chuẩn Monomorphic"
      },
      "instruction": {
        "en": "Given an un-optimized factory that creates objects with different property insertion orders based on flags, refactor it into a unified class `UserRecord` that always declares all properties (`id`, `name`, `role`, `permissions`) in the exact same deterministic order, setting unused fields to `null`.",
        "vi": "Cho hàm factory chưa tối ưu tạo object với thứ tự thêm thuộc tính lộn xộn, hãy tái cấu trúc thành class `UserRecord` luôn khai báo toàn bộ các trường (`id`, `name`, `role`, `permissions`) theo đúng một thứ tự duy nhất, gán trường chưa dùng bằng `null`."
      },
      "starterCode": "// Refactor into shape-stable UserRecord class\nclass UserRecord {\n  // Implement shape-stable class\n}",
      "solutionCode": "class UserRecord {\n  constructor(id, name, role = \"user\", permissions = null) {\n    this.id = id;\n    this.name = name;\n    this.role = role;\n    this.permissions = permissions;\n  }\n}",
      "hint": {
        "en": "In constructor, always initialize this.id, this.name, this.role, and this.permissions in the same sequence.",
        "vi": "Trong constructor, luôn khởi tạo this.id, this.name, this.role, và this.permissions theo đúng thứ tự đó."
      }
    },
    {
      "id": "js_ex_28_2",
      "type": "complete_code",
      "title": {
        "en": "Fast Dense Array Builder without Hole Deoptimizations",
        "vi": "Tạo Mảng Dày (Packed SMI) Tránh Lỗi Thủng Mảng (Sparse Holes)"
      },
      "instruction": {
        "en": "Write a function `createPackedIntegerArray(size)` that creates a pre-allocated dense array of sequential integers from 0 to `size - 1` without creating sparse holes (`PACKED_SMI_ELEMENTS` optimization in V8).",
        "vi": "Viết hàm `createPackedIntegerArray(size)` tạo mảng số nguyên dày liên tục từ 0 đến `size - 1` mà không tạo lỗ thủng phần tử (giữ chế độ tối ưu `PACKED_SMI_ELEMENTS` trong V8)."
      },
      "starterCode": "function createPackedIntegerArray(size) {\n  // Create dense packed integer array\n}",
      "solutionCode": "function createPackedIntegerArray(size) {\n  const arr = new Array(size);\n  for (let i = 0; i < size; i++) {\n    arr[i] = i;\n  }\n  return arr;\n}",
      "hint": {
        "en": "Allocate `new Array(size)` and immediately populate every index from 0 to size-1 in a simple loop.",
        "vi": "Cấp phát `new Array(size)` và gán ngay toàn bộ chỉ số từ 0 tới size-1 trong một vòng lặp đơn giản."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_28",
    "title": {
      "en": "High-Performance Monomorphic Vector Math Engine",
      "vi": "Engine Tính Toán Vector 3D Hiệu Năng Cao Chuẩn Monomorphic"
    },
    "description": {
      "en": "Build a high-performance 3D vector arithmetic engine with class `Vector3(x, y, z)` and methods `add(v)`, `dot(v)`, `cross(v)`, and `magnitude()`. Optimize for V8 by reusing instances, avoiding property additions, and preventing type bailing.",
      "vi": "Xây dựng engine tính toán vector 3D hiệu năng cao với class `Vector3(x, y, z)` cùng các phương thức `add(v)`, `dot(v)`, `cross(v)` và `magnitude()`. Tối ưu cho V8 bằng cách tái sử dụng instance, tránh thêm thuộc tính động và chống deoptimization."
    },
    "starterCode": "class Vector3 {\n  // Implement V8 JIT optimized Vector3 engine\n}",
    "solutionCode": "class Vector3 {\n  constructor(x = 0, y = 0, z = 0) {\n    this.x = Number(x);\n    this.y = Number(y);\n    this.z = Number(z);\n  }\n\n  add(v) {\n    this.x += v.x;\n    this.y += v.y;\n    this.z += v.z;\n    return this;\n  }\n\n  dot(v) {\n    return this.x * v.x + this.y * v.y + this.z * v.z;\n  }\n\n  cross(v) {\n    const cx = this.y * v.z - this.z * v.y;\n    const cy = this.z * v.x - this.x * v.z;\n    const cz = this.x * v.y - this.y * v.x;\n    this.x = cx;\n    this.y = cy;\n    this.z = cz;\n    return this;\n  }\n\n  magnitude() {\n    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);\n  }\n}",
    "hints": [
      {
        "en": "Maintain strict `this.x`, `this.y`, `this.z` properties. Mutate in-place to prevent object allocations.",
        "vi": "Duy trì cấu trúc cố định `this.x`, `this.y`, `this.z`. Biến đổi trực tiếp tại chỗ để tránh tạo thêm object thừa trong RAM."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for High-Performance Monomorphic Vector Math Engine according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Engine Tính Toán Vector 3D Hiệu Năng Cao Chuẩn Monomorphic theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_28_1",
      "type": "single_choice",
      "question": {
        "en": "What are the two primary execution components of Google's V8 JavaScript engine?",
        "vi": "Hai thành phần thực thi cốt lõi của động cơ Google V8 JavaScript là gì?"
      },
      "options": [
        {
          "en": "Ignition (Bytecode Interpreter) and TurboFan (Optimizing JIT Compiler)",
          "vi": "Ignition (Trình thông dịch Bytecode) và TurboFan (Trình biên dịch JIT tối ưu hóa)"
        },
        {
          "en": "Babel and Webpack",
          "vi": "Babel và Webpack"
        },
        {
          "en": "SpiderMonkey and JavaScriptCore",
          "vi": "SpiderMonkey và JavaScriptCore"
        },
        {
          "en": "Node and NPM",
          "vi": "Node và NPM"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Ignition interprets bytecode quickly and collects type feedback; TurboFan compiles hot code to machine instructions.",
        "vi": "Ignition thông dịch bytecode và thu thập type feedback; TurboFan biên dịch hàm nóng thành mã máy."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "easy"
    },
    {
      "id": "js_q_28_2",
      "type": "predict_output",
      "question": {
        "en": "What is a 'Hidden Class' or 'Shape' in the V8 engine?",
        "vi": "'Hidden Class' hay 'Shape' trong động cơ V8 là gì?"
      },
      "options": [
        {
          "en": "An internal descriptor created by the engine that tracks object property offsets, allowing fast direct memory addressing instead of dictionary lookups",
          "vi": "Một cấu trúc mô tả nội bộ do engine tạo ra để theo dõi offset của các thuộc tính, cho phép truy cập trực tiếp ô nhớ siêu tốc thay vì tra cứu từ điển"
        },
        {
          "en": "A CSS class hidden with `display: none`",
          "vi": "Một class CSS bị ẩn bằng `display: none`"
        },
        {
          "en": "A secret private JavaScript class",
          "vi": "Một class JavaScript bí mật riêng tư"
        },
        {
          "en": "A database encryption schema",
          "vi": "Một lược đồ mã hóa cơ sở dữ liệu"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Hidden classes (Shapes) enable V8 to treat dynamic JavaScript objects like fixed-layout C++ structs.",
        "vi": "Hidden Class (Shape) giúp V8 xử lý đối tượng động của JavaScript với hiệu năng tương đương struct cố định trong C++."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "easy"
    },
    {
      "id": "js_q_28_3",
      "type": "single_choice",
      "question": {
        "en": "What is 'Inline Caching' (IC) in modern JIT compilers?",
        "vi": "'Inline Caching' (IC) trong các trình biên dịch JIT hiện đại là gì?"
      },
      "options": [
        {
          "en": "A technique that remembers the memory offset of property lookups for specific object Shapes directly at the call site in machine code",
          "vi": "Kỹ thuật ghi nhớ trực tiếp offset bộ nhớ của thuộc tính cho các Shape đối tượng cụ thể ngay tại điểm gọi trong mã máy"
        },
        {
          "en": "Caching HTML files in the browser cache",
          "vi": "Lưu file HTML trong bộ nhớ cache trình duyệt"
        },
        {
          "en": "Storing images in localStorage",
          "vi": "Lưu hình ảnh vào localStorage"
        },
        {
          "en": "Compressing CSS inline styles",
          "vi": "Nén các style inline trong CSS"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Inline caches bypass expensive property resolution by caching the shape and offset.",
        "vi": "Inline Caching bỏ qua quá trình tra cứu thuộc tính đắt đỏ bằng cách ghi nhớ sẵn Shape và vị trí offset."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "easy"
    },
    {
      "id": "js_q_28_4",
      "type": "predict_output",
      "question": {
        "en": "What is the difference between a 'Monomorphic' and a 'Megamorphic' call site?",
        "vi": "Điểm khác biệt giữa điểm gọi 'Monomorphic' và 'Megamorphic' là gì?"
      },
      "options": [
        {
          "en": "Monomorphic sees only 1 object shape (100% cache hit, fastest machine code); Megamorphic sees 5+ different shapes (cache miss, falls back to slow generic lookup)",
          "vi": "Monomorphic chỉ gặp đúng 1 dạng Shape (trúng cache 100%, mã máy chạy nhanh nhất); Megamorphic gặp từ 5 dạng Shape khác nhau trở lên (trượt cache, rơi về tra cứu chậm)"
        },
        {
          "en": "Monomorphic is for arrays, Megamorphic is for objects",
          "vi": "Monomorphic dành cho mảng, Megamorphic dành cho object"
        },
        {
          "en": "Monomorphic runs on single-core CPUs",
          "vi": "Monomorphic chạy trên CPU đơn nhân"
        },
        {
          "en": "Megamorphic is deprecated in ES6",
          "vi": "Megamorphic đã bị xóa bỏ trong ES6"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Keeping functions monomorphic allows TurboFan to generate raw machine instructions without branching.",
        "vi": "Giữ cho các hàm đạt chuẩn Monomorphic giúp TurboFan sinh mã máy trực tiếp mà không cần rẽ nhánh kiểm tra."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_28_5",
      "type": "single_choice",
      "question": {
        "en": "What causes a JIT 'Deoptimization' (Bailout) in V8?",
        "vi": "Nguyên nhân nào dẫn đến hiện tượng 'Deoptimization' (Bailout) trong trình JIT của V8?"
      },
      "options": [
        {
          "en": "Passing a value with an unexpected type or shape to a function that was previously optimized under speculative type assumptions",
          "vi": "Truyền một giá trị có kiểu dữ liệu hoặc Shape bất thường vào một hàm đã được biên dịch tối ưu hóa trước đó"
        },
        {
          "en": "Calling console.log()",
          "vi": "Gọi hàm console.log()"
        },
        {
          "en": "Using ES6 let and const",
          "vi": "Sử dụng let và const trong ES6"
        },
        {
          "en": "Writing comments in JavaScript",
          "vi": "Viết chú thích (comment) trong mã nguồn JavaScript"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "When speculative type assumptions fail, TurboFan must discard optimized machine code and bail out to bytecode.",
        "vi": "Khi giả định về kiểu bị sai, TurboFan buộc phải hủy mã máy đã tối ưu và quay về chạy thông dịch bytecode."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_28_6",
      "type": "predict_output",
      "question": {
        "en": "Why is initializing properties in different orders (`{a:1, b:2}` vs `{b:2, a:1}`) bad for performance in V8?",
        "vi": "Tại sao việc khởi tạo các thuộc tính theo thứ tự khác nhau (`{a:1, b:2}` vs `{b:2, a:1}`) lại gây hại cho hiệu năng trong V8?"
      },
      "options": [
        {
          "en": "Because V8 creates two completely distinct Hidden Classes / Shapes for each property transition path, turning downstream functions polymorphic or megamorphic",
          "vi": "Vì V8 tạo ra 2 Hidden Class / Shape hoàn toàn khác nhau cho từng nhánh chuyển đổi thuộc tính, khiến các hàm phía sau bị đa hình hóa (polymorphic/megamorphic)"
        },
        {
          "en": "Because it corrupts the hard drive",
          "vi": "Vì nó làm hỏng ổ cứng"
        },
        {
          "en": "Because JavaScript sorts properties alphabetically automatically",
          "vi": "Vì JavaScript tự động sắp xếp thuộc tính theo thứ tự bảng chữ cái"
        },
        {
          "en": "Because V8 throws a SyntaxError",
          "vi": "Vì V8 sẽ ném lỗi SyntaxError"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Property insertion order dictates shape transitions in V8. Mismatched orders produce different hidden classes.",
        "vi": "Thứ tự thêm thuộc tính quyết định chuỗi chuyển đổi Shape trong V8. Thứ tự lệch nhau sẽ tạo ra các hidden class khác nhau."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "medium"
    },
    {
      "id": "js_q_28_7",
      "type": "fill_blank",
      "question": {
        "en": "The intermediate tree representation produced by the parser before bytecode generation is called an _____ (Abstract Syntax Tree).",
        "vi": "Cấu trúc cây trung gian do parser tạo ra trước khi sinh bytecode được gọi là _____ (Abstract Syntax Tree)."
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
        "en": "An AST represents the syntactic structure of source code in a hierarchical tree format.",
        "vi": "AST đại diện cho cấu trúc ngữ pháp của mã nguồn dưới dạng cây phân cấp."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "ast"
      ]
    },
    {
      "id": "js_q_28_8",
      "type": "single_choice",
      "question": {
        "en": "Why should you avoid using `delete obj.prop` in performance-critical code?",
        "vi": "Tại sao nên tránh dùng `delete obj.prop` trong các đoạn mã đòi hỏi hiệu năng cao?"
      },
      "options": [
        {
          "en": "It mutates the object's shape into 'Dictionary / Slow Mode', disabling fast inline caching and inline field offset reads",
          "vi": "Nó làm biến đổi cấu trúc Shape của đối tượng sang 'Dictionary Mode' chậm chạp, vô hiệu hóa cơ chế Inline Caching và đọc trực tiếp ô nhớ"
        },
        {
          "en": "`delete` is forbidden in strict mode",
          "vi": "`delete` bị cấm trong strict mode"
        },
        {
          "en": "`delete` deletes the entire object from RAM",
          "vi": "`delete` xóa toàn bộ object khỏi RAM"
        },
        {
          "en": "`delete` runs asynchronously",
          "vi": "`delete` chạy bất đồng bộ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`delete` changes object representation to hash maps, destroying hidden class optimizations.",
        "vi": "`delete` chuyển cấu trúc lưu trữ của object sang bảng băm (hash map), làm mất sạch các tối ưu hóa của hidden class."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "hard"
    },
    {
      "id": "js_q_28_9",
      "type": "predict_output",
      "question": {
        "en": "What is an 'Array Hole' (Sparse Array) in V8 and why does it hurt performance?",
        "vi": "'Array Hole' (Mảng Thưa / Sparse Array) trong V8 là gì và tại sao nó làm giảm hiệu năng?"
      },
      "options": [
        {
          "en": "An unassigned index (e.g. `[1, , 3]`) that forces V8 to search up the prototype chain on every element access to confirm the hole is truly empty",
          "vi": "Một chỉ số chưa được gán giá trị (ví dụ `[1, , 3]`) ép V8 phải tra cứu ngược lên chuỗi prototype ở mọi lần đọc phần tử để kiểm tra xem vị trí đó có rỗng thật không"
        },
        {
          "en": "An array with negative numbers",
          "vi": "Một mảng chứa số âm"
        },
        {
          "en": "An array containing strings",
          "vi": "Một mảng chứa chuỗi ký tự"
        },
        {
          "en": "An empty array `[]`",
          "vi": "Một mảng rỗng `[]`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Holes deoptimize V8's array element kind from `PACKED` to `HOLEY`, triggering prototype chain checks on every access.",
        "vi": "Các lỗ thủng làm chuyển đổi kiểu mảng từ `PACKED` sang `HOLEY`, gây tốn tài nguyên tra cứu prototype chain ở mỗi lần đọc."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "hard"
    },
    {
      "id": "js_q_28_10",
      "type": "single_choice",
      "question": {
        "en": "How does writing clean, type-consistent, shape-stable JavaScript help the V8 engine achieve near C++ speeds?",
        "vi": "Lối viết JavaScript sạch sẽ, đồng nhất kiểu dữ liệu và ổn định cấu trúc Shape giúp động cơ V8 đạt tốc độ tiệm cận C++ như thế nào?"
      },
      "options": [
        {
          "en": "It allows TurboFan to generate deterministic, unbranched native machine code with direct register operations and inlined method calls without type checks or bailout deoptimizations",
          "vi": "Nó cho phép TurboFan sinh mã máy trực tiếp không cần rẽ nhánh với các thao tác thanh ghi và inline hàm mà không cần kiểm tra kiểu hay bị deoptimization"
        },
        {
          "en": "It automatically translates JavaScript to Rust",
          "vi": "Nó tự động dịch JavaScript sang Rust"
        },
        {
          "en": "It disables the browser security sandbox",
          "vi": "Nó tắt sandbox bảo mật của trình duyệt"
        },
        {
          "en": "It increases GPU clock speeds",
          "vi": "Nó tăng xung nhịp GPU"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Predictable, monomorphic patterns enable TurboFan to emit optimal CPU instructions identical to compiled native languages.",
        "vi": "Các mẫu mã nhất quán và monomorphic cho phép TurboFan xuất ra các tập lệnh CPU tối ưu tương đương các ngôn ngữ biên dịch gốc."
      },
      "topicId": "js_v8_jit_internals",
      "difficulty": "hard"
    }
  ]
};
export default lesson28;
