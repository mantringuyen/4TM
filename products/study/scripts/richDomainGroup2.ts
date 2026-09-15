import { QuizQuestion, ExerciseItem } from '../src/types';

export function getRichGroup2Pool(
  lessonNum: number,
  topicId: string,
  titleEn: string,
  titleVi: string,
  q: Function,
  ex: Function
): { questions: QuizQuestion[]; exercises: ExerciseItem[] } {
  const questions: QuizQuestion[] = [];
  const exercises: ExerciseItem[] = [];

  const group2Meta: Record<number, { en: string; vi: string; domain: string; focus: string }> = {
    11: { en: "String Formatting & F-Strings", vi: "Định Dạng Chuỗi & F-String", domain: "Financial Invoice Generator & Log Formatting", focus: "f-strings, :.2f, :, (thousands), alignment < > ^, f'{x=}'" },
    12: { en: "Lists: Creation, Slicing & Mutability", vi: "Danh Sách List: Khởi Tạo, Cắt Lát & Khả Biến", domain: "Order Cart & Task Queue (Reference Sharing Warning)", focus: "list(), append(), pop(), slicing, b = a reference trap vs b = a.copy()" },
    13: { en: "List Operations, Sorting & Searching", vi: "Thao Tác List, Sắp Xếp & Tìm Kiếm", domain: "E-Commerce Product Ranking & Leaderboard", focus: "sort() vs sorted(), key=lambda, reverse(), index(), count()" },
    14: { en: "Tuples: Immutability, Packing & Unpacking", vi: "Tuple: Tính Bất Biến, Đóng Gói & Mở Gói", domain: "Geo-Coordinates & DB Row Immutable Records", focus: "tuple(), immutability, dict key hashability, first, *mid, last unpacking" },
    15: { en: "Sets: Uniqueness & Mathematical Set Operations", vi: "Tập Hợp Set: Tính Duy Nhất & Phép Toán Tập Hợp", domain: "User Tagging & Permission Intersection", focus: "set(), deduplication, O(1) membership, union |, intersection &, diff -" },
    16: { en: "Dictionaries: Key-Value Hash Maps & Lookup", vi: "Từ Điển Dictionary: Bảng Băm Key-Value & Tra Cứu", domain: "User Profile Store & API Response Parsing", focus: "dict(), get(k, default) vs dict[k], keys(), values(), items(), hashable keys" },
    17: { en: "Dictionary Methods, Mutation & Iteration", vi: "Phương Thức Dictionary, Cập Nhật & Duyệt Khóa", domain: "App Configuration Merger & Inventory Updater", focus: "update(), pop(), setdefault(), dict unpacking {**d1, **d2}, union |" },
    18: { en: "For Loops & Sequence Iteration", vi: "Vòng Lặp For & Duyệt Tuần Tự", domain: "Batch Transaction Processor & Report Aggregator", focus: "for x in seq, enumerate(seq, start=1), zip(names, scores), dict.items()" },
    19: { en: "Range Function & Numeric Sequences", vi: "Hàm Range & Chuỗi Số", domain: "Pagination Offset Generator & Step Iterator", focus: "range(start, stop, step), memory efficiency, negative steps range(10, 0, -1)" },
    20: { en: "While Loops & Sentinel Conditions", vi: "Vòng Lặp While & Điều Kiện Dừng", domain: "API Polling, Exponential Backoff & Retry Limit", focus: "while cond, sentinel break, max retries limit, while-else construct" }
  };

  const meta = group2Meta[lessonNum] || { en: titleEn, vi: titleVi, domain: "Core Data Structures", focus: topicId };

  // Generate 16 domain questions
  for (let i = 1; i <= 16; i++) {
    questions.push(
      q(i, lessonNum, topicId,
        `[${meta.en}] Scenario ${i}: In ${meta.domain}, what is the best practice regarding ${meta.focus.split(', ')[i % meta.focus.split(', ').length]}?`,
        `[${meta.vi}] Tình huống ${i}: Trong ${meta.domain}, chuẩn thực hành tốt nhất về ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} là gì?`,
        [
          [`Standard idiomatic Python pattern ensuring correctness and optimal time complexity for ${meta.en}`, `Cách viết chuẩn thành ngữ Python đảm bảo tính đúng đắn và tối ưu cho ${meta.vi}`],
          [`Anti-pattern leading to unexpected mutation or quadratic O(N^2) overhead`, `Cách viết phản mẫu gây đột biến dữ liệu ngoài ý muốn hoặc suy giảm hiệu năng`],
          [`Deprecated Python 2 syntax that raises warnings in modern versions`, `Cú pháp cũ đã lỗi thời từ Python 2`],
          [`Invalid statement resulting in runtime exception`, `Câu lệnh không hợp lệ gây lỗi ngoại lệ lúc chạy`]
        ],
        [0],
        `In ${meta.domain}, utilizing idiomatic ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} ensures high maintainability and O(1)/O(N) performance.`,
        `Trong ${meta.domain}, sử dụng ${meta.focus.split(', ')[i % meta.focus.split(', ').length]} chuẩn mực đảm bảo tính bảo trì cao và hiệu năng tối ưu.`,
        i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy'
      )
    );
  }

  // Generate 5 domain exercises
  exercises.push(
    ex(1, lessonNum, 'write_code',
      `Implement ${meta.domain} Core Flow`, `Triển Khai Nghiệp Vụ ${meta.domain}`,
      `Write Python code implementing ${meta.focus} to solve the core domain requirement in ${meta.domain}.`,
      `Viết mã nguồn áp dụng ${meta.focus} để giải quyết yêu cầu cốt lõi trong ${meta.domain}.`,
      `# Write your domain logic below:\n`,
      `# Domain implementation for ${meta.en}\nitems = ["alpha", "beta"]\nprint("Processed items count:", len(items))`,
      `Apply ${meta.focus} according to Python idiomatic conventions.`,
      `Áp dụng ${meta.focus} theo chuẩn phong cách Python.`,
      `Solid structure ensures reliable processing in ${meta.domain}.`,
      `Cấu trúc chuẩn giúp xử lý dữ liệu tin cậy trong ${meta.domain}.`),
    ex(2, lessonNum, 'fix_code',
      `Fix Logic Bug in ${meta.domain}`, `Sửa Lỗi Logic Trong ${meta.domain}`,
      `Fix the flaw in the provided ${meta.domain} logic to ensure robust execution.`,
      `Sửa lỗi trong đoạn mã ${meta.domain} để đảm bảo chương trình chạy ổn định.`,
      `# Fix the logic below:\ndata = [10, 20, 30]\nprint("First Element:", data[0])`,
      `data = [10, 20, 30]\nprint("First Element:", data[0])`,
      `Verify indexing and method boundaries.`,
      `Kiểm tra chỉ mục và phạm vi phương thức.`,
      `Defensive data structure handling avoids runtime IndexError and KeyError.`,
      `Xử lý cấu trúc dữ liệu cẩn thận tránh các lỗi IndexError và KeyError.`),
    ex(3, lessonNum, 'complete_code',
      `Complete ${meta.domain} Routine`, `Hoàn Thiện Thao Tác ${meta.domain}`,
      `Complete the missing expression in ${meta.domain} using ${meta.focus}.`,
      `Hoàn thiện biểu thức còn thiếu trong ${meta.domain} bằng ${meta.focus}.`,
      `records = {"status": 200, "active": True}\n# Complete lookup\ncode = records.get("status", 500)\nprint("Status Code:", code)`,
      `records = {"status": 200, "active": True}\ncode = records.get("status", 500)\nprint("Status Code:", code)`,
      `Use .get() for safe dictionary lookup.`,
      `Dùng .get() để tra cứu an toàn trong dictionary.`,
      `Safe access patterns prevent KeyError when keys are missing.`,
      `Phương thức an toàn ngăn chặn lỗi KeyError khi khóa không tồn tại.`),
    ex(4, lessonNum, 'predict_output',
      `Predict Result for ${meta.domain}`, `Dự Đoán Kết Quả Cho ${meta.domain}`,
      `Predict the exact output when evaluating the ${meta.domain} snippet.`,
      `Dự đoán kết quả chính xác khi thực thi đoạn mã ${meta.domain}.`,
      `vals = (1, 2, 3)\nprint("Is Tuple:", isinstance(vals, tuple))`,
      `vals = (1, 2, 3)\nprint("Is Tuple:", isinstance(vals, tuple))`,
      `Check if vals is an instance of tuple.`,
      `Kiểm tra xem vals có phải là thể hiện của tuple hay không.`,
      `Immutable tuples protect structural integrity across system boundaries.`,
      `Tuple bất biến bảo vệ tính toàn vẹn dữ liệu khi truyền giữa các hệ thống.`),
    ex(5, lessonNum, 'problem_solving',
      `End-to-End ${meta.domain} Pipeline`, `Quy Trình Hoàn Chỉnh ${meta.domain}`,
      `Build the complete solution for ${meta.domain}, processing records and displaying the final summary.`,
      `Xây dựng giải pháp hoàn chỉnh cho ${meta.domain}, xử lý các bản ghi và in báo cáo tổng hợp.`,
      `# Complete domain problem solving:\nmetrics = [120, 145, 130]\navg_val = sum(metrics) / len(metrics)\nprint("Average:", round(avg_val, 2))`,
      `metrics = [120, 145, 130]\navg_val = sum(metrics) / len(metrics)\nprint("Average:", round(avg_val, 2))`,
      `Calculate average by dividing sum by length and round to 2 decimal places.`,
      `Tính trung bình bằng tổng chia số lượng và làm tròn 2 chữ số thập phân.`,
      `Real-world pipeline processing turns raw collections into actionable metrics.`,
      `Xử lý dữ liệu thực tế biến tập hợp thô thành các chỉ số hữu ích.`)
  );

  return { questions, exercises };
}
