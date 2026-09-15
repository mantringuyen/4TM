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
        en: 'The standard SQL aggregate functions are COUNT(*), COUNT(col), SUM(col), AVG(col), MIN(col), and MAX(col). Crucially, all aggregates except COUNT(*) silently skip NULL values. When using GROUP BY, the Golden Rule of SQL states: Every non-aggregate column listed in the SELECT clause MUST appear in the GROUP BY clause. Projecting an unaggregated, ungrouped column violates relational determinism (and causes fatal errors in standard ANSI SQL / strict engines).',
        vi: 'Các hàm tổng hợp chuẩn trong SQL gồm COUNT(*), COUNT(cột), SUM(cột), AVG(cột), MIN(cột) và MAX(cột). Đặc biệt, mọi hàm tổng hợp trừ COUNT(*) đều tự động bỏ qua giá trị NULL. Khi sử dụng GROUP BY, Quy Tắc Vàng của SQL là: Mọi cột không nằm trong hàm tổng hợp ở mệnh đề SELECT BẮT BUỘC phải có mặt trong mệnh đề GROUP BY. Việc truy vấn một cột chưa gom nhóm sẽ vi phạm tính xác định quan hệ (và gây lỗi nghiêm trọng trong các hệ thống chuẩn ANSI SQL).'
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
            en: 'In PostgreSQL and ANSI SQL, selecting an ungrouped column causes an error. In legacy MySQL/SQLite it returns an arbitrary row value. Always aggregate or group all projected columns.',
            vi: 'Trong PostgreSQL và chuẩn ANSI SQL, chọn cột chưa gom nhóm sẽ báo lỗi ngay. Trong SQLite cũ nó sẽ lấy giá trị ngẫu nhiên. Luôn gom nhóm hoặc bọc trong hàm tổng hợp mọi cột được chọn.'
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
        title: {
          en: 'Fix Ungrouped Column Projection Error',
          vi: 'Sửa Lỗi Chiếu Cột Chưa Được Gom Nhóm'
        },
        instruction: {
          en: 'Fix the query by removing the ungrouped "name" column so that the query cleanly groups by course.',
          vi: 'Sửa truy vấn bằng cách loại bỏ cột "name" chưa gom nhóm để câu lệnh gom nhóm chuẩn xác theo course.'
        },
        starterCode: 'SELECT name, course, AVG(score) AS avg_score FROM students GROUP BY course;',
        solutionCode: 'SELECT course, AVG(score) AS avg_score FROM students GROUP BY course;',
        hint: {
          en: 'Remove "name, " from the SELECT clause.',
          vi: 'Xóa "name, " khỏi mệnh đề SELECT.'
        },
        explanation: {
          en: 'All columns in SELECT must be either part of the GROUP BY clause or enclosed in an aggregate function.',
          vi: 'Tất cả các cột trong SELECT bắt buộc phải nằm trong GROUP BY hoặc được bọc trong hàm tổng hợp.'
        }
      },
      {
        id: 'sql_ex_6_2',
        type: 'complete_code',
        title: {
          en: 'Calculate Total Payroll per Department',
          vi: 'Tính Tổng Quỹ Lương Theo Từng Phòng Ban'
        },
        instruction: {
          en: 'Complete the query to calculate SUM(salary) aliased as total_payroll grouped by dept_id.',
          vi: 'Hoàn thiện câu lệnh để tính SUM(salary) với bí danh total_payroll gom nhóm theo dept_id.'
        },
        starterCode: 'SELECT dept_id, (salary) AS total_payroll FROM employees GROUP BY ;',
        solutionCode: 'SELECT dept_id, SUM(salary) AS total_payroll FROM employees GROUP BY dept_id;',
        hint: {
          en: 'Use SUM(salary) and GROUP BY dept_id.',
          vi: 'Dùng SUM(salary) và GROUP BY dept_id.'
        },
        explanation: {
          en: 'SUM collapses numeric column values across rows sharing the same dept_id.',
          vi: 'SUM cộng dồn giá trị cột số trên các dòng có cùng dept_id.'
        }
      },
      {
        id: 'sql_ex_6_3',
        type: 'write_code',
        title: {
          en: 'Count Unique Products Sold by Customer',
          vi: 'Đếm Số Sản Phẩm Riêng Biệt Khách Đã Mua'
        },
        instruction: {
          en: 'Write a query selecting customer_name and COUNT(DISTINCT product) AS unique_products from orders GROUP BY customer_name.',
          vi: 'Viết truy vấn chọn customer_name và COUNT(DISTINCT product) AS unique_products từ bảng orders gom nhóm theo customer_name.'
        },
        starterCode: '-- Count distinct products per customer\n',
        solutionCode: 'SELECT customer_name, COUNT(DISTINCT product) AS unique_products FROM orders GROUP BY customer_name;',
        hint: {
          en: 'Use COUNT(DISTINCT product) AS unique_products GROUP BY customer_name;',
          vi: 'Sử dụng COUNT(DISTINCT product) AS unique_products GROUP BY customer_name;'
        },
        explanation: {
          en: 'COUNT(DISTINCT col) counts only unique values within each grouped partition.',
          vi: 'COUNT(DISTINCT col) chỉ đếm các giá trị duy nhất không trùng lặp trong từng nhóm.'
        }
      },
      {
        id: 'sql_ex_6_4',
        type: 'modify_example',
        title: {
          en: 'Multi-Level Grouping by City and Course',
          vi: 'Gom Nhóm Đa Cấp Theo Thành Phố và Khóa Học'
        },
        instruction: {
          en: 'Modify the query to group by both city AND course, selecting city, course, and COUNT(*) AS student_count.',
          vi: 'Sửa truy vấn để gom nhóm theo cả city VÀ course, chọn city, course và COUNT(*) AS student_count.'
        },
        starterCode: 'SELECT city, COUNT(*) AS student_count FROM students GROUP BY city;',
        solutionCode: 'SELECT city, course, COUNT(*) AS student_count FROM students GROUP BY city, course;',
        hint: {
          en: 'Add course to both SELECT and GROUP BY.',
          vi: 'Thêm course vào cả SELECT và GROUP BY.'
        },
        explanation: {
          en: 'Grouping by multiple columns partitions data by every distinct combination of those attributes.',
          vi: 'Gom nhóm nhiều cột sẽ phân tách dữ liệu theo từng tổ hợp giá trị riêng biệt của các thuộc tính đó.'
        }
      },
      {
        id: 'sql_ex_6_5',
        type: 'predict_output',
        title: {
          en: 'Predict AVG with NULL Values',
          vi: 'Dự Đoán Kết Quả AVG Khi Có Giá Trị NULL'
        },
        instruction: {
          en: 'If a column has values [10, 20, NULL, 30], what is the result of AVG(val)?',
          vi: 'Nếu một cột có các giá trị [10, 20, NULL, 30], kết quả của AVG(val) là bao nhiêu?'
        },
        starterCode: '-- Predict AVG with NULL\n',
        solutionCode: 'SELECT (10 + 20 + 30) / 3.0 AS avg_val;',
        options: ['20.0 (sum=60 divided by 3 non-nulls)', '15.0 (sum=60 divided by 4 total rows)', 'NULL', 'Error'],
        correctOptionIndex: 0,
        hint: {
          en: 'AVG ignores NULLs and divides by the count of non-NULL rows (3).',
          vi: 'AVG bỏ qua NULL và chia cho số dòng có giá trị khác NULL (3).'
        },
        explanation: {
          en: 'AVG ignores NULL, calculating (10 + 20 + 30) / 3 = 20.0.',
          vi: 'AVG bỏ qua NULL, tính (10 + 20 + 30) / 3 = 20.0.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_6',
      title: {
        en: 'Course Enrollment & Performance Summary Matrix',
        vi: 'Ma Trận Tổng Hợp Điểm Số & Ghi Danh Khóa Học'
      },
      description: {
        en: 'Write a SQL query that generates a performance summary for each course. For each course, retrieve the course name, total number of enrolled students as total_students, the average score rounded to 1 decimal place as avg_score, the lowest score as min_score, and the highest score as max_score. Order the results by avg_score DESC.',
        vi: 'Viết truy vấn SQL tạo báo cáo tổng hợp kết quả cho từng khóa học. Với mỗi khóa, lấy tên khóa course, tổng số học viên đăng ký total_students, điểm trung bình làm tròn 1 chữ số thập phân avg_score, điểm thấp nhất min_score và điểm cao nhất max_score. Sắp xếp kết quả theo avg_score DESC.'
      },
      requirements: [
        {
          en: 'Select course, COUNT(*) AS total_students',
          vi: 'Chọn course, COUNT(*) AS total_students'
        },
        {
          en: 'Calculate ROUND(AVG(score), 1) AS avg_score',
          vi: 'Tính ROUND(AVG(score), 1) AS avg_score'
        },
        {
          en: 'Calculate MIN(score) AS min_score and MAX(score) AS max_score',
          vi: 'Tính MIN(score) AS min_score và MAX(score) AS max_score'
        },
        {
          en: 'GROUP BY course and ORDER BY avg_score DESC',
          vi: 'Gom nhóm GROUP BY course và sắp xếp ORDER BY avg_score DESC'
        }
      ],
      starterCode: `-- Write your SQL query below
SELECT course
FROM students
GROUP BY ;`,
      solutionCode: `SELECT course, COUNT(*) AS total_students, ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score FROM students GROUP BY course ORDER BY avg_score DESC;`,
      hints: [
        {
          en: 'Use COUNT(*), ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score GROUP BY course ORDER BY avg_score DESC.',
          vi: 'Dùng COUNT(*), ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score GROUP BY course ORDER BY avg_score DESC.'
        }
      ],
      solutionExplanation: {
        en: 'Aggregates multiple metric dimensions across discrete course categories and ranks courses by average achievement.',
        vi: 'Tổng hợp nhiều chiều chỉ số trên từng danh mục khóa học và xếp hạng theo điểm trung bình.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_6_v1',
        title: {
          en: 'Course Enrollment & Performance Summary Matrix',
          vi: 'Ma Trận Tổng Hợp Điểm Số & Ghi Danh Khóa Học'
        },
        description: {
          en: 'Generate course summary: course, COUNT(*) AS total_students, ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score grouped by course, ordered by avg_score DESC.',
          vi: 'Tạo báo cáo khóa học: course, COUNT(*) AS total_students, ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score gom theo course, xếp theo avg_score DESC.'
        },
        requirements: [
          {
            en: 'GROUP BY course ORDER BY avg_score DESC',
            vi: 'GROUP BY course ORDER BY avg_score DESC'
          }
        ],
        starterCode: `SELECT course FROM students GROUP BY ;`,
        solutionCode: `SELECT course, COUNT(*) AS total_students, ROUND(AVG(score), 1) AS avg_score, MIN(score) AS min_score, MAX(score) AS max_score FROM students GROUP BY course ORDER BY avg_score DESC;`,
        hints: [
          {
            en: 'Add aggregate functions in SELECT.',
            vi: 'Thêm các hàm tổng hợp vào mệnh đề SELECT.'
          }
        ],
        solutionExplanation: {
          en: 'Rolls up student grades by course offering.',
          vi: 'Tổng hợp điểm sinh viên theo từng khóa học.'
        }
      },
      {
        id: 'sql_ch_6_v2',
        title: {
          en: 'Department Payroll & Headcount Analytics',
          vi: 'Phân Tích Quỹ Lương & Nhân Sự Theo Phòng Ban'
        },
        description: {
          en: 'Retrieve dept_id, COUNT(*) AS total_employees, SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary from employees GROUP BY dept_id ORDER BY total_payroll DESC.',
          vi: 'Lấy dept_id, COUNT(*) AS total_employees, SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary từ employees GROUP BY dept_id ORDER BY total_payroll DESC.'
        },
        requirements: [
          {
            en: 'Select dept_id, COUNT(*), SUM(salary), ROUND(AVG(salary), 2)',
            vi: 'Chọn dept_id, COUNT(*), SUM(salary), ROUND(AVG(salary), 2)'
          },
          {
            en: 'GROUP BY dept_id ORDER BY total_payroll DESC',
            vi: 'GROUP BY dept_id ORDER BY total_payroll DESC'
          }
        ],
        starterCode: `SELECT dept_id FROM employees GROUP BY ;`,
        solutionCode: `SELECT dept_id, COUNT(*) AS total_employees, SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary FROM employees GROUP BY dept_id ORDER BY total_payroll DESC;`,
        hints: [
          {
            en: 'SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary',
            vi: 'SUM(salary) AS total_payroll, ROUND(AVG(salary), 2) AS avg_salary'
          }
        ],
        solutionExplanation: {
          en: 'Aggregates departmental payroll spending and organizational headcount.',
          vi: 'Tổng hợp chi tiêu tiền lương và số lượng nhân sự theo phòng ban.'
        }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_6_1',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: {
          en: 'What is the primary role of the GROUP BY clause in SQL?',
          vi: 'Vai trò chính của mệnh đề GROUP BY trong SQL là gì?'
        },
        options: [
          { en: 'Arranges identical data into groups so aggregate functions can compute summaries for each group', vi: 'Sắp xếp các dòng dữ liệu giống nhau thành từng nhóm để hàm tổng hợp tính toán chỉ số cho từng nhóm' },
          { en: 'Sorts query results in alphabetical order', vi: 'Sắp xếp kết quả truy vấn theo bảng chữ cái' },
          { en: 'Filters out individual rows before loading tables', vi: 'Lọc các dòng đơn lẻ trước khi nạp bảng' },
          { en: 'Combines columns from two distinct tables', vi: 'Kết hợp các cột từ hai bảng riêng biệt' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'GROUP BY partitions rows into summary buckets for aggregate calculations.',
          vi: 'GROUP BY phân chia các dòng dữ liệu thành các nhóm tóm tắt để tính toán hàm tổng hợp.'
        }
      },
      {
        id: 'sql_q_6_2',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: {
          en: 'What is the "Golden Rule" of SQL regarding SELECT and GROUP BY?',
          vi: '"Quy Tắc Vàng" của SQL liên quan đến SELECT và GROUP BY là gì?'
        },
        options: [
          { en: 'Every non-aggregate column in the SELECT list MUST be listed in the GROUP BY clause', vi: 'Mọi cột không nằm trong hàm tổng hợp ở SELECT BẮT BUỘC phải xuất hiện trong mệnh đề GROUP BY' },
          { en: 'GROUP BY must always come before WHERE', vi: 'GROUP BY luôn phải đứng trước WHERE' },
          { en: 'You can only use one aggregate function per query', vi: 'Bạn chỉ được dùng tối đa một hàm tổng hợp trong một truy vấn' },
          { en: 'GROUP BY cannot be used with ORDER BY', vi: 'GROUP BY không thể kết hợp với ORDER BY' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Any column in SELECT that is not aggregated must define a grouping boundary in GROUP BY.',
          vi: 'Bất kỳ cột nào trong SELECT không được bọc hàm tổng hợp đều phải là tiêu chí xác định nhóm trong GROUP BY.'
        }
      },
      {
        id: 'sql_q_6_3',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: {
          en: 'How does COUNT(column_name) differ from COUNT(*)?',
          vi: 'COUNT(tên_cột) khác với COUNT(*) như thế nào?'
        },
        options: [
          { en: 'COUNT(column_name) ignores NULL values in that column, whereas COUNT(*) counts all rows regardless of NULLs', vi: 'COUNT(tên_cột) bỏ qua các giá trị NULL trong cột đó, trong khi COUNT(*) đếm tất cả các dòng bất kể có NULL hay không' },
          { en: 'COUNT(*) only counts unique values', vi: 'COUNT(*) chỉ đếm các giá trị duy nhất' },
          { en: 'COUNT(column_name) is not valid SQL', vi: 'COUNT(tên_cột) không phải là cú pháp hợp lệ' },
          { en: 'There is no difference in behavior', vi: 'Hoàn toàn không có sự khác biệt nào' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'COUNT(*) tallies all records; COUNT(col) counts only non-null occurrences.',
          vi: 'COUNT(*) đếm toàn bộ bản ghi; COUNT(cột) chỉ đếm các ô có dữ liệu khác null.'
        }
      },
      {
        id: 'sql_q_6_4',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: {
          en: 'If a column contains values [10, NULL, 20], what does SUM(col) return?',
          vi: 'Nếu một cột chứa các giá trị [10, NULL, 20], hàm SUM(cột) trả về giá trị gì?'
        },
        options: [
          { en: '30 (NULL is ignored during summation)', vi: '30 (NULL bị tự động bỏ qua khi tính tổng)' },
          { en: 'NULL', vi: 'NULL' },
          { en: '0', vi: '0' },
          { en: 'Error: Cannot sum NULL values', vi: 'Lỗi: Không thể tính tổng cột chứa NULL' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Aggregate functions ignore NULL values during calculation, computing 10 + 20 = 30.',
          vi: 'Các hàm tổng hợp bỏ qua giá trị NULL trong quá trình tính toán, cho kết quả 10 + 20 = 30.'
        }
      },
      {
        id: 'sql_q_6_5',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: {
          en: 'Which aggregate function finds the highest numerical or alphabetical value in a column?',
          vi: 'Hàm tổng hợp nào tìm giá trị số hoặc ký tự chữ cái lớn nhất trong một cột?'
        },
        options: [
          { en: 'MAX()', vi: 'MAX()' },
          { en: 'HIGH()', vi: 'HIGH()' },
          { en: 'TOP()', vi: 'TOP()' },
          { en: 'GREATEST()', vi: 'GREATEST()' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'MAX() returns the maximum scalar value within the group or table.',
          vi: 'MAX() trả về giá trị vô hướng lớn nhất trong nhóm hoặc toàn bảng.'
        }
      },
      {
        id: 'sql_q_6_6',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: {
          en: 'How to count the number of DISTINCT cities represented in the students table?',
          vi: 'Làm thế nào để đếm số lượng các thành phố KHÔNG TRÙNG LẶP trong bảng students?'
        },
        options: [
          { en: 'SELECT COUNT(DISTINCT city) FROM students;', vi: 'SELECT COUNT(DISTINCT city) FROM students;' },
          { en: 'SELECT DISTINCT COUNT(city) FROM students;', vi: 'SELECT DISTINCT COUNT(city) FROM students;' },
          { en: 'SELECT COUNT(city) DISTINCT FROM students;', vi: 'SELECT COUNT(city) DISTINCT FROM students;' },
          { en: 'SELECT UNIQUE_COUNT(city) FROM students;', vi: 'SELECT UNIQUE_COUNT(city) FROM students;' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Placing DISTINCT inside the COUNT argument evaluates uniqueness before counting.',
          vi: 'Đặt DISTINCT bên trong đối số của COUNT sẽ lọc các giá trị duy nhất trước khi đếm.'
        }
      },
      {
        id: 'sql_q_6_7',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'hard',
        question: {
          en: 'What happens in standard ANSI SQL when GROUP BY is performed on a column containing multiple NULL values?',
          vi: 'Điều gì xảy ra trong chuẩn ANSI SQL khi thực hiện GROUP BY trên một cột có chứa nhiều giá trị NULL?'
        },
        options: [
          { en: 'All rows with NULL are grouped together into a single summary group', vi: 'Tất cả các dòng có giá trị NULL được gom lại thành một nhóm tóm tắt duy nhất' },
          { en: 'Each NULL creates its own separate individual group', vi: 'Mỗi giá trị NULL tạo thành một nhóm riêng biệt' },
          { en: 'All NULL rows are discarded from the query result', vi: 'Tất cả các dòng chứa NULL bị loại bỏ khỏi kết quả' },
          { en: 'A runtime grouping exception is thrown', vi: 'Phát sinh lỗi ngoại lệ khi gom nhóm' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'For grouping purposes, SQL treats all NULL values as equal, collapsing them into a single NULL group.',
          vi: 'Khi gom nhóm, SQL coi tất cả các giá trị NULL là tương đương nhau và gộp chúng vào một nhóm NULL duy nhất.'
        }
      },
      {
        id: 'sql_q_6_8',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: {
          en: 'Which SQL clause is executed first: WHERE or GROUP BY?',
          vi: 'Mệnh đề SQL nào được thực thi trước: WHERE hay GROUP BY?'
        },
        options: [
          { en: 'WHERE executes first to filter rows, then GROUP BY groups the remaining rows', vi: 'WHERE thực thi trước để lọc dòng, sau đó GROUP BY mới gom nhóm các dòng còn lại' },
          { en: 'GROUP BY executes before WHERE', vi: 'GROUP BY thực thi trước WHERE' },
          { en: 'HAVING executes before WHERE', vi: 'HAVING thực thi trước WHERE' },
          { en: 'They execute in arbitrary order', vi: 'Chúng thực thi theo thứ tự ngẫu nhiên' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'WHERE filters raw rows prior to aggregation, reducing the workload for GROUP BY.',
          vi: 'WHERE lọc các dòng thô trước khi tổng hợp, giúp giảm khối lượng công việc cho GROUP BY.'
        }
      },
      {
        id: 'sql_q_6_9',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: {
          en: 'What is the return value of SUM(col) when a table has 0 rows matching the WHERE filter?',
          vi: 'Giá trị trả về của SUM(cột) là gì khi bảng có 0 dòng nào thỏa mãn bộ lọc WHERE?'
        },
        options: [
          { en: 'NULL', vi: 'NULL' },
          { en: '0', vi: '0' },
          { en: 'NaN', vi: 'NaN' },
          { en: 'Throws empty table exception', vi: 'Báo lỗi bảng rỗng' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Aggregating an empty set with SUM, AVG, MIN, or MAX returns NULL (COUNT returns 0).',
          vi: 'Tổng hợp một tập rỗng bằng SUM, AVG, MIN hoặc MAX sẽ trả về NULL (riêng COUNT trả về 0).'
        }
      },
      {
        id: 'sql_q_6_10',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: {
          en: 'In SQLite, which function is used to round a floating point average to 2 decimal places?',
          vi: 'Trong SQLite, hàm nào được dùng để làm tròn điểm trung bình số thực đến 2 chữ số thập phân?'
        },
        options: [
          { en: 'ROUND(AVG(score), 2)', vi: 'ROUND(AVG(score), 2)' },
          { en: 'TRUNC(AVG(score), 2)', vi: 'TRUNC(AVG(score), 2)' },
          { en: 'FORMAT_FLOAT(AVG(score), 2)', vi: 'FORMAT_FLOAT(AVG(score), 2)' },
          { en: 'PRECISION(AVG(score), 2)', vi: 'PRECISION(AVG(score), 2)' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'ROUND(val, n) rounds val to n decimal digits.',
          vi: 'ROUND(val, n) làm tròn giá trị val đến n chữ số phần thập phân.'
        }
      },
      {
        id: 'sql_q_6_11',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'hard',
        question: {
          en: 'Given "SELECT dept_id, city, COUNT(*) FROM employees GROUP BY dept_id;", why does PostgreSQL reject this query?',
          vi: 'Cho câu lệnh "SELECT dept_id, city, COUNT(*) FROM employees GROUP BY dept_id;", tại sao PostgreSQL từ chối thực thi truy vấn này?'
        },
        options: [
          { en: 'Because "city" is projected in SELECT but missing from the GROUP BY clause and is unaggregated', vi: 'Vì "city" được chọn trong SELECT nhưng không có trong GROUP BY và chưa được tổng hợp' },
          { en: 'Because COUNT(*) is invalid with GROUP BY', vi: 'Vì COUNT(*) không hợp lệ khi dùng chung với GROUP BY' },
          { en: 'Because dept_id must be a string', vi: 'Vì dept_id bắt buộc phải là kiểu chuỗi' },
          { en: 'Because employees table requires aliases', vi: 'Vì bảng employees bắt buộc phải đặt bí danh' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Since city can have multiple values for a single dept_id, the database cannot deterministically pick a single city without an aggregate or grouping key.',
          vi: 'Vì một dept_id có thể có nhiều city khác nhau, CSDL không thể tự ý chọn một city duy nhất nếu nó không được gom nhóm hoặc tổng hợp.'
        }
      },
      {
        id: 'sql_q_6_12',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: {
          en: 'What does "COUNT(1)" do compared to "COUNT(*)" in modern relational query planners?',
          vi: '"COUNT(1)" hoạt động như thế nào so với "COUNT(*)" trong các trình tối ưu truy vấn hiện đại?'
        },
        options: [
          { en: 'They produce identical execution plans and performance', vi: 'Chúng tạo ra kế hoạch thực thi và hiệu năng hoàn toàn giống hệt nhau' },
          { en: 'COUNT(1) only counts the first row', vi: 'COUNT(1) chỉ đếm dòng đầu tiên' },
          { en: 'COUNT(*) is deprecated in SQL standard', vi: 'COUNT(*) đã bị loại bỏ trong chuẩn SQL' },
          { en: 'COUNT(1) ignores NULLs whereas COUNT(*) does not', vi: 'COUNT(1) bỏ qua NULL còn COUNT(*) thì không' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'Modern query optimizers parse COUNT(1) and COUNT(*) identically as a table/partition row count.',
          vi: 'Trình tối ưu hóa truy vấn hiện đại coi COUNT(1) và COUNT(*) là tương đương nhau để đếm tổng số dòng.'
        }
      },
      {
        id: 'sql_q_6_13',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'medium',
        question: {
          en: 'Can you group by a calculated expression such as "GROUP BY strftime(\'%Y\', created_at)"?',
          vi: 'Bạn có thể gom nhóm theo một biểu thức tính toán như "GROUP BY strftime(\'%Y\', created_at)" không?'
        },
        options: [
          { en: 'Yes, grouping expressions are fully supported in standard SQL', vi: 'Có, gom nhóm theo biểu thức được hỗ trợ đầy đủ trong chuẩn SQL' },
          { en: 'No, GROUP BY only supports raw database column names', vi: 'Không, GROUP BY chỉ hỗ trợ tên cột vật lý của bảng' },
          { en: 'Only if the expression is defined in a stored procedure', vi: 'Chỉ khi biểu thức được định nghĩa trong stored procedure' },
          { en: 'Only in MySQL', vi: 'Chỉ hỗ trợ trong MySQL' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'SQL allows arbitrary scalar expressions in GROUP BY to aggregate across derived values like year, month, or length.',
          vi: 'SQL cho phép dùng biểu thức vô hướng tùy ý trong GROUP BY để tổng hợp theo các giá trị phái sinh như năm, tháng hoặc độ dài chuỗi.'
        }
      },
      {
        id: 'sql_q_6_14',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'hard',
        question: {
          en: 'What is the mathematical result of AVG(val) on a column with values [NULL, NULL, NULL]?',
          vi: 'Kết quả toán học của AVG(cột) trên một cột chỉ chứa các giá trị [NULL, NULL, NULL] là gì?'
        },
        options: [
          { en: 'NULL (because there are 0 non-null values to average)', vi: 'NULL (vì có 0 giá trị khác null để tính trung bình)' },
          { en: '0.0', vi: '0.0' },
          { en: 'Division by zero error', vi: 'Lỗi chia cho số 0' },
          { en: 'NaN', vi: 'NaN' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'When all inputs to AVG are NULL, the function evaluates to NULL without raising an error.',
          vi: 'Khi tất cả đầu vào của AVG là NULL, hàm trả về kết quả là NULL mà không báo lỗi.'
        }
      },
      {
        id: 'sql_q_6_15',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'easy',
        question: {
          en: 'Which keyword orders the grouped results based on their aggregated values?',
          vi: 'Từ khóa nào dùng để sắp xếp kết quả đã gom nhóm dựa trên giá trị đã tổng hợp?'
        },
        options: [
          { en: 'ORDER BY', vi: 'ORDER BY' },
          { en: 'SORT BY', vi: 'SORT BY' },
          { en: 'GROUP ORDER', vi: 'GROUP ORDER' },
          { en: 'ARRANGE', vi: 'ARRANGE' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'ORDER BY can sort by aggregate expressions or their aliases (e.g. ORDER BY COUNT(*) DESC).',
          vi: 'ORDER BY có thể sắp xếp theo biểu thức tổng hợp hoặc bí danh của chúng (ví dụ: ORDER BY COUNT(*) DESC).'
        }
      },
      {
        id: 'sql_q_6_16',
        type: 'single_choice',
        topicId: 'sql_group_by',
        difficulty: 'hard',
        question: {
          en: 'What is the SQL standard extension to GROUP BY that computes subtotals and a grand total in a single query?',
          vi: 'Phần mở rộng chuẩn SQL của GROUP BY dùng để tính tổng phụ (subtotal) và tổng toàn bộ (grand total) trong một câu lệnh là gì?'
        },
        options: [
          { en: 'GROUP BY ROLLUP(...) or GROUP BY CUBE(...)', vi: 'GROUP BY ROLLUP(...) hoặc GROUP BY CUBE(...)' },
          { en: 'GROUP BY TOTALS', vi: 'GROUP BY TOTALS' },
          { en: 'AGGREGATE ALL', vi: 'AGGREGATE ALL' },
          { en: 'SUBTOTAL BY', vi: 'SUBTOTAL BY' }
        ],
        correctAnswers: [0],
        explanation: {
          en: 'ROLLUP generates hierarchical subtotal and grand total groupings across the specified dimensions.',
          vi: 'ROLLUP tạo các nhóm tổng phụ phân cấp và tổng toàn thể trên các chiều được chỉ định.'
        }
      }
    ]
  }
];
