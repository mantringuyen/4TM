import fs from 'fs';
import path from 'path';
import { Lesson } from '../src/types';

const basicMod01Dir = path.join(process.cwd(), 'src/data/excel/basic/module01');
const basicMod02Dir = path.join(process.cwd(), 'src/data/excel/basic/module02');
fs.mkdirSync(basicMod01Dir, { recursive: true });
fs.mkdirSync(basicMod02Dir, { recursive: true });

function saveLesson(dir: string, filename: string, varName: string, lesson: Lesson) {
  const code = `import { Lesson } from '../../../../types';\n\nexport const ${varName}: Lesson = ${JSON.stringify(lesson, null, 2)};\nexport default ${varName};\n`;
  fs.writeFileSync(path.join(dir, filename), code, 'utf8');
  console.log(`Saved ${filename} (${lesson.id})`);
}

// =========================================================================
// LESSON 02: Basic Arithmetic Formulas & Order of Operations
// =========================================================================
export const lesson02: Lesson = {
  id: 'excel_lesson_arithmetic',
  order: 2,
  courseId: 'excel',
  levelId: 'basic',
  topicId: 'excel_formulas',
  title: {
    en: 'Basic Arithmetic Formulas & Order of Operations (PEMDAS/BODMAS)',
    vi: 'Công Thức Số Học Cơ Bản & Thứ Tự Thực Hiện Phép Tính (PEMDAS)'
  },
  summary: {
    en: 'Master Excel mathematical formula syntax (=), arithmetic operators (+, -, *, /, ^, %), and mathematical precedence rules to build flawless financial and operational models.',
    vi: 'Làm chủ cú pháp công thức toán học Excel (=), các toán tử số học (+, -, *, /, ^, %) và quy tắc thứ tự ưu tiên phép tính để xây dựng mô hình tài chính chuẩn xác.'
  },
  learn: {
    introduction: {
      en: 'Every calculation in Microsoft Excel begins with an equal sign (=). Without an equal sign, Excel treats your input as static text. Master the order of mathematical operations (PEMDAS/BODMAS) to prevent disastrous calculation errors in business models, gross margin calculations, and compound growth formulas.',
      vi: 'Mọi phép tính trong Microsoft Excel đều bắt đầu bằng dấu bằng (=). Nếu không có dấu bằng, Excel sẽ coi nội dung nhập là văn bản tĩnh. Nắm vững thứ tự ưu tiên phép toán (PEMDAS/BODMAS) để ngăn ngừa các lỗi tính toán tai hại trong mô hình tài chính, tính tỷ suất lợi nhuận gộp và tốc độ tăng trưởng kép.'
    },
    conceptExplanation: {
      en: `### 1. Excel Mathematical Operators
- **Addition (+)**: \`=A1 + B1\`
- **Subtraction (-)**: \`=A1 - B1\`
- **Multiplication (*)**: \`=A1 * B1\`
- **Division (/)**: \`=A1 / B1\`
- **Exponentiation (^)**: \`=A1 ^ 2\` (A1 squared) or \`=A1 ^ (1/3)\` (cube root)
- **Percentage (%)**: \`=A1 * 15%\` (multiplies by 0.15)
- **Negation (-)**: \`=-A1\`

### 2. The Order of Operations (PEMDAS / BODMAS)
When multiple operators appear in a single formula, Excel evaluates them in a strict mathematical hierarchy:
1. **P - Parentheses \`()\`**: Expressions inside inner parentheses are always computed first.
2. **E - Exponents \`^\`**: Powers and roots.
3. **M/D - Multiplication & Division \`* , /\`**: Evaluated from left to right.
4. **A/S - Addition & Subtraction \`+ , -\`**: Evaluated from left to right.

### 3. Business Formula Patterns
- **Gross Profit**: \`=Revenue - COGS\` (e.g., \`=B2 - C2\`)
- **Gross Margin %**: \`=(Revenue - COGS) / Revenue\` (e.g., \`=(B2 - C2) / B2\`)
- **Markup %**: \`=(SellingPrice - Cost) / Cost\`
- **Sales Tax Total**: \`=Subtotal * (1 + TaxRate)\`
- **Compounded Amount**: \`=Principal * (1 + Rate) ^ Years\``,
      vi: `### 1. Các Toán Tử Số Học Trong Excel
- **Phép cộng (+)**: \`=A1 + B1\`
- **Phép trừ (-)**: \`=A1 - B1\`
- **Phép nhân (*)**: \`=A1 * B1\`
- **Phép chia (/)**: \`=A1 / B1\`
- **Phép lũy thừa (^)**: \`=A1 ^ 2\` (A1 bình phương) hoặc \`=A1 ^ (1/3)\` (căn bậc ba)
- **Phần trăm (%)**: \`=A1 * 15%\` (nhân với 0.15)
- **Đổi dấu (-)**: \`=-A1\`

### 2. Thứ Tự Ưu Tiên Phép Tính (PEMDAS / BODMAS)
Khi nhiều toán tử xuất hiện trong một công thức, Excel thực hiện theo thứ bậc toán học nghiêm ngặt:
1. **P - Dấu ngoặc đơn \`()\`**: Biểu thức trong ngoặc luôn được tính trước tiên.
2. **E - Lũy thừa \`^\`**: Số mũ và căn bậc.
3. **M/D - Phép nhân & chia \`* , /\`**: Tính toán tuần tự từ trái sang phải.
4. **A/S - Phép cộng & trừ \`+ , -\`**: Tính toán tuần tự từ trái sang phải.

### 3. Các Mẫu Công Thức Kinh Doanh Phổ Biến
- **Lợi nhuận gộp**: \`=DoanhThu - GiaVon\` (ví dụ: \`=B2 - C2\`)
- **Tỷ suất lợi nhuận gộp (%)**: \`=(DoanhThu - GiaVon) / DoanhThu\` (ví dụ: \`=(B2 - C2) / B2\`)
- **Tỷ lệ tăng giá Markup (%)**: \`=(GiaBan - GiaVon) / GiaVon\`
- **Tổng tiền gồm thuế VAT**: \`=TienHang * (1 + ThueSuat)\`
- **Giá trị tương lai lãi kép**: \`=VonGoc * (1 + LaiSuat) ^ SoNam\``
    },
    syntax: `# Basic Formula Syntax
=[Cell1] [Operator] [Cell2]

# Parentheses Enforcement:
=(B2 - C2) / B2        -> Correct Gross Margin %
=B2 - C2 / B2          -> INCORRECT (Computes B2 - (C2 / B2))`,
    examples: [
      {
        title: { en: 'Calculating Gross Margin Percentage', vi: 'Tính Tỷ Suất Lợi Nhuận Gộp' },
        code: `Revenue in B2: $500,000
COGS in C2:    $350,000

Correct Formula in D2:   =(B2-C2)/B2   -> Result: 0.30 (30.0%)
Incorrect Formula in D2: =B2-C2/B2     -> Result: 499,999.30 (Fatal Order of Ops Error)`,
        description: {
          en: 'Without parentheses, division occurs before subtraction, producing nonsensical commercial results.',
          vi: 'Nếu thiếu ngoặc đơn, phép chia diễn ra trước phép trừ, tạo ra kết quả kinh doanh hoàn toàn sai lệch.'
        }
      },
      {
        title: { en: 'Compound Annual Growth Rate Formula', vi: 'Công Thức Tốc Độ Tăng Trưởng Kép Hàng Năm (CAGR)' },
        code: `Initial Value (Year 0) in B2: 100,000
Final Value (Year 5) in B3:   250,000
Formula for 5-yr CAGR in B4:  =(B3/B2)^(1/5) - 1  -> Result: 20.11%`,
        description: {
          en: 'Demonstrates combining parentheses, division, exponentiation, and subtraction in a single financial formula.',
          vi: 'Minh họa việc kết hợp dấu ngoặc, phép chia, phép lũy thừa và phép trừ trong một công thức tài chính.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Omitting parentheses in percentage change calculations: =NewPrice - OldPrice / OldPrice.',
          vi: 'Quên dấu ngoặc đơn khi tính tỷ lệ thay đổi phần trăm: =GiaMoi - GiaCu / GiaCu.'
        },
        correction: {
          en: 'Always wrap the difference in parentheses: =(NewPrice - OldPrice) / OldPrice.',
          vi: 'Luôn bao bọc phần hiệu số trong ngoặc đơn: =(GiaMoi - GiaCu) / GiaCu.'
        }
      },
      {
        mistake: {
          en: 'Dividing by zero or referencing an empty cell in the denominator, resulting in #DIV/0! errors.',
          vi: 'Chia cho số 0 hoặc tham chiếu đến một ô rỗng ở mẫu số, gây ra lỗi #DIV/0!.'
        },
        correction: {
          en: 'Check if the denominator is greater than zero or wrap with IFERROR or IF logic.',
          vi: 'Kiểm tra xem mẫu số có lớn hơn 0 hay không hoặc bọc bằng hàm IFERROR hoặc IF.'
        }
      }
    ],
    tips: [
      { en: 'Formula View Toggle: Press Ctrl + ` (grave accent) to instantly toggle between displaying formula results and formula text across the entire sheet.', vi: 'Bật/tắt xem công thức: Nhấn Ctrl + ` (dấu phẩy trên) để chuyển đổi tức thì giữa việc hiển thị kết quả và hiển thị nguyên văn công thức.' },
      { en: 'Visual Color Coding: When editing a formula, Excel color-codes cell references and surrounds referenced cells with matching colored borders.', vi: 'Mã màu trực quan: Khi chỉnh sửa công thức, Excel tô màu các ô tham chiếu và đóng khung ô tương ứng bằng đường viền cùng màu.' }
    ]
  },
  exercisePool: [
    {
      id: 'excel_l2_ex1',
      type: 'complete_code',
      title: { en: 'Calculate Total Sales After Discount', vi: 'Tính Tổng Doanh Số Sau Giảm Giá' },
      instruction: {
        en: 'Write an Excel formula to calculate the final price where unit price is in cell B2 ($120), quantity is in cell C2 (5 units), and discount rate is in cell D2 (10% or 0.10). Formula: Price * Qty * (1 - Discount).',
        vi: 'Viết công thức Excel tính giá cuối cùng với đơn giá ở ô B2 ($120), số lượng ở ô C2 (5 cái) và tỷ lệ chiết khấu ở ô D2 (10% hay 0.10). Công thức: ĐơnGiá * SốLượng * (1 - ChiếtKhấu).'
      },
      starterCode: '=(B2*C2)*',
      solutionCode: '=(B2*C2)*(1-D2)',
      expectedOutput: '=(B2*C2)*(1-D2)',
      hint: { en: 'Multiply total amount (B2*C2) by (1-D2).', vi: 'Nhân tổng tiền hàng (B2*C2) với (1-D2).' },
      explanation: { en: 'Using parentheses ensures that (1 - D2) computes 0.90 before multiplying by total gross amount.', vi: 'Dấu ngoặc đơn đảm bảo (1 - D2) tính ra 0.90 trước khi nhân với tổng giá trị hàng.' }
    },
    {
      id: 'excel_l2_ex2',
      type: 'complete_code',
      title: { en: 'Profit Margin Ratio Calculation', vi: 'Tính Tỷ Suất Lợi Nhuận' },
      instruction: {
        en: 'Write the formula to calculate profit margin where Net Profit is in cell E5 and Total Revenue is in cell B5.',
        vi: 'Viết công thức tính tỷ suất lợi nhuận trong đó Lợi nhuận ròng ở ô E5 và Tổng doanh thu ở ô B5.'
      },
      starterCode: '=',
      solutionCode: '=E5/B5',
      expectedOutput: '=E5/B5',
      hint: { en: 'Divide net profit (E5) by total revenue (B5).', vi: 'Chia lợi nhuận ròng (E5) cho tổng doanh thu (B5).' },
      explanation: { en: 'Profit Margin is calculated as Net Profit divided by Total Revenue (=E5/B5).', vi: 'Tỷ suất lợi nhuận được tính bằng Lợi nhuận ròng chia cho Tổng doanh thu (=E5/B5).' }
    }
  ],
  challenge: {
    id: 'excel_l2_challenge',
    title: { en: 'Multi-Item Invoice Calculation Model', vi: 'Mô Hình Tính Hóa Đơn Bán Hàng Đa Mặt Hàng' },
    description: {
      en: 'Construct the formula for cell F2 to calculate total invoice line total with 8% sales tax applied to the discounted subtotal. Unit Price is in B2, Units in C2, Discount % in D2, and Tax Rate (8%) is constant in $G$1.',
      vi: 'Xây dựng công thức cho ô F2 để tính tổng tiền dòng hóa đơn bao gồm 8% thuế bán hàng áp dụng cho số tiền sau chiết khấu. Đơn giá ở B2, Số lượng ở C2, % Chiết khấu ở D2 và Thuế suất (8%) cố định ở $G$1.'
    },
    requirements: [
      { en: 'Compute discounted subtotal: B2 * C2 * (1 - D2)', vi: 'Tính tiền sau chiết khấu: B2 * C2 * (1 - D2)' },
      { en: 'Multiply by (1 + $G$1) to add tax', vi: 'Nhân với (1 + $G$1) để cộng thêm thuế' }
    ],
    starterCode: '=B2*C2*(1-D2)*',
    solutionCode: '=B2*C2*(1-D2)*(1+$G$1)',
    hints: [
      { en: 'Multiply the discounted subtotal by (1 + $G$1).', vi: 'Nhân phần tiền sau chiết khấu với (1 + $G$1).' }
    ]
  },
  quizQuestionPool: [
    {
      id: 'excel_l2_q1',
      type: 'single_choice',
      question: {
        en: 'What is the result of the Excel formula `=10 + 5 * 2`?',
        vi: 'Kết quả của công thức Excel `=10 + 5 * 2` là bao nhiêu?'
      },
      options: [
        { en: '20', vi: '20' },
        { en: '30', vi: '30' },
        { en: '15', vi: '15' },
        { en: '25', vi: '25' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Multiplication has higher precedence than addition: 5 * 2 = 10, then 10 + 10 = 20.',
        vi: 'Phép nhân có độ ưu tiên cao hơn phép cộng: 5 * 2 = 10, sau đó 10 + 10 = 20.'
      },
      difficulty: 'easy',
      topicId: 'excel_formulas'
    },
    {
      id: 'excel_l2_q2',
      type: 'single_choice',
      question: {
        en: 'What is the result of the formula `=(10 + 5) * 2`?',
        vi: 'Kết quả của công thức `=(10 + 5) * 2` là bao nhiêu?'
      },
      options: [
        { en: '30', vi: '30' },
        { en: '20', vi: '20' },
        { en: '25', vi: '25' },
        { en: '15', vi: '15' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Parentheses force addition to occur first: (10 + 5) = 15, then 15 * 2 = 30.',
        vi: 'Dấu ngoặc đơn ép phép cộng tính trước: (10 + 5) = 15, sau đó 15 * 2 = 30.'
      },
      difficulty: 'easy',
      topicId: 'excel_formulas'
    },
    {
      id: 'excel_l2_q3',
      type: 'single_choice',
      question: {
        en: 'Which operator in Excel is used for calculating exponents / powers (e.g. 5 squared)?',
        vi: 'Toán tử nào trong Excel được sử dụng để tính lũy thừa / số mũ (ví dụ: 5 bình phương)?'
      },
      options: [
        { en: 'Caret (^)', vi: 'Dấu mũ (^)' },
        { en: 'Asterisk (*)', vi: 'Dấu sao (*)' },
        { en: 'Double asterisk (**)', vi: 'Hai dấu sao (**)' },
        { en: 'Percent (%)', vi: 'Dấu phần trăm (%)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Excel uses the caret symbol (^) for exponentiation (e.g. `=5^2` returns 25).',
        vi: 'Excel sử dụng dấu mũ (^) cho phép lũy thừa (ví dụ: `=5^2` trả về 25).'
      },
      difficulty: 'easy',
      topicId: 'excel_formulas'
    },
    {
      id: 'excel_l2_q4',
      type: 'single_choice',
      question: {
        en: 'What is the evaluated output of `=2 ^ 3 * 2` in Excel?',
        vi: 'Kết quả tính toán của `=2 ^ 3 * 2` trong Excel là bao nhiêu?'
      },
      options: [
        { en: '16', vi: '16' },
        { en: '64', vi: '64' },
        { en: '12', vi: '12' },
        { en: '8', vi: '8' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Exponentiation precedes multiplication: 2^3 = 8, then 8 * 2 = 16.',
        vi: 'Phép lũy thừa được ưu tiên trước phép nhân: 2^3 = 8, sau đó 8 * 2 = 16.'
      },
      difficulty: 'medium',
      topicId: 'excel_formulas'
    },
    {
      id: 'excel_l2_q5',
      type: 'single_choice',
      question: {
        en: 'If you enter `100 + 50` into a cell without a leading equal sign (=), what will Excel do?',
        vi: 'Nếu bạn nhập `100 + 50` vào một ô mà không có dấu bằng (=) ở đầu, Excel sẽ làm gì?'
      },
      options: [
        { en: 'Store and display it as literal text "100 + 50"', vi: 'Lưu và hiển thị dưới dạng chuỗi văn bản thuần túy "100 + 50"' },
        { en: 'Automatically calculate 150', vi: 'Tự động tính ra 150' },
        { en: 'Return a #NAME? error', vi: 'Trả về lỗi #NAME?' },
        { en: 'Clear the cell content', vi: 'Xóa nội dung ô' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'All formulas must begin with an equal sign (=). Without it, entries containing mathematical symbols are stored as static text.',
        vi: 'Mọi công thức phải bắt đầu bằng dấu bằng (=). Nếu không, dữ liệu chứa ký hiệu toán học sẽ được lưu dưới dạng văn bản tĩnh.'
      },
      difficulty: 'easy',
      topicId: 'excel_formulas'
    },
    {
      id: 'excel_l2_q6',
      type: 'single_choice',
      question: {
        en: 'What Excel error occurs when a formula attempts to divide a numeric value by an empty cell or zero?',
        vi: 'Lỗi Excel nào xảy ra khi một công thức cố gắng chia một giá trị số cho một ô trống hoặc số không?'
      },
      options: [
        { en: '#DIV/0!', vi: '#DIV/0!' },
        { en: '#VALUE!', vi: '#VALUE!' },
        { en: '#NULL!', vi: '#NULL!' },
        { en: '#NUM!', vi: '#NUM!' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '#DIV/0! occurs whenever a formula attempts mathematical division by zero or an empty cell.',
        vi: '#DIV/0! xuất hiện bất cứ khi nào công thức thực hiện phép chia cho số 0 hoặc ô rỗng.'
      },
      difficulty: 'easy',
      topicId: 'excel_formulas'
    },
    {
      id: 'excel_l2_q7',
      type: 'single_choice',
      question: {
        en: 'Which formula correctly computes the percentage change between initial price in A2 and final price in B2?',
        vi: 'Công thức nào tính đúng tỷ lệ thay đổi phần trăm giữa giá ban đầu ở A2 và giá cuối cùng ở B2?'
      },
      options: [
        { en: '=(B2 - A2) / A2', vi: '=(B2 - A2) / A2' },
        { en: '=B2 - A2 / A2', vi: '=B2 - A2 / A2' },
        { en: '=(B2 - A2) / B2', vi: '=(B2 - A2) / B2' },
        { en: '=A2 / B2 - 1', vi: '=A2 / B2 - 1' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Percentage change is (New - Old) / Old, written as `=(B2 - A2) / A2`.',
        vi: 'Tỷ lệ thay đổi phần trăm là (Mới - Cũ) / Cũ, viết là `=(B2 - A2) / A2`.'
      },
      difficulty: 'medium',
      topicId: 'excel_formulas'
    },
    {
      id: 'excel_l2_q8',
      type: 'single_choice',
      question: {
        en: 'What keyboard shortcut toggles formula display across the entire active sheet?',
        vi: 'Phím tắt nào chuyển đổi hiển thị công thức trên toàn bộ trang tính đang hoạt động?'
      },
      options: [
        { en: 'Ctrl + ` (grave accent)', vi: 'Ctrl + ` (dấu phẩy trên)' },
        { en: 'Ctrl + Alt + F', vi: 'Ctrl + Alt + F' },
        { en: 'Shift + F9', vi: 'Shift + F9' },
        { en: 'Alt + Shift + Enter', vi: 'Alt + Shift + Enter' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Ctrl + ` toggles between Show Formulas mode and regular calculated values mode.',
        vi: 'Ctrl + ` chuyển đổi qua lại giữa chế độ Hiển thị Công thức và hiển thị Giá trị tính toán.'
      },
      difficulty: 'medium',
      topicId: 'excel_formulas'
    },
    {
      id: 'excel_l2_q9',
      type: 'single_choice',
      question: {
        en: 'What is the evaluated result of `=100 * 5%` in Excel?',
        vi: 'Kết quả tính toán của `=100 * 5%` trong Excel là bao nhiêu?'
      },
      options: [
        { en: '5', vi: '5' },
        { en: '500', vi: '500' },
        { en: '0.05', vi: '0.05' },
        { en: '50', vi: '50' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The % operator divides the preceding number by 100, so 100 * 0.05 = 5.',
        vi: 'Toán tử % chia số đứng trước cho 100, do đó 100 * 0.05 = 5.'
      },
      difficulty: 'easy',
      topicId: 'excel_formulas'
    },
    {
      id: 'excel_l2_q10',
      type: 'single_choice',
      question: {
        en: 'In the formula `=(A1 + B1) * C1 / (D1 ^ 2)`, what is the very first calculation performed?',
        vi: 'Trong công thức `=(A1 + B1) * C1 / (D1 ^ 2)`, phép tính nào được thực hiện đầu tiên?'
      },
      options: [
        { en: 'A1 + B1 (leftmost parenthesis expression)', vi: 'A1 + B1 (biểu thức trong ngoặc ngoài cùng bên trái)' },
        { en: 'D1 ^ 2 (exponentiation)', vi: 'D1 ^ 2 (phép lũy thừa)' },
        { en: 'B1 * C1 (multiplication)', vi: 'B1 * C1 (phép nhân)' },
        { en: 'C1 / D1 (division)', vi: 'C1 / D1 (phép chia)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Parenthesized groups are evaluated first from left to right, so (A1 + B1) executes first.',
        vi: 'Các nhóm nằm trong ngoặc đơn được tính trước từ trái sang phải, do đó (A1 + B1) được thực hiện đầu tiên.'
      },
      difficulty: 'medium',
      topicId: 'excel_formulas'
    }
  ]
};

saveLesson(basicMod01Dir, 'lesson02.ts', 'lesson02', lesson02);
