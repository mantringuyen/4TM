import { Lesson } from '../../../../types';

export const lesson08: Lesson = {
  id: 'pbi_lesson_8',
  moduleId: 'pbi_mod_3',
  levelId: 'intermediate',
  courseId: 'powerbi',
  order: 8,
  topicId: 'aggregations_and_iterators',
  title: {
    en: 'Aggregations & Iterators: SUM, AVERAGE, COUNTROWS, SUMX, AVERAGEX',
    vi: 'Hàm Tổng Hợp & Hàm Lặp (Iterators): SUM, AVERAGE, COUNTROWS, SUMX, AVERAGEX'
  },
  summary: {
    en: 'Differentiate standard aggregators from row-by-row iterators ending in X, calculating dynamic multi-column row expressions.',
    vi: 'Phân biệt hàm tổng hợp tiêu chuẩn và hàm lặp đuôi X duyệt từng dòng (Iterators), tính toán biểu thức nhiều cột linh hoạt.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'In DAX, calculations are broadly split into standard Aggregators (like SUM, AVERAGE, MIN, MAX, COUNTROWS) which operate on a single column, and Iterators (functions ending with an "X", like SUMX, AVERAGEX, MAXX, MINX, COUNTX) which take a table, iterate through each row establishing a temporary row context, evaluate an expression, and aggregate the final result.',
      vi: 'Trong DAX, các hàm tính toán được chia làm 2 nhóm lớn: Hàm tổng hợp chuẩn (như SUM, AVERAGE, MIN, MAX, COUNTROWS) nhận đầu vào là một cột duy nhất, và Hàm lặp Iterators (các hàm có đuôi "X" như SUMX, AVERAGEX, MAXX, MINX, COUNTX) nhận tham số đầu tiên là một bảng, duyệt qua từng dòng để tạo ngữ cảnh dòng tạm thời, tính biểu thức rồi tổng hợp lại kết quả cuối cùng.'
    },
    conceptExplanation: {
      en: 'Key principles:\n1. Standard Aggregators: SUM(Sales[Revenue]) aggregates a single pre-existing column directly.\n2. Iterators (The "X" Functions): Syntax is ITERATOR(Table, Expression). For each row in Table, DAX evaluates Expression, then aggregates (sums, averages, etc.) across the table.\n3. Eliminating Calculated Columns: Instead of creating a physical column for Quantity * Price, use SUMX(Sales, Sales[Quantity] * Sales[UnitPrice]).\n4. COUNTROWS vs COUNT: COUNTROWS(Table) counts all rows including blanks and is faster than column-based COUNT().',
      vi: 'Các nguyên lý cốt lõi:\n1. Hàm tổng hợp tiêu chuẩn: SUM(Sales[Revenue]) tính tổng trực tiếp trên một cột duy nhất có sẵn.\n2. Hàm lặp Iterators (Họ hàm đuôi "X"): Cú pháp là ITERATOR(Bảng, BiểuThức). Với mỗi dòng trong Bảng, DAX tính BiểuThức tương ứng rồi mới cộng tổng/trung bình các kết quả đó lại.\n3. Loại bỏ cột tính toán thừa: Thay vì tạo cột vật lý tốn RAM để tính Quantity * Price, hãy dùng SUMX(Sales, Sales[Quantity] * Sales[UnitPrice]).\n4. COUNTROWS so với COUNT: COUNTROWS(Bảng) đếm toàn bộ số dòng của bảng (kể cả dòng trống) và chạy nhanh hơn nhiều so với COUNT() trên cột.'
    },
    syntax: '// Standard Aggregator (single column):\nTotal Revenue = SUM(Sales[Revenue])\n\n// Iterator (table + row expression):\nTotal Sales Amount = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice] * (1 - Sales[DiscountRate]))\n\n// Table Row Count:\nTotal Transactions = COUNTROWS(Sales)',
    examples: [
      {
        title: {
          en: 'Row-by-Row Evaluation with SUMX',
          vi: 'Tính Toán Từng Dòng Với SUMX'
        },
        code: `// Calculate Total Revenue without storing a Revenue column:
Total Revenue = 
SUMX(
    Sales,
    Sales[Quantity] * RELATED(Products[Price])
)

// Calculate Average Order Value:
Average Order Value = 
AVERAGEX(
    VALUES(Sales[OrderID]),
    [Total Revenue]
)`,
        language: 'dax',
        explanation: {
          en: 'SUMX loops over the Sales table, computes Quantity * Price for each row, and sums the results on the fly without consuming RAM.',
          vi: 'SUMX duyệt qua từng dòng của bảng Sales, nhân Số lượng với Đơn giá rồi cộng dồn kết quả tức thời mà không tốn dung lượng RAM lưu cột vật lý.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Attempting to put multiple column arithmetic inside a standard SUM function (e.g. SUM(Sales[Qty] * Sales[Price])).',
          vi: 'Cố tình viết biểu thức nhân nhiều cột bên trong hàm SUM chuẩn (như SUM(Sales[Qty] * Sales[Price])).'
        },
        correction: {
          en: 'Standard SUM only accepts a single column name as argument. Use SUMX(Sales, Sales[Qty] * Sales[Price]) for multi-column row expressions.',
          vi: 'Hàm SUM chuẩn chỉ nhận duy nhất 1 tên cột làm đối số. Phải dùng SUMX(Sales, Sales[Qty] * Sales[Price]) cho các biểu thức tính toán nhiều cột.'
        }
      },
      {
        mistake: {
          en: 'Using COUNT(Sales[OrderID]) instead of COUNTROWS(Sales).',
          vi: 'Dùng COUNT(Sales[OrderID]) thay vì COUNTROWS(Sales).'
        },
        correction: {
          en: 'COUNTROWS is optimized internally by the VertiPaq storage engine metadata and executes significantly faster.',
          vi: 'Hàm COUNTROWS được bộ máy VertiPaq tối ưu trực tiếp từ metadata nên tốc độ thực thi nhanh hơn rất nhiều.'
        }
      }
    ],
    tips: [
      {
        en: 'Whenever you need to iterate over a filtered subset of a table, pass a FILTER() function as the first argument of SUMX (e.g. SUMX(FILTER(Sales, Sales[Quantity] > 5), ...)).',
        vi: 'Bất cứ khi nào cần duyệt trên một tập con đã lọc, hãy truyền hàm FILTER() làm đối số bảng đầu tiên của SUMX (ví dụ: SUMX(FILTER(Sales, Sales[Quantity] > 5), ...)).'
      },
      {
        en: 'Use MAXX and MINX to dynamically identify the highest or lowest single transaction value across any filtered dimension.',
        vi: 'Dùng MAXX và MINX để tìm nhanh giá trị giao dịch cao nhất hoặc thấp nhất trên bất kỳ chiều phân tích nào.'
      }
    ],
    practiceStarterCode: `// Write an iterator calculating total gross revenue
Total Revenue = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])`
  },
  exercisePool: [
    {
      id: 'pbi_ex_8_1',
      type: 'predict_output',
      title: {
        en: 'Syntax Validity: SUM vs SUMX',
        vi: 'Tính Hợp Lệ Cú Pháp: SUM So Với SUMX'
      },
      instruction: {
        en: 'Is SUM(Sales[Quantity] * Sales[UnitPrice]) valid DAX syntax?',
        vi: 'Biểu thức SUM(Sales[Quantity] * Sales[UnitPrice]) có phải cú pháp DAX hợp lệ không?'
      },
      starterCode: '// Is this valid syntax?',
      solutionCode: 'No, SUM only accepts a single column argument; use SUMX instead.',
      options: [
        'No, SUM only accepts a single column argument; use SUMX instead.',
        'Yes, it is standard DAX syntax.',
        'Yes, but only in Power Query.',
        'No, DAX does not support multiplication.'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'Standard SUM accepts only a single column reference. Any expression involving multiple columns or operations requires an iterator like SUMX.',
        vi: 'Hàm SUM chuẩn chỉ nhận 1 tham chiếu cột đơn lẻ. Mọi biểu thức kết hợp nhiều cột bắt buộc phải dùng hàm lặp như SUMX.'
      }
    },
    {
      id: 'pbi_ex_8_2',
      type: 'complete_code',
      title: {
        en: 'Complete SUMX Multi-Column Expression',
        vi: 'Hoàn Thiện Biểu Thức Nhiều Cột Bằng SUMX'
      },
      instruction: {
        en: 'Complete the SUMX formula to calculate Total Sales by multiplying Quantity by UnitPrice.',
        vi: 'Hoàn thiện công thức SUMX để tính Total Sales bằng cách nhân Quantity với UnitPrice.'
      },
      starterCode: 'Total Sales = SUMX(Sales, Sales[Quantity] * Sales[___])',
      solutionCode: 'Total Sales = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])',
      hint: {
        en: 'UnitPrice',
        vi: 'UnitPrice'
      },
      explanation: {
        en: 'SUMX iterates through the Sales table row by row, evaluates Quantity * UnitPrice, and returns the total sum.',
        vi: 'SUMX duyệt qua từng dòng bảng Sales, tính Quantity * UnitPrice và trả về tổng cộng.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_8',
    title: {
      en: 'Implement Advanced Iterator Suite',
      vi: 'Xây Dựng Bộ Hàm Lặp DAX Nâng Cao'
    },
    description: {
      en: 'Implement complete iterator measures: Total Net Sales (applying discount), Transaction Count, and Max Order Value.',
      vi: 'Viết các measure hàm lặp hoàn chỉnh: Total Net Sales (áp dụng chiết khấu), Transaction Count và Max Order Value.'
    },
    requirements: [
      { en: '1. Total Net Sales = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice] * (1 - Sales[Discount]))', vi: '1. Total Net Sales = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice] * (1 - Sales[Discount]))' },
      { en: '2. Total Transactions = COUNTROWS(Sales)', vi: '2. Total Transactions = COUNTROWS(Sales)' },
      { en: '3. Max Line Value = MAXX(Sales, Sales[Quantity] * Sales[UnitPrice])', vi: '3. Max Line Value = MAXX(Sales, Sales[Quantity] * Sales[UnitPrice])' }
    ],
    starterCode: `Total Net Sales = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice] * (1 - Sales[Discount]))
Total Transactions = COUNTROWS(Sales)
Max Line Value = MAXX(Sales, Sales[Quantity] * Sales[UnitPrice])`,
    solutionCode: `Total Net Sales = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice] * (1 - Sales[Discount]))
Total Transactions = COUNTROWS(Sales)
Max Line Value = MAXX(Sales, Sales[Quantity] * Sales[UnitPrice])`,
    hints: [
      {
        en: 'Iterators dynamically evaluate row logic without needing physical calculated columns.',
        vi: 'Các hàm lặp tự động tính toán từng dòng mà không cần tạo thêm cột tính toán vật lý.'
      }
    ],
    solutionExplanation: {
      en: 'Using iterators in measures keeps the data model lean and highly responsive.',
      vi: 'Sử dụng hàm lặp trong measure giúp mô hình dữ liệu gọn nhẹ và phản hồi nhanh.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_8_1',
      type: 'single_choice',
      question: {
        en: 'What is the key difference between SUM and SUMX in DAX?',
        vi: 'Điểm khác biệt then chốt giữa hàm SUM và SUMX trong DAX là gì?'
      },
      options: [
        {
          en: 'SUM only takes a single column as input, whereas SUMX is an iterator that evaluates a row-level expression over a specified table',
          vi: 'SUM chỉ nhận 1 cột làm đầu vào, trong khi SUMX là hàm lặp tính toán biểu thức trên từng dòng của một bảng chỉ định'
        },
        {
          en: 'SUM is only for integers; SUMX is for decimals',
          vi: 'SUM chỉ dùng cho số nguyên; SUMX dùng cho số thập phân'
        },
        {
          en: 'SUMX can only be used inside Power Query M code',
          vi: 'SUMX chỉ dùng được trong mã M của Power Query'
        },
        {
          en: 'SUMX is an obsolete function that has been deprecated',
          vi: 'SUMX là hàm lỗi thời đã bị khai tử'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'SUM aggregates a single column. SUMX iterates row-by-row over a table evaluating a custom mathematical expression before aggregating.',
        vi: 'SUM cộng tổng một cột đơn lẻ. SUMX duyệt qua từng dòng của một bảng để tính biểu thức toán học tùy biến rồi mới cộng tổng.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_8_2',
      type: 'single_choice',
      question: {
        en: 'Why is COUNTROWS(Sales) preferred over COUNT(Sales[OrderID]) when counting the total number of transactions in a table?',
        vi: 'Vì sao COUNTROWS(Sales) được ưu tiên hơn COUNT(Sales[OrderID]) khi đếm tổng số giao dịch trong bảng?'
      },
      options: [
        {
          en: 'COUNTROWS is optimized at the storage engine level, counts all rows including blanks, and performs significantly faster',
          vi: 'COUNTROWS được tối ưu hóa ở tầng lưu trữ VertiPaq, đếm toàn bộ các dòng kể cả dòng trống và thực thi nhanh hơn rõ rệt'
        },
        {
          en: 'COUNT function is not supported in DAX',
          vi: 'Hàm COUNT không được hỗ trợ trong DAX'
        },
        {
          en: 'COUNTROWS converts text into numbers automatically',
          vi: 'COUNTROWS tự động chuyển văn bản thành số'
        },
        {
          en: 'COUNT requires an active internet connection',
          vi: 'COUNT đòi hỏi phải có kết nối mạng internet'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'COUNTROWS directly reads table metadata without scanning individual column values, maximizing VertiPaq execution speed.',
        vi: 'COUNTROWS đọc trực tiếp metadata của bảng mà không cần quét từng giá trị cột, tối đa hóa tốc độ xử lý của VertiPaq.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_8_3',
      type: 'predict_output',
      question: {
        en: 'What does the expression AVERAGEX(Dim_Customers, [Total Revenue]) calculate?',
        vi: 'Biểu thức AVERAGEX(Dim_Customers, [Total Revenue]) tính toán điều gì?'
      },
      options: [
        {
          en: 'Calculates the [Total Revenue] measure for each individual customer row, then computes the arithmetic mean across all customers',
          vi: 'Tính measure [Total Revenue] cho từng khách hàng, sau đó tính giá trị trung bình trên toàn bộ khách hàng'
        },
        {
          en: 'Sums all customer IDs',
          vi: 'Cộng tổng tất cả mã ID khách hàng'
        },
        {
          en: 'Deletes customers with below-average revenue',
          vi: 'Xóa những khách hàng có doanh thu dưới mức trung bình'
        },
        {
          en: 'Calculates the average age of all customers',
          vi: 'Tính độ tuổi trung bình của tất cả khách hàng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'AVERAGEX establishes a row context for each customer in Dim_Customers, triggers context transition to compute [Total Revenue], and averages the results.',
        vi: 'AVERAGEX tạo ngữ cảnh dòng cho từng khách hàng, kích hoạt context transition để tính [Total Revenue], rồi lấy giá trị trung bình.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_8_4',
      type: 'true_false',
      question: {
        en: 'All iterator functions in DAX end with the letter "X" (e.g. SUMX, AVERAGEX, MINX, MAXX, COUNTX, PRODUCTX).',
        vi: 'Tất cả các hàm lặp (Iterator) trong DAX đều có hậu tố là chữ cái "X" (như SUMX, AVERAGEX, MINX, MAXX, COUNTX, PRODUCTX).'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. The "X" suffix is the universal DAX naming pattern identifying iterator functions that accept a Table as their first argument.',
        vi: 'Đúng. Hậu tố "X" là quy ước đặt tên chuẩn trong DAX để nhận diện các hàm lặp nhận tham số đầu tiên là một Bảng.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_8_5',
      type: 'single_choice',
      question: {
        en: 'What is the first parameter required by every "X" iterator function (such as SUMX or MAXX)?',
        vi: 'Tham số đầu tiên bắt buộc phải có của mọi hàm lặp đuôi "X" (như SUMX hay MAXX) là gì?'
      },
      options: [
        { en: 'A table (or table expression)', vi: 'Một bảng (hoặc biểu thức trả về bảng)' },
        { en: 'A text string', vi: 'Một chuỗi văn bản' },
        { en: 'A single column name only', vi: 'Chỉ duy nhất một tên cột' },
        { en: 'A Boolean TRUE/FALSE flag', vi: 'Một cờ logic TRUE/FALSE' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Iterators always take a table as their first argument, over which the second argument expression is evaluated row-by-row.',
        vi: 'Các hàm lặp luôn nhận tham số đầu tiên là một Bảng để duyệt từng dòng và tính toán biểu thức ở tham số thứ hai.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_8_6',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following are valid DAX iterator functions? (Select all that apply)',
        vi: 'Những hàm nào sau đây là hàm lặp (Iterator) hợp lệ trong DAX? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'SUMX', vi: 'SUMX' },
        { en: 'MAXX', vi: 'MAXX' },
        { en: 'AVERAGEX', vi: 'AVERAGEX' },
        { en: 'CONCATENATEX', vi: 'CONCATENATEX' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'SUMX, MAXX, AVERAGEX, and CONCATENATEX are all standard iterator functions in DAX.',
        vi: 'SUMX, MAXX, AVERAGEX và CONCATENATEX đều là các hàm lặp tiêu chuẩn trong DAX.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_8_7',
      type: 'single_choice',
      question: {
        en: 'Which iterator function is used to concatenate text strings row-by-row with a custom separator (e.g. creating a comma-separated list of selected products)?',
        vi: 'Hàm lặp nào dùng để nối các chuỗi văn bản theo từng dòng với dấu phân cách tùy biến (như tạo danh sách sản phẩm ngăn cách bởi dấu phẩy)?'
      },
      options: [
        { en: 'CONCATENATEX()', vi: 'CONCATENATEX()' },
        { en: 'TEXTJOIN_ALL()', vi: 'TEXTJOIN_ALL()' },
        { en: 'STRING_AGG()', vi: 'STRING_AGG()' },
        { en: 'JOINX()', vi: 'JOINX()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CONCATENATEX(Table, Expression, [Delimiter]) evaluates the text expression for each row and concatenates them with the specified delimiter.',
        vi: 'CONCATENATEX(Bảng, BiểuThức, [DấuPhânCách]) tính toán chuỗi văn bản cho từng dòng và ghép nối lại bằng dấu phân cách chỉ định.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_8_8',
      type: 'true_false',
      question: {
        en: 'Using SUMX(Sales, Sales[Qty] * Sales[Price]) in a Measure avoids the need to create a physical Calculated Column in the Sales table.',
        vi: 'Dùng SUMX(Sales, Sales[Qty] * Sales[Price]) trong Measure giúp loại bỏ sự cần thiết phải tạo một Cột tính toán vật lý trong bảng Sales.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. Computing row-level multiplications dynamically inside SUMX saves memory RAM without altering table schema.',
        vi: 'Đúng. Việc tính phép nhân từng dòng tức thì trong SUMX giúp tiết kiệm bộ nhớ RAM mà không cần thay đổi cấu trúc bảng.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_8_9',
      type: 'predict_output',
      question: {
        en: 'If a table has 5 rows with quantities: [2, 4, 6, 8, 10], what does MAXX(Table, Table[Quantity] * 2) return?',
        vi: 'Nếu bảng có 5 dòng với số lượng: [2, 4, 6, 8, 10], hàm MAXX(Table, Table[Quantity] * 2) sẽ trả về giá trị gì?'
      },
      options: [
        { en: '20', vi: '20' },
        { en: '10', vi: '10' },
        { en: '60', vi: '60' },
        { en: '12', vi: '12' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'MAXX calculates Quantity * 2 for each row ([4, 8, 12, 16, 20]) and returns the maximum value, which is 20.',
        vi: 'MAXX tính Quantity * 2 cho từng dòng ([4, 8, 12, 16, 20]) và trả về giá trị lớn nhất là 20.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_8_10',
      type: 'single_choice',
      question: {
        en: 'How can you calculate total revenue only for high-value orders where Quantity > 10 using an iterator?',
        vi: 'Làm thế nào để tính tổng doanh thu chỉ cho các đơn hàng có số lượng Quantity > 10 bằng hàm lặp?'
      },
      options: [
        {
          en: 'SUMX(FILTER(Sales, Sales[Quantity] > 10), Sales[Quantity] * Sales[UnitPrice])',
          vi: 'SUMX(FILTER(Sales, Sales[Quantity] > 10), Sales[Quantity] * Sales[UnitPrice])'
        },
        {
          en: 'SUM(Sales[Quantity] > 10 * Sales[UnitPrice])',
          vi: 'SUM(Sales[Quantity] > 10 * Sales[UnitPrice])'
        },
        {
          en: 'COUNTROWS(Sales > 10)',
          vi: 'COUNTROWS(Sales > 10)'
        },
        {
          en: 'FILTER(SUMX(Sales), 10)',
          vi: 'FILTER(SUMX(Sales), 10)'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'FILTER(Sales, Sales[Quantity] > 10) returns a filtered table that SUMX iterates over to compute the line totals.',
        vi: 'FILTER(Sales, Sales[Quantity] > 10) trả về một bảng đã lọc để SUMX duyệt qua và tính tổng tiền từng dòng.'
      },
      topicId: 'aggregations_and_iterators',
      difficulty: 'medium'
    }
  ]
};

export default lesson08;
