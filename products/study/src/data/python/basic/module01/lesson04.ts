import { Lesson } from '../../../../types';

export const lesson04: Lesson = {
  id: 'py_lesson_4',
  moduleId: 'py_mod_1',
  levelId: 'basic',
  courseId: 'python',
  order: 4,
  topicId: 'python_strings_indexing_slicing',
  title: {
    en: 'String Fundamentals, Indexing & Slicing',
    vi: 'Cơ Bản Về Chuỗi, Lập Chỉ Mục & Cắt Lát (Slicing)'
  },
  summary: {
    en: 'Master Python string literal quotes, escape characters (\\n, \\t), raw strings (r""), 0-based & negative indexing, and slicing [start:stop:step].',
    vi: 'Làm chủ dấu nháy chuỗi, ký tự thoát (\\n, \\t), chuỗi thô (r""), chỉ mục dương/âm và cú pháp cắt lát [start:stop:step].'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Strings in Python (`str`) are immutable sequences of Unicode characters. They support versatile literal declarations, escape sequences, zero-based positive and negative indexing, and slicing syntax for extracting sub-strings.',
      vi: 'Chuỗi trong Python (`str`) là dãy ký tự Unicode bất biến (immutable). Chúng hỗ trợ đa dạng kiểu khai báo, ký tự thoát, chỉ mục dương/âm và cú pháp cắt lát mạnh mẽ.'
    },
    conceptExplanation: {
      en: "1. String Quotes & Raw Strings:\n- Single (`'...'`), double (`\"...\"`), triple quotes (`\"\"\"...\"\"\"` for multi-line).\n- Escape sequences: `\\n` (newline), `\\t` (tab), `\\\\` (literal backslash), `\\\"` (escaped quote).\n- Raw strings (`r\"C:\\path\\regex\"`) disable escape sequence processing.\n\n2. Indexing (0-Based & Negative):\n- `s[0]`: First character\n- `s[-1]`: Last character\n- `s[-2]`: Second to last character\n\n3. Slicing Syntax `[start:stop:step]`:\n- `start`: Inclusive starting index (defaults to 0).\n- `stop`: Exclusive ending boundary index (defaults to len(s)).\n- `step`: Increment stride (defaults to 1; negative step reverses extraction).\n- Examples: `s[0:4]`, `s[:5]`, `s[2:]`, `s[::2]` (every 2nd char), `s[::-1]` (reverses string).",
      vi: "1. Dấu nháy & Chuỗi thô (Raw String):\n- Dấu nháy đơn (`'...'`), nháy kép (`\"...\"`), ba nháy (`\"\"\"...\"\"\"` cho văn bản nhiều dòng).\n- Ký tự thoát: `\\n` (xuống dòng), `\\t` (tab), `\\\\` (dấu gạch chéo ngược), `\\\"` (dấu nháy kép).\n- Raw strings (`r\"C:\\path\\regex\"`) vô hiệu hóa ký tự thoát.\n\n2. Chỉ mục (0-based & Chỉ mục âm):\n- `s[0]`: Ký tự đầu tiên\n- `s[-1]`: Ký tự cuối cùng\n- `s[-2]`: Ký tự kế cuối\n\n3. Cú pháp cắt lát `[start:stop:step]`:\n- `start`: Chỉ mục bắt đầu (mặc định là 0).\n- `stop`: Giới hạn kết thúc không lấy (mặc định là len(s)).\n- `step`: Bước nhảy (mặc định là 1; step âm dùng đảo ngược chuỗi).\n- Ví dụ: `s[0:4]`, `s[:5]`, `s[2:]`, `s[::2]` (lấy cách quãng 2 ký tự), `s[::-1]` (đảo ngược chuỗi)."
    },
    syntax: `text = "Python Programming"

# Indexing
first = text[0]     # 'P'
last = text[-1]     # 'g'

# Slicing [start:stop:step]
prefix = text[:6]       # 'Python'
suffix = text[7:]       # 'Programming'
reversed_s = text[::-1] # 'gnimmargorP nohtyP'
evens = text[::2]       # 'Pto rgamn'`,
    examples: [
      {
        title: {
          en: 'Extracting Protocol and File Extensions',
          vi: 'Trích Xuất Giao Thức & Phần Mở Rộng Tệp'
        },
        code: `def parse_url_components(url: str) -> dict:
    # Extract scheme
    scheme_end = url.find("://")
    scheme = url[:scheme_end] if scheme_end != -1 else "unknown"
    
    # Extract domain / host
    remaining = url[scheme_end + 3:] if scheme_end != -1 else url
    slash_pos = remaining.find("/")
    host = remaining[:slash_pos] if slash_pos != -1 else remaining
    
    return {"scheme": scheme, "host": host}

print(parse_url_components("https://api.example.com/v1/users"))`,
        language: 'python',
        explanation: {
          en: 'Slicing syntax extracts exact sub-components using calculated index positions.',
          vi: 'Cú pháp cắt lát trích xuất các thành phần con chính xác theo vị trí chỉ mục.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Attempting in-place string character mutation: s[0] = "J" raises TypeError.',
          vi: 'Cố gắng sửa trực tiếp ký tự trong chuỗi: s[0] = "J" gây ra lỗi TypeError.'
        },
        correction: {
          en: 'Strings in Python are immutable. Construct a new string: s = "J" + s[1:].',
          vi: 'Chuỗi trong Python là bất biến. Hãy tạo chuỗi mới: s = "J" + s[1:].'
        },
        code: `s = "Hello"\n# s[0] = "J"  # TypeError!\ns = "J" + s[1:]  # "Jello"`
      },
      {
        mistake: {
          en: 'Index out of bounds error when accessing single index: s[100] on short string.',
          vi: 'Lỗi IndexError khi truy cập chỉ mục vượt quá độ dài chuỗi: s[100].'
        },
        correction: {
          en: 'While single indexing s[100] raises IndexError, slices s[:100] gracefully handle boundaries without crashing.',
          vi: 'Trong khi truy cập chỉ mục đơn s[100] báo lỗi IndexError, cắt lát s[:100] tự động điều chỉnh mà không bị lỗi.'
        },
        code: `text = "Python"\n# print(text[20])  # IndexError\nprint(text[:20])     # Returns "Python"`
      }
    ],
    tips: [
      {
        en: 'To check if a string is a palindrome, use `s == s[::-1]`.',
        vi: 'Để kiểm tra chuỗi đối xứng (palindrome), dùng `s == s[::-1]`.'
      },
      {
        en: 'Use raw string `r"..."` when defining regex patterns or Windows file paths with backslashes.',
        vi: 'Dùng chuỗi thô `r"..."` khi viết regex hoặc đường dẫn tệp Windows có dấu gạch chéo ngược.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_8_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Domain Masker',
        vi: 'Bài tập 1: Che Dấu Địa Chỉ Email'
      },
      instruction: {
        en: 'Write `mask_email_prefix(email: str) -> str` that keeps the first character of the username, replaces the remaining username characters with `***`, and appends the domain part untouched. Example: `"alice@domain.com"` -> `"a***@domain.com"`.',
        vi: 'Viết hàm `mask_email_prefix(email: str) -> str` giữ ký tự đầu của username, thay các ký tự còn lại của username thành `***`, và giữ nguyên phần domain. Ví dụ: `"alice@domain.com"` -> `"a***@domain.com"`.'
      },
      starterCode: `def mask_email_prefix(email: str) -> str:
    # TODO: Mask username leaving first char + *** + @domain
    pass`,
      solutionCode: `def mask_email_prefix(email: str) -> str:
    at_pos = email.find("@")
    if at_pos <= 1:
        return email
    username = email[:at_pos]
    domain = email[at_pos:]
    return f"{username[0]}***{domain}"`,
      hint: {
        en: 'Find the @ symbol position and slice username and domain parts.',
        vi: 'Tìm vị trí dấu @ rồi cắt chuỗi thành phần username và domain.'
      },
      explanation: {
        en: 'Uses string slicing to isolate and mask the username portion safely.',
        vi: 'Dùng cắt lát chuỗi để tách và che dấu phần tên người dùng an toàn.'
      }
    },
    {
      id: 'py_8_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Palindrome Validator with Slicing',
        vi: 'Bài tập 2: Kiểm Tra Chuỗi Đối Xứng Bằng Slicing'
      },
      instruction: {
        en: 'Write `is_alphanumeric_palindrome(s: str) -> bool` that filters out all non-alphanumeric characters, converts to lowercase, and checks if it equals its reverse slice `[::-1]`.',
        vi: 'Viết hàm `is_alphanumeric_palindrome(s: str) -> bool` lọc bỏ các ký tự không phải chữ/số, chuyển thành chữ thường và kiểm tra xem có bằng chuỗi đảo ngược `[::-1]` hay không.'
      },
      starterCode: `def is_alphanumeric_palindrome(s: str) -> bool:
    # TODO: Filter, lowercase and check slice palindrome
    pass`,
      solutionCode: `def is_alphanumeric_palindrome(s: str) -> bool:
    cleaned = "".join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]`,
      hint: {
        en: 'Use "".join(...) with c.isalnum() then compare to cleaned[::-1].',
        vi: 'Dùng "".join(...) với c.isalnum() rồi so sánh với cleaned[::-1].'
      },
      explanation: {
        en: 'Reversing with slicing `[::-1]` is the fastest, cleanest way to test palindromes.',
        vi: 'Đảo ngược chuỗi bằng lát cắt `[::-1]` là cách nhanh và tối ưu nhất để kiểm tra đối xứng.'
      }
    }
  ],
  challenge: {
    id: 'py_8_challenge',
    title: {
      en: 'Challenge: Fixed-Width Record Parser',
      vi: 'Thử thách: Bộ Phân Tích Bản Ghi Độ Rộng Cố Định'
    },
    description: {
      en: 'Write `parse_fixed_record(record: str) -> dict` to parse a fixed-width string record structured as follows:\n- chars 0-7: `id` (trimmed str)\n- chars 8-27: `name` (trimmed str)\n- chars 28-35: `balance` (cast to float, e.g. "00150.75" -> 150.75)\n- chars 36-37: `status` (trimmed str, e.g. "AC")\nReturn a dictionary with these 4 keys.',
      vi: 'Viết hàm `parse_fixed_record(record: str) -> dict` phân tích chuỗi bản ghi độ rộng cố định:\n- Ký tự 0-7: `id` (chuỗi đã trim)\n- Ký tự 8-27: `name` (chuỗi đã trim)\n- Ký tự 28-35: `balance` (ép sang float)\n- Ký tự 36-37: `status` (chuỗi đã trim)\nTrả về dictionary chứa 4 khóa này.'
    },
    requirements: [
      {
        en: 'Extract fixed width columns using exact index slice ranges',
        vi: 'Trích xuất các cột độ rộng cố định bằng các khoảng cắt lát chỉ mục chính xác'
      },
      {
        en: 'Trim extraneous spaces from textual columns',
        vi: 'Loại bỏ khoảng trắng thừa từ các cột văn bản'
      },
      {
        en: 'Cast numeric balance column to float',
        vi: 'Ép kiểu cột balance thành số float'
      }
    ],
    starterCode: `def parse_fixed_record(record: str) -> dict:
    # TODO: Slice record by exact column boundaries
    pass`,
    solutionCode: `def parse_fixed_record(record: str) -> dict:
    rec_id = record[0:8].strip()
    name = record[8:28].strip()
    balance = float(record[28:36].strip())
    status = record[36:38].strip()
    return {
        "id": rec_id,
        "name": name,
        "balance": balance,
        "status": status
    }`,
    hints: [
      {
        en: 'Use slices record[0:8], record[8:28], record[28:36], record[36:38].',
        vi: 'Dùng các lát cắt record[0:8], record[8:28], record[28:36], record[36:38].'
      }
    ],
    solutionExplanation: {
      en: 'Extracts substrings at defined column offsets and parses numeric balances.',
      vi: 'Cắt lát các chuỗi con theo vị trí cột định trước và ép kiểu số dư balance.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_8_q1',
      type: 'single_choice',
      question: {
        en: 'What does the slice `s[::-1]` do on any string `s` in Python?',
        vi: 'Lát cắt `s[::-1]` làm gì trên một chuỗi `s` trong Python?'
      },
      options: [
        { en: 'Returns the string without its first and last characters', vi: 'Trả về chuỗi nhưng bỏ ký tự đầu và cuối' },
        { en: 'Reverses the entire string', vi: 'Đảo ngược toàn bộ chuỗi' },
        { en: 'Extracts every second character', vi: 'Trích xuất các ký tự cách quãng 2 vị trí' },
        { en: 'Raises a SliceError', vi: 'Kích hoạt lỗi SliceError' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'A slice with a step of `-1` and omitted start/stop steps through the sequence backwards, reversing it.',
        vi: 'Cú pháp cắt lát với step bằng `-1` và bỏ trống start/stop sẽ duyệt lùi toàn bộ chuỗi, tạo ra chuỗi đảo ngược.'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    },
    {
      id: 'py_8_q2',
      type: 'single_choice',
      question: {
        en: 'Given `s = "PYTHON"`, what is the value of `s[-1]`?',
        vi: 'Cho `s = "PYTHON"`, giá trị của `s[-1]` là gì?'
      },
      options: [
        { en: '"P"', vi: '"P"' },
        { en: '"N"', vi: '"N"' },
        { en: '"O"', vi: '"O"' },
        { en: 'IndexError', vi: 'IndexError' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Negative index `-1` retrieves the last character in any sequence, which is `"N"`.',
        vi: 'Chỉ mục âm `-1` truy xuất phần tử cuối cùng của chuỗi, ở đây là `"N"`.'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    },
    {
      id: 'py_8_q3',
      type: 'single_choice',
      question: {
        en: 'What is the value of `"Python"[1:4]`?',
        vi: 'Giá trị của biểu thức `"Python"[1:4]` là gì?'
      },
      options: [
        { en: '"Pyt"', vi: '"Pyt"' },
        { en: '"yth"', vi: '"yth"' },
        { en: '"ytho"', vi: '"ytho"' },
        { en: '"y"', vi: '"y"' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Slicing from index 1 up to index 4 (exclusive) extracts characters at positions 1, 2, and 3: "y", "t", "h".',
        vi: 'Cắt lát từ chỉ mục 1 đến trước chỉ mục 4 lấy các ký tự ở vị trí 1, 2, 3: "y", "t", "h".'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    },
    {
      id: 'py_8_q4',
      type: 'single_choice',
      question: {
        en: 'Why do raw strings (e.g. `r"\\n\\t"`) exist in Python?',
        vi: 'Tại sao chuỗi thô (raw string ví dụ `r"\\n\\t"`) lại được tạo ra trong Python?'
      },
      options: [
        { en: 'To allow strings to contain binary machine code', vi: 'Để cho phép chuỗi chứa mã máy nhị phân' },
        { en: 'To treat backslashes as literal characters without interpreting escape sequences', vi: 'Để xem dấu gạch chéo ngược là ký tự thuần túy không diễn giải escape sequence' },
        { en: 'To make strings mutable in memory', vi: 'Để làm cho chuỗi có thể sửa đổi trong bộ nhớ' },
        { en: 'To encrypt string contents', vi: 'Để mã hóa nội dung chuỗi' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Raw strings prefix `r` treats backslashes literally, making them essential for regex patterns and file paths.',
        vi: 'Tiền tố chuỗi thô `r` giữ nguyên các dấu gạch chéo ngược, đặc biệt hữu ích cho biểu thức chính quy (regex) và đường dẫn file.'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    },
    {
      id: 'py_8_q5',
      type: 'single_choice',
      question: {
        en: 'What error is raised when trying to mutate a string directly: `s = "Cat"; s[0] = "B"`?',
        vi: 'Lỗi nào xuất hiện khi cố gắng thay đổi ký tự trong chuỗi: `s = "Cat"; s[0] = "B"`?'
      },
      options: [
        { en: 'ValueError', vi: 'ValueError' },
        { en: 'TypeError', vi: 'TypeError' },
        { en: 'MutationError', vi: 'MutationError' },
        { en: 'IndexError', vi: 'IndexError' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Strings are immutable objects in Python, so item assignment raises a `TypeError: \'str\' object does not support item assignment`.',
        vi: 'Chuỗi trong Python là đối tượng bất biến nên phép gán phần tử gây ra lỗi `TypeError: \'str\' object does not support item assignment`.'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    },
    {
      id: 'py_8_q6',
      type: 'single_choice',
      question: {
        en: 'Given `s = "DataScience"`, what is returned by `s[::2]`?',
        vi: 'Cho `s = "DataScience"`, biểu thức `s[::2]` trả về giá trị gì?'
      },
      options: [
        { en: '"DtSin"', vi: '"DtSin"' },
        { en: '"DtScne"', vi: '"DtScne"' },
        { en: '"aaSine"', vi: '"aaSine"' },
        { en: '"Data"', vi: '"Data"' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Indices 0, 2, 4, 6, 8, 10 extract characters: D, t, S, c, n, e ("DtScne").',
        vi: 'Các vị trí chẵn 0, 2, 4, 6, 8, 10 trích xuất các ký tự: D, t, S, c, n, e ("DtScne").'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    },
    {
      id: 'py_8_q7',
      type: 'single_choice',
      question: {
        en: 'What happens when you slice past the end of a string: `"Hi"[:50]`?',
        vi: 'Điều gì xảy ra khi bạn cắt lát vượt quá độ dài chuỗi: `"Hi"[:50]`?'
      },
      options: [
        { en: 'It raises an IndexError', vi: 'Báo lỗi IndexError' },
        { en: 'It returns "Hi"', vi: 'Trả về chuỗi "Hi"' },
        { en: 'It pads the string with spaces up to length 50', vi: 'Tự động chèn thêm khoảng trắng cho đủ 50 ký tự' },
        { en: 'It returns None', vi: 'Trả về None' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python slicing is boundary-safe: slices exceeding the string length gracefully truncate to the actual end.',
        vi: 'Cắt lát trong Python tự động xử lý an toàn: nếu giới hạn vượt quá độ dài, nó sẽ lấy đến hết chuỗi mà không báo lỗi.'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    },
    {
      id: 'py_8_q8',
      type: 'single_choice',
      question: {
        en: 'Which quote style allows a string to span multiple lines without explicit `\\n` escapes?',
        vi: 'Kiểu dấu nháy nào cho phép chuỗi trải dài trên nhiều dòng mà không cần gõ ký tự thoát `\\n`?'
      },
      options: [
        { en: 'Single quotes (\'...\')', vi: 'Dấu nháy đơn (\'...\')' },
        { en: 'Double quotes ("...")', vi: 'Dấu nháy kép ("...")' },
        { en: 'Triple quotes (\'\'\'...\'\'\' or """...""") ', vi: 'Ba dấu nháy (\'\'\'...\'\'\' hoặc """...""")' },
        { en: 'Backticks (`...`)', vi: 'Dấu backtick (`...`)' }
      ],
      correctAnswers: [2],
      explanation: {
        en: 'Triple-quoted strings preserve literal newlines across multiple lines.',
        vi: 'Chuỗi đặt trong ba dấu nháy đơn hoặc ba dấu nháy kép giữ nguyên các dấu xuống dòng thực tế.'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    },
    {
      id: 'py_8_q9',
      type: 'single_choice',
      question: {
        en: 'What is the result of `"Hello" + " " + "World"` in Python?',
        vi: 'Kết quả của biểu thức `"Hello" + " " + "World"` trong Python là gì?'
      },
      options: [
        { en: '"HelloWorld"', vi: '"HelloWorld"' },
        { en: '"Hello World"', vi: '"Hello World"' },
        { en: '["Hello", " ", "World"]', vi: '["Hello", " ", "World"]' },
        { en: 'TypeError', vi: 'TypeError' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The `+` operator concatenates strings sequentially into a new combined string.',
        vi: 'Toán tử `+` thực hiện phép nối chuỗi tuần tự thành một chuỗi mới.'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    },
    {
      id: 'py_8_q10',
      type: 'single_choice',
      question: {
        en: 'What does the expression `"Python" * 3` produce?',
        vi: 'Biểu thức `"Python" * 3` tạo ra kết quả gì?'
      },
      options: [
        { en: 'TypeError', vi: 'TypeError' },
        { en: '"PythonPythonPython"', vi: '"PythonPythonPython"' },
        { en: '["Python", "Python", "Python"]', vi: '["Python", "Python", "Python"]' },
        { en: '"Python 3"', vi: '"Python 3"' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Multiplying a string by an integer `n` repeats the string `n` times.',
        vi: 'Nhân chuỗi với một số nguyên `n` sẽ lặp lại chuỗi đó `n` lần.'
      },
      topicId: 'python_strings_indexing_slicing',
      difficulty: 'easy'
    }
  ]
};
export default lesson04;
