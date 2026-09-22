import { Book } from '../../types';

export const BUILDING_AN_EXECUTIVE_POWER_BI_REPORT_BOOK: Book = {
  id: 'building-an-executive-power-bi-report',
  slug: 'building-an-executive-power-bi-report',
  title: 'Building an Executive Power BI Report',
  subtitle: {
    en: 'End-to-End Guide to Star Schema, DAX KPIs, Executive Layouts & Validation',
    vi: 'Hướng Dẫn Dựng Báo Cáo Quản Trị Từ Mô Hình Star Schema, DAX KPI Đến Layout UX'
  },
  bookType: 'Practical Guides',
  categoryId: 'powerbi',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Business Intelligence & Enterprise Analytics Architecture Group',
  level: 'Intermediate',
  estimatedReadTime: '40 mins',
  chaptersCount: 4,
  publishedDate: '2025-02-18',
  accentColor: 'from-amber-500 to-yellow-800',
  tags: [
    'Power BI',
    'Executive Report',
    'Star Schema',
    'DAX KPIs',
    'Practical Guide',
    'Data Modeling',
    'VertiPaq'
  ],
  description: {
    en: 'A focused, step-by-step practical guide to constructing professional executive Power BI reports: Power Query data transformation, Star Schema modeling, core KPI measure design, executive UX layout, and number reconciliation.',
    vi: 'Hướng dẫn thực hành từng bước dựng báo cáo Power BI cho cấp quản trị: biến đổi dữ liệu Power Query, mô hình Star Schema, thiết kế chỉ số DAX KPI, bố cục UX báo cáo và đối soát số liệu.'
  },
  prerequisites: {
    en: [
      'Basic understanding of Power BI Desktop interface and relational data concepts',
      'Familiarity with common business metrics (Revenue, Margin, YoY Growth)'
    ],
    vi: [
      'Hiểu biết cơ bản về giao diện Power BI Desktop và các khái niệm dữ liệu quan hệ',
      'Quen thuộc với các chỉ số kinh doanh phổ biến (Doanh thu, Lợi nhuận, Tăng trưởng cùng kỳ)'
    ]
  },
  outcomes: {
    en: [
      'Transform raw transactional spreadsheets into a clean Star Schema in Power Query',
      'Design reusable DAX KPI measures for executive decision-making using CALCULATE and DIVIDE',
      'Apply high-density executive UX layouts with accessible visual hierarchy and 8px grid alignment',
      'Reconcile DAX measure totals against ERP control queries and optimize performance under 1000ms'
    ],
    vi: [
      'Chuyển đổi bảng dữ liệu giao dịch thô thành mô hình Star Schema chuẩn chỉnh trong Power Query',
      'Thiết kế các chỉ số DAX KPI tái sử dụng cho cấp điều hành bằng CALCULATE và DIVIDE',
      'Áp dụng bố cục UX báo cáo quản trị mật độ cao theo lưới 8px và phân cấp thị giác rõ ràng',
      'Đối soát số liệu DAX với truy vấn kiểm soát ERP và tối ưu thời gian phản hồi dưới 1000ms'
    ]
  },
  chapters: [
    {
      id: 'pbi-exec-ch-1',
      number: 1,
      slug: 'data-preparation-and-model-design',
      title: {
        en: 'Data Preparation & Model Design',
        vi: 'Chuẩn Bị Dữ Liệu & Thiết Kế Mô Hình'
      },
      summary: {
        en: 'Importing raw transactional data, Power Query transformations, separating Fact vs Dimension tables, Star Schema architecture, and relationship configuration.',
        vi: 'Nạp dữ liệu thô, biến đổi trong Power Query, phân tách bảng Fact vs Dimension, kiến trúc Star Schema và cấu hình mối quan hệ.'
      },
      readTimeMinutes: 10,
      sections: [
        {
          id: 'pbi-exec-1-1',
          title: {
            en: '1. Building a Clean Star Schema in Power Query',
            vi: '1. Xây Dựng Mô Hình Star Schema Sạch Trong Power Query'
          },
          content: {
            en: 'An executive report is only as reliable as the underlying data model. Importing flat, denormalized spreadsheets with 50+ mixed columns produces redundant string storage, slow VertiPaq compression, and ambiguous DAX calculations. In this practical workflow, we decompose raw transactional tables into a clean Star Schema: a central Fact table containing numeric metrics and integer foreign keys, surrounded by conformed Dimension tables (Customer, Product, Date) with single-direction 1-to-many relationships.',
            vi: 'Một báo cáo quản trị chỉ đáng tin cậy khi mô hình dữ liệu nền tảng được thiết kế chuẩn. Việc nạp trực tiếp các bảng tính phẳng trải rộng hơn 50 cột chứa lẫn lộn văn bản và số liệu sẽ làm phình bộ nhớ VertiPaq, giảm tốc độ nén và dẫn đến các công thức DAX nhập nhằng. Trong quy trình thực hành này, chúng ta phân tách bảng thô thành mô hình Star Schema: một bảng Fact trung tâm chứa số liệu giao dịch và khóa ngoại số nguyên, bao quanh bởi các bảng Dimension chuẩn hóa (Khách hàng, Sản phẩm, Ngày tháng) với quan hệ 1-nhiều một chiều.'
          },
          keyIdea: {
            en: 'Star Schemas maximize VertiPaq columnar compression and ensure predictable DAX filter propagation. Keep Fact tables narrow with numeric metrics and foreign keys; keep descriptive text attributes exclusively in Dimension tables.',
            vi: 'Mô hình Star Schema tối ưu hóa nén cột của engine VertiPaq và đảm bảo dòng chảy filter context trong DAX diễn ra mạch lạc. Giữ bảng Fact thon gọn với các chỉ số đo lường và khóa ngoại; chuyển toàn bộ thuộc tính văn bản mô tả về các bảng Dimension.'
          },
          guideDetails: {
            goal: {
              en: 'Transform raw denormalized business sales files into a fully normalized Star Schema with isolated Fact and Dimension tables in Power Query.',
              vi: 'Biến đổi dữ liệu bán hàng thô dạng phẳng thành mô hình Star Schema chuẩn với các bảng Fact và Dimension tách biệt trong Power Query.'
            },
            prerequisites: {
              en: [
                'Power BI Desktop installed (latest monthly release recommended)',
                'Sample transactional dataset containing OrderID, OrderDate, CustomerName, CustomerRegion, ProductSKU, ProductCategory, UnitPrice, and Quantity'
              ],
              vi: [
                'Đã cài đặt Power BI Desktop (khuyến nghị phiên bản cập nhật nhất)',
                'Bộ dữ liệu mẫu gồm OrderID, OrderDate, CustomerName, CustomerRegion, ProductSKU, ProductCategory, UnitPrice và Quantity'
              ]
            },
            preparation: {
              en: 'Audit source column cardinality. Identify primary grain of transactions (one row per sales order line item) and verify date formats before beginning transformations.',
              vi: 'Khảo sát độ phân tán (cardinality) của dữ liệu nguồn. Xác định rõ đơn vị hạt (grain) của giao dịch (mỗi dòng ứng với một mặt hàng trong đơn) và kiểm tra định dạng ngày.'
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Import & Profile Raw Data in Power Query',
                  vi: 'Nạp & Khảo Sát Dữ Liệu Thô Trong Power Query'
                },
                instruction: {
                  en: 'Launch Power Query Editor via "Transform Data". Promote the first row to headers, enforce explicit data types (Date for dates, Int64 for quantities, Currency for sales amounts), and filter out empty or cancelled order rows.',
                  vi: 'Mở Power Query Editor qua nút "Transform Data". Đưa dòng đầu tiên lên làm tiêu đề cột, gán kiểu dữ liệu chuẩn (Date cho ngày, Int64 cho số lượng, Currency cho số tiền) và lọc bỏ các dòng đơn hàng rỗng hoặc bị hủy.'
                },
                codeBlock: {
                  language: 'm',
                  filename: 'Stage_SalesSource.m',
                  code: `let
    Source = Excel.Workbook(File.Contents("C:\\Data\\RawSales2025.xlsx"), null, true),
    Sales_Sheet = Source{[Item="SalesData",Kind="Sheet"]}[Data],
    #"Promoted Headers" = Table.PromoteHeaders(Sales_Sheet, [PromoteAllScalars=true]),
    #"Filtered Valid Rows" = Table.SelectRows(#"Promoted Headers", each [OrderID] <> null and [SalesAmount] <> null),
    #"Enforced Types" = Table.TransformColumnTypes(#"Filtered Valid Rows",{
        {"OrderID", type text},
        {"OrderDate", type date},
        {"CustomerName", type text},
        {"CustomerRegion", type text},
        {"ProductSKU", type text},
        {"ProductCategory", type text},
        {"Quantity", Int64.Type},
        {"SalesAmount", Currency.Type}
    })
in
    #"Enforced Types"`
                },
                expectedOutput: {
                  en: 'Clean tabular preview with typed columns, no data-type error warnings in column profiling bars.',
                  vi: 'Bảng dữ liệu sạch với đầy đủ kiểu dữ liệu, thanh chất lượng cột hiển thị 100% hợp lệ không có lỗi.'
                },
                warningOrNote: {
                  en: 'Never leave columns typed as "Any" (ABC/123), as untyped columns prevent VertiPaq from choosing optimal dictionary encoding.',
                  vi: 'Không bao giờ để kiểu dữ liệu dạng "Any" (ABC/123), vì kiểu dữ liệu không xác định sẽ ngăn VertiPaq chọn phương thức mã hóa từ điển tối ưu.'
                }
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Extract & Build Dimension Tables',
                  vi: 'Tách & Xây Dựng Các Bảng Dimension'
                },
                instruction: {
                  en: 'Reference the staged sales query to create DimCustomer and DimProduct. Remove unnecessary transactional columns, apply "Remove Duplicates" on primary business keys, and add an integer Index column to serve as the surrogate key.',
                  vi: 'Dùng lệnh Reference từ bảng nguồn để tạo DimCustomer và DimProduct. Xóa các cột giao dịch không liên quan, chọn "Remove Duplicates" trên khóa nghiệp vụ và tạo cột Index số nguyên làm surrogate key.'
                },
                codeBlock: {
                  language: 'm',
                  filename: 'DimProduct.m',
                  code: `let
    Source = Stage_SalesSource,
    #"Selected Columns" = Table.SelectColumns(Source, {"ProductSKU", "ProductCategory"}),
    #"Removed Duplicates" = Table.Distinct(#"Selected Columns", {"ProductSKU"}),
    #"Sorted Rows" = Table.Sort(#"Removed Duplicates",{{"ProductSKU", Order.Ascending}}),
    #"Added ProductKey" = Table.AddIndexColumn(#"Sorted Rows", "ProductKey", 1, 1, Int64.Type)
in
    #"Added ProductKey"`
                },
                expectedOutput: {
                  en: 'A unique dimension table where each ProductSKU appears exactly once alongside its integer ProductKey.',
                  vi: 'Một bảng chiều duy nhất trong đó mỗi ProductSKU xuất hiện chính xác 1 lần kèm theo khóa số nguyên ProductKey.'
                }
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Replace Text Attributes in Fact with Surrogate Keys',
                  vi: 'Thay Thế Thuộc Tính Chữ Bằng Khóa Ngoại Số Nguyên Trong Bảng Fact'
                },
                instruction: {
                  en: 'In the FactSales query, merge with DimCustomer and DimProduct to pull in the integer CustomerKey and ProductKey. Expand only the key columns, then remove all descriptive text columns (CustomerName, ProductCategory, etc.) from FactSales.',
                  vi: 'Trong bảng FactSales, thực hiện Merge với DimCustomer và DimProduct để lấy CustomerKey và ProductKey số nguyên. Chỉ expand cột khóa, sau đó xóa toàn bộ các cột chữ mô tả khỏi bảng Fact.'
                },
                codeBlock: {
                  language: 'm',
                  filename: 'FactSales.m',
                  code: `let
    Source = Stage_SalesSource,
    #"Merged DimProduct" = Table.NestedJoin(Source, {"ProductSKU"}, DimProduct, {"ProductSKU"}, "DimProduct", JoinKind.LeftOuter),
    #"Expanded ProductKey" = Table.ExpandTableColumn(#"Merged DimProduct", "DimProduct", {"ProductKey"}, {"ProductKey"}),
    #"Removed Descriptive Text" = Table.RemoveColumns(#"Expanded ProductKey", {"ProductSKU", "ProductCategory", "CustomerName", "CustomerRegion"}),
    #"Reordered Columns" = Table.SelectColumns(#"Removed Descriptive Text", {"OrderID", "OrderDate", "ProductKey", "Quantity", "SalesAmount"})
in
    #"Reordered Columns"`
                },
                expectedOutput: {
                  en: 'A narrow Fact table consisting solely of date, integer foreign keys, and numeric facts (Quantity, SalesAmount).',
                  vi: 'Bảng Fact thon gọn chỉ chứa ngày, các khóa ngoại số nguyên và các trường số lượng/doanh số giao dịch.'
                }
              },
              {
                stepNumber: 4,
                title: {
                  en: 'Establish 1-to-Many Relationships in Model View',
                  vi: 'Thiết Lập Mối Quan Hệ 1-Nhiều Trong Giao Diện Model'
                },
                instruction: {
                  en: 'Close & Apply Power Query. Switch to Model View. Drag ProductKey from DimProduct to FactSales, and Date from DimDate to FactSales[OrderDate]. Verify cardinality is 1:* (One to Many) and Cross filter direction is strictly "Single".',
                  vi: 'Chọn Close & Apply. Chuyển sang Model View. Kéo ProductKey từ DimProduct sang FactSales, và Date từ DimDate sang FactSales[OrderDate]. Đảm bảo cardinality là 1:* và hướng lọc là "Single".'
                },
                expectedOutput: {
                  en: 'A clean star diagram with Dim tables above/around FactSales, with filter arrows pointing downward towards the Fact table.',
                  vi: 'Sơ đồ hình sao rõ ràng với các bảng Dim nằm xung quanh bảng Fact trung tâm, mũi tên lọc chỉ một chiều vào Fact.'
                },
                warningOrNote: {
                  en: 'Never set Cross filter direction to "Both" (bi-directional) unless addressing a specific bridge table pattern; bi-directional filters introduce unpredictable circular paths and degrade DAX query speed.',
                  vi: 'Tuyệt đối không bật hướng lọc "Both" (hai chiều) trừ khi giải quyết bài toán bảng cầu nối chuyên biệt; lọc hai chiều sẽ gây nhiễu ngữ cảnh và làm chậm tốc độ DAX.'
                }
              }
            ],
            verification: {
              en: 'Verify model integrity in Power BI Desktop Model View: confirm that all dimension tables are on the "One" side of the relationship (indicated by a 1) and FactSales is on the "Many" side (*). Create a test matrix visual with DimProduct[ProductCategory] on rows and SUM(FactSales[SalesAmount]) as value; verify that rows correctly slice the total without blank or repeated values.',
              vi: 'Kiểm tra tính toàn vẹn mô hình trong Model View: xác nhận các bảng chiều ở đầu "Một" (ký hiệu số 1) và FactSales ở đầu "Nhiều" (*). Kéo thử một visual Matrix với DimProduct[ProductCategory] ở hàng và SUM(FactSales[SalesAmount]) ở giá trị; đảm bảo các dòng chia đúng số tiền không bị trùng lặp.'
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Power BI warns "The relationship has Many-to-Many cardinality" when creating connection.',
                  vi: 'Power BI cảnh báo "Mối quan hệ có quan hệ Nhiều-Nhiều (Many-to-Many)" khi kéo nối hai bảng.'
                },
                cause: {
                  en: 'The dimension table contains duplicate values or blank rows in the key column.',
                  vi: 'Bảng Dimension vẫn còn dòng trùng lặp hoặc dòng trống trong cột khóa.'
                },
                fix: {
                  en: 'Return to Power Query Editor, select the key column in the dimension query, click "Remove Duplicates" and "Remove Blank Rows", then Close & Apply.',
                  vi: 'Quay lại Power Query, chọn cột khóa của bảng Dimension, bấm "Remove Duplicates" và "Remove Blank Rows", sau đó Close & Apply lại.'
                }
              },
              {
                symptom: {
                  en: 'Total row in table visual displays correct amount, but individual category rows show identical grand total values.',
                  vi: 'Hàng tổng cộng hiển thị đúng số tiền, nhưng các dòng danh mục riêng lẻ đều hiện số tổng giống hệt nhau.'
                },
                cause: {
                  en: 'The relationship is inactive, or the filter direction is configured backwards (Fact filtering Dim).',
                  vi: 'Mối quan hệ đang bị vô hiệu hóa (inactive), hoặc hướng lọc bị đặt ngược (Fact lọc Dim).'
                },
                fix: {
                  en: 'Double click the relationship line in Model View, ensure "Make this relationship active" is checked, and set Cross filter direction to "Single" pointing from Dimension to Fact.',
                  vi: 'Nhấp đúp vào đường quan hệ trong Model View, tích chọn "Make this relationship active" và đặt hướng lọc là "Single" từ Dimension vào Fact.'
                }
              }
            ],
            checklist: {
              en: [
                'Fact table contains zero descriptive text columns (only keys and numbers)',
                'Dimension tables deduplicated on unique primary key columns',
                'All relationship cross-filter directions set strictly to Single',
                'Conformed DimDate table included with contiguous dates spanning full business timeline'
              ],
              vi: [
                'Bảng Fact không chứa cột văn bản mô tả (chỉ gồm khóa và số liệu đo lường)',
                'Bảng Dimension đã được lọc sạch trùng lặp trên các cột khóa chính',
                'Mọi mối quan hệ trong mô hình đều có hướng lọc Single một chiều',
                'Có bảng ngày DimDate chuẩn chứa dải ngày liên tục bao trùm toàn bộ giao dịch'
              ]
            }
          },
          diagram: {
            title: {
              en: 'Star Schema Architecture & Filter Flow',
              vi: 'Kiến Trúc Star Schema & Dòng Chảy Filter Context'
            },
            steps: [
              {
                stepNumber: 1,
                title: { en: 'DimDate (1)', vi: 'DimDate (1)' },
                description: {
                  en: 'Filtered by executive slicer (e.g. Year = 2025); filters propagate downward.',
                  vi: 'Nhận bộ lọc từ slicer (ví dụ Năm = 2025); truyền ngữ cảnh lọc xuống Fact.'
                }
              },
              {
                stepNumber: 2,
                title: { en: 'DimProduct (1)', vi: 'DimProduct (1)' },
                description: {
                  en: 'Filters FactSales by Category/SKU; single-direction 1-to-many relationship.',
                  vi: 'Lọc FactSales theo Category/SKU; quan hệ 1-nhiều một chiều.'
                }
              },
              {
                stepNumber: 3,
                title: { en: 'FactSales (*)', vi: 'FactSales (*)' },
                description: {
                  en: 'Central table where measures compute SUM, COUNT, and averages under filtered rows.',
                  vi: 'Bảng trung tâm nơi các measure tính SUM, COUNT trên tập dòng đã được lọc.'
                }
              }
            ]
          }
        }
      ]
    },
    {
      id: 'pbi-exec-ch-2',
      number: 2,
      slug: 'dax-measures-and-kpi-design',
      title: {
        en: 'DAX Measures & KPI Design',
        vi: 'Thiết Kế Chỉ Số DAX Measures & KPI'
      },
      summary: {
        en: 'Measures vs calculated columns, dedicated measure table setup, core KPI measures with CALCULATE, time-based comparisons, and zero-error DIVIDE mechanics.',
        vi: 'Phân biệt Measure vs Calculated Column, tạo bảng chứa measure, viết KPI cốt lõi với CALCULATE, so sánh chuỗi thời gian và dùng hàm DIVIDE an toàn.'
      },
      readTimeMinutes: 10,
      sections: [
        {
          id: 'pbi-exec-2-1',
          title: {
            en: '1. Authoring Core Business KPIs with CALCULATE()',
            vi: '1. Viết Các Chỉ Số KPI Doanh Nghiệp Với CALCULATE()'
          },
          content: {
            en: 'Executive dashboards demand dynamic, context-aware business metrics rather than static calculations. A common novice pitfall is creating calculated columns in Fact tables for metrics like margin or growth. Calculated columns are evaluated during data refresh and stored permanently in memory, bloating RAM and ignoring dynamic slicer selections. Explicit DAX measures, by contrast, are computed on-the-fly inside the active filter context. In this section, we construct an organized measure repository (`_AllMeasures`) and author core business KPIs: Total Revenue, YTD Sales, Prior Year Comparisons, and Margin % using CALCULATE, SAMEPERIODLASTYEAR, and safe DIVIDE.',
            vi: 'Báo cáo quản trị đòi hỏi các chỉ số kinh doanh động và phản hồi tức thì theo ngữ cảnh lọc thay vì các phép tính tĩnh. Một sai lầm phổ biến là tạo Calculated Column trong bảng Fact để tính tỷ lệ lợi nhuận hay tăng trưởng. Calculated Column được tính lúc nạp dữ liệu và chiếm vĩnh viễn RAM máy chủ, làm phình file và không thể phản hồi linh hoạt theo slicer. Ngược lại, explicit DAX measure được tính toán tức thì theo ngữ cảnh bộ lọc đang active. Trong phần này, chúng ta xây dựng bảng chứa measure chuyên dụng (`_AllMeasures`) và viết các KPI chủ lực: Doanh thu, Doanh thu YTD, Tăng trưởng cùng kỳ và Tỷ suất lợi nhuận.'
          },
          keyIdea: {
            en: 'Never use calculated columns for aggregations or percentage ratios. Always author explicit DAX measures inside a dedicated measure folder, and wrap every division in DIVIDE() to protect against division-by-zero errors.',
            vi: 'Tuyệt đối không dùng Calculated Column để tính tổng hoặc tỷ số phần trăm. Luôn viết explicit DAX measure trong bảng chứa measure chuyên dụng, và bọc mọi phép chia bằng hàm DIVIDE() để triệt tiêu lỗi chia cho 0.'
          },
          guideDetails: {
            goal: {
              en: 'Author an executive suite of DAX measures (Total Revenue, Sales YTD, Sales YoY Growth %, Gross Margin %) in a dedicated repository.',
              vi: 'Xây dựng bộ chỉ số DAX quản trị (Tổng doanh thu, Doanh thu YTD, Tăng trưởng YoY %, Biên lợi nhuận %) trong bảng measure chuyên dụng.'
            },
            prerequisites: {
              en: [
                'Validated Star Schema with active relationships between DimDate, DimProduct, and FactSales',
                'DimDate marked as a Date Table in Power BI Desktop'
              ],
              vi: [
                'Mô hình Star Schema đã kiểm tra hợp lệ với quan hệ active giữa DimDate, DimProduct và FactSales',
                'Bảng DimDate đã được đánh dấu là Date Table trong Power BI Desktop'
              ]
            },
            preparation: {
              en: 'Ensure DimDate has continuous dates with no missing days, and verify FactSales has a clean SalesAmount column.',
              vi: 'Đảm bảo DimDate có dải ngày liên tục không bị đứt đoạn, và FactSales có cột SalesAmount chuẩn.'
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Create a Dedicated Measure Repository Table',
                  vi: 'Tạo Bảng Chuyên Dụng Chứa Toàn Bộ Measure'
                },
                instruction: {
                  en: 'In Power BI Desktop Home ribbon, click "Enter Data". Name the table "_AllMeasures" and click Load. This isolates all calculation logic from physical tables.',
                  vi: 'Trên thanh Home của Power BI Desktop, bấm "Enter Data". Đặt tên bảng là "_AllMeasures" rồi bấm Load. Thao tác này tách biệt hoàn toàn logic tính toán khỏi các bảng dữ liệu vật lý.'
                },
                expectedOutput: {
                  en: 'A new table named "_AllMeasures" appearing at the top of the Data pane.',
                  vi: 'Một bảng mới mang tên "_AllMeasures" xuất hiện trên đầu danh sách Data.'
                }
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Author Base Aggregation Measures',
                  vi: 'Viết Các Measure Tính Tổng Cơ Bản'
                },
                instruction: {
                  en: 'Right click "_AllMeasures" and select "New Measure". Write explicit base measures for Total Revenue and Total Cost. Format Total Revenue as Currency ($).',
                  vi: 'Nhấp chuột phải vào "_AllMeasures" và chọn "New Measure". Viết các measure cơ bản cho Tổng doanh thu và Tổng giá vốn. Định dạng Total Revenue là Tiền tệ ($).'
                },
                codeBlock: {
                  language: 'dax',
                  filename: 'base_measures.dax',
                  code: `Total Revenue = SUM(FactSales[SalesAmount])

Total Cost = SUM(FactSales[TotalCost])

Gross Profit = [Total Revenue] - [Total Cost]

Gross Margin % = DIVIDE([Gross Profit], [Total Revenue], 0)`
                },
                expectedOutput: {
                  en: 'Explicit measures created; Gross Margin % formatted as percentage with 1 decimal place.',
                  vi: 'Các measure cơ bản được tạo thành công; Gross Margin % được định dạng phần trăm với 1 chữ số thập phân.'
                }
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Author Time-Intelligence & Growth KPIs with CALCULATE',
                  vi: 'Viết Chỉ Số Time-Intelligence & Tăng Trưởng Với CALCULATE'
                },
                instruction: {
                  en: 'Author Sales YTD using DATESYTD. Then author Prior Year YTD using CALCULATE with SAMEPERIODLASTYEAR. Finally, formulate YoY Growth % using variables (VAR/RETURN) and DIVIDE.',
                  vi: 'Viết Sales YTD bằng hàm DATESYTD. Sau đó viết Doanh thu cùng kỳ năm trước bằng CALCULATE kết hợp SAMEPERIODLASTYEAR. Cuối cùng tính Tăng trưởng YoY % bằng biến VAR/RETURN và hàm DIVIDE.'
                },
                codeBlock: {
                  language: 'dax',
                  filename: 'time_intelligence_kpi.dax',
                  code: `Sales YTD = 
CALCULATE(
    [Total Revenue],
    DATESYTD(DimDate[Date])
)

Sales Prior YTD = 
CALCULATE(
    [Sales YTD],
    SAMEPERIODLASTYEAR(DimDate[Date])
)

Sales YoY Growth % = 
VAR CurrentYTD = [Sales YTD]
VAR PriorYTD = [Sales Prior YTD]
VAR Variance = CurrentYTD - PriorYTD
RETURN
    DIVIDE(Variance, PriorYTD, BLANK())`
                },
                expectedOutput: {
                  en: 'Time-intelligence measures that compute correctly across Year, Quarter, and Month matrix hierarchies.',
                  vi: 'Các measure thời gian tính toán chuẩn xác trên mọi phân cấp Năm, Quý, Tháng trong Matrix.'
                }
              },
              {
                stepNumber: 4,
                title: {
                  en: 'Clean Up Repository & Hide Dummy Column',
                  vi: 'Dọn Dẹp Bảng Measure & Ẩn Cột Rác'
                },
                instruction: {
                  en: 'Delete or hide the default "Column1" inside _AllMeasures. Collapse and reopen the Data pane; Power BI will automatically promote _AllMeasures to the top with a distinctive calculator icon.',
                  vi: 'Xóa hoặc ẩn cột "Column1" mặc định trong _AllMeasures. Thu gọn rồi mở lại thanh Data; Power BI sẽ tự động đưa _AllMeasures lên vị trí đầu tiên với biểu tượng chiếc máy tính.'
                },
                expectedOutput: {
                  en: '_AllMeasures pinned to the top of the Data pane with calculator icon.',
                  vi: '_AllMeasures được ghim lên đầu bảng Data với icon máy tính đặc trưng.'
                }
              }
            ],
            verification: {
              en: 'Place a Date slicer and a Card visual on the canvas. Populate the card with [Sales YoY Growth %]. Move the slicer across multiple years. Confirm that when year 2024 is compared to 2023, the card shows a valid percentage (e.g. +14.2%). For the earliest year with no prior data, confirm the card displays BLANK without throwing an error.',
              vi: 'Tạo một Date slicer và một Card visual trên trang báo cáo. Gán [Sales YoY Growth %] vào thẻ Card. Thay đổi chọn năm trên slicer. Đảm bảo khi so sánh 2024 với 2023, thẻ hiện tỷ lệ phần trăm chuẩn (ví dụ +14.2%). Với năm đầu tiên chưa có số liệu quá khứ, thẻ hiện BLANK an toàn không báo lỗi.'
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'DATESYTD returns the exact same value as Total Revenue regardless of date slicer.',
                  vi: 'Hàm DATESYTD trả về đúng bằng Total Revenue không có tác dụng tích lũy theo năm.'
                },
                cause: {
                  en: 'DimDate is not marked as a Date table, or the date column contains timestamps (datetime instead of date).',
                  vi: 'Bảng DimDate chưa được Mark as Date Table, hoặc cột ngày có chứa giờ phút (datetime thay vì pure date).'
                },
                fix: {
                  en: 'Right click DimDate in Data pane, select "Mark as date table", choose the Date column, and convert the column format to pure Date (dd/mm/yyyy).',
                  vi: 'Nhấp chuột phải vào DimDate, chọn "Mark as date table", chọn cột Date và đổi định dạng sang Date thuần túy.'
                }
              },
              {
                symptom: {
                  en: 'YoY Growth % displays "Infinity" or "#ERROR".',
                  vi: 'Chỉ số YoY Growth % hiển thị "Infinity" hoặc lỗi "#ERROR".'
                },
                cause: {
                  en: 'Used standard forward slash division (/) instead of DIVIDE(), causing crash when prior year is 0 or BLANK.',
                  vi: 'Dùng dấu gạch chéo (/) để chia thay vì dùng hàm DIVIDE(), dẫn đến crash khi mẫu số bằng 0 hoặc BLANK.'
                },
                fix: {
                  en: 'Rewrite the formula using DIVIDE(Variance, PriorYTD, BLANK()).',
                  vi: 'Viết lại công thức bằng DIVIDE(Variance, PriorYTD, BLANK()).'
                }
              }
            ],
            checklist: {
              en: [
                'All calculations authored as explicit measures (zero calculated columns in Fact)',
                'Measures organized inside dedicated _AllMeasures table',
                'All division operations guarded with DIVIDE()',
                'Time intelligence functions reference DimDate[Date] exclusively'
              ],
              vi: [
                'Mọi phép tính đều viết bằng explicit measure (không dùng calculated column trong Fact)',
                'Các measure được tập trung trong bảng _AllMeasures chuyên dụng',
                'Tất cả phép chia đều được bảo vệ an toàn bằng hàm DIVIDE()',
                'Các hàm Time Intelligence chỉ tham chiếu duy nhất tới cột DimDate[Date]'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'pbi-exec-ch-3',
      number: 3,
      slug: 'report-design-and-executive-ux',
      title: {
        en: 'Report Design & Executive UX',
        vi: 'Thiết Kế Báo Cáo & Trải Nghiệm UX Quản Trị'
      },
      summary: {
        en: 'Canvas layout structure, 5-second cognitive rule, KPI card positioning, chart selection for executive scan paths, reducing visual noise, and accessible design.',
        vi: 'Cấu trúc bố cục trang, quy tắc 5 giây nhận diện thông tin, vị trí thẻ KPI, lựa chọn biểu đồ theo thói quen đọc, giảm nhiễu thị giác và chuẩn tiếp cận.'
      },
      readTimeMinutes: 10,
      sections: [
        {
          id: 'pbi-exec-3-1',
          title: {
            en: '1. High-Density Executive Layout & Visual Hierarchy',
            vi: '1. Bố Cục Báo Cáo Quản Trị Mật Độ Cao & Phân Cấp Thị Giác'
          },
          content: {
            en: 'C-suite executives spend an average of 10 to 30 seconds scanning an operational dashboard. If a report is cluttered with 12 tiny 3D pie charts, contrasting rainbow borders, and nested slicers, leadership cannot discern whether business performance is healthy or compromised. Executive UX follows the "5-second rule": within five seconds of opening the page, an executive must grasp the core health of the business. We accomplish this by organizing the canvas along a natural Z-pattern reading path: high-level KPI cards across the top band, primary performance trends in the center, and categorical driver breakdowns at the bottom.',
            vi: 'Các lãnh đạo cấp cao thường chỉ dành từ 10 đến 30 giây để lướt qua một bảng điều khiển điều hành. Nếu báo cáo chứa dày đặc 12 biểu đồ tròn 3D nhỏ, viền màu sặc sỡ và thanh lọc chằng chịt, lãnh đạo sẽ không thể nhận biết doanh nghiệp đang tăng trưởng tốt hay đang gặp rủi ro. Thiết kế UX báo cáo quản trị tuân theo "quy tắc 5 giây": trong 5 giây đầu tiên nhìn vào trang, người quản trị phải nắm được tình trạng sức khỏe kinh doanh cốt lõi. Chúng ta thực hiện điều này bằng cách bố trí trang theo luồng đọc hình chữ Z: các thẻ KPI tổng quan đặt ở dải băng trên cùng, biểu đồ xu hướng chính ở giữa, và phân tích chi tiết theo danh mục ở nửa dưới.'
          },
          keyIdea: {
            en: 'Design for the 5-second executive scan: place top-level KPI cards in the top banner, trend lines in the middle, and dimensional breakdowns below. Adhere strictly to an 8px grid and limit the palette to two neutral shades plus one accent alert color.',
            vi: 'Thiết kế theo thói quen đọc 5 giây của lãnh đạo: đặt thẻ KPI ở băng trên cùng, xu hướng thời gian ở giữa và phân tích danh mục ở dưới. Tuân thủ nghiêm ngặt lưới 8px và chỉ dùng 2 màu trung tính kèm 1 màu điểm nhấn cảnh báo.'
          },
          guideDetails: {
            goal: {
              en: 'Construct a professional, accessible single-page executive summary layout adhering to visual hierarchy, grid alignment, and clean cognitive design principles.',
              vi: 'Dựng một trang báo cáo quản trị chuyên nghiệp chuẩn tiếp cận, tuân thủ phân cấp thị giác, căn lưới thẳng hàng và giảm tối đa tải trọng nhận thức.'
            },
            prerequisites: {
              en: [
                'Validated DAX measures (Total Revenue, Margin %, YoY Growth %, Target Variance)',
                'Power BI Desktop canvas configured to 16:9 widescreen (1280x720 or 1920x1080)'
              ],
              vi: [
                'Các DAX measure đã kiểm thử xong (Total Revenue, Margin %, YoY Growth %, Target Variance)',
                'Canvas Power BI Desktop đặt ở tỷ lệ màn hình rộng 16:9 (1280x720 hoặc 1920x1080)'
              ]
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Configure Page Canvas & Global Header Zone',
                  vi: 'Cấu Hình Canvas & Khu Vực Header Tiêu Đề'
                },
                instruction: {
                  en: 'Set canvas background to subtle off-white (#F8FAFC). Insert a top banner container (height: 72px) holding the corporate logo, Report Title ("Executive Revenue & Margin Overview"), Last Data Refresh dynamic timestamp, and global Year slicer.',
                  vi: 'Đặt màu nền canvas tông sáng nhẹ (#F8FAFC). Tạo một dải container tiêu đề trên cùng (chiều cao: 72px) chứa logo công ty, Tiêu đề báo cáo, thời gian refresh dữ liệu tự động và bộ lọc Năm toàn cục.'
                },
                expectedOutput: {
                  en: 'Clean, structured top header providing clear context without wasting vertical visual space.',
                  vi: 'Header trên cùng ngăn nắp cung cấp đầy đủ thông tin ngữ cảnh mà không tốn diện tích hiển thị.'
                }
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Construct Top Band KPI Cards',
                  vi: 'Dựng Dải Thẻ KPI Card Ở Băng Trên Cùng'
                },
                instruction: {
                  en: 'Create 4 uniform KPI card containers (height: 120px, width: ~280px each) aligned with 8px margins. Display: (1) Total Revenue, (2) Gross Margin %, (3) Sales YTD, and (4) YoY Growth %. Add a small secondary sub-label displaying variance vs budget.',
                  vi: 'Tạo 4 thẻ KPI đồng nhất (cao: 120px, rộng: ~280px) căn thẳng hàng với khoảng cách 8px. Hiển thị: (1) Tổng doanh thu, (2) Biên lợi nhuận %, (3) Doanh thu YTD, và (4) Tăng trưởng YoY %. Kèm thêm dòng chữ nhỏ thể hiện chênh lệch so với kế hoạch.'
                },
                expectedOutput: {
                  en: 'Four high-contrast KPI cards commanding primary visual attention on page load.',
                  vi: 'Bốn thẻ KPI tương phản cao thu hút ánh nhìn đầu tiên ngay khi mở báo cáo.'
                }
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Position Main Trend & Breakdown Charts',
                  vi: 'Bố Trí Biểu Đồ Xu Hướng Chính & Phân Hạng Danh Mục'
                },
                instruction: {
                  en: 'Place a Line Chart in the center-left zone (width: 60% of canvas) showing Monthly Revenue Trend with a 12-month prior year comparison dashed line. Place a Horizontal Bar Chart on the right (width: 40%) ranking Top 5 Product Categories by Sales.',
                  vi: 'Đặt một Biểu đồ đường ở khu vực giữa bên trái (chiếm 60% bề ngang) thể hiện Xu hướng doanh thu hàng tháng so với năm trước. Đặt một Biểu đồ cột ngang bên phải (40% bề ngang) xếp hạng Top 5 Danh mục sản phẩm bán chạy.'
                },
                expectedOutput: {
                  en: 'Clear visual contrast between continuous time trend and categorical distribution.',
                  vi: 'Sự tương phản trực quan rõ rệt giữa xu hướng liên tục theo thời gian và tỷ trọng các danh mục.'
                }
              },
              {
                stepNumber: 4,
                title: {
                  en: 'Refine Color Palette & Disable Visual Distractions',
                  vi: 'Tinh Chỉnh Bảng Màu & Loại Bỏ Yếu Tố Gây Nhiễu'
                },
                instruction: {
                  en: 'Turn off gridlines or set them to very faint gray (#E2E8F0). Use dark slate (#0F172A) for primary data bars, muted gray (#64748B) for labels, emerald (#10B981) for positive variances, and rose (#EF4444) for negative alerts. Remove unnecessary legend boxes if axis labels are self-explanatory.',
                  vi: 'Tắt đường lưới hoặc để màu xám rất mờ (#E2E8F0). Dùng màu xanh đen (#0F172A) cho thanh dữ liệu chính, màu xám (#64748B) cho nhãn, màu xanh ngọc (#10B981) cho tăng trưởng dương và đỏ (#EF4444) cho cảnh báo âm. Bỏ khung chú giải legend nếu trục tọa độ đã rõ nghĩa.'
                },
                expectedOutput: {
                  en: 'A high-density dashboard that communicates status effortlessly with zero visual clutter.',
                  vi: 'Bảng điều khiển mật độ cao truyền tải trạng thái kinh doanh mượt mà không chút rối mắt.'
                }
              }
            ],
            verification: {
              en: 'Perform the "Squint Test": squint your eyes while viewing the report. Can you instantly identify the top 4 KPI numbers and tell whether performance is up or down? Verify that font sizes follow strict hierarchy: KPI numbers 28-32pt bold, chart titles 13-14pt semibold, axis labels 9-10pt regular.',
              vi: 'Thực hiện bài kiểm tra "Nheo mắt" (Squint Test): nheo mắt nhìn vào báo cáo. Bạn có thể nhận biết ngay 4 con số KPI chủ lực và biết tình hình kinh doanh đang tăng hay giảm không? Kiểm tra cỡ chữ theo đúng thứ bậc: Số KPI 28-32pt bold, Tiêu đề biểu đồ 13-14pt semibold, Nhãn trục 9-10pt regular.'
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Report looks cramped and visual edges overlap on smaller laptop displays.',
                  vi: 'Báo cáo trông chật chội và mép các visual bị đè lên nhau trên màn hình laptop nhỏ.'
                },
                cause: {
                  en: 'Visuals placed without alignment grid, using random manual pixel coordinates.',
                  vi: 'Các visual được kéo thả tự do không căn lưới, dùng tọa độ pixel ngẫu nhiên.'
                },
                fix: {
                  en: 'Enable "Gridlines" and "Snap to grid" in the View ribbon; use Format > General > Properties to set identical heights, widths, and 8px gaps.',
                  vi: 'Bật "Gridlines" và "Snap to grid" trong tab View; dùng Format > General > Properties để đặt chiều cao, chiều rộng đồng nhất và khoảng cách 8px.'
                }
              }
            ],
            checklist: {
              en: [
                'Maximum 4-5 core visuals on the executive summary canvas',
                'Adheres strictly to 8px spacing grid between all containers',
                'Color palette restrained to corporate slate, neutral grays, and 2 functional alert colors',
                'All fonts pass WCAG AA contrast ratio of at least 4.5:1 against card backgrounds'
              ],
              vi: [
                'Tối đa 4-5 visual cốt lõi trên trang tóm tắt điều hành',
                'Tuân thủ nghiêm ngặt lưới khoảng cách 8px giữa tất cả các khối',
                'Bảng màu tối giản với tông slate chủ đạo, xám trung tính và 2 màu cảnh báo chức năng',
                'Mọi cỡ chữ đều đạt chuẩn tương phản WCAG AA tối thiểu 4.5:1 so với nền thẻ'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'pbi-exec-ch-4',
      number: 4,
      slug: 'validation-performance-and-publishing',
      title: {
        en: 'Validation, Performance & Publishing',
        vi: 'Kiểm Thử Số Liệu, Hiệu Năng & Xuất Bản Báo Cáo'
      },
      summary: {
        en: 'Reconciling DAX totals with source ERP ledgers, measuring visual speed with Performance Analyzer, VertiPaq tuning, Row-Level Security (RLS), and deployment.',
        vi: 'Đối soát số liệu DAX với sổ cái ERP, đo tốc độ visual bằng Performance Analyzer, tối ưu VertiPaq, phân quyền RLS và triển khai lên Power BI Service.'
      },
      readTimeMinutes: 10,
      sections: [
        {
          id: 'pbi-exec-4-1',
          title: {
            en: '1. Number Reconciliation & Performance Verification',
            vi: '1. Đối Soát Số Liệu & Kiểm Tra Hiệu Năng Báo Cáo'
          },
          content: {
            en: 'Before publishing an executive report to Power BI Service, two non-negotiable verification gates must be cleared: numerical reconciliation and query performance audit. Nothing destroys executive confidence faster than an executive dashboard whose numbers differ from financial ledger reports, or a dashboard that takes 8 seconds to render when a slicer is clicked. In this final module, we execute a rigorous control reconciliation against raw database source queries and utilize Power BI Desktop Performance Analyzer to guarantee visual rendering completes under 1000ms.',
            vi: 'Trước khi xuất bản báo cáo quản trị lên Power BI Service, bắt buộc phải vượt qua hai cánh cổng kiểm định nghiêm ngặt: đối soát số học và kiểm toán hiệu năng truy vấn. Không gì phá hủy niềm tin của ban giám đốc nhanh hơn một dashboard hiển thị số liệu lệch so với báo cáo tài chính kiểm toán, hoặc một báo cáo mất tới 8 giây quay vòng mỗi khi nhấp chọn slicer. Trong phần thực hành cuối cùng này, chúng ta đối soát với truy vấn SQL nguồn và dùng Performance Analyzer để bảo đảm mọi visual tải dưới 1000ms.'
          },
          keyIdea: {
            en: 'Never publish without mathematical reconciliation against source ERP databases and a Performance Analyzer audit. Visuals should complete rendering within 1,000ms; eliminate high-cardinality text columns to optimize VertiPaq storage.',
            vi: 'Không bao giờ xuất bản báo cáo nếu chưa đối soát số liệu chuẩn xác với CSDL gốc và chưa kiểm tra Performance Analyzer. Toàn bộ visual phải render dưới 1.000ms; loại bỏ các cột có độ phân tán cao để giải phóng bộ nhớ VertiPaq.'
          },
          guideDetails: {
            goal: {
              en: 'Reconcile report metrics to the penny against ERP database control queries and optimize visual execution times under 1000ms using Performance Analyzer.',
              vi: 'Đối soát số liệu báo cáo chuẩn từng xu với câu truy vấn CSDL ERP và tối ưu hóa thời gian thực thi của visual dưới 1000ms bằng Performance Analyzer.'
            },
            prerequisites: {
              en: [
                'Completed executive report page with active DAX measures and visuals',
                'Read access to the source SQL database or financial trial balance report'
              ],
              vi: [
                'Trang báo cáo điều hành đã dựng hoàn chỉnh với đầy đủ measure và visual',
                'Quyền truy cập đọc CSDL SQL nguồn hoặc báo cáo cân đối kế toán tài chính'
              ]
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Execute Ground-Truth SQL Control Query',
                  vi: 'Chạy Truy Vấn SQL Kiểm Soát Để Lấy Số Thực Tế'
                },
                instruction: {
                  en: 'Run an independent SQL aggregation against the production transactional database for a specific boundary (e.g. Fiscal Year 2024). Record total revenue, total quantity, and row count.',
                  vi: 'Chạy một câu lệnh SQL độc lập trên CSDL giao dịch sản xuất cho một mốc cố định (ví dụ Năm tài chính 2024). Ghi lại tổng doanh thu, tổng số lượng và số dòng.'
                },
                codeBlock: {
                  language: 'sql',
                  filename: 'reconciliation_control.sql',
                  code: `-- Executive Revenue Reconciliation Control Query
SELECT 
    COUNT(DISTINCT OrderID) AS TotalOrders,
    SUM(Quantity) AS TotalUnitsSold,
    SUM(SalesAmount) AS TotalNetRevenue,
    ROUND(SUM(SalesAmount - TotalCost) / SUM(SalesAmount) * 100.0, 2) AS GrossMarginPct
FROM tbl_SalesTransactions
WHERE OrderDate >= '2024-01-01' AND OrderDate <= '2024-12-31'
  AND OrderStatus = 'Completed';`
                },
                expectedOutput: {
                  en: 'Definitive benchmark numbers from the transactional system of record.',
                  vi: 'Các con số chuẩn xác tuyệt đối từ hệ thống ghi nhận giao dịch gốc.'
                }
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Reconcile Power BI Measure Values Against Benchmark',
                  vi: 'Đối Soát Giá Trị Measure Trên Power BI Với Con Số Chuẩn'
                },
                instruction: {
                  en: 'Filter the Power BI report canvas to Year 2024. Compare the [Total Revenue] card value against the SQL query TotalNetRevenue. If discrepancies exist, inspect Power Query filter transformations and relationship cross-filter behaviors.',
                  vi: 'Lọc trang báo cáo Power BI về Năm 2024. So sánh giá trị trên thẻ [Total Revenue] với số TotalNetRevenue từ SQL. Nếu có chênh lệch, kiểm tra lại bộ lọc trong Power Query và hành vi lọc quan hệ.'
                },
                expectedOutput: {
                  en: '100% numerical match down to the cent across all baseline financial metrics.',
                  vi: 'Khớp số học 100% đến từng xu trên tất cả các chỉ số tài chính cơ bản.'
                }
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Audit Visual Speeds with Performance Analyzer',
                  vi: 'Đo Tốc Độ Visual Bằng Performance Analyzer'
                },
                instruction: {
                  en: 'Open View ribbon > check "Performance Analyzer". Click "Start recording" then "Refresh visuals". Examine visual breakdown times: DAX query, Visual display, and Other. Ensure every visual finishes under 1,000ms.',
                  vi: 'Vào tab View > tích chọn "Performance Analyzer". Bấm "Start recording" rồi bấm "Refresh visuals". Xem chi tiết thời gian: DAX query, Visual display và Other. Đảm bảo mọi visual hoàn tất dưới 1.000ms.'
                },
                expectedOutput: {
                  en: 'Log showing all visual queries completing in under 400ms DAX query and < 200ms visual render.',
                  vi: 'Bảng log hiển thị toàn bộ truy vấn visual hoàn tất dưới 400ms DAX query và < 200ms render.'
                }
              },
              {
                stepNumber: 4,
                title: {
                  en: 'Configure Row-Level Security (RLS) & Publish',
                  vi: 'Cấu Hình Phân Quyền Hàng (RLS) & Xuất Bản Lên Service'
                },
                instruction: {
                  en: 'In Modeling ribbon, click "Manage roles". Create roles (e.g. "RegionalManager_EMEA") using DAX filter `DimCustomer[Region] == "EMEA"`. Test role via "View as", then click Home > "Publish" to deploy to the secure Power BI Service workspace.',
                  vi: 'Trong tab Modeling, bấm "Manage roles". Tạo role (ví dụ "RegionalManager_EMEA") dùng biểu thức lọc DAX `DimCustomer[Region] == "EMEA"`. Kiểm thử qua "View as", sau đó bấm Home > "Publish" để đưa lên workspace Power BI Service.'
                },
                expectedOutput: {
                  en: 'Report successfully published to workspace with validated role security applied.',
                  vi: 'Báo cáo được xuất bản thành công lên workspace với quyền bảo mật hàng đã kiểm tra.'
                }
              }
            ],
            verification: {
              en: 'Open the published report in Power BI Service in a web browser. Test slicer responsiveness; confirm that KPI cards and trend visuals render instantaneously (< 1.5 seconds perceived total load time). In Power BI Service dataset settings, verify scheduled refresh is successfully configured.',
              vi: 'Mở báo cáo đã xuất bản trên trình duyệt web qua Power BI Service. Thử chọn các slicer; đảm bảo thẻ KPI và biểu đồ xu hướng phản hồi ngay lập tức (< 1.5 giây thời gian tải thực tế). Vào cài đặt dataset kiểm tra lịch tự động refresh đã bật.'
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Performance Analyzer indicates DAX Query takes > 3,000ms on a single matrix visual.',
                  vi: 'Performance Analyzer cảnh báo DAX Query mất hơn 3.000ms trên một visual matrix.'
                },
                cause: {
                  en: 'The measure uses unconstrained row-by-row iterators (e.g., SUMX over an entire unindexed table) or has bi-directional cross-filtering active.',
                  vi: 'Công thức dùng hàm lặp từng dòng (như SUMX trên cả bảng lớn không lọc) hoặc đang bật hướng lọc hai chiều.'
                },
                fix: {
                  en: 'Refactor the measure to leverage CALCULATE with native columnar filter modifiers, or filter the table inside SUMX to only relevant keys.',
                  vi: 'Viết lại measure tận dụng CALCULATE với các filter modifier dạng cột, hoặc lọc nhỏ bảng trong SUMX trước khi lặp.'
                }
              }
            ],
            checklist: {
              en: [
                'Total Revenue reconciled against production SQL control query',
                'All visuals complete rendering in under 1,000ms in Performance Analyzer',
                'Row-Level Security (RLS) roles tested and verified using "View as"',
                'Scheduled refresh configured and verified without credentials failure'
              ],
              vi: [
                'Tổng doanh thu đối soát khớp hoàn toàn với truy vấn kiểm soát SQL sản xuất',
                'Toàn bộ visual tải hoàn tất dưới 1.000ms trong Performance Analyzer',
                'Các role bảo mật Row-Level Security (RLS) được kiểm tra kỹ qua tính năng "View as"',
                'Lịch tự động refresh được cấu hình và chạy thử thành công không lỗi chứng thực'
              ]
            }
          }
        }
      ]
    }
  ]
};
