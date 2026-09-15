import { Lesson } from '../../../../types';

export const lesson19: Lesson = {
  id: 'sql_lesson_19',
  moduleId: 'sql_mod_4',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 19,
  topicId: 'sql_merge_upsert',
  title: {
    en: 'MERGE & UPSERT: Atomic Insert or Update Patterns',
    vi: 'MERGE & UPSERT: Kỹ Thuật Thao Tác Chèn Hoặc Cập Nhật Nguyên Tử'
  },
  summary: {
    en: 'Master atomic upsert operations in SQL: handling key collisions gracefully using INSERT ... ON CONFLICT DO UPDATE / DO NOTHING (PostgreSQL/SQLite), ON DUPLICATE KEY UPDATE (MySQL), and standard MERGE INTO statements.',
    vi: 'Làm chủ thao tác upsert nguyên tử trong SQL: xử lý xung đột khóa an toàn bằng INSERT ... ON CONFLICT DO UPDATE / DO NOTHING (PostgreSQL/SQLite), ON DUPLICATE KEY UPDATE (MySQL) và câu lệnh chuẩn MERGE INTO.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'In high-concurrency applications, data synchronization pipelines often need to insert a new row if a key does not exist, or update existing columns if the key is already present. Naive "check-then-insert" logic causes fatal race conditions. SQL provides native, atomic UPSERT mechanisms to solve this idempotency challenge in a single round-trip.',
      vi: 'Trong các ứng dụng có tính đồng thời cao, các đường ống đồng bộ dữ liệu thường cần chèn dòng mới nếu khóa chưa tồn tại, hoặc cập nhật các cột nếu khóa đã có sẵn. Cách làm kiểm tra thủ công "check-then-insert" dễ dẫn đến xung đột tương tranh (race conditions). SQL cung cấp cơ chế UPSERT nguyên tử để giải quyết bài toán này một cách an toàn chỉ trong 1 lệnh duy nhất.'
    },
    conceptExplanation: {
      en: 'UPSERT Mechanics Across Relational Dialects:\n1. PostgreSQL & SQLite (ON CONFLICT):\n   - "INSERT INTO target (id, val) VALUES (1, 100) ON CONFLICT (id) DO UPDATE SET val = EXCLUDED.val;"\n   - "DO NOTHING" option skips insertion silently if a unique/primary key violation occurs.\n   - "EXCLUDED" pseudo-table represents the proposed record that was rejected by the conflict.\n2. MySQL (ON DUPLICATE KEY UPDATE):\n   - "INSERT INTO target (id, val) VALUES (1, 100) ON DUPLICATE KEY UPDATE val = VALUES(val);"\n3. ANSI SQL Standard MERGE INTO (Oracle, SQL Server, Snowflake, BigQuery):\n   - "MERGE INTO target t USING source s ON (t.id = s.id) WHEN MATCHED THEN UPDATE SET t.val = s.val WHEN NOT MATCHED THEN INSERT (id, val) VALUES (s.id, s.val);"',
      vi: 'Cơ chế UPSERT trên các hệ quản trị CSDL quan hệ:\n1. PostgreSQL & SQLite (ON CONFLICT):\n   - "INSERT INTO target (id, val) VALUES (1, 100) ON CONFLICT (id) DO UPDATE SET val = EXCLUDED.val;"\n   - Tùy chọn "DO NOTHING" bỏ qua việc chèn trong im lặng nếu gặp xung đột khóa chính/duy nhất.\n   - Bảng giả lập "EXCLUDED" đại diện cho bản ghi mới định chèn vào nhưng bị từ chối do xung đột.\n2. MySQL (ON DUPLICATE KEY UPDATE):\n   - "INSERT INTO target (id, val) VALUES (1, 100) ON DUPLICATE KEY UPDATE val = VALUES(val);"\n3. Chuẩn ANSI SQL MERGE INTO (Oracle, SQL Server, Snowflake, BigQuery):\n   - "MERGE INTO target t USING source s ON (t.id = s.id) WHEN MATCHED THEN UPDATE SET t.val = s.val WHEN NOT MATCHED THEN INSERT (id, val) VALUES (s.id, s.val);"'
    },
    syntax: `-- PostgreSQL & SQLite syntax
INSERT INTO user_stats (user_id, login_count, last_login)
VALUES (42, 1, CURRENT_TIMESTAMP)
ON CONFLICT (user_id) 
DO UPDATE SET 
  login_count = user_stats.login_count + 1,
  last_login = EXCLUDED.last_login;

-- Idempotent Event Log Ingestion (Ignore Duplicates)
INSERT INTO processed_events (event_id, payload)
VALUES ('evt_9981', '{"status":"ok"}')
ON CONFLICT (event_id) DO NOTHING;`,
    examples: [
      {
        title: {
          en: '1. Real-time Inventory Counter Increment with ON CONFLICT',
          vi: '1. Tăng Bộ Đếm Tồn Kho Thời Gian Thực Bằng ON CONFLICT'
        },
        code: `INSERT INTO inventory_stock (sku, quantity_available)
VALUES ('LAPTOP-PRO-16', 5)
ON CONFLICT (sku) 
DO UPDATE SET 
  quantity_available = inventory_stock.quantity_available + EXCLUDED.quantity_available;`,
        language: 'sql',
        explanation: {
          en: 'If the SKU is new, it inserts with 5 units. If the SKU already exists, it atomically adds 5 to the existing inventory level without race conditions.',
          vi: 'Nếu SKU là mới, nó chèn 5 chiếc. Nếu SKU đã tồn tại, nó cộng dồn 5 vào số lượng tồn kho hiện có một cách nguyên tử mà không bị xung đột luồng.'
        }
      },
      {
        title: {
          en: '2. Standard ANSI MERGE for Master Table Synchronization',
          vi: '2. Chuẩn ANSI MERGE Để Đồng Bộ Bảng Dữ Liệu Gốc'
        },
        code: `MERGE INTO customers t
USING staging_customers s
ON (t.id = s.id)
WHEN MATCHED THEN
  UPDATE SET t.name = s.name, t.email = s.email, t.updated_at = CURRENT_TIMESTAMP
WHEN NOT MATCHED THEN
  INSERT (id, name, email) VALUES (s.id, s.name, s.email);`,
        language: 'sql',
        explanation: {
          en: 'Synchronizes the target customer master table against a staging batch in a single atomic pass.',
          vi: 'Đồng bộ bảng khách hàng chính với tập dữ liệu trung gian trong một lượt xử lý nguyên tử duy nhất.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using ON CONFLICT without a UNIQUE or PRIMARY KEY constraint on the target column.',
          vi: 'Dùng ON CONFLICT trên một cột không có ràng buộc UNIQUE hoặc PRIMARY KEY.'
        },
        correction: {
          en: 'ON CONFLICT requires a unique index or primary key constraint on the conflict target column(s). Without an underlying unique index, the database compiler throws an error.',
          vi: 'ON CONFLICT bắt buộc phải có chỉ mục duy nhất hoặc khóa chính trên cột kiểm tra xung đột. Nếu không có, câu lệnh sẽ bị báo lỗi biên dịch.'
        }
      },
      {
        mistake: {
          en: 'Performing application-level "SELECT then INSERT or UPDATE" in concurrent web apps.',
          vi: 'Thực hiện logic "SELECT rồi mới INSERT hoặc UPDATE" ở tầng ứng dụng trong môi trường đa luồng.'
        },
        correction: {
          en: 'Two simultaneous requests can both see that the row is missing and both attempt an INSERT, causing duplicate key crashes. Always use atomic UPSERT at the database level.',
          vi: 'Hai request đồng thời có thể cùng thấy dòng chưa tồn tại và cùng INSERT, gây lỗi trùng khóa. Hãy luôn dùng lệnh UPSERT nguyên tử ở tầng CSDL.'
        }
      }
    ],
    tips: [
      {
        en: 'In ON CONFLICT DO UPDATE, refer to incoming candidate values via the special "EXCLUDED" table name.',
        vi: 'Trong mệnh đề ON CONFLICT DO UPDATE, hãy tham chiếu đến các giá trị mới định nạp qua tên bảng đặc biệt "EXCLUDED".'
      },
      {
        en: 'ON CONFLICT DO NOTHING is the standard pattern for building idempotent webhook receivers.',
        vi: 'ON CONFLICT DO NOTHING là mô hình chuẩn mực khi lập trình các endpoint nhận webhook có tính bất biến/lặp lại an toàn.'
      }
    ],
    practiceStarterCode: `-- Practice ON CONFLICT DO UPDATE
INSERT INTO user_scores (user_id, score) VALUES (1, 100)
ON CONFLICT (user_id) DO UPDATE SET score = EXCLUDED.score;`
  },
  exercisePool: [
    {
      id: 'sql_ex_upsert_1',
      type: 'complete_code',
      title: {
        en: 'Atomic Counter Upsert with ON CONFLICT',
        vi: 'Upsert Tăng Bộ Đếm Nguyên Tử Bằng ON CONFLICT'
      },
      instruction: {
        en: 'Complete the ON CONFLICT clause to update page_views by adding EXCLUDED.page_views upon conflict on page_id.',
        vi: 'Hoàn thiện mệnh đề ON CONFLICT để cập nhật page_views bằng cách cộng dồn EXCLUDED.page_views khi xung đột trên page_id.'
      },
      starterCode: `INSERT INTO metrics (page_id, page_views)
VALUES ('/home', 1)
ON CONFLICT (page_id)
DO ___ SET page_views = metrics.page_views + EXCLUDED.page_views;`,
      solutionCode: `INSERT INTO metrics (page_id, page_views)
VALUES ('/home', 1)
ON CONFLICT (page_id)
DO UPDATE SET page_views = metrics.page_views + EXCLUDED.page_views;`,
      hint: {
        en: 'Use DO UPDATE.',
        vi: 'Dùng DO UPDATE.'
      },
      explanation: {
        en: 'DO UPDATE instructs the database to modify existing columns when a collision occurs.',
        vi: 'DO UPDATE yêu cầu CSDL cập nhật các cột hiện có khi xảy ra xung đột khóa.'
      }
    },
    {
      id: 'sql_ex_upsert_2',
      type: 'complete_code',
      title: {
        en: 'Idempotent Ingestion with DO NOTHING',
        vi: 'Nạp Dữ Liệu Bất Biến Với DO NOTHING'
      },
      instruction: {
        en: 'Complete the statement to ignore duplicate insertions on conflict on id.',
        vi: 'Hoàn thiện câu lệnh để bỏ qua các lần chèn trùng lặp khi xung đột trên id.'
      },
      starterCode: `INSERT INTO audit_events (id, detail)
VALUES (101, 'User logged in')
ON CONFLICT (id) DO ___;`,
      solutionCode: `INSERT INTO audit_events (id, detail)
VALUES (101, 'User logged in')
ON CONFLICT (id) DO NOTHING;`,
      hint: {
        en: 'Use DO NOTHING.',
        vi: 'Dùng DO NOTHING.'
      },
      explanation: {
        en: 'DO NOTHING gracefully suppresses unique constraint violations without throwing errors.',
        vi: 'DO NOTHING âm thầm bỏ qua vi phạm ràng buộc duy nhất mà không ném lỗi gián đoạn.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_merge_upsert',
    title: {
      en: 'Real-time Daily User Activity Aggregator & Idempotent Sync',
      vi: 'Bộ Tổng Hợp Hoạt Động Người Dùng Hàng Ngày & Đồng Bộ Bất Biến'
    },
    description: {
      en: 'Write an atomic SQL UPSERT query into the daily_user_stats table (columns: user_id, activity_date, total_actions, last_action_time). The target composite unique key is (user_id, activity_date). Insert a new record (user_id = 501, activity_date = \'2026-08-30\', total_actions = 1, last_action_time = CURRENT_TIMESTAMP). On conflict on (user_id, activity_date), update total_actions = daily_user_stats.total_actions + EXCLUDED.total_actions, and set last_action_time = EXCLUDED.last_action_time.',
      vi: 'Viết câu truy vấn SQL UPSERT nguyên tử vào bảng daily_user_stats (các cột: user_id, activity_date, total_actions, last_action_time). Khóa duy nhất tổ hợp mục tiêu là (user_id, activity_date). Chèn bản ghi mới (user_id = 501, activity_date = \'2026-08-30\', total_actions = 1, last_action_time = CURRENT_TIMESTAMP). Khi xung đột trên (user_id, activity_date), cập nhật total_actions = daily_user_stats.total_actions + EXCLUDED.total_actions, và đặt last_action_time = EXCLUDED.last_action_time.'
    },
    requirements: [
      { en: '1. INSERT INTO daily_user_stats (user_id, activity_date, total_actions, last_action_time)', vi: '1. INSERT INTO daily_user_stats (user_id, activity_date, total_actions, last_action_time)' },
      { en: '2. VALUES (501, \'2026-08-30\', 1, CURRENT_TIMESTAMP)', vi: '2. VALUES (501, \'2026-08-30\', 1, CURRENT_TIMESTAMP)' },
      { en: '3. ON CONFLICT (user_id, activity_date) DO UPDATE SET total_actions = daily_user_stats.total_actions + EXCLUDED.total_actions, last_action_time = EXCLUDED.last_action_time', vi: '3. ON CONFLICT (user_id, activity_date) DO UPDATE SET total_actions = daily_user_stats.total_actions + EXCLUDED.total_actions, last_action_time = EXCLUDED.last_action_time' }
    ],
    starterCode: `-- Write your composite key upsert statement
INSERT INTO daily_user_stats (user_id, activity_date, total_actions, last_action_time)
VALUES (501, '2026-08-30', 1, CURRENT_TIMESTAMP);`,
    solutionCode: `INSERT INTO daily_user_stats (user_id, activity_date, total_actions, last_action_time)
VALUES (501, '2026-08-30', 1, CURRENT_TIMESTAMP)
ON CONFLICT (user_id, activity_date)
DO UPDATE SET 
  total_actions = daily_user_stats.total_actions + EXCLUDED.total_actions,
  last_action_time = EXCLUDED.last_action_time;`,
    hints: [
      {
        en: 'Specify both composite key columns inside ON CONFLICT (user_id, activity_date) and use EXCLUDED for new incoming values.',
        vi: 'Chỉ định cả hai cột khóa tổ hợp trong ON CONFLICT (user_id, activity_date) và dùng EXCLUDED để lấy giá trị mới nạp.'
      }
    ],
    solutionExplanation: {
      en: 'Atomically creates or increments daily user activity metrics under high concurrent web traffic without application locking.',
      vi: 'Khởi tạo hoặc cộng dồn chỉ số hoạt động hàng ngày một cách nguyên tử dưới lưu lượng truy cập cao mà không cần khóa luồng ứng dụng.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_upsert_1',
      type: 'single_choice',
      question: {
        en: 'What does the term "UPSERT" mean in database engineering?',
        vi: 'Thuật ngữ "UPSERT" có ý nghĩa gì trong kỹ thuật CSDL?'
      },
      options: [
        { en: 'An atomic operation that inserts a row if it does not exist, or updates it if a matching unique/primary key already exists', vi: 'Một thao tác nguyên tử chèn dòng mới nếu chưa có, hoặc cập nhật nếu khóa chính/duy nhất đã tồn tại' },
        { en: 'Upgrading the database server version', vi: 'Nâng cấp phiên bản máy chủ CSDL' },
        { en: 'Sorting rows in ascending alphabetical order', vi: 'Sắp xếp các dòng theo thứ tự chữ cái tăng dần' },
        { en: 'A tool for uploading CSV files', vi: 'Một công cụ để tải file CSV lên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'UPSERT is a portmanteau of UPDATE and INSERT, providing idempotent data write capabilities.',
        vi: 'UPSERT là từ ghép của UPDATE và INSERT, cung cấp khả năng ghi dữ liệu bất biến và chống trùng lặp.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_upsert_2',
      type: 'single_choice',
      question: {
        en: 'In PostgreSQL and SQLite "ON CONFLICT ... DO UPDATE", what does the "EXCLUDED" keyword represent?',
        vi: 'Trong cú pháp "ON CONFLICT ... DO UPDATE" của PostgreSQL và SQLite, từ khóa "EXCLUDED" đại diện cho điều gì?'
      },
      options: [
        { en: 'A pseudo-table containing the proposed row values that were originally provided in the INSERT statement but caused the conflict', vi: 'Một bảng giả lập chứa các giá trị của dòng mới định nạp trong câu lệnh INSERT nhưng đã gây ra xung đột' },
        { en: 'Rows that were deleted from the database', vi: 'Các dòng đã bị xóa khỏi CSDL' },
        { en: 'Columns marked as private', vi: 'Các cột được đánh dấu là riêng tư' },
        { en: 'A list of banned IP addresses', vi: 'Danh sách các địa chỉ IP bị cấm' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'EXCLUDED holds the candidate values submitted by the INSERT that conflicted with existing rows.',
        vi: 'EXCLUDED chứa các giá trị ứng viên được truyền vào bởi lệnh INSERT nhưng bị đụng độ với dữ liệu cũ.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_upsert_3',
      type: 'single_choice',
      question: {
        en: 'What does "INSERT INTO ... ON CONFLICT (id) DO NOTHING;" do if a row with that id already exists?',
        vi: 'Câu lệnh "INSERT INTO ... ON CONFLICT (id) DO NOTHING;" sẽ làm gì nếu một dòng có id đó đã tồn tại sẵn?'
      },
      options: [
        { en: 'It silently ignores the insert and returns successfully without modifying the existing row or throwing an error', vi: 'Nó âm thầm bỏ qua việc chèn và kết thúc thành công mà không thay đổi dòng cũ hay báo lỗi' },
        { en: 'It deletes the entire table', vi: 'Nó xóa toàn bộ bảng' },
        { en: 'It raises a fatal unique constraint violation error', vi: 'Nó ném ra lỗi vi phạm ràng buộc duy nhất nghiêm trọng' },
        { en: 'It generates a random new id', vi: 'Nó tự sinh một id ngẫu nhiên mới' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DO NOTHING guarantees idempotency by swallowing duplicate key collisions cleanly.',
        vi: 'DO NOTHING đảm bảo tính bất biến bằng cách bỏ qua các xung đột trùng khóa một cách êm đẹp.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_upsert_4',
      type: 'true_false',
      question: {
        en: 'An ON CONFLICT target column MUST have a UNIQUE constraint, PRIMARY KEY, or unique index defined on it.',
        vi: 'Cột mục tiêu trong mệnh đề ON CONFLICT BẮT BUỘC phải có ràng buộc UNIQUE, PRIMARY KEY hoặc chỉ mục duy nhất.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. The database engine relies on unique index arbiter rules to identify conflict triggers.',
        vi: 'Đúng. Trình quản trị CSDL dựa vào chỉ mục duy nhất để nhận diện các điểm kích hoạt xung đột.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_upsert_5',
      type: 'single_choice',
      question: {
        en: 'Which SQL dialect uses the "ON DUPLICATE KEY UPDATE" clause syntax for upserts?',
        vi: 'Hệ quản trị CSDL SQL nào sử dụng cú pháp mệnh đề "ON DUPLICATE KEY UPDATE" cho thao tác upsert?'
      },
      options: [
        { en: 'MySQL / MariaDB', vi: 'MySQL / MariaDB' },
        { en: 'PostgreSQL', vi: 'PostgreSQL' },
        { en: 'SQLite', vi: 'SQLite' },
        { en: 'Oracle', vi: 'Oracle' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ON DUPLICATE KEY UPDATE is specific to MySQL and MariaDB.',
        vi: 'ON DUPLICATE KEY UPDATE là cú pháp đặc thù của MySQL và MariaDB.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_upsert_6',
      type: 'single_choice',
      question: {
        en: 'Which standard ANSI SQL statement is supported by Oracle, SQL Server, and BigQuery to synchronize tables via conditional MATCHED / NOT MATCHED clauses?',
        vi: 'Câu lệnh chuẩn ANSI SQL nào được Oracle, SQL Server và BigQuery hỗ trợ để đồng bộ các bảng thông qua các mệnh đề điều kiện MATCHED / NOT MATCHED?'
      },
      options: [
        { en: 'MERGE INTO', vi: 'MERGE INTO' },
        { en: 'UPSERT INTO', vi: 'UPSERT INTO' },
        { en: 'SYNC TABLE', vi: 'SYNC TABLE' },
        { en: 'REPLACE INTO', vi: 'REPLACE INTO' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MERGE INTO is the ANSI SQL standard construct for complex conditional update/insert ETL synchronization.',
        vi: 'MERGE INTO là cấu trúc chuẩn ANSI SQL cho việc đồng bộ và cập nhật/chèn có điều kiện trong ETL.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_upsert_7',
      type: 'true_false',
      question: {
        en: 'Performing atomic UPSERT at the database layer prevents concurrency race conditions where two simultaneous web requests try to insert the same record.',
        vi: 'Thực hiện UPSERT nguyên tử ở tầng CSDL giúp ngăn chặn triệt để xung đột tương tranh khi hai request đồng thời cố chèn cùng một bản ghi.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Database engines lock the unique index leaf page, guaranteeing transactional atomicity.',
        vi: 'Đúng. CSDL khóa trang lá của chỉ mục duy nhất, đảm bảo tính nguyên tử tuyệt đối của giao dịch.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_upsert_8',
      type: 'single_choice',
      question: {
        en: 'In SQLite and MySQL, what does the legacy "REPLACE INTO" statement do when a collision occurs?',
        vi: 'Trong SQLite và MySQL, câu lệnh "REPLACE INTO" làm gì khi xảy ra xung đột khóa?'
      },
      options: [
        { en: 'It physically DELETES the existing conflicting row and inserts a completely new row (which can trigger unexpected cascading deletes on foreign keys)', vi: 'Nó XÓA bỏ dòng đang bị xung đột rồi chèn một dòng hoàn toàn mới (có thể kích hoạt xóa theo tầng cascade ngoài ý muốn trên khóa ngoại)' },
        { en: 'It modifies only specified columns in place without deleting the row', vi: 'Nó chỉ sửa các cột được chỉ định tại chỗ mà không xóa dòng' },
        { en: 'It creates a backup table', vi: 'Nó tạo một bảng sao lưu' },
        { en: 'It asks the database administrator for permission', vi: 'Nó hỏi ý kiến quản trị viên CSDL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'REPLACE INTO performs a DELETE + INSERT under the hood, making ON CONFLICT DO UPDATE much safer and preferable.',
        vi: 'REPLACE INTO thực chất làm DELETE rồi INSERT, do đó ON CONFLICT DO UPDATE an toàn và được ưa chuộng hơn nhiều.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_upsert_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following scenarios are ideal use cases for UPSERT / ON CONFLICT? (Select all that apply)',
        vi: 'Những kịch bản nào sau đây là trường hợp sử dụng lý tưởng cho UPSERT / ON CONFLICT? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Idempotent webhook and event stream ingestion', vi: 'Nạp luồng sự kiện và webhook có tính bất biến' },
        { en: 'Real-time page view and metrics aggregation counters', vi: 'Bộ đếm tổng hợp lượt xem trang và chỉ số thời gian thực' },
        { en: 'Syncing third-party CRM contacts without creating duplicates', vi: 'Đồng bộ danh bạ CRM bên thứ ba mà không tạo trùng lặp' },
        { en: 'Dropping all tables from the database', vi: 'Xóa toàn bộ các bảng khỏi CSDL' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Options 1, 2, and 3 are canonical upsert workflows. Option 4 is an administrative teardown task.',
        vi: 'Các phương án 1, 2 và 3 là các luồng xử lý chuẩn của upsert. Phương án 4 là thao tác xóa hệ thống.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_upsert_10',
      type: 'single_choice',
      question: {
        en: 'Can ON CONFLICT DO UPDATE be used with a WHERE filter clause on the UPDATE action?',
        vi: 'Mệnh đề ON CONFLICT DO UPDATE có thể kết hợp với điều kiện lọc WHERE cho hành động UPDATE không?'
      },
      options: [
        { en: 'Yes, allowing conditional updates (e.g. only update if incoming timestamp is newer than existing timestamp)', vi: 'Có, cho phép cập nhật có điều kiện (ví dụ: chỉ cập nhật nếu thời gian nạp mới hơn thời gian đang có)' },
        { en: 'No, ON CONFLICT rejects all WHERE clauses', vi: 'Không, ON CONFLICT cấm mọi mệnh đề WHERE' },
        { en: 'Only on Sundays', vi: 'Chỉ vào ngày Chủ Nhật' },
        { en: 'Only when using encrypted columns', vi: 'Chỉ khi dùng các cột đã mã hóa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PostgreSQL supports "ON CONFLICT (...) DO UPDATE SET ... WHERE condition", enabling precision conflict resolution.',
        vi: 'PostgreSQL hỗ trợ "ON CONFLICT (...) DO UPDATE SET ... WHERE điều_kiện", cho phép giải quyết xung đột chuẩn xác.'
      },
      topicId: 'sql_merge_upsert',
      difficulty: 'medium'
    }
  ]
};

export default lesson19;
