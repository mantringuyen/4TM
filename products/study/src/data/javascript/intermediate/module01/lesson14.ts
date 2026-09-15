import { Lesson } from '../../../../types';

export const lesson14: Lesson = {
  "id": "js_lesson_14",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_3",
  "order": 14,
  "title": {
    "en": "Asynchronous JavaScript: Event Loop, Microtasks & Timers",
    "vi": "JavaScript Bất Đồng Bộ: Event Loop, Microtasks & Timers"
  },
  "summary": {
    "en": "Master the single-threaded JavaScript concurrency model, Call Stack, Event Loop, Microtask Queue (Promises, queueMicrotask) vs Macrotask Queue (setTimeout, I/O), and timer diagnostics.",
    "vi": "Làm chủ mô hình đơn luồng bất đồng bộ trong JavaScript, Call Stack, Event Loop, hàng đợi Microtask (Promise) vs Macrotask (setTimeout, I/O) và chẩn đoán timer."
  },
  "estimatedMinutes": 24,
  "topicId": "js_event_loop_asynchrony",
  "learn": {
    "introduction": {
      "en": "JavaScript is single-threaded, meaning it has only one Call Stack and can execute only one line of JavaScript code at any given instant. To perform long-running I/O operations (network requests, timers, file reads) without freezing the user interface, JavaScript relies on an asynchronous event-driven architecture powered by Web APIs, the Task (Macrotask) Queue, the Microtask Queue, and the Event Loop.",
      "vi": "JavaScript là ngôn ngữ đơn luồng (single-threaded), nghĩa là nó chỉ có một Call Stack duy nhất và chỉ có thể thực thi một dòng lệnh tại một thời điểm. Để xử lý các tác vụ tốn thời gian (gọi mạng, đọc file, hẹn giờ) mà không làm đơ giao diện người dùng, JavaScript sử dụng kiến trúc hướng sự kiện bất đồng bộ gồm Web APIs, Hàng đợi Macrotask, Hàng đợi Microtask và Event Loop."
    },
    "conceptExplanation": {
      "en": "1. The Event Loop Algorithm:\n   - Step 1: Execute all synchronous code on the Call Stack until empty.\n   - Step 2: Flush ALL pending jobs in the Microtask Queue (Promises `.then()`, `queueMicrotask()`, `MutationObserver`) until the Microtask Queue is completely drained.\n   - Step 3: Check UI rendering updates (if running in browser).\n   - Step 4: Pick the OLDEST task from the Macrotask (Callback) Queue (`setTimeout`, `setInterval`, `setImmediate`, I/O events), push it onto the Call Stack, and execute.\n   - Step 5: Repeat continuously.\n\n2. Microtasks vs Macrotasks: Microtasks always have strict priority over Macrotasks. If a microtask schedules another microtask, it will run before any `setTimeout(..., 0)` or UI render step.\n\n3. Timers (`setTimeout`, `setInterval`): `setTimeout(fn, delay)` specifies the MINIMUM delay before the callback is placed in the task queue, NOT the guaranteed exact execution time.\n\n4. Breaking CPU-intensive Tasks: Long synchronous loops block the event loop. Use `queueMicrotask()` or `setTimeout(..., 0)` to yield control back to the browser.",
      "vi": "1. Thuật Toán Event Loop:\n   - Bước 1: Thực thi toàn bộ mã đồng bộ trên Call Stack cho đến khi ngăn xếp rỗng.\n   - Bước 2: Xử lý TOÀN BỘ công việc trong Hàng đợi Microtask (Promise `.then()`, `queueMicrotask()`) cho đến khi hàng đợi rỗng hoàn toàn.\n   - Bước 3: Cập nhật giao diện Render UI (nếu chạy trên trình duyệt).\n   - Bước 4: Lấy tác vụ cũ nhất từ Hàng đợi Macrotask (`setTimeout`, `setInterval`, I/O), đẩy vào Call Stack và thực thi.\n   - Bước 5: Lặp lại liên tục.\n\n2. Microtasks vs Macrotasks: Microtask luôn có độ ưu tiên tuyệt đối trước Macrotask. Một microtask lên lịch cho một microtask khác sẽ chạy trước bất kỳ `setTimeout(..., 0)` nào.\n\n3. Timers (`setTimeout`, `setInterval`): `setTimeout(fn, delay)` chỉ đảm bảo khoảng thời gian TỐI THIỂU trước khi callback được đưa vào hàng đợi, không cam kết thời điểm chạy chính xác tuyệt đối.\n\n4. Phân Tách Tác Vụ Nặng: Vòng lặp nặng đồng bộ sẽ làm treo Event Loop. Dùng `queueMicrotask()` hoặc `setTimeout(..., 0)` để nhường luồng cho trình duyệt phản hồi."
    },
    "syntax": "// 1. Classic Event Loop Execution Order\nconsole.log(\"1: Synchronous\");\n\nsetTimeout(() => {\n  console.log(\"4: Macrotask (setTimeout)\");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log(\"3: Microtask (Promise.then)\");\n});\n\nconsole.log(\"2: Synchronous\");\n// Output order: 1 -> 2 -> 3 -> 4!\n\n// 2. queueMicrotask explicit queuing\nqueueMicrotask(() => {\n  console.log(\"High priority microtask before next paint\");\n});",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Non-Blocking Background Chunk Processor",
          "vi": "Bộ Xử Lý Dữ Liệu Lớn Không Làm Khóa Luồng Giao Diện"
        },
        "description": {
          "en": "Demonstrates yielding to the Event Loop using setTimeout to process 100,000 items without freezing the browser thread.",
          "vi": "Minh họa kỹ thuật nhường luồng cho Event Loop bằng setTimeout để xử lý 100,000 phần tử mà không gây đơ giao diện."
        },
        "code": "function processLargeDatasetAsync(items, onProgress, onComplete) {\n  let index = 0;\n  const chunkSize = 2000;\n\n  function processChunk() {\n    const end = Math.min(index + chunkSize, items.length);\n    while (index < end) {\n      // Perform heavy calculation per item\n      items[index] = items[index] * 2;\n      index++;\n    }\n\n    onProgress(index, items.length);\n\n    if (index < items.length) {\n      // Yield to the Macrotask queue so UI events and clicks can be handled!\n      setTimeout(processChunk, 0);\n    } else {\n      onComplete(items);\n    }\n  }\n\n  processChunk();\n}\n\nconst largeArray = new Array(10000).fill(5);\nprocessLargeDatasetAsync(\n  largeArray,\n  (done, total) => console.log(`Progress: ${((done / total) * 100).toFixed(0)}%`),\n  result => console.log(\"Processing complete!\")\n);"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Expecting `setTimeout(fn, 0)` to execute immediately before synchronous code.",
          "vi": "Nghĩ rằng `setTimeout(fn, 0)` sẽ thực thi ngay lập tức trước mã đồng bộ."
        },
        "correction": {
          "en": "Recognize that `setTimeout(fn, 0)` is a macrotask that runs ONLY after the Call Stack and all microtasks are empty.",
          "vi": "Hiểu rằng `setTimeout(fn, 0)` là một macrotask, CHỈ chạy sau khi Call Stack và toàn bộ hàng đợi microtask đã được dọn sạch."
        }
      }
    ],
    "tips": [
      {
        "en": "Use queueMicrotask() for urgent asynchronous callbacks: If you need an async callback to run immediately after the current synchronous frame before UI paints or timers, `queueMicrotask()` is faster and cleaner than `Promise.resolve().then()`.",
        "vi": "Dùng queueMicrotask() cho các callback bất đồng bộ khẩn cấp: Khi cần chạy một tác vụ bất đồng bộ ngay sau khối đồng bộ hiện tại trước khi trình duyệt vẽ lại giao diện, `queueMicrotask()` là lựa chọn nhanh và sạch sẽ nhất."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_14_1",
      "type": "complete_code",
      "title": {
        "en": "Async Debounce Function with Timers",
        "vi": "Xây Dựng Hàm Debounce Chống Rung Bằng Timer"
      },
      "instruction": {
        "en": "Write a function `debounce(fn, delayMs)` that returns a debounced version of `fn`. Subsequent invocations within `delayMs` should cancel the pending timer and restart the delay window. The callback must preserve `this` and receive all passed arguments.",
        "vi": "Viết hàm `debounce(fn, delayMs)` trả về phiên bản debounce của `fn`. Các lần gọi hàm tiếp theo trong khoảng `delayMs` sẽ hủy timer đang chờ và đặt lại khoảng chờ mới. Hàm callback phải giữ nguyên `this` và nhận đầy đủ tham số."
      },
      "starterCode": "function debounce(fn, delayMs) {\n  // Implement debounce\n}\n\nconst searchApi = debounce(query => console.log(\"Searching for:\", query), 300);\nsearchApi(\"j\");\nsearchApi(\"jav\");\nsearchApi(\"javascript\"); // Only this final call executes after 300ms!",
      "solutionCode": "function debounce(fn, delayMs) {\n  let timerId = null;\n\n  return function(...args) {\n    if (timerId !== null) {\n      clearTimeout(timerId);\n    }\n    timerId = setTimeout(() => {\n      fn.apply(this, args);\n      timerId = null;\n    }, delayMs);\n  };\n}",
      "hint": {
        "en": "Maintain timerId in closure. In the returned function, call clearTimeout(timerId) and schedule setTimeout.",
        "vi": "Lưu timerId trong closure. Trong hàm trả về, gọi clearTimeout(timerId) và lên lịch setTimeout mới."
      }
    },
    {
      "id": "js_ex_14_2",
      "type": "complete_code",
      "title": {
        "en": "Periodic Interval Poller with Auto-Stop",
        "vi": "Bộ Thăm Dò Định Kỳ (Poller) Có Cơ Chế Tự Động Hủy"
      },
      "instruction": {
        "en": "Write a function `startPoller(checkFn, intervalMs, maxAttempts)` that polls `checkFn()` every `intervalMs`. If `checkFn()` returns `true` (success condition) or attempts exceed `maxAttempts`, it clears the interval and returns `{ attempts, completed: boolean }` via a Promise.",
        "vi": "Viết hàm `startPoller(checkFn, intervalMs, maxAttempts)` kiểm tra `checkFn()` định kỳ mỗi `intervalMs`. Nếu `checkFn()` trả về `true` hoặc số lần thử vượt quá `maxAttempts`, hàm dừng interval và trả về `{ attempts, completed: boolean }` qua một Promise."
      },
      "starterCode": "function startPoller(checkFn, intervalMs, maxAttempts) {\n  // Implement poller returning a Promise\n}\n\nlet count = 0;\nstartPoller(() => ++count >= 3, 100, 5).then(res => console.log(res));\n// { attempts: 3, completed: true }",
      "solutionCode": "function startPoller(checkFn, intervalMs, maxAttempts) {\n  return new Promise((resolve) => {\n    let attempts = 0;\n\n    const intervalId = setInterval(() => {\n      attempts++;\n      let isSuccess = false;\n      try {\n        isSuccess = Boolean(checkFn());\n      } catch (err) {\n        isSuccess = false;\n      }\n\n      if (isSuccess) {\n        clearInterval(intervalId);\n        resolve({ attempts, completed: true });\n      } else if (attempts >= maxAttempts) {\n        clearInterval(intervalId);\n        resolve({ attempts, completed: false });\n      }\n    }, intervalMs);\n  });\n}",
      "hint": {
        "en": "Wrap setInterval in a Promise. In each tick increment attempts, check condition, call clearInterval and resolve.",
        "vi": "Bọc setInterval trong một Promise. Mỗi nhịp tăng attempts, kiểm tra điều kiện, gọi clearInterval và resolve."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_14",
    "title": {
      "en": "Priority Microtask & Macrotask Scheduler Engine",
      "vi": "Engine Điều Phối Tác Vụ Đa Tầng Ưu Tiên (Task Scheduler)"
    },
    "description": {
      "en": "Create a scheduler object `createTaskScheduler()` with methods: `scheduleMicrotask(taskFn)`, `scheduleMacrotask(taskFn, delayMs = 0)`, `flushSync(taskFn)` (runs immediately), and `getMetrics()` tracking completed task counts by category `{ sync: number, micro: number, macro: number }`.",
      "vi": "Xây dựng đối tượng điều phối `createTaskScheduler()` có các phương thức: `scheduleMicrotask(taskFn)`, `scheduleMacrotask(taskFn, delayMs = 0)`, `flushSync(taskFn)` (chạy đồng bộ ngay), và `getMetrics()` thống kê số lượng task đã hoàn thành theo phân loại `{ sync: number, micro: number, macro: number }`."
    },
    "starterCode": "function createTaskScheduler() {\n  // Implement task scheduler\n}\n\nconst scheduler = createTaskScheduler();\nscheduler.scheduleMacrotask(() => console.log(\"Macro 1\"));\nscheduler.scheduleMicrotask(() => console.log(\"Micro 1\"));\nscheduler.flushSync(() => console.log(\"Sync 1\"));",
    "solutionCode": "function createTaskScheduler() {\n  const metrics = { sync: 0, micro: 0, macro: 0 };\n\n  return {\n    flushSync(taskFn) {\n      taskFn();\n      metrics.sync++;\n    },\n    scheduleMicrotask(taskFn) {\n      queueMicrotask(() => {\n        taskFn();\n        metrics.micro++;\n      });\n    },\n    scheduleMacrotask(taskFn, delayMs = 0) {\n      setTimeout(() => {\n        taskFn();\n        metrics.macro++;\n      }, delayMs);\n    },\n    getMetrics() {\n      return { ...metrics };\n    }\n  };\n}",
    "hints": [
      {
        "en": "Execute sync tasks immediately, wrap microtasks in queueMicrotask, and wrap macrotasks in setTimeout while updating metrics.",
        "vi": "Thực thi task đồng bộ trực tiếp, bọc microtask trong queueMicrotask và macrotask trong setTimeout đồng thời cập nhật metrics."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Priority Microtask & Macrotask Scheduler Engine according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Engine Điều Phối Tác Vụ Đa Tầng Ưu Tiên (Task Scheduler) theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_14_1",
      "type": "single_choice",
      "question": {
        "en": "Which task queue has the highest priority in the JavaScript Event Loop after synchronous code finishes?",
        "vi": "Hàng đợi tác vụ nào có độ ưu tiên cao nhất trong Event Loop sau khi mã đồng bộ thực thi xong?"
      },
      "options": [
        {
          "en": "The Microtask Queue (Promises, queueMicrotask)",
          "vi": "Hàng đợi Microtask (Promises, queueMicrotask)"
        },
        {
          "en": "The Macrotask Queue (setTimeout, setInterval)",
          "vi": "Hàng đợi Macrotask (setTimeout, setInterval)"
        },
        {
          "en": "The Network I/O Queue",
          "vi": "Hàng đợi Network I/O"
        },
        {
          "en": "The Garbage Collection Queue",
          "vi": "Hàng đợi Garbage Collection"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The Event Loop flushes all microtasks completely before selecting the next task from the Macrotask Queue.",
        "vi": "Event Loop luôn giải quyết sạch sẽ toàn bộ hàng đợi microtask trước khi lấy tác vụ kế tiếp từ hàng đợi macrotask."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "easy"
    },
    {
      "id": "js_q_14_2",
      "type": "predict_output",
      "question": {
        "en": "What is the exact execution order of the following snippet?\n```js\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');\n```",
        "vi": "Thứ tự in ra chính xác của đoạn mã sau là gì?\n```js\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');\n```"
      },
      "options": [
        {
          "en": "'A', 'D', 'C', 'B'",
          "vi": "'A', 'D', 'C', 'B'"
        },
        {
          "en": "'A', 'B', 'C', 'D'",
          "vi": "'A', 'B', 'C', 'D'"
        },
        {
          "en": "'A', 'D', 'B', 'C'",
          "vi": "'A', 'D', 'B', 'C'"
        },
        {
          "en": "'C', 'A', 'D', 'B'",
          "vi": "'C', 'A', 'D', 'B'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Synchronous 'A' and 'D' execute first on Call Stack. Then microtask 'C' runs. Finally, macrotask 'B' runs from the callback queue.",
        "vi": "Mã đồng bộ 'A' và 'D' chạy trước trên Call Stack. Tiếp theo microtask 'C' được giải quyết. Cuối cùng macrotask 'B' mới được chạy."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "easy"
    },
    {
      "id": "js_q_14_3",
      "type": "single_choice",
      "question": {
        "en": "Why is JavaScript referred to as 'Single-Threaded'?",
        "vi": "Tại sao JavaScript được gọi là ngôn ngữ 'Đơn Luồng' (Single-Threaded)?"
      },
      "options": [
        {
          "en": "It has only one main Call Stack and can execute only one sequence of instructions at a time in the main thread",
          "vi": "Nó chỉ có một Call Stack chính duy nhất và chỉ có thể thực thi một chuỗi lệnh tại một thời điểm trên luồng chính"
        },
        {
          "en": "It cannot make HTTP requests",
          "vi": "Nó không thể gửi request HTTP"
        },
        {
          "en": "It cannot run on multi-core CPUs",
          "vi": "Nó không thể chạy trên chip đa nhân"
        },
        {
          "en": "It only runs inside single-tab browsers",
          "vi": "Nó chỉ chạy trong trình duyệt đơn tab"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The JS execution thread processes one frame at a time on its single Call Stack, delegating asynchronous I/O to background system/browser threads.",
        "vi": "Luồng thực thi JS xử lý từng khung lệnh một trên Call Stack đơn, giao các tác vụ I/O bất đồng bộ cho các luồng nền của trình duyệt/hệ điều hành."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "easy"
    },
    {
      "id": "js_q_14_4",
      "type": "predict_output",
      "question": {
        "en": "What will `setTimeout(fn, 100)` do if the main thread is occupied by an intensive synchronous loop for 500ms?",
        "vi": "`setTimeout(fn, 100)` sẽ hoạt động thế nào nếu luồng chính bị chiếm dụng bởi một vòng lặp đồng bộ nặng kéo dài 500ms?"
      },
      "options": [
        {
          "en": "`fn` will only execute AFTER the 500ms synchronous loop completes and the Call Stack clears",
          "vi": "`fn` sẽ CHỈ được thực thi SAU KHI vòng lặp đồng bộ 500ms chạy xong và Call Stack được giải phóng"
        },
        {
          "en": "`fn` interrupts the loop precisely at 100ms",
          "vi": "`fn` ngắt vòng lặp chính xác tại thời điểm 100ms"
        },
        {
          "en": "`fn` is cancelled and dropped",
          "vi": "`fn` bị hủy bỏ và bỏ qua"
        },
        {
          "en": "Throws a TimeoutError",
          "vi": "Ném lỗi TimeoutError"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Timers represent a minimum delay. JavaScript cannot preempt running synchronous code on the Call Stack.",
        "vi": "Timer chỉ đại diện cho khoảng chờ tối thiểu. JavaScript không thể ngắt ngang mã đồng bộ đang chạy trên Call Stack."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "medium"
    },
    {
      "id": "js_q_14_5",
      "type": "single_choice",
      "question": {
        "en": "Which standard Web API explicitly enqueues a microtask directly onto the Microtask Queue?",
        "vi": "Web API chuẩn nào đưa trực tiếp một microtask vào Hàng đợi Microtask?"
      },
      "options": [
        {
          "en": "queueMicrotask(fn)",
          "vi": "queueMicrotask(fn)"
        },
        {
          "en": "setMicrotask(fn)",
          "vi": "setMicrotask(fn)"
        },
        {
          "en": "process.macro(fn)",
          "vi": "process.macro(fn)"
        },
        {
          "en": "EventLoop.post(fn)",
          "vi": "EventLoop.post(fn)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`queueMicrotask(callback)` is the standard ECMAScript / Web API for scheduling high-priority microtasks.",
        "vi": "`queueMicrotask(callback)` là API chuẩn để lên lịch thực thi các microtask ưu tiên cao."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "medium"
    },
    {
      "id": "js_q_14_6",
      "type": "predict_output",
      "question": {
        "en": "What happens if a recursive microtask continuously schedules another microtask via `queueMicrotask()`?",
        "vi": "Điều gì xảy ra nếu một microtask đệ quy liên tục lên lịch một microtask khác qua `queueMicrotask()`?"
      },
      "options": [
        {
          "en": "It starves the Event Loop, indefinitely blocking Macrotasks (timers, I/O) and UI rendering",
          "vi": "Nó làm nghẽn Event Loop, chặn vô thời hạn các Macrotask (timer, I/O) và thao tác render giao diện"
        },
        {
          "en": "It throws a Stack Overflow error",
          "vi": "Nó ném lỗi Stack Overflow"
        },
        {
          "en": "The browser terminates the tab immediately",
          "vi": "Trình duyệt tắt tab ngay lập tức"
        },
        {
          "en": "It automatically converts to setTimeout",
          "vi": "Nó tự động chuyển thành setTimeout"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Because the Event Loop drains microtasks completely before advancing to rendering or macrotasks, infinite microtasks cause starvation (freezing the page).",
        "vi": "Vì Event Loop xử lý hết toàn bộ microtask trước khi chuyển sang render hay macrotask, microtask vô hạn sẽ làm đóng băng ứng dụng hoàn toàn."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "medium"
    },
    {
      "id": "js_q_14_7",
      "type": "fill_blank",
      "question": {
        "en": "To cancel a pending timer scheduled with setTimeout(fn, ms), pass the returned timer ID to _____ (timerId).",
        "vi": "Để hủy một timer đang chờ được lên lịch bằng setTimeout(fn, ms), truyền ID của timer vào hàm _____ (timerId)."
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
        "en": "`clearTimeout(timerId)` cancels the timer and prevents its callback from being pushed to the queue.",
        "vi": "`clearTimeout(timerId)` hủy bộ đếm thời gian và ngăn không cho callback của nó được đưa vào hàng đợi."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "cleartimeout"
      ]
    },
    {
      "id": "js_q_14_8",
      "type": "single_choice",
      "question": {
        "en": "Which of the following is categorized as a Macrotask in browser environments?",
        "vi": "Tác vụ nào sau đây được phân loại là một Macrotask trong môi trường trình duyệt?"
      },
      "options": [
        {
          "en": "setTimeout callback",
          "vi": "Callback của setTimeout"
        },
        {
          "en": "Promise.then handler",
          "vi": "Hàm xử lý Promise.then"
        },
        {
          "en": "queueMicrotask callback",
          "vi": "Callback của queueMicrotask"
        },
        {
          "en": "MutationObserver notification",
          "vi": "Thông báo của MutationObserver"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`setTimeout`, `setInterval`, and I/O callbacks are Macrotasks. `Promise.then`, `queueMicrotask`, and `MutationObserver` are Microtasks.",
        "vi": "`setTimeout`, `setInterval`, và I/O callbacks là Macrotask. `Promise.then`, `queueMicrotask`, và `MutationObserver` là Microtask."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "hard"
    },
    {
      "id": "js_q_14_9",
      "type": "predict_output",
      "question": {
        "en": "What does `setInterval(fn, 1000)` return?",
        "vi": "`setInterval(fn, 1000)` trả về giá trị gì?"
      },
      "options": [
        {
          "en": "A positive integer (numeric timer ID in browsers) or Timeout object (in Node.js) used to cancel the interval",
          "vi": "Một số nguyên dương (ID bộ đếm trong trình duyệt) hoặc Timeout object (trong Node.js) dùng để hủy interval"
        },
        {
          "en": "A Promise that resolves every 1000ms",
          "vi": "Một Promise resolve sau mỗi 1000ms"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "The return value of `fn`",
          "vi": "Giá trị trả về của hàm `fn`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`setInterval` returns an identifier token that must be passed to `clearInterval(id)` to stop recurring executions.",
        "vi": "`setInterval` trả về một mã định danh dùng để truyền vào `clearInterval(id)` khi muốn dừng việc lặp lại."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "hard"
    },
    {
      "id": "js_q_14_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `setTimeout(fn, 0)` often used when you need to let the browser re-render or handle user clicks during a long operation?",
        "vi": "Tại sao `setTimeout(fn, 0)` thường được dùng khi bạn muốn nhường quyền cho trình duyệt re-render hoặc nhận click của người dùng trong tác vụ dài?"
      },
      "options": [
        {
          "en": "It breaks up the long execution by scheduling the next step as a macrotask, allowing the browser rendering engine to paint frames between chunks",
          "vi": "Nó chia nhỏ tác vụ bằng cách lên lịch bước tiếp theo vào macrotask, cho phép engine trình duyệt vẽ lại giao diện giữa các phân đoạn"
        },
        {
          "en": "It forces the CPU to overclock",
          "vi": "Nó ép CPU ép xung"
        },
        {
          "en": "It compresses the JS bundle size",
          "vi": "Nó nén dung lượng bundle JS"
        },
        {
          "en": "It disables browser security headers",
          "vi": "Nó tắt các header bảo mật của trình duyệt"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Yielding via macrotask allows the Event Loop to process UI render steps and user input events between computational chunks.",
        "vi": "Nhường luồng qua macrotask cho phép Event Loop cập nhật render UI và tiếp nhận tương tác chuột/bàn phím giữa các phân đoạn tính toán."
      },
      "topicId": "js_event_loop_asynchrony",
      "difficulty": "hard"
    }
  ]
};
export default lesson14;
