import { Lesson } from '../../../../types';

export const lesson05: Lesson = {
  id: 'py_lesson_5',
  moduleId: 'py_mod_2',
  levelId: 'basic',
  courseId: 'python',
  order: 5,
  topicId: 'python_string_methods_fstrings',
  title: {
    en: 'Essential String Methods & Modern f-strings',
    vi: 'Phương Thức Chuỗi Cốt Lõi & Cú Pháp f-string Hiện Đại'
  },
  summary: {
    en: 'Master built-in string transformation methods (.strip, .split, .join, .replace), search methods (.find, .startswith), and Python 3.6+ formatted f-strings.',
    vi: 'Làm chủ các phương thức chuỗi có sẵn (.strip, .split, .join, .replace), tìm kiếm (.find, .startswith) và cú pháp f-string hiện đại.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Text manipulation in Python is centered on built-in string methods and formatted string literals (f-strings). Since strings are immutable, methods return transformed new string objects without modifying the original source.',
      vi: 'Xử lý văn bản trong Python xoay quanh các phương thức chuỗi tích hợp sẵn và cú pháp định dạng f-string hiện đại. Do tính bất biến, các phương thức luôn trả về chuỗi mới.'
    },
    conceptExplanation: {
      en: '1. Essential String Transformation Methods:\n- `.strip()`, `.lstrip()`, `.rstrip()`: Strips whitespace or specified characters.\n- `.lower()`, `.upper()`, `.title()`, `.capitalize()`: Case conversions.\n- `.replace(old, new, count)`: Substring replacement.\n- `.split(sep, maxsplit)`: Splits a string into a list of strings.\n- `sep.join(iterable)`: Joins elements of an iterable into a single delimited string.\n\n2. Search & Inspection Methods:\n- `.startswith(prefix)`, `.endswith(suffix)`: Returns boolean.\n- `.find(sub)`: Returns lowest index of substring, or -1 if not found.\n- `.count(sub)`: Frequency counter of non-overlapping occurrences.\n\n3. Modern Formatted f-strings (`f"..."`):\n- Embedded expressions: `f"Total: {price * qty}"`\n- Numeric formatting: `f"{value:.2f}"` (2 decimal places), `f"{rate:.1%}"` (percentage)\n- Padding & alignment: `f"{name:>15}"` (right align 15 chars), `f"{code:0>6}"` (zero-pad)\n- Inline debug syntax (Python 3.8+): `f"{x=}"` outputs `"x=42"`',
      vi: '1. Các phương thức biến đổi chuỗi cốt lõi:\n- `.strip()`, `.lstrip()`, `.rstrip()`: Loại bỏ khoảng trắng hoặc ký tự chỉ định.\n- `.lower()`, `.upper()`, `.title()`, `.capitalize()`: Chuyển đổi chữ hoa/thường.\n- `.replace(old, new, count)`: Thay thế chuỗi con.\n- `.split(sep)`: Tách chuỗi thành danh sách danh sách các chuỗi con.\n- `sep.join(iterable)`: Nối danh sách phần tử thành chuỗi phân tách bởi dấu nối.\n\n2. Các phương thức tìm kiếm & kiểm tra:\n- `.startswith(prefix)`, `.endswith(suffix)`: Kiểm tra tiền tố/hậu tố (trả về bool).\n- `.find(sub)`: Trả về vị trí đầu tiên của chuỗi con, hoặc -1 nếu không có.\n- `.count(sub)`: Đếm số lần xuất hiện không chồng lấn.\n\n3. Cú pháp f-string hiện đại (`f"..."`):\n- Biểu thức nhúng: `f"Tổng cộng: {price * qty}"`\n- Định dạng số: `f"{value:.2f}"` (2 chữ số thập phân), `f"{rate:.1%}"` (phần trăm)\n- Căn lề & đệm: `f"{name:>15}"` (căn phải 15 ký tự), `f"{code:0>6}"` (chèn số 0)\n- Cú pháp debug (Python 3.8+): `f"{x=}"` in ra `"x=42"`'
    },
    syntax: `# String cleaning & splitting
raw_tags = "  python, data-science , algorithms  "
cleaned_tags = [t.strip().lower() for t in raw_tags.split(",")]
csv_line = " | ".join(cleaned_tags)

# Modern f-strings
product = "Cloud Server"
price = 149.50
utilization = 0.875
report = f"Product: {product:<15} | Price: \${price:.2f} | Usage: {utilization:.1%}"`,
    examples: [
      {
        title: {
          en: 'Sanitizing and Formatting CSV Log Lines',
          vi: 'Làm Sạch và Định Dạng Dòng Nhật Ký CSV'
        },
        code: `def format_log_entry(level: str, module: str, message: str, elapsed_sec: float) -> str:
    clean_level = level.strip().upper()
    clean_module = module.strip().lower()
    clean_msg = message.strip().replace("\\n", " ")
    return f"[{clean_level:<7}] {clean_module:<12} : {clean_msg} ({elapsed_sec:.3f}s)"

print(format_log_entry("info", "auth_service", "User logged in successfully\\n", 0.04289))
print(format_log_entry("warning", "db_pool", "Connection latency above threshold", 1.2501))`,
        language: 'python',
        explanation: {
          en: 'String methods clean inputs and f-string field width specifications produce aligned terminal logs.',
          vi: 'Các phương thức làm sạch chuỗi và căn lề f-string giúp tạo ra dòng nhật ký log ngay ngắn.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using `join()` incorrectly as `list.join(",")` instead of `",".join(list)`.',
          vi: 'Gọi sai phương thức `join()` thành `list.join(",")` thay vì `",".join(list)`.'
        },
        correction: {
          en: 'In Python, `join` is a method on the delimiter string: `delimiter.join(iterable)`.',
          vi: 'Trong Python, `join` là phương thức của chuỗi phân cách: `delimiter.join(iterable)`.'
        },
        code: `items = ["a", "b", "c"]\n# items.join(",") # AttributeError!\nresult = ",".join(items) # Correct`
      },
      {
        mistake: {
          en: 'Forgetting that string methods do not mutate the string in place.',
          vi: 'Quên rằng các phương thức chuỗi không thay đổi chuỗi tại chỗ.'
        },
        correction: {
          en: 'Always reassign or capture the return value: `s = s.strip()`.',
          vi: 'Luôn gán lại kết quả trả về: `s = s.strip()`.'
        },
        code: `s = "  hello  "\ns.strip() # s remains "  hello  "\ns = s.strip() # Now s is "hello"`
      }
    ],
    tips: [
      {
        en: 'Use f-string self-documenting syntax `f"{variable=}"` for quick print debugging.',
        vi: 'Dùng cú pháp tự gán nhãn `f"{variable=}"` của f-string để debug nhanh gọn khi in dữ liệu.'
      },
      {
        en: '`split()` without arguments splits on any consecutive whitespace (spaces, tabs, newlines) and discards empty strings automatically.',
        vi: 'Hàm `split()` không đối số sẽ tự động tách chuỗi theo mọi khoảng trắng liên tiếp (space, tab, xuống dòng).'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_10_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Slug Generator',
        vi: 'Bài tập 1: Bộ Tạo Slug URL'
      },
      instruction: {
        en: 'Write `generate_url_slug(title: str) -> str` that strips whitespace, converts text to lowercase, replaces spaces with hyphens `-`, and replaces multiple hyphens with a single hyphen.',
        vi: 'Viết hàm `generate_url_slug(title: str) -> str` loại bỏ khoảng trắng thừa, chuyển thành chữ thường và thay thế khoảng trắng thành dấu gạch nối `-`.'
      },
      starterCode: `def generate_url_slug(title: str) -> str:
    # TODO: Convert title into URL-friendly slug
    pass`,
      solutionCode: `def generate_url_slug(title: str) -> str:
    words = title.strip().lower().split()
    return "-".join(words)`,
      hint: {
        en: 'Using .split() splits on all whitespace and "-".join(...) joins cleanly with single hyphens.',
        vi: 'Dùng .split() để tách theo khoảng trắng rồi dùng "-".join(...) để nối bằng dấu gạch ngang.'
      },
      explanation: {
        en: 'Splitting on whitespace and joining with hyphens creates normalized web URLs.',
        vi: 'Tách theo khoảng trắng và nối bằng dấu gạch ngang tạo ra đường dẫn web chuẩn hóa.'
      }
    },
    {
      id: 'py_10_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Financial Summary Formatter',
        vi: 'Bài tập 2: Định Dạng Báo Cáo Tài Chính'
      },
      instruction: {
        en: 'Write `format_financial_summary(account_id: str, revenue: float, growth_pct: float) -> str` that returns a formatted line with account ID padded to 8 characters with leading zeros, revenue with comma separators and 2 decimal places with a `$` prefix, and growth percentage with 1 decimal place and a `%` suffix. Example: `"[00012345] $1,250,500.00 (+14.5%)"`.',
        vi: 'Viết hàm `format_financial_summary(account_id: str, revenue: float, growth_pct: float) -> str` trả về dòng báo cáo có ID đệm số 0 thành 8 chữ số, doanh thu có dấu phẩy phân tách nghìn và 2 chữ số thập phân, phần trăm tăng trưởng có 1 chữ số thập phân.'
      },
      starterCode: `def format_financial_summary(account_id: str, revenue: float, growth_pct: float) -> str:
    # TODO: Format using modern f-strings
    pass`,
      solutionCode: `def format_financial_summary(account_id: str, revenue: float, growth_pct: float) -> str:
    clean_id = account_id.strip().zfill(8)
    sign = "+" if growth_pct >= 0 else ""
    return f"[{clean_id}] \${revenue:,.2f} ({sign}{growth_pct:.1f}%)"`,
      hint: {
        en: 'Use zfill(8) or f"{account_id:0>8}", and f"{revenue:,.2f}".',
        vi: 'Dùng zfill(8) hoặc f"{account_id:0>8}" và f"{revenue:,.2f}".'
      },
      explanation: {
        en: 'Python f-string formatting directives specify precision, padding, and thousand separators cleanly.',
        vi: 'Chỉ định định dạng trong f-string giúp quy định độ chính xác, đệm số 0 và dấu phẩy nghìn gọn gàng.'
      }
    }
  ],
  challenge: {
    id: 'py_10_challenge',
    title: {
      en: 'Challenge: Markdown Table Generator',
      vi: 'Thử thách: Trình Tạo Bảng Markdown Tự Động'
    },
    description: {
      en: 'Write `generate_markdown_table(headers: list[str], rows: list[list[str]]) -> str` that receives a list of header strings and a list of row strings, right-pads every column to match the maximum width of any value in that column (minimum column width 3), and returns a properly aligned Markdown table string with header, separator (`|:---|`), and row lines joined by newlines.',
      vi: 'Viết hàm `generate_markdown_table(headers: list[str], rows: list[list[str]]) -> str` nhận danh sách tiêu đề và danh sách các dòng, căn lề cột theo độ dài tối đa của giá trị trong cột đó và trả về chuỗi bảng Markdown hoàn chỉnh có tiêu đề, dải phân cách và các dòng dữ liệu.'
    },
    requirements: [
      {
        en: 'Compute column maximum string widths dynamically',
        vi: 'Tính độ rộng ký tự tối đa của từng cột linh hoạt'
      },
      {
        en: 'Generate aligned header and separator rows',
        vi: 'Sinh tiêu đề bảng và dòng phân cách căn lề chuẩn'
      },
      {
        en: 'Format all rows into a valid Markdown table string',
        vi: 'Định dạng toàn bộ các dòng thành chuỗi bảng Markdown hợp lệ'
      }
    ],
    starterCode: `def generate_markdown_table(headers: list[str], rows: list[list[str]]) -> str:
    # TODO: Build aligned markdown table
    pass`,
    solutionCode: `def generate_markdown_table(headers: list[str], rows: list[list[str]]) -> str:
    num_cols = len(headers)
    widths = [max(3, len(h)) for h in headers]
    for row in rows:
        for i in range(num_cols):
            if i < len(row):
                widths[i] = max(widths[i], len(str(row[i])))
    
    # Header row
    h_cells = [f"{headers[i]:<{widths[i]}}" for i in range(num_cols)]
    header_line = "| " + " | ".join(h_cells) + " |"
    
    # Separator row
    sep_cells = [f":{'-' * (widths[i] - 1)}" if widths[i] > 1 else "--" for i in range(num_cols)]
    sep_line = "| " + " | ".join(sep_cells) + " |"
    
    # Body rows
    body_lines = []
    for row in rows:
        r_cells = [f"{str(row[i]):<{widths[i]}}" if i < len(row) else " " * widths[i] for i in range(num_cols)]
        body_lines.append("| " + " | ".join(r_cells) + " |")
        
    return "\\n".join([header_line, sep_line] + body_lines)`,
    hints: [
      {
        en: 'Compute column max widths first, then format each cell using f"{cell:<{width}}".',
        vi: 'Tính độ rộng tối đa mỗi cột trước, rồi định dạng từng ô bằng f"{cell:<{width}}".'
      }
    ],
    solutionExplanation: {
      en: 'Dynamically scales column widths and leverages f-string alignment to format markdown tables.',
      vi: 'Tự động co giãn độ rộng cột và dùng định dạng căn lề của f-string để tạo bảng Markdown.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_10_q1',
      type: 'single_choice',
      question: {
        en: 'What does the method `", ".join(["apple", "banana", "cherry"])` return?',
        vi: 'Phương thức `", ".join(["apple", "banana", "cherry"])` trả về kết quả gì?'
      },
      options: [
        { en: '"apple, banana, cherry"', vi: '"apple, banana, cherry"' },
        { en: '["apple, ", "banana, ", "cherry"]', vi: '["apple, ", "banana, ", "cherry"]' },
        { en: 'TypeError', vi: 'TypeError' },
        { en: '"apple banana cherry"', vi: '"apple banana cherry"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`join()` concatenates all iterable elements with the delimiter string placed in between.',
        vi: 'Phương thức `join()` nối tất cả các phần tử trong danh sách bằng chuỗi phân cách chỉ định.'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    },
    {
      id: 'py_10_q2',
      type: 'single_choice',
      question: {
        en: 'What is returned by `"Python".find("th")` vs `"Python".find("xyz")`?',
        vi: 'Kết quả của `"Python".find("th")` và `"Python".find("xyz")` là gì?'
      },
      options: [
        { en: '2 and -1', vi: '2 và -1' },
        { en: '2 and None', vi: '2 và None' },
        { en: '2 and ValueError', vi: '2 và ValueError' },
        { en: '3 and -1', vi: '3 và -1' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`.find()` returns the starting index of the match (2 for "th"), or -1 if the substring does not exist.',
        vi: '`.find()` trả về vị trí bắt đầu của chuỗi con (2 cho "th"), hoặc -1 nếu không tìm thấy.'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    },
    {
      id: 'py_10_q3',
      type: 'single_choice',
      question: {
        en: 'What does the f-string format specifier `{value:.2f}` do on `value = 12.3456`?',
        vi: 'Bộ định dạng `{value:.2f}` trong f-string làm gì với `value = 12.3456`?'
      },
      options: [
        { en: 'Formats the number as a float with 2 decimal places: "12.35"', vi: 'Định dạng số thực với 2 chữ số thập phân: "12.35"' },
        { en: 'Multiplies the number by 2', vi: 'Nhân số đó với 2' },
        { en: 'Truncates the integer part to 2 digits', vi: 'Cắt phần nguyên thành 2 chữ số' },
        { en: 'Converts value into scientific notation', vi: 'Chuyển giá trị sang ký hiệu khoa học' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`:.2f` rounds and formats the float to 2 fixed decimal places.',
        vi: '`:.2f` làm tròn và định dạng số thực với đúng 2 chữ số phần thập phân.'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    },
    {
      id: 'py_10_q4',
      type: 'single_choice',
      question: {
        en: 'What does `s.split()` return when called without arguments on `"  hello   world  "`?',
        vi: 'Phương thức `s.split()` không đối số trả về gì với chuỗi `"  hello   world  "`?'
      },
      options: [
        { en: '["hello", "world"]', vi: '["hello", "world"]' },
        { en: '["", "", "hello", "", "", "world", "", ""]', vi: '["", "", "hello", "", "", "world", "", ""]' },
        { en: '("hello", "world")', vi: '("hello", "world")' },
        { en: '"hello world"', vi: '"hello world"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Without arguments, `.split()` automatically collapses all whitespace sequences and strips empty chunks.',
        vi: 'Khi không truyền đối số, `.split()` tự động gom mọi khoảng trắng liên tiếp và loại bỏ các phần tử rỗng.'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    },
    {
      id: 'py_10_q5',
      type: 'single_choice',
      question: {
        en: 'What does the debugging f-string syntax `f"{score=}"` output if `score = 95`?',
        vi: 'Cú pháp debug `f"{score=}"` của f-string in ra kết quả gì nếu `score = 95`?'
      },
      options: [
        { en: '"score=95"', vi: '"score=95"' },
        { en: '"95"', vi: '"95"' },
        { en: '"score: 95"', vi: '"score: 95"' },
        { en: 'SyntaxError', vi: 'SyntaxError' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In Python 3.8+, the `=` specifier outputs the expression text along with its evaluated value, returning "score=95".',
        vi: 'Từ Python 3.8+, ký hiệu `=` in tên biến/biểu thức kèm giá trị thực tế của nó, trả về "score=95".'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    },
    {
      id: 'py_10_q6',
      type: 'single_choice',
      question: {
        en: 'What does the method `"hello".replace("l", "w", 1)` return?',
        vi: 'Phương thức `"hello".replace("l", "w", 1)` trả về kết quả gì?'
      },
      options: [
        { en: '"hewlo"', vi: '"hewlo"' },
        { en: '"hewwo"', vi: '"hewwo"' },
        { en: '"hello"', vi: '"hello"' },
        { en: '["he", "w", "o"]', vi: '["he", "w", "o"]' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The third argument `1` limits the number of replacements to only the first matching occurrence.',
        vi: 'Tham số thứ ba `1` giới hạn số lần thay thế chỉ áp dụng cho ký tự đầu tiên khớp.'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    },
    {
      id: 'py_10_q7',
      type: 'single_choice',
      question: {
        en: 'What does `"test".startswith(("http://", "https://"))` evaluate to?',
        vi: 'Biểu thức `"test".startswith(("http://", "https://"))` trả về giá trị gì?'
      },
      options: [
        { en: 'False (startswith accepts a tuple of multiple prefixes to check)', vi: 'False (startswith chấp nhận một tuple gồm nhiều tiền tố)' },
        { en: 'TypeError (startswith only accepts a single string)', vi: 'TypeError (startswith chỉ nhận 1 chuỗi đơn)' },
        { en: 'True', vi: 'True' },
        { en: 'None', vi: 'None' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`.startswith()` and `.endswith()` accept a tuple of string candidates and return True if any match.',
        vi: '`.startswith()` và `.endswith()` nhận một tuple các chuỗi tiền tố/hậu tố và trả về True nếu khớp bất kỳ chuỗi nào.'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    },
    {
      id: 'py_10_q8',
      type: 'single_choice',
      question: {
        en: 'What is the output of `f"{1500000:,}"` in Python?',
        vi: 'Kết quả của `f"{1500000:,}"` trong Python là gì?'
      },
      options: [
        { en: '"1,500,000"', vi: '"1,500,000"' },
        { en: '"1500000"', vi: '"1500000"' },
        { en: '"1.500.000"', vi: '"1.500.000"' },
        { en: '"1500,000"', vi: '"1500,000"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The comma `,` format specifier adds thousands separators to numbers.',
        vi: 'Ký tự `,` trong f-string tự động chèn dấu phẩy phân tách hàng nghìn.'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    },
    {
      id: 'py_10_q9',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of `s.strip("# ")`?',
        vi: 'Mục đích của lệnh `s.strip("# ")` là gì?'
      },
      options: [
        { en: 'Removes all leading and trailing hashtags and space characters', vi: 'Loại bỏ tất cả dấu thăng và khoảng trắng ở đầu và cuối chuỗi' },
        { en: 'Replaces all hashtags with spaces across the whole string', vi: 'Thay thế tất cả dấu thăng thành khoảng trắng trong toàn bộ chuỗi' },
        { en: 'Splits the string on hashtags', vi: 'Tách chuỗi theo dấu thăng' },
        { en: 'Raises ValueError', vi: 'Kích hoạt lỗi ValueError' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Passing characters to `.strip()` removes any combination of those specific characters from both ends of the string.',
        vi: 'Truyền chuỗi ký tự vào `.strip()` sẽ loại bỏ mọi tổ hợp các ký tự đó ở cả 2 đầu chuỗi.'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    },
    {
      id: 'py_10_q10',
      type: 'single_choice',
      question: {
        en: 'What happens when evaluating `f"Result: {10 / 0}"` at runtime?',
        vi: 'Điều gì xảy ra khi thực thi `f"Result: {10 / 0}"` tại runtime?'
      },
      options: [
        { en: 'It raises ZeroDivisionError when the f-string is evaluated', vi: 'Kích hoạt lỗi ZeroDivisionError khi f-string được tính toán' },
        { en: 'It returns "Result: Infinity"', vi: 'Trả về chuỗi "Result: Infinity"' },
        { en: 'It returns "Result: None"', vi: 'Trả về "Result: None"' },
        { en: 'It compiles to NaN', vi: 'Biên dịch thành NaN' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Expressions inside `{...}` in f-strings are evaluated as real Python code at runtime; division by zero raises ZeroDivisionError.',
        vi: 'Biểu thức bên trong `{...}` của f-string được thực thi như mã Python bình thường lúc chạy, do đó chia cho 0 sẽ kích hoạt ZeroDivisionError.'
      },
      topicId: 'python_string_methods_fstrings',
      difficulty: 'easy'
    }
  ]
};
export default lesson05;
