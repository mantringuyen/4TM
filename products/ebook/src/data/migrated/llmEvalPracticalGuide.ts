import { Book } from '../../types';

export const LLM_EVAL_PRACTICAL_GUIDE_BOOK: Book = {
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
  role: 'AI Quality Engineering & Evaluation Systems Group',
  level: 'Intermediate',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-10',
  accentColor: 'from-cyan-600 to-blue-950',
  tags: ['LLM Evaluation', 'LLM-as-a-Judge', 'RAG Triad', 'Faithfulness', 'Benchmarking', 'Practical Guides'],
  description: {
    en: 'A step-by-step engineering guide to implementing automated LLM evaluation pipelines: structured Likert rubric design, rubric-grounded rationale, mitigating judge biases (position, verbosity), and decomposing the RAG Triad (Context Relevance, Faithfulness, Answer Relevance).',
    vi: 'Hướng dẫn thực hành kỹ thuật từng bước xây dựng hệ thống đánh giá chất lượng mô hình LLM tự động: thiết kế rubric thang điểm Likert chuẩn mực, giải trình dựa trên tiêu chí rubric, khắc phục các thiên vị của giám khảo (vị trí, độ dài câu) và bóc tách bộ ba chỉ số RAG Triad (Độ liên quan ngữ cảnh, Tính trung thực, Độ liên quan câu trả lời).',
  },
  prerequisites: {
    en: [
      'Understanding of RAG retrieval-augmented generation pipelines and prompt structure',
      'Basic familiarity with JSON schema configuration and statistical aggregation (mean, standard deviation)',
    ],
    vi: [
      'Hiểu biết về kiến trúc hệ thống RAG và cấu trúc câu lệnh prompt',
      'Quen thuộc với cấu hình JSON schema và thống kê tổng hợp cơ bản (trung bình, độ lệch chuẩn)',
    ],
  },
  outcomes: {
    en: [
      'Construct deterministic 1-to-5 Likert judge rubrics enforcing evidence-based rationale before score emission',
      'Eliminate position bias and verbosity bias in pairwise evaluation via order-swapped evaluation loops',
      'Decompose RAG systems into independent Context Relevance, Faithfulness, and Answer Relevance metrics',
      'Pinpoint whether RAG quality regressions originate from retrieval noise or generator hallucinations',
    ],
    vi: [
      'Xây dựng rubric chấm điểm 1 đến 5 theo thang Likert bắt buộc xuất giải trình dựa trên chứng cứ trước khi chấm điểm',
      'Loại bỏ thiên vị vị trí và thiên vị độ dài trong so sánh cặp bằng kỹ thuật đảo vị trí hai chiều',
      'Bóc tách hệ thống RAG thành 3 chỉ số độc lập: Context Relevance, Faithfulness và Answer Relevance',
      'Xác định chính xác nguyên nhân suy giảm chất lượng RAG bắt nguồn từ việc tìm kiếm sai hay do mô hình sinh ảo giác',
    ],
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
        en: 'Automated scoring with frontier models, structured Likert rubrics, rubric-grounded rationale, and mitigating judge biases.',
        vi: 'Chấm điểm tự động bằng mô hình cấp cao, thang điểm Likert rõ ràng, giải trình dựa trên tiêu chí rubric và khắc phục thiên vị giám khảo.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'leg-1-1',
          title: {
            en: 'Designing Judge Rubrics & Mitigating Evaluation Biases',
            vi: 'Thiết Kế Rubric Chấm Điểm & Giảm Thiểu Định Kiến Đánh Giá (Judge Biases)',
          },
          content: {
            en: 'Manual human evaluation does not scale for continuous deployment and regression testing in generative AI systems. The LLM-as-a-Judge pattern automates quality scoring by utilizing a superior frontier model (such as Gemini 1.5 Pro) to grade candidate model completions against explicit, standardized rubrics. However, unconstrained judge prompts suffer from severe systematic biases: (1) **Position Bias**, where the judge strongly favors whichever completion is presented first; (2) **Verbosity Bias**, where longer, verbose answers receive higher scores regardless of conciseness or factual density; and (3) **Self-Enhancement Bias**, where models systematically award higher ratings to their own generated completions. To obtain reproducible, statistically sound evaluations, engineers must enforce structured 1-5 Likert scale rubrics with concrete behavioral descriptions for every score tier, mandate a **rubric-grounded rationale** (requiring the judge to cite concrete evidence from the response *before* outputting the integer score), and run bidirectional order-swapped passes for pairwise comparisons.',
            vi: 'Đánh giá thủ công bằng con người không thể mở rộng quy mô khi triển khai liên tục và kiểm thử hồi quy trên các hệ thống AI tạo sinh. Mô hình LLM-as-a-Judge tự động hóa việc chấm điểm chất lượng bằng cách sử dụng một mô hình nền tảng cấp cao (như Gemini 1.5 Pro) để đánh giá câu trả lời của mô hình mục tiêu dựa trên các tiêu chí rubric được chuẩn hóa. Tuy nhiên, nếu prompt chấm điểm không được thiết kế chặt chẽ, giám khảo AI sẽ mắc phải các định kiến có hệ thống nghiêm trọng: (1) **Thiên vị vị trí (Position Bias)**, giám khảo có xu hướng ưu ái câu trả lời được đưa ra đầu tiên; (2) **Thiên vị độ dài (Verbosity Bias)**, câu trả lời dài dòng nhận điểm cao hơn bất kể sự súc tích hay mật độ thông tin; và (3) **Thiên vị tự khen (Self-Enhancement Bias)**, mô hình có xu hướng chấm điểm cao hơn cho các câu trả lời do chính họ mô hình của nó sinh ra. Để đạt kết quả đánh giá ổn định và có ý nghĩa thống kê, kỹ sư phải xây dựng rubric thang điểm Likert từ 1 đến 5 với mô tả hành vi rõ ràng cho từng mức điểm, bắt buộc xuất **Giải trình dựa trên rubric** (yêu cầu mô hình trích dẫn chứng cứ cụ thể *trước* khi chấm số điểm) và chạy vòng lặp đảo thứ tự hai chiều khi so sánh cặp.',
          },
          keyIdea: {
            en: 'LLM-as-a-Judge is an automated proxy, not infallible ground truth. Require the judge model to provide a concise, rubric-grounded rationale before emitting a score, and run bidirectional order-swapped evaluations to eliminate position bias.',
            vi: 'LLM-as-a-Judge là một công cụ đo lường tự động mang tính ước lượng, không phải là chân lý tuyệt đối. Yêu cầu mô hình giám khảo xuất giải trình súc tích dựa trên rubric trước khi chấm điểm và luôn chạy kiểm thử đảo thứ tự hai chiều để triệt tiêu thiên vị vị trí.',
          },
          guideDetails: {
            goal: {
              en: 'Implement an automated, statistically calibrated LLM-as-a-Judge scoring pipeline using structured 1-5 Likert rubrics, evidence-based rationale, and position-bias mitigation.',
              vi: 'Xây dựng pipeline chấm điểm LLM-as-a-Judge tự động và chuẩn hóa thống kê sử dụng rubric thang Likert 1-5, giải trình dựa trên chứng cứ và loại bỏ thiên vị vị trí.',
            },
            prerequisites: {
              en: [
                'Access to a frontier reasoning model (e.g. Gemini 1.5 Pro)',
                'Curated test dataset of user queries and candidate model completions',
              ],
              vi: [
                'Quyền truy cập vào mô hình suy luận cấp cao (ví dụ: Gemini 1.5 Pro)',
                'Tập dữ liệu kiểm thử gồm câu hỏi người dùng và câu trả lời của mô hình ứng viên',
              ],
            },
            preparation: {
              en: 'Define explicit scoring rubrics where each integer from 1 to 5 maps to unmistakable behavioral criteria, ensuring no subjective ambiguity between scores.',
              vi: 'Xác định tiêu chí chấm điểm rõ ràng trong đó mỗi con số từ 1 đến 5 ứng với các mô tả hành vi cụ thể, không để lại sự mơ hồ cảm tính giữa các bậc điểm.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Define the 1-to-5 Likert Evaluation Rubric',
                  vi: 'Xây Dựng Rubric Đánh Giá Thang Điểm Likert 1 Đến 5',
                },
                instruction: {
                  en: 'Draft a rubric with concrete operational definitions for each score: 1 (Completely incorrect / harmful), 2 (Major inaccuracies), 3 (Partially accurate but missing key facets), 4 (Accurate and clear with minor omissions), 5 (Flawless, concise, and fully accurate).',
                  vi: 'Soạn thảo rubric với định nghĩa cụ thể cho từng mức: 1 (Hoàn toàn sai hoặc độc hại), 2 (Sai sót nghiêm trọng), 3 (Đúng một phần nhưng thiếu ý chính), 4 (Chính xác, rõ ràng, thiếu sót không đáng kể), 5 (Hoàn hảo, súc tích và chính xác tuyệt đối).',
                },
                codeSnippet: {
                  language: 'markdown',
                  code: `Rubric for Technical Accuracy:
Score 1: The response is completely inaccurate, hallucinated, or off-topic.
Score 2: Contains major technical flaws that would break execution if applied.
Score 3: The general concept is correct, but contains omissions or minor errors.
Score 4: Highly accurate and functional with only cosmetic or stylistic room for improvement.
Score 5: Technically rigorous, perfectly structured, fully verified, and directly answers the question.`,
                },
                expectedOutput: {
                  en: 'Documented rubric standard approved by domain experts',
                  vi: 'Bản tiêu chí rubric được chuyên gia chuyên môn phê duyệt',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Implement the Judge Pipeline with Rubric-Grounded Rationale Enforcement',
                  vi: 'Hiện Thực Pipeline Giám Khảo Bắt Buộc Xuất Giải Trình Dựa Trên Rubric',
                },
                instruction: {
                  en: 'Enforce a structured JSON schema requiring the judge model to emit its concise evidence-based rationale string *before* the numerical score integer.',
                  vi: 'Áp dụng JSON schema có cấu trúc bắt buộc mô hình giám khảo phải xuất chuỗi giải trình dựa trên chứng cứ súc tích *trước* khi đưa ra số điểm nguyên.',
                },
                codeSnippet: {
                  language: 'typescript',
                  code: `import { GoogleGenAI, Type } from '@google/genai';

export interface JudgeEvaluation {
  rationale: string;
  score: number; // 1 to 5
}

export async function evaluateCompletion(
  ai: GoogleGenAI,
  prompt: string,
  candidateResponse: string,
  rubric: string
): Promise<JudgeEvaluation> {
  const judgePrompt = \`You are an impartial, highly rigorous technical evaluator.
Evaluate the candidate response against the user prompt using the provided rubric.

CRITICAL INSTRUCTION: Provide a concise, rubric-grounded rationale citing specific evidence from the candidate response before determining the final integer score. Do not provide private or unrestricted chain-of-thought reasoning.

User Prompt:
\${prompt}

Candidate Response:
\${candidateResponse}

Evaluation Rubric:
\${rubric}\`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: judgePrompt,
    config: {
      temperature: 0.0, // Zero temperature for reproducible grading
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rationale: {
            type: Type.STRING,
            description: 'Concise rubric-grounded rationale citing specific evidence from the candidate response',
          },
          score: {
            type: Type.INTEGER,
            description: 'Final rating from 1 to 5 matching the rubric criteria',
          },
        },
        required: ['rationale', 'score'],
      },
    },
  });

  return JSON.parse(response.text!);
}`,
                },
                expectedOutput: {
                  en: 'Judge returns verified JSON with concise evidence-based rationale and calibrated 1-5 score',
                  vi: 'Giám khảo trả về JSON chuẩn có giải trình dựa trên chứng cứ súc tích và điểm số từ 1 đến 5',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Implement Pairwise Evaluation with Order-Swapping Mitigation',
                  vi: 'Thực Hiện So Sánh Cặp Với Kỹ Thuật Đảo Thứ Tự Khắc Phục Thiên Vị Vị Trí',
                },
                instruction: {
                  en: 'When benchmarking Model A against Model B, run two passes: Pass 1 presents (A, B) and Pass 2 presents (B, A). A victory is awarded only if consistent across both presentations.',
                  vi: 'Khi đánh giá so sánh Model A và Model B, chạy 2 lượt: Lượt 1 đưa thứ tự (A, B) và Lượt 2 đưa (B, A). Chiến thắng chỉ được công nhận nếu kết quả nhất quán trên cả hai lượt.',
                },
                codeSnippet: {
                  language: 'typescript',
                  code: `export async function runBidirectionalPairwiseMatch(
  ai: GoogleGenAI,
  prompt: string,
  responseA: string,
  responseB: string
): Promise<'A_WINS' | 'B_WINS' | 'TIE'> {
  // Pass 1: Order (A, B)
  const pass1 = await evaluatePair(ai, prompt, responseA, responseB);
  // Pass 2: Order (B, A) - Inverted presentation
  const pass2 = await evaluatePair(ai, prompt, responseB, responseA);

  if (pass1 === 'FIRST' && pass2 === 'SECOND') return 'A_WINS';
  if (pass1 === 'SECOND' && pass2 === 'FIRST') return 'B_WINS';
  return 'TIE'; // Inconsistent due to position bias -> treated as a draw
}`,
                },
                expectedOutput: {
                  en: 'Position-invariant pairwise determination',
                  vi: 'Kết quả so sánh cặp bất biến với vị trí trình bày',
                },
              },
            ],
            verification: {
              en: 'Verify correlation against human ground-truth labels on a 100-sample calibration set. The automated pipeline should achieve a Spearman correlation coefficient of rho >= 0.80 with human consensus.',
              vi: 'Kiểm tra độ tương quan với nhãn của con người trên tập hiệu chuẩn 100 mẫu. Pipeline tự động cần đạt hệ số tương quan Spearman rho >= 0.80 so với sự đồng thuận của con người.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Judge scores cluster exclusively around 4 and 5 with zero differentiation',
                  vi: 'Điểm số của giám khảo tập trung toàn bộ ở mức 4 và 5, không có sự phân hóa',
                },
                cause: {
                  en: 'The rubric is too lenient or lacks explicit negative examples illustrating what constitutes a score of 2 or 3.',
                  vi: 'Rubric quá dễ dãi hoặc thiếu các ví dụ sai sót cụ thể minh họa cho mức điểm 2 hoặc 3.',
                },
                fix: {
                  en: 'Add few-shot anchoring examples into the judge prompt demonstrating strict criteria for lower score tiers.',
                  vi: 'Bổ sung các ví dụ mẫu (few-shot) vào prompt giám khảo minh họa các tiêu chí khắt khe cho các bậc điểm thấp.',
                },
              },
              {
                symptom: {
                  en: 'Longer responses consistently win pairwise battles despite containing fluff',
                  vi: 'Các câu trả lời dài luôn chiến thắng trong so sánh cặp dù chứa nhiều thông tin thừa',
                },
                cause: {
                  en: 'Verbosity bias: the judge model equates length and formatting complexity with intellectual depth.',
                  vi: 'Thiên vị độ dài: mô hình giám khảo nhầm lẫn giữa độ dài văn bản với chiều sâu tri thức.',
                },
                fix: {
                  en: 'Explicitly penalize superfluous verbosity in the system prompt: "Deduct 1 full point if the answer includes unnecessary filler text."',
                  vi: 'Chủ động phạt câu chữ thừa trong prompt: "Trừ 1 điểm nếu câu trả lời chứa các đoạn văn dài dòng không cần thiết."',
                },
              },
            ],
            checklist: {
              en: [
                'Rubric defines concrete operational criteria for every score from 1 to 5',
                'Rubric-grounded rationale citing concrete evidence is generated strictly before the numerical score is emitted',
                'Pairwise comparisons run bidirectional order-swapped passes to negate position bias',
                'Temperature set to 0.0 for deterministic evaluation consistency across test runs',
              ],
              vi: [
                'Rubric định nghĩa tiêu chí hoạt động cụ thể cho từng mức điểm từ 1 đến 5',
                'Giải trình dựa trên rubric trích dẫn chứng cứ cụ thể bắt buộc sinh ra trước khi xuất số điểm',
                'So sánh cặp được chạy đảo vị trí hai chiều để triệt tiêu thiên vị vị trí',
                'Thiết lập temperature = 0.0 để đảm bảo tính nhất quán qua các lần chạy kiểm thử',
              ],
            },
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
        en: 'Quantifying Context Relevance, Faithfulness (Groundedness), and Answer Relevance to pinpoint RAG failure modes.',
        vi: 'Định lượng Độ liên quan ngữ cảnh, Tính trung thực và Độ liên quan câu trả lời để phát hiện chính xác lỗi RAG.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'leg-2-1',
          title: {
            en: 'Deconstructing the RAG Triad: Context, Faithfulness & Relevance',
            vi: 'Bóc Tách Bộ Ba Chỉ Số RAG Triad: Context Relevance, Faithfulness & Answer Relevance',
          },
          content: {
            en: 'When a Retrieval-Augmented Generation (RAG) system outputs an incorrect response, diagnosing the root cause is impossible using monolithic end-to-end metrics alone. The system could have failed in two fundamentally different subsystems: (1) **Retrieval Failure**, where the search engine fetched irrelevant document chunks; or (2) **Generation Failure**, where the retriever fetched correct chunks, but the generator hallucinated ungrounded claims or ignored the prompt. The **RAG Triad** framework decomposes system evaluation into three mutually independent metrics: (1) **Context Relevance** (Retriever Quality): The proportion of retrieved context sentences that are directly relevant to the user query; (2) **Faithfulness / Groundedness** (Generator Quality): The proportion of atomic claims in the generated response that can be directly verified from the retrieved context; and (3) **Answer Relevance** (Instruction Quality): The semantic alignment between the generated response and the original user query, measuring whether the query was directly answered without irrelevant digressions.',
            vi: 'Khi một hệ thống RAG (Retrieval-Augmented Generation) trả về kết quả sai, việc chẩn đoán nguyên nhân gốc rễ là bất khả thi nếu chỉ dùng các chỉ số đánh giá đầu-cuối nguyên khối. Hệ thống có thể gặp lỗi ở hai phân hệ hoàn toàn khác nhau: (1) **Lỗi Truy Xuất (Retrieval Failure)**, bộ tìm kiếm kéo về các đoạn văn bản không liên quan; hoặc (2) **Lỗi Sinh Nội Dung (Generation Failure)**, bộ tìm kiếm lấy về dữ liệu hoàn toàn đúng nhưng mô hình sinh chữ lại tự bịa ra thông tin ảo giác hoặc phớt lờ câu hỏi. Khung đánh giá **RAG Triad** bóc tách chất lượng hệ thống thành 3 chỉ số độc lập: (1) **Context Relevance** (Chất lượng Retriever): Tỷ lệ các câu trong ngữ cảnh truy xuất thực sự liên quan đến câu hỏi người dùng; (2) **Faithfulness / Groundedness** (Tính Trung Thực / Chất lượng Generator): Tỷ lệ các mệnh đề chân lý nguyên tử (atomic claims) trong câu trả lời có thể chứng minh trực tiếp từ ngữ cảnh tìm được; và (3) **Answer Relevance** (Độ Liên Quan Câu Trả Lời): Mức độ tương đồng ngữ nghĩa giữa câu trả lời sinh ra và câu hỏi gốc, đo lường việc câu hỏi có được giải quyết trực tiếp mà không lan man hay không.',
          },
          keyIdea: {
            en: 'Do not measure RAG with a single metric. Decompose it into Context Relevance (retrieval precision), Faithfulness (hallucination rate), and Answer Relevance (prompt adherence) to isolate failure modes.',
            vi: 'Đừng đánh giá hệ thống RAG bằng một chỉ số duy nhất. Hãy chia nhỏ thành Context Relevance (độ chính xác tìm kiếm), Faithfulness (tỷ lệ ảo giác) và Answer Relevance (độ tuân thủ câu hỏi) để cô lập chính xác phân hệ bị lỗi.',
          },
          guideDetails: {
            goal: {
              en: 'Build an automated evaluation pipeline measuring the 3 independent RAG Triad metrics to pinpoint whether quality regressions stem from retrieval search noise or generator hallucinations.',
              vi: 'Xây dựng pipeline đánh giá tự động đo đạc 3 chỉ số độc lập của RAG Triad để xác định sự suy giảm chất lượng bắt nguồn từ tìm kiếm tài liệu sai hay do mô hình sinh ảo giác.',
            },
            prerequisites: {
              en: [
                'Logged RAG production tuples containing (user_query, retrieved_chunks, generated_answer)',
                'Gemini 1.5 model access for atomic claim decomposition and verification',
              ],
              vi: [
                'Nhật ký dữ liệu RAG thực tế gồm bộ 3 (câu_hỏi, ngữ_cảnh_tìm_được, câu_trả_lời)',
                'Mô hình Gemini 1.5 để phân tách mệnh đề nguyên tử và xác minh tính đúng đắn',
              ],
            },
            preparation: {
              en: 'Understand the mathematical ratio governing Faithfulness: decompose the answer into discrete atomic claims, evaluate whether each claim is entailed by the context, and compute Faithfulness = (supported claims) / (total claims).',
              vi: 'Nắm vững công thức toán học của Faithfulness: phân tách câu trả lời thành các mệnh đề nguyên tử, kiểm tra từng mệnh đề có được ngữ cảnh bảo chứng không, và tính Faithfulness = (số mệnh đề được bảo chứng) / (tổng số mệnh đề).',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Step 1: Extract Atomic Claims from the Generated Answer',
                  vi: 'Bước 1: Trích Xuất Các Mệnh Đề Nguyên Tử Từ Câu Trả Lời',
                },
                instruction: {
                  en: 'Prompt the evaluator model to break down the compound answer into isolated, self-contained factual assertions (atomic propositions).',
                  vi: 'Yêu cầu mô hình giám khảo chia nhỏ câu trả lời phức thành các mệnh đề khẳng định chân lý độc lập, đơn lẻ (atomic propositions).',
                },
                codeSnippet: {
                  language: 'typescript',
                  code: `export async function extractAtomicClaims(
  ai: GoogleGenAI,
  answer: string
): Promise<string[]> {
  const prompt = \`Decompose the following answer into a list of independent, atomic factual claims.
Each claim must assert exactly one verifiable fact without pronouns.

Answer:
\${answer}\`;

  const res = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
    },
  });

  return JSON.parse(res.text!);
}`,
                },
                expectedOutput: {
                  en: 'Array of atomic claims extracted from text',
                  vi: 'Mảng các mệnh đề chân lý độc lập được trích xuất',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Step 2: Verify Groundedness of Each Claim Against Context (Faithfulness)',
                  vi: 'Bước 2: Xác Minh Tính Trung Thực Của Từng Mệnh Đề Dựa Trên Ngữ Cảnh (Faithfulness)',
                },
                instruction: {
                  en: 'For each atomic claim, verify whether it is directly supported by the retrieved context chunks. Calculate Faithfulness as supported_claims / total_claims.',
                  vi: 'Với mỗi mệnh đề nguyên tử, xác minh xem nó có được chứng minh bởi các đoạn ngữ cảnh không. Tính điểm Faithfulness = supported_claims / total_claims.',
                },
                codeSnippet: {
                  language: 'typescript',
                  code: `export async function computeFaithfulness(
  ai: GoogleGenAI,
  context: string,
  claims: string[]
): Promise<{ score: number; ungroundedClaims: string[] }> {
  if (claims.length === 0) return { score: 1.0, ungroundedClaims: [] };

  const prompt = \`Context:
\${context}

Evaluate whether each of the following claims is strictly supported by the context above.
Claims:
\${JSON.stringify(claims, null, 2)}\`;

  const res = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          supportedClaims: { type: Type.ARRAY, items: { type: Type.STRING } },
          ungroundedClaims: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['supportedClaims', 'ungroundedClaims'],
      },
    },
  });

  const data = JSON.parse(res.text!);
  const score = data.supportedClaims.length / claims.length;
  return { score, ungroundedClaims: data.ungroundedClaims };
}`,
                },
                expectedOutput: {
                  en: 'Faithfulness score between 0.0 and 1.0 with list of ungrounded hallucinated claims',
                  vi: 'Điểm số Faithfulness từ 0.0 đến 1.0 kèm danh sách các mệnh đề ảo giác',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Step 3: Evaluate Context Relevance and Answer Relevance',
                  vi: 'Bước 3: Đánh Giá Context Relevance Và Answer Relevance',
                },
                instruction: {
                  en: 'Measure what fraction of retrieved chunks were necessary to answer the query (Context Relevance), and measure whether the final answer directly addresses the query without digression (Answer Relevance).',
                  vi: 'Đo lường tỷ lệ các đoạn văn bản thực sự cần thiết để trả lời câu hỏi (Context Relevance), và đánh giá câu trả lời có giải quyết trúng đích câu hỏi không (Answer Relevance).',
                },
                codeSnippet: {
                  language: 'typescript',
                  code: `export interface RAGTriadReport {
  contextRelevance: number; // 0.0 to 1.0 (Retriever Precision)
  faithfulness: number;     // 0.0 to 1.0 (Generator Hallucination Free Rate)
  answerRelevance: number;  // 0.0 to 1.0 (Query Adherence)
  diagnosis: string;
}

export function diagnoseRAGReport(report: RAGTriadReport): string {
  if (report.contextRelevance < 0.6) {
    return 'RETRIEVAL BOTTLENECK: The search system returned noisy/irrelevant chunks. Tune embeddings or top-k reranking.';
  }
  if (report.faithfulness < 0.8) {
    return 'GENERATOR BOTTLENECK: The LLM is hallucinating facts not in context. Tighten system prompt constraints or lower temperature.';
  }
  if (report.answerRelevance < 0.7) {
    return 'ALIGNMENT BOTTLENECK: The answer is grounded but does not resolve the user specific query. Adjust prompt instructions.';
  }
  return 'OPTIMAL: All 3 components of the RAG Triad are well-calibrated.';
}`,
                },
                expectedOutput: {
                  en: 'Consolidated RAG Triad metric report with automated root cause diagnosis',
                  vi: 'Báo cáo tổng hợp bộ ba chỉ số RAG Triad kèm chẩn đoán tự động',
                },
              },
            ],
            verification: {
              en: 'Inject synthetic test cases with deliberately corrupted context or hallucinated answers; verify that the Triad metrics independently detect and flag the specific corrupted subsystem.',
              vi: 'Tạo các trường hợp kiểm thử giả lập cố tình làm sai lệch ngữ cảnh hoặc đưa câu trả lời ảo giác; xác nhận các chỉ số Triad phát hiện và gắn cờ chính xác phân hệ bị lỗi.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Faithfulness is 1.0 but users complain that responses are unhelpful or evasive',
                  vi: 'Điểm Faithfulness đạt 1.0 tuyệt đối nhưng người dùng phàn nàn câu trả lời vô ích hoặc né tránh',
                },
                cause: {
                  en: 'The model outputs "I do not have enough information to answer" which is technically 100% faithful to the missing context, but Answer Relevance is low.',
                  vi: 'Mô hình trả lời "Tôi không có đủ thông tin để trả lời", điều này đúng 100% về mặt trung thực nhưng điểm Answer Relevance lại rất thấp.',
                },
                fix: {
                  en: 'Inspect Context Relevance; low Answer Relevance combined with high Faithfulness indicates the retriever failed to find the required source documents.',
                  vi: 'Kiểm tra Context Relevance; Answer Relevance thấp kết hợp Faithfulness cao chứng minh bộ retriever đã tìm trượt tài liệu nguồn.',
                },
              },
            ],
            checklist: {
              en: [
                'Context Relevance measures retriever noise independently from generator behavior',
                'Faithfulness breaks answer into atomic claims to quantify hallucination percentage',
                'Answer Relevance verifies the response addresses the prompt without extraneous padding',
                'Automated diagnosis accurately classifies whether failures stem from retrieval or generation',
              ],
              vi: [
                'Context Relevance đo lường độ nhiễu của retriever độc lập với hành vi generator',
                'Faithfulness chia nhỏ câu trả lời thành mệnh đề nguyên tử để định lượng tỷ lệ ảo giác',
                'Answer Relevance xác nhận câu trả lời giải quyết đúng trọng tâm mà không lan man',
                'Chẩn đoán tự động phân loại chính xác lỗi bắt nguồn từ khâu tìm kiếm hay khâu sinh nội dung',
              ],
            },
          },
        },
      ],
    },
  ],
};
