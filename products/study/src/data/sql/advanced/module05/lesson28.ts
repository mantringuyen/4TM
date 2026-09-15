import { Lesson } from '../../../../types';

export const lesson28: Lesson = {
  id: 'sql_lesson_28',
  moduleId: 'sql_mod_5',
  levelId: 'advanced',
  courseId: 'sql',
  order: 28,
  topicId: 'sql_stored_procs_triggers',
  title: {
    en: 'Stored Procedures, Triggers & User-Defined Functions (UDFs)',
    vi: 'Thủ Tục Lưu Trữ (Stored Procedures), Trigger & Hàm Tự Định Nghĩa (UDF)'
  },
  summary: {
    en: 'Master database server-side procedural programming: building parameterized Stored Procedures with transaction orchestration, automated event auditing with BEFORE/AFTER Triggers and NEW/OLD row states, and reusable User-Defined Functions (UDFs).',
    vi: 'Làm chủ lập trình thủ tục phía máy chủ CSDL: xây dựng Stored Procedure có tham số kết hợp điều phối giao dịch, kiểm toán sự kiện tự động bằng Trigger BEFORE/AFTER và trạng thái dòng NEW/OLD, cùng các hàm tự định nghĩa (UDF) tái sử dụng.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'While standard SQL is declarative, real-world enterprise databases require procedural logic for automated audit trails, complex business calculations, and multi-step transaction pipelines. Relational engines provide procedural extensions (PL/pgSQL, T-SQL, PL/SQL) supporting Stored Procedures, automated Triggers, and User-Defined Functions (UDFs).',
      vi: 'Dù SQL tiêu chuẩn mang tính khai báo, các hệ thống CSDL doanh nghiệp thực tế luôn đòi hỏi logic thủ tục để ghi nhật ký kiểm toán tự động, tính toán nghiệp vụ phức tạp và xử lý quy trình giao dịch nhiều bước. Các hệ quản trị CSDL cung cấp phần mở rộng thủ tục (PL/pgSQL, T-SQL, PL/SQL) hỗ trợ Stored Procedures, Trigger tự động và Hàm tự định nghĩa (UDF).'
    },
    conceptExplanation: {
      en: 'Server-Side Procedural Architecture:\n1. User-Defined Functions (UDFs):\n   - Scalar Functions: Accept parameters and return a single scalar value (e.g. tax calculation or formatting).\n   - Table-Valued Functions: Return virtual parameterized relational result sets that can be joined in queries.\n2. Stored Procedures:\n   - "CREATE PROCEDURE proc_name(IN param1 INT, OUT result NUMERIC) ..."\n   - Executed via "CALL proc_name(...)".\n   - Unlike functions, procedures can manage internal transactions (BEGIN, COMMIT, ROLLBACK).\n3. Triggers (Automated Event Handlers):\n   - Execute automatically BEFORE or AFTER DML events (INSERT, UPDATE, DELETE).\n   - "FOR EACH ROW" provides access to "NEW" (incoming row values) and "OLD" (previous row values).\n   - Essential for automated audit logging, cascading history archives, and strict business invariants.\n4. Architectural Trade-Offs: Stored logic minimizes network round-trips and guarantees database-level integrity, but can complicate version control, unit testing, and cross-engine database migrations.',
      vi: 'Kiến trúc lập trình thủ tục phía máy chủ:\n1. Hàm tự định nghĩa (User-Defined Functions - UDFs):\n   - Hàm vô hướng (Scalar Functions): Nhận tham số và trả về một giá trị duy nhất (như tính thuế, định dạng chuỗi).\n   - Hàm bảng (Table-Valued Functions): Trả về tập kết quả quan hệ có tham số có thể dùng để JOIN trong truy vấn.\n2. Thủ tục lưu trữ (Stored Procedures):\n   - "CREATE PROCEDURE tên_thủ_tục(IN tham_số1 INT, OUT kết_quả NUMERIC) ..."\n   - Thực thi thông qua lệnh "CALL tên_thủ_tục(...)".\n   - Khác với hàm, thủ tục có thể tự quản lý giao dịch nội bộ (BEGIN, COMMIT, ROLLBACK).\n3. Triggers (Bộ xử lý sự kiện tự động):\n   - Tự động chạy BEFORE hoặc AFTER các sự kiện DML (INSERT, UPDATE, DELETE).\n   - "FOR EACH ROW" cung cấp quyền truy cập vào biến giả lập "NEW" (giá trị mới) và "OLD" (giá trị cũ).\n   - Thiết yếu cho việc tự động ghi nhật ký kiểm toán (Audit Trail) và bảo vệ quy tắc bất biến.\n4. Đánh đổi kiến trúc: Logic lưu trên CSDL giảm độ trễ mạng và đảm bảo an toàn tuyệt đối, nhưng khó quản lý mã nguồn (Git), khó viết unit test và dễ bị phụ thuộc vào một hãng CSDL.'
    },
    syntax: `-- Automated Audit Trigger in SQLite / PostgreSQL
CREATE TRIGGER trg_employee_salary_audit
AFTER UPDATE OF salary ON employees
FOR EACH ROW
WHEN OLD.salary <> NEW.salary
BEGIN
  INSERT INTO salary_audit_log (employee_id, old_salary, new_salary, changed_at)
  VALUES (OLD.id, OLD.salary, NEW.salary, CURRENT_TIMESTAMP);
END;

-- Calling a stored procedure in PostgreSQL / MySQL
-- CALL process_monthly_payroll(2026, 8);`,
    examples: [
      {
        title: {
          en: '1. Automated Immutable Audit Trail Trigger',
          vi: '1. Trigger Tự Động Ghi Nhật Ký Kiểm Toán Bất Biến'
        },
        code: `CREATE TRIGGER audit_user_status_change
AFTER UPDATE OF is_active ON users
FOR EACH ROW
BEGIN
  INSERT INTO user_audit_history (user_id, old_status, new_status, updated_at)
  VALUES (OLD.id, OLD.is_active, NEW.is_active, CURRENT_TIMESTAMP);
END;`,
        language: 'sql',
        explanation: {
          en: 'Captures every status modification automatically in an audit history table, capturing exact OLD and NEW values with timestamp.',
          vi: 'Tự động bắt mọi thay đổi trạng thái và ghi vào bảng lịch sử kiểm toán kèm giá trị CŨ, MỚI và dấu thời gian.'
        }
      },
      {
        title: {
          en: '2. Drop Trigger Safely',
          vi: '2. Xóa Trigger An Toàn'
        },
        code: `DROP TRIGGER IF EXISTS trg_employee_salary_audit;`,
        language: 'sql',
        explanation: {
          en: 'Safely removes the trigger definition from the database catalog if no longer needed.',
          vi: 'Xóa định nghĩa trigger khỏi danh mục CSDL một cách an toàn khi không còn nhu cầu sử dụng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Writing complex business logic exclusively in database triggers without application visibility.',
          vi: 'Viết logic nghiệp vụ phức tạp hoàn toàn trong Trigger khiến tầng ứng dụng không thể theo dõi.'
        },
        correction: {
          en: 'Triggers fire invisibly ("magic side-effects"), making bugs difficult to trace and debug. Limit triggers to audit logging, referential integrity guards, and cache invalidations.',
          vi: 'Trigger chạy ngầm ("tác dụng phụ vô hình") khiến việc gỡ lỗi trở nên rất khó khăn. Hãy giới hạn trigger cho việc ghi log kiểm toán và bảo vệ ràng buộc toàn vẹn.'
        }
      },
      {
        mistake: {
          en: 'Accessing NEW values in a DELETE trigger or OLD values in an INSERT trigger.',
          vi: 'Truy cập biến NEW trong trigger DELETE hoặc biến OLD trong trigger INSERT.'
        },
        correction: {
          en: 'In an INSERT trigger, only NEW exists (no old row). In a DELETE trigger, only OLD exists (no incoming row). In an UPDATE trigger, both OLD and NEW are available.',
          vi: 'Trong trigger INSERT chỉ có biến NEW (không có dòng cũ). Trong trigger DELETE chỉ có biến OLD (không có dòng mới). Trong trigger UPDATE có cả OLD và NEW.'
        }
      }
    ],
    tips: [
      {
        en: 'Use BEFORE triggers if you need to validate or sanitize row data and reject invalid mutations before writing to disk.',
        vi: 'Dùng trigger BEFORE nếu bạn cần kiểm tra tính hợp lệ của dữ liệu và từ chối thao tác ghi không hợp lệ trước khi lưu ra đĩa.'
      },
      {
        en: 'Stored procedures reduce network bandwidth by consolidating complex multi-query batch operations into a single remote call.',
        vi: 'Stored procedure giúp tiết kiệm băng thông mạng bằng cách gộp nhiều truy vấn liên tiếp thành một lệnh gọi duy nhất.'
      }
    ],
    practiceStarterCode: `-- Create an audit trigger
CREATE TRIGGER trg_dept_update
AFTER UPDATE ON departments
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, record_id, action)
  VALUES ('departments', NEW.id, 'UPDATE');
END;`
  },
  exercisePool: [
    {
      id: 'sql_ex_proc_1',
      type: 'complete_code',
      title: {
        en: 'Create Audit Trigger on Employee Update',
        vi: 'Tạo Trigger Kiểm Toán Khi Cập Nhật Nhân Viên'
      },
      instruction: {
        en: 'Create an AFTER UPDATE trigger on employees that inserts into audit_log.',
        vi: 'Tạo một trigger AFTER UPDATE trên bảng employees thực hiện chèn bản ghi vào audit_log.'
      },
      starterCode: `CREATE ___ trg_emp_audit
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (emp_id, action) VALUES (NEW.id, 'UPDATE');
END;`,
      solutionCode: `CREATE TRIGGER trg_emp_audit
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  INSERT INTO audit_log (emp_id, action) VALUES (NEW.id, 'UPDATE');
END;`,
      hint: {
        en: 'Type TRIGGER.',
        vi: 'Điền từ TRIGGER.'
      },
      explanation: {
        en: 'CREATE TRIGGER registers the automated event handler callback with the database engine.',
        vi: 'CREATE TRIGGER đăng ký hàm lắng nghe sự kiện tự động với bộ máy CSDL.'
      }
    },
    {
      id: 'sql_ex_proc_2',
      type: 'complete_code',
      title: {
        en: 'Drop Trigger Safely',
        vi: 'Xóa Trigger An Toàn'
      },
      instruction: {
        en: 'Drop the trg_emp_audit trigger if it exists.',
        vi: 'Xóa trigger trg_emp_audit nếu nó đang tồn tại.'
      },
      starterCode: `DROP TRIGGER ___ EXISTS trg_emp_audit;`,
      solutionCode: `DROP TRIGGER IF EXISTS trg_emp_audit;`,
      hint: {
        en: 'Use IF EXISTS.',
        vi: 'Dùng IF EXISTS.'
      },
      explanation: {
        en: 'DROP TRIGGER IF EXISTS guarantees safe cleanup without raising errors.',
        vi: 'DROP TRIGGER IF EXISTS đảm bảo dọn dẹp an toàn mà không báo lỗi.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_stored_procs_triggers',
    title: {
      en: 'Enterprise Product Price Change Auditing & History Trigger Pipeline',
      vi: 'Đường Ống Trigger Kiểm Toán & Lưu Trữ Lịch Sử Giá Sản Phẩm Doanh Nghiệp'
    },
    description: {
      en: 'Write a DDL script that configures an automated price auditing trigger named trg_product_price_audit. The trigger must fire AFTER UPDATE OF unit_price ON products FOR EACH ROW WHEN OLD.unit_price <> NEW.unit_price. Inside the trigger body, insert a record into product_price_history with columns (product_id, old_price, new_price, changed_at) and values (OLD.id, OLD.unit_price, NEW.unit_price, CURRENT_TIMESTAMP).',
      vi: 'Viết script DDL cấu hình một trigger tự động kiểm toán giá có tên trg_product_price_audit. Trigger này phải kích hoạt AFTER UPDATE OF unit_price ON products FOR EACH ROW WHEN OLD.unit_price <> NEW.unit_price. Bên trong thân trigger, chèn một bản ghi vào product_price_history gồm các cột (product_id, old_price, new_price, changed_at) với giá trị (OLD.id, OLD.unit_price, NEW.unit_price, CURRENT_TIMESTAMP).'
    },
    requirements: [
      { en: '1. CREATE TRIGGER trg_product_price_audit', vi: '1. CREATE TRIGGER trg_product_price_audit' },
      { en: '2. AFTER UPDATE OF unit_price ON products FOR EACH ROW', vi: '2. AFTER UPDATE OF unit_price ON products FOR EACH ROW' },
      { en: '3. WHEN OLD.unit_price <> NEW.unit_price', vi: '3. WHEN OLD.unit_price <> NEW.unit_price' },
      { en: '4. INSERT INTO product_price_history (product_id, old_price, new_price, changed_at) VALUES (OLD.id, OLD.unit_price, NEW.unit_price, CURRENT_TIMESTAMP);', vi: '4. INSERT INTO product_price_history (product_id, old_price, new_price, changed_at) VALUES (OLD.id, OLD.unit_price, NEW.unit_price, CURRENT_TIMESTAMP);' }
    ],
    starterCode: `-- Write your automated price change audit trigger
CREATE TRIGGER trg_product_price_audit
AFTER UPDATE ON products
BEGIN
  SELECT 1;
END;`,
    solutionCode: `CREATE TRIGGER trg_product_price_audit
AFTER UPDATE OF unit_price ON products
FOR EACH ROW
WHEN OLD.unit_price <> NEW.unit_price
BEGIN
  INSERT INTO product_price_history (product_id, old_price, new_price, changed_at)
  VALUES (OLD.id, OLD.unit_price, NEW.unit_price, CURRENT_TIMESTAMP);
END;`,
    hints: [
      {
        en: 'Specify AFTER UPDATE OF unit_price ON products FOR EACH ROW WHEN OLD.unit_price <> NEW.unit_price.',
        vi: 'Khai báo chính xác AFTER UPDATE OF unit_price ON products FOR EACH ROW WHEN OLD.unit_price <> NEW.unit_price.'
      }
    ],
    solutionExplanation: {
      en: 'Guarantees that every price modification is captured immutably with zero application overhead.',
      vi: 'Đảm bảo mọi thay đổi về giá đều được ghi lại bất biến mà không tốn công xử lý ở tầng ứng dụng.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_proc_1',
      type: 'single_choice',
      question: {
        en: 'What is the primary difference between a User-Defined Function (UDF) and a Stored Procedure in SQL?',
        vi: 'Sự khác biệt căn bản giữa Hàm Tự Định Nghĩa (UDF) và Thủ Tục Lưu Trữ (Stored Procedure) trong SQL là gì?'
      },
      options: [
        { en: 'Functions must return a value and cannot manage transactions (COMMIT/ROLLBACK), whereas Stored Procedures are invoked via CALL and can orchestrate internal transactions', vi: 'Hàm bắt buộc phải trả về một giá trị và không được quản lý giao dịch (COMMIT/ROLLBACK), trong khi Thủ tục được gọi bằng lệnh CALL và có thể tự quản lý giao dịch nội bộ' },
        { en: 'Functions only work in Excel', vi: 'Hàm chỉ hoạt động trong Excel' },
        { en: 'Stored procedures cannot accept input parameters', vi: 'Thủ tục không thể nhận tham số đầu vào' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Functions are deterministic expressions evaluated in queries; procedures are imperative scripts with transaction controls.',
        vi: 'Hàm là các biểu thức tính toán trong truy vấn; thủ tục là các tập lệnh tuần tự có khả năng quản lý giao dịch.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_proc_2',
      type: 'single_choice',
      question: {
        en: 'What are the NEW and OLD pseudo-record references inside a database trigger?',
        vi: 'Các biến giả lập NEW và OLD bên trong một database trigger đại diện cho điều gì?'
      },
      options: [
        { en: 'OLD represents the original column values before the mutation; NEW represents the incoming proposed column values after the mutation', vi: 'OLD đại diện cho giá trị các cột ban đầu trước khi sửa đổi; NEW đại diện cho giá trị mới được cập nhật hoặc chèn vào' },
        { en: 'OLD is the database version; NEW is the operating system', vi: 'OLD là phiên bản CSDL; NEW là hệ điều hành' },
        { en: 'OLD is a deleted database user; NEW is a newly created user', vi: 'OLD là người dùng đã bị xóa; NEW là người dùng mới tạo' },
        { en: 'They refer to calendar years', vi: 'Chúng đại diện cho các năm lịch' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'OLD holds the pre-mutation snapshot; NEW holds the incoming post-mutation tuple.',
        vi: 'OLD giữ ảnh chụp trước khi sửa; NEW giữ bản ghi mới sau khi sửa đổi.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_proc_3',
      type: 'single_choice',
      question: {
        en: 'Which pseudo-record is available inside a trigger that fires on a DELETE statement?',
        vi: 'Biến giả lập nào có sẵn bên trong một trigger được kích hoạt bởi câu lệnh DELETE?'
      },
      options: [
        { en: 'Only OLD is available (since no new row exists)', vi: 'Chỉ có biến OLD (vì không có dòng mới nào được tạo ra)' },
        { en: 'Only NEW is available', vi: 'Chỉ có biến NEW' },
        { en: 'Both OLD and NEW', vi: 'Có cả OLD và NEW' },
        { en: 'Neither OLD nor NEW', vi: 'Không có biến nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Deleting a record destroys it; hence only the OLD pre-deletion state is accessible.',
        vi: 'Xóa bản ghi thì không còn dòng mới nên chỉ có thể truy cập trạng thái OLD trước khi xóa.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_proc_4',
      type: 'single_choice',
      question: {
        en: 'When should a BEFORE trigger be used instead of an AFTER trigger?',
        vi: 'Khi nào bạn nên sử dụng trigger BEFORE thay vì trigger AFTER?'
      },
      options: [
        { en: 'When you need to validate, sanitize, or transform incoming column values before they are written to disk, or to cancel invalid operations by raising an exception', vi: 'Khi bạn cần kiểm tra tính hợp lệ, làm sạch hoặc biến đổi dữ liệu trước khi ghi xuống đĩa, hoặc hủy bỏ thao tác không hợp lệ bằng cách bắn lỗi' },
        { en: 'When logging history to audit tables', vi: 'Khi ghi lịch sử vào bảng kiểm toán' },
        { en: 'When sending email notifications', vi: 'Khi gửi email thông báo' },
        { en: 'BEFORE triggers are deprecated', vi: 'Trigger BEFORE đã bị khai tử' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'BEFORE triggers inspect and modify NEW values before disk persistence occurs.',
        vi: 'Trigger BEFORE kiểm tra và sửa đổi giá trị NEW trước khi dữ liệu được ghi xuống đĩa.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_proc_5',
      type: 'true_false',
      question: {
        en: 'Stored procedures can help protect applications against SQL Injection when parameterized properly.',
        vi: 'Stored procedure có thể giúp bảo vệ ứng dụng khỏi tấn công SQL Injection khi được truyền tham số đúng cách.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Parameterized stored procedures separate code logic from untrusted user input.',
        vi: 'Đúng. Stored procedure có tham số tách biệt rõ ràng logic mã nguồn khỏi dữ liệu đầu vào người dùng.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_proc_6',
      type: 'single_choice',
      question: {
        en: 'What is a major architectural disadvantage of putting heavy business logic into database stored procedures and triggers?',
        vi: 'Nhược điểm kiến trúc lớn của việc đưa quá nhiều logic nghiệp vụ vào Stored Procedure và Trigger trong CSDL là gì?'
      },
      options: [
        { en: 'It tightly couples business logic to a specific database vendor (vendor lock-in), complicates automated CI/CD unit testing, and makes debugging difficult', vi: 'Nó gắn chặt logic nghiệp vụ vào một hãng CSDL cụ thể (Vendor lock-in), gây khó khăn cho kiểm thử tự động CI/CD và phức tạp hóa việc debug' },
        { en: 'It makes all queries 100x slower', vi: 'Nó làm mọi truy vấn chậm đi 100 lần' },
        { en: 'It deletes all user data', vi: 'Nó xóa toàn bộ dữ liệu người dùng' },
        { en: 'Stored procedures use too much printer ink', vi: 'Stored procedure tốn quá nhiều mực in' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Database procedural logic creates vendor lock-in and fractures testing workflows compared to application-tier code.',
        vi: 'Logic thủ tục trên CSDL gây phụ thuộc nhà cung cấp và khó tích hợp quy trình kiểm thử so với mã nguồn ứng dụng.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_proc_7',
      type: 'single_choice',
      question: {
        en: 'How do you execute a Stored Procedure in standard SQL systems like PostgreSQL and MySQL?',
        vi: 'Làm thế nào để bạn thực thi một Stored Procedure trong các hệ CSDL chuẩn như PostgreSQL và MySQL?'
      },
      options: [
        { en: 'CALL procedure_name(arguments);', vi: 'CALL tên_thủ_tục(các_tham_số);' },
        { en: 'RUN procedure_name;', vi: 'RUN tên_thủ_tục;' },
        { en: 'START procedure_name;', vi: 'START tên_thủ_tục;' },
        { en: 'DO procedure_name;', vi: 'DO tên_thủ_tục;' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The CALL SQL keyword invokes stored procedures with their required argument list.',
        vi: 'Từ khóa CALL trong SQL được dùng để kích hoạt thực thi stored procedure kèm danh sách tham số.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_proc_8',
      type: 'true_false',
      question: {
        en: 'A trigger created with "FOR EACH ROW" executes once for every individual row modified by an UPDATE statement.',
        vi: 'Một trigger được tạo với mệnh đề "FOR EACH ROW" sẽ thực thi một lần cho từng dòng riêng biệt bị tác động bởi lệnh UPDATE.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. "FOR EACH ROW" triggers are row-level event handlers that fire per affected tuple.',
        vi: 'Đúng. Trigger "FOR EACH ROW" là bộ xử lý cấp dòng chạy riêng cho từng bản ghi bị sửa đổi.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_proc_9',
      type: 'multiple_choice',
      question: {
        en: 'Which DML operations can trigger an automated SQL Trigger? (Select all that apply)',
        vi: 'Những thao tác DML nào có thể kích hoạt một SQL Trigger tự động? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'INSERT', vi: 'INSERT' },
        { en: 'UPDATE', vi: 'UPDATE' },
        { en: 'DELETE', vi: 'DELETE' },
        { en: 'SELECT', vi: 'SELECT' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Triggers fire on data mutation events (INSERT, UPDATE, DELETE). Standard SQL does not support triggers on read-only SELECT queries.',
        vi: 'Trigger kích hoạt trên các sự kiện sửa đổi dữ liệu (INSERT, UPDATE, DELETE). SQL chuẩn không hỗ trợ trigger trên câu lệnh đọc SELECT.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_proc_10',
      type: 'single_choice',
      question: {
        en: 'What is a Table-Valued User-Defined Function (TVF)?',
        vi: 'Hàm Tự Định Nghĩa Trả Về Bảng (Table-Valued Function - TVF) là gì?'
      },
      options: [
        { en: 'A custom function that returns an entire relational table (result set) that can be queried and joined in the FROM clause of a SQL query', vi: 'Một hàm tùy chỉnh trả về cả một bảng quan hệ (tập kết quả) có thể được truy vấn và join trực tiếp trong mệnh đề FROM của câu lệnh SQL' },
        { en: 'A function that only accepts furniture tables', vi: 'Một hàm chỉ chấp nhận bàn ghế' },
        { en: 'A function that deletes table headers', vi: 'Một hàm xóa tiêu đề bảng' },
        { en: 'A view that has no columns', vi: 'Một view không có cột nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Table-valued functions act as dynamic parameterized views that return structured table datasets.',
        vi: 'Hàm trả về bảng hoạt động như các khung nhìn có tham số động, trả về tập dữ liệu có cấu trúc.'
      },
      topicId: 'sql_stored_procs_triggers',
      difficulty: 'medium'
    }
  ]
};

export default lesson28;
