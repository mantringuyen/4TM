import { Lesson } from '../../../../types';

export const lesson10: Lesson = {
  id: 'sql_lesson_10',
  moduleId: 'sql_mod_2',
  levelId: 'basic',
  courseId: 'sql',
  order: 10,
  topicId: 'sql_group_by_having',
  title: {
    en: 'GROUP BY & HAVING',
    vi: 'Phân Nhóm Dữ Liệu: GROUP BY & HAVING'
  },
  summary: {
    en: 'Master multi-column data grouping with GROUP BY, and understand the critical architectural difference between row filtering with WHERE and group filtering with HAVING.',
    vi: 'Làm chủ phân nhóm dữ liệu đa cột với GROUP BY, và hiểu sâu sắc sự khác biệt cốt lõi giữa lọc dòng bằng WHERE và lọc nhóm bằng HAVING.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'While aggregate functions summarize an entire table into one row, real-world reporting demands departmental breakdowns, monthly sales summaries, or category metrics. GROUP BY partitions rows into summary groups, and HAVING filters those groups based on aggregate conditions.',
      vi: 'Trong khi các hàm tổng hợp gộp toàn bộ bảng thành một dòng duy nhất, các báo cáo thực tế đòi hỏi chia nhỏ theo phòng ban, tổng kết doanh thu theo tháng hay chỉ số theo danh mục. GROUP BY phân chia các dòng thành các nhóm tóm tắt, và HAVING lọc các nhóm này dựa trên các điều kiện tổng hợp.'
    },
    conceptExplanation: {
      en: 'Grouping & Filtering Architecture:\n1. GROUP BY Partitioning: Collapses matching rows into distinct buckets based on one or more grouping keys (e.g. GROUP BY department, role).\n2. Projection Constraint: Every column in the SELECT list must either appear in the GROUP BY clause or be enclosed inside an aggregate function (COUNT, SUM, AVG, etc.).\n3. WHERE vs. HAVING:\n   - WHERE filters individual raw rows BEFORE grouping and aggregation occur.\n   - HAVING filters aggregated group buckets AFTER GROUP BY has evaluated aggregates.\n4. Performance Tip: Always place row-level filters in WHERE rather than HAVING to eliminate unnecessary rows before grouping.',
      vi: 'Kiến trúc Phân nhóm & Lọc dữ liệu:\n1. Phân vùng GROUP BY: Gom các dòng có cùng giá trị thành các nhóm riêng biệt dựa trên một hoặc nhiều khóa gom nhóm (ví dụ: GROUP BY department, role).\n2. Quy tắc chiếu dữ liệu: Mọi cột trong danh sách SELECT bắt buộc phải có mặt trong mệnh đề GROUP BY hoặc được bọc bên trong một hàm tổng hợp (COUNT, SUM, AVG,...).\n3. So sánh WHERE và HAVING:\n   - WHERE lọc từng dòng dữ liệu thô TRƯỚC KHI gom nhóm và tính toán tổng hợp.\n   - HAVING lọc các nhóm kết quả tổng hợp SAU KHI mệnh đề GROUP BY đã thực thi.\n4. Tối ưu hiệu năng: Luôn đưa các điều kiện lọc cấp dòng vào WHERE thay vì HAVING để loại bỏ sớm dữ liệu thừa trước khi nhóm.'
    },
    syntax: `SELECT department, 
       role, 
       COUNT(*) AS headcount, 
       ROUND(AVG(salary), 2) AS avg_salary
FROM employees
WHERE status = 'Active'
GROUP BY department, role
HAVING COUNT(*) >= 3 AND AVG(salary) > 50000
ORDER BY avg_salary DESC;`,
    examples: [
      {
        title: {
          en: '1. Department Breakdown with Aggregation and HAVING Filter',
          vi: '1. Phân Tích Phòng Ban Với Tổng Hợp và Lọc HAVING'
        },
        code: `SELECT department,
       COUNT(*) AS team_size,
       SUM(salary) AS total_payroll,
       ROUND(AVG(salary), 2) AS average_salary
FROM employees
WHERE salary >= 30000
GROUP BY department
HAVING COUNT(*) >= 2
ORDER BY total_payroll DESC;`,
        language: 'sql',
        explanation: {
          en: 'Filters employees earning at least $30k, groups them by department, retains only departments with 2+ qualifying members, and sorts by total payroll.',
          vi: 'Lọc nhân viên có lương từ 30.000$, gom nhóm theo phòng ban, chỉ giữ lại các phòng ban có từ 2 thành viên trở lên và xếp theo tổng lương.'
        }
      },
      {
        title: {
          en: '2. Multi-Column Grouping (Department & Title)',
          vi: '2. Phân Nhóm Đa Cột (Phòng Ban & Vị Trí Công Việc)'
        },
        code: `SELECT department,
       role,
       COUNT(*) AS employee_count,
       MAX(salary) AS top_earner_salary
FROM employees
GROUP BY department, role
ORDER BY department ASC, employee_count DESC;`,
        language: 'sql',
        explanation: {
          en: 'Groups by both department and role combinations to reveal staffing distributions and top compensation levels.',
          vi: 'Gom nhóm theo tổ hợp phòng ban và chức danh để thấy rõ sự phân bổ nhân sự và mức lương cao nhất trong từng vị trí.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using WHERE to filter on an aggregate function (e.g. WHERE COUNT(*) > 5).',
          vi: 'Dùng WHERE để lọc trên hàm tổng hợp (ví dụ: WHERE COUNT(*) > 5).'
        },
        correction: {
          en: 'WHERE evaluates before aggregation happens, so aggregate functions are invalid in WHERE. You must use the HAVING clause for aggregate conditions.',
          vi: 'Mệnh đề WHERE chạy trước khi việc tổng hợp dữ liệu diễn ra, nên các hàm tổng hợp không được phép đặt trong WHERE. Bạn bắt buộc phải dùng HAVING.'
        },
        code: `-- INCORRECT:
-- SELECT department, COUNT(*) FROM employees WHERE COUNT(*) > 2 GROUP BY department;
-- CORRECT:
SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 2;`
      },
      {
        mistake: {
          en: 'Placing raw non-aggregate filters in HAVING instead of WHERE.',
          vi: 'Đặt các điều kiện lọc dòng dữ liệu thô vào HAVING thay vì WHERE.'
        },
        correction: {
          en: 'Writing HAVING status = \'Active\' forces the database to group ALL inactive rows first before filtering, wasting memory and CPU. Put row filters in WHERE.',
          vi: 'Viết HAVING status = \'Active\' buộc CSDL phải gom nhóm toàn bộ nhân viên đã nghỉ việc trước rồi mới lọc, gây lãng phí RAM và CPU. Hãy đưa vào WHERE.'
        }
      }
    ],
    tips: [
      {
        en: 'Logical processing order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.',
        vi: 'Thứ tự xử lý logic của SQL: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT.'
      },
      {
        en: 'You can use multiple aggregate conditions in HAVING joined with AND/OR (e.g. HAVING COUNT(*) > 3 AND SUM(salary) < 500000).',
        vi: 'Bạn có thể kết hợp nhiều điều kiện tổng hợp trong HAVING bằng AND/OR (ví dụ: HAVING COUNT(*) > 3 AND SUM(salary) < 500000).'
      }
    ],
    practiceStarterCode: `-- Find departments with more than 2 employees and show their average salary
SELECT department, COUNT(*) AS total_staff, AVG(salary) AS avg_sal FROM employees GROUP BY department HAVING COUNT(*) > 2;`
  },
  exercisePool: [
    {
      id: 'sql_ex_grp_1',
      type: 'complete_code',
      title: {
        en: 'Group Staff by Department',
        vi: 'Gom Nhóm Nhân Viên Theo Phòng Ban'
      },
      instruction: {
        en: 'Write a query to group employees by department and count the total employees in each department as total_employees.',
        vi: 'Viết câu truy vấn gom nhóm nhân viên theo department và đếm tổng số nhân viên trong từng phòng ban với bí danh total_employees.'
      },
      starterCode: `SELECT department, COUNT(*) AS total_employees
FROM employees
___ BY department;`,
      solutionCode: `SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department;`,
      hint: {
        en: 'Use GROUP BY.',
        vi: 'Dùng GROUP BY.'
      },
      explanation: {
        en: 'GROUP BY department groups records by their unique department values.',
        vi: 'GROUP BY department gom các bản ghi có cùng giá trị phòng ban lại với nhau.'
      }
    },
    {
      id: 'sql_ex_grp_2',
      type: 'fix_code',
      title: {
        en: 'Fix Filter on Aggregate Function',
        vi: 'Sửa Lỗi Lọc Trên Hàm Tổng Hợp'
      },
      instruction: {
        en: 'Fix the query using HAVING so that only departments with a sum of salaries strictly greater than 150000 are returned.',
        vi: 'Sửa câu truy vấn bằng cách dùng HAVING để chỉ lấy các phòng ban có tổng quỹ lương lớn hơn 150000.'
      },
      starterCode: `SELECT department, SUM(salary) AS total_payroll
FROM employees
WHERE SUM(salary) > 150000
GROUP BY department;`,
      solutionCode: `SELECT department, SUM(salary) AS total_payroll
FROM employees
GROUP BY department
HAVING SUM(salary) > 150000;`,
      hint: {
        en: 'Move the aggregate filter from WHERE to a HAVING clause after GROUP BY.',
        vi: 'Chuyển điều kiện lọc hàm tổng hợp từ WHERE sang mệnh đề HAVING sau GROUP BY.'
      },
      explanation: {
        en: 'Filters on aggregate results (such as SUM(salary) > 150000) must reside in the HAVING clause.',
        vi: 'Các điều kiện lọc trên kết quả tổng hợp (như SUM(salary) > 150000) bắt buộc phải nằm trong mệnh đề HAVING.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_group_by_having',
    title: {
      en: 'High-Impact Department Resource Allocation Matrix',
      vi: 'Ma Trận Phân Bổ Nguồn Lực Phòng Ban Trọng Yếu'
    },
    description: {
      en: 'Write a SQL query that retrieves department, team_size as COUNT(*), total_spend as SUM(salary), and mean_salary as ROUND(AVG(salary), 2) from the employees table. Filter for employees with salary >= 40000 in WHERE, group by department, and filter for departments that have at least 2 qualifying members AND an average salary greater than 60000 in HAVING. Sort the results by total_spend DESC.',
      vi: 'Viết câu truy vấn SQL lấy department, team_size bằng COUNT(*), total_spend bằng SUM(salary), và mean_salary bằng ROUND(AVG(salary), 2) từ bảng employees. Lọc các nhân viên có salary >= 40000 trong WHERE, gom nhóm theo department, và chỉ giữ lại các phòng ban có từ 2 thành viên trở lên VÀ lương trung bình lớn hơn 60000 trong HAVING. Sắp xếp kết quả theo total_spend DESC.'
    },
    requirements: [
      { en: '1. WHERE salary >= 40000', vi: '1. Điều kiện WHERE salary >= 40000' },
      { en: '2. GROUP BY department', vi: '2. Gom nhóm GROUP BY department' },
      { en: '3. HAVING COUNT(*) >= 2 AND AVG(salary) > 60000', vi: '3. Lọc nhóm HAVING COUNT(*) >= 2 AND AVG(salary) > 60000' },
      { en: '4. ORDER BY total_spend DESC', vi: '4. Sắp xếp ORDER BY total_spend DESC' }
    ],
    starterCode: `-- Write your comprehensive GROUP BY and HAVING query
SELECT department FROM employees;`,
    solutionCode: `SELECT department,
       COUNT(*) AS team_size,
       SUM(salary) AS total_spend,
       ROUND(AVG(salary), 2) AS mean_salary
FROM employees
WHERE salary >= 40000
GROUP BY department
HAVING COUNT(*) >= 2 AND AVG(salary) > 60000
ORDER BY total_spend DESC;`,
    hints: [
      {
        en: 'Follow the clause order: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY.',
        vi: 'Tuân thủ đúng thứ tự: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY.'
      }
    ],
    solutionExplanation: {
      en: 'Demonstrates the complete multi-stage pipeline: row-level pre-filtering in WHERE, dimensional partitioning with GROUP BY, group-level metric filtering with HAVING, and post-aggregation sorting with ORDER BY.',
      vi: 'Minh họa quy trình xử lý đa tầng hoàn chỉnh: lọc dòng thô trong WHERE, phân nhóm với GROUP BY, lọc nhóm với HAVING và sắp xếp kết quả với ORDER BY.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_grp_1',
      type: 'single_choice',
      question: {
        en: 'What is the primary difference between the WHERE clause and the HAVING clause?',
        vi: 'Sự khác biệt cốt lõi giữa mệnh đề WHERE và mệnh đề HAVING là gì?'
      },
      options: [
        { en: 'WHERE filters individual rows before grouping; HAVING filters aggregated groups after grouping', vi: 'WHERE lọc từng dòng trước khi gom nhóm; HAVING lọc các nhóm kết quả sau khi gom nhóm' },
        { en: 'WHERE is for numbers; HAVING is for strings', vi: 'WHERE dùng cho số; HAVING dùng cho chuỗi' },
        { en: 'HAVING is only used in Oracle', vi: 'HAVING chỉ dùng trong Oracle' },
        { en: 'WHERE is executed after ORDER BY', vi: 'WHERE được thực thi sau ORDER BY' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'WHERE filters base rows prior to aggregation, while HAVING filters aggregated summaries.',
        vi: 'WHERE lọc các bản ghi gốc trước khi tính tổng hợp, còn HAVING lọc các kết quả đã được tổng hợp.'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_grp_2',
      type: 'single_choice',
      question: {
        en: 'In standard ANSI SQL, what rule governs non-aggregated columns in the SELECT clause when GROUP BY is present?',
        vi: 'Trong chuẩn ANSI SQL, quy tắc nào kiểm soát các cột không tổng hợp trong SELECT khi có mệnh đề GROUP BY?'
      },
      options: [
        { en: 'Every non-aggregated column in the SELECT list must appear in the GROUP BY clause', vi: 'Mọi cột không nằm trong hàm tổng hợp ở SELECT bắt buộc phải có mặt trong mệnh đề GROUP BY' },
        { en: 'You can select any random column without restrictions', vi: 'Có thể chọn bất kỳ cột ngẫu nhiên nào mà không bị giới hạn' },
        { en: 'GROUP BY must include at least 10 columns', vi: 'GROUP BY bắt buộc phải có ít nhất 10 cột' },
        { en: 'SELECT can only contain numbers', vi: 'SELECT chỉ được phép chứa các số' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'To prevent ambiguous multi-valued output rows, all non-aggregated projected columns must be in the GROUP BY list.',
        vi: 'Để tránh kết quả không xác định (nhiều giá trị ứng với 1 nhóm), tất cả các cột không tổng hợp phải có trong GROUP BY.'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_grp_3',
      type: 'true_false',
      question: {
        en: 'You can use column aliases defined with AS in the SELECT clause inside the HAVING clause in standard ANSI SQL.',
        vi: 'Bạn có thể sử dụng bí danh cột vừa đặt bằng AS trong SELECT ở bên trong mệnh đề HAVING của chuẩn ANSI SQL.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. In standard ANSI SQL, HAVING is evaluated BEFORE SELECT, so aliases defined in SELECT do not exist yet when HAVING runs (though MySQL allows it as an extension).',
        vi: 'Sai. Trong chuẩn ANSI SQL, HAVING chạy TRƯỚC SELECT, do đó bí danh đặt trong SELECT chưa tồn tại khi HAVING thực thi (mặc dù MySQL có mở rộng cho phép).'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_grp_4',
      type: 'predict_output',
      question: {
        en: 'What is the error with: SELECT department, AVG(salary) FROM employees WHERE AVG(salary) > 50000 GROUP BY department;?',
        vi: 'Lỗi trong câu lệnh: SELECT department, AVG(salary) FROM employees WHERE AVG(salary) > 50000 GROUP BY department; là gì?'
      },
      options: [
        { en: 'An aggregate function (AVG) cannot appear in a WHERE clause; it must be in a HAVING clause', vi: 'Hàm tổng hợp (AVG) không được phép xuất hiện trong mệnh đề WHERE; nó bắt buộc phải nằm trong HAVING' },
        { en: 'department cannot be grouped', vi: 'department không thể gom nhóm' },
        { en: 'AVG cannot be used with salary', vi: 'AVG không thể dùng với salary' },
        { en: '50000 must be in quotes', vi: '50000 phải đặt trong dấu ngoặc kép' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'WHERE filters rows before aggregates exist. Aggregated predicates must be placed in HAVING.',
        vi: 'Mệnh đề WHERE lọc dòng trước khi có kết quả tổng hợp. Các điều kiện tổng hợp phải đặt trong HAVING.'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_grp_5',
      type: 'single_choice',
      question: {
        en: 'Why is "WHERE status = \'Active\' ... GROUP BY dept" more performant than "GROUP BY dept HAVING status = \'Active\'"?',
        vi: 'Tại sao viết "WHERE status = \'Active\' ... GROUP BY dept" lại có hiệu năng cao hơn "GROUP BY dept HAVING status = \'Active\'"?'
      },
      options: [
        { en: 'WHERE filters out inactive rows early, reducing the volume of data that must be sorted and buffered in memory for GROUP BY', vi: 'WHERE loại bỏ các dòng không hợp lệ từ sớm, giảm đáng kể lượng dữ liệu cần sắp xếp và lưu bộ nhớ đệm cho GROUP BY' },
        { en: 'HAVING disables all database CPU cores', vi: 'HAVING làm vô hiệu hóa tất cả CPU của máy chủ CSDL' },
        { en: 'WHERE compresses the hard drive', vi: 'WHERE nén ổ đĩa cứng lại' },
        { en: 'There is no difference at all', vi: 'Không có bất kỳ sự khác biệt nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Early filtering with WHERE minimizes memory usage and grouping overhead.',
        vi: 'Lọc sớm bằng WHERE giảm tối đa bộ nhớ đệm và chi phí xử lý gom nhóm.'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_grp_6',
      type: 'true_false',
      question: {
        en: 'Grouping by multiple columns (e.g. GROUP BY department, role) creates a distinct group bucket for each unique combination of those columns.',
        vi: 'Gom nhóm theo nhiều cột (ví dụ: GROUP BY department, role) tạo ra một nhóm riêng biệt cho từng tổ hợp giá trị duy nhất của các cột đó.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Multi-column GROUP BY partitions rows by the composite unique values of all specified columns.',
        vi: 'Đúng. GROUP BY đa cột phân vùng dữ liệu theo từng cặp kết hợp duy nhất của các cột được liệt kê.'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_grp_7',
      type: 'single_choice',
      question: {
        en: 'How does GROUP BY handle NULL values in the grouping column?',
        vi: 'Mệnh đề GROUP BY xử lý các giá trị NULL trong cột gom nhóm như thế nào?'
      },
      options: [
        { en: 'All NULL values are grouped together into a single distinct group bucket', vi: 'Tất cả các giá trị NULL được gom chung lại thành một nhóm duy nhất' },
        { en: 'Each NULL value gets its own separate row', vi: 'Mỗi giá trị NULL tạo thành một dòng riêng biệt' },
        { en: 'NULL rows are automatically deleted from the database', vi: 'Các dòng NULL bị tự động xóa khỏi CSDL' },
        { en: 'The database halts with a null pointer exception', vi: 'CSDL dừng hoạt động với lỗi null pointer' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In SQL grouping semantics, all NULLs in the grouping column collapse into one single group bucket.',
        vi: 'Trong ngữ nghĩa gom nhóm của SQL, toàn bộ các dòng có giá trị NULL trong cột gom nhóm được gộp lại thành 1 nhóm duy nhất.'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_grp_8',
      type: 'single_choice',
      question: {
        en: 'What is the correct logical execution position of HAVING relative to SELECT?',
        vi: 'Vị trí thực thi logic chính xác của HAVING so với SELECT là gì?'
      },
      options: [
        { en: 'HAVING executes BEFORE SELECT', vi: 'HAVING thực thi TRƯỚC SELECT' },
        { en: 'HAVING executes AFTER SELECT', vi: 'HAVING thực thi SAU SELECT' },
        { en: 'HAVING executes AFTER ORDER BY', vi: 'HAVING thực thi SAU ORDER BY' },
        { en: 'HAVING executes BEFORE WHERE', vi: 'HAVING thực thi TRƯỚC WHERE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Logical order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.',
        vi: 'Thứ tự logic: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_grp_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following clauses can contain aggregate expressions like SUM(amount) or COUNT(*)? (Select all that apply)',
        vi: 'Những mệnh đề nào sau đây có thể chứa các biểu thức tổng hợp như SUM(amount) hoặc COUNT(*)? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'SELECT', vi: 'SELECT' },
        { en: 'HAVING', vi: 'HAVING' },
        { en: 'ORDER BY', vi: 'ORDER BY' },
        { en: 'WHERE', vi: 'WHERE' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'SELECT, HAVING, and ORDER BY can all evaluate aggregates. The WHERE clause CANNOT evaluate aggregates.',
        vi: 'SELECT, HAVING và ORDER BY đều có thể chứa hàm tổng hợp. Mệnh đề WHERE KHÔNG ĐƯỢC PHÉP chứa hàm tổng hợp.'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_grp_10',
      type: 'single_choice',
      question: {
        en: 'What happens if you use a HAVING clause without a GROUP BY clause in a query?',
        vi: 'Điều gì xảy ra nếu bạn sử dụng mệnh đề HAVING mà không có mệnh đề GROUP BY trong câu truy vấn?'
      },
      options: [
        { en: 'The entire table is treated as a single group, and HAVING evaluates whether that entire table summary matches the condition', vi: 'Toàn bộ bảng được coi là một nhóm duy nhất, và HAVING đánh giá xem kết quả tổng hợp của cả bảng có thỏa mãn điều kiện hay không' },
        { en: 'The database crashes', vi: 'CSDL bị sập' },
        { en: 'It is always an illegal syntax error in all SQL engines', vi: 'Luôn luôn là lỗi cú pháp bất hợp pháp trong mọi hệ CSDL' },
        { en: 'It converts the query to a DELETE statement', vi: 'Nó chuyển câu truy vấn thành lệnh DELETE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A HAVING clause without GROUP BY treats the entire table as one grand group, returning 1 row if true or 0 rows if false.',
        vi: 'Dùng HAVING không có GROUP BY xem toàn bộ bảng là 1 nhóm lớn, trả về 1 dòng nếu thỏa mãn hoặc 0 dòng nếu không.'
      },
      topicId: 'sql_group_by_having',
      difficulty: 'hard'
    }
  ]
};

export default lesson10;
