import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/basic/module01');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 01 ---
const lesson01: Lesson = {
  id: "js_lesson_1",
  courseId: "javascript",
  levelId: "basic",
  moduleId: "js_mod_1",
  order: 1,
  title: {
    en: "JavaScript Execution, Console & Syntax Fundamentals",
    vi: "Cơ Chế Thực Thi JavaScript, Console & Nền Tảng Cú Pháp"
  },
  summary: {
    en: "Understand how JavaScript runs in browser engines (V8, SpiderMonkey) and Node.js runtime, master console diagnostics, statements, and comments.",
    vi: "Hiểu cách JavaScript thực thi trong engine trình duyệt (V8, SpiderMonkey) và Node.js, làm chủ các công cụ chẩn đoán console, câu lệnh và chú thích."
  },
  estimatedMinutes: 18,
  topicId: "js_execution_console",
  learn: {
    introduction: {
      en: "JavaScript is a high-level, single-threaded, dynamically typed, and just-in-time (JIT) compiled language. Originally created to add interactivity to web pages in the browser, modern JavaScript powers full-stack web applications, servers (Node.js, Deno, Bun), and mobile apps. In this lesson, you will learn how JavaScript code is evaluated, how the runtime interacts with the host environment, and how to effectively debug and inspect values using the Console API.",
      vi: "JavaScript là ngôn ngữ bậc cao, đơn luồng (single-threaded), định kiểu động (dynamically typed) và được biên dịch Just-In-Time (JIT). Ban đầu được tạo ra để tăng tính tương tác cho trang web, JavaScript hiện đại ngày nay vận hành các ứng dụng full-stack, máy chủ (Node.js, Deno, Bun) và ứng dụng di động. Trong bài học này, bạn sẽ học cách mã JavaScript được thực thi, cách runtime tương tác với môi trường host và cách gỡ lỗi hiệu quả với Console API."
    },
    conceptExplanation: {
      en: "1. The JavaScript Engine vs Host Environment: The JS Engine (such as Chrome's V8 or Firefox's SpiderMonkey) parses code into an Abstract Syntax Tree (AST), compiles it to bytecode, and optimizes hot execution paths with JIT compilation. The host environment (Browser or Node.js) supplies host APIs (DOM, fetch, fs, process).\n\n2. Console API Methods: Beyond standard `console.log()`, use `console.warn()`, `console.error()`, `console.table()` for tabular array/object display, `console.time()` / `console.timeEnd()` for performance benchmarks, and `console.group()` for structured log hierarchy.\n\n3. Statements, Semicolons & ASI: JavaScript statements end with semicolons `;`. While Automatic Semicolon Insertion (ASI) exists, explicit semicolons prevent subtle parsing hazards in multi-line expressions.\n\n4. Comments: Use single-line `//` for brief inline notes and multi-line `/* ... */` for function documentation and block explanations.",
      vi: "1. Engine JavaScript vs Môi trường Host: Engine JS (như V8 của Chrome hay SpiderMonkey của Firefox) phân tích mã thành Cây Cú Pháp Trừu Tượng (AST), biên dịch sang bytecode và tối ưu hóa các đoạn mã chạy nhiều với JIT compilation. Môi trường host (Trình duyệt hoặc Node.js) cung cấp các Web API / System API (DOM, fetch, fs, process).\n\n2. Các phương thức Console API: Ngoài `console.log()`, bạn nên dùng `console.warn()`, `console.error()`, `console.table()` để hiển thị bảng dữ liệu, `console.time()` / `console.timeEnd()` để đo hiệu năng và `console.group()` để gom nhóm log rõ ràng.\n\n3. Câu lệnh, Dấu chấm phẩy & ASI: Câu lệnh kết thúc bằng `;`. Dù cơ chế tự động chèn dấu chấm phẩy (ASI) tồn tại, việc viết rõ chấm phẩy giúp tránh các lỗi logic khó phát hiện khi xuống dòng.\n\n4. Chú thích (Comments): Dùng `//` cho ghi chú trên một dòng và `/* ... */` cho tài liệu hàm hay khối mã nhiều dòng."
    },
    syntax: `// 1. Logging and diagnostics
console.log("Informational output:", { user: "Alex", role: "Admin" });
console.table([
  { id: 1, name: "Alpha", latencyMs: 12 },
  { id: 2, name: "Beta", latencyMs: 8 }
]);

// 2. Performance benchmarking
console.time("dataProcessing");
for (let i = 0; i < 100000; i++) { /* work */ }
console.timeEnd("dataProcessing");

// 3. Structured group logging
console.group("User Authentication Flow");
console.log("Step 1: Validating token...");
console.log("Step 2: Resolving permissions...");
console.groupEnd();`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Comprehensive Console Diagnostics",
          vi: "Chẩn Đoán Toàn Diện Bằng Console API"
        },
        description: {
          en: "Demonstrates console.table, timer benchmarking, assertion checks, and grouped log messages.",
          vi: "Minh họa console.table, đo thời gian chạy, kiểm tra assertion và gom nhóm log."
        },
        code: `function verifySystemHealth(services) {
  console.group("Health Check Diagnostics");
  console.time("HealthCheckDuration");

  console.table(services);

  services.forEach(service => {
    if (service.status !== "online") {
      console.warn(\`Service \${service.name} is degraded (\${service.status})\`);
    }
  });

  console.assert(services.length > 0, "No services configured!");
  console.timeEnd("HealthCheckDuration");
  console.groupEnd();
}

verifySystemHealth([
  { name: "Auth Service", status: "online", ping: 15 },
  { name: "Billing Gateway", status: "maintenance", ping: 0 },
  { name: "Notification API", status: "online", ping: 24 }
]);`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Leaving heavy console.log statements in production code.",
          vi: "Để lại nhiều câu lệnh console.log trong mã production."
        },
        correction: {
          en: "Use a logging abstraction library or build tool stripping (like terser drop_console) for production builds.",
          vi: "Sử dụng wrapper ghi log hoặc cấu hình công cụ build (như terser drop_console) để tự động xóa log trong bản production."
        },
        explanation: {
          en: "Console logging holds references to logged objects in memory, which can cause significant memory leaks and performance drag in large single-page applications.",
          vi: "Console log giữ tham chiếu tới các object trong bộ nhớ, gây rò rỉ bộ nhớ và làm chậm ứng dụng web quy mô lớn."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use console.table for structured data inspectability",
          vi: "Dùng console.table để quan sát trực quan mảng đối tượng"
        },
        description: {
          en: "When debugging lists of objects or arrays, console.table formats properties into an easy-to-read tabular grid in developer tools.",
          vi: "Khi gỡ lỗi danh sách đối tượng hoặc mảng, console.table hiển thị dạng bảng trực quan trong DevTools giúp đối chiếu nhanh các thuộc tính."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_1_1",
      title: {
        en: "Implement Structured Diagnostics Logger",
        vi: "Xây Dựng Hàm Ghi Log Chẩn Đoán Có Cấu Trúc"
      },
      instruction: {
        en: "Create a function `logServerMetrics(metrics)` that groups logs under 'Server Metrics', prints the metrics array with `console.table`, logs a warning if any metric exceeds 80% usage, and ends the group.",
        vi: "Tạo hàm `logServerMetrics(metrics)` gom nhóm log dưới tiêu đề 'Server Metrics', in mảng metrics bằng `console.table`, in warning nếu có chỉ số vượt quá 80% và đóng nhóm."
      },
      starterCode: `function logServerMetrics(metrics) {
  // Your code here
}

logServerMetrics([
  { metric: "CPU", usage: 45 },
  { metric: "Memory", usage: 88 },
  { metric: "Disk", usage: 60 }
]);`,
      solutionCode: `function logServerMetrics(metrics) {
  console.group("Server Metrics");
  console.table(metrics);
  for (let i = 0; i < metrics.length; i++) {
    if (metrics[i].usage > 80) {
      console.warn(\`High load detected on \${metrics[i].metric}: \${metrics[i].usage}%\`);
    }
  }
  console.groupEnd();
}`,
      hints: [
        {
          en: "Use console.group('Server Metrics'), console.table(metrics), and iterate through metrics to check usage.",
          vi: "Sử dụng console.group('Server Metrics'), console.table(metrics) và lặp qua mảng metrics để kiểm tra giá trị usage."
        }
      ]
    },
    {
      id: "js_ex_1_2",
      title: {
        en: "Execution Benchmark Timer",
        vi: "Đo Thời Gian Thực Thi Bằng Console Timer"
      },
      instruction: {
        en: "Write a function `benchmarkCalculation(fn, label)` that starts a console timer with `label`, executes the function `fn`, and then terminates the timer with `console.timeEnd(label)`.",
        vi: "Viết hàm `benchmarkCalculation(fn, label)` bắt đầu bộ đếm với `label`, thực thi hàm `fn` và kết thúc bộ đếm với `console.timeEnd(label)`."
      },
      starterCode: `function benchmarkCalculation(fn, label) {
  // Start timer, invoke fn(), end timer
}

benchmarkCalculation(() => {
  let sum = 0;
  for (let i = 0; i < 500000; i++) sum += i;
  return sum;
}, "SumBenchmark");`,
      solutionCode: `function benchmarkCalculation(fn, label) {
  console.time(label);
  const result = fn();
  console.timeEnd(label);
  return result;
}`,
      hints: [
        {
          en: "Use console.time(label) before calling fn() and console.timeEnd(label) immediately after.",
          vi: "Gọi console.time(label) trước khi gọi fn() và console.timeEnd(label) ngay sau đó."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_1",
    title: {
      en: "Audit Pipeline Execution Monitor",
      vi: "Bộ Giám Sát Đường Ống Kiểm Toán Hệ Thống"
    },
    description: {
      en: "Build a function `runAuditPipeline(tasks)` that logs the start with a group, benchmarks each task using `console.time`, logs errors if a task throws an exception, logs completion with `console.info`, and returns an execution report object with `{ successCount, failureCount }`.",
      vi: "Xây dựng hàm `runAuditPipeline(tasks)` gom nhóm các tác vụ, đo thời gian từng task bằng console.time, bắt lỗi và ghi console.error nếu task gặp ngoại lệ, và trả về đối tượng báo cáo `{ successCount, failureCount }`."
    },
    starterCode: `function runAuditPipeline(tasks) {
  // Implement pipeline audit monitor
}

const report = runAuditPipeline([
  { name: "Schema Validation", run: () => true },
  { name: "Data Encryption", run: () => { throw new Error("Key missing"); } },
  { name: "Sync to Cache", run: () => true }
]);
console.log(report);`,
    solutionCode: `function runAuditPipeline(tasks) {
  console.group("Audit Pipeline Run");
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    console.time(task.name);
    try {
      task.run();
      successCount++;
      console.info(\`Task '\${task.name}' completed successfully.\`);
    } catch (err) {
      failureCount++;
      console.error(\`Task '\${task.name}' failed:\`, err);
    } finally {
      console.timeEnd(task.name);
    }
  }

  console.groupEnd();
  return { successCount, failureCount };
}`,
    hints: [
      {
        en: "Wrap each task execution inside a try/catch/finally block and manage counters accordingly.",
        vi: "Bọc lời gọi task bên trong khối try/catch/finally và tăng biến đếm tương ứng."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_1_1",
      type: "single_choice",
      question: {
        en: "Which component of the JavaScript runtime is responsible for compiling JavaScript code into optimized machine bytecode at runtime?",
        vi: "Thành phần nào trong runtime JavaScript chịu trách nhiệm biên dịch mã JavaScript thành bytecode máy tối ưu hóa khi chạy?"
      },
      options: [
        { id: "a", text: { en: "The DOM Tree Parser", vi: "Trình phân tích DOM Tree" } },
        { id: "b", text: { en: "The JIT (Just-In-Time) Compiler in the JS Engine (e.g., V8)", vi: "Trình biên dịch JIT trong JS Engine (ví dụ V8)" } },
        { id: "c", text: { en: "The CSSOM Engine", vi: "Engine CSSOM" } },
        { id: "d", text: { en: "The Browser Network Layer", vi: "Lớp mạng của trình duyệt" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "The JS Engine (like V8) uses a JIT compiler to compile parsed AST into bytecode and optimize hot code paths directly into machine code.",
        vi: "JS Engine (như V8) sử dụng trình biên dịch JIT để biên dịch AST sang bytecode và tối ưu trực tiếp thành mã máy cho các tác vụ thường xuyên gọi."
      }
    },
    {
      id: "js_q_1_2",
      type: "single_choice",
      question: {
        en: "Which Console API method renders an array of objects as an interactive, sortable tabular grid in developer tools?",
        vi: "Phương thức Console API nào hiển thị một mảng các đối tượng dưới dạng bảng tương tác có thể sắp xếp trong DevTools?"
      },
      options: [
        { id: "a", text: { en: "console.grid()", vi: "console.grid()" } },
        { id: "b", text: { en: "console.table()", vi: "console.table()" } },
        { id: "c", text: { en: "console.matrix()", vi: "console.matrix()" } },
        { id: "d", text: { en: "console.view()", vi: "console.view()" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "console.table() accepts an array or object and formats its properties in a neat tabular layout.",
        vi: "console.table() nhận vào một mảng hoặc đối tượng và định dạng các trường dữ liệu thành bảng trực quan."
      }
    },
    {
      id: "js_q_1_3",
      type: "predict_output",
      question: {
        en: "What is printed when `console.assert(2 + 2 === 5, 'Math failed!');` is evaluated in a JavaScript console?",
        vi: "Kết quả in ra là gì khi thực thi `console.assert(2 + 2 === 5, 'Math failed!');` trong console JavaScript?"
      },
      options: [
        { id: "a", text: { en: "Nothing (silently passes)", vi: "Không có gì (bỏ qua trong im lặng)" } },
        { id: "b", text: { en: "An error message: 'Assertion failed: Math failed!'", vi: "Một thông báo lỗi: 'Assertion failed: Math failed!'" } },
        { id: "c", text: { en: "The program throws an uncaught TypeError", vi: "Chương trình văng ngoại lệ TypeError" } },
        { id: "d", text: { en: "true", vi: "true" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "console.assert() logs an error message to the console ONLY if the first argument evaluates to falsy.",
        vi: "console.assert() chỉ in thông báo lỗi ra console khi điều kiện truyền vào có giá trị falsy (ở đây 4 === 5 là false)."
      }
    },
    {
      id: "js_q_1_4",
      type: "single_choice",
      question: {
        en: "What is Automatic Semicolon Insertion (ASI) in JavaScript?",
        vi: "Cơ chế Tự Động Chèn Dấu Chấm Phẩy (ASI) trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "A compiler phase that inserts semicolons where parsing rules mandate statements end", vi: "Một bước biên dịch tự động chèn dấu chấm phẩy tại những nơi luật ngữ pháp yêu cầu kết thúc câu lệnh" } },
        { id: "b", text: { en: "A linter plugin in VS Code", vi: "Một plugin linter trong VS Code" } },
        { id: "c", text: { en: "A TypeScript-only syntax check", vi: "Kiểm tra cú pháp chỉ có trong TypeScript" } },
        { id: "d", text: { en: "A runtime error when semicolons are missing", vi: "Lỗi runtime khi thiếu dấu chấm phẩy" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "ASI is an ECMAScript parsing feature where the parser automatically inserts semicolons according to specific syntactic rules when a newline token is encountered.",
        vi: "ASI là tính năng của trình phân tích cú pháp ECMAScript giúp tự động chèn dấu chấm phẩy theo quy tắc cú pháp khi gặp ký tự xuống dòng."
      }
    },
    {
      id: "js_q_1_5",
      type: "predict_output",
      question: {
        en: "What will the following code return?\n```js\nfunction test() {\n  return\n  { status: 'ok' };\n}\nconsole.log(test());\n```",
        vi: "Đoạn mã sau sẽ trả về giá trị gì?\n```js\nfunction test() {\n  return\n  { status: 'ok' };\n}\nconsole.log(test());\n```"
      },
      options: [
        { id: "a", text: { en: "{ status: 'ok' }", vi: "{ status: 'ok' }" } },
        { id: "b", text: { en: "undefined", vi: "undefined" } },
        { id: "c", text: { en: "SyntaxError", vi: "SyntaxError" } },
        { id: "d", text: { en: "null", vi: "null" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "Because `return` is immediately followed by a newline, ASI inserts a semicolon after `return;`, returning `undefined` before reaching the object literal.",
        vi: "Do sau từ khóa `return` là ký tự xuống dòng, ASI tự động chèn dấu chấm phẩy thành `return;`, dẫn tới hàm trả về `undefined` và bỏ qua đối tượng bên dưới."
      }
    },
    {
      id: "js_q_1_6",
      type: "single_choice",
      question: {
        en: "Which method pair is used to calculate elapsed execution time in milliseconds?",
        vi: "Cặp phương thức nào được dùng để tính thời gian thực thi trôi qua theo mili giây?"
      },
      options: [
        { id: "a", text: { en: "console.start() / console.stop()", vi: "console.start() / console.stop()" } },
        { id: "b", text: { en: "console.time(label) / console.timeEnd(label)", vi: "console.time(label) / console.timeEnd(label)" } },
        { id: "c", text: { en: "console.bench() / console.eval()", vi: "console.bench() / console.eval()" } },
        { id: "d", text: { en: "console.clock() / console.unclock()", vi: "console.clock() / console.unclock()" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "console.time(label) starts a timer with a unique label, and console.timeEnd(label) stops it and logs the elapsed time in ms.",
        vi: "console.time(label) khởi động bộ bấm giờ với nhãn duy nhất, và console.timeEnd(label) dừng lại đồng thời in thời gian đã trôi qua ra màn hình."
      }
    },
    {
      id: "js_q_1_7",
      type: "single_choice",
      question: {
        en: "How does JavaScript execution differ in Node.js compared to a Web Browser?",
        vi: "Môi trường thực thi JavaScript trong Node.js khác với Trình duyệt web ở điểm nào?"
      },
      options: [
        { id: "a", text: { en: "Node.js does not have access to the browser DOM (`window`, `document`), but provides server APIs (`fs`, `path`, `process`)", vi: "Node.js không có các API DOM (`window`, `document`), nhưng cung cấp các API máy chủ (`fs`, `path`, `process`)" } },
        { id: "b", text: { en: "Node.js runs multi-threaded user JavaScript by default", vi: "Node.js chạy mã người dùng đa luồng theo mặc định" } },
        { id: "c", text: { en: "Node.js uses Python interpreter instead of V8", vi: "Node.js dùng trình thông dịch Python thay cho V8" } },
        { id: "d", text: { en: "Browsers cannot execute ES6+ modern syntax", vi: "Trình duyệt không thể chạy cú pháp hiện đại ES6+" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Both use the same core ECMAScript standard and V8 engine, but they provide different host APIs (Browser has DOM/window; Node.js has global/process/fs).",
        vi: "Cả hai đều tuân thủ chuẩn ECMAScript cốt lõi và dùng engine V8, nhưng cung cấp các API host khác nhau (Trình duyệt có DOM/window; Node.js có global/process/fs)."
      }
    },
    {
      id: "js_q_1_8",
      type: "fill_blank",
      question: {
        en: "To create a collapsible group of log statements in the console, you call console.group() and close it with console._____().",
        vi: "Để tạo một khối log có thể thu gọn trong console, bạn gọi console.group() và kết thúc bằng console._____()."
      },
      correctAnswer: "groupEnd",
      explanation: {
        en: "console.groupEnd() exits the current inline group indentation in the console.",
        vi: "console.groupEnd() thoát khỏi mức thụt đầu dòng của nhóm log hiện tại trong console."
      }
    },
    {
      id: "js_q_1_9",
      type: "single_choice",
      question: {
        en: "Which syntax is used for multi-line block comments in JavaScript?",
        vi: "Cú pháp nào được dùng cho khối chú thích nhiều dòng trong JavaScript?"
      },
      options: [
        { id: "a", text: { en: "<!-- comment -->", vi: "<!-- comment -->" } },
        { id: "b", text: { en: "/* comment */", vi: "/* comment */" } },
        { id: "c", text: { en: "# comment", vi: "# comment" } },
        { id: "d", text: { en: "-- comment", vi: "-- comment" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "/* ... */ denotes multi-line block comments in JavaScript.",
        vi: "/* ... */ là cú pháp chú thích nhiều dòng trong JavaScript."
      }
    },
    {
      id: "js_q_1_10",
      type: "code_reasoning",
      question: {
        en: "Why is `console.count('eventName')` valuable during event debugging?",
        vi: "Tại sao `console.count('eventName')` lại hữu ích khi gỡ lỗi sự kiện?"
      },
      options: [
        { id: "a", text: { en: "It automatically counts how many times that specific label has been called across the session", vi: "Nó tự động đếm số lần nhãn cụ thể đó được gọi trong suốt phiên làm việc" } },
        { id: "b", text: { en: "It measures the CPU percentage consumed", vi: "Nó đo phần trăm CPU bị tiêu thụ" } },
        { id: "c", text: { en: "It stops execution like a breakpoint", vi: "Nó dừng thực thi như một điểm breakpoint" } },
        { id: "d", text: { en: "It counts the number of child elements in the DOM", vi: "Nó đếm số phần tử con trong DOM" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "console.count(label) maintains an internal counter keyed by label, which is ideal for detecting unexpected duplicate render triggers or event handler firings.",
        vi: "console.count(label) duy trì một bộ đếm nội bộ theo nhãn, rất lý tưởng để phát hiện sự kiện bị kích hoạt trùng lặp ngoài ý muốn."
      }
    }
  ]
};

// --- LESSON 02 ---
const lesson02: Lesson = {
  id: "js_lesson_2",
  courseId: "javascript",
  levelId: "basic",
  moduleId: "js_mod_1",
  order: 2,
  title: {
    en: "Variables & Scope: let, const and Legacy var",
    vi: "Khai Báo Biến & Phạm Vi (Scope): let, const và var Cũ"
  },
  summary: {
    en: "Master block scope, function scope, hoisting, Temporal Dead Zone (TDZ), and mutability rules of const object references.",
    vi: "Làm chủ phạm vi khối (block scope), phạm vi hàm, hoisting, Vùng Chết Tạm Thời (TDZ) và tính khả biến của đối tượng khai báo const."
  },
  estimatedMinutes: 20,
  topicId: "js_variables_scope",
  learn: {
    introduction: {
      en: "Variables are named storage locations for values in JavaScript memory. ECMAScript 2015 (ES6) modernized JavaScript variable declarations by introducing `let` and `const` with lexical block scoping, effectively replacing legacy function-scoped `var`. Understanding scoping rules, variable hoisting, and the Temporal Dead Zone is critical to writing bug-free, predictable code.",
      vi: "Biến là vùng nhớ có tên dùng để lưu trữ giá trị trong bộ nhớ JavaScript. Bản cập nhật ES6 (2015) đã hiện đại hóa việc khai báo biến với `let` và `const` có phạm vi khối (block scope), thay thế `var` với phạm vi hàm dễ sinh lỗi. Hiểu rõ quy tắc phạm vi, cơ chế hoisting và Vùng Chết Tạm Thời (Temporal Dead Zone - TDZ) là điều tối quan trọng để viết code an toàn và dễ đoán."
    },
    conceptExplanation: {
      en: "1. Scope Hierarchies: Global Scope (accessible everywhere), Function Scope (confined within function body - `var`), and Block Scope (confined within `{ ... }` blocks - `let` and `const`).\n\n2. Hoisting & Temporal Dead Zone (TDZ): `var` declarations are hoisted to the top of their function/global scope and initialized as `undefined`. In contrast, `let` and `const` declarations are also hoisted, but they remain uninitialized in the TDZ from the start of the block until the evaluation of the declaration line. Accessing them before initialization throws a `ReferenceError`.\n\n3. Mutability of `const`: `const` creates an immutable variable binding (the identifier cannot be reassigned). However, if the value is an Object or Array, the internal properties or elements remain mutable unless frozen with `Object.freeze()`.\n\n4. Best Practice Guideline: Use `const` by default for all identifiers. Switch to `let` only when the variable binding must change over time (such as loop accumulators). Never use `var` in modern JavaScript codebases.",
      vi: "1. Các tầng phạm vi: Toàn cục (Global Scope), Phạm vi hàm (Function Scope - biến `var`), và Phạm vi khối (Block Scope - biến `let` và `const` trong `{ ... }`).\n\n2. Hoisting & Vùng Chết Tạm Thời (TDZ): `var` được đẩy lên đầu phạm vi và tự gán `undefined`. Ngược lại, `let` và `const` cũng được hoist nhưng nằm trong TDZ và chưa được khởi tạo cho đến khi chạy tới dòng khai báo. Truy cập biến trong TDZ sẽ ném lỗi `ReferenceError`.\n\n3. Tính bất biến của `const`: `const` khóa định danh (không thể gán lại bằng dấu `=`). Tuy nhiên nếu giá trị là Object hay Array, các thuộc tính hoặc phần tử bên trong vẫn có thể chỉnh sửa trừ khi dùng `Object.freeze()`.\n\n4. Thực hành tốt nhất: Luôn ưu tiên dùng `const` làm mặc định. Chỉ chuyển sang `let` khi giá trị biến thực sự cần thay đổi (như biến đếm vòng lặp). Tuyệt đối tránh dùng `var` trong các dự án hiện đại."
    },
    syntax: `// 1. Block scope with const and let
const API_URL = "https://api.example.com/v1";
let retryCount = 0;

if (true) {
  const localSecret = "xyz789";
  let retryCount = 5; // Shadowing outer retryCount within this block
  console.log("Inner retryCount:", retryCount); // 5
}
// console.log(localSecret); // ReferenceError: localSecret is not defined

// 2. const with objects (reassignment forbidden, mutation allowed)
const config = { theme: "dark", autoSave: true };
config.theme = "light"; // Valid mutation
// config = {}; // TypeError: Assignment to constant variable`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Demonstrating Block Scope and TDZ",
          vi: "Minh Họa Block Scope và Hiện Tượng TDZ"
        },
        description: {
          en: "Explores the practical difference between var, let, and const in loops and conditional blocks.",
          vi: "Khám phá sự khác biệt thực tế giữa var, let và const trong vòng lặp và khối điều kiện."
        },
        code: `function runCartSimulation() {
  const discountRate = 0.15;
  let subtotal = 100;

  for (let i = 0; i < 3; i++) {
    // i is fresh in each iteration's block scope
    subtotal += i * 10;
  }

  const order = { id: "ORD-902", total: subtotal * (1 - discountRate) };
  order.status = "processed"; // Allowed object mutation

  return order;
}

console.log(runCartSimulation());`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Believing that `const obj = {}` prevents object properties from being modified.",
          vi: "Nghĩ rằng `const obj = {}` sẽ ngăn chặn hoàn toàn việc sửa đổi các thuộc tính bên trong."
        },
        correction: {
          en: "Use `Object.freeze(obj)` if you require shallow immutability of object properties.",
          vi: "Sử dụng `Object.freeze(obj)` nếu bạn cần ngăn chặn sửa đổi thuộc tính của object."
        },
        explanation: {
          en: "`const` only protects the variable identifier binding from being reassigned to a different memory address; it does not freeze the underlying heap object.",
          vi: "`const` chỉ bảo vệ biến không bị gán lại sang địa chỉ bộ nhớ khác; nó không đóng băng dữ liệu của object trong heap."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Adhere to the 'const by default' convention",
          vi: "Tuân thủ quy tắc 'const làm mặc định'"
        },
        description: {
          en: "Declare all variables with `const`. If and only if a reassignment is necessary, change the declaration to `let`. This prevents accidental mutations.",
          vi: "Khai báo mọi biến với `const`. Chỉ khi nào cần gán lại giá trị mới đổi sang `let`. Điều này ngăn ngừa các đột biến giá trị ngoài ý muốn."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_2_1",
      title: {
        en: "Refactor Legacy var to Scoped let and const",
        vi: "Tái Cấu Trúc var Sang let và const Có Phạm Vi Khối"
      },
      instruction: {
        en: "Refactor the legacy checkout calculation function to use `const` for non-reassigned bindings and `let` for variables that change, eliminating all `var` statements.",
        vi: "Tái cấu trúc hàm tính toán hóa đơn bằng cách dùng `const` cho các giá trị không đổi và `let` cho biến cần gán lại, loại bỏ toàn bộ `var`."
      },
      starterCode: `function calculateInvoice(items, taxRate) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemTotal = item.price * item.quantity;
    total = total + itemTotal;
  }
  var taxAmount = total * taxRate;
  var finalAmount = total + taxAmount;
  return finalAmount;
}`,
      solutionCode: `function calculateInvoice(items, taxRate) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemTotal = item.price * item.quantity;
    total = total + itemTotal;
  }
  const taxAmount = total * taxRate;
  const finalAmount = total + taxAmount;
  return finalAmount;
}`,
      hints: [
        {
          en: "Use let for total and the loop counter i; use const for items, item, itemTotal, taxAmount, and finalAmount.",
          vi: "Dùng let cho total và biến đếm i; dùng const cho item, itemTotal, taxAmount và finalAmount."
        }
      ]
    },
    {
      id: "js_ex_2_2",
      title: {
        en: "Immutable Settings Creator with Object.freeze",
        vi: "Tạo Cấu Hình Bất Biến Với Object.freeze"
      },
      instruction: {
        en: "Write a function `createImmutableConfig(appName, version)` that creates a config object with properties `{ appName, version, createdAt: Date.now() }`, freezes it with `Object.freeze()`, and returns it.",
        vi: "Viết hàm `createImmutableConfig(appName, version)` tạo đối tượng cấu hình `{ appName, version, createdAt: Date.now() }`, đóng băng nó bằng `Object.freeze()` và trả về."
      },
      starterCode: `function createImmutableConfig(appName, version) {
  // Create and freeze config object
}

const config = createImmutableConfig("PaymentGateway", "2.1.0");
console.log(config);`,
      solutionCode: `function createImmutableConfig(appName, version) {
  const config = {
    appName,
    version,
    createdAt: Date.now()
  };
  return Object.freeze(config);
}`,
      hints: [
        {
          en: "Create the object with const, then return Object.freeze(config).",
          vi: "Tạo đối tượng với const, sau đó trả về Object.freeze(config)."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_2",
    title: {
      en: "Scoped Rate Limiter Window",
      vi: "Bộ Giới Hạn Tần Suất Theo Cửa Sổ Thời Gian"
    },
    description: {
      en: "Create a factory function `createRateLimiter(maxRequests, windowMs)` that returns an object with a method `attempt(clientId)`. It should use block and lexical scoping to track request timestamps per client, allow requests if under `maxRequests` within `windowMs`, or reject with `{ allowed: false, retryAfterMs }`.",
      vi: "Tạo hàm factory `createRateLimiter(maxRequests, windowMs)` trả về đối tượng có phương thức `attempt(clientId)`. Sử dụng phạm vi khối và lexical scope để theo dõi timestamp của từng client, cho phép nếu chưa vượt quá `maxRequests` trong `windowMs`, hoặc từ chối với `{ allowed: false, retryAfterMs }`."
    },
    starterCode: `function createRateLimiter(maxRequests, windowMs) {
  // Implement scoped rate limiter
}

const limiter = createRateLimiter(3, 10000);
console.log(limiter.attempt("client_1")); // { allowed: true }`,
    solutionCode: `function createRateLimiter(maxRequests, windowMs) {
  const clientHistory = new Map();

  return {
    attempt(clientId) {
      const now = Date.now();
      if (!clientHistory.has(clientId)) {
        clientHistory.set(clientId, []);
      }

      const timestamps = clientHistory.get(clientId);
      // Filter out timestamps outside window
      const validTimestamps = timestamps.filter(t => now - t < windowMs);
      clientHistory.set(clientId, validTimestamps);

      if (validTimestamps.length >= maxRequests) {
        const oldest = validTimestamps[0];
        const retryAfterMs = windowMs - (now - oldest);
        return { allowed: false, retryAfterMs };
      }

      validTimestamps.push(now);
      return { allowed: true, remaining: maxRequests - validTimestamps.length };
    }
  };
}`,
    hints: [
      {
        en: "Use a Map inside the closure to store an array of timestamp numbers for each clientId.",
        vi: "Dùng một Map bên trong closure để lưu trữ mảng timestamp cho từng clientId."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_2_1",
      type: "single_choice",
      question: {
        en: "What is the Temporal Dead Zone (TDZ) in JavaScript?",
        vi: "Vùng Chết Tạm Thời (Temporal Dead Zone - TDZ) trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "The period of time between entering a scope and the variable's declaration line where let/const cannot be accessed", vi: "Khoảng thời gian từ khi bắt đầu bước vào scope đến khi chạy tới dòng khai báo let/const mà biến không thể truy cập" } },
        { id: "b", text: { en: "A memory leak caused by uncollected closures", vi: "Rò rỉ bộ nhớ gây ra bởi các closure không được thu gom" } },
        { id: "c", text: { en: "The time required for an async network fetch to complete", vi: "Thời gian chờ một tác vụ fetch mạng bất đồng bộ hoàn thành" } },
        { id: "d", text: { en: "A browser crash zone when stack overflow occurs", vi: "Hiện tượng trình duyệt bị treo khi tràn ngăn xếp" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Variables declared with let and const exist in the TDZ from the start of the block until the declaration statement is evaluated. Accessing them inside the TDZ throws a ReferenceError.",
        vi: "Biến let và const nằm trong TDZ từ đầu khối lệnh cho đến khi dòng khai báo được thực thi. Cố tình truy cập biến trong TDZ sẽ ném lỗi ReferenceError."
      }
    },
    {
      id: "js_q_2_2",
      type: "predict_output",
      question: {
        en: "What happens when this code is executed?\n```js\nconsole.log(a);\nvar a = 10;\n```",
        vi: "Điều gì xảy ra khi thực thi đoạn mã sau?\n```js\nconsole.log(a);\nvar a = 10;\n```"
      },
      options: [
        { id: "a", text: { en: "Prints 10", vi: "In ra 10" } },
        { id: "b", text: { en: "Prints undefined", vi: "In ra undefined" } },
        { id: "c", text: { en: "Throws ReferenceError", vi: "Ném lỗi ReferenceError" } },
        { id: "d", text: { en: "Throws TypeError", vi: "Ném lỗi TypeError" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "`var a` is hoisted and initialized with `undefined`. The assignment `a = 10` happens on line 2, so line 1 prints `undefined`.",
        vi: "`var a` được hoist lên đầu và tự gán giá trị `undefined`. Phép gán `a = 10` chỉ diễn ra ở dòng 2, nên dòng 1 in ra `undefined`."
      }
    },
    {
      id: "js_q_2_3",
      type: "predict_output",
      question: {
        en: "What happens when this code is executed?\n```js\nconsole.log(b);\nlet b = 20;\n```",
        vi: "Điều gì xảy ra khi thực thi đoạn mã sau?\n```js\nconsole.log(b);\nlet b = 20;\n```"
      },
      options: [
        { id: "a", text: { en: "Prints undefined", vi: "In ra undefined" } },
        { id: "b", text: { en: "Throws ReferenceError: Cannot access 'b' before initialization", vi: "Ném lỗi ReferenceError: Cannot access 'b' before initialization" } },
        { id: "c", text: { en: "Prints 20", vi: "In ra 20" } },
        { id: "d", text: { en: "Prints null", vi: "In ra null" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "`let b` is hoisted but remains in the Temporal Dead Zone until initialized. Accessing it triggers a ReferenceError.",
        vi: "`let b` được hoist nhưng nằm trong TDZ và chưa được khởi tạo, nên việc truy cập trước dòng khai báo sẽ ném ReferenceError."
      }
    },
    {
      id: "js_q_2_4",
      type: "single_choice",
      question: {
        en: "Which of the following describes the scoping behavior of `var` versus `let` and `const`?",
        vi: "Phát biểu nào sau đây mô tả đúng về phạm vi của `var` so với `let` và `const`?"
      },
      options: [
        { id: "a", text: { en: "`var` is function-scoped; `let` and `const` are block-scoped", vi: "`var` có phạm vi hàm; `let` và `const` có phạm vi khối (block-scoped)" } },
        { id: "b", text: { en: "`var` is block-scoped; `let` is function-scoped", vi: "`var` có phạm vi khối; `let` có phạm vi hàm" } },
        { id: "c", text: { en: "All three have identical scoping rules", vi: "Cả ba đều có quy tắc phạm vi hoàn toàn giống nhau" } },
        { id: "d", text: { en: "`const` is global-only", vi: "`const` chỉ có phạm vi toàn cục" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`var` is constrained only by functions or global scope, ignoring `{ ... }` blocks. `let` and `const` are strictly bound to the enclosing `{ ... }` block.",
        vi: "`var` chỉ bị giới hạn bởi hàm hoặc toàn cục, bỏ qua các khối `{ ... }`. `let` và `const` bị ràng buộc chặt chẽ trong khối `{ ... }` gần nhất."
      }
    },
    {
      id: "js_q_2_5",
      type: "predict_output",
      question: {
        en: "What will the following code output?\n```js\nconst user = { name: 'Sarah' };\nuser.name = 'Jessica';\nconsole.log(user.name);\n```",
        vi: "Đoạn mã sau sẽ in ra kết quả gì?\n```js\nconst user = { name: 'Sarah' };\nuser.name = 'Jessica';\nconsole.log(user.name);\n```"
      },
      options: [
        { id: "a", text: { en: "'Jessica'", vi: "'Jessica'" } },
        { id: "b", text: { en: "TypeError: Assignment to constant variable", vi: "TypeError: Assignment to constant variable" } },
        { id: "c", text: { en: "'Sarah'", vi: "'Sarah'" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`const` prevents reassignment of the variable `user`, but properties of the referenced object in heap memory can still be mutated.",
        vi: "`const` ngăn gán lại biến `user` thành một đối tượng khác, nhưng các thuộc tính bên trong đối tượng vẫn có thể chỉnh sửa tự do."
      }
    },
    {
      id: "js_q_2_6",
      type: "predict_output",
      question: {
        en: "What is the output of the classic async loop bug below?\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n```",
        vi: "Kết quả in ra của đoạn mã lặp bất đồng bộ với var dưới đây là gì?\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n```"
      },
      options: [
        { id: "a", text: { en: "0, 1, 2", vi: "0, 1, 2" } },
        { id: "b", text: { en: "3, 3, 3", vi: "3, 3, 3" } },
        { id: "c", text: { en: "undefined, undefined, undefined", vi: "undefined, undefined, undefined" } },
        { id: "d", text: { en: "0, 0, 0", vi: "0, 0, 0" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "Because `var i` is function/global scoped, all three setTimeout callbacks share the same `i` variable, which equals 3 after the loop finishes.",
        vi: "Do `var i` có phạm vi hàm/toàn cục, cả 3 callback của setTimeout đều cùng tham chiếu đến một biến `i` duy nhất có giá trị là 3 sau khi vòng lặp kết thúc."
      }
    },
    {
      id: "js_q_2_7",
      type: "single_choice",
      question: {
        en: "How does changing `var i` to `let i` fix the async loop problem?",
        vi: "Tại sao đổi `var i` thành `let i` lại giải quyết được lỗi trong vòng lặp bất đồng bộ?"
      },
      options: [
        { id: "a", text: { en: "`let` creates a new lexical binding of `i` for each iteration of the loop", vi: "`let` tạo một binding lexical mới của `i` cho mỗi vòng lặp riêng biệt" } },
        { id: "b", text: { en: "`let` makes setTimeout synchronous", vi: "`let` biến setTimeout thành hàm đồng bộ" } },
        { id: "c", text: { en: "`let` converts numbers to strings automatically", vi: "`let` tự động chuyển số thành chuỗi" } },
        { id: "d", text: { en: "`let` disables the event loop", vi: "`let` tắt cơ chế event loop" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The ECMAScript specification dictates that `for (let i ...)` binds a fresh copy of `i` for each iteration step.",
        vi: "Chuẩn ECMAScript quy định rằng `for (let i ...)` khởi tạo một bản sao `i` mới trong phạm vi khối của từng vòng lặp."
      }
    },
    {
      id: "js_q_2_8",
      type: "fill_blank",
      question: {
        en: "To prevent any modifications or additions to an object's top-level properties, you pass it to Object._____().",
        vi: "Để ngăn chặn mọi chỉnh sửa hoặc thêm mới thuộc tính trên một đối tượng, bạn truyền đối tượng vào Object._____()."
      },
      correctAnswer: "freeze",
      explanation: {
        en: "Object.freeze() makes an object shallowly immutable.",
        vi: "Object.freeze() làm cho đối tượng trở nên bất biến ở cấp nông (shallow immutable)."
      }
    },
    {
      id: "js_q_2_9",
      type: "single_choice",
      question: {
        en: "Can a variable declared with `let` be re-declared in the same block scope?",
        vi: "Một biến đã khai báo bằng `let` có thể được khai báo lại (re-declare) trong cùng một phạm vi khối không?"
      },
      options: [
        { id: "a", text: { en: "Yes, it overrides the previous declaration", vi: "Có, nó sẽ ghi đè khai báo trước" } },
        { id: "b", text: { en: "No, it throws a SyntaxError: Identifier has already been declared", vi: "Không, nó sẽ ném lỗi SyntaxError: Identifier has already been declared" } },
        { id: "c", text: { en: "Yes, but only if the data type changes", vi: "Có, nhưng chỉ khi đổi kiểu dữ liệu" } },
        { id: "d", text: { en: "Only in strict mode", vi: "Chỉ xảy ra trong strict mode" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "`let` and `const` forbid duplicate declarations in the exact same scope.",
        vi: "`let` và `const` nghiêm cấm khai báo trùng tên biến trong cùng một phạm vi khối."
      }
    },
    {
      id: "js_q_2_10",
      type: "code_reasoning",
      question: {
        en: "What is variable shadowing in JavaScript?",
        vi: "Hiện tượng Che Khuất Biến (Variable Shadowing) trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "When an inner block declares a variable with the same name as an outer scope variable, temporarily masking the outer one", vi: "Khi một khối lệnh bên trong khai báo biến trùng tên với biến ở scope ngoài, tạm thời che khuất biến ngoài" } },
        { id: "b", text: { en: "When a variable is deleted by garbage collection", vi: "Khi một biến bị thu gom rác xóa bỏ" } },
        { id: "c", text: { en: "When variables are converted to binary format", vi: "Khi biến được chuyển đổi sang định dạng nhị phân" } },
        { id: "d", text: { en: "When global variables are hidden from the window object", vi: "Khi biến toàn cục bị ẩn khỏi đối tượng window" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Variable shadowing occurs when a variable declared within a local scope has the same name as a variable in an outer scope, resolving references to the innermost binding.",
        vi: "Variable shadowing xảy ra khi biến trong scope con trùng tên với scope cha, JavaScript sẽ ưu tiên lấy giá trị ở scope con gần nhất."
      }
    }
  ]
};

// --- LESSON 03 ---
const lesson03: Lesson = {
  id: "js_lesson_3",
  courseId: "javascript",
  levelId: "basic",
  moduleId: "js_mod_1",
  order: 3,
  title: {
    en: "Data Types: Primitives vs Reference Objects",
    vi: "Kiểu Dữ Liệu: Giá Trị Nguyên Thủy vs Đối Tượng Tham Chiếu"
  },
  summary: {
    en: "Deep dive into the 7 primitive types, Object references, memory stack vs heap allocation, and typeof edge cases.",
    vi: "Nghiên cứu chuyên sâu 7 kiểu nguyên thủy, tham chiếu Object, mô hình bộ nhớ Stack vs Heap và các ngoại lệ của toán tử typeof."
  },
  estimatedMinutes: 20,
  topicId: "js_data_types",
  learn: {
    introduction: {
      en: "JavaScript values are divided into two fundamental categories: Primitives and Reference Objects. Primitives are immutable and copied by value directly on the call stack. Reference types (Objects, Arrays, Functions, Dates) are mutable and stored in the heap, with variables holding pointers to their heap memory address. Mastering this distinction is crucial to preventing unintended side-effects and bugs.",
      vi: "Các giá trị trong JavaScript được chia thành 2 nhóm căn bản: Kiểu nguyên thủy (Primitives) và Đối tượng tham chiếu (Reference Objects). Kiểu nguyên thủy là bất biến (immutable) và được sao chép theo giá trị trên Call Stack. Kiểu tham chiếu (Objects, Arrays, Functions) là khả biến (mutable), được lưu trên Heap và biến chỉ giữ con trỏ địa chỉ bộ nhớ. Hiểu rõ sự khác biệt này giúp bạn tránh các lỗi biến đổi dữ liệu ngoài ý muốn."
    },
    conceptExplanation: {
      en: "1. The 7 Primitive Types: `string`, `number` (IEEE 754 64-bit float), `bigint` (arbitrary precision integers), `boolean` (`true`/`false`), `undefined` (unassigned variable default), `null` (intentional absence of value), and `symbol` (unique immutable identifier).\n\n2. Reference Types: `Object`, `Array`, `Function`, `Map`, `Set`, `Date`, `RegExp`. When passing or assigning an object, you pass a reference to the existing heap structure, not a separate clone.\n\n3. `typeof` Operator & Its Quirks: `typeof 'text'` -> `'string'`, `typeof 42` -> `'number'`, `typeof true` -> `'boolean'`, `typeof undefined` -> `'undefined'`, `typeof Symbol()` -> `'symbol'`, `typeof 10n` -> `'bigint'`, `typeof {}` -> `'object'`, `typeof []` -> `'object'`, `typeof function(){}` -> `'function'`. Historical bug: `typeof null` returns `'object'`.\n\n4. Shallow vs Deep Copying: Shallow copies (`{ ...obj }`, `Object.assign()`, `[...arr]`) duplicate top-level keys but nested objects still share memory references. Deep copies (`structuredClone(obj)`) duplicate entire nested object graphs safely.",
      vi: "1. 7 Kiểu Dữ Liệu Nguyên Thủy: `string`, `number` (số thực 64-bit chuẩn IEEE 754), `bigint` (số nguyên lớn vô hạn), `boolean` (`true`/`false`), `undefined` (biến chưa được gán), `null` (chủ đích không có giá trị), và `symbol` (định danh duy nhất bất biến).\n\n2. Kiểu Dữ Liệu Tham Chiếu: `Object`, `Array`, `Function`, `Map`, `Set`, `Date`. Khi gán hoặc truyền object vào hàm, bạn đang truyền con trỏ tham chiếu đến vùng nhớ Heap chứ không phải tạo bản sao mới.\n\n3. Toán tử `typeof` & Các trường hợp đặc biệt: `typeof null` trả về `'object'` (lỗi lịch sử từ bản JS đầu tiên), `typeof []` là `'object'`, và `typeof function(){}` trả về `'function'`.\n\n4. Sao chép Nông (Shallow) vs Sâu (Deep): Sao chép nông (`{ ...obj }`, `[...arr]`) chỉ sao chép thuộc tính cấp 1, các object lồng nhau vẫn dùng chung tham chiếu. Sao chép sâu (`structuredClone(obj)`) sao chép toàn bộ cây đối tượng độc lập."
    },
    syntax: `// 1. Primitive copy by value
let x = 42;
let y = x;
y = 100;
console.log(x); // 42 (Unchanged)

// 2. Reference copy by memory pointer
const userA = { name: "Alice", role: "Dev" };
const userB = userA;
userB.role = "Lead";
console.log(userA.role); // "Lead" (Mutated!)

// 3. Deep cloning with modern structuredClone API
const original = { id: 1, profile: { bio: "Coder" } };
const deepClone = structuredClone(original);
deepClone.profile.bio = "Architect";
console.log(original.profile.bio); // "Coder" (Preserved!)`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Differentiating Primitives, Shallow Copies and Deep Copies",
          vi: "Phân Biệt Kiểu Nguyên Thủy, Shallow Copy và Deep Copy"
        },
        description: {
          en: "Demonstrates how object mutations propagate through shared references versus deep isolated clones.",
          vi: "Minh họa cách thay đổi dữ liệu lan truyền qua tham chiếu dùng chung so với bản sao sâu độc lập."
        },
        code: `const state = {
  version: 1,
  metadata: { author: "System", tags: ["core", "security"] }
};

// Shallow copy with spread
const shallowCopy = { ...state };
shallowCopy.version = 2; // Independent primitive
shallowCopy.metadata.author = "Admin"; // Mutates shared state.metadata!

console.log("Original author:", state.metadata.author); // "Admin"

// Deep copy with structuredClone
const independentClone = structuredClone(state);
independentClone.metadata.author = "Root";
console.log("Original author after deep clone:", state.metadata.author); // Still "Admin"`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using `typeof val === 'null'` to check for null values.",
          vi: "Dùng `typeof val === 'null'` để kiểm tra giá trị null."
        },
        correction: {
          en: "Use strict equality `val === null`.",
          vi: "Sử dụng so sánh nghiêm ngặt `val === null`."
        },
        explanation: {
          en: "`typeof null` returns `'object'` due to a legacy bug in the original 1995 JavaScript engine implementation.",
          vi: "`typeof null` luôn trả về `'object'` do một lỗi thiết kế từ năm 1995 trong engine JS đầu tiên."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use structuredClone() for deep object duplication",
          vi: "Dùng structuredClone() để sao chép sâu các cấu trúc đối tượng phức tạp"
        },
        description: {
          en: "Avoid `JSON.parse(JSON.stringify(obj))` for deep copies because it loses Dates, RegExps, Maps, Sets, and undefined values. Modern `structuredClone()` handles them reliably.",
          vi: "Tránh dùng `JSON.parse(JSON.stringify(obj))` vì nó làm mất Date, Map, Set, RegExp và undefined. Hàm chuẩn `structuredClone()` xử lý chính xác và tối ưu."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_3_1",
      title: {
        en: "Accurate Type Inspector Function",
        vi: "Xây Dựng Hàm Kiểm Tra Kiểu Dữ Liệu Chính Xác"
      },
      instruction: {
        en: "Implement a function `getExactType(value)` that returns exact type strings: 'null', 'array', 'object', 'date', 'regexp', 'number', 'string', 'boolean', 'undefined', 'bigint', 'symbol', or 'function'.",
        vi: "Cài đặt hàm `getExactType(value)` trả về chuỗi tên kiểu chính xác: 'null', 'array', 'object', 'date', 'regexp', 'number', 'string', 'boolean', 'undefined', 'bigint', 'symbol' hoặc 'function'."
      },
      starterCode: `function getExactType(value) {
  // Your code here
}

console.log(getExactType(null)); // 'null'
console.log(getExactType([1, 2])); // 'array'`,
      solutionCode: `function getExactType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Date) return 'date';
  if (value instanceof RegExp) return 'regexp';
  return typeof value;
}`,
      hints: [
        {
          en: "Check value === null first, Array.isArray(value), then instance checks, before falling back to typeof.",
          vi: "Kiểm tra value === null trước, sau đó dùng Array.isArray(value), instanceof và cuối cùng là typeof."
        }
      ]
    },
    {
      id: "js_ex_3_2",
      title: {
        en: "Safe State Updater (Immutability)",
        vi: "Hàm Cập Nhật Trạng Thái An Toàn Bất Biến"
      },
      instruction: {
        en: "Write a function `updateUserProfile(user, newSkills)` that takes a user object with a nested `skills` array, and returns a new user object with `newSkills` appended without mutating the input user object.",
        vi: "Viết hàm `updateUserProfile(user, newSkills)` nhận vào user có mảng lồng `skills`, trả về một user mới đã được thêm `newSkills` mà không làm thay đổi user truyền vào."
      },
      starterCode: `function updateUserProfile(user, newSkills) {
  // Return fresh object without mutating input
}

const current = { id: 10, skills: ["JS", "CSS"] };
const next = updateUserProfile(current, ["Node"]);
console.log(current.skills); // Should still be ["JS", "CSS"]`,
      solutionCode: `function updateUserProfile(user, newSkills) {
  return {
    ...user,
    skills: [...user.skills, ...newSkills]
  };
}`,
      hints: [
        {
          en: "Spread the outer user object and create a fresh skills array with [...user.skills, ...newSkills].",
          vi: "Spread đối tượng user ngoài và tạo mảng skills mới với [...user.skills, ...newSkills]."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_3",
    title: {
      en: "Deep Object Difference Engine",
      vi: "Engine So Sánh & Tìm Điểm Khác Biệt Giữa 2 Đối Tượng"
    },
    description: {
      en: "Build a function `findObjectDiff(objA, objB)` that recursively compares two objects and returns an object detailing changed properties with `{ oldValue, newValue }`. Ignore matching keys.",
      vi: "Xây dựng hàm `findObjectDiff(objA, objB)` so sánh đệ quy 2 đối tượng và trả về một đối tượng chứa các thuộc tính bị thay đổi `{ oldValue, newValue }`. Bỏ qua các trường có giá trị bằng nhau."
    },
    starterCode: `function findObjectDiff(objA, objB) {
  // Implement recursive object diff
}

const oldConfig = { theme: "light", env: { debug: false, port: 3000 } };
const newConfig = { theme: "dark", env: { debug: true, port: 3000 } };
console.log(findObjectDiff(oldConfig, newConfig));
// { theme: { oldValue: 'light', newValue: 'dark' }, 'env.debug': { oldValue: false, newValue: true } }`,
    solutionCode: `function findObjectDiff(objA, objB, prefix = '') {
  const diffs = {};
  const allKeys = new Set([...Object.keys(objA || {}), ...Object.keys(objB || {})]);

  allKeys.forEach(key => {
    const fullPath = prefix ? \`\${prefix}.\${key}\` : key;
    const valA = objA ? objA[key] : undefined;
    const valB = objB ? objB[key] : undefined;

    if (valA !== valB) {
      if (
        typeof valA === 'object' && valA !== null &&
        typeof valB === 'object' && valB !== null &&
        !Array.isArray(valA) && !Array.isArray(valB)
      ) {
        Object.assign(diffs, findObjectDiff(valA, valB, fullPath));
      } else {
        diffs[fullPath] = { oldValue: valA, newValue: valB };
      }
    }
  });

  return diffs;
}`,
    hints: [
      {
        en: "Use recursive traversal for nested plain objects and record differences at the dotted key path.",
        vi: "Duyệt đệ quy với các object lồng nhau và lưu lại các thay đổi theo đường dẫn key phân tách bằng dấu chấm."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_3_1",
      type: "single_choice",
      question: {
        en: "Which of the following is NOT a JavaScript primitive data type?",
        vi: "Kiểu dữ liệu nào sau đây KHÔNG phải là kiểu nguyên thủy (primitive) trong JavaScript?"
      },
      options: [
        { id: "a", text: { en: "Symbol", vi: "Symbol" } },
        { id: "b", text: { en: "BigInt", vi: "BigInt" } },
        { id: "c", text: { en: "Array", vi: "Array" } },
        { id: "d", text: { en: "Undefined", vi: "Undefined" } }
      ],
      correctAnswer: "c",
      explanation: {
        en: "Array is a specialized Object subtype (reference type). The 7 primitives are string, number, bigint, boolean, undefined, symbol, and null.",
        vi: "Array là một dạng đối tượng tham chiếu đặc biệt. 7 kiểu nguyên thủy gồm string, number, bigint, boolean, undefined, symbol và null."
      }
    },
    {
      id: "js_q_3_2",
      type: "predict_output",
      question: {
        en: "What is the return value of `typeof null` in standard JavaScript?",
        vi: "Giá trị trả về của `typeof null` trong JavaScript chuẩn là gì?"
      },
      options: [
        { id: "a", text: { en: "'null'", vi: "'null'" } },
        { id: "b", text: { en: "'object'", vi: "'object'" } },
        { id: "c", text: { en: "'undefined'", vi: "'undefined'" } },
        { id: "d", text: { en: "'primitive'", vi: "'primitive'" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "Due to a historical legacy bug in JS type tag bit representation, `typeof null` evaluates to `'object'`.",
        vi: "Do lỗi biểu diễn bit phân loại kiểu từ phiên bản JS đầu tiên, `typeof null` luôn trả về `'object'`."
      }
    },
    {
      id: "js_q_3_3",
      type: "predict_output",
      question: {
        en: "What is the output of the following code?\n```js\nconst arr1 = [1, 2, 3];\nconst arr2 = arr1;\narr2.push(4);\nconsole.log(arr1.length);\n```",
        vi: "Kết quả in ra của đoạn mã sau là gì?\n```js\nconst arr1 = [1, 2, 3];\nconst arr2 = arr1;\narr2.push(4);\nconsole.log(arr1.length);\n```"
      },
      options: [
        { id: "a", text: { en: "3", vi: "3" } },
        { id: "b", text: { en: "4", vi: "4" } },
        { id: "c", text: { en: "undefined", vi: "undefined" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "`arr1` and `arr2` point to the exact same array in heap memory, so mutating via `arr2` affects `arr1`.",
        vi: "`arr1` và `arr2` cùng trỏ đến một mảng duy nhất trong heap memory, do đó thao tác push trên `arr2` làm thay đổi độ dài của `arr1`."
      }
    },
    {
      id: "js_q_3_4",
      type: "single_choice",
      question: {
        en: "How are BigInt values created in modern JavaScript?",
        vi: "Giá trị BigInt được tạo ra như thế nào trong JavaScript hiện đại?"
      },
      options: [
        { id: "a", text: { en: "Appending an 'n' suffix (e.g. 9007199254740991n) or calling BigInt()", vi: "Thêm hậu tố 'n' (ví dụ 9007199254740991n) hoặc gọi hàm BigInt()" } },
        { id: "b", text: { en: "Using new Number.Big()", vi: "Dùng new Number.Big()" } },
        { id: "c", text: { en: "Using the int64 keyword", vi: "Dùng từ khóa int64" } },
        { id: "d", text: { en: "Importing from 'math/bigint'", vi: "Import từ thư viện 'math/bigint'" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "BigInt literals use the `n` suffix (e.g., `12345678901234567890n`) or the `BigInt(val)` function.",
        vi: "BigInt được định nghĩa bằng hậu tố `n` (ví dụ `12345678901234567890n`) hoặc gọi hàm `BigInt(val)`."
      }
    },
    {
      id: "js_q_3_5",
      type: "single_choice",
      question: {
        en: "What is the primary benefit of the Symbol primitive type?",
        vi: "Lợi ích chính của kiểu dữ liệu nguyên thủy Symbol là gì?"
      },
      options: [
        { id: "a", text: { en: "Creating guaranteed unique, non-colliding object property keys", vi: "Tạo các key thuộc tính đối tượng duy nhất, đảm bảo không bao giờ bị xung đột tên" } },
        { id: "b", text: { en: "Compressing memory footprint by 50%", vi: "Nén dung lượng bộ nhớ xuống 50%" } },
        { id: "c", text: { en: "Enabling multi-threaded concurrency", vi: "Bật khả năng đa luồng đồng thời" } },
        { id: "d", text: { en: "Encrypting string values", vi: "Mã hóa các giá trị chuỗi" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Every `Symbol()` call generates an immutable, guaranteed unique token suitable for private/internal object keys.",
        vi: "Mỗi lời gọi `Symbol()` sinh ra một token duy nhất không trùng lặp, rất thích hợp làm key ẩn/nội bộ cho object."
      }
    },
    {
      id: "js_q_3_6",
      type: "predict_output",
      question: {
        en: "What will `Symbol('id') === Symbol('id')` evaluate to?",
        vi: "`Symbol('id') === Symbol('id')` sẽ trả về giá trị gì?"
      },
      options: [
        { id: "a", text: { en: "true", vi: "true" } },
        { id: "b", text: { en: "false", vi: "false" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "b",
      explanation: {
        en: "Symbols are always distinct and unique, even if created with identical description strings.",
        vi: "Các Symbol luôn luôn độc nhất, ngay cả khi được tạo với chuỗi mô tả hoàn toàn giống nhau."
      }
    },
    {
      id: "js_q_3_7",
      type: "single_choice",
      question: {
        en: "What native JavaScript function performs a standard deep copy of an object graph?",
        vi: "Hàm tích hợp sẵn nào trong JavaScript chuẩn thực hiện sao chép sâu (deep copy) một cây đối tượng?"
      },
      options: [
        { id: "a", text: { en: "structuredClone()", vi: "structuredClone()" } },
        { id: "b", text: { en: "Object.clone()", vi: "Object.clone()" } },
        { id: "c", text: { en: "Array.deep()", vi: "Array.deep()" } },
        { id: "d", text: { en: "Reflect.duplicate()", vi: "Reflect.duplicate()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`structuredClone()` is the modern standard Web API and Node.js function for deep cloning serializable JavaScript data structures.",
        vi: "`structuredClone()` là hàm chuẩn hiện đại trong Web API và Node.js để sao chép sâu các cấu trúc dữ liệu JavaScript."
      }
    },
    {
      id: "js_q_3_8",
      type: "fill_blank",
      question: {
        en: "To reliably determine if a value is an Array in JavaScript, you call Array._____().",
        vi: "Để kiểm tra một giá trị có phải là Mảng hay không một cách đáng tin cậy, bạn gọi Array._____()."
      },
      correctAnswer: "isArray",
      explanation: {
        en: "Array.isArray(val) reliably checks across iframe boundaries, whereas `instanceof Array` can fail across execution contexts.",
        vi: "Array.isArray(val) kiểm tra chính xác mảng ngay cả giữa các iframe khác nhau, trong khi `instanceof Array` có thể thất bại khi khác context."
      }
    },
    {
      id: "js_q_3_9",
      type: "single_choice",
      question: {
        en: "Where are primitive values vs object instances typically allocated in the JavaScript engine memory model?",
        vi: "Các giá trị nguyên thủy vs đối tượng thường được cấp phát ở đâu trong mô hình bộ nhớ của engine JavaScript?"
      },
      options: [
        { id: "a", text: { en: "Primitives on the Call Stack; Objects in the Heap", vi: "Giá trị nguyên thủy trên Call Stack; Đối tượng trên Heap" } },
        { id: "b", text: { en: "Primitives in the Heap; Objects in the Stack", vi: "Giá trị nguyên thủy trên Heap; Đối tượng trên Stack" } },
        { id: "c", text: { en: "Both exclusively on the CPU Registers", vi: "Cả hai chỉ lưu trên CPU Registers" } },
        { id: "d", text: { en: "In browser LocalStorage", vi: "Trong LocalStorage trình duyệt" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Fixed-size primitive values are stored directly on the execution stack frame; dynamic-size objects are allocated in the heap with pointers on the stack.",
        vi: "Các giá trị nguyên thủy kích thước cố định được lưu trực tiếp trên Stack; các đối tượng có kích thước động được cấp phát trên Heap và trỏ qua con trỏ trên Stack."
      }
    },
    {
      id: "js_q_3_10",
      type: "code_reasoning",
      question: {
        en: "Why does `let s = 'hello'; s[0] = 'H'; console.log(s);` still log 'hello'?",
        vi: "Tại sao `let s = 'hello'; s[0] = 'H'; console.log(s);` vẫn in ra 'hello'?"
      },
      options: [
        { id: "a", text: { en: "Strings in JavaScript are immutable primitives; index mutations fail silently (or throw in strict mode)", vi: "Chuỗi trong JavaScript là kiểu nguyên thủy bất biến; phép gán theo chỉ số bị bỏ qua trong im lặng (hoặc báo lỗi trong strict mode)" } },
        { id: "b", text: { en: "Strings must be converted to Buffer first", vi: "Chuỗi phải chuyển thành Buffer trước" } },
        { id: "c", text: { en: "Because let prevents variable reassignment", vi: "Vì let ngăn gán lại giá trị" } },
        { id: "d", text: { en: "Unicode characters cannot be capitalized", vi: "Ký tự Unicode không thể viết hoa" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "All primitives including strings are completely immutable in JavaScript. Individual characters cannot be overwritten by index assignment.",
        vi: "Mọi giá trị nguyên thủy bao gồm chuỗi đều là bất biến. Bạn không thể thay đổi từng ký tự bên trong chuỗi thông qua phép gán chỉ số."
      }
    }
  ]
};

// --- LESSON 04 ---
const lesson04: Lesson = {
  id: "js_lesson_4",
  courseId: "javascript",
  levelId: "basic",
  moduleId: "js_mod_1",
  order: 4,
  title: {
    en: "Type Coercion, Equality (== vs ===) & Truthiness",
    vi: "Ép Kiểu Tự Động, So Sánh (== vs ===) & Giá Trị Truthy/Falsy"
  },
  summary: {
    en: "Master implicit vs explicit type coercion, the Abstract Equality Comparison algorithm, truthy/falsy rules, and short-circuit operators.",
    vi: "Làm chủ ép kiểu ngầm định vs tường minh, thuật toán so sánh trừu tượng, quy tắc truthy/falsy và các toán tử đoản mạch (short-circuit)."
  },
  estimatedMinutes: 20,
  topicId: "js_coercion_truthy",
  learn: {
    introduction: {
      en: "JavaScript is a dynamically and weakly typed language, meaning the runtime automatically converts values between types when operations involve mismatched types (implicit type coercion). While coercion provides flexibility, unexpected implicit conversions are one of the most frequent sources of runtime bugs in web development. In this lesson, you will master the exact rules of explicit conversions, strict vs loose equality, and conditional truthiness.",
      vi: "JavaScript là ngôn ngữ định kiểu động và lỏng lẻo (weakly typed), nghĩa là runtime sẽ tự động chuyển đổi kiểu dữ liệu khi các toán hạng không cùng kiểu (ép kiểu ngầm định - implicit coercion). Mặc dù linh hoạt, ép kiểu ngầm định là nguyên nhân hàng đầu gây ra các lỗi tiềm ẩn. Bài học này sẽ giúp bạn làm chủ quy tắc ép kiểu tường minh, phân biệt triệt để `==` vs `===` và quy tắc xét điều kiện truthy/falsy."
    },
    conceptExplanation: {
      en: "1. The 8 Falsy Values in JavaScript: When evaluated in boolean contexts, exactly 8 values coerce to `false`: `false`, `0`, `-0`, `0n` (BigInt zero), `\"\"` (empty string), `null`, `undefined`, and `NaN`. Everything else in JavaScript is TRUTHY (including `[]`, `{}`, `'0'`, and `'false'`).\n\n2. Strict Equality (`===`) vs Loose Equality (`==`): `===` checks both value AND type without coercion. `==` performs the complex Abstract Equality Comparison algorithm, attempting to coerce operands to matching primitives before comparing.\n\n3. Explicit Type Conversion: Best practice is always explicit conversion using `Number(val)`, `String(val)`, `Boolean(val)`, or `parseInt(str, 10)`.\n\n4. Logical Short-Circuit Operators: `&&` (returns first falsy operand or the last truthy), `||` (returns first truthy operand or the last falsy), and `??` (Nullish Coalescing - returns right side ONLY if left side is `null` or `undefined`, preserving `0`, `\"\"`, and `false`).",
      vi: "1. 8 Giá Trị Falsy Trong JavaScript: Khi ép về boolean, chỉ có đúng 8 giá trị trở thành `false`: `false`, `0`, `-0`, `0n`, `\"\"` (chuỗi rỗng), `null`, `undefined`, và `NaN`. Tất cả các giá trị còn lại đều là TRUTHY (kể cả mảng rỗng `[]`, object rỗng `{}`, chuỗi `'0'`, chuỗi `'false'`).\n\n2. So Sánh Tuyệt Đối (`===`) vs So Sánh Tương Đối (`==`): `===` so sánh cả giá trị VÀ kiểu dữ liệu mà không ép kiểu. `==` thực hiện thuật toán ép kiểu tự động đầy rủi ro trước khi so sánh.\n\n3. Ép Kiểu Tường Minh: Luôn ưu tiên ép kiểu rõ ràng bằng `Number(val)`, `String(val)`, `Boolean(val)` hoặc `parseInt(str, 10)`.\n\n4. Các Toán Tử Đoản Mạch: `&&` (trả về giá trị falsy đầu tiên hoặc giá trị cuối), `||` (trả về giá trị truthy đầu tiên), và `??` (Nullish Coalescing - chỉ lấy vế phải khi vế trái là `null` hoặc `undefined`, giữ lại `0`, `\"\"` và `false`)."
    },
    syntax: `// 1. Strict vs Loose equality
console.log(0 == false);   // true (Dangerous coercion)
console.log(0 === false);  // false (Correct strict check)

console.log("" == 0);      // true
console.log("" === 0);     // false

// 2. Truthy/Falsy & Short-circuiting
const userCount = 0;
// || replaces 0 because 0 is falsy!
const displayA = userCount || "Default 10"; // "Default 10" (Bug!)

// ?? (Nullish coalescing) only triggers on null / undefined
const displayB = userCount ?? 10;           // 0 (Correct!)

// 3. Explicit conversions
const rawInput = "42.85px";
const numericVal = parseFloat(rawInput);    // 42.85
const boolFlag = Boolean(numericVal);       // true`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Configuration Fallback with Nullish Coalescing (??) vs Logical OR (||)",
          vi: "Xử Lý Giá Trị Mặc Định Bằng Nullish Coalescing (??) vs Logical OR (||)"
        },
        description: {
          en: "Demonstrates why ?? is essential when 0, empty string, or false are valid business values.",
          vi: "Minh họa lý do tại sao ?? là cần thiết khi số 0, chuỗi rỗng hoặc false là các giá trị hợp lệ."
        },
        code: `function buildServerConfig(customOptions = {}) {
  return {
    port: customOptions.port ?? 8080,
    timeoutMs: customOptions.timeoutMs ?? 5000,
    allowGuest: customOptions.allowGuest ?? false,
    bannerText: customOptions.bannerText ?? "Welcome to API"
  };
}

// Even with 0 timeout or false guest, nullish coalescing preserves user intent!
const custom = { timeoutMs: 0, allowGuest: false, bannerText: "" };
console.log(buildServerConfig(custom));
// { port: 8080, timeoutMs: 0, allowGuest: false, bannerText: "" }`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Using `||` for default parameter fallbacks when `0` or `false` are valid inputs.",
          vi: "Dùng `||` để gán giá trị mặc định khi `0` hoặc `false` là các giá trị đầu vào hợp lệ."
        },
        correction: {
          en: "Use the Nullish Coalescing operator `??` instead.",
          vi: "Sử dụng toán tử Nullish Coalescing `??` thay thế."
        },
        explanation: {
          en: "Because `0`, `\"\"`, and `false` are falsy in JS, `||` overrides them with the fallback default, corrupting legitimate user inputs.",
          vi: "Vì `0`, `\"\"` và `false` là giá trị falsy, `||` sẽ tự động ghi đè chúng bằng giá trị mặc định, làm sai lệch dữ liệu người dùng."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Always use triple equals (===) for equality comparisons",
          vi: "Luôn dùng toán tử 3 dấu bằng (===) để so sánh bằng"
        },
        description: {
          en: "Enforce strict equality throughout your codebase to eliminate unexpected type coercion anomalies and subtle security vulnerabilities.",
          vi: "Sử dụng so sánh nghiêm ngặt `===` và `!==` trong toàn bộ mã nguồn để loại trừ hoàn toàn các hành vi ép kiểu bất thường."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_4_1",
      title: {
        en: "Strict Form Validator",
        vi: "Bộ Kiểm Tra Tính Hợp Lệ Của Form Nghiêm Ngặt"
      },
      instruction: {
        en: "Implement a function `validateSubmission(payload)` that checks: `username` must be a non-empty string, `age` must be a valid number >= 18 (not NaN), and `agreedTerms` must strictly equal boolean `true`. Return `{ isValid: boolean, error?: string }`.",
        vi: "Cài đặt hàm `validateSubmission(payload)` kiểm tra: `username` phải là chuỗi không rỗng, `age` phải là số hợp lệ >= 18 (không phải NaN) và `agreedTerms` phải bằng đúng boolean `true`. Trả về `{ isValid: boolean, error?: string }`."
      },
      starterCode: `function validateSubmission(payload) {
  // Validate strictly without coercion bugs
}

console.log(validateSubmission({ username: "alex", age: "20", agreedTerms: true }));`,
      solutionCode: `function validateSubmission(payload) {
  if (!payload || typeof payload !== 'object') {
    return { isValid: false, error: 'Invalid payload' };
  }
  if (typeof payload.username !== 'string' || payload.username.trim() === '') {
    return { isValid: false, error: 'Username must be a non-empty string' };
  }
  const age = typeof payload.age === 'number' ? payload.age : Number(payload.age);
  if (isNaN(age) || age < 18) {
    return { isValid: false, error: 'Age must be at least 18' };
  }
  if (payload.agreedTerms !== true) {
    return { isValid: false, error: 'Must accept terms' };
  }
  return { isValid: true };
}`,
      hints: [
        {
          en: "Check typeof payload.username === 'string', trim it, convert age explicitly with Number(payload.age), and check payload.agreedTerms === true.",
          vi: "Kiểm tra typeof payload.username === 'string', trim chuỗi, ép kiểu age rõ ràng bằng Number() và kiểm tra payload.agreedTerms === true."
        }
      ]
    },
    {
      id: "js_ex_4_2",
      title: {
        en: "Filter Non-Empty Falsy Safe List",
        vi: "Lọc Danh Sách Giữ Lại Các Giá Trị Hợp Lệ"
      },
      instruction: {
        en: "Write a function `cleanRecordValues(record)` that removes properties that are strictly `null` or `undefined`, but keeps `0`, `false`, and `\"\"` intact.",
        vi: "Viết hàm `cleanRecordValues(record)` loại bỏ các thuộc tính có giá trị là `null` hoặc `undefined`, nhưng giữ nguyên các giá trị `0`, `false` và `\"\"`."
      },
      starterCode: `function cleanRecordValues(record) {
  // Return new object without null or undefined properties
}

console.log(cleanRecordValues({ a: 0, b: null, c: false, d: undefined, e: "valid" }));
// Should return: { a: 0, c: false, e: "valid" }`,
      solutionCode: `function cleanRecordValues(record) {
  const result = {};
  for (const key of Object.keys(record)) {
    if (record[key] !== null && record[key] !== undefined) {
      result[key] = record[key];
    }
  }
  return result;
}`,
      hints: [
        {
          en: "Iterate over keys and include properties only when record[key] !== null && record[key] !== undefined.",
          vi: "Lặp qua các key và chỉ đưa vào kết quả khi record[key] !== null && record[key] !== undefined."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_4",
    title: {
      en: "Enterprise Query String Parser & Coercer",
      vi: "Bộ Phân Tích & Ép Kiểu Tham Số Query String Doanh Nghiệp"
    },
    description: {
      en: "Create a function `parseQueryString(queryString)` that parses a URL query string (e.g. `?page=1&active=true&discount=0&tags=js,css&filter=null`) into a typed JavaScript object where numeric strings convert to Numbers, 'true'/'false' convert to Booleans, 'null' converts to null, comma lists convert to arrays, and URL encodings are decoded.",
      vi: "Xây dựng hàm `parseQueryString(queryString)` phân tích chuỗi query (ví dụ `?page=1&active=true&discount=0&tags=js,css&filter=null`) thành đối tượng JS có kiểu dữ liệu chuẩn: chuỗi số thành Number, 'true'/'false' thành Boolean, 'null' thành null, danh sách phân cách bởi dấu phẩy thành mảng và giải mã ký tự URL."
    },
    starterCode: `function parseQueryString(queryString) {
  // Parse and coerce types
}

const params = parseQueryString("?page=2&limit=50&active=true&score=0&tags=frontend,react&author=null");
console.log(params);`,
    solutionCode: `function parseQueryString(queryString) {
  if (!queryString) return {};
  const cleaned = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  if (!cleaned) return {};

  const result = {};
  const pairs = cleaned.split('&');

  for (const pair of pairs) {
    if (!pair) continue;
    const [rawKey, rawVal] = pair.split('=');
    const key = decodeURIComponent(rawKey);
    const val = rawVal !== undefined ? decodeURIComponent(rawVal) : '';

    if (val === 'true') {
      result[key] = true;
    } else if (val === 'false') {
      result[key] = false;
    } else if (val === 'null') {
      result[key] = null;
    } else if (val === 'undefined') {
      result[key] = undefined;
    } else if (!isNaN(Number(val)) && val.trim() !== '') {
      result[key] = Number(val);
    } else if (val.includes(',')) {
      result[key] = val.split(',').map(s => s.trim());
    } else {
      result[key] = val;
    }
  }

  return result;
}`,
    hints: [
      {
        en: "Split by '&', split each item by '=', decodeURIComponent, and check against 'true', 'false', 'null', numbers, and commas.",
        vi: "Cắt chuỗi theo '&', sau đó cắt từng cặp theo '=', dùng decodeURIComponent và đối chiếu lần lượt với 'true', 'false', 'null', số và dấu phẩy."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_4_1",
      type: "single_choice",
      question: {
        en: "Which of the following values is TRUTHY in JavaScript?",
        vi: "Giá trị nào sau đây là TRUTHY trong JavaScript?"
      },
      options: [
        { id: "a", text: { en: "[] (empty array)", vi: "[] (mảng rỗng)" } },
        { id: "b", text: { en: "0", vi: "0" } },
        { id: "c", text: { en: "\"\" (empty string)", vi: "\"\" (chuỗi rỗng)" } },
        { id: "d", text: { en: "NaN", vi: "NaN" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "In JavaScript, all objects and arrays (even empty `[]` and `{}`) are truthy. Only the 8 falsy values evaluate to false.",
        vi: "Trong JavaScript, mọi object và mảng (kể cả mảng rỗng `[]` và `{}`) đều là truthy. Chỉ có 8 giá trị falsy chuẩn mới mang giá trị false."
      }
    },
    {
      id: "js_q_4_2",
      type: "predict_output",
      question: {
        en: "What will `console.log([] == false)` output?",
        vi: "`console.log([] == false)` sẽ in ra kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "true", vi: "true" } },
        { id: "b", text: { en: "false", vi: "false" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Loose equality coerces `[]` to primitive `\"\"`, and `false` to `0`. Then `\"\" == 0` coerces `\"\"` to `0`, resulting in `0 == 0` which is `true`.",
        vi: "So sánh `==` ép kiểu `[]` thành chuỗi `\"\"`, và `false` thành `0`. Tiếp tục `\"\" == 0` ép `\"\"` thành `0`, dẫn đến `0 == 0` là `true`."
      }
    },
    {
      id: "js_q_4_3",
      type: "predict_output",
      question: {
        en: "What will `console.log([] === false)` output?",
        vi: "`console.log([] === false)` sẽ in ra kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "false", vi: "false" } },
        { id: "b", text: { en: "true", vi: "true" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Strict equality `===` does not perform coercion. An Object (Array) and a Boolean are different types, so it immediately returns `false`.",
        vi: "So sánh nghiêm ngặt `===` không ép kiểu. Một Object (mảng) và một Boolean khác kiểu nhau nên ngay lập tức trả về `false`."
      }
    },
    {
      id: "js_q_4_4",
      type: "single_choice",
      question: {
        en: "What is the key difference between the `||` (logical OR) and `??` (nullish coalescing) operators?",
        vi: "Điểm khác biệt cốt lõi giữa toán tử `||` (OR) và `??` (Nullish Coalescing) là gì?"
      },
      options: [
        { id: "a", text: { en: "`||` triggers on any falsy value (0, false, \"\"); `??` triggers ONLY on null and undefined", vi: "`||` kích hoạt với bất kỳ giá trị falsy nào (0, false, \"\"); `??` CHỈ kích hoạt khi giá trị là null hoặc undefined" } },
        { id: "b", text: { en: "`??` is asynchronous while `||` is synchronous", vi: "`??` là bất đồng bộ còn `||` là đồng bộ" } },
        { id: "c", text: { en: "`||` only works with numbers", vi: "`||` chỉ hoạt động với số" } },
        { id: "d", text: { en: "There is no difference", vi: "Không có sự khác biệt" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`??` only falls back when the left operand is null or undefined, preserving 0, empty strings, and false.",
        vi: "`??` chỉ gán giá trị dự phòng khi vế trái là null hoặc undefined, bảo tồn các giá trị 0, chuỗi rỗng và false."
      }
    },
    {
      id: "js_q_4_5",
      type: "predict_output",
      question: {
        en: "What will `console.log(1 + '2' + 3)` output?",
        vi: "`console.log(1 + '2' + 3)` sẽ in ra kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "'123'", vi: "'123'" } },
        { id: "b", text: { en: "6", vi: "6" } },
        { id: "c", text: { en: "'33'", vi: "'33'" } },
        { id: "d", text: { en: "NaN", vi: "NaN" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`1 + '2'` coerces 1 to string, resulting in `'12'`. Then `'12' + 3` concatenates to `'123'`.",
        vi: "`1 + '2'` ép số 1 thành chuỗi và nối thành `'12'`. Sau đó `'12' + 3` tiếp tục nối chuỗi thành `'123'`."
      }
    },
    {
      id: "js_q_4_6",
      type: "predict_output",
      question: {
        en: "What will `console.log('10' - 2)` output?",
        vi: "`console.log('10' - 2)` sẽ in ra kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "8", vi: "8" } },
        { id: "b", text: { en: "'8'", vi: "'8'" } },
        { id: "c", text: { en: "NaN", vi: "NaN" } },
        { id: "d", text: { en: "'10-2'", vi: "'10-2'" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Unlike `+` which supports string concatenation, the `-` subtraction operator strictly coerces both operands to Numbers, giving `10 - 2 = 8`.",
        vi: "Khác với `+` có thể dùng để nối chuỗi, toán tử trừ `-` luôn ép cả hai toán hạng sang kiểu số, tạo ra `10 - 2 = 8`."
      }
    },
    {
      id: "js_q_4_7",
      type: "single_choice",
      question: {
        en: "How does `Number.isNaN(val)` differ from global `isNaN(val)`?",
        vi: "`Number.isNaN(val)` khác với hàm toàn cục `isNaN(val)` như thế nào?"
      },
      options: [
        { id: "a", text: { en: "`Number.isNaN()` does NOT coerce the input and only returns true if the value is strictly NaN of type number", vi: "`Number.isNaN()` KHÔNG ép kiểu và chỉ trả về true nếu giá trị là kiểu number và có giá trị đúng là NaN" } },
        { id: "b", text: { en: "`Number.isNaN()` is deprecated", vi: "`Number.isNaN()` đã bị khai tử" } },
        { id: "c", text: { en: "Global `isNaN()` is faster in benchmarks", vi: "Hàm toàn cục `isNaN()` chạy nhanh hơn" } },
        { id: "d", text: { en: "They are completely identical aliases", vi: "Chúng là hai alias hoàn toàn giống nhau" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Global `isNaN('hello')` coerces `'hello'` to `NaN` and returns `true`. `Number.isNaN('hello')` does not coerce and correctly returns `false`.",
        vi: "Hàm toàn cục `isNaN('hello')` tự ép chuỗi sang NaN và trả về `true` (dễ gây hiểu nhầm). `Number.isNaN('hello')` kiểm tra chuẩn xác không ép kiểu và trả về `false`."
      }
    },
    {
      id: "js_q_4_8",
      type: "fill_blank",
      question: {
        en: "In modern JavaScript, the double-question mark operator (??) is known as the _____ coalescing operator.",
        vi: "Trong JavaScript hiện đại, toán tử hai dấu chấm hỏi (??) được gọi là toán tử _____ coalescing."
      },
      correctAnswer: "nullish",
      explanation: {
        en: "The `??` operator is formally named the Nullish Coalescing operator in ECMAScript.",
        vi: "Toán tử `??` có tên gọi chuẩn trong đặc tả ECMAScript là Nullish Coalescing operator."
      }
    },
    {
      id: "js_q_4_9",
      type: "predict_output",
      question: {
        en: "What will `console.log(null == undefined)` evaluate to?",
        vi: "`console.log(null == undefined)` sẽ trả về giá trị gì?"
      },
      options: [
        { id: "a", text: { en: "true", vi: "true" } },
        { id: "b", text: { en: "false", vi: "false" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "In the ECMAScript Abstract Equality algorithm, `null == undefined` is explicitly defined to evaluate to `true` (while `null === undefined` is `false`).",
        vi: "Theo thuật toán Abstract Equality của ECMAScript, quy tắc quy định `null == undefined` luôn là `true` (trong khi `null === undefined` là `false`)."
      }
    },
    {
      id: "js_q_4_10",
      type: "code_reasoning",
      question: {
        en: "What is the result of `const val = '' && 'hello'; console.log(val);`?",
        vi: "Kết quả của đoạn mã `const val = '' && 'hello'; console.log(val);` là gì?"
      },
      options: [
        { id: "a", text: { en: "'' (empty string)", vi: "'' (chuỗi rỗng)" } },
        { id: "b", text: { en: "'hello'", vi: "'hello'" } },
        { id: "c", text: { en: "false", vi: "false" } },
        { id: "d", text: { en: "true", vi: "true" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The `&&` operator short-circuits and returns the first falsy operand encountered (here, the empty string `''`).",
        vi: "Toán tử `&&` thực hiện đoản mạch và trả về ngay giá trị falsy đầu tiên mà nó gặp (ở đây là chuỗi rỗng `''`)."
      }
    }
  ]
};

// --- LESSON 05 ---
const lesson05: Lesson = {
  id: "js_lesson_5",
  courseId: "javascript",
  levelId: "basic",
  moduleId: "js_mod_1",
  order: 5,
  title: {
    en: "Strings, Template Literals & Modern String Manipulation",
    vi: "Chuỗi Ký Tự, Template Literals & Xử Lý Chuỗi Hiện Đại"
  },
  summary: {
    en: "Master string slicing, pattern searching (includes, startsWith), replacement with replaceAll, template literal interpolation, and tagged templates.",
    vi: "Làm chủ trích xuất chuỗi (slice), tìm kiếm mẫu (includes, startsWith), thay thế chuỗi với replaceAll, chèn biểu thức template literals và hàm gắn thẻ tagged templates."
  },
  estimatedMinutes: 20,
  topicId: "js_strings_templates",
  learn: {
    introduction: {
      en: "Strings represent text data in JavaScript and are indexed as UTF-16 code units. ES6 revolutionized string manipulation with Template Literals (backtick syntax `` ` ``), introducing expressive multi-line formatting, embedded expression interpolation `${...}`, and advanced Tagged Template functions. Combined with modern string search and transformation methods, JavaScript offers powerful text-processing capabilities.",
      vi: "Chuỗi đại diện cho dữ liệu văn bản trong JavaScript và được lập chỉ mục theo đơn vị mã UTF-16. Phiên bản ES6 đã mang lại bước nhảy vọt với Template Literals (sử dụng ký tự backtick `` ` ``), hỗ trợ định dạng chuỗi nhiều dòng, nhúng biểu thức trực tiếp `${...}` và hàm xử lý gắn thẻ Tagged Templates. Kết hợp với các phương thức tìm kiếm và biến đổi chuỗi hiện đại, JavaScript cung cấp khả năng xử lý văn bản mạnh mẽ."
    },
    conceptExplanation: {
      en: "1. String Inspection & Search Methods: `.includes(sub)`, `.startsWith(prefix)`, `.endsWith(suffix)`, `.indexOf(sub)`, `.lastIndexOf(sub)`. Modern methods return direct booleans without cumbersome `>= 0` checks.\n\n2. Extraction & Transformation: `.slice(start, end)` (preferred over legacy `substring` and deprecated `substr`), `.trim()`, `.trimStart()`, `.trimEnd()`, `.toUpperCase()`, `.toLowerCase()`, `.repeat(count)`, `.padStart(length, pad)`, `.padEnd(length, pad)`.\n\n3. Replacement: `.replace(pattern, replacer)` replaces only the first match when given a string. `.replaceAll(pattern, replacer)` replaces all occurrences without requiring complex global regex `/g`.\n\n4. Template Literals & Tagged Templates: Backtick strings support string interpolation `${expression}` and preserve literal newlines. Tagged template functions `tag\`Hello \${name}\`` receive raw string chunks and evaluated arguments, enabling HTML sanitization, SQL query builders, and styled-components.",
      vi: "1. Các phương thức kiểm tra & tìm kiếm: `.includes(sub)`, `.startsWith(prefix)`, `.endsWith(suffix)`, `.indexOf(sub)`. Các phương thức hiện đại trả về boolean trực tiếp mà không cần so sánh `>= 0` như trước.\n\n2. Trích xuất & Biến đổi chuỗi: `.slice(start, end)` (tốt nhất, thay thế hoàn toàn `substr` đã lỗi thời), `.trim()`, `.trimStart()`, `.trimEnd()`, `.toUpperCase()`, `.toLowerCase()`, `.padStart(length, pad)` (thêm ký tự đầu để đủ độ dài), `.padEnd()`.\n\n3. Thay thế chuỗi: `.replace()` chỉ thay thế vị trí xuất hiện đầu tiên khi truyền chuỗi. `.replaceAll()` thay thế toàn bộ các vị trí trùng khớp mà không bắt buộc dùng biểu thức chính quy `/g`.\n\n4. Template Literals & Tagged Templates: Chuỗi backtick hỗ trợ nhúng biểu thức `${}` và giữ nguyên định dạng xuống dòng. Tagged Templates `tag\`Hello \${name}\`` cho phép hàm chặn chuỗi để xử lý lọc mã độc (sanitize HTML), tạo câu truy vấn SQL an toàn hoặc styled-components."
    },
    syntax: `// 1. Template literals & multiline formatting
const user = { name: "Elena", score: 98.5 };
const message = \`Student: \${user.name}
Grade: \${user.score >= 90 ? "A+" : "B"}
Status: \${user.score.toFixed(1)}%\`;

// 2. Modern string methods
const raw = "  api/v2/products/459  ";
const clean = raw.trim();
console.log(clean.startsWith("api/")); // true
console.log(clean.endsWith("/459"));   // true

const receiptId = String(42).padStart(6, "0"); // "000042"

// 3. Tagged template function example (HTML sanitizer)
function sanitize(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const val = values[i] !== undefined ? String(values[i]).replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
    return acc + str + val;
  }, "");
}
const userInput = "<script>alert('hack')</script>";
console.log(sanitize\`<div>Hello \${userInput}</div>\`);`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Secure SQL / HTML Query Builder with Tagged Templates",
          vi: "Xây Dựng Query Builder An Toàn Với Tagged Template"
        },
        description: {
          en: "Demonstrates how tagged template literals prevent injection vulnerabilities by parameterizing interpolated values.",
          vi: "Minh họa cách tagged template literals ngăn chặn lỗi injection bằng cách tham số hóa giá trị được chèn."
        },
        code: `function sql(strings, ...params) {
  const values = [];
  const text = strings.reduce((query, chunk, i) => {
    if (i < params.length) {
      values.push(params[i]);
      return query + chunk + \`$\${values.length}\`;
    }
    return query + chunk;
  }, "");

  return { text, values };
}

const role = "admin";
const minScore = 80;
const query = sql\`SELECT id, username FROM users WHERE role = \${role} AND score >= \${minScore}\`;
console.log(query);
// { text: 'SELECT id, username FROM users WHERE role = $1 AND score >= $2', values: ['admin', 80] }`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Expecting `.replace('a', 'b')` with a string argument to replace all occurrences of 'a'.",
          vi: "Nghĩ rằng `.replace('a', 'b')` khi truyền chuỗi sẽ thay thế toàn bộ ký tự 'a' trong chuỗi."
        },
        correction: {
          en: "Use `.replaceAll('a', 'b')` or regex with global flag `/.replace(/a/g, 'b')`.",
          vi: "Sử dụng `.replaceAll('a', 'b')` hoặc regex với cờ toàn cục `/.replace(/a/g, 'b')`."
        },
        explanation: {
          en: "Standard `replace(string, ...)` only replaces the very first occurrence. `.replaceAll()` was introduced in ES2021 to safely replace all matches.",
          vi: "Hàm `replace(string, ...)` chuẩn chỉ thay thế đúng 1 lần xuất hiện đầu tiên. Hàm `.replaceAll()` được thêm vào từ ES2021 để thay thế toàn bộ."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Prefer .slice() over substring() and deprecated substr()",
          vi: "Ưu tiên dùng .slice() thay vì substring() và substr() đã lỗi thời"
        },
        description: {
          en: "`.slice()` supports negative indices to count backwards from the end of the string and behaves consistently with `Array.prototype.slice()`.",
          vi: "`.slice()` hỗ trợ chỉ số âm để đếm ngược từ cuối chuỗi và hoạt động đồng nhất với `Array.prototype.slice()`."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_5_1",
      title: {
        en: "Generate URL Slug from Title",
        vi: "Tạo URL Slug Chuẩn Hóa Từ Tiêu Đề Bài Viết"
      },
      instruction: {
        en: "Write a function `generateSlug(title)` that trims whitespace, converts to lowercase, replaces all spaces and special punctuation with hyphens, removes duplicate hyphens, and trims hyphens from start and end.",
        vi: "Viết hàm `generateSlug(title)` cắt khoảng trắng thừa, chuyển thành chữ thường, thay thế khoảng trắng và dấu câu thành dấu gạch nối, loại bỏ gạch nối liên tiếp và cắt gạch nối ở 2 đầu."
      },
      starterCode: `function generateSlug(title) {
  // Return clean URL slug
}

console.log(generateSlug("  Mastering Modern JavaScript (ES6+ & Beyond)!  "));
// "mastering-modern-javascript-es6-beyond"`,
      solutionCode: `function generateSlug(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}`,
      hints: [
        {
          en: "Use trim().toLowerCase(), replace non-alphanumeric with '-', and strip leading/trailing hyphens.",
          vi: "Dùng trim().toLowerCase(), thay thế các ký tự không phải chữ số thành '-' và loại bỏ gạch nối ở đầu/cuối."
        }
      ]
    },
    {
      id: "js_ex_5_2",
      title: {
        en: "Mask Sensitive Payment Card Number",
        vi: "Mã Hóa Che Giấu Số Thẻ Thanh Toán Nhạy Cảm"
      },
      instruction: {
        en: "Write a function `maskCardNumber(cardNumber)` that takes a string of digits, removes all spaces/dashes, and masks all but the last 4 digits with asterisks `*` (e.g. `4532 8912 3456 7890` -> `************7890`). Return `'Invalid'` if fewer than 12 digits.",
        vi: "Viết hàm `maskCardNumber(cardNumber)` nhận chuỗi số thẻ, xóa khoảng trắng/dấu gạch ngang, và che tất cả trừ 4 số cuối bằng dấu `*` (ví dụ `4532 8912 3456 7890` -> `************7890`). Trả về `'Invalid'` nếu ít hơn 12 chữ số."
      },
      starterCode: `function maskCardNumber(cardNumber) {
  // Mask digits except last 4
}

console.log(maskCardNumber("4532-8912-3456-7890"));`,
      solutionCode: `function maskCardNumber(cardNumber) {
  const cleanDigits = String(cardNumber).replaceAll('-', '').replaceAll(' ', '');
  if (cleanDigits.length < 12) return 'Invalid';
  const lastFour = cleanDigits.slice(-4);
  return lastFour.padStart(cleanDigits.length, '*');
}`,
      hints: [
        {
          en: "Clean dashes with replaceAll, extract last 4 digits with slice(-4), and padStart with '*'.",
          vi: "Làm sạch dấu gạch với replaceAll, trích 4 số cuối bằng slice(-4) và dùng padStart với ký tự '*'."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_5",
    title: {
      en: "Template Engine with Conditional Directives",
      vi: "Engine Xử Lý Mẫu Template Với Biểu Thức Điều Kiện"
    },
    description: {
      en: "Implement a micro template engine function `renderTemplate(templateStr, data)` that replaces `{{key}}` tokens with matching properties from `data`, and resolves simple `{{#if key}}...{{/if}}` conditional blocks.",
      vi: "Cài đặt hàm engine render template `renderTemplate(templateStr, data)` thay thế các placeholder `{{key}}` bằng giá trị từ `data`, đồng thời xử lý các khối điều kiện đơn giản `{{#if key}}...{{/if}}`."
    },
    starterCode: `function renderTemplate(templateStr, data) {
  // Implement template parser
}

const tpl = "Hello {{name}}!{{#if isVip}} You are a VIP member with {{points}} pts.{{/if}}";
console.log(renderTemplate(tpl, { name: "Elena", isVip: true, points: 1500 }));
// "Hello Elena! You are a VIP member with 1500 pts."`,
    solutionCode: `function renderTemplate(templateStr, data) {
  let result = templateStr;

  // Process {{#if key}}content{{/if}}
  const ifRegex = /\\{\\{#if\\s+([a-zA-Z0-9_]+)\\}\\}([\\s\\S]*?)\\{\\{\\/if\\}\\}/g;
  result = result.replace(ifRegex, (match, conditionKey, content) => {
    return Boolean(data[conditionKey]) ? content : '';
  });

  // Process {{key}} replacements
  const varRegex = /\\{\\{([a-zA-Z0-9_]+)\\}\\}/g;
  result = result.replace(varRegex, (match, key) => {
    return data[key] !== undefined ? String(data[key]) : '';
  });

  return result;
}`,
    hints: [
      {
        en: "Use regex to evaluate if-blocks first, and then replace {{key}} tokens with values from data.",
        vi: "Dùng regex để xử lý các khối if trước, sau đó thay thế các token {{key}} bằng dữ liệu tương ứng."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_5_1",
      type: "single_choice",
      question: {
        en: "Which quotation character enables ES6 template literals with multi-line strings and expression interpolation?",
        vi: "Ký tự dấu ngoặc kép/đơn nào kích hoạt tính năng Template Literals trong ES6?"
      },
      options: [
        { id: "a", text: { en: "Backtick ( ` )", vi: "Dấu phẩy ngược Backtick ( ` )" } },
        { id: "b", text: { en: "Single quote ( ' )", vi: "Dấu nháy đơn ( ' )" } },
        { id: "c", text: { en: "Double quote ( \" )", vi: "Dấu nháy kép ( \" )" } },
        { id: "d", text: { en: "Tilde ( ~ )", vi: "Dấu ngã ( ~ )" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Template literals are enclosed by the backtick character `` ` ``.",
        vi: "Template literals được bao quanh bởi ký tự backtick `` ` ``."
      }
    },
    {
      id: "js_q_5_2",
      type: "predict_output",
      question: {
        en: "What will `'banana'.replace('a', 'o')` return?",
        vi: "`'banana'.replace('a', 'o')` sẽ trả về kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "'bonana'", vi: "'bonana'" } },
        { id: "b", text: { en: "'bonono'", vi: "'bonono'" } },
        { id: "c", text: { en: "'banana'", vi: "'banana'" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "When given a string as the search argument, `replace()` replaces only the FIRST matching occurrence.",
        vi: "Khi đối số tìm kiếm là chuỗi, `replace()` chỉ thay thế duy nhất vị trí trùng khớp đầu tiên."
      }
    },
    {
      id: "js_q_5_3",
      type: "single_choice",
      question: {
        en: "Which method replaces ALL occurrences of a substring across the entire string without requiring a regex?",
        vi: "Phương thức nào thay thế TẤT CẢ các lần xuất hiện của chuỗi con mà không cần dùng regex?"
      },
      options: [
        { id: "a", text: { en: "replaceAll()", vi: "replaceAll()" } },
        { id: "b", text: { en: "replaceEvery()", vi: "replaceEvery()" } },
        { id: "c", text: { en: "replaceGlobal()", vi: "replaceGlobal()" } },
        { id: "d", text: { en: "swapAll()", vi: "swapAll()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`String.prototype.replaceAll()` was introduced in ES2021 to replace all substring matches cleanly.",
        vi: "`String.prototype.replaceAll()` được bổ sung trong ES2021 để thay thế toàn bộ chuỗi con một cách rõ ràng."
      }
    },
    {
      id: "js_q_5_4",
      type: "predict_output",
      question: {
        en: "What will `'JavaScript'.slice(-6)` return?",
        vi: "`'JavaScript'.slice(-6)` sẽ trả về kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "'Script'", vi: "'Script'" } },
        { id: "b", text: { en: "'JavaSc'", vi: "'JavaSc'" } },
        { id: "c", text: { en: "''", vi: "''" } },
        { id: "d", text: { en: "'avaScr'", vi: "'avaScr'" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "A negative index in `.slice()` offsets backwards from the end. Length is 10, so `-6` starts at index 4 ('S') through the end ('Script').",
        vi: "Chỉ số âm trong `.slice()` đếm ngược từ cuối chuỗi. Độ dài là 10 nên `-6` bắt đầu từ index 4 ('S') đến hết chuỗi ('Script')."
      }
    },
    {
      id: "js_q_5_5",
      type: "predict_output",
      question: {
        en: "What is the output of `'5'.padStart(4, '0')`?",
        vi: "Kết quả của `'5'.padStart(4, '0')` là gì?"
      },
      options: [
        { id: "a", text: { en: "'0005'", vi: "'0005'" } },
        { id: "b", text: { en: "'5000'", vi: "'5000'" } },
        { id: "c", text: { en: "'005'", vi: "'005'" } },
        { id: "d", text: { en: "'5.000'", vi: "'5.000'" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`padStart(4, '0')` pads the beginning of the string with `'0'` until the total target length reaches 4.",
        vi: "`padStart(4, '0')` thêm ký tự `'0'` vào đầu chuỗi cho đến khi đạt tổng độ dài là 4."
      }
    },
    {
      id: "js_q_5_6",
      type: "single_choice",
      question: {
        en: "What is a Tagged Template Literal in JavaScript?",
        vi: "Tagged Template Literal trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "A function call where template string fragments and interpolated values are passed as arguments for custom parsing", vi: "Một lời gọi hàm mà các đoạn chuỗi tĩnh và giá trị nội suy được truyền làm đối số để tùy biến xử lý" } },
        { id: "b", text: { en: "A CSS-only selector syntax", vi: "Cú pháp bộ chọn chỉ có trong CSS" } },
        { id: "c", text: { en: "An HTML5 meta tag", vi: "Thẻ meta trong HTML5" } },
        { id: "d", text: { en: "A JSON serialization flag", vi: "Một cờ tuần tự hóa JSON" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Tagged templates allow functions to parse template literals (e.g. `tag\`string \${val}\``), widely used in GraphQL, styled-components, and SQL builders.",
        vi: "Tagged templates cho phép hàm can thiệp xử lý các phần tử trong template literal, được ứng dụng rộng rãi trong GraphQL, styled-components và SQL builder."
      }
    },
    {
      id: "js_q_5_7",
      type: "predict_output",
      question: {
        en: "What does `'   hello world   '.trim()` return?",
        vi: "`'   hello world   '.trim()` sẽ trả về kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "'hello world'", vi: "'hello world'" } },
        { id: "b", text: { en: "'helloworld'", vi: "'helloworld'" } },
        { id: "c", text: { en: "'   hello world'", vi: "'   hello world'" } },
        { id: "d", text: { en: "'hello world   '", vi: "'hello world   '" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`trim()` removes leading and trailing whitespace characters, preserving inner whitespace.",
        vi: "`trim()` loại bỏ khoảng trắng ở cả hai đầu chuỗi, giữ nguyên khoảng trắng ở giữa."
      }
    },
    {
      id: "js_q_5_8",
      type: "fill_blank",
      question: {
        en: "To verify whether a string contains a specific substring in modern JavaScript, you call str._____('searchString').",
        vi: "Để kiểm tra xem một chuỗi có chứa chuỗi con hay không trong JS hiện đại, bạn gọi str._____('searchString')."
      },
      correctAnswer: "includes",
      explanation: {
        en: "`str.includes()` returns a boolean indicating whether the search string exists within the calling string.",
        vi: "`str.includes()` trả về giá trị boolean biểu thị chuỗi con có xuất hiện hay không."
      }
    },
    {
      id: "js_q_5_9",
      type: "single_choice",
      question: {
        en: "What happens if you embed an object inside a standard template literal like `\`User: \${{ name: 'Alex' }}\``?",
        vi: "Điều gì xảy ra khi nhúng trực tiếp một đối tượng vào template literal như `\`User: \${{ name: 'Alex' }}\``?"
      },
      options: [
        { id: "a", text: { en: "It prints 'User: [object Object]'", vi: "Nó in ra 'User: [object Object]'" } },
        { id: "b", text: { en: "It prints 'User: {\"name\":\"Alex\"}'", vi: "Nó in ra 'User: {\"name\":\"Alex\"}'" } },
        { id: "c", text: { en: "It throws a TypeError", vi: "Nó ném ngoại lệ TypeError" } },
        { id: "d", text: { en: "It prints 'User: undefined'", vi: "Nó in ra 'User: undefined'" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Expressions in template literals are coerced to strings via `.toString()`. Default Object toString returns `'[object Object]'`.",
        vi: "Các biểu thức trong template literal được ép sang chuỗi bằng `.toString()`. Mặc định Object.toString trả về `'[object Object]'` (muốn in JSON cần dùng JSON.stringify)."
      }
    },
    {
      id: "js_q_5_10",
      type: "code_reasoning",
      question: {
        en: "Why is `String.raw\`C:\\Development\\new_project\`` useful in JavaScript?",
        vi: "Tại sao `String.raw\`C:\\Development\\new_project\`` lại hữu ích trong JavaScript?"
      },
      options: [
        { id: "a", text: { en: "It treats escape sequences like \\n and \\t as raw literal characters without interpreting them", vi: "Nó giữ nguyên các ký tự escape như \\n và \\t dưới dạng chuỗi thô mà không thông dịch chúng" } },
        { id: "b", text: { en: "It translates strings to base64", vi: "Nó chuyển chuỗi sang định dạng base64" } },
        { id: "c", text: { en: "It verifies file path existence on disk", vi: "Nó kiểm tra đường dẫn file có tồn tại trên đĩa không" } },
        { id: "d", text: { en: "It compresses string size", vi: "Nó nén dung lượng chuỗi" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`String.raw` is a built-in tagged template that obtains raw string content, preventing backslashes from being treated as escape characters (ideal for regex patterns and file paths).",
        vi: "`String.raw` là tagged template tích hợp sẵn giúp lấy nội dung chuỗi thô, ngăn việc biến dấu gạch chéo ngược thành ký tự escape (rất tiện cho đường dẫn file và regex)."
      }
    }
  ]
};

// Write the files
const lessons = [lesson01, lesson02, lesson03, lesson04, lesson05];
const names = ['lesson01.ts', 'lesson02.ts', 'lesson03.ts', 'lesson04.ts', 'lesson05.ts'];

for (let i = 0; i < lessons.length; i++) {
  const filePath = path.join(dir, names[i]);
  const varName = `lesson0${i + 1}`;
  const code = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lessons[i], null, 2)};\nexport default ${varName};\n`;
  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`Generated: ${filePath}`);
}

console.log('Basic Module 01 generation completed successfully.');
