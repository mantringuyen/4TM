import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const dir = path.join(process.cwd(), 'src/data/javascript/intermediate/module02');
fs.mkdirSync(dir, { recursive: true });

// --- LESSON 15 ---
const lesson15: Lesson = {
  id: "js_lesson_15",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_4",
  order: 15,
  title: {
    en: "Promises, Async/Await & Promise Combinators",
    vi: "Promises, Async/Await & Các Bộ Kết Hợp Promise Combinators"
  },
  summary: {
    en: "Master asynchronous workflow orchestration using Promises, async/await, try/catch/finally error handling, and the 4 Promise combinators (all, allSettled, race, any).",
    vi: "Làm chủ điều phối luồng xử lý bất đồng bộ bằng Promises, cú pháp async/await, xử lý lỗi toàn diện với try/catch/finally và 4 bộ kết hợp Promise (all, allSettled, race, any)."
  },
  estimatedMinutes: 24,
  topicId: "js_promises_async_await",
  learn: {
    introduction: {
      en: "JavaScript Promises revolutionized asynchronous architecture by replacing unmaintainable nested callbacks ('callback hell') with standardized, composable stateful objects. Combined with ES2017 `async`/`await` syntactic sugar, developers can write asynchronous code that reads sequentially while retaining non-blocking performance.",
      vi: "Promises đã tạo ra cuộc cách mạng trong kiến trúc bất đồng bộ của JavaScript, thay thế hoàn toàn tình trạng lồng callback phức tạp ('callback hell') bằng các đối tượng trạng thái chuẩn mực và dễ ghép nối. Kết hợp với cú pháp `async`/`await` của ES2017, lập trình viên có thể viết mã bất đồng bộ tuần tự, dễ đọc như mã đồng bộ mà vẫn giữ trọn vẹn hiệu năng không chặn (non-blocking)."
    },
    conceptExplanation: {
      en: "1. The 3 Promise States: `pending` (initial), `fulfilled` (resolved with value), `rejected` (rejected with error). Once settled (fulfilled or rejected), a Promise becomes immutable forever.\n\n2. Async/Await Mechanics: An `async` function always returns a Promise. The `await` keyword pauses the execution of the async function body non-blockingly until the awaited Promise settles.\n\n3. The 4 Promise Combinators:\n   - `Promise.all([p1, p2])`: Fails fast! Resolves when ALL promises succeed, or rejects immediately when ANY promise rejects.\n   - `Promise.allSettled([p1, p2])`: Never fails fast. Resolves when ALL promises finish, returning an array of `{ status: 'fulfilled' | 'rejected', value?, reason? }`.\n   - `Promise.race([p1, p2])`: Settles as soon as the FIRST promise settles (whether fulfilled or rejected).\n   - `Promise.any([p1, p2])`: Resolves as soon as the FIRST promise FULFILLS. Rejects with an `AggregateError` only if all promises fail.",
      vi: "1. 3 Trạng Thái Của Promise: `pending` (đang chờ), `fulfilled` (thành công với giá trị), `rejected` (thất bại với lỗi). Khi đã chuyển trạng thái (settled), Promise trở nên bất biến vĩnh viễn.\n\n2. Cơ Chế Async/Await: Hàm khai báo `async` luôn trả về một Promise. Từ khóa `await` tạm dừng thực thi thân hàm async một cách không chặn cho đến khi Promise được resolve hoặc reject.\n\n3. 4 Bộ Kết Hợp Promise Combinators:\n   - `Promise.all([p1, p2])`: Thất bại nhanh (Fail-fast)! Resolve khi TẤT CẢ promise thành công, hoặc reject ngay khi có BẤT KỲ promise nào thất bại.\n   - `Promise.allSettled([p1, p2])`: Không bao giờ fail-fast. Chờ TẤT CẢ hoàn thành, trả về mảng chứa trạng thái `{ status: 'fulfilled' | 'rejected', value?, reason? }`.\n   - `Promise.race([p1, p2])`: Kết thúc ngay khi promise ĐẦU TIÊN xong (dù thành công hay thất bại).\n   - `Promise.any([p1, p2])`: Resolve ngay khi có promise ĐẦU TIÊN THÀNH CÔNG. Chỉ reject với lỗi `AggregateError` nếu toàn bộ đều thất bại."
    },
    syntax: `// 1. Async/await with try/catch/finally
async function fetchUserProfile(userId) {
  try {
    const res = await fetch(\`/api/users/\${userId}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch failed:", err.message);
    throw err;
  } finally {
    console.log("Request attempt completed");
  }
}

// 2. Parallel orchestration with Promise.all vs allSettled
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Resilient Multi-Endpoint Data Sync with Fallbacks",
          vi: "Đồng Bộ Dữ Liệu Đa Nguồn Bền Vững Với Promise.allSettled"
        },
        description: {
          en: "Demonstrates querying multiple third-party weather providers and aggregating successful responses while capturing failed endpoints without aborting.",
          vi: "Minh họa truy vấn nhiều nhà cung cấp thời tiết và tổng hợp kết quả thành công mà không bị sập khi một nguồn gặp sự cố."
        },
        code: `async function syncWeatherFeeds(cities) {
  const requests = cities.map(city =>
    fetch(\`https://api.weather.mock/v1/\${city}\`)
      .then(res => res.json())
      .then(data => ({ city, temp: data.temp }))
  );

  const results = await Promise.allSettled(requests);

  const successful = [];
  const failures = [];

  results.forEach((res, index) => {
    if (res.status === "fulfilled") {
      successful.push(res.value);
    } else {
      failures.push({ city: cities[index], reason: res.reason?.message || "Unknown error" });
    }
  });

  return { successful, failures };
}`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Executing independent async operations in a sequential `for...of` loop with `await`, causing unnecessary waterfall latency.",
          vi: "Chạy các tác vụ bất đồng bộ độc lập tuần tự bằng `await` trong vòng lặp `for...of`, gây độ trễ dồn (waterfall latency)."
        },
        correction: {
          en: "Use `Promise.all(items.map(fn))` to execute independent requests concurrently in parallel.",
          vi: "Dùng `Promise.all(items.map(fn))` để gửi đồng thời các request độc lập chạy song song."
        },
        explanation: {
          en: "Awaiting in a loop waits for item 1 to finish before starting item 2. If each takes 1s, 5 items take 5s instead of 1s in parallel.",
          vi: "Await trong vòng lặp buộc phải chờ item 1 xong mới gọi item 2. 5 request mỗi cái 1s sẽ mất tổng cộng 5s thay vì chỉ mất 1s khi chạy song song."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Always attach timeout boundaries to external network Promises",
          vi: "Luôn gắn giới hạn thời gian chờ (Timeout) cho các Promise gọi mạng"
        },
        description: {
          en: "Use `Promise.race([fetchPromise, timeoutPromise])` or `AbortController` with `signal` so stalled requests do not hang your server or UI indefinitely.",
          vi: "Sử dụng `Promise.race` kết hợp timeout hoặc `AbortController` để ngăn ngừa các request treo vô thời hạn làm đơ ứng dụng."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_15_1",
      title: {
        en: "Async Timeout Wrapper with Promise.race",
        vi: "Bọc Timeout Cho Tác Vụ Bất Đồng Bộ Bằng Promise.race"
      },
      instruction: {
        en: "Write a function `withTimeout(promise, timeoutMs)` that wraps any Promise. If the original promise resolves or rejects before `timeoutMs`, return its result. If `timeoutMs` elapses first, reject with `new Error('Operation timed out')`.",
        vi: "Viết hàm `withTimeout(promise, timeoutMs)` bọc một Promise bất kỳ. Nếu Promise hoàn thành trước `timeoutMs`, trả về kết quả đó. Nếu hết thời gian `timeoutMs`, reject với `new Error('Operation timed out')`."
      },
      starterCode: `function withTimeout(promise, timeoutMs) {
  // Implement timeout wrapper with Promise.race
}

const slowTask = new Promise(resolve => setTimeout(() => resolve("Success!"), 500));
withTimeout(slowTask, 200).catch(err => console.log(err.message)); // "Operation timed out"`,
      solutionCode: `function withTimeout(promise, timeoutMs) {
  let timerId;
  const timeoutPromise = new Promise((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error('Operation timed out'));
    }, timeoutMs);
  });

  return Promise.race([
    promise.finally(() => clearTimeout(timerId)),
    timeoutPromise
  ]);
}`,
      hints: [
        {
          en: "Create a timeoutPromise rejecting with Error after timeoutMs and pass both to Promise.race.",
          vi: "Tạo một timeoutPromise reject với Error sau timeoutMs và truyền cả 2 vào Promise.race."
        }
      ]
    },
    {
      id: "js_ex_15_2",
      title: {
        en: "Sequential Promise Pipeline Runner",
        vi: "Chạy Đường Ống Bất Đồng Bộ Tuần Tự (Async Waterfall Pipeline)"
      },
      instruction: {
        en: "Write a function `pipelineAsync(initialValue, ...asyncFns)` that passes `initialValue` through a sequence of async functions, where each function receives the resolved output of the previous step.",
        vi: "Viết hàm `pipelineAsync(initialValue, ...asyncFns)` truyền `initialValue` qua một chuỗi các hàm async, trong đó mỗi hàm nhận kết quả trả về đã resolve của bước trước đó."
      },
      starterCode: `async function pipelineAsync(initialValue, ...asyncFns) {
  // Execute async functions in strict sequential order
}

const add10 = async n => n + 10;
const double = async n => n * 2;
pipelineAsync(5, add10, double).then(console.log); // (5 + 10) * 2 = 30`,
      solutionCode: `async function pipelineAsync(initialValue, ...asyncFns) {
  let current = initialValue;
  for (const fn of asyncFns) {
    current = await fn(current);
  }
  return current;
}`,
      hints: [
        {
          en: "Use a for...of loop and await the result of each step, updating current before the next iteration.",
          vi: "Dùng vòng lặp for...of và await kết quả từng bước, cập nhật biến current trước vòng lặp kế tiếp."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_15",
    title: {
      en: "Async Concurrency Worker Pool with Rate Limiting",
      vi: "Hồ Chứa Worker Xử Lý Bất Đồng Bộ Giới Hạn Luồng Đồng Thời (Concurrency Limiter)"
    },
    description: {
      en: "Implement a function `mapConcurrent(items, limit, asyncTaskFn)` that executes `asyncTaskFn` on each item, but never allows more than `limit` async tasks to run concurrently. It must preserve output order matching the original items array.",
      vi: "Cài đặt hàm `mapConcurrent(items, limit, asyncTaskFn)` thực thi `asyncTaskFn` trên từng phần tử, nhưng không bao giờ cho phép quá `limit` tác vụ chạy đồng thời. Kết quả trả về phải bảo toàn đúng thứ tự các phần tử của mảng ban đầu."
    },
    starterCode: `async function mapConcurrent(items, limit, asyncTaskFn) {
  // Execute with concurrency limit while preserving item order
}

const tasks = [100, 200, 50, 80, 150];
const fakeFetch = ms => new Promise(res => setTimeout(() => res(\`Done \${ms}\`), ms));
mapConcurrent(tasks, 2, fakeFetch).then(console.log);`,
    solutionCode: `async function mapConcurrent(items, limit, asyncTaskFn) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex++;
      results[currentIndex] = await asyncTaskFn(items[currentIndex], currentIndex);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}`,
    hints: [
      {
        en: "Spawn `limit` persistent worker promises that pull items from a shared `nextIndex` cursor and write results at `results[currentIndex]`.",
        vi: "Khởi tạo `limit` worker promises liên tục lấy việc từ biến con trỏ `nextIndex` và ghi kết quả vào `results[currentIndex]`."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_15_1",
      type: "single_choice",
      question: {
        en: "What are the 3 possible states of a JavaScript Promise?",
        vi: "3 trạng thái có thể có của một Promise trong JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "Pending, Fulfilled, Rejected", vi: "Pending, Fulfilled, Rejected" } },
        { id: "b", text: { en: "Waiting, Success, Error", vi: "Waiting, Success, Error" } },
        { id: "c", text: { en: "Open, Blocked, Closed", vi: "Open, Blocked, Closed" } },
        { id: "d", text: { en: "Active, Inactive, Destroyed", vi: "Active, Inactive, Destroyed" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "A Promise starts in 'pending' and transitions permanently to either 'fulfilled' or 'rejected'.",
        vi: "Một Promise bắt đầu ở trạng thái 'pending' và chuyển vĩnh viễn sang 'fulfilled' hoặc 'rejected'."
      }
    },
    {
      id: "js_q_15_2",
      type: "predict_output",
      question: {
        en: "What does `Promise.all()` do if one of the promises rejects?",
        vi: "`Promise.all()` sẽ phản ứng thế nào nếu một trong các Promise thành phần bị reject?"
      },
      options: [
        { id: "a", text: { en: "It immediately rejects with that error, ignoring all other pending/succeeded promises (Fail-Fast)", vi: "Nó reject ngay lập tức với lỗi đó và bỏ qua các promise khác (Thất bại nhanh - Fail-Fast)" } },
        { id: "b", text: { en: "It ignores the error and returns null", vi: "Nó bỏ qua lỗi và trả về null" } },
        { id: "c", text: { en: "It retries the rejected promise 3 times", vi: "Nó tự động thử lại promise đó 3 lần" } },
        { id: "d", text: { en: "It waits for all others to finish before failing", vi: "Nó chờ tất cả các promise khác chạy xong rồi mới báo lỗi" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Promise.all()` implements fail-fast behavior: if any input promise rejects, the entire aggregate promise immediately rejects.",
        vi: "`Promise.all()` có cơ chế fail-fast: nếu bất kỳ promise nào reject, toàn bộ aggregate promise sẽ lập tức reject ngay."
      }
    },
    {
      id: "js_q_15_3",
      type: "single_choice",
      question: {
        en: "Which combinator waits for all input promises to settle, whether they fulfill or reject, and never rejects?",
        vi: "Bộ kết hợp nào luôn chờ mọi Promise thành phần kết thúc (dù thành công hay thất bại) và không bao giờ tự reject?"
      },
      options: [
        { id: "a", text: { en: "Promise.allSettled()", vi: "Promise.allSettled()" } },
        { id: "b", text: { en: "Promise.all()", vi: "Promise.all()" } },
        { id: "c", text: { en: "Promise.race()", vi: "Promise.race()" } },
        { id: "d", text: { en: "Promise.any()", vi: "Promise.any()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Promise.allSettled()` resolves once all inputs have settled, returning status objects for each.",
        vi: "`Promise.allSettled()` resolve khi toàn bộ đầu vào đã xong, trả về danh sách đối tượng trạng thái của từng tác vụ."
      }
    },
    {
      id: "js_q_15_4",
      type: "predict_output",
      question: {
        en: "What is the return value of an `async` function that returns a plain string `return 'Hello'`?",
        vi: "Giá trị trả về của một hàm `async` có lệnh `return 'Hello'` là gì?"
      },
      options: [
        { id: "a", text: { en: "A Promise that resolves to `'Hello'`", vi: "Một Promise resolve giá trị `'Hello'`" } },
        { id: "b", text: { en: "The plain string `'Hello'` synchronously", vi: "Chuỗi ký tự `'Hello'` đồng bộ" } },
        { id: "c", text: { en: "undefined", vi: "undefined" } },
        { id: "d", text: { en: "A Generator object", vi: "Một Generator object" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Functions declared with `async` always wrap non-promise return values in `Promise.resolve()`.",
        vi: "Các hàm khai báo `async` luôn tự động bọc giá trị trả về trong `Promise.resolve()`."
      }
    },
    {
      id: "js_q_15_5",
      type: "single_choice",
      question: {
        en: "What does `Promise.any()` do?",
        vi: "`Promise.any()` thực hiện điều gì?"
      },
      options: [
        { id: "a", text: { en: "Resolves as soon as the FIRST promise fulfills; rejects with AggregateError only if ALL reject", vi: "Resolve ngay khi có promise ĐẦU TIÊN thành công; chỉ reject với AggregateError khi TẤT CẢ đều thất bại" } },
        { id: "b", text: { en: "Resolves when any promise rejects", vi: "Resolve khi có bất kỳ promise nào reject" } },
        { id: "c", text: { en: "Cancels all running promises", vi: "Hủy toàn bộ các promise đang chạy" } },
        { id: "d", text: { en: "Selects a random promise to resolve", vi: "Chọn ngẫu nhiên một promise để resolve" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Promise.any()` is designed for first-success scenarios, ignoring rejections until all fail.",
        vi: "`Promise.any()` tối ưu cho bài toán lấy kết quả thành công đầu tiên, bỏ qua các lỗi cho đến khi tất cả đều hỏng."
      }
    },
    {
      id: "js_q_15_6",
      type: "predict_output",
      question: {
        en: "What will `console.log` output?\n```js\nasync function test() {\n  return 42;\n}\nconsole.log(typeof test());\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nasync function test() {\n  return 42;\n}\nconsole.log(typeof test());\n```"
      },
      options: [
        { id: "a", text: { en: "'object' (Promises are objects)", vi: "'object' (Promise là đối tượng)" } },
        { id: "b", text: { en: "'number'", vi: "'number'" } },
        { id: "c", text: { en: "'function'", vi: "'function'" } },
        { id: "d", text: { en: "'undefined'", vi: "'undefined'" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`test()` returns a Promise instance, whose `typeof` in JavaScript is `'object'`.",
        vi: "`test()` trả về một instance của Promise, kiểu dữ liệu `typeof` trong JavaScript là `'object'`."
      }
    },
    {
      id: "js_q_15_7",
      type: "fill_blank",
      question: {
        en: "In a try/catch/finally block around an async operation, the _____ block is guaranteed to execute regardless of whether an error occurred.",
        vi: "Trong khối try/catch/finally bọc tác vụ async, khối _____ luôn được đảm bảo thực thi bất kể có phát sinh lỗi hay không."
      },
      correctAnswer: "finally",
      explanation: {
        en: "The `finally` block runs cleanup code when the try/catch sequence terminates.",
        vi: "Khối `finally` thực thi các đoạn mã dọn dẹp tài nguyên khi chuỗi try/catch kết thúc."
      }
    },
    {
      id: "js_q_15_8",
      type: "single_choice",
      question: {
        en: "How do you handle errors from an `await` expression inside an async function?",
        vi: "Cách xử lý lỗi phát sinh từ một biểu thức `await` trong hàm async là gì?"
      },
      options: [
        { id: "a", text: { en: "Wrap the `await` expression in a standard `try...catch` block", vi: "Bọc biểu thức `await` trong khối `try...catch` thông thường" } },
        { id: "b", text: { en: "Call window.onerror()", vi: "Gọi window.onerror()" } },
        { id: "c", text: { en: "Use an if (await == false) check", vi: "Dùng câu lệnh kiểm tra if (await == false)" } },
        { id: "d", text: { en: "Async errors cannot be caught", vi: "Lỗi async không thể bắt được" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Rejected promises awaited inside an `async` function throw an exception that can be caught by `try...catch`.",
        vi: "Promise bị reject khi được `await` trong hàm async sẽ ném ra ngoại lệ có thể bắt được bằng `try...catch`."
      }
    },
    {
      id: "js_q_15_9",
      type: "predict_output",
      question: {
        en: "What happens if an unhandled rejection occurs in modern Node.js environments?",
        vi: "Điều gì xảy ra nếu có một Promise reject mà không được bắt lỗi (unhandled rejection) trong Node.js hiện đại?"
      },
      options: [
        { id: "a", text: { en: "The Node.js process terminates with a non-zero exit code (crashes)", vi: "Tiến trình Node.js sẽ dừng lại với mã thoát khác 0 (sập ứng dụng)" } },
        { id: "b", text: { en: "It prints a warning and ignores it forever", vi: "Nó chỉ in cảnh báo và bỏ qua" } },
        { id: "c", text: { en: "It automatically reboots the server", vi: "Nó tự động khởi động lại server" } },
        { id: "d", text: { en: "It pauses until user input", vi: "Nó tạm dừng chờ tương tác người dùng" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "In modern Node.js versions, unhandled Promise rejections terminate the process with a fatal exit code.",
        vi: "Trong các phiên bản Node.js hiện đại, lỗi Promise không được bắt (unhandled rejection) sẽ làm tiến trình bị crash."
      }
    },
    {
      id: "js_q_15_10",
      type: "code_reasoning",
      question: {
        en: "Why is `const results = await Promise.all(urls.map(fetch))` preferred over a sequential `for (const url of urls) await fetch(url)` for independent data?",
        vi: "Tại sao `const results = await Promise.all(urls.map(fetch))` được ưa chuộng hơn vòng lặp tuần tự `for (const url of urls) await fetch(url)` khi dữ liệu độc lập?"
      },
      options: [
        { id: "a", text: { en: "`Promise.all` initiates all network requests concurrently in parallel, reducing total waiting time to the single slowest request rather than the sum of all requests", vi: "`Promise.all` kích hoạt toàn bộ các request mạng cùng lúc song song, giảm tổng thời gian chờ xuống bằng thời gian của request chậm nhất thay vì tổng thời gian của tất cả cộng lại" } },
        { id: "b", text: { en: "`for` loops cannot access internet", vi: "Vòng lặp `for` không thể truy cập internet" } },
        { id: "c", text: { en: "`Promise.all` bypasses CORS restrictions", vi: "`Promise.all` vượt qua hạn chế CORS" } },
        { id: "d", text: { en: "`urls.map` runs in C++ kernel", vi: "`urls.map` chạy trong kernel C++" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Parallel requests overlap network round-trip latency, resulting in massive performance gains.",
        vi: "Gửi request song song giúp gộp thời gian chờ mạng, mang lại bước nhảy vọt về hiệu năng."
      }
    }
  ]
};

// --- LESSON 16 ---
const lesson16: Lesson = {
  id: "js_lesson_16",
  courseId: "javascript",
  levelId: "intermediate",
  moduleId: "js_mod_4",
  order: 16,
  title: {
    en: "Prototypes & Prototypal Inheritance Mechanics",
    vi: "Prototypes & Cơ Chế Kế Thừa Nguyên Mẫu (Prototypal Inheritance)"
  },
  summary: {
    en: "Master the JavaScript prototype chain, Object.prototype, constructor functions, Object.create, the difference between __proto__ and prototype, and property shadowing.",
    vi: "Làm chủ chuỗi prototype chain, Object.prototype, hàm khởi tạo constructor, Object.create, phân biệt __proto__ vs prototype và cơ chế property shadowing."
  },
  estimatedMinutes: 22,
  topicId: "js_prototypes_inheritance",
  learn: {
    introduction: {
      en: "Unlike traditional class-based languages (Java, C++) which instantiate objects by copying class blueprints, JavaScript utilizes prototypal inheritance. Every object has an internal link (`[[Prototype]]`) pointing to another object. When accessing a property or method, the JavaScript engine traverses up the prototype chain until it finds the member or reaches `null` at the top of `Object.prototype`.",
      vi: "Khác với các ngôn ngữ hướng đối tượng cổ điển dựa trên class (Java, C++) vốn tạo đối tượng bằng cách sao chép khuôn mẫu, JavaScript sử dụng mô hình kế thừa nguyên mẫu (Prototypal Inheritance). Mỗi đối tượng đều có một liên kết nội bộ (`[[Prototype]]`) trỏ tới một đối tượng khác. Khi truy cập thuộc tính hoặc phương thức, engine JavaScript sẽ duyệt ngược lên chuỗi Prototype Chain cho đến khi tìm thấy hoặc chạm tới `null` ở đỉnh của `Object.prototype`."
    },
    conceptExplanation: {
      en: "1. The Prototype Chain: If `obj.prop` is not found on `obj`, the engine checks `Object.getPrototypeOf(obj)`, then that object's prototype, up to `Object.prototype`, then `null`.\n\n2. `prototype` vs `__proto__` / `[[Prototype]]`:\n   - `ConstructorFunction.prototype`: The blueprint object attached to constructor functions that will become the `[[Prototype]]` of any instances created with `new`.\n   - `Object.getPrototypeOf(instance)` (formerly `__proto__`): The actual live reference on an instance pointing to its fallback prototype object.\n\n3. Property Shadowing: Defining a property directly on an instance overrides (shadows) a property of the same name on its prototype without modifying the prototype.\n\n4. `Object.create(proto)`: Creates a brand-new object with its `[[Prototype]]` set directly to `proto` without running a constructor.",
      vi: "1. Chuỗi Prototype Chain: Nếu `obj.prop` không có trên `obj`, engine kiểm tra `Object.getPrototypeOf(obj)`, rồi tiếp tục duyệt lên cho đến `Object.prototype`, và cuối cùng là `null`.\n\n2. Phân Biệt `prototype` vs `[[Prototype]]` (hoặc `__proto__`):\n   - `ConstructorFunction.prototype`: Đối tượng khuôn mẫu gắn trên hàm constructor, sẽ trở thành `[[Prototype]]` của các instance được tạo bằng từ khóa `new`.\n   - `Object.getPrototypeOf(instance)`: Tham chiếu thực tế trên instance trỏ tới đối tượng prototype của nó.\n\n3. Cơ Chế Che Khuất (Property Shadowing): Khai báo thuộc tính trực tiếp trên instance sẽ che khuất thuộc tính cùng tên trên prototype mà không làm thay đổi prototype.\n\n4. `Object.create(proto)`: Khởi tạo một đối tượng mới hoàn toàn với `[[Prototype]]` trỏ trực tiếp tới `proto` mà không cần chạy qua hàm constructor."
    },
    syntax: `// 1. Classic Constructor Function and Prototype Attachment
function Vehicle(make, model) {
  this.make = make;
  this.model = model;
}

// Methods are placed on .prototype to share memory across all instances!
Vehicle.prototype.getInfo = function() {
  return \`\${this.make} \${this.model}\`;
};

const car = new Vehicle("Toyota", "Corolla");
console.log(car.getInfo()); // "Toyota Corolla"
console.log(Object.getPrototypeOf(car) === Vehicle.prototype); // true

// 2. Pure Prototypal Linkage with Object.create
const baseLogger = {
  log(msg) { console.log(\`[\${this.prefix || "LOG"}] \${msg}\`); }
};
const appLogger = Object.create(baseLogger);
appLogger.prefix = "APP";
appLogger.log("Started successfully"); // "[APP] Started successfully"`,
    examples: [
      {
        language: "javascript",
        title: {
          en: "Classical Prototypal Subclassing Chain",
          vi: "Kế Thừa Đa Tầng Bằng Chuỗi Prototype Cổ Điển"
        },
        description: {
          en: "Demonstrates subclassing with Constructor.prototype = Object.create(Super.prototype) and fixing the constructor property.",
          vi: "Minh họa kế thừa giữa các hàm constructor bằng Object.create và phục hồi thuộc tính constructor."
        },
        code: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return \`\${this.name} makes a sound.\`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Super call
  this.breed = breed;
}

// Wire the prototype chain: Dog.prototype inherits from Animal.prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Repair constructor reference

Dog.prototype.bark = function() {
  return \`\${this.name} barks loudly!\`;
};

const d = new Dog("Buddy", "Golden Retriever");
console.log(d.bark());  // "Buddy barks loudly!"
console.log(d.speak()); // "Buddy makes a sound." (from Animal.prototype)
console.log(d instanceof Dog);    // true
console.log(d instanceof Animal); // true`
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: "Declaring methods directly inside the constructor function `this.method = function() {}` instead of on `Constructor.prototype`.",
          vi: "Khai báo phương thức trực tiếp trong thân constructor `this.method = function() {}` thay vì gán trên `Constructor.prototype`."
        },
        correction: {
          en: "Attach shared methods to `Constructor.prototype` so 10,000 instances share a single memory reference.",
          vi: "Gắn các phương thức dùng chung lên `Constructor.prototype` để 10,000 instance cùng chia sẻ 1 bản copy duy nhất trong bộ nhớ."
        },
        explanation: {
          en: "Defining functions inside `this` creates a new function object in memory for every single instance created.",
          vi: "Định nghĩa hàm trong `this` sẽ khởi tạo một object hàm mới trong RAM cho mỗi instance được tạo ra."
        }
      }
    ],
    bestPractices: [
      {
        title: {
          en: "Use Object.getPrototypeOf() and Object.setPrototypeOf() instead of __proto__",
          vi: "Dùng Object.getPrototypeOf() thay cho thuộc tính __proto__"
        },
        description: {
          en: "`__proto__` is an accessor property that is considered legacy. Use the standard static `Object.getPrototypeOf(obj)` for clean inspection.",
          vi: "`__proto__` là cú pháp cũ. Hãy dùng `Object.getPrototypeOf(obj)` chuẩn hóa để kiểm tra prototype an toàn."
        }
      }
    ]
  },
  exercisePool: [
    {
      id: "js_ex_16_1",
      title: {
        en: "Inspect Prototype Chain Depth",
        vi: "Đo Độ Sâu Của Chuỗi Prototype Chain"
      },
      instruction: {
        en: "Write a function `getPrototypeChain(obj)` that traverses up the prototype chain of `obj` using `Object.getPrototypeOf()` and returns an array of all prototype objects up to (and including) `Object.prototype`.",
        vi: "Viết hàm `getPrototypeChain(obj)` duyệt ngược lên chuỗi prototype của `obj` bằng `Object.getPrototypeOf()` và trả về mảng chứa tất cả các đối tượng prototype cho tới (và bao gồm) `Object.prototype`."
      },
      starterCode: `function getPrototypeChain(obj) {
  // Traverse and return array of prototypes
}

const arr = [1, 2, 3];
const chain = getPrototypeChain(arr);
console.log(chain.length); // 2 (Array.prototype, Object.prototype)`,
      solutionCode: `function getPrototypeChain(obj) {
  if (obj === null || obj === undefined) return [];
  const prototypes = [];
  let current = Object.getPrototypeOf(obj);
  while (current !== null) {
    prototypes.push(current);
    current = Object.getPrototypeOf(current);
  }
  return prototypes;
}`,
      hints: [
        {
          en: "Use a while loop checking `current !== null` and step up with `current = Object.getPrototypeOf(current)`.",
          vi: "Dùng vòng lặp while kiểm tra `current !== null` và bước lên bằng `current = Object.getPrototypeOf(current)`."
        }
      ]
    },
    {
      id: "js_ex_16_2",
      title: {
        en: "Custom Object.create Polyfill Implementation",
        vi: "Tự Cài Đặt Hàm Khởi Tạo Object.create"
      },
      instruction: {
        en: "Implement a function `customCreate(proto, propertiesObject)` that creates a new object whose `[[Prototype]]` is `proto`. If `propertiesObject` is supplied, define those properties on the new object using `Object.defineProperties()`.",
        vi: "Cài đặt hàm `customCreate(proto, propertiesObject)` tạo ra đối tượng mới có `[[Prototype]]` là `proto`. Nếu có `propertiesObject`, định nghĩa các thuộc tính đó lên đối tượng mới bằng `Object.defineProperties()`."
      },
      starterCode: `function customCreate(proto, propertiesObject) {
  // Implement Object.create polyfill
}

const parent = { greet() { return "Hello from parent"; } };
const child = customCreate(parent, {
  name: { value: "ChildObj", enumerable: true }
});
console.log(child.greet()); // "Hello from parent"
console.log(child.name);    // "ChildObj"`,
      solutionCode: `function customCreate(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null');
  }

  function F() {}
  F.prototype = proto;
  const obj = new F();

  if (proto === null) {
    Object.setPrototypeOf(obj, null);
  }

  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }

  return obj;
}`,
      hints: [
        {
          en: "Create a temporary constructor F, assign F.prototype = proto, instantiate `new F()`, and define properties if provided.",
          vi: "Tạo hàm constructor tạm F, gán F.prototype = proto, khởi tạo `new F()` và định nghĩa thuộc tính nếu có."
        }
      ]
    }
  ],
  challenge: {
    id: "js_chal_16",
    title: {
      en: "Multiple Mixin Inheritance Composer via Prototypes",
      vi: "Bộ Ghép Nối Đa Kế Thừa Mixins Bằng Prototype Chain"
    },
    description: {
      en: "Create a utility function `composeMixins(TargetConstructor, ...mixins)` that copies all methods (including getters and non-enumerable descriptor configurations) from multiple mixin objects onto `TargetConstructor.prototype` without overwriting existing prototype methods unless explicitly intended.",
      vi: "Xây dựng hàm tiện ích `composeMixins(TargetConstructor, ...mixins)` sao chép toàn bộ phương thức (bao gồm getter/setter và cấu hình descriptor) từ nhiều mixin object lên `TargetConstructor.prototype` mà không ghi đè phương thức đang có trừ khi được chỉ định."
    },
    starterCode: `function composeMixins(TargetConstructor, ...mixins) {
  // Compose mixins onto TargetConstructor.prototype
}

const SerializableMixin = {
  toJSON() { return JSON.stringify(this); }
};
const ObservableMixin = {
  emit(event) { console.log(\`Emitted \${event} from \${this.name}\`); }
};

function User(name) { this.name = name; }
composeMixins(User, SerializableMixin, ObservableMixin);

const u = new User("Elena");
u.emit("login");
console.log(u.toJSON());`,
    solutionCode: `function composeMixins(TargetConstructor, ...mixins) {
  const targetProto = TargetConstructor.prototype;

  for (const mixin of mixins) {
    const descriptors = Object.getOwnPropertyDescriptors(mixin);
    for (const [key, descriptor] of Object.entries(descriptors)) {
      if (key !== 'constructor') {
        Object.defineProperty(targetProto, key, descriptor);
      }
    }
  }

  return TargetConstructor;
}`,
    hints: [
      {
        en: "Use Object.getOwnPropertyDescriptors(mixin) and Object.defineProperty(targetProto, key, descriptor).",
        vi: "Dùng Object.getOwnPropertyDescriptors(mixin) và Object.defineProperty(targetProto, key, descriptor)."
      }
    ]
  },
  quizQuestionPool: [
    {
      id: "js_q_16_1",
      type: "single_choice",
      question: {
        en: "What is at the top end of almost every JavaScript prototype chain?",
        vi: "Đối tượng nào nằm ở đỉnh cao nhất của hầu hết các chuỗi Prototype Chain trong JavaScript?"
      },
      options: [
        { id: "a", text: { en: "`Object.prototype` (whose internal prototype is `null`)", vi: "`Object.prototype` (có prototype nội bộ là `null`)" } },
        { id: "b", text: { en: "`Function.prototype`", vi: "`Function.prototype`" } },
        { id: "c", text: { en: "`window` / `global`", vi: "`window` / `global`" } },
        { id: "d", text: { en: "`undefined`", vi: "`undefined`" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "The prototype chain terminates at `Object.prototype`, and `Object.getPrototypeOf(Object.prototype)` returns `null`.",
        vi: "Chuỗi prototype kết thúc tại `Object.prototype`, và `Object.getPrototypeOf(Object.prototype)` trả về `null`."
      }
    },
    {
      id: "js_q_16_2",
      type: "predict_output",
      question: {
        en: "What will `console.log` print?\n```js\nconst proto = { answer: 42 };\nconst obj = Object.create(proto);\nobj.answer = 100;\nconsole.log(obj.answer, proto.answer);\n```",
        vi: "Đoạn mã sau sẽ in ra gì?\n```js\nconst proto = { answer: 42 };\nconst obj = Object.create(proto);\nobj.answer = 100;\nconsole.log(obj.answer, proto.answer);\n```"
      },
      options: [
        { id: "a", text: { en: "100 42 (Property Shadowing)", vi: "100 42 (Cơ chế che khuất - Property Shadowing)" } },
        { id: "b", text: { en: "100 100", vi: "100 100" } },
        { id: "c", text: { en: "42 42", vi: "42 42" } },
        { id: "d", text: { en: "TypeError", vi: "TypeError" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Assigning `obj.answer = 100` creates an own property on `obj`, shadowing `proto.answer` without altering `proto`.",
        vi: "Gán `obj.answer = 100` tạo thuộc tính riêng trên `obj`, che khuất `proto.answer` mà không làm thay đổi `proto`."
      }
    },
    {
      id: "js_q_16_3",
      type: "single_choice",
      question: {
        en: "What is the recommended standard way to retrieve the prototype of an object instance?",
        vi: "Cách chuẩn được khuyến nghị để lấy prototype của một instance đối tượng là gì?"
      },
      options: [
        { id: "a", text: { en: "Object.getPrototypeOf(instance)", vi: "Object.getPrototypeOf(instance)" } },
        { id: "b", text: { en: "instance.__proto__", vi: "instance.__proto__" } },
        { id: "c", text: { en: "instance.prototype", vi: "instance.prototype" } },
        { id: "d", text: { en: "instance.getProto()", vi: "instance.getProto()" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Object.getPrototypeOf(obj)` is the official ECMAScript standard method.",
        vi: "`Object.getPrototypeOf(obj)` là phương thức chuẩn chính thức của ECMAScript."
      }
    },
    {
      id: "js_q_16_4",
      type: "predict_output",
      question: {
        en: "What does `Object.hasOwn(obj, prop)` or `obj.hasOwnProperty(prop)` do?",
        vi: "Phương thức `Object.hasOwn(obj, prop)` hoặc `obj.hasOwnProperty(prop)` có tác dụng gì?"
      },
      options: [
        { id: "a", text: { en: "Returns true ONLY if `prop` is a direct own property of `obj`, returning false if it comes from the prototype chain", vi: "Trả về true CHỈ KHI `prop` là thuộc tính trực tiếp của `obj`, trả về false nếu thuộc tính kế thừa từ prototype chain" } },
        { id: "b", text: { en: "Returns true for all prototype properties", vi: "Trả về true cho tất cả thuộc tính trong prototype" } },
        { id: "c", text: { en: "Deletes the property from the prototype", vi: "Xóa thuộc tính khỏi prototype" } },
        { id: "d", text: { en: "Freezes the property value", vi: "Đóng băng giá trị thuộc tính" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Object.hasOwn()` checks direct own ownership, disregarding inherited prototype members.",
        vi: "`Object.hasOwn()` kiểm tra quyền sở hữu trực tiếp trên đối tượng, bỏ qua các thuộc tính kế thừa từ prototype."
      }
    },
    {
      id: "js_q_16_5",
      type: "single_choice",
      question: {
        en: "How do you create an object that has NO prototype chain at all (completely dictionary-pure)?",
        vi: "Làm thế nào để tạo ra một đối tượng hoàn toàn KHÔNG CÓ prototype chain (đối tượng từ điển thuần khiết)?"
      },
      options: [
        { id: "a", text: { en: "Object.create(null)", vi: "Object.create(null)" } },
        { id: "b", text: { en: "{}", vi: "{}" } },
        { id: "c", text: { en: "new Object()", vi: "new Object()" } },
        { id: "d", text: { en: "Object.freeze({})", vi: "Object.freeze({})" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Object.create(null)` creates an object with no prototype link, making it immune to prototype pollution attacks.",
        vi: "`Object.create(null)` tạo đối tượng không có liên kết prototype, giúp chống lại các cuộc tấn công Prototype Pollution."
      }
    },
    {
      id: "js_q_16_6",
      type: "predict_output",
      question: {
        en: "What will `console.log([] instanceof Object)` return?",
        vi: "`console.log([] instanceof Object)` sẽ trả về kết quả gì?"
      },
      options: [
        { id: "a", text: { en: "true (because Array.prototype inherits from Object.prototype)", vi: "true (vì Array.prototype kế thừa từ Object.prototype)" } },
        { id: "b", text: { en: "false", vi: "false" } },
        { id: "c", text: { en: "TypeError", vi: "TypeError" } },
        { id: "d", text: { en: "undefined", vi: "undefined" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`instanceof` tests whether `Object.prototype` appears anywhere in the prototype chain of `[]`.",
        vi: "Toán tử `instanceof` kiểm tra xem `Object.prototype` có xuất hiện trong chuỗi prototype của `[]` hay không."
      }
    },
    {
      id: "js_q_16_7",
      type: "fill_blank",
      question: {
        en: "The operator used to test if a constructor's prototype property appears anywhere in the prototype chain of an object is _____ .",
        vi: "Toán tử dùng để kiểm tra xem prototype của một constructor có xuất hiện trong chuỗi prototype của đối tượng không là _____ ."
      },
      correctAnswer: "instanceof",
      explanation: {
        en: "`obj instanceof Constructor` inspects the prototype chain for `Constructor.prototype`.",
        vi: "`obj instanceof Constructor` kiểm tra sự hiện diện của `Constructor.prototype` trên chuỗi prototype."
      }
    },
    {
      id: "js_q_16_8",
      type: "single_choice",
      question: {
        en: "What happens when you modify a property on a shared prototype object `Constructor.prototype.shared = 99`?",
        vi: "Điều gì xảy ra khi bạn thay đổi thuộc tính trên prototype dùng chung `Constructor.prototype.shared = 99`?"
      },
      options: [
        { id: "a", text: { en: "All existing and future instances that inherit from that prototype immediately see the updated value", vi: "Tất cả các instance hiện tại và tương lai kế thừa từ prototype đó ngay lập tức thấy giá trị mới" } },
        { id: "b", text: { en: "Only newly created instances see it", vi: "Chỉ các instance tạo mới sau đó mới thấy" } },
        { id: "c", text: { en: "Throws a PrototypeMutationError", vi: "Ném lỗi PrototypeMutationError" } },
        { id: "d", text: { en: "It converts all instances to numbers", vi: "Nó chuyển toàn bộ instance thành số" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Because prototypal lookup is a dynamic live reference, mutations to the prototype are immediately reflected across all instances.",
        vi: "Vì tra cứu prototype là một tham chiếu động thời gian thực, thay đổi trên prototype lập tức phản ánh lên mọi instance liên kết."
      }
    },
    {
      id: "js_q_16_9",
      type: "predict_output",
      question: {
        en: "What is Prototype Pollution in JavaScript security?",
        vi: "Lỗ hổng Prototype Pollution trong bảo mật JavaScript là gì?"
      },
      options: [
        { id: "a", text: { en: "An attacker injecting malicious properties into `Object.prototype`, which then infects every object across the entire runtime", vi: "Kẻ tấn công chèn các thuộc tính độc hại vào `Object.prototype`, từ đó lây lan sang toàn bộ mọi đối tượng trong runtime" } },
        { id: "b", text: { en: "Running out of RAM memory", vi: "Hết bộ nhớ RAM" } },
        { id: "c", text: { en: "Using too many classes in one file", vi: "Sử dụng quá nhiều class trong 1 file" } },
        { id: "d", text: { en: "A slow internet connection", vi: "Tốc độ mạng chậm" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "Prototype pollution occurs when unsanitized user keys (like `__proto__`) mutate base prototypes, allowing RCE or privilege escalation.",
        vi: "Prototype pollution xảy ra khi dữ liệu người dùng không lọc (như `__proto__`) sửa đổi prototype gốc, dẫn tới leo thang đặc quyền."
      }
    },
    {
      id: "js_q_16_10",
      type: "code_reasoning",
      question: {
        en: "Why is `Object.hasOwn(obj, key)` preferred over `obj.hasOwnProperty(key)` in modern JavaScript (ES2022)?",
        vi: "Tại sao `Object.hasOwn(obj, key)` được khuyến khích hơn `obj.hasOwnProperty(key)` trong JS hiện đại (ES2022)?"
      },
      options: [
        { id: "a", text: { en: "`obj.hasOwnProperty()` will crash if `obj` was created with `Object.create(null)` or if the object has an own property named 'hasOwnProperty'", vi: "`obj.hasOwnProperty()` sẽ gây crash nếu `obj` được tạo từ `Object.create(null)` hoặc nếu đối tượng có một thuộc tính tự định nghĩa tên là 'hasOwnProperty'" } },
        { id: "b", text: { en: "`Object.hasOwn` is asynchronous", vi: "`Object.hasOwn` là hàm bất đồng bộ" } },
        { id: "c", text: { en: "`hasOwnProperty` is forbidden in CSS", vi: "`hasOwnProperty` bị cấm trong CSS" } },
        { id: "d", text: { en: "Because `hasOwn` only works on numbers", vi: "Vì `hasOwn` chỉ chạy với số" } }
      ],
      correctAnswer: "a",
      explanation: {
        en: "`Object.hasOwn(obj, key)` is safe against null-prototype objects and overridden `hasOwnProperty` properties.",
        vi: "`Object.hasOwn(obj, key)` hoàn toàn an toàn khi xử lý các đối tượng không có prototype hoặc bị ghi đè phương thức."
      }
    }
  ]
};

// Write Lesson 15 and 16
fs.writeFileSync(path.join(dir, 'lesson15.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson15: Lesson = ${JSON.stringify(lesson15, null, 2)};\nexport default lesson15;\n`, 'utf8');
fs.writeFileSync(path.join(dir, 'lesson16.ts'), `import { Lesson } from '../../../../types';\n\nexport const lesson16: Lesson = ${JSON.stringify(lesson16, null, 2)};\nexport default lesson16;\n`, 'utf8');
console.log('Lessons 15 and 16 generated.');
