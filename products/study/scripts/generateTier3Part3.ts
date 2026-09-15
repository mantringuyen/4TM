import { Lesson } from '../src/types';
import * as fs from 'fs';
import * as path from 'path';
import { tier3Part1Lessons } from './generateTier3Part1';
import { tier3Part2Lessons } from './generateTier3Part2';

export const tier3Part3Lessons: Lesson[] = [
  // LESSON 14: Window Functions: OVER, PARTITION BY, Ranking (ROW_NUMBER, RANK, DENSE_RANK)
  {
    id: 'sql_lesson_14',
    moduleId: 'sql_mod_3',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 14,
    topicId: 'sql_window_ranking',
    title: {
      en: 'Window Functions: OVER, PARTITION BY & Ranking (ROW_NUMBER, RANK, DENSE_RANK)',
      vi: 'Hàm Cửa Sổ: OVER, PARTITION BY & Xếp Hạng (ROW_NUMBER, RANK, DENSE_RANK)'
    },
    summary: {
      en: 'Master SQL window functions that compute analytical aggregations and rankings across partitioned row sets while preserving all individual detail rows without collapsing.',
      vi: 'Làm chủ hàm cửa sổ (window functions) trong SQL để tính toán phân tích và xếp hạng trên các phân vùng dữ liệu mà vẫn giữ nguyên từng dòng chi tiết mà không bị gộp lại.'
    },
    estimatedMinutes: 24,
    learn: {
      introduction: {
        en: 'A Window Function performs calculations across a set of table rows related to the current row. Unlike regular GROUP BY aggregations which collapse multiple rows into a single summary row, window functions retain the individual identity of every single row in the output.',
        vi: 'Hàm cửa sổ (Window Function) thực hiện các phép tính trên một tập hợp các dòng dữ liệu có liên quan đến dòng hiện tại. Khác với phép gom nhóm GROUP BY thông thường gộp nhiều dòng thành một dòng tóm tắt duy nhất, hàm cửa sổ giữ nguyên bản sắc của từng dòng dữ liệu trong kết quả đầu ra.'
      },
      conceptExplanation: {
        en: 'The OVER clause defines the window partition and ordering. 1) PARTITION BY divides rows into distinct subsets (e.g. per department or course). 2) ORDER BY sorts rows within each partition. 3) Ranking Functions evaluate relative positions: ROW_NUMBER() assigns strict sequential integers (1, 2, 3, 4) with no ties; RANK() assigns the same rank to ties and skips subsequent numbers (1, 2, 2, 4); DENSE_RANK() assigns the same rank to ties without skipping numbers (1, 2, 2, 3); NTILE(n) distributes rows evenly into n buckets (e.g. quartiles).',
        vi: 'Mệnh đề OVER xác định phân vùng và thứ tự của cửa sổ. 1) PARTITION BY chia các dòng thành các tập con riêng biệt (như theo từng phòng ban hoặc môn học). 2) ORDER BY sắp xếp các dòng trong từng phân vùng đó. 3) Các hàm xếp hạng đánh giá vị trí tương đối: ROW_NUMBER() gán các số nguyên tuần tự nghiêm ngặt (1, 2, 3, 4) không có đồng hạng; RANK() gán cùng thứ hạng cho các giá trị bằng nhau và nhảy cóc các số tiếp theo (1, 2, 2, 4); DENSE_RANK() gán cùng thứ hạng cho các giá trị bằng nhau nhưng không nhảy số (1, 2, 2, 3); NTILE(n) phân chia đều các dòng vào n nhóm (như tứ phân vị).'
      },
      syntax: `-- 1. Basic Window Function Syntax:
SELECT name, course, score,
       ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS row_num,
       RANK() OVER(PARTITION BY course ORDER BY score DESC) AS rnk,
       DENSE_RANK() OVER(PARTITION BY course ORDER BY score DESC) AS dense_rnk
FROM students;

-- 2. Top-N per Group Pattern (with CTE):
WITH ranked_staff AS (
  SELECT name, dept_id, salary,
         DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rank_in_dept
  FROM employees
)
SELECT name, dept_id, salary
FROM ranked_staff
WHERE rank_in_dept = 1;`,
      examples: [
        {
          title: {
            en: '1. Comparing ROW_NUMBER vs RANK vs DENSE_RANK',
            vi: '1. So Sánh ROW_NUMBER vs RANK vs DENSE_RANK'
          },
          code: `SELECT name, course, score,
       ROW_NUMBER() OVER(ORDER BY score DESC) AS row_num,
       RANK() OVER(ORDER BY score DESC) AS rank_pos,
       DENSE_RANK() OVER(ORDER BY score DESC) AS dense_rank_pos
FROM students
ORDER BY score DESC;`,
          language: 'sql',
          explanation: {
            en: 'Demonstrates tie handling: if two students tie for score 90, RANK skips to 3, while DENSE_RANK proceeds to 2.',
            vi: 'Minh họa cách xử lý đồng hạng: nếu hai học viên cùng đạt điểm 90, RANK sẽ nhảy cóc sang thứ 3, trong khi DENSE_RANK tiếp tục ở thứ 2.'
          }
        },
        {
          title: {
            en: '2. Running Total & Department Salary Benchmark',
            vi: '2. Tính Tổng Lũy Kế & So Sánh Chuẩn Lương Phòng Ban'
          },
          code: `SELECT name, dept_id, salary,
       AVG(salary) OVER(PARTITION BY dept_id) AS dept_avg_salary,
       ROUND(salary - AVG(salary) OVER(PARTITION BY dept_id), 2) AS diff_from_dept_avg
FROM employees
ORDER BY dept_id, salary DESC;`,
          language: 'sql',
          explanation: {
            en: 'Computes department averages directly on each employee row without requiring a separate GROUP BY or JOIN.',
            vi: 'Tính mức lương trung bình của phòng ban ngay trên từng dòng nhân viên mà không cần viết thêm GROUP BY hay JOIN phức tạp.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Attempting to filter window function results directly in the WHERE clause',
            vi: 'Cố gắng lọc kết quả hàm cửa sổ trực tiếp ngay trong mệnh đề WHERE'
          },
          correction: {
            en: 'Window functions execute in SQL step 6 (AFTER the WHERE clause in step 3). To filter by a window result (e.g. rank = 1), wrap the query in a CTE or derived table first.',
            vi: 'Hàm cửa sổ được thực thi ở bước 6 (SAU mệnh đề WHERE ở bước 3). Để lọc theo kết quả cửa sổ (ví dụ: rank = 1), bắt buộc phải bọc truy vấn trong một CTE hoặc bảng phái sinh trước.'
          },
          code: `-- SYNTAX ERROR:
-- SELECT name, score, ROW_NUMBER() OVER(ORDER BY score DESC) AS rnk FROM students WHERE rnk = 1;
-- CORRECT (Using CTE):
WITH ranked AS (
  SELECT name, score, ROW_NUMBER() OVER(ORDER BY score DESC) AS rnk FROM students
)
SELECT name, score FROM ranked WHERE rnk = 1;`
        },
        {
          mistake: {
            en: 'Confusing PARTITION BY with GROUP BY',
            vi: 'Nhầm lẫn giữa PARTITION BY và GROUP BY'
          },
          correction: {
            en: 'GROUP BY aggregates and collapses multiple input rows into a single row per group. PARTITION BY defines calculation boundaries while preserving 100% of individual input rows.',
            vi: 'GROUP BY gộp các dòng lại thành một dòng duy nhất cho mỗi nhóm. PARTITION BY thiết lập phạm vi tính toán nhưng giữ nguyên 100% số lượng dòng ban đầu.'
          },
          code: `-- Preserves all individual rows:
SELECT name, course, score, AVG(score) OVER(PARTITION BY course) FROM students;`
        }
      ],
      tips: [
        {
          en: 'An empty OVER() clause calculates metrics across the entire table without partitioning (e.g. COUNT(*) OVER()).',
          vi: 'Mệnh đề OVER() để trống sẽ tính toán trên toàn bộ bảng mà không phân vùng (ví dụ: COUNT(*) OVER()).'
        },
        {
          en: 'You can define named window specifications using the WINDOW clause in PostgreSQL and SQLite 3.25+ (e.g. WINDOW w AS (PARTITION BY dept_id ORDER BY salary DESC)).',
          vi: 'Bạn có thể định nghĩa đặc tả cửa sổ có tên bằng mệnh đề WINDOW trong PostgreSQL và SQLite 3.25+ (ví dụ: WINDOW w AS (PARTITION BY dept_id ORDER BY salary DESC)).'
        }
      ],
      practiceStarterCode: `-- Rank students within each course by score descending
SELECT name, course, score,
       DENSE_RANK() OVER(PARTITION BY course ORDER BY score DESC) AS course_rank
FROM students
ORDER BY course, course_rank;`,
      practice: {
        task: {
          en: 'Write a query that assigns a row number to every employee partitioned by dept_id and ordered by salary DESC, selecting name, dept_id, salary, and the row number as emp_row_num.',
          vi: 'Viết truy vấn gán số thứ tự dòng cho từng nhân viên phân vùng theo dept_id và sắp xếp theo salary DESC, chọn name, dept_id, salary và số thứ tự đặt tên là emp_row_num.'
        },
        starterCode: `-- Assign row number per department ordered by salary DESC
SELECT name, dept_id, salary,
       ROW_NUMBER() OVER(PARTITION BY  ORDER BY ) AS emp_row_num
FROM employees;`,
        solutionCode: `SELECT name, dept_id, salary, ROW_NUMBER() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS emp_row_num FROM employees;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_14_1',
        type: 'fix_code',
        title: { en: 'Fix Window Function in WHERE Clause', vi: 'Sửa Lỗi Dùng Hàm Cửa Sổ Trong Mệnh Đề WHERE' },
        instruction: {
          en: 'Wrap the query inside a CTE named "ranked" to filter WHERE rnk <= 2 correctly.',
          vi: 'Bọc truy vấn bên trong một CTE tên "ranked" để lọc WHERE rnk <= 2 một cách hợp lệ.'
        },
        starterCode: 'WITH ranked AS (SELECT name, score, DENSE_RANK() OVER(ORDER BY score DESC) AS rnk FROM students) SELECT name, score, rnk FROM ranked WHERE rnk <= 2;',
        solutionCode: 'WITH ranked AS (SELECT name, score, DENSE_RANK() OVER(ORDER BY score DESC) AS rnk FROM students) SELECT name, score, rnk FROM ranked WHERE rnk <= 2;',
        hint: { en: 'The CTE structure is already provided; review and run it.', vi: 'Cấu trúc CTE đã được cung cấp; hãy kiểm tra và chạy nó.' },
        explanation: {
          en: 'CTEs allow filtering on window function computed columns.',
          vi: 'CTE cho phép lọc theo các cột được tính toán bởi hàm cửa sổ.'
        }
      },
      {
        id: 'sql_ex_14_2',
        type: 'complete_code',
        title: { en: 'Complete PARTITION BY in Ranking Query', vi: 'Hoàn Thiện PARTITION BY Trong Truy Vấn Xếp Hạng' },
        instruction: {
          en: 'Add the missing partition column "dept_id" inside the OVER clause.',
          vi: 'Bổ sung cột phân vùng "dept_id" bị thiếu bên trong mệnh đề OVER.'
        },
        starterCode: 'SELECT name, dept_id, salary, RANK() OVER(PARTITION BY  ORDER BY salary DESC) AS rnk FROM employees;',
        solutionCode: 'SELECT name, dept_id, salary, RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rnk FROM employees;',
        hint: { en: 'Insert "dept_id" after "PARTITION BY".', vi: 'Chèn "dept_id" vào sau "PARTITION BY".' },
        explanation: {
          en: 'PARTITION BY resets rankings independently for each department.',
          vi: 'PARTITION BY thiết lập lại thứ hạng độc lập cho từng phòng ban.'
        }
      },
      {
        id: 'sql_ex_14_3',
        type: 'write_code',
        title: { en: 'Find Top 1 Student in Each Course', vi: 'Tìm Học Viên Đứng Đầu Mỗi Khóa Học' },
        instruction: {
          en: 'Write a CTE named ranked_students selecting name, course, score, and ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS rn FROM students, then query it for name, course, score WHERE rn = 1.',
          vi: 'Viết CTE tên ranked_students chọn name, course, score và ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS rn TỪ students, sau đó truy vấn lấy name, course, score CÓ rn = 1.'
        },
        starterCode: '-- Find top 1 student per course using ROW_NUMBER and CTE\n',
        solutionCode: 'WITH ranked_students AS (SELECT name, course, score, ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS rn FROM students) SELECT name, course, score FROM ranked_students WHERE rn = 1;',
        hint: { en: 'WITH ranked_students AS (...) SELECT name, course, score FROM ranked_students WHERE rn = 1;', vi: 'WITH ranked_students AS (...) SELECT name, course, score FROM ranked_students WHERE rn = 1;' },
        explanation: {
          en: 'The ROW_NUMBER() = 1 pattern is the universal standard for "Top 1 per category" queries.',
          vi: 'Mô thức ROW_NUMBER() = 1 là tiêu chuẩn phổ quát cho các truy vấn lấy "Top 1 theo từng nhóm".'
        }
      },
      {
        id: 'sql_ex_14_4',
        type: 'modify_example',
        title: { en: 'Switch RANK to DENSE_RANK', vi: 'Chuyển RANK Sang DENSE_RANK' },
        instruction: {
          en: 'Change RANK() to DENSE_RANK() so that ties do not create gaps in rank numbering.',
          vi: 'Đổi RANK() thành DENSE_RANK() để các vị trí đồng hạng không tạo ra khoảng cách nhảy số.'
        },
        starterCode: 'SELECT name, score, RANK() OVER(ORDER BY score DESC) AS student_rank FROM students;',
        solutionCode: 'SELECT name, score, DENSE_RANK() OVER(ORDER BY score DESC) AS student_rank FROM students;',
        hint: { en: 'Replace RANK() with DENSE_RANK().', vi: 'Thay RANK() bằng DENSE_RANK().' },
        explanation: {
          en: 'DENSE_RANK produces continuous sequential rankings without gaps.',
          vi: 'DENSE_RANK tạo ra dãy thứ hạng liên tục mà không có khoảng trống nhảy số.'
        }
      },
      {
        id: 'sql_ex_14_5',
        type: 'predict_output',
        title: { en: 'Predict Ranking Sequence with Ties', vi: 'Dự Đoán Dãy Xếp Hạng Khi Có Đồng Điểm' },
        instruction: {
          en: 'Given scores [100, 90, 90, 80], what ranks does RANK() produce vs DENSE_RANK()?',
          vi: 'Với các điểm số [100, 90, 90, 80], hàm RANK() và DENSE_RANK() sẽ tạo ra các thứ hạng nào?'
        },
        starterCode: '-- Predict ranking output\n',
        solutionCode: 'SELECT 1 AS top_rank;',
        options: [
          'RANK gives [1, 2, 2, 4] while DENSE_RANK gives [1, 2, 2, 3]',
          'RANK gives [1, 2, 3, 4] while DENSE_RANK gives [1, 1, 1, 1]',
          'Both give [1, 2, 2, 3]',
          'Both give [1, 2, 3, 4]'
        ],
        correctOptionIndex: 0,
        hint: { en: 'RANK skips the next position after a tie; DENSE_RANK does not.', vi: 'RANK nhảy cóc vị trí tiếp theo sau khi đồng hạng; DENSE_RANK thì không.' },
        explanation: {
          en: 'RANK skips position 3 because of the tie at rank 2; DENSE_RANK continues directly to 3.',
          vi: 'RANK bỏ qua vị trí 3 do có 2 người cùng hạng 2; DENSE_RANK tiếp tục ngay với hạng 3.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_14',
      title: { en: 'Top-2 Earners Per Department with Compensation Benchmark', vi: 'Top 2 Thu Nhập Cao Nhất Từng Phòng Ban Kèm Đối Sánh' },
      description: {
        en: 'Write a SQL query using a Common Table Expression (CTE) and window functions to retrieve the top 2 highest-earning employees in each department. In the CTE, select e.name, e.dept_id, e.salary, and calculate: 1) rank_in_dept using DENSE_RANK() partitioned by dept_id ordered by salary DESC, and 2) dept_avg_salary using AVG(salary) partitioned by dept_id rounded to 2 decimal places. In the main query, select name, dept_id, salary, dept_avg_salary, and salary_diff (salary minus dept_avg_salary) WHERE rank_in_dept <= 2. Order by dept_id ASC, salary DESC, name ASC.',
        vi: 'Viết truy vấn SQL dùng CTE và hàm cửa sổ để lấy ra top 2 nhân viên có thu nhập cao nhất trong từng phòng ban. Trong CTE, chọn e.name, e.dept_id, e.salary và tính: 1) rank_in_dept bằng DENSE_RANK() phân vùng theo dept_id sắp xếp salary DESC, và 2) dept_avg_salary bằng AVG(salary) phân vùng theo dept_id làm tròn 2 số thập phân. Trong truy vấn chính, chọn name, dept_id, salary, dept_avg_salary và salary_diff (salary trừ dept_avg_salary) CÓ rank_in_dept <= 2. Sắp xếp theo dept_id ASC, salary DESC, name ASC.'
      },
      requirements: [
        { en: 'CTE calculating DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rank_in_dept', vi: 'CTE tính DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rank_in_dept' },
        { en: 'ROUND(AVG(salary) OVER(PARTITION BY dept_id), 2) AS dept_avg_salary', vi: 'ROUND(AVG(salary) OVER(PARTITION BY dept_id), 2) AS dept_avg_salary' },
        { en: 'Main query filtering WHERE rank_in_dept <= 2', vi: 'Truy vấn chính lọc WHERE rank_in_dept <= 2' },
        { en: 'ORDER BY dept_id ASC, salary DESC, name ASC', vi: 'ORDER BY dept_id ASC, salary DESC, name ASC' }
      ],
      starterCode: `-- Write your SQL window query below
WITH dept_rankings AS (
  SELECT name, dept_id, salary,
         DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rank_in_dept,
         ROUND(AVG(salary) OVER(PARTITION BY dept_id), 2) AS dept_avg_salary
  FROM employees
)
SELECT name, dept_id, salary, dept_avg_salary,
       ROUND(salary - dept_avg_salary, 2) AS salary_diff
FROM dept_rankings
WHERE rank_in_dept <= 2
ORDER BY ;`,
      solutionCode: `WITH dept_rankings AS (SELECT name, dept_id, salary, DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rank_in_dept, ROUND(AVG(salary) OVER(PARTITION BY dept_id), 2) AS dept_avg_salary FROM employees) SELECT name, dept_id, salary, dept_avg_salary, ROUND(salary - dept_avg_salary, 2) AS salary_diff FROM dept_rankings WHERE rank_in_dept <= 2 ORDER BY dept_id ASC, salary DESC, name ASC;`,
      hints: [{ en: 'Order by dept_id ASC, salary DESC, name ASC.', vi: 'Sắp xếp theo dept_id ASC, salary DESC, name ASC.' }],
      solutionExplanation: {
        en: 'Combines window ranking and window averaging in a single query pass without complex self-joins.',
        vi: 'Kết hợp xếp hạng cửa sổ và tính trung bình cửa sổ trong một lượt quét truy vấn duy nhất mà không cần tự join phức tạp.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_14_v1',
        title: { en: 'Top-2 Earners Per Department with Compensation Benchmark', vi: 'Top 2 Thu Nhập Cao Nhất Từng Phòng Ban Kèm Đối Sánh' },
        description: {
          en: 'Retrieve top 2 earners per department with salary diff from dept avg: name, dept_id, salary, dept_avg_salary, salary_diff ordered by dept_id ASC, salary DESC, name ASC.',
          vi: 'Lấy top 2 nhân viên lương cao nhất từng phòng ban kèm độ lệch so với TB phòng: name, dept_id, salary, dept_avg_salary, salary_diff xếp theo dept_id ASC, salary DESC, name ASC.'
        },
        requirements: [{ en: 'ORDER BY dept_id ASC, salary DESC, name ASC', vi: 'ORDER BY dept_id ASC, salary DESC, name ASC' }],
        starterCode: `WITH dept_rankings AS (...) SELECT ...;`,
        solutionCode: `WITH dept_rankings AS (SELECT name, dept_id, salary, DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rank_in_dept, ROUND(AVG(salary) OVER(PARTITION BY dept_id), 2) AS dept_avg_salary FROM employees) SELECT name, dept_id, salary, dept_avg_salary, ROUND(salary - dept_avg_salary, 2) AS salary_diff FROM dept_rankings WHERE rank_in_dept <= 2 ORDER BY dept_id ASC, salary DESC, name ASC;`,
        hints: [{ en: 'Complete with WHERE rank_in_dept <= 2.', vi: 'Hoàn thiện với WHERE rank_in_dept <= 2.' }],
        solutionExplanation: { en: 'Filters top ranks per partition with baseline analytics.', vi: 'Lọc các thứ hạng hàng đầu theo phân vùng kèm chỉ số phân tích cơ sở.' }
      },
      {
        id: 'sql_ch_14_v2',
        title: { en: 'Top Scoring Students Per Course', vi: 'Học Viên Xuất Sắc Nhất Từng Khóa Học' },
        description: {
          en: 'Select name, course, score, course_rank from (SELECT name, course, score, ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS course_rank FROM students) WHERE course_rank = 1 ORDER BY course ASC;',
          vi: 'Chọn name, course, score, course_rank từ (SELECT name, course, score, ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS course_rank FROM students) CÓ course_rank = 1 XẾP THEO course ASC;'
        },
        requirements: [
          { en: 'ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS course_rank', vi: 'ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS course_rank' },
          { en: 'WHERE course_rank = 1 ORDER BY course ASC', vi: 'WHERE course_rank = 1 ORDER BY course ASC' }
        ],
        starterCode: `WITH ranked_courses AS (SELECT name, course, score, ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS course_rank FROM students) SELECT * FROM ranked_courses WHERE course_rank = 1;`,
        solutionCode: `WITH ranked_courses AS (SELECT name, course, score, ROW_NUMBER() OVER(PARTITION BY course ORDER BY score DESC) AS course_rank FROM students) SELECT name, course, score, course_rank FROM ranked_courses WHERE course_rank = 1 ORDER BY course ASC;`,
        hints: [{ en: 'Filter WHERE course_rank = 1.', vi: 'Lọc WHERE course_rank = 1.' }],
        solutionExplanation: { en: 'Extracts exact course champions.', vi: 'Trích xuất chính xác quán quân từng khóa học.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_14_1',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'easy',
        question: { en: 'What is the fundamental difference between GROUP BY and Window Functions (OVER)?', vi: 'Sự khác biệt cơ bản giữa GROUP BY và Hàm Cửa Sổ (OVER) là gì?' },
        options: [
          { en: 'GROUP BY collapses multiple rows into a single summary row; Window Functions compute aggregates while keeping all individual rows intact', vi: 'GROUP BY gộp nhiều dòng thành một dòng tóm tắt duy nhất; Hàm Cửa Sổ tính toán tổng hợp nhưng vẫn giữ nguyên tất cả các dòng chi tiết' },
          { en: 'Window functions only work on strings', vi: 'Hàm cửa sổ chỉ hoạt động trên chuỗi' },
          { en: 'GROUP BY is faster in all databases', vi: 'GROUP BY luôn nhanh hơn trong mọi CSDL' },
          { en: 'Window functions are only for deleting rows', vi: 'Hàm cửa sổ chỉ dùng để xóa dòng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Window functions preserve row cardinality while providing partition-level analytics.', vi: 'Hàm cửa sổ giữ nguyên số lượng dòng trong khi vẫn cung cấp các phân tích ở cấp độ phân vùng.' }
      },
      {
        id: 'sql_q_14_2',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'medium',
        question: { en: 'What ranks are produced by ROW_NUMBER() vs RANK() vs DENSE_RANK() for values (100, 100, 90)?', vi: 'Các thứ hạng nào được tạo ra bởi ROW_NUMBER() vs RANK() vs DENSE_RANK() cho các giá trị (100, 100, 90)?' },
        options: [
          { en: 'ROW_NUMBER: (1, 2, 3), RANK: (1, 1, 3), DENSE_RANK: (1, 1, 2)', vi: 'ROW_NUMBER: (1, 2, 3), RANK: (1, 1, 3), DENSE_RANK: (1, 1, 2)' },
          { en: 'ROW_NUMBER: (1, 1, 2), RANK: (1, 2, 3), DENSE_RANK: (1, 1, 1)', vi: 'ROW_NUMBER: (1, 1, 2), RANK: (1, 2, 3), DENSE_RANK: (1, 1, 1)' },
          { en: 'All three produce (1, 2, 3)', vi: 'Cả ba đều tạo ra (1, 2, 3)' },
          { en: 'All three produce (1, 1, 2)', vi: 'Cả ba đều tạo ra (1, 1, 2)' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ROW_NUMBER gives strictly sequential numbers, RANK skips to 3 after two ties, DENSE_RANK advances to 2.', vi: 'ROW_NUMBER gán số tuần tự nghiêm ngặt, RANK nhảy cóc sang 3 sau khi có 2 người đồng hạng, DENSE_RANK tăng lên 2.' }
      },
      {
        id: 'sql_q_14_3',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'easy',
        question: { en: 'Why cannot window functions be used directly in a WHERE clause in standard SQL (e.g. WHERE ROW_NUMBER() = 1)?', vi: 'Tại sao không thể dùng hàm cửa sổ trực tiếp trong mệnh đề WHERE trong chuẩn SQL (ví dụ: WHERE ROW_NUMBER() = 1)?' },
        options: [
          { en: 'Because WHERE is evaluated in step 3 before window functions are calculated in step 6', vi: 'Vì WHERE được đánh giá ở bước 3 trước khi các hàm cửa sổ được tính toán ở bước 6' },
          { en: 'Because window functions are deprecated', vi: 'Vì hàm cửa sổ đã bị lỗi thời' },
          { en: 'Because WHERE only accepts numbers', vi: 'Vì WHERE chỉ chấp nhận kiểu số' },
          { en: 'Because of disk caching', vi: 'Do bộ nhớ đệm ổ đĩa' }
        ],
        correctAnswers: [0],
        explanation: { en: 'In logical query processing order, WHERE filters rows before window functions compute their partitions.', vi: 'Theo thứ tự xử lý truy vấn logic, WHERE lọc các dòng trước khi các hàm cửa sổ tính toán trên phân vùng.' }
      },
      {
        id: 'sql_q_14_4',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'medium',
        question: { en: 'What does PARTITION BY do inside an OVER() clause?', vi: 'PARTITION BY làm nhiệm vụ gì bên trong mệnh đề OVER()?' },
        options: [
          { en: 'It subdivides the result set into independent calculation groups without reducing the row count', vi: 'Nó phân chia tập kết quả thành các nhóm tính toán độc lập mà không làm giảm số lượng dòng' },
          { en: 'It partitions the physical hard disk drives', vi: 'Nó phân vùng các ổ đĩa cứng vật lý' },
          { en: 'It deletes rows that have duplicates', vi: 'Nó xóa các dòng bị trùng lặp' },
          { en: 'It sorts the entire table alphabetically', vi: 'Nó sắp xếp toàn bộ bảng theo bảng chữ cái' }
        ],
        correctAnswers: [0],
        explanation: { en: 'PARTITION BY sets the grouping boundaries for the window calculation scope.', vi: 'PARTITION BY thiết lập ranh giới gom nhóm cho phạm vi tính toán của cửa sổ.' }
      },
      {
        id: 'sql_q_14_5',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'hard',
        question: { en: 'What does the NTILE(4) window function do?', vi: 'Hàm cửa sổ NTILE(4) thực hiện công việc gì?' },
        options: [
          { en: 'It distributes rows as evenly as possible into 4 ranked buckets (quartiles: 1, 2, 3, 4)', vi: 'Nó phân chia các dòng đồng đều nhất có thể vào 4 xô xếp hạng (tứ phân vị: 1, 2, 3, 4)' },
          { en: 'It multiplies the row value by 4', vi: 'Nó nhân giá trị của dòng với 4' },
          { en: 'It returns only the 4th row', vi: 'Nó chỉ trả về dòng thứ 4' },
          { en: 'It drops every 4th row from the table', vi: 'Nó loại bỏ mỗi dòng thứ 4 khỏi bảng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'NTILE(n) splits an ordered partition into n nearly equal buckets.', vi: 'NTILE(n) chia phân vùng đã sắp xếp thành n xô có số lượng phần tử gần như bằng nhau.' }
      },
      {
        id: 'sql_q_14_6',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'medium',
        question: { en: 'What does "COUNT(*) OVER()" with an empty OVER clause calculate?', vi: '"COUNT(*) OVER()" với mệnh đề OVER để trống sẽ tính toán cái gì?' },
        options: [
          { en: 'The total row count of the entire filtered query result set appended to every single row', vi: 'Tổng số dòng của toàn bộ tập kết quả truy vấn đã lọc được gắn vào mỗi dòng riêng lẻ' },
          { en: '0 for all rows', vi: '0 cho mọi dòng' },
          { en: 'A syntax error', vi: 'Báo lỗi cú pháp' },
          { en: 'The row number', vi: 'Số thứ tự của dòng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'An empty OVER() window encompasses the entire dataset as a single undivided partition.', vi: 'Mệnh đề OVER() trống coi toàn bộ tập dữ liệu là một phân vùng duy nhất không bị chia nhỏ.' }
      },
      {
        id: 'sql_q_14_7',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'hard',
        question: { en: 'How can you deduplicate a table using ROW_NUMBER() in a CTE?', vi: 'Làm thế nào để xóa trùng lặp trong bảng bằng cách dùng ROW_NUMBER() trong một CTE?' },
        options: [
          { en: 'WITH numbered AS (SELECT id, ROW_NUMBER() OVER(PARTITION BY email ORDER BY id) AS rn FROM users) DELETE FROM users WHERE id IN (SELECT id FROM numbered WHERE rn > 1);', vi: 'WITH numbered AS (SELECT id, ROW_NUMBER() OVER(PARTITION BY email ORDER BY id) AS rn FROM users) DELETE FROM users WHERE id IN (SELECT id FROM numbered WHERE rn > 1);' },
          { en: 'DELETE FROM users WHERE ROW_NUMBER() > 1;', vi: 'DELETE FROM users WHERE ROW_NUMBER() > 1;' },
          { en: 'DROP TABLE users;', vi: 'DROP TABLE users;' },
          { en: 'SELECT DISTINCT * INTO users;', vi: 'SELECT DISTINCT * INTO users;' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Assigning ROW_NUMBER per partition isolates duplicate rows with rn > 1 for safe deletion.', vi: 'Gán ROW_NUMBER theo từng phân vùng giúp cô lập các bản ghi trùng thừa có rn > 1 để xóa an toàn.' }
      },
      {
        id: 'sql_q_14_8',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'easy',
        question: { en: 'Can multiple different window functions with different PARTITION BY clauses coexist in the same SELECT query?', vi: 'Nhiều hàm cửa sổ khác nhau với các mệnh đề PARTITION BY khác nhau có thể cùng tồn tại trong một truy vấn SELECT không?' },
        options: [
          { en: 'Yes, each window function independently calculates its own partition and ordering', vi: 'Có, mỗi hàm cửa sổ độc lập tính toán phân vùng và thứ tự riêng của nó' },
          { en: 'No, all window functions in a query must share the exact same PARTITION BY', vi: 'Không, mọi hàm cửa sổ trong truy vấn bắt buộc phải dùng chung một PARTITION BY' },
          { en: 'Only in MySQL 8', vi: 'Chỉ trong MySQL 8' },
          { en: 'Only for numeric columns', vi: 'Chỉ dành cho các cột kiểu số' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SQL allows multiple distinct window specifications within the same SELECT projection.', vi: 'SQL cho phép định nghĩa nhiều đặc tả cửa sổ độc lập khác nhau trong cùng một danh sách SELECT.' }
      },
      {
        id: 'sql_q_14_9',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'medium',
        question: { en: 'What is the return type of ROW_NUMBER(), RANK(), and DENSE_RANK()?', vi: 'Kiểu dữ liệu trả về của ROW_NUMBER(), RANK() và DENSE_RANK() là gì?' },
        options: [
          { en: 'Bigint / Integer', vi: 'Số nguyên Bigint / Integer' },
          { en: 'Float / Decimal', vi: 'Số thực Float / Decimal' },
          { en: 'Varchar string', vi: 'Chuỗi ký tự Varchar' },
          { en: 'Boolean', vi: 'Boolean' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Ranking functions return integer positions representing cardinal ranks.', vi: 'Các hàm xếp hạng luôn trả về số nguyên biểu thị vị trí thứ hạng.' }
      },
      {
        id: 'sql_q_14_10',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'hard',
        question: { en: 'What does the PERCENT_RANK() window function compute?', vi: 'Hàm cửa sổ PERCENT_RANK() tính toán điều gì?' },
        options: [
          { en: 'The relative rank of a row as a percentage between 0.0 and 1.0, calculated as (rank - 1) / (total_rows - 1)', vi: 'Thứ hạng tương đối của một dòng dưới dạng phần trăm từ 0.0 đến 1.0, tính bằng công thức (rank - 1) / (total_rows - 1)' },
          { en: 'The average salary multiplied by 100', vi: 'Lương trung bình nhân với 100' },
          { en: 'The tax percentage', vi: 'Tỷ lệ phần trăm thuế' },
          { en: 'The sum of all percentages in a group', vi: 'Tổng của tất cả các tỷ lệ phần trăm trong nhóm' }
        ],
        correctAnswers: [0],
        explanation: { en: 'PERCENT_RANK calculates the relative percentile score: (r - 1) / (N - 1).', vi: 'PERCENT_RANK tính điểm phân vị tương đối: (r - 1) / (N - 1).' }
      },
      {
        id: 'sql_q_14_11',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'easy',
        question: { en: 'What is the keyword used to specify sorting inside the window definition?', vi: 'Từ khóa nào được dùng để xác định việc sắp xếp bên trong định nghĩa cửa sổ?' },
        options: [
          { en: 'ORDER BY', vi: 'ORDER BY' },
          { en: 'SORT BY', vi: 'SORT BY' },
          { en: 'ARRANGE BY', vi: 'ARRANGE BY' },
          { en: 'RANK BY', vi: 'RANK BY' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ORDER BY inside OVER(...) defines the window sequence ordering.', vi: 'ORDER BY bên trong OVER(...) xác định thứ tự của chuỗi cửa sổ.' }
      },
      {
        id: 'sql_q_14_12',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'medium',
        question: { en: 'Which SQL standard introduced Window Functions to relational databases?', vi: 'Chuẩn SQL nào đã giới thiệu Hàm Cửa Sổ vào các hệ CSDL quan hệ?' },
        options: [
          { en: 'SQL:2003', vi: 'SQL:2003' },
          { en: 'SQL:1989', vi: 'SQL:1989' },
          { en: 'SQL:1992', vi: 'SQL:1992' },
          { en: 'SQL:2019', vi: 'SQL:2019' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Window functions were standardized in the SQL:2003 specification.', vi: 'Hàm cửa sổ được chính thức chuẩn hóa trong bản đặc tả SQL:2003.' }
      },
      {
        id: 'sql_q_14_13',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'hard',
        question: { en: 'What is the purpose of the WINDOW clause at the end of a SELECT query in modern SQL?', vi: 'Mục đích của mệnh đề WINDOW ở cuối truy vấn SELECT trong SQL hiện đại là gì?' },
        options: [
          { en: 'To define a reusable named window specification (e.g. WINDOW w AS (PARTITION BY dept_id ORDER BY salary DESC)) referenced by multiple OVER w clauses', vi: 'Để định nghĩa một đặc tả cửa sổ có tên tái sử dụng được (ví dụ: WINDOW w AS (PARTITION BY dept_id ORDER BY salary DESC)) được nhiều mệnh đề OVER w tham chiếu' },
          { en: 'To open a GUI modal window in the browser', vi: 'Để mở một cửa sổ giao diện modal trên trình duyệt' },
          { en: 'To set the display resolution', vi: 'Để thiết lập độ phân giải hiển thị' },
          { en: 'To encrypt the query results', vi: 'Để mã hóa kết quả truy vấn' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The WINDOW clause eliminates repetitive OVER(...) syntax via named window definitions.', vi: 'Mệnh đề WINDOW giúp loại bỏ cú pháp OVER(...) lặp đi lặp lại bằng các định nghĩa cửa sổ có tên.' }
      },
      {
        id: 'sql_q_14_14',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'easy',
        question: { en: 'Does ROW_NUMBER() ever produce identical numbers for two distinct rows in the same partition?', vi: 'ROW_NUMBER() có bao giờ tạo ra số thứ tự giống nhau cho hai dòng khác nhau trong cùng một phân vùng không?' },
        options: [
          { en: 'No, ROW_NUMBER() is guaranteed to produce strictly unique sequential integers (1, 2, 3...) per partition', vi: 'Không, ROW_NUMBER() đảm bảo luôn tạo ra các số nguyên tuần tự duy nhất (1, 2, 3...) cho mỗi phân vùng' },
          { en: 'Yes, when columns have equal values', vi: 'Có, khi các cột có giá trị bằng nhau' },
          { en: 'Yes, for NULL rows', vi: 'Có, với các dòng chứa NULL' },
          { en: 'Only on Sundays', vi: 'Chỉ vào ngày Chủ Nhật' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ROW_NUMBER is strictly deterministic and unique per row in the partition.', vi: 'ROW_NUMBER luôn cho giá trị duy nhất và tuần tự cho từng dòng trong phân vùng.' }
      },
      {
        id: 'sql_q_14_15',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'medium',
        question: { en: 'What does CUME_DIST() compute in SQL window functions?', vi: 'Hàm CUME_DIST() tính toán điều gì trong các hàm cửa sổ SQL?' },
        options: [
          { en: 'The cumulative distribution: the proportion of rows with values less than or equal to the current row value (between 0.0 and 1.0)', vi: 'Phân phối tích lũy: tỷ lệ các dòng có giá trị nhỏ hơn hoặc bằng giá trị của dòng hiện tại (từ 0.0 đến 1.0)' },
          { en: 'The geographical distance between servers', vi: 'Khoảng cách địa lý giữa các máy chủ' },
          { en: 'The customer discount', vi: 'Chiết khấu của khách hàng' },
          { en: 'The number of database connections', vi: 'Số lượng kết nối CSDL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'CUME_DIST calculates cumulative distribution: (rows with value <= current) / total_rows.', vi: 'CUME_DIST tính tỷ lệ phân phối tích lũy: (số dòng có giá trị <= hiện tại) / tổng số dòng.' }
      },
      {
        id: 'sql_q_14_16',
        type: 'single_choice',
        topicId: 'sql_window_ranking',
        difficulty: 'hard',
        question: { en: 'What happens when multiple rows have identical ORDER BY values in ROW_NUMBER() without a secondary tie-breaker?', vi: 'Điều gì xảy ra khi nhiều dòng có giá trị ORDER BY giống hệt nhau trong ROW_NUMBER() mà không có cột phụ để phân định?' },
        options: [
          { en: 'The assigned row numbers are non-deterministic (the engine arbitrarily decides which row gets 1 vs 2)', vi: 'Số thứ tự được gán là không xác định trước (trình thực thi sẽ tùy ý quyết định dòng nào nhận số 1 hay số 2)' },
          { en: 'The query fails with an error', vi: 'Truy vấn báo lỗi' },
          { en: 'Both rows get NULL', vi: 'Cả hai dòng đều nhận NULL' },
          { en: 'The database sorts by primary key automatically', vi: 'CSDL tự động sắp xếp theo khóa chính' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Without a unique tie-breaker column in ORDER BY, ROW_NUMBER assignment for tied values is non-deterministic.', vi: 'Nếu không có cột phân định phụ duy nhất trong ORDER BY, thứ tự gán của ROW_NUMBER cho các dòng đồng hạng là ngẫu nhiên/không xác định.' }
      }
    ]
  },

  // LESSON 15: Window Frames & Offset Functions: LAG, LEAD, FIRST_VALUE & Frame Specs
  {
    id: 'sql_lesson_15',
    moduleId: 'sql_mod_3',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 15,
    topicId: 'sql_window_frames_offset',
    title: {
      en: 'Window Frames & Offset Functions: LAG, LEAD, FIRST_VALUE & Frame Specs',
      vi: 'Khung Cửa Sổ & Hàm Độ Lệch: LAG, LEAD, FIRST_VALUE & Khung Dữ Liệu'
    },
    summary: {
      en: 'Master value offset functions (LAG, LEAD, FIRST_VALUE, LAST_VALUE) to calculate period-over-period growth and deltas, and precisely control sliding window frames using ROWS BETWEEN.',
      vi: 'Làm chủ các hàm độ lệch giá trị (LAG, LEAD, FIRST_VALUE, LAST_VALUE) để tính tăng trưởng theo kỳ và độ biến thiên, đồng thời kiểm soát chính xác khung cửa sổ trượt bằng ROWS BETWEEN.'
    },
    estimatedMinutes: 25,
    learn: {
      introduction: {
        en: 'Offset and frame functions provide the ability to look forwards and backwards across neighboring rows without self-joins. They are the foundation of financial time-series analysis, period-over-period growth calculations, and moving averages.',
        vi: 'Các hàm độ lệch (offset) và khung cửa sổ cho phép bạn nhìn về phía trước hoặc phía sau các dòng lân cận mà không cần tự join bảng. Đây là nền tảng của phân tích chuỗi thời gian tài chính, tính tỷ lệ tăng trưởng theo kỳ và đường trung bình động (moving average).'
      },
      conceptExplanation: {
        en: 'Offset Functions: 1) LAG(col, offset, default) accesses data from N rows BEFORE the current row (e.g. yesterday\'s revenue). 2) LEAD(col, offset, default) accesses data from N rows AFTER the current row. 3) FIRST_VALUE(col) and LAST_VALUE(col) retrieve boundary values. Window Frames: When an ORDER BY is present, the default frame is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (creating running totals). You can customize the sliding frame precisely using ROWS BETWEEN (e.g. ROWS BETWEEN 2 PRECEDING AND CURRENT ROW for a 3-row moving average).',
        vi: 'Các hàm độ lệch: 1) LAG(cot, do_lech, mac_dinh) truy cập dữ liệu từ N dòng TRƯỚC dòng hiện tại (như doanh thu ngày hôm trước). 2) LEAD(cot, do_lech, mac_dinh) truy cập dữ liệu từ N dòng SAU dòng hiện tại. 3) FIRST_VALUE(cot) và LAST_VALUE(cot) lấy giá trị ở các mốc biên. Khung cửa sổ (Window Frames): Khi có ORDER BY, khung mặc định là RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (tạo ra tổng lũy kế). Bạn có thể tùy chỉnh khung trượt chính xác bằng ROWS BETWEEN (như ROWS BETWEEN 2 PRECEDING AND CURRENT ROW để tính trung bình động 3 dòng).'
      },
      syntax: `-- 1. LAG & LEAD for Period-over-Period Delta:
SELECT order_id, customer_name, order_date, amount,
       LAG(amount, 1, 0.0) OVER(PARTITION BY customer_name ORDER BY order_date) AS prev_amount,
       amount - LAG(amount, 1, amount) OVER(PARTITION BY customer_name ORDER BY order_date) AS amount_diff
FROM orders;

-- 2. 3-Point Moving Average Frame:
SELECT order_id, order_date, amount,
       AVG(amount) OVER(
         ORDER BY order_date
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS moving_3_avg
FROM orders;

-- 3. Running Total (Cumulative Sum):
SELECT order_id, amount,
       SUM(amount) OVER(
         ORDER BY order_id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS cumulative_sales
FROM orders;`,
      examples: [
        {
          title: {
            en: '1. Calculating Customer Order Growth with LAG',
            vi: '1. Tính Mức Tăng Trưởng Đơn Hàng Của Khách Bằng LAG'
          },
          code: `SELECT order_id, customer_name, amount,
       LAG(amount, 1) OVER(PARTITION BY customer_name ORDER BY order_id) AS prev_order_amount,
       ROUND(amount - LAG(amount, 1, amount) OVER(PARTITION BY customer_name ORDER BY order_id), 2) AS delta
FROM orders
ORDER BY customer_name, order_id;`,
          language: 'sql',
          explanation: {
            en: 'Fetches the preceding order amount for the same customer to compute order-to-order spending variance.',
            vi: 'Lấy giá trị của đơn hàng liền trước của cùng khách hàng để tính mức độ biến thiên chi tiêu giữa các lần mua.'
          }
        },
        {
          title: {
            en: '2. Continuous Running Cumulative Total',
            vi: '2. Tính Tổng Lũy Kế Liên Tục'
          },
          code: `SELECT order_id, customer_name, amount,
       SUM(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM orders
ORDER BY order_id;`,
          language: 'sql',
          explanation: {
            en: 'Calculates the cumulative ledger sum from the beginning of time up to the current row.',
            vi: 'Tính tổng sổ cái lũy kế từ đầu bảng cho đến dòng hiện tại.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Falling into the LAST_VALUE() default frame trap',
            vi: 'Rơi vào bẫy khung mặc định của hàm LAST_VALUE()'
          },
          correction: {
            en: 'Because the default window frame with ORDER BY ends at CURRENT ROW, LAST_VALUE(col) OVER(ORDER BY ...) simply returns the current row value! To find the true partition maximum/last value, explicitly specify "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING".',
            vi: 'Vì khung cửa sổ mặc định khi có ORDER BY kết thúc ở CURRENT ROW, nên hàm LAST_VALUE(col) OVER(ORDER BY ...) sẽ chỉ trả về chính dòng hiện tại! Để lấy đúng giá trị cuối cùng của phân vùng, bắt buộc phải khai báo rõ "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING".'
          },
          code: `-- WRONG (Returns current row value):
SELECT LAST_VALUE(amount) OVER(ORDER BY order_id) FROM orders;
-- CORRECT (Scans the entire partition):
SELECT LAST_VALUE(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) FROM orders;`
        },
        {
          mistake: {
            en: 'Omitting ORDER BY when using LAG or LEAD',
            vi: 'Quên mệnh đề ORDER BY khi sử dụng LAG hoặc LEAD'
          },
          correction: {
            en: 'Offset concepts ("previous" or "next") are meaningless in relational databases unless an explicit ORDER BY is defined inside the OVER clause.',
            vi: 'Khái niệm độ lệch ("trước đó" hay "kế tiếp") là vô nghĩa trong CSDL quan hệ trừ khi bạn định nghĩa rõ ràng mệnh đề ORDER BY bên trong OVER.'
          },
          code: `-- SYNTAX / SEMANTIC ERROR: LAG(amount) OVER(PARTITION BY customer_name)
-- CORRECT:
LAG(amount) OVER(PARTITION BY customer_name ORDER BY order_id)`
        }
      ],
      tips: [
        {
          en: 'The 3rd argument in LAG/LEAD is a fallback default value substituted when the offset points out of bounds (e.g. LAG(amount, 1, 0.0)).',
          vi: 'Đối số thứ 3 trong LAG/LEAD là giá trị mặc định thay thế khi chỉ số độ lệch vượt ra ngoài biên dữ liệu (ví dụ: LAG(amount, 1, 0.0)).'
        },
        {
          en: 'ROWS treats each physical row as an individual step; RANGE treats rows with identical ORDER BY values as a single tied unit.',
          vi: 'ROWS coi từng dòng vật lý là một bước riêng lẻ; RANGE coi các dòng có cùng giá trị ORDER BY là một khối đồng hạng.'
        }
      ],
      practiceStarterCode: `-- Calculate running total of order amounts
SELECT order_id, customer_name, amount,
       SUM(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total
FROM orders;`,
      practice: {
        task: {
          en: 'Write a query that uses LAG(salary, 1, 0) OVER(ORDER BY salary ASC) to select name, salary, and the previous lower employee salary as prev_salary from employees ORDER BY salary ASC.',
          vi: 'Viết truy vấn dùng LAG(salary, 1, 0) OVER(ORDER BY salary ASC) để chọn name, salary và mức lương liền kề phía dưới đặt tên là prev_salary từ bảng employees sắp xếp salary ASC.'
        },
        starterCode: `-- Use LAG to look up previous salary
SELECT name, salary,
       LAG(salary, 1, 0) OVER(ORDER BY ) AS prev_salary
FROM employees
ORDER BY salary ASC;`,
        solutionCode: `SELECT name, salary, LAG(salary, 1, 0) OVER(ORDER BY salary ASC) AS prev_salary FROM employees ORDER BY salary ASC;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_15_1',
        type: 'fix_code',
        title: { en: 'Fix Missing ORDER BY in LAG Function', vi: 'Sửa Lỗi Thiếu ORDER BY Trong Hàm LAG' },
        instruction: {
          en: 'Add "ORDER BY order_id ASC" inside the OVER clause of the LAG function.',
          vi: 'Thêm "ORDER BY order_id ASC" vào bên trong mệnh đề OVER của hàm LAG.'
        },
        starterCode: 'SELECT order_id, amount, LAG(amount, 1, 0.0) OVER() AS prev_amt FROM orders;',
        solutionCode: 'SELECT order_id, amount, LAG(amount, 1, 0.0) OVER(ORDER BY order_id ASC) AS prev_amt FROM orders;',
        hint: { en: 'Add "ORDER BY order_id ASC" inside OVER(...).', vi: 'Thêm "ORDER BY order_id ASC" vào bên trong OVER(...).' },
        explanation: {
          en: 'LAG and LEAD strictly require an ORDER BY clause to establish row order.',
          vi: 'LAG và LEAD bắt buộc phải có mệnh đề ORDER BY để thiết lập thứ tự các dòng.'
        }
      },
      {
        id: 'sql_ex_15_2',
        type: 'complete_code',
        title: { en: 'Complete Cumulative Frame Specification', vi: 'Hoàn Thiện Đặc Tả Khung Lũy Kế' },
        instruction: {
          en: 'Complete the frame specification: "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW".',
          vi: 'Hoàn thiện đặc tả khung: "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW".'
        },
        starterCode: 'SELECT order_id, amount, SUM(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND ) AS running_total FROM orders;',
        solutionCode: 'SELECT order_id, amount, SUM(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM orders;',
        hint: { en: 'Complete with "CURRENT ROW".', vi: 'Hoàn thiện với "CURRENT ROW".' },
        explanation: {
          en: 'UNBOUNDED PRECEDING AND CURRENT ROW accumulates all rows from start to current row.',
          vi: 'UNBOUNDED PRECEDING AND CURRENT ROW tích lũy tất cả các dòng từ đầu đến dòng hiện tại.'
        }
      },
      {
        id: 'sql_ex_15_3',
        type: 'write_code',
        title: { en: 'Next Order Amount Preview with LEAD', vi: 'Xem Trước Giá Trị Đơn Hàng Tiếp Theo Bằng LEAD' },
        instruction: {
          en: 'Write a query selecting order_id, customer_name, amount, and LEAD(amount, 1, 0.0) OVER(ORDER BY order_id ASC) AS next_amount FROM orders ORDER BY order_id ASC.',
          vi: 'Viết truy vấn chọn order_id, customer_name, amount và LEAD(amount, 1, 0.0) OVER(ORDER BY order_id ASC) AS next_amount TỪ orders XẾP THEO order_id ASC.'
        },
        starterCode: '-- Select order with next amount using LEAD\n',
        solutionCode: 'SELECT order_id, customer_name, amount, LEAD(amount, 1, 0.0) OVER(ORDER BY order_id ASC) AS next_amount FROM orders ORDER BY order_id ASC;',
        hint: { en: 'Use LEAD(amount, 1, 0.0) OVER(ORDER BY order_id ASC) AS next_amount.', vi: 'Dùng LEAD(amount, 1, 0.0) OVER(ORDER BY order_id ASC) AS next_amount.' },
        explanation: {
          en: 'LEAD projects values from subsequent rows forward.',
          vi: 'LEAD chiếu giá trị từ các dòng kế tiếp về phía trước.'
        }
      },
      {
        id: 'sql_ex_15_4',
        type: 'modify_example',
        title: { en: 'Adjust Offset Distance in LAG', vi: 'Điều Chỉnh Khoảng Cách Độ Lệch Trong LAG' },
        instruction: {
          en: 'Change the LAG offset from 1 to 2 to compare the current order against 2 orders ago.',
          vi: 'Đổi độ lệch của LAG từ 1 thành 2 để so sánh đơn hàng hiện tại với đơn hàng cách đó 2 lượt.'
        },
        starterCode: 'SELECT order_id, amount, LAG(amount, 1, 0.0) OVER(ORDER BY order_id) AS prev_amt FROM orders;',
        solutionCode: 'SELECT order_id, amount, LAG(amount, 2, 0.0) OVER(ORDER BY order_id) AS prev_amt FROM orders;',
        hint: { en: 'Change LAG(amount, 1, 0.0) to LAG(amount, 2, 0.0).', vi: 'Đổi LAG(amount, 1, 0.0) thành LAG(amount, 2, 0.0).' },
        explanation: {
          en: 'The second argument to LAG specifies the step offset magnitude.',
          vi: 'Đối số thứ hai của LAG xác định độ lớn bước nhảy độ lệch.'
        }
      },
      {
        id: 'sql_ex_15_5',
        type: 'predict_output',
        title: { en: 'Predict Result of LAG on First Row', vi: 'Dự Đoán Kết Quả Của LAG Trên Dòng Đầu Tiên' },
        instruction: {
          en: 'What value does "LAG(amount, 1, 99.0)" return for the very first row in an ordered partition?',
          vi: 'Hàm "LAG(amount, 1, 99.0)" trả về giá trị gì cho chính dòng đầu tiên trong một phân vùng đã sắp xếp?'
        },
        starterCode: '-- Predict LAG boundary default\n',
        solutionCode: 'SELECT 99.0 AS boundary_val;',
        options: ['99.0 (the supplied default value)', 'NULL', '0.0', 'An unhandled crash error'],
        correctOptionIndex: 0,
        hint: { en: 'When out of bounds, LAG returns the 3rd argument default value.', vi: 'Khi vượt ra ngoài biên, LAG trả về giá trị mặc định ở đối số thứ 3.' },
        explanation: {
          en: 'Because there is no preceding row for row 1, LAG returns the explicit default 99.0.',
          vi: 'Vì không có dòng nào đứng trước dòng 1, LAG trả về giá trị mặc định được chỉ định là 99.0.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_15',
      title: { en: 'Financial Ledger Audit: Running Balance & Transaction Delta Analysis', vi: 'Kiểm Toán Sổ Cái Tài Chính: Số Dư Lũy Kế & Độ Biến Thiên Giao Dịch' },
      description: {
        en: 'Write a comprehensive analytical SQL query on the orders table that computes financial timeline metrics for every transaction: 1) Select order_id, customer_name, amount. 2) Calculate running_total as the cumulative sum of amount from the start of the ledger to the current row (ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW). 3) Calculate prev_amount using LAG(amount, 1, 0.0) OVER(ORDER BY order_id). 4) Calculate amount_delta as ROUND(amount - LAG(amount, 1, amount) OVER(ORDER BY order_id), 2). Order by order_id ASC.',
        vi: 'Viết truy vấn SQL phân tích toàn diện trên bảng orders để tính các chỉ số dòng thời gian tài chính cho từng giao dịch: 1) Chọn order_id, customer_name, amount. 2) Tính running_total là tổng lũy kế của amount từ đầu sổ cái đến dòng hiện tại (ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW). 3) Tính prev_amount dùng LAG(amount, 1, 0.0) OVER(ORDER BY order_id). 4) Tính amount_delta là ROUND(amount - LAG(amount, 1, amount) OVER(ORDER BY order_id), 2). Sắp xếp theo order_id ASC.'
      },
      requirements: [
        { en: 'Select order_id, customer_name, amount', vi: 'Chọn order_id, customer_name, amount' },
        { en: 'SUM(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total', vi: 'SUM(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total' },
        { en: 'LAG(amount, 1, 0.0) OVER(ORDER BY order_id) AS prev_amount', vi: 'LAG(amount, 1, 0.0) OVER(ORDER BY order_id) AS prev_amount' },
        { en: 'ROUND(amount - LAG(amount, 1, amount) OVER(ORDER BY order_id), 2) AS amount_delta', vi: 'ROUND(amount - LAG(amount, 1, amount) OVER(ORDER BY order_id), 2) AS amount_delta' },
        { en: 'ORDER BY order_id ASC', vi: 'ORDER BY order_id ASC' }
      ],
      starterCode: `-- Write your SQL financial timeline query below
SELECT order_id, customer_name, amount,
       SUM(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,
       LAG(amount, 1, 0.0) OVER(ORDER BY order_id) AS prev_amount,
       ROUND(amount - LAG(amount, 1, amount) OVER(ORDER BY order_id), 2) AS amount_delta
FROM orders
ORDER BY ;`,
      solutionCode: `SELECT order_id, customer_name, amount, SUM(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total, LAG(amount, 1, 0.0) OVER(ORDER BY order_id) AS prev_amount, ROUND(amount - LAG(amount, 1, amount) OVER(ORDER BY order_id), 2) AS amount_delta FROM orders ORDER BY order_id ASC;`,
      hints: [{ en: 'Complete with ORDER BY order_id ASC.', vi: 'Hoàn thiện với ORDER BY order_id ASC.' }],
      solutionExplanation: {
        en: 'Constructs an end-to-end ledger audit combining window frames and offset lag functions.',
        vi: 'Xây dựng bảng kiểm toán sổ cái hoàn chỉnh kết hợp khung cửa sổ trượt và các hàm độ lệch lag.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_15_v1',
        title: { en: 'Financial Ledger Audit: Running Balance & Transaction Delta Analysis', vi: 'Kiểm Toán Sổ Cái Tài Chính: Số Dư Lũy Kế & Độ Biến Thiên Giao Dịch' },
        description: {
          en: 'Calculate running_total, prev_amount, and amount_delta on orders: order_id, customer_name, amount, running_total, prev_amount, amount_delta ordered by order_id ASC.',
          vi: 'Tính running_total, prev_amount và amount_delta trên orders: order_id, customer_name, amount, running_total, prev_amount, amount_delta xếp theo order_id ASC.'
        },
        requirements: [{ en: 'ORDER BY order_id ASC', vi: 'ORDER BY order_id ASC' }],
        starterCode: `SELECT order_id, customer_name, amount FROM orders;`,
        solutionCode: `SELECT order_id, customer_name, amount, SUM(amount) OVER(ORDER BY order_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total, LAG(amount, 1, 0.0) OVER(ORDER BY order_id) AS prev_amount, ROUND(amount - LAG(amount, 1, amount) OVER(ORDER BY order_id), 2) AS amount_delta FROM orders ORDER BY order_id ASC;`,
        hints: [{ en: 'Add the window and LAG expressions.', vi: 'Thêm các biểu thức window và LAG.' }],
        solutionExplanation: { en: 'Full financial audit pipeline.', vi: 'Quy trình kiểm toán tài chính hoàn chỉnh.' }
      },
      {
        id: 'sql_ch_15_v2',
        title: { en: 'Salary Ladder Offset Analysis', vi: 'Phân Tích Thang Bậc Lương Kế Tiếp' },
        description: {
          en: 'Select name, dept_id, salary, LEAD(salary, 1, salary) OVER(PARTITION BY dept_id ORDER BY salary ASC) AS next_salary, ROUND(LEAD(salary, 1, salary) OVER(PARTITION BY dept_id ORDER BY salary ASC) - salary, 2) AS step_up FROM employees ORDER BY dept_id ASC, salary ASC;',
          vi: 'Chọn name, dept_id, salary, LEAD(salary, 1, salary) OVER(PARTITION BY dept_id ORDER BY salary ASC) AS next_salary, ROUND(LEAD(salary, 1, salary) OVER(PARTITION BY dept_id ORDER BY salary ASC) - salary, 2) AS step_up TỪ employees XẾP THEO dept_id ASC, salary ASC;'
        },
        requirements: [
          { en: 'LEAD(salary, 1, salary) OVER(PARTITION BY dept_id ORDER BY salary ASC) AS next_salary', vi: 'LEAD(salary, 1, salary) OVER(PARTITION BY dept_id ORDER BY salary ASC) AS next_salary' },
          { en: 'ORDER BY dept_id ASC, salary ASC', vi: 'ORDER BY dept_id ASC, salary ASC' }
        ],
        starterCode: `SELECT name, dept_id, salary FROM employees;`,
        solutionCode: `SELECT name, dept_id, salary, LEAD(salary, 1, salary) OVER(PARTITION BY dept_id ORDER BY salary ASC) AS next_salary, ROUND(LEAD(salary, 1, salary) OVER(PARTITION BY dept_id ORDER BY salary ASC) - salary, 2) AS step_up FROM employees ORDER BY dept_id ASC, salary ASC;`,
        hints: [{ en: 'Use LEAD partitioned by dept_id.', vi: 'Dùng LEAD phân vùng theo dept_id.' }],
        solutionExplanation: { en: 'Evaluates next salary step within department.', vi: 'Đánh giá bước nhảy lương kế tiếp trong phòng ban.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_15_1',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'easy',
        question: { en: 'What does the LAG(column, n) window function do?', vi: 'Hàm cửa sổ LAG(column, n) thực hiện nhiệm vụ gì?' },
        options: [
          { en: 'It retrieves the value of the specified column from n rows BEFORE the current row within the partition', vi: 'Nó lấy giá trị của cột được chỉ định từ n dòng ĐỨNG TRƯỚC dòng hiện tại trong phân vùng' },
          { en: 'It delays database execution by n seconds', vi: 'Nó làm trễ thời gian thực thi của CSDL n giây' },
          { en: 'It deletes n rows from the table', vi: 'Nó xóa n dòng khỏi bảng' },
          { en: 'It calculates the network lag to the server', vi: 'Nó tính độ trễ mạng đến máy chủ' }
        ],
        correctAnswers: [0],
        explanation: { en: 'LAG accesses preceding row values relative to the current position.', vi: 'LAG truy cập giá trị của các dòng đứng trước tương quan với vị trí hiện tại.' }
      },
      {
        id: 'sql_q_15_2',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'easy',
        question: { en: 'What does the LEAD(column, n) window function do?', vi: 'Hàm cửa sổ LEAD(column, n) thực hiện nhiệm vụ gì?' },
        options: [
          { en: 'It retrieves the value of the specified column from n rows AFTER the current row within the partition', vi: 'Nó lấy giá trị của cột được chỉ định từ n dòng ĐỨNG SAU dòng hiện tại trong phân vùng' },
          { en: 'It promotes a row to team leader', vi: 'Nó thăng hạng dòng thành trưởng nhóm' },
          { en: 'It converts strings to uppercase', vi: 'Nó chuyển chuỗi thành chữ hoa' },
          { en: 'It finds the maximum value in the database', vi: 'Nó tìm giá trị lớn nhất trong CSDL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'LEAD accesses subsequent row values ahead of the current position.', vi: 'LEAD truy cập giá trị của các dòng đứng sau phía trước vị trí hiện tại.' }
      },
      {
        id: 'sql_q_15_3',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'medium',
        question: { en: 'What is the purpose of the 3rd parameter in "LAG(amount, 1, 0.0)"?', vi: 'Mục đích của tham số thứ 3 trong "LAG(amount, 1, 0.0)" là gì?' },
        options: [
          { en: 'It supplies a fallback default value when the offset extends past partition boundaries (instead of returning NULL)', vi: 'Nó cung cấp giá trị mặc định thay thế khi độ lệch vượt ra ngoài biên phân vùng (thay vì trả về NULL)' },
          { en: 'It sets the currency symbol', vi: 'Nó thiết lập ký hiệu tiền tệ' },
          { en: 'It rounds the number to 0 decimals', vi: 'Nó làm tròn số về 0 chữ số thập phân' },
          { en: 'It filters out zero values', vi: 'Nó lọc bỏ các giá trị 0' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The default argument replaces NULL when offset indexing is out of range.', vi: 'Tham số mặc định thay thế cho NULL khi chỉ số độ lệch nằm ngoài phạm vi.' }
      },
      {
        id: 'sql_q_15_4',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'hard',
        question: { en: 'What is the default window frame specification when an ORDER BY clause is present in OVER()?', vi: 'Đặc tả khung cửa sổ mặc định là gì khi có mệnh đề ORDER BY bên trong OVER()?' },
        options: [
          { en: 'RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW', vi: 'RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW' },
          { en: 'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING', vi: 'ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING' },
          { en: 'ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING', vi: 'ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING' },
          { en: 'There is no default frame', vi: 'Không có khung mặc định' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ANSI SQL defaults to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, producing running totals.', vi: 'Chuẩn ANSI SQL mặc định là RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, tạo ra tổng lũy kế.' }
      },
      {
        id: 'sql_q_15_5',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'hard',
        question: { en: 'Why does "LAST_VALUE(salary) OVER(ORDER BY hire_date)" often return unexpected results?', vi: 'Tại sao hàm "LAST_VALUE(salary) OVER(ORDER BY hire_date)" thường trả về kết quả không như mong đợi?' },
        options: [
          { en: 'Because the default window frame ends at CURRENT ROW, making LAST_VALUE return the current row instead of the partition last row', vi: 'Vì khung cửa sổ mặc định kết thúc ở CURRENT ROW, khiến LAST_VALUE chỉ trả về chính dòng hiện tại thay vì dòng cuối của phân vùng' },
          { en: 'Because LAST_VALUE is deprecated', vi: 'Vì LAST_VALUE đã bị xóa bỏ' },
          { en: 'Because salary is an integer', vi: 'Vì salary là số nguyên' },
          { en: 'Because hire_date must be formatted as string', vi: 'Vì hire_date phải định dạng chuỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'To get the true final row value, specify ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.', vi: 'Để lấy đúng giá trị của dòng cuối cùng, hãy chỉ định ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.' }
      },
      {
        id: 'sql_q_15_6',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'medium',
        question: { en: 'What window frame specification is used to calculate a 3-row moving average (current row and previous 2 rows)?', vi: 'Đặc tả khung cửa sổ nào được dùng để tính trung bình động 3 dòng (dòng hiện tại và 2 dòng đứng trước)?' },
        options: [
          { en: 'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW', vi: 'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW' },
          { en: 'ROWS BETWEEN 3 PRECEDING AND CURRENT ROW', vi: 'ROWS BETWEEN 3 PRECEDING AND CURRENT ROW' },
          { en: 'RANGE 3 ROWS', vi: 'RANGE 3 ROWS' },
          { en: 'OFFSET 2 ROWS', vi: 'OFFSET 2 ROWS' }
        ],
        correctAnswers: [0],
        explanation: { en: '2 PRECEDING + CURRENT ROW equals a 3-row moving calculation window.', vi: '2 PRECEDING + CURRENT ROW tạo thành khung tính toán trượt gồm đúng 3 dòng.' }
      },
      {
        id: 'sql_q_15_7',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'medium',
        question: { en: 'What is the difference between ROWS and RANGE in window frame specifications?', vi: 'Sự khác biệt giữa ROWS và RANGE trong đặc tả khung cửa sổ là gì?' },
        options: [
          { en: 'ROWS operates on physical row offsets; RANGE operates on logical value offsets (treating ties with equal ORDER BY values as a single unit)', vi: 'ROWS hoạt động trên độ lệch dòng vật lý; RANGE hoạt động trên độ lệch giá trị logic (xem các dòng đồng hạng ORDER BY là một khối thống nhất)' },
          { en: 'ROWS only works in SQLite; RANGE only works in Oracle', vi: 'ROWS chỉ chạy trong SQLite; RANGE chỉ chạy trong Oracle' },
          { en: 'ROWS is for text; RANGE is for dates only', vi: 'ROWS dành cho văn bản; RANGE chỉ dành cho ngày tháng' },
          { en: 'There is no difference', vi: 'Không có sự khác biệt' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ROWS measures discrete physical rows, whereas RANGE evaluates logical value equivalence.', vi: 'ROWS đo lường số dòng vật lý rời rạc, trong khi RANGE đánh giá sự tương đương về giá trị logic.' }
      },
      {
        id: 'sql_q_15_8',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'easy',
        question: { en: 'What does FIRST_VALUE(salary) OVER(PARTITION BY dept_id ORDER BY salary DESC) return?', vi: 'Hàm FIRST_VALUE(salary) OVER(PARTITION BY dept_id ORDER BY salary DESC) trả về giá trị gì?' },
        options: [
          { en: 'The highest salary in that department projected onto every employee row in that department', vi: 'Mức lương cao nhất trong phòng ban đó được gắn vào mọi dòng nhân viên trong cùng phòng ban' },
          { en: 'The lowest salary', vi: 'Mức lương thấp nhất' },
          { en: 'The average salary', vi: 'Mức lương trung bình' },
          { en: 'The salary of the CEO', vi: 'Mức lương của CEO' }
        ],
        correctAnswers: [0],
        explanation: { en: 'FIRST_VALUE returns the top value of the ordered partition.', vi: 'FIRST_VALUE trả về giá trị đứng đầu tiên của phân vùng đã sắp xếp.' }
      },
      {
        id: 'sql_q_15_9',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'hard',
        question: { en: 'How do you calculate Month-over-Month (MoM) revenue percentage growth in SQL?', vi: 'Làm thế nào để tính phần trăm tăng trưởng doanh thu so với tháng trước (MoM) trong SQL?' },
        options: [
          { en: 'ROUND(((revenue - LAG(revenue) OVER(ORDER BY month)) / LAG(revenue) OVER(ORDER BY month)) * 100.0, 2)', vi: 'ROUND(((revenue - LAG(revenue) OVER(ORDER BY month)) / LAG(revenue) OVER(ORDER BY month)) * 100.0, 2)' },
          { en: 'revenue - MAX(revenue)', vi: 'revenue - MAX(revenue)' },
          { en: 'revenue / 12', vi: 'revenue / 12' },
          { en: 'SUM(revenue) / COUNT(*)', vi: 'SUM(revenue) / COUNT(*)' }
        ],
        correctAnswers: [0],
        explanation: { en: 'MoM Growth = ((Current - Previous) / Previous) * 100.', vi: 'Tăng trưởng MoM = ((Hiện tại - Trước đó) / Trước đó) * 100.' }
      },
      {
        id: 'sql_q_15_10',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'medium',
        question: { en: 'What does "UNBOUNDED PRECEDING" mean in a window frame specification?', vi: '"UNBOUNDED PRECEDING" có nghĩa là gì trong đặc tả khung cửa sổ?' },
        options: [
          { en: 'Start from the very first row of the partition', vi: 'Bắt đầu từ chính dòng đầu tiên của phân vùng' },
          { en: 'Start from the previous row', vi: 'Bắt đầu từ dòng liền trước' },
          { en: 'Ignore all rows', vi: 'Bỏ qua tất cả các dòng' },
          { en: 'Stop at current row', vi: 'Dừng ở dòng hiện tại' }
        ],
        correctAnswers: [0],
        explanation: { en: 'UNBOUNDED PRECEDING defines the start boundary as the very first row of the window.', vi: 'UNBOUNDED PRECEDING xác định ranh giới bắt đầu từ dòng đầu tiên của cửa sổ.' }
      },
      {
        id: 'sql_q_15_11',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'medium',
        question: { en: 'What does "UNBOUNDED FOLLOWING" mean in a window frame specification?', vi: '"UNBOUNDED FOLLOWING" có nghĩa là gì trong đặc tả khung cửa sổ?' },
        options: [
          { en: 'Extend the frame all the way to the very last row of the partition', vi: 'Mở rộng khung cửa sổ cho đến tận dòng cuối cùng của phân vùng' },
          { en: 'Stop at the next row', vi: 'Dừng ở dòng kế tiếp' },
          { en: 'Drop subsequent rows', vi: 'Bỏ các dòng phía sau' },
          { en: 'Only include NULL rows', vi: 'Chỉ bao gồm các dòng NULL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'UNBOUNDED FOLLOWING extends the frame end boundary to the final row of the partition.', vi: 'UNBOUNDED FOLLOWING mở rộng ranh giới kết thúc đến dòng cuối cùng của phân vùng.' }
      },
      {
        id: 'sql_q_15_12',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'hard',
        question: { en: 'What is the function NTH_VALUE(col, n) in SQL window functions?', vi: 'Hàm NTH_VALUE(col, n) là gì trong các hàm cửa sổ SQL?' },
        options: [
          { en: 'It retrieves the column value from the n-th row of the window frame', vi: 'Nó lấy giá trị cột từ dòng thứ n của khung cửa sổ' },
          { en: 'It calculates the n-th root of a number', vi: 'Nó tính căn bậc n của một số' },
          { en: 'It multiplies the column by n', vi: 'Nó nhân cột với n' },
          { en: 'It drops the n-th row', vi: 'Nó xóa dòng thứ n' }
        ],
        correctAnswers: [0],
        explanation: { en: 'NTH_VALUE(col, n) returns the value at index n within the active window frame.', vi: 'NTH_VALUE(col, n) trả về giá trị tại vị trí thứ n trong khung cửa sổ đang hoạt động.' }
      },
      {
        id: 'sql_q_15_13',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'easy',
        question: { en: 'Can LAG be called with an offset greater than 1 (e.g. LAG(salary, 3))?', vi: 'Hàm LAG có thể được gọi với độ lệch lớn hơn 1 không (ví dụ: LAG(salary, 3))?' },
        options: [
          { en: 'Yes, any positive integer offset can be passed to look back N rows', vi: 'Có, bất kỳ số nguyên dương nào cũng có thể được truyền vào để nhìn lùi lại N dòng' },
          { en: 'No, LAG is strictly limited to 1 row back', vi: 'Không, LAG bị giới hạn nghiêm ngặt chỉ nhìn lùi 1 dòng' },
          { en: 'Only in Oracle', vi: 'Chỉ trong Oracle' },
          { en: 'Only for date columns', vi: 'Chỉ dành cho các cột ngày tháng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The offset parameter in LAG/LEAD accepts any arbitrary positive integer N.', vi: 'Tham số độ lệch trong LAG/LEAD chấp nhận bất kỳ số nguyên dương N tùy ý nào.' }
      },
      {
        id: 'sql_q_15_14',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'medium',
        question: { en: 'What happens if you calculate SUM(amount) OVER(ORDER BY order_date) when multiple rows share the EXACT same order_date under default RANGE frame?', vi: 'Điều gì xảy ra nếu bạn tính SUM(amount) OVER(ORDER BY order_date) khi có nhiều dòng có CÙNG ngày order_date dưới khung mặc định RANGE?' },
        options: [
          { en: 'Under RANGE, tied rows receive the same total sum including all tied rows; use ROWS BETWEEN to sum strictly row-by-row', vi: 'Dưới khung RANGE, các dòng đồng hạng nhận cùng tổng số bao gồm tất cả các dòng đồng hạng; hãy dùng ROWS BETWEEN để cộng dồn nghiêm ngặt từng dòng' },
          { en: 'The database crashes', vi: 'CSDL bị sập' },
          { en: 'It drops duplicate dates', vi: 'Nó xóa các ngày trùng lặp' },
          { en: 'It outputs NULL for all ties', vi: 'Nó xuất ra NULL cho mọi dòng đồng hạng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'RANGE aggregates all rows sharing the same order_date at once. Explicitly specifying ROWS ensures step-by-step rolling addition.', vi: 'RANGE gộp tất cả các dòng có cùng order_date cùng một lúc. Chỉ định rõ ROWS đảm bảo việc cộng dồn từng bước một.' }
      },
      {
        id: 'sql_q_15_15',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'hard',
        question: { en: 'How do you center a 5-point moving average around the current row (2 before, current, 2 after)?', vi: 'Làm thế nào để đặt tâm cho đường trung bình động 5 điểm quanh dòng hiện tại (2 dòng trước, dòng hiện tại, 2 dòng sau)?' },
        options: [
          { en: 'ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING', vi: 'ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING' },
          { en: 'ROWS 5 CENTERED', vi: 'ROWS 5 CENTERED' },
          { en: 'RANGE BETWEEN 5 PRECEDING AND CURRENT ROW', vi: 'RANGE BETWEEN 5 PRECEDING AND CURRENT ROW' },
          { en: 'OFFSET 2 CENTER', vi: 'OFFSET 2 CENTER' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING captures a symmetrical 5-row centered window.', vi: 'ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING tạo ra khung cửa sổ đối xứng gồm 5 dòng lấy tâm là dòng hiện tại.' }
      },
      {
        id: 'sql_q_15_16',
        type: 'single_choice',
        topicId: 'sql_window_frames_offset',
        difficulty: 'easy',
        question: { en: 'Is the OVER clause mandatory for LAG and LEAD functions?', vi: 'Mệnh đề OVER có bắt buộc đối với các hàm LAG và LEAD không?' },
        options: [
          { en: 'Yes, all window and offset functions strictly require an OVER clause', vi: 'Có, tất cả các hàm cửa sổ và độ lệch bắt buộc phải có mệnh đề OVER' },
          { en: 'No, OVER is optional', vi: 'Không, OVER là tùy chọn' },
          { en: 'Only when used with GROUP BY', vi: 'Chỉ khi dùng với GROUP BY' },
          { en: 'Only in PostgreSQL', vi: 'Chỉ trong PostgreSQL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Window functions cannot be called without an OVER clause.', vi: 'Hàm cửa sổ không thể được gọi nếu thiếu mệnh đề OVER.' }
      }
    ]
  }
];

// Combine Part 1, Part 2, and Part 3 into Tier 3
const allTier3Lessons: Lesson[] = [
  ...tier3Part1Lessons,
  ...tier3Part2Lessons,
  ...tier3Part3Lessons
];

const outputPath = path.join(process.cwd(), 'src', 'data', 'sql', 'sqlLessonsTier3.ts');
const fileContent = `import { Lesson } from '../../types';\n\nexport const sqlLessonsTier3: Lesson[] = ${JSON.stringify(allTier3Lessons, null, 2)};\n`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully generated Tier 3 lessons: ${allTier3Lessons.length} lessons written to ${outputPath}`);
