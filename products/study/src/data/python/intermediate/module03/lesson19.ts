import { Lesson } from '../../../../types';

export const lesson19: Lesson = {
  id: 'py_lesson_19',
  moduleId: 'py_mod_8',
  levelId: 'intermediate',
  courseId: 'python',
  order: 19,
  topicId: 'python_regular_expressions_re',
  title: {
    en: 'Regular Expressions: Text Pattern Matching, Extraction & Validation with re',
    vi: 'Biểu Thức Chính Quy (Regex): Khớp Mẫu, Trích Xuất & Xác Thực Với Module re'
  },
  summary: {
    en: 'Master professional text parsing with Python\'s standard re module: pattern compilation with re.compile, search vs match vs fullmatch, extraction with findall and finditer, substitutions with re.sub, capturing groups, and named groups (?P<name>...).',
    vi: 'Làm chủ xử lý chuỗi nâng cao với thư viện re chuẩn của Python: biên dịch mẫu bằng re.compile, phân biệt search vs match vs fullmatch, trích xuất với findall và finditer, thay thế chuỗi bằng re.sub, nhóm thu thập (capturing groups) và nhóm có tên (?P<name>...).'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Regular expressions (Regex) provide a declarative language for matching, extracting, and manipulating text patterns. In Python, the built-in `re` module delivers high-performance regex evaluation with support for positional groups, named groups, flags, and callback-based string replacements.',
      vi: 'Biểu thức chính quy (Regex) cung cấp ngôn ngữ khai báo mạnh mẽ để tìm kiếm, trích xuất và biến đổi mẫu văn bản. Trong Python, module `re` tích hợp sẵn mang lại hiệu năng cao với đầy đủ tính năng nhóm theo vị trí, nhóm có tên, cờ khớp mẫu và hàm thay thế callback.'
    },
    conceptExplanation: {
      en: '1. Pattern Compilation & Reusability:\n- `pattern = re.compile(r"^pattern", flags=re.IGNORECASE)`: Pre-compiles the regex state machine into bytecode, boosting execution speed when matching repeatedly in loops.\n\n2. Key Matching Functions:\n- `re.search(pattern, text)`: Scans entire string for the first match; returns `Match` object or `None`.\n- `re.match(pattern, text)`: Matches only from the start of the string.\n- `re.fullmatch(pattern, text)`: Matches the complete string from start to end (ideal for input validation).\n- `re.findall(pattern, text)`: Returns a list of all matched substrings or group tuples.\n- `re.finditer(pattern, text)`: Yields iterator of `Match` objects (memory-efficient).\n\n3. Capturing Groups & Named Groups:\n- Positional Groups: `r"(\\d{4})-(\\d{2})-(\\d{2})"` -> `m.group(1)`, `m.group(2)`.\n- Named Groups: `r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})"` -> `m.group("year")`, `m.groupdict()`.\n\n4. Substitution with `re.sub`:\n- `re.sub(pattern, replacement, text)`: Replaces matches with fixed string or backreferences (`\\g<year>`).\n- Accepts a callable replacement function for dynamic calculation.',
      vi: '1. Biên Dịch Mẫu Với `re.compile`:\n- `pattern = re.compile(r"^pattern", flags=re.IGNORECASE)`: Biên dịch trước cỗ máy trạng thái regex thành bytecode, tăng tốc độ xử lý khi tái sử dụng trong vòng lặp.\n\n2. Các Hàm Khớp Mẫu Chính:\n- `re.search(pattern, text)`: Quét toàn bộ chuỗi tìm vị trí khớp đầu tiên; trả về đối tượng `Match` hoặc `None`.\n- `re.match(pattern, text)`: Chỉ khớp từ vị trí đầu chuỗi.\n- `re.fullmatch(pattern, text)`: Khớp toàn bộ chuỗi từ đầu đến cuối (rất tốt để xác thực dữ liệu input).\n- `re.findall(pattern, text)`: Trả về danh sách tất cả các chuỗi con hoặc tuple nhóm khớp.\n- `re.finditer(pattern, text)`: Trả về iterator các đối tượng `Match` (tiết kiệm bộ nhớ).\n\n3. Nhóm Thu Thập & Nhóm Có Tên:\n- Nhóm vị trí: `r"(\\d{4})-(\\d{2})-(\\d{2})"` -> `m.group(1)`, `m.group(2)`.\n- Nhóm có tên: `r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})"` -> `m.group("year")`, `m.groupdict()`.\n\n4. Thay Thế Bằng `re.sub`:\n- `re.sub(pattern, replacement, text)`: Thay thế đoạn khớp bằng chuỗi mới hoặc tham chiếu nhóm (`\\g<year>`).\n- Hỗ trợ truyền hàm callable để tính toán giá trị thay thế động.'
    },
    syntax: `import re

# 1. Compile pattern with named groups and IGNORECASE
email_pattern = re.compile(
    r"(?P<user>[a-zA-Z0-9_.+-]+)@(?P<domain>[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)",
    flags=re.IGNORECASE
)

# 2. Extract with named group dictionary
sample_text = "Contact alice.dev@company.io or support@helpdesk.vn"
for match in email_pattern.finditer(sample_text):
    print("Found email:", match.group(0))
    print("Details:", match.groupdict())  # {"user": "...", "domain": "..."}

# 3. Dynamic substitution with callable
def mask_sensitive(match):
    user = match.group("user")
    domain = match.group("domain")
    masked_user = user[0] + "***" if len(user) > 1 else "*"
    return f"{masked_user}@{domain}"

masked_text = email_pattern.sub(mask_sensitive, sample_text)
print(masked_text)  # "Contact a***@company.io or s***@helpdesk.vn"`,
    examples: [
      {
        title: {
          en: 'Server Access Log Tokenizer with Named Groups',
          vi: 'Trình Phân Tích Log Máy Chủ Bằng Named Groups'
        },
        code: `import re

log_pattern = re.compile(
    r'\\[(?P<timestamp>[^\\]]+)\\] "(?P<method>GET|POST|PUT|DELETE) (?P<path>[^ ]+)" (?P<status>\\d{3}) (?P<bytes>\\d+)'
)

log_line = '[31/Aug/2026:12:00:00 +0000] "GET /api/v1/users" 200 4096'
match = log_pattern.search(log_line)

if match:
    data = match.groupdict()
    data["status"] = int(data["status"])
    data["bytes"] = int(data["bytes"])
    print("Parsed Record:", data)`,
        language: 'python',
        explanation: {
          en: 'Converts raw semi-structured text log lines into strongly-typed structured dictionaries in a single pass.',
          vi: 'Chuyển đổi các dòng log dạng văn bản bán cấu trúc thành dictionary có cấu trúc dữ liệu rõ ràng chỉ trong một bước.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using regular string literals instead of raw strings (e.g. "\\d+" instead of r"\\d+"), causing backslash escape errors.',
          vi: 'Dùng chuỗi thông thường thay vì chuỗi thô raw string (vd: "\\d+" thay vì r"\\d+") dẫn đến lỗi escape ký tự gạch chéo ngược.'
        },
        correction: {
          en: 'Always prefix regex pattern strings with `r` (raw string literal): `r"\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b"`.',
          vi: 'Luôn thêm tiền tố `r` trước chuỗi regex: `r"\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b"`.'
        },
        code: `# Incorrect: pattern = "\\d+\\\\.\\d+"\n# Correct:\npattern = r"\\d+\\.\\d+"`
      },
      {
        mistake: {
          en: 'Confusing `re.match()` with `re.search()`: `re.match()` fails if the pattern appears in the middle of the string.',
          vi: 'Nhầm lẫn giữa `re.match()` và `re.search()`: `re.match()` sẽ trả về None nếu mẫu nằm ở giữa chuỗi.'
        },
        correction: {
          en: 'Use `re.search()` when looking for a pattern anywhere in the text, and `re.fullmatch()` for strict validation.',
          vi: 'Dùng `re.search()` khi tìm kiếm mẫu ở bất kỳ đâu trong chuỗi, và `re.fullmatch()` để xác thực dữ liệu chặt chẽ.'
        },
        code: `text = "Error code: 404"\n# match fails:\n# re.match(r"\\d+", text) -> None\n# search succeeds:\nm = re.search(r"\\d+", text)  # returns Match for "404"`
      }
    ],
    tips: [
      {
        en: 'Use `re.finditer()` instead of `re.findall()` when processing large text streams to avoid instantiating all matches into a list at once.',
        vi: 'Dùng `re.finditer()` thay vì `re.findall()` khi xử lý lượng văn bản lớn để tránh tạo ra toàn bộ danh sách kết quả cùng lúc.'
      },
      {
        en: 'Named groups `(?P<name>...)` make code self-documenting and resilient to index shifts when the regex is updated.',
        vi: 'Nhóm có tên `(?P<name>...)` giúp code tự giải thích và không bị lỗi lệch chỉ số index khi biểu thức regex được chỉnh sửa.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_35_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Hex Color Code Validator',
        vi: 'Bài tập 1: Xác Thực Mã Màu Hex'
      },
      instruction: {
        en: 'Write `is_valid_hex_color(code: str) -> bool` that uses `re.fullmatch()` to verify if `code` is a valid 3-digit or 6-digit hex color code starting with `#` (e.g. `"#FFF"`, `"#1a2b3c"`). Case-insensitive.',
        vi: 'Viết hàm `is_valid_hex_color(code: str) -> bool` sử dụng `re.fullmatch()` để kiểm tra xem `code` có phải là mã màu hex 3 chữ số hoặc 6 chữ số hợp lệ bắt đầu bằng `#` hay không (vd: `"#FFF"`, `"#1a2b3c"`). Không phân biệt hoa thường.'
      },
      starterCode: `import re

def is_valid_hex_color(code: str) -> bool:
    # TODO: Validate hex color code using re.fullmatch
    pass`,
      solutionCode: `import re

def is_valid_hex_color(code: str) -> bool:
    pattern = r"^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"
    return re.fullmatch(pattern, code) is not None`,
      hint: {
        en: 'Use `^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$` with `re.fullmatch()`.',
        vi: 'Dùng mẫu `^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$` với `re.fullmatch()`.'
      },
      explanation: {
        en: '`re.fullmatch()` guarantees the entire string conforms strictly without extra trailing characters.',
        vi: '`re.fullmatch()` đảm bảo toàn bộ chuỗi khớp chính xác mà không chứa ký tự thừa phía sau.'
      }
    },
    {
      id: 'py_35_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Phone Number Masker',
        vi: 'Bài tập 2: Ẩn Số Điện Thoại Bằng re.sub'
      },
      instruction: {
        en: 'Write `mask_phone_numbers(text: str) -> str` that finds all phone numbers matching the pattern `\\b(\\d{3})-(\\d{3})-(\\d{4})\\b` and replaces them with `"XXX-XXX-\\g<1>"` (preserving only the last 4 digits).',
        vi: 'Viết hàm `mask_phone_numbers(text: str) -> str` tìm tất cả các số điện thoại theo định dạng `\\b(\\d{3})-(\\d{3})-(\\d{4})\\b` và thay thế bằng `"XXX-XXX-\\g<1>"` (chỉ giữ lại 4 số cuối).'
      },
      starterCode: `import re

def mask_phone_numbers(text: str) -> str:
    # TODO: Replace phone numbers with masked version using re.sub
    pass`,
      solutionCode: `import re

def mask_phone_numbers(text: str) -> str:
    pattern = r"\\b\\d{3}-\\d{3}-(\\d{4})\\b"
    return re.sub(pattern, r"XXX-XXX-\\g<1>", text)`,
      hint: {
        en: 'Use `re.sub(r"\\b\\d{3}-\\d{3}-(\\d{4})\\b", r"XXX-XXX-\\g<1>", text)`.',
        vi: 'Dùng `re.sub(r"\\b\\d{3}-\\d{3}-(\\d{4})\\b", r"XXX-XXX-\\g<1>", text)`.'
      },
      explanation: {
        en: '`\\g<1>` references the first captured group (the 4 trailing digits).',
        vi: '`\\g<1>` tham chiếu đến nhóm thu thập thứ nhất (4 chữ số cuối).'
      }
    }
  ],
  challenge: {
    id: 'py_35_challenge',
    title: {
      en: 'Structured Query String Parser with Named Groups',
      vi: 'Trình Phân Tích Query String Bằng Named Groups'
    },
    description: {
      en: 'Implement `parse_key_value_pairs(query_string: str) -> dict[str, str]` that uses `re.finditer()` with a named group pattern `(?P<key>[a-zA-Z_][a-zA-Z0-9_]*)=(?P<value>[^&]+)` to extract all key-value pairs from a URL query string into a dictionary.',
      vi: 'Xây dựng hàm `parse_key_value_pairs(query_string: str) -> dict[str, str]` sử dụng `re.finditer()` với mẫu named group `(?P<key>[a-zA-Z_][a-zA-Z0-9_]*)=(?P<value>[^&]+)` để trích xuất toàn bộ các cặp key-value từ một chuỗi URL query thành dictionary.'
    },
    requirements: [
      {
        en: 'Compile regex with named capture groups for key and value',
        vi: 'Biên dịch biểu thức regex với các named group key và value'
      },
      {
        en: 'Iterate over matches using pattern.finditer and group accessors',
        vi: 'Duyệt qua các vị trí khớp bằng pattern.finditer và truy xuất tên nhóm'
      },
      {
        en: 'Construct and return dictionary of parsed query parameters',
        vi: 'Xây dựng và trả về dictionary gồm các tham số query đã phân tích'
      }
    ],
    starterCode: `import re

def parse_key_value_pairs(query_string: str) -> dict[str, str]:
    # TODO: Extract key-value pairs using named group regex
    pass`,
    solutionCode: `import re

def parse_key_value_pairs(query_string: str) -> dict[str, str]:
    pattern = re.compile(r"(?P<key>[a-zA-Z_][a-zA-Z0-9_]*)=(?P<value>[^&]+)")
    result = {}
    for match in pattern.finditer(query_string):
        result[match.group("key")] = match.group("value")
    return result`,
    hints: [
      {
        en: 'Access named groups directly using match.group("key") and match.group("value").',
        vi: 'Truy xuất nhóm có tên trực tiếp qua match.group("key") và match.group("value").'
      }
    ],
    solutionExplanation: {
      en: 'Named groups improve regex readability and eliminate fragile positional index lookups.',
      vi: 'Named group cải thiện khả năng đọc hiểu regex và loại bỏ các tra cứu chỉ số vị trí dễ gãy.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_35_q1',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'easy',
      question: {
        en: 'Why should regex patterns in Python be written as raw strings `r"..."`?',
        vi: 'Tại sao các chuỗi regex trong Python nên được viết dưới dạng raw string `r"..."`?'
      },
      options: [
        { en: 'To allow multiline comments', vi: 'Để cho phép chú thích nhiều dòng' },
        { en: 'To prevent Python\'s string parser from interpreting backslashes as escape characters before passing them to the regex engine', vi: 'Để ngăn trình phân tích chuỗi của Python xử lý các dấu gạch chéo ngược làm ký tự escape trước khi chuyển cho bộ máy regex' },
        { en: 'To make regex case-insensitive automatically', vi: 'Để tự động không phân biệt hoa thường' },
        { en: 'To speed up file compilation', vi: 'Để tăng tốc độ biên dịch file' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Raw strings treat backslashes literally, avoiding double-escaping issues like `\\\\d`.',
        vi: 'Raw string giữ nguyên ký tự gạch chéo ngược, tránh việc phải escape hai lần như `\\\\d`.'
      }
    },
    {
      id: 'py_35_q2',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'medium',
      question: {
        en: 'What is the syntax for creating a named capturing group in Python regex?',
        vi: 'Cú pháp để tạo một nhóm thu thập có tên (named group) trong Python regex là gì?'
      },
      options: [
        { en: '`(?<name>...)`', vi: '`(?<name>...)`' },
        { en: '`(?P<name>...)`', vi: '`(?P<name>...)`' },
        { en: '`($name:...)`', vi: '`($name:...)`' },
        { en: '`(?#name=...)`', vi: '`(?#name=...)`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python regex specifies named groups with `(?P<name>...)`.',
        vi: 'Python regex sử dụng cú pháp `(?P<name>...)` để đặt tên cho nhóm thu thập.'
      }
    },
    {
      id: 'py_35_q3',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'medium',
      question: {
        en: 'What is the key difference between `re.search()` and `re.match()`?',
        vi: 'Điểm khác biệt cốt lõi giữa `re.search()` và `re.match()` là gì?'
      },
      options: [
        { en: '`re.search()` only checks the start of the string, while `re.match()` scans anywhere', vi: '`re.search()` chỉ kiểm tra đầu chuỗi, còn `re.match()` quét ở bất kỳ đâu' },
        { en: '`re.match()` only checks if the pattern matches at the beginning of the string, while `re.search()` scans the entire string', vi: '`re.match()` chỉ khớp mẫu ở ngay đầu chuỗi, trong khi `re.search()` quét toàn bộ chuỗi' },
        { en: '`re.search()` returns a list of strings, while `re.match()` returns a boolean', vi: '`re.search()` trả về danh sách chuỗi, còn `re.match()` trả về boolean' },
        { en: 'There is no difference', vi: 'Không có điểm khác biệt nào' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`re.match()` anchors implicitly at string index 0; `re.search()` scans the entire string.',
        vi: '`re.match()` chỉ tìm khớp bắt đầu từ chỉ số 0 của chuỗi; `re.search()` tìm kiếm trên toàn bộ chuỗi.'
      }
    },
    {
      id: 'py_35_q4',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'easy',
      question: {
        en: 'What does `re.fullmatch(pattern, text)` do?',
        vi: 'Hàm `re.fullmatch(pattern, text)` thực hiện điều gì?'
      },
      options: [
        { en: 'Finds all matches across multiple files', vi: 'Tìm tất cả các vị trí khớp trên nhiều file' },
        { en: 'Checks if the entire string from start to end matches the pattern', vi: 'Kiểm tra xem toàn bộ chuỗi từ đầu đến cuối có khớp hoàn toàn với mẫu hay không' },
        { en: 'Replaces all matches', vi: 'Thay thế tất cả các vị trí khớp' },
        { en: 'Splits the string by regex', vi: 'Cắt chuỗi bằng regex' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`re.fullmatch()` requires the entire string to match the pattern, returning `None` if any characters remain unmatched.',
        vi: '`re.fullmatch()` yêu cầu toàn bộ chuỗi phải khớp hoàn toàn với mẫu, trả về `None` nếu có bất kỳ ký tự nào không khớp.'
      }
    },
    {
      id: 'py_35_q5',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'easy',
      question: {
        en: 'Why is `re.compile()` recommended when matching patterns inside loops?',
        vi: 'Tại sao nên dùng `re.compile()` khi thực hiện khớp mẫu bên trong vòng lặp?'
      },
      options: [
        { en: 'It avoids recompiling the pattern into bytecode on every iteration', vi: 'Tránh việc phải biên dịch lại mẫu thành bytecode ở mỗi vòng lặp' },
        { en: 'It makes the regex run asynchronously', vi: 'Làm cho regex chạy bất đồng bộ' },
        { en: 'It disables case sensitivity by default', vi: 'Tự động tắt phân biệt hoa thường' },
        { en: 'It encrypts the regex pattern in memory', vi: 'Mã hóa mẫu regex trong bộ nhớ' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Pre-compiling with `re.compile()` caches the compiled pattern object, saving compilation overhead in repetitive operations.',
        vi: 'Biên dịch trước bằng `re.compile()` lưu sẵn đối tượng mẫu, tiết kiệm chi phí biên dịch lặp đi lặp lại.'
      }
    },
    {
      id: 'py_35_q6',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'medium',
      question: {
        en: 'What does `m.groupdict()` return on a `Match` object containing named groups?',
        vi: 'Phương thức `m.groupdict()` trả về giá trị gì trên đối tượng `Match` có chứa các named group?'
      },
      options: [
        { en: 'A tuple of all groups', vi: 'Một tuple chứa tất cả các nhóm' },
        { en: 'A dictionary mapping group names to their matched substring values', vi: 'Một dictionary ánh xạ tên nhóm tới giá trị chuỗi con đã khớp' },
        { en: 'The list of regex flags used', vi: 'Danh sách các cờ regex đã dùng' },
        { en: 'The start and end indices of the match', vi: 'Chỉ số bắt đầu và kết thúc của vị trí khớp' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`m.groupdict()` returns a dictionary containing all named subgroups of the match.',
        vi: '`m.groupdict()` trả về một dictionary chứa toàn bộ các nhóm con có tên đã khớp.'
      }
    },
    {
      id: 'py_35_q7',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'medium',
      question: {
        en: 'Which method returns an iterator yielding `Match` objects for memory-efficient iteration?',
        vi: 'Phương thức nào trả về một iterator sinh ra các đối tượng `Match` giúp duyệt tiết kiệm bộ nhớ?'
      },
      options: [
        { en: '`re.findall()`', vi: '`re.findall()`' },
        { en: '`re.finditer()`', vi: '`re.finditer()`' },
        { en: '`re.iter()`', vi: '`re.iter()`' },
        { en: '`re.scan()`', vi: '`re.scan()`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`re.finditer()` yields `Match` objects one by one lazily.',
        vi: '`re.finditer()` sinh ra từng đối tượng `Match` một cách lười (lazy).'
      }
    },
    {
      id: 'py_35_q8',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'medium',
      question: {
        en: 'In `re.sub(pattern, repl, string)`, what can `repl` be?',
        vi: 'Trong `re.sub(pattern, repl, string)`, tham số `repl` có thể là gì?'
      },
      options: [
        { en: 'Only a static string', vi: 'Chỉ có thể là chuỗi tĩnh' },
        { en: 'A replacement string (with group references like `\\g<1>`) or a callable function taking a `Match` object', vi: 'Một chuỗi thay thế (kèm tham chiếu nhóm như `\\g<1>`) hoặc một hàm callable nhận đối tượng `Match`' },
        { en: 'Only a boolean', vi: 'Chỉ có thể là boolean' },
        { en: 'Only a list of strings', vi: 'Chỉ có thể là danh sách chuỗi' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`re.sub` supports both template strings and dynamic callable replacer functions.',
        vi: '`re.sub` hỗ trợ cả chuỗi mẫu thay thế và hàm callable tính toán động.'
      }
    },
    {
      id: 'py_35_q9',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'easy',
      question: {
        en: 'Which regex flag allows the dot `.` metacharacter to match newline characters `\\n`?',
        vi: 'Cờ regex nào cho phép ký tự chấm `.` khớp với cả ký tự xuống dòng `\\n`?'
      },
      options: [
        { en: '`re.MULTILINE`', vi: '`re.MULTILINE`' },
        { en: '`re.DOTALL` (or `re.S`)', vi: '`re.DOTALL` (hoặc `re.S`)' },
        { en: '`re.IGNORECASE`', vi: '`re.IGNORECASE`' },
        { en: '`re.VERBOSE`', vi: '`re.VERBOSE`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`re.DOTALL` makes the `.` special character match any character at all, including a newline.',
        vi: '`re.DOTALL` giúp ký tự `.` khớp với mọi ký tự, bao gồm cả dấu xuống dòng.'
      }
    },
    {
      id: 'py_35_q10',
      type: 'single_choice',
      topicId: 'python_regex_re',
      difficulty: 'easy',
      question: {
        en: 'What does `m.group(0)` return on a `Match` object `m`?',
        vi: '`m.group(0)` trả về kết quả gì trên đối tượng `Match` `m`?'
      },
      options: [
        { en: 'The first captured sub-group', vi: 'Nhóm con thu thập thứ nhất' },
        { en: 'The entire substring that was matched by the regex pattern', vi: 'Toàn bộ chuỗi con đã khớp với biểu thức regex' },
        { en: 'The character index where the match started', vi: 'Chỉ số ký tự bắt đầu khớp' },
        { en: 'The regex pattern itself', vi: 'Chính mẫu regex' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`group(0)` (or `group()`) returns the whole matched substring; `group(1)` onwards return parenthesized sub-groups.',
        vi: '`group(0)` (hoặc `group()`) trả về toàn bộ chuỗi con đã khớp; từ `group(1)` trở đi trả về các nhóm con trong ngoặc đơn.'
      }
    }
  ]
};
