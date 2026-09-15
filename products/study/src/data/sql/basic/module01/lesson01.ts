import { Lesson } from '../../../../types';

export const lesson01: Lesson = {
  id: 'sql_lesson_1',
  moduleId: 'sql_mod_1',
  levelId: 'basic',
  courseId: 'sql',
  order: 1,
  topicId: 'sql_relational_model',
  title: {
    en: 'Relational Model, Tables, Primary Keys & SQL Dialects',
    vi: 'Mô Hình Quan Hệ, Bảng, Khóa Chính & Các Biến Thể SQL'
  },
  summary: {
    en: 'Understand RDBMS tables, rows, columns, primary key uniqueness constraints, and key dialect differences between SQLite, PostgreSQL, MySQL, and SQL Server.',
    vi: 'Hiểu cấu trúc bảng, dòng, cột trong RDBMS, ràng buộc duy nhất của khóa chính và sự khác biệt chính giữa các hệ CSDL SQLite, PostgreSQL, MySQL, SQL Server.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Relational Database Management Systems (RDBMS) organize data into structured two-dimensional tables consisting of rows (tuples) and columns (attributes). In modern software systems—from mobile apps using SQLite to high-scale enterprise backends powered by PostgreSQL—SQL is the universal declarative standard for data management.',
      vi: 'Hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) tổ chức dữ liệu thành các bảng hai chiều gồm các dòng (bản ghi) và các cột (thuộc tính). Trong các hệ thống phần mềm hiện đại—từ ứng dụng di động dùng SQLite đến backend doanh nghiệp quy mô lớn chạy PostgreSQL—SQL là ngôn ngữ khai báo chuẩn mực toàn cầu để quản lý dữ liệu.'
    },
    conceptExplanation: {
      en: 'Key Principles of the Relational Model:\n1. Entities & Tables: An entity (e.g. users, products) is mapped to a table. Each row represents a single entity instance; each column represents an attribute with a defined data type.\n2. Primary Keys (PK): Every table should have a Primary Key—a unique, non-null identifier for each row (such as auto-incrementing integer IDs or UUIDs).\n3. Declarative Nature: SQL is declarative. You specify WHAT data you want, and the database optimizer decides HOW to access it from disk or memory.\n4. SQL Dialects: While ANSI SQL standardizes core syntax, dialects have unique behaviors (e.g. SQLite uses dynamic typing, PostgreSQL offers rich JSON and arrays, MySQL uses backtick identifiers, SQL Server uses T-SQL with TOP instead of LIMIT).',
      vi: 'Các nguyên lý cốt lõi của Mô hình Quan hệ:\n1. Thực thể & Bảng: Mỗi thực thể (ví dụ: người dùng, sản phẩm) được ánh xạ thành một bảng. Mỗi dòng đại diện cho một bản ghi thực thể; mỗi cột đại diện cho một thuộc tính có kiểu dữ liệu cụ thể.\n2. Khóa Chính (Primary Key - PK): Mỗi bảng phải có một Khóa Chính—định danh duy nhất, không được NULL cho mỗi dòng (như số nguyên tự tăng ID hoặc chuỗi UUID).\n3. Tính chất Khai báo: SQL là ngôn ngữ khai báo. Bạn chỉ cần chỉ định dữ liệu BẠN CẦN LẤY, trình tối ưu hóa truy vấn của CSDL sẽ quyết định CÁCH THỰC THI tối ưu nhất.\n4. Các Biến Thể SQL (Dialects): Dù chuẩn ANSI SQL quy định cú pháp chung, mỗi hệ quản trị lại có đặc thù (SQLite định kiểu linh hoạt, PostgreSQL mạnh về JSON và mảng, MySQL dùng dấu backtick, SQL Server dùng TOP thay vì LIMIT).'
    },
    syntax: '-- Conceptual table representation\n-- Table: users (id [PK], username [TEXT], email [TEXT], created_at [TIMESTAMP])\n\n-- Inspecting table schema and data\nSELECT * FROM users;',
    examples: [
      {
        title: {
          en: '1. Exploring Relational Table Structure',
          vi: '1. Khám Phá Cấu Trúc Bảng Quan Hệ'
        },
        code: `SELECT id, name, email, department, salary
FROM employees;`,
        language: 'sql',
        explanation: {
          en: 'Fetches the fundamental attributes of all employee records where id serves as the primary key.',
          vi: 'Trích xuất các thuộc tính cơ bản của tất cả nhân viên trong đó id đóng vai trò là khóa chính duy nhất.'
        }
      },
      {
        title: {
          en: '2. Dialect Differences: Primary Key Auto-Increment',
          vi: '2. Khác Biệt Giữa Các Hệ CSDL: Tự Động Tăng Khóa Chính'
        },
        code: `-- SQLite:   id INTEGER PRIMARY KEY AUTOINCREMENT
-- Postgres: id SERIAL PRIMARY KEY (or GENERATED ALWAYS AS IDENTITY)
-- MySQL:    id INT AUTO_INCREMENT PRIMARY KEY
-- T-SQL:    id INT IDENTITY(1,1) PRIMARY KEY`,
        language: 'sql',
        explanation: {
          en: 'Different database engines use different dialect keywords to define auto-incrementing surrogate primary keys.',
          vi: 'Mỗi hệ CSDL sử dụng các từ khóa khác nhau để định nghĩa khóa chính nhân tạo tự động tăng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Designing a table without a Primary Key constraint.',
          vi: 'Thiết kế bảng mà không có ràng buộc Khóa Chính (Primary Key).'
        },
        correction: {
          en: 'Always declare a Primary Key on every relational table to guarantee unique row addressability and enable index lookups.',
          vi: 'Luôn luôn khai báo Khóa Chính trên mỗi bảng để đảm bảo định danh duy nhất cho từng bản ghi và hỗ trợ tìm kiếm qua chỉ mục.'
        }
      },
      {
        mistake: {
          en: 'Assuming all SQL engines behave identically across dialects.',
          vi: 'Cho rằng mọi hệ thống cơ sở dữ liệu SQL đều có hành vi và cú pháp giống hệt nhau.'
        },
        correction: {
          en: 'Be aware of dialect-specific keywords such as string concatenation (|| in SQLite/Postgres vs CONCAT() in MySQL vs + in SQL Server).',
          vi: 'Lưu ý các cú pháp đặc thù như nối chuỗi (dùng || trong SQLite/Postgres vs CONCAT() trong MySQL vs + trong SQL Server).'
        }
      }
    ],
    tips: [
      {
        en: 'Surrogate Keys (auto-incrementing integer or UUID) are generally preferred over Natural Keys (like email or national ID) because natural values can change over time.',
        vi: 'Khóa nhân tạo (Surrogate Key như số nguyên tự tăng hoặc UUID) thường được ưu tiên hơn Khóa tự nhiên (như email hay CCCD) vì thông tin tự nhiên có thể thay đổi theo thời gian.'
      },
      {
        en: 'SQL is declarative: write clean, expressive queries and let the relational engine optimize physical execution plans.',
        vi: 'SQL là ngôn ngữ mang tính khai báo: hãy viết câu truy vấn rõ ràng, biểu đạt đúng logic và để bộ máy CSDL tối ưu kế hoạch thực thi vật lý.'
      }
    ],
    practiceStarterCode: `-- Inspect the structure of the employees table
SELECT id, name, department, salary FROM employees;`
  },
  exercisePool: [
    {
      id: 'sql_ex_1_1',
      type: 'complete_code',
      title: {
        en: 'Inspect Table Attributes',
        vi: 'Khám Phá Thuộc Tính Bảng'
      },
      instruction: {
        en: 'Write a query to retrieve the id, name, and department columns from the employees table.',
        vi: 'Viết câu truy vấn để lấy các cột id, name và department từ bảng employees.'
      },
      starterCode: 'SELECT ___ FROM employees;',
      solutionCode: 'SELECT id, name, department FROM employees;',
      hint: {
        en: 'List id, name, department separated by commas.',
        vi: 'Liệt kê id, name, department phân tách bằng dấu phẩy.'
      },
      explanation: {
        en: 'SELECT followed by explicit column names projects only the required attributes from the table.',
        vi: 'Mệnh đề SELECT theo sau bởi tên các cột cụ thể sẽ chỉ trích xuất những thuộc tính cần thiết.'
      }
    },
    {
      id: 'sql_ex_1_2',
      type: 'predict_output',
      title: {
        en: 'Primary Key Characteristics',
        vi: 'Đặc Điểm Của Khóa Chính'
      },
      instruction: {
        en: 'Which of the following statements correctly describes a Primary Key in a relational table?',
        vi: 'Khẳng định nào sau đây mô tả đúng nhất về Khóa Chính (Primary Key) trong bảng quan hệ?'
      },
      starterCode: '-- Select the correct property of a primary key',
      solutionCode: 'A Primary Key must be unique for every row and cannot contain NULL values.',
      options: [
        'A Primary Key must be unique for every row and cannot contain NULL values.',
        'A Primary Key can have duplicate values as long as they are numbers.',
        'A table can have multiple Primary Key constraints with different names.',
        'A Primary Key allows NULL values by default.'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'By relational database definition, a primary key enforces both uniqueness and non-nullability (UNIQUE + NOT NULL).',
        vi: 'Theo định nghĩa CSDL quan hệ, khóa chính bắt buộc phải duy nhất và không được phép chứa giá trị NULL (UNIQUE + NOT NULL).'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_1',
    title: {
      en: 'Audit Core Relational Table Attributes',
      vi: 'Kiểm Tra Các Thuộc Tính Bảng Quan Hệ Cốt Lõi'
    },
    description: {
      en: 'Write a SQL query that retrieves all employee attributes including their unique identifier id, name, department, and salary from the employees table.',
      vi: 'Viết câu truy vấn SQL lấy tất cả các thuộc tính của nhân viên gồm mã định danh id, name, department và salary từ bảng employees.'
    },
    requirements: [
      { en: '1. Query the employees table', vi: '1. Truy vấn từ bảng employees' },
      { en: '2. Explicitly project id, name, department, salary', vi: '2. Chỉ định rõ các cột id, name, department, salary' },
      { en: '3. Do not use SELECT * in the final solution', vi: '3. Không dùng SELECT * trong đáp án cuối' }
    ],
    starterCode: `-- Query all core attributes from employees
SELECT id FROM employees;`,
    solutionCode: `SELECT id, name, department, salary FROM employees;`,
    hints: [
      {
        en: 'List all requested column names separated by commas after SELECT.',
        vi: 'Liệt kê tất cả các cột được yêu cầu cách nhau bởi dấu phẩy sau từ khóa SELECT.'
      }
    ],
    solutionExplanation: {
      en: 'Explicit column projection prevents overfetching and adheres to relational database best practices.',
      vi: 'Chỉ định rõ các cột cần lấy giúp tránh lãng phí tài nguyên và tuân thủ chuẩn mực phát triển CSDL quan hệ.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_1_1',
      type: 'single_choice',
      question: {
        en: 'What does RDBMS stand for?',
        vi: 'RDBMS là viết tắt của cụm từ nào?'
      },
      options: [
        { en: 'Relational Database Management System', vi: 'Relational Database Management System (Hệ Quản Trị Cơ Sở Dữ Liệu Quan Hệ)' },
        { en: 'Realtime Data Backup Management Software', vi: 'Realtime Data Backup Management Software' },
        { en: 'Row Database Manipulation Standard', vi: 'Row Database Manipulation Standard' },
        { en: 'Remote Distributed Binary Memory Server', vi: 'Remote Distributed Binary Memory Server' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RDBMS stands for Relational Database Management System, a database software model based on Edgar F. Codd’s relational algebra.',
        vi: 'RDBMS viết tắt của Relational Database Management System, mô hình CSDL dựa trên đại số quan hệ của Edgar F. Codd.'
      },
      topicId: 'sql_relational_model',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_1_2',
      type: 'single_choice',
      question: {
        en: 'What two fundamental constraints are automatically enforced by a PRIMARY KEY?',
        vi: 'Hai ràng buộc cốt lõi nào được tự động thực thi bởi khóa chính PRIMARY KEY?'
      },
      options: [
        { en: 'UNIQUE and NOT NULL', vi: 'UNIQUE (Duy nhất) và NOT NULL (Không được rỗng)' },
        { en: 'FOREIGN KEY and CHECK', vi: 'FOREIGN KEY và CHECK' },
        { en: 'DEFAULT and AUTOINCREMENT', vi: 'DEFAULT và AUTOINCREMENT' },
        { en: 'INDEX and VIEW', vi: 'INDEX và VIEW' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A primary key must uniquely identify each row in a table and cannot contain a NULL value.',
        vi: 'Khóa chính bắt buộc phải định danh duy nhất từng dòng và không bao giờ được chứa giá trị NULL.'
      },
      topicId: 'sql_relational_model',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_1_3',
      type: 'single_choice',
      question: {
        en: 'In the relational model, what is a single horizontal record in a table formally called?',
        vi: 'Trong mô hình quan hệ, một bản ghi hàng ngang trong bảng có tên gọi chính thức là gì?'
      },
      options: [
        { en: 'Tuple (Row / Record)', vi: 'Tuple (Hàng / Bản ghi)' },
        { en: 'Attribute (Column / Field)', vi: 'Attribute (Thuộc tính / Cột)' },
        { en: 'Schema (Lược đồ)', vi: 'Schema (Lược đồ)' },
        { en: 'Relation (Quan hệ)', vi: 'Relation (Quan hệ)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In relational algebra, a row is termed a "tuple", a column is an "attribute", and the whole table is a "relation".',
        vi: 'Trong đại số quan hệ, một hàng được gọi là "tuple", một cột là "attribute", và toàn bộ bảng là "relation".'
      },
      topicId: 'sql_relational_model',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_1_4',
      type: 'true_false',
      question: {
        en: 'SQL is a declarative language, meaning you describe WHAT data you want, not the step-by-step procedural algorithm to fetch it.',
        vi: 'SQL là ngôn ngữ mang tính khai báo (declarative), nghĩa là bạn chỉ định DỮ LIỆU CẦN LẤY chứ không phải thuật toán từng bước để truy xuất nó.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. The database engine’s query optimizer determines the physical execution plan (e.g. index seek vs full table scan).',
        vi: 'Đúng. Trình tối ưu hóa truy vấn của CSDL sẽ tự xác định kế hoạch thực thi vật lý phù hợp nhất.'
      },
      topicId: 'sql_relational_model',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_1_5',
      type: 'single_choice',
      question: {
        en: 'What is a "Surrogate Key" in database design?',
        vi: '"Surrogate Key" (Khóa nhân tạo) trong thiết kế cơ sở dữ liệu là gì?'
      },
      options: [
        { en: 'An artificially generated unique identifier (e.g. auto-incrementing ID or UUID) with no business meaning', vi: 'Một mã định danh duy nhất được hệ thống sinh ra (như ID tự tăng hoặc UUID) không mang ý nghĩa nghiệp vụ' },
        { en: 'A natural key like a user’s phone number or email address', vi: 'Một khóa tự nhiên như số điện thoại hoặc email của người dùng' },
        { en: 'A foreign key that points to a temporary table', vi: 'Một khóa ngoại trỏ tới bảng tạm' },
        { en: 'A key that only exists during daytime backup operations', vi: 'Một khóa chỉ tồn tại trong các hoạt động sao lưu ban ngày' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Surrogate keys are artificial identifiers generated purely for row addressability and stability, decoupling primary keys from changeable business values.',
        vi: 'Surrogate key là khóa nhân tạo do hệ thống tự sinh để đảm bảo tính ổn định và duy nhất, tránh phụ thuộc vào các dữ liệu nghiệp vụ có thể thay đổi.'
      },
      topicId: 'sql_relational_model',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_1_6',
      type: 'single_choice',
      question: {
        en: 'Which SQL dialect uses the keyword TOP (e.g. SELECT TOP 10 * FROM users) instead of the standard LIMIT clause?',
        vi: 'Biến thể SQL nào sử dụng từ khóa TOP (ví dụ: SELECT TOP 10 * FROM users) thay cho mệnh đề chuẩn LIMIT?'
      },
      options: [
        { en: 'Microsoft SQL Server (T-SQL)', vi: 'Microsoft SQL Server (T-SQL)' },
        { en: 'PostgreSQL', vi: 'PostgreSQL' },
        { en: 'SQLite', vi: 'SQLite' },
        { en: 'MySQL', vi: 'MySQL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Microsoft SQL Server (T-SQL) historically uses SELECT TOP n, whereas SQLite, PostgreSQL, and MySQL use LIMIT n at the end of the query.',
        vi: 'Microsoft SQL Server (T-SQL) sử dụng SELECT TOP n, trong khi SQLite, PostgreSQL và MySQL sử dụng LIMIT n ở cuối câu truy vấn.'
      },
      topicId: 'sql_relational_model',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_1_7',
      type: 'true_false',
      question: {
        en: 'A table can have multiple PRIMARY KEY constraints defined on different columns.',
        vi: 'Một bảng có thể có nhiều ràng buộc PRIMARY KEY khác nhau trên các cột riêng biệt.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. A relational table can have at most ONE Primary Key constraint (which may be composite, consisting of multiple columns). Multiple UNIQUE constraints are allowed, but only one PRIMARY KEY.',
        vi: 'Sai. Mỗi bảng chỉ có thể có DUY NHẤT 1 Khóa chính (có thể là khóa phức hợp gồm nhiều cột). Bảng có thể có nhiều ràng buộc UNIQUE, nhưng chỉ có đúng 1 PRIMARY KEY.'
      },
      topicId: 'sql_relational_model',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_1_8',
      type: 'single_choice',
      question: {
        en: 'What is a "Composite Primary Key"?',
        vi: '"Composite Primary Key" (Khóa chính phức hợp) là gì?'
      },
      options: [
        { en: 'A primary key composed of two or more columns whose combination guarantees uniqueness', vi: 'Một khóa chính được kết hợp từ hai hoặc nhiều cột mà sự kết hợp của chúng đảm bảo tính duy nhất' },
        { en: 'A primary key made of JSON data', vi: 'Một khóa chính chứa dữ liệu định dạng JSON' },
        { en: 'A primary key encrypted with RSA algorithms', vi: 'Một khóa chính được mã hóa bằng thuật toán RSA' },
        { en: 'A temporary key stored in Redis memory', vi: 'Một khóa tạm thời lưu trong bộ nhớ Redis' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A composite primary key combines multiple columns (e.g. order_id and product_id in an order_items table) to uniquely identify a record.',
        vi: 'Khóa chính phức hợp kết hợp nhiều cột (ví dụ: order_id và product_id trong bảng order_items) để định danh duy nhất một bản ghi.'
      },
      topicId: 'sql_relational_model',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_1_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid popular Relational Database Management Systems (RDBMS)? (Select all that apply)',
        vi: 'Những hệ thống nào sau đây là Hệ Quản Trị Cơ Sở Dữ Liệu Quan Hệ (RDBMS) phổ biến? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'PostgreSQL', vi: 'PostgreSQL' },
        { en: 'MySQL', vi: 'MySQL' },
        { en: 'SQLite', vi: 'SQLite' },
        { en: 'Microsoft SQL Server', vi: 'Microsoft SQL Server' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'All four (PostgreSQL, MySQL, SQLite, and SQL Server) are leading relational database systems supporting SQL.',
        vi: 'Cả bốn hệ quản trị (PostgreSQL, MySQL, SQLite và SQL Server) đều là các hệ CSDL quan hệ hàng đầu hỗ trợ SQL.'
      },
      topicId: 'sql_relational_model',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_1_10',
      type: 'single_choice',
      question: {
        en: 'Why is it considered bad practice to use SELECT * in production application queries?',
        vi: 'Tại sao việc lạm dụng SELECT * trong các truy vấn ứng dụng thực tế lại là một thói quen xấu?'
      },
      options: [
        { en: 'It retrieves unnecessary columns, increases network I/O, prevents index-only covering scans, and breaks code when schemas change', vi: 'Nó lấy thừa các cột không cần thiết, làm tăng tải băng thông mạng, vô hiệu hóa covering index và dễ gây lỗi khi cấu trúc bảng thay đổi' },
        { en: 'SQL automatically deletes the table after executing SELECT *', vi: 'SQL tự động xóa bảng sau khi chạy lệnh SELECT *' },
        { en: 'SELECT * is illegal in ANSI SQL', vi: 'SELECT * là câu lệnh bất hợp pháp trong chuẩn ANSI SQL' },
        { en: 'SELECT * only returns numbers and ignores strings', vi: 'SELECT * chỉ trả về số và bỏ qua các chuỗi văn bản' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SELECT * wastes network bandwidth, database memory, and CPU cache, and prevents the optimizer from using index-only covering scans.',
        vi: 'SELECT * gây lãng phí băng thông mạng, bộ nhớ RAM và làm mất cơ hội tối ưu hóa quét chỉ mục (covering index scan).'
      },
      topicId: 'sql_relational_model',
      difficulty: 'hard'
    }
  ]
};

export default lesson01;
