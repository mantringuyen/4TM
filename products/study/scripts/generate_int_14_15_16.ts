import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const intMod02Dir = path.join(process.cwd(), 'src/data/excel/intermediate/module02');
fs.mkdirSync(intMod02Dir, { recursive: true });

function saveLesson(filename: string, varName: string, lesson: Lesson) {
  const code = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lesson, null, 2)};\nexport default ${varName};\n`;
  fs.writeFileSync(path.join(intMod02Dir, filename), code, 'utf8');
  console.log(`Saved ${filename} (${lesson.id})`);
}

// =========================================================================
// LESSON 14: Dynamic Array Formulas & Spill Ranges (FILTER, UNIQUE, SORT, SEQUENCE)
// New ID: excel_lesson_dynamic_arrays
// =========================================================================
export const lesson14: Lesson = {
  id: 'excel_lesson_dynamic_arrays',
  order: 14,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_dynamic_arrays',
  title: {
    en: 'Dynamic Array Formulas & Spill Engine: FILTER, UNIQUE, SORT, SORTBY & SEQUENCE',
    vi: 'Công Thức Mảng Động & Cơ Chế Tràn: FILTER, UNIQUE, SORT, SORTBY & SEQUENCE'
  },
  summary: {
    en: 'Master Microsoft 365\'s Dynamic Array engine: single formulas returning multi-cell ranges, the Spill Range operator (#), live dataset extraction with FILTER, deduplication with UNIQUE, multi-key ordering with SORTBY, and programmatic grid generation with SEQUENCE.',
    vi: 'Làm chủ cơ chế Mảng Động của Microsoft 365: một công thức duy nhất tự động trả về dải ô nhiều dòng cột, toán tử vùng tràn Spill (#), lọc dữ liệu trực tiếp với FILTER, loại bỏ trùng lặp với UNIQUE, sắp xếp đa cấp với SORTBY và tạo chuỗi số tự động với SEQUENCE.'
  },
  learn: {
    introduction: {
      en: 'In legacy Excel, a formula in one cell could only return one value unless entered with complex Ctrl+Shift+Enter array gymnastics. The modern Dynamic Array Calculation Engine changes everything: a single formula automatically "spills" an entire matrix of results into neighboring cells, resizing dynamically as underlying records grow.',
      vi: 'Trong các phiên bản Excel cũ, một công thức trong một ô chỉ có thể trả về một giá trị duy nhất trừ khi dùng tổ hợp phím phức tạp Ctrl+Shift+Enter. Cơ chế Tính toán Mảng Động hiện đại thay đổi hoàn toàn: một công thức duy nhất tự động "tràn" (spill) toàn bộ ma trận kết quả sang các ô lân cận và tự động co giãn khi dữ liệu gốc thay đổi.'
    },
    conceptExplanation: {
      en: `### 1. The Dynamic Array Revolution & The Spill Operator (#)
When a formula returns multiple values, Excel automatically spills them into surrounding blank cells.
- **The Spill Range Operator (\`#\`)**: To reference the entire dynamic spill results starting at cell \`F2\`, simply write \`=F2#\`. If the spill range grows from 5 rows to 500 rows, \`=SUM(F2#)\` automatically adjusts without editing the formula!

### 2. The Core Dynamic Array Functions
- **\`=FILTER(array, include, [if_empty])\`**: Returns all rows from \`array\` that meet the boolean condition in \`include\`.
  - Multi-Criteria AND: \`=FILTER(A2:D100, (B2:B100="West") * (C2:C100>5000))\`
  - Multi-Criteria OR: \`=FILTER(A2:D100, (B2:B100="West") + (B2:B100="East"))\`
- **\`=UNIQUE(array, [by_col], [exactly_once])\`**: Returns distinct unique values from a column or table.
- **\`=SORT(array, [sort_index], [sort_order], [by_col])\`**: Sorts range by column index (1 for Ascending, -1 for Descending).
- **\`=SORTBY(array, by_array1, [order1], ...)\`**: Sorts a range based on another independent vector without that vector being inside the returned array.
- **\`=SEQUENCE(rows, [columns], [start], [step])\`**: Generates a matrix grid of sequential numbers (e.g. \`=SEQUENCE(12, 1, 1, 1)\` creates numbers 1 through 12).`,
      vi: `### 1. Cách Mạng Mảng Động & Toán Tử Vùng Tràn (#)
Khi một công thức trả về nhiều giá trị, Excel tự động tràn chúng sang các ô trống liền kề.
- **Toán tử vùng tràn (\`#\`)**: Để tham chiếu toàn bộ kết quả mảng động bắt đầu từ ô \`F2\`, chỉ cần viết \`=F2#\`. Nếu vùng tràn mở rộng từ 5 dòng lên 500 dòng, \`=SUM(F2#)\` sẽ tự động cập nhật mà không cần sửa công thức!

### 2. Các Hàm Mảng Động Cốt Lõi
- **\`=FILTER(mang, dieu_kien_loc, [neu_rong])\`**: Trích xuất tất cả các dòng từ \`mang\` thỏa mãn điều kiện logic trong \`dieu_kien_loc\`.
  - Đa điều kiện VÀ: \`=FILTER(A2:D100, (B2:B100="West") * (C2:C100>5000))\`
  - Đa điều kiện HOẶC: \`=FILTER(A2:D100, (B2:B100="West") + (B2:B100="East"))\`
- **\`=UNIQUE(mang, [theo_cot], [chi_xuat_hien_1_lan])\`**: Trả về danh sách các giá trị duy nhất không trùng lặp từ một cột hoặc bảng.
- **\`=SORT(mang, [cot_sap_xep], [chieu_sap_xep], [theo_cot])\`**: Sắp xếp dải ô theo số thứ tự cột (1 là Tăng dần, -1 là Giảm dần).
- **\`=SORTBY(mang, mang_tieu_chi1, [chieu1], ...)\`**: Sắp xếp dải ô dựa trên một cột tiêu chí độc lập khác.
- **\`=SEQUENCE(so_hang, [so_cot], [bat_dau], [buoc_nhay])\`**: Tạo ma trận các số thứ tự liên tiếp (ví dụ: \`=SEQUENCE(12, 1, 1, 1)\` tạo các số từ 1 đến 12).`
    },
    syntax: `# Dynamic Array Formulas:
=FILTER(A2:D100, B2:B100 = "North", "No records")
=UNIQUE(A2:A500)
=SORT(UNIQUE(A2:A500))
=SORTBY(A2:C100, D2:D100, -1)
=SEQUENCE(10, 1, 100, 10)

# Spill Range Reference:
=COUNTA(F2#)
=SUM(G2#)`,
    examples: [
      {
        title: { en: 'Live Sorted Unique Dropdown Source', vi: 'Tạo Nguồn Danh Sách Duy Nhất Đã Sắp Xếp Tự Động' },
        code: `Raw Customer Names in A2:A500 with many duplicates

Formula in F2: =SORT(UNIQUE(A2:A500))
Result: Automatically generates an alphabetical list of unique customer names.`,
        description: {
          en: 'Combining SORT and UNIQUE creates a dynamic dimension table that updates whenever new names are typed.',
          vi: 'Kết hợp SORT và UNIQUE tạo ra danh mục khách hàng duy nhất tự động cập nhật khi có tên mới.'
        }
      },
      {
        title: { en: 'Multi-Condition FILTER for VIP High-Value Deals', vi: 'Lọc Đa Điều Kiện Khách Hàng VIP Giao Dịch Lớn Bằng FILTER' },
        code: `Orders Table in A2:E1000 (Col B: Status, Col D: Revenue)

Formula in G2: =FILTER(A2:E1000, (B2:B1000="VIP") * (D2:D1000>=50000), "No VIP Deals")`,
        description: {
          en: 'Multiplying boolean conditions with (*) enforces AND logic inside dynamic array formulas.',
          vi: 'Nhân các điều kiện logic bằng dấu sao (*) áp dụng logic VÀ trong các công thức mảng động.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Encountering a #SPILL! error because a typed note or merged cell is occupying space in the formula\'s expansion path.',
          vi: 'Gặp lỗi #SPILL! do có ghi chú chữ hoặc ô bị gộp nằm chắn trên đường mở rộng kết quả của công thức.'
        },
        correction: {
          en: 'Delete blocking cell content or unmerge cells below and to the right of the dynamic formula.',
          vi: 'Xóa nội dung ô gây cản trở hoặc bỏ gộp ô ở phía dưới và bên phải của công thức mảng.'
        }
      },
      {
        mistake: {
          en: 'Using AND() or OR() inside FILTER() instead of math operators (* for AND, + for OR).',
          vi: 'Sử dụng hàm AND() hoặc OR() bên trong FILTER() thay vì toán tử số học (* cho VÀ, + cho HOẶC).'
        },
        correction: {
          en: 'AND/OR aggregate arrays to single values. Use boolean multiplication (*) for AND, and addition (+) for OR.',
          vi: 'AND/OR gộp mảng thành một giá trị đơn. Dùng phép nhân (*) cho điều kiện VÀ, và phép cộng (+) cho HOẶC.'
        }
      }
    ],
    tips: [
      { en: 'Spill Range Operator: Typing F2# references the entire dynamic array result block, regardless of its size.', vi: 'Toán tử vùng tràn: Gõ F2# sẽ tự động trỏ đến toàn bộ khối kết quả của mảng động dù độ dài là bao nhiêu dòng.' },
      { en: 'Dynamic Month Headers: Use =TEXT(DATE(2026, SEQUENCE(1, 12, 1, 1), 1), "mmm") to generate 12 monthly column headers across a row in a single cell!', vi: 'Tạo tiêu đề 12 tháng tự động: Dùng =TEXT(DATE(2026, SEQUENCE(1, 12, 1, 1), 1), "mmm") để tạo tiêu đề 12 tháng chỉ trong 1 ô!' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l14_ex1',
      type: 'complete_code',
      title: { en: 'Extract Unique Sorted Region Names', vi: 'Trích Xuất Danh Sách Vùng Duy Nhất Đã Sắp Xếp' },
      instruction: {
        en: 'Write a formula combining SORT and UNIQUE to generate an alphabetized list of unique regions from A2:A100.',
        vi: 'Viết công thức kết hợp SORT và UNIQUE để tạo danh sách các vùng duy nhất đã sắp xếp theo bảng chữ cái từ A2:A100.'
      },
      starterCode: '=SORT(UNIQUE(',
      solutionCode: '=SORT(UNIQUE(A2:A100))',
      expectedOutput: '=SORT(UNIQUE(A2:A100))',
      hint: { en: 'Pass range A2:A100 inside UNIQUE and wrap with SORT.', vi: 'Truyền dải ô A2:A100 vào trong UNIQUE và bọc bằng SORT.' },
      explanation: { en: '=SORT(UNIQUE(A2:A100)) deduplicates region names and sorts them alphabetically.', vi: '=SORT(UNIQUE(A2:A100)) loại bỏ trùng lặp và sắp xếp tên vùng theo thứ tự chữ cái.' }
    },
    {
      id: 'excel_l14_ex2',
      type: 'complete_code',
      title: { en: 'Filter Active Status Records', vi: 'Lọc Các Bản Ghi Trạng Thái Active' },
      instruction: {
        en: 'Write a FILTER formula to extract all rows from data table A2:D50 where Status in column C (C2:C50) equals "Active". Return "No Active" if empty.',
        vi: 'Viết công thức FILTER trích xuất tất cả các dòng từ bảng A2:D50 có Trạng thái ở cột C (C2:C50) là "Active". Trả về "No Active" nếu rỗng.'
      },
      starterCode: '=FILTER(A2:D50, ',
      solutionCode: '=FILTER(A2:D50, C2:C50="Active", "No Active")',
      expectedOutput: '=FILTER(A2:D50, C2:C50="Active", "No Active")',
      hint: { en: 'Pass array A2:D50, include C2:C50="Active", and if_empty "No Active".', vi: 'Truyền mảng A2:D50, điều kiện C2:C50="Active", và nếu rỗng là "No Active".' },
      explanation: { en: 'FILTER extracts all matching rows dynamically and spills the result.', vi: 'FILTER trích xuất động tất cả các dòng khớp và tràn kết quả ra trang tính.' }
    }
  ],
  challenge: {
    id: 'excel_l14_challenge',
    title: { en: 'Build Multi-Criteria Filter and Sort Pipeline', vi: 'Xây Dựng Quy Trình Lọc Và Sắp Xếp Đa Tiêu Chí' },
    description: {
      en: 'Construct a formula to filter table A2:D200 for rows where Region in B2:B200 is "West" AND Sales in D2:D200 >= 10000, and sort the resulting filtered array descending by the Sales column (column index 4).',
      vi: 'Xây dựng công thức lọc bảng A2:D200 lấy các dòng có Khu vực ở B2:B200 là "West" VÀ Doanh số ở D2:D200 >= 10000, sau đó sắp xếp mảng kết quả giảm dần theo cột Doanh số (cột thứ 4).'
    },
    requirements: [
      { en: 'Use FILTER with boolean multiplication (*) for the AND condition', vi: 'Sử dụng FILTER với phép nhân logic (*) cho điều kiện VÀ' },
      { en: 'Wrap the FILTER result inside SORT by column index 4 descending (-1)', vi: 'Bọc kết quả FILTER bên trong SORT theo cột 4 giảm dần (-1)' }
    ],
    starterCode: '=',
    solutionCode: '=SORT(FILTER(A2:D200, (B2:B200="West")*(D2:D200>=10000), "None"), 4, -1)',
    hints: [
      { en: 'Syntax: =SORT(FILTER(A2:D200, (B2:B200="West")*(D2:D200>=10000), "None"), 4, -1)', vi: 'Cú pháp: =SORT(FILTER(A2:D200, (B2:B200="West")*(D2:D200>=10000), "None"), 4, -1)' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l14_q1',
      type: 'single_choice',
      question: {
        en: 'What symbol is used in Excel to reference the entire dynamic spill range originating at cell F2?',
        vi: 'Ký hiệu nào được dùng trong Excel để tham chiếu toàn bộ vùng tràn động bắt đầu từ ô F2?'
      },
      options: [
        { en: '`F2#` (The Spill Range Operator)', vi: '`F2#` (Toán tử vùng tràn Spill)' },
        { en: '`F2*`', vi: '`F2*`' },
        { en: '`F2:ALL`', vi: '`F2:ALL`' },
        { en: '`$F$2:SPILL`', vi: '`$F$2:SPILL`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The hashtag (#) appended to the top-left cell reference dynamically refers to the full array spill footprint.',
        vi: 'Dấu thăng (#) đặt sau ô gốc phía trên bên trái sẽ tự động trỏ đến toàn bộ kích thước của vùng tràn mảng động.'
      },
      difficulty: 'easy',
      topicId: 'excel_dynamic_arrays'
    },
    {
      id: 'excel_l14_q2',
      type: 'single_choice',
      question: {
        en: 'How do you express an `AND` condition between two ranges inside the `FILTER` function?',
        vi: 'Làm thế nào để biểu thị điều kiện `VÀ` (AND) giữa hai dải ô bên trong hàm `FILTER`?'
      },
      options: [
        { en: 'Multiply the boolean expressions: `(Range1 = "Val1") * (Range2 > 100)`', vi: 'Nhân các biểu thức logic: `(Vung1 = "Val1") * (Vung2 > 100)`' },
        { en: 'Use the `AND()` function: `AND(Range1 = "Val1", Range2 > 100)`', vi: 'Dùng hàm `AND()`: `AND(Vung1 = "Val1", Vung2 > 100)`' },
        { en: 'Use the ampersand `&` operator', vi: 'Dùng toán tử và `&`' },
        { en: 'Separate them with commas inside include', vi: 'Phân cách bằng dấu phẩy trong đối số include' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In array formulas, boolean multiplication (*) performs element-by-element AND logic (TRUE * TRUE = 1, TRUE * FALSE = 0).',
        vi: 'Trong công thức mảng, phép nhân logic (*) thực hiện logic VÀ theo từng phần tử (TRUE * TRUE = 1, TRUE * FALSE = 0).'
      },
      difficulty: 'medium',
      topicId: 'excel_dynamic_arrays'
    },
    {
      id: 'excel_l14_q3',
      type: 'single_choice',
      question: {
        en: 'What does `=SEQUENCE(5, 1, 10, 2)` generate in Excel?',
        vi: 'Công thức `=SEQUENCE(5, 1, 10, 2)` tạo ra chuỗi giá trị nào trong Excel?'
      },
      options: [
        { en: 'A column of 5 numbers starting at 10 incrementing by 2: `10, 12, 14, 16, 18`', vi: 'Một cột gồm 5 số bắt đầu từ 10 với bước nhảy 2: `10, 12, 14, 16, 18`' },
        { en: 'A 5x5 grid of numbers', vi: 'Một bảng số kích thước 5x5' },
        { en: 'The numbers 5, 10, 15, 20, 25', vi: 'Các số 5, 10, 15, 20, 25' },
        { en: 'A list of 10 numbers', vi: 'Danh sách gồm 10 số' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SEQUENCE(rows, columns, start, step) creates 5 rows, 1 column, starting at 10 with step 2 (10, 12, 14, 16, 18).',
        vi: 'SEQUENCE(so_hang, so_cot, bat_dau, buoc_nhay) tạo 5 hàng, 1 cột, bắt đầu từ 10 với bước nhảy 2 (10, 12, 14, 16, 18).'
      },
      difficulty: 'medium',
      topicId: 'excel_dynamic_arrays'
    },
    {
      id: 'excel_l14_q4',
      type: 'single_choice',
      question: {
        en: 'What does the function `=UNIQUE(A2:A20)` do?',
        vi: 'Hàm `=UNIQUE(A2:A20)` làm nhiệm vụ gì?'
      },
      options: [
        { en: 'Extracts a deduplicated list containing only distinct items from range A2:A20', vi: 'Trích xuất danh sách không trùng lặp chỉ gồm các phần tử riêng biệt từ vùng A2:A20' },
        { en: 'Checks if all numbers are prime', vi: 'Kiểm tra xem tất cả các số có phải số nguyên tố không' },
        { en: 'Counts total unique items', vi: 'Đếm tổng số phần tử duy nhất' },
        { en: 'Deletes duplicate rows permanently from the sheet', vi: 'Xóa vĩnh viễn các dòng trùng lặp khỏi trang tính' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'UNIQUE evaluates the input vector and outputs a spilled dynamic array of unique items.',
        vi: 'Hàm UNIQUE đánh giá mảng đầu vào và xuất ra mảng tràn động các phần tử duy nhất.'
      },
      difficulty: 'easy',
      topicId: 'excel_dynamic_arrays'
    },
    {
      id: 'excel_l14_q5',
      type: 'single_choice',
      question: {
        en: 'How do you express an `OR` condition between criteria inside `FILTER`?',
        vi: 'Làm thế nào để biểu thị điều kiện `HOẶC` (OR) giữa các tiêu chí bên trong hàm `FILTER`?'
      },
      options: [
        { en: 'Add the boolean expressions together using the plus operator: `(Range1="A") + (Range1="B")`', vi: 'Cộng các biểu thức logic lại với nhau bằng toán tử cộng: `(Vung1="A") + (Vung1="B")`' },
        { en: 'Use `OR(Range1="A", Range1="B")`', vi: 'Dùng `OR(Vung1="A", Vung1="B")`' },
        { en: 'Use the `||` symbol', vi: 'Dùng ký hiệu `||`' },
        { en: 'Nest two FILTER functions', vi: 'Lồng hai hàm FILTER' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Boolean addition (+) produces values >= 1 for any row where at least one condition evaluates to TRUE, acting as OR.',
        vi: 'Phép cộng logic (+) tạo ra giá trị >= 1 cho bất kỳ dòng nào có ít nhất một điều kiện là TRUE, đóng vai trò là logic HOẶC.'
      },
      difficulty: 'medium',
      topicId: 'excel_dynamic_arrays'
    },
    {
      id: 'excel_l14_q6',
      type: 'single_choice',
      question: {
        en: 'What parameter in `SORT` determines descending order?',
        vi: 'Tham số nào trong `SORT` quy định sắp xếp theo thứ tự giảm dần?'
      },
      options: [
        { en: '`sort_order` set to `-1`', vi: '`sort_order` đặt là `-1`' },
        { en: '`sort_order` set to `1`', vi: '`sort_order` đặt là `1`' },
        { en: '`"DESC"`', vi: '`"DESC"`' },
        { en: '`FALSE`', vi: '`FALSE`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '1 represents Ascending order (A-Z, 0-9); -1 represents Descending order (Z-A, 9-0).',
        vi: '1 biểu thị thứ tự Tăng dần (A-Z, 0-9); -1 biểu thị thứ tự Giảm dần (Z-A, 9-0).'
      },
      difficulty: 'easy',
      topicId: 'excel_dynamic_arrays'
    },
    {
      id: 'excel_l14_q7',
      type: 'true_false',
      question: {
        en: 'True or False: A single dynamic array formula is entered into one cell, but automatically populates multiple surrounding cells without dragging.',
        vi: 'Đúng hay Sai: Một công thức mảng động chỉ được nhập vào một ô duy nhất nhưng tự động điền kết quả vào nhiều ô xung quanh mà không cần kéo sao chép.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Dynamic arrays automatically spill down rows and across columns from the single formula origin cell.',
        vi: 'Đúng. Mảng động tự động tràn xuống các hàng và qua các cột từ một ô gốc chứa công thức duy nhất.'
      },
      difficulty: 'easy',
      topicId: 'excel_dynamic_arrays'
    },
    {
      id: 'excel_l14_q8',
      type: 'single_choice',
      question: {
        en: 'What is the main difference between `SORT` and `SORTBY` in Excel?',
        vi: 'Sự khác biệt chính giữa `SORT` và `SORTBY` trong Excel là gì?'
      },
      options: [
        { en: 'SORT sorts by a column index inside the array; SORTBY sorts based on external/independent arrays or multiple custom vectors', vi: 'SORT sắp xếp theo số thứ tự cột bên trong mảng; SORTBY sắp xếp dựa trên các mảng tiêu chí độc lập bên ngoài hoặc nhiều vector tùy chỉnh' },
        { en: 'SORT is for numbers; SORTBY is for text', vi: 'SORT dành cho số; SORTBY dành cho văn bản' },
        { en: 'SORTBY only sorts alphabetically', vi: 'SORTBY chỉ sắp xếp theo bảng chữ cái' },
        { en: 'There is no difference', vi: 'Không có sự khác biệt nào' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SORT uses internal column index numbers (e.g. 2). SORTBY allows passing external range vectors to control sort hierarchy.',
        vi: 'SORT sử dụng số thứ tự cột nội bộ (ví dụ 2). SORTBY cho phép truyền các vector vùng bên ngoài để kiểm soát thứ tự phân cấp sắp xếp.'
      },
      difficulty: 'medium',
      topicId: 'excel_dynamic_arrays'
    },
    {
      id: 'excel_l14_q9',
      type: 'single_choice',
      question: {
        en: 'If cell J2 contains `=FILTER(A2:B100, C2:C100="VIP")`, how would you count how many VIP rows were returned?',
        vi: 'Nếu ô J2 chứa công thức `=FILTER(A2:B100, C2:C100="VIP")`, bạn sẽ đếm xem có bao nhiêu dòng VIP được trả về như thế nào?'
      },
      options: [
        { en: '`=ROWS(J2#)`', vi: '`=ROWS(J2#)`' },
        { en: '`=COUNT(J2)`', vi: '`=COUNT(J2)`' },
        { en: '`=SUM(J2)`', vi: '`=SUM(J2)`' },
        { en: '`=FILTERCOUNT(J2)`', vi: '`=FILTERCOUNT(J2)`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Using ROWS(J2#) measures the vertical row dimension of the dynamic spill footprint.',
        vi: 'Dùng ROWS(J2#) sẽ đo lường chính xác số lượng hàng theo chiều dọc của toàn bộ vùng tràn động.'
      },
      difficulty: 'medium',
      topicId: 'excel_dynamic_arrays'
    },
    {
      id: 'excel_l14_q10',
      type: 'single_choice',
      question: {
        en: 'What happens if the `[if_empty]` argument in the `FILTER` function is omitted and no matching records are found?',
        vi: 'Điều gì xảy ra nếu đối số `[if_empty]` trong hàm `FILTER` bị bỏ qua và không tìm thấy bản ghi nào khớp?'
      },
      options: [
        { en: 'Excel returns the `#CALC!` error', vi: 'Excel trả về lỗi `#CALC!`' },
        { en: 'Excel returns a blank cell', vi: 'Excel trả về ô trống' },
        { en: 'Excel returns 0', vi: 'Excel trả về 0' },
        { en: 'Excel crashes', vi: 'Excel bị sập' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'If FILTER encounters an empty result set without an [if_empty] handler, it raises the #CALC! (Calculation error) warning.',
        vi: 'Nếu FILTER gặp tập kết quả rỗng mà không có tham số [if_empty], nó sẽ phát sinh cảnh báo lỗi #CALC! (Lỗi tính toán).'
      },
      difficulty: 'hard',
      topicId: 'excel_dynamic_arrays'
    }
  ]
};

saveLesson('lesson14.ts', 'lesson14', lesson14);

// =========================================================================
// LESSON 15: Excel Tables & Structured References (ListObject, [@Column], Slicers)
// Preserved ID: excel_lesson_tables
// =========================================================================
export const lesson15: Lesson = {
  id: 'excel_lesson_tables',
  order: 15,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_tables',
  title: {
    en: 'Excel Tables (ListObjects), Structured Referencing & Interactive Slicers',
    vi: 'Bảng Excel (ListObjects), Tham Chiếu Cấu Trúc & Slicers Tương Tác'
  },
  summary: {
    en: 'Elevate flat spreadsheet grids into robust database ListObjects: Ctrl + T conversion, human-readable structured reference syntax (TableName[@Column]), automatic formula expansion, dynamic chart auto-updating, Total Row aggregations, and visual Slicer dashboards.',
    vi: 'Nâng cấp lưới bảng tính phẳng thành cấu trúc cơ sở dữ liệu ListObjects mạnh mẽ: chuyển đổi bằng Ctrl + T, cú pháp tham chiếu cấu trúc trực quan (TenBang[@TenCot]), tự động mở rộng công thức, biểu đồ tự cập nhật theo dữ liệu mới, dòng Total Row và bảng điều khiển Slicer trực quan.'
  },
  learn: {
    introduction: {
      en: 'Standard cell ranges (A2:F100) are static and error-prone: when new rows are appended at the bottom, existing formulas, PivotTables, and charts do not automatically expand to include them. Converting a range into an official Excel Table (ListObject) transforms data into a self-expanding database container with intelligent structured referencing.',
      vi: 'Dải ô tiêu chuẩn (A2:F100) có tính tĩnh và dễ gây lỗi: khi các hàng mới được thêm vào cuối bảng, các công thức, PivotTable và biểu đồ hiện có không tự động mở rộng để bao gồm chúng. Chuyển đổi dải ô thành Bảng Excel chính thức (ListObject) biến dữ liệu thành vùng cơ sở dữ liệu tự động mở rộng kèm cú pháp tham chiếu cấu trúc thông minh.'
    },
    conceptExplanation: {
      en: `### 1. Creating and Configuring an Excel Table
- **Keyboard Shortcut**: Select any cell inside your data and press **Ctrl + T** (or Cmd + T on Mac).
- **Naming Tables**: Always give your table a clean, descriptive name on the *Table Design* tab (e.g. \`OrdersTable\`, \`EmployeeRoster\`).

### 2. Structured Reference Syntax
Instead of cryptic cell coordinates like \`=B2 * $C$1\`, Tables use self-documenting syntax:
- **Same-row value**: \`=[@Quantity] * [@UnitPrice]\` (The \`@\` symbol represents "this current row").
- **Entire column across the sheet**: \`=SUM(OrdersTable[Revenue])\`
- **Multiple columns**: \`OrdersTable[[#Data], [Quantity]:[Revenue]]\`
- **Headers Row**: \`OrdersTable[#Headers]\`
- **Total Row**: \`OrdersTable[#Totals]\`
- **All Data & Headers & Totals**: \`OrdersTable[#All]\`

### 3. Key Benefits of Official Tables
1. **Auto-Calculated Columns**: Enter a formula in one cell, and it automatically propagates to every row in the column.
2. **Self-Expanding Boundaries**: Adding new rows or columns automatically expands formatting, formulas, and chart series.
3. **Interactive Slicers**: Visual graphic filtering buttons on the Table Design tab (Insert Slicer).`,
      vi: `### 1. Tạo & Cấu Hình Bảng Excel (Table)
- **Phím tắt tạo bảng**: Chọn bất kỳ ô nào trong vùng dữ liệu và nhấn **Ctrl + T** (hoặc Cmd + T trên Mac).
- **Đặt tên bảng**: Luôn đặt tên gợi nhớ cho bảng trên thẻ *Table Design* (ví dụ: \`OrdersTable\`, \`EmployeeRoster\`).

### 2. Cú Pháp Tham Chiếu Có Cấu Trúc (Structured References)
Thay vì các tọa độ ô khó hiểu như \`=B2 * $C$1\`, Bảng sử dụng cú pháp tự ghi chú tài liệu:
- **Giá trị trên cùng hàng**: \`=[@Quantity] * [@UnitPrice]\` (Ký tự \`@\` đại diện cho "dòng hiện tại này").
- **Toàn bộ cột từ bất kỳ đâu**: \`=SUM(OrdersTable[Revenue])\`
- **Nhiều cột liên tiếp**: \`OrdersTable[[#Data], [Quantity]:[Revenue]]\`
- **Dòng tiêu đề**: \`OrdersTable[#Headers]\`
- **Dòng tổng kết**: \`OrdersTable[#Totals]\`
- **Toàn bộ bảng gồm cả tiêu đề & dòng tổng**: \`OrdersTable[#All]\`

### 3. Các Lợi Ích Vượt Trội Của Excel Table
1. **Tự động điền cột tính toán**: Nhập công thức vào một ô, công thức sẽ tự động nhân bản xuống tất cả các hàng trong cột.
2. **Tự động mở rộng biên**: Thêm dòng mới hoặc cột mới sẽ tự động kéo theo định dạng, công thức và dữ liệu biểu đồ.
3. **Bộ lọc Slicers Trực Quan**: Các nút bấm lọc đồ họa tương tác trên thẻ Table Design (Insert Slicer).`
    },
    syntax: `# Structured Formula Inside Table:
=[@Sales] * (1 - [@Discount])

# Formula Outside Table Referencing Table:
=SUM(SalesTable[Revenue])
=AVERAGE(SalesTable[ProfitMargin])
=XLOOKUP(A2, ProductsTable[SKU], ProductsTable[Price])`,
    examples: [
      {
        title: { en: 'Calculating Net Profit Column with Structured References', vi: 'Tính Cột Lợi Nhuận Ròng Bằng Tham Chiếu Cấu Trúc' },
        code: `Table Named: 'Financials'
Columns: Revenue, COGS, Tax

Formula entered in new column 'NetProfit':
=[@Revenue] - [@COGS] - [@Tax]

Result: Instantly calculates across all 50,000 rows automatically!`,
        description: {
          en: 'Structured references make business logic crystal clear without tracking row coordinate numbers.',
          vi: 'Tham chiếu cấu trúc làm cho logic nghiệp vụ cực kỳ rõ ràng mà không cần bận tâm đến số thứ tự dòng.'
        }
      },
      {
        title: { en: 'Dynamic Summary Metric Outside the Table', vi: 'Chỉ Số Tóm Tắt Động Bên Ngoài Bảng' },
        code: `Total Revenue in KPI Card: =SUM(Financials[Revenue])
Average Deal Size:        =AVERAGE(Financials[Revenue])
Total Order Count:        =COUNTA(Financials[OrderID])`,
        description: {
          en: 'When new invoices are added to Financials, these summary metrics automatically recalculate to include the new rows.',
          vi: 'Khi hóa đơn mới được thêm vào bảng Financials, các chỉ số tóm tắt này tự động tính toán lại bao gồm các dòng mới.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Leaving default table names like Table1, Table2, Table3, making complex formulas incomprehensible.',
          vi: 'Để nguyên tên bảng mặc định như Table1, Table2, Table3 khiến các công thức phức tạp trở nên khó hiểu.'
        },
        correction: {
          en: 'Immediately rename every table under Table Design -> Table Name to a descriptive PascalCase identifier (e.g. Sales2026).',
          vi: 'Đổi tên bảng ngay lập tức trong Table Design -> Table Name thành tên có nghĩa (ví dụ Sales2026).'
        }
      }
    ],
    tips: [
      { en: 'Toggle Total Row: Press Ctrl + Shift + T while inside an Excel Table to instantly toggle the summary Total Row on and off.', vi: 'Bật/tắt dòng Total Row: Nhấn Ctrl + Shift + T khi đang ở trong Bảng để bật/tắt nhanh dòng tổng kết.' },
      { en: 'Quick Table Slicers: Add Slicers to filter table records with single clicks, creating dashboard-style visual controls.', vi: 'Slicers cho Bảng: Thêm Slicers để lọc các dòng trong bảng chỉ bằng một cú nhấp chuột, tạo bảng điều khiển tương tác.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l15_ex1',
      type: 'complete_code',
      title: { en: 'Structured Reference Same-Row Revenue Calculation', vi: 'Tính Doanh Thu Cùng Hàng Bằng Tham Chiếu Cấu Trúc' },
      instruction: {
        en: 'Write the structured formula for a new table column to calculate Total by multiplying [@Quantity] by [@UnitPrice].',
        vi: 'Viết công thức có cấu trúc cho cột mới trong bảng để tính Total bằng cách nhân [@Quantity] với [@UnitPrice].'
      },
      starterCode: '=[@Quantity] * ',
      solutionCode: '=[@Quantity] * [@UnitPrice]',
      expectedOutput: '=[@Quantity] * [@UnitPrice]',
      hint: { en: 'Multiply [@Quantity] with [@UnitPrice].', vi: 'Nhân [@Quantity] với [@UnitPrice].' },
      explanation: { en: 'The @ symbol denotes values located on the current evaluated row of the table.', vi: 'Ký tự @ biểu thị giá trị nằm trên chính hàng hiện tại đang được tính toán của bảng.' }
    },
    {
      id: 'excel_l15_ex2',
      type: 'complete_code',
      title: { en: 'Sum Entire Column of Named Table', vi: 'Tính Tổng Toàn Bộ Cột Của Bảng Đã Đặt Tên' },
      instruction: {
        en: 'Write a formula outside the table to calculate the total sum of the "Amount" column from table named "OrdersTable".',
        vi: 'Viết công thức bên ngoài bảng để tính tổng toàn bộ cột "Amount" từ bảng có tên "OrdersTable".'
      },
      starterCode: '=SUM(',
      solutionCode: '=SUM(OrdersTable[Amount])',
      expectedOutput: '=SUM(OrdersTable[Amount])',
      hint: { en: 'Use TableName[ColumnName] inside SUM().', vi: 'Dùng cú pháp TenBang[TenCot] bên trong hàm SUM().' },
      explanation: { en: '=SUM(OrdersTable[Amount]) computes the total across the entire named table column dynamically.', vi: '=SUM(OrdersTable[Amount]) tính tổng toàn bộ cột bảng đã đặt tên một cách tự động.' }
    }
  ],
  challenge: {
    id: 'excel_l15_challenge',
    title: { en: 'Lookup Product Price Using Structured Table References', vi: 'Tra Cứu Giá Sản Phẩm Dùng Tham Chiếu Bảng Có Cấu Trúc' },
    description: {
      en: 'Construct an XLOOKUP formula to find ProductID in cell A2 within the SKU column of table "InventoryTable" and return the corresponding Price from the UnitPrice column of "InventoryTable".',
      vi: 'Xây dựng công thức XLOOKUP để tìm ProductID ở ô A2 trong cột SKU của bảng "InventoryTable" và trả về Đơn giá tương ứng từ cột UnitPrice của bảng "InventoryTable".'
    },
    requirements: [
      { en: 'Use XLOOKUP with cell A2', vi: 'Sử dụng XLOOKUP với ô A2' },
      { en: 'Reference lookup array as InventoryTable[SKU]', vi: 'Tham chiếu mảng tìm kiếm là InventoryTable[SKU]' },
      { en: 'Reference return array as InventoryTable[UnitPrice]', vi: 'Tham chiếu mảng trả về là InventoryTable[UnitPrice]' }
    ],
    starterCode: '=',
    solutionCode: '=XLOOKUP(A2, InventoryTable[SKU], InventoryTable[UnitPrice])',
    hints: [
      { en: 'Syntax: =XLOOKUP(A2, InventoryTable[SKU], InventoryTable[UnitPrice])', vi: 'Cú pháp: =XLOOKUP(A2, InventoryTable[SKU], InventoryTable[UnitPrice])' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l15_q1',
      type: 'single_choice',
      question: {
        en: 'What is the keyboard shortcut to convert an ordinary cell range into an official Excel Table?',
        vi: 'Phím tắt nào chuyển đổi một dải ô thông thường thành một Bảng Excel (Table) chính thức?'
      },
      options: [
        { en: 'Ctrl + T (or Ctrl + L)', vi: 'Ctrl + T (hoặc Ctrl + L)' },
        { en: 'Ctrl + Shift + B', vi: 'Ctrl + Shift + B' },
        { en: 'Alt + T + R', vi: 'Alt + T + R' },
        { en: 'Ctrl + Enter', vi: 'Ctrl + Enter' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Ctrl + T opens the Create Table dialog, converting the active range into a ListObject Table.',
        vi: 'Ctrl + T mở hộp thoại Create Table, chuyển đổi dải ô hiện tại thành một Bảng ListObject.'
      },
      difficulty: 'easy',
      topicId: 'excel_tables'
    },
    {
      id: 'excel_l15_q2',
      type: 'single_choice',
      question: {
        en: 'In structured reference syntax, what does the `@` symbol represent (e.g. `=[@Price]`)?',
        vi: 'Trong cú pháp tham chiếu có cấu trúc, ký tự `@` đại diện cho điều gì (ví dụ `=[@Price]`)?'
      },
      options: [
        { en: 'The value in the specified column on the current active row', vi: 'Giá trị trong cột được chỉ định trên chính hàng đang hoạt động hiện tại' },
        { en: 'An email address', vi: 'Một địa chỉ email' },
        { en: 'An absolute lock on the cell', vi: 'Một khóa tuyệt đối trên ô' },
        { en: 'An error flag', vi: 'Một cờ báo lỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The @ (implicit intersection operator) specifies that the calculation should evaluate the cell on the current row.',
        vi: 'Ký tự @ chỉ định rằng phép tính sẽ lấy giá trị của ô nằm trên cùng hàng hiện tại.'
      },
      difficulty: 'easy',
      topicId: 'excel_tables'
    },
    {
      id: 'excel_l15_q3',
      type: 'single_choice',
      question: {
        en: 'What happens to external formulas referencing `SalesTable[Revenue]` when you add 50 new rows to `SalesTable`?',
        vi: 'Điều gì xảy ra với các công thức bên ngoài tham chiếu `SalesTable[Revenue]` khi bạn thêm 50 dòng mới vào `SalesTable`?'
      },
      options: [
        { en: 'They automatically expand to include all 50 new rows without needing any formula adjustments', vi: 'Chúng tự động mở rộng để bao gồm cả 50 dòng mới mà không cần chỉnh sửa công thức' },
        { en: 'They break and return #REF!', vi: 'Chúng bị lỗi và trả về #REF!' },
        { en: 'You must manually re-drag the formula range', vi: 'Bạn phải kéo lại dải ô công thức thủ công' },
        { en: 'They only calculate the first 10 rows', vi: 'Chúng chỉ tính toán 10 dòng đầu' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Excel Tables are dynamic containers; column references automatically encompass newly appended rows.',
        vi: 'Bảng Excel là các vùng chứa động; các tham chiếu cột tự động bao quát toàn bộ các hàng mới được thêm vào.'
      },
      difficulty: 'easy',
      topicId: 'excel_tables'
    },
    {
      id: 'excel_l15_q4',
      type: 'single_choice',
      question: {
        en: 'What shortcut toggles the Total Row at the bottom of an Excel Table on and off?',
        vi: 'Phím tắt nào bật/tắt dòng Total Row ở dưới đáy của một Bảng Excel?'
      },
      options: [
        { en: 'Ctrl + Shift + T', vi: 'Ctrl + Shift + T' },
        { en: 'Alt + T', vi: 'Alt + T' },
        { en: 'Ctrl + Alt + S', vi: 'Ctrl + Alt + S' },
        { en: 'Shift + F11', vi: 'Shift + F11' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Ctrl + Shift + T toggles the summary Total Row on the active Excel Table.',
        vi: 'Ctrl + Shift + T bật/tắt dòng tổng kết Total Row trên Bảng Excel đang chọn.'
      },
      difficulty: 'medium',
      topicId: 'excel_tables'
    },
    {
      id: 'excel_l15_q5',
      type: 'single_choice',
      question: {
        en: 'What is a Table Slicer in Microsoft Excel?',
        vi: 'Table Slicer trong Microsoft Excel là gì?'
      },
      options: [
        { en: 'A visual interactive graphic button panel that filters table data with single clicks', vi: 'Một bảng nút bấm đồ họa tương tác trực quan giúp lọc dữ liệu bảng chỉ bằng các cú nhấp chuột' },
        { en: 'A tool that cuts rows permanently', vi: 'Một công cụ cắt các hàng vĩnh viễn' },
        { en: 'A chart type for pie charts', vi: 'Một loại biểu đồ tròn' },
        { en: 'A macro recorder', vi: 'Một trình ghi macro' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Slicers are visual filtering controls attached to Tables or PivotTables that allow users to filter categories interactively.',
        vi: 'Slicers là các bộ điều khiển lọc trực quan gắn liền với Bảng hoặc PivotTable cho phép người dùng lọc danh mục tương tác.'
      },
      difficulty: 'easy',
      topicId: 'excel_tables'
    },
    {
      id: 'excel_l15_q6',
      type: 'single_choice',
      question: {
        en: 'How do you refer to only the header cells of a table named `Clients` in a formula?',
        vi: 'Làm thế nào để chỉ tham chiếu đến các ô tiêu đề của bảng có tên `Clients` trong công thức?'
      },
      options: [
        { en: '`Clients[#Headers]`', vi: '`Clients[#Headers]`' },
        { en: '`Clients[@Headers]`', vi: '`Clients[@Headers]`' },
        { en: '`Clients.Headers`', vi: '`Clients.Headers`' },
        { en: '`#Headers!Clients`', vi: '`#Headers!Clients`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Clients[#Headers] targets exclusively the top header row of the table.',
        vi: 'Clients[#Headers] trỏ riêng biệt đến dòng tiêu đề trên cùng của bảng.'
      },
      difficulty: 'medium',
      topicId: 'excel_tables'
    },
    {
      id: 'excel_l15_q7',
      type: 'true_false',
      question: {
        en: 'True or False: Typing a formula into a single cell of an empty Table column automatically populates the entire column via calculated columns.',
        vi: 'Đúng hay Sai: Gõ một công thức vào một ô đơn lẻ của một cột Bảng đang trống sẽ tự động điền công thức cho toàn bộ cột đó.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Excel Tables feature auto-calculated columns that propagate formulas instantly to all existing and future rows.',
        vi: 'Đúng. Bảng Excel có tính năng cột tự động tính toán giúp truyền công thức ngay lập tức cho mọi dòng hiện tại và tương lai.'
      },
      difficulty: 'easy',
      topicId: 'excel_tables'
    },
    {
      id: 'excel_l15_q8',
      type: 'single_choice',
      question: {
        en: 'How do you convert an Excel Table back into a standard ordinary range if needed?',
        vi: 'Làm thế nào để chuyển đổi một Bảng Excel trở lại thành một dải ô thông thường nếu cần?'
      },
      options: [
        { en: 'Table Design tab -> Tools -> Convert to Range', vi: 'Thẻ Table Design -> Tools -> Convert to Range' },
        { en: 'Press Delete', vi: 'Nhấn phím Delete' },
        { en: 'Clear all formatting', vi: 'Xóa toàn bộ định dạng' },
        { en: 'Cut and paste as text', vi: 'Cắt và dán dưới dạng văn bản' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Convert to Range strips the ListObject wrapper while preserving all cell data and visual formatting.',
        vi: 'Convert to Range gỡ bỏ vỏ bọc ListObject trong khi vẫn giữ nguyên tất cả dữ liệu ô và định dạng trực quan.'
      },
      difficulty: 'medium',
      topicId: 'excel_tables'
    },
    {
      id: 'excel_l15_q9',
      type: 'single_choice',
      question: {
        en: 'Which function is automatically used by the Total Row in an Excel Table to ensure hidden/filtered rows are ignored in totals?',
        vi: 'Hàm nào được tự động sử dụng bởi dòng Total Row trong Bảng Excel để đảm bảo các dòng bị ẩn/bị lọc không bị tính vào tổng?'
      },
      options: [
        { en: 'SUBTOTAL (e.g. function number 109)', vi: 'SUBTOTAL (ví dụ số hàm 109)' },
        { en: 'SUM', vi: 'SUM' },
        { en: 'AGGREGATE_ONLY', vi: 'AGGREGATE_ONLY' },
        { en: 'HIDDENSUM', vi: 'HIDDENSUM' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Total Row uses SUBTOTAL so that filtering the table recalculates the totals to reflect only currently visible rows.',
        vi: 'Dòng Total Row sử dụng hàm SUBTOTAL để khi lọc bảng, số tổng sẽ tự tính lại chỉ phản ánh các dòng đang hiển thị.'
      },
      difficulty: 'medium',
      topicId: 'excel_tables'
    },
    {
      id: 'excel_l15_q10',
      type: 'single_choice',
      question: {
        en: 'What structured reference denotes the data body cells across two columns, "Price" and "Tax", in table `Sales`?',
        vi: 'Cú pháp tham chiếu có cấu trúc nào biểu thị các ô thân dữ liệu qua hai cột "Price" và "Tax" trong bảng `Sales`?'
      },
      options: [
        { en: '`Sales[[Price]:[Tax]]`', vi: '`Sales[[Price]:[Tax]]`' },
        { en: '`Sales[Price, Tax]`', vi: '`Sales[Price, Tax]`' },
        { en: '`Sales(Price:Tax)`', vi: '`Sales(Price:Tax)`' },
        { en: '`Sales.Price-Tax`', vi: '`Sales.Price-Tax`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Double square brackets with a colon between column names denotes a contiguous multi-column table range.',
        vi: 'Cặp ngoặc vuông kép với dấu hai chấm giữa tên các cột biểu thị một vùng dải nhiều cột liên tiếp trong bảng.'
      },
      difficulty: 'hard',
      topicId: 'excel_tables'
    }
  ]
};

saveLesson('lesson15.ts', 'lesson15', lesson15);

// =========================================================================
// LESSON 16: Data Validation, Dropdown Lists & Form Controls
// New ID: excel_lesson_data_validation
// =========================================================================
export const lesson16: Lesson = {
  id: 'excel_lesson_data_validation',
  order: 16,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_data_validation',
  title: {
    en: 'Data Validation, Defensive Input Constraints & Cascading Dependent Dropdowns',
    vi: 'Xác Thực Dữ Liệu, Ràng Buộc Nhập Liệu & Menu Thả Xuống Phụ Thuộc Đa Tầng'
  },
  summary: {
    en: 'Build defensive data intake interfaces: List validation, numeric range boundaries, custom regex-style formula rules, Input Messages, Stop vs Warning error alerts, dynamic spill list sources (=G2#), and cascading dependent dropdowns powered by INDIRECT.',
    vi: 'Xây dựng giao diện thu thập dữ liệu phòng thủ: xác thực danh sách List, giới hạn khoảng số, quy tắc công thức tùy chỉnh, thông báo hướng dẫn Input Message, hộp thoại cảnh báo Stop vs Warning, nguồn danh sách tràn động (=G2#) và menu thả xuống phụ thuộc đa tầng bằng INDIRECT.'
  },
  learn: {
    introduction: {
      en: 'Garbage in, garbage out: the primary cause of spreadsheet calculation errors is invalid user input (e.g. typing "Ten" into a numeric discount field, or entering "Califorina" with a typo). Data Validation enforces strict integrity rules at the point of data entry, guiding users with dropdown selections and polite error dialogs.',
      vi: 'Dữ liệu rác đầu vào sẽ tạo ra kết quả rác đầu ra: nguyên nhân hàng đầu gây lỗi tính toán trong bảng tính là do người dùng nhập dữ liệu sai (ví dụ gõ chữ "Mười" vào ô chiết khấu số, hoặc gõ sai chính tả tên tỉnh thành). Tính năng Data Validation áp dụng các ràng buộc toàn vẹn dữ liệu nghiêm ngặt ngay tại thời điểm nhập liệu, hướng dẫn người dùng bằng danh sách chọn thả xuống và thông báo lỗi rõ ràng.'
    },
    conceptExplanation: {
      en: `### 1. Data Validation Criteria Types (Data Tab)
- **List**: Creates in-cell dropdown lists. Source can be comma-separated (\`"High, Medium, Low"\`), a fixed range (\`=$K$2:$K$10\`), or a dynamic array spill reference (\`=$G$2#\`).
- **Whole Number / Decimal**: Restricts inputs between minimum and maximum bounds (e.g. Discount between 0.0 and 0.5).
- **Date / Time**: Restricts dates (e.g. \`>=TODAY()\`).
- **Text Length**: Restricts character lengths (e.g. exactly 10 digits for phone numbers).
- **Custom (Formula-Based)**: Accepts any boolean formula (e.g. \`=ISNUMBER(B2)\` or \`=COUNTIF($A$2:$A$100, A2)=1\` to enforce uniqueness!).

### 2. Error Alert Severities
1. **Stop (Red X)**: Completely blocks invalid entry; user cannot proceed without correcting data.
2. **Warning (Yellow Triangle)**: Alerts user with "Yes/No" to allow overriding the rule.
3. **Information (Blue i)**: Informs user and accepts the invalid data automatically.

### 3. Cascading Dependent Dropdown Menus (with INDIRECT)
To make dropdown 2 depend on the selection of dropdown 1:
1. Name ranges matching each primary category (e.g. Name range for Asian countries \`Asia\`, European countries \`Europe\`).
2. Set secondary cell Validation Source to: \`=INDIRECT(A2)\` (where A2 holds the region selection).`,
      vi: `### 1. Các Loại Tiêu Chí Xác Thực Dữ Liệu (Thẻ Data)
- **List**: Tạo danh sách thả xuống trong ô. Nguồn có thể là danh sách phân tách bằng dấu phẩy (\`"Cao, Trung bình, Thấp"\`), vùng cố định (\`=$K$2:$K$10\`), hoặc tham chiếu vùng tràn mảng động (\`=$G$2#\`).
- **Whole Number / Decimal**: Giới hạn số nguyên hoặc số thập phân trong khoảng (ví dụ: Chiết khấu từ 0.0 đến 0.5).
- **Date / Time**: Giới hạn ngày tháng (ví dụ: \`>=TODAY()\`).
- **Text Length**: Giới hạn độ dài ký tự (ví dụ: đúng 10 chữ số cho số điện thoại).
- **Custom (Bằng Công Thức)**: Chấp nhận mọi công thức logic (ví dụ: \`=ISNUMBER(B2)\` hoặc \`=COUNTIF($A$2:$A$100, A2)=1\` để ngăn trùng lặp dữ liệu!).

### 2. Ba Mức Độ Cảnh Báo Lỗi (Error Alert)
1. **Stop (Dấu X Đỏ)**: Chặn hoàn toàn việc nhập sai; người dùng bắt buộc phải sửa đúng mới được tiếp tục.
2. **Warning (Tam Giác Vàng)**: Cảnh báo với lựa chọn "Yes/No" cho phép ghi đè chấp nhận ngoại lệ.
3. **Information (Chữ i Xanh)**: Thông báo cho người dùng biết và tự động chấp nhận dữ liệu.

### 3. Menu Thả Xuống Phụ Thuộc Đa Tầng (Cascading Dropdowns với INDIRECT)
Để danh mục ở menu 2 tự động thay đổi theo lựa chọn ở menu 1:
1. Đặt tên vùng (Named Range) trùng khớp với từng danh mục chính (ví dụ đặt tên vùng các nước Châu Á là \`Asia\`, Châu Âu là \`Europe\`).
2. Đặt nguồn xác thực Validation của ô thứ 2 là: \`=INDIRECT(A2)\` (trong đó A2 là ô chứa lựa chọn khu vực).`
    },
    syntax: `# Validation List Sources:
"Active, Pending, Suspended"    -> Static comma list
=$K$2:$K$20                     -> Range list
=$G$2#                          -> Dynamic array spill source

# Cascading Dependent List:
=INDIRECT(A2)

# Custom Uniqueness Rule:
=COUNTIF($A$2:$A$500, A2) = 1`,
    examples: [
      {
        title: { en: 'Enforcing Unique Employee IDs with Custom Validation', vi: 'Ngăn Trùng Lặp Mã Nhân Viên Bằng Custom Validation' },
        code: `Applied to Range: A2:A500
Allow: Custom
Formula: =COUNTIF($A$2:$A$500, A2) = 1
Error Alert: Stop -> "Duplicate ID! This Employee ID is already registered."`,
        description: {
          en: 'Prevents duplicate IDs from ever being entered into the column at the point of data entry.',
          vi: 'Ngăn chặn hoàn toàn việc nhập trùng mã ID vào cột ngay tại thời điểm gõ phím.'
        }
      },
      {
        title: { en: 'Dynamic Dropdown from Unique Spill Range', vi: 'Tạo Menu Thả Xuống Động Từ Vùng Tràn Unique' },
        code: `In Cell G2: =SORT(UNIQUE(OrdersTable[Department]))

Validation Source for Cell B2:
Allow: List
Source: =$G$2#`,
        description: {
          en: 'The dropdown automatically grows and alphabetizes as new departments appear in the database.',
          vi: 'Danh sách thả xuống tự động mở rộng và sắp xếp chữ cái khi có phòng ban mới xuất hiện trong cơ sở dữ liệu.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Pasting data into validated cells with standard Ctrl + V, which wipes out the Data Validation rules on those cells.',
          vi: 'Dán dữ liệu vào ô đã cài đặt xác thực bằng Ctrl + V thông thường, làm xóa mất quy tắc Data Validation trên các ô đó.'
        },
        correction: {
          en: 'Always use Paste Values (Ctrl + Shift + V or Alt + E + S + V) to preserve underlying cell validation rules.',
          vi: 'Luôn sử dụng Paste Values (Ctrl + Shift + V hoặc Alt + E + S + V) để giữ nguyên các quy tắc xác thực ô.'
        }
      }
    ],
    tips: [
      { en: 'Circle Invalid Data: On the Data Validation dropdown, click "Circle Invalid Data" to draw red visual audit rings around any pre-existing invalid entries.', vi: 'Khoanh tròn dữ liệu không hợp lệ: Chọn "Circle Invalid Data" để Excel vẽ vòng tròn đỏ trực quan quanh các ô vi phạm đã nhập trước đó.' },
      { en: 'Input Message Tooltips: Use the "Input Message" tab to create hover tooltips showing format examples (e.g. "Enter date as YYYY-MM-DD").', vi: 'Mẹo hướng dẫn Input Message: Dùng thẻ "Input Message" để tạo ghi chú bật lên khi nhấp chuột hướng dẫn người dùng định dạng đúng.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l16_ex1',
      type: 'complete_code',
      title: { en: 'Configure Custom Validation Formula for Positive Numbers', vi: 'Cấu Hình Công Thức Xác Thực Tùy Chỉnh Cho Số Dương' },
      instruction: {
        en: 'Write the custom validation formula for cell B2 to ensure that entered values are numbers greater than zero.',
        vi: 'Viết công thức xác thực tùy chỉnh cho ô B2 để đảm bảo giá trị nhập vào là số lớn hơn 0.'
      },
      starterCode: '=AND(ISNUMBER(B2), ',
      solutionCode: '=AND(ISNUMBER(B2), B2>0)',
      expectedOutput: '=AND(ISNUMBER(B2), B2>0)',
      hint: { en: 'Combine ISNUMBER(B2) and B2>0 inside AND().', vi: 'Kết hợp ISNUMBER(B2) và B2>0 bên trong hàm AND().' },
      explanation: { en: '=AND(ISNUMBER(B2), B2>0) restricts inputs strictly to positive numeric values.', vi: '=AND(ISNUMBER(B2), B2>0) giới hạn dữ liệu nhập vào nghiêm ngặt là các số dương.' }
    },
    {
      id: 'excel_l16_ex2',
      type: 'complete_code',
      title: { en: 'Set Dynamic Spill List Source', vi: 'Thiết Lập Nguồn Danh Sách Tràn Động' },
      instruction: {
        en: 'Specify the Data Validation List source formula referencing the entire dynamic spill range originating at cell $K$2.',
        vi: 'Chỉ định công thức nguồn List trong Data Validation tham chiếu toàn bộ vùng tràn mảng động bắt đầu từ ô $K$2.'
      },
      starterCode: '=$K$2',
      solutionCode: '=$K$2#',
      expectedOutput: '=$K$2#',
      hint: { en: 'Append the hashtag spill operator (#) to $K$2.', vi: 'Thêm toán tử vùng tràn dấu thăng (#) vào sau $K$2.' },
      explanation: { en: '=$K$2# instructs the dropdown to populate from the dynamic array output.', vi: '=$K$2# hướng dẫn menu thả xuống lấy dữ liệu từ kết quả mảng động.' }
    }
  ],
  challenge: {
    id: 'excel_l16_challenge',
    title: { en: 'Construct Cascading Dependent Dropdown Formula', vi: 'Xây Dựng Công Thức Menu Thả Xuống Phụ Thuộc Đa Tầng' },
    description: {
      en: 'Construct the Data Validation List source formula for cell C2 so that its dropdown items dynamically evaluate the Named Range matching the category text selected in cell B2.',
      vi: 'Xây dựng công thức nguồn List Data Validation cho ô C2 để các mục trong danh sách thả xuống tự động lấy theo Tên Vùng (Named Range) khớp với danh mục được chọn ở ô B2.'
    },
    requirements: [
      { en: 'Use the INDIRECT function', vi: 'Sử dụng hàm INDIRECT' },
      { en: 'Pass relative cell reference B2', vi: 'Truyền tham chiếu ô tương đối B2' }
    ],
    starterCode: '=',
    solutionCode: '=INDIRECT(B2)',
    hints: [
      { en: 'Syntax: =INDIRECT(B2)', vi: 'Cú pháp: =INDIRECT(B2)' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l16_q1',
      type: 'single_choice',
      question: {
        en: 'Which Data Validation Error Alert style strictly prevents a user from submitting invalid data?',
        vi: 'Kiểu cảnh báo lỗi (Error Alert) nào trong Data Validation ngăn chặn hoàn toàn không cho người dùng lưu dữ liệu sai?'
      },
      options: [
        { en: 'Stop (Red X icon)', vi: 'Stop (Biểu tượng dấu X đỏ)' },
        { en: 'Warning (Yellow triangle)', vi: 'Warning (Biểu tượng tam giác vàng)' },
        { en: 'Information (Blue i icon)', vi: 'Information (Biểu tượng chữ i xanh)' },
        { en: 'None of the above', vi: 'Không có kiểu nào ở trên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Stop is the only severity level that strictly halts execution and rejects invalid entries completely.',
        vi: 'Stop là mức độ duy nhất chặn đứng việc thực thi và từ chối hoàn toàn các mục nhập không hợp lệ.'
      },
      difficulty: 'easy',
      topicId: 'excel_data_validation'
    },
    {
      id: 'excel_l16_q2',
      type: 'single_choice',
      question: {
        en: 'What function is used to create cascading dependent dropdown lists in Excel?',
        vi: 'Hàm nào được sử dụng để tạo danh sách thả xuống phụ thuộc đa tầng trong Excel?'
      },
      options: [
        { en: '`INDIRECT` (e.g. `=INDIRECT(A2)`)', vi: '`INDIRECT` (ví dụ `=INDIRECT(A2)`)' },
        { en: '`DEPENDENT()`', vi: '`DEPENDENT()`' },
        { en: '`LOOKUP()`', vi: '`LOOKUP()`' },
        { en: '`CASCADE()`', vi: '`CASCADE()`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'INDIRECT converts a text string into a live range reference pointing to a Named Range of matching name.',
        vi: 'Hàm INDIRECT chuyển đổi chuỗi văn bản thành một tham chiếu dải ô thực tế trỏ đến Tên Vùng (Named Range) trùng tên.'
      },
      difficulty: 'medium',
      topicId: 'excel_data_validation'
    },
    {
      id: 'excel_l16_q3',
      type: 'single_choice',
      question: {
        en: 'How can you enforce that all values entered in column A must be unique using Data Validation?',
        vi: 'Làm thế nào để bắt buộc tất cả các giá trị nhập vào cột A phải là duy nhất bằng Data Validation?'
      },
      options: [
        { en: 'Allow: Custom -> Formula: `=COUNTIF($A$2:$A$100, A2) = 1`', vi: 'Allow: Custom -> Công thức: `=COUNTIF($A$2:$A$100, A2) = 1`' },
        { en: 'Select "Unique" from the Allow dropdown', vi: 'Chọn "Unique" từ menu Allow' },
        { en: 'Use `=UNIQUE(A2)`', vi: 'Dùng `=UNIQUE(A2)`' },
        { en: 'Data validation cannot enforce uniqueness', vi: 'Data validation không thể bắt buộc tính duy nhất' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The custom formula `=COUNTIF($A$2:$A$100, A2) = 1` checks that the count of that value in the column is exactly 1.',
        vi: 'Công thức tùy chỉnh `=COUNTIF($A$2:$A$100, A2) = 1` kiểm tra số lần xuất hiện của giá trị đó trong cột đúng bằng 1.'
      },
      difficulty: 'medium',
      topicId: 'excel_data_validation'
    },
    {
      id: 'excel_l16_q4',
      type: 'single_choice',
      question: {
        en: 'What feature visually circles cells that contain invalid data according to current validation rules?',
        vi: 'Tính năng nào vẽ vòng tròn trực quan quanh các ô chứa dữ liệu không hợp lệ theo quy tắc xác thực hiện tại?'
      },
      options: [
        { en: 'Data -> Data Validation -> Circle Invalid Data', vi: 'Data -> Data Validation -> Circle Invalid Data' },
        { en: 'Conditional Formatting -> Red Rings', vi: 'Conditional Formatting -> Red Rings' },
        { en: 'Spell Check', vi: 'Spell Check' },
        { en: 'Review -> Audit Circles', vi: 'Review -> Audit Circles' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Circle Invalid Data scans the worksheet and highlights non-compliant pre-existing data with red oval rings.',
        vi: 'Circle Invalid Data quét trang tính và khoanh vùng các dữ liệu không hợp lệ có từ trước bằng vòng tròn đỏ.'
      },
      difficulty: 'easy',
      topicId: 'excel_data_validation'
    },
    {
      id: 'excel_l16_q5',
      type: 'single_choice',
      question: {
        en: 'How do you link a Data Validation dropdown to a dynamic array formula spilling from cell G2?',
        vi: 'Làm thế nào để liên kết một menu thả xuống Data Validation với công thức mảng động tràn từ ô G2?'
      },
      options: [
        { en: 'Set Source to `=$G$2#`', vi: 'Đặt Source thành `=$G$2#`' },
        { en: 'Set Source to `=$G$2:SPILL`', vi: 'Đặt Source thành `=$G$2:SPILL`' },
        { en: 'Set Source to `=G2:G100`', vi: 'Đặt Source thành `=G2:G100`' },
        { en: 'Type `=ARRAY(G2)`', vi: 'Gõ `=ARRAY(G2)`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Using the spill operator (=$G$2#) ensures the dropdown dynamically resizes as the spill range expands.',
        vi: 'Sử dụng toán tử vùng tràn (=$G$2#) đảm bảo menu thả xuống tự động co giãn khi vùng tràn mảng mở rộng.'
      },
      difficulty: 'easy',
      topicId: 'excel_data_validation'
    },
    {
      id: 'excel_l16_q6',
      type: 'true_false',
      question: {
        en: 'True or False: Standard copy-and-paste (Ctrl + V) from another application can overwrite and destroy Data Validation rules on target cells.',
        vi: 'Đúng hay Sai: Thao tác sao chép và dán thông thường (Ctrl + V) từ ứng dụng khác có thể ghi đè và phá hủy các quy tắc Data Validation trên các ô đích.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Standard pasting pastes formats and cell metadata, replacing existing data validation rules. Use Paste Values instead.',
        vi: 'Đúng. Dán thông thường sẽ dán cả định dạng và siêu dữ liệu ô, xóa mất quy tắc xác thực có sẵn. Hãy dùng Paste Values thay thế.'
      },
      difficulty: 'medium',
      topicId: 'excel_data_validation'
    },
    {
      id: 'excel_l16_q7',
      type: 'single_choice',
      question: {
        en: 'What tab in the Data Validation dialog is used to display helpful instructions when a user selects a cell?',
        vi: 'Thẻ nào trong hộp thoại Data Validation được dùng để hiển thị hướng dẫn hữu ích khi người dùng chọn ô?'
      },
      options: [
        { en: 'Input Message', vi: 'Input Message' },
        { en: 'Settings', vi: 'Settings' },
        { en: 'Error Alert', vi: 'Error Alert' },
        { en: 'Help Tooltip', vi: 'Help Tooltip' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The Input Message tab configures an in-place tooltip that pops up whenever the cell receives focus.',
        vi: 'Thẻ Input Message cấu hình ghi chú hướng dẫn bật lên tại chỗ bất cứ khi nào ô được nhấp chọn.'
      },
      difficulty: 'easy',
      topicId: 'excel_data_validation'
    },
    {
      id: 'excel_l16_q8',
      type: 'single_choice',
      question: {
        en: 'Which setting in the Data Validation dialog allows leaving the cell empty without triggering an error alert?',
        vi: 'Tùy chọn nào trong hộp thoại Data Validation cho phép để trống ô mà không bị báo lỗi?'
      },
      options: [
        { en: 'Ignore blank checkbox checked', vi: 'Tích chọn vào ô Ignore blank' },
        { en: 'Allow: Any Value', vi: 'Allow: Any Value' },
        { en: 'Clear All', vi: 'Clear All' },
        { en: 'Stop on Error', vi: 'Stop on Error' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Checking "Ignore blank" ensures that empty cells are considered valid and do not trigger validation warnings.',
        vi: 'Tích chọn "Ignore blank" đảm bảo các ô trống được coi là hợp lệ và không kích hoạt cảnh báo.'
      },
      difficulty: 'easy',
      topicId: 'excel_data_validation'
    },
    {
      id: 'excel_l16_q9',
      type: 'single_choice',
      question: {
        en: 'What custom formula restricts user input in cell A1 to valid email addresses containing an "@" sign and a "." period?',
        vi: 'Công thức tùy chỉnh nào giới hạn người dùng nhập vào ô A1 phải là địa chỉ email hợp lệ có chứa ký tự "@" và dấu chấm "."?'
      },
      options: [
        { en: '`=AND(ISNUMBER(FIND("@", A1)), ISNUMBER(FIND(".", A1)))`', vi: '`=AND(ISNUMBER(FIND("@", A1)), ISNUMBER(FIND(".", A1)))`' },
        { en: '`=EMAIL(A1)`', vi: '`=EMAIL(A1)`' },
        { en: '`=CHECK(A1, "@.")`', vi: '`=CHECK(A1, "@.")`' },
        { en: '`=ISMAIL(A1)`', vi: '`=ISMAIL(A1)`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'FIND returns a number if the character exists, and ISNUMBER converts that to a boolean validation check.',
        vi: 'Hàm FIND trả về một số nếu ký tự tồn tại và ISNUMBER chuyển đổi kết quả đó thành giá trị logic để kiểm tra xác thực.'
      },
      difficulty: 'hard',
      topicId: 'excel_data_validation'
    },
    {
      id: 'excel_l16_q10',
      type: 'single_choice',
      question: {
        en: 'Can a Data Validation List source be entered directly as comma-separated values like `"Red, Green, Blue"`?',
        vi: 'Nguồn danh sách Data Validation List có thể được nhập trực tiếp dưới dạng các giá trị phân tách bằng dấu phẩy như `"Red, Green, Blue"` không?'
      },
      options: [
        { en: 'Yes, directly typed into the Source input field', vi: 'Có, gõ trực tiếp vào ô nhập Source' },
        { en: 'No, it must always reference worksheet cells', vi: 'Không, bắt buộc luôn phải tham chiếu đến các ô trang tính' },
        { en: 'Only numbers can be entered directly', vi: 'Chỉ có số mới được nhập trực tiếp' },
        { en: 'Only if enclosed in curly brackets {}', vi: 'Chỉ khi đặt trong ngoặc nhọn {}' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Data Validation allows typing static comma-delimited strings directly into the Source box for simple dropdowns.',
        vi: 'Data Validation cho phép gõ trực tiếp các chuỗi phân tách bằng dấu phẩy vào ô Source cho các menu thả xuống đơn giản.'
      },
      difficulty: 'easy',
      topicId: 'excel_data_validation'
    }
  ]
};

saveLesson('lesson16.ts', 'lesson16', lesson16);
console.log('Saved lessons 14, 15, and 16.');
