import { Book } from '../../types';

export const EXCEL_BEST_PRACTICES_BOOK: Book = {
  id: 'excel-best-practices',
  slug: 'excel-best-practices',
  title: 'Financial Modeling & Excel Best Practices',
  subtitle: {
    en: 'Workbook Formatting, Audit Trail Rules & Calculation Speed',
    vi: 'Chuẩn Thiết Kế File Tài Chính, Kiểm Xuất Audit & Tối Ưu Tốc Độ',
  },
  bookType: 'Best Practices',
  categoryId: 'excel',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Intermediate',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-02-01',
  accentColor: 'from-emerald-700 to-green-900',
  tags: ['Financial Modeling', 'Audit', 'Best Practices', 'Performance'],
  description: {
    en: 'Engineering best practices for professional spreadsheets: color coding standards (Blue inputs, Black formulas), separating Inputs/Calculations/Outputs, and optimizing calculation speed.',
    vi: 'Quy chuẩn xây dựng file Excel chuyên nghiệp: quy tắc phối màu chuẩn (Xanh dương nhập liệu, Đen công thức), tách biệt Input/Calculation/Output và tối ưu tốc độ tính toán.',
  },
  prerequisites: {
    en: ['Experience creating multi-sheet Excel workbooks'],
    vi: ['Kinh nghiệm tạo workbook Excel nhiều sheet'],
  },
  outcomes: {
    en: ['Apply standard financial modeling color-coding conventions', 'Structure modular workbooks with clean audit trails'],
    vi: ['Áp dụng quy ước màu sắc chuẩn trong mô hình tài chính', 'Cấu trúc file mô-đun hóa dễ kiểm tra đối chiếu'],
  },
  chapters: [
    {
      id: 'xbp-ch-1',
      number: 1,
      slug: 'color-coding-and-sheet-structure',
      title: {
        en: 'Color-Coding Conventions & Workbook Architecture',
        vi: 'Quy Ước Phối Màu & Kiến Trúc Workbook Chuyên Nghiệp',
      },
      summary: {
        en: 'Blue text for hardcoded inputs, Black for formulas, Green for inter-sheet links.',
        vi: 'Chữ xanh dương cho dữ liệu thô nhập tay, Chữ đen cho công thức, Xanh lá cho liên kết sheet.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'xbp-1-1',
          title: {
            en: 'Standard Financial Modeling Palette',
            vi: 'Bảng Màu Chuẩn Trong Mô Hình Tài Chính',
          },
          content: {
            en: 'Always use Blue font for manual assumptions, Black font for formulas, and Green font for links pulling from external sheets/files.',
            vi: 'Luôn dùng chữ màu Xanh Dương cho ô nhập tay, chữ màu Đen cho công thức và chữ màu Xanh Lá cho dữ liệu liên kết từ sheet khác.',
          },
          practiceDetails: {
            context: {
              en: 'In complex financial and corporate models, worksheets contain hundreds of interleaved inputs, intermediate calculations, and external links. When formatting is arbitrary or inconsistent, auditors, executives, and teammates cannot safely update assumptions without accidentally overwriting complex formulas.',
              vi: 'Trong các mô hình tài chính và báo cáo doanh nghiệp phức tạp, một trang tính chứa hàng trăm ô nhập số liệu, công thức tính trung gian và liên kết ngoài đan xen. Nếu không tuân thủ quy ước màu sắc, người kiểm toán hoặc đồng nghiệp rất dễ vô tình nhập đè lên các ô chứa công thức cốt lõi.',
            },
            recommendedPractice: {
              en: 'Adhere to universal Wall Street modeling standards: use Blue font (RGB 0, 0, 255 or #0000FF) strictly for hardcoded input assumptions; Black font (RGB 0, 0, 0) strictly for calculations and formulas; Green font (RGB 0, 128, 0) strictly for cross-sheet or external workbook references; and Red font for warning flags or sanity balance checks.',
              vi: 'Tuân thủ nghiêm ngặt quy ước mô hình tài chính chuẩn quốc tế: dùng chữ màu Xanh Dương (#0000FF) cho các giả định nhập tay; chữ màu Đen (#000000) cho toàn bộ các ô chứa công thức tính toán; chữ màu Xanh Lá (#008000) cho liên kết trỏ từ sheet hoặc file khác; và chữ màu Đỏ cho các cảnh báo lệch số kiểm toán.',
            },
            whyItMatters: {
              en: 'Immediate visual auditability allows any analyst to identify exactly which cells are safe to edit in under five seconds, eliminating model corruption and multi-million dollar spreadsheet calculation disasters.',
              vi: 'Tính trực quan giúp bất kỳ chuyên viên hay kiểm toán viên nào cũng nhận biết được ô nào được phép sửa chỉ trong 5 giây, triệt tiêu nguy cơ hỏng công thức và các sai sót bảng tính trị giá hàng triệu đô.',
            },
            goodExample: {
              language: 'excel',
              filename: 'financial_model_architecture.txt',
              explanation: {
                en: 'Structured financial projection with strict color separation and dedicated assumption blocks.',
                vi: 'Cấu trúc mô hình dự báo tài chính với sự phân tách màu sắc và phân khu dữ liệu nhập rõ ràng.',
              },
              code: `Worksheet Architecture:
[1_Assumptions]  -> Contains all Blue raw inputs (Growth Rate, Tax Rate, WACC)
[2_Calculations] -> Contains all Black formulas referencing Assumptions
[3_Executive_Summary] -> Clean output dashboard with Green links pulling from Calculations

Cell Formatting Rules:
Cell B4 (Revenue Growth Rate):   "15.0%"    [Blue Font, Yellow Fill = User Input]
Cell C4 (Tax Rate):              "21.0%"    [Blue Font, Yellow Fill = User Input]
Cell D10 (Net Operating Profit): "=D8*(1-$C$4)" [Black Font = Calculation Engine]
Cell E2 (Consolidated Total):    "=Calculations!H50" [Green Font = Cross-Sheet Link]`,
            },
            riskyExample: {
              language: 'excel',
              filename: 'risky_mixed_spreadsheet.txt',
              explanation: {
                en: 'Hardcoded numbers buried inside formulas with no visual distinction.',
                vi: 'Gõ số cứng chết cứng bên trong công thức mà không có phân biệt màu sắc.',
              },
              code: `<!-- RISKY: Hardcoded rate inside formula is invisible to auditors -->
Cell D10 Formula: =D8 * (1 - 0.21) * 1.15
Problem: If corporate tax rate changes from 21% to 25%, analyst must edit 200 formulas manually!`,
            },
            tradeOffs: {
              en: [
                'Requires discipline during model construction to configure cell styles or use VBA/Office Scripts formatting macros.',
                'Model file size increases slightly with extensive unique cell style definitions.',
              ],
              vi: [
                'Đòi hỏi tính kỷ luật cao khi dựng mô hình để áp dụng Cell Styles hoặc chạy macro định dạng.',
                'Dung lượng file có thể tăng nhẹ nếu tạo quá nhiều định dạng Style tùy biến không đồng nhất.',
              ],
            },
            checklist: {
              en: [
                'All hardcoded assumptions formatted in Blue font (#0000FF).',
                'All calculations formatted in Black font (#000000).',
                'External/inter-sheet links formatted in Green font (#008000).',
                'Zero hardcoded constants buried inside calculation formulas (extract constants to dedicated input cells).',
              ],
              vi: [
                'Tất cả số liệu nhập tay phải để chữ màu Xanh Dương (#0000FF).',
                'Tất cả công thức tính toán phải để chữ màu Đen (#000000).',
                'Liên kết khác sheet phải để chữ màu Xanh Lá (#008000).',
                'Tuyệt đối không gõ số cứng bên trong công thức (hãy đưa hằng số ra ô nhập riêng).',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'xbp-ch-2',
      number: 2,
      slug: 'calculating-speed-optimization',
      title: {
        en: 'Optimizing Workbook Calculation Speed',
        vi: 'Tối Ưu Tốc Độ Tính Toán Của Workbook',
      },
      summary: {
        en: 'Replacing full-column references (A:A) with structured table references.',
        vi: 'Thay thế tham chiếu nguyên cột (A:A) bằng tham chiếu tên bảng Excel Table.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'xbp-2-1',
          title: {
            en: 'Avoid Full-Column References (A:A)',
            vi: 'Tránh Tham Chiếu Cả Cột Full-Column (A:A)',
          },
          content: {
            en: 'Using `SUM(A:A)` forces Excel to evaluate 1,048,576 rows. Use structured table references like `SUM(Sales[Amount])` to constrain calculation scope.',
            vi: 'Truy vấn `SUM(A:A)` ép Excel phải kiểm tra 1.048.576 dòng. Dùng tham chiếu bảng `SUM(Sales[Amount])` để giới hạn đúng phạm vi.',
          },
          practiceDetails: {
            context: {
              en: 'In high-volume operational workbooks with tens of thousands of formulas, performance bottlenecks cause noticeable "Calculating (4 Threads): 35%" freezing upon every keystroke. This lag is primarily driven by full-column references (`A:A`, `B:B`) and volatile functions (`OFFSET`, `INDIRECT`, `TODAY`, `NOW`) that trigger global calculation dependency rebuilds.',
              vi: 'Trong các file Excel vận hành lớn chứa hàng vạn công thức, tình trạng đơ giật "Calculating (4 Threads): 35%" xảy ra liên tục sau mỗi thao tác nhập liệu. Nguyên nhân chính bắt nguồn từ việc lạm dụng tham chiếu nguyên cột (`A:A`, `B:B`) và các hàm biến động (volatile functions như `OFFSET`, `INDIRECT`, `TODAY`) khiến Excel phải tính toán lại toàn bộ cây phụ thuộc.',
            },
            recommendedPractice: {
              en: 'Replace full-column references with Excel Structured Table references (`Sales[Amount]`), bounded dynamic array references (`A2#`), or `INDEX:INDEX` ranges. Replace volatile `OFFSET()` lookups with non-volatile `INDEX()` or `XLOOKUP()`.',
              vi: 'Thay thế tham chiếu nguyên cột bằng tham chiếu bảng cấu trúc (`Sales[Amount]`), tham chiếu vùng mảng tràn (`A2#`) hoặc cặp `INDEX:INDEX`. Thay thế hàm volatile `OFFSET()` bằng các hàm tĩnh tối ưu như `INDEX()` hoặc `XLOOKUP()`.',
            },
            whyItMatters: {
              en: 'Structured table references restrict Excel\'s calculation memory buffer strictly to populated rows (e.g. 5,000 rows instead of 1,048,576 rows), reducing workbook recalculation cycles from 15+ seconds down to under 200 milliseconds.',
              vi: 'Tham chiếu bảng cấu trúc giới hạn vùng tính toán của Excel chính xác theo số dòng thực tế có dữ liệu (ví dụ 5.000 dòng thay vì 1.048.576 dòng trống), giảm thời gian tính toán lại từ hơn 15 giây xuống dưới 200 mili-giây.',
            },
            goodExample: {
              language: 'excel',
              filename: 'high_performance_formulas.txt',
              explanation: {
                en: 'Structured table formulas and non-volatile index ranges that scale effortlessly.',
                vi: 'Công thức tham chiếu bảng cấu trúc và hàm tĩnh INDEX chạy mượt mà trên dữ liệu lớn.',
              },
              code: `1. High-Performance Structured Table Aggregations:
   =SUMIFS(SalesTable[Revenue], SalesTable[Region], "North", SalesTable[Status], "Closed")

2. Non-Volatile Dynamic Range Construction (INDEX instead of OFFSET):
   =SUM(A2:INDEX(A:A, MATCH("ZZZ", A:A)))

3. Dynamic Array Spill Aggregation:
   =SUM(FilteredResults#)`,
            },
            riskyExample: {
              language: 'excel',
              filename: 'slow_volatile_anti_pattern.txt',
              explanation: {
                en: 'Volatile OFFSET and whole-column matrix evaluation slowing workbook execution.',
                vi: 'Hàm volatile OFFSET và quét nguyên cột làm treo đơ bảng tính.',
              },
              code: `<!-- RISKY: Evaluates 1 million rows and recalculates on EVERY cell edit anywhere in workbook -->
=SUMPRODUCT((A:A="North") * (B:B="Closed") * (C:C))

<!-- RISKY: OFFSET is volatile; forces recalculation on ANY click -->
=SUM(OFFSET(A1, 1, 0, COUNTA(A:A)-1, 1))`,
            },
            tradeOffs: {
              en: [
                'Converting raw grids to Excel Tables (`Ctrl+T`) changes keyboard navigation shortcuts for inserting rows.',
                'Structured table formulas require slightly longer formula text but provide unmatched readability.',
              ],
              vi: [
                'Chuyển vùng dữ liệu sang Excel Table (`Ctrl+T`) làm thay đổi một số phím tắt chèn dòng.',
                'Cú pháp tham chiếu bảng dài hơn một chút nhưng mang lại độ tường minh và dễ đọc vượt trội.',
              ],
            },
            checklist: {
              en: [
                'Never use full-column references (A:A) inside SUMIFS, COUNTIFS, or SUMPRODUCT.',
                'Eliminate volatile functions (OFFSET, INDIRECT) in favor of INDEX/XLOOKUP.',
                'Convert raw transactional data ranges into native Excel Tables (Ctrl+T).',
                'Verify calculation speed on large datasets (Target: instant recalculation under 500ms).',
              ],
              vi: [
                'Không dùng tham chiếu cả cột (A:A) trong các hàm SUMIFS, COUNTIFS hoặc SUMPRODUCT.',
                'Loại bỏ các hàm volatile (OFFSET, INDIRECT), thay bằng INDEX/XLOOKUP.',
                'Chuyển đổi toàn bộ bảng dữ liệu giao dịch thô sang Excel Table (Ctrl+T).',
                'Kiểm tra tốc độ tính toán trên tập dữ liệu lớn (Mục tiêu: tính toán lại tức thì dưới 500ms).',
              ],
            },
          },
        },
      ],
    },
  ],
};
