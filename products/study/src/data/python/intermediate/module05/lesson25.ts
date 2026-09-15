import { Lesson } from '../../../../types';

export const lesson25: Lesson = {
  id: 'py_lesson_25',
  moduleId: 'py_mod_10',
  levelId: 'intermediate',
  courseId: 'python',
  order: 25,
  topicId: 'python_automated_testing_pytest',
  title: {
    en: 'Automated Testing Fundamentals: Assertions, Test Functions & pytest',
    vi: 'Nền Tảng Kiểm Thử Tự Động: Câu Lệnh Assert, Hàm Test & pytest'
  },
  summary: {
    en: 'Master test-driven quality assurance in Python: plain assert statements, writing unit test functions (test_*), pytest test discovery, test fixtures (@pytest.fixture) for reusable state setup, exception validation with pytest.raises, and parameterized testing.',
    vi: 'Làm chủ kiểm thử phần mềm chất lượng cao trong Python: câu lệnh assert trực quan, viết các hàm unit test (test_*), cơ chế tự động tìm kiếm test của pytest, fixtures (@pytest.fixture) để tái sử dụng trạng thái mẫu, kiểm tra ngoại lệ với pytest.raises và kiểm thử tham số hóa.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Automated testing is fundamental to writing reliable, maintainable software. While Python includes a built-in `unittest` module, the industry standard framework is `pytest`. pytest eliminates boilerplate by leveraging Python\'s native `assert` statement, dynamic test discovery, and powerful composable fixtures.',
      vi: 'Kiểm thử tự động là nền tảng sống còn để xây dựng phần mềm ổn định và dễ bảo trì. Mặc dù Python có sẵn module `unittest`, nhưng `pytest` mới là tiêu chuẩn thực tế của ngành công nghiệp phần mềm. pytest loại bỏ code rườm rà bằng cách tận dụng trực tiếp câu lệnh `assert`, tự động phát hiện ca kiểm thử và hệ thống fixture tái sử dụng mạnh mẽ.'
    },
    conceptExplanation: {
      en: '1. Python\'s Native `assert` Statement:\n- Syntax: `assert condition, "Optional diagnostic failure message"`\n- If `condition` evaluates to `False`, Python raises an `AssertionError`.\n- pytest intercepts `assert` expressions and performs rich introspection (showing exact variable values on failure).\n\n2. Test Structure & Discovery Conventions:\n- Test files must be named `test_*.py` or `*_test.py`.\n- Test functions must start with the prefix `test_*()`.\n- Running `pytest` in terminal automatically discovers and executes all matching test files.\n\n3. Test Fixtures with `@pytest.fixture`:\n- Fixtures provide a modular way to set up sample data, mock database connections, or configure services.\n- Test functions request fixtures simply by declaring them as function arguments.\n\n4. Testing Exceptions with `pytest.raises`:\n- `with pytest.raises(ValueError) as exc_info:` verifies that a block of code raises the expected error.\n- `assert "Invalid input" in str(exc_info.value)` validates the exact error message.\n\n5. Parameterized Testing:\n- `@pytest.mark.parametrize("input_val, expected", [(1, 2), (2, 4), (3, 6)])` executes the same test logic over multiple distinct data sets.',
      vi: '1. Câu Lệnh `assert` Nguyên Bản Của Python:\n- Cú pháp: `assert điều_kiện, "Thông điệp chẩn đoán lỗi khi thất bại"`\n- Nếu `điều_kiện` là `False`, Python sẽ ném ra lỗi `AssertionError`.\n- pytest can thiệp vào câu lệnh `assert` để hiển thị chi tiết giá trị biến tại thời điểm gặp lỗi.\n\n2. Cấu Trúc & Quy Ước Tìm Kiếm Test:\n- Tệp kiểm thử phải có tên dạng `test_*.py` hoặc `*_test.py`.\n- Các hàm test phải có tiền tố `test_*()`.\n- Lệnh `pytest` trên terminal sẽ tự động quét và thực thi toàn bộ các file test hợp lệ.\n\n3. Quản Lý Dữ Liệu Mẫu Với `@pytest.fixture`:\n- Fixture cung cấp cách tiếp cận module để chuẩn bị dữ liệu mẫu, mock kết nối DB hoặc cấu hình dịch vụ.\n- Hàm test chỉ cần khai báo tên fixture vào danh sách tham số của mình để nhận dữ liệu.\n\n4. Kiểm Tra Ngoại Lệ Với `pytest.raises`:\n- `with pytest.raises(ValueError) as exc_info:` xác nhận khối lệnh có ném đúng lỗi mong đợi hay không.\n- `assert "Invalid input" in str(exc_info.value)` kiểm tra thông điệp lỗi chính xác.\n\n5. Kiểm Thử Tham Số Hóa (Parameterized Tests):\n- `@pytest.mark.parametrize("input_val, expected", [(1, 2), (2, 4)])` chạy cùng một hàm test trên nhiều bộ dữ liệu khác nhau.'
    },
    syntax: `import pytest

# Target domain logic to test
def calculate_discount(price: float, discount_percent: float) -> float:
    if price < 0 or not (0 <= discount_percent <= 100):
        raise ValueError("Invalid price or discount percentage")
    return round(price * (1 - discount_percent / 100), 2)

# 1. Pytest Fixture providing reusable test environment
@pytest.fixture
def sample_cart():
    return [
        {"item": "Laptop", "price": 1000.0},
        {"item": "Mouse", "price": 50.0}
    ]

# 2. Test functions with assert
def test_calculate_discount_standard():
    result = calculate_discount(100.0, 20.0)
    assert result == 80.0, "20% discount on $100 should be $80"

# 3. Testing expected exception failures
def test_calculate_discount_negative_price():
    with pytest.raises(ValueError) as exc_info:
        calculate_discount(-50.0, 10.0)
    assert "Invalid price" in str(exc_info.value)

# 4. Parameterized matrix testing
@pytest.mark.parametrize("price, pct, expected", [
    (100.0, 0.0, 100.0),
    (200.0, 50.0, 100.0),
    (99.99, 10.0, 89.99),
])
def test_discount_matrix(price, pct, expected):
    assert calculate_discount(price, pct) == expected`,
    examples: [
      {
        title: {
          en: 'Banking Transaction & Account Balance Unit Test Suite',
          vi: 'Bộ Unit Test Quản Lý Giao Dịch & Số Dư Tài Khoản Ngân Hàng'
        },
        code: `class BankAccount:
    def __init__(self, initial_balance: float = 0.0):
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")
        self.balance = initial_balance

    def deposit(self, amount: float) -> float:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount
        return self.balance

    def withdraw(self, amount: float) -> float:
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise RuntimeError("Insufficient funds")
        self.balance -= amount
        return self.balance

# Standalone test runner function demonstrating assertions
def run_account_tests():
    acc = BankAccount(100.0)
    assert acc.balance == 100.0
    acc.deposit(50.0)
    assert acc.balance == 150.0
    acc.withdraw(30.0)
    assert acc.balance == 120.0
    print("All bank account assertions passed successfully!")

run_account_tests()`,
        language: 'python',
        explanation: {
          en: 'Demonstrates assertions verifying state mutations, balance constraints, and transaction invariants.',
          vi: 'Minh họa các câu lệnh assert kiểm tra biến đổi trạng thái, ràng buộc số dư và tính đúng đắn của giao dịch.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Writing test functions without the `test_` prefix (pytest silently skips discovering them).',
          vi: 'Đặt tên hàm test không có tiền tố `test_` (pytest sẽ tự động bỏ qua và không chạy hàm đó).'
        },
        correction: {
          en: 'Always prefix test filenames with `test_*.py` and test functions with `test_*()`.',
          vi: 'Luôn đặt tên file bắt đầu bằng `test_*.py` và tên hàm bắt đầu bằng `test_*()`.'
        },
        code: `# Skipped: def verify_user_login(): ...\n# Discovered and run:\ndef test_user_login(): ...`
      },
      {
        mistake: {
          en: 'Using parenthesized assertions like `assert(a == b, "msg")` (evaluates as a non-empty tuple, which is always Truthy!).',
          vi: 'Viết assert kèm dấu ngoặc đơn `assert(a == b, "msg")` (Python sẽ coi đây là một tuple khác rỗng và luôn đánh giá là True!).'
        },
        correction: {
          en: 'Never put parentheses around the assert condition and message: `assert a == b, "msg"`.',
          vi: 'Không bao giờ đặt dấu ngoặc đơn bọc ngoài câu lệnh assert: `assert a == b, "msg"`.'
        },
        code: `# Critical Bug (Always Passes!):\n# assert(False, "Error")\n# Correct:\nassert False, "Error"`
      }
    ],
    tips: [
      {
        en: 'Use `pytest -v` for verbose test output showing each test name, and `pytest -k "test_name"` to run matching tests.',
        vi: 'Dùng `pytest -v` để hiển thị chi tiết tên từng bài test, và `pytest -k "tên_test"` để lọc bài test cần chạy.'
      },
      {
        en: '`pytest --cov=my_app` (via pytest-cov plugin) measures exact line and branch test coverage across your codebase.',
        vi: '`pytest --cov=my_app` (thông qua plugin pytest-cov) đo lường độ bao phủ mã nguồn (code coverage) chính xác đến từng dòng.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_30_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Simple Test Assertion Runner',
        vi: 'Bài tập 1: Trình Chạy Kiểm Thử Assert Đơn Giản'
      },
      instruction: {
        en: 'Write `verify_calculator(add_fn, mul_fn) -> bool` that runs three assertions: `add_fn(2, 3) == 5`, `add_fn(-1, 1) == 0`, and `mul_fn(4, 5) == 20`. Return `True` if all pass, or return `False` if any `AssertionError` is raised.',
        vi: 'Viết hàm `verify_calculator(add_fn, mul_fn) -> bool` thực hiện 3 câu lệnh assert: `add_fn(2, 3) == 5`, `add_fn(-1, 1) == 0`, và `mul_fn(4, 5) == 20`. Trả về `True` nếu tất cả đều đúng, hoặc trả về `False` nếu bắt được lỗi `AssertionError`.'
      },
      starterCode: `def verify_calculator(add_fn, mul_fn) -> bool:
    # TODO: Run assertions inside try-except
    pass`,
      solutionCode: `def verify_calculator(add_fn, mul_fn) -> bool:
    try:
        assert add_fn(2, 3) == 5
        assert add_fn(-1, 1) == 0
        assert mul_fn(4, 5) == 20
        return True
    except AssertionError:
        return False`,
      hint: {
        en: 'Use a `try...except AssertionError:` block wrapping the three `assert` statements.',
        vi: 'Dùng khối `try...except AssertionError:` bọc quanh 3 câu lệnh `assert`.'
      },
      explanation: {
        en: 'Demonstrates how `AssertionError` signals test failures when expressions evaluate to `False`.',
        vi: 'Minh họa cách `AssertionError` báo hiệu test thất bại khi biểu thức trả về `False`.'
      }
    },
    {
      id: 'py_30_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Input Validator with Exception Assertion',
        vi: 'Bài tập 2: Kiểm Tra Ngoại Lệ Đầu Vào'
      },
      instruction: {
        en: 'Write `validate_user_age(age: int) -> int` that returns `age` if `0 <= age <= 120`, or raises `ValueError("Age out of bounds")` otherwise.',
        vi: 'Viết hàm `validate_user_age(age: int) -> int` trả về `age` nếu `0 <= age <= 120`, ngược lại ném `ValueError("Age out of bounds")`.'
      },
      starterCode: `def validate_user_age(age: int) -> int:
    # TODO: Validate age bounds or raise ValueError
    pass`,
      solutionCode: `def validate_user_age(age: int) -> int:
    if not (0 <= age <= 120):
        raise ValueError("Age out of bounds")
    return age`,
      hint: {
        en: 'Check `if not (0 <= age <= 120): raise ValueError("Age out of bounds")`.',
        vi: 'Kiểm tra `if not (0 <= age <= 120): raise ValueError("Age out of bounds")`.'
      },
      explanation: {
        en: 'Boundary validation designed to be tested with `pytest.raises(ValueError)`.',
        vi: 'Kiểm tra biên dữ liệu được thiết kế để test bằng `pytest.raises(ValueError)`.'
      }
    }
  ],
  challenge: {
    id: 'py_30_challenge',
    title: {
      en: 'Custom Mini Test Runner Engine with Test Discovery & Reporting',
      vi: 'Bộ Khung Chạy Test Thu Nhỏ Tự Động Tìm Kiếm & Báo Cáo'
    },
    description: {
      en: 'Implement `run_test_suite(test_functions: list[tuple[str, callable]]) -> dict` where each entry is `(test_name, fn)`. Execute each test function. If it runs without raising any exception, record `"passed"`. If it raises `AssertionError`, record `"failed"`. If it raises any other exception, record `"error"`. Return `{"total": int, "passed": int, "failed": int, "errors": int, "details": dict[str, str]}`.',
      vi: 'Xây dựng hàm `run_test_suite(test_functions: list[tuple[str, callable]]) -> dict` trong đó mỗi phần tử là `(test_name, fn)`. Thực thi từng hàm test. Nếu chạy thành công không có lỗi, ghi nhận `"passed"`. Nếu ném `AssertionError`, ghi nhận `"failed"`. Nếu ném lỗi khác, ghi nhận `"error"`. Trả về `{"total": int, "passed": int, "failed": int, "errors": int, "details": dict[str, str]}`.'
    },
    requirements: [
      {
        en: 'Iterate over test functions and run each inside a structured try-except block',
        vi: 'Lặp qua các hàm test và chạy từng hàm trong khối try-except có cấu trúc'
      },
      {
        en: 'Catch AssertionError as FAILED and other Exceptions as ERROR',
        vi: 'Bắt lỗi AssertionError thành FAILED và các Exception khác thành ERROR'
      },
      {
        en: 'Aggregate total counts and per-test status details in return dictionary',
        vi: 'Tổng hợp số lượng bài test và chi tiết trạng thái trong dictionary trả về'
      }
    ],
    starterCode: `def run_test_suite(test_functions: list[tuple[str, callable]]) -> dict:
    # TODO: Execute test suite and return aggregate report
    pass`,
    solutionCode: `def run_test_suite(test_functions: list[tuple[str, callable]]) -> dict:
    passed = 0
    failed = 0
    errors = 0
    details = {}
    
    for name, fn in test_functions:
        try:
            fn()
            passed += 1
            details[name] = "PASSED"
        except AssertionError:
            failed += 1
            details[name] = "FAILED"
        except Exception as e:
            errors += 1
            details[name] = f"ERROR: {type(e).__name__}"
            
    return {
        "total": len(test_functions),
        "passed": passed,
        "failed": failed,
        "errors": errors,
        "details": details
    }`,
    hints: [
      {
        en: 'Catch AssertionError specifically before catching generic Exception.',
        vi: 'Bắt lỗi AssertionError cụ thể trước khi bắt Exception chung.'
      }
    ],
    solutionExplanation: {
      en: 'Emulates basic test runner lifecycle mechanics powering frameworks like pytest.',
      vi: 'Mô phỏng cơ chế vận hành vòng đời kiểm thử cốt lõi của các framework như pytest.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_30_q1',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'easy',
      question: {
        en: 'What exception is raised when a Python `assert` condition evaluates to `False`?',
        vi: 'Ngoại lệ nào được ném ra khi điều kiện của câu lệnh `assert` trong Python trả về `False`?'
      },
      options: [
        { en: '`ValueError`', vi: '`ValueError`' },
        { en: '`AssertionError`', vi: '`AssertionError`' },
        { en: '`TypeError`', vi: '`TypeError`' },
        { en: '`TestFailureException`', vi: '`TestFailureException`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python raises `AssertionError` whenever an `assert` expression evaluates to a falsy value.',
        vi: 'Python ném lỗi `AssertionError` bất cứ khi nào biểu thức `assert` có giá trị falsy.'
      }
    },
    {
      id: 'py_30_q2',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'easy',
      question: {
        en: 'What naming convention does `pytest` use by default to automatically discover test functions?',
        vi: 'Quy ước đặt tên nào được `pytest` sử dụng mặc định để tự động tìm kiếm các hàm test?'
      },
      options: [
        { en: 'Functions starting with `test_*`', vi: 'Các hàm bắt đầu bằng `test_*`' },
        { en: 'Functions ending with `_check`', vi: 'Các hàm kết thúc bằng `_check`' },
        { en: 'Functions decorated with `@main`', vi: 'Các hàm có decorator `@main`' },
        { en: 'Any function inside a `tests` directory regardless of name', vi: 'Mọi hàm trong thư mục `tests` bất kể tên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'pytest automatically discovers functions prefixed with `test_` inside `test_*.py` files.',
        vi: 'pytest tự động quét và chạy các hàm có tiền tố `test_` nằm trong tệp `test_*.py`.'
      }
    },
    {
      id: 'py_30_q3',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'medium',
      question: {
        en: 'What decorator in pytest is used to create reusable setup/teardown data fixtures for tests?',
        vi: 'Decorator nào trong pytest được dùng để tạo các fixture dữ liệu mẫu tái sử dụng cho test?'
      },
      options: [
        { en: '`@pytest.setup`', vi: '`@pytest.setup`' },
        { en: '`@pytest.fixture`', vi: '`@pytest.fixture`' },
        { en: '`@pytest.mock`', vi: '`@pytest.mock`' },
        { en: '`@pytest.data`', vi: '`@pytest.data`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`@pytest.fixture` defines fixture functions that inject dependencies into test arguments.',
        vi: '`@pytest.fixture` định nghĩa các hàm fixture để tiêm dữ liệu mẫu vào tham số của hàm test.'
      }
    },
    {
      id: 'py_30_q4',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'medium',
      question: {
        en: 'How do you verify that a function raises a `KeyError` using `pytest`?',
        vi: 'Làm thế nào để kiểm tra xem một hàm có ném ra lỗi `KeyError` bằng `pytest`?'
      },
      options: [
        { en: '`assert raises(KeyError, func)`', vi: '`assert raises(KeyError, func)`' },
        { en: '`with pytest.raises(KeyError): func()`', vi: '`with pytest.raises(KeyError): func()`' },
        { en: '`pytest.expect_error(KeyError, func)`', vi: '`pytest.expect_error(KeyError, func)`' },
        { en: '`try: func() except KeyError: pass`', vi: '`try: func() except KeyError: pass`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`with pytest.raises(ExpectedException):` is the idiomatic context manager for exception assertions.',
        vi: '`with pytest.raises(ExpectedException):` là context manager chuẩn mực để kiểm tra lỗi ngoại lệ.'
      }
    },
    {
      id: 'py_30_q5',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'hard',
      question: {
        en: 'Why is `assert (x == y, "error message")` considered a critical testing bug in Python?',
        vi: 'Tại sao `assert (x == y, "error message")` bị coi là một lỗi kiểm thử nghiêm trọng trong Python?'
      },
      options: [
        { en: 'It raises a SyntaxError', vi: 'Nó sẽ gây lỗi SyntaxError' },
        { en: 'It evaluates a 2-tuple, which is non-empty and always Truthy, so the assert never fails even if x != y', vi: 'Nó tạo ra một 2-tuple khác rỗng và luôn là Truthy, khiến câu lệnh assert không bao giờ fail ngay cả khi x != y' },
        { en: 'It makes the test run twice', vi: 'Nó làm bài test chạy 2 lần' },
        { en: 'It deletes variables x and y', vi: 'Nó xóa biến x và y' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'In Python, `assert (a, b)` tests the truthiness of the tuple `(a, b)`, which is always `True`. Use `assert a, b` without outer parentheses.',
        vi: 'Trong Python, `assert (a, b)` kiểm tra tính Truthy của tuple `(a, b)`, vốn luôn là `True`. Hãy dùng `assert a, b` không có ngoặc ngoài.'
      }
    },
    {
      id: 'py_30_q6',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'medium',
      question: {
        en: 'Which pytest decorator enables running a single test function across multiple sets of input parameters?',
        vi: 'Decorator nào trong pytest cho phép chạy một hàm test trên nhiều bộ tham số đầu vào khác nhau?'
      },
      options: [
        { en: '`@pytest.mark.loop`', vi: '`@pytest.mark.loop`' },
        { en: '`@pytest.mark.parametrize`', vi: '`@pytest.mark.parametrize`' },
        { en: '`@pytest.matrix`', vi: '`@pytest.matrix`' },
        { en: '`@pytest.repeat`', vi: '`@pytest.repeat`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`@pytest.mark.parametrize("args", [tuples])` runs test iterations over parameter collections.',
        vi: '`@pytest.mark.parametrize("args", [tuples])` chạy lặp bài test trên các tập tham số truyền vào.'
      }
    },
    {
      id: 'py_30_q7',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'easy',
      question: {
        en: 'What command executes the pytest test suite in verbose mode?',
        vi: 'Lệnh nào thực thi bộ kiểm thử pytest ở chế độ chi tiết (verbose)?'
      },
      options: [
        { en: '`pytest --all`', vi: '`pytest --all`' },
        { en: '`pytest -v`', vi: '`pytest -v`' },
        { en: '`pytest --debug`', vi: '`pytest --debug`' },
        { en: '`python test.py`', vi: '`python test.py`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`pytest -v` (or `--verbose`) lists every individual test function and its pass/fail status.',
        vi: '`pytest -v` (hoặc `--verbose`) liệt kê chi tiết từng hàm test và trạng thái pass/fail.'
      }
    },
    {
      id: 'py_30_q8',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'medium',
      question: {
        en: 'How can a pytest fixture perform cleanup/teardown actions after a test finishes running?',
        vi: 'Làm thế nào để một pytest fixture thực hiện dọn dẹp tài nguyên (teardown) sau khi bài test kết thúc?'
      },
      options: [
        { en: 'Use the `yield` statement inside the fixture (code before `yield` is setup, code after is teardown)', vi: 'Sử dụng câu lệnh `yield` trong fixture (mã trước `yield` là setup, mã sau `yield` là teardown)' },
        { en: 'Call `pytest.cleanup()`', vi: 'Gọi `pytest.cleanup()`' },
        { en: 'Define a separate `__del__` method', vi: 'Định nghĩa hàm `__del__` riêng' },
        { en: 'Fixtures cannot clean up resources', vi: 'Fixture không thể dọn dẹp tài nguyên' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Yield fixtures allow setup logic before `yield` and guarantee teardown execution after the test completes.',
        vi: 'Yield fixture cho phép chạy logic setup trước lệnh `yield` và đảm bảo chạy mã dọn dẹp sau khi bài test kết thúc.'
      }
    },
    {
      id: 'py_30_q9',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'easy',
      question: {
        en: 'What flag in pytest halts the test run immediately upon encountering the very first failure?',
        vi: 'Cờ tùy chọn nào trong pytest dừng ngay lập tức toàn bộ quá trình chạy test khi gặp lỗi đầu tiên?'
      },
      options: [
        { en: '`-x` (or `--exitfirst`)', vi: '`-x` (hoặc `--exitfirst`)' },
        { en: '`--stop`', vi: '`--stop`' },
        { en: '`-q`', vi: '`-q`' },
        { en: '`--abort`', vi: '`--abort`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`pytest -x` exits immediately on the first test failure to speed up iterative debugging.',
        vi: '`pytest -x` thoát ngay khi gặp bài test đầu tiên thất bại để tiết kiệm thời gian debug.'
      }
    },
    {
      id: 'py_30_q10',
      type: 'single_choice',
      topicId: 'python_packaging_pytest',
      difficulty: 'medium',
      question: {
        en: 'What is the primary benefit of testing code with small, isolated unit tests?',
        vi: 'Lợi ích chính của việc kiểm thử mã nguồn bằng các bài unit test nhỏ và độc lập là gì?'
      },
      options: [
        { en: 'It reduces the total lines of code in the project', vi: 'Giúp giảm tổng số dòng code của dự án' },
        { en: 'It rapidly pinpoints the exact component causing defects and prevents regressions during refactoring', vi: 'Nhanh chóng khoanh vùng chính xác thành phần gây lỗi và ngăn ngừa lỗi tái phát (regressions) khi tái cấu trúc code' },
        { en: 'It replaces the need for type annotations', vi: 'Thay thế hoàn toàn sự cần thiết của type annotation' },
        { en: 'It automatically formats Python code according to PEP 8', vi: 'Tự động định dạng code theo chuẩn PEP 8' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Isolated unit tests provide confidence during refactoring by instantly catching breaking behavioral changes.',
        vi: 'Unit test độc lập mang lại sự tự tin khi tái cấu trúc code bằng cách phát hiện ngay lập tức các thay đổi làm gãy hệ thống.'
      }
    }
  ]
};
