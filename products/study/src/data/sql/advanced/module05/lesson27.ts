import { Lesson } from '../../../../types';

export const lesson27: Lesson = {
  id: 'sql_lesson_27',
  moduleId: 'sql_mod_5',
  levelId: 'advanced',
  courseId: 'sql',
  order: 27,
  topicId: 'sql_json_operations',
  title: {
    en: 'JSON Operations & Semi-Structured Data in SQL',
    vi: 'Thao Tác JSON & Dữ Liệu Bán Cấu Trúc Trong SQL'
  },
  summary: {
    en: 'Master relational-document hybrid data architectures: parsing JSON documents with json_extract and ->> path operators, mutating nested attributes with json_set, flattening JSON arrays with json_each, and indexing semi-structured JSONB payloads.',
    vi: 'Làm chủ kiến trúc kết hợp quan hệ - tài liệu: trích xuất tài liệu JSON bằng json_extract và toán tử ->>, cập nhật thuộc tính lồng nhau bằng json_set, trải phẳng mảng JSON bằng json_each và đánh chỉ mục dữ liệu bán cấu trúc JSONB.'
  },
  estimatedMinutes: 20,
  learn: {
    introduction: {
      en: 'Modern applications frequently ingest flexible, evolving data structures such as third-party webhook payloads, user preference dictionaries, and polymorphic telemetry logs. Relational databases support native JSON and JSONB data types, allowing developers to query, update, unnest, and index semi-structured documents seamlessly within standard SQL.',
      vi: 'Các ứng dụng hiện đại thường xuyên tiếp nhận dữ liệu linh hoạt và biến đổi liên tục như webhook từ bên thứ ba, cấu hình tùy chọn của người dùng và nhật ký telemetry đa hình. CSDL quan hệ hỗ trợ kiểu dữ liệu JSON và JSONB gốc, cho phép lập trình viên truy vấn, cập nhật, trải phẳng mảng và đánh chỉ mục dữ liệu bán cấu trúc trực tiếp trong SQL.'
    },
    conceptExplanation: {
      en: 'JSON Extraction, Manipulation & Indexing Mechanics:\n1. JSON Extraction Operators:\n   - json_extract(doc, \'$.user.name\'): Standard JSON path extraction.\n   - Operator ->: Returns the JSON element as JSON (e.g. data->\'address\').\n   - Operator ->>: Returns the target JSON property extracted directly as unquoted text (e.g. data->>\'city\').\n2. Modifying Nested JSON:\n   - json_set(doc, \'$.status\', \'Active\'): Updates existing keys or inserts new keys if missing.\n   - json_remove(doc, \'$.temp_flag\'): Deletes targeted key-value pairs.\n3. Unnesting & Expanding JSON Arrays:\n   - json_each(doc, \'$.tags\') / jsonb_array_elements(): Expands a nested JSON array into relational rows for JOINs and GROUP BY aggregation.\n4. Indexing Semi-Structured Data:\n   - Expression/Functional Indexes: "CREATE INDEX idx_user_city ON users((json_extract(metadata, \'$.city\')));"\n   - GIN (Generalized Inverted Index) in PostgreSQL: Indexes arbitrary key-value paths within JSONB documents for fast containment queries (@>).',
      vi: 'Cơ chế trích xuất, thao tác & Đánh chỉ mục JSON:\n1. Các toán tử trích xuất JSON:\n   - json_extract(doc, \'$.user.name\'): Trích xuất giá trị theo đường dẫn JSON path tiêu chuẩn.\n   - Toán tử ->: Trả về phần tử JSON dưới dạng định dạng JSON (ví dụ: data->\'address\').\n   - Toán tử ->>: Trả về giá trị trích xuất trực tiếp dưới dạng chuỗi văn bản không có dấu ngoặc kép (ví dụ: data->>\'city\').\n2. Sửa đổi cấu trúc JSON lồng nhau:\n   - json_set(doc, \'$.status\', \'Active\'): Cập nhật khóa hiện có hoặc chèn thêm khóa mới nếu chưa có.\n   - json_remove(doc, \'$.temp_flag\'): Xóa cặp khóa-giá trị chỉ định.\n3. Trải phẳng mảng JSON (Unnesting):\n   - json_each(doc, \'$.tags\') / jsonb_array_elements(): Mở rộng mảng JSON thành các dòng quan hệ để thực hiện JOIN và GROUP BY.\n4. Đánh chỉ mục dữ liệu bán cấu trúc:\n   - Chỉ mục biểu thức (Expression Indexes): "CREATE INDEX idx_user_city ON users((json_extract(metadata, \'$.city\')));"\n   - Chỉ mục GIN (PostgreSQL): Đánh chỉ mục đảo ngược trên toàn bộ cây JSONB phục vụ toán tử tìm kiếm chứa (@>).'
    },
    syntax: `-- JSON extraction in SQLite / PostgreSQL
SELECT id,
       json_extract(profile, '$.name') AS user_name,
       json_extract(profile, '$.contact.email') AS user_email,
       json_extract(profile, '$.tier') AS membership_tier
FROM user_accounts
WHERE json_extract(profile, '$.tier') = 'Gold';

-- Modifying JSON payload
UPDATE user_accounts
SET profile = json_set(profile, '$.last_login', '2026-08-30')
WHERE id = 42;`,
    examples: [
      {
        title: {
          en: '1. Unnesting JSON Tag Arrays into Relational Rows with json_each',
          vi: '1. Trải Phẳng Mảng JSON Thành Các Dòng Quan Hệ Bằng json_each'
        },
        code: `SELECT p.id AS product_id,
       p.title,
       t.value AS tag_name
FROM products p,
     json_each(p.attributes, '$.tags') t
WHERE t.value = 'wireless';`,
        language: 'sql',
        explanation: {
          en: 'Flattens the inner JSON array stored in "attributes" into discrete relational records for filtering and joins.',
          vi: 'Trải phẳng mảng JSON bên trong cột "attributes" thành từng dòng riêng biệt để lọc và liên kết bảng.'
        }
      },
      {
        title: {
          en: '2. Creating an Expression Index on a JSON Property',
          vi: '2. Tạo Chỉ Mục Biểu Thức Trên Thuộc Tính JSON'
        },
        code: `CREATE INDEX idx_orders_customer_tier
ON orders((json_extract(order_metadata, '$.customer.tier')));`,
        language: 'sql',
        explanation: {
          en: 'Allows queries filtering on json_extract(order_metadata, \'$.customer.tier\') to perform direct B-Tree index seeks instead of full table scans.',
          vi: 'Cho phép các câu truy vấn lọc theo thuộc tính tier trong JSON thực hiện tìm kiếm trực tiếp trên cây B-Tree thay vì quét cả bảng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Confusing the -> operator (returns JSON quotes) with the ->> operator (returns unquoted text).',
          vi: 'Nhầm lẫn giữa toán tử -> (trả về JSON kèm dấu ngoặc kép) và ->> (trả về văn bản thuần không ngoặc kép).'
        },
        correction: {
          en: 'In PostgreSQL and modern SQL, payload->\'city\' returns \'"Boston"\' (JSON string with quotes), while payload->>\'city\' returns \'Boston\' (standard text). String equality checks fail if quotes are included.',
          vi: 'Trong PostgreSQL và SQL hiện đại, payload->\'city\' trả về \'"Boston"\' (chuỗi JSON có dấu ngoặc kép), còn payload->>\'city\' trả về \'Boston\' (chuỗi text thuần). So sánh chuỗi sẽ bị sai nếu có dấu ngoặc kép.'
        }
      },
      {
        mistake: {
          en: 'Using JSON columns as an excuse to avoid relational normalization for core structured entities.',
          vi: 'Lạm dụng cột JSON để né tránh chuẩn hóa CSDL quan hệ cho các thực thể có cấu trúc cốt lõi.'
        },
        correction: {
          en: 'JSON columns are ideal for truly variable, dynamic schemas. Core domain tables with fixed schemas (orders, line items, user accounts) should remain strictly normalized tables with proper foreign keys and constraints.',
          vi: 'Cột JSON chỉ lý tưởng cho dữ liệu động và biến đổi. Các thực thể cốt lõi có cấu trúc cố định (đơn hàng, người dùng) vẫn nên được chuẩn hóa thành bảng với khóa ngoại đầy đủ.'
        }
      }
    ],
    tips: [
      {
        en: 'In SQLite, the json_valid(col) function verifies whether a text string contains valid JSON syntax before parsing.',
        vi: 'Trong SQLite, hàm json_valid(col) giúp kiểm tra xem chuỗi văn bản có đúng cú pháp JSON hợp lệ hay không trước khi xử lý.'
      },
      {
        en: 'PostgreSQL JSONB stores decomposed binary format with support for GIN indexes, making it significantly faster for queries than raw JSON text.',
        vi: 'PostgreSQL JSONB lưu trữ dữ liệu dưới dạng nhị phân tối ưu và hỗ trợ chỉ mục GIN, giúp truy vấn nhanh hơn vượt trội so với JSON text.'
      }
    ],
    practiceStarterCode: `-- Extract JSON values
SELECT id, json_extract(metadata, '$.tier') AS tier FROM users;`
  },
  exercisePool: [
    {
      id: 'sql_ex_json_1',
      type: 'complete_code',
      title: {
        en: 'Extract JSON Property with json_extract',
        vi: 'Trích Xuất Thuộc Tính JSON Bằng json_extract'
      },
      instruction: {
        en: 'Extract the country property from the nested address object inside the info JSON column.',
        vi: 'Trích xuất thuộc tính country từ đối tượng address lồng nhau bên trong cột JSON info.'
      },
      starterCode: `SELECT id,
       ___(info, '$.address.country') AS country
FROM customers;`,
      solutionCode: `SELECT id,
       json_extract(info, '$.address.country') AS country
FROM customers;`,
      hint: {
        en: 'Use json_extract.',
        vi: 'Dùng json_extract.'
      },
      explanation: {
        en: 'json_extract(info, \'$.address.country\') traverses nested JSON paths to retrieve values.',
        vi: 'json_extract(info, \'$.address.country\') duyệt đường dẫn JSON lồng nhau để lấy giá trị.'
      }
    },
    {
      id: 'sql_ex_json_2',
      type: 'complete_code',
      title: {
        en: 'Update JSON Key with json_set',
        vi: 'Cập Nhật Khóa JSON Bằng json_set'
      },
      instruction: {
        en: 'Update the status property inside metadata to Active.',
        vi: 'Cập nhật thuộc tính status bên trong metadata thành Active.'
      },
      starterCode: `UPDATE accounts
SET metadata = ___(metadata, '$.status', 'Active')
WHERE id = 5;`,
      solutionCode: `UPDATE accounts
SET metadata = json_set(metadata, '$.status', 'Active')
WHERE id = 5;`,
      hint: {
        en: 'Use json_set.',
        vi: 'Dùng json_set.'
      },
      explanation: {
        en: 'json_set() updates existing keys or appends new key-value pairs to the JSON structure.',
        vi: 'json_set() cập nhật khóa hiện có hoặc bổ sung cặp khóa-giá trị mới vào cấu trúc JSON.'
      }
    }
  ],
  challenge: {
    id: 'sql_ch_json_operations',
    title: {
      en: 'Polymorphic E-Commerce Telemetry & Configuration Extraction Pipeline',
      vi: 'Đường Ống Trích Xuất Cấu Hình & Nhật Ký Telemetry Thương Mại Điện Tử Đa Hình'
    },
    description: {
      en: 'Write a SQL query that parses the device_logs table (columns: log_id, raw_payload, created_at). Extract device_os as json_extract(raw_payload, \'$.device.os\'), app_version as json_extract(raw_payload, \'$.app.version\'), and error_code as json_extract(raw_payload, \'$.error.code\'). Filter for records where json_extract(raw_payload, \'$.device.os\') = \'iOS\' AND json_extract(raw_payload, \'$.error.severity\') = \'CRITICAL\'. Output log_id, device_os, app_version, error_code, and created_at. Order by created_at DESC, log_id ASC.',
      vi: 'Viết câu truy vấn SQL xử lý bảng device_logs (các cột: log_id, raw_payload, created_at). Trích xuất device_os bằng json_extract(raw_payload, \'$.device.os\'), app_version bằng json_extract(raw_payload, \'$.app.version\'), và error_code bằng json_extract(raw_payload, \'$.error.code\'). Lọc các bản ghi có json_extract(raw_payload, \'$.device.os\') = \'iOS\' và json_extract(raw_payload, \'$.error.severity\') = \'CRITICAL\'. Lấy log_id, device_os, app_version, error_code, created_at. Sắp xếp theo created_at DESC, log_id ASC.'
    },
    requirements: [
      { en: '1. json_extract for device.os, app.version, and error.code', vi: '1. json_extract cho device.os, app.version và error.code' },
      { en: '2. WHERE filter on device.os = \'iOS\' AND error.severity = \'CRITICAL\'', vi: '2. Bộ lọc WHERE với device.os = \'iOS\' AND error.severity = \'CRITICAL\'' },
      { en: '3. ORDER BY created_at DESC, log_id ASC', vi: '3. Sắp xếp ORDER BY created_at DESC, log_id ASC' }
    ],
    starterCode: `-- Write your JSON extraction query
SELECT log_id, raw_payload FROM device_logs;`,
    solutionCode: `SELECT log_id,
       json_extract(raw_payload, '$.device.os') AS device_os,
       json_extract(raw_payload, '$.app.version') AS app_version,
       json_extract(raw_payload, '$.error.code') AS error_code,
       created_at
FROM device_logs
WHERE json_extract(raw_payload, '$.device.os') = 'iOS'
  AND json_extract(raw_payload, '$.error.severity') = 'CRITICAL'
ORDER BY created_at DESC, log_id ASC;`,
    hints: [
      {
        en: 'Use json_extract with dollar-sign JSON path notation like \'$.device.os\'.',
        vi: 'Dùng json_extract với cú pháp đường dẫn JSON bắt đầu bằng dấu đô la như \'$.device.os\'.'
      }
    ],
    solutionExplanation: {
      en: 'Extracts nested JSON telemetry attributes and filters semi-structured documents with precision.',
      vi: 'Trích xuất các thuộc tính telemetry JSON lồng nhau và lọc tài liệu bán cấu trúc một cách chính xác.'
    }
  },
  quizQuestionPool: [
    {
      id: 'sql_q_json_1',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of the json_extract() function in SQL?',
        vi: 'Mục đích của hàm json_extract() trong SQL là gì?'
      },
      options: [
        { en: 'To navigate and retrieve specific nested scalar values, arrays, or sub-objects from a JSON document using a JSONPath expression (e.g. \'$.user.name\')', vi: 'Để duyệt và lấy các giá trị vô hướng, mảng hoặc đối tượng con lồng nhau từ tài liệu JSON bằng biểu thức JSONPath (ví dụ: \'$.user.name\')' },
        { en: 'To convert an entire SQL database into a Microsoft Word document', vi: 'Để chuyển toàn bộ CSDL SQL thành file Microsoft Word' },
        { en: 'To delete all JSON tables', vi: 'Để xóa toàn bộ các bảng JSON' },
        { en: 'To compress hard drives', vi: 'Để nén ổ đĩa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'json_extract evaluates path expressions to access semi-structured elements.',
        vi: 'json_extract đánh giá biểu thức đường dẫn để truy cập các phần tử bán cấu trúc.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_json_2',
      type: 'single_choice',
      question: {
        en: 'In PostgreSQL, what is the difference between the "->" and "->>" operators when querying JSON?',
        vi: 'Trong PostgreSQL, sự khác biệt giữa hai toán tử "->" và "->>" khi truy vấn JSON là gì?'
      },
      options: [
        { en: '"->" returns the field as a JSON object/type (with quotes), while "->>" returns the extracted value as plain text (unquoted)', vi: '"->" trả về trường dưới dạng đối tượng/kiểu JSON (kèm dấu ngoặc kép), còn "->>" trả về giá trị dưới dạng chuỗi văn bản thuần (không có ngoặc kép)' },
        { en: '"->" multiplies numbers; "->>" divides numbers', vi: '"->" nhân số; "->>" chia số' },
        { en: '"->>" drops the table', vi: '"->>" xóa bảng' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The double-arrow "->>" returns unquoted text suitable for standard string comparisons and text rendering.',
        vi: 'Toán tử mũi tên đôi "->>" trả về văn bản thuần giúp so sánh chuỗi và hiển thị trực tiếp.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_json_3',
      type: 'single_choice',
      question: {
        en: 'What does the json_set() function do when passed a JSON document and path?',
        vi: 'Hàm json_set() làm nhiệm vụ gì khi nhận vào một tài liệu JSON và đường dẫn path?'
      },
      options: [
        { en: 'It inserts a new key-value pair if the key does not exist, or updates the existing value if the key already exists', vi: 'Nó chèn thêm cặp khóa-giá trị mới nếu khóa chưa tồn tại, hoặc cập nhật giá trị nếu khóa đã có sẵn' },
        { en: 'It deletes the entire JSON document', vi: 'Nó xóa toàn bộ tài liệu JSON' },
        { en: 'It turns the JSON into an XML document', vi: 'Nó biến JSON thành tài liệu XML' },
        { en: 'It sets the database server password', vi: 'Nó đặt mật khẩu máy chủ CSDL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'json_set performs an upsert-like mutation on targeted keys inside JSON structures.',
        vi: 'json_set thực hiện thao tác cập nhật hoặc chèn mới trên các khóa chỉ định trong JSON.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_json_4',
      type: 'single_choice',
      question: {
        en: 'How can you expand and unnest a JSON array (e.g. [\'sports\', \'tech\', \'news\']) into individual relational rows?',
        vi: 'Làm thế nào để bạn mở rộng và trải phẳng một mảng JSON (ví dụ: [\'sports\', \'tech\', \'news\']) thành các dòng quan hệ riêng biệt?'
      },
      options: [
        { en: 'Using table-valued JSON functions like json_each() in SQLite/PostgreSQL or jsonb_array_elements()', vi: 'Sử dụng các hàm trả về bảng như json_each() trong SQLite/PostgreSQL hoặc jsonb_array_elements()' },
        { en: 'By running DELETE FROM json_array', vi: 'Bằng cách chạy lệnh DELETE FROM json_array' },
        { en: 'By restarting the database', vi: 'Bằng cách khởi động lại CSDL' },
        { en: 'JSON arrays cannot be expanded in SQL', vi: 'Mảng JSON không thể trải phẳng trong SQL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'json_each() converts array items into discrete relational tuples for querying and joins.',
        vi: 'json_each() chuyển đổi các phần tử mảng thành từng bản ghi quan hệ để truy vấn và join.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_json_5',
      type: 'single_choice',
      question: {
        en: 'How do you index a specific JSON attribute to achieve fast B-Tree lookups?',
        vi: 'Làm thế nào để bạn đánh chỉ mục một thuộc tính JSON cụ thể nhằm đạt tốc độ tra cứu B-Tree nhanh?'
      },
      options: [
        { en: 'By creating an Expression/Functional index on the extracted JSON path (e.g. CREATE INDEX idx ON users((json_extract(meta, \'$.city\'))))', vi: 'Bằng cách tạo một chỉ mục biểu thức (Expression index) trên đường dẫn JSON trích xuất (ví dụ: CREATE INDEX idx ON users((json_extract(meta, \'$.city\'))))' },
        { en: 'By renaming the column to ID', vi: 'Bằng cách đổi tên cột thành ID' },
        { en: 'JSON fields can never be indexed', vi: 'Các trường JSON không bao giờ đánh chỉ mục được' },
        { en: 'By converting all numbers to Roman numerals', vi: 'Bằng cách chuyển số sang số La Mã' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Expression indexes evaluate the extraction expression at write time and store the extracted scalar in the B-Tree.',
        vi: 'Chỉ mục biểu thức đánh giá đường dẫn trích xuất tại thời điểm ghi và lưu giá trị vào cây B-Tree.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_json_6',
      type: 'true_false',
      question: {
        en: 'In PostgreSQL, the JSONB data type stores parsed binary JSON representations that support GIN indexing and fast lookups, unlike the plain text JSON type.',
        vi: 'Trong PostgreSQL, kiểu dữ liệu JSONB lưu trữ dữ liệu nhị phân đã phân tích cú pháp hỗ trợ chỉ mục GIN và tra cứu nhanh, khác với kiểu JSON văn bản thuần.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. JSONB is decomposed and indexed for fast analytical processing.',
        vi: 'Đúng. JSONB được phân tách cấu trúc và đánh chỉ mục để xử lý phân tích với tốc độ cao.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_json_7',
      type: 'single_choice',
      question: {
        en: 'What does the "$" character represent in a JSONPath expression?',
        vi: 'Ký tự "$" đại diện cho điều gì trong một biểu thức JSONPath?'
      },
      options: [
        { en: 'The root element of the JSON document', vi: 'Phần tử gốc (Root) của tài liệu JSON' },
        { en: 'US Currency amount', vi: 'Số tiền bằng đô la Mỹ' },
        { en: 'The end of the database connection', vi: 'Điểm kết thúc kết nối CSDL' },
        { en: 'A deleted column', vi: 'Một cột đã bị xóa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '$ specifies the root context from which child paths and array indices descend.',
        vi: '$ chỉ định ngữ cảnh gốc mà từ đó các đường dẫn con và chỉ số mảng phân nhánh.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_json_8',
      type: 'single_choice',
      question: {
        en: 'When is it appropriate to use JSON columns instead of standard normalized relational tables?',
        vi: 'Khi nào thì nên sử dụng cột JSON thay vì các bảng quan hệ chuẩn hóa thông thường?'
      },
      options: [
        { en: 'For highly polymorphic, sparse, or rapidly evolving semi-structured attributes like external API payloads, dynamic form fields, and device telemetry', vi: 'Cho các thuộc tính bán cấu trúc đa hình, thưa thớt hoặc biến đổi nhanh như webhook từ API ngoài, trường form động và dữ liệu telemetry thiết bị' },
        { en: 'For primary keys and core user password hashes', vi: 'Cho khóa chính và mật khẩu người dùng' },
        { en: 'To replace all foreign keys in every database', vi: 'Để thay thế mọi khóa ngoại trong toàn bộ CSDL' },
        { en: 'Only when running out of disk space', vi: 'Chỉ khi sắp hết dung lượng ổ cứng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'JSON columns provide flexible schema evolution for dynamic and semi-structured payloads.',
        vi: 'Cột JSON mang lại sự linh hoạt trong việc biến đổi lược đồ cho các gói dữ liệu động.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'medium'
    },
    {
      id: 'sql_q_json_9',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid built-in JSON functions in relational databases like SQLite and PostgreSQL? (Select all that apply)',
        vi: 'Những hàm nào sau đây là hàm JSON tích hợp hợp lệ trong các CSDL quan hệ như SQLite và PostgreSQL? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'json_extract()', vi: 'json_extract()' },
        { en: 'json_set()', vi: 'json_set()' },
        { en: 'json_remove()', vi: 'json_remove()' },
        { en: 'json_each()', vi: 'json_each()' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'All four are standard relational JSON manipulation functions.',
        vi: 'Cả 4 hàm trên đều là các hàm thao tác JSON tiêu chuẩn trong CSDL quan hệ.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'easy'
    },
    {
      id: 'sql_q_json_10',
      type: 'single_choice',
      question: {
        en: 'What function checks if a string is syntactically valid JSON before attempting to parse it in SQLite?',
        vi: 'Hàm nào kiểm tra xem một chuỗi có đúng cú pháp JSON hợp lệ hay không trước khi phân tích trong SQLite?'
      },
      options: [
        { en: 'json_valid()', vi: 'json_valid()' },
        { en: 'is_json_true()', vi: 'is_json_true()' },
        { en: 'verify_json()', vi: 'verify_json()' },
        { en: 'test_syntax()', vi: 'test_syntax()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'json_valid(text) returns 1 if the input is well-formed JSON, and 0 otherwise.',
        vi: 'json_valid(text) trả về 1 nếu đầu vào là JSON chuẩn cú pháp, và 0 nếu không hợp lệ.'
      },
      topicId: 'sql_json_operations',
      difficulty: 'easy'
    }
  ]
};

export default lesson27;
