import { Book } from '../types';

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

  // 2. SQL Definitions
  {
    id: 'sql-definitions',
    slug: 'sql-definitions',
    title: 'SQL Definitions',
    subtitle: {
      en: 'Database Terminology, Glossary & ACID Isolation Definitions',
      vi: 'Thuật Ngữ Cơ Sở Dữ Liệu, Cấp Độ Cô Lập ACID & Tra Cứu Khái Niệm',
    },
    bookType: 'Definitions',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '25 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-12',
    accentColor: 'from-sky-500 to-blue-700',
    tags: ['Definitions', 'ACID', 'Transactions', 'Glossary'],
    description: {
      en: 'Concise reference definitions for database internals: ACID guarantees, Isolation Levels, B-Trees, WAL, and Write Amplification.',
      vi: 'Từ điển định nghĩa gọn gàng các thuật ngữ cơ sở dữ liệu: Tính chất ACID, Cấp độ cô lập, B-Tree, WAL và Phóng đại ghi (Write Amplification).',
    },
    prerequisites: {
      en: ['Basic SQL query knowledge'],
      vi: ['Kiến thức truy vấn SQL cơ bản'],
    },
    outcomes: {
      en: ['Understand database transaction behavior under concurrency'],
      vi: ['Hiểu rõ hành vi giao dịch cơ sở dữ liệu khi có truy cập đồng thời'],
    },
    chapters: [
      {
        id: 'sql-def-ch-1',
        number: 1,
        slug: 'acid-and-transactions',
        title: {
          en: 'ACID Guarantees & Transaction Isolation Levels',
          vi: 'Các Tính Chất ACID & Cấp Độ Cô Lập Giao Dịch',
        },
        summary: {
          en: 'Atomicity, Consistency, Isolation, Durability, transaction anomalies, and snapshot isolation guarantees.',
          vi: 'Atomicity, Consistency, Isolation, Durability, các hiện tượng dị thường giao dịch và bảo đảm của snapshot isolation.',
        },
        readTimeMinutes: 14,
        sections: [
          {
            id: 'sql-def-1-1',
            title: {
              en: 'Isolation Levels: Read Committed to Serializable',
              vi: 'Cấp Độ Cô Lập: Từ Read Committed Đến Serializable',
            },
            keyIdea: {
              en: 'Transaction isolation levels represent a spectrum of mathematical trade-offs between concurrent read/write throughput and the prevention of concurrency anomalies.',
              vi: 'Các cấp độ cô lập giao dịch biểu thị sự đánh đổi toán học giữa thông lượng đọc/ghi đồng thời và việc ngăn chặn các hiện tượng dị thường xung đột dữ liệu.',
            },
            content: {
              en: 'The ANSI SQL standard defines four isolation levels to manage concurrent transactions accessing shared relational state: Read Uncommitted, Read Committed, Repeatable Read, and Serializable. These levels prevent three classic phenomena: Dirty Read (reading uncommitted data from an in-flight transaction that might roll back), Non-Repeatable Read (rereading a row within the same transaction and seeing modified values because another transaction committed), and Phantom Read (rereading a range of rows and discovering newly inserted rows committed by another transaction). In PostgreSQL, the default level is Read Committed, which acquires a fresh MVCC snapshot at the start of each statement. Repeatable Read acquires a snapshot at the start of the first query in the transaction. Serializable uses Serializable Snapshot Isolation (SSI) to track read-write dependencies (SIREAD locks) and aborts transactions exhibiting write skew.',
              vi: 'Chuẩn ANSI SQL định nghĩa 4 cấp độ cô lập nhằm kiểm soát các giao dịch đồng thời truy cập trạng thái dữ liệu chung: Read Uncommitted, Read Committed, Repeatable Read và Serializable. Các cấp độ này ngăn chặn 3 hiện tượng kinh điển: Dirty Read (đọc phải dữ liệu chưa commit của giao dịch khác có thể bị rollback), Non-Repeatable Read (đọc lại 1 dòng trong cùng giao dịch nhưng thấy giá trị bị đổi do giao dịch khác vừa commit), và Phantom Read (đọc lại 1 khoảng dữ liệu và thấy xuất hiện thêm các dòng mới do giao dịch khác chèn vào). Trong PostgreSQL, cấp độ mặc định là Read Committed (tạo snapshot MVCC mới cho từng câu lệnh). Repeatable Read tạo snapshot ngay tại câu truy vấn đầu tiên của giao dịch. Serializable áp dụng Serializable Snapshot Isolation (SSI) theo dõi đồ thị phụ thuộc đọc-ghi (SIREAD locks) và tự động hủy giao dịch nếu phát hiện hiện tượng write skew.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'isolation_levels.sql',
              explanation: {
                en: 'Demonstrates setting transaction isolation levels and handling serialization failure (SQLSTATE 40001) in application retry loops.',
                vi: 'Minh họa cách thiết lập cấp độ cô lập và xử lý lỗi xung đột serialization (SQLSTATE 40001) trong vòng lặp thử lại của ứng dụng.',
              },
              code: `-- Setting transaction isolation level explicitly
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Consistent snapshot: Any concurrent UPDATEs committed after this point
-- will NOT be visible to subsequent queries in this transaction.
SELECT balance FROM accounts WHERE id = 42;

-- Perform business logic calculation safely
UPDATE accounts 
SET balance = balance - 100 
WHERE id = 42;

COMMIT;

-- Serializable mode: Requires application-level retry handling
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- If concurrent transactions produce Write Skew, engine throws:
-- ERROR: could not serialize access due to read/write dependencies (SQLSTATE 40001)
COMMIT;`,
            },
            comparisonTable: {
              headers: [
                { en: 'Isolation Level', vi: 'Cấp Độ Cô Lập' },
                { en: 'Dirty Read', vi: 'Dirty Read' },
                { en: 'Non-Repeatable Read', vi: 'Non-Repeatable Read' },
                { en: 'Phantom Read', vi: 'Phantom Read' },
                { en: 'Write Skew', vi: 'Write Skew' },
              ],
              rows: [
                {
                  en: ['Read Uncommitted', 'Permitted (Postgres upgrades to Read Committed)', 'Permitted', 'Permitted', 'Permitted'],
                  vi: ['Read Uncommitted', 'Có thể xảy ra (Postgres nâng lên Read Committed)', 'Có thể xảy ra', 'Có thể xảy ra', 'Có thể xảy ra'],
                },
                {
                  en: ['Read Committed', 'Prevented', 'Permitted', 'Permitted', 'Permitted'],
                  vi: ['Read Committed', 'Được ngăn chặn', 'Có thể xảy ra', 'Có thể xảy ra', 'Có thể xảy ra'],
                },
                {
                  en: ['Repeatable Read', 'Prevented', 'Prevented', 'Prevented in Postgres (Snapshot Isolation)', 'Permitted'],
                  vi: ['Repeatable Read', 'Được ngăn chặn', 'Được ngăn chặn', 'Được ngăn chặn trong Postgres (Snapshot Isolation)', 'Có thể xảy ra'],
                },
                {
                  en: ['Serializable', 'Prevented', 'Prevented', 'Prevented', 'Prevented (Strict SSI)'],
                  vi: ['Serializable', 'Được ngăn chặn', 'Được ngăn chặn', 'Được ngăn chặn', 'Được ngăn chặn (Chuẩn SSI)'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Snapshot Isolation Lifecycle Timeline',
                vi: 'Dòng Thời Gian Vòng Đời Của Snapshot Isolation',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Transaction Start & Snapshot', vi: 'Khởi Tạo Giao Dịch & Snapshot' },
                  description: {
                    en: 'Transaction Tx1 begins and establishes an active snapshot of committed database state.',
                    vi: 'Giao dịch Tx1 bắt đầu và lưu lại ảnh chụp snapshot của trạng thái dữ liệu đã commit.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Concurrent Mutation (Tx2)', vi: 'Giao Dịch Đồng Thời (Tx2)' },
                  description: {
                    en: 'Tx2 commits an UPDATE on row A. Tx2 xmax is stamped into row A tuple.',
                    vi: 'Tx2 commit câu lệnh UPDATE trên dòng A. Mã xmax của Tx2 được ghi vào tuple dòng A.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Consistent Read in Tx1', vi: 'Đọc Nhất Quán Trong Tx1' },
                  description: {
                    en: 'Tx1 re-reads row A. Because Tx2 committed after Tx1 snapshot, Tx1 reads the older version.',
                    vi: 'Tx1 đọc lại dòng A. Do Tx2 commit sau snapshot của Tx1, Tx1 vẫn thấy phiên bản cũ ổn định.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Conflict Resolution', vi: 'Giải Quyết Xung Đột' },
                  description: {
                    en: 'If Tx1 tries to update row A, first-committer-wins rule halts or aborts Tx1.',
                    vi: 'Nếu Tx1 cố tình ghi đè lên dòng A, quy tắc first-committer-wins sẽ chặn hoặc báo lỗi rollback Tx1.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Assuming Read Committed prevents race conditions in Read-Modify-Write flows',
                  vi: 'Lầm tưởng Read Committed ngăn được race condition khi Đọc-Sửa-Ghi',
                },
                why: {
                  en: 'Under Read Committed, two concurrent sessions can both read balance = 100, calculate balance - 60 = 40, and write back, causing an overdraft without violating individual statement integrity.',
                  vi: 'Ở mức Read Committed, hai phiên đồng thời có thể cùng đọc số dư = 100, tính toán 100 - 60 = 40 rồi cùng ghi lại, dẫn đến tài khoản bị âm tiền mà không vi phạm ràng buộc đơn lẻ nào.',
                },
                solution: {
                  en: 'Use atomic SQL updates (SET balance = balance - 60 WHERE balance >= 60) or pessimistic row locks (SELECT ... FOR UPDATE).',
                  vi: 'Sử dụng câu lệnh update nguyên tử (SET balance = balance - 60 WHERE balance >= 60) hoặc khóa dòng bi quan (SELECT ... FOR UPDATE).',
                },
                codeIncorrect: `-- DANGEROUS: Race condition under default Read Committed
SELECT balance FROM accounts WHERE id = 1; -- returns 100 in both sessions
-- App logic computes 100 - 60 = 40
UPDATE accounts SET balance = 40 WHERE id = 1; -- Both commit, leaving 40 instead of -20 or failing!`,
                codeCorrect: `-- SAFE Pattern 1: Pessimistic Row Locking
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;
-- Exclusive lock held until COMMIT; second session blocks and reads correct 40.

-- SAFE Pattern 2: Single Atomic Guarded UPDATE
UPDATE accounts SET balance = balance - 60 WHERE id = 1 AND balance >= 60;`,
              },
            ],
            practicalScenario: {
              en: 'In a medical appointment booking platform, two doctors cannot be assigned to the same examination room simultaneously. Under Repeatable Read, two transactions reading room bookings will both see it free and insert their doctor (Write Skew). Upgrading to SERIALIZABLE causes the second transaction to abort with a 40001 serialization failure, prompting the booking API to retry and select an alternative room.',
              vi: 'Trong nền tảng đặt lịch khám bệnh, hai bác sĩ không được xếp trùng một phòng khám. Dưới mức Repeatable Read, hai giao dịch đọc lịch phòng đều thấy phòng trống và cùng chèn bác sĩ của mình vào (hiện tượng Write Skew). Nâng cấp lên SERIALIZABLE sẽ khiến giao dịch thứ hai bị hủy với mã lỗi 40001 (serialization failure), kích hoạt API thử lại và tự động chuyển sang phòng khám khác.',
            },
            bestPractices: {
              en: [
                'Default to Read Committed for general web applications; use SELECT ... FOR UPDATE when managing atomic inventories.',
                'When using Serializable isolation, always wrap database transactions in an exponential backoff retry loop to handle 40001 errors.',
                'Keep transactions as short as possible to prevent lock contention and MVCC snapshot pinning.',
              ],
              vi: [
                'Giữ Read Committed làm mặc định cho ứng dụng web thông thường; dùng SELECT ... FOR UPDATE khi quản lý kho hàng.',
                'Khi sử dụng Serializable, luôn bọc giao dịch trong vòng lặp thử lại với exponential backoff để xử lý mã lỗi 40001.',
                'Giữ thời gian thực thi giao dịch ngắn nhất có thể để tránh nghẽn lock và giữ snapshot MVCC quá lâu.',
              ],
            },
            keyTakeaways: {
              en: [
                'Read Committed prevents dirty reads but allows non-repeatable reads and phantoms.',
                'PostgreSQL Repeatable Read eliminates phantom reads via snapshot isolation.',
                'Serializable prevents write skew but requires application-level retry architecture.',
              ],
              vi: [
                'Read Committed ngăn dirty read nhưng vẫn cho phép non-repeatable read và phantom read.',
                'Repeatable Read trong PostgreSQL triệt tiêu phantom read nhờ cơ chế snapshot isolation.',
                'Serializable ngăn chặn write skew nhưng đòi hỏi kiến trúc thử lại giao dịch ở tầng ứng dụng.',
              ],
            },
          },
        ],
      },
      {
        id: 'sql-def-ch-2',
        number: 2,
        slug: 'indexing-definitions',
        title: {
          en: 'Storage Engine & Indexing Glossary',
          vi: 'Từ Điển Storage Engine & Đánh Chỉ Mục Index',
        },
        summary: {
          en: 'MVCC, Write-Ahead Logging (WAL), B-Tree leaf pages, and vacuum garbage collection.',
          vi: 'MVCC, Write-Ahead Logging (WAL), cấu trúc lá B-Tree và cơ chế dọn rác VACUUM.',
        },
        readTimeMinutes: 13,
        sections: [
          {
            id: 'sql-def-2-1',
            title: {
              en: 'MVCC (Multi-Version Concurrency Control)',
              vi: 'MVCC (Multi-Version Concurrency Control)',
            },
            keyIdea: {
              en: 'MVCC achieves non-blocking concurrency by maintaining multiple timestamped row versions (tuples) simultaneously, so readers never block writers and writers never block readers.',
              vi: 'MVCC đạt được tính đồng thời không bị khóa nghẽn bằng cách duy trì nhiều phiên bản dòng (tuple) có gắn nhãn thời gian, giúp tác vụ đọc không chặn tác vụ ghi và ngược lại.',
            },
            content: {
              en: 'Multi-Version Concurrency Control (MVCC) is the architectural foundation of PostgreSQL and modern relational engines. Instead of modifying table rows directly in place with exclusive table locks, an UPDATE statement inserts a brand new tuple into the 8KB table page and writes the current transaction ID into the old tuple xmax system attribute, marking it expired. A SELECT statement evaluates visibility by comparing its transaction snapshot against each tuple xmin (creation transaction) and xmax (expiration transaction). Tuples whose xmax belongs to a committed past transaction that is no longer visible to any active snapshot become "dead tuples". The VACUUM process reclaims dead tuple storage and updates the Free Space Map (FSM) and Visibility Map (VM).',
              vi: 'Multi-Version Concurrency Control (MVCC) là nền tảng kiến trúc cốt lõi của PostgreSQL và các engine quan hệ hiện đại. Thay vì ghi đè trực tiếp lên dòng dữ liệu và phải lock bảng, câu lệnh UPDATE sẽ chèn một tuple hoàn toàn mới vào trang dữ liệu (8KB page) và điền mã transaction hiện tại vào trường xmax của tuple cũ để đánh dấu hết hạn. Khi SELECT thực thi, engine so sánh snapshot giao dịch với xmin (transaction tạo) và xmax (transaction xóa) của từng tuple để quyết định tính hiển thị. Các tuple có xmax thuộc về transaction đã commit trong quá khứ và không còn snapshot nào nhìn thấy sẽ trở thành "dead tuple". Tiến trình VACUUM quét dọn dead tuple để tái sử dụng dung lượng và cập nhật Free Space Map (FSM) cùng Visibility Map (VM).',
            },
            codeBlock: {
              language: 'sql',
              filename: 'inspect_mvcc.sql',
              explanation: {
                en: 'Demonstrates inspecting PostgreSQL internal MVCC system columns (xmin, xmax, ctid) to observe tuple versioning and dead tuple generation.',
                vi: 'Minh họa cách soi các cột hệ thống MVCC nội bộ của PostgreSQL (xmin, xmax, ctid) để quan sát việc tạo phiên bản tuple và sinh dead tuple.',
              },
              code: `-- Create a table and inspect its hidden MVCC system headers
CREATE TABLE mvcc_demo (
    id INT PRIMARY KEY,
    val TEXT
);

INSERT INTO mvcc_demo VALUES (1, 'version_one');

-- View ctid (physical page/offset pointer), xmin (creator TxID), xmax (deleter TxID)
SELECT ctid, xmin, xmax, id, val FROM mvcc_demo;
-- Output: ctid: (0,1), xmin: 5012, xmax: 0, val: 'version_one'

-- Updating the record does NOT overwrite; it creates a new physical tuple!
UPDATE mvcc_demo SET val = 'version_two' WHERE id = 1;

SELECT ctid, xmin, xmax, id, val FROM mvcc_demo;
-- Output: ctid: (0,2), xmin: 5013, xmax: 0, val: 'version_two'
-- Physical slot (0,1) is now a dead tuple awaiting autovacuum!`,
            },
            comparisonTable: {
              headers: [
                { en: 'System Header', vi: 'Trường Hệ Thống' },
                { en: 'Purpose', vi: 'Mục Đích Sử Dụng' },
                { en: 'Behavior on INSERT', vi: 'Hành Vi Khi INSERT' },
                { en: 'Behavior on UPDATE/DELETE', vi: 'Hành Vi Khi UPDATE/DELETE' },
              ],
              rows: [
                {
                  en: ['xmin', 'Records transaction ID that inserted the tuple', 'Set to current TxID', 'Unchanged on existing tuple; new tuple gets current TxID'],
                  vi: ['xmin', 'Ghi nhận TxID của giao dịch đã tạo dòng', 'Gán bằng TxID hiện tại', 'Không đổi ở dòng cũ; dòng mới được gán TxID hiện tại'],
                },
                {
                  en: ['xmax', 'Records transaction ID that deleted/superseded the tuple', 'Initialized to 0 (active)', 'Set to current TxID of updating transaction'],
                  vi: ['xmax', 'Ghi nhận TxID của giao dịch đã xóa/thay thế dòng', 'Khởi tạo bằng 0 (đang hoạt động)', 'Gán bằng TxID của giao dịch thực hiện sửa/xóa'],
                },
                {
                  en: ['ctid', 'Physical page number and tuple offset: (page, offset)', 'Assigned next available page slot', 'Old tuple points to new tuple ctid (HOT chain)'],
                  vi: ['ctid', 'Con trỏ vật lý trang và vị trí offset: (page, offset)', 'Gán slot trống tiếp theo trên page', 'Dòng cũ trỏ sang ctid của dòng mới (chuỗi HOT chain)'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'PostgreSQL MVCC Tuple Versioning & HOT Chain',
                vi: 'Cơ Chế Tuple Versioning & HOT Chain Trong MVCC',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Initial Insert', vi: 'Chèn Dữ Liệu Ban Đầu' },
                  description: {
                    en: 'Row inserted at Page 0, Slot 1 with xmin=100, xmax=0.',
                    vi: 'Dòng được chèn tại Trang 0, Slot 1 với xmin=100, xmax=0.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'In-Flight Update', vi: 'Cập Nhật Dữ Liệu' },
                  description: {
                    en: 'Update inserts new tuple at Page 0, Slot 2 with xmin=105; Slot 1 gets xmax=105.',
                    vi: 'Lệnh update tạo tuple mới tại Trang 0, Slot 2 (xmin=105); Slot 1 được gán xmax=105.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Concurrent Reader Visibility', vi: 'Tính Hiển Thị Của Người Đọc' },
                  description: {
                    en: 'Older transactions see Slot 1. Newer transactions after Tx 105 commit see Slot 2.',
                    vi: 'Giao dịch cũ thấy Slot 1. Giao dịch mới sau khi Tx 105 commit sẽ thấy Slot 2.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Vacuum Cleanup', vi: 'Dọn Dẹp Dead Tuple' },
                  description: {
                    en: 'Once no active transaction needs Tx 100 snapshot, autovacuum frees Slot 1 for reuse.',
                    vi: 'Khi không còn giao dịch nào cần snapshot trước Tx 105, autovacuum giải phóng Slot 1 để tái sử dụng.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Leaving long-running idle transactions open, causing catastrophic table bloat',
                  vi: 'Mở giao dịch nhàn rỗi (idle in transaction) quá lâu gây phình to bảng (table bloat)',
                },
                why: {
                  en: 'PostgreSQL autovacuum cannot clean any dead tuple whose xmax is newer than the oldest active transaction xmin across the entire cluster. An abandoned open transaction prevents cleanup across all tables.',
                  vi: 'Tiến trình autovacuum không thể xóa bất kỳ dead tuple nào có xmax mới hơn xmin của giao dịch đang mở lâu nhất hệ thống. Một transaction bị bỏ quên sẽ ngăn cản dọn rác trên toàn bộ database.',
                },
                solution: {
                  en: 'Configure idle_in_transaction_session_timeout = "60s" in postgresql.conf to automatically kill hanging connections.',
                  vi: 'Cấu hình tham số idle_in_transaction_session_timeout = "60s" trong postgresql.conf để tự động ngắt các kết nối treo.',
                },
                codeIncorrect: `-- Abandoned transaction hanging in pool:
BEGIN;
SELECT * FROM users WHERE id = 10;
-- Connection left uncommitted for 18 hours: blocks VACUUM cluster-wide!`,
                codeCorrect: `-- postgresql.conf safeguard:
ALTER SYSTEM SET idle_in_transaction_session_timeout = '60000'; -- 60 seconds
SELECT pg_reload_conf();`,
              },
            ],
            practicalScenario: {
              en: 'A fintech ledger table with 50 million rows was updated 200,000 times per day without proper autovacuum tuning. Disk space surged from 10GB to 140GB due to millions of uncollected dead tuples. Diagnosing pg_stat_user_tables revealed n_dead_tup was 80% of total rows. Tuning autovacuum_vacuum_scale_factor to 0.05 and running VACUUM (ANALYZE) restored normal performance and stopped disk exhaustion.',
              vi: 'Bảng sổ cái fintech chứa 50 triệu dòng bị update 200.000 lần mỗi ngày mà không chỉnh thông số autovacuum. Dung lượng đĩa tăng vọt từ 10GB lên 140GB do hàng triệu dead tuple không được giải phóng. Kiểm tra view pg_stat_user_tables cho thấy n_dead_tup chiếm tới 80% tổng số dòng. Điều chỉnh autovacuum_vacuum_scale_factor xuống 0.05 và chạy VACUUM (ANALYZE) đã phục hồi tốc độ truy vấn và ngăn cản sự cố tràn đĩa.',
            },
            bestPractices: {
              en: [
                'Monitor pg_stat_user_tables to track n_dead_tup and ensure autovacuum runs regularly.',
                'Take advantage of HOT (Heap-Only Tuples) updates by avoiding indexing columns that are updated frequently and setting fillfactor = 90.',
                'Always set idle_in_transaction_session_timeout to prevent client connection leaks from stalling vacuum.',
              ],
              vi: [
                'Giám sát bảng pg_stat_user_tables để theo dõi số lượng n_dead_tup và đảm bảo autovacuum hoạt động định kỳ.',
                'Tận dụng tính năng HOT (Heap-Only Tuples) bằng cách không đánh index trên cột hay update và đặt fillfactor = 90.',
                'Luôn cấu hình idle_in_transaction_session_timeout để tránh rò rỉ kết nối client làm kẹt tiến trình vacuum.',
              ],
            },
            keyTakeaways: {
              en: [
                'MVCC creates new tuple versions instead of mutating in-place.',
                'xmin defines when a row becomes visible; xmax defines when it expires.',
                'Autovacuum is essential to prevent dead tuple accumulation and table bloat.',
              ],
              vi: [
                'MVCC tạo các phiên bản tuple mới thay vì sửa đè tại chỗ.',
                'xmin xác định thời điểm dòng bắt đầu hiển thị; xmax xác định thời điểm dòng hết hạn.',
                'Autovacuum là tiến trình sống còn để ngăn chặn tích lũy dead tuple và phình đĩa.',
              ],
            },
          },
        ],
      },
    ],
  },

  // 3. SQL Query Patterns
  {
    id: 'sql-query-patterns',
    slug: 'sql-query-patterns',
    title: 'SQL Query Patterns & Formulas',
    subtitle: {
      en: 'CTE Recurrence, Window Functions & Advanced Query Recipes',
      vi: 'Mẫu Truy Vấn SQL Nâng Cao, Window Functions & Cú Pháp CTE Đệ Quy',
    },
    bookType: 'Patterns / Recipes',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '35 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-15',
    accentColor: 'from-indigo-600 to-blue-900',
    tags: ['Window Functions', 'CTE', 'Recursive Queries', 'Patterns'],
    description: {
      en: 'Reusable SQL query patterns: Common Table Expressions (CTEs), Recursive tree traversal, Window Functions (ROW_NUMBER, LAG, LEAD), and Pivoting.',
      vi: 'Bộ công thức và mẫu truy vấn SQL tái sử dụng: CTE đệ quy duyệt cây, Window Functions (ROW_NUMBER, LAG, LEAD) và xoay chiều bảng (Pivoting).',
    },
    prerequisites: {
      en: ['Solid understanding of SELECT, JOIN, and GROUP BY'],
      vi: ['Nắm chắc cú pháp SELECT, JOIN và GROUP BY'],
    },
    outcomes: {
      en: ['Calculate running totals and moving averages with OVER()', 'Traverse hierarchical parent-child trees using RECURSIVE CTEs'],
      vi: ['Tính tổng lũy tiến và trung bình động với mệnh đề OVER()', 'Duyệt cấu trúc cây phân cấp cha-con bằng RECURSIVE CTE'],
    },
    chapters: [
      {
        id: 'sqp-ch-1',
        number: 1,
        slug: 'window-function-patterns',
        title: {
          en: 'Analytics Patterns with Window Functions',
          vi: 'Mẫu Phân Tích Dữ Liệu Với Window Functions',
        },
        summary: {
          en: 'ROW_NUMBER(), DENSE_RANK(), LAG(), LEAD(), and frame boundaries with ROWS/RANGE BETWEEN.',
          vi: 'ROW_NUMBER(), DENSE_RANK(), LAG(), LEAD() và xác lập biên khung ROWS/RANGE BETWEEN.',
        },
        readTimeMinutes: 18,
        sections: [
          {
            id: 'sqp-1-1',
            title: {
              en: 'Running Totals & Moving Averages',
              vi: 'Tính Tổng Tích Lũy & Trung Bình Động qua OVER()',
            },
            keyIdea: {
              en: 'Window functions perform mathematical calculations across partitioned subsets of related rows without collapsing individual records into aggregate summaries.',
              vi: 'Window functions thực hiện tính toán trên các tập con phân vùng của các dòng liên quan mà vẫn bảo toàn nguyên vẹn từng dòng dữ liệu riêng lẻ.',
            },
            content: {
              en: 'Unlike standard GROUP BY queries which collapse multiple rows into a single scalar group metric, Window Functions evaluate across a sliding "window frame" of rows while retaining individual row identities. A window specification consists of three core clauses inside OVER(): PARTITION BY divides rows into independent statistical processing partitions; ORDER BY defines the logical sorting sequence within each partition; and the framing clause (ROWS or RANGE BETWEEN) defines the exact sliding boundary relative to the CURRENT ROW. By default, specifying ORDER BY without an explicit frame clause defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, which calculates cumulative running metrics.',
              vi: 'Khác với truy vấn GROUP BY truyền thống gom nhiều dòng thành một chỉ số đại diện duy nhất, Window Functions hoạt động trên một "khung cửa sổ trượt" (window frame) nhưng vẫn giữ nguyên từng dòng bản ghi. Một định nghĩa window bao gồm ba mệnh đề chính trong OVER(): PARTITION BY chia nhỏ các dòng thành từng phân vùng tính toán độc lập; ORDER BY xác định thứ tự logic bên trong mỗi phân vùng; và mệnh đề khung (ROWS hoặc RANGE BETWEEN) thiết lập biên giới trượt tương đối so với CURRENT ROW. Mặc định, nếu có ORDER BY mà không khai báo frame tường minh, engine sẽ tự hiểu là RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, sinh ra chỉ số tích lũy lũy tiến.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'window_analytics.sql',
              explanation: {
                en: 'Demonstrates 7-day rolling revenue averages, user lifetime running totals, and previous-order churn detection via LAG().',
                vi: 'Minh họa tính doanh thu trung bình động 7 ngày, tổng chi tiêu tích lũy và phát hiện khách hàng rời bỏ qua hàm LAG().',
              },
              code: `-- Advanced analytical window calculations
SELECT 
    o.id AS order_id,
    o.user_id,
    o.order_date,
    o.amount_usd,
    -- 1. Cumulative running spend per customer
    SUM(o.amount_usd) OVER (
        PARTITION BY o.user_id 
        ORDER BY o.order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS user_cumulative_spend,
    -- 2. 7-day rolling average order value across the entire platform
    AVG(o.amount_usd) OVER (
        ORDER BY o.order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS rolling_7day_avg_amount,
    -- 3. Days elapsed since previous purchase
    o.order_date - LAG(o.order_date, 1) OVER (
        PARTITION BY o.user_id 
        ORDER BY o.order_date
    ) AS days_since_last_order,
    -- 4. Customer order sequence number
    ROW_NUMBER() OVER (
        PARTITION BY o.user_id 
        ORDER BY o.order_date ASC
    ) AS purchase_sequence
FROM orders o
WHERE o.status = 'completed';`,
            },
            comparisonTable: {
              headers: [
                { en: 'Framing Mode', vi: 'Chế Độ Khung' },
                { en: 'Boundary Definition', vi: 'Cách Xác Định Biên' },
                { en: 'Duplicate Value Handling', vi: 'Xử Lý Giá Trị Trùng Lặp' },
                { en: 'Performance Profile', vi: 'Đặc Điểm Hiệu Năng' },
              ],
              rows: [
                {
                  en: ['ROWS', 'Physical offset count of rows (e.g. 5 PRECEDING)', 'Treats identical values as separate individual rows', 'High speed; predictable constant memory per row'],
                  vi: ['ROWS', 'Số lượng dòng vật lý cụ thể (ví dụ 5 PRECEDING)', 'Coi các giá trị trùng là các dòng riêng rẽ', 'Tốc độ cao; bộ nhớ cố định có thể dự đoán'],
                },
                {
                  en: ['RANGE', 'Logical value offset based on ORDER BY column value', 'Peers with equal ORDER BY values are grouped into same frame', 'Higher CPU cost; requires buffering duplicate peer sets'],
                  vi: ['RANGE', 'Khoảng giá trị logic dựa trên giá trị cột ORDER BY', 'Các dòng có cùng giá trị ORDER BY được gộp chung khung', 'Tốn CPU hơn; phải đệm toàn bộ tập dòng bằng điểm'],
                },
                {
                  en: ['GROUPS', 'Distinct logical peer groups as units', 'Steps across distinct peer value groups', 'Supported in modern ANSI SQL / Postgres 11+'],
                  vi: ['GROUPS', 'Từng cụm nhóm giá trị riêng biệt làm đơn vị', 'Nhảy theo từng nhóm giá trị phân biệt', 'Hỗ trợ từ chuẩn ANSI SQL / Postgres 11+'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Sliding Window Frame Evaluation Pipeline',
                vi: 'Quy Trình Tính Toán Khung Cửa Sổ Trượt (Window Frame)',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Partitioning (PARTITION BY)', vi: 'Phân Vùng (PARTITION BY)' },
                  description: {
                    en: 'Rows are split into independent cohorts (e.g. user_id = 101, 102).',
                    vi: 'Các dòng được chia thành từng nhóm phân vùng độc lập (ví dụ user_id = 101, 102).',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Partition Sorting (ORDER BY)', vi: 'Sắp Xếp Phân Vùng (ORDER BY)' },
                  description: {
                    en: 'Tuples within each partition are sorted according to chronological order_date.',
                    vi: 'Các tuple bên trong từng nhóm được sắp xếp theo trình tự thời gian order_date.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Frame Slicing (ROWS BETWEEN)', vi: 'Cắt Khung Dòng (ROWS BETWEEN)' },
                  description: {
                    en: 'Sliding window boundaries are evaluated relative to CURRENT ROW.',
                    vi: 'Biên giới khung trượt được tính toán tương đối so với dòng hiện tại CURRENT ROW.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Scalar Aggregation Output', vi: 'Xuất Giá Trị Vô Hướng' },
                  description: {
                    en: 'The aggregate/analytic metric is assigned directly to the current output tuple.',
                    vi: 'Chỉ số phân tích/tổng hợp được gán trực tiếp vào tuple kết quả của dòng hiện tại.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Omitting explicit ROWS frame in cumulative sums, unintentionally using RANGE with duplicates',
                  vi: 'Quên khai báo ROWS trong tổng lũy tiến, vô tình dùng RANGE gây gộp giá trị trùng',
                },
                why: {
                  en: 'When ORDER BY timestamp has duplicate dates, default RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW treats all duplicate rows as peers and adds them together simultaneously instead of row-by-row.',
                  vi: 'Khi cột ORDER BY có ngày giờ trùng nhau, mặc định RANGE sẽ xem các dòng này là đồng hạng và cộng gộp toàn bộ cùng lúc thay vì tính lũy tiến từng dòng.',
                },
                solution: {
                  en: 'Always explicitly declare `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` when computing running totals.',
                  vi: 'Luôn khai báo tường minh `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` khi tính tổng tích lũy.',
                },
                codeIncorrect: `-- BUGGY: Rows with identical order_date get identical jumps!
SUM(amount) OVER (ORDER BY order_date) AS running_total`,
                codeCorrect: `-- CORRECT: Explicit row-based progression
SUM(amount) OVER (
    ORDER BY order_date, id 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
) AS running_total`,
              },
            ],
            practicalScenario: {
              en: 'A SaaS financial dashboard needs to calculate Month-over-Month (MoM) expansion revenue per account. Using LAG(monthly_mrr, 1) OVER (PARTITION BY account_id ORDER BY bill_month) allows direct calculation of ((current_mrr - previous_mrr) / previous_mrr) * 100 in a single scan of the ledger table without requiring a self-join.',
              vi: 'Bảng điều khiển tài chính SaaS cần tính tỷ lệ tăng trưởng doanh thu hàng tháng (MoM) cho từng tài khoản. Dùng LAG(monthly_mrr, 1) OVER (PARTITION BY account_id ORDER BY bill_month) cho phép tính trực tiếp công thức ((current_mrr - previous_mrr) / previous_mrr) * 100 chỉ với một lượt quét bảng sổ cái mà không cần tự join (self-join).',
            },
            bestPractices: {
              en: [
                'Always specify explicit ROWS frame boundaries to avoid surprise RANGE peer-grouping behavior.',
                'Combine multiple window functions sharing the same specification using the WINDOW clause at the end of the query.',
                'Ensure composite indexes cover `(partition_col, order_col)` to eliminate costly Sort operations.',
              ],
              vi: [
                'Luôn khai báo rõ ràng biên giới ROWS để tránh hành vi gộp nhóm bất ngờ của RANGE.',
                'Kết hợp nhiều window function có cùng cấu hình bằng mệnh đề WINDOW đặt ở cuối truy vấn.',
                'Đảm bảo có index bao phủ `(partition_col, order_col)` để loại bỏ thao tác Sort tốn kém trong execution plan.',
              ],
            },
            keyTakeaways: {
              en: [
                'Window functions compute analytical metrics without collapsing row records.',
                'PARTITION BY divides rows; ORDER BY establishes chronological sequence.',
                'ROWS gives deterministic row-level frames; RANGE evaluates logical values.',
              ],
              vi: [
                'Window functions tính toán chỉ số mà không làm mất đi các dòng chi tiết.',
                'PARTITION BY phân chia nhóm; ORDER BY xác định thứ tự thời gian.',
                'ROWS tính theo số dòng vật lý chính xác; RANGE tính theo giá trị logic.',
              ],
            },
          },
        ],
      },
      {
        id: 'sqp-ch-2',
        number: 2,
        slug: 'recursive-cte-patterns',
        title: {
          en: 'Recursive CTEs for Hierarchical Graphs',
          vi: 'CTE Đệ Quy Duyệt Cấu Trúc Cây Phân Cấp',
        },
        summary: {
          en: 'Query org charts, category trees, bill of materials (BOM), and cycle detection.',
          vi: 'Truy vấn sơ đồ tổ chức, cây danh mục sản phẩm, linh kiện BOM và phát hiện vòng lặp vô hạn.',
        },
        readTimeMinutes: 17,
        sections: [
          {
            id: 'sqp-2-1',
            title: {
              en: 'WITH RECURSIVE Tree Traversal',
              vi: 'Duyệt Cây Với Mệnh Đề WITH RECURSIVE',
            },
            keyIdea: {
              en: 'Recursive CTEs iterate over hierarchical graph structures by executing an anchor query once and evaluating a recursive step until the working table returns an empty set.',
              vi: 'CTE đệ quy duyệt cấu trúc đồ thị cây bằng cách chạy truy vấn neo (anchor) một lần và lặp lại bước đệ quy cho đến khi tập làm việc không còn phần tử mới.',
            },
            content: {
              en: 'A Recursive Common Table Expression (CTE) provides a declarative mechanism to traverse directed acyclic graphs (DAGs) and tree hierarchies in SQL. The recursive CTE structure consists of two queries combined with UNION ALL (or UNION): the Anchor Member, which runs once to produce the initial seed dataset (e.g. root category nodes where parent_id IS NULL), and the Recursive Member, which references the CTE itself in its FROM clause to discover child nodes connected to the previous iteration result. Internally, the database engine maintains an Intermediate Working Table. Each iteration evaluates the recursive member against the working table, appends results to the final accumulator, and swaps the working table with newly found child rows until zero rows are produced.',
              vi: 'Mệnh đề Recursive CTE cung cấp cơ chế khai báo mạnh mẽ để duyệt đồ thị có hướng không chu trình (DAG) và cây phân cấp trong SQL. Cấu trúc gồm 2 câu truy vấn kết hợp bằng UNION ALL (hoặc UNION): Anchor Member (truy vấn neo) chạy 1 lần để tạo tập dữ liệu hạt giống ban đầu (ví dụ các nút gốc có parent_id IS NULL), và Recursive Member (truy vấn đệ quy) tham chiếu đến chính tên CTE trong mệnh đề FROM để tìm các nút con nối với kết quả của vòng lặp trước. Bên trong, engine duy trì một bảng tạm Intermediate Working Table. Mỗi vòng lặp sẽ chạy truy vấn đệ quy trên working table, đẩy kết quả vào bộ tích lũy và cập nhật working table bằng các dòng con mới cho đến khi không còn dòng nào được sinh ra.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'recursive_org_chart.sql',
              explanation: {
                en: 'Traverses a corporate reporting hierarchy with depth tracking, breadcrumb path assembly, and cycle prevention using an array visited path.',
                vi: 'Duyệt sơ đồ tổ chức phòng ban kèm theo độ sâu cấp bậc, tạo đường dẫn breadcrumb và ngăn chặn vòng lặp vô hạn bằng mảng array path.',
              },
              code: `-- Hierarchical tree traversal with depth and cycle detection
WITH RECURSIVE org_tree AS (
    -- 1. Anchor Member: Root executives with no manager
    SELECT 
        id,
        name,
        manager_id,
        1 AS depth,
        ARRAY[id] AS path_visited,
        name::TEXT AS breadcrumb_path
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- 2. Recursive Member: Direct reports connected to previous level
    SELECT 
        e.id,
        e.name,
        e.manager_id,
        ot.depth + 1,
        ot.path_visited || e.id,
        ot.breadcrumb_path || ' > ' || e.name
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
    -- Guard condition: prevent infinite loops if data contains cyclic graphs
    WHERE NOT (e.id = ANY(ot.path_visited))
      AND ot.depth < 10
)
SELECT 
    id,
    name,
    depth,
    breadcrumb_path
FROM org_tree
ORDER BY breadcrumb_path;`,
            },
            comparisonTable: {
              headers: [
                { en: 'Component', vi: 'Thành Phần' },
                { en: 'Execution Frequency', vi: 'Tần Suất Thực Thi' },
                { en: 'Inputs', vi: 'Đầu Vào' },
                { en: 'Role in Query', vi: 'Vai Trò Trong Truy Vấn' },
              ],
              rows: [
                {
                  en: ['Anchor Member', 'Executed exactly once at query initiation', 'Base database tables (e.g. root nodes)', 'Defines the seed root rows of the hierarchy'],
                  vi: ['Anchor Member', 'Thực thi đúng một lần khi bắt đầu truy vấn', 'Các bảng vật lý gốc (ví dụ các nút gốc)', 'Xác lập tập dữ liệu hạt giống ban đầu của cây'],
                },
                {
                  en: ['Recursive Member', 'Repeated in a loop until working set is empty', 'The working table output from the previous loop', 'Discovers child nodes one tier deeper'],
                  vi: ['Recursive Member', 'Lặp liên tục cho đến khi tập làm việc rỗng', 'Bảng working table từ vòng lặp trước đó', 'Truy tìm các nút con sâu hơn một cấp bậc'],
                },
                {
                  en: ['UNION ALL operator', 'Executed on each iteration', 'Accumulator + new recursive row batch', 'Combines results without deduplication overhead'],
                  vi: ['Toán tử UNION ALL', 'Thực hiện qua từng vòng lặp', 'Bộ tích lũy + lô dòng mới sinh ra', 'Gộp dữ liệu mà không tốn chi phí loại trừ trùng lặp'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Recursive CTE Working Table Lifecycle',
                vi: 'Vòng Đời Hoạt Động Của Bảng Tạm Trong Recursive CTE',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Anchor Initialization', vi: 'Khởi Tạo Tập Neo' },
                  description: {
                    en: 'Anchor query runs. Root nodes populate Result Accumulator and Working Table.',
                    vi: 'Truy vấn neo chạy. Các nút gốc được nạp vào Result Accumulator và Working Table.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Recursive Step', vi: 'Bước Lặp Đệ Quy' },
                  description: {
                    en: 'Recursive query joins Working Table against base table to find Level 2 children.',
                    vi: 'Truy vấn đệ quy join Working Table với bảng gốc để tìm tập con cấp độ 2.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Swap & Accumulate', vi: 'Hoán Đổi & Tích Lũy' },
                  description: {
                    en: 'Level 2 children appended to Result. Working Table replaced with Level 2 rows.',
                    vi: 'Tập con cấp 2 được nạp vào Kết quả. Working Table thay bằng dòng cấp 2.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Termination Check', vi: 'Điều Kiện Dừng' },
                  description: {
                    en: 'When recursive step returns 0 rows, iteration halts and Final Result is returned.',
                    vi: 'Khi bước đệ quy trả về 0 dòng, vòng lặp dừng lại và trả về kết quả cuối cùng.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Omitting cycle detection in graph data with parent loops, causing infinite execution and out-of-memory crash',
                  vi: 'Bỏ qua kiểm tra vòng lặp trong đồ thị, khiến truy vấn chạy vô tận và tràn RAM',
                },
                why: {
                  en: 'If a bad data update sets node A as parent of B and node B as parent of A, a naive recursive CTE will iterate infinitely until server memory or disk temp space is exhausted.',
                  vi: 'Nếu dữ liệu bị lỗi khiến A là cha của B và B lại là cha của A, câu lệnh recursive CTE không có rào chắn sẽ lặp vĩnh viễn đến khi cạn kiệt RAM hoặc đầy ổ cứng.',
                },
                solution: {
                  en: 'Maintain an array of visited IDs (ARRAY[id]) and check `WHERE NOT (e.id = ANY(ot.path_visited))` or use Postgres 14+ CYCLE clause.',
                  vi: 'Duy trì mảng các ID đã duyệt (ARRAY[id]) và kiểm tra `WHERE NOT (e.id = ANY(ot.path_visited))` hoặc dùng mệnh đề CYCLE trong Postgres 14+.',
                },
                codeIncorrect: `-- DANGEROUS: Loops forever if hierarchy has cyclic references
WITH RECURSIVE bad_tree AS (
    SELECT id, parent_id FROM nodes WHERE parent_id IS NULL
    UNION ALL
    SELECT n.id, n.parent_id FROM nodes n JOIN bad_tree bt ON n.parent_id = bt.id
) SELECT * FROM bad_tree;`,
                codeCorrect: `-- SAFE: Cycle protection via path array and depth ceiling
WITH RECURSIVE safe_tree AS (
    SELECT id, parent_id, ARRAY[id] AS visited, 1 AS depth FROM nodes WHERE parent_id IS NULL
    UNION ALL
    SELECT n.id, n.parent_id, st.visited || n.id, st.depth + 1 
    FROM nodes n JOIN safe_tree st ON n.parent_id = st.id
    WHERE NOT (n.id = ANY(st.visited)) AND st.depth < 20
) SELECT * FROM safe_tree;`,
              },
            ],
            practicalScenario: {
              en: 'An e-commerce multi-level product catalog contains nested categories (Electronics > Computers > Laptops > Gaming Laptops). When a customer filters by "Electronics", a recursive CTE fetches all subcategories down to arbitrary depth in a single 4ms query, allowing the catalog service to query `WHERE product.category_id IN (SELECT id FROM category_subtree)`.',
              vi: 'Hệ thống thương mại điện tử chứa cây danh mục nhiều cấp (Điện tử > Máy tính > Laptop > Laptop Gaming). Khi khách hàng chọn lọc theo danh mục cha "Điện tử", một câu lệnh recursive CTE sẽ truy xuất toàn bộ các danh mục con cháu ở mọi độ sâu chỉ trong 4ms, giúp ứng dụng thực thi lọc `WHERE product.category_id IN (SELECT id FROM category_subtree)`.',
            },
            bestPractices: {
              en: [
                'Always index foreign key columns (e.g. parent_id, manager_id) to enable lightning-fast Index Seeks during recursive steps.',
                'Use UNION ALL instead of UNION unless deduplication between branches is strictly necessary.',
                'Always include a safety limit (depth < N) or cycle detection logic to guard against circular references.',
              ],
              vi: [
                'Luôn đánh index trên cột khóa ngoại (ví dụ parent_id, manager_id) để hỗ trợ tìm kiếm Index Seek siêu tốc trong bước đệ quy.',
                'Ưu tiên dùng UNION ALL thay cho UNION trừ khi bắt buộc phải loại bỏ phần tử trùng giữa các nhánh.',
                'Luôn bổ sung điều kiện chặn độ sâu (depth < N) hoặc thuật toán phát hiện chu trình để chống lỗi tham chiếu vòng.',
              ],
            },
            keyTakeaways: {
              en: [
                'Recursive CTEs iterate until the working table returns zero rows.',
                'Anchor Member executes once; Recursive Member iterates over previous output.',
                'Always implement cycle protection when dealing with user-managed graphs.',
              ],
              vi: [
                'Recursive CTE lặp lại cho đến khi bảng làm việc không còn dòng mới.',
                'Anchor Member thực thi 1 lần; Recursive Member lặp trên kết quả bước trước.',
                'Luôn cài đặt cơ chế chống lặp chu trình khi xử lý đồ thị người dùng quản lý.',
              ],
            },
          },
        ],
      },
    ],
  },

  // 4. SQL Common Errors
  {
    id: 'sql-common-errors',
    slug: 'sql-common-errors',
    title: 'SQL Common Errors & Gotchas',
    subtitle: {
      en: 'Performance Bottlenecks, N+1 Queries & NULL Value Pitfalls',
      vi: 'Điểm Nghẽn Hiệu Năng, Lỗi N+1 Query & Cạm Bẫy Giá Trị NULL',
    },
    bookType: 'Common Errors',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Foundational',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-01-22',
    accentColor: 'from-amber-500 to-red-700',
    tags: ['NULL Pitfalls', 'N+1 Problem', 'Debugging', 'Indexing Bugs'],
    description: {
      en: 'Deconstruct frequent SQL traps: NULL comparison bugs, non-sargable functions destroying index scans, and ORM N+1 query proliferation.',
      vi: 'Mổ xẻ các bẫy SQL phổ biến: lỗi so sánh giá trị NULL, hàm non-sargable làm hỏng index scan và hiện tượng bùng nổ query N+1 từ ORM.',
    },
    prerequisites: {
      en: ['SQL query writing experience'],
      vi: ['Đã có kinh nghiệm viết truy vấn SQL'],
    },
    outcomes: {
      en: ['Avoid non-sargable WHERE predicates', 'Detect and eliminate ORM N+1 query loops'],
      vi: ['Bỏ biểu thức non-sargable trong mệnh đề WHERE', 'Phát hiện và triệt tiêu vòng lặp truy vấn N+1 từ ORM'],
    },
    chapters: [
      {
        id: 'sce-ch-1',
        number: 1,
        slug: 'null-logic-three-valued-boolean',
        title: {
          en: 'NULL Values & Three-Valued Logic Pitfalls',
          vi: 'Giá Trị NULL & Cạm Bẫy Logic 3 Trạng Thái',
        },
        summary: {
          en: 'Why WHERE col != 5 filters out NULLs, the NOT IN (NULL) trap, and IS DISTINCT FROM.',
          vi: 'Tại sao WHERE col != 5 loại bỏ cả dòng NULL, bẫy NOT IN (NULL) và toán tử IS DISTINCT FROM.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'sce-1-1',
            title: {
              en: 'Three-Valued Boolean Logic (TRUE, FALSE, UNKNOWN)',
              vi: 'Logic Bool 3 Trạng Thái (TRUE, FALSE, UNKNOWN)',
            },
            keyIdea: {
              en: 'SQL implements Kleene three-valued logic where NULL represents missing or indeterminate information, causing equality and inequality comparisons against NULL to evaluate to UNKNOWN.',
              vi: 'SQL triển khai hệ logic tam phân Kleene trong đó NULL biểu thị thông tin bị thiếu hoặc bất định, khiến các phép so sánh bằng hay khác với NULL đều cho kết quả UNKNOWN.',
            },
            content: {
              en: 'In SQL, NULL is a state of missing or inapplicable data rather than a discrete computational value. Consequently, direct comparisons using `=` or `!=` against NULL do not evaluate to TRUE or FALSE; they evaluate to UNKNOWN. In WHERE and HAVING clauses, the database engine only accepts rows where the predicate evaluates strictly to TRUE; both FALSE and UNKNOWN rows are rejected. The most lethal consequence of this logic occurs with the `NOT IN` operator: `x NOT IN (1, 2, NULL)` expands to `x != 1 AND x != 2 AND x != NULL`. Because `x != NULL` evaluates to UNKNOWN, the entire conjunction becomes UNKNOWN or FALSE, causing the query to return zero rows across the entire table. To compare nullable values safely without surprise rejections, ANSI SQL provides `IS DISTINCT FROM`, and subqueries should utilize `NOT EXISTS`.',
              vi: 'Trong SQL, NULL là trạng thái thiếu dữ liệu hoặc không xác định chứ không phải một giá trị số học cụ thể. Do đó, các phép so sánh trực tiếp bằng `=` hoặc `!=` với NULL không cho ra TRUE hay FALSE, mà trả về UNKNOWN. Trong mệnh đề WHERE và HAVING, engine cơ sở dữ liệu chỉ giữ lại những dòng có điều kiện đánh giá chuẩn xác là TRUE; cả FALSE lẫn UNKNOWN đều bị loại bỏ. Hệ quả tai hại nhất của cơ chế này xảy ra với toán tử `NOT IN`: biểu thức `x NOT IN (1, 2, NULL)` tương đương với `x != 1 AND x != 2 AND x != NULL`. Vì `x != NULL` luôn là UNKNOWN, toàn bộ phép AND liên hoàn sẽ trở thành UNKNOWN hoặc FALSE, khiến truy vấn không trả về bất kỳ dòng nào trên toàn bộ bảng. Để so sánh dữ liệu chứa NULL một cách an toàn, chuẩn ANSI SQL cung cấp toán tử `IS DISTINCT FROM`, và với subquery hãy luôn dùng `NOT EXISTS`.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'null_logic_pitfalls.sql',
              explanation: {
                en: 'Demonstrates the fatal NOT IN (NULL) bug, NULL-safe inequality via IS DISTINCT FROM, and COALESCE handling.',
                vi: 'Minh họa lỗi chết người NOT IN (NULL), phép so sánh khác an toàn với IS DISTINCT FROM và cách xử lý với COALESCE.',
              },
              code: `-- BUG 1: Returns 0 rows if ANY category has parent_id IS NULL!
SELECT * FROM categories 
WHERE id NOT IN (SELECT parent_id FROM categories);

-- FIX 1: Use NOT EXISTS (Immune to NULLs from subquery)
SELECT c.* 
FROM categories c
WHERE NOT EXISTS (
    SELECT 1 FROM categories child 
    WHERE child.parent_id = c.id
);

-- BUG 2: col != 5 excludes all rows where discount IS NULL!
SELECT * FROM products WHERE discount_percent != 10;

-- FIX 2: ANSI SQL IS DISTINCT FROM handles NULL gracefully
SELECT * FROM products 
WHERE discount_percent IS DISTINCT FROM 10;`,
            },
            comparisonTable: {
              headers: [
                { en: 'Logical Expression', vi: 'Biểu Thức Logic' },
                { en: 'Input Value x = NULL', vi: 'Khi Giá Trị x = NULL' },
                { en: 'Evaluated Boolean', vi: 'Kết Quả Bool' },
                { en: 'WHERE Filter Action', vi: 'Hành Vi Bộ Lọc WHERE' },
              ],
              rows: [
                {
                  en: ['x = NULL', 'NULL = NULL', 'UNKNOWN', 'Row Filtered Out (Rejected)'],
                  vi: ['x = NULL', 'NULL = NULL', 'UNKNOWN', 'Bị Loại Bỏ (Rejected)'],
                },
                {
                  en: ['x IS NULL', 'NULL IS NULL', 'TRUE', 'Row Accepted (Kept)'],
                  vi: ['x IS NULL', 'NULL IS NULL', 'TRUE', 'Được Chấp Nhận (Kept)'],
                },
                {
                  en: ['x != 10', 'NULL != 10', 'UNKNOWN', 'Row Filtered Out (Rejected)'],
                  vi: ['x != 10', 'NULL != 10', 'UNKNOWN', 'Bị Loại Bỏ (Rejected)'],
                },
                {
                  en: ['x IS DISTINCT FROM 10', 'NULL IS DISTINCT FROM 10', 'TRUE', 'Row Accepted (Kept)'],
                  vi: ['x IS DISTINCT FROM 10', 'NULL IS DISTINCT FROM 10', 'TRUE', 'Được Chấp Nhận (Kept)'],
                },
                {
                  en: ['x NOT IN (1, 2, NULL)', '5 NOT IN (1, 2, NULL)', 'UNKNOWN', 'All Rows Discarded (0 Rows Returned)'],
                  vi: ['x NOT IN (1, 2, NULL)', '5 NOT IN (1, 2, NULL)', 'UNKNOWN', 'Toàn Bộ Bị Bỏ (Trả về 0 dòng)'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'SQL Three-Valued Logic Truth Table Workflow',
                vi: 'Quy Trình Đánh Giá Logic 3 Trạng Thái Trong SQL',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Predicate Evaluation', vi: 'Đánh Giá Biểu Thức' },
                  description: {
                    en: 'Engine evaluates WHERE condition (e.g. status != "active").',
                    vi: 'Engine tính toán biểu thức điều kiện WHERE (ví dụ status != "active").',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Three-Way Branch', vi: 'Phân Nhánh 3 Trạng Thái' },
                  description: {
                    en: 'Outcome resolves into TRUE, FALSE, or UNKNOWN (if any operand is NULL).',
                    vi: 'Kết quả rơi vào 1 trong 3: TRUE, FALSE hoặc UNKNOWN (nếu có toán hạng NULL).',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Truth Filter Filter Gate', vi: 'Cổng Lọc Chân Trị' },
                  description: {
                    en: 'Only TRUE passes through the filter gate. FALSE and UNKNOWN are dropped.',
                    vi: 'Chỉ có TRUE mới vượt qua cổng lọc. Cả FALSE lẫn UNKNOWN đều bị loại bỏ.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Final Result Set', vi: 'Tập Kết Quả Cuối' },
                  description: {
                    en: 'Result includes only tuples with strictly verified TRUE conditions.',
                    vi: 'Tập kết quả chỉ bao gồm các tuple có điều kiện được xác nhận là TRUE.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Using `col = NULL` instead of `col IS NULL`',
                  vi: 'Dùng cú pháp `col = NULL` thay vì `col IS NULL`',
                },
                why: {
                  en: '`col = NULL` evaluates to UNKNOWN for every row (even rows where col is NULL!), causing the query to return empty results.',
                  vi: 'Biểu thức `col = NULL` cho kết quả UNKNOWN với mọi dòng (kể cả dòng có col đang là NULL!), khiến câu lệnh trả về rỗng.',
                },
                solution: {
                  en: 'Always use `col IS NULL` or `col IS NOT NULL`.',
                  vi: 'Luôn dùng toán tử chuẩn `col IS NULL` hoặc `col IS NOT NULL`.',
                },
                codeIncorrect: `-- NEVER DO THIS: Returns 0 rows
SELECT * FROM users WHERE deleted_at = NULL;`,
                codeCorrect: `-- CORRECT SYNTAX:
SELECT * FROM users WHERE deleted_at IS NULL;`,
              },
            ],
            practicalScenario: {
              en: 'A banking batch job flagged inactive credit cards using `WHERE status NOT IN (SELECT status FROM active_status_list)`. An intern added a new record with NULL status to the status configuration table. Instantly, the batch job stopped processing all cards, generating zero transactions and freezing overdue account processing until the NULL entry was removed.',
              vi: 'Hệ thống ngân hàng quét thẻ tín dụng không hoạt động bằng `WHERE status NOT IN (SELECT status FROM active_status_list)`. Một thực tập sinh vô tình thêm bản ghi có status NULL vào bảng cấu hình. Ngay lập tức, tiến trình xử lý ngưng toàn bộ mọi thẻ, không phát sinh bất kỳ giao dịch nào và làm tê liệt quy trình nhắc nợ cho đến khi bản ghi NULL được dọn sạch.',
            },
            bestPractices: {
              en: [
                'Use NOT EXISTS rather than NOT IN when comparing against subqueries that could contain NULL values.',
                'Use IS DISTINCT FROM when comparing columns that can legitimately contain NULL.',
                'Declare columns NOT NULL with explicit DEFAULT values whenever possible in schema definitions.',
              ],
              vi: [
                'Ưu tiên dùng NOT EXISTS thay cho NOT IN khi đối chiếu với subquery có khả năng chứa giá trị NULL.',
                'Sử dụng toán tử IS DISTINCT FROM khi cần so sánh các cột có chứa NULL hợp lệ.',
                'Luôn khai báo cột NOT NULL kèm DEFAULT rõ ràng trong định nghĩa schema bất cứ khi nào có thể.',
              ],
            },
            keyTakeaways: {
              en: [
                'NULL represents unknown data; comparisons against NULL yield UNKNOWN.',
                'WHERE clauses discard both FALSE and UNKNOWN rows.',
                'NOT IN with any NULL values returns an empty set across all rows.',
              ],
              vi: [
                'NULL biểu thị dữ liệu chưa biết; mọi phép so sánh với NULL đều ra UNKNOWN.',
                'Mệnh đề WHERE loại bỏ cả dòng FALSE lẫn UNKNOWN.',
                'NOT IN nếu gặp bất kỳ giá trị NULL nào sẽ làm rỗng toàn bộ kết quả.',
              ],
            },
          },
        ],
      },
      {
        id: 'sce-ch-2',
        number: 2,
        slug: 'non-sargable-queries-n1-problem',
        title: {
          en: 'Non-Sargable Predicates & ORM N+1 Queries',
          vi: 'Biểu Thức Non-Sargable & Vấn Đề N+1 Truy Vấn',
        },
        summary: {
          en: 'How wrapping indexed columns in functions forces expensive full table scans, and how ORM lazy loading creates N+1 latency spikes.',
          vi: 'Cách bọc cột index trong hàm ép engine quét toàn bộ bảng và cách cơ chế lazy loading của ORM gây bùng nổ độ trễ N+1.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'sce-2-1',
            title: {
              en: 'Fixing Non-Sargable Functions',
              vi: 'Sửa Lỗi Biểu Thức Non-Sargable',
            },
            keyIdea: {
              en: 'A predicate is "sargable" (Search Argument Able) when the database optimizer can use an index directly to seek values rather than applying a function across every row in a sequential scan.',
              vi: 'Một biểu thức được gọi là "sargable" khi engine có thể dùng trực tiếp B-Tree index để tìm kiếm giá trị (Index Seek) thay vì phải gọi hàm tính toán trên từng dòng trong một lượt quét toàn bảng.',
            },
            content: {
              en: 'B-Tree indexes store raw, unmodified scalar column values sorted in ascending or descending order. When a SQL query wraps an indexed column inside a scalar function—such as `WHERE DATE(created_at) = \'2025-01-01\'`, `WHERE UPPER(email) = \'USER@EXAMPLE.COM\'`, or `WHERE amount + 10 > 100`—the database engine cannot mathematically correlate the function output to the indexed tree keys without computing the function for every single row in the table. This forces the query planner to abandon the B-Tree index and resort to an exhaustive, high-latency Sequential Scan. To retain index seeks, transform the predicate so the indexed column sits isolated on one side of the operator (e.g. `WHERE created_at >= \'2025-01-01\' AND created_at < \'2025-01-02\'`), or create an explicit Expression/Functional Index.',
              vi: 'Chỉ mục B-Tree lưu trữ các giá trị nguyên bản của cột được sắp xếp theo thứ tự tăng hoặc giảm. Khi câu truy vấn bọc cột có index bên trong một hàm—chẳng hạn `WHERE DATE(created_at) = \'2025-01-01\'`, `WHERE UPPER(email) = \'USER@EXAMPLE.COM\'`, hay `WHERE amount + 10 > 100`—engine không thể đối chiếu giá trị đầu ra của hàm với các nhánh cây B-Tree nếu không tính toán hàm đó trên từng dòng của bảng. Điều này ép query planner phải bỏ qua index và chuyển sang quét tuần tự toàn bảng (Sequential Scan) cực kỳ tốn thời gian. Để duy trì khả năng Index Seek, hãy biến đổi biểu thức sao cho cột có index đứng độc lập ở một vế của toán tử (ví dụ `WHERE created_at >= \'2025-01-01\' AND created_at < \'2025-01-02\'`), hoặc tạo một Functional Index (Expression Index) tường minh.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'sargable_refactoring.sql',
              explanation: {
                en: 'Demonstrates non-sargable anti-patterns alongside their high-performance sargable equivalents that utilize B-Tree index seeks.',
                vi: 'Minh họa các anti-pattern non-sargable cùng giải pháp sargable hiệu năng cao tận dụng tối đa Index Seek của B-Tree.',
              },
              code: `-- 1. DATE TRUNCATION
-- NON-SARGABLE (Forces Seq Scan on 10M rows):
SELECT * FROM orders WHERE DATE(placed_at) = '2025-01-15';

-- SARGABLE REWRITE (Instant B-Tree Range Seek):
SELECT * FROM orders 
WHERE placed_at >= '2025-01-15 00:00:00' 
  AND placed_at < '2025-01-16 00:00:00';

-- 2. STRING SEARCH
-- NON-SARGABLE (Leading wildcard prevents B-Tree navigation):
SELECT * FROM customers WHERE name LIKE '%Nguyen';

-- SARGABLE (Trailing wildcard allows B-Tree prefix seek):
SELECT * FROM customers WHERE name LIKE 'Nguyen%';

-- 3. ARITHMETIC ON COLUMN
-- NON-SARGABLE (Calculates on each tuple):
SELECT * FROM inventory WHERE stock_count - 5 < 10;

-- SARGABLE (Isolates column on left side):
SELECT * FROM inventory WHERE stock_count < 15;`,
            },
            comparisonTable: {
              headers: [
                { en: 'Predicate Type', vi: 'Loại Biểu Thức' },
                { en: 'Non-Sargable Syntax', vi: 'Cú Pháp Non-Sargable' },
                { en: 'Sargable Alternative', vi: 'Giải Pháp Sargable' },
                { en: 'Execution Strategy', vi: 'Chiến Lược Thực Thi' },
              ],
              rows: [
                {
                  en: ['Date Filtering', 'DATE(col) = "2025-01-01"', 'col >= "2025-01-01" AND col < "2025-01-02"', 'Switches from Seq Scan to Index Range Scan'],
                  vi: ['Lọc Ngày Tháng', 'DATE(col) = "2025-01-01"', 'col >= "2025-01-01" AND col < "2025-01-02"', 'Chuyển từ Seq Scan sang Index Range Scan'],
                },
                {
                  en: ['Case-Insensitive Text', 'LOWER(email) = "a@b.com"', 'email = "a@b.com" (or create functional index on LOWER(email))', 'Functional index enables instant B-Tree seek'],
                  vi: ['Chuỗi Không Phân Biệt Hoa Thường', 'LOWER(email) = "a@b.com"', 'email = "a@b.com" (hoặc đánh functional index trên LOWER(email))', 'Functional index cho phép tìm kiếm tức thì qua B-Tree'],
                },
                {
                  en: ['Substring Matching', 'SUBSTRING(code, 1, 3) = "ABC"', 'code LIKE "ABC%"', 'Utilizes B-Tree index prefix boundary seek'],
                  vi: ['Khớp Chuỗi Con', 'SUBSTRING(code, 1, 3) = "ABC"', 'code LIKE "ABC%"', 'Tận dụng biên giới tiền tố của B-Tree index'],
                },
                {
                  en: ['Arithmetic Expressions', 'price * 1.1 > 100', 'price > 100 / 1.1', 'Constant folded at plan-time; column remains indexable'],
                  vi: ['Phép Tính Số Học', 'price * 1.1 > 100', 'price > 100 / 1.1', 'Hằng số được tính trước; cột giữ nguyên khả năng đánh index'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Index Traversal: Sargable vs Non-Sargable',
                vi: 'Cơ Chế Duyệt Index: Sargable vs Non-Sargable',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Sargable Index Seek', vi: 'Index Seek (Sargable)' },
                  description: {
                    en: 'Engine navigates root to leaf in 3 I/O hops using binary comparison.',
                    vi: 'Engine đi từ nút gốc đến nút lá chỉ qua 3 bước I/O nhờ so sánh nhị phân.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Range Boundary Scan', vi: 'Quét Giới Hạn Khoảng' },
                  description: {
                    en: 'Reads contiguous leaf pointers between lower and upper bounds.',
                    vi: 'Đọc tuần tự các con trỏ lá liền kề giữa cận dưới và cận trên.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Non-Sargable Fallback', vi: 'Sụp Đổ Về Seq Scan (Non-Sargable)' },
                  description: {
                    en: 'Function hides key value; engine discards index and reads entire disk heap.',
                    vi: 'Hàm che giấu giá trị khóa; engine bỏ qua index và quét toàn bộ ổ đĩa heap.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'CPU Computation Overhead', vi: 'Chi Phí Tính Toán CPU' },
                  description: {
                    en: 'Engine invokes function millions of times, spiking CPU and disk I/O.',
                    vi: 'Engine phải gọi hàm hàng triệu lần, đẩy vọt mức dùng CPU và I/O đĩa.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Using leading wildcards (LIKE \'%term\') with standard B-Tree indexes',
                  vi: 'Dùng ký tự đại diện ở đầu chuỗi (LIKE \'%term\') trên B-Tree index',
                },
                why: {
                  en: 'B-Tree indexes sort text lexicographically from left to right. A leading wildcard means any character can appear first, making binary index traversal mathematically impossible.',
                  vi: 'Chỉ mục B-Tree sắp xếp văn bản từ trái qua phải. Ký tự đại diện ở đầu chuỗi đồng nghĩa với việc ký tự đầu tiên có thể là bất kỳ chữ gì, khiến việc tìm kiếm nhị phân trên B-Tree bất khả thi.',
                },
                solution: {
                  en: 'For substring or suffix queries, use PostgreSQL Trigram indexes (`CREATE INDEX ON table USING GIN (col gin_trgm_ops);`).',
                  vi: 'Với các truy vấn tìm kiếm chuỗi con hoặc hậu tố, sử dụng Trigram index trong PostgreSQL (`CREATE INDEX ON table USING GIN (col gin_trgm_ops);`).',
                },
                codeIncorrect: `-- SLOW: Sequential scan across 20M rows
SELECT * FROM articles WHERE title LIKE '%database%';`,
                codeCorrect: `-- FAST: GIN Trigram index handles arbitrary substring search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_articles_title_trgm ON articles USING gin (title gin_trgm_ops);
-- Now LIKE '%database%' executes via Bitmap Index Scan in 2ms!`,
              },
            ],
            practicalScenario: {
              en: 'A delivery platform queried active couriers with `WHERE ST_DWithin(location, target_point, 5000)` but wrapped location in `WHERE ST_AsText(location) LIKE \'%...\'`. Response times were 4,200ms during lunch peak. Refactoring to native PostGIS GiST spatial operators reduced query latency to 8ms and cut database CPU utilization from 95% to 12%.',
              vi: 'Nền tảng giao hàng tìm kiếm tài xế lân cận bằng biểu thức bọc hàm chuỗi `WHERE ST_AsText(location) LIKE \'%...\'`. Thời gian phản hồi lên tới 4.200ms vào giờ cao điểm bữa trưa. Chuyển sang dùng trực tiếp hàm không gian PostGIS chuẩn GiST index `ST_DWithin(location, target_point, 5000)` đã giảm độ trễ xuống 8ms và hạ tải CPU database từ 95% xuống còn 12%.',
            },
            bestPractices: {
              en: [
                'Always isolate indexed columns on one side of equality/inequality comparison operators.',
                'Use explicit timestamp range intervals instead of wrapping dates in DATE() or EXTRACT().',
                'If business logic requires querying on lowercased or transformed text, create an explicit Expression Index (e.g. CREATE INDEX ON users (LOWER(email))).',
              ],
              vi: [
                'Luôn giữ cột có index đứng độc lập ở một vế của toán tử so sánh.',
                'Sử dụng khoảng thời gian timestamp tường minh thay vì bọc cột trong DATE() hoặc EXTRACT().',
                'Nếu logic nghiệp vụ bắt buộc tìm kiếm chữ thường, hãy tạo Expression Index tường minh (ví dụ CREATE INDEX ON users (LOWER(email))).',
              ],
            },
            keyTakeaways: {
              en: [
                'Wrapping columns in functions disables B-Tree index seeks and causes sequential scans.',
                'Sargable queries leave indexed columns clean and evaluate constants at plan time.',
                'Use Trigram (GIN) indexes for substring searches containing leading wildcards.',
              ],
              vi: [
                'Bọc cột trong hàm làm mất tác dụng của B-Tree index và gây quét toàn bảng.',
                'Truy vấn sargable giữ nguyên cột index và tính toán trước các hằng số.',
                'Dùng Trigram index (GIN) cho các truy vấn chuỗi có ký tự đại diện ở đầu.',
              ],
            },
          },
        ],
      },
    ],
  },

  // 5. SQL Best Practices
  {
    id: 'sql-best-practices',
    slug: 'sql-best-practices',
    title: 'SQL Best Practices & Indexing',
    subtitle: {
      en: 'B-Tree Index Tuning, Execution Plan Analysis & Schema Design',
      vi: 'Tối Ưu Chỉ Mục B-Tree, Phân Tích Execution Plan & Thiết Kế Schema',
    },
    bookType: 'Best Practices',
    categoryId: 'sql',
    subjectId: 'storage',
    author: '4TM Technical Board',
    role: 'Core Engineering Group',
    level: 'Intermediate',
    estimatedReadTime: '30 mins',
    chaptersCount: 2,
    publishedDate: '2025-02-05',
    accentColor: 'from-blue-700 to-indigo-900',
    tags: ['EXPLAIN ANALYZE', 'Indexing', 'Optimization', 'Best Practices'],
    description: {
      en: 'Production database optimization guidelines: reading EXPLAIN ANALYZE, composite indexing strategies, partial indexes, and Connection Pooling.',
      vi: 'Quy chuẩn tối ưu cơ sở dữ liệu sản xuất: đọc EXPLAIN ANALYZE, chiến lược index hợp phần (Composite Index), Partial Index và Connection Pooling.',
    },
    prerequisites: {
      en: ['Database administration or backend querying experience'],
      vi: ['Kinh nghiệm quản trị hoặc viết truy vấn backend'],
    },
    outcomes: {
      en: ['Interpret PostgreSQL EXPLAIN ANALYZE cost trees', 'Design covering composite indexes for complex multi-column queries'],
      vi: ['Đọc hiểu cây chi phí EXPLAIN ANALYZE của PostgreSQL', 'Thiết kế Composite Index bao phủ cho truy vấn nhiều cột'],
    },
    chapters: [
      {
        id: 'sbp-ch-1',
        number: 1,
        slug: 'explain-analyze-interpretation',
        title: {
          en: 'Reading EXPLAIN ANALYZE Execution Plans',
          vi: 'Đọc Hiểu Kế Hoạch Thực Thi EXPLAIN ANALYZE',
        },
        summary: {
          en: 'Cost metrics, actual time, loops, rows estimation, Index Scan vs Index Only Scan, and Visibility Map.',
          vi: 'Chỉ số cost, thời gian thực tế, số vòng lặp, dự đoán số dòng, Index Scan vs Index Only Scan và Visibility Map.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'sbp-1-1',
            title: {
              en: 'Index Scan vs Index Only Scan vs Seq Scan',
              vi: 'Index Scan vs Index Only Scan vs Sequential Scan',
            },
            keyIdea: {
              en: 'An Index Only Scan completely bypasses reading physical table heap pages by resolving all required SELECT and WHERE attributes directly from the B-Tree leaf pages, gated by the table Visibility Map.',
              vi: 'Phép Index Only Scan hoàn toàn không cần đọc các trang heap bảng vật lý vì toàn bộ thuộc tính cần thiết trong SELECT và WHERE đều nằm ngay trên lá B-Tree, được bảo chứng bởi Visibility Map.',
            },
            content: {
              en: 'When executing a SQL query, the query optimizer selects among three primary table access paths. Sequential Scan (Seq Scan) streams every 8KB disk block in the heap table file sequentially; it is optimal when retrieving a significant fraction (>20%) of total rows. An Index Scan traverses the B-Tree index structure using binary comparisons from root to leaf, finds matching item pointers (ctid), and then performs random disk I/O reads against the table heap pages to retrieve non-indexed column attributes and verify MVCC tuple visibility. An Index Only Scan represents the ultimate access tier: every column referenced in the entire query (in SELECT, WHERE, ORDER BY, GROUP BY) is included in the index definition. If the page is marked all-visible in the PostgreSQL Visibility Map, the engine fetches data straight from the index without touching the heap file at all.',
              vi: 'Khi thực thi một câu lệnh SQL, bộ tối ưu hóa lựa chọn giữa ba phương thức truy cập dữ liệu chính. Sequential Scan (Seq Scan) đọc tuần tự từng khối 8KB trên file dữ liệu heap của bảng; phương thức này tối ưu nhất khi cần lấy một lượng lớn dữ liệu (>20% tổng số dòng). Index Scan duyệt cây B-Tree từ gốc đến lá bằng so sánh nhị phân, tìm các con trỏ dòng (ctid), rồi thực hiện đọc ngẫu nhiên (random I/O) vào heap page để lấy các cột không có trong index và kiểm tra tính hiển thị MVCC. Index Only Scan là cấp độ truy cập tối ưu nhất: mọi cột xuất hiện trong câu truy vấn (ở SELECT, WHERE, ORDER BY, GROUP BY) đều đã nằm sẵn trong index. Nếu trang dữ liệu được Visibility Map đánh dấu là all-visible, engine lấy dữ liệu trực tiếp từ B-Tree mà không cần đụng đến heap file.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'explain_analyze_audit.sql',
              explanation: {
                en: 'Demonstrates creating a Covering Index using the modern INCLUDE clause to upgrade a costly Index Scan into a zero-heap Index Only Scan.',
                vi: 'Minh họa việc tạo Covering Index với mệnh đề INCLUDE hiện đại để nâng cấp Index Scan tốn kém thành Index Only Scan không chạm file heap.',
              },
              code: `-- 1. Base table setup
CREATE TABLE customer_orders (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INT NOT NULL,
    status VARCHAR(32) NOT NULL,
    total_amount NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);

-- 2. Query needing high throughput
-- Without covering index: Index Scan on customer_id + 50,000 random heap page fetches
EXPLAIN (ANALYZE, BUFFERS)
SELECT customer_id, total_amount, status 
FROM customer_orders 
WHERE customer_id = 4501;

-- 3. CREATE COVERING INDEX with INCLUDE (Postgres 11+)
-- customer_id is the B-Tree search key; total_amount and status are payload attributes
CREATE INDEX idx_orders_covering 
ON customer_orders (customer_id) 
INCLUDE (total_amount, status);

-- 4. Re-run: Now achieves pure INDEX ONLY SCAN (Heap Fetches: 0)!
EXPLAIN (ANALYZE, BUFFERS)
SELECT customer_id, total_amount, status 
FROM customer_orders 
WHERE customer_id = 4501;`,
            },
            comparisonTable: {
              headers: [
                { en: 'Scan Method', vi: 'Phương Thức Quét' },
                { en: 'Index Traversal', vi: 'Duyệt Qua Index' },
                { en: 'Table Heap Access', vi: 'Đọc Vào File Heap Bảng' },
                { en: 'Ideal Data Selectivity', vi: 'Tỷ Lệ Dữ Liệu Tối Ưu' },
              ],
              rows: [
                {
                  en: ['Seq Scan', 'None (Ignored)', 'Reads 100% of physical table pages sequentially', 'Broad queries (> 15-25% of table rows)'],
                  vi: ['Seq Scan', 'Không dùng', 'Đọc tuần tự 100% các trang bảng trên đĩa', 'Truy vấn diện rộng (> 15-25% tổng số dòng)'],
                },
                {
                  en: ['Index Scan', 'Traverses B-Tree to fetch matching row ctids', 'Performs random I/O heap lookups for non-indexed columns', 'Selective queries (< 5-10% of table rows)'],
                  vi: ['Index Scan', 'Duyệt B-Tree để lấy danh sách con trỏ ctid', 'Thực hiện random I/O đọc heap cho các cột còn lại', 'Truy vấn chọn lọc (< 5-10% tổng số dòng)'],
                },
                {
                  en: ['Index Only Scan', 'Traverses B-Tree; extracts all requested columns', 'Zero heap reads (if Visibility Map is clean)', 'High-throughput transactional & analytics reads'],
                  vi: ['Index Only Scan', 'Duyệt B-Tree; trích xuất toàn bộ cột yêu cầu', 'Hoàn toàn không đọc heap (nếu Visibility Map sạch)', 'Truy vấn đọc thông lượng cao cho giao dịch & phân tích'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Index Scan vs Index Only Scan Data Flow',
                vi: 'Luồng Dữ Liệu: Index Scan vs Index Only Scan',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'B-Tree Navigation', vi: 'Duyệt Cây B-Tree' },
                  description: {
                    en: 'Engine searches B-Tree root -> interior nodes -> target leaf page.',
                    vi: 'Engine tìm kiếm từ nút gốc -> nút trung gian -> nút lá mục tiêu.',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Leaf Payload Extraction', vi: 'Trích Xuất Payload Nút Lá' },
                  description: {
                    en: 'Leaf contains indexed keys and optional INCLUDE payload columns.',
                    vi: 'Nút lá chứa khóa index và các cột payload kèm theo trong INCLUDE.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Visibility Map Check', vi: 'Kiểm Tra Visibility Map' },
                  description: {
                    en: 'Engine checks 1 bit in RAM Visibility Map: is target table page all-visible?',
                    vi: 'Engine kiểm tra 1 bit trên Visibility Map trong RAM: trang đó có all-visible không?',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Heap Read Decision', vi: 'Quyết Định Đọc Heap' },
                  description: {
                    en: 'If yes, returns row immediately (Index Only Scan). If not, fetches heap block.',
                    vi: 'Nếu đúng, trả về kết quả ngay (Index Only Scan). Nếu không, phải đọc heap block.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Adding unneeded columns to B-Tree keys instead of using the INCLUDE clause',
                  vi: 'Thêm cột không cần thiết vào khóa B-Tree thay vì dùng mệnh đề INCLUDE',
                },
                why: {
                  en: 'Putting columns into the index key itself inflates the size of intermediate non-leaf B-Tree pages, reducing fan-out, increasing B-Tree height, and degrading general seek performance.',
                  vi: 'Đưa các cột payload vào thân khóa index làm phình to các trang trung gian của B-Tree, giảm hệ số phân nhánh (fan-out), tăng độ cao của cây và làm chậm tốc độ tìm kiếm.',
                },
                solution: {
                  en: 'Use `CREATE INDEX ON t (filter_col) INCLUDE (payload_col);` so payload columns reside only on leaf pages.',
                  vi: 'Sử dụng `CREATE INDEX ON t (filter_col) INCLUDE (payload_col);` để các cột payload chỉ nằm ở nút lá.',
                },
                codeIncorrect: `-- BAD: Inflates all interior B-Tree index nodes
CREATE INDEX idx_orders_fat ON orders (customer_id, status, notes, total_amount);`,
                codeCorrect: `-- GOOD: customer_id is key; others are non-key leaf payload
CREATE INDEX idx_orders_covering ON orders (customer_id) INCLUDE (status, total_amount);`,
              },
            ],
            practicalScenario: {
              en: 'A high-frequency API serving user authentication queried `SELECT password_hash, status FROM users WHERE email = ?`. Under 10,000 req/sec, database disk I/O saturated at 100% because each authentication required a random heap page read. Adding `CREATE INDEX ON users (email) INCLUDE (password_hash, status)` dropped heap fetches to zero, reducing disk I/O by 94% and API latency from 45ms to 1.8ms.',
              vi: 'API xác thực người dùng truy vấn `SELECT password_hash, status FROM users WHERE email = ?`. Khi đạt tải 10.000 req/giây, I/O đĩa cứng chạm ngưỡng 100% vì mỗi lần đăng nhập đều phải đọc ngẫu nhiên một trang heap. Bổ sung `CREATE INDEX ON users (email) INCLUDE (password_hash, status)` đã kéo số lượt đọc heap về 0, giảm 94% I/O đĩa và đưa độ trễ API từ 45ms xuống còn 1.8ms.',
            },
            bestPractices: {
              en: [
                'Always run EXPLAIN (ANALYZE, BUFFERS) to verify whether queries produce "Heap Fetches: 0".',
                'Ensure VACUUM runs regularly so that table Visibility Maps remain up to date for Index Only Scans.',
                'Use the INCLUDE clause for query columns that are only projected in SELECT but never filtered in WHERE.',
              ],
              vi: [
                'Luôn chạy EXPLAIN (ANALYZE, BUFFERS) để kiểm tra xem câu lệnh có đạt "Heap Fetches: 0" hay không.',
                'Đảm bảo VACUUM chạy đều đặn để Visibility Map luôn được cập nhật, kích hoạt Index Only Scan tối đa.',
                'Dùng mệnh đề INCLUDE cho các cột chỉ xuất hiện ở SELECT chứ không bao giờ lọc trong WHERE.',
              ],
            },
            keyTakeaways: {
              en: [
                'Seq Scan reads all heap blocks; Index Scan reads index + random heap pages.',
                'Index Only Scan extracts all data from B-Tree leaf pages without heap reads.',
                'Visibility Map all-visible bits are mandatory for zero-heap Index Only Scans.',
              ],
              vi: [
                'Seq Scan đọc toàn bộ heap; Index Scan đọc index kèm random I/O vào heap.',
                'Index Only Scan trích xuất toàn bộ dữ liệu từ lá B-Tree mà không chạm file heap.',
                'Bit all-visible trong Visibility Map là điều kiện tiên quyết để Index Only Scan không đọc heap.',
              ],
            },
          },
        ],
      },
      {
        id: 'sbp-ch-2',
        number: 2,
        slug: 'composite-and-partial-indexing',
        title: {
          en: 'Composite & Partial Indexing Strategies',
          vi: 'Chiến Lược Index Hợp Phần & Partial Index',
        },
        summary: {
          en: 'Leftmost prefix rule for composite indexes, equality-first range-second design, and partial index disk savings.',
          vi: 'Quy tắc tiền tố bên trái cho Composite Index, nguyên tắc bằng-trước khoảng-sau và tiết kiệm đĩa với Partial Index.',
        },
        readTimeMinutes: 15,
        sections: [
          {
            id: 'sbp-2-1',
            title: {
              en: 'The Leftmost Prefix Rule',
              vi: 'Quy Tắc Tiền Tố Bên Trái Trong Composite Index',
            },
            keyIdea: {
              en: 'A composite index on (A, B, C) behaves like a hierarchical telephone directory, serving queries filtering on A, A+B, or A+B+C, but useless for queries filtering solely on B or C.',
              vi: 'Một Composite Index trên (A, B, C) hoạt động như danh bạ điện thoại phân cấp, hỗ trợ hoàn hảo cho truy vấn lọc A, A+B, hoặc A+B+C, nhưng vô dụng nếu chỉ lọc đơn lẻ trên B hoặc C.',
            },
            content: {
              en: 'A composite (multi-column) B-Tree index sorts entries first by the leading column, then by the second column within identical values of the first, and so on. Because of this nested sort order, the database engine can only navigate the index tree if the query conditions specify the leading ("leftmost") column. For example, an index on `(tenant_id, status, created_at)` can satisfy queries on `tenant_id`, queries on `tenant_id AND status`, and queries on `tenant_id AND status AND created_at`. However, a query filtering strictly on `status` cannot leverage the index because status values are dispersed across different tenant branches. Furthermore, when designing composite indexes, always order columns according to the golden rule: Equality columns first, followed by Inequality/Range columns.',
              vi: 'Chỉ mục Composite (đa cột) B-Tree sắp xếp các bản ghi trước hết theo cột đầu tiên, sau đó mới sắp xếp tiếp theo cột thứ hai bên trong các giá trị trùng của cột đầu, và cứ tiếp tục như vậy. Do thứ tự sắp xếp lồng nhau này, engine chỉ có thể điều hướng cây index nếu câu truy vấn cung cấp cột đứng đầu ("tiền tố bên trái"). Ví dụ, một index trên `(tenant_id, status, created_at)` phục vụ tốt truy vấn lọc `tenant_id`, truy vấn `tenant_id AND status`, và `tenant_id AND status AND created_at`. Tuy nhiên, truy vấn chỉ lọc `status` hoàn toàn không dùng được index này vì các giá trị status nằm phân tán ở các nhánh tenant khác nhau. Hơn nữa, khi thiết kế composite index, hãy luôn áp dụng quy tắc vàng: Các cột lọc theo phép Bằng (=) đứng trước, các cột lọc theo Khoảng (<, >, BETWEEN) đứng sau.',
            },
            codeBlock: {
              language: 'sql',
              filename: 'composite_and_partial_index.sql',
              explanation: {
                en: 'Demonstrates the Equality-First Range-Second composite rule, plus a lightweight Partial Index for active rows.',
                vi: 'Minh họa quy tắc Bằng-Trước Khoảng-Sau cho Composite Index và kỹ thuật Partial Index siêu nhẹ cho dữ liệu active.',
              },
              code: `-- 1. INEFFICIENT COMPOSITE INDEX (Range column placed first):
-- created_at comes first: once a range scan begins, status cannot be used for index seek!
CREATE INDEX idx_bad ON orders (created_at, status);

-- 2. OPTIMAL COMPOSITE INDEX (Equality first, Range second):
-- Filters status = 'pending' instantly, then scans created_at range within that subset!
CREATE INDEX idx_good ON orders (status, created_at);

-- Query that benefits massively from idx_good:
SELECT * FROM orders 
WHERE status = 'pending' 
  AND created_at >= '2025-01-01';

-- 3. PARTIAL INDEX: Only indexes rows that matter
-- Table has 10M rows, but only 5,000 are unprocessed (status = 'queued')
-- Index size drops from 450MB down to 180KB!
CREATE INDEX idx_orders_unprocessed 
ON orders (priority, created_at) 
WHERE status = 'queued';

-- Query automatically uses partial index:
SELECT * FROM orders 
WHERE status = 'queued' 
ORDER BY priority DESC, created_at ASC;`,
            },
            comparisonTable: {
              headers: [
                { en: 'Index Definition', vi: 'Định Nghĩa Index' },
                { en: 'Query Filter Predicate', vi: 'Điều Kiện Lọc Truy Vấn' },
                { en: 'Index Usability', vi: 'Khả Năng Sử Dụng Index' },
                { en: 'Mechanism', vi: 'Cơ Chế Hoạt Động' },
              ],
              rows: [
                {
                  en: ['INDEX (A, B, C)', 'WHERE A = 1 AND B = 2', 'Full B-Tree Seek', 'Navigates hierarchy directly down to leaf block'],
                  vi: ['INDEX (A, B, C)', 'WHERE A = 1 AND B = 2', 'Index Seek Hoàn Toàn', 'Đi thẳng theo phân cấp đến khối lá mục tiêu'],
                },
                {
                  en: ['INDEX (A, B, C)', 'WHERE A = 1 AND C = 3', 'Partial Index Seek', 'Seeks on A; filters C as non-indexed scan predicate'],
                  vi: ['INDEX (A, B, C)', 'WHERE A = 1 AND C = 3', 'Index Seek Một Phần', 'Seek trên A; lọc C như điều kiện thông thường'],
                },
                {
                  en: ['INDEX (A, B, C)', 'WHERE B = 2 AND C = 3', 'Cannot Use Index (Seq Scan)', 'Leftmost leading column A is completely absent'],
                  vi: ['INDEX (A, B, C)', 'WHERE B = 2 AND C = 3', 'Không Dùng Được (Seq Scan)', 'Cột tiền tố bên trái A hoàn toàn vắng mặt'],
                },
                {
                  en: ['INDEX (A, B) WHERE status = "active"', 'WHERE status = "active" AND A = 1', 'Partial Index Seek', 'Extremely compact index; zero disk overhead for inactive rows'],
                  vi: ['INDEX (A, B) WHERE status = "active"', 'WHERE status = "active" AND A = 1', 'Index Seek Trên Partial Index', 'Index siêu gọn nhẹ; không tốn dung lượng cho dữ liệu inactive'],
                },
              ],
            },
            diagram: {
              title: {
                en: 'Composite B-Tree Sort Order & Seek Hierarchy',
                vi: 'Thứ Tự Sắp Xếp & Phân Cấp Tìm Kiếm Trong Composite B-Tree',
              },
              steps: [
                {
                  number: 1,
                  label: { en: 'Column 1 Partitioning', vi: 'Phân Nhánh Cột 1' },
                  description: {
                    en: 'Entries ordered primarily by Column 1 (e.g. status: active, pending).',
                    vi: 'Bản ghi sắp xếp tiên quyết theo Cột 1 (ví dụ status: active, pending).',
                  },
                },
                {
                  number: 2,
                  label: { en: 'Column 2 Sub-Sorting', vi: 'Sắp Xếp Cục Bộ Cột 2' },
                  description: {
                    en: 'Within matching Column 1 values, entries sorted by Column 2 (created_at).',
                    vi: 'Bên trong các giá trị trùng của Cột 1, bản ghi được xếp theo Cột 2.',
                  },
                },
                {
                  number: 3,
                  label: { en: 'Equality Boundary Lock', vi: 'Khóa Biên Giới Phép Bằng' },
                  description: {
                    en: 'Engine locks exact start point using equality match on Column 1.',
                    vi: 'Engine định vị điểm bắt đầu chính xác nhờ phép so sánh bằng ở Cột 1.',
                  },
                },
                {
                  number: 4,
                  label: { en: 'Contiguous Range Sweep', vi: 'Quét Khoảng Liền Kề' },
                  description: {
                    en: 'Engine sweeps contiguous range pointers for Column 2 without random hopping.',
                    vi: 'Engine quét tuần tự các con trỏ khoảng của Cột 2 không cần nhảy ngẫu nhiên.',
                  },
                },
              ],
            },
            commonMistakes: [
              {
                mistake: {
                  en: 'Creating duplicate single-column indexes on every column instead of a targeted composite index',
                  vi: 'Tạo hàng loạt index đơn lẻ cho từng cột thay vì một composite index chuẩn xác',
                },
                why: {
                  en: 'Multiple single-column indexes force the database to combine results via Bitmap Index Scans (BitmapAnd), burning substantial CPU and memory while slowing down all INSERT/UPDATE statements.',
                  vi: 'Nhiều index đơn lẻ ép database phải gộp kết quả qua Bitmap Index Scan (BitmapAnd), gây tốn CPU và RAM trong khi làm chậm mọi thao tác INSERT/UPDATE.',
                },
                solution: {
                  en: 'Analyze high-volume queries and consolidate multiple single-column indexes into a single composite index following the leftmost prefix rule.',
                  vi: 'Phân tích các truy vấn quan trọng và gom các index đơn lẻ thành một composite index duy nhất tuân thủ quy tắc tiền tố bên trái.',
                },
                codeIncorrect: `-- WASTEFUL: 3 separate indexes slow down writes and require BitmapAnd
CREATE INDEX idx_t ON orders (tenant_id);
CREATE INDEX idx_s ON orders (status);
CREATE INDEX idx_d ON orders (placed_at);`,
                codeCorrect: `-- EFFICIENT: 1 composite index handles tenant_id + status + placed_at queries
CREATE INDEX idx_orders_compound ON orders (tenant_id, status, placed_at);`,
              },
            ],
            practicalScenario: {
              en: 'A notification dispatch queue table contained 40 million processed records and 12,000 pending notifications. Queries checking for pending jobs scanned a 2.4GB standard index on (status, scheduled_at). Replacing it with a Partial Index `CREATE INDEX ON queue (scheduled_at) WHERE status = \'pending\'` reduced index size from 2,400MB to 420KB and slashed queue polling latency from 85ms to 0.4ms.',
              vi: 'Bảng hàng đợi thông báo chứa 40 triệu bản ghi đã gửi và 12.000 bản ghi đang chờ xử lý. Truy vấn quét tác vụ chờ phải đọc một index tiêu chuẩn nặng 2.4GB trên (status, scheduled_at). Thay thế bằng Partial Index `CREATE INDEX ON queue (scheduled_at) WHERE status = \'pending\'` đã thu nhỏ dung lượng index từ 2.400MB xuống chỉ còn 420KB và kéo độ trễ kiểm tra hàng đợi từ 85ms xuống còn 0.4ms.',
            },
            bestPractices: {
              en: [
                'Structure composite index columns with Equality predicates first and Range/Inequality predicates second.',
                'Use Partial Indexes with WHERE clauses whenever querying heavily skewed data (e.g. active vs archived records).',
                'Do not create separate indexes on Column A if a composite index on (A, B) already exists; (A, B) covers queries on A.',
              ],
              vi: [
                'Thiết kế thứ tự cột composite index: Cột lọc bằng (=) đứng trước, cột lọc khoảng (<, >, BETWEEN) đứng sau.',
                'Sử dụng Partial Index có mệnh đề WHERE khi truy vấn trên dữ liệu lệch nhiều (ví dụ dòng active so với archived).',
                'Không tạo thêm index đơn lẻ trên cột A nếu đã có composite index trên (A, B); vì (A, B) đã bao trùm truy vấn trên A.',
              ],
            },
            keyTakeaways: {
              en: [
                'Composite indexes require the leftmost column in query predicates to be usable.',
                'Sort order: equality columns first, inequality range columns second.',
                'Partial indexes drastically shrink index footprint by excluding unneeded rows.',
              ],
              vi: [
                'Composite index bắt buộc phải có cột tiền tố bên trái trong điều kiện lọc mới dùng được.',
                'Thứ tự sắp xếp: cột so sánh bằng đứng trước, cột khoảng đứng sau.',
                'Partial index thu nhỏ vượt trội kích thước index bằng cách loại bỏ các dòng không cần thiết.',
              ],
            },
          },
        ],
      },
    ],
  },

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
