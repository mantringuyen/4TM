import { Book } from "../types";
import {
  AI_FUNDAMENTALS_HANDBOOK_BOOK,
  AI_DEFINITIONS_BOOK,
  PROMPT_ENGINEERING_GUIDE_BOOK,
  RAG_ARCHITECTURE_HANDBOOK_BOOK,
  RAG_PATTERNS_RECIPES_BOOK,
  LLM_COMMON_ERRORS_BOOK,
  AI_BEST_PRACTICES_BOOK,
} from "./migrated";

export const AI_EBOOKS: Book[] = [
  // 1. AI Fundamentals Handbook (Migrated - Batch 7)
  AI_FUNDAMENTALS_HANDBOOK_BOOK,

  // 2. AI Definitions (Migrated - Batch 7)
  AI_DEFINITIONS_BOOK,

  PROMPT_ENGINEERING_GUIDE_BOOK,

  // 4. RAG Architecture Handbook
  RAG_ARCHITECTURE_HANDBOOK_BOOK,

  // 5. RAG Patterns / Recipes
  RAG_PATTERNS_RECIPES_BOOK,

  // 6. AI Agent Patterns
  {
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
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '35 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-18',
    accentColor: 'from-fuchsia-600 to-indigo-900',
    tags: ['AI Agents', 'ReAct', 'Tool Use', 'Multi-Agent', 'Patterns'],
    description: {
      en: 'Architecture guidelines for building autonomous AI agents: the ReAct (Reason + Act) loop, Tool Calling schemas, state memory management, and multi-agent task distribution.',
      vi: 'Hướng dẫn kiến trúc xây dựng AI Agent tự hành: vòng lặp ReAct (Reason + Act), định nghĩa Tool Calling, quản lý bộ nhớ trạng thái và điều phối hệ thống multi-agent.',
    },
    prerequisites: {
      en: ['Function calling and prompt engineering familiarity'],
      vi: ['Làm quen với Function calling và viết prompt'],
    },
    outcomes: {
      en: ['Implement robust ReAct reasoning-acting execution loops', 'Orchestrate multi-agent workflows with specialized system roles'],
      vi: ['Hiện thực vòng lặp thực thi suy luận ReAct ổn định', 'Điều phối luồng công việc giữa nhiều AI Agent có vai trò chuyên biệt'],
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
          en: 'Thought -> Action -> Observation -> Final Answer state machine cycle.',
          vi: 'Chu trình máy trạng thái: Thought -> Action -> Observation -> Final Answer.',
        },
        readTimeMinutes: 18,
        sections: [
          {
            id: 'aap-1-1',
            title: {
              en: 'ReAct State Machine: Reasoning + Acting Execution Cycles',
              vi: 'Kiến Trúc Máy Trạng Thái ReAct: Vòng Lặp Suy Luận & Hành Động',
            },
            keyIdea: {
              en: 'The ReAct (Reason + Act) architecture converts static LLM generation into an autonomous state machine, alternating through explicit Thought, Action (Tool Invocation), and Observation (Environment Feedback) cycles until reaching an objective Final Answer.',
              vi: 'Kiến trúc ReAct (Reason + Act) biến mô hình LLM từ sinh văn bản thụ động thành một máy trạng thái tự hành, luân phiên thực hiện chu trình Suy luận (Thought), Hành động (Action gọi Tool) và Quan sát (Observation từ môi trường) cho đến khi đạt được câu trả lời cuối cùng.',
            },
            content: {
              en: 'Direct tool calling without explicit intermediate reasoning frequently suffers from error cascading: when an LLM selects the wrong API or encounters invalid parameters, it lacks the cognitive scratchpad required to recover. The ReAct paradigm (Yao et al., 2022) resolves this by enforcing a formal four-phase state machine cycle: (1) **Thought**: The model externalizes a step-by-step reasoning plan evaluating what information is missing; (2) **Action**: The agent selects a specific registered tool and outputs strict schema-validated parameters; (3) **Observation**: The runtime environment intercepts the call, executes the tool against external databases or APIs, and returns the serialized result into the context window under role `tool`; (4) **Convergence**: The agent inspects the observation to decide whether to trigger another cycle or synthesize the final user-facing response. In production systems, loop guardrails (e.g., `max_iterations = 10`, timeout timeouts, and exception formatting) are critical to prevent runaway compute costs.',
              vi: 'Việc cho LLM gọi tool trực tiếp mà không có bước suy luận trung gian rất dễ rơi vào lỗi dây chuyền: khi mô hình chọn nhầm API hoặc truyền sai tham số, nó không có vùng nhớ đệm (scratchpad) để tự nhận diện và sửa sai. Kiến trúc ReAct (Yao et al., 2022) khắc phục điểm yếu này bằng một chu trình máy trạng thái 4 bước nghiêm ngặt: (1) **Thought (Suy luận)**: Mô hình diễn giải tư duy từng bước xem thông tin nào đang thiếu; (2) **Action (Hành động)**: Agent chỉ định một tool cụ thể và tạo bộ tham số theo đúng schema; (3) **Observation (Quan sát)**: Hệ thống phía server chặn bắt lệnh gọi, thực thi API hoặc truy vấn cơ sở dữ liệu thật, rồi đẩy kết quả trở lại cửa sổ ngữ cảnh dưới vai trò `tool`; (4) **Convergence (Hội tụ)**: Agent phân tích kết quả nhận được để quyết định lặp tiếp hay chốt câu trả lời cuối cùng. Trong môi trường thực tế, các hàng rào bảo vệ (như `max_iterations = 10`, thời gian chờ timeout và chuẩn hóa lỗi exception) là bắt buộc để ngăn ngừa vòng lặp vô tận gây tốn chi phí API.',
            },
            comparisonTable: {
              headers: [
                { en: 'Agent Execution Model', vi: 'Mô Hình Thực Thi Agent' },
                { en: 'Reasoning Transparency', vi: 'Độ Minh Bạch Suy Luận' },
                { en: 'Error Recovery Ability', vi: 'Khả Năng Tự Sửa Sai' },
                { en: 'Token Consumption', vi: 'Mức Tiêu Thụ Token' },
              ],
              rows: [
                {
                  en: ['Direct Tool Calling (Zero-Shot)', 'Opaque (Tool chosen without rationale)', 'Fragile (Fails if parameters error)', 'Low (Single API exchange)'],
                  vi: ['Gọi Tool Trực Tiếp (Zero-Shot)', 'Mù mờ (Gọi tool không có lý giải)', 'Dễ vỡ (Sụp đổ nếu tham số sai)', 'Thấp (Chỉ tốn 1 lượt trao đổi API)'],
                },
                {
                  en: ['Plan-and-Solve (Static Pipeline)', 'Moderate (Generates upfront step list)', 'Rigid (Cannot adapt to dynamic API data)', 'Medium (Upfront planning prompt)'],
                  vi: ['Plan-and-Solve (Lập Kế Hoạch Tĩnh)', 'Vừa phải (Lập danh sách bước trước)', 'Cứng nhắc (Khó linh hoạt theo kết quả thực tế)', 'Vừa (Thêm bước prompt kế hoạch)'],
                },
                {
                  en: ['ReAct Autonomous Loop', 'Highest (Step-by-step Thought logs)', 'Resilient (Inspects exceptions and retries)', 'High (Accumulates intermediate history)'],
                  vi: ['Vòng Lặp Tự Hành ReAct', 'Cao nhất (Ghi log từng bước Thought)', 'Bền bỉ (Đọc được exception và thử lại)', 'Cao (Tích lũy lịch sử các bước trung gian)'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'react_agent_runtime.py',
              explanation: {
                en: 'Implements a production ReAct agent runtime with cycle iteration limits, tool error handling, and convergence detection.',
                vi: 'Triển khai runtime ReAct agent chuẩn production với giới hạn số lần lặp, xử lý ngoại lệ công cụ và phát hiện điểm dừng.',
              },
              code: `import json

class ReActAgent:
    def __init__(self, llm_client, tools: dict, max_iterations: int = 8):
        self.client = llm_client
        self.tools = tools
        self.max_iterations = max_iterations

    def run(self, user_goal: str) -> str:
        messages = [
            {"role": "system", "content": "You are a ReAct agent. Answer goals using Thought -> Action -> Observation steps."},
            {"role": "user", "content": user_goal}
        ]
        
        for iteration in range(1, self.max_iterations + 1):
            print(f"--- Cycle {iteration} ---")
            response = self.client.generate(messages)
            
            # Check if agent has reached a Final Answer
            if "Final Answer:" in response.text:
                return response.text.split("Final Answer:")[-1].strip()
                
            # If tool call requested
            if response.tool_calls:
                for call in response.tool_calls:
                    fn_name = call.function.name
                    args = json.loads(call.function.arguments)
                    
                    try:
                        # Execute external environment tool
                        tool_fn = self.tools.get(fn_name)
                        result = tool_fn(**args) if tool_fn else f"Error: Tool {fn_name} not found"
                    except Exception as e:
                        result = f"Execution Exception: {str(e)}"
                        
                    messages.append({"role": "assistant", "content": response.text})
                    messages.append({"role": "tool", "name": fn_name, "content": str(result)})
            else:
                # Direct response without tool calls
                return response.text
                
        return "Failure: Max iteration budget exceeded without goal resolution."`,
            },
            diagram: {
              title: {
                en: 'ReAct State Machine Execution Cycle',
                vi: 'Chu Trình Máy Trạng Thái ReAct',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Thought Formulation', vi: 'Hình Thành Suy Luận' },
                  description: {
                    en: 'Agent evaluates conversation history, identifying current state and next information requirement.',
                    vi: 'Agent phân tích lịch sử hội thoại, xác định trạng thái hiện tại và thông tin còn thiếu.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Action Invocation', vi: 'Kích Hoạt Hành Động' },
                  description: {
                    en: 'Emits structured tool call with typed parameters targeting environment API.',
                    vi: 'Phát ra lệnh gọi tool có cấu trúc với các tham số tương thích với API môi trường.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Observation Feedback', vi: 'Phản Hồi Quan Sát' },
                  description: {
                    en: 'Runtime executes external tool and feeds serialized output back to model context.',
                    vi: 'Runtime thực thi tool bên ngoài và đưa kết quả trả về vào cửa sổ ngữ cảnh.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Omitting a maximum iteration ceiling, allowing the agent to run in an infinite loop when an API returns 404',
                  vi: 'Quên đặt giới hạn số lần lặp tối đa, khiến agent chạy lặp vô tận khi API gặp lỗi 404',
                },
                why: {
                  en: 'If an external API repeatedly returns a non-informative error, the agent will repeatedly attempt variations indefinitely, draining token quotas and hanging client requests.',
                  vi: 'Nếu API liên tục trả về lỗi không rõ ràng, agent sẽ thử lại liên tục không ngừng, làm cạn kiệt hạn ngạch token và treo ứng dụng người dùng.',
                },
                solution: {
                  en: 'Always enforce a strict `max_iterations` counter (typically 6-10 steps) and pass informative error messages back into the observation channel so the model can pivot.',
                  vi: 'Luôn kiểm soát biến đếm `max_iterations` (thường từ 6-10 bước) và đưa thông báo lỗi chi tiết vào observation để mô hình biết đường đổi hướng.',
                },
                codeIncorrect: `while True: # Infinite loop danger!
    res = agent.step()
    if res.done: break`,
                codeCorrect: `for step in range(MAX_STEPS):
    res = agent.step()
    if res.done: return res.answer
raise AgentTimeoutError("Exceeded max iteration budget")`,
              },
            ],
            practicalScenario: {
              en: 'In an autonomous DevOps incident responder, an alert reported high memory usage on a Kubernetes cluster. Cycle 1: Thought recognized the pod name, Action called `get_pod_metrics`. Cycle 2: Observation showed 98% memory usage on the Redis cache, Thought deduced a leak or key growth, Action ran `redis_cli_info`. Cycle 3: Observation showed 12 million unexpired session keys, Thought concluded TTL expiration had failed, emitting Final Answer with automated remediation commands.',
              vi: 'Trong hệ thống tự động xử lý sự cố DevOps, hệ thống nhận cảnh báo tràn RAM trên cụm Kubernetes. Vòng 1: Thought nhận diện tên pod, Action gọi `get_pod_metrics`. Vòng 2: Observation trả về pod Redis chiếm 98% RAM, Thought nhận định rò rỉ bộ nhớ hoặc bùng nổ key, Action chạy `redis_cli_info`. Vòng 3: Observation cho thấy 12 triệu key phiên đăng nhập không có TTL, Thought kết luận cơ chế hết hạn session bị lỗi và đưa ra Final Answer kèm lệnh khắc phục tự động.',
            },
            bestPractices: {
              en: [
                'Enforce a strict maximum iteration counter (6 to 10 iterations) on every agent loop.',
                'Truncate tool observation payloads: never return megabytes of raw JSON into the agent context window.',
                'Provide clear descriptive docstrings for every tool: the LLM relies entirely on function descriptions to determine when and how to call tools.',
              ],
              vi: [
                'Bắt buộc giới hạn số lần lặp tối đa (từ 6 đến 10 lần) cho mọi vòng lặp agent.',
                'Cắt gọt dung lượng dữ liệu trong observation: không bao giờ đổ hàng megabyte JSON thô vào ngữ cảnh agent.',
                'Viết mô tả docstring rõ ràng cho từng tool: LLM hoàn toàn dựa vào mô tả hàm để quyết định thời điểm và cách thức gọi công cụ.',
              ],
            },
            keyTakeaways: {
              en: [
                'ReAct combines step-by-step reasoning with external environment actions for high reliability.',
                'Structured tool calls must be validated against schemas before execution.',
                'Hard loop boundaries and truncated observations are mandatory for production stability.',
              ],
              vi: [
                'ReAct kết hợp suy luận từng bước với hành động tương tác môi trường để tăng độ tin cậy.',
                'Lệnh gọi tool phải được kiểm tra tính hợp lệ qua schema trước khi thực thi thực tế.',
                'Giới hạn số bước lặp và cắt gọt dữ liệu quan sát là điều kiện tiên quyết cho hệ thống ổn định.',
              ],
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
          vi: 'Điều Phối Multi-Agent & Model Supervisor Controller',
        },
        summary: {
          en: 'Decomposing tasks into specialized sub-agents guided by a Supervisor LLM router.',
          vi: 'Phân rã bài toán cho các sub-agent chuyên trách dưới sự điều phối của Supervisor.',
        },
        readTimeMinutes: 17,
        sections: [
          {
            id: 'aap-2-1',
            title: {
              en: 'Hierarchical Multi-Agent Orchestration & The Supervisor Pattern',
              vi: 'Kiến Trúc Điều Phối Multi-Agent Phân Cấp & Mô Hình Supervisor Router',
            },
            keyIdea: {
              en: 'Loading dozens of tools into a single monolithic agent degrades instruction following and triggers tool confusion. The Supervisor Pattern decomposes complex tasks into a hierarchical graph where a central orchestrator delegates domain-scoped subtasks to isolated specialized worker agents.',
              vi: 'Nhồi nhét hàng chục công cụ vào một Agent nguyên khối duy nhất sẽ làm suy giảm khả năng tuân thủ chỉ dẫn và gây nhầm lẫn tool. Mô hình Supervisor phân rã bài toán phức tạp thành đồ thị phân cấp, trong đó Agent điều phối trung tâm sẽ ủy quyền từng nhiệm vụ chuyên biệt cho các Worker Agent độc lập.',
            },
            content: {
              en: 'When a single LLM agent is configured with more than 15-20 tool definitions, tool schemas consume thousands of prompt tokens, dramatically increasing parameter selection errors and token costs. The Supervisor Pattern solves this through architectural specialization. A top-level Supervisor Agent evaluates the overarching user objective and breaks it down into discrete steps. Instead of executing code or web searches itself, the Supervisor holds high-level routing tools (e.g., `delegate_to_researcher`, `delegate_to_coder`, `delegate_to_qa`). Each Worker Agent operates within its own dedicated context window with an ultra-focused system prompt and a small set of 2-4 domain-specific tools. Crucially, worker scratchpads are isolated: only their clean final deliverables are returned to the Supervisor, preventing context contamination and token explosion.',
              vi: 'Khi cấu hình cho một Agent đơn lẻ hơn 15-20 công cụ, schema định nghĩa tool sẽ ngốn hàng nghìn token trong prompt, làm tăng mạnh tỷ lệ truyền sai tham số và chi phí vận hành. Mô hình Supervisor giải quyết triệt để vấn đề này bằng nguyên lý chuyên biệt hóa kiến trúc. Một Supervisor Agent cấp cao sẽ tiếp nhận mục tiêu tổng thể của người dùng và chia nhỏ thành các bước độc lập. Thay vì tự mình chạy code hay tìm kiếm web, Supervisor chỉ sở hữu các công cụ ủy quyền cấp cao (như `delegate_to_researcher`, `delegate_to_coder`, `delegate_to_qa`). Mỗi Worker Agent hoạt động trong một cửa sổ ngữ cảnh hoàn toàn riêng biệt với system prompt ngắn gọn và chỉ nắm giữ 2-4 tool chuyên ngành. Điều quan trọng nhất: vùng nháp tư duy của các worker được cô lập, chỉ có kết quả đầu ra tinh gọn được trả về cho Supervisor, ngăn chặn hoàn toàn hiện tượng nhiễm bẩn ngữ cảnh và bùng nổ token.',
            },
            comparisonTable: {
              headers: [
                { en: 'Multi-Agent Paradigm', vi: 'Mô Hình Multi-Agent' },
                { en: 'Architectural Topology', vi: 'Hình Thái Kiến Trúc' },
                { en: 'Fault Isolation', vi: 'Cách Ly Lỗi' },
                { en: 'Context Window Efficiency', vi: 'Hiệu Suất Cửa Sổ Ngữ Cảnh' },
              ],
              rows: [
                {
                  en: ['Monolithic Mega-Agent', 'Flat (1 agent, 30+ tools)', 'Poor (One tool error breaks whole run)', 'Poor (All tool outputs pollute main context)'],
                  vi: ['Mega-Agent Nguyên Khối', 'Phẳng (1 agent ôm 30+ công cụ)', 'Kém (Một tool lỗi làm sập toàn bộ quy trình)', 'Kém (Toàn bộ dữ liệu tool làm rác ngữ cảnh)'],
                },
                {
                  en: ['Linear Sequential Pipeline', 'Sequential Chain (A -> B -> C)', 'Moderate (Strict pipeline dependencies)', 'Moderate (Context passes down the pipe)'],
                  vi: ['Pipeline Tuần Tự Tuyến Tính', 'Chuỗi thẳng (A -> B -> C)', 'Trung bình (Phụ thuộc cứng vào bước trước)', 'Vừa phải (Ngữ cảnh chuyển tiếp dọc đường ống)'],
                },
                {
                  en: ['Hierarchical Supervisor Graph', 'Star / Tree (Supervisor + Workers)', 'Highest (Failing worker handled by router)', 'Optimal (Workers discard intermediate scratchpads)'],
                  vi: ['Đồ Thị Supervisor Phân Cấp', 'Hình sao / Cây (Supervisor + Các Worker)', 'Cao nhất (Worker lỗi được Supervisor điều phối lại)', 'Tối ưu (Worker xóa sạch nháp, chỉ trả kết quả)'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'supervisor_orchestrator.py',
              explanation: {
                en: 'Implements a centralized Supervisor Router delegating domain subtasks to isolated Research and Code-Generation worker agents.',
                vi: 'Triển khai Supervisor Router điều phối nhiệm vụ cho các Worker Agent chuyên trách nghiên cứu và viết code.',
              },
              code: `class SupervisorOrchestrator:
    def __init__(self, supervisor_llm, researcher_agent, coder_agent):
        self.supervisor = supervisor_llm
        self.workers = {
            "researcher": researcher_agent,
            "coder": coder_agent
        }

    def execute_workflow(self, task_spec: str) -> str:
        workflow_state = {"task": task_spec, "history": []}
        
        while True:
            # Supervisor decides next step: {"next_worker": "researcher"|"coder"|"FINISH", "instruction": "..."}
            decision = self.supervisor.plan_next_step(workflow_state)
            
            if decision["next_worker"] == "FINISH":
                return self.supervisor.synthesize_final_report(workflow_state)
                
            target_worker = self.workers[decision["next_worker"]]
            print(f"[Supervisor] Routing to {decision['next_worker']}: {decision['instruction']}")
            
            # Worker executes in an isolated environment with its own private tools
            worker_result = target_worker.run(decision["instruction"])
            
            # Store concise result into shared blackboard state (worker scratchpad is discarded)
            workflow_state["history"].append({
                "worker": decision["next_worker"],
                "summary": worker_result
            })

# Example: "Audit CVE vulnerabilities in auth service and write a patch"
# Supervisor routes: 1. Researcher checks CVE database -> 2. Coder drafts patch -> 3. FINISH`,
            },
            diagram: {
              title: {
                en: 'Supervisor Routing Architecture',
                vi: 'Sơ Đồ Kiến Trúc Điều Hướng Supervisor',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Task Triage', vi: 'Phân Tích Mục Tiêu' },
                  description: {
                    en: 'Supervisor analyzes complex user objective and formulates next domain subtask.',
                    vi: 'Supervisor đánh giá yêu cầu người dùng và lên kế hoạch cho nhiệm vụ con tiếp theo.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Isolated Delegation', vi: 'Ủy Quyền Độc Lập' },
                  description: {
                    en: 'Subtask dispatched to dedicated Worker with specialized tools (Web, Shell, or DB).',
                    vi: 'Giao việc cho Worker chuyên trách với bộ tool riêng (Web, Shell hệ thống, hoặc DB).',
                  },
                },
                {
                  number: 3,
                  label: { en: 'State Aggregation', vi: 'Tổng Hợp Trạng Thái' },
                  description: {
                    en: 'Worker returns clean result; Supervisor updates global blackboard and determines next step.',
                    vi: 'Worker trả về kết quả tinh gọn; Supervisor cập nhật bảng trạng thái chung và ra bước tiếp.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Allowing peer-to-peer worker communication without supervisor oversight, leading to infinite discussion loops',
                  vi: 'Cho phép các Worker giao tiếp ngang hàng (peer-to-peer) không có trọng tài, dẫn đến cãi cọ lặp vô tận',
                },
                why: {
                  en: 'When Worker A and Worker B pass messages directly without a terminating supervisor, differences in opinion or vague criteria create circular conversational ping-pong.',
                  vi: 'Khi Worker A và B nhắn tin trực tiếp cho nhau mà không có người chốt dừng, việc bất đồng tiêu chí sẽ tạo ra vòng tròn trao đổi vô tận.',
                },
                solution: {
                  en: 'Always route worker outputs back through the central Supervisor state machine to evaluate task completion and enforce a global turn limit.',
                  vi: 'Luôn buộc mọi output của worker phải quay về Supervisor trung tâm để đánh giá độ hoàn thành và kiểm soát giới hạn lượt chạy.',
                },
                codeIncorrect: `researcher.send_message_to(coder) # Unbounded peer-to-peer loop risk!`,
                codeCorrect: `result = researcher.run(task)
supervisor.review_and_route(result) # Supervised centralized state control`,
              },
            ],
            practicalScenario: {
              en: 'In an automated security penetration testing tool, a monolithic agent crashed repeatedly trying to balance network scanning tools, vulnerability lookup APIs, and report generation. Refactoring into a Supervisor with three workers (ReconWorker, ExploitTester, and ComplianceReporter) reduced prompt token costs by 68% and eliminated tool invocation errors completely.',
              vi: 'Trong công cụ kiểm thử xâm nhập bảo mật tự động, một agent đơn lẻ liên tục bị văng lỗi khi cố gắng ôm đồm cả tool quét mạng, API tra cứu lỗ hổng và xuất báo cáo. Sau khi tái cấu trúc thành mô hình Supervisor với 3 worker riêng biệt (ReconWorker, ExploitTester, ComplianceReporter), chi phí token giảm 68% và xóa bỏ hoàn toàn các lỗi gọi nhầm công cụ.',
            },
            bestPractices: {
              en: [
                'Keep worker agent tools constrained to 2-4 hyper-specific functions per worker.',
                'Enforce typed Pydantic or JSON schemas for all worker return deliverables.',
                'Discard internal worker scratchpads and chain-of-thought traces before passing results back to the Supervisor.',
              ],
              vi: [
                'Giới hạn số lượng công cụ của mỗi worker agent ở mức 2-4 hàm chuyên biệt cao.',
                'Bắt buộc các worker phải trả về kết quả theo schema Pydantic hoặc JSON chặt chẽ.',
                'Xóa bỏ toàn bộ lịch sử suy luận nháp bên trong worker trước khi trả kết quả tinh gọn về cho Supervisor.',
              ],
            },
            keyTakeaways: {
              en: [
                'Supervisor architectures eliminate tool clutter and maintain high prompt adherence.',
                'Worker context isolation preserves token budgets and prevents hallucinations.',
                'Centralized routing prevents circular conversational deadlocks between sub-agents.',
              ],
              vi: [
                'Mô hình Supervisor dọn sạch rác công cụ và duy trì khả năng tuân thủ prompt cao.',
                'Cô lập ngữ cảnh worker giúp tiết kiệm ngân sách token và chống ảo giác thông tin.',
                'Điều phối tập trung ngăn chặn tình trạng tắc nghẽn hoặc lặp vô tận giữa các sub-agent.',
              ],
            },
          },
        ],
      },
    ],
  },

  // 7. LLM Common Errors
  LLM_COMMON_ERRORS_BOOK,

  // 8. AI Best Practices
  AI_BEST_PRACTICES_BOOK,

  // 9. Vector Embeddings Guide
  {
    id: 'vector-embeddings-guide',
    slug: 'vector-embeddings-guide',
    title: 'Vector Embeddings & Semantic Search Guide',
    subtitle: {
      en: 'Step-by-Step Practical Guide to Building a Vector Search Pipeline',
      vi: 'Hướng Dẫn Thực Hành Từng Bước Xây Dựng Hệ Thống Tìm Kiếm Vectơ',
    },
    bookType: 'Practical Guides',
    categoryId: 'ai',
    subjectId: 'ai',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-violet-600 to-fuchsia-800',
    tags: ['Embeddings', 'Vector Search', 'Cosine Similarity', 'Guide'],
    description: {
      en: 'A step-by-step practical guide to generating text embeddings, storing them in PostgreSQL with pgvector, and executing fast Cosine Similarity queries.',
      vi: 'Hướng dẫn thực hành từng bước tạo text embedding, lưu trữ vào PostgreSQL với tiện ích pgvector và chạy truy vấn tìm kiếm độ tương đồng Cosine.',
    },
    prerequisites: {
      en: ['Basic SQL and Python skills'],
      vi: ['Kỹ năng SQL và Python cơ bản'],
    },
    outcomes: {
      en: ['Store and query vector embeddings in PostgreSQL using pgvector extension', 'Compute Cosine, L2 Distance, and Inner Product similarity scores'],
      vi: ['Lưu trữ và truy vấn vector trong PostgreSQL bằng tiện ích pgvector', 'Tính toán điểm tương đồng Cosine, Khoảng cách L2 và Inner Product'],
    },
    chapters: [
      {
        id: 'veg-ch-1',
        number: 1,
        slug: 'pgvector-setup-and-schema',
        title: {
          en: 'PostgreSQL pgvector Extension Setup & Index Schema',
          vi: 'Cấu Hình Tiện Ích pgvector & Schema Index Trong PostgreSQL',
        },
        summary: {
          en: 'CREATE EXTENSION vector; vector(1536) column definitions and HNSW vs IVFFlat index creation.',
          vi: 'Lệnh CREATE EXTENSION vector, định nghĩa cột vector(1536) và tối ưu chỉ mục HNSW vs IVFFlat.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'veg-1-1',
            title: {
              en: 'Defining Vector Columns & HNSW Indexing in SQL',
              vi: 'Khai Báo Cột Kiểu Vector & Tạo Chỉ Mục HNSW Trong PostgreSQL',
            },
            keyIdea: {
              en: 'The pgvector extension empowers standard relational PostgreSQL databases with native vector storage and Approximate Nearest Neighbor (ANN) indexing capabilities, eliminating the necessity for standalone vector database clusters.',
              vi: 'Tiện ích pgvector trang bị cho cơ sở dữ liệu quan hệ PostgreSQL khả năng lưu trữ vector và lập chỉ mục tìm kiếm lân cận gần nhất (ANN) nguyên bản, loại bỏ nhu cầu phải dựng cụm vector database độc lập.',
            },
            content: {
              en: 'In enterprise RAG architectures, maintaining a separate dedicated vector database (such as Pinecone or Milvus) alongside a transactional relational database creates data synchronization latency, dual-backup overhead, and distributed consistency challenges. The open-source `pgvector` extension solves this by embedding vector operations directly into PostgreSQL. Developers define a `vector(dim)` column matching the exact dimensionality of the embedding model (e.g., 768 for `text-embedding-004`, 1536 for `text-embedding-3-small`, or 3072 for `text-embedding-3-large`). For high-throughput queries over hundreds of thousands of vectors, adding an **HNSW (Hierarchical Navigable Small World)** index is essential: HNSW constructs a multi-layer geometric graph providing logarithmic $O(\\log N)$ query times with 99%+ recall accuracy.',
              vi: 'Trong các kiến trúc RAG doanh nghiệp, việc duy trì một cơ sở dữ liệu vector riêng biệt (như Pinecone hay Milvus) song song với cơ sở dữ liệu quan hệ chính tạo ra độ trễ đồng bộ, tăng chi phí vận hành backup và tiềm ẩn nguy cơ bất nhất dữ liệu. Tiện ích mã nguồn mở `pgvector` giải quyết triệt để bài toán này bằng cách tích hợp tính toán vector trực tiếp vào PostgreSQL. Lập trình viên khai báo cột `vector(dim)` khớp chính xác với số chiều của mô hình embedding đang dùng (ví dụ: 768 cho `text-embedding-004`, 1536 cho `text-embedding-3-small`, hoặc 3072 cho `text-embedding-3-large`). Đối với hệ thống có hàng trăm nghìn vector, việc tạo chỉ mục **HNSW (Hierarchical Navigable Small World)** là bắt buộc: HNSW xây dựng đồ thị hình học nhiều tầng giúp tốc độ tìm kiếm đạt độ phức tạp $O(\\log N)$ với độ chính xác recall trên 99%.',
            },
            comparisonTable: {
              headers: [
                { en: 'Index Algorithm', vi: 'Thuật Toán Index' },
                { en: 'Build Time / Memory', vi: 'Thời Gian Tạo & Bộ Nhớ' },
                { en: 'Query Throughput (QPS)', vi: 'Thông Lượng Truy Vấn (QPS)' },
                { en: 'Recall Quality', vi: 'Độ Chính Xác Recall' },
              ],
              rows: [
                {
                  en: ['Exact Sequential Scan (No Index)', 'Zero memory overhead', 'Extremely slow ($O(N)$ linear)', '100% (Guaranteed exact nearest)'],
                  vi: ['Quét Tuần Tự (Không Index)', 'Không tốn thêm RAM', 'Cực chậm (Tuyến tính $O(N)$)', '100% (Chính xác tuyệt đối)'],
                },
                {
                  en: ['IVFFlat (Inverted File Flat)', 'Fast build, low RAM', 'Moderate (Requires data warmup)', 'Good (85% - 95%)'],
                  vi: ['IVFFlat (Phân Cụm Danh Sách Đảo)', 'Tạo nhanh, tốn ít RAM', 'Trung bình (Cần nạp dữ liệu trước khi index)', 'Khá (85% - 95%)'],
                },
                {
                  en: ['HNSW (Hierarchical Small World)', 'High build time & RAM', 'Ultra-fast ($O(\\log N)$ graph traversal)', 'Superior (98% - 99.9%)'],
                  vi: ['HNSW (Đồ Thị Phân Cấp)', 'Tạo lâu hơn & tốn RAM hơn', 'Siêu nhanh (Duyệt đồ thị $O(\\log N)$)', 'Vượt trội (98% - 99.9%)'],
                },
              ],
            },
            codeBlock: {
              language: 'sql',
              filename: 'setup_pgvector.sql',
              explanation: {
                en: 'Enables pgvector extension, creates a document chunk schema, and provisions an optimized HNSW cosine index.',
                vi: 'Kích hoạt pgvector, khởi tạo bảng lưu trữ chunk tài liệu và tạo chỉ mục HNSW tối ưu cho khoảng cách Cosine.',
              },
              code: `-- 1. Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the document embeddings table
CREATE TABLE document_chunks (
    id BIGSERIAL PRIMARY KEY,
    document_id UUID NOT NULL,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    -- Match exact model output dimension (768 for Gemini text-embedding-004)
    embedding vector(768) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create HNSW index for sub-millisecond Cosine Similarity lookups
-- m = max connections per layer (default 16)
-- ef_construction = size of the dynamic candidate list for constructing graph (default 64)
CREATE INDEX document_chunks_embedding_hnsw_idx 
ON document_chunks 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);`,
            },
            diagram: {
              title: {
                en: 'PostgreSQL pgvector Architecture & Indexing',
                vi: 'Kiến Trúc & Chỉ Mục pgvector Trong PostgreSQL',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Schema Definition', vi: 'Khai Báo Schema' },
                  description: {
                    en: 'PostgreSQL table stores both relational metadata (JSONB) and typed vector columns.',
                    vi: 'Bảng PostgreSQL lưu trữ đồng thời metadata quan hệ (JSONB) và cột vector có kiểu định sẵn.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'HNSW Graph Construction', vi: 'Dựng Đồ Thị HNSW' },
                  description: {
                    en: 'Multi-layer graph links nearby vectors together in high-dimensional space.',
                    vi: 'Đồ thị nhiều lớp liên kết các vector gần nhau trong không gian nhiều chiều.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Hybrid Filtering & Search', vi: 'Truy Vấn Kết Hợp Lọc' },
                  description: {
                    en: 'Executes relational WHERE clauses and vector nearest neighbor queries in a single SQL query.',
                    vi: 'Thực thi đồng thời mệnh đề lọc WHERE và tìm kiếm vector trong duy nhất một câu lệnh SQL.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Mismatching vector column dimension with the output dimension of the embedding model',
                  vi: 'Khai báo sai số chiều của cột vector so với số chiều thực tế của mô hình embedding',
                },
                why: {
                  en: 'If the table is declared as vector(1536) and you insert a 768-dimensional array from text-embedding-004, PostgreSQL will throw a fatal dimension mismatch error.',
                  vi: 'Nếu bảng định nghĩa `vector(1536)` nhưng bạn insert mảng 768 phần tử từ `text-embedding-004`, PostgreSQL sẽ từ chối lưu và văng lỗi dimension mismatch.',
                },
                solution: {
                  en: 'Double-check your embedding model specifications (768 for Gemini, 1536 for OpenAI Small, 3072 for OpenAI Large) and match the column schema precisely.',
                  vi: 'Kiểm tra kỹ thông số mô hình embedding (768 cho Gemini, 1536 cho OpenAI Small, 3072 cho OpenAI Large) và khớp chính xác số chiều của cột trong SQL.',
                },
                codeIncorrect: `embedding vector(1536) -- Trying to insert 768-dim Gemini vector will crash!`,
                codeCorrect: `embedding vector(768)  -- Exactly matches text-embedding-004 dimensions`,
              },
            ],
            practicalScenario: {
              en: 'A SaaS platform serving 500,000 internal wiki articles migrated from a standalone vector database to PostgreSQL pgvector. Consolidating full-text search, relational permissions, and vector embeddings into a single Postgres database reduced infrastructure hosting costs by 40% and enabled instant atomic transactions between document updates and vector recalculations.',
              vi: 'Một nền tảng SaaS quản lý 500.000 bài viết wiki nội bộ đã chuyển đổi từ một database vector độc lập sang PostgreSQL pgvector. Việc gom chung tìm kiếm toàn văn, phân quyền theo user và vector embedding vào một database Postgres duy nhất đã giảm 40% chi phí máy chủ và đảm bảo tính toàn vẹn giao dịch (atomic transactions) khi cập nhật tài liệu.',
            },
            bestPractices: {
              en: [
                'Always create an HNSW index on the vector column using `vector_cosine_ops` for production scale (>10,000 rows).',
                'Store rich relational metadata in a JSONB column on the same row to support performant pre-filtered queries.',
                'Tune `hnsw.ef_search` session parameter (e.g. `SET hnsw.ef_search = 100;`) to balance search speed versus recall accuracy.',
              ],
              vi: [
                'Luôn tạo chỉ mục HNSW trên cột vector với toán tử `vector_cosine_ops` cho hệ thống lớn (>10.000 dòng).',
                'Lưu trữ metadata phong phú trong cột JSONB cùng dòng để hỗ trợ lọc kết hợp tốc độ cao.',
                'Tinh chỉnh tham số session `hnsw.ef_search` (ví dụ `SET hnsw.ef_search = 100;`) để cân bằng giữa tốc độ tìm kiếm và độ chính xác.',
              ],
            },
            keyTakeaways: {
              en: [
                'pgvector provides enterprise-grade vector capabilities directly within standard PostgreSQL.',
                'HNSW indexing offers logarithmic query speeds and top-tier recall for high-dimensional vectors.',
                'Matching exact model dimensionality is strictly required by the PostgreSQL type engine.',
              ],
              vi: [
                'pgvector mang sức mạnh tìm kiếm vector chuẩn doanh nghiệp vào trực tiếp PostgreSQL quen thuộc.',
                'Chỉ mục HNSW đem lại tốc độ truy vấn $O(\\log N)$ và độ chính xác vượt trội cho vector nhiều chiều.',
                'Khai báo đúng số chiều theo mô hình embedding là điều kiện tiên quyết của engine PostgreSQL.',
              ],
            },
          },
        ],
      },
      {
        id: 'veg-ch-2',
        number: 2,
        slug: 'cosine-similarity-queries',
        title: {
          en: 'Executing Cosine Similarity Queries with the <=> Operator',
          vi: 'Thực Thi Truy Vấn Độ Tương Đồng Với Toán Tử <=> Trong SQL',
        },
        summary: {
          en: 'Ordering by distance operator <=> and filtering with threshold scores.',
          vi: 'Sắp xếp theo toán tử khoảng cách <=> và lọc theo ngưỡng điểm tương đồng.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'veg-2-1',
            title: {
              en: 'Executing Vector Similarity Queries in SQL with the <=> Operator',
              vi: 'Truy Vấn Độ Tương Đồng Vector Trong SQL Bằng Toán Tử <=>',
            },
            keyIdea: {
              en: 'The pgvector `<=>` operator computes Cosine Distance ($1 - \\text{Cosine Similarity}$). Sorting by `embedding <=> query_vector ASC LIMIT k` retrieves the semantically closest document chunks in order of maximum relevance.',
              vi: 'Toán tử `<=>` trong pgvector tính toán Khoảng cách Cosine ($1 - \\text{Cosine Similarity}$). Sắp xếp theo `embedding <=> query_vector ASC LIMIT k` sẽ trả về các đoạn tài liệu có ý nghĩa gần nhất theo thứ tự điểm liên quan cao nhất.',
            },
            content: {
              en: 'In mathematical vector search, Cosine Distance measures the angular difference between two high-dimensional vectors regardless of their magnitude: $\\text{Cosine Distance} = 1 - \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$. A Cosine Distance of `0.0` represents identical vector direction, while `1.0` represents orthogonal (completely unrelated) vectors. In pgvector: (1) The `<=>` operator denotes Cosine Distance; (2) The `<->` operator denotes Euclidean (L2) Distance; (3) The `<#>` operator denotes Negative Inner Product. When building RAG pipelines, developers execute parameterized SQL queries passing the serialized query vector, sorting in ascending order with a `LIMIT` clause. To filter out irrelevant noise, a threshold filter (such as `WHERE 1 - (embedding <=> $query) > 0.75`) is applied to eliminate poor matches.',
              vi: 'Trong toán học tìm kiếm vector, Khoảng cách Cosine đo lường góc lệch giữa hai vector nhiều chiều mà không phụ thuộc vào độ dài (độ lớn) của chúng: $\\text{Khoảng cách Cosine} = 1 - \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$. Khoảng cách `0.0` nghĩa là hai vector chỉ cùng hướng hoàn toàn, trong khi `1.0` thể hiện hai vector vuông góc (không liên quan gì nhau). Trong pgvector: (1) Toán tử `<=>` đại diện cho Khoảng cách Cosine; (2) Toán tử `<->` đại diện cho Khoảng cách Euclidean (L2); (3) Toán tử `<#>` đại diện cho Tích Vô Hướng Đảo Dấu. Khi xây dựng pipeline RAG, lập trình viên thực thi truy vấn SQL truyền vào chuỗi vector đã tuần tự hóa, sắp xếp tăng dần và gán mệnh đề `LIMIT`. Để loại bỏ các đoạn rác không liên quan, ta áp dụng thêm điều kiện lọc ngưỡng (như `WHERE 1 - (embedding <=> $query) > 0.75`).',
            },
            comparisonTable: {
              headers: [
                { en: 'pgvector Operator', vi: 'Toán Tử Trong pgvector' },
                { en: 'Metric Calculated', vi: 'Chỉ Số Đo Lường' },
                { en: 'Range', vi: 'Phạm Vi Giá Trị' },
                { en: 'Best Use Case', vi: 'Trường Hợp Sử Dụng Tốt Nhất' },
              ],
              rows: [
                {
                  en: ['`<=>`', 'Cosine Distance ($1 - \\text{Similarity}$)', '0.0 (Identical) to 2.0 (Opposite)', 'Text embeddings (normalized & unnormalized)'],
                  vi: ['`<=>`', 'Khoảng cách Cosine ($1 - \\text{Tương đồng}$)', '0.0 (Trùng khớp) đến 2.0 (Đối nghịch)', 'Embedding văn bản (cả chuẩn hóa & chưa chuẩn hóa)'],
                },
                {
                  en: ['`<->`', 'Euclidean / L2 Distance', '0.0 to $\\infty$', 'Spatial coordinates & image embeddings'],
                  vi: ['`<->`', 'Khoảng cách Euclidean (L2)', '0.0 đến $\\infty$', 'Tọa độ không gian & vector trích xuất từ hình ảnh'],
                },
                {
                  en: ['`<#>`', 'Negative Inner Product ($-\\mathbf{u} \\cdot \\mathbf{v}$)', '$-\\infty$ to $\\infty$', 'High-performance normalized vector search'],
                  vi: ['`<#>`', 'Tích Vô Hướng Đảo Dấu', '$-\\infty$ đến $\\infty$', 'Tìm kiếm siêu tốc với vector đã chuẩn hóa đơn vị'],
                },
              ],
            },
            codeBlock: {
              language: 'sql',
              filename: 'query_similarity.sql',
              explanation: {
                en: 'Executes a hybrid metadata-filtered vector nearest neighbor search with similarity score transformation.',
                vi: 'Thực thi truy vấn vector kết hợp lọc metadata và chuyển đổi khoảng cách sang điểm tương đồng Cosine.',
              },
              code: `-- Query top 5 most relevant chunks matching the user query vector
-- passing query_vector as parameter $1 and organization_id as $2
SELECT 
    id,
    document_id,
    content,
    metadata->>'source_url' AS source_url,
    -- Convert Cosine Distance back to Cosine Similarity score (0.0 to 1.0)
    1 - (embedding <=> $1::vector) AS similarity_score
FROM document_chunks
WHERE 
    -- Metadata pre-filter for multi-tenant isolation
    (metadata->>'tenant_id') = $2
    -- Quality threshold: filter out chunks with low similarity
    AND (1 - (embedding <=> $1::vector)) > 0.70
ORDER BY 
    embedding <=> $1::vector ASC
LIMIT 5;`,
            },
            diagram: {
              title: {
                en: 'Vector Distance vs Similarity Transformation',
                vi: 'Chuyển Đổi Khoảng Cách Sang Điểm Tương Đồng Vector',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Query Vector Embedding', vi: 'Embedding Câu Hỏi' },
                  description: {
                    en: 'Model generates 768-dimensional array representing user question semantics.',
                    vi: 'Mô hình tạo mảng 768 phần tử đại diện cho ngữ nghĩa câu hỏi người dùng.',
                  },
                },
                {
                  number: 2,
                  label: { en: '<=> Angular Distance Calculation', vi: 'Tính Khoảng Cách Góc <=>' },
                  description: {
                    en: 'PostgreSQL evaluates cosine distance between query vector and indexed chunks.',
                    vi: 'PostgreSQL tính toán khoảng cách góc cosine giữa vector câu hỏi và các chunk đã index.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Ranking & Context Synthesis', vi: 'Xếp Hạng & Nạp Vào Prompt' },
                  description: {
                    en: 'Top 5 highest similarity text chunks are injected into LLM prompt context.',
                    vi: 'Top 5 đoạn tài liệu có điểm tương đồng cao nhất được nạp vào ngữ cảnh của LLM.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Sorting by DESC instead of ASC when ordering by distance operator <=>',
                  vi: 'Sắp xếp DESC thay vì ASC khi dùng toán tử khoảng cách <=>',
                },
                why: {
                  en: 'The `<=>` operator returns distance (where 0 is closest). Ordering by DESC will return the 5 LEAST relevant documents in your entire database.',
                  vi: 'Toán tử `<=>` trả về khoảng cách (càng gần 0 càng giống nhau). Sắp xếp `DESC` sẽ lấy ra 5 tài liệu KHÔNG liên quan nhất trong database.',
                },
                solution: {
                  en: 'Always sort `ORDER BY embedding <=> query_vector ASC` when using distance operators, or sort DESC only if ordering by the computed similarity `1 - (embedding <=> query)`.',
                  vi: 'Luôn sắp xếp `ORDER BY embedding <=> query_vector ASC` khi dùng toán tử khoảng cách, hoặc chỉ dùng DESC khi sắp xếp theo điểm tương đồng đã quy đổi `1 - distance`.',
                },
                codeIncorrect: `ORDER BY embedding <=> $query DESC -- Returns completely wrong documents!`,
                codeCorrect: `ORDER BY embedding <=> $query ASC  -- Correct: closest distance first`,
              },
            ],
            practicalScenario: {
              en: 'A medical compliance system needed to retrieve FDA regulatory guidelines matching clinical trial reports. By executing filtered pgvector queries using `<=>` with a strict `similarity > 0.78` cutoff, the system filtered out 99.4% of irrelevant drug trial documents, ensuring the LLM received only directly applicable regulatory statutes.',
              vi: 'Một hệ thống kiểm định y tế cần tra cứu quy định của FDA phù hợp với báo cáo thử nghiệm lâm sàng. Bằng cách thực thi truy vấn pgvector dùng toán tử `<=>` kèm bộ lọc ngưỡng `similarity > 0.78`, hệ thống đã loại bỏ 99.4% các tài liệu thử nghiệm thuốc không liên quan, đảm bảo LLM chỉ nhận đúng các điều luật y tế thích hợp nhất.',
            },
            bestPractices: {
              en: [
                'Always use `ASC` sorting when ordering directly by `<=>` distance.',
                'Convert distance to similarity `1 - (embedding <=> query)` for human-readable scoring and thresholding.',
                'Combine vector queries with metadata JSONB indices (`GIN` index on `metadata`) for high-speed multi-tenant filtering.',
              ],
              vi: [
                'Luôn sử dụng thứ tự sắp xếp `ASC` khi order trực tiếp theo khoảng cách `<=>`.',
                'Chuyển đổi khoảng cách sang độ tương đồng `1 - (embedding <=> query)` để dễ đọc và lọc theo ngưỡng.',
                'Kết hợp truy vấn vector với chỉ mục JSONB (`GIN` index trên cột `metadata`) để lọc phân quyền người dùng siêu tốc.',
              ],
            },
            keyTakeaways: {
              en: [
                'The `<=>` operator computes angular Cosine Distance in pgvector.',
                'Smaller distance values indicate higher semantic similarity.',
                'Threshold filtering prevents low-quality context chunks from contaminating LLM responses.',
              ],
              vi: [
                'Toán tử `<=>` tính toán khoảng cách góc Cosine trong pgvector.',
                'Giá trị khoảng cách càng nhỏ thể hiện mức độ tương đồng ngữ nghĩa càng cao.',
                'Lọc theo ngưỡng điểm tương đồng giúp ngăn chặn tài liệu rác làm nhiễu câu trả lời của LLM.',
              ],
            },
          },
        ],
      },
    ],
  },

  // 10. Fine-Tuning Handbook
  {
    id: 'fine-tuning-handbook',
    slug: 'fine-tuning-handbook',
    title: 'LLM Fine-Tuning & Parameter-Efficient Tuning (LoRA)',
    subtitle: {
      en: 'LoRA, QLoRA, Dataset Curation & Instruction Tuning Mechanics',
      vi: 'Kỹ Thuật LoRA, QLoRA, Chuẩn Bị Dataset & Tinh Chỉnh Instruction Tuning',
    },
    bookType: 'Handbook',
    categoryId: 'ai',
    subjectId: 'ai',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Advanced',
    estimatedReadTime: '35 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-violet-800 to-indigo-950',
    tags: ['Fine-Tuning', 'LoRA', 'QLoRA', 'PEFT', 'Handbook'],
    description: {
      en: 'Engineering handbook for fine-tuning open Large Language Models: Parameter-Efficient Fine-Tuning (PEFT), Low-Rank Adaptation (LoRA matrices A & B), 4-bit QLoRA quantization, and dataset formatting.',
      vi: 'Cẩm nang kỹ thuật tinh chỉnh (fine-tune) mô hình ngôn ngữ lớn: Phương pháp PEFT, ma trận LoRA A & B, lượng hóa 4-bit QLoRA và định dạng tập dữ liệu huấn luyện.',
    },
    prerequisites: {
      en: ['Deep Learning fundamentals and PyTorch experience'],
      vi: ['Nền tảng Deep Learning và kinh nghiệm sử dụng PyTorch'],
    },
    outcomes: {
      en: ['Understand LoRA rank decomposition matrix mechanics W + BA', 'Prepare instruction-tuning JSONL dataset formats'],
      vi: ['Hiểu bản chất phân rã ma trận hạng thấp LoRA W + BA', 'Chuẩn bị tập dữ liệu huấn luyện Instruction Tuning dạng JSONL'],
    },
    chapters: [
      {
        id: 'fth-ch-1',
        number: 1,
        slug: 'lora-and-qlora-mechanics',
        title: {
          en: 'Low-Rank Adaptation (LoRA) & QLoRA Mechanics',
          vi: 'Cơ Chế Kỹ Thuật Low-Rank Adaptation (LoRA) & QLoRA',
        },
        summary: {
          en: 'Freezing base weights W and injecting trainable low-rank decomposition matrices A (r x k) and B (d x r).',
          vi: 'Đóng băng trọng số gốc W và chèn cặp ma trận hạng thấp A và B có thể huấn luyện.',
        },
        readTimeMinutes: 18,
        sections: [
          {
            id: 'fth-1-1',
            title: {
              en: 'Mathematical Principles of Low-Rank Adaptation (LoRA) & QLoRA',
              vi: 'Nguyên Lý Toán Học Của Low-Rank Adaptation (LoRA) & QLoRA',
            },
            keyIdea: {
              en: 'Full fine-tuning updates all billions of base model weights, demanding massive GPU clusters. LoRA freezes original weights $W_0$ and decomposes weight updates into two tiny low-rank matrices $\\Delta W = B \\cdot A$ (where rank $r \\ll d$), slashing trainable parameters by 99% and optimizer VRAM by 75%.',
              vi: 'Fine-tuning toàn diện (Full fine-tune) phải cập nhật hàng chục tỷ trọng số của mô hình gốc, đòi hỏi cụm GPU khổng lồ. LoRA đóng băng toàn bộ trọng số gốc $W_0$ và phân rã ma trận biến thiên thành hai ma trận nhỏ $\\Delta W = B \\cdot A$ (với hạng $r \\ll d$), giảm 99% số tham số huấn luyện và tiết kiệm 75% VRAM cho optimizer.',
            },
            content: {
              en: 'During standard LLM pre-training, weight matrices $W_0 \\in \\mathbb{R}^{d \\times k}$ have full rank. However, research proves that adapting an LLM to a specialized downstream task (such as medical diagnosis or SQL generation) exhibits a low "intrinsic dimension". LoRA exploits this insight by freezing $W_0$ and learning a low-rank decomposition $\\Delta W = B \\cdot A$, where $A \\in \\mathbb{R}^{r \\times k}$ is initialized with Gaussian noise and $B \\in \\mathbb{R}^{d \\times r}$ is initialized to zero. For a forward pass, the modified output is computed as $h = W_0 x + \\frac{\\alpha}{r} (B A) x$, where $\\alpha$ is a constant scaling hyperparameter. **QLoRA (Quantized LoRA)** extends this paradigm further by quantizing the base model weights $W_0$ into **4-bit NormalFloat (NF4)** and computing backpropagation gradients through the frozen 4-bit weights into 16-bit LoRA adapter matrices with double quantization and paged optimizers, allowing a 70B parameter model to be fine-tuned on a single consumer 48GB GPU.',
              vi: 'Trong giai đoạn pre-training, ma trận trọng số $W_0 \\in \\mathbb{R}^{d \\times k}$ của transformer có hạng đầy đủ. Tuy nhiên, các nghiên cứu chứng minh rằng khi tinh chỉnh mô hình cho một tác vụ hẹp cụ thể (như chẩn đoán y khoa hay viết mã SQL), ma trận cập nhật có "chiều nội tại" (intrinsic dimension) rất thấp. LoRA tận dụng điều này bằng cách đóng băng $W_0$ và chỉ huấn luyện ma trận phân rã hạng thấp $\\Delta W = B \\cdot A$, trong đó $A \\in \\mathbb{R}^{r \\times k}$ được khởi tạo bằng phân phối Gauss và $B \\in \\mathbb{R}^{d \\times r}$ khởi tạo bằng 0. Trong lượt truyền xuôi (forward pass), đầu ra được tính bằng $h = W_0 x + \\frac{\\alpha}{r} (B A) x$, với $\\alpha$ là hệ số tỷ lệ. **QLoRA (Quantized LoRA)** nâng cấp phương pháp này lên tầm cao mới bằng cách nén trọng số gốc $W_0$ xuống định dạng **4-bit NormalFloat (NF4)**, tính toán gradient ngược qua trọng số 4-bit nạp vào ma trận adapter LoRA 16-bit với kỹ thuật Double Quantization và Paged Optimizers, cho phép fine-tune mô hình 70 tỷ tham số trên duy nhất 1 GPU 48GB thương mại.',
            },
            comparisonTable: {
              headers: [
                { en: 'Fine-Tuning Method', vi: 'Phương Pháp Fine-Tuning' },
                { en: 'Base Weights State', vi: 'Trạng Thái Trọng Số Gốc' },
                { en: 'Trainable Parameter %', vi: 'Tỷ Lệ Tham Số Huấn Luyện' },
                { en: 'vRAM Required (7B Model)', vi: 'VRAM Yêu Cầu (Mô Hình 7B)' },
              ],
              rows: [
                {
                  en: ['Full Parameter Fine-Tuning', 'Updated directly in FP16/BF16', '100% (7,000,000,000 params)', '~80 GB (Multi-GPU A100/H100)'],
                  vi: ['Full Fine-Tuning Toàn Phần', 'Cập nhật trực tiếp ở định dạng FP16', '100% (7 tỷ tham số)', '~80 GB (Cần nhiều GPU A100/H100)'],
                },
                {
                  en: ['LoRA (Rank r=16)', 'Frozen in 16-bit precision', '< 0.2% (~14,000,000 params)', '~16 GB - 20 GB (Single GPU)'],
                  vi: ['LoRA (Hạng r=16)', 'Đóng băng ở độ chính xác 16-bit', '< 0.2% (~14 triệu tham số)', '~16 GB - 20 GB (1 GPU thông thường)'],
                },
                {
                  en: ['QLoRA (4-bit NF4 + LoRA)', 'Quantized to 4-bit NormalFloat', '< 0.2% (16-bit Adapters only)', '~6 GB - 9 GB (Consumer GPU RTX 4090)'],
                  vi: ['QLoRA (4-bit NF4 + LoRA)', 'Lượng hóa nén xuống 4-bit NF4', '< 0.2% (Chỉ tính adapter 16-bit)', '~6 GB - 9 GB (GPU phổ thông RTX 4090)'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'qlora_training.py',
              explanation: {
                en: 'Configures BitsAndBytes 4-bit quantization and initializes PEFT LoraConfig for target attention projection modules.',
                vi: 'Cấu hình lượng hóa 4-bit BitsAndBytes và khởi tạo LoraConfig của thư viện PEFT cho các module Attention.',
              },
              code: `import torch
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, TaskType

# 1. Configure 4-bit NF4 Quantization for QLoRA
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,
)

# 2. Load frozen base model in 4-bit
base_model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    quantization_config=bnb_config,
    device_map="auto"
)

# 3. Configure Parameter-Efficient LoRA Adapter
peft_config = LoraConfig(
    r=16,                         # LoRA decomposition rank
    lora_alpha=32,                # Scaling factor (alpha/r = 2.0)
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

# 4. Wrap base model with trainable LoRA adapters
model = get_peft_model(base_model, peft_config)
model.print_trainable_parameters()
# Output: trainable params: 13,631,488 || all params: 7,255,363,584 || trainable%: 0.1878%`,
            },
            diagram: {
              title: {
                en: 'LoRA Matrix Decomposition Forward Pass',
                vi: 'Sơ Đồ Phân Rã Ma Trận LoRA Trong Forward Pass',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Frozen Base Weight W0', vi: 'Trọng Số Gốc Đóng Băng W0' },
                  description: {
                    en: 'Input vector x passes through original frozen weight matrix W0*x.',
                    vi: 'Vector đầu vào x đi qua ma trận trọng số gốc đóng băng W0*x.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Low-Rank Adapter Path (B x A)', vi: 'Nhánh Adapter Hạng Thấp (B x A)' },
                  description: {
                    en: 'Simultaneously passes through down-projection A (r x d) then up-projection B (d x r).',
                    vi: 'Đồng thời đi qua ma trận nén A (r x d) và ma trận phóng B (d x r).',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Scaled Addition (h = W0*x + (a/r)*BA*x)', vi: 'Cộng Tổng Có Trọng Số' },
                  description: {
                    en: 'The adapter delta is scaled by alpha/r and added directly to the base projection.',
                    vi: 'Độ lệch delta của adapter được nhân tỷ lệ alpha/r và cộng trực tiếp vào kết quả gốc.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Setting rank r excessively high (e.g. r=256) thinking it linearly improves accuracy',
                  vi: 'Đặt hạng r quá cao (ví dụ r=256) với niềm tin sai lầm rằng càng lớn mô hình càng thông minh',
                },
                why: {
                  en: 'Empirical research shows rank r=8 to r=16 captures 98%+ of adaptation capability. Higher rank dramatically increases GPU memory and leads to severe overfitting on small datasets.',
                  vi: 'Thực nghiệm chứng minh hạng r=8 đến r=16 đã giải quyết được hơn 98% tác vụ. Đặt r quá lớn làm tăng vọt bộ nhớ GPU và gây hiện tượng overfitting nghiêm trọng trên tập dữ liệu nhỏ.',
                },
                solution: {
                  en: 'Standardize on rank r=8 or r=16 with alpha=16 or alpha=32 for target attention and MLP projection layers.',
                  vi: 'Tiêu chuẩn hóa ở mức rank r=8 hoặc r=16 với alpha=16 hoặc alpha=32 trên các tầng projection attention và MLP.',
                },
                codeIncorrect: `LoraConfig(r=256, lora_alpha=512) # Overfitting & high VRAM waste`,
                codeCorrect: `LoraConfig(r=16, lora_alpha=32)   # Optimal balance of capacity and efficiency`,
              },
            ],
            practicalScenario: {
              en: 'An e-commerce team needed a specialized model to extract structured specifications from messy Vietnamese product titles. Full fine-tuning Mistral-7B crashed their single 24GB RTX 4090 GPU with Out-Of-Memory errors. Switching to QLoRA with 4-bit NF4 and rank r=16 allowed training to run with 7.8GB VRAM at 4x faster iteration cycles, achieving 97.2% parsing accuracy.',
              vi: 'Một đội ngũ thương mại điện tử cần mô hình chuyên biệt để trích xuất thông số kỹ thuật từ tiêu đề sản phẩm tiếng Việt. Việc full fine-tuning mô hình Mistral-7B làm tràn bộ nhớ (OOM) chiếc GPU 24GB RTX 4090 duy nhất của họ. Chuyển sang QLoRA với 4-bit NF4 và rank r=16 giúp quá trình huấn luyện chỉ tốn 7.8GB VRAM, tốc độ lặp nhanh gấp 4 lần và đạt độ chính xác trích xuất 97.2%.',
            },
            bestPractices: {
              en: [
                'Target all linear layers (`q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj`) for maximum task adaptation.',
                'Maintain an $\\alpha / r$ ratio of $2.0$ (e.g., $r=16, \\alpha=32$) for stable learning rate scaling.',
                'Merge LoRA weights back into the base model (`model.merge_and_unload()`) before deployment to eliminate inference latency overhead.',
              ],
              vi: [
                'Áp dụng adapter lên toàn bộ các tầng tuyến tính (`q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj`) để đạt hiệu quả học tốt nhất.',
                'Duy trì tỷ lệ $\\alpha / r$ bằng $2.0$ (ví dụ $r=16, \\alpha=32$) để learning rate ổn định xuyên suốt quá trình huấn luyện.',
                'Gộp trọng số LoRA vào mô hình gốc (`model.merge_and_unload()`) trước khi triển khai production để không phát sinh độ trễ khi suy luận.',
              ],
            },
            keyTakeaways: {
              en: [
                'LoRA enables high-quality LLM customization with under 0.2% trainable parameters.',
                'QLoRA democratizes fine-tuning 70B models on single consumer GPU hardware.',
                'Merging adapters post-training guarantees zero added latency during production inference.',
              ],
              vi: [
                'LoRA giúp tùy biến LLM chất lượng cao với chưa đầy 0.2% tổng số tham số cần huấn luyện.',
                'QLoRA phổ cập hóa việc fine-tune mô hình 70B trên phần cứng GPU thông dụng.',
                'Gộp adapter sau khi train xong đảm bảo không gây phát sinh bất kỳ độ trễ suy luận nào.',
              ],
            },
          },
        ],
      },
      {
        id: 'fth-ch-2',
        number: 2,
        slug: 'dataset-curation-instruction-tuning',
        title: {
          en: 'Dataset Curation & Instruction Formatting',
          vi: 'Xử Lý Tập Dữ Liệu & Định Dạng Instruction Tuning',
        },
        summary: {
          en: 'Formatting system-user-assistant JSONL lines and cleaning noisy tokens.',
          vi: 'Định dạng các dòng system-user-assistant dạng JSONL và làm sạch token rác.',
        },
        readTimeMinutes: 17,
        sections: [
          {
            id: 'fth-2-1',
            title: {
              en: 'Instruction Dataset Engineering & ChatML Tokenization',
              vi: 'Kỹ Thuật Xây Dựng Tập Dữ Liệu Instruction & Chuẩn ChatML',
            },
            keyIdea: {
              en: 'Dataset quality dramatically outweighs quantity. 1,000 clean, expertly verified JSONL instruction examples outperform 100,000 noisy scraped samples. Enforcing strict ChatML role formatting (<|im_start|>system...<|im_end|>) prevents role bleeding and catastrophic forgetting.',
              vi: 'Chất lượng tập dữ liệu quan trọng hơn số lượng gấp bội. 1.000 mẫu instruction JSONL được thẩm định kỹ lưỡng bởi chuyên gia mang lại hiệu quả vượt trội hơn 100.000 mẫu cào tự động đầy nhiễu. Định dạng phân vai ChatML (<|im_start|>system...<|im_end|>) giúp tránh hiện tượng lẫn lộn vai và quên kiến thức gốc.',
            },
            content: {
              en: 'Instruction Tuning transforms a raw auto-regressive next-token predictor into an aligned conversational assistant. The training data must be prepared as Line-Delimited JSON (JSONL), where each line is an object containing a list of `messages` with assigned roles (`system`, `user`, `assistant`). During tokenization, special delimiter tokens (such as `<|im_start|>system\\n...<|im_end|>`) are injected. Crucially, during loss computation, the cross-entropy loss must be calculated **strictly on assistant response tokens** (setting the loss mask label to `-100` for all system prompts and user questions). If system and user tokens are included in the loss gradient, the model will waste capacity memorizing prompt phrasing rather than mastering problem-solving reasoning.',
              vi: 'Instruction Tuning biến đổi một mô hình sinh token tiếp theo thuần túy thành một trợ lý đàm thoại có khả năng tuân thủ chỉ thị. Tập dữ liệu phải được chuẩn bị dưới dạng file JSONL (mỗi dòng là một chuỗi JSON hợp lệ), chứa mảng `messages` phân định rõ vai trò (`system`, `user`, `assistant`). Trong quá trình tokenize, các token phân cách đặc biệt (như `<|im_start|>system\\n...<|im_end|>`) sẽ được tự động chèn vào. Điểm then chốt là hàm tính mất mát (loss function) **chỉ được tính trên các token câu trả lời của assistant** (gán nhãn target bằng `-100` cho toàn bộ prompt hệ thống và câu hỏi người dùng). Nếu tính loss trên cả câu hỏi của user, mô hình sẽ bị phân tán năng lực ghi nhớ câu từ thay vì học tư duy suy luận giải quyết vấn đề.',
            },
            comparisonTable: {
              headers: [
                { en: 'Dataset Aspect', vi: 'Khía Cạnh Dữ Liệu' },
                { en: 'Sub-optimal Practice (Noisy)', vi: 'Cách Làm Kém (Nhiều Rác)' },
                { en: 'Production Best Practice', vi: 'Chuẩn Mực Chuyên Nghiệp' },
              ],
              rows: [
                {
                  en: ['Sample Volume vs Quality', '100,000 raw web scraped QA pairs', '1,500 - 3,000 human-vetted, high-diversity examples'],
                  vi: ['Số Lượng vs Chất Lượng', '100.000 cặp hỏi đáp cào thô trên web', '1.500 - 3.000 mẫu đa dạng, được chuyên gia kiểm duyệt kỹ'],
                },
                {
                  en: ['Loss Masking Strategy', 'Compute loss across entire sequence', 'Mask system and user tokens with label=-100'],
                  vi: ['Chiến Lược Mask Loss', 'Tính loss trên toàn bộ chuỗi token', 'Gán nhãn -100 cho system và user, chỉ tính loss trên assistant'],
                },
                {
                  en: ['Prompt Template Consistency', 'Mixing arbitrary formatting styles', 'Strict adherence to model native ChatML / Jinja2 template'],
                  vi: ['Tính Đồng Nhất Template', 'Trộn lẫn nhiều kiểu prompt khác nhau', 'Tuân thủ nghiêm ngặt chuẩn ChatML / Jinja2 của mô hình'],
                },
              ],
            },
            codeBlock: {
              language: 'json',
              filename: 'instruction_dataset.jsonl',
              explanation: {
                en: 'Standard JSONL training line demonstrating multi-turn messages schema with structured output target.',
                vi: 'Dòng dữ liệu mẫu JSONL minh họa cấu trúc tin nhắn nhiều lượt với mục tiêu trả về JSON có cấu trúc.',
              },
              code: `{"messages": [{"role": "system", "content": "You are a financial risk extraction engine. Output strictly in valid JSON."}, {"role": "user", "content": "Analyze the revenue disclosure: 'Q3 net profit fell by 14% due to currency volatility.'"}, {"role": "assistant", "content": "{\\n  \\"risk_category\\": \\"Forex Volatility\\",\\n  \\"impact_level\\": \\"Moderate\\",\\n  \\"metric_change_pct\\": -14.0\\n}"}]}`,
            },
            diagram: {
              title: {
                en: 'Cross-Entropy Loss Masking in Instruction Tuning',
                vi: 'Cơ Chế Mask Loss Trong Quá Trình Huấn Luyện Instruction',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'System & User Prefix (Masked)', vi: 'System & User (Gán -100)' },
                  description: {
                    en: 'Tokens representing instructions are masked with label=-100 (gradients ignored).',
                    vi: 'Các token chỉ thị và câu hỏi được gán nhãn -100 (không tính đạo hàm gradient).',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Assistant Completion (Active Loss)', vi: 'Assistant (Tính Loss)' },
                  description: {
                    en: 'Loss is computed token-by-token strictly on the assistant target generation.',
                    vi: 'Mất mát cross-entropy được tính toán chính xác trên từng token phản hồi của assistant.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Adapter Gradient Backpropagation', vi: 'Lan Truyền Ngược Gradient' },
                  description: {
                    en: 'Optimizer updates only the low-rank adapter matrices B and A.',
                    vi: 'Bộ tối ưu cập nhật trọng số cho các ma trận phân rã LoRA B và A.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Training on unstructured raw text files without role separation tokens',
                  vi: 'Huấn luyện trên các file text thô không có thẻ phân định vai trò',
                },
                why: {
                  en: 'Without ChatML role tokens, the model continues generating arbitrary paragraphs instead of learning to stop at the end-of-turn delimiter.',
                  vi: 'Nếu thiếu thẻ vai trò ChatML, mô hình sẽ tiếp tục luyên thuyên viết đoạn văn vô tận thay vì dừng lại đúng lúc khi hoàn thành câu trả lời.',
                },
                solution: {
                  en: 'Always use the model tokenizer apply_chat_template utility to format data using official Jinja templates.',
                  vi: 'Luôn sử dụng hàm `tokenizer.apply_chat_template` để định dạng dữ liệu chuẩn theo Jinja template của mô hình.',
                },
                codeIncorrect: `text = f"Question: {q} Answer: {a}" # Missing end-of-sequence delimiters!`,
                codeCorrect: `formatted_text = tokenizer.apply_chat_template(messages, tokenize=False)`,
              },
            ],
            practicalScenario: {
              en: 'A legal-tech startup prepared 50,000 synthetic contract questions. However, the model regularly generated fake user follow-up questions instead of stopping. By switching to tokenizer chat templates and applying cross-entropy loss masking on user tokens, the model learned crisp conversational turn boundaries with zero hallucinated follow-up questions.',
              vi: 'Một công ty công nghệ pháp lý chuẩn bị 50.000 câu hỏi hợp đồng giả lập. Tuy nhiên, sau khi train xong mô hình liên tục tự bịa ra câu hỏi của người dùng rồi tự trả lời tiếp không dừng. Nhờ chuyển sang template chat chuẩn và mask loss trên câu hỏi user, mô hình đã ngắt lượt đàm thoại chuẩn xác và dứt khoát.',
            },
            bestPractices: {
              en: [
                'Use `tokenizer.apply_chat_template` to ensure 100% token fidelity with the base model pre-training format.',
                'Always set label to `-100` on input prompt tokens during PyTorch dataset collator processing.',
                'Deduplicate and clean dataset examples using MinHash LSH to eliminate redundant training samples.',
              ],
              vi: [
                'Sử dụng `tokenizer.apply_chat_template` để đảm bảo định dạng token khớp 100% với cấu trúc pre-training.',
                'Luôn gán nhãn `-100` cho các token câu hỏi đầu vào trong bộ gom dữ liệu (Data Collator) của PyTorch.',
                'Lọc trùng và làm sạch tập dữ liệu bằng thuật toán MinHash LSH để loại bỏ các mẫu câu trùng lặp.',
              ],
            },
            keyTakeaways: {
              en: [
                'Data quality and variety are far more impactful than raw token quantity.',
                'Loss masking on non-assistant tokens is crucial to prevent prompt memorization.',
                'ChatML formatting ensures seamless multi-turn conversation support.',
              ],
              vi: [
                'Chất lượng và tính đa dạng của dữ liệu quan trọng hơn số lượng token rất nhiều.',
                'Mask loss trên câu hỏi của user là điều kiện bắt buộc để mô hình học tư duy giải quyết.',
                'Chuẩn định dạng ChatML đảm bảo mô hình giao tiếp mượt mà qua nhiều lượt hội thoại.',
              ],
            },
          },
        ],
      },
    ],
  },

  // 11. AI Safety & Alignment Definitions
  {
    id: 'ai-safety-alignment-definitions',
    slug: 'ai-safety-alignment-definitions',
    title: 'AI Safety & Alignment Terminology',
    subtitle: {
      en: 'RLHF, DPO, Red Teaming & Guardrails Glossary',
      vi: 'Phương Pháp RLHF, DPO, Đội Đỏ Red Teaming & Tra Cứu Khái Niệm An Toàn AI',
    },
    bookType: 'Definitions',
    categoryId: 'ai',
    subjectId: 'ai',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '20 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-12',
    accentColor: 'from-violet-600 to-indigo-800',
    tags: ['AI Safety', 'RLHF', 'DPO', 'Guardrails', 'Definitions'],
    description: {
      en: 'Definitions for AI Safety and Model Alignment terminology: RLHF (Reinforcement Learning from Human Feedback), DPO (Direct Preference Optimization), Red Teaming, and Guardrails.',
      vi: 'Từ điển định nghĩa các thuật ngữ An toàn AI và Căn chỉnh mô hình: RLHF, DPO, Kiểm thử xâm nhập Red Teaming và Hàng rào bảo vệ Guardrails.',
    },
    prerequisites: {
      en: ['Understanding of model training basics'],
      vi: ['Hiểu biết cơ bản về huấn luyện mô hình'],
    },
    outcomes: {
      en: ['Differentiate between RLHF reward model training and reference-free DPO optimization'],
      vi: ['Phân biệt giữa huấn luyện Reward Model trong RLHF và tối ưu trực tiếp DPO'],
    },
    chapters: [
      {
        id: 'asa-ch-1',
        number: 1,
        slug: 'rlhf-vs-dpo-definitions',
        title: {
          en: 'RLHF vs Direct Preference Optimization (DPO)',
          vi: 'Định Nghĩa RLHF vs Direct Preference Optimization (DPO)',
        },
        summary: {
          en: 'Comparing PPO reward models with direct log-likelihood loss optimization.',
          vi: 'So sánh mô hình phần thưởng PPO trong RLHF với tối ưu trực tiếp DPO.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'asa-1-1',
            title: {
              en: 'RLHF vs Direct Preference Optimization (DPO) Mechanics',
              vi: 'Cơ Chế Kỹ Thuật RLHF So Với Direct Preference Optimization (DPO)',
            },
            keyIdea: {
              en: 'While classical RLHF requires training a separate Reward Model and navigating unstable Proximal Policy Optimization (PPO) reinforcement learning loops, DPO mathematically reparameterizes the reward function directly into the policy loss, achieving equal or superior alignment with zero reward models and 3x faster training.',
              vi: 'Trong khi RLHF truyền thống đòi hỏi phải huấn luyện một Reward Model riêng biệt và chạy vòng lặp học tăng cường PPO phức tạp, DPO sử dụng công thức toán học để biểu diễn trực tiếp hàm phần thưởng vào hàm loss của mô hình, giúp căn chỉnh an toàn tương đương hoặc vượt trội mà không cần Reward Model và tốc độ huấn luyện nhanh gấp 3 lần.',
            },
            content: {
              en: 'Aligning LLMs with human preferences (Helpful, Honest, Harmless) traditionally used **RLHF (Reinforcement Learning from Human Feedback)**: (1) Annotators rank pairs of completions $(y_w \\succ y_l)$; (2) A Reward Model $r_\\theta(x, y)$ is trained to score completions; (3) PPO updates the actor policy with a KL-divergence penalty against the reference model. However, PPO is notoriously unstable, GPU-intensive, and prone to reward hacking. **Direct Preference Optimization (DPO)** analytically derives that the optimal policy $\\pi_\\theta$ can be trained directly on preference pairs using an exact binary cross-entropy loss: $\\mathcal{L}_{\\text{DPO}}(\\pi_\\theta; \\pi_{\\text{ref}}) = -\\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)} \\right) \\right]$. This bypasses reward modeling entirely, making preference alignment stable and lightweight.',
              vi: 'Căn chỉnh LLM theo giá trị của con người (Hữu ích, Trung thực, Vô hại) trước đây dựa vào **RLHF (Reinforcement Learning from Human Feedback)**: (1) Người gắn nhãn xếp hạng các cặp câu trả lời $(y_w \\succ y_l)$; (2) Huấn luyện một Reward Model $r_\\theta(x, y)$ để chấm điểm; (3) Thuật toán PPO cập nhật trọng số mô hình kèm phạt độ phân kỳ KL với mô hình gốc. Tuy nhiên, PPO cực kỳ kém ổn định, ngốn GPU và dễ bị bẻ khóa phần thưởng (reward hacking). **Direct Preference Optimization (DPO)** chứng minh bằng toán học rằng mô hình $\\pi_\\theta$ có thể học trực tiếp từ các cặp dữ liệu ưa thích/không ưa thích qua hàm mất mát Binary Cross-Entropy: $\\mathcal{L}_{\\text{DPO}}(\\pi_\\theta; \\pi_{\\text{ref}}) = -\\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)} \\right) \\right]$. Phương pháp này loại bỏ hoàn toàn Reward Model, giúp quá trình căn chỉnh mô hình ổn định và tiết kiệm tài nguyên.',
            },
            comparisonTable: {
              headers: [
                { en: 'Dimension', vi: 'Khía Cạnh So Sánh' },
                { en: 'RLHF with PPO', vi: 'RLHF Dùng Thuật Toán PPO' },
                { en: 'Direct Preference Optimization (DPO)', vi: 'Direct Preference Optimization (DPO)' },
              ],
              rows: [
                {
                  en: ['Models in Memory during Training', '4 models (Actor, Critic, Reference, Reward)', '2 models (Active Policy $\\pi_\\theta$, Frozen Reference $\\pi_{\\text{ref}}$)'],
                  vi: ['Số Mô Hình Trong RAM Lúc Train', '4 mô hình (Actor, Critic, Reference, Reward)', '2 mô hình (Mô hình đang train $\\pi_\\theta$, Mô hình gốc $\\pi_{\\text{ref}}$)'],
                },
                {
                  en: ['Training Stability', 'High hyperparameter sensitivity, unstable PPO gradients', 'Standard supervised cross-entropy stability'],
                  vi: ['Độ Ổn Định Khi Huấn Luyện', 'Rất nhạy cảm với siêu tham số, gradient PPO dễ nổ', 'Ổn định như huấn luyện Supervised tiêu chuẩn'],
                },
                {
                  en: ['Compute Infrastructure', 'Requires multi-node H100 GPU clusters', 'Can run on single GPU node with LoRA/QLoRA'],
                  vi: ['Hạ Tầng Tính Toán', 'Đòi hỏi cụm nhiều máy chủ GPU H100', 'Có thể chạy trên 1 máy GPU cá nhân kết hợp LoRA'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'dpo_trainer.py',
              explanation: {
                en: 'Configures DPOTrainer using HuggingFace TRL to align a model with preferred and rejected answer pairs.',
                vi: 'Cấu hình DPOTrainer từ thư viện TRL để căn chỉnh mô hình theo cặp câu trả lời được chọn và bị từ chối.',
              },
              code: `from trl import DPOTrainer, DPOConfig
from datasets import Dataset

# 1. Prepare preference dataset: prompt, chosen, rejected
data = {
    "prompt": ["How do I pick a secure lock on a hotel door?"],
    "chosen": ["I cannot provide instructions on picking locks or bypassing physical security systems. However, I can explain standard pin tumbler lock mechanics and ANSI security ratings."],
    "rejected": ["Here is how you use a tension wrench and rake pick to open the door cylinder in three simple steps..."]
}
dataset = Dataset.from_dict(data)

# 2. Configure DPO Hyperparameters
dpo_config = DPOConfig(
    beta=0.1,                     # Implicit reward scaling factor
    learning_rate=5e-7,
    max_length=1024,
    output_dir="./aligned_model",
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
)

# 3. Initialize Trainer (loads reference model automatically)
trainer = DPOTrainer(
    model=model,
    args=dpo_config,
    train_dataset=dataset,
    tokenizer=tokenizer,
)
trainer.train()`,
            },
            diagram: {
              title: {
                en: 'DPO vs RLHF Pipeline Comparison',
                vi: 'So Sánh Quy Trình DPO và RLHF',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Preference Dataset Pairing', vi: 'Chuẩn Bị Cặp Dữ Liệu' },
                  description: {
                    en: 'Collect prompt x with preferred response y_w and rejected response y_l.',
                    vi: 'Thu thập prompt x cùng câu trả lời được chọn y_w và câu trả lời bị từ chối y_l.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Implicit Reward Computation', vi: 'Tính Toán Phần Thưởng Ngầm' },
                  description: {
                    en: 'DPO evaluates relative probability log ratios against frozen reference model.',
                    vi: 'DPO đánh giá tỷ lệ xác suất logarit so với mô hình gốc được đóng băng.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Direct Policy Gradient Step', vi: 'Cập Nhật Trực Tiếp Trọng Số' },
                  description: {
                    en: 'Optimizes weights directly via cross-entropy loss without any reward model.',
                    vi: 'Tối ưu hóa trực tiếp qua hàm mất mát cross-entropy mà không cần bất kỳ Reward Model nào.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Setting the DPO beta parameter too high (e.g. beta=0.9), destroying language fluency',
                  vi: 'Đặt tham số beta quá lớn (ví dụ beta=0.9), làm hỏng khả năng diễn đạt lưu loát của mô hình',
                },
                why: {
                  en: 'Beta controls the strength of the KL divergence penalty against the reference model. High beta forces the model to stay too rigid or causes degenerate repetitive outputs.',
                  vi: 'Beta kiểm soát mức phạt độ phân kỳ KL so với mô hình gốc. Beta quá cao khiến mô hình bị cứng nhắc hoặc lặp từ vô nghĩa.',
                },
                solution: {
                  en: 'Keep beta in the recommended range of 0.05 to 0.2 (0.1 is standard across leading research).',
                  vi: 'Luôn giữ beta trong khoảng khuyến nghị từ 0.05 đến 0.2 (0.1 là giá trị chuẩn trong hầu hết nghiên cứu).',
                },
                codeIncorrect: `DPOConfig(beta=0.8) # Overly punitive KL penalty`,
                codeCorrect: `DPOConfig(beta=0.1) # Balanced alignment and linguistic fluency`,
              },
            ],
            practicalScenario: {
              en: 'An enterprise healthcare assistant needed alignment to refuse diagnosing complex illnesses while warmly encouraging doctor visits. Attempting RLHF with PPO produced constant reward collapse. Switching to DPO with 2,500 curated chosen/rejected medical guidance pairs aligned the model within 2 hours on a single GPU node, achieving 100% policy compliance.',
              vi: 'Một trợ lý y tế cần được căn chỉnh để từ chối tự ý chẩn đoán bệnh phức tạp và khuyên người dùng đi khám bác sĩ. Khi thử nghiệm RLHF với PPO, mô hình liên tục bị sụp đổ phần thưởng. Chuyển sang DPO với 2.500 cặp câu trả lời được chọn/bị loại bỏ, mô hình đã được căn chỉnh thành công sau 2 giờ trên 1 máy GPU duy nhất, đạt 100% tuân thủ quy tắc an toàn y tế.',
            },
            bestPractices: {
              en: [
                'Set $\\beta \\in [0.05, 0.15]$ for stable optimization without degrading generative quality.',
                'Ensure rejected responses represent plausible but policy-violating generations rather than gibberish.',
                'Combine DPO with LoRA parameter-efficient training to align large models on minimal hardware.',
              ],
              vi: [
                'Thiết lập $\\beta \\in [0.05, 0.15]$ để tối ưu ổn định mà không làm suy giảm chất lượng câu văn.',
                'Đảm bảo câu trả lời bị từ chối là văn bản mạch lạc nhưng vi phạm chính sách, thay vì các câu vô nghĩa.',
                'Kết hợp DPO với kỹ thuật LoRA để căn chỉnh mô hình lớn trên phần cứng tối thiểu.',
              ],
            },
            keyTakeaways: {
              en: [
                'DPO provides mathematically exact preference optimization without reward models.',
                'DPO uses 50% less GPU memory and provides dramatically higher training stability than PPO.',
                'Carefully curated chosen/rejected pairs are the primary determinant of alignment success.',
              ],
              vi: [
                'DPO mang lại thuật toán căn chỉnh theo sở thích chính xác về mặt toán học mà không cần Reward Model.',
                'DPO tiết kiệm 50% RAM GPU và ổn định hơn vượt trội so với thuật toán PPO.',
                'Các cặp câu trả lời chosen/rejected được chọn lọc kỹ càng quyết định trực tiếp chất lượng an toàn của mô hình.',
              ],
            },
          },
        ],
      },
      {
        id: 'asa-ch-2',
        number: 2,
        slug: 'guardrails-and-red-teaming',
        title: {
          en: 'Guardrails & Adversarial Red Teaming Definitions',
          vi: 'Thuật Ngữ Hàng Rào Guardrails & Kiểm Thử Red Teaming',
        },
        summary: {
          en: 'Input/output guardrails filters and jailbreak testing methodologies.',
          vi: 'Bộ lọc guardrail đầu vào/đầu ra và phương pháp thử nghiệm jailbreak.',
        },
        readTimeMinutes: 10,
        sections: [
          {
            id: 'asa-2-1',
            title: {
              en: 'Runtime Guardrails Architecture & Automated Red Teaming',
              vi: 'Kiến Trúc Hàng Rào Guardrails Lúc Chạy & Kiểm Thử Red Teaming Tự Động',
            },
            keyIdea: {
              en: 'Model alignment alone is insufficient; sophisticated jailbreaks can bypass internal safety. Guardrails act as an external programmatic middleware layer verifying input prompts and output responses against PII leaks, toxic content, and prompt injections.',
              vi: 'Chỉ dựa vào việc căn chỉnh mô hình là chưa đủ; các kỹ thuật jailbreak tinh vi vẫn có thể vượt qua lớp bảo vệ bên trong. Hàng rào Guardrails đóng vai trò là lớp middleware lập trình bên ngoài kiểm soát prompt đầu vào và câu trả lời đầu ra để chặn lộ lọt dữ liệu cá nhân (PII), ngôn từ độc hại và prompt injection.',
            },
            content: {
              en: 'In production AI engineering, safety is enforced through **Defense-in-Depth**. The Guardrails layer operates asynchronously or synchronously around the LLM: (1) **Input Guardrails** inspect user queries before they hit the LLM, screening for toxic intent, PII (Social Security Numbers, Credit Cards), and known jailbreak patterns (e.g., roleplay override frameworks like "Do Anything Now"); (2) **Output Guardrails** scan the generated tokens before returning them to the user, verifying structural JSON schemas, checking for hallucinated toxic output, and masking sensitive secrets; (3) **Automated Red Teaming** continuously probes the deployed system using adversarial LLMs that generate thousands of polymorphic jailbreak variations to identify security blind spots before malicious actors exploit them.',
              vi: 'Trong kỹ thuật AI thực chiến, an toàn được thực thi qua chiến lược **Phòng Thủ Đa Tầng (Defense-in-Depth)**. Lớp Guardrails hoạt động như bộ lọc middleware bọc quanh LLM: (1) **Input Guardrails** soi chiếu câu hỏi của người dùng trước khi gửi đến LLM, quét sạch ý đồ độc hại, thông tin định danh cá nhân PII (số CCCD, thẻ tín dụng) và các mẫu jailbreak phổ biến (như bẻ khóa "Do Anything Now"); (2) **Output Guardrails** quét các token được sinh ra trước khi trả về cho client, xác thực cấu trúc JSON, chặn nội dung độc hại và làm mờ (mask) các khóa bí mật; (3) **Kiểm Thử Red Teaming Tự Động** liên tục rà quét hệ thống bằng cách sử dụng các mô hình AI đối kháng tạo ra hàng nghìn biến thể tấn công để phát hiện lỗ hổng trước khi tin tặc khai thác.',
            },
            comparisonTable: {
              headers: [
                { en: 'Security Layer', vi: 'Lớp Bảo Mật' },
                { en: 'Execution Timing', vi: 'Thời Điểm Thực Thi' },
                { en: 'Primary Protection Goal', vi: 'Mục Tiêu Bảo Vệ Chính' },
              ],
              rows: [
                {
                  en: ['Input Guardrails', 'Pre-inference (before LLM call)', 'Filter toxic prompts, PII, and jailbreak vectors'],
                  vi: ['Input Guardrails', 'Trước khi gọi LLM (Pre-inference)', 'Chặn câu hỏi độc hại, dữ liệu PII và các mẫu jailbreak'],
                },
                {
                  en: ['Output Guardrails', 'Post-inference (before streaming to client)', 'Validate JSON schema, redact leaked keys, filter hallucinated harms'],
                  vi: ['Output Guardrails', 'Sau khi sinh xong (Post-inference)', 'Kiểm tra chuẩn JSON, ẩn API key bị lộ, chặn nội dung vi phạm'],
                },
                {
                  en: ['Adversarial Red Teaming', 'Continuous CI/CD & Offline Testing', 'Stress-test system boundaries against novel attack vectors'],
                  vi: ['Adversarial Red Teaming', 'Kiểm thử liên tục trong CI/CD', 'Bắn thử hàng nghìn kịch bản tấn công đối kháng để tìm lỗ hổng'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'guardrails_pipeline.py',
              explanation: {
                en: 'Demonstrates input sanitization and output schema validation middleware using regex and fast classification models.',
                vi: 'Triển khai middleware kiểm tra an toàn đầu vào và xác thực định dạng đầu ra trước khi trả về người dùng.',
              },
              code: `import re

class EnterpriseGuardrails:
    def __init__(self, blocked_patterns: list[str]):
        self.blocked_regex = [re.compile(p, re.IGNORECASE) for p in blocked_patterns]
        self.pii_ssn_regex = re.compile(r'\\b\\d{3}-\\d{2}-\\d{4}\\b')

    def inspect_input(self, prompt: str) -> tuple[bool, str]:
        # 1. Check for known jailbreak keyword patterns
        for pattern in self.blocked_regex:
            if pattern.search(prompt):
                return False, "Prompt rejected: adversarial jailbreak pattern detected."
                
        # 2. Block direct SSN/PII submission
        if self.pii_ssn_regex.search(prompt):
            return False, "Prompt rejected: Sensitive Personal Identifiable Information (PII) detected."
            
        return True, prompt

    def sanitize_output(self, response_text: str) -> str:
        # Mask any accidental internal API key leakage in output
        sanitized = re.sub(r'(sk-[a-zA-Z0-9]{32,})', '[REDACTED_API_KEY]', response_text)
        return sanitized`,
            },
            diagram: {
              title: {
                en: 'Guardrails Middleware Flow in Production',
                vi: 'Quy Trình Xử Lý Của Middleware Guardrails',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Input Verification', vi: 'Kiểm Tra Đầu Vào' },
                  description: {
                    en: 'Sanitizes prompt and filters adversarial injections before contacting LLM.',
                    vi: 'Làm sạch prompt và lọc các câu lệnh độc hại trước khi chuyển đến LLM.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'LLM Generation', vi: 'LLM Xử Lý Suy Luận' },
                  description: {
                    en: 'Underlying foundation model generates response in isolated sandbox.',
                    vi: 'Mô hình nền tảng thực hiện suy luận và sinh phản hồi trong sandbox cô lập.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Output Redaction & Schema Check', vi: 'Soi Chiếu & Làm Mờ Đầu Ra' },
                  description: {
                    en: 'Output filter masks leaked secrets and enforces strict structural compliance.',
                    vi: 'Bộ lọc đầu ra làm mờ bí mật bị lộ và ép kiểu cấu trúc dữ liệu trả về cho client.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Relying exclusively on the system prompt ("You are a safe assistant, never leak secrets") for safety',
                  vi: 'Chỉ dựa duy nhất vào câu dặn dò trong system prompt ("Bạn là trợ lý an toàn, đừng bao giờ làm lộ bí mật")',
                },
                why: {
                  en: 'Prompt-level instructions can be easily subverted with clever multi-turn hypnosis or base64 encoded injection attacks.',
                  vi: 'Các câu dặn dò trong prompt rất dễ bị tin tặc vô hiệu hóa bằng kỹ thuật đa lượt hoặc mã hóa base64.',
                },
                solution: {
                  en: 'Always enforce hard programmatic guardrails in application code outside the LLM context window.',
                  vi: 'Luôn thiết lập các hàng rào guardrails bằng code phần mềm độc lập nằm ngoài cửa sổ ngữ cảnh của LLM.',
                },
                codeIncorrect: `system_prompt = "Never output API keys!" # Ineffective defense`,
                codeCorrect: `output = guardrails.sanitize_output(llm_response) # Programmatic guarantee`,
              },
            ],
            practicalScenario: {
              en: 'A customer support bot was tricked by a user pretending to be a senior developer debugging an emergency outage, asking it to output the internal database connection string. The LLM agreed, but the external Output Guardrail intercepted the response, identified the database URI signature, blocked the transmission, and triggered a security alert.',
              vi: 'Một chatbot hỗ trợ khách hàng bị người dùng đóng giả làm lập trình viên cao cấp đang xử lý sự cố khẩn cấp, yêu cầu bot in chuỗi kết nối database nội bộ. Mô hình LLM đã ngây thơ đồng ý, nhưng lớp Output Guardrail bên ngoài đã kịp thời phát hiện chữ ký URI database, chặn đứng việc gửi tin và phát cảnh báo bảo mật cho đội ngũ quản trị.',
            },
            bestPractices: {
              en: [
                'Combine deterministic regex filters with fast lightweight classification models (e.g., Llama-Guard).',
                'Implement rate limiting and token consumption caps per user to mitigate automated brute-force jailbreaks.',
                'Run weekly automated red teaming suites against staging environments to catch safety regressions.',
              ],
              vi: [
                'Kết hợp bộ lọc regex với các mô hình phân loại an toàn siêu nhẹ (như Llama-Guard).',
                'Thiết lập giới hạn tần suất (rate limit) và trần token theo user để chống các đợt tấn công brute-force.',
                'Chạy kiểm thử Red Teaming tự động hàng tuần trên môi trường staging để kịp thời phát hiện lỗ hổng mới.',
              ],
            },
            keyTakeaways: {
              en: [
                'Guardrails provide robust external programmatic defense outside the LLM.',
                'Input and Output inspection layers ensure end-to-end security compliance.',
                'Automated red teaming proactively identifies zero-day jailbreak vulnerabilities.',
              ],
              vi: [
                'Hàng rào Guardrails đem lại lớp phòng thủ lập trình vững chắc nằm ngoài LLM.',
                'Kiểm soát cả đầu vào lẫn đầu ra đảm bảo an toàn tuyệt đối cho ứng dụng.',
                'Red Teaming tự động giúp chủ động vá lỗ hổng jailbreak trước khi bị tấn công.',
              ],
            },
          },
        ],
      },
    ],
  },

  // 12. LLM Eval Practical Guide
  {
    id: 'llm-eval-practical-guide',
    slug: 'llm-eval-practical-guide',
    title: 'LLM Evaluation & Benchmarking Guide',
    subtitle: {
      en: 'Step-by-Step Practical Guide to LLM-as-a-Judge & RAG Triad Metrics',
      vi: 'Hướng Dẫn Thực Hành Từng Bước Đánh Giá Mô Hình AI Với LLM-as-a-Judge',
    },
    bookType: 'Practical Guides',
    categoryId: 'ai',
    subjectId: 'ai',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-fuchsia-600 to-indigo-800',
    tags: ['LLM Eval', 'LLM-as-a-Judge', 'RAG Triad', 'Guide'],
    description: {
      en: 'A step-by-step practical guide to evaluating LLM and RAG outputs using LLM-as-a-Judge patterns, RAG Triad metrics (Faithfulness, Answer Relevance, Context Relevance), and automated test suites.',
      vi: 'Hướng dẫn thực hành từng bước đánh giá chất lượng LLM và RAG bằng mô hình đóng vai giám khảo (LLM-as-a-Judge) và bộ 3 chỉ số RAG Triad (Tính trung thực, Độ liên quan câu trả lời, Độ liên quan ngữ cảnh).',
    },
    prerequisites: {
      en: ['Understanding of RAG systems and LLM prompting'],
      vi: ['Hiểu biết về hệ thống RAG và kỹ thuật prompt'],
    },
    outcomes: {
      en: ['Implement LLM-as-a-Judge automated scoring evaluation suites', 'Measure Faithfulness and Context Relevance for RAG applications'],
      vi: ['Xây dựng bộ kiểm thử chấm điểm tự động với pattern LLM-as-a-Judge', 'Đo đạc chỉ số Tính trung thực và Độ liên quan ngữ cảnh cho RAG'],
    },
    chapters: [
      {
        id: 'leg-ch-1',
        number: 1,
        slug: 'llm-as-a-judge-pattern',
        title: {
          en: 'The LLM-as-a-Judge Evaluation Pattern',
          vi: 'Pattern Đánh Giá Chất Lượng Bằng LLM-as-a-Judge',
        },
        summary: {
          en: 'Using stronger models (e.g. Gemini 1.5 Pro) to grade candidate model responses on Likert scales with rubric explanations.',
          vi: 'Sử dụng mô hình mạnh hơn làm giám khảo chấm điểm câu trả lời theo bộ tiêu chuẩn rubric.',
        },
        readTimeMinutes: 12,
        sections: [
          {
            id: 'leg-1-1',
            title: {
              en: 'Designing Judge Rubrics & Mitigating Evaluation Biases',
              vi: 'Thiết Kế Rubric Chấm Điểm & Giảm Thiểu Định Kiến Đánh Giá (Judge Biases)',
            },
            keyIdea: {
              en: 'Using a frontier LLM (e.g., Gemini 1.5 Pro) as an automated judge eliminates slow, expensive manual human evaluations. However, reliable evaluation requires strict 1-5 categorical rubrics, Chain-of-Thought reasoning steps before score emission, and mitigation of position bias and verbosity bias.',
              vi: 'Sử dụng mô hình LLM đầu bảng (như Gemini 1.5 Pro) làm giám khảo tự động loại bỏ sự chậm trễ và chi phí đắt đỏ của việc chấm thủ công bằng con người. Tuy nhiên, việc đánh giá chỉ chuẩn xác khi thiết lập rubric 1-5 tường minh, yêu cầu viết giải thích Chain-of-Thought trước khi cho điểm, và xử lý triệt để định kiến thiên vị vị trí (position bias) hay thiên vị văn dài (verbosity bias).',
            },
            content: {
              en: 'The **LLM-as-a-Judge** architecture leverages strong foundation models to grade generated text across complex qualitative dimensions (coherence, factuality, tone, instruction compliance). When designing judge prompts, three critical architectural rules must be followed: (1) **Clear Anchor Rubrics**: Each score from 1 to 5 must have non-overlapping, unambiguous criteria rather than vague qualitative words; (2) **Chain-of-Thought Grading**: The prompt must compel the judge model to generate a thorough critique and cite evidence *before* outputting the final integer rating; (3) **Bias Mitigation**: LLM judges inherently suffer from *Verbosity Bias* (preferring longer, wordy answers even if repetitive) and *Position Bias* (favoring whichever candidate answer appears first in pairwise evaluations). Mitigating position bias requires running pairwise comparisons twice with swapped candidate order and averaging the resulting scores.',
              vi: 'Kiến trúc **LLM-as-a-Judge** tận dụng sức mạnh của các mô hình hàng đầu để chấm điểm văn bản theo các tiêu chí định tính phức tạp (tính mạch lạc, độ chuẩn xác thực tế, văn phong, tuân thủ chỉ thị). Khi thiết kế prompt cho giám khảo, ba nguyên tắc quan trọng phải tuân thủ: (1) **Tiêu chí Rubric rõ ràng**: Mỗi thang điểm từ 1 đến 5 phải có định nghĩa cụ thể, không chồng chéo; (2) **Quy trình Chain-of-Thought**: Buộc mô hình phải viết nhận xét phân tích và trích dẫn bằng chứng cụ thể *trước* khi đưa ra con số điểm cuối cùng; (3) **Xử lý thiên vị (Bias Mitigation)**: Mô hình giám khảo thường mắc *Verbosity Bias* (thiên vị bài viết dài dòng) và *Position Bias* (có xu hướng chấm cao cho câu trả lời xuất hiện đầu tiên). Để khắc phục, cần hoán đổi vị trí câu trả lời và chạy chấm 2 lần rồi lấy điểm trung bình.',
            },
            comparisonTable: {
              headers: [
                { en: 'Evaluation Paradigm', vi: 'Phương Pháp Đánh Giá' },
                { en: 'Throughput & Scalability', vi: 'Tốc Độ & Khả Năng Mở Rộng' },
                { en: 'Cost per 1,000 Samples', vi: 'Chi Phí Trên 1.000 Mẫu' },
                { en: 'Semantic Nuance Capture', vi: 'Độ Tinh Tế Về Ngữ Nghĩa' },
              ],
              rows: [
                {
                  en: ['Human Domain Experts', 'Slow (weeks), non-scalable', 'High ($500 - $2,000+)', 'High (Gold Standard)'],
                  vi: ['Chuyên Gia Con Người', 'Rất chậm (hàng tuần), khó mở rộng', 'Rất cao ($500 - $2.000+)', 'Rất cao (Chuẩn mực vàng)'],
                },
                {
                  en: ['Traditional NLP (BLEU/ROUGE)', 'Instant (milliseconds)', 'Zero ($0.00)', 'Very Poor (N-gram string overlap only)'],
                  vi: ['NLP Truyền Thống (BLEU/ROUGE)', 'Tức thì (mili giây)', 'Miễn phí ($0.00)', 'Rất kém (Chỉ so khớp chuỗi từ đơn thuần)'],
                },
                {
                  en: ['LLM-as-a-Judge (Gemini Pro)', 'High (minutes with batch/async)', 'Low ($2 - $10)', 'High (Captures tone, logic, and reasoning)'],
                  vi: ['LLM-as-a-Judge (Gemini Pro)', 'Nhanh (vài phút qua async/batch)', 'Thấp ($2 - $10)', 'Cao (Hiểu sâu logic, ngữ cảnh và lập luận)'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'llm_judge.py',
              explanation: {
                en: 'Structured evaluation prompt enforcing strict rubric criteria, chain-of-thought justification, and JSON output formatting.',
                vi: 'Prompt đánh giá có cấu trúc áp dụng thang điểm rubric nghiêm ngặt, tư duy Chain-of-Thought và trả về JSON chuẩn.',
              },
              code: `import json
from google import genai
from pydantic import BaseModel, Field

class JudgeScore(BaseModel):
    chain_of_thought_critique: str = Field(description="Step-by-step reasoning and evidence citations")
    hallucination_detected: bool
    score: int = Field(ge=1, le=5, description="Strict 1 to 5 integer rating")

JUDGE_SYSTEM_PROMPT = """You are an impartial, strict technical evaluator.
Grade the Candidate Response against the Reference Ground Truth on a 1-5 scale:
- 1 (Unacceptable): Contains critical factual hallucinations or contradicts ground truth.
- 2 (Poor): Partially factual but misses major core constraints or requirements.
- 3 (Acceptable): Factually accurate but lacks clarity, depth, or includes unnecessary fluff.
- 4 (Good): Fully accurate, concise, and directly addresses the query with good clarity.
- 5 (Exceptional): Flawlessly accurate, elegant explanation, and adheres to all technical nuances.

You MUST write your reasoning in 'chain_of_thought_critique' BEFORE choosing the final score integer."""

def evaluate_response(query: str, ground_truth: str, candidate: str) -> JudgeScore:
    ai = genai.Client()
    prompt = f"Query: {query}\\nGround Truth: {ground_truth}\\nCandidate: {candidate}"
    
    response = ai.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config={
            'system_instruction': JUDGE_SYSTEM_PROMPT,
            'response_mime_type': 'application/json',
            'response_schema': JudgeScore
        }
    )
    return JudgeScore.model_validate_json(response.text)`,
            },
            diagram: {
              title: {
                en: 'Pairwise Swap LLM-as-a-Judge Bias Elimination',
                vi: 'Quy Trình Hoán Đổi Vị Trí Triệt Tiêu Định Kiến Giám Khảo',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Forward Comparison (A vs B)', vi: 'Đợt Chấm 1 (A vs B)' },
                  description: {
                    en: 'Pass prompt with Model A first and Model B second; collect score and critique.',
                    vi: 'Gửi prompt với Mô hình A đứng trước, Mô hình B đứng sau; thu thập điểm số.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Reverse Swap (B vs A)', vi: 'Đợt Chấm 2 (B vs A)' },
                  description: {
                    en: 'Swap order: Model B first and Model A second to neutralize position bias.',
                    vi: 'Đổi ngược thứ tự: Mô hình B đứng trước, Mô hình A đứng sau để khử thiên vị vị trí.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Score Synthesis & Reconciliation', vi: 'Tổng Hợp & Chuẩn Hóa Điểm' },
                  description: {
                    en: 'Aggregate metrics and flag any severe discrepancies for human audit.',
                    vi: 'Tổng hợp điểm trung bình và gắn cờ các ca bất đồng lớn để chuyên gia xem lại.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Asking the LLM judge to output only the integer score without explaining its reasoning',
                  vi: 'Chỉ yêu cầu LLM giám khảo xuất ra duy nhất con số điểm mà không viết lời giải thích',
                },
                why: {
                  en: 'Without token generation before the number, the model has zero computational steps to evaluate nuanced trade-offs, leading to random, uncalibrated scores.',
                  vi: 'Nếu không sinh token phân tích trước khi chốt số, mô hình không có không gian tính toán để cân nhắc các tiêu chí, dẫn đến việc cho điểm ngẫu nhiên và sai lệch.',
                },
                solution: {
                  en: 'Always enforce an explanation/critique field prior to the numeric score in your response schema.',
                  vi: 'Luôn bắt buộc trường phân tích critique xuất hiện trước trường điểm số score trong JSON Schema.',
                },
                codeIncorrect: `schema = {"score": "integer"} # Degraded scoring calibration`,
                codeCorrect: `schema = {"critique": "string", "score": "integer"} # Calibrated reasoning`,
              },
            ],
            practicalScenario: {
              en: 'A customer support team fine-tuned two alternative models. Single-prompt evaluations showed Model A winning 80% of matches. However, after swapping prompt positions (B vs A), Model B won 75%, revealing extreme Position Bias. Implementing dual-pass pairwise evaluation with Chain-of-Thought rubrics revealed that Model B was actually superior in technical accuracy.',
              vi: 'Một nhóm chăm sóc khách hàng thử nghiệm 2 mô hình AI. Khi chấm 1 lượt thông thường, Mô hình A thắng 80%. Tuy nhiên khi đảo vị trí (B vs A), Mô hình B lại thắng 75%, chứng minh giám khảo bị thiên vị vị trí nặng nề. Sau khi áp dụng cơ chế chấm 2 lượt kèm rubric Chain-of-Thought, kết quả thực chất cho thấy Mô hình B vượt trội hơn về độ chính xác kỹ thuật.',
            },
            bestPractices: {
              en: [
                'Always use a more capable frontier model as the judge than the candidate models being evaluated.',
                'Use dual-pass order swapping for all pairwise head-to-head model comparisons.',
                'Establish a gold test set of 100 human-annotated examples to calibrate judge model alignment regularly.',
              ],
              vi: [
                'Luôn sử dụng mô hình giám khảo có năng lực mạnh hơn các mô hình đang được chấm điểm.',
                'Chạy hoán đổi thứ tự 2 lượt đối với tất cả các bài so sánh đối đầu trực tiếp.',
                'Xây dựng bộ test vàng gồm 100 câu có người thật thẩm định để định kỳ căn chỉnh độ chuẩn của giám khảo.',
              ],
            },
            keyTakeaways: {
              en: [
                'LLM-as-a-Judge enables high-throughput semantic evaluation at low cost.',
                'Chain-of-thought justification prior to score emission is mathematically essential.',
                'Position swapping and explicit rubrics neutralize intrinsic model evaluation biases.',
              ],
              vi: [
                'LLM-as-a-Judge cho phép đánh giá ngữ nghĩa tự động với thông lượng cao và chi phí tối thiểu.',
                'Bắt buộc viết giải thích trước khi cho điểm là yếu tố quyết định độ chính xác.',
                'Hoán đổi vị trí và tiêu chí rubric chi tiết giúp loại bỏ định kiến đánh giá của mô hình.',
              ],
            },
          },
        ],
      },
      {
        id: 'leg-ch-2',
        number: 2,
        slug: 'rag-triad-metrics',
        title: {
          en: 'Measuring the RAG Triad (Faithfulness, Relevance)',
          vi: 'Đo Đạc Bộ Ba Chỉ Số RAG Triad',
        },
        summary: {
          en: 'Calculating Context Relevance, Faithfulness (Groundedness), and Answer Relevance scores.',
          vi: 'Tính toán chỉ số Context Relevance, Faithfulness (Tính trung thực) và Answer Relevance.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'leg-2-1',
            title: {
              en: 'Deconstructing the RAG Triad: Context, Faithfulness & Relevance',
              vi: 'Bóc Tách Bộ Ba Chỉ Số RAG Triad: Context Relevance, Faithfulness & Answer Relevance',
            },
            keyIdea: {
              en: 'RAG systems fail in two distinct ways: retrieval failure (retrieving noisy/irrelevant chunks) or generation failure (hallucinating facts absent from retrieved chunks). The RAG Triad isolates these failure modes into three quantifiable metrics: Context Relevance, Faithfulness, and Answer Relevance.',
              vi: 'Hệ thống RAG thường thất bại ở hai điểm nút: lỗi truy xuất (lấy nhầm tài liệu rác) hoặc lỗi sinh nội dung (bịa đặt thông tin không có trong tài liệu). Bộ ba chỉ số RAG Triad bóc tách các điểm nghẽn này thành 3 chỉ số định lượng độc lập: Độ liên quan ngữ cảnh (Context Relevance), Tính trung thực (Faithfulness), và Độ liên quan câu trả lời (Answer Relevance).',
            },
            content: {
              en: 'Evaluating a RAG system by inspecting the final output alone obscures why an error occurred. The **RAG Triad** framework decomposes the pipeline into three verifiable stages: (1) **Context Relevance**: Measures whether the retrieved document chunks are focused and relevant to the user query (punishing noisy or bloated vector search results); (2) **Faithfulness (Groundedness)**: Assesses whether every claim made in the generated answer can be mathematically derived *exclusively* from the retrieved context without hallucinating outside pre-training knowledge; (3) **Answer Relevance**: Checks whether the generated response directly answers the user prompt without going off on irrelevant tangents. By measuring these three metrics independently, engineering teams can pinpoint whether to tune embedding chunk sizes or optimize LLM generation system instructions.',
              vi: 'Nếu chỉ đánh giá câu trả lời cuối cùng của hệ thống RAG, kỹ sư sẽ không thể biết lỗi phát sinh từ khâu tìm kiếm hay khâu sinh văn bản. Khung đánh giá **RAG Triad** chia nhỏ quy trình thành ba chỉ số độc lập: (1) **Context Relevance (Độ liên quan ngữ cảnh)**: Đo lường xem các đoạn tài liệu tìm được có thực sự chứa thông tin trả lời câu hỏi hay không (phát hiện kết quả tìm kiếm vector bị nhiễu); (2) **Faithfulness (Tính trung thực / Groundedness)**: Kiểm tra xem từng mệnh đề trong câu trả lời có được suy ra *hoàn toàn* từ tài liệu được cấp hay không (phát hiện ảo giác hallucination); (3) **Answer Relevance (Độ liên quan câu trả lời)**: Đo lường xem câu trả lời có giải quyết trực diện câu hỏi của người dùng hay bị lan man lạc đề. Việc đo đạc riêng biệt giúp đội ngũ kỹ sư biết chính xác cần tối ưu khâu cắt chunk embedding hay điều chỉnh prompt sinh lời.',
            },
            comparisonTable: {
              headers: [
                { en: 'RAG Triad Metric', vi: 'Chỉ Số RAG Triad' },
                { en: 'Evaluates Relationship Between', vi: 'Đánh Giá Mối Quan Hệ Giữa' },
                { en: 'Primary Failure Detected', vi: 'Phát Hiện Lỗi Gốc' },
              ],
              rows: [
                {
                  en: ['Context Relevance', 'User Query $\\leftrightarrow$ Retrieved Chunks', 'Noisy embeddings, bad top-k retrieval, poor chunk boundaries'],
                  vi: ['Context Relevance', 'Câu hỏi người dùng $\\leftrightarrow$ Đoạn tài liệu tìm được', 'Vector search kém, chunking quá to hoặc chứa quá nhiều rác'],
                },
                {
                  en: ['Faithfulness (Groundedness)', 'Retrieved Chunks $\\leftrightarrow$ Generated Answer', 'LLM Hallucination, unfaithful extrapolation, fabricated facts'],
                  vi: ['Faithfulness (Tính trung thực)', 'Đoạn tài liệu $\\leftrightarrow$ Câu trả lời đã sinh', 'Ảo giác LLM, tự suy diễn vô căn cứ, bịa đặt số liệu'],
                },
                {
                  en: ['Answer Relevance', 'User Query $\\leftrightarrow$ Generated Answer', 'Model evades question, incomplete answers, excessive disclaimers'],
                  vi: ['Answer Relevance', 'Câu hỏi người dùng $\\leftrightarrow$ Câu trả lời đã sinh', 'Mô hình trả lời né tránh, thiếu ý, luyên thuyên lạc đề'],
                },
              ],
            },
            codeBlock: {
              language: 'python',
              filename: 'rag_triad_eval.py',
              explanation: {
                en: 'Computes Faithfulness score by breaking the answer into atomic statements and verifying each against retrieved context.',
                vi: 'Tính toán chỉ số Faithfulness bằng cách bẻ nhỏ câu trả lời thành từng mệnh đề nguyên tử và xác thực dựa trên tài liệu.',
              },
              code: `def calculate_faithfulness(context: str, answer: str) -> float:
    """
    1. Extract all atomic factual statements from the answer.
    2. For each statement, verify if it is strictly supported by context.
    3. Score = Supported Statements / Total Statements.
    """
    ai = genai.Client()
    
    extraction_prompt = f"Extract all atomic factual claims from this text as a list of strings: {answer}"
    claims = ai.models.generate_content(
        model='gemini-2.5-flash',
        contents=extraction_prompt,
        config={'response_mime_type': 'application/json', 'response_schema': list[str]}
    ).parsed

    supported_count = 0
    for claim in claims:
        verify_prompt = f"Context: {context}\\nClaim: {claim}\\nIs this claim supported strictly by the context? Answer true or false."
        is_supported = ai.models.generate_content(
            model='gemini-2.5-flash',
            contents=verify_prompt,
            config={'response_mime_type': 'application/json', 'response_schema': bool}
        ).parsed
        if is_supported:
            supported_count += 1

    return supported_count / len(claims) if claims else 1.0`,
            },
            diagram: {
              title: {
                en: 'The RAG Triad Evaluation Geometry',
                vi: 'Mô Hình Tam Giác Đánh Giá RAG Triad',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Context Relevance Edge', vi: 'Cạnh Context Relevance' },
                  description: {
                    en: 'Verifies query relevance of retrieved context before feeding into generator.',
                    vi: 'Đo độ liên quan giữa câu hỏi và đoạn tài liệu tìm được từ vector DB.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Faithfulness Edge', vi: 'Cạnh Faithfulness' },
                  description: {
                    en: 'Verifies answer claims are 100% grounded in retrieved chunks.',
                    vi: 'Kiểm tra toàn bộ khẳng định trong câu trả lời có căn cứ từ tài liệu hay không.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Answer Relevance Edge', vi: 'Cạnh Answer Relevance' },
                  description: {
                    en: 'Verifies the grounded answer directly fulfills the original user intent.',
                    vi: 'Đo lường mức độ câu trả lời giải quyết trúng đích mục tiêu của người dùng.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Evaluating RAG pipelines only at the final answer without measuring context relevance',
                  vi: 'Chỉ chấm điểm câu trả lời cuối cùng mà bỏ qua bước đo độ liên quan ngữ cảnh (Context Relevance)',
                },
                why: {
                  en: 'When an answer is wrong, you cannot determine whether to fix the vector retrieval parameters or the generation prompt instructions.',
                  vi: 'Khi câu trả lời sai, bạn sẽ hoàn toàn mù tịt không biết lỗi do tìm kiếm tài liệu sai hay do mô hình sinh ảo giác.',
                },
                solution: {
                  en: 'Log and evaluate Context Relevance, Faithfulness, and Answer Relevance as separate metrics in telemetry dashboards.',
                  vi: 'Ghi log và đo đạc độc lập 3 chỉ số Context Relevance, Faithfulness và Answer Relevance trên dashboard giám sát.',
                },
                codeIncorrect: `score = evaluate_overall(answer) # Opaque failure diagnosis`,
                codeCorrect: `c_score, f_score, a_score = eval_rag_triad(query, context, answer) # Transparent root-cause analysis`,
              },
            ],
            practicalScenario: {
              en: 'An insurance claim AI had a low user satisfaction rating of 62%. Overall evaluation could not explain why. Running RAG Triad metrics revealed Context Relevance was high (94%) but Faithfulness was low (51%)—the LLM was ignoring the retrieved policy terms and making up coverage limits from its pre-training weights. Enforcing strict system instructions lifted Faithfulness to 98% and user satisfaction to 95%.',
              vi: 'Một trợ lý AI bồi thường bảo hiểm bị đánh giá kém với mức độ hài lòng chỉ đạt 62%. Khi triển khai bộ ba chỉ số RAG Triad, đội ngũ phát hiện Context Relevance rất cao (94%) nhưng Faithfulness rất thấp (51%)—hóa ra mô hình bỏ qua tài liệu điều khoản và tự bịa ra mức bồi thường theo trí nhớ cũ. Sau khi siết chặt prompt cấm suy diễn, chỉ số Faithfulness tăng lên 98% và độ hài lòng đạt 95%.',
            },
            bestPractices: {
              en: [
                'Set a CI/CD build gate: reject any model or prompt PR if Faithfulness drops below 0.95.',
                'Use atomic claim decomposition for fine-grained Faithfulness calculation.',
                'Pair RAG Triad metrics with end-to-end latency monitoring to optimize retrieval top-k values.',
              ],
              vi: [
                'Thiết lập cổng kiểm duyệt trong CI/CD: chặn merge code nếu chỉ số Faithfulness giảm dưới 0.95.',
                'Tách câu trả lời thành các mệnh đề nguyên tử để tính điểm Faithfulness chuẩn xác nhất.',
                'Kết hợp chỉ số RAG Triad với giám sát độ trễ để chọn số lượng top-k tài liệu tối ưu.',
              ],
            },
            keyTakeaways: {
              en: [
                'The RAG Triad pinpoints the exact root cause of failure in retrieval-augmented pipelines.',
                'Faithfulness ensures hallucinations are eliminated by measuring context grounding.',
                'Automated RAG Triad metrics provide continuous regression testing for AI systems.',
              ],
              vi: [
                'RAG Triad giúp xác định chính xác nguyên nhân gốc rễ gây ra lỗi trong hệ thống RAG.',
                'Faithfulness đảm bảo triệt tiêu hoàn toàn ảo giác thông qua việc đối chiếu tài liệu.',
                'Tự động hóa RAG Triad cung cấp bộ test hồi quy liên tục cho các sản phẩm AI.',
              ],
            },
          },
        ],
      },
    ],
  },

  // 13. Gemini API Recipes
  {
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
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-18',
    accentColor: 'from-violet-600 to-indigo-900',
    tags: ['Gemini API', 'Multimodal', 'SDK Recipes', 'Function Calling'],
    description: {
      en: 'A collection of developer integration recipes for the Google Gen AI TypeScript SDK: calling Gemini 1.5 Pro/Flash models, passing audio/image multimodal buffers, structured JSON output configuration, and streaming responses.',
      vi: 'Bộ công thức lập trình tích hợp SDK Google Gen AI TypeScript: gọi mô hình Gemini 1.5 Pro/Flash, xử lý dữ liệu đa phương tiện (ảnh/âm thanh), cấu hình JSON đầu ra và stream token.',
    },
    prerequisites: {
      en: ['TypeScript and server-side API development skills'],
      vi: ['Kỹ năng TypeScript và phát triển API server-side'],
    },
    outcomes: {
      en: ['Initialize @google/genai TypeScript SDK clients securely on the server', 'Pass multimodal inline image and audio buffers to Gemini models'],
      vi: ['Khởi tạo client @google/genai TypeScript SDK an toàn trên server', 'Xử lý và truyền buffer hình ảnh/âm thanh đa phương tiện cho Gemini'],
    },
    chapters: [
      {
        id: 'gar-ch-1',
        number: 1,
        slug: 'sdk-initialization-and-multimodal-generation',
        title: {
          en: 'Server-Side SDK Setup & Multimodal Processing',
          vi: 'Khởi Tạo SDK Server-Side & Xu Ly Đa Phương Tiện Multimodal',
        },
        summary: {
          en: 'GoogleGenAI client initialization, process.env.GEMINI_API_KEY security, and image/audio inlineData.',
          vi: 'Khởi tạo client GoogleGenAI, bảo mật GEMINI_API_KEY trên server và nạp inlineData ảnh/âm thanh.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'gar-1-1',
            title: {
              en: 'Lazy SDK Initialization & Secure Multimodal Media Handling',
              vi: 'Khởi Tạo Lazy SDK & Xử Lý Dữ Liệu Đa Phương Tiện Multimodal An Toàn',
            },
            keyIdea: {
              en: 'Never instantiate GoogleGenAI at top-level module scope, which causes container crashloops when environment variables are missing. Use lazy initialization singleton getters and pass raw image/audio buffers via inlineData objects directly in the contents array.',
              vi: 'Tuyệt đối không khởi tạo client GoogleGenAI ở phạm vi module gốc khiến container bị văng lỗi khởi động khi thiếu biến môi trường. Hãy sử dụng hàm getter singleton khởi tạo trễ (lazy initialization) và nạp buffer hình ảnh/âm thanh trực tiếp qua đối tượng inlineData trong mảng contents.',
            },
            content: {
              en: 'The official `@google/genai` TypeScript SDK provides high-performance access to Google Gemini models. Best-practice architecture mandates two key guidelines: (1) **Server-Side API Key Isolation**: Never expose `GEMINI_API_KEY` to browser frontends or prefix it with `VITE_`. All calls must execute inside Node/Express backend endpoints with lazy singleton initialization; (2) **Multimodal Buffer Ingestion**: Gemini natively processes text, image, audio, and PDF documents within a single context window. For media under 20MB, pass raw base64 data using the `inlineData` structure with standard MIME types (`image/jpeg`, `image/png`, `audio/mp3`, `application/pdf`). For larger files (up to 2GB video/audio), utilize the Google Gen AI File API for resumable uploads.',
              vi: 'SDK TypeScript chính thức `@google/genai` mang lại khả năng kết nối tốc độ cao tới các mô hình Google Gemini. Kiến trúc chuẩn mực đòi hỏi hai nguyên tắc cốt lõi: (1) **Bảo Mật Khóa API Phía Server**: Không bao giờ để lộ `GEMINI_API_KEY` cho trình duyệt hoặc thêm tiền tố `VITE_`. Mọi tác vụ phải được thực thi trong endpoint backend Node/Express thông qua cơ chế lazy singleton; (2) **Xử Lý Đa Phương Tiện Multimodal**: Gemini có khả năng đọc hiểu trực tiếp văn bản, hình ảnh, âm thanh và file PDF trong cùng một cửa sổ ngữ cảnh. Với các tệp dưới 20MB, truyền dữ liệu base64 trực tiếp qua cấu trúc `inlineData` kèm MIME type chuẩn (`image/jpeg`, `image/png`, `audio/mp3`, `application/pdf`). Với các tệp lớn hơn (lên tới 2GB), hãy sử dụng Google Gen AI File API.',
            },
            comparisonTable: {
              headers: [
                { en: 'Multimodal Ingestion Method', vi: 'Phương Pháp Nạp Dữ Liệu' },
                { en: 'Max File Size', vi: 'Dung Lượng Tối Đa' },
                { en: 'Network Overhead & Latency', vi: 'Độ Trễ Mạng' },
                { en: 'Recommended Use Case', vi: 'Trường Hợp Khuyên Dùng' },
              ],
              rows: [
                {
                  en: ['inlineData Base64 Buffer', '< 20 MB payload limit', 'Zero storage overhead, instant inline evaluation', 'Real-time UI uploads, single receipts, photos'],
                  vi: ['Buffer Base64 inlineData', '< 20 MB mỗi request', 'Không tốn lưu trữ đệm, suy luận tức thì', 'Ảnh chụp hóa đơn, avatar, đoạn ghi âm ngắn'],
                },
                {
                  en: ['Google Gen AI File API', 'Up to 2 GB per file', 'Requires upload step then reference URI', 'Long hour-long video files, large PDF books, audio sets'],
                  vi: ['Google Gen AI File API', 'Tối đa 2 GB mỗi file', 'Cần bước upload trước rồi truyền URI', 'Video bài giảng dài hàng giờ, tài liệu PDF sách dày'],
                },
              ],
            },
            codeBlock: {
              language: 'typescript',
              filename: 'server/gemini_multimodal.ts',
              explanation: {
                en: 'Lazy singleton client getter and multimodal image analysis endpoint using the official @google/genai SDK.',
                vi: 'Hàm getter singleton khởi tạo trễ và endpoint phân tích ảnh đa phương tiện với SDK @google/genai.',
              },
              code: `import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

// 1. Lazy Initialization: prevents container crashes if env var is unset at boot
export function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// 2. Multimodal Image Analysis Function
export async function analyzeInvoiceImage(imageBase64: string, mimeType: string = 'image/jpeg') {
  const ai = getGemini();
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        text: 'Extract merchant name, total amount, and date from this invoice. Return structured JSON.'
      },
      {
        inlineData: {
          mimeType: mimeType,
          data: imageBase64
        }
      }
    ]
  });
  
  return response.text;
}`,
            },
            diagram: {
              title: {
                en: 'Multimodal Request Flow via Server-Side Proxy',
                vi: 'Quy Trình Xử Lý Đa Phương Tiện Qua Proxy Server-Side',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Client Upload (Browser)', vi: 'Client Tải Lên' },
                  description: {
                    en: 'Browser sends image file to secure internal Express endpoint /api/analyze.',
                    vi: 'Trình duyệt gửi tệp ảnh đến endpoint nội bộ an toàn /api/analyze.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Server Proxy & Secret Injection', vi: 'Server Proxy Chèn Khóa Bí Mật' },
                  description: {
                    en: 'Backend injects GEMINI_API_KEY and packages inlineData buffer securely.',
                    vi: 'Backend nạp GEMINI_API_KEY và đóng gói buffer inlineData một cách bảo mật.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Gemini Foundation Engine', vi: 'Mô Hình Nền Tảng Gemini' },
                  description: {
                    en: 'Gemini 2.5 multimodal transformer processes vision and language natively.',
                    vi: 'Gemini 2.5 phân tích đồng thời thị giác và ngôn ngữ trong một lượt truyền.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Instantiating `const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })` at the top level of the file',
                  vi: 'Khởi tạo `const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })` ở dòng đầu tiên của file',
                },
                why: {
                  en: 'If the environment variable is loaded asynchronously or missing during Docker build/boot, the entire server crashes immediately with unhandled errors.',
                  vi: 'Nếu biến môi trường được nạp bất đồng bộ hoặc bị thiếu trong lúc khởi động container, toàn bộ server sẽ sập ngay lập tức.',
                },
                solution: {
                  en: 'Always wrap client initialization inside a lazy getter function that checks environment variables at call time.',
                  vi: 'Luôn bọc việc khởi tạo trong một hàm getter lazy để kiểm tra biến môi trường tại thời điểm gọi hàm.',
                },
                codeIncorrect: `const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! }); // Risky boot crash`,
                codeCorrect: `const ai = getGemini(); // Safe lazy initialization on demand`,
              },
            ],
            practicalScenario: {
              en: 'A logistics platform needed to process photos of delivery receipts uploaded from drivers mobile phones. Using top-level SDK initialization crashed their server instances whenever auto-scaling pods booted before secrets synced. Refactoring to a lazy singleton getter with inlineData base64 image parsing eliminated container boot failures and allowed processing 10,000 receipts daily with 600ms latency.',
              vi: 'Một nền tảng logistics cần xử lý ảnh chụp biên nhận giao hàng từ tài xế. Việc khởi tạo SDK ở đầu file khiến các pod tự động mở rộng bị sập liên tục nếu bí mật chưa kịp đồng bộ lúc boot. Chuyển sang hàm lazy singleton getter và nạp ảnh base64 qua inlineData đã loại bỏ hoàn toàn lỗi sập server và xử lý trơn tru 10.000 biên lai mỗi ngày với độ trễ chỉ 600ms.',
            },
            bestPractices: {
              en: [
                'Always use `process.env.GEMINI_API_KEY` exclusively on the server side—never expose it in client code.',
                'Use `inlineData` for files under 20MB and the Google Gen AI File API for large media.',
                'Leverage `gemini-2.5-flash` for high-throughput, low-latency multimodal extraction tasks.',
              ],
              vi: [
                'Luôn sử dụng `process.env.GEMINI_API_KEY` độc quyền ở phía server—không bao giờ để lộ ở client.',
                'Sử dụng `inlineData` cho tệp dưới 20MB và dùng File API cho tệp đa phương tiện dung lượng lớn.',
                'Tận dụng mô hình `gemini-2.5-flash` cho các tác vụ trích xuất đa phương tiện cần thông lượng cao và độ trễ thấp.',
              ],
            },
            keyTakeaways: {
              en: [
                'Lazy initialization protects backend microservices from startup crashes.',
                'Inline multimodal buffers enable native vision and audio reasoning in a single call.',
                'Strict server-side proxying ensures API keys remain secure in production.',
              ],
              vi: [
                'Khởi tạo lazy bảo vệ dịch vụ backend khỏi các sự cố sập nguồn lúc khởi động.',
                'Buffer đa phương tiện cho phép suy luận thị giác và âm thanh trực tiếp trong 1 lượt gọi.',
                'Proxy qua server đảm bảo an toàn tuyệt đối cho API key trong môi trường production.',
              ],
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
          en: 'Using generateContentStream for real-time UI typing and responseSchema configuration.',
          vi: 'Sử dụng generateContentStream cho hiệu ứng gõ chữ thời gian thực và cấu hình responseSchema.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'gar-2-1',
            title: {
              en: 'Real-Time Token Streaming & Deterministic Type-Safe JSON Schemas',
              vi: 'Stream Token Thời Gian Thực & Ép Kiểu JSON Schema Chuẩn Xác Tuyệt Đối',
            },
            keyIdea: {
              en: 'Never rely on prompt engineering alone to request JSON (which often returns markdown code fences like ```json). Use Gemini native `responseMimeType: "application/json"` combined with explicit `responseSchema` definitions and `generateContentStream` for instant UI responsiveness.',
              vi: 'Không bao giờ chỉ dựa vào câu lệnh prompt đơn thuần để xin JSON (thường bị dính các ký tự markdown như ```json). Hãy sử dụng tính năng gốc `responseMimeType: "application/json"` kết hợp khai báo `responseSchema` rõ ràng và phương thức `generateContentStream` để mang lại trải nghiệm hiển thị thời gian thực cho người dùng.',
            },
            content: {
              en: 'In modern AI applications, user perceived latency is dominated by Time-To-First-Token (TTFT). Google Gemini supports first-class token streaming and deterministic schema enforcement via two key SDK features: (1) **Streaming with `generateContentStream`**: Yields incremental text chunks via an `AsyncIterable`, allowing Server-Sent Events (SSE) or WebSockets to stream tokens to the frontend with sub-200ms initial response times; (2) **Structured Output (`responseSchema`)**: By configuring `responseMimeType: "application/json"` and passing an OpenAPI-compatible schema object (or Type enum definitions), Gemini forces its internal decoder grammar to output strictly valid JSON conforming 100% to your interface, completely eliminating parsing errors and eliminating the need for regex JSON stripping.',
              vi: 'Trong các ứng dụng AI hiện đại, độ trễ cảm nhận của người dùng phụ thuộc lớn vào thời gian sinh token đầu tiên (TTFT). Google Gemini hỗ trợ tính năng stream token và ép kiểu dữ liệu đầu ra thông qua hai cơ chế mạnh mẽ: (1) **Stream Với `generateContentStream`**: Trả về các đoạn token liên tục qua luồng `AsyncIterable`, cho phép kết nối Server-Sent Events (SSE) hoặc WebSocket để hiển thị chữ chạy thời gian thực với độ trễ ban đầu dưới 200ms; (2) **Xuất Dữ Liệu Có Cấu Trúc (`responseSchema`)**: Bằng cách cấu hình `responseMimeType: "application/json"` và truyền định nghĩa schema chuẩn OpenAPI, Gemini ép ngữ pháp bộ giải mã (decoder) chỉ sinh ra chuỗi JSON chuẩn 100%, loại bỏ triệt để lỗi `JSON.parse` và không cần dùng regex để lọc thẻ markdown.',
            },
            comparisonTable: {
              headers: [
                { en: 'Output Configuration', vi: 'Cách Cấu Hình Đầu Ra' },
                { en: 'JSON Validity Guarantee', vi: 'Độ Đảm Bảo Chuẩn JSON' },
                { en: 'Markdown Wrapper Cleanliness', vi: 'Hiện Tượng Dính Thẻ Markdown' },
                { en: 'Type Safety', vi: 'An Toàn Kiểu Dữ Liệu' },
              ],
              rows: [
                {
                  en: ['Prompt Only ("Return JSON")', 'Unreliable (~85% success)', 'Frequently wraps with ```json code fences', 'Requires manual runtime regex parsing'],
                  vi: ['Chỉ Ghi Prompt ("Trả về JSON")', 'Kém tin cậy (~85% thành công)', 'Thường xuyên dính thẻ ```json gây lỗi parse', 'Phải tự viết regex cắt chuỗi thủ công'],
                },
                {
                  en: ['responseSchema + application/json', '100% Deterministic (Constrained decoding)', 'Pure raw JSON string with zero code fences', 'Strictly typed via TypeScript interfaces / schemas'],
                  vi: ['responseSchema + application/json', 'Chuẩn xác 100% (Ép ngữ pháp giải mã)', 'Chuỗi JSON nguyên bản thuần túy, không dính thẻ', 'Tương thích hoàn hảo với TypeScript interface'],
                },
              ],
            },
            codeBlock: {
              language: 'typescript',
              filename: 'server/gemini_stream_schema.ts',
              explanation: {
                en: 'Demonstrates streaming response generation and structured JSON extraction with strict schema validation.',
                vi: 'Minh họa phương thức sinh stream token và trích xuất dữ liệu JSON có cấu trúc với schema chuẩn.',
              },
              code: `import { getGemini } from './gemini';

// 1. Streaming Token Example for Express SSE
export async function streamChatResponse(prompt: string, onChunk: (text: string) => void) {
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

// 2. Deterministic Structured JSON Schema Example
export async function extractProductSpecs(description: string) {
  const ai = getGemini();
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Extract specs from: \${description}\`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          brand: { type: 'STRING' },
          priceUSD: { type: 'NUMBER' },
          features: {
            type: 'ARRAY',
            items: { type: 'STRING' }
          },
          inStock: { type: 'BOOLEAN' }
        },
        required: ['brand', 'priceUSD', 'features', 'inStock']
      }
    }
  });

  // Zero regex needed; guaranteed valid JSON string
  return JSON.parse(response.text!);
}`,
            },
            diagram: {
              title: {
                en: 'Constrained Decoder Grammar JSON Generation',
                vi: 'Cơ Chế Ép Ngữ Pháp Giải Mã Khi Sinh JSON',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Schema Specification', vi: 'Định Nghĩa JSON Schema' },
                  description: {
                    en: 'Developer provides TypeScript or OpenAPI schema in the generation config.',
                    vi: 'Lập trình viên cung cấp cấu trúc schema trong cấu hình gọi API.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Constrained Logit Masking', vi: 'Ép Xác Suất Token (Logit Masking)' },
                  description: {
                    en: 'Gemini decoder masks invalid tokens, allowing only valid JSON syntax at each step.',
                    vi: 'Bộ giải mã Gemini chặn các token không hợp lệ, chỉ cho phép sinh cú pháp JSON đúng.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Guaranteed Parseable Payload', vi: 'Dữ Liệu JSON Chuẩn 100%' },
                  description: {
                    en: 'Returns clean string guaranteed to parse directly with JSON.parse().',
                    vi: 'Trả về chuỗi JSON chuẩn có thể gọi ngay JSON.parse() mà không sợ lỗi.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Using regex string replacement `text.replace(/```json/g, "")` to sanitize model outputs',
                  vi: 'Dùng hàm regex `text.replace(/```json/g, "")` để lọc thẻ markdown từ câu trả lời của mô hình',
                },
                why: {
                  en: 'Without native responseSchema, models can still omit required fields, truncate brackets, or insert explanatory comments that break JSON.parse().',
                  vi: 'Nếu không dùng responseSchema, mô hình vẫn có thể quên trường bắt buộc, đóng thiếu ngoặc nhọn hoặc chèn thêm lời bình làm hỏng lệnh parse.',
                },
                solution: {
                  en: 'Always configure `responseMimeType: "application/json"` with an explicit `responseSchema` in config.',
                  vi: 'Luôn khai báo `responseMimeType: "application/json"` kèm `responseSchema` tường minh trong cấu hình.',
                },
                codeIncorrect: `// Fragile hack:
const clean = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
const data = JSON.parse(clean);`,
                codeCorrect: `// Robust configuration:
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt,
  config: { responseMimeType: 'application/json', responseSchema: mySchema }
});
const data = JSON.parse(response.text!);`,
              },
            ],
            practicalScenario: {
              en: 'A fintech trading app relied on prompt instructions to extract transaction amounts and merchant categories. 1 out of 50 API calls failed because the model added polite conversational text before the JSON object, causing unhandled backend crashes. Implementing `responseMimeType: "application/json"` and `responseSchema` achieved 100.0% zero-defect JSON parsing reliability across 500,000 live production transactions.',
              vi: 'Một ứng dụng giao dịch tài chính dùng prompt để trích xuất số tiền và danh mục chi tiêu. Cứ 50 lần gọi thì có 1 lần bị lỗi do mô hình chèn thêm lời chào lịch sự trước chuỗi JSON, khiến backend bị sập. Sau khi áp dụng `responseMimeType: "application/json"` và `responseSchema`, tỷ lệ lỗi parse giảm về đúng 0.0% tuyệt đối trên hơn 500.000 giao dịch thực tế.',
            },
            bestPractices: {
              en: [
                'Always define `required` array in `responseSchema` to guarantee all critical object properties exist.',
                'Use `generateContentStream` whenever presenting interactive AI responses to human end-users.',
                'Set appropriate `temperature: 0.1` or `0.0` when extracting structured data for deterministic outputs.',
              ],
              vi: [
                'Luôn khai báo mảng `required` trong `responseSchema` để đảm bảo mô hình không bỏ sót trường quan trọng.',
                'Sử dụng `generateContentStream` cho mọi giao diện tương tác trực tiếp với người dùng.',
                'Thiết lập `temperature: 0.1` hoặc `0.0` khi trích xuất dữ liệu có cấu trúc để kết quả luôn đồng nhất.',
              ],
            },
            keyTakeaways: {
              en: [
                'Token streaming delivers instant interactive responsiveness to web applications.',
                'Native `responseSchema` guarantees 100% deterministic, valid structured JSON.',
                'Constrained decoding eliminates brittle markdown regex parsing workarounds.',
              ],
              vi: [
                'Stream token đem lại trải nghiệm phản hồi tức thì cho người dùng ứng dụng web.',
                '`responseSchema` đảm bảo định dạng JSON chuẩn xác 100% trong mọi tình huống.',
                'Cơ chế constrained decoding loại bỏ hoàn toàn các đoạn mã regex lọc chuỗi tạm bợ.',
              ],
            },
          },
        ],
      },
    ],
  },
];
