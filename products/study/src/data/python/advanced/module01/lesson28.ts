import { Lesson } from '../../../../types';

export const lesson28: Lesson = {
  id: 'py_lesson_28',
  moduleId: 'py_mod_11',
  levelId: 'advanced',
  courseId: 'python',
  order: 28,
  topicId: 'python_generators_iterators_itertools',
  title: {
    en: 'Generators, Custom Iterators & itertools',
    vi: 'Bộ Sinh (Generators), Iterator Tùy Chỉnh & Thư Viện itertools'
  },
  summary: {
    en: 'Master memory-efficient lazy data streaming in Python: generator functions with yield, generator expressions, custom iterable classes (__iter__ and __next__ protocols), coroutine communication (send, throw, close), and the standard itertools library (count, cycle, chain, islice, groupby, tee).',
    vi: 'Làm chủ xử lý luồng dữ liệu lười (lazy streaming) tối ưu bộ nhớ trong Python: hàm generator với yield, generator expressions, lớp iterator tùy biến (giao thức __iter__ và __next__), giao tiếp coroutine (send, throw, close) và bộ công cụ itertools chuẩn (count, cycle, chain, islice, groupby, tee).'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Processing large or infinite data streams requires evaluating items on demand rather than loading entire datasets into memory. Python’s iterator protocol and generator mechanics provide native language-level primitives for lazy evaluation, complemented by the industrial-grade `itertools` C-extension library.',
      vi: 'Xử lý các tập dữ liệu lớn hoặc luồng dữ liệu vô hạn đòi hỏi cơ chế tính toán khi cần (lazy evaluation) thay vì nạp toàn bộ vào bộ nhớ RAM. Giao thức iterator và cơ chế generator của Python cung cấp nền tảng nguyên bản cho việc này, kết hợp cùng thư viện `itertools` hiệu năng cao.'
    },
    conceptExplanation: {
      en: '1. The Iterator Protocol:\n- **Iterable**: An object implementing `__iter__()` that returns an iterator.\n- **Iterator**: An object implementing `__next__()` that returns subsequent values or raises `StopIteration` when exhausted.\n\n2. Generator Functions & `yield`:\n- A function containing `yield` suspends its execution state, yields a value to the caller, and resumes seamlessly when next requested.\n- Infinite Generators: Can produce continuous sequences (e.g. streaming sensor data or prime numbers) with $O(1)$ constant memory.\n\n3. Advanced Generator Operations:\n- `gen.send(value)`: Resumes the generator, passing `value` into the result of the `yield` expression.\n- `gen.throw(typ)` & `gen.close()`: Injects exceptions or terminates the generator cleanly.\n- `yield from subgen()`: Delegates iteration to a nested sub-generator transparently.\n\n4. The `itertools` Power Suite:\n- Infinite Iterators: `itertools.count(start, step)`, `itertools.cycle(iterable)`.\n- Slicing & Chaining: `itertools.islice(iterable, stop)`, `itertools.chain(iter1, iter2)`.\n- Grouping & Splitting: `itertools.groupby(iterable, keyfunc)` (requires sorted input), `itertools.tee(iterable, n=2)`.',
      vi: '1. Giao Thức Iterator Protocol:\n- **Iterable**: Đối tượng cài đặt `__iter__()` trả về một iterator.\n- **Iterator**: Đối tượng cài đặt `__next__()` trả về giá trị kế tiếp hoặc ném `StopIteration` khi hết phần tử.\n\n2. Hàm Generator & Từ Khóa `yield`:\n- Hàm chứa từ khóa `yield` sẽ tạm dừng thực thi, trả giá trị về cho nơi gọi, và tiếp tục chạy mượt mà ở lần gọi kế tiếp.\n- Generator Vô Hạn: Có thể sinh chuỗi dữ liệu liên tục không giới hạn với bộ nhớ tiêu thụ cố định $O(1)$.\n\n3. Thao Tác Generator Nâng Cao:\n- `gen.send(value)`: Tiếp tục chạy generator và truyền `value` vào kết quả của biểu thức `yield`.\n- `gen.throw(typ)` & `gen.close()`: Ném ngoại lệ hoặc đóng generator an toàn.\n- `yield from subgen()`: Ủy quyền duyệt dữ liệu cho một sub-generator con.\n\n4. Bộ Công Cụ `itertools` Chuẩn:\n- Iterator Vô Hạn: `itertools.count(start, step)`, `itertools.cycle(iterable)`.\n- Cắt lát & Nối luồng: `itertools.islice(iterable, stop)`, `itertools.chain(iter1, iter2)`.\n- Gom nhóm & Nhân bản luồng: `itertools.groupby(iterable, keyfunc)` (yêu cầu dữ liệu đã sắp xếp), `itertools.tee(iterable, n=2)`.'
    },
    syntax: `import itertools

# 1. Custom Iterable Class Protocol
class StepCounter:
    def __init__(self, limit: int):
        self.limit = limit
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self) -> int:
        if self.current >= self.limit:
            raise StopIteration
        val = self.current
        self.current += 1
        return val

# 2. Generator Function with yield & yield from
def fibonacci_gen():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# 3. itertools Combinations & Pipeline
first_10_fib = list(itertools.islice(fibonacci_gen(), 10))

# 4. itertools.groupby
raw_logs = [("auth", "login"), ("auth", "logout"), ("db", "query"), ("db", "commit")]
for service, entries in itertools.groupby(raw_logs, key=lambda x: x[0]):
    print(f"Service: {service}, Count: {len(list(entries))}")`,
    examples: [
      {
        title: {
          en: 'Infinite Event Stream Windowing & Batching Pipeline',
          vi: 'Luồng Xử Lý Sự Kiện Vô Hạn Phân Cửa Sổ & Gom Lô Bằng itertools'
        },
        code: `import itertools

def batch_stream(iterable, batch_size: int):
    iterator = iter(iterable)
    while True:
        batch = list(itertools.islice(iterator, batch_size))
        if not batch:
            break
        yield batch

# Stream infinite sequence in chunks of 5
counter = itertools.count(start=100, step=5)
batches = itertools.islice(batch_stream(counter, batch_size=3), 4)

for i, chunk in enumerate(batches, 1):
    print(f"Batch {i}: {chunk}")`,
        language: 'python',
        explanation: {
          en: 'Demonstrates combining itertools.islice and infinite count generators to process chunks with zero unbounded memory allocation.',
          vi: 'Minh họa cách kết hợp itertools.islice và generator vô hạn để xử lý dữ liệu theo lô mà không làm tràn bộ nhớ RAM.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Calling `itertools.groupby()` on an unsorted sequence (fails to group non-adjacent matching keys).',
          vi: 'Gọi `itertools.groupby()` trên dữ liệu chưa được sắp xếp (khiến các phần tử cùng nhóm không đứng cạnh nhau bị tách thành các nhóm rời rạc).'
        },
        correction: {
          en: 'Always sort the sequence by the key function prior to passing it to `itertools.groupby()`.',
          vi: 'Luôn sắp xếp dữ liệu theo khóa trước khi truyền vào `itertools.groupby()`.'
        },
        code: `# Incorrect:\n# groupby(["b", "a", "b"])\n# Correct:\nsorted_items = sorted(["b", "a", "b"])\ngroups = itertools.groupby(sorted_items)`
      },
      {
        mistake: {
          en: 'Re-iterating over an already exhausted generator without regenerating it.',
          vi: 'Duyệt lặp lại trên một generator đã cạn (exhausted) mà không khởi tạo lại.'
        },
        correction: {
          en: 'Generators are single-use one-way iterators; create a new instance or convert to a list if reuse is required.',
          vi: 'Generator chỉ duyệt được 1 lần duy nhất; cần tạo instance mới hoặc chuyển thành list nếu cần tái sử dụng.'
        },
        code: `g = (x * 2 for x in [1, 2])\nlist(g)  # [2, 4]\nlist(g)  # [] -> Empty! Must re-create g`
      }
    ],
    tips: [
      {
        en: 'Use generator expressions `(expr for item in iterable)` instead of list comprehensions when you only need to iterate over the items once.',
        vi: 'Dùng generator expression `(expr for item in iterable)` thay vì list comprehension khi chỉ cần duyệt qua dữ liệu một lần duy nhất.'
      },
      {
        en: '`itertools.chain.from_iterable(nested_list)` flattens 2D iterables cleanly without nested loops.',
        vi: '`itertools.chain.from_iterable(nested_list)` làm phẳng danh sách 2 chiều nhanh gọn mà không cần vòng lặp lồng nhau.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_26_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Prime Number Generator',
        vi: 'Bài tập 1: Bộ Sinh Số Nguyên Tố Vô Hạn'
      },
      instruction: {
        en: 'Write a generator function `generate_primes()` that yields prime numbers sequentially starting from 2 indefinitely.',
        vi: 'Viết hàm generator `generate_primes()` sinh lần lượt các số nguyên tố vô hạn bắt đầu từ số 2.'
      },
      starterCode: `def generate_primes():
    # TODO: Yield prime numbers sequentially
    pass`,
      solutionCode: `def generate_primes():
    num = 2
    while True:
        is_prime = True
        for d in range(2, int(num ** 0.5) + 1):
            if num % d == 0:
                is_prime = False
                break
        if is_prime:
            yield num
        num += 1`,
      hint: {
        en: 'Use `while True:`, test divisibility up to `sqrt(num)`, and `yield num` if prime.',
        vi: 'Dùng `while True:`, kiểm tra tính chia hết đến `sqrt(num)`, và `yield num` nếu là số nguyên tố.'
      },
      explanation: {
        en: 'Generates an infinite stream of primes evaluated on-demand.',
        vi: 'Sinh luồng số nguyên tố vô hạn được tính toán khi có yêu cầu.'
      }
    },
    {
      id: 'py_26_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Flatten Nested Sequences with itertools.chain',
        vi: 'Bài tập 2: Làm Phẳng Danh Sách Bằng itertools.chain'
      },
      instruction: {
        en: 'Write `flatten_matrix(matrix: list[list[int]]) -> list[int]` using `itertools.chain.from_iterable` to flatten a 2D matrix into a 1D list.',
        vi: 'Viết hàm `flatten_matrix(matrix: list[list[int]]) -> list[int]` sử dụng `itertools.chain.from_iterable` để làm phẳng ma trận 2D thành list 1D.'
      },
      starterCode: `import itertools

def flatten_matrix(matrix: list[list[int]]) -> list[int]:
    # TODO: Flatten matrix using itertools
    pass`,
      solutionCode: `import itertools

def flatten_matrix(matrix: list[list[int]]) -> list[int]:
    return list(itertools.chain.from_iterable(matrix))`,
      hint: {
        en: 'Call `list(itertools.chain.from_iterable(matrix))`.',
        vi: 'Gọi `list(itertools.chain.from_iterable(matrix))`.'
      },
      explanation: {
        en: '`itertools.chain.from_iterable` streams elements from nested sub-iterables without intermediate lists.',
        vi: '`itertools.chain.from_iterable` lấy phần tử từ các mảng con lồng nhau mà không cần tạo danh sách trung gian.'
      }
    }
  ],
  challenge: {
    id: 'py_26_challenge',
    title: {
      en: 'Sliding Window Stream Processor with itertools.tee & islice',
      vi: 'Bộ Xử Lý Dữ Liệu Luồng Cửa Sổ Trượt Bằng itertools.tee & islice'
    },
    description: {
      en: 'Implement `sliding_window(iterable, window_size: int)` that yields consecutive overlapping tuples of length `window_size`. For example, `sliding_window([1, 2, 3, 4, 5], 3)` yields `(1, 2, 3)`, `(2, 3, 4)`, `(3, 4, 5)`.',
      vi: 'Xây dựng hàm `sliding_window(iterable, window_size: int)` sinh ra các tuple gối đầu liên tiếp có độ dài `window_size`. Ví dụ: `sliding_window([1, 2, 3, 4, 5], 3)` sinh ra `(1, 2, 3)`, `(2, 3, 4)`, `(3, 4, 5)`.'
    },
    requirements: [
      {
        en: 'Use itertools.tee to create independent iterator branches',
        vi: 'Dùng itertools.tee để tạo các nhánh iterator độc lập'
      },
      {
        en: 'Advance each subsequent iterator branch by its index offset',
        vi: 'Dịch chuyển mỗi nhánh iterator theo chỉ số chênh lệch tương ứng'
      },
      {
        en: 'Zip the branches together into an iterable of window tuples',
        vi: 'Zip các nhánh lại thành iterable chứa các tuple cửa sổ trượt'
      }
    ],
    hints: [
      {
        en: 'Use itertools.tee(iterable, window_size) and advance each it by i steps with next(it, None).',
        vi: 'Dùng itertools.tee(iterable, window_size) và dịch chuyển từng iterator it bằng next(it, None) i lần.'
      }
    ],
    starterCode: `import itertools

def sliding_window(iterable, window_size: int):
    # TODO: Yield sliding window tuples
    pass`,
    solutionCode: `import itertools

def sliding_window(iterable, window_size: int):
    iters = itertools.tee(iterable, window_size)
    for i, it in enumerate(iters):
        for _ in range(i):
            next(it, None)
    return zip(*iters)`,
    solutionExplanation: {
      en: 'Splitting an iterator with tee and offsetting each stream allows zip to produce sliding tuples on-the-fly.',
      vi: 'Nhân bản iterator bằng tee và dịch từng luồng cho phép zip sinh ra các tuple cửa sổ trượt trực tiếp khi duyệt.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_26_q1',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'easy',
      question: {
        en: 'What methods must a custom Python class implement to fully satisfy the Iterator Protocol?',
        vi: 'Một class trong Python cần cài đặt những phương thức nào để đáp ứng đầy đủ Giao thức Iterator Protocol?'
      },
      options: [
        { en: '`__get__` and `__set__`', vi: '`__get__` và `__set__`' },
        { en: '`__iter__()` returning `self`, and `__next__()` returning values or raising `StopIteration`', vi: '`__iter__()` trả về `self`, và `__next__()` trả về phần tử tiếp theo hoặc ném `StopIteration`' },
        { en: '`__enter__` and `__exit__`', vi: '`__enter__` và `__exit__`' },
        { en: '`__len__` and `__getitem__`', vi: '`__len__` và `__getitem__`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'An iterator must implement `__iter__()` (returning an iterator instance) and `__next__()`.',
        vi: 'Một iterator bắt buộc phải có `__iter__()` (trả về chính iterator) và phương thức `__next__()`.'
      }
    },
    {
      id: 'py_26_q2',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'easy',
      question: {
        en: 'What happens to the local state of a generator function when a `yield` statement is reached?',
        vi: 'Điều gì xảy ra với trạng thái cục bộ của hàm generator khi câu lệnh `yield` được chạm tới?'
      },
      options: [
        { en: 'The function terminates and destroys all local variables', vi: 'Hàm kết thúc và xóa sạch toàn bộ biến cục bộ' },
        { en: 'Execution pauses, yielding the value to the caller, while all local variables and instruction pointers are frozen in memory until resumed', vi: 'Thực thi tạm dừng, trả giá trị cho nơi gọi, trong khi toàn bộ biến cục bộ và con trỏ lệnh được đóng băng trong bộ nhớ chờ lần gọi tiếp' },
        { en: 'The function restarts from the top', vi: 'Hàm khởi động lại từ đầu' },
        { en: 'Python launches a background thread', vi: 'Python khởi chạy một luồng chạy ngầm' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`yield` freezes execution and yields control back to the caller without tearing down the call frame.',
        vi: '`yield` đóng băng thực thi và trao lại quyền kiểm soát cho caller mà không hủy call frame.'
      }
    },
    {
      id: 'py_26_q3',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'medium',
      question: {
        en: 'What does `itertools.islice(iterable, start, stop)` do?',
        vi: 'Hàm `itertools.islice(iterable, start, stop)` thực hiện điều gì?'
      },
      options: [
        { en: 'Creates a full list copy in memory', vi: 'Tạo một bản sao danh sách đầy đủ trong RAM' },
        { en: 'Returns an iterator that lazily yields sliced elements without creating intermediate collections or consuming unneeded items', vi: 'Trả về một iterator cắt lát lười (lazy) mà không tạo bộ sưu tập trung gian hay nạp dữ liệu thừa' },
        { en: 'Splits strings by slice delimiters', vi: 'Cắt chuỗi theo ký tự phân tách' },
        { en: 'Deletes elements from the original iterator', vi: 'Xóa phần tử khỏi iterator ban đầu' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`islice` allows slicing any iterator (even infinite ones) lazily.',
        vi: '`islice` cho phép cắt lát bất kỳ iterator nào (kể cả luồng vô hạn) một cách lười và tiết kiệm bộ nhớ.'
      }
    },
    {
      id: 'py_26_q4',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'medium',
      question: {
        en: 'Why is `itertools.groupby()` required to operate on pre-sorted data?',
        vi: 'Tại sao `itertools.groupby()` bắt buộc phải hoạt động trên dữ liệu đã được sắp xếp trước?'
      },
      options: [
        { en: 'It raises an error on unsorted input', vi: 'Nó sẽ báo lỗi nếu đầu vào chưa sort' },
        { en: 'It only groups consecutive matching elements, creating a new group whenever the key changes', vi: 'Nó chỉ gom các phần tử khớp nhau đứng liên tiếp, tạo nhóm mới mỗi khi giá trị khóa thay đổi' },
        { en: 'Sorting converts the iterator to C code', vi: 'Sắp xếp giúp chuyển iterator sang mã C' },
        { en: 'It uses binary search internally', vi: 'Nó sử dụng thuật toán tìm kiếm nhị phân bên trong' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`groupby` generates a break each time the key function changes value; unsorted items with identical keys are separated.',
        vi: '`groupby` ngắt nhóm mỗi khi giá trị khóa thay đổi; các phần tử có cùng khóa nhưng không đứng liền nhau sẽ bị tách thành nhiều nhóm riêng.'
      }
    },
    {
      id: 'py_26_q5',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'medium',
      question: {
        en: 'What does the `yield from subgen` expression accomplish in Python?',
        vi: 'Biểu thức `yield from subgen` trong Python thực hiện nhiệm vụ gì?'
      },
      options: [
        { en: 'Imports an external generator from another file', vi: 'Import một generator từ tệp khác' },
        { en: 'Delegates iteration, value yielding, and two-way communication (send/throw) directly to a sub-generator', vi: 'Ủy quyền duyệt lặp, sinh giá trị và giao tiếp 2 chiều (send/throw) trực tiếp cho một sub-generator con' },
        { en: 'Stops the parent generator immediately', vi: 'Dừng ngay lập tức generator cha' },
        { en: 'Converts the subgen into a tuple', vi: 'Chuyển subgen thành tuple' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`yield from` transparently establishes a bidirectional channel between caller and sub-generator.',
        vi: '`yield from` thiết lập kênh giao tiếp 2 chiều trong suốt giữa caller và sub-generator.'
      }
    },
    {
      id: 'py_26_q6',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'easy',
      question: {
        en: 'Which `itertools` function generates an infinite arithmetic progression sequence (e.g. 10, 15, 20, ...)?',
        vi: 'Hàm nào trong `itertools` sinh ra một cấp số cộng vô hạn (vd: 10, 15, 20, ...)?'
      },
      options: [
        { en: '`itertools.range()`', vi: '`itertools.range()`' },
        { en: '`itertools.count(start=10, step=5)`', vi: '`itertools.count(start=10, step=5)`' },
        { en: '`itertools.progression()`', vi: '`itertools.progression()`' },
        { en: '`itertools.step()`', vi: '`itertools.step()`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`itertools.count(start, step)` produces an infinite counting iterator.',
        vi: '`itertools.count(start, step)` tạo ra một iterator đếm vô hạn.'
      }
    },
    {
      id: 'py_26_q7',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'medium',
      question: {
        en: 'What does `itertools.tee(it, n=2)` do?',
        vi: 'Hàm `itertools.tee(it, n=2)` thực hiện điều gì?'
      },
      options: [
        { en: 'Splits an iterable into `n` independent iterators from a single iterable stream', vi: 'Tách một luồng dữ liệu iterable thành `n` iterator hoạt động độc lập' },
        { en: 'Prints the iterator to stdout', vi: 'In iterator ra màn hình terminal' },
        { en: 'Filters the first 2 elements', vi: 'Lọc 2 phần tử đầu tiên' },
        { en: 'Calculates the sum of items', vi: 'Tính tổng các phần tử' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`itertools.tee` duplicates an iterable into independent iterator copies via internal FIFO queues.',
        vi: '`itertools.tee` nhân bản một iterable thành các bản sao iterator độc lập thông qua hàng đợi FIFO.'
      }
    },
    {
      id: 'py_26_q8',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'medium',
      question: {
        en: 'How do you send data back into an active suspended generator?',
        vi: 'Làm thế nào để truyền dữ liệu ngược vào bên trong một generator đang tạm dừng?'
      },
      options: [
        { en: '`next(gen, value)`', vi: '`next(gen, value)`' },
        { en: '`gen.send(value)`', vi: '`gen.send(value)`' },
        { en: '`gen.push(value)`', vi: '`gen.push(value)`' },
        { en: '`gen.input(value)`', vi: '`gen.input(value)`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`gen.send(val)` resumes the generator, setting the result of the current `yield` expression to `val`.',
        vi: '`gen.send(val)` tiếp tục generator và gán giá trị của biểu thức `yield` hiện tại thành `val`.'
      }
    },
    {
      id: 'py_26_q9',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'easy',
      question: {
        en: 'What is the main advantage of generators over lists when working with large datasets?',
        vi: 'Ưu điểm cốt lõi của generator so với list khi xử lý tập dữ liệu lớn là gì?'
      },
      options: [
        { en: 'Generators execute on GPU', vi: 'Generator chạy trên GPU' },
        { en: 'Generators compute elements lazily on demand with $O(1)$ memory consumption, preventing Out-Of-Memory crashes', vi: 'Generator tính toán phần tử lười khi cần với lượng RAM tiêu thụ cố định $O(1)$, chống tràn bộ nhớ' },
        { en: 'Generators are always sorted', vi: 'Generator luôn tự động sắp xếp' },
        { en: 'Generators have more built-in methods than lists', vi: 'Generator có nhiều phương thức tích hợp hơn list' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Lazy evaluation ensures constant memory usage regardless of dataset scale.',
        vi: 'Tính toán lười đảm bảo bộ nhớ tiêu thụ ở mức hằng số bất kể kích thước tập dữ liệu lớn đến đâu.'
      }
    },
    {
      id: 'py_26_q10',
      type: 'single_choice',
      topicId: 'python_iterators_generators',
      difficulty: 'easy',
      question: {
        en: 'What exception is raised when an iterator runs out of elements in Python?',
        vi: 'Ngoại lệ nào được ném ra khi một iterator duyệt hết toàn bộ phần tử trong Python?'
      },
      options: [
        { en: '`IndexError`', vi: '`IndexError`' },
        { en: '`StopIteration`', vi: '`StopIteration`' },
        { en: '`EOFError`', vi: '`EOFError`' },
        { en: '`EmptyIteratorError`', vi: '`EmptyIteratorError`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python\'s iteration protocol uses `StopIteration` to signal termination of the sequence.',
        vi: 'Giao thức lặp của Python dùng `StopIteration` để báo hiệu đã kết thúc chuỗi dữ liệu.'
      }
    }
  ]
};
