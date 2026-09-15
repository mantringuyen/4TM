import { Lesson } from '../../../../types';

export const lesson17: Lesson = {
  id: 'sql_lesson_17',
  moduleId: 'sql_mod_3',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 17,
  topicId: 'sql_ddl_constraints',
  title: {
    en: 'DDL & Constraints: CREATE, ALTER, DROP & Table Integrity',
    vi: 'Định Nghĩa Dữ Liệu (DDL) & Ràng Buộc Toàn Vẹn Bảng'
  },
  summary: {
    en: 'Master Data Definition Language (DDL): designing relational schemas with CREATE TABLE, enforcing relational integrity with PRIMARY KEY, FOREIGN KEY (CASCADE/SET NULL), UNIQUE, NOT NULL, CHECK, DEFAULT, and evolving schemas with ALTER TABLE.',
    vi: 'Làm chủ Ngôn ngữ Định nghĩa Dữ liệu (DDL): thiết kế lược đồ quan hệ với CREATE TABLE, bảo đảm toàn vẹn với PRIMARY KEY, FOREIGN KEY (CASCADE/SET NULL), UNIQUE, NOT NULL, CHECK, DEFAULT và nâng cấp cấu trúc bằng ALTER TABLE.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'While querying reads data, Data Definition Language (DDL) defines the blueprints and invariant rules of the relational database. Relational constraints guarantee data integrity at the database storage engine layer, rejecting invalid or orphaned data before it can corrupt downstream applications.',
      vi: 'Trong khi các câu truy vấn đọc dữ liệu, Ngôn ngữ Định nghĩa Dữ liệu (DDL) thiết lập bản thiết kế và các quy tắc bất biến của CSDL quan hệ. Các ràng buộc toàn vẹn đảm bảo tính chính xác của dữ liệu ngay tại tầng lưu trữ, tự động từ chối dữ liệu rác trước khi ảnh hưởng đến ứng dụng.'
    },
    conceptExplanation: {
      en: 'DDL Commands & Schema Integrity Constraints:\n1. Core DDL Statements:\n   - CREATE TABLE table_name (col definitions, table constraints)\n   - ALTER TABLE table_name ADD COLUMN / DROP COLUMN / RENAME TO\n   - DROP TABLE [IF EXISTS] table_name\n2. Primary Key (PK): Uniquely identifies each row, strictly enforcing non-null uniqueness.\n3. Foreign Key (FK): Establishes relational links across tables with referential integrity rules (ON DELETE CASCADE, ON DELETE SET NULL, ON UPDATE CASCADE).\n4. Column Constraints:\n   - NOT NULL: Prohibits missing/null data.\n   - UNIQUE: Enforces that values across the column/composite columns never repeat.\n   - CHECK (expression): Validates business rules (e.g. CHECK (salary > 0 AND age >= 18)).\n   - DEFAULT value: Supplies an automatic fallback if an INSERT omits the field.',
      vi: 'Các lệnh DDL & Ràng buộc toàn vẹn lược đồ:\n1. Các câu lệnh DDL cốt lõi:\n   - CREATE TABLE tên_bảng (định nghĩa cột, ràng buộc bảng)\n   - ALTER TABLE tên_bảng ADD COLUMN / DROP COLUMN / RENAME TO\n   - DROP TABLE [IF EXISTS] tên_bảng\n2. Khóa chính (Primary Key - PK): Định danh duy nhất cho từng dòng, bắt buộc không được NULL và không được trùng lặp.\n3. Khóa ngoại (Foreign Key - FK): Thiết lập liên kết quan hệ giữa các bảng với các quy tắc toàn vẹn tham chiếu (ON DELETE CASCADE, ON DELETE SET NULL, ON UPDATE CASCADE).\n4. Các ràng buộc cột:\n   - NOT NULL: Cấm dữ liệu bị rỗng/null.\n   - UNIQUE: Đảm bảo giá trị trên một cột hoặc tổ hợp cột không bao giờ bị trùng lặp.\n   - CHECK (biểu_thức): Kiểm tra quy tắc nghiệp vụ (ví dụ: CHECK (salary > 0 AND age >= 18)).\n   - DEFAULT giá_trị: Tự động điền giá trị mặc định nếu lệnh INSERT không truyền dữ liệu.'
    },
    syntax: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  department_id INTEGER,
  salary NUMERIC(10, 2) NOT NULL DEFAULT 40000.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_salary CHECK (salary >= 10000.00),
  CONSTRAINT fk_dept FOREIGN KEY (department_id) 
    REFERENCES departments(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE
);

ALTER TABLE employees ADD COLUMN status VARCHAR(20) DEFAULT 'Active';`,
    examples: [
      {
        title: {
          en: '1. Relational Department-Employee Schema with Cascade Integrity',
          vi: '1. Lược Đồ Quan Hệ Phòng Ban - Nhân Viên Với Toàn Vẹn Tham Chiếu Cascade'
        },
        code: `CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  budget NUMERIC(12, 2) CHECK (budget >= 0)
);

CREATE TABLE staff (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  dept_id INTEGER NOT NULL,
  FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE RESTRICT
);`,
        language: 'sql',
        explanation: {
          en: 'Creates a relational pair where departments enforce non-negative budgets, and staff cannot be orphaned due to ON DELETE RESTRICT.',
          vi: 'Tạo cặp bảng quan hệ trong đó phòng ban bắt buộc ngân sách không âm, và nhân viên không thể bị mồ côi nhờ ON DELETE RESTRICT.'
        }
      },
      {
        title: {
          en: '2. Schema Evolution with ALTER TABLE',
          vi: '2. Nâng Cấp Lược Đồ Với ALTER TABLE'
        },
        code: `ALTER TABLE employees ADD COLUMN phone VARCHAR(20) DEFAULT 'N/A';
ALTER TABLE employees RENAME COLUMN phone TO mobile_phone;`,
        language: 'sql',
        explanation: {
          en: 'Applies zero-downtime schema evolution by adding a new attribute with a safe default, then renaming the column cleanly.',
          vi: 'Nâng cấp cấu trúc bảng bằng cách thêm cột mới kèm giá trị mặc định, sau đó đổi tên cột một cách an toàn.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Creating a foreign key without configuring ON DELETE behavior.',
          vi: 'Tạo khóa ngoại nhưng không cấu hình hành vi ON DELETE.'
        },
        correction: {
          en: 'Without explicit ON DELETE rules, deleting a parent row can cause unexpected foreign key violation errors or orphan rows. Choose ON DELETE CASCADE (for child ownership), SET NULL, or RESTRICT deliberately.',
          vi: 'Nếu không chỉ định rõ ON DELETE, việc xóa dòng cha có thể gây lỗi vi phạm khóa ngoại hoặc để lại bản ghi mồ côi. Hãy chọn rõ ON DELETE CASCADE (xóa theo cha), SET NULL hoặc RESTRICT.'
        }
      },
      {
        mistake: {
          en: 'Executing DROP TABLE without IF EXISTS in migration scripts.',
          vi: 'Thực thi lệnh DROP TABLE mà không dùng IF EXISTS trong các script chuyển đổi dữ liệu.'
        },
        correction: {
          en: 'If the table does not exist, "DROP TABLE tbl;" fails with a fatal error. Use "DROP TABLE IF EXISTS tbl;" for idempotent script execution.',
          vi: 'Nếu bảng chưa tồn tại, lệnh "DROP TABLE tbl;" sẽ báo lỗi nghiêm trọng. Dùng "DROP TABLE IF EXISTS tbl;" để script có thể chạy lại an toàn nhiều lần.'
        }
      }
    ],
    tips: [
      {
        en: 'In SQLite, foreign key constraint enforcement is disabled by default for legacy backwards compatibility. Enable it with "PRAGMA foreign_keys = ON;".',
        vi: 'Trong SQLite, cơ chế bắt buộc khóa ngoại bị tắt mặc định vì tương thích ngược. Hãy bật lên bằng lệnh "PRAGMA foreign_keys = ON;".'
      },
      {
        en: 'CHECK constraints can evaluate compound boolean expressions like "CHECK (end_date >= start_date)".',
        vi: 'Ràng buộc CHECK có thể đánh giá các biểu thức boolean phức hợp như "CHECK (end_date >= start_date)".'
      }
    ],
    practiceStarterCode: `-- Create a simple projects table with constraints
CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  budget REAL CHECK (budget > 0)
);`
  },
  exercisePool: [
    {
      id: 'sql_ex_ddl_1',
      type: 'complete_code',
      title: {
        en: 'Define Primary and Foreign Key Table Constraints',
        vi: 'Định Nghĩa Khóa Chính và Khóa Ngoại Cho Bảng'
      },
      instruction: {
        en: 'Complete the CREATE TABLE statement with a PRIMARY KEY on id and a FOREIGN KEY referencing customers(id).',
        vi: 'Hoàn thiện câu lệnh CREATE TABLE với PRIMARY KEY trên id và FOREIGN KEY tham chiếu đến customers(id).'
      },
      starterCode: `CREATE TABLE orders (
  id INTEGER ___ KEY,
  customer_id INTEGER,
  amount REAL,
  FOREIGN KEY (customer_id) REFERENCES customers(___)
);`,
      solutionCode: `CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  amount REAL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);`,
      hint: {
        en: 'Fill PRIMARY and id.',
        vi: 'Điền PRIMARY và id.'
      },
      explanation: {
        en: 'PRIMARY KEY identifies order rows, and REFERENCES customers(id) links to the customer entity.',
        vi: 'PRIMARY KEY định danh đơn hàng và REFERENCES customers(id) liên kết với thực thể khách hàng.'
      }
    },
    {
      id: 'sql_ex_ddl_2',
      type: 'complete_code',
      title: {
        en: 'Add Column with Default Constraint',
        vi: 'Thêm Cột Kèm Ràng Buộc Mặc Định'
      },
      instruction: {
        en: 'Use ALTER TABLE to add a status column with a default value of \'Active\'.',
        vi: 'Dùng ALTER TABLE để thêm cột status với giá trị mặc định là \'Active\'.'
      },
      starterCode: `ALTER TABLE members ___ COLUMN status TEXT DEFAULT 'Active';`,
      solutionCode: `ALTER TABLE members ADD COLUMN status TEXT DEFAULT 'Active';`,
      hint: {
        en: 'Use ADD COLUMN.',
        vi: 'Dùng ADD COLUMN.'
      },
      explanation: {
        en: 'ALTER TABLE ADD COLUMN appends a new column definition to an existing table schema.',
        vi: 'ALTER TABLE ADD COLUMN bổ sung một định nghĩa cột mới vào lược đồ bảng hiện có.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_ddl_constraints',
    title: {
      en: 'Enterprise Multi-Tier Relational Schema Blueprint',
      vi: 'Thiết Kế Bản Vẽ Lược Đồ Quan Hệ Đa Tầng Doanh Nghiệp'
    },
    description: {
      en: 'Write the complete DDL to create two relational tables: 1. categories (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, is_active INTEGER NOT NULL DEFAULT 1). 2. products (id INTEGER PRIMARY KEY, category_id INTEGER NOT NULL, sku TEXT NOT NULL UNIQUE, unit_price REAL NOT NULL CHECK (unit_price > 0), stock_qty INTEGER NOT NULL DEFAULT 0 CHECK (stock_qty >= 0), FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE).',
      vi: 'Viết toàn bộ mã DDL để tạo 2 bảng quan hệ: 1. categories (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, is_active INTEGER NOT NULL DEFAULT 1). 2. products (id INTEGER PRIMARY KEY, category_id INTEGER NOT NULL, sku TEXT NOT NULL UNIQUE, unit_price REAL NOT NULL CHECK (unit_price > 0), stock_qty INTEGER NOT NULL DEFAULT 0 CHECK (stock_qty >= 0), FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE).'
    },
    requirements: [
      { en: '1. categories table with PK, UNIQUE name, and DEFAULT 1 for is_active', vi: '1. Bảng categories có PK, name UNIQUE và DEFAULT 1 cho is_active' },
      { en: '2. products table with PK, UNIQUE sku, CHECK (unit_price > 0), CHECK (stock_qty >= 0)', vi: '2. Bảng products có PK, sku UNIQUE, CHECK (unit_price > 0), CHECK (stock_qty >= 0)' },
      { en: '3. FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE', vi: '3. Khóa ngoại FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE' }
    ],
    starterCode: `-- Write your complete DDL schema definition
CREATE TABLE categories (
  id INTEGER PRIMARY KEY
);`,
    solutionCode: `CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  category_id INTEGER NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  unit_price REAL NOT NULL CHECK (unit_price > 0),
  stock_qty INTEGER NOT NULL DEFAULT 0 CHECK (stock_qty >= 0),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);`,
    hints: [
      {
        en: 'Define the parent categories table first, then define the child products table with the ON DELETE CASCADE foreign key constraint.',
        vi: 'Định nghĩa bảng cha categories trước, sau đó định nghĩa bảng con products kèm khóa ngoại ON DELETE CASCADE.'
      }
    ],
    solutionExplanation: {
      en: 'Creates a fully hardened relational data model with domain integrity checks, uniqueness constraints, safe defaults, and cascade cleanup.',
      vi: 'Tạo mô hình dữ liệu quan hệ hoàn chỉnh với các kiểm tra miền giá trị, ràng buộc duy nhất, giá trị mặc định an toàn và tự động dọn dẹp theo tầng cascade.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_ddl_1',
      type: 'single_choice',
      question: {
        en: 'What does DDL stand for in SQL database systems?',
        vi: 'DDL là viết tắt của cụm từ gì trong các hệ thống CSDL SQL?'
      },
      options: [
        { en: 'Data Definition Language (CREATE, ALTER, DROP, TRUNCATE)', vi: 'Data Definition Language - Ngôn ngữ Định nghĩa Dữ liệu (CREATE, ALTER, DROP, TRUNCATE)' },
        { en: 'Dynamic Data Logic', vi: 'Dynamic Data Logic' },
        { en: 'Database Directory Link', vi: 'Database Directory Link' },
        { en: 'Direct Data Loading', vi: 'Direct Data Loading' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DDL encompasses the family of SQL statements used to construct, modify, and drop schema objects.',
        vi: 'DDL bao gồm nhóm các câu lệnh SQL dùng để tạo lập, thay đổi cấu trúc và xóa bỏ các đối tượng lược đồ.'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ddl_2',
      type: 'single_choice',
      question: {
        en: 'What are the two core properties enforced by a PRIMARY KEY constraint?',
        vi: 'Hai đặc tính cốt lõi mà ràng buộc PRIMARY KEY bắt buộc phải có là gì?'
      },
      options: [
        { en: 'Uniqueness (no duplicate values) and NOT NULL (no missing values)', vi: 'Tính duy nhất (không trùng lặp) và NOT NULL (không được rỗng)' },
        { en: 'Encryption and Compression', vi: 'Mã hóa và Nén' },
        { en: 'Foreign link and Cascade delete', vi: 'Liên kết ngoài và Xóa theo tầng' },
        { en: 'Auto-increment and JSON parsing', vi: 'Tự động tăng và Đọc định dạng JSON' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A primary key is mathematically defined as a non-null, uniquely indexed record identifier.',
        vi: 'Khóa chính được định nghĩa toán học là một định danh bản ghi không được null và có chỉ mục duy nhất.'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ddl_3',
      type: 'single_choice',
      question: {
        en: 'What does the "ON DELETE CASCADE" clause on a FOREIGN KEY do when a parent row is deleted?',
        vi: 'Mệnh đề "ON DELETE CASCADE" trên KHÓA NGOẠI sẽ làm gì khi một dòng ở bảng cha bị xóa?'
      },
      options: [
        { en: 'It automatically deletes all matching child rows in the referencing table', vi: 'Nó tự động xóa toàn bộ các dòng con tương ứng ở bảng tham chiếu' },
        { en: 'It sets all child columns to NULL', vi: 'Nó đặt toàn bộ các cột của bảng con thành NULL' },
        { en: 'It blocks the deletion and raises an error', vi: 'Nó chặn việc xóa và ném ra lỗi' },
        { en: 'It moves the parent row to an archive database', vi: 'Nó di chuyển dòng cha sang một CSDL lưu trữ' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ON DELETE CASCADE cascades the deletion down through all dependent child entities.',
        vi: 'ON DELETE CASCADE lan truyền việc xóa xuống tất cả các thực thể con phụ thuộc liên quan.'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_ddl_4',
      type: 'true_false',
      question: {
        en: 'A single database table can have multiple UNIQUE constraints, but only ONE Primary Key.',
        vi: 'Một bảng CSDL có thể có nhiều ràng buộc UNIQUE, nhưng chỉ có DUY NHẤT một Khóa chính (Primary Key).'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. A table can define multiple alternate candidate keys with UNIQUE, but exactly one PRIMARY KEY.',
        vi: 'Đúng. Một bảng có thể có nhiều khóa ứng viên thay thế với UNIQUE, nhưng chỉ có đúng một PRIMARY KEY.'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ddl_5',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of a CHECK constraint (e.g. CHECK (price >= 0))?',
        vi: 'Mục đích của ràng buộc CHECK (ví dụ: CHECK (price >= 0)) là gì?'
      },
      options: [
        { en: 'It enforces domain validation rules, rejecting any INSERT or UPDATE that violates the boolean expression', vi: 'Nó bắt buộc các quy tắc xác thực miền giá trị, từ chối mọi lệnh INSERT hoặc UPDATE vi phạm biểu thức boolean' },
        { en: 'It checks if the database server has enough RAM', vi: 'Nó kiểm tra xem máy chủ CSDL có đủ RAM không' },
        { en: 'It checks user login passwords', vi: 'Nó kiểm tra mật khẩu đăng nhập của người dùng' },
        { en: 'It generates a weekly integrity report', vi: 'Nó tạo ra báo cáo toàn vẹn hàng tuần' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CHECK constraints ensure that column values satisfy specific business logic and numerical boundaries.',
        vi: 'Ràng buộc CHECK đảm bảo giá trị cột luôn thỏa mãn các quy tắc nghiệp vụ và giới hạn số học cụ thể.'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ddl_6',
      type: 'single_choice',
      question: {
        en: 'What does the DEFAULT constraint do?',
        vi: 'Ràng buộc DEFAULT có tác dụng gì?'
      },
      options: [
        { en: 'It provides a predefined value for a column if an INSERT statement does not explicitly provide one', vi: 'Nó cung cấp một giá trị xác định trước cho cột nếu câu lệnh INSERT không truyền dữ liệu cho cột đó' },
        { en: 'It resets the database to factory settings', vi: 'Nó khôi phục CSDL về cài đặt gốc của nhà sản xuất' },
        { en: 'It makes all columns readable by any guest user', vi: 'Nó cho phép mọi người dùng khách đều đọc được cột' },
        { en: 'It sets the primary key to 0', vi: 'Nó đặt khóa chính bằng 0' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DEFAULT specifies an automatic fallback literal or function (such as CURRENT_TIMESTAMP).',
        vi: 'DEFAULT chỉ định giá trị hoặc hàm tự động điền sẵn (như CURRENT_TIMESTAMP) khi bị thiếu dữ liệu chèn.'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ddl_7',
      type: 'single_choice',
      question: {
        en: 'Which SQL command is used to add a new column to an existing table without recreating it?',
        vi: 'Lệnh SQL nào được dùng để thêm một cột mới vào bảng hiện có mà không cần tạo lại bảng?'
      },
      options: [
        { en: 'ALTER TABLE table_name ADD COLUMN column_name data_type;', vi: 'ALTER TABLE tên_bảng ADD COLUMN tên_cột kiểu_dữ_liệu;' },
        { en: 'UPDATE TABLE table_name ADD column_name;', vi: 'UPDATE TABLE tên_bảng ADD tên_cột;' },
        { en: 'INSERT INTO table_name COLUMN column_name;', vi: 'INSERT INTO tên_bảng COLUMN tên_cột;' },
        { en: 'EXTEND TABLE table_name WITH column_name;', vi: 'EXTEND TABLE tên_bảng WITH tên_cột;' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ALTER TABLE ... ADD COLUMN is the standard DDL command for schema alterations.',
        vi: 'ALTER TABLE ... ADD COLUMN là lệnh DDL chuẩn để thay đổi cấu trúc bảng.'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ddl_8',
      type: 'true_false',
      question: {
        en: 'Using "DROP TABLE IF EXISTS table_name;" prevents the script from failing if the table is already deleted or does not exist.',
        vi: 'Sử dụng "DROP TABLE IF EXISTS tên_bảng;" giúp script không bị dừng lỗi nếu bảng đã bị xóa trước đó hoặc chưa từng tồn tại.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. IF EXISTS provides idempotency for database setup and teardown scripts.',
        vi: 'Đúng. Mệnh đề IF EXISTS giúp script an toàn khi chạy lại nhiều lần (tính bất biến).'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ddl_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid table integrity constraints in ANSI SQL? (Select all that apply)',
        vi: 'Những ràng buộc nào sau đây là ràng buộc toàn vẹn bảng hợp lệ trong ANSI SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'PRIMARY KEY', vi: 'PRIMARY KEY' },
        { en: 'FOREIGN KEY ... REFERENCES', vi: 'FOREIGN KEY ... REFERENCES' },
        { en: 'UNIQUE', vi: 'UNIQUE' },
        { en: 'CHECK and NOT NULL', vi: 'CHECK và NOT NULL' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'All of these are standard ANSI SQL relational integrity constraints.',
        vi: 'Tất cả các ràng buộc trên đều là ràng buộc toàn vẹn quan hệ chuẩn ANSI SQL.'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_ddl_10',
      type: 'single_choice',
      question: {
        en: 'What happens if you attempt to insert a record that violates a CHECK constraint (e.g. inserting salary = -500 into a table with CHECK (salary > 0))?',
        vi: 'Điều gì xảy ra nếu bạn cố tình chèn một bản ghi vi phạm ràng buộc CHECK (ví dụ: chèn salary = -500 vào bảng có CHECK (salary > 0))?'
      },
      options: [
        { en: 'The database engine immediately rejects the transaction and throws a constraint violation error', vi: 'Trình quản trị CSDL từ chối giao dịch ngay lập tức và ném ra lỗi vi phạm ràng buộc' },
        { en: 'The database silently converts the salary to 0', vi: 'CSDL tự động chuyển salary về số 0 trong im lặng' },
        { en: 'The row is inserted into a temporary trash bin table', vi: 'Dòng đó được đưa vào một bảng thùng rác tạm thời' },
        { en: 'The database shuts down', vi: 'CSDL tự tắt' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Integrity constraints are hard barriers; any violation results in an immediate rollback/error of the offending statement.',
        vi: 'Các ràng buộc toàn vẹn là rào cản nghiêm ngặt; bất kỳ sự vi phạm nào đều bị hủy lệnh và báo lỗi ngay lập tức.'
      },
      topicId: 'sql_ddl_constraints',
      difficulty: 'easy'
    }
  ]
};

export default lesson17;
