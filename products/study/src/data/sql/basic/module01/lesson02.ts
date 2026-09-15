import { Lesson } from '../../../../types';

export const lesson02: Lesson = {
  id: 'sql_lesson_2',
  moduleId: 'sql_mod_1',
  levelId: 'basic',
  courseId: 'sql',
  order: 2,
  topicId: 'sql_select_aliases',
  title: {
    en: 'SELECT, Column Aliases & Literal Values',
    vi: 'Lệnh SELECT, Bí Danh Cột & Giá Trị Hằng (Literal)'
  },
  summary: {
    en: 'Master selecting specific columns, renaming projections using the AS keyword, injecting computed literal expressions, and deduplicating rows with DISTINCT.',
    vi: 'Làm chủ phép chiếu cột cụ thể, đặt lại tên cột bằng từ khóa AS, tính toán biểu thức hằng số và loại trừ trùng lặp với DISTINCT.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'The SELECT clause defines the projection of your SQL query—specifying which columns, calculated expressions, or literal values the database engine should compute and return. Mastering column aliasing with AS, arithmetic calculations, and DISTINCT deduplication forms the bedrock of data retrieval.',
      vi: 'Mệnh đề SELECT xác định phép chiếu dữ liệu (projection) của câu truy vấn SQL—chỉ định các cột, biểu thức tính toán hoặc giá trị hằng số mà CSDL cần trả về. Nắm vững việc đặt bí danh cột với AS, các phép toán số học và loại bỏ trùng lặp với DISTINCT là nền tảng cốt lõi của việc trích xuất dữ liệu.'
    },
    conceptExplanation: {
      en: 'Key Data Projection Mechanics:\n1. Explicit Projections: Instead of SELECT *, specify exact columns (e.g. SELECT name, salary) to minimize data transfer.\n2. Column Aliasing (AS): Rename output column headers for clarity (e.g. salary * 12 AS annual_compensation). Note: Aliases cannot be referenced in WHERE in the same query block because WHERE executes before SELECT.\n3. Literal Values & Arithmetic: Inject constant strings or numbers (e.g. SELECT name, \'Active\' AS status, price * 1.1 AS price_with_tax).\n4. DISTINCT Deduplication: Apply DISTINCT right after SELECT (e.g. SELECT DISTINCT department FROM employees) to return unique combinations across all projected columns.',
      vi: 'Các cơ chế chiếu dữ liệu quan trọng:\n1. Chỉ định cột tường minh: Thay vì SELECT *, hãy liệt kê chính xác các cột cần lấy (ví dụ: SELECT name, salary) để tối ưu băng thông.\n2. Đặt bí danh cột (AS): Đổi tên tiêu đề cột đầu ra giúp kết quả rõ ràng hơn (ví dụ: salary * 12 AS annual_compensation). Lưu ý: Không thể dùng bí danh này trong mệnh đề WHERE cùng cấp vì WHERE được thực thi trước SELECT.\n3. Giá trị hằng (Literal) & Phép toán: Trích xuất các chuỗi hoặc số cố định (ví dụ: SELECT name, \'Active\' AS status, price * 1.1 AS price_with_tax).\n4. Khử trùng lặp với DISTINCT: Đặt DISTINCT ngay sau SELECT (ví dụ: SELECT DISTINCT department FROM employees) để trả về các tổ hợp giá trị duy nhất.'
    },
    syntax: `SELECT [DISTINCT] column1, 
       (expression) AS alias_name, 
       'literal_value' AS tag_name
FROM table_name;`,
    examples: [
      {
        title: {
          en: '1. Column Aliases and Calculated Expressions',
          vi: '1. Bí Danh Cột và Biểu Thức Tính Toán'
        },
        code: `SELECT name, 
       salary, 
       (salary * 1.10) AS revised_salary,
       '2026-Q1' AS fiscal_period
FROM employees;`,
        language: 'sql',
        explanation: {
          en: 'Computes a 10% salary increase with alias revised_salary and projects a constant fiscal period string.',
          vi: 'Tính toán mức lương tăng 10% với bí danh revised_salary và gán chuỗi hằng số kỳ tài chính.'
        }
      },
      {
        title: {
          en: '2. Multi-Column Deduplication with DISTINCT',
          vi: '2. Khử Trùng Lặp Đa Cột Với DISTINCT'
        },
        code: `SELECT DISTINCT department, role
FROM employees;`,
        language: 'sql',
        explanation: {
          en: 'Returns all unique combinations of department and role found across the organization.',
          vi: 'Trả về tất cả các cặp kết hợp duy nhất giữa phòng ban và vị trí công việc trong công ty.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Trying to filter on a column alias directly in the WHERE clause.',
          vi: 'Cố gắng lọc bằng bí danh cột vừa đặt ngay trong mệnh đề WHERE.'
        },
        correction: {
          en: 'Because SQL processes the FROM and WHERE clauses BEFORE the SELECT clause, aliases defined in SELECT do not exist yet when WHERE is evaluated. Repeat the expression or use a subquery/CTE.',
          vi: 'Vì SQL thực thi FROM và WHERE TRƯỚC SELECT, bí danh đặt trong SELECT chưa tồn tại khi WHERE chạy. Hãy lặp lại biểu thức hoặc dùng CTE/subquery.'
        },
        code: `-- INCORRECT:
-- SELECT salary * 12 AS annual_sal FROM emp WHERE annual_sal > 50000;
-- CORRECT:
SELECT salary * 12 AS annual_sal FROM employees WHERE salary * 12 > 50000;`
      },
      {
        mistake: {
          en: 'Placing DISTINCT on only one column in a multi-column SELECT list.',
          vi: 'Nghĩ rằng DISTINCT chỉ áp dụng cho một cột duy nhất khi viết nhiều cột.'
        },
        correction: {
          en: 'DISTINCT is a row-level operator. It applies across the combination of ALL selected columns, not just the first one.',
          vi: 'DISTINCT là toán tử cấp độ toàn dòng. Nó áp dụng cho toàn bộ tổ hợp các cột được chọn chứ không riêng cột đầu tiên.'
        }
      }
    ],
    tips: [
      {
        en: 'In SQL, literal strings must be enclosed in single quotes (\'text\'), while double quotes or backticks are reserved for identifiers in some dialects.',
        vi: 'Trong SQL, chuỗi ký tự hằng số bắt buộc phải đặt trong dấu nháy đơn (\'text\'), trong khi nháy kép được dùng cho tên định danh bảng/cột.'
      },
      {
        en: 'Logical query processing order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.',
        vi: 'Thứ tự xử lý logic của một câu lệnh SQL: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.'
      }
    ],
    practiceStarterCode: `-- Compute annual salary and tag with employment status
SELECT name, salary, (salary * 12) AS annual_salary, 'Full-Time' AS employment_type FROM employees;`
  },
  exercisePool: [
    {
      id: 'sql_ex_select_1',
      type: 'complete_code',
      title: {
        en: 'Compute Annual Bonus Projection',
        vi: 'Tính Toán Dự Phóng Thưởng Năm'
      },
      instruction: {
        en: 'Select the name column, the salary column, and compute a 15% bonus as bonus_amount from the employees table.',
        vi: 'Chọn cột name, salary và tính toán 15% tiền thưởng với bí danh bonus_amount từ bảng employees.'
      },
      starterCode: 'SELECT name, salary, (salary * ___) AS bonus_amount FROM employees;',
      solutionCode: 'SELECT name, salary, (salary * 0.15) AS bonus_amount FROM employees;',
      hint: {
        en: 'Multiply salary by 0.15.',
        vi: 'Nhân salary với 0.15.'
      },
      explanation: {
        en: 'Multiplying salary by 0.15 and aliasing it with AS bonus_amount yields the calculated column.',
        vi: 'Nhân salary với 0.15 và đặt bí danh AS bonus_amount tạo ra cột tính toán theo yêu cầu.'
      }
    },
    {
      id: 'sql_ex_select_2',
      type: 'complete_code',
      title: {
        en: 'Deduplicate Unique Departments',
        vi: 'Khử Trùng Lặp Phòng Ban'
      },
      instruction: {
        en: 'Write a query to retrieve all unique department names from the employees table.',
        vi: 'Viết câu truy vấn để lấy danh sách các phòng ban duy nhất từ bảng employees.'
      },
      starterCode: 'SELECT ___ department FROM employees;',
      solutionCode: 'SELECT DISTINCT department FROM employees;',
      hint: {
        en: 'Use the DISTINCT keyword right after SELECT.',
        vi: 'Sử dụng từ khóa DISTINCT ngay sau SELECT.'
      },
      explanation: {
        en: 'DISTINCT removes duplicate rows from the resulting projection.',
        vi: 'DISTINCT loại bỏ các dòng trùng lặp khỏi kết quả trả về.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_select_literals',
    title: {
      en: 'Executive Payroll Summary Projection',
      vi: 'Báo Cáo Tổng Hợp Bảng Lương Dự Phóng'
    },
    description: {
      en: 'Write a SQL query that projects the employee name, current monthly salary, an annualized salary named annual_salary (monthly * 12), a fixed company division code \'HQ-CORP\' named division_code, and deduplicates identical records.',
      vi: 'Viết câu truy vấn SQL lấy cột name, lương tháng salary, lương năm annual_salary (salary * 12), một mã chi nhánh cố định \'HQ-CORP\' với tên division_code, và loại bỏ các dòng trùng lặp.'
    },
    requirements: [
      { en: '1. Select name and salary from employees', vi: '1. Chọn name và salary từ bảng employees' },
      { en: '2. Compute (salary * 12) AS annual_salary', vi: '2. Tính (salary * 12) AS annual_salary' },
      { en: '3. Include literal \'HQ-CORP\' AS division_code', vi: '3. Bổ sung chuỗi hằng \'HQ-CORP\' AS division_code' },
      { en: '4. Use DISTINCT to guarantee unique output tuples', vi: '4. Sử dụng DISTINCT để đảm bảo kết quả không trùng' }
    ],
    starterCode: `-- Write your projection query
SELECT DISTINCT name, salary FROM employees;`,
    solutionCode: `SELECT DISTINCT name, salary, (salary * 12) AS annual_salary, 'HQ-CORP' AS division_code FROM employees;`,
    hints: [
      {
        en: 'Add (salary * 12) AS annual_salary and \'HQ-CORP\' AS division_code to the projection list.',
        vi: 'Thêm (salary * 12) AS annual_salary và \'HQ-CORP\' AS division_code vào danh sách cột sau SELECT DISTINCT.'
      }
    ],
    solutionExplanation: {
      en: 'This query exercises column projection, arithmetic expressions, alias naming, constant literal injection, and DISTINCT deduplication in a single statement.',
      vi: 'Câu truy vấn này tổng hợp đầy đủ phép chiếu cột, biểu thức số học, đặt bí danh, tiêm giá trị hằng số và khử trùng lặp DISTINCT.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_select_1',
      type: 'single_choice',
      question: {
        en: 'What is the primary function of the AS keyword in a SELECT statement?',
        vi: 'Chức năng chính của từ khóa AS trong câu lệnh SELECT là gì?'
      },
      options: [
        { en: 'To assign an alias (temporary display name) to a column or computed expression', vi: 'Gán bí danh (tên hiển thị tạm thời) cho một cột hoặc biểu thức tính toán' },
        { en: 'To sort the result set alphabetically', vi: 'Sắp xếp tập kết quả theo bảng chữ cái' },
        { en: 'To filter out NULL values automatically', vi: 'Tự động lọc bỏ các giá trị NULL' },
        { en: 'To permanently change the column name in the database disk storage', vi: 'Đổi tên cột vĩnh viễn trong ổ đĩa của CSDL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'AS creates a query-time alias for the projected column without altering the underlying database schema.',
        vi: 'AS tạo bí danh hiển thị tại thời điểm truy vấn mà không làm thay đổi lược đồ bảng gốc.'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_select_2',
      type: 'single_choice',
      question: {
        en: 'In standard SQL logical processing, in what order are the clauses evaluated?',
        vi: 'Trong thứ tự xử lý logic chuẩn của SQL, các mệnh đề được đánh giá theo trình tự nào?'
      },
      options: [
        { en: 'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT', vi: 'FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT' },
        { en: 'SELECT -> FROM -> WHERE -> ORDER BY -> GROUP BY -> LIMIT', vi: 'SELECT -> FROM -> WHERE -> ORDER BY -> GROUP BY -> LIMIT' },
        { en: 'WHERE -> SELECT -> FROM -> HAVING -> ORDER BY', vi: 'WHERE -> SELECT -> FROM -> HAVING -> ORDER BY' },
        { en: 'LIMIT -> ORDER BY -> SELECT -> FROM -> WHERE', vi: 'LIMIT -> ORDER BY -> SELECT -> FROM -> WHERE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SQL evaluates the source data first (FROM, WHERE), then aggregates (GROUP BY, HAVING), then projects columns (SELECT), sorts (ORDER BY), and finally truncates (LIMIT).',
        vi: 'SQL xử lý nguồn dữ liệu trước (FROM, WHERE), sau đó gom nhóm (GROUP BY, HAVING), rồi mới chiếu cột (SELECT), sắp xếp (ORDER BY) và cắt phân trang (LIMIT).'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_select_3',
      type: 'true_false',
      question: {
        en: 'In SQL, literal strings must be enclosed in single quotes (\'like this\'), not double quotes.',
        vi: 'Trong SQL chuẩn, các chuỗi văn bản hằng số bắt buộc phải đặt trong cặp dấu nháy đơn (\'như thế này\'), không phải nháy kép.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Single quotes denote string literals, while double quotes are used for database identifiers (e.g. table or column names with special characters).',
        vi: 'Đúng. Dấu nháy đơn biểu thị chuỗi hằng số, còn dấu nháy kép dùng cho tên định danh bảng hoặc cột.'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_select_4',
      type: 'single_choice',
      question: {
        en: 'Why will the following query fail in standard SQL? SELECT salary * 12 AS annual_sal FROM employees WHERE annual_sal > 60000;',
        vi: 'Tại sao câu truy vấn sau sẽ báo lỗi trong SQL chuẩn? SELECT salary * 12 AS annual_sal FROM employees WHERE annual_sal > 60000;'
      },
      options: [
        { en: 'Because WHERE is evaluated before SELECT, so annual_sal does not exist yet when WHERE executes', vi: 'Vì mệnh đề WHERE được thực thi trước SELECT, nên bí danh annual_sal chưa tồn tại khi WHERE chạy' },
        { en: 'Because SQL does not allow multiplying by 12', vi: 'Vì SQL không cho phép nhân với 12' },
        { en: 'Because annual_sal is a reserved SQL keyword', vi: 'Vì annual_sal là một từ khóa dành riêng của SQL' },
        { en: 'Because 60000 must be written in single quotes', vi: 'Vì số 60000 bắt buộc phải đặt trong dấu nháy đơn' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The WHERE clause executes before the SELECT clause; therefore, column aliases defined in SELECT are not visible in WHERE.',
        vi: 'Mệnh đề WHERE chạy trước mệnh đề SELECT, do đó các bí danh đặt trong SELECT chưa thể sử dụng được trong WHERE.'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_select_5',
      type: 'single_choice',
      question: {
        en: 'If a table has 10 rows where (dept, role) pairs are (\'HR\', \'Manager\') 4 times and (\'IT\', \'Dev\') 6 times, how many rows does "SELECT DISTINCT dept, role FROM employees;" return?',
        vi: 'Nếu một bảng có 10 dòng với cặp (dept, role) gồm (\'HR\', \'Manager\') lặp lại 4 lần và (\'IT\', \'Dev\') lặp lại 6 lần, câu lệnh "SELECT DISTINCT dept, role FROM employees;" sẽ trả về bao nhiêu dòng?'
      },
      options: [
        { en: '2 rows', vi: '2 dòng' },
        { en: '10 rows', vi: '10 dòng' },
        { en: '4 rows', vi: '4 dòng' },
        { en: '1 row', vi: '1 dòng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DISTINCT evaluates uniqueness across the combination of all projected columns, producing exactly 2 unique tuples.',
        vi: 'DISTINCT đánh giá tính duy nhất trên toàn bộ tổ hợp các cột được chọn, do đó chỉ trả về đúng 2 dòng duy nhất.'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_select_6',
      type: 'predict_output',
      question: {
        en: 'What is the output of the query: SELECT 10 + 5 * 2 AS result;',
        vi: 'Kết quả của câu truy vấn: SELECT 10 + 5 * 2 AS result; là gì?'
      },
      options: [
        { en: '20', vi: '20' },
        { en: '30', vi: '30' },
        { en: '25', vi: '25' },
        { en: 'NULL', vi: 'NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Standard operator precedence applies: multiplication (5 * 2 = 10) executes before addition (10 + 10 = 20).',
        vi: 'Thứ tự ưu tiên toán học chuẩn được áp dụng: phép nhân (5 * 2 = 10) thực hiện trước phép cộng (10 + 10 = 20).'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_select_7',
      type: 'true_false',
      question: {
        en: 'The AS keyword is optional for column aliasing in standard SQL (e.g. "SELECT name full_name FROM users;" is valid).',
        vi: 'Từ khóa AS là tùy chọn khi đặt bí danh cột trong SQL chuẩn (ví dụ: "SELECT name full_name FROM users;" là hợp lệ).'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Omitting AS is valid syntax, but explicitly including AS is strongly recommended for clarity and readability.',
        vi: 'Đúng. Bỏ từ khóa AS vẫn hợp lệ về mặt cú pháp, nhưng khuyến khích luôn viết rõ AS để mã nguồn mạch lạc và dễ bảo trì.'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_select_8',
      type: 'single_choice',
      question: {
        en: 'How can you select a literal constant value alongside table columns?',
        vi: 'Làm thế nào để chọn một giá trị hằng số cố định cùng với các cột của bảng?'
      },
      options: [
        { en: 'Include the literal directly in the SELECT list (e.g. SELECT name, \'Vietnam\' AS country FROM users;)', vi: 'Đưa trực tiếp giá trị hằng vào danh sách SELECT (ví dụ: SELECT name, \'Vietnam\' AS country FROM users;)' },
        { en: 'You must create a temporary table for every constant value', vi: 'Phải tạo một bảng tạm riêng cho từng giá trị hằng' },
        { en: 'Constants can only be added using triggers', vi: 'Hằng số chỉ có thể thêm qua trigger' },
        { en: 'SQL does not allow literal values in SELECT', vi: 'SQL không cho phép dùng giá trị hằng trong SELECT' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Any literal value (string, integer, float) can be directly included in the SELECT projection list.',
        vi: 'Mọi giá trị hằng (chuỗi, số nguyên, số thực) đều có thể đưa trực tiếp vào danh sách các cột của SELECT.'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_select_9',
      type: 'single_choice',
      question: {
        en: 'What happens if you execute: SELECT DISTINCT * FROM employees;?',
        vi: 'Điều gì xảy ra khi bạn thực thi lệnh: SELECT DISTINCT * FROM employees;?'
      },
      options: [
        { en: 'It returns all columns, removing rows where every single column value is completely identical to another row', vi: 'Nó trả về tất cả các cột, và chỉ loại bỏ những hàng mà toàn bộ giá trị của tất cả các cột trùng khớp 100% với một hàng khác' },
        { en: 'It causes a syntax error because DISTINCT cannot be used with *', vi: 'Gây lỗi cú pháp vì DISTINCT không thể dùng chung với *' },
        { en: 'It randomly deletes 50% of the table rows', vi: 'Nó xóa ngẫu nhiên 50% số hàng của bảng' },
        { en: 'It reorders columns randomly', vi: 'Nó đảo lộn thứ tự các cột ngẫu nhiên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SELECT DISTINCT * evaluates uniqueness across all table columns simultaneously.',
        vi: 'SELECT DISTINCT * đánh giá tính duy nhất trên toàn bộ tất cả các cột của bảng cùng lúc.'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_select_10',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid arithmetic operators supported inside a SQL SELECT projection? (Select all that apply)',
        vi: 'Những toán tử số học nào sau đây được hỗ trợ hợp lệ bên trong mệnh đề SELECT của SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: '+ (Addition)', vi: '+ (Phép cộng)' },
        { en: '- (Subtraction)', vi: '- (Phép trừ)' },
        { en: '* (Multiplication)', vi: '* (Phép nhân)' },
        { en: '/ (Division)', vi: '/ (Phép chia)' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'All standard arithmetic operators (+, -, *, /) are natively supported in SQL expressions.',
        vi: 'Tất cả các toán tử số học cơ bản (+, -, *, /) đều được hỗ trợ trực tiếp trong biểu thức SQL.'
      },
      topicId: 'sql_select_aliases',
      difficulty: 'easy'
    }
  ]
};

export default lesson02;
