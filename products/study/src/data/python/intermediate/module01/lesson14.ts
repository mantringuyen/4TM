import { Lesson } from '../../../../types';

export const lesson14: Lesson = {
  id: 'py_lesson_14',
  moduleId: 'py_mod_6',
  levelId: 'intermediate',
  courseId: 'python',
  order: 14,
  topicId: 'python_comprehensions_collections',
  title: {
    en: 'Comprehensions: List, Dict, Set & Nested Patterns',
    vi: 'Comprehensions: List, Dict, Set & Cấu Trúc Lồng Nhau'
  },
  summary: {
    en: 'Master expressive, high-performance comprehension constructs in Python: list comprehensions, dictionary comprehensions, set comprehensions, multi-clause nested iterations, and conditional transformations.',
    vi: 'Làm chủ cú pháp comprehension ngắn gọn và hiệu năng cao trong Python: list comprehension, dict comprehension, set comprehension, lặp lồng đa tầng và biến đổi điều kiện.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Comprehensions provide a concise, declarative syntax for transforming, filtering, and constructing new collections from existing iterables. Implemented at the C level in CPython, comprehensions are significantly faster and more readable than manual append loops.',
      vi: 'Comprehension cung cấp cú pháp khai báo ngắn gọn, rõ ràng để biến đổi, lọc và tạo mới các tập hợp từ iterable có sẵn. Được tối ưu hóa ở tầng C trong CPython, comprehension chạy nhanh hơn và trực quan hơn nhiều so với vòng lặp append thủ công.'
    },
    conceptExplanation: {
      en: '1. List Comprehensions:\n- Syntax: `[expression for item in iterable if condition]`\n- Replaces manual list instantiation and `.append()` loops.\n- Ternary with comprehension: `[x if cond else y for x in iterable]`\n\n2. Dictionary & Set Comprehensions:\n- Dict Comprehension: `{key_expr: val_expr for item in iterable if condition}`\n- Inverting a dictionary: `{v: k for k, v in original.items()}`\n- Set Comprehension: `{expression for item in iterable if condition}` (auto-deduplicating)\n\n3. Nested Comprehensions (Matrix Flattening & Cartesian Products):\n- Flattening 2D grid: `[val for row in matrix for val in row]` (read left to right matching loop order).\n- Cartesian coordinates: `[(x, y) for x in xs for y in ys]`',
      vi: '1. List Comprehensions:\n- Cú pháp: `[biểu_thức for phần_tử in tập_hợp if điều_kiện]`\n- Thay thế việc khởi tạo list và gọi `.append()` thủ công.\n- Toán tử 3 ngôi: `[x if điều_kiện else y for x in tập_hợp]`\n\n2. Dict & Set Comprehensions:\n- Dict Comprehension: `{khóa_expr: giá_trị_expr for phần_tử in tập_hợp if điều_kiện}`\n- Đảo ngược key-value: `{v: k for k, v in original.items()}`\n- Set Comprehension: `{biểu_thức for phần_tử in tập_hợp if điều_kiện}` (tự động loại trùng)\n\n3. Comprehension Lồng Nhau:\n- Làm phẳng ma trận 2D: `[val for row in matrix for val in row]` (đọc từ trái sang phải tương ứng thứ tự vòng lặp for).\n- Tích Descartes: `[(x, y) for x in xs for y in ys]`'
    },
    syntax: `# List comprehension with filter
evens_squared = [x**2 for x in range(10) if x % 2 == 0]

# Dict comprehension: Invert lookup table
user_lookup = {101: "Alice", 102: "Bob", 103: "Charlie"}
name_to_id = {name: uid for uid, name in user_lookup.items()}

# Set comprehension: Extract unique domains
emails = ["a@google.com", "b@meta.com", "c@google.com"]
domains = {email.split("@")[1] for email in emails}

# 2D matrix flattening
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [x for row in matrix for x in row]`,
    examples: [
      {
        title: {
          en: 'ETL Analytics Transformation Pipeline',
          vi: 'Quy Trình Biến Đổi Dữ Liệu ETL Bằng Comprehensions'
        },
        code: `raw_logs = [
    {"user": "alice", "status": "200", "bytes": 1024},
    {"user": "bob", "status": "500", "bytes": 0},
    {"user": "charlie", "status": "200", "bytes": 2048},
    {"user": "alice", "status": "404", "bytes": 128}
]

# Extract active successful users (Set comprehension)
successful_users = {log["user"] for log in raw_logs if log["status"] == "200"}

# High-bandwidth bandwidth lookup (Dict comprehension)
bandwidth_map = {
    log["user"]: log["bytes"]
    for log in raw_logs
    if log["bytes"] > 500
}

print("Active Users:", successful_users)
print("Bandwidth Map:", bandwidth_map)`,
        language: 'python',
        explanation: {
          en: 'Demonstrates real-world usage of Set and Dict comprehensions for deduplication and filtered key-value mappings.',
          vi: 'Minh họa ứng dụng thực tế của Set và Dict comprehension để loại bỏ dữ liệu trùng lặp và ánh xạ key-value theo điều kiện.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using square brackets when constructing a dictionary: `[k: v for k, v in items]` (SyntaxError).',
          vi: 'Dùng dấu ngoặc vuông khi tạo dictionary: `[k: v for k, v in items]` (gây lỗi SyntaxError).'
        },
        correction: {
          en: 'Always use curly braces with a colon `{k: v for k, v in items}` for dictionary comprehensions.',
          vi: 'Luôn dùng dấu ngoặc nhọn có dấu hai chấm `{k: v for k, v in items}` cho dict comprehension.'
        },
        code: `# Incorrect: d = [k: v for k, v in pairs]\n# Correct:\nd = {k: v for k, v in pairs}`
      },
      {
        mistake: {
          en: 'Overcomplicating comprehensions with deeply nested loops (>2 levels) or side-effects, harming readability.',
          vi: 'Lạm dụng comprehension với vòng lặp lồng nhau quá sâu (>2 tầng) hoặc chứa tác vụ phụ gây khó đọc.'
        },
        correction: {
          en: 'If a comprehension spans multiple lines or complex branch logic, refactor it into a standard `for` loop with helper functions.',
          vi: 'Nếu comprehension quá dài hoặc logic rẽ nhánh phức tạp, hãy tách thành vòng lặp `for` thông thường kèm hàm phụ trợ.'
        }
      }
    ],
    tips: [
      {
        en: 'Comprehensions are optimized by CPython bytecode compiler and run faster than equivalent `.append()` loops.',
        vi: 'Comprehension được trình biên dịch bytecode của CPython tối ưu và chạy nhanh hơn so với vòng lặp `.append()` tương đương.'
      },
      {
        en: 'Use generator expressions `(expr for x in seq)` instead of list comprehensions when processing millions of items to avoid heavy RAM allocation.',
        vi: 'Dùng generator expression `(expr for x in seq)` thay vì list comprehension khi xử lý hàng triệu phần tử để tiết kiệm bộ nhớ RAM.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_26_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Square Even Numbers with List Comprehension',
        vi: 'Bài tập 1: Bình Phương Số Chẵn Bằng List Comprehension'
      },
      instruction: {
        en: 'Write `square_even_numbers(numbers: list[int]) -> list[int]` using a single list comprehension that squares all even integers in `numbers`.',
        vi: 'Viết hàm `square_even_numbers(numbers: list[int]) -> list[int]` dùng duy nhất một list comprehension để bình phương các số chẵn trong `numbers`.'
      },
      starterCode: `def square_even_numbers(numbers: list[int]) -> list[int]:
    # TODO: Single-line list comprehension
    pass`,
      solutionCode: `def square_even_numbers(numbers: list[int]) -> list[int]:
    return [n**2 for n in numbers if n % 2 == 0]`,
      hint: {
        en: 'Use [n**2 for n in numbers if n % 2 == 0].',
        vi: 'Dùng [n**2 for n in numbers if n % 2 == 0].'
      },
      explanation: {
        en: 'List comprehension filters with `if n % 2 == 0` and squares each matching integer.',
        vi: 'List comprehension lọc phần tử với `if n % 2 == 0` và bình phương từng số chẵn tìm thấy.'
      }
    },
    {
      id: 'py_26_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Inventory Threshold Dict Comprehension',
        vi: 'Bài tập 2: Lọc Tồn Kho Bằng Dict Comprehension'
      },
      instruction: {
        en: 'Write `filter_low_stock(inventory: dict[str, int], threshold: int) -> dict[str, int]` using a dict comprehension that extracts only items with quantity strictly less than `threshold`.',
        vi: 'Viết hàm `filter_low_stock(inventory: dict[str, int], threshold: int) -> dict[str, int]` dùng dict comprehension lọc ra các sản phẩm có số lượng nhỏ hơn `threshold`.'
      },
      starterCode: `def filter_low_stock(inventory: dict[str, int], threshold: int) -> dict[str, int]:
    # TODO: Dict comprehension filtering low stock items
    pass`,
      solutionCode: `def filter_low_stock(inventory: dict[str, int], threshold: int) -> dict[str, int]:
    return {k: v for k, v in inventory.items() if v < threshold}`,
      hint: {
        en: 'Use {k: v for k, v in inventory.items() if v < threshold}.',
        vi: 'Dùng {k: v for k, v in inventory.items() if v < threshold}.'
      },
      explanation: {
        en: 'Dict comprehension iterates over `inventory.items()` and filters based on quantity value.',
        vi: 'Dict comprehension duyệt qua `inventory.items()` và lọc dựa theo giá trị số lượng.'
      }
    }
  ],
  challenge: {
    id: 'py_26_challenge',
    title: {
      en: 'Challenge: 2D Sparse Matrix Coordinate Inversion',
      vi: 'Thử thách: Đảo Ma Trận Thưa Bằng Comprehension Lồng Nhau'
    },
    description: {
      en: 'Write `flatten_nonzero_coordinates(matrix: list[list[int]]) -> list[tuple[int, int, int]]` using nested list comprehension that returns a list of tuples `(row_idx, col_idx, value)` for every cell where `value != 0`.',
      vi: 'Viết hàm `flatten_nonzero_coordinates(matrix: list[list[int]]) -> list[tuple[int, int, int]]` dùng comprehension lồng nhau trả về danh sách các tuple `(row_idx, col_idx, value)` cho tất cả các ô có `value != 0`.'
    },
    requirements: [
      {
        en: 'Use nested list comprehension with enumerate',
        vi: 'Sử dụng list comprehension lồng nhau kết hợp với enumerate'
      },
      {
        en: 'Filter out zero values',
        vi: 'Lọc bỏ tất cả các giá trị bằng 0'
      },
      {
        en: 'Return list of (row_idx, col_idx, value) tuples',
        vi: 'Trả về danh sách các tuple dạng (row_idx, col_idx, value)'
      }
    ],
    starterCode: `def flatten_nonzero_coordinates(matrix: list[list[int]]) -> list[tuple[int, int, int]]:
    # TODO: Extract (r, c, val) tuples using nested comprehension
    pass`,
    solutionCode: `def flatten_nonzero_coordinates(matrix: list[list[int]]) -> list[tuple[int, int, int]]:
    return [
        (r, c, val)
        for r, row in enumerate(matrix)
        for c, val in enumerate(row)
        if val != 0
    ]`,
    hints: [
      {
        en: 'Use [(r, c, val) for r, row in enumerate(matrix) for c, val in enumerate(row) if val != 0].',
        vi: 'Dùng [(r, c, val) for r, row in enumerate(matrix) for c, val in enumerate(row) if val != 0].'
      }
    ],
    solutionExplanation: {
      en: 'Nested list comprehension with dual enumerate extracts 2D row/col indices and values in a single expression.',
      vi: 'List comprehension lồng nhau kết hợp 2 cấp enumerate giúp lấy đồng thời chỉ mục hàng/cột và giá trị trong 1 biểu thức duy nhất.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_26_q1',
      type: 'single_choice',
      question: {
        en: 'What is the primary performance advantage of a list comprehension over an equivalent manual `for` loop with `list.append()`?',
        vi: 'Ưu thế hiệu năng chính của list comprehension so với vòng lặp `for` thủ công dùng `list.append()` là gì?'
      },
      options: [
        { en: 'Comprehensions execute their bytecode loop directly in C without repeated Python attribute lookups on `.append`', vi: 'Comprehension chạy vòng lặp bytecode trực tiếp ở tầng C mà không tốn chi phí tra cứu thuộc tính `.append` liên tục' },
        { en: 'Comprehensions use multi-threading automatically', vi: 'Comprehension tự động dùng đa luồng' },
        { en: 'Comprehensions bypass memory allocation entirely', vi: 'Comprehension bỏ qua cấp phát bộ nhớ' },
        { en: 'Comprehensions compile to WebAssembly', vi: 'Comprehension biên dịch sang WebAssembly' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CPython optimizes comprehensions at the bytecode level using dedicated `LIST_APPEND` instructions in C, avoiding function call overhead.',
        vi: 'CPython tối ưu comprehension ở cấp độ bytecode bằng lệnh `LIST_APPEND` trong C, loại bỏ chi phí gọi hàm Python lặp đi lặp lại.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'easy'
    },
    {
      id: 'py_26_q2',
      type: 'single_choice',
      question: {
        en: 'Where does an `if-else` ternary value transformation belong in a comprehension?',
        vi: 'Biểu thức chuyển đổi giá trị 3 ngôi `if-else` nằm ở vị trí nào trong một comprehension?'
      },
      options: [
        { en: 'Before the `for` keyword: `[x if cond else y for x in seq]`', vi: 'Trước từ khóa `for`: `[x if cond else y for x in seq]`' },
        { en: 'After the iterable: `[x for x in seq if cond else y]`', vi: 'Sau tập hợp lặp: `[x for x in seq if cond else y]`' },
        { en: 'Inside parentheses: `[(if cond: x else: y) for x in seq]`', vi: 'Trong ngoặc đơn: `[(if cond: x else: y) for x in seq]`' },
        { en: 'Ternary operators cannot be used in comprehensions', vi: 'Không thể dùng toán tử 3 ngôi trong comprehension' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Value transformation expressions precede the `for` clause; trailing `if` clauses are reserved exclusively for filtering.',
        vi: 'Biểu thức biến đổi giá trị đứng trước mệnh đề `for`; mệnh đề `if` ở cuối chỉ dùng riêng cho việc lọc phần tử.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'easy'
    },
    {
      id: 'py_26_q3',
      type: 'single_choice',
      question: {
        en: 'What type of collection does `{x.lower() for x in ["A", "B", "A"]}` construct?',
        vi: 'Lệnh `{x.lower() for x in ["A", "B", "A"]}` tạo ra tập hợp kiểu gì?'
      },
      options: [
        { en: 'A set: `{"a", "b"}`', vi: 'Một set: `{"a", "b"}`' },
        { en: 'A dictionary: `{"a": "b"}`', vi: 'Một dictionary: `{"a": "b"}`' },
        { en: 'A list: `["a", "b", "a"]`', vi: 'Một list: `["a", "b", "a"]`' },
        { en: 'A tuple: `("a", "b")`', vi: 'Một tuple: `("a", "b")`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Curly braces without colons `{expr for x in seq}` build an auto-deduplicating `set`.',
        vi: 'Dấu ngoặc nhọn không có dấu hai chấm `{expr for x in seq}` tạo ra một `set` tự động khử trùng lặp.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'easy'
    },
    {
      id: 'py_26_q4',
      type: 'single_choice',
      question: {
        en: 'How do you invert a dictionary `d = {"a": 1, "b": 2}` using a dict comprehension?',
        vi: 'Làm thế nào để đảo ngược dictionary `d = {"a": 1, "b": 2}` bằng dict comprehension?'
      },
      options: [
        { en: '{v: k for k, v in d.items()}', vi: '{v: k for k, v in d.items()}' },
        { en: '{k: v for v, k in d.items()}', vi: '{k: v for v, k in d.items()}' },
        { en: '[v: k for k, v in d]', vi: '[v: k for k, v in d]' },
        { en: 'd.reverse()', vi: 'd.reverse()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`{v: k for k, v in d.items()}` maps the original value `v` to the original key `k`.',
        vi: '`{v: k for k, v in d.items()}` ánh xạ giá trị ban đầu `v` thành khóa và khóa ban đầu `k` thành giá trị.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'easy'
    },
    {
      id: 'py_26_q5',
      type: 'single_choice',
      question: {
        en: 'In what order are nested `for` clauses evaluated in `[x for row in matrix for x in row]`?',
        vi: 'Các mệnh đề `for` lồng nhau trong `[x for row in matrix for x in row]` được đánh giá theo thứ tự nào?'
      },
      options: [
        { en: 'From left to right (outer loop first `for row in matrix`, then inner loop `for x in row`)', vi: 'Từ trái sang phải (vòng lặp ngoài trước `for row in matrix`, sau đó đến vòng lặp trong `for x in row`)' },
        { en: 'From right to left (inner loop first)', vi: 'Từ phải sang trái (vòng lặp trong trước)' },
        { en: 'Simultaneously in parallel', vi: 'Đồng thời song song' },
        { en: 'Alphabetically', vi: 'Theo bảng chữ cái' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Nested comprehensions are read from left to right, identical to the nesting indentation of standard for loops.',
        vi: 'Comprehension lồng nhau được đọc từ trái sang phải, giống hệt thứ tự thụt đầu dòng của các vòng lặp for thông thường.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'medium'
    },
    {
      id: 'py_26_q6',
      type: 'single_choice',
      question: {
        en: 'Do variables declared inside a list comprehension leak into the surrounding scope in Python 3?',
        vi: 'Các biến lặp khai báo trong list comprehension có bị rò rỉ ra phạm vi xung quanh trong Python 3 không?'
      },
      options: [
        { en: 'No, comprehensions have their own local function-like scope', vi: 'Không, comprehension có phạm vi cục bộ riêng độc lập' },
        { en: 'Yes, the last loop variable value remains bound in module scope', vi: 'Có, giá trị cuối cùng của biến lặp vẫn tồn tại trong module' },
        { en: 'Only if declared global', vi: 'Chỉ khi khai báo global' },
        { en: 'Only in Python 2', vi: 'Chỉ trong Python 2' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In Python 3, comprehensions are executed in their own private nested scope, preventing variable leakage.',
        vi: 'Trong Python 3, comprehension chạy trong phạm vi riêng biệt của nó, không làm ảnh hưởng tới các biến cùng tên bên ngoài.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'medium'
    },
    {
      id: 'py_26_q7',
      type: 'single_choice',
      question: {
        en: 'What does `(x**2 for x in range(10))` (with parentheses) create instead of a list?',
        vi: 'Biểu thức `(x**2 for x in range(10))` (dùng ngoặc đơn) tạo ra đối tượng gì thay vì list?'
      },
      options: [
        { en: 'A generator expression (lazy iterator)', vi: 'Một biểu thức generator (iterator lười)' },
        { en: 'A tuple', vi: 'Một tuple' },
        { en: 'A frozen list', vi: 'Một danh sách đóng băng' },
        { en: 'SyntaxError', vi: 'Lỗi cú pháp SyntaxError' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Parenthesized comprehension syntax creates a lazy generator expression, not a tuple comprehension.',
        vi: 'Cú pháp comprehension trong ngoặc đơn tạo ra generator expression tính toán theo nhu cầu (lazy), không phải tuple.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'easy'
    },
    {
      id: 'py_26_q8',
      type: 'single_choice',
      question: {
        en: 'How can you flatten a 2D matrix `matrix = [[1, 2], [3, 4]]` into `[1, 2, 3, 4]` using list comprehension?',
        vi: 'Làm thế nào để làm phẳng ma trận `matrix = [[1, 2], [3, 4]]` thành `[1, 2, 3, 4]` bằng list comprehension?'
      },
      options: [
        { en: '[x for row in matrix for x in row]', vi: '[x for row in matrix for x in row]' },
        { en: '[x for x in row for row in matrix]', vi: '[x for x in row for row in matrix]' },
        { en: '[matrix[r][c] for r, c in matrix]', vi: '[matrix[r][c] for r, c in matrix]' },
        { en: 'matrix.flatten()', vi: 'matrix.flatten()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`[x for row in matrix for x in row]` loops through each row, then extracts each `x` from that row.',
        vi: '`[x for row in matrix for x in row]` lặp qua từng hàng, sau đó lấy từng phần tử `x` trong hàng đó.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'medium'
    },
    {
      id: 'py_26_q9',
      type: 'single_choice',
      question: {
        en: 'What is the output of `[x for x in [1, 2, 3, 4, 5] if x > 2 if x < 5]`?',
        vi: 'Kết quả của `[x for x in [1, 2, 3, 4, 5] if x > 2 if x < 5]` là gì?'
      },
      options: [
        { en: '[3, 4]', vi: '[3, 4]' },
        { en: '[2, 3, 4, 5]', vi: '[2, 3, 4, 5]' },
        { en: 'SyntaxError', vi: 'SyntaxError' },
        { en: '[]', vi: '[]' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Multiple `if` clauses in a comprehension act as a logical `AND` condition.',
        vi: 'Nhiều mệnh đề `if` liên tiếp trong comprehension tương đương với phép `AND` logic.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'easy'
    },
    {
      id: 'py_26_q10',
      type: 'single_choice',
      question: {
        en: 'When should a comprehension be avoided in favor of a standard `for` loop?',
        vi: 'Khi nào nên tránh dùng comprehension và thay bằng vòng lặp `for` truyền thống?'
      },
      options: [
        { en: 'When the logic involves complex side effects (file I/O, database writes, multiple try/except blocks) or exceeds readable line limits', vi: 'Khi logic chứa nhiều tác vụ phụ phức tạp (ghi file, ghi database, nhiều khối try/except) hoặc quá dài khó đọc' },
        { en: 'Comprehensions should never be avoided', vi: 'Không bao giờ nên tránh dùng comprehension' },
        { en: 'Whenever working with numbers', vi: 'Bất cứ khi nào làm việc với số' },
        { en: 'When running on Linux', vi: 'Khi chạy trên hệ điều hành Linux' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Comprehensions are meant for pure functional transformations; complex side effects violate PEP 20 readability.',
        vi: 'Comprehension chỉ nên dùng cho việc biến đổi dữ liệu thuần túy; các tác vụ phụ phức tạp làm code khó đọc vi phạm triết lý PEP 20.'
      },
      topicId: 'python_comprehensions_collections',
      difficulty: 'medium'
    }
  ]
};
export default lesson14;
