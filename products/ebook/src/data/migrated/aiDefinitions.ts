import { Book } from '../../types';

export const AI_DEFINITIONS_BOOK: Book = {
  id: 'ai-definitions',
  slug: 'ai-definitions',
  title: 'AI Terminology & LLM Glossary',
  subtitle: {
    en: 'AI Glossary, Inference Parameters & Architectural Concepts',
    vi: 'Từ Điển Khái Niệm AI, Tham Số Sinh Token & Thuật Ngữ Mô Hình',
  },
  bookType: 'Definitions',
  categoryId: 'ai',
  subjectId: 'ai',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-12',
  accentColor: 'from-purple-600 to-indigo-800',
  tags: ['Definitions', 'Glossary', 'LLM Terms', 'AI Core'],
  description: {
    en: 'Clear reference definitions for key AI and LLM terms: Temperature, Top-P, Hallucination, Context Window, System Prompt, RAG, and Vector DB.',
    vi: 'Từ điển định nghĩa các thuật ngữ AI & LLM: Temperature, Top-P, Bệnh ảo giác (Hallucination), Cửa sổ ngữ cảnh, System Prompt, RAG và Cơ sở dữ liệu Vector.',
  },
  prerequisites: {
    en: ['Basic understanding of AI concepts'],
    vi: ['Hiểu biết cơ bản về các khái niệm AI'],
  },
  outcomes: {
    en: ['Define essential LLM sampling parameters accurately', 'Understand hallucination taxonomies and grounding architectures'],
    vi: ['Phân biệt và định nghĩa chính xác các tham số lấy mẫu LLM', 'Hiểu rõ phân loại ảo giác và kiến trúc đối chiếu dữ liệu grounding'],
  },
  chapters: [
    {
      id: 'ai-def-ch-1',
      number: 1,
      slug: 'sampling-parameter-definitions',
      title: {
        en: 'Inference Sampling Parameters (Temperature, Top-P, Top-K)',
        vi: 'Định Nghĩa Các Tham Số Lấy Mẫu (Temperature, Top-P, Top-K)',
      },
      summary: {
        en: 'Temperature logit scaling, Top-P cumulative probability cutoff, and Top-K token limiting.',
        vi: 'Biến đổi logit với Temperature, ngắt xác xuất tích lũy Top-P và giới hạn Top-K token.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'ai-def-1-1',
          title: {
            en: 'Temperature vs Top-P (Nucleus Sampling)',
            vi: 'Khác Biệt Giữa Temperature Và Top-P (Nucleus Sampling)',
          },
          content: {
            en: 'Temperature controls the flatness of the probability distribution over candidate tokens ($z/T$), while Top-P dynamically restricts candidate selection to the smallest set of tokens whose cumulative probability exceeds threshold $P$.',
            vi: 'Temperature điều chỉnh độ phẳng của phân phối xác suất trên các token ứng viên ($z/T$), trong khi Top-P chủ động giới hạn tập ứng viên vào nhóm tối thiểu có tổng xác suất tích lũy vượt ngưỡng $P$.',
          },
          definitionDetails: {
            term: {
              en: 'Temperature & Nucleus Sampling (Top-P)',
              vi: 'Temperature & Lấy Mẫu Nucleus (Top-P)',
            },
            formalDefinition: {
              en: 'Hyperparameters that govern stochastic token generation from neural logit outputs: Temperature divides raw logits by scalar $T$ prior to Softmax calculation ($P(x_i) = \\frac{\\exp(z_i/T)}{\\sum \\exp(z_j/T)}$); Top-P (Nucleus Sampling) samples exclusively from the minimal subset $V^{(p)} \\subset V$ such that $\\sum_{x \\in V^{(p)}} P(x) \\ge p$.',
              vi: 'Các siêu tham số điều khiển quá trình lấy mẫu ngẫu nhiên từ đầu ra logit: Temperature chia đều logit thô cho hệ số $T$ trước khi tính hàm Softmax ($P(x_i) = \\frac{\\exp(z_i/T)}{\\sum \\exp(z_j/T)}$); Top-P (Nucleus Sampling) lấy mẫu chọn lọc trong tập con tối thiểu $V^{(p)} \\subset V$ sao cho $\\sum_{x \\in V^{(p)}} P(x) \\ge p$.',
            },
            mentalModel: {
              en: 'Think of Temperature as turning up the heat on a simmering pot: at T=0 it freezes into a single deterministic ice block (the top candidate); as heat increases, molecules (probabilities) spread out evenly across rare words. Top-P acts as an intelligent bouncer that discards the bottom tail of improbable nonsense words.',
              vi: 'Hãy hình dung Temperature như nút vặn nhiệt độ của nồi nước: ở T=0 nó đóng băng thành một khối đá xác định duy nhất (luôn chọn từ có điểm cao nhất); nhiệt độ càng tăng thì các phân tử (xác suất) càng khuếch tán đều sang các từ hiếm. Top-P đóng vai trò như người gác cổng thông minh chỉ giữ lại những từ hợp lý nhất và cắt bỏ toàn bộ phần đuôi vô nghĩa.',
            },
            whyItMatters: {
              en: 'Choosing incorrect sampling parameters causes catastrophic failure modes: high temperature on code generation produces syntax errors, while greedy decoding (T=0) on creative writing leads to repetitive looping text.',
              vi: 'Chọn sai tham số lấy mẫu sẽ phá hủy chất lượng đầu ra: nhiệt độ cao khi sinh code sẽ tạo ra lỗi cú pháp, trong khi giải mã tham lam (T=0) khi viết văn sẽ khiến mô hình bị lặp đi lặp lại một cụm từ nhàm chán.',
            },
            commonMisconception: {
              en: 'Believing that setting Temperature=0 makes a model truly intelligent or guarantees factual truth. Temperature=0 only makes outputs mathematically deterministic; a model will hallucinate with 100% confidence at T=0 if the fact is not encoded in its weights.',
              vi: 'Lầm tưởng rằng đặt Temperature=0 sẽ giúp mô hình thông minh hơn hoặc luôn nói sự thật. T=0 chỉ đảm bảo kết quả sinh ra cố định không đổi giữa các lần chạy; mô hình vẫn bịa đặt sự thật với độ tự tin tuyệt đối 100% nếu tri thức đó không có trong trọng số.',
            },
            quickReference: {
              en: [
                'Temperature = 0.0: Deterministic output (JSON schemas, SQL queries, Math calculations).',
                'Temperature = 0.7 - 0.9: Creative generation (Brainstorming, Storytelling, Marketing copy).',
                'Top-P = 0.90 - 0.95: Standard nucleus cutoff used across production APIs.',
                'Never adjust Temperature and Top-P aggressively at the same time.',
              ],
              vi: [
                'Temperature = 0.0: Đầu ra xác định cố định (Trích xuất JSON, câu truy vấn SQL, Tính toán).',
                'Temperature = 0.7 - 0.9: Sinh nội dung sáng tạo (Lên ý tưởng, Viết truyện, Marketing).',
                'Top-P = 0.90 - 0.95: Ngưỡng ngắt nucleus tiêu chuẩn trong các hệ thống production.',
                'Không nên thay đổi mạnh cả Temperature và Top-P cùng một lúc.',
              ],
            },
            minimalExample: {
              language: 'python',
              filename: 'temperature_top_p.py',
              explanation: {
                en: 'Illustrates the mathematical transformation of logits under temperature and nucleus filtering.',
                vi: 'Minh họa công thức biến đổi logit qua temperature và bộ lọc nucleus.',
              },
              code: `import numpy as np

def sample(logits: np.ndarray, temp: float = 0.7, top_p: float = 0.9) -> int:
    if temp == 0.0:
        return int(np.argmax(logits))
    probs = np.exp(logits / temp) / np.sum(np.exp(logits / temp))
    sorted_idx = np.argsort(probs)[::-1]
    cumulative = np.cumsum(probs[sorted_idx])
    cutoff = np.searchsorted(cumulative, top_p)
    valid_idx = sorted_idx[:cutoff + 1]
    p_norm = probs[valid_idx] / np.sum(probs[valid_idx])
    return int(np.random.choice(valid_idx, p=p_norm))`,
            },
          },
        },
      ],
    },
    {
      id: 'ai-def-ch-2',
      number: 2,
      slug: 'hallucination-context-window-definitions',
      title: {
        en: 'Hallucination, Grounding & Context Window Definitions',
        vi: 'Định Nghĩa Hallucination, Grounding & Cửa Sổ Ngữ Cảnh',
      },
      summary: {
        en: 'Mechanisms behind LLM hallucinations and grounding techniques with search tools.',
        vi: 'Cơ chế gây ra hiện tượng ảo giác (hallucination) và kỹ thuật đối chiếu grounding.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'ai-def-2-1',
          title: {
            en: 'LLM Hallucination Definition, Mechanics & Grounding Solutions',
            vi: 'Định Nghĩa Hiện Tượng Ảo Giác (Hallucination) & Giải Pháp Grounding',
          },
          content: {
            en: 'Hallucination is the generation of fluent, syntactically convincing, but factually false or ungrounded assertions stemming from next-token probability maximization rather than truth verification.',
            vi: 'Ảo giác (Hallucination) là hiện tượng mô hình sinh ra văn bản lưu loát, ngữ pháp mạch lạc nhưng sai sự thật hoặc không có cơ sở đối chiếu, do bản chất tối đa hóa xác suất từ tiếp theo thay vì kiểm chứng chân lý.',
          },
          definitionDetails: {
            term: {
              en: 'Hallucination & Grounding',
              vi: 'Hiện Tượng Ảo Giác (Hallucination) & Đối Chiếu Dữ Liệu (Grounding)',
            },
            formalDefinition: {
              en: 'Hallucination is a phenomenon where a generative model produces content that is unfaithful to provided source material (Faithfulness Hallucination) or discordant with established world facts (Factuality Hallucination). Grounding is the architectural process of binding model generation to verifiable external data sources via Retrieval-Augmented Generation (RAG) or search engines.',
              vi: 'Ảo giác là hiện tượng mô hình tạo sinh sinh ra nội dung không trung thực với tài liệu được cung cấp (Ảo giác ngữ cảnh - Faithfulness) hoặc sai lệch so với sự thật khách quan (Ảo giác thực tế - Factuality). Grounding là kỹ thuật kiến trúc buộc câu trả lời của mô hình phải dựa trên dữ liệu đối chiếu có thể kiểm chứng được thông qua RAG hoặc công cụ tìm kiếm.',
            },
            mentalModel: {
              en: 'An LLM without grounding is like a confident improvisational actor who never breaks character: when asked about a topic it does not know, it smoothly invents plausible-sounding names, dates, and citations because its neural objective is linguistic continuation, not honesty.',
              vi: 'Một mô hình LLM không có dữ liệu đối chiếu giống như một diễn viên kịch ứng biến xuất sắc: khi được hỏi về điều nó không biết, nó sẽ tự tin bịa ra những cái tên, ngày tháng và án lệ nghe rất thuyết phục vì mục tiêu của mạng nơ-ron là nối tiếp câu chữ cho trôi chảy chứ không phải thẩm định sự thật.',
            },
            whyItMatters: {
              en: 'Unmitigated hallucinations represent the single largest liability in enterprise generative AI deployments across medical diagnostics, financial analysis, legal compliance, and autonomous API execution.',
              vi: 'Ảo giác chưa được kiểm soát là rủi ro pháp lý và vận hành lớn nhất khi triển khai AI tạo sinh trong các lĩnh vực y tế, phân tích tài chính, tư vấn luật pháp và tự động hóa hệ thống.',
            },
            commonMisconception: {
              en: 'Assuming that fine-tuning or training larger models completely eliminates hallucinations. In reality, larger models hallucinate more convincingly with sophisticated jargon; deterministic grounding and retrieval architectures are mandatory for factual fidelity.',
              vi: 'Nghĩ rằng Fine-tuning hoặc tăng kích thước mô hình sẽ xóa bỏ hoàn toàn ảo giác. Thực tế mô hình càng lớn càng bịa chuyện tinh vi và thuyết phục hơn; chỉ có kiến trúc đối chiếu dữ liệu (Grounding / RAG) mới giải quyết triệt để vấn đề này.',
            },
            quickReference: {
              en: [
                'Factuality Hallucination: Fabricating non-existent facts, people, citations, or URLs.',
                'Faithfulness Hallucination: Contradicting or embellishing facts provided inside prompt context.',
                'Grounding Remedy: Mandatory verbatim quote extraction before generating answers.',
                'Abstention Rule: Explicitly permit "I do not know" responses when evidence is missing.',
              ],
              vi: [
                'Ảo giác thực tế (Factuality): Tự bịa ra sự kiện, tác giả, bài báo hoặc đường link không tồn tại.',
                'Ảo giác trung thực (Faithfulness): Nói mâu thuẫn hoặc tự suy diễn thêm thắt ngoài tài liệu trong prompt.',
                'Giải pháp Grounding: Ép mô hình trích dẫn nguyên văn bằng chứng trước khi tổng hợp kết luận.',
                'Quy tắc từ chối: Luôn cho phép mô hình trả lời "Tôi không biết" khi tài liệu không đề cập.',
              ],
            },
            minimalExample: {
              language: 'python',
              filename: 'grounded_prompt.py',
              explanation: {
                en: 'Standard grounded prompt template enforcing citation-backed answers with strict abstention.',
                vi: 'Mẫu prompt chuẩn ép buộc đối chiếu trích dẫn tài liệu và cho phép từ chối khi thiếu dữ liệu.',
              },
              code: `SYSTEM_PROMPT = """You are a grounded factual assistant.
Rules:
1. Answer using ONLY the provided [Context] documents.
2. If the context does not explicitly contain the answer, reply: 'Insufficient reference data.'
3. Never invent facts, dates, or URLs."""`,
            },
          },
        },
      ],
    },
  ],
};
