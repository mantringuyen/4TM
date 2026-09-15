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
// LESSON 09: Logical Functions (IF, AND, OR, IFS, SWITCH)
// Preserved ID: excel_lesson_4
// =========================================================================
export const lesson09: Lesson = {
  id: 'excel_lesson_4',
  order: 9,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_logic',
  title: {
    en: 'Advanced Logical Decision Making: IF, AND, OR, NOT, IFS & SWITCH',
    vi: 'Ra Quyết Định Logic Nâng Cao: IF, AND, OR, NOT, IFS & SWITCH'
  },
  summary: {
    en: 'Master boolean logic pipelines in Excel: single and nested IF statements, compound multi-criteria evaluations with AND/OR, multi-condition workflows with modern IFS, and structured exact-value routing with SWITCH.',
    vi: 'Làm chủ quy trình logic boolean trong Excel: câu lệnh IF đơn và lồng nhau, đánh giá đa điều kiện kết hợp với AND/OR, xử lý nhiều nhánh điều kiện bằng hàm IFS hiện đại và định tuyến giá trị chính xác bằng SWITCH.'
  },
  learn: {
    introduction: {
      en: 'Business decisions are inherently conditional: commission tiers depend on exceeding sales quotas, credit approvals require high scores AND zero late payments, and regional tax brackets vary by jurisdiction. Logical functions allow spreadsheet models to dynamically evaluate rules and output automated decisions at scale.',
      vi: 'Các quyết định kinh doanh luôn gắn liền với điều kiện: bậc hoa hồng phụ thuộc vào việc vượt hạn mức bán hàng, phê duyệt tín dụng yêu cầu điểm số cao VÀ không nợ hạn, và thuế suất vùng thay đổi theo từng khu vực. Các hàm logic giúp bảng tính tự động đánh giá quy tắc và đưa ra quyết định tự động trên quy mô lớn.'
    },
    conceptExplanation: {
      en: `### 1. The Core Logical Toolkit
- **\`=IF(logical_test, value_if_true, [value_if_false])\`**: Evaluates condition; returns one value if TRUE, another if FALSE.
- **\`=AND(cond1, cond2, ...)\`**: Returns TRUE only if **all** arguments evaluate to TRUE.
- **\`=OR(cond1, cond2, ...)\`**: Returns TRUE if **at least one** argument is TRUE.
- **\`=NOT(logical)\`**: Inverts TRUE to FALSE, and FALSE to TRUE.
- **\`=IFS(cond1, val1, cond2, val2, ...)\`**: Evaluates conditions sequentially without cumbersome nested IF parentheses.
- **\`=SWITCH(expression, val1, result1, val2, result2, ..., [default])\`**: Tests an expression against a list of exact matches and returns the corresponding result.

### 2. Compound Multi-Criteria Logic
Nest \`AND\` or \`OR\` directly inside the \`logical_test\` argument:
\`=IF(AND(B2>=10000, C2="High"), "Eligible", "Ineligible")\``,
      vi: `### 1. Bộ Công Cụ Hàm Logic Cốt Lõi
- **\`=IF(dieu_kien, gia_tri_khi_dung, [gia_tri_khi_sai])\`**: Kiểm tra điều kiện; trả về một giá trị nếu TRUE, giá trị khác nếu FALSE.
- **\`=AND(dk1, dk2, ...)\`**: Trả về TRUE chỉ khi **tất cả** các điều kiện đều TRUE.
- **\`=OR(dk1, dk2, ...)\`**: Trả về TRUE nếu có **ít nhất một** điều kiện là TRUE.
- **\`=NOT(logic)\`**: Đảo ngược TRUE thành FALSE và ngược lại.
- **\`=IFS(dk1, kq1, dk2, kq2, ...)\`**: Đánh giá tuần tự nhiều điều kiện mà không cần lồng nhiều dấu ngoặc đơn IF phức tạp.
- **\`=SWITCH(bieu_thuc, gt1, kq1, gt2, kq2, ..., [mac_dinh])\`**: So khớp biểu thức với danh sách các giá trị chính xác và trả về kết quả tương ứng.

### 2. Logic Đa Điều Kiện Phức Hợp
Lồng trực tiếp \`AND\` hoặc \`OR\` vào bên trong đối số \`dieu_kien\` của IF:
\`=IF(AND(B2>=10000, C2="High"), "Eligible", "Ineligible")\``
    },
    syntax: `# Basic IF:
=IF(logical_test, value_if_true, value_if_false)

# Compound AND/OR:
=IF(AND(A2>50, B2<100), "Pass", "Fail")
=IF(OR(A2="VIP", B2>100000), 0.15, 0.05)

# Modern Multi-Condition:
=IFS(Score>=90, "A", Score>=80, "B", Score>=70, "C", TRUE, "F")
=SWITCH(RegionCode, 1, "North", 2, "South", 3, "East", 4, "West", "Unknown")`,
    examples: [
      {
        title: { en: 'Sales Performance Tiering with IFS', vi: 'Phân Hạng Doanh Số Bằng Hàm IFS' },
        code: `Sales in cell B2

=IFS(B2 >= 100000, "Platinum Tier",
     B2 >= 50000,  "Gold Tier",
     B2 >= 20000,  "Silver Tier",
     TRUE,         "Bronze Tier")`,
        description: {
          en: 'Using TRUE as the final condition creates a universal fallback (catch-all) default result.',
          vi: 'Dùng TRUE làm điều kiện cuối cùng tạo ra một giá trị mặc định cho tất cả các trường hợp còn lại.'
        }
      },
      {
        title: { en: 'Country Code Mapping with SWITCH', vi: 'Chuyển Đổi Mã Quốc Gia Bằng SWITCH' },
        code: `Country Code in cell A2: "VN"

=SWITCH(A2, "VN", "Vietnam", "US", "United States", "JP", "Japan", "Other")`,
        description: {
          en: 'SWITCH cleanly evaluates exact string matches without repetitive logical operators.',
          vi: 'SWITCH so khớp chính xác chuỗi văn bản một cách gọn gàng không cần lặp lại các toán tử so sánh.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Writing =IF(A1 > 50 AND B1 > 50) using English syntax instead of Excel prefix syntax =IF(AND(A1>50, B1>50)).',
          vi: 'Viết =IF(A1 > 50 AND B1 > 50) theo ngữ pháp tiếng Anh thay vì cú pháp tiền tố Excel =IF(AND(A1>50, B1>50)).'
        },
        correction: {
          en: 'In Excel, logical operators are functions that wrap their arguments: =AND(A1>50, B1>50).',
          vi: 'Trong Excel, các toán tử logic là hàm bao bọc các đối số bên trong: =AND(A1>50, B1>50).'
        }
      },
      {
        mistake: {
          en: 'Arranging conditions in ascending order in IFS (=IFS(B2>=20000, "Silver", B2>=100000, "Platinum")), which prematurely triggers Silver for a 150000 score.',
          vi: 'Sắp xếp điều kiện tăng dần trong IFS (=IFS(B2>=20000, "Silver", B2>=100000, "Platinum")), khiến mức 150000 bị dừng sớm ở Silver.'
        },
        correction: {
          en: 'When checking greater-than boundaries (>=), always order conditions descending from highest to lowest threshold.',
          vi: 'Khi kiểm tra điều kiện lớn hơn hoặc bằng (>=), luôn sắp xếp các ngưỡng theo thứ tự giảm dần từ cao xuống thấp.'
        }
      }
    ],
    tips: [
      { en: 'Catch-all Default in IFS: Always put TRUE, "Default Value" as the final condition-value pair in IFS to prevent #N/A errors when no condition matches.', vi: 'Giá trị mặc định trong IFS: Luôn đặt TRUE, "Giá trị mặc định" ở cặp điều kiện cuối cùng trong IFS để tránh lỗi #N/A khi không có điều kiện nào thỏa mãn.' },
      { en: 'Comparison Operators: Excel supports = (equal), <> (not equal), > (greater), < (less), >= (greater or equal), <= (less or equal).', vi: 'Toán tử so sánh: Excel hỗ trợ = (bằng), <> (khác), > (lớn hơn), < (nhỏ hơn), >= (lớn hơn hoặc bằng), <= (nhỏ hơn hoặc bằng).' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l9_ex1',
      type: 'complete_code',
      title: { en: 'Multi-Condition Discount Eligibility', vi: 'Xét Điều Kiện Đủ Tiêu Chuẩn Chiết Khấu' },
      instruction: {
        en: 'Write an IF formula with AND to output "Qualified" if Sales in B2 >= 5000 AND Rating in C2 >= 4, otherwise output "Standard".',
        vi: 'Viết công thức IF kết hợp AND để xuất "Qualified" nếu Doanh số ở B2 >= 5000 VÀ Đánh giá ở C2 >= 4, ngược lại xuất "Standard".'
      },
      starterCode: '=IF(AND(',
      solutionCode: '=IF(AND(B2>=5000, C2>=4), "Qualified", "Standard")',
      expectedOutput: '=IF(AND(B2>=5000, C2>=4), "Qualified", "Standard")',
      hint: { en: 'Combine B2>=5000 and C2>=4 inside AND().', vi: 'Kết hợp B2>=5000 và C2>=4 bên trong hàm AND().' },
      explanation: { en: 'AND requires both conditions to be TRUE before IF returns "Qualified".', vi: 'AND yêu cầu cả hai điều kiện đều phải TRUE thì IF mới trả về "Qualified".' }
    },
    {
      id: 'excel_l9_ex2',
      type: 'complete_code',
      title: { en: 'Grade Determination with IFS', vi: 'Xếp Loại Điểm Số Bằng IFS' },
      instruction: {
        en: 'Write an IFS formula for score in A2: if >=90 return "A", if >=80 return "B", otherwise (TRUE) return "Pass".',
        vi: 'Viết công thức IFS cho điểm ở A2: nếu >=90 trả về "A", nếu >=80 trả về "B", ngược lại (TRUE) trả về "Pass".'
      },
      starterCode: '=IFS(',
      solutionCode: '=IFS(A2>=90, "A", A2>=80, "B", TRUE, "Pass")',
      expectedOutput: '=IFS(A2>=90, "A", A2>=80, "B", TRUE, "Pass")',
      hint: { en: 'Order from highest to lowest and end with TRUE, "Pass".', vi: 'Sắp xếp từ cao xuống thấp và kết thúc bằng TRUE, "Pass".' },
      explanation: { en: 'IFS evaluates pairs in sequence and stops on the first matched condition.', vi: 'Hàm IFS đánh giá các cặp theo thứ tự và dừng lại ở điều kiện khớp đầu tiên.' }
    }
  ],
  challenge: {
    id: 'excel_l9_challenge',
    title: { en: 'Construct Executive Commission Matrix', vi: 'Xây Dựng Ma Trận Tính Thưởng Hoa Hồng' },
    description: {
      en: 'Construct a formula for commission rate in cell D2: If Sales in B2 > 100000 OR Department in C2 equals "Enterprise", grant 0.15 (15%), otherwise grant 0.05 (5%).',
      vi: 'Xây dựng công thức tính tỷ lệ hoa hồng ở ô D2: Nếu Doanh số ở B2 > 100000 HOẶC Phòng ban ở C2 bằng "Enterprise", thưởng 0.15 (15%), ngược lại thưởng 0.05 (5%).'
    },
    requirements: [
      { en: 'Use IF with OR', vi: 'Sử dụng hàm IF kết hợp OR' },
      { en: 'Return numeric rates 0.15 and 0.05', vi: 'Trả về tỷ lệ số 0.15 và 0.05' }
    ],
    starterCode: '=',
    solutionCode: '=IF(OR(B2>100000, C2="Enterprise"), 0.15, 0.05)',
    hints: [
      { en: 'Syntax: =IF(OR(B2>100000, C2="Enterprise"), 0.15, 0.05)', vi: 'Cú pháp: =IF(OR(B2>100000, C2="Enterprise"), 0.15, 0.05)' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l9_q1',
      type: 'single_choice',
      question: {
        en: 'What is the output of `=AND(5 > 2, 10 < 20, 3 = 4)`?',
        vi: 'Kết quả của công thức `=AND(5 > 2, 10 < 20, 3 = 4)` là gì?'
      },
      options: [
        { en: 'FALSE (because 3 = 4 is false)', vi: 'FALSE (vì 3 = 4 là sai)' },
        { en: 'TRUE', vi: 'TRUE' },
        { en: '#VALUE!', vi: '#VALUE!' },
        { en: '2', vi: '2' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'AND requires every single condition to be true. Since 3 = 4 is false, AND returns FALSE.',
        vi: 'Hàm AND yêu cầu mọi điều kiện đều phải đúng. Vì 3 = 4 là sai nên AND trả về FALSE.'
      },
      difficulty: 'easy',
      topicId: 'excel_logic'
    },
    {
      id: 'excel_l9_q2',
      type: 'single_choice',
      question: {
        en: 'What is the advantage of the `IFS` function over nested `IF` statements?',
        vi: 'Ưu điểm của hàm `IFS` so với nhiều câu lệnh `IF` lồng nhau là gì?'
      },
      options: [
        { en: 'Eliminates deeply nested closing parentheses by testing sequential condition-value pairs in a single function', vi: 'Loại bỏ các dấu ngoặc đóng lồng nhau phức tạp bằng cách kiểm tra tuần tự các cặp điều kiện-giá trị trong một hàm duy nhất' },
        { en: 'IFS only works with numbers', vi: 'IFS chỉ hoạt động với số' },
        { en: 'IFS runs 100x faster than any other function', vi: 'IFS chạy nhanh hơn 100 lần so với bất kỳ hàm nào khác' },
        { en: 'IFS converts text to dates automatically', vi: 'IFS tự động chuyển văn bản thành ngày tháng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'IFS allows testing up to 127 condition-result pairs in a clean, flat list without nesting multiple IF() statements.',
        vi: 'IFS cho phép kiểm tra tối đa 127 cặp điều kiện-kết quả trong một danh sách phẳng rõ ràng mà không cần lồng nhiều lệnh IF().'
      },
      difficulty: 'easy',
      topicId: 'excel_logic'
    },
    {
      id: 'excel_l9_q3',
      type: 'single_choice',
      question: {
        en: 'What operator in Excel represents "not equal to"?',
        vi: 'Toán tử nào trong Excel biểu thị phép so sánh "không bằng" (khác)?'
      },
      options: [
        { en: '<>', vi: '<>' },
        { en: '!=', vi: '!=' },
        { en: '!==', vi: '!==' },
        { en: 'NOT =', vi: 'NOT =' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Excel uses the <> (less than followed by greater than) symbol for the not-equal comparison operator.',
        vi: 'Excel sử dụng ký hiệu <> (dấu nhỏ hơn đứng trước dấu lớn hơn) cho toán tử so sánh khác.'
      },
      difficulty: 'easy',
      topicId: 'excel_logic'
    },
    {
      id: 'excel_l9_q4',
      type: 'single_choice',
      question: {
        en: 'What does the function `=SWITCH(A1, 1, "Bronze", 2, "Silver", 3, "Gold", "Standard")` return if cell A1 contains `2`?',
        vi: 'Hàm `=SWITCH(A1, 1, "Bronze", 2, "Silver", 3, "Gold", "Standard")` trả về kết quả gì nếu ô A1 chứa số `2`?'
      },
      options: [
        { en: '"Silver"', vi: '"Silver"' },
        { en: '"Bronze"', vi: '"Bronze"' },
        { en: '"Gold"', vi: '"Gold"' },
        { en: '"Standard"', vi: '"Standard"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SWITCH matches A1 against value 2 and returns the associated result "Silver".',
        vi: 'Hàm SWITCH so khớp A1 với giá trị 2 và trả về kết quả tương ứng là "Silver".'
      },
      difficulty: 'easy',
      topicId: 'excel_logic'
    },
    {
      id: 'excel_l9_q5',
      type: 'single_choice',
      question: {
        en: 'What does `=OR(2 > 5, 10 = 10, 4 < 1)` return?',
        vi: 'Công thức `=OR(2 > 5, 10 = 10, 4 < 1)` trả về kết quả gì?'
      },
      options: [
        { en: 'TRUE (because 10 = 10 is true)', vi: 'TRUE (vì 10 = 10 là đúng)' },
        { en: 'FALSE', vi: 'FALSE' },
        { en: '10', vi: '10' },
        { en: '#VALUE!', vi: '#VALUE!' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'OR returns TRUE if at least one argument evaluates to TRUE.',
        vi: 'Hàm OR trả về TRUE nếu có ít nhất một đối số cho kết quả TRUE.'
      },
      difficulty: 'easy',
      topicId: 'excel_logic'
    },
    {
      id: 'excel_l9_q6',
      type: 'single_choice',
      question: {
        en: 'In an `IFS` formula testing numerical score brackets (>=90, >=80, >=70), why must tests be written in descending order?',
        vi: 'Trong công thức `IFS` kiểm tra các khung điểm số (>=90, >=80, >=70), tại sao các phép kiểm tra phải được viết theo thứ tự giảm dần?'
      },
      options: [
        { en: 'Because IFS evaluates from left to right and stops on the FIRST true condition', vi: 'Vì IFS đánh giá từ trái sang phải và dừng lại ở điều kiện đúng ĐẦU TIÊN' },
        { en: 'Because Excel cannot sort numbers', vi: 'Vì Excel không thể sắp xếp số' },
        { en: 'Descending order uses less memory', vi: 'Thứ tự giảm dần tốn ít bộ nhớ hơn' },
        { en: 'There is no requirement to order conditions', vi: 'Không có yêu cầu bắt buộc nào về thứ tự điều kiện' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'If >=70 came first, a score of 95 would match >=70 immediately and return the lower grade before ever reaching >=90.',
        vi: 'Nếu >=70 đứng trước, điểm 95 sẽ thỏa mãn >=70 ngay lập tức và trả về loại thấp hơn trước khi kịp xét đến >=90.'
      },
      difficulty: 'medium',
      topicId: 'excel_logic'
    },
    {
      id: 'excel_l9_q7',
      type: 'single_choice',
      question: {
        en: 'What does `=NOT(5 > 10)` return?',
        vi: 'Công thức `=NOT(5 > 10)` trả về kết quả gì?'
      },
      options: [
        { en: 'TRUE (5 > 10 is false, and NOT inverts it to TRUE)', vi: 'TRUE (5 > 10 là sai, và NOT đảo ngược nó thành TRUE)' },
        { en: 'FALSE', vi: 'FALSE' },
        { en: '-5', vi: '-5' },
        { en: '#N/A', vi: '#N/A' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '5 > 10 evaluates to FALSE. The NOT function reverses FALSE into TRUE.',
        vi: '5 > 10 cho kết quả FALSE. Hàm NOT đảo ngược FALSE thành TRUE.'
      },
      difficulty: 'easy',
      topicId: 'excel_logic'
    },
    {
      id: 'excel_l9_q8',
      type: 'true_false',
      question: {
        en: 'True or False: If no conditions in an `IFS` formula evaluate to TRUE, and no default TRUE fallback is supplied, Excel returns the `#N/A` error.',
        vi: 'Đúng hay Sai: Nếu không có điều kiện nào trong công thức `IFS` cho kết quả TRUE và không có nhánh mặc định TRUE cuối cùng, Excel sẽ trả về lỗi `#N/A`.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. When all IFS conditions are false without a catch-all, Excel raises #N/A.',
        vi: 'Đúng. Khi tất cả các điều kiện trong IFS đều sai mà không có điều kiện bao quát, Excel sẽ báo lỗi #N/A.'
      },
      difficulty: 'medium',
      topicId: 'excel_logic'
    },
    {
      id: 'excel_l9_q9',
      type: 'single_choice',
      question: {
        en: 'How do you test if cell A1 contains either "Manager" or "Director" AND has bonus > 1000 in a single IF statement?',
        vi: 'Làm thế nào để kiểm tra xem ô A1 có chứa "Manager" hoặc "Director" VÀ có tiền thưởng > 1000 trong một câu lệnh IF duy nhất?'
      },
      options: [
        { en: '=IF(AND(OR(A1="Manager", A1="Director"), B1>1000), "Approved", "Denied")', vi: '=IF(AND(OR(A1="Manager", A1="Director"), B1>1000), "Approved", "Denied")' },
        { en: '=IF(OR(A1="Manager", A1="Director" AND B1>1000), "Approved", "Denied")', vi: '=IF(OR(A1="Manager", A1="Director" AND B1>1000), "Approved", "Denied")' },
        { en: '=IF(A1="Manager" OR "Director" AND B1>1000, "Approved", "Denied")', vi: '=IF(A1="Manager" OR "Director" AND B1>1000, "Approved", "Denied")' },
        { en: '=IF(AND(A1="Manager", A1="Director", B1>1000), "Approved", "Denied")', vi: '=IF(AND(A1="Manager", A1="Director", B1>1000), "Approved", "Denied")' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Nesting the OR function inside AND correctly groups the title check while requiring bonus B1 > 1000.',
        vi: 'Lồng hàm OR bên trong AND sẽ nhóm điều kiện chức vụ một cách chính xác trong khi vẫn bắt buộc tiền thưởng B1 > 1000.'
      },
      difficulty: 'hard',
      topicId: 'excel_logic'
    },
    {
      id: 'excel_l9_q10',
      type: 'single_choice',
      question: {
        en: 'What is the result of `=IF(10 > 5, "Yes")` when the condition is TRUE and value_if_false is omitted?',
        vi: 'Kết quả của `=IF(10 > 5, "Yes")` là gì khi điều kiện là TRUE và đối số value_if_false bị bỏ qua?'
      },
      options: [
        { en: '"Yes"', vi: '"Yes"' },
        { en: 'TRUE', vi: 'TRUE' },
        { en: '0', vi: '0' },
        { en: '#VALUE!', vi: '#VALUE!' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Since the condition 10 > 5 is TRUE, the formula returns the value_if_true argument, which is "Yes".',
        vi: 'Vì điều kiện 10 > 5 là TRUE, công thức trả về đối số khi đúng là "Yes".'
      },
      difficulty: 'easy',
      topicId: 'excel_logic'
    }
  ]
};

saveLesson('lesson09.ts', 'lesson09', lesson09);

// =========================================================================
// LESSON 10: Conditional Math & Aggregation (COUNTIF, COUNTIFS, SUMIF, SUMIFS, AVERAGEIF, AVERAGEIFS)
// Preserved ID: excel_lesson_5
// =========================================================================
export const lesson10: Lesson = {
  id: 'excel_lesson_5',
  order: 10,
  courseId: 'excel',
  levelId: 'intermediate',
  topicId: 'excel_conditional_math',
  title: {
    en: 'Conditional Math & Multi-Criteria Aggregation: COUNTIF(S), SUMIF(S) & AVERAGEIF(S)',
    vi: 'Toán Có Điều Kiện & Tổng Hợp Đa Tiêu Chí: COUNTIF(S), SUMIF(S) & AVERAGEIF(S)'
  },
  summary: {
    en: 'Master multi-dimensional business slicing: single-condition COUNTIF/SUMIF/AVERAGEIF, multi-criteria plural functions (COUNTIFS, SUMIFS, AVERAGEIFS), wildcard pattern filtering (*, ?), and dynamic text operator concatenation (">=" & Cell).',
    vi: 'Làm chủ kỹ thuật phân tích lát cắt kinh doanh đa chiều: các hàm điều kiện đơn COUNTIF/SUMIF/AVERAGEIF, các hàm số nhiều đa tiêu chí (COUNTIFS, SUMIFS, AVERAGEIFS), lọc theo mẫu ký tự đại diện (*, ?) và ghép toán tử động (">=" & Ô).'
  },
  learn: {
    introduction: {
      en: 'Raw aggregation answers basic questions ("What is total revenue?"), but strategic business management demands targeted answers ("What was revenue for Enterprise software in the Western region during Q3?"). Conditional aggregation functions enable high-speed dimensional slicing across massive operational datasets.',
      vi: 'Các hàm tổng hợp thô trả lời các câu hỏi cơ bản ("Tổng doanh thu là bao nhiêu?"), nhưng quản trị kinh doanh chiến lược đòi hỏi câu trả lời có mục tiêu ("Doanh thu phần mềm Doanh nghiệp tại khu vực Miền Tây trong Quý 3 là bao nhiêu?"). Các hàm tổng hợp có điều kiện cho phép phân tích lát cắt dữ liệu đa chiều tốc độ cao trên các tập dữ liệu vận hành lớn.'
    },
    conceptExplanation: {
      en: `### 1. Single vs Multi-Criteria Function Architecture
Pay strict attention to argument positioning:
- **Single Criterion**:
  - \`=COUNTIF(range, criteria)\`
  - \`=SUMIF(range, criteria, [sum_range])\`  *(sum_range is LAST)*
  - \`=AVERAGEIF(range, criteria, [average_range])\`
- **Plural Multi-Criteria (The Modern Best Practice)**:
  - \`=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2, ...)\`
  - \`=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)\`  *(sum_range is FIRST!)*
  - \`=AVERAGEIFS(avg_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)\`

### 2. Operator & Reference Concatenation Syntax
When criteria rely on cell references rather than static numbers, concatenate the comparison operator with an ampersand:
- Static: \`">=1000"\`
- Dynamic Cell Reference: \`">=" & E1\`
- Wildcards: \`"*East*"\` (contains "East"), \`"A??"\` (starts with A and exactly 3 letters).`,
      vi: `### 1. Kiến Trúc Hàm Đơn vs Đa Tiêu Chí
Hãy đặc biệt chú ý đến thứ tự vị trí các đối số:
- **Hàm đơn điều kiện**:
  - \`=COUNTIF(vung_dieu_kien, tieu_chi)\`
  - \`=SUMIF(vung_dieu_kien, tieu_chi, [vung_tinh_tong])\`  *(vùng tính tổng ở CUỐI)*
  - \`=AVERAGEIF(vung_dieu_kien, tieu_chi, [vung_tinh_tb])\`
- **Hàm đa điều kiện số nhiều (Tiêu chuẩn thực hành hiện đại)**:
  - \`=COUNTIFS(vung_dk1, tieu_chi1, vung_dk2, tieu_chi2, ...)\`
  - \`=SUMIFS(vung_tinh_tong, vung_dk1, tieu_chi1, vung_dk2, tieu_chi2, ...)\`  *(vùng tính tổng ở ĐẦU TIÊN!)*
  - \`=AVERAGEIFS(vung_tinh_tb, vung_dk1, tieu_chi1, vung_dk2, tieu_chi2, ...)\`

### 2. Cú Pháp Nối Toán Tử & Tham Chiếu Ô
Khi tiêu chí phụ thuộc vào ô tham chiếu động thay vì số tĩnh, hãy nối toán tử so sánh bằng dấu và (&):
- Số tĩnh: \`">=1000"\`
- Tham chiếu ô động: \`">=" & E1\`
- Ký tự đại diện: \`"*East*"\` (chứa "East"), \`"A??"\` (bắt đầu bằng A và đúng 3 ký tự).`
    },
    syntax: `# Plural Multi-Criteria Syntax:
=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)
=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)

# Dynamic Cell Criteria:
=SUMIFS(D2:D100, A2:A100, "West", B2:B100, ">=" & G1)`,
    examples: [
      {
        title: { en: 'Multi-Criteria Regional Product Revenue with SUMIFS', vi: 'Tính Doanh Thu Sản Phẩm Theo Vùng Bằng SUMIFS' },
        code: `Revenue in D2:D100, Region in A2:A100, Product in B2:B100

Target: Calculate total revenue for "Laptops" in the "North" region
Formula: =SUMIFS(D2:D100, A2:A100, "North", B2:B100, "Laptops")`,
        description: {
          en: 'SUMIFS evaluates both conditions simultaneously using AND logic across the rows.',
          vi: 'SUMIFS đồng thời kiểm tra cả hai điều kiện theo logic VÀ trên tất cả các dòng.'
        }
      },
      {
        title: { en: 'Counting Orders within a Date Range with COUNTIFS', vi: 'Đếm Số Đơn Hàng Trong Khoảng Ngày Bằng COUNTIFS' },
        code: `Order Dates in A2:A500

Target: Count orders placed between 2026-01-01 and 2026-03-31 (Q1)
Formula: =COUNTIFS(A2:A500, ">=2026-01-01", A2:A500, "<=2026-03-31")`,
        description: {
          en: 'Passing the same range twice with boundary operators creates an inclusive date bracket filter.',
          vi: 'Truyền cùng một vùng hai lần với các toán tử biên tạo thành bộ lọc khoảng ngày trọn gói.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Confusing argument order between SUMIF (sum_range is LAST) and SUMIFS (sum_range is FIRST), causing formula calculation failure.',
          vi: 'Nhầm lẫn thứ tự đối số giữa SUMIF (vùng tính tổng ở CUỐI) và SUMIFS (vùng tính tổng ở ĐẦU), làm công thức tính sai.'
        },
        correction: {
          en: 'Always use SUMIFS/AVERAGEIFS exclusively; they place the calculation range first and handle both 1 and multiple criteria seamlessly.',
          vi: 'Luôn ưu tiên dùng các hàm số nhiều SUMIFS/AVERAGEIFS; chúng luôn đặt vùng tính toán lên đầu và xử lý mượt mà từ 1 đến nhiều điều kiện.'
        }
      },
      {
        mistake: {
          en: 'Writing =SUMIF(A2:A10, ">=B1", C2:C10) where ">=B1" is treated as literal text instead of referencing cell B1.',
          vi: 'Viết =SUMIF(A2:A10, ">=B1", C2:C10) trong đó ">=B1" bị coi là chuỗi văn bản cố định thay vì tham chiếu ô B1.'
        },
        correction: {
          en: 'Concatenate the operator with the cell reference using an ampersand: ">=" & B1.',
          vi: 'Nối toán tử với ô tham chiếu bằng dấu và (&): ">=" & B1.'
        }
      }
    ],
    tips: [
      { en: 'Wildcard * matching: Use criteria like "*Service*" in SUMIFS to sum all items containing the word Service anywhere in their description.', vi: 'Ký tự đại diện *: Dùng tiêu chí như "*Service*" trong SUMIFS để tính tổng tất cả các mục có chứa từ Service ở bất kỳ vị trí nào.' },
      { en: 'Always lock ranges ($A$2:$A$100) when copying summary tables across multiple report rows.', vi: 'Luôn khóa các dải ô ($A$2:$A$100) khi sao chép bảng tóm tắt qua nhiều dòng báo cáo.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l10_ex1',
      type: 'complete_code',
      title: { en: 'Sum Sales for Specific Department', vi: 'Tính Tổng Doanh Số Cho Một Phòng Ban Cụ Thể' },
      instruction: {
        en: 'Write a SUMIFS formula to sum Revenue in C2:C50 where Department in A2:A50 equals "Marketing".',
        vi: 'Viết công thức SUMIFS để tính tổng Doanh thu ở C2:C50 với điều kiện Phòng ban ở A2:A50 là "Marketing".'
      },
      starterCode: '=SUMIFS(C2:C50, ',
      solutionCode: '=SUMIFS(C2:C50, A2:A50, "Marketing")',
      expectedOutput: '=SUMIFS(C2:C50, A2:A50, "Marketing")',
      hint: { en: 'Pass sum_range C2:C50 first, followed by A2:A50 and "Marketing".', vi: 'Truyền vùng tính tổng C2:C50 đầu tiên, tiếp theo là A2:A50 và "Marketing".' },
      explanation: { en: '=SUMIFS(C2:C50, A2:A50, "Marketing") sums only cells where the department matches.', vi: '=SUMIFS(C2:C50, A2:A50, "Marketing") chỉ cộng các ô thỏa mãn phòng ban tương ứng.' }
    },
    {
      id: 'excel_l10_ex2',
      type: 'complete_code',
      title: { en: 'Count Completed Orders with Amount > 500', vi: 'Đếm Số Đơn Hàng Hoàn Thành Có Giá Trị > 500' },
      instruction: {
        en: 'Write a COUNTIFS formula to count rows where Status in B2:B100 is "Completed" AND Amount in C2:C100 > 500.',
        vi: 'Viết công thức COUNTIFS để đếm các dòng có Trạng thái ở B2:B100 là "Completed" VÀ Giá trị ở C2:C100 > 500.'
      },
      starterCode: '=COUNTIFS(',
      solutionCode: '=COUNTIFS(B2:B100, "Completed", C2:C100, ">500")',
      expectedOutput: '=COUNTIFS(B2:B100, "Completed", C2:C100, ">500")',
      hint: { en: 'Provide criteria pairs: B2:B100, "Completed", C2:C100, ">500".', vi: 'Cung cấp các cặp tiêu chí: B2:B100, "Completed", C2:C100, ">500".' },
      explanation: { en: 'COUNTIFS checks both criteria ranges and counts only rows satisfying both conditions.', vi: 'COUNTIFS kiểm tra cả 2 vùng tiêu chí và chỉ đếm các hàng thỏa mãn cả 2 điều kiện.' }
    }
  ],
  challenge: {
    id: 'excel_l10_challenge',
    title: { en: 'Build Dynamic Dual-Criteria Average Margin Formula', vi: 'Xây Dựng Công Thức Tính Biên Lợi Nhuận Trung Bình Đa Tiêu Chí Động' },
    description: {
      en: 'Construct an AVERAGEIFS formula to calculate average profit margin in D2:D200 for region in A2:A200 matching cell G1 AND sales amount in C2:C200 greater than or equal to threshold in cell H1.',
      vi: 'Xây dựng công thức AVERAGEIFS tính biên lợi nhuận trung bình ở D2:D200 cho khu vực ở A2:A200 khớp với ô G1 VÀ doanh số ở C2:C200 lớn hơn hoặc bằng ngưỡng tại ô H1.'
    },
    requirements: [
      { en: 'Use AVERAGEIFS with average range D2:D200', vi: 'Sử dụng AVERAGEIFS với vùng tính trung bình D2:D200' },
      { en: 'Match region against cell G1', vi: 'Khớp vùng khu vực với ô G1' },
      { en: 'Concatenate operator ">=" & H1 for the sales threshold', vi: 'Nối toán tử ">=" & H1 cho ngưỡng doanh số' }
    ],
    starterCode: '=',
    solutionCode: '=AVERAGEIFS(D2:D200, A2:A200, G1, C2:C200, ">=" & H1)',
    hints: [
      { en: 'Use: =AVERAGEIFS(D2:D200, A2:A200, G1, C2:C200, ">=" & H1)', vi: 'Sử dụng: =AVERAGEIFS(D2:D200, A2:A200, G1, C2:C200, ">=" & H1)' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l10_q1',
      type: 'single_choice',
      question: {
        en: 'Where does the `sum_range` argument go in the `SUMIFS` function compared to the older `SUMIF` function?',
        vi: 'Vị trí của đối số `sum_range` (vùng tính tổng) nằm ở đâu trong hàm `SUMIFS` so với hàm cũ `SUMIF`?'
      },
      options: [
        { en: 'In SUMIFS, sum_range is the FIRST argument; in SUMIF, sum_range is the LAST argument', vi: 'Trong SUMIFS, sum_range là đối số ĐẦU TIÊN; trong SUMIF, sum_range là đối số CUỐI CÙNG' },
        { en: 'In SUMIFS, sum_range is last; in SUMIF, it is first', vi: 'Trong SUMIFS, sum_range ở cuối; trong SUMIF, nó ở đầu' },
        { en: 'They both have sum_range in the middle', vi: 'Cả hai đều có sum_range ở giữa' },
        { en: 'SUMIFS does not use a sum_range', vi: 'SUMIFS không sử dụng sum_range' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SUMIFS requires sum_range as its first argument (=SUMIFS(sum_range, criteria_range1, criteria1, ...)), whereas SUMIF places it at the very end.',
        vi: 'SUMIFS bắt buộc sum_range là đối số đầu tiên (=SUMIFS(vung_tong, vung_dk1, dk1, ...)), trong khi SUMIF đặt nó ở tận cùng.'
      },
      difficulty: 'medium',
      topicId: 'excel_conditional_math'
    },
    {
      id: 'excel_l10_q2',
      type: 'single_choice',
      question: {
        en: 'How do you dynamically reference the value in cell E2 inside a criteria argument checking for values greater than or equal to E2?',
        vi: 'Làm thế nào để tham chiếu động giá trị trong ô E2 bên trong một đối số tiêu chí kiểm tra các giá trị lớn hơn hoặc bằng E2?'
      },
      options: [
        { en: '">=" & E2', vi: '">=" & E2' },
        { en: '">=E2"', vi: '">=E2"' },
        { en: '>=E2', vi: '>=E2' },
        { en: '">{E2}"', vi: '">{E2}"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The comparison operator must be enclosed in quotation marks and concatenated with the cell reference using the ampersand: ">=" & E2.',
        vi: 'Toán tử so sánh phải được đặt trong dấu ngoặc kép và nối với ô tham chiếu bằng dấu và (&): ">=" & E2.'
      },
      difficulty: 'medium',
      topicId: 'excel_conditional_math'
    },
    {
      id: 'excel_l10_q3',
      type: 'single_choice',
      question: {
        en: 'What wildcard character matches ANY sequence of zero or more characters in Excel criteria functions?',
        vi: 'Ký tự đại diện nào khớp với BẤT KỲ chuỗi gồm không hoặc nhiều ký tự trong các hàm tiêu chí của Excel?'
      },
      options: [
        { en: '* (Asterisk)', vi: '* (Dấu hoa thị)' },
        { en: '? (Question mark)', vi: '? (Dấu chấm hỏi)' },
        { en: '% (Percent)', vi: '% (Dấu phần trăm)' },
        { en: '# (Pound)', vi: '# (Dấu thăng)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The asterisk (*) represents any number of characters (e.g. "*North*" matches any text containing "North").',
        vi: 'Dấu hoa thị (*) đại diện cho số lượng ký tự bất kỳ (ví dụ "*North*" khớp với mọi chuỗi chứa từ "North").'
      },
      difficulty: 'easy',
      topicId: 'excel_conditional_math'
    },
    {
      id: 'excel_l10_q4',
      type: 'single_choice',
      question: {
        en: 'What wildcard character matches exactly ONE single character?',
        vi: 'Ký tự đại diện nào khớp với chính xác DUY NHẤT MỘT ký tự đơn?'
      },
      options: [
        { en: '? (Question mark)', vi: '? (Dấu chấm hỏi)' },
        { en: '* (Asterisk)', vi: '* (Dấu hoa thị)' },
        { en: '_ (Underscore)', vi: '_ (Dấu gạch dưới)' },
        { en: '. (Dot)', vi: '. (Dấu chấm)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The question mark (?) represents exactly one single character (e.g. "B?ll" matches "Ball", "Bell", "Bill", "Bull").',
        vi: 'Dấu chấm hỏi (?) đại diện cho chính xác một ký tự đơn (ví dụ "B?ll" khớp với "Ball", "Bell", "Bill", "Bull").'
      },
      difficulty: 'easy',
      topicId: 'excel_conditional_math'
    },
    {
      id: 'excel_l10_q5',
      type: 'single_choice',
      question: {
        en: 'What does `=COUNTIFS(A2:A100, "Red", B2:B100, ">50")` calculate?',
        vi: 'Công thức `=COUNTIFS(A2:A100, "Red", B2:B100, ">50")` tính toán điều gì?'
      },
      options: [
        { en: 'The number of rows where Column A is "Red" AND Column B is greater than 50', vi: 'Số lượng dòng có Cột A là "Red" VÀ Cột B lớn hơn 50' },
        { en: 'The sum of numbers in Column B where Column A is "Red"', vi: 'Tổng các số ở Cột B có Cột A là "Red"' },
        { en: 'The average of Column B', vi: 'Trung bình cộng của Cột B' },
        { en: 'The total rows in the sheet', vi: 'Tổng số dòng trong trang tính' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'COUNTIFS tallies the count of rows that satisfy all provided criteria pairs simultaneously.',
        vi: 'COUNTIFS đếm số lượng dòng đồng thời thỏa mãn tất cả các cặp tiêu chí được cung cấp.'
      },
      difficulty: 'easy',
      topicId: 'excel_conditional_math'
    },
    {
      id: 'excel_l10_q6',
      type: 'single_choice',
      question: {
        en: 'What happens if the ranges in a `SUMIFS` formula are different sizes (e.g. sum_range is `C2:C100` but criteria_range1 is `A2:A50`)?',
        vi: 'Điều gì xảy ra nếu các dải ô trong công thức `SUMIFS` có kích thước khác nhau (ví dụ sum_range là `C2:C100` nhưng criteria_range1 là `A2:A50`)?'
      },
      options: [
        { en: 'Excel returns the `#VALUE!` error', vi: 'Excel trả về lỗi `#VALUE!`' },
        { en: 'Excel calculates up to row 50 and ignores the rest', vi: 'Excel tính đến hàng 50 và bỏ qua phần còn lại' },
        { en: 'Excel automatically resizes the range', vi: 'Excel tự động thay đổi kích thước dải ô' },
        { en: 'It returns 0', vi: 'Nó trả về 0' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SUMIFS/COUNTIFS require all criteria ranges and the sum range to have identical dimensions, otherwise raising #VALUE!.',
        vi: 'SUMIFS/COUNTIFS yêu cầu tất cả các vùng tiêu chí và vùng tính tổng phải có cùng kích thước hàng cột, nếu không sẽ báo lỗi #VALUE!.'
      },
      difficulty: 'medium',
      topicId: 'excel_conditional_math'
    },
    {
      id: 'excel_l10_q7',
      type: 'single_choice',
      question: {
        en: 'Which formula calculates the average sales amount in column D for transactions occurring in the "East" region (column B)?',
        vi: 'Công thức nào tính doanh số trung bình ở cột D cho các giao dịch diễn ra tại khu vực "East" (cột B)?'
      },
      options: [
        { en: '=AVERAGEIFS(D2:D100, B2:B100, "East")', vi: '=AVERAGEIFS(D2:D100, B2:B100, "East")' },
        { en: '=AVERAGEIF(D2:D100, "East", B2:B100)', vi: '=AVERAGEIF(D2:D100, "East", B2:B100)' },
        { en: '=AVERAGE(D2:D100, "East")', vi: '=AVERAGE(D2:D100, "East")' },
        { en: '=SUMIFS(D2:D100, B2:B100, "East") / COUNT(D2:D100)', vi: '=SUMIFS(D2:D100, B2:B100, "East") / COUNT(D2:D100)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '=AVERAGEIFS(average_range, criteria_range, criteria) correctly averages column D where column B equals "East".',
        vi: '=AVERAGEIFS(vung_tb, vung_dk, tieu_chi) tính trung bình cột D chính xác cho các ô có cột B là "East".'
      },
      difficulty: 'easy',
      topicId: 'excel_conditional_math'
    },
    {
      id: 'excel_l10_q8',
      type: 'true_false',
      question: {
        en: 'True or False: Criteria text matching in `COUNTIF` and `SUMIF` is case-insensitive (e.g. "apple" matches "APPLE" and "Apple").',
        vi: 'Đúng hay Sai: Việc so khớp tiêu chí văn bản trong các hàm `COUNTIF` và `SUMIF` không phân biệt chữ hoa chữ thường (ví dụ "apple" khớp với "APPLE" và "Apple").'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Standard Excel conditional math functions do not differentiate between uppercase and lowercase text.',
        vi: 'Đúng. Các hàm toán có điều kiện tiêu chuẩn trong Excel không phân biệt chữ hoa và chữ thường.'
      },
      difficulty: 'easy',
      topicId: 'excel_conditional_math'
    },
    {
      id: 'excel_l10_q9',
      type: 'single_choice',
      question: {
        en: 'How would you count how many cells in range A1:A50 contain the exact text containing the literal character "?" (question mark)?',
        vi: 'Làm thế nào để đếm số ô trong vùng A1:A50 có chứa chính xác ký tự "?" (dấu chấm hỏi)?'
      },
      options: [
        { en: '=COUNTIF(A1:A50, "*~?*")', vi: '=COUNTIF(A1:A50, "*~?*")' },
        { en: '=COUNTIF(A1:A50, "*?*")', vi: '=COUNTIF(A1:A50, "*?*")' },
        { en: '=COUNTIF(A1:A50, "\\?")', vi: '=COUNTIF(A1:A50, "\\?")' },
        { en: '=COUNTIF(A1:A50, "[?]")', vi: '=COUNTIF(A1:A50, "[?]")' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The tilde (~) escapes wildcard characters (*, ?, ~) so Excel treats them as literal characters.',
        vi: 'Dấu ngã (~) dùng để thoát các ký tự đại diện (*, ?, ~) để Excel coi chúng là ký tự chữ thông thường.'
      },
      difficulty: 'hard',
      topicId: 'excel_conditional_math'
    },
    {
      id: 'excel_l10_q10',
      type: 'single_choice',
      question: {
        en: 'Which formula sums sales in column E for records where the date in column B is in year 2026 (from 2026-01-01 to 2026-12-31)?',
        vi: 'Công thức nào tính tổng doanh số ở cột E cho các bản ghi có ngày ở cột B trong năm 2026 (từ 01/01/2026 đến 31/12/2026)?'
      },
      options: [
        { en: '=SUMIFS(E2:E100, B2:B100, ">=2026-01-01", B2:B100, "<=2026-12-31")', vi: '=SUMIFS(E2:E100, B2:B100, ">=2026-01-01", B2:B100, "<=2026-12-31")' },
        { en: '=SUMIFS(E2:E100, B2:B100, "2026")', vi: '=SUMIFS(E2:E100, B2:B100, "2026")' },
        { en: '=SUMIF(B2:B100, 2026, E2:E100)', vi: '=SUMIF(B2:B100, 2026, E2:E100)' },
        { en: '=SUM(E2:E100, YEAR(B2:B100)=2026)', vi: '=SUM(E2:E100, YEAR(B2:B100)=2026)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SUMIFS applies two boundary conditions on the date column to capture the full calendar year.',
        vi: 'SUMIFS áp dụng hai điều kiện chặn đầu cuối trên cột ngày tháng để bao trọn toàn bộ năm dương lịch.'
      },
      difficulty: 'medium',
      topicId: 'excel_conditional_math'
    }
  ]
};

saveLesson('lesson10.ts', 'lesson10', lesson10);
console.log('Saved lessons 09 & 10.');
