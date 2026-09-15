import { Lesson } from '../../../../types';

export const lesson22: Lesson = {
  id: 'sql_lesson_22',
  moduleId: 'sql_mod_4',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 22,
  topicId: 'sql_isolation_levels',
  title: {
    en: 'Transaction Isolation Levels & Concurrency Anomalies',
    vi: 'Cấp Độ Cô Lập Giao Dịch & Bất Thường Tương Tranh'
  },
  summary: {
    en: 'Master database concurrency control: understanding Dirty Reads, Non-Repeatable Reads, and Phantom Reads across the 4 ANSI SQL isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) and MVCC.',
    vi: 'Làm chủ kiểm soát tương tranh CSDL: hiểu rõ Đọc rác (Dirty Read), Đọc không lặp lại (Non-Repeatable Read) và Đọc bóng ma (Phantom Read) qua 4 cấp độ cô lập ANSI SQL cùng cơ chế MVCC.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'In multi-user database systems, thousands of transactions execute simultaneously. The Isolation level dictates how changes made by one transaction are visible to others. Balancing concurrency throughput against data correctness requires understanding the 4 ANSI SQL isolation levels and the specific anomalies they eliminate.',
      vi: 'Trong các hệ thống CSDL đa người dùng, hàng ngàn giao dịch thực thi cùng lúc. Cấp độ cô lập (Isolation level) quyết định mức độ nhìn thấy các thay đổi giữa các giao dịch đồng thời. Việc cân bằng giữa hiệu năng xử lý và tính toàn vẹn dữ liệu đòi hỏi phải hiểu rõ 4 cấp độ cô lập chuẩn ANSI SQL và các hiện tượng bất thường tương ứng.'
    },
    conceptExplanation: {
      en: 'The 3 Classic Concurrency Anomalies & 4 Isolation Levels:\n1. Concurrency Anomalies:\n   - Dirty Read: Transaction A reads uncommitted data written by Transaction B (which might later be rolled back).\n   - Non-Repeatable Read: Transaction A re-reads a row and finds that its values changed because Transaction B committed an UPDATE.\n   - Phantom Read: Transaction A re-executes a range query and finds new rows added because Transaction B committed an INSERT.\n2. The 4 ANSI Isolation Levels:\n   - READ UNCOMMITTED: Lowest isolation. Allows Dirty Reads, Non-Repeatable Reads, and Phantoms.\n   - READ COMMITTED (Default in Postgres, Oracle, SQL Server): Prevents Dirty Reads. Transactions only read committed data.\n   - REPEATABLE READ (Default in MySQL InnoDB): Prevents Dirty Reads & Non-Repeatable Reads via snapshot reads (MVCC).\n   - SERIALIZABLE: Highest isolation. Prevents all anomalies (including write skew and phantoms) via strict serial ordering or Serializable Snapshot Isolation (SSI).',
      vi: '3 Bất thường tương tranh kinh điển & 4 Cấp độ cô lập:\n1. Các hiện tượng bất thường tương tranh:\n   - Dirty Read (Đọc rác): Giao dịch A đọc dữ liệu chưa commit của giao dịch B (mà sau đó B có thể bị rollback).\n   - Non-Repeatable Read (Đọc không lặp lại): Giao dịch A đọc lại một dòng và thấy dữ liệu bị thay đổi do giao dịch B đã commit lệnh UPDATE.\n   - Phantom Read (Đọc bóng ma): Giao dịch A chạy lại truy vấn theo khoảng và thấy xuất hiện thêm dòng mới do giao dịch B đã commit lệnh INSERT.\n2. 4 Cấp độ cô lập ANSI:\n   - READ UNCOMMITTED: Cấp thấp nhất. Chấp nhận Dirty Reads, Non-Repeatable Reads và Phantoms.\n   - READ COMMITTED (Mặc định trong Postgres, Oracle, SQL Server): Ngăn chặn Dirty Reads. Chỉ đọc dữ liệu đã commit.\n   - REPEATABLE READ (Mặc định trong MySQL InnoDB): Ngăn chặn Dirty Reads & Non-Repeatable Reads nhờ cơ chế đọc ảnh chụp (MVCC).\n   - SERIALIZABLE: Cấp cao nhất. Ngăn chặn toàn bộ bất thường (kể cả write skew và phantoms) bằng cách tuần tự hóa giao dịch hoặc SSI.'
    },
    syntax: `-- Setting transaction isolation level in SQL
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

BEGIN TRANSACTION;
SELECT * FROM accounts WHERE id = 10;
-- Subsequent reads within this transaction observe the same snapshot
COMMIT;`,
    examples: [
      {
        title: {
          en: '1. Configuring Strict Serializable Financial Audits',
          vi: '1. Cấu Hình Kiểm Toán Tài Chính Nghiêm Ngặt Ở Cấp Serializable'
        },
        code: `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;

SELECT SUM(balance) AS total_reserve FROM bank_reserves;
-- Consistent point-in-time calculation immune to phantoms or concurrent inserts
COMMIT;`,
        language: 'sql',
        explanation: {
          en: 'Guarantees the audit query calculates reserves against a strictly frozen point-in-time state without phantom insertions.',
          vi: 'Đảm bảo truy vấn kiểm toán tính toán quỹ dự trữ trên một trạng thái đóng băng thời gian mà không bị dòng ma chèn vào.'
        }
      },
      {
        title: {
          en: '2. Multi-Version Concurrency Control (MVCC) Non-Blocking Reads',
          vi: '2. Đọc Không Khóa Bằng Kiểm Soát Tương Tranh Đa Phiên Bản (MVCC)'
        },
        code: `-- In PostgreSQL/MySQL (InnoDB), readers do not block writers, and writers do not block readers.
-- A long-running analytical report reads from a consistent historical snapshot
-- while active transactions continue to insert and update rows concurrently.`,
        language: 'sql',
        explanation: {
          en: 'MVCC maintains historical versions of tuple rows so readers inspect snapshots without acquiring exclusive locks on writers.',
          vi: 'MVCC duy trì các phiên bản lịch sử của bản ghi giúp người đọc xem ảnh chụp dữ liệu mà không cần khóa luồng người ghi.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Assuming READ COMMITTED guarantees consistent results across multiple SELECTs in the same transaction.',
          vi: 'Nghĩ rằng READ COMMITTED đảm bảo kết quả giống hệt nhau qua nhiều lần SELECT trong cùng một giao dịch.'
        },
        correction: {
          en: 'In READ COMMITTED, each individual SELECT takes a new snapshot. If another transaction commits an update between your two SELECTs, the values will change (Non-Repeatable Read). Use REPEATABLE READ or SERIALIZABLE if multi-query snapshot consistency is required.',
          vi: 'Trong READ COMMITTED, mỗi câu SELECT chụp một ảnh mới. Nếu giao dịch khác commit sửa đổi giữa 2 lần SELECT của bạn, dữ liệu sẽ bị thay đổi (Non-Repeatable Read). Hãy dùng REPEATABLE READ hoặc SERIALIZABLE khi cần nhất quán ảnh chụp.'
        }
      },
      {
        mistake: {
          en: 'Using SERIALIZABLE everywhere without handling retry logic for serialization failures.',
          vi: 'Dùng SERIALIZABLE ở mọi nơi nhưng không viết mã thử lại (retry) khi gặp lỗi xung đột tuần tự hóa.'
        },
        correction: {
          en: 'Under SERIALIZABLE isolation, the engine will abort conflicting transactions with serialization error codes (e.g. SQLSTATE 40001). Applications MUST implement exponential backoff retry loops.',
          vi: 'Ở cấp độ SERIALIZABLE, CSDL sẽ tự ngắt các giao dịch xung đột với mã lỗi tuần tự hóa. Ứng dụng BẮT BUỘC phải cài đặt vòng lặp thử lại (retry loop).'
        }
      }
    ],
    tips: [
      {
        en: 'Most high-scale web applications operate on READ COMMITTED or REPEATABLE READ to maximize concurrency and throughput.',
        vi: 'Hầu hết các ứng dụng web quy mô lớn hoạt động ở cấp READ COMMITTED hoặc REPEATABLE READ để tối ưu thông lượng.'
      },
      {
        en: 'PostgreSQL uses Serializable Snapshot Isolation (SSI), which detects write skews without heavy pessimistic table locks.',
        vi: 'PostgreSQL sử dụng cơ chế SSI (Serializable Snapshot Isolation) để phát hiện write skew mà không cần khóa bảng bi quan nặng nề.'
      }
    ],
    practiceStarterCode: `-- Configure isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN TRANSACTION;
SELECT * FROM products;
COMMIT;`
  },
  exercisePool: [
    {
      id: 'sql_ex_iso_1',
      type: 'complete_code',
      title: {
        en: 'Set Serializable Isolation Level',
        vi: 'Thiết Lập Cấp Độ Cô Lập Serializable'
      },
      instruction: {
        en: 'Configure the transaction isolation level to SERIALIZABLE before beginning the transaction.',
        vi: 'Cấu hình cấp độ cô lập giao dịch thành SERIALIZABLE trước khi bắt đầu giao dịch.'
      },
      starterCode: `SET TRANSACTION ISOLATION LEVEL ___;
BEGIN TRANSACTION;
SELECT * FROM ledger;
COMMIT;`,
      solutionCode: `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
SELECT * FROM ledger;
COMMIT;`,
      hint: {
        en: 'Type SERIALIZABLE.',
        vi: 'Điền SERIALIZABLE.'
      },
      explanation: {
        en: 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE configures the highest isolation standard.',
        vi: 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE thiết lập chuẩn cô lập cao nhất.'
      }
    },
    {
      id: 'sql_ex_iso_2',
      type: 'complete_code',
      title: {
        en: 'Configure Repeatable Read Isolation',
        vi: 'Cấu Hình Cô Lập Repeatable Read'
      },
      instruction: {
        en: 'Set transaction isolation level to REPEATABLE READ.',
        vi: 'Thiết lập cấp độ cô lập giao dịch thành REPEATABLE READ.'
      },
      starterCode: `SET TRANSACTION ISOLATION LEVEL ___ READ;
BEGIN TRANSACTION;
SELECT * FROM inventory;
COMMIT;`,
      solutionCode: `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;
SELECT * FROM inventory;
COMMIT;`,
      hint: {
        en: 'Use REPEATABLE.',
        vi: 'Dùng từ REPEATABLE.'
      },
      explanation: {
        en: 'REPEATABLE READ guarantees that any row read during the transaction maintains its initial snapshot values.',
        vi: 'REPEATABLE READ đảm bảo bất kỳ dòng nào được đọc trong giao dịch đều giữ nguyên giá trị của ảnh chụp ban đầu.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_isolation_levels',
    title: {
      en: 'Mission-Critical Ledger Audit & Snapshot Verification Script',
      vi: 'Kiểm Toán Sổ Cái Trọng Yếu & Xác Minh Ảnh Chụp Dữ Liệu'
    },
    description: {
      en: 'Write a robust SQL script that configures the transaction isolation level to SERIALIZABLE, starts a transaction, performs a consistency audit computing total_assets as SUM(balance), min_balance as MIN(balance), and account_count as COUNT(*) from accounts WHERE status = \'Active\', and commits the transaction.',
      vi: 'Viết script SQL hoàn chỉnh cấu hình cấp độ cô lập thành SERIALIZABLE, bắt đầu giao dịch, thực hiện kiểm toán tính total_assets bằng SUM(balance), min_balance bằng MIN(balance), và account_count bằng COUNT(*) từ bảng accounts WHERE status = \'Active\', và chốt giao dịch bằng COMMIT.'
    },
    requirements: [
      { en: '1. SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;', vi: '1. SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;' },
      { en: '2. BEGIN TRANSACTION;', vi: '2. BEGIN TRANSACTION;' },
      { en: '3. SELECT SUM(balance) AS total_assets, MIN(balance) AS min_balance, COUNT(*) AS account_count FROM accounts WHERE status = \'Active\';', vi: '3. SELECT SUM(balance) AS total_assets, MIN(balance) AS min_balance, COUNT(*) AS account_count FROM accounts WHERE status = \'Active\';' },
      { en: '4. COMMIT;', vi: '4. COMMIT;' }
    ],
    starterCode: `-- Write your complete serializable audit workflow
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`,
    solutionCode: `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN TRANSACTION;

SELECT SUM(balance) AS total_assets,
       MIN(balance) AS min_balance,
       COUNT(*) AS account_count
FROM accounts
WHERE status = 'Active';

COMMIT;`,
    hints: [
      {
        en: 'Set isolation level first, then open transaction, run aggregate query, and commit.',
        vi: 'Đặt cấp độ cô lập trước, sau đó mở giao dịch, chạy truy vấn tổng hợp và commit.'
      }
    ],
    solutionExplanation: {
      en: 'Enforces serializable snapshot correctness for balance aggregates, preventing phantom inserts or intermediate modification interference.',
      vi: 'Đảm bảo tính chính xác tuyệt đối cho các phép tổng hợp số dư tài khoản, ngăn chặn dòng ma và can thiệp từ các giao dịch khác.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_iso_1',
      type: 'single_choice',
      question: {
        en: 'What is a "Dirty Read" anomaly in database transactions?',
        vi: 'Hiện tượng bất thường "Đọc rác" (Dirty Read) trong giao dịch CSDL là gì?'
      },
      options: [
        { en: 'A transaction reads uncommitted modifications made by another concurrent transaction (which could subsequently be rolled back)', vi: 'Một giao dịch đọc phải dữ liệu chưa được commit của một giao dịch đồng thời khác (mà sau đó có thể bị rollback)' },
        { en: 'Reading data from a corrupted hard drive', vi: 'Đọc dữ liệu từ ổ cứng bị hỏng' },
        { en: 'Reading rows with misspelled column names', vi: 'Đọc các dòng có tên cột viết sai chính tả' },
        { en: 'Reading rows that contain NULL values', vi: 'Đọc các dòng có chứa giá trị NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A dirty read occurs when a transaction reads transient dirty uncommitted buffer data.',
        vi: 'Đọc rác xảy ra khi một giao dịch đọc phải dữ liệu tạm thời chưa được commit trong bộ nhớ đệm.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_iso_2',
      type: 'single_choice',
      question: {
        en: 'What is a "Non-Repeatable Read" (Fuzzy Read) anomaly?',
        vi: 'Hiện tượng bất thường "Đọc không lặp lại" (Non-Repeatable Read) là gì?'
      },
      options: [
        { en: 'A transaction re-reads a specific row and finds that its column values have changed because another transaction committed an UPDATE in between', vi: 'Một giao dịch đọc lại cùng một dòng và thấy giá trị cột đã bị thay đổi do giao dịch khác đã commit lệnh UPDATE ở giữa chừng' },
        { en: 'A query that cannot be run more than once per day', vi: 'Một câu truy vấn không thể chạy quá 1 lần mỗi ngày' },
        { en: 'A subquery returning 0 rows', vi: 'Một truy vấn con trả về 0 dòng' },
        { en: 'A syntax error in a loop', vi: 'Một lỗi cú pháp trong vòng lặp' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Non-repeatable reads occur when committed updates from other transactions alter the row between repeated reads within the same transaction.',
        vi: 'Đọc không lặp lại xảy ra khi các lệnh update đã commit từ giao dịch khác làm thay đổi dữ liệu của dòng giữa các lần đọc trong cùng một transaction.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_iso_3',
      type: 'single_choice',
      question: {
        en: 'What is a "Phantom Read" anomaly?',
        vi: 'Hiện tượng bất thường "Đọc bóng ma" (Phantom Read) là gì?'
      },
      options: [
        { en: 'A transaction re-executes a range query (e.g. WHERE salary > 50000) and finds new "phantom" rows that were inserted and committed by another transaction', vi: 'Một giao dịch thực thi lại một truy vấn theo khoảng (ví dụ: WHERE salary > 50000) và thấy xuất hiện thêm các dòng "bóng ma" mới do giao dịch khác vừa chèn và commit' },
        { en: 'A database that has no users', vi: 'Một CSDL không có người dùng' },
        { en: 'A query that runs in 0 milliseconds', vi: 'Một truy vấn chạy trong 0 mili-giây' },
        { en: 'A corrupted view definition', vi: 'Một định nghĩa view bị hỏng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Phantom reads involve newly inserted matching rows appearing inside a search range upon re-querying.',
        vi: 'Đọc bóng ma liên quan đến việc các dòng mới chèn thỏa mãn điều kiện lọc xuất hiện thêm khi chạy lại câu truy vấn.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_iso_4',
      type: 'single_choice',
      question: {
        en: 'Which ANSI SQL isolation level is the DEFAULT in PostgreSQL, Oracle, and Microsoft SQL Server?',
        vi: 'Cấp độ cô lập ANSI SQL nào là MẶC ĐỊNH trong PostgreSQL, Oracle và Microsoft SQL Server?'
      },
      options: [
        { en: 'READ COMMITTED', vi: 'READ COMMITTED' },
        { en: 'READ UNCOMMITTED', vi: 'READ UNCOMMITTED' },
        { en: 'REPEATABLE READ', vi: 'REPEATABLE READ' },
        { en: 'SERIALIZABLE', vi: 'SERIALIZABLE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'READ COMMITTED is the industry standard default for Postgres, Oracle, and SQL Server.',
        vi: 'READ COMMITTED là cấp độ mặc định phổ biến trong Postgres, Oracle và SQL Server.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_iso_5',
      type: 'single_choice',
      question: {
        en: 'Which ANSI SQL isolation level is the DEFAULT in MySQL InnoDB engine?',
        vi: 'Cấp độ cô lập ANSI SQL nào là MẶC ĐỊNH trong bộ máy MySQL InnoDB?'
      },
      options: [
        { en: 'REPEATABLE READ', vi: 'REPEATABLE READ' },
        { en: 'READ UNCOMMITTED', vi: 'READ UNCOMMITTED' },
        { en: 'READ COMMITTED', vi: 'READ COMMITTED' },
        { en: 'SERIALIZABLE', vi: 'SERIALIZABLE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MySQL InnoDB defaults to REPEATABLE READ using next-key locking and MVCC to prevent non-repeatable reads and phantoms.',
        vi: 'MySQL InnoDB mặc định dùng REPEATABLE READ kết hợp next-key locking và MVCC để chống non-repeatable reads và phantoms.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_iso_6',
      type: 'single_choice',
      question: {
        en: 'What is the highest isolation level defined by ANSI SQL that guarantees complete immunity against all concurrency anomalies?',
        vi: 'Cấp độ cô lập cao nhất được định nghĩa bởi ANSI SQL đảm bảo miễn nhiễm hoàn toàn trước mọi bất thường tương tranh là gì?'
      },
      options: [
        { en: 'SERIALIZABLE', vi: 'SERIALIZABLE' },
        { en: 'REPEATABLE READ', vi: 'REPEATABLE READ' },
        { en: 'SNAPSHOT ISOLATION', vi: 'SNAPSHOT ISOLATION' },
        { en: 'UNCOMMITTED STRICT', vi: 'UNCOMMITTED STRICT' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SERIALIZABLE guarantees that the concurrent execution of transactions produces the same effect as some strictly serial (one-by-one) execution.',
        vi: 'SERIALIZABLE đảm bảo việc thực thi đồng thời các giao dịch sẽ cho kết quả y hệt như khi chạy tuần tự từng giao dịch một.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_iso_7',
      type: 'single_choice',
      question: {
        en: 'What does MVCC stand for, and what primary problem does it solve in modern databases?',
        vi: 'MVCC là viết tắt của cụm từ gì và nó giải quyết vấn đề cốt lõi nào trong CSDL hiện đại?'
      },
      options: [
        { en: 'Multi-Version Concurrency Control; it allows readers to query consistent data snapshots without blocking writers, and writers to modify rows without blocking readers', vi: 'Multi-Version Concurrency Control (Kiểm soát Tương tranh Đa Phiên bản); nó cho phép người đọc truy vấn ảnh chụp nhất quán mà không chặn người ghi, và người ghi sửa dòng mà không chặn người đọc' },
        { en: 'Multiple Variable Cache Counter; it counts total variables in RAM', vi: 'Multiple Variable Cache Counter; đếm tổng số biến trong RAM' },
        { en: 'Master View Connection Channel; it connects web servers', vi: 'Master View Connection Channel; kết nối các web server' },
        { en: 'Minimum Value Constraint Code; it validates integers', vi: 'Minimum Value Constraint Code; kiểm tra số nguyên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MVCC eliminates read-write lock contention by maintaining row version histories.',
        vi: 'MVCC loại bỏ tranh chấp khóa giữa đọc và ghi bằng cách duy trì lịch sử phiên bản của từng dòng.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_iso_8',
      type: 'true_false',
      question: {
        en: 'Higher isolation levels (like SERIALIZABLE) provide maximum data safety but generally increase transaction latency and lock contention / abort rates under heavy concurrency.',
        vi: 'Cấp độ cô lập càng cao (như SERIALIZABLE) càng đảm bảo an toàn dữ liệu nhưng nhìn chung sẽ làm tăng độ trễ giao dịch và nguy cơ nghẽn khóa / tỉ lệ abort khi tải cao.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Engineering isolation level choices represents a deliberate trade-off between strict mathematical correctness and system throughput.',
        vi: 'Đúng. Lựa chọn cấp độ cô lập là sự đánh đổi cân nhắc giữa tính chính xác toán học nghiêm ngặt và thông lượng hệ thống.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_iso_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are the four standard ANSI SQL transaction isolation levels? (Select all that apply)',
        vi: 'Những mục nào sau đây là 4 cấp độ cô lập giao dịch chuẩn ANSI SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'READ UNCOMMITTED', vi: 'READ UNCOMMITTED' },
        { en: 'READ COMMITTED', vi: 'READ COMMITTED' },
        { en: 'REPEATABLE READ', vi: 'REPEATABLE READ' },
        { en: 'SERIALIZABLE', vi: 'SERIALIZABLE' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'These four levels comprise the complete standard ANSI SQL isolation classification matrix.',
        vi: 'Bốn cấp độ này tạo nên ma trận phân loại cấp độ cô lập tiêu chuẩn ANSI SQL.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_iso_10',
      type: 'single_choice',
      question: {
        en: 'What anomaly can occur in REPEATABLE READ isolation that is only eliminated in SERIALIZABLE?',
        vi: 'Hiện tượng bất thường nào có thể xảy ra ở cấp độ REPEATABLE READ mà chỉ có thể bị triệt tiêu hoàn toàn ở cấp SERIALIZABLE?'
      },
      options: [
        { en: 'Write Skew (where two transactions simultaneously read overlapping data and make conflicting conditional decisions that violate a global invariant)', vi: 'Write Skew (khi 2 giao dịch đồng thời đọc dữ liệu gối nhau và đưa ra quyết định cập nhật xung đột vi phạm quy tắc bất biến toàn cục)' },
        { en: 'Dirty Read', vi: 'Đọc rác (Dirty Read)' },
        { en: 'Table Dropping', vi: 'Xóa bảng' },
        { en: 'Index Corruptions', vi: 'Hỏng chỉ mục' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Write skew anomalies occur under snapshot isolation when two concurrent transactions check constraints on disjoint rows that overlap logically.',
        vi: 'Hiện tượng Write skew xảy ra dưới snapshot isolation khi hai giao dịch đồng thời kiểm tra điều kiện trên các dòng riêng biệt nhưng có ràng buộc logic chung.'
      },
      topicId: 'sql_isolation_levels',
      difficulty: 'hard'
    }
  ]
};

export default lesson22;
