import { QuizQuestion, ExerciseItem } from '../src/types';

export function getRichGroup4Pool(
  lessonNum: number,
  topicId: string,
  titleEn: string,
  titleVi: string,
  q: Function,
  ex: Function
): { questions: QuizQuestion[]; exercises: ExerciseItem[] } {
  const questions: QuizQuestion[] = [];
  const exercises: ExerciseItem[] = [];

  const group4Meta: Record<number, { en: string; vi: string; domain: string; focus: string }> = {
    31: { en: "Functional Tools: Map, Filter, Zip & Reduce", vi: "Công Cụ Hàm: Map, Filter, Zip & Reduce", domain: "Data Stream Transformation & Accumulation", focus: "map(), filter(), zip(), itertools.zip_longest, functools.reduce" },
    32: { en: "File I/O: Context Managers & UTF-8 Encoding", vi: "Nhập Xuất Tệp: Context Manager & Mã Hóa UTF-8", domain: "Server Log Writer & Audit Trail (Mandatory UTF-8)", focus: "with open(file, 'r', encoding='utf-8'), modes r/w/a/rb/wb, readlines, flush" },
    33: { en: "Working with CSV and JSON Data", vi: "Làm Việc Với Dữ Liệu CSV và JSON", domain: "REST API Payload & Customer Export", focus: "json.loads(), json.dumps(indent=2), csv.DictReader(encoding='utf-8'), csv.DictWriter" },
    34: { en: "Modern File Systems with Pathlib", vi: "Hệ Thống Tệp Hiện Đại Với Pathlib", domain: "Automated Directory Scanner & Path Resolver", focus: "pathlib.Path, / operator, .glob('*.log'), .read_text(encoding='utf-8'), mkdir(parents=True, exist_ok=True)" },
    35: { en: "Exception Handling: Try, Except & Hierarchy", vi: "Xử Lý Ngoại Lệ: Try, Except & Cây Phân Cấp Lỗi", domain: "Payment Gateway Error Interceptor", focus: "Exception hierarchy (BaseException -> Exception -> ValueError), catch specific exceptions first, avoid bare except" },
    36: { en: "Advanced Exceptions: Else, Finally & Chaining", vi: "Ngoại Lệ Nâng Cao: Else, Finally & Nối Chuỗi Lỗi", domain: "Database Connection Pool Recovery & Error Chaining", focus: "try-except-else-finally, raise ... from err (exception chaining), clean resource disposal" },
    37: { en: "Custom Exceptions & Domain Error Hierarchies", vi: "Ngoại Lệ Tự Định Nghĩa & Cây Lỗi Nghiệp Vụ", domain: "E-Commerce Checkout Error Tree", focus: "subclassing Exception, base domain error class, attaching metadata (code, status, details)" },
    38: { en: "Object-Oriented Programming: Classes & State", vi: "Lập Trình Hướng Đối Tượng: Lớp & Trạng Thái", domain: "Bank Account & User Entity Model", focus: "class, __init__, self instance attributes vs class attributes, mutable class attribute trap" },
    39: { en: "Encapsulation, Property Decorators & Access", vi: "Đóng Gói, Decorator Property & Quyền Truy Cập", domain: "User Authentication Credentials & Validated Balance", focus: "public, _protected, __private name mangling, @property getters & @setter validation" },
    40: { en: "Inheritance, Polymorphic Override & Super", vi: "Kế Thừa, Ghi Đè Đa Hình & Super Forwarding", domain: "Cloud Notification Dispatcher (Email/SMS/Slack)", focus: "single & multiple inheritance, method overriding, super().__init__(*args, **kwargs), MRO (__mro__)" }
  };

  const meta = group4Meta[lessonNum] || { en: titleEn, vi: titleVi, domain: "I/O, Exceptions & OOP Architecture", focus: topicId };

  // Generate 16 domain questions
  for (let i = 1; i <= 16; i++) {
    questions.push(
      q(i, lessonNum, topicId,
        `[${meta.en}] Scenario ${i}: In ${meta.domain}, how does a software architect correctly handle ${meta.focus.split(', ')[i % meta.focus.split(', ').length]}?`,
        `[${meta.vi}] Tình huống ${i}: Trong ${meta.domain}, kiến trúc sư phần mềm nên xử lý ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} như thế nào cho chuẩn xác?`,
        [
          [`Standard production architecture adhering to Python OOP, robust exception handling, and explicit UTF-8 encoding standards for ${meta.en}`, `Kiến trúc chuẩn tuân thủ hướng đối tượng của Python, xử lý ngoại lệ chặt chẽ và chuẩn mã hóa UTF-8 tường minh cho ${meta.vi}`],
          [`Anti-pattern catching bare exceptions, omitting UTF-8 encoding, or improperly mutating shared class attributes`, `Cách làm phản mẫu bắt ngoại lệ chung chung, bỏ quên mã hóa UTF-8 hoặc làm đột biến thuộc tính lớp dùng chung`],
          [`Deprecated Python 2 idiom incompatible with modern Python 3 frameworks`, `Cách viết cũ không tương thích với các framework Python 3 hiện đại`],
          [`Invalid statement resulting in runtime crash or silent resource leak`, `Câu lệnh không hợp lệ gây sập ứng dụng hoặc rò rỉ tài nguyên`]
        ],
        [0],
        `In ${meta.domain}, strict adherence to ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} guarantees thread safety, cross-platform stability, and resource protection.`,
        `Trong ${meta.domain}, tuân thủ nghiêm ngặt ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} đảm bảo an toàn đa luồng, tương thích đa nền tảng và bảo vệ tài nguyên hệ thống.`,
        i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy'
      )
    );
  }

  // Generate 5 domain exercises
  exercises.push(
    ex(1, lessonNum, 'write_code',
      `Implement ${meta.domain}`, `Triển Khai ${meta.domain}`,
      `Write production-grade Python code implementing ${meta.focus} for ${meta.domain}.`,
      `Viết đoạn mã chuẩn doanh nghiệp áp dụng ${meta.focus} cho ${meta.domain}.`,
      `# Write your domain logic below:\n`,
      `# Implementation for ${meta.en}\nclass BaseService:\n    def __init__(self, name):\n        self.name = name\n    def status(self):\n        return f"Service {self.name} active"\n\nsrv = BaseService("AuthAPI")\nprint(srv.status())`,
      `Apply ${meta.focus} following Python OOP and I/O best practices.`,
      `Áp dụng ${meta.focus} theo chuẩn hướng đối tượng và I/O của Python.`,
      `Clean architectural patterns ensure enterprise robustness.`,
      `Mô hình kiến trúc rõ ràng đảm bảo độ tin cậy cấp doanh nghiệp.`),
    ex(2, lessonNum, 'fix_code',
      `Fix Flaw in ${meta.domain}`, `Sửa Lỗi Trong ${meta.domain}`,
      `Fix the architectural or encoding bug in ${meta.domain}.`,
      `Sửa lỗi kiến trúc hoặc lỗi mã hóa ký tự trong ${meta.domain}.`,
      `# Fix exception handling order:\ntry:\n    val = int("invalid_number")\nexcept ValueError as e:\n    print("Caught specific error:", type(e).__name__)\nexcept Exception as e:\n    print("Fallback generic error:", type(e).__name__)`,
      `try:\n    val = int("invalid_number")\nexcept ValueError as e:\n    print("Caught specific error:", type(e).__name__)\nexcept Exception as e:\n    print("Fallback generic error:", type(e).__name__)`,
      `Catch specific exceptions before catching generic Exception.`,
      `Bắt ngoại lệ cụ thể trước khi bắt Exception chung.`,
      `Catching specific exceptions prevents masking unrelated operational errors.`,
      `Bắt lỗi cụ thể giúp tránh che giấu các lỗi hệ thống không liên quan.`),
    ex(3, lessonNum, 'complete_code',
      `Complete ${meta.domain} Component`, `Hoàn Thiện Thành Phần ${meta.domain}`,
      `Complete the missing construct in ${meta.domain} applying ${meta.focus}.`,
      `Điền cú pháp còn thiếu trong ${meta.domain} áp dụng ${meta.focus}.`,
      `# Complete subclass with super forwarding\nclass Notification:\n    def __init__(self, sender):\n        self.sender = sender\n\nclass EmailNotification(Notification):\n    def __init__(self, sender, recipient, *args, **kwargs):\n        super().__init__(sender, *args, **kwargs)\n        self.recipient = recipient\n\nemail = EmailNotification("system@corp.com", "user@corp.com")\nprint("Sender:", email.sender, "| Recipient:", email.recipient)`,
      `class Notification:\n    def __init__(self, sender):\n        self.sender = sender\n\nclass EmailNotification(Notification):\n    def __init__(self, sender, recipient, *args, **kwargs):\n        super().__init__(sender, *args, **kwargs)\n        self.recipient = recipient\n\nemail = EmailNotification("system@corp.com", "user@corp.com")\nprint("Sender:", email.sender, "| Recipient:", email.recipient)`,
      `Use super().__init__(sender, *args, **kwargs) to initialize base attributes.`,
      `Dùng super().__init__(sender, *args, **kwargs) để khởi tạo lớp cha.`,
      `Proper super() delegation guarantees clean multi-level inheritance cooperation.`,
      `Ủy quyền super() đúng cách đảm bảo sự kế thừa nhiều tầng diễn ra trơn tru.`),
    ex(4, lessonNum, 'predict_output',
      `Predict Execution Output for ${meta.domain}`, `Dự Đoán Kết Quả ${meta.domain}`,
      `Predict and verify the execution result for the ${meta.domain} component.`,
      `Dự đoán và kiểm tra kết quả thực thi của thành phần ${meta.domain}.`,
      `class BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n    @property\n    def balance(self):\n        return self._balance\n\nacc = BankAccount(1500)\nprint("Account Balance:", acc.balance)`,
      `class BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n    @property\n    def balance(self):\n        return self._balance\n\nacc = BankAccount(1500)\nprint("Account Balance:", acc.balance)`,
      `Property decorator exposes managed attribute access via acc.balance.`,
      `Decorator @property cho phép truy cập thuộc tính như biến thường qua acc.balance.`,
      `Properties encapsulate validation logic while presenting clean public interfaces.`,
      `Property đóng gói logic kiểm tra hợp lệ nhưng vẫn giữ giao diện truy cập ngắn gọn.`),
    ex(5, lessonNum, 'problem_solving',
      `End-to-End ${meta.domain} Pipeline`, `Quy Trình Hoàn Chỉnh ${meta.domain}`,
      `Implement the complete end-to-end handler for ${meta.domain}, processing input data and printing the formatted result.`,
      `Triển khai quy trình xử lý hoàn chỉnh cho ${meta.domain}, xử lý dữ liệu và in kết quả định dạng chuẩn.`,
      `# Domain pipeline solver:\nimport json\n\nraw_payload = '{"service": "PaymentGateway", "active": true, "timeout_ms": 3000}'\npayload = json.loads(raw_payload)\nprint("Service:", payload["service"], "| Timeout:", payload["timeout_ms"])`,
      `import json\n\nraw_payload = '{"service": "PaymentGateway", "active": true, "timeout_ms": 3000}'\npayload = json.loads(raw_payload)\nprint("Service:", payload["service"], "| Timeout:", payload["timeout_ms"])`,
      `Use json.loads() to parse JSON string into Python dict.`,
      `Dùng json.loads() để giải mã chuỗi JSON thành dictionary trong Python.`,
      `JSON serialization is foundational for REST APIs and distributed microservices.`,
      `Chuyển đổi dữ liệu JSON là nền tảng cốt lõi cho REST API và kiến trúc vi dịch vụ.`)
  );

  return { questions, exercises };
}
