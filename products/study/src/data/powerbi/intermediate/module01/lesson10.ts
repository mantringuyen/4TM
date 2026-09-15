import { Lesson } from '../../../../types';

export const lesson10: Lesson = {
  id: 'pbi_lesson_10',
  moduleId: 'pbi_mod_3',
  levelId: 'intermediate',
  courseId: 'powerbi',
  order: 10,
  topicId: 'dax_calculate_modifiers',
  title: {
    en: 'CALCULATE and Filter Modifiers: ALL, REMOVEFILTERS, ALLEXCEPT',
    vi: 'Hàm CALCULATE & Các Hàm Biến Đổi Bộ Lọc: ALL, REMOVEFILTERS, ALLEXCEPT'
  },
  summary: {
    en: 'Master CALCULATE, the most powerful function in DAX, and manipulate filter contexts using ALL, REMOVEFILTERS, and ALLEXCEPT.',
    vi: 'Làm chủ CALCULATE - hàm quyền năng nhất trong DAX, điều khiển linh hoạt ngữ cảnh bộ lọc bằng ALL, REMOVEFILTERS và ALLEXCEPT.'
  },
  estimatedMinutes: 16,
  learn: {
    introduction: {
      en: 'CALCULATE is the single most important and powerful function in DAX. It is the only function capable of modifying, adding, replacing, or removing existing Filter Contexts during formula evaluation. By pairing CALCULATE with filter modifiers like REMOVEFILTERS(), ALL(), and ALLEXCEPT(), you can calculate market shares, % of totals, baselines, and cross-category comparisons effortlessly.',
      vi: 'CALCULATE là hàm quan trọng và quyền năng bậc nhất trong DAX. Đây là hàm duy nhất có khả năng chỉnh sửa, bổ sung, ghi đè hoặc loại bỏ các Ngữ cảnh bộ lọc (Filter Context) đang hoạt động trong quá trình tính toán. Bằng cách kết hợp CALCULATE với các hàm biến đổi bộ lọc như REMOVEFILTERS(), ALL(), và ALLEXCEPT(), bạn có thể dễ dàng tính toán thị phần, tỷ trọng % trên tổng số, đường cơ sở và các phân tích so sánh chéo.'
    },
    conceptExplanation: {
      en: 'Key CALCULATE mechanics and modifiers:\n1. CALCULATE(Expression, [Filter1], [Filter2], ...):\n   - First evaluates and merges all filter arguments into a new filter context.\n   - Second, evaluates the expression within that modified filter context.\n2. REMOVEFILTERS(): Clears filters from specified tables or columns (pure filter modifier).\n3. ALL(): Acts as a filter modifier inside CALCULATE to remove filters, or as a table function returning unique rows when used standalone.\n4. ALLEXCEPT(): Clears all filters from a table EXCEPT for specified columns.\n5. Calculating % of Total:\n   % of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products)))',
      vi: 'Cơ chế hoạt động của CALCULATE và các hàm biến đổi:\n1. Cú pháp CALCULATE(BiểuThức, [BộLọc1], [BộLọc2], ...):\n   - Đầu tiên đánh giá và gộp các điều kiện lọc vào một ngữ cảnh bộ lọc mới.\n   - Sau đó tính toán BiểuThức bên trong ngữ cảnh bộ lọc đã được sửa đổi đó.\n2. REMOVEFILTERS(): Xóa bỏ hoàn toàn bộ lọc trên các bảng hoặc cột chỉ định (thuần túy là filter modifier).\n3. ALL(): Đóng vai trò là filter modifier trong CALCULATE để xóa bộ lọc, hoặc là hàm trả về bảng chứa các giá trị duy nhất khi dùng độc lập.\n4. ALLEXCEPT(): Xóa tất cả bộ lọc trên bảng NGOẠI TRỪ các cột được chỉ định giữ lại.\n5. Công thức tính Tỷ trọng % trên tổng:\n   % of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products)))'
    },
    syntax: '// CALCULATE basic pattern:\nCALCULATE([Total Sales], Dim_Products[Category] = "Audio")\n\n// Calculating Percent of Grand Total:\nSales Grand Total = CALCULATE([Total Sales], REMOVEFILTERS(Fact_Sales))\n% of Grand Total = DIVIDE([Total Sales], [Sales Grand Total], 0)',
    examples: [
      {
        title: {
          en: 'Category Market Share with REMOVEFILTERS',
          vi: 'Tính Tỷ Trọng Thị Phần Danh Mục Bằng REMOVEFILTERS'
        },
        code: `// Market Share Calculation:
Total Revenue = SUM(Fact_Sales[Revenue])

All Products Revenue = 
CALCULATE(
    [Total Revenue],
    REMOVEFILTERS(Dim_Products)
)

Product Market Share % = 
DIVIDE(
    [Total Revenue],
    [All Products Revenue],
    0
)`,
        language: 'dax',
        explanation: {
          en: 'REMOVEFILTERS clears any slicer or visual row filter on Dim_Products, computing the denominator across all products for accurate percentage shares.',
          vi: 'REMOVEFILTERS gỡ bỏ mọi bộ lọc trên Dim_Products, tính toán mẫu số trên toàn bộ sản phẩm để ra tỷ trọng % chính xác.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using ALL(Dim_Products[Category]) when you intended to remove filters from the entire Dim_Products table.',
          vi: 'Chỉ dùng ALL(Dim_Products[Category]) trong khi ý định thực sự là muốn xóa bộ lọc trên toàn bộ bảng Dim_Products.'
        },
        correction: {
          en: 'Passing only a single column to ALL/REMOVEFILTERS leaves other columns (e.g. SubCategory, Brand) filtered. Pass the entire table (REMOVEFILTERS(Dim_Products)) to remove all product filters.',
          vi: 'Truyền 1 cột vào ALL/REMOVEFILTERS sẽ giữ nguyên bộ lọc trên các cột khác (như Brand, Subcategory). Hãy truyền cả bảng (REMOVEFILTERS(Dim_Products)) để xóa sạch bộ lọc sản phẩm.'
        }
      },
      {
        mistake: {
          en: 'Writing complex FILTER(ALL(Table), Table[Col] = "Val") when a simple boolean predicate Table[Col] = "Val" suffices.',
          vi: 'Viết FILTER(ALL(Bảng), Bảng[Cột] = "GiáTrị") rườm rà khi chỉ cần viết điều kiện logic đơn giản Bảng[Cột] = "GiáTrị".'
        },
        correction: {
          en: 'In modern DAX, CALCULATE([Measure], Table[Col] = "Val") is automatically optimized by the VertiPaq engine.',
          vi: 'Trong DAX hiện đại, cú pháp CALCULATE([Measure], Bảng[Cột] = "GiáTrị") được bộ máy VertiPaq tự động tối ưu hóa hiệu năng cao nhất.'
        }
      }
    ],
    tips: [
      {
        en: 'Prefer REMOVEFILTERS() over ALL() when your intent is solely to clear filters inside CALCULATE, as REMOVEFILTERS explicitly expresses developer intent.',
        vi: 'Nên ưu tiên dùng REMOVEFILTERS() thay cho ALL() khi mục đích duy nhất là xóa bộ lọc trong CALCULATE, vì nó thể hiện rõ ràng ý định của lập trình viên.'
      },
      {
        en: 'Use KEEPFILTERS() inside CALCULATE if you want your new filter predicate to intersect with (rather than overwrite) existing slicer selections.',
        vi: 'Dùng KEEPFILTERS() bên trong CALCULATE nếu bạn muốn điều kiện lọc mới giao nhau (intersect) chứ không ghi đè lên các lựa chọn slicer hiện có.'
      }
    ],
    practiceStarterCode: `// DAX calculation using CALCULATE and REMOVEFILTERS
All Category Sales = CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products[Category]))`
  },
  exercisePool: [
    {
      id: 'pbi_ex_10_1',
      type: 'predict_output',
      title: {
        en: 'Identify CALCULATE Behavior with ALL',
        vi: 'Nhận Diện Hành Vi Của CALCULATE Với ALL'
      },
      instruction: {
        en: 'When placed in a Matrix displaying sales by Product Category, what does CALCULATE([Total Sales], ALL(Dim_Products)) return for each row?',
        vi: 'Khi đặt vào bảng Matrix hiển thị doanh số theo Danh mục sản phẩm, công thức CALCULATE([Total Sales], ALL(Dim_Products)) trả về giá trị gì cho mỗi dòng?'
      },
      starterCode: '// Choose returned value',
      solutionCode: 'The Grand Total sales across all product categories',
      options: [
        'The Grand Total sales across all product categories',
        'The sales of that specific row category only',
        'Zero for all categories',
        'An empty matrix'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'ALL(Dim_Products) clears the row filter context for each category, returning the grand total of all products across every row.',
        vi: 'ALL(Dim_Products) xóa bỏ bộ lọc dòng của từng danh mục, trả về tổng chung của toàn bộ sản phẩm trên mọi dòng.'
      }
    },
    {
      id: 'pbi_ex_10_2',
      type: 'complete_code',
      title: {
        en: 'Write Percent of Total Formula',
        vi: 'Viết Công Thức Tính Tỷ Trọng Phần Trăm'
      },
      instruction: {
        en: 'Complete the DAX measure to calculate % of Total Sales by removing filters from Dim_Products.',
        vi: 'Hoàn thiện measure DAX để tính % of Total Sales bằng cách xóa bộ lọc từ Dim_Products.'
      },
      starterCode: '% of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(___)), 0)',
      solutionCode: '% of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products)), 0)',
      hint: {
        en: 'Dim_Products',
        vi: 'Dim_Products'
      },
      explanation: {
        en: 'REMOVEFILTERS(Dim_Products) clears all product filters in the denominator to calculate the true percentage share.',
        vi: 'REMOVEFILTERS(Dim_Products) xóa toàn bộ bộ lọc sản phẩm ở mẫu số để tính tỷ trọng phần trăm chính xác.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_10',
    title: {
      en: 'Build Complete Category Market Share Model',
      vi: 'Xây Dựng Mô Hình Phân Tích Thị Phần Toàn Diện'
    },
    description: {
      en: 'Declare the complete DAX suite: Total Sales, Audio Sales (filtered), Total Company Sales (unfiltered), and Audio Market Share.',
      vi: 'Khai báo bộ measure DAX hoàn chỉnh: Total Sales, Doanh thu Audio (đã lọc), Doanh thu Toàn công ty (gỡ lọc), và Tỷ trọng thị phần Audio.'
    },
    requirements: [
      { en: '1. Total Sales = SUM(Fact_Sales[Revenue])', vi: '1. Total Sales = SUM(Fact_Sales[Revenue])' },
      { en: '2. Audio Sales = CALCULATE([Total Sales], Dim_Products[Category] = "Audio")', vi: '2. Audio Sales = CALCULATE([Total Sales], Dim_Products[Category] = "Audio")' },
      { en: '3. Total All Sales = CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products))', vi: '3. Total All Sales = CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products))' },
      { en: '4. Audio Share % = DIVIDE([Audio Sales], [Total All Sales], 0)', vi: '4. Audio Share % = DIVIDE([Audio Sales], [Total All Sales], 0)' }
    ],
    starterCode: `Total Sales = SUM(Fact_Sales[Revenue])
Audio Sales = CALCULATE([Total Sales], Dim_Products[Category] = "Audio")
Total All Sales = CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products))
Audio Share % = DIVIDE([Audio Sales], [Total All Sales], 0)`,
    solutionCode: `Total Sales = SUM(Fact_Sales[Revenue])
Audio Sales = CALCULATE([Total Sales], Dim_Products[Category] = "Audio")
Total All Sales = CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products))
Audio Share % = DIVIDE([Audio Sales], [Total All Sales], 0)`,
    hints: [
      {
        en: 'CALCULATE dynamically applies Category = "Audio" for the numerator and REMOVEFILTERS for the denominator.',
        vi: 'CALCULATE áp dụng động bộ lọc Category = "Audio" ở tử số và REMOVEFILTERS ở mẫu số.'
      }
    ],
    solutionExplanation: {
      en: 'Combining CALCULATE with filter arguments and REMOVEFILTERS provides robust ratio calculations for executive dashboards.',
      vi: 'Kết hợp CALCULATE với điều kiện lọc và REMOVEFILTERS mang lại các công thức tỷ lệ chuẩn xác cho báo cáo điều hành.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_10_1',
      type: 'single_choice',
      question: {
        en: 'What unique capability makes CALCULATE the most powerful function in DAX?',
        vi: 'Khả năng độc nhất vô nhị nào khiến CALCULATE trở thành hàm quyền năng nhất trong DAX?'
      },
      options: [
        {
          en: 'It is the only function that can modify, add, replace, or remove existing Filter Contexts during formula evaluation',
          vi: 'Đây là hàm duy nhất có khả năng chỉnh sửa, bổ sung, ghi đè hoặc gỡ bỏ các Filter Context đang hoạt động khi tính toán'
        },
        {
          en: 'It connects directly to printer hardware',
          vi: 'Nó kết nối trực tiếp với máy in'
        },
        {
          en: 'It translates DAX formulas into Python code',
          vi: 'Nó dịch công thức DAX sang mã Python'
        },
        {
          en: 'It is the only function that can sum numbers',
          vi: 'Đây là hàm duy nhất có thể cộng số'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CALCULATE alters the active filter context before evaluating its inner expression, enabling all advanced DAX calculations.',
        vi: 'CALCULATE thay đổi ngữ cảnh bộ lọc đang hoạt động trước khi tính toán biểu thức bên trong, mở khóa mọi phép tính DAX nâng cao.'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_10_2',
      type: 'single_choice',
      question: {
        en: 'What is the primary role of the REMOVEFILTERS() function in DAX?',
        vi: 'Vai trò cốt lõi của hàm REMOVEFILTERS() trong DAX là gì?'
      },
      options: [
        {
          en: 'It acts as a pure filter modifier inside CALCULATE to clear filters from specified tables or columns',
          vi: 'Đóng vai trò là filter modifier thuần túy trong CALCULATE để xóa bỏ bộ lọc trên các bảng hoặc cột chỉ định'
        },
        {
          en: 'It deletes data rows permanently from the underlying SQL database',
          vi: 'Xóa vĩnh viễn các dòng dữ liệu khỏi cơ sở dữ liệu SQL gốc'
        },
        {
          en: 'It removes visuals from the report canvas',
          vi: 'Xóa các biểu đồ khỏi màn hình báo cáo'
        },
        {
          en: 'It resets user passwords',
          vi: 'Đặt lại mật khẩu người dùng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'REMOVEFILTERS() is an explicit filter modifier that instructs CALCULATE to ignore any active filters on the specified columns or tables.',
        vi: 'REMOVEFILTERS() là hàm biến đổi bộ lọc tường minh ra lệnh cho CALCULATE bỏ qua mọi bộ lọc đang có trên các cột hoặc bảng chỉ định.'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_10_3',
      type: 'single_choice',
      question: {
        en: 'How does ALLEXCEPT(Dim_Geography, Dim_Geography[Country]) behave inside CALCULATE?',
        vi: 'Hàm ALLEXCEPT(Dim_Geography, Dim_Geography[Country]) hoạt động như thế nào bên trong CALCULATE?'
      },
      options: [
        {
          en: 'Removes filters from all columns in Dim_Geography EXCEPT for the Dim_Geography[Country] column',
          vi: 'Xóa bộ lọc trên tất cả các cột của bảng Dim_Geography NGOẠI TRỪ cột Dim_Geography[Country]'
        },
        {
          en: 'Removes filters only from the Country column and keeps all other columns filtered',
          vi: 'Chỉ xóa bộ lọc trên cột Country và giữ lại bộ lọc trên các cột khác'
        },
        {
          en: 'Deletes all geographical data except Vietnam',
          vi: 'Xóa toàn bộ dữ liệu địa lý ngoại trừ Việt Nam'
        },
        {
          en: 'Throws a syntax error',
          vi: 'Báo lỗi cú pháp'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ALLEXCEPT clears filters on every column of the specified table except the columns listed in the parameters.',
        vi: 'ALLEXCEPT xóa bộ lọc trên mọi cột của bảng chỉ định ngoại trừ các cột được liệt kê trong danh sách tham số.'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_10_4',
      type: 'predict_output',
      question: {
        en: 'In a visual filtered by Year = 2024, what does CALCULATE([Total Sales], Dim_Calendar[Year] = 2023) return?',
        vi: 'Trong một biểu đồ đang bị lọc bởi Year = 2024, công thức CALCULATE([Total Sales], Dim_Calendar[Year] = 2023) trả về giá trị gì?'
      },
      options: [
        {
          en: 'Total Sales for the Year 2023 (the filter argument inside CALCULATE overwrites the external visual filter on Year)',
          vi: 'Tổng doanh số của Năm 2023 (điều kiện lọc trong CALCULATE ghi đè lên bộ lọc Năm 2024 bên ngoài biểu đồ)'
        },
        {
          en: 'Total Sales for both 2023 and 2024 combined',
          vi: 'Tổng doanh số gộp của cả năm 2023 và 2024'
        },
        {
          en: 'Blank because 2023 and 2024 cannot coexist without KEEPFILTERS',
          vi: 'Blank vì năm 2023 và 2024 xung đột'
        },
        {
          en: 'A division by zero error',
          vi: 'Lỗi chia cho 0'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'By default, filter arguments inside CALCULATE overwrite existing filter context on the same column unless KEEPFILTERS is used.',
        vi: 'Mặc định, điều kiện lọc trong CALCULATE sẽ ghi đè lên bộ lọc hiện có trên cùng một cột trừ khi sử dụng hàm KEEPFILTERS.'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_10_5',
      type: 'true_false',
      question: {
        en: 'The KEEPFILTERS() modifier forces CALCULATE to intersect its filter with the existing filter context rather than overwriting it.',
        vi: 'Hàm biến đổi KEEPFILTERS() bắt buộc CALCULATE phải lấy giao (intersect) điều kiện lọc của nó với bộ lọc hiện có thay vì ghi đè.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. KEEPFILTERS changes the default overwrite behavior to an intersection with existing external filters.',
        vi: 'Đúng. KEEPFILTERS đổi hành vi ghi đè mặc định thành phép lấy giao với các bộ lọc ngoài đang có.'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_10_6',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid Filter Modifiers designed specifically for use inside CALCULATE? (Select all that apply)',
        vi: 'Những hàm nào sau đây là các hàm biến đổi bộ lọc (Filter Modifiers) dùng trong CALCULATE? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'REMOVEFILTERS()', vi: 'REMOVEFILTERS()' },
        { en: 'ALL()', vi: 'ALL()' },
        { en: 'ALLEXCEPT()', vi: 'ALLEXCEPT()' },
        { en: 'USERELATIONSHIP()', vi: 'USERELATIONSHIP()' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'REMOVEFILTERS, ALL, ALLEXCEPT, and USERELATIONSHIP (along with CROSSFILTER and KEEPFILTERS) are all CALCULATE filter modifiers.',
        vi: 'REMOVEFILTERS, ALL, ALLEXCEPT, USERELATIONSHIP (cùng với CROSSFILTER và KEEPFILTERS) đều là các filter modifier trong CALCULATE.'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_10_7',
      type: 'single_choice',
      question: {
        en: 'What is the standard formula pattern for calculating the percentage share of an individual product compared to total product sales?',
        vi: 'Mẫu công thức chuẩn để tính tỷ trọng phần trăm của một sản phẩm so với tổng doanh số toàn bộ sản phẩm là gì?'
      },
      options: [
        {
          en: 'DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products)), 0)',
          vi: 'DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS(Dim_Products)), 0)'
        },
        {
          en: '[Total Sales] * 100 / SUM(Dim_Products[Price])',
          vi: '[Total Sales] * 100 / SUM(Dim_Products[Price])'
        },
        {
          en: 'COUNTROWS(Dim_Products) / [Total Sales]',
          vi: 'COUNTROWS(Dim_Products) / [Total Sales]'
        },
        {
          en: 'CALCULATE([Total Sales]) + REMOVEFILTERS(Dim_Products)',
          vi: 'CALCULATE([Total Sales]) + REMOVEFILTERS(Dim_Products)'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DIVIDE divides the current product sales by the grand total across all products (achieved via REMOVEFILTERS).',
        vi: 'Hàm DIVIDE chia doanh số sản phẩm hiện tại cho tổng doanh số của toàn bộ sản phẩm (thu được nhờ REMOVEFILTERS).'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_10_8',
      type: 'true_false',
      question: {
        en: 'CALCULATE can accept multiple filter arguments separated by commas, and they are evaluated together using logical AND.',
        vi: 'CALCULATE có thể nhận nhiều điều kiện lọc ngăn cách bởi dấu phẩy, và chúng được kết hợp đánh giá theo phép logic AND.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Multiple filter parameters in CALCULATE are combined with AND logic (all conditions must be satisfied).',
        vi: 'Đúng. Nhiều tham số lọc trong CALCULATE được kết hợp với nhau theo điều kiện AND (tất cả các điều kiện đều phải thỏa mãn).'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_10_9',
      type: 'predict_output',
      question: {
        en: 'What does the measure: Red Big Sales = CALCULATE([Total Sales], Dim_Products[Color] = "Red", Fact_Sales[Quantity] > 5) compute?',
        vi: 'Measure: Red Big Sales = CALCULATE([Total Sales], Dim_Products[Color] = "Red", Fact_Sales[Quantity] > 5) tính giá trị gì?'
      },
      options: [
        {
          en: 'Total Sales for transactions where the product color is Red AND the quantity sold is greater than 5',
          vi: 'Tổng doanh số cho các giao dịch có sản phẩm màu Đỏ VÀ số lượng bán lớn hơn 5'
        },
        {
          en: 'Total Sales for all products regardless of color',
          vi: 'Tổng doanh số mọi sản phẩm không phân biệt màu sắc'
        },
        {
          en: 'Calculates 5 times the Red product price',
          vi: 'Tính 5 lần giá sản phẩm màu Đỏ'
        },
        {
          en: 'Changes the color of the chart to Red',
          vi: 'Đổi màu biểu đồ thành màu Đỏ'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Both filter conditions are applied simultaneously with logical AND, restricting the sales calculation to Red items with Quantity > 5.',
        vi: 'Cả 2 điều kiện lọc được áp dụng đồng thời theo logic AND, giới hạn phép tính doanh số cho các mặt hàng màu Đỏ có số lượng > 5.'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_10_10',
      type: 'single_choice',
      question: {
        en: 'Why is REMOVEFILTERS(TableName) preferred over ALL(TableName) when writing filter arguments inside CALCULATE?',
        vi: 'Vì sao REMOVEFILTERS(TênBảng) được ưu tiên hơn ALL(TênBảng) khi viết điều kiện lọc trong CALCULATE?'
      },
      options: [
        {
          en: 'REMOVEFILTERS is an explicit filter modifier that cannot be accidentally misused as a table function, clarifying developer intent',
          vi: 'REMOVEFILTERS là filter modifier tường minh không thể bị nhầm lẫn thành hàm trả về bảng, giúp mã nguồn rõ ràng và dễ hiểu'
        },
        {
          en: 'ALL() is no longer supported in Power BI',
          vi: 'Hàm ALL() không còn được hỗ trợ trong Power BI'
        },
        {
          en: 'REMOVEFILTERS compresses the database 10x faster',
          vi: 'REMOVEFILTERS nén cơ sở dữ liệu nhanh hơn 10 lần'
        },
        {
          en: 'ALL() only works on date tables',
          vi: 'ALL() chỉ hoạt động trên bảng ngày tháng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'REMOVEFILTERS explicitly signals that the only purpose of the argument is to clear filters, preventing semantic confusion with ALL() returning tables.',
        vi: 'REMOVEFILTERS thể hiện rõ ràng mục đích duy nhất là gỡ bỏ bộ lọc, tránh nhầm lẫn ngữ nghĩa với việc ALL() trả về một bảng dữ liệu.'
      },
      topicId: 'dax_calculate_modifiers',
      difficulty: 'medium'
    }
  ]
};

export default lesson10;
