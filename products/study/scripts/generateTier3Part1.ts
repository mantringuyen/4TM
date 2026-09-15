import { Lesson } from '../src/types';

export const tier3Part1Lessons: Lesson[] = [
  // LESSON 11: Scalar & Multi-Row Subqueries: IN, ALL, ANY
  {
    id: 'sql_lesson_11',
    moduleId: 'sql_mod_3',
    levelId: 'intermediate',
    courseId: 'sql',
    order: 11,
    topicId: 'sql_subqueries_scalar_multirow',
    title: {
      en: 'Scalar & Multi-Row Subqueries: IN, ALL, ANY',
      vi: 'Truy Vấn Con Vô Hướng & Đa Dòng: IN, ALL, ANY'
    },
    summary: {
      en: 'Master nesting queries inside SELECT, WHERE, and FROM clauses, distinguish scalar (1x1) vs multi-row result sets, and utilize comparison operators with IN, ANY, and ALL.',
      vi: 'Làm chủ kỹ thuật lồng truy vấn con trong SELECT, WHERE và FROM, phân biệt kết quả vô hướng (1x1) vs đa dòng và sử dụng các toán tử so sánh với IN, ANY, ALL.'
    },
    estimatedMinutes: 22,
    learn: {
      introduction: {
        en: 'A subquery (or inner query) is a SELECT statement enclosed in parentheses nested inside another SQL statement. Subqueries allow you to compute intermediate values dynamically without hardcoding static constants.',
        vi: 'Truy vấn con (subquery) là một câu lệnh SELECT đặt trong dấu ngoặc đơn lồng bên trong một câu lệnh SQL khác. Truy vấn con cho phép bạn tính toán các giá trị trung gian một cách linh hoạt mà không cần phải gán cứng các hằng số tĩnh.'
      },
      conceptExplanation: {
        en: 'Subqueries are categorized by return shape: 1) Scalar Subqueries return exactly 1 row and 1 column, behaving like a single dynamic literal (valid in SELECT expressions, WHERE comparisons like score > (SELECT AVG(score)...)). 2) Multi-Row Subqueries return a single column with multiple rows, used with set operators like IN, NOT IN, > ANY (...), or > ALL (...). 3) Table Subqueries (Derived Tables) return multiple rows and columns in the FROM clause and MUST be given an alias in ANSI SQL.',
        vi: 'Truy vấn con được phân loại theo hình dạng kết quả: 1) Truy vấn con vô hướng (Scalar) trả về đúng 1 dòng và 1 cột, hoạt động như một hằng số động (dùng trong SELECT, so sánh WHERE như score > (SELECT AVG(score)...)). 2) Truy vấn con đa dòng (Multi-Row) trả về 1 cột nhiều dòng, dùng với các toán tử tập hợp như IN, NOT IN, > ANY (...), hoặc > ALL (...). 3) Bảng phái sinh (Derived Table) trả về nhiều dòng và cột trong mệnh đề FROM và BẮT BUỘC phải đặt bí danh trong chuẩn ANSI SQL.'
      },
      syntax: `-- 1. Scalar Subquery in WHERE:
SELECT name, score
FROM students
WHERE score > (SELECT AVG(score) FROM students);

-- 2. Multi-Row Subquery with IN:
SELECT name, dept_id, salary
FROM employees
WHERE dept_id IN (SELECT DISTINCT dept_id FROM employees WHERE salary > 70000);

-- 3. Derived Table in FROM:
SELECT sub.course, sub.avg_score
FROM (SELECT course, AVG(score) AS avg_score FROM students GROUP BY course) sub
WHERE sub.avg_score >= 80;`,
      examples: [
        {
          title: {
            en: '1. Finding Above-Average Students Dynamically',
            vi: '1. Tìm Học Viên Có Điểm Trên Mức Trung Bình Một Cách Tự Động'
          },
          code: `SELECT name, course, score,
       ROUND((SELECT AVG(score) FROM students), 2) AS overall_avg,
       ROUND(score - (SELECT AVG(score) FROM students), 2) AS diff_from_avg
FROM students
WHERE score > (SELECT AVG(score) FROM students)
ORDER BY score DESC;`,
          language: 'sql',
          explanation: {
            en: 'Uses a scalar subquery in both SELECT and WHERE to compare each student against the global cohort average dynamically.',
            vi: 'Dùng truy vấn con vô hướng ở cả SELECT và WHERE để so sánh từng học viên với mức trung bình chung của toàn khóa một cách tự động.'
          }
        },
        {
          title: {
            en: '2. Multi-Row Filtering with IN Subquery',
            vi: '2. Lọc Đa Dòng Với Truy Vấn Con IN'
          },
          code: `SELECT name, course, city
FROM students
WHERE name IN (SELECT customer_name FROM orders WHERE amount >= 100.0);`,
          language: 'sql',
          explanation: {
            en: 'Retrieves students whose names appear in the list of customers who placed high-value orders ($100+).',
            vi: 'Trích xuất các học viên có tên xuất hiện trong danh sách khách hàng đã mua đơn hàng giá trị cao (từ 100 USD trở lên).'
          }
        }
      ],
      commonMistakes: [
        {
          mistake: {
            en: 'Using standard equality (=) with a multi-row subquery',
            vi: 'Dùng toán tử bằng (=) với một truy vấn con trả về nhiều dòng'
          },
          correction: {
            en: 'If a subquery returns more than 1 row, standard comparison operators (=, <, >) fail with a runtime error: "more than one row returned by a subquery". Use IN or > ANY / > ALL for multi-row results.',
            vi: 'Nếu truy vấn con trả về nhiều hơn 1 dòng, toán tử so sánh đơn (=, <, >) sẽ báo lỗi: "truy vấn con trả về nhiều hơn một dòng". Hãy dùng IN hoặc > ANY / > ALL cho kết quả đa dòng.'
          },
          code: `-- RUNTIME ERROR: SELECT * FROM students WHERE course = (SELECT course FROM students WHERE score > 80);
-- CORRECT:
SELECT * FROM students WHERE course IN (SELECT course FROM students WHERE score > 80);`
        },
        {
          mistake: {
            en: 'Omitting the mandatory alias for a derived table in the FROM clause',
            vi: 'Quên đặt bí danh bắt buộc cho bảng phái sinh trong mệnh đề FROM'
          },
          correction: {
            en: 'ANSI SQL and most database engines strictly require every subquery in the FROM clause to have a table alias (e.g. FROM (...) sub).',
            vi: 'Chuẩn ANSI SQL và hầu hết các hệ CSDL đều bắt buộc mọi subquery trong mệnh đề FROM phải có bí danh bảng (ví dụ: FROM (...) sub).'
          },
          code: `-- ERROR: SELECT avg_score FROM (SELECT AVG(score) AS avg_score FROM students);
-- CORRECT:
SELECT sub.avg_score FROM (SELECT AVG(score) AS avg_score FROM students) sub;`
        }
      ],
      tips: [
        {
          en: 'Scalar subqueries in SELECT execute per row unless the query optimizer hoists them into a constant evaluation.',
          vi: 'Truy vấn con vô hướng trong SELECT sẽ thực thi trên từng dòng trừ khi trình tối ưu hóa nâng nó thành hằng số.'
        },
        {
          en: 'ANY and SOME are exact synonyms in ANSI SQL (e.g. > ANY is identical to > SOME).',
          vi: 'ANY và SOME hoàn toàn đồng nghĩa trong chuẩn ANSI SQL (ví dụ: > ANY giống hệt > SOME).'
        }
      ],
      practiceStarterCode: `-- Find students with scores higher than the overall average
SELECT name, score
FROM students
WHERE score > (SELECT AVG(score) FROM students);`,
      practice: {
        task: {
          en: 'Write a query to find all employees earning strictly more than the average employee salary, selecting name, dept_id, and salary.',
          vi: 'Viết truy vấn tìm tất cả nhân viên có mức lương cao hơn mức lương trung bình của toàn bộ nhân viên, chọn name, dept_id và salary.'
        },
        starterCode: `-- Find employees with above-average salary
SELECT name, dept_id, salary
FROM employees
WHERE salary > ;`,
        solutionCode: `SELECT name, dept_id, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`
      }
    },
    exercisePool: [
      {
        id: 'sql_ex_11_1',
        type: 'fix_code',
        title: { en: 'Fix Multi-Row Subquery Equality Error', vi: 'Sửa Lỗi So Sánh Bằng Với Truy Vấn Con Đa Dòng' },
        instruction: {
          en: 'Replace the "=" operator with "IN" to handle multiple matching records from the subquery.',
          vi: 'Thay thế toán tử "=" bằng "IN" để xử lý trường hợp truy vấn con trả về nhiều bản ghi.'
        },
        starterCode: 'SELECT name, city FROM students WHERE name = (SELECT customer_name FROM orders);',
        solutionCode: 'SELECT name, city FROM students WHERE name IN (SELECT customer_name FROM orders);',
        hint: { en: 'Change "=" to "IN".', vi: 'Đổi "=" thành "IN".' },
        explanation: {
          en: 'The IN operator accepts a set of multiple values returned by a multi-row subquery.',
          vi: 'Toán tử IN chấp nhận một tập hợp nhiều giá trị do truy vấn con đa dòng trả về.'
        }
      },
      {
        id: 'sql_ex_11_2',
        type: 'complete_code',
        title: { en: 'Complete Missing Alias for Derived Table', vi: 'Hoàn Thiện Bí Danh Cho Bảng Phái Sinh' },
        instruction: {
          en: 'Provide the missing alias "summary" for the derived subquery in the FROM clause.',
          vi: 'Bổ sung bí danh "summary" bị thiếu cho subquery phái sinh trong mệnh đề FROM.'
        },
        starterCode: 'SELECT summary.course, summary.max_score FROM (SELECT course, MAX(score) AS max_score FROM students GROUP BY course)  WHERE summary.max_score >= 90;',
        solutionCode: 'SELECT summary.course, summary.max_score FROM (SELECT course, MAX(score) AS max_score FROM students GROUP BY course) summary WHERE summary.max_score >= 90;',
        hint: { en: 'Add "summary" right after the closing parenthesis of the subquery.', vi: 'Thêm "summary" ngay sau dấu ngoặc đóng của subquery.' },
        explanation: {
          en: 'Derived tables in FROM must have an explicit identifier alias.',
          vi: 'Các bảng phái sinh trong FROM bắt buộc phải có bí danh định danh rõ ràng.'
        }
      },
      {
        id: 'sql_ex_11_3',
        type: 'write_code',
        title: { en: 'Dynamic Max Score Comparison', vi: 'So Sánh Với Điểm Cao Nhất Động' },
        instruction: {
          en: 'Write a query to find all students who scored within 10 points of the maximum score: SELECT name, score FROM students WHERE score >= (SELECT MAX(score) FROM students) - 10.',
          vi: 'Viết truy vấn tìm tất cả học viên có điểm trong khoảng 10 điểm so với điểm cao nhất: SELECT name, score FROM students WHERE score >= (SELECT MAX(score) FROM students) - 10.'
        },
        starterCode: '-- Select students within 10 points of max score\n',
        solutionCode: 'SELECT name, score FROM students WHERE score >= (SELECT MAX(score) FROM students) - 10;',
        hint: { en: 'Use (SELECT MAX(score) FROM students) - 10 in the WHERE clause.', vi: 'Dùng (SELECT MAX(score) FROM students) - 10 trong mệnh đề WHERE.' },
        explanation: {
          en: 'Scalar subqueries can participate in arithmetic expressions directly.',
          vi: 'Truy vấn con vô hướng có thể tham gia trực tiếp vào các biểu thức số học.'
        }
      },
      {
        id: 'sql_ex_11_4',
        type: 'modify_example',
        title: { en: 'Project Subquery Column in SELECT', vi: 'Chiếu Cột Subquery Trong Mệnh Đề SELECT' },
        instruction: {
          en: 'Modify the query to project the scalar subquery (SELECT MAX(salary) FROM employees) aliased as max_salary alongside name and salary.',
          vi: 'Sửa truy vấn để chiếu subquery vô hướng (SELECT MAX(salary) FROM employees) với bí danh max_salary cùng với name và salary.'
        },
        starterCode: 'SELECT name, salary FROM employees;',
        solutionCode: 'SELECT name, salary, (SELECT MAX(salary) FROM employees) AS max_salary FROM employees;',
        hint: { en: 'Add ", (SELECT MAX(salary) FROM employees) AS max_salary" in SELECT.', vi: 'Thêm ", (SELECT MAX(salary) FROM employees) AS max_salary" vào SELECT.' },
        explanation: {
          en: 'Scalar subqueries can be projected as computed columns for every row.',
          vi: 'Truy vấn con vô hướng có thể được chiếu như một cột tính toán cho từng dòng.'
        }
      },
      {
        id: 'sql_ex_11_5',
        type: 'predict_output',
        title: { en: 'Predict Outcome of Scalar Subquery Returning 0 Rows', vi: 'Dự Đoán Kết Quả Subquery Vô Hướng Trả Về 0 Dòng' },
        instruction: {
          en: 'If a scalar subquery in WHERE evaluates to 0 rows (empty set), what value does SQL substitute for it?',
          vi: 'Nếu một truy vấn con vô hướng trong WHERE trả về 0 dòng (tập rỗng), SQL sẽ thay thế nó bằng giá trị gì?'
        },
        starterCode: '-- Predict empty scalar subquery\n',
        solutionCode: 'SELECT NULL AS empty_subquery_val;',
        options: ['NULL', '0', 'An unhandled crash error', 'Empty string ""'],
        correctOptionIndex: 0,
        hint: { en: 'An empty scalar subquery evaluates to NULL.', vi: 'Một truy vấn con vô hướng rỗng sẽ có giá trị là NULL.' },
        explanation: {
          en: 'When a scalar subquery produces 0 rows, standard SQL converts the result to NULL.',
          vi: 'Khi truy vấn con vô hướng không tìm thấy dòng nào, chuẩn SQL chuyển kết quả thành NULL.'
        }
      }
    ],
    challenge: {
      id: 'sql_ch_11',
      title: { en: 'Top-Tier Academic & Purchasing Outlier Discovery', vi: 'Phát Hiện Học Viên Xuất Sắc & Chi Tiêu Đột Biến' },
      description: {
        en: 'Write a SQL query to identify outstanding students who satisfy two criteria: 1) Their score is strictly greater than the overall average score of all students in the database, AND 2) They have placed an order whose amount is strictly greater than the average order amount across all orders. Select s.name, s.course, s.score, and s.city. Order by s.score DESC, s.name ASC.',
        vi: 'Viết truy vấn SQL xác định các học viên xuất sắc thỏa mãn 2 điều kiện: 1) Điểm số của họ cao hơn mức điểm trung bình của toàn bộ học viên trong CSDL, VÀ 2) Họ đã từng đặt một đơn hàng có giá trị lớn hơn giá trị đơn hàng trung bình của tất cả các đơn. Chọn s.name, s.course, s.score và s.city. Sắp xếp theo s.score DESC, s.name ASC.'
      },
      requirements: [
        { en: 'Select s.name, s.course, s.score, s.city FROM students s', vi: 'Chọn s.name, s.course, s.score, s.city TỪ students s' },
        { en: 'Condition 1: s.score > (SELECT AVG(score) FROM students)', vi: 'Điều kiện 1: s.score > (SELECT AVG(score) FROM students)' },
        { en: 'Condition 2: s.name IN (SELECT customer_name FROM orders WHERE amount > (SELECT AVG(amount) FROM orders))', vi: 'Điều kiện 2: s.name IN (SELECT customer_name FROM orders WHERE amount > (SELECT AVG(amount) FROM orders))' },
        { en: 'ORDER BY s.score DESC, s.name ASC', vi: 'ORDER BY s.score DESC, s.name ASC' }
      ],
      starterCode: `-- Write your SQL query below
SELECT s.name, s.course, s.score, s.city
FROM students s
WHERE s.score > (SELECT AVG(score) FROM students)
  AND s.name IN (
    SELECT customer_name FROM orders WHERE amount > 
  )
ORDER BY ;`,
      solutionCode: `SELECT s.name, s.course, s.score, s.city FROM students s WHERE s.score > (SELECT AVG(score) FROM students) AND s.name IN (SELECT customer_name FROM orders WHERE amount > (SELECT AVG(amount) FROM orders)) ORDER BY s.score DESC, s.name ASC;`,
      hints: [{ en: 'Nest (SELECT AVG(amount) FROM orders) inside the orders subquery.', vi: 'Lồng (SELECT AVG(amount) FROM orders) vào bên trong subquery orders.' }],
      solutionExplanation: {
        en: 'Combines multiple nested subqueries across distinct entities to filter multi-dimensional high-value performers.',
        vi: 'Kết hợp nhiều truy vấn con lồng nhau giữa các thực thể khác nhau để lọc các đối tượng xuất sắc đa chiều.'
      }
    },
    challengePool: [
      {
        id: 'sql_ch_11_v1',
        title: { en: 'Top-Tier Academic & Purchasing Outlier Discovery', vi: 'Phát Hiện Học Viên Xuất Sắc & Chi Tiêu Đột Biến' },
        description: {
          en: 'Filter students with score > avg(score) AND name IN (SELECT customer_name FROM orders WHERE amount > avg(amount)), selecting name, course, score, city ordered by score DESC, name ASC.',
          vi: 'Lọc học viên có score > avg(score) VÀ name IN (SELECT customer_name FROM orders WHERE amount > avg(amount)), chọn name, course, score, city xếp theo score DESC, name ASC.'
        },
        requirements: [{ en: 'ORDER BY s.score DESC, s.name ASC', vi: 'ORDER BY s.score DESC, s.name ASC' }],
        starterCode: `SELECT s.name, s.course, s.score, s.city FROM students s WHERE s.score > (SELECT AVG(score) FROM students);`,
        solutionCode: `SELECT s.name, s.course, s.score, s.city FROM students s WHERE s.score > (SELECT AVG(score) FROM students) AND s.name IN (SELECT customer_name FROM orders WHERE amount > (SELECT AVG(amount) FROM orders)) ORDER BY s.score DESC, s.name ASC;`,
        hints: [{ en: 'Add the second subquery condition with IN.', vi: 'Thêm điều kiện subquery thứ hai với IN.' }],
        solutionExplanation: { en: 'Evaluates dual dynamic thresholds.', vi: 'Đánh giá hai ngưỡng động đồng thời.' }
      },
      {
        id: 'sql_ch_11_v2',
        title: { en: 'Department Compensation Outliers', vi: 'Nhân Sự Có Lương Vượt Trội Toàn Công Ty' },
        description: {
          en: 'Select e.name, e.dept_id, e.salary, e.bonus FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees) AND e.dept_id IN (SELECT dept_id FROM employees GROUP BY dept_id HAVING COUNT(*) >= 2) ORDER BY e.salary DESC;',
          vi: 'Chọn e.name, e.dept_id, e.salary, e.bonus TỪ employees e CÓ e.salary > (SELECT AVG(salary) FROM employees) VÀ e.dept_id IN (SELECT dept_id FROM employees GROUP BY dept_id HAVING COUNT(*) >= 2) XẾP THEO e.salary DESC;'
        },
        requirements: [
          { en: 'WHERE e.salary > (SELECT AVG(salary)...)', vi: 'WHERE e.salary > (SELECT AVG(salary)...)' },
          { en: 'AND e.dept_id IN (SELECT dept_id ... HAVING COUNT(*) >= 2)', vi: 'AND e.dept_id IN (SELECT dept_id ... HAVING COUNT(*) >= 2)' }
        ],
        starterCode: `SELECT e.name, e.dept_id, e.salary, e.bonus FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees);`,
        solutionCode: `SELECT e.name, e.dept_id, e.salary, e.bonus FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees) AND e.dept_id IN (SELECT dept_id FROM employees GROUP BY dept_id HAVING COUNT(*) >= 2) ORDER BY e.salary DESC;`,
        hints: [{ en: 'Combine scalar subquery and multi-row subquery in WHERE.', vi: 'Kết hợp subquery vô hướng và subquery đa dòng trong WHERE.' }],
        solutionExplanation: { en: 'Identifies high-earning staff in established departments.', vi: 'Xác định nhân viên thu nhập cao trong các phòng ban quy mô.' }
      }
    ],
    quizQuestionPool: [
      {
        id: 'sql_q_11_1',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'easy',
        question: { en: 'What defines a "Scalar Subquery" in SQL?', vi: 'Đặc điểm nào xác định một "Truy Vấn Con Vô Hướng" (Scalar Subquery) trong SQL?' },
        options: [
          { en: 'It returns exactly one single value (1 row and 1 column)', vi: 'Nó trả về chính xác một giá trị duy nhất (1 dòng và 1 cột)' },
          { en: 'It returns an entire table with multiple columns', vi: 'Nó trả về toàn bộ một bảng với nhiều cột' },
          { en: 'It cannot contain a WHERE clause', vi: 'Nó không thể chứa mệnh đề WHERE' },
          { en: 'It runs before the database server starts', vi: 'Nó chạy trước khi máy chủ CSDL khởi động' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Scalar subqueries output a single 1x1 atomic value, usable anywhere expressions are allowed.', vi: 'Truy vấn con vô hướng cho ra một giá trị nguyên tử 1x1 duy nhất, dùng được ở mọi nơi cho phép biểu thức.' }
      },
      {
        id: 'sql_q_11_2',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'medium',
        question: { en: 'What happens if a scalar subquery evaluated in a WHERE clause returns multiple rows?', vi: 'Điều gì xảy ra nếu một truy vấn con vô hướng trong mệnh đề WHERE trả về nhiều hơn một dòng?' },
        options: [
          { en: 'The database halts query execution and throws a runtime exception ("more than one row returned by a subquery")', vi: 'CSDL dừng thực thi truy vấn và báo lỗi ngoại lệ runtime ("truy vấn con trả về nhiều hơn một dòng")' },
          { en: 'It automatically picks the first row', vi: 'Nó tự động chọn dòng đầu tiên' },
          { en: 'It converts the values to an array', vi: 'Nó chuyển đổi các giá trị thành một mảng' },
          { en: 'It ignores the extra rows silently', vi: 'Nó âm thầm bỏ qua các dòng thừa' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Standard comparison operators (=, <, >) require a single scalar operand; multi-row returns trigger an execution failure.', vi: 'Các toán tử so sánh đơn (=, <, >) đòi hỏi toán hạng vô hướng duy nhất; trả về nhiều dòng sẽ gây lỗi thực thi.' }
      },
      {
        id: 'sql_q_11_3',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'easy',
        question: { en: 'Which operator should be used when comparing a column against a subquery returning a list of values?', vi: 'Toán tử nào nên được dùng khi so sánh một cột với truy vấn con trả về một danh sách các giá trị?' },
        options: [
          { en: 'IN (or NOT IN)', vi: 'IN (hoặc NOT IN)' },
          { en: '=', vi: '=' },
          { en: 'LIKE', vi: 'LIKE' },
          { en: 'BETWEEN', vi: 'BETWEEN' }
        ],
        correctAnswers: [0],
        explanation: { en: 'The IN operator tests membership against a multi-row set.', vi: 'Toán tử IN kiểm tra sự tồn tại trong một tập hợp nhiều dòng.' }
      },
      {
        id: 'sql_q_11_4',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'medium',
        question: { en: 'What is a "Derived Table" (table subquery) in SQL?', vi: '"Bảng Phái Sinh" (Derived Table) trong SQL là gì?' },
        options: [
          { en: 'A subquery placed in the FROM clause that acts as a temporary inline table during query execution', vi: 'Một subquery đặt trong mệnh đề FROM hoạt động như một bảng tạm nội tuyến trong quá trình thực thi truy vấn' },
          { en: 'A physical table created on the hard drive', vi: 'Một bảng vật lý được tạo trên ổ cứng' },
          { en: 'A foreign key relationship', vi: 'Một mối quan hệ khóa ngoại' },
          { en: 'A column constraint', vi: 'Một ràng buộc cột' }
        ],
        correctAnswers: [0],
        explanation: { en: 'A subquery in the FROM clause produces an anonymous derived table that can be queried, joined, and filtered.', vi: 'Subquery trong FROM tạo ra một bảng phái sinh có thể được truy vấn, nối bảng và lọc dữ liệu.' }
      },
      {
        id: 'sql_q_11_5',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'easy',
        question: { en: 'Why must every derived table in the FROM clause have an alias in standard ANSI SQL?', vi: 'Tại sao mọi bảng phái sinh trong mệnh đề FROM bắt buộc phải có bí danh trong chuẩn ANSI SQL?' },
        options: [
          { en: 'So the outer query has an unambiguous table reference to access its projected columns', vi: 'Để câu truy vấn ngoài có một tên bảng tham chiếu rõ ràng khi truy cập các cột của nó' },
          { en: 'To allocate RAM on the server', vi: 'Để cấp phát RAM trên máy chủ' },
          { en: 'To create an index automatically', vi: 'Để tự động tạo chỉ mục Index' },
          { en: 'Aliases are optional in ANSI SQL', vi: 'Bí danh là tùy chọn trong chuẩn ANSI SQL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ANSI SQL requires explicit alias names for derived tables to maintain unambiguous identifier resolution.', vi: 'ANSI SQL bắt buộc phải có bí danh rõ ràng cho bảng phái sinh để đảm bảo định danh không bị mơ hồ.' }
      },
      {
        id: 'sql_q_11_6',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'hard',
        question: { en: 'What does "val > ALL (SELECT score FROM students WHERE course = \'SQL\')" mean?', vi: '"val > ALL (SELECT score FROM students WHERE course = \'SQL\')" có nghĩa là gì?' },
        options: [
          { en: 'val must be strictly greater than EVERY score in the SQL course (equivalent to val > MAX(score))', vi: 'val phải lớn hơn TẤT CẢ các điểm trong khóa học SQL (tương đương với val > MAX(score))' },
          { en: 'val must be greater than at least one score', vi: 'val phải lớn hơn ít nhất một điểm' },
          { en: 'val must equal the sum of all scores', vi: 'val phải bằng tổng của tất cả các điểm' },
          { en: 'val is tested against the average', vi: 'val được so sánh với điểm trung bình' }
        ],
        correctAnswers: [0],
        explanation: { en: '> ALL requires the condition to hold true for every single element in the returned set.', vi: '> ALL đòi hỏi điều kiện phải đúng với tất cả các phần tử trong tập kết quả trả về.' }
      },
      {
        id: 'sql_q_11_7',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'medium',
        question: { en: 'What does "val > ANY (SELECT score FROM students WHERE course = \'SQL\')" mean?', vi: '"val > ANY (SELECT score FROM students WHERE course = \'SQL\')" có nghĩa là gì?' },
        options: [
          { en: 'val must be strictly greater than AT LEAST ONE score in the SQL course (equivalent to val > MIN(score))', vi: 'val phải lớn hơn ÍT NHẤT MỘT điểm trong khóa học SQL (tương đương với val > MIN(score))' },
          { en: 'val must be greater than every score', vi: 'val phải lớn hơn mọi điểm' },
          { en: 'val must equal all scores', vi: 'val phải bằng tất cả các điểm' },
          { en: 'val must be NULL', vi: 'val phải là NULL' }
        ],
        correctAnswers: [0],
        explanation: { en: '> ANY evaluates to TRUE if val is greater than any individual element (i.e. greater than the minimum).', vi: '> ANY trả về TRUE nếu val lớn hơn bất kỳ phần tử nào (tức là lớn hơn giá trị nhỏ nhất).' }
      },
      {
        id: 'sql_q_11_8',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'hard',
        question: { en: 'What is the danger of writing "WHERE id NOT IN (SELECT foreign_id FROM table_b)" when table_b contains a NULL foreign_id?', vi: 'Mối nguy hiểm của câu lệnh "WHERE id NOT IN (SELECT foreign_id FROM table_b)" khi table_b có chứa một foreign_id là NULL là gì?' },
        options: [
          { en: 'Because NOT (id = NULL) evaluates to UNKNOWN, the entire NOT IN predicate evaluates to UNKNOWN for every row, returning 0 rows', vi: 'Vì NOT (id = NULL) trả về UNKNOWN nên toàn bộ vị từ NOT IN đều ra UNKNOWN cho mọi dòng, khiến kết quả trả về 0 dòng' },
          { en: 'It causes the table to be deleted', vi: 'Làm bảng bị xóa' },
          { en: 'It converts NULL to 0', vi: 'Chuyển NULL thành 0' },
          { en: 'It throws a syntax error', vi: 'Báo lỗi cú pháp' }
        ],
        correctAnswers: [0],
        explanation: { en: 'A single NULL in a NOT IN set destroys all matches due to Three-Valued Logic. NOT EXISTS is preferred.', vi: 'Một giá trị NULL duy nhất trong tập NOT IN sẽ phá hủy toàn bộ kết quả do logic 3 giá trị. Nên dùng NOT EXISTS thay thế.' }
      },
      {
        id: 'sql_q_11_9',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'easy',
        question: { en: 'Can a scalar subquery be placed inside the SELECT clause directly as a column expression?', vi: 'Truy vấn con vô hướng có thể đặt trực tiếp bên trong mệnh đề SELECT như một cột biểu thức không?' },
        options: [
          { en: 'Yes, as long as it returns at most 1 row and 1 column', vi: 'Có, miễn là nó trả về tối đa 1 dòng và 1 cột' },
          { en: 'No, subqueries are strictly forbidden in SELECT', vi: 'Không, subquery bị nghiêm cấm trong SELECT' },
          { en: 'Only if the table has fewer than 5 columns', vi: 'Chỉ khi bảng có ít hơn 5 cột' },
          { en: 'Only for string concatenation', vi: 'Chỉ dùng để nối chuỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Scalar subqueries are legal in the SELECT projection list.', vi: 'Truy vấn con vô hướng hoàn toàn hợp lệ trong danh sách chiếu của SELECT.' }
      },
      {
        id: 'sql_q_11_10',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'medium',
        question: { en: 'How many times does an uncorrelated scalar subquery in the WHERE clause execute conceptually?', vi: 'Về mặt khái niệm, một truy vấn con vô hướng không tương quan (uncorrelated) trong mệnh đề WHERE thực thi bao nhiêu lần?' },
        options: [
          { en: 'Once; the database evaluates it once and uses the cached scalar result for all outer table row comparisons', vi: 'Một lần; CSDL tính toán một lần duy nhất và dùng kết quả vô hướng lưu đệm đó cho mọi so sánh ở bảng ngoài' },
          { en: 'Once per row in the outer table', vi: 'Mỗi dòng ở bảng ngoài chạy một lần' },
          { en: 'Infinite times', vi: 'Vô số lần' },
          { en: 'Twice', vi: 'Hai lần' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Uncorrelated subqueries do not depend on outer row attributes, so the query planner computes them once upfront.', vi: 'Truy vấn con không tương quan không phụ thuộc vào dòng ngoài nên trình tối ưu chỉ tính toán 1 lần duy nhất.' }
      },
      {
        id: 'sql_q_11_11',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'easy',
        question: { en: 'Which SQL clause CANNOT contain a subquery?', vi: 'Mệnh đề SQL nào KHÔNG THỂ chứa truy vấn con?' },
        options: [
          { en: 'All major clauses (SELECT, FROM, WHERE, HAVING) CAN contain subqueries', vi: 'Tất cả các mệnh đề chính (SELECT, FROM, WHERE, HAVING) ĐỀU CÓ THỂ chứa subquery' },
          { en: 'WHERE', vi: 'WHERE' },
          { en: 'HAVING', vi: 'HAVING' },
          { en: 'FROM', vi: 'FROM' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Subqueries are supported across SELECT, FROM, WHERE, and HAVING clauses.', vi: 'Subquery được hỗ trợ linh hoạt trên các mệnh đề SELECT, FROM, WHERE và HAVING.' }
      },
      {
        id: 'sql_q_11_12',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'hard',
        question: { en: 'What is the difference between "IN (SELECT ...)" and "= ANY (SELECT ...)"?', vi: 'Sự khác biệt giữa "IN (SELECT ...)" và "= ANY (SELECT ...)" là gì?' },
        options: [
          { en: 'They are completely equivalent in syntax and execution semantics', vi: 'Chúng hoàn toàn tương đương nhau về mặt cú pháp và ngữ nghĩa thực thi' },
          { en: '= ANY is faster', vi: '= ANY chạy nhanh hơn' },
          { en: 'IN does not support numbers', vi: 'IN không hỗ trợ kiểu số' },
          { en: '= ANY only works in Oracle', vi: '= ANY chỉ hoạt động trong Oracle' }
        ],
        correctAnswers: [0],
        explanation: { en: 'In ANSI SQL, `IN` is exact syntactic sugar for `= ANY`.', vi: 'Trong chuẩn ANSI SQL, `IN` chính là cú pháp tương đương hoàn hảo của `= ANY`.' }
      },
      {
        id: 'sql_q_11_13',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'medium',
        question: { en: 'How to find students who scored higher than the average score of students in their specific course using an inline derived table?', vi: 'Làm thế nào để tìm học viên có điểm cao hơn điểm trung bình của chính khóa học họ đang học bằng cách dùng bảng phái sinh inline?' },
        options: [
          { en: 'JOIN the students table with a derived table: FROM students s JOIN (SELECT course, AVG(score) AS avg_s FROM students GROUP BY course) d ON s.course = d.course WHERE s.score > d.avg_s', vi: 'JOIN bảng students với bảng phái sinh: FROM students s JOIN (SELECT course, AVG(score) AS avg_s FROM students GROUP BY course) d ON s.course = d.course WHERE s.score > d.avg_s' },
          { en: 'WHERE score > AVG(score)', vi: 'WHERE score > AVG(score)' },
          { en: 'GROUP BY course HAVING score > AVG(score)', vi: 'GROUP BY course HAVING score > AVG(score)' },
          { en: 'UNION ALL on course', vi: 'UNION ALL trên course' }
        ],
        correctAnswers: [0],
        explanation: { en: 'Joining against a pre-aggregated derived table provides group-level benchmarks for comparison.', vi: 'Join với bảng phái sinh đã gom nhóm sẵn cung cấp chuẩn đối sánh theo từng nhóm để so sánh.' }
      },
      {
        id: 'sql_q_11_14',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'hard',
        question: { en: 'What does a subquery returning 0 rows evaluate to when used with ALL (e.g. val > ALL (empty_set))?', vi: 'Truy vấn con trả về 0 dòng sẽ được đánh giá thế nào khi dùng với ALL (ví dụ: val > ALL (tập_rỗng))?' },
        options: [
          { en: 'TRUE (vacuously true, because there are no elements that violate the condition)', vi: 'TRUE (đúng chân không - vacuously true, vì không có bất kỳ phần tử nào vi phạm điều kiện)' },
          { en: 'FALSE', vi: 'FALSE' },
          { en: 'NULL', vi: 'NULL' },
          { en: 'Error', vi: 'Báo lỗi' }
        ],
        correctAnswers: [0],
        explanation: { en: 'In formal predicate logic and ANSI SQL, `x op ALL (empty)` is vacuously TRUE for any x.', vi: 'Trong logic vị từ và chuẩn ANSI SQL, `x op ALL (tập_rỗng)` luôn là TRUE (đúng hiển nhiên do không có phản ví dụ).' }
      },
      {
        id: 'sql_q_11_15',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'easy',
        question: { en: 'Which enclosing punctuation is required around all SQL subqueries?', vi: 'Dấu bao quanh nào là bắt buộc đối với tất cả các truy vấn con trong SQL?' },
        options: [
          { en: 'Parentheses ( )', vi: 'Dấu ngoặc đơn ( )' },
          { en: 'Curly braces { }', vi: 'Dấu ngoặc nhọn { }' },
          { en: 'Square brackets [ ]', vi: 'Dấu ngoặc vuông [ ]' },
          { en: 'Single quotes \' \'', vi: 'Dấu nháy đơn \' \'' }
        ],
        correctAnswers: [0],
        explanation: { en: 'All subqueries must be enclosed in parentheses `(...)`.', vi: 'Tất cả các truy vấn con bắt buộc phải nằm trong cặp dấu ngoặc đơn `(...)`.' }
      },
      {
        id: 'sql_q_11_16',
        type: 'single_choice',
        topicId: 'sql_subqueries_scalar_multirow',
        difficulty: 'medium',
        question: { en: 'Can a subquery use ORDER BY inside an IN subquery in standard SQL?', vi: 'Một truy vấn con có thể dùng ORDER BY bên trong mệnh đề IN trong chuẩn SQL không?' },
        options: [
          { en: 'Standard SQL disallows ORDER BY in IN subqueries unless LIMIT is also specified, because sets are inherently unordered', vi: 'Chuẩn SQL không cho phép ORDER BY trong subquery IN trừ khi có thêm LIMIT, vì tập hợp về bản chất là không thứ tự' },
          { en: 'ORDER BY is mandatory in all subqueries', vi: 'ORDER BY là bắt buộc trong mọi subquery' },
          { en: 'Only if sorting by primary key', vi: 'Chỉ khi sắp xếp theo khóa chính' },
          { en: 'Only in PostgreSQL', vi: 'Chỉ trong PostgreSQL' }
        ],
        correctAnswers: [0],
        explanation: { en: 'ORDER BY is meaningless in an IN subquery unless limiting the top N rows.', vi: 'ORDER BY là vô nghĩa trong subquery IN trừ khi dùng để giới hạn top N dòng với LIMIT.' }
      }
    ]
  }
];
