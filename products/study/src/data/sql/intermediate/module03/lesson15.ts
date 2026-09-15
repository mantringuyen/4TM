import { Lesson } from '../../../../types';

export const lesson15: Lesson = {
  id: 'sql_lesson_15',
  moduleId: 'sql_mod_3',
  levelId: 'intermediate',
  courseId: 'sql',
  order: 15,
  topicId: 'sql_set_operations',
  title: {
    en: 'Set Operations: UNION, UNION ALL, INTERSECT & EXCEPT',
    vi: 'Các Phép Toán Tập Hợp: UNION, UNION ALL, INTERSECT & EXCEPT'
  },
  summary: {
    en: 'Master relational set theory in SQL: combining row sets with UNION and UNION ALL, finding commonalities with INTERSECT, and computing differences with EXCEPT / MINUS.',
    vi: 'Làm chủ lý thuyết tập hợp quan hệ trong SQL: hợp tập dòng với UNION và UNION ALL, tìm phần giao với INTERSECT và tính phần bù/hiệu với EXCEPT / MINUS.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'While JOINs combine columns from different tables horizontally, Set Operations combine rows from different queries vertically. Rooted in mathematical set theory, SQL provides UNION, UNION ALL, INTERSECT, and EXCEPT (MINUS in Oracle) to combine, intersect, and subtract row sets.',
      vi: 'Trong khi các phép JOIN kết hợp các cột từ các bảng khác nhau theo chiều ngang, các Phép Toán Tập Hợp (Set Operations) kết hợp các dòng từ nhiều câu truy vấn theo chiều dọc. Dựa trên lý thuyết tập hợp toán học, SQL cung cấp UNION, UNION ALL, INTERSECT và EXCEPT (MINUS trong Oracle) để hợp, giao và trừ các tập dữ liệu.'
    },
    conceptExplanation: {
      en: 'Core Set Operations & Rules:\n1. UNION: Combines result sets from two queries and automatically removes duplicate rows (performs an implicit sort/hash deduplication).\n2. UNION ALL: Combines result sets and retains ALL rows including duplicates. Much faster than UNION because it avoids sorting overhead.\n3. INTERSECT: Returns only rows that exist in BOTH query result sets.\n4. EXCEPT (or MINUS): Returns rows from the first query that DO NOT exist in the second query.\n5. Structural Compatibility Rules:\n   - Both queries must have the EXACT SAME number of columns in the SELECT list.\n   - Corresponding columns must have compatible data types.\n   - Column names in the final output are determined by the FIRST query.\n   - A single ORDER BY clause may be placed at the very end of the entire compound statement.',
      vi: 'Các phép toán tập hợp cốt lõi & Quy tắc:\n1. UNION: Hợp các tập kết quả từ hai truy vấn và tự động loại bỏ các dòng trùng lặp (thực hiện ngầm quá trình sắp xếp/khử trùng lặp).\n2. UNION ALL: Hợp các tập kết quả và giữ lại TẤT CẢ các dòng bao gồm cả trùng lặp. Chạy nhanh hơn nhiều so với UNION vì không tốn chi phí sắp xếp.\n3. INTERSECT: Chỉ trả về các dòng xuất hiện đồng thời ở CẢ HAI tập kết quả.\n4. EXCEPT (hoặc MINUS): Trả về các dòng có trong truy vấn đầu tiên nhưng KHÔNG CÓ trong truy vấn thứ hai.\n5. Quy tắc tương thích cấu trúc:\n   - Cả hai truy vấn bắt buộc phải có CHÍNH XÁC cùng số lượng cột trong danh sách SELECT.\n   - Các cột tương ứng theo thứ tự phải có kiểu dữ liệu tương thích.\n   - Tên cột của kết quả cuối cùng được quyết định bởi câu truy vấn ĐẦU TIÊN.\n   - Mệnh đề ORDER BY chỉ được phép đặt duy nhất một lần ở cuối cùng của toàn bộ câu lệnh hợp thành.'
    },
    syntax: `-- Combining distinct contacts
SELECT name, email, 'Customer' AS source FROM customers
UNION
SELECT name, email, 'Supplier' AS source FROM suppliers;

-- Difference check
SELECT product_id FROM inventory
EXCEPT
SELECT product_id FROM order_items;`,
    examples: [
      {
        title: {
          en: '1. Master Contact Book with UNION ALL and Source Tagging',
          vi: '1. Danh Bạ Tổng Hợp Với UNION ALL và Nhãn Phân Loại Nguồn'
        },
        code: `SELECT id, name, email, 'Employee' AS contact_type
FROM employees
UNION ALL
SELECT id, name, email, 'Contractor' AS contact_type
FROM contractors
ORDER BY name ASC;`,
        language: 'sql',
        explanation: {
          en: 'Stacks employee and contractor contacts into a unified list, tagging each record and ordering the consolidated output.',
          vi: 'Xếp chồng danh bạ nhân viên chính thức và cộng tác viên thành một danh sách hợp nhất, gắn nhãn nguồn và sắp xếp kết quả.'
        }
      },
      {
        title: {
          en: '2. Finding Inactive Catalog Items with EXCEPT',
          vi: '2. Tìm Sản Phẩm Trong Danh Mục Chưa Từng Có Đơn Hàng Bằng EXCEPT'
        },
        code: `SELECT id AS product_id
FROM products
EXCEPT
SELECT DISTINCT product_id
FROM order_items;`,
        language: 'sql',
        explanation: {
          en: 'Subtracts all ordered product IDs from the complete product catalog to identify unsold inventory items.',
          vi: 'Lấy toàn bộ ID sản phẩm trong kho trừ đi danh sách ID sản phẩm đã có đơn hàng để tìm ra các mặt hàng tồn kho chưa bán được.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Defaulting to UNION when duplicates are impossible or acceptable.',
          vi: 'Luôn mặc định dùng UNION khi dữ liệu vốn không thể trùng lặp hoặc chấp nhận trùng lặp.'
        },
        correction: {
          en: 'UNION performs an expensive sort to eliminate duplicates. If you are combining disjoint sets (e.g. current year transactions + archive transactions), always use UNION ALL for maximum performance.',
          vi: 'UNION phải sắp xếp toàn bộ dữ liệu để khử trùng lặp. Nếu bạn đang ghép hai tập dữ liệu rời rạc (như giao dịch năm nay + giao dịch lưu trữ cũ), hãy luôn dùng UNION ALL để đạt hiệu năng tối đa.'
        }
      },
      {
        mistake: {
          en: 'Placing an ORDER BY clause inside the first query before the UNION keyword.',
          vi: 'Đặt mệnh đề ORDER BY bên trong câu truy vấn thứ nhất trước từ khóa UNION.'
        },
        correction: {
          en: 'In SQL, individual component queries in a set operation cannot have standalone ORDER BY clauses unless wrapped in subqueries/CTEs. Put one ORDER BY at the very end.',
          vi: 'Trong SQL, từng câu truy vấn con trong phép toán tập hợp không được có ORDER BY độc lập trừ khi bọc trong subquery/CTE. Hãy đặt 1 mệnh đề ORDER BY ở cuối cùng.'
        }
      }
    ],
    tips: [
      {
        en: 'Oracle uses the keyword MINUS instead of EXCEPT. SQLite, PostgreSQL, and SQL Server use EXCEPT.',
        vi: 'Hệ quản trị Oracle dùng từ khóa MINUS thay vì EXCEPT. SQLite, PostgreSQL và SQL Server dùng từ khóa EXCEPT.'
      },
      {
        en: 'INTERSECT and EXCEPT treat NULL values as identical, meaning NULL INTERSECT NULL evaluates to a match.',
        vi: 'INTERSECT và EXCEPT xem các giá trị NULL là giống nhau, nghĩa là NULL INTERSECT NULL được tính là trùng khớp.'
      }
    ],
    practiceStarterCode: `-- Practice combining customer and supplier emails
SELECT email FROM customers UNION SELECT email FROM suppliers;`
  },
  exercisePool: [
    {
      id: 'sql_ex_set_1',
      type: 'complete_code',
      title: {
        en: 'Stack Active and Archived Invoices with UNION ALL',
        vi: 'Hợp Hóa Đơn Đang Hoạt Động & Lưu Trữ Với UNION ALL'
      },
      instruction: {
        en: 'Combine all invoice_id and amount rows from active_invoices and archived_invoices using UNION ALL.',
        vi: 'Hợp tất cả các dòng invoice_id và amount từ active_invoices và archived_invoices bằng UNION ALL.'
      },
      starterCode: `SELECT invoice_id, amount FROM active_invoices
___ ALL
SELECT invoice_id, amount FROM archived_invoices;`,
      solutionCode: `SELECT invoice_id, amount FROM active_invoices
UNION ALL
SELECT invoice_id, amount FROM archived_invoices;`,
      hint: {
        en: 'Use UNION ALL.',
        vi: 'Dùng UNION ALL.'
      },
      explanation: {
        en: 'UNION ALL stacks both tables without deduplication overhead.',
        vi: 'UNION ALL xếp chồng hai bảng mà không tốn chi phí khử trùng lặp.'
      }
    },
    {
      id: 'sql_ex_set_2',
      type: 'complete_code',
      title: {
        en: 'Identify Discontinued Products with EXCEPT',
        vi: 'Xác Định Sản Phẩm Không Còn Bán Bằng EXCEPT'
      },
      instruction: {
        en: 'Find product IDs that exist in all_products but are absent from active_catalog using EXCEPT.',
        vi: 'Tìm các product_id có trong all_products nhưng vắng mặt trong active_catalog bằng EXCEPT.'
      },
      starterCode: `SELECT product_id FROM all_products
___
SELECT product_id FROM active_catalog;`,
      solutionCode: `SELECT product_id FROM all_products
EXCEPT
SELECT product_id FROM active_catalog;`,
      hint: {
        en: 'Use the EXCEPT operator.',
        vi: 'Dùng toán tử EXCEPT.'
      },
      explanation: {
        en: 'EXCEPT subtracts the second query result set from the first.',
        vi: 'EXCEPT trừ tập kết quả của câu truy vấn thứ hai khỏi câu truy vấn đầu tiên.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_set_operations',
    title: {
      en: 'Consolidated Enterprise Contact Directory & Channel Audit',
      vi: 'Danh Bạ Liên Hệ Hợp Nhất Doanh Nghiệp & Kiểm Toán Kênh'
    },
    description: {
      en: 'Write a compound SQL query combining records across entities. Project entity_id, full_name, email, and entity_role (\'Executive\' for employees with salary >= 90000, \'Staff\' for employees with salary < 90000, and \'Contractor\' for all contractors). Use UNION ALL to stack these distinct groups, and order the consolidated directory by full_name ASC, entity_id ASC.',
      vi: 'Viết câu truy vấn SQL phức hợp kết hợp bản ghi qua nhiều thực thể. Lấy entity_id, full_name, email và entity_role (\'Executive\' cho nhân viên có salary >= 90000, \'Staff\' cho nhân viên có salary < 90000 và \'Contractor\' cho tất cả nhà thầu/cộng tác viên). Sử dụng UNION ALL để xếp chồng các nhóm riêng biệt này, và sắp xếp danh bạ hợp nhất theo full_name ASC, entity_id ASC.'
    },
    requirements: [
      { en: '1. First query: SELECT id AS entity_id, name AS full_name, email, \'Executive\' AS entity_role FROM employees WHERE salary >= 90000', vi: '1. Truy vấn 1: SELECT id AS entity_id, name AS full_name, email, \'Executive\' AS entity_role FROM employees WHERE salary >= 90000' },
      { en: '2. Second query: SELECT id, name, email, \'Staff\' FROM employees WHERE salary < 90000', vi: '2. Truy vấn 2: SELECT id, name, email, \'Staff\' FROM employees WHERE salary < 90000' },
      { en: '3. Third query: SELECT id, name, email, \'Contractor\' FROM contractors', vi: '3. Truy vấn 3: SELECT id, name, email, \'Contractor\' FROM contractors' },
      { en: '4. Chain with UNION ALL and final ORDER BY full_name ASC, entity_id ASC', vi: '4. Nối bằng UNION ALL và kết thúc bằng ORDER BY full_name ASC, entity_id ASC' }
    ],
    starterCode: `-- Write your consolidated directory query using UNION ALL
SELECT id AS entity_id, name AS full_name, email, 'Executive' AS entity_role FROM employees WHERE salary >= 90000;`,
    solutionCode: `SELECT id AS entity_id, name AS full_name, email, 'Executive' AS entity_role
FROM employees
WHERE salary >= 90000

UNION ALL

SELECT id AS entity_id, name AS full_name, email, 'Staff' AS entity_role
FROM employees
WHERE salary < 90000

UNION ALL

SELECT id AS entity_id, name AS full_name, email, 'Contractor' AS entity_role
FROM contractors

ORDER BY full_name ASC, entity_id ASC;`,
    hints: [
      {
        en: 'Use UNION ALL between the three component SELECT statements and place the single ORDER BY at the very bottom.',
        vi: 'Dùng UNION ALL giữa 3 câu lệnh SELECT thành phần và đặt duy nhất một mệnh đề ORDER BY ở dưới cùng.'
      }
    ],
    solutionExplanation: {
      en: 'Combines disjoint horizontal cohorts vertically with zero deduplication performance penalty while enforcing a unified sorting contract.',
      vi: 'Kết hợp các tập dữ liệu theo chiều dọc mà không tốn chi phí khử trùng lặp thừa, đồng thời đảm bảo trật tự sắp xếp thống nhất.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_set_1',
      type: 'single_choice',
      question: {
        en: 'What is the primary difference between UNION and UNION ALL?',
        vi: 'Sự khác biệt căn bản giữa UNION và UNION ALL là gì?'
      },
      options: [
        { en: 'UNION removes duplicate rows (via sorting/hashing), while UNION ALL keeps all rows including duplicates and is much faster', vi: 'UNION tự động loại bỏ các dòng trùng lặp (qua sắp xếp/băm), trong khi UNION ALL giữ lại toàn bộ các dòng kể cả trùng lặp và chạy nhanh hơn rất nhiều' },
        { en: 'UNION works on columns; UNION ALL works on tables', vi: 'UNION hoạt động trên cột; UNION ALL hoạt động trên bảng' },
        { en: 'UNION ALL is only available in NoSQL databases', vi: 'UNION ALL chỉ có trong CSDL NoSQL' },
        { en: 'UNION converts all text to uppercase', vi: 'UNION chuyển toàn bộ chữ thành chữ hoa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'UNION deduplicates the combined rows, adding computational overhead, whereas UNION ALL directly concatenates the result sets.',
        vi: 'UNION thực hiện khử trùng lặp làm tăng chi phí tính toán, trong khi UNION ALL ghép nối trực tiếp các tập kết quả.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_set_2',
      type: 'single_choice',
      question: {
        en: 'What does the INTERSECT operator do?',
        vi: 'Toán tử INTERSECT thực hiện phép toán gì?'
      },
      options: [
        { en: 'Returns only rows that are present in BOTH the first and second query results', vi: 'Chỉ trả về các dòng xuất hiện đồng thời ở CẢ HAI tập kết quả truy vấn' },
        { en: 'Returns rows in the first query minus the second query', vi: 'Trả về các dòng ở truy vấn thứ nhất trừ đi truy vấn thứ hai' },
        { en: 'Multiplies all numbers in both tables', vi: 'Nhân tất cả các số trong hai bảng' },
        { en: 'Renames all foreign keys', vi: 'Đổi tên toàn bộ khóa ngoại' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'INTERSECT evaluates the mathematical intersection of two row sets.',
        vi: 'INTERSECT tính toán phần giao toán học giữa hai tập hợp dòng.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_set_3',
      type: 'single_choice',
      question: {
        en: 'What does the EXCEPT operator (MINUS in Oracle) do?',
        vi: 'Toán tử EXCEPT (MINUS trong Oracle) thực hiện phép toán gì?'
      },
      options: [
        { en: 'Returns distinct rows from the first query that DO NOT appear in the second query', vi: 'Trả về các dòng phân biệt từ truy vấn thứ nhất KHÔNG XUẤT HIỆN trong truy vấn thứ hai' },
        { en: 'Adds two tables together', vi: 'Cộng hai bảng lại với nhau' },
        { en: 'Deletes all records from disk', vi: 'Xóa toàn bộ bản ghi khỏi ổ cứng' },
        { en: 'Swaps table primary keys', vi: 'Hoán đổi khóa chính của hai bảng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'EXCEPT computes set difference (A \\ B), retaining rows unique to the left operand query.',
        vi: 'EXCEPT tính toán hiệu của hai tập hợp (A \\ B), giữ lại các dòng chỉ có riêng ở truy vấn vế trái.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_set_4',
      type: 'true_false',
      question: {
        en: 'Both queries in a UNION statement must have the exact same number of columns in their SELECT lists.',
        vi: 'Cả hai câu truy vấn trong một lệnh UNION bắt buộc phải có chính xác cùng số lượng cột trong danh sách SELECT.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. A column count mismatch results in an immediate SQL compilation/syntax error.',
        vi: 'Đúng. Lệch số lượng cột sẽ gây lỗi biên dịch cú pháp SQL ngay lập tức.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_set_5',
      type: 'single_choice',
      question: {
        en: 'How are the final column names determined in a compound query joined by UNION?',
        vi: 'Tên cột của kết quả cuối cùng trong một truy vấn phức hợp nối bằng UNION được quyết định như thế nào?'
      },
      options: [
        { en: 'They are determined by the column aliases/names in the FIRST SELECT query', vi: 'Được quyết định bởi tên cột/bí danh đặt ở câu lệnh SELECT ĐẦU TIÊN' },
        { en: 'They are taken from the LAST query', vi: 'Được lấy từ câu truy vấn CUỐI CÙNG' },
        { en: 'The database combines both names with an underscore', vi: 'CSDL ghép nối cả 2 tên lại bằng dấu gạch dưới' },
        { en: 'They are named col1, col2, col3 by default', vi: 'Mặc định được đặt tên là col1, col2, col3' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The first SELECT statement defines the output schema metadata, including all column names and aliases.',
        vi: 'Câu lệnh SELECT đầu tiên quyết định siêu dữ liệu lược đồ kết quả, bao gồm tất cả tên cột và bí danh.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_set_6',
      type: 'predict_output',
      question: {
        en: 'Query 1 returns: (1), (2), (3). Query 2 returns: (2), (3), (4). How many rows does "Query 1 UNION Query 2" return?',
        vi: 'Truy vấn 1 trả về: (1), (2), (3). Truy vấn 2 trả về: (2), (3), (4). Phép toán "Truy vấn 1 UNION Truy vấn 2" trả về bao nhiêu dòng?'
      },
      options: [
        { en: '4 rows (1, 2, 3, 4)', vi: '4 dòng (1, 2, 3, 4)' },
        { en: '6 rows (1, 2, 3, 2, 3, 4)', vi: '6 dòng (1, 2, 3, 2, 3, 4)' },
        { en: '2 rows (2, 3)', vi: '2 dòng (2, 3)' },
        { en: '1 row (1)', vi: '1 dòng (1)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'UNION combines the sets and deduplicates (2) and (3), leaving 4 distinct values: 1, 2, 3, 4.',
        vi: 'UNION hợp hai tập và khử các phần tử trùng (2) và (3), còn lại 4 giá trị phân biệt: 1, 2, 3, 4.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_set_7',
      type: 'predict_output',
      question: {
        en: 'Query 1 returns: (1), (2), (3). Query 2 returns: (2), (3), (4). How many rows does "Query 1 INTERSECT Query 2" return?',
        vi: 'Truy vấn 1 trả về: (1), (2), (3). Truy vấn 2 trả về: (2), (3), (4). Phép toán "Truy vấn 1 INTERSECT Truy vấn 2" trả về bao nhiêu dòng?'
      },
      options: [
        { en: '2 rows (2, 3)', vi: '2 dòng (2, 3)' },
        { en: '4 rows (1, 2, 3, 4)', vi: '4 dòng (1, 2, 3, 4)' },
        { en: '1 row (1)', vi: '1 dòng (1)' },
        { en: '0 rows', vi: '0 dòng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'INTERSECT isolates only the overlapping elements present in both sets: 2 and 3.',
        vi: 'INTERSECT chỉ lấy các phần tử chung xuất hiện ở cả hai tập hợp: 2 và 3.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_set_8',
      type: 'predict_output',
      question: {
        en: 'Query 1 returns: (1), (2), (3). Query 2 returns: (2), (3), (4). What does "Query 1 EXCEPT Query 2" return?',
        vi: 'Truy vấn 1 trả về: (1), (2), (3). Truy vấn 2 trả về: (2), (3), (4). Phép toán "Truy vấn 1 EXCEPT Truy vấn 2" trả về kết quả gì?'
      },
      options: [
        { en: '1 row (1)', vi: '1 dòng (1)' },
        { en: '1 row (4)', vi: '1 dòng (4)' },
        { en: '2 rows (1, 4)', vi: '2 dòng (1, 4)' },
        { en: '2 rows (2, 3)', vi: '2 dòng (2, 3)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'EXCEPT subtracts items in Query 2 from Query 1: {1, 2, 3} \\ {2, 3, 4} = {1}.',
        vi: 'EXCEPT lấy các phần tử của Truy vấn 1 trừ đi các phần tử có trong Truy vấn 2: {1, 2, 3} \\ {2, 3, 4} = {1}.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_set_9',
      type: 'true_false',
      question: {
        en: 'In SQL compound queries with UNION, where must the ORDER BY clause be placed?',
        vi: 'Trong câu truy vấn phức hợp SQL với UNION, mệnh đề ORDER BY phải được đặt ở vị trí nào?'
      },
      options: [
        { en: 'At the very end of the entire compound statement to sort the combined result set', vi: 'Ở vị trí cuối cùng của toàn bộ câu lệnh phức hợp để sắp xếp toàn bộ tập kết quả đã hợp' },
        { en: 'Inside each SELECT statement before UNION', vi: 'Bên trong từng câu lệnh SELECT trước từ khóa UNION' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A single ORDER BY clause at the very end applies globally to the entire merged result set.',
        vi: 'Duy nhất một mệnh đề ORDER BY ở cuối cùng sẽ áp dụng sắp xếp cho toàn bộ tập dữ liệu đã gộp.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_set_10',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid SQL set operators? (Select all that apply)',
        vi: 'Những toán tử nào sau đây là toán tử tập hợp hợp lệ trong SQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'UNION', vi: 'UNION' },
        { en: 'UNION ALL', vi: 'UNION ALL' },
        { en: 'INTERSECT', vi: 'INTERSECT' },
        { en: 'EXCEPT (or MINUS)', vi: 'EXCEPT (hoặc MINUS)' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'UNION, UNION ALL, INTERSECT, and EXCEPT (MINUS) represent the full family of standard SQL set operators.',
        vi: 'UNION, UNION ALL, INTERSECT và EXCEPT (MINUS) đại diện cho đầy đủ bộ toán tử tập hợp tiêu chuẩn trong SQL.'
      },
      topicId: 'sql_set_operations',
      difficulty: 'easy'
    }
  ]
};

export default lesson15;
