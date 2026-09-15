import { Lesson } from '../../../../types';

export const lesson26: Lesson = {
  "id": "js_lesson_26",
  "courseId": "javascript",
  "levelId": "advanced",
  "moduleId": "js_mod_6",
  "order": 26,
  "title": {
    "en": "Web Workers, SharedArrayBuffer & Multithreaded Concurrency",
    "vi": "Web Workers, SharedArrayBuffer & Đa Luồng Song Song (Multithreading)"
  },
  "summary": {
    "en": "Master offloading heavy CPU computation off the main UI thread using Dedicated Web Workers, `postMessage`, zero-copy `Transferable` ArrayBuffers, `SharedArrayBuffer`, and thread synchronization with `Atomics`.",
    "vi": "Làm chủ kỹ thuật giải phóng CPU khỏi luồng UI chính bằng Web Workers, giao tiếp `postMessage`, chuyển giao bộ nhớ không sao chép `Transferable` ArrayBuffer, `SharedArrayBuffer` và đồng bộ luồng bằng `Atomics`."
  },
  "estimatedMinutes": 24,
  "topicId": "js_workers_multithreading",
  "learn": {
    "introduction": {
      "en": "While the browser main thread is single-threaded—handling JavaScript execution, layout calculation, reflows, and user input—heavy computations (like image processing, cryptographic hashing, 3D physics, or machine learning) will freeze the UI. Web Workers allow spawning true OS background threads to perform heavy computations in parallel without dropping a single frame.",
      "vi": "Mặc dù luồng chính (Main Thread) của trình duyệt là đơn luồng—đảm nhận cả việc chạy JavaScript, tính toán layout và tương tác người dùng—các tác vụ tính toán nặng (như xử lý ảnh, mã hóa dữ liệu, vật lý 3D, mô hình AI) sẽ làm đơ giao diện. Web Workers cho phép khởi tạo các luồng chạy ngầm thực sự của hệ điều hành để tính toán song song mà không làm giật khung hình."
    },
    "conceptExplanation": {
      "en": "1. Dedicated Web Worker Basics: `const worker = new Worker('worker.js', { type: 'module' })`. Workers run in an isolated execution context (`DedicatedWorkerGlobalScope`) with no access to the DOM or `window`.\n\n2. Message Passing: Communication occurs via `worker.postMessage(data)` and listening to `message` events via `self.onmessage = (e) => ...`.\n\n3. Structured Clone vs Transferable Objects:\n   - Structured Clone: Default deep-copy serialization (slow for 100MB arrays).\n   - Transferable Objects: `worker.postMessage(buffer, [buffer])`. Transfers underlying memory ownership instantly in 0ms (Zero-Copy Transfer)! The sender's buffer becomes neutered (0 bytes).\n\n4. `SharedArrayBuffer` & `Atomics`: Allows multiple threads to share the exact same raw memory buffer. The `Atomics` API (`Atomics.add`, `Atomics.wait`, `Atomics.notify`) provides lockless synchronization primitives to prevent race conditions.\n\n5. Termination: Call `worker.terminate()` from main thread or `self.close()` inside the worker.",
      "vi": "1. Cơ Bản Về Dedicated Web Worker: `const worker = new Worker('worker.js', { type: 'module' })`. Worker chạy trong ngữ cảnh cách ly riêng biệt (`DedicatedWorkerGlobalScope`), không có quyền truy cập DOM hay `window`.\n\n2. Truyền Thông Điệp: Giao tiếp diễn ra qua `worker.postMessage(data)` và lắng nghe sự kiện `message` qua `self.onmessage = (e) => ...`.\n\n3. Structured Clone vs Đối Tượng Transferable:\n   - Structured Clone: Sao chép sâu mặc định (chậm với mảng dữ liệu 100MB).\n   - Transferable Objects: `worker.postMessage(buffer, [buffer])`. Chuyển quyền sở hữu bộ nhớ ngay lập tức trong 0ms (Zero-Copy)! Buffer ở bên gửi sẽ bị vô hiệu hóa (về 0 bytes).\n\n4. `SharedArrayBuffer` & `Atomics`: Cho phép nhiều luồng cùng truy cập trực tiếp vào chung một vùng nhớ thô. API `Atomics` (`Atomics.add`, `Atomics.wait`, `Atomics.notify`) cung cấp các phép toán đồng bộ luồng để phòng chống tranh chấp dữ liệu (race conditions).\n\n5. Đóng Luồng: Gọi `worker.terminate()` từ luồng chính hoặc `self.close()` từ bên trong worker."
    },
    "syntax": "// 1. Spawning Worker with Transferable ArrayBuffer (Zero-Copy)\nconst worker = new Worker(\"./calcWorker.js\", { type: \"module\" });\n\nconst buffer = new Float64Array(1_000_000).buffer;\nconsole.log(\"Before transfer bytes:\", buffer.byteLength); // 8,000,000 bytes\n\n// Transfer ownership to worker thread in 0ms!\nworker.postMessage({ type: \"PROCESS_MATRIX\", buffer }, [buffer]);\nconsole.log(\"After transfer bytes:\", buffer.byteLength); // 0 bytes (neutered!)\n\n// 2. Thread-Safe Atomic Counter on SharedArrayBuffer\nconst sharedBuffer = new SharedArrayBuffer(4);\nconst sharedArray = new Int32Array(sharedBuffer);\n\n// Increment atomically across threads without race conditions\nAtomics.add(sharedArray, 0, 1);\nconsole.log(Atomics.load(sharedArray, 0)); // 1",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Promise-Based RPC Worker Wrapper with Job IDs",
          "vi": "Bọc Giao Tiếp Worker Thành Hàm Gọi Promise (Worker RPC Bridge)"
        },
        "description": {
          "en": "Demonstrates wrapping asynchronous postMessage exchanges into clean async/await function calls with request ID correlation.",
          "vi": "Minh họa bọc luồng giao tiếp postMessage thành các hàm async/await tiện dụng dựa trên mã định danh Job ID."
        },
        "code": "class WorkerClient {\n  #worker;\n  #pendingJobs = new Map();\n  #jobIdCounter = 1;\n\n  constructor(workerUrl) {\n    this.#worker = new Worker(workerUrl, { type: \"module\" });\n    this.#worker.onmessage = (e) => {\n      const { jobId, result, error } = e.data;\n      const deferred = this.#pendingJobs.get(jobId);\n      if (!deferred) return;\n\n      this.#pendingJobs.delete(jobId);\n      if (error) {\n        deferred.reject(new Error(error));\n      } else {\n        deferred.resolve(result);\n      }\n    };\n  }\n\n  execute(action, payload, transferables = []) {\n    const jobId = this.#jobIdCounter++;\n    return new Promise((resolve, reject) => {\n      this.#pendingJobs.set(jobId, { resolve, reject });\n      this.#worker.postMessage({ jobId, action, payload }, transferables);\n    });\n  }\n\n  destroy() {\n    this.#worker.terminate();\n    this.#pendingJobs.clear();\n  }\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Trying to manipulate `document` or access `window` inside a Web Worker script.",
          "vi": "Cố gắng thao tác với `document` hoặc truy cập `window` bên trong script của Web Worker."
        },
        "correction": {
          "en": "Workers operate on `self` (`DedicatedWorkerGlobalScope`) and have NO DOM access. Send processed data back to the main thread via `postMessage` to update UI.",
          "vi": "Worker chạy trên `self` và KHÔNG có quyền truy cập DOM. Hãy gửi kết quả đã xử lý về luồng chính qua `postMessage` để cập nhật UI."
        }
      }
    ],
    "tips": [
      {
        "en": "Transfer ArrayBuffers instead of cloning when passing large datasets: Transferable objects transfer memory pointers instantly in O(1) time without serializing large multi-megabyte binary structures.",
        "vi": "Chuyển giao quyền sở hữu ArrayBuffer thay vì copy khi truyền dữ liệu lớn: Đối tượng Transferable chuyển quyền sở hữu bộ nhớ tức thì trong thời gian O(1) mà không tốn công clone dữ liệu hàng chục MB."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_26_1",
      "type": "complete_code",
      "title": {
        "en": "Inline Web Worker from Blob Factory",
        "vi": "Tạo Web Worker Động Trực Tiếp Từ Blob URL (Inline Worker)"
      },
      "instruction": {
        "en": "Write a function `createInlineWorker(workerFn)` that takes a function body `workerFn`, converts it into a string, creates a Blob URL, and returns a new `Worker`. Provide an `execute(data)` method returning a Promise that resolves with the worker's reply and auto-terminates.",
        "vi": "Viết hàm `createInlineWorker(workerFn)` nhận vào hàm `workerFn`, chuyển nó thành chuỗi, tạo Blob URL và trả về một `Worker` mới. Cung cấp phương thức `execute(data)` trả về một Promise resolve kết quả trả về từ worker và tự động hủy worker."
      },
      "starterCode": "function createInlineWorker(workerFn) {\n  // Implement inline worker factory\n}",
      "solutionCode": "function createInlineWorker(workerFn) {\n  const code = `self.onmessage = async (e) => {\n    const fn = (${workerFn.toString()});\n    try {\n      const res = await fn(e.data);\n      self.postMessage({ success: true, result: res });\n    } catch (err) {\n      self.postMessage({ success: false, error: err.message });\n    }\n  };`;\n\n  const blob = new Blob([code], { type: \"application/javascript\" });\n  const url = URL.createObjectURL(blob);\n  const worker = new Worker(url);\n\n  return {\n    execute(data) {\n      return new Promise((resolve, reject) => {\n        worker.onmessage = (e) => {\n          URL.revokeObjectURL(url);\n          worker.terminate();\n          if (e.data.success) {\n            resolve(e.data.result);\n          } else {\n            reject(new Error(e.data.error));\n          }\n        };\n        worker.onerror = (err) => {\n          URL.revokeObjectURL(url);\n          worker.terminate();\n          reject(err);\n        };\n        worker.postMessage(data);\n      });\n    }\n  };\n}",
      "hint": {
        "en": "Create Blob with `application/javascript`, generate URL via `URL.createObjectURL(blob)`, instantiate `new Worker(url)`.",
        "vi": "Tạo Blob với type `application/javascript`, sinh URL bằng `URL.createObjectURL(blob)`, khởi tạo `new Worker(url)`."
      }
    },
    {
      "id": "js_ex_26_2",
      "type": "complete_code",
      "title": {
        "en": "Thread-Safe Atomic Mutex Lock Simulation",
        "vi": "Mô Phỏng Khóa Mutex An Toàn Đa Luồng Bằng Atomics"
      },
      "instruction": {
        "en": "Implement a mutex lock helper `createMutex(sharedInt32Array, index = 0)` with methods `lock()` and `unlock()` using `Atomics.compareExchange`, `Atomics.wait`, and `Atomics.notify` on an Int32Array view of a `SharedArrayBuffer`.",
        "vi": "Cài đặt bộ khóa mutex `createMutex(sharedInt32Array, index = 0)` có các phương thức `lock()` và `unlock()` sử dụng `Atomics.compareExchange`, `Atomics.wait` và `Atomics.notify` trên một `SharedArrayBuffer`."
      },
      "starterCode": "function createMutex(sharedInt32Array, index = 0) {\n  // Implement atomic mutex lock\n}",
      "solutionCode": "function createMutex(sharedInt32Array, index = 0) {\n  const UNLOCKED = 0;\n  const LOCKED = 1;\n\n  return {\n    lock() {\n      while (true) {\n        if (Atomics.compareExchange(sharedInt32Array, index, UNLOCKED, LOCKED) === UNLOCKED) {\n          return; // Lock acquired!\n        }\n        // Wait until notified if lock is busy\n        Atomics.wait(sharedInt32Array, index, LOCKED);\n      }\n    },\n    unlock() {\n      if (Atomics.compareExchange(sharedInt32Array, index, LOCKED, UNLOCKED) !== LOCKED) {\n        throw new Error(\"Mutex was not locked by current thread\");\n      }\n      Atomics.notify(sharedInt32Array, index, 1);\n    }\n  };\n}",
      "hint": {
        "en": "In lock(): loop with Atomics.compareExchange and Atomics.wait. In unlock(): reset to UNLOCKED and call Atomics.notify.",
        "vi": "Trong lock(): lặp với Atomics.compareExchange và Atomics.wait. Trong unlock(): gán về UNLOCKED và gọi Atomics.notify."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_26",
    "title": {
      "en": "Multithreaded Worker Thread Pool Manager",
      "vi": "Bộ Quản Lý Bể Luồng Web Worker (Worker Thread Pool)"
    },
    "description": {
      "en": "Build a reusable `WorkerPool(workerScriptUrl, poolSize = navigator.hardwareConcurrency || 4)` that distributes compute tasks across an internal pool of active workers, queuing pending tasks when all threads are busy.",
      "vi": "Xây dựng hệ thống bể luồng `WorkerPool(workerScriptUrl, poolSize = navigator.hardwareConcurrency || 4)` phân phối các tác vụ tính toán song song qua nhiều worker, tự động xếp hàng các task khi tất cả các luồng đang bận."
    },
    "starterCode": "class WorkerPool {\n  // Implement Worker Thread Pool\n}",
    "solutionCode": "class WorkerPool {\n  #workers = [];\n  #queue = [];\n  #idleWorkers = [];\n\n  constructor(workerUrl, poolSize = 4) {\n    this.workerUrl = workerUrl;\n    this.poolSize = poolSize;\n\n    for (let i = 0; i < poolSize; i++) {\n      const worker = new Worker(workerUrl, { type: \"module\" });\n      worker.id = i;\n      this.#workers.push(worker);\n      this.#idleWorkers.push(worker);\n    }\n  }\n\n  runTask(payload, transferables = []) {\n    return new Promise((resolve, reject) => {\n      const task = { payload, transferables, resolve, reject };\n\n      if (this.#idleWorkers.length > 0) {\n        const worker = this.#idleWorkers.pop();\n        this.#executeOnWorker(worker, task);\n      } else {\n        this.#queue.push(task);\n      }\n    });\n  }\n\n  #executeOnWorker(worker, task) {\n    worker.onmessage = (e) => {\n      task.resolve(e.data);\n      this.#releaseWorker(worker);\n    };\n    worker.onerror = (err) => {\n      task.reject(err);\n      this.#releaseWorker(worker);\n    };\n    worker.postMessage(task.payload, task.transferables);\n  }\n\n  #releaseWorker(worker) {\n    if (this.#queue.length > 0) {\n      const nextTask = this.#queue.shift();\n      this.#executeOnWorker(worker, nextTask);\n    } else {\n      this.#idleWorkers.push(worker);\n    }\n  }\n\n  destroy() {\n    this.#workers.forEach(w => w.terminate());\n    this.#workers = [];\n    this.#idleWorkers = [];\n    this.#queue = [];\n  }\n}",
    "hints": [
      {
        "en": "Maintain `#workers`, `#idleWorkers`, and `#queue`. When a worker finishes a task, check queue for next item before pushing back to idle list.",
        "vi": "Duy trì `#workers`, `#idleWorkers` và `#queue`. Khi worker xong việc, lấy task từ queue ra chạy tiếp trước khi đẩy lại vào idle list."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Multithreaded Worker Thread Pool Manager according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Bộ Quản Lý Bể Luồng Web Worker (Worker Thread Pool) theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_26_1",
      "type": "single_choice",
      "question": {
        "en": "Why can't Web Workers directly modify DOM elements like `document.getElementById()`?",
        "vi": "Tại sao Web Worker không thể thao tác trực tiếp với thẻ DOM như `document.getElementById()`?"
      },
      "options": [
        {
          "en": "The DOM is not thread-safe; concurrent access from multiple background threads would cause race conditions and corrupted browser UI states",
          "vi": "Cây DOM không an toàn luồng (not thread-safe); việc can thiệp đồng thời từ nhiều luồng nền sẽ gây tranh chấp dữ liệu và làm hỏng trạng thái UI"
        },
        {
          "en": "Web Workers only run in Node.js",
          "vi": "Web Worker chỉ chạy trong Node.js"
        },
        {
          "en": "HTML5 removed DOM support",
          "vi": "HTML5 đã bỏ hỗ trợ DOM"
        },
        {
          "en": "Workers are limited to 1KB memory",
          "vi": "Worker bị giới hạn bộ nhớ 1KB"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Browser layout engines mandate that DOM manipulation is restricted strictly to the single main UI thread.",
        "vi": "Engine trình duyệt quy định mọi thao tác DOM chỉ được thực hiện trên một luồng chính (Main Thread) duy nhất."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "easy"
    },
    {
      "id": "js_q_26_2",
      "type": "predict_output",
      "question": {
        "en": "What happens to the sender's `ArrayBuffer` when transferred as a `Transferable` object in `postMessage(data, [buffer])`?",
        "vi": "Điều gì xảy ra với `ArrayBuffer` ở bên gửi khi nó được chuyển dưới dạng đối tượng `Transferable` trong `postMessage(data, [buffer])`?"
      },
      "options": [
        {
          "en": "Ownership is transferred instantly (Zero-Copy) and the sender's buffer becomes neutered with byteLength === 0",
          "vi": "Quyền sở hữu được chuyển giao tức thì (Zero-Copy) và buffer bên gửi bị vô hiệu hóa với byteLength === 0"
        },
        {
          "en": "A complete byte-by-byte duplicate is created in RAM",
          "vi": "Một bản sao đầy đủ từng byte được nhân bản trong RAM"
        },
        {
          "en": "The buffer is deleted from both threads",
          "vi": "Buffer bị xóa ở cả hai luồng"
        },
        {
          "en": "Throws a RangeError",
          "vi": "Ném lỗi RangeError"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Transferable objects move the underlying memory reference without cloning, neutering the original buffer.",
        "vi": "Transferable object chuyển trực tiếp con trỏ bộ nhớ thô mà không sao chép, làm rỗng buffer ở nguồn gửi."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "easy"
    },
    {
      "id": "js_q_26_3",
      "type": "single_choice",
      "question": {
        "en": "Which object allows multiple threads to read and write to the exact same shared memory buffer simultaneously?",
        "vi": "Đối tượng nào cho phép nhiều luồng cùng đọc và ghi trực tiếp vào chung một vùng nhớ đệm đồng thời?"
      },
      "options": [
        {
          "en": "SharedArrayBuffer",
          "vi": "SharedArrayBuffer"
        },
        {
          "en": "ArrayBuffer",
          "vi": "ArrayBuffer"
        },
        {
          "en": "DataView",
          "vi": "DataView"
        },
        {
          "en": "TypedArray",
          "vi": "TypedArray"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`SharedArrayBuffer` provides shared memory accessible across multiple workers concurrently.",
        "vi": "`SharedArrayBuffer` cung cấp vùng nhớ dùng chung có thể truy cập đồng thời từ nhiều worker."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "easy"
    },
    {
      "id": "js_q_26_4",
      "type": "predict_output",
      "question": {
        "en": "What is the purpose of the `Atomics` API in JavaScript?",
        "vi": "Mục đích của API `Atomics` trong JavaScript là gì?"
      },
      "options": [
        {
          "en": "To provide thread-safe atomic operations (add, load, store, wait, notify) on `SharedArrayBuffer` data, preventing race conditions",
          "vi": "Cung cấp các phép toán nguyên tử an toàn đa luồng (add, load, store, wait, notify) trên `SharedArrayBuffer`, ngăn chặn tranh chấp dữ liệu"
        },
        {
          "en": "To split atomic particles in WebAssembly",
          "vi": "Phân tách hạt nguyên tử trong WebAssembly"
        },
        {
          "en": "To compress CSS files",
          "vi": "Nén các file CSS"
        },
        {
          "en": "To create UI buttons",
          "vi": "Tạo các nút bấm giao diện"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`Atomics` ensures memory operations on shared buffers execute uninterrupted and provides thread coordination.",
        "vi": "`Atomics` đảm bảo các thao tác trên vùng nhớ dùng chung diễn ra nguyên tử, không bị ngắt quãng giữa các luồng."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "medium"
    },
    {
      "id": "js_q_26_5",
      "type": "single_choice",
      "question": {
        "en": "How do you immediately stop a running Web Worker from the main thread?",
        "vi": "Làm thế nào để dừng ngay lập tức một Web Worker đang chạy từ luồng chính?"
      },
      "options": [
        {
          "en": "worker.terminate()",
          "vi": "worker.terminate()"
        },
        {
          "en": "worker.stop()",
          "vi": "worker.stop()"
        },
        {
          "en": "worker.kill()",
          "vi": "worker.kill()"
        },
        {
          "en": "worker.close()",
          "vi": "worker.close()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`worker.terminate()` forces the worker thread to shut down immediately from the host context.",
        "vi": "`worker.terminate()` ép luồng worker dừng thực thi ngay lập tức từ luồng chủ."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "medium"
    },
    {
      "id": "js_q_26_6",
      "type": "predict_output",
      "question": {
        "en": "How does a Worker shut itself down from inside its own script?",
        "vi": "Worker tự đóng chính nó từ bên trong script bằng lệnh nào?"
      },
      "options": [
        {
          "en": "self.close()",
          "vi": "self.close()"
        },
        {
          "en": "self.terminate()",
          "vi": "self.terminate()"
        },
        {
          "en": "process.exit()",
          "vi": "process.exit()"
        },
        {
          "en": "window.destroy()",
          "vi": "window.destroy()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`self.close()` allows a worker to cleanly shut down its own thread.",
        "vi": "`self.close()` cho phép worker tự giải phóng luồng của chính mình."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "medium"
    },
    {
      "id": "js_q_26_7",
      "type": "fill_blank",
      "question": {
        "en": "To send a message from the main thread to a Web Worker, call worker._____(data).",
        "vi": "Để gửi một thông điệp từ luồng chính tới Web Worker, gọi hàm worker._____(data)."
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
        "en": "`postMessage()` is the asynchronous message dispatch method for Web Workers.",
        "vi": "`postMessage()` là phương thức gửi thông điệp bất đồng bộ tới Web Worker."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "postmessage"
      ]
    },
    {
      "id": "js_q_26_8",
      "type": "single_choice",
      "question": {
        "en": "Which HTTP response headers are strictly required by browsers to enable `SharedArrayBuffer` due to Spectre security mitigations?",
        "vi": "Những HTTP Header nào bắt buộc phải có để trình duyệt cho phép sử dụng `SharedArrayBuffer` nhằm phòng chống lỗ hổng bảo mật Spectre?"
      },
      "options": [
        {
          "en": "`Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`",
          "vi": "`Cross-Origin-Opener-Policy: same-origin` và `Cross-Origin-Embedder-Policy: require-corp`"
        },
        {
          "en": "`Access-Control-Allow-Origin: *` only",
          "vi": "Chỉ cần `Access-Control-Allow-Origin: *`"
        },
        {
          "en": "`Content-Type: text/html`",
          "vi": "`Content-Type: text/html`"
        },
        {
          "en": "`X-Frame-Options: DENY` only",
          "vi": "Chỉ cần `X-Frame-Options: DENY`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Cross-Origin Isolation (COOP + COEP headers) is mandatory for enabling SharedArrayBuffer security realms.",
        "vi": "Cơ chế Cô lập Nguồn gốc Chéo (COOP + COEP) là bắt buộc để mở khóa SharedArrayBuffer."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "hard"
    },
    {
      "id": "js_q_26_9",
      "type": "predict_output",
      "question": {
        "en": "Can a Web Worker spawn another sub-worker (Nested Worker)?",
        "vi": "Một Web Worker có thể tự khởi tạo thêm một worker con khác (Nested Worker) không?"
      },
      "options": [
        {
          "en": "Yes, modern browsers support spawning sub-workers from inside a worker context",
          "vi": "Có, các trình duyệt hiện đại hỗ trợ khởi tạo worker con từ bên trong ngữ cảnh của một worker"
        },
        {
          "en": "No, workers cannot spawn workers",
          "vi": "Không, worker không thể tạo worker"
        },
        {
          "en": "Only on Linux servers",
          "vi": "Chỉ trên máy chủ Linux"
        },
        {
          "en": "Only with WebAssembly",
          "vi": "Chỉ khi dùng WebAssembly"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Dedicated workers can create nested sub-workers to divide parallel work into fine-grained pipelines.",
        "vi": "Dedicated Worker có thể tạo các sub-worker con lồng nhau để phân chia tác vụ xử lý song song."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "hard"
    },
    {
      "id": "js_q_26_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `navigator.hardwareConcurrency` useful when sizing a Web Worker pool?",
        "vi": "Tại sao `navigator.hardwareConcurrency` hữu ích khi xác định kích thước bể luồng (Worker Pool)?"
      },
      "options": [
        {
          "en": "It returns the number of logical CPU processor cores available, preventing thread over-subscription and CPU thrashing",
          "vi": "Nó trả về số lượng nhân CPU logic hiện có của thiết bị, giúp tránh tình trạng tạo quá nhiều luồng gây nghẽn CPU"
        },
        {
          "en": "It measures internet download speed",
          "vi": "Nó đo tốc độ tải mạng internet"
        },
        {
          "en": "It counts the number of open browser tabs",
          "vi": "Nó đếm số lượng tab trình duyệt đang mở"
        },
        {
          "en": "It returns GPU memory size",
          "vi": "Nó trả về dung lượng bộ nhớ GPU"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Matching worker count to logical core count maximizes parallel throughput without context-switching overhead.",
        "vi": "Điều chỉnh số lượng worker khớp với số nhân CPU logic giúp tối đa hóa hiệu năng song song mà không tốn chi phí chuyển đổi ngữ cảnh."
      },
      "topicId": "js_workers_multithreading",
      "difficulty": "hard"
    }
  ]
};
export default lesson26;
