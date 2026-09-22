import { Book } from '../../types';

export const JAVASCRIPT_COMMON_ERRORS_BOOK: Book = {
  id: 'javascript-common-errors',
  slug: 'javascript-common-errors',
  title: 'JavaScript Common Errors & Async Pitfalls',
  subtitle: {
    en: 'Diagnostic Blueprints for Uncaught TypeErrors, Silent Coercion & Unhandled Promise Rejections',
    vi: 'Cẩm Nang Chẩn Đoán Lỗi Uncaught TypeError, Ép Kiểu Ngầm Định & Unhandled Promise Rejection',
  },
  bookType: 'Common Errors',
  categoryId: 'javascript',
  subjectId: 'programming',
  author: '4TM Technical Board',
  role: 'Core Language & Web Architecture Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '26 mins',
  chaptersCount: 2,
  publishedDate: '2025-01-22',
  accentColor: 'from-amber-600 to-rose-700',
  tags: ['Debugging', 'TypeError', 'Async Pitfalls', 'Common Errors', 'JavaScript', 'Production'],
  description: {
    en: 'Diagnostic reference and systematic remediation blueprints for the most frequent runtime crashes in modern JavaScript: Cannot read properties of undefined, implicit type coercion bugs, IEEE 754 precision drift, and unhandled promise rejections.',
    vi: 'Cẩm nang chẩn đoán và quy trình khắc phục bài bản các lỗi sập runtime phổ biến nhất trong JavaScript hiện đại: Cannot read properties of undefined, ép kiểu ngầm định, sai số số thực IEEE 754 và Unhandled Promise Rejection.',
  },
  prerequisites: {
    en: [
      'Basic JavaScript syntax and execution model',
      'Experience reading browser console error stack traces',
    ],
    vi: [
      'Hiểu biết cú pháp cơ bản và mô hình thực thi của JavaScript',
      'Kinh nghiệm đọc vết ngăn xếp (stack trace) trên console trình duyệt',
    ],
  },
  outcomes: {
    en: [
      'Diagnose and remediate "Cannot read properties of undefined" using safe navigation patterns',
      'Distinguish Nullish Coalescing (??) from Logical OR (||) to prevent falsy value truncation',
      'Neutralize IEEE 754 floating-point arithmetic rounding errors in monetary calculations',
      'Capture and structure asynchronous error chains to eliminate unhandled promise rejections',
    ],
    vi: [
      'Chẩn đoán và khắc phục triệt để lỗi "Cannot read properties of undefined" bằng cú pháp an toàn',
      'Phân biệt rõ ràng toán tử Nullish Coalescing (??) và Logical OR (||) để tránh mất giá trị falsy hợp lệ',
      'Khắc phục sai số tính toán số thực IEEE 754 trong các bài toán tiền tệ và tài chính',
      'Bắt trọn chuỗi lỗi bất đồng bộ để xóa bỏ hoàn toàn cảnh báo unhandled promise rejection',
    ],
  },
  chapters: [
    // Chapter 1: Undefined Property Access & Nullish Navigation Pitfalls
    {
      id: 'jce-ch-1',
      number: 1,
      slug: 'cannot-read-property-undefined',
      title: {
        en: 'Properties of Undefined & Safe Nullish Navigation',
        vi: 'Lỗi Đọc Thuộc Tính Của Undefined & Điều Hướng Nullish An Toàn',
      },
      summary: {
        en: 'Root causes, diagnosis, and modern fixes for TypeError: Cannot read properties of undefined (reading "x") and falsy value overwrites with Logical OR.',
        vi: 'Nguyên nhân gốc rễ, chẩn đoán và cách khắc phục lỗi TypeError: Cannot read properties of undefined cùng lỗi mất dữ liệu với toán tử ||.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'jce-1-1',
          title: {
            en: 'TypeError: Cannot read properties of undefined (reading "x")',
            vi: 'TypeError: Cannot read properties of undefined (reading "x")',
          },
          keyIdea: {
            en: 'Attempting to evaluate a member expression or method call on null or undefined triggers an immediate unrecoverable TypeError; modern Optional Chaining (?.) and Nullish Coalescing (??) provide declarative guards.',
            vi: 'Thực hiện truy xuất thuộc tính hoặc gọi hàm trên giá trị null hoặc undefined sẽ kích hoạt lỗi TypeError; cú pháp Optional Chaining (?.) và Nullish Coalescing (??) hiện đại là giải pháp phòng vệ chuẩn mực.',
          },
          errorDetails: {
            errorSignature: {
              en: 'TypeError: Cannot read properties of undefined (reading "x") / TypeError: Cannot read properties of null (reading "x")',
              vi: 'TypeError: Cannot read properties of undefined (reading "x") / TypeError: Cannot read properties of null (reading "x")',
            },
            symptoms: {
              en: [
                'Entire UI view or React component tree crashes and disappears into a white screen.',
                'Uncaught TypeError logged in browser console terminating downstream script execution.',
                'Occurs intermittently depending on network latency or incomplete API payloads.',
              ],
              vi: [
                'Toàn bộ giao diện màn hình hoặc cây component React bị sập thành màn hình trắng.',
                'Lỗi Uncaught TypeError xuất hiện trên console làm dừng toàn bộ mã kịch bản phía sau.',
                'Lỗi xuất hiện chập chờn tùy thuộc vào độ trễ mạng hoặc dữ liệu API trả về chưa đầy đủ.',
              ],
            },
            minimalReproduction: {
              language: 'javascript',
              filename: 'reproduction_undefined.js',
              explanation: {
                en: 'Accessing nested object properties before API response resolves or when optional fields are nullish.',
                vi: 'Truy cập thuộc tính lồng nhau trước khi API trả về hoặc khi trường tùy chọn có giá trị nullish.',
              },
              code: `// Simulating API payload missing address object
const userProfile = {
  id: 42,
  name: 'Alex'
  // address is undefined!
};

// CRASH: TypeError: Cannot read properties of undefined (reading 'city')
const city = userProfile.address.city;
console.log('User city:', city);`,
            },
            whyItHappens: {
              en: 'In JavaScript\'s type system, `undefined` and `null` have no object wrapper prototype. When the engine executes a property lookup (`obj.prop`), it evaluates the left-hand operand (`obj`). If the left-hand operand evaluates to `undefined` or `null`, the internal GetValue operation (§13.2.3.1) throws a TypeError because primitive nullish values cannot possess properties.',
              vi: 'Trong hệ thống kiểu của JavaScript, `undefined` và `null` không có prototype bao bọc. Khi engine thực hiện tra cứu thuộc tính (`obj.prop`), nó đánh giá toán hạng bên trái (`obj`). Nếu toán hạng này là `undefined` hoặc `null`, thao tác nội bộ GetValue (§13.2.3.1) lập tức ném TypeError vì giá trị nullish không thể chứa bất kỳ thuộc tính nào.',
            },
            diagnosisSteps: {
              en: [
                'Inspect the stack trace line number to identify the exact chained property access expression.',
                'Log or debug the left-hand identifier preceding the dot (`.`) to verify if it is null, undefined, or an empty object.',
                'Check if data is being read synchronously before an asynchronous state update (e.g. React initial render before useEffect).',
                'Verify whether the backend API schema guarantees the existence of nested objects.',
              ],
              vi: [
                'Kiểm tra số dòng trong stack trace để xác định chính xác biểu thức truy cập chuỗi thuộc tính.',
                'In ra hoặc đặt breakpoint kiểm tra biến đứng trước dấu chấm (`.`) xem nó là null, undefined hay object rỗng.',
                'Kiểm tra xem dữ liệu có bị đọc đồng bộ trước khi state bất đồng bộ nạp xong không (vd component render lần đầu).',
                'Xác minh xem schema của API phía backend có cam kết luôn trả về đối tượng lồng nhau hay không.',
              ],
            },
            correctFix: {
              language: 'javascript',
              filename: 'safe_navigation_fix.js',
              explanation: {
                en: 'Combine Optional Chaining (?.) for safe traversal with Nullish Coalescing (??) for reliable defaults.',
                vi: 'Kết hợp Optional Chaining (?.) để duyệt an toàn và Nullish Coalescing (??) để gán giá trị mặc định chuẩn xác.',
              },
              code: `const userProfile = {
  id: 42,
  name: 'Alex',
  unreadMessagesCount: 0 // Notice 0 is a valid number!
};

// 1. SAFE NAVIGATION: Returns undefined without throwing error
const city = userProfile.address?.city ?? 'Unknown City';
console.log('User city:', city); // "Unknown City"

// 2. SAFE DEFAULT: ?? correctly preserves 0 (unlike || which treats 0 as false!)
const messagesBuggy = userProfile.unreadMessagesCount || 10; // BUG: 10!
const messagesCorrect = userProfile.unreadMessagesCount ?? 10; // CORRECT: 0

console.log('Unread:', messagesCorrect); // 0`,
            },
            fixExplanation: {
              en: 'Optional Chaining (`?.`) short-circuits the evaluation and immediately returns `undefined` if the operand is nullish, preventing the TypeError. Pairing it with Nullish Coalescing (`??`) provides a fallback default strictly when the evaluated value is `null` or `undefined`, unlike Logical OR (`||`) which erroneously overwrites valid `0`, `""`, or `false` values.',
              vi: 'Toán tử Optional Chaining (`?.`) ngắt ngắn mạch và trả về ngay `undefined` nếu toán hạng là nullish, ngăn ngừa lỗi TypeError. Kết hợp cùng Nullish Coalescing (`??`) giúp đặt giá trị mặc định chỉ khi giá trị thực tế là `null` hoặc `undefined`, không bị lỗi đè mất các giá trị hợp lệ như `0`, chuỗi rỗng `""` hay `false` như toán tử `||`.',
            },
            preventionRules: {
              en: [
                'Always use Optional Chaining (?.) when traversing nested objects loaded asynchronously from APIs.',
                'Use Nullish Coalescing (??) instead of Logical OR (||) when providing defaults for numeric or boolean fields.',
                'Initialize UI component state with defensive default structures (e.g. `useState({ address: {} })`).',
                'Enable TypeScript strict null checks (`"strict": true`) to catch potential nullish accesses at compile time.',
              ],
              vi: [
                'Luôn sử dụng Optional Chaining (?.) khi truy xuất các đối tượng lồng nhau nạp bất đồng bộ từ API.',
                'Dùng Nullish Coalescing (??) thay cho Logical OR (||) khi gán giá trị mặc định cho các trường số hoặc boolean.',
                'Khởi tạo state component UI với cấu trúc phòng vệ mặc định (ví dụ `useState({ address: {} })`).',
                'Bật kiểm tra strict null trong TypeScript (`"strict": true`) để bắt lỗi ngay trong quá trình biên dịch.',
              ],
            },
          },
        },
      ],
    },

    // Chapter 2: Unhandled Promise Rejections & Floating-Point Drift
    {
      id: 'jce-ch-2',
      number: 2,
      slug: 'floating-point-coercion-gotchas',
      title: {
        en: 'Unhandled Promise Rejections & IEEE 754 Precision Drift',
        vi: 'Unhandled Promise Rejection & Sai Số Làm Tròn IEEE 754',
      },
      summary: {
        en: 'Diagnosing unhandled asynchronous promise rejections and preventing catastrophic floating-point rounding errors in financial and numeric calculations.',
        vi: 'Chẩn đoán lỗi Unhandled Promise Rejection và phòng ngừa sai số làm tròn số thực IEEE 754 trong các phép toán tài chính.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'jce-2-1',
          title: {
            en: 'UnhandledPromiseRejection & IEEE 754 Numeric Precision Drift',
            vi: 'UnhandledPromiseRejection & Sai Số Tính Toán Số Thực IEEE 754',
          },
          keyIdea: {
            en: 'Uncaught Promise rejections crash modern Node.js processes; binary floating-point representations cannot accurately express base-10 decimals, mandating integer-cent storage.',
            vi: 'Promise bị reject không bắt lỗi sẽ làm sập hoàn toàn tiến trình Node.js hiện đại; biểu diễn số thực nhị phân không thể biểu diễn chính xác số thập phân cơ số 10, bắt buộc phải lưu trữ tiền tệ dưới dạng số nguyên xu.',
          },
          errorDetails: {
            errorSignature: {
              en: 'UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().',
              vi: 'UnhandledPromiseRejection: Lỗi phát sinh do ném ngoại lệ trong hàm async thiếu try/catch, hoặc một promise bị reject mà không có bộ xử lý .catch().',
            },
            symptoms: {
              en: [
                'Node.js server process crashes abruptly with non-zero exit code 1.',
                '0.1 + 0.2 produces 0.30000000000000004 in checkout totals, leading to balance verification failures.',
                'Database records store corrupted micro-fractional currencies (e.g. $19.990000000000002).',
              ],
              vi: [
                'Tiến trình máy chủ Node.js bị dừng đột ngột với mã thoát exit code 1.',
                'Phép tính 0.1 + 0.2 ra kết quả 0.30000000000000004 trong giỏ hàng khiến đối soát số dư thất bại.',
                'Cơ sở dữ liệu lưu các giá trị tiền tệ bị lệch phần thập phân vi mô (vd $19.990000000000002).',
              ],
            },
            minimalReproduction: {
              language: 'javascript',
              filename: 'reproduction_async_and_float.js',
              explanation: {
                en: 'Floating point rounding drift and unhandled rejection in un-awaited asynchronous loops.',
                vi: 'Lệch sai số số thực và unhandled rejection trong vòng lặp bất đồng bộ không có await.',
              },
              code: `// 1. IEEE 754 Precision Drift
const priceA = 0.1;
const priceB = 0.2;
const total = priceA + priceB;
console.log(total); // 0.30000000000000004
console.log(total === 0.3); // FALSE! Checkout validation fails!

// 2. Unhandled Promise Rejection (Node.js Crash)
async function fetchAccountData() {
  throw new Error('Database connection severed');
}

// CRASH: Calling async without await or .catch() in top-level code
fetchAccountData();`,
            },
            whyItHappens: {
              en: 'JavaScript numbers are implemented strictly as 64-bit double precision binary floating point values per IEEE 754. Decimals like 0.1 and 0.2 cannot be expressed precisely in finite binary fractions, leading to microscopic bit truncation. For asynchronous functions, ES2018+ specifications dictate that unhandled rejected promises must notify host environments, which terminate Node.js runtime processes to prevent corrupted state from propagating.',
              vi: 'Các số trong JavaScript được biểu diễn theo chuẩn số thực nhị phân 64-bit IEEE 754. Các số thập phân như 0.1 và 0.2 không thể biểu diễn chính xác dưới dạng phân số nhị phân hữu hạn, dẫn đến việc bị cắt bớt bit ở đuôi. Đối với các hàm bất đồng bộ, đặc tả từ ES2018 quy định mọi promise bị reject mà không có bộ xử lý lỗi đều kích hoạt cảnh báo, và Node.js sẽ chủ động dừng tiến trình để ngăn chặn dữ liệu hỏng lây lan.',
            },
            diagnosisSteps: {
              en: [
                'Search codebase for `async` calls or `.then()` promises lacking corresponding `await` or `.catch()` handlers.',
                'Inspect financial calculations to detect operations executing floating-point division or multiplication on raw currency values.',
                'Audit Node.js log streams for `unhandledRejection` lifecycle events.',
              ],
              vi: [
                'Tìm kiếm trong mã nguồn các lệnh gọi hàm `async` hoặc `.then()` mà thiếu từ khóa `await` hoặc hàm `.catch()`.',
                'Kiểm tra các phép tính tài chính xem có đang nhân chia số thực trực tiếp trên tiền tệ hay không.',
                'Kiểm tra nhật ký log của Node.js để tìm các sự kiện vòng đời `unhandledRejection`.',
              ],
            },
            correctFix: {
              language: 'javascript',
              filename: 'remediation_async_and_cents.js',
              explanation: {
                en: 'Store monetary balances in integer cents and wrap all asynchronous boundaries in comprehensive try/catch blocks.',
                vi: 'Lưu trữ số dư tiền tệ dưới dạng số nguyên xu (cents) và bọc mọi ranh giới bất đồng bộ trong try/catch.',
              },
              code: `// 1. REMEDIATION: Store and compute money strictly in integer cents!
const priceACents = 10; // $0.10
const priceBCents = 20; // $0.20
const totalCents = priceACents + priceBCents; // 30 cents exactly ($0.30)
console.log(totalCents === 30); // TRUE! Exact mathematical precision!

function formatCurrency(cents) {
  return (cents / 100).toFixed(2);
}
console.log('Formatted total: $' + formatCurrency(totalCents)); // "$0.30"

// 2. REMEDIATION: Structured Asynchronous Error Boundary
async function safeExecuteAccountSync() {
  try {
    await fetchAccountData();
  } catch (err) {
    console.error('Handled expected network failure:', err.message);
    // Graceful recovery or retry logic here
  }
}

safeExecuteAccountSync();`,
            },
            fixExplanation: {
              en: 'Integer operations up to $2^{53} - 1$ (`Number.MAX_SAFE_INTEGER`) are mathematically exact in JavaScript without floating point rounding error. Storing currency as integer cents completely eliminates IEEE 754 drift. Ensuring every asynchronous execution boundary has a localized `try/catch` or `.catch()` prevents unhandled rejection crashes.',
              vi: 'Các phép toán số nguyên lên tới $2^{53} - 1$ (`Number.MAX_SAFE_INTEGER`) luôn đạt độ chính xác tuyệt đối trong JavaScript. Việc lưu trữ tiền tệ dưới dạng số nguyên xu loại bỏ 100% hiện tượng sai số IEEE 754. Đồng thời, việc đảm bảo mọi ranh giới bất đồng bộ đều có `try/catch` hoặc `.catch()` giúp ngăn ngừa hoàn toàn các sự cố sập máy chủ.',
            },
            preventionRules: {
              en: [
                'Always store monetary currencies in smallest integer denominations (cents, pence, satoshis) or use dedicated libraries like Decimal.js.',
                'Never invoke an async function in "fire-and-forget" fashion without attaching a `.catch()` logger.',
                'Register global process error handlers (`process.on("unhandledRejection")`) as an emergency last-resort logging boundary.',
                'Use eslint-plugin-promise rules (e.g. `promise/catch-or-return`) to catch unhandled promises in CI/CD.',
              ],
              vi: [
                'Luôn lưu trữ tiền tệ dưới đơn vị nguyên nhỏ nhất (xu, cents, pence) hoặc dùng thư viện chuyên dụng như Decimal.js.',
                'Tuyệt đối không gọi hàm async theo kiểu "bỏ mặc" (fire-and-forget) mà không gắn kèm bộ ghi log `.catch()`.',
                'Đăng ký bộ lắng nghe sự kiện khẩn cấp toàn cục (`process.on("unhandledRejection")`) để ghi log khi có ngoại lệ lọt lưới.',
                'Cài đặt các quy tắc lint như `promise/catch-or-return` để tự động phát hiện promise chưa bắt lỗi trong CI/CD.',
              ],
            },
          },
        },
      ],
    },
  ],
};
