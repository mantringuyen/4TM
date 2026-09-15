import { Lesson } from '../../../../types';

export const lesson09: Lesson = {
  id: 'pbi_lesson_9',
  moduleId: 'pbi_mod_3',
  levelId: 'intermediate',
  courseId: 'powerbi',
  order: 9,
  topicId: 'dax_evaluation_contexts',
  title: {
    en: 'Row Context, Filter Context & Context Transition',
    vi: 'Ngữ Cảnh Dòng, Ngữ Cảnh Bộ Lọc & Chuyển Đổi Ngữ Cảnh (Context Transition)'
  },
  summary: {
    en: 'Understand the two core evaluation contexts in DAX and master Context Transition triggered by CALCULATE or measure references.',
    vi: 'Thấu hiểu 2 ngữ cảnh tính toán cốt lõi trong DAX và làm chủ kỹ thuật Chuyển đổi ngữ cảnh kích hoạt bởi CALCULATE.'
  },
  estimatedMinutes: 16,
  learn: {
    introduction: {
      en: 'Evaluation Context is the theoretical foundation of DAX. Every DAX formula evaluates under either a Filter Context (the set of active filters applied by slicers, matrix coordinates, and visual selections) or a Row Context (the concept of "the current row" during iteration or calculated column computation). Understanding how CALCULATE transforms a Row Context into an equivalent Filter Context (Context Transition) is the defining milestone of DAX mastery.',
      vi: 'Ngữ cảnh tính toán (Evaluation Context) là nền tảng lý thuyết quan trọng nhất của DAX. Mọi công thức DAX đều được thực thi dưới Ngữ cảnh bộ lọc - Filter Context (tập hợp các bộ lọc đang kích hoạt từ slicer, tọa độ matrix, bộ lọc trang) hoặc Ngữ cảnh dòng - Row Context (khái niệm "dòng hiện tại" khi chạy hàm lặp hoặc tính cột calculated column). Việc thấu hiểu cách CALCULATE chuyển đổi Ngữ cảnh dòng thành Ngữ cảnh bộ lọc tương đương (Context Transition) là bước ngoặt quyết định đẳng cấp của một chuyên gia DAX.'
    },
    conceptExplanation: {
      en: 'Core Evaluation Context Mechanics:\n1. Filter Context:\n   - Determines WHICH rows of data are visible/accessible.\n   - Created by Slicers, Report/Page Filters, and visual coordinates (e.g. Matrix Row/Column headers).\n   - Propagates across relationships automatically.\n2. Row Context:\n   - Exists automatically in Calculated Columns and inside iterator functions (SUMX, FILTER, etc.).\n   - Identifies the current row values, but DOES NOT filter other tables or relationships.\n3. Context Transition:\n   - Occurs whenever CALCULATE() or an explicit Measure reference ([MeasureName]) is called inside a Row Context.\n   - Takes all column values of the current row and turns them into an exact Filter Context.',
      vi: 'Cơ chế hoạt động của các ngữ cảnh:\n1. Ngữ cảnh bộ lọc (Filter Context):\n   - Quyết định NHỮNG DÒNG NÀO của bảng được nhìn thấy/tính toán.\n   - Được tạo ra bởi Slicer, Bộ lọc trang/báo cáo và tọa độ biểu đồ (tiêu đề dòng/cột Matrix).\n   - Tự động truyền qua các mối quan hệ bảng.\n2. Ngữ cảnh dòng (Row Context):\n   - Tự động tồn tại trong Cột tính toán và bên trong các hàm lặp (SUMX, FILTER,...).\n   - Giúp xác định giá trị của dòng hiện tại, nhưng KHÔNG TỰ ĐỘNG lọc các bảng khác hay truyền qua quan hệ.\n3. Chuyển đổi ngữ cảnh (Context Transition):\n   - Xảy ra khi hàm CALCULATE() hoặc một tham chiếu Measure ([TênMeasure]) được gọi bên trong một Ngữ cảnh dòng.\n   - Lấy toàn bộ giá trị các cột của dòng hiện tại và biến chúng thành một Ngữ cảnh bộ lọc tương ứng.'
    },
    syntax: '// Context Transition in Calculated Column of Dim_Customers:\n// 1. Without CALCULATE (Returns total revenue across entire table):\nDim_Customers[WrongRevenue] = SUM(Fact_Sales[Revenue])\n\n// 2. With CALCULATE / Measure reference (Triggers Context Transition):\nDim_Customers[CustomerRevenue] = CALCULATE(SUM(Fact_Sales[Revenue]))\n// Or equivalently:\nDim_Customers[CustomerRevenue] = [Total Revenue]',
    examples: [
      {
        title: {
          en: 'Context Transition in Action with Iterators',
          vi: 'Chuyển Đổi Ngữ Cảnh Thực Tế Trong Hàm Lặp'
        },
        code: `// Calculate Average Revenue per Customer using Context Transition:
Avg Revenue Per Customer = 
AVERAGEX(
    Dim_Customers,
    [Total Revenue] // Implicitly wrapped in CALCULATE(), triggers Context Transition for each customer
)`,
        language: 'dax',
        explanation: {
          en: 'Because [Total Revenue] is a measure reference, DAX automatically wraps it in CALCULATE(). For each customer row, it transitions the CustomerID into a filter context, calculating revenue specifically for that customer.',
          vi: 'Vì [Total Revenue] là một tham chiếu measure, DAX tự động bao bọc nó bằng CALCULATE(). Với mỗi dòng khách hàng, DAX biến CustomerID thành bộ lọc để tính doanh thu riêng của khách hàng đó.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Writing SUM(Sales[Revenue]) in a calculated column on Dim_Customers expecting it to calculate revenue only for that customer.',
          vi: 'Viết SUM(Sales[Revenue]) trong cột tính toán của bảng Dim_Customers và kỳ vọng nó chỉ tính doanh thu cho riêng khách hàng đó.'
        },
        correction: {
          en: 'Row Context does NOT filter other tables. You must wrap the calculation in CALCULATE() or use an explicit measure [Total Revenue] to trigger Context Transition.',
          vi: 'Ngữ cảnh dòng KHÔNG tự động lọc bảng khác. Bạn bắt buộc phải bọc trong CALCULATE() hoặc gọi measure [Total Revenue] để kích hoạt Context Transition.'
        }
      },
      {
        mistake: {
          en: 'Assuming that Row Context automatically propagates across 1:* relationships.',
          vi: 'Nghĩ rằng Ngữ cảnh dòng tự động truyền qua mối quan hệ 1:* giữa các bảng.'
        },
        correction: {
          en: 'Row Context never propagates across relationships. Only Filter Context propagates. Use RELATED() or trigger Context Transition with CALCULATE().',
          vi: 'Ngữ cảnh dòng không bao giờ truyền qua quan hệ. Chỉ có Filter Context mới truyền qua được. Hãy dùng RELATED() hoặc kích hoạt Context Transition bằng CALCULATE().'
        }
      }
    ],
    tips: [
      {
        en: 'Remember the golden rule: Every time you reference a Measure inside an iterator or calculated column, DAX secretly injects a CALCULATE() around it.',
        vi: 'Ghi nhớ quy tắc vàng: Mỗi khi bạn gọi một Measure bên trong hàm lặp hoặc cột tính toán, DAX tự động bọc ngầm một lệnh CALCULATE() xung quanh nó.'
      },
      {
        en: 'Use EARLIER() only when dealing with nested row contexts in legacy DAX; modern DAX prefers using VAR (Variables) to store outer row values cleanly.',
        vi: 'Chỉ dùng EARLIER() khi xử lý ngữ cảnh dòng lồng nhau kiểu cũ; DAX hiện đại ưu tiên dùng biến VAR để lưu giá trị dòng ngoài rõ ràng hơn.'
      }
    ],
    practiceStarterCode: `// DAX measure leveraging Context Transition
Avg Customer Sales = AVERAGEX(Dim_Customers, [Total Revenue])`
  },
  exercisePool: [
    {
      id: 'pbi_ex_9_1',
      type: 'predict_output',
      title: {
        en: 'Predict Context Transition Output',
        vi: 'Dự Đoán Kết Quả Chuyển Đổi Ngữ Cảnh'
      },
      instruction: {
        en: 'If you create a calculated column on Dim_Customers: Column1 = SUM(Fact_Sales[Revenue]), what value appears in each row?',
        vi: 'Nếu bạn tạo một calculated column trên Dim_Customers: Column1 = SUM(Fact_Sales[Revenue]), giá trị nào sẽ xuất hiện ở mỗi dòng?'
      },
      starterCode: '// Column1 = SUM(Fact_Sales[Revenue])',
      solutionCode: 'The Grand Total Revenue of all customers repeated identically on every row',
      options: [
        'The Grand Total Revenue of all customers repeated identically on every row',
        'The specific revenue of that individual customer',
        'Zero for all rows',
        'An invalid formula syntax error'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'Without CALCULATE, a Row Context does not filter Fact_Sales, so SUM evaluates over the entire table returning the grand total on every row.',
        vi: 'Nếu không có CALCULATE, Ngữ cảnh dòng không lọc bảng Fact_Sales, do đó hàm SUM tính trên toàn bộ bảng và trả về tổng chung giống hệt nhau ở mọi dòng.'
      }
    },
    {
      id: 'pbi_ex_9_2',
      type: 'fix_code',
      title: {
        en: 'Trigger Context Transition with CALCULATE',
        vi: 'Kích Hoạt Context Transition Bằng CALCULATE'
      },
      instruction: {
        en: 'Fix the formula in Dim_Customers so it calculates the specific revenue for each customer using CALCULATE.',
        vi: 'Sửa công thức trong bảng Dim_Customers để tính đúng doanh thu của từng khách hàng bằng cách dùng CALCULATE.'
      },
      starterCode: 'Customer Revenue = SUM(Fact_Sales[Revenue])',
      solutionCode: 'Customer Revenue = CALCULATE(SUM(Fact_Sales[Revenue]))',
      hint: {
        en: 'Wrap SUM(...) inside CALCULATE(...)',
        vi: 'Bọc SUM(...) bên trong CALCULATE(...)'
      },
      explanation: {
        en: 'CALCULATE transforms the current customer row into a filter context, filtering Fact_Sales to only that customer.',
        vi: 'CALCULATE biến dòng khách hàng hiện tại thành bộ lọc, lọc Fact_Sales chỉ còn các đơn của khách hàng đó.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_9',
    title: {
      en: 'Master Iteration and Context Transition',
      vi: 'Làm Chủ Kỹ Thuật Lặp Và Chuyển Đổi Ngữ Cảnh'
    },
    description: {
      en: 'Write two DAX measures: Total Revenue base measure, and Average Revenue per Customer utilizing Context Transition.',
      vi: 'Viết hai measure DAX: measure cơ sở Total Revenue, và Average Revenue per Customer ứng dụng Chuyển đổi ngữ cảnh.'
    },
    requirements: [
      { en: '1. Total Revenue = SUM(Fact_Sales[Revenue])', vi: '1. Total Revenue = SUM(Fact_Sales[Revenue])' },
      { en: '2. Avg Revenue Per Customer = AVERAGEX(Dim_Customers, [Total Revenue])', vi: '2. Avg Revenue Per Customer = AVERAGEX(Dim_Customers, [Total Revenue])' }
    ],
    starterCode: `Total Revenue = SUM(Fact_Sales[Revenue])
Avg Revenue Per Customer = AVERAGEX(Dim_Customers, [Total Revenue])`,
    solutionCode: `Total Revenue = SUM(Fact_Sales[Revenue])
Avg Revenue Per Customer = AVERAGEX(Dim_Customers, [Total Revenue])`,
    hints: [
      {
        en: 'Referencing [Total Revenue] inside AVERAGEX automatically triggers context transition for each customer row.',
        vi: 'Tham chiếu [Total Revenue] bên trong AVERAGEX tự động kích hoạt context transition cho từng dòng khách hàng.'
      }
    ],
    solutionExplanation: {
      en: 'This demonstrates the elegance of DAX: combining iterator functions with measure references creates powerful multi-level calculations.',
      vi: 'Điều này thể hiện sự tinh tế của DAX: kết hợp hàm lặp với tham chiếu measure tạo nên các phép tính đa tầng mạnh mẽ.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_9_1',
      type: 'single_choice',
      question: {
        en: 'What are the two fundamental evaluation contexts in DAX?',
        vi: 'Hai ngữ cảnh tính toán nền tảng trong DAX là gì?'
      },
      options: [
        { en: 'Filter Context and Row Context', vi: 'Filter Context (Ngữ cảnh bộ lọc) và Row Context (Ngữ cảnh dòng)' },
        { en: 'Table Context and Chart Context', vi: 'Table Context và Chart Context' },
        { en: 'Client Context and Server Context', vi: 'Client Context và Server Context' },
        { en: 'Power Query Context and M Context', vi: 'Power Query Context và M Context' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Filter Context (which rows are active) and Row Context (which row is currently being evaluated) govern all DAX execution.',
        vi: 'Ngữ cảnh bộ lọc (dòng nào đang được lọc) và Ngữ cảnh dòng (dòng nào đang được xét) chi phối toàn bộ quá trình thực thi DAX.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_9_2',
      type: 'single_choice',
      question: {
        en: 'What is "Context Transition" in DAX?',
        vi: '"Context Transition" (Chuyển đổi ngữ cảnh) trong DAX là gì?'
      },
      options: [
        {
          en: 'The transformation of an active Row Context into an equivalent Filter Context, triggered by CALCULATE or a measure reference',
          vi: 'Quá trình biến đổi một Ngữ cảnh dòng đang hoạt động thành một Ngữ cảnh bộ lọc tương đương, được kích hoạt bởi CALCULATE hoặc tham chiếu measure'
        },
        {
          en: 'Converting a CSV file into an Excel workbook',
          vi: 'Chuyển đổi tệp CSV thành bảng tính Excel'
        },
        {
          en: 'Switching from light theme to dark theme in Power BI Desktop',
          vi: 'Chuyển từ giao diện sáng sang giao diện tối'
        },
        {
          en: 'Deleting inactive tables during data refresh',
          vi: 'Xóa các bảng không dùng trong lúc nạp dữ liệu'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Context Transition takes all column values from the current row and applies them as filters in the newly established filter context.',
        vi: 'Context Transition lấy toàn bộ giá trị các cột của dòng hiện tại và áp dụng chúng làm các bộ lọc trong filter context mới được thiết lập.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_9_3',
      type: 'true_false',
      question: {
        en: 'A Row Context automatically propagates across table relationships to filter related tables without requiring CALCULATE or RELATED.',
        vi: 'Ngữ cảnh dòng tự động truyền qua các mối quan hệ bảng để lọc các bảng liên quan mà không cần dùng CALCULATE hay RELATED.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Row Context never propagates across relationships. Only Filter Context can propagate across relationships.',
        vi: 'Sai. Ngữ cảnh dòng không bao giờ tự truyền qua quan hệ. Chỉ có Ngữ cảnh bộ lọc (Filter Context) mới truyền qua được.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_9_4',
      type: 'single_choice',
      question: {
        en: 'What happens behind the scenes when you reference a measure [Total Sales] inside an iterator like SUMX(Customers, [Total Sales])?',
        vi: 'Điều gì xảy ra ngầm phía sau khi bạn gọi một measure [Total Sales] bên trong hàm lặp như SUMX(Customers, [Total Sales])?'
      },
      options: [
        {
          en: 'DAX automatically wraps the measure in CALCULATE([Total Sales]), triggering Context Transition for each customer row',
          vi: 'DAX tự động bao bọc measure trong CALCULATE([Total Sales]), kích hoạt Chuyển đổi ngữ cảnh cho từng dòng khách hàng'
        },
        {
          en: 'Power BI raises a syntax error because measures cannot be used in iterators',
          vi: 'Power BI báo lỗi cú pháp vì measure không được dùng trong hàm lặp'
        },
        {
          en: 'It divides the sales amount by 100',
          vi: 'Nó chia doanh số cho 100'
        },
        {
          en: 'It ignores the customer table completely',
          vi: 'Nó bỏ qua hoàn toàn bảng khách hàng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Every measure reference contains an implicit CALCULATE(), which initiates context transition inside any active row context.',
        vi: 'Mọi tham chiếu measure đều chứa một lệnh CALCULATE() ngầm định, giúp kích hoạt chuyển đổi ngữ cảnh trong bất kỳ row context nào.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'hard'
    },
    {
      id: 'pbi_q_9_5',
      type: 'predict_output',
      question: {
        en: 'If a calculated column on Dim_Products is written as Product[Col] = [Total Revenue], what does it contain?',
        vi: 'Nếu một calculated column trên Dim_Products được viết là Product[Col] = [Total Revenue], cột đó sẽ chứa giá trị gì?'
      },
      options: [
        {
          en: 'The total revenue generated specifically by each individual product (due to Context Transition)',
          vi: 'Tổng doanh thu riêng biệt được tạo ra bởi từng sản phẩm tương ứng (nhờ Chuyển đổi ngữ cảnh)'
        },
        {
          en: 'The grand total revenue of the entire company repeated on every row',
          vi: 'Tổng doanh thu toàn công ty lặp lại giống nhau ở mọi dòng'
        },
        {
          en: 'Null for all rows',
          vi: 'Null cho tất cả các dòng'
        },
        {
          en: 'The product unit price only',
          vi: 'Chỉ đơn giá sản phẩm'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because [Total Revenue] is a measure, implicit CALCULATE triggers context transition, filtering the sales table to the current product.',
        vi: 'Vì [Total Revenue] là một measure, lệnh CALCULATE ngầm kích hoạt context transition, lọc bảng sales theo đúng sản phẩm của dòng đó.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_9_6',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following DAX elements inherently create a Row Context? (Select all that apply)',
        vi: 'Những thành phần nào sau đây trong DAX vốn dĩ tạo ra Ngữ cảnh dòng (Row Context)? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Calculated Columns in tables', vi: 'Cột tính toán (Calculated Columns) trong bảng' },
        { en: 'Iterator functions like SUMX and FILTER', vi: 'Các hàm lặp như SUMX và FILTER' },
        { en: 'ADDCOLUMNS table function', vi: 'Hàm bảng ADDCOLUMNS' },
        { en: 'A Card visual on a report page', vi: 'Thẻ Card trên trang báo cáo' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'Calculated columns, iterators (SUMX, AVERAGEX, FILTER), and ADDCOLUMNS create row contexts during evaluation.',
        vi: 'Cột tính toán, các hàm lặp (SUMX, AVERAGEX, FILTER) và ADDCOLUMNS đều tạo ra ngữ cảnh dòng khi thực thi.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_9_7',
      type: 'true_false',
      question: {
        en: 'Filter Context is created by slicers, visual coordinates (row/column headers in Matrix), and report/page filter panes.',
        vi: 'Ngữ cảnh bộ lọc (Filter Context) được tạo ra bởi slicer, tọa độ biểu đồ (tiêu đề dòng/cột trong Matrix) và khung bộ lọc trang/báo cáo.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Any user interaction, visual coordinate, or slicer selection contributes directly to the active Filter Context.',
        vi: 'Đúng. Mọi thao tác người dùng, tọa độ biểu đồ hay lựa chọn slicer đều cấu thành nên Filter Context đang hoạt động.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_9_8',
      type: 'single_choice',
      question: {
        en: 'In modern DAX, what is the best practice method for capturing values from an outer row context instead of using the complex EARLIER() function?',
        vi: 'Trong DAX hiện đại, phương pháp chuẩn mực nhất để lấy giá trị từ ngữ cảnh dòng ngoài thay vì dùng hàm EARLIER() phức tạp là gì?'
      },
      options: [
        { en: 'Declare a Variable using VAR before entering the inner loop', vi: 'Khai báo biến bằng từ khóa VAR trước khi đi vào vòng lặp trong' },
        { en: 'Use the PREVIOUS() function', vi: 'Dùng hàm PREVIOUS()' },
        { en: 'Create a temporary Excel file', vi: 'Tạo một tệp Excel tạm thời' },
        { en: 'Restart Power BI Desktop', vi: 'Khởi động lại Power BI Desktop' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Variables (VAR) capture scalar values at their point of declaration, eliminating the need for nested EARLIER() expressions.',
        vi: 'Biến (VAR) chụp lại giá trị đơn lẻ tại thời điểm khai báo, giúp loại bỏ hoàn toàn sự cần thiết của các hàm EARLIER() lồng nhau.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_9_9',
      type: 'single_choice',
      question: {
        en: 'If a table has duplicate rows with identical values across all columns, what is a potential danger of triggering Context Transition on that table?',
        vi: 'Nếu một bảng có các dòng trùng lặp hoàn toàn trên mọi cột, nguy cơ tiềm ẩn khi kích hoạt Context Transition trên bảng đó là gì?'
      },
      options: [
        {
          en: 'Context transition filters all rows matching those identical values, potentially aggregating across multiple rows rather than just the single physical row',
          vi: 'Context transition lọc tất cả các dòng có cùng giá trị đó, dẫn đến việc tổng hợp gộp nhiều dòng thay vì chỉ tính riêng dòng vật lý đơn lẻ'
        },
        {
          en: 'Power BI will instantly crash and corrupt the file',
          vi: 'Power BI sẽ bị sập ngay lập tức và hỏng tệp'
        },
        {
          en: 'The table will be converted to a JSON object',
          vi: 'Bảng sẽ bị chuyển thành đối tượng JSON'
        },
        {
          en: 'Duplicate rows are always deleted automatically by DAX',
          vi: 'Các dòng trùng lặp luôn tự động bị xóa bởi DAX'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Context Transition turns row values into filters. If rows are not unique (lack a primary key), the resulting filter context matches all identical rows.',
        vi: 'Context Transition biến giá trị dòng thành bộ lọc. Nếu các dòng không có khóa chính duy nhất, filter context tạo ra sẽ lọc trúng tất cả các dòng trùng.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'hard'
    },
    {
      id: 'pbi_q_9_10',
      type: 'predict_output',
      question: {
        en: 'What does the DAX expression COUNTROWS(FILTER(Dim_Customers, [Total Revenue] > 10000)) return?',
        vi: 'Biểu thức DAX COUNTROWS(FILTER(Dim_Customers, [Total Revenue] > 10000)) trả về kết quả gì?'
      },
      options: [
        {
          en: 'The number of unique customers whose individual total revenue exceeds $10,000',
          vi: 'Số lượng khách hàng duy nhất có tổng doanh thu cá nhân vượt quá $10,000'
        },
        {
          en: 'The grand total revenue of all customers',
          vi: 'Tổng doanh thu chung của toàn bộ khách hàng'
        },
        {
          en: 'Always returns 0',
          vi: 'Luôn trả về 0'
        },
        {
          en: 'The number of products priced over $10,000',
          vi: 'Số lượng sản phẩm có giá trên $10,000'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'FILTER iterates over Dim_Customers, invokes Context Transition via [Total Revenue] for each customer, filters to those > 10000, and COUNTROWS counts the qualifying customers.',
        vi: 'FILTER duyệt qua Dim_Customers, kích hoạt Context Transition qua [Total Revenue] cho từng khách, lọc khách có doanh thu > 10000 và COUNTROWS đếm số khách thỏa mãn.'
      },
      topicId: 'dax_evaluation_contexts',
      difficulty: 'hard'
    }
  ]
};

export default lesson09;
