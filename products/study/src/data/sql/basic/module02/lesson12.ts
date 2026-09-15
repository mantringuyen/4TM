import { Lesson } from '../../../../types';

export const lesson12: Lesson = {
  id: 'sql_lesson_12',
  moduleId: 'sql_mod_2',
  levelId: 'basic',
  courseId: 'sql',
  order: 12,
  topicId: 'sql_outer_cross_joins',
  title: {
    en: 'RIGHT JOIN, FULL OUTER JOIN & CROSS JOIN',
    vi: 'Kết Nối Mở Rộng: RIGHT JOIN, FULL OUTER JOIN & CROSS JOIN'
  },
  summary: {
    en: 'Master comprehensive relational join types: RIGHT OUTER JOIN, FULL OUTER JOIN, dialect simulation via UNION, and Cartesian matrix generation with CROSS JOIN.',
    vi: 'Làm chủ các phép kết nối mở rộng: RIGHT OUTER JOIN, FULL OUTER JOIN, kỹ thuật mô phỏng qua UNION và tạo ma trận tổ hợp Descartes với CROSS JOIN.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Beyond standard inner and left joins, advanced relational modeling requires symmetry and complete outer coverage. RIGHT JOIN, FULL OUTER JOIN, and CROSS JOIN provide the mathematical tools to inspect bilateral mismatches, generate matrix grids, and combine master catalogs.',
      vi: 'Bên cạnh các phép inner và left join cơ bản, phân tích dữ liệu chuyên sâu đòi hỏi tính đối xứng và bao quát toàn diện. RIGHT JOIN, FULL OUTER JOIN và CROSS JOIN cung cấp các công cụ toán học để đối soát lệch dữ liệu hai chiều, tạo lưới ma trận tổ hợp và đồng bộ hóa danh mục.'
    },
    conceptExplanation: {
      en: 'Advanced Join Semantics:\n1. RIGHT JOIN (RIGHT OUTER JOIN): Retains all rows from the right table, pairing matching rows from the left table or filling them with NULLs. (Practically equivalent to a flipped LEFT JOIN).\n2. FULL OUTER JOIN: Returns all records when there is a match in either left or right table. Retains unmatched rows from BOTH sides with NULL fillers.\n3. Dialect Portability for FULL JOIN: SQLite and older MySQL versions lack native FULL OUTER JOIN syntax. You simulate FULL OUTER JOIN by executing a LEFT JOIN UNION ALL anti-LEFT JOIN.\n4. CROSS JOIN: Computes the Cartesian Product (NxM rows), pairing every row of table 1 with every row of table 2. Ideal for calendar grids, product variant matrixes, and combinatorial modeling.',
      vi: 'Ngữ nghĩa các phép Join nâng cao:\n1. RIGHT JOIN (RIGHT OUTER JOIN): Giữ lại toàn bộ các dòng từ bảng bên phải, kết hợp dữ liệu khớp từ bảng trái hoặc điền NULL nếu không khớp (về bản chất tương đương đảo vị trí của LEFT JOIN).\n2. FULL OUTER JOIN: Trả về tất cả bản ghi khi có dữ liệu ở một trong hai bảng. Giữ lại các dòng không khớp từ CẢ HAI phía với các giá trị NULL bổ trợ.\n3. Kỹ thuật mô phỏng FULL JOIN: SQLite và các bản MySQL cũ chưa hỗ trợ cú pháp FULL OUTER JOIN trực tiếp. Bạn mô phỏng bằng cách thực hiện LEFT JOIN UNION ALL với anti-LEFT JOIN.\n4. CROSS JOIN: Tạo ra tích Descartes (NxM dòng), ghép từng dòng của bảng 1 với mọi dòng của bảng 2. Cực kỳ hữu ích để tạo lưới lịch, ma trận biến thể sản phẩm và mô hình hóa tổ hợp.'
    },
    syntax: `-- CROSS JOIN
SELECT p.product_name, s.size_name
FROM products p
CROSS JOIN sizes s;

-- FULL OUTER JOIN Simulation (SQLite / MySQL compatible)
SELECT a.id, a.name, b.score
FROM table_a a
LEFT JOIN table_b b ON a.id = b.id
UNION ALL
SELECT a.id, a.name, b.score
FROM table_b b
LEFT JOIN table_a a ON b.id = a.id
WHERE a.id IS NULL;`,
    examples: [
      {
        title: {
          en: '1. CROSS JOIN: Generating Product Catalog Variant Grid',
          vi: '1. CROSS JOIN: Tạo Ma Trận Biến Thể Sản Phẩm'
        },
        code: `SELECT p.name AS product_name,
       c.color_name,
       s.size_label
FROM products p
CROSS JOIN colors c
CROSS JOIN sizes s
ORDER BY p.name, c.color_name, s.size_label;`,
        language: 'sql',
        explanation: {
          en: 'Generates every possible combination of product, color, and size (e.g. 10 products x 3 colors x 4 sizes = 120 SKU variations).',
          vi: 'Tạo mọi tổ hợp có thể giữa sản phẩm, màu sắc và kích thước (ví dụ: 10 sản phẩm x 3 màu x 4 kích thước = 120 mã SKU biến thể).'
        }
      },
      {
        title: {
          en: '2. Bilateral Data Reconciliation with FULL JOIN Logic',
          vi: '2. Đối Soát Dữ Liệu Hai Chiều Bằng Logic FULL JOIN'
        },
        code: `SELECT e.id AS emp_id,
       e.name AS employee_name,
       d.id AS dept_id,
       d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
UNION ALL
SELECT e.id AS emp_id,
       e.name AS employee_name,
       d.id AS dept_id,
       d.department_name
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
WHERE e.id IS NULL;`,
        language: 'sql',
        explanation: {
          en: 'Performs a bilateral audit showing employees without departments alongside empty departments without employees.',
          vi: 'Thực hiện đối soát hai chiều hiển thị cả nhân viên chưa có phòng ban lẫn các phòng ban trống chưa có nhân viên nào.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using CROSS JOIN on large production tables without strict limits or WHERE filters.',
          vi: 'Sử dụng CROSS JOIN trên các bảng dữ liệu lớn mà không có giới hạn hoặc bộ lọc WHERE chặt chẽ.'
        },
        correction: {
          en: 'CROSS JOIN produces N x M rows. Cross-joining a 100,000-row table with another 100,000-row table yields 10 billion rows, exhausting server memory. Use CROSS JOIN only for small lookup dimensions.',
          vi: 'CROSS JOIN tạo ra N x M dòng. Ghép chéo bảng 100.000 dòng với bảng 100.000 dòng sẽ tạo ra 10 tỷ dòng, làm cạn kiệt bộ nhớ máy chủ. Chỉ dùng cho các bảng danh mục nhỏ.'
        }
      },
      {
        mistake: {
          en: 'Assuming UNION and UNION ALL behave identically in FULL JOIN simulations.',
          vi: 'Cho rằng UNION và UNION ALL hoạt động giống nhau khi mô phỏng FULL JOIN.'
        },
        correction: {
          en: 'UNION deduplicates identical rows by performing an expensive sort, whereas UNION ALL directly concatenates disjoint result sets without overhead.',
          vi: 'UNION khử trùng lặp các dòng bằng cách sắp xếp tốn kém tài nguyên, trong khi UNION ALL ghép trực tiếp các tập dữ liệu rời rạc mà không bị chậm.'
        }
      }
    ],
    tips: [
      {
        en: 'In PostgreSQL, Oracle, and SQL Server, native "FULL OUTER JOIN ... ON" is fully supported.',
        vi: 'Trong PostgreSQL, Oracle và SQL Server, cú pháp chuẩn "FULL OUTER JOIN ... ON" được hỗ trợ hoàn toàn.'
      },
      {
        en: 'CROSS JOIN is semantically identical to listing multiple tables separated by a comma (FROM table1, table2) with no WHERE condition.',
        vi: 'CROSS JOIN có ngữ nghĩa hoàn toàn tương đương với việc liệt kê nhiều bảng cách nhau bằng dấu phẩy (FROM table1, table2) mà không có điều kiện WHERE.'
      }
    ],
    practiceStarterCode: `-- Practice CROSS JOIN combinations
SELECT p.name, s.season_name FROM products p CROSS JOIN seasons s;`
  },
  exercisePool: [
    {
      id: 'sql_ex_out_1',
      type: 'complete_code',
      title: {
        en: 'Generate Matrix with CROSS JOIN',
        vi: 'Tạo Ma Trận Với CROSS JOIN'
      },
      instruction: {
        en: 'Perform a CROSS JOIN between departments (d) and shifts (s) to list all possible staffing assignments.',
        vi: 'Thực hiện phép CROSS JOIN giữa departments (d) và shifts (s) để liệt kê tất cả các ca trực có thể phân công.'
      },
      starterCode: `SELECT d.department_name, s.shift_name
FROM departments d
___ JOIN shifts s;`,
      solutionCode: `SELECT d.department_name, s.shift_name
FROM departments d
CROSS JOIN shifts s;`,
      hint: {
        en: 'Use CROSS JOIN.',
        vi: 'Dùng CROSS JOIN.'
      },
      explanation: {
        en: 'CROSS JOIN combines every department with every shift option.',
        vi: 'CROSS JOIN ghép từng phòng ban với tất cả các ca trực.'
      }
    },
    {
      id: 'sql_ex_out_2',
      type: 'complete_code',
      title: {
        en: 'Simulate Bilateral Unmatched Records',
        vi: 'Mô Phỏng Các Bản Ghi Lệch Hai Chiều'
      },
      instruction: {
        en: 'Complete the query using UNION ALL to combine the left join with unmatched records from the right table.',
        vi: 'Hoàn thiện câu truy vấn dùng UNION ALL để kết hợp phép left join với các bản ghi không khớp từ bảng bên phải.'
      },
      starterCode: `SELECT a.id, b.score FROM table_a a LEFT JOIN table_b b ON a.id = b.id
___ ALL
SELECT a.id, b.score FROM table_b b LEFT JOIN table_a a ON b.id = a.id WHERE a.id IS NULL;`,
      solutionCode: `SELECT a.id, b.score FROM table_a a LEFT JOIN table_b b ON a.id = b.id
UNION ALL
SELECT a.id, b.score FROM table_b b LEFT JOIN table_a a ON b.id = a.id WHERE a.id IS NULL;`,
      hint: {
        en: 'Use UNION ALL.',
        vi: 'Dùng UNION ALL.'
      },
      explanation: {
        en: 'UNION ALL combines both halves of the bilateral audit without unnecessary deduplication overhead.',
        vi: 'UNION ALL kết hợp hai nửa của việc đối soát mà không tốn chi phí khử trùng lặp.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_outer_cross_joins',
    title: {
      en: 'Comprehensive Inventory SKU Matrix & Stock Gap Audit',
      vi: 'Ma Trận Mã SKU Tồn Kho Toàn Diện & Kiểm Toán Chênh Lệch'
    },
    description: {
      en: 'Write a SQL query that uses a CROSS JOIN between stores (s) and products (p) to generate every expected inventory cell (s.id AS store_id, s.store_name, p.id AS product_id, p.name AS product_name). LEFT JOIN this matrix to inventory_levels (i) on s.id = i.store_id AND p.id = i.product_id to display the recorded stock quantity using COALESCE(i.quantity, 0) AS stock_qty. Order the results by store_name ASC, product_name ASC.',
      vi: 'Viết câu truy vấn SQL sử dụng CROSS JOIN giữa stores (s) và products (p) để tạo mọi ô dữ liệu tồn kho dự kiến (s.id AS store_id, s.store_name, p.id AS product_id, p.name AS product_name). Sau đó thực hiện LEFT JOIN ma trận này với inventory_levels (i) theo điều kiện s.id = i.store_id AND p.id = i.product_id để hiển thị số lượng tồn kho qua COALESCE(i.quantity, 0) AS stock_qty. Sắp xếp theo store_name ASC, product_name ASC.'
    },
    requirements: [
      { en: '1. FROM stores s CROSS JOIN products p', vi: '1. FROM stores s CROSS JOIN products p' },
      { en: '2. LEFT JOIN inventory_levels i ON s.id = i.store_id AND p.id = i.product_id', vi: '2. LEFT JOIN inventory_levels i ON s.id = i.store_id AND p.id = i.product_id' },
      { en: '3. COALESCE(i.quantity, 0) AS stock_qty', vi: '3. COALESCE(i.quantity, 0) AS stock_qty' },
      { en: '4. ORDER BY s.store_name ASC, p.name ASC', vi: '4. Sắp xếp ORDER BY s.store_name ASC, p.name ASC' }
    ],
    starterCode: `-- Write your SKU matrix inventory query
SELECT s.id, p.id FROM stores s;`,
    solutionCode: `SELECT s.id AS store_id,
       s.store_name,
       p.id AS product_id,
       p.name AS product_name,
       COALESCE(i.quantity, 0) AS stock_qty
FROM stores s
CROSS JOIN products p
LEFT JOIN inventory_levels i ON s.id = i.store_id AND p.id = i.product_id
ORDER BY s.store_name ASC, p.name ASC;`,
    hints: [
      {
        en: 'Cross join stores and products first, then left join inventory_levels using composite keys.',
        vi: 'Thực hiện cross join giữa stores và products trước, sau đó left join với inventory_levels bằng khóa kết hợp.'
      }
    ],
    solutionExplanation: {
      en: 'Combines Cartesian matrix generation with outer join reconciliation to reliably identify missing inventory records with zero values.',
      vi: 'Kết hợp việc tạo ma trận Descartes với đối soát outer join để xác định chính xác các điểm tồn kho còn thiếu với giá trị 0.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_out_1',
      type: 'single_choice',
      question: {
        en: 'What is the output row count of a CROSS JOIN between Table A with 10 rows and Table B with 20 rows?',
        vi: 'Số lượng dòng kết quả của một phép CROSS JOIN giữa Bảng A có 10 dòng và Bảng B có 20 dòng là bao nhiêu?'
      },
      options: [
        { en: '200 rows (10 x 20 Cartesian product)', vi: '200 dòng (Tích Descartes 10 x 20)' },
        { en: '30 rows (10 + 20)', vi: '30 dòng (10 + 20)' },
        { en: '20 rows (the maximum)', vi: '20 dòng (số lớn nhất)' },
        { en: '10 rows (the minimum)', vi: '10 dòng (số nhỏ nhất)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A CROSS JOIN produces the Cartesian product of the two sets, multiplying their row counts (10 * 20 = 200).',
        vi: 'Phép CROSS JOIN tạo ra tích Descartes của 2 tập hợp, nhân số dòng của hai bảng với nhau (10 * 20 = 200).'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_out_2',
      type: 'single_choice',
      question: {
        en: 'What does a FULL OUTER JOIN return?',
        vi: 'Phép FULL OUTER JOIN trả về những dữ liệu gì?'
      },
      options: [
        { en: 'All matching rows, plus all unmatched rows from the left table and all unmatched rows from the right table (with NULL fillers)', vi: 'Tất cả các dòng trùng khớp, cộng với mọi dòng không khớp từ bảng trái và mọi dòng không khớp từ bảng phải (với các giá trị NULL bổ sung)' },
        { en: 'Only rows where both tables are completely identical', vi: 'Chỉ các dòng mà hai bảng giống hệt nhau' },
        { en: 'Only rows where all column values are NULL', vi: 'Chỉ các dòng mà toàn bộ các cột đều là NULL' },
        { en: 'A randomized sample of both tables', vi: 'Một mẫu ngẫu nhiên từ cả hai bảng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'FULL OUTER JOIN preserves all rows from both participating tables regardless of match status.',
        vi: 'FULL OUTER JOIN giữ lại toàn bộ các dòng từ cả hai bảng tham gia bất kể có khớp dữ liệu hay không.'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_out_3',
      type: 'true_false',
      question: {
        en: 'A RIGHT JOIN between Table A and Table B is functionally equivalent to a LEFT JOIN between Table B and Table A.',
        vi: 'Phép RIGHT JOIN giữa Bảng A và Bảng B có chức năng tương đương hoàn toàn với phép LEFT JOIN giữa Bảng B và Bảng A.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. RIGHT JOIN preserves the right table, which is identical to making that table the left table in a LEFT JOIN.',
        vi: 'Đúng. RIGHT JOIN giữ lại bảng bên phải, tương đương với việc đặt bảng đó làm bảng bên trái trong LEFT JOIN.'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_out_4',
      type: 'single_choice',
      question: {
        en: 'How can you simulate a FULL OUTER JOIN in SQLite (which does not natively support the FULL OUTER JOIN keyword)?',
        vi: 'Làm thế nào để mô phỏng một phép FULL OUTER JOIN trong SQLite (vốn chưa hỗ trợ từ khóa FULL OUTER JOIN trực tiếp)?'
      },
      options: [
        { en: 'Execute a LEFT JOIN, then combine with an anti-LEFT JOIN using UNION ALL', vi: 'Thực hiện một phép LEFT JOIN, sau đó kết hợp với một phép anti-LEFT JOIN bằng UNION ALL' },
        { en: 'Use an INNER JOIN with a GROUP BY clause', vi: 'Dùng INNER JOIN kết hợp với mệnh đề GROUP BY' },
        { en: 'SQLite cannot handle outer joins under any circumstances', vi: 'SQLite không thể xử lý outer join trong bất kỳ trường hợp nào' },
        { en: 'Multiply the tables with CROSS JOIN', vi: 'Nhân các bảng lại bằng CROSS JOIN' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Combining a LEFT JOIN with an anti-LEFT JOIN (WHERE left.id IS NULL) via UNION ALL precisely replicates a FULL OUTER JOIN.',
        vi: 'Kết hợp một phép LEFT JOIN với anti-LEFT JOIN (WHERE left.id IS NULL) qua UNION ALL tái hiện chính xác một phép FULL OUTER JOIN.'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_out_5',
      type: 'single_choice',
      question: {
        en: 'What is the standard use case for a CROSS JOIN in business reporting?',
        vi: 'Trường hợp sử dụng tiêu chuẩn của CROSS JOIN trong báo cáo kinh doanh là gì?'
      },
      options: [
        { en: 'Generating complete dimension matrices (e.g. all stores x all products x all months) to detect data gaps and zero-sales items', vi: 'Tạo ma trận chiều dữ liệu đầy đủ (ví dụ: tất cả cửa hàng x tất cả sản phẩm x các tháng) để phát hiện lỗ hổng dữ liệu và sản phẩm không bán được' },
        { en: 'Backing up the database to tape drive', vi: 'Sao lưu CSDL sang băng từ' },
        { en: 'Compressing JPEG images', vi: 'Nén hình ảnh JPEG' },
        { en: 'Creating database user accounts', vi: 'Tạo tài khoản người dùng CSDL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CROSS JOIN creates dense combinatorial grids, which are essential for gap analysis when outer-joined with sparse transaction logs.',
        vi: 'CROSS JOIN tạo ra lưới tổ hợp dày đặc, cực kỳ quan trọng cho phân tích lỗ hổng dữ liệu khi kết hợp outer join với bảng giao dịch.'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_out_6',
      type: 'true_false',
      question: {
        en: 'A CROSS JOIN with an ON clause is functionally identical to an INNER JOIN with that same ON clause.',
        vi: 'Một phép CROSS JOIN có mệnh đề ON hoạt động tương đương hoàn toàn với một phép INNER JOIN có cùng mệnh đề ON đó.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. In ANSI SQL, a CROSS JOIN with an ON predicate behaves as an explicit INNER JOIN.',
        vi: 'Đúng. Trong ANSI SQL, một phép CROSS JOIN có điều kiện ON hoạt động giống như một INNER JOIN tường minh.'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_out_7',
      type: 'single_choice',
      question: {
        en: 'Which relational database natively supports FULL OUTER JOIN?',
        vi: 'Hệ quản trị CSDL quan hệ nào hỗ trợ trực tiếp từ khóa FULL OUTER JOIN?'
      },
      options: [
        { en: 'PostgreSQL', vi: 'PostgreSQL' },
        { en: 'SQLite 3.35', vi: 'SQLite 3.35' },
        { en: 'MySQL 5.7', vi: 'MySQL 5.7' },
        { en: 'MariaDB 10.1', vi: 'MariaDB 10.1' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'PostgreSQL natively supports FULL OUTER JOIN syntax. MySQL and SQLite require emulation via UNION.',
        vi: 'PostgreSQL hỗ trợ sẵn cú pháp FULL OUTER JOIN. MySQL và SQLite đòi hỏi phải mô phỏng qua UNION.'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_out_8',
      type: 'predict_output',
      question: {
        en: 'If Table X has 0 rows and Table Y has 1,000,000 rows, how many rows are returned by "SELECT * FROM X CROSS JOIN Y;"?',
        vi: 'Nếu Bảng X có 0 dòng và Bảng Y có 1.000.000 dòng, có bao nhiêu dòng được trả về bởi câu lệnh "SELECT * FROM X CROSS JOIN Y;"?'
      },
      options: [
        { en: '0 rows (0 * 1,000,000 = 0)', vi: '0 dòng (0 * 1.000.000 = 0)' },
        { en: '1,000,000 rows', vi: '1.000.000 dòng' },
        { en: 'Error: Cannot cross join empty table', vi: 'Lỗi: Không thể cross join bảng rỗng' },
        { en: '1 row with NULLs', vi: '1 dòng với giá trị NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Cartesian product with an empty set is an empty set (0 rows).',
        vi: 'Tích Descartes với một tập hợp rỗng luôn cho ra một tập hợp rỗng (0 dòng).'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_out_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following join types can produce NULL values in the output for columns that are defined as NOT NULL in their base tables? (Select all that apply)',
        vi: 'Những loại join nào sau đây có thể tạo ra giá trị NULL trong kết quả đối với các cột được định nghĩa là NOT NULL trong bảng gốc? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'LEFT JOIN', vi: 'LEFT JOIN' },
        { en: 'RIGHT JOIN', vi: 'RIGHT JOIN' },
        { en: 'FULL OUTER JOIN', vi: 'FULL OUTER JOIN' },
        { en: 'INNER JOIN', vi: 'INNER JOIN' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Outer joins (LEFT, RIGHT, FULL) generate synthetic NULLs when a matching row is absent, even for NOT NULL columns. INNER JOIN never introduces synthetic NULLs.',
        vi: 'Các phép outer join (LEFT, RIGHT, FULL) tự sinh ra các giá trị NULL khi không tìm thấy dòng khớp, kể cả trên cột NOT NULL. INNER JOIN không bao giờ tự sinh NULL.'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'hard'
    },
    {
      id: 'sql_q_out_10',
      type: 'single_choice',
      question: {
        en: 'Why do many SQL style guides recommend using LEFT JOIN exclusively over RIGHT JOIN?',
        vi: 'Tại sao nhiều quy chuẩn viết code SQL khuyến nghị chỉ dùng LEFT JOIN thay vì dùng xen kẽ RIGHT JOIN?'
      },
      options: [
        { en: 'Because reading query flow from left-to-right (top-to-bottom) is vastly more intuitive and maintainable, as any RIGHT JOIN can be rewritten as a LEFT JOIN', vi: 'Vì luồng đọc truy vấn từ trái qua phải (trên xuống dưới) trực quan và dễ bảo trì hơn rất nhiều, và mọi RIGHT JOIN đều có thể viết lại thành LEFT JOIN' },
        { en: 'RIGHT JOIN is deprecated in ANSI SQL', vi: 'RIGHT JOIN đã bị khai tử trong chuẩn ANSI SQL' },
        { en: 'RIGHT JOIN cannot use indexes', vi: 'RIGHT JOIN không thể sử dụng chỉ mục' },
        { en: 'RIGHT JOIN only works on integers', vi: 'RIGHT JOIN chỉ hoạt động trên số nguyên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Consistency and readability: sticking to LEFT JOIN keeps the primary driving table at the top of the FROM clause.',
        vi: 'Tính nhất quán và dễ đọc: luôn dùng LEFT JOIN giúp bảng dữ liệu chủ đạo luôn nằm ở đầu mệnh đề FROM.'
      },
      topicId: 'sql_outer_cross_joins',
      difficulty: 'medium'
    }
  ]
};

export default lesson12;
