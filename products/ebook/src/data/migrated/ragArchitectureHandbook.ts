import { Book } from '../../types';

export const RAG_ARCHITECTURE_HANDBOOK_BOOK: Book = {
  id: 'rag-architecture-handbook',
  slug: 'rag-architecture-handbook',
  title: 'RAG Architecture Handbook',
  subtitle: {
    en: 'Chunking Strategies, HNSW Vector Indices, Rerankers & Production Grounding',
    vi: 'Chiến Lược Chunking, Chỉ Mục Vector HNSW, Reranker & Kỹ Thuật Grounding Sản Xuất'
  },
  bookType: 'Handbook',
  categoryId: 'ai',
  subjectId: 'ai',
  author: '4TM Technical Board',
  role: 'AI Systems & Retrieval Engineering Group',
  level: 'Comprehensive',
  estimatedReadTime: '45 mins',
  chaptersCount: 3,
  edition: 'First Edition (2025)',
  publishedDate: '2025-02-15',
  accentColor: 'from-blue-700 to-indigo-900',
  tags: [
    'RAG',
    'Vector Search',
    'HNSW',
    'Chunking',
    'Reranking',
    'Handbook',
    'Embeddings',
    'Information Retrieval'
  ],
  description: {
    en: 'A comprehensive engineering reference on Retrieval-Augmented Generation (RAG) system architecture: document decomposition and sliding window chunking, HNSW vector graph mechanics, and context assembly mitigation for the "Lost in the Middle" phenomenon.',
    vi: 'Cẩm nang kỹ thuật toàn diện về kiến trúc hệ thống RAG (Retrieval-Augmented Generation): phân tích tài liệu và chunking cửa sổ trượt, cơ chế đồ thị vector HNSW và tái sắp xếp ngữ cảnh chống hiện tượng "Lost in the Middle".'
  },
  prerequisites: {
    en: [
      'Understanding of vector embeddings, high-dimensional cosine similarity, and LLM context windows',
      'Familiarity with Python, NumPy, and standard client-server AI architectures'
    ],
    vi: [
      'Hiểu biết về vector embedding, độ tương đồng Cosine trong không gian nhiều chiều và cửa sổ ngữ cảnh LLM',
      'Quen thuộc với Python, NumPy và kiến trúc client-server ứng dụng AI cơ bản'
    ]
  },
  outcomes: {
    en: [
      'Master document chunking with character, token, and semantic window overlap mechanics',
      'Understand Hierarchical Navigable Small World (HNSW) graph indexing and hyperparameter tuning (M, efConstruction, efSearch)',
      'Mitigate the U-shaped attention distribution ("Lost in the Middle") via cross-encoder reranking and boundary placement',
      'Design reliable production RAG retrieval pipelines that balance latency, recall, and token budget'
    ],
    vi: [
      'Làm chủ kỹ thuật chia nhỏ tài liệu theo ký tự, token và cửa sổ trượt gối đầu ngữ nghĩa',
      'Nắm vững cơ chế đánh chỉ mục đồ thị HNSW và tinh chỉnh siêu tham số (M, efConstruction, efSearch)',
      'Khắc phục hiện tượng phân bổ chú ý hình chữ U ("Lost in the Middle") bằng Cross-Encoder reranker',
      'Xây dựng pipeline RAG chuẩn sản xuất cân bằng tối ưu giữa độ trễ, độ hồi tưởng (recall) và chi phí token'
    ]
  },
  parts: [
    {
      partNumber: 1,
      romanNumeral: 'I',
      title: {
        en: 'Part I: Ingestion, Chunking & Pre-processing',
        vi: 'Phần I: Thu Nạp, Chunking & Tiền Xử Lý Tài Liệu'
      },
      description: {
        en: 'Document decomposition, token boundaries, and sliding window chunking algorithms.',
        vi: 'Phân tách tài liệu, ranh giới token và thuật toán chunking cửa sổ trượt.'
      }
    },
    {
      partNumber: 2,
      romanNumeral: 'II',
      title: {
        en: 'Part II: Vector Indices & Approximate Nearest Neighbor Search',
        vi: 'Phần II: Chỉ Mục Vector & Tìm Kiếm Lân Cận Gần Nhất'
      },
      description: {
        en: 'Multi-layer graph architectures, distance metrics, and HNSW hyperparameter trade-offs.',
        vi: 'Kiến trúc đồ thị đa tầng, thước đo khoảng cách và đánh đổi siêu tham số trong HNSW.'
      }
    },
    {
      partNumber: 3,
      romanNumeral: 'III',
      title: {
        en: 'Part III: Context Assembly, Reranking & Synthesizer Grounding',
        vi: 'Phần III: Ráp Ngữ Cảnh, Reranking & Grounding Cho Mô Hình'
      },
      description: {
        en: 'Cross-encoder scoring, prompt boundary positioning, and mitigating semantic decay.',
        vi: 'Chấm điểm bằng cross-encoder, định vị ranh giới prompt và giảm thiểu suy hao ngữ nghĩa.'
      }
    }
  ],
  chapters: [
    {
      id: 'rag-hb-ch-1',
      number: 1,
      partNumber: 1,
      partTitle: {
        en: 'Part I: Ingestion, Chunking & Pre-processing',
        vi: 'Phần I: Thu Nạp, Chunking & Tiền Xử Lý Tài Liệu'
      },
      slug: 'chunking-strategies-and-parsers',
      title: {
        en: 'Document Parsing & Semantic Chunking Strategies',
        vi: 'Phân Tích Tài Liệu & Chiến Lược Chunking Ngữ Nghĩa'
      },
      summary: {
        en: 'Fixed-size vs sliding-window chunking, token vs character splitting, and boundary preservation algorithms.',
        vi: 'Chunking kích thước cố định vs cửa sổ trượt, cắt theo token vs ký tự và thuật toán bảo toàn ranh giới câu.'
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'rag-hb-1-1',
          title: {
            en: '1. Sliding Window Chunking with Overlap Mechanics',
            vi: '1. Kỹ Thuật Chunking Cửa Sổ Trượt Với Khoảng Gối Đầu'
          },
          content: {
            en: 'Chunking is the foundational transformation in every Retrieval-Augmented Generation pipeline. Embedding models operate on finite sequence lengths (typically 512, 1024, or 8192 tokens) and average sentence representations into a fixed-dimensional vector. If a document is indexed as a single massive text block, critical facts get diluted into an indistinct semantic centroid. Conversely, splitting text blindly at fixed character offsets bisects words and shears sentences across boundaries, severing the subject from its predicate. The sliding window chunking algorithm solves this problem by defining an explicit chunk size (typically 400-800 tokens) accompanied by a mandatory overlap buffer (typically 10-20% of the chunk size). This guarantees that every sentence boundary and entity relationship is preserved intact in at least one indexed vector.',
            vi: 'Chunking là bước chuyển đổi nền tảng trong mọi hệ thống RAG. Các mô hình embedding chỉ hoạt động trên một độ dài chuỗi hữu hạn (thường là 512, 1024 hoặc 8192 token) và nén toàn bộ nội dung thành một vector có số chiều cố định. Nếu nạp nguyên một tài liệu dài vào một vector duy nhất, các chi tiết quan trọng sẽ bị pha loãng hoàn toàn vào trọng tâm ngữ nghĩa mờ nhạt. Ngược lại, nếu cắt nhỏ thô bạo theo số ký tự cố định, câu chữ sẽ bị chém đứt giữa chừng, làm tách rời chủ ngữ khỏi vị ngữ. Thuật toán chunking cửa sổ trượt (sliding window) giải quyết triệt để vấn đề này bằng cách thiết lập kích thước chunk mục tiêu (khoảng 400-800 token) kèm theo một dải gối đầu bắt buộc (overlap, khoảng 10-20% kích thước chunk). Cơ chế này đảm bảo mọi ranh giới câu và mối quan hệ thực thể đều được lưu giữ trọn vẹn trong ít nhất một vector.'
          },
          keyIdea: {
            en: 'Never split text purely by raw character counts. Always tokenize with the target embedding model\'s vocabulary and maintain a 10-20% sliding window overlap to prevent concept decapitation across chunk edges.',
            vi: 'Tuyệt đối không cắt nhỏ văn bản chỉ bằng số ký tự thô. Luôn dùng đúng tokenizer của mô hình embedding dự kiến và duy trì khoảng gối đầu 10-20% để chống đứt gãy ngữ nghĩa ở mép cắt.'
          },
          comparisonTable: {
            headers: [
              { en: 'Chunking Strategy', vi: 'Chiến Lược Chunking' },
              { en: 'Boundary Integrity', vi: 'Tính Toàn Vẹn Ranh Giới' },
              { en: 'Semantic Density', vi: 'Mật Độ Ngữ Nghĩa' },
              { en: 'Index Storage Overhead', vi: 'Độ Phình Dữ Liệu Index' }
            ],
            rows: [
              {
                en: ['Fixed-Character Split (No Overlap)', 'Poor (Cuts words & sentences mid-token)', 'Low (Fragmented thoughts)', '1.0x (Baseline)'],
                vi: ['Cắt Ký Tự Cố Định (Không Overlap)', 'Kém (Chém đứt từ và câu giữa chừng)', 'Thấp (Ý niệm bị phân mảnh)', '1.0x (Mức cơ sở)']
              },
              {
                en: ['Sliding Window with 15% Overlap', 'High (Entities preserved across boundaries)', 'High (Optimal for bi-encoders)', '1.15x (Minimal increase)'],
                vi: ['Cửa Sổ Trượt Với Gối Đầu 15%', 'Cao (Bảo toàn thực thể qua các mép cắt)', 'Cao (Tối ưu cho bi-encoder)', '1.15x (Tăng nhẹ không đáng kể)']
              },
              {
                en: ['Semantic Boundary Splitting (Paragraphs)', 'Highest (Preserves complete rhetorical units)', 'Variable (Uneven chunk sizes)', '1.0x - 1.2x'],
                vi: ['Cắt Theo Ranh Giới Ngữ Nghĩa (Đoạn Văn)', 'Tuyệt đối (Bảo tồn trọn vẹn cấu trúc lập luận)', 'Thay đổi (Kích thước chunk không đều)', '1.0x - 1.2x']
              }
            ]
          },
          codeBlock: {
            language: 'python',
            filename: 'sliding_window_chunker.py',
            explanation: {
              en: 'A production-grade Python utility that decomposes long markdown documents using recursive token-aware sliding window splitting with boundary preservation.',
              vi: 'Hàm tiện ích Python chuẩn production phân tách tài liệu markdown dài dùng cửa sổ trượt nhận biết token và bảo tồn ranh giới câu.'
            },
            code: `from typing import List
import tiktoken

def sliding_window_chunk(
    text: str,
    chunk_size_tokens: int = 500,
    overlap_tokens: int = 100,
    tokenizer_name: str = "cl100k_base"
) -> List[dict]:
    """
    Decomposes text into overlapping token windows to preserve semantic continuity.
    """
    assert overlap_tokens < chunk_size_tokens, "Overlap must be strictly smaller than chunk size"
    
    enc = tiktoken.get_encoding(tokenizer_name)
    tokens = enc.encode(text)
    
    chunks = []
    step = chunk_size_tokens - overlap_tokens
    
    for i in range(0, len(tokens), step):
        window_tokens = tokens[i : i + chunk_size_tokens]
        chunk_text = enc.decode(window_tokens)
        
        chunks.append({
            "chunk_index": len(chunks),
            "start_token": i,
            "end_token": i + len(window_tokens),
            "token_count": len(window_tokens),
            "content": chunk_text
        })
        
        # Terminate if the current window reached or exceeded the end of document
        if i + chunk_size_tokens >= len(tokens):
            break
            
    return chunks`
          },
          diagram: {
            title: {
              en: 'Sliding Window Token Overlap Architecture',
              vi: 'Kiến Trúc Cửa Sổ Trượt Gối Đầu Token'
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'Chunk 1 (Tokens 0-500)', vi: 'Chunk 1 (Token 0-500)' },
                description: {
                  en: 'Covers initial context; tokens 400-500 represent the buffer zone.',
                  vi: 'Chứa ngữ cảnh đầu; dải token 400-500 đóng vai trò vùng đệm gối đầu.'
                }
              },
              {
                stepNumber: 2,
                title: { en: 'Sliding Overlap Window', vi: 'Dải Gối Đầu Di Chuyển' },
                description: {
                  en: 'Step advances by 400 tokens; tokens 400-500 are duplicated in Chunk 2.',
                  vi: 'Bước nhảy dịch chuyển 400 token; token 400-500 được nhân bản sang Chunk 2.'
                }
              },
              {
                stepNumber: 3,
                title: { en: 'Chunk 2 (Tokens 400-900)', vi: 'Chunk 2 (Token 400-900)' },
                description: {
                  en: 'Maintains intact entity relations across the boundary with zero data loss.',
                  vi: 'Duy trì trọn vẹn quan hệ thực thể qua mép cắt mà không bị mất thông tin.'
                }
              }
            ]
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Setting overlap to zero to minimize vector database storage costs',
                vi: 'Đặt tỷ lệ overlap bằng 0 để tiết kiệm dung lượng cơ sở dữ liệu vector'
              },
              why: {
                en: 'Whenever an important fact or clause straddles the boundary between Chunk N and Chunk N+1, both chunks receive low similarity scores, causing the retrieval engine to fail completely on relevant user queries.',
                vi: 'Khi một sự thật hoặc mệnh đề quan trọng nằm đè lên ranh giới giữa Chunk N và Chunk N+1, cả hai chunk đều bị tụt điểm tương đồng, khiến hệ thống bỏ sót tài liệu liên quan.'
              },
              solution: {
                en: 'Maintain an overlap buffer of 10% to 20% of your chunk token budget.',
                vi: 'Luôn duy trì khoảng gối đầu overlap từ 10% đến 20% tổng số token của một chunk.'
              }
            }
          ],
          bestPractices: {
            en: [
              'Use the exact tokenizer of your target embedding model (e.g. tiktoken for OpenAI, HuggingFace AutoTokenizer for open-source models).',
              'Calibrate chunk size to match the informational density of the domain (300-500 tokens for technical API manuals, 600-1000 tokens for narrative literature).',
              'Preserve document hierarchy metadata (Document Title, Breadcrumbs, Section Headings) as prefix headers in each chunk.'
            ],
            vi: [
              'Dùng đúng tokenizer của mô hình embedding mục tiêu (như tiktoken cho OpenAI, AutoTokenizer cho mô hình mã nguồn mở).',
              'Hiệu chuẩn kích thước chunk phù hợp với mật độ thông tin (300-500 token cho tài liệu API, 600-1000 token cho văn bản luận đề dài).',
              'Đính kèm metadata phân cấp (Tiêu đề tài liệu, Breadcrumb, Tiêu đề mục) vào phần đầu của mỗi chunk.'
            ]
          },
          practicalScenario: {
            en: 'A legal tech platform indexed compliance contracts with a rigid 2000-character chunker with 0% overlap. During an audit, user queries asking "What is the penalty for clause 14 breach?" failed because the liability clause was severed across two chunks. Introducing a 500-token chunker with a 100-token sliding window lifted answer retrieval accuracy from 61% to 94%.',
            vi: 'Một nền tảng pháp lý nạp hợp đồng tuân thủ bằng thuật toán cắt 2000 ký tự thô với 0% overlap. Khi kiểm thử, câu hỏi "Mức phạt vi phạm điều 14 là gì?" bị trả lời sai vì điều khoản phạt bị chém đứt làm đôi qua 2 chunk. Sau khi đổi sang chunk 500 token với cửa sổ trượt gối đầu 100 token, độ chính xác truy hồi tăng vọt từ 61% lên 94%.'
          },
          keyTakeaways: {
            en: [
              'Chunk size determines semantic resolution; overlap guarantees continuity across boundaries.',
              'Token-based boundaries are mathematically superior to character-based boundaries.',
              'A 10-20% overlap strikes the optimal balance between recall resilience and storage index overhead.'
            ],
            vi: [
              'Kích thước chunk quyết định độ phân giải ngữ nghĩa; khoảng gối đầu đảm bảo tính liên tục qua mép cắt.',
              'Cắt theo token chuẩn xác về mặt toán học hơn nhiều so với việc đếm số ký tự thô.',
              'Mức gối đầu 10-20% là điểm cân bằng lý tưởng giữa khả năng truy hồi và chi phí lưu trữ vector.'
            ]
          }
        }
      ]
    },
    {
      id: 'rag-hb-ch-2',
      number: 2,
      partNumber: 2,
      partTitle: {
        en: 'Part II: Vector Indices & Approximate Nearest Neighbor Search',
        vi: 'Phần II: Chỉ Mục Vector & Tìm Kiếm Lân Cận Gần Nhất'
      },
      slug: 'vector-indexes-and-search',
      title: {
        en: 'Vector Indexes (HNSW, IVFFlat) & Similarity Metrics',
        vi: 'Chỉ Mục Vector (HNSW, IVFFlat) & Các Thước Đo Khoảng Cách'
      },
      summary: {
        en: 'Hierarchical Navigable Small World (HNSW) graph mechanics, M and efConstruction hyperparameter tuning, and Cosine vs Dot Product vs Euclidean distance.',
        vi: 'Cơ chế đồ thị HNSW đa tầng, tinh chỉnh siêu tham số M và efConstruction, so sánh khoảng cách Cosine vs Dot Product vs Euclidean.'
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'rag-hb-2-1',
          title: {
            en: '1. HNSW Graph Search Mechanics & Hyperparameter Tuning',
            vi: '1. Cơ Chế Tìm Kiếm Đồ Thị HNSW & Tinh Chỉnh Siêu Tham Số'
          },
          content: {
            en: 'In large-scale enterprise vector retrieval, comparing a query embedding sequentially against millions of stored document vectors (Brute Force / Flat search) scales with $O(N)$ computational complexity, requiring hundreds of milliseconds of compute per query. To achieve sub-5ms latencies, vector databases utilize Approximate Nearest Neighbor (ANN) indices, the premier state-of-the-art being Hierarchical Navigable Small World (HNSW) graphs. Inspired by skip-lists, HNSW organizes high-dimensional vectors across a hierarchy of graph layers. Top layers contain sparse, long-distance links for rapid macroscopic navigation across vector space; bottom layers contain dense, localized links for microscopic fine-grained clustering. Search begins at the sparse top layer via greedy routing and descends step-by-step to locate nearest neighbors in logarithmic $O(\\log N)$ time.',
            vi: 'Trong các hệ thống tìm kiếm vector quy mô lớn, việc so sánh tuần tự một vector truy vấn với hàng triệu vector tài liệu (tìm kiếm vét cạn Brute Force / Flat) có độ phức tạp tính toán $O(N)$, tốn hàng trăm mili-giây cho mỗi lượt gọi. Để đạt độ trễ dưới 5ms, các cơ sở dữ liệu vector sử dụng cấu trúc chỉ mục Approximate Nearest Neighbor (ANN), trong đó HNSW (Hierarchical Navigable Small World) là thuật toán đồ thị tiên tiến nhất. Lấy cảm hứng từ cấu trúc skip-list, HNSW tổ chức các vector trong không gian nhiều chiều thành nhiều tầng đồ thị phân cấp. Các tầng trên cùng chứa các liên kết thưa thớt với khoảng cách xa để lướt nhanh qua các vùng không gian lớn; các tầng dưới cùng chứa mạng lưới liên kết dày đặc để dò tìm cụm vi mô. Quá trình tìm kiếm bắt đầu từ tầng thưa trên cùng bằng thuật toán tham lam (greedy routing) và hạ dần xuống tầng đáy để định vị các láng giềng gần nhất trong thời gian logarit $O(\\log N)$.'
          },
          keyIdea: {
            en: 'HNSW provides O(log N) vector search via multi-layer skip-graphs. Tune M (connections per node) and efConstruction for build-time quality, and efSearch for real-time speed vs recall balance.',
            vi: 'HNSW mang lại tốc độ tìm kiếm vector O(log N) thông qua đồ thị phân cấp kiểu skip-list. Tinh chỉnh M (số liên kết mỗi node) và efConstruction cho chất lượng lúc dựng index, và efSearch để cân bằng giữa tốc độ và độ chính xác lúc truy vấn.'
          },
          comparisonTable: {
            headers: [
              { en: 'Index Type', vi: 'Loại Chỉ Mục' },
              { en: 'Query Latency', vi: 'Độ Trễ Truy Vấn' },
              { en: 'Recall Accuracy', vi: 'Độ Chính Xác Recall' },
              { en: 'RAM Memory Footprint', vi: 'Chiếm Dụng Bộ Nhớ RAM' }
            ],
            rows: [
              {
                en: ['Flat / Exact (No Index)', 'Extremely Slow ($O(N)$)', '100% (Exact Ground Truth)', 'Lowest (Raw vectors only)'],
                vi: ['Flat / Exact (Không Index)', 'Cực chậm ($O(N)$)', '100% (Chuẩn xác tuyệt đối)', 'Thấp nhất (Chỉ lưu vector thô)']
              },
              {
                en: ['IVFFlat (Inverted File Clusters)', 'Fast (~10-20ms)', 'Moderate (85-92%)', 'Low to Moderate'],
                vi: ['IVFFlat (Cụm File Đảo Ngược)', 'Nhanh (~10-20ms)', 'Vừa phải (85-92%)', 'Thấp đến Vừa phải']
              },
              {
                en: ['HNSW (Hierarchical Graphs)', 'Ultra-Fast (< 4ms)', 'Highest (> 98%)', 'High (Stores graph edges in RAM)'],
                vi: ['HNSW (Đồ Thị Phân Cấp)', 'Siêu nhanh (< 4ms)', 'Cao nhất (> 98%)', 'Cao (Lưu cạnh đồ thị trong RAM)']
              }
            ]
          },
          codeBlock: {
            language: 'python',
            filename: 'hnsw_tuning_example.py',
            explanation: {
              en: 'Demonstrates configuring production HNSW index hyperparameters in pgvector/Qdrant/Faiss for optimal recall and sub-5ms query times.',
              vi: 'Minh họa cấu hình siêu tham số đồ thị HNSW trong pgvector/Qdrant/Faiss để tối ưu hóa độ chính xác và đạt độ trễ dưới 5ms.'
            },
            code: `# Example configuration for production HNSW vector index in pgvector / PostgreSQL:
"""
-- 1. Create HNSW index with calibrated parameters:
-- M = 16 (max bidirectional links per vector node, range 16-64)
-- ef_construction = 128 (candidate queue size during index building)

CREATE INDEX ON document_embeddings 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 128);

-- 2. Tune runtime query beam search size (default is 40):
-- Setting ef_search = 100 boosts recall from 95% to 99.2% with < 2ms latency penalty.
SET hnsw.ef_search = 100;

-- 3. Execute sub-5ms Cosine Similarity search:
SELECT id, chunk_content, 1 - (embedding <=> '[0.012, -0.045, ...]') AS cosine_similarity
FROM document_embeddings
ORDER BY embedding <=> '[0.012, -0.045, ...]'
LIMIT 5;
"""`
          },
          diagram: {
            title: {
              en: 'Hierarchical Navigable Small World (HNSW) Multi-Layer Traversal',
              vi: 'Quá Trình Duyệt Đồ Thị Đa Tầng HNSW'
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'Layer 2 (Sparse Long-Range Links)', vi: 'Tầng 2 (Liên Kết Xa Thưa Thớt)' },
                description: {
                  en: 'Query enters top layer; fast greedy jumps traverse large semantic distances.',
                  vi: 'Query bắt đầu ở tầng cao nhất; nhảy bước lớn vượt qua khoảng cách ngữ nghĩa rộng.'
                }
              },
              {
                stepNumber: 2,
                title: { en: 'Layer 1 (Intermediate Clustering)', vi: 'Tầng 1 (Cụm Trung Gian)' },
                description: {
                  en: 'Descends to denser intermediate layer; narrows search to target neighborhood.',
                  vi: 'Hạ xuống tầng giữa dày hơn; thu hẹp phạm vi tìm kiếm vào vùng lân cận mục tiêu.'
                }
              },
              {
                stepNumber: 3,
                title: { en: 'Layer 0 (Dense Bottom Mesh)', vi: 'Tầng 0 (Lưới Đáy Dày Đặc)' },
                description: {
                  en: 'Evaluates nearest neighbors within candidate beam (efSearch) to return top-k matches.',
                  vi: 'Đánh giá các node lân cận trong dải ứng viên (efSearch) để trả về top-k chính xác.'
                }
              }
            ]
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Leaving efSearch at default low values when evaluating complex semantic queries',
                vi: 'Để tham số efSearch ở mức mặc định quá thấp khi xử lý các truy vấn phức tạp'
              },
              why: {
                en: 'A low efSearch (e.g. 10) causes the beam search to terminate early in a local optimum, missing the true nearest neighbors by 10-15%.',
                vi: 'Giá trị efSearch quá nhỏ (như 10) khiến thuật toán beam search dừng sớm tại điểm tối ưu cục bộ, bỏ sót 10-15% vector gần nhất.'
              },
              solution: {
                en: 'Calibrate efSearch between 64 and 128 in production; measure recall vs ground-truth Flat search.',
                vi: 'Thiết lập efSearch trong khoảng 64 đến 128 trong môi trường sản xuất; đo lường độ hồi tưởng so với tìm kiếm Flat.'
              }
            }
          ],
          bestPractices: {
            en: [
              'Normalize all vectors to unit length (L2 norm = 1.0) so Cosine Distance equals simple Dot Product, speeding up distance computations by 2x.',
              'Set M = 16 for standard 768-1536 dimension embeddings; increase M to 32 or 64 for high-dimensional or high-precision workloads.',
              'Ensure your database server has sufficient RAM to keep the entire HNSW graph index in memory, avoiding slow disk swapping.'
            ],
            vi: [
              'Chuẩn hóa tất cả vector về độ dài đơn vị (L2 norm = 1.0) để khoảng cách Cosine tương đương phép nhân vô hướng Dot Product, tăng tốc tính toán gấp 2 lần.',
              'Đặt M = 16 cho các vector kích thước 768-1536 chiều; nâng M lên 32 hoặc 64 cho các tác vụ đòi hỏi độ chính xác cao.',
              'Đảm bảo máy chủ có đủ dung lượng RAM để chứa toàn bộ chỉ mục đồ thị HNSW, tránh tình trạng tràn bộ nhớ ra đĩa cứng.'
            ]
          },
          practicalScenario: {
            en: 'An enterprise knowledge base with 2.5 million document chunks suffered 450ms query times using IVFFlat. During concurrent traffic bursts, latency spiked past 3 seconds. Migrating to HNSW with M=16, efConstruction=128, and efSearch=80 cut median search latency to 3.2ms while increasing top-5 retrieval recall from 88% to 98.4%.',
            vi: 'Một kho tri thức doanh nghiệp với 2.5 triệu chunk tài liệu bị trễ tới 450ms khi dùng IVFFlat. Khi có nhiều người dùng đồng thời, độ trễ vọt lên hơn 3 giây. Sau khi chuyển sang HNSW với M=16, efConstruction=128 và efSearch=80, độ trễ trung vị giảm xuống chỉ còn 3.2ms đồng thời độ chính xác recall top-5 tăng từ 88% lên 98.4%.'
          },
          keyTakeaways: {
            en: [
              'HNSW transforms linear $O(N)$ vector scanning into logarithmic $O(\\log N)$ hierarchical traversal.',
              'Tuning M controls index density and memory; tuning efSearch controls query precision and latency.',
              'Keeping HNSW graphs memory-resident is essential for real-time production RAG systems.'
            ],
            vi: [
              'HNSW biến quá trình quét vector tuyến tính $O(N)$ thành duyệt đồ thị phân cấp với thời gian logarit $O(\\log N)$.',
              'Tham số M quyết định mật độ liên kết và dung lượng RAM; efSearch quyết định độ chính xác và tốc độ truy vấn.',
              'Giữ toàn bộ đồ thị HNSW thường trú trên RAM là điều kiện tiên quyết cho hệ thống RAG thời gian thực.'
            ]
          }
        }
      ]
    },
    {
      id: 'rag-hb-ch-3',
      number: 3,
      partNumber: 3,
      partTitle: {
        en: 'Part III: Context Assembly, Reranking & Synthesizer Grounding',
        vi: 'Phần III: Ráp Ngữ Cảnh, Reranking & Grounding Cho Mô Hình'
      },
      slug: 'context-assembly-and-reranking',
      title: {
        en: 'Context Assembly, Reranking & Prompt Injection',
        vi: 'Ráp Ngữ Cảnh, Reranking & Định Vị Thông Tin Trong Prompt'
      },
      summary: {
        en: 'The "Lost in the Middle" cognitive phenomenon in transformer attention heads, Cross-Encoder reranking mechanics, and context reordering algorithms.',
        vi: 'Hiện tượng "Lost in the Middle" trong cơ chế chú ý của Transformer, hoạt động của Cross-Encoder reranker và thuật toán tái sắp xếp ngữ cảnh.'
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'rag-hb-3-1',
          title: {
            en: '1. The "Lost in the Middle" Phenomenon & Context Reordering',
            vi: '1. Hiện Tượng "Lost in the Middle" & Tái Sắp Xếp Vị Trí Ngữ Cảnh'
          },
          content: {
            en: 'Empirical research across transformer Large Language Models reveals that an LLM\'s ability to retrieve and synthesize information from its context window is not uniform. Due to the causal attention mechanisms and positional encodings employed in modern architectures, models exhibit a pronounced "U-shaped" attention distribution curve. Information placed at the absolute beginning (primacy effect) and at the absolute end (recency effect) of the prompt context is retrieved with high fidelity. In contrast, information located in the middle of a multi-document prompt context suffers severe retrieval degradation—frequently dropping below 50% accuracy even in models with 128k or 1M context windows. In a production RAG pipeline, feeding top-retrieved documents in naive descending score order places the 3rd and 4th most relevant chunks directly into the attention blind-spot. We overcome this failure mode using two complementary techniques: Cross-Encoder Reranking to distill retrieved candidates down to the top 3-5 gems, and Alternating Edge Reordering to position the highest-scoring chunks at the top and bottom boundaries of the prompt.',
            vi: 'Nghiên cứu thực nghiệm trên các mô hình Transformer chỉ ra rằng khả năng đọc hiểu và trích xuất thông tin từ cửa sổ ngữ cảnh của LLM không hề đồng đều trên toàn bộ văn bản. Do cơ chế chú ý nhân quả (causal attention) và mã hóa vị trí (positional encoding), các mô hình biểu hiện đường cong phân bổ chú ý hình chữ U rất rõ rệt. Thông tin nằm ở đầu văn bản (hiệu ứng ưu tiên - primacy effect) và cuối văn bản (hiệu ứng mới nhất - recency effect) được mô hình ghi nhớ và trích dẫn với độ chính xác rất cao. Ngược lại, những tài liệu bị kẹp ở giữa dải ngữ cảnh dài thường xuyên bị bỏ qua—độ chính xác trích xuất rớt xuống dưới 50% ngay cả trên các mô hình có cửa sổ ngữ cảnh 128k hay 1M token. Trong hệ thống RAG thực tế, nếu nhồi các tài liệu tìm được theo thứ tự điểm số giảm dần từ trên xuống dưới, bạn đang vô tình ném những tài liệu quan trọng hạng 3 và 4 vào đúng "điểm mù chú ý" của AI. Chúng ta khắc phục lỗi này bằng hai giải pháp kết hợp: dùng Cross-Encoder Reranker để sàng lọc gắt gao giữ lại top 3-5 tài liệu tinh túy nhất, và thuật toán Tái Sắp Xếp Xen Kẽ Ra Mép (Alternating Edge Reordering) để đẩy các tài liệu điểm cao nhất ra hai đầu biên của prompt.'
          },
          keyIdea: {
            en: 'LLM attention follows a U-shaped curve: items at the start and end of the context are prioritized, while items in the middle suffer severe recall decay. Use a Cross-Encoder reranker to filter out noise, and place top-scoring chunks at the outer boundaries of the prompt.',
            vi: 'Cơ chế chú ý của LLM tuân theo đường cong chữ U: thông tin ở đầu và cuối prompt được ưu tiên tối đa, trong khi phần giữa bị suy hao trầm trọng. Hãy dùng Cross-Encoder reranker để lọc bỏ tạp âm và đẩy các chunk điểm cao nhất ra hai mép ngoài của prompt.'
          },
          comparisonTable: {
            headers: [
              { en: 'Context Ordering Strategy', vi: 'Chiến Lược Sắp Xếp Ngữ Cảnh' },
              { en: 'Middle Information Recall', vi: 'Độ Nhớ Thông Tin Ở Giữa' },
              { en: 'Hallucination Vulnerability', vi: 'Nguy Cơ Ảo Giác (Hallucination)' },
              { en: 'Pipeline Complexity', vi: 'Độ Phức Tạp Triển Khai' }
            ],
            rows: [
              {
                en: ['Naive Descending Sort (1st at top, 10th at bottom)', 'Poor (< 45% on middle chunks)', 'High (Model ignores middle evidence)', 'Trivial'],
                vi: ['Xếp Giảm Dần Đơn Giản (Thứ 1 ở đầu, thứ 10 ở đáy)', 'Kém (< 45% với các chunk ở giữa)', 'Cao (Mô hình bỏ sót bằng chứng ở giữa)', 'Cực đơn giản']
              },
              {
                en: ['Alternating Edge Reordering ([1, 3, 5, ..., 4, 2])', 'High (> 88% overall recall)', 'Low (Puts top evidence in high-attention zones)', 'Low (Simple array sort)']
              ,
                vi: ['Xếp Xen Kẽ Ra Mép ([1, 3, 5, ..., 4, 2])', 'Cao (> 88% độ nhớ tổng thể)', 'Thấp (Đẩy bằng chứng tốt nhất vào vùng chú ý cao)', 'Thấp (Chỉ cần hàm đảo mảng)']
              },
              {
                en: ['Two-Stage: Bi-Encoder + Cross-Encoder Reranker', 'Highest (> 96% precision)', 'Lowest (Irrelevant distractors eliminated)', 'Moderate (Adds ~40ms reranker latency)'],
                vi: ['Hai Tầng: Bi-Encoder + Cross-Encoder Reranker', 'Cao nhất (> 96% độ chính xác)', 'Thấp nhất (Triệt tiêu toàn bộ tài liệu gây nhiễu)', 'Vừa phải (Tốn thêm ~40ms chạy reranker)']
              }
            ]
          },
          codeBlock: {
            language: 'python',
            filename: 'context_reorderer.py',
            explanation: {
              en: 'Implements the alternating boundary placement algorithm to distribute the highest-relevance retrieved documents into the highest-attention zones of the context window.',
              vi: 'Triển khai thuật toán sắp xếp tài liệu xen kẽ ra hai biên để phân bổ các tài liệu điểm cao nhất vào vùng chú ý mạnh nhất của cửa sổ ngữ cảnh.'
            },
            code: `from typing import List

def reorder_context_for_attention(documents: List[dict]) -> List[dict]:
    """
    Combats the 'Lost in the Middle' effect by distributing the highest-ranked
    documents to the start and end of the assembled context window.
    Input: documents sorted in descending order of relevance score [1, 2, 3, 4, 5, 6, 7]
    Output: reordered list placing best documents at extremities [1, 3, 5, 7, 6, 4, 2]
    """
    if len(documents) <= 2:
        return documents
        
    reordered = []
    # Place odd-indexed ranks at the beginning (1st, 3rd, 5th...)
    # Place even-indexed ranks at the end in reverse order (...6th, 4th, 2nd)
    left_side = []
    right_side = []
    
    for idx, doc in enumerate(documents):
        if idx % 2 == 0:
            left_side.append(doc)
        else:
            right_side.insert(0, doc)
            
    return left_side + right_side

# Example test:
# Input ranks:  [Rank 1, Rank 2, Rank 3, Rank 4, Rank 5]
# Output ranks: [Rank 1, Rank 3, Rank 5, Rank 4, Rank 2]
# Notice: Rank 1 is at the very beginning; Rank 2 is at the very end!`
          },
          diagram: {
            title: {
              en: 'Transformer U-Shaped Attention Curve & Edge Reordering',
              vi: 'Đường Cong Chú Ý Chữ U Trong Transformer & Phân Bổ Mép'
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'Primacy Zone (Top of Prompt)', vi: 'Vùng Ưu Tiên (Đầu Prompt)' },
                description: {
                  en: 'Rank 1 document positioned here; attention weight is maximal (~95% recall).',
                  vi: 'Tài liệu Hạng 1 đặt tại đây; trọng số chú ý đạt mức tối đa (~95% recall).'
                }
              },
              {
                stepNumber: 2,
                title: { en: 'Middle Dip (Cognitive Blind-Spot)', vi: 'Vùng Đáy Giữa (Điểm Mù Chú Ý)' },
                description: {
                  en: 'Attention drops substantially; lower-ranked supporting context resides here.',
                  vi: 'Mức độ chú ý giảm sút rõ rệt; chỉ nên chứa các tài liệu bổ trợ điểm thấp hơn.'
                }
              },
              {
                stepNumber: 3,
                title: { en: 'Recency Zone (Bottom of Prompt)', vi: 'Vùng Mới Nhất (Đáy Prompt)' },
                description: {
                  en: 'Rank 2 document positioned here immediately before the final user query.',
                  vi: 'Tài liệu Hạng 2 đặt tại đây ngay trước câu hỏi chốt của người dùng.'
                }
              }
            ]
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Stuffing 20+ retrieved documents into the context window simply because the model boasts a large context window',
                vi: 'Nhồi hơn 20 tài liệu tìm được vào context window chỉ vì mô hình quảng cáo cửa sổ ngữ cảnh lớn'
              },
              why: {
                en: 'Irrelevant and marginally related chunks act as "distractors", degrading synthesis quality and introducing hallucinations.',
                vi: 'Các đoạn văn ít liên quan hoạt động như những kẻ gây nhiễu, làm giảm chất lượng tổng hợp và kích hoạt ảo giác.'
              },
              solution: {
                en: 'Use a Cross-Encoder Reranker (such as BGE-Reranker or Cohere Rerank) to aggressively truncate candidates down to the Top 3 to 5 highest-confidence chunks.',
                vi: 'Sử dụng Cross-Encoder Reranker (như BGE-Reranker hoặc Cohere) để chắt lọc gắt gao giữ lại Top 3 đến 5 đoạn văn đắt giá nhất.'
              }
            }
          ],
          bestPractices: {
            en: [
              'Deploy a two-stage retrieval pipeline: Bi-Encoder (dense search) retrieves Top-50 candidates; Cross-Encoder reranks down to Top-5.',
              'Apply alternating edge reordering before injecting context chunks into the prompt template.',
              'Place the user query and core instruction at the very end of the prompt to maximize recency attention.'
            ],
            vi: [
              'Triển khai pipeline truy hồi 2 tầng: Bi-Encoder (tìm kiếm vector) lấy Top-50 ứng viên; Cross-Encoder rerank lọc lại Top-5.',
              'Áp dụng thuật toán xếp xen kẽ ra hai mép trước khi đưa các chunk vào mẫu prompt.',
              'Đặt câu hỏi của người dùng và chỉ thị trả lời ở vị trí cuối cùng của prompt để tận dụng hiệu ứng recency.'
            ]
          },
          practicalScenario: {
            en: 'A medical diagnostic QA assistant supplied doctors with clinical trials. When feeding 10 retrieved studies in sequential order, the model missed a critical counter-indication mentioned in study #4. After implementing a Cross-Encoder to filter down to 4 studies and applying edge reordering, the model accurately cited the counter-indication in 100% of benchmark audit cases.',
            vi: 'Một trợ lý tra cứu chẩn đoán y khoa cung cấp tài liệu thử nghiệm lâm sàng cho bác sĩ. Khi nhồi 10 nghiên cứu theo thứ tự tuần tự, AI đã bỏ qua một chống chỉ định quan trọng nằm ở tài liệu thứ 4. Sau khi đưa vào Cross-Encoder để rút gọn còn 4 tài liệu đắt nhất và áp dụng thuật toán phân bổ hai mép, mô hình đã trích dẫn chính xác chống chỉ định trong 100% các ca kiểm định.'
          },
          keyTakeaways: {
            en: [
              'Transformer attention is inherently non-uniform across the context window.',
              'Never feed raw unranked or large collections of chunks blindly to the LLM.',
              'Two-stage reranking and boundary placement guarantee that critical evidence is placed where the model pays maximum attention.'
            ],
            vi: [
              'Cơ chế chú ý của mô hình Transformer vốn dĩ không phân bổ đồng đều trên toàn bộ văn bản.',
              'Không bao giờ nhồi bừa bãi một danh sách dài các chunk tài liệu thô vào LLM.',
              'Rerank hai tầng và sắp xếp ra hai biên đảm bảo bằng chứng cốt tử luôn nằm ở vị trí mô hình tập trung chú ý cao nhất.'
            ]
          }
        }
      ]
    }
  ],
  glossary: [
    {
      term: 'Chunking',
      vietnameseTerm: 'Phân đoạn văn bản',
      definition: {
        en: 'The process of breaking down large documents into smaller, coherent text segments suitable for embedding models.',
        vi: 'Quá trình phân tách các tài liệu dài thành các đoạn văn nhỏ có nghĩa, phù hợp với giới hạn độ dài của mô hình embedding.'
      },
      relatedChapter: 1
    },
    {
      term: 'Sliding Window Overlap',
      vietnameseTerm: 'Cửa sổ trượt gối đầu',
      definition: {
        en: 'A chunking strategy where successive text segments share a small percentage of duplicate tokens across boundaries to preserve continuity.',
        vi: 'Chiến lược phân đoạn trong đó các đoạn văn bản kế tiếp nhau dùng chung một tỷ lệ token nhất định ở mép cắt để duy trì ngữ cảnh liên tục.'
      },
      relatedChapter: 1
    },
    {
      term: 'HNSW',
      vietnameseTerm: 'Đồ thị HNSW (Hierarchical Navigable Small World)',
      definition: {
        en: 'A state-of-the-art graph-based Approximate Nearest Neighbor (ANN) indexing algorithm providing logarithmic search times in high-dimensional vector spaces.',
        vi: 'Thuật toán đồ thị đánh chỉ mục tìm kiếm lân cận gần nhất (ANN) tiên tiến nhất hiện nay, cung cấp tốc độ tìm kiếm logarit trong không gian vector nhiều chiều.'
      },
      relatedChapter: 2
    },
    {
      term: 'Cosine Similarity',
      vietnameseTerm: 'Độ tương đồng Cosine',
      definition: {
        en: 'A metric measuring the cosine of the angle between two multi-dimensional vectors, evaluating directional semantic orientation independent of vector magnitude.',
        vi: 'Thước đo cos góc giữa hai vector nhiều chiều, đánh giá mức độ tương đồng về hướng ngữ nghĩa bất kể độ dài độ lớn của vector.'
      },
      relatedChapter: 2
    },
    {
      term: 'Cross-Encoder Reranker',
      vietnameseTerm: 'Mô hình Reranker Cross-Encoder',
      definition: {
        en: 'A deep transformer neural network that jointly encodes the query and candidate document together, computing all-to-all cross-attention for superior relevance scoring.',
        vi: 'Mạng nơ-ron Transformer mã hóa đồng thời cả câu hỏi và tài liệu ứng viên để tính ma trận chú ý chéo toàn phần, mang lại điểm số liên quan chính xác vượt trội.'
      },
      relatedChapter: 3
    },
    {
      term: 'Bi-Encoder',
      vietnameseTerm: 'Mô hình Bi-Encoder',
      definition: {
        en: 'An embedding architecture that encodes queries and documents independently into vectors, enabling ultra-fast vector index lookups at the expense of deep interaction attention.',
        vi: 'Kiến trúc mô hình mã hóa độc lập câu hỏi và tài liệu thành các vector riêng biệt, cho phép tra cứu siêu nhanh trên chỉ mục vector nhưng thiếu tương tác chú ý sâu.'
      },
      relatedChapter: 2
    },
    {
      term: 'Lost in the Middle',
      vietnameseTerm: 'Hiện tượng Lost in the Middle',
      definition: {
        en: 'The empirical phenomenon where LLM attention degrades significantly on information located in the center of long input contexts compared to the beginning or end.',
        vi: 'Hiện tượng thực nghiệm khi mức độ chú ý của LLM bị suy giảm nghiêm trọng ở phần thông tin nằm giữa văn bản ngữ cảnh dài so với phần đầu hoặc cuối.'
      },
      relatedChapter: 3
    },
    {
      term: 'Reciprocal Rank Fusion (RRF)',
      vietnameseTerm: 'Hợp nhất thứ hạng đối ứng (RRF)',
      definition: {
        en: 'An algorithmic technique combining rank positions from multiple distinct retrieval engines without requiring calibrated numerical score normalization.',
        vi: 'Thuật toán kết hợp vị trí thứ hạng từ nhiều công cụ tìm kiếm khác nhau mà không cần chuẩn hóa thang điểm số học phức tạp.'
      },
      relatedChapter: 2
    },
    {
      term: 'Grounding',
      vietnameseTerm: 'Neo giữ thực tế (Grounding)',
      definition: {
        en: 'Constraining generative LLM completions strictly to verified evidence provided in the retrieved prompt context, eliminating speculative hallucinations.',
        vi: 'Kỹ thuật ràng buộc câu trả lời của LLM phải bám sát tuyệt đối vào các bằng chứng được cung cấp trong ngữ cảnh truy xuất, triệt tiêu ảo giác.'
      },
      relatedChapter: 3
    },
    {
      term: 'Vector Quantization',
      vietnameseTerm: 'Lượng tử hóa vector',
      definition: {
        en: 'Compressing full-precision float32 vector components into low-bit representations (int8 or binary) to slash RAM memory requirements with minimal recall loss.',
        vi: 'Kỹ thuật nén các thành phần vector float32 thành biểu diễn số nguyên ít bit hơn (int8 hoặc nhị phân) để giảm dung lượng RAM mà chỉ làm giảm rất ít độ chính xác.'
      },
      relatedChapter: 2
    }
  ],
  furtherReading: [
    {
      title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
      authorOrSource: 'Patrick Lewis et al. (Meta AI / NeurIPS 2020)',
      year: '2020',
      description: {
        en: 'The seminal academic research paper formalizing end-to-end RAG architecture with dense vector retrieval and seq2seq generative synthesis.',
        vi: 'Bài báo nghiên cứu học thuật nền tảng chính thức hóa kiến trúc RAG tích hợp truy hồi vector và mô hình sinh ngôn ngữ chuỗi.'
      }
    },
    {
      title: 'Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs',
      authorOrSource: 'Yury Malkov & D. Yashunin (IEEE TPAMI)',
      year: '2018',
      description: {
        en: 'The original mathematical and algorithmic specification of the HNSW multi-layer graph data structure.',
        vi: 'Tài liệu kỹ thuật và toán học gốc đặc tả cấu trúc dữ liệu đồ thị phân cấp đa tầng HNSW.'
      }
    },
    {
      title: 'Lost in the Middle: How Language Models Use Long Contexts',
      authorOrSource: 'Nelson F. Liu et al. (Stanford University & Berkeley)',
      year: '2023',
      description: {
        en: 'Foundational study proving that LLM retrieval accuracy degrades in the center of prompt context windows, establishing the U-shaped attention curve.',
        vi: 'Nghiên cứu nền tảng chứng minh độ chính xác truy hồi của LLM bị suy thoái ở giữa cửa sổ ngữ cảnh, xác lập đường cong chú ý chữ U.'
      }
    },
    {
      title: 'Pinecone Vector Indexing Engineering Whitepaper',
      authorOrSource: 'Pinecone Engineering Team',
      year: '2024',
      description: {
        en: 'A comprehensive production engineering reference detailing real-world HNSW scaling, quantization techniques, and hybrid index architectures.',
        vi: 'Bạch thư kỹ thuật chuyên sâu về mở rộng quy mô HNSW thực tế, kỹ thuật lượng tử hóa và kiến trúc chỉ mục lai trong sản xuất.'
      }
    }
  ]
};
