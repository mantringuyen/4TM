import { Book } from '../../types';

export const POWER_BI_AND_DAX_PATTERNS_RECIPES_BOOK: Book = {
  id: 'power-bi-and-dax-patterns-recipes',
  slug: 'power-bi-and-dax-patterns-recipes',
  title: 'Power BI & DAX Patterns: Production Recipes',
  subtitle: {
    en: 'Time Intelligence, Filter Context Overrides, Dynamic Ranking & Status Icons',
    vi: 'Time Intelligence, Ghi Đè Filter Context, Xếp Hạng Động & Icon Trạng Thái'
  },
  bookType: 'Patterns / Recipes',
  categoryId: 'powerbi',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Data Modeling & Analytical Engineering Group',
  level: 'Intermediate to Advanced',
  estimatedReadTime: '35 mins',
  chaptersCount: 4,
  publishedDate: '2025-02-14',
  accentColor: 'from-yellow-600 to-amber-800',
  tags: [
    'Power BI',
    'DAX Patterns',
    'Recipes',
    'Time Intelligence',
    'REMOVEFILTERS',
    'RANKX',
    'KPI Formatting'
  ],
  description: {
    en: 'A curated collection of production-ready DAX calculation patterns and analytical recipes: resilient Time Intelligence, percentage-of-total calculations with REMOVEFILTERS, dynamic ranking with RANKX, and automated KPI status formatting.',
    vi: 'Tập hợp các mẫu công thức DAX chuẩn sản xuất và công thức phân tích thực tiễn: Time Intelligence bền bỉ, tính tỷ trọng tổng số bằng REMOVEFILTERS, xếp hạng động với RANKX và định dạng icon KPI tự động.'
  },
  prerequisites: {
    en: [
      'Understanding of Star Schema concepts and Power BI relationships',
      'Familiarity with DAX syntax, evaluation context (row vs filter context), and basic CALCULATE usage'
    ],
    vi: [
      'Hiểu biết về mô hình Star Schema và quan hệ trong Power BI',
      'Quen thuộc với cú pháp DAX, ngữ cảnh tính toán (row context vs filter context) và hàm CALCULATE cơ bản'
    ]
  },
  outcomes: {
    en: [
      'Implement robust YTD, YoY growth, and Rolling 12-Month calculations using native Time Intelligence',
      'Master filter context removal with REMOVEFILTERS() to calculate clean percentage-of-total metrics',
      'Author tie-safe dynamic ranking leaderboards with RANKX() and ALLSELECTED()',
      'Generate dynamic Unicode KPI badges and data-driven hex color codes directly in DAX'
    ],
    vi: [
      'Triển khai công thức YTD, tăng trưởng cùng kỳ và 12 tháng trượt bằng Time Intelligence chuẩn',
      'Làm chủ kỹ thuật xóa ngữ cảnh lọc với REMOVEFILTERS() để tính tỷ trọng phần trăm chính xác',
      'Viết công thức xếp hạng động an toàn với RANKX() và ALLSELECTED() không lỗi dòng tổng',
      'Tạo nhãn trạng thái Unicode động và mã màu hex trực tiếp từ DAX cho định dạng có điều kiện'
    ]
  },
  chapters: [
    {
      id: 'pbi-pat-ch-1',
      number: 1,
      slug: 'time-intelligence-patterns',
      title: {
        en: 'Time Intelligence Patterns',
        vi: 'Mẫu Công Thức Time Intelligence'
      },
      summary: {
        en: 'Reusable YTD, YoY comparisons, and rolling 12-month period calculations using CALCULATE and standard Date tables.',
        vi: 'Các mẫu tính lũy kế năm (YTD), so sánh cùng kỳ (YoY) và kỳ trượt 12 tháng bằng CALCULATE và bảng Date chuẩn.'
      },
      readTimeMinutes: 9,
      sections: [
        {
          id: 'pbi-pat-1-1',
          title: {
            en: '1. Reusable YTD, YoY, and Rolling 12-Month Patterns',
            vi: '1. Mẫu Tính Lũy Kế YTD, So Sánh YoY & Kỳ Trượt 12 Tháng'
          },
          content: {
            en: 'Time-series analysis forms the backbone of executive management reporting. Business stakeholders constantly need to compare current performance against historical periods: Year-to-Date (YTD), Year-over-Year (YoY) variance, and moving Rolling 12-Month totals. Rather than authoring complex, fragile manual date filters, DAX provides optimized Time Intelligence functions that operate over a validated contiguous Date table. This pattern demonstrates how to compose clean, high-performance time calculations that adjust dynamically across days, months, quarters, and years.',
            vi: 'Phân tích chuỗi thời gian là xương sống của mọi báo cáo quản trị doanh nghiệp. Ban lãnh đạo liên tục cần so sánh hiệu quả hiện tại với quá khứ: Lũy kế đầu năm đến nay (YTD), chênh lệch so với cùng kỳ năm trước (YoY) và tổng trượt 12 tháng gần nhất (Rolling 12-Month). Thay vì viết các bộ lọc ngày thủ công phức tạp và dễ vỡ, DAX cung cấp các hàm Time Intelligence được tối ưu hóa sâu trong engine VertiPaq khi làm việc trên một bảng Date chuẩn liên tục. Mẫu công thức này hướng dẫn cách kết hợp các hàm để tạo ra các chỉ số thời gian linh hoạt và chạy mượt mà trên mọi cấp độ ngày, tháng, quý, năm.'
          },
          keyIdea: {
            en: 'Time Intelligence functions require a dedicated, continuous Date table marked as Date Table with zero missing days. Always author base aggregations first, then shift filter context using CALCULATE.',
            vi: 'Các hàm Time Intelligence bắt buộc phải có một bảng Date liên tục không đứt đoạn ngày và được đánh dấu là Date Table. Luôn viết các measure tính tổng cơ bản trước, sau đó dùng CALCULATE để dịch chuyển ngữ cảnh thời gian.'
          },
          patternDetails: {
            problem: {
              en: 'Calculating Year-to-Date (YTD), Year-over-Year (YoY) percentage growth, and Rolling 12-Month moving totals across arbitrary calendar selections without hardcoding date boundaries.',
              vi: 'Tính toán lũy kế năm (YTD), phần trăm tăng trưởng cùng kỳ (YoY) và tổng trượt 12 tháng trên các bộ lọc lịch bất kỳ mà không phải viết cứng các mốc thời gian.'
            },
            context: {
              en: 'Enterprise financial statements, sales trend dashboards, and operational performance scorecards requiring flexible multi-period historical comparisons.',
              vi: 'Báo cáo tài chính doanh nghiệp, bảng điều khiển doanh số và bảng điểm hiệu suất vận hành cần so sánh đa kỳ lịch sử linh hoạt.'
            },
            solutionOverview: {
              en: 'Leverage CALCULATE with native DAX Time Intelligence functions (DATESYTD, SAMEPERIODLASTYEAR, DATESINPERIOD) referencing the conformed contiguous DimDate table, guarding divisions with DIVIDE.',
              vi: 'Tận dụng CALCULATE cùng các hàm Time Intelligence gốc của DAX (DATESYTD, SAMEPERIODLASTYEAR, DATESINPERIOD) tham chiếu tới bảng DimDate liên tục, bảo vệ phép chia bằng DIVIDE.'
            },
            architectureDiagram: {
              title: {
                en: 'Time Intelligence Filter Context Shift',
                vi: 'Dịch Chuyển Filter Context Trong Time Intelligence'
              },
              steps: [
                {
                  stepNumber: 1,
                  title: { en: 'Visual Context', vi: 'Ngữ Cảnh Visual' },
                  description: {
                    en: 'User selects Month = October 2024 on report slicer.',
                    vi: 'Người dùng chọn Tháng = Tháng 10 năm 2024 trên slicer báo cáo.'
                  }
                },
                {
                  stepNumber: 2,
                  title: { en: 'CALCULATE Interception', vi: 'Can Thiệp Của CALCULATE' },
                  description: {
                    en: 'SAMEPERIODLASTYEAR shifts active date set exactly 1 year backward (Oct 1-31, 2023).',
                    vi: 'SAMEPERIODLASTYEAR dịch chuyển tập ngày lùi về đúng 1 năm trước (1-31/10/2023).'
                  }
                },
                {
                  stepNumber: 3,
                  title: { en: 'VertiPaq Retrieval', vi: 'Truy Vấn VertiPaq' },
                  description: {
                    en: 'Engine computes base measure under shifted context in columnar memory cache.',
                    vi: 'Engine tính toán measure cơ bản trên tập dòng đã dịch chuyển trong bộ nhớ cột.'
                  }
                }
              ]
            },
            implementation: {
              language: 'dax',
              filename: 'time_intelligence_patterns.dax',
              code: `// 1. Base Measure
Total Sales = SUM(FactSales[SalesAmount])

// 2. Year-to-Date (YTD)
Sales YTD = 
CALCULATE(
    [Total Sales],
    DATESYTD(DimDate[Date])
)

// 3. Prior Year Same Period
Sales Prior Year = 
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR(DimDate[Date])
)

// 4. Year-over-Year (YoY) Variance & Growth %
Sales YoY Variance = [Total Sales] - [Sales Prior Year]

Sales YoY Growth % = 
DIVIDE(
    [Sales YoY Variance],
    [Sales Prior Year],
    BLANK()
)

// 5. Dynamic Rolling 12-Month Revenue
Sales Rolling 12M = 
VAR LastVisibleDate = MAX(DimDate[Date])
RETURN
    CALCULATE(
        [Total Sales],
        DATESINPERIOD(
            DimDate[Date],
            LastVisibleDate,
            -12,
            MONTH
        )
    )`
            },
            explanation: {
              en: 'The pattern separates base business aggregations ([Total Sales]) from time transformation logic. `DATESYTD` modifies the filter context by returning all dates from January 1st of the current year up to the maximum date currently in context. `SAMEPERIODLASTYEAR` takes the entire set of dates in the current filter context and shifts them backward exactly 365 days (accounting for leap years). `DATESINPERIOD` computes rolling windows by anchoring on the latest visible date (`MAX(DimDate[Date])`) and moving backward 12 months.',
              vi: 'Mẫu công thức tách biệt rõ ràng giữa phép cộng dồn cơ bản ([Total Sales]) và logic biến đổi thời gian. Hàm `DATESYTD` can thiệp vào filter context bằng cách trả về tập hợp các ngày từ 1/1 của năm hiện tại đến ngày lớn nhất đang nằm trong ngữ cảnh. `SAMEPERIODLASTYEAR` lấy trọn vẹn tập ngày trong filter context hiện tại và dịch lùi chính xác 1 năm (có xử lý năm nhuận). Hàm `DATESINPERIOD` tính các kỳ trượt bằng cách neo vào ngày hiển thị cuối cùng (`MAX(DimDate[Date])`) và quét lùi 12 tháng.'
            },
            variations: [
              {
                name: {
                  en: 'Fiscal Year YTD Calculation',
                  vi: 'Tính Lũy Kế Năm Tài Chính (Fiscal YTD)'
                },
                description: {
                  en: 'Pass an explicit fiscal year-end string (e.g. "06-30") as the second argument to DATESYTD.',
                  vi: 'Truyền tham số ngày kết thúc năm tài chính (ví dụ "06-30") vào đối số thứ hai của hàm DATESYTD.'
                },
                codeBlock: {
                  language: 'dax',
                  code: `Sales Fiscal YTD = 
CALCULATE(
    [Total Sales],
    DATESYTD(DimDate[Date], "06-30") -- Fiscal year ends June 30
)`
                }
              },
              {
                name: {
                  en: 'Month-to-Date (MTD) and Quarter-to-Date (QTD)',
                  vi: 'Lũy Kế Tháng (MTD) & Lũy Kế Quý (QTD)'
                },
                description: {
                  en: 'Standard DATESMTD and DATESQTD wrappers for periodic cumulative totals.',
                  vi: 'Các hàm bọc chuẩn DATESMTD và DATESQTD cho lũy kế định kỳ theo tháng và quý.'
                },
                codeBlock: {
                  language: 'dax',
                  code: `Sales MTD = CALCULATE([Total Sales], DATESMTD(DimDate[Date]))
Sales QTD = CALCULATE([Total Sales], DATESQTD(DimDate[Date]))`
                }
              }
            ],
            tradeOffs: {
              en: [
                'Native Time Intelligence functions leverage internal VertiPaq optimizations for blazing speed, but require a contiguous date table without gaps.',
                'They cannot handle arbitrary custom calendars (such as 4-4-5 or 13-period retail accounting) without building custom integer offset columns.'
              ],
              vi: [
                'Các hàm Time Intelligence bản địa tận dụng tối ưu hóa phần cứng của VertiPaq cho tốc độ vượt trội, nhưng đòi hỏi bảng ngày liên tục không thiếu ngày nào.',
                'Không thể áp dụng trực tiếp cho các lịch bán lẻ đặc thù (như lịch 4-4-5 hoặc 13 kỳ kế toán) mà phải xây dựng thêm các cột offset số nguyên tùy biến.'
              ]
            },
            gotchas: {
              en: [
                'Filtering on FactSales[OrderDate] instead of DimDate[Date] completely bypasses the relationship and causes Time Intelligence functions to return empty or erroneous totals.',
                'If the Date table is not explicitly designated via "Mark as Date Table", Power BI may use hidden auto-date-time hierarchies that bloat file size and yield inconsistent results.'
              ],
              vi: [
                'Nếu người dùng lọc trên cột FactSales[OrderDate] thay vì DimDate[Date], mối quan hệ sẽ bị bỏ qua và hàm Time Intelligence sẽ trả về rỗng hoặc sai số hoàn toàn.',
                'Nếu bảng Date không được đánh dấu "Mark as Date Table", Power BI có thể tạo các bảng ngày ngầm tự động làm phình file và gây kết quả chập chờn.'
              ]
            },
            whenNotToUse: {
              en: [
                'Do not use native Time Intelligence when working with non-standard retail accounting calendars (e.g. National Retail Federation 4-5-4 calendar); use custom integer period index columns (e.g. MonthIndex = CurrentIndex - 12) instead.',
                'Do not use Time Intelligence over datasets without a dedicated Date dimension table.'
              ],
              vi: [
                'Không dùng Time Intelligence bản địa khi doanh nghiệp áp dụng lịch kế toán bán lẻ đặc thù (như lịch NRF 4-5-4); hãy dùng các cột chỉ số tuần/tháng số nguyên (MonthIndex = CurrentIndex - 12).',
                'Không dùng Time Intelligence trên các mô hình chưa thiết lập bảng chiều ngày DimDate chuyên biệt.'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'pbi-pat-ch-2',
      number: 2,
      slug: 'filter-and-context-patterns',
      title: {
        en: 'Filter & Context Modification Patterns',
        vi: 'Mẫu Can Thiệp Filter & Ngữ Cảnh'
      },
      summary: {
        en: 'Percentage of total and subtotal contribution patterns using REMOVEFILTERS and ALLEXCEPT.',
        vi: 'Các mẫu tính tỷ trọng đóng góp phần trăm trên tổng số và tổng nhóm bằng REMOVEFILTERS và ALLEXCEPT.'
      },
      readTimeMinutes: 9,
      sections: [
        {
          id: 'pbi-pat-2-1',
          title: {
            en: '1. Percentage of Total Pattern with REMOVEFILTERS()',
            vi: '1. Mẫu Tính Tỷ Trọng Tổng Số Với REMOVEFILTERS()'
          },
          content: {
            en: 'Executive presentations frequently call for proportion analysis: "What percentage of our enterprise revenue was generated by the Cloud division?" or "What is each region\'s share of overall product margin?". To compute a percentage of total, a measure must calculate the current item\'s value in the numerator, and divide it by the grand total in the denominator. To obtain that grand total, the measure must explicitly clear the filter context exerted by the current visual row. In modern DAX, the canonical and safest pattern uses `REMOVEFILTERS()`, which removes filters cleanly without materializing unnecessary intermediate tables.',
            vi: 'Trong các bài thuyết trình quản trị, nhu cầu phân tích tỷ trọng là rất thường xuyên: "Mảng Cloud đóng góp bao nhiêu phần trăm vào tổng doanh thu toàn tập đoàn?" hay "Tỷ trọng lợi nhuận của từng vùng miền là bao nhiêu?". Để tính tỷ trọng phần trăm, measure cần tính giá trị của dòng hiện tại ở tử số, và chia cho tổng số toàn bộ ở mẫu số. Để có được con số tổng toàn bộ đó, measure phải gỡ bỏ filter context đang áp đặt bởi dòng visual hiện tại. Trong DAX hiện đại, mẫu chuẩn và an toàn nhất là sử dụng `REMOVEFILTERS()`, hàm này xóa bộ lọc một cách thanh thoát mà không sinh thêm bảng phụ trong bộ nhớ.'
          },
          keyIdea: {
            en: 'Prefer REMOVEFILTERS() over ALL() inside CALCULATE. REMOVEFILTERS() acts purely as a filter modifier and cannot be accidentally misused as an iterator table, saving memory and communicating intent clearly.',
            vi: 'Ưu tiên dùng REMOVEFILTERS() thay cho ALL() bên trong CALCULATE. REMOVEFILTERS() hoạt động thuần túy như một modifier gỡ bộ lọc và không bị dùng nhầm làm bảng lặp, giúp tiết kiệm bộ nhớ và thể hiện rõ ý định code.'
          },
          patternDetails: {
            problem: {
              en: 'Calculating a category or segment contribution percentage against the grand total or parent subtotal while preserving unrelated slicer filters (such as year or country).',
              vi: 'Tính toán tỷ lệ đóng góp của một danh mục hoặc phân khúc so với tổng toàn bộ hoặc tổng nhóm cha trong khi vẫn giữ nguyên các bộ lọc slicer khác (như năm hay quốc gia).'
            },
            context: {
              en: 'Sales mix analysis, customer Pareto distribution matrices, and revenue concentration dashboards.',
              vi: 'Phân tích cơ cấu sản phẩm (sales mix), ma trận phân bổ khách hàng Pareto và dashboard mức độ tập trung doanh thu.'
            },
            solutionOverview: {
              en: 'Author a measure that evaluates the base measure divided by the base measure evaluated under CALCULATE with REMOVEFILTERS() applied to the specific dimension table or column.',
              vi: 'Viết measure tính tỷ số giữa measure cơ bản chia cho measure cơ bản được đánh giá trong CALCULATE có REMOVEFILTERS() áp dụng lên bảng chiều hoặc cột chiều cụ thể.'
            },
            implementation: {
              language: 'dax',
              filename: 'pct_of_total_patterns.dax',
              code: `// 1. Percentage of Grand Total (respects other slicers, clears Category filter)
Pct of Grand Total Sales = 
VAR CurrentCategorySales = [Total Sales]
VAR GrandTotalSales = 
    CALCULATE(
        [Total Sales],
        REMOVEFILTERS(DimProduct)
    )
RETURN
    DIVIDE(CurrentCategorySales, GrandTotalSales, 0)

// 2. Percentage of Parent Subtotal (clears Subcategory, preserves Category)
Pct of Parent Category Sales = 
VAR CurrentSubcatSales = [Total Sales]
VAR ParentCategorySales = 
    CALCULATE(
        [Total Sales],
        REMOVEFILTERS(DimProduct[Subcategory])
    )
RETURN
    DIVIDE(CurrentSubcatSales, ParentCategorySales, 0)`
            },
            explanation: {
              en: 'In `Pct of Grand Total Sales`, `CurrentCategorySales` evaluates under the filter context of the matrix row (e.g. Category = "Laptops"). In `GrandTotalSales`, `CALCULATE([Total Sales], REMOVEFILTERS(DimProduct))` strips away all filters originating from the DimProduct table, returning total sales across all products while still respecting outer slicers like Year or Country. `DIVIDE` then computes the exact ratio safely.',
              vi: 'Trong `Pct of Grand Total Sales`, biến `CurrentCategorySales` được tính theo filter context của dòng matrix (ví dụ Category = "Laptops"). Ở biến `GrandTotalSales`, lệnh `CALCULATE([Total Sales], REMOVEFILTERS(DimProduct))` gỡ bỏ hoàn toàn mọi bộ lọc đến từ bảng DimProduct, trả về tổng doanh số của tất cả sản phẩm nhưng vẫn tuân thủ các slicer ngoài như Năm hay Quốc gia. Hàm `DIVIDE` chia hai biến này an toàn.'
            },
            variations: [
              {
                name: {
                  en: 'Percentage of Visual Filtered Total using ALLSELECTED',
                  vi: 'Tỷ Trọng Trên Tổng Lọc Của Visual Bằng ALLSELECTED'
                },
                description: {
                  en: 'Calculates category share relative only to items currently active in the visual slice.',
                  vi: 'Tính tỷ trọng danh mục so với chỉ những mục đang được chọn hiển thị trên visual.'
                },
                codeBlock: {
                  language: 'dax',
                  code: `Pct of Filtered Selection = 
VAR CurrentItem = [Total Sales]
VAR SelectedTotal = 
    CALCULATE(
        [Total Sales],
        ALLSELECTED(DimProduct[Category])
    )
RETURN
    DIVIDE(CurrentItem, SelectedTotal, 0)`
                }
              }
            ],
            tradeOffs: {
              en: [
                'REMOVEFILTERS is clean, highly readable, and prevents accidental table materialization in memory.',
                'However, it cannot be used outside CALCULATE as a table expression for iterators like SUMX or FILTER (where ALL is still required).'
              ],
              vi: [
                'REMOVEFILTERS rất trong sáng, dễ đọc và ngăn chặn việc sinh bảng ảo thừa trong bộ nhớ.',
                'Tuy nhiên, nó không thể dùng ngoài hàm CALCULATE để làm bảng lặp cho các hàm iterator như SUMX hay FILTER (khi đó vẫn cần dùng hàm ALL).'
              ]
            },
            gotchas: {
              en: [
                'Applying REMOVEFILTERS on the Fact table instead of the Dimension table wipes out ALL filters in the entire model, including dates, regions, and user security.',
                'Using ALLEXCEPT can cause unexpected behavior when new columns from the same dimension table are added to slicers.'
              ],
              vi: [
                'Nếu áp dụng REMOVEFILTERS trên bảng Fact thay vì bảng Dimension, nó sẽ xóa sạch TOÀN BỘ bộ lọc trong mô hình, bao gồm cả ngày, vùng miền và phân quyền bảo mật.',
                'Dùng ALLEXCEPT có thể dẫn đến tác dụng phụ khó lường khi bổ sung các cột mới từ cùng bảng chiều vào slicer.'
              ]
            },
            whenNotToUse: {
              en: [
                'Do not use REMOVEFILTERS when you need to iterate over a list of unique values in a calculation; use ALL or VALUES instead.',
                'Do not use REMOVEFILTERS on Fact tables directly.'
              ],
              vi: [
                'Không dùng REMOVEFILTERS khi cần lặp qua danh sách các giá trị duy nhất trong một phép tính; hãy dùng ALL hoặc VALUES.',
                'Không bao giờ đặt REMOVEFILTERS trực tiếp lên các bảng Fact.'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'pbi-pat-ch-3',
      number: 3,
      slug: 'ranking-and-comparison-patterns',
      title: {
        en: 'Ranking & Comparison Patterns',
        vi: 'Mẫu Xếp Hạng & So Sánh Phân Vị'
      },
      summary: {
        en: 'Dynamic ranking of products and customers using RANKX, ALLSELECTED, and handling ties cleanly.',
        vi: 'Xếp hạng động sản phẩm và khách hàng bằng RANKX, ALLSELECTED và xử lý đồng hạng sạch sẽ.'
      },
      readTimeMinutes: 9,
      sections: [
        {
          id: 'pbi-pat-3-1',
          title: {
            en: '1. Dynamic Product Ranking with RANKX() & ALLSELECTED()',
            vi: '1. Mẫu Xếp Hạng Động Bằng RANKX() & ALLSELECTED()'
          },
          content: {
            en: 'Executive leaderboards require ranking products, sales representatives, or stores dynamically based on sales performance. A static rank calculated in Power Query or SQL cannot adapt when an executive filters by "Region: Europe" or "Quarter: Q3". In DAX, dynamic ranking is accomplished with `RANKX()`. However, naive implementations frequently fail on grand total rows (displaying "1" instead of blank) or compute ranks against the entire worldwide database rather than the current visual selection. This recipe demonstrates how to combine `RANKX()`, `ALLSELECTED()`, and `HASONEVALUE()` for foolproof dynamic leaderboards.',
            vi: 'Bảng xếp hạng quản trị đòi hỏi phải xếp hạng sản phẩm, nhân viên bán hàng hoặc cửa hàng một cách linh hoạt theo doanh số. Một thứ hạng tĩnh tạo trong Power Query hay SQL sẽ không thể tự điều chỉnh khi lãnh đạo lọc theo "Khu vực: Châu Âu" hay "Quý: Q3". Trong DAX, xếp hạng động được thực hiện qua hàm `RANKX()`. Tuy nhiên, cách viết ngây thơ thường mắc lỗi ở dòng tổng cộng (hiện số 1 vô nghĩa) hoặc tính thứ hạng trên toàn bộ cơ sở dữ liệu thay vì theo tập dữ liệu đang được lọc trên visual. Mẫu công thức này hướng dẫn phối hợp `RANKX()`, `ALLSELECTED()` và `HASONEVALUE()` để tạo bảng xếp hạng chuẩn xác.'
          },
          keyIdea: {
            en: 'Always wrap RANKX in IF(HASONEVALUE(...)) or ISINSCOPE(...) to suppress meaningless ranks on subtotal and total rows, and use ALLSELECTED() to rank strictly within the executive visual selection.',
            vi: 'Luôn bọc RANKX trong IF(HASONEVALUE(...)) hoặc ISINSCOPE(...) để triệt tiêu thứ hạng vô nghĩa ở dòng tổng và tổng phụ, đồng thời dùng ALLSELECTED() để xếp hạng chính xác trong phạm vi bộ lọc visual.'
          },
          patternDetails: {
            problem: {
              en: 'Ranking dimension items dynamically based on active slicer selections, handling ties consistently, and preventing misleading rank numbers from appearing on matrix total rows.',
              vi: 'Xếp hạng động các phần tử thuộc tính theo bộ lọc slicer đang active, xử lý đồng hạng nhất quán và ngăn chặn số thứ hạng gây hiểu lầm xuất hiện trên dòng tổng cộng.'
            },
            context: {
              en: 'Top-N leaderboards, branch performance rankings, and executive scorecard rankings.',
              vi: 'Bảng xếp hạng Top-N sản phẩm, phân hạng chi nhánh xuất sắc và bảng điểm thi đua kinh doanh.'
            },
            solutionOverview: {
              en: 'Evaluate RANKX over ALLSELECTED(Dimension[Column]), pass the base measure, specify DESC order with Dense ties, and guard the evaluation with ISINSCOPE or HASONEVALUE.',
              vi: 'Đánh giá RANKX trên ALLSELECTED(Dimension[Column]), truyền measure cơ bản, chỉ định thứ tự DESC với phương thức Dense, và bọc bằng ISINSCOPE hoặc HASONEVALUE.'
            },
            implementation: {
              language: 'dax',
              filename: 'dynamic_ranking_patterns.dax',
              code: `// 1. Dynamic Product Rank (with Total row guard)
Product Sales Rank = 
IF(
    ISINSCOPE(DimProduct[ProductName]),
    RANKX(
        ALLSELECTED(DimProduct[ProductName]),
        [Total Sales],
        ,
        DESC,
        Dense
    ),
    BLANK()
)

// 2. Dynamic Top 5 Filter Measure (returns sales only for Top 5)
Top 5 Product Sales Only = 
VAR CurrentRank = [Product Sales Rank]
RETURN
    IF(
        NOT ISBLANK(CurrentRank) && CurrentRank <= 5,
        [Total Sales],
        BLANK()
    )`
            },
            explanation: {
              en: '`ISINSCOPE(DimProduct[ProductName])` returns TRUE only when evaluating individual product rows in the visual; on subtotal or grand total rows it returns FALSE, yielding `BLANK()`. Inside `RANKX`, `ALLSELECTED(DimProduct[ProductName])` clears the current row filter while preserving outer report slicers (e.g. Region or Year). The `Dense` parameter ensures that if two products tie for rank 2, the next product receives rank 3 rather than skipping to rank 4.',
              vi: 'Hàm `ISINSCOPE(DimProduct[ProductName])` chỉ trả về TRUE khi đang tính toán ở từng dòng sản phẩm riêng lẻ trong visual; ở các dòng tổng phụ hoặc tổng cộng nó trả về FALSE để hiện `BLANK()`. Bên trong `RANKX`, `ALLSELECTED(DimProduct[ProductName])` gỡ bỏ bộ lọc của dòng hiện tại nhưng vẫn giữ nguyên các slicer bên ngoài (như Vùng miền hay Năm). Tham số `Dense` đảm bảo nếu 2 sản phẩm đồng hạng 2 thì sản phẩm tiếp theo sẽ nhận hạng 3 thay vì bị nhảy cóc lên hạng 4.'
            },
            variations: [
              {
                name: {
                  en: 'Ascending Rank for Cost / Defect Rate Leaderboard',
                  vi: 'Xếp Hạng Tăng Dần Cho Bảng Kiểm Soát Chi Phí / Tỷ Lệ Lỗi'
                },
                description: {
                  en: 'Uses ASC sorting so the lowest defect percentage receives Rank 1.',
                  vi: 'Dùng thứ tự sắp xếp ASC để tỷ lệ lỗi thấp nhất nhận được thứ hạng 1.'
                },
                codeBlock: {
                  language: 'dax',
                  code: `Lowest Defect Rank = 
IF(
    ISINSCOPE(DimPlant[PlantName]),
    RANKX(
        ALLSELECTED(DimPlant[PlantName]),
        [Defect Rate %],
        ,
        ASC,
        Dense
    ),
    BLANK()
)`
                }
              }
            ],
            tradeOffs: {
              en: [
                'RANKX with ALLSELECTED is fully dynamic and reacts to any combination of slicers.',
                'However, on high-cardinality dimensions (> 50,000 unique rows), iterating RANKX inside a visual can increase DAX computation time.'
              ],
              vi: [
                'RANKX kết hợp ALLSELECTED mang tính linh hoạt tuyệt đối và tự thích ứng với mọi tổ hợp bộ lọc slicer.',
                'Tuy nhiên, trên các bảng có số dòng rất lớn (> 50.000 dòng duy nhất), việc chạy RANKX trong visual có thể làm tăng thời gian tính toán của DAX.'
              ]
            },
            gotchas: {
              en: [
                'Using ALL instead of ALLSELECTED will rank against all products in the company history, ignoring the user\'s active year or category slicer.',
                'Forgetting the ISINSCOPE / HASONEVALUE check will result in the grand total row displaying rank "1", confusing report viewers.'
              ],
              vi: [
                'Dùng ALL thay vì ALLSELECTED sẽ khiến sản phẩm bị xếp hạng so với toàn bộ lịch sử công ty, phớt lờ các slicer Năm hay Danh mục người dùng đang chọn.',
                'Quên kiểm tra ISINSCOPE / HASONEVALUE sẽ khiến dòng tổng cộng hiển thị hạng "1", gây hiểu lầm nghiêm trọng cho người xem báo cáo.'
              ]
            },
            whenNotToUse: {
              en: [
                'Do not use DAX RANKX if a static Top N filter in the Power BI Visual Filter Pane fulfills the business requirement, as the native filter pane is pre-optimized by the VertiPaq engine.',
                'Do not use on columns with millions of distinct values inside an interactive matrix.'
              ],
              vi: [
                'Không nhất thiết phải dùng DAX RANKX nếu tính năng lọc Top N có sẵn trong Filter Pane của Power BI đã đáp ứng đủ, vì bộ lọc bản địa được engine tối ưu sâu hơn.',
                'Không dùng trên các cột có hàng triệu giá trị phân biệt trong một bảng matrix tương tác.'
              ]
            }
          }
        }
      ]
    },
    {
      id: 'pbi-pat-ch-4',
      number: 4,
      slug: 'kpi-and-conditional-patterns',
      title: {
        en: 'KPI & Conditional Formatting Patterns',
        vi: 'Mẫu Định Dạng Có Điều Kiện & Chỉ Số KPI'
      },
      summary: {
        en: 'Target variance calculations, dynamic SVG/Unicode status indicators, and hex-code formatting measures.',
        vi: 'Tính chênh lệch mục tiêu, biểu tượng trạng thái Unicode động và measure sinh mã màu hex cho định dạng giao diện.'
      },
      readTimeMinutes: 8,
      sections: [
        {
          id: 'pbi-pat-4-1',
          title: {
            en: '1. Target Variance & Dynamic Status Icon Patterns',
            vi: '1. Mẫu Tính Chênh Lệch Mục Tiêu & Icon Trạng Thái Động'
          },
          content: {
            en: 'Executive scorecards require rapid at-a-glance status indicators to highlight underperforming business units. If report authors configure conditional formatting manually inside visual settings, rules become duplicated across 20 charts, leading to maintenance nightmares whenever thresholds change. A resilient DAX pattern centralizes business formatting rules directly in DAX measures: authoring dynamic Unicode status badges ("🟢 On Track", "🟡 At Risk", "🔴 Critical") and color hex codes ("#10B981", "#EF4444") that bind to visuals via the "Field Value" conditional formatting option.',
            vi: 'Bảng điểm điều hành cần các biểu tượng chỉ báo trạng thái trực quan để làm nổi bật ngay các bộ phận kinh doanh hoạt động kém. Nếu người thiết kế cài đặt màu thủ công trong bảng thuộc tính của từng visual, các quy tắc sẽ bị phân mảnh trên hàng chục biểu đồ, gây ác mộng bảo trì mỗi khi định mức KPI thay đổi. Mẫu thiết kế DAX bền vững chuẩn hóa toàn bộ quy tắc nghiệp vụ ngay trong các measure: tự động sinh các icon Unicode ("🟢 Đạt", "🟡 Cảnh báo", "🔴 Nguy hiểm") và các mã màu hex ("#10B981", "#EF4444") để gắn vào visual thông qua tùy chọn định dạng "Field Value".'
          },
          keyIdea: {
            en: 'Centralize conditional formatting rules in dedicated DAX measures returning hex color strings or Unicode icons. Bind visual colors using the "Field Value" formatting method to establish a single source of truth.',
            vi: 'Tập trung hóa các quy tắc định dạng có điều kiện vào measure DAX chuyên dụng trả về chuỗi mã màu hex hoặc icon Unicode. Gắn màu visual bằng phương thức "Field Value" để tạo nguồn chân lý duy nhất cho toàn bộ báo cáo.'
          },
          patternDetails: {
            problem: {
              en: 'Maintaining consistent KPI alert thresholds and visual status indicators across dozens of report pages without manual duplication in visual format panes.',
              vi: 'Duy trì các ngưỡng cảnh báo KPI và biểu tượng trạng thái nhất quán trên hàng chục trang báo cáo mà không phải cài đặt thủ công lặp đi lặp lại.'
            },
            context: {
              en: 'Monthly business reviews, budget vs actual variance monitoring, and SLA achievement scorecards.',
              vi: 'Báo cáo đánh giá kinh doanh hàng tháng, theo dõi ngân sách so với thực tế và bảng kiểm soát SLA.'
            },
            solutionOverview: {
              en: 'Author calculation measures for target variance %, evaluate business rules using SWITCH(TRUE(), ...), and return standardized Unicode indicators and hex color codes.',
              vi: 'Viết measure tính % chênh lệch mục tiêu, đánh giá quy tắc nghiệp vụ bằng hàm SWITCH(TRUE(), ...) và trả về các biểu tượng Unicode chuẩn cùng mã màu hex.'
            },
            implementation: {
              language: 'dax',
              filename: 'kpi_status_formatting_patterns.dax',
              code: `// 1. Target Variance Calculation
Sales Target Variance % = 
VAR Actual = [Total Sales]
VAR Target = [Sales Target]
RETURN
    DIVIDE(Actual - Target, Target, BLANK())

// 2. Dynamic Unicode Status Badge
KPI Status Badge = 
VAR VariancePct = [Sales Target Variance %]
RETURN
    SWITCH(
        TRUE(),
        ISBLANK(VariancePct), "⚪ No Target",
        VariancePct >= 0.05, "🟢 Exceeding (+5%)",
        VariancePct >= 0.00, "🟢 On Track",
        VariancePct >= -0.10, "🟡 At Risk (Within 10%)",
        "🔴 Critical Underperformance"
    )

// 3. Dynamic Hex Color Code Measure (Bind via Format > Cell Elements > Font Color > Field Value)
KPI Status Color Hex = 
VAR VariancePct = [Sales Target Variance %]
RETURN
    SWITCH(
        TRUE(),
        ISBLANK(VariancePct), "#94A3B8", // Slate 400
        VariancePct >= 0.00, "#10B981",  // Emerald 500
        VariancePct >= -0.10, "#F59E0B", // Amber 500
        "#EF4444"                       // Rose 500
    )`
            },
            explanation: {
              en: '`SWITCH(TRUE(), ...)` evaluates boolean conditions sequentially from top to bottom, returning the output associated with the first TRUE statement. In `KPI Status Color Hex`, returning exact hex color strings (`#10B981`) allows authors to go to Visual Formatting > Cell Elements > Background Color > Format Style: "Field Value" and select `[KPI Status Color Hex]`. Whenever corporate alert thresholds change, modifying the measure instantly updates every visual in the report.',
              vi: 'Hàm `SWITCH(TRUE(), ...)` đánh giá tuần tự các biểu thức điều kiện từ trên xuống dưới, và trả về giá trị đầu tiên thỏa mãn TRUE. Trong `KPI Status Color Hex`, việc trả về chuỗi mã màu hex (`#10B981`) cho phép người thiết kế vào Visual Formatting > Cell Elements > Background Color > Format Style: "Field Value" và chọn `[KPI Status Color Hex]`. Khi ngưỡng KPI của công ty thay đổi, chỉ cần sửa measure là toàn bộ visual trên tất cả các trang lập tức cập nhật đồng bộ.'
            },
            variations: [
              {
                name: {
                  en: 'Dynamic Trend Direction Arrow Measure',
                  vi: 'Measure Mũi Tên Hướng Xu Hướng Động'
                },
                description: {
                  en: 'Outputs Unicode directional arrows formatted with sign indicators.',
                  vi: 'Xuất ra các ký tự mũi tên Unicode kèm dấu tỷ lệ phần trăm.'
                },
                codeBlock: {
                  language: 'dax',
                  code: `Trend Arrow = 
VAR Growth = [Sales YoY Growth %]
RETURN
    SWITCH(
        TRUE(),
        ISBLANK(Growth), "-",
        Growth > 0, "▲ " & FORMAT(Growth, "+0.0%"),
        Growth < 0, "▼ " & FORMAT(Growth, "0.0%"),
        "► 0.0%"
    )`
                }
              }
            ],
            tradeOffs: {
              en: [
                'Centralizes visual styling rules in a single, version-controllable formula.',
                'Unicode emojis render cleanly across desktop and web, but exact visual glyph shapes may vary slightly between Windows, macOS, and mobile operating systems.'
              ],
              vi: [
                'Tập trung hóa các quy chuẩn thẩm mỹ vào một công thức duy nhất có thể quản lý phiên bản.',
                'Icon Unicode hiển thị tốt trên máy tính và web, nhưng hình thù ký tự thực tế có thể hơi khác nhau giữa Windows, macOS và di động.'
              ]
            },
            gotchas: {
              en: [
                'Forgetting to select "Field Value" in the conditional formatting dialog (leaving it set to the default "Rules" mode) will cause the visual to ignore the measure.',
                'Dividing by zero when the target is 0 or BLANK will cause errors if not protected with DIVIDE.'
              ],
              vi: [
                'Quên chọn "Field Value" trong hộp thoại Conditional Formatting (để mặc định chế độ "Rules") sẽ khiến visual không nhận màu từ measure.',
                'Phép chia cho 0 khi target bằng 0 hoặc BLANK sẽ gây lỗi nếu không được bọc bằng hàm DIVIDE.'
              ]
            },
            whenNotToUse: {
              en: [
                'Do not use Unicode character measures for high-resolution PDF print exports where strict pixel-perfect brand SVG geometry is required.',
                'Do not author formatting measures for one-off experimental charts.'
              ],
              vi: [
                'Không dùng icon Unicode cho các ấn phẩm in ấn PDF độ phân giải cao đòi hỏi chuẩn đồ họa vector SVG tuyệt đối của thương hiệu.',
                'Không cần viết measure định dạng cho các biểu đồ thử nghiệm dùng một lần.'
              ]
            }
          }
        }
      ]
    }
  ]
};
