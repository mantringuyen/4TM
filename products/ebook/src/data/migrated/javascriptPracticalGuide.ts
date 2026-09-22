import { Book } from '../../types';

export const JAVASCRIPT_PRACTICAL_GUIDE_BOOK: Book = {
  id: 'javascript-practical-guide',
  slug: 'javascript-practical-guide',
  title: 'Async JavaScript & Fetch API Practical Guide',
  subtitle: {
    en: 'Production Blueprint for Resilient HTTP Streaming, Status Handling & AbortController Cancellation',
    vi: 'Cẩm Nang Thực Hành Gọi API Async, Đọc Stream & Hủy Request An Toàn Với AbortController',
  },
  bookType: 'Practical Guides',
  categoryId: 'javascript',
  subjectId: 'programming',
  author: '4TM Technical Board',
  role: 'Core Language & Web Architecture Group',
  level: 'Intermediate',
  estimatedReadTime: '32 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-15',
  accentColor: 'from-amber-500 to-yellow-800',
  tags: ['Fetch API', 'Async', 'AbortController', 'HTTP', 'Streaming', 'Production Guide'],
  description: {
    en: 'A step-by-step practical guide to performing asynchronous HTTP requests, handling status codes, streaming responses, and cancelling stale queries with AbortSignal.',
    vi: 'Hướng dẫn thực hành từng bước xử lý truy vấn HTTP bất đồng bộ, kiểm tra mã trạng thái, đọc phản hồi dạng stream và hủy request hết hạn bằng AbortSignal.',
  },
  prerequisites: {
    en: [
      'Strong grasp of JavaScript Promises and async/await syntax',
      'Familiarity with standard HTTP methods and status codes (2xx, 4xx, 5xx)',
    ],
    vi: [
      'Nắm vững Promise và cú pháp async/await trong JavaScript',
      'Hiểu biết về các phương thức HTTP và mã trạng thái chuẩn (2xx, 4xx, 5xx)',
    ],
  },
  outcomes: {
    en: [
      'Build resilient HTTP clients checking response.ok and parsing error envelopes correctly',
      'Read and process large streaming payloads chunk-by-chunk via ReadableStream',
      'Cancel in-flight network requests on route navigation or component unmount using AbortController',
      'Implement timeout envelopes combining AbortSignal.timeout() with exponential backoff',
    ],
    vi: [
      'Xây dựng HTTP client bền vững kiểm tra response.ok và parse đúng format lỗi trả về',
      'Đọc và xử lý luồng dữ liệu lớn theo từng phần với ReadableStream',
      'Hủy request mạng đang chạy khi người dùng chuyển trang hoặc unmount component bằng AbortController',
      'Thiết lập phong bì timeout kết hợp AbortSignal.timeout() và cơ chế thử lại có giãn cách',
    ],
  },
  chapters: [
    // Chapter 1: Robust Asynchronous Fetching & Stream Reading
    {
      id: 'jpg-ch-1',
      number: 1,
      slug: 'fetch-api-and-response-handling',
      title: {
        en: 'Safe HTTP Client Architecture & Response Streaming',
        vi: 'Kiến Trúc HTTP Client An Toàn & Xử Lý Stream Dữ Liệu',
      },
      summary: {
        en: 'Overcoming the fetch() 4xx/5xx rejection pitfall, typed JSON deserialization, and chunked ReadableStream parsing.',
        vi: 'Khắc phục cạm bẫy không tự bắt lỗi 4xx/5xx của fetch(), giải mã JSON có kiểm tra kiểu và đọc luồng ReadableStream theo gói nhỏ.',
      },
      readTimeMinutes: 16,
      sections: [
        {
          id: 'jpg-1-1',
          title: {
            en: 'Building a Hardened HTTP Client with Status Verification',
            vi: 'Xây Dựng HTTP Client Chuẩn Hóa Với Kiểm Tra Mã Trạng Thái',
          },
          keyIdea: {
            en: 'The native fetch() Promise only rejects on true network failures or DNS drops; HTTP 404 and 500 responses resolve successfully, requiring explicit response.ok validation.',
            vi: 'Promise của hàm fetch() chỉ bị reject khi đứt mạng vật lý hoặc lỗi DNS; các phản hồi HTTP 404 và 500 vẫn resolve bình thường, bắt buộc phải kiểm tra qua response.ok.',
          },
          content: {
            en: 'In web application engineering, assuming `fetch()` rejects on HTTP error responses is among the most frequent sources of silent runtime crashes. When an API server returns 404 Not Found or 500 Internal Server Error, `fetch()` considers the HTTP exchange successfully completed and fulfills the Promise with a `Response` object. A production-grade client must evaluate `response.ok` (which asserts status is in the 200–299 range) before invoking `.json()`. Furthermore, when consuming large or streaming endpoints (such as LLM generation tokens or bulk export NDJSON), developers should read from `response.body` via `ReadableStreamDefaultReader` rather than buffering the entire payload into client RAM.',
            vi: 'Trong lập trình web, ngộ nhận rằng `fetch()` sẽ tự reject khi API trả về mã lỗi HTTP là nguyên nhân hàng đầu gây sập ứng dụng trong im lặng. Khi máy chủ trả về 404 Not Found hay 500 Internal Server Error, `fetch()` vẫn xem phiên trao đổi HTTP là hoàn tất và fulfill Promise với đối tượng `Response`. Một HTTP client chuẩn production bắt buộc phải kiểm tra cờ `response.ok` (kiểm tra status có nằm trong khoảng 200–299 không) trước khi gọi `.json()`. Ngoài ra, khi nhận dữ liệu lớn hoặc luồng stream (như token của LLM hoặc file NDJSON), lập trình viên nên đọc từ `response.body` qua `ReadableStreamDefaultReader` thay vì gom toàn bộ dữ liệu vào RAM.',
          },
          guideDetails: {
            goal: {
              en: 'Build a production-grade async API client function that validates HTTP status codes, extracts error payloads, and supports chunk-by-chunk stream decoding.',
              vi: 'Xây dựng hàm client API bất đồng bộ chuẩn production có kiểm tra mã trạng thái, bóc tách lỗi chi tiết và hỗ trợ đọc stream theo từng chunk.',
            },
            prerequisites: {
              en: [
                'Modern JavaScript runtime (Node.js 18+, modern browser)',
                'Understanding of async/await, try/catch, and TextDecoder',
              ],
              vi: [
                'Môi trường JavaScript hiện đại (Node.js 18+, trình duyệt mới)',
                'Hiểu biết về async/await, try/catch và TextDecoder',
              ],
            },
            preparation: {
              en: 'Define a standardized error class (e.g. HttpError) containing status code, status text, and backend response body for consistent application-level error handling.',
              vi: 'Định nghĩa class HttpError chuẩn hóa chứa mã trạng thái, thông điệp và nội dung lỗi từ backend để bắt lỗi đồng bộ trên toàn ứng dụng.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Define Custom HttpError Class',
                  vi: 'Định Nghĩa Class Lỗi HttpError Chuẩn Hóa',
                },
                instruction: {
                  en: 'Extend standard Error with HTTP status, URL, and parsed error payload attributes.',
                  vi: 'Kế thừa class Error tiêu chuẩn để bổ sung mã HTTP status, URL và nội dung phản hồi lỗi chi tiết.',
                },
                codeBlock: {
                  language: 'javascript',
                  filename: 'HttpError.js',
                  code: `export class HttpError extends Error {
  constructor(status, statusText, url, data) {
    super(\`HTTP \${status} (\${statusText}) at \${url}\`);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.data = data;
  }
}`,
                },
                expectedOutput: {
                  en: 'Typed error class with full contextual attributes ready for inspection.',
                  vi: 'Class lỗi có kiểu tường minh chứa đầy đủ thông tin ngữ cảnh.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Author Hardened Request Wrapper with response.ok Guard',
                  vi: 'Xây Dựng Hàm Wrapper Request Với Kiểm Tra response.ok',
                },
                instruction: {
                  en: 'Issue fetch request, check response.ok, extract structured error body on failures, and safely return parsed JSON on success.',
                  vi: 'Thực hiện gọi fetch, kiểm tra response.ok, bóc tách dữ liệu lỗi khi thất bại và parse JSON an toàn khi thành công.',
                },
                codeBlock: {
                  language: 'javascript',
                  filename: 'safeFetch.js',
                  code: `import { HttpError } from './HttpError.js';

export async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }
    throw new HttpError(response.status, response.statusText, url, errorData);
  }

  return await response.json();
}`,
                },
                expectedOutput: {
                  en: 'Function correctly returns parsed data or throws informative HttpError.',
                  vi: 'Hàm trả về dữ liệu parse thành công hoặc ném ra HttpError đầy đủ thông tin.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Implement Chunked ReadableStream Reader',
                  vi: 'Xây Dựng Trình Đọc Stream ReadableStream Từng Gói Nhỏ',
                },
                instruction: {
                  en: 'Consume response.body via ReadableStreamDefaultReader and stream decoded text chunks through an async generator.',
                  vi: 'Đọc response.body qua ReadableStreamDefaultReader và phát các chunk văn bản qua async generator.',
                },
                codeBlock: {
                  language: 'javascript',
                  filename: 'streamResponse.js',
                  code: `export async function* streamText(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok || !response.body) {
    throw new Error(\`Failed to stream: \${response.status}\`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}`,
                },
                expectedOutput: {
                  en: 'Async iterator emitting text tokens progressively as they arrive from server.',
                  vi: 'Async iterator phát các token văn bản liên tục theo thời gian thực từ server.',
                },
              },
            ],
            verification: {
              en: 'Call requestJson against an endpoint returning HTTP 404 to verify HttpError is thrown with status 404, and streamText against a chunked endpoint to verify progressive console logging.',
              vi: 'Gọi hàm requestJson vào endpoint trả về HTTP 404 để kiểm tra HttpError được ném ra với status 404, và gọi streamText để xác minh log văn bản hiển thị dần dần.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'SyntaxError: Unexpected token < in JSON at position 0',
                  vi: 'SyntaxError: Unexpected token < in JSON at position 0',
                },
                cause: {
                  en: 'The endpoint returned an HTML error page (e.g. 502 Bad Gateway from Nginx) instead of JSON, and response.json() attempted to parse HTML.',
                  vi: 'Endpoint trả về trang web HTML báo lỗi (vd 502 Bad Gateway từ Nginx) thay vì JSON, khiến hàm response.json() cố parse HTML thành JSON.',
                },
                fix: {
                  en: 'Check response.headers.get("content-type")?.includes("application/json") and response.ok before invoking response.json().',
                  vi: 'Kiểm tra response.headers.get("content-type")?.includes("application/json") và response.ok trước khi gọi response.json().',
                },
              },
              {
                symptom: {
                  en: 'TypeError: Failed to fetch (NetworkError when attempting to fetch resource)',
                  vi: 'TypeError: Failed to fetch (Lỗi mạng khi fetch tài nguyên)',
                },
                cause: {
                  en: 'Cross-Origin Resource Sharing (CORS) preflight failed, or the user device lost internet connectivity.',
                  vi: 'Preflight CORS bị chặn bởi máy chủ hoặc thiết bị người dùng bị mất kết nối mạng internet.',
                },
                fix: {
                  en: 'Catch TypeError explicitly to distinguish offline/CORS failures from application-level HTTP status codes.',
                  vi: 'Bắt riêng lỗi TypeError để phân biệt giữa lỗi mất mạng/CORS và các mã trạng thái HTTP từ server.',
                },
              },
            ],
            checklist: {
              en: [
                'Always verify response.ok before attempting to parse response body.',
                'Handle non-JSON responses gracefully when parsing server error payloads.',
                'Release reader locks in finally blocks when consuming ReadableStream.',
                'Distinguish between network rejections (TypeError) and HTTP error responses.',
              ],
              vi: [
                'Luôn kiểm tra response.ok trước khi parse nội dung phản hồi.',
                'Xử lý an toàn các phản hồi không phải JSON khi trích xuất thông tin lỗi từ server.',
                'Giải phóng khóa reader (releaseLock) trong khối finally khi đọc ReadableStream.',
                'Phân định rạch ròi giữa lỗi rớt mạng (TypeError) và mã trạng thái lỗi HTTP từ server.',
              ],
            },
          },
        },
      ],
    },

    // Chapter 2: Request Lifecycle Management with AbortController
    {
      id: 'jpg-ch-2',
      number: 2,
      slug: 'abort-controller-cancellation',
      title: {
        en: 'Request Lifecycle Management with AbortController',
        vi: 'Quản Lý Vòng Đời Request Với AbortController & AbortSignal',
      },
      summary: {
        en: 'Preventing race conditions, cancelling stale search queries, and enforcing hard timeout envelopes using AbortController.',
        vi: 'Chống race condition khi tìm kiếm nhanh, hủy bỏ request cũ và thiết lập giới hạn timeout bằng AbortController.',
      },
      readTimeMinutes: 16,
      sections: [
        {
          id: 'jpg-2-1',
          title: {
            en: 'Cancelling In-Flight HTTP Requests & Timeout Envelopes',
            vi: 'Hủy Yêu Cầu HTTP Đang Chạy & Thiết Lập Timeout An Toàn',
          },
          keyIdea: {
            en: 'Binding an AbortSignal to fetch() enables immediate teardown of active network connections when a user navigates away or types subsequent search keystrokes.',
            vi: 'Gắn AbortSignal vào fetch() cho phép ngắt kết nối mạng ngay lập tức khi người dùng chuyển trang hoặc gõ phím tìm kiếm tiếp theo.',
          },
          content: {
            en: 'In fast-paced web user interfaces (such as search-as-you-type inputs or tabbed dashboards), network responses can arrive out of order. If a user types "a" (Request 1 taking 600ms) and then "ab" (Request 2 taking 100ms), Request 2 will resolve first, followed by Request 1 overwriting the screen with stale data—a catastrophic race condition. By tying an `AbortController` instance to each search query, the application aborts previous in-flight requests before launching the next one. Additionally, `AbortSignal.timeout(ms)` provides a native, clean mechanism to enforce maximum request durations without relying on leaky `setTimeout` timers.',
            vi: 'Trong các giao diện người dùng tương tác cao (như ô tìm kiếm vừa gõ vừa tải hoặc chuyển tab), các phản hồi mạng có thể đến sai thứ tự. Nếu người dùng gõ "a" (Request 1 mất 600ms) rồi gõ "ab" (Request 2 mất 100ms), Request 2 sẽ hoàn thành trước, sau đó Request 1 mới trả về và ghi đè dữ liệu cũ lên màn hình—đây là lỗi race condition nghiêm trọng. Bằng cách gắn `AbortController` vào từng lượt gọi, ứng dụng có thể chủ động hủy bỏ request cũ trước khi phát request mới. Hơn nữa, phương thức `AbortSignal.timeout(ms)` cung cấp cơ chế chuẩn xác để áp đặt thời gian phản hồi tối đa mà không lo rò rỉ bộ nhớ từ `setTimeout`.',
          },
          guideDetails: {
            goal: {
              en: 'Implement a reusable search hook or query manager that eliminates asynchronous race conditions and enforces strict request timeout limits.',
              vi: 'Hiện thực module tìm kiếm có khả năng triệt tiêu hoàn toàn race condition và áp đặt giới hạn timeout nghiêm ngặt cho mỗi truy vấn.',
            },
            prerequisites: {
              en: [
                'Browser support for AbortController (all modern browsers) and AbortSignal.any() / AbortSignal.timeout()',
                'Understanding of DOM event debouncing and cleanup lifecycles',
              ],
              vi: [
                'Trình duyệt hỗ trợ AbortController và AbortSignal.timeout()',
                'Hiểu biết về kỹ thuật debounce sự kiện DOM và dọn dẹp tài nguyên',
              ],
            },
            preparation: {
              en: 'Identify views with frequent user transitions or keystroke inputs that launch concurrent asynchronous requests.',
              vi: 'Xác định các màn hình có thao tác nhập liệu liên tục hoặc chuyển tab nhanh phát sinh nhiều request đồng thời.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Create an Active Request Controller Store',
                  vi: 'Khởi Tạo Quản Lý AbortController Theo Phiên',
                },
                instruction: {
                  en: 'Maintain a reference to the active AbortController; abort any preceding controller prior to creating a new one.',
                  vi: 'Lưu giữ tham chiếu đến AbortController đang chạy; gọi abort() trên controller cũ trước khi tạo controller mới.',
                },
                codeBlock: {
                  language: 'javascript',
                  filename: 'searchManager.js',
                  code: `class SearchManager {
  #currentController = null;

  async search(query, { timeoutMs = 5000 } = {}) {
    // 1. Abort any previous pending request immediately
    if (this.#currentController) {
      this.#currentController.abort('Stale query replaced by newer user input');
    }

    // 2. Create fresh controller for current keystroke
    const controller = new AbortController();
    this.#currentController = controller;

    // 3. Compose signal with hard timeout envelope
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    const combinedSignal = AbortSignal.any([controller.signal, timeoutSignal]);

    try {
      const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
        signal: combinedSignal
      });

      if (!res.ok) throw new Error(\`Search error: \${res.status}\`);
      return await res.json();
    } catch (err) {
      if (err.name === 'AbortError') {
        console.info('Query successfully cancelled:', err.message);
        return null; // Suppress error for intentional user cancellations
      } else if (err.name === 'TimeoutError') {
        console.warn('Query exceeded timeout limit:', timeoutMs, 'ms');
      }
      throw err;
    } finally {
      if (this.#currentController === controller) {
        this.#currentController = null;
      }
    }
  }
}

export const searchManager = new SearchManager();`,
                },
                expectedOutput: {
                  en: 'Safe search caller that automatically cancels previous requests on rapid input.',
                  vi: 'Trình gọi tìm kiếm an toàn tự động ngắt các request cũ khi người dùng gõ liên tục.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Integrate Controller Cleanup into UI Components',
                  vi: 'Tích Hợp Dọn Dẹp AbortController Vào Component UI',
                },
                instruction: {
                  en: 'Call abort() on component unmount or view teardown to prevent setting state on unmounted views.',
                  vi: 'Gọi abort() khi unmount component hoặc đóng trang để ngăn chặn lỗi cập nhật state trên component đã hủy.',
                },
                codeBlock: {
                  language: 'javascript',
                  filename: 'useCancellableFetch.js',
                  code: `// React useEffect cleanup pattern
useEffect(() => {
  const controller = new AbortController();

  async function loadData() {
    try {
      const res = await fetch('/api/dashboard', { signal: controller.signal });
      const data = await res.json();
      setDashboard(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    }
  }

  loadData();

  // Teardown: Cancels in-flight network request if user switches tabs!
  return () => controller.abort();
}, []);`,
                },
                expectedOutput: {
                  en: 'Zero memory leaks and zero React "Can\'t perform state update on unmounted component" warnings.',
                  vi: 'Triệt tiêu rò rỉ bộ nhớ và không còn cảnh báo cập nhật state trên unmounted component.',
                },
              },
            ],
            verification: {
              en: 'Open Browser DevTools Network panel, type 4 rapid letters in search box, and observe that the first 3 requests display "(cancelled)" status with only the final request completing.',
              vi: 'Mở tab Network trong DevTools trình duyệt, gõ nhanh 4 ký tự vào ô tìm kiếm và xác nhận 3 request đầu hiển thị trạng thái "(cancelled)", chỉ request cuối cùng trả về kết quả.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Uncaught (in promise) DOMException: The user aborted a request',
                  vi: 'Uncaught (in promise) DOMException: The user aborted a request',
                },
                cause: {
                  en: 'The caller did not wrap fetch() in try/catch or re-threw AbortError without checking `err.name === "AbortError"`.',
                  vi: 'Caller không bọc fetch trong try/catch hoặc throw lại AbortError mà không lọc điều kiện `err.name === "AbortError"`.',
                },
                fix: {
                  en: 'Always inspect `if (err.name === "AbortError")` in catch blocks and treat intentional aborts as benign no-ops.',
                  vi: 'Luôn kiểm tra `if (err.name === "AbortError")` trong khối catch và bỏ qua các trường hợp chủ động hủy request.',
                },
              },
            ],
            checklist: {
              en: [
                'Abort previous in-flight requests before initiating subsequent searches.',
                'Always ignore or gracefully handle AbortError in catch blocks.',
                'Utilize AbortSignal.timeout() for clean, declarative timeout envelopes.',
                'Clean up active controllers on component unmount or view teardown.',
              ],
              vi: [
                'Hủy bỏ request cũ đang chạy trước khi phát lệnh tìm kiếm tiếp theo.',
                'Luôn bỏ qua hoặc xử lý an toàn lỗi AbortError trong khối catch.',
                'Sử dụng AbortSignal.timeout() để thiết lập thời gian chờ gọn gàng.',
                'Dọn dẹp và ngắt controller khi unmount component hoặc chuyển trang.',
              ],
            },
          },
        },
      ],
    },
  ],
};
