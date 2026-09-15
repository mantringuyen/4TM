import { Lesson } from '../../../../types';

export const lesson15: Lesson = {
  "id": "js_lesson_15",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_4",
  "order": 15,
  "title": {
    "en": "Promises, Async/Await & Promise Combinators",
    "vi": "Promises, Async/Await & Các Bộ Kết Hợp Promise Combinators"
  },
  "summary": {
    "en": "Master asynchronous workflow orchestration using Promises, async/await, try/catch/finally error handling, and the 4 Promise combinators (all, allSettled, race, any).",
    "vi": "Làm chủ điều phối luồng xử lý bất đồng bộ bằng Promises, cú pháp async/await, xử lý lỗi toàn diện với try/catch/finally và 4 bộ kết hợp Promise (all, allSettled, race, any)."
  },
  "estimatedMinutes": 24,
  "topicId": "js_promises_async_await",
  "learn": {
    "introduction": {
      "en": "JavaScript Promises revolutionized asynchronous architecture by replacing unmaintainable nested callbacks ('callback hell') with standardized, composable stateful objects. Combined with ES2017 `async`/`await` syntactic sugar, developers can write asynchronous code that reads sequentially while retaining non-blocking performance.",
      "vi": "Promises đã tạo ra cuộc cách mạng trong kiến trúc bất đồng bộ của JavaScript, thay thế hoàn toàn tình trạng lồng callback phức tạp ('callback hell') bằng các đối tượng trạng thái chuẩn mực và dễ ghép nối. Kết hợp với cú pháp `async`/`await` của ES2017, lập trình viên có thể viết mã bất đồng bộ tuần tự, dễ đọc như mã đồng bộ mà vẫn giữ trọn vẹn hiệu năng không chặn (non-blocking)."
    },
    "conceptExplanation": {
      "en": "1. The 3 Promise States: `pending` (initial), `fulfilled` (resolved with value), `rejected` (rejected with error). Once settled (fulfilled or rejected), a Promise becomes immutable forever.\n\n2. Async/Await Mechanics: An `async` function always returns a Promise. The `await` keyword pauses the execution of the async function body non-blockingly until the awaited Promise settles.\n\n3. The 4 Promise Combinators:\n   - `Promise.all([p1, p2])`: Fails fast! Resolves when ALL promises succeed, or rejects immediately when ANY promise rejects.\n   - `Promise.allSettled([p1, p2])`: Never fails fast. Resolves when ALL promises finish, returning an array of `{ status: 'fulfilled' | 'rejected', value?, reason? }`.\n   - `Promise.race([p1, p2])`: Settles as soon as the FIRST promise settles (whether fulfilled or rejected).\n   - `Promise.any([p1, p2])`: Resolves as soon as the FIRST promise FULFILLS. Rejects with an `AggregateError` only if all promises fail.",
      "vi": "1. 3 Trạng Thái Của Promise: `pending` (đang chờ), `fulfilled` (thành công với giá trị), `rejected` (thất bại với lỗi). Khi đã chuyển trạng thái (settled), Promise trở nên bất biến vĩnh viễn.\n\n2. Cơ Chế Async/Await: Hàm khai báo `async` luôn trả về một Promise. Từ khóa `await` tạm dừng thực thi thân hàm async một cách không chặn cho đến khi Promise được resolve hoặc reject.\n\n3. 4 Bộ Kết Hợp Promise Combinators:\n   - `Promise.all([p1, p2])`: Thất bại nhanh (Fail-fast)! Resolve khi TẤT CẢ promise thành công, hoặc reject ngay khi có BẤT KỲ promise nào thất bại.\n   - `Promise.allSettled([p1, p2])`: Không bao giờ fail-fast. Chờ TẤT CẢ hoàn thành, trả về mảng chứa trạng thái `{ status: 'fulfilled' | 'rejected', value?, reason? }`.\n   - `Promise.race([p1, p2])`: Kết thúc ngay khi promise ĐẦU TIÊN xong (dù thành công hay thất bại).\n   - `Promise.any([p1, p2])`: Resolve ngay khi có promise ĐẦU TIÊN THÀNH CÔNG. Chỉ reject với lỗi `AggregateError` nếu toàn bộ đều thất bại."
    },
    "syntax": "// 1. Async/await with try/catch/finally\nasync function fetchUserProfile(userId) {\n  try {\n    const res = await fetch(`/api/users/${userId}`);\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(\"Fetch failed:\", err.message);\n    throw err;\n  } finally {\n    console.log(\"Request attempt completed\");\n  }\n}\n\n// 2. Parallel orchestration with Promise.all vs allSettled\nconst [users, posts] = await Promise.all([\n  fetch(\"/api/users\").then(r => r.json()),\n  fetch(\"/api/posts\").then(r => r.json())\n]);",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Resilient Multi-Endpoint Data Sync with Fallbacks",
          "vi": "Đồng Bộ Dữ Liệu Đa Nguồn Bền Vững Với Promise.allSettled"
        },
        "description": {
          "en": "Demonstrates querying multiple third-party weather providers and aggregating successful responses while capturing failed endpoints without aborting.",
          "vi": "Minh họa truy vấn nhiều nhà cung cấp thời tiết và tổng hợp kết quả thành công mà không bị sập khi một nguồn gặp sự cố."
        },
        "code": "async function syncWeatherFeeds(cities) {\n  const requests = cities.map(city =>\n    fetch(`https://api.weather.mock/v1/${city}`)\n      .then(res => res.json())\n      .then(data => ({ city, temp: data.temp }))\n  );\n\n  const results = await Promise.allSettled(requests);\n\n  const successful = [];\n  const failures = [];\n\n  results.forEach((res, index) => {\n    if (res.status === \"fulfilled\") {\n      successful.push(res.value);\n    } else {\n      failures.push({ city: cities[index], reason: res.reason?.message || \"Unknown error\" });\n    }\n  });\n\n  return { successful, failures };\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Executing independent async operations in a sequential `for...of` loop with `await`, causing unnecessary waterfall latency.",
          "vi": "Chạy các tác vụ bất đồng bộ độc lập tuần tự bằng `await` trong vòng lặp `for...of`, gây độ trễ dồn (waterfall latency)."
        },
        "correction": {
          "en": "Use `Promise.all(items.map(fn))` to execute independent requests concurrently in parallel.",
          "vi": "Dùng `Promise.all(items.map(fn))` để gửi đồng thời các request độc lập chạy song song."
        }
      }
    ],
    "tips": [
      {
        "en": "Always attach timeout boundaries to external network Promises: Use `Promise.race([fetchPromise, timeoutPromise])` or `AbortController` with `signal` so stalled requests do not hang your server or UI indefinitely.",
        "vi": "Luôn gắn giới hạn thời gian chờ (Timeout) cho các Promise gọi mạng: Sử dụng `Promise.race` kết hợp timeout hoặc `AbortController` để ngăn ngừa các request treo vô thời hạn làm đơ ứng dụng."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_15_1",
      "type": "complete_code",
      "title": {
        "en": "Async Timeout Wrapper with Promise.race",
        "vi": "Bọc Timeout Cho Tác Vụ Bất Đồng Bộ Bằng Promise.race"
      },
      "instruction": {
        "en": "Write a function `withTimeout(promise, timeoutMs)` that wraps any Promise. If the original promise resolves or rejects before `timeoutMs`, return its result. If `timeoutMs` elapses first, reject with `new Error('Operation timed out')`.",
        "vi": "Viết hàm `withTimeout(promise, timeoutMs)` bọc một Promise bất kỳ. Nếu Promise hoàn thành trước `timeoutMs`, trả về kết quả đó. Nếu hết thời gian `timeoutMs`, reject với `new Error('Operation timed out')`."
      },
      "starterCode": "function withTimeout(promise, timeoutMs) {\n  // Implement timeout wrapper with Promise.race\n}\n\nconst slowTask = new Promise(resolve => setTimeout(() => resolve(\"Success!\"), 500));\nwithTimeout(slowTask, 200).catch(err => console.log(err.message)); // \"Operation timed out\"",
      "solutionCode": "function withTimeout(promise, timeoutMs) {\n  let timerId;\n  const timeoutPromise = new Promise((_, reject) => {\n    timerId = setTimeout(() => {\n      reject(new Error('Operation timed out'));\n    }, timeoutMs);\n  });\n\n  return Promise.race([\n    promise.finally(() => clearTimeout(timerId)),\n    timeoutPromise\n  ]);\n}",
      "hint": {
        "en": "Create a timeoutPromise rejecting with Error after timeoutMs and pass both to Promise.race.",
        "vi": "Tạo một timeoutPromise reject với Error sau timeoutMs và truyền cả 2 vào Promise.race."
      }
    },
    {
      "id": "js_ex_15_2",
      "type": "complete_code",
      "title": {
        "en": "Sequential Promise Pipeline Runner",
        "vi": "Chạy Đường Ống Bất Đồng Bộ Tuần Tự (Async Waterfall Pipeline)"
      },
      "instruction": {
        "en": "Write a function `pipelineAsync(initialValue, ...asyncFns)` that passes `initialValue` through a sequence of async functions, where each function receives the resolved output of the previous step.",
        "vi": "Viết hàm `pipelineAsync(initialValue, ...asyncFns)` truyền `initialValue` qua một chuỗi các hàm async, trong đó mỗi hàm nhận kết quả trả về đã resolve của bước trước đó."
      },
      "starterCode": "async function pipelineAsync(initialValue, ...asyncFns) {\n  // Execute async functions in strict sequential order\n}\n\nconst add10 = async n => n + 10;\nconst double = async n => n * 2;\npipelineAsync(5, add10, double).then(console.log); // (5 + 10) * 2 = 30",
      "solutionCode": "async function pipelineAsync(initialValue, ...asyncFns) {\n  let current = initialValue;\n  for (const fn of asyncFns) {\n    current = await fn(current);\n  }\n  return current;\n}",
      "hint": {
        "en": "Use a for...of loop and await the result of each step, updating current before the next iteration.",
        "vi": "Dùng vòng lặp for...of và await kết quả từng bước, cập nhật biến current trước vòng lặp kế tiếp."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_15",
    "title": {
      "en": "Async Concurrency Worker Pool with Rate Limiting",
      "vi": "Hồ Chứa Worker Xử Lý Bất Đồng Bộ Giới Hạn Luồng Đồng Thời (Concurrency Limiter)"
    },
    "description": {
      "en": "Implement a function `mapConcurrent(items, limit, asyncTaskFn)` that executes `asyncTaskFn` on each item, but never allows more than `limit` async tasks to run concurrently. It must preserve output order matching the original items array.",
      "vi": "Cài đặt hàm `mapConcurrent(items, limit, asyncTaskFn)` thực thi `asyncTaskFn` trên từng phần tử, nhưng không bao giờ cho phép quá `limit` tác vụ chạy đồng thời. Kết quả trả về phải bảo toàn đúng thứ tự các phần tử của mảng ban đầu."
    },
    "starterCode": "async function mapConcurrent(items, limit, asyncTaskFn) {\n  // Execute with concurrency limit while preserving item order\n}\n\nconst tasks = [100, 200, 50, 80, 150];\nconst fakeFetch = ms => new Promise(res => setTimeout(() => res(`Done ${ms}`), ms));\nmapConcurrent(tasks, 2, fakeFetch).then(console.log);",
    "solutionCode": "async function mapConcurrent(items, limit, asyncTaskFn) {\n  const results = new Array(items.length);\n  let nextIndex = 0;\n\n  async function worker() {\n    while (nextIndex < items.length) {\n      const currentIndex = nextIndex++;\n      results[currentIndex] = await asyncTaskFn(items[currentIndex], currentIndex);\n    }\n  }\n\n  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());\n  await Promise.all(workers);\n  return results;\n}",
    "hints": [
      {
        "en": "Spawn `limit` persistent worker promises that pull items from a shared `nextIndex` cursor and write results at `results[currentIndex]`.",
        "vi": "Khởi tạo `limit` worker promises liên tục lấy việc từ biến con trỏ `nextIndex` và ghi kết quả vào `results[currentIndex]`."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Async Concurrency Worker Pool with Rate Limiting according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Hồ Chứa Worker Xử Lý Bất Đồng Bộ Giới Hạn Luồng Đồng Thời (Concurrency Limiter) theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_15_1",
      "type": "single_choice",
      "question": {
        "en": "What are the 3 possible states of a JavaScript Promise?",
        "vi": "3 trạng thái có thể có của một Promise trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "Pending, Fulfilled, Rejected",
          "vi": "Pending, Fulfilled, Rejected"
        },
        {
          "en": "Waiting, Success, Error",
          "vi": "Waiting, Success, Error"
        },
        {
          "en": "Open, Blocked, Closed",
          "vi": "Open, Blocked, Closed"
        },
        {
          "en": "Active, Inactive, Destroyed",
          "vi": "Active, Inactive, Destroyed"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "A Promise starts in 'pending' and transitions permanently to either 'fulfilled' or 'rejected'.",
        "vi": "Một Promise bắt đầu ở trạng thái 'pending' và chuyển vĩnh viễn sang 'fulfilled' hoặc 'rejected'."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "easy"
    },
    {
      "id": "js_q_15_2",
      "type": "predict_output",
      "question": {
        "en": "What does `Promise.all()` do if one of the promises rejects?",
        "vi": "`Promise.all()` sẽ phản ứng thế nào nếu một trong các Promise thành phần bị reject?"
      },
      "options": [
        {
          "en": "It immediately rejects with that error, ignoring all other pending/succeeded promises (Fail-Fast)",
          "vi": "Nó reject ngay lập tức với lỗi đó và bỏ qua các promise khác (Thất bại nhanh - Fail-Fast)"
        },
        {
          "en": "It ignores the error and returns null",
          "vi": "Nó bỏ qua lỗi và trả về null"
        },
        {
          "en": "It retries the rejected promise 3 times",
          "vi": "Nó tự động thử lại promise đó 3 lần"
        },
        {
          "en": "It waits for all others to finish before failing",
          "vi": "Nó chờ tất cả các promise khác chạy xong rồi mới báo lỗi"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Promise.all()` implements fail-fast behavior: if any input promise rejects, the entire aggregate promise immediately rejects.",
        "vi": "`Promise.all()` có cơ chế fail-fast: nếu bất kỳ promise nào reject, toàn bộ aggregate promise sẽ lập tức reject ngay."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "easy"
    },
    {
      "id": "js_q_15_3",
      "type": "single_choice",
      "question": {
        "en": "Which combinator waits for all input promises to settle, whether they fulfill or reject, and never rejects?",
        "vi": "Bộ kết hợp nào luôn chờ mọi Promise thành phần kết thúc (dù thành công hay thất bại) và không bao giờ tự reject?"
      },
      "options": [
        {
          "en": "Promise.allSettled()",
          "vi": "Promise.allSettled()"
        },
        {
          "en": "Promise.all()",
          "vi": "Promise.all()"
        },
        {
          "en": "Promise.race()",
          "vi": "Promise.race()"
        },
        {
          "en": "Promise.any()",
          "vi": "Promise.any()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Promise.allSettled()` resolves once all inputs have settled, returning status objects for each.",
        "vi": "`Promise.allSettled()` resolve khi toàn bộ đầu vào đã xong, trả về danh sách đối tượng trạng thái của từng tác vụ."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "easy"
    },
    {
      "id": "js_q_15_4",
      "type": "predict_output",
      "question": {
        "en": "What is the return value of an `async` function that returns a plain string `return 'Hello'`?",
        "vi": "Giá trị trả về của một hàm `async` có lệnh `return 'Hello'` là gì?"
      },
      "options": [
        {
          "en": "A Promise that resolves to `'Hello'`",
          "vi": "Một Promise resolve giá trị `'Hello'`"
        },
        {
          "en": "The plain string `'Hello'` synchronously",
          "vi": "Chuỗi ký tự `'Hello'` đồng bộ"
        },
        {
          "en": "undefined",
          "vi": "undefined"
        },
        {
          "en": "A Generator object",
          "vi": "Một Generator object"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Functions declared with `async` always wrap non-promise return values in `Promise.resolve()`.",
        "vi": "Các hàm khai báo `async` luôn tự động bọc giá trị trả về trong `Promise.resolve()`."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "medium"
    },
    {
      "id": "js_q_15_5",
      "type": "single_choice",
      "question": {
        "en": "What does `Promise.any()` do?",
        "vi": "`Promise.any()` thực hiện điều gì?"
      },
      "options": [
        {
          "en": "Resolves as soon as the FIRST promise fulfills; rejects with AggregateError only if ALL reject",
          "vi": "Resolve ngay khi có promise ĐẦU TIÊN thành công; chỉ reject với AggregateError khi TẤT CẢ đều thất bại"
        },
        {
          "en": "Resolves when any promise rejects",
          "vi": "Resolve khi có bất kỳ promise nào reject"
        },
        {
          "en": "Cancels all running promises",
          "vi": "Hủy toàn bộ các promise đang chạy"
        },
        {
          "en": "Selects a random promise to resolve",
          "vi": "Chọn ngẫu nhiên một promise để resolve"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Promise.any()` is designed for first-success scenarios, ignoring rejections until all fail.",
        "vi": "`Promise.any()` tối ưu cho bài toán lấy kết quả thành công đầu tiên, bỏ qua các lỗi cho đến khi tất cả đều hỏng."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "medium"
    },
    {
      "id": "js_q_15_6",
      "type": "predict_output",
      "question": {
        "en": "What will `console.log` output?\n```js\nasync function test() {\n  return 42;\n}\nconsole.log(typeof test());\n```",
        "vi": "Đoạn mã sau sẽ in ra gì?\n```js\nasync function test() {\n  return 42;\n}\nconsole.log(typeof test());\n```"
      },
      "options": [
        {
          "en": "'object' (Promises are objects)",
          "vi": "'object' (Promise là đối tượng)"
        },
        {
          "en": "'number'",
          "vi": "'number'"
        },
        {
          "en": "'function'",
          "vi": "'function'"
        },
        {
          "en": "'undefined'",
          "vi": "'undefined'"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`test()` returns a Promise instance, whose `typeof` in JavaScript is `'object'`.",
        "vi": "`test()` trả về một instance của Promise, kiểu dữ liệu `typeof` trong JavaScript là `'object'`."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "medium"
    },
    {
      "id": "js_q_15_7",
      "type": "fill_blank",
      "question": {
        "en": "In a try/catch/finally block around an async operation, the _____ block is guaranteed to execute regardless of whether an error occurred.",
        "vi": "Trong khối try/catch/finally bọc tác vụ async, khối _____ luôn được đảm bảo thực thi bất kể có phát sinh lỗi hay không."
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
        "en": "The `finally` block runs cleanup code when the try/catch sequence terminates.",
        "vi": "Khối `finally` thực thi các đoạn mã dọn dẹp tài nguyên khi chuỗi try/catch kết thúc."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "finally"
      ]
    },
    {
      "id": "js_q_15_8",
      "type": "single_choice",
      "question": {
        "en": "How do you handle errors from an `await` expression inside an async function?",
        "vi": "Cách xử lý lỗi phát sinh từ một biểu thức `await` trong hàm async là gì?"
      },
      "options": [
        {
          "en": "Wrap the `await` expression in a standard `try...catch` block",
          "vi": "Bọc biểu thức `await` trong khối `try...catch` thông thường"
        },
        {
          "en": "Call window.onerror()",
          "vi": "Gọi window.onerror()"
        },
        {
          "en": "Use an if (await == false) check",
          "vi": "Dùng câu lệnh kiểm tra if (await == false)"
        },
        {
          "en": "Async errors cannot be caught",
          "vi": "Lỗi async không thể bắt được"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Rejected promises awaited inside an `async` function throw an exception that can be caught by `try...catch`.",
        "vi": "Promise bị reject khi được `await` trong hàm async sẽ ném ra ngoại lệ có thể bắt được bằng `try...catch`."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "hard"
    },
    {
      "id": "js_q_15_9",
      "type": "predict_output",
      "question": {
        "en": "What happens if an unhandled rejection occurs in modern Node.js environments?",
        "vi": "Điều gì xảy ra nếu có một Promise reject mà không được bắt lỗi (unhandled rejection) trong Node.js hiện đại?"
      },
      "options": [
        {
          "en": "The Node.js process terminates with a non-zero exit code (crashes)",
          "vi": "Tiến trình Node.js sẽ dừng lại với mã thoát khác 0 (sập ứng dụng)"
        },
        {
          "en": "It prints a warning and ignores it forever",
          "vi": "Nó chỉ in cảnh báo và bỏ qua"
        },
        {
          "en": "It automatically reboots the server",
          "vi": "Nó tự động khởi động lại server"
        },
        {
          "en": "It pauses until user input",
          "vi": "Nó tạm dừng chờ tương tác người dùng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In modern Node.js versions, unhandled Promise rejections terminate the process with a fatal exit code.",
        "vi": "Trong các phiên bản Node.js hiện đại, lỗi Promise không được bắt (unhandled rejection) sẽ làm tiến trình bị crash."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "hard"
    },
    {
      "id": "js_q_15_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `const results = await Promise.all(urls.map(fetch))` preferred over a sequential `for (const url of urls) await fetch(url)` for independent data?",
        "vi": "Tại sao `const results = await Promise.all(urls.map(fetch))` được ưa chuộng hơn vòng lặp tuần tự `for (const url of urls) await fetch(url)` khi dữ liệu độc lập?"
      },
      "options": [
        {
          "en": "`Promise.all` initiates all network requests concurrently in parallel, reducing total waiting time to the single slowest request rather than the sum of all requests",
          "vi": "`Promise.all` kích hoạt toàn bộ các request mạng cùng lúc song song, giảm tổng thời gian chờ xuống bằng thời gian của request chậm nhất thay vì tổng thời gian của tất cả cộng lại"
        },
        {
          "en": "`for` loops cannot access internet",
          "vi": "Vòng lặp `for` không thể truy cập internet"
        },
        {
          "en": "`Promise.all` bypasses CORS restrictions",
          "vi": "`Promise.all` vượt qua hạn chế CORS"
        },
        {
          "en": "`urls.map` runs in C++ kernel",
          "vi": "`urls.map` chạy trong kernel C++"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Parallel requests overlap network round-trip latency, resulting in massive performance gains.",
        "vi": "Gửi request song song giúp gộp thời gian chờ mạng, mang lại bước nhảy vọt về hiệu năng."
      },
      "topicId": "js_promises_async_await",
      "difficulty": "hard"
    }
  ]
};
export default lesson15;
