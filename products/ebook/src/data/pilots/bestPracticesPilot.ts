import { Book } from '../../types';

export const BEST_PRACTICES_PILOT_BOOK: Book = {
  "id": "python-engineering-best-practices",
  "slug": "python-engineering-best-practices",
  "title": "Python Engineering Best Practices — Standards & Trade-offs",
  "subtitle": {
    "en": "Explicit API Design, Boundary Isolation & Architectural Conventions",
    "vi": "Thiết Kế API Tường Minh, Phân Tách Ranh Giới & Quy Chuẩn Kiến Trúc"
  },
  "bookType": "Best Practices",
  "categoryId": "python",
  "subjectId": "programming",
  "author": "4TM Editorial Board",
  "role": "Architecture & Engineering Standards Group",
  "level": "Professional / Team Standards",
  "estimatedReadTime": "35 mins",
  "chaptersCount": 8,
  "publishedDate": "2025-02-20",
  "accentColor": "from-emerald-600 to-teal-900",
  "tags": [
    "Best Practices",
    "Architecture",
    "Clean Code",
    "API Design",
    "Production Standards"
  ],
  "description": {
    "en": "Eight fundamental engineering standards for building scalable, testable, and robust Python software in team environments.",
    "vi": "Tám tiêu chuẩn kỹ thuật cốt lõi để xây dựng phần mềm Python có khả năng mở rộng, dễ kiểm thử và ổn định trong môi trường nhóm."
  },
  "prerequisites": {
    "en": [
      "Experience writing multi-module Python applications"
    ],
    "vi": [
      "Kinh nghiệm phát triển ứng dụng Python đa module"
    ]
  },
  "outcomes": {
    "en": [
      "Design clean, side-effect free APIs with explicit contracts and boundary isolation",
      "Establish robust exception hierarchies and structured production observability",
      "Make informed architectural trade-offs between simplicity, maintainability, and raw speed"
    ],
    "vi": [
      "Thiết kế API trong sáng, không tác dụng phụ với hợp đồng rõ ràng và phân tách ranh giới",
      "Xây dựng hệ thống phân cấp ngoại lệ và cơ chế quan sát log chuyên nghiệp cho sản phẩm",
      "Đưa ra các đánh đổi kiến trúc sáng suốt giữa tính đơn giản, khả năng bảo trì và tốc độ"
    ]
  },
  "chapters": [
    {
      "id": "prac-ch-1",
      "number": 1,
      "slug": "explicit-api-design-no-side-effects",
      "title": {
        "en": "1. Explicit API Design: Avoid Hidden Side-Effects",
        "vi": "1. Thiết Kế API Tường Minh: Tránh Tác Dụng Phụ Ẩn"
      },
      "summary": {
        "en": "Design functions that accept inputs, return values, and never mutate caller objects or global state without notice.",
        "vi": "Thiết kế hàm nhận dữ liệu đầu vào, trả về kết quả và không bao giờ tự ý sửa đổi đối tượng truyền vào hoặc biến toàn cục."
      },
      "readTimeMinutes": 4,
      "sections": [
        {
          "id": "prac-sec-1-1",
          "title": {
            "en": "Standards for Explicit API Design",
            "vi": "Quy Chuẩn Thiết Kế API Tường Minh"
          },
          "practiceDetails": {
            "whyItMatters": {
              "en": "In-place mutation of caller arguments introduces invisible coupling and non-deterministic concurrency bugs that are notoriously difficult to track across large codebases.",
              "vi": "Việc sửa đổi tham số truyền vào tạo ra sự phụ thuộc ngầm và các lỗi tương tranh khó lường rất khó phát hiện trong các dự án lớn."
            },
            "recommendedPractice": {
              "en": "Functions must be pure where possible or explicitly declare mutation behavior in their name and type signatures. Avoid mutating input arguments in-place unless that is the explicit primary purpose of the function.",
              "vi": "Các hàm nên thuần túy (pure) hoặc thể hiện rõ hành vi biến đổi dữ liệu qua tên gọi và chữ ký kiểu. Không bao giờ tự ý sửa đổi tham số truyền vào trừ khi đó là mục đích chính được nêu rõ của hàm."
            },
            "goodExample": {
              "language": "python",
              "code": "Return a new transformed object (e.g. `tuple`, `dataclass`, or new `list`) rather than modifying the passed argument in place."
            },
            "riskyExample": {
              "language": "python",
              "code": "Writing helper functions that modify dictionaries or lists in-place while also returning a status boolean."
            },
            "checklist": {
              "en": [
                "\"Explicit is better than implicit.\" A function should either return a value or mutate state, but rarely both."
              ],
              "vi": [
                "\"Tường minh luôn tốt hơn ngầm định.\" Một hàm nên trả về giá trị hoặc thay đổi trạng thái, hiếm khi làm cả hai."
              ]
            }
          },
          "checklist": {
            "title": {
              "en": "Engineering Standard Checklist",
              "vi": "Danh Sách Kiểm Tra Quy Chuẩn Kỹ Thuật"
            },
            "items": {
              "en": [
                "Functions do not mutate input arguments in place",
                "No hidden dependencies on global variables"
              ],
              "vi": [
                "Hàm không sửa đổi trực tiếp tham số truyền vào",
                "Không phụ thuộc ngầm vào biến toàn cục"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "prac-ch-2",
      "number": 2,
      "slug": "naming-conventions-and-cognitive-load",
      "title": {
        "en": "2. Naming Conventions & Minimizing Cognitive Load",
        "vi": "2. Quy Ước Đặt Tên & Giảm Thiểu Tải Nhận Thức"
      },
      "summary": {
        "en": "Use PEP 8 naming conventions and domain-specific terminology that communicates intent without requiring code inspection.",
        "vi": "Áp dụng quy ước PEP 8 và thuật ngữ nghiệp vụ chuẩn xác giúp thể hiện mục đích của mã nguồn mà không cần đọc chi tiết."
      },
      "readTimeMinutes": 4,
      "sections": [
        {
          "id": "prac-sec-2-1",
          "title": {
            "en": "Standards for Descriptive Technical Naming",
            "vi": "Quy Chuẩn Đặt Tên Kỹ Thuật Rõ Ràng"
          },
          "practiceDetails": {
            "whyItMatters": {
              "en": "Clear naming reduces the mental energy required during code reviews and maintenance, allowing engineers to focus on business logic rather than deciphering abbreviations.",
              "vi": "Đặt tên rõ ràng giúp giảm tải trí óc khi review và bảo trì code, giúp kỹ sư tập trung vào logic thay vì phải đoán nghĩa các từ viết tắt."
            },
            "recommendedPractice": {
              "en": "Adhere strictly to PEP 8: `snake_case` for functions/variables, `PascalCase` for classes/exceptions, `UPPER_SNAKE_CASE` for module constants. Prefix private implementation details with a single leading underscore `_private`.",
              "vi": "Tuân thủ nghiêm ngặt PEP 8: `snake_case` cho hàm/biến, `PascalCase` cho class/ngoại lệ, `UPPER_SNAKE_CASE` cho hằng số. Dùng dấu gạch dưới `_private` cho các chi tiết nội bộ."
            },
            "goodExample": {
              "language": "python",
              "code": "Use verb-noun phrases for functions (`calculate_vat_tax()`, `fetch_active_users()`) and noun phrases for classes and variables (`InvoiceCalculator`, `active_users`)."
            },
            "riskyExample": {
              "language": "python",
              "code": "Cryptic single-letter variable names (`d`, `tmp`, `val`) outside of trivial math equations or short loop indices (`i`)."
            },
            "checklist": {
              "en": [
                "Name variables for what they represent, not for their data type (e.g. `users_by_id` rather than `user_dict`)."
              ],
              "vi": [
                "Đặt tên theo ý nghĩa đại diện của dữ liệu, không đặt theo kiểu dữ liệu (ví dụ `users_by_id` thay vì `user_dict`)."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "prac-ch-3",
      "number": 3,
      "slug": "exception-boundaries-and-domain-errors",
      "title": {
        "en": "3. Exception Boundaries: Custom Domain Exceptions",
        "vi": "3. Phân Tách Ranh Giới Ngoại Lệ: Domain Exception Tùy Biến"
      },
      "summary": {
        "en": "Define domain-specific exception hierarchies and catch technical library errors at subsystem boundaries.",
        "vi": "Định nghĩa cây ngoại lệ nghiệp vụ riêng và chặn các lỗi kỹ thuật tầng thấp tại ranh giới module."
      },
      "readTimeMinutes": 4,
      "sections": [
        {
          "id": "prac-sec-3-1",
          "title": {
            "en": "Domain Exception Architecture",
            "vi": "Kiến Trúc Phân Cấp Ngoại Lệ Nghiệp Vụ"
          },
          "practiceDetails": {
            "whyItMatters": {
              "en": "Prevents database-specific errors (like `psycopg2.OperationalError`) from leaking into high-level business controllers or web templates.",
              "vi": "Ngăn chặn các lỗi đặc thù của database (như `psycopg2.OperationalError`) bị rò rỉ lên tầng controller nghiệp vụ hoặc giao diện web."
            },
            "recommendedPractice": {
              "en": "Create a base exception class for your package (`class AppError(Exception): pass`) and derive specific domain errors (`UserNotFoundError`, `InsufficientFundsError`). Translate lower-level I/O or DB errors at the repository boundary.",
              "vi": "Tạo một lớp ngoại lệ cơ sở cho dự án (`class AppError(Exception): pass`) và kế thừa các lỗi nghiệp vụ cụ thể (`UserNotFoundError`, `InsufficientFundsError`). Dịch các lỗi I/O hay database tầng dưới tại ranh giới repository."
            },
            "goodExample": {
              "language": "python",
              "code": "Catch low-level library exceptions inside gateway adapters and re-raise custom domain exceptions using `raise DomainError(...) from err`."
            },
            "riskyExample": {
              "language": "python",
              "code": "Letting raw socket, HTTP, or SQL exceptions bubble unhandled directly to HTTP response handlers."
            },
            "checklist": {
              "en": [
                "Every public library or microservice package should provide its own base exception class."
              ],
              "vi": [
                "Mỗi thư viện hoặc microservice nên có một lớp Exception gốc riêng biệt."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "prac-ch-4",
      "number": 4,
      "slug": "production-logging-strategy",
      "title": {
        "en": "4. Production Logging: Events, Levels & Payloads",
        "vi": "4. Chiến Lược Ghi Log Sản Xuất: Sự Kiện, Mức Độ & Dữ Liệu"
      },
      "summary": {
        "en": "Log actionable business events with structured key-value context instead of unstructured free-text strings.",
        "vi": "Ghi lại các sự kiện có giá trị với ngữ cảnh dạng key-value có cấu trúc thay vì chuỗi văn bản tự do khó tìm kiếm."
      },
      "readTimeMinutes": 4,
      "sections": [
        {
          "id": "prac-sec-4-1",
          "title": {
            "en": "Standards for Observability Logging",
            "vi": "Quy Chuẩn Ghi Log Giám Sát"
          },
          "practiceDetails": {
            "whyItMatters": {
              "en": "Structured logs allow log aggregators (Elasticsearch, CloudWatch) to filter, search, and chart operational metrics without fragile regex string parsing.",
              "vi": "Log có cấu trúc giúp các hệ thống gom log (ELK, CloudWatch) lọc, tìm kiếm và vẽ biểu đồ giám sát mà không cần viết regex phức tạp."
            },
            "recommendedPractice": {
              "en": "Use appropriate log levels: `DEBUG` for diagnostic tracing, `INFO` for major lifecycle events, `WARNING` for recoverable anomalies, `ERROR` for operation failures, and `CRITICAL` for service downtime.",
              "vi": "Sử dụng đúng cấp độ log: `DEBUG` cho vết chẩn đoán, `INFO` cho sự kiện vòng đời chính, `WARNING` cho bất thường có thể tự phục hồi, `ERROR` cho tác vụ thất bại và `CRITICAL` cho sự cố dừng dịch vụ."
            },
            "goodExample": {
              "language": "python",
              "code": "Pass context via `extra={\"user_id\": ..., \"tenant_id\": ...}` and format output as single-line JSON."
            },
            "riskyExample": {
              "language": "python",
              "code": "Using `print()` statements for debugging in production, or logging sensitive passwords, tokens, or PII."
            },
            "checklist": {
              "en": [
                "Never log sensitive credentials. Always include correlation/request IDs in multi-tier architectures."
              ],
              "vi": [
                "Tuyệt đối không ghi log thông tin bảo mật. Luôn kèm correlation ID trong hệ thống microservice."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "prac-ch-5",
      "number": 5,
      "slug": "type-hints-for-public-interfaces",
      "title": {
        "en": "5. Type Annotations for Public Boundaries",
        "vi": "5. Ghi Chú Kiểu Dữ Liệu Cho Các Ranh Giới Công Khai"
      },
      "summary": {
        "en": "Enforce type safety at module boundaries to eliminate null pointer bugs and streamline team refactorings.",
        "vi": "Bắt buộc an toàn kiểu tại ranh giới module để loại bỏ lỗi null pointer và hỗ trợ refactor an toàn."
      },
      "readTimeMinutes": 4,
      "sections": [
        {
          "id": "prac-sec-5-1",
          "title": {
            "en": "Typing Standards & Guidelines",
            "vi": "Tiêu Chuẩn Định Kiểu Dữ Liệu"
          },
          "practiceDetails": {
            "whyItMatters": {
              "en": "Static type checking catches parameter order mistakes, None dereferences, and missing attributes before deployment.",
              "vi": "Kiểm tra kiểu tĩnh giúp phát hiện nhầm thứ tự tham số, lỗi truy cập None và thiếu thuộc tính trước khi deploy."
            },
            "recommendedPractice": {
              "en": "Annotate all exported public function signatures, dataclass fields, and class methods. Run `mypy --strict` in CI/CD.",
              "vi": "Khai báo kiểu cho mọi chữ ký hàm công khai, trường dataclass và method. Chạy `mypy --strict` trong CI/CD."
            },
            "goodExample": {
              "language": "python",
              "code": "Use `typing.Protocol` for interface inputs and concrete dataclasses/models for output returns."
            },
            "riskyExample": {
              "language": "python",
              "code": "Using `typing.Any` as an escape hatch across the codebase, defeating the entire purpose of type checking."
            },
            "checklist": {
              "en": [
                "Be liberal in what you accept (`Sequence`, `Mapping`), and specific in what you return (`list`, `dict`, `User`)."
              ],
              "vi": [
                "Nhận tham số linh hoạt (`Sequence`, `Mapping`), nhưng trả về kiểu cụ thể (`list`, `dict`, `User`)."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "prac-ch-6",
      "number": 6,
      "slug": "testing-at-the-right-boundary",
      "title": {
        "en": "6. Testing at the Right Boundary: Unit vs Integration",
        "vi": "6. Kiểm Thử Đúng Ranh Giới: Unit Test So Với Integration Test"
      },
      "summary": {
        "en": "Test pure business logic with fast in-memory unit tests and verify external network/database I/O with integration suites.",
        "vi": "Kiểm thử logic nghiệp vụ thuần túy bằng unit test siêu tốc và xác thực I/O database/mạng bằng integration test."
      },
      "readTimeMinutes": 4,
      "sections": [
        {
          "id": "prac-sec-6-1",
          "title": {
            "en": "Automated Testing Strategy",
            "vi": "Chiến Lược Kiểm Thử Tự Động"
          },
          "practiceDetails": {
            "whyItMatters": {
              "en": "Over-mocking leads to brittle tests that pass even when production fails; under-mocking makes test suites painfully slow.",
              "vi": "Lạm dụng mock dẫn đến test vẫn xanh dù production chạy lỗi; thiếu mock khiến bộ test chạy cực kỳ chậm chạp."
            },
            "recommendedPractice": {
              "en": "Maintain a 70/20/10 testing pyramid: fast unit tests for domain logic, integration tests for DB/API adapters, and smoke tests for full workflows.",
              "vi": "Duy trì kim tự tháp kiểm thử 70/20/10: unit test nhanh cho logic, integration test cho adapter DB/API, và smoke test cho toàn bộ luồng."
            },
            "goodExample": {
              "language": "python",
              "code": "Use `pytest` fixtures for setup/teardown and test doubles (fakes/in-memory implementations) rather than deeply mocking internal methods."
            },
            "riskyExample": {
              "language": "python",
              "code": "Mocking third-party libraries so heavily that you end up testing your mock configuration rather than real behavior."
            },
            "checklist": {
              "en": [
                "Unit test your business logic; integration test your database and third-party integrations."
              ],
              "vi": [
                "Unit test logic nghiệp vụ; integration test kết nối database và dịch vụ bên thứ ba."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "prac-ch-7",
      "number": 7,
      "slug": "dependency-management-and-pinning",
      "title": {
        "en": "7. Dependency Management & Semantic Version Pinning",
        "vi": "7. Quản Lý Thư Viện Phụ Thuộc & Khóa Phiên Bản (Pinning)"
      },
      "summary": {
        "en": "Pin exact package versions in lockfiles for reproducible production deployments and use range constraints in libraries.",
        "vi": "Khóa chính xác phiên bản trong lockfile cho môi trường production và dùng dải phiên bản linh hoạt cho thư viện."
      },
      "readTimeMinutes": 4,
      "sections": [
        {
          "id": "prac-sec-7-1",
          "title": {
            "en": "Dependency Governance Standards",
            "vi": "Quy Chuẩn Quản Lý Phụ Thuộc"
          },
          "practiceDetails": {
            "whyItMatters": {
              "en": "Unpinned dependencies cause sudden build breaks when a third-party library publishes a backwards-incompatible release overnight.",
              "vi": "Không khóa phiên bản sẽ gây sập build bất ngờ khi một thư viện bên thứ ba cập nhật bản mới có breaking change."
            },
            "recommendedPractice": {
              "en": "Use modern dependency managers (`uv`, `poetry`, or `pip-tools`) that generate deterministic lockfiles (`requirements.lock` or `uv.lock`) capturing exact cryptographic hashes.",
              "vi": "Sử dụng công cụ quản lý hiện đại (`uv`, `poetry` hoặc `pip-tools`) để tạo lockfile xác định chính xác kèm mã băm bảo mật."
            },
            "goodExample": {
              "language": "python",
              "code": "Commit lockfiles for end-user applications and web services. Keep abstract minimum ranges (`>=2.0,<3.0`) in `pyproject.toml`."
            },
            "riskyExample": {
              "language": "python",
              "code": "Running unconstrained `pip install package` in Dockerfiles during production builds."
            },
            "checklist": {
              "en": [
                "Always deploy from a verified lockfile with exact version pins and cryptographic hashes."
              ],
              "vi": [
                "Luôn triển khai lên máy chủ từ lockfile đã được kiểm định với mã băm bảo mật."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "prac-ch-8",
      "number": 8,
      "slug": "explicit-resource-lifecycle-management",
      "title": {
        "en": "8. Explicit Resource Lifecycle & Context Management",
        "vi": "8. Quản Lý Vòng Đời Tài Nguyên & Ngữ Cảnh Tường Minh"
      },
      "summary": {
        "en": "Guarantee deterministic teardown of sockets, database pools, and file handles using context managers.",
        "vi": "Đảm bảo giải phóng socket, connection pool và file handle chắc chắn bằng context manager."
      },
      "readTimeMinutes": 4,
      "sections": [
        {
          "id": "prac-sec-8-1",
          "title": {
            "en": "Resource Management Standards",
            "vi": "Quy Chuẩn Quản Lý Tài Nguyên"
          },
          "practiceDetails": {
            "whyItMatters": {
              "en": "Dangling file descriptors and leaked database pool connections eventually exhaust OS limits (`EMFILE: Too many open files`), crashing the service.",
              "vi": "Rò rỉ file descriptor và kết nối database sẽ làm cạn kiệt giới hạn của hệ điều hành (`EMFILE`), làm sập toàn bộ dịch vụ."
            },
            "recommendedPractice": {
              "en": "Never rely on CPython reference counting or `__del__` destructors for resource cleanup. Always enclose finite system resources within `with` blocks or explicit lifespan hooks.",
              "vi": "Không bao giờ dựa vào bộ đếm tham chiếu CPython hay hàm hủy `__del__` để dọn tài nguyên. Luôn bao bọc tài nguyên hệ thống trong khối `with` hoặc hook vòng đời tường minh."
            },
            "goodExample": {
              "language": "python",
              "code": "Use `contextlib.closing()` or implement `@contextmanager` for any custom client carrying an underlying network connection."
            },
            "riskyExample": {
              "language": "python",
              "code": "Calling `f = open(...)` without a `with` statement or opening raw database connections inside loops without closing them."
            },
            "checklist": {
              "en": [
                "If a resource must be closed, disconnected, released, or unlocked, it belongs in a `with` statement."
              ],
              "vi": [
                "Nếu một tài nguyên cần được đóng, ngắt kết nối hay giải phóng, nó bắt buộc phải nằm trong câu lệnh `with`."
              ]
            }
          }
        }
      ]
    }
  ]
};
