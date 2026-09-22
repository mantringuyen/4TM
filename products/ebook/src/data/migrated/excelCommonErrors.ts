import { Book } from '../../types';

export const EXCEL_COMMON_ERRORS_BOOK: Book = {
  id: 'excel-common-errors',
  slug: 'excel-common-errors',
  title: 'Excel Common Errors & Debugging',
  subtitle: {
    en: 'Troubleshooting #N/A, #REF!, #VALUE!, #SPILL! & Calculation Errors',
    vi: 'Sửa Lỗi #N/A, #REF!, #VALUE!, #SPILL! & Lỗi Sai Số Bảng Tính',
  },
  bookType: 'Common Errors',
  categoryId: 'excel',
  subjectId: 'analytics',
  author: '4TM Technical Board',
  role: 'Core Engineering Group',
  level: 'Foundational',
  estimatedReadTime: '25 mins',
  chaptersCount: 2,
  publishedDate: '2025-01-22',
  accentColor: 'from-amber-600 to-rose-800',
  tags: ['Excel Errors', '#SPILL!', '#N/A', 'Debugging', 'Common Errors'],
  description: {
    en: 'Deconstructing common Excel spreadsheet errors: #SPILL! blocking elements, #REF! deleted cell references, numbers stored as text formatting bugs, and circular references.',
    vi: 'Khắc phục các lỗi Excel thường gặp: #SPILL! do vướng ô dữ liệu, #REF! do xóa ô tham chiếu, số lưu dưới dạng text và lỗi tham chiếu vòng (Circular Reference).',
  },
  prerequisites: {
    en: ['Basic formula editing skills'],
    vi: ['Kỹ năng sửa công thức Excel cơ bản'],
  },
  outcomes: {
    en: ['Diagnose and clear #SPILL! range blockages', 'Convert numbers stored as text back to numeric values safely'],
    vi: ['Phát hiện và dọn dẹp vật cản gây lỗi #SPILL!', 'Chuyển đổi số lưu dạng text về đúng định dạng số tính toán'],
  },
  chapters: [
    {
      id: 'xce-ch-1',
      number: 1,
      slug: 'spill-and-ref-errors',
      title: {
        en: 'Fixing #SPILL! & #REF! Errors',
        vi: 'Sửa Lỗi #SPILL! & #REF! Trong Công Thức',
      },
      summary: {
        en: 'Identifying blocking non-empty cells in spilled ranges and missing worksheet targets.',
        vi: 'Xác định các ô có dữ liệu cản trở vùng tràn và tham chiếu bị mất.',
      },
      readTimeMinutes: 12,
      sections: [
        {
          id: 'xce-1-1',
          title: {
            en: 'Unblocking #SPILL! Error Traps',
            vi: 'Cách Xử Lý Lỗi #SPILL! Khi Bị Vướng Ô Dữ Liệu',
          },
          content: {
            en: 'Clicking the float indicator of a `#SPILL!` error highlights the exact target range. Clear all content or formatted cells inside that highlighted boundary.',
            vi: 'Bấm vào biểu tượng báo lỗi `#SPILL!` sẽ hiển thị viền nhấp nháy của vùng tràn. Hãy xóa sạch dữ liệu hoặc định dạng rác trong khung đó.',
          },
          errorDetails: {
            errorSignature: {
              en: '#SPILL! — Spill range isn\'t blank or is obstructed by merged cells / existing data.',
              vi: '#SPILL! — Vùng tràn công thức mảng bị vướng dữ liệu cũ, khoảng trắng hoặc ô bị gộp (Merge).',
            },
            symptoms: {
              en: [
                'Cell returns `#SPILL!` immediately after pressing Enter on dynamic array formulas (e.g. `FILTER()`, `UNIQUE()`, `SORT()`, or `#` spill references).',
                'A dashed or highlighted bounding box appears on the grid indicating the intended output dimensions.',
                'The formula is completely valid and works when tested in an empty worksheet.',
              ],
              vi: [
                'Ô trả về lỗi `#SPILL!` ngay khi bấm Enter trên công thức mảng động (như `FILTER()`, `UNIQUE()`, `SORT()` hoặc dấu thăng `#`).',
                'Một khung viền đứt đoạn bao quanh các ô liền kề đánh dấu kích thước vùng tràn mà công thức cần.',
                'Cú pháp công thức hoàn toàn chuẩn và chạy bình thường nếu copy sang một sheet trắng.',
              ],
            },
            minimalReproduction: {
              language: 'excel',
              filename: 'spill_error_reproduction.txt',
              explanation: {
                en: 'A dynamic array formula attempting to output 5 rows when cell C4 contains leftover text.',
                vi: 'Công thức mảng động trả về 5 dòng nhưng ô C4 lại chứa sẵn dữ liệu cũ.',
              },
              code: `Cell C1 Formula: =UNIQUE(A2:A10)
Expected Output: C1:C5 (5 unique regions)

Grid State:
C1: #SPILL!
C2: [Empty]
C3: [Empty]
C4: "Old Manual Note"  <-- OBSTRUCTION BLOCKING THE SPILL
C5: [Empty]`,
            },
            whyItHappens: {
              en: 'Dynamic Array formulas in Excel calculate results with variable output dimensions. If even a single cell inside the calculated output boundary contains data, a blank space character (`" "`), an invisible formula, or merged cells, Excel refuses to overwrite it and throws `#SPILL!`. Additionally, dynamic arrays cannot spill into native Excel Tables (`ListObject`).',
              vi: 'Các hàm mảng động trong Excel tự động mở rộng vùng kết quả theo kích thước dữ liệu. Nếu chỉ cần 1 ô bất kỳ nằm trong vùng kết quả chứa chữ, số, dấu cách vô hình (`" "`), công thức cũ hay ô bị gộp Merge Cells, Excel sẽ không tự ý ghi đè và báo lỗi `#SPILL!`. Ngoài ra, công thức mảng động không thể tự tràn vùng bên trong cấu trúc bảng Excel Table (`ListObject`).',
            },
            diagnosisSteps: {
              en: [
                'Click the cell containing the `#SPILL!` error and look for the thin dashed border outlining the intended spill range.',
                'Click the yellow warning icon dropdown and choose "Select Obstructing Cells" to jump directly to the conflicting cell.',
                'Check if the intended output area contains Merged Cells or sits inside an Excel Table (`Ctrl+T`).',
              ],
              vi: [
                'Bấm vào ô chứa lỗi `#SPILL!` và quan sát khung viền nét đứt chỉ định vùng tràn.',
                'Bấm vào biểu tượng cảnh báo màu vàng và chọn "Select Obstructing Cells" để nhảy thẳng đến ô gây tắc nghẽn.',
                'Kiểm tra xem vùng tràn có chứa ô Merge hay đang nằm trong bảng cấu trúc Excel Table (`Ctrl+T`) không.',
              ],
            },
            correctFix: {
              language: 'excel',
              filename: 'resolved_spill_pattern.txt',
              explanation: {
                en: 'Clear the obstructing range or convert the table to a normal range before running dynamic arrays.',
                vi: 'Xóa sạch vùng cản trở hoặc chuyển Table thành Range thông thường trước khi chạy mảng động.',
              },
              code: `1. Select the highlighted obstructing range and press Delete.
2. Unmerge any merged cells in the spill corridor (Home -> Merge & Center -> Unmerge).
3. If formula is inside an Excel Table, place the formula outside the table in standard grid cells:
   
   Cell F2 (Outside Table): =FILTER(SalesTable[Amount], SalesTable[Region]="North")`,
            },
            fixExplanation: {
              en: 'Deleting leftover text clears the corridor, allowing the dynamic calculation engine to populate cells F2:F20 seamlessly. Placing array formulas on standard grid sheets ensures zero table-boundary conflicts.',
              vi: 'Xóa các ô rác giúp giải phóng đường tràn, cho phép engine tính toán tự động điền dữ liệu từ F2 đến F20. Đặt công thức mảng ngoài ô bảng Excel Table đảm bảo không bị xung đột giới hạn cấu trúc.',
            },
            preventionRules: {
              en: [
                'Always leave generous empty space below and to the right of dynamic array formulas.',
                'Never use Merged Cells on analytical worksheets; use "Center Across Selection" instead.',
                'Do not write dynamic array formulas inside formatted Excel Tables (ListObjects).',
              ],
              vi: [
                'Luôn chừa sẵn khoảng trống bên dưới và bên phải các công thức mảng động.',
                'Tuyệt đối không dùng tính năng Merge Cells trong bảng tính; hãy dùng "Center Across Selection".',
                'Không đặt công thức mảng động bên trong các bảng Excel Table (ListObject).',
              ],
            },
          },
        },
      ],
    },
    {
      id: 'xce-ch-2',
      number: 2,
      slug: 'numbers-as-text-and-circular-refs',
      title: {
        en: 'Numbers Stored as Text & Circular References',
        vi: 'Số Lưu Dạng Text & Lỗi Tham Chiếu Vòng Circular',
      },
      summary: {
        en: 'Why SUM() returns 0 on text numbers and resolving infinite formula loops.',
        vi: 'Tại sao SUM() trả về 0 khi gặp số dạng text và cách gỡ lặp công thức.',
      },
      readTimeMinutes: 13,
      sections: [
        {
          id: 'xce-2-1',
          title: {
            en: 'Fixing SUM() Returning 0 on Text Numbers',
            vi: 'Khắc Phục Lỗi Hàm SUM() Trả Về 0 Do Số Dạng Text',
          },
          content: {
            en: 'The `SUM()` function ignores text strings completely. Use `VALUE()` or multiply range by 1 (`Range * 1`) to force numerical conversion.',
            vi: 'Hàm `SUM()` bỏ qua hoàn toàn ô text. Dùng hàm `VALUE()` hoặc nhân vùng dữ liệu với 1 (`Range * 1`) để ép về dạng số.',
          },
          errorDetails: {
            errorSignature: {
              en: 'SUM() = 0 or inaccurate subtotals due to numbers formatted as Text (green error triangles or left-aligned digits).',
              vi: 'SUM() = 0 hoặc tổng sai lệch do dữ liệu số bị lưu dưới dạng Text (có tam giác xanh ở góc ô hoặc số bị căn lề trái).',
            },
            symptoms: {
              en: [
                'Formulas like `=SUM(B2:B10)` return `0`, `0.00`, or an unexpectedly small number despite visible digits in cells.',
                'Numbers align to the left side of the cell by default instead of the right side.',
                'Green triangle warning flags appear in cell corners with "Number Stored as Text".',
              ],
              vi: [
                'Công thức `=SUM(B2:B10)` trả về `0`, `0.00` hoặc kết quả thiếu hụt dù mắt thường vẫn thấy các con số rõ ràng.',
                'Các con số tự động bị căn lề bên trái của ô thay vì căn bên phải theo mặc định số học.',
                'Xuất hiện tam giác cảnh báo màu xanh lá ở góc trái kèm thông báo "Number Stored as Text".',
              ],
            },
            minimalReproduction: {
              language: 'excel',
              filename: 'text_number_bug.txt',
              explanation: {
                en: 'Data exported from ERP systems where numbers are enclosed in text strings or preceded by apostrophes.',
                vi: 'Dữ liệu xuất từ phần mềm ERP bị gắn thêm ký tự nháy đơn hoặc định dạng chuỗi.',
              },
              code: `Cell B2: '1500  (Text format)
Cell B3: '2500  (Text format)
Cell B4: '3000  (Text format)

Formula in B5: =SUM(B2:B4)
Output in B5:  0   <-- SUM ignores non-numeric text values!`,
            },
            whyItHappens: {
              en: 'In Excel\'s calculation specification, arithmetic operators (`+`, `*`, `-`) coerce numeric strings into numbers automatically (e.g. `="10" + "20"` returns `30`). However, aggregation functions (`SUM`, `AVERAGE`, `MIN`, `MAX`) strictly bypass all string values to prevent errors on headers. When ERP or CSV exports format numbers with text headers, `SUM()` skips every text cell without warning.',
              vi: 'Trong nguyên lý tính toán của Excel, các toán tử số học (`+`, `*`, `-`) sẽ tự động ép kiểu chuỗi số thành số (ví dụ `="10" + "20"` trả về `30`). Tuy nhiên, các hàm tổng hợp (`SUM`, `AVERAGE`, `MIN`, `MAX`) mặc định sẽ bỏ qua tất cả giá trị dạng văn bản để tránh lỗi khi quét phải tiêu đề. Do đó, khi dữ liệu xuất từ ERP bị lưu dạng text, hàm `SUM()` sẽ ngầm bỏ qua toàn bộ mà không báo lỗi.',
            },
            diagnosisSteps: {
              en: [
                'Check cell alignment without custom formatting: numbers align right, text aligns left.',
                'Test with formula `=ISNUMBER(B2)`: returns FALSE if the value is text.',
                'Test with formula `=ISTEXT(B2)`: returns TRUE on string representations.',
              ],
              vi: [
                'Quan sát căn lề tự nhiên của ô: số chuẩn căn phải, chữ dạng text căn trái.',
                'Kiểm tra bằng hàm `=ISNUMBER(B2)`: trả về FALSE nếu ô đó là dạng văn bản.',
                'Kiểm tra bằng hàm `=ISTEXT(B2)`: trả về TRUE chứng minh ô đang bị lưu dạng chuỗi.',
              ],
            },
            correctFix: {
              language: 'excel',
              filename: 'convert_text_to_numbers.txt',
              explanation: {
                en: 'Multiple reliable conversion techniques for modern Excel (Excel 365, 2021, and Web).',
                vi: 'Các phương pháp chuyển đổi số dạng text sang số chuẩn cho Excel 365, 2021 và bản Web.',
              },
              code: `Method 1 (Paste Special Multiply - Fast bulk conversion for thousands of rows):
1. Type number 1 in an empty cell and press Ctrl+C to copy.
2. Select the range of text numbers (B2:B1000).
3. Press Ctrl+Alt+V (Paste Special) -> Select "Multiply" -> Click OK.

Method 2 (Dynamic Array Formula in Excel 365 / 2021):
=SUM(B2:B10 * 1)   or   =SUM(--B2:B10)

Method 3 (Text to Columns Wizard):
1. Select column B -> Data ribbon tab -> "Text to Columns".
2. Click Finish directly without changing delimiters.`,
            },
            fixExplanation: {
              en: 'Multiplying by 1 or applying unary double-minus (`--`) forces the calculation engine to evaluate the string mathematically, transforming text representations into IEEE floating-point numbers recognized by `SUM()`.',
              vi: 'Nhân với 1 hoặc dùng hai dấu trừ liên tiếp (`--`) ép engine tính toán phải biến đổi chuỗi ký tự thành số thực dạng float, giúp hàm `SUM()` nhận diện và cộng dồn chính xác.',
            },
            preventionRules: {
              en: [
                'Ingest external CSV and ERP data through Power Query where column datatypes can be explicitly cast to Decimal/Currency upon import.',
                'Avoid applying the text format `@` to numerical input columns.',
                'Use unary double-minus (`--`) in array formulas whenever referencing external raw text columns.',
              ],
              vi: [
                'Nạp dữ liệu CSV và ERP qua Power Query để chủ động định kiểu Decimal/Currency ngay từ khâu import.',
                'Tránh gán định dạng Text `@` cho các cột chứa số tiền, số lượng.',
                'Dùng toán tử `--` trong các công thức mảng khi phải tham chiếu cột dữ liệu thô chưa chuẩn hóa.',
              ],
            },
          },
        },
      ],
    },
  ],
};
