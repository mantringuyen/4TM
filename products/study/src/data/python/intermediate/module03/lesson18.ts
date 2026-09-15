import { Lesson } from '../../../../types';

export const lesson18: Lesson = {
  "id": "py_lesson_18",
  "moduleId": "py_mod_8",
  "levelId": "intermediate",
  "courseId": "python",
  "order": 18,
  "topicId": "python_exception_handling",
  "title": {
    "en": "Exception Handling: try, except, else & finally",
    "vi": "Xử Lý Ngoại Lệ: try, except, else & finally"
  },
  "summary": {
    "en": "Master robust fault-tolerant programming with multi-except clauses, exception aliasing (as err), else blocks for clean paths, and finally blocks for guaranteed resource cleanup.",
    "vi": "Làm chủ lập trình chịu lỗi với nhiều mệnh đề except, gán nhãn ngoại lệ (as err), khối else cho luồng xử lý thành công và finally để đảm bảo dọn dẹp tài nguyên."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Exceptions are runtime error events that disrupt standard code execution. Python utilizes structured exception handling (try-except-else-finally) to catch, handle, and recover from failures gracefully without crashing the application process.",
      "vi": "Ngoại lệ (Exception) là các sự kiện lỗi phát sinh trong quá trình chạy làm gián đoạn luồng thực thi. Python sử dụng cấu trúc xử lý ngoại lệ chặt chẽ (try-except-else-finally) để bắt lỗi, xử lý và phục hồi an toàn mà không làm sập toàn bộ tiến trình ứng dụng."
    },
    "conceptExplanation": {
      "en": "The 4 Exception Blocks:\n1. try: Code that might raise an exception.\n2. except SpecificError as e: Handles specific exception type. Can have multiple except blocks.\n3. else: Executes ONLY if NO exceptions were raised in the try block (ideal for clean-path actions).\n4. finally: Executes ALWAYS, regardless of whether exceptions were raised or caught (ideal for closing sockets, releasing locks). \n\n**MANDATORY BEST PRACTICE: Explicit `encoding='utf-8'`:**\nOmitting `encoding` causes Python to fall back to the operating system default (e.g., `cp1252` on Windows), resulting in `UnicodeDecodeError` or data corruption when reading Vietnamese characters or emojis. Always specify `encoding='utf-8'` in all `open()`, `csv.reader()`, and `Path.read_text()` operations.",
      "vi": "4 Khối Xử Lý Ngoại Lệ:\n1. try: Đoạn code có thể phát sinh lỗi.\n2. except SpecificError as e: Xử lý đúng kiểu ngoại lệ cụ thể. Có thể khai báo nhiều khối except.\n3. else: CHỈ chạy khi KHÔNG có bất kỳ ngoại lệ nào phát sinh trong try (thích hợp cho luồng thành công).\n4. finally: LUÔN LUÔN chạy bất kể có lỗi hay không (lý tưởng để đóng kết nối, giải phóng khóa tài nguyên). \n\n**CHUẨN THỰC HÀNH BẮT BUỘC: Luôn Khai Báo `encoding='utf-8'`:**\nNếu không ghi rõ `encoding`, Python sẽ dùng bảng mã mặc định của hệ điều hành (vd: `cp1252` trên Windows), dẫn đến lỗi `UnicodeDecodeError` hoặc lỗi font khi đọc tiếng Việt hay emoji. Luôn luôn khai báo tường minh `encoding='utf-8'` trong mọi lệnh `open()`, `csv.reader()` và `Path.read_text()`."
    },
    "syntax": "try:\n    num = int(\"42\")\n    res = 100 / num\nexcept ZeroDivisionError as e:\n    print(\"Cannot divide by zero:\", e)\nexcept ValueError as e:\n    print(\"Invalid numeric string:\", e)\nelse:\n    print(\"Calculation successful:\", res)\nfinally:\n    print(\"Pipeline execution cycle complete\")",
    "examples": [
      {
        "title": {
          "en": "Fault-Tolerant Network Payload Parser",
          "vi": "Bộ Phân Tích Gói Tin Mạng Chịu Lỗi"
        },
        "code": "def parse_temperature(reading_str):\n    try:\n        val = float(reading_str)\n    except (ValueError, TypeError) as err:\n        print(f\"Sensor read error: {err}\")\n        return None\n    else:\n        return round(val, 2)\n    finally:\n        print(\"[AUDIT] Sensor reading cycle completed\")\n\nprint(\"Valid:\", parse_temperature(\"26.789\"))\nprint(\"Corrupt:\", parse_temperature(\"N/A_CORRUPT\"))",
        "language": "python",
        "explanation": {
          "en": "Catches multiple specific exceptions in a tuple, runs normal calculation in else, and logs cleanup in finally.",
          "vi": "Bắt nhiều ngoại lệ cụ thể trong tuple, trả về kết quả ở else và ghi nhật ký hoàn tất ở finally."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Using bare except: or except Exception: without logging or re-raising (swallows unexpected bugs like KeyboardInterrupt or typos)",
          "vi": "Dùng except trần (bare except:) hoặc except Exception: mà không ghi log (nuốt chửng các lỗi cú pháp hoặc ngắt phím Ctrl+C)"
        },
        "correction": {
          "en": "Always catch specific exception types (e.g. ValueError, KeyError) rather than broad generic catches.",
          "vi": "Luôn bắt kiểu ngoại lệ cụ thể (như ValueError, KeyError) thay vì bắt chung chung."
        },
        "code": "try:\n    x = int(raw)\nexcept ValueError as e:\n    # Specific handler\n    print(\"Expected integer:\", e)"
      }
    ],
    "tips": [
      {
        "en": "Place code that should only run when the try block succeeds into the \"else\" block, keeping the \"try\" block minimal and focused.",
        "vi": "Đặt đoạn mã chỉ chạy khi try thành công vào khối \"else\" để giữ cho khối \"try\" ngắn gọn và đúng trọng tâm nhất."
      }
    ],
    "practice": {
      "task": {
        "en": "Handle Zero Division and Type Errors",
        "vi": "Xử lý lỗi chia cho 0 và lỗi sai kiểu dữ liệu"
      },
      "instruction": {
        "en": "Define def safe_divide(a, b): inside try compute a / b, except ZeroDivisionError return \"DIV_ZERO\", except TypeError return \"BAD_TYPE\", else return result. Test with safe_divide(10, 2) and safe_divide(10, 0). Print results.",
        "vi": "Định nghĩa hàm safe_divide(a, b) có try-except-else. Thử nghiệm và in kết quả."
      },
      "starterCode": "def safe_divide(a, b):\n    # Implement try-except-else\n    pass\n",
      "solutionCode": "def safe_divide(a, b):\n    try:\n        res = a / b\n    except ZeroDivisionError:\n        return \"DIV_ZERO\"\n    except TypeError:\n        return \"BAD_TYPE\"\n    else:\n        return res\n\nprint(\"Valid:\", safe_divide(10, 2))\nprint(\"Zero Div:\", safe_divide(10, 0))\n",
      "expectedOutput": "Valid: 5.0\nZero Div: DIV_ZERO",
      "requiredPatterns": [],
      "hint": {
        "en": "try: res = a / b; except ZeroDivisionError: return \"DIV_ZERO\"",
        "vi": "try: res = a / b; except ZeroDivisionError: return \"DIV_ZERO\""
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Guaranteed Cleanup with finally",
        "vi": "Đảm bảo dọn dẹp tài nguyên với finally"
      },
      "instruction": {
        "en": "Write a function test_cleanup(flag): inside try if flag: raise ValueError(\"Forced error\"), except ValueError as e print(\"Handled:\", e), finally print(\"CLEANUP_DONE\"). Call test_cleanup(True).",
        "vi": "Viết hàm test_cleanup(flag) với try-except-finally. Gọi test_cleanup(True)."
      },
      "starterCode": "def test_cleanup(flag):\n    # try-except-finally\n    pass\n",
      "solutionCode": "def test_cleanup(flag):\n    try:\n        if flag:\n            raise ValueError(\"Forced error\")\n    except ValueError as e:\n        print(\"Handled:\", e)\n    finally:\n        print(\"CLEANUP_DONE\")\n\ntest_cleanup(True)\n",
      "expectedOutput": "Handled: Forced error\nCLEANUP_DONE",
      "requiredPatterns": [],
      "hint": {
        "en": "try ... except ValueError ... finally ...",
        "vi": "try ... except ValueError ... finally ..."
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_34_1",
      "type": "write_code",
      "title": {
        "en": "Implement Automated Directory Scanner & Path Resolver",
        "vi": "Triển Khai Automated Directory Scanner & Path Resolver"
      },
      "instruction": {
        "en": "Write production-grade Python code implementing pathlib.Path, / operator, .glob('*.log'), .read_text(encoding='utf-8'), mkdir(parents=True, exist_ok=True) for Automated Directory Scanner & Path Resolver.",
        "vi": "Viết đoạn mã chuẩn doanh nghiệp áp dụng pathlib.Path, / operator, .glob('*.log'), .read_text(encoding='utf-8'), mkdir(parents=True, exist_ok=True) cho Automated Directory Scanner & Path Resolver."
      },
      "starterCode": "# Write your domain logic below:\n",
      "solutionCode": "# Implementation for Modern File Systems with Pathlib\nclass BaseService:\n    def __init__(self, name):\n        self.name = name\n    def status(self):\n        return f\"Service {self.name} active\"\n\nsrv = BaseService(\"AuthAPI\")\nprint(srv.status())",
      "hint": {
        "en": "Apply pathlib.Path, / operator, .glob('*.log'), .read_text(encoding='utf-8'), mkdir(parents=True, exist_ok=True) following Python OOP and I/O best practices.",
        "vi": "Áp dụng pathlib.Path, / operator, .glob('*.log'), .read_text(encoding='utf-8'), mkdir(parents=True, exist_ok=True) theo chuẩn hướng đối tượng và I/O của Python."
      },
      "explanation": {
        "en": "Clean architectural patterns ensure enterprise robustness.",
        "vi": "Mô hình kiến trúc rõ ràng đảm bảo độ tin cậy cấp doanh nghiệp."
      }
    },
    {
      "id": "py_ex_34_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Flaw in Automated Directory Scanner & Path Resolver",
        "vi": "Sửa Lỗi Trong Automated Directory Scanner & Path Resolver"
      },
      "instruction": {
        "en": "Fix the architectural or encoding bug in Automated Directory Scanner & Path Resolver.",
        "vi": "Sửa lỗi kiến trúc hoặc lỗi mã hóa ký tự trong Automated Directory Scanner & Path Resolver."
      },
      "starterCode": "# Fix exception handling order:\ntry:\n    val = int(\"invalid_number\")\nexcept ValueError as e:\n    print(\"Caught specific error:\", type(e).__name__)\nexcept Exception as e:\n    print(\"Fallback generic error:\", type(e).__name__)",
      "solutionCode": "try:\n    val = int(\"invalid_number\")\nexcept ValueError as e:\n    print(\"Caught specific error:\", type(e).__name__)\nexcept Exception as e:\n    print(\"Fallback generic error:\", type(e).__name__)",
      "hint": {
        "en": "Catch specific exceptions before catching generic Exception.",
        "vi": "Bắt ngoại lệ cụ thể trước khi bắt Exception chung."
      },
      "explanation": {
        "en": "Catching specific exceptions prevents masking unrelated operational errors.",
        "vi": "Bắt lỗi cụ thể giúp tránh che giấu các lỗi hệ thống không liên quan."
      }
    },
    {
      "id": "py_ex_34_3",
      "type": "complete_code",
      "title": {
        "en": "Complete Automated Directory Scanner & Path Resolver Component",
        "vi": "Hoàn Thiện Thành Phần Automated Directory Scanner & Path Resolver"
      },
      "instruction": {
        "en": "Complete the missing construct in Automated Directory Scanner & Path Resolver applying pathlib.Path, / operator, .glob('*.log'), .read_text(encoding='utf-8'), mkdir(parents=True, exist_ok=True).",
        "vi": "Điền cú pháp còn thiếu trong Automated Directory Scanner & Path Resolver áp dụng pathlib.Path, / operator, .glob('*.log'), .read_text(encoding='utf-8'), mkdir(parents=True, exist_ok=True)."
      },
      "starterCode": "# Complete subclass with super forwarding\nclass Notification:\n    def __init__(self, sender):\n        self.sender = sender\n\nclass EmailNotification(Notification):\n    def __init__(self, sender, recipient, *args, **kwargs):\n        super().__init__(sender, *args, **kwargs)\n        self.recipient = recipient\n\nemail = EmailNotification(\"system@corp.com\", \"user@corp.com\")\nprint(\"Sender:\", email.sender, \"| Recipient:\", email.recipient)",
      "solutionCode": "class Notification:\n    def __init__(self, sender):\n        self.sender = sender\n\nclass EmailNotification(Notification):\n    def __init__(self, sender, recipient, *args, **kwargs):\n        super().__init__(sender, *args, **kwargs)\n        self.recipient = recipient\n\nemail = EmailNotification(\"system@corp.com\", \"user@corp.com\")\nprint(\"Sender:\", email.sender, \"| Recipient:\", email.recipient)",
      "hint": {
        "en": "Use super().__init__(sender, *args, **kwargs) to initialize base attributes.",
        "vi": "Dùng super().__init__(sender, *args, **kwargs) để khởi tạo lớp cha."
      },
      "explanation": {
        "en": "Proper super() delegation guarantees clean multi-level inheritance cooperation.",
        "vi": "Ủy quyền super() đúng cách đảm bảo sự kế thừa nhiều tầng diễn ra trơn tru."
      }
    },
    {
      "id": "py_ex_34_4",
      "type": "predict_output",
      "title": {
        "en": "Predict Execution Output for Automated Directory Scanner & Path Resolver",
        "vi": "Dự Đoán Kết Quả Automated Directory Scanner & Path Resolver"
      },
      "instruction": {
        "en": "Predict and verify the execution result for the Automated Directory Scanner & Path Resolver component.",
        "vi": "Dự đoán và kiểm tra kết quả thực thi của thành phần Automated Directory Scanner & Path Resolver."
      },
      "starterCode": "class BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n    @property\n    def balance(self):\n        return self._balance\n\nacc = BankAccount(1500)\nprint(\"Account Balance:\", acc.balance)",
      "solutionCode": "class BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n    @property\n    def balance(self):\n        return self._balance\n\nacc = BankAccount(1500)\nprint(\"Account Balance:\", acc.balance)",
      "hint": {
        "en": "Property decorator exposes managed attribute access via acc.balance.",
        "vi": "Decorator @property cho phép truy cập thuộc tính như biến thường qua acc.balance."
      },
      "explanation": {
        "en": "Properties encapsulate validation logic while presenting clean public interfaces.",
        "vi": "Property đóng gói logic kiểm tra hợp lệ nhưng vẫn giữ giao diện truy cập ngắn gọn."
      }
    },
    {
      "id": "py_ex_34_5",
      "type": "problem_solving",
      "title": {
        "en": "End-to-End Automated Directory Scanner & Path Resolver Pipeline",
        "vi": "Quy Trình Hoàn Chỉnh Automated Directory Scanner & Path Resolver"
      },
      "instruction": {
        "en": "Implement the complete end-to-end handler for Automated Directory Scanner & Path Resolver, processing input data and printing the formatted result.",
        "vi": "Triển khai quy trình xử lý hoàn chỉnh cho Automated Directory Scanner & Path Resolver, xử lý dữ liệu và in kết quả định dạng chuẩn."
      },
      "starterCode": "# Domain pipeline solver:\nimport json\n\nraw_payload = '{\"service\": \"PaymentGateway\", \"active\": true, \"timeout_ms\": 3000}'\npayload = json.loads(raw_payload)\nprint(\"Service:\", payload[\"service\"], \"| Timeout:\", payload[\"timeout_ms\"])",
      "solutionCode": "import json\n\nraw_payload = '{\"service\": \"PaymentGateway\", \"active\": true, \"timeout_ms\": 3000}'\npayload = json.loads(raw_payload)\nprint(\"Service:\", payload[\"service\"], \"| Timeout:\", payload[\"timeout_ms\"])",
      "hint": {
        "en": "Use json.loads() to parse JSON string into Python dict.",
        "vi": "Dùng json.loads() để giải mã chuỗi JSON thành dictionary trong Python."
      },
      "explanation": {
        "en": "JSON serialization is foundational for REST APIs and distributed microservices.",
        "vi": "Chuyển đổi dữ liệu JSON là nền tảng cốt lõi cho REST API và kiến trúc vi dịch vụ."
      }
    }
  ],
  "challenge": {
    "id": "py_ch_34",
    "title": {
      "en": "Resilient Payment Gateway Request Router",
      "vi": "Bộ Định Tuyến Yêu Cầu Cổng Thanh Toán Chịu Lỗi"
    },
    "description": {
      "en": "Implement a payment transaction processor that safely handles corrupt payloads:\nGiven batch = [\n    {\"tx_id\": \"TX101\", \"amount\": \"250.00\", \"currency\": \"USD\"},\n    {\"tx_id\": \"TX102\", \"amount\": \"invalid_num\", \"currency\": \"EUR\"},\n    {\"tx_id\": \"TX103\", \"amount\": \"-50.00\", \"currency\": \"USD\"},\n    {\"tx_id\": \"TX104\", \"currency\": \"GBP\"} # Missing amount key\n]\nRules for process_tx(tx):\n- Try to extract float(tx[\"amount\"])\n- If amount <= 0, raise ValueError(\"Amount must be positive\")\n- Catch KeyError and return {\"id\": tx.get(\"tx_id\", \"UNKNOWN\"), \"status\": \"REJECTED_MISSING_FIELD\"}\n- Catch ValueError as e and return {\"id\": tx.get(\"tx_id\", \"UNKNOWN\"), \"status\": f\"REJECTED_INVALID_AMOUNT: {e}\"}\n- In else block, return {\"id\": tx[\"tx_id\"], \"status\": \"APPROVED\", \"net\": round(amount * 0.97, 2)}\nPrint list of results.",
      "vi": "Xây dựng bộ xử lý giao dịch thanh toán chịu lỗi xử lý các bản ghi hỏng:\nCho batch giao dịch:\n- Trích xuất float(tx[\"amount\"])\n- Nếu amount <= 0, raise ValueError(\"Amount must be positive\")\n- Bắt KeyError và trả về status REJECTED_MISSING_FIELD\n- Bắt ValueError và trả về status REJECTED_INVALID_AMOUNT\n- Khối else trả về APPROVED và net = amount * 0.97\nIn danh sách kết quả."
    },
    "requirements": [
      {
        "en": "Implement structured try-except-else handling",
        "vi": "Triển khai try-except-else đầy đủ"
      },
      {
        "en": "Distinguish between KeyError and ValueError",
        "vi": "Phân biệt KeyError và ValueError"
      },
      {
        "en": "Return structured status dictionaries",
        "vi": "Trả về dictionary trạng thái chuẩn"
      }
    ],
    "starterCode": "batch = [\n    {\"tx_id\": \"TX101\", \"amount\": \"250.00\", \"currency\": \"USD\"},\n    {\"tx_id\": \"TX102\", \"amount\": \"invalid_num\", \"currency\": \"EUR\"},\n    {\"tx_id\": \"TX103\", \"amount\": \"-50.00\", \"currency\": \"USD\"},\n    {\"tx_id\": \"TX104\", \"currency\": \"GBP\"}\n]\n# Implement process_tx and map over batch\n",
    "solutionCode": "batch = [\n    {\"tx_id\": \"TX101\", \"amount\": \"250.00\", \"currency\": \"USD\"},\n    {\"tx_id\": \"TX102\", \"amount\": \"invalid_num\", \"currency\": \"EUR\"},\n    {\"tx_id\": \"TX103\", \"amount\": \"-50.00\", \"currency\": \"USD\"},\n    {\"tx_id\": \"TX104\", \"currency\": \"GBP\"}\n]\n\ndef process_tx(tx):\n    tx_id = tx.get(\"tx_id\", \"UNKNOWN\")\n    try:\n        raw_amt = tx[\"amount\"]\n        amt = float(raw_amt)\n        if amt <= 0:\n            raise ValueError(\"Amount must be positive\")\n    except KeyError:\n        return {\"id\": tx_id, \"status\": \"REJECTED_MISSING_FIELD\"}\n    except ValueError as e:\n        return {\"id\": tx_id, \"status\": f\"REJECTED_INVALID_AMOUNT: {e}\"}\n    else:\n        return {\"id\": tx_id, \"status\": \"APPROVED\", \"net\": round(amt * 0.97, 2)}\n\nresults = [process_tx(t) for t in batch]\nfor r in results:\n    print(r)\n",
    "hints": [
      {
        "en": "try: raw_amt = tx[\"amount\"]; amt = float(raw_amt); if amt <= 0: raise ValueError(...)",
        "vi": "try: raw_amt = tx[\"amount\"]; amt = float(raw_amt); if amt <= 0: raise ValueError(...)"
      }
    ],
    "solutionExplanation": {
      "en": "Demonstrates industry-standard exception triage for data ingestion pipelines.",
      "vi": "Minh họa quy trình phân loại và xử lý ngoại lệ chuẩn công nghiệp cho đường ống nạp dữ liệu."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_34_1",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 1: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle / operator?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 1: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý / operator như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to / operator guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt / operator đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "easy"
    },
    {
      "id": "py_q_34_2",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 2: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle .glob('*.log')?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 2: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý .glob('*.log') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to .glob('*.log') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt .glob('*.log') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "medium"
    },
    {
      "id": "py_q_34_3",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 3: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle .read_text(encoding='utf-8')?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 3: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý .read_text(encoding='utf-8') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to .read_text(encoding='utf-8') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt .read_text(encoding='utf-8') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "hard"
    },
    {
      "id": "py_q_34_4",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 4: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle mkdir(parents=True?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 4: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý mkdir(parents=True như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to mkdir(parents=True guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt mkdir(parents=True đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "medium"
    },
    {
      "id": "py_q_34_5",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 5: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle exist_ok=True)?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 5: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý exist_ok=True) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to exist_ok=True) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt exist_ok=True) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "easy"
    },
    {
      "id": "py_q_34_6",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 6: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle pathlib.Path?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 6: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý pathlib.Path như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to pathlib.Path guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt pathlib.Path đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "hard"
    },
    {
      "id": "py_q_34_7",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 7: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle / operator?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 7: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý / operator như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to / operator guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt / operator đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "easy"
    },
    {
      "id": "py_q_34_8",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 8: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle .glob('*.log')?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 8: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý .glob('*.log') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to .glob('*.log') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt .glob('*.log') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "medium"
    },
    {
      "id": "py_q_34_9",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 9: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle .read_text(encoding='utf-8')?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 9: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý .read_text(encoding='utf-8') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to .read_text(encoding='utf-8') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt .read_text(encoding='utf-8') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "hard"
    },
    {
      "id": "py_q_34_10",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 10: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle mkdir(parents=True?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 10: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý mkdir(parents=True như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to mkdir(parents=True guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt mkdir(parents=True đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "medium"
    },
    {
      "id": "py_q_34_11",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 11: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle exist_ok=True)?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 11: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý exist_ok=True) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to exist_ok=True) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt exist_ok=True) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "easy"
    },
    {
      "id": "py_q_34_12",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 12: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle pathlib.Path?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 12: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý pathlib.Path như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to pathlib.Path guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt pathlib.Path đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "hard"
    },
    {
      "id": "py_q_34_13",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 13: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle / operator?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 13: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý / operator như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to / operator guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt / operator đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "easy"
    },
    {
      "id": "py_q_34_14",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 14: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle .glob('*.log')?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 14: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý .glob('*.log') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to .glob('*.log') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt .glob('*.log') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "medium"
    },
    {
      "id": "py_q_34_15",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 15: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle .read_text(encoding='utf-8')?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 15: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý .read_text(encoding='utf-8') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to .read_text(encoding='utf-8') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt .read_text(encoding='utf-8') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "hard"
    },
    {
      "id": "py_q_34_16",
      "type": "single_choice",
      "question": {
        "en": "[Modern File Systems with Pathlib] Scenario 16: In Automated Directory Scanner & Path Resolver, how does a software architect correctly handle mkdir(parents=True?",
        "vi": "[Hệ Thống Tệp Hiện Đại Với Pathlib] Tình huống 16: Trong Automated Directory Scanner & Path Resolver, kiến trúc sư phần mềm nên xử lý mkdir(parents=True như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Modern File Systems with Pathlib",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Hệ Thống Tệp Hiện Đại Với Pathlib"
        },
        {
          "en": "Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes",
          "vi": "Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung"
        },
        {
          "en": "Deprecated Python 2 idiom incompatible with modern Python 3 frameworks",
          "vi": "Cách viết cũ không tương thích với các framework Python 3 hiện đại"
        },
        {
          "en": "Invalid statement resulting in runtime crash or silent resource leak",
          "vi": "Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Automated Directory Scanner & Path Resolver, strict adherence to mkdir(parents=True guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Automated Directory Scanner & Path Resolver, tuân thủ nghiêm ngặt mkdir(parents=True đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_exception_handling",
      "difficulty": "medium"
    }
  ]
};

export default lesson18;
