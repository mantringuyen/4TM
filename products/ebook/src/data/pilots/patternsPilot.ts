import { Book } from '../../types';

export const PATTERNS_PILOT_BOOK: Book = {
  id: 'python-patterns-recipes',
  slug: 'python-patterns-recipes',
  title: 'Python Patterns & Recipes — Reusable Engineering Solutions',
  subtitle: {
    en: 'Pythonic Design Patterns, Structural Blueprints & Implementation Recipes',
    vi: 'Mẫu Thiết Kế Chuẩn Pythonic, Bản Vẽ Kiến Trúc & Công Thức Thực Thi',
  },
  bookType: 'Patterns / Recipes',
  categoryId: 'python',
  subjectId: 'programming',
  author: '4TM Editorial Board',
  role: 'Software Architecture & Design Patterns Group',
  level: 'Intermediate to Advanced',
  estimatedReadTime: '45 mins',
  chaptersCount: 8,
  publishedDate: '2025-02-20',
  accentColor: 'from-violet-600 to-purple-900',
  tags: ['Patterns', 'Design Patterns', 'Architecture', 'Recipes', 'Concurrency', 'OOP'],
  description: {
    en: 'Eight production-grade structural patterns and reusable engineering recipes written in modern Pythonic idioms.',
    vi: 'Tám mẫu thiết kế cấu trúc chuẩn sản xuất và công thức kỹ thuật tái sử dụng được viết theo phong cách Pythonic hiện đại.',
  },
  prerequisites: {
    en: ['Object-oriented Python proficiency', 'Basic concurrency and architectural knowledge'],
    vi: ['Thành thạo lập trình hướng đối tượng trong Python', 'Hiểu biết cơ bản về concurrency và kiến trúc'],
  },
  outcomes: {
    en: [
      'Implement Strategy, Factory, and Repository patterns cleanly using modern Python features',
      'Build resilient retries with jitter, safe concurrent worker pipelines, and immutable config loaders',
      'Choose the right pattern for each problem without over-engineering or premature abstraction',
    ],
    vi: [
      'Triển khai các mẫu Strategy, Factory và Repository chuẩn mực bằng tính năng Python hiện đại',
      'Xây dựng cơ chế retry với jitter, pipeline đa luồng an toàn và bộ nạp cấu hình bất biến',
      'Lựa chọn đúng mẫu thiết kế cho từng bài toán mà không làm phức tạp hóa kiến trúc quá mức',
    ],
  },
  chapters: [
    {
      id: 'pat-ch-1',
      number: 1,
      slug: 'strategy-pattern-with-callables',
      title: {
        en: '1. Strategy Pattern Using Callables & Protocols',
        vi: '1. Mẫu Strategy Sử Dụng Callable & Protocol',
      },
      summary: {
        en: 'Swap algorithms dynamically at runtime using Python\'s first-class functions instead of verbose class hierarchies.',
        vi: 'Thay đổi thuật toán linh hoạt lúc runtime bằng hàm first-class của Python thay vì phải tạo cây class rườm rà.',
      },
      readTimeMinutes: 5,
      sections: [
        {
          id: 'pat-sec-1-1',
          title: {
            en: 'Pythonic Strategy Implementation',
            vi: 'Triển Khai Strategy Chuẩn Pythonic',
          },
          patternDetails: {
            problemStatement: {
              en: 'You need to support multiple interchangeable algorithms (e.g., pricing discount calculators, compression algorithms, serialization strategies) without hardcoding `if/elif` branches.',
              vi: 'Bạn cần hỗ trợ nhiều thuật toán có thể thay thế cho nhau (như tính chiết khấu giá, thuật toán nén, chiến lược tuần tự hóa) mà không muốn viết chuỗi `if/elif` cứng nhắc.',
            },
            patternStructure: {
              en: 'Define a `Callable` or `typing.Protocol` specification for the strategy. Pass strategy functions directly as arguments into the client context.',
              vi: 'Định nghĩa giao diện strategy bằng `Callable` hoặc `typing.Protocol`. Truyền trực tiếp các hàm strategy như tham số vào context xử lý.',
            },
            implementationRecipe: {
              language: 'python',
              filename: 'strategy_pattern.py',
              explanation: {
                en: 'Clean strategy pattern utilizing first-class functions and type aliases.',
                vi: 'Mẫu Strategy gọn gàng tận dụng first-class function và alias kiểu dữ liệu.',
              },
              code: `from typing import Callable
from dataclasses import dataclass

# Strategy type signature: accepts base price, returns final discount
DiscountStrategy = Callable[[float], float]

# Concrete Strategy Functions
def no_discount(price: float) -> float:
    return 0.0

def seasonal_promo(price: float) -> float:
    return price * 0.15  # 15% discount

def vip_loyalty(price: float) -> float:
    return max(price * 0.20, 50.0)  # 20% or $50 minimum

@dataclass
class Order:
    total_amount: float
    discount_strategy: DiscountStrategy = no_discount

    def calculate_final_price(self) -> float:
        discount = self.discount_strategy(self.total_amount)
        return max(0.0, self.total_amount - discount)

# Usage
order = Order(total_amount=200.0, discount_strategy=seasonal_promo)
print(f"Final: \${order.calculate_final_price():.2f}")  # \$170.00`,
            },
            whenToUse: {
              en: 'When business logic has multiple algorithmic variations that need to be swapped, tested independently, or injected at runtime.',
              vi: 'Khi nghiệp vụ có nhiều biến thể thuật toán cần được hoán đổi, kiểm thử độc lập hoặc inject linh hoạt lúc runtime.',
            },
            whenToAvoid: {
              en: 'When there are only two static branches that never change. A simple `if condition:` is simpler and clearer.',
              vi: 'Khi chỉ có 2 nhánh điều kiện tĩnh không bao giờ thay đổi. Một lệnh `if condition:` đơn giản sẽ dễ hiểu hơn.',
            },
            consequences: {
              en: 'Eliminates branching complexity and allows adding new algorithms without modifying existing order/pricing classes (Open/Closed Principle).',
              vi: 'Loại bỏ độ phức tạp của rẽ nhánh và cho phép thêm thuật toán mới mà không cần sửa đổi các class hiện có (Nguyên lý Đóng/Mở).',
            },
          },
        },
      ],
    },
    {
      id: 'pat-ch-2',
      number: 2,
      slug: 'factory-pattern-with-registry',
      title: {
        en: '2. Factory Pattern with Classmethod & Registry',
        vi: '2. Mẫu Factory Với Classmethod & Bảng Đăng Ký (Registry)',
      },
      summary: {
        en: 'Decouple object creation from concrete types using dictionary-driven class registration decorators.',
        vi: 'Tách rời việc khởi tạo đối tượng khỏi các kiểu cụ thể bằng decorator tự đăng ký vào từ điển registry.',
      },
      readTimeMinutes: 5,
      sections: [
        {
          id: 'pat-sec-2-1',
          title: {
            en: 'Self-Registering Factory Architecture',
            vi: 'Kiến Trúc Factory Tự Đăng Ký',
          },
          patternDetails: {
            problemStatement: {
              en: 'Instantiating different parser or exporter handlers based on dynamic file extensions or API payload types without modifying a central factory function.',
              vi: 'Khởi tạo các bộ xử lý parser hoặc exporter khác nhau dựa trên phần mở rộng file hoặc kiểu payload API mà không cần sửa hàm factory trung tâm.',
            },
            patternStructure: {
              en: 'A central registry dictionary mapping keys to factory constructors, populated automatically via a decorator.',
              vi: 'Một bảng từ điển trung tâm ánh xạ key tới hàm khởi tạo, được đăng ký tự động thông qua decorator.',
            },
            implementationRecipe: {
              language: 'python',
              filename: 'factory_registry.py',
              explanation: {
                en: 'Self-registering exporter factory using a decorator pattern.',
                vi: 'Factory xuất dữ liệu tự đăng ký sử dụng decorator.',
              },
              code: `from typing import Protocol, Type

class ReportExporter(Protocol):
    def export(self, data: dict) -> bytes: ...

class ExporterFactory:
    _registry: dict[str, Type[ReportExporter]] = {}

    @classmethod
    def register(cls, format_name: str):
        def decorator(subclass: Type[ReportExporter]):
            cls._registry[format_name.lower()] = subclass
            return subclass
        return decorator

    @classmethod
    def create(cls, format_name: str, **kwargs) -> ReportExporter:
        format_key = format_name.lower()
        if format_key not in cls._registry:
            valid = ", ".join(cls._registry.keys())
            raise ValueError(f"Unknown format '{format_name}'. Supported: {valid}")
        return cls._registry[format_key](**kwargs)

# Plug-in implementations register themselves automatically
@ExporterFactory.register("json")
class JsonExporter:
    def export(self, data: dict) -> bytes:
        import json
        return json.dumps(data).encode("utf-8")

@ExporterFactory.register("csv")
class CsvExporter:
    def export(self, data: dict) -> bytes:
        return b"id,name\\n1,Sample"

# Client usage: fully decoupled from concrete classes
exporter = ExporterFactory.create("json")`,
            },
            whenToUse: {
              en: 'When building plugin architectures or supporting dynamic formats where new classes are added frequently across modules.',
              vi: 'Khi xây dựng kiến trúc plugin hoặc hỗ trợ các định dạng mở rộng thường xuyên có thêm class mới.',
            },
            whenToAvoid: {
              en: 'When there are only 1 or 2 fixed concrete implementations that never change.',
              vi: 'Khi chỉ có 1 hoặc 2 kiểu cố định không bao giờ thay đổi.',
            },
            consequences: {
              en: 'Enables zero-touch extensibility: adding a new exporter requires creating a new class with `@register` without modifying existing factory code.',
              vi: 'Mang lại khả năng mở rộng không chạm: thêm exporter mới chỉ cần tạo class có `@register` mà không cần đụng vào code cũ.',
            },
          },
        },
      ],
    },
    {
      id: 'pat-ch-3',
      number: 3,
      slug: 'repository-pattern-persistence-isolation',
      title: {
        en: '3. Repository Pattern for Persistence Isolation',
        vi: '3. Mẫu Repository Phân Tách Tầng Lưu Trữ Dữ Liệu',
      },
      summary: {
        en: 'Isolate database queries and ORMs behind clean domain interfaces for painless unit testing and database switching.',
        vi: 'Cách ly các câu lệnh truy vấn database và ORM phía sau giao diện domain để unit test và đổi database dễ dàng.',
      },
      readTimeMinutes: 6,
      sections: [
        {
          id: 'pat-sec-3-1',
          title: {
            en: 'Domain Repository Pattern',
            vi: 'Triển Khai Mẫu Domain Repository',
          },
          patternDetails: {
            problemStatement: {
              en: 'Direct SQL queries or ORM models scattered throughout business logic make testing slow and tie the application permanently to a specific database engine.',
              vi: 'Các câu lệnh SQL hoặc ORM rải rác khắp logic nghiệp vụ khiến việc chạy test bị chậm và buộc ứng dụng phụ thuộc chặt vào một loại database.',
            },
            patternStructure: {
              en: 'An abstract repository interface defining CRUD operations using pure domain models, implemented by concrete SQL and In-Memory adapter classes.',
              vi: 'Một giao diện repository trừu tượng định nghĩa các thao tác CRUD dùng model thuần túy, được hiện thực bởi class SQL thật và class in-memory để test.',
            },
            implementationRecipe: {
              language: 'python',
              filename: 'repository_pattern.py',
              explanation: {
                en: 'Repository interface with in-memory test fake and SQL implementation.',
                vi: 'Giao diện Repository kèm bản giả lập bộ nhớ in-memory để kiểm thử siêu tốc.',
              },
              code: `from dataclasses import dataclass
from typing import Protocol

@dataclass(frozen=True)
class User:
    id: str
    email: str
    is_active: bool = True

class UserRepository(Protocol):
    def get_by_id(self, user_id: str) -> User | None: ...
    def save(self, user: User) -> None: ...

# Blazing-fast in-memory fake for unit testing (No database needed!)
class InMemoryUserRepository:
    def __init__(self):
        self._users: dict[str, User] = {}

    def get_by_id(self, user_id: str) -> User | None:
        return self._users.get(user_id)

    def save(self, user: User) -> None:
        self._users[user.id] = user

# Pure domain service depending ONLY on the interface
class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def activate_user(self, user_id: str) -> bool:
        user = self.repo.get_by_id(user_id)
        if not user:
            return False
        updated = User(id=user.id, email=user.email, is_active=True)
        self.repo.save(updated)
        return True`,
            },
            whenToUse: {
              en: 'In production web services where business logic must be tested independently of live database instances.',
              vi: 'Trong các dịch vụ web sản phẩm nơi logic nghiệp vụ cần được kiểm thử độc lập mà không cần kết nối database thật.',
            },
            whenToAvoid: {
              en: 'In simple one-off data migration scripts or small prototypes.',
              vi: 'Trong các script di trú dữ liệu đơn giản dùng một lần hoặc prototype nhỏ.',
            },
            consequences: {
              en: 'Unit tests run in milliseconds without spinning up Docker databases, and switching databases requires modifying only one repository class.',
              vi: 'Unit test chạy chỉ trong vài mili-giây mà không cần bật Docker database, và việc đổi database chỉ cần sửa một class repository duy nhất.',
            },
          },
        },
      ],
    },
    {
      id: 'pat-ch-4',
      number: 4,
      slug: 'retry-pattern-exponential-backoff-jitter',
      title: {
        en: '4. Resilient Retry Pattern with Exponential Backoff & Jitter',
        vi: '4. Mẫu Retry Phục Hồi Lỗi Với Exponential Backoff & Jitter',
      },
      summary: {
        en: 'Handle transient network hiccups gracefully without overwhelming downstream services in a thundering herd.',
        vi: 'Xử lý lỗi mạng tạm thời thông minh mà không làm sập dịch vụ đích do hiệu ứng thundering herd.',
      },
      readTimeMinutes: 5,
      sections: [
        {
          id: 'pat-sec-4-1',
          title: {
            en: 'Production Retry Mechanism',
            vi: 'Cơ Chế Retry Chuẩn Sản Xuất',
          },
          patternDetails: {
            problemStatement: {
              en: 'Third-party APIs and microservices experience intermittent 503 errors and network timeouts. Retrying immediately or at fixed intervals causes cascading service outages.',
              vi: 'API bên thứ ba và microservice thường gặp lỗi 503 hoặc timeout chập chờn. Việc retry ngay lập tức hoặc theo chu kỳ cố định sẽ làm nghẽn dịch vụ.',
            },
            patternStructure: {
              en: 'A retry decorator calculating sleep delay as `base_delay * (2 ** attempt) + random_jitter`.',
              vi: 'Một decorator retry tính toán thời gian chờ theo công thức `base_delay * (2 ** attempt) + random_jitter`.',
            },
            implementationRecipe: {
              language: 'python',
              filename: 'retry_backoff.py',
              explanation: {
                en: 'Robust retry decorator with exponential backoff and randomized jitter.',
                vi: 'Decorator retry bền bỉ với độ trễ hàm mũ và độ lệch ngẫu nhiên jitter.',
              },
              code: `import functools
import random
import time
from typing import Callable, Type

def retry_with_backoff(
    retries: int = 3,
    base_delay: float = 0.5,
    max_delay: float = 10.0,
    retryable_exceptions: tuple[Type[Exception], ...] = (ConnectionError, TimeoutError),
) -> Callable:
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(retries):
                try:
                    return func(*args, **kwargs)
                except retryable_exceptions as exc:
                    last_exception = exc
                    if attempt == retries - 1:
                        break  # Exhausted all attempts
                    # Calculate exponential delay with randomized jitter
                    delay = min(base_delay * (2 ** attempt), max_delay)
                    jitter = random.uniform(0, delay * 0.2)
                    total_sleep = delay + jitter
                    print(f"Attempt {attempt + 1} failed: {exc}. Retrying in {total_sleep:.2f}s...")
                    time.sleep(total_sleep)
            raise last_exception
        return wrapper
    return decorator

# Usage
@retry_with_backoff(retries=3, base_delay=1.0)
def call_external_gateway():
    # Simulates transient network call
    pass`,
            },
            whenToUse: {
              en: 'For idempotent network requests (GET, PUT, DELETE) and external API integrations subject to intermittent failures.',
              vi: 'Cho các request mạng có tính idempotent (GET, PUT, DELETE) và tích hợp API bên thứ ba dễ bị chập chờn.',
            },
            whenToAvoid: {
              en: 'For non-idempotent operations like charging a credit card without idempotency keys.',
              vi: 'Cho các thao tác không thể lặp lại như trừ tiền thẻ tín dụng mà thiếu key kiểm tra trùng lặp.',
            },
            consequences: {
              en: 'Eliminates false-alarm failures from transient network blips while spreading server load evenly across time.',
              vi: 'Loại bỏ các sự cố báo động giả do gián đoạn mạng tạm thời và phân bổ đều tải máy chủ theo thời gian.',
            },
          },
        },
      ],
    },
    {
      id: 'pat-ch-5',
      number: 5,
      slug: 'custom-context-manager-nested-resources',
      title: {
        en: '5. Custom Context Manager for Nested Resources',
        vi: '5. Mẫu Quản Lý Ngữ Cảnh Cho Tài Nguyên Lồng Nhau',
      },
      summary: {
        en: 'Coordinate the orderly acquisition and reverse-order release of multiple dependent resources safely.',
        vi: 'Điều phối việc cấp phát tuần tự và giải phóng theo thứ tự ngược lại cho nhiều tài nguyên phụ thuộc nhau.',
      },
      readTimeMinutes: 5,
      sections: [
        {
          id: 'pat-sec-5-1',
          title: {
            en: 'Multi-Resource Context Coordination',
            vi: 'Điều Phối Ngữ Cảnh Đa Tài Nguyên',
          },
          patternDetails: {
            problemStatement: {
              en: 'Acquiring multiple resources (e.g. temporary directory, database connection, file lock) where failure on the 3rd resource must safely release the first two without leaks.',
              vi: 'Cấp phát nhiều tài nguyên (thư mục tạm, kết nối DB, khóa file) mà nếu tài nguyên thứ 3 bị lỗi thì 2 tài nguyên đầu vẫn phải được giải phóng an toàn.',
            },
            patternStructure: {
              en: 'Use `contextlib.ExitStack` to dynamically register cleanup callbacks that unwind in strict reverse order upon error or block exit.',
              vi: 'Sử dụng `contextlib.ExitStack` để đăng ký động các hàm dọn dẹp và tự động kích hoạt theo thứ tự đảo ngược khi có lỗi hoặc thoát khối lệnh.',
            },
            implementationRecipe: {
              language: 'python',
              filename: 'exit_stack_pattern.py',
              explanation: {
                en: 'Managing multiple dynamic file locks and buffers using ExitStack.',
                vi: 'Quản lý nhiều lock và buffer file động an toàn bằng ExitStack.',
              },
              code: `from contextlib import ExitStack
from pathlib import Path

def merge_log_files(source_paths: list[Path], output_path: Path) -> int:
    """Safely open N input files and 1 output file simultaneously."""
    total_lines = 0
    with ExitStack() as stack:
        # Open output file
        out_f = stack.enter_context(open(output_path, "w", encoding="utf-8"))
        
        # Dynamically open all source files; if any fail, all prior files are closed automatically!
        in_files = [stack.enter_context(open(p, "r", encoding="utf-8")) for p in source_paths]
        
        for f in in_files:
            for line in f:
                out_f.write(line)
                total_lines += 1

    return total_lines`,
            },
            whenToUse: {
              en: 'When the number of resources to manage is determined at runtime (e.g., a list of files or pool of connections).',
              vi: 'Khi số lượng tài nguyên cần quản lý chỉ được xác định lúc runtime (như danh sách file hoặc danh sách kết nối).',
            },
            whenToAvoid: {
              en: 'When managing a single static file or lock. A standard `with open(...)` is simpler.',
              vi: 'Khi chỉ quản lý một file hoặc lock đơn lẻ. Câu lệnh `with open(...)` thông thường là đủ.',
            },
            consequences: {
              en: 'Guarantees 100% leak-free resource release regardless of which step fails or raises an exception.',
              vi: 'Đảm bảo giải phóng tài nguyên 100% không rò rỉ bất kể bước nào xảy ra ngoại lệ.',
            },
          },
        },
      ],
    },
    {
      id: 'pat-ch-6',
      number: 6,
      slug: 'producer-consumer-worker-queue',
      title: {
        en: '6. Producer–Consumer Pattern with queue.Queue',
        vi: '6. Mẫu Producer–Consumer Với queue.Queue',
      },
      summary: {
        en: 'Decouple fast data producers from slow I/O consumers using thread-safe bounded in-memory queues.',
        vi: 'Tách rời bên tạo dữ liệu nhanh và bên xử lý I/O chậm bằng hàng đợi đa luồng an toàn có giới hạn kích thước.',
      },
      readTimeMinutes: 6,
      sections: [
        {
          id: 'pat-sec-6-1',
          title: {
            en: 'Thread-Safe Producer-Consumer Architecture',
            vi: 'Kiến Trúc Producer-Consumer Đa Luồng An Toàn',
          },
          patternDetails: {
            problemStatement: {
              en: 'A fast data producer (e.g. packet sniffer, event listener) generates data faster than worker threads can process/upload it, requiring bounded buffering and graceful shutdown.',
              vi: 'Bên thu thập dữ liệu sinh sự kiện nhanh hơn tốc độ ghi đĩa/gửi mạng của worker, đòi hỏi bộ nhớ đệm có giới hạn và cơ chế tắt an toàn.',
            },
            patternStructure: {
              en: 'A thread-safe `queue.Queue(maxsize=N)` connecting producer threads to worker consumer threads with a `None` sentinel signaling shutdown.',
              vi: 'Hàng đợi `queue.Queue(maxsize=N)` kết nối luồng producer với các luồng worker consumer kèm đối tượng sentinel `None` để báo tắt máy.',
            },
            implementationRecipe: {
              language: 'python',
              filename: 'producer_consumer.py',
              explanation: {
                en: 'Bounded thread-safe worker pipeline with sentinel shutdown.',
                vi: 'Pipeline xử lý đa luồng có chặn tràn bộ nhớ và cơ chế tắt an toàn.',
              },
              code: `import queue
import threading
import time

WORKER_SENTINEL = object()  # Unique poison pill for clean worker shutdown

def worker(q: queue.Queue, worker_id: int):
    while True:
        item = q.get()
        if item is WORKER_SENTINEL:
            q.task_done()
            break
        # Process item
        print(f"[Worker-{worker_id}] Processed: {item}")
        time.sleep(0.05)
        q.task_done()

# Bounded queue prevents unbounded memory growth under load
work_queue = queue.Queue(maxsize=100)

# Launch 3 worker threads
threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(work_queue, i), daemon=True)
    t.start()
    threads.append(t)

# Producer pushes 10 tasks
for task_id in range(10):
    work_queue.put(f"Task-{task_id}")

# Wait for completion & send shutdown pills
work_queue.join()
for _ in threads:
    work_queue.put(WORKER_SENTINEL)
for t in threads:
    t.join()`,
            },
            whenToUse: {
              en: 'When performing background batch processing or smoothing out traffic spikes in multi-threaded Python applications.',
              vi: 'Khi xử lý tác vụ nền theo lô hoặc làm phẳng các đợt lưu lượng tăng đột biến trong ứng dụng Python đa luồng.',
            },
            whenToAvoid: {
              en: 'When CPU-bound calculations are required. Use `multiprocessing` or `concurrent.futures.ProcessPoolExecutor` instead to bypass the GIL.',
              vi: 'Khi cần tính toán nặng về CPU. Hãy dùng `multiprocessing` hoặc `ProcessPoolExecutor` để vượt qua rào cản GIL.',
            },
            consequences: {
              en: 'Bounded queue (`maxsize`) applies automatic backpressure on the producer, preventing Out-Of-Memory crashes under sustained high load.',
              vi: 'Hàng đợi có giới hạn (`maxsize`) tự động tạo lực cản ngược (backpressure) lên producer, chống tràn RAM khi quá tải.',
            },
          },
        },
      ],
    },
    {
      id: 'pat-ch-7',
      number: 7,
      slug: 'type-safe-config-with-dataclass',
      title: {
        en: '7. Type-Safe Configuration with Immutable Dataclasses',
        vi: '7. Cấu Hình Type-Safe Với Dataclass Bất Biến',
      },
      summary: {
        en: 'Parse environment variables into strongly typed, validated, and immutable settings objects at application startup.',
        vi: 'Đọc biến môi trường và chuyển thành đối tượng cấu hình có định kiểu mạnh, kiểm tra hợp lệ và bất biến lúc khởi động.',
      },
      readTimeMinutes: 5,
      sections: [
        {
          id: 'pat-sec-7-1',
          title: {
            en: '12-Factor Type-Safe Configuration Pattern',
            vi: 'Mẫu Cấu Hình Type-Safe Chuẩn 12-Factor',
          },
          patternDetails: {
            problemStatement: {
              en: 'Reading `os.environ.get("PORT")` everywhere in the codebase leads to scattered string parsing, missing variable crashes deep in runtime, and accidental mutations.',
              vi: 'Đọc `os.environ.get("PORT")` rải rác khắp nơi làm phát sinh lỗi ép kiểu chuỗi, gây crash ứng dụng lúc nửa đêm khi thiếu biến môi trường.',
            },
            patternStructure: {
              en: 'A frozen dataclass with a `@classmethod` loader that validates types and presence upfront at module startup.',
              vi: 'Một dataclass đóng băng (frozen) có phương thức `@classmethod` kiểm tra kiểu và tính bắt buộc ngay khi khởi động module.',
            },
            implementationRecipe: {
              language: 'python',
              filename: 'app_config.py',
              explanation: {
                en: 'Immutable configuration class with strict environment parsing and validation.',
                vi: 'Lớp cấu hình bất biến với kiểm tra biến môi trường nghiêm ngặt.',
              },
              code: `import os
from dataclasses import dataclass

@dataclass(frozen=True, slots=True)
class AppConfig:
    env: str
    port: int
    db_url: str
    debug: bool = False

    @classmethod
    def from_env(cls) -> "AppConfig":
        """Load and validate settings from environment variables."""
        db_url = os.environ.get("DATABASE_URL")
        if not db_url:
            raise ValueError("Missing critical environment variable: DATABASE_URL")

        return cls(
            env=os.environ.get("APP_ENV", "production").lower(),
            port=int(os.environ.get("PORT", "8000")),
            db_url=db_url,
            debug=os.environ.get("DEBUG", "false").lower() in ("true", "1", "yes"),
        )

# Bootstrapped once at startup: Fail-Fast if misconfigured!
# config = AppConfig.from_env()`,
            },
            whenToUse: {
              en: 'In every production backend service, web API, and worker process adhering to 12-Factor App methodology.',
              vi: 'Trong mọi dịch vụ backend, API web và tiến trình worker tuân thủ phương pháp 12-Factor App.',
            },
            whenToAvoid: {
              en: 'In trivial 5-line scratch scripts.',
              vi: 'Trong các đoạn script tạm thời ngắn 5 dòng.',
            },
            consequences: {
              en: 'Fails fast at startup with clear errors if credentials are missing, while giving IDE autocomplete and type safety throughout the codebase.',
              vi: 'Báo lỗi ngay lúc khởi động nếu thiếu cấu hình, đồng thời cung cấp gợi ý code IDE và an toàn kiểu cho toàn bộ dự án.',
            },
          },
        },
      ],
    },
    {
      id: 'pat-ch-8',
      number: 8,
      slug: 'adapter-pattern-external-apis',
      title: {
        en: '8. Adapter Pattern for Wrapping External 3rd-Party APIs',
        vi: '8. Mẫu Adapter Bao Bọc API Bên Thứ Ba',
      },
      summary: {
        en: 'Wrap vendor SDKs inside unified application interfaces so changes to third-party APIs never break your domain logic.',
        vi: 'Bao bọc SDK bên thứ ba trong giao diện ứng dụng thống nhất để thay đổi từ nhà cung cấp không làm hỏng logic hệ thống.',
      },
      readTimeMinutes: 5,
      sections: [
        {
          id: 'pat-sec-8-1',
          title: {
            en: 'Third-Party Gateway Adapter Pattern',
            vi: 'Mẫu Adapter Cổng Dịch Vụ Bên Thứ Ba',
          },
          patternDetails: {
            problemStatement: {
              en: 'Directly calling Stripe, Twilio, or AWS SDK methods across your controllers creates tight vendor lock-in and makes mocking external HTTP calls painful.',
              vi: 'Gọi trực tiếp SDK của Stripe, Twilio hay AWS trong controller gây phụ thuộc chặt vào nhà cung cấp và gây khó khăn khi viết mock test.',
            },
            patternStructure: {
              en: 'An abstract gateway Protocol in domain space, with concrete vendor adapter classes mapping domain models to vendor payloads.',
              vi: 'Một Protocol cổng dịch vụ trừu tượng trong domain, cùng class adapter chuyển đổi model nội bộ sang định dạng của nhà cung cấp.',
            },
            implementationRecipe: {
              language: 'python',
              filename: 'payment_adapter.py',
              explanation: {
                en: 'Decoupled payment gateway interface with concrete Stripe adapter.',
                vi: 'Giao diện thanh toán độc lập kèm adapter kết nối Stripe cụ thể.',
              },
              code: `from dataclasses import dataclass
from typing import Protocol

@dataclass(frozen=True)
class PaymentResult:
    transaction_id: str
    is_success: bool
    error_message: str | None = None

class PaymentGateway(Protocol):
    def charge(self, amount_cents: int, currency: str, customer_token: str) -> PaymentResult: ...

class StripePaymentAdapter:
    def __init__(self, api_key: str):
        self.api_key = api_key

    def charge(self, amount_cents: int, currency: str, customer_token: str) -> PaymentResult:
        # Translates domain call into specific vendor HTTP/SDK payload
        try:
            # stripe.Charge.create(amount=amount_cents, ...)
            return PaymentResult(transaction_id="ch_12345", is_success=True)
        except Exception as exc:
            return PaymentResult(transaction_id="", is_success=False, error_message=str(exc))

# Fake Adapter for offline integration tests
class FakePaymentAdapter:
    def charge(self, amount_cents: int, currency: str, customer_token: str) -> PaymentResult:
        return PaymentResult(transaction_id="mock_tx_99", is_success=True)`,
            },
            whenToUse: {
              en: 'Whenever integrating with payment gateways, SMS/email providers, analytics platforms, or cloud storage providers.',
              vi: 'Khi tích hợp cổng thanh toán, dịch vụ gửi SMS/email, nền tảng phân tích hoặc dịch vụ lưu trữ đám mây.',
            },
            whenToAvoid: {
              en: 'When wrapping stable internal utility libraries with no external vendor coupling.',
              vi: 'Khi sử dụng các thư viện tiện ích nội bộ ổn định không phụ thuộc vào nhà cung cấp ngoài.',
            },
            consequences: {
              en: 'Swapping payment providers (e.g. Stripe to Adyen) requires changing only one adapter class with zero edits to core business checkout services.',
              vi: 'Đổi nhà cung cấp thanh toán (từ Stripe sang Adyen) chỉ cần tạo class adapter mới mà không phải sửa một dòng code nào trong dịch vụ thanh toán cốt lõi.',
            },
          },
        },
      ],
    },
  ],
};
