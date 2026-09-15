import { Lesson } from '../../../../types';

export const lesson20: Lesson = {
  "id": "js_lesson_20",
  "courseId": "javascript",
  "levelId": "intermediate",
  "moduleId": "js_mod_4",
  "order": 20,
  "title": {
    "en": "Fetch API, HTTP Headers, JSON & Client-Side Web Storage",
    "vi": "Fetch API, HTTP Headers, Xử Lý JSON & Lưu Trữ Client Web Storage"
  },
  "summary": {
    "en": "Master HTTP networking with Fetch API (Request/Response, Headers, AbortController, status codes), JSON serialization, and client-side persistence (localStorage, sessionStorage, quota handling).",
    "vi": "Làm chủ giao tiếp mạng HTTP bằng Fetch API (Request/Response, Headers, AbortController, mã trạng thái), chuyển đổi JSON và lưu trữ dữ liệu phía client (localStorage, sessionStorage, xử lý dung lượng quota)."
  },
  "estimatedMinutes": 24,
  "topicId": "js_fetch_storage",
  "learn": {
    "introduction": {
      "en": "Connecting client-side web apps to backend REST/GraphQL services and persisting offline state are fundamental development requirements. The modern Fetch API provides a Promise-based interface for making HTTP requests with full control over headers, caching, and abort signals. Combined with Web Storage APIs (localStorage and sessionStorage), applications can maintain authenticated sessions and offline user data.",
      "vi": "Kết nối ứng dụng client với các dịch vụ backend REST/GraphQL và lưu trữ trạng thái offline là yêu cầu cốt lõi trong phát triển web. Fetch API cung cấp giao diện chuẩn dựa trên Promise để gửi request HTTP với toàn quyền kiểm soát headers, cache và tín hiệu hủy (abort signal). Kết hợp với Web Storage (localStorage và sessionStorage), ứng dụng có thể duy trì phiên đăng nhập và dữ liệu người dùng offline."
    },
    "conceptExplanation": {
      "en": "1. The Fetch Protocol & The 2-Step Promise: `const response = await fetch(url, options)`. First Promise resolves the HTTP response headers. The second step parses the body: `const data = await response.json()` (or `.text()`, `.blob()`, `.formData()`).\n\n2. The Fetch Error Catch Gotcha: Fetch does NOT reject on HTTP error status codes (like 404 or 500)! It only rejects on actual network failures or CORS blocks. You MUST check `if (!response.ok)`.\n\n3. AbortController & Request Cancellation: Cancel pending requests or set timeouts using `const controller = new AbortController(); fetch(url, { signal: controller.signal })` and `controller.abort()`.\n\n4. Web Storage Comparison:\n   - `localStorage`: Persists data across browser tabs and restarts with no expiration (~5MB per origin).\n   - `sessionStorage`: Scoped to a single browser tab; cleared when the tab closes.\n   - Storage items must be strings: use `JSON.stringify()` on save and `JSON.parse()` on retrieval with try/catch fallback.",
      "vi": "1. Giao Thức Fetch & Promise 2 Bước: `const response = await fetch(url, options)`. Promise bước 1 resolve khi nhận được Header phản hồi. Bước 2 phân tích nội dung body: `const data = await response.json()` (hoặc `.text()`, `.blob()`).\n\n2. Bẫy Bắt Lỗi Của Fetch: Fetch KHÔNG TỰ REJECT khi gặp các mã lỗi HTTP như 404 hay 500! Nó chỉ reject khi mất mạng hoàn toàn hoặc bị chặn CORS. Bạn BẮT BUỘC phải tự kiểm tra `if (!response.ok)`.\n\n3. Hủy Request Bằng AbortController: Hủy request đang chờ hoặc cài đặt timeout bằng `const controller = new AbortController(); fetch(url, { signal: controller.signal })` và `controller.abort()`.\n\n4. So Sánh Web Storage:\n   - `localStorage`: Lưu trữ dữ liệu vĩnh viễn qua các tab và lần khởi động lại trình duyệt (~5MB mỗi origin).\n   - `sessionStorage`: Giới hạn trong 1 tab duy nhất; tự động xóa khi tab bị đóng.\n   - Dữ liệu lưu trong Storage bắt buộc là chuỗi: luôn dùng `JSON.stringify()` khi lưu và `JSON.parse()` khi đọc kèm khối try/catch phòng ngừa lỗi cú pháp."
    },
    "syntax": "// 1. Robust API client wrapper with AbortSignal timeout\nasync function apiPost(endpoint, bodyData, timeoutMs = 5000) {\n  const controller = new AbortController();\n  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);\n\n  try {\n    const res = await fetch(endpoint, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n        \"Accept\": \"application/json\"\n      },\n      body: JSON.stringify(bodyData),\n      signal: controller.signal\n    });\n\n    if (!res.ok) {\n      const errorBody = await res.json().catch(() => ({}));\n      throw new Error(errorBody.message || `HTTP error ${res.status}`);\n    }\n\n    return await res.json();\n  } finally {\n    clearTimeout(timeoutId);\n  }\n}\n\n// 2. Safe Typed LocalStorage Helper\nconst Storage = {\n  get(key, defaultValue = null) {\n    try {\n      const item = localStorage.getItem(key);\n      return item ? JSON.parse(item) : defaultValue;\n    } catch {\n      return defaultValue;\n    }\n  },\n  set(key, value) {\n    try {\n      localStorage.setItem(key, JSON.stringify(value));\n    } catch (e) {\n      console.error(\"Storage quota exceeded\", e);\n    }\n  }\n};",
    "examples": [
      {
        "language": "javascript",
        "title": {
          "en": "Persistent Authenticated HTTP Client Service",
          "vi": "Dịch Vụ HTTP Client Có Xác Thực & Lưu Trữ Token Tự Động"
        },
        "description": {
          "en": "Demonstrates an API client that automatically attaches bearer auth tokens from localStorage and refreshes cached state.",
          "vi": "Minh họa API client tự động gắn bearer token từ localStorage và cập nhật trạng thái lưu trữ."
        },
        "code": "class HttpClient {\n  constructor(baseUrl) {\n    this.baseUrl = baseUrl;\n  }\n\n  getAuthToken() {\n    return localStorage.getItem(\"auth_token\");\n  }\n\n  async request(path, options = {}) {\n    const headers = new Headers(options.headers || {});\n    headers.set(\"Content-Type\", \"application/json\");\n\n    const token = this.getAuthToken();\n    if (token) {\n      headers.set(\"Authorization\", `Bearer ${token}`);\n    }\n\n    const response = await fetch(`${this.baseUrl}${path}`, {\n      ...options,\n      headers\n    });\n\n    if (!response.ok) {\n      if (response.status === 401) {\n        localStorage.removeItem(\"auth_token\");\n        window.dispatchEvent(new CustomEvent(\"auth:unauthorized\"));\n      }\n      throw new Error(`Request failed with status ${response.status}`);\n    }\n\n    return response.json();\n  }\n}"
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Assuming `fetch()` rejects inside `.catch()` on HTTP 404 or 500 status codes.",
          "vi": "Nghĩ rằng `fetch()` sẽ tự động nhảy vào `.catch()` khi gặp mã lỗi HTTP 404 hoặc 500."
        },
        "correction": {
          "en": "Always inspect `if (!response.ok)` (`response.ok` is true only for status 200-299) and manually throw an Error.",
          "vi": "Luôn kiểm tra `if (!response.ok)` (`response.ok` chỉ là true với status 200-299) và chủ động ném Error."
        }
      }
    ],
    "tips": [
      {
        "en": "Wrap JSON.parse() and Storage operations in try/catch: Corrupted localStorage data, private browsing restrictions, or quota limits (`QuotaExceededError`) will throw exceptions if not caught.",
        "vi": "Luôn bọc JSON.parse() và thao tác Storage trong khối try/catch: Dữ liệu storage bị lỗi, chế độ ẩn danh hoặc vượt quá dung lượng cho phép sẽ ném ngoại lệ làm sập app nếu không được try/catch."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "js_ex_20_1",
      "type": "complete_code",
      "title": {
        "en": "Resilient Fetch with Exponential Backoff Retry",
        "vi": "Gửi Request Tự Động Thử Lại (Retry) Với Giãn Cách Số Mũ"
      },
      "instruction": {
        "en": "Write a function `fetchWithRetry(url, options = {}, maxRetries = 3, baseDelayMs = 200)` that attempts to fetch a URL. If the request fails (network error or `!response.ok`), retry up to `maxRetries` times with exponential delay `baseDelayMs * 2 ** attempt`. Return the parsed JSON response.",
        "vi": "Viết hàm `fetchWithRetry(url, options = {}, maxRetries = 3, baseDelayMs = 200)` gửi fetch tới URL. Nếu thất bại (lỗi mạng hoặc `!response.ok`), thử lại tối đa `maxRetries` lần với độ trễ tăng theo số mũ `baseDelayMs * 2 ** attempt`. Trả về kết quả JSON đã parse."
      },
      "starterCode": "async function fetchWithRetry(url, options = {}, maxRetries = 3, baseDelayMs = 200) {\n  // Implement fetch with exponential retry\n}",
      "solutionCode": "async function fetchWithRetry(url, options = {}, maxRetries = 3, baseDelayMs = 200) {\n  let lastError;\n\n  for (let attempt = 0; attempt < maxRetries; attempt++) {\n    try {\n      const res = await fetch(url, options);\n      if (!res.ok) {\n        throw new Error(`HTTP error ${res.status}`);\n      }\n      return await res.json();\n    } catch (err) {\n      lastError = err;\n      if (attempt < maxRetries - 1) {\n        const delay = baseDelayMs * Math.pow(2, attempt);\n        await new Promise(resolve => setTimeout(resolve, delay));\n      }\n    }\n  }\n\n  throw lastError;\n}",
      "hint": {
        "en": "Loop up to maxRetries. Check `res.ok`, and if failed wait with `await new Promise(r => setTimeout(r, delay))` before looping.",
        "vi": "Lặp tối đa maxRetries lần. Kiểm tra `res.ok`, nếu lỗi thì chờ với `await new Promise(r => setTimeout(r, delay))` trước khi thử lại."
      }
    },
    {
      "id": "js_ex_20_2",
      "type": "complete_code",
      "title": {
        "en": "Expiring LocalStorage Cache Engine",
        "vi": "Bộ Nhớ Cache LocalStorage Có Thời Gian Hết Hạn (TTL)"
      },
      "instruction": {
        "en": "Create an object `ExpiringStorage` with methods: `set(key, value, ttlSeconds)` (stores item with expiration timestamp), `get(key)` (returns value, or returns `null` and deletes key if expired), and `clear()`.",
        "vi": "Tạo đối tượng `ExpiringStorage` có các phương thức: `set(key, value, ttlSeconds)` (lưu giá trị kèm timestamp hết hạn), `get(key)` (trả về giá trị, hoặc trả về `null` và tự xóa key nếu đã hết hạn) và `clear()`."
      },
      "starterCode": "const ExpiringStorage = {\n  set(key, value, ttlSeconds) {},\n  get(key) {},\n  clear() {}\n};",
      "solutionCode": "const ExpiringStorage = {\n  set(key, value, ttlSeconds) {\n    try {\n      const item = {\n        value,\n        expiry: Date.now() + ttlSeconds * 1000\n      };\n      localStorage.setItem(key, JSON.stringify(item));\n    } catch (err) {\n      console.error(\"Failed to write to storage\", err);\n    }\n  },\n  get(key) {\n    try {\n      const raw = localStorage.getItem(key);\n      if (!raw) return null;\n\n      const item = JSON.parse(raw);\n      if (Date.now() > item.expiry) {\n        localStorage.removeItem(key);\n        return null;\n      }\n      return item.value;\n    } catch (err) {\n      return null;\n    }\n  },\n  clear() {\n    localStorage.clear();\n  }\n};",
      "hint": {
        "en": "In set(), save `{ value, expiry: Date.now() + ttlSeconds * 1000 }`. In get(), check `Date.now() > item.expiry`.",
        "vi": "Trong set(), lưu `{ value, expiry: Date.now() + ttlSeconds * 1000 }`. Trong get(), kiểm tra `Date.now() > item.expiry`."
      }
    }
  ],
  "challenge": {
    "id": "js_chal_20",
    "title": {
      "en": "Offline-First Sync Queue Service",
      "vi": "Hàng Đợi Đồng Bộ Dữ Liệu Ngoại Tuyến (Offline-First Sync Queue)"
    },
    "description": {
      "en": "Build an offline sync manager `createOfflineSyncQueue(storageKey, apiHandler)` that persists pending mutation requests to `localStorage` when offline. When `syncAll()` is called, it processes pending items sequentially, removes successful ones from storage, and emits status callbacks.",
      "vi": "Xây dựng bộ quản lý đồng bộ offline `createOfflineSyncQueue(storageKey, apiHandler)` tự động lưu các request thay đổi dữ liệu vào `localStorage` khi mất mạng. Khi gọi `syncAll()`, hàm xử lý tuần tự các item đang chờ, xóa item thành công khỏi storage và phát các callback trạng thái."
    },
    "starterCode": "function createOfflineSyncQueue(storageKey, apiHandler) {\n  // Implement offline-first sync manager\n}",
    "solutionCode": "function createOfflineSyncQueue(storageKey, apiHandler) {\n  function getQueue() {\n    try {\n      return JSON.parse(localStorage.getItem(storageKey) || \"[]\");\n    } catch {\n      return [];\n    }\n  }\n\n  function saveQueue(queue) {\n    try {\n      localStorage.setItem(storageKey, JSON.stringify(queue));\n    } catch (e) {\n      console.error(\"Storage save failed\", e);\n    }\n  }\n\n  return {\n    enqueue(action) {\n      const queue = getQueue();\n      const item = { id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, action, timestamp: Date.now() };\n      queue.push(item);\n      saveQueue(queue);\n      return item.id;\n    },\n    getPendingCount() {\n      return getQueue().length;\n    },\n    async syncAll() {\n      const queue = getQueue();\n      const remaining = [];\n      const results = [];\n\n      for (const item of queue) {\n        try {\n          const res = await apiHandler(item.action);\n          results.push({ id: item.id, success: true, result: res });\n        } catch (err) {\n          results.push({ id: item.id, success: false, error: err.message });\n          remaining.push(item);\n        }\n      }\n\n      saveQueue(remaining);\n      return { completed: results.filter(r => r.success).length, failed: remaining.length, details: results };\n    }\n  };\n}",
    "hints": [
      {
        "en": "Maintain array of pending items in localStorage. In syncAll(), iterate sequentially and update queue with only items that failed.",
        "vi": "Duy trì mảng các item chờ trong localStorage. Trong syncAll(), duyệt tuần tự và cập nhật lại queue chỉ chứa các item bị lỗi."
      }
    ],
    "requirements": [
      {
        "en": "Successfully implement the solution for Offline-First Sync Queue Service according to specifications",
        "vi": "Cài đặt giải pháp hoàn chỉnh cho Hàng Đợi Đồng Bộ Dữ Liệu Ngoại Tuyến (Offline-First Sync Queue) theo đúng yêu cầu đề bài"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "js_q_20_1",
      "type": "single_choice",
      "question": {
        "en": "When does the Promise returned by `fetch()` reject?",
        "vi": "Khi nào thì Promise trả về từ hàm `fetch()` bị reject?"
      },
      "options": [
        {
          "en": "Only on network failure, DNS errors, or CORS security blocks (NOT on HTTP 404 or 500 responses)",
          "vi": "Chỉ khi xảy ra lỗi mạng hoàn toàn, lỗi DNS, hoặc bị chặn bảo mật CORS (KHÔNG tự reject khi nhận HTTP 404 hay 500)"
        },
        {
          "en": "Whenever an HTTP 404 or 500 error is returned",
          "vi": "Bất cứ khi nào nhận được mã lỗi HTTP 404 hoặc 500"
        },
        {
          "en": "Whenever the response payload is not JSON",
          "vi": "Bất cứ khi nào dữ liệu trả về không phải định dạng JSON"
        },
        {
          "en": "Fetch never rejects",
          "vi": "Fetch không bao giờ reject"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "An HTTP error (such as 404 or 500) is still a valid HTTP response from the server, so fetch fulfills successfully with `response.ok === false`.",
        "vi": "Mã lỗi HTTP (như 404 hay 500) vẫn là phản hồi hợp lệ từ máy chủ, nên fetch resolve thành công với `response.ok === false`."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "easy"
    },
    {
      "id": "js_q_20_2",
      "type": "predict_output",
      "question": {
        "en": "What is `response.ok` in the Fetch API?",
        "vi": "`response.ok` trong Fetch API có giá trị gì?"
      },
      "options": [
        {
          "en": "A boolean that is `true` if `response.status` is between 200 and 299 inclusive",
          "vi": "Một biến boolean có giá trị `true` nếu `response.status` nằm trong khoảng 200 đến 299"
        },
        {
          "en": "A string containing 'OK'",
          "vi": "Một chuỗi ký tự chứa chữ 'OK'"
        },
        {
          "en": "The HTTP status code integer (e.g. 200)",
          "vi": "Một số nguyên biểu thị mã trạng thái HTTP (ví dụ 200)"
        },
        {
          "en": "A Promise resolving to response body",
          "vi": "Một Promise resolve nội dung body"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`response.ok` is shorthand for `response.status >= 200 && response.status <= 299`.",
        "vi": "`response.ok` là cách viết tắt của điều kiện `response.status >= 200 && response.status <= 299`."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "easy"
    },
    {
      "id": "js_q_20_3",
      "type": "single_choice",
      "question": {
        "en": "How do you cancel an in-flight `fetch()` request or enforce a request timeout?",
        "vi": "Làm thế nào để hủy một request `fetch()` đang gửi hoặc thiết lập timeout hủy yêu cầu?"
      },
      "options": [
        {
          "en": "Pass an `AbortSignal` from an `AbortController` instance into `fetch(url, { signal })`",
          "vi": "Truyền một `AbortSignal` từ đối tượng `AbortController` vào `fetch(url, { signal })`"
        },
        {
          "en": "Call fetch.stop()",
          "vi": "Gọi fetch.stop()"
        },
        {
          "en": "Set window.stop = true",
          "vi": "Gán window.stop = true"
        },
        {
          "en": "Delete the response object",
          "vi": "Xóa đối tượng response"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`AbortController` provides the standard signal interface for aborting DOM requests and fetches.",
        "vi": "`AbortController` cung cấp cơ chế chuẩn để hủy các request DOM và fetch bất đồng bộ."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "easy"
    },
    {
      "id": "js_q_20_4",
      "type": "predict_output",
      "question": {
        "en": "What is the primary difference between `localStorage` and `sessionStorage`?",
        "vi": "Điểm khác biệt chính giữa `localStorage` và `sessionStorage` là gì?"
      },
      "options": [
        {
          "en": "`localStorage` persists indefinitely across sessions and tabs; `sessionStorage` is cleared as soon as the browser tab is closed",
          "vi": "`localStorage` tồn tại vĩnh viễn qua nhiều phiên và các tab; `sessionStorage` bị xóa sạch ngay khi tab trình duyệt bị đóng"
        },
        {
          "en": "`sessionStorage` can store up to 50GB",
          "vi": "`sessionStorage` có thể lưu tới 50GB"
        },
        {
          "en": "`localStorage` is only available in Node.js",
          "vi": "`localStorage` chỉ có trong Node.js"
        },
        {
          "en": "`sessionStorage` sends data to the server on every request",
          "vi": "`sessionStorage` gửi dữ liệu lên server trong mọi request"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`localStorage` persists until explicitly cleared, while `sessionStorage` is tied strictly to the browser tab lifecycle.",
        "vi": "`localStorage` tồn tại vĩnh viễn cho đến khi bị xóa chủ động, còn `sessionStorage` gắn liền với vòng đời của tab trình duyệt."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "medium"
    },
    {
      "id": "js_q_20_5",
      "type": "single_choice",
      "question": {
        "en": "What data types can be stored directly inside `localStorage`?",
        "vi": "Kiểu dữ liệu nào có thể được lưu trữ trực tiếp bên trong `localStorage`?"
      },
      "options": [
        {
          "en": "Strings only (objects and arrays must be serialized with `JSON.stringify()`)",
          "vi": "Chỉ lưu được chuỗi ký tự (objects và arrays bắt buộc phải chuyển sang chuỗi bằng `JSON.stringify()`)"
        },
        {
          "en": "Functions and Classes",
          "vi": "Hàm và Class"
        },
        {
          "en": "Symbols and BigInts directly",
          "vi": "Symbol và BigInt trực tiếp"
        },
        {
          "en": "Binary streams only",
          "vi": "Chỉ lưu luồng nhị phân"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Web Storage keys and values are always UTF-16 strings. Non-string inputs are automatically coerced to `[object Object]` if not stringified.",
        "vi": "Key và Value của Web Storage luôn là chuỗi ký tự. Nếu không stringify, các object sẽ bị ép kiểu thành chuỗi vô nghĩa `[object Object]`."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "medium"
    },
    {
      "id": "js_q_20_6",
      "type": "predict_output",
      "question": {
        "en": "What happens if you store an object directly `localStorage.setItem('user', { name: 'Elena' })` without `JSON.stringify()`?",
        "vi": "Điều gì xảy ra nếu bạn lưu object trực tiếp `localStorage.setItem('user', { name: 'Elena' })` mà không dùng `JSON.stringify()`?"
      },
      "options": [
        {
          "en": "It coerces the object to string `'[object Object]'`, losing all internal data",
          "vi": "Nó tự ép kiểu object thành chuỗi `'[object Object]'`, làm mất sạch dữ liệu bên trong"
        },
        {
          "en": "It automatically saves valid JSON",
          "vi": "Nó tự động lưu định dạng JSON hợp lệ"
        },
        {
          "en": "Throws a TypeError",
          "vi": "Ném lỗi TypeError"
        },
        {
          "en": "Deletes the storage database",
          "vi": "Xóa toàn bộ database storage"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "`localStorage.setItem` calls `.toString()` on values, turning plain objects into `'[object Object]'`.",
        "vi": "`localStorage.setItem` tự gọi hàm `.toString()` trên giá trị truyền vào, biến plain object thành `'[object Object]'`."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "medium"
    },
    {
      "id": "js_q_20_7",
      "type": "fill_blank",
      "question": {
        "en": "To read and parse the JSON payload body from a fetch response, call await response._____ ().",
        "vi": "Để đọc và phân tích dữ liệu body JSON từ một fetch response, gọi lệnh await response._____ ()."
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
        "en": "`response.json()` reads the response stream to completion and parses it as JSON.",
        "vi": "`response.json()` đọc hoàn tất luồng phản hồi và phân tích cú pháp thành đối tượng JSON."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "medium",
      "fillBlankAnswers": [
        "json"
      ]
    },
    {
      "id": "js_q_20_8",
      "type": "single_choice",
      "question": {
        "en": "What is the typical storage quota limit for `localStorage` per origin in modern desktop browsers?",
        "vi": "Dung lượng lưu trữ tối đa thông thường của `localStorage` trên mỗi origin trong trình duyệt desktop hiện đại là bao nhiêu?"
      },
      "options": [
        {
          "en": "Approximately 5MB - 10MB per origin",
          "vi": "Khoảng 5MB - 10MB cho mỗi origin"
        },
        {
          "en": "Unlimited (limited only by hard drive)",
          "vi": "Không giới hạn (chỉ phụ thuộc ổ cứng)"
        },
        {
          "en": "Exact 64KB",
          "vi": "Đúng 64KB"
        },
        {
          "en": "500MB",
          "vi": "500MB"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Standard browser quota is ~5MB per origin. Exceeding this limit throws a `QuotaExceededError`.",
        "vi": "Hạn mức tiêu chuẩn của trình duyệt là ~5MB mỗi origin. Vượt quá dung lượng sẽ ném lỗi `QuotaExceededError`."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "hard"
    },
    {
      "id": "js_q_20_9",
      "type": "predict_output",
      "question": {
        "en": "How do you specify a custom HTTP request header when sending a `fetch()` request?",
        "vi": "Cách chỉ định custom HTTP Header khi gửi request `fetch()` là gì?"
      },
      "options": [
        {
          "en": "Pass a headers object inside options: `fetch(url, { headers: { 'Authorization': 'Bearer ...' } })`",
          "vi": "Truyền object headers trong options: `fetch(url, { headers: { 'Authorization': 'Bearer ...' } })`"
        },
        {
          "en": "Include headers in the URL query parameters",
          "vi": "Đưa header vào query parameter trên URL"
        },
        {
          "en": "Set document.cookie = 'header'",
          "vi": "Gán document.cookie = 'header'"
        },
        {
          "en": "Custom headers are forbidden by HTML5",
          "vi": "HTML5 cấm dùng custom header"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "The `headers` property accepts a plain object or a `Headers` instance.",
        "vi": "Thuộc tính `headers` nhận một object thông thường hoặc một instance của đối tượng `Headers`."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "hard"
    },
    {
      "id": "js_q_20_10",
      "type": "single_choice",
      "question": {
        "en": "Why is `localStorage` NOT suitable for storing sensitive authentication tokens (like high-privilege JWTs) in production applications?",
        "vi": "Tại sao `localStorage` KHÔNG an toàn để lưu trữ token xác thực nhạy cảm (như JWT đặc quyền cao) trong ứng dụng production?"
      },
      "options": [
        {
          "en": "`localStorage` is accessible to any JavaScript running on the origin, making stored tokens vulnerable to theft via Cross-Site Scripting (XSS) attacks; `HttpOnly` cookies are more secure",
          "vi": "`localStorage` có thể bị đọc bởi bất kỳ mã JavaScript nào chạy trên cùng origin, khiến token dễ bị đánh cắp qua tấn công XSS; cookie `HttpOnly` an toàn hơn nhiều"
        },
        {
          "en": "`localStorage` is deleted every 5 minutes",
          "vi": "`localStorage` bị xóa mỗi 5 phút"
        },
        {
          "en": "`localStorage` only works on localhost",
          "vi": "`localStorage` chỉ hoạt động trên localhost"
        },
        {
          "en": "`localStorage` cannot store alphanumeric characters",
          "vi": "`localStorage` không lưu được chữ cái"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Any XSS vulnerability exposes `localStorage` contents. `HttpOnly; Secure; SameSite=Strict` cookies prevent client JS access.",
        "vi": "Bất kỳ lỗ hổng XSS nào cũng có thể đọc sạch `localStorage`. Cookie `HttpOnly; Secure` ngăn chặn JS client truy cập, an toàn hơn nhiều."
      },
      "topicId": "js_fetch_storage",
      "difficulty": "hard"
    }
  ]
};
export default lesson20;
