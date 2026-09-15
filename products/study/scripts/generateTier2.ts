import * as fs from 'fs';
import * as path from 'path';
import { Lesson } from '../src/types';

export const tier2Lessons: Lesson[] = [
  // LESSON 6: Aggregates & Grouping: COUNT, SUM, AVG, MIN, MAX & GROUP BY
  {
    id: 'sql_lesson_6',
    moduleId: 'sql_mod_2',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 6,
    topicId: 'sql_group_by',
    title: {
      en: 'Aggregates & Grouping: COUNT, SUM, AVG, MIN, MAX & GROUP BY',
      vi: 'Hàm Tổng Hợp & Gom Nhóm: COUNT, SUM, AVG, MIN, MAX & GROUP BY'
    },
    summary: {
      en: 'Master aggregate reduction functions, NULL handling in calculations, single/multi-column GROUP BY, and preventing the classic unaggregated column projection trap.',
      vi: 'Làm chủ các hàm tổng hợp dữ liệu, cách xử lý NULL khi tính toán, gom nhóm GROUP BY đơn/đa cột và tránh bẫy chiếu cột chưa được gom nhóm.'
    },
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'Aggregate functions process multiple rows from a table and collapse them into a single scalar summary value. When paired with GROUP BY, they compute summaries independently for each unique bucket of data.',
        vi: 'Các hàm tổng hợp xử lý nhiều dòng dữ liệu và thu gọn chúng thành một giá trị tóm tắt duy nhất. Khi kết hợp với GROUP BY, chúng tính toán các chỉ số tóm tắt riêng biệt cho từng nhóm dữ liệu duy nhất.'
      },
      conceptExplanation: {
        en: 'The standard SQL aggregate functions are COUNT(*), COUNT(col), SUM(col), AVG(col), MIN(col), and MAX(col). Crucially, all aggregates except COUNT(*) silently skip NULL values. When using GROUP BY, the Golden Rule of SQL states: Every non-aggregate column listed in the SELECT clause MUST appear in the GROUP BY clause. Projecting an unaggregated, ungrouped column violates relational determinism.',
        vi: 'Các hàm tổng hợp chuẩn trong SQL gồm COUNT(*), COUNT(cột), SUM(cột), AVG(cột), MIN(cột) và MAX(cột). Đặc biệt, mọi hàm tổng hợp trừ COUNT(*) đều tự động bỏ qua giá trị NULL. Khi sử dụng GROUP BY, Quy Tắc Vàng của SQL là: Mọi cột không nằm trong hàm tổng hợp ở mệnh đề SELECT BẮT BUỘC phải có mặt trong mệnh đề GROUP BY.'
      },
      syntax: `SELECT grouping_col1, grouping_col2,
       COUNT(*) AS total_records,
       COUNT(nullable_col) AS valid_entries,
       AVG(numeric_col) AS average_val,
       SUM(numeric_col) AS total_val,
       MIN(numeric_col) AS min_val,
       MAX(numeric_col) AS max_val
FROM table_name
GROUP BY grouping_col1, grouping_col2;`,
      examples: [
        {
          title: {
            en: '1. Grouping Students by Course with Comprehensive Metrics',
            vi: '1. Gom Nhóm Học Viên Theo Khóa Học Với Các Chỉ Số Toàn Diện'
          },
          code: `SELECT course,
       COUNT(*) AS total_students,
       ROUND(AVG(score), 2) AS avg_score,
       MIN(score) AS lowest_score,
       MAX(score) AS highest_score
FROM students
GROUP BY course;`,
          language: 'sql',
          explanation: {
            en: 'Calculates the student headcount, average score rounded to 2 decimals, minimum, and maximum score for each individual course offering.',
            vi: 'Tính toán tổng số học viên, điểm trung bình làm tròn 2 chữ số thập phân, điểm thấp nhất và điểm cao nhất cho từng khóa học.'
          }
        },
        {
          title: {
            en: '2. Multi-Column Grouping by Department and City',
            vi: '2. Gom Nhóm Đa Cột Theo Phòng Ban và Thành Phố'
          },
          code: `SELECT dept_id, city,
       COUNT(*) AS head_count,
       SUM(salary) AS total_payroll
FROM employees
GROUP BY dept_id, city;`,
          language: 'sql',
          explanation: {
            en: 'Creates distinct buckets for each combination of department and city, calculating regional payroll totals.',
            vi: 'Tạo các nhóm riêng biệt cho từng tổ hợp phòng ban và thành phố, tính tổng quỹ lương theo từng khu vực.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Selecting unaggregated columns not included in GROUP BY',
            vi: 'Truy vấn các cột chưa được tổng hợp mà không đưa vào GROUP BY'
          },
          correction: {
            en: 'In PostgreSQL and ANSI SQL, selecting an ungrouped column causes a fatal error. Always aggregate or group all projected columns.',
            vi: 'Trong PostgreSQL và chuẩn ANSI SQL, chọn cột chưa gom nhóm sẽ báo lỗi ngay. Luôn gom nhóm hoặc bọc trong hàm tổng hợp mọi cột được chọn.'
          },
          code: `-- BAD (ANSI Error): SELECT name, course, AVG(score) FROM students GROUP BY course;
-- GOOD:
SELECT course, AVG(score) AS avg_score FROM students GROUP BY course;`
        },
        {
          mistake: {
            en: 'Confusing COUNT(*) with COUNT(column_name)',
            vi: 'Nhầm lẫn giữa COUNT(*) và COUNT(tên_cột)'
          },
          correction: {
            en: 'COUNT(*) counts every row in the group including NULLs. COUNT(col) only counts rows where that specific column is NOT NULL.',
            vi: 'COUNT(*) đếm tất cả các dòng trong nhóm bao gồm cả NULL. COUNT(cột) chỉ đếm các dòng mà cột đó KHÁC NULL.'
          },
          code: `-- Returns total rows vs total non-null emails:
SELECT COUNT(*) AS total_rows, COUNT(email) AS emails_present FROM students;`
        }
      ],
      tips: [
        {
          en: 'You can use expressions in GROUP BY, e.g., GROUP BY strftime(\'%Y-%m\', order_date) to group by month.',
          vi: 'Bạn có thể dùng biểu thức trong GROUP BY, ví dụ: GROUP BY strftime(\'%Y-%m\', order_date) để gom nhóm theo tháng.'
        },
        {
          en: 'DISTINCT can be used inside aggregates, e.g., COUNT(DISTINCT city) to count the number of unique cities within each group.',
          vi: 'Có thể dùng DISTINCT bên trong hàm tổng hợp, ví dụ: COUNT(DISTINCT city) để đếm số lượng thành phố duy nhất trong từng nhóm.'
        }
      ],
      practiceStarterCode: `-- Compute average score and student count per city
SELECT city, COUNT(*) AS student_count, AVG(score) AS avg_score FROM students GROUP BY city;`,
      practice: {
        task: {
          en: 'Write a query to calculate the count of students and max score for each course in the students table.',
          vi: 'Viết truy vấn tính số lượng học viên và điểm cao nhất cho từng khóa học trong bảng students.'
        },
        starterCode: `-- Group by course and calculate count and max score
SELECT course FROM students;`,
        solutionCode: `SELECT course, COUNT(*) AS student_count, MAX(score) AS max_score FROM students GROUP BY course;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_6_1',
        type: 'fix_code',
        title: { en: 'Fix Ungrouped Column Projection Error', vi: 'Sửa Lỗi Chiếu Cột Chưa Được Gom Nhóm' },
        instruction: {
          en: 'Fix the query by removing the ungrouped "name" column so that the query cleanly groups by course.',
          vi: 'Sửa truy vấn bằng cách loại bỏ cột "name" chưa gom nhóm để câu lệnh gom nhóm chuẩn xác theo course.'
        },
        starterCode: 'SELECT name, course, AVG(score) AS avg_score FROM students GROUP BY course;',
        solutionCode: 'SELECT course, AVG(score) AS avg_score FROM students GROUP BY course;',
        hint: { en: 'Remove "name, " from the SELECT clause.', vi: 'Xóa "name, " khỏi mệnh đề SELECT.' },
        explanation: {
          en: 'All columns in SELECT must be either part of the GROUP BY clause or enclosed in an aggregate function.',
          vi: 'Tất cả các cột trong SELECT bắt buộc phải nằm trong GROUP BY hoặc được bọc trong hàm tổng hợp.'
        }
      },
      {
        id: 'sql_ex_6_2',
        type: 'complete_code',
        title: { en: 'Calculate Total Payroll per Department', vi: 'Tính Tổng Quỹ Lương Theo Từng Phòng Ban' },
        instruction: {
          en: 'Complete the query to calculate SUM(salary) aliased as total_payroll grouped by dept_id.',
          vi: 'Hoàn thiện câu lệnh để tính SUM(salary) với bí danh total_payroll gom nhóm theo dept_id.'
        },
        starterCode: 'SELECT dept_id, (salary) AS total_payroll FROM employees GROUP BY ;',
        solutionCode: 'SELECT dept_id, SUM(salary) AS total_payroll FROM employees GROUP BY dept_id;',
        hint: { en: 'Use SUM(salary) and GROUP BY dept_id.', vi: 'Dùng SUM(salary) và GROUP BY dept_id.' },
        explanation: {
          en: 'SUM collapses numeric column values across rows sharing the same dept_id.',
          vi: 'SUM cộng dồn giá trị cột số trên các dòng có cùng dept_id.'
        }
      },
      {
        id: 'sql_ex_6_3',
        type: 'write_code',
        title: { en: 'Count Unique Products Sold by Customer', vi: 'Đếm Số Sản Phẩm Riêng Biệt Khách Đã Mua' },
        instruction: {
          en: 'Write a query selecting customer_name and COUNT(DISTINCT product) AS unique_products from orders GROUP BY customer_name.',
          vi: 'Viết truy vấn chọn customer_name và COUNT(DISTINCT product) AS unique_products từ bảng orders gom nhóm theo customer_name.'
        },
        starterCode: '-- Count distinct products per customer\n',
        solutionCode: 'SELECT customer_name, COUNT(DISTINCT product) AS unique_products FROM orders GROUP BY customer_name;',
        hint: { en: 'Use COUNT(DISTINCT product) AS unique_products GROUP BY customer_name;', vi: 'Sử dụng COUNT(DISTINCT product) AS unique_products GROUP BY customer_name;' },
        explanation: {
          en: 'COUNT(DISTINCT col) counts only unique values within each grouped partition.',
          vi: 'COUNT(DISTINCT col) chỉ đếm các giá trị duy nhất không trùng lặp trong từng nhóm.'
        }
      },
      {
        id: 'sql_ex_6_4',
        type: 'modify_example',
        title: { en: 'Multi-Level Grouping by City and Course', vi: 'Gom Nhóm Đa Cấp Theo Thành Phố và Khóa Học' },
        instruction: {
          en: 'Modify the query to group by both city AND course, selecting city, course, and COUNT(*) AS student_count.',
          vi: 'Sửa truy vấn để gom nhóm theo cả city VÀ course, chọn city, course và COUNT(*) AS student_count.'
        },
        starterCode: 'SELECT city, COUNT(*) AS student_count FROM students GROUP BY city;',
        solutionCode: 'SELECT city, course, COUNT(*) AS student_count FROM students GROUP BY city, course;',
        hint: { en: 'Add course to both SELECT and GROUP BY.', vi: 'Thêm course vào cả SELECT và GROUP BY.' },
        explanation: {
          en: 'Grouping by multiple columns partitions data by every distinct combination of those attributes.',
          vi: 'Gom nhóm nhiều cột sẽ phân tách dữ liệu theo từng tổ hợp giá trị riêng biệt của các thuộc tính đó.'
        }
      },
      {
        id: 'sql_ex_6_5',
        type: 'predict_output',
        title: { en: 'Predict AVG with NULL Values', vi: 'Dự Đoán Kết Quả AVG Khi Có Giá Trị NULL' },
        instruction: {
          en: 'If a column has values [10, 20, NULL, 30], what is the result of AVG(val)?',
          vi: 'Nếu một cột có các giá trị [10, 20, NULL, 30], kết quả của AVG(val) là bao nhiêu?'
        },
        starterCode: '-- Predict AVG with NULL\n',
        solutionCode: 'SELECT (10 + 20 + 30) / 3.0 AS avg_val;',
        options: ['20.0 (sum=60 divided by 3 non-nulls)', '15.0 (sum=60 divided by 4 total rows)', 'NULL', 'Error'],
        correctOptionIndex: 0,
        hint: { en: 'AVG ignores NULLs and divides by the count of non-NULL rows (3).', vi: 'AVG bỏ qua NULL và chia cho số dòng có giá trị khác NULL (3).' },
        explanation: { en: 'AVG ignores NULL, calculating (10 + 20 + 30) / 3 = 20.0.', vi: 'AVG bỏ qua NULL, tính (10 + 20 + 30) / 3 = 20.0.' }
      }
    ],
    challenge: {
      id: 'sql_ch_6',
      title: { en: 'Course Enrollment & Performance Summary Matrix', vi: 'Ma Trận Tổng Hợp Điểm Số & Ghi Danh Khóa Học' },
      description: {
        en: 'Write a SQL query that generates a performance summary for each course. For each course, retrieve the course name, total number of enrolled students as total_students, the average score rounded to 1 decimal place as avg_score, the lowest score as min_score, and the highest score as max_score. Order the results by avg_score DESC.',
        vi: 'Viết truy vấn SQL tạo báo cáo tổng hợp kết quả cho từng khóa học. Với mỗi khóa, lấy tên khóa course, tổng số học viên đăng ký total_students, điểm trung bình làm tròn 1 chữ số thập phân avg_score, điểm thấp nhất min_score và điểm cao nhất max_score. Sắp xếp kết quả theo avg_score DESC.'
      },
      requirements: [
        { en: 'Select course, COUNT(*) AS total_students', vi: 'Chọn course, COUNT(*) AS total_students' },
        { en: 'Calculate ROUND(AVG(score), 1) AS avg_score', vi: 'Tính ROUND(AVG(score), 1) AS avg_score' },
        { en: 'Calculate MIN(score) AS min_score and MAX(score) AS max_score', vi: 'Tính MIN(score) AS min_score và MAX(score) AS max_score' },
        { en: 'GROUP BY course and ORDER BY avg_score DESC', vi: 'Gom nhóm GROUP BY course và sắp xếp ORDER BY avg_score DESC' }
      ],
      starterCode: `-- Write your SQL query below
SELECT course
FROM students
GROUP BY ;`,
      solutionCode: `SELECT course, COUNT(*) AS total_students, ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score FROM students GROUP BY course ORDER BY avg_score DESC;`,
      hints: [{ en: 'Use COUNT(*), ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score GROUP BY course ORDER BY avg_score DESC.', vi: 'Dùng COUNT(*), ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score GROUP BY course ORDER BY avg_score DESC.' }],
      solutionExplanation: {
        en: 'Aggregates multiple metric dimensions across discrete course categories and ranks courses by average achievement.',
        vi: 'Tổng hợp nhiều chiều chỉ số trên từng danh mục khóa học và xếp hạng theo điểm trung bình.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_6_v1',
        title: { en: 'Course Enrollment & Performance Summary Matrix', vi: 'Ma Trận Tổng Hợp Điểm Số & Ghi Danh Khóa Học' },
        description: {
          en: 'Generate course summary: course, COUNT(*) AS total_students, ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score grouped by course, ordered by avg_score DESC.',
          vi: 'Tạo báo cáo khóa học: course, COUNT(*) AS total_students, ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score gom theo course, xếp theo avg_score DESC.'
        },
        requirements: [{ en: 'GROUP BY course ORDER BY avg_score DESC', vi: 'GROUP BY course ORDER BY avg_score DESC' }],
        starterCode: `SELECT course FROM students GROUP BY ;`,
        solutionCode: `SELECT course, COUNT(*) AS total_students, ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score FROM students GROUP BY course ORDER BY avg_score DESC;`,
        hints: [{ en: 'Add aggregate functions in SELECT.', vi: 'Thêm các hàm tổng hợp vào mệnh đề SELECT.' }],
        solutionExplanation: { en: 'Rolls up student grades by course offering.', vi: 'Tổng hợp điểm sinh viên theo từng khóa học.' }
      },
      {
        id: 'sql_ch_6_v2',
        title: { en: 'Department Payroll & Headcount Analytics', vi: 'Phân Tích Quỹ Lương & Nhân Sự Theo Phòng Ban' },
        description: {
          en: 'Retrieve dept_id, COUNT(*) AS total_employees, SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary from employees GROUP BY dept_id ORDER BY total_payroll DESC.',
          vi: 'Lấy dept_id, COUNT(*) AS total_employees, SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary từ employees GROUP BY dept_id ORDER BY total_payroll DESC.'
        },
        requirements: [
          { en: 'Select dept_id, COUNT(*), SUM(salary), ROUND(AVG(salary), 2)', vi: 'Chọn dept_id, COUNT(*), SUM(salary), ROUND(AVG(salary), 2)' },
          { en: 'GROUP BY dept_id ORDER BY total_payroll DESC', vi: 'GROUP BY dept_id ORDER BY total_payroll DESC' }
        ],
        starterCode: `SELECT dept_id FROM employees GROUP BY ;`,
        solutionCode: `SELECT dept_id, COUNT(*) AS total_employees, SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary FROM employees GROUP BY dept_id ORDER BY total_payroll DESC;`,
        hints: [{ en: 'SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary', vi: 'SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary' }],
        solutionExplanation: { en: 'Aggregates departmental payroll spending and organizational headcount.', vi: 'Tổng hợp chi tiêu tiền lương và số lượng nhân sự theo phòng ban.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_6_1',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: { en: 'What is the primary role of the GROUP BY clause in SQL?', vi: 'Vai trò chính của mệnh đề GROUP BY trong SQL là gì?' },
        options: [
          { en: 'Arranges identical data into groups so aggregate functions can compute summaries for each group', vi: 'Sắp xếp các dòng dữ liệu giống nhau thành từng nhóm để hàm tổng hợp tính toán chỉ số cho từng nhóm' },
          { en: 'Sorts query results in alphabetical order', vi: 'Sắp xếp kết quả truy vấn theo bảng chữ cái' },
          { en: 'Filters out individual rows before loading tables', vi: 'Lọc các dòng đơn lẻ trước khi nạp bảng' },
          { en: 'Combines columns from two distinct tables', vi: 'Kết hợp các cột từ hai bảng riêng biệt' }
        ],
        correctAnswers: [0],
        explanation: { en: 'GROUP BY partitions rows into summary buckets for aggregate calculations.', vi: 'GROUP BY phân chia các dòng dữ liệu thành các nhóm tóm tắt để tính toán hàm tổng hợp.' }
      },
      {
        id: 'sql_q_6_2',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: { en: 'What is the "Golden Rule" of SQL regarding SELECT and GROUP BY?', vi: '"Quy Tắc Vàng" của SQL liên quan đến SELECT và GROUP BY là gì?' },
        options: [
          { en: 'Every non-aggregate column in the SELECT list MUST be listed in the GROUP BY clause', vi: 'Mọi cột không nằm trong hàm tổng hợp ở SELECT BẮT BUỘC phải xuất hiện trong mệnh đề GROUP BY' },
          { en: 'GROUP BY must always come before WHERE', vi: 'GROUP BY luôn phải đứng trước WHERE' },
          { en: 'You can only use one aggregate function per query', vi: 'Bạn chỉ được dùng tối đa một hàm tổng hợp trong một truy vấn' },
          { en: 'GROUP BY cannot be used with ORDER BY', vi: 'GROUP BY không thể kết hợp với ORDER BY' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Any column in SELECT that is not aggregated must define a grouping boundary in GROUP BY.', vi: 'Bất kỳ cột nào trong SELECT không được bọc hàm tổng hợp đều phải là tiêu chí xác định nhóm trong GROUP BY.' }
      },
      {
        id: 'sql_q_6_3',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: { en: 'How does COUNT(column_name) differ from COUNT(*)?', vi: 'COUNT(tên_cột) khác với COUNT(*) như thế nào?' },
        options: [
          { en: 'COUNT(column_name) ignores NULL values in that column, whereas COUNT(*) counts all rows regardless of NULLs', vi: 'COUNT(tên_cột) bỏ qua các giá trị NULL trong cột đó, trong khi COUNT(*) đếm tất cả các dòng bất kể có NULL hay không' },
          { en: 'COUNT(*) only counts unique values', vi: 'COUNT(*) chỉ đếm các giá trị duy nhất' },
          { en: 'COUNT(column_name) is not valid SQL', vi: 'COUNT(tên_cột) không phải là cú pháp hợp lệ' },
          { en: 'There is no difference in behavior', vi: 'Hoàn toàn không có sự khác biệt nào' }
        ],
        correctAnswers: [0],
        explanation: { en: 'COUNT(*) tallies all records; COUNT(col) counts only non-null occurrences.', vi: 'COUNT(*) đếm toàn bộ bản ghi; COUNT(cột) chỉ đếm các ô có dữ liệu khác null.' }
      },
      {
        id: 'sql_q_6_4',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: { en: 'If a column contains values [10, NULL, 20], what does SUM(col) return?', vi: 'Nếu một cột chứa các giá trị [10, NULL, 20], hàm SUM(cột) trả về giá trị gì?' },
        options: [
          { en: '30 (NULL is ignored during summation)', vi: '30 (NULL bị tự động bỏ qua khi tính tổng)' },
          { en: 'NULL', vi: 'NULL' },
          { en: '0', vi: '0' },
          { en: 'Error: Cannot sum NULL values', vi: 'Lỗi: Không thể tính tổng cột chứa NULL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Aggregate functions ignore NULL values during calculation, computing 10 + 20 = 30.', vi: 'Các hàm tổng hợp bỏ qua giá trị NULL trong quá trình tính toán, cho kết quả 10 + 20 = 30.' }
      },
      {
        id: 'sql_q_6_5',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: { en: 'Which aggregate function finds the highest numerical or alphabetical value in a column?', vi: 'Hàm tổng hợp nào tìm giá trị số hoặc ký tự chữ cái lớn nhất trong một cột?' },
        options: [
          { en: 'MAX()', vi: 'MAX()' },
          { en: 'HIGH()', vi: 'HIGH()' },
          { en: 'TOP()', vi: 'TOP()' },
          { en: 'GREATEST()', vi: 'GREATEST()' }
        ],
        correctAnswers: [0],
        explanation: { en: 'MAX() returns the maximum scalar value within the group or table.', vi: 'MAX() trả về giá trị vô hướng lớn nhất trong nhóm hoặc toàn bảng.' }
      },
      {
        id: 'sql_q_6_6',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: { en: 'How to count the number of DISTINCT cities represented in the students table?', vi: 'Làm thế nào để đếm số lượng các thành phố KHÔNG TRÙNG LẶP trong bảng students?' },
        options: [
          { en: 'SELECT COUNT(DISTINCT city) FROM students;', vi: 'SELECT COUNT(DISTINCT city) FROM students;' },
          { en: 'SELECT DISTINCT COUNT(city) FROM students;', vi: 'SELECT DISTINCT COUNT(city) FROM students;' },
          { en: 'SELECT COUNT(city) DISTINCT FROM students;', vi: 'SELECT COUNT(city) DISTINCT FROM students;' },
          { en: 'SELECT UNIQUE_COUNT(city) FROM students;', vi: 'SELECT UNIQUE_COUNT(city) FROM students;' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Placing DISTINCT inside the COUNT argument evaluates uniqueness before counting.', vi: 'Đặt DISTINCT bên trong đối số của COUNT sẽ lọc các giá trị duy nhất trước khi đếm.' }
      },
      {
        id: 'sql_q_6_7',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'hard',
        question: { en: 'What happens in standard ANSI SQL when GROUP BY is performed on a column containing multiple NULL values?', vi: 'Điều gì xảy ra trong chuẩn ANSI SQL khi thực hiện GROUP BY trên một cột có chứa nhiều giá trị NULL?' },
        options: [
          { en: 'All rows with NULL are grouped together into a single summary group', vi: 'Tất cả các dòng có giá trị NULL được gom lại thành một nhóm tóm tắt duy nhất' },
          { en: 'Each NULL creates its own separate individual group', vi: 'Mỗi giá trị NULL tạo thành một nhóm riêng biệt' },
          { en: 'All NULL rows are discarded from the query result', vi: 'Tất cả các dòng chứa NULL bị loại bỏ khỏi kết quả' },
          { en: 'A runtime grouping exception is thrown', vi: 'Phát sinh lỗi ngoại lệ khi gom nhóm' }
        ],
        correctAnswers: [0],
        explanation: { en: 'For grouping purposes, SQL treats all NULL values as equal, collapsing them into a single NULL group.', vi: 'Khi gom nhóm, SQL coi tất cả các giá trị NULL là tương đương nhau và gộp chúng vào một nhóm NULL duy nhất.' }
      },
      {
        id: 'sql_q_6_8',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: { en: 'Which SQL clause is executed first: WHERE or GROUP BY?', vi: 'Mệnh đề SQL nào được thực thi trước: WHERE hay GROUP BY?' },
        options: [
          { en: 'WHERE executes first to filter rows, then GROUP BY groups the remaining rows', vi: 'WHERE thực thi trước để lọc dòng, sau đó GROUP BY mới gom nhóm các dòng còn lại' },
          { en: 'GROUP BY executes before WHERE', vi: 'GROUP BY thực thi trước WHERE' },
          { en: 'HAVING executes before WHERE', vi: 'HAVING thực thi trước WHERE' },
          { en: 'They execute in arbitrary order', vi: 'Chúng thực thi theo thứ tự ngẫu nhiên' }
        ],
        correctAnswers: [0],
        explanation: { en: 'WHERE filters raw rows prior to aggregation, reducing the workload for GROUP BY.', vi: 'WHERE lọc các dòng thô trước khi tổng hợp, giúp giảm khối lượng công việc cho GROUP BY.' }
      },
      {
        id: 'sql_q_6_9',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: { en: 'What is the return value of SUM(col) when a table has 0 rows matching the WHERE filter?', vi: 'Giá trị trả về của SUM(cột) là gì khi bảng có 0 dòng nào thỏa mãn bộ lọc WHERE?' },
        options: [
          { en: 'NULL', vi: 'NULL' },
          { en: '0', vi: '0' },
          { en: 'NaN', vi: 'NaN' },
          { en: 'Throws empty table exception', vi: 'Báo lỗi bảng rỗng' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Aggregating an empty set with SUM, AVG, MIN, or MAX returns NULL (COUNT returns 0).', vi: 'Tổng hợp một tập rỗng bằng SUM, AVG, MIN hoặc MAX sẽ trả về NULL (riêng COUNT trả về 0).' }
      },
      {
        id: 'sql_q_6_10',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: { en: 'In SQLite, which function is used to round a floating point average to 2 decimal places?', vi: 'Trong SQLite, hàm nào được dùng để làm tròn điểm trung bình số thực đến 2 chữ số thập phân?' },
        options: [
          { en: 'ROUND(AVG(score), 2)', vi: 'ROUND(AVG(score), 2)' },
          { en: 'TRUNC(AVG(score), 2)', vi: 'TRUNC(AVG(score), 2)' },
          { en: 'FORMAT_FLOAT(AVG(score), 2)', vi: 'FORMAT_FLOAT(AVG(score), 2)' },
          { en: 'PRECISION(AVG(score), 2)', vi: 'PRECISION(AVG(score), 2)' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ROUND(val, n) rounds val to n decimal digits.', vi: 'ROUND(val, n) làm tròn giá trị val đến n chữ số phần thập phân.' }
      },
      {
        id: 'sql_q_6_11',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'hard',
        question: { en: 'Given "SELECT dept_id, city, COUNT(*) FROM employees GROUP BY dept_id;", why does PostgreSQL reject this query?', vi: 'Cho câu lệnh "SELECT dept_id, city, COUNT(*) FROM employees GROUP BY dept_id;", tại sao PostgreSQL từ chối thực thi truy vấn này?' },
        options: [
          { en: 'Because "city" is projected in SELECT but missing from the GROUP BY clause and is unaggregated', vi: 'Vì "city" được chọn trong SELECT nhưng không có trong GROUP BY và chưa được tổng hợp' },
          { en: 'Because COUNT(*) is invalid with GROUP BY', vi: 'Vì COUNT(*) không hợp lệ khi dùng chung với GROUP BY' },
          { en: 'Because dept_id must be a string', vi: 'Vì dept_id bắt buộc phải là kiểu chuỗi' },
          { en: 'Because employees table requires aliases', vi: 'Vì bảng employees bắt buộc phải đặt bí danh' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Since city can have multiple values for a single dept_id, the database cannot deterministically pick a single city without an aggregate or grouping key.', vi: 'Vì một dept_id có thể có nhiều city khác nhau, CSDL không thể tự ý chọn một city duy nhất nếu nó không được gom nhóm hoặc tổng hợp.' }
      },
      {
        id: 'sql_q_6_12',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: { en: 'What does "COUNT(1)" do compared to "COUNT(*)" in modern relational query planners?', vi: '"COUNT(1)" hoạt động như thế nào so với "COUNT(*)" trong các trình tối ưu truy vấn hiện đại?' },
        options: [
          { en: 'They produce identical execution plans and performance', vi: 'Chúng tạo ra kế hoạch thực thi và hiệu năng hoàn toàn giống hệt nhau' },
          { en: 'COUNT(1) only counts the first row', vi: 'COUNT(1) chỉ đếm dòng đầu tiên' },
          { en: 'COUNT(*) is deprecated in SQL standard', vi: 'COUNT(*) đã bị loại bỏ trong chuẩn SQL' },
          { en: 'COUNT(1) ignores NULLs whereas COUNT(*) does not', vi: 'COUNT(1) bỏ qua NULL còn COUNT(*) thì không' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Modern query optimizers parse COUNT(1) and COUNT(*) identically as a table/partition row count.', vi: 'Trình tối ưu hóa truy vấn hiện đại coi COUNT(1) và COUNT(*) là tương đương nhau để đếm tổng số dòng.' }
      },
      {
        id: 'sql_q_6_13',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: { en: 'Can you group by a calculated expression such as "GROUP BY strftime(\'%Y\', created_at)"?', vi: 'Bạn có thể gom nhóm theo một biểu thức tính toán như "GROUP BY strftime(\'%Y\', created_at)" không?' },
        options: [
          { en: 'Yes, grouping expressions are fully supported in standard SQL', vi: 'Có, gom nhóm theo biểu thức được hỗ trợ đầy đủ trong chuẩn SQL' },
          { en: 'No, GROUP BY only supports raw database column names', vi: 'Không, GROUP BY chỉ hỗ trợ tên cột vật lý của bảng' },
          { en: 'Only if the expression is defined in a stored procedure', vi: 'Chỉ khi biểu thức được định nghĩa trong stored procedure' },
          { en: 'Only in MySQL', vi: 'Chỉ hỗ trợ trong MySQL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SQL allows arbitrary scalar expressions in GROUP BY to aggregate across derived values like year, month, or length.', vi: 'SQL cho phép dùng biểu thức vô hướng tùy ý trong GROUP BY để tổng hợp theo các giá trị phái sinh như năm, tháng hoặc độ dài chuỗi.' }
      },
      {
        id: 'sql_q_6_14',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'hard',
        question: { en: 'What is the mathematical result of AVG(val) on a column with values [NULL, NULL, NULL]?', vi: 'Kết quả toán học của AVG(cột) trên một cột chỉ chứa các giá trị [NULL, NULL, NULL] là gì?' },
        options: [
          { en: 'NULL (because there are 0 non-null values to average)', vi: 'NULL (vì có 0 giá trị khác null để tính trung bình)' },
          { en: '0.0', vi: '0.0' },
          { en: 'Division by zero error', vi: 'Lỗi chia cho số 0' },
          { en: 'NaN', vi: 'NaN' }
        ],
        correctAnswers: [0],
        explanation: { en: 'When all inputs to AVG are NULL, the function evaluates to NULL without raising an error.', vi: 'Khi tất cả đầu vào của AVG là NULL, hàm trả về kết quả là NULL mà không báo lỗi.' }
      },
      {
        id: 'sql_q_6_15',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: { en: 'Which keyword orders the grouped results based on their aggregated values?', vi: 'Từ khóa nào dùng để sắp xếp kết quả đã gom nhóm dựa trên giá trị đã tổng hợp?' },
        options: [
          { en: 'ORDER BY', vi: 'ORDER BY' },
          { en: 'SORT BY', vi: 'SORT BY' },
          { en: 'GROUP ORDER', vi: 'GROUP ORDER' },
          { en: 'ARRANGE', vi: 'ARRANGE' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ORDER BY can sort by aggregate expressions or their aliases (e.g. ORDER BY COUNT(*) DESC).', vi: 'ORDER BY có thể sắp xếp theo biểu thức tổng hợp hoặc bí danh của chúng (ví dụ: ORDER BY COUNT(*) DESC).' }
      },
      {
        id: 'sql_q_6_16',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'hard',
        question: { en: 'What is the SQL standard extension to GROUP BY that computes subtotals and a grand total in a single query?', vi: 'Phần mở rộng chuẩn SQL của GROUP BY dùng để tính tổng phụ (subtotal) và tổng toàn bộ (grand total) trong một câu lệnh là gì?' },
        options: [
          { en: 'GROUP BY ROLLUP(...) or GROUP BY CUBE(...)', vi: 'GROUP BY ROLLUP(...) hoặc GROUP BY CUBE(...)' },
          { en: 'GROUP BY TOTALS', vi: 'GROUP BY TOTALS' },
          { en: 'AGGREGATE ALL', vi: 'AGGREGATE ALL' },
          { en: 'SUBTOTAL BY', vi: 'SUBTOTAL BY' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ROLLUP generates hierarchical subtotal and grand total groupings across the specified dimensions.', vi: 'ROLLUP tạo các nhóm tổng phụ phân cấp và tổng toàn thể trên các chiều được chỉ định.' }
      }
    ]
  },

  // LESSON 7: Group Filtering: HAVING vs WHERE & Conditional Aggregation
  {
    id: 'sql_lesson_7',
    moduleId: 'sql_mod_2',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 7,
    topicId: 'sql_having_conditional_agg',
    title: {
      en: 'Group Filtering: HAVING vs WHERE & Conditional Aggregation',
      vi: 'Lọc Nhóm: HAVING vs WHERE & Tổng Hợp Có Điều Kiện'
    },
    summary: {
      en: 'Master post-aggregation group filtering with HAVING, contrast early WHERE row-filtering vs post-group evaluation, and build high-performance pivot analytics with conditional aggregation.',
      vi: 'Làm chủ bộ lọc sau tổng hợp HAVING, phân biệt thời điểm lọc dòng WHERE vs lọc nhóm HAVING và tạo báo cáo pivot phân tích với tổng hợp có điều kiện.'
    },
    estimatedMinutes: 20,
    learn: {
      introduction: {
        en: 'While WHERE filters individual atomic rows before grouping takes place, HAVING filters grouped summary buckets after aggregation is computed. In advanced reporting, combining aggregate functions with CASE WHEN enables single-pass pivot tables.',
        vi: 'Trong khi WHERE lọc từng dòng đơn lẻ trước khi gom nhóm diễn ra, HAVING lọc các nhóm dữ liệu đã tổng hợp sau khi gom nhóm xong. Trong các báo cáo nâng cao, kết hợp hàm tổng hợp với CASE WHEN cho phép tạo bảng pivot phân tích chỉ trong một lượt quét.'
      },
      conceptExplanation: {
        en: 'The execution timing distinction is fundamental: WHERE runs before GROUP BY and cannot reference aggregate functions. HAVING runs after GROUP BY and evaluates conditions against aggregated metric totals. Furthermore, Conditional Aggregation (e.g. SUM(CASE WHEN status = \'active\' THEN 1 ELSE 0 END)) aggregates subsets of rows within the same group simultaneously.',
        vi: 'Khác biệt về thời điểm thực thi là cốt lõi: WHERE chạy trước GROUP BY và không thể chứa hàm tổng hợp. HAVING chạy sau GROUP BY và lọc trên giá trị đã tổng hợp. Ngoài ra, Tổng Hợp Có Điều Kiện (ví dụ: SUM(CASE WHEN status = \'active\' THEN 1 ELSE 0 END)) cho phép tổng hợp các tập con khác nhau trong cùng một nhóm cùng lúc.'
      },
      syntax: `SELECT category,
       COUNT(*) AS total_items,
       AVG(price) AS avg_price,
       SUM(CASE WHEN in_stock = 1 THEN 1 ELSE 0 END) AS available_items,
       SUM(CASE WHEN in_stock = 0 THEN 1 ELSE 0 END) AS out_of_stock_items
FROM products
WHERE price > 0
GROUP BY category
HAVING COUNT(*) >= 5 AND AVG(price) > 50.0;`,
      examples: [
        {
          title: {
            en: '1. Filtering Large Departments with High Average Salaries',
            vi: '1. Lọc Các Phòng Ban Lớn Có Mức Lương Trung Bình Cao'
          },
          code: `SELECT dept_id,
       COUNT(*) AS employee_count,
       ROUND(AVG(salary), 2) AS avg_salary
FROM employees
WHERE salary IS NOT NULL
GROUP BY dept_id
HAVING COUNT(*) >= 2 AND AVG(salary) > 60000;`,
          language: 'sql',
          explanation: {
            en: 'Filters individual rows with WHERE (salary IS NOT NULL), groups by dept_id, and then filters aggregated groups with HAVING (at least 2 employees and avg salary > 60,000).',
            vi: 'Lọc các dòng đơn lẻ bằng WHERE (salary IS NOT NULL), gom nhóm theo dept_id và sau đó lọc các nhóm thỏa mãn HAVING (ít nhất 2 nhân viên và lương trung bình > 60.000).'
          }
        },
        {
          title: {
            en: '2. Conditional Aggregation: Student Pass/Fail Counts per Course',
            vi: '2. Tổng Hợp Có Điều Kiện: Đếm Học Viên Đỗ/Trượt Theo Từng Khóa Học'
          },
          code: `SELECT course,
       COUNT(*) AS total_students,
       SUM(CASE WHEN score >= 80 THEN 1 ELSE 0 END) AS honors_count,
       SUM(CASE WHEN score >= 50 AND score < 80 THEN 1 ELSE 0 END) AS pass_count,
       SUM(CASE WHEN score < 50 THEN 1 ELSE 0 END) AS fail_count
FROM students
GROUP BY course;`,
          language: 'sql',
          explanation: {
            en: 'Uses CASE expressions inside SUM() to pivot student grade distributions into distinct status columns in a single table scan.',
            vi: 'Sử dụng biểu thức CASE bên trong SUM() để xoay chuyển phân bổ điểm học viên thành các cột trạng thái riêng biệt chỉ với một lượt quét bảng.'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Placing raw row filters in HAVING instead of WHERE',
            vi: 'Đặt điều kiện lọc dòng đơn lẻ vào HAVING thay vì WHERE'
          },
          correction: {
            en: 'While syntactically valid in some engines, filtering raw columns in HAVING forces the engine to aggregate every row before discarding them, harming query performance. Always filter raw rows early with WHERE.',
            vi: 'Mặc dù một số hệ CSDL cho phép, nhưng lọc cột thô trong HAVING bắt CSDL phải gom nhóm toàn bộ dữ liệu rồi mới lọc bỏ, gây suy giảm hiệu năng nghiêm trọng. Luôn lọc dòng thô sớm bằng WHERE.'
          },
          code: `-- SLOW / ANTI-PATTERN:
SELECT course, AVG(score) FROM students GROUP BY course HAVING course = 'Python';
-- FAST / IDIOMATIC:
SELECT course, AVG(score) FROM students WHERE course = 'Python' GROUP BY course;`
        },
        {
          mistake: {
            en: 'Attempting to use aggregate functions in the WHERE clause',
            vi: 'Cố gắng sử dụng hàm tổng hợp trong mệnh đề WHERE'
          },
          correction: {
            en: 'WHERE executes before aggregates are calculated. You must use HAVING for aggregate conditions.',
            vi: 'WHERE thực thi trước khi các hàm tổng hợp được tính toán. Bạn bắt buộc phải dùng HAVING cho các điều kiện trên hàm tổng hợp.'
          },
          code: `-- FATAL ERROR: SELECT course FROM students WHERE AVG(score) > 80 GROUP BY course;
-- CORRECT:
SELECT course, AVG(score) FROM students GROUP BY course HAVING AVG(score) > 80;`
        }
      ],
      tips: [
        {
          en: 'In SQLite, COUNT(CASE WHEN condition THEN 1 END) works because COUNT ignores NULL when CASE has no ELSE branch.',
          vi: 'Trong SQLite, COUNT(CASE WHEN condition THEN 1 END) hoạt động tốt vì COUNT bỏ qua NULL khi CASE không có nhánh ELSE.'
        },
        {
          en: 'You can combine multiple criteria in HAVING using AND, OR, and NOT (e.g. HAVING COUNT(*) > 5 AND MAX(score) = 100).',
          vi: 'Bạn có thể kết hợp nhiều tiêu chí trong HAVING bằng AND, OR và NOT (ví dụ: HAVING COUNT(*) > 5 AND MAX(score) = 100).'
        }
      ],
      practiceStarterCode: `-- Find courses with more than 1 student and average score >= 80
SELECT course, COUNT(*) AS student_count, AVG(score) AS avg_score
FROM students
GROUP BY course
HAVING COUNT(*) > 1 AND AVG(score) >= 80;`,
      practice: {
        task: {
          en: 'Write a query to find all departments in employees with total payroll SUM(salary) > 100,000, selecting dept_id and SUM(salary) AS total_payroll.',
          vi: 'Viết truy vấn tìm tất cả phòng ban trong bảng employees có tổng quỹ lương SUM(salary) > 100.000, chọn dept_id và SUM(salary) AS total_payroll.'
        },
        starterCode: `-- Filter departments by total payroll using HAVING
SELECT dept_id FROM employees;`,
        solutionCode: `SELECT dept_id, SUM(salary) AS total_payroll FROM employees GROUP BY dept_id HAVING SUM(salary) > 100000;`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_7_1',
        type: 'fix_code',
        title: { en: 'Fix Misplaced Aggregate in WHERE Clause', vi: 'Sửa Lỗi Đặt Hàm Tổng Hợp Trong Mệnh Đề WHERE' },
        instruction: {
          en: 'Move the aggregate filter from WHERE to a HAVING clause.',
          vi: 'Chuyển điều kiện lọc hàm tổng hợp từ WHERE sang mệnh đề HAVING.'
        },
        starterCode: 'SELECT course, AVG(score) AS avg_score FROM students WHERE AVG(score) >= 80 GROUP BY course;',
        solutionCode: 'SELECT course, AVG(score) AS avg_score FROM students GROUP BY course HAVING AVG(score) >= 80;',
        hint: { en: 'Put GROUP BY course first, then HAVING AVG(score) >= 80;', vi: 'Đặt GROUP BY course trước, rồi đến HAVING AVG(score) >= 80;' },
        explanation: {
          en: 'Aggregate filters belong in the HAVING clause, which executes after GROUP BY.',
          vi: 'Điều kiện lọc trên hàm tổng hợp phải nằm ở mệnh đề HAVING, thực thi sau GROUP BY.'
        }
      },
      {
        id: 'sql_ex_7_2',
        type: 'complete_code',
        title: { en: 'Complete Conditional Aggregation for High Earners', vi: 'Hoàn Thiện Tổng Hợp Có Điều Kiện Cho Nhân Viên Lương Cao' },
        instruction: {
          en: 'Complete the query using SUM(CASE WHEN salary >= 70000 THEN 1 ELSE 0 END) aliased as high_earners.',
          vi: 'Hoàn thiện câu truy vấn dùng SUM(CASE WHEN salary >= 70000 THEN 1 ELSE 0 END) với bí danh high_earners.'
        },
        instruction: { en: 'Complete the CASE conditional aggregate.', vi: 'Hoàn thiện biểu thức tổng hợp có điều kiện CASE.' },
        starterCode: 'SELECT dept_id, SUM(CASE WHEN salary >= 70000 THEN 1  0 END) AS high_earners FROM employees GROUP BY dept_id;',
        solutionCode: 'SELECT dept_id, SUM(CASE WHEN salary >= 70000 THEN 1 ELSE 0 END) AS high_earners FROM employees GROUP BY dept_id;',
        hint: { en: 'Add ELSE between 1 and 0.', vi: 'Thêm ELSE vào giữa 1 và 0.' },
        explanation: {
          en: 'CASE WHEN condition THEN 1 ELSE 0 END evaluates to 1 for high earners and 0 otherwise, which SUM totals.',
          vi: 'Biểu thức CASE WHEN trả về 1 cho nhân viên lương cao và 0 cho trường hợp còn lại, sau đó SUM cộng dồn lại.'
        }
      },
      {
        id: 'sql_ex_7_3',
        type: 'write_code',
        title: { en: 'Filter Cities with High Average Scores', vi: 'Lọc Các Thành Phố Có Điểm Trung Bình Cao' },
        instruction: {
          en: 'Write a query selecting city, COUNT(*) AS count, and AVG(score) AS avg_score from students GROUP BY city HAVING AVG(score) > 80.',
          vi: 'Viết truy vấn chọn city, COUNT(*) AS count và AVG(score) AS avg_score từ bảng students gom theo city có HAVING AVG(score) > 80.'
        },
        starterCode: '-- Select city, count, avg_score with HAVING\n',
        solutionCode: 'SELECT city, COUNT(*) AS count, AVG(score) AS avg_score FROM students GROUP BY city HAVING AVG(score) > 80;',
        hint: { en: 'GROUP BY city HAVING AVG(score) > 80;', vi: 'GROUP BY city HAVING AVG(score) > 80;' },
        explanation: {
          en: 'HAVING filters the aggregated city groups based on the calculated average score.',
          vi: 'HAVING lọc các nhóm thành phố dựa trên điểm số trung bình đã tính toán.'
        }
      },
      {
        id: 'sql_ex_7_4',
        type: 'modify_example',
        title: { en: 'Combine WHERE and HAVING in Single Query', vi: 'Kết Hợp Cả WHERE và HAVING Trong Một Truy Vấn' },
        instruction: {
          en: 'Modify the query to only include students with score >= 60 (using WHERE) before grouping by course and filtering for courses with at least 2 students (using HAVING).',
          vi: 'Sửa truy vấn để chỉ lấy học viên có điểm >= 60 (dùng WHERE) trước khi gom nhóm theo course và lọc các khóa có từ 2 học viên trở lên (dùng HAVING).'
        },
        starterCode: 'SELECT course, COUNT(*) AS student_count FROM students GROUP BY course;',
        solutionCode: 'SELECT course, COUNT(*) AS student_count FROM students WHERE score >= 60 GROUP BY course HAVING COUNT(*) >= 2;',
        hint: { en: 'Add WHERE score >= 60 before GROUP BY, and HAVING COUNT(*) >= 2 after.', vi: 'Thêm WHERE score >= 60 trước GROUP BY và HAVING COUNT(*) >= 2 sau đó.' },
        explanation: {
          en: 'WHERE filters qualifying individual student records, then HAVING filters the aggregated course groups.',
          vi: 'WHERE lọc các bản ghi sinh viên hợp lệ trước, sau đó HAVING lọc các nhóm khóa học sau khi tổng hợp.'
        }
      },
      {
        id: 'sql_ex_7_5',
        type: 'predict_output',
        title: { en: 'Predict Outcome of Filtering Column in HAVING', vi: 'Dự Đoán Kết Quả Khi Lọc Cột Trong HAVING' },
        instruction: {
          en: 'What is the logical difference between WHERE salary > 50000 and HAVING salary > 50000 (when salary is unaggregated)?',
          vi: 'Khác biệt logic giữa WHERE salary > 50000 và HAVING salary > 50000 (khi salary không được tổng hợp) là gì?'
        },
        starterCode: '-- Predict WHERE vs HAVING\n',
        solutionCode: 'SELECT 1;',
        options: [
          'WHERE filters rows before grouping; unaggregated HAVING is invalid in strict SQL standards',
          'HAVING is faster than WHERE for row filtering',
          'They produce completely different mathematical sum calculations with identical execution plans',
          'WHERE only works on strings'
        ],
        correctOptionIndex: 0,
        hint: { en: 'Standard SQL rejects unaggregated column references in HAVING.', vi: 'Chuẩn SQL từ chối tham chiếu cột chưa tổng hợp trong HAVING.' },
        explanation: {
          en: 'Standard SQL strictly disallows non-aggregated column references in HAVING. Row filters must always be placed in WHERE.',
          vi: 'Chuẩn SQL nghiêm cấm tham chiếu cột chưa tổng hợp trong HAVING. Điều kiện lọc dòng luôn phải đặt trong WHERE.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_7',
      title: { en: 'Enterprise Department Metrics & Performance Gate', vi: 'Báo Cáo Chỉ Số & Cổng Đánh Giá Hiệu Suất Phòng Ban' },
      description: {
        en: 'Write a SQL query for the employees table that calculates: dept_id, the total number of employees as head_count, the average salary rounded to 2 decimal places as avg_salary, and the number of senior employees earning >= 75000 as senior_count. Only include departments that have a head_count of at least 2 AND an avg_salary >= 60000. Order the result by avg_salary DESC.',
        vi: 'Viết truy vấn SQL cho bảng employees để tính: dept_id, tổng số nhân viên head_count, lương trung bình làm tròn 2 chữ số thập phân avg_salary và số lượng nhân viên cấp cao có lương >= 75000 senior_count. Chỉ lấy các phòng ban có head_count từ 2 trở lên VÀ avg_salary >= 60000. Sắp xếp kết quả theo avg_salary DESC.'
      },
      requirements: [
        { en: 'Select dept_id, COUNT(*) AS head_count, ROUND(AVG(salary), 2) AS avg_salary', vi: 'Chọn dept_id, COUNT(*) AS head_count, ROUND(AVG(salary), 2) AS avg_salary' },
        { en: 'Calculate SUM(CASE WHEN salary >= 75000 THEN 1 ELSE 0 END) AS senior_count', vi: 'Tính SUM(CASE WHEN salary >= 75000 THEN 1 ELSE 0 END) AS senior_count' },
        { en: 'GROUP BY dept_id HAVING COUNT(*) >= 2 AND AVG(salary) >= 60000', vi: 'Gom nhóm GROUP BY dept_id HAVING COUNT(*) >= 2 AND AVG(salary) >= 60000' },
        { en: 'ORDER BY avg_salary DESC', vi: 'Sắp xếp ORDER BY avg_salary DESC' }
      ],
      starterCode: `-- Write your SQL query below
SELECT dept_id
FROM employees
GROUP BY dept_id
HAVING ;`,
      solutionCode: `SELECT dept_id, COUNT(*) AS head_count, ROUND(AVG(salary), 2) AS avg_salary, SUM(CASE WHEN salary >= 75000 THEN 1 ELSE 0 END) AS senior_count FROM employees GROUP BY dept_id HAVING COUNT(*) >= 2 AND AVG(salary) >= 60000 ORDER BY avg_salary DESC;`,
      hints: [{ en: 'Use COUNT(*) >= 2 AND AVG(salary) >= 60000 in HAVING.', vi: 'Dùng COUNT(*) >= 2 AND AVG(salary) >= 60000 trong HAVING.' }],
      solutionExplanation: {
        en: 'Combines grouping, aggregate metrics, conditional pivot calculations with CASE, and multi-criteria HAVING filtering.',
        vi: 'Kết hợp gom nhóm, các chỉ số tổng hợp, tính toán xoay chiều với CASE và lọc đa điều kiện bằng HAVING.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_7_v1',
        title: { en: 'Enterprise Department Metrics & Performance Gate', vi: 'Báo Cáo Chỉ Số & Cổng Đánh Giá Hiệu Suất Phòng Ban' },
        description: {
          en: 'Calculate dept_id, COUNT(*) AS head_count, ROUND(AVG(salary), 2) AS avg_salary, SUM(CASE WHEN salary >= 75000 THEN 1 ELSE 0 END) AS senior_count from employees GROUP BY dept_id HAVING COUNT(*) >= 2 AND AVG(salary) >= 60000 ORDER BY avg_salary DESC.',
          vi: 'Tính dept_id, COUNT(*) AS head_count, ROUND(AVG(salary), 2) AS avg_salary, SUM(CASE WHEN salary >= 75000 THEN 1 ELSE 0 END) AS senior_count từ employees GROUP BY dept_id HAVING COUNT(*) >= 2 AND AVG(salary) >= 60000 ORDER BY avg_salary DESC.'
        },
        requirements: [{ en: 'HAVING COUNT(*) >= 2 AND AVG(salary) >= 60000', vi: 'HAVING COUNT(*) >= 2 AND AVG(salary) >= 60000' }],
        starterCode: `SELECT dept_id FROM employees GROUP BY dept_id HAVING ;`,
        solutionCode: `SELECT dept_id, COUNT(*) AS head_count, ROUND(AVG(salary), 2) AS avg_salary, SUM(CASE WHEN salary >= 75000 THEN 1 ELSE 0 END) AS senior_count FROM employees GROUP BY dept_id HAVING COUNT(*) >= 2 AND AVG(salary) >= 60000 ORDER BY avg_salary DESC;`,
        hints: [{ en: 'Use conditional SUM with CASE.', vi: 'Dùng hàm SUM có điều kiện với CASE.' }],
        solutionExplanation: { en: 'Aggregates department payroll and headcount thresholds.', vi: 'Tổng hợp quỹ lương và ngưỡng số lượng nhân viên theo phòng ban.' }
      },
      {
        id: 'sql_ch_7_v2',
        title: { en: 'Course Quality Tier Analysis', vi: 'Phân Tích Chất Lượng Đào Tạo Khóa Học' },
        description: {
          en: 'Query students table for course, COUNT(*) AS total_students, ROUND(AVG(score), 2) AS avg_score, SUM(CASE WHEN score >= 90 THEN 1 ELSE 0 END) AS top_performers GROUP BY course HAVING COUNT(*) >= 2 AND AVG(score) >= 75 ORDER BY avg_score DESC.',
          vi: 'Truy vấn bảng students lấy course, COUNT(*) AS total_students, ROUND(AVG(score), 2) AS avg_score, SUM(CASE WHEN score >= 90 THEN 1 ELSE 0 END) AS top_performers GROUP BY course HAVING COUNT(*) >= 2 AND AVG(score) >= 75 ORDER BY avg_score DESC.'
        },
        requirements: [
          { en: 'Select course, COUNT(*), ROUND(AVG(score), 2), SUM(CASE WHEN score >= 90...)', vi: 'Chọn course, COUNT(*), ROUND(AVG(score), 2), SUM(CASE WHEN score >= 90...)' },
          { en: 'HAVING COUNT(*) >= 2 AND AVG(score) >= 75 ORDER BY avg_score DESC', vi: 'HAVING COUNT(*) >= 2 AND AVG(score) >= 75 ORDER BY avg_score DESC' }
        ],
        starterCode: `SELECT course FROM students GROUP BY course HAVING ;`,
        solutionCode: `SELECT course, COUNT(*) AS total_students, ROUND(AVG(score), 2) AS avg_score, SUM(CASE WHEN score >= 90 THEN 1 ELSE 0 END) AS top_performers FROM students GROUP BY course HAVING COUNT(*) >= 2 AND AVG(score) >= 75 ORDER BY avg_score DESC;`,
        hints: [{ en: 'Use HAVING COUNT(*) >= 2 AND AVG(score) >= 75', vi: 'Dùng HAVING COUNT(*) >= 2 AND AVG(score) >= 75' }],
        solutionExplanation: { en: 'Filters courses with high enrollment and high grade achievement.', vi: 'Lọc các khóa học có lượng đăng ký lớn và điểm học tập cao.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_7_1',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'easy',
        question: { en: 'What is the primary purpose of the HAVING clause in SQL?', vi: 'Mục đích chính của mệnh đề HAVING trong SQL là gì?' },
        options: [
          { en: 'To filter grouped rows based on aggregate function results', vi: 'Để lọc các nhóm dữ liệu dựa trên kết quả của hàm tổng hợp' },
          { en: 'To sort query results before grouping', vi: 'Để sắp xếp kết quả truy vấn trước khi gom nhóm' },
          { en: 'To join two tables together', vi: 'Để kết nối hai bảng lại với nhau' },
          { en: 'To replace WHERE for all string comparisons', vi: 'Để thay thế WHERE cho mọi phép so sánh chuỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'HAVING is the post-aggregation filter for groups in SQL.', vi: 'HAVING là bộ lọc sau tổng hợp dành riêng cho các nhóm trong SQL.' }
      },
      {
        id: 'sql_q_7_2',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'medium',
        question: { en: 'Why does the query "SELECT dept_id FROM employees WHERE COUNT(*) > 5 GROUP BY dept_id;" produce an error?', vi: 'Tại sao câu lệnh "SELECT dept_id FROM employees WHERE COUNT(*) > 5 GROUP BY dept_id;" lại báo lỗi?' },
        options: [
          { en: 'Because WHERE executes before GROUP BY and cannot evaluate aggregate functions', vi: 'Vì WHERE thực thi trước GROUP BY nên không thể đánh giá các hàm tổng hợp' },
          { en: 'Because employees table does not support COUNT', vi: 'Vì bảng employees không hỗ trợ hàm COUNT' },
          { en: 'Because dept_id must be in the WHERE clause', vi: 'Vì dept_id bắt buộc phải có trong mệnh đề WHERE' },
          { en: 'Because 5 is not a valid integer literal', vi: 'Vì 5 không phải là số nguyên hợp lệ' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Aggregates can only be evaluated after grouping, so aggregate conditions must be in HAVING.', vi: 'Các hàm tổng hợp chỉ được tính sau khi gom nhóm, vì vậy điều kiện tổng hợp bắt buộc phải đặt trong HAVING.' }
      },
      {
        id: 'sql_q_7_3',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'medium',
        question: { en: 'What is "Conditional Aggregation" in SQL?', vi: '"Tổng Hợp Có Điều Kiện" (Conditional Aggregation) trong SQL là gì?' },
        options: [
          { en: 'Nesting a CASE WHEN expression inside an aggregate function like SUM(CASE WHEN ...)', vi: 'Lồng biểu thức CASE WHEN vào bên trong hàm tổng hợp như SUM(CASE WHEN ...)' },
          { en: 'Using WHERE and HAVING in the same query', vi: 'Dùng cả WHERE và HAVING trong cùng một truy vấn' },
          { en: 'Grouping by a boolean column', vi: 'Gom nhóm theo một cột kiểu boolean' },
          { en: 'Applying ORDER BY conditionally', vi: 'Áp dụng ORDER BY theo điều kiện' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Conditional aggregation wraps CASE expressions inside aggregates (SUM, COUNT) to tally specific subsets in one pass.', vi: 'Tổng hợp có điều kiện bọc biểu thức CASE trong hàm tổng hợp để tính toán các tập con cụ thể trong 1 lượt duyệt.' }
      },
      {
        id: 'sql_q_7_4',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'easy',
        question: { en: 'Which clause executes first in the logical query lifecycle: WHERE, GROUP BY, or HAVING?', vi: 'Mệnh đề nào thực thi đầu tiên trong vòng đời logic của truy vấn: WHERE, GROUP BY hay HAVING?' },
        options: [
          { en: 'WHERE -> GROUP BY -> HAVING', vi: 'WHERE -> GROUP BY -> HAVING' },
          { en: 'GROUP BY -> WHERE -> HAVING', vi: 'GROUP BY -> WHERE -> HAVING' },
          { en: 'HAVING -> WHERE -> GROUP BY', vi: 'HAVING -> WHERE -> GROUP BY' },
          { en: 'WHERE -> HAVING -> GROUP BY', vi: 'WHERE -> HAVING -> GROUP BY' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SQL filters raw rows (WHERE), forms groups (GROUP BY), and filters groups (HAVING).', vi: 'SQL lọc dòng thô (WHERE), tạo nhóm (GROUP BY) rồi lọc các nhóm (HAVING).' }
      },
      {
        id: 'sql_q_7_5',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'hard',
        question: { en: 'What does "COUNT(CASE WHEN score >= 90 THEN 1 END)" do if a row has score = 75 and no ELSE branch is specified?', vi: '"COUNT(CASE WHEN score >= 90 THEN 1 END)" làm gì nếu một dòng có score = 75 và không có nhánh ELSE?' },
        options: [
          { en: 'CASE returns NULL, and COUNT ignores NULL, so the row is not counted', vi: 'CASE trả về NULL, và COUNT bỏ qua NULL nên dòng đó không được đếm' },
          { en: 'It counts the row as 0', vi: 'Nó đếm dòng đó là 0' },
          { en: 'It throws a NULL pointer exception', vi: 'Nó báo lỗi con trỏ NULL' },
          { en: 'It terminates query execution', vi: 'Nó dừng thực thi truy vấn' }
        ],
        correctAnswers: [0],
        explanation: { en: 'When no ELSE is provided, CASE defaults to NULL. COUNT(NULL) is ignored by aggregate counting.', vi: 'Khi không có ELSE, CASE mặc định trả về NULL. COUNT bỏ qua NULL nên dòng đó không bị tăng biến đếm.' }
      },
      {
        id: 'sql_q_7_6',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'medium',
        question: { en: 'Can a query have a HAVING clause WITHOUT a GROUP BY clause?', vi: 'Một truy vấn có thể có mệnh đề HAVING mà KHÔNG CÓ GROUP BY không?' },
        options: [
          { en: 'Yes, the entire table is treated as a single implicit group', vi: 'Có, toàn bộ bảng được coi như một nhóm ngầm định duy nhất' },
          { en: 'No, HAVING is strictly invalid without GROUP BY', vi: 'Không, HAVING hoàn toàn không hợp lệ nếu thiếu GROUP BY' },
          { en: 'Only if the table has fewer than 10 rows', vi: 'Chỉ khi bảng có ít hơn 10 dòng' },
          { en: 'Only in MySQL', vi: 'Chỉ hỗ trợ trong MySQL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'In standard SQL, HAVING without GROUP BY treats the whole table as one single group.', vi: 'Trong chuẩn SQL, HAVING không có GROUP BY sẽ xem toàn bộ bảng là một nhóm duy nhất.' }
      },
      {
        id: 'sql_q_7_7',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'easy',
        question: { en: 'Which operator combines multiple conditions in a HAVING clause (e.g. COUNT(*) > 2 ... AVG(score) > 80)?', vi: 'Toán tử nào kết hợp nhiều điều kiện trong mệnh đề HAVING (ví dụ: COUNT(*) > 2 ... AVG(score) > 80)?' },
        options: [
          { en: 'AND / OR', vi: 'AND / OR' },
          { en: 'WITH', vi: 'WITH' },
          { en: 'THEN', vi: 'THEN' },
          { en: 'PLUS', vi: 'PLUS' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Boolean operators AND, OR, NOT are used in HAVING clauses just like in WHERE.', vi: 'Các toán tử logic AND, OR, NOT được dùng trong HAVING tương tự như trong WHERE.' }
      },
      {
        id: 'sql_q_7_8',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'hard',
        question: { en: 'Why is filtering on raw row values in WHERE preferred over doing it in HAVING?', vi: 'Tại sao lọc giá trị dòng thô trong WHERE lại tối ưu hơn làm trong HAVING?' },
        options: [
          { en: 'WHERE reduces row volume before aggregation, saving memory and CPU; indexes can also be used', vi: 'WHERE giảm số lượng dòng trước khi gom nhóm, tiết kiệm RAM/CPU và có thể tận dụng chỉ mục Index' },
          { en: 'HAVING cannot filter strings', vi: 'HAVING không lọc được kiểu chuỗi' },
          { en: 'WHERE changes the table schema', vi: 'WHERE thay đổi cấu trúc bảng' },
          { en: 'There is no difference in execution speed', vi: 'Không có sự khác biệt nào về tốc độ' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Early filtering with WHERE reduces the dataset size prior to sorting/hashing in GROUP BY and leverages indexes.', vi: 'Lọc sớm với WHERE làm giảm kích thước dữ liệu trước khi gom nhóm và tận dụng được chỉ mục Index.' }
      },
      {
        id: 'sql_q_7_9',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'medium',
        question: { en: 'How do you calculate the percentage of passing students (score >= 50) per course using conditional aggregation?', vi: 'Làm thế nào để tính tỷ lệ phần trăm học viên đỗ (score >= 50) theo từng khóa học bằng conditional aggregation?' },
        options: [
          { en: 'ROUND(100.0 * SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) / COUNT(*), 2)', vi: 'ROUND(100.0 * SUM(CASE WHEN score >= 50 THEN 1 ELSE 0 END) / COUNT(*), 2)' },
          { en: 'PERCENT(score >= 50)', vi: 'PERCENT(score >= 50)' },
          { en: 'AVG(score) * 100', vi: 'AVG(score) * 100' },
          { en: 'COUNT(IF score >= 50)', vi: 'COUNT(IF score >= 50)' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Summing passing indicators (1/0) and dividing by total count computes the exact ratio.', vi: 'Cộng dồn cờ đỗ (1/0) rồi chia cho tổng số học viên cho ra tỷ lệ phần trăm chuẩn xác.' }
      },
      {
        id: 'sql_q_7_10',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'easy',
        question: { en: 'Can HAVING reference column aliases defined in the SELECT clause in SQLite/MySQL?', vi: 'Mệnh đề HAVING có thể tham chiếu bí danh cột được định nghĩa trong SELECT ở SQLite/MySQL không?' },
        options: [
          { en: 'Yes, SQLite and MySQL allow aliases in HAVING, though ANSI SQL strictly requires the full expression', vi: 'Có, SQLite và MySQL cho phép dùng bí danh trong HAVING, dù chuẩn ANSI SQL yêu cầu viết đầy đủ biểu thức' },
          { en: 'No, never allowed in any database engine', vi: 'Không bao giờ được phép trong bất kỳ CSDL nào' },
          { en: 'Only for integer columns', vi: 'Chỉ dùng được cho cột số nguyên' },
          { en: 'Only in subqueries', vi: 'Chỉ dùng được trong truy vấn con' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SQLite and MySQL support aliases in HAVING as a convenience extension.', vi: 'SQLite và MySQL hỗ trợ bí danh cột trong HAVING như một tiện ích mở rộng.' }
      },
      {
        id: 'sql_q_7_11',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'hard',
        question: { en: 'What is the result of "HAVING MIN(score) > 60" when a group has scores [65, 80, 95]?', vi: 'Kết quả của "HAVING MIN(score) > 60" là gì khi một nhóm có các điểm số [65, 80, 95]?' },
        options: [
          { en: 'TRUE, the group is included because the minimum (65) is strictly greater than 60', vi: 'TRUE, nhóm này được giữ lại vì điểm nhỏ nhất (65) lớn hơn 60' },
          { en: 'FALSE, because 95 is too high', vi: 'FALSE, vì 95 quá cao' },
          { en: 'Error', vi: 'Lỗi' },
          { en: 'NULL', vi: 'NULL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'MIN(score) is 65, which satisfies 65 > 60, so the group passes the filter.', vi: 'MIN(score) là 65, thỏa mãn 65 > 60, nên nhóm được giữ lại trong kết quả.' }
      },
      {
        id: 'sql_q_7_12',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'medium',
        question: { en: 'What happens if every group in the dataset fails the HAVING condition?', vi: 'Điều gì xảy ra nếu tất cả các nhóm trong tập dữ liệu đều không thỏa mãn điều kiện HAVING?' },
        options: [
          { en: 'The query returns 0 rows (an empty result set) with headers intact', vi: 'Truy vấn trả về 0 dòng (tập kết quả rỗng) nhưng vẫn giữ nguyên tiêu đề các cột' },
          { en: 'The database throws an exception', vi: 'CSDL phát sinh ngoại lệ' },
          { en: 'All original unfiltered rows are returned', vi: 'Tất cả các dòng ban đầu chưa lọc được trả về' },
          { en: 'The query hangs indefinitely', vi: 'Truy vấn bị treo vô tận' }
        ],
        correctAnswers: [0],
        explanation: { en: 'HAVING filters out non-matching groups; if none qualify, an empty result set is produced.', vi: 'HAVING loại bỏ các nhóm không thỏa mãn; nếu không có nhóm nào đạt thì kết quả trả về 0 dòng.' }
      },
      {
        id: 'sql_q_7_13',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'medium',
        question: { en: 'Which conditional aggregation pattern computes the total sales amount ONLY for completed transactions?', vi: 'Mẫu conditional aggregation nào tính tổng doanh thu CHỈ CHO các giao dịch đã hoàn thành (status = \'completed\')?' },
        options: [
          { en: 'SUM(CASE WHEN status = \'completed\' THEN amount ELSE 0 END)', vi: 'SUM(CASE WHEN status = \'completed\' THEN amount ELSE 0 END)' },
          { en: 'SUM(amount) WHERE status = \'completed\'', vi: 'SUM(amount) WHERE status = \'completed\'' },
          { en: 'COUNT(CASE WHEN status = \'completed\' THEN amount END)', vi: 'COUNT(CASE WHEN status = \'completed\' THEN amount END)' },
          { en: 'TOTAL(amount, status = \'completed\')', vi: 'TOTAL(amount, status = \'completed\')' }
        ],
        correctAnswers: [0],
        explanation: { en: 'SUM over CASE returning amount for completed and 0 otherwise sums only completed revenue.', vi: 'SUM trên CASE trả về amount khi completed và 0 cho trường hợp khác sẽ chỉ cộng doanh thu thành công.' }
      },
      {
        id: 'sql_q_7_14',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'hard',
        question: { en: 'In PostgreSQL, what native SQL:2003 clause is supported as an alternative to SUM(CASE WHEN ...)?', vi: 'Trong PostgreSQL, mệnh đề chuẩn SQL:2003 nào được hỗ trợ như một phương án thay thế cho SUM(CASE WHEN ...)?' },
        options: [
          { en: 'SUM(amount) FILTER (WHERE status = \'completed\')', vi: 'SUM(amount) FILTER (WHERE status = \'completed\')' },
          { en: 'SUM(amount) IF (status = \'completed\')', vi: 'SUM(amount) IF (status = \'completed\')' },
          { en: 'SUM_WHERE(amount, status = \'completed\')', vi: 'SUM_WHERE(amount, status = \'completed\')' },
          { en: 'AGGREGATE(amount, \'completed\')', vi: 'AGGREGATE(amount, \'completed\')' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The standard FILTER (WHERE ...) clause is the modern ANSI alternative to CASE inside aggregates.', vi: 'Mệnh đề FILTER (WHERE ...) là cú pháp ANSI hiện đại thay thế cho CASE bên trong hàm tổng hợp.' }
      },
      {
        id: 'sql_q_7_15',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'easy',
        question: { en: 'Where does the HAVING clause sit relative to ORDER BY in a SQL statement?', vi: 'Mệnh đề HAVING đứng ở vị trí nào so với ORDER BY trong câu lệnh SQL?' },
        options: [
          { en: 'HAVING comes immediately before ORDER BY', vi: 'HAVING đứng ngay trước ORDER BY' },
          { en: 'ORDER BY comes before HAVING', vi: 'ORDER BY đứng trước HAVING' },
          { en: 'HAVING comes after LIMIT', vi: 'HAVING đứng sau LIMIT' },
          { en: 'ORDER BY cannot be used with HAVING', vi: 'ORDER BY không thể dùng chung với HAVING' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The standard clause ordering is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.', vi: 'Thứ tự chuẩn là FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.' }
      },
      {
        id: 'sql_q_7_16',
        type: 'single_choice',
        topicId: 'sql_having_conditional_agg',
        difficulty: 'hard',
        question: { en: 'Can HAVING evaluate an aggregate that is NOT listed in the SELECT clause (e.g. SELECT course FROM students GROUP BY course HAVING MAX(score) > 90)?', vi: 'Mệnh đề HAVING có thể đánh giá một hàm tổng hợp KHÔNG xuất hiện trong SELECT không (ví dụ: SELECT course FROM students GROUP BY course HAVING MAX(score) > 90)?' },
        options: [
          { en: 'Yes, HAVING can evaluate any valid aggregate expression regardless of whether it is projected in SELECT', vi: 'Có, HAVING có thể đánh giá bất kỳ hàm tổng hợp hợp lệ nào bất kể nó có được chọn trong SELECT hay không' },
          { en: 'No, every aggregate in HAVING must be projected in SELECT', vi: 'Không, mọi hàm tổng hợp trong HAVING đều bắt buộc phải xuất hiện trong SELECT' },
          { en: 'Only if the table has a primary key', vi: 'Chỉ khi bảng có khóa chính' },
          { en: 'Only for COUNT(*)', vi: 'Chỉ dùng được cho COUNT(*)' }
        ],
        correctAnswers: [0],
        explanation: { en: 'HAVING filters during aggregation processing, so aggregates evaluated in HAVING do not need to be in SELECT.', vi: 'HAVING lọc trong quá trình xử lý tổng hợp nên các hàm trong HAVING không nhất thiết phải xuất hiện trong SELECT.' }
      }
    ]
  }
];

// We will append Lessons 8, 9, 10 to tier2Lessons and write to src/data/sql/sqlLessonsTier2.ts
