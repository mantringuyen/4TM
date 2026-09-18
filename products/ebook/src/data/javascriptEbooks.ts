import { Book } from '../types';

export const JAVASCRIPT_EBOOKS: Book[] = [
  // 1. JavaScript Handbook
  {
    id: 'javascript-handbook',
    slug: 'javascript-handbook',
    title: 'JavaScript Handbook',
    subtitle: {
      en: 'V8 Engine Internals, Event Loop, Promises & ES6+ Core',
      vi: 'Kiến Trúc V8 Engine, Event Loop, Promises & Ngôn Ngữ ES6+ Cốt Lõi',
    },
    bookType: 'Handbook',
    categoryId: 'javascript',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '40 mins',
    chaptersCount: 3,
    publishedDate: '2025-02-10',
    accentColor: 'from-amber-500 to-yellow-700',
    tags: ['JavaScript', 'ES6+', 'V8 Engine', 'Event Loop', 'Promises'],
    description: {
      en: 'Comprehensive JavaScript reference manual: ECMAScript specification, execution contexts, call stack, V8 memory heap, event loop queue, and modern syntax.',
      vi: 'Cẩm nang tra cứu JavaScript toàn diện: tiêu chuẩn ECMAScript, ngữ cảnh thực thi (Execution Context), Call Stack, V8 Heap, Event Loop và cú pháp hiện đại.',
    },
    prerequisites: {
      en: ['Basic programming syntax knowledge'],
      vi: ['Kiến thức cú pháp lập trình cơ bản'],
    },
    outcomes: {
      en: ['Understand V8 engine memory allocation and call stack execution', 'Master microtask vs macrotask execution order in the Event Loop'],
      vi: ['Hiểu phân bổ bộ nhớ V8 Heap và thứ tự thực thi Call Stack', 'Làm chủ thứ tự chạy Microtask vs Macrotask trong Event Loop'],
    },
    chapters: [
      {
        id: 'js-hb-ch-1',
        number: 1,
        slug: 'v8-engine-and-call-stack',
        title: {
          en: 'V8 Architecture & Execution Contexts',
          vi: 'Kiến Trúc V8 Engine & Ngữ Cảnh Thực Thi Execution Context',
        },
        summary: {
          en: 'Memory Heap, Call Stack, Global Execution Context, and Lexical Environments.',
          vi: 'V8 Memory Heap, Call Stack, Execution Context toàn cục và Môi trường từ vựng.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'js-hb-1-1',
            title: {
              en: 'Creation Phase vs Execution Phase in V8',
              vi: 'Giai Đoạn Khởi Tạo (Creation) vs Thực Thi (Execution)',
            },
            content: {
              en: 'When a function is called or a script begins, V8 creates an Execution Context in two distinct passes: the Creation Phase (allocating memory for variables/hoisting) and the Execution Phase (evaluating assignment expressions line-by-line).\n\nDuring the Creation Phase, V8 creates the Global or Function Execution Context, instantiates the Lexical Environment, sets up the scope chain, and binds the `this` keyword. Function declarations are fully stored in memory, while `var` variables are hoisted with an initial value of `undefined`. Variables declared with `let` and `const` are also hoisted, but they enter the Temporal Dead Zone (TDZ) and cannot be accessed until their declaration statement executes.',
              vi: 'Khi một hàm được gọi hoặc kịch bản bắt đầu, V8 khởi tạo một Execution Context qua 2 giai đoạn riêng biệt: Giai đoạn Khởi tạo (Creation Phase - cấp phát ô nhớ cho biến/hoisting) và Giai đoạn Thực thi (Execution Phase - tính toán giá trị gán từng dòng).\n\nTrong Giai đoạn Khởi tạo, V8 tạo Global hoặc Function Execution Context, khởi tạo Lexical Environment, thiết lập chuỗi scope chain và xác định giá trị từ khóa `this`. Khai báo hàm (Function Declaration) được lưu trọn vẹn vào bộ nhớ, còn biến `var` được hoisted với giá trị ban đầu là `undefined`. Các biến khai báo bằng `let` và `const` cũng được hoisted, nhưng rơi vào Vùng Chết Thời Gian (TDZ) và không thể truy cập trước dòng khai báo.',
            },
            keyIdea: {
              en: 'V8 parses code before running it. In Creation Phase, functions are fully hoisted into memory, `var` is hoisted as `undefined`, and `let`/`const` enter the Temporal Dead Zone (TDZ).',
              vi: 'V8 quét mã nguồn trước khi thực thi. Trong Giai đoạn Khởi tạo, khai báo hàm được nạp trọn vẹn vào bộ nhớ, `var` nhận giá trị `undefined`, còn `let`/`const` rơi vào Temporal Dead Zone (TDZ).',
            },
            whenToUse: {
              en: 'Use function declarations or ES Modules when top-level hoisting is desirable. Use `const` and `let` inside block scopes to prevent unintended variable leakage or scope mutation bugs.',
              vi: 'Sử dụng khai báo hàm hoặc ES Modules khi cần hoisting mức toàn cục. Sử dụng `const` và `let` trong phạm vi khối để tránh lọt biến ngoài ý muốn.',
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Accessing a `let` or `const` variable before its line of declaration assuming it behaves like `var`.',
                  vi: 'Truy cập biến `let` hoặc `const` trước dòng khai báo vì tưởng nó hoạt động giống `var`.',
                },
                why: {
                  en: 'Unlike `var` which initializes as `undefined`, `let` and `const` remain uninitialized in the TDZ. Reading them throws a `ReferenceError`.',
                  vi: 'Khác với `var` được gán sẵn `undefined`, `let` và `const` nằm ở trạng thái chưa khởi tạo trong TDZ, gây ra lỗi `ReferenceError`.',
                },
                solution: {
                  en: 'Always declare variables at the top of their enclosing block or scope before reading them.',
                  vi: 'Luôn khai báo biến ở đầu phạm vi khối trước khi đọc giá trị của chúng.',
                },
              },
            ],
            comparisonTable: {
              headers: {
                en: ['Feature', 'var', 'let', 'const'],
                vi: ['Đặc Tính', 'var', 'let', 'const'],
              },
              rows: [
                {
                  feature: { en: 'Scope Level', vi: 'Phạm Vi Scope' },
                  optionA: { en: 'Function / Global Scope', vi: 'Function / Global Scope' },
                  optionB: { en: 'Block Scope ({...})', vi: 'Block Scope ({...})' },
                  optionC: { en: 'Block Scope ({...})', vi: 'Block Scope ({...})' },
                },
                {
                  feature: { en: 'Hoisting Behavior', vi: 'Hành Vi Hoisting' },
                  optionA: { en: 'Hoisted with undefined', vi: 'Hoisted gán undefined' },
                  optionB: { en: 'Hoisted into TDZ (ReferenceError)', vi: 'Hoisted vào TDZ (ReferenceError)' },
                  optionC: { en: 'Hoisted into TDZ (ReferenceError)', vi: 'Hoisted vào TDZ (ReferenceError)' },
                },
                {
                  feature: { en: 'Re-declaration', vi: 'Khai Báo Lại' },
                  optionA: { en: 'Allowed in same scope', vi: 'Cho phép cùng scope' },
                  optionB: { en: 'SyntaxError', vi: 'Lỗi SyntaxError' },
                  optionC: { en: 'SyntaxError', vi: 'Lỗi SyntaxError' },
                },
                {
                  feature: { en: 'Re-assignment', vi: 'Gán Lại Giá Trị' },
                  optionA: { en: 'Allowed', vi: 'Cho phép' },
                  optionB: { en: 'Allowed', vi: 'Cho phép' },
                  optionC: { en: 'TypeError (Re-assignment forbidden)', vi: 'Lỗi TypeError (Cấm gán lại)' },
                },
              ],
            },
            diagram: {
              title: {
                en: 'V8 Engine Code Execution Pipeline',
                vi: 'Quy Trình Thực Thi Mã Nguồn Trong V8 Engine',
              },
              steps: [
                {
                  stepNumber: 1,
                  title: { en: 'Parsing & AST', vi: 'Phân Tích & Tạo AST' },
                  description: {
                    en: 'V8 Scanner tokenizes raw JS code into Abstract Syntax Tree (AST) nodes.',
                    vi: 'V8 Scanner chuyển mã JS thô thành các node Cây Cú Pháp Trừu Tượng (AST).',
                  },
                },
                {
                  stepNumber: 2,
                  title: { en: 'Ignition Interpreter', vi: 'Thông Dịch Viên Ignition' },
                  description: {
                    en: 'Ignition generates bytecode and creates Execution Contexts (Creation Phase).',
                    vi: 'Ignition biên dịch AST thành bytecode và khởi tạo Execution Contexts (Creation Phase).',
                  },
                },
                {
                  stepNumber: 3,
                  title: { en: 'Turbofan JIT Compiler', vi: 'Trình Biên Dịch Turbofan JIT' },
                  description: {
                    en: 'Turbofan optimizes hot bytecode paths into machine-level binary code.',
                    vi: 'Turbofan tối ưu hóa các đoạn code chạy thường xuyên (hot paths) thành mã máy.',
                  },
                },
              ],
            },
            codeBlock: {
              language: 'javascript',
              filename: 'execution_context.js',
              code: `console.log(greet); // undefined (hoisted var)
var greet = "Hello 4TM";

sayHello(); // Works! (hoisted function declaration)
function sayHello() {
  console.log("Function hoisted fully!");
}

// console.log(counter); // Uncaught ReferenceError: Cannot access 'counter' before initialization
let counter = 10;`,
            },
            bestPractices: {
              en: [
                'Default to `const` for all variable bindings to communicate immutability intent.',
                'Use `let` strictly when variable value re-assignment is required (e.g. accumulator loops).',
                'Avoid `var` in modern JavaScript codebases to prevent scope bleeding and silent overwrites.',
              ],
              vi: [
                'Mặc định sử dụng `const` cho mọi biến để thể hiện rõ ý định bất biến.',
                'Chỉ dùng `let` khi thực sự cần gán lại giá trị biến (ví dụ: biến đếm vòng lặp).',
                'Bỏ hoàn toàn `var` trong dự án hiện đại để tránh rò rỉ scope và ghi đè âm thầm.',
              ],
            },
            practicalScenario: {
              title: {
                en: 'High-Concurrency Node.js Microservices',
                vi: 'Microservices Node.js Tải Cao',
              },
              description: {
                en: 'Understanding V8 execution contexts and lexical closures prevents memory leaks caused by lingering scope references in long-lived server callbacks.',
                vi: 'Hiểu rõ V8 execution context giúp phòng tránh rò rỉ bộ nhớ từ các tham chiếu scope tồn đọng trong callback của máy chủ server.',
              },
            },
            relatedConcepts: ['V8 Engine', 'Temporal Dead Zone', 'Scope Chain', 'Lexical Environment'],
            studyLink: {
              topicSlug: 'javascript',
              label: {
                en: 'Practice V8 & Scope questions in 4TM Study',
                vi: 'Luyện câu hỏi V8 & Scope trên 4TM Study',
              },
            },
          },
        ],
      },
      {
        id: 'js-hb-ch-2',
        number: 2,
        slug: 'event-loop-microtasks-macrotasks',
        title: {
          en: 'The Event Loop: Microtasks vs Macrotasks',
          vi: 'Event Loop: Hàng Đợi Microtasks vs Macrotasks',
        },
        summary: {
          en: 'Call Stack, Web APIs, Microtask Queue (Promises), and Task Queue (setTimeout).',
          vi: 'Call Stack, Web APIs, Microtask Queue (Promises) và Task Queue (setTimeout).',
        },
        readTimeMinutes: 14,
        sections: [
          {
            id: 'js-hb-2-1',
            title: {
              en: 'Microtask Queue Priority Over Task Queue',
              vi: 'Độ Ưu Tiên Của Microtask Queue So Với Macrotask Queue',
            },
            content: {
              en: 'After completing a Call Stack frame, the Event Loop flushes ALL pending microtasks (Promise reactions, queueMicrotask) BEFORE executing a single macrotask (setTimeout, setInterval).',
              vi: 'Sau khi Call Stack rỗng, Event Loop sẽ xả TOÀN BỘ microtask (Promise, queueMicrotask) TRƯỚC KHI lấy một macrotask (setTimeout).',
            },
          },
        ],
      },
      {
        id: 'js-hb-ch-3',
        number: 3,
        slug: 'async-await-and-promises',
        title: {
          en: 'Promises, Async/Await & Error Propagation',
          vi: 'Promises, Async/Await & Lan Truyền Lỗi Bất Đồng Bộ',
        },
        summary: {
          en: 'Promise states (Pending, Fulfilled, Rejected), Promise.all, Promise.allSettled, and async try/catch.',
          vi: 'Các trạng thái Promise, Promise.all, Promise.allSettled và try/catch bất đồng bộ.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'js-hb-3-1',
            title: {
              en: 'Parallel Execution with Promise.all vs Promise.allSettled',
              vi: 'Chạy Song Song Với Promise.all vs Promise.allSettled',
            },
            content: {
              en: '`Promise.all` short-circuits on the first rejection, whereas `Promise.allSettled` waits for all promises to resolve or reject, returning full execution status records.',
              vi: '`Promise.all` ngắt ngay khi có 1 promise lỗi, còn `Promise.allSettled` chờ tất cả hoàn thành để trả về kết quả từng task.',
            },
          },
        ],
      },
    ],
  },

  // 2. JavaScript Definitions
  {
    id: 'javascript-definitions',
    slug: 'javascript-definitions',
    title: 'JavaScript Definitions & Engine Terms',
    subtitle: {
      en: 'Runtime Glossary, Prototype Chain & Scope Definitions',
      vi: 'Từ Điển Runtime, Chuỗi Prototype Chain & Tra Cứu Khái Niệm JS',
    },
    bookType: 'Definitions',
    categoryId: 'javascript',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-12',
    accentColor: 'from-amber-600 to-yellow-800',
    tags: ['Definitions', 'Prototypes', 'Closures', 'Glossary'],
    description: {
      en: 'Clear definitions for core JavaScript runtime terms: Closures, Prototype Chain, Scope Chain, Hoisting, Temporal Dead Zone (TDZ), and Strict Equality.',
      vi: 'Từ điển định nghĩa gọn gàng các thuật ngữ JavaScript: Closure, Chuỗi Prototype, Scope Chain, Hoisting, Vùng chết thời gian (TDZ) và Phép so sánh bằng nghiêm ngặt.',
    },
    prerequisites: {
      en: ['Basic JavaScript coding experience'],
      vi: ['Kinh nghiệm lập trình JavaScript cơ bản'],
    },
    outcomes: {
      en: ['Define Closures and Prototype inheritance mechanics clearly'],
      vi: ['Định nghĩa chính xác cơ chế Closure và kế thừa Prototype'],
    },
    chapters: [
      {
        id: 'js-def-ch-1',
        number: 1,
        slug: 'scope-closures-tdz-definitions',
        title: {
          en: 'Closures, Lexical Scope & TDZ Definitions',
          vi: 'Định Nghĩa Closure, Lexical Scope & TDZ',
        },
        summary: {
          en: 'Lexical Environment, Closure state retention, and Temporal Dead Zone (TDZ).',
          vi: 'Môi trường Lexical, Giữ trạng thái Closure và Vùng chết thời gian TDZ.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'js-def-1-1',
            title: {
              en: 'Closure Definition',
              vi: 'Định Nghĩa Closure Trong JavaScript',
            },
            content: {
              en: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment), allowing inner functions to access outer variables after the outer scope closes.',
              vi: 'Closure là sự kết hợp giữa một hàm và tham chiếu đến môi trường từ vựng bao quanh nó, cho phép hàm con truy cập biến của hàm cha ngay cả khi hàm cha đã chạy xong.',
            },
          },
        ],
      },
      {
        id: 'js-def-ch-2',
        number: 2,
        slug: 'prototypes-and-this-keyword',
        title: {
          en: 'Prototype Chain & "this" Binding Rules',
          vi: 'Chuỗi Prototype & Quy Tắc Binding Của Từ Khóa "this"',
        },
        summary: {
          en: '[[Prototype]] link, __proto__, prototype property, Default/Implicit/Explicit/New binding.',
          vi: 'Liên kết [[Prototype]], thuộc tính prototype, Binding Mặc định/Ngầm định/Tường minh/New.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'js-def-2-1',
            title: {
              en: 'The 4 Rules of "this" Keyword Binding',
              vi: '4 Quy Tắc Xác Định Giá Trị Của Từ Khóa "this"',
            },
            content: {
              en: '`this` value depends on invocation site: 1. Default (global/undefined), 2. Implicit (object context), 3. Explicit (call/apply/bind), 4. New binding (constructor functions).',
              vi: 'Giá trị `this` do vị trí gọi hàm quyết định: 1. Mặc định, 2. Ngầm định qua object, 3. Tường minh (call/apply/bind), 4. Constructor (từ khóa new).',
            },
          },
        ],
      },
    ],
  },

  // 3. JavaScript Practical Guide
  {
    id: 'javascript-practical-guide',
    slug: 'javascript-practical-guide',
    title: 'Async JavaScript & Fetch API Guide',
    subtitle: {
      en: 'Step-by-Step Practical Guide to HTTP Client Streaming & AbortControllers',
      vi: 'Hướng Dẫn Thực Hành Từng Bước Gọi API Async & Hủy Truy Cập Với AbortController',
    },
    bookType: 'Practical Guides',
    categoryId: 'javascript',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-amber-500 to-yellow-800',
    tags: ['Fetch API', 'Async', 'AbortController', 'HTTP', 'Guide'],
    description: {
      en: 'A step-by-step practical guide to performing asynchronous HTTP requests, handling network retry loops, parsing JSON streams, and cancelling requests with AbortSignal.',
      vi: 'Hướng dẫn thực hành từng bước xử lý truy vấn HTTP bất đồng bộ, tự động thử lại khi mất mạng, parse luồng JSON và hủy request với AbortSignal.',
    },
    prerequisites: {
      en: ['Understanding of Promises and async/await'],
      vi: ['Hiểu biết về Promise và cú pháp async/await'],
    },
    outcomes: {
      en: ['Cancel stale HTTP requests gracefully using AbortController', 'Implement retry backoff loops for network requests'],
      vi: ['Hủy các request HTTP hết hạn an toàn với AbortController', 'Hiện thực cơ chế thử lại có giãn cách thời gian khi mất mạng'],
    },
    chapters: [
      {
        id: 'jpg-ch-1',
        number: 1,
        slug: 'fetch-api-and-response-handling',
        title: {
          en: 'Fetch API, Status Checks & Stream Reading',
          vi: 'Fetch API, Kiểm Tra Status & Đọc Stream',
        },
        summary: {
          en: 'Checking res.ok, error handling, headers, and parsing ReadableStream.',
          vi: 'Kiểm tra res.ok, xử lý lỗi, đọc headers và parse ReadableStream.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'jpg-1-1',
            title: {
              en: 'Why fetch() Does Not Reject on HTTP 404 or 500',
              vi: 'Tại Sao fetch() Không Tự Catch Lỗi Khi Gặp HTTP 404 hay 500',
            },
            content: {
              en: '`fetch()` only rejects on network failures. Always check `if (!response.ok)` to handle HTTP 4xx and 5xx error statuses explicitly.',
              vi: 'Hàm `fetch()` chỉ ngắt văng error khi mất mạng. Luôn phải kiểm tra `if (!response.ok)` để bắt các lỗi HTTP 4xx và 5xx.',
            },
            codeBlock: {
              language: 'javascript',
              filename: 'safe_fetch.js',
              code: `async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(\`HTTP Error: \${res.status} \${res.statusText}\`);
  }
  return await res.json();
}`,
            },
          },
        ],
      },
      {
        id: 'jpg-ch-2',
        number: 2,
        slug: 'abort-controller-cancellation',
        title: {
          en: 'Cancelling Requests with AbortController',
          vi: 'Hủy Request HTTP Với AbortController & AbortSignal',
        },
        summary: {
          en: 'Preventing race conditions and memory leaks when switching UI views.',
          vi: 'Chống race condition và rò rỉ bộ nhớ khi người dùng chuyển trang.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'jpg-2-1',
            title: {
              en: 'Passing AbortSignal to fetch()',
              vi: 'Truyền AbortSignal Vào Hàm fetch()',
            },
            content: {
              en: 'Create an instance of `AbortController`, pass `controller.signal` to `fetch()`, and call `controller.abort()` when the user navigates away.',
              vi: 'Khởi tạo đối tượng `AbortController`, truyền `controller.signal` vào `fetch()` và gọi `controller.abort()` khi chuyển tab.',
            },
          },
        ],
      },
    ],
  },

  // 4. JavaScript Common Errors
  {
    id: 'javascript-common-errors',
    slug: 'javascript-common-errors',
    title: 'JavaScript Common Errors & Async Bugs',
    subtitle: {
      en: 'Uncaught TypeError, Silent Mutation & Unhandled Rejections',
      vi: 'Lỗi Uncaught TypeError, Biến Đổi Dữ Liệu Âm Thầm & Unhandled Rejection',
    },
    bookType: 'Common Errors',
    categoryId: 'javascript',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-01-22',
    accentColor: 'from-amber-600 to-rose-700',
    tags: ['Debugging', 'TypeError', 'Async Bugs', 'Common Errors'],
    description: {
      en: 'Troubleshooting frequent JavaScript bugs: Cannot read properties of undefined, implicit type coercion pitfalls, floating point precision bugs, and unhandled promise rejections.',
      vi: 'Sửa các lỗi JavaScript thường gặp: Cannot read properties of undefined, ép kiểu ngầm định nguy hiểm, lỗi làm tròn số thực và Unhandled Promise Rejection.',
    },
    prerequisites: {
      en: ['Basic JavaScript syntax'],
      vi: ['Hiểu biết cú pháp JavaScript cơ bản'],
    },
    outcomes: {
      en: ['Prevent undefined runtime crashes with Optional Chaining (?.) and Nullish Coalescing (??)', 'Avoid floating point arithmetic precision errors'],
      vi: ['Phòng tránh văng ứng dụng bằng Optional Chaining (?.) và Nullish Coalescing (??)', 'Sửa lỗi sai số tính toán số thực Floating Point'],
    },
    chapters: [
      {
        id: 'jce-ch-1',
        number: 1,
        slug: 'cannot-read-property-undefined',
        title: {
          en: 'Properties of Undefined & Safe Navigation',
          vi: 'Lỗi Đọc Thuộc Tính Của Undefined & Cú Pháp An Toàn',
        },
        summary: {
          en: 'Fixing Cannot read properties of undefined with ?. and ?? operators.',
          vi: 'Khắc phục lỗi văng trang với toán tử ?. và ??.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'jce-1-1',
            title: {
              en: 'Optional Chaining (?.) vs Nullish Coalescing (??)',
              vi: 'Phân Biệt Optional Chaining (?.) Và Nullish Coalescing (??)',
            },
            content: {
              en: '`?.` short-circuits to `undefined` if target is nullish. `??` provides default values strictly for `null` and `undefined` (unlike `||` which catches 0 and empty string).',
              vi: '`?.` trả về `undefined` nếu vắng mặt giá trị. `??` gán giá trị mặc định chỉ khi bị `null` hoặc `undefined` (khác với `||` vô tình bắt cả số 0 và chuỗi rỗng).',
            },
            codeBlock: {
              language: 'javascript',
              filename: 'nullish.js',
              code: `const count = 0;
const result1 = count || 10; // 10 (BUG: 0 is falsy!)
const result2 = count ?? 10; // 0 (CORRECT: 0 is not nullish)`,
            },
          },
        ],
      },
      {
        id: 'jce-ch-2',
        number: 2,
        slug: 'floating-point-coercion-gotchas',
        title: {
          en: 'Floating Point Arithmetic & Type Coercion',
          vi: 'Sai Số Floating Point & Ép Kiểu Ngầm Định',
        },
        summary: {
          en: 'Why 0.1 + 0.2 !== 0.3 and implicit + string concatenation pitfalls.',
          vi: 'Tại sao 0.1 + 0.2 !== 0.3 và cạm bẫy cộng chuỗi ngầm định với dấu +.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'jce-2-1',
            title: {
              en: 'IEEE 754 Floating Point Precision Fixes',
              vi: 'Sửa Lỗi Sai Số IEEE 754 Bằng Number.EPSILON hoặc Cents',
            },
            content: {
              en: 'Store monetary balances in integer cents rather than floats to eliminate IEEE 754 binary floating-point rounding inaccuracies.',
              vi: 'Lưu trữ tiền tệ dưới dạng số nguyên xu (cents) thay vì số thực float để triệt tiêu hoàn toàn sai số làm tròn nhị phân.',
            },
          },
        ],
      },
    ],
  },

  // 5. JavaScript Best Practices
  {
    id: 'javascript-best-practices',
    slug: 'javascript-best-practices',
    title: 'Modern ES6+ Best Practices',
    subtitle: {
      en: 'Immutability, Functional Methods, Modules & Clean Architecture',
      vi: 'Tính Bất Biến, Hàm Functional, ES Modules & Kiến Trúc Sạch',
    },
    bookType: 'Best Practices',
    categoryId: 'javascript',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-01',
    accentColor: 'from-amber-600 to-yellow-900',
    tags: ['ES6+', 'Immutability', 'Clean Code', 'Best Practices'],
    description: {
      en: 'Standards for writing clean modern JavaScript: preferring const/let over var, immutable array transformations (map, filter, reduce), structured ES Modules, and avoiding global state pollution.',
      vi: 'Tiêu chuẩn viết code JavaScript hiện đại: dùng const/let thay var, biến đổi mảng bất biến (map, filter, reduce), cấu trúc ES Modules và tránh làm bẩn global state.',
    },
    prerequisites: {
      en: ['Experience writing JavaScript applications'],
      vi: ['Kinh nghiệm lập trình ứng dụng JavaScript'],
    },
    outcomes: {
      en: ['Master pure array methods (map, filter, reduce, flatMap) without side effects', 'Organize clean ES Module imports'],
      vi: ['Làm chủ các hàm biến đổi mảng thuần khiết không tạo side-effect', 'Tổ chức import ES Module gọn gàng'],
    },
    chapters: [
      {
        id: 'jbp-ch-1',
        number: 1,
        slug: 'immutable-array-transformations',
        title: {
          en: 'Immutable Array Transformations (map, filter, reduce)',
          vi: 'Biến Đổi Mảng Bất Biến Với map, filter, reduce',
        },
        summary: {
          en: 'Avoiding push/splice mutations; leveraging pure array functions.',
          vi: 'Tránh biến đổi trực tiếp bằng push/splice; tận dụng hàm mảng thuần khiết.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'jbp-1-1',
            title: {
              en: 'Pure Array Mapping & Filtering',
              vi: 'Hàm Biến Đổi Mảng Pure Function',
            },
            content: {
              en: 'Pure array operations return brand new instances instead of mutating original arrays in place, making state changes predictable and React-friendly.',
              vi: 'Các hàm mảng pure function trả về mảng hoàn toàn mới thay vì sửa mảng ban đầu, giúp việc quản lý trạng thái trở nên an toàn.',
            },
          },
        ],
      },
      {
        id: 'jbp-ch-2',
        number: 2,
        slug: 'es-modules-and-clean-imports',
        title: {
          en: 'ES Modules & Code Decoupling',
          vi: 'Hệ Thống ES Modules & Tách Biệt Mã Nguồn',
        },
        summary: {
          en: 'Named exports vs default exports, tree-shaking, and cyclic dependency prevention.',
          vi: 'Named export vs default export, cơ chế tree-shaking và phòng tránh phụ thuộc vòng.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'jbp-2-1',
            title: {
              en: 'Preferring Explicit Named Exports for Tree-Shaking',
              vi: 'Ưu Tiên Named Export Để Tối Ưu Tree-Shaking',
            },
            content: {
              en: 'Named exports enable bundlers (Vite, Webpack) to perform dead-code elimination (tree-shaking) far more reliably than default exports.',
              vi: 'Named export cho phép các công cụ build (Vite, Webpack) loại bỏ code thừa không dùng (tree-shaking) hiệu quả hơn default export.',
            },
          },
        ],
      },
    ],
  },

  // 6. JavaScript Patterns / Recipes
  {
    id: 'javascript-patterns',
    slug: 'javascript-patterns',
    title: 'JavaScript Design Patterns & Recipes',
    subtitle: {
      en: 'Module Pattern, Factory, Pub/Sub & Debounce/Throttle Recipes',
      vi: 'Module Pattern, Factory, Mẫu Pub/Sub & Công Thức Debounce/Throttle',
    },
    bookType: 'Patterns / Recipes',
    categoryId: 'javascript',
    subjectId: 'programming',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-18',
    accentColor: 'from-amber-600 to-amber-900',
    tags: ['Patterns', 'Debounce', 'Throttle', 'PubSub', 'Recipes'],
    description: {
      en: 'A collection of essential JavaScript design patterns and formulas: Debounce, Throttle, Publisher/Subscriber Event Emitter, Singleton, and Factory functions.',
      vi: 'Bộ công thức và mẫu thiết kế JavaScript hữu ích: Debounce, Throttle, Hệ thống sự kiện Pub/Sub, Singleton và Factory functions.',
    },
    prerequisites: {
      en: ['Understanding of closures and event callbacks'],
      vi: ['Hiểu về closure và hàm callback sự kiện'],
    },
    outcomes: {
      en: ['Implement custom debounce and throttle helper functions from scratch', 'Build lightweight Event Emitter Pub/Sub messaging buses'],
      vi: ['Tự viết hàm hỗ trợ Debounce và Throttle từ đầu', 'Xây dựng kênh truyền tin Event Emitter Pub/Sub mượt mà'],
    },
    chapters: [
      {
        id: 'jpat-ch-1',
        number: 1,
        slug: 'debounce-and-throttle-recipes',
        title: {
          en: 'Debounce & Throttle Helper Recipes',
          vi: 'Công Thức Viết Hàm Debounce & Throttle',
        },
        summary: {
          en: 'Rate-limiting high-frequency DOM events (scroll, resize, search input).',
          vi: 'Tiết chế tần suất sự kiện DOM dồn dập (scroll, resize, gõ ô tìm kiếm).',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'jpat-1-1',
            title: {
              en: 'Custom Debounce Implementation',
              vi: 'Tự Viết Hàm Debounce Nhẹ Nhàng',
            },
            content: {
              en: 'Debounce delays function invocation until a specified silent period has elapsed since the last trigger event.',
              vi: 'Debounce hoãn việc gọi hàm cho đến khi hết khoảng thời gian im lặng chỉ định kể từ lần kích hoạt cuối cùng.',
            },
            codeBlock: {
              language: 'javascript',
              filename: 'debounce.js',
              code: `function debounce(fn, delayMs) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}`,
            },
          },
        ],
      },
      {
        id: 'jpat-ch-2',
        number: 2,
        slug: 'pub-sub-event-emitter',
        title: {
          en: 'Publisher/Subscriber (Pub/Sub) Pattern',
          vi: 'Mẫu Thiết Kế Publisher/Subscriber (Pub/Sub)',
        },
        summary: {
          en: 'Decoupling component communication with a custom EventEmitter bus.',
          vi: 'Tách biệt giao tiếp giữa các component bằng kênh EventEmitter tự chế.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'jpat-2-1',
            title: {
              en: 'Building an In-Memory Event Bus',
              vi: 'Xây Dựng Kênh Event Bus Trong Bộ Nhớ',
            },
            content: {
              en: 'Implement `on(event, cb)`, `off(event, cb)`, and `emit(event, data)` methods on a simple class to enable decoupled event-driven communication.',
              vi: 'Hiện thực các phương thức `on(event, cb)`, `off(event, cb)` và `emit(event, data)` trên một lớp đơn giản để gửi nhận sự kiện linh hoạt.',
            },
          },
        ],
      },
    ],
  },
];
