import { Lesson } from '../../../../types';

export const lesson12: Lesson = {
  id: 'py_lesson_12',
  moduleId: 'py_mod_5',
  levelId: 'basic',
  courseId: 'python',
  order: 12,
  topicId: 'python_lists_tuples_sequences',
  title: {
    en: 'Lists & Tuples: Indexing, Mutability, Slicing & Packing',
    vi: 'Danh Sách & Tuple: Chỉ Mục, Tính Đột Biến, Cắt Lát & Đóng/Mở Gói'
  },
  summary: {
    en: 'Master dynamic ordered lists (mutable) and fixed tuples (immutable), in-place operations (.append, .extend, .pop, .sort), slicing, tuple packing, extended unpacking (*rest), and shallow vs deep copies.',
    vi: 'Làm chủ list (có thể thay đổi) và tuple (bất biến), các phương thức in-place (.append, .extend, .pop, .sort), cắt lát, đóng gói tuple, mở gói mở rộng (*rest) và sao chép shallow/deep copy.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Lists (`list`) and Tuples (`tuple`) are Python\'s core ordered sequence types. Lists are mutable dynamic arrays designed for homogeneous collections of changing items, while Tuples are lightweight, immutable sequences ideal for fixed records and dictionary keys.',
      vi: 'List và Tuple là hai kiểu dữ liệu tuần tự có thứ tự cốt lõi của Python. List là mảng động có thể thay đổi (mutable), trong khi Tuple là chuỗi bất biến (immutable) siêu nhẹ, an toàn và có thể dùng làm khóa dictionary.'
    },
    conceptExplanation: {
      en: '1. Lists (Mutable Sequences):\n- Methods: `.append(x)` (add to end), `.extend(iterable)` (concatenate items), `.insert(idx, x)`, `.pop([idx])` (remove & return), `.remove(x)` (remove first match), `.sort()` (in-place sort), `.reverse()`.\n- Copying: `b = a.copy()` creates a shallow copy. Nested objects require `copy.deepcopy(a)`.\n\n2. Tuples (Immutable Sequences):\n- Defined with parentheses or trailing comma: `t = (1, 2, 3)` or `single = (42,)`.\n- Hashable (if all elements are hashable), allowing usage as dictionary keys and set elements.\n\n3. Packing & Extended Unpacking:\n- Tuple packing: `coordinates = 10, 20, 30`\n- Unpacking: `x, y, z = coordinates`\n- Extended Star Unpacking: `head, *middle, tail = [1, 2, 3, 4, 5]` -> `head=1`, `middle=[2, 3, 4]`, `tail=5`.',
      vi: '1. List (Chuỗi có thể thay đổi - Mutable):\n- Phương thức: `.append(x)` (thêm vào cuối), `.extend(iterable)` (nối nhiều phần tử), `.insert(idx, x)`, `.pop([idx])` (xóa & lấy ra), `.remove(x)` (xóa phần tử đầu tiên khớp), `.sort()` (sắp xếp tại chỗ), `.reverse()`.\n- Sao chép: `b = a.copy()` tạo shallow copy. Với dữ liệu lồng nhau, cần dùng `copy.deepcopy(a)`.\n\n2. Tuple (Chuỗi bất biến - Immutable):\n- Khai báo bằng ngoặc đơn hoặc dấu phẩy: `t = (1, 2, 3)` hoặc `single = (42,)`.\n- Băm được (Hashable nếu các phần tử con hashable), cho phép làm khóa cho dictionary và set.\n\n3. Đóng Gói & Mở Gói Mở Rộng:\n- Đóng gói tuple: `coordinates = 10, 20, 30`\n- Mở gói: `x, y, z = coordinates`\n- Mở gói dấu sao mở rộng: `head, *middle, tail = [1, 2, 3, 4, 5]` -> `head=1`, `middle=[2, 3, 4]`, `tail=5`.'
    },
    syntax: `# List mutation vs sorted function
scores = [88, 42, 95, 71]
scores.append(100)
scores.sort(reverse=True)  # In-place mutation

# Tuple packing & extended unpacking
event_record = ("2026-03-31", "AUTH_LOGIN", "usr_99", "192.168.1.1", "SUCCESS")
date, event_type, *details, status = event_record

# 1-element tuple requirement
singleton = (42,)  # Notice the trailing comma!`,
    examples: [
      {
        title: {
          en: 'Audit Event Log Processing Pipeline',
          vi: 'Quy Trình Xử Lý Bản Ghi Nhật Ký Sự Kiện'
        },
        code: `def parse_log_entries(raw_events: list[str]) -> list[tuple[str, str, str]]:
    parsed = []
    for entry in raw_events:
        parts = entry.split("|")
        timestamp, level, *payload = parts
        message = ":".join(payload)
        parsed.append((timestamp.strip(), level.strip(), message.strip()))
    return parsed

logs = ["2026-03-31 10:00 | INFO | Server started", "2026-03-31 10:05 | ERROR | DB: Connection timed out"]
records = parse_log_entries(logs)
for r in records:
    print("Record:", r)`,
        language: 'python',
        explanation: {
          en: 'Demonstrates parsing variable-length string tokens using star unpacking and structuring them into immutable tuples.',
          vi: 'Minh họa cách phân tích cú pháp chuỗi độ dài biến đổi dùng star unpacking và tổ chức dữ liệu thành tuple bất biến.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Creating a single-element tuple without a trailing comma: `x = (42)` creates an `int`, not a `tuple`.',
          vi: 'Tạo tuple có 1 phần tử mà thiếu dấu phẩy: `x = (42)` tạo ra một số nguyên `int`, không phải `tuple`.'
        },
        correction: {
          en: 'Always include a trailing comma for single-element tuples: `x = (42,)`.',
          vi: 'Luôn thêm dấu phẩy ở cuối cho tuple có 1 phần tử: `x = (42,)`.'
        },
        code: `# Incorrect: t = (42)\n# Correct:\nt = (42,)`
      },
      {
        mistake: {
          en: 'Expecting `list.sort()` to return a sorted list instead of mutating in-place and returning `None`.',
          vi: 'Nghĩ rằng `list.sort()` trả về danh sách đã sắp xếp thay vì sắp xếp tại chỗ và trả về `None`.'
        },
        correction: {
          en: 'Use `sorted(my_list)` if you need a new list, or call `my_list.sort()` as a standalone statement.',
          vi: 'Dùng `sorted(my_list)` nếu cần danh sách mới, hoặc gọi `my_list.sort()` trên một dòng riêng biệt.'
        },
        code: `# Incorrect: sorted_list = my_list.sort() # None!\n# Correct:\nsorted_list = sorted(my_list)`
      }
    ],
    tips: [
      {
        en: 'Use tuples for heterogeneous structured data (like database rows) and lists for homogeneous collections of items.',
        vi: 'Dùng tuple cho các bản ghi có cấu trúc nhiều kiểu dữ liệu khác nhau (như một dòng trong database) và dùng list cho tập hợp các phần tử cùng loại.'
      },
      {
        en: 'Use list popping from the end `my_list.pop()` for O(1) time complexity; popping from index 0 `my_list.pop(0)` is O(N) because elements must shift.',
        vi: 'Lấy phần tử ở cuối bằng `my_list.pop()` tốn thời gian O(1); lấy ở đầu `my_list.pop(0)` tốn O(N) do phải dịch chuyển toàn bộ mảng.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_25_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Queue Operation Engine (.append & .pop)',
        vi: 'Bài tập 1: Động Cơ Hàng Đợi Queue (.append & .pop)'
      },
      instruction: {
        en: 'Write `process_fifo_queue(initial_queue: list[str], operations: list[tuple[str, str]]) -> tuple[list[str], list[str]]` that executes operations `("ENQUEUE", item)` (appends item) and `("DEQUEUE", "")` (pops from index 0). Return `(final_queue, processed_items)` where `processed_items` contains all dequeued values.',
        vi: 'Viết hàm `process_fifo_queue(initial_queue: list[str], operations: list[tuple[str, str]]) -> tuple[list[str], list[str]]` xử lý các lệnh `("ENQUEUE", item)` và `("DEQUEUE", "")` (lấy ra từ index 0). Trả về `(final_queue, processed_items)`.'
      },
      starterCode: `def process_fifo_queue(initial_queue: list[str], operations: list[tuple[str, str]]) -> tuple[list[str], list[str]]:
    # TODO: Process FIFO operations and return (final_queue, dequeued_list)
    pass`,
      solutionCode: `def process_fifo_queue(initial_queue: list[str], operations: list[tuple[str, str]]) -> tuple[list[str], list[str]]:
    queue = list(initial_queue)
    dequeued = []
    for op, item in operations:
        if op == "ENQUEUE":
            queue.append(item)
        elif op == "DEQUEUE" and queue:
            dequeued.append(queue.pop(0))
    return (queue, dequeued)`,
      hint: {
        en: 'Use queue.append(item) for ENQUEUE and queue.pop(0) for DEQUEUE.',
        vi: 'Dùng queue.append(item) cho ENQUEUE và queue.pop(0) cho DEQUEUE.'
      },
      explanation: {
        en: 'Appends new incoming items to the tail and removes dequeued items from the head of the list.',
        vi: 'Thêm phần tử mới vào cuối và xóa phần tử lấy ra từ đầu danh sách.'
      }
    },
    {
      id: 'py_25_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Star Unpacking Time Series Segmenter',
        vi: 'Bài tập 2: Phân Đoạn Chuỗi Thời Gian Bằng Star Unpacking'
      },
      instruction: {
        en: 'Write `segment_timeseries(datapoints: list[float]) -> dict` that uses extended unpacking `first, *middle, last = datapoints` (assuming at least 2 points). Return `{"baseline": first, "current": last, "intermediate_avg": round(sum(middle)/len(middle), 2) if middle else 0.0}`.',
        vi: 'Viết hàm `segment_timeseries(datapoints: list[float]) -> dict` dùng extended unpacking `first, *middle, last = datapoints`. Trả về `{"baseline": first, "current": last, "intermediate_avg": round(sum(middle)/len(middle), 2) if middle else 0.0}`.'
      },
      starterCode: `def segment_timeseries(datapoints: list[float]) -> dict:
    # TODO: Unpack series using star unpacking
    pass`,
      solutionCode: `def segment_timeseries(datapoints: list[float]) -> dict:
    first, *middle, last = datapoints
    avg_mid = round(sum(middle) / len(middle), 2) if middle else 0.0
    return {
        "baseline": first,
        "current": last,
        "intermediate_avg": avg_mid
    }`,
      hint: {
        en: 'Use first, *middle, last = datapoints.',
        vi: 'Dùng cú pháp first, *middle, last = datapoints.'
      },
      explanation: {
        en: 'Extended unpacking cleanly splits sequence boundaries from variable-length middle segments.',
        vi: 'Mở gói mở rộng phân tách rõ ràng hai đầu chuỗi với phần đoạn giữa có độ dài tùy biến.'
      }
    }
  ],
  challenge: {
    id: 'py_25_challenge',
    title: {
      en: 'Challenge: Multi-Column In-Place Record Sorter',
      vi: 'Thử thách: Sắp Xếp Bản Ghi Đa Tiêu Chí Tại Chỗ'
    },
    description: {
      en: 'Write `sort_student_records(records: list[tuple[str, int, float]]) -> list[tuple[str, int, float]]` where each tuple is `(name, grade_level, gpa)`. Sort the records in-place by `grade_level` ascending, and for students in the same grade, by `gpa` descending, and for students with the same GPA, by `name` alphabetically. Return the sorted list.',
      vi: 'Viết hàm `sort_student_records(records: list[tuple[str, int, float]]) -> list[tuple[str, int, float]]` với mỗi tuple là `(name, grade_level, gpa)`. Sắp xếp tại chỗ theo: `grade_level` tăng dần, nếu bằng nhau thì theo `gpa` giảm dần, nếu bằng nhau tiếp thì theo `name` bảng chữ cái.'
    },
    requirements: [
      {
        en: 'Sort records in-place using records.sort()',
        vi: 'Sắp xếp danh sách tại chỗ dùng records.sort()'
      },
      {
        en: 'Order primarily by grade_level ascending',
        vi: 'Ưu tiên sắp xếp theo grade_level tăng dần'
      },
      {
        en: 'Order secondarily by gpa descending, then by name alphabetically',
        vi: 'Thứ cấp theo gpa giảm dần, sau đó theo tên theo thứ tự bảng chữ cái'
      }
    ],
    starterCode: `def sort_student_records(records: list[tuple[str, int, float]]) -> list[tuple[str, int, float]]:
    # TODO: Sort records multi-criteria
    pass`,
    solutionCode: `def sort_student_records(records: list[tuple[str, int, float]]) -> list[tuple[str, int, float]]:
    records.sort(key=lambda rec: (rec[1], -rec[2], rec[0]))
    return records`,
    hints: [
      {
        en: 'Use records.sort(key=lambda rec: (rec[1], -rec[2], rec[0])).',
        vi: 'Dùng records.sort(key=lambda rec: (rec[1], -rec[2], rec[0])).'
      }
    ],
    solutionExplanation: {
      en: 'Tuples compare lexicographically element-by-element; negating numeric GPA yields descending sorting.',
      vi: 'Tuple so sánh tuần tự từng phần tử; đổi dấu số thực GPA tạo thứ tự sắp xếp giảm dần.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_25_q1',
      type: 'single_choice',
      question: {
        en: 'What is the key functional difference between a Python `list` and a `tuple`?',
        vi: 'Điểm khác biệt chức năng cốt lõi giữa `list` và `tuple` trong Python là gì?'
      },
      options: [
        { en: 'Lists are mutable (modifiable); tuples are immutable (read-only once created)', vi: 'List có thể thay đổi (mutable); tuple là bất biến (immutable sau khi tạo)' },
        { en: 'Lists only store numbers; tuples store any type', vi: 'List chỉ lưu số; tuple lưu mọi kiểu' },
        { en: 'Tuples cannot be indexed', vi: 'Tuple không thể truy cập theo chỉ mục' },
        { en: 'Lists are always stored on disk', vi: 'List luôn được lưu trên đĩa cứng' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Lists can be resized and mutated in place, whereas tuples cannot be altered after instantiation.',
        vi: 'List có thể thay đổi kích thước và giá trị tại chỗ, trong khi tuple cố định không thể sửa đổi sau khi tạo.'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'easy'
    },
    {
      id: 'py_25_q2',
      type: 'single_choice',
      question: {
        en: 'How do you define a single-element tuple containing the integer 42?',
        vi: 'Làm thế nào để khai báo một tuple có duy nhất 1 phần tử chứa số nguyên 42?'
      },
      options: [
        { en: '(42,)', vi: '(42,)' },
        { en: '(42)', vi: '(42)' },
        { en: 'tuple[42]', vi: 'tuple[42]' },
        { en: '{42}', vi: '{42}' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'A trailing comma `(42,)` is required; `(42)` is evaluated simply as a parenthesized integer 42.',
        vi: 'Bắt buộc phải có dấu phẩy ở cuối `(42,)`; `(42)` không có dấu phẩy chỉ là biểu thức số nguyên 42 trong ngoặc.'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'easy'
    },
    {
      id: 'py_25_q3',
      type: 'single_choice',
      question: {
        en: 'What does `my_list.extend([4, 5])` do compared to `my_list.append([4, 5])`?',
        vi: 'Lệnh `my_list.extend([4, 5])` khác gì so với `my_list.append([4, 5])`?'
      },
      options: [
        { en: '`extend` appends elements 4 and 5 individually; `append` adds the entire list `[4, 5]` as a single nested element', vi: '`extend` thêm từng phần tử 4 và 5 vào danh sách; `append` thêm cả list `[4, 5]` như một phần tử con duy nhất' },
        { en: '`extend` sorts the list; `append` does not', vi: '`extend` sắp xếp list; `append` thì không' },
        { en: '`extend` creates a new list; `append` mutates in place', vi: '`extend` tạo list mới; `append` sửa tại chỗ' },
        { en: 'They are completely identical', vi: 'Chúng hoàn toàn giống hệt nhau' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`extend` iterates through the given sequence adding each element, while `append` adds the argument object directly as one item.',
        vi: '`extend` duyệt qua tập hợp và thêm từng phần tử vào danh sách, còn `append` thêm trực tiếp cả đối tượng vào như 1 phần tử.'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'easy'
    },
    {
      id: 'py_25_q4',
      type: 'single_choice',
      question: {
        en: 'Given `head, *body, tail = [10, 20, 30, 40, 50]`, what are the values of `head`, `body`, and `tail`?',
        vi: 'Cho `head, *body, tail = [10, 20, 30, 40, 50]`, giá trị của `head`, `body` và `tail` là gì?'
      },
      options: [
        { en: 'head = 10, body = [20, 30, 40], tail = 50', vi: 'head = 10, body = [20, 30, 40], tail = 50' },
        { en: 'head = 10, body = (20, 30, 40), tail = 50', vi: 'head = 10, body = (20, 30, 40), tail = 50' },
        { en: 'head = [10, 20], body = 30, tail = [40, 50]', vi: 'head = [10, 20], body = 30, tail = [40, 50]' },
        { en: 'SyntaxError', vi: 'SyntaxError' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Extended unpacking assigns the first element to `head`, the last to `tail`, and collects intermediate elements into a list `body`.',
        vi: 'Mở gói mở rộng gán phần tử đầu cho `head`, cuối cho `tail`, và thu gom các phần tử ở giữa vào list `body`.'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'easy'
    },
    {
      id: 'py_25_q5',
      type: 'single_choice',
      question: {
        en: 'Why can a `tuple` containing integers be used as a dictionary key, but a `list` cannot?',
        vi: 'Tại sao một `tuple` chứa số nguyên có thể làm khóa dictionary, trong khi một `list` thì không?'
      },
      options: [
        { en: 'Tuples are immutable and hashable; lists are mutable and unhashable', vi: 'Tuple là bất biến và băm được (hashable); list có thể thay đổi và không băm được' },
        { en: 'Lists take up too much memory', vi: 'List tốn quá nhiều bộ nhớ' },
        { en: 'Tuples are written in C while lists are in Python', vi: 'Tuple viết bằng C còn list viết bằng Python' },
        { en: 'Dictionary keys can only be strings', vi: 'Khóa dictionary chỉ có thể là chuỗi' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Dictionary keys must have a stable hash value throughout their lifecycle. Mutable lists cannot provide a fixed hash.',
        vi: 'Khóa của dictionary bắt buộc phải có mã băm cố định suốt vòng đời. List có thể thay đổi nên không thể sinh mã băm ổn định.'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'medium'
    },
    {
      id: 'py_25_q6',
      type: 'single_choice',
      question: {
        en: 'What does `my_list.pop()` do when called with no arguments?',
        vi: 'Lệnh `my_list.pop()` làm gì khi không truyền đối số?'
      },
      options: [
        { en: 'Removes and returns the very last item in the list', vi: 'Xóa và trả về phần tử cuối cùng trong danh sách' },
        { en: 'Removes the first item at index 0', vi: 'Xóa phần tử đầu tiên ở index 0' },
        { en: 'Clears the entire list', vi: 'Xóa sạch toàn bộ danh sách' },
        { en: 'Deletes the variable from memory', vi: 'Xóa biến khỏi bộ nhớ' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'By default, `.pop()` removes and returns the last element (index -1) in O(1) time.',
        vi: 'Mặc định, `.pop()` xóa và trả về phần tử cuối cùng (index -1) với độ phức tạp thời gian O(1).'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'easy'
    },
    {
      id: 'py_25_q7',
      type: 'single_choice',
      question: {
        en: 'What is the difference between `list.sort()` and `sorted(list)`?',
        vi: 'Điểm khác nhau giữa `list.sort()` và `sorted(list)` là gì?'
      },
      options: [
        { en: '`list.sort()` sorts the list in place and returns `None`; `sorted()` returns a new sorted list leaving the original unchanged', vi: '`list.sort()` sắp xếp tại chỗ và trả về `None`; `sorted()` trả về một danh sách mới được sắp xếp và giữ nguyên danh sách gốc' },
        { en: '`sorted()` only works on numbers', vi: '`sorted()` chỉ hoạt động trên số' },
        { en: '`list.sort()` is deprecated in Python 3', vi: '`list.sort()` đã bị loại bỏ trong Python 3' },
        { en: 'There is no difference', vi: 'Không có sự khác nhau' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`list.sort()` is an in-place mutating method returning None, while built-in `sorted()` creates and returns a brand new list.',
        vi: '`list.sort()` là phương thức thay đổi danh sách tại chỗ trả về None, trong khi hàm `sorted()` tạo và trả về một danh sách hoàn toàn mới.'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'easy'
    },
    {
      id: 'py_25_q8',
      type: 'single_choice',
      question: {
        en: 'How do you create an independent deep copy of a nested list `nested = [[1, 2], [3, 4]]`?',
        vi: 'Làm thế nào để tạo bản sao sâu độc lập (deep copy) của danh sách lồng `nested = [[1, 2], [3, 4]]`?'
      },
      options: [
        { en: 'import copy; copy.deepcopy(nested)', vi: 'import copy; copy.deepcopy(nested)' },
        { en: 'nested.copy()', vi: 'nested.copy()' },
        { en: 'nested[:]', vi: 'nested[:]' },
        { en: 'list(nested)', vi: 'list(nested)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Shallow copies (`.copy()`, `[:]`) copy only the outer list, leaving inner lists shared. `copy.deepcopy()` recursively copies all nested levels.',
        vi: 'Shallow copy (`.copy()`, `[:]`) chỉ sao chép danh sách ngoài, các danh sách con bên trong vẫn bị dùng chung. Cần `copy.deepcopy()` để sao chép đệ quy mọi tầng.'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'medium'
    },
    {
      id: 'py_25_q9',
      type: 'single_choice',
      question: {
        en: 'What is the time complexity of looking up an element `item in my_list` vs `item in my_set`?',
        vi: 'Độ phức tạp thời gian khi tìm phần tử `item in my_list` so với `item in my_set` là gì?'
      },
      options: [
        { en: 'O(N) for list (linear search) vs O(1) average for set (hash table lookup)', vi: 'O(N) cho list (tìm kiếm tuyến tính) vs O(1) trung bình cho set (tra cứu bảng băm)' },
        { en: 'O(1) for list vs O(N) for set', vi: 'O(1) cho list vs O(N) cho set' },
        { en: 'O(log N) for both', vi: 'O(log N) cho cả hai' },
        { en: 'O(N^2) for list', vi: 'O(N^2) cho list' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Checking membership in a list requires scanning elements sequentially O(N), while sets use hash tables for O(1) lookups.',
        vi: 'Kiểm tra phần tử trong list phải duyệt tuần tự tốn O(N), trong khi set dùng bảng băm cho thời gian tra cứu O(1).'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'medium'
    },
    {
      id: 'py_25_q10',
      type: 'single_choice',
      question: {
        en: 'What happens when executing `t = (1, 2, [3, 4]); t[2].append(5)`?',
        vi: 'Điều gì xảy ra khi chạy lệnh `t = (1, 2, [3, 4]); t[2].append(5)`?'
      },
      options: [
        { en: 'It successfully appends 5 to the inner list because the list inside the tuple remains mutable', vi: 'Thêm thành công 5 vào danh sách con vì list nằm trong tuple vẫn có thể thay đổi' },
        { en: 'TypeError because tuples cannot be modified', vi: 'TypeError vì tuple là bất biến không thể sửa đổi' },
        { en: 'The tuple converts into a list', vi: 'Tuple tự chuyển thành list' },
        { en: 'SyntaxError', vi: 'SyntaxError' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'The tuple\'s references are immutable, but the mutable list object held at index 2 can still be mutated in place.',
        vi: 'Các tham chiếu của tuple là bất biến, nhưng đối tượng list có thể thay đổi nằm ở vị trí index 2 vẫn cho phép chỉnh sửa nội dung.'
      },
      topicId: 'python_lists_tuples_sequences',
      difficulty: 'medium'
    }
  ]
};
export default lesson12;
