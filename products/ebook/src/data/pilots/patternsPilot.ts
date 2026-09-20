import { Book } from '../../types';

export const PATTERNS_PILOT_BOOK: Book = {
  "id": "python-patterns-recipes",
  "slug": "python-patterns-recipes",
  "title": "Python Patterns & Recipes — Reusable Engineering Solutions",
  "subtitle": {
    "en": "Pythonic Design Patterns, Structural Blueprints & Implementation Recipes",
    "vi": "Mẫu Thiết Kế Chuẩn Pythonic, Bản Vẽ Kiến Trúc & Công Thức Thực Thi"
  },
  "bookType": "Patterns / Recipes",
  "categoryId": "python",
  "subjectId": "programming",
  "author": "4TM Editorial Board",
  "role": "Software Architecture & Design Patterns Group",
  "level": "Intermediate to Advanced",
  "estimatedReadTime": "45 mins",
  "chaptersCount": 8,
  "publishedDate": "2025-02-20",
  "accentColor": "from-violet-600 to-purple-900",
  "tags": [
    "Patterns",
    "Design Patterns",
    "Architecture",
    "Recipes",
    "Concurrency",
    "OOP"
  ],
  "description": {
    "en": "Eight production-grade structural patterns and reusable engineering recipes written in modern Pythonic idioms.",
    "vi": "Tám mẫu thiết kế cấu trúc chuẩn sản xuất và công thức kỹ thuật tái sử dụng được viết theo phong cách Pythonic hiện đại."
  },
  "prerequisites": {
    "en": [
      "Object-oriented Python proficiency",
      "Basic concurrency and architectural knowledge"
    ],
    "vi": [
      "Thành thạo lập trình hướng đối tượng trong Python",
      "Hiểu biết cơ bản về concurrency và kiến trúc"
    ]
  },
  "outcomes": {
    "en": [
      "Implement Strategy, Factory, and Repository patterns cleanly using modern Python features",
      "Build resilient retries with jitter, safe concurrent worker pipelines, and immutable config loaders",
      "Choose the right pattern for each problem without over-engineering or premature abstraction"
    ],
    "vi": [
      "Triển khai các mẫu Strategy, Factory và Repository chuẩn mực bằng tính năng Python hiện đại",
      "Xây dựng cơ chế retry với jitter, pipeline đa luồng an toàn và bộ nạp cấu hình bất biến",
      "Lựa chọn đúng mẫu thiết kế cho từng bài toán mà không làm phức tạp hóa kiến trúc quá mức"
    ]
  },
  "chapters": [
    {
      "id": "pat-ch-1",
      "number": 1,
      "slug": "strategy-pattern-with-callables",
      "title": {
        "en": "1. Strategy Pattern Using Callables & Protocols",
        "vi": "1. Mẫu Strategy Sử Dụng Callable & Protocol"
      },
      "summary": {
        "en": "Swap algorithms dynamically at runtime using Python's first-class functions instead of verbose class hierarchies.",
        "vi": "Thay đổi thuật toán linh hoạt lúc runtime bằng hàm first-class của Python thay vì phải tạo cây class rườm rà."
      },
      "readTimeMinutes": 5,
      "sections": [
        {
          "id": "pat-sec-1-1",
          "title": {
            "en": "Pythonic Strategy Implementation",
            "vi": "Triển Khai Strategy Chuẩn Pythonic"
          },
          "patternDetails": {
            "problem": {
              "en": "You need to support multiple interchangeable algorithms (e.g., pricing discount calculators, compression algorithms, serialization strategies) without hardcoding `if/elif` branches.",
              "vi": "Bạn cần hỗ trợ nhiều thuật toán có thể thay thế cho nhau (như tính chiết khấu giá, thuật toán nén, chiến lược tuần tự hóa) mà không muốn viết chuỗi `if/elif` cứng nhắc."
            },
            "solutionOverview": {
              "en": "Define a `Callable` or `typing.Protocol` specification for the strategy. Pass strategy functions directly as arguments into the client context.",
              "vi": "Định nghĩa giao diện strategy bằng `Callable` hoặc `typing.Protocol`. Truyền trực tiếp các hàm strategy như tham số vào context xử lý."
            },
            "implementation": {
              "language": "python",
              "filename": "strategy_pattern.py",
              "explanation": {
                "en": "Clean strategy pattern utilizing first-class functions and type aliases.",
                "vi": "Mẫu Strategy gọn gàng tận dụng first-class function và alias kiểu dữ liệu."
              },
              "code": "from typing import Callable\nfrom dataclasses import dataclass\n\n# Strategy type signature: accepts base price, returns final discount\nDiscountStrategy = Callable[[float], float]\n\n# Concrete Strategy Functions\ndef no_discount(price: float) -> float:\n    return 0.0\n\ndef seasonal_promo(price: float) -> float:\n    return price * 0.15  # 15% discount\n\ndef vip_loyalty(price: float) -> float:\n    return max(price * 0.20, 50.0)  # 20% or $50 minimum\n\n@dataclass\nclass Order:\n    total_amount: float\n    discount_strategy: DiscountStrategy = no_discount\n\n    def calculate_final_price(self) -> float:\n        discount = self.discount_strategy(self.total_amount)\n        return max(0.0, self.total_amount - discount)\n\n# Usage\norder = Order(total_amount=200.0, discount_strategy=seasonal_promo)\nprint(f\"Final: ${order.calculate_final_price():.2f}\")  # $170.00"
            }
          }
        }
      ]
    },
    {
      "id": "pat-ch-2",
      "number": 2,
      "slug": "factory-pattern-with-registry",
      "title": {
        "en": "2. Factory Pattern with Classmethod & Registry",
        "vi": "2. Mẫu Factory Với Classmethod & Bảng Đăng Ký (Registry)"
      },
      "summary": {
        "en": "Decouple object creation from concrete types using dictionary-driven class registration decorators.",
        "vi": "Tách rời việc khởi tạo đối tượng khỏi các kiểu cụ thể bằng decorator tự đăng ký vào từ điển registry."
      },
      "readTimeMinutes": 5,
      "sections": [
        {
          "id": "pat-sec-2-1",
          "title": {
            "en": "Self-Registering Factory Architecture",
            "vi": "Kiến Trúc Factory Tự Đăng Ký"
          },
          "patternDetails": {
            "problem": {
              "en": "Instantiating different parser or exporter handlers based on dynamic file extensions or API payload types without modifying a central factory function.",
              "vi": "Khởi tạo các bộ xử lý parser hoặc exporter khác nhau dựa trên phần mở rộng file hoặc kiểu payload API mà không cần sửa hàm factory trung tâm."
            },
            "solutionOverview": {
              "en": "A central registry dictionary mapping keys to factory constructors, populated automatically via a decorator.",
              "vi": "Một bảng từ điển trung tâm ánh xạ key tới hàm khởi tạo, được đăng ký tự động thông qua decorator."
            },
            "implementation": {
              "language": "python",
              "filename": "factory_registry.py",
              "explanation": {
                "en": "Self-registering exporter factory using a decorator pattern.",
                "vi": "Factory xuất dữ liệu tự đăng ký sử dụng decorator."
              },
              "code": "from typing import Protocol, Type\n\nclass ReportExporter(Protocol):\n    def export(self, data: dict) -> bytes: ...\n\nclass ExporterFactory:\n    _registry: dict[str, Type[ReportExporter]] = {}\n\n    @classmethod\n    def register(cls, format_name: str):\n        def decorator(subclass: Type[ReportExporter]):\n            cls._registry[format_name.lower()] = subclass\n            return subclass\n        return decorator\n\n    @classmethod\n    def create(cls, format_name: str, **kwargs) -> ReportExporter:\n        format_key = format_name.lower()\n        if format_key not in cls._registry:\n            valid = \", \".join(cls._registry.keys())\n            raise ValueError(f\"Unknown format '{format_name}'. Supported: {valid}\")\n        return cls._registry[format_key](**kwargs)\n\n# Plug-in implementations register themselves automatically\n@ExporterFactory.register(\"json\")\nclass JsonExporter:\n    def export(self, data: dict) -> bytes:\n        import json\n        return json.dumps(data).encode(\"utf-8\")\n\n@ExporterFactory.register(\"csv\")\nclass CsvExporter:\n    def export(self, data: dict) -> bytes:\n        return b\"id,name\\n1,Sample\"\n\n# Client usage: fully decoupled from concrete classes\nexporter = ExporterFactory.create(\"json\")"
            }
          }
        }
      ]
    },
    {
      "id": "pat-ch-3",
      "number": 3,
      "slug": "repository-pattern-persistence-isolation",
      "title": {
        "en": "3. Repository Pattern for Persistence Isolation",
        "vi": "3. Mẫu Repository Phân Tách Tầng Lưu Trữ Dữ Liệu"
      },
      "summary": {
        "en": "Isolate database queries and ORMs behind clean domain interfaces for painless unit testing and database switching.",
        "vi": "Cách ly các câu lệnh truy vấn database và ORM phía sau giao diện domain để unit test và đổi database dễ dàng."
      },
      "readTimeMinutes": 6,
      "sections": [
        {
          "id": "pat-sec-3-1",
          "title": {
            "en": "Domain Repository Pattern",
            "vi": "Triển Khai Mẫu Domain Repository"
          },
          "patternDetails": {
            "problem": {
              "en": "Direct SQL queries or ORM models scattered throughout business logic make testing slow and tie the application permanently to a specific database engine.",
              "vi": "Các câu lệnh SQL hoặc ORM rải rác khắp logic nghiệp vụ khiến việc chạy test bị chậm và buộc ứng dụng phụ thuộc chặt vào một loại database."
            },
            "solutionOverview": {
              "en": "An abstract repository interface defining CRUD operations using pure domain models, implemented by concrete SQL and In-Memory adapter classes.",
              "vi": "Một giao diện repository trừu tượng định nghĩa các thao tác CRUD dùng model thuần túy, được hiện thực bởi class SQL thật và class in-memory để test."
            },
            "implementation": {
              "language": "python",
              "filename": "repository_pattern.py",
              "explanation": {
                "en": "Repository interface with in-memory test fake and SQL implementation.",
                "vi": "Giao diện Repository kèm bản giả lập bộ nhớ in-memory để kiểm thử siêu tốc."
              },
              "code": "from dataclasses import dataclass\nfrom typing import Protocol\n\n@dataclass(frozen=True)\nclass User:\n    id: str\n    email: str\n    is_active: bool = True\n\nclass UserRepository(Protocol):\n    def get_by_id(self, user_id: str) -> User | None: ...\n    def save(self, user: User) -> None: ...\n\n# Blazing-fast in-memory fake for unit testing (No database needed!)\nclass InMemoryUserRepository:\n    def __init__(self):\n        self._users: dict[str, User] = {}\n\n    def get_by_id(self, user_id: str) -> User | None:\n        return self._users.get(user_id)\n\n    def save(self, user: User) -> None:\n        self._users[user.id] = user\n\n# Pure domain service depending ONLY on the interface\nclass UserService:\n    def __init__(self, repo: UserRepository):\n        self.repo = repo\n\n    def activate_user(self, user_id: str) -> bool:\n        user = self.repo.get_by_id(user_id)\n        if not user:\n            return False\n        updated = User(id=user.id, email=user.email, is_active=True)\n        self.repo.save(updated)\n        return True"
            }
          }
        }
      ]
    },
    {
      "id": "pat-ch-4",
      "number": 4,
      "slug": "retry-pattern-exponential-backoff-jitter",
      "title": {
        "en": "4. Resilient Retry Pattern with Exponential Backoff & Jitter",
        "vi": "4. Mẫu Retry Phục Hồi Lỗi Với Exponential Backoff & Jitter"
      },
      "summary": {
        "en": "Handle transient network hiccups gracefully without overwhelming downstream services in a thundering herd.",
        "vi": "Xử lý lỗi mạng tạm thời thông minh mà không làm sập dịch vụ đích do hiệu ứng thundering herd."
      },
      "readTimeMinutes": 5,
      "sections": [
        {
          "id": "pat-sec-4-1",
          "title": {
            "en": "Production Retry Mechanism",
            "vi": "Cơ Chế Retry Chuẩn Sản Xuất"
          },
          "patternDetails": {
            "problem": {
              "en": "Third-party APIs and microservices experience intermittent 503 errors and network timeouts. Retrying immediately or at fixed intervals causes cascading service outages.",
              "vi": "API bên thứ ba và microservice thường gặp lỗi 503 hoặc timeout chập chờn. Việc retry ngay lập tức hoặc theo chu kỳ cố định sẽ làm nghẽn dịch vụ."
            },
            "solutionOverview": {
              "en": "A retry decorator calculating sleep delay as `base_delay * (2 ** attempt) + random_jitter`.",
              "vi": "Một decorator retry tính toán thời gian chờ theo công thức `base_delay * (2 ** attempt) + random_jitter`."
            },
            "implementation": {
              "language": "python",
              "filename": "retry_backoff.py",
              "explanation": {
                "en": "Robust retry decorator with exponential backoff and randomized jitter.",
                "vi": "Decorator retry bền bỉ với độ trễ hàm mũ và độ lệch ngẫu nhiên jitter."
              },
              "code": "import functools\nimport random\nimport time\nfrom typing import Callable, Type\n\ndef retry_with_backoff(\n    retries: int = 3,\n    base_delay: float = 0.5,\n    max_delay: float = 10.0,\n    retryable_exceptions: tuple[Type[Exception], ...] = (ConnectionError, TimeoutError),\n) -> Callable:\n    def decorator(func: Callable) -> Callable:\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            last_exception = None\n            for attempt in range(retries):\n                try:\n                    return func(*args, **kwargs)\n                except retryable_exceptions as exc:\n                    last_exception = exc\n                    if attempt == retries - 1:\n                        break  # Exhausted all attempts\n                    # Calculate exponential delay with randomized jitter\n                    delay = min(base_delay * (2 ** attempt), max_delay)\n                    jitter = random.uniform(0, delay * 0.2)\n                    total_sleep = delay + jitter\n                    print(f\"Attempt {attempt + 1} failed: {exc}. Retrying in {total_sleep:.2f}s...\")\n                    time.sleep(total_sleep)\n            raise last_exception\n        return wrapper\n    return decorator\n\n# Usage\n@retry_with_backoff(retries=3, base_delay=1.0)\ndef call_external_gateway():\n    # Simulates transient network call\n    pass"
            }
          }
        }
      ]
    },
    {
      "id": "pat-ch-5",
      "number": 5,
      "slug": "custom-context-manager-nested-resources",
      "title": {
        "en": "5. Custom Context Manager for Nested Resources",
        "vi": "5. Mẫu Quản Lý Ngữ Cảnh Cho Tài Nguyên Lồng Nhau"
      },
      "summary": {
        "en": "Coordinate the orderly acquisition and reverse-order release of multiple dependent resources safely.",
        "vi": "Điều phối việc cấp phát tuần tự và giải phóng theo thứ tự ngược lại cho nhiều tài nguyên phụ thuộc nhau."
      },
      "readTimeMinutes": 5,
      "sections": [
        {
          "id": "pat-sec-5-1",
          "title": {
            "en": "Multi-Resource Context Coordination",
            "vi": "Điều Phối Ngữ Cảnh Đa Tài Nguyên"
          },
          "patternDetails": {
            "problem": {
              "en": "Acquiring multiple resources (e.g. temporary directory, database connection, file lock) where failure on the 3rd resource must safely release the first two without leaks.",
              "vi": "Cấp phát nhiều tài nguyên (thư mục tạm, kết nối DB, khóa file) mà nếu tài nguyên thứ 3 bị lỗi thì 2 tài nguyên đầu vẫn phải được giải phóng an toàn."
            },
            "solutionOverview": {
              "en": "Use `contextlib.ExitStack` to dynamically register cleanup callbacks that unwind in strict reverse order upon error or block exit.",
              "vi": "Sử dụng `contextlib.ExitStack` để đăng ký động các hàm dọn dẹp và tự động kích hoạt theo thứ tự đảo ngược khi có lỗi hoặc thoát khối lệnh."
            },
            "implementation": {
              "language": "python",
              "filename": "exit_stack_pattern.py",
              "explanation": {
                "en": "Managing multiple dynamic file locks and buffers using ExitStack.",
                "vi": "Quản lý nhiều lock và buffer file động an toàn bằng ExitStack."
              },
              "code": "from contextlib import ExitStack\nfrom pathlib import Path\n\ndef merge_log_files(source_paths: list[Path], output_path: Path) -> int:\n    \"\"\"Safely open N input files and 1 output file simultaneously.\"\"\"\n    total_lines = 0\n    with ExitStack() as stack:\n        # Open output file\n        out_f = stack.enter_context(open(output_path, \"w\", encoding=\"utf-8\"))\n        \n        # Dynamically open all source files; if any fail, all prior files are closed automatically!\n        in_files = [stack.enter_context(open(p, \"r\", encoding=\"utf-8\")) for p in source_paths]\n        \n        for f in in_files:\n            for line in f:\n                out_f.write(line)\n                total_lines += 1\n\n    return total_lines"
            }
          }
        }
      ]
    },
    {
      "id": "pat-ch-6",
      "number": 6,
      "slug": "producer-consumer-worker-queue",
      "title": {
        "en": "6. Producer–Consumer Pattern with queue.Queue",
        "vi": "6. Mẫu Producer–Consumer Với queue.Queue"
      },
      "summary": {
        "en": "Decouple fast data producers from slow I/O consumers using thread-safe bounded in-memory queues.",
        "vi": "Tách rời bên tạo dữ liệu nhanh và bên xử lý I/O chậm bằng hàng đợi đa luồng an toàn có giới hạn kích thước."
      },
      "readTimeMinutes": 6,
      "sections": [
        {
          "id": "pat-sec-6-1",
          "title": {
            "en": "Thread-Safe Producer-Consumer Architecture",
            "vi": "Kiến Trúc Producer-Consumer Đa Luồng An Toàn"
          },
          "patternDetails": {
            "problem": {
              "en": "A fast data producer (e.g. packet sniffer, event listener) generates data faster than worker threads can process/upload it, requiring bounded buffering and graceful shutdown.",
              "vi": "Bên thu thập dữ liệu sinh sự kiện nhanh hơn tốc độ ghi đĩa/gửi mạng của worker, đòi hỏi bộ nhớ đệm có giới hạn và cơ chế tắt an toàn."
            },
            "solutionOverview": {
              "en": "A thread-safe `queue.Queue(maxsize=N)` connecting producer threads to worker consumer threads with a `None` sentinel signaling shutdown.",
              "vi": "Hàng đợi `queue.Queue(maxsize=N)` kết nối luồng producer với các luồng worker consumer kèm đối tượng sentinel `None` để báo tắt máy."
            },
            "implementation": {
              "language": "python",
              "filename": "producer_consumer.py",
              "explanation": {
                "en": "Bounded thread-safe worker pipeline with sentinel shutdown.",
                "vi": "Pipeline xử lý đa luồng có chặn tràn bộ nhớ và cơ chế tắt an toàn."
              },
              "code": "import queue\nimport threading\nimport time\n\nWORKER_SENTINEL = object()  # Unique poison pill for clean worker shutdown\n\ndef worker(q: queue.Queue, worker_id: int):\n    while True:\n        item = q.get()\n        if item is WORKER_SENTINEL:\n            q.task_done()\n            break\n        # Process item\n        print(f\"[Worker-{worker_id}] Processed: {item}\")\n        time.sleep(0.05)\n        q.task_done()\n\n# Bounded queue prevents unbounded memory growth under load\nwork_queue = queue.Queue(maxsize=100)\n\n# Launch 3 worker threads\nthreads = []\nfor i in range(3):\n    t = threading.Thread(target=worker, args=(work_queue, i), daemon=True)\n    t.start()\n    threads.append(t)\n\n# Producer pushes 10 tasks\nfor task_id in range(10):\n    work_queue.put(f\"Task-{task_id}\")\n\n# Wait for completion & send shutdown pills\nwork_queue.join()\nfor _ in threads:\n    work_queue.put(WORKER_SENTINEL)\nfor t in threads:\n    t.join()"
            }
          }
        }
      ]
    },
    {
      "id": "pat-ch-7",
      "number": 7,
      "slug": "type-safe-config-with-dataclass",
      "title": {
        "en": "7. Type-Safe Configuration with Immutable Dataclasses",
        "vi": "7. Cấu Hình Type-Safe Với Dataclass Bất Biến"
      },
      "summary": {
        "en": "Parse environment variables into strongly typed, validated, and immutable settings objects at application startup.",
        "vi": "Đọc biến môi trường và chuyển thành đối tượng cấu hình có định kiểu mạnh, kiểm tra hợp lệ và bất biến lúc khởi động."
      },
      "readTimeMinutes": 5,
      "sections": [
        {
          "id": "pat-sec-7-1",
          "title": {
            "en": "12-Factor Type-Safe Configuration Pattern",
            "vi": "Mẫu Cấu Hình Type-Safe Chuẩn 12-Factor"
          },
          "patternDetails": {
            "problem": {
              "en": "Reading `os.environ.get(\"PORT\")` everywhere in the codebase leads to scattered string parsing, missing variable crashes deep in runtime, and accidental mutations.",
              "vi": "Đọc `os.environ.get(\"PORT\")` rải rác khắp nơi làm phát sinh lỗi ép kiểu chuỗi, gây crash ứng dụng lúc nửa đêm khi thiếu biến môi trường."
            },
            "solutionOverview": {
              "en": "A frozen dataclass with a `@classmethod` loader that validates types and presence upfront at module startup.",
              "vi": "Một dataclass đóng băng (frozen) có phương thức `@classmethod` kiểm tra kiểu và tính bắt buộc ngay khi khởi động module."
            },
            "implementation": {
              "language": "python",
              "filename": "app_config.py",
              "explanation": {
                "en": "Immutable configuration class with strict environment parsing and validation.",
                "vi": "Lớp cấu hình bất biến với kiểm tra biến môi trường nghiêm ngặt."
              },
              "code": "import os\nfrom dataclasses import dataclass\n\n@dataclass(frozen=True, slots=True)\nclass AppConfig:\n    env: str\n    port: int\n    db_url: str\n    debug: bool = False\n\n    @classmethod\n    def from_env(cls) -> \"AppConfig\":\n        \"\"\"Load and validate settings from environment variables.\"\"\"\n        db_url = os.environ.get(\"DATABASE_URL\")\n        if not db_url:\n            raise ValueError(\"Missing critical environment variable: DATABASE_URL\")\n\n        return cls(\n            env=os.environ.get(\"APP_ENV\", \"production\").lower(),\n            port=int(os.environ.get(\"PORT\", \"8000\")),\n            db_url=db_url,\n            debug=os.environ.get(\"DEBUG\", \"false\").lower() in (\"true\", \"1\", \"yes\"),\n        )\n\n# Bootstrapped once at startup: Fail-Fast if misconfigured!\n# config = AppConfig.from_env()"
            }
          }
        }
      ]
    },
    {
      "id": "pat-ch-8",
      "number": 8,
      "slug": "adapter-pattern-external-apis",
      "title": {
        "en": "8. Adapter Pattern for Wrapping External 3rd-Party APIs",
        "vi": "8. Mẫu Adapter Bao Bọc API Bên Thứ Ba"
      },
      "summary": {
        "en": "Wrap vendor SDKs inside unified application interfaces so changes to third-party APIs never break your domain logic.",
        "vi": "Bao bọc SDK bên thứ ba trong giao diện ứng dụng thống nhất để thay đổi từ nhà cung cấp không làm hỏng logic hệ thống."
      },
      "readTimeMinutes": 5,
      "sections": [
        {
          "id": "pat-sec-8-1",
          "title": {
            "en": "Third-Party Gateway Adapter Pattern",
            "vi": "Mẫu Adapter Cổng Dịch Vụ Bên Thứ Ba"
          },
          "patternDetails": {
            "problem": {
              "en": "Directly calling Stripe, Twilio, or AWS SDK methods across your controllers creates tight vendor lock-in and makes mocking external HTTP calls painful.",
              "vi": "Gọi trực tiếp SDK của Stripe, Twilio hay AWS trong controller gây phụ thuộc chặt vào nhà cung cấp và gây khó khăn khi viết mock test."
            },
            "solutionOverview": {
              "en": "An abstract gateway Protocol in domain space, with concrete vendor adapter classes mapping domain models to vendor payloads.",
              "vi": "Một Protocol cổng dịch vụ trừu tượng trong domain, cùng class adapter chuyển đổi model nội bộ sang định dạng của nhà cung cấp."
            },
            "implementation": {
              "language": "python",
              "filename": "payment_adapter.py",
              "explanation": {
                "en": "Decoupled payment gateway interface with concrete Stripe adapter.",
                "vi": "Giao diện thanh toán độc lập kèm adapter kết nối Stripe cụ thể."
              },
              "code": "from dataclasses import dataclass\nfrom typing import Protocol\n\n@dataclass(frozen=True)\nclass PaymentResult:\n    transaction_id: str\n    is_success: bool\n    error_message: str | None = None\n\nclass PaymentGateway(Protocol):\n    def charge(self, amount_cents: int, currency: str, customer_token: str) -> PaymentResult: ...\n\nclass StripePaymentAdapter:\n    def __init__(self, api_key: str):\n        self.api_key = api_key\n\n    def charge(self, amount_cents: int, currency: str, customer_token: str) -> PaymentResult:\n        # Translates domain call into specific vendor HTTP/SDK payload\n        try:\n            # stripe.Charge.create(amount=amount_cents, ...)\n            return PaymentResult(transaction_id=\"ch_12345\", is_success=True)\n        except Exception as exc:\n            return PaymentResult(transaction_id=\"\", is_success=False, error_message=str(exc))\n\n# Fake Adapter for offline integration tests\nclass FakePaymentAdapter:\n    def charge(self, amount_cents: int, currency: str, customer_token: str) -> PaymentResult:\n        return PaymentResult(transaction_id=\"mock_tx_99\", is_success=True)"
            }
          }
        }
      ]
    }
  ]
};
