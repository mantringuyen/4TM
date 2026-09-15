import { Lesson } from '../../../../types';

export const lesson03: Lesson = {
  id: 'py_lesson_3',
  moduleId: 'py_mod_1',
  levelId: 'basic',
  courseId: 'python',
  order: 3,
  topicId: 'python_numbers_math_casting',
  title: {
    en: 'Numeric Data Types, Arithmetic Operators & Type Casting',
    vi: 'Kiểu Số, Toán Tử Số Học & Ép Kiểu Dữ Liệu'
  },
  summary: {
    en: 'Master Python int (unbounded), float (IEEE 754), complex numbers, arithmetic operators (//, %, **), math functions, and explicit type casting.',
    vi: 'Làm chủ số nguyên int (vô hạn độ dài), số thực float, số phức, toán tử số học (//, %, **), thư viện math và ép kiểu tường minh.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Python provides robust numeric computing capabilities built directly into its core runtime. Integers support arbitrary precision, floats follow 64-bit double precision, and explicit type conversions convert safely between numerical and text representations.',
      vi: 'Python hỗ trợ tính toán số học mạnh mẽ với số nguyên không giới hạn độ chính xác, số thực dấu phẩy động 64-bit và cơ chế ép kiểu tường minh an toàn giữa số và chuỗi.'
    },
    conceptExplanation: {
      en: '1. Numeric Types:\n- `int`: Unlimited precision integers (e.g., 2**1000 will not overflow).\n- `float`: Double-precision floating point numbers (supports scientific notation like `1.5e-4`).\n- `complex`: Numbers with real and imaginary parts (`z = 3 + 4j`).\n\n2. Arithmetic Operators:\n- Addition `+`, Subtraction `-`, Multiplication `*`\n- True Division `/` (always returns float, e.g., `7 / 2 -> 3.5`)\n- Floor Division `//` (truncates towards negative infinity, e.g., `7 // 2 -> 3`, `-7 // 2 -> -4`)\n- Modulo `%` (remainder, e.g., `7 % 2 -> 1`)\n- Exponentiation `**` (e.g., `2 ** 8 -> 256`)\n\n3. Type Casting Functions:\n- `int("42")` -> 42 (raises ValueError for invalid strings)\n- `float("3.14")` -> 3.14\n- `str(100)` -> "100"\n- `bool(0)` -> False, `bool(1)` -> True',
      vi: '1. Các kiểu dữ liệu số:\n- `int`: Số nguyên vô hạn độ dài (ví dụ: 2**1000 không bao giờ tràn số).\n- `float`: Số thực 64-bit (hỗ trợ ký hiệu khoa học như `1.5e-4`).\n- `complex`: Số phức gồm phần thực và phần ảo (`z = 3 + 4j`).\n\n2. Toán tử số học:\n- Phép cộng `+`, trừ `-`, nhân `*`\n- Chia thực `/` (luôn trả về float, ví dụ: `7 / 2 -> 3.5`)\n- Chia lấy nguyên `//` (làm tròn xuống vô cực âm, ví dụ: `7 // 2 -> 3`, `-7 // 2 -> -4`)\n- Chia lấy dư `%` (ví dụ: `7 % 2 -> 1`)\n- Lũy thừa `**` (ví dụ: `2 ** 8 -> 256`)\n\n3. Các hàm ép kiểu dữ liệu:\n- `int("42")` -> 42 (báo lỗi ValueError nếu chuỗi không hợp lệ)\n- `float("3.14")` -> 3.14\n- `str(100)` -> "100"\n- `bool(0)` -> False, `bool(1)` -> True'
    },
    syntax: `# Arithmetic & Division Nuances
total = 100
tax_rate = 0.08
grand_total = total * (1 + tax_rate)

# Floor division and modulo
quotient = 17 // 5  # 3
remainder = 17 % 5   # 2

# Type conversion
raw_input = "250"
quantity = int(raw_input)
unit_price = float("19.99")
cost = quantity * unit_price`,
    examples: [
      {
        title: {
          en: 'Financial Transaction Calculation with Casting',
          vi: 'Tính Toán Giao Dịch Tài Chính Kèm Ép Kiểu'
        },
        code: `def calculate_invoice(raw_qty: str, raw_unit_price: str, discount_pct: float) -> dict:
    qty = int(raw_qty.strip())
    price = float(raw_unit_price.strip())
    subtotal = qty * price
    discount_amount = subtotal * (discount_pct / 100.0)
    net_total = subtotal - discount_amount
    
    return {
        "quantity": qty,
        "unit_price": price,
        "subtotal": round(subtotal, 2),
        "discount": round(discount_amount, 2),
        "net_total": round(net_total, 2)
    }

print(calculate_invoice(" 15 ", " 49.90 ", 10.0))`,
        language: 'python',
        explanation: {
          en: 'String inputs are safely cast to numeric types before applying arithmetic and rounding.',
          vi: 'Chuỗi đầu vào được ép kiểu sang int và float trước khi tính toán số học và làm tròn.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Assuming bool("False") evaluates to False in Python.',
          vi: 'Nghĩ rằng bool("False") sẽ trả về False trong Python.'
        },
        correction: {
          en: 'Any non-empty string in Python evaluates to True. Compare strings explicitly: val.lower() == "true".',
          vi: 'Mọi chuỗi có ký tự trong Python đều là True. Cần so sánh chuỗi tường minh: val.lower() == "true".'
        },
        code: `# Bug:\nis_flag = bool("False")  # Evaluates to True!\n\n# Correct:\nis_flag = ("False".strip().lower() == "true")  # Evaluates to False`
      },
      {
        mistake: {
          en: 'Passing floating point string directly to int(): int("42.5") raises ValueError.',
          vi: 'Truyền chuỗi chứa số thập phân trực tiếp vào int(): int("42.5") gây ra lỗi ValueError.'
        },
        correction: {
          en: 'Parse as float first, then cast to int: int(float("42.5")) -> 42.',
          vi: 'Chuyển thành float trước rồi mới ép sang int: int(float("42.5")) -> 42.'
        },
        code: `int(float("42.5"))  # Returns 42`
      }
    ],
    tips: [
      {
        en: 'Use underscore separators in numeric literals for readability: `1_000_000` equals `1000000`.',
        vi: 'Dùng dấu gạch dưới trong số lớn để tăng tính trực quan: `1_000_000` tương đương `1000000`.'
      },
      {
        en: 'Use `math.isclose(a, b)` when comparing floating point values to avoid IEEE 754 precision inaccuracies.',
        vi: 'Dùng `math.isclose(a, b)` khi so sánh số thực float để tránh sai số dấu phẩy động.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_5_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Safe Currency Converter',
        vi: 'Bài tập 1: Bộ Quy Đổi Tiền Tệ An Toàn'
      },
      instruction: {
        en: 'Write a function `convert_currency(amount_str: str, exchange_rate: float, fee_fixed: float) -> float` that converts `amount_str` to float, multiplies by `exchange_rate`, subtracts `fee_fixed`, and returns the final float rounded to 2 decimal places.',
        vi: 'Viết hàm `convert_currency(amount_str: str, exchange_rate: float, fee_fixed: float) -> float` chuyển `amount_str` sang float, nhân với `exchange_rate`, trừ đi `fee_fixed` và trả về kết quả float làm tròn 2 chữ số thập phân.'
      },
      starterCode: `def convert_currency(amount_str: str, exchange_rate: float, fee_fixed: float) -> float:
    # TODO: Cast amount_str, calculate and round to 2 decimals
    pass`,
      solutionCode: `def convert_currency(amount_str: str, exchange_rate: float, fee_fixed: float) -> float:
    amount = float(amount_str.strip())
    converted = (amount * exchange_rate) - fee_fixed
    return round(converted, 2)`,
      hint: {
        en: 'Use float(amount_str.strip()) and round(result, 2).',
        vi: 'Dùng float(amount_str.strip()) và round(result, 2).'
      },
      explanation: {
        en: 'Safely converts string inputs and computes financial exchange rates with precision.',
        vi: 'Chuyển đổi chuỗi đầu vào an toàn và tính tỷ giá ngoại tệ chính xác.'
      }
    },
    {
      id: 'py_5_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Discrete Batch Allocator',
        vi: 'Bài tập 2: Phân Phối Lô Hàng Số Nguyên'
      },
      instruction: {
        en: 'Write a function `batch_allocate(total_items: int, batch_size: int) -> tuple[int, int]` that returns `(full_batches, remaining_items)` using floor division and modulo.',
        vi: 'Viết hàm `batch_allocate(total_items: int, batch_size: int) -> tuple[int, int]` trả về `(full_batches, remaining_items)` bằng phép chia nguyên // và chia dư %.'
      },
      starterCode: `def batch_allocate(total_items: int, batch_size: int) -> tuple[int, int]:
    # TODO: Return full batches and remainder
    pass`,
      solutionCode: `def batch_allocate(total_items: int, batch_size: int) -> tuple[int, int]:
    full_batches = total_items // batch_size
    remaining_items = total_items % batch_size
    return (full_batches, remaining_items)`,
      hint: {
        en: 'Use // for full batches and % for remainder.',
        vi: 'Dùng // cho số lô nguyên và % cho số lượng dư.'
      },
      explanation: {
        en: 'Floor division and modulo give discrete division parts in constant time.',
        vi: 'Chia nguyên và chia dư cho ra các thành phần chia rời rạc với thời gian O(1).'
      }
    }
  ],
  challenge: {
    id: 'py_5_challenge',
    title: {
      en: 'Challenge: Financial Ledger Sanitizer',
      vi: 'Thử thách: Chuẩn Hóa Sổ Cái Tài Chính'
    },
    description: {
      en: 'Write `sanitize_and_sum(raw_transactions: list[str]) -> dict` that receives a list of raw transaction strings (e.g. `[" $100.50 ", " -25 ", "0", "$40.25"]`), removes `$` signs and whitespace, parses each into a float, and returns a dictionary `{"total": float, "valid_count": int, "average": float}` where floats are rounded to 2 decimal places.',
      vi: 'Viết hàm `sanitize_and_sum(raw_transactions: list[str]) -> dict` nhận danh sách chuỗi giao dịch thô (ví dụ `[" $100.50 ", " -25 ", "0", "$40.25"]`), loại bỏ ký tự `$` và khoảng trắng, ép sang float và trả về dictionary `{"total": float, "valid_count": int, "average": float}` với các số float làm tròn 2 chữ số thập phân.'
    },
    requirements: [
      {
        en: 'Strip whitespace and currency symbols from transactions',
        vi: 'Làm sạch khoảng trắng và ký tự tiền tệ khỏi chuỗi giao dịch'
      },
      {
        en: 'Parse string inputs to float numbers safely',
        vi: 'Ép kiểu chuỗi sang số float an toàn'
      },
      {
        en: 'Return dictionary with total, count, and average',
        vi: 'Trả về dictionary gồm tổng total, số lượng valid_count và trung bình average'
      }
    ],
    starterCode: `def sanitize_and_sum(raw_transactions: list[str]) -> dict:
    # TODO: Clean, parse and aggregate transactions
    pass`,
    solutionCode: `def sanitize_and_sum(raw_transactions: list[str]) -> dict:
    parsed_values = []
    for item in raw_transactions:
        clean_str = item.replace("$", "").strip()
        parsed_values.append(float(clean_str))
    
    total = sum(parsed_values)
    count = len(parsed_values)
    avg = total / count if count > 0 else 0.0
    return {
        "total": round(total, 2),
        "valid_count": count,
        "average": round(avg, 2)
    }`,
    hints: [
      {
        en: 'Use item.replace("$", "").strip() before float() conversion.',
        vi: 'Dùng item.replace("$", "").strip() trước khi gọi float().'
      }
    ],
    solutionExplanation: {
      en: 'Cleanses raw strings, converts them to floats, and aggregates ledger statistics.',
      vi: 'Làm sạch chuỗi thô, chuyển đổi sang float và tổng hợp số liệu sổ cái.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_5_q1',
      type: 'single_choice',
      question: {
        en: 'What is the result and type of the expression `7 / 2` in Python 3?',
        vi: 'Kết quả và kiểu dữ liệu của biểu thức `7 / 2` trong Python 3 là gì?'
      },
      options: [
        { en: '3 (int)', vi: '3 (int)' },
        { en: '3.5 (float)', vi: '3.5 (float)' },
        { en: '3.0 (float)', vi: '3.0 (float)' },
        { en: '4 (int)', vi: '4 (int)' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'In Python 3, the single slash `/` operator always performs true division and returns a float, so `7 / 2` is `3.5`.',
        vi: 'Trong Python 3, toán tử `/` luôn thực hiện phép chia thực và trả về kết quả kiểu float (`7 / 2` cho `3.5`).'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    },
    {
      id: 'py_5_q2',
      type: 'single_choice',
      question: {
        en: 'What is the result of the floor division expression `-7 // 2` in Python?',
        vi: 'Kết quả của phép chia lấy phần nguyên `-7 // 2` trong Python là bao nhiêu?'
      },
      options: [
        { en: '-3', vi: '-3' },
        { en: '-4', vi: '-4' },
        { en: '-3.5', vi: '-3.5' },
        { en: '3', vi: '3' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python floor division rounds down towards negative infinity: `-3.5` rounded down produces `-4`.',
        vi: 'Phép chia nguyên `//` trong Python luôn làm tròn xuống về phía vô cực âm: `-3.5` làm tròn xuống là `-4`.'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    },
    {
      id: 'py_5_q3',
      type: 'single_choice',
      question: {
        en: 'What will happen when executing `int("3.14")` directly in Python?',
        vi: 'Điều gì xảy ra khi thực thi `int("3.14")` trực tiếp trong Python?'
      },
      options: [
        { en: 'It returns 3', vi: 'Trả về số nguyên 3' },
        { en: 'It raises a ValueError', vi: 'Kích hoạt lỗi ValueError' },
        { en: 'It returns 3.14', vi: 'Trả về số 3.14' },
        { en: 'It returns 0', vi: 'Trả về 0' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`int()` cannot parse strings containing decimal dots directly; it raises ValueError. You must use `int(float("3.14"))`.',
        vi: 'Hàm `int()` không thể ép chuỗi có dấu chấm thập phân trực tiếp mà sẽ báo lỗi ValueError. Bạn phải gọi `int(float("3.14"))`.'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    },
    {
      id: 'py_5_q4',
      type: 'single_choice',
      question: {
        en: 'What is the result of evaluating `bool("False")` in Python?',
        vi: 'Kết quả của biểu thức `bool("False")` trong Python là gì?'
      },
      options: [
        { en: 'False', vi: 'False' },
        { en: 'True', vi: 'True' },
        { en: 'None', vi: 'None' },
        { en: 'ValueError', vi: 'ValueError' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Any non-empty string in Python has a truthy value, so `bool("False")` returns `True`. Only `bool("")` is `False`.',
        vi: 'Mọi chuỗi không rỗng trong Python đều mang giá trị truthy, vì thế `bool("False")` trả về `True`. Chỉ có chuỗi rỗng `bool("")` mới trả về `False`.'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    },
    {
      id: 'py_5_q5',
      type: 'single_choice',
      question: {
        en: 'How does Python represent the imaginary unit in complex numbers?',
        vi: 'Python biểu diễn đơn vị ảo trong số phức bằng ký tự nào?'
      },
      options: [
        { en: 'i (e.g., 3 + 4i)', vi: 'i (ví dụ: 3 + 4i)' },
        { en: 'j or J (e.g., 3 + 4j)', vi: 'j hoặc J (ví dụ: 3 + 4j)' },
        { en: 'im (e.g., 3 + 4im)', vi: 'im (ví dụ: 3 + 4im)' },
        { en: 'sqrt(-1)', vi: 'sqrt(-1)' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python follows engineering notation and uses `j` or `J` for the imaginary unit of complex numbers.',
        vi: 'Python theo quy ước kỹ thuật điện và dùng ký tự `j` hoặc `J` cho đơn vị ảo của số phức.'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    },
    {
      id: 'py_5_q6',
      type: 'single_choice',
      question: {
        en: 'What is the maximum integer size supported by Python 3 before integer overflow occurs?',
        vi: 'Kích thước số nguyên tối đa mà Python 3 hỗ trợ trước khi xảy ra tràn số là bao nhiêu?'
      },
      options: [
        { en: '2^31 - 1 (32-bit signed)', vi: '2^31 - 1 (32-bit có dấu)' },
        { en: '2^63 - 1 (64-bit signed)', vi: '2^63 - 1 (64-bit có dấu)' },
        { en: 'There is no fixed limit; it is bounded only by available RAM', vi: 'Không có giới hạn cố định; chỉ phụ thuộc vào dung lượng RAM khả dụng' },
        { en: '10^18', vi: '10^18' }
      ],
      correctAnswers: [2],
      explanation: {
        en: 'Python 3 integers have arbitrary precision and will grow automatically to use as much memory as needed.',
        vi: 'Số nguyên trong Python 3 có độ chính xác tùy ý và tự động mở rộng theo bộ nhớ RAM mà không bị tràn số.'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    },
    {
      id: 'py_5_q7',
      type: 'single_choice',
      question: {
        en: 'What operator is used in Python for exponentiation (power)?',
        vi: 'Toán tử nào trong Python được dùng cho phép tính lũy thừa (mũ)?'
      },
      options: [
        { en: '^', vi: '^' },
        { en: '**', vi: '**' },
        { en: 'pow', vi: 'pow' },
        { en: '^^', vi: '^^' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`**` is the exponentiation operator in Python (e.g. `2 ** 3 == 8`). The `^` operator is bitwise XOR.',
        vi: '`**` là toán tử lũy thừa trong Python (ví dụ: `2 ** 3 == 8`). Ký hiệu `^` là phép toán bitwise XOR.'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    },
    {
      id: 'py_5_q8',
      type: 'single_choice',
      question: {
        en: 'What is the value of `10 % 3` in Python?',
        vi: 'Giá trị của `10 % 3` trong Python là bao nhiêu?'
      },
      options: [
        { en: '3', vi: '3' },
        { en: '1', vi: '1' },
        { en: '0.33', vi: '0.33' },
        { en: '0', vi: '0' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The modulo operator `%` calculates the remainder of division: `10 = 3 * 3 + 1`, so the remainder is 1.',
        vi: 'Toán tử chia dư `%` trả về phần dư của phép chia: `10 = 3 * 3 + 1`, nên phần dư là 1.'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    },
    {
      id: 'py_5_q9',
      type: 'single_choice',
      question: {
        en: 'Which of the following creates a float using scientific notation representing 0.0005?',
        vi: 'Khai báo nào sau đây tạo ra số thực float bằng ký hiệu khoa học tương đương 0.0005?'
      },
      options: [
        { en: '5e4', vi: '5e4' },
        { en: '5e-4', vi: '5e-4' },
        { en: '0.5e3', vi: '0.5e3' },
        { en: '5e-3', vi: '5e-3' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`5e-4` equals `5 * 10^-4 = 0.0005`.',
        vi: '`5e-4` tương đương `5 * 10^-4 = 0.0005`.'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    },
    {
      id: 'py_5_q10',
      type: 'single_choice',
      question: {
        en: 'Which function is recommended to accurately compare two floating-point numbers in Python?',
        vi: 'Hàm nào được khuyến nghị để so sánh chính xác hai số thực float trong Python?'
      },
      options: [
        { en: 'a == b', vi: 'a == b' },
        { en: 'math.isclose(a, b)', vi: 'math.isclose(a, b)' },
        { en: 'float.compare(a, b)', vi: 'float.compare(a, b)' },
        { en: 'round(a) == round(b)', vi: 'round(a) == round(b)' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`math.isclose()` tests whether two floats are equal within a relative or absolute tolerance, avoiding IEEE 754 precision artifacts.',
        vi: '`math.isclose()` kiểm tra hai số thực có bằng nhau trong ngưỡng dung sai cho phép hay không, tránh sai số nhị phân dấu phẩy động.'
      },
      topicId: 'python_numbers_math_casting',
      difficulty: 'easy'
    }
  ]
};
export default lesson03;
