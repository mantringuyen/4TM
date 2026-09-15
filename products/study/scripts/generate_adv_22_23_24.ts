import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const advMod02Dir = path.join(process.cwd(), 'src/data/excel/advanced/module02');
fs.mkdirSync(advMod02Dir, { recursive: true });

function saveLesson(filename: string, varName: string, lesson: Lesson) {
  const code = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lesson, null, 2)};\nexport default ${varName};\n`;
  fs.writeFileSync(path.join(advMod02Dir, filename), code, 'utf8');
  console.log(`Saved ${filename} (${lesson.id})`);
}

// =========================================================================
// LESSON 22: Power Pivot & The Excel Data Model (Star Schema & DAX Measures)
// New ID: excel_lesson_power_pivot
// =========================================================================
export const lesson22: Lesson = {
  id: 'excel_lesson_power_pivot',
  order: 22,
  courseId: 'excel',
  levelId: 'advanced',
  topicId: 'excel_power_pivot',
  title: {
    en: 'Power Pivot, The Excel Data Model, Star Schema Design & DAX Measures',
    vi: 'Power Pivot, Mô Hình Dữ Liệu Data Model, Thiết Kế Sơ Đồ Sao & Các Thước Đo DAX'
  },
  summary: {
    en: 'Handle 100M+ rows and build enterprise BI models inside Excel: xVelocity in-memory columnar database, 1-to-many relationship modeling (eliminating VLOOKUP helper columns), Star Schema design (Fact vs Dimension tables), and DAX measures (CALCULATE, SUMX, RELATED, DIVIDE, Time Intelligence).',
    vi: 'Xử lý hơn 100 triệu dòng và xây dựng mô hình BI doanh nghiệp ngay trong Excel: cơ sở dữ liệu dạng cột xVelocity lưu trong RAM, mô hình hóa quan hệ 1-nhiều (xóa bỏ cột phụ VLOOKUP), thiết kế Sơ đồ sao Star Schema (Bảng Fact vs Dimension) và viết thước đo DAX (CALCULATE, SUMX, RELATED, DIVIDE, Time Intelligence).'
  },
  learn: {
    introduction: {
      en: 'Traditional spreadsheets break down when joining multi-million row tables: writing millions of VLOOKUP formulas balloons file sizes to gigabytes and causes Excel to crash. Power Pivot introduces Microsoft\'s tabular database engine (the same engine powering Power BI) directly inside Excel, enabling instant relational modeling and ultra-fast DAX analytical calculations.',
      vi: 'Bảng tính truyền thống sẽ bị tê liệt khi liên kết các bảng hàng triệu dòng: viết hàng triệu công thức VLOOKUP làm dung lượng tệp phình to hàng Gigabyte và khiến Excel bị treo. Power Pivot mang bộ xử lý cơ sở dữ liệu dạng bảng của Microsoft (cùng bộ xử lý vận hành Power BI) vào trực tiếp trong Excel, cho phép mô hình hóa quan hệ tức thì và tính toán thước đo DAX siêu tốc.'
    },
    conceptExplanation: {
      en: `### 1. The Power Pivot Data Model Architecture
- **In-Memory Columnar Storage**: Uses the xVelocity engine to compress multi-million row tables by up to 90%, storing data in RAM.
- **Relational Diagram View**: Connect tables by dragging primary keys to foreign keys (e.g. \`DimCustomer[CustomerID]\` -> \`FactSales[CustomerID]\`).
- **Eliminating VLOOKUP**: Relationships resolve data attributes instantly without adding redundant helper columns to fact tables!

### 2. Star Schema Modeling Principles
- **Fact Tables (Center)**: Contain numeric transaction metrics (e.g. Sales, Orders, GL Entries) with foreign keys and quantities/revenue.
- **Dimension Tables (Points)**: Contain descriptive entity attributes (e.g. Customer Name, Product Category, Date Calendar, Store Location) with unique primary keys.

### 3. DAX (Data Analysis Expressions) Basics
- **Calculated Columns**: Row-by-row static columns (use sparingly to save RAM).
  \`Margin = FactSales[Revenue] - FactSales[Cost]\`
- **Explicit DAX Measures**: Dynamic formulas evaluated on the fly based on PivotTable filter context!
  - **\`DIVIDE()\`**: Safe division with built-in zero protection:
    \`Margin% = DIVIDE([Total Profit], [Total Revenue], 0)\`
  - **\`CALCULATE()\`**: The "God Function" of DAX—evaluates an expression under a modified filter context:
    \`West Sales = CALCULATE([Total Sales], DimRegion[Region] = "West")\`
  - **Iterator \`SUMX()\`**: Evaluates an expression row-by-row over a table and sums the result:
    \`Total Revenue = SUMX(FactSales, FactSales[Quantity] * RELATED(DimProduct[Price]))\``,
      vi: `### 1. Kiến Trúc Mô Hình Dữ Liệu Power Pivot
- **Lưu trữ dạng cột trong RAM**: Sử dụng bộ xử lý xVelocity nén các bảng hàng triệu dòng tới 90%, lưu trữ trực tiếp trong bộ nhớ RAM.
- **Sơ đồ quan hệ Diagram View**: Kết nối các bảng bằng cách kéo thả từ khóa chính sang khóa ngoại (ví dụ: \`DimCustomer[CustomerID]\` -> \`FactSales[CustomerID]\`).
- **Xóa bỏ hoàn toàn VLOOKUP**: Các mối quan hệ giúp tra cứu thuộc tính tức thì mà không cần chèn thêm cột phụ làm nặng bảng giao dịch!

### 2. Nguyên Lý Thiết Kế Sơ Đồ Sao (Star Schema)
- **Bảng Fact (Bảng Sự Kiện - Trung tâm)**: Chứa các giao dịch và chỉ số đo lường số học (Doanh số, Đơn hàng, Nhật ký kế toán) kèm các khóa ngoại.
- **Bảng Dimension (Bảng Danh Mục - Các cánh sao)**: Chứa các thuộc tính mô tả thực thể (Tên khách hàng, Danh mục sản phẩm, Lịch ngày tháng, Địa điểm chi nhánh) với khóa chính duy nhất.

### 3. Nền Tảng Ngôn Ngữ DAX (Data Analysis Expressions)
- **Calculated Columns (Cột tính toán)**: Tính toán tĩnh theo từng dòng (hạn chế dùng để tiết kiệm RAM).
- **Explicit DAX Measures (Thước đo DAX tường minh)**: Công thức động được tính toán tức thì theo bối cảnh bộ lọc (Filter Context) của PivotTable!
  - **\`DIVIDE()\`**: Phép chia an toàn tự động tránh lỗi chia cho 0:
    \`Margin% = DIVIDE([Total Profit], [Total Revenue], 0)\`
  - **\`CALCULATE()\`**: Hàm quyền năng nhất của DAX—tính toán biểu thức dưới một bối cảnh bộ lọc đã được điều chỉnh:
    \`West Sales = CALCULATE([Total Sales], DimRegion[Region] = "West")\`
  - **Hàm lặp \`SUMX()\`**: Duyệt tính toán từng dòng trên một bảng rồi lấy tổng:
    \`Total Revenue = SUMX(FactSales, FactSales[Quantity] * RELATED(DimProduct[Price]))\``
    },
    syntax: `# Basic DAX Measure:
Total Sales := SUM(FactSales[Revenue])

# Safe Division:
Gross Margin % := DIVIDE([Total Sales] - [Total Cost], [Total Sales], 0)

# CALCULATE with Filter Context Overwrite:
Online Sales := CALCULATE([Total Sales], DimChannel[ChannelName] = "Online")

# Time Intelligence (Year-to-Date):
YTD Sales := TOTALYTD([Total Sales], DimDate[Date])`,
    examples: [
      {
        title: { en: 'Creating a Dynamic DAX Measure with CALCULATE', vi: 'Tạo Thước Đo DAX Động Bằng Hàm CALCULATE' },
        code: `Measure Name: EuropeanSales
Formula: =CALCULATE([TotalSales], DimGeography[Continent] = "Europe")

Outcome: Evaluates total sales for the European territory regardless of external row filter context.`,
        description: {
          en: 'CALCULATE modifies the active filter context to enforce specific analytical boundaries.',
          vi: 'CALCULATE điều chỉnh bối cảnh bộ lọc đang hoạt động để áp dụng các ràng buộc phân tích cụ thể.'
        }
      },
      {
        title: { en: 'Cross-Table Row-Level Calculation with SUMX and RELATED', vi: 'Tính Toán Đa Bảng Từng Dòng Bằng SUMX và RELATED' },
        code: `Measure Name: TotalGrossRevenue
Formula: =SUMX(FactSales, FactSales[UnitsSold] * RELATED(DimProduct[UnitPrice]))`,
        description: {
          en: 'RELATED traverses the active 1-to-many relationship to fetch the product price for each sale row on the fly.',
          vi: 'RELATED đi theo mối quan hệ 1-nhiều đang hoạt động để lấy giá sản phẩm cho từng dòng bán hàng tức thì.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Creating dozens of Calculated Columns instead of DAX Measures, resulting in massive RAM consumption and sluggish model performance.',
          vi: 'Tạo hàng tá Cột tính toán Calculated Columns thay vì viết Thước đo DAX Measures, làm tốn dung lượng RAM và khiến mô hình chạy chậm.'
        },
        correction: {
          en: 'Use Calculated Columns ONLY when the field is needed as a Slicer or Row/Column header; use DAX Measures for all aggregations and metrics.',
          vi: 'CHỈ dùng Calculated Column khi cần đưa trường đó vào Slicer hoặc tiêu đề Hàng/Cột; hãy dùng DAX Measures cho tất cả các chỉ số tổng hợp.'
        }
      }
    ],
    tips: [
      { en: 'Always Create a Dedicated Date Table: Power Pivot time intelligence functions (TOTALYTD, SAMEPERIODLASTYEAR) require a continuous, gap-free Date Dimension table.', vi: 'Luôn tạo bảng ngày chuyên dụng: Các hàm thời gian trong DAX (TOTALYTD, SAMEPERIODLASTYEAR) bắt buộc phải có một bảng DimDate liên tục không bị đứt quãng.' },
      { en: 'Safe Division with DIVIDE: Never use the forward slash (/) for division in DAX; always use =DIVIDE(Num, Denom, 0) to avoid #DIV/0! errors.', vi: 'Phép chia an toàn với DIVIDE: Không bao giờ dùng dấu gạch chéo (/) trong DAX; luôn dùng =DIVIDE(TuSo, MauSo, 0) để triệt tiêu lỗi #DIV/0!.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l22_ex1',
      type: 'complete_code',
      title: { en: 'Write Safe Division DAX Measure', vi: 'Viết Thước Đo DAX Phép Chia An Toàn' },
      instruction: {
        en: 'Write the DAX measure formula using DIVIDE to calculate Margin % by dividing [Total Profit] by [Total Revenue], with fallback 0.',
        vi: 'Viết công thức thước đo DAX sử dụng hàm DIVIDE để tính Margin % bằng cách chia [Total Profit] cho [Total Revenue], dự phòng là 0.'
      },
      starterCode: '=DIVIDE([Total Profit], ',
      solutionCode: '=DIVIDE([Total Profit], [Total Revenue], 0)',
      expectedOutput: '=DIVIDE([Total Profit], [Total Revenue], 0)',
      hint: { en: '=DIVIDE([Total Profit], [Total Revenue], 0)', vi: '=DIVIDE([Total Profit], [Total Revenue], 0)' },
      explanation: { en: 'DIVIDE safely handles zero denominators without erroring.', vi: 'DIVIDE xử lý an toàn mẫu số bằng 0 mà không phát sinh lỗi.' }
    },
    {
      id: 'excel_l22_ex2',
      type: 'complete_code',
      title: { en: 'Write Filtered DAX Measure with CALCULATE', vi: 'Viết Thước Đo DAX Có Bộ Lọc Bằng CALCULATE' },
      instruction: {
        en: 'Write the DAX formula for measure "HighValueSales" that calculates [Total Sales] filtered for FactSales[Amount] > 10000.',
        vi: 'Viết công thức DAX cho thước đo "HighValueSales" tính [Total Sales] được lọc theo FactSales[Amount] > 10000.'
      },
      starterCode: '=CALCULATE([Total Sales], ',
      solutionCode: '=CALCULATE([Total Sales], FactSales[Amount] > 10000)',
      expectedOutput: '=CALCULATE([Total Sales], FactSales[Amount] > 10000)',
      hint: { en: '=CALCULATE([Total Sales], FactSales[Amount] > 10000)', vi: '=CALCULATE([Total Sales], FactSales[Amount] > 10000)' },
      explanation: { en: 'CALCULATE modifies the calculation context using specified boolean filters.', vi: 'CALCULATE điều chỉnh bối cảnh tính toán bằng các bộ lọc logic chỉ định.' }
    }
  ],
  challenge: {
    id: 'excel_l22_challenge',
    title: { en: 'Construct Multi-Table Cross-Entity DAX Expression', vi: 'Xây Dựng Biểu Thức DAX Đa Bảng Liên Bảng' },
    description: {
      en: 'Construct the DAX measure formula for [TotalRevenue] that iterates over table FactSales and calculates UnitsSold times the UnitPrice fetched from related table DimProduct using RELATED.',
      vi: 'Xây dựng công thức thước đo DAX cho [TotalRevenue] duyệt qua bảng FactSales và tính UnitsSold nhân với UnitPrice lấy từ bảng liên kết DimProduct bằng hàm RELATED.'
    },
    requirements: [
      { en: 'Use the SUMX iterator function', vi: 'Sử dụng hàm lặp SUMX' },
      { en: 'Iterate over table FactSales', vi: 'Lặp qua bảng FactSales' },
      { en: 'Use RELATED(DimProduct[UnitPrice])', vi: 'Dùng RELATED(DimProduct[UnitPrice])' }
    ],
    starterCode: '=',
    solutionCode: '=SUMX(FactSales, FactSales[UnitsSold] * RELATED(DimProduct[UnitPrice]))',
    hints: [
      { en: 'Syntax: =SUMX(FactSales, FactSales[UnitsSold] * RELATED(DimProduct[UnitPrice]))', vi: 'Cú pháp: =SUMX(FactSales, FactSales[UnitsSold] * RELATED(DimProduct[UnitPrice]))' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l22_q1',
      type: 'single_choice',
      question: {
        en: 'What is the primary function in DAX used to evaluate expressions under a modified filter context?',
        vi: 'Hàm chính trong DAX được sử dụng để đánh giá biểu thức dưới một bối cảnh bộ lọc đã được điều chỉnh là gì?'
      },
      options: [
        { en: '`CALCULATE()`', vi: '`CALCULATE()`' },
        { en: '`FILTER()`', vi: '`FILTER()`' },
        { en: '`SUM()`', vi: '`SUM()`' },
        { en: '`EVALUATE()`', vi: '`EVALUATE()`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CALCULATE is the single most important function in DAX, enabling explicit filter context manipulation.',
        vi: 'CALCULATE là hàm quan trọng nhất trong DAX, cho phép can thiệp và biến đổi trực tiếp bối cảnh bộ lọc.'
      },
      difficulty: 'easy',
      topicId: 'excel_power_pivot'
    },
    {
      id: 'excel_l22_q2',
      type: 'single_choice',
      question: {
        en: 'What is the architectural difference between a Fact Table and a Dimension Table in a Star Schema?',
        vi: 'Sự khác biệt về mặt kiến trúc giữa Bảng Fact và Bảng Dimension trong Sơ đồ hình sao (Star Schema) là gì?'
      },
      options: [
        { en: 'Fact tables contain quantitative numerical transaction metrics and foreign keys; Dimension tables contain qualitative entity attributes (customers, dates, stores) and primary keys', vi: 'Bảng Fact chứa các số liệu định lượng giao dịch và khóa ngoại; Bảng Dimension chứa các thuộc tính định tính của thực thể (khách hàng, ngày tháng, chi nhánh) và khóa chính' },
        { en: 'Fact tables are small; Dimension tables are massive', vi: 'Bảng Fact nhỏ; Bảng Dimension rất lớn' },
        { en: 'Fact tables only store dates', vi: 'Bảng Fact chỉ lưu ngày tháng' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Fact tables hold transactional records (numbers/keys); dimension tables provide context and slicing axes (lookup entities).',
        vi: 'Bảng Fact lưu các bản ghi giao dịch (số liệu/khóa); bảng dimension cung cấp bối cảnh và các trục phân tích lọc dữ liệu.'
      },
      difficulty: 'medium',
      topicId: 'excel_power_pivot'
    },
    {
      id: 'excel_l22_q3',
      type: 'single_choice',
      question: {
        en: 'Why is `DIVIDE(Numerator, Denominator, 0)` preferred over standard `/` division in DAX?',
        vi: 'Tại sao `DIVIDE(TuSo, MauSo, 0)` lại được ưu tiên hơn phép chia `/` thông thường trong DAX?'
      },
      options: [
        { en: 'It automatically intercepts division-by-zero errors and returns a designated fallback value without crashing the PivotTable', vi: 'Nó tự động bắt lỗi chia cho 0 và trả về giá trị dự phòng chỉ định mà không làm phát sinh lỗi trên PivotTable' },
        { en: 'DIVIDE multiplies by 100', vi: 'DIVIDE nhân với 100' },
        { en: 'Standard division is forbidden in DAX', vi: 'Phép chia thông thường bị cấm trong DAX' },
        { en: 'DIVIDE runs on the GPU', vi: 'DIVIDE chạy trên GPU' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'DIVIDE provides graceful zero-handling, preventing #DIV/0! errors from propagating across summary matrices.',
        vi: 'DIVIDE xử lý mẫu số bằng 0 một cách mượt mà, ngăn lỗi #DIV/0! lan rộng trên các ma trận báo cáo.'
      },
      difficulty: 'easy',
      topicId: 'excel_power_pivot'
    },
    {
      id: 'excel_l22_q4',
      type: 'single_choice',
      question: {
        en: 'What function allows an iterator like `SUMX` running on a Fact Table to fetch matching attribute values from a related Dimension Table?',
        vi: 'Hàm nào cho phép một hàm lặp như `SUMX` đang chạy trên Bảng Fact lấy các giá trị thuộc tính tương ứng từ Bảng Dimension có liên kết?'
      },
      options: [
        { en: '`RELATED()`', vi: '`RELATED()`' },
        { en: '`VLOOKUP()`', vi: '`VLOOKUP()`' },
        { en: '`FETCH()`', vi: '`FETCH()`' },
        { en: '`LOOKUPVALUE()`', vi: '`LOOKUPVALUE()`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'RELATED follows active 1-to-many relationships from the "many" side table to extract values from the "one" side table.',
        vi: 'RELATED đi theo mối quan hệ 1-nhiều đang hoạt động từ bảng phía "nhiều" để trích xuất giá trị từ bảng phía "một".'
      },
      difficulty: 'medium',
      topicId: 'excel_power_pivot'
    },
    {
      id: 'excel_l22_q5',
      type: 'single_choice',
      question: {
        en: 'What is the primary benefit of defining Explicit DAX Measures over Calculated Columns?',
        vi: 'Lợi ích chính của việc tạo Thước đo DAX tường minh (Explicit Measures) so với Cột tính toán (Calculated Columns) là gì?'
      },
      options: [
        { en: 'Measures do not consume RAM storage; they are computed dynamically at query time based on active filter context', vi: 'Measures không tiêu tốn dung lượng bộ nhớ RAM; chúng được tính toán động tại thời điểm truy vấn theo bối cảnh bộ lọc' },
        { en: 'Measures can only calculate text', vi: 'Measures chỉ tính được chữ' },
        { en: 'Measures require no formulas', vi: 'Measures không cần công thức' },
        { en: 'Calculated columns are faster', vi: 'Calculated columns chạy nhanh hơn' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Calculated Columns are stored in RAM for every row; Measures calculate on the fly, keeping models lightweight and fast.',
        vi: 'Calculated Columns chiếm dung lượng RAM cho từng dòng; Measures tính toán tức thời theo yêu cầu, giúp mô hình nhẹ và nhanh.'
      },
      difficulty: 'medium',
      topicId: 'excel_power_pivot'
    },
    {
      id: 'excel_l22_q6',
      type: 'true_false',
      question: {
        en: 'True or False: Power Pivot data models are limited to the 1,048,576 row maximum of standard Excel worksheets.',
        vi: 'Đúng hay Sai: Mô hình dữ liệu Power Pivot bị giới hạn ở mức tối đa 1.048.576 dòng như các trang tính Excel thông thường.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False (Power Pivot can hold hundreds of millions of compressed rows in memory)', vi: 'Sai (Power Pivot có thể chứa hàng trăm triệu dòng nén trong bộ nhớ RAM)' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. Power Pivot bypasses the worksheet grid row limitation, easily handling datasets exceeding 50 to 100+ million rows.',
        vi: 'Sai. Power Pivot vượt qua giới hạn dòng của bảng tính, xử lý nhẹ nhàng các tập dữ liệu từ 50 đến hơn 100 triệu dòng.'
      },
      difficulty: 'easy',
      topicId: 'excel_power_pivot'
    },
    {
      id: 'excel_l22_q7',
      type: 'single_choice',
      question: {
        en: 'What is "Filter Context" in DAX and Power Pivot?',
        vi: '"Filter Context" (Bối cảnh bộ lọc) trong DAX và Power Pivot là gì?'
      },
      options: [
        { en: 'The set of active filters applied to the data model from PivotTable row/column headers, page filters, and connected Slicers that determine which rows are evaluated', vi: 'Tập hợp các bộ lọc đang tác động lên mô hình từ tiêu đề hàng/cột của PivotTable, bộ lọc trang và các Slicer liên kết quyết định dòng dữ liệu nào được tính toán' },
        { en: 'The color scheme of the worksheet', vi: 'Bảng màu của trang tính' },
        { en: 'The SQL database password', vi: 'Mật khẩu cơ sở dữ liệu SQL' },
        { en: 'The font size of the table', vi: 'Cỡ chữ của bảng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Filter Context defines the dynamic subset of data visible to an aggregation calculation in any given Pivot cell coordinate.',
        vi: 'Filter Context xác định tập con dữ liệu thực tế được đưa vào phép tính tổng hợp tại bất kỳ tọa độ ô Pivot nào.'
      },
      difficulty: 'hard',
      topicId: 'excel_power_pivot'
    },
    {
      id: 'excel_l22_q8',
      type: 'single_choice',
      question: {
        en: 'What DAX function computes year-to-date running totals over a continuous calendar date column?',
        vi: 'Hàm DAX nào tính tổng lũy kế từ đầu năm đến hiện tại (Year-to-Date) trên một cột ngày tháng lịch liên tục?'
      },
      options: [
        { en: '`TOTALYTD([TotalSales], DimDate[Date])`', vi: '`TOTALYTD([TotalSales], DimDate[Date])`' },
        { en: '`YTD_SUM()`', vi: '`YTD_SUM()`' },
        { en: '`YEAR_RUNNING()`', vi: '`YEAR_RUNNING()`' },
        { en: '`CUMULATIVE_YEAR()`', vi: '`CUMULATIVE_YEAR()`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'TOTALYTD is a native DAX Time Intelligence function that aggregates metrics from the start of the year through the current evaluation date.',
        vi: 'TOTALYTD là hàm Time Intelligence tích hợp sẵn của DAX tổng hợp số liệu từ đầu năm đến ngày đang được tính toán.'
      },
      difficulty: 'medium',
      topicId: 'excel_power_pivot'
    },
    {
      id: 'excel_l22_q9',
      type: 'single_choice',
      question: {
        en: 'Which symbol in DAX syntax explicitly denotes an instantiated Measure rather than a column reference?',
        vi: 'Ký hiệu nào trong cú pháp DAX biểu thị rõ ràng một Thước đo (Measure) thay vì một tham chiếu cột?'
      },
      options: [
        { en: 'Square brackets without a table prefix (e.g. `[Total Revenue]`)', vi: 'Dấu ngoặc vuông không có tiền tố tên bảng (ví dụ `[Total Revenue]`)' },
        { en: 'Curly brackets `{}`', vi: 'Dấu ngoặc nhọn `{}`' },
        { en: 'A hashtag `#`', vi: 'Dấu thăng `#`' },
        { en: 'An exclamation point `!`', vi: 'Dấu chấm than `!`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Best practice DAX syntax requires column references to include table names (`FactSales[Qty]`) and measures to omit table names (`[Total Revenue]`).',
        vi: 'Quy chuẩn cú pháp DAX yêu cầu tham chiếu cột phải kèm tên bảng (`FactSales[Qty]`) và thước đo thì không kèm tên bảng (`[Total Revenue]`).'
      },
      difficulty: 'hard',
      topicId: 'excel_power_pivot'
    },
    {
      id: 'excel_l22_q10',
      type: 'single_choice',
      question: {
        en: 'How do relationships in Power Pivot eliminate the need for millions of VLOOKUP helper formulas?',
        vi: 'Mối quan hệ trong Power Pivot giúp loại bỏ nhu cầu sử dụng hàng triệu công thức phụ VLOOKUP như thế nào?'
      },
      options: [
        { en: 'Relationships allow PivotTables to aggregate fact records by dimension attributes on the fly across in-memory relationship pointers', vi: 'Mối quan hệ cho phép PivotTable tổng hợp các bản ghi fact theo thuộc tính dimension tức thì thông qua con trỏ quan hệ trong RAM' },
        { en: 'They automatically convert Excel to Google Sheets', vi: 'Chúng tự động chuyển Excel sang Google Sheets' },
        { en: 'They delete unused columns', vi: 'Chúng xóa các cột không dùng' },
        { en: 'They hide the formulas', vi: 'Chúng ẩn các công thức đi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Relational pointers bridge Fact and Dimension tables in memory, enabling multi-table queries without data duplication.',
        vi: 'Con trỏ quan hệ liên kết các bảng Fact và Dimension trong bộ nhớ, cho phép truy vấn đa bảng mà không cần nhân bản dữ liệu.'
      },
      difficulty: 'medium',
      topicId: 'excel_power_pivot'
    }
  ]
};

saveLesson('lesson22.ts', 'lesson22', lesson22);

// =========================================================================
// LESSON 23: Modern Functional Excel (LET, LAMBDA & Helper Functions)
// New ID: excel_lesson_lambda_let
// =========================================================================
export const lesson23: Lesson = {
  id: 'excel_lesson_lambda_let',
  order: 23,
  courseId: 'excel',
  levelId: 'advanced',
  topicId: 'excel_functional',
  title: {
    en: 'Modern Functional Excel: LET, LAMBDA, Higher-Order Helpers & Custom Functions',
    vi: 'Lập Trình Hàm Hiện Đại Trong Excel: LET, LAMBDA, Các Hàm Bậc Cao & Hàm Tự Định Nghĩa'
  },
  summary: {
    en: 'Transform Excel into a modern functional programming environment: eliminate redundant recalculations with local LET variables, author reusable parameter-driven custom functions with LAMBDA, register custom business logic in Name Manager, and apply higher-order array iterators (MAP, REDUCE, SCAN, BYROW, BYCOL).',
    vi: 'Biến Excel thành môi trường lập trình hàm hiện đại: triệt tiêu các phép tính toán lặp lại thừa thãi bằng biến cục bộ LET, tự viết các hàm tùy biến có tham số tái sử dụng bằng LAMBDA, đăng ký hàm nghiệp vụ vào Name Manager và ứng dụng các hàm duyệt mảng bậc cao (MAP, REDUCE, SCAN, BYROW, BYCOL).'
  },
  learn: {
    introduction: {
      en: 'For decades, writing complex Excel formulas meant either copy-pasting the exact same massive expression multiple times within a single cell (causing terrible recalculation lag) or writing legacy VBA macros. The modern \`LET\` and \`LAMBDA\` functions bring true computer science abstractions—local scoped variables and pure functional programming—directly to the formula bar without macros.',
      vi: 'Trong nhiều thập kỷ, viết công thức Excel phức tạp đồng nghĩa với việc phải sao chép lặp lại cùng một biểu thức dài nhiều lần trong 1 ô (gây đơ giật tính toán) hoặc phải viết macro VBA. Các hàm hiện đại \`LET\` và \`LAMBDA\` mang các nguyên lý khoa học máy tính chuẩn mực—khai báo biến cục bộ và lập trình hàm thuần khiết—vào thẳng thanh công thức mà không cần đến macro.'
    },
    conceptExplanation: {
      en: `### 1. The \`LET\` Function (Local Variable Scoping & Speed)
- **Problem**: In \`=IF(VLOOKUP(A1, Table, 2, 0) > 100, VLOOKUP(A1, Table, 2, 0) * 0.9, VLOOKUP(A1, Table, 2, 0))\`, Excel executes the slow VLOOKUP **three separate times**!
- **Solution with LET**: Assign the lookup result to a local variable once:
  \`=LET(price, VLOOKUP(A1, Table, 2, 0), IF(price > 100, price * 0.9, price))\`
  - Runs **up to 100x faster** by caching intermediate calculations in memory.
  - Dramatically improves formula readability and maintainability.

### 2. The \`LAMBDA\` Function (Custom Reusable Functions)
- **Syntax**: \`=LAMBDA([parameter1, parameter2, ...], calculation)\`
- **Testing in a cell**: Append invocation arguments at the end:
  \`=LAMBDA(x, y, (x * y) * 1.1)(10, 5)\` -> returns \`55\`
- **Creating a True Named Custom Function**:
  1. Open *Formulas* tab -> **Name Manager** -> New.
  2. Name: \`CALCTAX\`.
  3. Refers to: \`=LAMBDA(amount, rate, amount * (1 + rate))\`.
  4. Now anywhere in your workbook, simply type: \`=CALCTAX(B2, 0.08)\`!

### 3. Higher-Order Array Helper Functions
- **\`=MAP(array1, lambda_function)\`**: Applies a custom LAMBDA to every element of an array and returns a matching array of results.
- **\`=BYROW(array, lambda_function)\`**: Computes row-by-row summaries (e.g. \`=BYROW(A1:D10, LAMBDA(r, MAX(r)))\`).
- **\`=BYCOL(array, lambda_function)\`**: Computes column-by-column summaries.
- **\`=REDUCE(initial_value, array, lambda_accumulator)\`**: Accumulates an array down to a single scalar value.
- **\`=SCAN(initial_value, array, lambda_accumulator)\`**: Emits running intermediate accumulation steps as a spilled dynamic array (great for running balances!).`,
      vi: `### 1. Hàm \`LET\` (Khai Báo Biến Cục Bộ & Tăng Tốc)
- **Vấn đề**: Trong công thức \`=IF(VLOOKUP(A1, Table, 2, 0) > 100, VLOOKUP(A1, Table, 2, 0) * 0.9, VLOOKUP(A1, Table, 2, 0))\`, Excel phải thực thi hàm VLOOKUP chậm chạp **ba lần độc lập**!
- **Giải pháp với LET**: Gán kết quả tra cứu vào một biến cục bộ một lần duy nhất:
  \`=LET(gia, VLOOKUP(A1, Table, 2, 0), IF(gia > 100, gia * 0.9, gia))\`
  - Chạy **nhanh hơn tới 100 lần** nhờ lưu kết quả trung gian vào bộ nhớ.
  - Làm công thức trở nên cực kỳ trong sáng, dễ đọc và bảo trì.

### 2. Hàm \`LAMBDA\` (Tự Tạo Hàm Tái Sử Dụng Không Cần Macro)
- **Cú pháp**: \`=LAMBDA([tham_so1, tham_so2, ...], bieu_thuc_tinh_toan)\`
- **Chạy thử trong ô**: Thêm các đối số thực thi ở cuối:
  \`=LAMBDA(x, y, (x * y) * 1.1)(10, 5)\` -> trả về \`55\`
- **Đăng ký thành Hàm Đặt Tên Chính Thức**:
  1. Mở thẻ *Formulas* -> **Name Manager** -> New.
  2. Tên hàm: \`TINHTHUE\`.
  3. Refers to: \`=LAMBDA(so_tien, thue_suat, so_tien * (1 + thue_suat))\`.
  4. Giờ đây ở bất cứ ô nào, bạn chỉ cần gõ: \`=TINHTHUE(B2, 0.08)\`!

### 3. Các Hàm Duyệt Mảng Bậc Cao (Higher-Order Helpers)
- **\`=MAP(mang, ham_lambda)\`**: Áp dụng hàm LAMBDA lên từng phần tử của mảng và trả về mảng kết quả tương ứng.
- **\`=BYROW(mang, ham_lambda)\`**: Tính toán tóm tắt theo từng hàng (ví dụ: \`=BYROW(A1:D10, LAMBDA(r, MAX(r)))\`).
- **\`=BYCOL(mang, ham_lambda)\`**: Tính toán tóm tắt theo từng cột.
- **\`=REDUCE(gia_tri_dau, mang, lambda_tich_luy)\`**: Gộp mảng thành một giá trị đơn lẻ duy nhất.
- **\`=SCAN(gia_tri_dau, mang, lambda_tich_luy)\`**: Xuất ra từng bước cộng dồn tích lũy dưới dạng mảng tràn động (tuyệt vời để tạo cột số dư lũy kế!).`
    },
    syntax: `# LET Scoping:
=LET(
  x, A1 * 2,
  y, B1 * 3,
  x + y
)

# LAMBDA Definition:
=LAMBDA(revenue, tax_rate, revenue * (1 - tax_rate))

# BYROW Row-Level Max Calculation:
=BYROW(B2:E50, LAMBDA(row, MAX(row)))

# SCAN Running Cumulative Total:
=SCAN(0, B2:B100, LAMBDA(total, current, total + current))`,
    examples: [
      {
        title: { en: 'High-Performance Clean Margin Calculation with LET', vi: 'Tính Biên Lợi Nhuận Hiệu Năng Cao Bằng LET' },
        code: `=LET(
  rev, SalesTable[Revenue],
  cogs, SalesTable[COGS],
  profit, rev - cogs,
  margin, profit / rev,
  IF(margin > 0.20, "High Margin", "Standard")
)`,
        description: {
          en: 'Variables rev, cogs, profit, and margin are evaluated once, making complex conditional logic fast and legible.',
          vi: 'Các biến rev, cogs, profit và margin chỉ tính một lần, giúp logic điều kiện phức tạp chạy nhanh và sáng rõ.'
        }
      },
      {
        title: { en: 'Generating a Running Cumulative Balance with SCAN', vi: 'Tạo Cột Số Dư Lũy Kế Tự Động Bằng Hàm SCAN' },
        code: `Cash Inflows in B2:B20
Target: Compute dynamic running account balance starting at $10,000

Formula in C2: =SCAN(10000, B2:B20, LAMBDA(acc, val, acc + val))`,
        description: {
          en: 'SCAN emits a spilled array containing the rolling cumulative balance at each transaction step.',
          vi: 'SCAN trả về mảng tràn động chứa số dư tài khoản lũy kế tại từng bước giao dịch.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Entering a LAMBDA formula into a cell without trailing test parameters (=LAMBDA(x, x*2)), causing a #CALC! error.',
          vi: 'Gõ công thức LAMBDA vào ô mà không có tham số chạy thử ở cuối (=LAMBDA(x, x*2)), gây lỗi #CALC!.'
        },
        correction: {
          en: 'To test a LAMBDA in-cell, pass arguments immediately after: =LAMBDA(x, x*2)(50) -> returns 100.',
          vi: 'Để kiểm tra LAMBDA trong ô, truyền đối số ngay phía sau: =LAMBDA(x, x*2)(50) -> trả về 100.'
        }
      }
    ],
    tips: [
      { en: 'Format LET with Line Breaks: Press Alt + Enter inside the formula bar to put each variable assignment on its own indented line for crystal clear code structure.', vi: 'Xuống dòng trong LET: Nhấn Alt + Enter trên thanh công thức để đưa từng biến vào một dòng riêng biệt giúp cấu trúc mã cực kỳ rõ ràng.' },
      { en: 'Store LAMBDAs in Name Manager: Once tested, save your LAMBDA formulas into the Name Manager so your entire organization can call custom business functions by name.', vi: 'Lưu LAMBDA vào Name Manager: Sau khi thử nghiệm, hãy lưu các công thức LAMBDA vào Name Manager để toàn công ty có thể gọi hàm nghiệp vụ theo tên.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l23_ex1',
      type: 'complete_code',
      title: { en: 'Write a Clean Local Variable Calculation with LET', vi: 'Viết Phép Tính Biến Cục Bộ Bằng LET' },
      instruction: {
        en: 'Write a LET formula that defines variable "subtotal" as A2 * B2 and returns subtotal * 1.1.',
        vi: 'Viết công thức LET định nghĩa biến "subtotal" là A2 * B2 và trả về subtotal * 1.1.'
      },
      starterCode: '=LET(subtotal, A2 * B2, ',
      solutionCode: '=LET(subtotal, A2 * B2, subtotal * 1.1)',
      expectedOutput: '=LET(subtotal, A2 * B2, subtotal * 1.1)',
      hint: { en: 'Pass subtotal * 1.1 as the final expression.', vi: 'Truyền subtotal * 1.1 làm biểu thức kết quả cuối cùng.' },
      explanation: { en: 'LET evaluates intermediate expressions once and binds them to named variables.', vi: 'LET tính toán các biểu thức trung gian một lần và gán vào các biến đã đặt tên.' }
    },
    {
      id: 'excel_l23_ex2',
      type: 'complete_code',
      title: { en: 'Construct Row-by-Row Sum using BYROW and LAMBDA', vi: 'Tính Tổng Từng Hàng Bằng BYROW và LAMBDA' },
      instruction: {
        en: 'Write a formula using BYROW on range A1:D10 with a LAMBDA that calculates the SUM of each row.',
        vi: 'Viết công thức sử dụng BYROW trên dải A1:D10 với hàm LAMBDA tính tổng SUM của từng hàng.'
      },
      starterCode: '=BYROW(A1:D10, LAMBDA(r, ',
      solutionCode: '=BYROW(A1:D10, LAMBDA(r, SUM(r)))',
      expectedOutput: '=BYROW(A1:D10, LAMBDA(r, SUM(r)))',
      hint: { en: 'LAMBDA(r, SUM(r))', vi: 'LAMBDA(r, SUM(r))' },
      explanation: { en: 'BYROW iterates down each row vector and evaluates the inner LAMBDA function.', vi: 'BYROW duyệt qua từng vector hàng và thực thi hàm LAMBDA bên trong.' }
    }
  ],
  challenge: {
    id: 'excel_l23_challenge',
    title: { en: 'Construct Cumulative Running Balance with SCAN', vi: 'Tạo Chuỗi Số Dư Lũy Kế Bằng SCAN' },
    description: {
      en: 'Construct a dynamic SCAN formula that begins with an initial opening balance of 5000 and accumulates sequential transaction inflows from range B2:B20.',
      vi: 'Xây dựng công thức SCAN động bắt đầu với số dư đầu kỳ là 5000 và tích lũy các dòng tiền giao dịch liên tiếp từ dải B2:B20.'
    },
    requirements: [
      { en: 'Use the SCAN function', vi: 'Sử dụng hàm SCAN' },
      { en: 'Initial value 5000', vi: 'Giá trị khởi tạo 5000' },
      { en: 'Accumulator LAMBDA(acc, val, acc + val)', vi: 'Hàm tích lũy LAMBDA(acc, val, acc + val)' }
    ],
    starterCode: '=',
    solutionCode: '=SCAN(5000, B2:B20, LAMBDA(acc, val, acc + val))',
    hints: [
      { en: 'Syntax: =SCAN(5000, B2:B20, LAMBDA(acc, val, acc + val))', vi: 'Cú pháp: =SCAN(5000, B2:B20, LAMBDA(acc, val, acc + val))' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l23_q1',
      type: 'single_choice',
      question: {
        en: 'What is the primary operational advantage of using the `LET` function in complex Excel formulas?',
        vi: 'Lợi thế vận hành cốt lõi của việc sử dụng hàm `LET` trong các công thức Excel phức tạp là gì?'
      },
      options: [
        { en: 'It assigns names to calculation results, preventing repetitive redundant sub-evaluations and significantly boosting calculation performance', vi: 'Nó gán tên cho kết quả tính toán trung gian, loại bỏ các phép tính lặp lại dư thừa và tăng tốc hiệu năng tính toán đáng kể' },
        { en: 'It converts formulas to Python', vi: 'Nó chuyển đổi công thức sang Python' },
        { en: 'It translates the sheet into Spanish', vi: 'Nó dịch bảng tính sang tiếng Tây Ban Nha' },
        { en: 'It locks the cells against editing', vi: 'Nó khóa không cho chỉnh sửa ô' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LET stores intermediate values in memory once, eliminating the need to recalculate identical sub-expressions multiple times in one formula.',
        vi: 'LET lưu các giá trị trung gian vào bộ nhớ một lần duy nhất, tránh việc phải tính toán lại cùng một biểu thức con nhiều lần trong một công thức.'
      },
      difficulty: 'easy',
      topicId: 'excel_functional'
    },
    {
      id: 'excel_l23_q2',
      type: 'single_choice',
      question: {
        en: 'How do you turn a `LAMBDA` formula into a permanent, reusable custom function across your workbook?',
        vi: 'Làm thế nào để biến một công thức `LAMBDA` thành một hàm tùy chỉnh vĩnh viễn, có thể tái sử dụng trong toàn bộ file?'
      },
      options: [
        { en: 'Define it in the Name Manager (Formulas tab -> Name Manager -> New -> assign name and paste LAMBDA formula)', vi: 'Định nghĩa nó trong Name Manager (Thẻ Formulas -> Name Manager -> New -> đặt tên hàm và dán công thức LAMBDA)' },
        { en: 'Export as a .DLL file', vi: 'Xuất ra tệp .DLL' },
        { en: 'Save the workbook as a PDF', vi: 'Lưu bảng tính dạng PDF' },
        { en: 'Write it in uppercase letters only', vi: 'Chỉ viết bằng chữ in hoa' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Naming a LAMBDA formula in the Name Manager registers it as a native first-class function callable from any cell.',
        vi: 'Đặt tên cho công thức LAMBDA trong Name Manager sẽ đăng ký nó thành một hàm chính thức có thể gọi từ bất kỳ ô nào.'
      },
      difficulty: 'medium',
      topicId: 'excel_functional'
    },
    {
      id: 'excel_l23_q3',
      type: 'single_choice',
      question: {
        en: 'What does the higher-order helper function `=BYROW(A1:D10, LAMBDA(r, AVERAGE(r)))` return?',
        vi: 'Hàm hỗ trợ bậc cao `=BYROW(A1:D10, LAMBDA(r, AVERAGE(r)))` trả về kết quả gì?'
      },
      options: [
        { en: 'A spilled column of 10 values representing the mathematical average of each of the 10 rows', vi: 'Một mảng cột gồm 10 giá trị đại diện cho trung bình cộng của từng hàng trong 10 hàng' },
        { en: 'The overall average of all 40 cells', vi: 'Trung bình cộng chung của toàn bộ 40 ô' },
        { en: 'A 10x4 grid of numbers', vi: 'Một bảng 10x4 số' },
        { en: 'An error', vi: 'Một thông báo lỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'BYROW applies the LAMBDA function to each row vector independently, outputting a 1D column vector of row averages.',
        vi: 'BYROW áp dụng hàm LAMBDA cho từng vector hàng độc lập, xuất ra một cột gồm giá trị trung bình của từng hàng.'
      },
      difficulty: 'medium',
      topicId: 'excel_functional'
    },
    {
      id: 'excel_l23_q4',
      type: 'single_choice',
      question: {
        en: 'What is the difference between `REDUCE` and `SCAN` in Excel\'s functional array suite?',
        vi: 'Sự khác biệt giữa hàm `REDUCE` và `SCAN` trong bộ hàm xử lý mảng của Excel là gì?'
      },
      options: [
        { en: 'REDUCE returns only the single final accumulated scalar value; SCAN returns all intermediate accumulation steps as a spilled dynamic array', vi: 'REDUCE chỉ trả về một giá trị tích lũy cuối cùng duy nhất; SCAN trả về tất cả các bước tích lũy trung gian dưới dạng mảng tràn động' },
        { en: 'REDUCE is for text; SCAN is for numbers', vi: 'REDUCE dùng cho chữ; SCAN dùng cho số' },
        { en: 'SCAN scans barcodes with the camera', vi: 'SCAN quét mã vạch bằng camera' },
        { en: 'They are identical', vi: 'Chúng hoàn toàn giống nhau' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'REDUCE condenses an array into a single final aggregate; SCAN emits the step-by-step rolling progression (ideal for running totals).',
        vi: 'REDUCE thu gọn mảng thành một giá trị tổng hợp duy nhất; SCAN xuất ra quá trình cộng dồn từng bước (lý tưởng cho số dư lũy kế).'
      },
      difficulty: 'hard',
      topicId: 'excel_functional'
    },
    {
      id: 'excel_l23_q5',
      type: 'single_choice',
      question: {
        en: 'How do you test a LAMBDA formula in an active worksheet cell before storing it in the Name Manager?',
        vi: 'Làm thế nào để thử nghiệm một công thức LAMBDA trong ô trang tính trước khi lưu vào Name Manager?'
      },
      options: [
        { en: 'Append the arguments in parentheses at the end of the formula: `=LAMBDA(x, x*2)(25)`', vi: 'Thêm các đối số trong ngoặc đơn ở cuối công thức: `=LAMBDA(x, x*2)(25)`' },
        { en: 'Press Ctrl + Shift + Enter', vi: 'Nhấn Ctrl + Shift + Enter' },
        { en: 'Wrap with TEST()', vi: 'Bọc ngoài bằng TEST()' },
        { en: 'LAMBDAs cannot be tested in cells', vi: 'LAMBDA không thể chạy thử trong ô' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In-cell testing uses immediate invocation syntax, passing arguments in parentheses right after the LAMBDA definition.',
        vi: 'Chạy thử trong ô sử dụng cú pháp gọi thực thi ngay, truyền các đối số trong dấu ngoặc đơn ngay sau định nghĩa LAMBDA.'
      },
      difficulty: 'medium',
      topicId: 'excel_functional'
    },
    {
      id: 'excel_l23_q6',
      type: 'true_false',
      question: {
        en: 'True or False: Using `LET` variables requires macro-enabled workbook formats (.xlsm).',
        vi: 'Đúng hay Sai: Việc sử dụng các biến `LET` yêu cầu định dạng sổ làm việc có hỗ trợ macro (.xlsm).'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False (LET and LAMBDA are native formulas supported in standard .xlsx files)', vi: 'Sai (LET và LAMBDA là các hàm chuẩn có sẵn trong tệp .xlsx thông thường)' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. LET and LAMBDA are native Microsoft 365 calculation engine functions that work in standard .xlsx workbooks without macros.',
        vi: 'Sai. LET và LAMBDA là các hàm gốc của bộ tính toán Microsoft 365 hoạt động trên tệp .xlsx tiêu chuẩn không cần macro.'
      },
      difficulty: 'easy',
      topicId: 'excel_functional'
    },
    {
      id: 'excel_l23_q7',
      type: 'single_choice',
      question: {
        en: 'What does the function `=MAP(A1:A10, LAMBDA(val, val * 1.05))` accomplish?',
        vi: 'Hàm `=MAP(A1:A10, LAMBDA(val, val * 1.05))` thực hiện điều gì?'
      },
      options: [
        { en: 'Multiplies every individual cell in A1:A10 by 1.05 and spills the resulting 10-element array', vi: 'Nhân từng ô đơn lẻ trong dải A1:A10 với 1.05 và tràn mảng kết quả gồm 10 phần tử ra bảng tính' },
        { en: 'Draws a geographic map of region A1:A10', vi: 'Vẽ bản đồ địa lý cho khu vực A1:A10' },
        { en: 'Sorts the cells in ascending order', vi: 'Sắp xếp các ô theo thứ tự tăng dần' },
        { en: 'Finds the maximum value', vi: 'Tìm giá trị lớn nhất' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MAP applies the specified LAMBDA transformation to each element of the input array and returns the transformed array.',
        vi: 'Hàm MAP áp dụng phép biến đổi LAMBDA chỉ định cho từng phần tử của mảng đầu vào và trả về mảng kết quả.'
      },
      difficulty: 'medium',
      topicId: 'excel_functional'
    },
    {
      id: 'excel_l23_q8',
      type: 'single_choice',
      question: {
        en: 'Can a custom function created with `LAMBDA` call itself recursively to solve iterative problems like calculating factorials?',
        vi: 'Một hàm tùy chỉnh tạo bằng `LAMBDA` có thể tự gọi lại chính nó theo kiểu đệ quy (recursive) để giải các bài toán lặp như tính giai thừa không?'
      },
      options: [
        { en: 'Yes, LAMBDA fully supports recursive function calls when defined in the Name Manager', vi: 'Có, LAMBDA hỗ trợ hoàn toàn việc gọi hàm đệ quy khi được định nghĩa trong Name Manager' },
        { en: 'No, recursion is strictly impossible in Excel formulas', vi: 'Không, đệ quy hoàn toàn không thể thực hiện trong công thức Excel' },
        { en: 'Only on 64-bit Windows Excel', vi: 'Chỉ trên Excel Windows 64-bit' },
        { en: 'Only if VBA is enabled', vi: 'Chỉ khi bật VBA' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'LAMBDA functions stored in the Name Manager can call themselves recursively, unlocking Turing-complete computation.',
        vi: 'Hàm LAMBDA lưu trong Name Manager có thể tự gọi đệ quy chính nó, mở ra khả năng tính toán Turing-complete trong Excel.'
      },
      difficulty: 'hard',
      topicId: 'excel_functional'
    },
    {
      id: 'excel_l23_q9',
      type: 'single_choice',
      question: {
        en: 'In the formula `=LET(a, 10, b, 20, a * b)`, what is the output displayed in the cell?',
        vi: 'Trong công thức `=LET(a, 10, b, 20, a * b)`, kết quả nào được hiển thị trong ô?'
      },
      options: [
        { en: '200', vi: '200' },
        { en: '30', vi: '30' },
        { en: '"a * b"', vi: '"a * b"' },
        { en: '#VALUE!', vi: '#VALUE!' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The variable `a` is 10, `b` is 20, and the calculation expression `a * b` computes 10 * 20 = 200.',
        vi: 'Biến `a` là 10, `b` là 20, và biểu thức tính toán `a * b` cho kết quả 10 * 20 = 200.'
      },
      difficulty: 'easy',
      topicId: 'excel_functional'
    },
    {
      id: 'excel_l23_q10',
      type: 'single_choice',
      question: {
        en: 'What function generates a 2D matrix of values evaluated from row and column coordinate indexes using a custom LAMBDA?',
        vi: 'Hàm nào tạo ra ma trận 2 chiều các giá trị được tính toán từ chỉ số tọa độ hàng và cột bằng hàm LAMBDA tùy chỉnh?'
      },
      options: [
        { en: '`MAKEARRAY(rows, cols, lambda_function)`', vi: '`MAKEARRAY(rows, cols, lambda_function)`' },
        { en: '`CREATEGRID()`', vi: '`CREATEGRID()`' },
        { en: '`NEW_MATRIX()`', vi: '`NEW_MATRIX()`' },
        { en: '`GRID()`', vi: '`GRID()`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MAKEARRAY creates a grid of dimensions (rows, cols) where each element is computed via LAMBDA(row_index, col_index, expression).',
        vi: 'MAKEARRAY tạo bảng số kích thước (hàng, cột) trong đó mỗi phần tử được tính qua LAMBDA(chi_so_hang, chi_so_cot, bieu_thuc).'
      },
      difficulty: 'hard',
      topicId: 'excel_functional'
    }
  ]
};

saveLesson('lesson23.ts', 'lesson23', lesson23);

// =========================================================================
// LESSON 24: Workbook Automation & Extensibility (VBA vs Office Scripts & TypeScript)
// New ID: excel_lesson_vba_office_scripts
// =========================================================================
export const lesson24: Lesson = {
  id: 'excel_lesson_vba_office_scripts',
  order: 24,
  courseId: 'excel',
  levelId: 'advanced',
  topicId: 'excel_automation',
  title: {
    en: 'Workbook Automation, Macros & Modern Extensibility: Legacy VBA vs Cloud Office Scripts',
    vi: 'Tự Động Hóa Bảng Tính, Macros & Mở Rộng Hiện Đại: VBA Cổ Điển vs Office Scripts Điện Toán Đám Mây'
  },
  summary: {
    en: 'Navigate the complete spreadsheet automation landscape: comparing desktop-bound legacy VBA macros with modern cross-platform cloud Office Scripts (TypeScript), recording macros, understanding the Excel Object Model, debugging script execution, and integrating automated workflows with Power Automate.',
    vi: 'Bao quát toàn diện bức tranh tự động hóa bảng tính: so sánh macro VBA cổ điển trên máy tính bàn với Office Scripts hiện đại đa nền tảng (TypeScript), ghi macro tự động, làm chủ Mô hình Đối tượng Excel Object Model, gỡ lỗi tập lệnh và tích hợp quy trình tự động hóa với Power Automate.'
  },
  learn: {
    introduction: {
      en: 'Repetitive daily tasks—formatting weekly reports, exporting PDFs, emailing summaries, and applying data cleansers—should never be performed manually. Excel provides two distinct automation pathways: legacy Visual Basic for Applications (VBA) for traditional desktop power users, and modern cloud-native Office Scripts (powered by TypeScript) that run across Web, Mac, Windows, and automated Power Automate cloud triggers.',
      vi: 'Các công việc lặp đi lặp lại hàng ngày—định dạng báo cáo tuần, xuất file PDF, gửi email tóm tắt và làm sạch dữ liệu—không bao giờ nên làm thủ công. Excel cung cấp hai con đường tự động hóa riêng biệt: Visual Basic for Applications (VBA) cổ điển dành cho người dùng máy tính để bàn truyền thống và Office Scripts hiện đại trên nền tảng đám mây (sử dụng TypeScript) chạy mượt mà trên Web, Mac, Windows và tích hợp với Power Automate.'
    },
    conceptExplanation: {
      en: `### 1. Automation Comparison: VBA vs Modern Office Scripts
| Feature | Legacy VBA Macros | Modern Office Scripts |
| :--- | :--- | :--- |
| **Language** | Visual Basic for Applications (VBA) | **TypeScript / JavaScript** |
| **Platform** | Windows & Mac Desktop only | **Cross-Platform** (Excel Web, Windows, Mac, iPad) |
| **File Format** | Macro-enabled (\`.xlsm\`, \`.xlsb\`) | Standard clean files (\`.xlsx\`)! |
| **Cloud / Power Automate** | No native cloud execution | **Full Power Automate Cloud Flow Integration** |
| **Security** | Blocked by corporate IT firewalls | **Secure Cloud Sandbox** managed by Microsoft 365 |

### 2. The Excel Object Model Hierarchy
Both VBA and TypeScript interact with Excel through structured hierarchical object models:
- **Application** -> **Workbooks** -> **Worksheets** -> **Range / Tables** -> **Cells / Formats**

### 3. Writing Modern Office Scripts (Automate Tab)
Office Scripts uses TypeScript with clean async/sync APIs:
\`\`\`typescript
function main(workbook: ExcelScript.Workbook) {
  const sheet = workbook.getActiveWorksheet();
  const table = sheet.getTable("SalesTable");
  
  // Apply formatting and add a summary row
  table.setShowTotals(true);
  const revenueCol = table.getColumnByName("Revenue");
  revenueCol.getRangeBetweenHeaderAndTotal().setNumberFormat("$#,##0.00");
}
\`\`\`

### 4. Power Automate Cloud Integration
With Office Scripts, you can trigger Excel scripts automatically:
- Every night at 12:00 AM (Scheduled Flow).
- When a new customer order email arrives in Outlook.
- When a Microsoft Form survey is submitted.`,
      vi: `### 1. So Sánh Hai Nền Tảng Tự Động Hóa: VBA vs Office Scripts
| Đặc Tính | Macro VBA Cổ Điển | Office Scripts Hiện Đại |
| :--- | :--- | :--- |
| **Ngôn ngữ** | Visual Basic for Applications (VBA) | **TypeScript / JavaScript** |
| **Nền tảng** | Chỉ Windows & Mac Desktop | **Đa nền tảng** (Excel Web, Windows, Mac, iPad) |
| **Định dạng file** | Bắt buộc tệp chứa macro (\`.xlsm\`) | Tệp tiêu chuẩn sạch sẽ (\`.xlsx\`)! |
| **Điện toán đám mây** | Không chạy được trên đám mây | **Tích hợp sâu với Power Automate Cloud** |
| **Bảo mật** | Thường bị tường lửa IT doanh nghiệp chặn | **Môi trường Sandbox bảo mật** của Microsoft 365 |

### 2. Phân Cấp Mô Hình Đối Tượng (Excel Object Model)
Cả VBA và TypeScript đều tương tác với Excel qua mô hình đối tượng có cấu trúc phân cấp:
- **Application** (Ứng dụng) -> **Workbooks** (Sổ làm việc) -> **Worksheets** (Trang tính) -> **Range / Tables** (Dải ô / Bảng) -> **Cells / Formats** (Ô / Định dạng)

### 3. Viết Mã Office Scripts Hiện Đại (Thẻ Automate)
Office Scripts sử dụng TypeScript với các API rõ ràng, an toàn kiểu:
\`\`\`typescript
function main(workbook: ExcelScript.Workbook) {
  const sheet = workbook.getActiveWorksheet();
  const table = sheet.getTable("SalesTable");
  
  // Bật dòng tổng kết và định dạng tiền tệ
  table.setShowTotals(true);
  const revenueCol = table.getColumnByName("Revenue");
  revenueCol.getRangeBetweenHeaderAndTotal().setNumberFormat("$#,##0.00");
}
\`\`\`

### 4. Tự Động Hóa Không Chạm Với Power Automate Cloud
Với Office Scripts, bạn có thể kích hoạt chạy script Excel hoàn toàn tự động:
- Vào 0h mỗi đêm theo lịch định kỳ (Scheduled Flow).
- Khi có email đơn hàng mới gửi đến hộp thư Outlook.
- Khi có biểu mẫu Microsoft Forms mới được gửi lên.`
    },
    syntax: `# VBA Macro Subroutine (Legacy):
Sub FormatReport()
  Dim ws As Worksheet
  Set ws = ActiveSheet
  ws.Range("A1:E1").Font.Bold = True
  ws.Range("A1:E1").Interior.Color = RGB(220, 230, 242)
End Sub

# Modern Office Script (TypeScript):
function main(workbook: ExcelScript.Workbook) {
  const sheet = workbook.getActiveWorksheet();
  const headerRange = sheet.getRange("A1:E1");
  headerRange.getFormat().getFont().setBold(true);
  headerRange.getFormat().getFill().setColor("#DCE6F2");
}`,
    examples: [
      {
        title: { en: 'Automated Daily Table Formatting Office Script', vi: 'Tập Lệnh Office Script Tự Động Định Dạng Bảng Hàng Ngày' },
        code: `function main(workbook: ExcelScript.Workbook) {
  const selectedSheet = workbook.getActiveWorksheet();
  const dataRange = selectedSheet.getUsedRange();
  
  // Auto-fit all column widths for professional presentation
  dataRange.getFormat().autofitColumns();
  
  // Apply alternating zebra stripe formatting
  selectedSheet.addTable(dataRange.getAddress(), true).setPredefinedTableStyle("TableStyleMedium9");
}`,
        description: {
          en: 'A cloud-ready TypeScript script that can be triggered directly in Excel on the web or via Power Automate.',
          vi: 'Tập lệnh TypeScript sẵn sàng trên đám mây chạy trực tiếp trên Excel web hoặc qua luồng Power Automate.'
        }
      },
      {
        title: { en: 'End-to-End Enterprise Cloud Workflow with Power Automate', vi: 'Quy Trình Tự Động Hóa Đám Mây Doanh Nghiệp Với Power Automate' },
        code: `Workflow Architecture:
1. Trigger: Scheduled daily at 6:00 AM
2. Step 1: Power Automate retrieves raw invoice CSV from SharePoint
3. Step 2: Power Automate executes Office Script 'CleanAndSummarize' inside Excel on the Web
4. Step 3: Office Script outputs top KPI metrics (TotalRevenue, NewClients)
5. Step 4: Power Automate posts executive summary card to Microsoft Teams!`,
        description: {
          en: 'Demonstrates zero-touch cloud automation combining Office Scripts, Excel on the Web, and Power Automate.',
          vi: 'Minh họa quy trình tự động hóa không chạm kết hợp Office Scripts, Excel Online và Power Automate.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Saving a VBA macro in a standard .xlsx workbook, which permanently deletes all VBA code upon saving.',
          vi: 'Lưu macro VBA vào tệp .xlsx thông thường, khiến toàn bộ mã VBA bị xóa sạch vĩnh viễn khi lưu.'
        },
        correction: {
          en: 'Workbooks containing legacy VBA macros MUST be saved as Excel Macro-Enabled Workbook (*.xlsm). Office Scripts, by contrast, work in clean standard .xlsx files.',
          vi: 'Sổ làm việc chứa macro VBA BẮT BUỘC phải lưu ở định dạng (*.xlsm). Ngược lại, Office Scripts hoạt động trên tệp .xlsx tiêu chuẩn.'
        }
      }
    ],
    tips: [
      { en: 'The Automate Tab Action Recorder: In Excel on the Web or modern Desktop, go to the Automate tab and click "Record Actions" to automatically generate clean TypeScript code as you click!', vi: 'Trình ghi Action Recorder trên thẻ Automate: Trên thẻ Automate, bấm "Record Actions" để Excel tự động tạo mã TypeScript sạch khi bạn thao tác chuột!' },
      { en: 'Button Assignment: In Office Scripts, click "Add Button in Workbook" to place a clickable execution button directly onto the sheet grid for colleagues.', vi: 'Tạo nút bấm chạy script: Trong Office Scripts, bấm "Add Button in Workbook" để đặt nút bấm thực thi trực tiếp trên trang tính cho đồng nghiệp sử dụng.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l24_ex1',
      type: 'complete_code',
      title: { en: 'Identify File Extension for VBA Macro Workbooks', vi: 'Xác Định Đuôi Tệp Cho Sổ Làm Việc Chứa Macro VBA' },
      instruction: {
        en: 'Type the standard file extension required to save Excel workbooks containing legacy VBA macros (format: .xlsm).',
        vi: 'Gõ đuôi tệp mở rộng chuẩn bắt buộc để lưu sổ làm việc Excel có chứa macro VBA cổ điển (định dạng: .xlsm).'
      },
      starterCode: '.',
      solutionCode: '.xlsm',
      expectedOutput: '.xlsm',
      hint: { en: '.xlsm (Excel Macro-Enabled Workbook)', vi: '.xlsm (Excel Macro-Enabled Workbook)' },
      explanation: { en: '.xlsm is required for legacy VBA macros to prevent code loss upon saving.', vi: '.xlsm là định dạng bắt buộc cho macro VBA để không bị mất mã khi lưu.' }
    },
    {
      id: 'excel_l24_ex2',
      type: 'complete_code',
      title: { en: 'Identify Programming Language Powering Office Scripts', vi: 'Xác Định Ngôn Ngữ Lập Trình Vận Hành Office Scripts' },
      instruction: {
        en: 'Type the name of the modern typed programming language used to author Microsoft 365 Office Scripts (format: TypeScript).',
        vi: 'Gõ tên của ngôn ngữ lập trình định kiểu hiện đại được dùng để viết Microsoft 365 Office Scripts (định dạng: TypeScript).'
      },
      starterCode: 'Type',
      solutionCode: 'TypeScript',
      expectedOutput: 'TypeScript',
      hint: { en: 'TypeScript.', vi: 'TypeScript.' },
      explanation: { en: 'Office Scripts is built on TypeScript / JavaScript.', vi: 'Office Scripts được xây dựng trên nền tảng TypeScript / JavaScript.' }
    }
  ],
  challenge: {
    id: 'excel_l24_challenge',
    title: { en: 'Specify Office Script Entry Function Signature', vi: 'Chỉ Định Chữ Ký Hàm Khởi Chạy Của Office Script' },
    description: {
      en: 'Write the standard entry-point function declaration for a Microsoft 365 Office Script that accepts the workbook parameter of type ExcelScript.Workbook (type "function main(workbook: ExcelScript.Workbook)").',
      vi: 'Viết khai báo hàm khởi chạy tiêu chuẩn cho một tập lệnh Microsoft 365 Office Script nhận tham số workbook có kiểu ExcelScript.Workbook (gõ "function main(workbook: ExcelScript.Workbook)").'
    },
    requirements: [
      { en: 'Type exact string "function main(workbook: ExcelScript.Workbook)"', vi: 'Gõ chính xác chuỗi "function main(workbook: ExcelScript.Workbook)"' }
    ],
    starterCode: 'function main(',
    solutionCode: 'function main(workbook: ExcelScript.Workbook)',
    hints: [
      { en: 'function main(workbook: ExcelScript.Workbook)', vi: 'function main(workbook: ExcelScript.Workbook)' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l24_q1',
      type: 'single_choice',
      question: {
        en: 'What is the primary architectural advantage of modern `Office Scripts` over legacy `VBA Macros`?',
        vi: 'Ưu thế kiến trúc cốt lõi của `Office Scripts` hiện đại so với `Macro VBA` cổ điển là gì?'
      },
      options: [
        { en: 'Office Scripts are cloud-native and written in TypeScript, running seamlessly across Excel Web, Mac, Windows, and Power Automate cloud flows without requiring macro-enabled file extensions', vi: 'Office Scripts chạy trên nền tảng đám mây và được viết bằng TypeScript, hoạt động mượt mà trên Excel Web, Mac, Windows và Power Automate mà không cần đổi đuôi tệp macro' },
        { en: 'VBA is faster', vi: 'VBA chạy nhanh hơn' },
        { en: 'Office Scripts only work on Commodore 64', vi: 'Office Scripts chỉ chạy trên Commodore 64' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Office Scripts enable cross-platform, cloud-first automation and Power Automate integration using modern TypeScript.',
        vi: 'Office Scripts mang lại khả năng tự động hóa đa nền tảng, ưu tiên đám mây và tích hợp Power Automate bằng TypeScript hiện đại.'
      },
      difficulty: 'easy',
      topicId: 'excel_automation'
    },
    {
      id: 'excel_l24_q2',
      type: 'single_choice',
      question: {
        en: 'What happens if you save an Excel workbook containing VBA macros as a standard `.xlsx` file?',
        vi: 'Điều gì xảy ra nếu bạn lưu một sổ làm việc Excel chứa macro VBA dưới dạng tệp `.xlsx` tiêu chuẩn?'
      },
      options: [
        { en: 'Excel permanently removes and deletes all VBA macros and code modules upon saving', vi: 'Excel sẽ gỡ bỏ và xóa sạch vĩnh viễn tất cả các macro VBA và module mã khi lưu' },
        { en: 'The file converts to TypeScript automatically', vi: 'Tệp tự động chuyển đổi sang TypeScript' },
        { en: 'The computer restarts', vi: 'Máy tính khởi động lại' },
        { en: 'Nothing, macros are preserved', vi: 'Không có gì, macro vẫn được giữ nguyên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The standard .xlsx format cannot store macros; saving to .xlsx strips all VBA projects. Macro workbooks must use .xlsm.',
        vi: 'Định dạng .xlsx tiêu chuẩn không thể lưu macro; lưu sang .xlsx sẽ xóa sạch toàn bộ dự án VBA. Phải dùng định dạng .xlsm.'
      },
      difficulty: 'easy',
      topicId: 'excel_automation'
    },
    {
      id: 'excel_l24_q3',
      type: 'single_choice',
      question: {
        en: 'Which programming language powers Microsoft 365 Office Scripts?',
        vi: 'Ngôn ngữ lập trình nào vận hành Microsoft 365 Office Scripts?'
      },
      options: [
        { en: 'TypeScript (and JavaScript)', vi: 'TypeScript (và JavaScript)' },
        { en: 'Visual Basic for Applications (VBA)', vi: 'Visual Basic for Applications (VBA)' },
        { en: 'C++', vi: 'C++' },
        { en: 'PHP', vi: 'PHP' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Office Scripts is built on TypeScript, offering strong type safety and modern JavaScript language features.',
        vi: 'Office Scripts được xây dựng trên nền tảng TypeScript, mang lại tính an toàn kiểu dữ liệu và các tính năng JavaScript hiện đại.'
      },
      difficulty: 'easy',
      topicId: 'excel_automation'
    },
    {
      id: 'excel_l24_q4',
      type: 'single_choice',
      question: {
        en: 'How can you trigger an Office Script to run automatically without opening Excel manually?',
        vi: 'Làm thế nào để kích hoạt chạy một Office Script hoàn toàn tự động mà không cần mở Excel thủ công?'
      },
      options: [
        { en: 'By integrating the script into a scheduled or event-driven Microsoft Power Automate cloud flow', vi: 'Bằng cách tích hợp tập lệnh vào một luồng đám mây Microsoft Power Automate chạy theo lịch hoặc sự kiện' },
        { en: 'By leaving the computer on all night', vi: 'Bằng cách bật máy tính cả đêm' },
        { en: 'By setting an alarm on a smartphone', vi: 'Bằng cách đặt báo thức trên điện thoại' },
        { en: 'Office Scripts cannot run without human clicks', vi: 'Office Scripts không thể chạy nếu không có người nhấp chuột' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Power Automate contains native connectors to execute Office Scripts in the cloud automatically on schedules or webhooks.',
        vi: 'Power Automate có sẵn các cổng kết nối để thực thi Office Scripts trên đám mây tự động theo lịch trình hoặc sự kiện.'
      },
      difficulty: 'medium',
      topicId: 'excel_automation'
    },
    {
      id: 'excel_l24_q5',
      type: 'single_choice',
      question: {
        en: 'What is the top-level root object in the Excel Object Model hierarchy?',
        vi: 'Đối tượng gốc cao nhất trong hệ thống phân cấp Mô hình Đối tượng Excel (Object Model) là gì?'
      },
      options: [
        { en: '`Application` (the Excel program itself)', vi: '`Application` (chính ứng dụng chương trình Excel)' },
        { en: '`Range`', vi: '`Range`' },
        { en: '`Cell`', vi: '`Cell`' },
        { en: '`Font`', vi: '`Font`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Application is the root container containing Workbooks, which contain Worksheets, which contain Ranges.',
        vi: 'Application là vùng chứa gốc chứa các Workbook, trong Workbook chứa các Worksheet, và trong Worksheet chứa các Range.'
      },
      difficulty: 'easy',
      topicId: 'excel_automation'
    },
    {
      id: 'excel_l24_q6',
      type: 'true_false',
      question: {
        en: 'True or False: Modern Office Scripts can run seamlessly in Excel for the Web inside any modern browser.',
        vi: 'Đúng hay Sai: Office Scripts hiện đại có thể chạy mượt mà trên Excel for the Web bên trong bất kỳ trình duyệt nào.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Office Scripts was designed web-first, enabling full browser automation unlike desktop-locked legacy VBA.',
        vi: 'Đúng. Office Scripts được thiết kế ưu tiên web, cho phép tự động hóa hoàn toàn trên trình duyệt khác với VBA chỉ chạy trên máy tính bàn.'
      },
      difficulty: 'easy',
      topicId: 'excel_automation'
    },
    {
      id: 'excel_l24_q7',
      type: 'single_choice',
      question: {
        en: 'What feature on the Automate tab records your live spreadsheet actions and writes TypeScript code automatically?',
        vi: 'Tính năng nào trên thẻ Automate ghi lại trực tiếp các thao tác bảng tính của bạn và tự động sinh mã TypeScript?'
      },
      options: [
        { en: 'Record Actions', vi: 'Record Actions' },
        { en: 'Screen Capture', vi: 'Screen Capture' },
        { en: 'Code Snippets', vi: 'Code Snippets' },
        { en: 'AutoType', vi: 'AutoType' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Record Actions watches user clicks and formatting choices, instantly generating TypeScript Office Script code.',
        vi: 'Record Actions theo dõi các thao tác nhấp chuột và định dạng của người dùng, ngay lập tức tạo ra mã TypeScript Office Script.'
      },
      difficulty: 'easy',
      topicId: 'excel_automation'
    },
    {
      id: 'excel_l24_q8',
      type: 'single_choice',
      question: {
        en: 'How do you create an interactive button on the spreadsheet grid that coworkers can click to run an Office Script?',
        vi: 'Làm thế nào để tạo một nút bấm tương tác trên lưới bảng tính để đồng nghiệp có thể nhấp vào chạy Office Script?'
      },
      options: [
        { en: 'Open Script details -> Click "Add Button in Workbook"', vi: 'Mở chi tiết Script -> Bấm "Add Button in Workbook"' },
        { en: 'Insert a 3D Shape and write a letter', vi: 'Chèn một hình vẽ 3D và viết một lá thư' },
        { en: 'Buttons are not supported in Excel', vi: 'Nút bấm không được hỗ trợ trong Excel' },
        { en: 'Draw a circle in Paint', vi: 'Vẽ hình tròn trong Paint' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Office Scripts features an "Add Button in Workbook" command that embeds an intuitive execution trigger directly on the active sheet.',
        vi: 'Office Scripts có tính năng "Add Button in Workbook" gắn trực tiếp nút bấm thực thi trực quan lên trang tính đang mở.'
      },
      difficulty: 'easy',
      topicId: 'excel_automation'
    },
    {
      id: 'excel_l24_q9',
      type: 'single_choice',
      question: {
        en: 'Why do modern enterprise security teams frequently disable legacy VBA macros while allowing Office Scripts?',
        vi: 'Tại sao các đội ngũ bảo mật doanh nghiệp hiện đại thường chặn macro VBA cổ điển nhưng lại cho phép Office Scripts?'
      },
      options: [
        { en: 'VBA macros have unrestricted access to local operating system files and Windows APIs (making them a major malware vector), whereas Office Scripts run in a secure, sandboxed cloud environment', vi: 'Macro VBA có toàn quyền truy cập tệp hệ điều hành cục bộ và Windows API (khiến chúng là nguồn lây mã độc lớn), trong khi Office Scripts chạy trong môi trường sandbox đám mây an toàn' },
        { en: 'VBA is written in Japanese', vi: 'VBA được viết bằng tiếng Nhật' },
        { en: 'Office Scripts cost $1,000 per click', vi: 'Office Scripts tốn 1.000$ cho mỗi lượt bấm' },
        { en: 'There is no security difference', vi: 'Không có sự khác biệt về bảo mật' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'VBA\'s deep local OS access makes it vulnerable to macro viruses. Office Scripts operate within safe Microsoft 365 tenant sandboxes.',
        vi: 'Khả năng can thiệp sâu vào hệ điều hành của VBA khiến nó dễ bị lợi dụng làm virus macro. Office Scripts hoạt động an toàn trong sandbox của Microsoft 365.'
      },
      difficulty: 'hard',
      topicId: 'excel_automation'
    },
    {
      id: 'excel_l24_q10',
      type: 'single_choice',
      question: {
        en: 'What is the standard entry function signature in an Office Script?',
        vi: 'Chữ ký hàm khởi chạy tiêu chuẩn trong một tập lệnh Office Script là gì?'
      },
      options: [
        { en: '`function main(workbook: ExcelScript.Workbook)`', vi: '`function main(workbook: ExcelScript.Workbook)`' },
        { en: '`Sub Start()`', vi: '`Sub Start()`' },
        { en: '`void RunScript()`', vi: '`void RunScript()`' },
        { en: '`export default run`', vi: '`export default run`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Every Office Script executes from the `main` function, receiving the root `workbook` parameter to manipulate the active document.',
        vi: 'Mọi Office Script đều khởi chạy từ hàm `main`, nhận tham số gốc `workbook` để tương tác với tài liệu đang mở.'
      },
      difficulty: 'easy',
      topicId: 'excel_automation'
    }
  ]
};

saveLesson('lesson24.ts', 'lesson24', lesson24);

// Create Advanced Module 02 index
const advMod02IndexCode = `import { Lesson } from '../../../../types';
import { lesson22 } from './lesson22';
import { lesson23 } from './lesson23';
import { lesson24 } from './lesson24';

export { lesson22 } from './lesson22';
export { lesson23 } from './lesson23';
export { lesson24 } from './lesson24';

export const module02Lessons: Lesson[] = [
  lesson22,
  lesson23,
  lesson24,
];

export default module02Lessons;
`;

fs.writeFileSync(path.join(advMod02Dir, 'index.ts'), advMod02IndexCode, 'utf8');

// Create Advanced level index
const advLevelIndexCode = `import { Lesson } from '../../../types';
import { module01Lessons } from './module01';
import { module02Lessons } from './module02';

export * from './module01';
export * from './module02';

export const advancedLessons: Lesson[] = [
  ...module01Lessons,
  ...module02Lessons,
];

export default advancedLessons;
`;

const advDir = path.join(process.cwd(), 'src/data/excel/advanced');
fs.writeFileSync(path.join(advDir, 'index.ts'), advLevelIndexCode, 'utf8');
console.log('Advanced level completed (Lessons 19-24, 6 lessons total).');
