import { Book } from '../../types';

export const SQL_HANDBOOK_BOOK: Book = {
  id: 'sql-handbook',
  slug: 'sql-handbook',
  title: 'SQL Handbook',
  subtitle: {
    en: 'Relational Foundations, Set Algebra, Query Reasoning & Storage Engine Mechanics',
    vi: 'Nền Tảng Mô Hình Quan Hệ, Đại Số Tập Hợp, Lập Luận Truy Vấn & Cơ Chế Storage Engine',
  },
  bookType: 'Handbook',
  categoryId: 'sql',
  subjectId: 'storage',
  author: '4TM Technical Board',
  role: 'Core Database Engineering Group',
  level: 'Comprehensive',
  estimatedReadTime: '45 mins',
  chaptersCount: 4,
  publishedDate: '2025-02-10',
  accentColor: 'from-blue-600 to-indigo-800',
  tags: ['SQL', 'Relational Model', 'PostgreSQL', 'DBMS', 'Query Reasoning', 'Indexes', 'ACID'],
  description: {
    en: 'Comprehensive reference handbook covering relational algebra, constraints, three-valued NULL logic, JOIN mechanics, aggregation filters, subqueries vs CTEs, and B-Tree indexing.',
    vi: 'Cẩm nang tra cứu toàn diện về đại số quan hệ, ràng buộc schema, logic ba giá trị với NULL, cơ chế JOIN, bộ lọc tổng hợp, subquery so với CTE và tối ưu hóa chỉ mục B-Tree.',
  },
  prerequisites: {
    en: [
      'Basic relational database concepts and relational table terminology',
      'Fundamental experience executing basic SELECT, INSERT, UPDATE queries',
    ],
    vi: [
      'Khái niệm cơ bản về cơ sở dữ liệu quan hệ và thuật ngữ bảng dữ liệu',
      'Kinh nghiệm thực thi các câu lệnh SELECT, INSERT, UPDATE căn bản',
    ],
  },
  outcomes: {
    en: [
      'Master relational algebra constraints and three-valued logic truth tables',
      'Predict and reason through JOIN algorithms (Hash Join, Merge Join, Nested Loop)',
      'Distinguish logical query processing order from physical execution plans',
      'Design SARGable queries and understand B-Tree index page traversals',
    ],
    vi: [
      'Làm chủ các ràng buộc đại số quan hệ và bảng chân trị logic 3 giá trị của SQL',
      'Phán đoán và lập luận chính xác các thuật toán JOIN (Hash Join, Merge Join, Nested Loop)',
      'Phân biệt thứ tự xử lý truy vấn logic và kế hoạch thực thi vật lý',
      'Thiết kế truy vấn chuẩn SARGable và hiểu cách bộ nhớ duyệt cây chỉ mục B-Tree',
    ],
  },
  parts: [
    {
      partNumber: 1,
      title: {
        en: 'Relational Model, Constraints & Three-Valued Logic',
        vi: 'Mô Hình Quan Hệ, Ràng Buộc Schema & Logic 3 Giá Trị',
      },
      description: {
        en: 'Mathematical foundations of relations, keys, referential actions, and NULL semantics.',
        vi: 'Nền tảng toán học của quan hệ, khóa, hành vi tham chiếu và ngữ nghĩa của giá trị NULL.',
      },
      chapterIds: ['sql-hb-ch-1'],
    },
    {
      partNumber: 2,
      title: {
        en: 'Set Operations, JOIN Algorithms & Logical Query Reasoning',
        vi: 'Phép Toán Tập Hợp, Thuật Toán JOIN & Thứ Tự Xử Lý Truy Vấn',
      },
      description: {
        en: 'Engine-level JOIN execution plans, aggregation mechanics, and CTEs vs subqueries.',
        vi: 'Kế hoạch thực thi JOIN ở tầng engine, cơ chế tổng hợp và so sánh CTE với subquery.',
      },
      chapterIds: ['sql-hb-ch-2', 'sql-hb-ch-3'],
    },
    {
      partNumber: 3,
      title: {
        en: 'Index Traversal, SARGability & ACID Transaction Guarantees',
        vi: 'Cấu Trúc B-Tree, Tính SARGable & Đảm Bảo Giao Dịch ACID',
      },
      description: {
        en: 'B-Tree leaf scan mechanics, non-SARGable pitfalls, and transaction isolation boundaries.',
        vi: 'Cơ chế quét lá B-Tree, cạm bẫy non-SARGable và ranh giới cô lập giao dịch ACID.',
      },
      chapterIds: ['sql-hb-ch-4'],
    },
  ],
  glossary: [
    {
      term: { en: 'Relational Relation', vi: 'Quan Hệ (Relation)' },
      definition: {
        en: 'A mathematical set of tuples sharing identical named attributes, where duplicate tuples are impermissible and column order is irrelevant.',
        vi: 'Một tập hợp toán học các bộ (tuples) có cùng các thuộc tính được đặt tên, không cho phép bản ghi trùng lặp và thứ tự cột không có ý nghĩa.',
      },
    },
    {
      term: { en: 'Referential Integrity', vi: 'Toàn Vẹn Tham Chiếu' },
      definition: {
        en: 'A database constraint enforcing that foreign key values in a child table must match an existing primary key in the referenced parent table or be NULL.',
        vi: 'Ràng buộc cơ sở dữ liệu quy định giá trị khóa ngoại ở bảng con phải tương ứng với khóa chính hiện hữu trong bảng cha được tham chiếu hoặc phải là NULL.',
      },
    },
    {
      term: { en: 'Three-Valued Logic (3VL)', vi: 'Logic Ba Giá Trị' },
      definition: {
        en: 'SQL boolean evaluation model incorporating TRUE, FALSE, and UNKNOWN, where comparisons with NULL yield UNKNOWN.',
        vi: 'Mô hình đánh giá boolean của SQL gồm TRUE, FALSE và UNKNOWN, trong đó mọi phép so sánh với NULL đều trả về UNKNOWN.',
      },
    },
    {
      term: { en: 'Hash Join', vi: 'Phép Nối Băm (Hash Join)' },
      definition: {
        en: 'A physical join operator that builds an in-memory hash table on the smaller relation before probing rows from the larger relation.',
        vi: 'Toán tử nối vật lý xây dựng bảng băm trong bộ nhớ trên quan hệ nhỏ hơn trước khi quét các dòng từ quan hệ lớn hơn.',
      },
    },
    {
      term: { en: 'Merge Join', vi: 'Phép Nối Trộn (Merge Join)' },
      definition: {
        en: 'A physical join operator that steps concurrently through two sorted inputs, highly efficient for large sorted streams or index scans.',
        vi: 'Toán tử nối vật lý duyệt đồng thời qua hai luồng dữ liệu đã được sắp xếp, tối ưu cho tập dữ liệu lớn đã có thứ tự sẵn.',
      },
    },
    {
      term: { en: 'Nested Loop Join', vi: 'Phép Nối Vòng Lặp Lồng (Nested Loop)' },
      definition: {
        en: 'A physical join operator that scans an outer input and, for each row, performs an index lookup or scan on the inner table.',
        vi: 'Toán tử nối vật lý duyệt qua từng dòng của bảng ngoài và thực hiện tra cứu chỉ mục hoặc quét trên bảng trong.',
      },
    },
    {
      term: { en: 'Logical Query Processing', vi: 'Thứ Tự Xử Lý Truy Vấn Logic' },
      definition: {
        en: 'The standard conceptual sequence (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT) defining row elimination and transformation.',
        vi: 'Quy trình xử lý tuần tự theo chuẩn (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT) quyết định việc loại bỏ và biến đổi dòng.',
      },
    },
    {
      term: { en: 'Common Table Expression (CTE)', vi: 'Biểu Thức Bảng Chung (CTE)' },
      definition: {
        en: 'A temporary named result set defined via the WITH clause, providing modular readability and optional recursion.',
        vi: 'Tập kết quả tạm thời được đặt tên định nghĩa qua mệnh đề WITH, giúp mã nguồn phân đoạn rõ ràng và hỗ trợ truy vấn đệ quy.',
      },
    },
    {
      term: { en: 'SARGability', vi: 'Tính Search Argument Able (SARGable)' },
      definition: {
        en: 'The property of a query predicate allowing the storage engine to execute a direct B-Tree range seek rather than evaluating expressions across an entire table scan.',
        vi: 'Thuộc tính của điều kiện lọc cho phép storage engine thực hiện tìm kiếm phạm vi trực tiếp trên cây B-Tree thay vì phải quét toàn bảng.',
      },
    },
    {
      term: { en: 'ACID Guarantees', vi: 'Đặc Tính Giao Dịch ACID' },
      definition: {
        en: 'Atomicity, Consistency, Isolation, and Durability—the core transactional principles ensuring data correctness amidst crashes and concurrency.',
        vi: 'Nguyên tử (Atomicity), Nhất quán (Consistency), Cô lập (Isolation) và Bền vững (Durability)—các tiêu chuẩn đảm bảo tính đúng đắn dữ liệu khi có sự cố và truy cập đồng thời.',
      },
    },
  ],
  furtherReading: [
    {
      title: 'A Relational Model of Data for Large Shared Data Banks',
      author: 'E. F. Codd (ACM Classics)',
      year: '1970',
      description: {
        en: 'The seminal academic publication establishing relational algebra, predicate calculus, and mathematical relations.',
        vi: 'Công trình khoa học nền tảng khai sinh ra đại số quan hệ và mô hình cơ sở dữ liệu quan hệ hiện đại.',
      },
    },
    {
      title: 'PostgreSQL Query Planning Documentation & Cost Mechanics',
      author: 'The PostgreSQL Global Development Group',
      year: '2024',
      description: {
        en: 'Deep technical guide to cost-based query optimization, plan node trees, and statistics calculations.',
        vi: 'Tài liệu kỹ thuật chuyên sâu về tối ưu hóa truy vấn dựa trên chi phí (cost-based optimizer) và cây nút thực thi.',
      },
    },
    {
      title: 'Database Internals: A Deep Dive into How Distributed Systems Store Data',
      author: 'Alex Petrov',
      year: '2019',
      description: {
        en: 'Comprehensive breakdown of B-Trees, Write-Ahead Logs (WAL), concurrency control, and storage layouts.',
        vi: 'Phân tích chi tiết về cấu trúc B-Tree, nhật ký ghi trước (WAL) và kiểm soát tương tranh trong cơ sở dữ liệu.',
      },
    },
    {
      title: 'SQL Performance Explained',
      author: 'Markus Winand',
      year: '2012',
      description: {
        en: 'Definitive guide on index leaf node mechanics, composite indexing rules, and SARGable SQL authoring.',
        vi: 'Cẩm nang toàn diện về cơ chế lá chỉ mục, quy tắc index kết hợp và viết truy vấn chuẩn SARGable.',
      },
    },
  ],
  chapters: [
    // Chapter 1: Relational Model, Constraints & NULL Semantics
    {
      id: 'sql-hb-ch-1',
      number: 1,
      partNumber: 1,
      partTitle: {
        en: 'Relational Model, Constraints & Three-Valued Logic',
        vi: 'Mô Hình Quan Hệ, Ràng Buộc Schema & Logic 3 Giá Trị',
      },
      slug: 'relational-model-and-ddl',
      title: {
        en: 'Relational Model, Schema Constraints & Three-Valued Logic',
        vi: 'Mô Hình Quan Hệ, Ràng Buộc Schema & Logic Ba Giá Trị',
      },
      summary: {
        en: 'Primary keys, foreign keys, cascading deletion rules, check constraints, and three-valued NULL logic truth tables.',
        vi: 'Khóa chính, khóa ngoại, quy tắc xóa cascade, ràng buộc CHECK và bảng chân trị logic 3 giá trị của NULL.',
      },
      readTimeMinutes: 14,
      sections: [
        {
          id: 'sql-hb-1-1',
          title: {
            en: 'Primary Keys, Referential Actions & NULL Semantics',
            vi: 'Khóa Chính, Hành Vi Tham Chiếu & Ngữ Nghĩa Của NULL',
          },
          keyIdea: {
            en: 'Referential integrity is guaranteed declaratively at the storage engine level, while NULL represents missing or unknown information requiring three-valued logic evaluation.',
            vi: 'Tính toàn vẹn tham chiếu được bảo đảm mang tính khai báo ở tầng engine, trong khi giá trị NULL đại diện cho thông tin chưa biết và đòi hỏi đánh giá bằng logic 3 giá trị.',
          },
          content: {
            en: 'In relational database theory, relations are sets of tuples bounded by strict integrity constraints. A Primary Key enforces row identity through non-null uniqueness, establishing physical data clustering in engines like InnoDB or unique B-Tree indexes in PostgreSQL. Foreign Keys mandate referential integrity between dependent relations: child rows cannot point to nonexistent parent keys. When parent keys mutate, cascading actions dictate state: `ON DELETE CASCADE` removes dependent children, `ON DELETE RESTRICT` (or `NO ACTION`) blocks the transaction with an error, and `ON DELETE SET NULL` decouples children by setting foreign keys to NULL.\n\nCrucially, SQL departs from classical two-valued Boolean logic by incorporating NULL through Three-Valued Logic (3VL: TRUE, FALSE, UNKNOWN). A comparison such as `val = NULL` evaluates neither to TRUE nor FALSE, but to UNKNOWN. In WHERE clauses, rows are only returned if the predicate evaluates strictly to TRUE; an UNKNOWN condition rejects the row. Consequently, testing for missing values requires `IS NULL` or `IS NOT NULL`, and `NOT IN (subquery)` will return zero rows if any subquery item evaluates to NULL.',
            vi: 'Trong lý thuyết cơ sở dữ liệu quan hệ, các bảng là tập hợp các bộ dữ liệu được quản lý bởi ràng buộc toàn vẹn nghiêm ngặt. Khóa chính (Primary Key) xác lập danh tính dòng thông qua tính duy nhất và không nhận NULL, định hình cách tổ chức vật lý trong InnoDB hoặc tạo chỉ mục B-Tree duy nhất trong PostgreSQL. Khóa ngoại (Foreign Key) áp đặt tính toàn vẹn tham chiếu: dòng ở bảng con không thể trỏ tới khóa cha không tồn tại. Khi dòng cha bị thay đổi, hành vi cascade quyết định trạng thái: `ON DELETE CASCADE` tự động xóa các dòng con, `ON DELETE RESTRICT` chặn đứng giao dịch và báo lỗi, còn `ON DELETE SET NULL` gỡ liên kết bằng cách gán khóa ngoại thành NULL.\n\nĐặc biệt, SQL khác biệt với logic Boolean nhị phân cổ điển nhờ hệ thống Logic Ba Giá Trị (3VL: TRUE, FALSE, UNKNOWN). Phép so sánh như `val = NULL` không trả về TRUE cũng không trả về FALSE, mà trả về UNKNOWN. Trong mệnh đề WHERE, một dòng chỉ được chọn khi biểu thức đạt giá trị TRUE; giá trị UNKNOWN bị loại bỏ tương tự FALSE. Vì vậy, việc kiểm tra dữ liệu vắng mặt bắt buộc phải dùng `IS NULL` hoặc `IS NOT NULL`, và toán tử `NOT IN (subquery)` sẽ không trả về bất kỳ kết quả nào nếu tập con chứa dù chỉ một phần tử NULL.',
          },
          codeBlock: {
            language: 'sql',
            filename: 'schema_constraints_and_null_logic.sql',
            explanation: {
              en: 'Enterprise relational schema demonstrating primary/foreign keys, ON DELETE RESTRICT, CHECK constraints, and three-valued logic traps.',
              vi: 'Schema quan hệ chuẩn doanh nghiệp minh họa khóa chính/ngoại, ON DELETE RESTRICT, kiểm tra CHECK và cạm bẫy logic 3 giá trị.',
            },
            code: `-- 1. Schema with strict referential constraints
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(32) NOT NULL UNIQUE,
    status VARCHAR(16) NOT NULL CHECK (status IN ('active', 'suspended', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accounts (
    id BIGSERIAL PRIMARY KEY,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    email VARCHAR(255) NOT NULL,
    discount_rate NUMERIC(4,2) CHECK (discount_rate >= 0.00 AND discount_rate <= 1.00),
    is_verified BOOLEAN DEFAULT FALSE,
    CONSTRAINT uq_org_email UNIQUE (org_id, email)
);

-- 2. Three-Valued Logic (3VL) Comparison Demonstration
-- WRONG: Returns 0 rows even if discount_rate is NULL!
SELECT * FROM accounts WHERE discount_rate = NULL;

-- CORRECT: Explicit NULL check
SELECT * FROM accounts WHERE discount_rate IS NULL;

-- 3. The Dangerous NOT IN with NULL Pitfall:
-- If any discount_rate in inactive accounts is NULL, this returns ZERO ROWS!
-- SELECT * FROM accounts WHERE discount_rate NOT IN (SELECT discount_rate FROM accounts WHERE is_verified = FALSE);

-- SAFE EQUIVALENT: Using NOT EXISTS
SELECT a.* 
FROM accounts a
WHERE NOT EXISTS (
    SELECT 1 
    FROM accounts sub 
    WHERE sub.is_verified = FALSE 
      AND sub.discount_rate = a.discount_rate
);`,
          },
          comparisonTable: {
            headers: [
              { en: 'Logical Expression', vi: 'Biểu Thức Logic' },
              { en: 'Evaluation (A = NULL)', vi: 'Kết Quả (A = NULL)' },
              { en: 'WHERE Filter Behavior', vi: 'Hành Vi Trong Mệnh Đề WHERE' },
              { en: 'Recommended Syntax', vi: 'Cú Pháp Chuẩn Được Khuyến Nghị' },
            ],
            rows: [
              {
                en: ['A = NULL', 'UNKNOWN', 'Row eliminated (evaluates to UNKNOWN)', 'A IS NULL'],
                vi: ['A = NULL', 'UNKNOWN', 'Dòng bị loại bỏ (UNKNOWN không qua lọc)', 'A IS NULL'],
              },
              {
                en: ['A <> NULL', 'UNKNOWN', 'Row eliminated (evaluates to UNKNOWN)', 'A IS NOT NULL'],
                vi: ['A <> NULL', 'UNKNOWN', 'Dòng bị loại bỏ (UNKNOWN không qua lọc)', 'A IS NOT NULL'],
              },
              {
                en: ['NOT (UNKNOWN)', 'UNKNOWN', 'Row eliminated (negation remains UNKNOWN)', 'IS DISTINCT FROM'],
                vi: ['NOT (UNKNOWN)', 'UNKNOWN', 'Dòng bị loại bỏ (phủ định vẫn là UNKNOWN)', 'IS DISTINCT FROM'],
              },
              {
                en: ['A NOT IN (subquery with NULL)', 'UNKNOWN or FALSE', 'Zero rows returned across entire query', 'WHERE NOT EXISTS (...)'],
                vi: ['A NOT IN (subquery chứa NULL)', 'UNKNOWN hoặc FALSE', 'Không trả về kết quả nào cho toàn bộ truy vấn', 'WHERE NOT EXISTS (...)'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Three-Valued Logic (3VL) Truth Flow',
              vi: 'Luồng Đánh Giá Logic 3 Giá Trị (3VL) Trong Mệnh Đề WHERE',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Evaluate Predicate', vi: 'Đánh Giá Biểu Thức' },
                description: {
                  en: 'Predicate comparisons with NULL values evaluate directly to UNKNOWN.',
                  vi: 'Mọi phép so sánh trực tiếp với NULL đều trả về giá trị UNKNOWN.',
                },
              },
              {
                number: 2,
                label: { en: 'Boolean Truth Filter', vi: 'Bộ Lọc Chân Trị Boolean' },
                description: {
                  en: 'WHERE clause strictly checks: Does predicate == TRUE? Both FALSE and UNKNOWN fail.',
                  vi: 'Mệnh đề WHERE kiểm tra nghiêm ngặt: Biểu thức có bằng TRUE không? Cả FALSE lẫn UNKNOWN đều rớt.',
                },
              },
              {
                number: 3,
                label: { en: 'Row Emission or Drop', vi: 'Phát Dòng Hoặc Loại Bỏ' },
                description: {
                  en: 'Only rows evaluating strictly to TRUE pass into downstream pipeline stages.',
                  vi: 'Chỉ các dòng đánh giá tuyệt đối đạt TRUE mới được đưa sang giai đoạn tiếp theo.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Using `NOT IN (SELECT column FROM ...)` when the subquery column contains NULLs',
                vi: 'Dùng `NOT IN (SELECT column FROM ...)` khi cột trong truy vấn con chứa giá trị NULL',
              },
              why: {
                en: '`x NOT IN (1, NULL)` expands to `x != 1 AND x != NULL`. Because `x != NULL` is UNKNOWN, the entire AND expression becomes UNKNOWN or FALSE, suppressing all rows.',
                vi: '`x NOT IN (1, NULL)` tương đương `x != 1 AND x != NULL`. Vì `x != NULL` ra UNKNOWN nên toàn bộ mệnh đề AND ra UNKNOWN, khiến toàn bộ kết quả biến mất.',
              },
              solution: {
                en: 'Always use `NOT EXISTS` or ensure `WHERE column IS NOT NULL` is present in the subquery.',
                vi: 'Luôn sử dụng `NOT EXISTS` hoặc thêm điều kiện `WHERE column IS NOT NULL` trong truy vấn con.',
              },
              codeIncorrect: `SELECT * FROM customers 
WHERE id NOT IN (SELECT customer_id FROM orders); -- Returns 0 rows if any order has NULL customer_id!`,
              codeCorrect: `SELECT c.* FROM customers c 
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
); -- Safe and high-performance!`,
            },
          ],
          bestPractices: {
            en: [
              'Declare columns NOT NULL by default unless business logic explicitly requires representing unknown values.',
              'Use IS NOT DISTINCT FROM when comparing two nullable values to treat NULLs as equal values without 3VL traps.',
              'Always enforce referential constraints via ON DELETE RESTRICT on audit trails and financial ledger relations.',
            ],
            vi: [
              'Luôn khai báo cột là NOT NULL theo mặc định trừ khi logic nghiệp vụ bắt buộc phải lưu trạng thái chưa xác định.',
              'Sử dụng IS NOT DISTINCT FROM khi so sánh hai trường có thể NULL để xử lý hai giá trị NULL bằng nhau mà không dính bẫy 3VL.',
              'Luôn áp đặt ràng buộc tham chiếu với ON DELETE RESTRICT trên các bảng kiểm toán và sổ cái tài chính.',
            ],
          },
          practicalScenario: {
            en: 'A billing pipeline computed unpaid accounts using `WHERE account_id NOT IN (SELECT account_id FROM paid_invoices)`. When a test invoice was recorded with a NULL `account_id`, the subquery returned NULL, causing the entire NOT IN clause to evaluate to UNKNOWN. Overnight billing stopped generating invoices for 18,000 customers. Replacing NOT IN with `NOT EXISTS` immediately restored invoice generation and protected the pipeline permanently.',
            vi: 'Một hệ thống thanh toán tự động tìm tài khoản chưa trả tiền bằng câu lệnh `WHERE account_id NOT IN (SELECT account_id FROM paid_invoices)`. Khi một hóa đơn thử nghiệm được nhập với `account_id` là NULL, truy vấn con chứa phần tử NULL khiến mệnh đề NOT IN đánh giá thành UNKNOWN cho mọi tài khoản. Toàn bộ tiến trình xuất hóa đơn ban đêm cho 18.000 khách hàng bị tê liệt hoàn toàn. Thay thế NOT IN bằng `NOT EXISTS` đã giải quyết sự cố tức thì và bảo vệ hệ thống vĩnh viễn.',
          },
          keyTakeaways: {
            en: [
              'Equality with NULL yields UNKNOWN; only TRUE qualifies rows in WHERE filters.',
              'Use IS NULL / IS NOT NULL or IS NOT DISTINCT FROM for reliable missing-value logic.',
              'Prefer NOT EXISTS over NOT IN when subqueries may contain null values.',
            ],
            vi: [
              'So sánh bằng với NULL luôn ra UNKNOWN; chỉ có giá trị TRUE mới qua được mệnh đề WHERE.',
              'Dùng IS NULL / IS NOT NULL hoặc IS NOT DISTINCT FROM để xử lý dữ liệu khuyết một cách an toàn.',
              'Ưu tiên dùng NOT EXISTS thay vì NOT IN khi truy vấn con có khả năng chứa giá trị NULL.',
            ],
          },
        },
      ],
    },

    // Chapter 2: SQL JOIN Types, Set Algebra & Engine Execution Plans
    {
      id: 'sql-hb-ch-2',
      number: 2,
      partNumber: 2,
      partTitle: {
        en: 'Set Operations, JOIN Algorithms & Logical Query Reasoning',
        vi: 'Phép Toán Tập Hợp, Thuật Toán JOIN & Thứ Tự Xử Lý Truy Vấn',
      },
      slug: 'sql-join-mechanics',
      title: {
        en: 'Mastering SQL JOIN Types, Set Algebra & Execution Algorithms',
        vi: 'Làm Chủ Các Phép JOIN, Đại Số Tập Hợp & Thuật Toán Thực Thi',
      },
      summary: {
        en: 'Set-theoretic foundations of INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins with Hash Join, Merge Join, and Nested Loop algorithms.',
        vi: 'Nền tảng tập hợp của INNER, LEFT, RIGHT, FULL OUTER, CROSS JOIN kết hợp phân tích thuật toán Hash Join, Merge Join và Nested Loop.',
      },
      readTimeMinutes: 16,
      sections: [
        {
          id: 'sql-hb-2-1',
          title: {
            en: 'Physical JOIN Algorithms: Hash Join, Merge Join & Nested Loop',
            vi: 'Các Thuật Toán JOIN Vật Lý: Hash Join, Merge Join & Nested Loop',
          },
          keyIdea: {
            en: 'Query planners dynamically select physical join operators based on table cardinalities, join predicates, index presence, and available working memory (work_mem).',
            vi: 'Bộ tối ưu hóa truy vấn tự động chọn toán tử JOIN vật lý dựa trên kích thước bảng, biểu thức nối, sự hiện diện của chỉ mục và bộ nhớ làm việc (work_mem).',
          },
          content: {
            en: 'While SQL allows developers to express joins declaratively (INNER, LEFT, RIGHT, FULL OUTER, CROSS), the database query optimizer translates these logical operations into physical algorithmic execution nodes. Three foundational join algorithms dominate relational database engines:\n\n1. **Nested Loop Join:** For each row in the outer relation, the engine scans the inner relation. When the inner relation has a matching index on the join key, this becomes an Indexed Nested Loop Join—the fastest method for small batches or queries with high selectivity.\n\n2. **Hash Join:** The engine scans the smaller table (the build relation) and builds an in-memory hash table on the join key. It then scans the larger table (the probe relation) once, hashing each row\'s join key to look up matches in the hash table. Hash Joins require equi-join conditions (`=`) and sufficient `work_mem` to prevent spilling to disk.\n\n3. **Merge Join:** Both relations are first sorted on the join key (or scanned via pre-sorted B-Tree indexes), after which two pointers traverse both streams concurrently in a single linear pass. Merge Joins excel when inputs are already sorted and for massive data sets where memory is insufficient for a full hash table.',
            vi: 'Mặc dù lập trình viên khai báo các phép JOIN dưới dạng biểu thức logic (INNER, LEFT, RIGHT, FULL OUTER, CROSS), bộ tối ưu hóa truy vấn (Query Optimizer) sẽ dịch chúng thành các nút thực thi thuật toán vật lý. Có ba thuật toán JOIN nền tảng trong các hệ CSDL quan hệ:\n\n1. **Nested Loop Join:** Với mỗi dòng của bảng ngoài, engine quét qua bảng trong. Khi bảng trong có sẵn chỉ mục (Index) trên cột nối, nó trở thành Indexed Nested Loop Join—đây là phương pháp nhanh nhất khi truy vấn một số lượng nhỏ các bản ghi có tính chọn lọc cao.\n\n2. **Hash Join:** Engine quét bảng nhỏ hơn (build relation) và tạo một bảng băm (hash table) trong bộ nhớ dựa trên khóa nối. Sau đó, nó quét qua bảng lớn hơn (probe relation), tính giá trị băm cho từng dòng để tra cứu kết quả khớp trong bảng băm. Hash Join chỉ áp dụng cho phép so sánh bằng (`=`) và đòi hỏi đủ `work_mem` để tránh tràn xuống đĩa (disk spill).\n\n3. **Merge Join:** Cả hai bảng trước tiên phải được sắp xếp theo khóa nối (hoặc quét qua chỉ mục B-Tree đã có thứ tự sẵn), sau đó hai con trỏ duyệt đồng thời qua cả hai luồng dữ liệu theo một lượt tuyến tính. Merge Join cực kỳ tối ưu khi dữ liệu đầu vào đã có thứ tự hoặc khi dung lượng bảng quá lớn không thể chứa hết trong RAM.',
          },
          codeBlock: {
            language: 'sql',
            filename: 'join_execution_plans.sql',
            explanation: {
              en: 'PostgreSQL EXPLAIN ANALYZE demonstration illustrating how the optimizer selects Hash Join vs Indexed Nested Loop.',
              vi: 'Minh họa EXPLAIN ANALYZE trong PostgreSQL thể hiện cách bộ tối ưu lựa chọn giữa Hash Join và Indexed Nested Loop.',
            },
            code: `-- Force Nested Loop for indexed lookups (demonstration only)
SET enable_hashjoin = off;
SET enable_mergejoin = off;

-- 1. Indexed Nested Loop: Ideal for single-customer orders lookup
EXPLAIN ANALYZE
SELECT o.id, o.total_cents, c.email
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE c.id = 1042;
-- Result: Nested Loop -> Index Scan on customers -> Index Scan on orders_customer_id_idx

-- Reset planner flags to production defaults
RESET enable_hashjoin;
RESET enable_mergejoin;

-- 2. Hash Join: Ideal for bulk equi-join across two unfiltered relations
EXPLAIN ANALYZE
SELECT o.id, o.total_cents, c.email
FROM customers c
JOIN orders o ON o.customer_id = c.id;
-- Result: Hash Join -> Hash (customers) -> Seq Scan on orders

-- 3. FULL OUTER JOIN to detect orphaned or mismatched records
SELECT 
    c.id AS customer_id, 
    c.email, 
    o.id AS order_id
FROM customers c
FULL OUTER JOIN orders o ON o.customer_id = c.id
WHERE c.id IS NULL OR o.id IS NULL;`,
          },
          comparisonTable: {
            headers: [
              { en: 'Join Operator', vi: 'Toán Tử Nối Vật Lý' },
              { en: 'Supported Predicates', vi: 'Điều Kiện Hỗ Trợ' },
              { en: 'Memory Requirement', vi: 'Yêu Cầu Bộ Nhớ (RAM)' },
              { en: 'Optimal Use Case', vi: 'Trường Hợp Tối Ưu Nhất' },
            ],
            rows: [
              {
                en: ['Nested Loop', 'Equi-join & Non-equi (<, >, BETWEEN)', 'Minimal (row-by-row buffer)', 'Outer relation has few rows; inner has B-Tree index'],
                vi: ['Nested Loop', 'So sánh bằng & không bằng (<, >, BETWEEN)', 'Tối thiểu (bộ đệm từng dòng)', 'Bảng ngoài ít dòng; bảng trong có chỉ mục B-Tree'],
              },
              {
                en: ['Hash Join', 'Equi-join strictly (=)', 'High (stores build table in work_mem)', 'Large unsorted tables with equality join conditions'],
                vi: ['Hash Join', 'Chỉ áp dụng so sánh bằng (=)', 'Cao (lưu bảng build trong work_mem)', 'Bảng lớn chưa sắp xếp với điều kiện so sánh bằng'],
              },
              {
                en: ['Merge Join', 'Equi-join strictly (=)', 'Moderate (streaming pointers)', 'Massive tables pre-sorted by index or ORDER BY'],
                vi: ['Merge Join', 'Chỉ áp dụng so sánh bằng (=)', 'Trung bình (con trỏ duyệt luồng)', 'Bảng rất lớn đã có thứ tự sắp xếp từ trước'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Hash Join Execution Flow (Build & Probe Phases)',
              vi: 'Luồng Thực Thi Phép Nối Băm (Pha Xây Dựng & Pha Quét Tra Cứu)',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Scan Build Table', vi: 'Quét Bảng Nhỏ (Build)' },
                description: {
                  en: 'The smaller relation is scanned and rows are inserted into an in-memory hash table.',
                  vi: 'Bảng nhỏ hơn được quét và các dòng được ghi vào bảng băm trong bộ nhớ RAM.',
                },
              },
              {
                number: 2,
                label: { en: 'Scan Probe Table', vi: 'Quét Bảng Lớn (Probe)' },
                description: {
                  en: 'The larger relation is streamed row by row, hashing its join key.',
                  vi: 'Bảng lớn hơn được đọc tuần tự từng dòng, tính mã băm trên cột nối.',
                },
              },
              {
                number: 3,
                label: { en: 'Emit Matched Tuples', vi: 'Xuất Dòng Khớp' },
                description: {
                  en: 'Matching entries from the hash table are paired with probe rows and emitted.',
                  vi: 'Các bản ghi trùng khớp trong bảng băm được kết hợp với dòng probe và trả về.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Joining on expression columns without an index (e.g. `ON LOWER(u.email) = LOWER(c.email)`)',
                vi: 'Nối bảng trên cột có hàm bao ngoài không có functional index (vd `ON LOWER(u.email) = LOWER(c.email)`)',
              },
              why: {
                en: 'Wrapping join columns in functions defeats B-Tree index lookups, forcing expensive full sequential scans and CPU-heavy Hash Joins.',
                vi: 'Bọc hàm quanh cột nối làm mất tác dụng của chỉ mục B-Tree, buộc cơ sở dữ liệu phải quét tuần tự toàn bảng và tốn CPU băm dữ liệu.',
              },
              solution: {
                en: 'Store normalized lowercased strings or create an explicit functional index `CREATE INDEX idx_user_lower_email ON users (LOWER(email));`.',
                vi: 'Chuẩn hóa lưu chuỗi chữ thường sẵn hoặc tạo functional index tường minh `CREATE INDEX idx_user_lower_email ON users (LOWER(email));`.',
              },
              codeIncorrect: `SELECT * FROM auth_users u 
JOIN crm_contacts c ON LOWER(u.email) = LOWER(c.email); -- Destroys index lookups!`,
              codeCorrect: `SELECT * FROM auth_users u 
JOIN crm_contacts c ON u.normalized_email = c.normalized_email; -- Leverages B-Tree index seek!`,
            },
          ],
          bestPractices: {
            en: [
              'Ensure foreign key columns in child tables are explicitly indexed to enable fast Indexed Nested Loop joins.',
              'Monitor work_mem settings in PostgreSQL to prevent Hash Joins from spilling to temporary disk files.',
              'Filter aggressively in WHERE clauses prior to joining to minimize row volume handled by join nodes.',
            ],
            vi: [
              'Luôn tạo index trên các cột khóa ngoại ở bảng con để hỗ trợ phép nối Indexed Nested Loop hiệu năng cao.',
              'Theo dõi cấu hình work_mem trong PostgreSQL để ngăn Hash Join bị tràn ra các file tạm trên ổ cứng.',
              'Lọc điều kiện sớm trong mệnh đề WHERE để giảm tối đa số dòng trước khi đưa vào các nút JOIN.',
            ],
          },
          practicalScenario: {
            en: 'An e-commerce reporting dashboard took 42 seconds to load order summaries because a join between `orders` (10M rows) and `customers` (2M rows) was executing a Hash Join that spilled 400MB to disk due to a default `work_mem = 4MB`. Tuning `work_mem = 64MB` for reporting sessions allowed the entire hash table to fit in RAM, reducing query latency from 42 seconds to 680 milliseconds.',
            vi: 'Báo cáo quản trị đơn hàng mất 42 giây để tải vì phép JOIN giữa `orders` (10 triệu dòng) và `customers` (2 triệu dòng) thực hiện Hash Join bị tràn 400MB ra đĩa do thiết lập mặc định `work_mem = 4MB`. Khi nâng `work_mem = 64MB` cho phiên làm việc báo cáo, toàn bộ bảng băm nằm trọn trong RAM, kéo độ trễ truy vấn từ 42 giây xuống còn 680 mili-giây.',
          },
          keyTakeaways: {
            en: [
              'Logical join syntax (INNER, LEFT) differs from physical engine operators (Nested Loop, Hash, Merge).',
              'Indexed Nested Loops excel for low-cardinality queries; Hash Joins excel for large batch equi-joins.',
              'Inspecting EXPLAIN ANALYZE reveals actual physical join operators and memory spill metrics.',
            ],
            vi: [
              'Cú pháp JOIN logic (INNER, LEFT) hoàn toàn độc lập với các toán tử vật lý của engine (Nested Loop, Hash, Merge).',
              'Indexed Nested Loop tối ưu khi lọc ít dòng; Hash Join tối ưu cho tập dữ liệu lớn nối bằng.',
              'Kiểm tra EXPLAIN ANALYZE giúp nhìn rõ toán tử nối thực tế và phát hiện hiện tượng tràn bộ nhớ ra đĩa.',
            ],
          },
        },
      ],
    },

    // Chapter 3: Logical Query Processing, Subqueries & CTEs
    {
      id: 'sql-hb-ch-3',
      number: 3,
      partNumber: 2,
      partTitle: {
        en: 'Set Operations, JOIN Algorithms & Logical Query Reasoning',
        vi: 'Phép Toán Tập Hợp, Thuật Toán JOIN & Thứ Tự Xử Lý Truy Vấn',
      },
      slug: 'aggregations-group-by',
      title: {
        en: 'Logical Query Processing Order, Subqueries & Common Table Expressions',
        vi: 'Thứ Tự Xử Lý Truy Vấn Logic, Truy Vấn Con & Biểu Thức Bảng Chung (CTE)',
      },
      summary: {
        en: 'The 8-step logical execution sequence, WHERE vs HAVING filtering boundaries, and correlated subqueries compared with CTE optimization.',
        vi: 'Quy trình 8 bước xử lý truy vấn logic, ranh giới lọc giữa WHERE và HAVING, cùng so sánh subquery tương quan với CTE.',
      },
      readTimeMinutes: 18,
      sections: [
        {
          id: 'sql-hb-3-1',
          title: {
            en: 'Logical Processing Order, WHERE vs HAVING & CTE Semantics',
            vi: 'Thứ Tự Xử Lý Logic, Phân Biệt WHERE vs HAVING & Ngữ Nghĩa CTE',
          },
          keyIdea: {
            en: 'SQL queries are authored out of execution order: engines evaluate FROM, WHERE, GROUP BY, and HAVING before computing SELECT column projections or aliases.',
            vi: 'Cú pháp câu lệnh SQL được viết khác với thứ tự thực thi: engine luôn chạy FROM, WHERE, GROUP BY và HAVING trước khi tính toán SELECT hoặc đặt alias cho cột.',
          },
          content: {
            en: 'One of the most common pitfalls in SQL authoring stems from the divergence between lexical order (how queries are written) and logical processing order (how engines evaluate them). The conceptual processing sequence follows eight strict phases:\n\n1. `FROM` & `JOIN`: Source relation Cartesian products and join filters are evaluated.\n2. `WHERE`: Individual candidate rows are filtered prior to any grouping.\n3. `GROUP BY`: Remaining rows are partitioned into discrete attribute groups.\n4. `HAVING`: Aggregated group conditions (e.g. `COUNT(*) > 5`) are evaluated to filter groups.\n5. `SELECT`: Projection expressions, scalar computations, and window functions are evaluated.\n6. `DISTINCT`: Duplicate projected rows are eliminated.\n7. `ORDER BY`: Results are sorted, with access to SELECT aliases.\n8. `LIMIT` / `OFFSET`: Output stream is truncated.\n\nBecause `WHERE` precedes `SELECT`, you cannot reference column aliases defined in `SELECT` inside `WHERE`. Similarly, `WHERE` cannot evaluate aggregate functions like `SUM(amount)` because grouping has not yet occurred. Common Table Expressions (`WITH ... AS (...)`) provide a declarative method to modularize intermediate results, allowing developers to structure complex transformations cleanly without deeply nested subqueries.',
            vi: 'Một trong những nguyên nhân gây lỗi phổ biến nhất khi viết SQL là sự sai lệch giữa thứ tự cú pháp (cách viết code) và thứ tự xử lý logic (cách engine tính toán). Thứ tự thực thi logic chuẩn diễn ra qua 8 giai đoạn nghiêm ngặt:\n\n1. `FROM` & `JOIN`: Xác định các bảng nguồn và thực hiện các điều kiện kết nối.\n2. `WHERE`: Lọc từng dòng dữ liệu riêng lẻ trước khi thực hiện gom nhóm.\n3. `GROUP BY`: Phân chia các dòng còn lại thành các nhóm thuộc tính riêng biệt.\n4. `HAVING`: Đánh giá các điều kiện trên hàm tổng hợp (vd `COUNT(*) > 5`) để loại bỏ nhóm.\n5. `SELECT`: Tính toán các biểu thức cột, hàm vô hướng và window functions.\n6. `DISTINCT`: Loại bỏ các dòng kết quả trùng lặp.\n7. `ORDER BY`: Sắp xếp tập kết quả, tại đây mới được phép dùng alias của SELECT.\n8. `LIMIT` / `OFFSET`: Cắt lấy số lượng dòng theo yêu cầu.\n\nChính vì `WHERE` chạy trước `SELECT`, lập trình viên không thể dùng alias được đặt trong `SELECT` tại mệnh đề `WHERE`. Tương tự, `WHERE` không thể chứa hàm tổng hợp như `SUM(amount)` vì việc gom nhóm chưa diễn ra. Biểu thức bảng chung (Common Table Expression - CTE) với cú pháp `WITH ... AS (...)` cung cấp giải pháp module hóa các kết quả trung gian, giúp truy vấn sáng sủa mà không cần lồng ghép subquery phức tạp.',
          },
          codeBlock: {
            language: 'sql',
            filename: 'logical_processing_and_ctes.sql',
            explanation: {
              en: 'Demonstrates correct separation of row filtering in WHERE, group filtering in HAVING, and modular CTE structuring.',
              vi: 'Minh họa phân định rạch ròi giữa lọc dòng trong WHERE, lọc nhóm trong HAVING và cấu trúc CTE dạng module.',
            },
            code: `-- Modular CTE computing active regional customer sales
WITH regional_sales AS (
    SELECT 
        c.region,
        c.id AS customer_id,
        COUNT(o.id) AS total_orders,
        SUM(o.total_cents) AS total_spend_cents
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    -- 1. WHERE: Filters rows BEFORE grouping (only completed orders in 2025)
    WHERE o.status = 'completed' 
      AND o.placed_at >= '2025-01-01' 
      AND o.placed_at < '2026-01-01'
    -- 2. GROUP BY: Partitions data by region and customer
    GROUP BY c.region, c.id
    -- 3. HAVING: Filters groups AFTER aggregation (only high-frequency buyers)
    HAVING COUNT(o.id) >= 10
),
ranked_customers AS (
    SELECT 
        region,
        customer_id,
        total_orders,
        total_spend_cents,
        -- Window function evaluated in SELECT phase
        DENSE_RANK() OVER (PARTITION BY region ORDER BY total_spend_cents DESC) AS regional_rank
    FROM regional_sales
)
SELECT 
    region,
    customer_id,
    total_orders,
    ROUND(total_spend_cents / 100.0, 2) AS total_spend_dollars,
    regional_rank
FROM ranked_customers
WHERE regional_rank <= 3
ORDER BY region ASC, regional_rank ASC;`,
          },
          comparisonTable: {
            headers: [
              { en: 'Feature', vi: 'Đặc Điểm' },
              { en: 'WHERE Clause', vi: 'Mệnh Đề WHERE' },
              { en: 'HAVING Clause', vi: 'Mệnh Đề HAVING' },
              { en: 'CTE (WITH clause)', vi: 'Mệnh Đề CTE (WITH)' },
            ],
            rows: [
              {
                en: ['Evaluation Timing', 'Before GROUP BY aggregation', 'After GROUP BY aggregation', 'Defined prior to main query statement'],
                vi: ['Thời điểm thực thi', 'Trước khi gom nhóm GROUP BY', 'Sau khi gom nhóm GROUP BY', 'Được định nghĩa trước câu truy vấn chính'],
              },
              {
                en: ['Filter Granularity', 'Individual source rows', 'Computed aggregate group metrics', 'Entire tabular result sets'],
                vi: ['Cấp độ lọc', 'Từng dòng bản ghi đơn lẻ', 'Các chỉ số tổng hợp của nhóm', 'Toàn bộ tập dữ liệu dạng bảng'],
              },
              {
                en: ['Index Utilization', 'High (can leverage B-Tree index range scans)', 'None (filters post-aggregation memory buckets)', 'Depends on inner CTE query indexability'],
                vi: ['Tận dụng chỉ mục', 'Cao (quét trực tiếp trên chỉ mục B-Tree)', 'Không (lọc trên bộ nhớ sau khi đã gom nhóm)', 'Phụ thuộc vào câu truy vấn bên trong CTE'],
              },
              {
                en: ['Performance Best Practice', 'Filter as much data as possible here', 'Only filter actual aggregate thresholds', 'Use for readability and query decomposition'],
                vi: ['Khuyến nghị hiệu năng', 'Lọc càng nhiều dữ liệu tại đây càng tốt', 'Chỉ dùng để lọc ngưỡng giá trị tổng hợp', 'Dùng để tăng độ sáng sủa và chia nhỏ truy vấn'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'Logical Query Processing Sequence',
              vi: 'Quy Trình Xử Lý Truy Vấn Logic Tuần Tự',
            },
            steps: [
              {
                number: 1,
                label: { en: 'FROM & JOIN', vi: 'FROM & JOIN' },
                description: {
                  en: 'Identify tables and resolve relational cross-products and join conditions.',
                  vi: 'Xác định bảng nguồn và thực hiện các điều kiện nối dữ liệu.',
                },
              },
              {
                number: 2,
                label: { en: 'WHERE', vi: 'WHERE' },
                description: {
                  en: 'Discard individual rows not satisfying the boolean predicate.',
                  vi: 'Loại bỏ các dòng không thỏa mãn biểu thức điều kiện.',
                },
              },
              {
                number: 3,
                label: { en: 'GROUP BY & HAVING', vi: 'GROUP BY & HAVING' },
                description: {
                  en: 'Aggregate rows into buckets and eliminate groups not meeting thresholds.',
                  vi: 'Gom nhóm các dòng và loại bỏ các nhóm không đạt ngưỡng tổng hợp.',
                },
              },
              {
                number: 4,
                label: { en: 'SELECT & ORDER BY', vi: 'SELECT & ORDER BY' },
                description: {
                  en: 'Evaluate projection formulas, assign aliases, sort output, and apply LIMIT.',
                  vi: 'Tính toán biểu thức cột, gán alias, sắp xếp kết quả và cắt LIMIT.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Filtering non-aggregate row conditions inside the HAVING clause',
                vi: 'Lọc điều kiện dòng thông thường bên trong mệnh đề HAVING',
              },
              why: {
                en: 'Putting `HAVING o.status = "completed"` forces the engine to group millions of canceled and pending rows before discarding them, wasting massive memory and CPU cycles.',
                vi: 'Viết `HAVING o.status = "completed"` bắt engine phải gom nhóm hàng triệu đơn hủy hoặc chờ trước khi vứt bỏ, gây lãng phí bộ nhớ và CPU.',
              },
              solution: {
                en: 'Always place row-level filters in WHERE so unneeded rows are eliminated prior to grouping.',
                vi: 'Luôn đưa các điều kiện lọc cấp dòng vào WHERE để loại bỏ dữ liệu thừa trước khi nhóm.',
              },
              codeIncorrect: `SELECT customer_id, SUM(total) 
FROM orders 
GROUP BY customer_id 
HAVING status = 'completed'; -- SEVERE PERFORMANCE PENALTY!`,
              codeCorrect: `SELECT customer_id, SUM(total) 
FROM orders 
WHERE status = 'completed' -- Filtered early via index!
GROUP BY customer_id;`,
            },
          ],
          bestPractices: {
            en: [
              'Filter aggressively in WHERE to keep memory footprint in GROUP BY minimal.',
              'Use CTEs to break complex queries into named, logical steps rather than deeply nested subqueries.',
              'Remember that modern PostgreSQL (v12+) and MySQL (v8.0.28+) inline non-recursive CTEs automatically unless declared MATERIALIZED.',
            ],
            vi: [
              'Luôn lọc tối đa trong WHERE để giữ dung lượng bộ nhớ cho GROUP BY ở mức nhỏ nhất.',
              'Dùng CTE để chia nhỏ các truy vấn phức tạp thành từng bước rõ ràng thay vì lồng nhiều lớp subquery.',
              'Lưu ý rằng PostgreSQL (từ v12) và MySQL (từ v8.0.28) tự động inline các CTE không đệ quy trừ khi gắn cờ MATERIALIZED.',
            ],
          },
          practicalScenario: {
            en: 'An analytics query generating a merchant month-end statement took 38 seconds and triggered out-of-memory errors on a replica database. Inspection showed `HAVING year = 2024` was used instead of `WHERE year = 2024`. Moving the filter to WHERE allowed the engine to use a composite index on `(year, merchant_id)`, discarding 98% of rows immediately. Query run time dropped to 140ms.',
            vi: 'Truy vấn phân tích sao kê cuối tháng của người bán mất 38 giây và gây lỗi tràn bộ nhớ trên database replica. Khi kiểm tra, câu lệnh đang dùng `HAVING year = 2024` thay vì `WHERE year = 2024`. Việc chuyển điều kiện sang WHERE giúp engine dùng chỉ mục kết hợp `(year, merchant_id)` để loại bỏ ngay 98% số dòng thừa. Thời gian chạy giảm xuống còn 140 mili-giây.',
          },
          keyTakeaways: {
            en: [
              'WHERE evaluates before grouping; HAVING evaluates after aggregation.',
              'SELECT aliases cannot be accessed in WHERE due to evaluation order.',
              'CTEs improve code readability without query plan penalties in modern database engines.',
            ],
            vi: [
              'WHERE chạy trước khi gom nhóm; HAVING chạy sau khi các hàm tổng hợp đã tính xong.',
              'Không thể dùng alias của SELECT trong WHERE do quy luật thứ tự thực thi.',
              'CTE giúp code trong sáng, dễ bảo trì mà không làm suy giảm hiệu năng trên các RDBMS hiện đại.',
            ],
          },
        },
      ],
    },

    // Chapter 4: B-Tree Indexes, SARGability & ACID Transactions
    {
      id: 'sql-hb-ch-4',
      number: 4,
      partNumber: 3,
      partTitle: {
        en: 'Index Traversal, SARGability & ACID Transaction Guarantees',
        vi: 'Cấu Trúc B-Tree, Tính SARGable & Đảm Bảo Giao Dịch ACID',
      },
      slug: 'indexes-and-transactions',
      title: {
        en: 'B-Tree Index Traversals, SARGability & ACID Transaction Boundaries',
        vi: 'Duyệt Chỉ Mục B-Tree, Tính SARGable & Ranh Giới Giao Dịch ACID',
      },
      summary: {
        en: 'B-Tree leaf page traversal mechanics, left-prefix indexing rules, non-SARGable operator pitfalls, and ACID transaction isolation guarantees.',
        vi: 'Cơ chế duyệt lá cây B-Tree, quy tắc tiền tố bên trái (leftmost prefix), cạm bẫy non-SARGable và các đảm bảo cô lập giao dịch ACID.',
      },
      readTimeMinutes: 19,
      sections: [
        {
          id: 'sql-hb-4-1',
          title: {
            en: 'B-Tree Search Mechanics, SARGability & Transaction Boundaries',
            vi: 'Cơ Chế Tìm Kiếm B-Tree, Truy Vấn SARGable & Ranh Giới Giao Dịch',
          },
          keyIdea: {
            en: 'SARGable predicates enable storage engines to perform direct O(log N) B-Tree root-to-leaf index seeks, whereas non-SARGable expressions force complete table scans.',
            vi: 'Điều kiện SARGable cho phép storage engine thực hiện tìm kiếm trực tiếp trên cây B-Tree với độ phức tạp O(log N), trong khi biểu thức non-SARGable buộc phải quét toàn bảng.',
          },
          content: {
            en: 'A B-Tree (Balanced Tree) index organizes table keys in sorted hierarchical node pages (Root -> Branch -> Leaf). The leaf pages form a doubly linked list, enabling rapid range scans. When a query submits a SARGable (Search Argument Able) predicate (e.g. `WHERE created_at >= \'2025-01-01\' AND created_at < \'2025-02-01\'`), the engine descends the tree in $O(\\log N)$ I/O operations directly to the first qualifying leaf page, then traverses sequentially. Conversely, non-SARGable patterns—such as leading wildcards (`LIKE \'%apple\'`), wrapping columns in functions (`WHERE YEAR(created_at) = 2025`), or implicit type conversions (`WHERE phone_number = 12345` on a VARCHAR column)—prevent tree descent, degrading execution to an $O(N)$ full table scan.\n\nAt the data safety boundary, ACID guarantees ensure system reliability: Atomicity ensures all statements commit or none do; Consistency maintains constraints across transitions; Isolation governs visibility among concurrent threads (Read Committed, Repeatable Read, Serializable); and Durability guarantees committed mutations survive power loss via Write-Ahead Logging (WAL). Understanding transaction scope and holding locks for the shortest possible duration prevents database deadlocks and connection pool exhaustion.',
            vi: 'Chỉ mục B-Tree (Balanced Tree) tổ chức các khóa theo các trang node phân cấp có thứ tự (Root -> Branch -> Leaf). Các trang lá (Leaf Pages) liên kết với nhau thành danh sách liên kết đôi, cho phép quét phạm vi cực nhanh. Khi truy vấn gửi một điều kiện SARGable (Search Argument Able) (ví dụ `WHERE created_at >= \'2025-01-01\' AND created_at < \'2025-02-01\'`), engine chỉ mất $O(\\log N)$ lượt I/O để đi từ gốc đến đúng trang lá đầu tiên, rồi duyệt tuần tự các dòng tiếp theo. Ngược lại, các mẫu non-SARGable—như ký tự đại diện ở đầu (`LIKE \'%apple\'`), bọc hàm quanh cột (`WHERE YEAR(created_at) = 2025`), hoặc ép kiểu ngầm định (`WHERE phone_number = 12345` trên cột VARCHAR)—khiến engine không thể duyệt cây, buộc phải quét tuần tự toàn bộ bảng với chi phí $O(N)$.\n\nVề mặt an toàn dữ liệu, các đảm bảo ACID giữ cho hệ thống luôn chính xác: Tính nguyên tử (Atomicity) đảm bảo toàn bộ lệnh thành công hoặc hoàn tác toàn bộ; Nhất quán (Consistency) bảo vệ các ràng buộc dữ liệu; Cô lập (Isolation) quản lý tầm nhìn giữa các giao dịch chạy đồng thời (Read Committed, Repeatable Read, Serializable); và Bền vững (Durability) cam kết dữ liệu đã commit sẽ không mất khi sập nguồn nhờ cơ chế ghi nhật ký trước (Write-Ahead Log - WAL). Hiểu rõ phạm vi giao dịch và giải phóng khóa càng nhanh càng tốt là chìa khóa chống deadlock và nghẽn connection pool.',
          },
          codeBlock: {
            language: 'sql',
            filename: 'sargability_and_transactions.sql',
            explanation: {
              en: 'Demonstrates SARGable vs non-SARGable query syntax, composite indexing, and explicit transaction boundaries.',
              vi: 'Minh họa cú pháp SARGable so với non-SARGable, chỉ mục kết hợp và ranh giới giao dịch an toàn.',
            },
            code: `-- 1. Composite Index on (tenant_id, status, created_at)
CREATE INDEX idx_orders_composite 
ON orders (tenant_id, status, created_at);

-- NON-SARGABLE (SLOW): Function on column prevents B-Tree index seek
SELECT * FROM orders 
WHERE DATE(created_at) = '2025-03-15';

-- SARGABLE (FAST): Direct range boundary allows O(log N) tree descent
SELECT * FROM orders 
WHERE created_at >= '2025-03-15 00:00:00+00' 
  AND created_at < '2025-03-16 00:00:00+00';

-- 2. ACID Transaction Boundary: Account Transfer Pattern
BEGIN;

-- Lock the source account row explicitly to prevent concurrent double-spending
SELECT balance_cents 
FROM bank_accounts 
WHERE id = 101 
FOR UPDATE;

-- Deduct from sender
UPDATE bank_accounts 
SET balance_cents = balance_cents - 50000 
WHERE id = 101 AND balance_cents >= 50000;

-- Check affected rows; if 0, raise error and rollback
-- Add to recipient
UPDATE bank_accounts 
SET balance_cents = balance_cents + 50000 
WHERE id = 202;

-- Record audit ledger entry
INSERT INTO transfer_logs (from_account_id, to_account_id, amount_cents)
VALUES (101, 202, 50000);

COMMIT;`,
          },
          comparisonTable: {
            headers: [
              { en: 'Predicate Pattern', vi: 'Dạng Biểu Thức' },
              { en: 'SARGable Status', vi: 'Trạng Thái SARGable' },
              { en: 'Index Operation', vi: 'Thao Tác Chỉ Mục' },
              { en: 'Engine Complexity', vi: 'Độ Phức Tạp' },
            ],
            rows: [
              {
                en: ['col = \'val\' OR col >= 10', 'SARGable', 'B-Tree Index Seek (Direct point/range traversal)', 'O(log N)'],
                vi: ['col = \'val\' HOẶC col >= 10', 'SARGable', 'B-Tree Index Seek (Duyệt điểm hoặc dải trực tiếp)', 'O(log N)'],
              },
              {
                en: ['col LIKE \'prefix%\'', 'SARGable', 'B-Tree Index Range Seek from \'prefix\' bound', 'O(log N) + Range scan'],
                vi: ['col LIKE \'prefix%\'', 'SARGable', 'B-Tree Range Seek từ biên tiền tố', 'O(log N) + Quét dải'],
              },
              {
                en: ['col LIKE \'%suffix\'', 'Non-SARGable', 'Full Index or Table Scan (Leading wildcard)', 'O(N)'],
                vi: ['col LIKE \'%suffix\'', 'Non-SARGable', 'Quét toàn bộ index hoặc toàn bảng (Wildcard ở đầu)', 'O(N)'],
              },
              {
                en: ['UPPER(col) = \'VALUE\'', 'Non-SARGable (without expression index)', 'Full Table Scan across all rows', 'O(N)'],
                vi: ['UPPER(col) = \'VALUE\'', 'Non-SARGable (nếu thiếu functional index)', 'Quét toàn bảng kiểm tra từng dòng', 'O(N)'],
              },
            ],
          },
          diagram: {
            title: {
              en: 'B-Tree Index Traversal Architecture',
              vi: 'Cấu Trúc Duyệt Cây Chỉ Mục B-Tree Từ Gốc Đến Lá',
            },
            steps: [
              {
                number: 1,
                label: { en: 'Root Page Evaluation', vi: 'Đánh Giá Trang Gốc (Root)' },
                description: {
                  en: 'Engine inspects key boundaries in the root page to choose appropriate branch.',
                  vi: 'Engine so khớp giá trị tìm kiếm với các khóa biên tại trang gốc để chọn nhánh.',
                },
              },
              {
                number: 2,
                label: { en: 'Branch Descent', vi: 'Duyệt Trang Nhánh (Branch)' },
                description: {
                  en: 'Descends branch levels using binary search in logarithmic time.',
                  vi: 'Duyệt qua các cấp nhánh trung gian bằng thuật toán tìm kiếm nhị phân.',
                },
              },
              {
                number: 3,
                label: { en: 'Leaf Page Seek & Scan', vi: 'Tìm Trang Lá & Quét Tuần Tự' },
                description: {
                  en: 'Reaches target leaf node, retrieves row pointers, and follows sibling links.',
                  vi: 'Chạm đến trang lá đích, đọc con trỏ dòng (TID) và quét qua liên kết lá kế tiếp.',
                },
              },
            ],
          },
          commonMistakes: [
            {
              mistake: {
                en: 'Violating the Leftmost Prefix Rule on composite indexes',
                vi: 'Vi phạm quy tắc tiền tố bên trái (Leftmost Prefix) trên index kết hợp',
              },
              why: {
                en: 'An index on `(tenant_id, status, created_at)` cannot be used for an index seek if the query filters only on `status` or `created_at` without providing `tenant_id`.',
                vi: 'Chỉ mục tạo trên `(tenant_id, status, created_at)` không thể dùng để seek nếu truy vấn chỉ lọc trên `status` hoặc `created_at` mà không cung cấp `tenant_id`.',
              },
              solution: {
                en: 'Order composite index columns from highest equality filtering selectivity to range columns, or create secondary indexes for alternative query paths.',
                vi: 'Sắp xếp các cột trong index kết hợp theo thứ tự: cột lọc bằng phổ biến nhất đứng trước, cột dải đứng sau; hoặc tạo index phụ riêng biệt.',
              },
              codeIncorrect: `-- Index is on (tenant_id, status, created_at)
SELECT * FROM orders WHERE status = 'shipped'; -- CANNOT SEEK! Full table scan!`,
              codeCorrect: `-- Supplies leftmost prefix column first
SELECT * FROM orders WHERE tenant_id = 42 AND status = 'shipped'; -- Fast index seek!`,
            },
          ],
          bestPractices: {
            en: [
              'Write date and timestamp range filters using open-closed intervals (`>= start AND < end`) to remain SARGable.',
              'Keep database transactions as short as possible; never make network calls or external API requests inside an open transaction.',
              'Create functional indexes for mandatory case-insensitive searches (e.g. `CREATE INDEX ON users (LOWER(email))`).',
            ],
            vi: [
              'Viết điều kiện ngày tháng theo dạng khoảng nửa đóng nửa mở (`>= start AND < end`) để bảo đảm tính SARGable.',
              'Giữ thời gian mở transaction càng ngắn càng tốt; tuyệt đối không gọi API bên ngoài khi đang mở transaction.',
              'Tạo functional index cho các trường tìm kiếm không phân biệt hoa thường (ví dụ `CREATE INDEX ON users (LOWER(email))`).',
            ],
          },
          practicalScenario: {
            en: 'A fintech payment gateway suffered high database CPU and sporadic deadlocks during flash sale spikes. Analysis revealed that an authentication API was holding a transaction open while calling a third-party SMS verification service taking 2.5 seconds. Other concurrent transfers locking the same user account accumulated in lock queues. Moving the external SMS call outside the database transaction resolved 100% of deadlocks and cut connection pool usage by 85%.',
            vi: 'Cổng thanh toán tài chính bị quá tải CPU và xuất hiện deadlock liên tục trong giờ cao điểm khuyến mãi. Phân tích log phát hiện API xác thực đang giữ transaction cơ sở dữ liệu mở trong khi chờ gọi dịch vụ gửi tin nhắn SMS bên ngoài mất tới 2,5 giây. Các giao dịch khác cần cập nhật tài khoản người dùng này bị dồn ứ trong hàng đợi khóa. Chuyển thao tác gửi SMS ra ngoài transaction đã triệt tiêu hoàn toàn deadlock và giảm 85% tải trên connection pool.',
          },
          keyTakeaways: {
            en: [
              'SARGable predicates enable O(log N) B-Tree seeks; non-SARGable predicates cause O(N) table scans.',
              'Composite indexes require queries to filter on the leftmost columns to enable index seeks.',
              'Keep transactions scoped strictly to database operations to prevent lock contention and deadlocks.',
            ],
            vi: [
              'Điều kiện SARGable cho phép seek B-Tree với tốc độ O(log N); điều kiện non-SARGable gây quét toàn bảng O(N).',
              'Chỉ mục kết hợp đòi hỏi truy vấn phải lọc trên các cột tiền tố bên trái để kích hoạt index seek.',
              'Chỉ giữ transaction trong phạm vi thao tác cơ sở dữ liệu để ngăn ngừa tranh chấp khóa và deadlock.',
            ],
          },
        },
      ],
    },
  ],
};
