import { Book } from '../../types';

export const RAG_PATTERNS_RECIPES_BOOK: Book = {
  id: 'rag-patterns-recipes',
  slug: 'rag-patterns-recipes',
  title: 'RAG Retrieval Patterns & Recipes',
  subtitle: {
    en: 'Hybrid Search, Reciprocal Rank Fusion, HyDE & Parent-Child Chunking',
    vi: 'Tìm Kiếm Lai Hybrid, Hợp Nhất Thứ Hạng RRF, HyDE & Chunking Cha-Con'
  },
  bookType: 'Patterns / Recipes',
  categoryId: 'ai',
  subjectId: 'ai',
  author: '4TM Technical Board',
  role: 'Information Retrieval & AI Systems Engineering Group',
  level: 'Intermediate to Advanced',
  estimatedReadTime: '30 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-17',
  accentColor: 'from-cyan-600 to-blue-800',
  tags: [
    'RAG Patterns',
    'Hybrid Search',
    'RRF',
    'HyDE',
    'Parent-Child',
    'Recipes',
    'BM25'
  ],
  description: {
    en: 'Production-tested architectural recipes for advanced RAG retrieval: combining dense semantic vectors with sparse BM25 keyword search via Reciprocal Rank Fusion (RRF), and implementing Hypothetical Document Embeddings (HyDE) with Parent-Child chunk hierarchies.',
    vi: 'Các công thức kiến trúc thực chiến cho hệ thống RAG nâng cao: kết hợp vector ngữ nghĩa với tìm kiếm từ khóa BM25 qua thuật toán RRF, và triển khai HyDE cùng phân cấp chunking Cha-Con.'
  },
  prerequisites: {
    en: [
      'Understanding of standard dense vector embeddings and similarity search',
      'Familiarity with sparse lexical search (BM25) and basic RAG pipelines'
    ],
    vi: [
      'Hiểu biết về vector embedding ngữ nghĩa và tìm kiếm tương đồng',
      'Quen thuộc với tìm kiếm từ khóa thưa (BM25) và pipeline RAG cơ bản'
    ]
  },
  outcomes: {
    en: [
      'Implement robust Hybrid Search combining BM25 keyword matching and Dense Vectors using Reciprocal Rank Fusion (RRF)',
      'Overcome the vocabulary mismatch problem with Hypothetical Document Embeddings (HyDE)',
      'Decouple search precision from synthesis context using Parent-Child chunk retrievers',
      'Optimize retrieval latency and recall trade-offs across enterprise knowledge bases'
    ],
    vi: [
      'Triển khai tìm kiếm lai Hybrid kết hợp từ khóa BM25 và Dense Vector bằng thuật toán RRF',
      'Khắc phục triệt để hiện tượng lệch từ vựng bằng Hypothetical Document Embeddings (HyDE)',
      'Tách rời độ chính xác tìm kiếm khỏi ngữ cảnh tổng hợp bằng mô hình chunking Cha-Con',
      'Tối ưu hóa sự đánh đổi giữa độ trễ và độ hồi tưởng trên kho tri thức doanh nghiệp'
    ]
  },
  chapters: [
    {
      id: 'rpr-ch-1',
      number: 1,
      slug: 'hybrid-search-rrf-recipe',
      title: {
        en: 'Hybrid Search with Reciprocal Rank Fusion (RRF)',
        vi: 'Tìm Kiếm Lai Hybrid Với Hợp Nhất Thứ Hạng RRF'
      },
      summary: {
        en: 'Combining dense semantic vectors and sparse BM25 keyword search to eliminate exact-code misses without score calibration distortion.',
        vi: 'Kết hợp vector ngữ nghĩa và tìm kiếm từ khóa BM25 để không bị trượt mã kỹ thuật mà không làm méo thang điểm.'
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'rpr-1-1',
          title: {
            en: '1. Reciprocal Rank Fusion (RRF) & Hybrid Search Mechanics',
            vi: '1. Cơ Chế Tìm Kiếm Lai Hybrid & Hợp Nhất Thứ Hạng RRF'
          },
          content: {
            en: 'A persistent weakness of pure dense vector search in production RAG systems is the "Lexical Gap": dense embedding models represent generalized semantic intent exceptionally well, but frequently fail when users search for specific alphanumeric codes, serial numbers, error codes (e.g. `ERR_SSL_PROTOCOL_ERROR`), or exact API function names (e.g. `pthread_mutex_lock`). Conversely, sparse keyword search engines (like BM25 or Elasticsearch) match exact terminology flawlessly, but fail completely when queries express synonyms or abstract concepts. Attempting to combine them by simply adding raw scores ($S = S_{dense} + S_{bm25}$) fails because BM25 scores are unbounded positive numbers ($0$ to $+\\infty$) while cosine similarity is bounded ($-1$ to $+1$), creating massive score calibration distortion. The Reciprocal Rank Fusion (RRF) recipe resolves this fundamentally by ignoring raw scores entirely and fusing results based purely on ordinal rank positions: $RRF(d) = \\sum_{m \\in M} \\frac{1}{k + r_m(d)}$.',
            vi: 'Điểm yếu cố hữu của tìm kiếm thuần vector trong các hệ thống RAG thực tế là "khoảng trống từ vựng" (Lexical Gap): các mô hình embedding ngữ nghĩa rất giỏi nắm bắt ý định khái quát, nhưng lại thường xuyên thất bại khi người dùng tra cứu các chuỗi ký tự cụ thể, số serial, mã lỗi kỹ thuật (như `ERR_SSL_PROTOCOL_ERROR`) hay tên hàm API chính xác (như `pthread_mutex_lock`). Ngược lại, các công cụ tìm kiếm từ khóa thưa (như BM25 hay Elasticsearch) khớp chính xác từng từ khóa nhưng hoàn toàn bất lực khi người dùng dùng từ đồng nghĩa hoặc câu hỏi trừu tượng. Việc cố gắng kết hợp hai phương pháp bằng cách cộng điểm thô ($S = S_{dense} + S_{bm25}$) sẽ bị méo mó nghiêm trọng vì điểm BM25 là số dương vô hạn ($0$ đến $+\\infty$) trong khi khoảng cách Cosine nằm trong đoạn giới hạn ($-1$ đến $+1$). Thuật toán Hợp Nhất Thứ Hạng Đối Ứng (RRF - Reciprocal Rank Fusion) giải quyết triệt để vấn đề này bằng cách bỏ qua thang điểm thô và kết hợp dựa trên vị trí xếp hạng thứ tự: $RRF(d) = \\sum_{m \\in M} \\frac{1}{k + r_m(d)}$.'
          },
          keyIdea: {
            en: 'Never add raw BM25 scores directly to dense vector cosine similarity. Use Reciprocal Rank Fusion (RRF) with smoothing parameter k=60 to fuse lexical and semantic search results robustly without calibration.',
            vi: 'Tuyệt đối không cộng trực tiếp điểm số BM25 thô với điểm Cosine của vector. Hãy dùng thuật toán RRF với tham số làm mịn k=60 để hợp nhất kết quả tìm kiếm từ khóa và ngữ nghĩa mà không cần chuẩn hóa điểm.'
          },
          patternDetails: {
            problem: {
              en: 'Pure dense vector search misses exact technical codes, IDs, and domain acronyms, while pure keyword search misses conceptual synonyms; combining them with linear score addition causes distortion.',
              vi: 'Tìm kiếm thuần vector bỏ sót các mã lỗi, ID và thuật ngữ viết tắt chính xác, trong khi tìm kiếm từ khóa bỏ sót từ đồng nghĩa; cộng điểm số học thô dẫn đến sai lệch kết quả.'
            },
            context: {
              en: 'Enterprise technical documentation search, customer support ticket retrieval, legal contract discovery, and e-commerce catalogs with mixed SKU numbers and natural language queries.',
              vi: 'Cổng tra cứu tài liệu kỹ thuật doanh nghiệp, xử lý ticket hỗ trợ kỹ thuật, rà soát hợp đồng pháp lý và danh mục thương mại điện tử chứa lẫn lộn mã SKU và câu hỏi đàm thoại.'
            },
            solutionOverview: {
              en: 'Execute BM25 keyword search and Dense Vector similarity search concurrently, extract the top candidates from each stream, and calculate unified RRF scores using $1 / (k + rank)$ with $k=60$.',
              vi: 'Chạy song song tìm kiếm từ khóa BM25 và tìm kiếm vector ngữ nghĩa, lấy top các ứng viên từ mỗi luồng và tính điểm xếp hạng RRF thống nhất theo công thức $1 / (k + rank)$ với $k=60$.'
            },
            architectureDiagram: {
              title: {
                en: 'Hybrid Search & Reciprocal Rank Fusion (RRF) Pipeline',
                vi: 'Pipeline Tìm Kiếm Lai Hybrid & Hợp Nhất Thứ Hạng RRF'
              },
              steps: [
                {
                  stepNumber: 1,
                  title: { en: 'Parallel Retrieval', vi: 'Truy Vấn Song Song' },
                  description: {
                    en: 'Query is sent simultaneously to BM25 sparse index and HNSW dense vector index.',
                    vi: 'Query được gửi đồng thời tới chỉ mục từ khóa BM25 và chỉ mục vector HNSW.'
                  }
                },
                {
                  stepNumber: 2,
                  title: { en: 'Ordinal Rank Mapping', vi: 'Ánh Xạ Thứ Hạng' },
                  description: {
                    en: 'Top 60 candidates from both engines are scored solely by their rank position r.',
                    vi: 'Top 60 ứng viên từ cả hai bộ máy được chấm điểm chỉ dựa trên vị trí thứ tự r.'
                  }
                },
                {
                  stepNumber: 3,
                  title: { en: 'RRF Score Summation', vi: 'Cộng Điểm RRF' },
                  description: {
                    en: 'Engine computes 1/(60 + r_bm25) + 1/(60 + r_dense) to produce final unified ranking.',
                    vi: 'Hệ thống tính 1/(60 + r_bm25) + 1/(60 + r_dense) để tạo danh sách xếp hạng cuối cùng.'
                  }
                }
              ]
            },
            implementation: {
              language: 'python',
              filename: 'hybrid_rrf_search.py',
              code: `from collections import defaultdict
from typing import List, Dict, Any

def reciprocal_rank_fusion(
    dense_results: List[Dict[str, Any]], 
    sparse_results: List[Dict[str, Any]], 
    k: int = 60,
    top_n: int = 5
) -> List[Dict[str, Any]]:
    """
    Fuses rankings from dense vector search and sparse BM25 search using RRF.
    Formula: RRF_score(d) = sum(1 / (k + rank_i(d)))
    """
    rrf_scores = defaultdict(float)
    doc_payloads = {}

    # 1. Score dense vector search candidates by rank (1-indexed)
    for rank, doc in enumerate(dense_results, start=1):
        doc_id = doc["id"]
        rrf_scores[doc_id] += 1.0 / (k + rank)
        if doc_id not in doc_payloads:
            doc_payloads[doc_id] = doc

    # 2. Score sparse BM25 search candidates by rank (1-indexed)
    for rank, doc in enumerate(sparse_results, start=1):
        doc_id = doc["id"]
        rrf_scores[doc_id] += 1.0 / (k + rank)
        if doc_id not in doc_payloads:
            doc_payloads[doc_id] = doc

    # 3. Sort merged candidates by descending combined RRF score
    sorted_doc_ids = sorted(
        rrf_scores.keys(), 
        key=lambda did: rrf_scores[did], 
        reverse=True
    )

    # 4. Construct final top-N result list
    fused_results = []
    for did in sorted_doc_ids[:top_n]:
        payload = doc_payloads[did].copy()
        payload["rrf_score"] = round(rrf_scores[did], 5)
        fused_results.append(payload)

    return fused_results`
            },
            explanation: {
              en: 'RRF works by mapping each document\'s rank $r$ to a monotonic score $1 / (k + r)$. If a document finishes 1st in dense search and 2nd in BM25, its score is $\\frac{1}{60 + 1} + \\frac{1}{60 + 2} \\approx 0.01639 + 0.01612 = 0.03251$. The smoothing constant $k$ (empirically set to 60) prevents an outlier result that placed 1st in one search system from completely dominating a document that finished 2nd and 3rd across both systems. Because RRF operates strictly on ordinal integers rather than floating point scores, it is completely immune to differences in scale between vector cosine distances and BM25 relevance scores.',
              vi: 'Thuật toán RRF hoạt động bằng cách ánh xạ thứ hạng $r$ của mỗi tài liệu thành một số đơn điệu $1 / (k + r)$. Nếu một tài liệu đứng thứ 1 trong tìm kiếm vector và đứng thứ 2 trong tìm kiếm BM25, điểm của nó sẽ là $\\frac{1}{60 + 1} + \\frac{1}{60 + 2} \\approx 0.01639 + 0.01612 = 0.03251$. Hằng số làm mịn $k$ (theo thực nghiệm chuẩn quốc tế là 60) giúp ngăn chặn trường hợp một kết quả dị biệt đứng đầu ở một bên lấn át hoàn toàn tài liệu đứng thứ 2 và 3 ở cả hai bên. Vì RRF chỉ làm việc trên số thứ tự nguyên thay vì điểm số thực, nó hoàn toàn miễn nhiễm với sự chênh lệch thang đo giữa Cosine vector và điểm BM25.'
            },
            variations: [
              {
                name: {
                  en: 'Weighted Reciprocal Rank Fusion (WRRF)',
                  vi: 'Hợp Nhất RRF Có Trọng Số (WRRF)'
                },
                description: {
                  en: 'Assigns tunable scalar weights to dense vs sparse scores to prioritize exact keywords or semantic matching.',
                  vi: 'Gán trọng số vô hướng cho điểm dense so với sparse để ưu tiên từ khóa chính xác hoặc độ tương đồng ngữ nghĩa.'
                },
                codeBlock: {
                  language: 'python',
                  code: `# Assign higher weight to BM25 when query contains exact product code syntax:
weight_dense = 0.4
weight_sparse = 0.6
score = (weight_dense / (k + rank_dense)) + (weight_sparse / (k + rank_sparse))`
                }
              }
            ],
            tradeOffs: {
              en: [
                'Provides the highest retrieval resilience across both technical code lookups and conceptual semantic queries with zero manual score tuning.',
                'Requires executing two separate searches in parallel (BM25 inverted index + HNSW vector index), increasing database query overhead and infrastructure footprint.'
              ],
              vi: [
                'Mang lại khả năng tìm kiếm bền vững nhất trên cả tra cứu mã kỹ thuật và câu hỏi ngữ nghĩa mà không cần tinh chỉnh điểm thủ công.',
                'Đòi hỏi phải chạy song song 2 câu lệnh tìm kiếm (chỉ mục đảo BM25 + chỉ mục vector HNSW), làm tăng nhẹ tải truy vấn CSDL và hạ tầng vận hành.'
              ]
            },
            gotchas: {
              en: [
                'Setting k too low (e.g. k=1) gives disproportionate weight to top-1 items, destroying the consensus effect.',
                'Failing to deduplicate document candidates before computing RRF scores will produce erroneous duplicate entries.'
              ],
              vi: [
                'Đặt hằng số k quá nhỏ (như k=1) sẽ trao trọng số quá lớn cho vị trí top 1, phá hủy tác dụng đồng thuận của cả 2 công cụ.',
                'Không khử trùng lặp ID tài liệu trước khi tính RRF sẽ dẫn đến việc lặp kết quả trong danh sách trả về.'
              ]
            },
            whenNotToUse: {
              en: [
                'Do not use Hybrid RRF on small collections of short conversational texts where no specialized terminology, codes, or acronyms exist; pure dense vector search is simpler and faster.',
                'Do not use when search latency budgets are strictly below 10ms and dual-index infrastructure cannot be maintained.'
              ],
              vi: [
                'Không cần dùng Hybrid RRF trên các kho văn bản đàm thoại ngắn thuần túy không chứa mã kỹ thuật, số hiệu hay thuật ngữ đặc thù; tìm kiếm vector thuần túy sẽ nhanh và gọn hơn.',
                'Không dùng khi yêu cầu độ trễ cực ngặt dưới 10ms và không đủ tài nguyên vận hành song song 2 chỉ mục.'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'rpr-ch-2',
      number: 2,
      slug: 'hyde-and-parent-child-retriever',
      title: {
        en: 'HyDE (Hypothetical Document Embeddings) & Parent-Child Chunking',
        vi: 'HyDE (Hypothetical Document Embeddings) & Chunking Cha-Con'
      },
      summary: {
        en: 'Hypothetical Document Embeddings (HyDE) for query expansion and decoupling vector search chunks from LLM synthesis context.',
        vi: 'Hypothetical Document Embeddings (HyDE) để mở rộng query và tách rời kích thước chunk tìm kiếm khỏi ngữ cảnh sinh văn bản.'
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'rpr-2-1',
          title: {
            en: '1. HyDE (Hypothetical Document Embeddings) & Parent-Child Retrievers',
            vi: '1. Kỹ Thuật HyDE & Mô Hình Truy Hồi Phân Cấp Cha-Con'
          },
          content: {
            en: 'Two chronic challenges plague enterprise RAG systems: the **Asymmetric Query Problem** and the **Chunk Size Dilemma**. First, user queries are typically short, colloquial, and poorly formulated ("why is my pod pending?"), while corporate knowledge base documents are lengthy, formal, and authoritative ("Kubernetes Node Pressure Eviction and PVC Scheduling Constraints"). In vector space, the short question and the formal answer often lie far apart. **Hypothetical Document Embeddings (HyDE)** solves this by instructing an LLM to generate a hypothetical passage that would answer the question, and embedding that synthesized text instead of the raw query—transforming an asymmetric question-to-document search into a symmetric document-to-document match. Second, the **Chunk Size Dilemma** forces a painful compromise: small chunks (100 tokens) yield pinpoint vector similarity precision, but lack sufficient surrounding context for the final LLM synthesizer. **Parent-Child Retrieval** eliminates this trade-off by indexing small child chunks for vector search, but retrieving their containing parent document (1000+ tokens) when delivering context to the generator.',
            vi: 'Hai bài toán nan giải thường xuyên làm đau đầu các kỹ sư RAG doanh nghiệp: **Vấn đề lệch pha truy vấn (Asymmetric Query)** và **Nghịch lý kích thước chunk (Chunk Size Dilemma)**. Thứ nhất, câu hỏi của người dùng thường rất ngắn, mang tính văn nói và diễn đạt sơ sài ("tại sao pod của tôi bị pending?"), trong khi tài liệu lưu trữ của công ty lại dài, học thuật và mang tính quy chuẩn ("Cơ chế Node Eviction và Ràng buộc lập lịch PVC trong Kubernetes"). Trong không gian vector, câu hỏi ngắn và văn bản trả lời dài thường nằm cách rất xa nhau. **HyDE (Hypothetical Document Embeddings)** giải quyết bài toán này bằng cách yêu cầu LLM viết thử một đoạn văn bản giả định trả lời câu hỏi đó, rồi dùng vector của đoạn văn bản giả định này để đi tìm kiếm—biến bài toán tìm kiếm bất đối xứng (câu hỏi tìm tài liệu) thành bài toán đối xứng (tài liệu tìm tài liệu). Thứ hai, **Nghịch lý kích thước chunk** bắt buộc ta phải thỏa hiệp: chunk nhỏ (100 token) cho độ chính xác tìm kiếm vector cực cao, nhưng lại thiếu ngữ cảnh xung quanh để mô hình LLM tổng hợp câu trả lời hoàn chỉnh. **Mô hình Cha-Con (Parent-Child Retrieval)** triệt tiêu sự đánh đổi này bằng cách đánh chỉ mục các chunk con nhỏ để tìm kiếm vector, nhưng khi tìm thấy thì lại bốc nguyên vẹn văn bản cha lớn (hơn 1000 token) để đưa cho LLM đọc.'
          },
          keyIdea: {
            en: 'Transform asymmetric search into symmetric matching with HyDE: embed a fast hypothetical LLM answer rather than the raw query. Resolve the chunk size dilemma with Parent-Child retrieval: index small child chunks for search, but feed full parent context to the synthesizer.',
            vi: 'Chuyển đổi tìm kiếm bất đối xứng thành đối xứng với HyDE: tạo embedding từ câu trả lời giả định của LLM thay vì query thô. Giải quyết nghịch lý kích thước chunk bằng mô hình Cha-Con: index chunk con nhỏ để tìm kiếm, nhưng nạp trọn vẹn ngữ cảnh cha lớn cho LLM.'
          },
          patternDetails: {
            problem: {
              en: 'Short colloquial queries fail to match formal technical documents in embedding vector space, and small chunks optimize vector search at the expense of necessary surrounding context for answer generation.',
              vi: 'Câu hỏi ngắn đàm thoại không khớp được với tài liệu kỹ thuật chuẩn chỉ trong không gian vector, và chunk nhỏ tối ưu tìm kiếm nhưng lại làm mất ngữ cảnh xung quanh cần thiết để trả lời.'
            },
            context: {
              en: 'Technical developer support portals, regulatory compliance search engines, and complex enterprise product troubleshooting assistants.',
              vi: 'Cổng hỗ trợ lập trình viên, công cụ tra cứu quy chuẩn tuân thủ và trợ lý khắc phục sự cố sản phẩm doanh nghiệp phức tạp.'
            },
            solutionOverview: {
              en: 'Deploy HyDE to generate zero-shot hypothetical answer documents for query embedding, and structure the vector database with a Parent-Child hierarchy linking small indexed vector chunks to large parent text documents.',
              vi: 'Ứng dụng HyDE để sinh câu trả lời giả định zero-shot cho việc tạo vector query, và cấu trúc CSDL theo phân cấp Cha-Con liên kết các chunk vector con nhỏ tới văn bản cha lớn.'
            },
            implementation: {
              language: 'python',
              filename: 'hyde_and_parent_child.py',
              code: `from typing import List, Dict, Any

class AdvancedRagRetriever:
    def __init__(self, llm_client, embed_client, vector_store, parent_doc_store):
        self.llm = llm_client
        self.embed = embed_client
        self.vector_store = vector_store
        self.parent_store = parent_doc_store

    def generate_hyde_embedding(self, raw_query: str) -> List[float]:
        """
        1. HyDE: Instruct a fast LLM to draft a hypothetical answer passage.
        """
        hyde_prompt = f"""Write a concise, authoritative paragraph that directly answers the technical question below.
Do not hedge or greet. Write purely factual content as if extracted from an official manual:
Question: {raw_query}
Hypothetical Answer:"""
        
        hypothetical_passage = self.llm.generate(hyde_prompt, max_tokens=150, temperature=0.2)
        
        # Embed the hypothetical answer instead of the terse question
        return self.embed.get_embedding(hypothetical_passage)

    def retrieve_with_parent_child(self, raw_query: str, top_k_children: int = 5) -> List[str]:
        """
        2. Parent-Child: Index small child chunks for vector precision,
           but retrieve their rich parent documents for generator synthesis.
        """
        # Generate HyDE vector
        query_vector = self.generate_hyde_embedding(raw_query)

        # Search matching child chunks in vector database
        matched_children = self.vector_store.search(query_vector, top_k=top_k_children)

        # Retrieve unique parent document IDs
        parent_ids = list(dict.fromkeys([c["parent_id"] for c in matched_children]))

        # Fetch full parent documents from document store
        parent_documents = [self.parent_store.get(pid) for pid in parent_ids]

        return parent_documents`
            },
            explanation: {
              en: 'HyDE bridges the lexical and stylistic gap between how users ask questions and how technical manuals describe solutions. Even if the hypothetical answer contains hallucinations or minor inaccuracies, its vector representation is oriented in the correct semantic manifold of the vector space, dramatically improving nearest-neighbor discovery. Meanwhile, the Parent-Child retriever indexes 100-token child chunks (which yield crisp, sharp cosine similarities) while storing parent pointers. When a child chunk matches, the system retrieves the entire 1000-token parent document, giving the final synthesizer LLM complete paragraphs and surrounding tables without context fragmentation.',
              vi: 'HyDE lấp đầy khoảng cách về văn phong giữa cách người dùng hỏi và cách tài liệu kỹ thuật mô tả giải pháp. Ngay cả khi câu trả lời giả định có chứa điểm chưa chuẩn xác, vector của nó vẫn định hướng đúng vào vùng ngữ nghĩa chuyên ngành trong không gian vector, giúp thuật toán tìm đúng tài liệu thật. Đồng thời, mô hình Cha-Con đánh chỉ mục các chunk con 100 token (cho điểm số Cosine cực kỳ sắc nét) kèm theo con trỏ trỏ tới tài liệu cha. Khi một chunk con được tìm thấy, hệ thống bốc toàn bộ tài liệu cha 1000 token chứa nó, cung cấp cho LLM tổng hợp trọn vẹn ngữ cảnh đoạn văn và bảng biểu xung quanh mà không bị đứt đoạn.'
            },
            variations: [
              {
                name: {
                  en: 'Hierarchical Sentence-to-Section Window Retrieval',
                  vi: 'Mô Hình Truy Hồi Phân Cấp Câu-Đoạn Văn'
                },
                description: {
                  en: 'Indexes individual sentences for exact vector matches and fetches surrounding sentences during synthesis.',
                  vi: 'Đánh chỉ mục từng câu đơn lẻ để tìm kiếm vector chính xác và lấy các câu lân cận khi tổng hợp.'
                },
                codeBlock: {
                  language: 'python',
                  code: `# Index individual sentences for exact vector matches;
# Fetch sentence + 3 surrounding sentences on either side during synthesis`
                }
              }
            ],
            tradeOffs: {
              en: [
                'HyDE dramatically improves recall on cryptic queries, and Parent-Child preserves full contextual coherence.',
                'HyDE introduces an extra LLM generation step (adding 300ms-800ms of query latency and extra token costs), and Parent-Child requires maintaining a separate parent document store alongside the vector index.'
              ],
              vi: [
                'HyDE nâng cao độ hồi tưởng vượt bậc trên các câu hỏi vắn tắt, và mô hình Cha-Con bảo toàn ngữ cảnh hoàn hảo.',
                'HyDE tốn thêm một lượt gọi LLM sinh văn bản (thêm 300ms-800ms độ trễ và chi phí token), và mô hình Cha-Con cần duy trì một kho lưu trữ tài liệu cha tách biệt bên cạnh CSDL vector.'
              ]
            },
            gotchas: {
              en: [
                'Using an expensive or slow model for HyDE generation will severely degrade user response time; always use a fast, low-latency model (e.g. Gemini Flash or GPT-4o-mini).',
                'Failing to deduplicate parent IDs will inject redundant duplicate parent text blocks into the LLM context.'
              ],
              vi: [
                'Dùng mô hình LLM chậm hoặc đắt tiền cho bước HyDE sẽ làm trải nghiệm người dùng bị lag nghiêm trọng; luôn dùng mô hình nhẹ, tốc độ cao (như Gemini Flash hoặc GPT-4o-mini).',
                'Quên khử trùng lặp ID tài liệu cha sẽ khiến các đoạn văn cha giống nhau bị nhồi lặp lại vào prompt.'
              ]
            },
            whenNotToUse: {
              en: [
                'Do not use HyDE for ultra-low latency real-time autocomplete search (<100ms budget).',
                'Do not use HyDE when users are searching for specific literal IDs or numbers where exact keyword matching (BM25) is required.'
              ],
              vi: [
                'Không dùng HyDE cho các tác vụ gợi ý tìm kiếm tức thì thời gian thực đòi hỏi độ trễ dưới 100ms.',
                'Không dùng HyDE khi người dùng đang tìm kiếm các mã số chính xác mà tìm kiếm từ khóa BM25 đã xử lý hoàn hảo.'
              ]
            }
          }
        }
      ]
    }
  ]
};
