import { Lesson } from '../../../../types';

export const lesson13: Lesson = {
  id: 'py_lesson_13',
  moduleId: 'py_mod_5',
  levelId: 'basic',
  courseId: 'python',
  order: 13,
  topicId: 'python_dictionaries_sets_collections',
  title: {
    en: 'Dictionaries, Sets & Standard Collections (Counter, defaultdict, deque)',
    vi: 'Dictionary, Set & Các Cấu Trúc Collections (Counter, defaultdict, deque)'
  },
  summary: {
    en: 'Master hash-based collections in Python: dictionaries (.get, .setdefault, | merge operator), sets (unique elements, union |, intersection &, difference -), and standard high-performance collections (Counter, defaultdict, deque).',
    vi: 'Làm chủ các tập hợp dựa trên bảng băm: dictionary (.get, .setdefault, toán tử gộp |), set (phần tử duy nhất, phép hợp |, giao &, hiệu -) và các cấu trúc dữ liệu chuẩn hiệu năng cao (Counter, defaultdict, deque).'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Dictionaries (`dict`) and Sets (`set`) are high-performance data structures built on hash tables, providing average O(1) time complexity. The standard `collections` module provides specialized tools: `Counter` for frequency counting, `defaultdict` for missing key handling, and `deque` for O(1) double-ended queue operations.',
      vi: 'Dictionary (`dict`) và Set (`set`) là các cấu trúc dữ liệu hiệu năng cao hoạt động trên nền tảng bảng băm (hash table) với thời gian tra cứu O(1). Thư viện chuẩn `collections` bổ sung các công cụ chuyên dụng: `Counter` đếm tần suất, `defaultdict` tự khởi tạo khóa thiếu, và `deque` thao tác hàng đợi hai đầu O(1).'
    },
    conceptExplanation: {
      en: '1. Dictionaries (Key-Value Hash Mappings):\n- Keys must be immutable/hashable (strings, numbers, tuples).\n- `.get(key, default)`: Retrieves value safely without KeyError.\n- `.setdefault(key, default)`: Returns key value if present, else sets and returns default.\n- Modern Merge (`|` and `|=`, Python 3.9+): `merged = dict_a | dict_b`\n\n2. Sets (Unique Hash Collections):\n- Literal: `{1, 2, 3}` (Use `set()` for empty set).\n- Deduplication: `list(set(items))`\n- Set Operations: Union `|`, Intersection `&`, Difference `-`, Symmetric Difference `^`.\n\n3. Standard Collections Module:\n- `collections.Counter`: Frequency tracker with `.most_common(n)`.\n- `collections.defaultdict`: Calls factory function (e.g., `list`, `int`) for missing keys instead of raising KeyError.\n- `collections.deque`: Double-ended queue with O(1) `appendleft()`, `popleft()`, `append()`, and `pop()`.',
      vi: '1. Dictionaries (Ánh Xạ Khóa-Giá Trị):\n- Khóa bắt buộc phải là đối tượng bất biến/băm được (chuỗi, số, tuple).\n- `.get(key, default)`: Lấy giá trị an toàn mà không gây KeyError.\n- `.setdefault(key, default)`: Lấy giá trị nếu có, nếu chưa thì gán và trả về.\n- Toán tử gộp hiện đại (`|` và `|=`, Python 3.9+): `merged = dict_a | dict_b`\n\n2. Sets (Tập Hợp Phần Tử Duy Nhất):\n- Cú pháp: `{1, 2, 3}` (Dùng `set()` để tạo set rỗng).\n- Khử trùng lặp: `list(set(items))`\n- Phép toán: Hợp `|`, Giao `&`, Hiệu `-`, Hiệu đối xứng `^`.\n\n3. Thư Viện Collections Chuẩn:\n- `collections.Counter`: Đếm tần suất xuất hiện, hỗ trợ `.most_common(n)`.\n- `collections.defaultdict`: Tự động gọi hàm khởi tạo (vd: `list`, `int`) khi khóa chưa tồn tại.\n- `collections.deque`: Hàng đợi hai đầu với `appendleft()`, `popleft()` có tốc độ O(1).'
    },
    syntax: `from collections import Counter, defaultdict, deque

# Dictionary operations & modern merge
defaults = {"theme": "light", "timeout": 30}
user_prefs = {"theme": "dark", "lang": "vi"}
config = defaults | user_prefs  # Python 3.9+ dict union

# Set operations
admin_roles = {"admin", "editor"}
user_roles = {"editor", "viewer"}
shared = admin_roles & user_roles  # {"editor"}

# collections.Counter
words = ["apple", "banana", "apple", "orange", "apple", "banana"]
counts = Counter(words)
top_word, top_freq = counts.most_common(1)[0]  # ("apple", 3)

# collections.defaultdict
grouped = defaultdict(list)
grouped["fruits"].append("apple")

# collections.deque (O(1) queue)
queue = deque(["job1", "job2"])
queue.appendleft("urgent_job")
processed = queue.popleft()  # "urgent_job"`,
    examples: [
      {
        title: {
          en: 'Log Analysis with Counter and defaultdict',
          vi: 'Phân Tích Nhật Ký Truy Cập Bằng Counter & defaultdict'
        },
        code: `from collections import Counter, defaultdict

raw_logs = [
    {"ip": "192.168.1.1", "endpoint": "/api/login", "status": 200},
    {"ip": "192.168.1.2", "endpoint": "/api/users", "status": 404},
    {"ip": "192.168.1.1", "endpoint": "/api/login", "status": 200},
    {"ip": "192.168.1.3", "endpoint": "/api/orders", "status": 500},
    {"ip": "192.168.1.1", "endpoint": "/api/orders", "status": 200},
]

# Frequency analysis of endpoints
endpoint_counter = Counter(log["endpoint"] for log in raw_logs)
print("Top Endpoint:", endpoint_counter.most_common(1))

# Group status codes by IP
ip_status_map = defaultdict(list)
for log in raw_logs:
    ip_status_map[log["ip"]].append(log["status"])

print("IP Statuses:", dict(ip_status_map))`,
        language: 'python',
        explanation: {
          en: 'Demonstrates combining Counter for rapid frequency ranking and defaultdict(list) for grouping without checking key existence.',
          vi: 'Minh họa kết hợp Counter để xếp hạng tần suất nhanh chóng và defaultdict(list) để gom nhóm mà không cần kiểm tra key tồn tại.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using `{}` to create an empty set (creates an empty dictionary `{}` instead).',
          vi: 'Dùng `{}` để tạo set rỗng (thực tế lại tạo ra một dictionary rỗng `{}`).'
        },
        correction: {
          en: 'Always use `set()` to instantiate an empty set.',
          vi: 'Luôn dùng hàm `set()` để khởi tạo một set rỗng.'
        },
        code: `# Incorrect: s = {}\n# Correct:\ns = set()`
      },
      {
        mistake: {
          en: 'Using `list.pop(0)` for FIFO queues (runs in O(N) linear time due to memory shifting).',
          vi: 'Dùng `list.pop(0)` để làm hàng đợi FIFO (mất thời gian O(N) do phải dịch chuyển toàn bộ mảng trong bộ nhớ).'
        },
        correction: {
          en: 'Use `collections.deque.popleft()` which operates in O(1) constant time.',
          vi: 'Sử dụng `collections.deque.popleft()` hoạt động trong thời gian hằng số O(1).'
        },
        code: `from collections import deque\nq = deque([1, 2, 3])\nfirst = q.popleft()  # O(1)`
      }
    ],
    tips: [
      {
        en: 'Dictionary and set membership checking `x in s` runs in average O(1) time, compared to O(N) linear time for lists.',
        vi: 'Kiểm tra phần tử tồn tại `x in s` trên dict và set chạy trong thời gian trung bình O(1), vượt trội so với O(N) của list.'
      },
      {
        en: '`Counter` objects support arithmetic operators like `+` and `-` to combine or subtract counts directly.',
        vi: 'Đối tượng `Counter` hỗ trợ các phép toán `+` và `-` để cộng gộp hoặc trừ các bộ đếm tần suất trực tiếp.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_29_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Word Frequency Ranker with Counter',
        vi: 'Bài tập 1: Xếp Hạng Tần Suất Từ Bằng Counter'
      },
      instruction: {
        en: 'Write `top_frequent_words(words: list[str], top_n: int) -> list[tuple[str, int]]` that uses `collections.Counter` to return the `top_n` most frequent words.',
        vi: 'Viết hàm `top_frequent_words(words: list[str], top_n: int) -> list[tuple[str, int]]` sử dụng `collections.Counter` để trả về danh sách `top_n` từ xuất hiện nhiều nhất.'
      },
      starterCode: `from collections import Counter

def top_frequent_words(words: list[str], top_n: int) -> list[tuple[str, int]]:
    # TODO: Use Counter to get top_n most common words
    pass`,
      solutionCode: `from collections import Counter

def top_frequent_words(words: list[str], top_n: int) -> list[tuple[str, int]]:
    return Counter(words).most_common(top_n)`,
      hint: {
        en: 'Instantiate `Counter(words)` and invoke its `.most_common(top_n)` method.',
        vi: 'Khởi tạo `Counter(words)` và gọi phương thức `.most_common(top_n)`.'
      },
      explanation: {
        en: '`Counter.most_common(k)` efficiently extracts top elements in O(N log k) time.',
        vi: '`Counter.most_common(k)` trích xuất các phần tử nhiều nhất hiệu quả trong O(N log k).'
      }
    },
    {
      id: 'py_13_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Category Grouping with defaultdict',
        vi: 'Bài tập 2: Gom Nhóm Danh Mục Bằng defaultdict'
      },
      instruction: {
        en: 'Write `group_by_category(items: list[dict]) -> dict[str, list[str]]` where each item has `"name"` and `"category"`. Return a dictionary mapping each category to its list of item names.',
        vi: 'Viết hàm `group_by_category(items: list[dict]) -> dict[str, list[str]]` trong đó mỗi item có `"name"` và `"category"`. Trả về dictionary ánh xạ từng category tới danh sách tên các item.'
      },
      starterCode: `from collections import defaultdict

def group_by_category(items: list[dict]) -> dict[str, list[str]]:
    # TODO: Group item names by category using defaultdict
    pass`,
      solutionCode: `from collections import defaultdict

def group_by_category(items: list[dict]) -> dict[str, list[str]]:
    grouped = defaultdict(list)
    for item in items:
        grouped[item["category"]].append(item["name"])
    return dict(grouped)`,
      hint: {
        en: 'Initialize `grouped = defaultdict(list)` and append `item["name"]` into `grouped[item["category"]]`.',
        vi: 'Khởi tạo `grouped = defaultdict(list)` và append `item["name"]` vào `grouped[item["category"]]`.'
      },
      explanation: {
        en: '`defaultdict(list)` guarantees that accessing any unseen category automatically creates an empty list.',
        vi: '`defaultdict(list)` đảm bảo việc truy cập bất kỳ category mới nào cũng tự động tạo một list rỗng.'
      }
    }
  ],
  challenge: {
    id: 'py_13_challenge',
    title: {
      en: 'Real-Time Sliding Window Task Rate Limiter with deque',
      vi: 'Bộ Giới Hạn Tần Suất Cửa Sổ Trượt Bằng deque'
    },
    description: {
      en: 'Implement `is_rate_limited(timestamps: list[int], max_requests: int, window_seconds: int) -> bool` using a `collections.deque` queue to simulate incoming requests. When a new timestamp arrives, pop all timestamps older than `current_time - window_seconds`. If remaining count >= `max_requests`, return `True` (rate limited), otherwise record it and return `False`.',
      vi: 'Xây dựng hàm `is_rate_limited(timestamps: list[int], max_requests: int, window_seconds: int) -> bool` sử dụng `collections.deque` để mô phỏng kiểm tra rate limit theo cửa sổ trượt. Khi timestamp mới tới, loại bỏ các timestamp cũ hơn `current_time - window_seconds`. Nếu số lượng còn lại >= `max_requests`, trả về `True` (bị giới hạn), ngược lại ghi nhận và trả về `False`.'
    },
    requirements: [
      {
        en: 'Use collections.deque for O(1) popping expired timestamps from the left',
        vi: 'Dùng collections.deque để loại bỏ các timestamp hết hạn ở đầu hàng đợi trong O(1)'
      },
      {
        en: 'Evict timestamps older than or equal to current_ts - window_seconds',
        vi: 'Loại bỏ timestamp cũ hơn hoặc bằng current_ts - window_seconds'
      },
      {
        en: 'Return boolean array indicating rate limiting decision for each timestamp',
        vi: 'Trả về mảng boolean biểu thị quyết định rate limit cho từng timestamp'
      }
    ],
    hints: [
      {
        en: 'Use while queue and queue[0] <= ts - window_seconds: queue.popleft()',
        vi: 'Dùng while queue and queue[0] <= ts - window_seconds: queue.popleft()'
      }
    ],
    starterCode: `from collections import deque

def is_rate_limited(timestamps: list[int], max_requests: int, window_seconds: int) -> list[bool]:
    # TODO: Process each timestamp and return list of bools indicating if request was rejected
    pass`,
    solutionCode: `from collections import deque

def is_rate_limited(timestamps: list[int], max_requests: int, window_seconds: int) -> list[bool]:
    q = deque()
    results = []
    for ts in timestamps:
        # Evict timestamps outside current sliding window
        while q and q[0] <= ts - window_seconds:
            q.popleft()
        if len(q) >= max_requests:
            results.append(True)
        else:
            q.append(ts)
            results.append(False)
    return results`,
    solutionExplanation: {
      en: 'Sliding window rate limiters using deque achieve optimal O(N) linear time complexity.',
      vi: 'Thuật toán rate limiter cửa sổ trượt dùng deque đạt độ phức tạp tuyến tính O(N) tối ưu.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_13_q1',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'easy',
      question: {
        en: 'What is the average time complexity of key lookup in a Python dictionary?',
        vi: 'Độ phức tạp thời gian trung bình của phép tra cứu khóa trong Python dict là bao nhiêu?'
      },
      options: [
        { en: 'O(1)', vi: 'O(1)' },
        { en: 'O(log N)', vi: 'O(log N)' },
        { en: 'O(N)', vi: 'O(N)' },
        { en: 'O(N²)', vi: 'O(N²)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Dictionaries use hash tables to achieve average O(1) constant time lookups.',
        vi: 'Dictionary sử dụng bảng băm nên đạt tốc độ tra cứu trung bình là hằng số O(1).'
      }
    },
    {
      id: 'py_13_q2',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'easy',
      question: {
        en: 'How do you create an empty set in Python?',
        vi: 'Làm thế nào để tạo một set rỗng trong Python?'
      },
      options: [
        { en: '`s = {}`', vi: '`s = {}`' },
        { en: '`s = set()`', vi: '`s = set()`' },
        { en: '`s = []`', vi: '`s = []`' },
        { en: '`s = set([])` only', vi: 'Chỉ dùng được `s = set([])`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`{}` creates an empty dictionary. `set()` is required to create an empty set.',
        vi: '`{}` tạo ra một dictionary rỗng. Bắt buộc dùng `set()` để tạo set rỗng.'
      }
    },
    {
      id: 'py_13_q3',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'medium',
      question: {
        en: 'Which operator performs union on two dictionaries in Python 3.9+?',
        vi: 'Toán tử nào thực hiện phép gộp (union) hai dictionary trong Python 3.9+?'
      },
      options: [
        { en: '`+`', vi: '`+`' },
        { en: '`|`', vi: '`|`' },
        { en: '`&`', vi: '`&`' },
        { en: '`^`', vi: '`^`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'PEP 584 introduced `|` (dict union) and `|=` (in-place dict update) in Python 3.9.',
        vi: 'PEP 584 đã giới thiệu `|` (gộp dict) và `|=` (cập nhật dict tại chỗ) trong Python 3.9.'
      }
    },
    {
      id: 'py_13_q4',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'medium',
      question: {
        en: 'What happens when accessing a non-existent key in a `collections.defaultdict(list)`?',
        vi: 'Điều gì xảy ra khi truy cập một khóa chưa tồn tại trong `collections.defaultdict(list)`?'
      },
      options: [
        { en: 'Raises `KeyError`', vi: 'Ném ra lỗi `KeyError`' },
        { en: 'Automatically creates the key with an empty list `[]` and returns it', vi: 'Tự động tạo khóa với giá trị là một list rỗng `[]` và trả về' },
        { en: 'Returns `None` without mutating the dict', vi: 'Trả về `None` mà không thay đổi dict' },
        { en: 'Raises `AttributeError`', vi: 'Ném ra lỗi `AttributeError`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`defaultdict` invokes the default factory callable (`list`) to populate missing keys automatically.',
        vi: '`defaultdict` gọi hàm khởi tạo mặc định (`list`) để tự động gán giá trị cho khóa bị thiếu.'
      }
    },
    {
      id: 'py_13_q5',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'medium',
      question: {
        en: 'Why is `collections.deque` preferred over a standard `list` for FIFO queues?',
        vi: 'Tại sao `collections.deque` được ưu tiên hơn `list` thông thường khi làm hàng đợi FIFO?'
      },
      options: [
        { en: '`deque` uses less memory for integers', vi: '`deque` dùng ít bộ nhớ hơn cho số nguyên' },
        { en: '`deque.popleft()` and `appendleft()` run in O(1) time, while `list.pop(0)` runs in O(N) time', vi: '`deque.popleft()` và `appendleft()` chạy trong O(1), trong khi `list.pop(0)` mất O(N)' },
        { en: '`deque` is automatically sorted', vi: '`deque` tự động sắp xếp' },
        { en: '`deque` can only store strings', vi: '`deque` chỉ lưu được chuỗi' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`deque` is implemented as a doubly linked block list, enabling O(1) push and pop from both ends.',
        vi: '`deque` được cài đặt dưới dạng danh sách liên kết đôi, cho phép thêm và rút ở cả hai đầu trong thời gian O(1).'
      }
    },
    {
      id: 'py_13_q6',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'easy',
      question: {
        en: 'What does `Counter("abracadabra").most_common(2)` return?',
        vi: '`Counter("abracadabra").most_common(2)` trả về kết quả gì?'
      },
      options: [
        { en: '`[("a", 5), ("b", 2)]` or `[("a", 5), ("r", 2)]`', vi: '`[("a", 5), ("b", 2)]` hoặc `[("a", 5), ("r", 2)]`' },
        { en: '`{"a": 5, "b": 2}`', vi: '`{"a": 5, "b": 2}`' },
        { en: '`("a", "b")`', vi: '`("a", "b")`' },
        { en: '`5`', vi: '`5`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`most_common(n)` returns a list of the `n` most frequent element-count tuples.',
        vi: '`most_common(n)` trả về danh sách gồm `n` tuple (phần_tử, số_lần_xuất_hiện) nhiều nhất.'
      }
    },
    {
      id: 'py_13_q7',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'medium',
      question: {
        en: 'Which set operator computes the symmetric difference (elements in either set, but not both)?',
        vi: 'Toán tử tập hợp nào tính hiệu đối xứng (phần tử thuộc một trong hai tập hợp nhưng không thuộc cả hai)?'
      },
      options: [
        { en: '`&`', vi: '`&`' },
        { en: '`-`', vi: '`-`' },
        { en: '`^`', vi: '`^`' },
        { en: '`|`', vi: '`|`' }
      ],
      correctAnswers: [2],
      explanation: {
        en: 'The caret `^` operator calculates symmetric difference: `set_a ^ set_b`.',
        vi: 'Toán tử mũ `^` tính hiệu đối xứng giữa hai tập hợp: `set_a ^ set_b`.'
      }
    },
    {
      id: 'py_13_q8',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'medium',
      question: {
        en: 'Can a Python `list` be used as a dictionary key or set element?',
        vi: 'Một `list` trong Python có thể dùng làm khóa dictionary hoặc phần tử của set không?'
      },
      options: [
        { en: 'Yes, always', vi: 'Có, luôn luôn được' },
        { en: 'No, because lists are mutable and unhashable, raising `TypeError`', vi: 'Không, vì list có thể thay đổi và không băm được, gây lỗi `TypeError`' },
        { en: 'Only if the list is empty', vi: 'Chỉ khi list rỗng' },
        { en: 'Only if elements are strings', vi: 'Chỉ khi các phần tử là chuỗi' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Dictionary keys and set elements must implement `__hash__` and be immutable. Tuples should be used instead of lists.',
        vi: 'Khóa dictionary và phần tử set bắt buộc phải băm được (hashable) và bất biến. Hãy dùng tuple thay cho list.'
      }
    },
    {
      id: 'py_13_q9',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'medium',
      question: {
        en: 'What does `d.setdefault("timeout", 30)` do if `"timeout"` already exists in `d` with value `60`?',
        vi: '`d.setdefault("timeout", 30)` làm gì nếu `"timeout"` đã tồn tại trong `d` với giá trị `60`?'
      },
      options: [
        { en: 'Overwrites `"timeout"` with `30`', vi: 'Ghi đè `"timeout"` thành `30`' },
        { en: 'Leaves `"timeout"` as `60` and returns `60`', vi: 'Giữ nguyên `"timeout"` là `60` và trả về `60`' },
        { en: 'Raises `KeyError`', vi: 'Ném ra lỗi `KeyError`' },
        { en: 'Deletes `"timeout"`', vi: 'Xóa `"timeout"`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`setdefault` returns the existing value if the key is present without altering it.',
        vi: '`setdefault` trả về giá trị hiện tại nếu khóa đã tồn tại mà không làm thay đổi giá trị đó.'
      }
    },
    {
      id: 'py_13_q10',
      type: 'single_choice',
      topicId: 'python_collections',
      difficulty: 'easy',
      question: {
        en: 'How can you convert a list with duplicate elements into a deduplicated list while preserving fast execution?',
        vi: 'Làm thế nào để khử trùng lặp một danh sách nhanh nhất trong Python?'
      },
      options: [
        { en: '`list(set(raw_list))`', vi: '`list(set(raw_list))`' },
        { en: 'Loop and check `if item in new_list`', vi: 'Dùng vòng lặp và kiểm tra `if item in new_list`' },
        { en: '`raw_list.deduplicate()`', vi: '`raw_list.deduplicate()`' },
        { en: '`sorted(raw_list)`', vi: '`sorted(raw_list)`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Converting to a `set` deduplicates elements in O(N) time; converting back to `list` gives unique elements.',
        vi: 'Chuyển sang `set` sẽ khử trùng lặp trong thời gian O(N); sau đó chuyển lại thành `list`.'
      }
    }
  ]
};
