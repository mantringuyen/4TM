import { Book } from '../../types';

export const DEFINITIONS_PILOT_BOOK: Book = {
  "id": "python-core-concepts-definitions",
  "slug": "python-core-concepts-definitions",
  "title": "Python Core Concepts — Definitions",
  "subtitle": {
    "en": "Authoritative Reference Models, Memory Layouts & Language Semantics",
    "vi": "Mô Hình Tham Chiếu Chuẩn Xác, Bố Cục Bộ Nhớ & Ngữ Nghĩa Ngôn Ngữ"
  },
  "bookType": "Definitions",
  "categoryId": "python",
  "subjectId": "programming",
  "author": "4TM Editorial Board",
  "role": "Language Semantics & Architecture Group",
  "level": "Foundational to Intermediate",
  "estimatedReadTime": "35 mins",
  "chaptersCount": 12,
  "publishedDate": "2025-02-20",
  "accentColor": "from-teal-500 to-emerald-700",
  "tags": [
    "Definitions",
    "Python Semantics",
    "Memory Model",
    "Reference",
    "Object Model"
  ],
  "description": {
    "en": "Rigorous technical definitions and conceptual mental models for the 12 core primitives of the Python runtime.",
    "vi": "Định nghĩa kỹ thuật chuẩn xác và mô hình tư duy trực quan cho 12 khái niệm cốt lõi nhất của môi trường thực thi Python."
  },
  "prerequisites": {
    "en": [
      "Basic Python syntax familiarity",
      "Understanding of variables and functions"
    ],
    "vi": [
      "Làm quen cơ bản với cú pháp Python",
      "Hiểu biết về biến và hàm"
    ]
  },
  "outcomes": {
    "en": [
      "Eliminate conceptual ambiguity surrounding Python object identity and reference binding",
      "Understand the exact mechanical contract of Iterables, Iterators, and Generators",
      "Confidently explain MRO, Descriptors, and Hashability in code reviews and interviews"
    ],
    "vi": [
      "Loại bỏ hoàn toàn sự mơ hồ về định danh đối tượng và liên kết tham chiếu trong Python",
      "Nắm vững quy ước hoạt động chính xác của Iterable, Iterator và Generator",
      "Tự tin giải thích MRO, Descriptor và Hashability trong code review và phỏng vấn kỹ thuật"
    ]
  },
  "chapters": [
    {
      "id": "def-ch-1",
      "number": 1,
      "slug": "name-binding",
      "title": {
        "en": "Name Binding (Variables as Labels)",
        "vi": "Name Binding (Biến Là Nhãn Tham Chiếu)"
      },
      "summary": {
        "en": "In Python, variables are names bound to objects in memory, not memory boxes holding values.",
        "vi": "Trong Python, biến là các nhãn tên được gắn vào đối tượng trong bộ nhớ, không phải là các ô nhớ chứa giá trị."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-1-1",
          "title": {
            "en": "Name Binding Mechanics & Memory Model",
            "vi": "Cơ Chế Name Binding & Mô Hình Bộ Nhớ"
          },
          "definitionDetails": {
            "term": {
              "en": "Name Binding",
              "vi": "Liên Kết Tên (Name Binding)"
            },
            "formalDefinition": {
              "en": "Name binding is the association of an identifier (name) with an object in a specific namespace (symbol table). In Python, assignment statements (`target = expression`) do not copy data; they evaluate the right-hand side expression to produce an object in heap memory and bind the left-hand identifier as a reference pointer to that object.",
              "vi": "Name binding là việc liên kết một danh định (tên biến) với một đối tượng trong một namespace (bảng ký hiệu) cụ thể. Trong Python, câu lệnh gán (`tên = biểu_thức`) không sao chép dữ liệu; nó tính toán biểu thức bên phải để tạo ra đối tượng trên heap và gắn danh định bên trái thành một con trỏ tham chiếu đến đối tượng đó."
            },
            "mentalModel": {
              "en": "Think of objects in Python as balloons floating in a room (heap memory). Variable names are sticky gift tags tied to the balloons with strings. Multiple tags can be tied to the exact same balloon.",
              "vi": "Hãy hình dung các đối tượng trong Python như những quả bóng bay trong phòng (bộ nhớ heap). Tên biến là các nhãn dán có dây buộc vào quả bóng. Nhiều nhãn tên có thể cùng buộc vào đúng một quả bóng duy nhất."
            },
            "whyItMatters": {
              "en": "Understanding name binding prevents severe bugs when assigning mutable objects (`b = a`) where modifying `b` inadvertently mutates `a`, because both names point to the identical heap structure.",
              "vi": "Hiểu rõ name binding giúp tránh các lỗi nghiêm trọng khi gán đối tượng có thể thay đổi (`b = a`), khi đó việc sửa đổi `b` sẽ vô tình làm biến đổi cả `a` do cả hai tên cùng trỏ vào một thực thể duy nhất."
            },
            "minimalExample": {
              "language": "python",
              "filename": "name_binding.py",
              "explanation": {
                "en": "Demonstrating multiple names bound to the same underlying list object.",
                "vi": "Minh họa nhiều nhãn tên cùng liên kết tới một đối tượng danh sách trong bộ nhớ."
              },
              "code": "a = [1, 2, 3]\nb = a  # b is bound to the exact same list as a\nb.append(4)\n\nprint(a)  # [1, 2, 3, 4] -> a is mutated because a and b reference the same object\nprint(a is b)  # True (identical memory address)"
            },
            "commonMisconception": {
              "en": "Many programmers coming from C/C++ assume `a = 5` allocates 4 bytes of stack space named \"a\" containing the binary integer 5. In Python, an integer object `5` is created on the heap, and name \"a\" is added to the local namespace dictionary pointing to that object.",
              "vi": "Nhiều lập trình viên từ C/C++ quen nghĩ rằng `a = 5` sẽ cấp phát 4 byte stack có tên \"a\" chứa số 5. Trong Python, một đối tượng `5` được tạo trên heap, và tên \"a\" được thêm vào từ điển namespace cục bộ trỏ tới đối tượng đó."
            },
            "quickReference": {
              "en": [
                "`target = value` evaluates value first, then maps target name in the current scope dictionary `locals()` to the resulting PyObject pointer."
              ],
              "vi": [
                "`target = value` tính toán value trước, sau đó ánh xạ tên target trong từ điển scope `locals()` vào con trỏ PyObject tương ứng."
              ]
            }
          },
          "diagram": {
            "title": {
              "en": "Name Binding Memory Diagram",
              "vi": "Sơ Đồ Bộ Nhớ Của Cơ Chế Name Binding"
            },
            "steps": [
              {
                "number": 1,
                "label": {
                  "en": "Heap Allocation",
                  "vi": "Cấp Phát Heap"
                },
                "description": {
                  "en": "Expression [1, 2, 3] creates PyListObject at memory address 0x7FA1.",
                  "vi": "Biểu thức [1, 2, 3] tạo PyListObject tại địa chỉ bộ nhớ 0x7FA1."
                }
              },
              {
                "number": 2,
                "label": {
                  "en": "Binding \"a\"",
                  "vi": "Gắn Nhãn \"a\""
                },
                "description": {
                  "en": "Identifier \"a\" in locals() dictionary is set to pointer 0x7FA1 (refcount=1).",
                  "vi": "Danh định \"a\" trong locals() trỏ vào con trỏ 0x7FA1 (refcount=1)."
                }
              },
              {
                "number": 3,
                "label": {
                  "en": "Binding \"b\"",
                  "vi": "Gắn Nhãn \"b\""
                },
                "description": {
                  "en": "Statement b = a creates identifier \"b\" pointing to 0x7FA1 (refcount=2).",
                  "vi": "Câu lệnh b = a tạo danh định \"b\" trỏ tiếp vào 0x7FA1 (refcount=2)."
                }
              }
            ]
          }
        }
      ]
    },
    {
      "id": "def-ch-2",
      "number": 2,
      "slug": "object-identity",
      "title": {
        "en": "Object Identity & Value Equality (`is` vs `==`)",
        "vi": "Định Danh Đối Tượng & Bằng Nhau Về Giá Trị (`is` vs `==`)"
      },
      "summary": {
        "en": "Identity compares memory pointers (`id(a) == id(b)`), whereas equality checks value equivalency (`a.__eq__(b)`).",
        "vi": "Định danh so sánh địa chỉ bộ nhớ (`id(a) == id(b)`), trong khi so sánh bằng kiểm tra tính tương đương về giá trị (`a.__eq__(b)`)."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-2-1",
          "title": {
            "en": "Object Identity Specification",
            "vi": "Đặc Tả Kỹ Thuật Về Định Danh Đối Tượng"
          },
          "definitionDetails": {
            "term": {
              "en": "Object Identity",
              "vi": "Định Danh Đối Tượng (Object Identity)"
            },
            "formalDefinition": {
              "en": "Every Python object has an identity, a type, and a value. An object’s identity never changes once created; it represents the unique memory address of the object in CPython and is retrieved via `id(x)`. The `is` operator tests identity (`id(a) == id(b)`), while the `==` operator invokes the `__eq__()` dunder method to test value equivalence.",
              "vi": "Mọi đối tượng Python đều có một định danh (identity), một kiểu (type), và một giá trị (value). Định danh không bao giờ thay đổi sau khi tạo; trong CPython nó là địa chỉ bộ nhớ duy nhất và được lấy qua hàm `id(x)`. Toán tử `is` kiểm tra định danh (`id(a) == id(b)`), trong khi toán tử `==` gọi phương thức `__eq__()` để so sánh giá trị."
            },
            "mentalModel": {
              "en": "Two people having the exact same name, age, and height are \"equal\" (`==`), but they are not the \"same person\" (`is`). Identity is biological fingerprint/DNA; equality is matching passport data.",
              "vi": "Hai người có cùng họ tên, tuổi và chiều cao là \"bằng nhau\" (`==`), nhưng họ không phải là \"cùng một người\" (`is`). Identity là vân tay/ADN; equality là thông tin trùng khớp trên giấy tờ."
            },
            "whyItMatters": {
              "en": "Using `is` for value comparisons (e.g. `if status is \"success\":`) creates brittle bugs that break unpredictably across different Python versions or compiler optimizations. Use `is` solely for singletons like `None`, `True`, and `False`.",
              "vi": "Dùng `is` để so sánh giá trị (ví dụ `if status is \"success\":`) gây ra các lỗi ngầm khó đoán do phụ thuộc vào tối ưu hóa của trình thông dịch. Chỉ dùng `is` cho các singleton như `None`, `True`, và `False`."
            },
            "minimalExample": {
              "language": "python",
              "filename": "identity_vs_equality.py",
              "explanation": {
                "en": "Comparing two distinct lists with identical values.",
                "vi": "So sánh hai danh sách độc lập có cùng giá trị."
              },
              "code": "x = [10, 20, 30]\ny = [10, 20, 30]\n\nprint(x == y)  # True (equal values)\nprint(x is y)  # False (two distinct memory locations)\nprint(id(x) != id(y))  # True"
            },
            "commonMisconception": {
              "en": "Because CPython interns small integers (-5 to 256) and small ASCII strings, `a = 250; b = 250; a is b` evaluates to `True`. Developers mistakenly conclude `is` works for numbers, but `a = 1000; b = 1000; a is b` evaluates to `False`.",
              "vi": "Do CPython lưu cache sẵn các số nguyên nhỏ (-5 đến 256) và chuỗi ASCII ngắn, câu lệnh `a = 250; b = 250; a is b` trả về `True`. Lập trình viên dễ lầm tưởng `is` dùng được cho số học, nhưng với `a = 1000; b = 1000; a is b` sẽ trả về `False`."
            },
            "quickReference": {
              "en": [
                "Use `is` ONLY for singleton checks: `x is None` or `x is sentinel`. For all value inspections, always use `==`."
              ],
              "vi": [
                "Chỉ dùng `is` cho singleton: `x is None` hoặc `x is sentinel`. Với mọi so sánh giá trị dữ liệu, luôn dùng `==`."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-3",
      "number": 3,
      "slug": "mutability",
      "title": {
        "en": "Mutability & Immutability",
        "vi": "Tính Khả Biến & Bất Biến (Mutability)"
      },
      "summary": {
        "en": "Mutable objects allow in-place state modification; immutable objects guarantee constant internal state post-creation.",
        "vi": "Đối tượng khả biến cho phép sửa đổi dữ liệu tại chỗ; đối tượng bất biến đảm bảo trạng thái không đổi sau khi tạo."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-3-1",
          "title": {
            "en": "Mutability Classification & Aliasing",
            "vi": "Phân Loại Khả Biến & Hiện Tượng Đồng Danh"
          },
          "definitionDetails": {
            "term": {
              "en": "Mutability",
              "vi": "Tính Khả Biến (Mutability)"
            },
            "formalDefinition": {
              "en": "Mutability determines whether an object’s value can change after instantiation without creating a new object in memory. Mutable types (`list`, `dict`, `set`, `bytearray`) support in-place mutation. Immutable types (`int`, `float`, `str`, `tuple`, `frozenset`, `bytes`) cannot have their internal values modified.",
              "vi": "Tính khả biến xác định liệu giá trị của một đối tượng có thể bị thay đổi sau khi khởi tạo mà không cần tạo đối tượng mới hay không. Kiểu khả biến (`list`, `dict`, `set`, `bytearray`) hỗ trợ sửa đổi tại chỗ. Kiểu bất biến (`int`, `float`, `str`, `tuple`, `frozenset`, `bytes`) không thể sửa đổi giá trị nội tại."
            },
            "mentalModel": {
              "en": "An immutable object is a sealed glass display case: you can inspect what is inside, but you cannot change it. A mutable object is an open cardboard box: you can add, remove, and replace items inside anytime.",
              "vi": "Đối tượng bất biến như một hộp kính niêm phong: bạn có thể nhìn thấy nội dung bên trong nhưng không thể sửa. Đối tượng khả biến như chiếc hộp mở: bạn có thể thêm, bớt và thay thế đồ vật bên trong bất cứ lúc nào."
            },
            "whyItMatters": {
              "en": "Immutable objects are thread-safe for reading and can be safely used as dictionary keys (if hashable). Passing mutable objects across functions can cause unexpected side-effects if callee functions modify them.",
              "vi": "Đối tượng bất biến an toàn khi đọc đa luồng và dùng được làm key trong từ điển (nếu hashable). Truyền đối tượng khả biến qua các hàm có thể tạo ra tác dụng phụ ngoài ý muốn nếu hàm nhận thay đổi nó."
            },
            "minimalExample": {
              "language": "python",
              "filename": "mutability.py",
              "explanation": {
                "en": "Contrasting in-place mutation of a list with rebinding of a string.",
                "vi": "So sánh việc sửa đổi tại chỗ của list với việc tái gán chuỗi bất biến."
              },
              "code": "# Mutable: List in-place modification\nnumbers = [1, 2]\noriginal_id = id(numbers)\nnumbers.append(3)\nprint(id(numbers) == original_id)  # True (same object)\n\n# Immutable: String concatenation creates a NEW object\ntext = \"hello\"\nstr_id = id(text)\ntext += \" world\"\nprint(id(text) == str_id)  # False (new string allocated)"
            },
            "commonMisconception": {
              "en": "A common misconception is that a tuple is always completely immutable. While the tuple container itself cannot be resized or have its reference slots replaced, if a tuple contains a mutable object (like a list: `t = ([1, 2], 3)`), the inner list can be mutated.",
              "vi": "Một quan niệm sai lầm phổ biến là tuple luôn hoàn toàn bất biến. Mặc dù các vị trí tham chiếu của tuple không thể thay đổi, nhưng nếu tuple chứa một đối tượng khả biến (như list: `t = ([1, 2], 3)`), danh sách con bên trong vẫn có thể bị sửa đổi."
            },
            "quickReference": {
              "en": [
                "Immutable: int, float, str, bytes, tuple, frozenset. Mutable: list, dict, set, bytearray, user-defined class instances by default."
              ],
              "vi": [
                "Bất biến: int, float, str, bytes, tuple, frozenset. Khả biến: list, dict, set, bytearray, instance của class tự định nghĩa."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-4",
      "number": 4,
      "slug": "iterable",
      "title": {
        "en": "Iterable Protocol",
        "vi": "Giao Thức Khả Lặp (Iterable Protocol)"
      },
      "summary": {
        "en": "An object capable of returning its members one at a time via `__iter__()` or `__getitem__()`.",
        "vi": "Đối tượng có khả năng trả về từng phần tử một lần thông qua phương thức `__iter__()` hoặc `__getitem__()`."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-4-1",
          "title": {
            "en": "Iterable Interface Specification",
            "vi": "Đặc Tả Giao Diện Iterable"
          },
          "definitionDetails": {
            "term": {
              "en": "Iterable",
              "vi": "Đối Tượng Khả Lặp (Iterable)"
            },
            "formalDefinition": {
              "en": "An iterable is any Python object that implements the `__iter__()` method (returning an iterator) or the legacy sequence protocol `__getitem__()` method taking integer indices starting from 0. An iterable can be passed to `iter(x)` to produce a fresh iterator.",
              "vi": "Iterable là bất kỳ đối tượng Python nào hiện thực phương thức `__iter__()` (trả về một iterator) hoặc phương thức giao thức chuỗi cũ `__getitem__()` nhận chỉ số nguyên từ 0. Bất kỳ iterable nào cũng có thể truyền vào hàm `iter(x)` để tạo ra một iterator mới."
            },
            "mentalModel": {
              "en": "An iterable is a book on a shelf. The book contains pages (data), but the book itself does not remember which page you are currently reading. To read it, you need a reader with a bookmark (an iterator).",
              "vi": "Iterable như một cuốn sách trên giá. Cuốn sách chứa các trang (dữ liệu), nhưng bản thân cuốn sách không nhớ bạn đang đọc tới trang nào. Để đọc, bạn cần một người đọc có kẹp sách (chính là iterator)."
            },
            "whyItMatters": {
              "en": "The `for ... in ...` loop, comprehensions, unpacking (`*rest`), and functions like `sum()`, `min()`, and `sorted()` operate polymorphically on any object satisfying the Iterable contract.",
              "vi": "Vòng lặp `for ... in ...`, comprehension, giải nén (`*rest`), và các hàm như `sum()`, `min()`, `sorted()` đều hoạt động đa hình trên bất kỳ đối tượng nào tuân thủ hợp đồng Iterable."
            },
            "minimalExample": {
              "language": "python",
              "filename": "iterable_check.py",
              "explanation": {
                "en": "Checking and obtaining an iterator from an iterable container.",
                "vi": "Kiểm tra và lấy iterator từ một container iterable."
              },
              "code": "from collections.abc import Iterable\n\ndata = [10, 20, 30]\nprint(isinstance(data, Iterable))  # True\n\n# iter() extracts a new iterator instance\nit = iter(data)\nprint(type(it))  # <class 'list_iterator'>"
            },
            "commonMisconception": {
              "en": "Many developers confuse iterables with iterators. An iterable can typically be iterated over multiple times (e.g. running multiple for loops over a list), whereas an iterator is stateful and gets consumed after one full pass.",
              "vi": "Nhiều người nhầm lẫn giữa iterable và iterator. Một iterable thường có thể lặp qua nhiều lần (như duyệt vòng for nhiều lần trên list), trong khi iterator có lưu trạng thái và sẽ cạn kiệt sau một lượt duyệt."
            },
            "quickReference": {
              "en": [
                "An object is iterable if `iter(obj)` succeeds without raising `TypeError: '...' object is not iterable`."
              ],
              "vi": [
                "Một đối tượng là iterable nếu lệnh `iter(obj)` thực thi thành công mà không báo lỗi `TypeError`."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-5",
      "number": 5,
      "slug": "iterator",
      "title": {
        "en": "Iterator Protocol",
        "vi": "Giao Thức Bộ Lặp (Iterator Protocol)"
      },
      "summary": {
        "en": "A stateful stream object that produces values on demand via `__next__()` and raises `StopIteration` when exhausted.",
        "vi": "Đối tượng luồng có trạng thái trả về từng giá trị theo yêu cầu qua `__next__()` và báo `StopIteration` khi kết thúc."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-5-1",
          "title": {
            "en": "Iterator Specification & State Consumption",
            "vi": "Đặc Tả Iterator & Cơ Chế Tiêu Thụ Dữ Liệu"
          },
          "definitionDetails": {
            "term": {
              "en": "Iterator",
              "vi": "Bộ Lặp (Iterator)"
            },
            "formalDefinition": {
              "en": "An iterator is an object representing a stream of data that implements the Iterator Protocol: 1) `__next__()` returns the next item in the stream, or raises `StopIteration` when no further items remain; 2) `__iter__()` returns `self` (enabling iterators to be used wherever iterables are accepted).",
              "vi": "Iterator là đối tượng đại diện cho một luồng dữ liệu hiện thực Giao thức Iterator: 1) `__next__()` trả về phần tử kế tiếp, hoặc ném ngoại lệ `StopIteration` khi hết dữ liệu; 2) `__iter__()` trả về chính nó `self` (cho phép dùng iterator ở bất kỳ đâu chấp nhận iterable)."
            },
            "mentalModel": {
              "en": "An iterator is a conveyor belt with a dispenser lever. Each time you pull the lever (`next()`), one item drops out. Once the belt is empty, pulling the lever triggers an \"Empty\" alarm (`StopIteration`).",
              "vi": "Iterator như một băng chuyền có cần gạt. Mỗi lần gạt cần (`next()`), một món đồ rơi ra. Khi băng chuyền hết hàng, việc gạt cần sẽ kích hoạt chuông báo hết hàng (`StopIteration`)."
            },
            "whyItMatters": {
              "en": "Iterators enable lazy evaluation and stream processing of gigabyte-scale datasets in constant `O(1)` memory without loading everything into RAM at once.",
              "vi": "Iterator cho phép tính toán lười (lazy evaluation) và xử lý luồng dữ liệu dung lượng lớn với bộ nhớ cố định `O(1)` mà không cần nạp toàn bộ vào RAM."
            },
            "minimalExample": {
              "language": "python",
              "filename": "iterator_protocol.py",
              "explanation": {
                "en": "Manual step-by-step iteration using the next() built-in.",
                "vi": "Duyệt thủ công từng bước sử dụng hàm built-in next()."
              },
              "code": "numbers = [1, 2]\nit = iter(numbers)\n\nprint(next(it))  # 1\nprint(next(it))  # 2\n\ntry:\n    next(it)\nexcept StopIteration:\n    print(\"Stream exhausted successfully!\")"
            },
            "commonMisconception": {
              "en": "Iterators cannot be \"reset\" or \"rewound\". Once an iterator raises `StopIteration`, calling `next()` on it will continue to raise `StopIteration`. To restart iteration, you must construct a new iterator from the source iterable.",
              "vi": "Iterator không thể \"reset\" hay quay ngược lại. Khi iterator đã ném `StopIteration`, gọi tiếp `next()` sẽ tiếp tục báo lỗi. Để lặp lại, bạn phải tạo một iterator mới từ iterable ban đầu."
            },
            "quickReference": {
              "en": [
                "Must implement `__next__()` (returning values or `StopIteration`) and `__iter__()` (returning `self`)."
              ],
              "vi": [
                "Bắt buộc phải có `__next__()` (trả về giá trị hoặc `StopIteration`) và `__iter__()` (trả về `self`)."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-6",
      "number": 6,
      "slug": "generator",
      "title": {
        "en": "Generator Functions & Expressions",
        "vi": "Hàm Generator & Biểu Thức Sinh (Generators)"
      },
      "summary": {
        "en": "Functions containing `yield` that suspend execution and resume on demand to produce an iterator.",
        "vi": "Hàm chứa từ khóa `yield` có thể tạm dừng thực thi và tiếp tục khi có yêu cầu để tạo ra một iterator."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-6-1",
          "title": {
            "en": "Generator Execution Mechanics",
            "vi": "Cơ Chế Thực Thi Của Generator"
          },
          "definitionDetails": {
            "term": {
              "en": "Generator",
              "vi": "Bộ Sinh (Generator)"
            },
            "formalDefinition": {
              "en": "A generator is a specialized iterator produced by a generator function (a function containing one or more `yield` statements) or a generator expression `(x for x in seq)`. When called, a generator function does not run to completion; it returns a generator object. When `next()` is called, execution advances until the next `yield` expression, yielding a value and freezing the execution frame state.",
              "vi": "Generator là một loại iterator đặc biệt được sinh ra từ hàm generator (hàm chứa từ khóa `yield`) hoặc biểu thức generator `(x for x in seq)`. Khi được gọi, hàm generator không chạy hết ngay mà trả về một đối tượng generator. Khi gọi `next()`, hàm chạy đến câu lệnh `yield` kế tiếp, trả về giá trị và đóng băng frame thực thi."
            },
            "mentalModel": {
              "en": "A generator is a video player on pause. Calling `next()` hits \"Play\" until the next scene transition (`yield`), which automatically pauses the movie and saves the exact playback position and actor states.",
              "vi": "Generator như một đầu phát video đang tạm dừng. Gọi `next()` giống như bấm \"Play\" cho tới khi gặp cảnh tiếp theo (`yield`), đầu phát sẽ tự động bấm \"Pause\" và lưu lại chính xác vị trí phát."
            },
            "whyItMatters": {
              "en": "Generators simplify writing custom iterators from dozens of boilerplate lines down to clean sequential code with `yield`. They form the building blocks of data pipelines and coroutines.",
              "vi": "Generator giúp việc tạo iterator tùy biến từ hàng chục dòng code mẫu trở nên ngắn gọn với `yield`. Chúng là nền tảng của data pipeline và coroutine."
            },
            "minimalExample": {
              "language": "python",
              "filename": "generator_yield.py",
              "explanation": {
                "en": "A simple generator producing Fibonacci numbers on demand.",
                "vi": "Hàm generator sinh dãy số Fibonacci theo yêu cầu."
              },
              "code": "def count_up_to(max_val):\n    count = 1\n    while count <= max_val:\n        yield count\n        count += 1\n\ngen = count_up_to(2)\nprint(next(gen))  # 1 (pauses at yield)\nprint(next(gen))  # 2 (resumes and pauses at next yield)"
            },
            "commonMisconception": {
              "en": "Calling a generator function `g = my_gen()` does NOT run the first line of code inside the function body. The code only begins executing when the first `next(g)` or `for item in g:` is triggered.",
              "vi": "Gọi hàm generator `g = my_gen()` KHÔNG thực thi dòng code đầu tiên trong thân hàm. Code chỉ bắt đầu chạy khi lệnh `next(g)` hoặc vòng lặp `for item in g:` đầu tiên được kích hoạt."
            },
            "quickReference": {
              "en": [
                "Any function with `yield` returns a generator object. Frame locals and instruction pointer are saved across yields."
              ],
              "vi": [
                "Bất kỳ hàm nào có `yield` đều trả về một generator. Biến cục bộ và con trỏ lệnh được lưu giữ qua các lần yield."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-7",
      "number": 7,
      "slug": "context-manager",
      "title": {
        "en": "Context Manager Protocol (`with` statement)",
        "vi": "Giao Thức Quản Lý Ngữ Cảnh (`with` statement)"
      },
      "summary": {
        "en": "A protocol guaranteeing resource allocation in `__enter__()` and deterministic cleanup in `__exit__()`.",
        "vi": "Giao thức đảm bảo cấp phát tài nguyên trong `__enter__()` và giải phóng chắc chắn trong `__exit__()`."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-7-1",
          "title": {
            "en": "Context Manager Mechanics",
            "vi": "Cơ Chế Hoạt Động Của Context Manager"
          },
          "definitionDetails": {
            "term": {
              "en": "Context Manager",
              "vi": "Bộ Quản Lý Ngữ Cảnh (Context Manager)"
            },
            "formalDefinition": {
              "en": "A context manager is an object that controls the runtime context of a code block enclosed in a `with` statement. It implements: 1) `__enter__()`, executed before block entry; 2) `__exit__(exc_type, exc_val, exc_tb)`, executed upon exiting the block, even if an unhandled exception occurred.",
              "vi": "Context manager là đối tượng quản lý ngữ cảnh thực thi của khối lệnh bên trong câu lệnh `with`. Nó hiện thực: 1) `__enter__()`, chạy trước khi vào khối lệnh; 2) `__exit__(exc_type, exc_val, exc_tb)`, luôn chạy khi thoát khỏi khối lệnh, kể cả khi có ngoại lệ xảy ra."
            },
            "mentalModel": {
              "en": "A context manager is an automatic door with a security guard. When you enter, the guard opens the door and gives you a pass (`__enter__`). When you leave, the guard always locks the door and cleans up (`__exit__`), even if you trip and fall inside.",
              "vi": "Context manager như cửa tự động có bảo vệ. Khi bạn bước vào, bảo vệ mở cửa và cấp thẻ (`__enter__`). Khi bạn rời đi, bảo vệ luôn khóa cửa và dọn dẹp (`__exit__`), dù bạn có bị vấp ngã bên trong."
            },
            "whyItMatters": {
              "en": "Context managers eliminate resource leaks (file descriptors, database connections, locks) and replace verbose `try...finally` boilerplate with clean declarative syntax.",
              "vi": "Context manager loại bỏ triệt để rò rỉ tài nguyên (file descriptor, kết nối database, lock) và thay thế cấu trúc `try...finally` rườm rà bằng cú pháp tường minh."
            },
            "minimalExample": {
              "language": "python",
              "filename": "context_manager.py",
              "explanation": {
                "en": "Building a custom timer context manager.",
                "vi": "Xây dựng context manager đo thời gian thực thi."
              },
              "code": "import time\n\nclass ExecutionTimer:\n    def __enter__(self):\n        self.start = time.perf_counter()\n        return self\n\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        duration = time.perf_counter() - self.start\n        print(f\"Elapsed: {duration:.4f}s\")\n        return False  # Propagate any exception\n\nwith ExecutionTimer():\n    sum(range(1_000_000))"
            },
            "commonMisconception": {
              "en": "Returning `True` from `__exit__` suppresses any exception that occurred inside the `with` block. Beginners often accidentally suppress real bugs by returning a truthy value without understanding this rule.",
              "vi": "Trả về `True` từ `__exit__` sẽ triệt tiêu mọi ngoại lệ xảy ra trong khối `with`. Người mới thường vô tình nuốt lỗi thật do trả về giá trị truthy mà không hiểu rõ quy tắc này."
            },
            "quickReference": {
              "en": [
                "`__enter__()` returns target for `as var`. `__exit__()` handles exception teardown and returns `True` to suppress or `False` to propagate."
              ],
              "vi": [
                "`__enter__()` trả về giá trị cho `as var`. `__exit__()` dọn dẹp tài nguyên và trả về `True` để nuốt lỗi hoặc `False` để báo lỗi ra ngoài."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-8",
      "number": 8,
      "slug": "descriptor",
      "title": {
        "en": "Descriptor Protocol",
        "vi": "Giao Thức Descriptor (Descriptor Protocol)"
      },
      "summary": {
        "en": "Objects defining attribute access behavior via `__get__()`, `__set__()`, or `__delete__()`.",
        "vi": "Đối tượng định nghĩa hành vi truy cập thuộc tính thông qua `__get__()`, `__set__()`, hoặc `__delete__()`."
      },
      "readTimeMinutes": 4,
      "sections": [
        {
          "id": "def-sec-8-1",
          "title": {
            "en": "Descriptor Mechanics & Attribute Lookup",
            "vi": "Cơ Chế Descriptor & Tra Cứu Thuộc Tính"
          },
          "definitionDetails": {
            "term": {
              "en": "Descriptor",
              "vi": "Descriptor (Giao Thức Thuộc Tính)"
            },
            "formalDefinition": {
              "en": "A descriptor is an object attribute whose access behavior is overridden by methods in the descriptor protocol: `__get__(self, obj, type=None)`, `__set__(self, obj, value)`, or `__delete__(self, obj)`. If an object defines at least one of these methods, it is a descriptor. Descriptors power `@property`, `@classmethod`, `@staticmethod`, and ORM column mapping.",
              "vi": "Descriptor là một thuộc tính đối tượng có hành vi truy cập được ghi đè bởi các phương thức trong giao thức descriptor: `__get__(self, obj, type=None)`, `__set__(self, obj, value)`, hoặc `__delete__(self, obj)`. Nếu một đối tượng định nghĩa ít nhất một trong các phương thức này, nó là một descriptor. Descriptor là nền tảng đứng sau `@property`, `@classmethod`, `@staticmethod` và ORM."
            },
            "mentalModel": {
              "en": "A descriptor is a smart sensor mounted on a doorway. Whenever someone tries to read (`__get__`) or place an item (`__set__`) in a room, the sensor intercepts the action, validates it, logs it, or computes a dynamic value.",
              "vi": "Descriptor như một cảm biến thông minh gắn ở cửa. Bất cứ khi nào có ai cố đọc (`__get__`) hoặc đặt đồ (`__set__`) vào phòng, cảm biến sẽ chặn lại để kiểm tra tính hợp lệ, ghi log hoặc tính toán giá trị động."
            },
            "whyItMatters": {
              "en": "Descriptors are the core mechanism of Python object-oriented plumbing. Standard methods are simply descriptors that bind functions to instances via `__get__()`.",
              "vi": "Descriptor là cơ chế cốt lõi trong lập trình hướng đối tượng của Python. Các method thông thường thực chất chỉ là descriptor gắn kết hàm với instance thông qua `__get__()`."
            },
            "minimalExample": {
              "language": "python",
              "filename": "descriptor_validator.py",
              "explanation": {
                "en": "A descriptor validating that an assigned integer is non-negative.",
                "vi": "Descriptor kiểm tra số nguyên gán vào phải không âm."
              },
              "code": "class NonNegative:\n    def __set_name__(self, owner, name):\n        self.name = name\n\n    def __get__(self, instance, owner):\n        if instance is None:\n            return self\n        return instance.__dict__.get(self.name, 0)\n\n    def __set__(self, instance, value):\n        if value < 0:\n            raise ValueError(f\"{self.name} cannot be negative!\")\n        instance.__dict__[self.name] = value\n\nclass BankAccount:\n    balance = NonNegative()"
            },
            "commonMisconception": {
              "en": "Descriptors must be instantiated as class attributes on the class definition, NOT inside `__init__` on instance attributes. If assigned to an instance attribute, Python’s `__getattribute__` will not invoke the descriptor protocol.",
              "vi": "Descriptor phải được gán làm thuộc tính ở cấp Class, KHÔNG PHẢI trong `__init__` trên instance. Nếu gán trên instance, phương thức `__getattribute__` của Python sẽ không kích hoạt giao thức descriptor."
            },
            "quickReference": {
              "en": [
                "Data Descriptor implements `__set__` or `__delete__` (takes precedence over instance dictionary). Non-Data Descriptor implements only `__get__`."
              ],
              "vi": [
                "Data Descriptor hiện thực `__set__` hoặc `__delete__` (ưu tiên hơn từ điển instance). Non-Data Descriptor chỉ có `__get__`."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-9",
      "number": 9,
      "slug": "namespace",
      "title": {
        "en": "Namespaces & LEGB Scope Resolution",
        "vi": "Không Gian Tên & Quy Tắc Phạm Vi LEGB (Namespaces)"
      },
      "summary": {
        "en": "A mapping of names to objects evaluated hierarchically: Local → Enclosing → Global → Built-in.",
        "vi": "Bảng ánh xạ tên biến tới đối tượng được tra cứu theo thứ tự phân cấp: Local → Enclosing → Global → Built-in."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-9-1",
          "title": {
            "en": "LEGB Scope Rules & Name Lookup",
            "vi": "Quy Tắc LEGB & Thứ Tự Tra Cứu Tên Biến"
          },
          "definitionDetails": {
            "term": {
              "en": "Namespace & LEGB Scope",
              "vi": "Không Gian Tên & Phạm Vi LEGB"
            },
            "formalDefinition": {
              "en": "A namespace is a dictionary mapping symbolic names to Python object references. When resolving a variable name, Python inspects four nested scopes in strict order (LEGB): 1) Local (function/comprehension locals), 2) Enclosing (enclosing nested functions / closures), 3) Global (current module namespace), 4) Built-in (`builtins` module).",
              "vi": "Namespace là một từ điển ánh xạ các tên ký hiệu vào tham chiếu đối tượng Python. Khi tra cứu một biến, Python kiểm tra 4 phạm vi lồng nhau theo thứ tự nghiêm ngặt (LEGB): 1) Local (biến cục bộ của hàm), 2) Enclosing (hàm bao ngoài / closure), 3) Global (module hiện tại), 4) Built-in (module builtins hệ thống)."
            },
            "mentalModel": {
              "en": "LEGB is like searching for a tool: First check your pocket (Local). If not there, check your desk drawer (Enclosing). If not there, check the garage (Global). Finally, check the hardware store (Built-in).",
              "vi": "LEGB giống như tìm đồ nghề: Đầu tiên tìm trong túi quần (Local). Nếu không có, tìm trong ngăn kéo bàn (Enclosing). Nếu không có, tìm trong kho gara (Global). Cuối cùng mới ra tiệm tạp hóa (Built-in)."
            },
            "whyItMatters": {
              "en": "Understanding LEGB explains why assigning to a variable inside a function marks it as Local across the entire function body, leading to `UnboundLocalError` if referenced before assignment.",
              "vi": "Hiểu rõ LEGB giải thích tại sao phép gán biến bên trong hàm sẽ biến biến đó thành Local cho toàn bộ hàm, dẫn đến lỗi `UnboundLocalError` nếu dùng trước khi gán."
            },
            "minimalExample": {
              "language": "python",
              "filename": "legb_scope.py",
              "explanation": {
                "en": "Demonstrating closure variable resolution from Enclosing scope.",
                "vi": "Minh họa việc tra cứu biến trong scope Enclosing của closure."
              },
              "code": "x = \"GLOBAL\"\n\ndef outer():\n    x = \"ENCLOSING\"\n    def inner():\n        # Resolves to Enclosing scope 'x'\n        return f\"Found: {x}\"\n    return inner()\n\nprint(outer())  # Found: ENCLOSING"
            },
            "commonMisconception": {
              "en": "`global` and `nonlocal` keywords do not create new variables; they instruct the compiler to bind assignments to the module global scope or nearest enclosing closure scope instead of creating a local variable.",
              "vi": "Từ khóa `global` và `nonlocal` không tạo ra biến mới; chúng chỉ thị cho trình biên dịch chuyển hướng phép gán về scope global của module hoặc closure gần nhất thay vì tạo biến local."
            },
            "quickReference": {
              "en": [
                "Lookup order: Local -> Enclosing -> Global -> Built-in. If variable is assigned anywhere in function, it is treated as Local by default."
              ],
              "vi": [
                "Thứ tự tra cứu: Local -> Enclosing -> Global -> Built-in. Nếu biến có phép gán ở bất kỳ đâu trong hàm, mặc định nó là Local."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-10",
      "number": 10,
      "slug": "mro",
      "title": {
        "en": "Method Resolution Order (MRO & C3 Linearization)",
        "vi": "Thứ Tự Phân Giải Phương Thức (MRO & Thuật Toán C3)"
      },
      "summary": {
        "en": "The deterministic sequence of classes inspected when looking up methods during multiple inheritance.",
        "vi": "Trình tự xác định các lớp được kiểm tra khi tìm kiếm phương thức trong đa kế thừa."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-10-1",
          "title": {
            "en": "C3 Linearization & Cooperative Multiple Inheritance",
            "vi": "Thuật Toán Tuyến Tính Hóa C3 & Kế Thừa Hợp Tác"
          },
          "definitionDetails": {
            "term": {
              "en": "Method Resolution Order (MRO)",
              "vi": "Thứ Tự Phân Giải Phương Thức (MRO)"
            },
            "formalDefinition": {
              "en": "Method Resolution Order (MRO) is the ordered list of classes Python traverses to find an attribute or method on an instance. Python computes the MRO using the C3 Linearization algorithm, which enforces two invariants: 1) Children precede parents, 2) The relative order of listed base classes is strictly preserved. Inspectable via `Class.__mro__`.",
              "vi": "Method Resolution Order (MRO) là danh sách có thứ tự các lớp mà Python duyệt qua để tìm thuộc tính hoặc phương thức trên một instance. Python tính toán MRO bằng thuật toán Tuyến tính hóa C3, đảm bảo hai bất biến: 1) Lớp con đứng trước lớp cha, 2) Thứ tự khai báo các lớp cha được bảo toàn nghiêm ngặt. Có thể xem qua `Class.__mro__`."
            },
            "mentalModel": {
              "en": "MRO is an unbroken single-file queue of ancestors. When an order is given (`instance.method()`), it travels down the queue until the first capable ancestor handles it.",
              "vi": "MRO như một hàng dọc các tổ tiên xếp hàng. Khi có mệnh lệnh (`instance.method()`), lệnh sẽ truyền lần lượt dọc theo hàng cho đến khi gặp người đầu tiên biết cách thực hiện."
            },
            "whyItMatters": {
              "en": "`super()` in Python does NOT call the immediate parent class; it calls the NEXT class in the active instance’s MRO chain. This enables cooperative multiple inheritance and mixin architectures.",
              "vi": "Hàm `super()` trong Python KHÔNG PHẢI gọi lớp cha trực tiếp; nó gọi lớp KẾ TIẾP trong chuỗi MRO của instance hiện tại. Điều này tạo nên kiến trúc đa kế thừa hợp tác và mixin."
            },
            "minimalExample": {
              "language": "python",
              "filename": "mro_chain.py",
              "explanation": {
                "en": "Inspecting the MRO tuple of a multiple inheritance hierarchy.",
                "vi": "Xem tuple MRO của một cấu trúc đa kế thừa hình kim cương."
              },
              "code": "class A: pass\nclass B(A): pass\nclass C(A): pass\nclass D(B, C): pass\n\n# [D, B, C, A, object]\nfor cls in D.__mro__:\n    print(cls.__name__)"
            },
            "commonMisconception": {
              "en": "A common mistake is thinking Python uses simple depth-first search (DFS) for multiple inheritance. Old-style Python 2 classes used DFS, but Python 3 strictly enforces C3 Linearization to prevent diamond inheritance inconsistencies.",
              "vi": "Nhiều người nghĩ Python dùng tìm kiếm theo chiều sâu (DFS). Các class cũ trong Python 2 từng dùng DFS, nhưng Python 3 bắt buộc dùng thuật toán C3 để tránh xung đột trong mô hình kế thừa kim cương."
            },
            "quickReference": {
              "en": [
                "View with `ClassName.mro()`. `super()` delegates to the next class in `type(self).__mro__`."
              ],
              "vi": [
                "Xem bằng `ClassName.mro()`. Hàm `super()` chuyển giao lời gọi cho class kế tiếp trong `type(self).__mro__`."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-11",
      "number": 11,
      "slug": "hashability",
      "title": {
        "en": "Hashability & Dictionary Key Contract",
        "vi": "Tính Băm Được & Quy Ước Key Trong Dictionary (Hashability)"
      },
      "summary": {
        "en": "An object is hashable if its hash code never changes during its lifetime and supports equality comparisons.",
        "vi": "Một đối tượng là hashable nếu mã băm của nó không đổi suốt vòng đời và hỗ trợ so sánh bằng."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-11-1",
          "title": {
            "en": "The Hashability Contract",
            "vi": "Hợp Đồng Tính Băm Được"
          },
          "definitionDetails": {
            "term": {
              "en": "Hashability",
              "vi": "Tính Băm Được (Hashability)"
            },
            "formalDefinition": {
              "en": "An object is hashable if it has a hash value which never changes during its lifetime (implements `__hash__()`), and can be compared to other objects for equality (implements `__eq__()`). Hashable objects must satisfy the invariant: if `a == b`, then `hash(a) == hash(b)`. All dictionary keys and set members must be hashable.",
              "vi": "Một đối tượng là hashable nếu nó có mã băm không bao giờ thay đổi suốt vòng đời (hiện thực `__hash__()`), và có thể so sánh bằng với đối tượng khác (hiện thực `__eq__()`). Đối tượng hashable phải thỏa mãn bất biến: nếu `a == b`, thì `hash(a) == hash(b)`. Mọi key trong dictionary và phần tử trong set đều phải là hashable."
            },
            "mentalModel": {
              "en": "A hash code is a postal zip code on an envelope. The mail carrier uses the zip code to immediately route the letter to the right neighborhood bin (`O(1)` bucket lookup), then checks the street address (`__eq__`) to find the exact house.",
              "vi": "Mã băm như mã bưu chính trên phong bì. Bưu tá dùng mã bưu chính để đưa thư ngay vào đúng hòm thư khu vực (`O(1)`), sau đó mới đối chiếu số nhà (`__eq__`) để giao đúng nơi."
            },
            "whyItMatters": {
              "en": "If a mutable object could be used as a dictionary key and its value changed, its hash code would change, making the object permanently lost and unretrievable in the internal hash table bucket array.",
              "vi": "Nếu một đối tượng khả biến làm key trong dictionary và bị sửa đổi, mã băm của nó sẽ đổi, khiến nó bị thất lạc vĩnh viễn trong bảng băm và không thể tìm lại được."
            },
            "minimalExample": {
              "language": "python",
              "filename": "hashable_contract.py",
              "explanation": {
                "en": "Demonstrating valid hashable keys versus unhashable mutable lists.",
                "vi": "Minh họa key hợp lệ (tuple) so với kiểu khả biến không hashable (list)."
              },
              "code": "# Valid: Tuples are immutable and hashable\ncoord_map = {(10, 20): \"Station A\", (30, 40): \"Station B\"}\nprint(coord_map[(10, 20)])\n\n# Invalid: List is unhashable\ntry:\n    bad_map = {[10, 20]: \"Fails\"}\nexcept TypeError as e:\n    print(f\"Caught: {e}\")  # TypeError: unhashable type: 'list'"
            },
            "commonMisconception": {
              "en": "Defining `__eq__` on a custom class without defining `__hash__` sets `__hash__ = None`, making instances unhashable. If you override `__eq__`, you must explicitly implement `__hash__` if instances need to be stored in sets or dicts.",
              "vi": "Định nghĩa `__eq__` trên class tự tạo mà không định nghĩa `__hash__` sẽ khiến Python tự động gán `__hash__ = None`, làm instance không thể băm. Nếu ghi đè `__eq__`, bạn phải hiện thực thêm `__hash__` nếu muốn lưu vào set hoặc dict."
            },
            "quickReference": {
              "en": [
                "All immutable built-ins (str, int, float, tuple, frozenset) are hashable. All mutable built-ins (list, dict, set) are unhashable."
              ],
              "vi": [
                "Mọi kiểu bất biến tích hợp (str, int, float, tuple, frozenset) đều hashable. Mọi kiểu khả biến (list, dict, set) đều unhashable."
              ]
            }
          }
        }
      ]
    },
    {
      "id": "def-ch-12",
      "number": 12,
      "slug": "duck-typing",
      "title": {
        "en": "Duck Typing & Structural Subtyping",
        "vi": "Kiểu Vịt & Phân Loại Cấu Trúc (Duck Typing)"
      },
      "summary": {
        "en": "\"If it walks like a duck and quacks like a duck, it is a duck\" — dynamic polymorphism based on interfaces.",
        "vi": "\"Nếu nó đi như vịt và kêu như vịt, nó là con vịt\" — tính đa hình động dựa trên giao diện thay vì phân cấp lớp."
      },
      "readTimeMinutes": 3,
      "sections": [
        {
          "id": "def-sec-12-1",
          "title": {
            "en": "Duck Typing vs Nominal Typing",
            "vi": "Duck Typing So Với Định Kiểu Định Danh (Nominal Typing)"
          },
          "definitionDetails": {
            "term": {
              "en": "Duck Typing",
              "vi": "Định Kiểu Vịt (Duck Typing)"
            },
            "formalDefinition": {
              "en": "Duck typing is a dynamic typing paradigm where an object's suitability is determined by the presence of specific methods and properties, rather than its explicit class inheritance hierarchy. If an object implements the required interface (e.g. `read()` for a file-like stream), it can be used interchangeably regardless of its nominal type.",
              "vi": "Duck typing là một phong cách định kiểu động trong đó tính tương thích của đối tượng được quyết định bởi sự hiện diện của các phương thức và thuộc tính cụ thể, thay vì cây phả hệ kế thừa của nó. Nếu đối tượng có phương thức yêu cầu (như `read()` cho stream file), nó có thể dùng thay thế cho nhau mà không cần quan tâm đến kiểu danh nghĩa."
            },
            "mentalModel": {
              "en": "An electrical power outlet does not care what brand or model of appliance is plugged in, as long as the plug has the matching physical prongs and accepts 220V power.",
              "vi": "Ổ cắm điện không quan tâm thiết bị cắm vào thuộc hãng nào hay mẫu mã gì, miễn là phích cắm có chân cắm vừa vặn và tương thích dòng điện 220V."
            },
            "whyItMatters": {
              "en": "Duck typing enables extreme flexibility and decoupling in Python code. Functions can accept real files, in-memory `io.StringIO` buffers, or custom network streams without changing a single line of logic.",
              "vi": "Duck typing mang lại sự linh hoạt tối đa và giảm phụ thuộc trong code Python. Một hàm có thể nhận file thật, buffer `io.StringIO` trong RAM, hoặc socket mạng tùy biến mà không cần sửa một dòng code nào."
            },
            "minimalExample": {
              "language": "python",
              "filename": "duck_typing.py",
              "explanation": {
                "en": "Processing multiple disparate objects that share a read() method.",
                "vi": "Xử lý nhiều đối tượng khác nhau nhưng cùng có phương thức read()."
              },
              "code": "import io\n\ndef count_words(stream):\n    # Relies purely on stream having a .read() method\n    content = stream.read()\n    return len(content.split())\n\n# Works on in-memory buffers\nbuffer = io.StringIO(\"Python runtime execution model\")\nprint(count_words(buffer))  # 4"
            },
            "commonMisconception": {
              "en": "Duck typing is not the absence of typing; it is runtime behavioral verification (EAFP: Easier to Ask for Forgiveness than Permission). Modern Python also supports static duck typing via `typing.Protocol` (PEP 544).",
              "vi": "Duck typing không phải là không có kiểu; nó là sự kiểm tra hành vi lúc runtime (theo triết lý EAFP). Python hiện đại cũng hỗ trợ duck typing tĩnh thông qua `typing.Protocol` (PEP 544)."
            },
            "quickReference": {
              "en": [
                "Rely on behavior (`hasattr(obj, \"method\")` or try/except), not nominal type checks (`type(x) == expected_class`)."
              ],
              "vi": [
                "Dựa trên hành vi (hoặc gọi thử với try/except), không kiểm tra kiểu cứng nhắc (`type(x) == Class`)."
              ]
            }
          }
        }
      ]
    }
  ]
};
