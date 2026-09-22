import { Book } from '../../types';

export const AI_AGENT_PATTERNS_BOOK: Book = {
  id: 'ai-agent-patterns',
  slug: 'ai-agent-patterns',
  title: 'Autonomous AI Agent Architecture',
  subtitle: {
    en: 'ReAct Framework, Tool Use, Planning & Multi-Agent Orchestration',
    vi: 'Khung ReAct, Tự Động Dùng Tool, Lập Kế Hoạch & Điều Phối Multi-Agent',
  },
  bookType: 'Patterns / Recipes',
  categoryId: 'ai',
  subjectId: 'ai',
  author: '4TM Technical Board',
  role: 'AI Systems & Autonomous Agents Architecture Group',
  level: 'Intermediate to Advanced',
  estimatedReadTime: '35 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-18',
  accentColor: 'from-fuchsia-600 to-indigo-900',
  tags: ['AI Agents', 'ReAct', 'Tool Use', 'Multi-Agent', 'Patterns', 'Orchestration'],
  description: {
    en: 'Production-grade architectural patterns for autonomous AI agents: the ReAct (Reasoning + Acting) state machine loop, structured tool contracts, max-iteration guardrails, and hierarchical multi-agent supervisor orchestration.',
    vi: 'Các mẫu kiến trúc thực chiến cho hệ thống AI Agent tự hành: máy trạng thái vòng lặp ReAct (Suy luận + Hành động), ràng buộc hợp đồng tool gọi hàm, giới hạn số vòng lặp tối đa và điều phối phân cấp mô hình Supervisor.',
  },
  prerequisites: {
    en: [
      'Understanding of LLM function calling and structured JSON output',
      'Familiarity with state machines, asynchronous loops, and API error handling',
    ],
    vi: [
      'Hiểu biết về cơ chế function calling và xuất dữ liệu JSON có cấu trúc trong LLM',
      'Quen thuộc với máy trạng thái (state machine), vòng lặp bất đồng bộ và xử lý lỗi API',
    ],
  },
  outcomes: {
    en: [
      'Implement deterministic ReAct execution loops with strict state transitions',
      'Enforce input/output JSON schemas and error reflection on tool dispatching',
      'Deploy application-level safeguards including max-iteration limits and early exits',
      'Design hierarchical multi-agent supervisor systems that isolate tool contexts and eliminate prompt dilution',
    ],
    vi: [
      'Hiện thực vòng lặp thực thi ReAct tất định với các bước chuyển trạng thái chặt chẽ',
      'Bắt buộc áp dụng JSON schema cho tham số tool và cơ chế phản tư khi công cụ trả về lỗi',
      'Thiết lập rào chắn an toàn tầng ứng dụng gồm giới hạn số vòng lặp và điều kiện thoát sớm',
      'Thiết kế hệ thống multi-agent phân cấp dạng Supervisor giúp cô lập ngữ cảnh tool và chống loãng prompt',
    ],
  },
  chapters: [
    {
      id: 'aap-ch-1',
      number: 1,
      slug: 'react-loop-and-tool-calling',
      title: {
        en: 'The ReAct (Reasoning + Acting) Execution Loop',
        vi: 'Vòng Lặp Thực Thi ReAct (Reasoning + Acting)',
      },
      summary: {
        en: 'Explicit Thought-Action-Observation state machine transitions, structured tool contracts, and max-iteration guardrails.',
        vi: 'Chuyển trạng thái rõ ràng giữa Suy luận - Hành động - Quan sát, ràng buộc tool có cấu trúc và giới hạn số vòng lặp tối đa.',
      },
      readTimeMinutes: 18,
      sections: [
        {
          id: 'aap-1-1',
          title: {
            en: 'ReAct State Machine: Reasoning + Acting Execution Cycles',
            vi: 'Kiến Trúc Máy Trạng Thái ReAct: Vòng Lặp Suy Luận & Hành Động',
          },
          content: {
            en: 'Direct tool calling without explicit intermediate reasoning frequently suffers from error cascading: when an LLM directly generates a tool call without verbalizing its reasoning, it cannot self-correct upon receiving ambiguous or malformed arguments. The ReAct (Reasoning + Acting) pattern fundamentally resolves this by decoupling the agent lifecycle into an explicit, deterministic state machine executing alternating cycles of Thought (internal reasoning), Action (tool selection and invocation), and Observation (tool response ingestion). The application runtime orchestrates these steps in an external control loop, injecting observations back into the context window until a termination condition or max-iteration threshold is satisfied.',
            vi: 'Gọi công cụ trực tiếp mà không có bước suy luận trung gian thường dẫn đến lỗi dây chuyền: khi LLM gọi tool ngay lập tức mà không diễn giải tư duy, nó không thể tự sửa sai nếu tham số bị mơ hồ hoặc phản hồi trả về không như mong đợi. Pattern ReAct (Reasoning + Acting) giải quyết triệt để vấn đề này bằng cách phân tách vòng đời của agent thành một máy trạng thái tất định thực thi luân phiên các chu kỳ: Thought (Suy luận nội tại), Action (Chọn và kích hoạt tool) và Observation (Thu nhận kết quả tool). Bộ điều khiển tầng ứng dụng điều phối các bước này trong vòng lặp ngoài, nạp kết quả quan sát trở lại ngữ cảnh cho đến khi thỏa mãn điều kiện dừng hoặc chạm ngưỡng vòng lặp tối đa.',
          },
          keyIdea: {
            en: 'Never let an agent loop indefinitely or call tools without explicit reasoning traces. Enforce an external state machine alternating Thought -> Action -> Observation with rigid max-iteration boundaries.',
            vi: 'Tuyệt đối không để agent chạy vòng lặp vô tận hoặc gọi công cụ mà không diễn giải tư duy. Bắt buộc dùng máy trạng thái tầng ứng dụng luân phiên Suy luận -> Hành động -> Quan sát kèm giới hạn vòng lặp nghiêm ngặt.',
          },
          patternDetails: {
            problem: {
              en: 'Direct tool execution without explicit intermediate reasoning leads to compounding hallucinations, brittle parameter generation, and infinite execution loops when external APIs return errors.',
              vi: 'Thực thi tool trực tiếp mà không có suy luận trung gian dẫn đến ảo giác tích tụ, sinh tham số thiếu ổn định và rơi vào vòng lặp vô tận khi API ngoài trả về lỗi.',
            },
            context: {
              en: 'Complex workflows requiring multi-step computational reasoning, database lookups, external REST API invocations, and interactive problem solving.',
              vi: 'Các luồng xử lý phức tạp đòi hỏi suy luận tính toán nhiều bước, tra cứu cơ sở dữ liệu, gọi API REST bên ngoài và giải quyết vấn đề theo ngữ cảnh tương tác.',
            },
            solutionOverview: {
              en: 'Construct an application-level state machine that requires the LLM to emit a Thought block explaining its intent before selecting an Action with structured arguments, executes the tool safely on the server, feeds the Observation back into context, and enforces a hard ceiling of N iterations.',
              vi: 'Xây dựng máy trạng thái ở tầng ứng dụng bắt buộc LLM phải xuất khối Thought diễn giải ý định trước khi chọn Action với tham số chuẩn, thực thi tool an toàn trên server, nạp lại Observation vào prompt và chặn cứng tại ngưỡng N vòng lặp.',
            },
            architectureDiagram: {
              title: {
                en: 'ReAct Agent State Machine Lifecycle',
                vi: 'Vòng Đời Máy Trạng Thái Của ReAct Agent',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'User Query & State Ingestion', vi: 'Tiếp Nhận Yêu Cầu & Khởi Tạo Trạng Thái' },
                  description: {
                    en: 'Application loads system instructions, available tool definitions, and user prompt into the active state context.',
                    vi: 'Ứng dụng nạp system prompt, danh sách khai báo tool khả dụng và câu hỏi người dùng vào ngữ cảnh trạng thái ban đầu.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Reasoning Phase (Thought)', vi: 'Giai Đoạn Suy Luận (Thought)' },
                  description: {
                    en: 'Model generates internal reasoning trace evaluating current state, deciding whether more data is required or final answer can be emitted.',
                    vi: 'Mô hình sinh suy luận nội tại đánh giá trạng thái hiện thời, quyết định cần thêm dữ liệu hay đã đủ cơ sở để trả lời.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Action Dispatch (Tool Call)', vi: 'Giai Đoạn Hành Động (Action)' },
                  description: {
                    en: 'If data is missing, model emits a structured tool invocation with validated JSON arguments matching the tool contract.',
                    vi: 'Nếu thiếu dữ liệu, mô hình xuất lời gọi tool có cấu trúc với các tham số JSON đã được xác thực theo schema.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Execution & Observation Ingestion', vi: 'Thực Thi & Thu Nhận Kết Quả (Observation)' },
                  description: {
                    en: 'Application host executes tool securely, captures output or error stack, and appends the result as an Observation message.',
                    vi: 'Ứng dụng host thực thi tool an toàn, bắt trọn dữ liệu hoặc mã lỗi và nối kết quả vào lịch sử dưới dạng thông điệp Observation.',
                  },
                },
                {
                  number: 5,
                  label: { en: 'Termination & Synthesis', vi: 'Điều Kiện Dừng & Tổng Hợp Kết Quả' },
                  description: {
                    en: 'Loop terminates when model emits Final Answer, or when max-iteration guardrail is reached, preventing infinite recursion.',
                    vi: 'Vòng lặp kết thúc khi mô hình đưa ra Final Answer hoặc khi chạm giới hạn vòng lặp tối đa, ngăn ngừa đệ quy vô hạn.',
                  },
                },
              ],
            },
            implementation: {
              language: 'typescript',
              filename: 'agent/react_agent_loop.ts',
              explanation: {
                en: 'Complete TypeScript implementation of a deterministic ReAct agent loop featuring tool dispatching, error reflection, and max-iteration safeguards.',
                vi: 'Hiện thực TypeScript hoàn chỉnh của vòng lặp ReAct agent tất định với cơ chế dispatch tool, phản tư bắt lỗi và giới hạn số vòng lặp an toàn.',
              },
              code: `import { GoogleGenAI, Type } from '@google/genai';

interface ToolContract {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<string>;
}

interface AgentState {
  iteration: number;
  history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }>;
  completed: boolean;
  finalAnswer?: string;
}

export async function runReActAgent(
  ai: GoogleGenAI,
  userQuery: string,
  tools: Map<string, ToolContract>,
  maxIterations = 6
): Promise<string> {
  const systemInstruction = \`You are an expert autonomous assistant using the ReAct (Reason + Act) loop.
For every step, follow this strict format:
Thought: <Explain step-by-step reasoning on what information is needed>
Action: <ToolName>
Action Input: <JSON object containing validated arguments>

When you have collected all required information to answer the user query, output:
Final Answer: <Your comprehensive response to the user>\`;

  const state: AgentState = {
    iteration: 0,
    history: [{ role: 'user', parts: [{ text: userQuery }] }],
    completed: false,
  };

  while (!state.completed && state.iteration < maxIterations) {
    state.iteration += 1;

    // 1. Prompt model for Thought + Action or Final Answer
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: state.history,
      config: {
        systemInstruction,
        temperature: 0.1, // Low temperature for deterministic planning
      },
    });

    const modelOutput = response.text || '';
    state.history.push({ role: 'model', parts: [{ text: modelOutput }] });

    // 2. Check for termination condition
    if (modelOutput.includes('Final Answer:')) {
      state.completed = true;
      state.finalAnswer = modelOutput.split('Final Answer:')[1].trim();
      break;
    }

    // 3. Parse Action and Action Input
    const actionMatch = modelOutput.match(/Action:\\s*([a-zA-Z0-9_-]+)/);
    const inputMatch = modelOutput.match(/Action Input:\\s*(\\{.*?\\})/s);

    if (!actionMatch || !inputMatch) {
      // Guardrail: Force reflection on syntax failure
      const errorMsg = 'Observation: Error - Could not parse Action and Action Input. Ensure Action Input is valid JSON.';
      state.history.push({ role: 'user', parts: [{ text: errorMsg }] });
      continue;
    }

    const toolName = actionMatch[1].trim();
    const tool = tools.get(toolName);

    if (!tool) {
      // Guardrail: Report unknown tool to model
      const errorMsg = \`Observation: Error - Tool "\${toolName}" does not exist. Available tools: \${Array.from(tools.keys()).join(', ')}\`;
      state.history.push({ role: 'user', parts: [{ text: errorMsg }] });
      continue;
    }

    // 4. Execute tool with error isolation
    try {
      const parsedArgs = JSON.parse(inputMatch[1]);
      const toolResult = await tool.execute(parsedArgs);
      state.history.push({
        role: 'user',
        parts: [{ text: \`Observation: \${toolResult}\` }],
      });
    } catch (err) {
      const executionError = err instanceof Error ? err.message : String(err);
      state.history.push({
        role: 'user',
        parts: [{ text: \`Observation: Tool execution failed with error: "\${executionError}". Reflect and adjust parameters.\` }],
      });
    }
  }

  if (!state.completed) {
    return state.finalAnswer || 'Task aborted: Reached maximum execution limit without reaching a final answer.';
  }

  return state.finalAnswer || 'No answer generated.';
}`,
            },
            explanation: {
              en: 'The execution loop explicitly decouples non-deterministic model generation from deterministic host control. The host application parses output tokens, validates tool existence, invokes tools in a sandbox with timeout limits, and serializes observations. Crucially, the max-iteration boundary guarantees that an agent cannot enter an infinite loop if a tool continuously fails or if the model oscillates between repetitive actions.',
              vi: 'Vòng lặp thực thi tách bạch rõ rệt giữa việc sinh nội dung bất định của mô hình và quyền kiểm soát tất định của ứng dụng host. Ứng dụng host phân tích chuỗi token, kiểm tra sự tồn tại của tool, gọi tool trong sandbox có giới hạn thời gian và tuần tự hóa kết quả quan sát. Điều tối quan trọng là chốt chặn số vòng lặp tối đa đảm bảo agent không bao giờ rơi vào vòng lặp vô tận nếu tool bị lỗi liên tục hoặc mô hình bị kẹt trong suy luận lặp lại.',
            },
            variations: [
              {
                name: { en: 'Plan-and-Solve Decomposition', vi: 'Phân Tách Kế Hoạch & Thực Thi (Plan-and-Solve)' },
                description: {
                  en: 'The agent drafts an upfront multi-step execution plan before executing any tool, then processes steps sequentially while updating plan status.',
                  vi: 'Agent lập kế hoạch tổng thể nhiều bước trước khi gọi tool đầu tiên, sau đó thực thi tuần tự từng bước và cập nhật tiến độ kế hoạch.',
                },
              },
              {
                name: { en: 'Self-Reflection (Reflexion) Cycle', vi: 'Chu Trình Tự Phản Tư (Reflexion)' },
                description: {
                  en: 'After each observation, an explicit Critic prompt evaluates whether the tool result progressed the task or hallucinated, forcing parameter revision if stagnant.',
                  vi: 'Sau mỗi kết quả quan sát, một prompt đóng vai Người phản biện sẽ đánh giá liệu kết quả có giúp tiến gần mục tiêu không, ép sửa tham số nếu bị đình trệ.',
                },
              },
            ],
            tradeOffs: {
              en: [
                'Higher accuracy and multi-step problem solving at the expense of higher token consumption and multi-second latencies.',
                'Increased prompt token volume on each cycle as observation traces accumulate in the context window.',
                'Requires rigorous server-side sandboxing to prevent arbitrary code execution or unauthenticated network queries.',
              ],
              vi: [
                'Độ chính xác cao hơn khi giải quyết bài toán phức tạp nhưng phải đánh đổi bằng chi phí token và độ trễ phản hồi lên tới vài giây.',
                'Dung lượng prompt tăng dần qua từng chu kỳ do các đoạn ghi chú Thought và Observation tích tụ trong cửa sổ ngữ cảnh.',
                'Đòi hỏi phải sandbox hóa môi trường thực thi tool trên server để ngăn chặn mã độc hoặc truy vấn mạng trái phép.',
              ],
            },
            gotchas: {
              en: [
                'Never rely on the model to self-terminate without an external maxIterations counter; models can oscillate indefinitely.',
                'Tool observation text must be truncated or summarized if an API returns multi-megabyte payloads, otherwise context limits will overflow.',
                'Always sanitize tool arguments using strict JSON schema validation before passing them to database drivers or system shells.',
              ],
              vi: [
                'Tuyệt đối không tin tưởng mô hình sẽ tự biết dừng nếu thiếu biến đếm maxIterations ở tầng code; mô hình rất dễ lặp vô tận.',
                'Phải cắt ngắn hoặc tóm tắt dữ liệu trả về từ tool nếu API trả về payload vài MB, nếu không sẽ tràn cửa sổ ngữ cảnh.',
                'Luôn kiểm tra và làm sạch tham số của tool bằng JSON schema trước khi truyền vào database driver hoặc shell hệ thống.',
              ],
            },
            whenNotToUse: {
              en: [
                'Simple informational retrieval queries where a single-shot RAG pipeline delivers accurate answers in 300ms.',
                'Real-time customer-facing chat where user expectation demands immediate typing feedback under 1 second.',
                'Static deterministic workflows that can be hardcoded in standard TypeScript without dynamic AI routing.',
              ],
              vi: [
                'Các truy vấn thông tin đơn giản mà pipeline RAG 1 lần gọi đã đủ trả về kết quả chính xác trong 300ms.',
                'Giao diện chat trực tiếp với người dùng khi yêu cầu độ trễ phản hồi bắt buộc dưới 1 giây.',
                'Các luồng công việc tĩnh, tất định có thể code cứng bằng TypeScript thông thường mà không cần AI định tuyến linh động.',
              ],
            },
            relatedPatterns: {
              en: ['Supervisor Multi-Agent Router', 'Human-in-the-Loop Verification Gate', 'Dynamic Context Compression'],
              vi: ['Mô hình điều phối Supervisor Multi-Agent', 'Cổng duyệt người dùng Human-in-the-Loop', 'Nén ngữ cảnh động'],
            },
          },
        },
      ],
    },
    {
      id: 'aap-ch-2',
      number: 2,
      slug: 'multi-agent-orchestration-supervisor',
      title: {
        en: 'Multi-Agent Orchestration & Supervisor Pattern',
        vi: 'Điều Phối Multi-Agent & Mô Hình Supervisor Router',
      },
      summary: {
        en: 'Hierarchical multi-agent delegation, specialized system prompts, state routing, and supervisor synthesis.',
        vi: 'Phân cấp ủy quyền multi-agent, system prompt chuyên biệt, định tuyến trạng thái và tổng hợp bởi supervisor.',
      },
      readTimeMinutes: 17,
      sections: [
        {
          id: 'aap-2-1',
          title: {
            en: 'Hierarchical Multi-Agent Orchestration & The Supervisor Pattern',
            vi: 'Kiến Trúc Điều Phối Multi-Agent Phân Cấp & Mô Hình Supervisor Router',
          },
          content: {
            en: 'When a single monolithic agent is configured with dozens of tools, two critical failure modes emerge: (1) Tool Selection Degradation, where the model confuses parameter schemas between overlapping tools; and (2) System Prompt Dilution, where contradictory instructions across domains degrade adherence. The Supervisor Pattern solves this by decomposing complex architectures into specialized Worker Agents managed by a central Supervisor Agent. The Supervisor acts as an intelligent router and synthesizer: it inspects the user intent, delegates discrete subtasks to domain-specific workers (e.g. SQL Specialist, Web Researcher, Python Coder), collects their outputs on a shared state blackboard, and synthesizes the unified final response.',
            vi: 'Khi một agent nguyên khối duy nhất bị nhồi nhét hàng chục công cụ, hai lỗi nghiêm trọng xuất hiện: (1) Suy giảm khả năng chọn tool (Tool Selection Degradation), mô hình nhầm lẫn tham số giữa các tool có chức năng gần giống nhau; và (2) Loãng System Prompt (Prompt Dilution), các chỉ dẫn chuyên môn trái ngược nhau làm suy yếu tính tuân thủ quy tắc. Mô hình Supervisor giải quyết triệt để vấn đề này bằng cách phân tách hệ thống thành các Worker Agent chuyên môn hóa được điều phối bởi một Supervisor Agent trung tâm. Supervisor đóng vai trò là bộ định tuyến thông minh và tổng hợp: tiếp nhận yêu cầu, giao việc cho worker phù hợp (như Chuyên viên SQL, Chuyên viên Tra cứu Web, Lập trình viên Python), thu thập kết quả lên bảng trạng thái chung và tổng hợp câu trả lời cuối cùng.',
          },
          keyIdea: {
            en: 'Do not overload a single agent with 20+ tools. Deploy specialized worker agents with narrow scopes and use a central Supervisor agent to route tasks and synthesize results.',
            vi: 'Đừng nhồi nhét hơn 20 công cụ vào một agent duy nhất. Hãy triển khai các worker agent có phạm vi hẹp và dùng một Supervisor trung tâm để định tuyến nhiệm vụ và tổng hợp dữ liệu.',
          },
          patternDetails: {
            problem: {
              en: 'Monolithic agents with large tool catalogs suffer from tool selection confusion, excessive context token overhead on every step, and conflicting prompt instructions.',
              vi: 'Agent nguyên khối sở hữu danh mục công cụ quá lớn sẽ gặp tình trạng chọn nhầm tool, tiêu tốn quá nhiều token ngữ cảnh ở mỗi bước và xung đột quy tắc prompt.',
            },
            context: {
              en: 'Enterprise platforms requiring multidisciplinary skills such as financial data analytics, SQL querying, external web scraping, and code generation.',
              vi: 'Nền tảng doanh nghiệp yêu cầu kết hợp nhiều kỹ năng liên ngành như phân tích báo cáo tài chính, truy vấn SQL, cào dữ liệu web và viết code tự động.',
            },
            solutionOverview: {
              en: 'Implement a two-tier hierarchy: a Supervisor agent evaluates the overall goal and routes subtasks to Worker agents; each worker runs its own isolated ReAct loop with 2-4 domain-specific tools and reports back to the shared blackboard state.',
              vi: 'Triển khai mô hình phân cấp 2 tầng: Supervisor đánh giá mục tiêu tổng thể và giao việc con cho các Worker; mỗi worker chạy vòng lặp ReAct độc lập với 2-4 tool chuyên biệt và gửi báo cáo về bảng trạng thái chung.',
            },
            architectureDiagram: {
              title: {
                en: 'Supervisor & Specialized Workers Architecture',
                vi: 'Kiến Trúc Điều Phối Supervisor & Các Worker Chuyên Biệt',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Goal Ingestion & Decomposition', vi: 'Tiếp Nhận & Phân Tách Mục Tiêu' },
                  description: {
                    en: 'Supervisor analyzes complex query and determines which specialized worker is required first.',
                    vi: 'Supervisor phân tích yêu cầu phức tạp và xác định worker chuyên trách nào cần thực thi trước.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Task Delegation & Context Isolation', vi: 'Ủy Quyền & Cô Lập Ngữ Cảnh' },
                  description: {
                    en: 'Supervisor sends a targeted prompt to Worker 1 (e.g. SQL Agent) containing only relevant constraints, hiding unrelated worker tools.',
                    vi: 'Supervisor gửi prompt trọng tâm cho Worker 1 (ví dụ SQL Agent) chỉ chứa ràng buộc liên quan, ẩn toàn bộ tool của các worker khác.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Isolated Worker Execution', vi: 'Worker Thực Thi Độc Lập' },
                  description: {
                    en: 'Worker 1 completes subtask using its domain-specific tools and returns a structured output payload to the Supervisor.',
                    vi: 'Worker 1 hoàn thành nhiệm vụ con bằng các tool chuyên ngành và gửi kết quả có cấu trúc về cho Supervisor.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'State Evaluation & Next Route', vi: 'Đánh Giá Trạng Thái & Định Tuyến Tiếp Theo' },
                  description: {
                    en: 'Supervisor evaluates worker output; if further steps are needed (e.g. Data Visualization), it routes to Worker 2.',
                    vi: 'Supervisor đánh giá kết quả từ worker; nếu cần bước tiếp theo (như trực quan hóa dữ liệu), nó sẽ gọi tiếp Worker 2.',
                  },
                },
                {
                  number: 5,
                  label: { en: 'Final Synthesis Delivery', vi: 'Tổng Hợp & Phản Hồi Cuối Cùng' },
                  description: {
                    en: 'When all subtasks conclude, Supervisor synthesizes unified final deliverable for the user.',
                    vi: 'Khi tất cả nhiệm vụ con hoàn tất, Supervisor tổng hợp tài liệu thống nhất cuối cùng gửi người dùng.',
                  },
                },
              ],
            },
            implementation: {
              language: 'typescript',
              filename: 'agent/supervisor_orchestrator.ts',
              explanation: {
                en: 'TypeScript supervisor pattern coordinating specialized Database and Visualization workers through structured JSON routing decisions.',
                vi: 'Triển khai mô hình Supervisor bằng TypeScript điều phối worker Cơ sở dữ liệu và Trực quan hóa qua quyết định định tuyến JSON chuẩn.',
              },
              code: `import { GoogleGenAI, Type } from '@google/genai';

export interface SubtaskResult {
  workerName: string;
  output: string;
}

export class SupervisorOrchestrator {
  private ai: GoogleGenAI;

  constructor(ai: GoogleGenAI) {
    this.ai = ai;
  }

  async decideNextAction(
    userGoal: string,
    history: SubtaskResult[]
  ): Promise<{ nextWorker: 'SQL_AGENT' | 'CHART_AGENT' | 'FINISH'; taskPrompt: string }> {
    const summary = history
      .map((h) => \`[\${h.workerName}]: \${h.output}\`)
      .join('\\n');

    const prompt = \`Goal: \${userGoal}
Previous Steps Completed:
\${summary || 'None'}

Decide the next worker to invoke. Options:
- SQL_AGENT: Queries database tables and retrieves raw metrics.
- CHART_AGENT: Generates visualization specs from tabular data.
- FINISH: All tasks complete; ready to answer user.\`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nextWorker: {
              type: Type.STRING,
              enum: ['SQL_AGENT', 'CHART_AGENT', 'FINISH'],
            },
            taskPrompt: {
              type: Type.STRING,
              description: 'Clear, concise instruction for the selected worker',
            },
          },
          required: ['nextWorker', 'taskPrompt'],
        },
      },
    });

    return JSON.parse(response.text!);
  }
}`,
            },
            explanation: {
              en: 'The Supervisor acts as an intelligent stateful router. By constraining routing choices to a typed JSON schema, the application avoids free-form hallucinations. Each worker maintains its own lean prompt and minimal tool registry, keeping token costs low and precision high.',
              vi: 'Supervisor đóng vai trò như một bộ định tuyến trạng thái thông minh. Bằng cách giới hạn quyết định định tuyến vào một JSON schema có kiểu dữ liệu chặt chẽ, ứng dụng tránh được việc mô hình tự bịa ra các bước vô nghĩa. Mỗi worker giữ prompt ngắn gọn và danh mục tool tinh gọn, giúp tiết kiệm chi phí token và đạt độ chuẩn xác tối đa.',
            },
            variations: [
              {
                name: { en: 'Peer-to-Peer Agent Mesh (Handoff)', vi: 'Mạng Lưới Agent Ngang Hàng (Handoff)' },
                description: {
                  en: 'Agents hand execution directly to peer agents using handoff functions without returning to a central supervisor.',
                  vi: 'Các agent tự động chuyển giao lượt thực thi trực tiếp cho agent đồng cấp qua hàm handoff mà không cần thông qua supervisor trung tâm.',
                },
              },
              {
                name: { en: 'Hierarchical Team of Teams', vi: 'Phân Cấp Nhóm Đội Đa Tầng' },
                description: {
                  en: 'Supervisors manage sub-supervisors for enterprise software engineering (e.g. Frontend Team Lead, Backend Team Lead).',
                  vi: 'Các Supervisor cấp cao điều phối các trưởng nhóm phụ cho các dự án phần mềm quy mô lớn (ví dụ Trưởng nhóm Frontend, Trưởng nhóm Backend).',
                },
              },
            ],
            tradeOffs: {
              en: [
                'Significantly higher reliability on complex 10+ tool workflows compared to a single overloaded agent.',
                'Increased system design complexity requiring inter-agent communication protocols and state serialization.',
                'Sequential multi-agent handoffs compound total latency, often taking 10-30 seconds for end-to-end execution.',
              ],
              vi: [
                'Độ tin cậy vượt trội trên các quy trình phức tạp dùng trên 10 công cụ so với việc dùng một agent quá tải.',
                'Tăng độ phức tạp kiến trúc hệ thống, đòi hỏi xây dựng giao thức giao tiếp và tuần tự hóa trạng thái giữa các agent.',
                'Việc chuyển giao tuần tự qua nhiều agent làm tăng tổng thời gian xử lý, thường mất từ 10-30 giây cho mỗi lượt giải quyết.',
              ],
            },
            gotchas: {
              en: [
                'Do not pass the entire raw conversation history of worker A into worker B; summarize worker outputs to prevent context explosion.',
                'Ensure cycles between workers are detected by maintaining an visited-state ledger.',
                'Define fallback procedures for cases where a worker fails repeatedly to prevent blocking the supervisor.',
              ],
              vi: [
                'Không truyền toàn bộ lịch sử thô của worker A sang worker B; hãy tóm tắt kết quả của worker để tránh bùng nổ ngữ cảnh.',
                'Đảm bảo phát hiện chu trình lặp giữa các worker bằng cách ghi nhật ký các trạng thái đã đi qua.',
                'Xây dựng cơ chế dự phòng khi một worker liên tục trả về lỗi để tránh làm nghẽn tiến trình của supervisor.',
              ],
            },
            whenNotToUse: {
              en: [
                'Simple queries requiring only one or two straightforward API lookups.',
                'Strictly low-latency user interfaces requiring sub-second responses.',
                'Systems where user privacy dictates that queries cannot be fanned out across multiple model calls.',
              ],
              vi: [
                'Các truy vấn đơn giản chỉ cần gọi 1 hoặc 2 API cơ bản.',
                'Giao diện yêu cầu phản hồi nhanh tức thì dưới 1 giây.',
                'Các hệ thống có yêu cầu bảo mật nghiêm ngặt không cho phép phân tán truy vấn qua nhiều lượt gọi mô hình.',
              ],
            },
            relatedPatterns: {
              en: ['ReAct Agent Loop', 'Dynamic Routing Gateway', 'Human-in-the-Loop Approval'],
              vi: ['Vòng lặp ReAct Agent', 'Cổng định tuyến động Gateway', 'Cổng phê duyệt Human-in-the-Loop'],
            },
          },
        },
      ],
    },
  ],
};
