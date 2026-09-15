import { Lesson } from '../../../../types';

export const lesson21: Lesson = {
  "id": "py_lesson_21",
  "moduleId": "py_mod_9",
  "levelId": "intermediate",
  "courseId": "python",
  "order": 21,
  "topicId": "python_inheritance_super",
  "title": {
    "en": "OOP: Inheritance & Method Overriding (super())",
    "vi": "OOP: Tính Kế Thừa & Ghi Đè Phương Thức (super())"
  },
  "summary": {
    "en": "Master class hierarchies: single inheritance (class Sub(Base)), calling parent constructors with super().__init__(), method overriding, and isinstance() / issubclass() type inspection.",
    "vi": "Làm chủ phân cấp lớp: đơn kế thừa (class Sub(Base)), gọi hàm khởi tạo lớp cha với super().__init__(), ghi đè phương thức và kiểm tra kiểu với isinstance() / issubclass()."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Inheritance allows a subclass (derived class) to inherit attributes and methods from a parent superclass (base class). Subclasses can extend existing behaviors or override methods with specialized logic while delegating base tasks via super().",
      "vi": "Tính kế thừa (Inheritance) cho phép một lớp con (derived class) thừa hưởng các thuộc tính và phương thức từ lớp cha (base class). Lớp con có thể mở rộng hành vi có sẵn hoặc ghi đè (override) phương thức với logic chuyên biệt trong khi vẫn ủy thác các tác vụ cơ sở qua super()."
    },
    "conceptExplanation": {
      "en": "Inheritance Mechanics:\n1. Subclass Syntax: class Child(Parent): pass.\n2. super().__init__(*args): Calls the parent class constructor to initialize inherited state.\n3. Method Overriding: Redefining a method in the child class with the same signature.\n4. Delegating with super(): super().method() invokes parent logic within overridden methods.\n5. Type Checking: isinstance(obj, Class) and issubclass(Child, Parent).",
      "vi": "Cơ Chế Kế Thừa:\n1. Cú pháp lớp con: class Child(Parent): pass.\n2. super().__init__(*args): Gọi hàm khởi tạo của lớp cha để khởi tạo các thuộc tính thừa hưởng.\n3. Ghi đè phương thức (Method Overriding): Định nghĩa lại phương thức ở lớp con cùng tên.\n4. Ủy nhiệm qua super(): super().method() gọi logic của lớp cha từ bên trong phương thức ghi đè.\n5. Kiểm tra kiểu: isinstance(obj, Class) và issubclass(Child, Parent)."
    },
    "syntax": "class Employee:\n    def __init__(self, name: str, salary: float):\n        self.name = name\n        self.salary = salary\n\n    def get_role(self) -> str:\n        return \"General Staff\"\n\nclass Manager(Employee):\n    def __init__(self, name: str, salary: float, department: str):\n        super().__init__(name, salary) # Initialize base attributes\n        self.department = department\n\n    def get_role(self) -> str:\n        return f\"Manager of {self.department}\"",
    "examples": [
      {
        "title": {
          "en": "Database Connector Hierarchy",
          "vi": "Hệ Thống Phân Cấp Kết Nối Cơ Sở Dữ Liệu"
        },
        "code": "class BaseDatabaseConnector:\n    def __init__(self, host, port):\n        self.host = host\n        self.port = port\n        self.connected = False\n\n    def connect(self):\n        self.connected = True\n        return f\"Connected to base host {self.host}:{self.port}\"\n\nclass PostgresConnector(BaseDatabaseConnector):\n    def __init__(self, host, port, dbname):\n        super().__init__(host, port)\n        self.dbname = dbname\n\n    def connect(self):\n        base_msg = super().connect()\n        return f\"{base_msg} -> Initialized PostgreSQL pool for [{self.dbname}]\"\n\npg = PostgresConnector(\"db.internal\", 5432, \"production_db\")\nprint(pg.connect())\nprint(\"Is Base Instance:\", isinstance(pg, BaseDatabaseConnector))",
        "language": "python",
        "explanation": {
          "en": "Demonstrates super().__init__ state delegation and super().connect() method chaining.",
          "vi": "Minh họa ủy thác khởi tạo qua super().__init__ và nối tiếp logic hàm qua super().connect()."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Forgetting to call super().__init__() in the subclass constructor, leaving parent attributes uninitialized",
          "vi": "Quên gọi super().__init__() trong constructor của lớp con khiến các thuộc tính của lớp cha không được khởi tạo"
        },
        "correction": {
          "en": "Always invoke super().__init__(...) with required base parameters in subclass __init__.",
          "vi": "Luôn gọi super().__init__(...) kèm các tham số bắt buộc trong __init__ của lớp con."
        },
        "code": "class Child(Parent):\n    def __init__(self, a, b):\n        super().__init__(a) # Always call super()\n        self.b = b"
      }
    ],
    "tips": [
      {
        "en": "Prefer composition over inheritance when classes only need some functionality from another class (\"has-a\" vs \"is-a\" relationship).",
        "vi": "Ưu tiên kết hợp (composition) hơn kế thừa khi lớp chỉ cần một vài tính năng (\"has-a\" thay vì quan hệ \"is-a\")."
      }
    ],
    "practice": {
      "task": {
        "en": "Inherit Notification Service Class",
        "vi": "Kế thừa lớp Dịch Vụ Thông Báo (Notification Service)"
      },
      "instruction": {
        "en": "Create class Notification(recipient): self.recipient = recipient, def send(self, msg) returns f\"Sending '{msg}' to {self.recipient}\". Create class EmailNotification(recipient, subject) inheriting Notification: calls super().__init__(recipient), stores self.subject = subject, overrides send(msg) to return f\"Subject: {self.subject} | \" + super().send(msg). Test and print result.",
        "vi": "Tạo class Notification và EmailNotification kế thừa từ Notification. Ghi đè phương thức send(). Thử nghiệm và in kết quả."
      },
      "starterCode": "# Build Notification hierarchy\n",
      "solutionCode": "class Notification:\n    def __init__(self, recipient):\n        self.recipient = recipient\n    def send(self, msg):\n        return f\"Sending '{msg}' to {self.recipient}\"\n\nclass EmailNotification(Notification):\n    def __init__(self, recipient, subject):\n        super().__init__(recipient)\n        self.subject = subject\n\n    def send(self, msg):\n        return f\"Subject: {self.subject} | \" + super().send(msg)\n\nmailer = EmailNotification(\"user@dev.io\", \"Welcome\")\nprint(mailer.send(\"Account activated!\"))\n",
      "expectedOutput": "Subject: Welcome | Sending 'Account activated!' to user@dev.io",
      "requiredPatterns": [],
      "hint": {
        "en": "class EmailNotification(Notification): def __init__(self, recipient, subject): super().__init__(recipient); self.subject = subject",
        "vi": "class EmailNotification(Notification): def __init__(self, recipient, subject): super().__init__(recipient); self.subject = subject"
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Type Inspection with issubclass and isinstance",
        "vi": "Kiểm tra kiểu dữ liệu với issubclass và isinstance"
      },
      "instruction": {
        "en": "Given class Animal: pass; class Dog(Animal): pass. Instantiate d = Dog(). Print f\"isinstance: {isinstance(d, Animal)}, issubclass: {issubclass(Dog, Animal)}\".",
        "vi": "Cho Animal và Dog. Khởi tạo d = Dog(). In kết quả kiểm tra isinstance và issubclass."
      },
      "starterCode": "# Type inspection\n",
      "solutionCode": "class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n\nd = Dog()\nprint(f\"isinstance: {isinstance(d, Animal)}, issubclass: {issubclass(Dog, Animal)}\")\n",
      "expectedOutput": "isinstance: True, issubclass: True",
      "requiredPatterns": [],
      "hint": {
        "en": "isinstance(d, Animal) and issubclass(Dog, Animal)",
        "vi": "isinstance(d, Animal) and issubclass(Dog, Animal)"
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_38_1",
      "type": "write_code",
      "title": {
        "en": "Implement Bank Account & User Entity Model",
        "vi": "Triển Khai Bank Account & User Entity Model"
      },
      "instruction": {
        "en": "Write production-grade Python code implementing class, __init__, self instance attributes vs class attributes, mutable class attribute trap for Bank Account & User Entity Model.",
        "vi": "Viết đoạn mã chuẩn doanh nghiệp áp dụng class, __init__, self instance attributes vs class attributes, mutable class attribute trap cho Bank Account & User Entity Model."
      },
      "starterCode": "# Write your domain logic below:\n",
      "solutionCode": "# Implementation for Object-Oriented Programming: Classes & State\nclass BaseService:\n    def __init__(self, name):\n        self.name = name\n    def status(self):\n        return f\"Service {self.name} active\"\n\nsrv = BaseService(\"AuthAPI\")\nprint(srv.status())",
      "hint": {
        "en": "Apply class, __init__, self instance attributes vs class attributes, mutable class attribute trap following Python OOP and I/O best practices.",
        "vi": "Áp dụng class, __init__, self instance attributes vs class attributes, mutable class attribute trap theo chuẩn hướng đối tượng và I/O của Python."
      },
      "explanation": {
        "en": "Clean architectural patterns ensure enterprise robustness.",
        "vi": "Mô hình kiến trúc rõ ràng đảm bảo độ tin cậy cấp doanh nghiệp."
      }
    },
    {
      "id": "py_ex_38_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Flaw in Bank Account & User Entity Model",
        "vi": "Sửa Lỗi Trong Bank Account & User Entity Model"
      },
      "instruction": {
        "en": "Fix the architectural or encoding bug in Bank Account & User Entity Model.",
        "vi": "Sửa lỗi kiến trúc hoặc lỗi mã hóa ký tự trong Bank Account & User Entity Model."
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
      "id": "py_ex_38_3",
      "type": "complete_code",
      "title": {
        "en": "Complete Bank Account & User Entity Model Component",
        "vi": "Hoàn Thiện Thành Phần Bank Account & User Entity Model"
      },
      "instruction": {
        "en": "Complete the missing construct in Bank Account & User Entity Model applying class, __init__, self instance attributes vs class attributes, mutable class attribute trap.",
        "vi": "Điền cú pháp còn thiếu trong Bank Account & User Entity Model áp dụng class, __init__, self instance attributes vs class attributes, mutable class attribute trap."
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
      "id": "py_ex_38_4",
      "type": "predict_output",
      "title": {
        "en": "Predict Execution Output for Bank Account & User Entity Model",
        "vi": "Dự Đoán Kết Quả Bank Account & User Entity Model"
      },
      "instruction": {
        "en": "Predict and verify the execution result for the Bank Account & User Entity Model component.",
        "vi": "Dự đoán và kiểm tra kết quả thực thi của thành phần Bank Account & User Entity Model."
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
      "id": "py_ex_38_5",
      "type": "problem_solving",
      "title": {
        "en": "End-to-End Bank Account & User Entity Model Pipeline",
        "vi": "Quy Trình Hoàn Chỉnh Bank Account & User Entity Model"
      },
      "instruction": {
        "en": "Implement the complete end-to-end handler for Bank Account & User Entity Model, processing input data and printing the formatted result.",
        "vi": "Triển khai quy trình xử lý hoàn chỉnh cho Bank Account & User Entity Model, xử lý dữ liệu và in kết quả định dạng chuẩn."
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
    "id": "py_ch_38",
    "title": {
      "en": "Fintech Payment Processor Polymorphic Hierarchy",
      "vi": "Hệ Thống Phân Cấp Bộ Xử Lý Thanh Toán Tài Chính Đa Hình"
    },
    "description": {
      "en": "Implement a payment transaction engine with tiered fee calculation:\n1. Base class: class PaymentMethod:\n   - __init__(self, account_id, currency=\"USD\")\n   - Method calculate_fee(self, amount): returns round(amount * 0.01, 2) (1% base fee)\n   - Method process(self, amount): returns {\"id\": self.account_id, \"amount\": amount, \"fee\": self.calculate_fee(amount), \"net\": amount - self.calculate_fee(amount)}\n2. Subclass: class CreditCardPayment(PaymentMethod):\n   - __init__(self, account_id, card_network, currency=\"USD\"): calls super().__init__, stores card_network\n   - Overrides calculate_fee(self, amount): base_fee = super().calculate_fee(amount); returns round(base_fee + 0.30, 2) (fixed $0.30 interchange fee)\n3. Subclass: class CryptoPayment(PaymentMethod):\n   - Overrides calculate_fee(self, amount): returns 0.05 (fixed flat network gas fee)\n4. Process $100.00 on a CreditCardPayment(\"CC-99\", \"VISA\") and $100.00 on CryptoPayment(\"0xWALLET\"):\nPrint:\n\"Card Net: $98.7 | Card Fee: $1.3\"\n\"Crypto Net: $99.95 | Crypto Fee: $0.05\".",
      "vi": "Xây dựng engine thanh toán tài chính với phân tầng tính phí:\n1. Lớp cha PaymentMethod tính phí 1%\n2. Lớp con CreditCardPayment cộng thêm $0.30 phí cố định qua super().calculate_fee()\n3. Lớp con CryptoPayment tính phí cố định $0.05\n4. Xử lý giao dịch $100 cho thẻ và tiền số. In kết quả định dạng."
    },
    "requirements": [
      {
        "en": "Inherit PaymentMethod across multiple derived classes",
        "vi": "Kế thừa PaymentMethod qua nhiều lớp con"
      },
      {
        "en": "Delegate parent fee computation via super().calculate_fee()",
        "vi": "Ủy nhiệm tính phí lớp cha qua super().calculate_fee()"
      },
      {
        "en": "Verify accurate polymorphic transaction calculation",
        "vi": "Kiểm tra tính toán giao dịch đa hình chính xác"
      }
    ],
    "starterCode": "# Build PaymentMethod hierarchy\n",
    "solutionCode": "class PaymentMethod:\n    def __init__(self, account_id, currency=\"USD\"):\n        self.account_id = account_id\n        self.currency = currency\n\n    def calculate_fee(self, amount):\n        return round(amount * 0.01, 2)\n\n    def process(self, amount):\n        fee = self.calculate_fee(amount)\n        return {\n            \"id\": self.account_id,\n            \"amount\": amount,\n            \"fee\": fee,\n            \"net\": round(amount - fee, 2)\n        }\n\nclass CreditCardPayment(PaymentMethod):\n    def __init__(self, account_id, card_network, currency=\"USD\"):\n        super().__init__(account_id, currency)\n        self.card_network = card_network\n\n    def calculate_fee(self, amount):\n        base_fee = super().calculate_fee(amount)\n        return round(base_fee + 0.30, 2)\n\nclass CryptoPayment(PaymentMethod):\n    def calculate_fee(self, amount):\n        return 0.05\n\ncard = CreditCardPayment(\"CC-99\", \"VISA\")\ncrypto = CryptoPayment(\"0xWALLET\")\n\nres_card = card.process(100.0)\nres_crypto = crypto.process(100.0)\n\nprint(f\"Card Net: ${res_card['net']} | Card Fee: ${res_card['fee']}\")\nprint(f\"Crypto Net: ${res_crypto['net']} | Crypto Fee: ${res_crypto['fee']}\")\n",
    "hints": [
      {
        "en": "base_fee = super().calculate_fee(amount); return round(base_fee + 0.30, 2)",
        "vi": "base_fee = super().calculate_fee(amount); return round(base_fee + 0.30, 2)"
      }
    ],
    "solutionExplanation": {
      "en": "Demonstrates professional polymorphic payment dispatching leveraging super() fee composition.",
      "vi": "Minh họa xử lý thanh toán đa hình chuyên nghiệp tận dụng super() để tính toán phí mở rộng."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_38_1",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 1: In Bank Account & User Entity Model, how does a software architect correctly handle __init__?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 1: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý __init__ như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to __init__ guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt __init__ đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "easy"
    },
    {
      "id": "py_q_38_2",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 2: In Bank Account & User Entity Model, how does a software architect correctly handle self instance attributes vs class attributes?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 2: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý self instance attributes vs class attributes như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to self instance attributes vs class attributes guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt self instance attributes vs class attributes đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "medium"
    },
    {
      "id": "py_q_38_3",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 3: In Bank Account & User Entity Model, how does a software architect correctly handle mutable class attribute trap?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 3: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý mutable class attribute trap như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to mutable class attribute trap guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt mutable class attribute trap đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "hard"
    },
    {
      "id": "py_q_38_4",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 4: In Bank Account & User Entity Model, how does a software architect correctly handle class?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 4: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý class như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to class guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt class đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "medium"
    },
    {
      "id": "py_q_38_5",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 5: In Bank Account & User Entity Model, how does a software architect correctly handle __init__?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 5: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý __init__ như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to __init__ guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt __init__ đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "easy"
    },
    {
      "id": "py_q_38_6",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 6: In Bank Account & User Entity Model, how does a software architect correctly handle self instance attributes vs class attributes?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 6: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý self instance attributes vs class attributes như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to self instance attributes vs class attributes guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt self instance attributes vs class attributes đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "hard"
    },
    {
      "id": "py_q_38_7",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 7: In Bank Account & User Entity Model, how does a software architect correctly handle mutable class attribute trap?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 7: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý mutable class attribute trap như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to mutable class attribute trap guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt mutable class attribute trap đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "easy"
    },
    {
      "id": "py_q_38_8",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 8: In Bank Account & User Entity Model, how does a software architect correctly handle class?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 8: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý class như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to class guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt class đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "medium"
    },
    {
      "id": "py_q_38_9",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 9: In Bank Account & User Entity Model, how does a software architect correctly handle __init__?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 9: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý __init__ như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to __init__ guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt __init__ đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "hard"
    },
    {
      "id": "py_q_38_10",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 10: In Bank Account & User Entity Model, how does a software architect correctly handle self instance attributes vs class attributes?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 10: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý self instance attributes vs class attributes như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to self instance attributes vs class attributes guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt self instance attributes vs class attributes đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "medium"
    },
    {
      "id": "py_q_38_11",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 11: In Bank Account & User Entity Model, how does a software architect correctly handle mutable class attribute trap?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 11: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý mutable class attribute trap như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to mutable class attribute trap guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt mutable class attribute trap đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "easy"
    },
    {
      "id": "py_q_38_12",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 12: In Bank Account & User Entity Model, how does a software architect correctly handle class?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 12: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý class như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to class guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt class đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "hard"
    },
    {
      "id": "py_q_38_13",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 13: In Bank Account & User Entity Model, how does a software architect correctly handle __init__?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 13: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý __init__ như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to __init__ guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt __init__ đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "easy"
    },
    {
      "id": "py_q_38_14",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 14: In Bank Account & User Entity Model, how does a software architect correctly handle self instance attributes vs class attributes?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 14: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý self instance attributes vs class attributes như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to self instance attributes vs class attributes guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt self instance attributes vs class attributes đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "medium"
    },
    {
      "id": "py_q_38_15",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 15: In Bank Account & User Entity Model, how does a software architect correctly handle mutable class attribute trap?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 15: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý mutable class attribute trap như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to mutable class attribute trap guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt mutable class attribute trap đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "hard"
    },
    {
      "id": "py_q_38_16",
      "type": "single_choice",
      "question": {
        "en": "[Object-Oriented Programming: Classes & State] Scenario 16: In Bank Account & User Entity Model, how does a software architect correctly handle class?",
        "vi": "[Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái] Tình huống 16: Trong Bank Account & User Entity Model, kiến trúc sư phần mềm nên xử lý class như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Object-Oriented Programming: Classes & State",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái"
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
        "en": "In Bank Account & User Entity Model, strict adherence to class guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Bank Account & User Entity Model, tuân thủ nghiêm ngặt class đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_inheritance_super",
      "difficulty": "medium"
    }
  ]
};

export default lesson21;
