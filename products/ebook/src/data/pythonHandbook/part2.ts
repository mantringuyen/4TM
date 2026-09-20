import { Chapter } from '../../types';

export const PART_2_CHAPTERS: Chapter[] = [
  // Chapter 4: Numbers, Strings & Encodings
  {
    id: 'py-hb-ch-4',
    number: 4,
    partNumber: 2,
    partTitle: {
      en: 'Core Data Structures',
      vi: 'Cấu Trúc Dữ Liệu Cốt Lõi',
    },
    slug: 'numbers-strings-encodings',
    title: {
      en: 'Numbers, Strings & Encodings',
      vi: 'Số Học, Chuỗi & Mã Hóa Ký Tự',
    },
    summary: {
      en: 'Arbitrary precision integers, IEEE 754 floating-point nuances, string immutability, f-string parsing, Unicode code points, and the bytes/str boundary.',
      vi: 'Số nguyên chính xác tùy ý, sai số số thực IEEE 754, tính bất biến của chuỗi, cơ chế f-string, mã điểm Unicode và ranh giới giữa bytes và str.',
    },
    readTimeMinutes: 19,
    sections: [
      {
        id: 'py-hb-4-1',
        title: {
          en: 'Integers (Arbitrary Precision) & IEEE 754 Floats',
          vi: 'Số Nguyên (Chính Xác Tùy Ý) & Số Thực Chuẩn IEEE 754',
        },
        content: {
          en: 'In Python 3, integers have **arbitrary precision** (bignums), meaning they never overflow beyond memory constraints. Internally, CPython stores integers as an array of 30-bit digits (`digit` arrays in `longintrepr.h`). In contrast, Python `float` values are standard 64-bit IEEE 754 double-precision floating-point numbers. Because decimal fractions like `0.1` cannot be represented precisely in binary floating-point, expressions like `0.1 + 0.2 == 0.3` evaluate to `False`. For financial and mission-critical accounting, developers must use the standard library `decimal.Decimal` module.',
          vi: 'Trong Python 3, số nguyên có **độ chính xác tùy ý (arbitrary precision)**, không bao giờ bị tràn số (overflow) trừ khi hết RAM. Dưới tầng CPython, số nguyên được lưu dưới dạng mảng các chữ số 30-bit (`longintrepr.h`). Ngược lại, kiểu `float` trong Python là số thực 64-bit chuẩn IEEE 754 double precision. Do các số thập phân như `0.1` không thể biểu diễn chính xác tuyệt đối ở hệ nhị phân, phép tính `0.1 + 0.2 == 0.3` sẽ trả về `False`. Trong tài chính và kế toán, lập trình viên bắt buộc phải sử dụng mô-đun `decimal.Decimal`.',
        },
        comparisonTable: {
          headers: [
            { en: 'Type', vi: 'Kiểu Số' },
            { en: 'Internal Representation', vi: 'Biểu Diễn Nội Bộ' },
            { en: 'Precision Limit', vi: 'Giới Hạn Độ Chính Xác' },
            { en: 'Primary Use Case', vi: 'Ứng Dụng Chính' },
          ],
          rows: [
            {
              en: ['int', 'Variable-length digit array in C', 'Unlimited (bounded only by RAM)', 'Exact counts, cryptography, indices'],
              vi: ['int', 'Mảng chữ số biến độ dài bằng C', 'Không giới hạn (chỉ phụ thuộc RAM)', 'Đếm số lượng, mật mã học, chỉ số'],
            },
            {
              en: ['float', '64-bit C double (IEEE 754)', '53 bits of mantissa (~15-17 decimal digits)', 'Scientific computing, 3D graphics, ML'],
              vi: ['float', 'C double 64-bit (IEEE 754)', '53-bit mantissa (~15-17 chữ số thập phân)', 'Tính toán khoa học, đồ họa 3D, Machine Learning'],
            },
            {
              en: ['decimal.Decimal', 'Exact base-10 fixed/floating point', 'User-configurable precision (e.g. 28+ digits)', 'Banking, billing, currency calculations'],
              vi: ['decimal.Decimal', 'Số thực hệ cơ số 10 chính xác tuyệt đối', 'Tùy chỉnh độ dài (mặc định 28 chữ số)', 'Ngân hàng, hóa đơn, thanh toán tiền tệ'],
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'floating_point_math.py',
          code: `import math
from decimal import Decimal

# 1. Float Imprecision
val = 0.1 + 0.2
print("Float sum:", val)  # 0.30000000000000004
print("Naive equality (val == 0.3):", val == 0.3)  # False
print("Tolerant equality (math.isclose):", math.isclose(val, 0.3))  # True

# 2. Financial Precision with Decimal
price = Decimal("0.10")
tax = Decimal("0.20")
total = price + tax
print("Exact Decimal total:", total)  # 0.30
print("Exact equality (total == Decimal('0.30')):", total == Decimal("0.30"))  # True`,
          explanation: {
            en: 'Demonstrates IEEE 754 floating-point tolerance with `math.isclose` versus exact base-10 calculation with `Decimal`.',
            vi: 'Minh họa cách so sánh số thực có dung sai bằng `math.isclose` và tính toán chính xác tuyệt đối với `Decimal`.',
          },
        },
      },
      {
        id: 'py-hb-4-2',
        title: {
          en: 'Strings as Immutable Sequences & F-Strings Internals',
          vi: 'Chuỗi Ký Tự Bất Biến & Cơ Chế Hoạt Động F-Strings',
        },
        content: {
          en: 'Python strings (`str`) are immutable sequences of Unicode characters. Because strings cannot be mutated in place, string concatenation in tight loops using `+=` repeatedly allocates new memory buffers, degrading performance to `O(N^2)`. Modern Python code relies on \'\' .join(list_of_strings) or formatted string literals (**f-strings**, PEP 498). F-strings are evaluated at runtime by compiling formatting expressions directly into optimized bytecode opcodes (`FORMAT_VALUE` and `BUILD_STRING`), making them significantly faster than legacy `%` formatting or `str.format()`.',
          vi: 'Chuỗi trong Python (`str`) là dãy ký tự Unicode bất biến. Do chuỗi không thể sửa tại chỗ, việc cộng dồn chuỗi trong vòng lặp bằng `+=` sẽ liên tục cấp phát vùng nhớ mới, làm giảm hiệu năng xuống `O(N^2)`. Lập trình Python hiện đại ưu tiên dùng \'\' .join(danh_sach) hoặc **f-strings** (PEP 498). F-string được biên dịch trực tiếp thành các opcode tối ưu (`FORMAT_VALUE` và `BUILD_STRING`), nhanh hơn rõ rệt so với định dạng `%` cũ hoặc hàm `str.format()`.',
        },
        codeBlock: {
          language: 'python',
          filename: 'fstring_features.py',
          code: `user_name = "alexander"
balance = 12450.75
ratio = 0.8492

# 1. Formatting specifiers and alignment
print(f"User: {user_name.capitalize():>12}")
print(f"Currency: \${balance:,.2f}")
print(f"Percentage: {ratio:.1%}")

# 2. Debug specifier (=) introduced in Python 3.8
delta = 45.2
print(f"{delta=}")  # Outputs: delta=45.2`,
          explanation: {
            en: 'F-strings support inline expressions, formatting specifiers (`:,.2f`), and the debugging operator (`{var=}`).',
            vi: 'F-strings hỗ trợ nhúng biểu thức, định dạng số (`:,.2f`) và toán tử debug nhanh (`{var=}`).',
          },
        },
      },
      {
        id: 'py-hb-4-3',
        title: {
          en: 'Unicode, UTF-8 & The bytes vs. str Boundary',
          vi: 'Unicode, UTF-8 & Ranh Giới Giữa bytes và str',
        },
        content: {
          en: 'One of the most critical architectural principles in modern Python is the **Unicode Sandwich**. Python strictly separates human-readable text (`str`) from raw binary data (`bytes`): 1) Text (`str`) represents abstract Unicode code points inside the application. 2) Binary (`bytes`) represents raw 8-bit byte sequences stored on disk or transmitted over networks. Converting `bytes` to `str` requires explicit decoding (`bytes.decode(\'utf-8\')`), and converting `str` to `bytes` requires explicit encoding (`str.encode(\'utf-8\')`).',
          vi: 'Một nguyên lý kiến trúc sống còn trong Python hiện đại là **Mô hình Bánh mì kẹp Unicode (Unicode Sandwich)**. Python phân định rạch ròi giữa văn bản (`str`) và dữ liệu nhị phân thô (`bytes`): 1) Văn bản (`str`) là tập các mã điểm Unicode trừu tượng chạy bên trong ứng dụng. 2) Dữ liệu nhị phân (`bytes`) là dãy byte 8-bit lưu trên ổ cứng hoặc truyền qua mạng. Chuyển từ `bytes` sang `str` phải qua giải mã (`bytes.decode(\'utf-8\')`), và ngược lại phải mã hóa (`str.encode(\'utf-8\')`).',
        },
        diagram: {
          title: {
            en: 'The Unicode Sandwich Architecture',
            vi: 'Kiến Trúc Bánh Mì Kẹp Unicode Trong Python',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Ingress (Decode Bytes)', vi: 'Đầu Vào (Decode Bytes)' },
              description: {
                en: 'Raw incoming bytes from network or disk are immediately decoded to UTF-8 str.',
                vi: 'Dữ liệu byte thô từ mạng hoặc ổ cứng được decode ngay sang chuỗi str UTF-8.',
              },
            },
            {
              number: 2,
              label: { en: 'Application Core (str)', vi: 'Lõi Ứng Dụng (str)' },
              description: {
                en: '100% of internal business logic and text processing operates purely on str.',
                vi: 'Toàn bộ logic nghiệp vụ xử lý văn bản hoàn toàn trên kiểu chuỗi str.',
              },
            },
            {
              number: 3,
              label: { en: 'Egress (Encode Bytes)', vi: 'Đầu Ra (Encode Bytes)' },
              description: {
                en: 'Outgoing text is explicitly encoded to UTF-8 bytes before wire transmission.',
                vi: 'Văn bản được encode sang UTF-8 bytes trước khi truyền ra ngoài mạng.',
              },
            },
          ],
        },
        keyTakeaways: {
          en: [
            'Python integers have arbitrary precision; floats are standard IEEE 754 doubles',
            'Use `decimal.Decimal` for financial calculations where decimal rounding errors are impermissible',
            'Enforce the Unicode Sandwich: decode bytes at input boundaries and encode str at output boundaries',
          ],
          vi: [
            'Số nguyên Python có độ chính xác vô hạn; float là số thực IEEE 754 64-bit chuẩn',
            'Dùng `decimal.Decimal` cho bài toán tài chính để tránh hoàn toàn sai số làm tròn thập phân',
            'Tuân thủ mô hình Unicode Sandwich: decode byte ngay ở đầu vào và encode chuỗi ở đầu ra',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Strings are immutable sequences of Unicode code points',
          'Floats represent binary fractions with inevitable representation limits',
          'The Unicode Sandwich cleanly insulates application logic from wire encoding formats',
        ],
        vi: [
          'Chuỗi là dãy các điểm mã Unicode bất biến trong bộ nhớ',
          'Số thực float biểu diễn dưới dạng nhị phân với sai số làm tròn tự nhiên',
          'Mô hình Unicode Sandwich cách ly logic ứng dụng khỏi định dạng mã hóa nhị phân',
        ],
      },
      rules: {
        en: [
          'Never use `==` directly on floats; use `math.isclose(a, b)` with a tolerance threshold',
          'Prefer f-strings over `%` and `.format()` for speed and clarity',
          'Always specify `encoding="utf-8"` explicitly when opening text files',
        ],
        vi: [
          'Không so sánh trực tiếp số float bằng `==`; hãy dùng hàm `math.isclose(a, b)`',
          'Ưu tiên f-strings thay cho `%` và `.format()` vì tốc độ nhanh và cú pháp trực quan',
          'Luôn khai báo rõ `encoding="utf-8"` khi mở file văn bản bằng `open()`',
        ],
      },
      commonTraps: {
        en: [
          'Using floats for currency calculations causing 1-cent accounting discrepancies',
          'Concatenating large strings in tight loops with `+=` causing O(N^2) buffer re-allocations',
        ],
        vi: [
          'Dùng float tính toán tiền tệ gây lệch số dư do sai số làm tròn',
          'Cộng chuỗi lớn trong vòng lặp bằng `+=` khiến bộ nhớ bị cấp phát lại liên tục O(N^2)',
        ],
      },
      takeaway: {
        en: 'A solid grasp of numbers and Unicode encodings eliminates insidious calculation glitches and character corruption across distributed systems.',
        vi: 'Nắm vững bản chất số học và mã hóa Unicode giúp loại bỏ triệt để các lỗi tính toán tiền tệ và lỗi font ký tự trong các hệ thống phân tán.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'Why is \'\' .join(chunks) asymptotically faster than `s += chunk` inside a loop?',
          vi: 'Tại sao dùng \'\' .join(chunks) nhanh hơn hẳn phép cộng chuỗi `s += chunk` trong vòng lặp?',
        },
        hint: {
          en: 'Think about string immutability and memory buffer re-allocation.',
          vi: 'Hãy nghĩ về tính bất biến của chuỗi và việc cấp phát lại buffer bộ nhớ.',
        },
        answer: {
          en: 'Strings are immutable. In each loop iteration, `s += chunk` allocates a new memory buffer of size `len(s) + len(chunk)` and copies all previous characters, yielding `O(N^2)` complexity. In contrast, \'\' .join(chunks) calculates the total required memory upfront in a single pass, allocating the exact buffer once in `O(N)` time.',
          vi: 'Chuỗi trong Python là bất biến. Mỗi lần lặp `s += chunk`, Python phải cấp phát vùng nhớ mới và sao chép lại toàn bộ chuỗi cũ, độ phức tạp là `O(N^2)`. Ngược lại, \'\' .join(chunks) tính toán tổng độ dài chuỗi trước rồi cấp phát bộ nhớ đúng một lần duy nhất với độ phức tạp `O(N)`.',
        },
      },
    ],
  },

  // Chapter 5: Lists, Tuples & Sequences
  {
    id: 'py-hb-ch-5',
    number: 5,
    partNumber: 2,
    partTitle: {
      en: 'Core Data Structures',
      vi: 'Cấu Trúc Dữ Liệu Cốt Lõi',
    },
    slug: 'lists-tuples-sequences',
    title: {
      en: 'Lists, Tuples & Sequences',
      vi: 'Lists, Tuples & Cấu Trúc Dãy Tuần Tự',
    },
    summary: {
      en: 'Dynamic array growth patterns, list over-allocation algorithms, tuple immutability benefits, sequence slicing internals, and extended iterable unpacking.',
      vi: 'Thuật toán mở rộng mảng động của list, cơ chế cấp phát thừa bộ nhớ, lợi thế của tuple bất biến, bản chất cắt lát sequence và kỹ thuật unpacking nâng cao.',
    },
    readTimeMinutes: 18,
    sections: [
      {
        id: 'py-hb-5-1',
        title: {
          en: 'Dynamic Arrays: List Memory & Over-Allocation',
          vi: 'Mảng Động: Cơ Chế Cấp Phát Bộ Nhớ & Over-Allocation Của List',
        },
        content: {
          en: 'Under the hood, a Python `list` is NOT a linked list; it is a **dynamic array of pointers** (`PyListObject` storing `PyObject** ob_item`). When items are added via `append()`, CPython does not allocate space for a single extra item each time. Instead, it uses an **over-allocation algorithm** (growth factor roughly `~1.125x` to `~1.25x`) defined in `listobject.c`. This geometric resizing strategy guarantees that appending elements achieves **amortized O(1)** constant time complexity.',
          vi: 'Dưới tầng CPython, kiểu `list` KHÔNG PHẢI là danh sách liên kết (linked list); nó là một **mảng động chứa các con trỏ** (`PyListObject` quản lý mảng con trỏ `PyObject** ob_item`). Khi gọi `append()`, CPython không cấp phát thêm từng ô nhớ đơn lẻ mà áp dụng thuật toán **cấp phát thừa (over-allocation)** với hệ số tăng trưởng khoảng `~1.125x` đến `~1.25x` trong file `listobject.c`. Chiến lược này đảm bảo thao tác thêm phần tử đạt độ phức tạp **O(1) trung bình (amortized)**.',
        },
        diagram: {
          title: {
            en: 'List Dynamic Resizing & Over-Allocation',
            vi: 'Cơ Chế Mở Rộng Kích Thước Mảng Động Của List',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Capacity Exhausted', vi: 'Hết Dung Lượng Bộ Nhớ Đệm' },
              description: {
                en: 'Current items reach allocated slot limit (size == allocated).',
                vi: 'Số phần tử hiện tại chạm ngưỡng ô nhớ đã cấp phát (size == allocated).',
              },
            },
            {
              number: 2,
              label: { en: 'Over-Allocation Formula', vi: 'Tính Toán Bộ Nhớ Thừa' },
              description: {
                en: 'CPython calculates new_allocated = (size + (size >> 3) + 6) & ~3.',
                vi: 'CPython tính dung lượng mới theo công thức nhân thêm khoảng 12.5% ô nhớ dự phòng.',
              },
            },
            {
              number: 3,
              label: { en: 'Realloc & Pointer Transfer', vi: 'Tái Cấp Phát & Chuyển Con Trỏ' },
              description: {
                en: 'C realloc() expands heap memory buffer; future appends execute in O(1).',
                vi: 'Hàm realloc() trong C mở rộng bộ nhớ; các lệnh append tiếp theo chạy tức thì O(1).',
              },
            },
          ],
        },
        codeBlock: {
          language: 'python',
          filename: 'list_growth_inspection.py',
          code: `import sys

# Track list memory size as elements are appended
data = []
prev_bytes = sys.getsizeof(data)
print(f"Empty list initial memory: {prev_bytes} bytes")

for i in range(25):
    data.append(i)
    current_bytes = sys.getsizeof(data)
    if current_bytes != prev_bytes:
        print(f"Length {len(data):2d} -> Memory expanded to {current_bytes:4d} bytes (Capacity jump!)")
        prev_bytes = current_bytes`,
          explanation: {
            en: '`sys.getsizeof()` illustrates discrete jump steps where CPython over-allocates buffer slots to maintain amortized O(1) append speed.',
            vi: '`sys.getsizeof()` cho thấy các bước nhảy bậc thang khi CPython cấp phát trước bộ nhớ để giữ tốc độ append luôn đạt O(1).',
          },
        },
      },
      {
        id: 'py-hb-5-2',
        title: {
          en: 'Tuples: Immutability, Memory Efficiency & Struct Records',
          vi: 'Tuples: Tính Bất Biến, Tiết Kiệm Bộ Nhớ & Bản Ghi Cấu Trúc',
        },
        content: {
          en: 'A `tuple` is an immutable sequence of object references. Because tuples cannot change size after creation, CPython allocates the exact amount of memory needed with zero over-allocation overhead. Furthermore, CPython utilizes a **freelist optimization** for small tuples, recycling deallocated tuple wrappers without invoking general OS malloc/free routines. Tuples containing only hashable elements are themselves hashable and can serve as dictionary keys.',
          vi: '`tuple` là dãy tham chiếu đối tượng bất biến. Vì không thể thay đổi kích thước sau khi tạo, CPython cấp phát chính xác dung lượng bộ nhớ cần thiết mà không tốn chi phí over-allocation. Ngoài ra, CPython còn có cơ chế **freelist** lưu lại các tuple nhỏ đã giải phóng để tái sử dụng ngay mà không cần gọi hệ điều hành cấp phát bộ nhớ. Tuple chứa các phần tử hashable thì bản thân nó cũng hashable và có thể dùng làm key cho dictionary.',
        },
        comparisonTable: {
          headers: [
            { en: 'Feature', vi: 'Đặc Điểm' },
            { en: 'List', vi: 'List' },
            { en: 'Tuple', vi: 'Tuple' },
            { en: 'collections.deque', vi: 'collections.deque' },
          ],
          rows: [
            {
              en: ['Mutability', 'Mutable (in-place append, pop, sort)', 'Immutable (fixed upon creation)', 'Mutable (double-ended queue)'],
              vi: ['Tính khả biến', 'Khả biến (thêm, xóa, sắp xếp tại chỗ)', 'Bất biến (cố định sau khi tạo)', 'Khả biến (hàng đợi hai đầu)'],
            },
            {
              en: ['Memory Footprint', 'Higher (due to over-allocation buffer)', 'Minimal (exact allocation, no slack)', 'Slightly higher (linked block chunks)'],
              vi: ['Dung lượng bộ nhớ', 'Lớn hơn (do có ô nhớ dự phòng)', 'Tối ưu nhất (vừa khít, không lãng phí)', 'Trung bình (các khối danh sách liên kết)'],
            },
            {
              en: ['Append / Prepend Time', 'Append: O(1), Prepend (insert 0): O(N)', 'Not supported (creates new tuple)', 'Append: O(1), Prepend (appendleft): O(1)'],
              vi: ['Tốc độ thêm đầu/cuối', 'Thêm cuối: O(1), Thêm đầu: O(N)', 'Không hỗ trợ (phải tạo tuple mới)', 'Thêm cuối: O(1), Thêm đầu: O(1)'],
            },
            {
              en: ['Dict Key Capability', 'No (Unhashable)', 'Yes (if all elements are hashable)', 'No (Unhashable)'],
              vi: ['Làm Key Dictionary', 'Không (Unhashable)', 'Có (nếu mọi phần tử con hashable)', 'Không (Unhashable)'],
            },
          ],
        },
      },
      {
        id: 'py-hb-5-3',
        title: {
          en: 'Slicing & Extended Iterable Unpacking',
          vi: 'Cắt Lát Sequence & Unpacking Mở Rộng',
        },
        content: {
          en: 'Python sequence slicing (`sequence[start:stop:step]`) constructs a new shallow copy of the specified subsequence. Negative indices count backward from the end (`-1` represents the last element). Extended iterable unpacking (PEP 3132) uses the `*rest` star operator to capture variable-length sub-sequences cleanly without manual indexing.',
          vi: 'Kỹ thuật cắt lát (`sequence[start:stop:step]`) tạo ra một bản sao nông mới của đoạn dữ liệu chỉ định. Chỉ số âm đếm ngược từ cuối dãy (`-1` là phần tử cuối cùng). Cú pháp unpacking mở rộng (PEP 3132) dùng toán tử sao `*rest` để gom các phần tử còn lại vào list một cách ngắn gọn mà không cần tính chỉ số thủ công.',
        },
        codeBlock: {
          language: 'python',
          filename: 'unpacking_and_slicing.py',
          code: `# 1. Slicing with Steps
items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print("Even numbers (step 2):", items[::2])       # [0, 2, 4, 6, 8]
print("Reversed list:", items[::-1])              # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# 2. Extended Unpacking (Star Operator)
first, *middle, last = items
print("First:", first)    # 0
print("Middle:", middle)  # [1, 2, 3, 4, 5, 6, 7, 8]
print("Last:", last)      # 9`,
          explanation: {
            en: '`*middle` captures intermediate items as a new list while binding `first` and `last` cleanly.',
            vi: 'Toán tử `*middle` gom toàn bộ các phần tử ở giữa thành một list mới trong khi gán biến `first` và `last` rành mạch.',
          },
        },
        commonMistakes: [
          {
            mistake: {
              en: 'Creating a 2D matrix using list multiplication `matrix = [[0] * 3] * 3`',
              vi: 'Tạo ma trận 2 chiều bằng phép nhân `matrix = [[0] * 3] * 3`',
            },
            why: {
              en: 'Outer multiplication duplicates the reference to the SAME inner list row 3 times. Mutating `matrix[0][0]` changes all 3 rows.',
              vi: 'Phép nhân ngoài sao chép tham chiếu của CÙNG MỘT dòng list 3 lần. Sửa `matrix[0][0]` sẽ làm thay đổi cả 3 hàng.',
            },
            solution: {
              en: 'Use a list comprehension to instantiate distinct independent inner row lists.',
              vi: 'Dùng list comprehension để khởi tạo các dòng danh sách hoàn toàn độc lập.',
            },
            codeIncorrect: `grid = [[0] * 3] * 3
grid[0][0] = 99
print(grid) # [[99, 0, 0], [99, 0, 0], [99, 0, 0]] -> Bug!`,
            codeCorrect: `grid = [[0] * 3 for _ in range(3)]
grid[0][0] = 99
print(grid) # [[99, 0, 0], [0, 0, 0], [0, 0, 0]] -> Clean!`,
          },
        ],
        keyTakeaways: {
          en: [
            'Lists are dynamic pointer arrays using geometric over-allocation for O(1) appends',
            'Tuples are immutable, memory-efficient records suitable for fixed data and dict keys',
            'Use `collections.deque` when high-throughput FIFO queue operations (insert at 0) are required',
          ],
          vi: [
            'List là mảng động chứa con trỏ, tự động cấp phát thừa để đạt tốc độ append O(1)',
            'Tuple là cấu trúc bất biến, tiết kiệm RAM, phù hợp cho dữ liệu cố định và làm dict key',
            'Dùng `collections.deque` khi cần thao tác hàng đợi FIFO hiệu năng cao (thêm/xóa ở đầu)',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Lists are contiguous pointer buffers resized geometrically to amortize allocation overhead',
          'Tuples represent immutable structural records with zero memory slack',
          'Sequence slicing allocates a new shallow copy container',
        ],
        vi: [
          'List là bộ đệm con trỏ liền kề được mở rộng hình học để giảm thiểu số lần cấp phát lại',
          'Tuple là bản ghi cấu trúc bất biến không tốn dung lượng bộ nhớ dư thừa',
          'Cắt lát sequence luôn sinh ra một đối tượng container bản sao nông mới',
        ],
      },
      rules: {
        en: [
          'Use `collections.deque` instead of `list.insert(0, val)` or `list.pop(0)` which run in O(N)',
          'Initialize multi-dimensional lists with comprehensions (`[[0] * C for _ in range(R)]`)',
          'Prefer tuples for composite dictionary keys (`dict[(x, y)] = value`)',
        ],
        vi: [
          'Dùng `collections.deque` thay cho `list.insert(0, val)` vốn có độ phức tạp O(N)',
          'Khởi tạo mảng nhiều chiều bằng comprehension (`[[0] * C for _ in range(R)]`)',
          'Ưu tiên dùng tuple làm khóa phức hợp cho dictionary (`dict[(x, y)] = value`)',
        ],
      },
      commonTraps: {
        en: [
          'Multiplying list containing nested mutable objects (`[[0]] * 5`) duplicating references',
          'Modifying a list while iterating over it, resulting in skipped elements',
        ],
        vi: [
          'Nhân bản list chứa đối tượng khả biến (`[[0]] * 5`) gây trùng lặp tham chiếu',
          'Vừa duyệt for vừa xóa phần tử trong list làm nhảy cóc qua phần tử tiếp theo',
        ],
      },
      takeaway: {
        en: 'Choosing between lists, tuples, and deques based on memory layout and algorithmic complexity ensures high performance and prevents reference duplication bugs.',
        vi: 'Việc lựa chọn đúng giữa list, tuple và deque dựa trên bố cục bộ nhớ và độ phức tạp thuật toán đảm bảo ứng dụng chạy mượt mà và không dính lỗi tham chiếu.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'Why does inserting an element at index 0 of a list (`list.insert(0, x)`) take O(N) time while appending takes O(1)?',
          vi: 'Tại sao chèn phần tử vào đầu list (`list.insert(0, x)`) tốn O(N) trong khi chèn vào cuối list lại tốn O(1)?',
        },
        hint: {
          en: 'Consider the contiguous memory layout of dynamic pointer arrays.',
          vi: 'Hãy nghĩ về cách mảng con trỏ được xếp liền kề nhau trong bộ nhớ.',
        },
        answer: {
          en: 'Python lists are contiguous arrays of pointers in memory. Inserting at index 0 requires shifting every existing pointer one position to the right via `memmove()`, costing `O(N)` operations. Appending places the pointer into the next pre-allocated empty slot at the end in `O(1)` time.',
          vi: 'List trong Python là mảng các con trỏ nằm liên tiếp nhau trong RAM. Chèn vào vị trí 0 buộc CPython phải dịch chuyển toàn bộ N con trỏ hiện có sang phải bằng lệnh `memmove()`, tốn `O(N)`. Còn append chỉ việc ghi vào ô nhớ trống đã cấp phát sẵn ở cuối mảng trong `O(1)`.',
        },
      },
    ],
  },

  // Chapter 6: Dictionaries & Sets
  {
    id: 'py-hb-ch-6',
    number: 6,
    partNumber: 2,
    partTitle: {
      en: 'Core Data Structures',
      vi: 'Cấu Trúc Dữ Liệu Cốt Lõi',
    },
    slug: 'dictionaries-and-sets',
    title: {
      en: 'Dictionaries & Sets',
      vi: 'Dictionaries & Tập Hợp Sets',
    },
    summary: {
      en: 'Hash table mechanics, compact dict memory layout in Python 3.6+, the hashability contract (__hash__ and __eq__), collision resolution, and set Venn operations.',
      vi: 'Cơ chế bảng băm hash table, cấu trúc compact dict từ Python 3.6+, quy ước hashable (__hash__ và __eq__), xử lý xung đột băm và các phép toán tập hợp.',
    },
    readTimeMinutes: 20,
    sections: [
      {
        id: 'py-hb-6-1',
        title: {
          en: 'The Hash Table Mental Model & Compact Dictionaries',
          vi: 'Mô Hình Bảng Băm & Cấu Trúc Compact Dictionary',
        },
        content: {
          en: 'Python dictionaries (`dict`) and sets (`set`) are backed by **hash tables**, providing average **O(1) lookups, insertions, and deletions**. Since Python 3.6 (PEP 468), CPython uses a **Compact Dictionary layout** that reduced memory consumption by ~25% and preserves key insertion order by default. The layout splits storage into two tables: 1) A sparse `indices` array storing integer offsets, and 2) A dense `entries` array packing `[hash, key_ptr, value_ptr]` sequentially in insertion order.',
          vi: 'Dictionary (`dict`) và Set (`set`) trong Python hoạt động dựa trên **Bảng Băm (Hash Table)**, mang lại tốc độ **tìm kiếm, thêm và xóa trung bình đạt O(1)**. Từ Python 3.6 (PEP 468), CPython chuyển sang **Kiến trúc Compact Dictionary** giúp tiết kiệm ~25% RAM và tự động bảo toàn thứ tự chèn phần tử. Kiến trúc này tách bộ nhớ làm 2 bảng: 1) Mảng `indices` thưa chứa chỉ số nguyên, và 2) Mảng `entries` dày đặc lưu `[hash, con_trỏ_key, con_trỏ_val]` tuần tự theo đúng thứ tự chèn.',
        },
        diagram: {
          title: {
            en: 'CPython Compact Dictionary Architecture',
            vi: 'Kiến Trúc Bảng Băm Compact Dictionary Trong CPython',
          },
          steps: [
            {
              number: 1,
              label: { en: 'Hash & Masking', vi: 'Tính Hash & Masking' },
              description: {
                en: 'hash(key) is computed and masked to index = hash & (table_size - 1).',
                vi: 'hash(key) được tính và lấy phần dư index = hash & (table_size - 1).',
              },
            },
            {
              number: 2,
              label: { en: 'Sparse Indices Array', vi: 'Mảng Indices Thưa' },
              description: {
                en: 'indices[index] contains integer index into dense entries array.',
                vi: 'indices[index] chứa số nguyên trỏ tới vị trí trong mảng entries.',
              },
            },
            {
              number: 3,
              label: { en: 'Dense Entries Array', vi: 'Mảng Entries Dày Đặc' },
              description: {
                en: 'Stores [hash, key, value] sequentially, preserving insertion order.',
                vi: 'Lưu [hash, key, value] liên tiếp nhau, bảo toàn trọn vẹn thứ tự thêm phần tử.',
              },
            },
          ],
        },
      },
      {
        id: 'py-hb-6-2',
        title: {
          en: 'The Key Hashability Contract (__hash__ & __eq__)',
          vi: 'Quy Ước Hashable Của Khóa (__hash__ & __eq__)',
        },
        content: {
          en: 'For an object to be used as a dictionary key or set element, it must be **Hashable**. The Hashability contract demands two inviolable rules: 1) The object must provide a `__hash__()` method returning an integer that **NEVER changes during its lifetime**, and 2) It must provide `__eq__()` such that if `a == b`, then `hash(a) == hash(b)` must evaluate to True. Mutable objects like `list` and `dict` implement `__hash__ = None` and raise `TypeError: unhashable type` because mutating contents would alter their bucket location, making them unretrievable.',
          vi: 'Để một đối tượng có thể làm key trong dictionary hoặc phần tử trong set, nó bắt buộc phải **Hashable**. Quy ước Hashable đặt ra 2 điều kiện bất biến: 1) Đối tượng phải có phương thức `__hash__()` trả về số nguyên **không bao giờ thay đổi trong suốt vòng đời**, và 2) Phải có `__eq__()` sao cho nếu `a == b` thì bắt buộc `hash(a) == hash(b)`. Các kiểu dữ liệu khả biến như `list` và `dict` bị gán `__hash__ = None` và báo lỗi `TypeError: unhashable type` vì nếu cho phép sửa nội dung, mã hash sẽ đổi và làm mất dấu vị trí ô băm.',
        },
        codeBlock: {
          language: 'python',
          filename: 'custom_hashable_key.py',
          code: `class Coordinate:
    def __init__(self, x: int, y: int):
        self._x = x
        self._y = y

    @property
    def x(self) -> int:
        return self._x

    @property
    def y(self) -> int:
        return self._y

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Coordinate):
            return False
        return self._x == other._x and self._y == other._y

    def __hash__(self) -> int:
        # Combine hashes of immutable attributes
        return hash((self._x, self._y))

# Valid immutable hashable key in dictionary
points_map = {Coordinate(10, 20): "Station Alpha"}
print("Lookup result:", points_map[Coordinate(10, 20)])  # Station Alpha`,
          explanation: {
            en: 'Demonstrates implementing `__eq__` and `__hash__` over immutable properties, allowing custom instances to serve as safe dictionary keys.',
            vi: 'Minh họa cách cài đặt `__eq__` và `__hash__` dựa trên các thuộc tính bất biến, cho phép class tùy chỉnh làm key cho dictionary an toàn.',
          },
        },
      },
      {
        id: 'py-hb-6-3',
        title: {
          en: 'Sets: Uniqueness, Venn Operations & Complexity',
          vi: 'Tập Hợp Sets: Tính Duy Nhất & Các Phép Toán Tập Hợp',
        },
        content: {
          en: 'A `set` is an unordered collection of unique, hashable objects. Sets implement standard mathematical Venn operations: Union (`|`), Intersection (`&`), Difference (`-`), and Symmetric Difference (`^`). Because set containment checks (`item in my_set`) execute in average **O(1)** time (compared to `O(N)` linear scanning in a `list`), converting collections to sets is a fundamental optimization for deduplication and relationship membership queries.',
          vi: '`set` là tập hợp không trùng lặp chứa các đối tượng hashable. Set hỗ trợ đầy đủ các phép toán biểu đồ Venn: Hợp (`|`), Giao (`&`), Hiệu (`-`) và Hiệu đối xứng (`^`). Vì thao tác kiểm tra phần tử (`item in my_set`) chỉ tốn thời gian trung bình **O(1)** (so với `O(N)` duyệt tuyến tính của `list`), việc chuyển đổi sang set là phương pháp tối ưu kinh điển khi cần khử trùng lặp và kiểm tra tồn tại.',
        },
        codeBlock: {
          language: 'python',
          filename: 'set_operations.py',
          code: `admin_roles = {"superadmin", "billing_manager", "editor"}
user_permissions = {"editor", "viewer", "commenter"}

# Venn Set Operations
print("Overlap (Intersection):", admin_roles & user_permissions)       # {'editor'}
print("All combined (Union):", admin_roles | user_permissions)         # All roles
print("Admin only (Difference):", admin_roles - user_permissions)      # {'superadmin', 'billing_manager'}
print("Exclusive to one (Symmetric Diff):", admin_roles ^ user_permissions)`,
          explanation: {
            en: 'Venn set operations provide concise, highly optimized C-level implementations for membership calculations.',
            vi: 'Các phép toán tập hợp cung cấp cú pháp ngắn gọn, được tối ưu hóa trực tiếp dưới tầng C.',
          },
        },
        keyTakeaways: {
          en: [
            'Dictionaries and sets provide O(1) average lookup, insert, and delete performance',
            'Python 3.7+ guarantees dictionary key insertion order preservation',
            'Keys must be immutable and fulfill the `__hash__` and `__eq__` contract',
          ],
          vi: [
            'Dictionary và set cung cấp hiệu năng tìm kiếm, thêm và xóa trung bình O(1)',
            'Từ Python 3.7+, dictionary luôn bảo toàn thứ tự chèn của các key',
            'Khóa bắt buộc phải là đối tượng bất biến và thỏa mãn quy ước `__hash__` và `__eq__`',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Hash tables map keys to integer array buckets via mathematical hash algorithms',
          'Compact dictionaries achieve order preservation by separating indices from dense entry records',
          'Sets are internally dictionaries where values are dummy null placeholders',
        ],
        vi: [
          'Bảng băm ánh xạ khóa tới các ô bucket thông qua thuật toán tính mã băm',
          'Compact dict bảo toàn thứ tự bằng cách tách mảng chỉ số indices khỏi mảng dữ liệu entries',
          'Set bản chất là dictionary nhưng giá trị value được gán bằng giá trị rỗng',
        ],
      },
      rules: {
        en: [
          'Never use mutable objects as dictionary keys or set elements',
          'If you override `__eq__` in a class, you must explicitly implement `__hash__`',
          'Use `set` containment checks (`item in s`) for O(1) membership validation',
        ],
        vi: [
          'Không bao giờ dùng đối tượng khả biến làm key của dictionary hoặc phần tử trong set',
          'Nếu ghi đè `__eq__` trong class, bắt buộc phải tự cài đặt lại phương thức `__hash__`',
          'Dùng `item in s` trên set để kiểm tra sự tồn tại với tốc độ O(1)',
        ],
      },
      commonTraps: {
        en: [
          'Using a list for repeated containment checks inside a loop causing O(N^2) total execution',
          'Mutating an object after inserting it into a set, permanently breaking hash table lookup',
        ],
        vi: [
          'Dùng list để kiểm tra tồn tại `in` trong vòng lặp lồng nhau làm tăng độ phức tạp lên O(N^2)',
          'Thay đổi giá trị thuộc tính của object sau khi đã nhét vào set làm hỏng cơ chế băm',
        ],
      },
      takeaway: {
        en: 'Hash tables are the central engine of Python performance. Respecting the hashability contract ensures robust caching, lookups, and set algebra.',
        vi: 'Bảng băm là động cơ cốt lõi tạo nên hiệu năng của Python. Tuân thủ quy ước hashable giúp đảm bảo hệ thống cache, tra cứu và xử lý tập hợp luôn chuẩn xác.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'Why does Python raise `TypeError: unhashable type: \'list\'` when using a list as a dictionary key?',
          vi: 'Tại sao Python báo lỗi `TypeError: unhashable type: \'list\'` khi dùng list làm key trong dictionary?',
        },
        hint: {
          en: 'What would happen if the list contents were modified after being inserted into the dictionary?',
          vi: 'Điều gì sẽ xảy ra nếu nội dung của list bị sửa đổi sau khi đã lưu vào dictionary?',
        },
        answer: {
          en: 'Lists are mutable. If a list were allowed as a key and then modified in place via `append()`, its hash code would change, meaning future lookups would search a different bucket and fail to find the key. To preserve hash table integrity, Python sets `list.__hash__ = None`.',
          vi: 'List là kiểu dữ liệu khả biến. Nếu cho phép list làm key rồi sau đó sửa nội dung bằng `append()`, mã băm của nó sẽ đổi, khiến các lần tra cứu sau tìm sai ô bucket và không tìm thấy key. Để bảo vệ tính toàn vẹn của bảng băm, Python quy định `list.__hash__ = None`.',
        },
      },
    ],
  },

  // Chapter 7: Comprehensions, Iteration & Data Transformation
  {
    id: 'py-hb-ch-7',
    number: 7,
    partNumber: 2,
    partTitle: {
      en: 'Core Data Structures',
      vi: 'Cấu Trúc Dữ Liệu Cốt Lõi',
    },
    slug: 'comprehensions-iteration-transformation',
    title: {
      en: 'Comprehensions, Iteration & Transformation',
      vi: 'Comprehensions, Lặp & Chuyển Đổi Dữ Liệu',
    },
    summary: {
      en: 'List, dict, and set comprehensions, generator expressions for memory conservation, and standard library sequence utilities (zip, enumerate, filter, map, sorted).',
      vi: 'Cú pháp comprehension cho list, dict, set, biểu thức generator tiết kiệm RAM và các hàm tiện ích dãy tuần tự (zip, enumerate, filter, map, sorted).',
    },
    readTimeMinutes: 17,
    sections: [
      {
        id: 'py-hb-7-1',
        title: {
          en: 'List, Dict & Set Comprehensions',
          vi: 'Comprehensions Cho List, Dict & Set',
        },
        content: {
          en: 'Comprehensions provide concise, declarative syntax for transforming and filtering iterable collections. In Python 3, comprehensions execute in their own isolated function scope, preventing loop variables (e.g., `x`) from leaking into and overwriting surrounding local namespaces. Comprehensions run faster than traditional `for` loops appending to lists because CPython optimizes bytecode construction via specialized `LIST_APPEND` opcodes without repeated Python-level method lookups.',
          vi: 'Comprehension mang lại cú pháp khai báo ngắn gọn để biến đổi và lọc dữ liệu. Trong Python 3, comprehension chạy trong một scope hàm cách ly riêng, ngăn chặn biến lặp (như `x`) làm ghi đè lên các biến trùng tên ở phạm vi bên ngoài. Comprehension chạy nhanh hơn vòng lặp `for` thủ công vì CPython tối ưu trực tiếp bằng opcode `LIST_APPEND` ở tầng máy ảo mà không cần gọi phương thức append qua thông dịch.',
        },
        codeBlock: {
          language: 'python',
          filename: 'comprehensions_showcase.py',
          code: `# 1. List Comprehension with filtering
raw_scores = [85, 42, 90, 68, 95, 30]
passing_scores = [s for s in raw_scores if s >= 70]

# 2. Dict Comprehension (Inverting key-value pairs)
port_map = {"http": 80, "https": 443, "ssh": 22}
reverse_map = {port: protocol for protocol, port in port_map.items()}

# 3. Set Comprehension
names = ["Alice", "BOB", "alice", "Charlie"]
unique_normalized = {name.lower() for name in names}
print("Unique lower names:", unique_normalized)  # {'alice', 'bob', 'charlie'}`,
          explanation: {
            en: 'Demonstrates list filtering, dictionary key-value inversion, and set normalization in concise single-line expressions.',
            vi: 'Minh họa lọc list, đảo ngược key-value của dictionary và chuẩn hóa set chỉ trong một dòng lệnh.',
          },
        },
      },
      {
        id: 'py-hb-7-2',
        title: {
          en: 'Generator Expressions: Memory Conservation & Lazy Evaluation',
          vi: 'Biểu Thức Generator: Tiết Kiệm Bộ Nhớ & Đánh Giá Lười (Lazy)',
        },
        content: {
          en: 'While a list comprehension constructs the entire collection in memory immediately (**eager evaluation**), a **Generator Expression** (surrounded by parentheses `(x for x in seq)`) creates a lazy generator iterator that computes values one-at-a-time on demand. When processing large datasets (e.g. gigabytes of logs or database streams), generator expressions consume a constant **O(1) memory footprint**, preventing out-of-memory crashes.',
          vi: 'Trong khi list comprehension tạo toàn bộ mảng dữ liệu trên RAM ngay lập tức (**đánh giá háo hức - eager**), thì **Biểu thức Generator** (bao bởi dấu ngoặc tròn `(x for x in seq)`) tạo ra một iterator đánh giá lười (lazy evaluation) chỉ sinh giá trị từng phần tử khi được yêu cầu. Khi xử lý tập dữ liệu lớn (như file log nhiều gigabyte hay luồng database), generator expression chỉ tiêu tốn **dung lượng RAM cố định O(1)**, tránh hoàn toàn lỗi tràn bộ nhớ.',
        },
        comparisonTable: {
          headers: [
            { en: 'Pattern', vi: 'Mô Hình' },
            { en: 'Syntax', vi: 'Cú Pháp' },
            { en: 'Evaluation Strategy', vi: 'Chiến Lược Đánh Giá' },
            { en: 'Memory Footprint', vi: 'Dung Lượng RAM' },
          ],
          rows: [
            {
              en: ['List Comprehension', '[f(x) for x in data]', 'Eager (creates entire list upfront)', 'O(N) — proportional to dataset size'],
              vi: ['List Comprehension', '[f(x) for x in data]', 'Eager (tạo toàn bộ list ngay lập tức)', 'O(N) — tỷ lệ thuận với số phần tử'],
            },
            {
              en: ['Generator Expression', '(f(x) for x in data)', 'Lazy (computes 1 item on demand)', 'O(1) — constant minimal memory'],
              vi: ['Generator Expression', '(f(x) for x in data)', 'Lazy (tính 1 phần tử khi cần)', 'O(1) — bộ nhớ cố định cực nhỏ'],
            },
          ],
        },
      },
      {
        id: 'py-hb-7-3',
        title: {
          en: 'Built-in Transformation Utilities: zip, enumerate, sorted',
          vi: 'Các Hàm Tiện Ích Dãy Chuẩn: zip, enumerate, sorted',
        },
        content: {
          en: 'Python provides high-performance C-implemented sequence utilities: 1) `enumerate(iterable, start=0)` pairs elements with incremental index counters without manual index tracking. 2) `zip(*iterables, strict=False)` aggregates elements from multiple sequences in parallel (Python 3.10+ adds `strict=True` to raise `ValueError` on length mismatches). 3) `sorted(iterable, key=func, reverse=bool)` implements Timsort, returning a new sorted list without mutating the original container.',
          vi: 'Python tích hợp sẵn các hàm tiện ích xử lý dãy viết bằng C với hiệu năng cực cao: 1) `enumerate(iterable, start=0)` gắn chỉ số đếm tự động vào từng phần tử. 2) `zip(*iterables, strict=False)` ghép các dãy dữ liệu chạy song song với nhau (từ Python 3.10 có thêm `strict=True` để báo lỗi nếu độ dài các dãy không bằng nhau). 3) `sorted(iterable, key=func, reverse=bool)` áp dụng thuật toán Timsort, trả về list đã sắp xếp mới mà không làm thay đổi dữ liệu gốc.',
        },
        codeBlock: {
          language: 'python',
          filename: 'builtin_sequence_tools.py',
          code: `users = ["alice", "bob", "charlie"]
scores = [92, 78, 88]

# 1. zip(strict=True) ensuring length parity
paired_data = list(zip(users, scores, strict=True))
print("Paired:", paired_data)

# 2. sorted() with custom key function
ranked = sorted(paired_data, key=lambda item: item[1], reverse=True)
print("Ranked by score:", ranked)

# 3. enumerate() for indexed reporting
for rank, (name, score) in enumerate(ranked, start=1):
    print(f"#{rank}: {name.capitalize()} -> {score} pts")`,
          explanation: {
            en: 'Demonstrates combining `zip`, `sorted(key=...)`, and `enumerate(start=1)` for clean, expressive data pipelines.',
            vi: 'Minh họa cách kết hợp `zip`, `sorted(key=...)` và `enumerate` tạo thành luồng xử lý dữ liệu chuẩn mực và đẹp mắt.',
          },
        },
        keyTakeaways: {
          en: [
            'Comprehensions provide fast, scoped data transformation and filtering',
            'Use generator expressions to process massive streams with O(1) memory overhead',
            'Use `zip(..., strict=True)` to prevent silent bugs caused by uneven sequence lengths',
          ],
          vi: [
            'Comprehension giúp chuyển đổi và lọc dữ liệu nhanh, có scope riêng biệt',
            'Dùng generator expression để xử lý luồng dữ liệu khổng lồ với dung lượng RAM O(1)',
            'Dùng `zip(..., strict=True)` để phát hiện sớm lỗi khi các danh sách không khớp độ dài',
          ],
        },
      },
    ],
    chapterSummary: {
      mentalModels: {
        en: [
          'Comprehensions express mathematical set builder notation for collections',
          'Generators are lazy pipelines that yield values only when pulled by consumer loops',
          'Built-in sequence utilities encapsulate common looping patterns in optimized C code',
        ],
        vi: [
          'Comprehension biểu diễn toán học cho việc xây dựng và lọc tập hợp',
          'Generator là đường ống lười chỉ sinh giá trị khi vòng lặp phía ngoài kéo dữ liệu',
          'Các hàm tiện ích tích hợp sẵn đóng gói các mẫu lặp thông dụng bằng mã C tối ưu',
        ],
      },
      rules: {
        en: [
          'Keep comprehensions readable; avoid nesting more than 2 loops or conditions inside a single line',
          'Pass generator expressions directly to reducing functions (e.g. `sum(x for x in data)`)',
          'Always use `enumerate` instead of manual index incrementing (`i += 1`)',
        ],
        vi: [
          'Giữ comprehension dễ đọc; tránh lồng quá 2 vòng for hoặc điều kiện phức tạp trên 1 dòng',
          'Truyền trực tiếp generator expression vào các hàm tính tổng (`sum(x for x in data)`)',
          'Luôn dùng `enumerate` thay vì phải tự tạo biến đếm chỉ số `i += 1` thủ công',
        ],
      },
      commonTraps: {
        en: [
          'Using a list comprehension when only iterating once, wasting gigabytes of memory',
          'Forgetting that generators are single-use iterators that cannot be re-iterated once consumed',
        ],
        vi: [
          'Dùng list comprehension khi chỉ cần duyệt 1 lần, làm tốn hàng gigabyte RAM vô ích',
          'Quên rằng generator chỉ duyệt được MỘT LẦN duy nhất và sẽ rỗng ở các lần duyệt sau',
        ],
      },
      takeaway: {
        en: 'Combining comprehensions, generator expressions, and sequence tools forms the idiomatic foundation of modern, expressive Python programming.',
        vi: 'Kết hợp thuần thục comprehension, generator expression và các hàm tiện ích tạo nên nền tảng lập trình Python hiện đại, chuẩn mực và hiệu quả.',
      },
    },
    selfReview: [
      {
        question: {
          en: 'What is the key advantage of passing `sum(x**2 for x in numbers)` over `sum([x**2 for x in numbers])`?',
          vi: 'Lợi thế then chốt khi viết `sum(x**2 for x in numbers)` so với `sum([x**2 for x in numbers])` là gì?',
        },
        hint: {
          en: 'Consider intermediate list allocation in memory.',
          vi: 'Hãy nghĩ về việc cấp phát một danh sách trung gian trong bộ nhớ RAM.',
        },
        answer: {
          en: 'The list comprehension `[x**2 ...]` allocates a full list of all squares in memory before computing the sum, requiring `O(N)` memory. The generator expression `(x**2 ...)` yields one square at a time to `sum()`, operating in constant `O(1)` memory regardless of how many millions of items are processed.',
          vi: 'List comprehension `[x**2 ...]` phải cấp phát toàn bộ mảng số bình phương trên RAM trước khi tính tổng, tốn `O(N)` bộ nhớ. Trong khi đó, generator expression `(x**2 ...)` sinh từng số bình phương một cho hàm `sum()`, tiêu tốn bộ nhớ cố định `O(1)` dù xử lý hàng triệu phần tử.',
        },
      },
    ],
  },
];
