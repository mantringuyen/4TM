import { Lesson } from '../../../../types';

export const lesson25: Lesson = {
  id: 'sql_lesson_25',
  moduleId: 'sql_mod_5',
  levelId: 'advanced',
  courseId: 'sql',
  order: 25,
  topicId: 'sql_indexing_strategies',
  title: {
    en: 'B-Tree Indexes, Composite Indexes & Covering Indexes',
    vi: 'Chỉ Mục B-Tree, Chỉ Mục Tổ Hợp & Chỉ Mục Bao Phủ (Covering Indexes)'
  },
  summary: {
    en: 'Master relational database indexing architectures: B-Tree tree structures (O(log N) lookups), composite multi-column indexing with the Leftmost Prefix Rule, zero-heap-lookup Covering Indexes (Index-Only Scans), and index maintenance overhead.',
    vi: 'Làm chủ kiến trúc chỉ mục CSDL quan hệ: cấu trúc cây B-Tree (tìm kiếm O(log N)), chỉ mục tổ hợp đa cột với Quy tắc tiền tố bên trái (Leftmost Prefix Rule), chỉ mục bao phủ Index-Only Scan không cần đọc heap và chi phí bảo trì chỉ mục.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Without indexes, finding a single row among 100 million records requires a brutal Full Table Scan (O(N) sequential page reads). Indexes are specialized auxiliary data structures—predominantly balanced B-Trees—that accelerate search, join, and sort queries to O(log N) logarithmic speeds.',
      vi: 'Nếu không có chỉ mục, việc tìm một dòng duy nhất trong 100 triệu bản ghi đòi hỏi phải quét tuần tự toàn bộ bảng (Full Table Scan O(N)). Chỉ mục là các cấu trúc dữ liệu phụ trợ đặc biệt—chủ yếu là cây B-Tree tự cân bằng—giúp tăng tốc độ tìm kiếm, join và sắp xếp lên mức logarit O(log N) chỉ trong vài phần nghìn giây.'
    },
    conceptExplanation: {
      en: 'B-Tree Architecture & Advanced Indexing Strategies:\n1. B-Tree Anatomy:\n   - Root & Branch Nodes: Guide tree traversals via binary/n-ary key comparisons.\n   - Leaf Nodes: Doubly-linked pages storing sorted key values alongside physical row pointers (ROWID or Primary Key clustering pointer).\n2. Composite (Multi-Column) Indexes:\n   - "CREATE INDEX idx_user_status ON users(department_id, is_active, created_at);"\n   - The Leftmost Prefix Rule: The index can satisfy queries filtering on (department_id), or (department_id, is_active), or all three, but CANNOT be used efficiently for is_active alone without the leading prefix.\n3. Covering Indexes & Index-Only Scans:\n   - An index that contains EVERY column requested by the SELECT, WHERE, and ORDER BY clauses.\n   - Eliminates expensive secondary table heap lookups (Double-Read avoidance).\n   - Implemented via composite keys or the "INCLUDE (col1, col2)" clause.\n4. Write-Amplification Trade-off: Every index speeds up SELECT queries but slows down INSERT, UPDATE, and DELETE operations.',
      vi: 'Kiến trúc B-Tree & Các chiến lược chỉ mục nâng cao:\n1. Giải phẫu cây B-Tree:\n   - Nút gốc (Root) & Nút nhánh (Branch): Định hướng duyệt cây thông qua so sánh khóa.\n   - Nút lá (Leaf): Các trang nhớ liên kết đôi lưu trữ giá trị khóa đã sắp xếp kèm con trỏ vật lý trỏ đến dòng thật (ROWID hoặc Clustered PK).\n2. Chỉ mục tổ hợp (Composite / Multi-Column Indexes):\n   - "CREATE INDEX idx_user_status ON users(department_id, is_active, created_at);"\n   - Quy tắc tiền tố bên trái (Leftmost Prefix Rule): Chỉ mục phục vụ tốt cho các truy vấn lọc theo (department_id), hoặc (department_id, is_active), hoặc cả 3, nhưng KHÔNG THỂ dùng tối ưu cho riêng is_active nếu thiếu cột tiền tố đầu tiên.\n3. Chỉ mục bao phủ (Covering Indexes / Index-Only Scans):\n   - Chỉ mục chứa ĐẦY ĐỦ MỌI CỘT mà câu lệnh SELECT, WHERE và ORDER BY yêu cầu.\n   - Loại bỏ hoàn toàn chi phí nhảy đọc bảng gốc trên ổ đĩa (tránh đọc hai lần - Double Read).\n   - Cài đặt bằng chỉ mục tổ hợp hoặc mệnh đề "INCLUDE (cột1, cột2)".\n4. Đánh đổi chi phí ghi (Write-Amplification): Mỗi chỉ mục tạo thêm giúp tăng tốc SELECT nhưng làm chậm các lệnh INSERT, UPDATE và DELETE.'
    },
    syntax: `-- Basic B-Tree Index
CREATE INDEX idx_emp_dept ON employees(department_id);

-- Composite Index
CREATE INDEX idx_orders_cust_date ON orders(customer_id, order_date DESC);

-- Covering Index (PostgreSQL / SQL Server syntax)
-- CREATE INDEX idx_emp_cover ON employees(department_id) INCLUDE (name, salary);

-- Unique Constraint Index
CREATE UNIQUE INDEX idx_user_email ON users(email);`,
    examples: [
      {
        title: {
          en: '1. Eliminating Heap Lookups with an Index-Only Scan Pattern',
          vi: '1. Loại Bỏ Quét Bảng Gốc Bằng Mẫu Index-Only Scan'
        },
        code: `CREATE INDEX idx_sales_rep_metric ON sales(sales_rep_id, sale_date, revenue);

-- This query is satisfied 100% directly from the index leaf pages:
SELECT sales_rep_id, sale_date, revenue
FROM sales
WHERE sales_rep_id = 104 AND sale_date >= '2026-01-01'
ORDER BY sale_date ASC;`,
        language: 'sql',
        explanation: {
          en: 'Because sales_rep_id, sale_date, and revenue are all stored inside the index leaf node, the database completely skips reading the physical sales table pages.',
          vi: 'Vì sales_rep_id, sale_date và revenue đều có sẵn trong nút lá của chỉ mục nên CSDL hoàn toàn không cần chạm đến trang nhớ của bảng sales gốc.'
        }
      },
      {
        title: {
          en: '2. Drop Index Safely',
          vi: '2. Xóa Chỉ Mục An Toàn'
        },
        code: `DROP INDEX IF EXISTS idx_sales_rep_metric;`,
        language: 'sql',
        explanation: {
          en: 'Safely removes an obsolete index to recover disk space and eliminate write-amplification overhead.',
          vi: 'Xóa chỉ mục không còn sử dụng một cách an toàn để giải phóng dung lượng đĩa và giảm tải chi phí ghi.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Indexing every single column in a table individually.',
          vi: 'Đánh chỉ mục đơn lẻ cho từng cột riêng biệt trong bảng.'
        },
        correction: {
          en: 'Multiple single-column indexes rarely get used together and severely degrade INSERT/UPDATE performance. Design targeted composite indexes tailored to your specific query access patterns instead.',
          vi: 'Nhiều chỉ mục đơn lẻ hiếm khi kết hợp hiệu quả và làm giảm nghiêm trọng tốc độ ghi. Hãy thiết kế chỉ mục tổ hợp phục vụ đúng mô hình truy vấn thực tế.'
        }
      },
      {
        mistake: {
          en: 'Violating the Leftmost Prefix Rule on composite indexes (e.g. querying WHERE colB = 10 on INDEX(colA, colB)).',
          vi: 'Vi phạm Quy tắc Tiền tố Bên trái trên chỉ mục tổ hợp (như truy vấn WHERE colB = 10 trên INDEX(colA, colB)).'
        },
        correction: {
          en: 'A composite index on (A, B, C) is sorted primarily by A, secondarily by B, and tertiarily by C. Filtering on B alone cannot perform a direct B-tree range seek. Ensure your query includes the leading index columns.',
          vi: 'Chỉ mục tổ hợp (A, B, C) được sắp xếp ưu tiên theo A, rồi đến B, rồi đến C. Lọc trên riêng B sẽ không thể thực hiện tìm kiếm trực tiếp trên cây B-Tree. Hãy đảm bảo truy vấn chứa cột tiền tố dẫn đầu.'
        }
      }
    ],
    tips: [
      {
        en: 'Primary Key and UNIQUE constraints automatically create underlying unique B-Tree indexes under the hood in almost all relational databases.',
        vi: 'Khóa chính và ràng buộc UNIQUE luôn tự động tạo ra một chỉ mục B-Tree duy nhất bên dưới trong hầu hết các hệ quản trị CSDL.'
      },
      {
        en: 'High cardinality columns (columns with many unique values like user_id or email) make ideal index candidates.',
        vi: 'Các cột có độ phân tán cao (cardinality cao như user_id hoặc email) là ứng viên lý tưởng nhất để đánh chỉ mục.'
      }
    ],
    practiceStarterCode: `-- Create a composite index
CREATE INDEX idx_emp_dept_salary ON employees(department_id, salary DESC);`
  },
  exercisePool: [
    {
      id: 'sql_ex_idx_1',
      type: 'complete_code',
      title: {
        en: 'Create Composite B-Tree Index',
        vi: 'Tạo Chỉ Mục B-Tree Tổ Hợp'
      },
      instruction: {
        en: 'Create a composite index named idx_customer_orders on orders for columns customer_id and order_date.',
        vi: 'Tạo một chỉ mục tổ hợp có tên idx_customer_orders trên bảng orders cho các cột customer_id và order_date.'
      },
      starterCode: `CREATE ___ idx_customer_orders ON orders(customer_id, order_date);`,
      solutionCode: `CREATE INDEX idx_customer_orders ON orders(customer_id, order_date);`,
      hint: {
        en: 'Use CREATE INDEX.',
        vi: 'Dùng CREATE INDEX.'
      },
      explanation: {
        en: 'CREATE INDEX establishes the auxiliary B-Tree index structure on the target table.',
        vi: 'CREATE INDEX tạo cấu trúc cây chỉ mục B-Tree phụ trợ trên bảng chỉ định.'
      }
    },
    {
      id: 'sql_ex_idx_2',
      type: 'complete_code',
      title: {
        en: 'Create Unique Index',
        vi: 'Tạo Chỉ Mục Duy Nhất'
      },
      instruction: {
        en: 'Create a unique index named idx_unique_sku on products(sku).',
        vi: 'Tạo một chỉ mục duy nhất có tên idx_unique_sku trên products(sku).'
      },
      starterCode: `CREATE ___ INDEX idx_unique_sku ON products(sku);`,
      solutionCode: `CREATE UNIQUE INDEX idx_unique_sku ON products(sku);`,
      hint: {
        en: 'Use CREATE UNIQUE INDEX.',
        vi: 'Dùng CREATE UNIQUE INDEX.'
      },
      explanation: {
        en: 'UNIQUE indexes enforce uniqueness while accelerating lookup performance.',
        vi: 'Chỉ mục UNIQUE vừa đảm bảo tính không trùng lặp vừa tăng tốc độ tra cứu.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_indexing_strategies',
    title: {
      en: 'High-Throughput E-Commerce Multi-Tier Indexing Architecture',
      vi: 'Kiến Trúc Chỉ Mục Đa Tầng Cho Hệ Thống Thương Mại Điện Tử Lưu Lượng Cao'
    },
    description: {
      en: 'Write a DDL script that provisions three strategic indexes for an e-commerce database: 1. A unique index idx_users_email_unique on users(email). 2. A composite index idx_orders_status_date on orders(order_status, created_at, customer_id). 3. A composite covering index idx_order_items_lookup on order_items(order_id, product_id, quantity, unit_price).',
      vi: 'Viết script DDL thiết lập 3 chỉ mục chiến lược cho CSDL thương mại điện tử: 1. Chỉ mục duy nhất idx_users_email_unique trên users(email). 2. Chỉ mục tổ hợp idx_orders_status_date trên orders(order_status, created_at, customer_id). 3. Chỉ mục tổ hợp bao phủ idx_order_items_lookup trên order_items(order_id, product_id, quantity, unit_price).'
    },
    requirements: [
      { en: '1. CREATE UNIQUE INDEX idx_users_email_unique ON users(email);', vi: '1. CREATE UNIQUE INDEX idx_users_email_unique ON users(email);' },
      { en: '2. CREATE INDEX idx_orders_status_date ON orders(order_status, created_at, customer_id);', vi: '2. CREATE INDEX idx_orders_status_date ON orders(order_status, created_at, customer_id);' },
      { en: '3. CREATE INDEX idx_order_items_lookup ON order_items(order_id, product_id, quantity, unit_price);', vi: '3. CREATE INDEX idx_order_items_lookup ON order_items(order_id, product_id, quantity, unit_price);' }
    ],
    starterCode: `-- Provision your multi-tier indexes
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);`,
    solutionCode: `CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

CREATE INDEX idx_orders_status_date ON orders(order_status, created_at, customer_id);

CREATE INDEX idx_order_items_lookup ON order_items(order_id, product_id, quantity, unit_price);`,
    hints: [
      {
        en: 'Define all 3 indexes with exact names and column groupings terminated by semicolons.',
        vi: 'Định nghĩa cả 3 chỉ mục với tên và các cột chính xác, kết thúc bằng dấu chấm phẩy.'
      }
    ],
    solutionExplanation: {
      en: 'Optimizes point lookups, status range filtering, and order line-item joins with zero heap scan overhead.',
      vi: 'Tối ưu tra cứu điểm, lọc theo trạng thái và join chi tiết đơn hàng mà không tốn chi phí quét bảng gốc.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_idx_1',
      type: 'single_choice',
      question: {
        en: 'What is the algorithmic time complexity of searching a key in a standard B-Tree database index?',
        vi: 'Độ phức tạp thời gian thuật toán của việc tìm kiếm một khóa trong chỉ mục B-Tree tiêu chuẩn là gì?'
      },
      options: [
        { en: 'O(log N) logarithmic time', vi: 'Thời gian logarit O(log N)' },
        { en: 'O(N) linear time', vi: 'Thời gian tuyến tính O(N)' },
        { en: 'O(N^2) quadratic time', vi: 'Thời gian bình phương O(N^2)' },
        { en: 'O(N!) factorial time', vi: 'Thời gian giai thừa O(N!)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'B-Trees maintain balanced branching heights, enabling logarithmic search, insertion, and deletion times.',
        vi: 'Cây B-Tree duy trì độ cao cân bằng, giúp tìm kiếm, chèn và xóa đạt tốc độ logarit O(log N).'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_idx_2',
      type: 'single_choice',
      question: {
        en: 'What is the "Leftmost Prefix Rule" in composite (multi-column) indexing on columns (A, B, C)?',
        vi: '"Quy tắc Tiền tố Bên trái" (Leftmost Prefix Rule) trong chỉ mục tổ hợp đa cột trên các cột (A, B, C) có nghĩa là gì?'
      },
      options: [
        { en: 'The index can be used for queries filtering on (A), (A, B), or (A, B, C), but CANNOT be used efficiently for queries filtering on (B) or (C) alone without column A', vi: 'Chỉ mục có thể phục vụ các truy vấn lọc theo (A), (A, B) hoặc (A, B, C), nhưng KHÔNG THỂ dùng tối ưu cho các truy vấn chỉ lọc riêng (B) hoặc (C) nếu thiếu cột A' },
        { en: 'All column names must start with the letter A', vi: 'Tất cả tên cột phải bắt đầu bằng chữ A' },
        { en: 'The table must be stored on the left side of the disk', vi: 'Bảng phải được lưu ở phía bên trái của ổ đĩa' },
        { en: 'Indexes only work on left-handed users', vi: 'Chỉ mục chỉ hoạt động với người thuận tay trái' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Composite B-Trees are sorted hierarchically starting strictly from the first column in the definition.',
        vi: 'Cây B-Tree tổ hợp được sắp xếp phân cấp bắt đầu nghiêm ngặt từ cột đầu tiên trong định nghĩa.'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_idx_3',
      type: 'single_choice',
      question: {
        en: 'What is a "Covering Index" (Index-Only Scan)?',
        vi: '"Chỉ mục bao phủ" (Covering Index / Index-Only Scan) là gì?'
      },
      options: [
        { en: 'An index that contains all columns requested by a query, allowing the database to return results directly from index leaf pages without accessing the main table heap at all', vi: 'Một chỉ mục chứa toàn bộ các cột mà câu truy vấn yêu cầu, cho phép CSDL trả về kết quả trực tiếp từ nút lá chỉ mục mà không cần đọc bảng gốc' },
        { en: 'An index that covers the entire hard drive', vi: 'Một chỉ mục bao phủ toàn bộ ổ cứng' },
        { en: 'A blanket security firewall for the database', vi: 'Một tường lửa bảo mật toàn diện cho CSDL' },
        { en: 'An index created on every table automatically', vi: 'Một chỉ mục tự động tạo trên mọi bảng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Index-only scans eliminate physical table page I/O, delivering maximum query execution speeds.',
        vi: 'Index-only scan loại bỏ hoàn toàn việc đọc trang bảng vật lý, mang lại tốc độ truy vấn tối đa.'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_idx_4',
      type: 'single_choice',
      question: {
        en: 'What is the primary drawback of adding too many indexes to a relational table?',
        vi: 'Nhược điểm chính của việc tạo quá nhiều chỉ mục trên một bảng quan hệ là gì?'
      },
      options: [
        { en: 'Write operations (INSERT, UPDATE, DELETE) become significantly slower and consume more disk/WAL I/O because every index must be updated on every mutation', vi: 'Các thao tác ghi (INSERT, UPDATE, DELETE) bị chậm đi đáng kể và tốn dung lượng đĩa/I/O vì mỗi chỉ mục đều phải được cập nhật lại theo mỗi lần sửa đổi' },
        { en: 'SELECT queries become illegal', vi: 'Các truy vấn SELECT bị cấm' },
        { en: 'Primary keys stop working', vi: 'Khóa chính ngừng hoạt động' },
        { en: 'The database server crashes immediately', vi: 'Máy chủ CSDL bị sập ngay lập tức' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Write amplification is the unavoidable tax of indexing: every insert/delete must touch all index trees.',
        vi: 'Chi phí ghi khuếch đại (write amplification) là cái giá của chỉ mục: mọi lệnh chèn/xóa đều phải cập nhật tất cả các cây chỉ mục.'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_idx_5',
      type: 'true_false',
      question: {
        en: 'Creating a PRIMARY KEY or UNIQUE constraint automatically creates a corresponding unique B-Tree index.',
        vi: 'Việc tạo một PRIMARY KEY hoặc ràng buộc UNIQUE sẽ tự động tạo ra một chỉ mục B-Tree duy nhất tương ứng.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Relational database storage engines automatically back unique constraints with B-Tree indexes.',
        vi: 'Đúng. Các bộ máy lưu trữ CSDL quan hệ luôn tự động dùng cây B-Tree để đảm bảo tính duy nhất.'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_idx_6',
      type: 'single_choice',
      question: {
        en: 'What is Cardinality in the context of database indexing?',
        vi: 'Độ phân tán (Cardinality) trong ngữ cảnh chỉ mục CSDL là gì?'
      },
      options: [
        { en: 'The number of unique/distinct values stored in a column relative to the total row count', vi: 'Số lượng giá trị phân biệt/duy nhất được lưu trong một cột so với tổng số dòng' },
        { en: 'The physical size of the database in gigabytes', vi: 'Dung lượng vật lý của CSDL tính bằng GB' },
        { en: 'The number of CPUs on the server', vi: 'Số lượng CPU trên máy chủ' },
        { en: 'The SQL language version', vi: 'Phiên bản ngôn ngữ SQL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'High cardinality (e.g. user_id, uuid) indicates high selectivity, making indexes extremely effective.',
        vi: 'Cardinality cao (như user_id, uuid) đại diện cho độ chọn lọc cao, giúp chỉ mục phát huy hiệu quả tối đa.'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_idx_7',
      type: 'predict_output',
      question: {
        en: 'You have an index on (last_name, first_name). Will the query "SELECT * FROM users WHERE first_name = \'John\';" use the index efficiently?',
        vi: 'Bạn có chỉ mục trên (last_name, first_name). Câu truy vấn "SELECT * FROM users WHERE first_name = \'John\';" có thể tận dụng chỉ mục này hiệu quả không?'
      },
      options: [
        { en: 'No, because it violates the Leftmost Prefix Rule by omitting the leading column (last_name)', vi: 'Không, vì nó vi phạm Quy tắc Tiền tố Bên trái do thiếu cột dẫn đầu (last_name)' },
        { en: 'Yes, it is 100% optimal', vi: 'Có, tối ưu 100%' },
        { en: 'Only on PostgreSQL', vi: 'Chỉ trên PostgreSQL' },
        { en: 'Yes, because first_name is mentioned in the index', vi: 'Có, vì first_name có tên trong chỉ mục' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because the index is ordered primarily by last_name, searching first_name alone requires scanning the entire index or falling back to a full table scan.',
        vi: 'Vì chỉ mục được sắp xếp trước hết theo last_name nên tìm kiếm riêng first_name sẽ phải quét toàn bộ chỉ mục hoặc quay về quét cả bảng.'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_idx_8',
      type: 'true_false',
      question: {
        en: 'Indexes store pointers (such as ROWID or clustered primary keys) in their leaf nodes to locate physical table records.',
        vi: 'Nút lá của chỉ mục lưu trữ các con trỏ (như ROWID hoặc khóa chính clustered) để định vị bản ghi vật lý trong bảng gốc.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Non-covering index lookups traverse the B-Tree leaf to obtain the pointer, then read the table heap page.',
        vi: 'Đúng. Tra cứu không bao phủ sẽ duyệt lá B-Tree để lấy con trỏ rồi mới nhảy vào đọc trang heap của bảng gốc.'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_idx_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following query clauses can benefit directly from B-Tree indexes? (Select all that apply)',
        vi: 'Những mệnh đề truy vấn nào sau đây có thể hưởng lợi trực tiếp từ chỉ mục B-Tree? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'WHERE equality and range filters (=, >, <, BETWEEN)', vi: 'Bộ lọc bằng và khoảng trong WHERE (=, >, <, BETWEEN)' },
        { en: 'JOIN ON matching foreign keys', vi: 'Mệnh đề JOIN ON khớp khóa ngoại' },
        { en: 'ORDER BY sorting operations (avoiding memory sort)', vi: 'Mệnh đề ORDER BY sắp xếp (tránh phải sort trong RAM)' },
        { en: 'GROUP BY aggregation clustering', vi: 'Mệnh đề GROUP BY gom nhóm' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'B-Tree indexes accelerate point filters, range lookups, join matching, sorting, and grouping.',
        vi: 'Chỉ mục B-Tree tăng tốc lọc điểm, lọc khoảng, nối bảng, sắp xếp và gom nhóm.'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_idx_10',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the INCLUDE clause in PostgreSQL and SQL Server index definitions (e.g. CREATE INDEX idx ON tbl(a) INCLUDE (b))?',
        vi: 'Mục đích của mệnh đề INCLUDE trong định nghĩa chỉ mục của PostgreSQL và SQL Server (như CREATE INDEX idx ON tbl(a) INCLUDE (b)) là gì?'
      },
      options: [
        { en: 'It stores column b in the leaf nodes for covering queries (Index-Only Scans) without adding column b to the B-Tree navigation branch hierarchy', vi: 'Nó lưu cột b trong các nút lá để tạo chỉ mục bao phủ (Index-Only Scan) mà không đưa cột b vào cây phân cấp điều hướng B-Tree' },
        { en: 'It hides column b from unauthorized users', vi: 'Nó giấu cột b khỏi người dùng không có quyền' },
        { en: 'It converts column b to uppercase', vi: 'Nó chuyển cột b thành chữ hoa' },
        { en: 'It deletes column b when the query finishes', vi: 'Nó xóa cột b khi truy vấn xong' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'INCLUDE adds non-key payload attributes exclusively to the leaf level to create covering indexes without bloating the B-Tree branch index footprint.',
        vi: 'INCLUDE thêm các cột dữ liệu trực tiếp vào tầng lá để tạo chỉ mục bao phủ mà không làm phình cấu trúc nhánh của cây B-Tree.'
      },
      topicId: 'sql_indexing_strategies',
      difficulty: 'hard'
    }
  ]
};

export default lesson25;
