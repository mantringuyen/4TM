import { Book } from '../../types';

export const TIPS_PILOT_BOOK: Book = {
  id: 'python-engineering-tips',
  slug: 'python-engineering-tips',
  title: 'Python Engineering Tips & Idioms',
  subtitle: {
    en: 'High-Impact Idioms, Performance Nuances & Defensive Patterns',
    vi: 'Cú Pháp Tối Ưu, Chi Tiết Hiệu Năng & Quy Chuẩn Lập Trình An Toàn',
  },
  bookType: 'Tips',
  categoryId: 'python',
  subjectId: 'programming',
  author: '4TM Editorial Board',
  role: 'Software Craftsmanship Group',
  level: 'Practical / Applied',
  estimatedReadTime: '25 mins',
  chaptersCount: 12,
  publishedDate: '2025-02-20',
  accentColor: 'from-amber-500 to-orange-700',
  tags: ['Tips', 'Pythonic Idioms', 'Performance', 'Clean Code', 'Best Practices'],
  description: {
    en: 'Twelve high-impact, battle-tested Python engineering tips to write idiomatic, performant, and bug-resistant code.',
    vi: 'Mười hai mẹo kỹ thuật chuẩn xác và đã được kiểm chứng giúp viết mã Python chuẩn idiomatic, hiệu năng cao và hạn chế lỗi tối đa.',
  },
  prerequisites: {
    en: ['Basic Python scripting experience'],
    vi: ['Kinh nghiệm viết script Python cơ bản'],
  },
  outcomes: {
    en: [
      'Replace error-prone imperative patterns with idiomatic built-ins like enumerate, zip, and pathlib',
      'Avoid subtle memory leaks, mutable argument traps, and lost decorator metadata',
      'Produce cleaner, highly maintainable codebases for production teams',
    ],
    vi: [
      'Thay thế các mẫu code rườm rà bằng các hàm built-in chuẩn như enumerate, zip và pathlib',
      'Tránh bẫy tham số mặc định khả biến, rò rỉ bộ nhớ và mất metadata trong decorator',
      'Xây dựng mã nguồn trong sáng, dễ bảo trì cho các dự án sản phẩm thực tế',
    ],
  },
  chapters: [
    {
      id: 'tip-ch-1',
      number: 1,
      slug: 'prefer-enumerate-over-manual-counters',
      title: {
        en: '1. Prefer enumerate() Over Manual Counters',
        vi: '1. Sử Dụng enumerate() Thay Vì Biến Đếm Thủ Công',
      },
      summary: {
        en: 'Eliminate manual counter initialization and off-by-one errors with native C-speed iteration indexing.',
        vi: 'Loại bỏ việc khởi tạo biến đếm thủ công và lỗi lệch chỉ số bằng hàm duyệt có chỉ mục viết bằng C siêu tốc.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-1-1',
          title: {
            en: 'Idiomatic Index Iteration',
            vi: 'Duyệt Chỉ Số Chuẩn Pythonic',
          },
          tipDetails: {
            situation: {
              en: 'You need both the index position and the element item while looping through a sequence.',
              vi: 'Bạn cần cả chỉ số vị trí và phần tử dữ liệu trong khi duyệt qua một danh sách.',
            },
            quickInsight: {
              en: 'Manually maintaining `i = 0; i += 1` inside loops is un-pythonic, cluttered, and error-prone during early returns. `enumerate()` yields `(index, item)` tuples directly implemented at C-speed in CPython.',
              vi: 'Tự duy trì biến đếm `i = 0; i += 1` trong vòng lặp vừa rườm rà, vừa dễ sinh lỗi khi có lệnh return sớm. Hàm `enumerate()` sinh ra các tuple `(index, item)` trực tiếp từ nhân C của CPython.',
            },
            recommendedPattern: {
              en: 'Use `for idx, item in enumerate(iterable, start=0):`. Customize `start=1` when displaying human-facing line numbers or report rows.',
              vi: 'Dùng `for idx, item in enumerate(danh_sach, start=0):`. Tùy chỉnh `start=1` khi cần hiển thị số dòng báo cáo cho người dùng.',
            },
            workingExample: {
              language: 'python',
              filename: 'enumerate_idiom.py',
              explanation: {
                en: 'Clean 1-indexed report formatting using enumerate.',
                vi: 'Đánh số thứ tự bắt đầu từ 1 sạch đẹp với enumerate.',
              },
              code: `servers = ["app-prod-01", "db-prod-01", "cache-prod-01"]

# Idiomatic: direct index unpacking with 1-based start
for rank, host in enumerate(servers, start=1):
    print(f"[{rank:02d}] Health checking: {host}")`,
            },
            whyItWorks: {
              en: '`enumerate` returns an iterator yielding 2-tuples containing the incremented C-integer and the underlying item reference without creating any intermediate list allocations in memory.',
              vi: '`enumerate` trả về một iterator sinh các tuple gồm số nguyên C tự tăng và tham chiếu phần tử mà không tạo thêm bất kỳ danh sách trung gian nào trong RAM.',
            },
            limitations: {
              en: 'Do not use `enumerate` if you do not actually use the index variable. Use plain `for item in items:` instead.',
              vi: 'Không dùng `enumerate` nếu bạn không thực sự cần dùng đến biến chỉ số. Hãy dùng `for item in items:` thông thường.',
            },
            quickTakeaway: {
              en: 'Whenever you find yourself writing `i = 0` before a loop, replace it immediately with `enumerate()`.',
              vi: 'Bất cứ khi nào bạn định viết `i = 0` trước vòng for, hãy thay thế ngay bằng `enumerate()`.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-2',
      number: 2,
      slug: 'use-dict-get-and-setdefault',
      title: {
        en: '2. Use dict.get() and setdefault() Appropriately',
        vi: '2. Sử Dụng dict.get() và setdefault() Đúng Hoàn Cảnh',
      },
      summary: {
        en: 'Avoid KeyError exceptions and double-hash lookups by leveraging fallback retrieval and in-place initialization.',
        vi: 'Tránh ngoại lệ KeyError và việc băm tra cứu 2 lần bằng cách tận dụng fallback mặc định và khởi tạo tại chỗ.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-2-1',
          title: {
            en: 'Safe Dictionary Key Retrieval',
            vi: 'Truy Xuất Key Dictionary An Toàn',
          },
          tipDetails: {
            situation: {
              en: 'Extracting optional configuration values or grouping items into dictionary lists.',
              vi: 'Trích xuất các giá trị cấu hình tùy chọn hoặc gom nhóm dữ liệu vào dictionary.',
            },
            quickInsight: {
              en: 'Checking `if key in d: val = d[key]` computes the key hash and traverses bucket chains twice. `d.get(key, default)` performs a single atomic lookup. For grouping collections, `d.setdefault(key, []).append(val)` or `collections.defaultdict` is vastly superior.',
              vi: 'Kiểm tra `if key in d: val = d[key]` sẽ băm key và duyệt bảng băm 2 lần. Lệnh `d.get(key, default)` thực hiện tra cứu đúng 1 lần duy nhất. Để gom nhóm danh sách, dùng `d.setdefault(key, []).append(val)` hoặc `defaultdict`.',
            },
            recommendedPattern: {
              en: 'Use `.get()` for reading optional keys with fallback defaults. Use `.setdefault()` or `defaultdict` for accumulating collections.',
              vi: 'Dùng `.get()` khi đọc key có giá trị dự phòng. Dùng `.setdefault()` hoặc `defaultdict` khi tích lũy danh sách/tập hợp.',
            },
            workingExample: {
              language: 'python',
              filename: 'dict_fallbacks.py',
              explanation: {
                en: 'Safe config retrieval and grouping with setdefault.',
                vi: 'Đọc cấu hình an toàn và gom nhóm dữ liệu với setdefault.',
              },
              code: `config = {"timeout": 30, "retries": 3}
# Safe fallback without KeyError
timeout = config.get("timeout", 10)
debug_mode = config.get("debug", False)

# Clean item grouping
grouped = {}
events = [("auth", "login_ok"), ("db", "query_timeout"), ("auth", "logout")]
for category, event in events:
    grouped.setdefault(category, []).append(event)`,
            },
            whyItWorks: {
              en: '`.get()` bypasses the `KeyError` branch internally in C, executing in single-pass `O(1)` time.',
              vi: '`.get()` bỏ qua nhánh phát sinh `KeyError` ngay trong mã nguồn C, chạy ở độ phức tạp `O(1)` một lần duy nhất.',
            },
            limitations: {
              en: 'If `None` is a valid stored value in your dictionary, `d.get("key", default)` will return `None`, not the default. In that specific case, check `if "key" in d:`.',
              vi: 'Nếu `None` là một giá trị hợp lệ được lưu trong dict, `d.get("key", default)` sẽ trả về `None` chứ không trả về default. Trong trường hợp đó, hãy dùng `if "key" in d:`.',
            },
            quickTakeaway: {
              en: 'Never write `if "key" in d:` simply to assign a fallback default value.',
              vi: 'Đừng bao giờ viết `if "key" in d:` chỉ để gán một giá trị dự phòng mặc định.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-3',
      number: 3,
      slug: 'use-zip-with-strict-true',
      title: {
        en: '3. Use zip() with strict=True for Parallel Iteration',
        vi: '3. Dùng zip() Với strict=True Khi Duyệt Song Song',
      },
      summary: {
        en: 'Prevent silent data truncation bugs when combining multiple sequences of mismatched lengths.',
        vi: 'Ngăn ngừa lỗi mất mát dữ liệu âm thầm khi ghép các chuỗi có độ dài không bằng nhau.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-3-1',
          title: {
            en: 'Enforcing Length Invariants with zip(strict=True)',
            vi: 'Bảo Đảm Tính Toàn Vẹn Độ Dài Với zip(strict=True)',
          },
          tipDetails: {
            situation: {
              en: 'Iterating through paired sequences (e.g., column headers and row cells, or user IDs and permissions).',
              vi: 'Duyệt qua các cặp chuỗi song song (như tên cột và giá trị dòng, hoặc ID người dùng và quyền hạn).',
            },
            quickInsight: {
              en: 'By default, `zip(a, b)` silently stops at the shortest iterable, discarding trailing elements without warning. Python 3.10+ introduced `strict=True`, which raises `ValueError` if iterables differ in length.',
              vi: 'Mặc định, `zip(a, b)` sẽ âm thầm dừng lại ở chuỗi ngắn nhất, cắt bỏ toàn bộ phần tử thừa mà không báo lỗi. Python 3.10+ bổ sung tham số `strict=True`, tự động ném `ValueError` nếu độ dài hai chuỗi lệch nhau.',
            },
            recommendedPattern: {
              en: 'Always pass `strict=True` to `zip()` unless you deliberately intend to truncate to the shortest sequence.',
              vi: 'Luôn truyền `strict=True` vào hàm `zip()` trừ khi bạn có chủ đích muốn cắt bớt chuỗi theo phần tử ngắn nhất.',
            },
            workingExample: {
              language: 'python',
              filename: 'zip_strict.py',
              explanation: {
                en: 'Catching data mismatch bugs early during CSV header mapping.',
                vi: 'Bắt lỗi lệch dữ liệu sớm khi ghép header CSV với dữ liệu dòng.',
              },
              code: `headers = ["name", "email", "role"]
row_data = ["Alice", "alice@example.com"]  # Missing 3rd field!

try:
    record = dict(zip(headers, row_data, strict=True))
except ValueError as e:
    print(f"Data corruption prevented: {e}")`,
            },
            whyItWorks: {
              en: '`strict=True` checks if any iterator has remaining unconsumed items when the first iterator exhausts, ensuring complete data consistency.',
              vi: '`strict=True` kiểm tra xem có iterator nào còn dữ liệu thừa khi iterator đầu tiên kết thúc hay không, đảm bảo dữ liệu toàn vẹn 100%.',
            },
            limitations: {
              en: 'Requires Python 3.10+. In older Python versions, use `itertools.zip_longest` with a sentinel check.',
              vi: 'Yêu cầu Python 3.10+. Trên các bản Python cũ hơn, dùng `itertools.zip_longest` và kiểm tra giá trị sentinel.',
            },
            quickTakeaway: {
              en: 'Make `zip(..., strict=True)` your default instinct for parallel pairing.',
              vi: 'Hãy đặt thói quen luôn thêm `strict=True` khi dùng hàm `zip()` để ghép cặp dữ liệu.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-4',
      number: 4,
      slug: 'prefer-comprehensions-for-clarity',
      title: {
        en: '4. Prefer Comprehensions for Clarity (Avoid Side-Effects)',
        vi: '4. Ưu Tiên Comprehension Khi Rõ Ràng (Tránh Tác Dụng Phụ)',
      },
      summary: {
        en: 'Use list, set, and dict comprehensions for pure transformations, not for executing procedural side-effects.',
        vi: 'Dùng comprehension cho các phép biến đổi dữ liệu thuần túy, không dùng để thực thi các lệnh có tác dụng phụ.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-4-1',
          title: {
            en: 'Pure Data Transformation Idiom',
            vi: 'Chuyển Đổi Dữ Liệu Thuần Túy',
          },
          tipDetails: {
            situation: {
              en: 'Transforming, filtering, or mapping elements from an existing sequence into a new container.',
              vi: 'Chuyển đổi, lọc hoặc ánh xạ các phần tử từ một chuỗi có sẵn sang tập hợp mới.',
            },
            quickInsight: {
              en: 'Comprehensions are optimized in Python bytecode via `LIST_APPEND` / `MAP_ADD` instructions, avoiding repeated attribute lookup overhead of `.append()`. However, using comprehensions purely to call functions with side effects (`[print(x) for x in items]`) is an anti-pattern.',
              vi: 'Comprehension được tối ưu trong bytecode qua các lệnh `LIST_APPEND` / `MAP_ADD`, nhanh hơn nhiều so với việc gọi hàm `.append()` liên tục. Tuy nhiên, dùng comprehension chỉ để chạy hàm có side-effect (`[print(x) for x in list]`) là một anti-pattern.',
            },
            recommendedPattern: {
              en: 'Use comprehensions when producing a new container. Use standard `for` loops when executing imperative actions or side effects.',
              vi: 'Dùng comprehension khi bạn cần tạo ra một cấu trúc dữ liệu mới. Dùng vòng lặp `for` thông thường khi thực thi các tác vụ hay thay đổi trạng thái ngoài.',
            },
            workingExample: {
              language: 'python',
              filename: 'clean_comprehensions.py',
              explanation: {
                en: 'Clean dict and set comprehensions for lookup index creation.',
                vi: 'Tạo chỉ mục tra cứu nhanh bằng dict và set comprehension.',
              },
              code: `users = [
    {"id": "u1", "email": "a@x.com", "active": True},
    {"id": "u2", "email": "b@x.com", "active": False},
    {"id": "u3", "email": "c@x.com", "active": True},
]

# Fast O(1) active email lookup set
active_emails = {u["email"] for u in users if u["active"]}

# Quick ID-to-User dictionary mapping
user_by_id = {u["id"]: u for u in users}`,
            },
            whyItWorks: {
              en: 'Bytecode executes container allocation and item insertion directly on the CPython evaluation stack.',
              vi: 'Bytecode thực thi việc cấp phát container và chèn phần tử trực tiếp trên evaluation stack của CPython.',
            },
            limitations: {
              en: 'Avoid nested comprehensions with more than 2 levels of looping or complex branching. If it exceeds 2 lines of logic, write a readable for loop.',
              vi: 'Tránh lồng comprehension quá 2 cấp vòng lặp hoặc điều kiện rẽ nhánh phức tạp. Nếu logic dài hơn 2 dòng, hãy viết vòng for rõ ràng.',
            },
            quickTakeaway: {
              en: 'Comprehensions are for creating data, not for running actions.',
              vi: 'Comprehension sinh ra để tạo dữ liệu mới, không phải để thực thi hành động.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-5',
      number: 5,
      slug: 'avoid-mutable-default-arguments',
      title: {
        en: '5. Avoid Mutable Default Arguments with None Sentinel',
        vi: '5. Tránh Tham Số Mặc Định Khả Biến Bằng Sentinel None',
      },
      summary: {
        en: 'Default argument expressions are evaluated once at function definition time, leading to shared state bugs.',
        vi: 'Biểu thức tham số mặc định chỉ được tính toán 1 lần duy nhất khi định nghĩa hàm, gây rò rỉ dữ liệu giữa các lần gọi.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-5-1',
          title: {
            en: 'The None Sentinel Pattern',
            vi: 'Mẫu Thiết Kế Sentinel None',
          },
          tipDetails: {
            situation: {
              en: 'Creating a function with an optional container argument (list, dict, set, or custom object).',
              vi: 'Tạo hàm có tham số tùy chọn là một cấu trúc dữ liệu khả biến (list, dict, set hoặc object).',
            },
            quickInsight: {
              en: 'In Python, `def f(items=[]):` creates a single list object stored on `f.__defaults__`. Every call modifying `items` shares that exact same list across all users and function calls.',
              vi: 'Trong Python, `def f(items=[]):` tạo đúng một đối tượng list duy nhất lưu trong `f.__defaults__`. Mọi lần gọi hàm có sửa đổi `items` đều sẽ dùng chung đúng danh sách đó.',
            },
            recommendedPattern: {
              en: 'Set default to `None` in the signature, and initialize a fresh container inside the function body (`if items is None: items = []`).',
              vi: 'Đặt giá trị mặc định là `None` trên chữ ký hàm, và khởi tạo đối tượng mới bên trong thân hàm (`if items is None: items = []`).',
            },
            workingExample: {
              language: 'python',
              filename: 'none_sentinel.py',
              explanation: {
                en: 'Defensive argument initialization guaranteeing isolated state.',
                vi: 'Khởi tạo tham số an toàn đảm bảo trạng thái độc lập cho từng lần gọi.',
              },
              code: `def append_event(event_name: str, log: list[str] | None = None) -> list[str]:
    # Correct: isolated instance created per call
    if log is None:
        log = []
    log.append(event_name)
    return log

first = append_event("USER_SIGNUP")
second = append_event("PASSWORD_RESET")
print(first)   # ['USER_SIGNUP']
print(second)  # ['PASSWORD_RESET'] (No state leak!)`,
            },
            whyItWorks: {
              en: '`None` is an immutable singleton. Checking `if log is None` dynamically allocates a fresh `list` on heap memory for each distinct function execution.',
              vi: '`None` là một singleton bất biến. Kiểm tra `if log is None` sẽ cấp phát một `list` mới tinh trên heap cho từng lần chạy hàm riêng biệt.',
            },
            limitations: {
              en: 'If callers legitimately pass `None` meaning "empty", ensure internal logic respects that distinction.',
              vi: 'Nếu caller truyền vào `None` với ý nghĩa là "không làm gì", hãy xử lý cẩn thận để phân biệt với trường hợp dùng giá trị mặc định.',
            },
            quickTakeaway: {
              en: 'Never use `[]`, `{}`, or `set()` as default function argument values.',
              vi: 'Tuyệt đối không bao giờ dùng `[]`, `{}`, hoặc `set()` làm giá trị mặc định trong định nghĩa hàm.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-6',
      number: 6,
      slug: 'use-functools-wraps-in-decorators',
      title: {
        en: '6. Use functools.wraps() in Custom Decorators',
        vi: '6. Luôn Dùng functools.wraps() Trong Decorator',
      },
      summary: {
        en: 'Preserve function identity, docstrings, and signature metadata for debuggers and auto-documentation tools.',
        vi: 'Bảo tồn tên hàm, docstring và chữ ký hàm cho công cụ debug và tài liệu tự động.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-6-1',
          title: {
            en: 'Preserving Metadata with @wraps',
            vi: 'Bảo Tồn Metadata Hàm Bằng @wraps',
          },
          tipDetails: {
            situation: {
              en: 'Writing custom function decorators for logging, authentication, caching, or performance timing.',
              vi: 'Viết decorator tùy biến cho việc ghi log, xác thực, bộ nhớ đệm hoặc đo thời gian chạy.',
            },
            quickInsight: {
              en: 'Without `@functools.wraps(fn)`, your wrapper function replaces the original function’s `__name__`, `__doc__`, and `__annotations__`. Debuggers, stack traces, and tools like Sphinx or FastAPI will report `wrapper` instead of the original function name.',
              vi: 'Nếu thiếu `@functools.wraps(fn)`, hàm wrapper sẽ ghi đè toàn bộ `__name__`, `__doc__`, và `__annotations__` của hàm gốc. Trình gỡ lỗi, stack trace và các framework như FastAPI sẽ hiển thị tên hàm là `wrapper` thay vì tên thật.',
            },
            recommendedPattern: {
              en: 'Always decorate the inner `wrapper(*args, **kwargs)` function with `@functools.wraps(fn)`.',
              vi: 'Luôn gắn `@functools.wraps(fn)` lên hàm `wrapper(*args, **kwargs)` bên trong decorator.',
            },
            workingExample: {
              language: 'python',
              filename: 'decorator_wraps.py',
              explanation: {
                en: 'Writing a production-safe timing decorator.',
                vi: 'Viết decorator đo thời gian chuẩn sản xuất với metadata nguyên vẹn.',
              },
              code: `import functools
import time

def timing_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """Timing wrapper execution."""
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[{func.__name__}] took {duration:.4f}s")
        return result
    return wrapper

@timing_decorator
def calculate_metrics(count: int) -> int:
    """Calculate complex system metrics."""
    return sum(range(count))

print(calculate_metrics.__name__)  # 'calculate_metrics' (Preserved!)
print(calculate_metrics.__doc__)   # 'Calculate complex system metrics.'`,
            },
            whyItWorks: {
              en: '`@functools.wraps` copies `__module__`, `__name__`, `__qualname__`, `__doc__`, and `__annotations__` from the wrapped function onto the wrapper object.',
              vi: '`@functools.wraps` tự động sao chép các thuộc tính `__name__`, `__doc__`, `__annotations__`, v.v. từ hàm gốc sang đối tượng wrapper.',
            },
            limitations: {
              en: 'If your wrapper changes argument signatures significantly, inspect `__wrapped__` when testing signature reflection.',
              vi: 'Nếu wrapper thay đổi hoàn toàn tham số truyền vào, hãy kiểm tra thuộc tính `__wrapped__` khi viết unit test.',
            },
            quickTakeaway: {
              en: 'Every decorator wrapper function must be decorated with `@functools.wraps(func)`.',
              vi: 'Mọi hàm wrapper trong decorator bắt buộc phải được gắn `@functools.wraps(func)`.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-7',
      number: 7,
      slug: 'use-pathlib-for-filesystem-paths',
      title: {
        en: '7. Use pathlib.Path for Filesystem Operations',
        vi: '7. Sử Dụng pathlib.Path Cho Mọi Thao Tác File',
      },
      summary: {
        en: 'Replace fragile string concatenations and `os.path` calls with object-oriented cross-platform path manipulation.',
        vi: 'Thay thế nối chuỗi thủ công và `os.path` cũ kỹ bằng thao tác hướng đối tượng tương thích mọi hệ điều hành.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-7-1',
          title: {
            en: 'Modern Object-Oriented Path Handling',
            vi: 'Xử Lý Đường Dẫn Hướng Đối Tượng Hiện Đại',
          },
          tipDetails: {
            situation: {
              en: 'Building file paths, reading file contents, iterating directories, or checking file existence.',
              vi: 'Tạo đường dẫn file, đọc nội dung file, duyệt thư mục hoặc kiểm tra file tồn tại.',
            },
            quickInsight: {
              en: 'Legacy `os.path.join("a", "b")` and `open()` require manual string splits and separator handling that frequently break across Windows backslashes (`\\`) and Unix forward slashes (`/`). `pathlib.Path` provides intuitive `/` path joining, `.read_text()`, `.write_text()`, and `.mkdir(parents=True)`.',
              vi: 'Cách dùng `os.path.join()` cũ và `open()` đòi hỏi xử lý chuỗi thủ công rất dễ gặp lỗi dấu gạch chéo ngược trên Windows (`\\`) so với Linux (`/`). Module `pathlib.Path` cho phép ghép đường dẫn bằng toán tử `/`, cùng các phương thức tiện lợi như `.read_text()`, `.write_text()` và `.mkdir(parents=True)`.',
            },
            recommendedPattern: {
              en: 'Use `from pathlib import Path`. Represent all filesystem locations as `Path` objects rather than raw strings.',
              vi: 'Dùng `from pathlib import Path`. Đại diện cho mọi đường dẫn file bằng đối tượng `Path` thay vì chuỗi thuần.',
            },
            workingExample: {
              language: 'python',
              filename: 'pathlib_idiom.py',
              explanation: {
                en: 'Cross-platform file reading and directory creation in 3 lines.',
                vi: 'Đọc ghi file và tạo thư mục đa nền tảng chỉ trong 3 dòng.',
              },
              code: `from pathlib import Path

# Relative path anchored to current script directory
config_dir = Path(__file__).parent / "configs"
config_dir.mkdir(parents=True, exist_ok=True)

config_file = config_dir / "app_settings.json"
if not config_file.exists():
    config_file.write_text('{"environment": "production"}', encoding="utf-8")

content = config_file.read_text(encoding="utf-8")
print(f"Loaded config: {content}")`,
            },
            whyItWorks: {
              en: '`Path` overrides the division operator (`__truediv__`) to seamlessly join path segments using OS-native separators.',
              vi: '`Path` nạp chồng toán tử chia (`__truediv__`) để ghép các phân đoạn đường dẫn một cách tự nhiên theo chuẩn của từng hệ điều hành.',
            },
            limitations: {
              en: 'Some very old 3rd-party C extensions may expect strings. In such legacy cases, convert via `str(path)` or pass `os.fspath(path)`.',
              vi: 'Một số thư viện C rất cũ có thể yêu cầu chuỗi `str`. Khi đó bạn có thể ép kiểu `str(path)` hoặc dùng `os.fspath(path)`.',
            },
            quickTakeaway: {
              en: 'Stop importing `os.path`. Use standard `pathlib.Path` exclusively.',
              vi: 'Ngừng dùng `os.path`. Hãy chuyển hoàn toàn sang `pathlib.Path` trong mọi dự án hiện đại.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-8',
      number: 8,
      slug: 'use-contextlib-contextmanager',
      title: {
        en: '8. Use contextlib.contextmanager for Lightweight Resources',
        vi: '8. Dùng contextlib.contextmanager Cho Context Manager Gọn Nhẹ',
      },
      summary: {
        en: 'Create custom `with` statement handlers in 5 lines using generators instead of boilerplate classes.',
        vi: 'Tạo bộ quản lý ngữ cảnh `with` trong 5 dòng bằng generator thay vì phải viết class phức tạp.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-8-1',
          title: {
            en: 'Lightweight Context Generators',
            vi: 'Tạo Context Bằng Generator Tiện Lợi',
          },
          tipDetails: {
            situation: {
              en: 'You need temporary resource scoping (e.g. temporary directory, temporary log level, database transaction commit/rollback).',
              vi: 'Bạn cần quản lý ngữ cảnh tạm thời (như thư mục tạm, đổi mức log tạm thời, commit/rollback transaction).',
            },
            quickInsight: {
              en: 'Writing a full class with `__enter__` and `__exit__` involves ~20 lines of boilerplate. `@contextmanager` allows you to write a single generator function: everything before `yield` is setup; everything in `finally:` is teardown.',
              vi: 'Viết một class đầy đủ có cả `__enter__` và `__exit__` tốn khoảng 20 dòng mã mẫu. Decorator `@contextmanager` cho phép bạn viết 1 hàm generator duy nhất: phần trước `yield` là chuẩn bị; phần trong `finally:` là dọn dẹp.',
            },
            recommendedPattern: {
              en: 'Wrap a generator in `@contextlib.contextmanager` and always put cleanup code inside a `try...finally` block.',
              vi: 'Gắn `@contextlib.contextmanager` lên hàm generator và luôn đặt lệnh dọn dẹp trong khối `try...finally`.',
            },
            workingExample: {
              language: 'python',
              filename: 'context_decorator.py',
              explanation: {
                en: 'Temporary environment variable override context manager.',
                vi: 'Context manager ghi đè biến môi trường tạm thời và tự khôi phục.',
              },
              code: `import os
from contextlib import contextmanager

@contextmanager
def temporary_env(key: str, value: str):
    original_val = os.environ.get(key)
    os.environ[key] = value
    try:
        yield  # Control handed over to the 'with' block
    finally:
        if original_val is None:
            os.environ.pop(key, None)
        else:
            os.environ[key] = original_val

with temporary_env("STAGE", "TESTING"):
    print(f"Inside with: {os.environ.get('STAGE')}")
print(f"Outside with: {os.environ.get('STAGE')}")`,
            },
            whyItWorks: {
              en: '`contextmanager` executes the generator up to `yield` on `__enter__`, and resumes the generator on `__exit__`, passing any raised exceptions into `throw()`.',
              vi: '`contextmanager` chạy generator đến `yield` khi vào `__enter__`, và chạy tiếp phần còn lại trong `__exit__`, chuyển ngoại lệ phát sinh vào `throw()`.',
            },
            limitations: {
              en: 'If you need complex state tracking or custom inspection methods on the context object, a class-based context manager is better.',
              vi: 'Nếu cần lưu trạng thái phức tạp hoặc có các phương thức phụ trợ, viết class đầy đủ sẽ phù hợp hơn.',
            },
            quickTakeaway: {
              en: 'Use `@contextmanager` for 90% of custom resource cleanup tasks.',
              vi: 'Dùng `@contextmanager` cho hầu hết các tác vụ dọn dẹp tài nguyên thông thường.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-9',
      number: 9,
      slug: 'use-dataclasses-with-slots-and-frozen',
      title: {
        en: '9. Use dataclasses with slots=True and frozen=True',
        vi: '9. Dùng dataclass Với slots=True và frozen=True',
      },
      summary: {
        en: 'Boost memory efficiency by 60%+ and ensure thread-safe immutability for data-centric domain models.',
        vi: 'Tiết kiệm hơn 60% bộ nhớ RAM và đảm bảo tính bất biến an toàn đa luồng cho các model dữ liệu.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-9-1',
          title: {
            en: 'High-Performance Immutable Domain Objects',
            vi: 'Đối Tượng Dữ Liệu Hiệu Năng Cao & Bất Biến',
          },
          tipDetails: {
            situation: {
              en: 'Modeling domain entities, API payloads, or config structures that carry data without complex OOP behavior.',
              vi: 'Xây dựng entity nghiệp vụ, payload API hoặc cấu trúc config thuần chứa dữ liệu.',
            },
            quickInsight: {
              en: 'Standard Python classes allocate an instance dictionary `__dict__` for dynamic attributes, consuming significant memory. Using `@dataclass(frozen=True, slots=True)` eliminates `__dict__`, cuts memory usage by >60%, prevents accidental attribute typos, and makes instances hashable.',
              vi: 'Class thông thường trong Python cấp phát từ điển `__dict__` để lưu thuộc tính, gây tốn RAM. Dùng `@dataclass(frozen=True, slots=True)` sẽ loại bỏ `__dict__`, giảm hơn 60% RAM, chống gõ sai tên thuộc tính và tự động hỗ trợ băm (hashable).',
            },
            recommendedPattern: {
              en: 'Use `@dataclass(frozen=True, slots=True)` for value objects in Python 3.10+.',
              vi: 'Dùng `@dataclass(frozen=True, slots=True)` cho các đối tượng giá trị (value objects) trên Python 3.10+.',
            },
            workingExample: {
              language: 'python',
              filename: 'dataclass_slots.py',
              explanation: {
                en: 'An immutable, memory-efficient Point3D value object.',
                vi: 'Đối tượng Point3D bất biến, tiết kiệm bộ nhớ và hashable.',
              },
              code: `from dataclasses import dataclass

@dataclass(frozen=True, slots=True)
class GeoPoint:
    lat: float
    lng: float
    label: str = "Unspecified"

p1 = GeoPoint(10.7769, 106.7009, "Saigon")
# p1.lat = 11.0  # Raises FrozenInstanceError!
# p1.invalid_attr = 5  # Raises AttributeError (no __dict__!)

# Safe to use as a dictionary key or in a set
lookup = {p1: "Active Datacenter"}`,
            },
            whyItWorks: {
              en: '`slots=True` assigns fixed C-level array pointers for attributes instead of dynamic hash table lookups.',
              vi: '`slots=True` cấp phát mảng con trỏ C cố định cho các thuộc tính thay vì dùng bảng băm động.',
            },
            limitations: {
              en: '`slots=True` requires Python 3.10+. If you need dynamic runtime attribute attachment, omit `slots=True`.',
              vi: '`slots=True` yêu cầu Python 3.10+. Nếu bạn cần gán thuộc tính tùy ý lúc runtime, hãy bỏ tham số slots.',
            },
            quickTakeaway: {
              en: 'Default your data models to `@dataclass(frozen=True, slots=True)`.',
              vi: 'Hãy đặt `@dataclass(frozen=True, slots=True)` làm lựa chọn mặc định khi tạo model dữ liệu.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-10',
      number: 10,
      slug: 'explicit-exception-boundaries',
      title: {
        en: '10. Use Explicit Exception Boundaries (Never Bare except:)',
        vi: '10. Bắt Ngoại Lệ Tường Minh (Tuyệt Đối Không Dùng Bare except:)',
      },
      summary: {
        en: 'Catch specific exception classes to avoid intercepting KeyboardInterrupt and swallowing real bugs.',
        vi: 'Chỉ bắt các lớp ngoại lệ cụ thể để tránh chặn nhầm KeyboardInterrupt và nuốt lỗi hệ thống.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-10-1',
          title: {
            en: 'Defensive Exception Scoping',
            vi: 'Phạm Vi Bắt Lỗi An Toàn',
          },
          tipDetails: {
            situation: {
              en: 'Handling potential errors during network I/O, file reading, or JSON parsing.',
              vi: 'Xử lý lỗi có thể phát sinh khi gọi mạng, đọc file hoặc phân tích JSON.',
            },
            quickInsight: {
              en: 'Writing `except:` (or `except Exception: pass`) catches `KeyboardInterrupt` (Ctrl+C), `SystemExit`, and memory errors, making programs impossible to stop and masking fatal typos like `NameError`.',
              vi: 'Viết `except:` (hoặc `except Exception: pass`) sẽ bắt nhầm cả `KeyboardInterrupt` (Ctrl+C), `SystemExit` và lỗi bộ nhớ, khiến chương trình không thể dừng và che giấu các lỗi cú pháp nghiêm trọng.',
            },
            recommendedPattern: {
              en: 'Always catch specific exception types (e.g. `except (json.JSONDecodeError, KeyError) as err:`) and log or re-raise with context using `raise NewError(...) from err`.',
              vi: 'Luôn bắt kiểu ngoại lệ cụ thể (ví dụ `except (json.JSONDecodeError, KeyError) as err:`) và ghi log hoặc ném lại lỗi kèm ngữ cảnh bằng cú pháp `raise NewError(...) from err`.',
            },
            workingExample: {
              language: 'python',
              filename: 'explicit_exceptions.py',
              explanation: {
                en: 'Catching specific network and parsing errors with explicit chaining.',
                vi: 'Bắt lỗi cụ thể và liên kết chuỗi ngoại lệ tường minh.',
              },
              code: `import json

def parse_user_payload(raw_json: str) -> dict:
    try:
        data = json.loads(raw_json)
        return {"id": data["user_id"], "email": data["email"]}
    except (json.JSONDecodeError, KeyError) as err:
        # Explicit exception chaining preserves root cause
        raise ValueError(f"Malformed user payload received: {err}") from err`,
            },
            whyItWorks: {
              en: '`from err` populates `__cause__` on the new exception, allowing Sentry and trace logs to display the full root-cause chain.',
              vi: '`from err` lưu vết vào thuộc tính `__cause__`, giúp hệ thống giám sát log hiển thị trọn vẹn chuỗi nguyên nhân gốc.',
            },
            limitations: {
              en: 'Do not catch exceptions too early if the calling layer has better context to handle the failure.',
              vi: 'Không nên bắt ngoại lệ quá sớm nếu tầng gọi bên ngoài có đủ ngữ cảnh để xử lý lỗi tốt hơn.',
            },
            quickTakeaway: {
              en: 'Specify exact exception classes and use `from err` when re-raising.',
              vi: 'Chỉ định đích danh lớp ngoại lệ và luôn dùng `from err` khi ném lại lỗi.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-11',
      number: 11,
      slug: 'prefer-generators-for-streaming',
      title: {
        en: '11. Prefer Generator Expressions for Streaming Pipelines',
        vi: '11. Dùng Biểu Thức Generator Để Xử Lý Dữ Liệu Dạng Luồng',
      },
      summary: {
        en: 'Process millions of records in constant O(1) RAM by chaining lazy generator expressions.',
        vi: 'Xử lý hàng triệu bản ghi với bộ nhớ O(1) không đổi bằng cách kết nối các biểu thức generator lười.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-11-1',
          title: {
            en: 'Memory-Efficient Data Pipelines',
            vi: 'Xây Dựng Pipeline Dữ Liệu Tiết Kiệm RAM',
          },
          tipDetails: {
            situation: {
              en: 'Filtering, mapping, or aggregating large log files, database cursors, or API streams.',
              vi: 'Lọc, chuyển đổi hoặc tính tổng dữ liệu log dung lượng lớn, con trỏ database hoặc stream API.',
            },
            quickInsight: {
              en: 'Using list comprehensions `[x for x in huge_list]` eagerly allocates full arrays in RAM, causing Out-Of-Memory (OOM) crashes. Parenthesized generator expressions `(x for x in huge_list)` yield one item at a time with near-zero memory footprint.',
              vi: 'Dùng list comprehension `[x for x in data]` sẽ nạp toàn bộ mảng vào RAM gây tràn bộ nhớ (OOM). Biểu thức generator trong ngoặc đơn `(x for x in data)` tính toán từng phần tử một với mức tiêu thụ RAM gần như bằng 0.',
            },
            recommendedPattern: {
              en: 'Chain generator expressions like Unix pipes: `source -> filter -> transform -> aggregate`.',
              vi: 'Kết nối các generator expression như các đường ống Unix: `nguồn -> lọc -> biến đổi -> tổng hợp`.',
            },
            workingExample: {
              language: 'python',
              filename: 'generator_stream.py',
              explanation: {
                en: 'Streaming log processor aggregating 4xx/5xx HTTP status codes in O(1) memory.',
                vi: 'Bộ xử lý log dạng luồng tổng hợp mã lỗi HTTP trong bộ nhớ O(1).',
              },
              code: `log_lines = [
    '200 GET /index.html 0.05',
    '500 POST /api/checkout 1.20',
    '404 GET /missing 0.01',
    '200 GET /profile 0.10',
]

# Pipeline Stage 1: parse split tokens lazily
parsed_entries = (line.split() for line in log_lines)

# Pipeline Stage 2: filter error codes (>= 400)
error_entries = (entry for entry in parsed_entries if int(entry[0]) >= 400)

# Pipeline Stage 3: extract response durations
durations = (float(entry[3]) for entry in error_entries)

# Consumes lazily on demand
total_error_time = sum(durations)
print(f"Total error latency: {total_error_time:.2f}s")`,
            },
            whyItWorks: {
              en: 'Generators evaluate lazily item-by-item on the CPU without allocating intermediate arrays.',
              vi: 'Generator chỉ tính toán từng phần tử khi được yêu cầu mà không cấp phát các mảng trung gian.',
            },
            limitations: {
              en: 'Generators can only be consumed once. If you need multiple passes, materialize with `list()` or reconstruct the generator.',
              vi: 'Generator chỉ duyệt được một lần. Nếu cần duyệt nhiều lần, hãy nạp thành `list()` hoặc tạo lại generator.',
            },
            quickTakeaway: {
              en: 'Change `[` to `(` when processing large sequences to unlock instant streaming memory savings.',
              vi: 'Đổi ngoặc vuông `[` thành ngoặc tròn `(` khi xử lý dữ liệu lớn để tiết kiệm RAM tức thì.',
            },
          },
        },
      ],
    },
    {
      id: 'tip-ch-12',
      number: 12,
      slug: 'use-type-hints-for-public-apis',
      title: {
        en: '12. Use Type Hints to Clarify Public APIs',
        vi: '12. Dùng Type Hint Để Làm Rõ Chữ Ký API Công Khai',
      },
      summary: {
        en: 'Turn functions into self-documenting, IDE-autocomplete friendly contracts validated by mypy.',
        vi: 'Biến hàm thành các hợp đồng tự mô tả, hỗ trợ gợi ý code trong IDE và kiểm tra lỗi tĩnh bằng mypy.',
      },
      readTimeMinutes: 2,
      sections: [
        {
          id: 'tip-sec-12-1',
          title: {
            en: 'Modern Typing with Union Operators',
            vi: 'Định Kiểu Hiện Đại Với Toán Tử Hợp (|)',
          },
          tipDetails: {
            situation: {
              en: 'Writing functions and methods consumed by team members or external package users.',
              vi: 'Viết các hàm và phương thức dùng chung trong nhóm hoặc thư viện cho người khác sử dụng.',
            },
            quickInsight: {
              en: 'Type hints in modern Python (3.10+) use clean syntax like `int | None` and `list[str]` without needing heavy imports from `typing`. Type hints catch subtle bugs statically in CI via `mypy` before code ever reaches production.',
              vi: 'Type hint trong Python hiện đại (3.10+) dùng cú pháp gọn gàng như `int | None` và `list[str]` mà không cần import rườm rà. Type hint giúp `mypy` bắt lỗi ngầm ngay trong CI trước khi deploy.',
            },
            recommendedPattern: {
              en: 'Annotate all parameters and return types on public functions and class methods.',
              vi: 'Ghi chú kiểu cho toàn bộ tham số và kiểu trả về trên các hàm và phương thức công khai.',
            },
            workingExample: {
              language: 'python',
              filename: 'modern_typing.py',
              explanation: {
                en: 'Clean type annotations using built-in generic syntax.',
                vi: 'Khai báo kiểu chuẩn hiện đại dùng cú pháp tích hợp sẵn.',
              },
              code: `from collections.abc import Sequence

def find_first_match(
    items: Sequence[str],
    prefix: str,
    default: str | None = None
) -> str | None:
    """Find first item matching prefix or return fallback."""
    for item in items:
        if item.startswith(prefix):
            return item
    return default`,
            },
            whyItWorks: {
              en: 'Type hints are stored in `func.__annotations__` as metadata without adding runtime execution overhead.',
              vi: 'Type hint được lưu trong `__annotations__` dưới dạng metadata mà không làm chậm tốc độ chạy lúc runtime.',
            },
            limitations: {
              en: 'Python remains dynamically typed at runtime; type annotations are not enforced unless verified with tools like `mypy` or `pydantic`.',
              vi: 'Python vẫn là ngôn ngữ định kiểu động lúc runtime; type annotation cần công cụ như `mypy` hoặc `pydantic` để kiểm tra.',
            },
            quickTakeaway: {
              en: 'Type annotate all function boundaries to eliminate documentation drift and prevent type mismatches.',
              vi: 'Khai báo kiểu cho mọi hàm để tránh sai lệch tài liệu và ngăn ngừa lỗi truyền sai kiểu dữ liệu.',
            },
          },
        },
      ],
    },
  ],
};
