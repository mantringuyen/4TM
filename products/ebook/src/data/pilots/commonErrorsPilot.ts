import { Book } from '../../types';

export const COMMON_ERRORS_PILOT_BOOK: Book = {
  "id": "python-common-errors-diagnosis",
  "slug": "python-common-errors-diagnosis",
  "title": "Python Common Errors — Diagnosis & Prevention",
  "subtitle": {
    "en": "Symptom Signatures, Minimal Reproductions & Defensive Guardrails",
    "vi": "Dấu Hiệu Nhận Biết, Tái Hiện Lỗi Tối Giản & Biện Pháp Phòng Ngừa"
  },
  "bookType": "Common Errors",
  "categoryId": "python",
  "subjectId": "programming",
  "author": "4TM Editorial Board",
  "role": "Reliability & Runtime Diagnostics Group",
  "level": "Practical / All Levels",
  "estimatedReadTime": "30 mins",
  "chaptersCount": 10,
  "publishedDate": "2025-02-20",
  "accentColor": "from-rose-500 to-red-800",
  "tags": [
    "Common Errors",
    "Debugging",
    "Troubleshooting",
    "CPython Diagnostics",
    "Runtime Errors"
  ],
  "description": {
    "en": "Systematic diagnosis, reproduction, root cause analysis, and defensive fixes for the 10 most insidious Python runtime errors.",
    "vi": "Chẩn đoán hệ thống, tái hiện mã lỗi tối giản, phân tích nguyên nhân gốc và giải pháp phòng ngừa cho 10 lỗi runtime phổ biến nhất trong Python."
  },
  "prerequisites": {
    "en": [
      "Basic debugging experience in Python"
    ],
    "vi": [
      "Kinh nghiệm debug cơ bản trong Python"
    ]
  },
  "outcomes": {
    "en": [
      "Instantly recognize exact error signatures and trace them to their root cause in seconds",
      "Fix circular imports, UnboundLocalError, and mutation-during-iteration without guessing",
      "Apply defensive idioms that prevent entire classes of runtime exceptions"
    ],
    "vi": [
      "Nhận diện dấu hiệu lỗi ngay lập tức và truy vết chính xác nguyên nhân gốc chỉ trong vài giây",
      "Sửa dứt điểm lỗi circular import, UnboundLocalError và sửa mảng khi đang duyệt",
      "Áp dụng các mẫu lập trình phòng vệ giúp triệt tiêu hoàn toàn các lớp ngoại lệ runtime"
    ]
  },
  "chapters": [
    {
      "id": "err-ch-1",
      "number": 1,
      "slug": "mutable-default-arguments-leak",
      "title": {
        "en": "1. Mutable Default Arguments (Cross-Call State Leak)",
        "vi": "1. Tham Số Mặc Định Khả Biến (Rò Rỉ Dữ Liệu Giữa Các Lần Gọi)"
      },
      "summary": {
        "en": "Default argument expressions are evaluated once at function definition time, leading to shared state bugs.",
        "vi": "Biểu thức tham số mặc định chỉ được tính toán 1 lần duy nhất khi định nghĩa hàm, gây rò rỉ dữ liệu giữa các lần gọi."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-1-1",
          "title": {
            "en": "Diagnosis & Fix for Mutable Defaults",
            "vi": "Chẩn Đoán & Sửa Lỗi Tham Số Mặc Định"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "def add_item(item, target_list=[]):\n    target_list.append(item)\n    return target_list\n\nprint(add_item(\" }A\"))  # ['A']\nprint(add_item(\"B\"))  # ['A', 'B']  <-- State leaked!" },
            "errorSignature": {
              "en": "A function that creates or appends to an internal list/dict unexpectedly retains data from previous calls made minutes or hours earlier.",
              "vi": "Hàm thêm dữ liệu vào list/dict nhưng bất ngờ giữ lại dữ liệu từ những lần gọi trước đó nhiều phút hoặc nhiều giờ."
            },
            "symptoms": {
              "en": [
                "A function that creates or appends to an internal list/dict unexpectedly retains data from previous calls made minutes or hours earlier."
              ],
              "vi": [
                "Hàm thêm dữ liệu vào list/dict nhưng bất ngờ giữ lại dữ liệu từ những lần gọi trước đó nhiều phút hoặc nhiều giờ."
              ]
            },
            "whyItHappens": {
              "en": "In Python, `def` is an executable statement. Default argument expressions are evaluated once when the module loads, not every time the function is called. The resulting object is stored in the function’s `__defaults__` tuple.",
              "vi": "Trong Python, `def` là một câu lệnh thực thi. Biểu thức tham số mặc định được tính đúng 1 lần khi module được nạp, không phải mỗi lần gọi hàm. Đối tượng kết quả được lưu vĩnh viễn trong tuple `__defaults__` của hàm."
            },
            "correctFix": {
              "language": "python",
              "code": "def add_item(item, target_list=None):\n    if target_list is None:\n        target_list = []\n    target_list.append(item)\n    return target_list\n\nprint(add_item(\"A\"))  # ['A']\nprint(add_item(\"B\"))  # ['B']  <-- Clean isolated state!"
            },
            "preventionRules": {
              "en": [
                "Never use `[]`, `{}`, or `set()` in function parameter defaults",
                "Use `param: list[str] | None = None` and initialize inside the function"
              ],
              "vi": [
                "Không bao giờ dùng `[]`, `{}`, hoặc `set()` làm giá trị mặc định của tham số hàm",
                "Dùng `param: list[str] | None = None` và khởi tạo bên trong thân hàm"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "err-ch-2",
      "number": 2,
      "slug": "identity-vs-equality-confusion",
      "title": {
        "en": "2. Identity (is) vs Equality (==) Comparison Bugs",
        "vi": "2. Nhầm Lẫn Giữa Toán Tử is Và =="
      },
      "summary": {
        "en": "Using `is` for value comparisons works unpredictably on cached small integers and strings, failing on larger values.",
        "vi": "Dùng `is` để so sánh giá trị hoạt động chập chờn do cơ chế cache số nguyên nhỏ và chuỗi, gây lỗi khi giá trị lớn hơn."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-2-1",
          "title": {
            "en": "Diagnosis & Fix for Identity Comparison Pitfalls",
            "vi": "Chẩn Đoán & Khắc Phục Lỗi So Sánh Định Danh"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "a = 256\nb = 256\nprint(a is b)  # True (CPython small integer cache)\n\nx = 1000\ny = 1000\nprint(x is y)  # False! (Different heap objects)" },
            "errorSignature": {
              "en": "Comparisons like `if count is 1000:` evaluate to `False` in production even when `count` has the numeric value 1000, causing conditional logic to fail silently.",
              "vi": "Câu lệnh `if count is 1000:` trả về `False` trên production dù `count` mang giá trị 1000, khiến nhánh điều kiện không được thực thi."
            },
            "symptoms": {
              "en": [
                "Comparisons like `if count is 1000:` evaluate to `False` in production even when `count` has the numeric value 1000, causing conditional logic to fail silently."
              ],
              "vi": [
                "Câu lệnh `if count is 1000:` trả về `False` trên production dù `count` mang giá trị 1000, khiến nhánh điều kiện không được thực thi."
              ]
            },
            "whyItHappens": {
              "en": "`is` tests memory address identity (`id(a) == id(b)`). CPython caches integers from -5 to 256, causing `is` to appear to work for small numbers, but failing for any number outside that range.",
              "vi": "`is` kiểm tra địa chỉ bộ nhớ (`id(a) == id(b)`). CPython lưu cache sẵn số nguyên từ -5 đến 256 khiến người dùng tưởng nhầm `is` so sánh được giá trị, nhưng sẽ thất bại với các số nằm ngoài dải này."
            },
            "correctFix": {
              "language": "python",
              "code": "# For values: ALWAYS use ==\nif count == 1000:\n    print(\"Count is 1000\")\n\n# For singletons: use 'is' exclusively\nif user_session is None:\n    print(\"No active session\")"
            },
            "preventionRules": {
              "en": [
                "Reserve `is` and `is not` exclusively for singletons like `None` and `sentinel` objects",
                "Enable flake8 or ruff rule F632 (warns when using `is` with literals)"
              ],
              "vi": [
                "Chỉ dùng `is` và `is not` cho các singleton như `None` và đối tượng `sentinel`",
                "Bật rule F632 trong ruff/flake8 để cảnh báo tự động khi dùng `is` với literal"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "err-ch-3",
      "number": 3,
      "slug": "modifying-collection-while-iterating",
      "title": {
        "en": "3. Modifying a Collection While Iterating",
        "vi": "3. Thay Đổi Cấu Trúc Danh Sách Khi Đang Duyệt Vòng Lặp"
      },
      "summary": {
        "en": "Mutating lists or dicts inside a `for` loop skips elements or raises `RuntimeError: dictionary changed size during iteration`.",
        "vi": "Sửa đổi danh sách hoặc từ điển trong vòng lặp làm bỏ sót phần tử hoặc gây lỗi `RuntimeError: dictionary changed size`."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-3-1",
          "title": {
            "en": "Diagnosis & Fix for Iteration Mutation",
            "vi": "Chẩn Đoán & Sửa Lỗi Biến Đổi Tập Hợp Khi Duyệt"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "# Bug 1: List skips elements\nitems = [1, 2, 2, 3]\nfor item in items:\n    if item == 2:\n        items.remove(item)\nprint(items)  # [1, 2, 3]  <-- The second 2 was skipped!\n\n# Bug 2: Dict crashes\nd = {\" }a\": 1, \"b\": 2}\nfor k in d:\n    del d[k]  # RuntimeError: dictionary changed size during iteration" },
            "errorSignature": {
              "en": "Deleting items inside a list loop skips consecutive elements, or deleting keys from a dictionary crashes with `RuntimeError: dictionary changed size during iteration`.",
              "vi": "Xóa phần tử trong vòng lặp list làm bỏ sót các phần tử liền kề, hoặc xóa key trong dictionary gây crash với `RuntimeError`."
            },
            "symptoms": {
              "en": [
                "Deleting items inside a list loop skips consecutive elements, or deleting keys from a dictionary crashes with `RuntimeError: dictionary changed size during iteration`."
              ],
              "vi": [
                "Xóa phần tử trong vòng lặp list làm bỏ sót các phần tử liền kề, hoặc xóa key trong dictionary gây crash với `RuntimeError`."
              ]
            },
            "whyItHappens": {
              "en": "Python maintains an internal integer index counter during list iteration. Removing an element shifts all remaining items left, causing the index to advance past the adjacent element without inspecting it.",
              "vi": "Python duy trì một chỉ số nguyên nội bộ khi duyệt list. Khi xóa một phần tử, các phần tử phía sau bị dồn sang trái, khiến chỉ số lặp nhảy qua phần tử kế tiếp mà không kiểm tra."
            },
            "correctFix": {
              "language": "python",
              "code": "# Solution 1: Use a list comprehension to filter pure new list\nitems = [x for x in items if x != 2]\n\n# Solution 2: Iterate over a snapshot list copy for dictionaries\nd = {\"a\": 1, \"b\": 2}\nfor k in list(d.keys()):\n    if should_remove(k):\n        del d[k]"
            },
            "preventionRules": {
              "en": [
                "Never call `.remove()`, `.pop()`, or `del` on the exact container being traversed in `for x in container:`",
                "Prefer list/dict comprehensions to build a filtered collection cleanly"
              ],
              "vi": [
                "Không bao giờ gọi `.remove()`, `.pop()` hoặc `del` trên chính container đang được duyệt",
                "Ưu tiên dùng list/dict comprehension để tạo tập dữ liệu đã lọc sạch sẽ"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "err-ch-4",
      "number": 4,
      "slug": "keyerror-direct-dict-access",
      "title": {
        "en": "4. KeyError from Unsafe Direct Dictionary Access",
        "vi": "4. Lỗi KeyError Do Truy Xuất Trực Tiếp Thiếu An Toàn"
      },
      "summary": {
        "en": "Accessing optional dictionary keys directly with `d[k]` crashes when payloads have missing or null properties.",
        "vi": "Truy cập key tùy chọn trực tiếp bằng `d[k]` gây crash khi payload bị thiếu trường dữ liệu."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-4-1",
          "title": {
            "en": "Diagnosis & Fix for KeyError",
            "vi": "Chẩn Đoán & Sửa Lỗi KeyError"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "payload = {\" }user_id\": \"U123\", \"email\": \"test@domain.com\"}\n# Crashes if user did not provide phone_number\nphone = payload[\"phone_number\"]  # KeyError: 'phone_number'" },
            "errorSignature": {
              "en": "Web API endpoint crashes with `KeyError: 'phone_number'` when processing third-party webhook payloads with optional fields.",
              "vi": "API endpoint bị crash với lỗi `KeyError: 'phone_number'` khi xử lý webhook từ bên thứ ba có trường tùy chọn."
            },
            "symptoms": {
              "en": [
                "Web API endpoint crashes with `KeyError: 'phone_number'` when processing third-party webhook payloads with optional fields."
              ],
              "vi": [
                "API endpoint bị crash với lỗi `KeyError: 'phone_number'` khi xử lý webhook từ bên thứ ba có trường tùy chọn."
              ]
            },
            "whyItHappens": {
              "en": "Square bracket lookup `d[key]` invokes `__getitem__()`, which is designed to raise `KeyError` if the hash table lookup fails to find a matching bucket.",
              "vi": "Cú pháp ngoặc vuông `d[key]` gọi phương thức `__getitem__()`, được thiết kế để ném `KeyError` nếu không tìm thấy key trong bảng băm."
            },
            "correctFix": {
              "language": "python",
              "code": "# Option A: Safe fallback with .get()\nphone = payload.get(\"phone_number\", \"N/A\")\n\n# Option B: Explicit membership check\nif \"phone_number\" in payload:\n    phone = payload[\"phone_number\"]\n\n# Option C: Pydantic schema validation for robust API boundaries"
            },
            "preventionRules": {
              "en": [
                "Use `payload.get(\"key\", default)` for optional configuration or API inputs",
                "Validate external JSON payloads with Pydantic or dataclasses at boundary layers"
              ],
              "vi": [
                "Dùng `payload.get(\"key\", default)` cho các giá trị cấu hình hoặc API không bắt buộc",
                "Validate dữ liệu JSON đầu vào bằng Pydantic hoặc dataclass tại tầng ranh giới"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "err-ch-5",
      "number": 5,
      "slug": "typeerror-unhashable-or-not-callable",
      "title": {
        "en": "5. TypeError: 'list' object is not callable / unhashable",
        "vi": "5. Lỗi TypeError: 'list' Object Is Not Callable / Unhashable"
      },
      "summary": {
        "en": "Shadowing built-in names like `list` or using mutable containers as dict keys produces confusing TypeErrors.",
        "vi": "Ghi đè tên hàm built-in như `list` hoặc dùng container khả biến làm dict key gây ra lỗi TypeError khó hiểu."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-5-1",
          "title": {
            "en": "Diagnosis & Fix for Common TypeErrors",
            "vi": "Chẩn Đoán & Sửa Các Lỗi TypeError Phổ Biến"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "# Bug 1: Variable name shadowing built-in\nlist = [1, 2, 3]  # Shadows built-in list()!\n# Later in the file:\nnew_items = list(range(5))  # TypeError: 'list' object is not callable\n\n# Bug 2: Using mutable type as dict key\ncache = {[1, 2]: \" }result\"}  # TypeError: unhashable type: 'list'" },
            "errorSignature": {
              "en": "Calling `list(my_seq)` throws `TypeError: 'list' object is not callable`, or using a list in a set throws `TypeError: unhashable type: 'list'`.",
              "vi": "Gọi `list(my_seq)` bị lỗi `TypeError: 'list' object is not callable`, hoặc thêm list vào set bị `TypeError: unhashable type: 'list'`."
            },
            "symptoms": {
              "en": [
                "Calling `list(my_seq)` throws `TypeError: 'list' object is not callable`, or using a list in a set throws `TypeError: unhashable type: 'list'`."
              ],
              "vi": [
                "Gọi `list(my_seq)` bị lỗi `TypeError: 'list' object is not callable`, hoặc thêm list vào set bị `TypeError: unhashable type: 'list'`."
              ]
            },
            "whyItHappens": {
              "en": "Assigning to a variable named `list`, `dict`, `str`, or `sum` shadows the built-in function in the local/global namespace. Attempting to call parentheses `()` on the list instance fails.",
              "vi": "Gán biến trùng tên `list`, `dict`, `str`, hoặc `sum` sẽ ghi đè hàm built-in trong namespace. Khi dùng dấu ngoặc tròn `()` trên instance list sẽ phát sinh lỗi."
            },
            "correctFix": {
              "language": "python",
              "code": "# Fix 1: Use descriptive non-shadowing variable names\nitems_list = [1, 2, 3]\nnew_items = list(range(5))  # Built-in list() works properly!\n\n# Fix 2: Convert mutable lists to immutable tuples for hash keys\ncache = {(1, 2): \"result\"}  # Works!"
            },
            "preventionRules": {
              "en": [
                "Never name variables after Python built-ins: `list`, `dict`, `set`, `str`, `int`, `type`, `id`",
                "Use tuples for compound lookup keys"
              ],
              "vi": [
                "Không bao giờ đặt tên biến trùng với built-in: `list`, `dict`, `set`, `str`, `int`, `type`, `id`",
                "Dùng tuple khi cần tạo key ghép cho từ điển"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "err-ch-6",
      "number": 6,
      "slug": "circular-module-import-deadlocks",
      "title": {
        "en": "6. Circular Module Import Deadlocks",
        "vi": "6. Xung Đột Vòng Lặp Import (Circular Imports)"
      },
      "summary": {
        "en": "Mutually dependent top-level imports cause `ImportError: cannot import name ... from partially initialized module`.",
        "vi": "Các module import chéo nhau ở cấp top-level gây lỗi `ImportError: cannot import name ... from partially initialized module`."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-6-1",
          "title": {
            "en": "Diagnosis & Architectural Decoupling for Circular Imports",
            "vi": "Chẩn Đoán & Tách Rời Kiến Trúc Cho Circular Imports"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "# file_a.py\nfrom file_b import process_order\nclass User: pass\n\n# file_b.py\nfrom file_a import User  # Crashes because file_a is still mid-execution!\ndef process_order(): pass" },
            "errorSignature": {
              "en": "Running an application fails at startup with `ImportError: cannot import name 'User' from partially initialized module 'models.user' (most likely due to a circular import)`.",
              "vi": "Khởi động ứng dụng thất bại với lỗi `ImportError: cannot import name 'User' from partially initialized module` do circular import."
            },
            "symptoms": {
              "en": [
                "Running an application fails at startup with `ImportError: cannot import name 'User' from partially initialized module 'models.user' (most likely due to a circular import)`."
              ],
              "vi": [
                "Khởi động ứng dụng thất bại với lỗi `ImportError: cannot import name 'User' from partially initialized module` do circular import."
              ]
            },
            "whyItHappens": {
              "en": "When `file_a` imports `file_b`, execution pauses and starts evaluating `file_b`. When `file_b` attempts to import `User` from `file_a`, `file_a` has not yet reached the `class User:` definition line.",
              "vi": "Khi `file_a` import `file_b`, tiến trình nạp dừng lại để chạy `file_b`. Khi `file_b` cố import `User` từ `file_a`, `file_a` vẫn chưa chạy đến dòng định nghĩa `class User:`."
            },
            "correctFix": {
              "language": "python",
              "code": "# Solution 1: Extract shared types into a dedicated models/types module\n# types.py\nclass User: pass\n\n# Solution 2: For type hints only, use TYPE_CHECKING\nfrom typing import TYPE_CHECKING\nif TYPE_CHECKING:\n    from file_a import User  # Only evaluated by static type checkers"
            },
            "preventionRules": {
              "en": [
                "Structure dependencies hierarchically (low-level types at the base, high-level business logic at the top)",
                "Use `if TYPE_CHECKING:` guards for imports required purely for type annotations"
              ],
              "vi": [
                "Tổ chức phụ thuộc theo thứ bậc (các kiểu dữ liệu cơ bản ở đáy, logic nghiệp vụ ở trên)",
                "Dùng khối `if TYPE_CHECKING:` cho các import chỉ phục vụ type annotation"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "err-ch-7",
      "number": 7,
      "slug": "unboundlocalerror-referenced-before-assignment",
      "title": {
        "en": "7. UnboundLocalError: Local Variable Referenced Before Assignment",
        "vi": "7. Lỗi UnboundLocalError: Dùng Biến Local Trước Khi Gán"
      },
      "summary": {
        "en": "Assigning to a variable anywhere in a function makes it local across the whole scope, masking outer variables.",
        "vi": "Phép gán biến ở bất kỳ đâu trong hàm sẽ biến nó thành Local cho toàn bộ hàm, che khuất biến bên ngoài."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-7-1",
          "title": {
            "en": "Diagnosis & Fix for UnboundLocalError",
            "vi": "Chẩn Đoán & Sửa Lỗi UnboundLocalError"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "counter = 0\n\ndef increment():\n    # Attempting to read global counter and add 1\n    counter += 1  # UnboundLocalError!\n\nincrement()" },
            "errorSignature": {
              "en": "Function crashes with `UnboundLocalError: cannot access local variable 'counter' where it is not associated with a value`.",
              "vi": "Hàm bị dừng với lỗi `UnboundLocalError: cannot access local variable 'counter'` khi cố đọc biến trước phép gán."
            },
            "symptoms": {
              "en": [
                "Function crashes with `UnboundLocalError: cannot access local variable 'counter' where it is not associated with a value`."
              ],
              "vi": [
                "Hàm bị dừng với lỗi `UnboundLocalError: cannot access local variable 'counter'` khi cố đọc biến trước phép gán."
              ]
            },
            "whyItHappens": {
              "en": "Python compiler analyzes functions at parse time. Because `counter += 1` contains an assignment (`counter = counter + 1`), the compiler classifies `counter` as a Local variable for the entire function. At runtime, when evaluating the right-hand side `counter + 1`, the local variable has not yet received a value.",
              "vi": "Trình biên dịch Python phân tích hàm lúc parse code. Vì `counter += 1` có phép gán (`counter = counter + 1`), Python coi `counter` là biến Local cho toàn bộ hàm. Lúc runtime, khi đọc `counter` ở vế phải, biến local này chưa có giá trị nên báo lỗi."
            },
            "correctFix": {
              "language": "python",
              "code": "# Solution A: Use explicit parameter passing (Pure functional style)\ndef increment(count: int) -> int:\n    return count + 1\n\n# Solution B: Declare 'global' or 'nonlocal' if mutating outer state\ndef increment():\n    global counter\n    counter += 1"
            },
            "preventionRules": {
              "en": [
                "Prefer passing state as explicit function parameters and returning results",
                "Use `nonlocal` when modifying enclosing variables inside closures"
              ],
              "vi": [
                "Ưu tiên truyền trạng thái qua tham số hàm và trả về kết quả thay vì dùng biến toàn cục",
                "Dùng từ khóa `nonlocal` khi cần cập nhật biến trong closure"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "err-ch-8",
      "number": 8,
      "slug": "attributeerror-nonetype-missing-return",
      "title": {
        "en": "8. AttributeError: 'NoneType' Object Has No Attribute",
        "vi": "8. Lỗi AttributeError: 'NoneType' Object Has No Attribute"
      },
      "summary": {
        "en": "Forgetting an explicit `return` statement or calling in-place mutation methods (`list.sort()`) returns `None`.",
        "vi": "Quên câu lệnh `return` hoặc gọi phương thức biến đổi tại chỗ (`list.sort()`) làm hàm trả về `None`."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-8-1",
          "title": {
            "en": "Diagnosis & Fix for NoneType Attribute Errors",
            "vi": "Chẩn Đoán & Khắc Phục Lỗi NoneType"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "# Bug 1: list.sort() mutates in-place and returns None!\nnumbers = [3, 1, 2]\nsorted_nums = numbers.sort()  # sorted_nums is None!\nprint(sorted_nums[0])  # TypeError: 'NoneType' object is not subscriptable\n\n# Bug 2: Missing return branch in helper function\ndef clean_name(name):\n    if name:\n        return name.strip()\n    # Missing explicit return when name is empty string -> returns None!" },
            "errorSignature": {
              "en": "Chaining methods causes `AttributeError: 'NoneType' object has no attribute 'strip'` or `'lower'`.",
              "vi": "Gọi chuỗi phương thức bị lỗi `AttributeError: 'NoneType' object has no attribute 'strip'` do nhận giá trị `None`."
            },
            "symptoms": {
              "en": [
                "Chaining methods causes `AttributeError: 'NoneType' object has no attribute 'strip'` or `'lower'`."
              ],
              "vi": [
                "Gọi chuỗi phương thức bị lỗi `AttributeError: 'NoneType' object has no attribute 'strip'` do nhận giá trị `None`."
              ]
            },
            "whyItHappens": {
              "en": "Python functions return `None` by default if no `return` statement is executed. In-place mutators like `.sort()`, `.append()`, `.extend()` deliberately return `None` to prevent accidental method chaining.",
              "vi": "Hàm trong Python mặc định trả về `None` nếu không có câu lệnh `return`. Các hàm sửa tại chỗ như `.sort()`, `.append()` chủ đích trả về `None` để tránh nhầm lẫn."
            },
            "correctFix": {
              "language": "python",
              "code": "# Fix 1: Use sorted() built-in which returns a NEW list\nsorted_nums = sorted(numbers)\n\n# Fix 2: Explicitly handle None and return guaranteed types\ndef clean_name(name: str | None) -> str:\n    if not name:\n        return \"\"\n    return name.strip()"
            },
            "preventionRules": {
              "en": [
                "Use `sorted()` when you need a returned sorted list; use `.sort()` only when modifying in-place",
                "Use strict type annotations (`-> str`) to let mypy catch missing return branches"
              ],
              "vi": [
                "Dùng `sorted()` khi cần danh sách mới; chỉ dùng `.sort()` khi muốn sửa danh sách tại chỗ",
                "Khai báo kiểu trả về (`-> str`) để mypy tự động phát hiện nhánh thiếu return"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "err-ch-9",
      "number": 9,
      "slug": "swallowed-exceptions-bare-except",
      "title": {
        "en": "9. Swallowed Exceptions & Silent Failures with Bare except:",
        "vi": "9. Nuốt Lỗi Âm Thầm Do Dùng Bare except:"
      },
      "summary": {
        "en": "Blanket `try...except:` blocks intercept system exit signals and hide critical logic bugs.",
        "vi": "Khối `try...except:` chung chung chặn nhầm tín hiệu dừng chương trình và giấu nhẹm các lỗi logic nguy hiểm."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-9-1",
          "title": {
            "en": "Diagnosis & Fix for Swallowed Exceptions",
            "vi": "Chẩn Đoán & Sửa Lỗi Nuốt Ngoại Lệ"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "def load_record():\n    try:\n        # Typo in variable name: undefined_variable!\n        result = undefined_variable + 10\n        return result\n    except:\n        # Silently suppresses NameError, KeyboardInterrupt, SystemExit!\n        pass\n\nprint(load_record())  # Returns None with zero warning!" },
            "errorSignature": {
              "en": "An application behaves incorrectly without printing any error trace, and pressing `Ctrl+C` in the terminal fails to terminate the process.",
              "vi": "Ứng dụng chạy sai kết quả nhưng không in ra bất kỳ dòng log lỗi nào, đồng thời bấm `Ctrl+C` trên terminal không thể tắt được tiến trình."
            },
            "symptoms": {
              "en": [
                "An application behaves incorrectly without printing any error trace, and pressing `Ctrl+C` in the terminal fails to terminate the process."
              ],
              "vi": [
                "Ứng dụng chạy sai kết quả nhưng không in ra bất kỳ dòng log lỗi nào, đồng thời bấm `Ctrl+C` trên terminal không thể tắt được tiến trình."
              ]
            },
            "whyItHappens": {
              "en": "`except:` without a class name catches `BaseException`, which includes `KeyboardInterrupt`, `SystemExit`, `GeneratorExit`, and fatal syntax/variable typos.",
              "vi": "Cú pháp `except:` không chỉ định lớp sẽ bắt cả `BaseException`, bao gồm `KeyboardInterrupt`, `SystemExit`, `GeneratorExit` và các lỗi chính tả biến nghiêm trọng."
            },
            "correctFix": {
              "language": "python",
              "code": "import logging\nlogger = logging.getLogger(__name__)\n\ndef load_record():\n    try:\n        return fetch_remote_record()\n    except (ConnectionError, TimeoutError) as err:\n        logger.error(f\"Network error loading record: {err}\", exc_info=True)\n        return None"
            },
            "preventionRules": {
              "en": [
                "Never write a bare `except: pass` block",
                "Catch `Exception` at highest application boundaries, and always log `exc_info=True`"
              ],
              "vi": [
                "Tuyệt đối không bao giờ viết khối `except: pass` không có kiểu lỗi",
                "Chỉ bắt `Exception` ở tầng cao nhất của ứng dụng và luôn bật `exc_info=True` khi ghi log"
              ]
            }
          }
        }
      ]
    },
    {
      "id": "err-ch-10",
      "number": 10,
      "slug": "blocking-io-in-asyncio",
      "title": {
        "en": "10. Blocking I/O Inside Asyncio Event Loops",
        "vi": "10. Gọi Lệnh I/O Đồng Bộ Gây Nghẽn Asyncio Event Loop"
      },
      "summary": {
        "en": "Calling synchronous blocking functions (`time.sleep()`, `requests.get()`) freezes the entire asynchronous event loop.",
        "vi": "Gọi các hàm I/O đồng bộ (`time.sleep()`, `requests.get()`) làm đóng băng toàn bộ event loop bất đồng bộ."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "err-sec-10-1",
          "title": {
            "en": "Diagnosis & Fix for Asyncio Blocking Calls",
            "vi": "Chẩn Đoán & Xử Lý Lệnh Chặn Trong Asyncio"
          },
          "errorDetails": {
            "minimalReproduction": { "language": "python", "code": "import asyncio\nimport time\nimport requests\n\nasync def handle_request():\n    # Blocking call freezes the ENTIRE event loop for all concurrent users!\n    time.sleep(2)\n    response = requests.get(\" }https://api.example.com/data\")\n    return response.json()" },
            "errorSignature": {
              "en": "A FastAPI or aiohttp web server handling concurrent requests suddenly experiences multi-second latency spikes across all connected clients.",
              "vi": "Web server FastAPI hoặc aiohttp đang xử lý đồng thời nhiều request bỗng nhiên bị trễ hàng chục giây trên toàn bộ các client kết nối."
            },
            "symptoms": {
              "en": [
                "A FastAPI or aiohttp web server handling concurrent requests suddenly experiences multi-second latency spikes across all connected clients."
              ],
              "vi": [
                "Web server FastAPI hoặc aiohttp đang xử lý đồng thời nhiều request bỗng nhiên bị trễ hàng chục giây trên toàn bộ các client kết nối."
              ]
            },
            "whyItHappens": {
              "en": "Asyncio is single-threaded cooperative multitasking. When a thread executes a blocking system call like `time.sleep` or standard socket I/O, the Python interpreter cannot yield control to other pending coroutines.",
              "vi": "Asyncio là cơ chế đa nhiệm hợp tác chạy trên một luồng duy nhất. Khi một lệnh đồng bộ như `time.sleep` hay socket I/O của thư viện requests chạy, toàn bộ tiến trình bị giữ chặt và không thể nhường quyền cho coroutine khác."
            },
            "correctFix": {
              "language": "python",
              "code": "import asyncio\nimport httpx\n\nasync def handle_request():\n    # Non-blocking async sleep\n    await asyncio.sleep(2)\n    \n    # Non-blocking async HTTP client\n    async with httpx.AsyncClient() as client:\n        response = await client.get(\"https://api.example.com/data\")\n        return response.json()\n\n# For CPU-bound legacy synchronous code, offload to thread pool:\n# result = await asyncio.to_thread(legacy_blocking_function, arg1)"
            },
            "preventionRules": {
              "en": [
                "Use `await asyncio.sleep()` instead of `time.sleep()` inside coroutines",
                "Use `httpx.AsyncClient` or `aiohttp` instead of `requests` in async services",
                "Use `asyncio.to_thread()` to run unavoidable blocking functions in background threads"
              ],
              "vi": [
                "Dùng `await asyncio.sleep()` thay cho `time.sleep()` trong coroutine",
                "Dùng `httpx.AsyncClient` hoặc `aiohttp` thay vì `requests` trong dịch vụ async",
                "Dùng `asyncio.to_thread()` để đẩy các hàm đồng bộ nặng sang worker thread chạy nền"
              ]
            }
          }
        }
      ]
    }
  ]
};
