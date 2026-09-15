import { Lesson } from '../../../../types';

export const lesson02: Lesson = {
  id: 'pbi_lesson_2',
  moduleId: 'pbi_mod_1',
  levelId: 'basic',
  courseId: 'powerbi',
  order: 2,
  topicId: 'power_query_etl',
  title: {
    en: 'Power Query: Importing, Cleaning, Transforming & Profiling Data',
    vi: 'Power Query: Nạp Dữ Liệu, Làm Sạch, Chuyển Đổi & Phân Tích Chất Lượng'
  },
  summary: {
    en: 'Clean, reshape, unpivot, filter, profile data quality, and inspect the M Language Applied Steps pipeline.',
    vi: 'Làm sạch, tái cấu trúc, unpivot xoay bảng, lọc dòng, kiểm tra chất lượng dữ liệu và kiểm soát chuỗi Applied Steps ngôn ngữ M.'
  },
  estimatedMinutes: 14,
  learn: {
    introduction: {
      en: 'Power Query is the dedicated Extract, Transform, and Load (ETL) engine inside Power BI. Every transformation performed via the visual UI is recorded sequentially as a functional step in the Applied Steps list, generating declarative M code in the Advanced Editor. High-quality data modeling begins with clean, unpivoted, and accurately typed tables in Power Query.',
      vi: 'Power Query là bộ máy trích xuất, biến đổi và nạp dữ liệu (ETL) chuyên dụng trong Power BI. Mọi thao tác chỉnh sửa trên giao diện trực quan đều được ghi lại tuần tự thành các bước trong danh sách Applied Steps, tự động sinh mã M trong Advanced Editor. Một mô hình dữ liệu chuẩn mực bắt đầu từ những bảng dữ liệu sạch, đã unpivot và đúng kiểu dữ liệu trong Power Query.'
    },
    conceptExplanation: {
      en: 'Core Power Query operations include: 1) Promoting first rows as headers, 2) Correcting data types (Text, Whole Number, Decimal Number, Date), 3) Unpivoting wide matrix columns into tall normalized attribute-value pairs, 4) Removing duplicates and null values, 5) Merging queries (SQL Joins) and Appending queries (SQL Union All), and 6) Utilizing Column Quality, Column Distribution, and Column Profile tools to detect errors, nulls, and outliers.',
      vi: 'Các thao tác cốt lõi trong Power Query gồm: 1) Nâng dòng đầu làm tiêu đề (Use First Row as Headers), 2) Chuẩn hóa kiểu dữ liệu (Văn bản, Số nguyên, Số thập phân, Ngày tháng), 3) Unpivot chuyển bảng ngang thành bảng dọc chuẩn hóa (Attribute - Value), 4) Xóa trùng lặp và loại bỏ giá trị null, 5) Gộp truy vấn Merge (Join) và Append (Union All), và 6) Sử dụng công cụ Column Quality, Column Distribution, Column Profile để phát hiện lỗi, tỷ lệ trống và giá trị ngoại lai.'
    },
    syntax: '// M Language Query Structure in Advanced Editor:\nlet\n    Source = Csv.Document(File.Contents("C:\\Data\\Sales.csv"), [Delimiter=",", Encoding=65001]),\n    PromotedHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),\n    ChangedType = Table.TransformColumnTypes(PromotedHeaders, {{"OrderID", Int64.Type}, {"Revenue", type number}, {"OrderDate", type date}}),\n    FilteredRows = Table.SelectRows(ChangedType, each [Revenue] > 0)\nin\n    FilteredRows',
    examples: [
      {
        title: {
          en: 'Unpivoting Monthly Columns into a Normalized Table',
          vi: 'Unpivot Các Cột Tháng Thành Bảng Dọc Chuẩn Hóa'
        },
        code: `// Wide input: Product | Jan_Sales | Feb_Sales | Mar_Sales
// M Transformation:
= Table.UnpivotOtherColumns(#"Promoted Headers", {"Product"}, "Month", "SalesAmount")
// Result: Product | Month | SalesAmount (Tall Normalized Format)`,
        language: 'powerquery',
        explanation: {
          en: 'Unpivoting converts wide cross-tabulated reports into tall tabular rows, allowing relational DAX star schemas to slice time seamlessly.',
          vi: 'Unpivot biến bảng ngang nhiều cột tháng thành các dòng dọc chuẩn hóa, giúp mô hình Star Schema trong DAX dễ dàng phân tích theo thời gian.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Leaving dates and numbers formatted as generic "Any" or "Text" data types.',
          vi: 'Để các cột ngày tháng và số ở kiểu dữ liệu chung chung "Any" hoặc "Text".'
        },
        correction: {
          en: 'Always explicitly assign correct data types (Date, Decimal Number, Int64) in Power Query so VertiPaq can optimize compression and DAX can perform arithmetic.',
          vi: 'Luôn gán kiểu dữ liệu chuẩn xác (Date, Decimal Number, Int64) trong Power Query để VertiPaq tối ưu nén và DAX có thể tính toán số học.'
        }
      },
      {
        mistake: {
          en: 'Performing unpivoting or row-level joins using DAX instead of upstream in Power Query.',
          vi: 'Thực hiện unpivot hoặc gộp bảng bằng DAX thay vì làm ngay từ đầu trong Power Query.'
        },
        correction: {
          en: 'Follow Roche\'s Maxim of Data Transformation: Transform data as far upstream as possible, and as far downstream as necessary.',
          vi: 'Tuân thủ nguyên tắc vàng của Roche: Biến đổi dữ liệu càng sớm càng tốt (ở tầng nguồn/Power Query) và chỉ chuyển xuống hạ nguồn khi thực sự cần thiết.'
        }
      }
    ],
    tips: [
      {
        en: 'Enable "Column Quality" and "Column Distribution" under the View tab in Power Query to instantly see the % of Valid, Error, and Empty rows in every column.',
        vi: 'Bật tùy chọn "Column Quality" và "Column Distribution" trong thẻ View của Power Query để thấy ngay tỷ lệ % dòng Hợp lệ, Lỗi và Trống của từng cột.'
      },
      {
        en: 'Disable "Enable Load" for intermediate staging queries that are only used as building blocks for merges, saving memory in the final model.',
        vi: 'Bỏ chọn "Enable Load" đối với các bảng trung gian chỉ dùng để merge/append, giúp tiết kiệm bộ nhớ RAM cho mô hình dữ liệu chính.'
      }
    ],
    practiceStarterCode: `// M Code for data cleansing pipeline
let
    Source = Csv.Document(File.Contents("Sales.csv")),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"Revenue", type number}, {"Quantity", Int64.Type}})
in
    #"Changed Type"`
  },
  exercisePool: [
    {
      id: 'pbi_ex_2_1',
      type: 'predict_output',
      title: {
        en: 'Identify the Unpivot Operation Purpose',
        vi: 'Xác Định Mục Đích Của Thao Tác Unpivot'
      },
      instruction: {
        en: 'When a raw dataset contains columns named [Jan], [Feb], [Mar] containing sales amounts, what is the best Power Query transformation to prepare it for Star Schema modeling?',
        vi: 'Khi dữ liệu thô có các cột tên [Jan], [Feb], [Mar] chứa doanh thu, thao tác nào trong Power Query là tối ưu nhất để chuẩn bị cho mô hình Star Schema?'
      },
      starterCode: '// Choose the best transformation',
      solutionCode: 'Unpivot Columns',
      options: ['Unpivot Columns', 'Transpose Table', 'Pivot Column', 'Group By Month'],
      correctOptionIndex: 0,
      explanation: {
        en: 'Unpivoting transforms wide multiple-month columns into two normalized columns: "Month" and "Value", creating a tall table ideal for dimensional modeling.',
        vi: 'Unpivot chuyển đổi các cột tháng ngang thành 2 cột chuẩn hóa: "Tháng" và "Giá trị", tạo ra bảng dọc hoàn hảo cho việc mô hình hóa quan hệ.'
      }
    },
    {
      id: 'pbi_ex_2_2',
      type: 'fix_code',
      title: {
        en: 'Fix Power Query Type Transformation',
        vi: 'Sửa Khai Báo Kiểu Dữ Liệu Trong Power Query'
      },
      instruction: {
        en: 'Ensure Revenue is converted to a numeric type (type number) in the M transformation step.',
        vi: 'Đảm bảo cột Revenue được chuyển sang kiểu số (type number) trong bước biến đổi M.'
      },
      starterCode: 'Table.TransformColumnTypes(Source, {{"Revenue", type text}})',
      solutionCode: 'Table.TransformColumnTypes(Source, {{"Revenue", type number}})',
      hint: {
        en: 'Change "type text" to "type number"',
        vi: 'Đổi "type text" thành "type number"'
      },
      explanation: {
        en: 'Numeric data types are required for DAX aggregations like SUM, AVERAGE, and CALCULATE.',
        vi: 'Cần kiểu dữ liệu số để các hàm DAX như SUM, AVERAGE và CALCULATE có thể tính toán.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_2',
    title: {
      en: 'Build an Automated Power Query Cleansing Pipeline',
      vi: 'Xây Dựng Quy Trình Làm Sạch Dữ Liệu Power Query'
    },
    description: {
      en: 'Complete the M script that imports sales data, promotes headers, converts types, and filters out null orders.',
      vi: 'Hoàn thiện đoạn mã M nhập dữ liệu bán hàng, nâng tiêu đề, ép kiểu và lọc bỏ các đơn hàng rỗng.'
    },
    requirements: [
      { en: '1. Promote headers using Table.PromoteHeaders', vi: '1. Nâng tiêu đề bằng Table.PromoteHeaders' },
      { en: '2. Cast OrderID to Int64.Type and Revenue to type number', vi: '2. Ép kiểu OrderID sang Int64.Type và Revenue sang type number' },
      { en: '3. Filter rows where Revenue is greater than 0', vi: '3. Lọc các dòng có Revenue lớn hơn 0' }
    ],
    starterCode: `let
    Source = Csv.Document(File.Contents("SalesData.csv")),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"OrderID", Int64.Type}, {"Revenue", type number}}),
    #"Filtered Rows" = Table.SelectRows(#"Changed Type", each [Revenue] > 0)
in
    #"Filtered Rows"`,
    solutionCode: `let
    Source = Csv.Document(File.Contents("SalesData.csv")),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"OrderID", Int64.Type}, {"Revenue", type number}}),
    #"Filtered Rows" = Table.SelectRows(#"Changed Type", each [Revenue] > 0)
in
    #"Filtered Rows"`,
    hints: [
      {
        en: 'Review the sequential let...in block where each step feeds into the subsequent transformation.',
        vi: 'Kiểm tra khối let...in tuần tự nơi mỗi bước lấy kết quả của bước trước đó làm dữ liệu đầu vào.'
      }
    ],
    solutionExplanation: {
      en: 'This Power Query pipeline guarantees that loaded dataset rows have valid non-null numbers ready for high-speed VertiPaq indexing.',
      vi: 'Quy trình Power Query này đảm bảo các dòng dữ liệu nạp vào đều hợp lệ, không rỗng và sẵn sàng cho VertiPaq lập chỉ mục tốc độ cao.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_2_1',
      type: 'single_choice',
      question: {
        en: 'What feature in Power Query shows the percentage of Valid, Error, and Empty values directly above each column header?',
        vi: 'Tính năng nào trong Power Query hiển thị tỷ lệ % giá trị Hợp lệ (Valid), Lỗi (Error) và Trống (Empty) ngay trên tiêu đề mỗi cột?'
      },
      options: [
        { en: 'Column Quality', vi: 'Column Quality (Chất lượng cột)' },
        { en: 'Column Distribution', vi: 'Column Distribution' },
        { en: 'Column Profile', vi: 'Column Profile' },
        { en: 'Monospaced Font', vi: 'Monospaced Font' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Column Quality displays visual progress bars indicating the exact percentages of valid, error-containing, and null/empty rows in the sampled data.',
        vi: 'Column Quality hiển thị thanh đo tỷ lệ phần trăm chính xác của các dòng hợp lệ, dòng lỗi và dòng rỗng trong mẫu dữ liệu.'
      },
      topicId: 'power_query_etl',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_2_2',
      type: 'single_choice',
      question: {
        en: 'What is the key transformation used to turn a "wide" table with 12 monthly columns (Jan-Dec) into a "tall" 2-column format (Month, Amount)?',
        vi: 'Thao tác chuyển đổi trọng yếu nào dùng để biến một bảng "ngang" có 12 cột tháng (Tháng 1-12) thành bảng "dọc" chuẩn 2 cột (Tháng, Số tiền)?'
      },
      options: [
        { en: 'Unpivot Columns', vi: 'Unpivot Columns (Xoay dọc cột)' },
        { en: 'Pivot Column', vi: 'Pivot Column' },
        { en: 'Transpose Table', vi: 'Transpose Table' },
        { en: 'Split Column by Delimiter', vi: 'Split Column by Delimiter' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Unpivot Columns takes selected column headers and turns them into attribute values in a single column while gathering their respective values into a measure column.',
        vi: 'Unpivot Columns gom tiêu đề các cột đã chọn thành một cột thuộc tính duy nhất và tập hợp các giá trị tương ứng vào một cột số liệu.'
      },
      topicId: 'power_query_etl',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_2_3',
      type: 'single_choice',
      question: {
        en: 'In Power Query, what operation is equivalent to a SQL JOIN (combining columns from two tables based on a matching key)?',
        vi: 'Trong Power Query, thao tác nào tương đương với lệnh JOIN trong SQL (kết hợp các cột từ hai bảng dựa trên khóa chung)?'
      },
      options: [
        { en: 'Merge Queries', vi: 'Merge Queries (Gộp truy vấn)' },
        { en: 'Append Queries', vi: 'Append Queries' },
        { en: 'Group By', vi: 'Group By' },
        { en: 'Duplicate Column', vi: 'Duplicate Column' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Merge Queries joins two tables horizontally based on matching key columns (Left Outer, Inner, Full Outer, etc.), just like SQL JOIN.',
        vi: 'Merge Queries kết hợp hai bảng theo chiều ngang dựa trên cột khóa chung (Left Outer, Inner, Full Outer,...), tương tự lệnh JOIN trong SQL.'
      },
      topicId: 'power_query_etl',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_2_4',
      type: 'single_choice',
      question: {
        en: 'In Power Query, what operation is equivalent to a SQL UNION ALL (stacking rows from two tables with identical schema on top of each other)?',
        vi: 'Trong Power Query, thao tác nào tương đương với lệnh UNION ALL trong SQL (xếp chồng các dòng từ hai bảng có cùng cấu trúc cột lên nhau)?'
      },
      options: [
        { en: 'Append Queries', vi: 'Append Queries (Nối thêm truy vấn)' },
        { en: 'Merge Queries', vi: 'Merge Queries' },
        { en: 'Pivot Columns', vi: 'Pivot Columns' },
        { en: 'Extract Text', vi: 'Extract Text' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Append Queries concatenates tables vertically, stacking rows together just like a SQL UNION / UNION ALL.',
        vi: 'Append Queries nối các bảng theo chiều dọc, xếp chồng các dòng dữ liệu lên nhau tương tự lệnh UNION ALL trong SQL.'
      },
      topicId: 'power_query_etl',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_2_5',
      type: 'true_false',
      question: {
        en: 'Disabling "Enable Load" on a staging query in Power Query removes the query from being loaded into the Power BI memory model, while still allowing other queries to reference it.',
        vi: 'Bỏ chọn "Enable Load" trên một truy vấn trung gian trong Power Query sẽ ngăn bảng đó nạp vào bộ nhớ RAM của Power BI, nhưng các truy vấn khác vẫn có thể tham chiếu đến nó.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Disabling Enable Load prevents unnecessary tables from consuming model RAM while preserving them as ETL transformation dependencies.',
        vi: 'Đúng. Tắt Enable Load giúp bảng trung gian không chiếm RAM của mô hình nhưng vẫn đóng vai trò là bước nguồn phục vụ merge/append.'
      },
      topicId: 'power_query_etl',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_2_6',
      type: 'single_choice',
      question: {
        en: 'Where can you view and edit the raw, underlying M code generated by Power Query steps?',
        vi: 'Bạn có thể xem và chỉnh sửa toàn bộ mã M gốc được tạo ra bởi các bước trong Power Query ở đâu?'
      },
      options: [
        { en: 'Advanced Editor', vi: 'Advanced Editor (Trình soạn thảo nâng cao)' },
        { en: 'DAX Formula Bar', vi: 'DAX Formula Bar' },
        { en: 'Selection Pane', vi: 'Selection Pane' },
        { en: 'Bookmarks Navigator', vi: 'Bookmarks Navigator' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Advanced Editor (Home tab > Advanced Editor) displays the complete let...in M code definition for the active query.',
        vi: 'Advanced Editor (trong thẻ Home > Advanced Editor) hiển thị toàn bộ khối mã M dạng let...in của truy vấn đang chọn.'
      },
      topicId: 'power_query_etl',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_2_7',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid data types available in Power Query? (Select all that apply)',
        vi: 'Những kiểu dữ liệu nào sau đây là kiểu dữ liệu hợp lệ trong Power Query? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Decimal Number', vi: 'Số thập phân (Decimal Number)' },
        { en: 'Whole Number (Int64.Type)', vi: 'Số nguyên (Whole Number)' },
        { en: 'Date / Time', vi: 'Ngày / Giờ (Date / Time)' },
        { en: 'VBA Pointer', vi: 'Con trỏ VBA' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Decimal Number, Whole Number, Text, Date, DateTime, and Boolean are standard Power Query data types.',
        vi: 'Decimal Number, Whole Number, Text, Date, DateTime và Boolean là các kiểu dữ liệu chuẩn trong Power Query.'
      },
      topicId: 'power_query_etl',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_2_8',
      type: 'single_choice',
      question: {
        en: 'What is "Query Folding" in Power Query?',
        vi: '"Query Folding" trong Power Query là gì?'
      },
      options: [
        {
          en: 'The capability of Power Query to translate M transformation steps into a native database query (e.g. SQL) executed directly on the source server',
          vi: 'Khả năng của Power Query tự động dịch các bước biến đổi M thành câu truy vấn cơ sở dữ liệu gốc (như SQL) và thực thi trực tiếp trên máy chủ nguồn'
        },
        {
          en: 'Folding report visuals into a zip archive',
          vi: 'Nén các biểu đồ báo cáo vào tệp zip'
        },
        {
          en: 'Hiding all columns in the Data pane',
          vi: 'Ẩn toàn bộ các cột trong bảng dữ liệu'
        },
        {
          en: 'Deleting duplicate rows automatically without confirmation',
          vi: 'Tự động xóa các dòng trùng lặp mà không cần xác nhận'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Query folding pushes transformation logic back to the source database server (like SQL Server), dramatically speeding up ETL refresh and reducing memory consumption.',
        vi: 'Query folding đẩy các bước lọc và tính toán về thực thi trực tiếp trên máy chủ cơ sở dữ liệu (như SQL Server), giúp tăng tốc nạp dữ liệu và giảm tải bộ nhớ.'
      },
      topicId: 'power_query_etl',
      difficulty: 'hard'
    },
    {
      id: 'pbi_q_2_9',
      type: 'true_false',
      question: {
        en: 'The M formula language used in Power Query is case-sensitive (e.g., Table.SelectRows is different from table.selectrows).',
        vi: 'Ngôn ngữ công thức M trong Power Query có phân biệt chữ hoa và chữ thường (ví dụ: Table.SelectRows khác với table.selectrows).'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Unlike DAX (which is case-insensitive), M formula language is strictly case-sensitive in all function names, identifiers, and syntax.',
        vi: 'Đúng. Khác với DAX (không phân biệt chữ hoa thường), ngôn ngữ M phân biệt chữ hoa chữ thường tuyệt đối trong tên hàm, biến và cú pháp.'
      },
      topicId: 'power_query_etl',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_2_10',
      type: 'predict_output',
      question: {
        en: 'In Power Query M code: Table.SelectRows(Source, each [Status] = "Completed"). What does this step do?',
        vi: 'Trong mã M Power Query: Table.SelectRows(Source, each [Status] = "Completed"). Bước này thực hiện điều gì?'
      },
      options: [
        {
          en: 'Filters the table to retain only rows where the Status column equals "Completed"',
          vi: 'Lọc bảng dữ liệu để chỉ giữ lại các dòng có giá trị cột Status bằng "Completed"'
        },
        {
          en: 'Renames the column Status to Completed',
          vi: 'Đổi tên cột Status thành Completed'
        },
        {
          en: 'Deletes all Completed transactions from the database',
          vi: 'Xóa toàn bộ các giao dịch Completed khỏi cơ sở dữ liệu'
        },
        {
          en: 'Replaces all null values with the text Completed',
          vi: 'Thay thế tất cả giá trị null bằng chữ Completed'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Table.SelectRows evaluates the boolean condition for each row and outputs a filtered table containing only matching rows.',
        vi: 'Table.SelectRows đánh giá điều kiện logic cho từng dòng và trả về bảng mới chỉ chứa các dòng thỏa mãn điều kiện.'
      },
      topicId: 'power_query_etl',
      difficulty: 'easy'
    }
  ]
};

export default lesson02;
