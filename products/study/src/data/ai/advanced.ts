import { Lesson } from '../../types';

export const advancedLessons: Lesson[] = [
  // Lesson 16: REST APIs, SDKs & Authentication
  {
    id: 'ai_a_1',
    moduleId: 'ai_mod_9',
    levelId: 'advanced',
    courseId: 'ai',
    order: 1,
    title: {
      en: 'REST APIs, SDKs & Authentication',
      vi: 'Tích Hợp REST API, SDK & Bảo Mật Xác Thực'
    },
    summary: {
      en: 'Connect server applications to Generative AI endpoints using official TypeScript SDKs and REST APIs safely.',
      vi: 'Kết nối ứng dụng máy chủ tới API Generative AI bằng TypeScript SDK chính thức và REST API an toàn.'
    },
    topicId: 'api_integration',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'To build full-stack AI applications, developers integrate server-side SDKs (e.g. `@google/genai`) and authenticate requests using secure environment API keys.',
        vi: 'Để xây dựng ứng dụng AI full-stack, lập trình viên tích hợp SDK phía server (như `@google/genai`) và xác thực bằng API key lưu trong biến môi trường an toàn.'
      },
      conceptExplanation: {
        en: '1. API Key Security: NEVER expose raw API keys in client-side code (`VITE_` or browser JS). Always proxy AI requests through backend API endpoints (`/api/ai`).\n2. Modern SDK Initialization: Initialize client instances on server startup using `GoogleGenAI`.\n3. Content Generation Paradigm: Passing formatted contents array with text/media to generate response text or JSON.',
        vi: '1. An Toàn API Key: KHÔNG BAO GIỜ để lộ API key ở phía client (JavaScript trình duyệt). Luôn gọi AI qua backend proxy (`/api/ai`).\n2. Khởi Tạo SDK Hiện Đại: Sử dụng `GoogleGenAI` ở server.\n3. Mô Hình Tạo Nội Dung: Truyền mảng contents chứa văn bản/hình ảnh để nhận phản hồi văn bản hoặc JSON.'
      },
      syntax: `// Server-side SDK Initialization Blueprint (@google/genai)
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Explain REST API integration in Node.js',
});
console.log(response.text);`,
      examples: [
        {
          title: { en: 'Backend Proxy Route Pattern', vi: 'Mô Hình Express Backend Proxy' },
          code: `// Express Backend API Route Handler (/api/generate)
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    res.json({ result: response.text });
  } catch (error) {
    res.status(500).json({ error: "AI Generation Failed" });
  }
});`,
          explanation: {
            en: 'Server-side API routes protect secret keys from browser inspection.',
            vi: 'API route phía server bảo vệ chìa khóa bí mật khỏi bị soi trên trình duyệt.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Always proxy AI SDK calls through server routes to keep API keys secret.', vi: 'Luôn gọi AI SDK qua server route để bảo vệ API Key bí mật.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_a_1_1',
        type: 'predict_output',
        title: { en: 'Validate API Key Location', vi: 'Vị Trí Lưu Trữ API Key' },
        instruction: {
          en: 'Where should production Generative AI secret API keys be initialized and accessed?',
          vi: 'API Key bí mật của Generative AI nên được lưu trữ và truy cập ở đâu trên môi trường sản xuất?'
        },
        starterCode: 'location = "Secret API Key Storage"',
        solutionCode: 'Server-side environment variables (process.env.GEMINI_API_KEY)',
        options: [
          'Client-side HTML script tag',
          'Server-side environment variables (process.env.GEMINI_API_KEY)',
          'Public CSS stylesheet',
          'Git public repository commit'
        ],
        correctOptionIndex: 1,
        explanation: {
          en: 'Server-side environment variables keep keys hidden from client browsers.',
          vi: 'Biến môi trường phía server giữ cho key không bị lộ dưới trình duyệt.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_a_1',
      title: { en: 'API Key Masking Helper', vi: 'Hàm Che Mờ API Key' },
      description: {
        en: 'Write `maskApiKey(key)` returning first 4 chars + "..." + last 4 chars (e.g., "AIza...9xQ2"), or "INVALID_KEY" if length < 10.',
        vi: 'Viết `maskApiKey(key)` trả về 4 ký tự đầu + "..." + 4 ký tự cuối, hoặc "INVALID_KEY" nếu độ dài < 10.'
      },
      requirements: [
        { en: 'If key length < 10, return "INVALID_KEY".', vi: 'Nếu độ dài key < 10, trả về "INVALID_KEY".' },
        { en: 'Return string formatted with prefix, ellipsis, and suffix.', vi: 'Trả về chuỗi gồm tiền tố, dấu ... và hậu tố.' }
      ],
      starterCode: `function maskApiKey(key) {
  // Your code here
}`,
      solutionCode: `function maskApiKey(key) {
  if (!key || key.length < 10) return "INVALID_KEY";
  return \`\${key.slice(0, 4)}...\${key.slice(-4)}\`;
}`,
      hints: [
        { en: 'Use String.prototype.slice().', vi: 'Dùng phương thức slice().' }
      ],
      testCases: [
        { input: '"AIzaSy1234567890xQ2"', expectedOutput: '"AIza...xQ2"', description: 'Masks secret key safely' },
        { input: '"short"', expectedOutput: '"INVALID_KEY"', description: 'Rejects invalid short key' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_a_1_1',
        type: 'single_choice',
        question: {
          en: 'Why is embedding AI API keys in client-side frontend React code considered a critical security vulnerability?',
          vi: 'Tại sao việc để lộ API Key AI trong code React phía frontend lại là lỗ hổng an ninh nghiêm trọng?'
        },
        options: [
          { en: 'Anyone can inspect network traffic/bundle JS and steal your API key to drain your budget', vi: 'Bất kỳ ai cũng có thể đọc bundle JS/mạng và đánh cắp API key để dùng cạn ngân sách của bạn' },
          { en: 'It turns the screen red', vi: 'Nó làm màn hình biến thành màu đỏ' },
          { en: 'It makes the app run on Python', vi: 'Nó làm ứng dụng chạy sang Python' },
          { en: 'It forces the browser to restart', vi: 'Nó làm trình duyệt bị khởi động lại' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Client-side assets are fully public and visible in browser DevTools.',
          vi: 'Tất cả tài nguyên client-side đều công khai và bị nhìn thấy trong DevTools.'
        },
        topicId: 'api_integration',
        difficulty: 'easy'
      }
    ]
  },

  // Lesson 17: Handling Rate Limits, Retries & Streaming
  {
    id: 'ai_a_2',
    moduleId: 'ai_mod_9',
    levelId: 'advanced',
    courseId: 'ai',
    order: 2,
    title: {
      en: 'Handling Rate Limits, Retries & Streaming',
      vi: 'Xử Lý Giới Hạn Băng Thông (Rate Limit), Retries & Streaming'
    },
    summary: {
      en: 'Implement Exponential Backoff retries for 429 rate limit errors and stream token responses using Server-Sent Events (SSE).',
      vi: 'Xử lý lỗi 429 Rate Limit bằng thuật toán Exponential Backoff và phản hồi dạng dòng (Streaming) với SSE.'
    },
    topicId: 'api_integration',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'Production AI services face strict Rate Limits (Requests Per Minute - RPM, Tokens Per Minute - TPM). Handling HTTP 429 status codes with Exponential Backoff and offering Streaming improves UX and resiliency.',
        vi: 'Ứng dụng AI thực tế chịu giới hạn Rate Limit (RPM, TPM). Việc xử lý lỗi 429 bằng Exponential Backoff và mở luồng Streaming giúp nâng cao trải nghiệm người dùng.'
      },
      conceptExplanation: {
        en: '1. Rate Limits (HTTP 429): Occurs when request volume exceeds quota.\n2. Exponential Backoff with Jitter: Retrying failed requests with exponentially increasing delays (e.g., 1s -> 2s -> 4s -> 8s + random jitter) to prevent API thundering herd problem.\n3. Token Streaming: Delivering partial response chunks as they are generated by the model instead of waiting for full generation, reducing perceived latency from 5s down to 200ms.',
        vi: '1. Rate Limit (Lỗi HTTP 429): Xảy ra khi tần suất gọi vượt quá hạn mức.\n2. Exponential Backoff kèm Jitter: Thử lại cuộc gọi lỗi với thời gian chờ tăng theo cấp số nhân (1s -> 2s -> 4s -> 8s + thời gian ngẫu nhiên) tránh làm nghẽn API.\n3. Streaming Token: Trả về từng đoạn kết quả ngay khi mô hình vừa tạo ra thay vì chờ đợi toàn bộ, giảm độ trễ trải nghiệm từ 5s xuống 200ms.'
      },
      examples: [
        {
          title: { en: 'Streaming SDK Response Pattern', vi: 'Mô Hình Streaming Trực Tiếp Với SDK' },
          code: `// Express SSE Streaming Handler
app.get('/api/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  
  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: req.query.prompt
  });
  
  for await (const chunk of responseStream) {
    res.write(\`data: \${JSON.stringify({ text: chunk.text })}\\n\\n\`);
  }
  res.end();
});`,
          explanation: {
            en: 'Streaming delivers response chunks instantly as tokens are generated.',
            vi: 'Streaming gửi từng đoạn câu trả lời lập tức ngay khi token vừa tạo ra.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Use Exponential Backoff for 429 retries; use Streaming to eliminate perceived latency.', vi: 'Dùng Exponential Backoff cho lỗi 429; dùng Streaming để loại bỏ cảm giác chờ đợi.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_a_2_1',
        type: 'predict_output',
        title: { en: 'Calculate Backoff Delay', vi: 'Tính Thời Gian Chờ Backoff' },
        instruction: {
          en: 'Using formula `delay = base * Math.pow(2, attempt)`, what is the delay for attempt 3 with base 1000ms?',
          vi: 'Dùng công thức `delay = base * Math.pow(2, attempt)`, thời gian chờ cho lần thử thứ 3 với base 1000ms là bao nhiêu?'
        },
        starterCode: 'attempt = 3, base = 1000',
        solutionCode: '8000 ms (8 seconds)',
        options: ['1000 ms', '3000 ms', '8000 ms', '16000 ms'],
        correctOptionIndex: 2,
        explanation: {
          en: '1000 * 2^3 = 1000 * 8 = 8000 ms.',
          vi: '1000 * 2^3 = 1000 * 8 = 8000 ms.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_a_2',
      title: { en: 'Exponential Backoff Calculator', vi: 'Hàm Tính Backoff Trễ' },
      description: {
        en: 'Write `getBackoffDelay(attempt, baseMs)` returning exponential delay capped at maximum 30000ms.',
        vi: 'Viết `getBackoffDelay(attempt, baseMs)` trả về thời gian trễ cấp số nhân tối đa không quá 30000ms.'
      },
      requirements: [
        { en: 'Calculate delay = baseMs * (2 ** attempt).', vi: 'Tính delay = baseMs * (2 ** attempt).' },
        { en: 'Return Math.min(delay, 30000).', vi: 'Trả về Math.min(delay, 30000).' }
      ],
      starterCode: `function getBackoffDelay(attempt, baseMs) {
  // Your code here
}`,
      solutionCode: `function getBackoffDelay(attempt, baseMs) {
  const calculated = baseMs * Math.pow(2, attempt);
  return Math.min(calculated, 30000);
}`,
      hints: [
        { en: 'Use Math.pow() and Math.min().', vi: 'Dùng Math.pow() và Math.min().' }
      ],
      testCases: [
        { input: '2, 1000', expectedOutput: '4000', description: 'Calculates 1000 * 2^2 = 4000ms' },
        { input: '10, 1000', expectedOutput: '30000', description: 'Caps max delay at 30,000ms' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_a_2_1',
        type: 'single_choice',
        question: {
          en: 'What primary user experience (UX) problem does response token streaming solve?',
          vi: 'Vấn đề trải nghiệm người dùng (UX) chính nào được giải quyết nhờ công nghệ token streaming?'
        },
        options: [
          { en: 'Reduces perceived latency by showing initial text within milliseconds instead of multi-second delays', vi: 'Giảm cảm giác chờ bằng cách hiển thị chữ ngay trong vài miligiây thay vì chờ vài giây' },
          { en: 'Deletes browser history', vi: 'Xóa lịch sử trình duyệt' },
          { en: 'Reduces computer power usage to zero', vi: 'Giảm mức tiêu thụ điện máy tính về 0' },
          { en: 'Prevents SQL injection', vi: 'Ngăn chặn SQL injection' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Streaming delivers text progressively, keeping the user engaged instantly.',
          vi: 'Streaming trả về văn bản liên tục, giúp người dùng đọc ngay lập tức.'
        },
        topicId: 'api_integration',
        difficulty: 'medium'
      }
    ]
  },

  // Lesson 18: Function Schemas & Tool Execution Loops
  {
    id: 'ai_a_3',
    moduleId: 'ai_mod_10',
    levelId: 'advanced',
    courseId: 'ai',
    order: 3,
    title: {
      en: 'Function Schemas & Tool Execution Loops',
      vi: 'Khai Báo Function Calling & Vòng Lặp Gọi Công Cụ'
    },
    summary: {
      en: 'Define tool schemas, parse model function call intents, execute backend code, and pass results back to the LLM.',
      vi: 'Khai báo schema công cụ, xử lý ý định function call từ mô hình, thi hành code backend và trả kết quả về cho LLM.'
    },
    topicId: 'function_calling',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'Function Calling allows LLMs to connect with external databases, APIs, and business systems by declaring structured tool schemas.',
        vi: 'Function Calling cho phép LLM kết nối với các cơ sở dữ liệu, API bên ngoài và hệ thống doanh nghiệp thông qua việc khai báo schema công cụ.'
      },
      conceptExplanation: {
        en: '1. Tool Declaration: Defining JSON Schema for functions the model can request (name, description, parameters).\n2. Model Decision: LLM decides whether to respond with plain text or issue a `functionCall` request with arguments.\n3. Local Execution: Developer application executes the function locally using provided arguments.\n4. Tool Response: Developer passes the return value back to the model as a `functionResponse` to complete the conversation.',
        vi: '1. Khai Báo Công Cụ: Định nghĩa JSON Schema cho các hàm mà mô hình có thể yêu cầu (tên, mô tả, tham số).\n2. Quyết Định Từ Mô Hình: LLM tự quyết định trả về văn bản hoặc phát lệnh `functionCall` kèm đối số.\n3. Thực Thi Phía Developer: Ứng dụng của lập trình viên gọi hàm tương ứng với đối số nhận được.\n4. Trả Kết Quả Công Cụ: Lập trình viên truyền kết quả trả về lại cho mô hình dưới dạng `functionResponse` để mô hình tổng hợp.'
      },
      examples: [
        {
          title: { en: 'Function Calling Tool Schema & Loop', vi: 'Schema & Quy Trình Function Calling' },
          code: `// Tool Schema Definition
const tools = [{
  functionDeclarations: [{
    name: "getWeather",
    description: "Get real-time weather metrics for a city",
    parameters: {
      type: "OBJECT",
      properties: { city: { type: "STRING" } },
      required: ["city"]
    }
  }]
}];

// Execution Loop:
// 1. User: "How is the weather in Tokyo?"
// 2. Model: FunctionCall { name: "getWeather", args: { city: "Tokyo" } }
// 3. Backend: const data = fetchWeather("Tokyo"); // returns { temp: "22C", condition: "Sunny" }
// 4. Send tool response back -> Model final response: "The weather in Tokyo is 22°C and sunny!"`,
          explanation: {
            en: 'Function calling turns LLMs into active orchestration engines capable of querying external state.',
            vi: 'Function calling biến LLM thành bộ điều phối có khả năng truy vấn dữ liệu bên ngoài.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Function calling routes LLM intent to developer code execution and feeds results back.', vi: 'Function calling điều hướng ý định LLM tới code của dev và gửi kết quả ngược lại.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_a_3_1',
        type: 'predict_output',
        title: { en: 'Identify Function Calling Step', vi: 'Bước Trong Function Calling' },
        instruction: {
          en: 'Does the LLM execute the function code directly on Google cloud servers when Function Calling is triggered?',
          vi: 'Mô hình LLM có tự động chạy trực tiếp code của hàm trên server của Google khi phát lệnh Function Calling không?'
        },
        starterCode: 'question = "Does LLM execute function code directly?"',
        solutionCode: 'No - LLM returns JSON arguments intent; developer executes the code locally',
        options: [
          'Yes - LLM compiles and executes C++ directly',
          'No - LLM returns JSON arguments intent; developer executes the code locally',
          'Yes - It modifies the user database directly',
          'No - Function calling is not supported'
        ],
        correctOptionIndex: 1,
        explanation: {
          en: 'The model returns intent and structured arguments; developer code performs actual execution.',
          vi: 'Mô hình chỉ trả về ý định và tham số cấu trúc; code của dev mới thực thi thực sự.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_a_3',
      title: { en: 'Tool Dispatcher Router', vi: 'Hàm Điều Hướng Thực Thi Tool' },
      description: {
        en: 'Write `dispatchTool(call, toolMap)` that executes the function in `toolMap[call.name]` passing `call.args`, returning result or error.',
        vi: 'Viết `dispatchTool(call, toolMap)` thực thi hàm trong `toolMap[call.name]` với đối số `call.args`, trả về kết quả hoặc thông báo lỗi.'
      },
      requirements: [
        { en: 'If call.name exists in toolMap, execute toolMap[call.name](call.args).', vi: 'Nếu call.name có trong toolMap, chạy toolMap[call.name](call.args).' },
        { en: 'If missing, return "UNKNOWN_TOOL".', vi: 'Nếu thiếu, trả về "UNKNOWN_TOOL".' }
      ],
      starterCode: `function dispatchTool(call, toolMap) {
  // Your code here
}`,
      solutionCode: `function dispatchTool(call, toolMap) {
  if (toolMap && typeof toolMap[call.name] === "function") {
    return toolMap[call.name](call.args);
  }
  return "UNKNOWN_TOOL";
}`,
      hints: [
        { en: 'Check function existence using typeof operator.', vi: 'Kiểm tra sự tồn tại của hàm bằng toán tử typeof.' }
      ],
      testCases: [
        { input: '{"name":"add", "args":{"a":2,"b":3}}, {"add": (args)=>args.a+args.b}', expectedOutput: '5', description: 'Dispatches arguments to registered tool' },
        { input: '{"name":"missing", "args":{}}, {}', expectedOutput: '"UNKNOWN_TOOL"', description: 'Handles unknown tool gracefully' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_a_3_1',
        type: 'single_choice',
        question: {
          en: 'What is the key benefit of providing clear parameter `description` fields in function declarations?',
          vi: 'Lợi ích chính của việc cung cấp mô tả `description` rõ ràng cho các tham số trong khai báo hàm là gì?'
        },
        options: [
          { en: 'Helps the LLM accurately understand when and how to extract arguments from user natural language', vi: 'Giúp LLM hiểu chính xác khi nào và cách thức trích xuất tham số từ ngôn ngữ tự nhiên' },
          { en: 'Formats the code with Prettier', vi: 'Tự động format code với Prettier' },
          { en: 'Increases website SEO ranking', vi: 'Tăng thứ hạng SEO của website' },
          { en: 'Changes the theme to dark mode', vi: 'Đổi giao diện sang giao diện tối' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Descriptions act as semantic prompts guiding parameter extraction.',
          vi: 'Các mô tả đóng vai trò như câu hướng dẫn ngữ nghĩa để trích xuất tham số.'
        },
        topicId: 'function_calling',
        difficulty: 'medium'
      }
    ]
  },

  // Lesson 19: Text Embeddings & Cosine Similarity
  {
    id: 'ai_a_4',
    moduleId: 'ai_mod_11',
    levelId: 'advanced',
    courseId: 'ai',
    order: 4,
    title: {
      en: 'Text Embeddings & Cosine Similarity',
      vi: 'Vector Embeddings & Độ Tương Đồng Cosine'
    },
    summary: {
      en: 'Convert text strings into dense vector representations and perform semantic search using Cosine Similarity math.',
      vi: 'Chuyển đổi chuỗi văn bản thành mảng vector và thực hiện tìm kiếm ngữ nghĩa bằng toán độ tương đồng Cosine.'
    },
    topicId: 'embeddings_rag',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'Traditional databases search text using exact keyword matching. Text Embeddings convert text into dense high-dimensional numeric vectors, capturing true semantic meaning.',
        vi: 'Cơ sở dữ liệu truyền thống tìm kiếm bằng so khớp từ khóa chính xác. Text Embedding chuyển văn bản thành mảng vector số nhiều chiều, biểu diễn chính xác ý nghĩa ngữ nghĩa.'
      },
      conceptExplanation: {
        en: '1. Text Embedding: Mapping string text into float arrays (e.g., 768 or 1536 dimensions).\n2. Semantic Proximity: Texts with similar meanings (e.g. "King" and "Monarch", or "Dog" and "Puppy") produce vectors pointing in nearly identical geometric directions.\n3. Cosine Similarity: Mathematical metric measuring the cosine of the angle between two vectors (1.0 = identical direction/meaning, 0.0 = orthogonal, -1.0 = opposite).\n4. Dot Product & Euclidean Distance: Alternative vector distance calculation metrics.',
        vi: '1. Text Embedding: Ánh xạ văn bản thành mảng số thực (ví dụ: 768 hoặc 1536 chiều).\n2. Khoảng Cách Ngữ Nghĩa: Các từ có nghĩa tương đồng (như "Chó" và "Cún", hoặc "Vua" and "Quốc Vương") tạo ra các vector có cùng hướng trong không gian.\n3. Độ Tương Đồng Cosine (Cosine Similarity): Công thức đo góc giữa 2 vector (1.0 = hoàn toàn giống nghĩa, 0.0 = vuông góc, -1.0 = ngược nghĩa).\n4. Dot Product & Khoảng Cách Euclidean: Các công thức đo khoảng cách vector thay thế.'
      },
      syntax: `// Cosine Similarity Formula:
// similarity = (A · B) / (||A|| * ||B||)`,
      examples: [
        {
          title: { en: 'Cosine Similarity Implementation in JavaScript', vi: 'Cài Đặt Hàm Cosine Similarity Trong JavaScript' },
          code: `function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Result 0.95 = High Semantic Similarity!`,
          explanation: {
            en: 'Cosine similarity measures geometric angle regardless of vector magnitude.',
            vi: 'Độ tương đồng Cosine đo góc giữa 2 vector bất kể độ dài vector.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Embeddings map text to vectors; Cosine Similarity measures semantic proximity.', vi: 'Embeddings chuyển văn bản thành vector; Cosine Similarity đo độ tương đồng ngữ nghĩa.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_a_4_1',
        type: 'predict_output',
        title: { en: 'Evaluate Vector Proximity', vi: 'Đánh Giá Khoảng Cách Vector' },
        instruction: {
          en: 'What Cosine Similarity score indicates two vector embeddings have identical semantic direction?',
          vi: 'Điểm tương đồng Cosine nào thể hiện 2 vector embedding có hướng ngữ nghĩa hoàn toàn trùng nhau?'
        },
        starterCode: 'direction = "Identical Vector Direction"',
        solutionCode: '1.0',
        options: ['1.0', '0.0', '-1.0', '100.0'],
        correctOptionIndex: 0,
        explanation: {
          en: 'Cosine similarity of 1.0 represents angle 0 degrees (identical direction).',
          vi: 'Điểm Cosine 1.0 đại diện cho góc 0 độ (cùng hướng hoàn toàn).'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_a_4',
      title: { en: 'Dot Product Calculator', vi: 'Hàm Tính Tích Vô Hướng (Dot Product)' },
      description: {
        en: 'Write `dotProduct(vecA, vecB)` returning sum of element-wise products of two equal length arrays.',
        vi: 'Viết `dotProduct(vecA, vecB)` trả về tổng tích từng phần tử của 2 mảng vector có cùng độ dài.'
      },
      requirements: [
        { en: 'Iterate arrays and accumulate sum += vecA[i] * vecB[i].', vi: 'Lặp qua mảng và cộng dồn sum += vecA[i] * vecB[i].' }
      ],
      starterCode: `function dotProduct(vecA, vecB) {
  // Your code here
}`,
      solutionCode: `function dotProduct(vecA, vecB) {
  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    sum += vecA[i] * vecB[i];
  }
  return sum;
}`,
      hints: [
        { en: 'Use a standard for loop.', vi: 'Sử dụng vòng lặp for.' }
      ],
      testCases: [
        { input: '[1, 2, 3], [4, 5, 6]', expectedOutput: '32', description: 'Calculates 1*4 + 2*5 + 3*6 = 32' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_a_4_1',
        type: 'single_choice',
        question: {
          en: 'Why is vector embedding search superior to traditional keyword SQL search (`WHERE text LIKE %query%`) for knowledge bases?',
          vi: 'Tại sao tìm kiếm bằng Vector Embedding lại vượt trội hơn so với tìm kiếm từ khóa SQL truyền thống?'
        },
        options: [
          { en: 'It matches conceptual meaning and synonyms even when query words do not match document text directly', vi: 'Nó so khớp ý niệm ngữ nghĩa và từ đồng nghĩa ngay cả khi từ khóa không giống hệt văn bản gốc' },
          { en: 'It uses 0 bytes of disk storage', vi: 'Nó sử dụng 0 byte ổ đĩa' },
          { en: 'It turns PDFs into PNG images', vi: 'Nó chuyển PDF thành ảnh PNG' },
          { en: 'It deletes unreferenced files', vi: 'Nó xóa các file không được dẫn chiếu' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Embeddings capture semantic intent rather than literal character string matching.',
          vi: 'Embeddings bắt được ý định ngữ nghĩa thay vì chỉ so khớp từng chữ cái.'
        },
        topicId: 'embeddings_rag',
        difficulty: 'medium'
      }
    ]
  },

  // Lesson 20: RAG Architecture
  {
    id: 'ai_a_5',
    moduleId: 'ai_mod_12',
    levelId: 'advanced',
    courseId: 'ai',
    order: 5,
    title: {
      en: 'RAG Architecture: Chunking, Indexing & Retrieval',
      vi: 'Kiến Trúc RAG: Chunking, Đánh Chỉ Mục & Truy Xuat'
    },
    summary: {
      en: 'Architect end-to-end Retrieval-Augmented Generation (RAG): Document parsing, chunking strategies, vector indexing, and context injection.',
      vi: 'Xây dựng quy trình RAG hoàn chỉnh: Parse tài liệu, chiến lược chia đoạn (chunking), đánh chỉ mục vector và chèn ngữ cảnh.'
    },
    topicId: 'embeddings_rag',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'Retrieval-Augmented Generation (RAG) is the gold standard enterprise architecture for grounding LLMs with private organizational data without expensive retraining.',
        vi: 'Retrieval-Augmented Generation (RAG) là kiến trúc doanh nghiệp chuẩn mực giúp bổ sung dữ liệu nội bộ cho LLM mà không cần huấn luyện lại đắt đỏ.'
      },
      conceptExplanation: {
        en: '1. Ingestion Pipeline:\n   - Document Parsing (PDFs, Docs, Web pages).\n   - Chunking Strategy (Fixed character size with overlap, e.g. 500 chars with 50 char overlap, or semantic sentence splitting).\n   - Embedding Generation & Vector DB Storage (pgvector, Pinecone, Qdrant).\n2. Query Retrieval Pipeline:\n   - User Query -> Embedded to Vector.\n   - Nearest Neighbor Search -> Retrieves top-K relevant chunks.\n   - Prompt Augmentation -> Injects retrieved chunks into System/User context.\n   - Model Generation -> Synthesizes grounded answer.',
        vi: '1. Quy Trình Nạp Dữ Liệu (Ingestion):\n   - Parse Tài Liệu (PDF, Docx, Trang web).\n   - Chiến Lược Chia Đoạn (Chunking - ví dụ: 500 ký tự ghi đè 50 ký tự gối đầu).\n   - Tạo Vector Embedding & Lưu Vector DB (pgvector, Pinecone, Qdrant).\n2. Quy Trình Truy Xuất (Query):\n   - User Query -> Chuyển thành Vector.\n   - Tìm Kiếm Hàng Xóm Gần Nhất -> Lấy Top-K đoạn tài liệu khớp nhất.\n   - Bổ Sung Context -> Chèn các đoạn lấy được vào Prompt.\n   - Tạo Phản Hồi -> LLM tổng hợp câu trả lời dựa trên nguồn tin.'
      },
      examples: [
        {
          title: { en: 'End-to-End RAG Prompt Injection Pattern', vi: 'Mô Hình Chèn Ngữ Cảnh RAG Vào Prompt' },
          code: `async function answerWithRag(userQuery) {
  // 1. Embed query
  const queryVector = await getEmbedding(userQuery);
  
  // 2. Search top-3 vector chunks
  const retrievedChunks = await vectorDb.search(queryVector, { topK: 3 });
  
  // 3. Construct Augmented Prompt
  const contextBlock = retrievedChunks.map(c => c.text).join("\\n---\\n");
  const prompt = \`
Use ONLY the following context snippets to answer the question.
If the answer is not contained within context, state "DATA_NOT_FOUND".

[CONTEXT SNIPPETS]:
\${contextBlock}

[USER QUESTION]: \${userQuery}
\`;

  return await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
}`,
          explanation: {
            en: 'RAG bridges private vector database knowledge directly into the LLM context window.',
            vi: 'RAG kết nối trực tiếp tri thức từ Vector DB vào cửa sổ ngữ cảnh của LLM.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'RAG pipeline: Ingest -> Chunk -> Embed -> Vector Search -> Context Augmentation -> Generation.', vi: 'Quy trình RAG: Nạp -> Chia nhỏ -> Embedding -> Tìm Vector -> Bổ sung ngữ cảnh -> Tạo kết quả.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_a_5_1',
        type: 'predict_output',
        title: { en: 'Identify Chunk Overlap Purpose', vi: 'Mục Đích Của Chunk Overlap' },
        instruction: {
          en: 'Why do chunking algorithms include overlap (e.g., 50 characters) between consecutive document slices?',
          vi: 'Tại sao thuật toán chia đoạn (chunking) lại thêm khoảng gối đầu (overlap - ví dụ 50 ký tự) giữa các đoạn liền kề?'
        },
        starterCode: 'setting = "Chunk Overlap Strategy"',
        solutionCode: 'Preserves semantic context across chunk boundary splits',
        options: [
          'Preserves semantic context across chunk boundary splits',
          'Duplicates database size unnecessarily',
          'Encrypts chunk text',
          'Renders HTML graphics'
        ],
        correctOptionIndex: 0,
        explanation: {
          en: 'Chunk overlap prevents breaking sentences or key ideas in half at boundaries.',
          vi: 'Gối đầu giúp tránh làm rách câu văn hoặc ý quan trọng ngay tại ranh giới cắt.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_a_5',
      title: { en: 'RAG Context Formatter', vi: 'Bộ Định Dạng Ngữ Cảnh RAG' },
      description: {
        en: 'Write `formatRagContext(chunks)` that maps array of chunk strings into a formatted context block separated by `\n---\n`.',
        vi: 'Viết `formatRagContext(chunks)` chuyển mảng chuỗi chunk thành một khối ngữ cảnh phân cách bởi `\n---\n`.'
      },
      requirements: [
        { en: 'Join array items with `\n---\n`.', vi: 'Nối các phần tử mảng bằng `\n---\n`.' }
      ],
      starterCode: `function formatRagContext(chunks) {
  // Your code here
}`,
      solutionCode: `function formatRagContext(chunks) {
  if (!Array.isArray(chunks) || chunks.length === 0) return "";
  return chunks.join("\\n---\\n");
}`,
      hints: [
        { en: 'Use Array.prototype.join().', vi: 'Dùng Array.prototype.join().' }
      ],
      testCases: [
        { input: '["chunk 1", "chunk 2"]', expectedOutput: '"chunk 1\\n---\\nchunk 2"', description: 'Formats RAG chunks with delimiter' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_a_5_1',
        type: 'single_choice',
        question: {
          en: 'What is the top-K parameter in Vector Retrieval?',
          vi: 'Tham số top-K trong truy xuất Vector là gì?'
        },
        options: [
          { en: 'The number of most semantically similar document chunks to retrieve from the database', vi: 'Số lượng các đoạn tài liệu có độ tương đồng ngữ nghĩa cao nhất cần lấy ra từ CSDL' },
          { en: 'The top 10 CSS classes', vi: 'Top 10 lớp CSS' },
          { en: 'The number of GPUs running', vi: 'Số lượng GPU đang chạy' },
          { en: 'The network bandwidth speed in Mbps', vi: 'Tốc độ băng thông mạng' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Top-K specifies the number of nearest neighbor vector matches returned.',
          vi: 'Top-K quy định số lượng mảng vector hàng xóm gần nhất được trả về.'
        },
        topicId: 'embeddings_rag',
        difficulty: 'medium'
      }
    ]
  },

  // Lesson 21: Full-Stack AI Agent & Guardrails Capstone
  {
    id: 'ai_a_6',
    moduleId: 'ai_mod_13',
    levelId: 'advanced',
    courseId: 'ai',
    order: 6,
    title: {
      en: 'Full-Stack AI Agent & Guardrails Capstone',
      vi: 'Dự Án Tổng Hợp: Xây Dựng AI Agent & Khung Guardrails'
    },
    summary: {
      en: 'Synthesize all skills into a production full-stack AI application with schema enforcement, function calling, RAG, and guardrails.',
      vi: 'Tổng hợp toàn bộ kỹ năng xây dựng ứng dụng AI full-stack với schema enforcement, function calling, RAG và guardrails.'
    },
    topicId: 'capstone',
    estimatedMinutes: 25,
    learn: {
      introduction: {
        en: 'This capstone integrates the full generative engineering stack: Secure API proxying, Prompt engineering, Function Calling, RAG vector context, and Guardrails verification.',
        vi: 'Bài tổng hợp tích hợp toàn bộ kỹ năng kỹ thuật Generative AI: Proxy API an toàn, Prompt engineering, Function Calling, RAG vector và kiểm duyệt Guardrail.'
      },
      conceptExplanation: {
        en: '1. Production Pipeline Layers:\n   - Ingress Firewall: Input sanitization & Prompt Injection defense.\n   - Context Injection: Vector DB RAG retrieval.\n   - Model Execution: JSON Mode / Function Calling intent.\n   - Tool Execution Loop: Secure local function invocation.\n   - Egress Guardrails: Output validation, hallucination checks, and PII redaction.\n2. Monitoring & Evaluation (LLM-as-a-Judge): Automated evaluation of response accuracy, toxicity, and latency.',
        vi: '1. Các Tầng Sản Xuất:\n   - Tầng Đầu Vào: Lọc dữ liệu & Phòng thủ Prompt Injection.\n   - Bổ Sung Ngữ Cảnh: Truy xuất RAG từ Vector DB.\n   - Thực Thi Mô Hình: Chế độ JSON / Ý định Function Calling.\n   - Vòng Lặp Công Cụ: Gọi hàm local an toàn.\n   - Kiểm Duyệt Đầu Ra (Egress Guardrail): Validation, kiểm tra bịa đặt và ẩn thông tin cá nhân (PII).\n2. Giám Sát & Đánh Giá (LLM-as-a-Judge): Đánh giá tự động độ chính xác, độ an toàn và độ trễ.'
      },
      examples: [
        {
          title: { en: 'Full Production AI Handler Architecture', vi: 'Kiến Trúc Pipeline AI Sản Xuất Hoàn Chỉnh' },
          code: `async function handleUserRequest(userInput) {
  // 1. Input Guardrail
  if (isPromptInjection(userInput)) throw new Error("BLOCKED");
  
  // 2. RAG Context
  const context = await fetchRagContext(userInput);
  
  // 3. Execution with Function Calling
  const response = await callLlmWithTools(userInput, context);
  
  // 4. Output Guardrail & PII Redaction
  const safeOutput = redactSensitiveInfo(response);
  return safeOutput;
}`,
          explanation: {
            en: 'Production AI architectures wrap model calls in strict security and validation pipelines.',
            vi: 'Kiến trúc AI sản xuất bọc các cuộc gọi mô hình trong các tầng an ninh và kiểm duyệt.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Production AI apps require layered guardrails before, during, and after model invocation.', vi: 'Ứng dụng AI sản xuất cần các tầng guardrails bảo vệ trước, trong và sau khi gọi mô hình.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_a_6_1',
        type: 'predict_output',
        title: { en: 'Identify Guardrail Purpose', vi: 'Mục Đích Của Guardrail' },
        instruction: {
          en: 'What is the role of an Egress Guardrail in an AI production application?',
          vi: 'Vai trò của Egress Guardrail trong ứng dụng AI sản xuất là gì?'
        },
        starterCode: 'layer = "Egress Guardrail"',
        solutionCode: 'Inspects and sanitizes AI response text before sending to user interface',
        options: [
          'Inspects and sanitizes AI response text before sending to user interface',
          'Formats HTML buttons with rounded corners',
          'Restarts Linux server automatically',
          'Optimizes PNG images'
        ],
        correctOptionIndex: 0,
        explanation: {
          en: 'Egress guardrails filter output text for toxicity, hallucination, or leaked secret keys.',
          vi: 'Egress guardrail kiểm duyệt văn bản đầu ra tránh độc hại, bịa đặt hoặc rò rỉ key.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_a_6',
      title: { en: 'PII Redactor Guardrail', vi: 'Guardrail Lọc Thông Tin Cá Nhân (PII)' },
      description: {
        en: 'Write `redactPii(text)` replacing email addresses with `[REDACTED_EMAIL]` and phone numbers with `[REDACTED_PHONE]`.',
        vi: 'Viết `redactPii(text)` thay thế các email bằng `[REDACTED_EMAIL]` và số điện thoại bằng `[REDACTED_PHONE]`.'
      },
      requirements: [
        { en: 'Replace email regex match with "[REDACTED_EMAIL]".', vi: 'Thay thế email khớp bằng "[REDACTED_EMAIL]".' },
        { en: 'Replace phone regex match with "[REDACTED_PHONE]".', vi: 'Thay thế số điện thoại bằng "[REDACTED_PHONE]".' }
      ],
      starterCode: `function redactPii(text) {
  // Your code here
}`,
      solutionCode: `function redactPii(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;
  const phoneRegex = /\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b/g;
  return text.replace(emailRegex, "[REDACTED_EMAIL]").replace(phoneRegex, "[REDACTED_PHONE]");
}`,
      hints: [
        { en: 'Use String.prototype.replace() with regular expressions.', vi: 'Sử dụng replace() với biểu thức chính quy.' }
      ],
      testCases: [
        { input: '"Contact user@example.com at 555-123-4567"', expectedOutput: '"Contact [REDACTED_EMAIL] at [REDACTED_PHONE]"', description: 'Redacts email and phone number' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_a_6_1',
        type: 'single_choice',
        question: {
          en: 'In full-stack AI engineering, what does "LLM-as-a-Judge" refer to?',
          vi: 'Trong kỹ thuật AI full-stack, khái niệm "LLM-as-a-Judge" nghĩa là gì?'
        },
        options: [
          { en: 'Using an independent evaluator LLM to score output quality, factual adherence, and safety of generated responses', vi: 'Sử dụng một LLM độc lập để chấm điểm chất lượng, độ trung thực và tính an toàn của câu trả lời' },
          { en: 'A court legal robot', vi: 'Một robot làm tòa án' },
          { en: 'A browser extension for Chrome', vi: 'Một tiện ích mở rộng cho Chrome' },
          { en: 'A database indexing method', vi: 'Một phương pháp đánh chỉ mục CSDL' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'LLM-as-a-Judge is an automated evaluation technique for scoring generative output quality at scale.',
          vi: 'LLM-as-a-Judge là kỹ thuật đánh giá tự động chất lượng đầu ra ở quy mô lớn.'
        },
        topicId: 'capstone',
        difficulty: 'medium'
      }
    ]
  }
];
