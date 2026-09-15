import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const intMod01Dir = path.join(process.cwd(), 'src/data/excel/intermediate/module01');
fs.mkdirSync(intMod01Dir, { recursive: true });

function saveLesson(filename: string, varName: string, lesson: Lesson) {
  const code = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lesson, null, 2)};\nexport default ${varName};\n`;
  fs.writeFileSync(path.join(intMod01Dir, filename), code, 'utf8');
  console.log(`Saved ${filename} (${lesson.id})`);
}

// =========================================================================
// LESSON 11: Classic Lookup & Reference (VLOOKUP, HLOOKUP, INDEX, MATCH)
// Preserved ID: excel_lesson_6
// =========================================================================
export const lesson11: Lesson = {
  id: 'excel_lesson_6',
  order: 11,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_lookups',
  title: {
    en: 'Classic Lookup & Reference: VLOOKUP, HLOOKUP, INDEX & MATCH',
    vi: 'Tra Cứu & Tham Chiếu Cổ Điển: VLOOKUP, HLOOKUP, INDEX & MATCH'
  },
  summary: {
    en: 'Master foundational table relational lookups: exact vs approximate VLOOKUP, horizontal HLOOKUP, and the indestructible INDEX/MATCH duo that overcomes left-lookup limitations and column insertion fragility.',
    vi: 'Làm chủ các phép tra cứu quan hệ bảng nền tảng: VLOOKUP chính xác vs xấp xỉ, HLOOKUP theo chiều ngang và bộ đôi bất khả chiến bại INDEX/MATCH khắc phục giới hạn tra cứu sang trái và lỗi khi chèn thêm cột.'
  },
  learn: {
    introduction: {
      en: 'Relational data lookup is the cornerstone of spreadsheet architecture. When an order ID or employee number is entered, lookup formulas search master dimension tables to retrieve product descriptions, unit prices, or manager email addresses without manual copy-pasting.',
      vi: 'Tra cứu dữ liệu quan hệ là nền tảng của kiến trúc bảng tính. Khi nhập mã đơn hàng hoặc mã nhân viên, các hàm tra cứu sẽ tìm kiếm trên các bảng danh mục chính để lấy mô tả sản phẩm, đơn giá hoặc địa chỉ email quản lý mà không cần sao chép thủ công.'
    },
    conceptExplanation: {
      en: `### 1. VLOOKUP Mechanics & Limitations
- **Syntax**: \`=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])\`
- **Exact Match**: Always pass \`FALSE\` (or \`0\`) as the 4th argument.
- **VLOOKUP Limitations**:
  1. Lookup value MUST be in the far-left column (cannot look left).
  2. Fragile: Inserting a new column between columns 1 and 3 breaks hardcoded \`col_index_num\`.
  3. Slow on large workbooks because it indexes unnecessary columns.

### 2. The INDEX & MATCH Power Couple
- **\`=MATCH(lookup_value, lookup_array, [match_type])\`**: Searches a 1D vector and returns the numeric position index (1-based). Use \`0\` for exact match.
- **\`=INDEX(array, row_num, [col_num])\`**: Returns the value at the intersection of specified row and column coordinates.
- **Combined Pattern**:
  \`=INDEX(Return_Range, MATCH(lookup_value, Lookup_Range, 0))\`
  - Can look left, right, up, or down.
  - Immune to column insertions and deletions!
  - 2D Matrix Lookups: \`=INDEX(Grid, MATCH(RowVal, RowHdr, 0), MATCH(ColVal, ColHdr, 0))\``,
      vi: `### 1. Cơ Chế & Giới Hạn Của VLOOKUP
- **Cú pháp**: \`=VLOOKUP(gia_tri_tim, bang_du_lieu, so_thu_tu_cot, [kieu_tim])\`
- **Khớp chính xác**: Luôn truyền \`FALSE\` (hoặc \`0\`) vào đối số thứ 4.
- **Các giới hạn của VLOOKUP**:
  1. Cột chứa giá trị tìm kiếm PHẢI nằm ở cột tận cùng bên trái (không thể tra cứu sang bên trái).
  2. Dễ bị hỏng: Khi chèn thêm cột mới vào giữa bảng làm sai lệch số thứ tự cột \`so_thu_tu_cot\` đã gõ cứng.
  3. Chậm trên file lớn vì phải đọc cả các cột không cần thiết.

### 2. Cặp Đôi Sức Mạnh INDEX & MATCH
- **\`=MATCH(gia_tri_tim, vung_tim, [kieu_khop])\`**: Tìm kiếm trong mảng 1 chiều và trả về vị trí số thứ tự (bắt đầu từ 1). Dùng \`0\` để khớp chính xác.
- **\`=INDEX(vung_ket_qua, vi_tri_hang, [vi_tri_cot])\`**: Trả về giá trị tại giao điểm tọa độ hàng và cột.
- **Mô hình kết hợp chuẩn**:
  \`=INDEX(Vung_Can_Lay, MATCH(Gia_Tri_Tim, Vung_Tra_Cuu, 0))\`
  - Có thể tra cứu sang trái, phải, lên trên hoặc xuống dưới.
  - Bền bỉ, không bị ảnh hưởng khi chèn thêm hay xóa cột!
  - Tra cứu ma trận 2 chiều: \`=INDEX(Bang_So, MATCH(Hang, Cot_Tieu_De, 0), MATCH(Cot, Hang_Tieu_De, 0))\``
    },
    syntax: `# VLOOKUP (Exact Match):
=VLOOKUP(lookup_value, table_array, col_index_num, FALSE)

# INDEX / MATCH (Left-Lookup & Insertion Proof):
=INDEX(Return_Column, MATCH(lookup_value, Lookup_Column, 0))

# 2D Matrix Dual-Lookup:
=INDEX(Data_Grid, MATCH(row_val, Row_Header_Col, 0), MATCH(col_val, Col_Header_Row, 0))`,
    examples: [
      {
        title: { en: 'Exact Match Price Retrieval with VLOOKUP', vi: 'Lấy Đơn Giá Khớp Chính Xác Bằng VLOOKUP' },
        code: `Product Master Table in A2:C50 (Col A: ProductID, Col B: Name, Col C: Price)
Target: Look up price for ProductID in cell F2

Formula in G2: =VLOOKUP(F2, $A$2:$C$50, 3, FALSE)`,
        description: {
          en: 'Col index 3 retrieves the Price column. FALSE ensures exact alphanumeric code matching.',
          vi: 'Chỉ số cột 3 lấy cột Đơn giá. FALSE đảm bảo tìm khớp chính xác mã sản phẩm.'
        }
      },
      {
        title: { en: 'Left-Lookup Customer Name with INDEX / MATCH', vi: 'Tra Cứu Tên Khách Hàng Sang Bên Trái Bằng INDEX / MATCH' },
        code: `Customer Master in A2:C100 (Col A: FullName, Col B: City, Col C: CustomerID)
Target: Look up FullName in Col A using CustomerID from Col C (Left-Lookup!)

Formula: =INDEX($A$2:$A$100, MATCH(F2, $C$2:$C$100, 0))`,
        description: {
          en: 'MATCH finds row number in Col C, and INDEX extracts corresponding name from Col A (impossible with VLOOKUP).',
          vi: 'MATCH tìm số thứ tự dòng ở Cột C và INDEX trích xuất tên tương ứng ở Cột A (điều mà VLOOKUP không thể làm được).'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Omitting the 4th argument in VLOOKUP (=VLOOKUP(A1, Table, 2)), which defaults to TRUE (Approximate Match) and returns incorrect data.',
          vi: 'Bỏ quên đối số thứ 4 trong VLOOKUP (=VLOOKUP(A1, Table, 2)), khiến Excel mặc định là TRUE (Khớp xấp xỉ) và trả về dữ liệu sai.'
        },
        correction: {
          en: 'Always explicitly provide FALSE (or 0) for exact lookups.',
          vi: 'Luôn luôn cung cấp rõ ràng FALSE (hoặc 0) cho các phép tra cứu chính xác.'
        }
      },
      {
        mistake: {
          en: 'Providing different height ranges in INDEX and MATCH (e.g. INDEX(A2:A100) with MATCH(F1, C1:C100, 0)), causing an offset row error.',
          vi: 'Cung cấp độ dài hàng khác nhau giữa INDEX và MATCH (ví dụ INDEX(A2:A100) nhưng MATCH(F1, C1:C100, 0)), gây lệch hàng.'
        },
        correction: {
          en: 'Ensure both INDEX return range and MATCH lookup range start and end on the exact same row numbers.',
          vi: 'Đảm bảo cả vùng trả về của INDEX và vùng tra cứu của MATCH đều bắt đầu và kết thúc ở cùng một số hàng.'
        }
      }
    ],
    tips: [
      { en: 'Immunity to Column Shifting: When building enterprise models, prefer INDEX/MATCH over VLOOKUP to prevent broken formulas when coworkers insert new columns.', vi: 'Tính bất biến khi chèn cột: Khi xây dựng mô hình doanh nghiệp, hãy ưu tiên INDEX/MATCH hơn VLOOKUP để tránh lỗi khi đồng nghiệp chèn thêm cột mới.' },
      { en: 'Approximate Match Usage: Use TRUE in VLOOKUP only when looking up tax brackets or tiered bonus percentages where the first column is sorted in ascending order.', vi: 'Sử dụng khớp xấp xỉ: Chỉ dùng TRUE trong VLOOKUP khi tra cứu bậc thuế hoặc tỷ lệ thưởng theo khung điểm đã được sắp xếp tăng dần.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l11_ex1',
      type: 'complete_code',
      title: { en: 'Exact VLOOKUP for Product Category', vi: 'Tra Cứu Chính Xác Danh Mục Sản Phẩm Bằng VLOOKUP' },
      instruction: {
        en: 'Write a VLOOKUP formula to retrieve the category in Column 2 from master table $A$2:$C$100 for ProductID in cell F2 using exact match.',
        vi: 'Viết công thức VLOOKUP để lấy danh mục ở Cột 2 từ bảng danh mục $A$2:$C$100 cho ProductID ở ô F2 với kiểu khớp chính xác.'
      },
      starterCode: '=VLOOKUP(F2, $A$2:$C$100, ',
      solutionCode: '=VLOOKUP(F2, $A$2:$C$100, 2, FALSE)',
      expectedOutput: '=VLOOKUP(F2, $A$2:$C$100, 2, FALSE)',
      hint: { en: 'Column index is 2 and range_lookup is FALSE.', vi: 'Chỉ số cột là 2 và kiểu tìm kiếm là FALSE.' },
      explanation: { en: 'VLOOKUP searches column A for F2 and returns the value from column 2 on the matching row.', vi: 'VLOOKUP tìm F2 trong cột A và trả về giá trị từ cột thứ 2 trên hàng khớp.' }
    },
    {
      id: 'excel_l11_ex2',
      type: 'complete_code',
      title: { en: 'Left-Lookup Employee Name with INDEX & MATCH', vi: 'Tra Cứu Tên Nhân Viên Sang Trái Bằng INDEX & MATCH' },
      instruction: {
        en: 'Write an INDEX/MATCH formula to look up Employee Name in $A$2:$A$50 based on Employee ID in cell E2 matched against $B$2:$B$50.',
        vi: 'Viết công thức INDEX/MATCH để tra cứu Tên nhân viên ở $A$2:$A$50 dựa trên Mã nhân viên ở ô E2 khớp với vùng $B$2:$B$50.'
      },
      starterCode: '=INDEX($A$2:$A$50, MATCH(',
      solutionCode: '=INDEX($A$2:$A$50, MATCH(E2, $B$2:$B$50, 0))',
      expectedOutput: '=INDEX($A$2:$A$50, MATCH(E2, $B$2:$B$50, 0))',
      hint: { en: 'Nest MATCH(E2, $B$2:$B$50, 0) inside INDEX($A$2:$A$50, ...).', vi: 'Lồng MATCH(E2, $B$2:$B$50, 0) vào bên trong INDEX($A$2:$A$50, ...).' },
      explanation: { en: 'INDEX/MATCH effortlessly performs a left-lookup from column B to column A.', vi: 'INDEX/MATCH thực hiện tra cứu sang trái từ cột B sang cột A một cách nhẹ nhàng.' }
    }
  ],
  challenge: {
    id: 'excel_l11_challenge',
    title: { en: 'Two-Dimensional Matrix Grid Lookup', vi: 'Tra Cứu Lưới Ma Trận Hai Chiều' },
    description: {
      en: 'Construct a 2D lookup formula for cell D15 that extracts the shipping rate from matrix data grid $B$2:$E$10, where origin city in cell A15 is matched against row headers in $A$2:$A$10 and destination code in cell B15 is matched against column headers in $B$1:$E$1.',
      vi: 'Xây dựng công thức tra cứu 2D cho ô D15 lấy cước vận chuyển từ ma trận $B$2:$E$10, trong đó thành phố gửi ở ô A15 khớp với tiêu đề hàng tại $A$2:$A$10 và mã đích đến ở ô B15 khớp với tiêu đề cột tại $B$1:$E$1.'
    },
    requirements: [
      { en: 'Use INDEX on grid $B$2:$E$10', vi: 'Sử dụng hàm INDEX trên lưới $B$2:$E$10' },
      { en: 'Use first MATCH for row header in $A$2:$A$10', vi: 'Dùng MATCH thứ nhất cho tiêu đề hàng tại $A$2:$A$10' },
      { en: 'Use second MATCH for column header in $B$1:$E$1', vi: 'Dùng MATCH thứ hai cho tiêu đề cột tại $B$1:$E$1' }
    ],
    starterCode: '=',
    solutionCode: '=INDEX($B$2:$E$10, MATCH(A15, $A$2:$A$10, 0), MATCH(B15, $B$1:$E$1, 0))',
    hints: [
      { en: 'Syntax: =INDEX(DataGrid, MATCH(RowVal, RowHeaders, 0), MATCH(ColVal, ColHeaders, 0))', vi: 'Cú pháp: =INDEX(BangSo, MATCH(GiaTriHang, TieuDeHang, 0), MATCH(GiaTriCot, TieuDeCot, 0))' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l11_q1',
      type: 'single_choice',
      question: {
        en: 'What is the primary architectural limitation of the `VLOOKUP` function?',
        vi: 'Hạn chế kiến trúc cốt lõi của hàm `VLOOKUP` là gì?'
      },
      options: [
        { en: 'It cannot look to the left of the lookup column; the lookup key must be in the first column', vi: 'Nó không thể tra cứu sang bên trái cột tìm kiếm; khóa tìm kiếm bắt buộc phải nằm ở cột đầu tiên' },
        { en: 'It cannot search numbers', vi: 'Nó không thể tìm số' },
        { en: 'It only works on Mondays', vi: 'Nó chỉ hoạt động vào Thứ Hai' },
        { en: 'It requires macros to run', vi: 'Nó yêu cầu macro để chạy' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'VLOOKUP can only return data from columns to the right of the lookup column.',
        vi: 'VLOOKUP chỉ có thể trả về dữ liệu từ các cột nằm ở bên phải của cột tra cứu.'
      },
      difficulty: 'easy',
      topicId: 'excel_lookups'
    },
    {
      id: 'excel_l11_q2',
      type: 'single_choice',
      question: {
        en: 'What value must be entered for the 4th argument of VLOOKUP (`[range_lookup]`) to guarantee an exact match?',
        vi: 'Giá trị nào phải được nhập cho đối số thứ 4 của VLOOKUP (`[range_lookup]`) để đảm bảo khớp chính xác?'
      },
      options: [
        { en: 'FALSE (or 0)', vi: 'FALSE (hoặc 0)' },
        { en: 'TRUE (or 1)', vi: 'TRUE (hoặc 1)' },
        { en: '"EXACT"', vi: '"EXACT"' },
        { en: 'NULL', vi: 'NULL' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Passing FALSE (or 0) instructs Excel to seek an exact match and return #N/A if not found.',
        vi: 'Truyền FALSE (hoặc 0) yêu cầu Excel tìm kiếm khớp chính xác và báo lỗi #N/A nếu không tìm thấy.'
      },
      difficulty: 'easy',
      topicId: 'excel_lookups'
    },
    {
      id: 'excel_l11_q3',
      type: 'single_choice',
      question: {
        en: 'What does the `MATCH` function return in Excel?',
        vi: 'Hàm `MATCH` trong Excel trả về giá trị gì?'
      },
      options: [
        { en: 'The relative numeric position (1-based index) of the item within the array', vi: 'Vị trí số thứ tự tương đối (chỉ số bắt đầu từ 1) của phần tử trong mảng' },
        { en: 'The actual text inside the matching cell', vi: 'Văn bản thực tế bên trong ô khớp' },
        { en: 'TRUE or FALSE', vi: 'TRUE hoặc FALSE' },
        { en: 'The total sum of matching cells', vi: 'Tổng giá trị các ô khớp' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MATCH returns a numeric index indicating which row or column position the lookup value occupies.',
        vi: 'Hàm MATCH trả về chỉ số dạng số cho biết giá trị cần tìm nằm ở vị trí hàng hoặc cột thứ mấy.'
      },
      difficulty: 'easy',
      topicId: 'excel_lookups'
    },
    {
      id: 'excel_l11_q4',
      type: 'single_choice',
      question: {
        en: 'Why is `INDEX/MATCH` considered superior to `VLOOKUP` for financial modeling?',
        vi: 'Tại sao `INDEX/MATCH` được coi là vượt trội hơn `VLOOKUP` trong mô hình hóa tài chính?'
      },
      options: [
        { en: 'It is resilient to inserted/deleted columns and can look left, right, vertically, and horizontally', vi: 'Nó không bị ảnh hưởng khi chèn/xóa cột và có thể tra cứu sang trái, phải, dọc và ngang' },
        { en: 'It automatically formats cells to currency', vi: 'Nó tự động định dạng ô sang tiền tệ' },
        { en: 'It uses 50% less RAM', vi: 'Nó sử dụng ít hơn 50% RAM' },
        { en: 'It is shorter to type', vi: 'Nó ngắn hơn khi gõ' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because INDEX/MATCH references specific ranges directly rather than hardcoded column numbers (e.g. 3), inserting columns never breaks formulas.',
        vi: 'Vì INDEX/MATCH tham chiếu trực tiếp các dải ô thay vì số thứ tự cột cố định (ví dụ 3), việc chèn thêm cột không bao giờ làm hỏng công thức.'
      },
      difficulty: 'medium',
      topicId: 'excel_lookups'
    },
    {
      id: 'excel_l11_q5',
      type: 'single_choice',
      question: {
        en: 'What does the function `=HLOOKUP` do compared to `=VLOOKUP`?',
        vi: 'Hàm `=HLOOKUP` làm gì so với hàm `=VLOOKUP`?'
      },
      options: [
        { en: 'Searches horizontally across the first ROW of a table and retrieves a value from a specified row below it', vi: 'Tìm kiếm theo chiều ngang trên HÀNG đầu tiên của bảng và lấy giá trị từ một hàng chỉ định bên dưới' },
        { en: 'Searches vertically down columns', vi: 'Tìm kiếm theo chiều dọc xuống các cột' },
        { en: 'Looks up hyperlinks', vi: 'Tra cứu các liên kết siêu văn bản' },
        { en: 'Sorts rows alphabetically', vi: 'Sắp xếp các hàng theo bảng chữ cái' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'HLOOKUP is horizontal: it searches across top row headers and extracts from a row index.',
        vi: 'HLOOKUP tìm kiếm theo chiều ngang: nó duyệt qua các tiêu đề hàng trên cùng và trích xuất từ chỉ số hàng.'
      },
      difficulty: 'easy',
      topicId: 'excel_lookups'
    },
    {
      id: 'excel_l11_q6',
      type: 'single_choice',
      question: {
        en: 'What does `=MATCH("Laptop", {"Phone", "Tablet", "Laptop", "Monitor"}, 0)` return?',
        vi: 'Công thức `=MATCH("Laptop", {"Phone", "Tablet", "Laptop", "Monitor"}, 0)` trả về kết quả gì?'
      },
      options: [
        { en: '3', vi: '3' },
        { en: '2', vi: '2' },
        { en: '"Laptop"', vi: '"Laptop"' },
        { en: 'TRUE', vi: 'TRUE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '"Laptop" is the 3rd item in the array list, so MATCH returns 3.',
        vi: '"Laptop" là phần tử thứ 3 trong danh sách mảng, vì vậy MATCH trả về 3.'
      },
      difficulty: 'easy',
      topicId: 'excel_lookups'
    },
    {
      id: 'excel_l11_q7',
      type: 'single_choice',
      question: {
        en: 'What error appears if `VLOOKUP` fails to find the lookup value in exact match mode (`FALSE`)?',
        vi: 'Lỗi nào xuất hiện nếu `VLOOKUP` không tìm thấy giá trị cần tìm ở chế độ khớp chính xác (`FALSE`)?'
      },
      options: [
        { en: '#N/A', vi: '#N/A' },
        { en: '#VALUE!', vi: '#VALUE!' },
        { en: '#REF!', vi: '#REF!' },
        { en: '#NULL!', vi: '#NULL!' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '#N/A ("Not Available") is returned by lookup functions when a key does not exist in the target dataset.',
        vi: 'Lỗi #N/A ("Không tìm thấy") được trả về bởi các hàm tra cứu khi khóa tìm kiếm không tồn tại trong tập dữ liệu đích.'
      },
      difficulty: 'easy',
      topicId: 'excel_lookups'
    },
    {
      id: 'excel_l11_q8',
      type: 'true_false',
      question: {
        en: 'True or False: If duplicate matches exist in a dataset, `VLOOKUP` returns the FIRST matching row encountered from the top.',
        vi: 'Đúng hay Sai: Nếu có nhiều bản ghi trùng lặp trong tập dữ liệu, `VLOOKUP` sẽ trả về kết quả của dòng khớp ĐẦU TIÊN gặp phải từ trên xuống.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. VLOOKUP always stops at the very first match it finds scanning from top to bottom.',
        vi: 'Đúng. VLOOKUP luôn dừng lại ở bản ghi khớp đầu tiên mà nó tìm thấy khi quét từ trên xuống dưới.'
      },
      difficulty: 'medium',
      topicId: 'excel_lookups'
    },
    {
      id: 'excel_l11_q9',
      type: 'single_choice',
      question: {
        en: 'What does `match_type` value `0` represent in the `MATCH` function?',
        vi: 'Giá trị `match_type` bằng `0` biểu thị điều gì trong hàm `MATCH`?'
      },
      options: [
        { en: 'Exact match (lookup array does not need to be sorted)', vi: 'Khớp chính xác (mảng tra cứu không cần sắp xếp)' },
        { en: 'Less than match (requires ascending sort)', vi: 'Khớp nhỏ hơn (yêu cầu sắp xếp tăng dần)' },
        { en: 'Greater than match (requires descending sort)', vi: 'Khớp lớn hơn (yêu cầu sắp xếp giảm dần)' },
        { en: 'Case-sensitive match', vi: 'Khớp phân biệt hoa thường' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '0 designates an exact match where elements can appear in any unsorted order.',
        vi: 'Số 0 chỉ định kiểu khớp chính xác trong đó các phần tử có thể xuất hiện theo thứ tự bất kỳ không cần sắp xếp.'
      },
      difficulty: 'easy',
      topicId: 'excel_lookups'
    },
    {
      id: 'excel_l11_q10',
      type: 'single_choice',
      question: {
        en: 'In `=INDEX(A1:D10, 4, 2)`, which cell in the worksheet is returned?',
        vi: 'Trong công thức `=INDEX(A1:D10, 4, 2)`, ô nào trong bảng tính được trả về?'
      },
      options: [
        { en: 'B4 (Row 4, Column 2 of range A1:D10)', vi: 'B4 (Hàng 4, Cột 2 của vùng A1:D10)' },
        { en: 'D2', vi: 'D2' },
        { en: 'A4', vi: 'A4' },
        { en: 'B2', vi: 'B2' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Row 4 of range A1:D10 is row 4, and Column 2 is column B, pointing to cell B4.',
        vi: 'Hàng 4 của vùng A1:D10 là hàng 4, và Cột 2 là cột B, trỏ chính xác đến ô B4.'
      },
      difficulty: 'easy',
      topicId: 'excel_lookups'
    }
  ]
};

saveLesson('lesson11.ts', 'lesson11', lesson11);

// =========================================================================
// LESSON 12: Modern Dynamic Lookup (XLOOKUP)
// New ID: excel_lesson_xlookup
// =========================================================================
export const lesson12: Lesson = {
  id: 'excel_lesson_xlookup',
  order: 12,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_xlookup',
  title: {
    en: 'Modern Dynamic Lookup Engine: The Complete Power of XLOOKUP',
    vi: 'Bộ Công Cụ Tra Cứu Động Hiện Đại: Sức Mạnh Toàn Diện Của XLOOKUP'
  },
  summary: {
    en: 'Master Microsoft 365\'s modern lookup successor: XLOOKUP. Default exact matching, native left-lookups, built-in [if_not_found] error handling, reverse bottom-to-top searches, binary search algorithms, and multi-column array returns.',
    vi: 'Làm chủ công cụ tra cứu kế thừa hiện đại trên Microsoft 365: XLOOKUP. Mặc định khớp chính xác, hỗ trợ tra cứu sang trái nguyên bản, tích hợp sẵn xử lý lỗi [if_not_found], tìm kiếm ngược từ dưới lên, thuật toán tìm nhị phân và trả về mảng nhiều cột đồng thời.'
  },
  learn: {
    introduction: {
      en: 'Introduced to replace VLOOKUP, HLOOKUP, and INDEX/MATCH, XLOOKUP is the ultimate unified lookup function in modern Excel. It defaults to exact match, requires separate lookup and return arrays (making it completely immune to column insertions), features built-in error handling, and can search bottom-to-top to retrieve the latest transaction record.',
      vi: 'Được ra mắt để thay thế hoàn toàn VLOOKUP, HLOOKUP và INDEX/MATCH, XLOOKUP là hàm tra cứu hợp nhất tối thượng trong Excel hiện đại. Hàm mặc định khớp chính xác, tách biệt mảng tra cứu và mảng trả về (hoàn toàn không bị ảnh hưởng khi chèn cột), tích hợp sẵn xử lý lỗi và có thể tìm kiếm ngược từ dưới lên để lấy giao dịch mới nhất.'
    },
    conceptExplanation: {
      en: `### 1. The XLOOKUP Signature
\`=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])\`

### 2. Key Advantages Over VLOOKUP
1. **Defaults to Exact Match**: No more typing \`, FALSE\`!
2. **Native Left-Lookup**: \`lookup_array\` and \`return_array\` can be in any position.
3. **Built-in Error Handling**: Pass \`[if_not_found]\` (e.g. \`"Not Found"\`) to eliminate clumsy \`IFERROR()\` wrapping.
4. **Search Bottom-to-Top**: Set \`search_mode = -1\` to search from the last row up (great for finding the most recent price or invoice).
5. **Return Multiple Columns**: Pass a multi-column return array (\`C2:E100\`) to spill Name, City, and Salary simultaneously into adjacent cells!

### 3. Match & Search Modes
- **\`match_mode\`**: \`0\` (Exact - Default), \`-1\` (Exact or next smaller), \`1\` (Exact or next larger), \`2\` (Wildcard).
- **\`search_mode\`**: \`1\` (First-to-last - Default), \`-1\` (Last-to-first / Reverse), \`2\` (Binary Ascending), \`-2\` (Binary Descending).`,
      vi: `### 1. Cấu Trúc Toàn Diện Của XLOOKUP
\`=XLOOKUP(gia_tri_tim, mang_tra_cuu, mang_tra_ve, [neu_khong_thay], [che_do_khop], [che_do_tim])\`

### 2. Các Ưu Điểm Vượt Trội So Với VLOOKUP
1. **Mặc định Khớp Chính Xác**: Không cần phải nhớ gõ \`, FALSE\`!
2. **Tra cứu sang trái nguyên bản**: \`mang_tra_cuu\` và \`mang_tra_ve\` có thể ở bất kỳ vị trí nào.
3. **Tích hợp sẵn Xử lý lỗi**: Truyền đối số \`[neu_khong_thay]\` (ví dụ \`"Không tìm thấy"\`) giúp loại bỏ việc lồng hàm \`IFERROR()\`.
4. **Tìm kiếm ngược từ dưới lên**: Đặt \`che_do_tim = -1\` để quét từ dòng cuối cùng lên trên (tuyệt vời để tìm giá hoặc hóa đơn mới nhất).
5. **Trả về nhiều cột đồng thời**: Truyền dải ô trả về gồm nhiều cột (\`C2:E100\`) để tự động tràn (spill) Tên, Thành phố và Lương ra các ô liền kề!`
    },
    syntax: `# Basic Exact XLOOKUP:
=XLOOKUP(lookup_value, lookup_array, return_array)

# Built-in Error Fallback:
=XLOOKUP(A2, Products!$A$2:$A$100, Products!$C$2:$C$100, "Product Not Found")

# Reverse Bottom-to-Top Lookup (Find Latest):
=XLOOKUP(A2, Log!$A$2:$A$1000, Log!$B$2:$B$1000, "No History", 0, -1)`,
    examples: [
      {
        title: { en: 'Look Up Most Recent Customer Purchase (Reverse Search)', vi: 'Tra Cứu Giao Dịch Mới Nhất Của Khách Hàng (Tìm Ngược)' },
        code: `Sales Log in Sheet 'Log' with CustomerID in A2:A5000 and OrderTotal in D2:D5000
Target: Find the latest transaction total for Customer ID "C902"

Formula: =XLOOKUP("C902", Log!$A$2:$A$5000, Log!$D$2:$D$5000, "No Orders", 0, -1)`,
        description: {
          en: 'search_mode = -1 starts scanning from row 5000 upwards, instantly returning the latest transaction.',
          vi: 'search_mode = -1 bắt đầu quét từ dòng 5000 ngược lên trên, ngay lập tức trả về giao dịch gần nhất.'
        }
      },
      {
        title: { en: 'Multi-Column Spilling XLOOKUP', vi: 'XLOOKUP Tràn Dữ Liệu Nhiều Cột Cùng Lúc' },
        code: `Employee Master in A2:D100 (Col A: ID, Col B: Name, Col C: Dept, Col D: Salary)
Target: Enter ID in F2 and return Name, Dept, and Salary in G2:I2 with one formula!

Formula in G2: =XLOOKUP(F2, $A$2:$A$100, $B$2:$D$100, "Missing")`,
        description: {
          en: 'Passing B2:D100 as the return array spills all 3 columns across G2, H2, and I2 automatically.',
          vi: 'Truyền B2:D100 làm mảng trả về sẽ tự động tràn cả 3 cột qua các ô G2, H2 và I2.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Supplying unequal range sizes for lookup_array and return_array (e.g. A2:A100 vs B2:B50), resulting in a #VALUE! error.',
          vi: 'Cung cấp dải ô không cùng kích thước giữa mảng tìm kiếm và mảng trả về (ví dụ A2:A100 vs B2:B50), dẫn đến lỗi #VALUE!.'
        },
        correction: {
          en: 'Both arrays must span identical row counts.',
          vi: 'Cả hai mảng phải có cùng số lượng hàng chính xác.'
        }
      }
    ],
    tips: [
      { en: 'Wildcard Lookups: Set match_mode = 2 to allow asterisks (*) and question marks (?) in XLOOKUP queries.', vi: 'Tra cứu bằng ký tự đại diện: Đặt match_mode = 2 để sử dụng dấu sao (*) và dấu chấm hỏi (?) trong các truy vấn XLOOKUP.' },
      { en: 'Horizontal Replacement: XLOOKUP works horizontally just as easily as vertically—just pass row vectors instead of column vectors.', vi: 'Thay thế HLOOKUP: XLOOKUP hoạt động theo chiều ngang dễ dàng như chiều dọc—chỉ cần truyền các mảng hàng thay vì mảng cột.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l12_ex1',
      type: 'complete_code',
      title: { en: 'Standard Clean XLOOKUP with Fallback', vi: 'Tra Cứu Chuẩn XLOOKUP Kèm Thông Báo Lỗi' },
      instruction: {
        en: 'Write an XLOOKUP formula to look up ProductID in cell F2 against $A$2:$A$100 and return Price from $D$2:$D$100. If not found, return "Item Not Found".',
        vi: 'Viết công thức XLOOKUP tra cứu ProductID ở ô F2 trong $A$2:$A$100 và trả về Đơn giá từ $D$2:$D$100. Nếu không thấy, trả về "Item Not Found".'
      },
      starterCode: '=XLOOKUP(F2, $A$2:$A$100, $D$2:$D$100, ',
      solutionCode: '=XLOOKUP(F2, $A$2:$A$100, $D$2:$D$100, "Item Not Found")',
      expectedOutput: '=XLOOKUP(F2, $A$2:$A$100, $D$2:$D$100, "Item Not Found")',
      hint: { en: 'Pass "Item Not Found" as the 4th argument.', vi: 'Truyền "Item Not Found" vào đối số thứ 4.' },
      explanation: { en: 'XLOOKUP handles missing values directly via the 4th if_not_found parameter.', vi: 'XLOOKUP xử lý các giá trị không tìm thấy trực tiếp qua tham số thứ 4 if_not_found.' }
    },
    {
      id: 'excel_l12_ex2',
      type: 'complete_code',
      title: { en: 'Reverse Search for Most Recent Status', vi: 'Tìm Kiếm Ngược Lấy Trạng Thái Mới Nhất' },
      instruction: {
        en: 'Write an XLOOKUP formula to find Account ID in cell A2 within Log!$A$2:$A$1000 and return Status from Log!$C$2:$C$1000 searching bottom-to-top (search_mode = -1).',
        vi: 'Viết công thức XLOOKUP tìm Mã tài khoản ở ô A2 trong Log!$A$2:$A$1000 và trả về Trạng thái từ Log!$C$2:$C$1000 theo chiều từ dưới lên (search_mode = -1).'
      },
      starterCode: '=XLOOKUP(A2, Log!$A$2:$A$1000, Log!$C$2:$C$1000, "None", 0, ',
      solutionCode: '=XLOOKUP(A2, Log!$A$2:$A$1000, Log!$C$2:$C$1000, "None", 0, -1)',
      expectedOutput: '=XLOOKUP(A2, Log!$A$2:$A$1000, Log!$C$2:$C$1000, "None", 0, -1)',
      hint: { en: 'Use -1 for search_mode.', vi: 'Dùng -1 cho tham số search_mode.' },
      explanation: { en: 'Setting search_mode to -1 searches from the last item to the first.', vi: 'Đặt search_mode thành -1 sẽ tìm kiếm từ bản ghi cuối cùng lên bản ghi đầu tiên.' }
    }
  ],
  challenge: {
    id: 'excel_l12_challenge',
    title: { en: 'Implement Two-Way Dynamic Matrix XLOOKUP', vi: 'Triển Khai XLOOKUP Ma Trận Động Hai Chiều' },
    description: {
      en: 'Construct a two-way nested XLOOKUP formula for cell D2 that looks up the row employee in cell A2 against $A$5:$A$20 and the column quarter in cell B2 against $B$4:$E$4 across matrix grid $B$5:$E$20.',
      vi: 'Xây dựng công thức XLOOKUP lồng 2 chiều cho ô D2 tra cứu nhân viên ở ô A2 trong $A$5:$A$20 và quý ở ô B2 trong $B$4:$E$4 trên bảng ma trận $B$5:$E$20.'
    },
    requirements: [
      { en: 'Use outer XLOOKUP to match column quarter', vi: 'Dùng XLOOKUP bên ngoài để khớp quý ở cột' },
      { en: 'Nest inner XLOOKUP to match row employee', vi: 'Lồng XLOOKUP bên trong để khớp nhân viên ở hàng' }
    ],
    starterCode: '=',
    solutionCode: '=XLOOKUP(B2, $B$4:$E$4, XLOOKUP(A2, $A$5:$A$20, $B$5:$E$20))',
    hints: [
      { en: 'Syntax: =XLOOKUP(Quarter, QuarterHeaders, XLOOKUP(Employee, EmployeeList, DataGrid))', vi: 'Cú pháp: =XLOOKUP(Quy, DanhSachQuy, XLOOKUP(NhanVien, DanhSachNhanVien, BangMaTran))' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l12_q1',
      type: 'single_choice',
      question: {
        en: 'What is the default match mode of `XLOOKUP` if the match_mode argument is omitted?',
        vi: 'Chế độ so khớp mặc định của `XLOOKUP` nếu bỏ qua đối số match_mode là gì?'
      },
      options: [
        { en: 'Exact Match (0)', vi: 'Khớp chính xác (0)' },
        { en: 'Approximate Match (1)', vi: 'Khớp xấp xỉ (1)' },
        { en: 'Wildcard Match (2)', vi: 'Khớp ký tự đại diện (2)' },
        { en: 'Binary Search', vi: 'Tìm kiếm nhị phân' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Unlike VLOOKUP which defaults to approximate, XLOOKUP defaults to Exact Match (0).',
        vi: 'Khác với VLOOKUP mặc định là xấp xỉ, XLOOKUP mặc định là Khớp chính xác (0).'
      },
      difficulty: 'easy',
      topicId: 'excel_xlookup'
    },
    {
      id: 'excel_l12_q2',
      type: 'single_choice',
      question: {
        en: 'How do you perform a reverse lookup (search from bottom to top) in `XLOOKUP`?',
        vi: 'Làm thế nào để thực hiện tra cứu ngược (tìm từ dưới lên trên) trong hàm `XLOOKUP`?'
      },
      options: [
        { en: 'Set `search_mode` to `-1`', vi: 'Đặt `search_mode` thành `-1`' },
        { en: 'Set `match_mode` to `-1`', vi: 'Đặt `match_mode` thành `-1`' },
        { en: 'Wrap with REVERSE()', vi: 'Bọc ngoài bằng REVERSE()' },
        { en: 'Sort the table first', vi: 'Sắp xếp lại bảng trước' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'search_mode = -1 instructs XLOOKUP to scan from the last item to the first item in the lookup array.',
        vi: 'search_mode = -1 hướng dẫn XLOOKUP quét từ phần tử cuối cùng lên phần tử đầu tiên trong mảng tra cứu.'
      },
      difficulty: 'medium',
      topicId: 'excel_xlookup'
    },
    {
      id: 'excel_l12_q3',
      type: 'single_choice',
      question: {
        en: 'What argument in `XLOOKUP` replaces the need for an external `IFERROR()` function?',
        vi: 'Đối số nào trong `XLOOKUP` thay thế nhu cầu sử dụng hàm `IFERROR()` bọc bên ngoài?'
      },
      options: [
        { en: '`[if_not_found]` (the 4th argument)', vi: '`[if_not_found]` (đối số thứ 4)' },
        { en: '`[error_handler]`', vi: '`[error_handler]`' },
        { en: '`[default_value]`', vi: '`[default_value]`' },
        { en: '`[fallback]`', vi: '`[fallback]`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The 4th argument [if_not_found] returns a custom text or fallback value if no match is discovered.',
        vi: 'Đối số thứ 4 [if_not_found] trả về văn bản tùy chỉnh hoặc giá trị dự phòng nếu không tìm thấy bản ghi khớp.'
      },
      difficulty: 'easy',
      topicId: 'excel_xlookup'
    },
    {
      id: 'excel_l12_q4',
      type: 'single_choice',
      question: {
        en: 'Can `XLOOKUP` return values from a column located to the left of the lookup column?',
        vi: 'Hàm `XLOOKUP` có thể trả về các giá trị từ một cột nằm ở bên trái cột tra cứu không?'
      },
      options: [
        { en: 'Yes, natively without any workarounds', vi: 'Có, hỗ trợ trực tiếp nguyên bản không cần đường vòng' },
        { en: 'No, only VLOOKUP can look left', vi: 'Không, chỉ có VLOOKUP mới tra cứu sang trái được' },
        { en: 'Only if cells are formatted as text', vi: 'Chỉ khi các ô được định dạng là văn bản' },
        { en: 'Only on Mac Excel', vi: 'Chỉ trên Excel dành cho Mac' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Because lookup_array and return_array are completely separate arguments, XLOOKUP can look in any direction (left, right, up, down).',
        vi: 'Vì mảng tra cứu và mảng trả về là hai đối số hoàn toàn độc lập, XLOOKUP có thể tra cứu theo bất kỳ hướng nào (trái, phải, lên, xuống).'
      },
      difficulty: 'easy',
      topicId: 'excel_xlookup'
    },
    {
      id: 'excel_l12_q5',
      type: 'single_choice',
      question: {
        en: 'What happens when `return_array` is specified as a multi-column range like `B2:D100`?',
        vi: 'Điều gì xảy ra khi `return_array` được chỉ định là dải ô gồm nhiều cột như `B2:D100`?'
      },
      options: [
        { en: 'XLOOKUP automatically spills all three columns into adjacent cells on the worksheet', vi: 'XLOOKUP tự động tràn dữ liệu cả ba cột ra các ô liền kề trên trang tính' },
        { en: 'Excel returns a #SPILL! error immediately', vi: 'Excel báo lỗi #SPILL! ngay lập tức' },
        { en: 'It only returns the first column', vi: 'Nó chỉ trả về cột đầu tiên' },
        { en: 'It combines the columns into one string', vi: 'Nó gộp các cột thành một chuỗi duy nhất' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Modern Excel dynamic arrays spill multi-column return vectors into neighboring columns automatically.',
        vi: 'Mảng động trong Excel hiện đại tự động tràn các vector kết quả nhiều cột sang các cột bên cạnh một cách tự động.'
      },
      difficulty: 'medium',
      topicId: 'excel_xlookup'
    },
    {
      id: 'excel_l12_q6',
      type: 'single_choice',
      question: {
        en: 'What match_mode setting enables wildcard characters (`*`, `?`) in XLOOKUP?',
        vi: 'Cài đặt match_mode nào kích hoạt các ký tự đại diện (`*`, `?`) trong hàm XLOOKUP?'
      },
      options: [
        { en: '`2` (Wildcard match)', vi: '`2` (Khớp ký tự đại diện)' },
        { en: '`0` (Exact match)', vi: '`0` (Khớp chính xác)' },
        { en: '`-1`', vi: '`-1`' },
        { en: '`1`', vi: '`1`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'match_mode = 2 activates wildcard evaluation for special pattern matching in XLOOKUP.',
        vi: 'match_mode = 2 kích hoạt việc đánh giá ký tự đại diện để so khớp mẫu đặc biệt trong XLOOKUP.'
      },
      difficulty: 'medium',
      topicId: 'excel_xlookup'
    },
    {
      id: 'excel_l12_q7',
      type: 'true_false',
      question: {
        en: 'True or False: Inserting or deleting columns between the lookup array and the return array will break an XLOOKUP formula.',
        vi: 'Đúng hay Sai: Việc chèn thêm hoặc xóa các cột nằm giữa mảng tra cứu và mảng trả về sẽ làm hỏng công thức XLOOKUP.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. XLOOKUP uses direct range references which adjust dynamically when columns are added or removed.',
        vi: 'Sai. XLOOKUP sử dụng các tham chiếu dải ô trực tiếp, tự động điều chỉnh linh hoạt khi các cột được thêm hoặc xóa.'
      },
      difficulty: 'easy',
      topicId: 'excel_xlookup'
    },
    {
      id: 'excel_l12_q8',
      type: 'single_choice',
      question: {
        en: 'What does `match_mode` value `-1` do in `XLOOKUP`?',
        vi: 'Giá trị `match_mode` bằng `-1` làm nhiệm vụ gì trong hàm `XLOOKUP`?'
      },
      options: [
        { en: 'Exact match, or if not found, returns the next smaller item', vi: 'Khớp chính xác, hoặc nếu không tìm thấy sẽ trả về phần tử nhỏ hơn tiếp theo' },
        { en: 'Exact match or next larger item', vi: 'Khớp chính xác hoặc phần tử lớn hơn tiếp theo' },
        { en: 'Searches backwards', vi: 'Tìm kiếm ngược' },
        { en: 'Returns the negative value', vi: 'Trả về giá trị âm' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'match_mode = -1 finds the exact value or falls back to the next smaller value (ideal for tax brackets).',
        vi: 'match_mode = -1 tìm giá trị chính xác hoặc lùi về giá trị nhỏ hơn liền kề (lý tưởng cho khung thuế).'
      },
      difficulty: 'medium',
      topicId: 'excel_xlookup'
    },
    {
      id: 'excel_l12_q9',
      type: 'single_choice',
      question: {
        en: 'Which Excel version first introduced native support for `XLOOKUP`?',
        vi: 'Phiên bản Excel nào lần đầu tiên ra mắt hỗ trợ nguyên bản cho hàm `XLOOKUP`?'
      },
      options: [
        { en: 'Microsoft 365 and Excel 2021', vi: 'Microsoft 365 và Excel 2021' },
        { en: 'Excel 2010', vi: 'Excel 2010' },
        { en: 'Excel 2013', vi: 'Excel 2013' },
        { en: 'Excel 97', vi: 'Excel 97' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'XLOOKUP was introduced in Microsoft 365 (late 2019) and perpetual release Excel 2021.',
        vi: 'XLOOKUP được giới thiệu trong Microsoft 365 (cuối 2019) và bản vĩnh viễn Excel 2021.'
      },
      difficulty: 'easy',
      topicId: 'excel_xlookup'
    },
    {
      id: 'excel_l12_q10',
      type: 'single_choice',
      question: {
        en: 'How does XLOOKUP perform horizontal lookups across rows?',
        vi: 'Hàm XLOOKUP thực hiện tra cứu theo chiều ngang qua các hàng như thế nào?'
      },
      options: [
        { en: 'By passing row vectors (e.g. A1:Z1 and A2:Z2) instead of column vectors', vi: 'Bằng cách truyền các mảng hàng (ví dụ A1:Z1 và A2:Z2) thay vì các mảng cột' },
        { en: 'By switching to HLOOKUP mode with a special flag', vi: 'Bằng cách chuyển sang chế độ HLOOKUP với cờ đặc biệt' },
        { en: 'It cannot perform horizontal lookups', vi: 'Nó không thể thực hiện tra cứu ngang' },
        { en: 'By rotating the screen', vi: 'Bằng cách xoay màn hình' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'XLOOKUP seamlessly adapts to horizontal orientations whenever row ranges are passed to lookup_array and return_array.',
        vi: 'XLOOKUP tự động thích ứng với chiều ngang bất cứ khi nào các dải ô hàng được truyền vào mảng tra cứu và mảng trả về.'
      },
      difficulty: 'easy',
      topicId: 'excel_xlookup'
    }
  ]
};

saveLesson('lesson12.ts', 'lesson12', lesson12);

// =========================================================================
// LESSON 13: Error Handling & Auditing (IFERROR, ISBLANK, ISNUMBER, Formula Auditing)
// New ID: excel_lesson_error_handling
// =========================================================================
export const lesson13: Lesson = {
  id: 'excel_lesson_error_handling',
  order: 13,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_error_handling',
  title: {
    en: 'Formula Auditing, Diagnostic Inspections & Error Handling: IFERROR, IFNA & IS Functions',
    vi: 'Kiểm Tra Công Thức, Chẩn Đoán & Xử Lý Lỗi: IFERROR, IFNA & Các Hàm IS'
  },
  summary: {
    en: 'Master Excel error taxonomy (#N/A, #DIV/0!, #VALUE!, #REF!, #NAME?, #NUM!, #SPILL!), clean downstream workflows with IFERROR and IFNA, validate data types with ISNUMBER/ISBLANK, and audit complex models with Trace Precedents and Evaluate Formula.',
    vi: 'Làm chủ phân loại các mã lỗi Excel (#N/A, #DIV/0!, #VALUE!, #REF!, #NAME?, #NUM!, #SPILL!), làm sạch luồng tính toán với IFERROR và IFNA, kiểm tra kiểu dữ liệu với ISNUMBER/ISBLANK và kiểm toán mô hình phức tạp bằng Trace Precedents và Evaluate Formula.'
  },
  learn: {
    introduction: {
      en: 'Uncaught errors in financial spreadsheets are catastrophic: a single #DIV/0! in a sub-schedule cascades upward, corrupting totals across executive summary dashboards. Professional financial engineers build defensive formulas using targeted error handlers and employ visual audit tools to trace calculation lineages.',
      vi: 'Các lỗi không được xử lý trong bảng tính tài chính có thể gây hậu quả nghiêm trọng: một lỗi #DIV/0! đơn lẻ trong bảng phụ sẽ lan truyền lên trên, làm hỏng toàn bộ số tổng trên báo cáo quản trị cấp cao. Các chuyên gia tài chính luôn xây dựng công thức phòng thủ bằng các hàm xử lý lỗi có mục tiêu và sử dụng công cụ kiểm toán trực quan để truy vết dòng tính toán.'
    },
    conceptExplanation: {
      en: `### 1. Excel Error Taxonomy
- **\`#N/A\`**: Value not available (lookup key does not exist).
- **\`#DIV/0!\`**: Division by zero or an empty cell.
- **\`#VALUE!\`**: Wrong data type (e.g. attempting to multiply text by a number).
- **\`#REF!\`**: Invalid cell reference (referenced row or column was physically deleted).
- **\`#NAME?\`**: Misspelled function name (e.g. \`=SUMM(A1:A5)\`) or unquoted text.
- **\`#NUM!\`**: Invalid numeric calculation (e.g. square root of a negative number).
- **\`#SPILL!\`**: Dynamic array formula blocked by populated cells in the spill range.

### 2. Error Trapping Functions
- **\`=IFERROR(value, value_if_error)\`**: Traps **all** error types and replaces them with a fallback.
- **\`=IFNA(value, value_if_na)\`**: Traps **only** #N/A errors, allowing true mathematical defects (#REF!, #DIV/0!) to surface for debugging.
- **\`IS\` Type Checkers**: \`ISBLANK()\`, \`ISNUMBER()\`, \`ISTEXT()\`, \`ISERROR()\`.

### 3. Visual Formula Auditing Tools (Formulas Tab)
- **Trace Precedents (Ctrl + [)**: Draws blue arrows to cells that supply data to the active formula.
- **Trace Dependents (Ctrl + ])**: Draws arrows to cells that rely on the active formula.
- **Evaluate Formula (Alt + M + V)**: Steps through nested calculations piece by piece like a software debugger!
- **Show Formulas (Ctrl + \`)**: Toggles whole worksheet between formula results and raw formula code.`,
      vi: `### 1. Phân Loại Các Mã Lỗi Phổ Biến Trong Excel
- **\`#N/A\`**: Giá trị không tồn tại (khóa tra cứu không có trong bảng đích).
- **\`#DIV/0!\`**: Chia cho số 0 hoặc chia cho ô trống.
- **\`#VALUE!\`**: Sai kiểu dữ liệu (ví dụ cố nhân văn bản với một số).
- **\`#REF!\`**: Tham chiếu không hợp lệ (hàng hoặc cột đang được tham chiếu đã bị xóa).
- **\`#NAME?\`**: Gõ sai tên hàm (ví dụ \`=SUMM(A1:A5)\`) hoặc chuỗi không có dấu ngoặc kép.
- **\`#NUM!\`**: Lỗi tính toán số học (ví dụ căn bậc hai của số âm).
- **\`#SPILL!\`**: Công thức mảng động bị cản trở bởi các ô có dữ liệu trong vùng tràn.

### 2. Các Hàm Bắt Và Xử Lý Lỗi
- **\`=IFERROR(gia_tri, gia_tri_khi_loi)\`**: Bắt **tất cả** các loại lỗi và thay thế bằng giá trị dự phòng.
- **\`=IFNA(gia_tri, gia_tri_khi_na)\`**: **Chỉ bắt duy nhất** lỗi #N/A, cho phép các lỗi toán học thực sự (#REF!, #DIV/0!) hiển thị để kiểm tra sửa lỗi.
- **Các hàm kiểm tra kiểu \`IS\`**: \`ISBLANK()\`, \`ISNUMBER()\`, \`ISTEXT()\`, \`ISERROR()\`.

### 3. Công Cụ Kiểm Toán Công Thức Trực Quan (Thẻ Formulas)
- **Trace Precedents (Ctrl + [)**: Vẽ mũi tên xanh trỏ đến các ô cung cấp dữ liệu cho công thức đang chọn.
- **Trace Dependents (Ctrl + ])**: Vẽ mũi tên trỏ đến các ô đang phụ thuộc vào công thức đang chọn.
- **Evaluate Formula (Alt + M + V)**: Chạy từng bước tính toán lồng nhau như một trình gỡ lỗi (debugger) chuyên nghiệp!
- **Show Formulas (Ctrl + \`)**: Bật/tắt toàn bộ trang tính giữa hiển thị kết quả và hiển thị mã công thức gốc.`
    },
    syntax: `# Clean Error Handlers:
=IFERROR(Revenue / Units, 0)
=IFNA(VLOOKUP(A2, Table, 2, FALSE), "Not in Catalog")

# Type Checking:
=IF(ISBLANK(A2), "Missing Input", A2 * 1.1)
=IF(ISNUMBER(B2), B2 * Rate, "Invalid Number")`,
    examples: [
      {
        title: { en: 'Defensive Division with IFERROR', vi: 'Phép Chia Phòng Thủ Bằng IFERROR' },
        code: `Profit in A2: 5000, Units in B2: 0

Unsafe Formula: =A2 / B2          -> Returns: #DIV/0!
Defensive Formula: =IFERROR(A2 / B2, 0) -> Returns: 0`,
        description: {
          en: 'Trapping division by zero prevents cascading errors throughout annual summary rollups.',
          vi: 'Bắt lỗi chia cho số 0 ngăn chặn lỗi lan truyền trên toàn bộ báo cáo tổng hợp năm.'
        }
      },
      {
        title: { en: 'Selective #N/A Trapping with IFNA', vi: 'Bắt Lỗi Chọn Lọc #N/A Bằng IFNA' },
        code: `Lookup Formula: =IFNA(XLOOKUP(A2, Catalog!A:A, Catalog!C:C), "Unlisted Item")`,
        description: {
          en: 'IFNA handles missing catalog items cleanly while allowing real syntax or reference errors to remain visible.',
          vi: 'IFNA xử lý sạch sẽ các mặt hàng chưa có trong danh mục trong khi vẫn để lộ các lỗi cú pháp hoặc tham chiếu thực sự để sửa.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Overusing =IFERROR(formula, "") indiscriminately, which masks fatal typos (#NAME?) and broken references (#REF!), creating silent calculation corruptions.',
          vi: 'Lạm dụng =IFERROR(cong_thuc, "") bừa bãi, che giấu các lỗi gõ sai tên hàm (#NAME?) và lỗi xóa mất ô tham chiếu (#REF!), tạo ra sai lệch số liệu ngầm.'
        },
        correction: {
          en: 'Use targeted IFNA() for lookups, and test specific boundary conditions like =IF(B2=0, 0, A2/B2).',
          vi: 'Sử dụng IFNA() có mục tiêu cho các phép tra cứu và kiểm tra điều kiện biên cụ thể như =IF(B2=0, 0, A2/B2).'
        }
      }
    ],
    tips: [
      { en: 'Evaluate Formula Step-by-Step: Press Alt + M + V to inspect sub-evaluations inside complex nested formulas to see exactly which sub-clause produces an error.', vi: 'Tính toán từng bước Evaluate Formula: Nhấn Alt + M + V để kiểm tra từng phép tính con bên trong công thức lồng phức tạp để xem chính xác vế nào gây ra lỗi.' },
      { en: 'Toggle Formula View: Press Ctrl + ` (backtick) to instantly view all formula code across the entire spreadsheet grid at once.', vi: 'Xem nhanh mã công thức: Nhấn Ctrl + ` (dấu huyền) để xem ngay toàn bộ mã công thức trên toàn bộ lưới bảng tính.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l13_ex1',
      type: 'complete_code',
      title: { en: 'Trap Division by Zero Error', vi: 'Bắt Lỗi Chia Cho Số 0' },
      instruction: {
        en: 'Wrap the division formula A2 / B2 with IFERROR to return 0 if an error occurs.',
        vi: 'Bọc công thức chia A2 / B2 bằng hàm IFERROR để trả về 0 nếu xảy ra lỗi.'
      },
      starterCode: '=IFERROR(A2 / B2, ',
      solutionCode: '=IFERROR(A2 / B2, 0)',
      expectedOutput: '=IFERROR(A2 / B2, 0)',
      hint: { en: 'Pass 0 as value_if_error.', vi: 'Truyền 0 làm giá trị khi có lỗi.' },
      explanation: { en: '=IFERROR(A2 / B2, 0) replaces #DIV/0! or other errors with 0.', vi: '=IFERROR(A2 / B2, 0) thay thế lỗi #DIV/0! hoặc các lỗi khác bằng 0.' }
    },
    {
      id: 'excel_l13_ex2',
      type: 'complete_code',
      title: { en: 'Validate Numeric Input before Multiplication', vi: 'Kiểm Tra Dữ Liệu Số Trước Khi Nhân' },
      instruction: {
        en: 'Write an IF statement with ISNUMBER: If cell C2 is a number, return C2 * 1.1, otherwise return "Invalid".',
        vi: 'Viết câu lệnh IF với ISNUMBER: Nếu ô C2 là một số, trả về C2 * 1.1, ngược lại trả về "Invalid".'
      },
      starterCode: '=IF(ISNUMBER(C2), ',
      solutionCode: '=IF(ISNUMBER(C2), C2 * 1.1, "Invalid")',
      expectedOutput: '=IF(ISNUMBER(C2), C2 * 1.1, "Invalid")',
      hint: { en: 'Pass C2 * 1.1 for true, and "Invalid" for false.', vi: 'Truyền C2 * 1.1 khi đúng và "Invalid" khi sai.' },
      explanation: { en: 'ISNUMBER ensures calculations only run on valid numeric data types.', vi: 'ISNUMBER đảm bảo các phép tính chỉ được thực hiện trên kiểu dữ liệu số hợp lệ.' }
    }
  ],
  challenge: {
    id: 'excel_l13_challenge',
    title: { en: 'Construct Robust Diagnostic Pipeline with IFNA', vi: 'Xây Dựng Quy Trình Chẩn Đoán Lỗi Bền Vững Bằng IFNA' },
    description: {
      en: 'Construct a formula for cell C2 that retrieves the price from VLOOKUP(A2, Catalog!$A$2:$B$100, 2, FALSE). If the item is not found (#N/A), output "Uncataloged Item".',
      vi: 'Xây dựng công thức cho ô C2 lấy đơn giá từ VLOOKUP(A2, Catalog!$A$2:$B$100, 2, FALSE). Nếu không tìm thấy sản phẩm (#N/A), xuất "Uncataloged Item".'
    },
    requirements: [
      { en: 'Use IFNA instead of generic IFERROR', vi: 'Sử dụng IFNA thay vì IFERROR chung chung' },
      { en: 'Provide exact fallback string "Uncataloged Item"', vi: 'Cung cấp chuỗi dự phòng chính xác "Uncataloged Item"' }
    ],
    starterCode: '=',
    solutionCode: '=IFNA(VLOOKUP(A2, Catalog!$A$2:$B$100, 2, FALSE), "Uncataloged Item")',
    hints: [
      { en: 'Wrap with: =IFNA(VLOOKUP(...), "Uncataloged Item")', vi: 'Bọc ngoài bằng: =IFNA(VLOOKUP(...), "Uncataloged Item")' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l13_q1',
      type: 'single_choice',
      question: {
        en: 'What causes the `#REF!` error in Excel formulas?',
        vi: 'Nguyên nhân nào gây ra lỗi `#REF!` trong công thức Excel?'
      },
      options: [
        { en: 'A cell, row, or column referenced by the formula was physically deleted', vi: 'Một ô, hàng hoặc cột đang được công thức tham chiếu đã bị xóa khỏi bảng tính' },
        { en: 'A function name was misspelled', vi: 'Tên hàm bị gõ sai chính tả' },
        { en: 'A number was divided by zero', vi: 'Một số bị chia cho số 0' },
        { en: 'The formula is too long', vi: 'Công thức quá dài' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '#REF! occurs when a formula refers to a cell coordinate that no longer exists because it was deleted.',
        vi: 'Lỗi #REF! xảy ra khi công thức trỏ đến một tọa độ ô không còn tồn tại do đã bị xóa.'
      },
      difficulty: 'easy',
      topicId: 'excel_error_handling'
    },
    {
      id: 'excel_l13_q2',
      type: 'single_choice',
      question: {
        en: 'Why is `IFNA()` preferred over `IFERROR()` for lookup formulas?',
        vi: 'Tại sao `IFNA()` lại được ưu tiên hơn `IFERROR()` đối với các công thức tra cứu?'
      },
      options: [
        { en: 'It only catches lookup misses (#N/A), allowing real bugs like #REF! or #NAME? to remain visible for debugging', vi: 'Nó chỉ bắt lỗi không tìm thấy (#N/A), cho phép các lỗi thực sự như #REF! hoặc #NAME? hiển thị để gỡ lỗi' },
        { en: 'IFNA runs 10x faster', vi: 'IFNA chạy nhanh hơn 10 lần' },
        { en: 'IFNA works on text only', vi: 'IFNA chỉ hoạt động trên văn bản' },
        { en: 'IFERROR is deprecated', vi: 'IFERROR đã bị loại bỏ' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'IFERROR masks all errors (including formula typos and deleted references). IFNA specifically isolates missing lookup keys without hiding structural bugs.',
        vi: 'IFERROR che giấu mọi lỗi (bao gồm cả lỗi gõ sai và tham chiếu bị xóa). IFNA khoanh vùng cụ thể lỗi thiếu khóa tra cứu mà không che lấp các lỗi cấu trúc.'
      },
      difficulty: 'medium',
      topicId: 'excel_error_handling'
    },
    {
      id: 'excel_l13_q3',
      type: 'single_choice',
      question: {
        en: 'What causes the `#NAME?` error in Microsoft Excel?',
        vi: 'Nguyên nhân nào dẫn đến lỗi `#NAME?` trong Microsoft Excel?'
      },
      options: [
        { en: 'Excel does not recognize text in a formula, usually due to a misspelled function name or missing quotes around a text string', vi: 'Excel không nhận diện được văn bản trong công thức, thường do gõ sai tên hàm hoặc thiếu dấu ngoặc kép quanh chuỗi văn bản' },
        { en: 'The worksheet name is too long', vi: 'Tên trang tính quá dài' },
        { en: 'A negative number was entered', vi: 'Nhập số âm' },
        { en: 'A column is too narrow', vi: 'Cột quá hẹp' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '#NAME? indicates an unrecognized token, such as =VLOKUP instead of =VLOOKUP or typing text without double quotes.',
        vi: '#NAME? biểu thị một từ khóa không xác định, như =VLOKUP thay vì =VLOOKUP hoặc gõ văn bản mà không có dấu ngoặc kép.'
      },
      difficulty: 'easy',
      topicId: 'excel_error_handling'
    },
    {
      id: 'excel_l13_q4',
      type: 'single_choice',
      question: {
        en: 'What feature visually draws blue tracer arrows from cells that provide input values to the currently selected formula cell?',
        vi: 'Tính năng nào vẽ các mũi tên chỉ vết màu xanh từ các ô cung cấp giá trị đầu vào đến ô công thức đang được chọn?'
      },
      options: [
        { en: 'Trace Precedents', vi: 'Trace Precedents' },
        { en: 'Trace Dependents', vi: 'Trace Dependents' },
        { en: 'Show Formulas', vi: 'Show Formulas' },
        { en: 'Error Checking', vi: 'Error Checking' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Trace Precedents illustrates the upstream cells feeding data directly into the active cell formula.',
        vi: 'Trace Precedents thể hiện trực quan các ô nguồn cấp dữ liệu trực tiếp vào công thức của ô đang chọn.'
      },
      difficulty: 'easy',
      topicId: 'excel_error_handling'
    },
    {
      id: 'excel_l13_q5',
      type: 'single_choice',
      question: {
        en: 'What causes the `#SPILL!` error in modern dynamic array formulas?',
        vi: 'Nguyên nhân nào gây ra lỗi `#SPILL!` trong các công thức mảng động hiện đại?'
      },
      options: [
        { en: 'One or more populated cells or merged cells are blocking the range where the array results need to expand', vi: 'Một hoặc nhiều ô có dữ liệu hoặc ô bị gộp đang cản trở vùng mà kết quả mảng cần mở rộng ra' },
        { en: 'The computer ran out of memory', vi: 'Máy tính bị hết bộ nhớ' },
        { en: 'The formula has a circular reference', vi: 'Công thức bị tham chiếu vòng lặp' },
        { en: 'The workbook is locked with a password', vi: 'Bảng tính bị khóa mật khẩu' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '#SPILL! occurs when an array formula attempts to return multiple values but non-empty cells obstruct the spill boundary.',
        vi: 'Lỗi #SPILL! xảy ra khi một công thức mảng muốn trả về nhiều giá trị nhưng các ô không trống cản đường biên tràn dữ liệu.'
      },
      difficulty: 'medium',
      topicId: 'excel_error_handling'
    },
    {
      id: 'excel_l13_q6',
      type: 'single_choice',
      question: {
        en: 'Which tool allows you to step through and debug each nested calculation inside a formula piece by piece?',
        vi: 'Công cụ nào cho phép bạn chạy từng bước và gỡ lỗi từng phép tính con lồng nhau bên trong công thức?'
      },
      options: [
        { en: 'Evaluate Formula (Formulas tab)', vi: 'Evaluate Formula (thẻ Formulas)' },
        { en: 'Goal Seek', vi: 'Goal Seek' },
        { en: 'Data Validation', vi: 'Data Validation' },
        { en: 'Conditional Formatting', vi: 'Conditional Formatting' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Evaluate Formula steps through underlined expressions sequentially to reveal intermediate calculation results.',
        vi: 'Evaluate Formula chạy tuần tự qua từng biểu thức được gạch chân để hiển thị kết quả tính toán trung gian.'
      },
      difficulty: 'easy',
      topicId: 'excel_error_handling'
    },
    {
      id: 'excel_l13_q7',
      type: 'single_choice',
      question: {
        en: 'What does `=ISBLANK(A1)` return if cell A1 contains an empty text string `""` produced by a formula?',
        vi: 'Công thức `=ISBLANK(A1)` trả về kết quả gì nếu ô A1 chứa một chuỗi văn bản rỗng `""` được tạo ra bởi một công thức?'
      },
      options: [
        { en: 'FALSE (the cell contains a formula returning a zero-length string, so it is not truly blank)', vi: 'FALSE (ô có chứa công thức trả về chuỗi độ dài bằng 0 nên không phải là ô thực sự trống)' },
        { en: 'TRUE', vi: 'TRUE' },
        { en: '#VALUE!', vi: '#VALUE!' },
        { en: '0', vi: '0' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ISBLANK returns TRUE only for completely empty, unpopulated cells with no content and no formula.',
        vi: 'ISBLANK chỉ trả về TRUE cho các ô hoàn toàn trống rỗng, không có dữ liệu và không chứa công thức nào.'
      },
      difficulty: 'hard',
      topicId: 'excel_error_handling'
    },
    {
      id: 'excel_l13_q8',
      type: 'single_choice',
      question: {
        en: 'What keyboard shortcut toggles between displaying calculated values and showing formula text in all cells?',
        vi: 'Phím tắt nào chuyển đổi qua lại giữa hiển thị giá trị tính toán và hiển thị mã công thức trong tất cả các ô?'
      },
      options: [
        { en: 'Ctrl + ` (grave accent / backtick)', vi: 'Ctrl + ` (dấu huyền / backtick)' },
        { en: 'Ctrl + F', vi: 'Ctrl + F' },
        { en: 'Alt + F4', vi: 'Alt + F4' },
        { en: 'Ctrl + Shift + F', vi: 'Ctrl + Shift + F' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Ctrl + ` toggles Show Formulas mode across the active worksheet.',
        vi: 'Ctrl + ` bật/tắt chế độ Show Formulas trên toàn bộ trang tính đang hoạt động.'
      },
      difficulty: 'easy',
      topicId: 'excel_error_handling'
    },
    {
      id: 'excel_l13_q9',
      type: 'true_false',
      question: {
        en: 'True or False: A circular reference warning occurs when a formula refers directly or indirectly to its own cell coordinate.',
        vi: 'Đúng hay Sai: Cảnh báo tham chiếu vòng (Circular Reference) xuất hiện khi một công thức tham chiếu trực tiếp hoặc gián tiếp đến chính tọa độ ô của nó.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. If cell A1 contains =A1 + 1, it creates an infinite feedback loop called a circular reference.',
        vi: 'Đúng. Nếu ô A1 chứa công thức =A1 + 1, nó tạo ra vòng lặp vô hạn gọi là tham chiếu vòng.'
      },
      difficulty: 'easy',
      topicId: 'excel_error_handling'
    },
    {
      id: 'excel_l13_q10',
      type: 'single_choice',
      question: {
        en: 'What does the `ISERROR()` function check for?',
        vi: 'Hàm `ISERROR()` kiểm tra điều gì?'
      },
      options: [
        { en: 'Returns TRUE if the cell contains ANY error value (#N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, #NULL!)', vi: 'Trả về TRUE nếu ô chứa BẤT KỲ giá trị lỗi nào (#N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, #NULL!)' },
        { en: 'Returns TRUE only for spelling errors', vi: 'Chỉ trả về TRUE cho lỗi chính tả' },
        { en: 'Returns TRUE only for #N/A', vi: 'Chỉ trả về TRUE cho lỗi #N/A' },
        { en: 'Fixes the error automatically', vi: 'Tự động sửa lỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'ISERROR tests for all possible Excel error types and returns a boolean TRUE or FALSE.',
        vi: 'ISERROR kiểm tra tất cả các kiểu lỗi có thể có trong Excel và trả về giá trị logic TRUE hoặc FALSE.'
      },
      difficulty: 'easy',
      topicId: 'excel_error_handling'
    }
  ]
};

saveLesson('lesson13.ts', 'lesson13', lesson13);

// Create Intermediate Module 01 index
const intMod01IndexCode = `import { Lesson } from '../../../../types';
import { lesson09 } from './lesson09';
import { lesson10 } from './lesson10';
import { lesson11 } from './lesson11';
import { lesson12 } from './lesson12';
import { lesson13 } from './lesson13';

export { lesson09 } from './lesson09';
export { lesson10 } from './lesson10';
export { lesson11 } from './lesson11';
export { lesson12 } from './lesson12';
export { lesson13 } from './lesson13';

export const module01Lessons: Lesson[] = [
  lesson09,
  lesson10,
  lesson11,
  lesson12,
  lesson13,
];

export default module01Lessons;
`;

fs.writeFileSync(path.join(intMod01Dir, 'index.ts'), intMod01IndexCode, 'utf8');
console.log('Intermediate Module 01 completed (Lessons 09-13).');
