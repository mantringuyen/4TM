import { Book } from '../../types';

export const EXCEL_PRACTICAL_GUIDE_BOOK: Book = {
  id: 'excel-practical-guide',
  slug: 'excel-practical-guide',
  title: 'Excel Practical Guides: Workflows & Automation',
  subtitle: {
    en: 'Dynamic Dependent Dropdowns, Power Query Transformation & Dashboards',
    vi: 'Danh Sách Thả Phụ Thuộc Động, Xử Lý Dữ Liệu Power Query & Dashboard',
  },
  bookType: 'Practical Guides',
  categoryId: 'excel',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Practical / Applied',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-01-20',
  accentColor: 'from-teal-600 to-emerald-800',
  tags: ['Data Validation', 'FILTER', 'Dropdowns', 'Practical Guides'],
  description: {
    en: 'Hands-on practical guides for Excel: creating dynamic two-tier dependent dropdowns using XLOOKUP/INDIRECT, and building automated reporting views with FILTER() and SORT().',
    vi: 'Hướng dẫn thực hành các kỹ thuật Excel thực tế: tạo danh sách thả Dropdown phụ thuộc 2 cấp bằng XLOOKUP/INDIRECT và xây dựng bảng báo cáo động với FILTER() và SORT().',
  },
  prerequisites: {
    en: ['Basic knowledge of Excel tables and functions'],
    vi: ['Kiến thức cơ bản về bảng và hàm Excel'],
  },
  outcomes: {
    en: ['Construct cascaded multi-level dependent dropdown validation lists', 'Build interactive real-time dashboard filters with dynamic arrays'],
    vi: ['Tạo danh sách thả Dropdown phụ thuộc đa cấp tự động', 'Xây dựng bộ lọc báo cáo tương tác tức thì bằng công thức mảng động'],
  },
  chapters: [
    {
      id: 'xpg-ch-1',
      number: 1,
      slug: 'dependent-dropdown-lists',
      title: {
        en: 'Dynamic Dependent (Cascading) Dropdown Lists',
        vi: 'Tạo Danh Sách Thả Phụ Thuộc Đa Cấp Tự Động',
      },
      summary: {
        en: 'Using named ranges and XLOOKUP to build category-to-subcategory dropdown cascades.',
        vi: 'Sử dụng Name Manager và XLOOKUP để tạo dropdown phân cấp ngành hàng tự động.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'xpg-1-1',
          title: {
            en: 'Setting Up Data Validation Dependent Dropdowns',
            vi: 'Các Bước Thiết Lập Dropdown Phụ Thuộc Bằng Data Validation',
          },
          content: {
            en: 'Create a primary dropdown for categories, then use `=XLOOKUP(A2, Categories, SubcategoriesRange)` in Data Validation for the dependent secondary list.',
            vi: 'Tạo dropdown cấp 1 chứa danh mục chính, sau đó dùng `=XLOOKUP(A2, Categories, SubcategoriesRange)` trong Data Validation cho dropdown cấp 2.',
          },
          guideDetails: {
            goal: {
              en: 'Build a rock-solid, two-tier cascading dropdown where selecting a Department in Cell A2 automatically populates Cell B2 with only the Employees or Subcategories belonging to that department.',
              vi: 'Xây dựng danh sách thả dropdown 2 cấp mượt mà: khi chọn Phòng ban ở ô A2, ô B2 sẽ tự động lọc và chỉ hiển thị đúng danh sách Nhân viên thuộc phòng ban đó.',
            },
            prerequisites: {
              en: ['Excel 365 or Excel 2021 with dynamic array support', 'Basic familiarity with Data Validation (Alt+A+V+V)'],
              vi: ['Phiên bản Excel 365 hoặc Excel 2021 hỗ trợ mảng động', 'Kỹ năng mở hộp thoại Data Validation (Alt+A+V+V)'],
            },
            preparation: {
              en: 'Structure your reference lookup table with Category headers in Row 1 (e.g. Sales, Marketing, IT) and their respective sub-items listed directly beneath each header.',
              vi: 'Tổ chức bảng dữ liệu nguồn với tiêu đề Phân loại ở dòng 1 (ví dụ Sales, Marketing, IT) và các mục con nằm dọc ngay dưới từng cột tiêu đề.',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Create Primary Level 1 Dropdown',
                  vi: 'Tạo Danh Sách Thả Cấp 1 (Phòng Ban)',
                },
                instruction: {
                  en: 'Select Cell A2 -> Open Data Ribbon -> Data Validation -> Choose "List" -> Set Source to the horizontal category headers `=Lookups!$A$1:$C$1`.',
                  vi: 'Chọn ô A2 -> Mở tab Data -> Data Validation -> Chọn "List" trong mục Allow -> Đặt Source trỏ vào hàng tiêu đề `=Lookups!$A$1:$C$1`.',
                },
                codeSnippet: {
                  language: 'excel',
                  explanation: {
                    en: 'Primary list formula referencing headers.',
                    vi: 'Công thức Data Validation cấp 1 trỏ tới tiêu đề.',
                  },
                  code: `=Lookups!$A$1:$C$1`,
                },
                expectedOutput: {
                  en: 'Cell A2 displays a clickable arrow with options: Sales, Marketing, Engineering.',
                  vi: 'Ô A2 hiển thị mũi tên chọn nhanh: Sales, Marketing, Engineering.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Construct Dynamic Spill Formula for Level 2 Options',
                  vi: 'Thiết Lập Vùng Tràn Lựa Chọn Cấp 2 Bằng XLOOKUP',
                },
                instruction: {
                  en: 'In an empty helper column on the lookup sheet (e.g., cell `Lookups!$E$2`), enter the dynamic spill formula to retrieve the matching column based on selection in A2.',
                  vi: 'Tại một cột phụ trên sheet dữ liệu nguồn (ví dụ ô `Lookups!$E$2`), gõ công thức mảng tràn để tự động trích xuất cột tương ứng với ô A2.',
                },
                codeSnippet: {
                  language: 'excel',
                  explanation: {
                    en: 'Dynamic column extraction using XLOOKUP without volatile INDIRECT.',
                    vi: 'Trích xuất cột động bằng XLOOKUP không bị lag như hàm INDIRECT.',
                  },
                  code: `=XLOOKUP(MainSheet!$A$2, Lookups!$A$1:$C$1, Lookups!$A$2:$C$20)`,
                },
                expectedOutput: {
                  en: 'Column E dynamically spills the exact list of employees matching the chosen department.',
                  vi: 'Cột E tự động tràn danh sách nhân viên tương ứng với phòng ban được chọn.',
                },
              },
              {
                stepNumber: 3,
                title: {
                  en: 'Link Dependent Data Validation with Spill Operator (#)',
                  vi: 'Liên Kết Data Validation Cấp 2 Với Ký Tự Tràn (#)',
                },
                instruction: {
                  en: 'Select dependent cell B2 -> Open Data Validation -> Choose "List" -> Enter the spilled range source `=Lookups!$E$2#`.',
                  vi: 'Chọn ô phụ thuộc B2 -> Mở Data Validation -> Chọn "List" -> Nhập công thức vùng tràn `=Lookups!$E$2#`.',
                },
                codeSnippet: {
                  language: 'excel',
                  explanation: {
                    en: 'Spill reference syntax for dynamic dropdowns.',
                    vi: 'Cú pháp tham chiếu vùng tràn cho danh sách thả.',
                  },
                  code: `=Lookups!$E$2#`,
                },
                expectedOutput: {
                  en: 'Cell B2 automatically adjusts its dropdown list whenever the selection in A2 changes.',
                  vi: 'Ô B2 tự động co giãn danh sách thả phù hợp mỗi khi ô A2 thay đổi giá trị.',
                },
              },
            ],
            verification: {
              en: 'Change the value in A2 from "Sales" to "IT". Click the dropdown arrow on B2; verify that only IT personnel appear without empty blanks at the bottom.',
              vi: 'Thay đổi giá trị ở ô A2 từ "Sales" sang "IT". Bấm vào mũi tên ở ô B2 và xác nhận chỉ có nhân viên IT xuất hiện, không có khoảng trống thừa.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'The error "The Source currently evaluates to an error" appears when setting `=Lookups!$E$2#`.',
                  vi: 'Báo lỗi "The Source currently evaluates to an error" khi nhập `=Lookups!$E$2#`.',
                },
                cause: {
                  en: 'Cell A2 was currently blank when setting the validation, causing XLOOKUP to return `#N/A`.',
                  vi: 'Ô A2 đang bị để trống lúc thiết lập khiến hàm XLOOKUP trả về `#N/A`.',
                },
                fix: {
                  en: 'Pick a valid option in A2 first, or wrap XLOOKUP with `IF(A2="","",...)` and click "Yes" to proceed.',
                  vi: 'Hãy chọn sẵn một giá trị bất kỳ ở ô A2 trước, hoặc lồng hàm `IF(A2="","",...)` rồi bấm "Yes" để tiếp tục.',
                },
              },
            ],
            checklist: {
              en: [
                'Primary category headers defined in row 1.',
                'Dynamic helper spill formula uses modern XLOOKUP instead of volatile INDIRECT.',
                'Secondary dropdown references the anchor cell with spill sign (#).',
                'Verified seamless switching between all primary options.',
              ],
              vi: [
                'Tiêu đề phân loại cấp 1 được xếp ngay ngắn ở hàng 1.',
                'Công thức phụ trợ dùng XLOOKUP hiện đại thay vì hàm volatile INDIRECT.',
                'Dropdown cấp 2 tham chiếu ô neo kèm dấu thăng (#).',
                'Đã kiểm tra chuyển đổi mượt mà giữa tất cả các lựa chọn cấp 1.',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'xpg-ch-2',
      number: 2,
      slug: 'dynamic-array-dashboard-filters',
      title: {
        en: 'Dynamic Reporting with FILTER() and SORT()',
        vi: 'Xây Dựng Báo Cáo Động Bằng Hàm FILTER() & SORT()',
      },
      summary: {
        en: 'Creating live interactive dashboard tables driven by cell criteria without VBA macros.',
        vi: 'Tạo bảng báo cáo lọc tương tác thời gian thực theo ô điều kiện không cần viết mã VBA.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'xpg-2-1',
          title: {
            en: 'Dynamic Filtering with the FILTER() Function',
            vi: 'Lọc Dữ Liệu Tự Động Bằng Hàm FILTER() Kết Hợp Điều Kiện Đa Tầng',
          },
          content: {
            en: 'Use `=FILTER(DataRange, (Region=E1) * (Amount>=E2), "No records")` to output filtered records in real-time.',
            vi: 'Sử dụng `=FILTER(DataRange, (Region=E1) * (Amount>=E2), "Không tìm thấy")` để trích xuất tự động dữ liệu thỏa mãn nhiều điều kiện.',
          },
          guideDetails: {
            goal: {
              en: 'Build an interactive live search reporting dashboard that automatically filters and sorts raw transactions based on user-selected dropdown filters (Region and Status).',
              vi: 'Xây dựng trang báo cáo tìm kiếm tự động lọc và sắp xếp toàn bộ bảng giao dịch dựa trên tiêu chí người dùng chọn từ danh sách thả (Khu vực và Trạng thái).',
            },
            prerequisites: {
              en: ['Raw transactional data formatted as an Excel Table named `OrdersTable`', 'Excel 365 or Excel 2021+'],
              vi: ['Bảng giao dịch thô đã chuyển sang Excel Table với tên `OrdersTable`', 'Phiên bản Excel 365 hoặc 2021+'],
            },
            preparation: {
              en: 'Designate cells G1 as Region Filter (e.g. "North" or "All") and G2 as Status Filter (e.g. "Completed" or "All").',
              vi: 'Quy hoạch ô G1 làm ô chọn Khu vực (ví dụ "North" hoặc "All") và ô G2 làm ô chọn Trạng thái (ví dụ "Completed" hoặc "All").',
            },
            steps: [
              {
                stepNumber: 1,
                title: {
                  en: 'Write Multi-Condition Boolean Filter Formula',
                  vi: 'Viết Công Thức Lọc Nhiều Điều Kiện Logic Boolean',
                },
                instruction: {
                  en: 'In cell `I4`, enter the master FILTER formula utilizing boolean multiplication (`*`) for AND logic with optional "All" bypasses.',
                  vi: 'Tại ô `I4`, gõ công thức FILTER tổng hợp sử dụng phép nhân logic boolean (`*`) cho điều kiện AND và hỗ trợ tùy chọn "All".',
                },
                codeSnippet: {
                  language: 'excel',
                  explanation: {
                    en: 'Production multi-condition dynamic filter with empty fallback.',
                    vi: 'Công thức lọc nhiều điều kiện kết hợp thông báo khi không có dữ liệu.',
                  },
                  code: `=FILTER(
  OrdersTable,
  ( (OrdersTable[Region] = $G$1) + ($G$1 = "All") ) *
  ( (OrdersTable[Status] = $G$2) + ($G$2 = "All") ),
  "No matching records found"
)`,
                },
                expectedOutput: {
                  en: 'A live table spills across columns I to M displaying only matching order rows.',
                  vi: 'Bảng dữ liệu tự động tràn từ cột I đến M chỉ hiển thị các đơn hàng thỏa mãn.',
                },
              },
              {
                stepNumber: 2,
                title: {
                  en: 'Nest with SORT() for Ordered Presentation',
                  vi: 'Lồng Thêm Hàm SORT() Để Sắp Xếp Theo Doanh Thu',
                },
                instruction: {
                  en: 'Wrap the FILTER function inside `SORT()` to sort output descending by Revenue (Column 4).',
                  vi: 'Bọc hàm FILTER bên trong hàm `SORT()` để sắp xếp kết quả giảm dần theo Doanh thu (Cột thứ 4).',
                },
                codeSnippet: {
                  language: 'excel',
                  explanation: {
                    en: 'SORT wrapped around FILTER for automated high-to-low ordering.',
                    vi: 'Lồng SORT vào FILTER để tự động xếp thứ tự từ cao xuống thấp.',
                  },
                  code: `=SORT(
  FILTER(
    OrdersTable,
    ( (OrdersTable[Region] = $G$1) + ($G$1 = "All") ) *
    ( (OrdersTable[Status] = $G$2) + ($G$2 = "All") ),
    "No matching records"
  ),
  4,
  -1
)`,
                },
                expectedOutput: {
                  en: 'Matching orders appear ordered from highest revenue to lowest revenue.',
                  vi: 'Các đơn hàng xuất hiện theo thứ tự doanh thu từ cao nhất đến thấp nhất.',
                },
              },
            ],
            verification: {
              en: 'Select "North" in G1 and "Completed" in G2. Check that the spilled table immediately updates and displays only completed northern transactions in descending order.',
              vi: 'Chọn "North" ở ô G1 và "Completed" ở ô G2. Xác nhận bảng kết quả lập tức cập nhật chỉ hiển thị đơn miền Bắc đã hoàn tất theo thứ tự giảm dần.',
            },
            troubleshooting: [
              {
                symptom: {
                  en: 'Formula returns `#CALC!` instead of matching rows.',
                  vi: 'Công thức trả về mã lỗi `#CALC!` thay vì hiển thị dữ liệu.',
                },
                cause: {
                  en: 'No rows matched the criteria and the `[if_empty]` parameter was omitted.',
                  vi: 'Không có dòng nào thỏa mãn điều kiện và bạn quên khai báo tham số thứ 3 `[if_empty]`.',
                },
                fix: {
                  en: 'Always provide the 3rd argument in FILTER: `FILTER(..., "No records found")`.',
                  vi: 'Luôn khai báo tham số thứ 3 trong hàm FILTER: `FILTER(..., "Không tìm thấy dữ liệu")`.',
                },
              },
            ],
            checklist: {
              en: [
                'Structured table used as raw data source.',
                'Boolean arithmetic `*` used for AND logic, `+` for OR logic.',
                'Empty fallback string provided to avoid #CALC! errors.',
                'Dynamic sorting applied via outer SORT() wrapper.',
              ],
              vi: [
                'Dữ liệu nguồn đã được chuyển thành bảng Excel Table chuẩn.',
                'Dùng phép nhân `*` cho logic VÀ (AND), phép cộng `+` cho logic HOẶC (OR).',
                'Khai báo đầy đủ chuỗi thông báo rỗng để tránh lỗi #CALC!.',
                'Đã lồng hàm SORT() bên ngoài để tự động sắp xếp kết quả.',
              ],
            },
          },
        },
      ],
    },
  ],
};
