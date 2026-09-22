import { Book } from '../types';
import {
  SQL_DEFINITIONS_BOOK,
  SQL_QUERY_PATTERNS_BOOK,
  SQL_COMMON_ERRORS_BOOK,
  SQL_BEST_PRACTICES_BOOK,
} from './migrated';

export const SQL_EBOOKS: Book[] = [
  // 1. SQL Handbook
  {
    id: 'sql-handbook',
    slug: 'sql-handbook',
    title: 'SQL Handbook',
    subtitle: {
      en: 'Relational Model, Standard Query Language & Execution Engines',
      vi: 'Mô Hình Quan Hệ, Ngôn Ngữ Truy Vấn Chuẩn & Engine Thực Thi',
    },
    bookType: 'Handbook',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '40 mins',
    chaptersCount: 3,
    publishedDate: '2025-02-10',
    accentColor: 'from-blue-600 to-indigo-800',
    tags: ['SQL', 'Relational Model', 'PostgreSQL', 'DBMS'],
    description: {
      en: 'Comprehensive reference handbook covering relational algebra, DDL/DML standards, JOIN mechanics, and subquery execution.',
      vi: 'Cẩm nang tra cứu toàn diện về đại số quan hệ, chuẩn DDL/DML, cơ chế JOIN và thực thi subquery trong cơ sở dữ liệu quan hệ.',
    },
    prerequisites: {
      en: ['Basic database concepts'],
      vi: ['Khái niệm cơ sở dữ liệu cơ bản'],
    },
    outcomes: {
      en: ['Understand relational schema constraints', 'Master INNER, LEFT, RIGHT, and FULL OUTER JOINs'],
      vi: ['Nắm vững các ràng buộc schema quan hệ', 'Làm chủ các phép JOIN: INNER, LEFT, RIGHT, FULL OUTER'],
    },
    chapters: [
      {
        id: 'sql-hb-ch-1',
        number: 1,
        slug: 'relational-model-and-ddl',
        title: {
          en: 'Relational Model & DDL Schema Definitions',
          vi: 'Mô Hình Quan Hệ & Định Nghĩa Schema Với DDL',
        },
        summary: {
          en: 'Primary keys, foreign keys, cascading deletion rules, and schema constraints for relational data integrity.',
          vi: 'Khóa chính, khóa ngoại, quy tắc xóa cascade và các ràng buộc schema bảo toàn tính toàn vẹn dữ liệu.',
        },
        readTimeMinutes: 14,
        sections: [
          {
            id: 'sql-hb-1-1',
            title: {
              en: 'Primary Keys, Foreign Keys & Referential Integrity',
              vi: 'Khóa Chính, Khóa Ngoại & Tính Toàn Vẹn Tham Chiếu',
            },
            keyIdea: {
              en: 'Referential integrity is guaranteed at the database engine level via declarative foreign key constraints, eliminating orphan records and invalid relational states.',
              vi: 'Tính toàn vẹn tham chiếu được đảm bảo ở tầng engine cơ sở dữ liệu thông qua ràng buộc khóa ngoại khai báo, loại bỏ hoàn toàn các bản ghi mồ côi và trạng thái quan hệ sai lệch.',
            },
            content: {
              en: 'In relational database management systems (RDBMS), data integrity relies on primary and foreign key constraints. A Primary Key (PK) enforces uniqueness and non-nullability across table rows, serving as the physical clustered index in storage engines like InnoDB or a standard unique B-Tree in PostgreSQL. Foreign Keys (FK) establish referential relationships between child and parent tables, ensuring that child rows cannot point to non-existent parent records. When designing relational schemas, engineers choose cascading actions on parent mutations: ON DELETE CASCADE automatically removes dependent records, ON DELETE RESTRICT (or NO ACTION) halts the transaction with a violation error, and ON DELETE SET NULL decouples child records by setting the foreign key to NULL.',
              vi: 'Trong các hệ quản trị cơ sở dữ liệu quan hệ (RDBMS), tính toàn vẹn dữ liệu dựa vào các ràng buộc khóa chính và khóa ngoại. Khóa chính (Primary Key - PK) bắt buộc tính duy nhất và không được phép mang giá trị NULL, đóng vai trò là clustered index vật lý trong InnoDB hoặc B-Tree duy nhất trong PostgreSQL. Khóa ngoại (Foreign Key - FK) thiết lập mối quan hệ tham chiếu giữa bảng con và bảng cha, đảm bảo các dòng con không thể trỏ tới bản ghi cha không tồn tại. Khi thiết kế schema, kỹ sư lựa chọn hành vi cascading khi bản ghi cha bị sửa/xóa: ON DELETE CASCADE tự động xóa dữ liệu phụ thuộc, ON DELETE RESTRICT (hoặc NO ACTION) dừng giao dịch và báo lỗi vi phạm, còn ON DELETE SET NULL gỡ liên kết bằng cách gán khóa ngoại thành NULL.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'schema_constraints.sql',
              explanation: {
                en: 'Defines an enterprise e-commerce schema with explicit surrogate primary keys, strict foreign key constraints, CHECK validation, and ON DELETE actions.',
                vi: 'Định nghĩa schema thương mại điện tử với khóa chính surrogate rõ ràng, ràng buộc khóa ngoại nghiêm ngặt, kiểm tra CHECK và hành vi ON DELETE.',
              },
              code: `CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subdomain VARCHAR(63) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'suspended', 'pending')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_tenant_email UNIQUE (tenant_id, email)
);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    tenant_id UUID NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    total_cents BIGINT NOT NULL CHECK (total_cents >= 0),
    placed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);`,
            },
            comparisonTable: {
              headers: [
                { en: 'Constraint Rule', vi: 'Quy Tắc Ràng Buộc' },
                { en: 'On Parent Delete', vi: 'Khi Bản Ghi Cha Bị Xóa' },
                { en: 'Performance Impact', vi: 'Tác Động Hiệu Năng' },
                { en: 'Recommended Use Case', vi: 'Trường Hợp Khuyên Dùng' },
              ],
              rows: [
                {
                  en: ['CASCADE', 'Child records automatically deleted', 'High lock overhead on cascading trees', 'Dependent child entities (e.g., order_items of an order)'],
                  vi: ['CASCADE', 'Tự động xóa các bản ghi con', 'Chi phí lock cao nếu cây phụ thuộc sâu', 'Thực thể phụ thuộc chặt (ví dụ: order_items của order)'],
                },
                {
                  en: ['RESTRICT / NO ACTION', 'Aborts mutation with foreign key error', 'Fast check via foreign key index', 'Audit-critical entities (e.g., cannot delete user with existing invoices)'],
                  vi: ['RESTRICT / NO ACTION', 'Hủy thao tác và báo lỗi khóa ngoại', 'Kiểm tra nhanh nhờ index trên khóa ngoại', 'Dữ liệu kiểm toán (không thể xóa tài khoản đã có hóa đơn tài chính)'],
                },
                {
                  en: ['SET NULL', 'Child foreign key set to NULL', 'Requires nullable FK column', 'Optional ownership (e.g., reassigning unassigned support tickets)'],
                  vi: ['SET NULL', 'Cột khóa ngoại ở bảng con chuyển thành NULL', 'Yêu cầu cột FK cho phép mang giá trị NULL', 'Sở hữu tùy chọn (ví dụ: gỡ assignee khỏi ticket hỗ trợ)'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Referential Integrity & Cascading Execution Flow',
                vi: 'Luồng Thực Thi Toàn Vẹn Tham Chiếu & Cascading',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Client Delete Command', vi: 'Lệnh Xóa Từ Client' },
                  description: {
                    en: 'Client executes DELETE FROM users WHERE id = 101 within an open transaction.',
                    vi: 'Client thực thi DELETE FROM users WHERE id = 101 trong giao dịch mở.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Constraint Verification', vi: 'Kiểm Tra Ràng Buộc' },
                  description: {
                    en: 'Engine inspects all incoming foreign keys referencing users(id).',
                    vi: 'Engine kiểm tra mọi khóa ngoại từ các bảng khác đang trỏ tới users(id).',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Action Branching', vi: 'Phân Nhánh Hành Vi' },
                  description: {
                    en: 'If child row has RESTRICT, rollback occurs. If CASCADE, dependent child rows are locked and deleted.',
                    vi: 'Nếu gặp RESTRICT, giao dịch bị hủy ngay. Nếu gặp CASCADE, các dòng con phụ thuộc sẽ bị khóa và xóa.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'WAL Commit & Clean State', vi: 'Ghi WAL & Hoàn Tất' },
                  description: {
                    en: 'All atomic modifications are flushed to the Write-Ahead Log ensuring referential consistency.',
                    vi: 'Mọi thay đổi nguyên tử được ghi vào Write-Ahead Log, đảm bảo tính nhất quán toàn vẹn.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Forgetting to index foreign key columns in child tables',
                  vi: 'Quên tạo index cho các cột khóa ngoại ở bảng con',
                },
                why: {
                  en: 'While primary keys are automatically indexed, foreign key columns are NOT indexed by default. Deleting a parent row forces a sequential full table scan on the child table to verify no dependent rows exist.',
                  vi: 'Trong khi khóa chính tự động có index, cột khóa ngoại thì KHÔNG được đánh index mặc định. Khi xóa bản ghi cha, database phải quét tuần tự toàn bộ bảng con (Seq Scan) để kiểm tra.',
                },
                solution: {
                  en: 'Explicitly add a B-Tree index on all child foreign key columns: CREATE INDEX idx_orders_user_id ON orders(user_id);',
                  vi: 'Chủ động tạo B-Tree index trên tất cả các cột khóa ngoại con: CREATE INDEX idx_orders_user_id ON orders(user_id);',
                },
                codeIncorrect: `-- No index on foreign key column:
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE RESTRICT
);
-- Parent row deletions trigger full table scan on orders!`,
                codeCorrect: `CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE RESTRICT
);
-- Crucial: Index the child foreign key column
CREATE INDEX idx_orders_user_id ON orders(user_id);`,
              },
            ],
            practicalScenario: {
              en: 'In a multi-tenant SaaS application, user accounts and customer orders share a tenant_id. Using ON DELETE CASCADE on tenant_id ensures that when a tenant cancels their subscription and is purged, all associated users, orders, and telemetry records are cleanly removed in a single transaction without manual multi-table script coordination.',
              vi: 'Trong hệ thống SaaS đa người thuê (multi-tenant), tài khoản người dùng và đơn hàng đều có tenant_id. Cấu hình ON DELETE CASCADE trên tenant_id đảm bảo khi hủy và xóa một khách hàng doanh nghiệp, toàn bộ dữ liệu người dùng, đơn hàng và nhật ký liên quan được dọn dẹp sạch sẽ trong 1 transaction mà không cần viết script xóa từng bảng thủ công.',
            },
            bestPractices: {
              en: [
                'Always create explicit B-Tree indexes on every foreign key column to prevent full table scans during parent row deletions.',
                'Use UUIDv7 or BIGSERIAL for primary keys over natural keys to isolate schema relationships from business rule changes.',
                'Enforce column constraints (NOT NULL, CHECK, UNIQUE) at the database layer instead of trusting application validation alone.',
              ],
              vi: [
                'Luôn tạo B-Tree index tường minh trên mọi cột khóa ngoại để tránh quét toàn bộ bảng khi bản ghi cha bị xóa.',
                'Ưu tiên dùng UUIDv7 hoặc BIGSERIAL làm khóa chính thay vì dùng khóa tự nhiên nhằm cách ly schema khỏi sự thay đổi nghiệp vụ.',
                'Bắt buộc các ràng buộc cột (NOT NULL, CHECK, UNIQUE) trực tiếp ở tầng cơ sở dữ liệu thay vì chỉ dựa vào code ứng dụng.',
              ],
            },
            keyTakeaways: {
              en: [
                'Primary keys enforce identity; foreign keys enforce relational consistency.',
                'ON DELETE RESTRICT is safest for financial and operational records.',
                'Unindexed foreign keys are one of the most common causes of unexplained database lock escalations.',
              ],
              vi: [
                'Khóa chính đảm bảo định danh; khóa ngoại đảm bảo tính nhất quán quan hệ.',
                'ON DELETE RESTRICT là lựa chọn an toàn nhất cho dữ liệu tài chính và nghiệp vụ cốt lõi.',
                'Khóa ngoại thiếu index là nguyên nhân hàng đầu gây nghẽn lock và sụt giảm hiệu năng database.',
              ],
            },
          },
        ],
      },
      {
        id: 'sql-hb-ch-2',
        number: 2,
        slug: 'sql-join-mechanics',
        title: {
          en: 'Mastering SQL JOIN Types & Set Algebra',
          vi: 'Làm Chủ Các Phép JOIN & Đại Số Tập Hợp',
        },
        summary: {
          en: 'Nested Loop, Hash Join, and Merge Join execution strategies in relational query planners.',
          vi: 'Các chiến lược thực thi Nested Loop, Hash Join và Merge Join trong bộ lập kế hoạch truy vấn.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'sql-hb-2-1',
            title: {
              en: 'Hash Join vs Nested Loop Execution',
              vi: 'Hash Join vs Nested Loop Trong Query Engine',
            },
            keyIdea: {
              en: 'Query planners dynamically select join operators based on table cardinalities, available indexes, and work_mem limits to balance CPU and disk I/O.',
              vi: 'Bộ tối ưu hóa truy vấn tự động chọn phương thức join dựa trên kích thước bảng, index sẵn có và giới hạn work_mem để cân đối giữa CPU và I/O đĩa.',
            },
            content: {
              en: 'When the database engine executes an inner or outer join, it translates relational algebra into one of three physical join algorithms: Nested Loop Join, Hash Join, or Merge Join. A Nested Loop Join iterates over the outer relation and looks up matching rows in the inner relation; when an index exists on the inner relation join key, it is extremely fast for small result sets. A Hash Join reads the smaller relation into an in-memory hash table (the Build phase) and then streams the larger relation against it (the Probe phase); it requires no indexes and excels at large, unsorted sets, but is constrained by memory (work_mem). A Merge Join sorts both relations on the join key (if not already sorted by an index) and walks both inputs sequentially like a zipper.',
              vi: 'Khi database thực thi phép inner hoặc outer join, engine chuyển đổi đại số quan hệ thành 1 trong 3 cơ chế thực thi vật lý: Nested Loop Join, Hash Join hoặc Merge Join. Nested Loop Join lặp qua từng dòng của bảng ngoài và tìm dòng khớp trên bảng trong; khi bảng trong có index trên khóa join, nó chạy cực nhanh cho tập kết quả nhỏ. Hash Join đọc bảng nhỏ hơn vào bảng băm trong bộ nhớ (giai đoạn Build) rồi duyệt luồng bảng lớn qua bảng băm (giai đoạn Probe); nó không cần index và xử lý dữ liệu lớn chưa sắp xếp rất tốt, nhưng tiêu tốn work_mem. Merge Join sắp xếp cả hai bảng theo khóa join và duyệt đồng thời hai con trỏ tuần tự như khóa kéo.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'join_explain.sql',
              explanation: {
                en: 'Illustrates how the query optimizer selects between Hash Join and Nested Loop depending on result set size and index availability.',
                vi: 'Minh họa cách bộ tối ưu hóa truy vấn chọn giữa Hash Join và Nested Loop tùy theo kích thước tập kết quả và index có sẵn.',
              },
              code: `-- Query 1: Targeted lookup using Nested Loop with Index Scan
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.email, o.id, o.total_cents
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE u.id = 45892;

-- Query 2: Large batch join using in-memory Hash Join
EXPLAIN (ANALYZE, BUFFERS)
SELECT u.status, SUM(o.total_cents) AS gross_revenue
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.placed_at >= '2025-01-01'
GROUP BY u.status;`,
            },
            comparisonTable: {
              headers: [
                { en: 'Join Operator', vi: 'Cơ Chế Join' },
                { en: 'Index Prerequisite', vi: 'Yêu Cầu Index' },
                { en: 'Memory Footprint', vi: 'Bộ Nhớ Tiêu Thụ' },
                { en: 'Optimal Data Profile', vi: 'Hồ Sơ Dữ Liệu Tối Ưu' },
              ],
              rows: [
                {
                  en: ['Nested Loop (with Index)', 'Requires B-Tree on inner relation join key', 'O(1) minimal memory', 'Small outer row count (<1000 rows) with direct index lookup'],
                  vi: ['Nested Loop (có Index)', 'Cần B-Tree trên khóa join bảng trong', 'O(1) tiêu tốn rất ít RAM', 'Bảng ngoài ít dòng (<1000 dòng) kết hợp seek index trực tiếp'],
                },
                {
                  en: ['Hash Join', 'No index required', 'Proportional to inner relation size (work_mem)', 'Large unsorted datasets with equality predicates (=)'],
                  vi: ['Hash Join', 'Không yêu cầu index', 'Tỉ lệ thuận kích thước bảng nhỏ (work_mem)', 'Dữ liệu lớn chưa sắp xếp với điều kiện so bằng (=)'],
                },
                {
                  en: ['Merge Join', 'Benefits from pre-sorted indexes', 'Low memory once inputs are sorted', 'Both relations are pre-sorted or very large (avoids memory overflow)'],
                  vi: ['Merge Join', 'Hưởng lợi khi dữ liệu đã sắp xếp sẵn theo index', 'Tốn ít RAM nếu hai đầu vào đã sort', 'Hai bảng đều đã sắp xếp hoặc kích thước khổng lồ vượt quá RAM'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Hash Join Two-Phase Execution Pipeline',
                vi: 'Quy Trình 2 Giai Đoạn Của Phép Hash Join',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Card Estimation & Selection', vi: 'Ước Lượng Kích Thước' },
                  description: {
                    en: 'Planner selects the smaller dataset as the inner relation to minimize hash table size.',
                    vi: 'Bộ lập kế hoạch chọn bảng có kích thước nhỏ hơn làm bảng trong để tối thiểu dung lượng bảng băm.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Build Phase (RAM)', vi: 'Giai Đoạn Build (Bộ Nhớ)' },
                  description: {
                    en: 'Engine scans inner relation and builds an in-memory hash table keyed by join column.',
                    vi: 'Engine quét bảng trong và dựng bảng băm trong bộ nhớ RAM theo khóa join.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Probe Phase (Stream)', vi: 'Giai Đoạn Probe (Duyệt Luồng)' },
                  description: {
                    en: 'Engine sequentially streams outer relation, hashing each row key to check for matches.',
                    vi: 'Engine duyệt tuần tự bảng ngoài, băm khóa từng dòng để tra cứu tức thì trên bảng băm.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Output Materialization', vi: 'Xuất Kết Quả Ghép' },
                  description: {
                    en: 'Matched rows are combined and passed upward to the parent execution node.',
                    vi: 'Các dòng khớp được kết hợp và chuyển tiếp lên node xử lý phía trên của cây truy vấn.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Using non-equality operators (<, >, LIKE) and expecting a Hash Join',
                  vi: 'Dùng toán tử bất đẳng thức (<, >, LIKE) và kỳ vọng dùng Hash Join',
                },
                why: {
                  en: 'Hash tables operate strictly on hash equivalence (=). When joining with inequality predicates (e.g., ON a.val BETWEEN b.low AND b.high), the engine is forced into a costly cartesian Nested Loop without index seek.',
                  vi: 'Bảng băm chỉ hoạt động với phép so sánh bằng (=). Khi join với điều kiện khoảng (ví dụ: ON a.val BETWEEN b.low AND b.high), engine bị ép dùng Nested Loop kiểu tích Descartes vô cùng chậm.',
                },
                solution: {
                  en: 'For range joins, use range types with GiST indexes in PostgreSQL, or restructure logic using window functions.',
                  vi: 'Với phép join theo khoảng, sử dụng kiểu dữ liệu range với GiST index trong PostgreSQL hoặc tái cấu trúc bằng window functions.',
                },
              },
            ],
            practicalScenario: {
              en: 'An e-commerce reporting dashboard queries 5 million historic orders joined against 20,000 active customer records. A Hash Join builds the customer hash table in 15ms and streams orders through it in 180ms. If memory limit work_mem is set too low (< 4MB), the hash table spills to temporary disk files (Batch 2+), multiplying execution time tenfold.',
              vi: 'Báo cáo bán hàng truy vấn 5 triệu đơn hàng kết hợp với 20.000 khách hàng. Phép Hash Join dựng bảng băm khách hàng trong 15ms và duyệt qua 5 triệu đơn trong 180ms. Nếu thông số work_mem bị đặt quá thấp (< 4MB), bảng băm bị tràn xuống đĩa cứng (Batch 2+), khiến thời gian truy vấn tăng gấp 10 lần.',
            },
            bestPractices: {
              en: [
                'Ensure work_mem is configured adequately (e.g., 16MB-64MB) to prevent large Hash Joins from spilling to disk.',
                'Use INNER JOIN instead of LEFT JOIN when records on the right side must exist; this gives the optimizer freedom to reorder join trees.',
                'Inspect EXPLAIN (BUFFERS) to detect whether Hash Join memory was exceeded into multiple batches.',
              ],
              vi: [
                'Cấu hình work_mem phù hợp (ví dụ 16MB-64MB) để tránh việc bảng băm tràn ra file tạm trên ổ đĩa.',
                'Ưu tiên dùng INNER JOIN thay vì LEFT JOIN khi dữ liệu bảng phải bắt buộc có; điều này giúp optimizer tự do đảo thứ tự join.',
                'Kiểm tra lệnh EXPLAIN (BUFFERS) để phát hiện xem Hash Join có bị tràn sang nhiều batch ổ đĩa hay không.',
              ],
            },
            keyTakeaways: {
              en: [
                'Nested Loop is optimal for targeted index lookups; Hash Join dominates bulk set operations.',
                'Hash Joins only work with equality conditions (a.id = b.id).',
                'Join performance is strongly tied to accurate catalog statistics and memory allocations.',
              ],
              vi: [
                'Nested Loop tối ưu cho tìm kiếm đích danh có index; Hash Join thống trị xử lý tập dữ liệu lớn.',
                'Hash Join chỉ áp dụng được với điều kiện so sánh bằng.',
                'Hiệu năng join phụ thuộc mật thiết vào thống kê catalog chính xác và cấu hình bộ nhớ.',
              ],
            },
          },
        ],
      },
      {
        id: 'sql-hb-ch-3',
        number: 3,
        slug: 'aggregations-group-by',
        title: {
          en: 'Aggregations, GROUP BY & HAVING Filters',
          vi: 'Gom Nhóm Aggregation, GROUP BY & Bộ Lọc HAVING',
        },
        summary: {
          en: 'Logical query processing order, row filtering versus group filtering, and aggregate optimization.',
          vi: 'Thứ tự xử lý truy vấn logic, lọc dòng đơn so với lọc nhóm và tối ưu hóa hàm tổng hợp.',
        },
        readTimeMinutes: 14,
        sections: [
          {
            id: 'sql-hb-3-1',
            title: {
              en: 'HAVING vs WHERE Logical Processing Order',
              vi: 'Thứ Tự Xử Lý Logic Của HAVING vs WHERE',
            },
            keyIdea: {
              en: 'WHERE filters base table rows before aggregation occurs, while HAVING evaluates post-aggregation conditions on computed group metrics.',
              vi: 'Mệnh đề WHERE lọc từng dòng trước khi tổng hợp gom nhóm, trong khi HAVING kiểm tra điều kiện sau khi đã tính toán các chỉ số nhóm.',
            },
            content: {
              en: 'SQL queries follow a strict logical execution sequence distinct from their written visual syntax. The engine processes FROM and JOIN clauses first to establish the source relation, then applies the WHERE filter to discard irrelevant rows before any aggregation takes place. Next, GROUP BY partitions the remaining rows into distinct buckets based on the grouping keys. Aggregate functions (SUM, AVG, COUNT, MIN, MAX) compute scalar metrics for each bucket. Finally, the HAVING clause evaluates conditions against these computed aggregates, discarding groups that do not satisfy criteria. Filtering early in the WHERE clause reduces the cardinality entering the aggregation phase, dramatically lowering CPU memory overhead.',
              vi: 'Truy vấn SQL tuân thủ quy trình thực thi logic nghiêm ngặt khác hẳn với thứ tự viết câu lệnh. Engine xử lý mệnh đề FROM và JOIN trước tiên để xác định nguồn dữ liệu, sau đó áp dụng bộ lọc WHERE nhằm loại bỏ các dòng không liên quan trước khi gom nhóm. Tiếp theo, GROUP BY phân chia các dòng còn lại vào các nhóm riêng biệt theo khóa. Các hàm tổng hợp (SUM, AVG, COUNT, MIN, MAX) tính toán giá trị cho từng nhóm. Cuối cùng, mệnh đề HAVING kiểm tra điều kiện trên các chỉ số tổng hợp vừa tính và loại bỏ nhóm không thỏa mãn. Lọc sớm bằng WHERE giúp giảm số lượng bản ghi đưa vào bước gom nhóm, tiết kiệm đáng kể CPU và RAM.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'where_vs_having.sql',
              explanation: {
                en: 'Demonstrates correct separation of row-level filtering in WHERE versus group-level aggregate filtering in HAVING, plus modern FILTER syntax.',
                vi: 'Minh họa việc tách biệt chính xác giữa lọc theo dòng trong WHERE và lọc theo nhóm tổng hợp trong HAVING, kèm cú pháp FILTER hiện đại.',
              },
              code: `-- High-performance query with correct WHERE and HAVING placement
SELECT 
    u.tenant_id,
    u.status,
    COUNT(o.id) AS total_orders,
    SUM(o.total_cents) / 100.0 AS gross_revenue_usd,
    COUNT(o.id) FILTER (WHERE o.total_cents > 50000) AS high_value_orders
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.placed_at >= '2025-01-01'           -- Filter rows BEFORE aggregation
  AND u.status != 'suspended'               -- Uses indexes on placed_at and status
GROUP BY u.tenant_id, u.status
HAVING COUNT(o.id) >= 10                    -- Filters groups AFTER aggregation
   AND SUM(o.total_cents) > 100000
ORDER BY gross_revenue_usd DESC;`,
            },
            comparisonTable: {
              headers: [
                { en: 'Dimension', vi: 'Tiêu Chí' },
                { en: 'WHERE Clause', vi: 'Mệnh Đề WHERE' },
                { en: 'HAVING Clause', vi: 'Mệnh Đề HAVING' },
              ],
              rows: [
                {
                  en: ['Execution Stage', 'Before GROUP BY aggregation', 'After GROUP BY aggregation'],
                  vi: ['Giai đoạn thực thi', 'Trước khi gom nhóm GROUP BY', 'Sau khi gom nhóm GROUP BY'],
                },
                {
                  en: ['Operates On', 'Individual table rows / tuples', 'Aggregated group buckets'],
                  vi: ['Đối tượng tác động', 'Từng dòng dữ liệu riêng lẻ', 'Các nhóm kết quả đã tổng hợp'],
                },
                {
                  en: ['Can Use Aggregates', 'No (e.g., WHERE SUM(x) > 0 is a syntax error)', 'Yes (e.g., HAVING COUNT(*) > 5)'],
                  vi: ['Dùng hàm tổng hợp', 'Không (WHERE SUM(x) > 0 sẽ gây lỗi cú pháp)', 'Có (ví dụ: HAVING COUNT(*) > 5)'],
                },
                {
                  en: ['Index Utilization', 'Can leverage B-Tree indexes to seek/scan', 'Cannot use indexes directly (scans groups in memory)'],
                  vi: ['Tận dụng Index', 'Có thể dùng B-Tree index để tìm kiếm nhanh', 'Không thể dùng index trực tiếp (quét nhóm trên RAM)'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'SQL Logical Query Processing Pipeline',
                vi: 'Quy Trình Xử Lý Truy Vấn Logic Của SQL',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'FROM & JOIN', vi: 'FROM & JOIN' },
                  description: {
                    en: 'Source tables are joined and Cartesian relations established.',
                    vi: 'Các bảng nguồn được liên kết và thiết lập quan hệ dữ liệu.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'WHERE Filtering', vi: 'Lọc WHERE' },
                  description: {
                    en: 'Unmatched rows are discarded early using available index bounds.',
                    vi: 'Loại bỏ các dòng không khớp từ sớm dựa trên biên độ index.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'GROUP BY', vi: 'Gom Nhóm GROUP BY' },
                  description: {
                    en: 'Surviving rows are partitioned into buckets according to group keys.',
                    vi: 'Các dòng dữ liệu còn lại được chia vào các nhóm theo khóa.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'HAVING & SELECT', vi: 'HAVING & SELECT' },
                  description: {
                    en: 'Aggregates are computed, group conditions evaluated, and expressions projected.',
                    vi: 'Tính toán chỉ số tổng hợp, lọc nhóm qua HAVING và trả về cột ở SELECT.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Putting row-level filters inside the HAVING clause',
                  vi: 'Đặt điều kiện lọc từng dòng vào mệnh đề HAVING',
                },
                why: {
                  en: 'Writing HAVING status = "active" forces the engine to aggregate every row across the entire table before discarding inactive groups, bypassing indexes completely.',
                  vi: 'Viết HAVING status = "active" buộc database phải gom nhóm toàn bộ dữ liệu của cả bảng trước khi lọc bỏ các nhóm không hoạt động, vô hiệu hóa hoàn toàn index.',
                },
                solution: {
                  en: 'Always place non-aggregate column predicates in the WHERE clause so the optimizer can filter rows via index scan before aggregation.',
                  vi: 'Luôn đưa các điều kiện trên cột không tổng hợp vào mệnh đề WHERE để optimizer dùng index lọc từ sớm trước khi gom nhóm.',
                },
                codeIncorrect: `-- Inefficient: aggregates millions of rows unnecessarily
SELECT user_id, COUNT(*)
FROM orders
GROUP BY user_id, status
HAVING status = 'completed';`,
                codeCorrect: `-- Optimized: indexes filter rows before GROUP BY
SELECT user_id, COUNT(*)
FROM orders
WHERE status = 'completed'
GROUP BY user_id;`,
              },
            ],
            practicalScenario: {
              en: 'In a financial analytics service tracking fraud, a query scans daily transactions. Using WHERE created_at >= CURRENT_DATE - INTERVAL "7 days" prunes 98% of rows via timestamp index. Then GROUP BY merchant_id HAVING COUNT(*) > 500 flags high-velocity anomaly targets with minimal RAM usage.',
              vi: 'Trong hệ thống phân tích gian lận tài chính, truy vấn quét giao dịch hàng ngày. Đặt WHERE created_at >= CURRENT_DATE - INTERVAL "7 days" giúp lược bỏ 98% số dòng nhờ timestamp index. Sau đó GROUP BY merchant_id HAVING COUNT(*) > 500 phát hiện các điểm bán hàng có lượng giao dịch đột biến mà tiêu tốn cực ít RAM.',
            },
            bestPractices: {
              en: [
                'Filter aggressively in WHERE to minimize the working set size before GROUP BY.',
                'Use standard aggregate FILTER (WHERE condition) instead of CASE WHEN inside SUM/COUNT for readability and speed.',
                'Ensure GROUP BY columns align with compound index keys when dealing with massive datasets.',
              ],
              vi: [
                'Lọc triệt để trong WHERE để giảm tối đa kích thước tập dữ liệu trước khi bước vào GROUP BY.',
                'Sử dụng cú pháp chuẩn FILTER (WHERE điều_kiện) thay cho CASE WHEN lồng trong SUM/COUNT để code sáng sủa và chạy nhanh hơn.',
                'Đảm bảo các cột trong GROUP BY trùng khớp với thứ tự composite index khi xử lý dữ liệu quy mô lớn.',
              ],
            },
            keyTakeaways: {
              en: [
                'WHERE filters rows before aggregation; HAVING filters groups after aggregation.',
                'Never use HAVING for columns that could be filtered in WHERE.',
                'The FILTER clause provides clean conditional aggregation within a single GROUP BY pass.',
              ],
              vi: [
                'WHERE lọc dòng trước khi gom nhóm; HAVING lọc nhóm sau khi đã gom nhóm.',
                'Tuyệt đối không dùng HAVING cho các cột có thể lọc được từ WHERE.',
                'Cú pháp FILTER cho phép tính toán tổng hợp có điều kiện tiện lợi trong 1 lần quét GROUP BY duy nhất.',
              ],
            },
          },
        ],
      },
    ],
  },

  SQL_DEFINITIONS_BOOK,
  SQL_QUERY_PATTERNS_BOOK,
  SQL_COMMON_ERRORS_BOOK,
  SQL_BEST_PRACTICES_BOOK,

  // 6. SQL Practical Guides
  {
    id: 'sql-practical-guides',
    slug: 'sql-practical-guides',
    title: 'Relational Database Design Guide',
    subtitle: {
      en: 'Step-by-Step Guide to Data Modeling, Normalization & Migrations',
      vi: 'Hướng Dẫn Thực Hành Mô Hình Hóa Dữ Liệu, Chuẩn Hóa & Migrations',
    },
    bookType: 'Practical Guides',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '35 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-18',
    accentColor: 'from-sky-600 to-indigo-800',
    tags: ['Data Modeling', 'Normalization', 'Migrations', 'Guide'],
    description: {
      en: 'A practical, step-by-step guide to modeling relational domain schemas, achieving 3NF, and executing safe database migrations in production.',
      vi: 'Hướng dẫn thực hành từng bước mô hình hóa schema hệ thống quan hệ, đưa về dạng chuẩn 3NF và thực thi migration an toàn trên môi trường sản xuất.',
    },
    prerequisites: {
      en: ['Basic knowledge of SQL table creation'],
      vi: ['Hiểu biết cơ bản về khởi tạo bảng SQL'],
    },
    outcomes: {
      en: ['Normalize unorganized data to Third Normal Form (3NF)', 'Write zero-downtime database migration scripts'],
      vi: ['Chuẩn hóa dữ liệu thô về Dạng Chuẩn Ba (3NF)', 'Viết kịch bản migration cơ sở dữ liệu zero-downtime'],
    },
    chapters: [
      {
        id: 'spg-ch-1',
        number: 1,
        slug: 'normalization-1nf-2nf-3nf',
        title: {
          en: 'Schema Normalization (1NF to 3NF)',
          vi: 'Chuẩn Hóa Schema Dữ Liệu (Từ 1NF Đến 3NF)',
        },
        summary: {
          en: 'First Normal Form atomicity, Second Normal Form partial dependency elimination, and Third Normal Form transitive decoupling.',
          vi: 'Dạng chuẩn 1NF nguyên tử hóa, 2NF triệt tiêu phụ thuộc một phần và 3NF tách biệt phụ thuộc bắc cầu.',
        },
        readTimeMinutes: 18,
        sections: [
          {
            id: 'spg-1-1',
            title: {
              en: '3NF Rule: Dependent strictly on the Key, Whole Key, Nothing but the Key',
              vi: 'Quy Tắc 3NF: Phụ Thuộc Trực Tiếp Vào Khóa Chính',
            },
            keyIdea: {
              en: 'Relational normalization methodically decomposes composite attributes and transitive functional dependencies to eliminate update, insertion, and deletion anomalies.',
              vi: 'Chuẩn hóa quan hệ phân rã có phương pháp các thuộc tính phức và các phụ thuộc hàm bắc cầu nhằm triệt tiêu các hiện tượng dị thường khi cập nhật, thêm mới và xóa dữ liệu.',
            },
            content: {
              en: 'Database normalization organizes attributes within relations to eliminate redundancy and maintain mathematical integrity. First Normal Form (1NF) mandates attribute atomicity—forbidding arrays, comma-separated lists, or nested repeating groups—and requires a unique primary key. Second Normal Form (2NF) enforces that every non-key column depends on the entire candidate key, eliminating partial functional dependencies in composite keys. Third Normal Form (3NF)—canonically summarized by Bill Kent as "every non-key attribute must provide a fact about the key, the whole key, and nothing but the key, so help me Codd"—demands the removal of transitive dependencies (where column A determines column B, and column B determines column C). By isolating independent entities into normalized tables connected via foreign keys, data mutations occur at exactly one single source of truth.',
              vi: 'Chuẩn hóa cơ sở dữ liệu sắp xếp các thuộc tính trong quan hệ nhằm loại bỏ dữ liệu dư thừa và duy trì tính toàn vẹn toán học. Dạng chuẩn 1 (1NF) yêu cầu tính nguyên tử của thuộc tính—cấm lưu mảng, chuỗi phân cách bằng dấu phẩy hay các nhóm lặp lồng nhau—và bắt buộc phải có khóa chính duy nhất. Dạng chuẩn 2 (2NF) áp dụng cho bảng có khóa chính hợp phần, đòi hỏi mọi cột không phải khóa phải phụ thuộc vào toàn bộ khóa chính chứ không được phụ thuộc một phần. Dạng chuẩn 3 (3NF)—được Bill Kent đúc kết nổi tiếng: "mọi thuộc tính không phải khóa phải mô tả sự thật về khóa chính, toàn bộ khóa chính và không có gì ngoài khóa chính"—đòi hỏi phải loại bỏ phụ thuộc bắc cầu (nơi cột A xác định cột B, và cột B lại xác định cột C). Bằng cách tách các thực thể độc lập vào các bảng chuẩn hóa nối qua khóa ngoại, mọi thao tác sửa đổi dữ liệu chỉ diễn ra tại đúng một điểm duy nhất.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'normalization_refactoring.sql',
              explanation: {
                en: 'Refactoring an unnormalized denormalized table prone to update anomalies into clean 3NF relational schemas.',
                vi: 'Tái cấu trúc một bảng phi chuẩn hóa dễ gặp lỗi dị thường thành hệ thống schema chuẩn 3NF mẫu mực.',
              },
              code: `-- ❌ UNNORMALIZED (Violates 1NF, 2NF, and 3NF):
-- Multiple phones violate 1NF; department_name depends on department_id (transitive 3NF violation)
CREATE TABLE bad_employee_records (
    emp_id INT,
    emp_name TEXT,
    phone_numbers TEXT,      -- "555-0101, 555-0102" (Violates 1NF)
    department_id INT,
    department_name TEXT,    -- Transitive dependency: emp_id -> dept_id -> dept_name (Violates 3NF)
    department_head TEXT
);

-- ✅ NORMALIZED (Clean Third Normal Form - 3NF):
-- 1. Departments table (Entity boundary)
CREATE TABLE departments (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    head_name VARCHAR(100) NOT NULL
);

-- 2. Employees table (Foreign Key reference)
CREATE TABLE employees (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL REFERENCES departments(id),
    hired_at DATE NOT NULL
);

-- 3. Atomic phone numbers (1NF Resolution)
CREATE TABLE employee_phones (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employee_id INT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    phone_type VARCHAR(20) NOT NULL, -- 'mobile', 'desk'
    phone_number VARCHAR(32) NOT NULL,
    CONSTRAINT uq_emp_phone UNIQUE (employee_id, phone_number)
);`,
            },
            comparisonTable: {
              headers: [
                { en: 'Normal Form', vi: 'Dạng Chuẩn' },
                { en: 'Core Requirement', vi: 'Yêu Cầu Cốt Lõi' },
                { en: 'Eliminated Anomaly', vi: 'Dị Thường Được Loại Bỏ' },
                { en: 'Example Violation', vi: 'Ví Dụ Vi Phạm Điển Hình' },
              ],
              rows: [
                {
                  en: ['1NF', 'Atomic column values & unique primary key', 'Multi-valued repeating string groups', 'Storing tags as "tag1,tag2,tag3" in a TEXT column'],
                  vi: ['1NF', 'Giá trị cột nguyên tử & có khóa chính duy nhất', 'Nhóm giá trị lặp lại trong một ô', 'Lưu danh sách tag dạng "tag1,tag2,tag3" trong cột TEXT'],
                },
                {
                  en: ['2NF', '1NF + No partial functional dependencies on composite keys', 'Redundant entity data repeated on each line item', 'Storing product_name inside order_items table'],
                  vi: ['2NF', '1NF + Không phụ thuộc một phần vào khóa chính phức', 'Dữ liệu thực thể bị lặp lại trên từng dòng chi tiết', 'Lưu tên sản phẩm product_name ngay trong bảng order_items'],
                },
                {
                  en: ['3NF', '2NF + No transitive dependencies between non-key columns', 'Update anomaly when modifying secondary attributes', 'Storing author_bio inside books table instead of authors table'],
                  vi: ['3NF', '2NF + Không phụ thuộc bắc cầu giữa các cột ngoài khóa', 'Dị thường sửa dữ liệu khi thay đổi thuộc tính phụ', 'Lưu author_bio trong bảng books thay vì tách sang bảng authors'],
                },
              ],
            },
            diagram: {
              title: {
                en: '3NF Functional Dependency Decoupling',
                vi: 'Quy Trình Tách Biệt Phụ Thuộc Hàm Trong 3NF',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Identify Primary Key (A)', vi: 'Xác Định Khóa Chính (A)' },
                  description: {
                    en: 'Primary Key uniquely identifies entity instance (e.g. employee_id).',
                    vi: 'Khóa chính định danh duy nhất thực thể (ví dụ employee_id).',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Detect Determinant (B)', vi: 'Phát Hiện Yếu Tố Xác Định (B)' },
                  description: {
                    en: 'Non-key column determines another non-key column (dept_id -> dept_name).',
                    vi: 'Một cột không phải khóa lại xác định cột khác (dept_id -> dept_name).',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Table Decomposition', vi: 'Phân Tách Bảng' },
                  description: {
                    en: 'Extract B and its dependents into an autonomous parent relation (departments).',
                    vi: 'Tách B và các thuộc tính phụ thuộc vào bảng cha độc lập (departments).',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Foreign Key Linking', vi: 'Liên Kết Khóa Ngoại' },
                  description: {
                    en: 'Retain foreign key pointer in base table to enforce referential integrity.',
                    vi: 'Giữ lại con trỏ khóa ngoại trong bảng gốc để đảm bảo toàn vẹn tham chiếu.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Premature denormalization in transactional databases before establishing performance bottlenecks',
                  vi: 'Phi chuẩn hóa quá sớm trong cơ sở dữ liệu giao dịch khi chưa xuất hiện điểm nghẽn',
                },
                why: {
                  en: 'Duplicating customer_name or product_price into historical orders creates state inconsistency when customers update names or products update base catalog prices.',
                  vi: 'Nhân bản customer_name hoặc product_price vào các bảng con gây bất nhất trạng thái khi khách đổi tên hoặc sản phẩm đổi giá cơ bản.',
                },
                solution: {
                  en: 'Default to strictly normalized 3NF schemas for transactional systems. If audit history is required, store snapshot prices (e.g. price_at_purchase) with explicit business semantics.',
                  vi: 'Luôn thiết kế theo chuẩn 3NF cho hệ thống giao dịch. Nếu cần lưu vết lịch sử, hãy lưu giá chụp tại thời điểm mua (price_at_purchase) với ngữ nghĩa rõ ràng.',
                },
                codeIncorrect: `-- DANGEROUS: customer_name duplicated; if user renames, old orders remain stale
INSERT INTO orders (id, customer_id, customer_name, total) VALUES (1, 42, 'John Doe', 100);`,
                codeCorrect: `-- PROPER 3NF: Only foreign key is stored; name is derived via JOIN
SELECT o.id, o.total, c.name AS customer_name 
FROM orders o 
JOIN customers c ON c.id = o.customer_id;`,
              },
            ],
            practicalScenario: {
              en: 'A retail warehouse app kept supplier contact info directly inside inventory stock rows. When a supplier changed their email, 14,000 inventory items had to be updated across 20 tables. Because network timeouts aborted one batch, half the records retained stale emails, causing lost shipments. Normalizing suppliers into an independent table with supplier_id foreign keys solved the update anomaly permanently.',
              vi: 'Ứng dụng quản lý kho lưu trực tiếp thông tin liên hệ nhà cung cấp vào từng dòng hàng hóa. Khi một nhà cung cấp đổi email, 14.000 mặt hàng trên 20 bảng phải đồng loạt update. Do mạng chập chờn làm gián đoạn một batch, một nửa số bản ghi giữ email cũ khiến các chuyến hàng bị gửi sai địa chỉ. Chuẩn hóa nhà cung cấp thành bảng riêng với khóa ngoại supplier_id đã triệt tiêu hoàn toàn sự cố này.',
            },
            bestPractices: {
              en: [
                'Always model transactional relational schemas in strict 3NF first; only denormalize if read benchmarks prove a severe bottleneck.',
                'Use Surrogate Keys (BIGINT GENERATED ALWAYS AS IDENTITY) for primary keys and enforce natural uniqueness with UNIQUE constraints.',
                'Always declare foreign keys with ON DELETE RESTRICT or ON DELETE CASCADE to prevent orphaned records.',
              ],
              vi: [
                'Luôn thiết kế mô hình dữ liệu quan hệ ở chuẩn 3NF trước; chỉ phi chuẩn hóa khi đo kiểm thực tế chứng minh có điểm nghẽn.',
                'Sử dụng surrogate key (BIGINT GENERATED ALWAYS AS IDENTITY) làm khóa chính và ràng buộc tính duy nhất bằng UNIQUE constraint.',
                'Luôn khai báo khóa ngoại kèm ON DELETE RESTRICT hoặc ON DELETE CASCADE để ngăn chặn bản ghi mồ côi.',
              ],
            },
            keyTakeaways: {
              en: [
                '1NF guarantees atomic values; 2NF eliminates partial composite key dependencies.',
                '3NF ensures non-key columns depend exclusively on the primary key.',
                'Normalization eliminates update, delete, and insert anomalies.',
              ],
              vi: [
                '1NF đảm bảo giá trị nguyên tử; 2NF triệt tiêu phụ thuộc một phần vào khóa chính phức.',
                '3NF đảm bảo các cột ngoài khóa chỉ phụ thuộc duy nhất vào khóa chính.',
                'Chuẩn hóa triệt tiêu mọi hiện tượng dị thường khi cập nhật, xóa và chèn dữ liệu.',
              ],
            },
          },
        ],
      },
      {
        id: 'spg-ch-2',
        number: 2,
        slug: 'zero-downtime-migrations',
        title: {
          en: 'Zero-Downtime Database Migrations',
          vi: 'Kỹ Thuật Migration Không Gây Gián Đoạn (Zero-Downtime)',
        },
        summary: {
          en: 'The Expand-and-Contract migration pattern, non-blocking index creation, and safe column alterations.',
          vi: 'Mẫu migration Expand-and-Contract, tạo index không lock bảng và quy trình sửa đổi cột an toàn.',
        },
        readTimeMinutes: 17,
        sections: [
          {
            id: 'spg-2-1',
            title: {
              en: 'The Expand-and-Contract Migration Blueprint',
              vi: 'Quy Trình Expand-and-Contract Khi Migration Schema',
            },
            keyIdea: {
              en: 'Zero-downtime database migrations decouple schema expansion from code deployment, ensuring backward and forward compatibility throughout every release phase.',
              vi: 'Migration cơ sở dữ liệu zero-downtime tách rời việc mở rộng schema khỏi việc triển khai mã nguồn, đảm bảo tính tương thích xuôi và ngược xuyên suốt mọi giai đoạn phát hành.',
            },
            content: {
              en: 'Executing destructive DDL migrations—such as dropping columns, renaming columns, or adding NOT NULL constraints without defaults—in production environments acquires exclusive ACCESS EXCLUSIVE table locks that block all concurrent reads and writes, inducing service outages. The Expand-and-Contract (also known as Parallel Run) pattern guarantees zero downtime across five phased steps: 1. Expand: Introduce the new column or table alongside existing schemas without modifying existing production columns; 2. Dual-Write: Deploy application code that writes simultaneously to both old and new columns while continuing to read from the old column; 3. Backfill: Execute an asynchronous background batch job to backfill legacy rows in small, rate-limited chunks; 4. Switch Reads: Deploy application code to read from the newly populated column; 5. Contract: Drop legacy columns and triggers once all services have verified integrity.',
              vi: 'Việc thực thi các câu lệnh DDL có tính phá hủy—chẳng hạn xóa cột, đổi tên cột hay thêm ràng buộc NOT NULL không có default—trên môi trường production sẽ kích hoạt khóa độc quyền ACCESS EXCLUSIVE làm treo toàn bộ các thao tác đọc và ghi, gây gián đoạn hệ thống. Mẫu thiết kế Expand-and-Contract (còn gọi là Parallel Run) bảo đảm zero downtime thông qua 5 bước tuần tự: 1. Expand (Mở rộng): Thêm cột hoặc bảng mới song song với schema hiện tại mà không sửa đổi cột cũ; 2. Dual-Write (Ghi song song): Deploy code ứng dụng để ghi đồng thời vào cả cột cũ và mới trong khi vẫn đọc từ cột cũ; 3. Backfill (Đồng bộ dữ liệu cũ): Chạy tiến trình nền đồng bộ dữ liệu cũ theo từng mẻ nhỏ (chunk) tránh khóa bảng; 4. Switch Reads (Chuyển nguồn đọc): Deploy code ứng dụng chuyển sang đọc từ cột mới; 5. Contract (Thu gọn): Xóa bỏ cột cũ và trigger sau khi toàn bộ hệ thống đã hoạt động ổn định.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'expand_and_contract.sql',
              explanation: {
                en: 'Step-by-step SQL scripts executing a zero-downtime column type migration from INT to BIGINT on an active production table.',
                vi: 'Các bước SQL chi tiết thực thi migration đổi kiểu dữ liệu cột từ INT sang BIGINT mà không làm gián đoạn bảng đang chạy.',
              },
              code: `-- STEP 1: EXPAND (Instant metadata change, no heavy table rewrite)
ALTER TABLE transactions 
ADD COLUMN amount_cents_v2 BIGINT;

-- STEP 2: CREATE CONCURRENT INDEX (Does NOT block reads or writes!)
CREATE INDEX CONCURRENTLY idx_transactions_amount_v2 
ON transactions (amount_cents_v2);

-- STEP 3: ASYNCHRONOUS BATCHED BACKFILL (Run via script, e.g. 5,000 rows/batch)
DO $$
DECLARE
    batch_size INT := 5000;
    rows_updated INT;
BEGIN
    LOOP
        UPDATE transactions
        SET amount_cents_v2 = amount_cents::BIGINT
        WHERE id IN (
            SELECT id FROM transactions 
            WHERE amount_cents_v2 IS NULL 
            LIMIT batch_size
        );
        GET DIAGNOSTICS rows_updated = ROW_COUNT;
        EXIT WHEN rows_updated = 0;
        PERFORM pg_sleep(0.05); -- Sleep 50ms to yield locks and IOPS
    END LOOP;
END $$;

-- STEP 4: ADD NOT NULL SAFELY (Postgres 12+)
-- Step 4a: Add NOT VALID constraint (Instant, no scan!)
ALTER TABLE transactions 
ADD CONSTRAINT chk_amount_not_null 
CHECK (amount_cents_v2 IS NOT NULL) NOT VALID;

-- Step 4b: Validate constraint in background without exclusive lock
ALTER TABLE transactions 
VALIDATE CONSTRAINT chk_amount_not_null;

-- STEP 5: CONTRACT (After app switched to amount_cents_v2)
-- Drop legacy column safely
ALTER TABLE transactions DROP COLUMN amount_cents;`,
            },
            comparisonTable: {
              headers: [
                { en: 'Phase', vi: 'Giai Đoạn' },
                { en: 'Database Action', vi: 'Thao Tác Cơ Sở Dữ Liệu' },
                { en: 'Application Code Action', vi: 'Thao Tác Code Ứng Dụng' },
                { en: 'Locking Impact', vi: 'Mức Độ Khóa (Lock)' },
              ],
              rows: [
                {
                  en: ['Phase 1: Expand', 'Add new nullable column or table', 'Unchanged (runs current stable version)', 'Sub-millisecond metadata lock'],
                  vi: ['Pha 1: Expand', 'Thêm cột hoặc bảng mới có thể nhận NULL', 'Không đổi (chạy code ổn định hiện tại)', 'Lock metadata dưới 1 mili-giây'],
                },
                {
                  en: ['Phase 2: Dual-Write', 'Active schema with both columns', 'Deploy app code writing to Col 1 and Col 2', 'Zero locking overhead beyond standard writes'],
                  vi: ['Pha 2: Dual-Write', 'Schema hoạt động với cả hai cột', 'Deploy code ghi đồng thời vào Cột 1 và Cột 2', 'Không phát sinh lock ngoài giao dịch ghi thường'],
                },
                {
                  en: ['Phase 3: Backfill', 'Batch updates legacy rows in chunks', 'App continues reading Col 1, dual-writing both', 'Short row locks on 5,000-row batch chunks'],
                  vi: ['Pha 3: Backfill', 'Cập nhật dữ liệu cũ theo từng mẻ nhỏ', 'App tiếp tục đọc Cột 1, ghi song song cả hai', 'Lock dòng ngắn trên từng mẻ 5.000 bản ghi'],
                },
                {
                  en: ['Phase 4: Read Switch', 'Validate constraints concurrently', 'Deploy app code reading exclusively from Col 2', 'Zero lock impact'],
                  vi: ['Pha 4: Đổi Nguồn Đọc', 'Kiểm tra ràng buộc độc lập không chặn bảng', 'Deploy code chuyển sang đọc hoàn toàn từ Cột 2', 'Hoàn toàn không có lock'],
                },
                {
                  en: ['Phase 5: Contract', 'Drop legacy column and cleanup', 'App code cleans up dual-write fallback paths', 'Sub-millisecond metadata lock'],
                  vi: ['Pha 5: Contract', 'Xóa cột cũ và dọn dẹp', 'Xóa bỏ code dự phòng dual-write trong ứng dụng', 'Lock metadata dưới 1 mili-giây'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Five-Stage Expand-and-Contract Migration Flow',
                vi: 'Quy Trình 5 Giai Đoạn Của Expand-and-Contract Migration',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Expand Schema', vi: 'Mở Rộng Schema' },
                  description: {
                    en: 'Create new column or table without default values or heavy constraints.',
                    vi: 'Tạo cột hoặc bảng mới không ràng buộc nặng nề, cho phép NULL.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Dual-Write Code Deploy', vi: 'Deploy Ghi Song Song' },
                  description: {
                    en: 'Application writes incoming traffic to both old and new storage paths.',
                    vi: 'Ứng dụng ghi dữ liệu mới phát sinh vào cả đường dẫn cũ và mới.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Batched Backfill', vi: 'Đồng Bộ Lô Dữ Liệu Cũ' },
                  description: {
                    en: 'Background worker synchronizes historical legacy records in small batches.',
                    vi: 'Tiến trình nền đồng bộ các bản ghi lịch sử cũ theo từng lô nhỏ.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Read Switch & Validation', vi: 'Chuyển Đọc & Xác Thực' },
                  description: {
                    en: 'Application switches read queries to new column; constraints validated.',
                    vi: 'Ứng dụng chuyển sang đọc cột mới; các ràng buộc được kiểm tra hợp lệ.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Running `CREATE INDEX` without CONCURRENTLY on tables with millions of rows',
                  vi: 'Chạy lệnh `CREATE INDEX` thiếu từ khóa CONCURRENTLY trên bảng hàng triệu dòng',
                },
                why: {
                  en: 'A standard `CREATE INDEX` acquires a SHARE lock on the entire table, blocking all INSERT, UPDATE, and DELETE transactions until the entire index build finishes, which can take tens of minutes.',
                  vi: 'Lệnh `CREATE INDEX` thông thường kích hoạt khóa SHARE trên toàn bảng, chặn đứng tất cả thao tác INSERT, UPDATE và DELETE cho đến khi tạo xong index, có thể mất hàng chục phút.',
                },
                solution: {
                  en: 'Always use `CREATE INDEX CONCURRENTLY` in production environments.',
                  vi: 'Luôn sử dụng `CREATE INDEX CONCURRENTLY` trên môi trường production.',
                },
                codeIncorrect: `-- LOCKS THE TABLE: Blocks all writes for 20 minutes on 10M rows!
CREATE INDEX idx_user_orders ON orders (user_id, status);`,
                codeCorrect: `-- NON-BLOCKING: Writes continue unhindered while index builds in background!
CREATE INDEX CONCURRENTLY idx_user_orders ON orders (user_id, status);`,
              },
            ],
            practicalScenario: {
              en: 'An online marketplace with 200 orders per second needed to migrate their order_id from 32-bit INT to 64-bit BIGINT as they approached the 2.1 billion ID ceiling. A direct `ALTER TABLE orders ALTER COLUMN id TYPE BIGINT` would have locked the orders table for 45 minutes, losing millions in revenue. Using the 5-step Expand-and-Contract pattern, the team migrated all 2 billion rows across 4 days with zero customer downtime and zero aborted checkouts.',
              vi: 'Sàn thương mại điện tử với 200 đơn hàng/giây cần chuyển cột order_id từ INT 32-bit sang BIGINT 64-bit khi sắp chạm ngưỡng 2,1 tỷ đơn. Lệnh `ALTER TABLE orders ALTER COLUMN id TYPE BIGINT` trực tiếp sẽ khóa cứng bảng đơn hàng trong 45 phút, gây thiệt hại hàng triệu USD. Áp dụng quy trình Expand-and-Contract 5 bước, đội ngũ đã chuyển đổi 2 tỷ dòng trong 4 ngày mà hoàn toàn không có thời gian chết và không mất bất kỳ đơn hàng nào.',
            },
            bestPractices: {
              en: [
                'Always run `CREATE INDEX CONCURRENTLY` and `DROP INDEX CONCURRENTLY` in production environments.',
                'Use NOT VALID constraints followed by separate `VALIDATE CONSTRAINT` statements to avoid holding table locks during full scans.',
                'Chunk historical backfills into small batches (1,000 - 5,000 rows) with small sleep pauses to allow lock release.',
              ],
              vi: [
                'Luôn sử dụng `CREATE INDEX CONCURRENTLY` và `DROP INDEX CONCURRENTLY` trên production.',
                'Dùng constraint NOT VALID rồi mới chạy `VALIDATE CONSTRAINT` riêng để tránh giữ khóa bảng khi quét dữ liệu.',
                'Chia nhỏ tiến trình backfill thành từng lô nhỏ (1.000 - 5.000 dòng) kèm khoảng nghỉ ngắn để nhả khóa.',
              ],
            },
            keyTakeaways: {
              en: [
                'Expand-and-contract decouples schema changes from code deployment.',
                'Never execute long-running DDL that requires ACCESS EXCLUSIVE locks during peak traffic.',
                'Always index concurrently and backfill historical data in rate-limited batches.',
              ],
              vi: [
                'Expand-and-contract tách rời thay đổi schema khỏi việc triển khai code.',
                'Không bao giờ chạy các lệnh DDL nặng đòi hỏi khóa ACCESS EXCLUSIVE trong giờ cao điểm.',
                'Luôn tạo index ở chế độ CONCURRENTLY và đồng bộ dữ liệu cũ theo từng mẻ nhỏ có kiểm soát tốc độ.',
              ],
            },
          },
        ],
      },
    ],
  },
];
