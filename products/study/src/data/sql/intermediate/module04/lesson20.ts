import { Lesson } from '../../../../types';

export const lesson20: Lesson = {
  id: 'sql_lesson_20',
  moduleId: 'sql_mod_4',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 20,
  topicId: 'sql_views_materialized',
  title: {
    en: 'Views & Materialized Views: Virtual vs Cached Relational Abstractions',
    vi: 'Khung Nhìn (View) & Materialized View: Trừu Tượng Hóa Ảo & Bộ Đệm'
  },
  summary: {
    en: 'Master relational views: encapsulating multi-table joins and row-level security masks with CREATE VIEW, vs physical analytical query caching and refresh pipelines with Materialized Views.',
    vi: 'Làm chủ khung nhìn trong CSDL quan hệ: đóng gói các phép join nhiều bảng và mặt nạ bảo mật phân quyền với CREATE VIEW, so sánh với bộ đệm vật lý tốc độ cao và đường ống làm mới với Materialized View.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'A View is a stored, named SQL query that behaves as a virtual table. Rather than duplicating complex queries across client applications, views provide an abstraction layer for security masking, business logic encapsulation, and architectural decoupling. Materialized Views take this further by caching the query results physically to disk for lightning-fast analytical reporting.',
      vi: 'Khung nhìn (View) là một câu truy vấn SQL có tên được lưu trong CSDL và hoạt động như một bảng ảo. Thay vì lặp lại các truy vấn phức tạp ở nhiều nơi, view cung cấp tầng trừu tượng hóa để phân quyền bảo mật, đóng gói logic nghiệp vụ. Materialized View tiến thêm một bước bằng cách lưu kết quả vật lý ra đĩa để báo cáo phân tích với tốc độ cực nhanh.'
    },
    conceptExplanation: {
      en: 'View Architecture & Materialized Differences:\n1. Standard Virtual View (CREATE VIEW):\n   - Stores ONLY the SQL definition, not physical row data.\n   - The database engine expands the view into the underlying query plan at runtime.\n   - Perfect for security (e.g. hiding employee SSNs or salaries from junior analysts) and DRY querying.\n2. Updatable Views:\n   - Simple views referencing a single base table without aggregations/GROUP BY can accept INSERT, UPDATE, and DELETE operations.\n3. Materialized Views (PostgreSQL, Oracle, Snowflake):\n   - "CREATE MATERIALIZED VIEW mv_name AS SELECT ..."\n   - Executes the query once and physically writes the dataset to disk, creating indexes on the cached data.\n   - Fast sub-millisecond reads on massive multi-million row aggregations.\n   - Must be refreshed periodically via "REFRESH MATERIALIZED VIEW [CONCURRENTLY] mv_name;".',
      vi: 'Kiến trúc View & Sự khác biệt của Materialized View:\n1. Khung nhìn ảo tiêu chuẩn (CREATE VIEW):\n   - CHỈ lưu định nghĩa câu lệnh SQL, không chiếm dung lượng lưu trữ dữ liệu dòng.\n   - Trình tối ưu CSDL sẽ mở rộng view vào kế hoạch thực thi trực tiếp tại thời điểm truy vấn.\n   - Lý tưởng cho bảo mật (che số CCCD hoặc lương với nhân viên thường) và tái sử dụng code.\n2. Khung nhìn có thể cập nhật (Updatable Views):\n   - Các view đơn giản tham chiếu 1 bảng gốc không chứa GROUP BY/tổng hợp có thể nhận lệnh INSERT, UPDATE và DELETE.\n3. Khung nhìn vật lý hóa (Materialized Views - PostgreSQL, Oracle, Snowflake):\n   - "CREATE MATERIALIZED VIEW mv_name AS SELECT ..."\n   - Chạy truy vấn 1 lần và ghi kết quả thực tế xuống ổ đĩa, cho phép đánh chỉ mục trên dữ liệu đệm.\n   - Đọc dữ liệu tổng hợp hàng triệu dòng chỉ mất vài mili-giây.\n   - Cần được làm mới định kỳ bằng lệnh "REFRESH MATERIALIZED VIEW [CONCURRENTLY] mv_name;".'
    },
    syntax: `-- Standard Virtual View
CREATE VIEW active_customer_summary AS
SELECT c.id, c.name, c.email, COUNT(o.id) AS total_orders, COALESCE(SUM(o.total), 0) AS lifetime_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE c.is_active = 1
GROUP BY c.id, c.name, c.email;

-- PostgreSQL Materialized View
-- CREATE MATERIALIZED VIEW mv_monthly_revenue AS
-- SELECT strftime('%Y-%m', created_at) AS month, SUM(amount) AS revenue
-- FROM sales GROUP BY 1;
-- REFRESH MATERIALIZED VIEW CONCURRENTLY mv_monthly_revenue;`,
    examples: [
      {
        title: {
          en: '1. Security Masking View for Public API Consumers',
          vi: '1. Khung Nhìn Che Mặt Nạ Bảo Mật Cho Người Dùng API'
        },
        code: `CREATE VIEW public_staff_directory AS
SELECT id,
       name,
       department_id,
       job_title,
       email
FROM employees
WHERE is_active = 1;`,
        language: 'sql',
        explanation: {
          en: 'Exposes non-sensitive employee attributes while completely withholding sensitive columns like salary, bank_account, and SSN.',
          vi: 'Công khai các thông tin nhân sự thông thường trong khi giấu hoàn toàn các cột nhạy cảm như lương, tài khoản ngân hàng và số định danh.'
        }
      },
      {
        title: {
          en: '2. Querying a View with Additional Ad-hoc Filters',
          vi: '2. Truy Vấn Trên Khung Nhìn Kèm Bộ Lọc Bổ Sung'
        },
        code: `SELECT name, lifetime_value
FROM active_customer_summary
WHERE lifetime_value >= 1000.00
ORDER BY lifetime_value DESC;`,
        language: 'sql',
        explanation: {
          en: 'The database optimizer pushes the "lifetime_value >= 1000.00" filter down into the view definition automatically.',
          vi: 'Trình tối ưu CSDL tự động đẩy bộ lọc "lifetime_value >= 1000.00" xuống sâu bên trong định nghĩa của view.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Assuming a standard CREATE VIEW stores data on disk to speed up slow queries.',
          vi: 'Lầm tưởng rằng CREATE VIEW thông thường lưu dữ liệu ra đĩa để tăng tốc truy vấn chậm.'
        },
        correction: {
          en: 'A standard View is purely virtual; it executes the underlying SQL statement every single time it is queried. To physically store and cache query results, you must use a Materialized View.',
          vi: 'Khung nhìn tiêu chuẩn hoàn toàn là bảng ảo; nó thực thi lại câu lệnh gốc mỗi khi có ai truy vấn. Để lưu vật lý và tạo bộ đệm, bạn phải dùng Materialized View.'
        }
      },
      {
        mistake: {
          en: 'Creating deeply nested views on top of other views ("View on View on View").',
          vi: 'Tạo view lồng nhau quá nhiều tầng (View gọi View gọi View).'
        },
        correction: {
          en: 'Over-nesting views leads to catastrophic query optimization failures, redundant table joins, and severe CPU bottlenecks. Keep view hierarchies shallow.',
          vi: 'Lồng view quá nhiều tầng khiến trình tối ưu không thể lập kế hoạch hiệu quả, dẫn đến join thừa và làm nghẽn CPU. Hãy giữ cấu trúc view tinh gọn.'
        }
      }
    ],
    tips: [
      {
        en: 'Drop a view safely using "DROP VIEW IF EXISTS view_name;".',
        vi: 'Xóa view an toàn bằng câu lệnh "DROP VIEW IF EXISTS tên_view;".'
      },
      {
        en: 'In PostgreSQL, "REFRESH MATERIALIZED VIEW CONCURRENTLY" allows reading from the materialized view without blocking readers while the refresh is underway.',
        vi: 'Trong PostgreSQL, "REFRESH MATERIALIZED VIEW CONCURRENTLY" cho phép đọc từ view vật lý mà không bị khóa luồng trong khi đang làm mới dữ liệu.'
      }
    ],
    practiceStarterCode: `-- Create and query a simple view
CREATE VIEW tech_dept_employees AS
SELECT id, name, salary FROM employees WHERE department_id = 1;

SELECT * FROM tech_dept_employees;`
  },
  exercisePool: [
    {
      id: 'sql_ex_view_1',
      type: 'complete_code',
      title: {
        en: 'Create High Earners View',
        vi: 'Tạo Khung Nhìn Nhân Viên Thu Nhập Cao'
      },
      instruction: {
        en: 'Create a view named high_earners projecting id, name, and salary for employees earning >= 80000.',
        vi: 'Tạo một view có tên high_earners lấy id, name và salary của nhân viên có mức lương >= 80000.'
      },
      starterCode: `CREATE ___ high_earners AS
SELECT id, name, salary
FROM employees
WHERE salary >= 80000;`,
      solutionCode: `CREATE VIEW high_earners AS
SELECT id, name, salary
FROM employees
WHERE salary >= 80000;`,
      hint: {
        en: 'Use CREATE VIEW.',
        vi: 'Dùng CREATE VIEW.'
      },
      explanation: {
        en: 'CREATE VIEW registers a named virtual abstraction query in the schema catalog.',
        vi: 'CREATE VIEW đăng ký câu truy vấn ảo có tên vào danh mục lược đồ CSDL.'
      }
    },
    {
      id: 'sql_ex_view_2',
      type: 'complete_code',
      title: {
        en: 'Drop View Safely',
        vi: 'Xóa Khung Nhìn An Toàn'
      },
      instruction: {
        en: 'Drop the old_report view if it exists.',
        vi: 'Xóa view old_report nếu nó đang tồn tại.'
      },
      starterCode: `DROP VIEW ___ EXISTS old_report;`,
      solutionCode: `DROP VIEW IF EXISTS old_report;`,
      hint: {
        en: 'Use IF EXISTS.',
        vi: 'Dùng IF EXISTS.'
      },
      explanation: {
        en: 'DROP VIEW IF EXISTS guarantees idempotent cleanup without throwing errors if the view was already removed.',
        vi: 'DROP VIEW IF EXISTS đảm bảo dọn dẹp an toàn mà không báo lỗi nếu view đã bị xóa trước đó.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_views_materialized',
    title: {
      en: 'Executive Department Performance & Payroll Scorecard View',
      vi: 'Khung Nhìn Bảng Điểm Hiệu Suất & Quỹ Lương Phòng Ban'
    },
    description: {
      en: 'Write a DDL script to create a secure reporting view named v_department_payroll_summary. The view must join departments d with employees e ON d.id = e.department_id, grouping by d.id, d.name. Project department_id (d.id), department_name (d.name), total_staff as COUNT(e.id), total_payroll as COALESCE(SUM(e.salary), 0), avg_payroll as COALESCE(ROUND(AVG(e.salary), 2), 0.0), and max_salary as COALESCE(MAX(e.salary), 0). Follow the view creation with a SELECT query selecting all columns from v_department_payroll_summary WHERE total_staff > 0 ORDER BY total_payroll DESC.',
      vi: 'Viết script DDL để tạo một view báo cáo bảo mật có tên v_department_payroll_summary. View này join departments d với employees e ON d.id = e.department_id, gom nhóm theo d.id, d.name. Lấy department_id (d.id), department_name (d.name), total_staff bằng COUNT(e.id), total_payroll bằng COALESCE(SUM(e.salary), 0), avg_payroll bằng COALESCE(ROUND(AVG(e.salary), 2), 0.0), và max_salary bằng COALESCE(MAX(e.salary), 0). Tiếp nối bằng câu lệnh SELECT lấy tất cả các cột từ v_department_payroll_summary với điều kiện total_staff > 0 ORDER BY total_payroll DESC.'
    },
    requirements: [
      { en: '1. CREATE VIEW v_department_payroll_summary AS ...', vi: '1. CREATE VIEW v_department_payroll_summary AS ...' },
      { en: '2. LEFT JOIN departments d with employees e ON d.id = e.department_id GROUP BY d.id, d.name', vi: '2. LEFT JOIN departments d với employees e ON d.id = e.department_id GROUP BY d.id, d.name' },
      { en: '3. SELECT * FROM v_department_payroll_summary WHERE total_staff > 0 ORDER BY total_payroll DESC;', vi: '3. SELECT * FROM v_department_payroll_summary WHERE total_staff > 0 ORDER BY total_payroll DESC;' }
    ],
    starterCode: `-- Create the view and query from it
CREATE VIEW v_department_payroll_summary AS
SELECT d.id AS department_id, d.name AS department_name FROM departments d;

SELECT * FROM v_department_payroll_summary;`,
    solutionCode: `CREATE VIEW v_department_payroll_summary AS
SELECT d.id AS department_id,
       d.name AS department_name,
       COUNT(e.id) AS total_staff,
       COALESCE(SUM(e.salary), 0) AS total_payroll,
       COALESCE(ROUND(AVG(e.salary), 2), 0.0) AS avg_payroll,
       COALESCE(MAX(e.salary), 0) AS max_salary
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name;

SELECT *
FROM v_department_payroll_summary
WHERE total_staff > 0
ORDER BY total_payroll DESC;`,
    hints: [
      {
        en: 'Use LEFT JOIN so departments with 0 staff are preserved in the view definition, and use COALESCE for null safety.',
        vi: 'Dùng LEFT JOIN để bảo toàn các phòng ban chưa có nhân viên và dùng COALESCE để đảm bảo không bị NULL.'
      }
    ],
    solutionExplanation: {
      en: 'Encapsulates complex group aggregations into a clean, reusable database view that simplifies analytical queries.',
      vi: 'Đóng gói các phép tổng hợp nhóm phức tạp vào một khung nhìn CSDL sạch đẹp, giúp các truy vấn báo cáo trở nên vô cùng đơn giản.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_view_1',
      type: 'single_choice',
      question: {
        en: 'What is a standard database View in SQL?',
        vi: 'Khung nhìn (View) tiêu chuẩn trong CSDL SQL là gì?'
      },
      options: [
        { en: 'A stored, named SQL query that acts as a virtual table without storing data rows physically on disk', vi: 'Một câu truy vấn SQL có tên được lưu trong CSDL, đóng vai trò như một bảng ảo và không lưu dữ liệu vật lý ra đĩa' },
        { en: 'A graphical user interface popup window', vi: 'Một cửa sổ giao diện đồ họa' },
        { en: 'A physical duplicate copy of an entire database', vi: 'Một bản sao vật lý của toàn bộ CSDL' },
        { en: 'A temporary file deleted when the user logs out', vi: 'Một file tạm bị xóa khi người dùng đăng xuất' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A standard View stores only the query definition; the database executes it on the fly when referenced.',
        vi: 'View tiêu chuẩn chỉ lưu định nghĩa truy vấn; CSDL thực thi truy vấn này trực tiếp tại thời điểm được gọi.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_view_2',
      type: 'single_choice',
      question: {
        en: 'What is the key technical difference between a standard View and a Materialized View?',
        vi: 'Điểm khác biệt kỹ thuật mấu chốt giữa View tiêu chuẩn và Materialized View là gì?'
      },
      options: [
        { en: 'A Materialized View physically caches and persists the query result set on disk and must be explicitly refreshed, enabling fast analytical reads', vi: 'Materialized View lưu kết quả truy vấn thực tế ra đĩa thành bộ đệm và phải được làm mới tường minh, giúp đọc dữ liệu phân tích cực nhanh' },
        { en: 'Standard Views cannot have WHERE clauses', vi: 'View tiêu chuẩn không thể có mệnh đề WHERE' },
        { en: 'Materialized Views can only store images', vi: 'Materialized View chỉ có thể lưu hình ảnh' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Materialized views trade storage and refresh overhead for blazing fast read access on expensive queries.',
        vi: 'Materialized view đánh đổi dung lượng lưu trữ và chi phí làm mới để lấy tốc độ đọc siêu nhanh cho các truy vấn nặng.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_view_3',
      type: 'single_choice',
      question: {
        en: 'How can database views be used to enforce security and access control?',
        vi: 'Khung nhìn CSDL có thể được sử dụng để phân quyền và bảo mật như thế nào?'
      },
      options: [
        { en: 'By granting users permission to query a View that exposes only non-sensitive columns/rows while denying direct access to the underlying sensitive tables', vi: 'Bằng cách cấp quyền cho người dùng truy vấn một View chỉ hiển thị các cột/dòng không nhạy cảm, đồng thời chặn quyền truy cập trực tiếp vào bảng gốc' },
        { en: 'By encrypting all database passwords with MD5', vi: 'Bằng cách mã hóa mật khẩu CSDL bằng MD5' },
        { en: 'By blocking all connections from mobile devices', vi: 'Bằng cách chặn mọi kết nối từ điện thoại' },
        { en: 'By disabling SQL SELECT statements', vi: 'Bằng cách tắt các câu lệnh SQL SELECT' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Views act as security facades, presenting custom data projections while masking restricted fields.',
        vi: 'View đóng vai trò như lớp vỏ bảo mật, hiển thị dữ liệu được phép và che giấu các trường bảo mật nhạy cảm.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_view_4',
      type: 'true_false',
      question: {
        en: 'A standard View automatically reflects updates and changes made to the underlying base tables immediately without requiring any refresh command.',
        vi: 'View tiêu chuẩn tự động phản ánh các cập nhật và thay đổi từ bảng gốc ngay lập tức mà không cần bất kỳ lệnh làm mới nào.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Because a standard view is evaluated dynamically at query time, it always sees the freshest committed data.',
        vi: 'Đúng. Vì view tiêu chuẩn được đánh giá động tại thời điểm truy vấn nên nó luôn thấy dữ liệu mới nhất.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_view_5',
      type: 'single_choice',
      question: {
        en: 'What command is used to update the cached data of a Materialized View in PostgreSQL or Oracle?',
        vi: 'Lệnh nào được dùng để cập nhật dữ liệu bộ đệm của một Materialized View trong PostgreSQL hoặc Oracle?'
      },
      options: [
        { en: 'REFRESH MATERIALIZED VIEW view_name;', vi: 'REFRESH MATERIALIZED VIEW tên_view;' },
        { en: 'UPDATE VIEW view_name;', vi: 'UPDATE VIEW tên_view;' },
        { en: 'RELOAD TABLE view_name;', vi: 'RELOAD TABLE tên_view;' },
        { en: 'SYNC VIEW view_name;', vi: 'SYNC VIEW tên_view;' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'REFRESH MATERIALIZED VIEW re-executes the underlying query and refreshes the stored dataset on disk.',
        vi: 'REFRESH MATERIALIZED VIEW thực thi lại truy vấn gốc và cập nhật lại dữ liệu lưu trên đĩa.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_view_6',
      type: 'single_choice',
      question: {
        en: 'Under what conditions is a standard View considered "Updatable" (can accept INSERT, UPDATE, DELETE)?',
        vi: 'Trong điều kiện nào thì một View tiêu chuẩn được xem là "Có thể cập nhật" (chấp nhận INSERT, UPDATE, DELETE)?'
      },
      options: [
        { en: 'When it is built on a single base table without DISTINCT, GROUP BY, HAVING, aggregate functions, or set operations', vi: 'Khi nó được xây dựng trên một bảng đơn lẻ không chứa DISTINCT, GROUP BY, HAVING, hàm tổng hợp hay phép toán tập hợp' },
        { en: 'Only when the database server is running in debug mode', vi: 'Chỉ khi máy chủ CSDL chạy ở chế độ debug' },
        { en: 'All views are automatically updatable under all conditions', vi: 'Tất cả các view đều tự động cập nhật được trong mọi điều kiện' },
        { en: 'Views can never be updated in relational SQL', vi: 'View không bao giờ cập nhật được trong CSDL quan hệ' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Updatable views require an unambiguous 1-to-1 mapping between view rows and underlying table rows.',
        vi: 'View có thể cập nhật đòi hỏi ánh xạ 1-1 rõ ràng giữa dòng của view và dòng của bảng cơ sở.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_view_7',
      type: 'true_false',
      question: {
        en: 'You can create Indexes directly on Materialized Views to accelerate filtering and joining against the cached result set.',
        vi: 'Bạn có thể tạo Chỉ mục (Index) trực tiếp trên Materialized View để tăng tốc độ lọc và join trên tập dữ liệu đã lưu đệm.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Because Materialized Views exist physically as tables on disk, indexes can be attached to their columns.',
        vi: 'Đúng. Vì Materialized View tồn tại vật lý như một bảng trên đĩa nên có thể đánh chỉ mục trên các cột của nó.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_view_8',
      type: 'single_choice',
      question: {
        en: 'What architectural anti-pattern should be avoided when designing views?',
        vi: 'Anti-pattern kiến trúc nào cần tránh khi thiết kế các khung nhìn (View)?'
      },
      options: [
        { en: 'Deeply nesting "views on top of views" (e.g. 5+ layers deep), which hides severe query complexity and destroys query optimizer performance', vi: 'Lồng ghép quá sâu các "view chồng lên view" (5+ tầng), làm ẩn giấu độ phức tạp khổng lồ và phá hỏng khả năng tối ưu của CSDL' },
        { en: 'Using column aliases', vi: 'Sử dụng bí danh cột' },
        { en: 'Writing comments inside view definitions', vi: 'Viết chú thích bên trong định nghĩa view' },
        { en: 'Creating views for reports', vi: 'Tạo view cho báo cáo' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Over-nested views obscure table joins, prevent predicate pushdown, and cause explosive Cartesian query plans.',
        vi: 'View lồng nhau quá sâu làm mờ các phép join, ngăn chặn tối ưu bộ lọc và gây ra các kế hoạch truy vấn rất nặng.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_view_9',
      type: 'multiple_choice',
      question: {
        en: 'What are the main benefits of database Views? (Select all that apply)',
        vi: 'Những lợi ích chính của Khung nhìn (View) trong CSDL là gì? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Simplifying complex multi-table queries for application developers', vi: 'Đơn giản hóa các câu truy vấn join nhiều bảng phức tạp cho lập trình viên ứng dụng' },
        { en: 'Providing granular data security and column/row-level masking', vi: 'Cung cấp cơ chế bảo mật dữ liệu chi tiết và che mặt nạ cấp dòng/cột' },
        { en: 'Decoupling application code from underlying table schema changes', vi: 'Tách rời mã nguồn ứng dụng khỏi những thay đổi cấu trúc bảng cơ sở' },
        { en: 'Doubling the physical RAM of the database server', vi: 'Nhân đôi dung lượng RAM vật lý của máy chủ CSDL' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Simplicity, security masking, and architectural decoupling are the core strengths of database views.',
        vi: 'Sự đơn giản, che giấu dữ liệu bảo mật và tính linh hoạt trong kiến trúc là những điểm mạnh cốt lõi của view.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_view_10',
      type: 'single_choice',
      question: {
        en: 'What happens to a standard View if you DROP one of the underlying tables that the view queries from?',
        vi: 'Điều gì xảy ra với một View tiêu chuẩn nếu bạn XÓA (DROP) một trong những bảng cơ sở mà view đó tham chiếu đến?'
      },
      options: [
        { en: 'The view becomes invalid; subsequent queries to the view will fail with an error stating the underlying table does not exist', vi: 'View sẽ trở nên không hợp lệ; các truy vấn tiếp theo vào view sẽ báo lỗi rằng bảng cơ sở không tồn tại' },
        { en: 'The database automatically recreates the dropped table from thin air', vi: 'CSDL tự động tạo lại bảng đã xóa' },
        { en: 'The view is automatically converted into a CSV file', vi: 'View tự động chuyển thành file CSV' },
        { en: 'Nothing, the view continues to return all data forever', vi: 'Không có gì xảy ra, view vẫn trả về dữ liệu mãi mãi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Standard views depend dynamically on base tables; dropping a base table breaks the view contract.',
        vi: 'View tiêu chuẩn phụ thuộc động vào bảng cơ sở; xóa bảng cơ sở sẽ làm gãy liên kết của view và gây lỗi khi gọi.'
      },
      topicId: 'sql_views_materialized',
      difficulty: 'medium'
    }
  ]
};

export default lesson20;
