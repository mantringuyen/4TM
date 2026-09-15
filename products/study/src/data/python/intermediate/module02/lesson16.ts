import { Lesson } from '../../../../types';

export const lesson16: Lesson = {
  id: 'py_lesson_16',
  moduleId: 'py_mod_7',
  levelId: 'intermediate',
  courseId: 'python',
  order: 16,
  topicId: 'python_file_io_pathlib',
  title: {
    en: 'File I/O & Modern Path Manipulation with pathlib',
    vi: 'Thao Tác File & Xử Lý Đường Dẫn Hiện Đại Với pathlib'
  },
  summary: {
    en: 'Master modern filesystem programming in Python: context-managed file operations (with open), explicit UTF-8 encodings, streaming large files, and object-oriented path handling with pathlib (Path, / composition, exists, mkdir, glob, read_text, write_text).',
    vi: 'Làm chủ thao tác hệ thống tệp hiện đại trong Python: quản lý file an toàn với with open, mã hóa UTF-8 bắt buộc, duyệt file dung lượng lớn và xử lý đường dẫn hướng đối tượng với pathlib (Path, toán tử /, exists, mkdir, glob, read_text, write_text).'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'File Input/Output and filesystem manipulation are core engineering skills. Python provides two complementary paradigms: the classic `open()` context manager for granular streaming, and the modern `pathlib` module (PEP 428) for expressive, cross-platform object-oriented path operations.',
      vi: 'Đọc/Ghi file và tương tác với hệ thống tệp là kỹ năng kỹ thuật cốt lõi. Python cung cấp hai phương thức bổ trợ: context manager `open()` cổ điển để đọc luồng dữ liệu chi tiết, và module `pathlib` hiện đại (PEP 428) để xử lý đường dẫn hướng đối tượng trực quan và tương thích đa nền tảng.'
    },
    conceptExplanation: {
      en: '1. Modern Object-Oriented Path Management with `pathlib.Path`:\n- `p = Path("src/data")`: Instantiates a platform-aware Path object.\n- Path Composition with `/` operator: `config_file = p / "config" / "settings.json"` (works seamlessly across Windows, Linux, and macOS).\n- Key Properties: `p.name` (filename with ext), `p.stem` (filename without ext), `p.suffix` (extension), `p.parent` (parent directory).\n- Filesystem Checks & Creation: `p.exists()`, `p.is_file()`, `p.is_dir()`, `p.mkdir(parents=True, exist_ok=True)`.\n- Quick I/O: `p.write_text("content", encoding="utf-8")`, `p.read_text(encoding="utf-8")`.\n- Directory Globbing: `list(p.glob("*.py"))`, `list(p.rglob("*.log"))` (recursive search).\n\n2. Granular File Streaming with `with open()`:\n- Always use `with open(filepath, mode, encoding="utf-8") as f:`.\n- Modes: `"r"` (read), `"w"` (write/overwrite), `"a"` (append), `"rb"` / `"wb"` (binary).\n- Memory-efficient streaming: `for line in f:` reads line-by-line without loading massive files into RAM.\n\n3. Mandatory Best Practice: Explicit `encoding="utf-8"`:\n- Never omit `encoding="utf-8"` to prevent OS-dependent fallback crashes (e.g. `cp1252` on Windows).',
      vi: '1. Quản Lý Đường Dẫn Hướng Đối Tượng Với `pathlib.Path`:\n- `p = Path("src/data")`: Khởi tạo đối tượng Path tương thích hệ điều hành.\n- Ghép đường dẫn với toán tử `/`: `config_file = p / "config" / "settings.json"` (chạy mượt mà trên cả Windows, Linux và macOS).\n- Các thuộc tính chính: `p.name` (tên file kèm đuôi), `p.stem` (tên file không đuôi), `p.suffix` (đuôi mở rộng), `p.parent` (thư mục cha).\n- Kiểm tra & Tạo thư mục: `p.exists()`, `p.is_file()`, `p.is_dir()`, `p.mkdir(parents=True, exist_ok=True)`.\n- Đọc/Ghi nhanh: `p.write_text("nội dung", encoding="utf-8")`, `p.read_text(encoding="utf-8")`.\n- Tìm kiếm mẫu (Globbing): `list(p.glob("*.py"))`, `list(p.rglob("*.log"))` (tìm đệ quy).\n\n2. Đọc Luồng Chi Tiết Với `with open()`:\n- Luôn dùng cú pháp `with open(filepath, mode, encoding="utf-8") as f:`.\n- Các chế độ: `"r"` (đọc), `"w"` (ghi đè), `"a"` (ghi nối tiếp), `"rb"` / `"wb"` (nhị phân).\n- Duyệt tối ưu bộ nhớ: `for line in f:` nạp từng dòng một, không làm tràn RAM khi đọc file lớn.\n\n3. Quy Chuẩn Bắt Buộc: Khai Báo Rõ `encoding="utf-8"`:\n- Không bỏ sót `encoding="utf-8"` để tránh lỗi font chữ và xung đột bảng mã trên Windows.'
    },
    syntax: `from pathlib import Path

# 1. Path construction & composition
base_dir = Path("app_data") / "logs"
base_dir.mkdir(parents=True, exist_ok=True)
log_file = base_dir / "app.log"

# 2. Modern read & write with pathlib
log_file.write_text("2026-08-31 [INFO] Service started\\n", encoding="utf-8")
content = log_file.read_text(encoding="utf-8")

# 3. Path inspection
print(log_file.name)    # "app.log"
print(log_file.stem)    # "app"
print(log_file.suffix)  # ".log"

# 4. Globbing directory search
log_files = list(base_dir.glob("*.log"))

# 5. Granular streaming with open
with open(log_file, "r", encoding="utf-8") as f:
    for line in f:
        if "[INFO]" in line:
            print("Found log:", line.strip())`,
    examples: [
      {
        title: {
          en: 'Directory Log Cleaner & File Archiver with pathlib',
          vi: 'Hệ Thống Quản Lý & Lưu Trữ Tệp Bằng pathlib'
        },
        code: `from pathlib import Path

def organize_reports(root_dir: Path) -> dict:
    summary = {"text_files": 0, "total_bytes": 0}
    
    # Recursively find all markdown and text files
    for filepath in root_dir.rglob("*.*"):
        if filepath.suffix.lower() in {".txt", ".md"}:
            summary["text_files"] += 1
            summary["total_bytes"] += filepath.stat().st_size
            
    return summary`,
        language: 'python',
        explanation: {
          en: 'Uses `rglob` to traverse subdirectories and inspect file extensions and file sizes via `stat()`.',
          vi: 'Sử dụng `rglob` để quét đệ quy mọi thư mục con và kiểm tra phần mở rộng cũng như kích thước file qua `stat()`.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Concatenating paths with string concatenation like path + "/" + filename (breaks on Windows vs Unix backslashes).',
          vi: 'Ghép chuỗi đường dẫn bằng dấu cộng như path + "/" + filename (dễ gãy khi chuyển qua lại giữa Windows và Unix).'
        },
        correction: {
          en: 'Use pathlib Path with the `/` composition operator: Path(dir) / filename.',
          vi: 'Sử dụng pathlib Path kết hợp toán tử chia `/`: Path(dir) / filename.'
        },
        code: `# Fragile: full_path = base_str + "/" + file_str\n# Robust:\nfull_path = Path(base_str) / file_str`
      },
      {
        mistake: {
          en: 'Calling `f.read()` on massive multi-gigabyte log files, exhausting system RAM.',
          vi: 'Gọi `f.read()` trên các file log hàng chục GB khiến máy chủ tràn bộ nhớ RAM.'
        },
        correction: {
          en: 'Iterate directly over the file handle `for line in f:` to process in chunks.',
          vi: 'Duyệt trực tiếp con trỏ file `for line in f:` để xử lý từng dòng tuần tự.'
        },
        code: `with open("huge_file.log", "r", encoding="utf-8") as f:\n    for line in f:\n        process_line(line)`
      }
    ],
    tips: [
      {
        en: '`Path.mkdir(parents=True, exist_ok=True)` safely creates nested parent directories and does not error if they already exist.',
        vi: '`Path.mkdir(parents=True, exist_ok=True)` tạo an toàn các thư mục cha lồng nhau và không báo lỗi nếu thư mục đã tồn tại.'
      },
      {
        en: '`Path.resolve()` returns the absolute canonical filesystem path, resolving symlinks and relative references.',
        vi: '`Path.resolve()` trả về đường dẫn tuyệt đối chuẩn xác, giải quyết các liên kết symlink và tham chiếu tương đối.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_32_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Path Metadata Extractor with pathlib',
        vi: 'Bài tập 1: Trích Xuất Thông Tin Đường Dẫn Bằng pathlib'
      },
      instruction: {
        en: 'Write `get_file_info(path_str: str) -> dict` that converts `path_str` to a `Path` object and returns a dictionary with `"name"`, `"stem"`, `"suffix"`, and `"parent"` (as a string).',
        vi: 'Viết hàm `get_file_info(path_str: str) -> dict` chuyển `path_str` thành đối tượng `Path` và trả về dict chứa `"name"`, `"stem"`, `"suffix"`, và `"parent"` (dưới dạng chuỗi).'
      },
      starterCode: `from pathlib import Path

def get_file_info(path_str: str) -> dict:
    # TODO: Use Path properties to extract metadata
    pass`,
      solutionCode: `from pathlib import Path

def get_file_info(path_str: str) -> dict:
    p = Path(path_str)
    return {
        "name": p.name,
        "stem": p.stem,
        "suffix": p.suffix,
        "parent": str(p.parent)
    }`,
      hint: {
        en: 'Access `p.name`, `p.stem`, `p.suffix`, and `str(p.parent)`.',
        vi: 'Truy cập `p.name`, `p.stem`, `p.suffix`, và `str(p.parent)`.'
      },
      explanation: {
        en: '`pathlib.Path` decomposes path components cleanly without manual string splitting.',
        vi: '`pathlib.Path` bóc tách các thành phần đường dẫn gọn gàng mà không cần cắt chuỗi thủ công.'
      }
    },
    {
      id: 'py_32_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Line Filter Streamer',
        vi: 'Bài tập 2: Lọc Dòng Từ Luồng Dữ Liệu'
      },
      instruction: {
        en: 'Write `filter_log_lines(lines: list[str], keyword: str) -> list[str]` that processes a list of lines, strips whitespace, and returns only non-empty lines containing `keyword` in uppercase.',
        vi: 'Viết hàm `filter_log_lines(lines: list[str], keyword: str) -> list[str]` xử lý danh sách các dòng, loại bỏ khoảng trắng thừa và trả về các dòng không rỗng có chứa `keyword`.'
      },
      starterCode: `def filter_log_lines(lines: list[str], keyword: str) -> list[str]:
    # TODO: Filter lines containing keyword
    pass`,
      solutionCode: `def filter_log_lines(lines: list[str], keyword: str) -> list[str]:
    return [line.strip() for line in lines if keyword in line and line.strip()]`,
      hint: {
        en: 'Use a list comprehension checking `keyword in line`.',
        vi: 'Dùng list comprehension kiểm tra `keyword in line`.'
      },
      explanation: {
        en: 'Simulates the line-by-line filtering pattern applied during file streaming.',
        vi: 'Mô phỏng mẫu lọc từng dòng được áp dụng trong quá trình đọc file luồng.'
      }
    }
  ],
  challenge: {
    id: 'py_32_challenge',
    title: {
      en: 'Multi-Extension File Scanner & Size Aggregator',
      vi: 'Trình Quét Tệp Đa Đuôi Mở Rộng & Tính Dung Lượng'
    },
    description: {
      en: 'Implement `summarize_directory_structure(file_entries: list[tuple[str, int]], target_extensions: list[str]) -> dict` where each entry is `(path_str, size_in_bytes)`. Return a dictionary containing `"total_files"`, `"total_bytes"`, and `"matching_files"` (sorted list of path strings matching any of the extensions).',
      vi: 'Xây dựng hàm `summarize_directory_structure(file_entries: list[tuple[str, int]], target_extensions: list[str]) -> dict` trong đó mỗi phần tử là `(path_str, size_in_bytes)`. Trả về dict gồm `"total_files"`, `"total_bytes"`, và `"matching_files"` (danh sách đường dẫn khớp với các đuôi mở rộng, sắp xếp theo bảng chữ cái).'
    },
    requirements: [
      {
        en: 'Normalize and match extensions case-insensitively with pathlib.Path.suffix',
        vi: 'Chuẩn hóa và so khớp phần mở rộng không phân biệt hoa thường bằng pathlib.Path.suffix'
      },
      {
        en: 'Aggregate total matching files count and cumulative byte sizes',
        vi: 'Tổng hợp số lượng file khớp và dung lượng byte tích lũy'
      },
      {
        en: 'Return sorted list of matching file paths in result dictionary',
        vi: 'Trả về danh sách đường dẫn file khớp đã sắp xếp trong dictionary kết quả'
      }
    ],
    starterCode: `from pathlib import Path

def summarize_directory_structure(file_entries: list[tuple[str, int]], target_extensions: list[str]) -> dict:
    # TODO: Filter and aggregate file entries using Path
    pass`,
    solutionCode: `from pathlib import Path

def summarize_directory_structure(file_entries: list[tuple[str, int]], target_extensions: list[str]) -> dict:
    ext_set = {e.lower() if e.startswith(".") else f".{e.lower()}" for e in target_extensions}
    matched = []
    total_bytes = 0
    
    for path_str, size in file_entries:
        p = Path(path_str)
        if p.suffix.lower() in ext_set:
            matched.append(path_str)
            total_bytes += size
            
    return {
        "total_files": len(matched),
        "total_bytes": total_bytes,
        "matching_files": sorted(matched)
    }`,
    hints: [
      {
        en: 'Use Path(path_str).suffix to extract the extension accurately.',
        vi: 'Dùng Path(path_str).suffix để trích xuất đuôi mở rộng chính xác.'
      }
    ],
    solutionExplanation: {
      en: 'Demonstrates filesystem filtering and aggregation with clean Path object methods.',
      vi: 'Minh họa cách lọc và tổng hợp tệp tin với các phương thức sạch của đối tượng Path.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_32_q1',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'easy',
      question: {
        en: 'Which operator does `pathlib.Path` overload to support cross-platform path composition?',
        vi: '`pathlib.Path` nạp chồng toán tử nào để hỗ trợ ghép đường dẫn đa nền tảng?'
      },
      options: [
        { en: '`+`', vi: '`+`' },
        { en: '`/`', vi: '`/`' },
        { en: '`\\`', vi: '`\\`' },
        { en: '`*`', vi: '`*`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The division operator `/` is overloaded by `Path` to cleanly join path segments.',
        vi: 'Toán tử chia `/` được `Path` nạp chồng để nối các đoạn đường dẫn tương thích đa hệ điều hành.'
      }
    },
    {
      id: 'py_32_q2',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'easy',
      question: {
        en: 'Why is specifying `encoding="utf-8"` mandatory when opening text files in Python?',
        vi: 'Tại sao bắt buộc phải khai báo `encoding="utf-8"` khi mở file văn bản trong Python?'
      },
      options: [
        { en: 'To increase file read speed by 50%', vi: 'Để tăng tốc độ đọc file thêm 50%' },
        { en: 'To avoid OS-dependent default encodings (like Windows cp1252) that cause UnicodeDecodeError on Vietnamese/special characters', vi: 'Để tránh bảng mã mặc định phụ thuộc hệ điều hành (như cp1252 trên Windows) gây lỗi UnicodeDecodeError khi đọc tiếng Việt/ký tự đặc biệt' },
        { en: 'Because Python refuses to run without it', vi: 'Vì Python từ chối chạy nếu thiếu' },
        { en: 'To automatically compress the file', vi: 'Để tự động nén file' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Without explicit encoding, Python falls back to platform default, causing cross-environment corruption.',
        vi: 'Nếu không chỉ định encoding, Python dùng bảng mã mặc định của OS, dẫn đến lỗi font chữ khi chạy trên môi trường khác nhau.'
      }
    },
    {
      id: 'py_32_q3',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'easy',
      question: {
        en: 'Given `p = Path("archive/data_2026.csv")`, what does `p.stem` evaluate to?',
        vi: 'Cho `p = Path("archive/data_2026.csv")`, giá trị của `p.stem` là gì?'
      },
      options: [
        { en: '`"archive"`', vi: '`"archive"`' },
        { en: '`"data_2026"`', vi: '`"data_2026"`' },
        { en: '`".csv"`', vi: '`".csv"`' },
        { en: '`"data_2026.csv"`', vi: '`"data_2026.csv"`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`p.stem` returns the final path component without the suffix: `"data_2026"`.',
        vi: '`p.stem` trả về tên tệp cuối cùng mà không kèm đuôi mở rộng: `"data_2026"`.'
      }
    },
    {
      id: 'py_32_q4',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'medium',
      question: {
        en: 'How do you create parent directories if they do not exist using `Path.mkdir` without throwing an error?',
        vi: 'Làm thế nào để tạo các thư mục cha lồng nhau với `Path.mkdir` mà không báo lỗi nếu đã tồn tại?'
      },
      options: [
        { en: '`p.mkdir(force=True)`', vi: '`p.mkdir(force=True)`' },
        { en: '`p.mkdir(parents=True, exist_ok=True)`', vi: '`p.mkdir(parents=True, exist_ok=True)`' },
        { en: '`p.create_all()`', vi: '`p.create_all()`' },
        { en: '`p.make_recursive()`', vi: '`p.make_recursive()`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`parents=True` creates missing parent dirs; `exist_ok=True` silences FileExistsError.',
        vi: '`parents=True` tạo các thư mục cha còn thiếu; `exist_ok=True` bỏ qua lỗi nếu thư mục đã tồn tại.'
      }
    },
    {
      id: 'py_32_q5',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'medium',
      question: {
        en: 'What is the advantage of `p.rglob("*.json")` over `p.glob("*.json")`?',
        vi: 'Ưu điểm của `p.rglob("*.json")` so với `p.glob("*.json")` là gì?'
      },
      options: [
        { en: '`rglob` searches recursively through all subdirectories', vi: '`rglob` tìm kiếm đệ quy qua tất cả các thư mục con' },
        { en: '`rglob` sorts files alphabetically', vi: '`rglob` tự động sắp xếp theo bảng chữ cái' },
        { en: '`rglob` only reads read-only files', vi: '`rglob` chỉ đọc các file read-only' },
        { en: '`rglob` converts JSON to dictionary automatically', vi: '`rglob` tự động chuyển JSON thành dict' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`rglob` is shorthand for recursive globbing (`glob("**/*.json")`).',
        vi: '`rglob` là cú pháp viết tắt cho tìm kiếm đệ quy (`glob("**/*.json")`).'
      }
    },
    {
      id: 'py_32_q6',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'medium',
      question: {
        en: 'What is the most memory-efficient way to process a 10GB log file line-by-line?',
        vi: 'Cách nào tiết kiệm bộ nhớ nhất để xử lý từng dòng một file log dung lượng 10GB?'
      },
      options: [
        { en: '`lines = f.readlines()`', vi: '`lines = f.readlines()`' },
        { en: '`for line in f:`', vi: '`for line in f:`' },
        { en: '`content = f.read().splitlines()`', vi: '`content = f.read().splitlines()`' },
        { en: '`lines = list(f)`', vi: '`lines = list(f)`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Iterating directly on the file object `for line in f:` uses an internal buffer and only holds one line in RAM at a time.',
        vi: 'Duyệt trực tiếp trên con trỏ file `for line in f:` sử dụng bộ đệm luồng và chỉ nạp đúng 1 dòng vào RAM tại một thời điểm.'
      }
    },
    {
      id: 'py_32_q7',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'easy',
      question: {
        en: 'Which method writes a string directly to a file using a `Path` instance?',
        vi: 'Phương thức nào ghi trực tiếp một chuỗi văn bản vào file thông qua đối tượng `Path`?'
      },
      options: [
        { en: '`p.save("text")`', vi: '`p.save("text")`' },
        { en: '`p.write_text("text", encoding="utf-8")`', vi: '`p.write_text("text", encoding="utf-8")`' },
        { en: '`p.write("text")`', vi: '`p.write("text")`' },
        { en: '`p.dump("text")`', vi: '`p.dump("text")`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`Path.write_text()` handles opening, encoding, writing, and closing in a single call.',
        vi: '`Path.write_text()` tự động mở file, mã hóa, ghi dữ liệu và đóng file trong một phương thức duy nhất.'
      }
    },
    {
      id: 'py_32_q8',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'easy',
      question: {
        en: 'What happens to the file contents when opened with mode `"w"`?',
        vi: 'Điều gì xảy ra với nội dung file cũ khi mở ở chế độ mode `"w"`?'
      },
      options: [
        { en: 'The file is appended to', vi: 'Nội dung mới được ghi tiếp vào đuôi' },
        { en: 'The existing file is truncated to zero length (overwritten completely)', vi: 'File cũ bị xóa sạch nội dung (ghi đè hoàn toàn)' },
        { en: 'It raises an error if the file exists', vi: 'Báo lỗi nếu file đã tồn tại' },
        { en: 'It opens in read-only mode', vi: 'Mở ở chế độ chỉ đọc' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Mode `"w"` creates a new file or truncates an existing file. Use `"a"` to append without truncating.',
        vi: 'Mode `"w"` tạo file mới hoặc xóa sạch nội dung file cũ. Hãy dùng `"a"` nếu muốn ghi nối tiếp.'
      }
    },
    {
      id: 'py_32_q9',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'easy',
      question: {
        en: 'How do you check if a `Path` object `p` points to an actual existing file on disk?',
        vi: 'Làm thế nào để kiểm tra xem đối tượng `Path` `p` có trỏ tới một file thực sự tồn tại trên ổ đĩa hay không?'
      },
      options: [
        { en: '`p.is_file()` (or `p.exists() and p.is_file()`)', vi: '`p.is_file()` (hoặc `p.exists() and p.is_file()`)' },
        { en: '`p.check_file()`', vi: '`p.check_file()`' },
        { en: '`p.type == "file"`', vi: '`p.type == "file"`' },
        { en: '`p.has_file()`', vi: '`p.has_file()`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`p.is_file()` returns `True` if the path points to an existing regular file.',
        vi: '`p.is_file()` trả về `True` nếu đường dẫn trỏ tới một tệp tin thông thường đang tồn tại.'
      }
    },
    {
      id: 'py_32_q10',
      type: 'single_choice',
      topicId: 'python_file_pathlib',
      difficulty: 'medium',
      question: {
        en: 'Why is `with open(...)` preferred over manually calling `f = open(...)` and `f.close()`?',
        vi: 'Tại sao `with open(...)` được ưu tiên hơn việc gọi thủ công `f = open(...)` và `f.close()`?'
      },
      options: [
        { en: 'It runs 2x faster', vi: 'Chạy nhanh hơn 2 lần' },
        { en: 'The `with` statement guarantees the file descriptor is closed even if an exception or early return occurs', vi: 'Câu lệnh `with` đảm bảo file luôn được đóng an toàn ngay cả khi xảy ra ngoại lệ hoặc return sớm' },
        { en: '`f.close()` is not supported in Python 3', vi: '`f.close()` không còn được hỗ trợ trong Python 3' },
        { en: 'It automatically encrypts the file', vi: 'Nó tự động mã hóa file' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The context manager guarantees cleanup on block exit, preventing resource leaks.',
        vi: 'Context manager đảm bảo giải phóng tài nguyên khi thoát khối lệnh, ngăn ngừa rò rỉ file handle.'
      }
    }
  ]
};
