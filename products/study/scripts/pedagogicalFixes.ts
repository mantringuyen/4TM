import { Lesson } from '../src/types';

export function applyPedagogicalFixes(lessons: Lesson[]) {
  for (const lesson of lessons) {
    const num = lesson.order;

    // FIX 2: Lesson 2 - Variables & Reference Sharing
    if (num === 2) {
      lesson.learn.conceptExplanation.en += " \n\n**CRITICAL: Memory Model & Reference Sharing:** In Python, variables are not memory boxes that store data; they are reference tags/names pointing to objects in heap memory. When you assign `b = a` for a mutable object (like a list), both `a` and `b` point to the *exact same object in memory*. Modifying `b` will simultaneously alter `a`. To create an independent duplicate, you must explicitly create a copy using `a.copy()` or `a[:]`.";
      lesson.learn.conceptExplanation.vi += " \n\n**QUAN TRỌNG: Mô Hình Bộ Nhớ & Tham Chiếu Dùng Chung:** Trong Python, biến không phải là ô nhớ chứa trực tiếp dữ liệu mà là các nhãn tên tham chiếu trỏ vào đối tượng trong bộ nhớ heap. Khi thực hiện `b = a` với một đối tượng khả biến (như danh sách list), cả `a` và `b` cùng trỏ vào *chính xác một vùng nhớ duy nhất*. Thay đổi `b` sẽ lập tức làm thay đổi `a`. Để tạo bản sao độc lập, bạn phải sao chép tường minh bằng `a.copy()` hoặc `a[:]`.";
      
      lesson.learn.commonMistakes.push({
        mistake: {
          en: "Assuming `b = a` creates a new copy of a list or dictionary",
          vi: "Nghĩ rằng `b = a` sẽ tạo ra một bản sao mới độc lập cho list hoặc dict"
        },
        correction: {
          en: "`b = a` only copies the reference pointer. Use `b = a.copy()` for an independent shallow copy.",
          vi: "`b = a` chỉ sao chép con trỏ tham chiếu. Hãy dùng `b = a.copy()` để tạo bản sao độc lập."
        },
        code: "a = [1, 2, 3]\nb = a.copy() # Independent copy\nb.append(4)\nprint(a) # [1, 2, 3] stays safe"
      });

      lesson.learn.tips.push({
        en: "Use `a is b` to check if two variables point to the exact same memory address (id(a) == id(b)), and `a == b` to compare their values.",
        vi: "Dùng `a is b` để kiểm tra 2 biến có cùng địa chỉ bộ nhớ hay không (id(a) == id(b)), và dùng `a == b` để so sánh giá trị bên trong."
      });
    }

    // FIX 3: Lesson 9 - String Indexing, Slicing & Negative Steps
    if (num === 9) {
      lesson.learn.syntax = `# Visual String Indexing Grid:
# String:     P   y   t   h   o   n
# Positive:   0   1   2   3   4   5
# Negative:  -6  -5  -4  -3  -2  -1

s = "Python"
print("Positive index 0:", s[0])     # 'P'
print("Negative index -1:", s[-1])   # 'n'
print("Slice [1:4]:", s[1:4])        # 'yth'
print("Reverse [::-1]:", s[::-1])    # 'nohtyP'
print("Negative step [5:1:-1]:", s[5:1:-1]) # 'noht'`;

      lesson.learn.conceptExplanation.en = "Python sequence indexing supports both positive (0-based from start) and negative (-1-based from end) indices. \n\n" +
        "**ASCII Index Reference Grid:**\n" +
        "```\n" +
        "String:     P   y   t   h   o   n\n" +
        "Positive:   0   1   2   3   4   5\n" +
        "Negative:  -6  -5  -4  -3  -2  -1\n" +
        "```\n\n" +
        "**Slicing Syntax:** `sequence[start : stop : step]`\n" +
        "- The `stop` index is **exclusive** (up to but not including `stop`).\n" +
        "- A positive `step` moves left-to-right (default is +1).\n" +
        "- A negative `step` moves right-to-left. For negative steps, `start` must be greater than `stop` unless omitted (e.g. `s[::-1]` reverses the entire sequence; `s[5:1:-1]` extracts from index 5 down to before index 1).";

      lesson.learn.conceptExplanation.vi = "Chỉ mục chuỗi trong Python hỗ trợ cả chỉ số dương (bắt đầu từ 0 ở đầu chuỗi) và chỉ số âm (bắt đầu từ -1 ở cuối chuỗi).\n\n" +
        "**Bảng Chỉ Mục Chuỗi Chuẩn:**\n" +
        "```\n" +
        "Chuỗi:      P   y   t   h   o   n\n" +
        "Chỉ số (+): 0   1   2   3   4   5\n" +
        "Chỉ số (-):-6  -5  -4  -3  -2  -1\n" +
        "```\n\n" +
        "**Cú Pháp Cắt Lát (Slicing):** `sequence[start : stop : step]`\n" +
        "- Vị trí `stop` luôn **loại trừ** (chỉ lấy đến trước `stop`).\n" +
        "- Bước nhảy `step` dương di chuyển từ trái sang phải (mặc định là +1).\n" +
        "- Bước nhảy `step` âm di chuyển từ phải sang trái. Khi bước nhảy âm, `start` phải lớn hơn `stop` (ví dụ `s[::-1]` đảo ngược toàn bộ chuỗi; `s[5:1:-1]` lấy từ index 5 lùi đến trước index 1).";
    }

    // FIX 2: Lesson 12 & 13 & 25 - Lists Mutability & Shallow/Deep Copy
    if (num === 12) {
      lesson.learn.tips.push({
        en: "Remember: `list_b = list_a` does not copy the list. Modifying `list_b` will alter `list_a`. Use `list_b = list_a.copy()` or `list_b = list_a[:]` for an independent copy.",
        vi: "Ghi nhớ: `list_b = list_a` không tạo bản sao. Thay đổi `list_b` sẽ làm đổi `list_a`. Hãy dùng `list_b = list_a.copy()` hoặc `list_b = list_a[:]` để tạo bản sao độc lập."
      });
    }

    if (num === 25) {
      lesson.learn.conceptExplanation.en += " \n\n**2D Matrix Shallow Multiplication Trap:**\nWriting `matrix = [[0] * 3] * 3` creates a list containing 3 references to the *exact same inner row list*. Modifying `matrix[0][0] = 1` mutates all 3 rows simultaneously! Always use list comprehension for nested mutable structures: `matrix = [[0 for _ in range(3)] for _ in range(3)]`.\n\n**Shallow Copy vs Deep Copy:**\n- `copy.copy(x)` / `x.copy()` copies the top-level container, but nested mutable objects inside remain shared.\n- `copy.deepcopy(x)` recursively copies all nested containers and objects, ensuring 100% complete memory isolation.";
      lesson.learn.conceptExplanation.vi += " \n\n**Cạm Bẫy Nhân Bản Danh Sách 2D Nông:**\nViết `matrix = [[0] * 3] * 3` tạo ra một danh sách chứa 3 tham chiếu cùng trỏ vào *duy nhất một dòng bên trong*. Khi gán `matrix[0][0] = 1`, cả 3 dòng sẽ bị đổi cùng lúc! Luôn dùng List Comprehension cho cấu trúc lồng nhau: `matrix = [[0 for _ in range(3)] for _ in range(3)]`.\n\n**Bản Sao Nông (Shallow) vs Bản Sao Sâu (Deep):**\n- `copy.copy(x)` / `x.copy()` chỉ sao chép mảng ngoài cùng, các đối tượng lồng bên trong vẫn bị dùng chung.\n- `copy.deepcopy(x)` sao chép đệ quy toàn bộ các tầng dữ liệu lồng nhau, đảm bảo cô lập bộ nhớ 100%.";
    }

    // FIX 5: Lesson 27 - *args and **kwargs parameter forwarding
    if (num === 27) {
      lesson.learn.conceptExplanation.en += " \n\n**Canonical Argument Forwarding Pattern:**\nThe primary production use of `*args` and `**kwargs` is forwarding parameters seamlessly to underlying functions, decorators, or superclass constructors:\n```python\ndef execute_with_logging(func, *args, **kwargs):\n    print(f\"Executing {func.__name__} with args={args}, kwargs={kwargs}\")\n    return func(*args, **kwargs)  # Unpacks and forwards both\n```";
      lesson.learn.conceptExplanation.vi += " \n\n**Mô Hình Chuyển Tiếp Tham Số Chuẩn Mực:**\nỨng dụng quan trọng nhất trong thực tế của `*args` và `**kwargs` là chuyển tiếp tham số nguyên vẹn cho hàm bên dưới, decorator hoặc constructor của lớp cha:\n```python\ndef execute_with_logging(func, *args, **kwargs):\n    print(f\"Executing {func.__name__} with args={args}, kwargs={kwargs}\")\n    return func(*args, **kwargs)  # Mở gói và chuyển tiếp toàn bộ\n```";
    }

    // FIX 6: Lesson 28 - Scopes LEGB vs Object State
    if (num === 28) {
      lesson.learn.conceptExplanation.en += " \n\n**LEGB vs Object Instance State:**\n- **LEGB** governs lexical variable resolution in functions: Local -> Enclosing (`nonlocal`) -> Global (`global`) -> Built-in.\n- **Object State** is bound to instance attributes via `self.attribute` stored in the object's `__dict__`.\n- **Crucial In-Place Mutation Nuance:** In-place mutation of a mutable object (e.g. `global_list.append(item)`) does NOT require the `global` keyword because the variable name is not being re-bound with `=`. The `global` keyword is only required when re-assigning/re-binding the name itself (e.g. `global_list = [...]`).";
      lesson.learn.conceptExplanation.vi += " \n\n**Quy Tắc LEGB vs Trạng Thái Đối Tượng:**\n- **LEGB** quản lý phạm vi tìm kiếm biến trong hàm: Local -> Enclosing (`nonlocal`) -> Global (`global`) -> Built-in.\n- **Trạng thái đối tượng** được gắn vào thuộc tính qua `self.attribute` lưu trong từ điển `__dict__` của đối tượng.\n- **Lưu ý quan trọng về đột biến tại chỗ:** Thay đổi trực tiếp đối tượng khả biến (vd: `global_list.append(item)`) KHÔNG cần khai báo từ khóa `global` vì tên biến không bị gán lại bằng dấu `=`. Từ khóa `global` chỉ bắt buộc khi bạn gán lại giá trị mới cho chính biến đó (vd: `global_list = [...]`).";
    }

    // FIX 7: Lesson 32, 33, 34 - Explicit UTF-8 Encoding for File I/O
    if (num === 32 || num === 33 || num === 34) {
      lesson.learn.conceptExplanation.en += " \n\n**MANDATORY BEST PRACTICE: Explicit `encoding='utf-8'`:**\nOmitting `encoding` causes Python to fall back to the operating system default (e.g., `cp1252` on Windows), resulting in `UnicodeDecodeError` or data corruption when reading Vietnamese characters or emojis. Always specify `encoding='utf-8'` in all `open()`, `csv.reader()`, and `Path.read_text()` operations.";
      lesson.learn.conceptExplanation.vi += " \n\n**CHUẨN THỰC HÀNH BẮT BUỘC: Luôn Khai Báo `encoding='utf-8'`:**\nNếu không ghi rõ `encoding`, Python sẽ dùng bảng mã mặc định của hệ điều hành (vd: `cp1252` trên Windows), dẫn đến lỗi `UnicodeDecodeError` hoặc lỗi font khi đọc tiếng Việt hay emoji. Luôn luôn khai báo tường minh `encoding='utf-8'` trong mọi lệnh `open()`, `csv.reader()` và `Path.read_text()`.";
    }

    // FIX 4: Lesson 35 & 36 - Exception Hierarchy & Specific Handling
    if (num === 35 || num === 36) {
      lesson.learn.conceptExplanation.en += " \n\n**Python Exception Hierarchy & Specific Catching:**\n```\nBaseException\n ├── SystemExit\n ├── KeyboardInterrupt (Ctrl+C)\n └── Exception\n      ├── ArithmeticError (ZeroDivisionError)\n      ├── LookupError (IndexError, KeyError)\n      └── ValueError\n```\n- **Always catch specific exceptions** (`ValueError`, `KeyError`) first, and place generic `except Exception:` as a fallback.\n- **Anti-pattern:** Never use bare `except:` or `except BaseException:`, because it will intercept `KeyboardInterrupt` and `SystemExit`, preventing users from stopping the program.";
      lesson.learn.conceptExplanation.vi += " \n\n**Cây Phân Cấp Ngoại Lệ & Bắt Lỗi Cụ Thể:**\n```\nBaseException\n ├── SystemExit\n ├── KeyboardInterrupt (Ctrl+C)\n └── Exception\n      ├── ArithmeticError (ZeroDivisionError)\n      ├── LookupError (IndexError, KeyError)\n      └── ValueError\n```\n- **Luôn bắt các ngoại lệ cụ thể** (`ValueError`, `KeyError`) trước, và chỉ dùng `except Exception:` ở cuối làm phương án dự phòng.\n- **Phản mẫu nguy hiểm:** Không bao giờ dùng `except:` để trống hoặc `except BaseException:`, vì nó sẽ chặn đứng cả tín hiệu ngắt chương trình `KeyboardInterrupt` (Ctrl+C) và lệnh thoát hệ thống `SystemExit`.";
    }

    // FIX 9: Lesson 41 & 52 - typing.Protocol alongside ABC & Duck Typing
    if (num === 41 || num === 52) {
      lesson.learn.conceptExplanation.en += " \n\n**Nominal Subtyping (ABC) vs Structural Subtyping (typing.Protocol):**\n- `abc.ABC` enforces **Nominal Subtyping**: classes must explicitly inherit from the ABC (`class S3Storage(BaseStorage)`).\n- `typing.Protocol` (PEP 544) enables **Static Duck Typing (Structural Subtyping)**: any class that implements the required methods satisfies the Protocol without explicit inheritance!\n- Use `@runtime_checkable` with `typing.Protocol` to enable `isinstance(obj, MyProtocol)` checks at runtime.";
      lesson.learn.conceptExplanation.vi += " \n\n**Kế Thừa Định Danh (ABC) vs Phân Kiểu Cấu Trúc (typing.Protocol):**\n- `abc.ABC` thực thi **Nominal Subtyping**: các lớp bắt buộc phải kế thừa tường minh từ lớp cha (`class S3Storage(BaseStorage)`).\n- `typing.Protocol` (PEP 544) mang lại **Static Duck Typing (Structural Subtyping)**: bất kỳ lớp nào có đủ các phương thức yêu cầu đều thỏa mãn Protocol mà không cần phải kế thừa trực tiếp!\n- Dùng decorator `@runtime_checkable` kèm `typing.Protocol` để cho phép kiểm tra `isinstance(obj, MyProtocol)` ngay lúc chạy.";
    }

    // FIX 8: Lesson 53 & 54 - Asyncio Cancellation, Timeout, CancelledError & return_exceptions
    if (num === 53 || num === 54) {
      lesson.learn.conceptExplanation.en += " \n\n**Resilient Asyncio Execution Patterns:**\n1. **Timeouts:** `await asyncio.wait_for(task, timeout=2.0)` raises `asyncio.TimeoutError` if task exceeds time.\n2. **Cancellation:** Calling `task.cancel()` raises `asyncio.CancelledError` inside the coroutine. Always use `try...finally` to cleanly release database connections, sockets, and locks.\n3. **Batch Resilience:** `await asyncio.gather(*tasks, return_exceptions=True)` prevents a single failing task from cancelling sibling tasks; failed tasks return their Exception object in the results list.";
      lesson.learn.conceptExplanation.vi += " \n\n**Mô Hình Xử Lý Asyncio Bền Vững:**\n1. **Giới Hạn Thời Gian (Timeout):** `await asyncio.wait_for(task, timeout=2.0)` sẽ ném ra `asyncio.TimeoutError` nếu tác vụ chạy quá giờ.\n2. **Hủy Tác Vụ (Cancellation):** Gọi `task.cancel()` sẽ ném ngoại lệ `asyncio.CancelledError` vào trong coroutine. Luôn dùng khối `try...finally` để đóng kết nối cơ sở dữ liệu, socket và giải phóng khóa an toàn.\n3. **Thu Thập Chịu Lỗi (Batch Resilience):** `await asyncio.gather(*tasks, return_exceptions=True)` giúp 1 tác vụ thất bại không làm hỏng các tác vụ khác trong nhóm; các tác vụ lỗi sẽ trả về đối tượng ngoại lệ trong danh sách kết quả.";
    }

    // FIX 10: Lesson 55 - Memory Profiling with tracemalloc & __slots__ inheritance
    if (num === 55) {
      lesson.learn.conceptExplanation.en += " \n\n**Advanced Memory Profiling & Optimization:**\n1. **Why `sys.getsizeof()` is Incomplete:** `sys.getsizeof()` only returns the shallow byte size of the top-level container pointer array, completely ignoring the memory of nested items or strings inside.\n2. **Deep Profiling with `tracemalloc`:** Use the standard library `tracemalloc` (`tracemalloc.start()`, `tracemalloc.get_traced_memory()`, `tracemalloc.take_snapshot()`) to measure exact heap allocation deltas across complex data pipelines.\n3. **`__slots__` Inheritance Rule:** If a subclass inherits from a class with `__slots__` but does not declare `__slots__ = ()`, Python will automatically create an instance `__dict__` for the subclass, negating memory savings!";
      lesson.learn.conceptExplanation.vi += " \n\n**Phân Tích & Tối Ưu Hóa Bộ Nhớ Nâng Cao:**\n1. **Hạn Chế Của `sys.getsizeof()`:** `sys.getsizeof()` chỉ đo kích thước nông của mảng con trỏ ở tầng ngoài cùng, hoàn toàn bỏ qua dung lượng thực tế của các đối tượng hoặc chuỗi lồng bên trong.\n2. **Đo Lường Chuẩn Với `tracemalloc`:** Dùng thư viện chuẩn `tracemalloc` (`tracemalloc.start()`, `tracemalloc.get_traced_memory()`, `tracemalloc.take_snapshot()`) để đo chính xác dung lượng RAM phân bổ trong toàn bộ luồng xử lý.\n3. **Quy Tắc Kế Thừa Của `__slots__`:** Nếu lớp con kế thừa từ lớp có `__slots__` nhưng không tự khai báo `__slots__ = ()`, Python sẽ tự động tạo bảng `__dict__` cho lớp con, làm mất hoàn toàn lợi ích tiết kiệm RAM!";
    }
  }
}
