import { Chapter } from '../../types';

export const PART_5_CHAPTERS: Chapter[] = [
  // Chapter 16: Concurrency Models & The Global Interpreter Lock (GIL)
  {
    id: 'py-hb-ch-16',
    number: 16,
    partNumber: 5,
    partTitle: {
      en: 'Concurrency, Memory & Modern Python',
      vi: 'Đồng Thời, Bộ Nhớ & Python Hiện Đại',
    },
    slug: 'concurrency-gil-asyncio',
    title: {
      en: 'Concurrency, The GIL & Asyncio',
      vi: 'Lập Trình Đồng Thời, Khóa GIL & Asyncio',
    },
    summary: {
      en: 'CPython Global Interpreter Lock (GIL) mechanics, CPU-bound vs I/O-bound concurrency tradeoffs, multiprocessing memory boundaries, and the asyncio single-threaded cooperative event loop.',
      vi: 'Cơ chế khóa GIL trong CPython, bài toán CPU-bound vs I/O-bound, đa tiến trình multiprocessing và vòng lặp sự kiện hợp tác đơn luồng của asyncio.',
    },
    readTimeMinutes: 23,
    sections: [
      {
        id: 'py-hb-16-1',
        title: {
          en: 'The Global Interpreter Lock (GIL): Why It Exists & How It Works',
          vi: 'Khóa Toàn Cục GIL: Lý Do Tồn Tại & Cơ Chế Hoạt Động',
        },
        content: {
          en: 'The **Global Interpreter Lock (GIL)** is a mutex mechanism used by CPython to prevent multiple native OS threads from executing Python bytecode simultaneously on multiple CPU cores. The GIL exists primarily because CPython memory management is built upon **reference counting (`ob_refcnt`)**; without a global lock, concurrent multi-threaded modifications to reference counters would trigger race conditions and memory corruption. In CPU-bound tasks, multi-threading in Python cannot utilize multiple cores; however, in **I/O-bound tasks** (network sockets, disk I/O, database queries), CPython automatically releases the GIL while waiting for OS system calls, allowing high-throughput concurrent I/O.',
          vi: '**Khóa Toàn Cục GIL (Global Interpreter Lock)** là cơ chế khóa mutex trong CPython ngăn không cho nhiều thread của hệ điều hành thực thi bytecode cùng lúc trên nhiều lõi CPU vật lý. GIL tồn tại chủ yếu vì hệ thống quản lý bộ nhớ của CPython dựa trên **bộ đếm tham chiếu (`ob_refcnt`)**; nếu không có khóa toàn cục, các thread chạy song song sẽ tranh chấp thay đổi bộ đếm tham chiếu dẫn đến xung đột dữ liệu và rò rỉ RAM. Với tác vụ nặng CPU (**CPU-bound**), multi-threading trong Python không tận dụng được đa lõi; tuy nhiên với tác vụ chờ mạng/ổ đĩa (**I/O-bound**), CPython tự động nhả khóa GIL trong khi chờ hệ điều hành phản hồi, mang lại thông lượng xử lý I/O đồng thời rất cao.',
        },
        comparisonTable: {
          headers: [
            { en: 'Concurrency Model', vi: 'Mô Hình Đồng Thời' },
            { en: 'Mechanism', vi: 'Cơ Chế' },
            { en: 'Best Suited For', vi: 'Phù Hợp Nhất Cho' },
            { en: 'Memory & Overhead', vi: 'Bộ Nhớ & Chi Phí' },
          ],
          rows: [
            {
              en: ['threading', 'Native OS threads sharing process memory (bound by GIL)', 'I/O-bound network calls, GUI responsiveness', 'Low memory overhead (~8MB stack per thread)'],
              vi: ['threading', 'Thread hệ điều hành dùng chung bộ nhớ process (bị chặn bởi GIL)', 'Tác vụ I/O mạng, giữ giao diện GUI phản hồi mượt', 'Tốn ít RAM (~8MB stack mỗi thread)'],
            },
            {
              en: ['multiprocessing', 'Independent OS processes with separate memory and independent GILs', 'CPU-bound data crunching, image processing, ML inference', 'Higher memory (separate process copies, IPC serialization cost)'],
              vi: ['multiprocessing', 'Tiến trình OS độc lập với bộ nhớ riêng và từng GIL riêng biệt', 'Tính toán CPU nặng, xử lý ảnh, suy luận Machine Learning', 'Tốn nhiều RAM hơn (mỗi process một bản sao, chi phí truyền tin IPC)'],
            },
            {
              en: ['asyncio', 'Single thread cooperative coroutine event loop (async/await)', 'Massive concurrent network I/O (10,000+ web connections)', 'Ultra-minimal memory overhead (few KB per coroutine)'],
              vi: ['asyncio', 'Vòng lặp sự kiện coroutine hợp tác đơn luồng (async/await)', 'Kết nối mạng đồng thời cực lớn (10,000+ kết nối song song)', 'Dung lượng RAM cực thấp (chỉ vài KB mỗi coroutine)'],
            },
          ],
        },
      },
      {
        id: 'py-hb-16-2',
        title: {
          en: 'The Asyncio Event Loop & Cooperative Multitasking',
          vi: 'Vòng Lặp Sự Kiện Asyncio & Đa Nhiệm Hợp Tác',
        },
        content: {
          en: 'The **asyncio** framework implements **cooperative multitasking** within a single thread using an **Event Loop**. A function declared with `async def` is a **coroutine**. When a coroutine reaches `await some_async_io()`, it pauses its execution frame and yields control back to the event loop. The event loop polls OS non-blocking multiplexers (`epoll` on Linux, `kqueue` on macOS) and resumes waiting coroutines as socket buffers become ready, achieving high-density I/O concurrency with minimal context-switch overhead.',
          vi: 'Thư viện **asyncio** triển khai mô hình **đa nhiệm hợp tác (cooperative multitasking)** trên một luồng duy nhất bằng một **Vòng Lặp Sự Kiện (Event Loop)**. Hàm khai báo bằng `async def` là một **coroutine**. Khi coroutine gặp lệnh `await`, nó tạm dừng khung thực thi và nhường quyền điều khiển lại cho event loop. Event loop giám sát các cổng I/O không khóa (`epoll` trên Linux, `kqueue` trên macOS) và tự động kích hoạt lại coroutine khi dữ liệu sẵn sàng, giúp xử lý hàng vạn kết nối đồng thời với chi phí chuyển ngữ cảnh cực thấp.',
        },
        diagram: {
          title: {
            en: 'Asyncio Event Loop Cooperative Dispatch',
            vi: 'Quy Trình Điều Phối Hợp Tác Của Asyncio Event Loop',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Coroutine Dispatched', vi: 'Điều Phối Coroutine' },
              description: {
                en: 'Event loop runs Coroutine A until it encounters an `await` on non-blocking I/O.',
                vi: 'Event loop chạy Coroutine A cho đến khi gặp lệnh `await` chờ I/O mạng.',
              },
            },
            {
              number: 2,
              label: { en: 'Control Yielded', vi: 'Nhường Quyền Điều Khiển' },
              description: {
                en: 'Coroutine A yields; Event loop immediately switches to run ready Coroutine B.',
                vi: 'Coroutine A nhường quyền; Event loop chuyển ngay sang chạy Coroutine B.',
              },
            },
            {
              number: 3,
              label: { en: 'I/O Notification & Resume', vi: 'Báo Hiệu I/O & Tiếp Tục' },
              description: {
                en: 'OS kernel signals socket ready; Event loop resumes Coroutine A with fetched response.',
                vi: 'Hệ điều hành báo socket đã có dữ liệu; Event loop kích hoạt lại Coroutine A.',
              },
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'asyncio_structured_concurrency.py',
          code: `import asyncio
import time

async def fetch_api_endpoint(name: str, delay: float) -> dict:
    print(f"[{time.strftime('%X')}] Requesting: {name}...")
    await asyncio.sleep(delay)  # Yields control back to event loop
    print(f"[{time.strftime('%X')}] Completed: {name}")
    return {"endpoint": name, "status": 200}

async def main():
    # Python 3.11+ TaskGroup for structured concurrency
    start = time.perf_counter()
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(fetch_api_endpoint("Inventory-Service", 1.0))
        task2 = tg.create_task(fetch_api_endpoint("Payment-Gateway", 1.5))
        task3 = tg.create_task(fetch_api_endpoint("Auth-Provider", 0.5))

    elapsed = time.perf_counter() - start
    print(f"All 3 concurrent network requests completed in {elapsed:.2f}s (Total sequential would be 3.0s)")

# Entrypoint
asyncio.run(main())`,
          explanation: {
            en: 'Demonstrates modern structured concurrency using `asyncio.TaskGroup` introduced in Python 3.11 for error-safe concurrent coroutine execution.',
            vi: 'Minh họa mô hình structured concurrency hiện đại với `asyncio.TaskGroup` trong Python 3.11 giúp thực thi coroutine an toàn và tự động dọn dẹp lỗi.',
          },
        },
        keyTakeaways: {
          en: [
            'The GIL prevents multi-threaded CPU parallelization in CPython, but releases during I/O',
            'Use `multiprocessing` for CPU-bound computations to utilize all physical CPU cores',
            'Use `asyncio` and `async/await` for high-concurrency network services with minimal memory overhead',
          ],
          vi: [
            'Khóa GIL chặn đa luồng CPU trong CPython nhưng tự động nhả khóa khi chờ I/O',
            'Dùng `multiprocessing` cho tác vụ tính toán nặng để tận dụng toàn bộ số nhân CPU',
            'Dùng `asyncio` và `async/await` cho dịch vụ mạng đồng thời lớn với dung lượng RAM siêu nhỏ',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Threading provides preemptive concurrency for I/O bound tasks with shared memory',
          'Multiprocessing provides true hardware parallelism by isolating memory into separate processes',
          'Asyncio provides cooperative concurrency in a single thread by yielding at await points',
        ],
        vi: [
          'Threading cung cấp cơ chế phân chia thời gian cho tác vụ I/O dùng chung bộ nhớ',
          'Multiprocessing mang lại tính song song phần cứng thực sự bằng cách tách riêng từng process',
          'Asyncio cung cấp đa nhiệm hợp tác trên 1 luồng bằng cách nhường quyền tại các điểm await',
        ],
      },
      rules: {
        en: [
          'Never run blocking synchronous code (e.g. `time.sleep()`, synchronous requests) inside an asyncio event loop',
          'Always use Python 3.11+ `asyncio.TaskGroup` instead of raw `asyncio.gather` for safe cancellation semantics',
        ],
        vi: [
          'Tuyệt đối không chạy mã đồng bộ gây nghẽn (như `time.sleep()`) trong event loop của asyncio',
          'Ưu tiên dùng `asyncio.TaskGroup` trong Python 3.11+ thay cho `asyncio.gather` để tự động hủy task khi có lỗi',
        ],
      },
      commonTraps: {
        en: [
          'Using threads for CPU-heavy number crunching expecting a speedup (the GIL actually makes it slower due to thread contention)',
          'Calling an async coroutine without `await`, resulting in unexecuted coroutine objects and runtime warnings',
        ],
        vi: [
          'Dùng đa luồng threading cho tính toán nặng CPU rồi thất vọng vì chương trình chạy chậm hơn do tranh chấp GIL',
          'Gọi hàm async mà quên từ khóa `await` khiến hàm không bao giờ được thực thi',
        ],
      },
      takeaway: {
        en: 'Choosing the right concurrency model — threads for blocking I/O, processes for CPU parallelism, and asyncio for high-throughput network services — ensures optimal system performance.',
        vi: 'Chọn đúng mô hình đồng thời — threads cho I/O chặn, processes cho tính toán song song CPU và asyncio cho dịch vụ mạng thông lượng lớn — đảm bảo hệ thống đạt hiệu năng tối đa.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'Why does running a CPU-intensive loop across 4 threads in CPython often take LONGER to finish than a single-threaded loop?',
          vi: 'Tại sao chạy vòng lặp tính toán nặng CPU trên 4 thread trong CPython thường tốn NHIỀU THỜI GIAN HƠN là chạy trên 1 thread đơn lẻ?',
        },
        hint: {
          en: 'Consider GIL lock acquisition contention and OS thread context switching overhead.',
          vi: 'Hãy nghĩ về sự tranh chấp giành khóa GIL và chi phí chuyển đổi ngữ cảnh (context switch) của hệ điều hành.',
        },
        answer: {
          en: 'Because of the GIL, only one thread can execute bytecode at any instant. Running 4 CPU-bound threads forces the OS to constantly context-switch between threads, each fighting to acquire and release the GIL. The thread switching and synchronization lock contention overhead is added on top of the original work, degrading total execution time.',
          vi: 'Do có khóa GIL, tại một thời điểm chỉ có 1 thread được chạy bytecode. Chạy 4 thread nặng CPU buộc hệ điều hành phải liên tục chuyển ngữ cảnh (context switch) qua lại giữa các thread đang tranh giành khóa GIL. Chi phí quản lý và tranh chấp khóa này cộng dồn vào thời gian chạy, khiến chương trình chậm hơn cả chạy đơn luồng.',
        },
      },
    ],
  },

  // Chapter 17: Modern Type Hints, Typing System & Code Quality
  {
    id: 'py-hb-ch-17',
    number: 17,
    partNumber: 5,
    partTitle: {
      en: 'Concurrency, Memory & Modern Python',
      vi: 'Đồng Thời, Bộ Nhớ & Python Hiện Đại',
    },
    slug: 'type-hints-structural-typing',
    title: {
      en: 'Modern Type Hints & Structural Subtyping',
      vi: 'Gợi Ý Kiểu Dữ Liệu & Duck Typing Cấu Trúc',
    },
    summary: {
      en: 'Modern Python typing syntax (PEP 585 & PEP 604), Generics, TypeVar and ParamSpec, runtime inspection vs static analysis, and structural subtyping with typing.Protocol.',
      vi: 'Cú pháp gợi ý kiểu hiện đại (PEP 585 & 604), Generics, TypeVar và ParamSpec, phản chiếu runtime vs kiểm tra tĩnh và duck typing cấu trúc bằng typing.Protocol.',
    },
    readTimeMinutes: 20,
    sections: [
      {
        id: 'py-hb-17-1',
        title: {
          en: 'Modern Typing Syntax (PEP 585 & PEP 604)',
          vi: 'Cú Pháp Gợi Ý Kiểu Hiện Đại (PEP 585 & PEP 604)',
        },
        content: {
          en: 'Modern Python (3.9+ and 3.10+) eliminates legacy `from typing import List, Dict, Union, Optional` boilerplate: 1) **PEP 585** allows standard built-in collections (`list[str]`, `dict[str, int]`, `tuple[int, ...]`) to be used directly as generic types. 2) **PEP 604** introduces the pipe union operator (`int | str` instead of `Union[int, str]`, and `str | None` instead of `Optional[str]`). Type annotations are purely advisory at runtime; CPython never validates types at execution time, leaving verification to static analysis tools like Mypy and Pyright.',
          vi: 'Python hiện đại (3.9+ và 3.10+) đã loại bỏ hoàn toàn cú pháp rườm rà `from typing import List, Dict, Union, Optional`: 1) **PEP 585** cho phép dùng trực tiếp các kiểu dữ liệu tích hợp sẵn (`list[str]`, `dict[str, int]`, `tuple[int, ...]`) làm kiểu generic. 2) **PEP 604** đưa vào toán tử gạch đứng (`int | str` thay cho `Union[int, str]` và `str | None` thay cho `Optional[str]`). Cần nhớ rằng Type Annotation hoàn toàn không ảnh hưởng tốc độ chạy; CPython không kiểm tra kiểu lúc runtime mà để công việc này cho các công cụ phân tích tĩnh như Mypy và Pyright.',
        },
        codeBlock: {
          language: 'python',
          filename: 'modern_typing_syntax.py',
          code: `from dataclasses import dataclass
from typing import Callable

# Modern built-in generics (PEP 585) & pipe unions (PEP 604)
@dataclass(frozen=True)
class APIResponse:
    payload: dict[str, list[int]]
    error_message: str | None = None
    status_code: int = 200

def parse_input(
    raw_data: str | bytes,
    validator: Callable[[str], bool] | None = None
) -> dict[str, str | int]:
    return {"status": "ok"}`,
          explanation: {
            en: 'Shows clean modern typing using native collections (`dict`, `list`) and union pipes (`str | None`).',
            vi: 'Minh họa cú pháp typing hiện đại với các kiểu dữ liệu gốc (`dict`, `list`) và toán tử hợp (`str | None`).',
          },
        },
      },
      {
        id: 'py-hb-17-2',
        title: {
          en: 'Structural Subtyping (Duck Typing) with typing.Protocol',
          vi: 'Duck Typing Có Cấu Trúc Bằng typing.Protocol',
        },
        content: {
          en: 'Traditional object-oriented programming relies on **Nominal Subtyping** (explicit inheritance: `class Dog(Animal)`). Python is inherently built on **Duck Typing** ("if it walks like a duck and quacks like a duck, it is a duck"). **`typing.Protocol`** (PEP 544) brings static type safety to duck typing via **Structural Subtyping**: a class satisfies a Protocol if it implements the required methods and attributes, without needing to explicitly inherit from the Protocol class.',
          vi: 'Lập trình hướng đối tượng truyền thống dựa trên **Định kiểu theo tên (Nominal Subtyping)** (kế thừa tường minh: `class Dog(Animal)`). Bản chất tự nhiên của Python là **Duck Typing** ("nếu nó đi như vịt và kêu như vịt, nó là vịt"). **`typing.Protocol`** (PEP 544) mang lại sự an toàn kiểu dữ liệu tĩnh cho duck typing thông qua **Định Kiểu Theo Cấu Trúc (Structural Subtyping)**: một class thỏa mãn Protocol nếu nó có đủ các phương thức và thuộc tính yêu cầu mà KHÔNG CẦN phải kế thừa từ Protocol đó.',
        },
        codeBlock: {
          language: 'python',
          filename: 'protocol_duck_typing.py',
          code: `from typing import Protocol

# Structural interface contract
class Renderable(Protocol):
    def render_html(self) -> str: ...

# Independent class with NO explicit inheritance from Renderable
class MarkdownDocument:
    def __init__(self, text: str):
        self.text = text

    def render_html(self) -> str:
        return f"<article>{self.text}</article>"

# Function accepts ANY object that structurally matches Renderable
def publish_content(document: Renderable) -> None:
    html = document.render_html()
    print("Published markup:", html)

# Type checker accepts this cleanly!
doc = MarkdownDocument("Python Handbook Architecture")
publish_content(doc)`,
          explanation: {
            en: '`MarkdownDocument` satisfies `Renderable` structurally without coupling to an abstract base class, preserving clean loose coupling.',
            vi: '`MarkdownDocument` thỏa mãn giao diện `Renderable` một cách tự nhiên mà không cần kế thừa cứng nhắc từ class trừu tượng.',
          },
        },
        keyTakeaways: {
          en: [
            'Modern Python uses native collections (`list[T]`, `dict[K, V]`) and pipe unions (`T | None`)',
            'Type hints are analyzed statically by linters (Mypy/Pyright) and have zero runtime overhead',
            'Use `typing.Protocol` to define structural contracts without rigid class inheritance hierarchies',
          ],
          vi: [
            'Python hiện đại dùng các kiểu dữ liệu gốc (`list[T]`, `dict[K, V]`) và toán tử gạch đứng (`T | None`)',
            'Gợi ý kiểu được kiểm tra tĩnh bởi Mypy/Pyright và hoàn toàn không làm chậm tốc độ chạy',
            'Dùng `typing.Protocol` để định nghĩa hợp đồng cấu trúc mà không cần cấu trúc kế thừa cứng nhắc',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Type annotations are developer contracts verified at build time by static type checkers',
          'Protocols formalize duck typing into statically verifiable structural contracts',
        ],
        vi: [
          'Type annotation là bản cam kết kỹ thuật được kiểm chứng lúc build bởi công cụ phân tích tĩnh',
          'Protocol chuẩn hóa tư duy duck typing thành các hợp đồng cấu trúc có thể kiểm tra kiểu tĩnh',
        ],
      },
      rules: {
        en: [
          'Enable strict mode in Mypy or Pyright in CI/CD pipelines to catch bugs before deployment',
          'Prefer `typing.Protocol` over abstract base classes (`abc.ABC`) for library interfaces',
        ],
        vi: [
          'Bật chế độ strict trong Mypy hoặc Pyright ở quy trình CI/CD để phát hiện lỗi sớm',
          'Ưu tiên dùng `typing.Protocol` hơn là Abstract Base Class (`abc.ABC`) khi thiết kế giao diện thư viện',
        ],
      },
      commonTraps: {
        en: [
          'Assuming Python validates type hints at runtime (e.g. expecting `def f(x: int)` to reject strings automatically)',
        ],
        vi: [
          'Lầm tưởng Python tự kiểm tra kiểu lúc chạy (nghĩ rằng khai báo `x: int` thì truyền chuỗi sẽ bị chặn ngay)',
        ],
      },
      takeaway: {
        en: 'Combining modern type annotations with structural protocols elevates Python codebases to enterprise-grade maintainability without sacrificing the dynamic ergonomics of the language.',
        vi: 'Kết hợp gợi ý kiểu hiện đại và protocol cấu trúc nâng tầm các dự án Python lên chuẩn mực kỹ thuật phần mềm doanh nghiệp mà vẫn giữ trọn sự linh hoạt của ngôn ngữ.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'Why does Python not raise a TypeError at runtime when passing a string to `def square(x: int) -> int:`?',
          vi: 'Tại sao Python không báo lỗi TypeError lúc chạy khi truyền chuỗi vào hàm `def square(x: int) -> int:`?',
        },
        hint: {
          en: 'Consider the runtime role of `__annotations__` versus static analysis.',
          vi: 'Hãy nghĩ về vai trò của từ điển `__annotations__` lúc runtime so với công cụ kiểm tra tĩnh.',
        },
        answer: {
          en: 'In Python, type hints are purely metadata stored in the function `__annotations__` dictionary. The CPython runtime interpreter completely ignores them during bytecode evaluation to ensure maximum execution performance. Type validation must be performed by static type checkers (like Mypy or Pyright) or runtime validation libraries (like Pydantic).',
          vi: 'Trong Python, type hint đơn thuần là siêu dữ liệu được lưu trong dictionary `__annotations__` của hàm. Máy ảo CPython hoàn toàn bỏ qua các chú thích này khi thực thi bytecode để đảm bảo tốc độ chạy nhanh nhất. Việc kiểm tra kiểu phải do các công cụ phân tích tĩnh (Mypy, Pyright) hoặc thư viện runtime validation (như Pydantic) đảm nhận.',
        },
      },
    ],
  },
];
