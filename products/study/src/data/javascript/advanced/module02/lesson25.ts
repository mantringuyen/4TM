import { Lesson } from '../../../../types';

export const lesson25: Lesson = {
  "id": "js_lesson_25",
  "courseId": "javascript",
  "levelId": "advanced",
  "moduleId": "js_mod_6",
  "order": 25,
  "title": {
    "en": "ES Modules, CommonJS, Dynamic Imports & Import Maps",
    "vi": "ES Modules (ESM), CommonJS (CJS), Dynamic Imports & Import Maps"
  },
  "summary": {
    "en": "Master ESM vs CJS module resolution, static analysis & tree-shaking, live bindings, top-level `await`, dynamic `import()`, circular dependencies, and browser native Import Maps.",
    "vi": "Làm chủ cơ chế nạp module ESM vs CJS, phân tích tĩnh & tree-shaking, liên kết động (live bindings), top-level `await`, nạp động `import()`, xử lý phụ thuộc vòng (circular dependencies) và Import Maps gốc trong trình duyệt."
  },
  "estimatedMinutes": 24,
  "topicId": "js_modules_esm_cjs",
  "learn": {
    "introduction": {
      "en": "The JavaScript module ecosystem has evolved from legacy synchronous CommonJS (`require`/`module.exports` in Node.js) to the official ECMAScript Modules (ESM) standard (`import`/`export`). ESM brings static analysis, asynchronous module loading, dead code elimination (tree-shaking), live variable bindings, top-level `await`, and native browser execution via `<script type=\"module\">` and Import Maps.",
      "vi": "Hệ sinh thái module của JavaScript đã phát triển từ CommonJS đồng bộ truyền thống (`require`/`module.exports` trong Node.js) lên chuẩn chính thức ECMAScript Modules (ESM) (`import`/`export`). ESM mang lại khả năng phân tích tĩnh, nạp module bất đồng bộ, loại bỏ code thừa (tree-shaking), liên kết biến động (live bindings), top-level `await` và thực thi trực tiếp trên trình duyệt qua `<script type=\"module\">` cùng Import Maps."
    },
    "conceptExplanation": {
      "en": "1. ESM vs CJS Fundamental Differences:\n   - ESM (`import`/`export`): Asynchronous, statically analyzable at parse time before execution, outputs *live bindings* (pointers to exported variables).\n   - CJS (`require`/`module.exports`): Synchronous, evaluated at runtime, outputs *value copies* (shallow snapshot).\n\n2. Tree-Shaking & Dead Code Elimination: Because ESM imports are static, bundlers (Vite, Rollup, Webpack) build an AST dependency graph and remove unused named exports completely from production bundles.\n\n3. Dynamic Imports: `const module = await import('./path.js')` enables code splitting and on-demand lazy loading of heavy bundles (e.g. charts, modals, admin panels).\n\n4. Top-Level `await`: Modern ESM files can use `await` at the top level without wrapping in an `async function` IIFE.\n\n5. Browser Import Maps: `<script type=\"importmap\">` allows specifying bare module specifiers (e.g. `import React from 'react'`) directly in browser HTML without a bundler!",
      "vi": "1. Khác Biệt Cốt Lõi ESM vs CJS:\n   - ESM (`import`/`export`): Bất đồng bộ, phân tích tĩnh tại thời điểm phân tích cú pháp trước khi chạy, trả về *liên kết động (live bindings)*.\n   - CJS (`require`/`module.exports`): Đồng bộ, thực thi khi runtime chạy tới, trả về *bản sao giá trị (value copies)*.\n\n2. Tree-Shaking & Loại Bỏ Code Thừa: Nhờ cấu trúc tĩnh của ESM, các bundler (Vite, Rollup, Webpack) có thể xây dựng đồ thị phụ thuộc và loại bỏ triệt để các hàm không dùng tới khỏi bundle thành phẩm.\n\n3. Dynamic Imports: `const module = await import('./path.js')` hỗ trợ chia nhỏ code (code splitting) và nạp lười theo nhu cầu cho các module nặng (như biểu đồ, modal).\n\n4. Top-Level `await`: File ESM hiện đại cho phép gọi trực tiếp `await` ở tầng cao nhất mà không cần bọc trong hàm IIFE async.\n\n5. Import Maps Trình Duyệt: Thẻ `<script type=\"importmap\">` cho phép định nghĩa các bare specifier (như `import React from 'react'`) trực tiếp trên HTML trình duyệt mà không cần cài đặt bundler phức tạp!"
    },
    "syntax": "// 1. Dynamic Code-Splitting Import\nasync function loadChartLibrary() {\n  const { ChartRenderer } = await import(\"./heavyChartModule.js\");\n  const chart = new ChartRenderer(\"#chart-canvas\");\n  chart.render();\n}\n\n// 2. Browser Native Import Map (HTML)\n/*\n<script type=\"importmap\">\n{\n  \"imports\": {\n    \"lodash-es\": \"https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js\",\n    \"app/\": \"/src/\"\n  }\n}\n</script>\n<script type=\"module\">\n  import { debounce } from \"lodash-es\";\n  import { userStore } from \"app/stores/user.js\";\n</script>\n*/",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Plugin Architecture with Dynamic ESM Imports",
          "vi": "Kiến Trúc Plugin Khởi Tạo Bằng Dynamic ESM Import"
        },
        "description": {
          "en": "Demonstrates a runtime extensible plugin loader that fetches and registers external feature modules dynamically based on user permissions.",
          "vi": "Minh họa hệ thống nạp plugin mở rộng lúc runtime, tự động tải và kích hoạt module theo quyền hạn người dùng."
        },
        "code": "class PluginManager {\n  #plugins = new Map();\n\n  async loadPlugin(pluginName, modulePath) {\n    try {\n      console.log(`Loading plugin: ${pluginName} from ${modulePath}`);\n      const module = await import(modulePath);\n\n      if (typeof module.default !== \"function\") {\n        throw new Error(`Plugin ${pluginName} must export a default class/function`);\n      }\n\n      const instance = new module.default();\n      await instance.init?.();\n      this.#plugins.set(pluginName, instance);\n      return instance;\n    } catch (err) {\n      console.error(`Failed to load plugin ${pluginName}`, err);\n      throw err;\n    }\n  }\n\n  get(pluginName) {\n    return this.#plugins.get(pluginName);\n  }\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Mixing `import` and `module.exports` or using `require()` in native ESM files.",
          "vi": "Trộn lẫn `import` với `module.exports` hoặc gọi `require()` trong file ESM gốc."
        },
        "correction": {
          "en": "Use standard `export` / `import` syntax in ESM files. For dynamic loading in ESM, use `await import()`.",
          "vi": "Dùng chuẩn `export` / `import` trong file ESM. Để nạp động trong ESM, dùng `await import()`."
        }
      }
    ],
    "tips": [
      {
        "en": "Use named exports to maximize tree-shaking efficiency: Exporting single large objects via `default export` makes it harder for bundlers to eliminate unused nested properties.",
        "vi": "Ưu tiên named export để tối đa hóa hiệu quả loại bỏ code thừa (tree-shaking): Export một object lớn qua `default export` khiến bundler khó phân tích và không thể loại bỏ các thuộc tính con không sử dụng."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_25_1",
      "type": "complete_code",
      "title": {
        "en": "Dynamic Component Loader with Fallback",
        "vi": "Bộ Nạp Component Động Kèm Xử Lý Dự Phòng (Fallback)"
      },
      "instruction": {
        "en": "Write an async function `loadDynamicComponent(importPath, fallbackComponent)` that tries to dynamically import `importPath`. If it succeeds and exports a `default` property, return `module.default`. If the import fails, return `fallbackComponent`.",
        "vi": "Viết hàm bất đồng bộ `loadDynamicComponent(importPath, fallbackComponent)` cố gắng nạp động từ `importPath`. Nếu thành công và có `default`, trả về `module.default`. Nếu import thất bại, trả về `fallbackComponent`."
      },
      "starterCode": "async function loadDynamicComponent(importPath, fallbackComponent) {\n  // Implement dynamic loader\n}",
      "solutionCode": "async function loadDynamicComponent(importPath, fallbackComponent) {\n  try {\n    const mod = await import(importPath);\n    return mod.default || mod;\n  } catch (err) {\n    console.warn(`Failed to load component from ${importPath}, using fallback`, err);\n    return fallbackComponent;\n  }\n}",
      "hint": {
        "en": "Wrap `await import(importPath)` in a try/catch block. Return `mod.default || mod` on success, or return `fallbackComponent` on catch.",
        "vi": "Bọc `await import(importPath)` trong khối try/catch. Trả về `mod.default || mod` khi thành công, hoặc trả về `fallbackComponent` khi bắt lỗi."
      }
    },
    {
      "id": "js_ex_25_2",
      "type": "complete_code",
      "title": {
        "en": "Simulate ESM Live Bindings vs CJS Value Snapshots",
        "vi": "Mô Phỏng Cơ Chế Live Bindings Của ESM So Với Value Snapshot Của CJS"
      },
      "instruction": {
        "en": "Create two functions simulating module systems: `createCjsModule()` that returns an object containing an exported count snapshot and an `increment` function, and `createEsmModule()` that returns an object with a getter `count` and an `increment` function. Demonstrate that reading `count` in ESM reflects updates dynamically.",
        "vi": "Tạo 2 hàm mô phỏng hệ thống module: `createCjsModule()` trả về object chứa snapshot biến count và hàm `increment`, và `createEsmModule()` trả về object có getter `count` và hàm `increment`. Chứng minh việc đọc `count` trong ESM phản ánh dữ liệu mới nhất."
      },
      "starterCode": "function createCjsModule() {\n  // CommonJS snapshot simulation\n}\n\nfunction createEsmModule() {\n  // ESM live binding simulation\n}",
      "solutionCode": "function createCjsModule() {\n  let count = 0;\n  function increment() { count++; }\n  return {\n    count, // Value snapshot at export time!\n    increment\n  };\n}\n\nfunction createEsmModule() {\n  let count = 0;\n  function increment() { count++; }\n  return {\n    get count() { return count; }, // Live binding reference!\n    increment\n  };\n}",
      "hint": {
        "en": "In createCjsModule, export `count` directly. In createEsmModule, export `get count() { return count; }`.",
        "vi": "Trong createCjsModule, export `count` trực tiếp. Trong createEsmModule, export `get count() { return count; }`."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_25",
    "title": {
      "en": "Micro-Frontend Lazy Route Registrar with Code Splitting",
      "vi": "Bộ Đăng Ký Route Lazy Cho Kiến Trúc Micro-Frontend"
    },
    "description": {
      "en": "Build a router registry `createLazyRouter()` that registers routes with dynamic import factories `{ path, loader: () => import(...) }`. When `navigate(path)` is called, it caches loaded modules, resolves route parameters, and invokes the rendered component.",
      "vi": "Xây dựng hệ thống đăng ký router `createLazyRouter()` đăng ký các route cùng hàm nạp động `{ path, loader: () => import(...) }`. Khi gọi `navigate(path)`, nó cache module đã nạp, phân giải tham số URL và gọi render component."
    },
    "starterCode": "function createLazyRouter() {\n  // Implement lazy router registry\n}",
    "solutionCode": "function createLazyRouter() {\n  const routes = new Map();\n  const moduleCache = new Map();\n\n  return {\n    register(path, loader) {\n      routes.set(path, loader);\n    },\n    async navigate(path) {\n      if (!routes.has(path)) {\n        throw new Error(`Route '${path}' not found`);\n      }\n\n      if (moduleCache.has(path)) {\n        return moduleCache.get(path);\n      }\n\n      const loader = routes.get(path);\n      const mod = await loader();\n      const component = mod.default || mod;\n      moduleCache.set(path, component);\n      return component;\n    }\n  };\n}",
    "hints": [
      {
        "en": "Maintain Map for routes and moduleCache. In navigate, await loader() if not cached, cache the resolved default export.",
        "vi": "Duy trì Map cho routes và moduleCache. Trong navigate, await loader() nếu chưa cache và lưu component đã nạp vào cache."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Micro-Frontend Lazy Route Registrar with Code Splitting according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Đăng Ký Route Lazy Cho Kiến Trúc Micro-Frontend theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_25_1",
      "type": "single_choice",
      "question": {
        "en": "What is the key difference between ESM (`import`/`export`) and CommonJS (`require`) variable bindings?",
        "vi": "Điểm khác biệt quan trọng giữa liên kết biến của ESM (`import`/`export`) và CommonJS (`require`) là gì?"
      },
      "options": [
        {
          "en": "ESM exports 'Live Bindings' (read-only pointers to source variables that reflect internal updates), whereas CommonJS exports copied value snapshots at evaluation time",
          "vi": "ESM export 'Live Bindings' (con trỏ chỉ đọc tới biến gốc và tự cập nhật khi biến gốc thay đổi), trong khi CommonJS export bản sao giá trị tại thời điểm nạp"
        },
        {
          "en": "ESM bindings are mutable by the importer",
          "vi": "Bên import có thể tự do gán lại giá trị của ESM binding"
        },
        {
          "en": "CommonJS uses HTTP/2 streams",
          "vi": "CommonJS sử dụng luồng HTTP/2"
        },
        {
          "en": "ESM only supports strings",
          "vi": "ESM chỉ hỗ trợ kiểu chuỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "ESM exports are live references. When the exporter updates the variable, importers see the updated value immediately.",
        "vi": "ESM export tham chiếu động. Khi file xuất cập nhật biến, file nạp sẽ thấy ngay giá trị mới nhất."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "easy"
    },
    {
      "id": "js_q_25_2",
      "type": "predict_output",
      "question": {
        "en": "What does `import('./module.js')` return when called dynamically?",
        "vi": "`import('./module.js')` trả về giá trị gì khi được gọi theo dạng dynamic import?"
      },
      "options": [
        {
          "en": "A Promise that resolves to the module namespace object containing all exports",
          "vi": "Một Promise resolve đối tượng module namespace chứa toàn bộ các export"
        },
        {
          "en": "The default export directly and synchronously",
          "vi": "Export mặc định trực tiếp và đồng bộ"
        },
        {
          "en": "An HTML script element",
          "vi": "Một thẻ script HTML"
        },
        {
          "en": "A string containing the file source code",
          "vi": "Một chuỗi chứa mã nguồn của file"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Dynamic `import()` returns a Promise resolving to the module object with named exports and `.default`.",
        "vi": "Dynamic `import()` trả về Promise resolve đối tượng module chứa các named export và `.default`."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "easy"
    },
    {
      "id": "js_q_25_3",
      "type": "single_choice",
      "question": {
        "en": "What is 'Tree-Shaking' in modern JavaScript bundlers?",
        "vi": "'Tree-Shaking' trong các công cụ đóng gói (bundler) JavaScript hiện đại là gì?"
      },
      "options": [
        {
          "en": "The process of analyzing static ESM imports to detect and eliminate unused exported code from the final production bundle",
          "vi": "Quá trình phân tích tĩnh các import ESM để phát hiện và loại bỏ triệt để code thừa không dùng khỏi bundle production"
        },
        {
          "en": "Converting CSS into JavaScript",
          "vi": "Chuyển đổi CSS thành JavaScript"
        },
        {
          "en": "Reformatting code indentation",
          "vi": "Căn chỉnh lại thụt đầu dòng code"
        },
        {
          "en": "Encrypting production passwords",
          "vi": "Mã hóa mật khẩu production"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Tree-shaking relies on ESM's static structure to strip unreferenced exports at build time.",
        "vi": "Tree-shaking dựa vào cấu trúc tĩnh của ESM để loại bỏ code không sử dụng lúc build."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "easy"
    },
    {
      "id": "js_q_25_4",
      "type": "predict_output",
      "question": {
        "en": "What is the purpose of an `<script type=\"importmap\">` tag in HTML?",
        "vi": "Mục đích của thẻ `<script type=\"importmap\">` trong HTML là gì?"
      },
      "options": [
        {
          "en": "To map bare module specifiers (e.g. 'lodash' or 'vue') directly to CDN URLs or local file paths natively in the browser without a bundler",
          "vi": "Ánh xạ tên module trực tiếp (như 'lodash' hay 'vue') tới URL CDN hoặc file nội bộ trong trình duyệt mà không cần cài bundler"
        },
        {
          "en": "To render Google Maps inside the page",
          "vi": "Hiển thị Google Maps trên trang web"
        },
        {
          "en": "To configure CSS grid column spans",
          "vi": "Cấu hình số cột cho CSS grid"
        },
        {
          "en": "To import SQL database tables",
          "vi": "Import bảng cơ sở dữ liệu SQL"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Import Maps allow browsers to resolve bare package imports natively.",
        "vi": "Import Maps cho phép trình duyệt tự giải mã các đường dẫn bare import gói thư viện trực tiếp."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "medium"
    },
    {
      "id": "js_q_25_5",
      "type": "single_choice",
      "question": {
        "en": "Can `await` be used at the top level of an ES Module outside any `async` function?",
        "vi": "Có thể dùng trực tiếp `await` ở tầng cao nhất của một file ES Module mà không cần bọc trong hàm `async` không?"
      },
      "options": [
        {
          "en": "Yes, Top-Level Await is supported in standard ES2022+ modules",
          "vi": "Có, Top-Level Await được hỗ trợ chính thức trong chuẩn ES2022+ module"
        },
        {
          "en": "No, await is strictly forbidden outside async functions",
          "vi": "Không, await bị cấm tuyệt đối bên ngoài hàm async"
        },
        {
          "en": "Only inside node_modules",
          "vi": "Chỉ dùng được bên trong node_modules"
        },
        {
          "en": "Only on Windows operating systems",
          "vi": "Chỉ dùng được trên hệ điều hành Windows"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Top-Level Await allows module execution to pause while asynchronous resources (config, WASM, DB connection) load.",
        "vi": "Top-Level Await cho phép quá trình nạp module tạm dừng trong khi tải các tài nguyên bất đồng bộ (config, WASM)."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "medium"
    },
    {
      "id": "js_q_25_6",
      "type": "predict_output",
      "question": {
        "en": "What happens if an imported variable in ESM is mutated directly by the importing file (`import { count } from './mod.js'; count = 5;`)?",
        "vi": "Điều gì xảy ra nếu file import cố tình gán lại giá trị cho biến ESM (`import { count } from './mod.js'; count = 5;`)?"
      },
      "options": [
        {
          "en": "Throws a TypeError: Assignment to constant variable / invalid assignment (ESM imports are read-only to importers)",
          "vi": "Ném lỗi TypeError: Assignment to constant variable (các import ESM là chỉ đọc đối với bên nạp)"
        },
        {
          "en": "The variable is successfully updated in both files",
          "vi": "Biến được cập nhật thành công ở cả 2 file"
        },
        {
          "en": "The exporter file is deleted",
          "vi": "File xuất bị xóa"
        },
        {
          "en": "Silently ignored",
          "vi": "Bị bỏ qua trong im lặng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "ESM imported bindings are immutable views. Only the exporting module has the authority to mutate its own bindings.",
        "vi": "Các binding nạp từ ESM là dạng chỉ đọc. Chỉ có chính module xuất mới có quyền thay đổi giá trị của nó."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "medium"
    },
    {
      "id": "js_q_25_7",
      "type": "fill_blank",
      "question": {
        "en": "To load an external JavaScript file as a native ES Module in an HTML document, set the attribute <script type=\"_____\">.",
        "vi": "Để nạp một file JavaScript ngoài dưới dạng ES Module chuẩn trong tài liệu HTML, đặt thuộc tính <script type=\"_____\">."
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
        "en": "`<script type=\"module\">` instructs the browser to parse the script as an ES Module.",
        "vi": "`<script type=\"module\">` chỉ thị cho trình duyệt phân tích cú pháp script dưới dạng ES Module."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "module"
      ]
    },
    {
      "id": "js_q_25_8",
      "type": "single_choice",
      "question": {
        "en": "How does Node.js distinguish whether a `.js` file should be parsed as ESM or CommonJS?",
        "vi": "Node.js phân biệt một file `.js` nên được hiểu là ESM hay CommonJS dựa vào đâu?"
      },
      "options": [
        {
          "en": "By looking for `\"type\": \"module\"` in the nearest `package.json`, or file extensions `.mjs` (ESM) vs `.cjs` (CommonJS)",
          "vi": "Bằng cách tìm trường `\"type\": \"module\"` trong `package.json` gần nhất, hoặc đuôi file `.mjs` (ESM) vs `.cjs` (CommonJS)"
        },
        {
          "en": "By checking the file creation date",
          "vi": "Bằng cách kiểm tra ngày tạo file"
        },
        {
          "en": "By counting the number of functions",
          "vi": "Bằng cách đếm số lượng hàm"
        },
        {
          "en": "All files in Node.js are always CommonJS",
          "vi": "Tất cả file trong Node.js luôn là CommonJS"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`\"type\": \"module\"` in `package.json` treats `.js` as ESM. `.mjs` is always ESM, and `.cjs` is always CommonJS.",
        "vi": "`\"type\": \"module\"` trong `package.json` quy định file `.js` là ESM. Đuôi `.mjs` luôn là ESM, và `.cjs` luôn là CommonJS."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "hard"
    },
    {
      "id": "js_q_25_9",
      "type": "predict_output",
      "question": {
        "en": "Are `<script type=\"module\">` scripts deferred by default in HTML?",
        "vi": "Các thẻ `<script type=\"module\">` có mặc định mang hành vi deferred (hoãn thực thi đến khi parse xong DOM) không?"
      },
      "options": [
        {
          "en": "Yes, module scripts automatically execute with deferred behavior after HTML document parsing finishes",
          "vi": "Có, module script tự động hoãn thực thi và chỉ chạy sau khi trình duyệt phân tích xong cây DOM HTML"
        },
        {
          "en": "No, they block the HTML parser synchronously",
          "vi": "Không, chúng chặn parser đồng bộ"
        },
        {
          "en": "Only if `async` attribute is added",
          "vi": "Chỉ khi thêm thuộc tính `async`"
        },
        {
          "en": "Only on mobile browsers",
          "vi": "Chỉ trên trình duyệt di động"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Module scripts download in parallel and defer execution until the HTML document is fully parsed.",
        "vi": "Module script tải về song song và tự động hoãn chạy cho đến khi toàn bộ HTML được phân tích xong."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "hard"
    },
    {
      "id": "js_q_25_10",
      "type": "single_choice",
      "question": {
        "en": "How does ESM handle circular dependencies compared to CommonJS?",
        "vi": "ESM xử lý phụ thuộc vòng (Circular Dependencies) ưu việt hơn CommonJS như thế nào?"
      },
      "options": [
        {
          "en": "Because ESM uses static two-phase parsing (instantiation then evaluation) and live bindings, circular references can resolve successfully once modules finish executing, unlike CJS which returns incomplete partial object copies",
          "vi": "Vì ESM sử dụng quy trình phân tích 2 giai đoạn tĩnh và live bindings, các tham chiếu vòng có thể phân giải thành công sau khi module chạy xong, không bị lỗi nhận object chưa hoàn thiện như CJS"
        },
        {
          "en": "ESM deletes circular files automatically",
          "vi": "ESM tự động xóa file gây phụ thuộc vòng"
        },
        {
          "en": "CommonJS detects cycles and crashes immediately",
          "vi": "CommonJS phát hiện vòng lặp và crash ngay"
        },
        {
          "en": "Circular dependencies are impossible in JavaScript",
          "vi": "Không thể xảy ra phụ thuộc vòng trong JavaScript"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "ESM builds the module graph and links live references before executing code, making circular dependencies resilient.",
        "vi": "ESM dựng đồ thị module và liên kết tham chiếu trước khi chạy code, giúp xử lý các mối phụ thuộc vòng an toàn hơn."
      },
      "topicId": "js_modules_esm_cjs",
      "difficulty": "hard"
    }
  ]
};
export default lesson25;
