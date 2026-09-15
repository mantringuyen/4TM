import { Lesson } from '../../../../types';

export const lesson08: Lesson = {
  id: 'py_lesson_8',
  moduleId: 'py_mod_3',
  levelId: 'basic',
  courseId: 'python',
  order: 8,
  topicId: 'python_for_loops_iteration',
  title: {
    en: 'Loops (for, while, range) & Loop Control (break, continue, else)',
    vi: 'Vòng Lặp (for, while, range) & Điều Khiển Vòng Lặp (break, continue, else)'
  },
  summary: {
    en: 'Master iteration over collections and sequences using for loops, while loops, loop controls (break, continue, else), range(start, stop, step), enumerate(start), zip(*iterables), reversed(), and dictionary unpackings.',
    vi: 'Làm chủ cơ chế lặp qua tập hợp bằng vòng lặp for, while, điều khiển vòng lặp (break, continue, else), range(start, stop, step), enumerate(), zip(), reversed() và duyệt dictionary.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'In Python, a `for` loop is a high-level iterator that steps through elements of any iterable object. Combined with `while` loops and control keywords (`break`, `continue`, `else`), it provides complete algorithmic iteration power.',
      vi: 'Trong Python, vòng lặp `for` là cơ chế duyệt phần tử cấp cao qua bất kỳ đối tượng iterable nào. Kết hợp với vòng lặp `while` và các từ khóa điều khiển (`break`, `continue`, `else`), nó mang lại sức mạnh điều khiển luồng lặp toàn diện.'
    },
    conceptExplanation: {
      en: '1. `range([start], stop, [step])` Function:\n- Generates an immutable, memory-efficient arithmetic progression sequence on demand.\n- `range(5)`: 0, 1, 2, 3, 4\n- `range(2, 10, 2)`: 2, 4, 6, 8\n- `range(10, 0, -2)`: 10, 8, 6, 4, 2\n\n2. Essential Loop Helpers:\n- `enumerate(iterable, start=0)`: Yields pairs of `(index, item)`, replacing manual counter variables.\n- `zip(*iterables)`: Aggregates elements from multiple iterables in lockstep into tuples until the shortest iterable terminates.\n- `reversed(seq)`: Iterates backward over a sequence without creating a reversed copy in memory.\n\n3. Loop Control Statements:\n- `break`: Terminate the loop immediately.\n- `continue`: Skip the rest of current iteration and jump to next.\n- `else`: Executes ONLY when the loop completes naturally without hitting a `break`.',
      vi: '1. Hàm `range([start], stop, [step])`:\n- Tạo ra dãy cấp số cộng bất biến và cực kỳ tiết kiệm bộ nhớ theo nhu cầu.\n- `range(5)`: 0, 1, 2, 3, 4\n- `range(2, 10, 2)`: 2, 4, 6, 8\n- `range(10, 0, -2)`: 10, 8, 6, 4, 2\n\n2. Các hàm hỗ trợ vòng lặp cốt lõi:\n- `enumerate(iterable, start=0)`: Trả về cặp `(vị_trí, phần_tử)`, không cần tự quản lý biến đếm index.\n- `zip(*iterables)`: Ghép đôi các phần tử từ nhiều danh sách theo cặp tuple đồng thời cho đến khi danh sách ngắn nhất kết thúc.\n- `reversed(seq)`: Duyệt ngược một chuỗi/danh sách mà không tốn bộ nhớ tạo bản sao mới.\n\n3. Các lệnh điều khiển vòng lặp:\n- `break`: Thoát vòng lặp ngay lập tức.\n- `continue`: Bỏ qua phần còn lại của lần lặp hiện tại và nhảy sang lần tiếp theo.\n- `else`: Chỉ thực thi KHI vòng lặp kết thúc tự nhiên mà không bị ngắt bởi `break`.'
    },
    syntax: `# range with step
for i in range(0, 10, 3):
    print(i)  # 0, 3, 6, 9

# enumerate for index-tracking
fruits = ["apple", "banana", "cherry"]
for idx, fruit in enumerate(fruits, start=1):
    print(f"{idx}. {fruit}")

# zip parallel iteration
names = ["Alice", "Bob", "Charlie"]
scores = [92, 85, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Loop with else block
for target in [1, 2, 3]:
    if target == 99:
        break
else:
    print("Target 99 not found!")`,
    examples: [
      {
        title: {
          en: 'Leaderboard Aggregator with Zip and Enumerate',
          vi: 'Bảng Xếp Hạng Với Zip và Enumerate'
        },
        code: `def build_leaderboard(players: list[str], scores: list[int]) -> list[dict]:
    combined = sorted(zip(players, scores), key=lambda x: x[1], reverse=True)
    
    leaderboard = []
    for rank, (player, score) in enumerate(combined, start=1):
        leaderboard.append({
            "rank": rank,
            "player": player,
            "score": score,
            "badge": "Champion" if rank == 1 else "Contender"
        })
    return leaderboard

players = ["Elena", "Marcus", "Aria", "Ken"]
scores = [980, 1200, 1150, 890]
for entry in build_leaderboard(players, scores):
    print(f"#{entry['rank']} {entry['player']:<8} - {entry['score']} pts [{entry['badge']}]")`,
        language: 'python',
        explanation: {
          en: '`zip` binds names and scores together, while `enumerate` provides 1-based ranks during the final iteration.',
          vi: '`zip` kết hợp tên người chơi và điểm số, còn `enumerate` đánh số thứ tự thứ hạng từ 1.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Writing `for i in range(len(my_list)): val = my_list[i]` instead of `for val in my_list:`.',
          vi: 'Viết `for i in range(len(my_list)): val = my_list[i]` thay vì duyệt trực tiếp `for val in my_list:`. '
        },
        correction: {
          en: 'Iterate directly over the sequence. If you need the index, use `enumerate(my_list)`.',
          vi: 'Duyệt trực tiếp qua danh sách. Nếu cần cả chỉ mục, hãy dùng `enumerate(my_list)`.'
        },
        code: `# Un-Pythonic:\n# for i in range(len(items)):\n#     print(i, items[i])\n\n# Pythonic:\nfor i, item in enumerate(items):\n    print(i, item)`
      },
      {
        mistake: {
          en: 'Modifying a list while iterating over it with a for loop, skipping elements.',
          vi: 'Thêm/xóa phần tử trong list khi đang duyệt bằng vòng lặp for, gây lỗi nhảy cóc phần tử.'
        },
        correction: {
          en: 'Iterate over a shallow slice copy `items[:]` or use a list comprehension.',
          vi: 'Duyệt qua bản sao `items[:]` hoặc dùng list comprehension để lọc dữ liệu an toàn.'
        },
        code: `items = [1, 2, 3, 4]\n# Safe deletion:\nitems = [x for x in items if x % 2 == 0]`
      }
    ],
    tips: [
      {
        en: 'A `range` object takes O(1) memory regardless of size: `range(10**9)` uses the same memory as `range(10)`.',
        vi: 'Đối tượng `range` chỉ tốn bộ nhớ O(1): `range(10**9)` tốn dung lượng RAM bằng với `range(10)`.'
      },
      {
        en: 'Use `itertools.zip_longest` when you want `zip` to continue until the longest iterable is exhausted, padding missing values with None.',
        vi: 'Dùng `itertools.zip_longest` khi muốn `zip` chạy đến hết danh sách dài nhất và tự điền None vào các chỗ trống.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_17_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Stepped Range Accumulator',
        vi: 'Bài tập 1: Tính Tổng Dãy Số Nhảy Bước'
      },
      instruction: {
        en: 'Write `sum_stepped_multiples(start: int, stop: int, step: int, divisor: int) -> int` that iterates from `start` to `stop` (exclusive) with `step` and returns the sum of all numbers evenly divisible by `divisor`.',
        vi: 'Viết hàm `sum_stepped_multiples(start: int, stop: int, step: int, divisor: int) -> int` duyệt từ `start` tới `stop` với bước nhảy `step` và trả về tổng các số chia hết cho `divisor`.'
      },
      starterCode: `def sum_stepped_multiples(start: int, stop: int, step: int, divisor: int) -> int:
    # TODO: Iterate with range and sum numbers divisible by divisor
    pass`,
      solutionCode: `def sum_stepped_multiples(start: int, stop: int, step: int, divisor: int) -> int:
    total = 0
    for num in range(start, stop, step):
        if num % divisor == 0:
            total += num
    return total`,
      hint: {
        en: 'Use for num in range(start, stop, step) and check num % divisor == 0.',
        vi: 'Dùng for num in range(start, stop, step) và kiểm tra num % divisor == 0.'
      },
      explanation: {
        en: 'Generates arithmetic steps lazily and accumulates only divisible numbers.',
        vi: 'Tạo bước nhảy số học và cộng dồn các số thỏa mãn điều kiện chia hết.'
      }
    },
    {
      id: 'py_17_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Parallel Inventory Rebalancer',
        vi: 'Bài tập 2: Đối Soát Tồn Kho Song Song'
      },
      instruction: {
        en: 'Write `rebalance_inventory(item_names: list[str], stock_levels: list[int], target_levels: list[int]) -> dict[str, int]` using `zip` that calculates the required adjustment for each item (`target - stock`).',
        vi: 'Viết hàm `rebalance_inventory(item_names: list[str], stock_levels: list[int], target_levels: list[int]) -> dict[str, int]` sử dụng `zip` tính số lượng cần điều chỉnh cho từng mặt hàng (`target - stock`).'
      },
      starterCode: `def rebalance_inventory(item_names: list[str], stock_levels: list[int], target_levels: list[int]) -> dict[str, int]:
    # TODO: Use zip to map items to required stock adjustment
    pass`,
      solutionCode: `def rebalance_inventory(item_names: list[str], stock_levels: list[int], target_levels: list[int]) -> dict[str, int]:
    adjustments = {}
    for name, current, target in zip(item_names, stock_levels, target_levels):
        adjustments[name] = target - current
    return adjustments`,
      hint: {
        en: 'Iterate over zip(item_names, stock_levels, target_levels) and set adjustments[name] = target - current.',
        vi: 'Duyệt zip(item_names, stock_levels, target_levels) và gán adjustments[name] = target - current.'
      },
      explanation: {
        en: 'Parallel iteration locks three synchronous sequences together seamlessly.',
        vi: 'Duyệt song song liên kết ba danh sách tuần tự đồng bộ một cách tự nhiên.'
      }
    }
  ],
  challenge: {
    id: 'py_17_challenge',
    title: {
      en: 'Challenge: Multi-Source Sensor Stream Normalizer',
      vi: 'Thử thách: Chuẩn Hóa Chuỗi Cảm Biến Đa Nguồn'
    },
    description: {
      en: 'Write `normalize_sensor_matrix(timestamps: list[str], sensor_names: list[str], readings_matrix: list[list[float]]) -> list[dict]` where `readings_matrix` contains rows corresponding to timestamps and columns corresponding to sensors. Return a list of records: `[{"timestamp": ts, "readings": {sensor: val, ...}}, ...]` using `enumerate` and `zip`. Round all reading floats to 2 decimal places.',
      vi: 'Viết hàm `normalize_sensor_matrix(timestamps: list[str], sensor_names: list[str], readings_matrix: list[list[float]]) -> list[dict]` trong đó `readings_matrix` chứa các dòng theo thời gian và các cột theo từng cảm biến. Dùng `enumerate` và `zip` để tạo danh sách bản ghi chuẩn hóa có các giá trị float làm tròn 2 chữ số thập phân.'
    },
    requirements: [
      {
        en: 'Combine timestamp rows and sensor names using zip',
        vi: 'Kết hợp các dòng timestamp và tên sensor bằng zip'
      },
      {
        en: 'Round numeric sensor values to 2 decimal places',
        vi: 'Làm tròn giá trị số của cảm biến đến 2 chữ số thập phân'
      },
      {
        en: 'Structure outputs into structured dictionary records',
        vi: 'Đóng gói đầu ra thành danh sách các bản ghi dictionary'
      }
    ],
    starterCode: `def normalize_sensor_matrix(timestamps: list[str], sensor_names: list[str], readings_matrix: list[list[float]]) -> list[dict]:
    # TODO: Build normalized timestamped sensor stream records
    pass`,
    solutionCode: `def normalize_sensor_matrix(timestamps: list[str], sensor_names: list[str], readings_matrix: list[list[float]]) -> list[dict]:
    normalized_records = []
    for ts, row in zip(timestamps, readings_matrix):
        sensor_dict = {}
        for sensor, val in zip(sensor_names, row):
            sensor_dict[sensor] = round(float(val), 2)
        normalized_records.append({
            "timestamp": ts,
            "readings": sensor_dict
        })
    return normalized_records`,
    hints: [
      {
        en: 'Use zip(timestamps, readings_matrix) for outer loop and zip(sensor_names, row) for inner dictionary construction.',
        vi: 'Dùng zip(timestamps, readings_matrix) cho vòng ngoài và zip(sensor_names, row) để tạo dict bên trong.'
      }
    ],
    solutionExplanation: {
      en: 'Combines multiple 2D array coordinates with parallel iterators to produce structured JSON-friendly records.',
      vi: 'Kết hợp mảng 2 chiều với các vòng lặp zip song song để tạo ra các bản ghi có cấu trúc rõ ràng.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_17_q1',
      type: 'single_choice',
      question: {
        en: 'What sequence of integers is generated by `range(2, 10, 3)`?',
        vi: 'Dãy số nguyên nào được tạo ra bởi lệnh `range(2, 10, 3)`?'
      },
      options: [
        { en: '2, 5, 8', vi: '2, 5, 8' },
        { en: '2, 5, 8, 11', vi: '2, 5, 8, 11' },
        { en: '3, 6, 9', vi: '3, 6, 9' },
        { en: '2, 6, 10', vi: '2, 6, 10' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Starts at 2, increments by 3 each step: 2, 5, 8 (stops before reaching 10).',
        vi: 'Bắt đầu từ 2, mỗi bước nhảy cộng thêm 3: 2, 5, 8 (kết thúc trước khi đạt tới 10).'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'easy'
    },
    {
      id: 'py_17_q2',
      type: 'single_choice',
      question: {
        en: 'What does `enumerate(["a", "b", "c"], start=1)` yield on its first iteration?',
        vi: 'Lệnh `enumerate(["a", "b", "c"], start=1)` trả về giá trị gì ở vòng lặp đầu tiên?'
      },
      options: [
        { en: '(1, "a")', vi: '(1, "a")' },
        { en: '(0, "a")', vi: '(0, "a")' },
        { en: '["a", 1]', vi: '["a", 1]' },
        { en: '"a"', vi: '"a"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`enumerate` pairs index and item: with `start=1`, the first pair is `(1, "a")`.',
        vi: '`enumerate` trả về cặp index và phần tử: với `start=1`, cặp đầu tiên là `(1, "a")`.'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'easy'
    },
    {
      id: 'py_17_q3',
      type: 'single_choice',
      question: {
        en: 'When `zip([1, 2, 3], ["a", "b"])` is iterated, how many pairs are yielded?',
        vi: 'Khi duyệt `zip([1, 2, 3], ["a", "b"])`, có bao nhiêu cặp được trả về?'
      },
      options: [
        { en: '2 pairs: (1, "a") and (2, "b")', vi: '2 cặp: (1, "a") và (2, "b")' },
        { en: '3 pairs (padding with None)', vi: '3 cặp (tự điền None)' },
        { en: '5 items', vi: '5 phần tử' },
        { en: 'ValueError', vi: 'ValueError' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Standard `zip()` stops as soon as the shortest iterable is exhausted (which has length 2).',
        vi: 'Hàm `zip()` tiêu chuẩn dừng lại ngay khi danh sách ngắn nhất kết thúc (độ dài 2).'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'easy'
    },
    {
      id: 'py_17_q4',
      type: 'single_choice',
      question: {
        en: 'Which method should you call on a dictionary `d` to iterate through both keys and values simultaneously?',
        vi: 'Phương thức nào của dictionary `d` cho phép duyệt qua cả khóa và giá trị đồng thời?'
      },
      options: [
        { en: 'd.items()', vi: 'd.items()' },
        { en: 'd.keys_and_values()', vi: 'd.keys_and_values()' },
        { en: 'd.entries()', vi: 'd.entries()' },
        { en: 'd.pairs()', vi: 'd.pairs()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`d.items()` returns a dynamic view of `(key, value)` tuples.',
        vi: '`d.items()` trả về tập hợp các cặp tuple `(key, value)` để phân rã.'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'easy'
    },
    {
      id: 'py_17_q5',
      type: 'single_choice',
      question: {
        en: 'How much memory does `range(1_000_000_000)` consume in Python 3?',
        vi: 'Lệnh `range(1_000_000_000)` tiêu tốn bao nhiêu bộ nhớ RAM trong Python 3?'
      },
      options: [
        { en: 'A small, fixed O(1) amount (approx 48 bytes)', vi: 'Một lượng cố định rất nhỏ O(1) (khoảng 48 bytes)' },
        { en: '8 Gigabytes of RAM', vi: '8 Gigabytes bộ nhớ RAM' },
        { en: '1 Megabyte', vi: '1 Megabyte' },
        { en: 'It raises MemoryError immediately', vi: 'Nó báo lỗi MemoryError ngay lập tức' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'In Python 3, `range` produces integers lazily as requested, storing only start, stop, and step attributes in constant O(1) memory.',
        vi: 'Trong Python 3, `range` sinh số theo nhu cầu và chỉ lưu trữ 3 thuộc tính start, stop, step trong bộ nhớ O(1) cố định.'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'medium'
    },
    {
      id: 'py_17_q6',
      type: 'single_choice',
      question: {
        en: 'What sequence is generated by `range(5, 0, -1)`?',
        vi: 'Dãy số nào được tạo ra bởi `range(5, 0, -1)`?'
      },
      options: [
        { en: '5, 4, 3, 2, 1', vi: '5, 4, 3, 2, 1' },
        { en: '5, 4, 3, 2, 1, 0', vi: '5, 4, 3, 2, 1, 0' },
        { en: '4, 3, 2, 1, 0', vi: '4, 3, 2, 1, 0' },
        { en: '[] (empty)', vi: '[] (rỗng)' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Starts at 5, decrements by 1 each step, and stops before reaching 0: 5, 4, 3, 2, 1.',
        vi: 'Bắt đầu từ 5, giảm 1 mỗi bước và dừng trước khi chạm 0: 5, 4, 3, 2, 1.'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'easy'
    },
    {
      id: 'py_17_q7',
      type: 'single_choice',
      question: {
        en: 'What is the function `reversed(seq)` used for?',
        vi: 'Hàm `reversed(seq)` được dùng để làm gì?'
      },
      options: [
        { en: 'Returns a reverse iterator over a sequence without modifying the original or creating a full copy', vi: 'Trả về iterator duyệt ngược dãy mà không sửa đổi bản gốc hoặc sao chép tốn bộ nhớ' },
        { en: 'Reverses a list in place and returns None', vi: 'Đảo ngược danh sách tại chỗ và trả về None' },
        { en: 'Inverts boolean values in a list', vi: 'Đảo ngược các giá trị boolean trong danh sách' },
        { en: 'Sorts elements descendingly', vi: 'Sắp xếp các phần tử giảm dần' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`reversed()` returns a memory-efficient reverse iterator over any sequence with `__len__` and `__getitem__`.',
        vi: '`reversed()` trả về một iterator duyệt ngược siêu nhẹ trên bất kỳ chuỗi/danh sách nào.'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'easy'
    },
    {
      id: 'py_17_q8',
      type: 'single_choice',
      question: {
        en: 'What happens if you modify a list (e.g. `del my_list[i]`) while iterating directly through it with a for loop?',
        vi: 'Điều gì xảy ra nếu bạn xóa phần tử trong danh sách khi đang duyệt trực tiếp qua nó bằng vòng lặp for?'
      },
      options: [
        { en: 'Internal indices shift, causing subsequent elements to be skipped unpredictably', vi: 'Chỉ mục nội bộ bị dịch chuyển, khiến các phần tử kế tiếp bị nhảy cóc không lường trước' },
        { en: 'Python raises a ConcurrentModificationError', vi: 'Python báo lỗi ConcurrentModificationError' },
        { en: 'The loop automatically restarts from index 0', vi: 'Vòng lặp tự động chạy lại từ index 0' },
        { en: 'The list remains unchanged until the loop finishes', vi: 'Danh sách được giữ nguyên cho tới khi vòng lặp kết thúc' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Mutating a list during iteration alters index offsets in place, leading to subtle skipped elements.',
        vi: 'Thay đổi độ dài danh sách khi đang lặp sẽ làm lệch chỉ mục nội bộ, khiến các phần tử bị bỏ sót.'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'medium'
    },
    {
      id: 'py_17_q9',
      type: 'single_choice',
      question: {
        en: 'Which Python standard library module provides `zip_longest`?',
        vi: 'Module thư viện chuẩn nào của Python cung cấp hàm `zip_longest`?'
      },
      options: [
        { en: 'itertools', vi: 'itertools' },
        { en: 'collections', vi: 'collections' },
        { en: 'functools', vi: 'functools' },
        { en: 'operator', vi: 'operator' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`itertools.zip_longest` allows pairing iterables of unequal length, filling missing slots with a fillvalue.',
        vi: '`itertools.zip_longest` cho phép ghép các iterable có độ dài lệch nhau và tự điền giá trị khuyết.'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'easy'
    },
    {
      id: 'py_17_q10',
      type: 'single_choice',
      question: {
        en: 'How can you unpack key and value inside the loop header for `user_data = {"id": 1, "name": "Admin"}`?',
        vi: 'Làm thế nào để phân rã khóa và giá trị ngay tại đầu vòng lặp for với dictionary `user_data`?'
      },
      options: [
        { en: 'for k, v in user_data.items():', vi: 'for k, v in user_data.items():' },
        { en: 'for k, v in user_data:', vi: 'for k, v in user_data:' },
        { en: 'for (k; v) in user_data.all():', vi: 'for (k; v) in user_data.all():' },
        { en: 'for [k: v] in user_data:', vi: 'for [k: v] in user_data:' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`for k, v in user_data.items():` unpacks each `(key, value)` tuple into `k` and `v`.',
        vi: '`for k, v in user_data.items():` phân rã từng tuple `(key, value)` thành hai biến `k` và `v`.'
      },
      topicId: 'python_for_loops_iteration',
      difficulty: 'easy'
    }
  ]
};
export default lesson08;
