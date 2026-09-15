import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

export const sqlBasicLessons: Lesson[] = [
  // =========================================================================
  // LESSON 1: SQL Architecture, Relational Model & Basic SELECT
  // =========================================================================
  {
    id: 'sql_lesson_1',
    moduleId: 'sql_mod_1',
    levelId: 'basic',
    courseId: 'sql',
    order: 1,
    topicId: 'sql_select',
    title: {
      en: 'SQL Architecture, Relational Model & Basic SELECT',
      vi: 'Kiến Trúc SQL, Mô Hình Quan Hệ & Lệnh SELECT Cơ Bản'
    },
    summary: {
      en: 'Understand RDBMS tables, rows, and columns, and master data retrieval with SELECT, column aliasing with AS, arithmetic calculations, and DISTINCT deduplication.',
      vi: 'Hiểu cấu trúc bảng, dòng, cột trong RDBMS và làm chủ trích xuất dữ liệu với SELECT, đặt bí danh với AS, biểu thức tính toán và loại trừ trùng lặp bằng DISTINCT.'
    },
    estimatedMinutes: 15,
    learn: {
      introduction: {
        en: 'SQL (Structured Query Language) is the declarative language used to communicate with Relational Database Management Systems (RDBMS) such as SQLite, PostgreSQL, and MySQL. Unlike procedural programming, in SQL you describe WHAT data you want, rather than HOW to retrieve it step-by-step.',
        vi: 'SQL (Structured Query Language) là ngôn ngữ khai báo tiêu chuẩn để giao tiếp với các hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) như SQLite, PostgreSQL và MySQL. Khác với lập trình tuần tự, trong SQL bạn mô tả DỮ LIỆU BẠN CẦN thay vì cách thức từng bước để lấy dữ liệu.'
      },
      conceptExplanation: {
        en: 'A relational database stores data in two-dimensional tables consisting of rows (records) and columns (attributes). The SELECT statement specifies which columns to retrieve, and the FROM clause specifies the source table. Use column aliases (AS) to rename projected outputs, perform on-the-fly arithmetic computations (e.g. price * 1.1), and apply DISTINCT to eliminate duplicate result rows.',
        vi: 'Cơ sở dữ liệu quan hệ lưu trữ dữ liệu trong các bảng hai chiều gồm các dòng (bản ghi) và các cột (thuộc tính). Câu lệnh SELECT xác định các cột cần lấy, và mệnh đề FROM chỉ định bảng nguồn. Sử dụng bí danh cột (AS) để đổi tên cột đầu ra, thực hiện các phép tính số học trực tiếp (ví dụ: price * 1.1) và dùng DISTINCT để loại bỏ các dòng trùng lặp.'
      },
      syntax: `SELECT [DISTINCT] column1, column2, (expression) AS alias_name
FROM table_name;`,
      examples: [
        {
          title: {
            en: '1. Retrieving Specific Columns and Aliasing',
            vi: '1. Trích Xuất Cột Cụ Thể và Đặt Bí Danh'
          },
          code: `SELECT name, course, score, (score * 1.05) AS adjusted_score
FROM students;`,
          language: 'sql',
          explanation: {
            en: 'Extracts student name, enrolled course, current score, and computes a 5% adjusted bonus score with a descriptive column alias.',
            vi: 'Trích xuất tên học viên, khóa học, điểm hiện tại và tính toán điểm cộng thêm 5% với bí danh cột rõ ràng.'
          }
        },
        {
          title: {
            en: '2. Eliminating Duplicate Values with DISTINCT',
            vi: '2. Loại Bỏ Dữ Liệu Trùng Lặp Với DISTINCT'
          },
          code: `SELECT DISTINCT course, city
FROM students;`,
          language: 'sql',
          explanation: {
            en: 'Returns each unique combination of course and city present across the student body.',
            vi: 'Trả về từng cặp giá trị duy nhất giữa khóa học và thành phố của các học viên.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Overusing SELECT * in production queries',
            vi: 'Lạm dụng SELECT * trong các truy vấn thực tế'
          },
          correction: {
            en: 'SELECT * fetches all table columns, which causes unnecessary disk I/O, network latency, and memory bloat. Explicitly list only the required columns.',
            vi: 'SELECT * lấy tất cả các cột của bảng, gây lãng phí I/O ổ đĩa, tăng băng thông mạng và tốn bộ nhớ. Luôn liệt kê rõ ràng các cột cần thiết.'
          },
          code: `-- BAD: SELECT * FROM students;
-- GOOD:
SELECT id, name, score FROM students;`
        },
        {
          mistake: {
            en: 'Misspelling SQL keywords like FORM instead of FROM',
            vi: 'Gõ sai chính tả từ khóa SQL như viết FORM thay vì FROM'
          },
          correction: {
            en: 'SQL syntax is strictly parsed. Ensure FROM precedes the source table.',
            vi: 'Cú pháp SQL được kiểm tra nghiêm ngặt. Đảm bảo từ khóa FROM luôn đứng trước tên bảng nguồn.'
          },
          code: `-- ERROR: SELECT name FORM students;
SELECT name FROM students;`
        }
      ],
      tips: [
        {
          en: 'SQL keywords are case-insensitive (select vs SELECT), but writing SQL keywords in UPPERCASE and table/column names in snake_case is the industry standard for readability.',
          vi: 'Từ khóa SQL không phân biệt chữ hoa chữ thường, nhưng viết từ khóa IN HOA và tên cột/bảng dạng snake_case là chuẩn công nghiệp giúp mã nguồn dễ đọc.'
        },
        {
          en: 'Column aliases defined with AS cannot be referenced in the WHERE clause of the same query block because WHERE is executed before SELECT.',
          vi: 'Bí danh cột tạo bởi AS không thể sử dụng trực tiếp trong mệnh đề WHERE của cùng một câu truy vấn vì WHERE được thực thi trước SELECT.'
        }
      ],
      practiceStarterCode: `-- Practice: Select student name and calculate score + 5 as bonus_score
SELECT name, score, (score + 5) AS bonus_score FROM students;`,
      practice: {
        task: {
          en: 'Retrieve distinct courses offered to students with the alias course_title.',
          vi: 'Lấy danh sách các khóa học duy nhất từ bảng students với bí danh course_title.'
        },
        starterCode: `-- Write your query here
SELECT course FROM students;`,
        solutionCode: `SELECT DISTINCT course AS course_title FROM students;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_1_1',
        type: 'fix_code',
        title: {
          en: 'Fix FROM Keyword Typo',
          vi: 'Sửa Lỗi Chính Tả Từ Khóa FROM'
        },
        instruction: {
          en: 'Fix the syntax error where the query uses FORM instead of FROM.',
          vi: 'Sửa lỗi cú pháp khi câu lệnh sử dụng FORM thay vì FROM.'
        },
        starterCode: 'SELECT name, score FORM students;',
        solutionCode: 'SELECT name, score FROM students;',
        hint: {
          en: 'Change FORM to FROM.',
          vi: 'Đổi FORM thành FROM.'
        },
        explanation: {
          en: 'FROM is the mandatory SQL clause defining the source table.',
          vi: 'FROM là mệnh đề bắt buộc trong SQL xác định bảng nguồn.'
        }
      },
      {
        id: 'sql_ex_1_2',
        type: 'complete_code',
        title: {
          en: 'Add Column Aliasing with AS',
          vi: 'Thêm Bí Danh Cột Bằng Từ Khóa AS'
        },
        instruction: {
          en: 'Alias the customer_name column as customer and amount as total_usd in the orders query.',
          vi: 'Đặt bí danh cho cột customer_name thành customer và amount thành total_usd trong truy vấn bảng orders.'
        },
        starterCode: 'SELECT customer_name, amount FROM orders;',
        solutionCode: 'SELECT customer_name AS customer, amount AS total_usd FROM orders;',
        hint: {
          en: 'Add AS customer after customer_name and AS total_usd after amount.',
          vi: 'Thêm AS customer sau customer_name và AS total_usd sau amount.'
        },
        explanation: {
          en: 'The AS keyword assigns human-readable names to projected result columns.',
          vi: 'Từ khóa AS gán tên dễ hiểu cho các cột trong tập kết quả.'
        }
      },
      {
        id: 'sql_ex_1_3',
        type: 'write_code',
        title: {
          en: 'Query Unique Cities with DISTINCT',
          vi: 'Truy Vấn Danh Sách Thành Phố Duy Nhất Với DISTINCT'
        },
        instruction: {
          en: 'Write a query to retrieve all unique city values from the students table.',
          vi: 'Viết câu truy vấn để lấy tất cả các giá trị city duy nhất từ bảng students.'
        },
        starterCode: '-- Select distinct cities\n',
        solutionCode: 'SELECT DISTINCT city FROM students;',
        hint: {
          en: 'Use SELECT DISTINCT city FROM students;',
          vi: 'Sử dụng SELECT DISTINCT city FROM students;'
        },
        explanation: {
          en: 'DISTINCT deduplicates rows across the selected projection attributes.',
          vi: 'DISTINCT loại bỏ tất cả các dòng trùng lặp trong các cột được chọn.'
        }
      },
      {
        id: 'sql_ex_1_4',
        type: 'modify_example',
        title: {
          en: 'Compute Projected Percentage Score',
          vi: 'Tính Toán Điểm Phần Trăm Dự Phóng'
        },
        instruction: {
          en: 'Select name, score, and calculate (score * 1.0) / 100.0 aliased as score_pct from students.',
          vi: 'Chọn name, score và tính toán (score * 1.0) / 100.0 với bí danh score_pct từ bảng students.'
        },
        starterCode: 'SELECT name, score FROM students;',
        solutionCode: 'SELECT name, score, (score * 1.0) / 100.0 AS score_pct FROM students;',
        hint: {
          en: 'Include (score * 1.0) / 100.0 AS score_pct in the column list.',
          vi: 'Thêm (score * 1.0) / 100.0 AS score_pct vào danh sách cột.'
        },
        explanation: {
          en: 'SQL allows scalar mathematical operations inside SELECT projections.',
          vi: 'SQL cho phép thực hiện các phép toán số học trực tiếp trong mệnh đề SELECT.'
        }
      },
      {
        id: 'sql_ex_1_5',
        type: 'predict_output',
        title: {
          en: 'Predict DISTINCT Query Behavior',
          vi: 'Dự Đoán Kết Quả Truy Vấn DISTINCT'
        },
        instruction: {
          en: 'If students has 8 rows with courses: Python, SQL, Python, JavaScript, SQL, JavaScript, Python, SQL, how many rows will SELECT DISTINCT course FROM students return?',
          vi: 'Nếu bảng students có 8 dòng với các khóa: Python, SQL, Python, JavaScript, SQL, JavaScript, Python, SQL, câu lệnh SELECT DISTINCT course FROM students sẽ trả về bao nhiêu dòng?'
        },
        starterCode: '-- Enter number of unique courses\n',
        solutionCode: 'SELECT DISTINCT course FROM students;',
        options: ['8', '3', '2', '1'],
        correctOptionIndex: 1,
        hint: {
          en: 'Count unique course names: Python, SQL, JavaScript.',
          vi: 'Đếm các tên khóa học duy nhất: Python, SQL, JavaScript.'
        },
        explanation: {
          en: 'There are exactly 3 distinct courses: Python, SQL, and JavaScript.',
          vi: 'Có chính xác 3 khóa học riêng biệt: Python, SQL và JavaScript.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_1',
      title: {
        en: 'Student Directory & Score Percentage Report',
        vi: 'Báo Cáo Danh Mục Sinh Viên & Điểm Tỷ Lệ'
      },
      description: {
        en: 'Write a SQL query that retrieves each student\'s name, course, city, and computes their score scaled to a 10-point scale ((score * 1.0) / 10.0) with the alias scale_10.',
        vi: 'Viết câu lệnh SQL trích xuất name, course, city của từng sinh viên và tính điểm quy đổi sang thang điểm 10 ((score * 1.0) / 10.0) với bí danh scale_10.'
      },
      requirements: [
        {
          en: 'Select name, course, and city columns from students table',
          vi: 'Chọn các cột name, course và city từ bảng students'
        },
        {
          en: 'Compute (score * 1.0) / 10.0 aliased as scale_10',
          vi: 'Tính toán (score * 1.0) / 10.0 với bí danh là scale_10'
        },
        {
          en: 'Format query cleanly with proper uppercase SQL keywords',
          vi: 'Định dạng câu lệnh rõ ràng với từ khóa SQL viết hoa'
        }
      ],
      starterCode: `-- Write your SQL query below
SELECT name, course, city
FROM students;`,
      solutionCode: `SELECT name, course, city, (score * 1.0) / 10.0 AS scale_10 FROM students;`,
      hints: [
        {
          en: 'Add , (score * 1.0) / 10.0 AS scale_10 after city.',
          vi: 'Thêm , (score * 1.0) / 10.0 AS scale_10 sau cột city.'
        },
        {
          en: 'Make sure the table name is students.',
          vi: 'Đảm bảo tên bảng là students.'
        }
      ],
      solutionExplanation: {
        en: 'The query selects the identity columns and projects a derived arithmetic column scale_10 for each row in the students table.',
        vi: 'Truy vấn chọn các cột định danh và trích xuất cột tính toán scale_10 cho từng hàng trong bảng students.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_1_v1',
        title: {
          en: 'Student Directory & Score Percentage Report',
          vi: 'Báo Cáo Danh Mục Sinh Viên & Điểm Tỷ Lệ'
        },
        description: {
          en: 'Write a SQL query that retrieves each student\'s name, course, city, and computes their score scaled to a 10-point scale ((score * 1.0) / 10.0) with the alias scale_10.',
          vi: 'Viết câu lệnh SQL trích xuất name, course, city của từng sinh viên và tính điểm quy đổi sang thang điểm 10 ((score * 1.0) / 10.0) với bí danh scale_10.'
        },
        requirements: [
          {
            en: 'Select name, course, and city columns from students table',
            vi: 'Chọn các cột name, course và city từ bảng students'
          },
          {
            en: 'Compute (score * 1.0) / 10.0 aliased as scale_10',
            vi: 'Tính toán (score * 1.0) / 10.0 với bí danh là scale_10'
          }
        ],
        starterCode: `SELECT name, course, city FROM students;`,
        solutionCode: `SELECT name, course, city, (score * 1.0) / 10.0 AS scale_10 FROM students;`,
        hints: [
          {
            en: 'Add (score * 1.0) / 10.0 AS scale_10 to the projection.',
            vi: 'Thêm (score * 1.0) / 10.0 AS scale_10 vào mệnh đề SELECT.'
          }
        ],
        solutionExplanation: {
          en: 'Calculates the 10-point scale representation for all student records.',
          vi: 'Tính toán thang điểm 10 cho toàn bộ hồ sơ sinh viên.'
        }
      },
      {
        id: 'sql_ch_1_v2',
        title: {
          en: 'Employee Compensation Baseline Report',
          vi: 'Báo Cáo Mức Lương Cơ Bản Nhân Viên'
        },
        description: {
          en: 'Retrieve emp_name, dept_id, salary, and calculate monthly compensation as (salary / 12.0) aliased as monthly_salary from employees.',
          vi: 'Trích xuất emp_name, dept_id, salary và tính mức thu nhập hàng tháng (salary / 12.0) với bí danh monthly_salary từ bảng employees.'
        },
        requirements: [
          {
            en: 'Select emp_name, dept_id, salary from employees',
            vi: 'Chọn emp_name, dept_id, salary từ bảng employees'
          },
          {
            en: 'Compute (salary / 12.0) AS monthly_salary',
            vi: 'Tính (salary / 12.0) AS monthly_salary'
          }
        ],
        starterCode: `-- Query employee salaries
SELECT emp_name, salary FROM employees;`,
        solutionCode: `SELECT emp_name, dept_id, salary, (salary / 12.0) AS monthly_salary FROM employees;`,
        hints: [
          {
            en: 'Add dept_id and (salary / 12.0) AS monthly_salary.',
            vi: 'Thêm dept_id và (salary / 12.0) AS monthly_salary.'
          }
        ],
        solutionExplanation: {
          en: 'Calculates derived monthly compensation from annual salary across employee records.',
          vi: 'Tính toán thu nhập tháng từ lương năm trên các bản ghi nhân viên.'
        }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_1_1',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'easy',
        question: {
          en: 'What is the primary role of the SELECT clause in SQL?',
          vi: 'Vai trò chính của mệnh đề SELECT trong SQL là gì?'
        },
        options: [
          { en: 'Specifies the source table for the query', vi: 'Xác định bảng nguồn cho truy vấn' },
          { en: 'Specifies which columns or expressions to retrieve and project', vi: 'Xác định các cột hoặc biểu thức cần trích xuất và hiển thị' },
          { en: 'Deletes existing records from a relational table', vi: 'Xóa các bản ghi hiện có trong bảng' },
          { en: 'Filters the rows based on boolean conditions', vi: 'Lọc các dòng dựa trên điều kiện logic' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'SELECT determines the projected columns and expressions returned by the query.',
          vi: 'SELECT xác định các cột và biểu thức được tính toán trả về trong tập kết quả.'
        }
      },
      {
        id: 'sql_q_1_2',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'easy',
        question: {
          en: 'Which SQL keyword is used to rename a column or calculation in the output table?',
          vi: 'Từ khóa SQL nào được sử dụng để đổi tên một cột hoặc biểu thức tính toán trong kết quả?'
        },
        options: [
          { en: 'RENAME', vi: 'RENAME' },
          { en: 'AS', vi: 'AS' },
          { en: 'TO', vi: 'TO' },
          { en: 'ALIAS', vi: 'ALIAS' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'The AS keyword assigns an alias to a projected column or expression.',
          vi: 'Từ khóa AS gán bí danh cho một cột hoặc biểu thức trích xuất.'
        }
      },
      {
        id: 'sql_q_1_3',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'medium',
        question: {
          en: 'Why is using "SELECT *" considered bad practice in production enterprise systems?',
          vi: 'Tại sao việc dùng "SELECT *" bị coi là thói quen xấu trong các hệ thống doanh nghiệp thực tế?'
        },
        options: [
          { en: 'It is invalid syntax in SQL standard', vi: 'Nó là cú pháp không hợp lệ trong chuẩn SQL' },
          { en: 'It causes unnecessary I/O, network traffic, prevents index-only scans, and breaks code when schemas change', vi: 'Nó gây lãng phí I/O, tăng tải mạng, ngăn index-only scan và dễ lỗi ứng dụng khi bảng thay đổi cấu trúc' },
          { en: 'It automatically deletes missing rows', vi: 'Nó tự động xóa các dòng bị thiếu' },
          { en: 'It limits the result to only 10 rows', vi: 'Nó giới hạn kết quả trả về chỉ có 10 dòng' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'Explicit column selection reduces memory overhead, leverages covering indexes, and ensures schema stability.',
          vi: 'Khai báo rõ cột giúp giảm tải bộ nhớ, tận dụng covering index và đảm bảo độ ổn định khi lược đồ bảng thay đổi.'
        }
      },
      {
        id: 'sql_q_1_4',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'easy',
        question: {
          en: 'What does the DISTINCT keyword do when added after SELECT?',
          vi: 'Từ khóa DISTINCT có tác dụng gì khi được đặt sau SELECT?'
        },
        options: [
          { en: 'Sorts the result in ascending order', vi: 'Sắp xếp kết quả theo thứ tự tăng dần' },
          { en: 'Removes duplicate rows from the projected result set', vi: 'Loại bỏ các dòng trùng lặp khỏi tập kết quả trả về' },
          { en: 'Converts all string values to uppercase', vi: 'Chuyển đổi toàn bộ chuỗi sang chữ in hoa' },
          { en: 'Calculates the sum of numeric columns', vi: 'Tính tổng của các cột kiểu số' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'DISTINCT filters out duplicate combinations across all selected columns.',
          vi: 'DISTINCT lọc bỏ các tổ hợp giá trị trùng lặp trên tất cả các cột được chọn.'
        }
      },
      {
        id: 'sql_q_1_5',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'easy',
        question: {
          en: 'Which clause defines the table from which data is retrieved in a SELECT query?',
          vi: 'Mệnh đề nào xác định bảng nguồn cần trích xuất dữ liệu trong câu lệnh SELECT?'
        },
        options: [
          { en: 'INTO', vi: 'INTO' },
          { en: 'SOURCE', vi: 'SOURCE' },
          { en: 'FROM', vi: 'FROM' },
          { en: 'TABLE', vi: 'TABLE' }
        ],
        correctAnswers: [2],
        explanation: {
          en: 'FROM specifies the target table or dataset.',
          vi: 'FROM chỉ định bảng hoặc tập dữ liệu mục tiêu.'
        }
      },
      {
        id: 'sql_q_1_6',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'medium',
        question: {
          en: 'Given a table with columns (id, first_name, last_name), which query generates a single column "full_name"?',
          vi: 'Cho bảng có các cột (id, first_name, last_name), câu lệnh nào tạo ra một cột duy nhất "full_name"?'
        },
        options: [
          { en: 'SELECT first_name + last_name AS full_name FROM users;', vi: 'SELECT first_name + last_name AS full_name FROM users;' },
          { en: 'SELECT first_name || \' \' || last_name AS full_name FROM users;', vi: 'SELECT first_name || \' \' || last_name AS full_name FROM users;' },
          { en: 'SELECT COMBINE(first_name, last_name) FROM users;', vi: 'SELECT COMBINE(first_name, last_name) FROM users;' },
          { en: 'SELECT MERGE(first_name, last_name) AS full_name FROM users;', vi: 'SELECT MERGE(first_name, last_name) AS full_name FROM users;' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'In SQLite and standard ANSI SQL, the string concatenation operator is ||.',
          vi: 'Trong SQLite và chuẩn ANSI SQL, toán tử nối chuỗi là ký hiệu ||.'
        }
      },
      {
        id: 'sql_q_1_7',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'easy',
        question: {
          en: 'Are SQL keywords such as SELECT, FROM, and WHERE case-sensitive?',
          vi: 'Các từ khóa SQL như SELECT, FROM, WHERE có phân biệt chữ hoa chữ thường không?'
        },
        options: [
          { en: 'Yes, they must always be written in lowercase', vi: 'Có, chúng bắt buộc phải viết chữ thường' },
          { en: 'No, SQL keywords are case-insensitive, but uppercase is conventional', vi: 'Không, từ khóa SQL không phân biệt hoa thường, nhưng viết hoa là quy ước chuẩn' },
          { en: 'Yes, they must always be capitalized with camelCase', vi: 'Có, chúng phải viết theo kiểu camelCase' },
          { en: 'Only in SQLite, but not in PostgreSQL', vi: 'Chỉ phân biệt trong SQLite, không phân biệt trong PostgreSQL' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'SQL keywords are case-insensitive, though convention dictates uppercase for clarity.',
          vi: 'Từ khóa SQL không phân biệt hoa thường, tuy nhiên quy chuẩn công nghiệp khuyên dùng chữ hoa.'
        }
      },
      {
        id: 'sql_q_1_8',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'medium',
        question: {
          en: 'What happens if you use an arithmetic expression like "price * 0.9 AS discounted_price" on a NULL price?',
          vi: 'Điều gì xảy ra khi bạn thực hiện phép tính "price * 0.9 AS discounted_price" trên dòng có price là NULL?'
        },
        options: [
          { en: 'It throws a runtime arithmetic exception', vi: 'Nó báo lỗi ngoại lệ số học khi chạy' },
          { en: 'It evaluates to NULL', vi: 'Nó trả về giá trị NULL' },
          { en: 'It evaluates to 0.0', vi: 'Nó trả về 0.0' },
          { en: 'It skips the row from the output', vi: 'Nó bỏ qua dòng đó khỏi kết quả' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'Any arithmetic operation involving NULL results in NULL due to Three-Valued Logic.',
          vi: 'Bất kỳ phép tính số học nào có sự tham gia của NULL đều trả về NULL theo Three-Valued Logic.'
        }
      },
      {
        id: 'sql_q_1_9',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'easy',
        question: {
          en: 'Which character terminates a standard SQL statement?',
          vi: 'Ký tự nào dùng để kết thúc một câu lệnh SQL tiêu chuẩn?'
        },
        options: [
          { en: 'Semicolon (;)', vi: 'Dấu chấm phẩy (;)' },
          { en: 'Colon (:)', vi: 'Dấu hai chấm (:)' },
          { en: 'Period (.)', vi: 'Dấu chấm (.)' },
          { en: 'Slash (/)', vi: 'Dấu gạch chéo (/)' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'The semicolon (;) marks the end of a SQL statement.',
          vi: 'Dấu chấm phẩy (;) là ký hiệu kết thúc một câu lệnh SQL.'
        }
      },
      {
        id: 'sql_q_1_10',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'medium',
        question: {
          en: 'In relational database terminology, what is a "row" also commonly called?',
          vi: 'Trong thuật ngữ cơ sở dữ liệu quan hệ, một "hàng" (row) còn được gọi là gì?'
        },
        options: [
          { en: 'Attribute', vi: 'Attribute (Thuộc tính)' },
          { en: 'Tuple or Record', vi: 'Tuple hoặc Record (Bản ghi)' },
          { en: 'Schema', vi: 'Schema (Lược đồ)' },
          { en: 'Domain', vi: 'Domain (Miền giá trị)' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'A row in a relational table represents a single record or tuple.',
          vi: 'Một hàng trong bảng quan hệ đại diện cho một bản ghi (record) hoặc bộ giá trị (tuple).'
        }
      },
      {
        id: 'sql_q_1_11',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'hard',
        question: {
          en: 'Can a column alias created in SELECT be referenced directly in the WHERE clause of the SAME query level?',
          vi: 'Một bí danh cột tạo trong SELECT có thể được dùng trực tiếp trong mệnh đề WHERE của CÙNG câu truy vấn đó không?'
        },
        options: [
          { en: 'Yes, anywhere in the query', vi: 'Có, ở bất kỳ vị trí nào trong truy vấn' },
          { en: 'No, because the WHERE clause is logically evaluated before the SELECT clause', vi: 'Không, vì mệnh đề WHERE được xử lý logic trước mệnh đề SELECT' },
          { en: 'Yes, but only if wrapped in quotes', vi: 'Có, nhưng chỉ khi đặt trong dấu ngoặc kép' },
          { en: 'Only for numeric calculations', vi: 'Chỉ áp dụng cho các phép tính số học' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'Logical query processing executes FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. Because WHERE evaluates prior to SELECT, aliases do not exist yet during WHERE evaluation.',
          vi: 'Thứ tự xử lý logic của SQL là FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. Vì WHERE chạy trước SELECT nên bí danh chưa tồn tại khi WHERE lọc dòng.'
        }
      },
      {
        id: 'sql_q_1_12',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'medium',
        question: {
          en: 'If you execute "SELECT DISTINCT dept_id, city FROM employees;", when will two rows be collapsed into one?',
          vi: 'Khi thực hiện "SELECT DISTINCT dept_id, city FROM employees;", khi nào hai dòng sẽ bị gộp thành một?'
        },
        options: [
          { en: 'Only when dept_id matches', vi: 'Chỉ khi dept_id trùng nhau' },
          { en: 'Only when city matches', vi: 'Chỉ khi city trùng nhau' },
          { en: 'When BOTH dept_id AND city are identical in both rows', vi: 'Khi CẢ HAI giá trị dept_id VÀ city đều giống hệt nhau ở cả 2 dòng' },
          { en: 'Whenever any column matches', vi: 'Bất cứ khi nào có một cột trùng nhau' }
        ],
        correctAnswers: [2],
        explanation: {
          en: 'DISTINCT evaluates the entire projection tuple across all listed columns.',
          vi: 'DISTINCT đánh giá toàn bộ bộ giá trị trên tất cả các cột được chỉ định.'
        }
      },
      {
        id: 'sql_q_1_13',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'easy',
        question: {
          en: 'How do you write a single-line comment in SQL?',
          vi: 'Làm thế nào để viết chú thích trên một dòng trong SQL?'
        },
        options: [
          { en: '// This is a comment', vi: '// This is a comment' },
          { en: '# This is a comment', vi: '# This is a comment' },
          { en: '-- This is a comment', vi: '-- This is a comment' },
          { en: '/* This is a comment */ only', vi: 'Chỉ dùng /* This is a comment */' }
        ],
        correctAnswers: [2],
        explanation: {
          en: 'Double hyphens (--) start a single-line comment in standard SQL.',
          vi: 'Hai dấu gạch ngang (--) dùng để bắt đầu một dòng chú thích trong chuẩn SQL.'
        }
      },
      {
        id: 'sql_q_1_14',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'medium',
        question: {
          en: 'What is the result of executing "SELECT 5 * 10;" in SQLite without specifying a FROM clause?',
          vi: 'Kết quả của câu lệnh "SELECT 5 * 10;" trong SQLite khi không có mệnh đề FROM là gì?'
        },
        options: [
          { en: 'Syntax Error: Missing FROM clause', vi: 'Lỗi cú pháp: Thiếu mệnh đề FROM' },
          { en: 'A single row with value 50', vi: 'Một dòng duy nhất chứa giá trị 50' },
          { en: 'NULL', vi: 'NULL' },
          { en: '0', vi: '0' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'SQLite and PostgreSQL support standalone SELECT calculations without a dummy table.',
          vi: 'SQLite và PostgreSQL hỗ trợ tính toán trực tiếp với SELECT mà không bắt buộc có mệnh đề FROM.'
        }
      },
      {
        id: 'sql_q_1_15',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'easy',
        question: {
          en: 'In relational database design, what does an "attribute" correspond to?',
          vi: 'Trong thiết kế cơ sở dữ liệu quan hệ, "thuộc tính" (attribute) tương ứng với thành phần nào?'
        },
        options: [
          { en: 'A table column', vi: 'Một cột (column) của bảng' },
          { en: 'A table row', vi: 'Một hàng (row) của bảng' },
          { en: 'An index file', vi: 'Một tệp chỉ mục' },
          { en: 'A transaction log', vi: 'Một nhật ký giao dịch' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Attributes in the relational model correspond directly to table columns.',
          vi: 'Thuộc tính trong mô hình quan hệ tương ứng trực tiếp với các cột trong bảng.'
        }
      },
      {
        id: 'sql_q_1_16',
        type: 'single_choice',
        topicId: 'sql_select',
        difficulty: 'hard',
        question: {
          en: 'Which of the following creates a valid column alias containing spaces in standard SQL?',
          vi: 'Cách nào sau đây tạo một bí danh cột hợp lệ chứa khoảng trắng trong chuẩn SQL?'
        },
        options: [
          { en: 'SELECT score AS Final Score FROM students;', vi: 'SELECT score AS Final Score FROM students;' },
          { en: 'SELECT score AS "Final Score" FROM students;', vi: 'SELECT score AS "Final Score" FROM students;' },
          { en: 'SELECT score AS [Final Score] FROM students;', vi: 'SELECT score AS [Final Score] FROM students;' },
          { en: 'SELECT score AS \'Final Score\' FROM students;', vi: 'SELECT score AS \'Final Score\' FROM students;' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'Standard SQL uses double quotes (") for delimited identifiers containing spaces or reserved keywords.',
          vi: 'Chuẩn ANSI SQL sử dụng dấu ngoặc kép (") cho các định danh có chứa khoảng trắng hoặc từ khóa đặc biệt.'
        }
      }
    ]
  }
];
