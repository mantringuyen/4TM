import { Book } from '../../types';

export const EXCEL_FORMULAS_RECIPES_BOOK: Book = {
  id: 'excel-formulas-recipes',
  slug: 'excel-formulas-recipes',
  title: 'Excel Advanced Formulas & Recipes',
  subtitle: {
    en: 'Multi-Condition Lookups, Dynamic Arrays & Report Formulas',
    vi: 'Công Thức Tra Cứu Nâng Cao, Mảng Động & Công Thức Báo Cáo Tự Động',
  },
  bookType: 'Patterns / Recipes',
  categoryId: 'excel',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Intermediate',
  estimatedReadTime: '30 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-15',
  accentColor: 'from-emerald-600 to-green-900',
  tags: ['Formulas', 'Recipes', 'XLOOKUP', 'SUMIFS', 'Dynamic Array'],
  description: {
    en: 'Reusable Excel formula blueprints: multi-criteria XLOOKUP, dynamic cascading dropdowns, SUMIFS with wildcards, and LET function optimization.',
    vi: 'Bộ công thức Excel tái sử dụng: XLOOKUP nhiều điều kiện, menu thả xuống phân cấp động, SUMIFS dùng ký tự đại diện và tối ưu bằng hàm LET.',
  },
  prerequisites: {
    en: [
      'Understanding of basic IF, SUM, and VLOOKUP functions, and spreadsheet range references',
    ],
    vi: [
      'Hiểu biết các hàm IF, SUM và VLOOKUP cơ bản cùng cách tham chiếu ô/vùng trong Excel',
    ],
  },
  outcomes: {
    en: [
      'Streamline complex multi-step spreadsheet formulas using LET() variable declarations to eliminate repetitive calculations',
      'Execute multi-criteria lookups using Boolean multiplication inside XLOOKUP and FILTER functions',
      'Construct automated dashboard summary tables leveraging dynamic array formulas with SORT, UNIQUE, and FILTER',
    ],
    vi: [
      'Tinh gọn các công thức bảng tính phức tạp nhiều bước bằng hàm LET() để loại bỏ tính toán lặp',
      'Thực hiện tra cứu nhiều điều kiện bằng phép nhân mảng Boolean trong các hàm XLOOKUP và FILTER',
      'Xây dựng bảng tổng hợp dashboard tự động cập nhật với các hàm mảng động SORT, UNIQUE và FILTER',
    ],
  },
  chapters: [
    {
      id: 'xfr-ch-1',
      number: 1,
      slug: 'multi-criteria-lookups-let-function',
      title: {
        en: 'Multi-Criteria Lookups & The LET() Function',
        vi: 'Tra Cứu Nhiều Điều Kiện & Tối Ưu Với Hàm LET()',
      },
      summary: {
        en: 'Combining boolean array conditions inside XLOOKUP and assigning variables with LET() for maximum formula performance.',
        vi: 'Kết hợp mảng điều kiện Boolean trong XLOOKUP và gán biến với LET() để đạt hiệu năng tính toán cao nhất.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'xfr-1-1',
          title: {
            en: 'Variable Assignment with LET()',
            vi: 'Khai Báo Biến Tinh Gọn Với Hàm LET()',
          },
          keyIdea: {
            en: 'The LET() function assigns names to intermediate calculation results, eliminating redundant formula evaluations, speeding up workbook calculation by up to 5x, and enhancing formula readability.',
            vi: 'Hàm LET() cho phép gán tên cho các kết quả tính toán trung gian, loại bỏ việc tính toán lặp lại vô ích, tăng tốc độ xử lý của bảng tính lên đến 5 lần và giúp công thức dễ đọc hơn.',
          },
          content: {
            en: 'In traditional Excel formulas, complex expressions (like nested VLOOKUPs, date filters, or aggregate sums) had to be copy-pasted multiple times within an IF or calculation tree. This forced the calculation engine to re-evaluate the identical expression repeatedly. With the `LET()` function, developers declare local variables once (`LET(name1, value1, name2, value2, calculation)`), drastically improving workbook recalculation speed and formula maintainability.',
            vi: 'Trong các công thức Excel truyền thống, các biểu thức phức tạp (như VLOOKUP lồng nhau, bộ lọc ngày tháng hoặc hàm tổng hợp) phải được sao chép nhiều lần trong cây điều kiện IF. Điều này ép bộ tính toán phải thực thi cùng một biểu thức nhiều lần. Với hàm `LET()`, lập trình viên khai báo các biến cục bộ một lần duy nhất (`LET(name1, value1, name2, value2, calculation)`), giúp tăng tốc độ tính toán bảng tính và nâng cao khả năng bảo trì.',
          },
          patternDetails: {
            problem: {
              en: 'Complex financial and analytics formulas evaluate heavy sub-expressions multiple times, creating slow spreadsheet calculations and unreadable formula strings.',
              vi: 'Các công thức tài chính và phân tích phức tạp phải đánh giá các biểu thức con nặng nề nhiều lần, khiến file Excel tính chậm và công thức cực kỳ khó đọc.',
            },
            context: {
              en: 'Enterprise financial models, inventory valuation sheets, and KPI dashboards with large transaction tables.',
              vi: 'Mô hình tài chính doanh nghiệp, bảng tính định giá hàng tồn kho và dashboard KPI với bảng giao dịch lớn.',
            },
            solutionOverview: {
              en: 'Define intermediate calculation names with LET() and perform multi-criteria lookups using Boolean multiplication (criteria1 * criteria2) in XLOOKUP.',
              vi: 'Định nghĩa tên biến trung gian bằng hàm LET() và thực hiện tra cứu nhiều điều kiện bằng phép nhân mảng Boolean (criteria1 * criteria2) trong XLOOKUP.',
            },
            implementation: {
              language: 'excel',
              filename: 'multi_criteria_let_xlookup.txt',
              explanation: {
                en: 'High-performance multi-criteria XLOOKUP wrapped cleanly in LET() variables.',
                vi: 'Công thức XLOOKUP nhiều điều kiện hiệu năng cao được bao bọc gọn gàng trong các biến của LET().',
              },
              code: `=LET(
    targetRegion, "APAC",
    targetYear, 2025,
    targetProduct, "Enterprise Suite",
    
    // Look up revenue matching Region AND Year AND Product simultaneously
    result, XLOOKUP(
        1,
        (Sales[Region] = targetRegion) * (Sales[Year] = targetYear) * (Sales[Product] = targetProduct),
        Sales[Revenue],
        "Not Found",
        0
    ),
    
    IF(ISNUMBER(result), result * 1.05, result)
)`,
            },
            tradeOffs: {
              en: [
                'Compatibility: LET() requires modern Excel (Microsoft 365 or Excel 2021+); legacy Excel 2016/2019 will render #NAME? errors.',
              ],
              vi: [
                'Tương thích phiên bản: LET() yêu cầu Excel hiện đại (Microsoft 365 hoặc Excel 2021+); các bản Excel 2016/2019 cũ sẽ báo lỗi #NAME?.',
              ],
            },
            gotchas: {
              en: [
                'Ensure boolean criteria ranges have identical row dimensions, or Excel will return #VALUE! array mismatch errors.',
              ],
              vi: [
                'Đảm bảo các vùng điều kiện Boolean có cùng số lượng dòng, nếu không Excel sẽ báo lỗi lệch mảng #VALUE!.',
              ],
            },
            whenNotToUse: {
              en: [
                'When building workbooks that must remain compatible with older legacy desktop installations (Excel 2010/2013/2016).',
              ],
              vi: [
                'Khi xây dựng file bảng tính bắt buộc phải tương thích với các máy cài bản Excel cũ (Excel 2010/2013/2016).',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'xfr-ch-2',
      number: 2,
      slug: 'dynamic-array-reporting-recipes',
      title: {
        en: 'Dynamic Array Reporting Recipes',
        vi: 'Công Thức Báo Cáo Động Với Hàm Mảng',
      },
      summary: {
        en: 'Combining FILTER, SORT, and UNIQUE to auto-generate dynamic dashboard summary tables.',
        vi: 'Kết hợp FILTER, SORT và UNIQUE để tự động tạo bảng dữ liệu dashboard cập nhật theo thời gian thực.',
      },
      readTimeMinutes: 15,
      sections: [
        {
          id: 'xfr-2-1',
          title: {
            en: 'Nested FILTER + SORT + UNIQUE Recipe',
            vi: 'Công Thức Lồng FILTER + SORT + UNIQUE',
          },
          keyIdea: {
            en: 'Nesting FILTER(), SORT(), and UNIQUE() creates a self-refreshing dynamic array pipeline that extracts distinct values, applies business filters, and orders results in a single spill formula.',
            vi: 'Lồng ghép các hàm FILTER(), SORT() và UNIQUE() tạo ra đường ống mảng động tự làm mới, giúp trích xuất giá trị duy nhất, lọc theo điều kiện và sắp xếp kết quả chỉ với một ô công thức duy nhất.',
          },
          content: {
            en: 'Prior to Excel Dynamic Arrays, generating unique filtered lists required complex Array formulas (`Ctrl+Shift+Enter`) with `INDEX(..., MATCH(0, COUNTIF(...)))` or manual Pivot Table refreshes. Modern Dynamic Array formulas spill results across adjacent cells automatically. Combining `SORT(UNIQUE(FILTER(...)))` produces automated, live summary lists for dashboards without VBA macros or manual user intervention.',
            vi: 'Trước khi có Dynamic Array trong Excel, việc tạo danh sách duy nhất có điều kiện đòi hỏi công thức mảng phức tạp (`Ctrl+Shift+Enter`) với `INDEX(..., MATCH(0, COUNTIF(...)))` hoặc phải bấm Refresh Pivot Table thủ công. Các hàm mảng động hiện đại tự động tràn kết quả (spill) ra các ô lân cận. Việc kết hợp `SORT(UNIQUE(FILTER(...)))` tạo ra các bảng tổng hợp tự động cập nhật cho dashboard mà không cần code VBA hay thao tác thủ công.',
          },
          patternDetails: {
            problem: {
              en: 'Dashboards require dynamically sorted lists of distinct categories or active customers without manual pivot refreshes or static copy-pasting.',
              vi: 'Dashboard cần danh sách danh mục duy nhất hoặc khách hàng đang hoạt động được sắp xếp tự động mà không cần làm mới Pivot Table hay copy-paste tĩnh.',
            },
            context: {
              en: 'Interactive executive reporting dashboards and automated data consolidation sheets.',
              vi: 'Dashboard báo cáo quản trị tương tác và các bảng tính tổng hợp dữ liệu tự động.',
            },
            solutionOverview: {
              en: 'Compose FILTER to extract matching rows, UNIQUE to deduplicate entries, and SORT to order alphabetically or numerically.',
              vi: 'Kết hợp FILTER để lấy các dòng thỏa mãn, UNIQUE để loại bỏ trùng lặp và SORT để sắp xếp theo bảng chữ cái hoặc số liệu.',
            },
            implementation: {
              language: 'excel',
              filename: 'dynamic_array_dashboard_recipe.txt',
              explanation: {
                en: 'Formula spilling a sorted unique list of high-value active customers.',
                vi: 'Công thức tự động tràn danh sách khách hàng doanh thu cao đã được lọc và sắp xếp.',
              },
              code: `// Formula entered in cell E2 - spills automatically down:
=SORT(
    UNIQUE(
        FILTER(
            Sales[CustomerName],
            (Sales[Status] = "Active") * (Sales[TotalSpend] >= 5000),
            "No Customers Found"
        )
    ),
    1,
    1
)`,
            },
            tradeOffs: {
              en: [
                'Spill blocking: Any non-empty cell in the spill path causes a #SPILL! error until cleared.',
              ],
              vi: [
                'Vướng ô dữ liệu: Bất kỳ ô nào có chứa dữ liệu trên đường tràn sẽ khiến công thức báo lỗi #SPILL! cho đến khi được xóa trống.',
              ],
            },
            gotchas: {
              en: [
                'Reference the spilled range in subsequent formulas using the hash suffix (e.g., =COUNTA(E2#)).',
              ],
              vi: [
                'Tham chiếu toàn bộ vùng mảng tràn trong các công thức tiếp theo bằng cách thêm dấu thăng (ví dụ: =COUNTA(E2#)).',
              ],
            },
            whenNotToUse: {
              en: [
                'Inside legacy Excel tables (ListObject) which do not support dynamic array spilling inside table columns.',
              ],
              vi: [
                'Bên trong các bảng Excel chuẩn (Excel Table / ListObject) vì cột trong bảng chưa hỗ trợ tính năng tràn mảng động.',
              ],
            },
          },
        },
      ],
    },
  ],
};
