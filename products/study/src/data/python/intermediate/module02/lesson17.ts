import { Lesson } from '../../../../types';

export const lesson17: Lesson = {
  "id": "py_lesson_17",
  "moduleId": "py_mod_7",
  "levelId": "intermediate",
  "courseId": "python",
  "order": 17,
  "topicId": "python_csv_json_processing",
  "title": {
    "en": "Structured Data: CSV & JSON Processing with Built-in Modules",
    "vi": "Dữ Liệu Có Cấu Trúc: Xử Lý CSV & JSON Với Module Có Sẵn"
  },
  "summary": {
    "en": "Master standard library modules: json (loads, dumps, load, dump, indent, ensure_ascii) and csv (reader, writer, DictReader, DictWriter).",
    "vi": "Làm chủ các module thư viện chuẩn: json (loads, dumps, load, dump, indent, ensure_ascii) và csv (reader, writer, DictReader, DictWriter)."
  },
  "estimatedMinutes": 15,
  "learn": {
    "introduction": {
      "en": "JSON and CSV are the two most ubiquitous interchange formats for web APIs, microservices, and tabular data science. Python provides zero-dependency built-in modules \"json\" and \"csv\" that convert structured data to and from native Python types seamlessly.",
      "vi": "JSON và CSV là hai định dạng trao đổi dữ liệu phổ biến nhất cho web API, microservice và phân tích dữ liệu bảng. Python cung cấp sẵn hai module tích hợp không cần cài đặt thêm là \"json\" và \"csv\" giúp chuyển đổi dữ liệu qua lại với các kiểu bản địa của Python một cách liền mạch."
    },
    "conceptExplanation": {
      "en": "JSON & CSV Modules:\n1. json.loads(str): Parse JSON string to Python dict/list.\n2. json.dumps(obj, indent=2): Serialize Python object to formatted JSON string.\n3. json.load(f) / json.dump(obj, f): File stream serialization.\n4. csv.DictReader(f): Reads CSV rows directly as dictionaries mapped to header columns!\n5. csv.DictWriter(f, fieldnames=...): Writes dictionaries to structured CSV with headers. \n\n**MANDATORY BEST PRACTICE: Explicit `encoding='utf-8'`:**\nOmitting `encoding` causes Python to fall back to the operating system default (e.g., `cp1252` on Windows), resulting in `UnicodeDecodeError` or data corruption when reading Vietnamese characters or emojis. Always specify `encoding='utf-8'` in all `open()`, `csv.reader()`, and `Path.read_text()` operations.",
      "vi": "Module JSON & CSV:\n1. json.loads(str): Chuyển chuỗi JSON thành dict/list trong Python.\n2. json.dumps(obj, indent=2): Chuyển đối tượng Python thành chuỗi JSON có thụt lề định dạng.\n3. json.load(f) / json.dump(obj, f): Đọc/Ghi trực tiếp với luồng file.\n4. csv.DictReader(f): Đọc các dòng CSV trực tiếp thành các dictionary tương ứng với tên cột tiêu đề!\n5. csv.DictWriter(f, fieldnames=...): Ghi danh sách dictionary ra định dạng CSV kèm dòng tiêu đề chuẩn. \n\n**CHUẨN THỰC HÀNH BẮT BUỘC: Luôn Khai Báo `encoding='utf-8'`:**\nNếu không ghi rõ `encoding`, Python sẽ dùng bảng mã mặc định của hệ điều hành (vd: `cp1252` trên Windows), dẫn đến lỗi `UnicodeDecodeError` hoặc lỗi font khi đọc tiếng Việt hay emoji. Luôn luôn khai báo tường minh `encoding='utf-8'` trong mọi lệnh `open()`, `csv.reader()` và `Path.read_text()`."
    },
    "syntax": "import json, csv\n\n# JSON serialization\npayload = {\"user\": \"Alice\", \"active\": True, \"roles\": [\"ADMIN\"]}\njson_str = json.dumps(payload, indent=2)\nparsed = json.loads(json_str)\n\n# CSV DictReader\ncsv_data = \"name,role\\nAlice,Admin\\nBob,User\"\nreader = csv.DictReader(csv_data.splitlines())\nfor row in reader:\n    print(row[\"name\"], row[\"role\"])",
    "examples": [
      {
        "title": {
          "en": "JSON API Transformation & CSV Export",
          "vi": "Chuyển Đổi Dữ Liệu JSON API & Xuất Ra Bảng CSV"
        },
        "code": "import json, csv, io\n\nraw_json = '''[\n  {\"id\": 101, \"sku\": \"WIDGET-A\", \"price\": 29.99, \"stock\": 50},\n  {\"id\": 102, \"sku\": \"GADGET-B\", \"price\": 89.50, \"stock\": 0}\n]'''\n\nproducts = json.loads(raw_json)\n\n# Export in-stock products to CSV DictWriter\ncsv_buffer = io.StringIO()\nfieldnames = [\"id\", \"sku\", \"price\"]\nwriter = csv.DictWriter(csv_buffer, fieldnames=fieldnames, extrasaction=\"ignore\")\nwriter.writeheader()\n\nfor p in products:\n    if p[\"stock\"] > 0:\n        writer.writerow(p)\n\ncsv_buffer.seek(0)\nprint(\"Generated CSV:\\n\" + csv_buffer.read().strip())",
        "language": "python",
        "explanation": {
          "en": "Parses JSON payload, filters available inventory, and serializes directly to CSV using csv.DictWriter.",
          "vi": "Phân tích chuỗi JSON, lọc hàng còn trong kho và xuất trực tiếp ra định dạng CSV bằng csv.DictWriter."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Confusing json.load (takes a file stream) with json.loads (takes a string, \"s\" for string)",
          "vi": "Nhầm lẫn giữa json.load (nhận luồng file) với json.loads (nhận chuỗi, chữ \"s\" là string)"
        },
        "correction": {
          "en": "Use json.loads(json_text) for string parsing; use json.load(file_handle) for files.",
          "vi": "Dùng json.loads(json_text) khi phân tích chuỗi; dùng json.load(file_handle) khi đọc file."
        },
        "code": "data = json.loads('{\"key\": \"value\"}') # loads from string"
      }
    ],
    "tips": [
      {
        "en": "Use json.dumps(data, indent=2, ensure_ascii=False) when serializing Vietnamese / Unicode strings to prevent escaped \\uXXXX characters.",
        "vi": "Dùng json.dumps(data, indent=2, ensure_ascii=False) khi xuất chuỗi tiếng Việt/Unicode để không bị mã hóa thành ký tự \\uXXXX."
      }
    ],
    "practice": {
      "task": {
        "en": "Parse JSON and Calculate Order Totals",
        "vi": "Phân tích JSON và tính tổng giá trị đơn hàng"
      },
      "instruction": {
        "en": "Import json. Given order_json = '{\"order_id\": \"ORD-99\", \"items\": [{\"price\": 10.0, \"qty\": 2}, {\"price\": 25.0, \"qty\": 1}]}', parse with json.loads and compute total amount. Print f\"Order {order_id} Total: ${total}\".",
        "vi": "Import json. Cho order_json, phân tích bằng json.loads và tính tổng tiền. In ra kết quả."
      },
      "starterCode": "import json\norder_json = '{\"order_id\": \"ORD-99\", \"items\": [{\"price\": 10.0, \"qty\": 2}, {\"price\": 25.0, \"qty\": 1}]}'\n# Parse and calculate\n",
      "solutionCode": "import json\norder_json = '{\"order_id\": \"ORD-99\", \"items\": [{\"price\": 10.0, \"qty\": 2}, {\"price\": 25.0, \"qty\": 1}]}'\ndata = json.loads(order_json)\ntotal = sum(item[\"price\"] * item[\"qty\"] for item in data[\"items\"])\nprint(f\"Order {data['order_id']} Total: ${total:.1f}\")\n",
      "expectedOutput": "Order ORD-99 Total: $45.0",
      "requiredPatterns": [],
      "hint": {
        "en": "data = json.loads(order_json); total = sum(item[\"price\"] * item[\"qty\"] for item in data[\"items\"])",
        "vi": "data = json.loads(order_json); total = sum(item[\"price\"] * item[\"qty\"] for item in data[\"items\"])"
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Read CSV with DictReader",
        "vi": "Đọc dữ liệu CSV bằng DictReader"
      },
      "instruction": {
        "en": "Import csv, io. Given raw_csv = \"emp_id,department,salary\\nE1,Engineering,85000\\nE2,Marketing,62000\\nE3,Engineering,92000\", parse with csv.DictReader and compute average engineering salary. Print avg.",
        "vi": "Import csv, io. Cho raw_csv, phân tích bằng csv.DictReader và tính lương trung bình phòng Engineering. In kết quả."
      },
      "starterCode": "import csv, io\nraw_csv = \"emp_id,department,salary\\nE1,Engineering,85000\\nE2,Marketing,62000\\nE3,Engineering,92000\"\n# Parse CSV\n",
      "solutionCode": "import csv, io\nraw_csv = \"emp_id,department,salary\\nE1,Engineering,85000\\nE2,Marketing,62000\\nE3,Engineering,92000\"\nreader = csv.DictReader(io.StringIO(raw_csv))\neng_salaries = [float(row[\"salary\"]) for row in reader if row[\"department\"] == \"Engineering\"]\navg_eng = sum(eng_salaries) / len(eng_salaries)\nprint(f\"Average Engineering Salary: ${avg_eng:.1f}\")\n",
      "expectedOutput": "Average Engineering Salary: $88500.0",
      "requiredPatterns": [],
      "hint": {
        "en": "reader = csv.DictReader(io.StringIO(raw_csv))",
        "vi": "reader = csv.DictReader(io.StringIO(raw_csv))"
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_33_1",
      "type": "write_code",
      "title": {
        "en": "Implement REST API Payload & Customer Export",
        "vi": "Triển Khai REST API Payload & Customer Export"
      },
      "instruction": {
        "en": "Write production-grade Python code implementing json.loads(), json.dumps(indent=2), csv.DictReader(encoding='utf-8'), csv.DictWriter for REST API Payload & Customer Export.",
        "vi": "Viết đoạn mã chuẩn doanh nghiệp áp dụng json.loads(), json.dumps(indent=2), csv.DictReader(encoding='utf-8'), csv.DictWriter cho REST API Payload & Customer Export."
      },
      "starterCode": "# Write your domain logic below:\n",
      "solutionCode": "# Implementation for Working with CSV and JSON Data\nclass BaseService:\n    def __init__(self, name):\n        self.name = name\n    def status(self):\n        return f\"Service {self.name} active\"\n\nsrv = BaseService(\"AuthAPI\")\nprint(srv.status())",
      "hint": {
        "en": "Apply json.loads(), json.dumps(indent=2), csv.DictReader(encoding='utf-8'), csv.DictWriter following Python OOP and I/O best practices.",
        "vi": "Áp dụng json.loads(), json.dumps(indent=2), csv.DictReader(encoding='utf-8'), csv.DictWriter theo chuẩn hướng đối tượng và I/O của Python."
      },
      "explanation": {
        "en": "Clean architectural patterns ensure enterprise robustness.",
        "vi": "Mô hình kiến trúc rõ ràng đảm bảo độ tin cậy cấp doanh nghiệp."
      }
    },
    {
      "id": "py_ex_33_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Flaw in REST API Payload & Customer Export",
        "vi": "Sửa Lỗi Trong REST API Payload & Customer Export"
      },
      "instruction": {
        "en": "Fix the architectural or encoding bug in REST API Payload & Customer Export.",
        "vi": "Sửa lỗi kiến trúc hoặc lỗi mã hóa ký tự trong REST API Payload & Customer Export."
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
      "id": "py_ex_33_3",
      "type": "complete_code",
      "title": {
        "en": "Complete REST API Payload & Customer Export Component",
        "vi": "Hoàn Thiện Thành Phần REST API Payload & Customer Export"
      },
      "instruction": {
        "en": "Complete the missing construct in REST API Payload & Customer Export applying json.loads(), json.dumps(indent=2), csv.DictReader(encoding='utf-8'), csv.DictWriter.",
        "vi": "Điền cú pháp còn thiếu trong REST API Payload & Customer Export áp dụng json.loads(), json.dumps(indent=2), csv.DictReader(encoding='utf-8'), csv.DictWriter."
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
      "id": "py_ex_33_4",
      "type": "predict_output",
      "title": {
        "en": "Predict Execution Output for REST API Payload & Customer Export",
        "vi": "Dự Đoán Kết Quả REST API Payload & Customer Export"
      },
      "instruction": {
        "en": "Predict and verify the execution result for the REST API Payload & Customer Export component.",
        "vi": "Dự đoán và kiểm tra kết quả thực thi của thành phần REST API Payload & Customer Export."
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
      "id": "py_ex_33_5",
      "type": "problem_solving",
      "title": {
        "en": "End-to-End REST API Payload & Customer Export Pipeline",
        "vi": "Quy Trình Hoàn Chỉnh REST API Payload & Customer Export"
      },
      "instruction": {
        "en": "Implement the complete end-to-end handler for REST API Payload & Customer Export, processing input data and printing the formatted result.",
        "vi": "Triển khai quy trình xử lý hoàn chỉnh cho REST API Payload & Customer Export, xử lý dữ liệu và in kết quả định dạng chuẩn."
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
    "id": "py_ch_33",
    "title": {
      "en": "E-Commerce Cross-Format Data Pipeline (JSON to CSV)",
      "vi": "Đường Ống Dữ Liệu Thương Mại Điện Tử Đa Định Dạng (JSON sang CSV)"
    },
    "description": {
      "en": "Build an automated ETL pipeline that converts nested API JSON response into normalized CSV format:\nGiven api_response = '''{\n  \"batch_id\": \"BATCH-2026-X\",\n  \"records\": [\n    {\"user_id\": \"U101\", \"name\": \"Alice\", \"purchases\": 4, \"total_spent\": 520.50, \"verified\": true},\n    {\"user_id\": \"U102\", \"name\": \"Bob\", \"purchases\": 0, \"total_spent\": 0.0, \"verified\": false},\n    {\"user_id\": \"U103\", \"name\": \"Carol\", \"purchases\": 12, \"total_spent\": 1840.00, \"verified\": true}\n  ]\n}'''\nPipeline tasks:\n1. Parse JSON with json.loads\n2. Filter only verified users who have purchases > 0\n3. Write the filtered records to an in-memory CSV using csv.DictWriter with columns: [\"user_id\", \"name\", \"total_spent\"]\nPrint the output CSV:\n\"user_id,name,total_spent\\nU101,Alice,520.5\\nU103,Carol,1840.0\".",
      "vi": "Xây dựng đường ống ETL tự động chuyển đổi phản hồi JSON lồng nhau từ API sang bảng CSV chuẩn hóa:\nCho api_response:\n1. Phân tích chuỗi JSON bằng json.loads\n2. Lọc các người dùng đã xác minh (verified == True) và có purchases > 0\n3. Ghi các bản ghi đã lọc vào bộ nhớ CSV bằng csv.DictWriter với các cột: [\"user_id\", \"name\", \"total_spent\"]\nIn chuỗi CSV hoàn chỉnh ra màn hình."
    },
    "requirements": [
      {
        "en": "Parse nested JSON payload",
        "vi": "Phân tích chuỗi JSON lồng nhau"
      },
      {
        "en": "Filter active records with list comprehension or loop",
        "vi": "Lọc bản ghi hợp lệ"
      },
      {
        "en": "Generate formatted CSV via csv.DictWriter and io.StringIO",
        "vi": "Tạo bảng CSV định dạng bằng csv.DictWriter và io.StringIO"
      }
    ],
    "starterCode": "import json, csv, io\napi_response = '''{\n  \"batch_id\": \"BATCH-2026-X\",\n  \"records\": [\n    {\"user_id\": \"U101\", \"name\": \"Alice\", \"purchases\": 4, \"total_spent\": 520.50, \"verified\": true},\n    {\"user_id\": \"U102\", \"name\": \"Bob\", \"purchases\": 0, \"total_spent\": 0.0, \"verified\": false},\n    {\"user_id\": \"U103\", \"name\": \"Carol\", \"purchases\": 12, \"total_spent\": 1840.00, \"verified\": true}\n  ]\n}'''\n# Build ETL Pipeline\n",
    "solutionCode": "import json, csv, io\napi_response = '''{\n  \"batch_id\": \"BATCH-2026-X\",\n  \"records\": [\n    {\"user_id\": \"U101\", \"name\": \"Alice\", \"purchases\": 4, \"total_spent\": 520.50, \"verified\": true},\n    {\"user_id\": \"U102\", \"name\": \"Bob\", \"purchases\": 0, \"total_spent\": 0.0, \"verified\": false},\n    {\"user_id\": \"U103\", \"name\": \"Carol\", \"purchases\": 12, \"total_spent\": 1840.00, \"verified\": true}\n  ]\n}'''\n\ndata = json.loads(api_response)\nfiltered_records = [\n    {\"user_id\": r[\"user_id\"], \"name\": r[\"name\"], \"total_spent\": r[\"total_spent\"]}\n    for r in data[\"records\"]\n    if r[\"verified\"] and r[\"purchases\"] > 0\n]\n\noutput_buf = io.StringIO()\nfieldnames = [\"user_id\", \"name\", \"total_spent\"]\nwriter = csv.DictWriter(output_buf, fieldnames=fieldnames, lineterminator=\"\\n\")\nwriter.writeheader()\nwriter.writerows(filtered_records)\n\nprint(output_buf.getvalue().strip())\n",
    "hints": [
      {
        "en": "data = json.loads(api_response); writer = csv.DictWriter(output_buf, fieldnames=[\"user_id\", \"name\", \"total_spent\"])",
        "vi": "data = json.loads(api_response); writer = csv.DictWriter(output_buf, fieldnames=[\"user_id\", \"name\", \"total_spent\"])"
      }
    ],
    "solutionExplanation": {
      "en": "Demonstrates professional ETL data ingestion, payload parsing, filtering, and tabular serialization.",
      "vi": "Minh họa quy trình ETL chuyên nghiệp gồm nạp dữ liệu, phân tích JSON, lọc điều kiện và xuất bảng CSV."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_33_1",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 1: In REST API Payload & Customer Export, how does a software architect correctly handle json.dumps(indent=2)?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 1: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý json.dumps(indent=2) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to json.dumps(indent=2) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt json.dumps(indent=2) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "easy"
    },
    {
      "id": "py_q_33_2",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 2: In REST API Payload & Customer Export, how does a software architect correctly handle csv.DictReader(encoding='utf-8')?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 2: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý csv.DictReader(encoding='utf-8') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to csv.DictReader(encoding='utf-8') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt csv.DictReader(encoding='utf-8') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "medium"
    },
    {
      "id": "py_q_33_3",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 3: In REST API Payload & Customer Export, how does a software architect correctly handle csv.DictWriter?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 3: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý csv.DictWriter như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to csv.DictWriter guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt csv.DictWriter đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "hard"
    },
    {
      "id": "py_q_33_4",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 4: In REST API Payload & Customer Export, how does a software architect correctly handle json.loads()?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 4: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý json.loads() như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to json.loads() guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt json.loads() đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "medium"
    },
    {
      "id": "py_q_33_5",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 5: In REST API Payload & Customer Export, how does a software architect correctly handle json.dumps(indent=2)?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 5: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý json.dumps(indent=2) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to json.dumps(indent=2) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt json.dumps(indent=2) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "easy"
    },
    {
      "id": "py_q_33_6",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 6: In REST API Payload & Customer Export, how does a software architect correctly handle csv.DictReader(encoding='utf-8')?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 6: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý csv.DictReader(encoding='utf-8') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to csv.DictReader(encoding='utf-8') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt csv.DictReader(encoding='utf-8') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "hard"
    },
    {
      "id": "py_q_33_7",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 7: In REST API Payload & Customer Export, how does a software architect correctly handle csv.DictWriter?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 7: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý csv.DictWriter như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to csv.DictWriter guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt csv.DictWriter đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "easy"
    },
    {
      "id": "py_q_33_8",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 8: In REST API Payload & Customer Export, how does a software architect correctly handle json.loads()?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 8: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý json.loads() như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to json.loads() guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt json.loads() đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "medium"
    },
    {
      "id": "py_q_33_9",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 9: In REST API Payload & Customer Export, how does a software architect correctly handle json.dumps(indent=2)?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 9: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý json.dumps(indent=2) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to json.dumps(indent=2) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt json.dumps(indent=2) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "hard"
    },
    {
      "id": "py_q_33_10",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 10: In REST API Payload & Customer Export, how does a software architect correctly handle csv.DictReader(encoding='utf-8')?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 10: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý csv.DictReader(encoding='utf-8') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to csv.DictReader(encoding='utf-8') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt csv.DictReader(encoding='utf-8') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "medium"
    },
    {
      "id": "py_q_33_11",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 11: In REST API Payload & Customer Export, how does a software architect correctly handle csv.DictWriter?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 11: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý csv.DictWriter như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to csv.DictWriter guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt csv.DictWriter đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "easy"
    },
    {
      "id": "py_q_33_12",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 12: In REST API Payload & Customer Export, how does a software architect correctly handle json.loads()?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 12: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý json.loads() như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to json.loads() guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt json.loads() đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "hard"
    },
    {
      "id": "py_q_33_13",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 13: In REST API Payload & Customer Export, how does a software architect correctly handle json.dumps(indent=2)?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 13: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý json.dumps(indent=2) như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to json.dumps(indent=2) guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt json.dumps(indent=2) đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "easy"
    },
    {
      "id": "py_q_33_14",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 14: In REST API Payload & Customer Export, how does a software architect correctly handle csv.DictReader(encoding='utf-8')?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 14: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý csv.DictReader(encoding='utf-8') như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to csv.DictReader(encoding='utf-8') guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt csv.DictReader(encoding='utf-8') đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "medium"
    },
    {
      "id": "py_q_33_15",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 15: In REST API Payload & Customer Export, how does a software architect correctly handle csv.DictWriter?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 15: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý csv.DictWriter như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to csv.DictWriter guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt csv.DictWriter đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "hard"
    },
    {
      "id": "py_q_33_16",
      "type": "single_choice",
      "question": {
        "en": "[Working with CSV and JSON Data] Scenario 16: In REST API Payload & Customer Export, how does a software architect correctly handle json.loads()?",
        "vi": "[Làm Việc Với Dữ Liệu CSV và JSON] Tình huống 16: Trong REST API Payload & Customer Export, kiến trúc sư phần mềm nên xử lý json.loads() như thế nào cho chuẩn xác?"
      },
      "options": [
        {
          "en": "Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for Working with CSV and JSON Data",
          "vi": "Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho Làm Việc Với Dữ Liệu CSV và JSON"
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
        "en": "In REST API Payload & Customer Export, strict adherence to json.loads() guarantees thread safety, cross-platform stability, and resource protection.",
        "vi": "Trong REST API Payload & Customer Export, tuân thủ nghiêm ngặt json.loads() đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống."
      },
      "topicId": "python_csv_json_processing",
      "difficulty": "medium"
    }
  ]
};

export default lesson17;
