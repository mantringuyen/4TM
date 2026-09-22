import { Book } from '../../types';

export const AI_FUNDAMENTALS_HANDBOOK_BOOK: Book = {
  id: 'ai-fundamentals-handbook',
  slug: 'ai-fundamentals-handbook',
  title: 'AI & Large Language Model Architecture Handbook',
  subtitle: {
    en: 'Transformers, Embeddings, Attention, Tokenization & Inference Mechanics',
    vi: 'Kiến Trúc Transformer, Embedding, Attention, Token Hóa & Cơ Chế Suy Luận LLM',
  },
  bookType: 'Handbook',
  categoryId: 'ai',
  subjectId: 'ai',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational to Intermediate',
  estimatedReadTime: '40 mins',
  chaptersCount: 3,
  publishedDate: '2025-02-15',
  accentColor: 'from-violet-600 to-indigo-900',
  tags: ['AI Fundamentals', 'Transformers', 'Attention', 'LLMs', 'Tokenization'],
  description: {
    en: 'A foundational handbook on AI and Large Language Model architectures: byte-pair tokenization, high-dimensional vector embeddings, Scaled Dot-Product Attention, Transformer decoders, and KV-Cache inference optimization.',
    vi: 'Cẩm nang toàn diện về kiến trúc AI và mô hình ngôn ngữ lớn (LLM): thuật toán tách từ Byte-Pair Encoding, không gian vectơ nhúng ngữ nghĩa, cơ chế Scaled Dot-Product Attention, giải mã Transformer và tối ưu bộ nhớ đệm KV-Cache trong suy luận.',
  },
  prerequisites: {
    en: ['Basic Python programming', 'Introductory linear algebra (vectors, matrices, dot products)'],
    vi: ['Lập trình Python cơ bản', 'Đại số tuyến tính căn bản (vectơ, ma trận, tích vô hướng)'],
  },
  outcomes: {
    en: [
      'Master tokenization mechanics (BPE) and vector embedding space geometries',
      'Understand Scaled Dot-Product Attention math and PyTorch causal masking',
      'Calculate KV-Cache memory consumption for high-concurrency LLM deployments',
    ],
    vi: [
      'Làm chủ cơ chế tách từ BPE và cấu trúc hình học của không gian vector nhúng',
      'Thấu hiểu công thức Scaled Dot-Product Attention và mặt nạ causal trong PyTorch',
      'Tính toán chính xác dung lượng bộ nhớ KV-Cache khi phục vụ LLM tải cao',
    ],
  },
  chapters: [
    {
      id: 'ai-fb-ch-1',
      number: 1,
      slug: 'foundations-tokens-embeddings',
      title: {
        en: 'Foundations: Tokens, Tokenization & Vector Embeddings',
        vi: 'Nền Tảng: Token, Thuật Toán Tách Từ & Không Gian Vector Nhúng',
      },
      summary: {
        en: 'From raw text to token IDs via Byte-Pair Encoding (BPE), and mapping discrete tokens into continuous semantic vector spaces.',
        vi: 'Từ văn bản thô sang ID token bằng thuật toán BPE và ánh xạ token rời rạc vào không gian vector ngữ nghĩa liên tục.',
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'ai-fb-1-1',
          title: {
            en: 'Tokens, BPE Tokenization & Embedding Spaces',
            vi: 'Token, Thuật Toán Tách Từ BPE & Không Gian Vector Nhúng',
          },
          keyIdea: {
            en: 'Large Language Models do not read raw strings. Text is first converted into numeric token identifiers via subword algorithms (BPE), then projected into high-dimensional geometric embedding vectors where semantic relationships become geometric proximity.',
            vi: 'Mô hình ngôn ngữ lớn không đọc văn bản dạng chuỗi ký tự. Văn bản được tách thành các mã định danh token (Token ID) thông qua thuật toán tách từ (BPE), sau đó được chiếu vào không gian vector nhiều chiều nơi mối quan hệ ngữ nghĩa biến thành khoảng cách hình học.',
          },
          content: {
            en: 'Tokenization is the discrete translation layer between human language and neural networks. Modern models (GPT-4, Claude, LLaMA) use Byte-Pair Encoding (BPE), an iterative subword compression algorithm that merges the most frequent byte pairs into a vocabulary of typically 32,000 to 128,000 tokens. Once tokenized, an integer token ID (e.g. `29482`) indexes a learned look-up matrix ($W_e \\in \\mathbb{R}^{V \\times d_{\\text{model}}}$) to produce a dense floating-point vector (e.g. 4096 dimensions). In this geometric space, semantic similarity corresponds to cosine distance, allowing vector arithmetic such as $\\vec{v}_{\\text{King}} - \\vec{v}_{\\text{Man}} + \\vec{v}_{\\text{Woman}} \\approx \\vec{v}_{\\text{Queen}}$.',
            vi: 'Token hóa là lớp chuyển đổi trung gian giữa ngôn ngữ con người và mạng nơ-ron. Các mô hình hiện đại (GPT-4, Claude, LLaMA) sử dụng thuật toán Byte-Pair Encoding (BPE) để gộp các cặp byte xuất hiện thường xuyên nhất thành một bộ từ điển gồm 32.000 đến 128.000 token. Khi đã được tách thành token, mỗi số nguyên Token ID (ví dụ `29482`) sẽ tra cứu vào ma trận trọng số ($W_e \\in \\mathbb{R}^{V \\times d_{\\text{model}}}$) để sinh ra một vector số thực dày đặc (thường có 4096 chiều). Trong không gian hình học này, sự tương đồng về mặt ý nghĩa tương ứng với khoảng cách góc Cosine, cho phép thực hiện các phép toán vector như $\\vec{v}_{\\text{King}} - \\vec{v}_{\\text{Man}} + \\vec{v}_{\\text{Woman}} \\approx \\vec{v}_{\\text{Queen}}$.',
          },
          comparisonTable: {
            headers: [
              { en: 'Tokenization Approach', vi: 'Phương Pháp Tách Từ' },
              { en: 'Vocabulary Size', vi: 'Kích Thước Bộ Từ Điển' },
              { en: 'Out-of-Vocabulary (OOV) Risk', vi: 'Nguy Cơ Gặp Từ Chưa Biết' },
              { en: 'Sequence Length Efficiency', vi: 'Độ Dài Chuỗi Đầu Ra' },
            ],
            rows: [
              {
                en: ['Character-level', 'Tiny (~256 bytes)', 'Zero OOV (every byte covered)', 'Very long sequences (High compute cost)'],
                vi: ['Theo ký tự (Character)', 'Rất nhỏ (~256 bytes)', 'Không bị lỗi OOV (bao phủ mọi byte)', 'Chuỗi quá dài (Tốn tài nguyên tính toán)'],
              },
              {
                en: ['Word-level', 'Massive (500k+ words)', 'High (Misspellings/Slang fail)', 'Compact sequences (Fast inference)'],
                vi: ['Theo từ (Word-level)', 'Rất lớn (500k+ từ)', 'Rất cao (Từ viết sai/tiếng lóng bị lỗi)', 'Chuỗi ngắn gọn (Xử lý nhanh)'],
              },
              {
                en: ['Subword / BPE (Standard)', 'Optimal (32k - 128k)', 'Zero OOV (Falls back to UTF-8 bytes)', 'Optimal balance between compute and context'],
                vi: ['Subword / BPE (Chuẩn LLM)', 'Tối ưu (32k - 128k)', 'Không bị lỗi OOV (Tự lùi về byte UTF-8)', 'Cân bằng hoàn hảo giữa tính toán và ngữ cảnh'],
              },
            ],
          },
          codeBlock: {
            language: 'python',
            filename: 'bpe_tokenizer_demo.py',
            explanation: {
              en: 'Demonstrates token inspection with tiktoken and computing vector cosine similarity in pure Python/PyTorch.',
              vi: 'Minh họa cách phân tích token bằng thư viện tiktoken và tính toán độ tương đồng cosine giữa các vector nhúng.',
            },
            code: `import tiktoken
import torch
import torch.nn.functional as F

# 1. Inspect Subword Tokenization using GPT-4o Tokenizer (o200k_base)
enc = tiktoken.get_encoding("o200k_base")
text = "Artificial Intelligence & 4TM Ecosystem"
tokens = enc.encode(text)

print(f"Original Text: {text}")
print(f"Token Count: {len(tokens)}")
print(f"Token IDs: {tokens}")
print(f"Decoded Chunks: {[enc.decode([t]) for t in tokens]}")

# 2. Vector Embedding Cosine Similarity Demonstration
embedding_dim = 1536
# Simulated normalized embeddings for semantic concepts
vec_ai = F.normalize(torch.randn(1, embedding_dim), p=2, dim=1)
vec_ml = F.normalize(vec_ai + torch.randn(1, embedding_dim) * 0.2, p=2, dim=1)
vec_banana = F.normalize(torch.randn(1, embedding_dim), p=2, dim=1)

sim_ai_ml = torch.mm(vec_ai, vec_ml.T).item()
sim_ai_banana = torch.mm(vec_ai, vec_banana.T).item()

print(f"Cosine Similarity (AI <-> ML): {sim_ai_ml:.4f}")         # High (~0.85+)
print(f"Cosine Similarity (AI <-> Banana): {sim_ai_banana:.4f}") # Near zero (~0.02)`,
          },
          diagram: {
            title: {
              en: 'From Text to High-Dimensional Vector Embeddings',
              vi: 'Quy Trình Từ Văn Bản Thô Đến Vector Nhúng Đa Chiều',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Raw String Ingestion', vi: 'Tiếp Nhận Văn Bản Thô' },
                description: {
                  en: 'User prompt is normalized and passed into the Byte-Pair Encoding subword tokenizer.',
                  vi: 'Văn bản của người dùng được chuẩn hóa và đưa vào bộ tách từ BPE (Byte-Pair Encoding).',
                },
              },
              {
                number: 2,
                label: { en: 'Discrete Token ID Array', vi: 'Mảng Số Nguyên Token ID' },
                description: {
                  en: 'Text is split into subword chunks; each mapped to its vocabulary integer index.',
                  vi: 'Văn bản được cắt thành các mảnh subword; mỗi mảnh được gán một số nguyên định danh.',
                },
              },
              {
                number: 3,
                label: { en: 'Embedding Matrix Lookup', vi: 'Tra Cứu Ma Trận Embedding' },
                description: {
                  en: 'Integer IDs index into the embedding matrix to extract dense continuous float vectors + positional encodings.',
                  vi: 'Các ID số nguyên tra cứu vào ma trận trọng số để trích xuất các vector số thực kèm mã vị trí.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Assuming 1 word equals exactly 1 token across all languages and codebases',
                vi: 'Lầm tưởng 1 từ luôn tương đương đúng 1 token trên mọi ngôn ngữ và mã nguồn',
              },
              why: {
                en: 'English averages ~1.3 tokens per word, but non-Latin scripts (Vietnamese, Japanese, Arabic) or indentation-heavy code can consume 2 to 4 tokens per word due to smaller subword vocab coverage.',
                vi: 'Tiếng Anh trung bình tốn ~1.3 token mỗi từ, nhưng các ngôn ngữ có dấu (Tiếng Việt) hoặc code nhiều khoảng trắng có thể tốn từ 2 đến 4 token mỗi từ do bộ từ điển subword ít mẫu sẵn hơn.',
              },
              solution: {
                en: 'Always measure context windows and API billing using official tokenizer libraries (e.g. tiktoken, transformers) rather than naive string word counts.',
                vi: 'Luôn đo lường kích thước ngữ cảnh và chi phí API bằng thư viện token hóa chính thức (như tiktoken) thay vì đếm từ thủ công.',
              },
              codeIncorrect: `word_count = len(text.split(" "))
estimated_cost = word_count * 0.00002 # Underestimates cost for non-English text by up to 300%!`,
              codeCorrect: `import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
token_count = len(enc.encode(text)) # 100% accurate context window calculation!`,
            },
          ],
          practicalScenario: {
            en: 'In production Retrieval-Augmented Generation (RAG) pipelines, querying a vector database with raw cosine distance over 100k documents can be slow. Modern vector databases (pgvector, Qdrant, Pinecone) build HNSW (Hierarchical Navigable Small World) graph indexes over the embedding vectors, enabling sub-millisecond approximate nearest neighbor (ANN) retrieval at 99%+ recall.',
            vi: 'Trong các hệ thống RAG thực tế, việc tìm kiếm đối chiếu vector bằng phép tính khoảng cách Cosine thô qua 100.000 tài liệu rất tốn thời gian. Các cơ sở dữ liệu vector hiện đại (pgvector, Qdrant, Pinecone) xây dựng cấu trúc đồ thị HNSW trên các vector nhúng, cho phép tìm kiếm láng giềng gần nhất (ANN) chỉ trong vài mili-giây với độ chính xác trên 99%.',
          },
          bestPractices: {
            en: [
              'Normalize embedding vectors (L2 unit norm) prior to indexing so dot product equals cosine similarity.',
              'Use the exact same embedding model checkpoint for indexing chunks and user query encoding.',
              'Chunk long documents with semantic overlap (e.g., 512 tokens with 50-token overlap) to preserve cross-boundary context.',
            ],
            vi: [
              'Chuẩn hóa độ dài vector (L2 norm) trước khi nạp vào cơ sở dữ liệu để phép nhân vô hướng tương đương độ tương đồng cosine.',
              'Bắt buộc dùng cùng một mô hình embedding để nhúng tài liệu và nhúng câu hỏi của người dùng.',
              'Chia nhỏ văn bản thành các đoạn có độ gối đầu ngữ nghĩa (ví dụ 512 token gối đầu 50 token) để không đứt gãy ý nghĩa.',
            ],
          },
          keyTakeaways: {
            en: [
              'BPE tokenization eliminates out-of-vocabulary errors by falling back to UTF-8 byte sequences.',
              'Embedding matrices project discrete tokens into dense geometric continuous semantic spaces.',
              'Cosine similarity measures the angular orientation of concept vectors independently of magnitude.',
            ],
            vi: [
              'Thuật toán tách từ BPE loại bỏ hoàn toàn lỗi từ chưa biết nhờ cơ chế tự động lùi về chuỗi byte UTF-8.',
              'Ma trận embedding chuyển đổi các token rời rạc thành không gian hình học ngữ nghĩa liên tục.',
              'Độ tương đồng Cosine đo lường góc định hướng giữa các vector khái niệm độc lập với độ dài vector.',
            ],
          },
        },
      ],
    },
    {
      id: 'ai-fb-ch-2',
      number: 2,
      slug: 'attention-and-transformers',
      title: {
        en: 'Attention Mechanisms & Transformer Architecture',
        vi: 'Cơ Chế Attention & Kiến Trúc Mạng Transformer',
      },
      summary: {
        en: 'Query, Key, Value mechanics, Scaled Dot-Product math, Multi-Head Attention, and causal masking.',
        vi: 'Bản chất ma trận Query, Key, Value, công thức Scaled Dot-Product và Multi-Head Attention.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'ai-fb-2-1',
          title: {
            en: 'Scaled Dot-Product & Multi-Head Attention Mechanisms',
            vi: 'Cơ Chế Scaled Dot-Product & Multi-Head Attention',
          },
          keyIdea: {
            en: 'Scaled Dot-Product Attention computes dynamic relevance weights by matching Query vectors against Key vectors, scaling by 1/sqrt(d_k) to prevent gradient vanishing, and extracting a weighted blend of Value vectors.',
            vi: 'Cơ chế Scaled Dot-Product Attention tính toán trọng số quan hệ ngữ nghĩa động bằng cách so khớp Query với Key, chia cho căn bậc hai của d_k để triệt tiêu hiện tượng đạo hàm biến mất, rồi lấy tổng có trọng số của các vectơ Value.',
          },
          content: {
            en: 'At the heart of the Transformer architecture lies Scaled Dot-Product Attention: $Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$. Each token embedding is projected into three distinct vector spaces via learned linear weight matrices ($W_Q, W_K, W_V$). The Query ($Q$) represents what a token is looking for; the Key ($K$) represents what a token contains or advertises; and the Value ($V$) contains the actual semantic payload. When the vector dimension $d_k$ is large, dot products grow large in magnitude, pushing the softmax function into regions with tiny gradients. Scaling by $\\frac{1}{\\sqrt{d_k}}$ preserves unit variance and ensures stable backpropagation.',
            vi: 'Trọng tâm của kiến trúc Transformer là công thức Scaled Dot-Product Attention: $Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$. Mỗi vectơ biểu diễn token được chiếu qua ba ma trận trọng số học được ($W_Q, W_K, W_V$) để sinh ra ba vectơ riêng biệt. Query ($Q$) đại diện cho thông tin token đang tìm kiếm; Key ($K$) đại diện cho nhãn nhận diện hoặc nội dung token đang sở hữu; còn Value ($V$) chứa nội dung ngữ nghĩa thực tế. Khi số chiều $d_k$ lớn, tích vô hướng sẽ có giá trị cực lớn, đẩy hàm softmax vào vùng bão hòa khiến gradient bị triệt tiêu gần như bằng 0. Hệ số tỉ lệ $\\frac{1}{\\sqrt{d_k}}$ giữ cho phương sai xấp xỉ 1 và đảm bảo quá trình lan truyền ngược ổn định.',
          },
          comparisonTable: {
            headers: [
              { en: 'Attention Variant', vi: 'Biến Thể Attention' },
              { en: 'Q, K, V Head Ratios', vi: 'Tỉ Lệ Số Head Q : K : V' },
              { en: 'Memory Footprint (vRAM)', vi: 'Mức Chiếm Dụng vRAM' },
              { en: 'Inference Speed', vi: 'Tốc Độ Suy Luận' },
            ],
            rows: [
              {
                en: ['Multi-Head Attention (MHA)', 'N heads Q : N heads K : N heads V', 'High (Full KV-Cache per head)', 'Baseline (Memory-bandwidth bound)'],
                vi: ['Multi-Head Attention (MHA)', 'N head Q : N head K : N head V', 'Cao (Lưu đủ KV-Cache cho từng head)', 'Chuẩn (Bị nghẽn băng thông bộ nhớ)'],
              },
              {
                en: ['Multi-Query Attention (MQA)', 'N heads Q : 1 shared K : 1 shared V', 'Ultra-low (~1/N memory of MHA)', 'Blazing fast (Minor quality drop)'],
                vi: ['Multi-Query Attention (MQA)', 'N head Q : 1 head K chung : 1 head V chung', 'Cực thấp (~1/N bộ nhớ của MHA)', 'Rất nhanh (Giảm nhẹ chất lượng mô hình)'],
              },
              {
                en: ['Grouped-Query Attention (GQA)', 'N heads Q : G groups of K & V (e.g. 8:1)', 'Optimal balance (Standard in LLaMA 3)', 'Optimal throughput with zero quality loss'],
                vi: ['Grouped-Query Attention (GQA)', 'N head Q : G nhóm K & V (ví dụ 8:1)', 'Cân bằng tối ưu (Chuẩn của LLaMA 3)', 'Thông lượng tối ưu không làm giảm chất lượng'],
              },
            ],
          },
          codeBlock: {
            language: 'python',
            filename: 'scaled_dot_product_attention.py',
            explanation: {
              en: 'Clean vectorized implementation of Scaled Dot-Product Attention in PyTorch with causal autoregressive masking.',
              vi: 'Triển khai hàm tính Scaled Dot-Product Attention chuẩn vectorized trong PyTorch kèm mặt nạ nhân quả causal mask.',
            },
            code: `import torch
import torch.nn.functional as F

def scaled_dot_product_attention(
    Q: torch.Tensor, 
    K: torch.Tensor, 
    V: torch.Tensor, 
    mask: torch.Tensor | None = None
) -> tuple[torch.Tensor, torch.Tensor]:
    """
    Args:
        Q: [batch_size, num_heads, seq_len_q, d_k]
        K: [batch_size, num_heads, seq_len_k, d_k]
        V: [batch_size, num_heads, seq_len_v, d_v]
        mask: Optional boolean or additive attention mask
    Returns:
        output: [batch_size, num_heads, seq_len_q, d_v]
        attention_weights: [batch_size, num_heads, seq_len_q, seq_len_k]
    """
    d_k = Q.size(-1)
    
    # 1. Compute raw scores: Q @ K^T / sqrt(d_k)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    
    # 2. Apply causal mask if provided (prevents looking into future tokens)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
        
    # 3. Softmax over the key sequence dimension
    attn_weights = F.softmax(scores, dim=-1)
    
    # 4. Multiply by Value vectors: weights @ V
    output = torch.matmul(attn_weights, V)
    return output, attn_weights

# Verification with simulated dimensions
batch, heads, seq_len, d_k = 2, 8, 16, 64
q = torch.randn(batch, heads, seq_len, d_k)
k = torch.randn(batch, heads, seq_len, d_k)
v = torch.randn(batch, heads, seq_len, d_k)

out, weights = scaled_dot_product_attention(q, k, v)
print("Output tensor shape:", out.shape)     # [2, 8, 16, 64]
print("Weights tensor shape:", weights.shape) # [2, 8, 16, 16]`,
          },
          diagram: {
            title: {
              en: 'Attention Matrix Tensor Flow',
              vi: 'Sơ Đồ Dòng Dữ Liệu Ma Trận Attention',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Projection Matrices', vi: 'Phép Chiếu Ma Trận' },
                description: {
                  en: 'Input embeddings X are multiplied by W_Q, W_K, W_V to generate Query, Key, and Value matrices.',
                  vi: 'Embedding đầu vào X được nhân với W_Q, W_K, W_V để sinh ra ma trận Query, Key và Value.',
                },
              },
              {
                number: 2,
                label: { en: 'Dot Product & Scaling', vi: 'Tích Vô Hướng & Chia Căn d_k' },
                description: {
                  en: 'Matrix multiplication Q @ K^T measures affinity between all token pairs; divided by sqrt(d_k).',
                  vi: 'Phép nhân Q @ K^T đo lường độ tương đồng giữa mọi cặp token; chia cho căn bậc hai của d_k.',
                },
              },
              {
                number: 3,
                label: { en: 'Softmax & Value Mixing', vi: 'Chuẩn Hóa Softmax & Trộn Value' },
                description: {
                  en: 'Softmax converts scores into probability distribution (rows sum to 1.0); multiplies Value matrix V.',
                  vi: 'Softmax chuyển điểm thành phân phối xác suất (tổng hàng bằng 1.0); nhân với ma trận Value V.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Omitting the sqrt(d_k) scaling factor or dividing by d_k instead of sqrt(d_k)',
                vi: 'Bỏ quên hệ số chia căn d_k hoặc chia nhầm cho d_k thay vì căn bậc hai của d_k',
              },
              why: {
                en: 'For d_k=64 or 128, unscaled dot products reach values of 50-100. Softmax output becomes a one-hot spike with near-zero gradients everywhere else, completely halting model training.',
                vi: 'Với d_k=64 hoặc 128, tích vô hướng không scale có thể lên tới 50-100. Softmax sẽ bị biến thành vector one-hot với gradient hầu như bằng 0, làm đóng băng hoàn toàn quá trình huấn luyện.',
              },
              solution: {
                en: 'Always divide Q @ K.T by math.sqrt(d_k) before calling softmax.',
                vi: 'Luôn chia Q @ K.T cho math.sqrt(d_k) trước khi truyền vào hàm softmax.',
              },
              codeIncorrect: `scores = torch.matmul(Q, K.transpose(-2, -1)) # Vanishing gradient trap!
attn = torch.softmax(scores, dim=-1)`,
              codeCorrect: `scores = torch.matmul(Q, K.transpose(-2, -1)) / (Q.size(-1) ** 0.5) # Stable!
attn = torch.softmax(scores, dim=-1)`,
            },
          ],
          practicalScenario: {
            en: 'In production inference engines (vLLM, TensorRT-LLM), computing full QK^T materializes an $O(N^2)$ memory matrix that causes out-of-memory errors on 32k+ context prompts. Deploying FlashAttention-2 computes the softmax online in GPU SRAM without ever writing the massive attention matrix to high-bandwidth memory (HBM), yielding a 3-5x speedup.',
            vi: 'Trong các engine suy luận production (vLLM, TensorRT-LLM), việc tính toán ma trận QK^T đầy đủ tạo ra ma trận bộ nhớ cấp số nhân $O(N^2)$ gây tràn vRAM khi prompt dài hơn 32k token. Ứng dụng thuật toán FlashAttention-2 giúp tính softmax từng mẩu nhỏ trực tiếp trên chip SRAM của GPU mà không phải ghi ma trận khổng lồ ra bộ nhớ HBM, tăng tốc từ 3 đến 5 lần.',
          },
          bestPractices: {
            en: [
              'In PyTorch 2.0+, use torch.nn.functional.scaled_dot_product_attention() which automatically dispatches to FlashAttention.',
              'Adopt Grouped-Query Attention (GQA) for production LLMs to cut KV-Cache memory consumption by 75-87%.',
              'Ensure causal masking uses -inf or -1e9 before softmax so future tokens receive absolute 0.0 attention weight.',
            ],
            vi: [
              'Trong PyTorch 2.0+, hãy dùng torch.nn.functional.scaled_dot_product_attention() vì hàm này tự động kích hoạt FlashAttention.',
              'Áp dụng Grouped-Query Attention (GQA) cho các mô hình LLM production để giảm 75-87% bộ nhớ KV-Cache.',
              'Đảm bảo mặt nạ causal mask dùng giá trị -inf hoặc -1e9 trước softmax để các token tương lai nhận chính xác trọng số 0.0.',
            ],
          },
          keyTakeaways: {
            en: [
              'Attention maps Queries to Keys to aggregate a contextualized mixture of Values.',
              'Scaling factor 1/sqrt(d_k) prevents softmax saturation and vanishing gradients.',
              'Modern production models use GQA (Grouped-Query Attention) and FlashAttention for GPU memory efficiency.',
            ],
            vi: [
              'Cơ chế Attention khớp nối Query với Key để tổng hợp tổ hợp ngữ cảnh từ các vectơ Value.',
              'Hệ số co giãn 1/sqrt(d_k) ngăn chặn hàm softmax bị bão hòa và giữ gradient ổn định.',
              'Các mô hình production hiện đại chuyển sang dùng GQA và FlashAttention để tối ưu bộ nhớ GPU.',
            ],
          },
        },
      ],
    },
    {
      id: 'ai-fb-ch-3',
      number: 3,
      slug: 'decoder-only-llms-inference',
      title: {
        en: 'Decoder-Only LLM Inference & Autoregressive Generation',
        vi: 'Sự Khác Biệt Của LLM Decoder-Only & Quá Trình Sinh Tự Điều Hồi',
      },
      summary: {
        en: 'Causal masking, KV-Cache optimization, Temperature, Top-P (Nucleus), and Top-K sampling.',
        vi: 'Mặt nạ Causal Masking, tối ưu KV-Cache, các tham số Temperature, Top-P và Top-K.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'ai-fb-3-1',
          title: {
            en: 'KV-Cache Memory Consumption & Autoregressive Decoding',
            vi: 'Tối Ưu Bộ Nhớ KV-Cache & Quá Trình Giải Mã Tự Điều Hồi',
          },
          keyIdea: {
            en: 'Autoregressive generation generates tokens one at a time. The KV-Cache retains historical Key and Value tensors in GPU memory so each new token only requires a single Query projection, reducing inference time from quadratic O(N²) to linear O(N) per step.',
            vi: 'Quá trình sinh tự điều hồi tạo từng token nối tiếp nhau. KV-Cache giữ lại các tensor Key và Value của những token trước đó trong bộ nhớ GPU để mỗi token mới chỉ cần chiếu một Query duy nhất, giảm độ phức tạp thời gian từ bậc hai O(N²) xuống tuyến tính O(N) ở mỗi bước.',
          },
          content: {
            en: 'LLM inference consists of two distinct stages: the Prefill (Prompt) phase and the Decode (Token Generation) phase. In the Prefill phase, all prompt tokens are processed in parallel via full matrix multiplication. In the Decode phase, however, tokens are produced strictly one by one. Without caching, generating token $N$ would require re-projecting and re-attending over all $N-1$ previous tokens from scratch. The KV-Cache saves every past Key and Value projection in GPU vRAM. However, at long context windows (e.g. 32k or 128k tokens), the KV-Cache memory footprint can easily surpass the size of the model weights themselves.',
            vi: 'Quá trình suy luận LLM bao gồm hai giai đoạn tách biệt: giai đoạn Prefill (nạp prompt) và giai đoạn Decode (sinh từng token). Trong pha Prefill, toàn bộ token trong câu nhắc được xử lý song song thông qua phép nhân ma trận toàn diện. Ngược lại, trong pha Decode, các token mới bắt buộc phải sinh tuần tự từng từ một. Nếu không lưu bộ nhớ đệm, việc sinh ra token thứ $N$ sẽ buộc hệ thống phải tính toán chiếu lại toàn bộ $N-1$ token trước đó từ đầu. KV-Cache lưu lại mọi vector Key và Value đã tính vào vRAM của GPU. Tuy nhiên, khi cửa sổ ngữ cảnh mở rộng (như 32k hoặc 128k token), dung lượng bộ nhớ của KV-Cache có thể nhanh chóng vượt qua cả dung lượng trọng số tĩnh của toàn bộ mô hình.',
          },
          comparisonTable: {
            headers: [
              { en: 'Execution Phase', vi: 'Giai Đoạn Thực Thi' },
              { en: 'Workload Characteristic', vi: 'Đặc Thù Khối Lượng Tính Toán' },
              { en: 'Hardware Bottleneck', vi: 'Nút Thắt Cổ Chai Phần Cứng' },
              { en: 'KV-Cache Behavior', vi: 'Hành Vi Của KV-Cache' },
            ],
            rows: [
              {
                en: ['Prefill (Prompt Processing)', 'Compute-bound (Large matrix multiplications)', 'GPU Tensor Core compute TFLOPs', 'Populates KV-Cache for all prompt tokens'],
                vi: ['Prefill (Xử lý prompt đầu vào)', 'Nặng tính toán (Nhân ma trận kích thước lớn)', 'Năng lực tính toán TFLOPs của Tensor Core', 'Khởi tạo và ghi đầy đủ K, V của prompt vào cache'],
              },
              {
                en: ['Decode (Token Generation)', 'Memory-bandwidth bound (Vector-matrix products)', 'GPU vRAM Bandwidth (GB/s)', 'Reads past KV-Cache, appends single new token KV'],
                vi: ['Decode (Sinh token từng bước)', 'Nghẽn băng thông bộ nhớ (Nhân vector với ma trận)', 'Băng thông bộ nhớ vRAM của GPU (GB/s)', 'Đọc toàn bộ KV-Cache cũ, nối thêm 1 cặp K, V mới'],
              },
            ],
          },
          codeBlock: {
            language: 'python',
            filename: 'kv_cache_memory_calculator.py',
            explanation: {
              en: 'Calculates the exact GPU vRAM memory consumption of KV-Cache across batch sizes and sequence lengths.',
              vi: 'Hàm tính toán chính xác dung lượng bộ nhớ vRAM mà KV-Cache chiếm dụng theo batch size và độ dài chuỗi.',
            },
            code: `def calculate_kv_cache_gb(
    num_layers: int,
    num_kv_heads: int,
    head_dim: int,
    seq_len: int,
    batch_size: int = 1,
    bytes_per_param: int = 2 # FP16 = 2 bytes, FP8 = 1 byte
) -> float:
    """Calculates KV-Cache size in Gigabytes (GB).
    Formula: 2 * num_layers * num_kv_heads * head_dim * seq_len * batch_size * bytes_per_param
    The factor of 2 accounts for both Key and Value tensors.
    """
    total_bytes = (
        2 * num_layers * num_kv_heads * head_dim * seq_len * batch_size * bytes_per_param
    )
    return total_bytes / (1024 ** 3)

# Example: LLaMA-3-8B (32 layers, 8 KV heads with GQA, head_dim=128)
llama3_8b_16k = calculate_kv_cache_gb(
    num_layers=32,
    num_kv_heads=8,
    head_dim=128,
    seq_len=16384,
    batch_size=4,
    bytes_per_param=2 # FP16
)

print(f"LLaMA-3-8B (Batch=4, Context=16k): {llama3_8b_16k:.2f} GB vRAM for KV-Cache")
# Outputs ~8.00 GB purely for KV-Cache!`,
          },
          diagram: {
            title: {
              en: 'Autoregressive Decoding with KV-Cache',
              vi: 'Quy Trình Giải Mã Tự Điều Hồi Có KV-Cache',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Prefill Prompt Cache', vi: 'Nạp Cache Prompt' },
                description: {
                  en: 'Entire prompt is evaluated simultaneously; K and V matrices across all layers are stored into vRAM.',
                  vi: 'Toàn bộ prompt được xử lý đồng thời; ma trận K và V của tất cả các layer được lưu vào vRAM.',
                },
              },
              {
                number: 2,
                label: { en: 'Single Query Projection', vi: 'Chiếu Một Query Mới' },
                description: {
                  en: 'Only the latest token is embedded and multiplied by W_Q to produce current token Query vector.',
                  vi: 'Chỉ token vừa sinh ra mới được nhúng và nhân với W_Q để tạo ra một vector Query duy nhất.',
                },
              },
              {
                number: 3,
                label: { en: 'Append & Softmax Attn', vi: 'Nối Cache & Tính Attention' },
                description: {
                  en: 'New K and V are appended to cache; Query attends over cached historical tokens to sample next token.',
                  vi: 'Vector K và V mới được nối vào cache; Query so khớp với toàn bộ lịch sử trong cache để lấy mẫu từ kế tiếp.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Sizing GPU memory requirements strictly based on model weight parameters alone',
                vi: 'Tính toán dung lượng GPU cần thiết chỉ dựa trên kích thước trọng số tĩnh của mô hình',
              },
              why: {
                en: 'An 8B model takes ~16GB vRAM in FP16. Running 16 concurrent users with 32k context each requires an extra 32GB of vRAM purely for KV-Cache, causing immediate CUDA Out-of-Memory crashes.',
                vi: 'Mô hình 8B cần ~16GB vRAM ở định dạng FP16. Nếu phục vụ 16 người dùng đồng thời với ngữ cảnh 32k token mỗi phiên sẽ cần thêm tới 32GB vRAM riêng cho KV-Cache, gây sập CUDA OOM ngay tức khắc.',
              },
              solution: {
                en: 'Always budget vRAM for peak concurrent batch size and maximum context token limits using KV calculation formulas.',
                vi: 'Luôn dự phòng dung lượng vRAM cho số lượng người dùng đồng thời tối đa và giới hạn độ dài ngữ cảnh theo công thức KV.',
              },
              codeIncorrect: `# Naive sizing: 8B parameters * 2 bytes = 16GB, so 24GB GPU is enough!
required_vram = 16 # Misses KV-Cache entirely!`,
              codeCorrect: `# Comprehensive sizing: Weights + (KV_per_token * max_tokens * max_batch) + Activation buffer
required_vram = 16 + (calculate_kv_cache_gb(32, 8, 128, 32768, batch_size=4)) + 2
# Real requirement: ~26GB!`,
            },
          ],
          practicalScenario: {
            en: 'In multi-tenant LLM serving architectures, traditional contiguous memory allocation for KV-Cache resulted in 60-80% memory waste due to internal/external fragmentation. The introduction of PagedAttention in vLLM splits the KV-Cache into virtual pages (similar to OS virtual memory paging), increasing serving throughput by 2-4x on the same hardware.',
            vi: 'Trong các hệ thống phục vụ LLM đa người dùng, cách cấp phát bộ nhớ liền kề truyền thống cho KV-Cache gây lãng phí 60-80% bộ nhớ do phân mảnh trong và ngoài. Sự ra đời của thuật toán PagedAttention trong vLLM phân chia KV-Cache thành các trang ảo (tương tự cơ chế phân trang của hệ điều hành), giúp tăng thông lượng phục vụ lên 2-4 lần trên cùng phần cứng.',
          },
          bestPractices: {
            en: [
              'Use modern inference servers (vLLM, TGI, SGLang) that implement PagedAttention to eliminate memory fragmentation.',
              'Quantize KV-Cache to FP8 or INT8 (e.g. --kv-cache-dtype fp8 in vLLM) to cut cache memory in half with imperceptible quality loss.',
              'Leverage Prompt Caching (prefix caching) when multiple users share identical system prompts or multi-turn chat histories.',
            ],
            vi: [
              'Sử dụng các server suy luận hiện đại (vLLM, TGI, SGLang) có hỗ trợ PagedAttention để triệt tiêu phân mảnh bộ nhớ.',
              'Lượng tử hóa KV-Cache sang FP8 hoặc INT8 (như cờ --kv-cache-dtype fp8 trong vLLM) để giảm một nửa bộ nhớ đệm mà không suy giảm chất lượng.',
              'Tận dụng kỹ thuật Prefix Caching khi nhiều người dùng dùng chung một System Prompt dài hoặc trong phiên chat nhiều lượt.',
            ],
          },
          keyTakeaways: {
            en: [
              'KV-Cache trades GPU memory for speed, preventing redundant $O(N^2)$ recalculation during autoregressive decoding.',
              'Grouped-Query Attention (GQA) drastically shrinks KV-Cache dimensions compared to traditional MHA.',
              'PagedAttention and FP8 quantization are vital for serving high-concurrency long-context LLM applications.',
            ],
            vi: [
              'KV-Cache đánh đổi bộ nhớ GPU để lấy tốc độ, loại bỏ tính toán trùng lặp bậc hai $O(N^2)$ khi sinh token.',
              'Grouped-Query Attention (GQA) giúp thu nhỏ đáng kể kích thước KV-Cache so với MHA truyền thống.',
              'PagedAttention và lượng tử hóa FP8 là chìa khóa then chốt để phục vụ nhiều người dùng với ngữ cảnh dài.',
            ],
          },
        },
      ],
    },
  ],
};
