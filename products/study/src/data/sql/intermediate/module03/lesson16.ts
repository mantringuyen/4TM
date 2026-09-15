import { Lesson } from '../../../../types';

export const lesson16: Lesson = {
  id: 'sql_lesson_16',
  moduleId: 'sql_mod_3',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 16,
  topicId: 'sql_conditional_case',
  title: {
    en: 'Conditional Expressions: CASE WHEN, COALESCE & NULLIF',
    vi: 'Biểu Thức Điều Kiện: CASE WHEN, COALESCE & NULLIF'
  },
  summary: {
    en: 'Master conditional logic in SQL: Searched & Simple CASE WHEN expressions, fallback value substitution with COALESCE, division-by-zero protection with NULLIF, and conditional pivot aggregations.',
    vi: 'Làm chủ logic điều kiện trong SQL: biểu thức CASE WHEN dạng tìm kiếm & dạng đơn, thay thế giá trị mặc định bằng COALESCE, chống lỗi chia cho 0 bằng NULLIF và kỹ thuật xoay trục tổng hợp có điều kiện.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Relational data often requires conditional classification, dynamic categorization, and safe null handling directly inside query projections. SQL conditional expressions—CASE WHEN, COALESCE, and NULLIF—enable branching logic, safe mathematical division, and column-to-row pivoting without client-side loops.',
      vi: 'Dữ liệu quan hệ thường đòi hỏi phân loại có điều kiện, gắn nhãn động và xử lý giá trị null an toàn ngay trong câu truy vấn. Các biểu thức điều kiện trong SQL—CASE WHEN, COALESCE và NULLIF—mang lại khả năng phân nhánh logic, chống lỗi chia cho 0 và xoay trục dữ liệu trực tiếp mà không cần code xử lý ở tầng ứng dụng.'
    },
    conceptExplanation: {
      en: 'Core Conditional Mechanics in SQL:\n1. Searched CASE: Evaluates boolean expressions sequentially from top to bottom. Returns the result of the first TRUE branch. If no branch matches, returns the ELSE clause (or NULL if ELSE is omitted):\n   CASE WHEN score >= 90 THEN \'A\' WHEN score >= 80 THEN \'B\' ELSE \'C\' END\n2. Simple CASE: Compares a single expression against equality targets:\n   CASE status WHEN 1 THEN \'Active\' WHEN 0 THEN \'Inactive\' ELSE \'Unknown\' END\n3. COALESCE(val1, val2, ...): Returns the very first non-NULL expression in the parameter list. Essential for providing sensible default values.\n4. NULLIF(expr1, expr2): Returns NULL if expr1 equals expr2; otherwise returns expr1. Perfect for preventing division-by-zero crashes: amount / NULLIF(total, 0).\n5. Conditional Aggregation: Embedding CASE inside SUM() or COUNT() to count or sum specific sub-populations into pivoted columns.',
      vi: 'Cơ chế các biểu thức điều kiện trong SQL:\n1. Searched CASE (CASE dạng tìm kiếm): Đánh giá tuần tự các biểu thức boolean từ trên xuống dưới. Trả về kết quả của nhánh TRUE đầu tiên. Nếu không có nhánh nào khớp, trả về giá trị trong ELSE (hoặc NULL nếu không có ELSE):\n   CASE WHEN score >= 90 THEN \'A\' WHEN score >= 80 THEN \'B\' ELSE \'C\' END\n2. Simple CASE (CASE dạng đơn): So sánh bằng một biểu thức với các giá trị mục tiêu:\n   CASE status WHEN 1 THEN \'Active\' WHEN 0 THEN \'Inactive\' ELSE \'Unknown\' END\n3. COALESCE(val1, val2, ...): Trả về giá trị đầu tiên khác NULL trong danh sách đối số. Cực kỳ quan trọng để gán giá trị mặc định.\n4. NULLIF(expr1, expr2): Trả về NULL nếu expr1 bằng expr2; ngược lại trả về expr1. Công cụ hoàn hảo để phòng chống lỗi chia cho 0: amount / NULLIF(total, 0).\n5. Tổng hợp có điều kiện (Conditional Aggregation): Lồng CASE vào trong SUM() hoặc COUNT() để đếm hoặc tính tổng cho các nhóm con thành các cột xoay trục.'
    },
    syntax: `SELECT id, name,
       CASE 
         WHEN salary >= 100000 THEN 'Executive'
         WHEN salary >= 60000 THEN 'Senior'
         ELSE 'Associate'
       END AS compensation_tier,
       COALESCE(bonus, 0) AS safe_bonus,
       ROUND(revenue / NULLIF(units_sold, 0), 2) AS price_per_unit
FROM sales_reps;`,
    examples: [
      {
        title: {
          en: '1. Conditional Aggregation Matrix (Pivoting with CASE)',
          vi: '1. Ma Trận Tổng Hợp Có Điều Kiện (Xoay Trục Bằng CASE)'
        },
        code: `SELECT department,
       COUNT(*) AS total_staff,
       SUM(CASE WHEN salary >= 80000 THEN 1 ELSE 0 END) AS high_earners,
       SUM(CASE WHEN salary < 80000 THEN 1 ELSE 0 END) AS standard_earners
FROM employees
GROUP BY department;`,
        language: 'sql',
        explanation: {
          en: 'Pivots employee counts into dedicated columns based on compensation thresholds inside a single aggregation pass.',
          vi: 'Xoay trục số lượng nhân viên thành các cột riêng biệt dựa trên ngưỡng lương chỉ trong một lần quét dữ liệu.'
        }
      },
      {
        title: {
          en: '2. Safe Division with NULLIF and Null Fallback with COALESCE',
          vi: '2. Phép Chia An Toàn Với NULLIF và Thay Thế NULL Bằng COALESCE'
        },
        code: `SELECT campaign_id,
       clicks,
       conversions,
       COALESCE(ROUND(conversions * 100.0 / NULLIF(clicks, 0), 2), 0.0) AS conversion_rate_pct
FROM ad_campaigns;`,
        language: 'sql',
        explanation: {
          en: 'Prevents database crashes when clicks = 0 using NULLIF, and converts any resulting NULL rate to 0.0 using COALESCE.',
          vi: 'Tránh lỗi sập CSDL khi clicks = 0 bằng NULLIF và chuyển tỷ lệ NULL thành 0.0 một cách an toàn bằng COALESCE.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Dividing by zero directly without NULLIF (e.g. sales / target).',
          vi: 'Chia trực tiếp cho 0 mà không dùng NULLIF (ví dụ: sales / target).'
        },
        correction: {
          en: 'If target is 0, standard SQL raises a fatal "division by zero" exception that aborts the entire transaction. Always wrap denominators in NULLIF(denominator, 0).',
          vi: 'Nếu target bằng 0, SQL sẽ ném ra ngoại lệ nghiêm trọng "division by zero" làm dừng toàn bộ truy vấn. Luôn bọc mẫu số bằng NULLIF(mẫu_số, 0).'
        }
      },
      {
        mistake: {
          en: 'Forgetting the END keyword at the conclusion of a CASE expression.',
          vi: 'Quên từ khóa END khi kết thúc biểu thức CASE.'
        },
        correction: {
          en: 'Every CASE statement must conclude with the END keyword (and an optional column alias AS alias_name).',
          vi: 'Mọi biểu thức CASE bắt buộc phải kết thúc bằng từ khóa END (kèm bí danh cột tùy chọn AS tên_bí_danh).'
        }
      }
    ],
    tips: [
      {
        en: 'CASE expressions short-circuit: once a WHEN condition evaluates to TRUE, remaining branches are skipped.',
        vi: 'Biểu thức CASE có cơ chế ngắt sớm: ngay khi một điều kiện WHEN là TRUE, các nhánh còn lại sẽ được bỏ qua.'
      },
      {
        en: 'All result branches in a CASE statement must return compatible data types.',
        vi: 'Tất cả các nhánh kết quả trong biểu thức CASE bắt buộc phải trả về kiểu dữ liệu tương thích với nhau.'
      }
    ],
    practiceStarterCode: `-- Practice CASE WHEN classification
SELECT name, salary, CASE WHEN salary >= 75000 THEN 'Tier 1' ELSE 'Tier 2' END AS tier FROM employees;`
  },
  exercisePool: [
    {
      id: 'sql_ex_case_1',
      type: 'complete_code',
      title: {
        en: 'Categorize Employees by Salary Tier',
        vi: 'Phân Loại Nhân Viên Theo Ngưỡng Lương'
      },
      instruction: {
        en: 'Complete the searched CASE expression to classify employees earning >= 70000 as \'High\', otherwise \'Standard\'.',
        vi: 'Hoàn thiện biểu thức CASE dạng tìm kiếm để phân loại nhân viên có lương >= 70000 là \'High\', còn lại là \'Standard\'.'
      },
      starterCode: `SELECT name, salary,
       CASE
         WHEN salary >= 70000 THEN 'High'
         ___ 'Standard'
       END AS salary_category
FROM employees;`,
      solutionCode: `SELECT name, salary,
       CASE
         WHEN salary >= 70000 THEN 'High'
         ELSE 'Standard'
       END AS salary_category
FROM employees;`,
      hint: {
        en: 'Use ELSE for the default fallback.',
        vi: 'Dùng từ khóa ELSE cho trường hợp mặc định.'
      },
      explanation: {
        en: 'The ELSE branch captures all rows not matching previous WHEN predicates.',
        vi: 'Nhánh ELSE xử lý tất cả các dòng không thỏa mãn các điều kiện WHEN phía trước.'
      }
    },
    {
      id: 'sql_ex_case_2',
      type: 'complete_code',
      title: {
        en: 'Safely Compute Click-Through Rate',
        vi: 'Tính Tỷ Lệ Nhấp Chuột An Toàn'
      },
      instruction: {
        en: 'Prevent division by zero by using NULLIF(impressions, 0) in the CTR calculation.',
        vi: 'Chống lỗi chia cho 0 bằng cách dùng NULLIF(impressions, 0) trong phép tính CTR.'
      },
      starterCode: `SELECT ad_id, clicks * 100.0 / ___(impressions, 0) AS ctr
FROM ad_stats;`,
      solutionCode: `SELECT ad_id, clicks * 100.0 / NULLIF(impressions, 0) AS ctr
FROM ad_stats;`,
      hint: {
        en: 'Use the NULLIF function.',
        vi: 'Dùng hàm NULLIF.'
      },
      explanation: {
        en: 'NULLIF(impressions, 0) turns 0 into NULL, which safely results in NULL instead of a division by zero error.',
        vi: 'NULLIF(impressions, 0) biến 0 thành NULL, giúp phép chia trả về NULL an toàn thay vì gây lỗi sập hệ thống.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_conditional_case',
    title: {
      en: 'Executive KPI Dashboard & Departmental Cohort Pivot',
      vi: 'Bảng Điều Khiển KPI Lãnh Đạo & Xoay Trục Nhóm Nhân Sự Phòng Ban'
    },
    description: {
      en: 'Write a SQL query that groups employees by department. Compute total_headcount as COUNT(*), senior_count as SUM(CASE WHEN salary >= 80000 THEN 1 ELSE 0 END), junior_count as SUM(CASE WHEN salary < 80000 THEN 1 ELSE 0 END), and senior_ratio_pct as ROUND(SUM(CASE WHEN salary >= 80000 THEN 1.0 ELSE 0.0 END) * 100.0 / NULLIF(COUNT(*), 0), 2). Order by senior_ratio_pct DESC, department ASC.',
      vi: 'Viết câu truy vấn SQL gom nhóm nhân viên theo department. Tính total_headcount bằng COUNT(*), senior_count bằng SUM(CASE WHEN salary >= 80000 THEN 1 ELSE 0 END), junior_count bằng SUM(CASE WHEN salary < 80000 THEN 1 ELSE 0 END), và senior_ratio_pct bằng ROUND(SUM(CASE WHEN salary >= 80000 THEN 1.0 ELSE 0.0 END) * 100.0 / NULLIF(COUNT(*), 0), 2). Sắp xếp theo senior_ratio_pct DESC, department ASC.'
    },
    requirements: [
      { en: '1. GROUP BY department', vi: '1. Gom nhóm GROUP BY department' },
      { en: '2. Conditional sums for senior_count and junior_count using CASE WHEN', vi: '2. Tính tổng có điều kiện cho senior_count và junior_count bằng CASE WHEN' },
      { en: '3. Safe ratio calculation with NULLIF(COUNT(*), 0)', vi: '3. Tính tỷ lệ an toàn với NULLIF(COUNT(*), 0)' },
      { en: '4. ORDER BY senior_ratio_pct DESC, department ASC', vi: '4. Sắp xếp ORDER BY senior_ratio_pct DESC, department ASC' }
    ],
    starterCode: `-- Write your conditional aggregation scorecard
SELECT department FROM employees GROUP BY department;`,
    solutionCode: `SELECT department,
       COUNT(*) AS total_headcount,
       SUM(CASE WHEN salary >= 80000 THEN 1 ELSE 0 END) AS senior_count,
       SUM(CASE WHEN salary < 80000 THEN 1 ELSE 0 END) AS junior_count,
       ROUND(SUM(CASE WHEN salary >= 80000 THEN 1.0 ELSE 0.0 END) * 100.0 / NULLIF(COUNT(*), 0), 2) AS senior_ratio_pct
FROM employees
GROUP BY department
ORDER BY senior_ratio_pct DESC, department ASC;`,
    hints: [
      {
        en: 'Use SUM(CASE WHEN ... THEN 1 ELSE 0 END) for counts and wrap the division denominator in NULLIF.',
        vi: 'Dùng SUM(CASE WHEN ... THEN 1 ELSE 0 END) để đếm và bọc mẫu số trong NULLIF.'
      }
    ],
    solutionExplanation: {
      en: 'Combines searched CASE expressions, conditional pivoting, zero-safe division, and post-aggregation sorting in a single query.',
      vi: 'Kết hợp biểu thức CASE tìm kiếm, xoay trục có điều kiện, phép chia chống lỗi 0 và sắp xếp sau tổng hợp trong một câu truy vấn duy nhất.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_case_1',
      type: 'single_choice',
      question: {
        en: 'What does the COALESCE(a, b, c) function return?',
        vi: 'Hàm COALESCE(a, b, c) trả về giá trị gì?'
      },
      options: [
        { en: 'The first non-NULL value among its arguments (or NULL if all arguments are NULL)', vi: 'Giá trị đầu tiên khác NULL trong danh sách đối số (hoặc NULL nếu tất cả đối số đều là NULL)' },
        { en: 'The mathematical average of a, b, and c', vi: 'Giá trị trung bình số học của a, b và c' },
        { en: 'The longest text string', vi: 'Chuỗi văn bản dài nhất' },
        { en: 'The sum of all numbers', vi: 'Tổng của tất cả các số' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'COALESCE evaluates arguments in left-to-right order and returns the first non-null value.',
        vi: 'COALESCE đánh giá các đối số theo thứ tự từ trái qua phải và trả về giá trị khác null đầu tiên.'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_case_2',
      type: 'predict_output',
      question: {
        en: 'What is the result of NULLIF(100, 100) in SQL?',
        vi: 'Kết quả của biểu thức NULLIF(100, 100) trong SQL là gì?'
      },
      options: [
        { en: 'NULL', vi: 'NULL' },
        { en: '100', vi: '100' },
        { en: '0', vi: '0' },
        { en: 'TRUE', vi: 'TRUE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'NULLIF(a, b) returns NULL if both arguments are equal; otherwise it returns a.',
        vi: 'NULLIF(a, b) trả về NULL nếu hai đối số bằng nhau; ngược lại nó trả về a.'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_case_3',
      type: 'predict_output',
      question: {
        en: 'What is the result of NULLIF(50, 0)?',
        vi: 'Kết quả của biểu thức NULLIF(50, 0) là gì?'
      },
      options: [
        { en: '50', vi: '50' },
        { en: 'NULL', vi: 'NULL' },
        { en: '0', vi: '0' },
        { en: 'Error', vi: 'Lỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Since 50 != 0, NULLIF returns the first argument unchanged (50).',
        vi: 'Vì 50 != 0, NULLIF giữ nguyên và trả về đối số đầu tiên (50).'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_case_4',
      type: 'true_false',
      question: {
        en: 'If no WHEN branch evaluates to TRUE in a CASE statement and no ELSE clause is provided, the CASE expression evaluates to NULL.',
        vi: 'Nếu không có nhánh WHEN nào trả về TRUE trong câu lệnh CASE và không có mệnh đề ELSE, biểu thức CASE sẽ tự động trả về NULL.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. By ANSI standard, omitting ELSE defaults to "ELSE NULL".',
        vi: 'Đúng. Theo chuẩn ANSI, việc bỏ qua ELSE sẽ mặc định hiểu là "ELSE NULL".'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_case_5',
      type: 'single_choice',
      question: {
        en: 'How do you safely prevent a fatal "division by zero" runtime error in a SQL division expression like "a / b"?',
        vi: 'Làm thế nào để phòng chống lỗi thời gian chạy "chia cho 0" trong biểu thức chia SQL như "a / b"?'
      },
      options: [
        { en: 'Write "a / NULLIF(b, 0)" so that division by zero becomes division by NULL, returning NULL safely', vi: 'Viết "a / NULLIF(b, 0)" để phép chia cho 0 chuyển thành chia cho NULL và trả về NULL an toàn' },
        { en: 'Wrap the query in a TRY CATCH in MySQL', vi: 'Bọc câu truy vấn trong TRY CATCH của MySQL' },
        { en: 'Divide by -1', vi: 'Chia cho -1' },
        { en: 'Set SQL_MODE = \'NO_ZERO\';', vi: 'Thiết lập SQL_MODE = \'NO_ZERO\';' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'NULLIF(b, 0) turns 0 into NULL. In SQL arithmetic, dividing by NULL produces NULL without throwing an exception.',
        vi: 'NULLIF(b, 0) biến 0 thành NULL. Trong số học SQL, chia cho NULL ra kết quả NULL an toàn mà không ném ra ngoại lệ làm dừng hệ thống.'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_case_6',
      type: 'single_choice',
      question: {
        en: 'What is "Conditional Aggregation" in SQL?',
        vi: '"Tổng hợp có điều kiện" (Conditional Aggregation) trong SQL là kỹ thuật gì?'
      },
      options: [
        { en: 'Nesting CASE WHEN expressions inside aggregate functions (like SUM or COUNT) to compute subset metrics as distinct columns without multiple queries', vi: 'Lồng biểu thức CASE WHEN bên trong các hàm tổng hợp (như SUM hoặc COUNT) để tính chỉ số cho từng nhóm con thành các cột riêng chỉ trong 1 truy vấn' },
        { en: 'Aggregating data only on weekends', vi: 'Chỉ tổng hợp dữ liệu vào cuối tuần' },
        { en: 'Deleting records conditionally during a backup', vi: 'Xóa bản ghi có điều kiện trong khi sao lưu' },
        { en: 'Connecting to the database via SSH', vi: 'Kết nối vào CSDL qua giao thức SSH' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Conditional aggregation pivots and computes subgroup metrics (e.g. SUM(CASE WHEN type = \'X\' THEN amount ELSE 0 END)) efficiently.',
        vi: 'Tổng hợp có điều kiện cho phép xoay trục và tính toán số liệu nhóm con một cách tối ưu.'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_case_7',
      type: 'true_false',
      question: {
        en: 'In a Searched CASE expression, the branches are evaluated in order, and evaluation stops immediately at the first matching TRUE branch.',
        vi: 'Trong biểu thức Searched CASE, các nhánh được đánh giá tuần tự theo thứ tự và quá trình đánh giá dừng lại ngay tại nhánh TRUE đầu tiên.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. CASE statements exhibit short-circuit behavior.',
        vi: 'Đúng. Biểu thức CASE có cơ chế ngắt sớm khi tìm thấy nhánh thỏa mãn.'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_case_8',
      type: 'predict_output',
      question: {
        en: 'What does "SELECT COALESCE(NULL, NULL, \'Default\', \'Secondary\');" return?',
        vi: 'Câu lệnh "SELECT COALESCE(NULL, NULL, \'Default\', \'Secondary\');" trả về kết quả gì?'
      },
      options: [
        { en: '\'Default\'', vi: '\'Default\'' },
        { en: '\'Secondary\'', vi: '\'Secondary\'' },
        { en: 'NULL', vi: 'NULL' },
        { en: 'Error: Too many arguments', vi: 'Lỗi: Quá nhiều đối số' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '\'Default\' is the first non-null argument encountered from left to right.',
        vi: '\'Default\' là đối số đầu tiên khác null được tìm thấy từ trái qua phải.'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_case_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid conditional functions/expressions in ANSI SQL? (Select all that apply)',
        vi: 'Những hàm/biểu thức điều kiện nào sau đây là hợp lệ trong chuẩn ANSI SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'CASE WHEN ... THEN ... ELSE ... END', vi: 'CASE WHEN ... THEN ... ELSE ... END' },
        { en: 'COALESCE()', vi: 'COALESCE()' },
        { en: 'NULLIF()', vi: 'NULLIF()' },
        { en: 'IIF() (supported in T-SQL and SQLite)', vi: 'IIF() (được hỗ trợ trong T-SQL và SQLite)' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'CASE, COALESCE, and NULLIF are universal ANSI SQL standards; IIF() is a widely supported shorthand convenience function.',
        vi: 'CASE, COALESCE và NULLIF là chuẩn ANSI phổ quát; IIF() là hàm viết tắt tiện lợi được hỗ trợ rộng rãi.'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_case_10',
      type: 'single_choice',
      question: {
        en: 'What happens if the THEN and ELSE branches in a CASE expression return incompatible data types (e.g. integer 1 vs date \'2026-08-30\' without casting)?',
        vi: 'Điều gì xảy ra nếu các nhánh THEN và ELSE trong biểu thức CASE trả về các kiểu dữ liệu không tương thích (ví dụ: số nguyên 1 và ngày \'2026-08-30\' mà không ép kiểu)?'
      },
      options: [
        { en: 'The database attempts type coercion or throws a data type mismatch compilation error', vi: 'CSDL cố gắng ép kiểu tự động hoặc ném ra lỗi không khớp kiểu dữ liệu' },
        { en: 'The database converts both to binary strings silently', vi: 'CSDL tự động chuyển cả hai thành chuỗi nhị phân' },
        { en: 'The query returns empty rows', vi: 'Truy vấn trả về các dòng rỗng' },
        { en: 'It creates a new database table', vi: 'Nó tạo ra một bảng CSDL mới' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'All result expressions in a CASE statement must resolve to a common compatible target data type.',
        vi: 'Tất cả các biểu thức kết quả trong mệnh đề CASE phải có kiểu dữ liệu tương thích chung.'
      },
      topicId: 'sql_conditional_case',
      difficulty: 'hard'
    }
  ]
};

export default lesson16;
