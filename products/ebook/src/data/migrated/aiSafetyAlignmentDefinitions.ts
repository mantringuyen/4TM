import { Book } from '../../types';

export const AI_SAFETY_ALIGNMENT_DEFINITIONS_BOOK: Book = {
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
  role: 'AI Safety, Alignment & Red Teaming Research Group',
  level: 'Intermediate',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-12',
  accentColor: 'from-rose-600 to-red-950',
  tags: ['AI Safety', 'Alignment', 'RLHF', 'DPO', 'Red Teaming', 'Guardrails', 'Definitions'],
  description: {
    en: 'An authoritative technical terminology reference and comparative guide to frontier AI alignment and safety mechanisms: mathematical differentiation of RLHF vs Direct Preference Optimization (DPO), and defense-in-depth runtime guardrails vs adversarial red teaming.',
    vi: 'Tài liệu tra cứu thuật ngữ kỹ thuật và so sánh chuyên sâu về các cơ chế an toàn và căn chỉnh AI tiên tiến: phân tích toán học so sánh giữa RLHF và Direct Preference Optimization (DPO), kiến trúc hàng rào bảo vệ lúc chạy guardrails và kiểm thử xâm nhập red teaming.',
  },
  prerequisites: {
    en: [
      'Basic knowledge of supervised fine-tuning (SFT) and loss functions',
      'Familiarity with probability theory, cross-entropy, and reinforcement learning fundamentals',
    ],
    vi: [
      'Kiến thức cơ bản về supervised fine-tuning (SFT) và các hàm mất mát loss',
      'Quen thuộc với lý thuyết xác suất, cross-entropy và các khái niệm cơ bản của học tăng cường (RL)',
    ],
  },
  outcomes: {
    en: [
      'Understand the mathematical and procedural differences between the 3-stage RLHF pipeline and closed-form DPO training',
      'Identify the role of reference policies (pi_ref) and beta KL penalties in preventing policy collapse',
      'Design defense-in-depth runtime guardrails separating deterministic rules from model-based classification',
      'Formulate structured adversarial red teaming protocols to uncover prompt injection and jailbreak vectors',
    ],
    vi: [
      'Hiểu rõ sự khác biệt toán học và quy trình thực hiện giữa chu trình 3 bước của RLHF và giải thuật dạng đóng DPO',
      'Nhận biết vai trò của policy tham chiếu (pi_ref) và hệ số phạt KL beta trong việc chống sụp đổ mô hình',
      'Thiết kế hàng rào bảo vệ lúc chạy theo mô hình phòng thủ chiều sâu, tách biệt luật tất định và bộ phân loại AI',
      'Xây dựng quy trình kiểm thử red teaming để phát hiện các lỗ hổng prompt injection và kỹ thuật jailbreak',
    ],
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
        en: 'Reinforcement Learning from Human Feedback (RLHF) 3-stage pipeline vs closed-form Direct Preference Optimization (DPO).',
        vi: 'Quy trình 3 giai đoạn của RLHF so với phương pháp tối ưu hóa trực tiếp DPO dạng đóng.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'asa-1-1',
          title: {
            en: 'RLHF vs Direct Preference Optimization (DPO) Mechanics',
            vi: 'Cơ Chế Kỹ Thuật RLHF So Với Direct Preference Optimization (DPO)',
          },
          content: {
            en: 'Aligning large language models with human intentions, safety guidelines, and truthfulness requires preference learning beyond simple supervised next-token prediction. Two foundational paradigms dominate this landscape: (1) **RLHF (Reinforcement Learning from Human Feedback)**, which employs a three-phase pipeline consisting of Supervised Fine-Tuning (SFT), training a separate scalar Reward Model $r_\\psi(x, y)$ on pairwise comparisons using the Bradley-Terry preference model, and finally optimizing the policy model $\\pi_\\theta$ using Proximal Policy Optimization (PPO) with an explicit KL-divergence penalty against the frozen reference model $\\pi_{\\text{ref}}$; and (2) **DPO (Direct Preference Optimization)**, which eliminates the separate reward model and reinforcement learning sampling loop entirely by mathematically reparameterizing the Bradley-Terry reward function directly in terms of the optimal policy: $r^*(x, y) = \\beta \\log \\frac{\\pi^*(y \\mid x)}{\\pi_{\\text{ref}}(y \\mid x)}$. By substituting this analytical identity into the pairwise preference loss, DPO trains the target model directly on preference pairs $(x, y_w, y_l)$ using straightforward binary cross-entropy, achieving identical alignment with significantly higher training stability.',
            vi: 'Căn chỉnh mô hình ngôn ngữ lớn theo giá trị, tính an toàn và chuẩn mực của con người đòi hỏi các phương pháp học sở thích (preference learning) vượt lên trên phép dự đoán token tiếp theo có giám sát. Hai trường phái nền tảng định hình lĩnh vực này gồm: (1) **RLHF (Học Tăng Cường Từ Phản Hồi Con Người)**, sử dụng quy trình 3 giai đoạn gồm Tinh chỉnh có giám sát (SFT), huấn luyện Mô hình Phần thưởng (Reward Model) $r_\\psi(x, y)$ trên các cặp phản hồi được người gán nhãn theo mô hình Bradley-Terry, và tối ưu hóa mô hình chính $\\pi_\\theta$ bằng thuật toán PPO kết hợp hệ số phạt phân kỳ KL so với mô hình tham chiếu gốc $\\pi_{\\text{ref}}$; và (2) **DPO (Tối Ưu Hóa Sở Thích Trực Tiếp)**, loại bỏ hoàn toàn mô hình phần thưởng riêng biệt và vòng lặp lấy mẫu RL phức tạp bằng cách tham số hóa trực tiếp hàm phần thưởng tối ưu theo tỷ số xác suất của policy: $r^*(x, y) = \\beta \\log \\frac{\\pi^*(y \\mid x)}{\\pi_{\\text{ref}}(y \\mid x)}$. Bằng cách thay thế công thức giải tích này vào hàm mục tiêu so sánh cặp, DPO huấn luyện trực tiếp mô hình trên các cặp $(x, y_w, y_l)$ thông qua hàm mất mát binary cross-entropy tiêu chuẩn, đạt chất lượng căn chỉnh tương đương nhưng độ ổn định huấn luyện cao hơn nhiều.',
          },
          keyIdea: {
            en: 'RLHF requires training a separate Reward Model and running complex PPO reinforcement loops. DPO mathematically derives an exact analytical closed-form loss, optimizing preferences directly with binary cross-entropy without an external reward model.',
            vi: 'RLHF đòi hỏi huấn luyện một Reward Model riêng và chạy vòng lặp học tăng cường PPO phức tạp. DPO giải tích hóa toán học để đưa về một hàm mất mát dạng đóng, tối ưu hóa sở thích trực tiếp qua binary cross-entropy mà không cần mô hình phần thưởng.',
          },
          definitionDetails: {
            term: {
              en: 'RLHF (Reinforcement Learning from Human Feedback) & DPO (Direct Preference Optimization)',
              vi: 'RLHF (Học Tăng Cường Từ Phản Hồi) & DPO (Tối Ưu Hóa Sở Thích Trực Tiếp)',
            },
            formalDefinition: {
              en: 'RLHF is a multi-phase alignment methodology optimizing an agent policy pi_theta against an estimated scalar reward model r_psi(x, y) via PPO constrained by a KL divergence penalty against a frozen reference policy pi_ref: max_theta E[r_psi(x, y) - beta * D_KL(pi_theta(y|x) || pi_ref(y|x))]. DPO is an analytical reparameterization of the Bradley-Terry preference objective that optimizes pi_theta directly on preference datasets (x, y_w, y_l) using binary cross-entropy without an explicit reward model: L_DPO = -E[log sigma(beta * log(pi_theta(y_w|x) / pi_ref(y_w|x)) - beta * log(pi_theta(y_l|x) / pi_ref(y_l|x)))].',
              vi: 'RLHF là phương pháp căn chỉnh đa giai đoạn tối ưu hóa chính sách pi_theta dựa trên mô hình phần thưởng r_psi(x, y) qua thuật toán PPO kèm ràng buộc phân kỳ KL: max_theta E[r_psi(x, y) - beta * D_KL(pi_theta(y|x) || pi_ref(y|x))]. DPO là phép tái tham số hóa toán học hàm mục tiêu Bradley-Terry giúp tối ưu trực tiếp pi_theta trên tập dữ liệu sở thích (x, y_w, y_l) bằng hàm mất mát binary cross-entropy mà không cần mô hình phần thưởng riêng biệt: L_DPO = -E[log sigma(beta * log(pi_theta(y_w|x) / pi_ref(y_w|x)) - beta * log(pi_theta(y_l|x) / pi_ref(y_l|x)))].',
            },
            mentalModel: {
              en: 'RLHF is like hiring a human coach (Reward Model) and practicing on the field (PPO simulation loops) with trial and error. DPO is like handing the model an exam answer key comparing correct and incorrect answers side-by-side and directly adjusting the model probabilities without needing a coach.',
              vi: 'RLHF giống như thuê một huấn luyện viên (Reward Model) và tập luyện trên sân bóng (vòng lặp PPO) thông qua thử sai. DPO giống như đưa cho học sinh một bảng đáp án so sánh câu đúng và câu sai đặt cạnh nhau và trực tiếp điều chỉnh xác suất mà không cần thuê huấn luyện viên.',
            },
            whyItMatters: {
              en: 'Reinforcement learning pipelines (PPO) are notorious for extreme hyperparameter sensitivity, reward hacking, high GPU VRAM footprints (requiring 4 models concurrently in memory: policy, reference, reward, value critic), and training instability. DPO drastically democratizes alignment by converting preference optimization into standard supervised cross-entropy training, reducing GPU memory overhead by half and eliminating PPO instability.',
              vi: 'Vòng lặp học tăng cường PPO nổi tiếng là cực kỳ nhạy cảm với siêu tham số, dễ bị hiện tượng gian lận phần thưởng (reward hacking), tốn bộ nhớ GPU (phải tải cùng lúc 4 mô hình: policy, reference, reward và value critic) và hay bị sụp đổ huấn luyện. DPO dân chủ hóa quá trình căn chỉnh bằng cách chuyển bài toán sở thích về huấn luyện cross-entropy có giám sát thông thường, giảm một nửa bộ nhớ GPU và loại bỏ triệt để tính bất ổn của PPO.',
            },
            commonMisconception: {
              en: 'A common misconception is that DPO is merely "Supervised Fine-Tuning on the winning responses (y_w)". In reality, DPO explicitly penalizes the probability of the losing completion (y_l) relative to the reference model, while dynamically weighting updates based on how implicitly rewarded each completion is under the current policy.',
              vi: 'Một hiểu lầm rất phổ biến là coi DPO chỉ đơn thuần là "SFT trên các câu trả lời thắng cuộc (y_w)". Trên thực tế, hàm mất mát DPO chủ động phạt xác suất của câu trả lời thua cuộc (y_l) so với mô hình tham chiếu gốc, đồng thời gán trọng số linh hoạt dựa trên mức độ chênh lệch phần thưởng ngầm định của chính sách hiện tại.',
            },
            quickReference: {
              en: [
                'SFT Reference Policy (pi_ref): The frozen baseline model after initial instruction tuning, used to calculate the KL divergence drift penalty.',
                'Beta Hyperparameter: Scalar (typically 0.1 to 0.5) controlling the strength of the KL constraint against the reference model.',
                'Winning Completion (y_w): The preferred response chosen by human annotators or automated high-quality judge models.',
                'Losing Completion (y_l): The rejected response containing hallucinations, toxicity, or incorrect reasoning.',
              ],
              vi: [
                'Mô Hình Tham Chiếu SFT (pi_ref): Mô hình gốc được đóng băng sau bước instruction tuning ban đầu, dùng để tính hệ số phạt độ lệch KL.',
                'Siêu Tham Số Beta: Hệ số tỷ lệ (thường từ 0.1 đến 0.5) điều chỉnh mức độ ràng buộc giữ mô hình không đi quá xa mô hình tham chiếu.',
                'Câu Trả Lời Được Ưa Chuộng (y_w): Câu trả lời tốt hơn được người gán nhãn hoặc mô hình giám khảo cấp cao lựa chọn.',
                'Câu Trả Lời Bị Từ Chối (y_l): Câu trả lời bị loại bỏ do chứa ảo giác, thông tin độc hại hoặc suy luận sai lầm.',
              ],
            },
            minimalExample: {
              language: 'python',
              explanation: {
                en: 'PyTorch implementation of the mathematical DPO loss function taking policy and reference log-probabilities.',
                vi: 'Hiện thực PyTorch hàm mất mát DPO chuẩn toán học nhận vào log-probability của mô hình mục tiêu và mô hình tham chiếu.',
              },
              code: `import torch
import torch.nn.functional as F

def compute_dpo_loss(
    policy_chosen_logps: torch.Tensor,    # log pi_theta(y_w | x)
    policy_rejected_logps: torch.Tensor,  # log pi_theta(y_l | x)
    reference_chosen_logps: torch.Tensor, # log pi_ref(y_w | x)
    reference_rejected_logps: torch.Tensor,# log pi_ref(y_l | x)
    beta: float = 0.1
) -> torch.Tensor:
    """Computes the Direct Preference Optimization (DPO) loss."""
    # 1. Compute log ratios between policy and reference
    pi_logratios = policy_chosen_logps - policy_rejected_logps
    ref_logratios = reference_chosen_logps - reference_rejected_logps

    # 2. Compute implicit logits scaled by beta
    logits = beta * (pi_logratios - ref_logratios)

    # 3. DPO Loss is negative log-sigmoid of implicit reward difference
    loss = -F.logsigmoid(logits).mean()
    return loss`,
            },
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
        en: 'Input/output validation guardrails, defense-in-depth, deterministic filters vs model moderators, and adversarial red teaming.',
        vi: 'Hàng rào kiểm duyệt đầu vào/ra, phòng thủ chiều sâu, bộ lọc tất định so với mô hình kiểm duyệt và kiểm thử red teaming.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'asa-2-1',
          title: {
            en: 'Runtime Guardrails Architecture & Automated Red Teaming',
            vi: 'Kiến Trúc Hàng Rào Guardrails Lúc Chạy & Kiểm Thử Red Teaming Tự Động',
          },
          content: {
            en: 'While weight-level alignment (RLHF/DPO) reduces unsafe propensities during pre-training and post-training, foundation models remain vulnerable to novel adversarial jailbreaks, prompt injection, and hallucinated system prompt leakage. Consequently, enterprise production systems enforce two complementary operational layers: (1) **Runtime AI Guardrails**, a programmatic defense-in-depth middleware boundary interposed between external clients and foundation models that executes deterministic validation (regex pattern matching, PII token stripping, schema validation) and lightweight probabilistic classifiers (such as Llama Guard) to intercept toxic, unauthorized, or malformed queries before and after inference; and (2) **Adversarial Red Teaming**, the systematic stress-testing of AI systems using automated attack frameworks (e.g., GCG - Greedy Coordinate Gradient, PAIR - Prompt Automatic Iterative Refinement) and manual ethical hacking to map the vulnerability frontier and expose latent safety vulnerabilities before customer deployment.',
            vi: 'Mặc dù căn chỉnh trọng số mô hình (RLHF/DPO) giúp giảm thiểu các xu hướng trả lời độc hại, các mô hình nền tảng vẫn luôn tiềm ẩn nguy cơ bị vượt rào bởi các kỹ thuật tấn công jailbreak tinh vi, prompt injection và trích xuất lộ system prompt. Do đó, các hệ thống doanh nghiệp bắt buộc phải thiết lập hai lớp vận hành bảo vệ bổ trợ: (1) **Hàng Rào Guardrails Lúc Chạy (Runtime Guardrails)**, một tầng middleware phòng thủ theo chiều sâu nằm giữa client và mô hình nền tảng, thực thi các bộ lọc tất định (so khớp regex, xóa dữ liệu nhạy cảm PII, ép kiểu schema) cùng các mô hình phân loại nhẹ (như Llama Guard) để chặn đứng các câu hỏi độc hại hoặc kết quả sai chuẩn trước và sau khi suy luận; và (2) **Kiểm Thử Xâm Nhập Red Teaming (Adversarial Red Teaming)**, quy trình tấn công thử nghiệm hệ thống AI có hệ thống sử dụng các bộ công cụ tự động (như thuật toán GCG, PAIR) kết hợp hacker mũ trắng để tìm ra các ranh giới lỗ hổng và khắc phục trước khi phát hành cho người dùng.',
          },
          keyIdea: {
            en: 'Model alignment alone is never 100% secure. Enterprise AI requires defense-in-depth runtime guardrails (deterministic checks + model classifiers) validated by rigorous adversarial red teaming.',
            vi: 'Căn chỉnh trọng số mô hình không bao giờ đảm bảo an toàn 100%. Hệ thống AI doanh nghiệp bắt buộc phải có hàng rào guardrails lúc chạy (kết hợp luật tất định + mô hình phân loại) và được kiểm thử định kỳ bằng red teaming.',
          },
          definitionDetails: {
            term: {
              en: 'Runtime AI Guardrails & Adversarial Red Teaming',
              vi: 'Hàng Rào Guardrails Lúc Chạy & Kiểm Thử Red Teaming Đối Kháng',
            },
            formalDefinition: {
              en: 'Runtime AI Guardrails constitute an operational security middleware pipeline executing synchronous input sanitation, intent classification, and output policy verification around foundation model invocations. Adversarial Red Teaming is the structured empirical methodology of probing, discovering, and cataloging bypass vulnerabilities in AI architectures using automated perturbation algorithms and penetration testing.',
              vi: 'Hàng Rào Guardrails Lúc Chạy là hệ thống middleware an ninh đồng bộ làm sạch đầu vào, phân loại ý định và xác thực chính sách nội dung đầu ra bao bọc quanh mô hình AI. Kiểm Thử Red Teaming Đối Kháng là phương pháp thực nghiệm có cấu trúc nhằm thăm dò, phát hiện và lập danh mục các lỗ hổng vượt rào trong kiến trúc AI bằng thuật toán tự động và kỹ thuật tấn công xâm nhập.',
            },
            mentalModel: {
              en: 'Guardrails are the physical security screening gates at an international airport (baggage scanners, metal detectors, and passport inspection) protecting the terminal. Red Teaming is the authorized special audit team actively trying to smuggle simulated contraband through those security gates to uncover blind spots.',
              vi: 'Guardrails giống như các cổng kiểm soát an ninh tại sân bay quốc tế (máy soi hành lý, cổng từ và đối chiếu hộ chiếu) bảo vệ toàn bộ nhà ga. Red Teaming là đội kiểm toán an ninh đặc biệt được cấp phép cố tình tìm cách mang vật cấm qua cổng nhằm phát hiện sơ hở.',
            },
            whyItMatters: {
              en: 'Relying solely on system prompts (e.g. "Do not reveal secrets") fails against determined indirect prompt injection attacks where untrusted user input overrides instructions. Runtime guardrails provide hard deterministic firewalls that reject threats with sub-5ms overhead, protecting sensitive corporate databases and preventing brand reputational damage.',
              vi: 'Chỉ dựa vào system prompt (ví dụ: "Không được tiết lộ mật khẩu") là hoàn toàn vô dụng trước các đòn tấn công indirect prompt injection khi dữ liệu ngoài ghi đè chỉ dẫn. Hàng rào guardrails cung cấp bức tường lửa tất định ngăn chặn mối đe dọa với độ trễ chỉ dưới 5ms, bảo vệ an toàn dữ liệu doanh nghiệp và uy tín thương hiệu.',
            },
            commonMisconception: {
              en: 'Assuming that adding a guardrail guarantees zero vulnerabilities. Guardrail classifiers can themselves suffer from false positives and evasion attacks; true safety requires defense-in-depth combining deterministic filters, model moderators, least-privilege API scopes, and human-in-the-loop verification.',
              vi: 'Lầm tưởng rằng việc cài đặt guardrail sẽ đảm bảo an toàn tuyệt đối 100%. Các mô hình guardrail bản thân nó cũng có thể bị qua mặt hoặc nhận diện nhầm; an toàn thực sự đòi hỏi phòng thủ nhiều lớp kết hợp luật cứng, mô hình kiểm duyệt, phân quyền tối thiểu API và phê duyệt của con người.',
            },
            quickReference: {
              en: [
                'Input Guardrail: Validates and cleanses user prompts for prompt injection, jailbreaks, PII, and banned topics before sending to the model.',
                'Output Guardrail: Scans model completions for hallucinations, toxic language, sensitive key leakage, and JSON schema conformity.',
                'GCG (Greedy Coordinate Gradient): Automated adversarial algorithm that appends optimized adversarial token suffixes to elicit restricted behaviors.',
                'Indirect Prompt Injection: Malicious instructions embedded inside external data sources (e.g. web pages, PDFs) ingested by an agent.',
              ],
              vi: [
                'Hàng Rào Đầu Vào (Input Guardrail): Kiểm tra và làm sạch câu hỏi người dùng để chặn prompt injection, jailbreak, dữ liệu PII và chủ đề cấm trước khi gửi cho mô hình.',
                'Hàng Rào Đầu Ra (Output Guardrail): Quét câu trả lời của mô hình để phát hiện ảo giác, ngôn từ độc hại, lộ API key và đảm bảo đúng định dạng JSON schema.',
                'Thuật Toán GCG: Thuật toán đối kháng tự động tối ưu hóa chuỗi hậu tố token để ép mô hình vượt qua các rào cản an toàn.',
                'Tấn Công Prompt Injection Gián Tiếp: Các câu lệnh độc hại được cài cắm bên trong dữ liệu bên ngoài (như trang web, tệp PDF) mà agent nạp vào.',
              ],
            },
            minimalExample: {
              language: 'typescript',
              explanation: {
                en: 'TypeScript defense-in-depth guardrail pipeline demonstrating regex sanitization followed by policy moderation before calling the foundation model.',
                vi: 'Pipeline guardrail phòng thủ chiều sâu bằng TypeScript minh họa bước làm sạch regex kết hợp kiểm duyệt chính sách trước khi gọi mô hình.',
              },
              code: `// Middleware Guardrail Pipeline
export interface GuardrailResult {
  allowed: boolean;
  sanitizedPrompt?: string;
  rejectionReason?: string;
}

export function executeInputGuardrails(rawPrompt: string): GuardrailResult {
  // 1. Deterministic Rule: Detect prompt injection / system instruction override attempts
  const injectionPatterns = [
    /ignore previous instructions/i,
    /disregard all prior rules/i,
    /system prompt override/i,
    /you are now DAN/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(rawPrompt)) {
      return {
        allowed: false,
        rejectionReason: 'Security Policy Violation: Prompt injection attempt detected.',
      };
    }
  }

  // 2. Deterministic Rule: Strip Social Security Numbers / PII Patterns
  const sanitized = rawPrompt.replace(/\\b\\d{3}-\\d{2}-\\d{4}\\b/g, '[REDACTED_SSN]');

  return {
    allowed: true,
    sanitizedPrompt: sanitized,
  };
}`,
            },
          },
        },
      ],
    },
  ],
};
