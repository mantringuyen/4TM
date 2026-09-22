import { Book } from '../../types';

export const JAVASCRIPT_HANDBOOK_BOOK: Book = {
  id: 'javascript-handbook',
  slug: 'javascript-handbook',
  title: 'JavaScript Handbook',
  subtitle: {
    en: 'V8 Engine Architecture, Lexical Environments, Event Loop & Modern Asynchronous Systems',
    vi: 'Kiến Trúc Engine V8, Môi Trường Từ Vựng, Event Loop & Hệ Thống Bất Đồng Bộ Hiện Đại'
  },
  bookType: 'Handbook',
  categoryId: 'javascript',
  subjectId: 'programming',
  author: '4TM Editorial Board',
  role: 'JavaScript Core Architecture & Runtime Systems Group',
  level: 'Comprehensive',
  estimatedReadTime: '45 mins',
  chaptersCount: 4,
  publishedDate: '2025-02-20',
  accentColor: 'from-amber-500 to-yellow-700',
  tags: [
    'Handbook',
    'JavaScript',
    'V8 Engine',
    'Event Loop',
    'Async',
    'Promises',
    'Closures',
    'Prototypes'
  ],
  description: {
    en: 'An authoritative, comprehensive handbook covering the internal mechanics of the V8 JavaScript engine, execution context lifecycles, closure memory retention, prototype hidden classes, the event loop task queues, and concurrent async orchestration.',
    vi: 'Cẩm nang toàn diện và chuẩn mực về cơ chế hoạt động bên trong của engine JavaScript V8, vòng đời ngữ cảnh thực thi, quản lý bộ nhớ closure, hidden class của prototype, các hàng đợi task trong event loop và điều phối bất đồng bộ hiện đại.'
  },
  prerequisites: {
    en: [
      'Fundamental JavaScript syntax (variables, functions, loops, objects)',
      'Basic experience writing client-side browser or server-side Node.js applications'
    ],
    vi: [
      'Cú pháp JavaScript cơ bản (biến, hàm, vòng lặp, đối tượng)',
      'Kinh nghiệm cơ bản trong lập trình web frontend hoặc ứng dụng backend với Node.js'
    ]
  },
  outcomes: {
    en: [
      'Master the internal phases of the V8 engine: Ignition bytecode generation, TurboFan compilation, and execution context creation',
      'Understand how lexical environments and heap-allocated closure scopes interact with garbage collection',
      'Analyze the exact execution order of the Event Loop across macrotasks, microtasks, and UI rendering opportunities',
      'Deploy concurrent async patterns confidently using Promise combinators (all, allSettled, race, any)'
    ],
    vi: [
      'Làm chủ các giai đoạn nội bộ của engine V8: sinh bytecode Ignition, tối ưu hóa TurboFan và khởi tạo ngữ cảnh thực thi',
      'Hiểu rõ cơ chế tương tác giữa môi trường từ vựng, phạm vi closure trên heap và bộ thu gom rác (garbage collection)',
      'Phân tích chính xác thứ tự thực thi của Event Loop qua macrotask, microtask và cơ hội render giao diện',
      'Vận dụng thành thạo các mẫu bất đồng bộ đồng thời với các hàm kết hợp Promise (all, allSettled, race, any)'
    ]
  },
  parts: [
    {
      partNumber: 1,
      romanNumeral: 'I',
      title: {
        en: 'Engine Architecture & Execution Contexts',
        vi: 'Kiến Trúc Engine & Ngữ Cảnh Thực Thi'
      },
      description: {
        en: 'The internal mechanics of V8, memory allocation, execution contexts, and closure scope chains.',
        vi: 'Cơ chế nội bộ của V8, cấp phát bộ nhớ, ngữ cảnh thực thi và chuỗi phạm vi closure.'
      }
    },
    {
      partNumber: 2,
      romanNumeral: 'II',
      title: {
        en: 'Concurrency, Event Loop & Asynchronous Runtimes',
        vi: 'Xử Lý Đồng Thời, Event Loop & Môi Trường Bất Đồng Bộ'
      },
      description: {
        en: 'The event-driven concurrency model, microtask priority, and Promise orchestration patterns.',
        vi: 'Mô hình xử lý đồng thời hướng sự kiện, thứ tự ưu tiên microtask và các mẫu điều phối Promise.'
      }
    }
  ],
  chapters: [
    {
      id: 'js-hb-ch-1',
      number: 1,
      slug: 'v8-architecture-execution-contexts',
      title: {
        en: 'V8 Architecture & Execution Contexts',
        vi: 'Kiến Trúc V8 & Ngữ Cảnh Thực Thi'
      },
      summary: {
        en: 'The physical lifecycle of JavaScript execution: parsing, Ignition bytecode, creation and execution phases, and lexical environments.',
        vi: 'Vòng đời vật lý của quá trình thực thi JavaScript: phân tích cú pháp, sinh bytecode Ignition, các pha tạo lập/thực thi và môi trường từ vựng.'
      },
      readTimeMinutes: 12,
      chapterSummary: {
        mentalModels: {
          en: [
            'Execution Contexts as Stack Frames: Each function invocation pushes an Execution Context onto the Call Stack containing its VariableEnvironment and LexicalEnvironment.',
            'Closures as Heap References: Closures are not magic stack retentions; they are heap-allocated Environment Records that remain referenced when outer functions return.'
          ],
          vi: [
            'Ngữ Cảnh Thực Thi Như Khung Ngăn Xếp: Mỗi lần gọi hàm sẽ đẩy một Execution Context lên Call Stack chứa VariableEnvironment và LexicalEnvironment.',
            'Closure Là Tham Chiếu Trên Heap: Closure không phải là việc giữ lại ngăn xếp; chúng là các bản ghi môi trường được cấp phát trên heap và duy trì tham chiếu khi hàm ngoài kết thúc.'
          ]
        },
        rules: {
          en: [
            'Variables declared with `let` and `const` are hoisted to the top of their block scope but remain uninitialized in the Temporal Dead Zone (TDZ).',
            'Function declarations are fully hoisted and initialized with their function object during the Creation Phase.'
          ],
          vi: [
            'Biến khai báo bằng `let` và `const` được hoist lên đầu block scope nhưng chưa được khởi tạo và nằm trong Temporal Dead Zone (TDZ).',
            'Khai báo hàm (Function Declaration) được hoist toàn phần và khởi tạo sẵn đối tượng hàm trong Pha Tạo Lập.'
          ]
        },
        commonTraps: {
          en: [
            'Accessing a `let` or `const` variable before its lexical binding statement throws a ReferenceError due to the TDZ.',
            'Assuming `var` variables have block scope: `var` attaches exclusively to the nearest function scope or global object.'
          ],
          vi: [
            'Truy cập biến `let` hoặc `const` trước dòng khai báo sẽ ném lỗi ReferenceError do rơi vào TDZ.',
            'Nhầm tưởng `var` có phạm vi khối: `var` chỉ gắn liền với phạm vi hàm gần nhất hoặc đối tượng toàn cục.'
          ]
        },
        takeaway: {
          en: 'Understanding the Creation Phase vs Execution Phase demystifies hoisting, TDZ, and closure memory models across modern JavaScript runtimes.',
          vi: 'Hiểu rõ Pha Tạo Lập so với Pha Thực Thi giúp làm sáng tỏ cơ chế hoisting, TDZ và mô hình bộ nhớ của closure trong các runtime JavaScript hiện đại.'
        }
      },
      selfReview: [
        {
          question: {
            en: 'Why does accessing a `let` variable before its declaration throw a ReferenceError, while `var` returns `undefined`?',
            vi: 'Tại sao việc truy cập biến `let` trước dòng khai báo lại ném lỗi ReferenceError, trong khi `var` lại trả về `undefined`?'
          },
          hint: {
            en: 'Think about how the V8 engine initializes memory in the Creation Phase vs the Temporal Dead Zone.',
            vi: 'Hãy nghĩ về cách engine V8 khởi tạo vùng nhớ trong Pha Tạo Lập và khái niệm Temporal Dead Zone.'
          },
          answer: {
            en: 'During the Creation Phase, `var` variables are registered and immediately initialized with `undefined`. Variables declared with `let` and `const` are registered in the Lexical Environment, but their initialization is deferred until their declaration statement is physically executed during the Execution Phase. The interval between entering the block and reaching the declaration is the Temporal Dead Zone (TDZ).',
            vi: 'Trong Pha Tạo Lập, biến `var` được đăng ký và khởi tạo ngay giá trị `undefined`. Biến khai báo bằng `let` và `const` cũng được đăng ký trong Lexical Environment nhưng việc khởi tạo bị hoãn lại cho đến khi dòng khai báo thực sự được thực thi trong Pha Thực Thi. Khoảng thời gian từ khi vào khối lệnh đến khi gặp dòng khai báo được gọi là Temporal Dead Zone (TDZ).'
          }
        }
      ],
      sections: [
        {
          id: 'js-hb-1-1',
          title: {
            en: 'Call Stack, Memory Heap & Execution Context Lifecycle',
            vi: 'Call Stack, Memory Heap & Vòng Đời Ngữ Cảnh Thực Thi'
          },
          content: {
            en: 'JavaScript is a single-threaded runtime utilizing a Call Stack for LIFO function execution and a Memory Heap for unstructured object and closure allocations. When JavaScript code executes, the V8 engine evaluates code in two distinct phases: the Creation Phase and the Execution Phase.\n\nDuring the Creation Phase, the engine creates the Global Execution Context, sets up the Global Object (`window` in browsers, `global` in Node.js), binds the `this` keyword, and creates a memory space for variables and function declarations. Function declarations are hoisted with their complete function bodies. Variables declared with `var` are allocated and initialized to `undefined`. However, variables declared with `let` and `const` are allocated in the Lexical Environment without an initial value, placing them in the Temporal Dead Zone (TDZ) until code execution reaches their explicit binding line.',
            vi: 'JavaScript là một môi trường thực thi đơn luồng sử dụng Call Stack để thực thi hàm theo cơ chế LIFO và Memory Heap để cấp phát bộ nhớ phi cấu trúc cho các đối tượng và closure. Khi mã JavaScript chạy, engine V8 xử lý qua hai pha hoàn toàn tách biệt: Pha Tạo Lập (Creation Phase) và Pha Thực Thi (Execution Phase).\n\nTrong Pha Tạo Lập, engine khởi tạo Global Execution Context, thiết lập Global Object (`window` trong trình duyệt, `global` trong Node.js), gán từ khóa `this` và cấp phát bộ nhớ cho các khai báo biến và hàm. Khai báo hàm được hoist toàn bộ thân hàm. Biến khai báo bằng `var` được cấp phát và gán ngay giá trị `undefined`. Tuy nhiên, biến khai báo bằng `let` và `const` được cấp phát trong Lexical Environment nhưng không gán giá trị khởi tạo, khiến chúng rơi vào Temporal Dead Zone (TDZ) cho đến khi câu lệnh gán thực sự được duyệt tới.'
          },
          keyIdea: {
            en: 'The Creation Phase sets up identifiers and scopes; the Execution Phase runs bytecodes line by line. Variables in the TDZ exist in memory but cannot be accessed until their declaration statement executes.',
            vi: 'Pha Tạo Lập thiết lập danh định và phạm vi; Pha Thực Thi chạy từng dòng bytecode. Biến trong TDZ đã tồn tại trong bộ nhớ nhưng không được phép truy cập cho đến khi gặp dòng khai báo.'
          },
          comparisonTable: {
            headers: [
              { en: 'Feature', vi: 'Tính Năng' },
              { en: 'var', vi: 'var' },
              { en: 'let', vi: 'let' },
              { en: 'const', vi: 'const' }
            ],
            rows: [
              {
                en: ['Scope', 'Function Scope', 'Block Scope', 'Block Scope'],
                vi: ['Phạm vi', 'Function Scope', 'Block Scope', 'Block Scope']
              },
              {
                en: ['Hoisting', 'Hoisted & Initialized to undefined', 'Hoisted but in TDZ (uninitialized)', 'Hoisted but in TDZ (uninitialized)'],
                vi: ['Hoisting', 'Được hoist & khởi tạo undefined', 'Được hoist nhưng nằm trong TDZ', 'Được hoist nhưng nằm trong TDZ']
              },
              {
                en: ['Reassignment', 'Allowed', 'Allowed', 'Forbidden (TypeError)'],
                vi: ['Gán lại giá trị', 'Cho phép', 'Cho phép', 'Không cho phép (TypeError)']
              },
              {
                en: ['Global Property', 'Attaches to window/global', 'Does not attach to global object', 'Does not attach to global object'],
                vi: ['Thuộc tính toàn cục', 'Tự gắn vào window/global', 'Không gắn vào đối tượng toàn cục', 'Không gắn vào đối tượng toàn cục']
              }
            ]
          },
          diagram: {
            title: {
              en: 'V8 Engine Code Compilation & Execution Pipeline',
              vi: 'Quy Trình Biên Dịch & Thực Thi Mã Nguồn Trong Engine V8'
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'Parsing & AST', vi: 'Phân Tích Cú Pháp & Cây AST' },
                description: {
                  en: 'V8 parses JavaScript source text into an Abstract Syntax Tree (AST) and validates grammar.',
                  vi: 'V8 phân tích văn bản mã nguồn thành Cây Cú Pháp Trừu Tượng (AST) và kiểm tra ngữ pháp.'
                }
              },
              {
                stepNumber: 2,
                title: { en: 'Ignition Bytecode Generation', vi: 'Sinh Bytecode Qua Ignition' },
                description: {
                  en: 'The Ignition interpreter converts the AST into concise bytecode and allocates execution contexts.',
                  vi: 'Trình thông dịch Ignition chuyển đổi cây AST thành bytecode gọn nhẹ và cấp phát ngữ cảnh thực thi.'
                }
              },
              {
                stepNumber: 3,
                title: { en: 'TurboFan JIT Optimization', vi: 'Tối Ưu Hóa JIT Qua TurboFan' },
                description: {
                  en: 'Frequently executed "hot" functions are profiled and compiled by TurboFan into optimized native machine code.',
                  vi: 'Các hàm thường xuyên thực thi ("hot functions") được thu thập profiling và biên dịch thành mã máy tối ưu.'
                }
              }
            ]
          },
          codeBlock: {
            language: 'javascript',
            filename: 'execution_context_tdz.js',
            code: '// 1. var hoisting demonstration:\nconsole.log(varVariable); // Output: undefined (Creation phase initialized)\nvar varVariable = 100;\n\n// 2. let and the Temporal Dead Zone (TDZ):\n{\n  // TDZ begins at entry of block\n  // console.log(letVariable); // ReferenceError: Cannot access \'letVariable\' before initialization\n  let letVariable = 200;      // TDZ ends here\n  console.log(letVariable);    // Output: 200\n}'
          }
        },
        {
          id: 'js-hb-1-2',
          title: {
            en: 'Lexical Environments, Scope Chains & Closures Under the Hood',
            vi: 'Môi Trường Từ Vựng, Chuỗi Phạm Vi & Bản Chất Closure'
          },
          content: {
            en: 'A Lexical Environment consists of an Environment Record (which maps identifiers to values) and a reference to an outer Lexical Environment (`[[OuterEnv]]`). When a function resolves an identifier, the JavaScript engine first inspects the local environment. If the identifier is absent, it walks up the scope chain via `[[OuterEnv]]` until reaching the Global Environment.\n\nA closure is formed whenever an inner function retains a reference to its enclosing lexical environment, even after the outer function has completed execution and its stack frame has been popped from the Call Stack. In modern engines, variables captured by inner functions are preserved on the Memory Heap within an Environment Record object. While closures enable powerful patterns such as data encapsulation and factories, capturing unneeded large variables can result in memory retention leaks.',
            vi: 'Môi trường từ vựng (Lexical Environment) bao gồm một Environment Record (ánh xạ tên danh định với giá trị) và một tham chiếu trỏ đến môi trường từ vựng bên ngoài (`[[OuterEnv]]`). Khi một hàm tìm kiếm biến, engine JavaScript sẽ tra cứu trước trong môi trường cục bộ. Nếu không có, nó sẽ duyệt ngược lên chuỗi phạm vi (scope chain) qua `[[OuterEnv]]` cho tới khi chạm đến Global Environment.\n\nMột closure được hình thành bất cứ khi nào một hàm bên trong giữ tham chiếu đến môi trường từ vựng bao bọc nó, ngay cả khi hàm bên ngoài đã hoàn thành thực thi và khung ngăn xếp của nó đã bị đẩy khỏi Call Stack. Trong các engine hiện đại, các biến được hàm con nắm giữ sẽ được bảo lưu trên Memory Heap bên trong đối tượng Environment Record. Dù closure mang lại các mẫu thiết kế mạnh mẽ như đóng gói dữ liệu và factory function, việc vô tình giữ tham chiếu đến các đối tượng lớn có thể dẫn đến rò rỉ bộ nhớ.'
          },
          codeBlock: {
            language: 'javascript',
            filename: 'closures_and_memory.js',
            code: 'function createCounter(initialValue) {\n  // initialValue is stored on the heap in this function\'s Environment Record\n  let count = initialValue;\n  \n  return {\n    increment() {\n      count += 1;\n      return count;\n    },\n    decrement() {\n      count -= 1;\n      return count;\n    },\n    get current() {\n      return count;\n    }\n  };\n}\n\nconst counter = createCounter(10);\nconsole.log(counter.increment()); // 11\nconsole.log(counter.increment()); // 12\n// The variable "count" cannot be directly accessed or modified from outside!'
          }
        }
      ]
    },
    {
      id: 'js-hb-ch-2',
      number: 2,
      slug: 'objects-prototypes-modern-inheritance',
      title: {
        en: 'Objects, Prototypes & Modern Inheritance',
        vi: 'Đối Tượng, Prototype & Kế Thừa Hiện Đại'
      },
      summary: {
        en: 'Prototype chain mechanics, V8 hidden classes (shapes), and ES6+ class semantics with private field brand checks.',
        vi: 'Cơ chế chuỗi prototype, hidden class (shapes) trong V8 và ngữ nghĩa class ES6+ với trường private.'
      },
      readTimeMinutes: 10,
      sections: [
        {
          id: 'js-hb-2-1',
          title: {
            en: 'Prototype Chain Traversal & V8 Hidden Classes (Shapes)',
            vi: 'Duyệt Chuỗi Prototype & Hidden Classes (Shapes) Trong V8'
          },
          content: {
            en: 'Every JavaScript object maintains an internal link to another object called its prototype (`[[Prototype]]`, accessible via `Object.getPrototypeOf()`). When accessing a property `obj.prop`, if the property is not found on `obj` directly, the engine traverses up the prototype chain until finding the key or terminating at `null` (the prototype of `Object.prototype`).\n\nUnder the hood, dynamic languages like JavaScript do not have fixed compile-time memory offsets. To achieve near C++ execution speeds, V8 creates internal "Hidden Classes" (also called Shapes or Maps). When objects share the same property names added in the identical order, they share a Shape. This allows V8 to generate Monomorphic Inline Caches (IC) for property lookups. Mutating object shapes dynamically (e.g., adding properties out of order or deleting properties with `delete`) causes polymorphic transitions that deoptimize hot code paths.',
            vi: 'Mọi đối tượng JavaScript đều duy trì một liên kết nội bộ đến một đối tượng khác gọi là prototype (`[[Prototype]]`, truy cập qua `Object.getPrototypeOf()`). Khi truy cập thuộc tính `obj.prop`, nếu thuộc tính không có trực tiếp trên `obj`, engine sẽ duyệt ngược lên chuỗi prototype cho đến khi tìm thấy khóa hoặc dừng lại ở `null` (prototype của `Object.prototype`).\n\nBên dưới hệ thống, các ngôn ngữ động như JavaScript không có độ lệch bộ nhớ cố định từ lúc biên dịch. Để đạt tốc độ xử lý gần tương đương C++, V8 tạo ra các "Hidden Classes" nội bộ (còn gọi là Shapes hoặc Maps). Khi các đối tượng có cùng thuộc tính được thêm vào theo đúng thứ tự, chúng sẽ dùng chung một Shape. Điều này giúp V8 tạo ra các Monomorphic Inline Cache (IC) để tra cứu thuộc tính siêu tốc. Việc thay đổi cấu trúc đối tượng tùy tiện (như thêm thuộc tính sai thứ tự hoặc xóa bằng `delete`) sẽ gây ra chuyển đổi polymorphic làm mất tối ưu hóa mã nguồn.'
          },
          codeBlock: {
            language: 'javascript',
            filename: 'prototypes_and_shapes.js',
            code: '// 1. Prototype inheritance chain:\nconst animal = {\n  speak() {\n    return `${this.name} makes a sound.`;\n  }\n};\n\nconst dog = Object.create(animal);\ndog.name = "Rex";\nconsole.log(dog.speak()); // "Rex makes a sound." (resolved via prototype)\n\n// 2. V8 Hidden Classes (Shapes) best practice:\n// GOOD: Identical property order shares the same Shape\nfunction createPoint(x, y) {\n  return { x, y };\n}\nconst p1 = createPoint(1, 2);\nconst p2 = createPoint(3, 4); // p1 and p2 share the exact same V8 Shape!'
          }
        }
      ]
    },
    {
      id: 'js-hb-ch-3',
      number: 3,
      slug: 'event-loop-concurrency-model',
      title: {
        en: 'The Event Loop & Concurrency Model',
        vi: 'Event Loop & Mô Hình Xử Lý Đồng Thời'
      },
      summary: {
        en: 'Microtask vs macrotask execution order, UI rendering opportunities, and browser vs Node.js runtime architectures.',
        vi: 'Thứ tự thực thi giữa microtask và macrotask, cơ hội render UI và sự khác biệt kiến trúc giữa trình duyệt và Node.js.'
      },
      readTimeMinutes: 12,
      chapterSummary: {
        mentalModels: {
          en: [
            'Microtask Queue as VIP Priority: The Microtask Queue must be completely emptied until empty before the Event Loop can process a single Macrotask or render UI frames.',
            'Event Loop as a Carousel: The Event Loop continually inspects if the Call Stack is empty before rotating to pick up pending queues.'
          ],
          vi: [
            'Hàng Đợi Microtask Như Lối Đi VIP: Toàn bộ Microtask Queue phải được xả sạch hoàn toàn trước khi Event Loop có thể xử lý một Macrotask tiếp theo hoặc render khung hình UI.',
            'Event Loop Như Vòng Quay Ngựa Gỗ: Event Loop liên tục kiểm tra xem Call Stack đã rỗng chưa trước khi quay để nạp các hàng đợi đang chờ.'
          ]
        },
        rules: {
          en: [
            'Promises, `queueMicrotask()`, and `MutationObserver` callbacks are scheduled in the Microtask Queue.',
            '`setTimeout`, `setInterval`, `setImmediate`, and I/O callbacks are scheduled in the Macrotask (Task) Queue.'
          ],
          vi: [
            'Promise, `queueMicrotask()` và `MutationObserver` được lên lịch trong Microtask Queue.',
            '`setTimeout`, `setInterval`, `setImmediate` và I/O callbacks được lên lịch trong Macrotask Queue.'
          ]
        },
        commonTraps: {
          en: [
            'Recursive microtask scheduling (e.g., chained Promise loops) starves the event loop, completely freezing UI rendering and macrotask execution.',
            'Assuming `setTimeout(fn, 0)` executes immediately: it merely schedules `fn` into the macrotask queue behind all pending synchronous work and microtasks.'
          ],
          vi: [
            'Lên lịch microtask đệ quy vô hạn sẽ làm nghẽn toàn bộ event loop, khiến giao diện người dùng bị đóng băng và macrotask không thể chạy.',
            'Lầm tưởng `setTimeout(fn, 0)` chạy ngay lập tức: nó chỉ xếp hàm vào hàng đợi macrotask đứng sau mọi mã đồng bộ và microtask.'
          ]
        },
        takeaway: {
          en: 'Mastering the Microtask vs Macrotask lifecycle ensures non-blocking UI responsiveness and predictable asynchronous timing.',
          vi: 'Làm chủ vòng đời Microtask và Macrotask giúp đảm bảo giao diện luôn phản hồi mượt mà và thứ tự thực thi bất đồng bộ luôn chuẩn xác.'
        }
      },
      selfReview: [
        {
          question: {
            en: 'In what exact order will the following execute: synchronous console.log, setTimeout(..., 0), and Promise.resolve().then(...) ?',
            vi: 'Thứ tự thực thi chính xác của các lệnh sau là gì: console.log đồng bộ, setTimeout(..., 0), và Promise.resolve().then(...) ?'
          },
          hint: {
            en: 'Consider the Call Stack drain, the Microtask Queue drain, and the Macrotask Queue dispatch.',
            vi: 'Hãy xem xét thứ tự: dọn sạch Call Stack, xả sạch Microtask Queue và lấy tác vụ từ Macrotask Queue.'
          },
          answer: {
            en: '1. Synchronous console.log executes immediately on the Call Stack. 2. Promise.resolve().then(...) callback executes next because the Microtask Queue is drained immediately once the Call Stack empties. 3. setTimeout callback executes last because it resides in the Macrotask Queue.',
            vi: '1. console.log đồng bộ chạy đầu tiên trên Call Stack. 2. Callback của Promise.resolve().then(...) chạy tiếp theo vì Microtask Queue được xả sạch ngay khi Call Stack trống. 3. Callback của setTimeout chạy cuối cùng vì nó nằm trong hàng đợi Macrotask.'
          }
        }
      ],
      sections: [
        {
          id: 'js-hb-3-1',
          title: {
            en: 'Macrotasks vs Microtasks & Event Loop Ordering Mechanics',
            vi: 'Macrotask vs Microtask & Cơ Chế Sắp Xếp Thứ Tự Của Event Loop'
          },
          content: {
            en: 'The JavaScript Event Loop is the concurrency coordinator that enables non-blocking asynchronous operations within a single execution thread. The runtime categorizes asynchronous callbacks into two distinct queues: the Macrotask Queue (or Task Queue) and the Microtask Queue.\n\nThe execution tick operates with strict deterministic rules:\n1. Synchronous code runs to completion on the Call Stack.\n2. When the Call Stack becomes empty, the engine immediately inspects the Microtask Queue.\n3. ALL pending microtasks are executed in FIFO order. If a microtask schedules another microtask, that new microtask is also executed during the same drain cycle.\n4. Once the Microtask Queue is completely empty, the browser evaluates whether a rendering update (style recalculation, layout, paint) is required.\n5. Finally, exactly ONE macrotask is dequeued and pushed onto the Call Stack to begin the cycle anew.',
            vi: 'Event Loop trong JavaScript là bộ điều phối xử lý đồng thời giúp các thao tác bất đồng bộ không gây nghẽn (non-blocking) trên một luồng thực thi đơn. Môi trường thực thi phân loại các hàm callback bất đồng bộ vào hai hàng đợi riêng biệt: Hàng Đợi Macrotask (Task Queue) và Hàng Đợi Microtask.\n\nMỗi vòng lặp (tick) hoạt động theo các quy tắc xác định nghiêm ngặt:\n1. Mã đồng bộ chạy đến khi hoàn tất trên Call Stack.\n2. Khi Call Stack rỗng, engine lập tức kiểm tra Hàng Đợi Microtask.\n3. TOÀN BỘ microtask đang chờ được thực thi theo thứ tự FIFO. Nếu một microtask lại lên lịch thêm một microtask khác, microtask mới đó cũng được chạy ngay trong cùng lượt xả hàng đợi này.\n4. Khi Hàng Đợi Microtask đã trống hoàn toàn, trình duyệt sẽ đánh giá xem có cần thực hiện cập nhật hiển thị (render, tính toán lại layout, vẽ) hay không.\n5. Cuối cùng, đúng MỘT macrotask được lấy ra khỏi hàng đợi và đẩy lên Call Stack để bắt đầu một vòng lặp mới.'
          },
          diagram: {
            title: {
              en: 'Event Loop Tick Lifecycle',
              vi: 'Vòng Đời Hoạt Động Của Một Nhịp Event Loop'
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'Execute Call Stack', vi: 'Thực Thi Call Stack' },
                description: {
                  en: 'Run synchronous JavaScript code until the Call Stack is completely clear.',
                  vi: 'Chạy toàn bộ mã JavaScript đồng bộ cho đến khi Call Stack hoàn toàn rỗng.'
                }
              },
              {
                stepNumber: 2,
                title: { en: 'Drain Microtask Queue', vi: 'Xả Sạch Hàng Đợi Microtask' },
                description: {
                  en: 'Process all pending Promises, queueMicrotask callbacks until queue count is zero.',
                  vi: 'Xử lý toàn bộ các Promise, callback từ queueMicrotask cho đến khi số lượng về 0.'
                }
              },
              {
                stepNumber: 3,
                title: { en: 'Rendering Opportunity', vi: 'Cơ Hội Vẽ Giao Diện (Render)' },
                description: {
                  en: 'In browsers, run requestAnimationFrame, style calculations, and layout paints if due.',
                  vi: 'Trong trình duyệt, thực thi requestAnimationFrame, tính toán lại CSS và vẽ lại màn hình.'
                }
              },
              {
                stepNumber: 4,
                title: { en: 'Dequeue One Macrotask', vi: 'Lấy Một Macrotask Ra Chạy' },
                description: {
                  en: 'Take the next timer or I/O callback from the Macrotask Queue and push onto the Call Stack.',
                  vi: 'Lấy đúng một callback bộ đếm giờ hoặc I/O tiếp theo từ Macrotask Queue đưa lên Call Stack.'
                }
              }
            ]
          },
          codeBlock: {
            language: 'javascript',
            filename: 'event_loop_demonstration.js',
            code: 'console.log("1. Synchronous Start");\n\nsetTimeout(() => {\n  console.log("4. Macrotask (setTimeout)");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log("2. Microtask 1 (Promise)");\n}).then(() => {\n  console.log("3. Microtask 2 (Chained Promise)");\n});\n\nconsole.log("1b. Synchronous End");\n\n// Output Order:\n// 1. Synchronous Start\n// 1b. Synchronous End\n// 2. Microtask 1 (Promise)\n// 3. Microtask 2 (Chained Promise)\n// 4. Macrotask (setTimeout)'
          }
        },
        {
          id: 'js-hb-3-2',
          title: {
            en: 'Node.js vs Browser Event Loop Architecture Discrepancies',
            vi: 'Sự Khác Biệt Kiến Trúc Event Loop Giữa Node.js & Trình Duyệt'
          },
          content: {
            en: 'While modern browsers adhere to the HTML5 Event Loop specification, Node.js implements its event loop via the underlying C-based `libuv` library. The libuv event loop is divided into distinct operational phases:\n\n1. **Timers Phase**: Executes callbacks scheduled by `setTimeout` and `setInterval`.\n2. **Pending Callbacks Phase**: Executes I/O callbacks deferred to the next loop iteration.\n3. **Idle/Prepare Phase**: Used internally by libuv.\n4. **Poll Phase**: Retrieves new I/O events and blocks if no timers are ready.\n5. **Check Phase**: Executes callbacks scheduled specifically by `setImmediate()`.\n6. **Close Callbacks Phase**: Executes close handlers (e.g., `socket.on(\'close\')`).\n\nFurthermore, Node.js provides `process.nextTick()`, which does not belong to libuv. Callbacks registered with `process.nextTick()` run in an ultra-high priority NextTickQueue that drains even before standard Promise microtasks.',
            vi: 'Trong khi trình duyệt tuân thủ đặc tả Event Loop của chuẩn HTML5, Node.js triển khai event loop thông qua thư viện nền tảng C mang tên `libuv`. Event loop của libuv được chia thành các pha hoạt động riêng biệt:\n\n1. **Pha Timers**: Chạy các callback được lên lịch bởi `setTimeout` và `setInterval`.\n2. **Pha Pending Callbacks**: Thực thi các callback I/O bị hoãn lại từ vòng lặp trước.\n3. **Pha Idle/Prepare**: Được sử dụng nội bộ bởi libuv.\n4. **Pha Poll**: Nhận các sự kiện I/O mới và dừng chờ nếu chưa có timer nào đến hạn.\n5. **Pha Check**: Chạy các callback được lên lịch riêng bằng `setImmediate()`.\n6. **Pha Close Callbacks**: Thực thi các hàm xử lý đóng kết nối (ví dụ: `socket.on(\'close\')`).\n\nBên cạnh đó, Node.js cung cấp hàm `process.nextTick()`, hàm này không thuộc về libuv. Các callback đăng ký qua `process.nextTick()` sẽ nằm trong NextTickQueue có độ ưu tiên tối cao, được xả sạch trước cả các microtask Promise thông thường.'
          },
          codeBlock: {
            language: 'javascript',
            filename: 'nodejs_nexttick_immediate.js',
            code: '// Node.js specific concurrency demonstration:\nsetImmediate(() => {\n  console.log("Check Phase: setImmediate callback");\n});\n\nprocess.nextTick(() => {\n  console.log("NextTick Queue: Highest priority microtask!");\n});\n\nPromise.resolve().then(() => {\n  console.log("Promise Microtask: Runs after nextTick queue");\n});\n\n// Output in Node.js:\n// NextTick Queue: Highest priority microtask!\n// Promise Microtask: Runs after nextTick queue\n// Check Phase: setImmediate callback'
          }
        }
      ]
    },
    {
      id: 'js-hb-ch-4',
      number: 4,
      slug: 'asynchronous-orchestration-promises',
      title: {
        en: 'Asynchronous Orchestration: Promises & Async/Await',
        vi: 'Điều Phối Bất Đồng Bộ: Promises & Async/Await'
      },
      summary: {
        en: 'Promise state machine transitions, unhandled rejection monitoring, and concurrent combinators (all, allSettled, race, any).',
        vi: 'Chuyển đổi trạng thái máy Promise, giám sát lỗi unhandled rejection và các hàm kết hợp đồng thời (all, allSettled, race, any).'
      },
      readTimeMinutes: 11,
      sections: [
        {
          id: 'js-hb-4-1',
          title: {
            en: 'Promise State Machine, Chaining & Unhandled Rejections',
            vi: 'Máy Trạng Thái Promise, Kỹ Thuật Nối Chuỗi & Bắt Lỗi Unhandled Rejection'
          },
          content: {
            en: 'A Promise is a formal state machine representing the eventual completion or failure of an asynchronous operation. Internally, a Promise maintains two essential hidden slots: `[[PromiseState]]` (which transitions monotonically from `"pending"` to either `"fulfilled"` or `"rejected"`) and `[[PromiseResult]]` (storing the resolved value or rejection reason).\n\nOnce a Promise settles, its state becomes immutable; further calls to `resolve` or `reject` are silently ignored. Chaining via `.then(onFulfilled, onRejected)` returns a new Promise, enabling elegant sequential composition without callback nesting. In modern runtimes, unhandled rejections emit global telemetry events (`unhandledrejection` in browsers, `process.on(\'unhandledRejection\')` in Node.js) and will terminate Node.js processes in production by default.',
            vi: 'Promise là một máy trạng thái chính thức đại diện cho sự hoàn thành hoặc thất bại trong tương lai của một thao tác bất đồng bộ. Bên trong, một Promise duy trì hai trường ẩn quan trọng: `[[PromiseState]]` (chuyển đổi đơn chiều từ `"pending"` sang `"fulfilled"` hoặc `"rejected"`) và `[[PromiseResult]]` (lưu trữ giá trị trả về hoặc lý do từ chối).\n\nMột khi Promise đã chuyển sang trạng thái settled, trạng thái của nó trở thành bất biến; các lệnh gọi `resolve` hay `reject` tiếp theo đều bị bỏ qua. Việc nối chuỗi qua `.then(onFulfilled, onRejected)` sẽ trả về một đối tượng Promise hoàn toàn mới, giúp lập trình viên ghép các thao tác tuần tự mà không bị lồng callback. Trong các runtime hiện đại, lỗi rejection không được bắt sẽ kích hoạt sự kiện giám sát toàn cục (`unhandledrejection` trong trình duyệt, `process.on(\'unhandledRejection\')` trong Node.js) và mặc định sẽ dừng tiến trình Node.js trên production.'
          },
          codeBlock: {
            language: 'javascript',
            filename: 'promise_state_machine.js',
            code: 'function fetchUserData(userId) {\n  return new Promise((resolve, reject) => {\n    if (!userId) {\n      reject(new Error("Missing required userId"));\n      return;\n    }\n    setTimeout(() => {\n      resolve({ id: userId, username: "dev_alex" });\n    }, 100);\n  });\n}\n\n// Chaining and error handling pattern:\nfetchUserData(42)\n  .then(user => {\n    console.log("Fetched user:", user.username);\n    return user.id;\n  })\n  .catch(err => {\n    console.error("Pipeline failure:", err.message);\n  });'
          }
        },
        {
          id: 'js-hb-4-2',
          title: {
            en: 'Concurrent Combinators: Promise.all vs allSettled vs race vs any',
            vi: 'Các Hàm Kết Hợp Đồng Thời: Promise.all vs allSettled vs race vs any'
          },
          content: {
            en: 'When dispatching multiple independent asynchronous tasks concurrently, JavaScript provides four specialized combinator methods:\n\n1. `Promise.all`: Fails fast. Resolves when all promises fulfill; rejects immediately upon the first rejection.\n2. `Promise.allSettled`: Resilient auditing. Always waits for all promises to settle, returning an array of `{ status: "fulfilled", value }` or `{ status: "rejected", reason }` descriptors.\n3. `Promise.race`: Settle competitive. Resolves or rejects as soon as the very first promise settles (useful for timeouts).\n4. `Promise.any`: First success. Resolves as soon as the first promise fulfills; rejects with an `AggregateError` only if all promises reject.',
            vi: 'Khi thực hiện nhiều tác vụ bất đồng bộ độc lập cùng lúc, JavaScript cung cấp bốn hàm kết hợp chuyên biệt:\n\n1. `Promise.all`: Cơ chế Fail-fast. Hoàn thành khi tất cả các promise thành công; báo lỗi ngay lập tức khi có promise đầu tiên thất bại.\n2. `Promise.allSettled`: Kiểm toán toàn diện. Luôn chờ tất cả các promise kết thúc, trả về mảng chứa kết quả `{ status: "fulfilled", value }` hoặc `{ status: "rejected", reason }`.\n3. `Promise.race`: Đua tốc độ. Trả về kết quả hoặc lỗi ngay khi promise đầu tiên hoàn tất (rất hữu ích để cài đặt timeout).\n4. `Promise.any`: Thành công đầu tiên. Hoàn thành ngay khi có promise đầu tiên thành công; chỉ báo lỗi với `AggregateError` khi toàn bộ các promise đều thất bại.'
          },
          codeBlock: {
            language: 'javascript',
            filename: 'promise_combinators.js',
            code: 'const task1 = Promise.resolve("Fast Data");\nconst task2 = new Promise(resolve => setTimeout(() => resolve("Slow Data"), 50));\nconst taskFailed = Promise.reject(new Error("Network Drop"));\n\n// 1. Promise.allSettled: Never throws, gives full inspection:\nPromise.allSettled([task1, taskFailed, task2])\n  .then(results => {\n    results.forEach((res, i) => {\n      if (res.status === "fulfilled") {\n        console.log(`Task ${i} succeeded:`, res.value);\n      } else {\n        console.warn(`Task ${i} failed:`, res.reason.message);\n      }\n    });\n  });'
          }
        }
      ]
    }
  ],
  glossary: [
    {
      term: 'Call Stack',
      vietnameseTerm: 'Ngăn Xếp Thực Thi (Call Stack)',
      definition: {
        en: 'The Last-In-First-Out (LIFO) stack data structure that records function invocation execution contexts.',
        vi: 'Cấu trúc dữ liệu ngăn xếp vào sau ra trước (LIFO) dùng để theo dõi các ngữ cảnh thực thi khi gọi hàm.'
      }
    },
    {
      term: 'Memory Heap',
      vietnameseTerm: 'Vùng Nhớ Heap',
      definition: {
        en: 'The large unorganized region of memory allocated for storing objects, closures, and reference types.',
        vi: 'Vùng nhớ lớn phi cấu trúc được cấp phát để lưu trữ các đối tượng, closure và các kiểu tham chiếu.'
      }
    },
    {
      term: 'Execution Context',
      vietnameseTerm: 'Ngữ Cảnh Thực Thi (Execution Context)',
      definition: {
        en: 'The internal abstract environment in which JavaScript code is evaluated and executed, containing LexicalEnvironment, VariableEnvironment, and this binding.',
        vi: 'Môi trường trừu tượng nội bộ nơi mã JavaScript được đánh giá và thực thi, bao gồm LexicalEnvironment, VariableEnvironment và liên kết this.'
      }
    },
    {
      term: 'Temporal Dead Zone (TDZ)',
      vietnameseTerm: 'Vùng Chết Tạm Thời (TDZ)',
      definition: {
        en: 'The execution window between entering a block scope and the physical evaluation of a let or const declaration during which accessing the variable throws a ReferenceError.',
        vi: 'Khoảng thời gian từ khi bước vào một block scope cho đến khi lệnh khai báo let hoặc const thực sự được chạy, trong đó việc truy cập biến sẽ ném lỗi ReferenceError.'
      }
    },
    {
      term: 'Closure',
      vietnameseTerm: 'Bao Đóng (Closure)',
      definition: {
        en: 'The combination of a function bundled together with references to its surrounding lexical environment (the scope chain).',
        vi: 'Sự kết hợp giữa một hàm và các tham chiếu đến môi trường từ vựng bao bọc nó (chuỗi phạm vi).'
      }
    },
    {
      term: 'Event Loop',
      vietnameseTerm: 'Vòng Lặp Sự Kiện (Event Loop)',
      definition: {
        en: 'The runtime mechanism that constantly checks whether the Call Stack is empty and coordinates the execution of microtasks, rendering, and macrotasks.',
        vi: 'Cơ chế thời gian chạy liên tục kiểm tra Call Stack và điều phối việc thực thi giữa microtask, render giao diện và macrotask.'
      }
    },
    {
      term: 'Microtask Queue',
      vietnameseTerm: 'Hàng Đợi Microtask',
      definition: {
        en: 'The high-priority FIFO queue drained completely after the call stack empties and before macrotasks, holding Promise callbacks and queueMicrotask.',
        vi: 'Hàng đợi FIFO có độ ưu tiên cao, được xả sạch hoàn toàn ngay sau khi Call Stack trống và trước macrotask, chứa các callback Promise và queueMicrotask.'
      }
    },
    {
      term: 'Hidden Class (Shape)',
      vietnameseTerm: 'Lớp Ẩn / Hình Dạng Đối Tượng (Shape)',
      definition: {
        en: 'An internal V8 data structure representing object layout and property memory offsets to enable monomorphic inline caching.',
        vi: 'Cấu trúc dữ liệu nội bộ của V8 đại diện cho bố cục đối tượng và độ lệch bộ nhớ để hỗ trợ cơ chế cache inline monomorphic.'
      }
    },
    {
      term: 'Promise',
      vietnameseTerm: 'Đối Tượng Promise',
      definition: {
        en: 'A state machine object representing the eventual completion (fulfillment) or failure (rejection) of an asynchronous operation.',
        vi: 'Đối tượng máy trạng thái đại diện cho sự thành công hoặc thất bại trong tương lai của một tác vụ bất đồng bộ.'
      }
    },
    {
      term: 'Prototype',
      vietnameseTerm: 'Nguyên Mẫu (Prototype)',
      definition: {
        en: 'An internal link through which JavaScript objects inherit properties and methods from other objects.',
        vi: 'Liên kết nội bộ mà qua đó các đối tượng JavaScript kế thừa thuộc tính và phương thức từ đối tượng khác.'
      }
    }
  ],
  furtherReading: [
    {
      title: 'ECMAScript Language Specification (ECMA-262)',
      description: {
        en: 'The official standard defining JavaScript language semantics, execution contexts, and grammar.',
        vi: 'Tiêu chuẩn kỹ thuật chính thức định nghĩa ngữ nghĩa ngôn ngữ, ngữ cảnh thực thi và ngữ pháp JavaScript.'
      },
      url: 'https://tc39.es/ecma262/'
    },
    {
      title: 'V8 Engine Architectural Documentation',
      description: {
        en: 'Deep-dive architectural posts on Ignition bytecode interpreter and TurboFan compiler optimizations.',
        vi: 'Các bài viết phân tích chuyên sâu về trình thông dịch bytecode Ignition và trình tối ưu hóa TurboFan.'
      },
      url: 'https://v8.dev/blog'
    },
    {
      title: 'MDN Web Docs: JavaScript Concurrency Model & Event Loop',
      description: {
        en: 'Comprehensive reference for task queues, microtasks, and browser runtime timing.',
        vi: 'Tài liệu tham khảo toàn diện về hàng đợi task, microtask và cơ chế thời gian trong trình duyệt.'
      },
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop'
    },
    {
      title: 'You Don\'t Know JS Yet: Scope & Closures (Kyle Simpson)',
      description: {
        en: 'Authoritative analysis of lexical scope, function closures, and hoisting mechanics.',
        vi: 'Tài liệu phân tích kinh điển về phạm vi từ vựng, closure và cơ chế hoisting trong JavaScript.'
      },
      url: 'https://github.com/getify/You-Dont-Know-JS'
    }
  ]
};
