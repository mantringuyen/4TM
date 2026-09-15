import { Lesson } from '../../../../types';

export const lesson09: Lesson = {
  id: 'sql_lesson_9',
  moduleId: 'sql_mod_2',
  levelId: 'basic',
  courseId: 'sql',
  order: 9,
  topicId: 'sql_aggregate_functions',
  title: {
    en: 'Aggregate Functions: COUNT, SUM, AVG, MIN, MAX',
    vi: 'Các Hàm Tổng Hợp: COUNT, SUM, AVG, MIN, MAX'
  },
  summary: {
    en: 'Master scalar aggregation across table rows using COUNT(*), COUNT(col), COUNT(DISTINCT), SUM, AVG, MIN, and MAX, understanding NULL elimination mechanics.',
    vi: 'Làm chủ tính toán tổng hợp trên toàn bảng với COUNT(*), COUNT(cột), COUNT(DISTINCT), SUM, AVG, MIN và MAX, hiểu rõ cơ chế tự động loại trừ giá trị NULL.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Aggregate functions summarize multi-row datasets into a single scalar value. Whether calculating total company payroll, finding the highest transaction amount, or measuring average test scores, aggregate functions are the foundation of SQL business intelligence and reporting.',
      vi: 'Các hàm tổng hợp tóm tắt tập dữ liệu nhiều dòng thành một giá trị vô hướng duy nhất. Dù tính tổng quỹ lương, tìm giá trị giao dịch cao nhất hay đo điểm thi trung bình, các hàm tổng hợp chính là nền tảng của báo cáo phân tích kinh doanh trong SQL.'
    },
    conceptExplanation: {
      en: 'Core Aggregate Function Mechanics:\n1. COUNT Variations:\n   - COUNT(*) counts every single row in the table (including rows with all NULLs).\n   - COUNT(column) counts only rows where column IS NOT NULL.\n   - COUNT(DISTINCT column) counts unique non-null occurrences.\n2. SUM & AVG: Compute numeric sums and arithmetic means. Crucially, NULL values are automatically ignored during computation (they are not treated as 0).\n3. MIN & MAX: Find the minimum and maximum values across numbers, dates, or alphabetical strings.\n4. Type Precision: In engines like SQLite or SQL Server, dividing integers (e.g. 5 / 2) performs integer division (yielding 2). Cast to REAL/FLOAT or multiply by 1.0 for accurate decimals.',
      vi: 'Cơ chế hoạt động của các hàm tổng hợp:\n1. Các biến thể COUNT:\n   - COUNT(*) đếm toàn bộ số dòng trong bảng (bao gồm cả dòng chứa toàn NULL).\n   - COUNT(tên_cột) chỉ đếm những dòng mà cột đó có giá trị khác NULL.\n   - COUNT(DISTINCT tên_cột) đếm số lượng giá trị duy nhất không bị NULL.\n2. SUM & AVG: Tính tổng và giá trị trung bình. Quan trọng là các giá trị NULL luôn bị tự động bỏ qua (không bị tính là số 0).\n3. MIN & MAX: Tìm giá trị nhỏ nhất và lớn nhất trên kiểu số, ngày tháng hoặc chuỗi ký tự theo thứ tự chữ cái.\n4. Độ chính xác số học: Trong SQLite hoặc SQL Server, chia hai số nguyên (5 / 2) sẽ là phép chia nguyên (ra 2). Hãy ép kiểu sang REAL/FLOAT hoặc nhân với 1.0 để giữ phần thập phân.'
    },
    syntax: `SELECT COUNT(*) AS total_records,
       COUNT(DISTINCT department) AS unique_departments,
       SUM(salary) AS total_payroll,
       ROUND(AVG(salary), 2) AS average_salary,
       MIN(salary) AS min_salary,
       MAX(salary) AS max_salary
FROM employees;`,
    examples: [
      {
        title: {
          en: '1. Complete Executive KPI Summary',
          vi: '1. Báo Cáo Tổng Hợp KPI Ban Lãnh Đạo'
        },
        code: `SELECT COUNT(*) AS total_staff,
       COUNT(bonus) AS staff_with_bonus,
       SUM(salary) AS total_monthly_spend,
       ROUND(AVG(salary), 2) AS mean_salary,
       MIN(salary) AS floor_salary,
       MAX(salary) AS ceiling_salary
FROM employees;`,
        language: 'sql',
        explanation: {
          en: 'Demonstrates COUNT(*) counting all rows, COUNT(bonus) counting non-null bonuses, and financial metrics with ROUND().',
          vi: 'Minh họa COUNT(*) đếm toàn bộ dòng, COUNT(bonus) đếm nhân viên có thưởng và tính toán các chỉ số tài chính với hàm ROUND().'
        }
      },
      {
        title: {
          en: '2. Aggregation with WHERE Predicates',
          vi: '2. Tính Tổng Hợp Kèm Điều Kiện WHERE'
        },
        code: `SELECT COUNT(*) AS senior_engineers,
       SUM(salary) AS engineering_spend,
       ROUND(AVG(salary), 2) AS avg_eng_salary
FROM employees
WHERE department = 'Engineering' AND salary >= 80000;`,
        language: 'sql',
        explanation: {
          en: 'Applies WHERE filtering first to narrow down the dataset before the aggregate functions compute the summary.',
          vi: 'Áp dụng bộ lọc WHERE trước để thu hẹp dữ liệu trước khi các hàm tổng hợp tiến hành tính toán.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Selecting unaggregated columns alongside aggregate functions without a GROUP BY clause.',
          vi: 'Chọn các cột riêng lẻ không tổng hợp cùng với hàm tổng hợp mà không có mệnh đề GROUP BY.'
        },
        correction: {
          en: 'In standard ANSI SQL, writing "SELECT name, AVG(salary) FROM employees" is illegal because name has multiple rows while AVG(salary) is a single scalar. Use GROUP BY or window functions.',
          vi: 'Trong chuẩn ANSI SQL, viết "SELECT name, AVG(salary) FROM employees" là không hợp lệ vì name có nhiều dòng còn AVG(salary) chỉ là 1 số duy nhất. Hãy dùng GROUP BY hoặc Window function.'
        }
      },
      {
        mistake: {
          en: 'Assuming AVG() treats NULL as 0.',
          vi: 'Nghĩ rằng hàm AVG() coi các giá trị NULL là số 0.'
        },
        correction: {
          en: 'AVG() ignores NULLs in both numerator and denominator. If 3 rows have values (100, 200, NULL), AVG is (100 + 200) / 2 = 150, NOT 100. Use AVG(COALESCE(col, 0)) if NULL must count as 0.',
          vi: 'AVG() bỏ qua NULL ở cả tử số lẫn mẫu số. Với 3 dòng (100, 200, NULL), AVG là (100 + 200) / 2 = 150, KHÔNG PHẢI 100. Dùng AVG(COALESCE(col, 0)) nếu muốn tính NULL là 0.'
        }
      }
    ],
    tips: [
      {
        en: 'COUNT(*) is optimized in modern database engines to use the smallest available secondary index tree.',
        vi: 'COUNT(*) được tối ưu hóa trong các hệ CSDL hiện đại để tự động quét qua cây chỉ mục phụ có kích thước nhỏ nhất.'
      },
      {
        en: 'MIN() and MAX() can be applied to string columns (alphabetical order) and date columns (earliest/latest date).',
        vi: 'MIN() và MAX() có thể áp dụng trên cả cột chuỗi (thứ tự bảng chữ cái) và cột ngày tháng (ngày sớm nhất / muộn nhất).'
      }
    ],
    practiceStarterCode: `-- Compute total employees, average salary rounded to 2 decimals, and maximum salary
SELECT COUNT(*) AS total_emp, ROUND(AVG(salary), 2) AS avg_sal, MAX(salary) AS max_sal FROM employees;`
  },
  exercisePool: [
    {
      id: 'sql_ex_agg_1',
      type: 'complete_code',
      title: {
        en: 'Count Unique Product Categories',
        vi: 'Đếm Số Lượng Danh Mục Sản Phẩm Duy Nhất'
      },
      instruction: {
        en: 'Write a query to count the number of unique departments in the employees table with alias distinct_depts.',
        vi: 'Viết câu truy vấn đếm số lượng phòng ban duy nhất từ bảng employees với bí danh distinct_depts.'
      },
      starterCode: `SELECT COUNT(___ department) AS distinct_depts
FROM employees;`,
      solutionCode: `SELECT COUNT(DISTINCT department) AS distinct_depts
FROM employees;`,
      hint: {
        en: 'Use DISTINCT inside the COUNT() function.',
        vi: 'Dùng từ khóa DISTINCT bên trong hàm COUNT().'
      },
      explanation: {
        en: 'COUNT(DISTINCT col) tallies only unique non-null values.',
        vi: 'COUNT(DISTINCT col) chỉ tính các giá trị duy nhất khác null.'
      }
    },
    {
      id: 'sql_ex_agg_2',
      type: 'complete_code',
      title: {
        en: 'Compute Department Salary Metrics',
        vi: 'Tính Toán Các Chỉ Số Lương Phòng Ban'
      },
      instruction: {
        en: 'Calculate the total salary as total_payroll and the rounded average salary as avg_payroll from the employees table.',
        vi: 'Tính tổng lương total_payroll và lương trung bình làm tròn 2 chữ số avg_payroll từ bảng employees.'
      },
      starterCode: `SELECT SUM(salary) AS total_payroll, ROUND(___(salary), 2) AS avg_payroll
FROM employees;`,
      solutionCode: `SELECT SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_payroll
FROM employees;`,
      hint: {
        en: 'Use the AVG() function.',
        vi: 'Dùng hàm AVG().'
      },
      explanation: {
        en: 'AVG() computes the arithmetic mean of the numeric column.',
        vi: 'AVG() tính giá trị trung bình số học của cột số.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_aggregate_functions',
    title: {
      en: 'Executive Payroll Analytics Scorecard',
      vi: 'Bảng Điểm Báo Cáo Phân Tích Quỹ Lương Ban Lãnh Đạo'
    },
    description: {
      en: 'Write a SQL query that computes high-level organizational payroll metrics from the employees table. Calculate total_headcount as COUNT(*), distinct_roles as COUNT(DISTINCT role), total_payroll as SUM(salary), average_salary as ROUND(AVG(salary), 2), min_salary as MIN(salary), and max_salary as MAX(salary) for active employees whose salary is at least 40000.',
      vi: 'Viết câu truy vấn SQL tính toán các chỉ số quỹ lương cấp cao từ bảng employees. Tính total_headcount bằng COUNT(*), distinct_roles bằng COUNT(DISTINCT role), total_payroll bằng SUM(salary), average_salary bằng ROUND(AVG(salary), 2), min_salary bằng MIN(salary), và max_salary bằng MAX(salary) cho các nhân viên có mức lương từ 40000 trở lên.'
    },
    requirements: [
      { en: '1. Filter WHERE salary >= 40000', vi: '1. Lọc điều kiện WHERE salary >= 40000' },
      { en: '2. COUNT(*) AS total_headcount, COUNT(DISTINCT role) AS distinct_roles', vi: '2. COUNT(*) AS total_headcount, COUNT(DISTINCT role) AS distinct_roles' },
      { en: '3. SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS average_salary', vi: '3. SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS average_salary' },
      { en: '4. MIN(salary) AS min_salary, MAX(salary) AS max_salary', vi: '4. MIN(salary) AS min_salary, MAX(salary) AS max_salary' }
    ],
    starterCode: `-- Write your executive scorecard query
SELECT COUNT(*) FROM employees;`,
    solutionCode: `SELECT COUNT(*) AS total_headcount,
       COUNT(DISTINCT role) AS distinct_roles,
       SUM(salary) AS total_payroll,
       ROUND(AVG(salary), 2) AS average_salary,
       MIN(salary) AS min_salary,
       MAX(salary) AS max_salary
FROM employees
WHERE salary >= 40000;`,
    hints: [
      {
        en: 'Combine COUNT(*), COUNT(DISTINCT role), SUM(salary), ROUND(AVG(salary), 2), MIN(salary), and MAX(salary) in the SELECT clause with WHERE salary >= 40000.',
        vi: 'Kết hợp COUNT(*), COUNT(DISTINCT role), SUM(salary), ROUND(AVG(salary), 2), MIN(salary) và MAX(salary) trong SELECT kèm điều kiện WHERE salary >= 40000.'
      }
    ],
    solutionExplanation: {
      en: 'Summarizes key business statistics across the organization with precision rounding and pre-aggregation predicate filtering.',
      vi: 'Tổng hợp các chỉ số nghiệp vụ trọng yếu của tổ chức với làm tròn chính xác và lọc dữ liệu trước khi tổng hợp.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_agg_1',
      type: 'single_choice',
      question: {
        en: 'What is the critical difference between COUNT(*) and COUNT(column_name)?',
        vi: 'Sự khác biệt quan trọng giữa COUNT(*) và COUNT(tên_cột) là gì?'
      },
      options: [
        { en: 'COUNT(*) counts all rows including NULLs, whereas COUNT(column_name) counts only rows where the specified column is NOT NULL', vi: 'COUNT(*) đếm tất cả các dòng bao gồm cả NULL, trong khi COUNT(tên_cột) chỉ đếm các dòng mà cột đó KHÔNG PHẢI LÀ NULL' },
        { en: 'COUNT(*) only works on integer primary keys', vi: 'COUNT(*) chỉ hoạt động trên khóa chính kiểu số nguyên' },
        { en: 'COUNT(column_name) is twice as fast', vi: 'COUNT(tên_cột) chạy nhanh gấp đôi' },
        { en: 'COUNT(*) deletes duplicate rows automatically', vi: 'COUNT(*) tự động xóa các dòng trùng lặp' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'COUNT(*) counts total table records regardless of column nullability, while COUNT(col) ignores NULL values in that specific column.',
        vi: 'COUNT(*) đếm tổng số bản ghi bất kể có null hay không, còn COUNT(cột) bỏ qua các giá trị NULL trong cột đó.'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_agg_2',
      type: 'predict_output',
      question: {
        en: 'A table has 4 rows with salary values: 100, 200, 300, and NULL. What is the result of "SELECT AVG(salary) FROM employees;"?',
        vi: 'Một bảng có 4 dòng với lương lần lượt là: 100, 200, 300 và NULL. Kết quả của lệnh "SELECT AVG(salary) FROM employees;" là bao nhiêu?'
      },
      options: [
        { en: '200 ((100 + 200 + 300) / 3)', vi: '200 ((100 + 200 + 300) / 3)' },
        { en: '150 ((100 + 200 + 300 + 0) / 4)', vi: '150 ((100 + 200 + 300 + 0) / 4)' },
        { en: 'NULL', vi: 'NULL' },
        { en: '600', vi: '600' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'AVG() eliminates NULLs from both the sum and the row count divisor: (100 + 200 + 300) / 3 = 200.',
        vi: 'AVG() loại trừ hoàn toàn NULL ở cả tổng và số chia: (100 + 200 + 300) / 3 = 200.'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_agg_3',
      type: 'single_choice',
      question: {
        en: 'How do you count the number of unique active courses in a student enrollments table?',
        vi: 'Làm thế nào để đếm số lượng khóa học duy nhất trong bảng đăng ký môn học của sinh viên?'
      },
      options: [
        { en: 'SELECT COUNT(DISTINCT course_id) FROM enrollments;', vi: 'SELECT COUNT(DISTINCT course_id) FROM enrollments;' },
        { en: 'SELECT DISTINCT COUNT(course_id) FROM enrollments;', vi: 'SELECT DISTINCT COUNT(course_id) FROM enrollments;' },
        { en: 'SELECT UNIQUE_COUNT(course_id) FROM enrollments;', vi: 'SELECT UNIQUE_COUNT(course_id) FROM enrollments;' },
        { en: 'SELECT COUNT(*) DISTINCT course_id FROM enrollments;', vi: 'SELECT COUNT(*) DISTINCT course_id FROM enrollments;' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'COUNT(DISTINCT column_name) evaluates unique non-null values inside the aggregate function.',
        vi: 'COUNT(DISTINCT tên_cột) đếm các giá trị duy nhất khác null bên trong hàm tổng hợp.'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_agg_4',
      type: 'true_false',
      question: {
        en: 'The SUM() function ignores NULL values and returns the sum of all non-null numbers.',
        vi: 'Hàm SUM() tự động bỏ qua các giá trị NULL và tính tổng của tất cả các số khác null.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. In SQL, aggregate functions (except COUNT(*)) automatically discard NULL values.',
        vi: 'Đúng. Trong SQL, tất cả các hàm tổng hợp (ngoại trừ COUNT(*)) đều tự động bỏ qua các giá trị NULL.'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_agg_5',
      type: 'predict_output',
      question: {
        en: 'What does "SELECT SUM(salary) FROM employees WHERE 1 = 0;" evaluate to when no rows match?',
        vi: 'Câu lệnh "SELECT SUM(salary) FROM employees WHERE 1 = 0;" trả về kết quả gì khi không có dòng nào thỏa mãn điều kiện?'
      },
      options: [
        { en: 'NULL', vi: 'NULL' },
        { en: '0', vi: '0' },
        { en: 'Error: Empty table', vi: 'Lỗi: Bảng rỗng' },
        { en: 'Undefined', vi: 'Không xác định' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'By ANSI SQL standard, SUM(), AVG(), MIN(), MAX() return NULL when applied to empty row sets (whereas COUNT() returns 0).',
        vi: 'Theo chuẩn ANSI SQL, các hàm SUM(), AVG(), MIN(), MAX() trả về NULL khi tập bản ghi rỗng (trong khi COUNT() trả về 0).'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_agg_6',
      type: 'single_choice',
      question: {
        en: 'Can MIN() and MAX() be used on text and date columns?',
        vi: 'Hàm MIN() và MAX() có thể sử dụng trên cột văn bản (text) và ngày tháng (date) được không?'
      },
      options: [
        { en: 'Yes, MIN returns alphabetical first / earliest date, while MAX returns alphabetical last / latest date', vi: 'Có, MIN trả về chữ cái đầu tiên / ngày sớm nhất, MAX trả về chữ cái cuối cùng / ngày muộn nhất' },
        { en: 'No, MIN and MAX only support integers', vi: 'Không, MIN và MAX chỉ hỗ trợ số nguyên' },
        { en: 'Only in PostgreSQL', vi: 'Chỉ hỗ trợ trong PostgreSQL' },
        { en: 'Only when converting to ASCII codes first', vi: 'Chỉ khi chuyển đổi sang mã ASCII trước' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MIN/MAX work on any comparable data type, including strings (lexicographical sorting) and temporal types.',
        vi: 'MIN/MAX hoạt động trên mọi kiểu dữ liệu có thể so sánh, bao gồm chuỗi văn bản và ngày tháng.'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_agg_7',
      type: 'true_false',
      question: {
        en: 'COUNT(*) on an empty table returns 0, not NULL.',
        vi: 'COUNT(*) trên một bảng rỗng không có dữ liệu trả về số 0, không phải NULL.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. COUNT always returns an integer count, evaluating to 0 when zero rows match.',
        vi: 'Đúng. Hàm COUNT luôn trả về một số nguyên đếm được, cho kết quả bằng 0 khi không có dòng nào.'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_agg_8',
      type: 'single_choice',
      question: {
        en: 'How do you force AVG() to count NULL values as 0 in its average calculation?',
        vi: 'Làm thế nào để buộc hàm AVG() tính các giá trị NULL là số 0 trong phép tính trung bình?'
      },
      options: [
        { en: 'AVG(COALESCE(column_name, 0))', vi: 'AVG(COALESCE(tên_cột, 0))' },
        { en: 'AVG(column_name WITH NULLS)', vi: 'AVG(tên_cột WITH NULLS)' },
        { en: 'AVG_ZERO(column_name)', vi: 'AVG_ZERO(tên_cột)' },
        { en: 'SET NULL_AS_ZERO = TRUE; AVG(column_name)', vi: 'SET NULL_AS_ZERO = TRUE; AVG(tên_cột)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Wrapping the column in COALESCE(col, 0) replaces NULLs with 0 so they are included in the count divisor and sum.',
        vi: 'Bọc cột bằng COALESCE(col, 0) thay thế NULL thành 0 để các dòng này được tính vào mẫu số chia và tổng.'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_agg_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are standard SQL aggregate functions? (Select all that apply)',
        vi: 'Những hàm nào sau đây là hàm tổng hợp chuẩn trong SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'COUNT()', vi: 'COUNT()' },
        { en: 'SUM()', vi: 'SUM()' },
        { en: 'AVG()', vi: 'AVG()' },
        { en: 'MIN() and MAX()', vi: 'MIN() và MAX()' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'COUNT, SUM, AVG, MIN, and MAX are the five core standard aggregate functions in SQL.',
        vi: 'COUNT, SUM, AVG, MIN và MAX là 5 hàm tổng hợp cốt lõi chuẩn mực trong SQL.'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_agg_10',
      type: 'single_choice',
      question: {
        en: 'Why does "SELECT name, SUM(salary) FROM employees;" cause an error in strictly compliant SQL databases?',
        vi: 'Tại sao câu lệnh "SELECT name, SUM(salary) FROM employees;" lại gây lỗi trong các CSDL chuẩn mực?'
      },
      options: [
        { en: 'Because \'name\' produces multiple rows while SUM(salary) produces a single aggregate row, creating a structural dimensionality mismatch without GROUP BY', vi: 'Vì \'name\' trả về nhiều dòng trong khi SUM(salary) chỉ trả về 1 dòng tổng hợp duy nhất, gây xung đột chiều dữ liệu nếu không có GROUP BY' },
        { en: 'Because name is a reserved keyword', vi: 'Vì name là từ khóa dành riêng' },
        { en: 'Because SUM can only be run on numbers below 10,000', vi: 'Vì SUM chỉ chạy được trên số nhỏ hơn 10.000' },
        { en: 'Because employees cannot have names', vi: 'Vì nhân viên không thể có tên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Mixing unaggregated columns with aggregate functions without GROUP BY creates an ambiguous 1-to-many dimensional conflict.',
        vi: 'Kết hợp cột không tổng hợp với hàm tổng hợp mà không có GROUP BY gây ra sự xung đột kích thước dữ liệu (1 dòng vs nhiều dòng).'
      },
      topicId: 'sql_aggregate_functions',
      difficulty: 'medium'
    }
  ]
};

export default lesson09;
