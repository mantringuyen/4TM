import { Lesson } from '../../../../types';

export const lesson01: Lesson = {
  "id": "js_lesson_1",
  "courseId": "javascript",
  "levelId": "basic",
  "moduleId": "js_mod_1",
  "order": 1,
  "title": {
    "en": "JavaScript Execution, Console & Syntax Fundamentals",
    "vi": "Cơ Chế Thực Thi JavaScript, Console & Nền Tảng Cú Pháp"
  },
  "summary": {
    "en": "Understand how JavaScript runs in browser engines (V8, SpiderMonkey) and Node.js runtime, master console diagnostics, statements, and comments.",
    "vi": "Hiểu cách JavaScript thực thi trong engine trình duyệt (V8, SpiderMonkey) và Node.js, làm chủ các công cụ chẩn đoán console, câu lệnh và chú thích."
  },
  "estimatedMinutes": 18,
  "topicId": "js_execution_console",
  "learn": {
    "introduction": {
      "en": "JavaScript is a high-level, single-threaded, dynamically typed, and just-in-time (JIT) compiled language. Originally created to add interactivity to web pages in the browser, modern JavaScript powers full-stack web applications, servers (Node.js, Deno, Bun), and mobile apps. In this lesson, you will learn how JavaScript code is evaluated, how the runtime interacts with the host environment, and how to effectively debug and inspect values using the Console API.",
      "vi": "JavaScript là ngôn ngữ bậc cao, đơn luồng (single-threaded), định kiểu động (dynamically typed) và được biên dịch Just-In-Time (JIT). Ban đầu được tạo ra để tăng tính tương tác cho trang web, JavaScript hiện đại ngày nay vận hành các ứng dụng full-stack, máy chủ (Node.js, Deno, Bun) và ứng dụng di động. Trong bài học này, bạn sẽ học cách mã JavaScript được thực thi, cách runtime tương tác với môi trường host và cách gỡ lỗi hiệu quả với Console API."
    },
    "conceptExplanation": {
      "en": "1. The JavaScript Engine vs Host Environment: The JS Engine (such as Chrome's V8 or Firefox's SpiderMonkey) parses code into an Abstract Syntax Tree (AST), compiles it to bytecode, and optimizes hot execution paths with JIT compilation. The host environment (Browser or Node.js) supplies host APIs (DOM, fetch, fs, process).\n\n2. Console API Methods: Beyond standard `console.log()`, use `console.warn()`, `console.error()`, `console.table()` for tabular array/object display, `console.time()` / `console.timeEnd()` for performance benchmarks, and `console.group()` for structured log hierarchy.\n\n3. Statements, Semicolons & ASI: JavaScript statements end with semicolons `;`. While Automatic Semicolon Insertion (ASI) exists, explicit semicolons prevent subtle parsing hazards in multi-line expressions.\n\n4. Comments: Use single-line `//` for brief inline notes and multi-line `/* ... */` for function documentation and block explanations.",
      "vi": "1. Engine JavaScript vs Môi trường Host: Engine JS (như V8 của Chrome hay SpiderMonkey của Firefox) phân tích mã thành Cây Cú Pháp Trừu Tượng (AST), biên dịch sang bytecode và tối ưu hóa các đoạn mã chạy nhiều với JIT compilation. Môi trường host (Trình duyệt hoặc Node.js) cung cấp các Web API / System API (DOM, fetch, fs, process).\n\n2. Các phương thức Console API: Ngoài `console.log()`, bạn nên dùng `console.warn()`, `console.error()`, `console.table()` để hiển thị bảng dữ liệu, `console.time()` / `console.timeEnd()` để đo hiệu năng và `console.group()` để gom nhóm log rõ ràng.\n\n3. Câu lệnh, Dấu chấm phẩy & ASI: Câu lệnh kết thúc bằng `;`. Dù cơ chế tự động chèn dấu chấm phẩy (ASI) tồn tại, việc viết rõ chấm phẩy giúp tránh các lỗi logic khó phát hiện khi xuống dòng.\n\n4. Chú thích (Comments): Dùng `//` cho ghi chú trên một dòng và `/* ... */` cho tài liệu hàm hay khối mã nhiều dòng."
    },
    "syntax": "// 1. Logging and diagnostics\nconsole.log(\"Informational output:\", { user: \"Alex\", role: \"Admin\" });\nconsole.table([\n  { id: 1, name: \"Alpha\", latencyMs: 12 },\n  { id: 2, name: \"Beta\", latencyMs: 8 }\n]);\n\n// 2. Performance benchmarking\nconsole.time(\"dataProcessing\");\nfor (let i = 0; i < 100000; i++) { /* work */ }\nconsole.timeEnd(\"dataProcessing\");\n\n// 3. Structured group logging\nconsole.group(\"User Authentication Flow\");\nconsole.log(\"Step 1: Validating token...\");\nconsole.log(\"Step 2: Resolving permissions...\");\nconsole.groupEnd();",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Comprehensive Console Diagnostics",
          "vi": "Chẩn Đoán Toàn Diện Bằng Console API"
        },
        "description": {
          "en": "Demonstrates console.table, timer benchmarking, assertion checks, and grouped log messages.",
          "vi": "Minh họa console.table, đo thời gian chạy, kiểm tra assertion và gom nhóm log."
        },
        "code": "function verifySystemHealth(services) {\n  console.group(\"Health Check Diagnostics\");\n  console.time(\"HealthCheckDuration\");\n\n  console.table(services);\n\n  services.forEach(service => {\n    if (service.status !== \"online\") {\n      console.warn(`Service ${service.name} is degraded (${service.status})`);\n    }\n  });\n\n  console.assert(services.length > 0, \"No services configured!\");\n  console.timeEnd(\"HealthCheckDuration\");\n  console.groupEnd();\n}\n\nverifySystemHealth([\n  { name: \"Auth Service\", status: \"online\", ping: 15 },\n  { name: \"Billing Gateway\", status: \"maintenance\", ping: 0 },\n  { name: \"Notification API\", status: \"online\", ping: 24 }\n]);"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Leaving heavy console.log statements in production code.",
          "vi": "Để lại nhiều câu lệnh console.log trong mã production."
        },
        "correction": {
          "en": "Use a logging abstraction library or build tool stripping (like terser drop_console) for production builds.",
          "vi": "Sử dụng wrapper ghi log hoặc cấu hình công cụ build (như terser drop_console) để tự động xóa log trong bản production."
        }
      }
    ],
    "tips": [
      {
        "en": "Use console.table for structured data inspectability: When debugging lists of objects or arrays, console.table formats properties into an easy-to-read tabular grid in developer tools.",
        "vi": "Dùng console.table để quan sát trực quan mảng đối tượng: Khi gỡ lỗi danh sách đối tượng hoặc mảng, console.table hiển thị dạng bảng trực quan trong DevTools giúp đối chiếu nhanh các thuộc tính."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_1_1",
      "type": "complete_code",
      "title": {
        "en": "Implement Structured Diagnostics Logger",
        "vi": "Xây Dựng Hàm Ghi Log Chẩn Đoán Có Cấu Trúc"
      },
      "instruction": {
        "en": "Create a function `logServerMetrics(metrics)` that groups logs under 'Server Metrics', prints the metrics array with `console.table`, logs a warning if any metric exceeds 80% usage, and ends the group.",
        "vi": "Tạo hàm `logServerMetrics(metrics)` gom nhóm log dưới tiêu đề 'Server Metrics', in mảng metrics bằng `console.table`, in warning nếu có chỉ số vượt quá 80% và đóng nhóm."
      },
      "starterCode": "function logServerMetrics(metrics) {\n  // Your code here\n}\n\nlogServerMetrics([\n  { metric: \"CPU\", usage: 45 },\n  { metric: \"Memory\", usage: 88 },\n  { metric: \"Disk\", usage: 60 }\n]);",
      "solutionCode": "function logServerMetrics(metrics) {\n  console.group(\"Server Metrics\");\n  console.table(metrics);\n  for (let i = 0; i < metrics.length; i++) {\n    if (metrics[i].usage > 80) {\n      console.warn(`High load detected on ${metrics[i].metric}: ${metrics[i].usage}%`);\n    }\n  }\n  console.groupEnd();\n}",
      "hint": {
        "en": "Use console.group('Server Metrics'), console.table(metrics), and iterate through metrics to check usage.",
        "vi": "Sử dụng console.group('Server Metrics'), console.table(metrics) và lặp qua mảng metrics để kiểm tra giá trị usage."
      }
    },
    {
      "id": "js_ex_1_2",
      "type": "complete_code",
      "title": {
        "en": "Execution Benchmark Timer",
        "vi": "Đo Thời Gian Thực Thi Bằng Console Timer"
      },
      "instruction": {
        "en": "Write a function `benchmarkCalculation(fn, label)` that starts a console timer with `label`, executes the function `fn`, and then terminates the timer with `console.timeEnd(label)`.",
        "vi": "Viết hàm `benchmarkCalculation(fn, label)` bắt đầu bộ đếm với `label`, thực thi hàm `fn` và kết thúc bộ đếm với `console.timeEnd(label)`."
      },
      "starterCode": "function benchmarkCalculation(fn, label) {\n  // Start timer, invoke fn(), end timer\n}\n\nbenchmarkCalculation(() => {\n  let sum = 0;\n  for (let i = 0; i < 500000; i++) sum += i;\n  return sum;\n}, \"SumBenchmark\");",
      "solutionCode": "function benchmarkCalculation(fn, label) {\n  console.time(label);\n  const result = fn();\n  console.timeEnd(label);\n  return result;\n}",
      "hint": {
        "en": "Use console.time(label) before calling fn() and console.timeEnd(label) immediately after.",
        "vi": "Gọi console.time(label) trước khi gọi fn() và console.timeEnd(label) ngay sau đó."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_1",
    "title": {
      "en": "Audit Pipeline Execution Monitor",
      "vi": "Bộ Giám Sát Đường Ống Kiểm Toán Hệ Thống"
    },
    "description": {
      "en": "Build a function `runAuditPipeline(tasks)` that logs the start with a group, benchmarks each task using `console.time`, logs errors if a task throws an exception, logs completion with `console.info`, and returns an execution report object with `{ successCount, failureCount }`.",
      "vi": "Xây dựng hàm `runAuditPipeline(tasks)` gom nhóm các tác vụ, đo thời gian từng task bằng console.time, bắt lỗi và ghi console.error nếu task gặp ngoại lệ, và trả về đối tượng báo cáo `{ successCount, failureCount }`."
    },
    "starterCode": "function runAuditPipeline(tasks) {\n  // Implement pipeline audit monitor\n}\n\nconst report = runAuditPipeline([\n  { name: \"Schema Validation\", run: () => true },\n  { name: \"Data Encryption\", run: () => { throw new Error(\"Key missing\"); } },\n  { name: \"Sync to Cache\", run: () => true }\n]);\nconsole.log(report);",
    "solutionCode": "function runAuditPipeline(tasks) {\n  console.group(\"Audit Pipeline Run\");\n  let successCount = 0;\n  let failureCount = 0;\n\n  for (let i = 0; i < tasks.length; i++) {\n    const task = tasks[i];\n    console.time(task.name);\n    try {\n      task.run();\n      successCount++;\n      console.info(`Task '${task.name}' completed successfully.`);\n    } catch (err) {\n      failureCount++;\n      console.error(`Task '${task.name}' failed:`, err);\n    } finally {\n      console.timeEnd(task.name);\n    }\n  }\n\n  console.groupEnd();\n  return { successCount, failureCount };\n}",
    "hints": [
      {
        "en": "Wrap each task execution inside a try/catch/finally block and manage counters accordingly.",
        "vi": "Bọc lời gọi task bên trong khối try/catch/finally và tăng biến đếm tương ứng."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Audit Pipeline Execution Monitor according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Giám Sát Đường Ống Kiểm Toán Hệ Thống theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_1_1",
      "type": "single_choice",
      "question": {
        "en": "Which component of the JavaScript runtime is responsible for compiling JavaScript code into optimized machine bytecode at runtime?",
        "vi": "Thành phần nào trong runtime JavaScript chịu trách nhiệm biên dịch mã JavaScript thành bytecode máy tối ưu hóa khi chạy?"
      },
      "options": [
        {
          "en": "The DOM Tree Parser",
          "vi": "Trình phân tích DOM Tree"
        },
        {
          "en": "The JIT (Just-In-Time) Compiler in the JS Engine (e.g., V8)",
          "vi": "Trình biên dịch JIT trong JS Engine (ví dụ V8)"
        },
        {
          "en": "The CSSOM Engine",
          "vi": "Engine CSSOM"
        },
        {
          "en": "The Browser Network Layer",
          "vi": "Lớp mạng của trình duyệt"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "The JS Engine (like V8) uses a JIT compiler to compile parsed AST into bytecode and optimize hot code paths directly into machine code.",
        "vi": "JS Engine (như V8) sử dụng trình biên dịch JIT để biên dịch AST sang bytecode và tối ưu trực tiếp thành mã máy cho các tác vụ thường xuyên gọi."
      },
      "topicId": "js_execution_console",
      "difficulty": "easy"
    },
    {
      "id": "js_q_1_2",
      "type": "single_choice",
      "question": {
        "en": "Which Console API method renders an array of objects as an interactive, sortable tabular grid in developer tools?",
        "vi": "Phương thức Console API nào hiển thị một mảng các đối tượng dưới dạng bảng tương tác có thể sắp xếp trong DevTools?"
      },
      "options": [
        {
          "en": "console.grid()",
          "vi": "console.grid()"
        },
        {
          "en": "console.table()",
          "vi": "console.table()"
        },
        {
          "en": "console.matrix()",
          "vi": "console.matrix()"
        },
        {
          "en": "console.view()",
          "vi": "console.view()"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "console.table() accepts an array or object and formats its properties in a neat tabular layout.",
        "vi": "console.table() nhận vào một mảng hoặc đối tượng và định dạng các trường dữ liệu thành bảng trực quan."
      },
      "topicId": "js_execution_console",
      "difficulty": "easy"
    },
    {
      "id": "js_q_1_3",
      "type": "predict_output",
      "question": {
        "en": "What is printed when `console.assert(2 + 2 === 5, 'Math failed!');` is evaluated in a JavaScript console?",
        "vi": "Kết quả in ra là gì khi thực thi `console.assert(2 + 2 === 5, 'Math failed!');` trong console JavaScript?"
      },
      "options": [
        {
          "en": "Nothing (silently passes)",
          "vi": "Không có gì (bỏ qua trong im lặng)"
        },
        {
          "en": "An error message: 'Assertion failed: Math failed!'",
          "vi": "Một thông báo lỗi: 'Assertion failed: Math failed!'"
        },
        {
          "en": "The program throws an uncaught TypeError",
          "vi": "Chương trình văng ngoại lệ TypeError"
        },
        {
          "en": "true",
          "vi": "true"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "console.assert() logs an error message to the console ONLY if the first argument evaluates to falsy.",
        "vi": "console.assert() chỉ in thông báo lỗi ra console khi điều kiện truyền vào có giá trị falsy (ở đây 4 === 5 là false)."
      },
      "topicId": "js_execution_console",
      "difficulty": "easy"
    },
    {
      "id": "js_q_1_4",
      "type": "single_choice",
      "question": {
        "en": "What is Automatic Semicolon Insertion (ASI) in JavaScript?",
        "vi": "Cơ chế Tự Động Chèn Dấu Chấm Phẩy (ASI) trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "A compiler phase that inserts semicolons where parsing rules mandate statements end",
          "vi": "Một bước biên dịch tự động chèn dấu chấm phẩy tại những nơi luật ngữ pháp yêu cầu kết thúc câu lệnh"
        },
        {
          "en": "A linter plugin in VS Code",
          "vi": "Một plugin linter trong VS Code"
        },
        {
          "en": "A TypeScript-only syntax check",
          "vi": "Kiểm tra cú pháp chỉ có trong TypeScript"
        },
        {
          "en": "A runtime error when semicolons are missing",
          "vi": "Lỗi runtime khi thiếu dấu chấm phẩy"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "ASI is an ECMAScript parsing feature where the parser automatically inserts semicolons according to specific syntactic rules when a newline token is encountered.",
        "vi": "ASI là tính năng của trình phân tích cú pháp ECMAScript giúp tự động chèn dấu chấm phẩy theo quy tắc cú pháp khi gặp ký tự xuống dòng."
      },
      "topicId": "js_execution_console",
      "difficulty": "medium"
    },
    {
      "id": "js_q_1_5",
      "type": "predict_output",
      "question": {
        "en": "What will the following code return?\n```js\nfunction test() {\n  return\n  { status: 'ok' };\n}\nconsole.log(test());\n```",
        "vi": "Đoạn mã sau sẽ trả về giá trị gì?\n```js\nfunction test() {\n  return\n  { status: 'ok' };\n}\nconsole.log(test());\n```"
      },
      "options": [
        {
          "en": "{ status: 'ok' }",
          "vi": "{ status: 'ok' }"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "SyntaxError",
          "vi": "SyntaxError"
        },
        {
          "en": "null",
          "vi": "null"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "Because `return` is immediately followed by a newline, ASI inserts a semicolon after `return;`, returning `undefined` before reaching the object literal.",
        "vi": "Do sau từ khóa `return` là ký tự xuống dòng, ASI tự động chèn dấu chấm phẩy thành `return;`, dẫn tới hàm trả về `undefined` và bỏ qua đối tượng bên dưới."
      },
      "topicId": "js_execution_console",
      "difficulty": "medium"
    },
    {
      "id": "js_q_1_6",
      "type": "single_choice",
      "question": {
        "en": "Which method pair is used to calculate elapsed execution time in milliseconds?",
        "vi": "Cặp phương thức nào được dùng để tính thời gian thực thi trôi qua theo mili giây?"
      },
      "options": [
        {
          "en": "console.start() / console.stop()",
          "vi": "console.start() / console.stop()"
        },
        {
          "en": "console.time(label) / console.timeEnd(label)",
          "vi": "console.time(label) / console.timeEnd(label)"
        },
        {
          "en": "console.bench() / console.eval()",
          "vi": "console.bench() / console.eval()"
        },
        {
          "en": "console.clock() / console.unclock()",
          "vi": "console.clock() / console.unclock()"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "console.time(label) starts a timer with a unique label, and console.timeEnd(label) stops it and logs the elapsed time in ms.",
        "vi": "console.time(label) khởi động bộ bấm giờ với nhãn duy nhất, và console.timeEnd(label) dừng lại đồng thời in thời gian đã trôi qua ra màn hình."
      },
      "topicId": "js_execution_console",
      "difficulty": "medium"
    },
    {
      "id": "js_q_1_7",
      "type": "single_choice",
      "question": {
        "en": "How does JavaScript execution differ in Node.js compared to a Web Browser?",
        "vi": "Môi trường thực thi JavaScript trong Node.js khác với Trình duyệt web ở điểm nào?"
      },
      "options": [
        {
          "en": "Node.js does not have access to the browser DOM (`window`, `document`), but provides server APIs (`fs`, `path`, `process`)",
          "vi": "Node.js không có các API DOM (`window`, `document`), nhưng cung cấp các API máy chủ (`fs`, `path`, `process`)"
        },
        {
          "en": "Node.js runs multi-threaded user JavaScript by default",
          "vi": "Node.js chạy mã người dùng đa luồng theo mặc định"
        },
        {
          "en": "Node.js uses Python interpreter instead of V8",
          "vi": "Node.js dùng trình thông dịch Python thay cho V8"
        },
        {
          "en": "Browsers cannot execute ES6+ modern syntax",
          "vi": "Trình duyệt không thể chạy cú pháp hiện đại ES6+"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Both use the same core ECMAScript standard and V8 engine, but they provide different host APIs (Browser has DOM/window; Node.js has global/process/fs).",
        "vi": "Cả hai đều tuân thủ chuẩn ECMAScript cốt lõi và dùng engine V8, nhưng cung cấp các API host khác nhau (Trình duyệt có DOM/window; Node.js có global/process/fs)."
      },
      "topicId": "js_execution_console",
      "difficulty": "medium"
    },
    {
      "id": "js_q_1_8",
      "type": "fill_blank",
      "question": {
        "en": "To create a collapsible group of log statements in the console, you call console.group() and close it with console._____().",
        "vi": "Để tạo một khối log có thể thu gọn trong console, bạn gọi console.group() và kết thúc bằng console._____()."
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
        "en": "console.groupEnd() exits the current inline group indentation in the console.",
        "vi": "console.groupEnd() thoát khỏi mức thụt đầu dòng của nhóm log hiện tại trong console."
      },
      "topicId": "js_execution_console",
      "difficulty": "hard",
      "fillBlankAnswers": [
        "groupend"
      ]
    },
    {
      "id": "js_q_1_9",
      "type": "single_choice",
      "question": {
        "en": "Which syntax is used for multi-line block comments in JavaScript?",
        "vi": "Cú pháp nào được dùng cho khối chú thích nhiều dòng trong JavaScript?"
      },
      "options": [
        {
          "en": "<!-- comment -->",
          "vi": "<!-- comment -->"
        },
        {
          "en": "/* comment */",
          "vi": "/* comment */"
        },
        {
          "en": "# comment",
          "vi": "# comment"
        },
        {
          "en": "-- comment",
          "vi": "-- comment"
        }
      ],
      "correctAnswers": [
        1
      ],
      "explanation": {
        "en": "/* ... */ denotes multi-line block comments in JavaScript.",
        "vi": "/* ... */ là cú pháp chú thích nhiều dòng trong JavaScript."
      },
      "topicId": "js_execution_console",
      "difficulty": "hard"
    },
    {
      "id": "js_q_1_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `console.count('eventName')` valuable during event debugging?",
        "vi": "Tại sao `console.count('eventName')` lại hữu ích khi gỡ lỗi sự kiện?"
      },
      "options": [
        {
          "en": "It automatically counts how many times that specific label has been called across the session",
          "vi": "Nó tự động đếm số lần nhãn cụ thể đó được gọi trong suốt phiên làm việc"
        },
        {
          "en": "It measures the CPU percentage consumed",
          "vi": "Nó đo phần trăm CPU bị tiêu thụ"
        },
        {
          "en": "It stops execution like a breakpoint",
          "vi": "Nó dừng thực thi như một điểm breakpoint"
        },
        {
          "en": "It counts the number of child elements in the DOM",
          "vi": "Nó đếm số phần tử con trong DOM"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "console.count(label) maintains an internal counter keyed by label, which is ideal for detecting unexpected duplicate render triggers or event handler firings.",
        "vi": "console.count(label) duy trì một bộ đếm nội bộ theo nhãn, rất lý tưởng để phát hiện sự kiện bị kích hoạt trùng lặp ngoài ý muốn."
      },
      "topicId": "js_execution_console",
      "difficulty": "hard"
    }
  ]
};
export default lesson01;
