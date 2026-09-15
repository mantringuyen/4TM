import { Lesson } from '../../../../types';

export const lesson26: Lesson = {
  id: 'sql_lesson_26',
  moduleId: 'sql_mod_5',
  levelId: 'advanced',
  courseId: 'sql',
  order: 26,
  topicId: 'sql_query_optimization',
  title: {
    en: 'Query Plans & Optimization: EXPLAIN, EXPLAIN ANALYZE & SARGability',
    vi: 'Kế Hoạch Thực Thi & Tối Ưu Truy Vấn: EXPLAIN, EXPLAIN ANALYZE & SARGability'
  },
  summary: {
    en: 'Master database performance tuning and query plan diagnostics: reading EXPLAIN and EXPLAIN ANALYZE tree nodes, identifying Seq Scans vs Index-Only Scans, choosing Join algorithms (Nested Loop, Hash Join, Merge Join), and writing SARGable search predicates.',
    vi: 'Làm chủ tinh chỉnh hiệu năng CSDL và chẩn đoán kế hoạch thực thi: đọc các nút cây EXPLAIN và EXPLAIN ANALYZE, phân biệt Seq Scan với Index-Only Scan, hiểu thuật toán Join (Nested Loop, Hash Join, Merge Join) và viết mệnh đề lọc SARGable chuẩn xác.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'When a database query runs slowly, guesswork is ineffective. The database cost-based optimizer generates a detailed execution plan describing exactly how it parses, searches, filters, and joins tables. Mastering EXPLAIN tools and writing SARGable (Search Argument Able) predicates transforms sluggish multi-second queries into sub-millisecond lookups.',
      vi: 'Khi một câu truy vấn CSDL chạy chậm, việc đoán mò là không hiệu quả. Trình tối ưu hóa CSDL dựa trên chi phí luôn tạo ra một kế hoạch thực thi chi tiết mô tả chính xác cách nó phân tích, tìm kiếm, lọc và nối các bảng. Việc làm chủ công cụ EXPLAIN và viết các mệnh đề lọc SARGable sẽ biến các truy vấn ì ạch hàng giây thành các tra cứu dưới mili-giây.'
    },
    conceptExplanation: {
      en: 'Query Plan Anatomy & SARGability Principles:\n1. Execution Plan Diagnostics:\n   - EXPLAIN query: Shows the optimizer\'s theoretical cost model, join strategy, and estimated row counts.\n   - EXPLAIN ANALYZE query: Actually executes the query and reports real runtime elapsed time (ms), buffer cache hits, and actual row counts.\n2. Key Scan Types:\n   - Sequential / Full Table Scan: Reads every block in the table heap (slow on large tables).\n   - Index Scan: B-Tree traversal to fetch ROWIDs, followed by table heap lookups.\n   - Index-Only Scan: Zero heap reads, 100% satisfied from index leaf pages (fastest).\n3. Core Relational Join Algorithms:\n   - Nested Loop Join: Ideal for small outer tables joining against indexed inner tables.\n   - Hash Join: Builds an in-memory hash table for massive unindexed datasets.\n   - Merge Join: Highly efficient when both inputs are pre-sorted by join keys.\n4. SARGability (Search Argument Able):\n   - Non-SARGable (Breaks Index): "WHERE YEAR(created_at) = 2026" or "WHERE LOWER(email) = \'test@example.com\'". Wrapping indexed columns in functions forces a full table scan.\n   - SARGable Rewrite: "WHERE created_at >= \'2026-01-01\' AND created_at < \'2027-01-01\'". Isolates the raw column for direct B-Tree range seek.',
      vi: 'Giải phẫu kế hoạch thực thi & Nguyên lý SARGability:\n1. Chẩn đoán kế hoạch thực thi:\n   - EXPLAIN query: Hiển thị mô hình chi phí lý thuyết, chiến lược join và số dòng ước tính của trình tối ưu.\n   - EXPLAIN ANALYZE query: Thực thi thật câu truy vấn và đo lường thời gian chạy thực tế (ms), tỉ lệ trúng cache và số dòng trả về thực tế.\n2. Các kiểu quét dữ liệu chính:\n   - Sequential / Full Table Scan: Quét từng khối dữ liệu trong bảng gốc (rất chậm trên bảng lớn).\n   - Index Scan: Duyệt cây B-Tree lấy con trỏ rồi nhảy vào đọc bảng gốc.\n   - Index-Only Scan: Không đọc bảng gốc, lấy 100% dữ liệu từ nút lá chỉ mục (nhanh nhất).\n3. 3 Thuật toán Join cốt lõi:\n   - Nested Loop Join: Lý tưởng khi bảng ngoài nhỏ và bảng trong có đánh chỉ mục.\n   - Hash Join: Xây dựng bảng băm trong RAM cho tập dữ liệu lớn chưa đánh chỉ mục.\n   - Merge Join: Cực kỳ nhanh khi cả hai bảng đều đã được sắp xếp sẵn theo khóa join.\n4. Tính SARGable (Search Argument Able):\n   - Không SARGable (Làm mất tác dụng chỉ mục): "WHERE YEAR(created_at) = 2026" hoặc "WHERE LOWER(email) = \'test@example.com\'". Bọc hàm quanh cột có chỉ mục sẽ ép CSDL phải quét toàn bộ bảng.\n   - Viết lại chuẩn SARGable: "WHERE created_at >= \'2026-01-01\' AND created_at < \'2027-01-01\'". Giữ nguyên cột trần để cây B-Tree thực hiện tìm kiếm trực tiếp.'
    },
    syntax: `-- Inspecting Query Execution Plans
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE department_id = 5;

-- PostgreSQL / MySQL 8 EXPLAIN ANALYZE
-- EXPLAIN ANALYZE
-- SELECT c.name, COUNT(o.id)
-- FROM customers c
-- JOIN orders o ON c.id = o.customer_id
-- WHERE c.created_at >= '2026-01-01'
-- GROUP BY c.name;`,
    examples: [
      {
        title: {
          en: '1. Converting Non-SARGable Date Predicate to Fast SARGable Range',
          vi: '1. Chuyển Đổi Điều Kiện Ngày Không SARGable Thành Khoảng SARGable Tốc Độ Cao'
        },
        code: `-- SLOW (Non-SARGable): Full table scan on all 10M rows
-- SELECT * FROM logs WHERE strftime('%Y', log_timestamp) = '2026';

-- FAST (SARGable): B-Tree Index Range Seek
SELECT id, user_id, event_type, log_timestamp
FROM logs
WHERE log_timestamp >= '2026-01-01 00:00:00'
  AND log_timestamp < '2027-01-01 00:00:00';`,
        language: 'sql',
        explanation: {
          en: 'By leaving log_timestamp unadorned by functions, the database engine executes a direct B-tree root-to-leaf range seek.',
          vi: 'Bằng cách không bọc hàm quanh log_timestamp, CSDL thực hiện tìm kiếm khoảng trực tiếp từ gốc đến lá cây B-Tree.'
        }
      },
      {
        title: {
          en: '2. High-Scale Cursor / Keyset Pagination (Eliminating Slow OFFSET)',
          vi: '2. Phân Trang Theo Con Trỏ (Keyset Pagination - Loại Bỏ OFFSET Chậm Chạp)'
        },
        code: `-- SLOW on Page 10,000: Scans and discards 200,000 rows
-- SELECT * FROM transactions ORDER BY id ASC LIMIT 20 OFFSET 200000;

-- FAST Keyset Pagination: Instant O(log N) index seek
SELECT id, amount, txn_date
FROM transactions
WHERE id > 200000
ORDER BY id ASC
LIMIT 20;`,
        language: 'sql',
        explanation: {
          en: 'Keyset pagination uses the index to jump directly to the target record, eliminating massive OFFSET row scanning.',
          vi: 'Phân trang keyset dùng chỉ mục để nhảy thẳng đến bản ghi cần lấy, loại bỏ việc quét và vứt bỏ hàng trăm ngàn dòng của OFFSET.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using leading wildcards in LIKE queries (e.g. "WHERE username LIKE \'%john\'").',
          vi: 'Dùng ký tự đại diện % ở đầu trong truy vấn LIKE (ví dụ: "WHERE username LIKE \'%john\'").'
        },
        correction: {
          en: 'Leading wildcards (%text) prevent B-tree index seeks because the starting character is unknown, forcing a full table scan. Trailing wildcards (text%) are SARGable and utilize indexes efficiently.',
          vi: 'Ký tự % ở đầu (%text) làm vô hiệu hóa tìm kiếm B-tree vì không biết ký tự bắt đầu, ép CSDL quét toàn bộ bảng. Ký tự % ở cuối (text%) là SARGable và dùng chỉ mục tốt.'
        }
      },
      {
        mistake: {
          en: 'Using "SELECT *" in production applications without restricting column projection.',
          vi: 'Dùng "SELECT *" trong ứng dụng thực tế mà không giới hạn các cột cần lấy.'
        },
        correction: {
          en: 'SELECT * transfers unnecessary data across the network, wastes memory, and permanently breaks Covering Index / Index-Only Scan optimizations. Explicitly specify only the required columns.',
          vi: 'SELECT * làm tốn băng thông mạng, lãng phí RAM và phá hỏng tối ưu hóa Index-Only Scan. Hãy luôn chỉ định rõ ràng các cột cần lấy.'
        }
      }
    ],
    tips: [
      {
        en: 'Use "EXPLAIN QUERY PLAN" in SQLite or "EXPLAIN ANALYZE" in PostgreSQL/MySQL to verify index utilization.',
        vi: 'Dùng "EXPLAIN QUERY PLAN" trong SQLite hoặc "EXPLAIN ANALYZE" trong PostgreSQL/MySQL để kiểm tra xem chỉ mục có được dùng hay không.'
      },
      {
        en: 'Run "ANALYZE;" periodically so the query optimizer has up-to-date table statistics and accurate row cardinality estimates.',
        vi: 'Chạy lệnh "ANALYZE;" định kỳ để trình tối ưu hóa luôn có thống kê phân phối dữ liệu mới nhất.'
      }
    ],
    practiceStarterCode: `-- Inspect query plan
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE id = 10;`
  },
  exercisePool: [
    {
      id: 'sql_ex_opt_1',
      type: 'complete_code',
      title: {
        en: 'Rewrite Non-SARGable Query into SARGable Range',
        vi: 'Viết Lại Truy Vấn Không SARGable Thành Khoảng SARGable'
      },
      instruction: {
        en: 'Complete the SARGable date range query filtering for the entire year 2026 without wrapping order_date in a function.',
        vi: 'Hoàn thiện truy vấn khoảng ngày SARGable lọc cả năm 2026 mà không bọc order_date trong bất kỳ hàm nào.'
      },
      starterCode: `SELECT id, total_amount, order_date
FROM orders
WHERE order_date >= '2026-01-01'
  AND order_date < '___-01-01';`,
      solutionCode: `SELECT id, total_amount, order_date
FROM orders
WHERE order_date >= '2026-01-01'
  AND order_date < '2027-01-01';`,
      hint: {
        en: 'Use 2027.',
        vi: 'Điền 2027.'
      },
      explanation: {
        en: 'SARGable range comparisons isolate the indexed column so the B-Tree index can be traversed directly.',
        vi: 'So sánh khoảng SARGable giữ nguyên cột chỉ mục giúp cây B-Tree tìm kiếm trực tiếp.'
      }
    },
    {
      id: 'sql_ex_opt_2',
      type: 'complete_code',
      title: {
        en: 'Inspect Query Plan with EXPLAIN',
        vi: 'Kiểm Tra Kế Hoạch Truy Vấn Bằng EXPLAIN'
      },
      instruction: {
        en: 'Add EXPLAIN QUERY PLAN before the SELECT statement.',
        vi: 'Thêm EXPLAIN QUERY PLAN vào trước câu lệnh SELECT.'
      },
      starterCode: `___ QUERY PLAN
SELECT name, salary FROM employees WHERE department_id = 2;`,
      solutionCode: `EXPLAIN QUERY PLAN
SELECT name, salary FROM employees WHERE department_id = 2;`,
      hint: {
        en: 'Type EXPLAIN.',
        vi: 'Điền EXPLAIN.'
      },
      explanation: {
        en: 'EXPLAIN QUERY PLAN displays the execution strategy selected by the database optimizer.',
        vi: 'EXPLAIN QUERY PLAN hiển thị chiến lược thực thi được chọn bởi trình tối ưu CSDL.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_query_optimization',
    title: {
      en: 'High-Performance SARGable Customer Order Analysis Pipeline',
      vi: 'Đường Ống Phân Tích Đơn Hàng Khách Hàng SARGable Hiệu Năng Cao'
    },
    description: {
      en: 'Write an optimized SARGable analytical query on customers c JOIN orders o ON c.id = o.customer_id. Select c.id AS customer_id, c.name AS customer_name, COUNT(o.id) AS order_count, SUM(o.total_amount) AS total_spent. Filter SARGably for orders where o.order_date >= \'2026-01-01 00:00:00\' AND o.order_date < \'2026-07-01 00:00:00\' AND c.is_active = 1. Group by c.id, c.name HAVING COUNT(o.id) >= 2 ORDER BY total_spent DESC, customer_id ASC.',
      vi: 'Viết một câu truy vấn phân tích SARGable tối ưu join giữa customers c và orders o ON c.id = o.customer_id. Lấy c.id AS customer_id, c.name AS customer_name, COUNT(o.id) AS order_count, SUM(o.total_amount) AS total_spent. Lọc chuẩn SARGable các đơn hàng có o.order_date >= \'2026-01-01 00:00:00\' AND o.order_date < \'2026-07-01 00:00:00\' và c.is_active = 1. Gom nhóm theo c.id, c.name với điều kiện HAVING COUNT(o.id) >= 2 và sắp xếp theo total_spent DESC, customer_id ASC.'
    },
    requirements: [
      { en: '1. SARGable date filtering (o.order_date >= \'2026-01-01 00:00:00\' AND o.order_date < \'2026-07-01 00:00:00\')', vi: '1. Lọc ngày chuẩn SARGable (o.order_date >= \'2026-01-01 00:00:00\' AND o.order_date < \'2026-07-01 00:00:00\')' },
      { en: '2. c.is_active = 1 and GROUP BY c.id, c.name', vi: '2. c.is_active = 1 và GROUP BY c.id, c.name' },
      { en: '3. HAVING COUNT(o.id) >= 2', vi: '3. HAVING COUNT(o.id) >= 2' },
      { en: '4. ORDER BY total_spent DESC, customer_id ASC', vi: '4. ORDER BY total_spent DESC, customer_id ASC' }
    ],
    starterCode: `-- Write your high-performance SARGable query
SELECT c.id AS customer_id, c.name AS customer_name
FROM customers c
JOIN orders o ON c.id = o.customer_id;`,
    solutionCode: `SELECT c.id AS customer_id,
       c.name AS customer_name,
       COUNT(o.id) AS order_count,
       SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.order_date >= '2026-01-01 00:00:00'
  AND o.order_date < '2026-07-01 00:00:00'
  AND c.is_active = 1
GROUP BY c.id, c.name
HAVING COUNT(o.id) >= 2
ORDER BY total_spent DESC, customer_id ASC;`,
    hints: [
      {
        en: 'Apply direct comparison operators to order_date in WHERE so the optimizer uses the index.',
        vi: 'Áp dụng toán tử so sánh trực tiếp trên order_date trong WHERE để trình tối ưu hóa sử dụng chỉ mục.'
      }
    ],
    solutionExplanation: {
      en: 'Employs strictly SARGable predicates, precise column projections, and efficient grouping for optimal query plan execution.',
      vi: 'Áp dụng các mệnh đề lọc chuẩn SARGable, giới hạn cột chính xác và gom nhóm hiệu quả để kế hoạch thực thi đạt tốc độ tối đa.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_opt_1',
      type: 'single_choice',
      question: {
        en: 'What does SARGable stand for in database optimization?',
        vi: 'Thuật ngữ SARGable trong tối ưu hóa CSDL là viết tắt của cụm từ gì?'
      },
      options: [
        { en: 'Search Argument Able (predicates that allow the database engine to use index seeks rather than full table scans)', vi: 'Search Argument Able (các mệnh đề cho phép CSDL sử dụng tìm kiếm chỉ mục thay vì quét toàn bộ bảng)' },
        { en: 'Server Automatic Recovery Gateway', vi: 'Server Automatic Recovery Gateway' },
        { en: 'Sequential Array Grouping Algorithm', vi: 'Sequential Array Grouping Algorithm' },
        { en: 'Standard Access Relational Guide', vi: 'Standard Access Relational Guide' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SARGable predicates enable direct B-Tree index traversal because the indexed column is isolated.',
        vi: 'Các mệnh đề SARGable cho phép duyệt cây B-Tree trực tiếp vì cột có chỉ mục không bị biến đổi bởi hàm.'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_opt_2',
      type: 'single_choice',
      question: {
        en: 'Which of the following WHERE conditions is NON-SARGable (breaks index utilization)?',
        vi: 'Điều kiện WHERE nào sau đây là KHÔNG SARGable (làm mất tác dụng của chỉ mục)?'
      },
      options: [
        { en: 'WHERE UPPER(email) = \'ALICE@EXAMPLE.COM\'', vi: 'WHERE UPPER(email) = \'ALICE@EXAMPLE.COM\'' },
        { en: 'WHERE email = \'alice@example.com\'', vi: 'WHERE email = \'alice@example.com\'' },
        { en: 'WHERE salary >= 50000', vi: 'WHERE salary >= 50000' },
        { en: 'WHERE status IN (\'Active\', \'Pending\')', vi: 'WHERE status IN (\'Active\', \'Pending\')' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Wrapping the indexed column "email" in UPPER() requires the engine to evaluate UPPER() for every row in the table (Full Table Scan).',
        vi: 'Bọc cột "email" trong hàm UPPER() bắt buộc CSDL phải chạy hàm UPPER() trên từng dòng của bảng (Full Table Scan).'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_opt_3',
      type: 'single_choice',
      question: {
        en: 'What is the key difference between EXPLAIN and EXPLAIN ANALYZE?',
        vi: 'Sự khác biệt cốt lõi giữa lệnh EXPLAIN và EXPLAIN ANALYZE là gì?'
      },
      options: [
        { en: 'EXPLAIN shows estimated optimizer costs without running the query, whereas EXPLAIN ANALYZE actually executes the query to report real runtime elapsed time and actual row counts', vi: 'EXPLAIN hiển thị chi phí ước tính mà không chạy truy vấn, còn EXPLAIN ANALYZE thực thi thật câu truy vấn để đo thời gian chạy thực tế và số dòng thực tế' },
        { en: 'EXPLAIN deletes slow queries', vi: 'EXPLAIN xóa các truy vấn chậm' },
        { en: 'EXPLAIN ANALYZE only works on Mondays', vi: 'EXPLAIN ANALYZE chỉ chạy vào thứ Hai' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'EXPLAIN ANALYZE executes the query in real-time, providing ground-truth profiling statistics.',
        vi: 'EXPLAIN ANALYZE thực thi câu truy vấn thật, cung cấp các thông số hiệu năng đo lường chính xác.'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_opt_4',
      type: 'single_choice',
      question: {
        en: 'Why is Keyset (Cursor) pagination superior to "LIMIT 20 OFFSET 1000000" for large tables?',
        vi: 'Tại sao phân trang theo con trỏ (Keyset Pagination) lại vượt trội hơn "LIMIT 20 OFFSET 1000000" trên bảng dữ liệu lớn?'
      },
      options: [
        { en: 'OFFSET forces the database to scan and discard 1,000,000 rows before returning 20, whereas Keyset uses "WHERE id > last_id" to seek directly to the 20 rows in O(log N) time', vi: 'OFFSET ép CSDL phải quét và vứt bỏ 1.000.000 dòng trước khi lấy 20 dòng, trong khi Keyset dùng "WHERE id > last_id" để nhảy thẳng đến 20 dòng trong O(log N)' },
        { en: 'OFFSET is not supported in modern SQL', vi: 'OFFSET không còn được hỗ trợ trong SQL hiện đại' },
        { en: 'Keyset pagination requires no index', vi: 'Phân trang Keyset không cần chỉ mục' },
        { en: 'OFFSET changes row values to NULL', vi: 'OFFSET biến các giá trị thành NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'High OFFSET values cause severe I/O exhaustion because the database must process and discard all skipped rows.',
        vi: 'OFFSET lớn gây nghẽn I/O nghiêm trọng do CSDL phải nạp và vứt bỏ toàn bộ các dòng bị bỏ qua.'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_opt_5',
      type: 'single_choice',
      question: {
        en: 'Which join algorithm is typically chosen by the optimizer when joining a small filtered outer table with a large table that has an index on the join key?',
        vi: 'Thuật toán join nào thường được trình tối ưu hóa lựa chọn khi nối một bảng ngoài nhỏ với một bảng lớn đã có chỉ mục trên khóa join?'
      },
      options: [
        { en: 'Nested Loop Join with Index Seek', vi: 'Nested Loop Join kết hợp Index Seek' },
        { en: 'Cartesian Cross Join', vi: 'Cartesian Cross Join' },
        { en: 'Full Disk Spill Sort', vi: 'Full Disk Spill Sort' },
        { en: 'Random Tree Shuffle', vi: 'Random Tree Shuffle' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Nested Loop with an inner index seek iterates through the few outer rows and performs instant O(log N) index seeks on the inner table.',
        vi: 'Nested Loop lặp qua vài dòng của bảng ngoài và thực hiện tra cứu chỉ mục O(log N) cực nhanh trên bảng trong.'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_opt_6',
      type: 'true_false',
      question: {
        en: 'The query "WHERE name LIKE \'Smith%\'" can use a B-tree index, while "WHERE name LIKE \'%Smith\'" cannot.',
        vi: 'Câu truy vấn "WHERE name LIKE \'Smith%\'" có thể tận dụng chỉ mục B-tree, còn "WHERE name LIKE \'%Smith\'" thì không.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. B-trees are sorted left-to-right; a leading wildcard prevents the engine from determining a starting search key.',
        vi: 'Đúng. Cây B-tree sắp xếp từ trái sang phải; ký tự đại diện ở đầu khiến CSDL không biết điểm bắt đầu để tìm kiếm.'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_opt_7',
      type: 'single_choice',
      question: {
        en: 'How should you rewrite the non-SARGable predicate "WHERE price * 1.10 > 100" to make it SARGable?',
        vi: 'Bạn nên viết lại điều kiện không SARGable "WHERE price * 1.10 > 100" như thế nào để nó trở thành SARGable?'
      },
      options: [
        { en: 'WHERE price > 100 / 1.10', vi: 'WHERE price > 100 / 1.10' },
        { en: 'WHERE price = 100', vi: 'WHERE price = 100' },
        { en: 'WHERE price * 1.10 = 100', vi: 'WHERE price * 1.10 = 100' },
        { en: 'WHERE SQRT(price) > 10', vi: 'WHERE SQRT(price) > 10' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Isolating the column alone on one side of the comparison allows the index on "price" to be searched directly.',
        vi: 'Chuyển phép tính toán học sang vế hằng số giúp cô lập cột "price", cho phép tìm kiếm trực tiếp trên chỉ mục.'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_opt_8',
      type: 'single_choice',
      question: {
        en: 'What does the ANALYZE command do in PostgreSQL, SQLite, and Oracle?',
        vi: 'Lệnh ANALYZE làm nhiệm vụ gì trong PostgreSQL, SQLite và Oracle?'
      },
      options: [
        { en: 'It scans tables and collects statistical distribution data (histograms, row counts, null fractions) for the query optimizer', vi: 'Nó quét bảng và thu thập số liệu thống kê phân phối dữ liệu (biểu đồ tần suất, số dòng, tỉ lệ null) cho trình tối ưu hóa truy vấn' },
        { en: 'It checks syntax for grammar errors', vi: 'Nó kiểm tra lỗi ngữ pháp' },
        { en: 'It renames the database', vi: 'Nó đổi tên CSDL' },
        { en: 'It deletes corrupted rows', vi: 'Nó xóa các dòng bị lỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Up-to-date catalog statistics allow the cost-based optimizer to make accurate join and index selection decisions.',
        vi: 'Số liệu thống kê cập nhật giúp trình tối ưu hóa chọn đúng kế hoạch join và chỉ mục hiệu quả nhất.'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_opt_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following practices enhance SQL query execution performance? (Select all that apply)',
        vi: 'Những thực hành nào sau đây giúp tăng cường hiệu năng thực thi truy vấn SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Selecting only explicitly needed columns instead of SELECT *', vi: 'Chỉ chọn các cột thực sự cần thiết thay vì SELECT *' },
        { en: 'Ensuring filter predicates in WHERE are SARGable', vi: 'Đảm bảo các điều kiện lọc trong WHERE là SARGable' },
        { en: 'Using keyset pagination instead of massive OFFSETs on large tables', vi: 'Dùng phân trang keyset thay vì OFFSET lớn trên bảng dữ liệu lớn' },
        { en: 'Adding indexes to foreign key columns used in frequent JOINs', vi: 'Đánh chỉ mục cho các cột khóa ngoại thường xuyên dùng trong JOIN' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'All four represent core database performance engineering best practices.',
        vi: 'Cả 4 điều trên đều là những thực hành cốt lõi trong kỹ nghệ tối ưu hóa hiệu năng CSDL.'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_opt_10',
      type: 'single_choice',
      question: {
        en: 'When does a database optimizer choose a Hash Join instead of a Nested Loop?',
        vi: 'Khi nào thì trình tối ưu hóa CSDL sẽ chọn Hash Join thay vì Nested Loop Join?'
      },
      options: [
        { en: 'When joining large, unindexed datasets on equality conditions (=), building an in-memory hash table on the smaller table', vi: 'Khi nối các tập dữ liệu lớn chưa có chỉ mục theo điều kiện bằng (=), bằng cách xây dựng bảng băm trong RAM cho bảng nhỏ hơn' },
        { en: 'Only when joining 1 row', vi: 'Chỉ khi nối 1 dòng duy nhất' },
        { en: 'When the hard drive is completely full', vi: 'Khi ổ cứng bị đầy hoàn toàn' },
        { en: 'When tables have no columns', vi: 'Khi bảng không có cột nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Hash joins excel at processing large equi-joins by hashing the smaller input and streaming the larger table.',
        vi: 'Hash join phát huy hiệu quả tối đa với các phép nối bằng trên tập dữ liệu lớn bằng cách băm bảng nhỏ và quét bảng lớn.'
      },
      topicId: 'sql_query_optimization',
      difficulty: 'hard'
    }
  ]
};

export default lesson26;
