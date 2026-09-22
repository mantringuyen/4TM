import { Book } from '../../types';

export const POWERBI_COMMON_ERRORS_BOOK: Book = {
  id: 'powerbi-common-errors',
  slug: 'powerbi-common-errors',
  title: 'Power BI Common Errors & DAX Pitfalls',
  subtitle: {
    en: 'Circular Dependency, Matrix Total Gotchas & Bi-Directional Filter Traps',
    vi: 'Lỗi Phụ Thuộc Vòng Circular Dependency, Sai Dòng Tổng Matrix & Cạm Bẫy Lọc Hai Chiều',
  },
  bookType: 'Common Errors',
  categoryId: 'powerbi',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Intermediate to Advanced',
  estimatedReadTime: '30 mins',
  chaptersCount: 2,
  publishedDate: '2025-01-22',
  accentColor: 'from-amber-600 to-rose-800',
  tags: ['DAX Errors', 'Bi-Directional', 'Debugging', 'Common Errors', 'Power BI'],
  description: {
    en: 'Rigorous root-cause diagnostics and engineering fixes for high-impact Power BI errors: "A circular dependency was detected" in calculated columns, incorrect subtotal and total rows in Matrix visuals, and Cartesian explosion caused by bi-directional cross-filtering.',
    vi: 'Chẩn đoán nguyên nhân gốc rễ và giải pháp khắc phục triệt để các lỗi Power BI phổ biến: Lỗi "A circular dependency was detected" trong calculated column, sai lệch dòng tổng Subtotal/Total trong Matrix và bùng nổ quan hệ do lọc hai chiều.',
  },
  prerequisites: {
    en: [
      'Experience authoring DAX measures and calculated columns in Power BI Desktop',
      'Understanding of relationships, cardinality, and matrix visual aggregation',
    ],
    vi: [
      'Kinh nghiệm viết DAX measure và calculated column trong Power BI Desktop',
      'Hiểu biết về mối quan hệ giữa các bảng, cardinality và tính tổng trên bảng Matrix',
    ],
  },
  outcomes: {
    en: [
      'Resolve "A circular dependency was detected" by decoupling row context transition dependencies',
      'Fix incorrect Matrix total rows using SUMX() iteration and HASONEVALUE() branching',
      'Eliminate query slowdowns caused by global bi-directional relationships using localized CROSSFILTER() modifiers',
    ],
    vi: [
      'Khắc phục lỗi "A circular dependency was detected" bằng cách gỡ bỏ ràng buộc chuyển đổi ngữ cảnh chéo',
      'Sửa lỗi tính sai dòng Total/Subtotal trong visual Matrix bằng kỹ thuật duyệt SUMX() và rẽ nhánh HASONEVALUE()',
      'Triệt tiêu tình trạng nghẽn hiệu năng do lọc hai chiều toàn cục bằng hàm DAX điều khiển cục bộ CROSSFILTER()',
    ],
  },
  chapters: [
    {
      id: 'pce-pbi-ch-1',
      number: 1,
      slug: 'circular-dependencies-and-totals',
      title: {
        en: 'Circular Dependencies & Matrix Subtotal Gotchas',
        vi: 'Lỗi Phụ Thuộc Vòng & Cạm Bẫy Dòng Tổng Matrix',
      },
      summary: {
        en: 'Root cause and resolution for calculated column circular dependency loops and non-additive Matrix subtotal calculations.',
        vi: 'Nguyên nhân gốc rễ và giải pháp cho lỗi phụ thuộc vòng lặp trong calculated column và sai lệch dòng tổng trong Matrix.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'pce-pbi-1-1',
          title: {
            en: '1. "A circular dependency was detected" in Calculated Columns',
            vi: '1. Lỗi "A circular dependency was detected" Trong Calculated Column',
          },
          keyIdea: {
            en: 'Context transition in a calculated column builds a dependency on all columns of the table. When two calculated columns invoke CALCULATE() on the same table, a circular dependency deadlock occurs.',
            vi: 'Context transition trong calculated column tạo ra sự phụ thuộc vào toàn bộ các cột của bảng. Khi hai calculated column cùng gọi CALCULATE() trên cùng một bảng, sự phụ thuộc vòng lặp sẽ xuất hiện gây khóa chết.',
          },
          content: {
            en: 'The infamous "A circular dependency was detected" error occurs during tabular model compilation when two or more calculated columns depend on each other, either directly or indirectly through Context Transition. When `CALCULATE()` or a measure is invoked inside a calculated column, the engine initiates Context Transition, requiring the unique identification of the row across **all existing columns** of the table. If Column A references Column B, and Column B uses a measure that triggers Context Transition, the VertiPaq compiler detects an unbreakable loop and halts calculation.',
            vi: 'Lỗi kinh điển "A circular dependency was detected" (Phát hiện sự phụ thuộc vòng) phát sinh trong quá trình biên dịch mô hình bảng khi hai hoặc nhiều calculated column phụ thuộc lẫn nhau trực tiếp hoặc gián tiếp qua Context Transition. Khi hàm `CALCULATE()` hoặc một measure được gọi trong một calculated column, engine sẽ kích hoạt Context Transition và yêu cầu định danh duy nhất dòng hiện tại dựa trên **tất cả các cột đang có** trong bảng. Nếu Cột A tham chiếu Cột B, và Cột B lại dùng một measure kích hoạt Context Transition, trình biên dịch VertiPaq sẽ phát hiện vòng lặp không thể giải quyết và dừng tính toán.',
          },
          errorDetails: {
            errorSignature: {
              en: 'A circular dependency was detected: Table[Column_A] -> Table[Column_B] -> Table[Column_A]',
              vi: 'A circular dependency was detected: Table[Cột_A] -> Table[Cột_B] -> Table[Cột_A]',
            },
            symptoms: {
              en: [
                'Power BI Desktop displays a yellow error bar stating "A circular dependency was detected"',
                'The calculated column formula bar displays a red cross and refuses to commit',
                'Dataset refresh fails in Power BI Service with semantic model compilation errors',
              ],
              vi: [
                'Power BI Desktop hiện thanh thông báo lỗi màu vàng báo "A circular dependency was detected"',
                'Thanh công thức calculated column hiện dấu X đỏ và từ chối lưu công thức',
                'Quá trình refresh trên Power BI Service thất bại do lỗi biên dịch semantic model',
              ],
            },
            minimalReproduction: {
              language: 'dax',
              filename: 'circular_dependency_bad.dax',
              explanation: {
                en: 'Two calculated columns in the same table referencing measures, triggering mutual context transition dependencies.',
                vi: 'Hai calculated column trong cùng một bảng cùng gọi measure, kích hoạt phụ thuộc chuyển đổi ngữ cảnh chéo.',
              },
              code: `// Base Measure
Total Sales = SUM(FactSales[SalesAmount])

// Calculated Column 1 in DimCustomer (triggers context transition):
DimCustomer[TotalSpend] = [Total Sales]

// Calculated Column 2 in DimCustomer (also triggers context transition):
// Fails with "A circular dependency was detected"!
DimCustomer[CustomerRank] = 
RANKX(
    DimCustomer,
    [Total Spend]
)`,
            },
            whyItHappens: {
              en: 'During Context Transition, CALCULATE transforms the current row into a filter on ALL columns in the table (including other calculated columns). Since Column 2 requires Column 1, but Column 1\'s row context requires Column 2 to form its complete row signature, a circular dependency deadlock is created.',
              vi: 'Trong quá trình Context Transition, CALCULATE biến dòng hiện tại thành bộ lọc trên TẤT CẢ các cột của bảng (bao gồm cả các calculated column khác). Do Cột 2 cần Cột 1, nhưng Row Context của Cột 1 lại cần định danh của Cột 2 để hoàn thiện chữ ký dòng, sự phụ thuộc vòng khóa chết được hình thành.',
            },
            diagnosisSteps: {
              en: [
                '1. Identify if calculated columns are referencing explicit measures (which contain implicit CALCULATE wrappers)',
                '2. Check if multiple calculated columns exist in the same table where one depends on another',
                '3. Inspect if the calculation can be performed in Power Query (M) or as an on-demand report Measure instead',
              ],
              vi: [
                '1. Kiểm tra xem các calculated column có đang gọi trực tiếp các Measure tường minh (chứa ngầm CALCULATE) hay không',
                '2. Kiểm tra xem trong cùng một bảng có nhiều calculated column phụ thuộc nối tiếp nhau hay không',
                '3. Đánh giá xem phép tính này có thể thực hiện trước trong Power Query (M) hoặc chuyển thành Measure báo cáo động hay không',
              ],
            },
            correctFix: {
              language: 'dax',
              filename: 'circular_dependency_fixed.dax',
              explanation: {
                en: 'Replacing calculated columns with explicit report measures, or using ALLEXCEPT() to isolate specific primary keys during transition.',
                vi: 'Thay thế calculated column bằng explicit measure trên báo cáo, hoặc dùng ALLEXCEPT() để cô lập khóa chính khi chuyển ngữ cảnh.',
              },
              code: `// Solution A: Convert CustomerRank to an on-demand Explicit Measure (Zero storage, zero circular risk)
Customer Rank Measure = 
IF(
    HASONEVALUE(DimCustomer[CustomerKey]),
    RANKX(
        ALLSELECTED(DimCustomer[CustomerKey]),
        [Total Sales],
        ,
        DESC,
        Dense
    )
)

// Solution B: If a calculated column is mandatory for slicer grouping, calculate in Power Query (M) or isolate keys:
DimCustomer[SpendTier] = 
VAR CustSpend = CALCULATE(SUM(FactSales[SalesAmount]), ALLEXCEPT(DimCustomer, DimCustomer[CustomerKey]))
RETURN IF(CustSpend > 5000, "Platinum", "Standard")`,
            },
            fixExplanation: {
              en: 'Converting ranking and analytical logic into explicit measures completely eliminates the issue because measures evaluate dynamically in visual filter context without persisting physical column dependencies in VertiPaq metadata.',
              vi: 'Chuyển đổi logic xếp hạng và phân tích sang explicit measure giải quyết triệt để vấn đề vì measure tính toán động theo filter context của visual mà không tạo ra bất kỳ phụ thuộc cột vật lý nào trong metadata VertiPaq.',
            },
            preventionRules: {
              en: [
                'Never author calculated columns for aggregations or rankings; reserve them strictly for static row categories and slicer attributes',
                'Perform row-level arithmetic in Power Query during data ingestion whenever possible',
                'When context transition is necessary in a calculated column, always constrain filters with ALLEXCEPT(Table, Table[PrimaryKey])',
              ],
              vi: [
                'Không bao giờ viết calculated column để tính tổng hợp hay xếp hạng; chỉ dùng cho các thuộc tính phân nhóm tĩnh và slicer',
                'Thực hiện các phép tính số học cấp dòng ngay trong Power Query khi nạp dữ liệu',
                'Khi bắt buộc phải chuyển ngữ cảnh trong calculated column, luôn giới hạn bộ lọc bằng ALLEXCEPT(Table, Table[PrimaryKey])',
              ],
            },
          },
        },
        {
          id: 'pce-pbi-1-2',
          title: {
            en: '2. Incorrect Subtotal & Total Rows in Matrix Visuals',
            vi: '2. Sai Lệch Dòng Tổng Subtotal & Total Trong Visual Matrix',
          },
          keyIdea: {
            en: 'Total rows in Power BI do not sum the numbers visible above them; they re-evaluate the measure across the entire unfiltered row context. Use SUMX() iteration or HASONEVALUE() to force correct row-by-row summing.',
            vi: 'Dòng Total trong Power BI không cộng dồn các con số hiển thị phía trên; nó tính lại measure trên toàn bộ ngữ cảnh tổng. Dùng SUMX() hoặc HASONEVALUE() để ép tính tổng chính xác từng dòng.',
          },
          content: {
            en: 'A very common complaint among new Power BI report authors is that "the total row does not match the sum of the rows above it". This happens because Power BI measures are mathematical formulas, not spreadsheet cells. At a detail row (e.g., `Product = "Road Bike"`), the formula evaluates for that specific product. At the **Total Row**, there is no product filter active, so the formula evaluates across all products combined. If the measure involves ratios, multiplication, or complex discounts, the total of the averages does not equal the average of the totals.',
            vi: 'Một thắc mắc rất phổ biến của người mới làm Power BI là "dòng tổng Total không khớp với tổng các số hiển thị bên trên". Hiện tượng này xảy ra vì measure trong Power BI là công thức toán học ngữ cảnh, không phải ô Excel cộng dồn. Ở dòng chi tiết (`Product = "Road Bike"`), công thức tính cho riêng sản phẩm đó. Ở **Dòng Total**, không có bộ lọc sản phẩm nào được áp dụng, nên công thức tính trên toàn bộ sản phẩm gom lại. Nếu measure chứa tỷ lệ phần trăm, phép nhân đơn giá hoặc chiết khấu, giá trị tính trên tổng sẽ khác hoàn toàn tổng các giá trị chi tiết.',
          },
          errorDetails: {
            errorSignature: {
              en: 'Matrix visual detail rows display correct values (e.g. 100, 200, 300), but Total row displays an unexpected or non-additive aggregate (e.g. 450 instead of 600)',
              vi: 'Các dòng chi tiết trong Matrix hiển thị đúng (ví dụ 100, 200, 300), nhưng dòng Total lại hiển thị kết quả bất thường không cộng dồn (ví dụ 450 thay vì 600)',
            },
            symptoms: {
              en: [
                'End users report that visual table totals don\'t match manual spreadsheet recalculations',
                'Measures with conditional IF logic or product-level thresholds return misleading numbers on subtotal rows',
                'Commission or tax calculations calculate the overall rate on the total instead of summing individual store commissions',
              ],
              vi: [
                'Người dùng phản ánh dòng tổng trên bảng báo cáo không khớp khi cộng tay trên Excel',
                'Các measure có điều kiện IF hoặc ngưỡng theo sản phẩm trả về số liệu sai lệch trên dòng Subtotal',
                'Công thức tính hoa hồng hoặc thuế áp dụng tỷ lệ chung trên tổng doanh thu thay vì cộng dồn hoa hồng từng cửa hàng',
              ],
            },
            minimalReproduction: {
              language: 'dax',
              filename: 'matrix_total_bug.dax',
              explanation: {
                en: 'A commission measure that pays 10% if sales > $10,000, otherwise 5%. On the total row, total sales exceeds $10,000, applying 10% to the entire company sales.',
                vi: 'Measure tính hoa hồng 10% nếu doanh số > 10.000$, ngược lại 5%. Trên dòng Total, tổng doanh số vượt 10.000$ nên bị áp 10% trên toàn bộ doanh số công ty.',
              },
              code: `// Buggy measure: At Total row, [Total Sales] is evaluated for ALL products combined
Commission_Buggy = 
IF(
    [Total Sales] > 10000,
    [Total Sales] * 0.10,
    [Total Sales] * 0.05
)`,
            },
            whyItHappens: {
              en: 'DAX measures evaluate in Filter Context. At detail rows, the filter context contains one product. At the total row, the filter context is empty for the product column, evaluating the conditional statement against the grand total sales rather than iterating product-by-product.',
              vi: 'Measure trong DAX luôn tính toán theo Filter Context. Ở dòng chi tiết, filter context chứa một sản phẩm cụ thể. Ở dòng Total, filter context cho cột sản phẩm bị rỗng, khiến câu lệnh điều kiện IF so sánh trên tổng doanh thu toàn bộ thay vì duyệt từng sản phẩm.',
            },
            diagnosisSteps: {
              en: [
                '1. Check if the measure uses non-linear operators (IF, DIVIDE, MAX, MIN, multiplication)',
                '2. Determine which dimension attribute defines the granularity of the visual rows (e.g. DimProduct[ProductName])',
                '3. Wrap the calculation inside SUMX(VALUES(...), ...) to force row-by-row iteration at subtotal and total levels',
              ],
              vi: [
                '1. Kiểm tra xem measure có chứa các toán tử phi tuyến tính (IF, DIVIDE, MAX, MIN, phép nhân) hay không',
                '2. Xác định thuộc tính chiều nào quyết định độ chi tiết (granularity) của các dòng trên visual (ví dụ DimProduct[ProductName])',
                '3. Bọc phép tính trong hàm lặp SUMX(VALUES(...), ...) để ép tính toán từng dòng ở cả cấp dòng con và dòng tổng',
              ],
            },
            correctFix: {
              language: 'dax',
              filename: 'matrix_total_fixed.dax',
              explanation: {
                en: 'Using SUMX over VALUES(DimProduct[ProductKey]) ensures the commission formula evaluates per product even on the grand total row.',
                vi: 'Sử dụng SUMX trên VALUES(DimProduct[ProductKey]) đảm bảo công thức hoa hồng được tính riêng cho từng sản phẩm ngay cả trên dòng tổng.',
              },
              code: `// Fixed measure using SUMX iteration over visible products
Commission_Correct = 
SUMX(
    VALUES(DimProduct[ProductKey]),
    VAR ProductSales = [Total Sales]
    RETURN 
    IF(
        ProductSales > 10000,
        ProductSales * 0.10,
        ProductSales * 0.05
    )
)`,
            },
            fixExplanation: {
              en: 'SUMX creates a temporary table of all products visible in the current filter context, evaluates the conditional commission for each individual product row, and then sums the resulting slice amounts, guaranteeing mathematical consistency between detail rows and total rows.',
              vi: 'SUMX tạo ra một bảng tạm gồm tất cả sản phẩm hiển thị trong filter context hiện tại, tính hoa hồng điều kiện cho từng sản phẩm riêng lẻ rồi mới cộng tổng các khoản hoa hồng đó lại, đảm bảo tính nhất quán toán học tuyệt đối giữa dòng chi tiết và dòng tổng.',
            },
            preventionRules: {
              en: [
                'Whenever a measure includes IF() conditions based on threshold values, use SUMX(VALUES(Dimension[Key]), ...) to preserve additive totals',
                'Test matrix visuals with both expanded and collapsed subtotal hierarchies before deployment',
                'Use HASONEVALUE() to conditionally format or display custom text when an aggregate is deliberately non-additive',
              ],
              vi: [
                'Bất cứ khi nào measure có điều kiện IF() dựa trên ngưỡng giá trị, hãy dùng SUMX(VALUES(Dimension[Key]), ...) để đảm bảo dòng tổng cộng dồn đúng',
                'Kiểm tra visual Matrix ở cả trạng thái mở rộng và thu gọn các cấp subtotal trước khi triển khai',
                'Dùng HASONEVALUE() để định dạng hoặc hiển thị thông báo khi một chỉ số có tính chất không thể cộng dồn (non-additive)',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'pce-pbi-ch-2',
      number: 2,
      slug: 'bi-directional-filtering-pitfalls',
      title: {
        en: 'Bi-Directional Cross-Filtering Performance Traps',
        vi: 'Cạm Bẫy Hiệu Năng Từ Lọc Hai Chiều (Bi-Directional)',
      },
      summary: {
        en: 'Ambiguous relationship paths, Cartesian explosion, and replacing permanent Both cross-filters with localized DAX CROSSFILTER().',
        vi: 'Đường dẫn quan hệ mơ hồ, bùng nổ tích Descartes và cách thay thế lọc hai chiều cứng bằng hàm DAX CROSSFILTER() cục bộ.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'pce-pbi-2-1',
          title: {
            en: '1. Ambiguous Relationships & Cartesian Performance Drag from Bi-Directional Filters',
            vi: '1. Quan Hệ Mơ Hồ & Suy Giảm Hiệu Năng Do Lọc Hai Chiều (Bi-Directional)',
          },
          keyIdea: {
            en: 'Setting relationship cross-filter direction to "Both" permanently in the model introduces circular ambiguity and forces VertiPaq to evaluate Cartesian join tables. Keep relationships strictly "Single" and invoke CROSSFILTER() inside specific DAX measures.',
            vi: 'Bật hướng lọc "Both" vĩnh viễn trên model tạo ra các đường dẫn mơ hồ và ép VertiPaq phải tính toán các bảng tích Descartes. Hãy giữ quan hệ ở chế độ "Single" và chỉ kích hoạt lọc hai chiều khi cần bằng hàm DAX CROSSFILTER().',
          },
          content: {
            en: 'In a standard Star Schema, filters flow strictly one-way from the Dimension (1) to the Fact (*). Setting the Cross-filter direction to **Both** allows filters on a Fact table to flow backward into the Dimension table. While tempting as a quick shortcut to filter slicers based on existing transactions, permanent bi-directional relationships introduce severe architectural issues:\n\n1. **Ambiguous Paths**: When multiple Fact tables connect to shared Dimensions with bi-directional filters, multiple paths exist between tables, causing unpredictable DAX calculations or model validation errors.\n2. **Performance Collapse**: VertiPaq must generate complex multi-table join plans for EVERY query on the report, causing visual render times to balloon from 200ms to 8,000ms.\n3. **Security Leaks**: Dynamic RLS filters can inadvertently propagate in reverse across unrelated business tables.',
            vi: 'Trong một mô hình Star Schema tiêu chuẩn, bộ lọc chỉ truyền một chiều từ Dimension (1) sang Fact (*). Bật hướng lọc **Both (Cả hai chiều)** cho phép các bộ lọc từ bảng Fact truyền ngược lại vào bảng Dimension. Mặc dù đây là cách làm tắt phổ biến để lọc slicer theo các giao dịch thực tế, việc bật lọc hai chiều vĩnh viễn gây ra những hậu quả kỹ thuật nghiêm trọng:\n\n1. **Đường Dẫn Mơ Hồ (Ambiguous Paths)**: Khi nhiều bảng Fact cùng nối với các Dimension dùng chung có bật lọc hai chiều, giữa các bảng sẽ xuất hiện nhiều đường đi khác nhau, dẫn tới kết quả DAX không thể dự đoán hoặc lỗi xác thực mô hình.\n2. **Suy Sụp Hiệu Năng (Performance Collapse)**: VertiPaq buộc phải sinh ra các kế hoạch join đa bảng phức tạp cho MỌI câu truy vấn trên báo cáo, khiến thời gian render visual tăng vọt từ 200ms lên 8.000ms.\n3. **Rò Rỉ Phân Quyền**: Bộ lọc RLS động có thể vô tình truyền ngược qua các bảng không liên quan, làm lộ hoặc ẩn nhầm dữ liệu nghiệp vụ.',
          },
          errorDetails: {
            errorSignature: {
              en: 'Relationship Cross-filter direction: Both (causing ambiguous relationship paths or severe visual query latency)',
              vi: 'Relationship Cross-filter direction: Both (gây mơ hồ đường dẫn quan hệ hoặc làm chậm nghiêm trọng tốc độ query)',
            },
            symptoms: {
              en: [
                'Power BI Desktop displays "The relationship cannot be made active because an active relationship already exists between these tables"',
                'Performance Analyzer shows Formula Engine (FE) spending seconds resolving cross-filtering joins',
                'Slicers display unexpected combinations or blank out unrelated dimension attributes',
              ],
              vi: [
                'Power BI Desktop báo lỗi "The relationship cannot be made active because an active relationship already exists between these tables"',
                'Performance Analyzer cho thấy Formula Engine (FE) mất hàng giây để xử lý các phép join lọc hai chiều',
                'Slicer hiển thị các lựa chọn kỳ lạ hoặc làm trắng xóa các thuộc tính của bảng chiều khác',
              ],
            },
            minimalReproduction: {
              language: 'dax',
              filename: 'bidirectional_trap.dax',
              explanation: {
                en: 'Model with two Fact tables (FactSales and FactReturns) connected to DimCustomer with bi-directional filters, causing circular path ambiguity.',
                vi: 'Mô hình có 2 bảng Fact (FactSales và FactReturns) cùng nối với DimCustomer bằng lọc hai chiều, gây xung đột đường đi.',
              },
              code: `// Problematic architecture:
// DimCustomer (1) <--- [Both] ---> FactSales (*)
// DimCustomer (1) <--- [Both] ---> FactReturns (*)
// DimProduct  (1) <--- [Single] ---> FactSales (*)
// DimProduct  (1) <--- [Single] ---> FactReturns (*)

// Slicing by DimProduct now propagates backwards through FactSales into DimCustomer,
// and then propagates downwards into FactReturns, yielding unexpected return counts!`,
            },
            whyItHappens: {
              en: 'Bi-directional filtering turns the directed acyclic graph (DAG) of the data model into a cyclic network where filters loop endlessly between Fact tables and Dimensions.',
              vi: 'Lọc hai chiều biến đồ thị có hướng không chu trình (DAG) của mô hình dữ liệu thành một mạng lưới có chu trình, nơi các bộ lọc chạy vòng lặp vô tận giữa các bảng Fact và Dimension.',
            },
            diagnosisSteps: {
              en: [
                '1. Open Model View and check relationship lines for double-headed arrows',
                '2. Use Tabular Editor or DAX Studio to inspect SE queries generated by visual interactions',
                '3. Identify whether bi-directional filtering is only needed for one specific measure calculation',
              ],
              vi: [
                '1. Mở Model View và kiểm tra các đường nối quan hệ có mũi tên 2 đầu hay không',
                '2. Dùng Tabular Editor hoặc DAX Studio để kiểm tra các câu truy vấn SE sinh ra khi tương tác visual',
                '3. Xác định xem nhu cầu lọc hai chiều thực chất chỉ phục vụ cho một phép tính measure cụ thể nào đó hay không',
              ],
            },
            correctFix: {
              language: 'dax',
              filename: 'crossfilter_dax_fixed.dax',
              explanation: {
                en: 'Keep relationship strictly Single-direction in the model. Activate bi-directional filtering dynamically only within the specific measure using CROSSFILTER().',
                vi: 'Giữ quan hệ ở chế độ Single đơn hướng trên model. Chỉ kích hoạt lọc hai chiều động bên trong measure bằng hàm CROSSFILTER().',
              },
              code: `// Keep model relationship: DimCustomer (1) ----> (*) FactSales [Single Direction]

// Measure that dynamically enables bi-directional filtering only when evaluated:
Customers With Purchases = 
CALCULATE(
    DISTINCTCOUNT(DimCustomer[CustomerKey]),
    CROSSFILTER(FactSales[CustomerKey], DimCustomer[CustomerKey], Both)
)`,
            },
            fixExplanation: {
              en: 'Using CROSSFILTER(..., Both) inside CALCULATE limits bi-directional propagation to the exact execution duration of that single measure, preserving clean single-direction isolation for all other report visuals.',
              vi: 'Dùng CROSSFILTER(..., Both) trong CALCULATE giới hạn phạm vi lan truyền hai chiều chỉ trong đúng thời gian chạy của riêng measure đó, giữ nguyên tính độc lập đơn hướng sạch sẽ cho toàn bộ các visual khác trên báo cáo.',
            },
            preventionRules: {
              en: [
                'Enforce a strict policy of Single-direction relationships across the entire data model',
                'Never use bi-directional relationships to synchronize slicers; use visual interactions or measure-driven visual filters instead',
                'Apply CROSSFILTER() exclusively inside explicit measures where dynamic bidirectional traversal is mathematically required',
              ],
              vi: [
                'Áp dụng quy chuẩn nghiêm ngặt: 100% quan hệ trong mô hình phải để hướng lọc Single đơn hướng',
                'Không dùng quan hệ lọc hai chiều để đồng bộ slicer; hãy dùng tính năng Visual Interactions hoặc bộ lọc visual bằng measure',
                'Chỉ sử dụng CROSSFILTER() cục bộ bên trong explicit measure khi thực sự có nhu cầu nghiệp vụ tính toán hai chiều',
              ],
            },
          },
        },
      ],
    },
  ],
};
