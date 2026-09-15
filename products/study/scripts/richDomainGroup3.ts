import { QuizQuestion, ExerciseItem } from '../src/types';

export function getRichGroup3Pool(
  lessonNum: number,
  topicId: string,
  titleEn: string,
  titleVi: string,
  q: Function,
  ex: Function
): { questions: QuizQuestion[]; exercises: ExerciseItem[] } {
  const questions: QuizQuestion[] = [];
  const exercises: ExerciseItem[] = [];

  const group3Meta: Record<number, { en: string; vi: string; domain: string; focus: string }> = {
    21: { en: "Loop Control Statements & Loop-Else", vi: "Điều Khiển Vòng Lặp & Khối Else", domain: "Data Stream Scanner & Search Sentinel", focus: "break, continue, pass, loop else clause, search sentinel flag" },
    22: { en: "Functions: Definition, Return Values & Docstrings", vi: "Hàm: Định Nghĩa, Giá Trị Trả Về & Docstrings", domain: "Financial Tax Calculator & Service Utilities", focus: "def, return multiple values (tuples), docstrings, None return default" },
    23: { en: "Function Parameters, Defaults & Keyword-Only", vi: "Tham Số Hàm, Giá Trị Mặc Định & Keyword-Only", domain: "API Request Builder & Mutable Default Trap", focus: "positional vs keyword, mutable default trap (arg=None), keyword-only *" },
    24: { en: "Lambda Expressions & Anonymous Functions", vi: "Biểu Thức Lambda & Hàm Ẩn Danh", domain: "Order Book Sorting & Custom Ranking Keys", focus: "lambda x: expr, sorted(key=lambda), min/max with key, PEP 8 lambda warnings" },
    25: { en: "Lists Mutability & Shallow vs Deep Copy", vi: "Tính Khả Biến & Bản Sao Nông vs Bản Sao Sâu", domain: "Nested Configuration State & 2D Grid Initializer", focus: "copy.copy() vs copy.deepcopy(), [[0]*3]*3 reference trap vs list comprehension" },
    26: { en: "Advanced Dictionaries: DefaultDict & Counter", vi: "Từ Điển Nâng Cao: DefaultDict & Counter", domain: "Web Server Log Aggregator & Word Frequency Counter", focus: "collections.defaultdict(list), collections.Counter, most_common(), grouping" },
    27: { en: "Arbitrary Arguments: *args and **kwargs", vi: "Tham Số Biến Động: *args và **kwargs", domain: "Canonical Parameter Forwarding & Wrapper Decorators", focus: "*args tuple packing, **kwargs dict packing, canonical forwarding func(*args, **kwargs)" },
    28: { en: "Variable Scope & The LEGB Rule", vi: "Phạm Vi Biến & Quy Tắc LEGB", domain: "Stateful Closures & Global vs Instance State", focus: "LEGB resolution, nonlocal vs global, re-binding vs in-place mutation without global, self.attr vs lexical scope" },
    29: { en: "List Comprehensions & Conditional Filtering", vi: "List Comprehension & Lọc Điều Kiện", domain: "Analytics ETL Filtering & Matrix Flattening", focus: "[x for x in seq if cond], [x if c else y for x in seq], nested matrix flattening" },
    30: { en: "Dictionary & Set Comprehensions", vi: "Dict & Set Comprehension", domain: "Cache Index Inverter & Unique Domain Extractor", focus: "{k: v for ...}, {x for x in seq}, inverted index {v: k for k, v in d.items()}" }
  };

  const meta = group3Meta[lessonNum] || { en: titleEn, vi: titleVi, domain: "Functional & Scoping Architecture", focus: topicId };

  // Generate 16 domain questions
  for (let i = 1; i <= 16; i++) {
    questions.push(
      q(i, lessonNum, topicId,
        `[${meta.en}] Scenario ${i}: In ${meta.domain}, how should an engineer properly utilize ${meta.focus.split(', ')[i % meta.focus.split(', ').length]}?`,
        `[${meta.vi}] Tình huống ${i}: Trong ${meta.domain}, kỹ sư nên áp dụng ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} như thế nào cho chuẩn xác?`,
        [
          [`Standard idiomatic approach ensuring scoping correctness, proper mutation isolation, and clean argument forwarding for ${meta.en}`, `Cách tiếp cận chuẩn mực đảm bảo đúng phạm vi biến, cô lập biến đổi và chuyển tiếp tham số an toàn cho ${meta.vi}`],
          [`Anti-pattern introducing insidious reference sharing bugs or unintended global namespace pollution`, `Cách làm phản mẫu gây lỗi tham chiếu dùng chung hoặc làm ô nhiễm không gian tên toàn cục`],
          [`Outdated syntax that violates modern Python 3 best practices`, `Cú pháp lỗi thời vi phạm chuẩn thực hành hiện đại của Python 3`],
          [`Invalid construct raising SyntaxError or UnboundLocalError`, `Cú pháp không hợp lệ gây lỗi cú pháp hoặc lỗi UnboundLocalError`]
        ],
        [0],
        `In ${meta.domain}, properly adhering to ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} prevents runtime scope errors and data corruption.`,
        `Trong ${meta.domain}, tuân thủ ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} giúp ngăn chặn lỗi phạm vi biến và rò rỉ dữ liệu ngoài ý muốn.`,
        i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy'
      )
    );
  }

  // Generate 5 domain exercises
  exercises.push(
    ex(1, lessonNum, 'write_code',
      `Implement ${meta.domain}`, `Triển Khai ${meta.domain}`,
      `Write a complete functional snippet applying ${meta.focus} for ${meta.domain}.`,
      `Viết đoạn mã áp dụng ${meta.focus} cho ${meta.domain}.`,
      `# Write your code below:\n`,
      `# Domain implementation for ${meta.en}\ndef process_data(items):\n    return [x * 2 for x in items]\n\nresult = process_data([10, 20, 30])\nprint("Processed:", result)`,
      `Apply ${meta.focus} using Python best practices.`,
      `Áp dụng ${meta.focus} theo chuẩn thực hành tốt của Python.`,
      `Functional clarity guarantees modularity and testability.`,
      `Sự rõ ràng về mặt hàm số đảm bảo tính mô-đun và dễ kiểm thử.`),
    ex(2, lessonNum, 'fix_code',
      `Fix Scoping or Parameter Bug in ${meta.domain}`, `Sửa Lỗi Phạm Vi Hoặc Tham Số Trong ${meta.domain}`,
      `Fix the subtle bug in ${meta.domain} involving ${meta.focus}.`,
      `Sửa lỗi tinh vi trong ${meta.domain} liên quan đến ${meta.focus}.`,
      `# Fix mutable default argument trap:\ndef append_event(event, event_log=None):\n    if event_log is None:\n        event_log = []\n    event_log.append(event)\n    return event_log\n\nlog1 = append_event("LOGIN")\nprint("Log:", log1)`,
      `def append_event(event, event_log=None):\n    if event_log is None:\n        event_log = []\n    event_log.append(event)\n    return event_log\n\nlog1 = append_event("LOGIN")\nprint("Log:", log1)`,
      `Always use arg=None as default for mutable collections.`,
      `Luôn dùng arg=None làm giá trị mặc định cho tập hợp có thể thay đổi.`,
      `Using None with lazy instantiation avoids the notorious mutable default argument bug.`,
      `Dùng None kết hợp khởi tạo lười tránh được lỗi bẫy tham số mặc định khả biến.`),
    ex(3, lessonNum, 'complete_code',
      `Complete ${meta.domain} Routine`, `Hoàn Thiện Thao Tác ${meta.domain}`,
      `Fill in the missing line to correctly apply ${meta.focus}.`,
      `Điền dòng mã còn thiếu để áp dụng chính xác ${meta.focus}.`,
      `# Complete canonical forwarding wrapper\ndef execute(func, *args, **kwargs):\n    return func(*args, **kwargs)\n\nres = execute(lambda a, b: a + b, 15, 25)\nprint("Result:", res)`,
      `def execute(func, *args, **kwargs):\n    return func(*args, **kwargs)\n\nres = execute(lambda a, b: a + b, 15, 25)\nprint("Result:", res)`,
      `Forward both *args and **kwargs to the target function.`,
      `Chuyển tiếp cả *args và **kwargs vào hàm mục tiêu.`,
      `Canonical *args, **kwargs forwarding preserves all positional and keyword parameters.`,
      `Chuyển tiếp chuẩn *args, **kwargs bảo toàn toàn bộ tham số vị trí và từ khóa.`),
    ex(4, lessonNum, 'predict_output',
      `Predict Evaluation for ${meta.domain}`, `Dự Đoán Kết Quả ${meta.domain}`,
      `Predict and verify the execution result of the snippet applying ${meta.focus}.`,
      `Dự đoán và kiểm tra kết quả thực thi của đoạn mã áp dụng ${meta.focus}.`,
      `nums = [1, 2, 3, 4, 5]\nevens_squared = [x**2 for x in nums if x % 2 == 0]\nprint("Evens Squared:", evens_squared)`,
      `nums = [1, 2, 3, 4, 5]\nevens_squared = [x**2 for x in nums if x % 2 == 0]\nprint("Evens Squared:", evens_squared)`,
      `Filter even numbers (2, 4) and square them (4, 16).`,
      `Lọc số chẵn (2, 4) và bình phương lên (4, 16).`,
      `Comprehensions provide fast, C-level looping performance in CPython.`,
      `Comprehension chạy ở tầng C nội bộ của CPython cho tốc độ xử lý rất cao.`),
    ex(5, lessonNum, 'problem_solving',
      `End-to-End ${meta.domain} Engine`, `Bộ Xử Lý Hoàn Chỉnh ${meta.domain}`,
      `Build the complete solution solving ${meta.domain}, processing input data and printing the formatted result.`,
      `Xây dựng giải pháp hoàn chỉnh cho ${meta.domain}, xử lý dữ liệu đầu vào và in kết quả định dạng chuẩn.`,
      `# Domain problem solver:\nraw_records = [("user1", 100), ("user2", 250), ("user1", 150)]\nfrom collections import defaultdict\ntotals = defaultdict(int)\nfor user, amount in raw_records:\n    totals[user] += amount\nprint("Aggregated:", dict(totals))`,
      `from collections import defaultdict\nraw_records = [("user1", 100), ("user2", 250), ("user1", 150)]\ntotals = defaultdict(int)\nfor user, amount in raw_records:\n    totals[user] += amount\nprint("Aggregated:", dict(totals))`,
      `Use collections.defaultdict(int) to group and sum amounts by user.`,
      `Dùng collections.defaultdict(int) để gom nhóm và tính tổng theo từng người dùng.`,
      `Aggregations with defaultdict avoid repetitive key existence checks.`,
      `Gom nhóm với defaultdict giúp mã nguồn gọn gàng và tránh kiểm tra khóa thủ công.`)
  );

  return { questions, exercises };
}
