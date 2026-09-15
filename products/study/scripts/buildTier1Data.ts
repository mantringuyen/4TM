import fs from 'fs';
import { Lesson } from '../src/types';

export const tier1Lessons: Lesson[] = [
  // LESSON 1
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
        en: 'SQL (Structured Query Language) is the declarative language used to communicate with Relational Database Management Systems (RDBMS) like SQLite, PostgreSQL, and MySQL. You declare WHAT dataset you need, and the database query planner determines HOW to retrieve it.',
        vi: 'SQL (Structured Query Language) là ngôn ngữ khai báo tiêu chuẩn để giao tiếp với các hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) như SQLite, PostgreSQL và MySQL. Bạn chỉ cần mô tả DỮ LIỆU CẦN LẤY, hệ thống sẽ tự tối ưu cách thực thi.'
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
          en: 'SQL keywords are case-insensitive, but writing SQL keywords in UPPERCASE and table/column names in snake_case is the industry standard for readability.',
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
  },

  // LESSON 2: Predicate Filtering: WHERE, Operators & Pattern Matching
  {
    id: 'sql_lesson_2',
    moduleId: 'sql_mod_1',
    levelId: 'basic',
    courseId: 'sql',
    order: 2,
    topicId: 'sql_where',
    title: {
      en: 'Predicate Filtering: WHERE, Logical Operators & Pattern Matching',
      vi: 'Lọc Điều Kiện: WHERE, Toán Tử Logic & Tìm Kiếm Theo Mẫu'
    },
    summary: {
      en: 'Master row filtering with comparison operators, logical AND/OR/NOT precedence, IN membership lists, BETWEEN ranges, and LIKE pattern matching (% and _).',
      vi: 'Làm chủ lọc bản ghi với các toán tử so sánh, thứ tự ưu tiên AND/OR/NOT, danh sách phần tử IN, khoảng giá trị BETWEEN và tìm kiếm chuỗi với LIKE (% và _).'
    },
    estimatedMinutes: 15,
    learn: {
      introduction: {
        en: 'The WHERE clause evaluates a boolean predicate for every row in the source table. Only rows where the predicate evaluates to TRUE are included in the result set.',
        vi: 'Mệnh đề WHERE đánh giá biểu thức điều kiện boolean trên từng dòng của bảng nguồn. Chỉ những dòng có điều kiện đánh giá là TRUE mới được đưa vào kết quả.'
      },
      conceptExplanation: {
        en: 'Comparison operators (=, != or <>, <, <=, >, >=) compare column values against literals. Logical operators (AND, OR, NOT) combine multiple conditions. Crucially, AND has higher precedence than OR, so parentheses () must be used to enforce explicit evaluation order. For ranges, use BETWEEN low AND high (inclusive). For discrete lists, use IN (val1, val2). For string patterns, LIKE uses % (matches zero or more characters) and _ (matches exactly one character).',
        vi: 'Các toán tử so sánh (=, != hoặc <>, <, <=, >, >=) so sánh giá trị cột với hằng số. Toán tử logic (AND, OR, NOT) kết hợp nhiều điều kiện. Quan trọng là AND có độ ưu tiên cao hơn OR, do đó cần dùng ngoặc đơn () để chỉ định thứ tự đánh giá. Với khoảng giá trị, dùng BETWEEN min AND max (bao gồm 2 đầu mút). Với danh sách giá trị, dùng IN (...). Với chuỗi ký tự, LIKE sử dụng % (khớp 0 hoặc nhiều ký tự) và _ (khớp đúng 1 ký tự).'
      },
      syntax: `SELECT column1, column2
FROM table_name
WHERE (condition1 AND condition2)
   OR column_name IN ('val1', 'val2')
   OR column_name LIKE 'prefix%'
   OR column_name BETWEEN 50 AND 100;`,
      examples: [
        {
          title: {
            en: '1. Logical Operator Precedence with Parentheses',
            vi: '1. Thứ Tự Ưu Tiên Toán Tử Logic Với Ngoặc Đơn'
          },
          code: `SELECT name, course, score, city
FROM students
WHERE (course = 'Python' OR course = 'SQL')
  AND score >= 85;`,
          language: 'sql',
          explanation: {
            en: 'Evaluates students enrolled in Python or SQL who simultaneously scored 85 or above.',
            vi: 'Lọc các học viên học môn Python hoặc SQL đồng thời đạt điểm từ 85 trở lên.'
          }
        },
        {
          title: {
            en: '2. Pattern Matching with LIKE & Ranges with BETWEEN',
            vi: '2. Tìm Kiếm Mẫu Với LIKE & Khoảng Giá Trị Với BETWEEN'
          },
          code: `SELECT id, name, email, score
FROM students
WHERE email LIKE '%@example.com'
  AND score BETWEEN 80 AND 95;`,
          language: 'sql',
          explanation: {
            en: 'Finds students whose email ends with @example.com and whose score is between 80 and 95 (inclusive).',
            vi: 'Tìm học viên có email kết thúc bằng @example.com và điểm nằm trong đoạn từ 80 đến 95.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Forgetting parentheses when combining AND with OR',
            vi: 'Quên đóng mở ngoặc đơn khi kết hợp toán tử AND và OR'
          },
          correction: {
            en: 'Because AND binds tighter than OR, "WHERE A OR B AND C" is parsed as "A OR (B AND C)", which often leaks unintended rows.',
            vi: 'Vì AND có độ ưu tiên cao hơn OR, "WHERE A OR B AND C" sẽ được hiểu là "A OR (B AND C)", làm lọt các dòng không mong muốn.'
          },
          code: `-- BUGGY: course = 'Python' OR course = 'SQL' AND score > 90
-- CORRECT:
WHERE (course = 'Python' OR course = 'SQL') AND score > 90;`
        },
        {
          mistake: {
            en: 'Using = with wildcard characters instead of LIKE',
            vi: 'Dùng dấu = với ký tự đại diện wildcard thay vì dùng LIKE'
          },
          correction: {
            en: 'The = operator matches literal strings. To interpret % and _ as wildcards, you MUST use the LIKE operator.',
            vi: 'Toán tử = chỉ so sánh chuỗi chính xác từng chữ. Để % và _ được hiểu là ký tự đại diện, BẮT BUỘC phải dùng LIKE.'
          },
          code: `-- WRONG: WHERE name = 'Alice%'
-- CORRECT:
WHERE name LIKE 'Alice%';`
        }
      ],
      tips: [
        {
          en: 'In standard SQLite, LIKE is case-insensitive for ASCII characters. In PostgreSQL, LIKE is case-sensitive and ILIKE is case-insensitive.',
          vi: 'Trong SQLite, LIKE mặc định không phân biệt chữ hoa/thường với ký tự ASCII. Trong PostgreSQL, LIKE phân biệt hoa thường còn ILIKE không phân biệt.'
        },
        {
          en: 'BETWEEN 80 AND 90 is equivalent to "score >= 80 AND score <= 90" (inclusive on both endpoints).',
          vi: 'BETWEEN 80 AND 90 tương đương với "score >= 80 AND score <= 90" (bao gồm cả giá trị 80 và 90).'
        }
      ],
      practiceStarterCode: `-- Filter students enrolled in 'SQL' with score >= 85
SELECT name, score FROM students WHERE course = 'SQL' AND score >= 85;`,
      practice: {
        task: {
          en: 'Write a query to find all students located in Da Nang or Hanoi with scores between 80 and 95.',
          vi: 'Viết truy vấn tìm tất cả sinh viên ở Da Nang hoặc Hanoi có điểm trong khoảng từ 80 đến 95.'
        },
        starterCode: `-- Find students in Da Nang or Hanoi with score between 80 and 95
SELECT name, city, score FROM students
WHERE ;`,
        solutionCode: `SELECT name, city, score FROM students WHERE city IN ('Da Nang', 'Hanoi') AND score BETWEEN 80 AND 95;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_2_1',
        type: 'fix_code',
        title: {
          en: 'Fix AND/OR Operator Precedence',
          vi: 'Sửa Lỗi Thứ Tự Ưu Tiên Toán Tử AND/OR'
        },
        instruction: {
          en: 'Add parentheses so the query returns students who are in either Da Nang or Hanoi AND have a score >= 90.',
          vi: 'Thêm dấu ngoặc đơn để truy vấn trả về sinh viên ở Da Nang hoặc Hanoi VÀ có điểm >= 90.'
        },
        starterCode: 'SELECT name, city, score FROM students WHERE city = \'Da Nang\' OR city = \'Hanoi\' AND score >= 90;',
        solutionCode: 'SELECT name, city, score FROM students WHERE (city = \'Da Nang\' OR city = \'Hanoi\') AND score >= 90;',
        hint: {
          en: 'Wrap (city = \'Da Nang\' OR city = \'Hanoi\') in parentheses.',
          vi: 'Bọc (city = \'Da Nang\' OR city = \'Hanoi\') trong ngoặc đơn.'
        },
        explanation: {
          en: 'Parentheses force evaluation of the OR branch before the AND predicate.',
          vi: 'Ngoặc đơn ép buộc biểu thức OR được đánh giá trước khi kết hợp với AND.'
        }
      },
      {
        id: 'sql_ex_2_2',
        type: 'complete_code',
        title: {
          en: 'Filter by List Membership with IN',
          vi: 'Lọc Theo Danh Sách Với Toán Tử IN'
        },
        instruction: {
          en: 'Complete the query to filter courses that are either Python or JavaScript using the IN operator.',
          vi: 'Hoàn thiện truy vấn để lọc các khóa học là Python hoặc JavaScript bằng toán tử IN.'
        },
        starterCode: 'SELECT name, course, score FROM students WHERE course IN ();',
        solutionCode: 'SELECT name, course, score FROM students WHERE course IN (\'Python\', \'JavaScript\');',
        hint: {
          en: 'Put \'Python\', \'JavaScript\' inside IN (...).',
          vi: 'Điền \'Python\', \'JavaScript\' vào trong IN (...).'
        },
        explanation: {
          en: 'IN (val1, val2) is a clean, readable shorthand for multiple OR equality checks.',
          vi: 'IN (val1, val2) là cú pháp ngắn gọn và tối ưu thay thế cho nhiều phép so sánh OR liên tiếp.'
        }
      },
      {
        id: 'sql_ex_2_3',
        type: 'write_code',
        title: {
          en: 'Find Names Starting with Letter A using LIKE',
          vi: 'Tìm Tên Bắt Đầu Bằng Chữ A Với LIKE'
        },
        instruction: {
          en: 'Write a query to select name and score for all students whose name starts with "A".',
          vi: 'Viết truy vấn lấy name và score của tất cả sinh viên có tên bắt đầu bằng chữ "A".'
        },
        starterCode: '-- Select students with name starting with A\n',
        solutionCode: 'SELECT name, score FROM students WHERE name LIKE \'A%\';',
        hint: {
          en: 'Use WHERE name LIKE \'A%\';',
          vi: 'Sử dụng WHERE name LIKE \'A%\';'
        },
        explanation: {
          en: 'The wildcard % matches any number of trailing characters.',
          vi: 'Ký tự đại diện % khớp với bất kỳ số lượng ký tự nào phía sau.'
        }
      },
      {
        id: 'sql_ex_2_4',
        type: 'modify_example',
        title: {
          en: 'Range Filtering with BETWEEN',
          vi: 'Lọc Khoảng Giá Trị Với BETWEEN'
        },
        instruction: {
          en: 'Modify the query to find all orders with amount between 40.00 and 100.00.',
          vi: 'Sửa truy vấn để tìm tất cả các đơn hàng có amount từ 40.00 đến 100.00.'
        },
        starterCode: 'SELECT order_id, product, amount FROM orders;',
        solutionCode: 'SELECT order_id, product, amount FROM orders WHERE amount BETWEEN 40.00 AND 100.00;',
        hint: {
          en: 'Add WHERE amount BETWEEN 40.00 AND 100.00;',
          vi: 'Thêm WHERE amount BETWEEN 40.00 AND 100.00;'
        },
        explanation: {
          en: 'BETWEEN low AND high tests for inclusive range boundaries.',
          vi: 'BETWEEN min AND max kiểm tra khoảng giá trị bao gồm cả 2 cận.'
        }
      },
      {
        id: 'sql_ex_2_5',
        type: 'predict_output',
        title: {
          en: 'Predict NOT IN Evaluation',
          vi: 'Dự Đoán Kết Quả Phép Lọc NOT IN'
        },
        instruction: {
          en: 'If courses in table are Python, SQL, JavaScript, how many courses match "WHERE course NOT IN (\'Python\', \'SQL\')"?',
          vi: 'Nếu bảng có các khóa Python, SQL, JavaScript, có bao nhiêu khóa khớp với "WHERE course NOT IN (\'Python\', \'SQL\')"?',
        },
        starterCode: '-- Result count for NOT IN\n',
        solutionCode: 'SELECT DISTINCT course FROM students WHERE course NOT IN (\'Python\', \'SQL\');',
        options: ['1', '2', '3', '0'],
        correctOptionIndex: 0,
        hint: {
          en: 'Only JavaScript is neither Python nor SQL.',
          vi: 'Chỉ có JavaScript là không phải Python hay SQL.'
        },
        explanation: {
          en: 'NOT IN negates the set inclusion, matching only JavaScript.',
          vi: 'NOT IN phủ định sự tồn tại trong tập hợp, do đó chỉ khớp với JavaScript.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_2',
      title: {
        en: 'Targeted High-Performer Cohort Filter',
        vi: 'Lọc Nhóm Sinh Viên Xuất Sắc Mục Tiêu'
      },
      description: {
        en: 'Write a query to retrieve name, course, score, and city for students enrolled in either "Python" or "SQL" who achieved a score of 85 or higher and reside in either "Hanoi" or "Da Nang".',
        vi: 'Viết truy vấn lấy name, course, score và city của sinh viên học môn "Python" hoặc "SQL" có điểm từ 85 trở lên và sống tại "Hanoi" hoặc "Da Nang".'
      },
      requirements: [
        {
          en: 'Select name, course, score, and city columns from students',
          vi: 'Chọn các cột name, course, score và city từ bảng students'
        },
        {
          en: 'Course must be in (\'Python\', \'SQL\')',
          vi: 'Khóa học phải thuộc (\'Python\', \'SQL\')'
        },
        {
          en: 'Score must be >= 85',
          vi: 'Điểm số phải >= 85'
        },
        {
          en: 'City must be in (\'Hanoi\', \'Da Nang\')',
          vi: 'Thành phố phải thuộc (\'Hanoi\', \'Da Nang\')'
        }
      ],
      starterCode: `-- Write your SQL query below
SELECT name, course, score, city
FROM students
WHERE ;`,
      solutionCode: `SELECT name, course, score, city FROM students WHERE course IN ('Python', 'SQL') AND score >= 85 AND city IN ('Hanoi', 'Da Nang');`,
      hints: [
        {
          en: 'Use course IN (\'Python\', \'SQL\') AND score >= 85 AND city IN (\'Hanoi\', \'Da Nang\').',
          vi: 'Dùng course IN (\'Python\', \'SQL\') AND score >= 85 AND city IN (\'Hanoi\', \'Da Nang\').'
        }
      ],
      solutionExplanation: {
        en: 'Combines multiple IN set conditions and a relational comparison predicate using logical AND.',
        vi: 'Kết hợp nhiều điều kiện tập hợp IN với toán tử so sánh bằng liên kết logic AND.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_2_v1',
        title: {
          en: 'Targeted High-Performer Cohort Filter',
          vi: 'Lọc Nhóm Sinh Viên Xuất Sắc Mục Tiêu'
        },
        description: {
          en: 'Write a query to retrieve name, course, score, and city for students enrolled in either "Python" or "SQL" who achieved a score of 85 or higher and reside in either "Hanoi" or "Da Nang".',
          vi: 'Viết truy vấn lấy name, course, score và city của sinh viên học môn "Python" hoặc "SQL" có điểm từ 85 trở lên và sống tại "Hanoi" hoặc "Da Nang".'
        },
        requirements: [
          {
            en: 'Select name, course, score, and city columns from students',
            vi: 'Chọn các cột name, course, score và city từ bảng students'
          },
          {
            en: 'Course in (\'Python\', \'SQL\') AND score >= 85 AND city IN (\'Hanoi\', \'Da Nang\')',
            vi: 'Course thuộc (\'Python\', \'SQL\') VÀ score >= 85 VÀ city thuộc (\'Hanoi\', \'Da Nang\')'
          }
        ],
        starterCode: `SELECT name, course, score, city FROM students WHERE ;`,
        solutionCode: `SELECT name, course, score, city FROM students WHERE course IN ('Python', 'SQL') AND score >= 85 AND city IN ('Hanoi', 'Da Nang');`,
        hints: [
          {
            en: 'Combine IN clauses with AND score >= 85.',
            vi: 'Kết hợp các mệnh đề IN với AND score >= 85.'
          }
        ],
        solutionExplanation: {
          en: 'Filters top performing students across specified regional tech hubs.',
          vi: 'Lọc sinh viên điểm cao tại các trung tâm công nghệ chỉ định.'
        }
      },
      {
        id: 'sql_ch_2_v2',
        title: {
          en: 'High-Value Completed Orders Filter',
          vi: 'Lọc Đơn Hàng Hoàn Thành Giá Trị Cao'
        },
        description: {
          en: 'Retrieve order_id, customer_name, product, and amount for orders with status = \'completed\' and amount BETWEEN 40 AND 100.',
          vi: 'Trích xuất order_id, customer_name, product và amount cho các đơn hàng có status = \'completed\' và amount nằm trong khoảng từ 40 đến 100.'
        },
        requirements: [
          {
            en: 'Select order_id, customer_name, product, amount from orders',
            vi: 'Chọn order_id, customer_name, product, amount từ bảng orders'
          },
          {
            en: 'Filter status = \'completed\' AND amount BETWEEN 40 AND 100',
            vi: 'Lọc status = \'completed\' AND amount BETWEEN 40 AND 100'
          }
        ],
        starterCode: `SELECT order_id, customer_name, product, amount FROM orders WHERE ;`,
        solutionCode: `SELECT order_id, customer_name, product, amount FROM orders WHERE status = 'completed' AND amount BETWEEN 40 AND 100;`,
        hints: [
          {
            en: 'WHERE status = \'completed\' AND amount BETWEEN 40 AND 100',
            vi: 'WHERE status = \'completed\' AND amount BETWEEN 40 AND 100'
          }
        ],
        solutionExplanation: {
          en: 'Filters verified completed purchases inside the specified monetary range.',
          vi: 'Lọc các đơn hàng hoàn tất trong khoảng giá trị mục tiêu.'
        }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_2_1',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'easy',
        question: {
          en: 'Which clause in SQL is used to filter rows based on specific conditions?',
          vi: 'Mệnh đề nào trong SQL được sử dụng để lọc các dòng theo điều kiện chỉ định?'
        },
        options: [
          { en: 'FILTER', vi: 'FILTER' },
          { en: 'WHERE', vi: 'WHERE' },
          { en: 'HAVING', vi: 'HAVING' },
          { en: 'LIMIT', vi: 'LIMIT' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'The WHERE clause evaluates row-level predicates before any aggregation or grouping.',
          vi: 'Mệnh đề WHERE đánh giá các điều kiện lọc trên từng dòng trước khi gom nhóm hoặc tổng hợp.'
        }
      },
      {
        id: 'sql_q_2_2',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'medium',
        question: {
          en: 'In SQL boolean evaluation, which operator has the highest precedence: AND, OR, or NOT?',
          vi: 'Trong biểu thức logic SQL, toán tử nào có độ ưu tiên cao nhất giữa AND, OR và NOT?'
        },
        options: [
          { en: 'OR has the highest precedence', vi: 'OR có độ ưu tiên cao nhất' },
          { en: 'NOT has highest, followed by AND, then OR', vi: 'NOT cao nhất, tiếp theo là AND, sau cùng là OR' },
          { en: 'AND and OR have equal precedence', vi: 'AND và OR có độ ưu tiên ngang nhau' },
          { en: 'Evaluation is strictly left-to-right regardless of operator', vi: 'Đánh giá hoàn toàn từ trái sang phải bất kể toán tử' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'Standard operator precedence is: 1. NOT, 2. AND, 3. OR. Use parentheses to ensure intended logic.',
          vi: 'Độ ưu tiên chuẩn là: 1. NOT, 2. AND, 3. OR. Dùng ngoặc đơn để đảm bảo logic chính xác.'
        }
      },
      {
        id: 'sql_q_2_3',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'easy',
        question: {
          en: 'What does the condition "score BETWEEN 70 AND 90" evaluate to?',
          vi: 'Điều kiện "score BETWEEN 70 AND 90" tương đương với biểu thức nào?'
        },
        options: [
          { en: 'score > 70 AND score < 90 (exclusive)', vi: 'score > 70 AND score < 90 (không lấy 2 đầu)' },
          { en: 'score >= 70 AND score <= 90 (inclusive)', vi: 'score >= 70 AND score <= 90 (bao gồm cả 2 đầu)' },
          { en: 'score = 70 OR score = 90', vi: 'score = 70 OR score = 90' },
          { en: 'score > 70 OR score <= 90', vi: 'score > 70 OR score <= 90' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'BETWEEN is inclusive of both boundary values.',
          vi: 'BETWEEN bao gồm cả hai giá trị biên (đoạn đóng).'
        }
      },
      {
        id: 'sql_q_2_4',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'medium',
        question: {
          en: 'In a LIKE pattern, what does the underscore (_) character represent?',
          vi: 'Trong mẫu tìm kiếm LIKE, ký tự gạch dưới (_) đại diện cho điều gì?'
        },
        options: [
          { en: 'Zero or more characters', vi: 'Khớp 0 hoặc nhiều ký tự' },
          { en: 'Exactly one single character', vi: 'Khớp chính xác đúng 1 ký tự' },
          { en: 'Any numeric digit only', vi: 'Chỉ khớp với ký tự số' },
          { en: 'An escape character', vi: 'Một ký tự escape' }
        ],
        correctAnswers: [1],
        explanation: {
          en: '_ matches exactly one arbitrary character, while % matches zero or more characters.',
          vi: '_ khớp với đúng 1 ký tự bất kỳ, trong khi % khớp với 0 hoặc nhiều ký tự.'
        }
      },
      {
        id: 'sql_q_2_5',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'medium',
        question: {
          en: 'Which query finds all users whose username contains "admin" anywhere in the text?',
          vi: 'Truy vấn nào tìm tất cả người dùng có username chứa chữ "admin" ở bất kỳ vị trí nào?'
        },
        options: [
          { en: 'WHERE username LIKE \'admin\'', vi: 'WHERE username LIKE \'admin\'' },
          { en: 'WHERE username LIKE \'%admin%\'', vi: 'WHERE username LIKE \'%admin%\'' },
          { en: 'WHERE username LIKE \'admin%\'', vi: 'WHERE username LIKE \'admin%\'' },
          { en: 'WHERE username LIKE \'_admin_\'', vi: 'WHERE username LIKE \'_admin_\'' }
        ],
        correctAnswers: [1],
        explanation: {
          en: '%admin% matches strings having any characters before and after "admin".',
          vi: '%admin% khớp với chuỗi có bất kỳ ký tự nào đứng trước và sau từ "admin".'
        }
      },
      {
        id: 'sql_q_2_6',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'easy',
        question: {
          en: 'Which operator checks if a column value matches any item in a specified list of values?',
          vi: 'Toán tử nào kiểm tra xem giá trị của một cột có trùng với bất kỳ giá trị nào trong một danh sách cho trước?'
        },
        options: [
          { en: 'EXISTS', vi: 'EXISTS' },
          { en: 'IN', vi: 'IN' },
          { en: 'CONTAINS', vi: 'CONTAINS' },
          { en: 'MATCH', vi: 'MATCH' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'The IN operator tests whether a value exists within a comma-delimited set or subquery.',
          vi: 'Toán tử IN kiểm tra giá trị có nằm trong tập hợp các phần tử ngăn cách bởi dấu phẩy hoặc truy vấn con.'
        }
      },
      {
        id: 'sql_q_2_7',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'hard',
        question: {
          en: 'Given "WHERE status = \'active\' OR status = \'pending\' AND score > 90", how is this evaluated without parentheses?',
          vi: 'Với điều kiện "WHERE status = \'active\' OR status = \'pending\' AND score > 90", câu lệnh được đánh giá thế nào nếu không có ngoặc đơn?'
        },
        options: [
          { en: '(status = \'active\' OR status = \'pending\') AND score > 90', vi: '(status = \'active\' OR status = \'pending\') AND score > 90' },
          { en: 'status = \'active\' OR (status = \'pending\' AND score > 90)', vi: 'status = \'active\' OR (status = \'pending\' AND score > 90)' },
          { en: 'Syntax Error', vi: 'Lỗi cú pháp' },
          { en: 'Evaluated randomly', vi: 'Đánh giá ngẫu nhiên' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'Because AND has higher precedence than OR, the AND condition binds first: status = \'active\' OR (status = \'pending\' AND score > 90). Any active user is returned regardless of score!',
          vi: 'Vì AND ưu tiên hơn OR, phần AND được gộp trước: status = \'active\' OR (status = \'pending\' AND score > 90). Mọi bản ghi active đều được lấy bất kể điểm số!'
        }
      },
      {
        id: 'sql_q_2_8',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'medium',
        question: {
          en: 'How do you check for inequality in standard SQL?',
          vi: 'Làm thế nào để so sánh không bằng (khác) trong chuẩn SQL?'
        },
        options: [
          { en: '!= or <>', vi: '!= hoặc <>' },
          { en: '!== only', vi: 'Chỉ dùng !==' },
          { en: 'NOT EQUAL only', vi: 'Chỉ dùng NOT EQUAL' },
          { en: 'EQ_NOT', vi: 'EQ_NOT' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Both <> (ANSI standard) and != are widely supported for inequality.',
          vi: 'Cả <> (chuẩn ANSI) và != đều được hỗ trợ rộng rãi để so sánh khác nhau.'
        }
      },
      {
        id: 'sql_q_2_9',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'easy',
        question: {
          en: 'Which query matches strings that start with the letter "J" and have exactly 4 characters total?',
          vi: 'Truy vấn nào khớp với chuỗi bắt đầu bằng chữ "J" và có tổng cộng chính xác 4 ký tự?'
        },
        options: [
          { en: 'WHERE name LIKE \'J%%%\'', vi: 'WHERE name LIKE \'J%%%\'' },
          { en: 'WHERE name LIKE \'J___\'', vi: 'WHERE name LIKE \'J___\'' },
          { en: 'WHERE name LIKE \'J4\'', vi: 'WHERE name LIKE \'J4\'' },
          { en: 'WHERE name LIKE \'J*\'', vi: 'WHERE name LIKE \'J*\'' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'J followed by 3 underscores (___) matches exactly 1 letter J + 3 characters = 4 total characters.',
          vi: 'Chữ J theo sau bởi 3 dấu gạch dưới (___) khớp đúng 1 chữ J + 3 ký tự bất kỳ = 4 ký tự.'
        }
      },
      {
        id: 'sql_q_2_10',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'medium',
        question: {
          en: 'What is the inverse of the condition "WHERE score >= 60"?',
          vi: 'Mệnh đề phủ định (nghịch đảo) của điều kiện "WHERE score >= 60" là gì?'
        },
        options: [
          { en: 'WHERE score <= 60', vi: 'WHERE score <= 60' },
          { en: 'WHERE score < 60', vi: 'WHERE score < 60' },
          { en: 'WHERE score != 60', vi: 'WHERE score != 60' },
          { en: 'WHERE NOT score == 60', vi: 'WHERE NOT score == 60' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'The opposite of greater than or equal (>=) is strictly less than (<).',
          vi: 'Phủ định của lớn hơn hoặc bằng (>=) là nhỏ hơn hẳn (<).'
        }
      },
      {
        id: 'sql_q_2_11',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'hard',
        question: {
          en: 'Why is "WHERE UPPER(city) = \'HANOI\'" generally discouraged on large indexed tables?',
          vi: 'Tại sao việc viết "WHERE UPPER(city) = \'HANOI\'" thường không được khuyến khích trên bảng lớn có đánh chỉ mục?'
        },
        options: [
          { en: 'UPPER is an invalid SQL keyword', vi: 'UPPER là từ khóa không hợp lệ' },
          { en: 'Wrapping an indexed column in a function prevents standard B-Tree index lookup (non-SARGable)', vi: 'Bọc cột trong hàm ngăn cản việc tận dụng chỉ mục B-Tree thông thường (non-SARGable)' },
          { en: 'It converts city values in the database permanently', vi: 'Nó chuyển đổi vĩnh viễn dữ liệu city trong CSDL' },
          { en: 'It causes database deadlock', vi: 'Nó gây deadlock cơ sở dữ liệu' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'Applying functions to indexed columns makes the expression non-SARGable, forcing a full table scan unless a functional index exists.',
          vi: 'Áp dụng hàm lên cột có chỉ mục khiến biểu thức không SARGable, buộc CSDL phải quét toàn bộ bảng (table scan) trừ khi có functional index.'
        }
      },
      {
        id: 'sql_q_2_12',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'medium',
        question: {
          en: 'Which clause comes first in SQL query execution order: FROM or WHERE?',
          vi: 'Mệnh đề nào được thực thi trước theo thứ tự xử lý logic của SQL: FROM hay WHERE?'
        },
        options: [
          { en: 'WHERE comes before FROM', vi: 'WHERE thực thi trước FROM' },
          { en: 'FROM executes first to load table rows, then WHERE filters those rows', vi: 'FROM thực thi trước để xác định bảng, sau đó WHERE lọc các dòng' },
          { en: 'They execute simultaneously in parallel', vi: 'Chúng thực thi song song cùng lúc' },
          { en: 'SELECT executes before both', vi: 'SELECT thực thi trước cả hai' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'Logical query processing always starts with FROM to identify the data source before applying WHERE filters.',
          vi: 'Thứ tự xử lý logic luôn bắt đầu từ FROM để nạp tập dữ liệu nguồn trước khi áp dụng bộ lọc WHERE.'
        }
      },
      {
        id: 'sql_q_2_13',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'easy',
        question: {
          en: 'What is the result of "SELECT name FROM students WHERE 1 = 0;"?',
          vi: 'Kết quả của câu lệnh "SELECT name FROM students WHERE 1 = 0;" là gì?'
        },
        options: [
          { en: 'Returns all student names', vi: 'Trả về tất cả tên sinh viên' },
          { en: 'Returns an empty result set (0 rows)', vi: 'Trả về tập kết quả rỗng (0 dòng)' },
          { en: 'Throws a syntax error', vi: 'Báo lỗi cú pháp' },
          { en: 'Deletes all student names', vi: 'Xóa toàn bộ tên sinh viên' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'The condition 1 = 0 is always FALSE, so no rows pass the WHERE filter.',
          vi: 'Điều kiện 1 = 0 luôn luôn FALSE nên không có dòng nào thỏa mãn bộ lọc WHERE.'
        }
      },
      {
        id: 'sql_q_2_14',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'medium',
        question: {
          en: 'In PostgreSQL, what is the difference between LIKE and ILIKE?',
          vi: 'Trong PostgreSQL, sự khác biệt giữa LIKE và ILIKE là gì?'
        },
        options: [
          { en: 'LIKE is case-sensitive, while ILIKE is case-insensitive', vi: 'LIKE phân biệt hoa thường, còn ILIKE không phân biệt hoa thường' },
          { en: 'LIKE is for numbers, ILIKE is for text', vi: 'LIKE dùng cho số, ILIKE dùng cho chữ' },
          { en: 'ILIKE is deprecated in modern SQL', vi: 'ILIKE đã bị loại bỏ trong chuẩn mới' },
          { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'ILIKE performs case-insensitive pattern matching in PostgreSQL.',
          vi: 'ILIKE thực hiện tìm kiếm theo mẫu không phân biệt chữ hoa hay chữ thường trong PostgreSQL.'
        }
      },
      {
        id: 'sql_q_2_15',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'easy',
        question: {
          en: 'How to write a query checking if age is NOT between 18 and 65?',
          vi: 'Làm thế nào để viết truy vấn kiểm tra tuổi KHÔNG nằm trong khoảng từ 18 đến 65?'
        },
        options: [
          { en: 'WHERE age NOT BETWEEN 18 AND 65', vi: 'WHERE age NOT BETWEEN 18 AND 65' },
          { en: 'WHERE age OUTSIDE 18 AND 65', vi: 'WHERE age OUTSIDE 18 AND 65' },
          { en: 'WHERE NOT (age > 18) AND NOT (age < 65)', vi: 'WHERE NOT (age > 18) AND NOT (age < 65)' },
          { en: 'WHERE age != 18..65', vi: 'WHERE age != 18..65' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'NOT BETWEEN low AND high matches values strictly below low or strictly above high.',
          vi: 'NOT BETWEEN min AND max khớp với các giá trị nhỏ hơn hẳn min hoặc lớn hơn hẳn max.'
        }
      },
      {
        id: 'sql_q_2_16',
        type: 'single_choice',
        topicId: 'sql_where',
        difficulty: 'hard',
        question: {
          en: 'If a table has rows with values [10, 20, 30, NULL], how many rows match "WHERE val NOT IN (10, 20)"?',
          vi: 'Nếu bảng có các dòng chứa giá trị [10, 20, 30, NULL], có bao nhiêu dòng khớp với "WHERE val NOT IN (10, 20)"?'
        },
        options: [
          { en: '2 rows (30 and NULL)', vi: '2 dòng (30 và NULL)' },
          { en: '1 row (only 30)', vi: '1 dòng (chỉ có 30)' },
          { en: '0 rows', vi: '0 dòng' },
          { en: '3 rows', vi: '3 dòng' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'For val = NULL, "NULL NOT IN (10, 20)" evaluates to UNKNOWN, which is rejected by WHERE. Only val = 30 evaluates to TRUE.',
          vi: 'Với dòng có val = NULL, "NULL NOT IN (10, 20)" trả về UNKNOWN nên bị WHERE loại bỏ. Chỉ có dòng val = 30 trả về TRUE.'
        }
      }
    ]
  },

  // LESSON 3: Three-Valued Logic: NULL Mechanics, IS NULL & COALESCE
  {
    id: 'sql_lesson_3',
    moduleId: 'sql_mod_1',
    levelId: 'basic',
    courseId: 'sql',
    order: 3,
    topicId: 'sql_null',
    title: {
      en: 'Three-Valued Logic: NULL Mechanics, IS NULL & COALESCE',
      vi: 'Logic Tam Trị: Bản Chất NULL, IS NULL & COALESCE'
    },
    summary: {
      en: 'Master SQL Three-Valued Logic (TRUE, FALSE, UNKNOWN), IS NULL comparisons, fallback handling with COALESCE, division-by-zero protection with NULLIF, and dangerous NOT IN NULL traps.',
      vi: 'Làm chủ Logic Tam Trị (TRUE, FALSE, UNKNOWN) trong SQL, so sánh IS NULL, xử lý giá trị mặc định với COALESCE, chống lỗi chia cho 0 với NULLIF và bẫy NOT IN chứa NULL.'
    },
    estimatedMinutes: 15,
    learn: {
      introduction: {
        en: 'In SQL, NULL represents missing, unknown, or inapplicable data. Unlike most programming languages where null is a specific falsy or empty value, SQL uses Three-Valued Logic (3VL) where boolean expressions evaluate to TRUE, FALSE, or UNKNOWN.',
        vi: 'Trong SQL, NULL đại diện cho dữ liệu bị thiếu, chưa biết hoặc không áp dụng. Khác với các ngôn ngữ lập trình thông thường, SQL áp dụng Logic Tam Trị (3VL) với 3 trạng thái logic: TRUE, FALSE và UNKNOWN.'
      },
      conceptExplanation: {
        en: 'Because NULL means "unknown", testing "column = NULL" always yields UNKNOWN (which WHERE rejects). You must use "column IS NULL" or "column IS NOT NULL". Arithmetic operations on NULL return NULL (5 + NULL = NULL). Use COALESCE(col1, col2, fallback) to return the first non-NULL value in a sequence. Use NULLIF(a, b) to return NULL if a equals b (useful to avoid division by zero: num / NULLIF(denom, 0)). Crucially, "val NOT IN (1, 2, NULL)" evaluates to UNKNOWN and returns ZERO rows.',
        vi: 'Vì NULL có nghĩa là "chưa biết", phép so sánh "cột = NULL" luôn trả về UNKNOWN (và bị WHERE loại bỏ). Bạn bắt buộc phải dùng "cột IS NULL" hoặc "cột IS NOT NULL". Mọi phép tính số học với NULL đều ra NULL (5 + NULL = NULL). Dùng COALESCE(col1, col2, fallback) để lấy giá trị không NULL đầu tiên. Dùng NULLIF(a, b) để trả về NULL nếu a = b (rất hữu ích để tránh lỗi chia cho 0: num / NULLIF(denom, 0)). Đặc biệt lưu ý: "val NOT IN (1, 2, NULL)" sẽ luôn là UNKNOWN và trả về 0 dòng kết quả.'
      },
      syntax: `SELECT column1, COALESCE(nullable_column, 'Default Value') AS clean_col
FROM table_name
WHERE nullable_column IS NOT NULL
  AND numerator / NULLIF(denominator, 0) > 1.0;`,
      examples: [
        {
          title: {
            en: '1. Filtering with IS NULL and Falling Back with COALESCE',
            vi: '1. Lọc Với IS NULL và Gán Mặc Định Bằng COALESCE'
          },
          code: `SELECT name, email, COALESCE(email, 'no-email@system.internal') AS contact_email
FROM students
WHERE email IS NOT NULL;`,
          language: 'sql',
          explanation: {
            en: 'Filters out student records with missing emails and replaces any unexpected NULLs with fallback contact text.',
            vi: 'Lọc các bản ghi sinh viên có email và thay thế bất kỳ giá trị NULL nào bằng chuỗi liên hệ mặc định.'
          }
        },
        {
          title: {
            en: '2. Safe Division Using NULLIF',
            vi: '2. Phép Chia An Toàn Bằng NULLIF'
          },
          code: `SELECT emp_name, salary, bonus,
       (bonus * 1.0) / NULLIF(salary, 0) AS bonus_ratio
FROM employees;`,
          language: 'sql',
          explanation: {
            en: 'If salary is 0, NULLIF converts it to NULL, causing the division to safely evaluate to NULL instead of raising a zero-division runtime crash.',
            vi: 'Nếu salary bằng 0, NULLIF đổi thành NULL, giúp phép chia trả về NULL an toàn thay vì gây sập hệ thống do lỗi chia cho 0.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Using "= NULL" or "!= NULL" instead of IS NULL / IS NOT NULL',
            vi: 'Dùng "= NULL" hoặc "!= NULL" thay vì IS NULL / IS NOT NULL'
          },
          correction: {
            en: '"x = NULL" evaluates to UNKNOWN. The WHERE clause requires TRUE to keep a row, so "= NULL" silently discards all records.',
            vi: '"x = NULL" luôn trả về UNKNOWN. Mệnh đề WHERE chỉ giữ các dòng có điều kiện là TRUE, do đó "= NULL" sẽ âm thầm loại bỏ sạch mọi bản ghi.'
          },
          code: `-- WRONG: SELECT * FROM students WHERE email = NULL;
-- CORRECT:
SELECT * FROM students WHERE email IS NULL;`
        },
        {
          mistake: {
            en: 'Using NOT IN with a subquery or list containing NULL',
            vi: 'Sử dụng NOT IN với danh sách hoặc truy vấn con có chứa giá trị NULL'
          },
          correction: {
            en: 'If any value in the NOT IN list is NULL, the entire NOT IN expression evaluates to UNKNOWN, returning 0 rows. Use NOT EXISTS instead.',
            vi: 'Nếu bất kỳ phần tử nào trong danh sách NOT IN là NULL, toàn bộ biểu thức NOT IN biến thành UNKNOWN và trả về 0 dòng. Hãy dùng NOT EXISTS để thay thế.'
          },
          code: `-- DANGEROUS: WHERE id NOT IN (1, 2, NULL) -- Always 0 rows!
-- SAFE:
WHERE id NOT IN (1, 2) AND id IS NOT NULL;`
        }
      ],
      tips: [
        {
          en: 'In SQL Three-Valued Logic: TRUE AND UNKNOWN = UNKNOWN, FALSE AND UNKNOWN = FALSE, TRUE OR UNKNOWN = TRUE, NOT UNKNOWN = UNKNOWN.',
          vi: 'Trong Logic Tam Trị SQL: TRUE AND UNKNOWN = UNKNOWN, FALSE AND UNKNOWN = FALSE, TRUE OR UNKNOWN = TRUE, NOT UNKNOWN = UNKNOWN.'
        },
        {
          en: 'COUNT(column_name) ignores NULL rows, whereas COUNT(*) counts all rows regardless of NULLs.',
          vi: 'COUNT(tên_cột) bỏ qua các ô có giá trị NULL, trong khi COUNT(*) đếm toàn bộ số dòng bất kể giá trị NULL.'
        }
      ],
      practiceStarterCode: `-- Find students with missing email using IS NULL
SELECT name, course FROM students WHERE email IS NULL;`,
      practice: {
        task: {
          en: 'Write a query selecting name and displaying email replaced with "unassigned@company.com" if NULL using COALESCE.',
          vi: 'Viết truy vấn lấy name và hiển thị email thay thế bằng "unassigned@company.com" nếu là NULL bằng COALESCE.'
        },
        starterCode: `-- Select student name and coalesce email
SELECT name, email FROM students;`,
        solutionCode: `SELECT name, COALESCE(email, 'unassigned@company.com') AS email FROM students;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_3_1',
        type: 'fix_code',
        title: {
          en: 'Fix Incorrect NULL Equality Comparison',
          vi: 'Sửa Lỗi So Sánh Bằng Với NULL'
        },
        instruction: {
          en: 'Fix the query that incorrectly uses "= NULL" to find employees without a department.',
          vi: 'Sửa câu truy vấn đang dùng sai "= NULL" để tìm nhân viên chưa có phòng ban.'
        },
        starterCode: 'SELECT emp_name FROM employees WHERE dept_id = NULL;',
        solutionCode: 'SELECT emp_name FROM employees WHERE dept_id IS NULL;',
        hint: {
          en: 'Replace "= NULL" with "IS NULL".',
          vi: 'Thay thế "= NULL" bằng "IS NULL".'
        },
        explanation: {
          en: 'In SQL, NULL can only be tested using the IS NULL or IS NOT NULL operators.',
          vi: 'Trong SQL, NULL chỉ có thể được kiểm tra bằng toán tử IS NULL hoặc IS NOT NULL.'
        }
      },
      {
        id: 'sql_ex_3_2',
        type: 'complete_code',
        title: {
          en: 'Provide Default Fallback with COALESCE',
          vi: 'Cung Cấp Giá Trị Mặc Định Bằng COALESCE'
        },
        instruction: {
          en: 'Use COALESCE to return student email or the fallback string "no-email-provided" aliased as contact_email.',
          vi: 'Dùng COALESCE để lấy email học viên hoặc chuỗi mặc định "no-email-provided" với bí danh contact_email.'
        },
        starterCode: 'SELECT name, COALESCE(email, ) AS contact_email FROM students;',
        solutionCode: 'SELECT name, COALESCE(email, \'no-email-provided\') AS contact_email FROM students;',
        hint: {
          en: 'Provide \'no-email-provided\' as the second argument to COALESCE.',
          vi: 'Truyền \'no-email-provided\' làm tham số thứ hai của COALESCE.'
        },
        explanation: {
          en: 'COALESCE evaluates its arguments in order and returns the first non-null value.',
          vi: 'COALESCE đánh giá các tham số theo thứ tự và trả về giá trị khác null đầu tiên.'
        }
      },
      {
        id: 'sql_ex_3_3',
        type: 'write_code',
        title: {
          en: 'Prevent Division by Zero with NULLIF',
          vi: 'Ngăn Chặn Lỗi Chia Cho 0 Bằng NULLIF'
        },
        instruction: {
          en: 'Select emp_name, salary, and calculate (salary / NULLIF(dept_id, 0)) AS dept_ratio from employees.',
          vi: 'Chọn emp_name, salary và tính toán (salary / NULLIF(dept_id, 0)) AS dept_ratio từ bảng employees.'
        },
        starterCode: '-- Safe division with NULLIF\n',
        solutionCode: 'SELECT emp_name, salary, (salary / NULLIF(dept_id, 0)) AS dept_ratio FROM employees;',
        hint: {
          en: 'Use NULLIF(dept_id, 0) in the denominator.',
          vi: 'Sử dụng NULLIF(dept_id, 0) ở mẫu số.'
        },
        explanation: {
          en: 'NULLIF returns NULL when both arguments match, preventing division by zero.',
          vi: 'NULLIF trả về NULL khi hai đối số bằng nhau, giúp tránh lỗi chia cho số 0.'
        }
      },
      {
        id: 'sql_ex_3_4',
        type: 'modify_example',
        title: {
          en: 'Filter for Records with Non-NULL Values',
          vi: 'Lọc Các Bản Ghi Có Giá Trị Không NULL'
        },
        instruction: {
          en: 'Modify the query to only return students who have an assigned email address (email IS NOT NULL).',
          vi: 'Sửa truy vấn để chỉ trả về những sinh viên đã có địa chỉ email (email IS NOT NULL).'
        },
        starterCode: 'SELECT name, email, score FROM students;',
        solutionCode: 'SELECT name, email, score FROM students WHERE email IS NOT NULL;',
        hint: {
          en: 'Add WHERE email IS NOT NULL;',
          vi: 'Thêm WHERE email IS NOT NULL;'
        },
        explanation: {
          en: 'IS NOT NULL verifies the column has a known, non-empty value.',
          vi: 'IS NOT NULL xác nhận cột có giá trị xác định và không rỗng.'
        }
      },
      {
        id: 'sql_ex_3_5',
        type: 'predict_output',
        title: {
          en: 'Predict Result of COALESCE with Multiple NULLs',
          vi: 'Dự Đoán Kết Quả Của COALESCE Với Nhiều Giá Trị NULL'
        },
        instruction: {
          en: 'What does "SELECT COALESCE(NULL, NULL, \'Active\', \'Pending\');" return?',
          vi: 'Câu lệnh "SELECT COALESCE(NULL, NULL, \'Active\', \'Pending\');" trả về kết quả gì?'
        },
        starterCode: '-- Select coalesce result\n',
        solutionCode: 'SELECT COALESCE(NULL, NULL, \'Active\', \'Pending\');',
        options: ['Active', 'Pending', 'NULL', 'Error'],
        correctOptionIndex: 0,
        hint: {
          en: 'COALESCE returns the first non-NULL expression from left to right.',
          vi: 'COALESCE trả về biểu thức không NULL đầu tiên từ trái sang phải.'
        },
        explanation: {
          en: 'The first non-NULL argument encountered in the list is \'Active\'.',
          vi: 'Đối số không NULL đầu tiên xuất hiện trong danh sách là \'Active\'.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_3',
      title: {
        en: 'Robust Student Contact & Integrity Audit',
        vi: 'Kiểm Tra Toàn Vẹn & Thông Tin Liên Hệ Sinh Viên'
      },
      description: {
        en: 'Write a SQL query that retrieves each student\'s id, name, and a cleaned contact column named verified_email using COALESCE to substitute NULL emails with "pending-verification@academy.org". Filter the results to only include students whose score IS NOT NULL and is >= 80.',
        vi: 'Viết câu lệnh SQL lấy id, name của từng sinh viên và cột thông tin liên hệ verified_email dùng COALESCE thay thế email NULL bằng "pending-verification@academy.org". Lọc kết quả chỉ gồm sinh viên có score IS NOT NULL và >= 80.'
      },
      requirements: [
        {
          en: 'Select id and name columns from students',
          vi: 'Chọn các cột id và name từ bảng students'
        },
        {
          en: 'Compute COALESCE(email, \'pending-verification@academy.org\') AS verified_email',
          vi: 'Tính COALESCE(email, \'pending-verification@academy.org\') AS verified_email'
        },
        {
          en: 'Filter with WHERE score IS NOT NULL AND score >= 80',
          vi: 'Lọc với WHERE score IS NOT NULL AND score >= 80'
        }
      ],
      starterCode: `-- Write your SQL query below
SELECT id, name
FROM students
WHERE ;`,
      solutionCode: `SELECT id, name, COALESCE(email, 'pending-verification@academy.org') AS verified_email FROM students WHERE score IS NOT NULL AND score >= 85;`,
      hints: [
        {
          en: 'Use COALESCE(email, \'pending-verification@academy.org\') AS verified_email in SELECT.',
          vi: 'Dùng COALESCE(email, \'pending-verification@academy.org\') AS verified_email trong SELECT.'
        }
      ],
      solutionExplanation: {
        en: 'Combines null-coalescing projection with explicit 3VL null safety filters.',
        vi: 'Kết hợp phép chiếu gán mặc định NULL với bộ lọc an toàn logic 3VL.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_3_v1',
        title: {
          en: 'Robust Student Contact & Integrity Audit',
          vi: 'Kiểm Tra Toàn Vẹn & Thông Tin Liên Hệ Sinh Viên'
        },
        description: {
          en: 'Write a query that retrieves id, name, and COALESCE(email, \'pending-verification@academy.org\') AS verified_email for students with score IS NOT NULL and score >= 85.',
          vi: 'Viết truy vấn lấy id, name và COALESCE(email, \'pending-verification@academy.org\') AS verified_email cho sinh viên có score IS NOT NULL và score >= 85.'
        },
        requirements: [
          {
            en: 'Select id, name, and COALESCE expression',
            vi: 'Chọn id, name và biểu thức COALESCE'
          },
          {
            en: 'Filter score IS NOT NULL AND score >= 85',
            vi: 'Lọc score IS NOT NULL AND score >= 85'
          }
        ],
        starterCode: `SELECT id, name FROM students WHERE ;`,
        solutionCode: `SELECT id, name, COALESCE(email, 'pending-verification@academy.org') AS verified_email FROM students WHERE score IS NOT NULL AND score >= 85;`,
        hints: [
          {
            en: 'Add COALESCE expression and score filter.',
            vi: 'Thêm biểu thức COALESCE và bộ lọc điểm.'
          }
        ],
        solutionExplanation: {
          en: 'Sanitizes missing emails while filtering validated high scorers.',
          vi: 'Chuẩn hóa email bị thiếu đồng thời lọc học viên điểm cao hợp lệ.'
        }
      },
      {
        id: 'sql_ch_3_v2',
        title: {
          en: 'Employee Compensation Null-Safety Audit',
          vi: 'Kiểm Tra An Toàn Lương Thưởng Nhân Viên'
        },
        description: {
          en: 'Select emp_name, salary, and COALESCE(bonus, 0.0) AS final_bonus from employees where salary IS NOT NULL and salary > 60000.',
          vi: 'Chọn emp_name, salary và COALESCE(bonus, 0.0) AS final_bonus từ bảng employees với điều kiện salary IS NOT NULL và salary > 60000.'
        },
        requirements: [
          {
            en: 'Select emp_name, salary, and COALESCE(bonus, 0.0) AS final_bonus',
            vi: 'Chọn emp_name, salary và COALESCE(bonus, 0.0) AS final_bonus'
          },
          {
            en: 'Filter salary IS NOT NULL AND salary > 60000',
            vi: 'Lọc salary IS NOT NULL AND salary > 60000'
          }
        ],
        starterCode: `SELECT emp_name, salary FROM employees WHERE ;`,
        solutionCode: `SELECT emp_name, salary, COALESCE(bonus, 0.0) AS final_bonus FROM employees WHERE salary IS NOT NULL AND salary > 60000;`,
        hints: [
          {
            en: 'COALESCE(bonus, 0.0) AS final_bonus',
            vi: 'COALESCE(bonus, 0.0) AS final_bonus'
          }
        ],
        solutionExplanation: {
          en: 'Replaces missing bonus values with zero for high earning employees.',
          vi: 'Thay thế giá trị tiền thưởng thiếu bằng số 0 cho nhân viên lương cao.'
        }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_3_1',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'easy',
        question: {
          en: 'What are the three truth values in SQL Three-Valued Logic (3VL)?',
          vi: 'Ba giá trị chân lý trong Logic Tam Trị (3VL) của SQL là gì?'
        },
        options: [
          { en: 'TRUE, FALSE, and UNKNOWN (NULL)', vi: 'TRUE, FALSE và UNKNOWN (NULL)' },
          { en: 'YES, NO, and MAYBE', vi: 'YES, NO và MAYBE' },
          { en: '1, 0, and -1', vi: '1, 0 và -1' },
          { en: 'VALID, INVALID, and PENDING', vi: 'VALID, INVALID và PENDING' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'SQL logic incorporates TRUE, FALSE, and UNKNOWN to handle missing information.',
          vi: 'Hệ logic của SQL bao gồm TRUE, FALSE và UNKNOWN để xử lý thông tin bị thiếu.'
        }
      },
      {
        id: 'sql_q_3_2',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'easy',
        question: {
          en: 'What does the boolean expression "NULL = NULL" evaluate to in SQL?',
          vi: 'Biểu thức logic "NULL = NULL" trả về kết quả gì trong SQL?'
        },
        options: [
          { en: 'TRUE', vi: 'TRUE' },
          { en: 'FALSE', vi: 'FALSE' },
          { en: 'UNKNOWN (NULL)', vi: 'UNKNOWN (NULL)' },
          { en: 'Runtime Error', vi: 'Lỗi thực thi' }
        ],
        correctAnswers: [2],
        explanation: {
          en: 'Because NULL represents an unknown value, comparing two unknowns yields UNKNOWN.',
          vi: 'Vì NULL đại diện cho giá trị chưa biết, nên việc so sánh hai giá trị chưa biết luôn cho kết quả là UNKNOWN.'
        }
      },
      {
        id: 'sql_q_3_3',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'medium',
        question: {
          en: 'How does the COALESCE(arg1, arg2, ..., argN) function work?',
          vi: 'Hàm COALESCE(arg1, arg2, ..., argN) hoạt động như thế nào?'
        },
        options: [
          { en: 'Returns the sum of all arguments', vi: 'Trả về tổng của tất cả các đối số' },
          { en: 'Returns the first non-NULL argument from left to right', vi: 'Trả về đối số không NULL đầu tiên tính từ trái sang phải' },
          { en: 'Returns NULL if any argument is NULL', vi: 'Trả về NULL nếu có bất kỳ đối số nào là NULL' },
          { en: 'Converts all arguments to strings', vi: 'Chuyển đổi tất cả đối số thành chuỗi' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'COALESCE evaluates arguments sequentially and returns the first non-null value.',
          vi: 'COALESCE duyệt các tham số theo thứ tự và trả về giá trị đầu tiên khác NULL.'
        }
      },
      {
        id: 'sql_q_3_4',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'medium',
        question: {
          en: 'What is the return value of NULLIF(50, 50)?',
          vi: 'Giá trị trả về của hàm NULLIF(50, 50) là gì?'
        },
        options: [
          { en: '50', vi: '50' },
          { en: '0', vi: '0' },
          { en: 'NULL', vi: 'NULL' },
          { en: 'TRUE', vi: 'TRUE' }
        ],
        correctAnswers: [2],
        explanation: {
          en: 'NULLIF(a, b) returns NULL if a equals b; otherwise it returns a.',
          vi: 'NULLIF(a, b) trả về NULL nếu a bằng b; ngược lại trả về a.'
        }
      },
      {
        id: 'sql_q_3_5',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'hard',
        question: {
          en: 'Why does "WHERE id NOT IN (1, 2, NULL)" return ZERO rows even when id = 3 exists in the table?',
          vi: 'Tại sao "WHERE id NOT IN (1, 2, NULL)" trả về 0 dòng ngay cả khi bảng có bản ghi với id = 3?'
        },
        options: [
          { en: 'Because NOT IN expands to "(id != 1) AND (id != 2) AND (id != NULL)". Since "id != NULL" is UNKNOWN, the entire AND evaluates to UNKNOWN', vi: 'Vì NOT IN phân rã thành "(id != 1) AND (id != 2) AND (id != NULL)". Do "id != NULL" ra UNKNOWN, toàn bộ phép AND biến thành UNKNOWN' },
          { en: 'Because NULL in NOT IN causes a syntax error', vi: 'Vì NULL trong NOT IN gây ra lỗi cú pháp' },
          { en: 'Because SQLite drops tables containing NULL', vi: 'Vì SQLite tự động hủy bảng chứa NULL' },
          { en: 'Because id is automatically converted to NULL', vi: 'Vì id tự động bị ép kiểu về NULL' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'In 3VL, TRUE AND TRUE AND UNKNOWN evaluates to UNKNOWN. The WHERE clause filters out any row whose predicate is not strictly TRUE.',
          vi: 'Trong 3VL, TRUE AND TRUE AND UNKNOWN trả về UNKNOWN. Mệnh đề WHERE sẽ loại bỏ tất cả dòng có điều kiện không phải là TRUE.'
        }
      },
      {
        id: 'sql_q_3_6',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'easy',
        question: {
          en: 'What is the correct syntax to filter rows where the phone column has NO value?',
          vi: 'Cú pháp chuẩn để lọc các dòng mà cột phone KHÔNG có giá trị là gì?'
        },
        options: [
          { en: 'WHERE phone = NULL', vi: 'WHERE phone = NULL' },
          { en: 'WHERE phone IS NULL', vi: 'WHERE phone IS NULL' },
          { en: 'WHERE phone == NULL', vi: 'WHERE phone == NULL' },
          { en: 'WHERE phone IS EMPTY', vi: 'WHERE phone IS EMPTY' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'Use "IS NULL" to identify missing or unassigned values in SQL.',
          vi: 'Sử dụng "IS NULL" để xác định các giá trị bị thiếu hoặc chưa gán trong SQL.'
        }
      },
      {
        id: 'sql_q_3_7',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'medium',
        question: {
          en: 'What is the result of the arithmetic expression "100 + NULL"?',
          vi: 'Kết quả của biểu thức số học "100 + NULL" là gì?'
        },
        options: [
          { en: '100', vi: '100' },
          { en: '0', vi: '0' },
          { en: 'NULL', vi: 'NULL' },
          { en: 'NaN', vi: 'NaN' }
        ],
        correctAnswers: [2],
        explanation: {
          en: 'In SQL arithmetic, operating on an unknown value (NULL) produces an unknown result (NULL).',
          vi: 'Trong phép tính số học SQL, mọi phép toán thực hiện trên giá trị chưa biết (NULL) đều tạo ra kết quả chưa biết (NULL).'
        }
      },
      {
        id: 'sql_q_3_8',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'medium',
        question: {
          en: 'How does aggregate function "SUM(bonus)" treat rows where bonus is NULL?',
          vi: 'Hàm tổng hợp "SUM(bonus)" xử lý các dòng có giá trị bonus là NULL như thế nào?'
        },
        options: [
          { en: 'It throws a runtime exception', vi: 'Báo lỗi ngoại lệ khi chạy' },
          { en: 'It silently ignores/skips NULL values', vi: 'Nó tự động bỏ qua các giá trị NULL' },
          { en: 'It treats NULL as negative infinity', vi: 'Coi NULL là âm vô cùng' },
          { en: 'The entire sum becomes NULL', vi: 'Toàn bộ tổng biến thành NULL' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'All aggregate functions (except COUNT(*)) automatically eliminate NULL values before calculation.',
          vi: 'Tất cả hàm tổng hợp (ngoại trừ COUNT(*)) đều tự động loại bỏ các giá trị NULL trước khi tính toán.'
        }
      },
      {
        id: 'sql_q_3_9',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'hard',
        question: {
          en: 'What is the boolean result of "NOT (UNKNOWN)" in SQL Three-Valued Logic?',
          vi: 'Kết quả logic của "NOT (UNKNOWN)" trong Logic Tam Trị của SQL là gì?'
        },
        options: [
          { en: 'TRUE', vi: 'TRUE' },
          { en: 'FALSE', vi: 'FALSE' },
          { en: 'UNKNOWN', vi: 'UNKNOWN' },
          { en: 'NULL_FALSE', vi: 'NULL_FALSE' }
        ],
        correctAnswers: [2],
        explanation: {
          en: 'Negating an unknown truth state still leaves the truth state unknown (UNKNOWN).',
          vi: 'Phủ định một trạng thái chưa biết vẫn giữ nguyên trạng thái chưa biết đó (UNKNOWN).'
        }
      },
      {
        id: 'sql_q_3_10',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'easy',
        question: {
          en: 'Which function can be used to prevent divide-by-zero errors in "SELECT total / count FROM metrics;"?',
          vi: 'Hàm nào có thể dùng để chống lỗi chia cho 0 trong câu "SELECT total / count FROM metrics;"?'
        },
        options: [
          { en: 'SELECT total / NULLIF(count, 0) FROM metrics;', vi: 'SELECT total / NULLIF(count, 0) FROM metrics;' },
          { en: 'SELECT total / COALESCE(count, 0) FROM metrics;', vi: 'SELECT total / COALESCE(count, 0) FROM metrics;' },
          { en: 'SELECT total / ZEROIF(count) FROM metrics;', vi: 'SELECT total / ZEROIF(count) FROM metrics;' },
          { en: 'SELECT total / ISNULL(count) FROM metrics;', vi: 'SELECT total / ISNULL(count) FROM metrics;' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'NULLIF(count, 0) converts 0 to NULL, making the division result in NULL instead of a fatal divide-by-zero error.',
          vi: 'NULLIF(count, 0) đổi 0 thành NULL, giúp phép chia ra kết quả NULL thay vì bị lỗi chia cho 0 làm sập ứng dụng.'
        }
      },
      {
        id: 'sql_q_3_11',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'medium',
        question: {
          en: 'If column score is NULL, what does "WHERE score >= 50 OR score < 50" evaluate to?',
          vi: 'Nếu cột score có giá trị NULL, điều kiện "WHERE score >= 50 OR score < 50" sẽ trả về gì?'
        },
        options: [
          { en: 'TRUE (all numbers are >= 50 or < 50)', vi: 'TRUE (mọi số đều >= 50 hoặc < 50)' },
          { en: 'UNKNOWN (neither condition evaluates to TRUE)', vi: 'UNKNOWN (không có điều kiện nào đánh giá ra TRUE)' },
          { en: 'FALSE', vi: 'FALSE' },
          { en: 'Syntax Error', vi: 'Lỗi cú pháp' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'NULL >= 50 is UNKNOWN. NULL < 50 is UNKNOWN. UNKNOWN OR UNKNOWN = UNKNOWN. Thus, the row is excluded by WHERE!',
          vi: 'NULL >= 50 là UNKNOWN. NULL < 50 là UNKNOWN. UNKNOWN OR UNKNOWN = UNKNOWN. Do đó dòng này bị WHERE loại bỏ hoàn toàn!'
        }
      },
      {
        id: 'sql_q_3_12',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'easy',
        question: {
          en: 'What is the SQL standard operator to check that a column contains a valid non-null value?',
          vi: 'Toán tử chuẩn SQL để kiểm tra một cột có chứa giá trị hợp lệ không phải null là gì?'
        },
        options: [
          { en: 'IS NOT NULL', vi: 'IS NOT NULL' },
          { en: '!= NULL', vi: '!= NULL' },
          { en: 'IS DEFINED', vi: 'IS DEFINED' },
          { en: 'NOT NULL', vi: 'NOT NULL' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'IS NOT NULL is the ANSI standard predicate for testing non-null values.',
          vi: 'IS NOT NULL là toán tử chuẩn ANSI để kiểm tra các giá trị không bị null.'
        }
      },
      {
        id: 'sql_q_3_13',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'medium',
        question: {
          en: 'What does "SELECT COUNT(email) FROM students;" count?',
          vi: 'Câu lệnh "SELECT COUNT(email) FROM students;" đếm cái gì?'
        },
        options: [
          { en: 'All rows in the students table', vi: 'Tất cả các dòng trong bảng students' },
          { en: 'Only rows where the email column is NOT NULL', vi: 'Chỉ các dòng có cột email KHÁC NULL' },
          { en: 'Only unique emails', vi: 'Chỉ các email duy nhất' },
          { en: 'Only rows where email is NULL', vi: 'Chỉ các dòng có email là NULL' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'COUNT(column) counts only rows where the specified column is not NULL.',
          vi: 'COUNT(tên_cột) chỉ đếm các dòng mà cột đó có giá trị khác NULL.'
        }
      },
      {
        id: 'sql_q_3_14',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'hard',
        question: {
          en: 'What is the result of: TRUE OR UNKNOWN in 3VL?',
          vi: 'Kết quả của biểu thức: TRUE OR UNKNOWN trong logic 3VL là gì?'
        },
        options: [
          { en: 'TRUE', vi: 'TRUE' },
          { en: 'UNKNOWN', vi: 'UNKNOWN' },
          { en: 'FALSE', vi: 'FALSE' },
          { en: 'NULL', vi: 'NULL' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Because at least one operand of the OR is TRUE, the whole expression is guaranteed TRUE regardless of the unknown state.',
          vi: 'Vì có một toán hạng của phép OR là TRUE, nên toàn bộ biểu thức chắc chắn là TRUE bất kể giá trị chưa biết kia là gì.'
        }
      },
      {
        id: 'sql_q_3_15',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'medium',
        question: {
          en: 'In SQL standard, how does NULLIF(10, 20) evaluate?',
          vi: 'Theo chuẩn SQL, biểu thức NULLIF(10, 20) trả về giá trị gì?'
        },
        options: [
          { en: '10', vi: '10' },
          { en: '20', vi: '20' },
          { en: 'NULL', vi: 'NULL' },
          { en: '-10', vi: '-10' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Since 10 != 20, NULLIF returns the first argument: 10.',
          vi: 'Vì 10 khác 20, NULLIF trả về đối số đầu tiên là 10.'
        }
      },
      {
        id: 'sql_q_3_16',
        type: 'single_choice',
        topicId: 'sql_null',
        difficulty: 'hard',
        question: {
          en: 'What is the modern standard replacement for "WHERE col NOT IN (SELECT ...)" to safely avoid the NOT IN NULL trap?',
          vi: 'Giải pháp chuẩn hiện đại thay thế cho "WHERE col NOT IN (SELECT ...)" để tránh bẫy NOT IN NULL là gì?'
        },
        options: [
          { en: 'WHERE NOT EXISTS (SELECT 1 FROM ... WHERE ...)', vi: 'WHERE NOT EXISTS (SELECT 1 FROM ... WHERE ...)' },
          { en: 'WHERE col != ALL (SELECT ...)', vi: 'WHERE col != ALL (SELECT ...)' },
          { en: 'WHERE col IN (SELECT NOT ...)', vi: 'WHERE col IN (SELECT NOT ...)' },
          { en: 'WHERE col IS NOT (SELECT ...)', vi: 'WHERE col IS NOT (SELECT ...)' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'NOT EXISTS utilizes two-valued correlation semantics (exists or does not exist), rendering it completely immune to NULL values in the target subquery.',
          vi: 'NOT EXISTS sử dụng ngữ nghĩa nhị trị (tồn tại hoặc không tồn tại), hoàn toàn miễn nhiễm với sự xuất hiện của giá trị NULL trong truy vấn con.'
        }
      }
    ]
  },

  // LESSON 4: Sorting & Result Pagination: ORDER BY, NULLS Order & LIMIT
  {
    id: 'sql_lesson_4',
    moduleId: 'sql_mod_1',
    levelId: 'basic',
    courseId: 'sql',
    order: 4,
    topicId: 'sql_order_limit',
    title: {
      en: 'Sorting & Result Pagination: ORDER BY, NULLS Order & LIMIT',
      vi: 'Sắp Xếp & Phân Trang Kết Quả: ORDER BY, Vị Trí NULL & LIMIT'
    },
    summary: {
      en: 'Master multi-column sorting with ASC/DESC, deterministic tie-breakers, NULL sorting mechanics (NULLS FIRST / NULLS LAST), and paginating data with LIMIT and OFFSET.',
      vi: 'Làm chủ sắp xếp đa cột với ASC/DESC, xử lý hòa điểm (tie-breaker), cơ chế sắp xếp giá trị NULL (NULLS FIRST / NULLS LAST) và phân trang dữ liệu bằng LIMIT và OFFSET.'
    },
    estimatedMinutes: 15,
    learn: {
      introduction: {
        en: 'By relational definition, rows in a table have no inherent physical order. Without an explicit ORDER BY clause, the database engine returns records in arbitrary order. ORDER BY guarantees a deterministic, reproducible result sequence.',
        vi: 'Theo định nghĩa mô hình quan hệ, các hàng trong bảng không có thứ tự vật lý cố định. Nếu không có mệnh đề ORDER BY rõ ràng, hệ thống cơ sở dữ liệu sẽ trả về kết quả ngẫu nhiên. ORDER BY đảm bảo thứ tự dữ liệu có tính xác định và nhất quán.'
      },
      conceptExplanation: {
        en: 'Sort records using ORDER BY column1 [ASC|DESC], column2 [ASC|DESC]. Sorting precedence resolves left to right. When multiple rows share identical sort keys, always include a unique tie-breaker column (such as primary key id) to ensure deterministic pagination. To control where NULLs appear, standard ANSI SQL supports NULLS FIRST and NULLS LAST (in SQLite/MySQL, NULLs are treated as the lowest possible values in ASC order). For pagination, use LIMIT n OFFSET m (or OFFSET-FETCH).',
        vi: 'Sắp xếp dữ liệu bằng ORDER BY cột1 [ASC|DESC], cột2 [ASC|DESC]. Thứ tự ưu tiên sắp xếp từ trái qua phải. Khi nhiều hàng có giá trị sắp xếp bằng nhau, hãy luôn bổ sung cột khóa chính (ví dụ: id) làm tie-breaker để phân trang ổn định. Để kiểm soát vị trí của NULL, chuẩn ANSI SQL hỗ trợ NULLS FIRST và NULLS LAST (trong SQLite, NULL được coi là giá trị nhỏ nhất khi xếp ASC). Để phân trang, sử dụng LIMIT n OFFSET m.'
      },
      syntax: `SELECT column1, column2
FROM table_name
ORDER BY column1 DESC, column2 ASC
LIMIT page_size OFFSET offset_count;`,
      examples: [
        {
          title: {
            en: '1. Multi-Column Sorting with Deterministic Tie-Breaker',
            vi: '1. Sắp Xếp Đa Cột Với Khóa Phụ Nhất Quán'
          },
          code: `SELECT id, name, course, score
FROM students
ORDER BY course ASC, score DESC, id ASC;`,
          language: 'sql',
          explanation: {
            en: 'Groups students by course alphabetically, then sorts highest scores first within each course, using id as a deterministic tie-breaker.',
            vi: 'Gom học viên theo khóa học theo thứ tự bảng chữ cái, sau đó xếp điểm cao nhất trước trong từng khóa, và dùng id làm tie-breaker nếu điểm bằng nhau.'
          }
        },
        {
          title: {
            en: '2. Paginating Top Scores with LIMIT and OFFSET',
            vi: '2. Phân Trang Điểm Cao Với LIMIT và OFFSET'
          },
          code: `SELECT name, score
FROM students
ORDER BY score DESC, id ASC
LIMIT 3 OFFSET 3;`,
          language: 'sql',
          explanation: {
            en: 'Fetches Page 2 of leaderboard rankings (items 4, 5, and 6) by skipping the first 3 rows.',
            vi: 'Lấy Trang 2 của bảng xếp hạng điểm (các vị trí 4, 5, 6) bằng cách bỏ qua 3 dòng đầu tiên.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Paginating with LIMIT/OFFSET without an explicit ORDER BY clause',
            vi: 'Phân trang bằng LIMIT/OFFSET mà không có mệnh đề ORDER BY rõ ràng'
          },
          correction: {
            en: 'Without ORDER BY, the RDBMS can return rows in different order on every query call, leading to missing or duplicated items across pages.',
            vi: 'Không có ORDER BY, CSDL có thể trả về các dòng theo thứ tự khác nhau giữa các lần gọi, khiến dữ liệu bị trùng hoặc sót giữa các trang.'
          },
          code: `-- BAD (Non-deterministic): SELECT name FROM students LIMIT 5 OFFSET 5;
-- GOOD (Deterministic):
SELECT name FROM students ORDER BY score DESC, id ASC LIMIT 5 OFFSET 5;`
        },
        {
          mistake: {
            en: 'Referencing an unprojected alias incorrectly in ORDER BY',
            vi: 'Dùng sai bí danh cột khi sắp xếp'
          },
          correction: {
            en: 'ORDER BY executes AFTER SELECT, so column aliases defined in SELECT ARE valid in ORDER BY.',
            vi: 'ORDER BY thực thi SAU SELECT, do đó các bí danh cột định nghĩa trong SELECT HOÀN TOÀN HỢP LỆ trong ORDER BY.'
          },
          code: `SELECT name, (score * 1.1) AS bonus_score
FROM students
ORDER BY bonus_score DESC;`
        }
      ],
      tips: [
        {
          en: 'ASC (ascending: low to high / A-Z) is the default sort direction if omitted.',
          vi: 'ASC (tăng dần: từ thấp đến cao / A-Z) là hướng sắp xếp mặc định nếu không khai báo.'
        },
        {
          en: 'For very large datasets (millions of rows), keyset pagination (WHERE id > last_seen_id ORDER BY id LIMIT 20) is vastly faster than high OFFSETs.',
          vi: 'Với tập dữ liệu lớn hàng triệu dòng, phân trang dạng Keyset (WHERE id > last_seen_id ORDER BY id LIMIT 20) nhanh hơn nhiều so với dùng OFFSET lớn.'
        }
      ],
      practiceStarterCode: `-- Sort students by score descending, then name ascending
SELECT name, score FROM students ORDER BY score DESC, name ASC;`,
      practice: {
        task: {
          en: 'Write a query to fetch the top 2 highest scoring students in the "Python" course.',
          vi: 'Viết truy vấn lấy 2 học viên có điểm cao nhất trong khóa "Python".'
        },
        starterCode: `-- Top 2 Python students
SELECT name, course, score FROM students
WHERE course = 'Python';`,
        solutionCode: `SELECT name, course, score FROM students WHERE course = 'Python' ORDER BY score DESC, id ASC LIMIT 2;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_4_1',
        type: 'fix_code',
        title: {
          en: 'Fix Sort Direction for Leaderboard',
          vi: 'Sửa Hướng Sắp Xếp Bảng Xếp Hạng'
        },
        instruction: {
          en: 'The query currently sorts scores from lowest to highest. Change it to sort from highest to lowest (DESC).',
          vi: 'Truy vấn đang xếp điểm từ thấp lên cao. Hãy sửa lại để xếp điểm từ cao xuống thấp (DESC).'
        },
        starterCode: 'SELECT name, score FROM students ORDER BY score ASC;',
        solutionCode: 'SELECT name, score FROM students ORDER BY score DESC;',
        hint: {
          en: 'Change ASC to DESC.',
          vi: 'Đổi ASC thành DESC.'
        },
        explanation: {
          en: 'DESC sorts values in descending order (highest first).',
          vi: 'DESC sắp xếp các giá trị theo thứ tự giảm dần (lớn nhất đứng trước).'
        }
      },
      {
        id: 'sql_ex_4_2',
        type: 'complete_code',
        title: {
          en: 'Add LIMIT and OFFSET for Page 2',
          vi: 'Thêm LIMIT và OFFSET Cho Trang 2'
        },
        instruction: {
          en: 'Complete the query to retrieve page 2 of products with page size 5 (skip 5, take 5).',
          vi: 'Hoàn thiện câu lệnh để lấy trang 2 của danh sách sản phẩm với kích thước trang là 5 (bỏ qua 5, lấy 5).'
        },
        starterCode: 'SELECT order_id, product, amount FROM orders ORDER BY amount DESC LIMIT  OFFSET ;',
        solutionCode: 'SELECT order_id, product, amount FROM orders ORDER BY amount DESC LIMIT 5 OFFSET 5;',
        hint: {
          en: 'Fill in 5 for LIMIT and 5 for OFFSET.',
          vi: 'Điền 5 cho LIMIT và 5 cho OFFSET.'
        },
        explanation: {
          en: 'LIMIT 5 OFFSET 5 skips the first 5 records and returns the next 5.',
          vi: 'LIMIT 5 OFFSET 5 bỏ qua 5 bản ghi đầu tiên và lấy 5 bản ghi tiếp theo.'
        }
      },
      {
        id: 'sql_ex_4_3',
        type: 'write_code',
        title: {
          en: 'Top 3 Highest Paid Employees',
          vi: 'Top 3 Nhân Viên Lương Cao Nhất'
        },
        instruction: {
          en: 'Write a query to retrieve emp_name and salary for the 3 highest paid employees, ordered by salary DESC, emp_id ASC.',
          vi: 'Viết truy vấn lấy emp_name và salary của 3 nhân viên lương cao nhất, sắp xếp theo salary DESC, emp_id ASC.'
        },
        starterCode: '-- Top 3 employees by salary\n',
        solutionCode: 'SELECT emp_name, salary FROM employees ORDER BY salary DESC, emp_id ASC LIMIT 3;',
        hint: {
          en: 'Use ORDER BY salary DESC, emp_id ASC LIMIT 3;',
          vi: 'Sử dụng ORDER BY salary DESC, emp_id ASC LIMIT 3;'
        },
        explanation: {
          en: 'Combines descending salary sorting with emp_id as a deterministic tie-breaker and LIMIT 3.',
          vi: 'Kết hợp sắp xếp lương giảm dần với emp_id làm khóa phụ và giới hạn LIMIT 3.'
        }
      },
      {
        id: 'sql_ex_4_4',
        type: 'modify_example',
        title: {
          en: 'Multi-Level Hierarchical Ordering',
          vi: 'Sắp Xếp Phân Cấp Đa Cột'
        },
        instruction: {
          en: 'Order students first by city ASC, then by score DESC within each city.',
          vi: 'Sắp xếp học viên trước hết theo city ASC, sau đó theo score DESC trong từng thành phố.'
        },
        starterCode: 'SELECT name, city, score FROM students;',
        solutionCode: 'SELECT name, city, score FROM students ORDER BY city ASC, score DESC;',
        hint: {
          en: 'Add ORDER BY city ASC, score DESC;',
          vi: 'Thêm ORDER BY city ASC, score DESC;'
        },
        explanation: {
          en: 'Multi-column ORDER BY applies secondary criteria when primary column values collide.',
          vi: 'ORDER BY đa cột áp dụng tiêu chí thứ hai khi các giá trị ở cột thứ nhất trùng nhau.'
        }
      },
      {
        id: 'sql_ex_4_5',
        type: 'predict_output',
        title: {
          en: 'Predict OFFSET Skip Count',
          vi: 'Dự Đoán Số Bản Ghi Bị Bỏ Qua Bởi OFFSET'
        },
        instruction: {
          en: 'If a query has "LIMIT 10 OFFSET 30", which row range from the ordered dataset is returned (1-indexed)?',
          vi: 'Nếu câu lệnh có "LIMIT 10 OFFSET 30", khoảng dòng nào (tính từ 1) sẽ được trả về?'
        },
        starterCode: '-- Row range for LIMIT 10 OFFSET 30\n',
        solutionCode: 'SELECT name FROM students ORDER BY id LIMIT 10 OFFSET 30;',
        options: ['Rows 31 through 40', 'Rows 1 through 10', 'Rows 30 through 40', 'Rows 21 through 30'],
        correctOptionIndex: 0,
        hint: {
          en: 'OFFSET 30 skips rows 1..30, returning rows 31..40.',
          vi: 'OFFSET 30 bỏ qua dòng 1..30, lấy dòng 31..40.'
        },
        explanation: {
          en: 'OFFSET 30 skips the first 30 rows, and LIMIT 10 extracts the subsequent 10 rows (rows 31 to 40).',
          vi: 'OFFSET 30 bỏ qua 30 dòng đầu tiên, và LIMIT 10 lấy 10 dòng kế tiếp (từ dòng 31 đến 40).'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_4',
      title: {
        en: 'Regional Leaderboard Page 1 Query',
        vi: 'Truy Vấn Trang 1 Bảng Xếp Hạng Khu Vực'
      },
      description: {
        en: 'Write a SQL query that retrieves the top 3 highest scoring students from "Hanoi" or "Da Nang". Output their id, name, city, and score, sorted by score DESC, followed by id ASC as a tie-breaker.',
        vi: 'Viết truy vấn SQL lấy top 3 học viên có điểm cao nhất đến từ "Hanoi" hoặc "Da Nang". Xuất id, name, city và score, sắp xếp theo score DESC và id ASC làm khóa phụ.'
      },
      requirements: [
        {
          en: 'Select id, name, city, score from students',
          vi: 'Chọn id, name, city, score từ bảng students'
        },
        {
          en: 'Filter city IN (\'Hanoi\', \'Da Nang\')',
          vi: 'Lọc city IN (\'Hanoi\', \'Da Nang\')'
        },
        {
          en: 'Order by score DESC, id ASC',
          vi: 'Sắp xếp theo score DESC, id ASC'
        },
        {
          en: 'Limit to exactly 3 rows',
          vi: 'Giới hạn chính xác 3 dòng kết quả'
        }
      ],
      starterCode: `-- Write your SQL query below
SELECT id, name, city, score
FROM students
WHERE ;`,
      solutionCode: `SELECT id, name, city, score FROM students WHERE city IN ('Hanoi', 'Da Nang') ORDER BY score DESC, id ASC LIMIT 3;`,
      hints: [
        {
          en: 'Combine WHERE city IN (\'Hanoi\', \'Da Nang\') with ORDER BY score DESC, id ASC LIMIT 3.',
          vi: 'Kết hợp WHERE city IN (\'Hanoi\', \'Da Nang\') với ORDER BY score DESC, id ASC LIMIT 3.'
        }
      ],
      solutionExplanation: {
        en: 'Filters regional participants, orders them by merit with deterministic tie-breaking, and caps the result set to the podium size.',
        vi: 'Lọc học viên theo vùng, sắp xếp theo thành tích với khóa phụ nhất quán và giới hạn lấy top 3.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_4_v1',
        title: {
          en: 'Regional Leaderboard Page 1 Query',
          vi: 'Truy Vấn Trang 1 Bảng Xếp Hạng Khu Vực'
        },
        description: {
          en: 'Retrieve top 3 scoring students from Hanoi or Da Nang, ordered by score DESC, id ASC.',
          vi: 'Lấy top 3 sinh viên điểm cao nhất từ Hanoi hoặc Da Nang, xếp theo score DESC, id ASC.'
        },
        requirements: [
          {
            en: 'Filter city IN (\'Hanoi\', \'Da Nang\') and LIMIT 3',
            vi: 'Lọc city IN (\'Hanoi\', \'Da Nang\') và LIMIT 3'
          }
        ],
        starterCode: `SELECT id, name, city, score FROM students WHERE ;`,
        solutionCode: `SELECT id, name, city, score FROM students WHERE city IN ('Hanoi', 'Da Nang') ORDER BY score DESC, id ASC LIMIT 3;`,
        hints: [
          {
            en: 'ORDER BY score DESC, id ASC LIMIT 3',
            vi: 'ORDER BY score DESC, id ASC LIMIT 3'
          }
        ],
        solutionExplanation: {
          en: 'Paginates top regional competitors.',
          vi: 'Phân trang danh sách thí sinh hàng đầu khu vực.'
        }
      },
      {
        id: 'sql_ch_4_v2',
        title: {
          en: 'Top High-Value Completed Purchases',
          vi: 'Top Đơn Hàng Hoàn Thành Giá Trị Cao Nhất'
        },
        description: {
          en: 'Select order_id, customer_name, amount from orders where status = \'completed\' ordered by amount DESC, order_id ASC LIMIT 2.',
          vi: 'Chọn order_id, customer_name, amount từ orders với status = \'completed\' sắp xếp theo amount DESC, order_id ASC LIMIT 2.'
        },
        requirements: [
          {
            en: 'Filter status = \'completed\'',
            vi: 'Lọc status = \'completed\''
          },
          {
            en: 'ORDER BY amount DESC, order_id ASC LIMIT 2',
            vi: 'ORDER BY amount DESC, order_id ASC LIMIT 2'
          }
        ],
        starterCode: `SELECT order_id, customer_name, amount FROM orders WHERE ;`,
        solutionCode: `SELECT order_id, customer_name, amount FROM orders WHERE status = 'completed' ORDER BY amount DESC, order_id ASC LIMIT 2;`,
        hints: [
          {
            en: 'WHERE status = \'completed\' ORDER BY amount DESC, order_id ASC LIMIT 2',
            vi: 'WHERE status = \'completed\' ORDER BY amount DESC, order_id ASC LIMIT 2'
          }
        ],
        solutionExplanation: {
          en: 'Extracts the top 2 highest value completed purchase records.',
          vi: 'Trích xuất 2 đơn hàng hoàn thành có giá trị lớn nhất.'
        }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_4_1',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'easy',
        question: {
          en: 'What is the default sort direction in an ORDER BY clause if not specified?',
          vi: 'Chiều sắp xếp mặc định trong mệnh đề ORDER BY nếu không ghi rõ là gì?'
        },
        options: [
          { en: 'ASC (Ascending)', vi: 'ASC (Tăng dần)' },
          { en: 'DESC (Descending)', vi: 'DESC (Giảm dần)' },
          { en: 'RANDOM', vi: 'RANDOM (Ngẫu nhiên)' },
          { en: 'Insertion order', vi: 'Thứ tự chèn bản ghi' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'ASC is the default ordering direction in standard ANSI SQL.',
          vi: 'ASC là hướng sắp xếp mặc định trong chuẩn ANSI SQL.'
        }
      },
      {
        id: 'sql_q_4_2',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'medium',
        question: {
          en: 'Why is it critical to include a unique column (tie-breaker) in an ORDER BY clause when implementing pagination?',
          vi: 'Tại sao việc thêm cột có giá trị duy nhất (tie-breaker) vào ORDER BY lại cực kỳ quan trọng khi làm phân trang?'
        },
        options: [
          { en: 'To guarantee deterministic row ordering so items do not shift between pages', vi: 'Để đảm bảo thứ tự các dòng có tính xác định, tránh việc bản ghi bị nhảy hoặc trùng giữa các trang' },
          { en: 'Because SQL throws an error without a primary key in ORDER BY', vi: 'Vì SQL sẽ báo lỗi nếu không có khóa chính trong ORDER BY' },
          { en: 'To automatically speed up disk I/O', vi: 'Để tự động tăng tốc I/O đĩa' },
          { en: 'To force all NULLs to the bottom', vi: 'Để ép tất cả NULL xuống cuối' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Deterministic sorting ensures that pagination queries return stable, non-overlapping slices of data.',
          vi: 'Sắp xếp có tính xác định đảm bảo các truy vấn phân trang trả về các phần dữ liệu ổn định, không bị trùng lặp.'
        }
      },
      {
        id: 'sql_q_4_3',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'easy',
        question: {
          en: 'Which clause limits the number of rows returned by a query in SQLite and PostgreSQL?',
          vi: 'Mệnh đề nào giới hạn số lượng dòng kết quả trả về trong SQLite và PostgreSQL?'
        },
        options: [
          { en: 'TOP', vi: 'TOP' },
          { en: 'LIMIT', vi: 'LIMIT' },
          { en: 'FETCH_FIRST', vi: 'FETCH_FIRST' },
          { en: 'ROWCOUNT', vi: 'ROWCOUNT' }
        ],
        correctAnswers: [1],
        explanation: {
          en: 'LIMIT n restricts the output to at most n rows.',
          vi: 'LIMIT n giới hạn số dòng đầu ra tối đa là n dòng.'
        }
      },
      {
        id: 'sql_q_4_4',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'medium',
        question: {
          en: 'In "ORDER BY department ASC, salary DESC", how are rows sorted?',
          vi: 'Trong "ORDER BY department ASC, salary DESC", các dòng được sắp xếp như thế nào?'
        },
        options: [
          { en: 'First by department alphabetically; within the same department, highest salary first', vi: 'Trước tiên theo tên phòng ban (A-Z); trong cùng phòng ban, lương cao nhất xếp trước' },
          { en: 'First by salary highest to lowest, then by department', vi: 'Trước tiên theo lương từ cao đến thấp, sau đó mới theo phòng ban' },
          { en: 'Only by salary DESC', vi: 'Chỉ sắp xếp theo salary DESC' },
          { en: 'Randomly', vi: 'Ngẫu nhiên' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'ORDER BY resolves priorities sequentially from left to right.',
          vi: 'ORDER BY giải quyết các tiêu chí ưu tiên tuần tự từ trái qua phải.'
        }
      },
      {
        id: 'sql_q_4_5',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'hard',
        question: {
          en: 'In standard ANSI SQL, what is the default position of NULL values when sorting ASC vs DESC?',
          vi: 'Trong chuẩn ANSI SQL, vị trí mặc định của giá trị NULL khi sắp xếp ASC và DESC là gì?'
        },
        options: [
          { en: 'ASC: NULLs First; DESC: NULLs Last (or DB specific, controlled via NULLS FIRST / NULLS LAST)', vi: 'ASC: NULLs First; DESC: NULLs Last (hoặc tùy thuộc DB, kiểm soát bằng NULLS FIRST / NULLS LAST)' },
          { en: 'NULLs are always removed automatically', vi: 'NULL luôn bị tự động loại bỏ' },
          { en: 'NULLs always appear at index 0 regardless of direction', vi: 'NULL luôn luôn đứng ở vị trí đầu tiên' },
          { en: 'NULLs cause a runtime sort exception', vi: 'NULL gây lỗi ngoại lệ khi sắp xếp' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'PostgreSQL defaults to NULLS LAST for ASC and NULLS FIRST for DESC. SQLite treats NULL as the lowest value (appears first in ASC). ANSI SQL provides NULLS FIRST/LAST to be explicit.',
          vi: 'PostgreSQL mặc định NULLS LAST cho ASC và NULLS FIRST cho DESC. SQLite coi NULL là nhỏ nhất (đứng đầu khi ASC). ANSI SQL cung cấp NULLS FIRST/LAST để kiểm soát chính xác.'
        }
      },
      {
        id: 'sql_q_4_6',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'easy',
        question: {
          en: 'Which query retrieves page 3 of a list with 20 items per page?',
          vi: 'Truy vấn nào lấy trang thứ 3 của danh sách với mỗi trang có 20 phần tử?'
        },
        options: [
          { en: 'LIMIT 20 OFFSET 40', vi: 'LIMIT 20 OFFSET 40' },
          { en: 'LIMIT 20 OFFSET 60', vi: 'LIMIT 20 OFFSET 60' },
          { en: 'LIMIT 3 OFFSET 20', vi: 'LIMIT 3 OFFSET 20' },
          { en: 'LIMIT 40 OFFSET 20', vi: 'LIMIT 40 OFFSET 20' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Page 1: OFFSET 0, Page 2: OFFSET 20, Page 3: OFFSET 40 ((page - 1) * page_size).',
          vi: 'Trang 1: OFFSET 0, Trang 2: OFFSET 20, Trang 3: OFFSET 40 (công thức: (page - 1) * page_size).'
        }
      },
      {
        id: 'sql_q_4_7',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'medium',
        question: {
          en: 'Can you use a column alias in the ORDER BY clause?',
          vi: 'Bạn có thể sử dụng bí danh cột trong mệnh đề ORDER BY không?'
        },
        options: [
          { en: 'Yes, because ORDER BY is logically evaluated after SELECT', vi: 'Có, vì ORDER BY được xử lý logic sau mệnh đề SELECT' },
          { en: 'No, aliases are only visible to client applications', vi: 'Không, bí danh chỉ hiển thị ở ứng dụng ngoài' },
          { en: 'Only if the alias is in uppercase', vi: 'Chỉ khi bí danh viết in hoa' },
          { en: 'Only for string columns', vi: 'Chỉ áp dụng cho cột kiểu chuỗi' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'In SQL execution order, ORDER BY evaluates after SELECT, so projection aliases are accessible.',
          vi: 'Trong thứ tự thực thi SQL, ORDER BY chạy sau SELECT nên hoàn toàn nhận diện được các bí danh cột.'
        }
      },
      {
        id: 'sql_q_4_8',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'hard',
        question: {
          en: 'Why does "OFFSET 1000000 LIMIT 20" perform poorly on large database tables?',
          vi: 'Tại sao "OFFSET 1000000 LIMIT 20" lại chạy rất chậm trên các bảng cơ sở dữ liệu lớn?'
        },
        options: [
          { en: 'The database engine must scan and discard 1,000,000 rows before returning the 20 target rows', vi: 'Hệ quản trị CSDL phải đọc và bỏ qua 1.000.000 dòng trước khi trả về 20 dòng mục tiêu' },
          { en: 'OFFSET is not supported by B-Tree indexes', vi: 'OFFSET không được hỗ trợ bởi chỉ mục B-Tree' },
          { en: 'It locks the entire database instance', vi: 'Nó khóa toàn bộ hệ thống cơ sở dữ liệu' },
          { en: 'It causes integer overflow', vi: 'Nó gây tràn số nguyên' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'High OFFSETs require the engine to traverse and discard all skipped rows. Keyset pagination avoids this by filtering with index predicates directly.',
          vi: 'OFFSET lớn buộc CSDL phải duyệt qua và loại bỏ toàn bộ số dòng bỏ qua. Kỹ thuật Keyset pagination giải quyết vấn đề này bằng cách lọc trực tiếp trên chỉ mục.'
        }
      },
      {
        id: 'sql_q_4_9',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'easy',
        question: {
          en: 'What happens if OFFSET is specified without LIMIT in SQLite?',
          vi: 'Điều gì xảy ra nếu chỉ định OFFSET mà không có LIMIT trong SQLite?'
        },
        options: [
          { en: 'It causes a syntax error (LIMIT -1 OFFSET n can be used if all remaining rows are needed)', vi: 'Gây lỗi cú pháp (phải dùng LIMIT -1 OFFSET n nếu muốn lấy toàn bộ các dòng còn lại)' },
          { en: 'It defaults to returning 1 row', vi: 'Mặc định trả về 1 dòng' },
          { en: 'It ignores OFFSET', vi: 'Bỏ qua OFFSET' },
          { en: 'It sorts randomly', vi: 'Sắp xếp ngẫu nhiên' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'In SQLite, OFFSET requires a preceding LIMIT clause (use LIMIT -1 OFFSET n for unlimited).',
          vi: 'Trong SQLite, OFFSET bắt buộc phải đi kèm LIMIT (dùng LIMIT -1 OFFSET n nếu muốn lấy không giới hạn).'
        }
      },
      {
        id: 'sql_q_4_10',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'medium',
        question: {
          en: 'What does "ORDER BY 2 DESC" mean in SQL?',
          vi: 'Cú pháp "ORDER BY 2 DESC" có ý nghĩa gì trong SQL?'
        },
        options: [
          { en: 'Sort by the second column listed in the SELECT clause in descending order', vi: 'Sắp xếp theo cột thứ 2 được liệt kê trong mệnh đề SELECT theo chiều giảm dần' },
          { en: 'Sort twice', vi: 'Sắp xếp hai lần' },
          { en: 'Sort by the constant number 2', vi: 'Sắp xếp theo số hằng 2' },
          { en: 'Return only 2 rows', vi: 'Chỉ trả về 2 dòng' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Positional ordering references the 1-based index of the projection column in SELECT.',
          vi: 'Sắp xếp theo vị trí tham chiếu đến số thứ tự cột (bắt đầu từ 1) trong mệnh đề SELECT.'
        }
      },
      {
        id: 'sql_q_4_11',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'medium',
        question: {
          en: 'Which SQL clause is executed LAST in the logical query processing cycle?',
          vi: 'Mệnh đề SQL nào được thực thi CUỐI CÙNG trong chu trình xử lý logic của một truy vấn?'
        },
        options: [
          { en: 'FROM', vi: 'FROM' },
          { en: 'WHERE', vi: 'WHERE' },
          { en: 'SELECT', vi: 'SELECT' },
          { en: 'ORDER BY / LIMIT', vi: 'ORDER BY / LIMIT' }
        ],
        correctAnswers: [3],
        explanation: {
          en: 'ORDER BY and LIMIT execute at the very end of the logical query lifecycle to format output presentation.',
          vi: 'ORDER BY và LIMIT được thực thi ở giai đoạn cuối cùng để định hình tập kết quả trả về.'
        }
      },
      {
        id: 'sql_q_4_12',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'easy',
        question: {
          en: 'How to sort strings in alphabetical order from Z to A?',
          vi: 'Làm thế nào để sắp xếp các chuỗi ký tự theo thứ tự ngược bảng chữ cái từ Z đến A?'
        },
        options: [
          { en: 'ORDER BY column_name DESC', vi: 'ORDER BY column_name DESC' },
          { en: 'ORDER BY column_name ASC', vi: 'ORDER BY column_name ASC' },
          { en: 'ORDER BY column_name REVERSE', vi: 'ORDER BY column_name REVERSE' },
          { en: 'ORDER BY column_name INVERT', vi: 'ORDER BY column_name INVERT' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'DESC reverses lexicographical ordering, placing Z before A.',
          vi: 'DESC đảo ngược thứ tự từ điển, xếp chữ Z trước chữ A.'
        }
      },
      {
        id: 'sql_q_4_13',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'hard',
        question: {
          en: 'In SQLite, how can you emulate "NULLS LAST" when sorting a column in ASC order?',
          vi: 'Trong SQLite, làm thế nào để mô phỏng tính năng "NULLS LAST" khi sắp xếp một cột theo ASC?'
        },
        options: [
          { en: 'ORDER BY (column IS NULL), column ASC', vi: 'ORDER BY (column IS NULL), column ASC' },
          { en: 'ORDER BY column ASC NULLS_END', vi: 'ORDER BY column ASC NULLS_END' },
          { en: 'ORDER BY COALESCE(column, 0)', vi: 'ORDER BY COALESCE(column, 0)' },
          { en: 'ORDER BY column DROP_NULLS', vi: 'ORDER BY column DROP_NULLS' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'The expression (column IS NULL) evaluates to 0 for non-nulls and 1 for nulls. Sorting by this first puts all 0s (valid data) before 1s (nulls).',
          vi: 'Biểu thức (column IS NULL) trả về 0 nếu có giá trị và 1 nếu là null. Sắp xếp biểu thức này trước sẽ đưa toàn bộ số 0 lên trước số 1 (đẩy null xuống cuối).'
        }
      },
      {
        id: 'sql_q_4_14',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'medium',
        question: {
          en: 'What is the effect of "LIMIT 0" in SQL?',
          vi: 'Tác dụng của "LIMIT 0" trong SQL là gì?'
        },
        options: [
          { en: 'Returns the schema structure (column metadata) with 0 data rows', vi: 'Trả về cấu trúc schema (metadata cột) với 0 dòng dữ liệu' },
          { en: 'Returns all rows', vi: 'Trả về tất cả các dòng' },
          { en: 'Deletes table contents', vi: 'Xóa toàn bộ nội dung bảng' },
          { en: 'Throws a syntax error', vi: 'Báo lỗi cú pháp' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'LIMIT 0 returns empty results instantly, useful for verifying query validity or schema types.',
          vi: 'LIMIT 0 trả về kết quả rỗng ngay lập tức, thường dùng để kiểm tra tính hợp lệ của câu lệnh hoặc kiểu dữ liệu các cột.'
        }
      },
      {
        id: 'sql_q_4_15',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'easy',
        question: {
          en: 'What does "ORDER BY random()" do in SQLite?',
          vi: 'Cú pháp "ORDER BY random()" làm gì trong SQLite?'
        },
        options: [
          { en: 'Returns the result set in randomized row order', vi: 'Trả về tập kết quả với thứ tự các dòng được xáo trộn ngẫu nhiên' },
          { en: 'Generates random values inside table columns', vi: 'Tạo giá trị ngẫu nhiên vào trong các cột của bảng' },
          { en: 'Deletes random rows', vi: 'Xóa các dòng ngẫu nhiên' },
          { en: 'Selects a random table', vi: 'Chọn một bảng ngẫu nhiên' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'ORDER BY random() shuffles the rows before returning.',
          vi: 'ORDER BY random() xáo trộn ngẫu nhiên các dòng trước khi trả về kết quả.'
        }
      },
      {
        id: 'sql_q_4_16',
        type: 'single_choice',
        topicId: 'sql_order_limit',
        difficulty: 'hard',
        question: {
          en: 'Which index structure can eliminate the need for a separate sort step (in-memory sort) for "ORDER BY department ASC, score DESC"?',
          vi: 'Cấu trúc chỉ mục nào có thể loại bỏ hoàn toàn bước sắp xếp trong bộ nhớ cho câu lệnh "ORDER BY department ASC, score DESC"?'
        },
        options: [
          { en: 'A composite B-Tree index on (department ASC, score DESC)', vi: 'Một chỉ mục B-Tree kết hợp trên (department ASC, score DESC)' },
          { en: 'A single index on department only', vi: 'Một chỉ mục đơn trên cột department' },
          { en: 'A single index on score only', vi: 'Một chỉ mục đơn trên cột score' },
          { en: 'A hash index on department', vi: 'Một chỉ mục hash trên cột department' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'A composite index matching the exact columns and sort directions allows the database to read records directly in pre-sorted order.',
          vi: 'Chỉ mục kết hợp khớp chính xác thứ tự và chiều sắp xếp giúp CSDL đọc thẳng dữ liệu theo thứ tự đã sắp xếp mà không cần sort lại.'
        }
      }
    ]
  },

  // LESSON 5: Conditional Expressions: CASE WHEN & Computed Projections
  {
    id: 'sql_lesson_5',
    moduleId: 'sql_mod_1',
    levelId: 'basic',
    courseId: 'sql',
    order: 5,
    topicId: 'sql_case',
    title: {
      en: 'Conditional Expressions: CASE WHEN & Computed Projections',
      vi: 'Biểu Thức Điều Kiện: CASE WHEN & Phép Chiếu Tính Toán'
    },
    summary: {
      en: 'Master Searched CASE vs Simple CASE expressions, categorical grading, boolean flags, NULL-safe fallbacks, and conditional computations inside SELECT and ORDER BY.',
      vi: 'Làm chủ biểu thức Searched CASE và Simple CASE, phân loại học lực, cờ logic boolean, giá trị dự phòng an toàn cho NULL và tính toán có điều kiện trong SELECT và ORDER BY.'
    },
    estimatedMinutes: 15,
    learn: {
      introduction: {
        en: 'The CASE expression provides powerful IF-THEN-ELSE branching logic directly within SQL statements. It is a standard ANSI SQL scalar expression that evaluates conditions sequentially and returns a single corresponding value.',
        vi: 'Biểu thức CASE cung cấp logic rẽ nhánh IF-THEN-ELSE trực tiếp trong câu lệnh SQL. Đây là biểu thức vô hướng chuẩn ANSI SQL đánh giá tuần tự các điều kiện và trả về một giá trị tương ứng.'
      },
      conceptExplanation: {
        en: 'There are two forms of CASE expressions: 1) Searched CASE: "CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE fallback END" evaluates arbitrary boolean predicates. 2) Simple CASE: "CASE expression WHEN val1 THEN result1 ELSE fallback END" checks for equality against a base expression. The first condition that evaluates to TRUE determines the returned value; subsequent conditions are skipped (short-circuit evaluation). If no condition matches and no ELSE clause is provided, CASE returns NULL.',
        vi: 'Có hai dạng biểu thức CASE: 1) Searched CASE: "CASE WHEN điều_kiện1 THEN kết_quả1 WHEN điều_kiện2 THEN kết_quả2 ELSE mặc_định END" đánh giá các biểu thức logic tùy ý. 2) Simple CASE: "CASE biểu_thức WHEN giá_trị1 THEN kết_quả1 ELSE mặc_định END" so sánh bằng với một biểu thức gốc. Điều kiện đầu tiên thỏa mãn TRUE sẽ xác định giá trị trả về; các điều kiện sau sẽ được bỏ qua. Nếu không có điều kiện nào thỏa mãn và không có mệnh đề ELSE, CASE sẽ trả về NULL.'
      },
      syntax: `SELECT column1,
       CASE
         WHEN numeric_col >= 90 THEN 'Distinction'
         WHEN numeric_col >= 75 THEN 'Pass'
         ELSE 'Needs Improvement'
       END AS performance_grade
FROM table_name;`,
      examples: [
        {
          title: {
            en: '1. Categorical Tiering with Searched CASE',
            vi: '1. Phân Loại Thứ Hạng Với Searched CASE'
          },
          code: `SELECT name, score,
       CASE
         WHEN score >= 90 THEN 'Tier 1 - Excellent'
         WHEN score >= 80 THEN 'Tier 2 - Good'
         WHEN score >= 65 THEN 'Tier 3 - Satisfactory'
         ELSE 'Tier 4 - Remediate'
       END AS student_bracket
FROM students;`,
          language: 'sql',
          explanation: {
            en: 'Evaluates each student\'s score against descending boundary thresholds and projects a human-readable bracket label.',
            vi: 'Đánh giá điểm của từng học viên theo các ngưỡng giảm dần và trích xuất nhãn xếp hạng dễ hiểu.'
          }
        },
        {
          title: {
            en: '2. Dynamic Sorting Priority with CASE in ORDER BY',
            vi: '2. Thứ Tự Ưu Tiên Động Bằng CASE Trong ORDER BY'
          },
          code: `SELECT name, city, score
FROM students
ORDER BY
  CASE
    WHEN city = 'Hanoi' THEN 1
    WHEN city = 'Da Nang' THEN 2
    ELSE 3
  END ASC,
  score DESC;`,
          language: 'sql',
          explanation: {
            en: 'Customizes sort priority to show Hanoi students first, Da Nang second, and all other cities third, ordering by score within each cohort.',
            vi: 'Tùy chỉnh thứ tự sắp xếp để hiển thị sinh viên Hà Nội trước, tiếp đến Đà Nẵng, sau đó là các thành phố khác, và xếp theo điểm trong từng nhóm.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Forgetting the mandatory END keyword',
            vi: 'Quên từ khóa bắt buộc END khi kết thúc biểu thức CASE'
          },
          correction: {
            en: 'Every CASE expression must terminate with the END keyword, otherwise a fatal syntax error occurs.',
            vi: 'Mọi biểu thức CASE bắt buộc phải kết thúc bằng từ khóa END, nếu không sẽ phát sinh lỗi cú pháp.'
          },
          code: `-- WRONG: SELECT name, CASE WHEN score > 80 THEN 'Pass' FROM students;
-- CORRECT:
SELECT name, CASE WHEN score > 80 THEN 'Pass' ELSE 'Fail' END AS result FROM students;`
        },
        {
          mistake: {
            en: 'Relying on implicit NULL when no ELSE clause is provided',
            vi: 'Không khai báo ELSE khiến các trường hợp còn lại tự động bị gán NULL'
          },
          correction: {
            en: 'Always supply an explicit ELSE clause to guarantee predictable fallback handling for unexpected data.',
            vi: 'Luôn khai báo mệnh đề ELSE rõ ràng để đảm bảo có giá trị dự phòng dự đoán được cho dữ liệu ngoại lệ.'
          },
          code: `SELECT name,
       CASE WHEN score >= 50 THEN 'Pass' ELSE 'Unscored/Fail' END AS status
FROM students;`
        }
      ],
      tips: [
        {
          en: 'Conditions in a searched CASE evaluate top-to-bottom. Order broader conditions after narrower specific conditions.',
          vi: 'Các điều kiện trong searched CASE được đánh giá từ trên xuống dưới. Hãy đặt các điều kiện hẹp (nghiêm ngặt) trước các điều kiện rộng.'
        },
        {
          en: 'CASE expressions can be nested inside aggregate functions (e.g. SUM(CASE WHEN status = \'completed\' THEN 1 ELSE 0 END)) for conditional aggregation.',
          vi: 'Biểu thức CASE có thể lồng trong các hàm tổng hợp (ví dụ: SUM(CASE WHEN status = \'completed\' THEN 1 ELSE 0 END)) để đếm hoặc tính tổng có điều kiện.'
        }
      ],
      practiceStarterCode: `-- Classify students as 'Honor' if score >= 90, else 'Standard'
SELECT name, score, CASE WHEN score >= 90 THEN 'Honor' ELSE 'Standard' END AS honor_status FROM students;`,
      practice: {
        task: {
          en: 'Write a query selecting name, score, and a new column result_status using CASE: "Pass" if score >= 80, else "Retake".',
          vi: 'Viết truy vấn lấy name, score và cột mới result_status bằng CASE: "Pass" nếu score >= 80, ngược lại "Retake".'
        },
        starterCode: `-- Select student name, score, and result_status
SELECT name, score FROM students;`,
        solutionCode: `SELECT name, score, CASE WHEN score >= 80 THEN 'Pass' ELSE 'Retake' END AS result_status FROM students;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_5_1',
        type: 'fix_code',
        title: {
          en: 'Fix Missing END in CASE Expression',
          vi: 'Sửa Lỗi Thiếu Từ Khóa END Trong Biểu Thức CASE'
        },
        instruction: {
          en: 'Fix the syntax error by adding the missing END keyword to the CASE expression.',
          vi: 'Sửa lỗi cú pháp bằng cách thêm từ khóa END còn thiếu vào biểu thức CASE.'
        },
        starterCode: 'SELECT name, score, CASE WHEN score >= 85 THEN \'High\' ELSE \'Normal\' AS score_level FROM students;',
        solutionCode: 'SELECT name, score, CASE WHEN score >= 85 THEN \'High\' ELSE \'Normal\' END AS score_level FROM students;',
        hint: {
          en: 'Add END before AS score_level.',
          vi: 'Thêm END trước AS score_level.'
        },
        explanation: {
          en: 'A SQL CASE statement must always close with the END keyword.',
          vi: 'Câu lệnh CASE trong SQL luôn phải kết thúc bằng từ khóa END.'
        }
      },
      {
        id: 'sql_ex_5_2',
        type: 'complete_code',
        title: {
          en: 'Complete Pass/Fail Classification',
          vi: 'Hoàn Thiện Phân Loại Đậu/Rớt'
        },
        instruction: {
          en: 'Complete the CASE expression to project "Passed" when score >= 80 and "Failed" otherwise.',
          vi: 'Hoàn thiện biểu thức CASE để trả về "Passed" khi score >= 80 và "Failed" cho các trường hợp còn lại.'
        },
        starterCode: 'SELECT name, score, CASE WHEN score >= 80 THEN  ELSE  END AS exam_result FROM students;',
        solutionCode: 'SELECT name, score, CASE WHEN score >= 80 THEN \'Passed\' ELSE \'Failed\' END AS exam_result FROM students;',
        hint: {
          en: 'Put \'Passed\' after THEN and \'Failed\' after ELSE.',
          vi: 'Điền \'Passed\' sau THEN và \'Failed\' sau ELSE.'
        },
        explanation: {
          en: 'THEN specifies the output when the condition matches; ELSE specifies the fallback output.',
          vi: 'THEN xác định kết quả khi điều kiện đúng; ELSE xác định kết quả dự phòng.'
        }
      },
      {
        id: 'sql_ex_5_3',
        type: 'write_code',
        title: {
          en: 'Multi-Tier Grade Label Generator',
          vi: 'Bộ Tạo Nhãn Điểm Đa Phân Khúc'
        },
        instruction: {
          en: 'Write a query that selects name, score, and a grade_band column: "A" if score >= 90, "B" if score >= 80, "C" if score >= 70, else "F".',
          vi: 'Viết truy vấn chọn name, score và cột grade_band: "A" nếu score >= 90, "B" nếu score >= 80, "C" nếu score >= 70, ngược lại "F".'
        },
        starterCode: '-- Grade band generator with CASE\n',
        solutionCode: 'SELECT name, score, CASE WHEN score >= 90 THEN \'A\' WHEN score >= 80 THEN \'B\' WHEN score >= 70 THEN \'C\' ELSE \'F\' END AS grade_band FROM students;',
        hint: {
          en: 'Use multiple WHEN ... THEN clauses before ELSE \'F\' END AS grade_band.',
          vi: 'Sử dụng nhiều mệnh đề WHEN ... THEN trước ELSE \'F\' END AS grade_band.'
        },
        explanation: {
          en: 'Searched CASE checks conditions sequentially from top to bottom.',
          vi: 'Searched CASE kiểm tra các điều kiện tuần tự từ trên xuống dưới.'
        }
      },
      {
        id: 'sql_ex_5_4',
        type: 'modify_example',
        title: {
          en: 'Custom Priority Sorting with CASE',
          vi: 'Sắp Xếp Theo Mức Độ Ưu Tiên Bằng CASE'
        },
        instruction: {
          en: 'Order orders so that status = \'pending\' appears first (1), \'completed\' appears second (2), and \'cancelled\' appears last (3).',
          vi: 'Sắp xếp bảng orders sao cho status = \'pending\' xuất hiện đầu tiên (1), \'completed\' thứ hai (2) và \'cancelled\' sau cùng (3).'
        },
        starterCode: 'SELECT order_id, product, status FROM orders;',
        solutionCode: 'SELECT order_id, product, status FROM orders ORDER BY CASE WHEN status = \'pending\' THEN 1 WHEN status = \'completed\' THEN 2 ELSE 3 END ASC;',
        hint: {
          en: 'Add ORDER BY CASE WHEN status = \'pending\' THEN 1 WHEN status = \'completed\' THEN 2 ELSE 3 END ASC;',
          vi: 'Thêm ORDER BY CASE WHEN status = \'pending\' THEN 1 WHEN status = \'completed\' THEN 2 ELSE 3 END ASC;'
        },
        explanation: {
          en: 'CASE in ORDER BY maps text categories to integer sort weights.',
          vi: 'CASE trong ORDER BY ánh xạ các nhãn văn bản thành trọng số nguyên để sắp xếp.'
        }
      },
      {
        id: 'sql_ex_5_5',
        type: 'predict_output',
        title: {
          en: 'Predict CASE Short-Circuit Behavior',
          vi: 'Dự Đoán Cơ Chế Ngắt Sớm Của CASE'
        },
        instruction: {
          en: 'For score = 95, what does "CASE WHEN score >= 80 THEN \'Good\' WHEN score >= 90 THEN \'Excellent\' ELSE \'Average\' END" return?',
          vi: 'Với score = 95, biểu thức "CASE WHEN score >= 80 THEN \'Good\' WHEN score >= 90 THEN \'Excellent\' ELSE \'Average\' END" trả về giá trị gì?'
        },
        starterCode: '-- Predict CASE result for 95\n',
        solutionCode: 'SELECT CASE WHEN 95 >= 80 THEN \'Good\' WHEN 95 >= 90 THEN \'Excellent\' ELSE \'Average\' END;',
        options: ['Good', 'Excellent', 'Average', 'NULL'],
        correctOptionIndex: 0,
        hint: {
          en: 'CASE stops evaluating after the FIRST true condition (95 >= 80 is true).',
          vi: 'CASE dừng đánh giá ngay sau khi gặp điều kiện ĐÚNG ĐẦU TIÊN (95 >= 80 là đúng).'
        },
        explanation: {
          en: 'Because 95 >= 80 evaluates to TRUE first, CASE short-circuits and immediately returns \'Good\'. The subsequent WHEN score >= 90 branch is never reached!',
          vi: 'Vì 95 >= 80 đúng trước, CASE ngắt sớm và trả về ngay \'Good\'. Nhánh WHEN score >= 90 phía sau sẽ không bao giờ được chạm tới!'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_5',
      title: {
        en: 'Comprehensive Student Evaluation & Bracket Matrix',
        vi: 'Ma Trận Đánh Giá & Phân Loại Học Viên Toàn Diện'
      },
      description: {
        en: 'Write a SQL query that retrieves each student\'s id, name, course, and score. Compute an academic_tier column using CASE: "Tier 1 - Honor" for scores >= 90, "Tier 2 - Merit" for scores >= 80, and "Tier 3 - Standard" for all other scores. Order the result by score DESC, id ASC.',
        vi: 'Viết truy vấn SQL lấy id, name, course và score của từng học viên. Tạo cột academic_tier bằng CASE: "Tier 1 - Honor" cho điểm >= 90, "Tier 2 - Merit" cho điểm >= 80 và "Tier 3 - Standard" cho các điểm còn lại. Sắp xếp theo score DESC, id ASC.'
      },
      requirements: [
        {
          en: 'Select id, name, course, score from students',
          vi: 'Chọn id, name, course, score từ bảng students'
        },
        {
          en: 'Construct academic_tier CASE expression correctly',
          vi: 'Xây dựng đúng biểu thức CASE cho academic_tier'
        },
        {
          en: 'Order by score DESC, id ASC',
          vi: 'Sắp xếp theo score DESC, id ASC'
        }
      ],
      starterCode: `-- Write your SQL query below
SELECT id, name, course, score,
       CASE

       END AS academic_tier
FROM students;`,
      solutionCode: `SELECT id, name, course, score, CASE WHEN score >= 90 THEN 'Tier 1 - Honor' WHEN score >= 80 THEN 'Tier 2 - Merit' ELSE 'Tier 3 - Standard' END AS academic_tier FROM students ORDER BY score DESC, id ASC;`,
      hints: [
        {
          en: 'Use CASE WHEN score >= 90 THEN \'Tier 1 - Honor\' WHEN score >= 80 THEN \'Tier 2 - Merit\' ELSE \'Tier 3 - Standard\' END AS academic_tier.',
          vi: 'Dùng CASE WHEN score >= 90 THEN \'Tier 1 - Honor\' WHEN score >= 80 THEN \'Tier 2 - Merit\' ELSE \'Tier 3 - Standard\' END AS academic_tier.'
        }
      ],
      solutionExplanation: {
        en: 'Combines ordered categorical bucketing with deterministic sorting.',
        vi: 'Kết hợp phân loại theo ngưỡng điểm với sắp xếp nhất quán.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_5_v1',
        title: {
          en: 'Comprehensive Student Evaluation & Bracket Matrix',
          vi: 'Ma Trận Đánh Giá & Phân Loại Học Viên Toàn Diện'
        },
        description: {
          en: 'Compute academic_tier using CASE for students with id, name, course, score ordered by score DESC, id ASC.',
          vi: 'Tính academic_tier bằng CASE cho sinh viên gồm id, name, course, score xếp theo score DESC, id ASC.'
        },
        requirements: [
          {
            en: 'Select id, name, course, score, and academic_tier',
            vi: 'Chọn id, name, course, score và academic_tier'
          }
        ],
        starterCode: `SELECT id, name, course, score FROM students;`,
        solutionCode: `SELECT id, name, course, score, CASE WHEN score >= 90 THEN 'Tier 1 - Honor' WHEN score >= 80 THEN 'Tier 2 - Merit' ELSE 'Tier 3 - Standard' END AS academic_tier FROM students ORDER BY score DESC, id ASC;`,
        hints: [
          {
            en: 'Add CASE expression and ORDER BY score DESC, id ASC.',
            vi: 'Thêm biểu thức CASE và ORDER BY score DESC, id ASC.'
          }
        ],
        solutionExplanation: {
          en: 'Categorizes academic performance into standardized award tiers.',
          vi: 'Phân loại kết quả học tập thành các danh hiệu chuẩn hóa.'
        }
      },
      {
        id: 'sql_ch_5_v2',
        title: {
          en: 'Employee Compensation Band Classification',
          vi: 'Phân Loại Thang Bảng Lương Nhân Viên'
        },
        description: {
          en: 'Select emp_name, salary, and salary_band: "High" for salary >= 80000, "Medium" for salary >= 60000, else "Standard" from employees ordered by salary DESC, emp_id ASC.',
          vi: 'Chọn emp_name, salary và salary_band: "High" nếu salary >= 80000, "Medium" nếu salary >= 60000, ngược lại "Standard" từ employees xếp theo salary DESC, emp_id ASC.'
        },
        requirements: [
          {
            en: 'Project emp_name, salary, and salary_band CASE expression',
            vi: 'Trích xuất emp_name, salary và biểu thức CASE salary_band'
          },
          {
            en: 'ORDER BY salary DESC, emp_id ASC',
            vi: 'ORDER BY salary DESC, emp_id ASC'
          }
        ],
        starterCode: `SELECT emp_name, salary FROM employees;`,
        solutionCode: `SELECT emp_name, salary, CASE WHEN salary >= 80000 THEN 'High' WHEN salary >= 60000 THEN 'Medium' ELSE 'Standard' END AS salary_band FROM employees ORDER BY salary DESC, emp_id ASC;`,
        hints: [
          {
            en: 'Use CASE WHEN salary >= 80000 THEN \'High\' WHEN salary >= 60000 THEN \'Medium\' ELSE \'Standard\' END AS salary_band',
            vi: 'Dùng CASE WHEN salary >= 80000 THEN \'High\' WHEN salary >= 60000 THEN \'Medium\' ELSE \'Standard\' END AS salary_band'
          }
        ],
        solutionExplanation: {
          en: 'Classifies organizational payroll distributions into discrete salary bands.',
          vi: 'Phân loại quỹ lương tổ chức thành các dải lương cụ thể.'
        }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_5_1',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'easy',
        question: {
          en: 'What is the purpose of the CASE expression in SQL?',
          vi: 'Mục đích của biểu thức CASE trong SQL là gì?'
        },
        options: [
          { en: 'Provides IF-THEN-ELSE conditional logic directly inside SQL queries', vi: 'Cung cấp logic rẽ nhánh điều kiện IF-THEN-ELSE trực tiếp trong câu truy vấn SQL' },
          { en: 'Converts lowercase strings to uppercase letters', vi: 'Chuyển chuỗi chữ thường thành chữ in hoa' },
          { en: 'Creates a new database table schema', vi: 'Tạo một bảng cơ sở dữ liệu mới' },
          { en: 'Drops records matching a condition', vi: 'Xóa các bản ghi khớp với điều kiện' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'CASE provides scalar conditional branching across ANSI-compliant SQL engines.',
          vi: 'CASE cung cấp cơ chế rẽ nhánh có điều kiện trên các hệ quản trị CSDL tuân thủ chuẩn ANSI.'
        }
      },
      {
        id: 'sql_q_5_2',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'medium',
        question: {
          en: 'What happens if no WHEN condition matches in a CASE expression and there is NO ELSE clause?',
          vi: 'Điều gì xảy ra nếu không có điều kiện WHEN nào đúng và KHÔNG có mệnh đề ELSE trong CASE?'
        },
        options: [
          { en: 'The expression returns NULL', vi: 'Biểu thức trả về giá trị NULL' },
          { en: 'A runtime fatal exception is thrown', vi: 'Phát sinh lỗi ngoại lệ nghiêm trọng' },
          { en: 'The expression returns an empty string', vi: 'Biểu thức trả về chuỗi rỗng' },
          { en: 'The query returns 0 rows', vi: 'Truy vấn trả về 0 dòng' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'By ANSI SQL specification, omitting ELSE defaults the fallback value to NULL.',
          vi: 'Theo chuẩn ANSI SQL, nếu bỏ qua ELSE, giá trị dự phòng mặc định sẽ là NULL.'
        }
      },
      {
        id: 'sql_q_5_3',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'easy',
        question: {
          en: 'Which keyword is required to close every CASE expression?',
          vi: 'Từ khóa nào là bắt buộc để đóng mọi biểu thức CASE?'
        },
        options: [
          { en: 'END', vi: 'END' },
          { en: 'STOP', vi: 'STOP' },
          { en: 'CLOSE', vi: 'CLOSE' },
          { en: 'FINISH', vi: 'FINISH' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Every CASE statement must terminate with the END keyword.',
          vi: 'Mọi câu lệnh CASE bắt buộc phải kết thúc bằng từ khóa END.'
        }
      },
      {
        id: 'sql_q_5_4',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'medium',
        question: {
          en: 'What is the fundamental difference between a "Simple CASE" and a "Searched CASE"?',
          vi: 'Sự khác biệt cơ bản giữa "Simple CASE" và "Searched CASE" là gì?'
        },
        options: [
          { en: 'Simple CASE tests equality against a single base expression; Searched CASE evaluates independent boolean predicates in each WHEN', vi: 'Simple CASE so sánh bằng với một biểu thức gốc; Searched CASE đánh giá các biểu thức logic độc lập ở từng WHEN' },
          { en: 'Searched CASE only works with string text', vi: 'Searched CASE chỉ hoạt động với chuỗi văn bản' },
          { en: 'Simple CASE cannot have an ELSE branch', vi: 'Simple CASE không thể có nhánh ELSE' },
          { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Searched CASE (CASE WHEN expr THEN ...) supports arbitrary boolean expressions including inequalities and logical combinations.',
          vi: 'Searched CASE (CASE WHEN biểu_thức THEN ...) hỗ trợ các biểu thức logic tùy ý bao gồm so sánh bất đẳng thức và kết hợp logic.'
        }
      },
      {
        id: 'sql_q_5_5',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'hard',
        question: {
          en: 'How does CASE evaluation short-circuiting work in SQL?',
          vi: 'Cơ chế ngắt sớm (short-circuit) khi đánh giá CASE hoạt động như thế nào trong SQL?'
        },
        options: [
          { en: 'The engine evaluates WHEN conditions in order from top to bottom and stops at the very FIRST condition that evaluates to TRUE', vi: 'Hệ thống đánh giá các điều kiện WHEN theo thứ tự từ trên xuống và dừng lại ngay tại điều kiện ĐẦU TIÊN trả về TRUE' },
          { en: 'All WHEN conditions are evaluated simultaneously regardless of order', vi: 'Tất cả các điều kiện WHEN được đánh giá cùng lúc bất kể thứ tự' },
          { en: 'It evaluates from bottom to top', vi: 'Nó đánh giá từ dưới lên trên' },
          { en: 'The engine always picks the condition with the longest string', vi: 'Hệ thống luôn chọn điều kiện có chuỗi dài nhất' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'CASE evaluates sequentially. The first matching WHEN branch is returned, skipping subsequent branches.',
          vi: 'CASE đánh giá tuần tự. Nhánh WHEN đầu tiên thỏa mãn sẽ được trả về và các nhánh sau bị bỏ qua.'
        }
      },
      {
        id: 'sql_q_5_6',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'medium',
        question: {
          en: 'Can a CASE expression be used inside an aggregate function like "SUM(CASE WHEN status = \'active\' THEN 1 ELSE 0 END)"?',
          vi: 'Có thể sử dụng biểu thức CASE bên trong hàm tổng hợp như "SUM(CASE WHEN status = \'active\' THEN 1 ELSE 0 END)" không?'
        },
        options: [
          { en: 'Yes, this is the standard technique for conditional counting and aggregation in SQL', vi: 'Có, đây là kỹ thuật tiêu chuẩn để đếm và tổng hợp có điều kiện trong SQL' },
          { en: 'No, aggregate functions cannot contain sub-expressions', vi: 'Không, hàm tổng hợp không thể chứa biểu thức con' },
          { en: 'Only in MySQL, not in PostgreSQL or SQLite', vi: 'Chỉ hỗ trợ trong MySQL, không hỗ trợ trong PostgreSQL hoặc SQLite' },
          { en: 'Only if wrapped in a stored procedure', vi: 'Chỉ khi được bọc trong stored procedure' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Embedding CASE inside SUM or AVG is the universal ANSI SQL pattern for conditional aggregation across all relational databases.',
          vi: 'Lồng CASE trong SUM hoặc AVG là mẫu thiết kế chuẩn ANSI SQL phổ biến để tính toán tổng hợp có điều kiện trên mọi RDBMS.'
        }
      },
      {
        id: 'sql_q_5_7',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'easy',
        question: {
          en: 'In which parts of a SQL statement is a CASE expression valid?',
          vi: 'Biểu thức CASE hợp lệ ở những vị trí nào trong câu lệnh SQL?'
        },
        options: [
          { en: 'In SELECT, WHERE, ORDER BY, GROUP BY, and HAVING clauses', vi: 'Trong các mệnh đề SELECT, WHERE, ORDER BY, GROUP BY và HAVING' },
          { en: 'Only in the SELECT clause', vi: 'Chỉ được dùng trong mệnh đề SELECT' },
          { en: 'Only in the WHERE clause', vi: 'Chỉ được dùng trong mệnh đề WHERE' },
          { en: 'Only in the FROM clause', vi: 'Chỉ được dùng trong mệnh đề FROM' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Because CASE is a scalar value expression, it can appear anywhere a standard scalar value or column expression is permitted.',
          vi: 'Vì CASE là một biểu thức trả về giá trị vô hướng, nó có thể xuất hiện ở bất kỳ nơi nào cho phép dùng cột hoặc biểu thức giá trị.'
        }
      },
      {
        id: 'sql_q_5_8',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'medium',
        question: {
          en: 'What data type rule applies to all THEN and ELSE return expressions in a single CASE statement?',
          vi: 'Quy tắc kiểu dữ liệu nào áp dụng cho tất cả các giá trị trả về ở nhánh THEN và ELSE trong cùng một câu lệnh CASE?'
        },
        options: [
          { en: 'They must have compatible or coercible data types', vi: 'Chúng phải có kiểu dữ liệu tương thích hoặc có thể tự động ép kiểu về cùng một kiểu' },
          { en: 'They must all be integers', vi: 'Tất cả bắt buộc phải là số nguyên' },
          { en: 'Each branch can return completely arbitrary unrelated types without coercion', vi: 'Mỗi nhánh có thể trả về kiểu dữ liệu bất kỳ không liên quan' },
          { en: 'They must all be text strings', vi: 'Tất cả bắt buộc phải là chuỗi văn bản' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'The database engine resolves all THEN/ELSE outputs to a single common output data type.',
          vi: 'Hệ thống cơ sở dữ liệu sẽ quy đổi tất cả các đầu ra của THEN/ELSE về một kiểu dữ liệu chung duy nhất.'
        }
      },
      {
        id: 'sql_q_5_9',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'hard',
        question: {
          en: 'Given "CASE val WHEN NULL THEN \'Missing\' ELSE \'Present\' END", what will this return when val is NULL?',
          vi: 'Cho biểu thức "CASE val WHEN NULL THEN \'Missing\' ELSE \'Present\' END", biểu thức này trả về gì khi val là NULL?'
        },
        options: [
          { en: '\'Present\' (because Simple CASE uses "= NULL" internally, which evaluates to UNKNOWN and falls to ELSE)', vi: '\'Present\' (vì Simple CASE ngầm dùng "= NULL", phép so sánh này ra UNKNOWN nên rơi xuống ELSE)' },
          { en: '\'Missing\'', vi: '\'Missing\'' },
          { en: 'NULL', vi: 'NULL' },
          { en: 'Syntax Error', vi: 'Lỗi cú pháp' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Simple CASE performs "val = NULL" which evaluates to UNKNOWN. To check for NULL, you MUST use Searched CASE: "CASE WHEN val IS NULL THEN ...".',
          vi: 'Simple CASE thực hiện phép so sánh "val = NULL" cho kết quả UNKNOWN. Để kiểm tra NULL, BẮT BUỘC phải dùng Searched CASE: "CASE WHEN val IS NULL THEN ...".'
        }
      },
      {
        id: 'sql_q_5_10',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'easy',
        question: {
          en: 'How to alias the result of a CASE expression in the SELECT clause?',
          vi: 'Làm thế nào để đặt bí danh cho kết quả của một biểu thức CASE trong mệnh đề SELECT?'
        },
        options: [
          { en: 'CASE ... END AS alias_name', vi: 'CASE ... END AS alias_name' },
          { en: 'ALIAS alias_name = CASE ... END', vi: 'ALIAS alias_name = CASE ... END' },
          { en: 'CASE AS alias_name ... END', vi: 'CASE AS alias_name ... END' },
          { en: 'NAME alias_name (CASE ... END)', vi: 'NAME alias_name (CASE ... END)' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Place the AS alias_name clause immediately after the closing END keyword.',
          vi: 'Đặt mệnh đề AS alias_name ngay sau từ khóa đóng END.'
        }
      },
      {
        id: 'sql_q_5_11',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'medium',
        question: {
          en: 'Which query converts a numeric boolean status column (1 or 0) into \'Active\' or \'Inactive\'?',
          vi: 'Truy vấn nào chuyển đổi cột trạng thái số (1 hoặc 0) thành chữ \'Active\' hoặc \'Inactive\'?'
        },
        options: [
          { en: 'SELECT CASE is_active WHEN 1 THEN \'Active\' ELSE \'Inactive\' END FROM users;', vi: 'SELECT CASE is_active WHEN 1 THEN \'Active\' ELSE \'Inactive\' END FROM users;' },
          { en: 'SELECT IF is_active == 1 THEN \'Active\' ELSE \'Inactive\' FROM users;', vi: 'SELECT IF is_active == 1 THEN \'Active\' ELSE \'Inactive\' FROM users;' },
          { en: 'SELECT CONVERT(is_active, \'Active\', \'Inactive\') FROM users;', vi: 'SELECT CONVERT(is_active, \'Active\', \'Inactive\') FROM users;' },
          { en: 'SELECT SWITCH(is_active) FROM users;', vi: 'SELECT SWITCH(is_active) FROM users;' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Simple CASE expression matches is_active against 1 and falls back to Inactive for all other values.',
          vi: 'Biểu thức Simple CASE so sánh is_active với 1 và trả về Inactive cho tất cả các giá trị còn lại.'
        }
      },
      {
        id: 'sql_q_5_12',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'hard',
        question: {
          en: 'Can a CASE expression appear directly in an ORDER BY clause to create custom non-alphabetical sorting?',
          vi: 'Có thể đặt biểu thức CASE trực tiếp trong mệnh đề ORDER BY để tạo thứ tự sắp xếp tùy chỉnh không theo bảng chữ cái không?'
        },
        options: [
          { en: 'Yes, by assigning numeric weights to categories in THEN clauses', vi: 'Có, bằng cách gán trọng số kiểu số cho các danh mục trong các mệnh đề THEN' },
          { en: 'No, ORDER BY only accepts raw column names', vi: 'Không, ORDER BY chỉ chấp nhận tên cột gốc' },
          { en: 'Only if defined as a stored view', vi: 'Chỉ khi được định nghĩa trong view' },
          { en: 'Only in Oracle database', vi: 'Chỉ có trong cơ sở dữ liệu Oracle' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'CASE inside ORDER BY dynamically maps discrete categories to integer ordering ranks.',
          vi: 'CASE trong ORDER BY ánh xạ động các phân loại văn bản thành các thứ hạng số nguyên để sắp xếp.'
        }
      },
      {
        id: 'sql_q_5_13',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'easy',
        question: {
          en: 'What keyword connects each condition to its corresponding result in a CASE expression?',
          vi: 'Từ khóa nào liên kết mỗi điều kiện với kết quả tương ứng trong biểu thức CASE?'
        },
        options: [
          { en: 'THEN', vi: 'THEN' },
          { en: 'RETURN', vi: 'RETURN' },
          { en: 'GIVE', vi: 'GIVE' },
          { en: 'DO', vi: 'DO' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'THEN defines the output expression when the preceding WHEN condition evaluates to TRUE.',
          vi: 'THEN xác định biểu thức kết quả khi điều kiện WHEN đứng trước nó đánh giá là TRUE.'
        }
      },
      {
        id: 'sql_q_5_14',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'medium',
        question: {
          en: 'What is the result of "SELECT CASE WHEN NULL THEN 1 ELSE 2 END;"?',
          vi: 'Kết quả của câu lệnh "SELECT CASE WHEN NULL THEN 1 ELSE 2 END;" là gì?'
        },
        options: [
          { en: '2', vi: '2' },
          { en: '1', vi: '1' },
          { en: 'NULL', vi: 'NULL' },
          { en: 'Syntax Error', vi: 'Lỗi cú pháp' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Because NULL in a boolean context is UNKNOWN (not strictly TRUE), the first branch fails and execution falls to ELSE, returning 2.',
          vi: 'Vì NULL trong ngữ cảnh boolean là UNKNOWN (không phải TRUE), nhánh đầu tiên không khớp và biểu thức rơi xuống ELSE trả về 2.'
        }
      },
      {
        id: 'sql_q_5_15',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'easy',
        question: {
          en: 'Is the ELSE clause strictly mandatory in a CASE expression?',
          vi: 'Mệnh đề ELSE có bắt buộc phải xuất hiện trong biểu thức CASE không?'
        },
        options: [
          { en: 'No, it is optional; if omitted and no conditions match, it evaluates to NULL', vi: 'Không, nó là tùy chọn; nếu bỏ qua và không có điều kiện nào đúng thì kết quả là NULL' },
          { en: 'Yes, omitting ELSE causes a syntax error', vi: 'Có, thiếu ELSE sẽ gây lỗi cú pháp' },
          { en: 'Only mandatory in PostgreSQL', vi: 'Chỉ bắt buộc trong PostgreSQL' },
          { en: 'Only mandatory when using strings', vi: 'Chỉ bắt buộc khi xử lý chuỗi' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'ELSE is optional in ANSI SQL. When omitted, unmatched cases default to NULL.',
          vi: 'ELSE là tùy chọn trong chuẩn ANSI SQL. Khi không khai báo, các trường hợp không khớp mặc định là NULL.'
        }
      },
      {
        id: 'sql_q_5_16',
        type: 'single_choice',
        topicId: 'sql_case',
        difficulty: 'hard',
        question: {
          en: 'Which SQL function is semantically equivalent to "CASE WHEN expr1 IS NOT NULL THEN expr1 ELSE expr2 END"?',
          vi: 'Hàm SQL nào có ngữ nghĩa tương đương với "CASE WHEN expr1 IS NOT NULL THEN expr1 ELSE expr2 END"?'
        },
        options: [
          { en: 'COALESCE(expr1, expr2)', vi: 'COALESCE(expr1, expr2)' },
          { en: 'NULLIF(expr1, expr2)', vi: 'NULLIF(expr1, expr2)' },
          { en: 'IFNULL_STRICT(expr1, expr2)', vi: 'IFNULL_STRICT(expr1, expr2)' },
          { en: 'NVL2(expr1, expr2)', vi: 'NVL2(expr1, expr2)' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'COALESCE(expr1, expr2) is syntactically specified in ANSI SQL as a shorthand alias for this exact CASE construct.',
          vi: 'COALESCE(expr1, expr2) được quy định trong chuẩn ANSI SQL như một cú pháp viết tắt cho chính cấu trúc CASE này.'
        }
      }
    ]
  }
];

