import { Book } from '../../types';

export const LLM_COMMON_ERRORS_BOOK: Book = {
  id: 'llm-common-errors',
  slug: 'llm-common-errors',
  title: 'LLM Integration Common Errors & Pitfalls',
  subtitle: {
    en: 'Context Overflow, Invalid JSON Parsing & Rate Limit Failures',
    vi: 'Tràn Cửa Sổ Ngữ Cảnh, Lỗi Parse JSON & Xử Lý Rate Limit'
  },
  bookType: 'Common Errors',
  categoryId: 'ai',
  subjectId: 'ai',
  author: '4TM Technical Board',
  role: 'AI Systems Reliability & Production Operations Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-01-22',
  accentColor: 'from-amber-600 to-rose-700',
  tags: [
    'LLM Bugs',
    'Rate Limits',
    'JSON Parsing',
    'Debugging',
    'Common Errors',
    'Exponential Backoff',
    'Production AI'
  ],
  description: {
    en: 'A diagnostic catalog of frequent production LLM application bugs: fatal JSON parsing crashes caused by markdown code backticks and conversational preamble, and cascading HTTP 429 quota failures mitigated by decorrelated Exponential Backoff and Full Jitter.',
    vi: 'Cẩm nang chẩn đoán các lỗi sản xuất phổ biến khi tích hợp LLM: sập ứng dụng khi parse JSON do dính ký tự markdown backtick và lời chào đàm thoại, và lỗi nghẽn tải HTTP 429 được khắc phục bằng Exponential Backoff và Full Jitter.'
  },
  prerequisites: {
    en: [
      'Experience invoking LLM REST APIs or SDKs (OpenAI, Gemini, Anthropic)',
      'Understanding of JSON serialization and standard HTTP status codes (429 Too Many Requests)'
    ],
    vi: [
      'Kinh nghiệm gọi API hoặc SDK của các mô hình LLM (OpenAI, Gemini, Anthropic)',
      'Hiểu biết về chuẩn JSON và các mã trạng thái HTTP tiêu chuẩn (429 Too Many Requests)'
    ]
  },
  outcomes: {
    en: [
      'Sanitize markdown fences and conversational preambles from LLM JSON responses safely',
      'Diagnose and resolve token truncation errors caused by max_output_tokens cutoffs',
      'Implement mathematically decorrelated Exponential Backoff with Full Jitter for HTTP 429 errors',
      'Eliminate thundering herd retry storms across high-concurrency client clusters'
    ],
    vi: [
      'Làm sạch ký tự markdown backtick và lời chào đàm thoại khỏi chuỗi JSON của LLM an toàn',
      'Chẩn đoán và xử lý lỗi cắt cụt token do chạm trần max_output_tokens',
      'Triển khai thuật toán Exponential Backoff kết hợp Full Jitter xử lý lỗi HTTP 429',
      'Triệt tiêu hiện tượng bão thử lại đồng loạt (thundering herd) trên các cụm máy chủ tải cao'
    ]
  },
  chapters: [
    {
      id: 'lce-ch-1',
      number: 1,
      slug: 'json-markdown-stripping-and-overflow',
      title: {
        en: 'Cleaning Markdown Pollution & Context Truncation',
        vi: 'Làm Sạch Ký Tự Markdown Trong JSON & Trượt Cửa Sổ Ngữ Cảnh'
      },
      summary: {
        en: 'Stripping ```json code fences and conversational preamble before JSON.parse, handling truncated output tokens, and defensive parsing.',
        vi: 'Bóc tách khối code ```json và lời chào xã giao trước khi parse JSON, xử lý chuỗi bị cắt cụt do thiếu token và parse phòng vệ.'
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'lce-1-1',
          title: {
            en: '1. Defensive JSON Sanitization & Markdown Fence Stripping',
            vi: '1. Làm Sạch JSON Phòng Vệ & Bóc Tách Ký Tự Markdown Từ LLM'
          },
          content: {
            en: 'Because Large Language Models are predominantly pre-trained on conversational markdown text and chat logs, they compulsively emit conversational greetings (e.g. "Sure! Here is the JSON requested:") and wrap structured outputs in triple backtick code blocks (```json ... ```). Passing this raw response string directly into native `JSON.parse()` or Python `json.loads()` immediately throws a fatal `SyntaxError: Unexpected token` exception, crashing the web server. Furthermore, if the output length approaches the model\'s `max_output_tokens` limit, generation terminates abruptly mid-string, leaving unclosed curly braces or truncated string literals. A robust production integration must never trust raw model output strings directly.',
            vi: 'Do các mô hình LLM được huấn luyện chủ yếu trên kho dữ liệu văn bản markdown đàm thoại, chúng có thói quen tự động chèn thêm lời mở đầu xã giao (ví dụ: "Dưới đây là kết quả JSON của bạn:") và bọc khối dữ liệu trong cặp dấu nháy ngược (```json ... ```). Việc truyền trực tiếp chuỗi thô này vào hàm `JSON.parse()` của Node.js hoặc `json.loads()` của Python sẽ lập tức kích hoạt ngoại lệ nghiêm trọng `SyntaxError: Unexpected token`, làm sập tiến trình máy chủ. Hơn thế nữa, nếu câu trả lời tiến sát trần `max_output_tokens`, quá trình sinh văn bản sẽ bị ngắt đột ngột giữa chừng, làm mất dấu đóng ngoặc nhọn hoặc cụt chuỗi ký tự. Một hệ thống sản xuất chuẩn mực tuyệt đối không bao giờ tin tưởng chuỗi thô từ mô hình.'
          },
          keyIdea: {
            en: 'Never call JSON.parse(rawText) directly on LLM outputs. Extract outermost balanced brackets, strip markdown fences and trailing commas, and provide a typed fallback object to guarantee crash immunity.',
            vi: 'Tuyệt đối không gọi JSON.parse(rawText) trực tiếp trên kết quả của LLM. Hãy trích xuất vùng ngoặc cân bằng ngoài cùng, làm sạch ký tự markdown và dấu phẩy thừa, đồng thời cung cấp fallback có định kiểu để miễn nhiễm lỗi crash.'
          },
          errorDetails: {
            errorSignature: {
              en: 'SyntaxError: Unexpected token \'`\', "```json\\n{\\n..." is not valid JSON',
              vi: 'SyntaxError: Unexpected token \'`\', "```json\\n{\\n..." is not valid JSON'
            },
            symptoms: {
              en: [
                'Backend server crashes on 10% to 25% of LLM API completions with unhandled JSON.parse SyntaxErrors',
                'Response text contains leading markdown backticks (```json) or conversational preamble ("Here is your data:")',
                'Trailing commas or truncated unclosed brackets crash JSON parsers intermittently during high-token responses'
              ],
              vi: [
                'Máy chủ backend bị crash ở 10% đến 25% lượt gọi LLM với lỗi không bắt được ngoại lệ JSON.parse SyntaxError',
                'Chuỗi văn bản trả về dính các ký tự markdown (```json) hoặc lời chào mở đầu ("Dưới đây là kết quả của bạn:")',
                'Dấu phẩy thừa ở cuối hoặc chuỗi bị cắt cụt thiếu dấu đóng ngoặc làm văng lỗi parse khi câu trả lời dài'
              ]
            },
            minimalReproduction: {
              language: 'typescript',
              filename: 'broken_parser.ts',
              code: `// NAIVE REPRODUCTION: Will crash in production!
async function getSentiment(text: string) {
  const response = await llm.complete({
    prompt: \`Analyze sentiment of "\${text}". Return JSON with keys: score, label.\`
  });

  // Model returns: "Here is your JSON:\\n\`\`\`json\\n{\\n  \\"score\\": 0.95,\\n  \\"label\\": \\"POSITIVE\\",\\n}\\n\`\`\`"
  // CRASH! SyntaxError: Unexpected token 'H', "Here is yo"... is not valid JSON
  const parsed = JSON.parse(response.text);
  return parsed;
}`
            },
            whyItHappens: {
              en: 'Autoregressive language models predict tokens based on conversational probability distributions. System instructions like "Output JSON only" are soft behavioral priors, not rigid compiler constraints. The model frequently precedes output with pleasantries or applies markdown formatting learned from technical documentation. When passed to standard JSON parsers that demand strict RFC-8259 syntax starting with `{` or `[`, any leading non-whitespace character triggers an immediate syntax termination.',
              vi: 'Các mô hình ngôn ngữ tự hồi quy sinh token dựa trên phân phối xác suất từ ngữ đàm thoại. Các câu lệnh nhắc như "Chỉ xuất ra JSON thuần" chỉ là chỉ dẫn hành vi mềm chứ không phải bộ ràng buộc cứng như trình biên dịch. Mô hình thường xuyên thêm câu chào xã giao hoặc tự bọc markdown như thói quen học được từ các tài liệu kỹ thuật. Khi chuyển vào bộ parser JSON tiêu chuẩn vốn đòi hỏi cú pháp nghiêm ngặt theo chuẩn RFC-8259 bắt đầu bằng `{` hoặc `[`, bất kỳ ký tự nào đi trước đều kích hoạt lỗi cú pháp ngay lập tức.'
            },
            diagnosisSteps: {
              en: [
                'Log the raw, untruncated completion string received from the LLM provider before invoking any parser.',
                'Check whether the string begins with triple backticks (```) or natural language words like "Sure" or "Here".',
                'Verify whether the response was cut off prematurely by checking if the finish_reason returned by the API is "length" instead of "stop".',
                'Inspect for trailing commas immediately preceding closing curly braces (e.g. `{"key": 1,}`).'
              ],
              vi: [
                'Ghi log chuỗi kết quả thô nhận về từ nhà cung cấp LLM trước khi gọi hàm parse.',
                'Kiểm tra xem chuỗi có bắt đầu bằng dấu nháy ngược (```) hoặc các từ chào hỏi tự nhiên như "Sure" hay "Here" hay không.',
                'Kiểm tra xem câu trả lời có bị cắt cụt giữa chừng do chạm trần token không bằng cách xem thuộc tính finish_reason là "length" thay vì "stop".',
                'Tìm kiếm dấu phẩy thừa nằm ngay trước dấu đóng ngoặc nhọn (ví dụ: `{"key": 1,}`).'
              ]
            },
            correctFix: {
              language: 'typescript',
              filename: 'safeJsonParser.ts',
              code: `/**
 * Production-grade defensive JSON parser for LLM responses.
 * 1. Strips markdown fences (\\\`\\\`\\\`json)
 * 2. Isolates outermost balanced brackets ({...} or [...])
 * 3. Removes trailing commas before closing braces
 * 4. Fallbacks gracefully to default schema on unrecoverable syntax failure
 */
export function safeParseLlmJson<T>(rawText: string, fallback: T): T {
  if (!rawText || typeof rawText !== 'string') {
    return fallback;
  }

  try {
    // Step 1: Strip outer markdown fences
    let text = rawText
      .replace(/^\\s*\`\`\`(?:json)?/im, '')
      .replace(/\`\`\`\\s*$/im, '')
      .trim();

    // Step 2: Locate outermost JSON boundary ({...} or [...])
    const firstBrace = text.search(/[{}\\[]/);
    const lastBrace = Math.max(text.lastIndexOf('}'), text.lastIndexOf(']'));

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      text = text.substring(firstBrace, lastBrace + 1);
    }

    // Step 3: Sanitize trailing commas before closing brackets
    text = text.replace(/,\\s*([}\\]])/g, '$1');

    return JSON.parse(text) as T;
  } catch (error) {
    console.warn('[safeParseLlmJson] Fallback activated due to unparseable response:', error);
    return fallback;
  }
}`
            },
            fixExplanation: {
              en: 'The defensive parsing utility strips code fence identifiers via regular expressions, uses character index boundaries (`search` and `lastIndexOf`) to discard conversational chatter appearing before or after the JSON payload, and removes trailing commas with regex substitution before invoking `JSON.parse`. Wrapping the execution in a try-catch with a mandatory typed fallback parameter guarantees that a malformed LLM response can never crash the production application.',
              vi: 'Hàm tiện ích phân tích phòng vệ bóc tách thẻ code markdown bằng biểu thức chính quy, dùng vị trí chỉ mục ký tự (`search` và `lastIndexOf`) để loại bỏ toàn bộ câu chào mở đầu và bình luận kết thúc, đồng thời xóa dấu phẩy thừa trước khi gọi `JSON.parse`. Việc bọc toàn bộ khối lệnh trong try-catch kèm tham số fallback có định kiểu đảm bảo tuyệt đối rằng một kết quả lỗi từ LLM sẽ không bao giờ làm sập ứng dụng sản xuất.'
            },
            preventionRules: {
              en: [
                'Whenever supported by your LLM provider (e.g. OpenAI Structured Outputs, Gemini responseSchema), enforce JSON Schema mode with strict: true at the API level.',
                'Never pass raw model completion strings directly into native JSON.parse() without boundary isolation and fallback wrapping.',
                'Set max_output_tokens high enough (at least 2x expected response length) to avoid token truncation mid-JSON.'
              ],
              vi: [
                'Bất cứ khi nào nhà cung cấp hỗ trợ (như OpenAI Structured Outputs, Gemini responseSchema), hãy bật chế độ JSON Schema với strict: true ngay từ tầng API.',
                'Tuyệt đối không truyền chuỗi thô của mô hình vào hàm JSON.parse() nguyên bản mà không có lớp lọc ranh giới và fallback bảo vệ.',
                'Đặt trần max_output_tokens đủ lớn (tối thiểu gấp đôi độ dài dự kiến) để không bao giờ bị cắt cụt token giữa chừng.'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'lce-ch-2',
      number: 2,
      slug: 'handling-rate-limits-exponential-backoff',
      title: {
        en: 'Handling HTTP 429 Rate Limits with Exponential Backoff',
        vi: 'Xử Lý Lỗi HTTP 429 Rate Limit Bằng Exponential Backoff'
      },
      summary: {
        en: 'Mitigating HTTP 429 Too Many Requests errors using mathematically decorrelated Exponential Backoff and Full Jitter.',
        vi: 'Xử lý lỗi HTTP 429 Too Many Requests bằng thuật toán giãn cách lũy thừa Exponential Backoff kết hợp Full Jitter.'
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'lce-2-1',
          title: {
            en: '1. HTTP 429 Rate Limiting: Exponential Backoff & Full Jitter Architecture',
            vi: '1. Kiến Trúc Giãn Cách Lũy Thừa & Full Jitter Cho Lỗi HTTP 429'
          },
          content: {
            en: 'Cloud LLM providers enforce stringent multi-tier rate limits: Requests Per Minute (RPM) and Tokens Per Minute (TPM). During concurrent traffic surges, applications frequently receive HTTP 429 (Too Many Requests) error statuses. When novice developers encounter this, they often implement naive retry loops with fixed sleep intervals (e.g. `sleep(1000)`). In a distributed or multi-threaded environment, dozens of client threads receive 429 errors simultaneously; sleep for the identical fixed 1000ms duration, and then retry simultaneously in lockstep. This phenomenon—known as the "Thundering Herd" problem or Retry Storm—hammers the API provider repeatedly at synchronized intervals, keeping the bucket quota exhausted and locking the application in an endless failure cascade. The mathematically proven solution is Exponential Backoff with Full Jitter: $T_{sleep} = \\text{random}(0, \\min(T_{max}, T_{base} \\times 2^{attempt}))$.',
            vi: 'Các nhà cung cấp LLM đám mây áp đặt các hạn mức rate limit đa tầng rất nghiêm ngặt: Số yêu cầu mỗi phút (RPM - Requests Per Minute) và Số token mỗi phút (TPM - Tokens Per Minute). Khi có nhiều người dùng cùng truy cập, ứng dụng sẽ liên tục nhận mã lỗi HTTP 429 (Too Many Requests). Khi gặp lỗi này, lập trình viên thường viết vòng lặp thử lại với khoảng nghỉ cố định (ví dụ: `sleep(1000)`). Trong môi trường phân tán hoặc đa luồng, hàng chục tiến trình gặp lỗi 429 cùng lúc, cùng đi ngủ đúng 1000ms, và sau đó đồng loạt thử lại cùng một tích tắc. Hiện tượng này—được gọi là "Bão thử lại đồng loạt" (Thundering Herd / Retry Storm)—sẽ liên tục dội bom máy chủ API theo các chu kỳ đồng bộ, khiến hạn mức quota không thể hồi phục và giam cầm ứng dụng trong vòng lặp lỗi bất tận. Giải pháp chuẩn toán học đã được kiểm chứng là Exponential Backoff kết hợp Full Jitter: $T_{sleep} = \\text{random}(0, \\min(T_{max}, T_{base} \\times 2^{attempt}))$.'
          },
          keyIdea: {
            en: 'Never retry HTTP 429 errors with fixed sleep intervals. Use Exponential Backoff with Full Jitter to scatter retry spikes evenly across time, desynchronizing concurrent clients and quenching retry storms.',
            vi: 'Tuyệt đối không thử lại lỗi HTTP 429 bằng khoảng thời gian ngủ cố định. Hãy dùng Exponential Backoff kết hợp Full Jitter để rải đều các lần thử lại trên trục thời gian, triệt tiêu bão thử lại đồng loạt.'
          },
          errorDetails: {
            errorSignature: {
              en: 'HTTP 429 Too Many Requests: RateLimitError: Requests-per-minute (RPM) or Tokens-per-minute (TPM) quota exceeded',
              vi: 'HTTP 429 Too Many Requests: RateLimitError: Requests-per-minute (RPM) hoặc Tokens-per-minute (TPM) quota exceeded'
            },
            symptoms: {
              en: [
                'API calls fail en masse during sudden traffic spikes or batch jobs with HTTP 429 Too Many Requests',
                'Server logs show periodic waves of simultaneous failed retries appearing at exactly 1-second or 2-second intervals',
                'API rate limit lockouts persist long after initial traffic surge has subsided due to client retry storms'
              ],
              vi: [
                'Các lượt gọi API sập hàng loạt khi có đột biến lưu lượng hoặc chạy batch job với lỗi HTTP 429',
                'Log máy chủ hiển thị các đợt sóng thử lại thất bại xuất hiện đồng loạt đều đặn đúng mỗi 1 giây hoặc 2 giây',
                'Tình trạng khóa rate limit kéo dài rất lâu sau khi đợt tăng tải ban đầu đã kết thúc do chính các client dội bão thử lại'
              ]
            },
            minimalReproduction: {
              language: 'typescript',
              filename: 'thundering_herd_retry.ts',
              code: `// ANTI-PATTERN: Fixed interval retry creates thundering herd storms!
async function naiveRetry(fn: () => Promise<any>, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.status === 429 && attempt < maxRetries - 1) {
        // DISASTROUS: 100 concurrent workers all sleep exactly 1000ms,
        // then all 100 hit the API simultaneously again at t = 1000ms!
        await new Promise(res => setTimeout(res, 1000));
        continue;
      }
      throw err;
    }
  }
}`
            },
            whyItHappens: {
              en: 'Rate limit algorithms (Token Bucket and Leaky Bucket) refill tokens continuously at a constant rate. When multiple concurrent clients exhaust the bucket, attempting retries at synchronized fixed delays guarantees that all clients re-request tokens at the exact same millisecond before the bucket has accumulated sufficient tokens. This causes immediate re-exhaustion, trapping the system in a self-reinforcing outage.',
              vi: 'Các thuật toán giới hạn tần suất (như Token Bucket và Leaky Bucket) bơm lại token với tốc độ không đổi. Khi nhiều client đồng thời làm cạn bucket, việc thử lại theo các khoảng thời gian cố định đồng bộ đảm bảo rằng tất cả client sẽ cùng đòi token tại đúng một thời điểm trước khi bucket kịp nạp đủ. Điều này dẫn đến việc bucket lập tức bị cạn kiệt tiếp, đẩy toàn bộ hệ thống vào trạng thái nghẽn kéo dài.'
            },
            diagnosisSteps: {
              en: [
                'Examine the HTTP response headers: inspect `retry-after`, `x-ratelimit-remaining-tokens`, and `x-ratelimit-reset-requests`.',
                'Determine whether the failure is an RPM bottleneck (too many requests) or a TPM bottleneck (prompt payload too large).',
                'Audit client retry logic in codebase to verify if sleep intervals include randomized jitter or use naive static delays.'
              ],
              vi: [
                'Kiểm tra các HTTP response header: đọc kỹ `retry-after`, `x-ratelimit-remaining-tokens` và `x-ratelimit-reset-requests`.',
                'Xác định xem nguyên nhân nghẽn là do RPM (quá nhiều lượt gọi) hay do TPM (kích thước prompt gửi lên quá lớn).',
                'Rà soát mã nguồn client để kiểm tra xem khoảng thời gian chờ có chứa độ trễ ngẫu nhiên (jitter) hay đang dùng thời gian cố định.'
              ]
            },
            correctFix: {
              language: 'typescript',
              filename: 'exponentialBackoffWithJitter.ts',
              code: `/**
 * Robust HTTP 429 retry executor using Exponential Backoff with Full Jitter.
 * Jitter Formula: sleepMs = Math.random() * Math.min(maxBackoffMs, baseBackoffMs * (2 ** attempt))
 */
export async function fetchWithBackoffAndJitter<T>(
  apiCall: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseBackoffMs?: number;
    maxBackoffMs?: number;
  } = {}
): Promise<T> {
  const { maxRetries = 5, baseBackoffMs = 500, maxBackoffMs = 16000 } = options;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error: any) {
      const isRateLimit = error?.status === 429 || error?.message?.includes('429');
      const isTransient = error?.status >= 500 && error?.status <= 504;

      if ((isRateLimit || isTransient) && attempt < maxRetries) {
        // 1. Check for explicit Retry-After header from server
        let sleepMs: number;
        const retryAfterHeader = error?.headers?.get?.('retry-after');

        if (retryAfterHeader) {
          const seconds = parseInt(retryAfterHeader, 10);
          sleepMs = isNaN(seconds) ? baseBackoffMs : seconds * 1000;
          // Add small jitter to avoid synchronized wakeups
          sleepMs += Math.random() * 500;
        } else {
          // 2. Full Jitter: random value between 0 and 2^attempt * baseBackoffMs
          const exponentialCap = Math.min(maxBackoffMs, baseBackoffMs * Math.pow(2, attempt));
          sleepMs = Math.random() * exponentialCap;
        }

        console.warn(
          \`[Retry] Attempt \${attempt + 1}/\${maxRetries} failed with \${error?.status || 'network error'}. \` +
          \`Backing off for \${Math.round(sleepMs)}ms...\`
        );

        await new Promise(resolve => setTimeout(resolve, sleepMs));
        continue;
      }

      throw error;
    }
  }

  throw new Error('Exceeded maximum retry attempts');
}`
            },
            fixExplanation: {
              en: 'Full Jitter randomly spreads retry attempts uniformly across the entire interval from $0$ up to the exponential cap $2^{attempt} \\times T_{base}$. By scattering the wake-up times of concurrent requests across a broad window, the aggregate arrival rate at the provider transforms from sharp synchronized impulses into a smooth, manageable poisson distribution, allowing the rate-limit token bucket to replenish smoothly.',
              vi: 'Thuật toán Full Jitter rải ngẫu nhiên các lần thử lại trên toàn bộ dải thời gian từ $0$ đến trần lũy thừa $2^{attempt} \\times T_{base}$. Bằng cách phân tán thời điểm thức dậy của các request đồng thời trên một khoảng thời gian rộng, lưu lượng gửi đến nhà cung cấp API sẽ chuyển từ các đợt xung kích nhọn đồng bộ thành một phân phối dòng chảy mượt mà, tạo điều kiện cho bucket token hồi phục ổn định.'
            },
            preventionRules: {
              en: [
                'Always apply Exponential Backoff with Full Jitter on all external AI API network calls.',
                'Prioritize the Retry-After HTTP response header when emitted by the LLM provider.',
                'Implement client-side token bucket rate limiters to queue and pace requests locally before sending them across the network.',
                'Separate high-throughput background batch jobs from interactive user chat traffic to prevent internal quota starvation.'
              ],
              vi: [
                'Luôn áp dụng Exponential Backoff kết hợp Full Jitter cho tất cả các lượt gọi API AI bên ngoài.',
                'Ưu tiên tuân thủ giá trị header Retry-After khi được trả về từ máy chủ LLM.',
                'Triển khai bộ điều tiết Token Bucket ngay ở tầng client để xếp hàng và kiểm soát tốc độ trước khi bắn request qua mạng.',
                'Tách riêng các batch job chạy nền khối lượng lớn khỏi luồng chat tương tác của người dùng để tránh nghẽn quota chéo.'
              ]
            }
          }
        }
      ]
    }
  ]
};
