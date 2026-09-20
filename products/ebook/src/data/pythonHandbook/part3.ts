import { Chapter } from '../../types';

export const PART_3_CHAPTERS: Chapter[] = [
  // Chapter 8: Functions, Parameters & Scoping Rules
  {
    id: 'py-hb-ch-8',
    number: 8,
    partNumber: 3,
    partTitle: {
      en: 'Functions, Scopes & Functional Core',
      vi: 'Hàm, Phạm Vi Biến & Lõi Hàm Học',
    },
    slug: 'functions-parameters-scoping',
    title: {
      en: 'Functions, Parameters & Scoping Rules',
      vi: 'Hàm, Tham Số & Quy Tắc Phạm Vi LEGB',
    },
    summary: {
      en: 'The LEGB variable lookup hierarchy, positional-only (/) and keyword-only (*) arguments, closures and __closure__ cell objects, and global vs nonlocal semantics.',
      vi: 'Hệ thống tra cứu biến LEGB, tham số bắt buộc vị trí (/) và bắt buộc từ khóa (*), closure và đối tượng cell __closure__, ý nghĩa từ khóa global và nonlocal.',
    },
    readTimeMinutes: 19,
    sections: [
      {
        id: 'py-hb-8-1',
        title: {
          en: 'The LEGB Scope Resolution Rule',
          vi: 'Quy Tắc Phân Giải Phạm Vi Biến LEGB',
        },
        content: {
          en: 'When Python encounters a variable name, it searches for the symbol in strict hierarchical order: 1) **L (Local)**: Inside the current executing function frame. 2) **E (Enclosing)**: In enclosing nested function scopes from nearest to outermost. 3) **G (Global)**: At the current module top-level namespace. 4) **B (Built-in)**: In the standard built-in namespace (`builtins.__dict__`). If the symbol is not located in any of these four tiers, Python raises a `NameError`.',
          vi: 'Khi Python gặp một tên biến, nó tìm kiếm biểu tượng đó theo thứ tự phân cấp nghiêm ngặt gọi là LEGB: 1) **L (Local)**: Trong phạm vi hàm hiện tại. 2) **E (Enclosing)**: Trong các hàm bao bọc bên ngoài từ gần nhất đến xa nhất. 3) **G (Global)**: Tại namespace cấp module hiện hành. 4) **B (Built-in)**: Trong namespace các hàm tích hợp sẵn của Python (`builtins.__dict__`). Nếu duyệt qua cả 4 cấp mà không thấy, Python sẽ báo lỗi `NameError`.',
        },
        diagram: {
          title: {
            en: 'The LEGB Lookup Hierarchy',
            vi: 'Cây Phân Cấp Tìm Kiếm Biến LEGB Trong Python',
          },
          steps: [
            {
              number: 1,
              label: { en: 'L — Local Scope', vi: 'L — Cục Bộ (Local)' },
              description: {
                en: 'Searches local function frame fast locals array.',
                vi: 'Tìm trong mảng biến cục bộ của hàm đang thực thi.',
              },
            },
            {
              number: 2,
              label: { en: 'E — Enclosing Scope', vi: 'E — Bao Ngoài (Enclosing)' },
              description: {
                en: 'Searches closure cells in surrounding outer functions.',
                vi: 'Tìm trong các cell closure của các hàm bao ngoài.',
              },
            },
            {
              number: 3,
              label: { en: 'G — Global Scope', vi: 'G — Toàn Cục (Global)' },
              description: {
                en: 'Searches current module __dict__ namespace.',
                vi: 'Tìm trong dictionary namespace của module hiện tại.',
              },
            },
            {
              number: 4,
              label: { en: 'B — Built-in Scope', vi: 'B — Tích Hợp (Built-in)' },
              description: {
                en: 'Searches builtins namespace (len, range, print, exceptions).',
                vi: 'Tìm trong namespace mặc định của ngôn ngữ (len, range, print).',
              },
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'legb_resolution.py',
          code: `level = "GLOBAL"

def outer_function():
    level = "ENCLOSING"

    def inner_function():
        level = "LOCAL"
        print("Resolved tier:", level)  # Resolves 'LOCAL' first

    inner_function()

outer_function()`,
          explanation: {
            en: 'Demonstrates Python resolving the innermost variable binding first before searching enclosing scopes.',
            vi: 'Minh họa Python luôn ưu tiên biến ở phạm vi cục bộ gần nhất trước khi tìm ra ngoài.',
          },
        },
      },
      {
        id: 'py-hb-8-2',
        title: {
          en: 'Positional-Only (/) & Keyword-Only (*) Parameters',
          vi: 'Tham Số Bắt Buộc Vị Trí (/) & Bắt Buộc Từ Khóa (*)',
        },
        content: {
          en: 'Modern Python (PEP 570 and PEP 3102) allows API authors to strictly control parameter calling conventions: 1) Parameters before `/` are **Positional-Only** (callers cannot pass them by name, allowing library maintainers to rename parameters later without breaking callers). 2) Parameters after `*` are **Keyword-Only** (callers must explicitly pass `name=value`, preventing ambiguous boolean arguments).',
          vi: 'Python hiện đại (PEP 570 và PEP 3102) cho phép thiết kế API chuẩn mực bằng cách kiểm soát cách gọi tham số: 1) Các tham số đứng trước dấu `/` là **Bắt buộc vị trí (Positional-Only)** (không thể gọi bằng tên, giúp tác giả thư viện thoải mái đổi tên biến sau này mà không làm hỏng code người dùng). 2) Các tham số đứng sau dấu `*` là **Bắt buộc từ khóa (Keyword-Only)** (bắt buộc phải truyền `key=value`, tránh việc truyền các cờ boolean mơ hồ khó hiểu).',
        },
        codeBlock: {
          language: 'python',
          filename: 'parameter_design.py',
          code: `def query_users(
    endpoint: str,          # Positional or keyword
    /,                      # Preceding arguments are POSITIONAL-ONLY
    max_results: int = 50,  # Positional or keyword
    *,                      # Succeeding arguments are KEYWORD-ONLY
    include_deleted: bool = False,
    timeout_seconds: float = 5.0
) -> list:
    return []

# Valid Calls
query_users("https://api.internal/v1/users", 100, include_deleted=True)
query_users("https://api.internal/v1/users", max_results=20, timeout_seconds=2.0)

# Invalid Calls (Will raise TypeError):
# query_users(endpoint="...") -> TypeError: positional-only argument passed as keyword
# query_users("...", 50, True)  -> TypeError: takes 2 positional arguments but 3 were given`,
          explanation: {
            en: 'Shows strict API contracts using `/` to enforce positional arguments and `*` to mandate keyword clarity for boolean flags.',
            vi: 'Minh họa thiết kế API chuẩn mực với `/` để bắt buộc truyền vị trí và `*` để bắt buộc truyền tên rõ ràng cho các cờ boolean.',
          },
        },
      },
      {
        id: 'py-hb-8-3',
        title: {
          en: 'Closures & __closure__ Cell Objects',
          vi: 'Bản Chất Closure & Đối Tượng Cell __closure__',
        },
        content: {
          en: 'A **Closure** is a nested function that retains access to variables from its lexical enclosing scope even after the outer function has finished executing and exited the call stack. CPython implements closures using **Cell Objects** (`PyCellObject`). Free variables referenced by inner functions are wrapped into shared cells attached to `inner_function.__closure__`, keeping the underlying heap objects alive via reference counting.',
          vi: 'Một **Closure** là một hàm lồng nhau giữ lại quyền truy cập vào các biến từ phạm vi hàm bao ngoài của nó ngay cả khi hàm bao ngoài đã chạy xong và rút khỏi call stack. CPython hiện thực closure bằng các **Đối Tượng Cell (`PyCellObject`)**. Các biến tự do được bọc trong các cell dùng chung gắn vào `inner_function.__closure__`, giữ cho các đối tượng trên heap sống tiếp nhờ bộ đếm tham chiếu.',
        },
        codeBlock: {
          language: 'python',
          filename: 'closure_inspection.py',
          code: `def make_rate_limiter(max_requests: int):
    # 'max_requests' is captured inside the closure cell
    count = 0

    def record_request() -> bool:
        nonlocal count
        if count < max_requests:
            count += 1
            return True
        return False

    return record_request

limiter = make_rate_limiter(2)
print("Request 1:", limiter())  # True
print("Request 2:", limiter())  # True
print("Request 3:", limiter())  # False

# Inspect closure cells
print("Closure cell contents:", [cell.cell_contents for cell in limiter.__closure__])`,
          explanation: {
            en: '`nonlocal` allows mutating variables in enclosing scopes, while `__closure__` reveals the underlying memory cells maintaining state.',
            vi: 'Từ khóa `nonlocal` cho phép thay đổi giá trị biến ở hàm bao ngoài, và `__closure__` cho thấy các cell bộ nhớ đang lưu giữ trạng thái.',
          },
        },
        keyTakeaways: {
          en: [
            'Python resolves symbols using the LEGB (Local, Enclosing, Global, Built-in) rule',
            'Use `/` for positional-only and `*` for keyword-only parameters to design robust APIs',
            'Closures capture enclosing variables in heap-allocated `__closure__` cell objects',
          ],
          vi: [
            'Python tìm kiếm biến theo thứ tự LEGB (Local, Enclosing, Global, Built-in)',
            'Dùng `/` cho tham số vị trí và `*` cho tham số từ khóa để xây dựng API chuẩn',
            'Closure lưu giữ biến của hàm bao ngoài trong các đối tượng cell trên bộ nhớ heap',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Variable names are resolved outward across nested lexical lexical dictionaries',
          'Closures are functions bundled with their enclosing environment cells',
          'Parameter markers (/ and *) create unambiguous call-site contracts',
        ],
        vi: [
          'Tên biến được tra cứu mở rộng dần ra các dictionary namespace bao ngoài',
          'Closure là hàm đi kèm với các cell môi trường bao ngoài của nó',
          'Ký hiệu (/ và *) tạo ra hợp đồng gọi hàm rõ ràng và an toàn',
        ],
      },
      rules: {
        en: [
          'Use `nonlocal` when re-binding a variable from an enclosing outer function',
          'Use keyword-only parameters for boolean flags to eliminate unreadable boolean call sites (`update(True, False)`)',
          'Avoid shadowing built-in names (e.g., do not name variables `list`, `dict`, `id`, `type`)',
        ],
        vi: [
          'Dùng từ khóa `nonlocal` khi cần gán lại giá trị cho biến của hàm bao ngoài',
          'Dùng tham số keyword-only cho cờ boolean để tránh viết code khó hiểu (`update(True, False)`)',
          'Tuyệt đối không đặt tên biến trùng với từ khóa tích hợp sẵn (`list`, `dict`, `id`, `type`)',
        ],
      },
      commonTraps: {
        en: [
          'Late-binding closure variable trap inside loops (creating functions that all capture the final loop index)',
          'Assigning to a global variable inside a function without the `global` keyword causing `UnboundLocalError`',
        ],
        vi: [
          'Bẫy biến late-binding trong vòng lặp (tạo các hàm lambda nhưng đều dính giá trị cuối của vòng lặp)',
          'Gán giá trị cho biến global trong hàm mà quên khai báo `global` gây lỗi `UnboundLocalError`',
        ],
      },
      takeaway: {
        en: 'Mastering LEGB scoping, parameter contracts, and closure cells forms the bedrock for writing robust functional and decorated Python architectures.',
        vi: 'Nắm vững quy tắc phạm vi LEGB, thiết kế tham số và cơ chế closure là nền tảng cốt lõi để viết code hàm học và decorator chuyên nghiệp trong Python.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'Why does `funcs = [lambda: i for i in range(3)]; [f() for f in funcs]` evaluate to `[2, 2, 2]` instead of `[0, 1, 2]`?',
          vi: 'Tại sao đoạn mã `funcs = [lambda: i for i in range(3)]; [f() for f in funcs]` lại trả về `[2, 2, 2]` thay vì `[0, 1, 2]`?',
        },
        hint: {
          en: 'Consider when closure variables are looked up (definition time vs execution time).',
          vi: 'Hãy nghĩ về thời điểm biến closure được tra cứu (lúc định nghĩa hay lúc thực thi hàm).',
        },
        answer: {
          en: 'Python closures use late binding: variables in closures are looked up when the inner function is CALLED, not when it is defined. By the time `f()` is executed, the loop has completed and the shared variable `i` is `2`. To fix this, bind the current value immediately as a default argument: `lambda i=i: i`.',
          vi: 'Closure trong Python áp dụng cơ chế late-binding: biến trong closure được tra cứu tại thời điểm hàm ĐƯỢC GỌI, chứ không phải lúc định nghĩa. Khi các hàm `f()` chạy thì vòng lặp đã kết thúc và biến `i` đang mang giá trị `2`. Để khắc phục, hãy gán giá trị tại chỗ qua tham số mặc định: `lambda i=i: i`.',
        },
      },
    ],
  },

  // Chapter 9: First-Class Functions, Closures & Decorators
  {
    id: 'py-hb-ch-9',
    number: 9,
    partNumber: 3,
    partTitle: {
      en: 'Functions, Scopes & Functional Core',
      vi: 'Hàm, Phạm Vi Biến & Lõi Hàm Học',
    },
    slug: 'functions-closures-decorators',
    title: {
      en: 'First-Class Functions & Decorators',
      vi: 'Hàm First-Class & Cơ Chế Decorators',
    },
    summary: {
      en: 'Functions as first-class objects, decorator transformation mechanics, metadata preservation with functools.wraps, parameterized decorator factories, and class decorators.',
      vi: 'Bản chất hàm là đối tượng hạng nhất, cơ chế biến đổi decorator, bảo toàn metadata bằng functools.wraps, decorator có tham số và class decorator.',
    },
    readTimeMinutes: 20,
    sections: [
      {
        id: 'py-hb-9-1',
        title: {
          en: 'Functions as First-Class Objects & Decorator Syntax',
          vi: 'Hàm Là Đối Tượng Hạng Nhất & Cú Pháp Decorator',
        },
        content: {
          en: 'In Python, functions are **first-class citizens**: they can be assigned to variables, passed as arguments to other functions, and returned from functions dynamically. The `@decorator` syntax is pure syntactic sugar for higher-order function composition. Writing `@my_decorator\ndef my_func(): ...` is 100% equivalent to `my_func = my_decorator(my_func)` evaluated when the module loads.',
          vi: 'Trong Python, hàm là **đối tượng hạng nhất (first-class citizens)**: chúng có thể được gán vào biến, truyền làm tham số cho hàm khác và trả về từ một hàm như bất kỳ đối tượng nào. Cú pháp `@decorator` thực chất là cú pháp rút gọn cho phép hợp hàm bậc cao. Viết `@my_decorator\ndef my_func(): ...` hoàn toàn tương đương với phép gán `my_func = my_decorator(my_func)` khi nạp module.',
        },
        diagram: {
          title: {
            en: 'Decorator Transformation Pipeline',
            vi: 'Quy Trình Chuyển Đổi Của Decorator',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Function Defined', vi: 'Định Nghĩa Hàm Gốc' },
              description: {
                en: 'Original function object is compiled into memory.',
                vi: 'Hàm gốc được biên dịch và tạo đối tượng trên bộ nhớ.',
              },
            },
            {
              number: 2,
              label: { en: 'Decorator Interception', vi: 'Decorator Tiếp Nhận' },
              description: {
                en: 'Decorator receives original function as argument.',
                vi: 'Hàm decorator nhận hàm gốc làm tham số đầu vào.',
              },
            },
            {
              number: 3,
              label: { en: 'Wrapper Replacement', vi: 'Thay Thế Bằng Wrapper' },
              description: {
                en: 'Decorator returns wrapper function; symbol name is re-bound to wrapper.',
                vi: 'Decorator trả về hàm wrapper; tên hàm ban đầu được gán lại vào wrapper.',
              },
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'basic_timing_decorator.py',
          code: `import functools
import time
from typing import Callable, Any

def timer(func: Callable) -> Callable:
    @functools.wraps(func)  # Preserves __name__, __doc__, and type annotations
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start_time
        print(f"Executed [{func.__name__}] in {duration * 1000:.2f}ms")
        return result
    return wrapper

@timer
def process_batch(items: list[int]) -> int:
    """Calculates sum of squared integers."""
    return sum(x**2 for x in items)

total = process_batch([1, 2, 3, 4, 5])
print("Function name preserved:", process_batch.__name__)  # 'process_batch'
print("Docstring preserved:", process_batch.__doc__)        # 'Calculates sum...'`,
          explanation: {
            en: 'Demonstrates implementing a timing decorator and using `functools.wraps` to preserve critical function introspection metadata.',
            vi: 'Minh họa cách viết decorator đo thời gian chạy và dùng `functools.wraps` để bảo toàn metadata phản chiếu của hàm gốc.',
          },
        },
      },
      {
        id: 'py-hb-9-2',
        title: {
          en: 'Parameterized Decorators (Decorator Factories)',
          vi: 'Decorator Có Tham Số (Decorator Factory)',
        },
        content: {
          en: 'When a decorator needs custom configuration arguments (such as `@retry(max_attempts=3, backoff=2.0)`), you must implement a **3-tier Decorator Factory**. The outer function accepts the configuration arguments and returns the actual decorator function, which in turn accepts the target function and returns the final wrapper.',
          vi: 'Khi decorator cần nhận các tham số tùy chỉnh (như `@retry(max_attempts=3, backoff=2.0)`), bạn phải xây dựng **Decorator Factory gồm 3 tầng lồng nhau**. Tầng ngoài cùng nhận tham số cấu hình và trả về hàm decorator thực sự; tầng này nhận hàm cần bọc và trả về hàm wrapper cuối cùng.',
        },
        codeBlock: {
          language: 'python',
          filename: 'retry_decorator_factory.py',
          code: `import functools
import time
from typing import Callable, Type

def retry(max_attempts: int = 3, delay: float = 0.5, exceptions: tuple[Type[Exception], ...] = (Exception,)):
    """Decorator factory that retries flaky network/database calls."""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_err = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_err = e
                    if attempt < max_attempts:
                        time.sleep(delay)
            raise last_err
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.1, exceptions=(ConnectionError, TimeoutError))
def fetch_user_data(user_id: str) -> dict:
    # Simulates network request
    return {"id": user_id, "status": "active"}`,
          explanation: {
            en: 'A 3-tier closure factory that encapsulates retry policies cleanly without polluting business code.',
            vi: 'Cấu trúc closure 3 tầng đóng gói cơ chế retry một cách sạch sẽ mà không làm rối mã nghiệp vụ.',
          },
        },
        keyTakeaways: {
          en: [
            'Decorators wrap and transform functions at module load time',
            'Always apply `@functools.wraps(func)` inside wrappers to preserve introspection metadata',
            'Parameterized decorators require a 3-tier factory returning a decorator function',
          ],
          vi: [
            'Decorator bọc và biến đổi hàm ngay tại thời điểm nạp module',
            'Luôn gắn `@functools.wraps(func)` trong wrapper để bảo toàn thông tin metadata phản chiếu',
            'Decorator có tham số yêu cầu cấu trúc factory 3 tầng trả về hàm decorator',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Decorators are higher-order function transformers that re-bind function symbols',
          'Wrapper functions intercept calls, execute pre/post logic, and forward return values',
        ],
        vi: [
          'Decorator là bộ biến đổi hàm bậc cao gán lại biểu tượng hàm cho wrapper mới',
          'Hàm wrapper chặn trước và sau khi gọi hàm gốc, chuyển tiếp giá trị trả về',
        ],
      },
      rules: {
        en: [
          'Never forget `@functools.wraps(func)` to prevent breaking docstrings and debugger inspection',
          'Always accept `*args, **kwargs` in wrapper functions to support arbitrary call signatures',
        ],
        vi: [
          'Không bao giờ quên `@functools.wraps(func)` để tránh làm mất docstring và làm hỏng debugger',
          'Luôn nhận `*args, **kwargs` trong wrapper để tương thích với mọi dạng chữ ký hàm',
        ],
      },
      commonTraps: {
        en: [
          'Assuming decorator code inside the outer function runs per request (it runs once at module import)',
          'Forgetting to return the inner wrapper from the decorator function',
        ],
        vi: [
          'Lầm tưởng mã ở tầng ngoài decorator chạy mỗi khi gọi hàm (thực tế chỉ chạy 1 lần khi import)',
          'Quên câu lệnh `return wrapper` ở cuối hàm decorator',
        ],
      },
      takeaway: {
        en: 'Decorators are the premier abstraction for cross-cutting concerns (logging, authentication, caching, retries) in idiomatic Python.',
        vi: 'Decorator là giải pháp trừu tượng hóa hàng đầu cho các tác vụ cắt ngang (logging, xác thực, cache, retry) trong lập trình Python chuẩn mực.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'What happens if you omit `@functools.wraps(func)` in a decorator wrapper?',
          vi: 'Điều gì xảy ra nếu bạn không sử dụng `@functools.wraps(func)` trong hàm wrapper của decorator?',
        },
        hint: {
          en: 'Consider `__name__`, `__doc__`, and `__annotations__` attributes.',
          vi: 'Hãy nghĩ về các thuộc tính phản chiếu như `__name__`, `__doc__` và `__annotations__`.',
        },
        answer: {
          en: 'Without `@functools.wraps(func)`, the decorated function permanently assumes the identity of the wrapper function. Its `__name__` becomes `"wrapper"`, `__doc__` is erased or replaced by the wrapper docstring, and type signature introspection in tools like Sphinx, FastAPI, and debuggers breaks.',
          vi: 'Nếu thiếu `@functools.wraps(func)`, hàm được bọc sẽ mang danh tính của hàm wrapper. Thuộc tính `__name__` bị đổi thành `"wrapper"`, `__doc__` bị mất hoặc ghi đè, làm hỏng các công cụ tự động sinh tài liệu như Sphinx, FastAPI và công cụ debug.',
        },
      },
    ],
  },

  // Chapter 10: Iterators, Generators & The Iteration Protocol
  {
    id: 'py-hb-ch-10',
    number: 10,
    partNumber: 3,
    partTitle: {
      en: 'Functions, Scopes & Functional Core',
      vi: 'Hàm, Phạm Vi Biến & Lõi Hàm Học',
    },
    slug: 'iterators-generators-protocol',
    title: {
      en: 'Iterators, Generators & The Iteration Protocol',
      vi: 'Iterators, Generators & Giao Thức Lặp',
    },
    summary: {
      en: 'The iteration protocol (__iter__ and __next__), generator frame pausing and resumption mechanics, StopIteration signaling, and subgenerator delegation with yield from.',
      vi: 'Giao thức lặp (__iter__ và __next__), cơ chế tạm dừng và tiếp tục frame của generator, tín hiệu StopIteration và ủy quyền generator con với yield from.',
    },
    readTimeMinutes: 21,
    sections: [
      {
        id: 'py-hb-10-1',
        title: {
          en: 'The Iteration Protocol: __iter__ & __next__',
          vi: 'Giao Thức Lặp: Phương Thức __iter__ & __next__',
        },
        content: {
          en: 'Iteration is the backbone of Python data processing. The **Iteration Protocol** establishes two distinct contracts: 1) An **Iterable** is an object providing an `__iter__()` method that returns an Iterator. 2) An **Iterator** is a stateful object providing a `__next__()` method that returns the next sequential item or raises a `StopIteration` exception when the stream is exhausted. Iterators also implement `__iter__()` returning `self`, allowing them to be consumed directly in `for` loops.',
          vi: 'Vòng lặp là xương sống trong xử lý dữ liệu của Python. **Giao thức lặp (Iteration Protocol)** quy định 2 hợp đồng phân biệt: 1) **Iterable** là đối tượng có phương thức `__iter__()` trả về một Iterator. 2) **Iterator** là đối tượng lưu trạng thái có phương thức `__next__()` trả về phần tử tiếp theo hoặc phát ra exception `StopIteration` khi luồng dữ liệu kết thúc. Bản thân Iterator cũng có phương thức `__iter__()` trả về chính nó (`self`), giúp nó chạy trực tiếp trong vòng lặp `for`.',
        },
        diagram: {
          title: {
            en: 'Python Iteration Protocol State Machine',
            vi: 'Máy Trạng Thái Của Giao Thức Lặp Trong Python',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Request Iterator', vi: 'Lấy Iterator' },
              description: {
                en: 'for item in obj calls iterator = iter(obj) -> obj.__iter__().',
                vi: 'Vòng for gọi iterator = iter(obj) để nhận đối tượng iterator.',
              },
            },
            {
              number: 2,
              label: { en: 'Fetch Next Item', vi: 'Lấy Phần Tử Tiếp Theo' },
              description: {
                en: 'VM calls next(iterator) -> iterator.__next__() returning value.',
                vi: 'Máy ảo gọi next(iterator) để lấy giá trị tiếp theo.',
              },
            },
            {
              number: 3,
              label: { en: 'StopIteration Exit', vi: 'Kết Thúc Bằng StopIteration' },
              description: {
                en: 'When stream ends, __next__() raises StopIteration; loop catches and terminates cleanly.',
                vi: 'Khi hết dữ liệu, __next__() bắn StopIteration; vòng for bắt lỗi và dừng mượt mà.',
              },
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'custom_iterator.py',
          code: `class Countdown:
    def __init__(self, start: int):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self) -> int:
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

# Consuming custom iterator
for num in Countdown(3):
    print(f"T-minus {num}")`,
          explanation: {
            en: 'Demonstrates implementing `__iter__` and `__next__` to create a custom stateful iterator that signals termination via `StopIteration`.',
            vi: 'Minh họa cài đặt `__iter__` và `__next__` để tạo iterator lưu trạng thái tùy chỉnh kết thúc bằng `StopIteration`.',
          },
        },
      },
      {
        id: 'py-hb-10-2',
        title: {
          en: 'Generator Functions: Frame Pausing & yield Mechanics',
          vi: 'Hàm Generator: Cơ Chế Đóng Băng Frame & Lệnh yield',
        },
        content: {
          en: 'A **Generator Function** is any function containing the `yield` keyword. When invoked, it does NOT execute the function body immediately; instead, it returns a `generator` object. When `next()` is called on the generator, CPython executes the frame until it reaches a `yield` statement. The VM yields the value, freezes the execution frame (preserving all local variable registers and instruction pointers on the heap), and transfers control back to the caller.',
          vi: 'Một **Hàm Generator** là bất kỳ hàm nào chứa từ khóa `yield`. Khi được gọi, nó KHÔNG chạy mã trong thân hàm ngay mà trả về một đối tượng `generator`. Khi gọi `next()` trên generator, CPython thực thi frame cho đến khi gặp lệnh `yield`. Máy ảo trả về giá trị, đóng băng khung thực thi (lưu toàn bộ biến cục bộ và con trỏ chỉ thị trên heap) rồi nhường quyền điều khiển lại cho caller.',
        },
        codeBlock: {
          language: 'python',
          filename: 'streaming_log_reader.py',
          code: `from typing import Iterator

def stream_large_log(file_path: str) -> Iterator[str]:
    """Yields log lines matching 'ERROR' one-by-one with O(1) memory."""
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            if "ERROR" in line:
                yield line.strip()

# Lazy consumption over multi-gigabyte file
# for err in stream_large_log("production.log"):
#     alert_sre_team(err)`,
          explanation: {
            en: 'Generators turn unbounded file streams into lazy memory-safe pipelines.',
            vi: 'Generator biến các file log nhiều gigabyte thành đường ống xử lý an toàn bộ nhớ.',
          },
        },
      },
      {
        id: 'py-hb-10-3',
        title: {
          en: 'Subgenerator Delegation with yield from',
          vi: 'Ủy Quyền Generator Con Với yield from',
        },
        content: {
          en: 'The `yield from <iterable>` syntax (PEP 380) establishes a transparent bi-directional communication channel between a caller and a nested subgenerator. It automatically yields all values from the subgenerator, forwards incoming values sent via `.send()`, forwards exceptions thrown via `.throw()`, and captures the subgenerator return value (`return result`) directly into an assignment expression.',
          vi: 'Cú pháp `yield from <iterable>` (PEP 380) thiết lập kênh giao tiếp hai chiều trong suốt giữa caller và generator con lồng bên trong. Nó tự động yield toàn bộ giá trị từ generator con, chuyển tiếp các giá trị gửi vào qua `.send()`, chuyển tiếp ngoại lệ qua `.throw()` và bắt giá trị `return` của generator con trực tiếp vào biến.',
        },
        codeBlock: {
          language: 'python',
          filename: 'yield_from_chaining.py',
          code: `def flatten_tree(node):
    if isinstance(node, list):
        for child in node:
            yield from flatten_tree(child)  # Delegate to nested subgenerator
    else:
        yield node

nested_tree = [1, [2, [3, 4], 5], [6, 7]]
print("Flattened tree:", list(flatten_tree(nested_tree)))  # [1, 2, 3, 4, 5, 6, 7]`,
          explanation: {
            en: 'Demonstrates elegant recursive flattening using `yield from` subgenerator delegation.',
            vi: 'Minh họa cách làm phẳng cây đệ quy thanh lịch bằng cơ chế ủy quyền `yield from`.',
          },
        },
        keyTakeaways: {
          en: [
            'The iteration protocol requires `__iter__()` on Iterables and `__next__()` on Iterators',
            '`yield` pauses the function frame on the heap, resuming seamlessly on the next call',
            'Use `yield from` to delegate iteration cleanly to nested subgenerators',
          ],
          vi: [
            'Giao thức lặp yêu cầu `__iter__()` trên Iterable và `__next__()` trên Iterator',
            '`yield` đóng băng frame hàm trên heap và tiếp tục chạy mượt mà ở lần gọi kế tiếp',
            'Dùng `yield from` để ủy quyền duyệt dữ liệu cho các generator con lồng nhau',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Iterators are unidirectional stateful streams driven by pull requests (next())',
          'Generators are resumable stack frames preserved in heap memory across yields',
        ],
        vi: [
          'Iterator là luồng dữ liệu 1 chiều có lưu trạng thái hoạt động theo cơ chế kéo (pull)',
          'Generator là các stack frame có thể đóng băng và phục hồi nằm trên bộ nhớ heap',
        ],
      },
      rules: {
        en: [
          'Always signal the end of a custom iterator stream by raising `StopIteration`',
          'Use generators whenever transforming large or infinite sequence streams',
        ],
        vi: [
          'Luôn báo hiệu kết thúc luồng dữ liệu của iterator tùy chỉnh bằng lỗi `StopIteration`',
          'Dùng generator bất cứ khi nào xử lý chuỗi dữ liệu lớn hoặc vô hạn',
        ],
      },
      commonTraps: {
        en: [
          'Attempting to re-iterate a generator that has already been exhausted',
          'Catching StopIteration inside a generator function without converting it to return (PEP 479)',
        ],
        vi: [
          'Cố gắng duyệt lại một generator đã duyệt xong (nó sẽ luôn rỗng)',
          'Để lộ StopIteration bên trong generator mà không dùng return (vi phạm PEP 479)',
        ],
      },
      takeaway: {
        en: 'The iteration protocol and generators transform memory-heavy data pipelines into blazing-fast, constant-memory stream processors.',
        vi: 'Giao thức lặp và generator biến các luồng xử lý tốn bộ nhớ thành các đường ống stream tốc độ cao với dung lượng RAM cố định O(1).',
      },
    },
    selfReview: [
      {
        question: {
          en: 'What is the difference between an Iterable and an Iterator in Python?',
          vi: 'Sự khác biệt giữa Iterable và Iterator trong Python là gì?',
        },
        hint: {
          en: 'Check which one possesses state and the `__next__` method.',
          vi: 'Hãy xem đối tượng nào lưu trạng thái vị trí và sở hữu phương thức `__next__`.',
        },
        answer: {
          en: 'An Iterable is any collection (like `list`, `dict`, `str`) that implements `__iter__()` returning a new Iterator. An Iterator is a stateful object that implements `__next__()` (advancing through the sequence) and `__iter__()` (returning itself). Iterables can be iterated many times; Iterators are single-pass streams.',
          vi: 'Iterable là tập hợp (như `list`, `dict`, `str`) có phương thức `__iter__()` trả về một Iterator mới. Iterator là đối tượng lưu vị trí con trỏ có phương thức `__next__()` và `__iter__()` trả về chính nó. Iterable duyệt lại được nhiều lần; Iterator chỉ duyệt được 1 lần.',
        },
      },
    ],
  },

  // Chapter 11: Context Managers & Resource Management
  {
    id: 'py-hb-ch-11',
    number: 11,
    partNumber: 3,
    partTitle: {
      en: 'Functions, Scopes & Functional Core',
      vi: 'Hàm, Phạm Vi Biến & Lõi Hàm Học',
    },
    slug: 'context-managers-resources',
    title: {
      en: 'Context Managers & Resource Management',
      vi: 'Context Managers & Quản Lý Tài Nguyên',
    },
    summary: {
      en: 'The context manager protocol (__enter__ and __exit__), exception suppression rules, the contextlib.contextmanager generator pattern, and async context managers.',
      vi: 'Giao thức context manager (__enter__ và __exit__), quy tắc triệt tiêu ngoại lệ, mẫu generator contextlib.contextmanager và async context manager.',
    },
    readTimeMinutes: 18,
    sections: [
      {
        id: 'py-hb-11-1',
        title: {
          en: 'The Context Manager Protocol: __enter__ & __exit__',
          vi: 'Giao Thức Context Manager: __enter__ & __exit__',
        },
        content: {
          en: 'The `with` statement guarantees deterministic resource acquisition and release (RAII pattern) even if unhandled exceptions occur. The **Context Manager Protocol** consists of two magic methods: 1) `__enter__()`: Prepares the resource (e.g., opens a file, acquires a thread lock, starts a database transaction) and returns the bound target object. 2) `__exit__(exc_type, exc_val, exc_tb)`: Always executes upon leaving the block, releasing resources. If an exception occurred inside the block, returning `True` from `__exit__` suppresses the exception; returning `False` or `None` allows it to propagate.',
          vi: 'Câu lệnh `with` đảm bảo việc cấp phát và giải phóng tài nguyên một cách tất định (mẫu RAII) ngay cả khi có lỗi xảy ra. **Giao thức Context Manager** gồm 2 phương thức đặc biệt: 1) `__enter__()`: Chuẩn bị tài nguyên (mở file, khóa thread lock, mở transaction DB) và trả về đối tượng liên kết. 2) `__exit__(exc_type, exc_val, exc_tb)`: Luôn luôn được gọi khi thoát khỏi khối `with` để dọn dẹp tài nguyên. Nếu có ngoại lệ phát sinh trong khối, trả về `True` từ `__exit__` sẽ dập tắt lỗi; trả về `False` hoặc `None` sẽ để lỗi tiếp tục bắn ra ngoài.',
        },
        codeBlock: {
          language: 'python',
          filename: 'custom_context_manager.py',
          code: `import time
from typing import Optional, Type
from types import TracebackType

class ExecutionBenchmark:
    def __init__(self, label: str):
        self.label = label
        self.start_time: float = 0.0

    def __enter__(self) -> "ExecutionBenchmark":
        self.start_time = time.perf_counter()
        return self

    def __exit__(
        self,
        exc_type: Optional[Type[BaseException]],
        exc_val: Optional[BaseException],
        exc_tb: Optional[TracebackType]
    ) -> bool:
        duration = time.perf_counter() - self.start_time
        print(f"[{self.label}] Elapsed: {duration * 1000:.2f}ms")
        if exc_type is not None:
            print(f"[{self.label}] Handled exception: {exc_val}")
        return False  # Do not suppress exceptions

with ExecutionBenchmark("Matrix Inversion"):
    total = sum(i**2 for i in range(100_000))`,
          explanation: {
            en: 'Demonstrates implementing `__enter__` and `__exit__` with full type signatures for exception handling and cleanup.',
            vi: 'Minh họa cách cài đặt `__enter__` và `__exit__` với đầy đủ type annotation để xử lý ngoại lệ và dọn dẹp tài nguyên.',
          },
        },
      },
      {
        id: 'py-hb-11-2',
        title: {
          en: 'The contextlib.contextmanager Generator Factory',
          vi: 'Mẫu Tạo Context Manager Nhanh Bằng contextlib.contextmanager',
        },
        content: {
          en: 'Implementing boilerplate classes with `__enter__` and `__exit__` is often verbose. The standard library `@contextlib.contextmanager` decorator converts a simple generator function into a full context manager. Code before the `yield` statement acts as `__enter__`, the yielded value is bound to the `as` target, and code inside a `finally:` block after `yield` executes reliably as `__exit__`.',
          vi: 'Viết class với `__enter__` và `__exit__` đôi khi dài dòng. Decorator `@contextlib.contextmanager` trong thư viện chuẩn cho phép biến một hàm generator đơn giản thành một context manager hoàn chỉnh. Phần mã trước `yield` đóng vai trò là `__enter__`, giá trị được `yield` sẽ gán vào biến sau `as`, và phần mã trong khối `finally:` sau `yield` sẽ chạy như `__exit__`.',
        },
        codeBlock: {
          language: 'python',
          filename: 'contextmanager_decorator.py',
          code: `import contextlib
import os

@contextlib.contextmanager
def temporary_working_directory(target_path: str):
    """Safely switches current working directory and restores it on exit."""
    previous_dir = os.getcwd()
    try:
        os.chdir(target_path)
        yield target_path
    finally:
        os.chdir(previous_dir)

# Usage ensures directory restoration even if exceptions occur inside block
# with temporary_working_directory("/tmp"):
#     process_artifacts()`,
          explanation: {
            en: 'The `try...finally` structure guarantees directory restoration regardless of success or failure.',
            vi: 'Cấu trúc `try...finally` đảm bảo thư mục làm việc luôn được hoàn trả trạng thái cũ dù thành công hay gặp lỗi.',
          },
        },
        keyTakeaways: {
          en: [
            'Context managers enforce deterministic resource cleanup via `with` blocks',
            '`__exit__` receives exception details; returning `True` suppresses the error',
            'Use `@contextlib.contextmanager` to write concise generator-based context managers',
          ],
          vi: [
            'Context manager đảm bảo dọn dẹp tài nguyên tất định thông qua khối `with`',
            '`__exit__` nhận thông tin ngoại lệ; trả về `True` sẽ dập tắt lỗi đó',
            'Dùng `@contextlib.contextmanager` để viết context manager nhanh gọn bằng generator',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Context managers wrap code blocks in deterministic setup and teardown guarantees',
          'Exceptions inside `with` blocks are routed through `__exit__` before propagating',
        ],
        vi: [
          'Context manager bao bọc khối lệnh với cam kết khởi tạo và dọn dẹp chắc chắn',
          'Ngoại lệ phát sinh trong `with` luôn được chuyển qua `__exit__` trước khi văng ra ngoài',
        ],
      },
      rules: {
        en: [
          'Always use `with` when managing sockets, files, locks, and database transactions',
          'Always place cleanup code inside `finally:` when using `@contextlib.contextmanager`',
        ],
        vi: [
          'Luôn dùng `with` khi thao tác với socket, file, lock thread và transaction cơ sở dữ liệu',
          'Luôn đặt mã dọn dẹp trong khối `finally:` khi dùng `@contextlib.contextmanager`',
        ],
      },
      commonTraps: {
        en: [
          'Returning `True` from `__exit__` inadvertently swallowing critical unexpected bugs',
          'Forgetting `try...finally` in generator context managers leading to leaked locks if an error occurs before cleanup',
        ],
        vi: [
          'Vô tình trả về `True` trong `__exit__` làm nuốt chửng các lỗi nghiêm trọng mà không biết',
          'Quên khối `try...finally` trong generator context manager khiến tài nguyên bị rò rỉ nếu phát sinh lỗi',
        ],
      },
      takeaway: {
        en: 'Context managers eliminate resource leaks and provide clean, declarative lifecycle management across complex applications.',
        vi: 'Context manager loại bỏ triệt để nguy cơ rò rỉ tài nguyên và mang lại cơ chế quản lý vòng đời tường minh cho các hệ thống phần mềm lớn.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'How does an `__exit__` method tell Python to suppress an exception raised inside the `with` block?',
          vi: 'Phương thức `__exit__` làm thế nào để báo cho Python biết là cần dập tắt ngoại lệ phát sinh trong khối `with`?',
        },
        hint: {
          en: 'What return value signals error handling completion?',
          vi: 'Giá trị trả về nào báo hiệu ngoại lệ đã được xử lý xong?',
        },
        answer: {
          en: 'An `__exit__` method suppresses an exception by returning a truthy value (specifically `True`). If `__exit__` returns `False`, `None`, or finishes without an explicit return statement, Python automatically re-raises the exception up the call stack.',
          vi: 'Phương thức `__exit__` dập tắt ngoại lệ bằng cách trả về giá trị chân lý (cụ thể là `True`). Nếu `__exit__` trả về `False`, `None` hoặc không return gì, Python sẽ tự động bắn tiếp ngoại lệ đó lên call stack.',
        },
      },
    ],
  },
];
