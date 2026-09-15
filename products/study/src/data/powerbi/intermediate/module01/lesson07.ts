import { Lesson } from '../../../../types';

export const lesson07: Lesson = {
  id: 'pbi_lesson_7',
  moduleId: 'pbi_mod_3',
  levelId: 'intermediate',
  courseId: 'powerbi',
  order: 7,
  topicId: 'dax_calculated_columns_vs_measures',
  title: {
    en: 'DAX Syntax, Calculated Columns vs Measures',
    vi: 'Cú Pháp DAX, So Sánh Cột Tính Toán & Thước Đo (Measures)'
  },
  summary: {
    en: 'Master DAX fundamentals, distinguish static in-memory Calculated Columns from dynamic on-demand Measures.',
    vi: 'Làm chủ cú pháp DAX, phân biệt rạch ròi Cột tính toán (Calculated Column) lưu trong RAM và Thước đo (Measure) tính toán động.'
  },
  estimatedMinutes: 14,
  learn: {
    introduction: {
      en: 'Data Analysis Expressions (DAX) is the formula language for Power BI tabular models. The single most important architectural concept every Power BI developer must understand is the profound difference between a Calculated Column (evaluated per row at data refresh and stored permanently in RAM) and a Measure (evaluated dynamically on the fly based on visual filter context without consuming storage).',
      vi: 'Data Analysis Expressions (DAX) là ngôn ngữ công thức tính toán cho mô hình dữ liệu dạng bảng trong Power BI. Khái niệm kiến trúc quan trọng nhất mà mọi chuyên gia Power BI phải nắm vững là sự khác biệt bản chất giữa Cột tính toán (Calculated Column - tính cho từng dòng khi nạp dữ liệu và lưu cố định vào RAM) và Thước đo (Measure - tính toán động tại thời điểm truy vấn dựa trên ngữ cảnh bộ lọc của biểu đồ mà không tốn dung lượng lưu trữ).'
    },
    conceptExplanation: {
      en: 'Key distinctions:\n1. Calculated Columns:\n   - Evaluated row-by-row during data load/refresh.\n   - Uses Row Context.\n   - Consumes RAM and disk storage inside the VertiPaq database.\n   - Can be used in Slicers, Matrix Rows/Columns, and Axis groupings.\n2. Measures:\n   - Evaluated on demand whenever a visual renders or filter changes.\n   - Uses Filter Context.\n   - Consumes zero disk storage.\n   - Placed in the Values well of visuals.\n3. Best Practice Naming:\n   - Always refer to columns with Table prefix: TableName[ColumnName].\n   - Always refer to measures with bracket syntax without table prefix: [MeasureName].',
      vi: 'Các điểm phân biệt cốt lõi:\n1. Cột tính toán (Calculated Columns):\n   - Tính toán theo từng dòng khi nạp dữ liệu (data refresh).\n   - Hoạt động trong Ngữ cảnh dòng (Row Context).\n   - Chiếm bộ nhớ RAM và dung lượng đĩa trong VertiPaq.\n   - Dùng được làm Slicer, Phân nhóm dòng/cột Matrix và Trục biểu đồ.\n2. Thước đo (Measures):\n   - Tính toán tức thời khi vẽ biểu đồ hoặc thay đổi bộ lọc.\n   - Hoạt động trong Ngữ cảnh bộ lọc (Filter Context).\n   - Không tiêu tốn dung lượng đĩa lưu trữ.\n   - Đặt vào ô Values của biểu đồ.\n3. Quy chuẩn đặt tên chuẩn DAX:\n   - Cột luôn có tên bảng đi kèm: TênBảng[TênCột].\n   - Measure luôn viết trong ngoặc vuông không kèm tên bảng: [TênMeasure].'
    },
    syntax: '// 1. Calculated Column Definition (in Table):\nSales[Total Line Cost] = Sales[Quantity] * Sales[UnitCost]\n\n// 2. Measure Definition (Explicit):\nTotal Revenue = SUM(Sales[Revenue])\nProfit Margin = DIVIDE(SUM(Sales[Profit]), [Total Revenue], 0)',
    examples: [
      {
        title: {
          en: 'Calculated Column vs Explicit Measure',
          vi: 'So Sánh Cột Tính Toán Và Explicit Measure'
        },
        code: `// Calculated Column (Stored in RAM row-by-row):
Sales[Gross Margin Amt] = Sales[Revenue] - Sales[Cost]

// Explicit DAX Measure (Dynamic, Zero RAM storage):
Gross Margin % = DIVIDE(SUM(Sales[Profit]), SUM(Sales[Revenue]), 0)`,
        language: 'dax',
        explanation: {
          en: 'Gross Margin Amt adds a new physical column to every row in the Sales table, while Gross Margin % evaluates dynamically for any selected slice of data.',
          vi: 'Gross Margin Amt tạo thêm một cột vật lý trên từng dòng bảng Sales, trong khi Gross Margin % được tính động tức thì cho bất kỳ lát cắt dữ liệu nào.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Creating calculated columns for simple aggregations (e.g. creating a column for Total Sales) and dropping it into visuals.',
          vi: 'Tạo cột tính toán cho các phép tổng hợp đơn giản (như tạo cột Total Sales) rồi kéo vào biểu đồ.'
        },
        correction: {
          en: 'Never use calculated columns for aggregations. Always write explicit DAX measures (Total Sales = SUM(Sales[Revenue])) to save RAM and enable dynamic filtering.',
          vi: 'Không bao giờ dùng cột tính toán để tính tổng. Luôn viết explicit DAX measure (Total Sales = SUM(Sales[Revenue])) để tiết kiệm RAM và lọc động.'
        }
      },
      {
        mistake: {
          en: 'Using the "/" division operator instead of the DIVIDE() function.',
          vi: 'Dùng toán tử chia "/" thay vì hàm DIVIDE().'
        },
        correction: {
          en: 'Always use DIVIDE(Numerator, Denominator, [AlternateResult]) to safely catch division-by-zero errors and return blank/alternate values without crashing visual rendering.',
          vi: 'Luôn dùng hàm DIVIDE(TửSố, MẫuSố, [GiáTrịThayThế]) để bẫy lỗi chia cho 0 an toàn và tránh làm lỗi hiển thị biểu đồ.'
        }
      }
    ],
    tips: [
      {
        en: 'Create a dedicated disconnected empty table (e.g. "_Measures") to organize all your explicit DAX measures neatly at the top of the Data pane.',
        vi: 'Tạo một bảng trống riêng (ví dụ: "_Measures") để gom nhóm toàn bộ các measure DAX gọn gàng ở trên cùng thanh Data.'
      },
      {
        en: 'Use SHIFT + ENTER in the DAX formula bar to format complex multi-line DAX expressions cleanly with indented clauses.',
        vi: 'Dùng tổ hợp SHIFT + ENTER trên thanh công thức DAX để xuống dòng và căn lề các khối lệnh rõ ràng.'
      }
    ],
    practiceStarterCode: `// Define an explicit DAX measure using DIVIDE
Profit Margin = DIVIDE(SUM(Sales[Profit]), SUM(Sales[Revenue]), 0)`
  },
  exercisePool: [
    {
      id: 'pbi_ex_7_1',
      type: 'predict_output',
      title: {
        en: 'Calculated Column vs Measure Storage',
        vi: 'Bộ Nhớ Lưu Trữ Của Cột So Với Measure'
      },
      instruction: {
        en: 'If a dataset contains 50 million rows, which DAX object will increase the size of the .pbix file on disk: a Calculated Column or an explicit Measure?',
        vi: 'Nếu tập dữ liệu có 50 triệu dòng, đối tượng DAX nào sẽ làm tăng dung lượng tệp .pbix trên ổ đĩa: Cột tính toán hay Measure tường minh?'
      },
      starterCode: '// Choose the object that consumes disk storage',
      solutionCode: 'Calculated Column',
      options: ['Calculated Column', 'Explicit Measure', 'Implicit Measure', 'Report Tooltip'],
      correctOptionIndex: 0,
      explanation: {
        en: 'Calculated Columns evaluate and persist data for all 50 million rows into the VertiPaq columnar memory, consuming physical storage.',
        vi: 'Cột tính toán phải lưu trữ giá trị cho toàn bộ 50 triệu dòng vào bộ nhớ VertiPaq nên làm tăng dung lượng lưu trữ thực tế.'
      }
    },
    {
      id: 'pbi_ex_7_2',
      type: 'modify_example',
      title: {
        en: 'Implement Safe Division with DIVIDE()',
        vi: 'Thực Hiện Phép Chia An Toàn Bằng Hàm DIVIDE()'
      },
      instruction: {
        en: 'Rewrite the formula [Total Profit] / [Total Revenue] using the safe DIVIDE function with an alternate result of 0.',
        vi: 'Viết lại công thức [Total Profit] / [Total Revenue] dùng hàm DIVIDE an toàn với giá trị thay thế là 0.'
      },
      starterCode: 'Profit Margin = [Total Profit] / [Total Revenue]',
      solutionCode: 'Profit Margin = DIVIDE([Total Profit], [Total Revenue], 0)',
      hint: {
        en: 'DIVIDE([Total Profit], [Total Revenue], 0)',
        vi: 'DIVIDE([Total Profit], [Total Revenue], 0)'
      },
      explanation: {
        en: 'DIVIDE handles divide-by-zero occurrences without throwing runtime errors.',
        vi: 'Hàm DIVIDE tự động xử lý trường hợp chia cho 0 mà không gây lỗi giao diện.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_7',
    title: {
      en: 'Architect the Executive Measure Hierarchy',
      vi: 'Thiết Kế Hệ Thống Measure Quản Trị Chuẩn DAX'
    },
    description: {
      en: 'Write the fundamental DAX measure stack following best practices: Total Revenue, Total Cost, Total Profit, and Profit Margin.',
      vi: 'Viết bộ measure DAX cơ bản theo quy chuẩn chuẩn mực: Total Revenue, Total Cost, Total Profit và Profit Margin.'
    },
    requirements: [
      { en: '1. Total Revenue = SUM(Sales[Revenue])', vi: '1. Total Revenue = SUM(Sales[Revenue])' },
      { en: '2. Total Cost = SUM(Sales[Cost])', vi: '2. Total Cost = SUM(Sales[Cost])' },
      { en: '3. Total Profit = [Total Revenue] - [Total Cost]', vi: '3. Total Profit = [Total Revenue] - [Total Cost]' },
      { en: '4. Profit Margin = DIVIDE([Total Profit], [Total Revenue], 0)', vi: '4. Profit Margin = DIVIDE([Total Profit], [Total Revenue], 0)' }
    ],
    starterCode: `Total Revenue = SUM(Sales[Revenue])
Total Cost = SUM(Sales[Cost])
Total Profit = [Total Revenue] - [Total Cost]
Profit Margin = DIVIDE([Total Profit], [Total Revenue], 0)`,
    solutionCode: `Total Revenue = SUM(Sales[Revenue])
Total Cost = SUM(Sales[Cost])
Total Profit = [Total Revenue] - [Total Cost]
Profit Margin = DIVIDE([Total Profit], [Total Revenue], 0)`,
    hints: [
      {
        en: 'Notice that measures reference [MeasureName] without table names, ensuring reusability and clarity.',
        vi: 'Lưu ý các measure tham chiếu [TênMeasure] không kèm tên bảng giúp mã DAX dễ đọc và tái sử dụng.'
      }
    ],
    solutionExplanation: {
      en: 'Measure branching creates modular, maintainable, and high-performance DAX analytical models.',
      vi: 'Liên kết measure theo chuỗi (measure branching) tạo ra mô hình phân tích DAX chuẩn module, dễ bảo trì và tốc độ cao.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_7_1',
      type: 'single_choice',
      question: {
        en: 'Why should you prefer the DIVIDE() function over the standard "/" operator in DAX?',
        vi: 'Vì sao bạn nên ưu tiên dùng hàm DIVIDE() thay vì toán tử chia "/" trong DAX?'
      },
      options: [
        { en: 'DIVIDE handles division by zero safely without raising visual errors or crashing report visuals', vi: 'DIVIDE xử lý phép chia cho 0 an toàn mà không phát sinh lỗi hay làm hỏng biểu đồ' },
        { en: 'DIVIDE is only compatible with integer values', vi: 'DIVIDE chỉ tương thích với các giá trị số nguyên' },
        { en: 'The "/" operator does not exist in DAX', vi: 'Toán tử "/" không tồn tại trong DAX' },
        { en: 'DIVIDE automatically rounds all decimals to integers', vi: 'DIVIDE tự động làm tròn mọi số thập phân thành số nguyên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DIVIDE() catches division by zero and returns an alternate value (or blank) without failing visual rendering.',
        vi: 'DIVIDE() kiểm soát trường hợp chia cho 0 và trả về giá trị thay thế (hoặc blank) mà không làm lỗi biểu đồ.'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_7_2',
      type: 'single_choice',
      question: {
        en: 'Which of the following statements about DAX Measures is TRUE?',
        vi: 'Phát biểu nào sau đây về DAX Measure là ĐÚNG?'
      },
      options: [
        { en: 'Measures are calculated dynamically on demand based on the visual filter context and do not consume file storage', vi: 'Measure được tính toán động theo ngữ cảnh bộ lọc của biểu đồ và không làm tăng dung lượng lưu trữ tệp' },
        { en: 'Measures store calculated values row-by-row on disk during data refresh', vi: 'Measure lưu giá trị tính toán theo từng dòng vào ổ đĩa khi nạp dữ liệu' },
        { en: 'Measures cannot reference other measures', vi: 'Measure không thể tham chiếu đến các measure khác' },
        { en: 'Measures can only return text data types', vi: 'Measure chỉ có thể trả về kiểu dữ liệu văn bản' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Measures evaluate dynamically at query time based on report filter context and do not store static row values in the dataset.',
        vi: 'Measure được tính toán động tại thời điểm truy vấn dựa trên ngữ cảnh bộ lọc và không lưu tĩnh dữ liệu theo từng dòng.'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_7_3',
      type: 'single_choice',
      question: {
        en: 'Which of the following statements about Calculated Columns is TRUE?',
        vi: 'Phát biểu nào sau đây về Cột Tính Toán (Calculated Column) là ĐÚNG?'
      },
      options: [
        { en: 'Calculated Columns are computed row-by-row during data refresh and stored in memory (RAM)', vi: 'Cột tính toán được tính theo từng dòng khi nạp dữ liệu và chiếm bộ nhớ RAM' },
        { en: 'Calculated Columns recalculate every time a user clicks a slicer on a report', vi: 'Cột tính toán tính lại mỗi khi người dùng bấm vào bộ lọc trên báo cáo' },
        { en: 'Calculated Columns do not consume any memory in VertiPaq', vi: 'Cột tính toán không tiêu tốn bộ nhớ nào trong VertiPaq' },
        { en: 'Calculated Columns can only be created in Power Query', vi: 'Cột tính toán chỉ có thể tạo được trong Power Query' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Calculated columns are evaluated during data load/refresh for each row, persisting their values in the VertiPaq columnar memory.',
        vi: 'Cột tính toán được tính cho từng dòng khi nạp dữ liệu và lưu trữ giá trị trực tiếp trong bộ nhớ VertiPaq.'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_7_4',
      type: 'true_false',
      question: {
        en: 'A DAX Measure increases the .pbix file size on disk for every row added to the fact table.',
        vi: 'Một DAX Measure làm tăng dung lượng tệp .pbix trên đĩa cứng cho mỗi dòng mới được thêm vào bảng fact.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Measures only store the formula definition; they do not store per-row data, so table row count does not increase measure storage size.',
        vi: 'Sai. Measure chỉ lưu công thức định nghĩa chứ không lưu dữ liệu từng dòng, nên số dòng bảng tăng không làm tăng kích thước measure.'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_7_5',
      type: 'single_choice',
      question: {
        en: 'What is the recommended DAX naming syntax convention to clearly distinguish columns from measures?',
        vi: 'Quy ước đặt tên chuẩn trong DAX để phân biệt rõ ràng giữa cột và measure là gì?'
      },
      options: [
        { en: 'Use TableName[ColumnName] for columns and [MeasureName] without table prefix for measures', vi: 'Dùng TableName[ColumnName] cho cột và [MeasureName] không kèm tên bảng cho measure' },
        { en: 'Use [ColumnName] without table and TableName[MeasureName] for measures', vi: 'Dùng [ColumnName] không kèm bảng và TableName[MeasureName] cho measure' },
        { en: 'Always prefix all measures with $$', vi: 'Luôn thêm tiền tố $$ trước tên measure' },
        { en: 'Write all columns in lowercase and measures in uppercase', vi: 'Viết tất cả tên cột bằng chữ thường và measure bằng chữ hoa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Best practice: TableName[ColumnName] clarifies physical column lineage; [MeasureName] clarifies that the measure can evaluate across any table context.',
        vi: 'Thực hành chuẩn: TableName[ColumnName] chỉ rõ nguồn gốc cột vật lý; [MeasureName] chỉ rõ measure có thể đánh giá độc lập trên mọi bảng.'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_7_6',
      type: 'predict_output',
      question: {
        en: 'What does the DAX expression DIVIDE(100, 0, 0) evaluate to?',
        vi: 'Biểu thức DAX DIVIDE(100, 0, 0) trả về giá trị gì?'
      },
      options: [
        { en: '0', vi: '0' },
        { en: '#DIV/0! Error', vi: 'Lỗi #DIV/0!' },
        { en: '100', vi: '100' },
        { en: 'Infinity', vi: 'Infinity' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because the denominator is 0, DIVIDE returns the third argument (alternate result), which is 0.',
        vi: 'Vì mẫu số bằng 0, hàm DIVIDE trả về tham số thứ ba (kết quả thay thế), ở đây là 0.'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_7_7',
      type: 'single_choice',
      question: {
        en: 'What is the correct DAX measure syntax to calculate the total sum of the Profit column in the Sales table?',
        vi: 'Cú pháp measure DAX chuẩn để tính tổng cột Profit trong bảng Sales là gì?'
      },
      options: [
        { en: 'Total Profit = SUM(Sales[Profit])', vi: 'Total Profit = SUM(Sales[Profit])' },
        { en: 'Total Profit := ADD(Sales[Profit])', vi: 'Total Profit := ADD(Sales[Profit])' },
        { en: 'Total Profit = COUNT(Sales[Profit])', vi: 'Total Profit = COUNT(Sales[Profit])' },
        { en: 'Total Profit = Sales[Profit].sum()', vi: 'Total Profit = Sales[Profit].sum()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The standard DAX syntax is MeasureName = SUM(TableName[ColumnName]).',
        vi: 'Cú pháp DAX chuẩn là MeasureName = SUM(TableName[ColumnName]).'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_7_8',
      type: 'multiple_choice',
      question: {
        en: 'When can a Calculated Column be legitimately required in Power BI? (Select all that apply)',
        vi: 'Khi nào việc sử dụng Cột Tính Toán (Calculated Column) là thực sự cần thiết trong Power BI? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'When you need to use the calculated values in a Slicer or Page Filter', vi: 'Khi bạn cần dùng giá trị tính toán đó làm Slicer hoặc Bộ lọc trang' },
        { en: 'When you need to use the calculated values as the Rows or Columns axis in a Matrix', vi: 'Khi bạn cần dùng giá trị đó làm trục Dòng hoặc Cột trong bảng Matrix' },
        { en: 'When you need to define a Sort-By Column for custom sorting order', vi: 'Khi bạn cần định nghĩa cột Sort-By để sắp xếp thứ tự tùy biến' },
        { en: 'For every single arithmetic sum calculation', vi: 'Cho mọi phép tính cộng tổng đơn giản' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Calculated columns are required when the result must act as a filter dimension (slicers, matrix headers, custom sort orders). Aggregations should always be measures.',
        vi: 'Cột tính toán cần thiết khi kết quả phải đóng vai trò là một chiều lọc (slicer, tiêu đề matrix, sắp xếp tùy biến). Phép tổng hợp số liệu luôn phải là measure.'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'hard'
    },
    {
      id: 'pbi_q_7_9',
      type: 'true_false',
      question: {
        en: 'An Implicit Measure (created by dragging a raw column into a visual and choosing "Sum") is preferred over an Explicit DAX Measure.',
        vi: 'Một Implicit Measure (tạo bằng cách kéo cột thô vào biểu đồ rồi chọn "Sum") được khuyến khích sử dụng hơn Explicit DAX Measure.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Best practice strictly demands Explicit DAX Measures because they can be reused across multiple visuals, referenced by other measures, and formatted centrally.',
        vi: 'Sai. Thực hành chuẩn mực bắt buộc dùng Explicit DAX Measure vì có thể tái sử dụng trên nhiều biểu đồ, được tham chiếu bởi measure khác và định dạng tập trung.'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_7_10',
      type: 'single_choice',
      question: {
        en: 'What is "Measure Branching" in DAX development?',
        vi: '"Measure Branching" (Liên kết chuỗi Measure) trong phát triển DAX là gì?'
      },
      options: [
        {
          en: 'Building complex high-level measures by chaining and referencing simpler base measures (e.g. Profit Margin referencing [Total Profit] and [Total Revenue])',
          vi: 'Xây dựng các measure cấp cao phức tạp bằng cách liên kết và tham chiếu các measure cơ sở đơn giản (ví dụ: Profit Margin tham chiếu [Total Profit] và [Total Revenue])'
        },
        {
          en: 'Branching Git repositories for Power BI files',
          vi: 'Tạo nhánh Git cho tệp Power BI'
        },
        {
          en: 'Splitting a table into 10 smaller tables',
          vi: 'Tách một bảng thành 10 bảng nhỏ'
        },
        {
          en: 'Creating circular loops in relationship models',
          vi: 'Tạo các vòng lặp trong mô hình quan hệ'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Measure branching creates a clean modular hierarchy of formulas, reducing duplication and easing maintenance.',
        vi: 'Measure branching tạo ra cây phân cấp công thức dạng module gọn gàng, giảm trùng lặp và giúp bảo trì dễ dàng.'
      },
      topicId: 'dax_calculated_columns_vs_measures',
      difficulty: 'medium'
    }
  ]
};

export default lesson07;
