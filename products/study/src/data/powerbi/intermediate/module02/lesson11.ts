import { Lesson } from '../../../../types';

export const lesson11: Lesson = {
  id: 'pbi_lesson_11',
  moduleId: 'pbi_mod_4',
  levelId: 'intermediate',
  courseId: 'powerbi',
  order: 11,
  topicId: 'relationship_based_calculations',
  title: {
    en: 'RELATED, RELATEDTABLE & Relationship-Based Calculations',
    vi: 'RELATED, RELATEDTABLE & Các Phép Tính Dựa Trên Mối Quan Hệ'
  },
  summary: {
    en: 'Traverse one-to-many relationships in both directions using RELATED and RELATEDTABLE, and activate inactive links with USERELATIONSHIP.',
    vi: 'Duyệt các mối quan hệ 1-Nhiều theo cả hai hướng bằng RELATED và RELATEDTABLE, kích hoạt quan hệ phụ bằng USERELATIONSHIP.'
  },
  estimatedMinutes: 14,
  learn: {
    introduction: {
      en: 'In relational tabular modeling, calculations frequently need to traverse relationships across tables. DAX provides two dedicated functions to navigate relationships in row contexts: RELATED() moves from the Many-side to the 1-side to fetch a single scalar value, while RELATEDTABLE() moves from the 1-side to the Many-side to return a sub-table of related records.',
      vi: 'Trong mô hình hóa dữ liệu dạng bảng, các phép tính thường xuyên cần duyệt qua các mối quan hệ giữa các bảng. DAX cung cấp hai hàm chuyên dụng để di chuyển theo quan hệ trong ngữ cảnh dòng: RELATED() đi từ phía Nhiều sang phía 1 để lấy một giá trị đơn lẻ, trong khi RELATEDTABLE() đi từ phía 1 sang phía Nhiều để trả về một bảng con gồm tất cả các bản ghi liên quan.'
    },
    conceptExplanation: {
      en: 'Core Relationship Functions:\n1. RELATED(ColumnName):\n   - Used on the Many-side (e.g. Fact_Sales) to pull an attribute from the One-side (e.g. Dim_Products[UnitPrice]).\n   - Requires an active relationship.\n2. RELATEDTABLE(TableName):\n   - Used on the One-side (e.g. Dim_Customers) to retrieve all corresponding rows from the Many-side (e.g. Fact_Sales).\n   - Commonly paired with COUNTROWS or SUMX.\n3. USERELATIONSHIP(Column1, Column2):\n   - Placed inside CALCULATE to activate an inactive (dashed) relationship for the duration of that calculation.',
      vi: 'Các hàm quan hệ cốt lõi:\n1. RELATED(TênCột):\n   - Dùng ở phía Nhiều (như Fact_Sales) để lấy thuộc tính từ phía 1 (như Dim_Products[UnitPrice]).\n   - Bắt buộc phải có một mối quan hệ đang hoạt động.\n2. RELATEDTABLE(TênBảng):\n   - Dùng ở phía 1 (như Dim_Customers) để lấy tất cả các dòng tương ứng từ phía Nhiều (như Fact_Sales).\n   - Thường kết hợp với COUNTROWS hoặc SUMX.\n3. USERELATIONSHIP(Cột1, Cột2):\n   - Đặt bên trong CALCULATE để kích hoạt một mối quan hệ Inactive (nét đứt) trong suốt thời gian thực thi phép tính đó.'
    },
    syntax: '// 1. Fetching 1-side dimension value from many-side fact table:\nFact_Sales[LineMargin] = Fact_Sales[Price] - RELATED(Dim_Products[StandardCost])\n\n// 2. Counting transactions from the 1-side Customer dimension:\nDim_Customers[LifetimeOrders] = COUNTROWS(RELATEDTABLE(Fact_Sales))\n\n// 3. Activating secondary inactive relationship via CALCULATE:\nShipped Sales = CALCULATE([Total Sales], USERELATIONSHIP(Fact_Sales[ShipDate], Dim_Calendar[Date]))',
    examples: [
      {
        title: {
          en: 'Handling Role-Playing Dates with USERELATIONSHIP',
          vi: 'Xử Lý Bảng Ngày Đa Vai Trò Bằng USERELATIONSHIP'
        },
        code: `// Primary Active Relationship: OrderDate
Total Order Sales = SUM(Fact_Sales[Revenue])

// Secondary Inactive Relationship: ShipDate
Total Shipped Sales = 
CALCULATE(
    [Total Order Sales],
    USERELATIONSHIP(Fact_Sales[ShipDate], Dim_Calendar[Date])
)`,
        language: 'dax',
        explanation: {
          en: 'USERELATIONSHIP temporarily activates the inactive ShipDate link, enabling time intelligence by shipping date without duplicating the calendar table.',
          vi: 'USERELATIONSHIP kích hoạt tạm thời quan hệ ShipDate, giúp phân tích thời gian theo ngày giao hàng mà không cần nhân đôi bảng lịch.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Calling RELATED() from the 1-side table trying to retrieve multiple rows from the Fact table.',
          vi: 'Gọi hàm RELATED() từ bảng phía 1 nhằm lấy nhiều dòng từ bảng Fact.'
        },
        correction: {
          en: 'RELATED can only fetch a single scalar value from the 1-side. To fetch rows from the Many-side, use RELATEDTABLE().',
          vi: 'Hàm RELATED chỉ có thể lấy 1 giá trị đơn lẻ từ phía 1. Muốn lấy các dòng từ phía Nhiều, phải dùng RELATEDTABLE().'
        }
      },
      {
        mistake: {
          en: 'Using USERELATIONSHIP between columns that have no relationship defined in the model.',
          vi: 'Dùng USERELATIONSHIP giữa hai cột chưa từng được thiết lập quan hệ trong sơ đồ Model.'
        },
        correction: {
          en: 'USERELATIONSHIP requires an existing (inactive) relationship defined in Model View between the exact two columns.',
          vi: 'USERELATIONSHIP bắt buộc phải có một mối quan hệ (dù là Inactive) đã được tạo sẵn trong Model View giữa 2 cột đó.'
        }
      }
    ],
    tips: [
      {
        en: 'Use USERELATIONSHIP to handle "Role-Playing Dimensions" (e.g. Order Date, Due Date, Ship Date) cleanly with a single unified Date table.',
        vi: 'Dùng USERELATIONSHIP để xử lý các bảng chiều đa vai trò (Role-Playing Dimensions như Ngày đặt, Ngày hẹn, Ngày giao) chỉ với một bảng Lịch duy nhất.'
      },
      {
        en: 'Combine SUMX with RELATEDTABLE in calculated columns to aggregate customer lifetime spend directly in Dim_Customers.',
        vi: 'Kết hợp SUMX với RELATEDTABLE trong cột tính toán để tính tổng chi tiêu trọn đời của khách hàng trực tiếp trong Dim_Customers.'
      }
    ],
    practiceStarterCode: `// Calculate sales by Ship Date using USERELATIONSHIP
Shipped Revenue = CALCULATE(SUM(Fact_Sales[Revenue]), USERELATIONSHIP(Fact_Sales[ShipDate], Dim_Calendar[Date]))`
  },
  exercisePool: [
    {
      id: 'pbi_ex_11_1',
      type: 'predict_output',
      title: {
        en: 'Identify RELATED vs RELATEDTABLE',
        vi: 'Phân Biệt RELATED Và RELATEDTABLE'
      },
      instruction: {
        en: 'Which function returns a full table of matching rows when evaluated in the row context of Dim_Customers?',
        vi: 'Hàm nào trả về một bảng đầy đủ các dòng tương ứng khi thực thi trong ngữ cảnh dòng của bảng Dim_Customers?'
      },
      starterCode: '// Choose function',
      solutionCode: 'RELATEDTABLE',
      options: ['RELATEDTABLE', 'RELATED', 'LOOKUPVALUE', 'MATCHROWS'],
      correctOptionIndex: 0,
      explanation: {
        en: 'RELATEDTABLE navigates from the 1-side dimension table to return a sub-table containing all related rows from the many-side fact table.',
        vi: 'RELATEDTABLE di chuyển từ bảng dimension phía 1 để trả về một bảng con chứa tất cả các dòng liên quan từ bảng fact phía nhiều.'
      }
    },
    {
      id: 'pbi_ex_11_2',
      type: 'complete_code',
      title: {
        en: 'Activate Inactive Relationship in Measure',
        vi: 'Kích Hoạt Mối Quan Hệ Inactive Trong Measure'
      },
      instruction: {
        en: 'Complete the DAX measure to calculate Delivery Revenue by activating the inactive DeliveryDate relationship.',
        vi: 'Hoàn thiện measure DAX để tính Delivery Revenue bằng cách kích hoạt quan hệ DeliveryDate đang Inactive.'
      },
      starterCode: 'Delivery Revenue = CALCULATE([Total Sales], ___(Fact_Sales[DeliveryDate], Dim_Calendar[Date]))',
      solutionCode: 'Delivery Revenue = CALCULATE([Total Sales], USERELATIONSHIP(Fact_Sales[DeliveryDate], Dim_Calendar[Date]))',
      hint: {
        en: 'USERELATIONSHIP',
        vi: 'USERELATIONSHIP'
      },
      explanation: {
        en: 'USERELATIONSHIP activates the inactive relationship between DeliveryDate and Date during measure evaluation.',
        vi: 'USERELATIONSHIP kích hoạt quan hệ Inactive giữa DeliveryDate và Date trong suốt quá trình tính toán measure.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_11',
    title: {
      en: 'Architect Role-Playing Date Measures',
      vi: 'Thiết Kế Bộ Đo Lường Cho Ngày Đa Vai Trò'
    },
    description: {
      en: 'Implement three DAX measures analyzing sales across different lifecycle dates: Order Date (active), Ship Date (inactive), and Due Date (inactive).',
      vi: 'Xây dựng 3 measure DAX phân tích doanh thu theo các mốc vòng đời: Ngày đặt (Active), Ngày giao (Inactive) và Ngày hạn thanh toán (Inactive).'
    },
    requirements: [
      { en: '1. Order Revenue = SUM(Fact_Sales[Revenue])', vi: '1. Order Revenue = SUM(Fact_Sales[Revenue])' },
      { en: '2. Ship Revenue = CALCULATE([Order Revenue], USERELATIONSHIP(Fact_Sales[ShipDate], Dim_Calendar[Date]))', vi: '2. Ship Revenue = CALCULATE([Order Revenue], USERELATIONSHIP(Fact_Sales[ShipDate], Dim_Calendar[Date]))' },
      { en: '3. Due Revenue = CALCULATE([Order Revenue], USERELATIONSHIP(Fact_Sales[DueDate], Dim_Calendar[Date]))', vi: '3. Due Revenue = CALCULATE([Order Revenue], USERELATIONSHIP(Fact_Sales[DueDate], Dim_Calendar[Date]))' }
    ],
    starterCode: `Order Revenue = SUM(Fact_Sales[Revenue])
Ship Revenue = CALCULATE([Order Revenue], USERELATIONSHIP(Fact_Sales[ShipDate], Dim_Calendar[Date]))
Due Revenue = CALCULATE([Order Revenue], USERELATIONSHIP(Fact_Sales[DueDate], Dim_Calendar[Date]))`,
    solutionCode: `Order Revenue = SUM(Fact_Sales[Revenue])
Ship Revenue = CALCULATE([Order Revenue], USERELATIONSHIP(Fact_Sales[ShipDate], Dim_Calendar[Date]))
Due Revenue = CALCULATE([Order Revenue], USERELATIONSHIP(Fact_Sales[DueDate], Dim_Calendar[Date]))`,
    hints: [
      {
        en: 'USERELATIONSHIP allows a single Dim_Calendar table to serve multiple date fields efficiently.',
        vi: 'USERELATIONSHIP cho phép một bảng Dim_Calendar duy nhất phục vụ nhiều trường ngày tháng hiệu quả.'
      }
    ],
    solutionExplanation: {
      en: 'Role-playing date patterns with USERELATIONSHIP eliminate redundant calendar tables and keep the data model lean.',
      vi: 'Mô hình ngày đa vai trò với USERELATIONSHIP loại bỏ các bảng lịch trùng lặp và giữ cho mô hình dữ liệu luôn gọn gàng.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_11_1',
      type: 'single_choice',
      question: {
        en: 'Which function should be used in a Fact table row context to fetch a single attribute from a related 1-side Dimension table?',
        vi: 'Hàm nào nên được dùng trong ngữ cảnh dòng của bảng Fact để lấy một giá trị đơn lẻ từ bảng Dimension phía 1?'
      },
      options: [
        { en: 'RELATED()', vi: 'RELATED()' },
        { en: 'RELATEDTABLE()', vi: 'RELATEDTABLE()' },
        { en: 'FETCH()', vi: 'FETCH()' },
        { en: 'INDEX_SEEK()', vi: 'INDEX_SEEK()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RELATED() fetches a single scalar value by traversing the relationship from the many-side to the one-side.',
        vi: 'RELATED() lấy một giá trị đơn lẻ bằng cách di chuyển theo quan hệ từ phía nhiều sang phía một.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_11_2',
      type: 'single_choice',
      question: {
        en: 'Which function returns a sub-table of related rows when evaluated in the row context of a 1-side Dimension table?',
        vi: 'Hàm nào trả về một bảng con gồm các dòng liên quan khi thực thi trong ngữ cảnh dòng của bảng Dimension phía 1?'
      },
      options: [
        { en: 'RELATEDTABLE()', vi: 'RELATEDTABLE()' },
        { en: 'RELATED()', vi: 'RELATED()' },
        { en: 'EXTRACT_TABLE()', vi: 'EXTRACT_TABLE()' },
        { en: 'CROSSJOIN()', vi: 'CROSSJOIN()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RELATEDTABLE() traverses from the 1-side to the Many-side to return all matching rows for the current dimension entity.',
        vi: 'RELATEDTABLE() đi từ phía 1 sang phía Nhiều để trả về toàn bộ các dòng khớp với thực thể dimension hiện tại.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_11_3',
      type: 'single_choice',
      question: {
        en: 'Where must USERELATIONSHIP() be placed in a DAX formula?',
        vi: 'Hàm USERELATIONSHIP() bắt buộc phải được đặt ở đâu trong công thức DAX?'
      },
      options: [
        { en: 'As a filter argument inside the CALCULATE() function', vi: 'Làm đối số điều kiện lọc bên trong hàm CALCULATE()' },
        { en: 'Directly in the Power Query Advanced Editor', vi: 'Trực tiếp trong Advanced Editor của Power Query' },
        { en: 'In a standalone card visual', vi: 'Trong một thẻ card độc lập' },
        { en: 'Inside a Python visual script', vi: 'Bên trong script biểu đồ Python' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'USERELATIONSHIP is a filter modifier that can only be evaluated as an argument to CALCULATE or CALCULATETABLE.',
        vi: 'USERELATIONSHIP là một filter modifier chỉ có thể được thực thi như một đối số của hàm CALCULATE hoặc CALCULATETABLE.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_11_4',
      type: 'true_false',
      question: {
        en: 'You can use USERELATIONSHIP between two columns even if there is no physical relationship line drawn between them in Model View.',
        vi: 'Bạn có thể dùng USERELATIONSHIP giữa 2 cột ngay cả khi không có đường nối quan hệ vật lý nào được tạo giữa chúng trong Model View.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. An inactive relationship must physically exist in the data model between the specified columns before USERELATIONSHIP can activate it.',
        vi: 'Sai. Một quan hệ Inactive bắt buộc phải tồn tại sẵn trong sơ đồ mô hình dữ liệu giữa 2 cột thì USERELATIONSHIP mới có thể kích hoạt.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_11_5',
      type: 'predict_output',
      question: {
        en: 'In Dim_Customers, what does the calculated column Customer Orders = COUNTROWS(RELATEDTABLE(Fact_Sales)) calculate?',
        vi: 'Trong Dim_Customers, calculated column Customer Orders = COUNTROWS(RELATEDTABLE(Fact_Sales)) tính giá trị gì?'
      },
      options: [
        {
          en: 'The exact number of sales orders placed by that individual customer',
          vi: 'Số lượng đơn hàng chính xác được đặt bởi riêng khách hàng đó'
        },
        {
          en: 'The total number of rows in the entire Fact_Sales table for all customers',
          vi: 'Tổng số dòng trong toàn bộ bảng Fact_Sales của tất cả khách hàng'
        },
        {
          en: 'The customer phone number',
          vi: 'Số điện thoại của khách hàng'
        },
        {
          en: 'Zero for all customers',
          vi: 'Bằng 0 cho mọi khách hàng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RELATEDTABLE filters Fact_Sales to the current customer row context, and COUNTROWS counts the number of related orders.',
        vi: 'RELATEDTABLE lọc Fact_Sales theo ngữ cảnh dòng của khách hàng hiện tại và COUNTROWS đếm số lượng đơn hàng liên quan.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_11_6',
      type: 'single_choice',
      question: {
        en: 'What is a "Role-Playing Dimension" in data modeling?',
        vi: '"Role-Playing Dimension" (Chiều đa vai trò) trong mô hình hóa dữ liệu là gì?'
      },
      options: [
        {
          en: 'A single dimension table that can be filtered in multiple different business contexts (such as Dim_Date acting as Order Date, Ship Date, and Delivery Date)',
          vi: 'Một bảng dimension đơn lẻ có thể đóng nhiều vai trò ngữ cảnh kinh doanh khác nhau (như Dim_Date vừa là Ngày đặt, Ngày giao, Ngày thanh toán)'
        },
        {
          en: 'A user security role defined in Power BI Service',
          vi: 'Một vai trò bảo mật người dùng trong Power BI Service'
        },
        {
          en: 'A visual chart that changes shape automatically',
          vi: 'Một biểu đồ tự động đổi hình dạng'
        },
        {
          en: 'A table that only stores actor and movie data',
          vi: 'Một bảng chỉ lưu dữ liệu diễn viên và phim ảnh'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Role-playing dimensions express multiple concepts (e.g. Order Date vs Ship Date) using a single physical table linked via active/inactive relationships.',
        vi: 'Chiều đa vai trò thể hiện nhiều khái niệm nghiệp vụ (như Ngày đặt vs Ngày giao) chỉ với một bảng vật lý duy nhất liên kết qua các quan hệ active/inactive.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_11_7',
      type: 'true_false',
      question: {
        en: 'The CROSSFILTER() function in DAX can be used inside CALCULATE to dynamically change the cross-filter direction of a relationship during measure evaluation.',
        vi: 'Hàm CROSSFILTER() trong DAX có thể được dùng trong CALCULATE để thay đổi động chiều lọc chéo của quan hệ khi tính toán measure.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. CROSSFILTER(Col1, Col2, Direction) allows dynamically setting direction to Both, None, or Single on the fly.',
        vi: 'Đúng. CROSSFILTER(Col1, Col2, Direction) cho phép đổi chiều lọc thành Both, None hoặc Single một cách linh hoạt trong phép tính.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'hard'
    },
    {
      id: 'pbi_q_11_8',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following functions require an existing relationship between tables in the data model? (Select all that apply)',
        vi: 'Những hàm nào sau đây bắt buộc phải có mối quan hệ đã tạo giữa các bảng trong mô hình dữ liệu? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'RELATED()', vi: 'RELATED()' },
        { en: 'RELATEDTABLE()', vi: 'RELATEDTABLE()' },
        { en: 'USERELATIONSHIP()', vi: 'USERELATIONSHIP()' },
        { en: 'DIVIDE()', vi: 'DIVIDE()' }
      ],
      correctAnswers: [0, 1, 2],
      explanation: {
        en: 'RELATED, RELATEDTABLE, and USERELATIONSHIP operate directly on relational model connections. DIVIDE is pure arithmetic.',
        vi: 'RELATED, RELATEDTABLE và USERELATIONSHIP thao tác trực tiếp trên các liên kết mô hình. DIVIDE thuần túy là phép chia số học.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_11_9',
      type: 'single_choice',
      question: {
        en: 'What is the function used in DAX to perform a lookup when NO relationship exists between two tables?',
        vi: 'Hàm nào trong DAX dùng để tra cứu giá trị khi KHÔNG CÓ mối quan hệ nào được thiết lập giữa hai bảng?'
      },
      options: [
        { en: 'LOOKUPVALUE()', vi: 'LOOKUPVALUE()' },
        { en: 'RELATED()', vi: 'RELATED()' },
        { en: 'USERELATIONSHIP()', vi: 'USERELATIONSHIP()' },
        { en: 'VLOOKUP_EXACT()', vi: 'VLOOKUP_EXACT()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LOOKUPVALUE(ResultColumn, SearchColumn1, SearchValue1) performs lookups across disconnected tables without requiring a model relationship.',
        vi: 'LOOKUPVALUE(ResultColumn, SearchColumn1, SearchValue1) tra cứu giá trị giữa các bảng không có quan hệ kết nối.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_11_10',
      type: 'predict_output',
      question: {
        en: 'If Dim_Customers has 10,000 customers and you create a calculated column: High Value Check = IF(SUMX(RELATEDTABLE(Fact_Sales), Fact_Sales[Revenue]) > 1000, "High", "Normal"), what does it evaluate?',
        vi: 'Nếu Dim_Customers có 10,000 khách hàng và bạn tạo cột: High Value Check = IF(SUMX(RELATEDTABLE(Fact_Sales), Fact_Sales[Revenue]) > 1000, "High", "Normal"), nó sẽ đánh giá điều gì?'
      },
      options: [
        {
          en: 'Evaluates each customer\'s total lifetime sales and labels them "High" if > $1000, otherwise "Normal"',
          vi: 'Tính tổng doanh thu trọn đời của từng khách hàng và gán nhãn "High" nếu > $1000, ngược lại gán "Normal"'
        },
        {
          en: 'Labels all customers as "High" regardless of spend',
          vi: 'Gán nhãn tất cả khách hàng là "High"'
        },
        {
          en: 'Deletes customers with revenue under $1000',
          vi: 'Xóa các khách hàng có doanh thu dưới $1000'
        },
        {
          en: 'Causes a syntax error',
          vi: 'Báo lỗi cú pháp'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RELATEDTABLE gathers each customer\'s sales rows, SUMX sums their revenue, and IF categorizes the customer accordingly.',
        vi: 'RELATEDTABLE tập hợp các dòng bán hàng của từng khách hàng, SUMX tính tổng doanh thu và hàm IF phân loại khách hàng tương ứng.'
      },
      topicId: 'relationship_based_calculations',
      difficulty: 'medium'
    }
  ]
};

export default lesson11;
