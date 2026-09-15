import { Lesson } from '../../../../types';

export const lesson34: Lesson = {
  id: 'py_lesson_34',
  moduleId: 'py_mod_14',
  levelId: 'advanced',
  courseId: 'python',
  order: 34,
  topicId: 'python_concurrency_gil_threading_multiprocessing_asyncio',
  title: {
    en: 'Modern Concurrency: GIL Architecture, Threading, Multiprocessing & AsyncIO',
    vi: 'Kiến Trúc Đa Nhiệm Hiện Đại: Khóa GIL, Threading, Multiprocessing & AsyncIO'
  },
  summary: {
    en: 'Master high-concurrency systems design in Python: understand CPython\'s Global Interpreter Lock (GIL), choose correctly between Threading (I/O-bound with blocking APIs), Multiprocessing (CPU-bound true parallelism across cores), and AsyncIO (single-threaded cooperative event loops with async/await and asyncio.gather).',
    vi: 'Làm chủ thiết kế hệ thống đa nhiệm hiệu năng cao trong Python: hiểu sâu về khóa GIL của CPython, lựa chọn chính xác giữa Threading (tác vụ I/O blocking), Multiprocessing (xử lý CPU đa nhân song song thực sự) và AsyncIO (vòng lặp sự kiện đơn luồng bất đồng bộ với async/await và asyncio.gather).'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Modern Python applications handle millions of requests, intensive data transformations, and high-throughput network I/O. Choosing the appropriate concurrency paradigm requires understanding CPython\'s internal architecture—specifically the Global Interpreter Lock (GIL)—and selecting between OS threads, separate OS processes, or cooperative asynchronous event loops.',
      vi: 'Các ứng dụng Python hiện đại xử lý hàng triệu request, các tác vụ tính toán dữ liệu lớn và luồng mạng thông lượng cao. Việc chọn mô hình đa nhiệm phù hợp đòi hỏi sự hiểu biết sâu sắc về kiến trúc CPython—đặc biệt là khóa GIL—và biết khi nào nên dùng luồng OS (Threading), tiến trình OS riêng biệt (Multiprocessing) hay vòng lặp sự kiện bất đồng bộ (AsyncIO).'
    },
    conceptExplanation: {
      en: '1. CPython\'s Global Interpreter Lock (GIL):\n- A mutex that prevents multiple native threads from executing Python bytecodes simultaneously within a single process.\n- Why it exists: Protects CPython\'s reference counting memory management from race conditions.\n- Consequence: Pure CPU-bound code in threads runs sequentially (no speedup). However, I/O operations (sockets, file reads) and C-extensions (NumPy) release the GIL, allowing threads to achieve true concurrency for I/O.\n\n2. The Three Concurrency Paradigms & Decision Framework:\n\n| Paradigm | Mechanism | Best For | GIL Impact | Resource Overhead |\n| :--- | :--- | :--- | :--- | :--- |\n| **AsyncIO** | Single-threaded cooperative event loop (`async`/`await`) | Massive concurrent I/O (WebSockets, microservices, 10k+ network connections) | Not affected (single thread) | Ultra-lightweight (thousands of coroutines in MBs of RAM) |\n| **Threading** | OS native threads (`ThreadPoolExecutor`) | I/O-bound tasks with synchronous/blocking legacy libraries (Disk I/O, DB drivers) | GIL released during I/O | Medium (thread stack memory, OS context switching) |\n| **Multiprocessing** | Separate OS processes (`ProcessPoolExecutor`) | CPU-intensive computations (image processing, ML data prep, cryptography) | Bypasses GIL (separate interpreter per core) | Heavy (memory per process, IPC serialization overhead) |\n\n3. AsyncIO Core Primitives:\n- `async def` defines a coroutine function.\n- `await awaitable` yields execution back to the event loop until the promise completes.\n- `asyncio.gather(*tasks)`: Executes multiple coroutines concurrently.\n- `asyncio.create_task(coro)`: Schedules coroutines immediately onto the running loop.\n\n4. Process Pools with `concurrent.futures`:\n- `ProcessPoolExecutor(max_workers=os.cpu_count())` distributes heavy CPU batches across all hardware cores seamlessly.',
      vi: '1. Khóa Global Interpreter Lock (GIL) Của CPython:\n- Một khóa mutex ngăn chặn nhiều native thread thực thi bytecode Python cùng lúc trong một tiến trình.\n- Lý do tồn tại: Bảo vệ cơ chế quản lý bộ nhớ đếm tham chiếu (reference counting) của CPython khỏi race condition.\n- Hệ quả: Tác vụ tính toán thuần CPU chạy đa luồng sẽ bị tuần tự hóa (không tăng tốc). Tuy nhiên, các tác vụ I/O (mạng, đĩa) và thư viện C (NumPy) tự động nhả GIL, cho phép luồng chạy đa nhiệm hiệu quả với I/O.\n\n2. 3 Mô Hình Đa Nhiệm & Bảng Quyết Định:\n\n| Mô hình | Cơ chế | Phù hợp nhất | Ảnh hưởng GIL | Mức tiêu hao tài nguyên |\n| :--- | :--- | :--- | :--- | :--- |\n| **AsyncIO** | Vòng lặp sự kiện hợp tác đơn luồng (`async`/`await`) | I/O đồng thời quy mô lớn (WebSockets, microservices, 10k+ kết nối) | Không bị ảnh hưởng (chạy 1 thread) | Siêu nhẹ (hàng ngàn coroutine chỉ tốn vài MB RAM) |\n| **Threading** | Native OS threads (`ThreadPoolExecutor`) | Tác vụ I/O dùng thư viện đồng bộ cũ (Đọc đĩa, driver DB blocking) | Tự động nhả GIL khi đợi I/O | Trung bình (bộ nhớ stack luồng, chuyển ngữ cảnh OS) |\n| **Multiprocessing** | Tiến trình OS độc lập (`ProcessPoolExecutor`) | Tính toán nặng CPU (xử lý ảnh, mã hóa dữ liệu, ML) | Vượt qua GIL (mỗi tiến trình có 1 interpreter riêng) | Cao (tốn RAM cho từng process, chi phí IPC) |\n\n3. Các Thành Phần Cốt Lõi Của AsyncIO:\n- `async def` định nghĩa hàm coroutine.\n- `await awaitable` tạm dừng và nhường quyền cho event loop đến khi tác vụ hoàn thành.\n- `asyncio.gather(*tasks)`: Thực thi song song nhiều coroutine.\n- `asyncio.create_task(coro)`: Lên lịch chạy coroutine ngay trên event loop.\n\n4. Process Pool Với `concurrent.futures`:\n- `ProcessPoolExecutor(max_workers=os.cpu_count())` phân bổ tải tính toán CPU nặng qua tất cả các lõi phần cứng.'
    },
    syntax: `import asyncio
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
import time

# 1. AsyncIO Cooperative Concurrency
async def fetch_user_data(user_id: int) -> dict:
    await asyncio.sleep(0.1)  # Non-blocking simulated I/O
    return {"user_id": user_id, "status": "active"}

async def main_async():
    # Run 100 concurrent network queries cooperatively
    tasks = [fetch_user_data(i) for i in range(100)]
    results = await asyncio.gather(*tasks)
    return len(results)

# 2. CPU-Bound True Parallelism with ProcessPoolExecutor
def heavy_crypto_hash(data: int) -> int:
    return sum(i * i for i in range(data))

def run_multiprocess():
    with ProcessPoolExecutor() as executor:
        numbers = [1000000, 2000000, 3000000]
        results = list(executor.map(heavy_crypto_hash, numbers))
    return results

# 3. ThreadPoolExecutor for Synchronous Blocking I/O
def blocking_legacy_io(url: str) -> str:
    time.sleep(0.05)  # Simulating synchronous socket wait
    return f"Response from {url}"

def run_threadpool():
    with ThreadPoolExecutor(max_workers=10) as executor:
        urls = [f"https://api.internal/v1/node/{i}" for i in range(20)]
        responses = list(executor.map(blocking_legacy_io, urls))
    return responses`,
    examples: [
      {
        title: {
          en: 'High-Throughput Microservice Task Dispatcher',
          vi: 'Hệ Thống Điều Phối Đa Nhiệm Cho Microservice'
        },
        code: `import asyncio

async def query_service(endpoint: str, timeout: float = 2.0) -> dict:
    try:
        # Simulate network request with timeout
        await asyncio.sleep(0.05)
        return {"endpoint": endpoint, "status": 200, "data": "OK"}
    except asyncio.CancelledError:
        return {"endpoint": endpoint, "status": 499, "data": "Cancelled"}

async def aggregate_dashboard() -> list[dict]:
    endpoints = ["/auth", "/billing", "/inventory", "/notifications"]
    coros = [query_service(ep) for ep in endpoints]
    return await asyncio.gather(*coros)

# Entry point execution
results = asyncio.run(aggregate_dashboard())
print("Dashboard aggregated from 4 services:", len(results))`,
        language: 'python',
        explanation: {
          en: 'Demonstrates non-blocking multi-endpoint aggregation using standard AsyncIO coroutine gathering.',
          vi: 'Minh họa tổng hợp dữ liệu từ nhiều dịch vụ không bị block bằng cơ chế asyncio.gather.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Calling blocking functions (e.g. `time.sleep()`, `requests.get()`) inside an `async def` function, freezing the entire event loop.',
          vi: 'Gọi các hàm blocking (như `time.sleep()`, `requests.get()`) trong hàm `async def` làm đóng băng toàn bộ event loop.'
        },
        correction: {
          en: 'Use non-blocking equivalents (`await asyncio.sleep()`, `httpx.AsyncClient()`) or offload blocking calls with `asyncio.to_thread()`.',
          vi: 'Dùng hàm bất đồng bộ tương ứng (`await asyncio.sleep()`, `httpx.AsyncClient()`) hoặc đẩy hàm blocking sang thread bằng `asyncio.to_thread()`.'
        },
        code: `# Freezes Loop: async def run(): time.sleep(5)\n# Correct:\nasync def run():\n    await asyncio.sleep(5)\n    # Or offload blocking library:\n    # res = await asyncio.to_thread(requests.get, url)`
      },
      {
        mistake: {
          en: 'Using multi-threading for heavy mathematical calculations expecting multi-core speedup (GIL prevents parallel CPU execution).',
          vi: 'Dùng đa luồng threading cho tính toán toán học nặng với kỳ vọng tăng tốc CPU (bị khóa GIL tuần tự hóa).'
        },
        correction: {
          en: 'Use `multiprocessing` or `concurrent.futures.ProcessPoolExecutor` for CPU-bound computations.',
          vi: 'Dùng `multiprocessing` hoặc `concurrent.futures.ProcessPoolExecutor` cho các tác vụ tính toán CPU.'
        },
        code: `# Use ProcessPool for CPU workloads:\nwith ProcessPoolExecutor() as p:\n    p.map(cpu_heavy_task, data)`
      }
    ],
    tips: [
      {
        en: 'Use `asyncio.to_thread(sync_func, *args)` (Python 3.9+) to cleanly run blocking legacy synchronous functions without freezing your async web server.',
        vi: 'Dùng `asyncio.to_thread(sync_func, *args)` (từ Python 3.9+) để chạy các hàm đồng bộ blocking mà không làm treo web server async.'
      },
      {
        en: 'In Python 3.11+, `asyncio.TaskGroup` provides structured concurrency with automatic cleanup if any child task fails.',
        vi: 'Từ Python 3.11+, `asyncio.TaskGroup` cung cấp mô hình structured concurrency tự động dọn dẹp các task con nếu có 1 task gặp lỗi.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_29_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Async Concurrent Task Runner with asyncio.gather',
        vi: 'Bài tập 1: Chạy Tác Vụ Đồng Thời Bằng asyncio.gather'
      },
      instruction: {
        en: 'Write an asynchronous function `fetch_all_scores(user_ids: list[int], score_fn: callable) -> list[int]` that uses `asyncio.gather()` to concurrently await `score_fn(uid)` for every `uid` in `user_ids` and return the list of scores.',
        vi: 'Viết hàm bất đồng bộ `fetch_all_scores(user_ids: list[int], score_fn: callable) -> list[int]` sử dụng `asyncio.gather()` để chạy đồng thời `score_fn(uid)` cho mỗi `uid` trong `user_ids` và trả về danh sách điểm số.'
      },
      starterCode: `import asyncio

async def fetch_all_scores(user_ids: list[int], score_fn) -> list[int]:
    # TODO: Concurrently gather results from score_fn
    pass`,
      solutionCode: `import asyncio

async def fetch_all_scores(user_ids: list[int], score_fn) -> list[int]:
    tasks = [score_fn(uid) for uid in user_ids]
    return await asyncio.gather(*tasks)`,
      hint: {
        en: 'Create a list of coroutines `[score_fn(uid) for uid in user_ids]` and pass them to `await asyncio.gather(*tasks)`.',
        vi: 'Tạo danh sách coroutine `[score_fn(uid) for uid in user_ids]` và truyền vào `await asyncio.gather(*tasks)`.'
      },
      explanation: {
        en: '`asyncio.gather` fires and awaits all coroutines concurrently on the event loop.',
        vi: '`asyncio.gather` kích hoạt và đợi đồng thời tất cả các coroutine trên event loop.'
      }
    },
    {
      id: 'py_29_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Concurrency Strategy Selector Engine',
        vi: 'Bài tập 2: Bộ Phân Loại Chiến Lược Đa Nhiệm'
      },
      instruction: {
        en: 'Write `recommend_concurrency_strategy(workload_type: str, uses_async_libraries: bool) -> str` returning: `"asyncio"` if `workload_type == "io"` and `uses_async_libraries` is True; `"threading"` if `workload_type == "io"` and `uses_async_libraries` is False; `"multiprocessing"` if `workload_type == "cpu"`. Otherwise raise `ValueError("Invalid workload")`.',
        vi: 'Viết hàm `recommend_concurrency_strategy(workload_type: str, uses_async_libraries: bool) -> str` trả về: `"asyncio"` nếu `workload_type == "io"` và `uses_async_libraries` là True; `"threading"` nếu `workload_type == "io"` và `uses_async_libraries` là False; `"multiprocessing"` nếu `workload_type == "cpu"`. Ngược lại ném `ValueError("Invalid workload")`.'
      },
      starterCode: `def recommend_concurrency_strategy(workload_type: str, uses_async_libraries: bool) -> str:
    # TODO: Implement recommendation logic
    pass`,
      solutionCode: `def recommend_concurrency_strategy(workload_type: str, uses_async_libraries: bool) -> str:
    if workload_type == "io":
        return "asyncio" if uses_async_libraries else "threading"
    elif workload_type == "cpu":
        return "multiprocessing"
    else:
        raise ValueError("Invalid workload")`,
      hint: {
        en: 'Check `workload_type` against `"io"` and `"cpu"` and evaluate `uses_async_libraries`.',
        vi: 'Kiểm tra `workload_type` với `"io"` và `"cpu"` kết hợp `uses_async_libraries`.'
      },
      explanation: {
        en: 'Encodes standard Python concurrency architectural decision matrices.',
        vi: 'Mã hóa ma trận quyết định kiến trúc đa nhiệm chuẩn trong Python.'
      }
    }
  ],
  challenge: {
    id: 'py_29_challenge',
    title: {
      en: 'Asynchronous Rate-Limited Batch Worker Pool with Semaphore',
      vi: 'Bể Xử Lý Lô Bất Đồng Bộ Giới Hạn Tốc Độ Bằng Semaphore'
    },
    description: {
      en: 'Implement an asynchronous function `process_with_concurrency_limit(items: list[int], worker_fn: callable, max_concurrent: int) -> list` that uses an `asyncio.Semaphore(max_concurrent)` to ensure no more than `max_concurrent` coroutines execute `worker_fn(item)` concurrently. Return the gathered results.',
      vi: 'Xây dựng hàm bất đồng bộ `process_with_concurrency_limit(items: list[int], worker_fn: callable, max_concurrent: int) -> list` sử dụng `asyncio.Semaphore(max_concurrent)` để đảm bảo không có quá `max_concurrent` coroutine chạy `worker_fn(item)` cùng lúc. Trả về danh sách kết quả tổng hợp.'
    },
    hints: [
      {
        en: 'Use asyncio.Semaphore(max_concurrent) inside an async with block.',
        vi: 'Dùng asyncio.Semaphore(max_concurrent) bên trong khối async with.'
      }
    ],
    requirements: [
      {
        en: 'Initialize asyncio.Semaphore with the max_concurrent limit',
        vi: 'Khởi tạo asyncio.Semaphore với giới hạn max_concurrent'
      },
      {
        en: 'Wrap each worker execution inside async with semaphore',
        vi: 'Bọc mỗi lượt chạy worker bên trong khối async with semaphore'
      },
      {
        en: 'Gather and return all coroutine results concurrently with asyncio.gather',
        vi: 'Gom và trả về kết quả tất cả coroutine đồng thời bằng asyncio.gather'
      }
    ],
    starterCode: `import asyncio

async def process_with_concurrency_limit(items: list[int], worker_fn, max_concurrent: int) -> list:
    # TODO: Bound concurrency with asyncio.Semaphore
    pass`,
    solutionCode: `import asyncio

async def process_with_concurrency_limit(items: list[int], worker_fn, max_concurrent: int) -> list:
    semaphore = asyncio.Semaphore(max_concurrent)

    async def sem_task(item):
        async with semaphore:
            return await worker_fn(item)

    tasks = [sem_task(item) for item in items]
    return await asyncio.gather(*tasks)`,
    solutionExplanation: {
      en: 'Semaphores bound concurrent coroutine execution without creating extra OS threads.',
      vi: 'Semaphore giới hạn số coroutine chạy đồng thời mà không tốn chi phí tạo thêm OS thread.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_29_q1',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'easy',
      question: {
        en: 'What is the Global Interpreter Lock (GIL) in CPython?',
        vi: 'Khóa Global Interpreter Lock (GIL) trong CPython là gì?'
      },
      options: [
        { en: 'A security mechanism that encrypts bytecode', vi: 'Một cơ chế bảo mật mã hóa bytecode' },
        { en: 'A mutex that prevents multiple native OS threads from executing Python bytecodes simultaneously within a single process', vi: 'Một khóa mutex ngăn chặn nhiều native OS thread thực thi bytecode Python cùng một lúc trong một tiến trình' },
        { en: 'A tool for locking database records', vi: 'Công cụ khóa bản ghi cơ sở dữ liệu' },
        { en: 'A memory leak detection engine', vi: 'Một bộ phát hiện rò rỉ bộ nhớ' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The GIL serializes Python bytecode execution to safeguard CPython\'s internal reference counting.',
        vi: 'GIL tuần tự hóa việc chạy bytecode của Python để bảo vệ cơ chế đếm tham chiếu nội bộ của CPython.'
      }
    },
    {
      id: 'py_29_q2',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'easy',
      question: {
        en: 'Why does Python multi-threading NOT speed up CPU-bound mathematical operations?',
        vi: 'Tại sao đa luồng (threading) trong Python KHÔNG làm tăng tốc các phép toán nặng về CPU?'
      },
      options: [
        { en: 'Threads do not have access to the CPU', vi: 'Luồng không có quyền truy cập vào CPU' },
        { en: 'The GIL allows only one thread to execute Python bytecode at a time, resulting in sequential execution with context-switching overhead', vi: 'Khóa GIL chỉ cho phép duy nhất một luồng chạy bytecode Python tại một thời điểm, dẫn đến việc thực thi tuần tự kèm chi phí chuyển ngữ cảnh' },
        { en: 'Threads can only process text strings', vi: 'Luồng chỉ xử lý được chuỗi văn bản' },
        { en: 'Python disables floating point arithmetic in threads', vi: 'Python tắt phép tính số thực trong luồng' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'CPU-bound bytecode requires the GIL, so threads take turns running on a single core.',
        vi: 'Bytecode tính toán CPU bắt buộc phải giữ GIL, do đó các luồng phải thay phiên nhau chạy trên 1 lõi duy nhất.'
      }
    },
    {
      id: 'py_29_q3',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'medium',
      question: {
        en: 'Which concurrency model is best suited for high-throughput I/O with thousands of concurrent network connections?',
        vi: 'Mô hình đa nhiệm nào phù hợp nhất cho các tác vụ I/O thông lượng cao với hàng ngàn kết nối mạng đồng thời?'
      },
      options: [
        { en: '`multiprocessing`', vi: '`multiprocessing`' },
        { en: '`asyncio`', vi: '`asyncio`' },
        { en: 'Single-threaded synchronous blocking', vi: 'Đơn luồng đồng bộ blocking' },
        { en: 'Forking a process per connection', vi: 'Tạo một process cho mỗi kết nối' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`asyncio` multiplexes thousands of lightweight non-blocking coroutines on a single thread using an OS event loop (epoll/kqueue).',
        vi: '`asyncio` ghép kênh hàng ngàn coroutine nhẹ bất đồng bộ trên một luồng duy nhất nhờ vòng lặp sự kiện của hệ điều hành.'
      }
    },
    {
      id: 'py_29_q4',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'easy',
      question: {
        en: 'How do you achieve true parallel CPU execution across multiple physical processor cores in Python?',
        vi: 'Làm thế nào để đạt được thực thi CPU song song thực sự trên nhiều lõi phần cứng vật lý trong Python?'
      },
      options: [
        { en: 'Use `threading.Thread` with a high thread count', vi: 'Dùng `threading.Thread` với số lượng luồng lớn' },
        { en: 'Use the `multiprocessing` module or `ProcessPoolExecutor` (each process runs its own independent Python interpreter and GIL)', vi: 'Dùng module `multiprocessing` hoặc `ProcessPoolExecutor` (mỗi tiến trình chạy một Python interpreter và khóa GIL độc lập riêng)' },
        { en: 'Decorate functions with `@asyncio.coroutine`', vi: 'Gắn decorator `@asyncio.coroutine` cho hàm' },
        { en: 'Increase RAM size', vi: 'Tăng dung lượng RAM' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Separate processes have independent memory spaces and separate GILs, running truly in parallel across CPU cores.',
        vi: 'Các tiến trình riêng biệt có không gian bộ nhớ và khóa GIL hoàn toàn độc lập, cho phép chạy song song thực sự trên các lõi CPU.'
      }
    },
    {
      id: 'py_29_q5',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'medium',
      question: {
        en: 'What happens if you invoke `time.sleep(5)` inside an `async def` coroutine?',
        vi: 'Điều gì xảy ra nếu bạn gọi lệnh `time.sleep(5)` bên trong một coroutine `async def`?'
      },
      options: [
        { en: 'Only that coroutine pauses; all other async tasks continue running', vi: 'Chỉ coroutine đó dừng lại; các task async khác vẫn tiếp tục chạy' },
        { en: 'It blocks the entire thread and freezes the entire event loop for 5 seconds, stopping all concurrent coroutines from making progress', vi: 'Nó chặn luồng chính và làm đóng băng toàn bộ event loop trong 5 giây, khiến mọi coroutine khác bị dừng lại' },
        { en: 'Python raises an `AsyncError`', vi: 'Python ném lỗi `AsyncError`' },
        { en: 'The sleep is automatically converted to `asyncio.sleep`', vi: 'Lệnh sleep tự động chuyển thành `asyncio.sleep`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Synchronous blocking calls stall the single OS thread running the event loop. Always use `await asyncio.sleep()` or `asyncio.to_thread()`.',
        vi: 'Lệnh đồng bộ blocking làm nghẽn luồng OS duy nhất đang chạy event loop. Luôn dùng `await asyncio.sleep()` hoặc `asyncio.to_thread()`.'
      }
    },
    {
      id: 'py_29_q6',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'easy',
      question: {
        en: 'What is the purpose of `asyncio.gather(*coros)`?',
        vi: 'Mục đích của hàm `asyncio.gather(*coros)` là gì?'
      },
      options: [
        { en: 'It merges dictionaries', vi: 'Gộp các dictionary' },
        { en: 'It runs multiple awaitable coroutines concurrently and returns a list of their aggregated results in order', vi: 'Chạy đồng thời nhiều coroutine và trả về danh sách kết quả tổng hợp theo đúng thứ tự' },
        { en: 'It cancels all tasks', vi: 'Hủy bỏ tất cả các task' },
        { en: 'It terminates the Python process', vi: 'Dừng tiến trình Python' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`asyncio.gather` takes multiple awaitables, schedules them concurrently, and collects their return values.',
        vi: '`asyncio.gather` nhận nhiều awaitable, lên lịch chạy đồng thời và gom kết quả trả về của chúng.'
      }
    },
    {
      id: 'py_29_q7',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'medium',
      question: {
        en: 'How do you run a blocking legacy synchronous function without freezing an `asyncio` event loop in Python 3.9+?',
        vi: 'Làm thế nào để chạy một hàm đồng bộ blocking mà không làm treo event loop của `asyncio` trong Python 3.9+?'
      },
      options: [
        { en: '`await asyncio.to_thread(sync_function, *args)`', vi: '`await asyncio.to_thread(sync_function, *args)`' },
        { en: '`asyncio.run_sync(sync_function)`', vi: '`asyncio.run_sync(sync_function)`' },
        { en: '`await sync_function(*args)`', vi: '`await sync_function(*args)`' },
        { en: '`thread.start(sync_function)`', vi: '`thread.start(sync_function)`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`asyncio.to_thread()` offloads synchronous blocking I/O to a separate background thread pool worker.',
        vi: '`asyncio.to_thread()` đẩy các hàm I/O blocking sang một thread pool worker chạy ngầm để giải phóng event loop.'
      }
    },
    {
      id: 'py_29_q8',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'medium',
      question: {
        en: 'What is the primary trade-off when using `multiprocessing` compared to `asyncio` or `threading`?',
        vi: 'Đánh đổi lớn nhất khi sử dụng `multiprocessing` so với `asyncio` hoặc `threading` là gì?'
      },
      options: [
        { en: 'Multiprocessing cannot run on Linux', vi: 'Multiprocessing không chạy được trên Linux' },
        { en: 'Higher memory overhead per process and data serialization (pickle) costs for inter-process communication', vi: 'Mức tiêu hao bộ nhớ RAM lớn hơn cho từng process và chi phí tuần tự hóa dữ liệu (pickle) khi giao tiếp liên tiến trình' },
        { en: 'Multiprocessing cannot handle numbers', vi: 'Multiprocessing không xử lý được số' },
        { en: 'Multiprocessing is deprecated', vi: 'Multiprocessing đã bị loại bỏ' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Each process duplicates interpreter state and communicating between processes requires serialization overhead.',
        vi: 'Mỗi process nhân bản trạng thái interpreter và việc giao tiếp giữa các process tốn chi phí tuần tự hóa (pickle).'
      }
    },
    {
      id: 'py_29_q9',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'medium',
      question: {
        en: 'Which synchronization primitive in `asyncio` limits the maximum number of concurrent accesses to a shared resource?',
        vi: 'Thành phần đồng bộ nào trong `asyncio` giới hạn số lượng tác vụ truy cập đồng thời tối đa vào một tài nguyên chung?'
      },
      options: [
        { en: '`asyncio.Lock`', vi: '`asyncio.Lock`' },
        { en: '`asyncio.Semaphore`', vi: '`asyncio.Semaphore`' },
        { en: '`asyncio.Barrier`', vi: '`asyncio.Barrier`' },
        { en: '`asyncio.Condition`', vi: '`asyncio.Condition`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`asyncio.Semaphore(value)` allows up to `value` concurrent coroutine acquisitions.',
        vi: '`asyncio.Semaphore(value)` cho phép tối đa `value` coroutine được đồng thời thực thi qua khối khóa.'
      }
    },
    {
      id: 'py_29_q10',
      type: 'single_choice',
      topicId: 'python_concurrency',
      difficulty: 'easy',
      question: {
        en: 'What is the entry point function to launch and run an `asyncio` coroutine in modern Python 3.7+?',
        vi: 'Hàm khởi chạy chuẩn để thực thi một coroutine `asyncio` từ đầu trong Python 3.7+ là gì?'
      },
      options: [
        { en: '`asyncio.get_event_loop().run_until_complete(coro)`', vi: '`asyncio.get_event_loop().run_until_complete(coro)`' },
        { en: '`asyncio.run(coro)`', vi: '`asyncio.run(coro)`' },
        { en: '`coro.start()`', vi: '`coro.start()`' },
        { en: '`asyncio.start_loop(coro)`', vi: '`asyncio.start_loop(coro)`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`asyncio.run(main())` creates a new event loop, runs the coroutine to completion, and cleans up async generators.',
        vi: '`asyncio.run(main())` tự động khởi tạo event loop, thực thi coroutine đến khi hoàn tất và dọn dẹp tài nguyên.'
      }
    }
  ]
};
