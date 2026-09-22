import { Book } from '../../types';

export const GEMINI_API_RECIPES_BOOK: Book = {
  id: 'gemini-api-recipes',
  slug: 'gemini-api-recipes',
  title: 'Google Gemini API Integration Recipes',
  subtitle: {
    en: 'Gemini 1.5 Pro/Flash, Multimodal Processing, System Instructions & Function Calling',
    vi: 'Công Thức Tích Hợp Gemini 1.5 Pro/Flash, Đa Phương Tiện Multimodal & Function Calling',
  },
  bookType: 'Patterns / Recipes',
  categoryId: 'ai',
  subjectId: 'ai',
  author: '4TM Technical Board',
  role: 'Cloud Native & Gemini Systems Architecture Group',
  level: 'Intermediate to Advanced',
  estimatedReadTime: '30 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-08',
  accentColor: 'from-blue-600 to-indigo-950',
  tags: ['Gemini API', 'Multimodal', 'Streaming', 'Structured JSON', 'SDK', 'Patterns / Recipes'],
  description: {
    en: 'Production-tested architectural recipes and patterns for integrating the Google Gen AI SDK (@google/genai): safe lazy initialization to prevent container boot crashes, strict server-side API key proxying, multimodal inlineData buffer streaming, and constrained decoding with responseSchema.',
    vi: 'Các công thức và mẫu kiến trúc chuẩn sản xuất khi tích hợp Google Gen AI SDK (@google/genai): khởi tạo lazy an toàn chống sập container lúc khởi động, proxy API key bảo mật phía server, xử lý đa phương tiện buffer inlineData và ép ngữ pháp giải mã với responseSchema.',
  },
  prerequisites: {
    en: [
      'Full-stack TypeScript and Node.js backend proficiency (Express or similar server runtimes)',
      'Understanding of client-server security boundaries and environment variable lifecycles',
    ],
    vi: [
      'Thành thạo TypeScript full-stack và backend Node.js (Express hoặc runtime server tương đương)',
      'Hiểu biết về ranh giới bảo mật client-server và vòng đời của các biến môi trường',
    ],
  },
  outcomes: {
    en: [
      'Implement fail-safe lazy SDK initialization preventing container cold-start crashes',
      'Process high-throughput multimodal inputs (images, audio, PDFs) via base64 inlineData buffers',
      'Deliver sub-200ms initial response feedback using generateContentStream and Server-Sent Events',
      'Guarantee 100% deterministic JSON outputs via native responseSchema constrained logit decoding',
    ],
    vi: [
      'Hiện thực khởi tạo lazy SDK an toàn triệt tiêu nguy cơ sập container khi khởi động',
      'Xử lý dữ liệu đa phương tiện thông lượng cao (ảnh, âm thanh, tệp PDF) qua buffer base64 inlineData',
      'Đem lại trải nghiệm phản hồi dưới 200ms bằng kỹ thuật stream token với generateContentStream',
      'Đảm bảo dữ liệu JSON đầu ra chuẩn xác 100% bằng cơ chế constrained logit decoding với responseSchema',
    ],
  },
  chapters: [
    {
      id: 'gar-ch-1',
      number: 1,
      slug: 'sdk-initialization-and-multimodal-generation',
      title: {
        en: 'Server-Side SDK Setup & Multimodal Processing',
        vi: 'Khởi Tạo SDK Server-Side & Xử Lý Đa Phương Tiện Multimodal',
      },
      summary: {
        en: 'Lazy SDK initialization, environment secret protection, and passing image/audio/PDF inlineData buffers.',
        vi: 'Khởi tạo lazy SDK, bảo mật biến môi trường và xử lý buffer đa phương tiện inlineData (ảnh/âm thanh/PDF).',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'gar-1-1',
          title: {
            en: 'Lazy SDK Initialization & Secure Multimodal Media Handling',
            vi: 'Khởi Tạo Lazy SDK & Xử Lý Dữ Liệu Đa Phương Tiện Multimodal An Toàn',
          },
          content: {
            en: 'Two catastrophic pitfalls plague modern AI application deployments: (1) **Top-Level SDK Instantiation Crashes**, where developers write `const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })` at the top level of their backend files. During container build time or cold-boot autoscaling, if environment variables are injected asynchronously or delayed by a secrets manager, the entire Node.js runtime throws an unhandled error and crashes the container before health checks can pass; and (2) **API Key Exposure Vulnerabilities**, where secret keys are mistakenly bundled into client-side code via `VITE_` prefixes or client-side SDK calls. Production architecture demands a **Lazy Singleton Pattern**: the SDK client is initialized inside a getter function that executes only when an actual API route is invoked, verifying the secret key dynamically. When passing multimodal files (such as images, audio snippets, or PDF documents under 20MB), backend servers ingest user uploads, validate MIME types, and serialize the binary buffer into standard `inlineData` objects containing base64 payloads.',
            vi: 'Hai cạm bẫy kỹ thuật nghiêm trọng thường gặp khi triển khai ứng dụng AI gồm: (1) **Sập Ứng Dụng Do Khởi Tạo SDK Ở Đầu File (Top-Level Instantiation)**, khi lập trình viên khai báo `const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })` ngay tại dòng đầu tiên của file backend. Trong quá trình build container hoặc khi các pod tự động mở rộng (autoscaling), nếu biến môi trường được nạp trễ bởi hệ thống quản lý bí mật, toàn bộ tiến trình Node.js sẽ ném ngoại lệ và làm sập container trước cả khi kịp phản hồi health check; và (2) **Lộ Khóa API Ra Phía Trình Duyệt**, khi lập trình viên vô tình đặt tiền tố `VITE_` hoặc gọi trực tiếp SDK từ frontend. Kiến trúc chuẩn sản xuất bắt buộc phải áp dụng **Mẫu Thiết Kế Lazy Singleton**: SDK chỉ được khởi tạo bên trong một hàm getter khi có một route API thực sự được gọi, kiểm tra tính hợp lệ của khóa bí mật tại thời điểm chạy. Khi xử lý tệp đa phương tiện (ảnh, âm thanh, PDF dung lượng dưới 20MB), server backend tiếp nhận tệp tải lên, xác thực mã MIME và đóng gói buffer nhị phân thành cấu trúc `inlineData` chứa chuỗi base64 an toàn.',
          },
          keyIdea: {
            en: 'Never instantiate the Gemini SDK at the top level of files. Use a lazy getter function that validates process.env.GEMINI_API_KEY on demand, and proxy all multimodal operations server-side.',
            vi: 'Tuyệt đối không khởi tạo Gemini SDK ở dòng đầu tiên của file. Hãy dùng hàm getter lazy kiểm tra process.env.GEMINI_API_KEY khi có yêu cầu gọi đến, và luôn proxy mọi tác vụ đa phương tiện qua server backend.',
          },
          patternDetails: {
            problem: {
              en: 'Top-level SDK client instantiation causes container cold-start crashes when environment secrets load asynchronously, and placing API keys in frontend code compromises corporate credentials.',
              vi: 'Khởi tạo SDK ở đầu file khiến container bị sập khi khởi động nếu biến môi trường nạp bất đồng bộ, đồng thời việc để lộ API key ở frontend vi phạm nghiêm trọng an ninh thông tin.',
            },
            context: {
              en: 'Enterprise full-stack applications requiring robust multimodal analysis of user receipts, PDF contracts, voice memos, and images.',
              vi: 'Ứng dụng full-stack doanh nghiệp yêu cầu phân tích đa phương tiện mạnh mẽ đối với hóa đơn người dùng, hợp đồng PDF, ghi âm giọng nói và hình ảnh.',
            },
            solutionOverview: {
              en: 'Encapsulate SDK initialization inside a lazy singleton function `getGemini()`. Expose server-side API endpoints (`/api/*`) that accept file uploads, validate MIME types, package binary data as base64 `inlineData` payloads, and invoke `ai.models.generateContent` securely behind server firewalls.',
              vi: 'Bọc việc khởi tạo SDK trong hàm lazy singleton `getGemini()`. Cung cấp các endpoint server (`/api/*`) tiếp nhận tệp tải lên, kiểm tra định dạng MIME, đóng gói dữ liệu nhị phân thành base64 `inlineData` và gọi `ai.models.generateContent` an toàn phía sau tường lửa server.',
            },
            architectureDiagram: {
              title: {
                en: 'Secure Server-Side Lazy Gemini Multimodal Architecture',
                vi: 'Kiến Trúc Xử Lý Đa Phương Tiện Lazy Gemini An Toàn Phía Server',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Client Media Upload', vi: 'Trình Duyệt Tải Lên Tệp Đa Phương Tiện' },
                  description: {
                    en: 'Frontend sends user image or document buffer to internal secure endpoint /api/analyze-document without needing API credentials.',
                    vi: 'Frontend gửi tệp ảnh hoặc tài liệu đến endpoint an toàn nội bộ /api/analyze-document mà không cần giữ bất kỳ API key nào.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Lazy Client Initialization', vi: 'Khởi Tạo Lazy Singleton Client' },
                  description: {
                    en: 'Route handler calls getGemini(), verifying process.env.GEMINI_API_KEY exists before initializing the singleton instance.',
                    vi: 'Hàm xử lý route gọi getGemini(), kiểm tra biến môi trường process.env.GEMINI_API_KEY hợp lệ trước khi cấp phát bộ nhớ singleton.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Buffer Packaging (inlineData)', vi: 'Đóng Gói Buffer Vào inlineData' },
                  description: {
                    en: 'Backend converts binary buffer to base64 string and sets exact mimeType (e.g. image/jpeg, application/pdf).',
                    vi: 'Backend chuyển đổi buffer nhị phân sang chuỗi base64 và gán đúng mimeType (ví dụ image/jpeg, application/pdf).',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Gemini Foundation Call', vi: 'Gọi Mô Hình Nền Tảng Gemini' },
                  description: {
                    en: 'Invokes gemini-2.5-flash natively handling text and media simultaneously in a single forward pass.',
                    vi: 'Gọi mô hình gemini-2.5-flash xử lý đồng thời văn bản và dữ liệu đa phương tiện trong một lượt truyền.',
                  },
                },
              ],
            },
            implementation: {
              language: 'typescript',
              filename: 'server/gemini_service.ts',
              explanation: {
                en: 'Production-ready server-side module implementing the lazy singleton pattern and multimodal document analysis.',
                vi: 'Module server-side chuẩn sản xuất hiện thực mẫu lazy singleton và hàm phân tích tài liệu đa phương tiện.',
              },
              code: `import { GoogleGenAI } from '@google/genai';

// 1. Lazy Singleton State Variable
let geminiClient: GoogleGenAI | null = null;

export function getGemini(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'CRITICAL CONFIGURATION ERROR: GEMINI_API_KEY environment variable is missing. ' +
        'Please ensure secrets are provisioned in the hosting environment.'
      );
    }
    // Lazy initialization happens strictly upon first invocation
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

// 2. Multimodal Processing Helper
export async function analyzeDocumentImage(
  imageBuffer: Buffer,
  mimeType: 'image/jpeg' | 'image/png' | 'application/pdf',
  prompt: string
): Promise<string> {
  const ai = getGemini();

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { text: prompt },
      {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType: mimeType,
        },
      },
    ],
  });

  return response.text || '';
}`,
            },
            explanation: {
              en: 'The lazy getter ensures that Node.js module loading succeeds instantly during Docker build and server boot. If an environment secret is not yet attached, the container will still boot smoothly and pass Kubernetes/Cloud Run liveness probes, only throwing an explicit error when a route is called without configuration.',
              vi: 'Hàm getter lazy đảm bảo tiến trình nạp module của Node.js diễn ra tức thì trong suốt quá trình build Docker và khởi động server. Nếu biến môi trường chưa kịp nạp, container vẫn khởi động êm đềm và vượt qua kiểm tra liveness probe của Kubernetes/Cloud Run, chỉ báo lỗi rõ ràng khi có truy vấn thực tế đến route.',
            },
            variations: [
              {
                name: { en: 'Audio Transcription & Sentiment', vi: 'Bóc Băng & Đánh Giá Cảm Xúc Âm Thanh' },
                description: {
                  en: 'Pass audio/mp3 or audio/wav buffers into inlineData to perform synchronized transcription and sentiment classification.',
                  vi: 'Truyền buffer audio/mp3 hoặc audio/wav vào inlineData để vừa bóc băng ghi âm vừa đánh giá sắc thái cảm xúc.',
                },
              },
              {
                name: { en: 'Google Gen AI File API for Large Media', vi: 'Google Gen AI File API Cho Tệp Lớn' },
                description: {
                  en: 'For videos or documents exceeding 20MB, upload via ai.files.upload() and reference the resulting URI.',
                  vi: 'Với các tệp video hoặc tài liệu vượt quá 20MB, tải lên qua ai.files.upload() và truyền URI trả về vào contents.',
                },
              },
            ],
            tradeOffs: {
              en: [
                'inlineData base64 encoding incurs a ~33% payload size expansion, optimal for files under 20MB.',
                'Large files (>20MB) should use the File API to avoid high memory spikes in server RAM.',
                'Server-side proxying introduces a single extra internal network hop but guarantees API key security.',
              ],
              vi: [
                'Mã hóa base64 trong inlineData làm tăng khoảng 33% kích thước tệp, tối ưu nhất cho các tệp dưới 20MB.',
                'Các tệp lớn trên 20MB nên chuyển sang dùng File API để tránh tăng đột biến bộ nhớ RAM server.',
                'Proxy qua server tốn thêm 1 bước truyền mạng nội bộ nhưng đổi lại đảm bảo an toàn tuyệt đối cho API key.',
              ],
            },
            gotchas: {
              en: [
                'Never use process.env.GEMINI_API_KEY in client-side React code or prepend VITE_ to the secret name.',
                'Ensure the mimeType string exactly matches the binary format; declaring image/jpeg for a PNG buffer causes decoding errors.',
                'Do not instantiate GoogleGenAI in global file scope outside functions.',
              ],
              vi: [
                'Tuyệt đối không dùng process.env.GEMINI_API_KEY trong code React client hoặc thêm tiền tố VITE_ vào tên bí mật.',
                'Đảm bảo chuỗi mimeType khớp chính xác với định dạng nhị phân; khai báo image/jpeg cho tệp PNG sẽ gây lỗi giải mã.',
                'Không khởi tạo GoogleGenAI ở phạm vi toàn cục bên ngoài các hàm.',
              ],
            },
            whenNotToUse: {
              en: [
                'Video files larger than 100MB (use the Files API or Google Cloud Storage integration).',
                'Static text generation where no media or binary processing is required.',
              ],
              vi: [
                'Các tệp video dung lượng trên 100MB (hãy dùng Files API hoặc Google Cloud Storage).',
                'Các tác vụ sinh văn bản tĩnh thông thường không yêu cầu xử lý tệp đa phương tiện.',
              ],
            },
            relatedPatterns: {
              en: ['Token Streaming with SSE', 'Constrained JSON Decoding', 'Function Calling Agent'],
              vi: ['Stream Token Với Server-Sent Events', 'Ép Ngữ Pháp Giải Mã JSON', 'Agent Gọi Hàm Function Calling'],
            },
          },
        },
      ],
    },
    {
      id: 'gar-ch-2',
      number: 2,
      slug: 'gemini-streaming-and-structured-json',
      title: {
        en: 'Token Streaming & Enforcing JSON Response Schemas',
        vi: 'Stream Token Trực Tiếp & Ép Kiểu JSON Trả Về Với Response Schema',
      },
      summary: {
        en: 'generateContentStream for real-time UI typing and responseSchema for deterministic type-safe JSON extraction.',
        vi: 'Phương thức generateContentStream cho hiệu ứng gõ chữ thời gian thực và responseSchema để ép kiểu JSON chuẩn xác.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'gar-2-1',
          title: {
            en: 'Real-Time Token Streaming & Deterministic Type-Safe JSON Schemas',
            vi: 'Stream Token Thời Gian Thực & Ép Kiểu JSON Schema Chuẩn Xác Tuyệt Đối',
          },
          content: {
            en: 'In modern generative AI user experiences, perceived responsiveness is determined by Time-To-First-Token (TTFT). Waiting 5 to 10 seconds for a full generation block leads to user abandonment. Google Gemini provides native support for two essential production patterns: (1) **Real-Time Token Streaming with `generateContentStream`**: By yielding an `AsyncIterable` of incremental chunks, backend servers can stream tokens directly to frontend interfaces via Server-Sent Events (SSE) or WebSockets, dropping perceived latency below 200ms; and (2) **Deterministic Structured Output (`responseSchema`)**: Relying on prompt instructions to ask for JSON frequently fails because models may emit conversational preamble, wrap output in markdown code fences (```json), or truncate brackets. By setting `responseMimeType: "application/json"` and passing an explicit `responseSchema`, Gemini activates **Constrained Logit Masking** at the decoder level: tokens that violate the schema grammar are mathematically masked out with probability zero, guaranteeing that the returned string parses directly with `JSON.parse()` without requiring regex stripping.',
            vi: 'Trong trải nghiệm ứng dụng AI hiện đại, sự hài lòng của người dùng được quyết định bởi thời gian xuất token đầu tiên (Time-To-First-Token - TTFT). Việc bắt người dùng chờ từ 5 đến 10 giây để nhận toàn bộ khối văn bản thường dẫn đến việc thoát trang. Google Gemini hỗ trợ gốc hai mẫu thiết kế sản xuất then chốt: (1) **Stream Token Thời Gian Thực Với `generateContentStream`**: Bằng cách trả về một luồng lặp `AsyncIterable` chứa các đoạn token nhỏ, server backend có thể stream chữ trực tiếp lên giao diện người dùng qua Server-Sent Events (SSE) hoặc WebSocket, giảm độ trễ cảm nhận ban đầu xuống dưới 200ms; và (2) **Xuất Dữ Liệu Có Cấu Trúc Tất Định (`responseSchema`)**: Chỉ dựa vào câu lệnh prompt để xin JSON thường thất bại do mô hình có thể chèn lời chào xã giao, bọc chuỗi trong thẻ markdown (```json) hoặc thiếu ngoặc đóng. Bằng cách thiết lập `responseMimeType: "application/json"` và truyền một `responseSchema` tường minh, Gemini kích hoạt cơ chế **Constrained Logit Masking** tại tầng giải mã: các token vi phạm ngữ pháp của schema sẽ bị triệt tiêu xác suất về 0, đảm bảo chuỗi trả về luôn phân tích cú pháp thành công 100% bằng `JSON.parse()` mà không cần dùng regex để lọc.',
          },
          keyIdea: {
            en: 'Never use regex string replacement like text.replace(/```json/g, "") to parse AI outputs. Configure native responseMimeType: "application/json" and responseSchema for guaranteed 100% parseable structured data.',
            vi: 'Tuyệt đối không dùng regex cắt chuỗi text.replace(/```json/g, "") để xử lý kết quả của AI. Hãy cấu hình tính năng gốc responseMimeType: "application/json" và responseSchema để đảm bảo dữ liệu có cấu trúc luôn parse được 100%.',
          },
          patternDetails: {
            problem: {
              en: 'High perceived user latency without streaming, and fragile JSON parsing failures caused by markdown code fence wrappers or unconstrained model outputs.',
              vi: 'Độ trễ cảm nhận cao khi không dùng streaming, và lỗi parse JSON dễ vỡ do mô hình tự ý bọc thẻ markdown hoặc sinh sai cấu trúc.',
            },
            context: {
              en: 'Interactive web applications, real-time dashboards, automated API integration pipelines, and data extraction microservices.',
              vi: 'Ứng dụng web tương tác, bảng điều khiển thời gian thực, luồng tích hợp API tự động và vi dịch vụ trích xuất dữ liệu.',
            },
            solutionOverview: {
              en: 'Use `ai.models.generateContentStream` to stream text increments to the client for conversational interfaces. For data extraction, enforce `responseMimeType: "application/json"` and supply an OpenAPI-compatible schema in `config.responseSchema` to guarantee schema compliance at the decoding level.',
              vi: 'Dùng `ai.models.generateContentStream` để stream token lên client cho giao diện chat. Đối với tác vụ trích xuất dữ liệu, cấu hình `responseMimeType: "application/json"` và cung cấp schema chuẩn OpenAPI trong `config.responseSchema` để đảm bảo chuẩn hóa dữ liệu ngay từ tầng giải mã.',
            },
            architectureDiagram: {
              title: {
                en: 'Constrained Decoder Grammar JSON Generation',
                vi: 'Cơ Chế Ép Ngữ Pháp Giải Mã Khi Sinh JSON',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Schema Specification', vi: 'Khai Báo Cấu Trúc Schema' },
                  description: {
                    en: 'Developer provides a typed schema defining object keys, data types, and required fields.',
                    vi: 'Lập trình viên cung cấp schema định nghĩa các trường dữ liệu, kiểu giá trị và các trường bắt buộc.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Constrained Logit Masking', vi: 'Ép Xác Suất Token Tại Bộ Giải Mã' },
                  description: {
                    en: 'Gemini decoder masks invalid tokens at each decoding step, making malformed JSON grammatically impossible.',
                    vi: 'Bộ giải mã Gemini triệt tiêu xác suất của các token sai cú pháp ở từng bước, khiến mô hình không thể sinh ra JSON sai chuẩn.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Guaranteed Parseable Payload', vi: 'Dữ Liệu JSON Chuẩn Tuyệt Đối' },
                  description: {
                    en: 'Backend receives clean JSON string with zero code fences, ready for immediate JSON.parse().',
                    vi: 'Backend nhận về chuỗi JSON thuần khiết không dính thẻ markdown, sẵn sàng gọi JSON.parse() ngay lập tức.',
                  },
                },
              ],
            },
            implementation: {
              language: 'typescript',
              filename: 'server/gemini_streaming_schema.ts',
              explanation: {
                en: 'Demonstrates both real-time token streaming with AsyncIterable and deterministic schema extraction.',
                vi: 'Minh họa cả kỹ thuật stream token thời gian thực qua AsyncIterable và trích xuất dữ liệu có cấu trúc theo schema.',
              },
              code: `import { Type } from '@google/genai';
import { getGemini } from './gemini_service';

// 1. Streaming Token Generation for Interactive UI
export async function streamChatResponse(
  prompt: string,
  onChunk: (text: string) => void
): Promise<void> {
  const ai = getGemini();

  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  for await (const chunk of responseStream) {
    if (chunk.text) {
      onChunk(chunk.text);
    }
  }
}

// 2. Deterministic Structured JSON Extraction
export interface ProductSpec {
  brand: string;
  priceUSD: number;
  features: string[];
  inStock: boolean;
}

export async function extractProductSpecs(description: string): Promise<ProductSpec> {
  const ai = getGemini();

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Extract product specifications from the text: \${description}\`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          brand: { type: Type.STRING },
          priceUSD: { type: Type.NUMBER },
          features: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          inStock: { type: Type.BOOLEAN },
        },
        required: ['brand', 'priceUSD', 'features', 'inStock'],
      },
    },
  });

  // Zero regex needed; guaranteed 100% valid JSON conforming to ProductSpec
  return JSON.parse(response.text!);
}`,
            },
            explanation: {
              en: 'By leveraging the native responseSchema parameter, developers eliminate brittle regex parsing workarounds. The underlying decoding grammar physically prevents the model from generating characters that would invalidate the JSON syntax, while generateContentStream provides smooth, continuous token delivery.',
              vi: 'Bằng việc tận dụng tham số responseSchema gốc, lập trình viên loại bỏ hoàn toàn các đoạn mã regex lọc chuỗi tạm bợ. Ngữ pháp giải mã bên dưới ngăn chặn về mặt vật lý việc mô hình sinh ra các ký tự làm hỏng cú pháp JSON, đồng thời generateContentStream đem lại trải nghiệm chữ chạy mượt mà.',
            },
            variations: [
              {
                name: { en: 'Constrained Categorical Enums', vi: 'Ép Kiểu Giá Trị Danh Mục Phân Loại (Enum)' },
                description: {
                  en: 'Define string enums in responseSchema properties to force output classification into a fixed set of allowed strings.',
                  vi: 'Khai báo enum dạng chuỗi trong responseSchema để bắt buộc phân loại kết quả vào một tập nhãn cố định.',
                },
              },
            ],
            tradeOffs: {
              en: [
                'Constrained decoding guarantees syntactic correctness, but does not guarantee the factual truth of the extracted data.',
                'Streaming requires stateful connection management (SSE / WebSockets) on frontend clients.',
              ],
              vi: [
                'Ép ngữ pháp giải mã đảm bảo đúng cú pháp 100%, nhưng không tự động bảo chứng tính chân lý của dữ liệu.',
                'Stream token đòi hỏi phải quản lý kết nối trạng thái (SSE / WebSocket) ở phía client.',
              ],
            },
            gotchas: {
              en: [
                'Always list all critical properties in the required array; otherwise the model may omit fields.',
                'Do not mix responseMimeType: "application/json" with free-form markdown prompting.',
              ],
              vi: [
                'Luôn liệt kê tất cả các trường quan trọng trong mảng required; nếu không mô hình có thể bỏ sót trường.',
                'Không kết hợp responseMimeType: "application/json" với các prompt yêu cầu định dạng markdown tự do.',
              ],
            },
            whenNotToUse: {
              en: [
                'Creative open-ended storytelling where rigid schemas restrict vocabulary or narrative flow.',
                'Batch background jobs where streaming tokens to a UI provides no functional benefit.',
              ],
              vi: [
                'Sáng tác nội dung mở tự do khi cấu trúc schema gò bó làm hạn chế vốn từ và mạch cảm xúc.',
                'Các tác vụ xử lý lô ngầm trong nền nơi việc stream chữ không mang lại giá trị tương tác người dùng.',
              ],
            },
            relatedPatterns: {
              en: ['Lazy SDK Initialization', 'Multimodal Processing', 'Agent Tool Calling'],
              vi: ['Khởi Tạo Lazy SDK', 'Xử Lý Đa Phương Tiện', 'Agent Gọi Hàm Function Calling'],
            },
          },
        },
      ],
    },
  ],
};
