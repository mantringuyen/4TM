import { Lesson } from '../../../../types';

export const lesson20: Lesson = {
  "id": "py_lesson_20",
  "moduleId": "py_mod_9",
  "levelId": "intermediate",
  "courseId": "python",
  "order": 20,
  "topicId": "python_classes_instances",
  "title": {
    "en": "OOP: Classes, Instances, Attributes & Methods",
    "vi": "OOP: Lớp (Class), Đối Tượng (Instance), Thuộc Tính & Phương Thức"
  },
  "summary": {
    "en": "Master object-oriented programming foundations: class definition, the __init__ constructor, instance attributes (self.attr), class attributes, and instance methods.",
    "vi": "Làm chủ nền tảng lập trình hướng đối tượng (OOP): định nghĩa lớp, hàm khởi tạo __init__, thuộc tính đối tượng (self.attr), thuộc tính lớp (class attribute) và phương thức đối tượng."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "Object-Oriented Programming (OOP) is a programming paradigm that bundles state (attributes) and behavior (methods) into reusable blueprints called Classes. Instantiating a class produces independent Objects with isolated state.",
      "vi": "Lập trình Hướng Đối Tượng (OOP) là mô hình lập trình gom nhóm trạng thái (thuộc tính) và hành vi (phương thức) vào các bản thiết kế tái sử dụng gọi là Lớp (Class). Khởi tạo một lớp sẽ tạo ra các Đối Tượng (Instance/Object) độc lập với dữ liệu được cách ly."
    },
    "conceptExplanation": {
      "en": "Core OOP Elements:\n1. class Keyword: Defines the blueprint.\n2. __init__(self, ...): Constructor method executed automatically upon instantiation.\n3. self: Explicit reference to the current instance object.\n4. Instance Attributes (self.name = name): Unique to each individual object.\n5. Class Attributes (total_count = 0): Shared across all instances of the class.\n6. Methods: Functions defined inside a class that take self as the first parameter. \n\n**Python Exception Hierarchy & Specific Catching:**\n```\nBaseException\n ├── SystemExit\n ├── KeyboardInterrupt (Ctrl+C)\n └── Exception\n      ├── ArithmeticError (ZeroDivisionError)\n      ├── LookupError (IndexError, KeyError)\n      └── ValueError\n```\n- **Always catch specific exceptions** (`ValueError`, `KeyError`) first, and place generic `except Exception:` as a fallback.\n- **Anti-pattern:** Never use bare `except:` or `except BaseException:`, because it will intercept `KeyboardInterrupt` and `SystemExit`, preventing users from stopping the program.",
      "vi": "Các Thành Phần OOP Cốt Lõi:\n1. Từ khóa class: Định nghĩa bản thiết kế lớp.\n2. __init__(self, ...): Phương thức khởi tạo tự động chạy khi tạo đối tượng mới.\n3. self: Tham chiếu tường minh trỏ tới chính đối tượng hiện tại.\n4. Thuộc tính đối tượng (self.name = name): Biến riêng biệt của từng đối tượng cụ thể.\n5. Thuộc tính lớp (total_count = 0): Biến dùng chung cho tất cả các đối tượng của lớp.\n6. Phương thức: Các hàm định nghĩa bên trong lớp nhận self làm tham số đầu tiên. \n\n**Cây Phân Cấp Ngoại Lệ & Bắt Lỗi Cụ Thể:**\n```\nBaseException\n ├── SystemExit\n ├── KeyboardInterrupt (Ctrl+C)\n └── Exception\n      ├── ArithmeticError (ZeroDivisionError)\n      ├── LookupError (IndexError, KeyError)\n      └── ValueError\n```\n- **Luôn bắt các ngoại lệ cụ thể** (`ValueError`, `KeyError`) trước, và chỉ dùng `except Exception:` ở cuối làm phương án dự phòng.\n- **Phản mẫu nguy hiểm:** Không bao giờ dùng `except:` để trống hoặc `except BaseException:`, vì nó sẽ chặn đứng cả tín hiệu ngắt chương trình `KeyboardInterrupt` (Ctrl+C) và lệnh thoát hệ thống `SystemExit`."
    },
    "syntax": "class BankAccount:\n    bank_name = \"Global Trust\" # Class attribute\n\n    def __init__(self, owner: str, balance: float = 0.0):\n        self.owner = owner     # Instance attribute\n        self.balance = balance # Instance attribute\n\n    def deposit(self, amount: float) -> float:\n        self.balance += amount\n        return self.balance",
    "examples": [
      {
        "title": {
          "en": "Server Node Management Class",
          "vi": "Lớp Quản Lý Nút Máy Chủ (Server Node)"
        },
        "code": "class ServerNode:\n    default_region = \"us-east-1\" # Class attribute\n\n    def __init__(self, hostname, ip_addr):\n        self.hostname = hostname\n        self.ip_addr = ip_addr\n        self.is_active = False\n\n    def start(self):\n        self.is_active = True\n        print(f\"Node {self.hostname} ({self.ip_addr}) is now ONLINE in {self.default_region}\")\n\n    def stop(self):\n        self.is_active = False\n        print(f\"Node {self.hostname} is now OFFLINE\")\n\nnode1 = ServerNode(\"web-01\", \"10.0.1.10\")\nnode1.start()",
        "language": "python",
        "explanation": {
          "en": "Demonstrates instance state tracking (self.is_active) modified by instance methods.",
          "vi": "Minh họa theo dõi trạng thái đối tượng (self.is_active) được thay đổi qua phương thức đối tượng."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Forgetting \"self\" as the first argument in method definitions: def deposit(amount):",
          "vi": "Quên tham số \"self\" ở vị trí đầu tiên trong định nghĩa phương thức: def deposit(amount):"
        },
        "correction": {
          "en": "Always include self as the first parameter in instance methods: def deposit(self, amount):.",
          "vi": "Luôn khai báo self là tham số đầu tiên trong mọi phương thức đối tượng: def deposit(self, amount):."
        },
        "code": "class Example:\n    def run(self): # self is required\n        print(\"Running\")"
      }
    ],
    "tips": [
      {
        "en": "Class attributes are accessed via ClassName.attr or self.attr, but assigning via self.attr creates an instance attribute that shadows the class attribute!",
        "vi": "Gán self.attr = val sẽ tạo thuộc tính đối tượng mới che khuất thuộc tính lớp cùng tên thay vì làm thay đổi thuộc tính lớp!"
      }
    ],
    "practice": {
      "task": {
        "en": "Create Vehicle Class with Odometer",
        "vi": "Tạo lớp Phương Tiện (Vehicle) với đồng hồ công tơ mét"
      },
      "instruction": {
        "en": "Create class Vehicle with __init__(self, make, model): self.make = make, self.model = model, self.mileage = 0. Add method drive(self, miles): self.mileage += miles. Instantiate car = Vehicle(\"Toyota\", \"Corolla\"), car.drive(150), and print f\"{car.make} {car.model} Mileage: {car.mileage} miles\".",
        "vi": "Tạo class Vehicle có make, model, mileage. Thêm phương thức drive. Khởi tạo đối tượng, lái 150 dặm và in kết quả."
      },
      "starterCode": "# Define Vehicle class\n",
      "solutionCode": "class Vehicle:\n    def __init__(self, make, model):\n        self.make = make\n        self.model = model\n        self.mileage = 0\n\n    def drive(self, miles):\n        self.mileage += miles\n\ncar = Vehicle(\"Toyota\", \"Corolla\")\ncar.drive(150)\nprint(f\"{car.make} {car.model} Mileage: {car.mileage} miles\")\n",
      "expectedOutput": "Toyota Corolla Mileage: 150 miles",
      "requiredPatterns": [],
      "hint": {
        "en": "class Vehicle: def __init__(self, make, model): self.make = make; self.model = model; self.mileage = 0",
        "vi": "class Vehicle: def __init__(self, make, model): self.make = make; self.model = model; self.mileage = 0"
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Track Total Created Instances with Class Attribute",
        "vi": "Đếm tổng số đối tượng được tạo bằng thuộc tính lớp"
      },
      "instruction": {
        "en": "Create class User with class attribute user_count = 0. In __init__(self, username): self.username = username, User.user_count += 1. Create 3 users and print f\"Total Users: {User.user_count}\".",
        "vi": "Tạo class User có class attribute user_count = 0. Tăng user_count trong __init__. Tạo 3 user và in tổng số."
      },
      "starterCode": "# Class attribute counter\n",
      "solutionCode": "class User:\n    user_count = 0\n\n    def __init__(self, username):\n        self.username = username\n        User.user_count += 1\n\nu1 = User(\"Alice\")\nu2 = User(\"Bob\")\nu3 = User(\"Carol\")\nprint(f\"Total Users: {User.user_count}\")\n",
      "expectedOutput": "Total Users: 3",
      "requiredPatterns": [],
      "hint": {
        "en": "User.user_count += 1 in __init__",
        "vi": "User.user_count += 1 trong __init__"
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_36_1",
      "type": "write_code",
      "title": {
        "en": "Implement Database Connection Pool Recovery & Error Chaining",
        "vi": "Triển Khai Database Connection Pool Recovery & Error Chaining"
      },
      "instruction": {
        "en": "Write production-grade Python code implementing try-except-else-finally, raise ... from err (exception chaining), clean resource disposal for Database Connection Pool Recovery & Error Chaining.",
        "vi": "Viết đoạn mã chuẩn doanh nghiệp áp dụng try-except-else-finally, raise ... from err (exception chaining), clean resource disposal cho Database Connection Pool Recovery & Error Chaining."
      },
      "starterCode": "# Write your domain logic below:\n",
      "solutionCode": "# Implementation for Advanced Exceptions: Else, Finally & Chaining\nclass BaseService:\n    def __init__(self, name):\n        self.name = name\n    def status(self):\n        return f\"Service {self.name} active\"\n\nsrv = BaseService(\"AuthAPI\")\nprint(srv.status())",
      "hint": {
        "en": "Apply try-except-else-finally, raise ... from err (exception chaining), clean resource disposal following Python OOP and I/O best practices.",
        "vi": "Áp dụng try-except-else-finally, raise ... from err (exception chaining), clean resource disposal theo chuẩn hướng đối tượng và I/O của Python."
      },
      "explanation": {
        "en": "Clean architectural patterns ensure enterprise robustness.",
        "vi": "Mô hình kiến trúc rõ ràng đảm bảo độ tin cậy cấp doanh nghiệp."
      }
    },
    {
      "id": "py_ex_36_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Flaw in Database Connection Pool Recovery & Error Chaining",
        "vi": "Sửa Lỗi Trong Database Connection Pool Recovery & Error Chaining"
      },
      "instruction": {
        "en": "Fix the architectural or encoding bug in Database Connection Pool Recovery & Error Chaining.",
        "vi": "Sửa lỗi kiến trúc hoặc lỗi mã hóa ký tự trong Database Connection Pool Recovery & Error Chaining."
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
      "id": "py_ex_36_3",
      "type": "complete_code",
      "title": {
        "en": "Complete Database Connection Pool Recovery & Error Chaining Component",
        "vi": "Hoàn Thiện Thành Phần Database Connection Pool Recovery & Error Chaining"
      },
      "instruction": {
        "en": "Complete the missing construct in Database Connection Pool Recovery & Error Chaining applying try-except-else-finally, raise ... from err (exception chaining), clean resource disposal.",
        "vi": "Điền cú pháp còn thiếu trong Database Connection Pool Recovery & Error Chaining áp dụng try-except-else-finally, raise ... from err (exception chaining), clean resource disposal."
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
      "id": "py_ex_36_4",
      "type": "predict_output",
      "title": {
        "en": "Predict Execution Output for Database Connection Pool Recovery & Error Chaining",
        "vi": "Dự Đoán Kết Quả Database Connection Pool Recovery & Error Chaining"
      },
      "instruction": {
        "en": "Predict and verify the execution result for the Database Connection Pool Recovery & Error Chaining component.",
        "vi": "Dự đoán và kiểm tra kết quả thực thi của thành phần Database Connection Pool Recovery & Error Chaining."
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
      "id": "py_ex_36_5",
      "type": "problem_solving",
      "title": {
        "en": "End-to-End Database Connection Pool Recovery & Error Chaining Pipeline",
        "vi": "Quy Trình Hoàn Chỉnh Database Connection Pool Recovery & Error Chaining"
      },
      "instruction": {
        "en": "Implement the complete end-to-end handler for Database Connection Pool Recovery & Error Chaining, processing input data and printing the formatted result.",
        "vi": "Triển khai quy trình xử lý hoàn chỉnh cho Database Connection Pool Recovery & Error Chaining, xử lý dữ liệu và in kết quả định dạng chuẩn."
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
    "id": "py_ch_36",
    "title": {
      "en": "Cloud Compute Resource Allocation Engine",
      "vi": "Bộ Điều Phối Tài Nguyên Điện Toán Đám Mây Hướng Đối Tượng"
    },
    "description": {
      "en": "Build a cloud container management model:\n1. class Cluster:\n   - Class attribute: MAX_VCPU = 16\n   - Instance attributes in __init__(self, cluster_id): cluster_id, allocated_vcpu = 0, containers = []\n   - Method allocate(self, name, vcpu):\n     - If self.allocated_vcpu + vcpu > Cluster.MAX_VCPU: return False\n     - Else: self.allocated_vcpu += vcpu, self.containers.append((name, vcpu)), return True\n   - Method release(self, name):\n     - Find container by name, subtract vcpu, remove from list, return True (or False if not found)\n2. Test by allocating \"auth-api\" (4 vcpu), \"db-primary\" (8 vcpu), \"worker-1\" (8 vcpu - should fail), releasing \"auth-api\", and retrying \"worker-1\" (should succeed).\nPrint final allocated vcpu and container list:\n\"Allocated vCPU: 16/16 | Containers: [('db-primary', 8), ('worker-1', 8)]\".",
      "vi": "Xây dựng mô hình quản lý container điện toán đám mây:\n1. class Cluster với MAX_VCPU = 16\n2. Các phương thức allocate và release kiểm soát hạn mức vCPU\n3. Thực hiện chuỗi cấp phát và giải phóng tài nguyên theo yêu cầu\nIn kết quả: \"Allocated vCPU: 16/16 | Containers: [('db-primary', 8), ('worker-1', 8)]\"."
    },
    "requirements": [
      {
        "en": "Implement Cluster class with attributes and methods",
        "vi": "Triển khai lớp Cluster đầy đủ thuộc tính và phương thức"
      },
      {
        "en": "Enforce capacity checks against MAX_VCPU",
        "vi": "Kiểm tra giới hạn dung lượng so với MAX_VCPU"
      },
      {
        "en": "Simulate dynamic allocate/release life cycle",
        "vi": "Mô phỏng vòng đời cấp phát/thu hồi tài nguyên"
      }
    ],
    "starterCode": "# Build Cluster class\n",
    "solutionCode": "class Cluster:\n    MAX_VCPU = 16\n\n    def __init__(self, cluster_id):\n        self.cluster_id = cluster_id\n        self.allocated_vcpu = 0\n        self.containers = []\n\n    def allocate(self, name, vcpu):\n        if self.allocated_vcpu + vcpu > Cluster.MAX_VCPU:\n            return False\n        self.allocated_vcpu += vcpu\n        self.containers.append((name, vcpu))\n        return True\n\n    def release(self, name):\n        for i, (c_name, c_vcpu) in enumerate(self.containers):\n            if c_name == name:\n                self.allocated_vcpu -= c_vcpu\n                self.containers.pop(i)\n                return True\n        return False\n\nprod = Cluster(\"prod-asia-1\")\nprod.allocate(\"auth-api\", 4)\nprod.allocate(\"db-primary\", 8)\nprod.allocate(\"worker-1\", 8) # Fails (12 + 8 > 16)\nprod.release(\"auth-api\")     # Frees 4, total now 8\nprod.allocate(\"worker-1\", 8) # Succeeds (8 + 8 = 16)\n\nprint(f\"Allocated vCPU: {prod.allocated_vcpu}/{Cluster.MAX_VCPU} | Containers: {prod.containers}\")\n",
    "hints": [
      {
        "en": "if self.allocated_vcpu + vcpu > Cluster.MAX_VCPU: return False",
        "vi": "if self.allocated_vcpu + vcpu > Cluster.MAX_VCPU: return False"
      }
    ],
    "solutionExplanation": {
      "en": "Demonstrates clean OOP state encapsulation and capacity invariants in a resource manager.",
      "vi": "Minh họa đóng gói trạng thái OOP và kiểm soát bất biến dung lượng trong trình quản lý tài nguyên."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_36_1",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 1: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle raise ... from err (exception chaining)?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 1: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý raise ... from err (exception chaining) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to raise ... from err (exception chaining) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt raise ... from err (exception chaining) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "easy"
    },
    {
      "id": "py_q_36_2",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 2: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle clean resource disposal?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 2: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý clean resource disposal như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to clean resource disposal guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt clean resource disposal đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "medium"
    },
    {
      "id": "py_q_36_3",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 3: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle try-except-else-finally?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 3: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý try-except-else-finally như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to try-except-else-finally guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt try-except-else-finally đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "hard"
    },
    {
      "id": "py_q_36_4",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 4: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle raise ... from err (exception chaining)?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 4: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý raise ... from err (exception chaining) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to raise ... from err (exception chaining) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt raise ... from err (exception chaining) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "medium"
    },
    {
      "id": "py_q_36_5",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 5: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle clean resource disposal?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 5: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý clean resource disposal như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to clean resource disposal guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt clean resource disposal đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "easy"
    },
    {
      "id": "py_q_36_6",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 6: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle try-except-else-finally?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 6: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý try-except-else-finally như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to try-except-else-finally guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt try-except-else-finally đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "hard"
    },
    {
      "id": "py_q_36_7",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 7: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle raise ... from err (exception chaining)?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 7: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý raise ... from err (exception chaining) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to raise ... from err (exception chaining) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt raise ... from err (exception chaining) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "easy"
    },
    {
      "id": "py_q_36_8",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 8: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle clean resource disposal?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 8: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý clean resource disposal như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to clean resource disposal guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt clean resource disposal đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "medium"
    },
    {
      "id": "py_q_36_9",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 9: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle try-except-else-finally?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 9: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý try-except-else-finally như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to try-except-else-finally guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt try-except-else-finally đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "hard"
    },
    {
      "id": "py_q_36_10",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 10: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle raise ... from err (exception chaining)?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 10: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý raise ... from err (exception chaining) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to raise ... from err (exception chaining) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt raise ... from err (exception chaining) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "medium"
    },
    {
      "id": "py_q_36_11",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 11: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle clean resource disposal?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 11: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý clean resource disposal như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to clean resource disposal guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt clean resource disposal đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "easy"
    },
    {
      "id": "py_q_36_12",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 12: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle try-except-else-finally?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 12: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý try-except-else-finally như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to try-except-else-finally guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt try-except-else-finally đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "hard"
    },
    {
      "id": "py_q_36_13",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 13: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle raise ... from err (exception chaining)?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 13: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý raise ... from err (exception chaining) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to raise ... from err (exception chaining) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt raise ... from err (exception chaining) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "easy"
    },
    {
      "id": "py_q_36_14",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 14: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle clean resource disposal?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 14: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý clean resource disposal như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to clean resource disposal guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt clean resource disposal đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "medium"
    },
    {
      "id": "py_q_36_15",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 15: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle try-except-else-finally?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 15: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý try-except-else-finally như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to try-except-else-finally guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt try-except-else-finally đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "hard"
    },
    {
      "id": "py_q_36_16",
      "type": "single_choice",
      "question": {
        "en": "[Advanced Exceptions: Else, Finally & Chaining] Scenario 16: In Database Connection Pool Recovery & Error Chaining, how does a software architect correctly handle raise ... from err (exception chaining)?",
        "vi": "[Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi] Tình huống 16: Trong Database Connection Pool Recovery & Error Chaining, kiến trúc sư phần mềm nên xử lý raise ... from err (exception chaining) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Advanced Exceptions: Else, Finally & Chaining",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi"
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
        "en": "In Database Connection Pool Recovery & Error Chaining, strict adherence to raise ... from err (exception chaining) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong Database Connection Pool Recovery & Error Chaining, tuân thủ nghiêm ngặt raise ... from err (exception chaining) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_classes_instances",
      "difficulty": "medium"
    }
  ]
};

export default lesson20;
