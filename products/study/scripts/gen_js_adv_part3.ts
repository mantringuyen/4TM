import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/advanced/module01');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 25 ---
const lesson25: Lesson = {
  id: "js_lesson_25",
  courseId: "javascript",
  levelId: "advanced",
  moduleId: "js_mod_5",
  order: 25,
  title: {
    en: "ES Modules, CommonJS, Dynamic Imports & Import Maps",
    vi: "ES Modules (ESM), CommonJS (CJS), Dynamic Imports & Import Maps"
  },
  summary: {
    en: "Master ESM vs CJS module resolution, static analysis & tree-shaking, live bindings, top-level `await`, dynamic `import()`, circular dependencies, and browser native Import Maps.",
    vi: "Làm chủ cơ chế nạp module ESM vs CJS, phân tích tĩnh & tree-shaking, liên kết động (live bindings), top-level `await`, nạp động `import()`, xử lý phụ thuộc vòng (circular dependencies) và Import Maps gốc trong trình duyệt."
  },
  estimatedMinutes: 24,
  topicId: "js_modules_esm_cjs",
  learn: {
    introduction: {
      en: "The JavaScript module ecosystem has evolved from legacy synchronous CommonJS (`require`/`module.exports` in Node.js) to the official ECMAScript Modules (ESM) standard (`import`/`export`). ESM brings static analysis, asynchronous module loading, dead code elimination (tree-shaking), live variable bindings, top-level `await`, and native browser execution via `<script type=\"module\">` and Import Maps.",
      vi: "Hệ sinh thái module của JavaScript đã phát triển từ CommonJS đồng bộ truyền thống (`require`/`module.exports` trong Node.js) lên chuẩn chính thức ECMAScript Modules (ESM) (`import`/`export`). ESM mang lại khả năng phân tích tĩnh, nạp module bất đồng bộ, loại bỏ code thừa (tree-shaking), liên kết biến động (live bindings), top-level `await` và thực thi trực tiếp trên trình duyệt qua `<script type=\"module\">` cùng Import Maps."
    },
    conceptExplanation: {
      en: "1. ESM vs CJS Fundamental Differences:\n   - ESM (`import`/`export`): Asynchronous, statically analyzable at parse time before execution, outputs *live bindings* (pointers to exported variables).\n   - CJS (`require`/`module.exports`): Synchronous, evaluated at runtime, outputs *value copies* (shallow snapshot).\n\n2. Tree-Shaking & Dead Code Elimination: Because ESM imports are static, bundlers (Vite, Rollup, Webpack) build an AST dependency graph and remove unused named exports completely from production bundles.\n\n3. Dynamic Imports: `const module = await import('./path.js')` enables code splitting and on-demand lazy loading of heavy bundles (e.g. charts, modals, admin panels).\n\n4. Top-Level `await`: Modern ESM files can use `await` at the top level without wrapping in an `async function` IIFE.\n\n5. Browser Import Maps: `<script type=\"importmap\">` allows specifying bare module specifiers (e.g. `import React from 'react'`) directly in browser HTML without a bundler!",
      vi: "1. Khác Biệt Cốt Lõi ESM vs CJS:\n   - ESM (`import`/`export`): Bất đồng bộ, phân tích tĩnh tại thời điểm phân tích cú pháp trước khi chạy, trả về *liên kết động (live bindings)*.\n   - CJS (`require`/`module.exports`): Đồng bộ, thực thi khi runtime chạy tới, trả về *bản sao giá trị (value copies)*.\n\n2. Tree-Shaking & Loại Bỏ Code Thừa: Nhờ cấu trúc tĩnh của ESM, các bundler (Vite, Rollup, Webpack) có thể xây dựng đồ thị phụ thuộc và loại bỏ triệt để các hàm không dùng tới khỏi bundle thành phẩm.\n\n3. Dynamic Imports: `const module = await import('./path.js')` hỗ trợ chia nhỏ code (code splitting) và nạp lười theo nhu cầu cho các module nặng (như biểu đồ, modal).\n\n4. Top-Level `await`: File ESM hiện đại cho phép gọi trực tiếp `await` ở tầng cao nhất mà không cần bọc trong hàm IIFE async.\n\n5. Import Maps Trình Duyệt: Thẻ `<script type=\"importmap\">` cho phép định nghĩa các bare specifier (như `import React from 'react'`) trực tiếp trên HTML trình duyệt mà không cần cài đặt bundler phức tạp!"
    },
    syntax: `// 1. Dynamic Code-Splitting Import
async function loadChartLibrary() {
  const { ChartRenderer } = await import("./heavyChartModule.js");
  const chart = new ChartRenderer("#chart-canvas");
  chart.render();
}

// 2. Browser Native Import Map (HTML)
/*
<script type="importmap">
{
  "imports": {
    "lodash-es": "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js",
    "app/": "/src/"
  }
}
</script>
<script type="module">
  import { debounce } from "lodash-es";
  import { userStore } from "app/stores/user.js";
</script>
*/`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Plugin Architecture with Dynamic ESM Imports",
          vi: "Kiến Trúc Plugin Khởi Tạo Bằng Dynamic ESM Import"
        },
        description: {
          en: "Demonstrates a runtime extensible plugin loader that fetches and registers external feature modules dynamically based on user permissions.",
          vi: "Minh họa hệ thống nạp plugin mở rộng lúc runtime, tự động tải và kích hoạt module theo quyền hạn người dùng."
        },
        code: `class PluginManager {
  #plugins = new Map();

  async loadPlugin(pluginName, modulePath) {
    try {
      console.log(\`Loading plugin: \${pluginName} from \${modulePath}\`);
      const module = await import(modulePath);

      if (typeof module.default !== "function") {
        throw new Error(\`Plugin \${pluginName} must export a default class/function\`);
      }

      const instance = new module.default();
      await instance.init?.();
      this.#plugins.set(pluginName, instance);
      return instance;
    } catch (err) {
      console.error(\`Failed to load plugin \${pluginName}\`, err);
      throw err;
    }
  }

  get(pluginName) {
    return this.#plugins.get(pluginName);
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Mixing `import` and `module.exports` or using `require()` in native ESM files.",
          vi: "Trộn lẫn `import` với `module.exports` hoặc gọi `require()` trong file ESM gốc."
        },
        correction: {
          en: "Use standard `export` / `import` syntax in ESM files. For dynamic loading in ESM, use `await import()`.",
          vi: "Dùng chuẩn `export` / `import` trong file ESM. Để nạp động trong ESM, dùng `await import()`."
        },
        explanation: {
          en: "In native ECMAScript modules, `require`, `exports`, `__dirname`, and `__filename` globals do not exist.",
          vi: "Trong module ESM chuẩn, các biến toàn cục `require`, `exports`, `__dirname`, và `__filename` không hề tồn tại."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use named exports to maximize tree-shaking efficiency",
          vi: "Ưu tiên named export để tối đa hóa hiệu quả loại bỏ code thừa (tree-shaking)"
        },
        description: {
          en: "Exporting single large objects via `default export` makes it harder for bundlers to eliminate unused nested properties.",
          vi: "Export một object lớn qua `default export` khiến bundler khó phân tích và không thể loại bỏ các thuộc tính con không sử dụng."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_25_1",
      title: {
        en: "Dynamic Component Loader with Fallback",
        vi: "Bộ Nạp Component Động Kèm Xử Lý Dự Phòng (Fallback)"
      },
      instruction: {
        en: "Write an async function `loadDynamicComponent(importPath, fallbackComponent)` that tries to dynamically import `importPath`. If it succeeds and exports a `default` property, return `module.default`. If the import fails, return `fallbackComponent`.",
        vi: "Viết hàm bất đồng bộ `loadDynamicComponent(importPath, fallbackComponent)` cố gắng nạp động từ `importPath`. Nếu thành công và có `default`, trả về `module.default`. Nếu import thất bại, trả về `fallbackComponent`."
      },
      starterCode: `async function loadDynamicComponent(importPath, fallbackComponent) {
  // Implement dynamic loader
}`,
      solutionCode: `async function loadDynamicComponent(importPath, fallbackComponent) {
  try {
    const mod = await import(importPath);
    return mod.default || mod;
  } catch (err) {
    console.warn(\`Failed to load component from \${importPath}, using fallback\`, err);
    return fallbackComponent;
  }
}`,
      hints: [
        {
          en: "Wrap `await import(importPath)` in a try/catch block. Return `mod.default || mod` on success, or return `fallbackComponent` on catch.",
          vi: "Bọc `await import(importPath)` trong khối try/catch. Trả về `mod.default || mod` khi thành công, hoặc trả về `fallbackComponent` khi bắt lỗi."
        }
      ]
    },
    {
      id: "js_ex_25_2",
      title: {
        en: "Simulate ESM Live Bindings vs CJS Value Snapshots",
        vi: "Mô Phỏng Cơ Chế Live Bindings Của ESM So Với Value Snapshot Của CJS"
      },
      instruction: {
        en: "Create two functions simulating module systems: `createCjsModule()` that returns an object containing an exported count snapshot and an `increment` function, and `createEsmModule()` that returns an object with a getter `count` and an `increment` function. Demonstrate that reading `count` in ESM reflects updates dynamically.",
        vi: "Tạo 2 hàm mô phỏng hệ thống module: `createCjsModule()` trả về object chứa snapshot biến count và hàm `increment`, và `createEsmModule()` trả về object có getter `count` và hàm `increment`. Chứng minh việc đọc `count` trong ESM phản ánh dữ liệu mới nhất."
      },
      starterCode: `function createCjsModule() {
  // CommonJS snapshot simulation
}

function createEsmModule() {
  // ESM live binding simulation
}`,
      solutionCode: `function createCjsModule() {
  let count = 0;
  function increment() { count++; }
  return {
    count, // Value snapshot at export time!
    increment
  };
}

function createEsmModule() {
  let count = 0;
  function increment() { count++; }
  return {
    get count() { return count; }, // Live binding reference!
    increment
  };
}`,
      hints: [
        {
          en: "In createCjsModule, export `count` directly. In createEsmModule, export `get count() { return count; }`.",
          vi: "Trong createCjsModule, export `count` trực tiếp. Trong createEsmModule, export `get count() { return count; }`."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_25",
    title: {
      en: "Micro-Frontend Lazy Route Registrar with Code Splitting",
      vi: "Bộ Đăng Ký Route Lazy Cho Kiến Trúc Micro-Frontend"
    },
    description: {
      en: "Build a router registry `createLazyRouter()` that registers routes with dynamic import factories `{ path, loader: () => import(...) }`. When `navigate(path)` is called, it caches loaded modules, resolves route parameters, and invokes the rendered component.",
      vi: "Xây dựng hệ thống đăng ký router `createLazyRouter()` đăng ký các route cùng hàm nạp động `{ path, loader: () => import(...) }`. Khi gọi `navigate(path)`, nó cache module đã nạp, phân giải tham số URL và gọi render component."
    },
    starterCode: `function createLazyRouter() {
  // Implement lazy router registry
}`,
    solutionCode: `function createLazyRouter() {
  const routes = new Map();
  const moduleCache = new Map();

  return {
    register(path, loader) {
      routes.set(path, loader);
    },
    async navigate(path) {
      if (!routes.has(path)) {
        throw new Error(\`Route '\${path}' not found\`);
      }

      if (moduleCache.has(path)) {
        return moduleCache.get(path);
      }

      const loader = routes.get(path);
      const mod = await loader();
      const component = mod.default || mod;
      moduleCache.set(path, component);
      return component;
    }
  };
}`,
    hints: [
      {
        en: "Maintain Map for routes and moduleCache. In navigate, await loader() if not cached, cache the resolved default export.",
        vi: "Duy trì Map cho routes và moduleCache. Trong navigate, await loader() nếu chưa cache và lưu component đã nạp vào cache."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_25_1",
      type: "single_choice",
      question: {
        en: "What is the key difference between ESM (`import`/`export`) and CommonJS (`require`) variable bindings?",
        vi: "Điểm khác biệt quan trọng giữa liên kết biến của ESM (`import`/`export`) và CommonJS (`require`) là gì?"
      },
      options: [
        { id: "a", text: { en: "ESM exports 'Live Bindings' (read-only pointers to source variables that reflect internal updates), whereas CommonJS exports copied value snapshots at evaluation time", vi: "ESM export 'Live Bindings' (con trỏ chỉ đọc tới biến gốc và tự cập nhật khi biến gốc thay đổi), trong khi CommonJS export bản sao giá trị tại thời điểm nạp" } },
        { id: "b", text: { en: "ESM bindings are mutable by the importer", vi: "Bên import có thể tự do gán lại giá trị của ESM binding" } },
        { id: "c", text: { en: "CommonJS uses HTTP/2 streams", vi: "CommonJS sử dụng luồng HTTP/2" } },
        { id: "d", text: { en: "ESM only supports strings", vi: "ESM chỉ hỗ trợ kiểu chuỗi" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "ESM exports are live references. When the exporter updates the variable, importers see the updated value immediately.",
        vi: "ESM export tham chiếu động. Khi file xuất cập nhật biến, file nạp sẽ thấy ngay giá trị mới nhất."
      }
    },
    {
      id: "js_q_25_2",
      type: "predict_output",
      question: {
        en: "What does `import('./module.js')` return when called dynamically?",
        vi: "`import('./module.js')` trả về giá trị gì khi được gọi theo dạng dynamic import?"
      },
      options: [
        { id: "a", text: { en: "A Promise that resolves to the module namespace object containing all exports", vi: "Một Promise resolve đối tượng module namespace chứa toàn bộ các export" } },
        { id: "b", text: { en: "The default export directly and synchronously", vi: "Export mặc định trực tiếp và đồng bộ" } },
        { id: "c", text: { en: "An HTML script element", vi: "Một thẻ script HTML" } },
        { id: "d", text: { en: "A string containing the file source code", vi: "Một chuỗi chứa mã nguồn của file" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Dynamic `import()` returns a Promise resolving to the module object with named exports and `.default`.",
        vi: "Dynamic `import()` trả về Promise resolve đối tượng module chứa các named export và `.default`."
      }
    },
    {
      id: "js_q_25_3",
      type: "single_choice",
      question: {
        en: "What is 'Tree-Shaking' in modern JavaScript bundlers?",
        vi: "'Tree-Shaking' trong các công cụ đóng gói (bundler) JavaScript hiện đại là gì?"
      },
      options: [
        { id: "a", text: { en: "The process of analyzing static ESM imports to detect and eliminate unused exported code from the final production bundle", vi: "Quá trình phân tích tĩnh các import ESM để phát hiện và loại bỏ triệt để code thừa không dùng khỏi bundle production" } },
        { id: "b", text: { en: "Converting CSS into JavaScript", vi: "Chuyển đổi CSS thành JavaScript" } },
        { id: "c", text: { en: "Reformatting code indentation", vi: "Căn chỉnh lại thụt đầu dòng code" } },
        { id: "d", text: { en: "Encrypting production passwords", vi: "Mã hóa mật khẩu production" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Tree-shaking relies on ESM's static structure to strip unreferenced exports at build time.",
        vi: "Tree-shaking dựa vào cấu trúc tĩnh của ESM để loại bỏ code không sử dụng lúc build."
      }
    },
    {
      id: "js_q_25_4",
      type: "predict_output",
      question: {
        en: "What is the purpose of an `<script type=\"importmap\">` tag in HTML?",
        vi: "Mục đích của thẻ `<script type=\"importmap\">` trong HTML là gì?"
      },
      options: [
        { id: "a", text: { en: "To map bare module specifiers (e.g. 'lodash' or 'vue') directly to CDN URLs or local file paths natively in the browser without a bundler", vi: "Ánh xạ tên module trực tiếp (như 'lodash' hay 'vue') tới URL CDN hoặc file nội bộ trong trình duyệt mà không cần cài bundler" } },
        { id: "b", text: { en: "To render Google Maps inside the page", vi: "Hiển thị Google Maps trên trang web" } },
        { id: "c", text: { en: "To configure CSS grid column spans", vi: "Cấu hình số cột cho CSS grid" } },
        { id: "d", text: { en: "To import SQL database tables", vi: "Import bảng cơ sở dữ liệu SQL" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Import Maps allow browsers to resolve bare package imports natively.",
        vi: "Import Maps cho phép trình duyệt tự giải mã các đường dẫn bare import gói thư viện trực tiếp."
      }
    },
    {
      id: "js_q_25_5",
      type: "single_choice",
      question: {
        en: "Can `await` be used at the top level of an ES Module outside any `async` function?",
        vi: "Có thể dùng trực tiếp `await` ở tầng cao nhất của một file ES Module mà không cần bọc trong hàm `async` không?"
      },
      options: [
        { id: "a", text: { en: "Yes, Top-Level Await is supported in standard ES2022+ modules", vi: "Có, Top-Level Await được hỗ trợ chính thức trong chuẩn ES2022+ module" } },
        { id: "b", text: { en: "No, await is strictly forbidden outside async functions", vi: "Không, await bị cấm tuyệt đối bên ngoài hàm async" } },
        { id: "c", text: { en: "Only inside node_modules", vi: "Chỉ dùng được bên trong node_modules" } },
        { id: "d", text: { en: "Only on Windows operating systems", vi: "Chỉ dùng được trên hệ điều hành Windows" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Top-Level Await allows module execution to pause while asynchronous resources (config, WASM, DB connection) load.",
        vi: "Top-Level Await cho phép quá trình nạp module tạm dừng trong khi tải các tài nguyên bất đồng bộ (config, WASM)."
      }
    },
    {
      id: "js_q_25_6",
      type: "predict_output",
      question: {
        en: "What happens if an imported variable in ESM is mutated directly by the importing file (`import { count } from './mod.js'; count = 5;`)?",
        vi: "Điều gì xảy ra nếu file import cố tình gán lại giá trị cho biến ESM (`import { count } from './mod.js'; count = 5;`)?"
      },
      options: [
        { id: "a", text: { en: "Throws a TypeError: Assignment to constant variable / invalid assignment (ESM imports are read-only to importers)", vi: "Ném lỗi TypeError: Assignment to constant variable (các import ESM là chỉ đọc đối với bên nạp)" } },
        { id: "b", text: { en: "The variable is successfully updated in both files", vi: "Biến được cập nhật thành công ở cả 2 file" } },
        { id: "c", text: { en: "The exporter file is deleted", vi: "File xuất bị xóa" } },
        { id: "d", text: { en: "Silently ignored", vi: "Bị bỏ qua trong im lặng" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "ESM imported bindings are immutable views. Only the exporting module has the authority to mutate its own bindings.",
        vi: "Các binding nạp từ ESM là dạng chỉ đọc. Chỉ có chính module xuất mới có quyền thay đổi giá trị của nó."
      }
    },
    {
      id: "js_q_25_7",
      type: "fill_blank",
      question: {
        en: "To load an external JavaScript file as a native ES Module in an HTML document, set the attribute <script type=\"_____\">.",
        vi: "Để nạp một file JavaScript ngoài dưới dạng ES Module chuẩn trong tài liệu HTML, đặt thuộc tính <script type=\"_____\">."
      },
      correctAnswer: "module",
      explanation: {
        en: "`<script type=\"module\">` instructs the browser to parse the script as an ES Module.",
        vi: "`<script type=\"module\">` chỉ thị cho trình duyệt phân tích cú pháp script dưới dạng ES Module."
      }
    },
    {
      id: "js_q_25_8",
      type: "single_choice",
      question: {
        en: "How does Node.js distinguish whether a `.js` file should be parsed as ESM or CommonJS?",
        vi: "Node.js phân biệt một file `.js` nên được hiểu là ESM hay CommonJS dựa vào đâu?"
      },
      options: [
        { id: "a", text: { en: "By looking for `\"type\": \"module\"` in the nearest `package.json`, or file extensions `.mjs` (ESM) vs `.cjs` (CommonJS)", vi: "Bằng cách tìm trường `\"type\": \"module\"` trong `package.json` gần nhất, hoặc đuôi file `.mjs` (ESM) vs `.cjs` (CommonJS)" } },
        { id: "b", text: { en: "By checking the file creation date", vi: "Bằng cách kiểm tra ngày tạo file" } },
        { id: "c", text: { en: "By counting the number of functions", vi: "Bằng cách đếm số lượng hàm" } },
        { id: "d", text: { en: "All files in Node.js are always CommonJS", vi: "Tất cả file trong Node.js luôn là CommonJS" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`\"type\": \"module\"` in `package.json` treats `.js` as ESM. `.mjs` is always ESM, and `.cjs` is always CommonJS.",
        vi: "`\"type\": \"module\"` trong `package.json` quy định file `.js` là ESM. Đuôi `.mjs` luôn là ESM, và `.cjs` luôn là CommonJS."
      }
    },
    {
      id: "js_q_25_9",
      type: "predict_output",
      question: {
        en: "Are `<script type=\"module\">` scripts deferred by default in HTML?",
        vi: "Các thẻ `<script type=\"module\">` có mặc định mang hành vi deferred (hoãn thực thi đến khi parse xong DOM) không?"
      },
      options: [
        { id: "a", text: { en: "Yes, module scripts automatically execute with deferred behavior after HTML document parsing finishes", vi: "Có, module script tự động hoãn thực thi và chỉ chạy sau khi trình duyệt phân tích xong cây DOM HTML" } },
        { id: "b", text: { en: "No, they block the HTML parser synchronously", vi: "Không, chúng chặn parser đồng bộ" } },
        { id: "c", text: { en: "Only if `async` attribute is added", vi: "Chỉ khi thêm thuộc tính `async`" } },
        { id: "d", text: { en: "Only on mobile browsers", vi: "Chỉ trên trình duyệt di động" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Module scripts download in parallel and defer execution until the HTML document is fully parsed.",
        vi: "Module script tải về song song và tự động hoãn chạy cho đến khi toàn bộ HTML được phân tích xong."
      }
    },
    {
      id: "js_q_25_10",
      type: "code_reasoning",
      question: {
        en: "How does ESM handle circular dependencies compared to CommonJS?",
        vi: "ESM xử lý phụ thuộc vòng (Circular Dependencies) ưu việt hơn CommonJS như thế nào?"
      },
      options: [
        { id: "a", text: { en: "Because ESM uses static two-phase parsing (instantiation then evaluation) and live bindings, circular references can resolve successfully once modules finish executing, unlike CJS which returns incomplete partial object copies", vi: "Vì ESM sử dụng quy trình phân tích 2 giai đoạn tĩnh và live bindings, các tham chiếu vòng có thể phân giải thành công sau khi module chạy xong, không bị lỗi nhận object chưa hoàn thiện như CJS" } },
        { id: "b", text: { en: "ESM deletes circular files automatically", vi: "ESM tự động xóa file gây phụ thuộc vòng" } },
        { id: "c", text: { en: "CommonJS detects cycles and crashes immediately", vi: "CommonJS phát hiện vòng lặp và crash ngay" } },
        { id: "d", text: { en: "Circular dependencies are impossible in JavaScript", vi: "Không thể xảy ra phụ thuộc vòng trong JavaScript" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "ESM builds the module graph and links live references before executing code, making circular dependencies resilient.",
        vi: "ESM dựng đồ thị module và liên kết tham chiếu trước khi chạy code, giúp xử lý các mối phụ thuộc vòng an toàn hơn."
      }
    }
  ]
};

// --- LESSON 26 ---
const lesson26: Lesson = {
  id: "js_lesson_26",
  courseId: "javascript",
  levelId: "advanced",
  moduleId: "js_mod_5",
  order: 26,
  title: {
    en: "Web Workers, SharedArrayBuffer & Multithreaded Concurrency",
    vi: "Web Workers, SharedArrayBuffer & Đa Luồng Song Song (Multithreading)"
  },
  summary: {
    en: "Master offloading heavy CPU computation off the main UI thread using Dedicated Web Workers, `postMessage`, zero-copy `Transferable` ArrayBuffers, `SharedArrayBuffer`, and thread synchronization with `Atomics`.",
    vi: "Làm chủ kỹ thuật giải phóng CPU khỏi luồng UI chính bằng Web Workers, giao tiếp `postMessage`, chuyển giao bộ nhớ không sao chép `Transferable` ArrayBuffer, `SharedArrayBuffer` và đồng bộ luồng bằng `Atomics`."
  },
  estimatedMinutes: 24,
  topicId: "js_workers_multithreading",
  learn: {
    introduction: {
      en: "While the browser main thread is single-threaded—handling JavaScript execution, layout calculation, reflows, and user input—heavy computations (like image processing, cryptographic hashing, 3D physics, or machine learning) will freeze the UI. Web Workers allow spawning true OS background threads to perform heavy computations in parallel without dropping a single frame.",
      vi: "Mặc dù luồng chính (Main Thread) của trình duyệt là đơn luồng—đảm nhận cả việc chạy JavaScript, tính toán layout và tương tác người dùng—các tác vụ tính toán nặng (như xử lý ảnh, mã hóa dữ liệu, vật lý 3D, mô hình AI) sẽ làm đơ giao diện. Web Workers cho phép khởi tạo các luồng chạy ngầm thực sự của hệ điều hành để tính toán song song mà không làm giật khung hình."
    },
    conceptExplanation: {
      en: "1. Dedicated Web Worker Basics: `const worker = new Worker('worker.js', { type: 'module' })`. Workers run in an isolated execution context (`DedicatedWorkerGlobalScope`) with no access to the DOM or `window`.\n\n2. Message Passing: Communication occurs via `worker.postMessage(data)` and listening to `message` events via `self.onmessage = (e) => ...`.\n\n3. Structured Clone vs Transferable Objects:\n   - Structured Clone: Default deep-copy serialization (slow for 100MB arrays).\n   - Transferable Objects: `worker.postMessage(buffer, [buffer])`. Transfers underlying memory ownership instantly in 0ms (Zero-Copy Transfer)! The sender's buffer becomes neutered (0 bytes).\n\n4. `SharedArrayBuffer` & `Atomics`: Allows multiple threads to share the exact same raw memory buffer. The `Atomics` API (`Atomics.add`, `Atomics.wait`, `Atomics.notify`) provides lockless synchronization primitives to prevent race conditions.\n\n5. Termination: Call `worker.terminate()` from main thread or `self.close()` inside the worker.",
      vi: "1. Cơ Bản Về Dedicated Web Worker: `const worker = new Worker('worker.js', { type: 'module' })`. Worker chạy trong ngữ cảnh cách ly riêng biệt (`DedicatedWorkerGlobalScope`), không có quyền truy cập DOM hay `window`.\n\n2. Truyền Thông Điệp: Giao tiếp diễn ra qua `worker.postMessage(data)` và lắng nghe sự kiện `message` qua `self.onmessage = (e) => ...`.\n\n3. Structured Clone vs Đối Tượng Transferable:\n   - Structured Clone: Sao chép sâu mặc định (chậm với mảng dữ liệu 100MB).\n   - Transferable Objects: `worker.postMessage(buffer, [buffer])`. Chuyển quyền sở hữu bộ nhớ ngay lập tức trong 0ms (Zero-Copy)! Buffer ở bên gửi sẽ bị vô hiệu hóa (về 0 bytes).\n\n4. `SharedArrayBuffer` & `Atomics`: Cho phép nhiều luồng cùng truy cập trực tiếp vào chung một vùng nhớ thô. API `Atomics` (`Atomics.add`, `Atomics.wait`, `Atomics.notify`) cung cấp các phép toán đồng bộ luồng để phòng chống tranh chấp dữ liệu (race conditions).\n\n5. Đóng Luồng: Gọi `worker.terminate()` từ luồng chính hoặc `self.close()` từ bên trong worker."
    },
    syntax: `// 1. Spawning Worker with Transferable ArrayBuffer (Zero-Copy)
const worker = new Worker("./calcWorker.js", { type: "module" });

const buffer = new Float64Array(1_000_000).buffer;
console.log("Before transfer bytes:", buffer.byteLength); // 8,000,000 bytes

// Transfer ownership to worker thread in 0ms!
worker.postMessage({ type: "PROCESS_MATRIX", buffer }, [buffer]);
console.log("After transfer bytes:", buffer.byteLength); // 0 bytes (neutered!)

// 2. Thread-Safe Atomic Counter on SharedArrayBuffer
const sharedBuffer = new SharedArrayBuffer(4);
const sharedArray = new Int32Array(sharedBuffer);

// Increment atomically across threads without race conditions
Atomics.add(sharedArray, 0, 1);
console.log(Atomics.load(sharedArray, 0)); // 1`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Promise-Based RPC Worker Wrapper with Job IDs",
          vi: "Bọc Giao Tiếp Worker Thành Hàm Gọi Promise (Worker RPC Bridge)"
        },
        description: {
          en: "Demonstrates wrapping asynchronous postMessage exchanges into clean async/await function calls with request ID correlation.",
          vi: "Minh họa bọc luồng giao tiếp postMessage thành các hàm async/await tiện dụng dựa trên mã định danh Job ID."
        },
        code: `class WorkerClient {
  #worker;
  #pendingJobs = new Map();
  #jobIdCounter = 1;

  constructor(workerUrl) {
    this.#worker = new Worker(workerUrl, { type: "module" });
    this.#worker.onmessage = (e) => {
      const { jobId, result, error } = e.data;
      const deferred = this.#pendingJobs.get(jobId);
      if (!deferred) return;

      this.#pendingJobs.delete(jobId);
      if (error) {
        deferred.reject(new Error(error));
      } else {
        deferred.resolve(result);
      }
    };
  }

  execute(action, payload, transferables = []) {
    const jobId = this.#jobIdCounter++;
    return new Promise((resolve, reject) => {
      this.#pendingJobs.set(jobId, { resolve, reject });
      this.#worker.postMessage({ jobId, action, payload }, transferables);
    });
  }

  destroy() {
    this.#worker.terminate();
    this.#pendingJobs.clear();
  }
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Trying to manipulate `document` or access `window` inside a Web Worker script.",
          vi: "Cố gắng thao tác với `document` hoặc truy cập `window` bên trong script của Web Worker."
        },
        correction: {
          en: "Workers operate on `self` (`DedicatedWorkerGlobalScope`) and have NO DOM access. Send processed data back to the main thread via `postMessage` to update UI.",
          vi: "Worker chạy trên `self` và KHÔNG có quyền truy cập DOM. Hãy gửi kết quả đã xử lý về luồng chính qua `postMessage` để cập nhật UI."
        },
        explanation: {
          en: "The DOM is inherently not thread-safe. Direct concurrent manipulation from background threads would cause severe race conditions in browser layout engines.",
          vi: "Cây DOM không an toàn luồng (not thread-safe). Thao tác trực tiếp từ nhiều luồng nền sẽ làm hỏng bố cục trình duyệt."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Transfer ArrayBuffers instead of cloning when passing large datasets",
          vi: "Chuyển giao quyền sở hữu ArrayBuffer thay vì copy khi truyền dữ liệu lớn"
        },
        description: {
          en: "Transferable objects transfer memory pointers instantly in O(1) time without serializing large multi-megabyte binary structures.",
          vi: "Đối tượng Transferable chuyển quyền sở hữu bộ nhớ tức thì trong thời gian O(1) mà không tốn công clone dữ liệu hàng chục MB."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_26_1",
      title: {
        en: "Inline Web Worker from Blob Factory",
        vi: "Tạo Web Worker Động Trực Tiếp Từ Blob URL (Inline Worker)"
      },
      instruction: {
        en: "Write a function `createInlineWorker(workerFn)` that takes a function body `workerFn`, converts it into a string, creates a Blob URL, and returns a new `Worker`. Provide an `execute(data)` method returning a Promise that resolves with the worker's reply and auto-terminates.",
        vi: "Viết hàm `createInlineWorker(workerFn)` nhận vào hàm `workerFn`, chuyển nó thành chuỗi, tạo Blob URL và trả về một `Worker` mới. Cung cấp phương thức `execute(data)` trả về một Promise resolve kết quả trả về từ worker và tự động hủy worker."
      },
      starterCode: `function createInlineWorker(workerFn) {
  // Implement inline worker factory
}`,
      solutionCode: `function createInlineWorker(workerFn) {
  const code = \`self.onmessage = async (e) => {
    const fn = (\${workerFn.toString()});
    try {
      const res = await fn(e.data);
      self.postMessage({ success: true, result: res });
    } catch (err) {
      self.postMessage({ success: false, error: err.message });
    }
  };\`;

  const blob = new Blob([code], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);

  return {
    execute(data) {
      return new Promise((resolve, reject) => {
        worker.onmessage = (e) => {
          URL.revokeObjectURL(url);
          worker.terminate();
          if (e.data.success) {
            resolve(e.data.result);
          } else {
            reject(new Error(e.data.error));
          }
        };
        worker.onerror = (err) => {
          URL.revokeObjectURL(url);
          worker.terminate();
          reject(err);
        };
        worker.postMessage(data);
      });
    }
  };
}`,
      hints: [
        {
          en: "Create Blob with `application/javascript`, generate URL via `URL.createObjectURL(blob)`, instantiate `new Worker(url)`.",
          vi: "Tạo Blob với type `application/javascript`, sinh URL bằng `URL.createObjectURL(blob)`, khởi tạo `new Worker(url)`."
        }
      ]
    },
    {
      id: "js_ex_26_2",
      title: {
        en: "Thread-Safe Atomic Mutex Lock Simulation",
        vi: "Mô Phỏng Khóa Mutex An Toàn Đa Luồng Bằng Atomics"
      },
      instruction: {
        en: "Implement a mutex lock helper `createMutex(sharedInt32Array, index = 0)` with methods `lock()` and `unlock()` using `Atomics.compareExchange`, `Atomics.wait`, and `Atomics.notify` on an Int32Array view of a `SharedArrayBuffer`.",
        vi: "Cài đặt bộ khóa mutex `createMutex(sharedInt32Array, index = 0)` có các phương thức `lock()` và `unlock()` sử dụng `Atomics.compareExchange`, `Atomics.wait` và `Atomics.notify` trên một `SharedArrayBuffer`."
      },
      starterCode: `function createMutex(sharedInt32Array, index = 0) {
  // Implement atomic mutex lock
}`,
      solutionCode: `function createMutex(sharedInt32Array, index = 0) {
  const UNLOCKED = 0;
  const LOCKED = 1;

  return {
    lock() {
      while (true) {
        if (Atomics.compareExchange(sharedInt32Array, index, UNLOCKED, LOCKED) === UNLOCKED) {
          return; // Lock acquired!
        }
        // Wait until notified if lock is busy
        Atomics.wait(sharedInt32Array, index, LOCKED);
      }
    },
    unlock() {
      if (Atomics.compareExchange(sharedInt32Array, index, LOCKED, UNLOCKED) !== LOCKED) {
        throw new Error("Mutex was not locked by current thread");
      }
      Atomics.notify(sharedInt32Array, index, 1);
    }
  };
}`,
      hints: [
        {
          en: "In lock(): loop with Atomics.compareExchange and Atomics.wait. In unlock(): reset to UNLOCKED and call Atomics.notify.",
          vi: "Trong lock(): lặp với Atomics.compareExchange và Atomics.wait. Trong unlock(): gán về UNLOCKED và gọi Atomics.notify."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_26",
    title: {
      en: "Multithreaded Worker Thread Pool Manager",
      vi: "Bộ Quản Lý Bể Luồng Web Worker (Worker Thread Pool)"
    },
    description: {
      en: "Build a reusable `WorkerPool(workerScriptUrl, poolSize = navigator.hardwareConcurrency || 4)` that distributes compute tasks across an internal pool of active workers, queuing pending tasks when all threads are busy.",
      vi: "Xây dựng hệ thống bể luồng `WorkerPool(workerScriptUrl, poolSize = navigator.hardwareConcurrency || 4)` phân phối các tác vụ tính toán song song qua nhiều worker, tự động xếp hàng các task khi tất cả các luồng đang bận."
    },
    starterCode: `class WorkerPool {
  // Implement Worker Thread Pool
}`,
    solutionCode: `class WorkerPool {
  #workers = [];
  #queue = [];
  #idleWorkers = [];

  constructor(workerUrl, poolSize = 4) {
    this.workerUrl = workerUrl;
    this.poolSize = poolSize;

    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerUrl, { type: "module" });
      worker.id = i;
      this.#workers.push(worker);
      this.#idleWorkers.push(worker);
    }
  }

  runTask(payload, transferables = []) {
    return new Promise((resolve, reject) => {
      const task = { payload, transferables, resolve, reject };

      if (this.#idleWorkers.length > 0) {
        const worker = this.#idleWorkers.pop();
        this.#executeOnWorker(worker, task);
      } else {
        this.#queue.push(task);
      }
    });
  }

  #executeOnWorker(worker, task) {
    worker.onmessage = (e) => {
      task.resolve(e.data);
      this.#releaseWorker(worker);
    };
    worker.onerror = (err) => {
      task.reject(err);
      this.#releaseWorker(worker);
    };
    worker.postMessage(task.payload, task.transferables);
  }

  #releaseWorker(worker) {
    if (this.#queue.length > 0) {
      const nextTask = this.#queue.shift();
      this.#executeOnWorker(worker, nextTask);
    } else {
      this.#idleWorkers.push(worker);
    }
  }

  destroy() {
    this.#workers.forEach(w => w.terminate());
    this.#workers = [];
    this.#idleWorkers = [];
    this.#queue = [];
  }
}`,
    hints: [
      {
        en: "Maintain `#workers`, `#idleWorkers`, and `#queue`. When a worker finishes a task, check queue for next item before pushing back to idle list.",
        vi: "Duy trì `#workers`, `#idleWorkers` và `#queue`. Khi worker xong việc, lấy task từ queue ra chạy tiếp trước khi đẩy lại vào idle list."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_26_1",
      type: "single_choice",
      question: {
        en: "Why can't Web Workers directly modify DOM elements like `document.getElementById()`?",
        vi: "Tại sao Web Worker không thể thao tác trực tiếp với thẻ DOM như `document.getElementById()`?"
      },
      options: [
        { id: "a", text: { en: "The DOM is not thread-safe; concurrent access from multiple background threads would cause race conditions and corrupted browser UI states", vi: "Cây DOM không an toàn luồng (not thread-safe); việc can thiệp đồng thời từ nhiều luồng nền sẽ gây tranh chấp dữ liệu và làm hỏng trạng thái UI" } },
        { id: "b", text: { en: "Web Workers only run in Node.js", vi: "Web Worker chỉ chạy trong Node.js" } },
        { id: "c", text: { en: "HTML5 removed DOM support", vi: "HTML5 đã bỏ hỗ trợ DOM" } },
        { id: "d", text: { en: "Workers are limited to 1KB memory", vi: "Worker bị giới hạn bộ nhớ 1KB" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Browser layout engines mandate that DOM manipulation is restricted strictly to the single main UI thread.",
        vi: "Engine trình duyệt quy định mọi thao tác DOM chỉ được thực hiện trên một luồng chính (Main Thread) duy nhất."
      }
    },
    {
      id: "js_q_26_2",
      type: "predict_output",
      question: {
        en: "What happens to the sender's `ArrayBuffer` when transferred as a `Transferable` object in `postMessage(data, [buffer])`?",
        vi: "Điều gì xảy ra với `ArrayBuffer` ở bên gửi khi nó được chuyển dưới dạng đối tượng `Transferable` trong `postMessage(data, [buffer])`?"
      },
      options: [
        { id: "a", text: { en: "Ownership is transferred instantly (Zero-Copy) and the sender's buffer becomes neutered with byteLength === 0", vi: "Quyền sở hữu được chuyển giao tức thì (Zero-Copy) và buffer bên gửi bị vô hiệu hóa với byteLength === 0" } },
        { id: "b", text: { en: "A complete byte-by-byte duplicate is created in RAM", vi: "Một bản sao đầy đủ từng byte được nhân bản trong RAM" } },
        { id: "c", text: { en: "The buffer is deleted from both threads", vi: "Buffer bị xóa ở cả hai luồng" } },
        { id: "d", text: { en: "Throws a RangeError", vi: "Ném lỗi RangeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Transferable objects move the underlying memory reference without cloning, neutering the original buffer.",
        vi: "Transferable object chuyển trực tiếp con trỏ bộ nhớ thô mà không sao chép, làm rỗng buffer ở nguồn gửi."
      }
    },
    {
      id: "js_q_26_3",
      type: "single_choice",
      question: {
        en: "Which object allows multiple threads to read and write to the exact same shared memory buffer simultaneously?",
        vi: "Đối tượng nào cho phép nhiều luồng cùng đọc và ghi trực tiếp vào chung một vùng nhớ đệm đồng thời?"
      },
      options: [
        { id: "a", text: { en: "SharedArrayBuffer", vi: "SharedArrayBuffer" } },
        { id: "b", text: { en: "ArrayBuffer", vi: "ArrayBuffer" } },
        { id: "c", text: { en: "DataView", vi: "DataView" } },
        { id: "d", text: { en: "TypedArray", vi: "TypedArray" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`SharedArrayBuffer` provides shared memory accessible across multiple workers concurrently.",
        vi: "`SharedArrayBuffer` cung cấp vùng nhớ dùng chung có thể truy cập đồng thời từ nhiều worker."
      }
    },
    {
      id: "js_q_26_4",
      type: "predict_output",
      question: {
        en: "What is the purpose of the `Atomics` API in JavaScript?",
        vi: "Mục đích của API `Atomics` trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "To provide thread-safe atomic operations (add, load, store, wait, notify) on `SharedArrayBuffer` data, preventing race conditions", vi: "Cung cấp các phép toán nguyên tử an toàn đa luồng (add, load, store, wait, notify) trên `SharedArrayBuffer`, ngăn chặn tranh chấp dữ liệu" } },
        { id: "b", text: { en: "To split atomic particles in WebAssembly", vi: "Phân tách hạt nguyên tử trong WebAssembly" } },
        { id: "c", text: { en: "To compress CSS files", vi: "Nén các file CSS" } },
        { id: "d", text: { en: "To create UI buttons", vi: "Tạo các nút bấm giao diện" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Atomics` ensures memory operations on shared buffers execute uninterrupted and provides thread coordination.",
        vi: "`Atomics` đảm bảo các thao tác trên vùng nhớ dùng chung diễn ra nguyên tử, không bị ngắt quãng giữa các luồng."
      }
    },
    {
      id: "js_q_26_5",
      type: "single_choice",
      question: {
        en: "How do you immediately stop a running Web Worker from the main thread?",
        vi: "Làm thế nào để dừng ngay lập tức một Web Worker đang chạy từ luồng chính?"
      },
      options: [
        { id: "a", text: { en: "worker.terminate()", vi: "worker.terminate()" } },
        { id: "b", text: { en: "worker.stop()", vi: "worker.stop()" } },
        { id: "c", text: { en: "worker.kill()", vi: "worker.kill()" } },
        { id: "d", text: { en: "worker.close()", vi: "worker.close()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`worker.terminate()` forces the worker thread to shut down immediately from the host context.",
        vi: "`worker.terminate()` ép luồng worker dừng thực thi ngay lập tức từ luồng chủ."
      }
    },
    {
      id: "js_q_26_6",
      type: "predict_output",
      question: {
        en: "How does a Worker shut itself down from inside its own script?",
        vi: "Worker tự đóng chính nó từ bên trong script bằng lệnh nào?"
      },
      options: [
        { id: "a", text: { en: "self.close()", vi: "self.close()" } },
        { id: "b", text: { en: "self.terminate()", vi: "self.terminate()" } },
        { id: "c", text: { en: "process.exit()", vi: "process.exit()" } },
        { id: "d", text: { en: "window.destroy()", vi: "window.destroy()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`self.close()` allows a worker to cleanly shut down its own thread.",
        vi: "`self.close()` cho phép worker tự giải phóng luồng của chính mình."
      }
    },
    {
      id: "js_q_26_7",
      type: "fill_blank",
      question: {
        en: "To send a message from the main thread to a Web Worker, call worker._____(data).",
        vi: "Để gửi một thông điệp từ luồng chính tới Web Worker, gọi hàm worker._____(data)."
      },
      correctAnswer: "postMessage",
      explanation: {
        en: "`postMessage()` is the asynchronous message dispatch method for Web Workers.",
        vi: "`postMessage()` là phương thức gửi thông điệp bất đồng bộ tới Web Worker."
      }
    },
    {
      id: "js_q_26_8",
      type: "single_choice",
      question: {
        en: "Which HTTP response headers are strictly required by browsers to enable `SharedArrayBuffer` due to Spectre security mitigations?",
        vi: "Những HTTP Header nào bắt buộc phải có để trình duyệt cho phép sử dụng `SharedArrayBuffer` nhằm phòng chống lỗ hổng bảo mật Spectre?"
      },
      options: [
        { id: "a", text: { en: "`Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`", vi: "`Cross-Origin-Opener-Policy: same-origin` và `Cross-Origin-Embedder-Policy: require-corp`" } },
        { id: "b", text: { en: "`Access-Control-Allow-Origin: *` only", vi: "Chỉ cần `Access-Control-Allow-Origin: *`" } },
        { id: "c", text: { en: "`Content-Type: text/html`", vi: "`Content-Type: text/html`" } },
        { id: "d", text: { en: "`X-Frame-Options: DENY` only", vi: "Chỉ cần `X-Frame-Options: DENY`" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Cross-Origin Isolation (COOP + COEP headers) is mandatory for enabling SharedArrayBuffer security realms.",
        vi: "Cơ chế Cô lập Nguồn gốc Chéo (COOP + COEP) là bắt buộc để mở khóa SharedArrayBuffer."
      }
    },
    {
      id: "js_q_26_9",
      type: "predict_output",
      question: {
        en: "Can a Web Worker spawn another sub-worker (Nested Worker)?",
        vi: "Một Web Worker có thể tự khởi tạo thêm một worker con khác (Nested Worker) không?"
      },
      options: [
        { id: "a", text: { en: "Yes, modern browsers support spawning sub-workers from inside a worker context", vi: "Có, các trình duyệt hiện đại hỗ trợ khởi tạo worker con từ bên trong ngữ cảnh của một worker" } },
        { id: "b", text: { en: "No, workers cannot spawn workers", vi: "Không, worker không thể tạo worker" } },
        { id: "c", text: { en: "Only on Linux servers", vi: "Chỉ trên máy chủ Linux" } },
        { id: "d", text: { en: "Only with WebAssembly", vi: "Chỉ khi dùng WebAssembly" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Dedicated workers can create nested sub-workers to divide parallel work into fine-grained pipelines.",
        vi: "Dedicated Worker có thể tạo các sub-worker con lồng nhau để phân chia tác vụ xử lý song song."
      }
    },
    {
      id: "js_q_26_10",
      type: "code_reasoning",
      question: {
        en: "Why is `navigator.hardwareConcurrency` useful when sizing a Web Worker pool?",
        vi: "Tại sao `navigator.hardwareConcurrency` hữu ích khi xác định kích thước bể luồng (Worker Pool)?"
      },
      options: [
        { id: "a", text: { en: "It returns the number of logical CPU processor cores available, preventing thread over-subscription and CPU thrashing", vi: "Nó trả về số lượng nhân CPU logic hiện có của thiết bị, giúp tránh tình trạng tạo quá nhiều luồng gây nghẽn CPU" } },
        { id: "b", text: { en: "It measures internet download speed", vi: "Nó đo tốc độ tải mạng internet" } },
        { id: "c", text: { en: "It counts the number of open browser tabs", vi: "Nó đếm số lượng tab trình duyệt đang mở" } },
        { id: "d", text: { en: "It returns GPU memory size", vi: "Nó trả về dung lượng bộ nhớ GPU" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Matching worker count to logical core count maximizes parallel throughput without context-switching overhead.",
        vi: "Điều chỉnh số lượng worker khớp với số nhân CPU logic giúp tối đa hóa hiệu năng song song mà không tốn chi phí chuyển đổi ngữ cảnh."
      }
    }
  ]
};

// Write Lesson 25 and 26
fs.writeFileSync(path.join(dir, 'lesson25.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson25: Lesson = ${JSON.stringify(lesson25, null, 2)};\nexport default lesson25;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson26.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson26: Lesson = ${JSON.stringify(lesson26, null, 2)};\nexport default lesson26;\n`, 'utf8');
console.log('Lessons 25 and 26 generated.');
