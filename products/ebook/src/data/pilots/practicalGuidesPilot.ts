import { Book } from '../../types';

export const PRACTICAL_GUIDES_PILOT_BOOK: Book = {
  "id": "python-practical-guides-solutions",
  "slug": "python-practical-guides-solutions",
  "title": "Python Practical Guides — From Task to Working Solution",
  "subtitle": {
    "en": "Production-Grade Recipes, Step-by-Step Procedures & Verifications",
    "vi": "Quy Trình Chuẩn Sản Xuất, Từng Bước Triển Khai & Tiêu Chí Kiểm Thử"
  },
  "bookType": "Practical Guides",
  "categoryId": "python",
  "subjectId": "programming",
  "author": "4TM Editorial Board",
  "role": "Systems & Backend Engineering Group",
  "level": "Intermediate to Advanced",
  "estimatedReadTime": "40 mins",
  "chaptersCount": 6,
  "publishedDate": "2025-02-20",
  "accentColor": "from-blue-600 to-indigo-800",
  "tags": [
    "Practical Guides",
    "Packaging",
    "CLI",
    "Performance",
    "Logging",
    "Type Checking"
  ],
  "description": {
    "en": "Six end-to-end practical implementation guides transforming everyday engineering tasks into robust production solutions.",
    "vi": "Sáu hướng dẫn triển khai thực tế toàn diện giúp chuyển đổi các bài toán kỹ thuật thường gặp thành giải pháp chuẩn sản xuất."
  },
  "prerequisites": {
    "en": [
      "Intermediate Python programming knowledge",
      "Terminal/CLI familiarity"
    ],
    "vi": [
      "Kiến thức lập trình Python trung cấp",
      "Quen thuộc với dòng lệnh terminal"
    ]
  },
  "outcomes": {
    "en": [
      "Standardize project setups with modern PEP 621 pyproject.toml and src/ layouts",
      "Implement atomic JSON writes, streaming file parsers, and POSIX-compliant CLI tools",
      "Deploy structured JSON logging and static type verification across microservices"
    ],
    "vi": [
      "Chuẩn hóa cấu trúc dự án với pyproject.toml (PEP 621) và layout src/ hiện đại",
      "Triển khai ghi file JSON nguyên tử, bộ đọc file dung lượng lớn và công cụ dòng lệnh chuẩn POSIX",
      "Thiết lập hệ thống log JSON có cấu trúc và kiểm tra kiểu tĩnh cho toàn bộ microservice"
    ]
  },
  "chapters": [
    {
      "id": "guide-ch-1",
      "number": 1,
      "slug": "build-modern-python-project-structure",
      "title": {
        "en": "1. Build a Modern Python Project Structure (PEP 621)",
        "vi": "1. Xây Dựng Cấu Trúc Dự Án Python Hiện Đại (PEP 621)"
      },
      "summary": {
        "en": "Set up a professional, clean `src/` layout with declarative `pyproject.toml` configuration and virtual environment isolation.",
        "vi": "Thiết lập cấu trúc layout `src/` chuyên nghiệp với cấu hình `pyproject.toml` chuẩn khai báo và môi trường ảo độc lập."
      },
      "readTimeMinutes": 6,
      "sections": [
        {
          "id": "guide-sec-1-1",
          "title": {
            "en": "Step-by-Step Project Setup Procedure",
            "vi": "Quy Trình Thiết Lập Dự Án Từng Bước"
          },
          "guideDetails": {
            "goal": {
              "en": "Create a standardized, maintainable Python project ready for team collaboration, package distribution, and CI/CD pipelines.",
              "vi": "Tạo một dự án Python chuẩn hóa, dễ bảo trì, sẵn sàng cho làm việc nhóm, đóng gói phân phối và tích hợp CI/CD."
            },
            "prerequisites": {
              "en": [
                "Python 3.10+ installed on host machine",
                "Basic terminal command knowledge (bash / powershell)"
              ],
              "vi": [
                "Python 3.10+ đã được cài đặt trên máy",
                "Kiến thức lệnh dòng lệnh cơ bản (bash / powershell)"
              ]
            },
            "steps": [
              {
                "stepNumber": 1,
                "title": {
                  "en": "Create Directory Hierarchy with src/ Layout",
                  "vi": "Tạo Cấu Trúc Thư Mục Chuẩn src/"
                },
                "instruction": {
                  "en": "Create an isolated root folder with a `src/` packaging directory and a dedicated `tests/` directory. The `src/` layout prevents accidental imports of uninstalled local code.",
                  "vi": "Tạo thư mục gốc với thư mục đóng gói `src/` và thư mục `tests/`. Bố cục `src/` ngăn ngừa việc import nhầm mã nguồn chưa qua cài đặt."
                },
                "codeBlock": {
                  "language": "bash",
                  "code": "mkdir -p my_service/src/my_service my_service/tests\ncd my_service\ntouch src/my_service/__init__.py src/my_service/core.py"
                }
              },
              {
                "stepNumber": 2,
                "title": {
                  "en": "Define Declarative pyproject.toml",
                  "vi": "Khai Báo Cấu Hình pyproject.toml Chuẩn PEP 621"
                },
                "instruction": {
                  "en": "Configure build metadata, dependencies, entry points, and tool settings in a single standard `pyproject.toml` file.",
                  "vi": "Cấu hình metadata bản dựng, danh sách thư viện phụ thuộc và công cụ phát triển trong một file `pyproject.toml` duy nhất."
                },
                "codeBlock": {
                  "language": "toml",
                  "filename": "pyproject.toml",
                  "explanation": {
                    "en": "Modern PEP 621 pyproject.toml configuration using hatchling build backend.",
                    "vi": "Cấu hình pyproject.toml hiện đại sử dụng hatchling làm backend bản dựng."
                  },
                  "code": "[build-system]\nrequires = [\"hatchling\"]\nbuild-backend = \"hatchling.build\"\n\n[project]\nname = \"my-service\"\nversion = \"0.1.0\"\ndescription = \"High-throughput data ingestion service\"\nreadme = \"README.md\"\nrequires-python = \">=3.10\"\ndependencies = [\n    \"httpx>=0.27.0\",\n    \"pydantic>=2.7.0\"\n]\n\n[project.optional-dependencies]\ndev = [\n    \"pytest>=8.0.0\",\n    \"mypy>=1.9.0\",\n    \"ruff>=0.3.0\"\n]"
                }
              },
              {
                "stepNumber": 3,
                "title": {
                  "en": "Initialize Virtual Environment & Editable Install",
                  "vi": "Khởi Tạo Virtual Environment & Cài Đặt Chế Độ Editable"
                },
                "instruction": {
                  "en": "Create an isolated virtual environment and install the local package in editable mode (`-e`).",
                  "vi": "Tạo môi trường ảo biệt lập và cài đặt gói ở chế độ editable (`-e`) để chỉnh sửa code có hiệu lực ngay."
                },
                "codeBlock": {
                  "language": "bash",
                  "code": "python3 -m venv .venv\nsource .venv/bin/activate  # On Windows: .venv\\Scripts\\activate\npip install -e \".[dev]\""
                }
              }
            ],
            "verification": {
              "en": "Run `python -c \"import my_service; print(my_service.__file__)\"` and confirm the path resolves to `.venv/lib/.../my_service`.",
              "vi": "Chạy `python -c \"import my_service; print(my_service.__file__)\"` và kiểm tra đường dẫn trỏ đúng vào `.venv`."
            }
          },
          "troubleshooting": [
            {
              "symptom": {
                "en": "ModuleNotFoundError: No module named 'my_service' during tests",
                "vi": "Lỗi ModuleNotFoundError: Không tìm thấy 'my_service' khi chạy test"
              },
              "cause": {
                "en": "Package was not installed in editable mode inside the active virtual environment.",
                "vi": "Gói chưa được cài ở chế độ editable bên trong môi trường ảo đang kích hoạt."
              },
              "fix": {
                "en": "Activate your venv and run `pip install -e .` from the project root.",
                "vi": "Kích hoạt venv và chạy lệnh `pip install -e .` tại thư mục gốc dự án."
              }
            }
          ],
          "checklist": {
            "title": {
              "en": "Production Verification Checklist",
              "vi": "Danh Sách Kiểm Tra & Nghiệm Thu"
            },
            "items": {
              "en": [
                "Source code located inside src/ package folder",
                "Declarative pyproject.toml created without legacy setup.py",
                ".gitignore configured for .venv, __pycache__, and build artifacts"
              ],
              "vi": [
                "Mã nguồn nằm trong thư mục src/",
                "Có file pyproject.toml chuẩn, không dùng setup.py cũ",
                ".gitignore đã bỏ qua .venv, __pycache__ và dist"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "guide-ch-2",
      "number": 2,
      "slug": "safe-json-read-and-write",
      "title": {
        "en": "2. Read & Write JSON Safely in Production",
        "vi": "2. Đọc & Ghi File JSON Chuẩn An Toàn Sản Xuất"
      },
      "summary": {
        "en": "Prevent corrupted half-written files with atomic file replacement and handle large datasets safely.",
        "vi": "Ngăn chặn file bị hỏng do gián đoạn ghi đè bằng kỹ thuật ghi nguyên tử và xử lý an toàn dữ liệu lớn."
      },
      "readTimeMinutes": 6,
      "sections": [
        {
          "id": "guide-sec-2-1",
          "title": {
            "en": "Atomic JSON Operations",
            "vi": "Kỹ Thuật Ghi JSON Nguyên Tử"
          },
          "guideDetails": {
            "goal": {
              "en": "Write JSON state files atomically so that unexpected power loss or process crashes never leave corrupted partial files on disk.",
              "vi": "Ghi file JSON nguyên tử để việc mất điện hoặc tiến trình bị ngắt đột ngột không bao giờ làm hỏng dữ liệu trên đĩa."
            },
            "steps": [
              {
                "stepNumber": 1,
                "title": {
                  "en": "Write to a Sibling Temporary File",
                  "vi": "Ghi Ra File Tạm Trong Cùng Thư Mục"
                },
                "instruction": {
                  "en": "Open a temporary file in the exact same directory (filesystem partition) as the target file. Serialize the JSON payload with UTF-8 encoding.",
                  "vi": "Mở một file tạm trong cùng thư mục (cùng phân vùng ổ đĩa) với file đích. Ghi chuỗi JSON với bảng mã UTF-8."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "atomic_json.py",
                  "explanation": {
                    "en": "Production-ready atomic JSON write function using os.replace().",
                    "vi": "Hàm ghi JSON nguyên tử chuẩn sản xuất sử dụng os.replace()."
                  },
                  "code": "import json\nimport os\nimport tempfile\nfrom pathlib import Path\nfrom typing import Any\n\ndef atomic_write_json(filepath: Path | str, data: Any, indent: int = 2) -> None:\n    \"\"\"Safely write JSON data using atomic filesystem replacement.\"\"\"\n    target_path = Path(filepath).resolve()\n    target_path.parent.mkdir(parents=True, exist_ok=True)\n    \n    # Create temp file in the SAME directory to guarantee atomic rename\n    with tempfile.NamedTemporaryFile(\n        mode=\"w\",\n        encoding=\"utf-8\",\n        dir=target_path.parent,\n        delete=False\n    ) as tmp_file:\n        json.dump(data, tmp_file, indent=indent, ensure_ascii=False)\n        tmp_file.flush()\n        os.fsync(tmp_file.fileno())  # Flush OS buffers to physical disk\n        temp_name = tmp_file.name\n\n    # Atomic rename replaces target instantly at OS inode level\n    os.replace(temp_name, target_path)"
                }
              },
              {
                "stepNumber": 2,
                "title": {
                  "en": "Read JSON with Strict Decoding Guardrails",
                  "vi": "Đọc JSON Kèm Kiểm Tra Tính Toàn Vẹn"
                },
                "instruction": {
                  "en": "Always specify `encoding=\"utf-8\"` and catch `json.JSONDecodeError` specifically.",
                  "vi": "Luôn chỉ định rõ `encoding=\"utf-8\"` và bắt ngoại lệ `json.JSONDecodeError`."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "safe_read.py",
                  "explanation": {
                    "en": "Safe reading with explicit error diagnosis.",
                    "vi": "Đọc file JSON an toàn kèm thông báo lỗi rõ ràng."
                  },
                  "code": "def safe_read_json(filepath: Path | str) -> dict | list:\n    path = Path(filepath)\n    if not path.is_file():\n        raise FileNotFoundError(f\"Missing config file: {path}\")\n        \n    try:\n        with open(path, \"r\", encoding=\"utf-8\") as f:\n            return json.load(f)\n    except json.JSONDecodeError as err:\n        raise ValueError(f\"Corrupted JSON in {path} at line {err.lineno}: {err.msg}\") from err"
                }
              }
            ],
            "verification": {
              "en": "Verify that replacing an existing JSON file succeeds and leaves no dangling `.tmp` files in the directory.",
              "vi": "Kiểm tra việc ghi đè file JSON thành công và không để lại bất kỳ file `.tmp` rác nào."
            }
          },
          "troubleshooting": [
            {
              "symptom": {
                "en": "Invalid cross-device link (EXDEV) error during os.replace",
                "vi": "Lỗi Invalid cross-device link (EXDEV) khi gọi os.replace"
              },
              "cause": {
                "en": "Temporary file was created in system /tmp on a different drive partition than the target file.",
                "vi": "File tạm được tạo trong /tmp thuộc phân vùng ổ đĩa khác với file đích."
              },
              "fix": {
                "en": "Pass `dir=target_path.parent` to `NamedTemporaryFile` so both files share the same filesystem.",
                "vi": "Luôn truyền `dir=target_path.parent` vào `NamedTemporaryFile` để cả 2 file cùng phân vùng."
              }
            }
          ]
        }
      ]
    },
    {
      "id": "guide-ch-3",
      "number": 3,
      "slug": "process-large-files-with-generators",
      "title": {
        "en": "3. Process Multi-Gigabyte Files with Generators",
        "vi": "3. Xử Lý File Dung Lượng Lớn Bằng Generator"
      },
      "summary": {
        "en": "Read and transform multi-gigabyte CSV/JSONL files in constant RAM without running out of memory.",
        "vi": "Đọc và xử lý các file CSV/JSONL dung lượng hàng chục GB với bộ nhớ RAM không đổi."
      },
      "readTimeMinutes": 7,
      "sections": [
        {
          "id": "guide-sec-3-1",
          "title": {
            "en": "Streaming Pipeline Implementation",
            "vi": "Triển Khai Pipeline Dữ Liệu Dạng Luồng"
          },
          "guideDetails": {
            "goal": {
              "en": "Process arbitrarily large files line-by-line or chunk-by-chunk while maintaining memory usage under 50 MB.",
              "vi": "Xử lý file kích thước không giới hạn theo từng dòng hoặc từng khối mà vẫn giữ mức tiêu thụ RAM dưới 50 MB."
            },
            "steps": [
              {
                "stepNumber": 1,
                "title": {
                  "en": "Create a Lazy Line Reader Generator",
                  "vi": "Tạo Generator Đọc Từng Dòng Lười"
                },
                "instruction": {
                  "en": "Leverage Python’s native file iterator which buffers disk reads in small 8KB chunks internally.",
                  "vi": "Tận dụng iterator file có sẵn của Python giúp tự động buffer dữ liệu theo từng khối 8KB."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "stream_processor.py",
                  "explanation": {
                    "en": "Streaming CSV/JSONL parser with memory-bounded batch aggregation.",
                    "vi": "Bộ đọc stream file theo lô với bộ nhớ giới hạn cố định."
                  },
                  "code": "import json\nfrom pathlib import Path\nfrom typing import Generator, Any\n\ndef stream_json_lines(filepath: Path | str) -> Generator[dict, None, None]:\n    \"\"\"Stream valid JSON objects from a large JSONL file one by one.\"\"\"\n    with open(filepath, \"r\", encoding=\"utf-8\") as f:\n        for line_num, line in enumerate(f, start=1):\n            line = line.strip()\n            if not line:\n                continue\n            try:\n                yield json.loads(line)\n            except json.JSONDecodeError as err:\n                print(f\"Skipping malformed line {line_num}: {err.msg}\")\n\ndef chunked_batches(iterable, batch_size: int = 1000) -> Generator[list, None, None]:\n    \"\"\"Group incoming stream into fixed-size processing batches.\"\"\"\n    batch = []\n    for item in iterable:\n        batch.append(item)\n        if len(batch) >= batch_size:\n            yield batch\n            batch = []\n    if batch:\n        yield batch"
                }
              },
              {
                "stepNumber": 2,
                "title": {
                  "en": "Execute Batched Database Ingestion",
                  "vi": "Thực Thi Nạp Dữ Liệu Vào Cơ Sở Dữ Liệu Theo Lô"
                },
                "instruction": {
                  "en": "Consume batches sequentially, inserting records into the target datastore and freeing memory automatically.",
                  "vi": "Duyệt qua từng lô, chèn dữ liệu vào kho lưu trữ và giải phóng RAM tự động sau mỗi vòng lặp."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "ingest_pipeline.py",
                  "explanation": {
                    "en": "Consuming batches with constant memory footprint.",
                    "vi": "Xử lý dữ liệu theo lô với mức sử dụng RAM cố định."
                  },
                  "code": "def process_huge_log_file(filepath: Path):\n    record_stream = stream_json_lines(filepath)\n    batch_stream = chunked_batches(record_stream, batch_size=5000)\n    \n    total_processed = 0\n    for batch in batch_stream:\n        # Perform batch DB insertion or bulk transformation\n        total_processed += len(batch)\n        print(f\"Processed batch of {len(batch)} records (Total: {total_processed})\")\n        # Memory is automatically reclaimed as batch variable is overwritten"
                }
              }
            ],
            "verification": {
              "en": "Process a 10GB sample file while monitoring RAM usage with `htop` to confirm memory remains flat.",
              "vi": "Chạy thử với file 10GB và theo dõi tiến trình qua `htop` để đảm bảo mức RAM luôn giữ nguyên."
            }
          }
        }
      ]
    },
    {
      "id": "guide-ch-4",
      "number": 4,
      "slug": "add-modern-type-checking-and-protocols",
      "title": {
        "en": "4. Add Type Checking with Protocols (mypy)",
        "vi": "4. Kiểm Tra Kiểu Tĩnh Với Protocols (mypy)"
      },
      "summary": {
        "en": "Use structural subtyping with `typing.Protocol` to decouple modules and catch defects before runtime.",
        "vi": "Ứng dụng structural subtyping với `typing.Protocol` để giảm phụ thuộc module và bắt lỗi trước runtime."
      },
      "readTimeMinutes": 7,
      "sections": [
        {
          "id": "guide-sec-4-1",
          "title": {
            "en": "Implementing Structural Typing with Protocols",
            "vi": "Triển Khai Structural Subtyping Với Protocol"
          },
          "guideDetails": {
            "goal": {
              "en": "Define decoupled interfaces using `typing.Protocol` so components can interact without hard inheritance hierarchies.",
              "vi": "Định nghĩa giao diện linh hoạt bằng `typing.Protocol` để các module tương tác mà không cần kế thừa cứng nhắc."
            },
            "steps": [
              {
                "stepNumber": 1,
                "title": {
                  "en": "Declare a Protocol Interface",
                  "vi": "Khai Báo Giao Diện Protocol"
                },
                "instruction": {
                  "en": "Define interface requirements via `Protocol` without subclassing from concrete implementations.",
                  "vi": "Định nghĩa yêu cầu phương thức thông qua `Protocol` mà không cần kế thừa từ lớp cụ thể."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "protocols.py",
                  "explanation": {
                    "en": "Decoupled cache storage interface using Protocol.",
                    "vi": "Giao diện lưu trữ bộ nhớ đệm độc lập sử dụng Protocol."
                  },
                  "code": "from typing import Protocol, runtime_checkable\n\n@runtime_checkable\nclass CacheBackend(Protocol):\n    def get(self, key: str) -> str | None:\n        \"\"\"Retrieve cached string value or None.\"\"\"\n        ...\n\n    def set(self, key: str, value: str, ttl_seconds: int = 300) -> bool:\n        \"\"\"Persist string value with expiration.\"\"\"\n        ...\n\n# Concrete class satisfies CacheBackend WITHOUT inheriting from it!\nclass InMemoryCache:\n    def __init__(self):\n        self._store: dict[str, str] = {}\n\n    def get(self, key: str) -> str | None:\n        return self._store.get(key)\n\n    def set(self, key: str, value: str, ttl_seconds: int = 300) -> bool:\n        self._store[key] = value\n        return True"
                }
              },
              {
                "stepNumber": 2,
                "title": {
                  "en": "Configure mypy in pyproject.toml",
                  "vi": "Cấu Hình mypy Trong pyproject.toml"
                },
                "instruction": {
                  "en": "Add strict static type checking rules to your project configuration.",
                  "vi": "Thiết lập các quy tắc kiểm tra kiểu tĩnh nghiêm ngặt vào file cấu hình dự án."
                },
                "codeBlock": {
                  "language": "toml",
                  "filename": "pyproject.toml",
                  "explanation": {
                    "en": "Production-grade mypy configuration.",
                    "vi": "Cấu hình mypy chuẩn sản xuất."
                  },
                  "code": "[tool.mypy]\npython_version = \"3.10\"\nstrict = true\nwarn_unused_configs = true\ndisallow_untyped_defs = true\ndisallow_any_generics = true\ncheck_untyped_defs = true"
                }
              }
            ],
            "verification": {
              "en": "Run `mypy src/` and verify that all modules pass type checking with zero errors.",
              "vi": "Chạy lệnh `mypy src/` và đảm bảo toàn bộ mã nguồn vượt qua kiểm tra kiểu không có lỗi."
            }
          }
        }
      ]
    },
    {
      "id": "guide-ch-5",
      "number": 5,
      "slug": "build-reliable-cli-with-argparse",
      "title": {
        "en": "5. Build a Reliable CLI Utility with argparse",
        "vi": "5. Xây Dựng Công Cụ Dòng Lệnh Chuẩn Với argparse"
      },
      "summary": {
        "en": "Construct POSIX-compliant CLI commands with subcommands, standard exit codes, and robust error streams.",
        "vi": "Xây dựng công cụ dòng lệnh chuẩn POSIX với subcommand, mã thoát tiêu chuẩn và luồng xuất lỗi chuyên nghiệp."
      },
      "readTimeMinutes": 7,
      "sections": [
        {
          "id": "guide-sec-5-1",
          "title": {
            "en": "Production CLI Architecture",
            "vi": "Kiến Trúc Công Cụ CLI Chuẩn Sản Xuất"
          },
          "guideDetails": {
            "goal": {
              "en": "Create a CLI utility with clean argument validation, help messages, stderr output for errors, and standard exit codes (0 for success, non-zero for failure).",
              "vi": "Tạo công cụ CLI với kiểm tra tham số rõ ràng, tài liệu hướng dẫn tự động, xuất lỗi ra stderr và trả mã thoát chuẩn."
            },
            "steps": [
              {
                "stepNumber": 1,
                "title": {
                  "en": "Implement Parser & Subcommands",
                  "vi": "Hiện Thực Parser & Các Lệnh Con (Subcommands)"
                },
                "instruction": {
                  "en": "Use `argparse.ArgumentParser` with subparsers for modular command handling.",
                  "vi": "Sử dụng `argparse.ArgumentParser` với subparser để phân chia các nhóm lệnh chuyên biệt."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "cli.py",
                  "explanation": {
                    "en": "Production-ready CLI entry point with subcommands and exit codes.",
                    "vi": "Mã nguồn entrypoint CLI hoàn chỉnh với subcommands và mã thoát."
                  },
                  "code": "import argparse\nimport sys\n\ndef handle_ping(args: argparse.Namespace) -> int:\n    print(f\"Pinging host: {args.host} with timeout {args.timeout}s...\")\n    return 0  # Exit success\n\ndef handle_audit(args: argparse.Namespace) -> int:\n    if args.strict and not args.report_file:\n        sys.stderr.write(\"Error: --report-file is required when running in --strict mode!\\n\")\n        return 2  # Invalid argument exit code\n    print(f\"Running system audit (Strict: {args.strict})...\")\n    return 0\n\ndef build_parser() -> argparse.ArgumentParser:\n    parser = argparse.ArgumentParser(\n        prog=\"infra-tool\",\n        description=\"Enterprise infrastructure health and audit utility.\"\n    )\n    subparsers = parser.add_subparsers(dest=\"command\", required=True)\n\n    # Subcommand: ping\n    ping_cmd = subparsers.add_parser(\"ping\", help=\"Ping a target server\")\n    ping_cmd.add_argument(\"host\", type=str, help=\"Target hostname or IP\")\n    ping_cmd.add_argument(\"-t\", \"--timeout\", type=int, default=5, help=\"Timeout in seconds\")\n    ping_cmd.set_defaults(func=handle_ping)\n\n    # Subcommand: audit\n    audit_cmd = subparsers.add_parser(\"audit\", help=\"Run compliance audit\")\n    audit_cmd.add_argument(\"--strict\", action=\"store_true\", help=\"Enable strict policy\")\n    audit_cmd.add_argument(\"-r\", \"--report-file\", type=str, help=\"Output report path\")\n    audit_cmd.set_defaults(func=handle_audit)\n\n    return parser\n\ndef main() -> None:\n    parser = build_parser()\n    args = parser.parse_args()\n    exit_code = args.func(args)\n    sys.exit(exit_code)\n\nif __name__ == \"__main__\":\n    main()"
                }
              }
            ],
            "verification": {
              "en": "Test running `python cli.py ping 127.0.0.1` and check `echo $?` outputs `0`.",
              "vi": "Chạy thử `python cli.py ping 127.0.0.1` và kiểm tra lệnh `echo $?` trả về mã `0`."
            }
          }
        }
      ]
    },
    {
      "id": "guide-ch-6",
      "number": 6,
      "slug": "add-structured-json-logging",
      "title": {
        "en": "6. Add Structured JSON Logging & Error Handling",
        "vi": "6. Thiết Lập Hệ Thống Log JSON Có Cấu Trúc"
      },
      "summary": {
        "en": "Emit machine-parsable JSON logs with correlation IDs and set up a top-level unhandled exception hook.",
        "vi": "Xuất log định dạng JSON chuẩn cho máy đọc kèm correlation ID và thiết lập hook bắt lỗi unhandled toàn cục."
      },
      "readTimeMinutes": 7,
      "sections": [
        {
          "id": "guide-sec-6-1",
          "title": {
            "en": "Structured JSON Logging Architecture",
            "vi": "Kiến Trúc Ghi Log JSON Có Cấu Trúc"
          },
          "guideDetails": {
            "goal": {
              "en": "Configure Python’s standard `logging` library to emit single-line JSON logs ingested seamlessly by Datadog, CloudWatch, or Elasticsearch.",
              "vi": "Cấu hình thư viện `logging` của Python để xuất log JSON từng dòng giúp hệ thống Datadog, CloudWatch hoặc ELK phân tích dễ dàng."
            },
            "steps": [
              {
                "stepNumber": 1,
                "title": {
                  "en": "Implement Custom JSON Log Formatter",
                  "vi": "Viết Formatter JSON Tùy Biến"
                },
                "instruction": {
                  "en": "Subclass `logging.Formatter` to convert `LogRecord` objects into standardized JSON strings.",
                  "vi": "Kế thừa `logging.Formatter` để chuyển đổi đối tượng `LogRecord` thành chuỗi JSON chuẩn."
                },
                "codeBlock": {
                  "language": "python",
                  "filename": "json_logger.py",
                  "explanation": {
                    "en": "Production JSON formatter with trace context and exception formatting.",
                    "vi": "Formatter JSON chuẩn sản xuất kèm ngữ cảnh trace ID và xử lý exception."
                  },
                  "code": "import json\nimport logging\nimport sys\nimport time\n\nclass StructuredJsonFormatter(logging.Formatter):\n    def format(self, record: logging.LogRecord) -> str:\n        log_payload = {\n            \"timestamp\": time.strftime(\"%Y-%m-%dT%H:%M:%SZ\", time.gmtime(record.created)),\n            \"level\": record.levelname,\n            \"logger\": record.name,\n            \"message\": record.getMessage(),\n            \"module\": record.module,\n            \"line\": record.lineno,\n        }\n        \n        # Attach extra contextual fields (e.g. user_id, trace_id)\n        if hasattr(record, \"extra_fields\"):\n            log_payload.update(record.extra_fields)\n            \n        if record.exc_info:\n            log_payload[\"exception\"] = self.formatException(record.exc_info)\n            \n        return json.dumps(log_payload, ensure_ascii=False)\n\ndef setup_root_logger(service_name: str = \"app-service\", level: int = logging.INFO) -> None:\n    handler = logging.StreamHandler(sys.stdout)\n    handler.setFormatter(StructuredJsonFormatter())\n    \n    root_logger = logging.getLogger()\n    root_logger.setLevel(level)\n    root_logger.handlers.clear()\n    root_logger.addHandler(handler)\n\n# Usage demonstration\nsetup_root_logger(\"payment-service\")\nlogger = logging.getLogger(\"payments\")\nlogger.info(\"Order processed successfully\", extra={\"extra_fields\": {\"order_id\": \"ORD-991\", \"amount\": 49.99}})"
                }
              }
            ],
            "verification": {
              "en": "Verify stdout outputs a valid single-line JSON payload containing timestamp, level, message, and custom extra_fields.",
              "vi": "Đảm bảo terminal in ra đúng 1 dòng JSON hợp lệ chứa timestamp, level, message và các trường mở rộng."
            }
          }
        }
      ]
    }
  ]
};
