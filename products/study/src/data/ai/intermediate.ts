import { Lesson } from '../../types';

export const intermediateLessons: Lesson[] = [
  // Lesson 9: Prompt Anatomy & System Prompts
  {
    id: 'ai_i_1',
    moduleId: 'ai_mod_5',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 1,
    title: {
      en: 'Prompt Anatomy & System Prompts',
      vi: 'Cấu Trúc Prompt & System Prompt'
    },
    summary: {
      en: 'Master systematic prompt framing: System role, context, task instructions, output format, and constraints.',
      vi: 'Làm chủ cấu trúc prompt chuyên nghiệp: System role, ngữ cảnh, chỉ dẫn tác vụ, định dạng đầu ra và các ràng buộc.'
    },
    topicId: 'prompt_engineering',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'A production prompt is not a simple chat message. It is a structured specification containing Role, Context, Task, Constraints, and Formatting rules.',
        vi: 'Một prompt chuẩn sản xuất không phải là tin nhắn trò chuyện đơn giản. Nó là một bản tả kỹ thuật gồm Vai trò (Role), Ngữ cảnh (Context), Nhiệm vụ (Task), Ràng buộc (Constraints) và Định dạng (Format).'
      },
      conceptExplanation: {
        en: '1. System Prompt (Developer Role): Sets global persona, behavioral rules, and safety boundaries. Runs before user interaction.\n2. User Prompt: Specific request or dynamic query.\n3. Context Block: Injected background documents or database rows.\n4. Constraints: Negative rules ("Do NOT mention X", "Maximum 100 words").\n5. Formatting Spec: Standardized output requirements (JSON, Markdown table, CSV).',
        vi: '1. System Prompt (Vai trò hệ thống): Lập trình tính cách, quy tắc ứng xử và ranh giới an toàn cho mô hình. Chạy ẩn trước khi user hỏi.\n2. User Prompt: Câu hỏi cụ thể của người dùng.\n3. Khối Ngữ Cảnh (Context): Tài liệu trích dẫn hoặc dòng dữ liệu DB truyền vào.\n4. Constraints (Ràng buộc): Quy tắc cấm ("Không nhắc tới X", "Tối đa 100 từ").\n5. Đánh giá Định dạng (Format): Yêu cầu định dạng đầu ra (JSON, bảng Markdown, CSV).'
      },
      syntax: `// Standard Prompt Framing Blueprint:
// [ROLE]: You are a Senior DevOps Specialist.
// [CONTEXT]: Server memory is at 98% on host prod-db-01.
// [TASK]: Provide 3 diagnostic terminal commands to debug memory leaks.
// [CONSTRAINTS]: Output ONLY Linux bash commands. No explanations.
// [FORMAT]: Code block only.`,
      examples: [
        {
          title: { en: 'Structured Production Prompt Framework', vi: 'Khung System Prompt Chuẩn Sản Xuất' },
          code: `const buildSystemPrompt = (role, formatSpec) => \`
You are an expert \${role}.
Follow these strict rules:
1. Base all answers strictly on provided context.
2. If context lacks information, output: "INSUFFICIENT_DATA".
3. Output format must strictly adhere to: \${formatSpec}.
\`;`,
          explanation: {
            en: 'Standardizing prompt blueprints reduces output variance and parsing failures.',
            vi: 'Chuẩn hóa khung prompt giúp giảm sự sai lệch và lỗi đọc dữ liệu đầu ra.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Structure prompts with explicit Roles, Tasks, Context, Constraints, and Formatting rules.', vi: 'Xây dựng prompt với đầy đủ Vai trò, Nhiệm vụ, Ngữ cảnh, Ràng buộc và Định dạng.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_i_1_1',
        type: 'predict_output',
        title: { en: 'Identify System Prompt Purpose', vi: 'Mục Đích Của System Prompt' },
        instruction: {
          en: 'Where should global behavior rules and response boundaries be configured in an API call?',
          vi: 'Nơi nào trong API call nên được cấu hình các quy tắc ứng xử chung và ranh giới phản hồi?'
        },
        starterCode: 'setting = "Global Assistant Persona & Boundaries"',
        solutionCode: 'System Prompt / Developer Instruction',
        options: [
          'User Prompt',
          'System Prompt / Developer Instruction',
          'HTML Title Tag',
          'Database Index'
        ],
        correctOptionIndex: 1,
        explanation: {
          en: 'System prompts / Developer instructions set persistent baseline behavior.',
          vi: 'System prompt / Developer instructions thiết lập hành vi nền tảng cố định.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_i_1',
      title: { en: 'Prompt Builder Function', vi: 'Hàm Dựng Prompt Tự Động' },
      description: {
        en: 'Write `composePrompt(role, task, constraint)` returning a formatted prompt string.',
        vi: 'Viết `composePrompt(role, task, constraint)` trả về một chuỗi prompt được định dạng sẵn.'
      },
      requirements: [
        { en: 'Return string starting with `[ROLE]: ${role}\n[TASK]: ${task}\n[CONSTRAINT]: ${constraint}`.', vi: 'Trả về chuỗi bắt đầu với `[ROLE]: ${role}\n[TASK]: ${task}\n[CONSTRAINT]: ${constraint}`.' }
      ],
      starterCode: `function composePrompt(role, task, constraint) {
  // Your code here
}`,
      solutionCode: `function composePrompt(role, task, constraint) {
  return \`[ROLE]: \${role}\\n[TASK]: \${task}\\n[CONSTRAINT]: \${constraint}\`;
}`,
      hints: [
        { en: 'Use template literals with newlines.', vi: 'Sử dụng template literals với ký tự xuống dòng \\n.' }
      ],
      testCases: [
        { input: '"Teacher", "Explain AI", "Max 50 words"', expectedOutput: '"[ROLE]: Teacher\\n[TASK]: Explain AI\\n[CONSTRAINT]: Max 50 words"', description: 'Composes formatted prompt template' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_i_1_1',
        type: 'single_choice',
        question: {
          en: 'Why are explicit negative constraints (e.g., "Do NOT output code explanations") important in prompts?',
          vi: 'Tại sao các ràng buộc phủ định rõ ràng (ví dụ: "Không giải thích code") lại quan trọng trong prompt?'
        },
        options: [
          { en: 'They restrict unnecessary tokens and prevent the model from adding extra conversational fluff', vi: 'Chúng tiết kiệm token thừa và ngăn mô hình thêm văn bản trò chuyện rườm rà' },
          { en: 'They break the server connection', vi: 'Chúng làm ngắt kết nối máy chủ' },
          { en: 'They increase API cost by 10x', vi: 'Chúng làm tăng chi phí API gấp 10 lần' },
          { en: 'They disable the GPU', vi: 'Chúng tắt GPU' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Negative constraints prevent unwanted conversational preamble or verbose explanations.',
          vi: 'Ràng buộc phủ định ngăn mô hình thêm các đoạn chào hỏi hoặc giải thích rườm rà.'
        },
        topicId: 'prompt_engineering',
        difficulty: 'easy'
      }
    ]
  },

  // Lesson 10: Zero-Shot, Few-Shot & Chain-of-Thought
  {
    id: 'ai_i_2',
    moduleId: 'ai_mod_5',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 2,
    title: {
      en: 'Zero-Shot, Few-Shot & Chain-of-Thought',
      vi: 'Kỹ Thuật Zero-Shot, Few-Shot & Chain-of-Thought'
    },
    summary: {
      en: 'Apply Zero-shot direct prompting, Few-shot example guidance, and Chain-of-Thought (CoT) step-by-step reasoning.',
      vi: 'Áp dụng Zero-shot hỏi trực tiếp, Few-shot cho ví dụ mẫu, và Chain-of-Thought (CoT) suy luận từng bước.'
    },
    topicId: 'prompt_engineering',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'To guide LLM output quality for complex reasoning, prompt engineers use Zero-Shot, Few-Shot in-context learning, and Chain-of-Thought (CoT) prompting.',
        vi: 'Để nâng cao chất lượng phản hồi cho các bài toán tư duy phức tạp, lập trình viên sử dụng Zero-Shot, Few-Shot (cho ví dụ mẫu) và Chain-of-Thought (suy luận từng bước).'
      },
      conceptExplanation: {
        en: '1. Zero-Shot: Prompting without providing any input-output examples.\n2. Few-Shot: Providing 2-5 concrete input-output examples inside the prompt to establish exact pattern matching.\n3. Chain-of-Thought (CoT): Instructing the model to "Think step by step before answering". Dramatically reduces logic and math errors.',
        vi: '1. Zero-Shot: Hỏi trực tiếp không đưa ra ví dụ mẫu nào.\n2. Few-Shot: Đưa ra 2-5 ví dụ mẫu Input/Output cụ thể trong prompt để định hình chính xác cấu trúc kết quả.\n3. Chain-of-Thought (CoT): Yêu cầu mô hình "Suy nghĩ từng bước một trước khi đưa ra câu trả lời". Giúp giảm mạnh lỗi logic và toán học.'
      },
      examples: [
        {
          title: { en: 'Few-Shot & Chain-of-Thought Exemplar', vi: 'Ví Dụ Few-Shot & Chain-of-Thought' },
          code: `// Few-Shot Sentiment Prompting
const fewShotPrompt = \`
Classify customer sentiment into [POSITIVE, NEGATIVE, NEUTRAL].

Input: "Order arrived 2 days late but product quality is stellar."
Reasoning: Late delivery is negative, but stellar quality dominates sentiment.
Output: POSITIVE

Input: "App crashes every time I tap Checkout."
Reasoning: Critical feature failure preventing transaction.
Output: NEGATIVE

Input: "Product page updated."
Reasoning: Neutral factual statement with no sentiment.
Output: NEUTRAL

Input: "The setup was confusing at first, but support resolved it in 5 mins!"
Reasoning:\`;`,
          explanation: {
            en: 'Few-shot examples with reasoning paths train the model on expected decision logic.',
            vi: 'Các ví dụ Few-shot kèm chuỗi suy luận giúp mô hình học chính xác logic đưa ra quyết định.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Few-shot examples give exact formatting patterns; CoT unlocks step-by-step reasoning.', vi: 'Few-shot định hình chính xác định dạng; CoT mở khóa khả năng suy luận từng bước.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_i_2_1',
        type: 'predict_output',
        title: { en: 'Identify Prompt Technique', vi: 'Nhận Diện Kỹ Thuật Prompt' },
        instruction: {
          en: 'Adding "Let\'s think step by step to solve this logic problem" uses which prompting technique?',
          vi: 'Thêm cụm từ "Hãy suy nghĩ từng bước một để giải bài toán này" sử dụng kỹ thuật prompt nào?'
        },
        starterCode: 'phrase = "Let\'s think step by step"',
        solutionCode: 'Chain-of-Thought (CoT)',
        options: ['Zero-Shot', 'Chain-of-Thought (CoT)', 'SQL Inner Join', 'WebSockets'],
        correctOptionIndex: 1,
        explanation: {
          en: 'Instructing step-by-step reasoning triggers Chain-of-Thought activation.',
          vi: 'Yêu cầu suy luận từng bước kích hoạt kỹ thuật Chain-of-Thought.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_i_2',
      title: { en: 'Few-Shot Prompt Formatter', vi: 'Bộ Tạo Prompt Few-Shot' },
      description: {
        en: 'Write `buildFewShotPrompt(examples, query)` combining array of `{input, output}` into a formatted string.',
        vi: 'Viết `buildFewShotPrompt(examples, query)` kết hợp mảng các object `{input, output}` thành một chuỗi prompt.'
      },
      requirements: [
        { en: 'Format each example as `Input: ${ex.input}\nOutput: ${ex.output}\n`.', vi: 'Định dạng từng ví dụ dạng `Input: ${ex.input}\nOutput: ${ex.output}\n`.' },
        { en: 'Append `Input: ${query}\nOutput:` at the end.', vi: 'Nối thêm `Input: ${query}\nOutput:` ở cuối.' }
      ],
      starterCode: `function buildFewShotPrompt(examples, query) {
  // Your code here
}`,
      solutionCode: `function buildFewShotPrompt(examples, query) {
  let str = "";
  examples.forEach(ex => {
    str += \`Input: \${ex.input}\\nOutput: \${ex.output}\\n\\n\`;
  });
  str += \`Input: \${query}\\nOutput:\`;
  return str;
}`,
      hints: [
        { en: 'Loop over examples and concatenate strings.', vi: 'Dùng vòng lặp qua mảng examples và cộng chuỗi.' }
      ],
      testCases: [
        { input: '[{"input":"happy","output":"POS"}], "sad"', expectedOutput: '"Input: happy\\nOutput: POS\\n\\nInput: sad\\nOutput:"', description: 'Formats few-shot prompt' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_i_2_1',
        type: 'single_choice',
        question: {
          en: 'Why does Chain-of-Thought (CoT) prompting significantly improve accuracy on mathematical and logical reasoning tasks?',
          vi: 'Tại sao kỹ thuật Chain-of-Thought (CoT) cải thiện rõ rệt độ chính xác cho các bài toán logic và toán học?'
        },
        options: [
          { en: 'It allows the model to compute intermediate reasoning tokens before committing to a final answer', vi: 'Nó cho phép mô hình tính toán các token suy luận trung gian trước khi chốt câu trả lời cuối cùng' },
          { en: 'It doubles the computer GPU clock speed', vi: 'Nó làm tăng gấp đôi xung nhịp GPU' },
          { en: 'It clears the browser cache', vi: 'Nó xóa bộ nhớ cache trình duyệt' },
          { en: 'It deletes all user variables', vi: 'Nó xóa toàn bộ biến người dùng' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'LLMs generate text token by token. Generating intermediate steps gives the transformer computation headroom.',
          vi: 'LLM tạo ra từng token một. Việc tạo ra các bước trung gian giúp transformer có thêm không gian tính toán.'
        },
        topicId: 'prompt_engineering',
        difficulty: 'medium'
      }
    ]
  },

  // Lesson 11: JSON Generation & Schema Enforcement
  {
    id: 'ai_i_3',
    moduleId: 'ai_mod_6',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 3,
    title: {
      en: 'JSON Generation & Schema Enforcement',
      vi: 'Tạo JSON Có Cấu Trúc & Ép Cấu Trúc Schema'
    },
    summary: {
      en: 'Configure JSON Mode and JSON Schema enforcement to guarantee 100% parseable structured model outputs.',
      vi: 'Cấu hình chế độ JSON Mode và JSON Schema để đảm bảo 100% dữ liệu đầu ra đọc hiểu an toàn.'
    },
    topicId: 'structured_outputs',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'In software engineering, text output from AI is difficult to integrate reliably. Native JSON Mode and Structured Outputs enforce strict schema constraints at the token decoding level.',
        vi: 'Trong kỹ thuật phần mềm, văn bản tự do từ AI rất khó tích hợp ổn định. Chế độ JSON Mode và Structured Output ép buộc quy tắc schema ở cấp độ giải mã token.'
      },
      conceptExplanation: {
        en: '1. Plain Text AI Output: Contains conversational prefixes ("Sure, here is your JSON: ..."), breaking `JSON.parse()`.\n2. Native JSON Mode (`responseMimeType: "application/json"`): Forces the LLM to output valid JSON syntax only.\n3. Structured Outputs (`responseSchema`): Uses JSON Schema definitions to strictly mandate object keys, array types, required fields, and enums.',
        vi: '1. Phản Hồi Văn Bản Thường: Chứa câu chào mở đầu ("Chắc chắn rồi, đây là JSON: ..."), làm hỏng `JSON.parse()`.\n2. JSON Mode Bản Địa (`responseMimeType: "application/json"`): Bắt buộc LLM chỉ xuất ra cú pháp JSON hợp lệ.\n3. Structured Outputs (`responseSchema`): Sử dụng định nghĩa JSON Schema để ép buộc chính xác tên khóa, kiểu mảng, trường bắt buộc và enum.'
      },
      examples: [
        {
          title: { en: 'Configuring Structured Output Schema', vi: 'Cấu Hình Structured Output Schema' },
          code: `// Gemini / OpenAI Structured Schema Definition
const schema = {
  type: "OBJECT",
  properties: {
    userName: { type: "STRING" },
    userAge: { type: "INTEGER" },
    roles: { type: "ARRAY", items: { type: "STRING" } }
  },
  required: ["userName", "roles"]
};

// Guarantee: Output payload is guaranteed to be 100% JSON parseable!`,
          explanation: {
            en: 'Providing a strict response schema eliminates output parsing errors in backend code.',
            vi: 'Khai báo schema chặt chẽ loại bỏ hoàn toàn lỗi đọc dữ liệu trong backend.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Always use Structured Outputs / JSON Schema when integrating LLMs into software backends.', vi: 'Luôn sử dụng Structured Outputs / JSON Schema khi tích hợp LLM vào ứng dụng backend.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_i_3_1',
        type: 'predict_output',
        title: { en: 'Validate JSON Mode Advantage', vi: 'Ưu Điểm Của JSON Mode' },
        instruction: {
          en: 'Why is JSON Mode preferred over asking for JSON in free-form prompt text?',
          vi: 'Tại sao JSON Mode được ưu tiên hơn việc hỏi JSON trong văn bản prompt thông thường?'
        },
        starterCode: 'setting = "JSON Mode vs Free Text Prompt"',
        solutionCode: 'Guarantees valid syntax without markdown conversational wrapper text',
        options: [
          'Guarantees valid syntax without markdown conversational wrapper text',
          'Makes the website load in dark mode',
          'Replaces Node.js with Python',
          'Makes the database faster'
        ],
        correctOptionIndex: 0,
        explanation: {
          en: 'JSON Mode constrains token decoding to valid JSON characters.',
          vi: 'JSON Mode ràng buộc việc giải mã token chỉ tạo ra các ký tự JSON hợp lệ.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_i_3',
      title: { en: 'Safe JSON Output Extractor', vi: 'Hàm Tách Trích JSON An Toàn' },
      description: {
        en: 'Write `safeParseAIJson(rawOutput)` that strips markdown code fences (` ```json ... ``` `) and returns parsed object, or null if invalid.',
        vi: 'Viết `safeParseAIJson(rawOutput)` loại bỏ khung markdown code (` ```json ... ``` `) và trả về object đã parse, hoặc null nếu lỗi.'
      },
      requirements: [
        { en: 'Strip leading/trailing markdown code block tags.', vi: 'Loại bỏ các thẻ markdown code block ở đầu và cuối.' },
        { en: 'Parse using JSON.parse() inside a try-catch block.', vi: 'Parse bằng JSON.parse() bên trong khối try-catch.' }
      ],
      starterCode: `function safeParseAIJson(rawOutput) {
  // Your code here
}`,
      solutionCode: `function safeParseAIJson(rawOutput) {
  try {
    let clean = rawOutput.trim();
    if (clean.startsWith("\`\`\`json")) {
      clean = clean.replace(/^\`\`\`json\\s*/, "").replace(/\\s*\`\`\`$/, "");
    } else if (clean.startsWith("\`\`\`")) {
      clean = clean.replace(/^\`\`\`\\s*/, "").replace(/\\s*\`\`\`$/, "");
    }
    return JSON.parse(clean);
  } catch (e) {
    return null;
  }
}`,
      hints: [
        { en: 'Use String.prototype.replace() with regular expressions and JSON.parse() inside try/catch.', vi: 'Dùng String.prototype.replace() và JSON.parse() trong try/catch.' }
      ],
      testCases: [
        { input: '"\`\`\`json\\n{\\"status\\": \\"ok\\"}\\n\`\`\`"', expectedOutput: '{"status":"ok"}', description: 'Strips markdown code fence and parses JSON' },
        { input: '"Invalid raw string"', expectedOutput: 'null', description: 'Handles invalid JSON safely' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_i_3_1',
        type: 'single_choice',
        question: {
          en: 'In structured output configuration, what is the role of the `required` array in a JSON Schema?',
          vi: 'Trong cấu hình output, vai trò của mảng `required` trong JSON Schema là gì?'
        },
        options: [
          { en: 'Specifies which object property keys MUST be present in the generated JSON response', vi: 'Quy định các khóa thuộc tính BẮT BUỘC phải có trong kết quả JSON tạo ra' },
          { en: 'Encrypts the payload with SSL', vi: 'Mã hóa dữ liệu bằng SSL' },
          { en: 'Forces the model to output German text', vi: 'Bắt buộc mô hình xuất ra tiếng Đức' },
          { en: 'Deletes optional database columns', vi: 'Xóa các cột cơ sở dữ liệu tùy chọn' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'The required array ensures mandatory fields are never omitted by the model.',
          vi: 'Mảng required đảm bảo các trường quan trọng không bao giờ bị mô hình bỏ sót.'
        },
        topicId: 'structured_outputs',
        difficulty: 'medium'
      }
    ]
  },

  // Lesson 12: Constrained Output Parsing
  {
    id: 'ai_i_4',
    moduleId: 'ai_mod_6',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 4,
    title: {
      en: 'Constrained Output Parsing',
      vi: 'Xử Lý & Kiểm Duyệt Đầu Ra Cấu Trúc Phức Tạp'
    },
    summary: {
      en: 'Implement robust defensive parsing, retry loops, and schema validation libraries (like Zod) for AI outputs.',
      vi: 'Triển khai kỹ thuật xử lý phòng thủ, vòng lặp tự sửa lỗi (retry loop) và kiểm duyệt schema (Zod).'
    },
    topicId: 'structured_outputs',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'Even with JSON mode, an AI output might produce incorrect types or miss logic constraints (e.g., negative age). Defensive runtime validation ensures zero bad data hits production databases.',
        vi: 'Ngay cả khi dùng JSON mode, AI có thể trả về sai kiểu dữ liệu hoặc vi phạm logic (như tuổi âm). Kiểm duyệt runtime giúp ngăn dữ liệu rác lưu vào CSDL.'
      },
      conceptExplanation: {
        en: '1. Runtime Schema Validation: Validating generated JSON objects against schemas (e.g., Zod, Ajv, TypeBox).\n2. Error Feedback Retry Loop: If validation fails, sending the validation error message back to the LLM so it can self-correct in a second attempt.\n3. Fallback Defaults: Gracefully substituting safe fallback values for non-critical missing fields.',
        vi: '1. Kiểm Duyệt Runtime: Đối chiếu JSON tạo ra với schema (dùng Zod, Ajv, TypeBox).\n2. Vòng Lặp Phản Hồi Lỗi (Self-Correction Loop): Nếu validation thất bại, gửi lại thông báo lỗi cho LLM để nó tự sửa lỗi ở lần gọi thứ 2.\n3. Giá Trị Mặc Định Dự Phòng: Tự động điền giá trị an toàn cho các trường phụ bị thiếu.'
      },
      examples: [
        {
          title: { en: 'Self-Correction Retry Loop Pattern', vi: 'Mô Hình Vòng Lặp Tự Sửa Lỗi (Retry Loop)' },
          code: `async function generateValidData(prompt, schemaValidator, maxRetries = 2) {
  let currentPrompt = prompt;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const rawText = await callLlmApi(currentPrompt);
    const parsed = safeParseAIJson(rawText);
    const validation = schemaValidator.safeParse(parsed);
    
    if (validation.success) return validation.data;
    
    // Self-correction feedback loop
    currentPrompt += \`\\nYour previous output had schema errors: \${validation.error}. Correct this JSON.\`;
  }
  throw new Error("Failed to produce valid JSON after retries.");
}`,
          explanation: {
            en: 'Feeding validation errors back to the model resolves 99%+ of edge-case output format issues.',
            vi: 'Gửi báo cáo lỗi validation ngược lại cho mô hình giúp giải quyết >99% lỗi định dạng.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Combine JSON Mode with runtime schema validation and error-feedback retries.', vi: 'Kết hợp JSON Mode với kiểm duyệt schema runtime và vòng lặp tự sửa lỗi.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_i_4_1',
        type: 'predict_output',
        title: { en: 'Validate Self-Correction Loop', vi: 'Đánh Giá Vòng Lặp Tự Sửa Lỗi' },
        instruction: {
          en: 'What should be sent back to the LLM when runtime schema validation fails?',
          vi: 'Cần gửi lại thông tin gì cho LLM khi quá trình kiểm duyệt schema ở runtime bị lỗi?'
        },
        starterCode: 'event = "Runtime Validation Error"',
        solutionCode: 'The specific schema error message and instruction to correct the JSON',
        options: [
          'The specific schema error message and instruction to correct the JSON',
          'A blank string',
          'A random SQL query',
          'An image of a cat'
        ],
        correctOptionIndex: 0,
        explanation: {
          en: 'Providing specific validation error messages enables targeted self-correction.',
          vi: 'Cung cấp thông tin lỗi chi tiết giúp LLM tự sửa đúng trọng tâm.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_i_4',
      title: { en: 'Schema Field Normalizer', vi: 'Chuẩn Hóa Trường Schema' },
      description: {
        en: 'Write `normalizeUserData(data)` that validates `data.age` is a positive number (defaults to 18 if negative/missing) and `data.roles` is an array (defaults to ["user"] if missing).',
        vi: 'Viết `normalizeUserData(data)` đảm bảo `data.age` là số dương (mặc định 18 nếu âm/thiếu) và `data.roles` là mảng (mặc định ["user"] nếu thiếu).'
      },
      requirements: [
        { en: 'Ensure age >= 0 and is numeric; else set age = 18.', vi: 'Đảm bảo age >= 0 và là số; nếu không gán age = 18.' },
        { en: 'Ensure Array.isArray(roles); else set roles = ["user"].', vi: 'Đảm bảo Array.isArray(roles); nếu không gán roles = ["user"].' }
      ],
      starterCode: `function normalizeUserData(data) {
  // Your code here
}`,
      solutionCode: `function normalizeUserData(data) {
  const obj = { ...data };
  if (typeof obj.age !== "number" || obj.age < 0) {
    obj.age = 18;
  }
  if (!Array.isArray(obj.roles)) {
    obj.roles = ["user"];
  }
  return obj;
}`,
      hints: [
        { en: 'Use typeof checks and Array.isArray().', vi: 'Sử dụng typeof và Array.isArray().' }
      ],
      testCases: [
        { input: '{"age": -5}', expectedOutput: '{"age":18,"roles":["user"]}', description: 'Normalizes invalid age and missing roles' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_i_4_1',
        type: 'single_choice',
        question: {
          en: 'What is the primary purpose of runtime schema validation (e.g. Zod) in an AI pipeline?',
          vi: 'Mục đích chính của kiểm duyệt schema runtime (như Zod) trong quy trình AI là gì?'
        },
        options: [
          { en: 'Guarantees type safety and validates business logic constraints before data persists', vi: 'Đảm bảo an toàn kiểu dữ liệu và kiểm tra logic kinh doanh trước khi lưu vào CSDL' },
          { en: 'Speeds up internet connection', vi: 'Tăng tốc độ mạng internet' },
          { en: 'Generates CSS gradients', vi: 'Tạo dải màu CSS' },
          { en: 'Compiles C++ code', vi: 'Biên dịch code C++' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Runtime schema validation acts as a strict firewall between LLM outputs and backend databases.',
          vi: 'Runtime schema validation đóng vai trò như bức tường lửa giữa LLM và CSDL.'
        },
        topicId: 'structured_outputs',
        difficulty: 'medium'
      }
    ]
  },

  // Lesson 13: AI for Coding, Refactoring & Debugging
  {
    id: 'ai_i_5',
    moduleId: 'ai_mod_7',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 5,
    title: {
      en: 'AI for Coding, Refactoring & Debugging',
      vi: 'AI Cho Lập Trình, Tối Ưu Code & Sửa Lỗi (Debugging)'
    },
    summary: {
      en: 'Leverage AI for code generation, automated unit test writing, refactoring legacy code, and root-cause bug analysis.',
      vi: 'Khai thác AI để tạo code, viết unit test tự động, refactor code cũ và phân tích nguyên nhân gốc của lỗi.'
    },
    topicId: 'ai_productivity',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'AI pair programming transforms software engineering workflows when developers use grounded context, error stack traces, and test-driven prompts.',
        vi: 'Trợ lý lập trình AI làm thay đổi quy trình phát triển phần mềm khi lập trình viên cung cấp ngữ cảnh code, mã lỗi stack trace và prompt dạng Test-Driven.'
      },
      conceptExplanation: {
        en: '1. Context Ingestion: Provide exact function signatures, imports, and interface definitions.\n2. Bug Hunting with Stack Traces: Paste complete runtime error stack traces along with relevant source files.\n3. Automated Test Synthesis: Ask the model to generate edge-case unit test suites for functions.\n4. Code Refactoring: Refactoring spaghetti imperative loops into modern declarative immutable code.',
        vi: '1. Cung Cấp Ngữ Cảnh: Đưa vào signature hàm, file import và định nghĩa interface.\n2. Sửa Lỗi Với Stack Trace: Dán toàn bộ mã lỗi rà soát (stack trace) kèm file source code liên quan.\n3. Tạo Unit Test Tự Động: Yêu cầu AI sinh ra bộ test case cho các trường hợp biên.\n4. Refactor Code: Chuyển đổi các đoạn code lồng nhau phức tạp sang phong cách gọn gàng, bất biến.'
      },
      examples: [
        {
          title: { en: 'Effective Debugging Prompt Structure', vi: 'Cấu Trúc Prompt Debug Hiệu Quả' },
          code: `const debugPrompt = \`
[TASK]: Identify the cause of the TypeError in this Node.js handler.
[STACK TRACE]:
TypeError: Cannot read properties of undefined (reading 'id')
    at processOrder (/app/server.js:42:18)

[SOURCE CODE]:
function processOrder(req) {
  const userId = req.body.user.id; // Bug here if req.body.user is missing!
  return saveToDb(userId);
}

[REQUIREMENT]: Fix the bug using optional chaining and throw a 400 bad request error if user is missing.
\`;`,
          explanation: {
            en: 'Combining stack traces with exact code lines allows the AI to immediately locate and fix bugs.',
            vi: 'Kết hợp stack trace với vị trí code cụ thể giúp AI tìm ra và sửa lỗi ngay lập tức.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Provide error stack traces and exact interfaces for high-precision code fixes.', vi: 'Cung cấp mã lỗi stack trace và interface cụ thể để AI sửa code chính xác nhất.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_i_5_1',
        type: 'predict_output',
        title: { en: 'Best Debugging Practice', vi: 'Thực Hành Debug Tốt Nhất' },
        instruction: {
          en: 'What information produces the highest accuracy when asking AI to fix a runtime bug?',
          vi: 'Thông tin nào giúp AI sửa lỗi runtime đạt độ chính xác cao nhất?'
        },
        starterCode: 'prompt_data = "Debugging assistance request"',
        solutionCode: 'Exact source code snippet + full runtime stack trace + expected behavior',
        options: [
          'Just saying "My app is broken fix it"',
          'Exact source code snippet + full runtime stack trace + expected behavior',
          'A picture of your desk',
          'Your Wi-Fi password'
        ],
        correctOptionIndex: 1,
        explanation: {
          en: 'Source code + stack trace + expected behavior provides complete debugging context.',
          vi: 'Source code + stack trace + kết quả mong muốn cung cấp đầy đủ ngữ cảnh để debug.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_i_5',
      title: { en: 'Unit Test Prompt Generator', vi: 'Bộ Tạo Prompt Viết Unit Test' },
      description: {
        en: 'Write `createTestPrompt(functionCode, framework)` that generates a prompt asking for unit tests using specified framework (e.g., "Vitest" or "Jest").',
        vi: 'Viết `createTestPrompt(functionCode, framework)` tạo prompt yêu cầu viết unit test theo framework chỉ định ("Vitest" hoặc "Jest").'
      },
      requirements: [
        { en: 'Return string formatted with framework name and function code.', vi: 'Trả về chuỗi prompt chứa tên framework và đoạn code hàm.' }
      ],
      starterCode: `function createTestPrompt(functionCode, framework) {
  // Your code here
}`,
      solutionCode: `function createTestPrompt(functionCode, framework) {
  return \`Write comprehensive unit tests using \${framework} for this code:\\n\\n\${functionCode}\`;
}`,
      hints: [
        { en: 'Use template literals.', vi: 'Sử dụng template literals.' }
      ],
      testCases: [
        { input: '"function add(a,b){return a+b;}", "Vitest"', expectedOutput: '"Write comprehensive unit tests using Vitest for this code:\\n\\nfunction add(a,b){return a+b;}"', description: 'Generates unit test prompt' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_i_5_1',
        type: 'single_choice',
        question: {
          en: 'When using AI to refactor legacy code, what is the best practice to prevent regressions?',
          vi: 'Khi dùng AI để refactor code cũ, thực hành tốt nhất để tránh làm hỏng tính năng hiện tại là gì?'
        },
        options: [
          { en: 'Run automated unit tests before and after the refactoring to verify behavioral parity', vi: 'Chạy bộ unit test tự động trước và sau khi refactor để đảm bảo tính năng không đổi' },
          { en: 'Never test the code at all', vi: 'Không bao giờ chạy test code' },
          { en: 'Delete all test files', vi: 'Xóa toàn bộ các file test' },
          { en: 'Deploy directly to production without reading the code', vi: 'Deploy trực tiếp lên production mà không cần đọc lại code' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Automated tests verify that refactored code preserves identical functionality.',
          vi: 'Unit test tự động giúp đảm bảo code sau khi refactor vẫn giữ nguyên tính năng ban đầu.'
        },
        topicId: 'ai_productivity',
        difficulty: 'easy'
      }
    ]
  },

  // Lesson 14: AI for Research, Summarization & Analysis
  {
    id: 'ai_i_6',
    moduleId: 'ai_mod_7',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 6,
    title: {
      en: 'AI for Research, Summarization & Analysis',
      vi: 'AI Cho Nghiên Cứu, Tóm Tắt & Phân Tích Dữ Liệu'
    },
    summary: {
      en: 'Process long documents, summarize complex technical papers, extract key data points, and synthesize multi-source reports.',
      vi: 'Xử lý tài liệu dài, tóm tắt báo cáo kỹ thuật phức tạp, trích xuất thông tin trọng tâm và tổng hợp báo cáo đa nguồn.'
    },
    topicId: 'ai_productivity',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'With large context windows (100k+ tokens), LLMs excel at processing entire technical manuals, financial quarterly reports, and legal documents in a single prompt.',
        vi: 'Với cửa sổ ngữ cảnh lớn (100k+ token), LLM vượt trội trong việc xử lý toàn bộ tài liệu kỹ thuật, báo cáo tài chính quý và hợp đồng pháp lý trong một lần prompt.'
      },
      conceptExplanation: {
        en: '1. Document Ingestion: Passing raw text or markdown extracted from PDFs/HTML into prompt context.\n2. Executive Summarization: Extraction of key takeaways, action items, and numeric tables.\n3. Map-Reduce Summarization Pattern: For documents exceeding context limits, summarize sections individually (Map), then combine summaries into a final synthesis (Reduce).\n4. Grounded Citation Extraction: Requiring the model to cite specific paragraph numbers or quotes for every claim.',
        vi: '1. Nạp Tài Liệu: Truyền văn bản thô/markdown trích xuất từ PDF/HTML vào ngữ cảnh prompt.\n2. Tóm Tắt Điều Hành: Trích xuất các điểm chính, công việc cần làm (action items) và bảng số liệu.\n3. Mô Hình Map-Reduce Tóm Tắt: Với tài liệu vượt quá cửa sổ ngữ cảnh, tóm tắt từng phần riêng lẻ (Map), sau đó tổng hợp lại (Reduce).\n4. Trích Xuất Dẫn Chứng: Yêu cầu mô hình dẫn lại chính xác số đoạn hoặc câu trích dẫn cho từng luận điểm.'
      },
      examples: [
        {
          title: { en: 'Executive Summary Prompt Template', vi: 'Mẫu Prompt Tóm Tắt Điều Hành' },
          code: `const researchPrompt = \`
Analyze the attached document and provide:
1. EXECUTIVE SUMMARY: 3 bullet points outlining core decisions.
2. METRICS TABLE: Markdown table of all mentioned financial figures.
3. RISKS & WARNINGS: Bullet list of identified operational risks.
4. CITATIONS: Direct quote for each risk identified.

DOCUMENT:
\${rawDocumentText}
\`;`,
          explanation: {
            en: 'Structuring output into explicit sections ensures clean, actionable research summaries.',
            vi: 'Cấu hình kết quả ra thành các phần rõ ràng giúp bản tóm tắt nghiên cứu dễ đọc và sử dụng.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Use structured sections and direct citations when summarizing large research documents.', vi: 'Sử dụng các phần cấu trúc và trích dẫn trực tiếp khi tóm tắt tài liệu nghiên cứu lớn.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_i_6_1',
        type: 'predict_output',
        title: { en: 'Identify Summarization Pattern', vi: 'Mô Hình Tóm Tắt Khi Vượt Context' },
        instruction: {
          en: 'Which design pattern handles summarization when a document exceeds the model maximum context window?',
          vi: 'Mô hình thiết kế nào xử lý tóm tắt khi tài liệu vượt quá cửa sổ ngữ cảnh tối đa của mô hình?'
        },
        starterCode: 'challenge = "Document larger than context window"',
        solutionCode: 'Map-Reduce Pattern (Summarize chunks then synthesize)',
        options: [
          'Map-Reduce Pattern (Summarize chunks then synthesize)',
          'Binary Search Tree',
          'CSS Flexbox Column',
          'SQL GROUP BY'
        ],
        correctOptionIndex: 0,
        explanation: {
          en: 'Map-Reduce divides document chunks, summarizes each (Map), and synthesizes them (Reduce).',
          vi: 'Map-Reduce chia nhỏ tài liệu, tóm tắt từng phần (Map), rồi tổng hợp lại (Reduce).'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_i_6',
      title: { en: 'Text Chunk Splitter', vi: 'Hàm Chia Nhỏ Đoạn Văn Bản (Chunking)' },
      description: {
        en: 'Write `chunkText(text, maxChars)` that splits a long string into an array of substrings each at most `maxChars` length.',
        vi: 'Viết `chunkText(text, maxChars)` chia chuỗi văn bản dài thành một mảng các chuỗi con có độ dài tối đa `maxChars`.'
      },
      requirements: [
        { en: 'Return array of string chunks.', vi: 'Trả về mảng các đoạn văn bản (string chunks).' }
      ],
      starterCode: `function chunkText(text, maxChars) {
  // Your code here
}`,
      solutionCode: `function chunkText(text, maxChars) {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxChars) {
    chunks.push(text.slice(i, i + maxChars));
  }
  return chunks;
}`,
      hints: [
        { en: 'Use a for loop stepping by maxChars and String.prototype.slice().', vi: 'Dùng vòng lặp for tăng bước maxChars và dùng slice().' }
      ],
      testCases: [
        { input: '"abcdefghij", 4', expectedOutput: '["abcd","efgh","ij"]', description: 'Splits text into 4-char chunks' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_i_6_1',
        type: 'single_choice',
        question: {
          en: 'In research analysis prompts, why is asking for "Direct Citations / Quotes" helpful?',
          vi: 'Trong prompt phân tích nghiên cứu, tại sao yêu cầu "Dẫn chứng / Trích dẫn trực tiếp" lại hữu ích?'
        },
        options: [
          { en: 'It forces the model to ground its claims in explicit text snippets from the source document', vi: 'Nó bắt buộc mô hình phải căn cứ thông tin trên các đoạn văn bản thực tế từ tài liệu gốc' },
          { en: 'It turns the document into an MP3 file', vi: 'Nó chuyển tài liệu thành file MP3' },
          { en: 'It encrypts the output text', vi: 'Nó mã hóa văn bản xuất ra' },
          { en: 'It speeds up CPU fan speed', vi: 'Nó làm tăng tốc độ quạt CPU' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Requiring exact quotes prevents the model from synthesizing ungrounded claims.',
          vi: 'Yêu cầu trích dẫn chính xác ngăn mô hình đưa ra các khẳng định không có căn cứ.'
        },
        topicId: 'ai_productivity',
        difficulty: 'easy'
      }
    ]
  },

  // Lesson 15: Agentic Concepts & Workflows
  {
    id: 'ai_i_7',
    moduleId: 'ai_mod_8',
    levelId: 'intermediate',
    courseId: 'ai',
    order: 7,
    title: {
      en: 'Agentic Concepts & Workflows',
      vi: 'Khái Niệm Agentic & Quy Trình Tự Động'
    },
    summary: {
      en: 'Understand Autonomous AI Agents: Planning, Short/Long-term Memory, Tool Usage, and Human-in-the-Loop patterns.',
      vi: 'Hiểu về Autonomous AI Agent: Lập kế hoạch (Planning), Bộ nhớ ngắn/dài hạn, Sử dụng công cụ và Human-in-the-Loop.'
    },
    topicId: 'agentic_workflows',
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'An AI Agent extends a basic LLM by giving it the ability to plan multi-step goals, execute external tools (APIs, web browsers, databases), and maintain persistent state/memory.',
        vi: 'AI Agent mở rộng LLM bằng cách cấp khả năng tự lập kế hoạch đa bước, thi hành các công cụ bên ngoài (API, trình duyệt, CSDL) và duy trì trạng thái/bộ nhớ.'
      },
      conceptExplanation: {
        en: '1. Agent Loop Architecture: Perception -> Planning (Reasoning) -> Tool Selection -> Execution -> Observation -> Reflection.\n2. Core Components:\n   - Planning: Breaking complex goal into sequential sub-tasks (e.g., ReAct - Reason + Act).\n   - Memory: Short-term (conversation context window) & Long-term (vector database embedding retrieval).\n   - Tools: Functions the agent can trigger (e.g. `searchGoogle()`, `sendEmail()`, `executeSql()`).\n3. Human-in-the-Loop (HITL): Requesting human approval before executing sensitive tools (e.g., executing financial transfers or deleting DB tables).',
        vi: '1. Vòng Lặp Agent: Nhận biết -> Lập kế hoạch -> Chọn công cụ -> Thi hành -> Quan sát -> Tự ngẫm (Reflection).\n2. Thành Phần Cốt Lõi:\n   - Planning: Chia nhỏ mục tiêu thành các bước phụ (mô hình ReAct - Reason + Act).\n   - Memory: Ngắn hạn (ngữ cảnh chat) & Dài hạn (truy xuất Vector DB).\n   - Tools: Các hàm agent có thể gọi (`searchGoogle()`, `sendEmail()`, `executeSql()`).\n3. Human-in-the-Loop (HITL): Yêu cầu người dùng phê duyệt trước khi thi hành các công cụ nhạy cảm (như chuyển tiền hoặc xóa CSDL).'
      },
      examples: [
        {
          title: { en: 'ReAct Agent Loop Pseudocode', vi: 'Mã Giả Vòng Lặp ReAct Agent' },
          code: `// ReAct Loop (Reasoning + Acting)
while (!goalAchieved && stepCount < maxSteps) {
  const thought = await llm.reason(history, goal);
  if (thought.isFinished) return thought.finalAnswer;
  
  // Select and execute tool
  const toolResult = await executeTool(thought.selectedTool, thought.toolArgs);
  
  // Append observation to memory
  history.push({ thought, observation: toolResult });
  stepCount++;
}`,
          explanation: {
            en: 'The agent continuously reasons, invokes tools, observes results, and iterates until goal completion.',
            vi: 'Agent liên tục suy luận, gọi công cụ, quan sát kết quả và lặp lại cho tới khi hoàn thành mục tiêu.'
          }
        }
      ],
      keyTakeaways: [
        { en: 'Agents combine LLM reasoning with Planning, Memory, Tool execution, and Human-in-the-loop safeguards.', vi: 'Agent kết hợp tư duy LLM với Lập kế hoạch, Bộ nhớ, Công cụ và cơ chế bảo vệ Human-in-the-loop.' }
      ]
    },
    exercisePool: [
      {
        id: 'ex_ai_i_7_1',
        type: 'predict_output',
        title: { en: 'Identify Agent Component', vi: 'Nhận Diện Thành Phần Agent' },
        instruction: {
          en: 'Requiring a manager to click "Approve" before an AI agent sends $10,000 is an example of what safety pattern?',
          vi: 'Yêu cầu quản lý nhấn "Approve" trước khi AI agent chuyển khoản $10,000 là ví dụ của cơ chế an toàn nào?'
        },
        starterCode: 'pattern = "Requiring human confirmation for sensitive tool execution"',
        solutionCode: 'Human-in-the-Loop (HITL)',
        options: ['Human-in-the-Loop (HITL)', 'Infinite Loop', 'Recursion Error', 'Buffer Overflow'],
        correctOptionIndex: 0,
        explanation: {
          en: 'Human-in-the-Loop inserts mandatory human verification before high-risk actions.',
          vi: 'Human-in-the-Loop thêm bước xác nhận của con người trước các hành động rủi ro cao.'
        }
      }
    ],
    challenge: {
      id: 'ch_ai_i_7',
      title: { en: 'Tool Execution Decision Router', vi: 'Bộ Điều Hướng Thi Hành Công Cụ' },
      description: {
        en: 'Write `shouldRequireHumanApproval(toolName)` returning true for "deleteDatabase" or "sendPayment", and false for "readDoc" or "searchWeb".',
        vi: 'Viết `shouldRequireHumanApproval(toolName)` trả về true cho "deleteDatabase" hoặc "sendPayment", và false cho "readDoc" hoặc "searchWeb".'
      },
      requirements: [
        { en: 'Return true for sensitive action names.', vi: 'Trả về true cho các tên công cụ nhạy cảm.' },
        { en: 'Return false for safe read-only tools.', vi: 'Trả về false cho các công cụ đọc dữ liệu an toàn.' }
      ],
      starterCode: `function shouldRequireHumanApproval(toolName) {
  // Your code here
}`,
      solutionCode: `function shouldRequireHumanApproval(toolName) {
  const sensitiveTools = ["deleteDatabase", "sendPayment", "transferFunds"];
  return sensitiveTools.includes(toolName);
}`,
      hints: [
        { en: 'Check if toolName exists in a list of sensitive strings.', vi: 'Kiểm tra toolName có nằm trong danh sách chuỗi nhạy cảm hay không.' }
      ],
      testCases: [
        { input: '"sendPayment"', expectedOutput: 'true', description: 'Requires approval for payment' },
        { input: '"searchWeb"', expectedOutput: 'false', description: 'Auto-approves safe read search tool' }
      ]
    },
    quizQuestionPool: [
      {
        id: 'q_ai_i_7_1',
        type: 'single_choice',
        question: {
          en: 'What is the primary role of the ReAct (Reason + Act) framework in AI Agents?',
          vi: 'Vai trò chính của mô hình ReAct (Reason + Act) trong AI Agent là gì?'
        },
        options: [
          { en: 'Interleaves reasoning thoughts with tool execution actions to solve multi-step problems', vi: 'Kết hợp đan xen giữa các bước suy luận và hành động gọi công cụ để giải quyết bài toán phức tạp' },
          { en: 'Replaces React.js UI framework', vi: 'Thay thế thư viện giao diện React.js' },
          { en: 'Formats CSS stylesheets', vi: 'Định dạng các file CSS' },
          { en: 'Deletes temporary system cache files', vi: 'Xóa các file cache hệ thống tạm thời' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'ReAct loops enable agents to think, invoke tools, inspect results, and adjust plans iteratively.',
          vi: 'Vòng lặp ReAct cho phép agent vừa tư duy, vừa gọi công cụ, đọc kết quả và điều chỉnh kế hoạch.'
        },
        topicId: 'agentic_workflows',
        difficulty: 'medium'
      }
    ]
  }
];
