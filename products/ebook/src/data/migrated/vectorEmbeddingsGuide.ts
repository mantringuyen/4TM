import { Book } from '../../types';

export const VECTOR_EMBEDDINGS_GUIDE_BOOK: Book = {
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
  role: 'Data Systems & Vector Retrieval Engineering Group',
  level: 'Intermediate',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-16',
  accentColor: 'from-emerald-600 to-teal-900',
  tags: ['Vector Search', 'pgvector', 'PostgreSQL', 'HNSW', 'Embeddings', 'Practical Guides'],
  description: {
    en: 'A step-by-step practical engineering guide to building enterprise vector similarity search on PostgreSQL using the pgvector extension: table schema design, model-specific dimensions, HNSW index optimization, and distance operator mechanics (<=>, <->, <#>).',
    vi: 'Hướng dẫn thực hành kỹ thuật từng bước xây dựng hệ thống tìm kiếm tương đồng vector trên PostgreSQL bằng tiện ích mở rộng pgvector: thiết kế schema bảng, số chiều vector theo mô hình, tối ưu chỉ mục HNSW và bản chất các toán tử khoảng cách (<=>, <->, <#>).',
  },
  prerequisites: {
    en: [
      'Basic relational SQL proficiency (DDL, DML, indexing concepts)',
      'Conceptual understanding of high-dimensional vector embeddings and similarity search',
    ],
    vi: [
      'Thành thạo SQL cơ sở dữ liệu quan hệ (khái niệm DDL, DML, đánh chỉ mục index)',
      'Hiểu biết cơ bản về vector nhúng nhiều chiều và tìm kiếm tương đồng',
    ],
  },
  outcomes: {
    en: [
      'Configure PostgreSQL with the pgvector extension and declare dimension-specific vector columns',
      'Build and tune high-performance HNSW indexes with optimal m and ef_construction parameters',
      'Execute sub-millisecond semantic similarity queries using the correct distance operators (<=>, <->, <#>)',
      'Filter search results accurately by combining relational metadata constraints with vector similarity thresholds',
    ],
    vi: [
      'Cấu hình PostgreSQL với tiện ích pgvector và khai báo cột vector theo đúng số chiều của mô hình nhúng',
      'Tạo và tinh chỉnh chỉ mục HNSW hiệu năng cao với các tham số tối ưu m và ef_construction',
      'Thực thi truy vấn tìm kiếm ngữ nghĩa dưới mili-giây bằng đúng toán tử khoảng cách (<=>, <->, <#>)',
      'Lọc kết quả chuẩn xác bằng cách kết hợp điều kiện metadata quan hệ với ngưỡng điểm tương đồng vector',
    ],
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
        en: 'Enabling the vector extension, defining dimension-specific vector columns, and configuring HNSW indexes.',
        vi: 'Kích hoạt tiện ích vector, khai báo cột vector theo số chiều mô hình và cấu hình chỉ mục HNSW.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'veg-1-1',
          title: {
            en: 'Defining Vector Columns & HNSW Indexing in SQL',
            vi: 'Khai Báo Cột Kiểu Vector & Tạo Chỉ Mục HNSW Trong PostgreSQL',
          },
          content: {
            en: 'In enterprise production architectures, maintaining an external dedicated vector database alongside a transactional database introduces synchronization lag, dual-backup overhead, and distributed consistency challenges. The open-source `pgvector` extension eliminates this friction by embedding vector capabilities natively into PostgreSQL. Developers define a `vector(dim)` column where `dim` matches the precise output dimensionality of their chosen embedding model (e.g., 768 for Gemini `text-embedding-004`, 1536 for OpenAI `text-embedding-3-small`, or 3072 for `text-embedding-3-large`). For high-throughput retrieval over large datasets, an **HNSW (Hierarchical Navigable Small World)** index is essential: HNSW builds a multi-layer proximity graph providing logarithmic $O(\\log N)$ query performance with 99%+ recall.',
            vi: 'Trong kiến trúc doanh nghiệp, việc duy trì một cơ sở dữ liệu vector chuyên biệt độc lập bên cạnh cơ sở dữ liệu giao dịch quan hệ tạo ra độ trễ đồng bộ dữ liệu, tăng chi phí sao lưu kép và phát sinh rủi ro bất đồng bộ. Tiện ích mở rộng `pgvector` giải quyết triệt để vấn đề này bằng cách tích hợp trực tiếp khả năng xử lý vector vào PostgreSQL. Lập trình viên khai báo cột `vector(dim)` với `dim` tương ứng chính xác số chiều của mô hình nhúng đã chọn (ví dụ: 768 cho Gemini `text-embedding-004`, 1536 cho OpenAI `text-embedding-3-small`, hoặc 3072 cho `text-embedding-3-large`). Để đạt thông lượng tìm kiếm cao trên hàng trăm nghìn vector, chỉ mục **HNSW (Hierarchical Navigable Small World)** là lựa chọn tối ưu: HNSW xây dựng đồ thị phân tầng đa lớp cho tốc độ truy vấn $O(\\log N)$ với độ hồi tưởng đạt trên 99%.',
          },
          keyIdea: {
            en: 'Embedding dimensions are model-dependent, not universal. Always match your vector(dim) column definition to your model output and build an HNSW index with calibrated m and ef_construction parameters.',
            vi: 'Số chiều vector phụ thuộc vào từng mô hình nhúng cụ thể, không có số chiều chuẩn duy nhất. Luôn khai báo đúng số chiều vector(dim) và xây dựng chỉ mục HNSW với tham số m và ef_construction chuẩn.',
          },
          guideDetails: {
            goal: {
              en: 'Provision a production PostgreSQL database table with native vector storage and construct a tuned HNSW index for ultra-low latency cosine similarity retrieval.',
              vi: 'Thiết lập bảng cơ sở dữ liệu PostgreSQL lưu trữ vector gốc và xây dựng chỉ mục HNSW tối ưu cho việc tìm kiếm tương đồng cosine độ trễ thấp.',
            },
            prerequisites: {
              en: [
                'PostgreSQL 15 or higher with pgvector extension compiled and installed',
                'Superuser or database owner permissions to run CREATE EXTENSION',
                'Chosen embedding model dimension determined (e.g. 768 for Gemini, 1536 for OpenAI small)',
              ],
              vi: [
                'PostgreSQL phiên bản 15 trở lên đã cài đặt sẵn tiện ích pgvector',
                'Quyền superuser hoặc chủ cơ sở dữ liệu để chạy lệnh CREATE EXTENSION',
                'Đã xác định số chiều của mô hình embedding sẽ dùng (ví dụ: 768 cho Gemini, 1536 cho OpenAI)',
              ],
            },
            preparation: {
              en: 'Verify that PostgreSQL has sufficient maintenance memory allocated for index generation. Generating HNSW indexes on large tables is memory-intensive; temporarily elevate `SET maintenance_work_mem = "1GB";` prior to running index creation.',
              vi: 'Đảm bảo PostgreSQL được phân bổ đủ bộ nhớ bảo trì khi tạo index. Tạo chỉ mục HNSW trên bảng lớn tốn khá nhiều RAM; hãy nâng tạm thời `SET maintenance_work_mem = "1GB";` trước khi chạy lệnh tạo chỉ mục.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Enable the pgvector Extension',
                  vi: 'Kích Hoạt Tiện Ích Mở Rộng pgvector',
                },
                instruction: {
                  en: 'Run the extension activation DDL command in your target database. This registers the custom vector data type, index access methods, and vector distance operators.',
                  vi: 'Chạy câu lệnh DDL kích hoạt tiện ích trong cơ sở dữ liệu đích. Lệnh này sẽ đăng ký kiểu dữ liệu vector, các phương thức đánh chỉ mục và toán tử khoảng cách vector.',
                },
                commandSnippet: {
                  language: 'sql',
                  code: 'CREATE EXTENSION IF NOT EXISTS vector;',
                },
                expectedOutput: {
                  en: 'CREATE EXTENSION (or NOTICE if already created)',
                  vi: 'CREATE EXTENSION (hoặc thông báo NOTICE nếu đã tồn tại)',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Create the Document Chunks Table with Exact Vector Dimension',
                  vi: 'Tạo Bảng Document Chunks Với Số Chiều Vector Chuẩn',
                },
                instruction: {
                  en: 'Declare the table schema including primary key, foreign reference keys, raw text content, metadata JSONB, and the vector column configured to your model dimensions (768 for Gemini text-embedding-004).',
                  vi: 'Khai báo cấu trúc bảng bao gồm khóa chính, khóa ngoại, nội dung văn bản gốc, metadata JSONB và cột vector tương ứng số chiều mô hình (768 cho Gemini text-embedding-004).',
                },
                codeSnippet: {
                  language: 'sql',
                  code: `CREATE TABLE document_chunks (
    id BIGSERIAL PRIMARY KEY,
    document_id UUID NOT NULL,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    -- 768 dimensions for Gemini text-embedding-004 (or 1536 for OpenAI text-embedding-3-small)
    embedding vector(768) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);`,
                },
                expectedOutput: {
                  en: 'CREATE TABLE',
                  vi: 'CREATE TABLE',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Build the HNSW Vector Index with vector_cosine_ops',
                  vi: 'Tạo Chỉ Mục Vector HNSW Với Toán Tử vector_cosine_ops',
                },
                instruction: {
                  en: 'Create an HNSW index specifying the `vector_cosine_ops` operator class. Configure `m` (maximum outgoing connections per node, default 16) and `ef_construction` (size of candidate list during index build, default 64).',
                  vi: 'Tạo chỉ mục HNSW chỉ định lớp toán tử `vector_cosine_ops`. Cấu hình tham số `m` (số liên kết tối đa mỗi node, mặc định 16) và `ef_construction` (danh sách ứng viên khi xây index, mặc định 64).',
                },
                codeSnippet: {
                  language: 'sql',
                  code: `CREATE INDEX idx_document_chunks_hnsw_cosine 
ON document_chunks 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);`,
                },
                expectedOutput: {
                  en: 'CREATE INDEX',
                  vi: 'CREATE INDEX',
                },
              },
            ],
            verification: {
              en: 'Verify that the index was created successfully by querying `pg_indexes` or running `\\d+ document_chunks`. Ensure the index method is displayed as `hnsw` with `vector_cosine_ops`.',
              vi: 'Kiểm tra chỉ mục đã tạo thành công bằng cách truy vấn bảng `pg_indexes` hoặc chạy lệnh `\\d+ document_chunks`. Đảm bảo phương thức index hiển thị là `hnsw` với lớp `vector_cosine_ops`.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'ERROR: type "vector" does not exist',
                  vi: 'Lỗi: type "vector" does not exist',
                },
                cause: {
                  en: 'The pgvector extension was not created in the current active database schema or database.',
                  vi: 'Tiện ích pgvector chưa được kích hoạt trong schema hoặc cơ sở dữ liệu hiện tại.',
                },
                fix: {
                  en: 'Execute `CREATE EXTENSION IF NOT EXISTS vector;` connected to the target database with superuser privileges.',
                  vi: 'Chạy lệnh `CREATE EXTENSION IF NOT EXISTS vector;` khi kết nối vào đúng cơ sở dữ liệu đích với quyền superuser.',
                },
              },
              {
                symptom: {
                  en: 'Index creation fails with out-of-memory or server worker kill',
                  vi: 'Lỗi tạo index thất bại do tràn bộ nhớ (Out of Memory) hoặc tiến trình bị kill',
                },
                cause: {
                  en: '`maintenance_work_mem` is set too low for the dataset size and high `ef_construction` values.',
                  vi: 'Tham số `maintenance_work_mem` đặt quá thấp so với kích thước tập dữ liệu và giá trị `ef_construction` cao.',
                },
                fix: {
                  en: 'Increase session maintenance memory: `SET maintenance_work_mem = "1GB";` before re-running CREATE INDEX.',
                  vi: 'Tăng bộ nhớ phiên làm việc bằng lệnh: `SET maintenance_work_mem = "1GB";` trước khi chạy lại CREATE INDEX.',
                },
              },
            ],
            checklist: {
              en: [
                'PostgreSQL pgvector extension verified via SELECT * FROM pg_extension WHERE extname = "vector";',
                'Table vector column dimension matches the exact embedding model output dimension',
                'HNSW index built specifying the operator class matching the search metric (vector_cosine_ops)',
                'm and ef_construction parameters configured to balance build time and query recall',
              ],
              vi: [
                'Đã xác minh tiện ích pgvector qua lệnh SELECT * FROM pg_extension WHERE extname = "vector";',
                'Số chiều cột vector trong bảng khớp chính xác với số chiều mô hình embedding sử dụng',
                'Chỉ mục HNSW được tạo với đúng lớp toán tử của độ đo tìm kiếm (vector_cosine_ops)',
                'Đã thiết lập tham số m và ef_construction cân bằng giữa thời gian tạo và độ chính xác tìm kiếm',
              ],
            },
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
        en: 'Ordering by cosine distance (<=>), converting to similarity scores, and combining with metadata pre-filtering.',
        vi: 'Sắp xếp theo khoảng cách cosine (<=>), chuyển đổi sang điểm tương đồng và kết hợp lọc metadata.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'veg-2-1',
          title: {
            en: 'Executing Vector Similarity Queries in SQL with the <=> Operator',
            vi: 'Truy Vấn Độ Tương Đồng Vector Trong SQL Bằng Toán Tử <=>',
          },
          content: {
            en: 'In mathematical vector search, distance is the inverse of similarity. Cosine Distance measures the angular divergence between two vectors regardless of their magnitude: $\\text{Cosine Distance} = 1 - \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$. A Cosine Distance of `0.0` denotes identical orientation, while `1.0` denotes orthogonal (unrelated) vectors. In pgvector: (1) `<=>` calculates Cosine Distance; (2) `<->` calculates Euclidean (L2) Distance; and (3) `<#>` calculates Negative Inner Product. When executing vector queries, developers sort in ascending order (`ORDER BY embedding <=> query_vector ASC LIMIT k`) to retrieve nearest neighbors. To convert distance back to a standard similarity score for ranking thresholds, compute `1 - (embedding <=> query_vector)`.',
            vi: 'Trong toán học tìm kiếm vector, khoảng cách là nghịch đảo của độ tương đồng. Khoảng cách Cosine (Cosine Distance) đo độ phân kỳ góc giữa hai vector bất kể độ dài: $\\text{Cosine Distance} = 1 - \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$. Khoảng cách `0.0` biểu thị hướng giống hệt nhau, trong khi `1.0` biểu thị hai vector trực giao (hoàn toàn không liên quan). Trong pgvector: (1) `<=>` tính Khoảng cách Cosine; (2) `<->` tính Khoảng cách Euclidean (L2); và (3) `<#>` tính Tích vô hướng âm (Negative Inner Product). Khi truy vấn, lập trình viên sắp xếp tăng dần (`ORDER BY embedding <=> query_vector ASC LIMIT k`) để lấy các điểm gần nhất. Để chuyển khoảng cách về điểm tương đồng chuẩn cho bộ lọc ngưỡng, hãy dùng công thức `1 - (embedding <=> query_vector)`.',
          },
          keyIdea: {
            en: 'The pgvector <=> operator computes Cosine Distance, not similarity. Always order by ASC for distance and calculate similarity as 1 - (embedding <=> query_vector).',
            vi: 'Toán tử <=> trong pgvector tính Khoảng cách Cosine chứ không phải độ tương đồng. Luôn sắp xếp ASC khi dùng khoảng cách và tính độ tương đồng theo công thức 1 - (embedding <=> query_vector).',
          },
          guideDetails: {
            goal: {
              en: 'Write and optimize parameterized SQL queries that search the top-k nearest document chunks using Cosine Distance (<=>) combined with metadata isolation filters.',
              vi: 'Viết và tối ưu hóa câu lệnh SQL tham số hóa tìm kiếm top-k đoạn văn bản gần nhất bằng Khoảng cách Cosine (<=>) kết hợp bộ lọc phân vùng metadata.',
            },
            prerequisites: {
              en: [
                'PostgreSQL table populated with vectors and an active HNSW index',
                'Embedding vector generated for the user query string from client/backend code',
              ],
              vi: [
                'Bảng PostgreSQL đã có dữ liệu vector và chỉ mục HNSW đang hoạt động',
                'Đã tạo vector embedding cho câu hỏi người dùng từ code client/backend',
              ],
            },
            preparation: {
              en: 'Ensure your database connection pool sets `hnsw.ef_search = 100;` at the session level to increase search accuracy during graph traversal.',
              vi: 'Đảm bảo pool kết nối cơ sở dữ liệu cấu hình `hnsw.ef_search = 100;` ở cấp phiên làm việc để tăng độ chính xác tìm kiếm trên đồ thị.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Set Query Runtime ef_search Depth',
                  vi: 'Cấu Hình Độ Sâu Tìm Kiếm ef_search Khi Chạy Truy Vấn',
                },
                instruction: {
                  en: 'Adjust the dynamic search candidate list size. Higher values increase recall at a minor cost in query latency (default is 40).',
                  vi: 'Điều chỉnh kích thước danh sách ứng viên tìm kiếm động. Giá trị cao hơn tăng độ chính xác nhưng tăng nhẹ độ trễ (mặc định là 40).',
                },
                commandSnippet: {
                  language: 'sql',
                  code: 'SET hnsw.ef_search = 100;',
                },
                expectedOutput: {
                  en: 'SET',
                  vi: 'SET',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Execute Top-K Similarity Search with Metadata Filter',
                  vi: 'Thực Thi Truy Vấn Top-K Tương Đồng Kèm Bộ Lọc Metadata',
                },
                instruction: {
                  en: 'Query nearest neighbors by ordering ascending by distance (`<=>`), calculating normalized similarity, and filtering by tenant ID and score threshold.',
                  vi: 'Truy vấn các điểm gần nhất bằng cách sắp xếp tăng dần theo khoảng cách (`<=>`), tính điểm tương đồng chuẩn hóa và lọc theo tenant_id cùng ngưỡng điểm.',
                },
                codeSnippet: {
                  language: 'sql',
                  code: `SELECT 
    id,
    document_id,
    content,
    metadata->>'source_url' AS source_url,
    -- Convert Cosine Distance to Cosine Similarity score (0.0 to 1.0)
    1 - (embedding <=> $1::vector) AS similarity_score
FROM document_chunks
WHERE 
    -- Tenant isolation filter
    metadata->>'tenant_id' = $2
    -- Minimum relevance threshold filter
    AND (1 - (embedding <=> $1::vector)) > 0.70
ORDER BY 
    embedding <=> $1::vector ASC
LIMIT 5;`,
                },
                expectedOutput: {
                  en: '5 rows returned in descending similarity order',
                  vi: 'Trả về 5 dòng có điểm tương đồng cao nhất',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Validate Execution Plan with EXPLAIN ANALYZE',
                  vi: 'Kiểm Tra Kế Hoạch Thực Thi Với EXPLAIN ANALYZE',
                },
                instruction: {
                  en: 'Run EXPLAIN ANALYZE on your query to confirm that PostgreSQL is performing an Index Scan on the HNSW index rather than a Seq Scan.',
                  vi: 'Chạy lệnh EXPLAIN ANALYZE trên câu truy vấn để chắc chắn PostgreSQL đang dùng Index Scan trên chỉ mục HNSW thay vì Seq Scan.',
                },
                codeSnippet: {
                  language: 'sql',
                  code: `EXPLAIN (ANALYZE, BUFFERS)
SELECT id, 1 - (embedding <=> $1::vector) AS score
FROM document_chunks
ORDER BY embedding <=> $1::vector ASC
LIMIT 5;`,
                },
                expectedOutput: {
                  en: 'Index Scan using idx_document_chunks_hnsw_cosine on document_chunks',
                  vi: 'Index Scan using idx_document_chunks_hnsw_cosine on document_chunks',
                },
              },
            ],
            verification: {
              en: 'Verify that execution time is under 10ms for tables with hundreds of thousands of vectors and that similarity scores correlate with semantic topic relevance.',
              vi: 'Xác nhận thời gian thực thi dưới 10ms trên bảng có hàng trăm nghìn vector và điểm tương đồng phản ánh chính xác ngữ nghĩa chủ đề.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'EXPLAIN output shows "Seq Scan" instead of "Index Scan"',
                  vi: 'Kết quả EXPLAIN hiển thị "Seq Scan" thay vì "Index Scan"',
                },
                cause: {
                  en: 'Table has very few rows (<1000) where PostgreSQL planner prefers sequential scan, or the distance operator does not match the index operator class.',
                  vi: 'Bảng có quá ít dòng (<1000) nên PostgreSQL tự động quét tuần tự, hoặc toán tử khoảng cách không khớp với lớp toán tử của index.',
                },
                fix: {
                  en: 'Ensure operator `<=>` matches `vector_cosine_ops`, or test with `SET enable_seqscan = off;` on populated tables.',
                  vi: 'Đảm bảo toán tử `<=>` khớp với `vector_cosine_ops`, hoặc kiểm tra bằng lệnh `SET enable_seqscan = off;` trên bảng đã có dữ liệu.',
                },
              },
              {
                symptom: {
                  en: 'Query returns 0 results despite matching content in database',
                  vi: 'Truy vấn trả về 0 kết quả dù trong database có nội dung tương đồng',
                },
                cause: {
                  en: 'The similarity threshold filter `1 - (embedding <=> $1) > 0.70` is set too strictly for the embedding model geometry.',
                  vi: 'Ngưỡng lọc tương đồng `1 - (embedding <=> $1) > 0.70` đặt quá cao so với phân phối hình học của mô hình embedding.',
                },
                fix: {
                  en: 'Lower threshold to 0.50-0.60 or remove the WHERE score clause temporarily to inspect actual distribution of distance scores.',
                  vi: 'Hạ ngưỡng xuống 0.50-0.60 hoặc tạm thời bỏ điều kiện WHERE để xem phân phối điểm số khoảng cách thực tế.',
                },
              },
            ],
            checklist: {
              en: [
                'Used correct distance operator (<=> for Cosine, <-> for L2, <#> for Inner Product)',
                'Ordered by distance ASC so closest semantic vectors appear first',
                'Converted distance to similarity score using 1 - (embedding <=> query_vector)',
                'Configured session hnsw.ef_search parameter to balance speed and recall',
              ],
              vi: [
                'Sử dụng đúng toán tử khoảng cách (<=> cho Cosine, <-> cho L2, <#> cho Tích vô hướng)',
                'Sắp xếp theo khoảng cách ASC để các vector gần nhất đứng đầu danh sách',
                'Chuyển đổi khoảng cách sang điểm tương đồng theo công thức 1 - (embedding <=> query_vector)',
                'Cấu hình tham số hnsw.ef_search để cân bằng giữa tốc độ truy vấn và độ chính xác',
              ],
            },
          },
        },
      ],
    },
  ],
};
