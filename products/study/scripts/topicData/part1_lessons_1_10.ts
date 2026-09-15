import { QuizQuestion, ExerciseItem } from '../../src/types';

export interface TopicData {
  questions: Omit<QuizQuestion, 'id'>[];
  exercises: Omit<ExerciseItem, 'id'>[];
}

export const part1TopicData: Record<number, TopicData> = {};

// Helper
const q = (
  en: string,
  vi: string,
  opts: [string, string][],
  ans: number[],
  expEn: string,
  expVi: string,
  topicId: string,
  diff: 'easy' | 'medium' | 'hard' = 'medium',
  type: 'single_choice' | 'multiple_choice' = 'single_choice'
): Omit<QuizQuestion, 'id'> => ({
  type,
  question: { en, vi },
  options: opts.map(([oEn, oVi]) => ({ en: oEn, vi: oVi })),
  correctAnswers: ans,
  explanation: { en: expEn, vi: expVi },
  topicId,
  difficulty: diff
});

const ex = (
  type: 'write_code' | 'fix_code' | 'complete_code' | 'predict_output' | 'problem_solving',
  titleEn: string,
  titleVi: string,
  instEn: string,
  instVi: string,
  starterCode: string,
  solutionCode: string,
  hintEn: string,
  hintVi: string,
  expEn: string,
  expVi: string
): Omit<ExerciseItem, 'id'> => ({
  type,
  title: { en: titleEn, vi: titleVi },
  instruction: { en: instEn, vi: instVi },
  starterCode,
  solutionCode,
  hint: { en: hintEn, vi: hintVi },
  explanation: { en: expEn, vi: expVi }
});

// LESSON 1: python_foundations
part1TopicData[1] = {
  questions: [
    q("Who created Python and in what year was it first released?", "Ai là người sáng tạo ra Python và năm phát hành đầu tiên là năm nào?",
      [["Guido van Rossum in 1991", "Guido van Rossum năm 1991"], ["Dennis Ritchie in 1972", "Dennis Ritchie năm 1972"], ["James Gosling in 1995", "James Gosling năm 1995"], ["Bjarne Stroustrup in 1985", "Bjarne Stroustrup năm 1985"]],
      [0], "Guido van Rossum released Python in 1991 focusing on clean syntax.", "Guido van Rossum phát hành Python năm 1991 nhấn mạnh tính dễ đọc.", "python_foundations", "easy"),
    q("What is the role of the Python Virtual Machine (PVM)?", "Vai trò của Máy ảo Python (PVM) là gì?",
      [["Executes intermediate bytecode instructions line by line", "Thực thi từng chỉ lệnh bytecode trung gian"], ["Compiles C++ source into machine code", "Biên dịch mã C++ sang mã máy"], ["Manages browser DOM tree rendering", "Quản lý kết xuất cây DOM trình duyệt"], ["Transpiles Python directly to JavaScript", "Chuyển mã Python trực tiếp sang JavaScript"]],
      [0], "The PVM is the runtime engine executing Python bytecode.", "PVM là cỗ máy runtime thực thi bytecode Python.", "python_foundations", "easy"),
    q("What does REPL stand for in Python?", "Thuật ngữ REPL trong Python viết tắt của gì?",
      [["Read-Eval-Print Loop", "Read-Eval-Print Loop (Đọc-Đánh giá-In-Lặp lại)"], ["Runtime Evaluation Program Language", "Runtime Evaluation Program Language"], ["Recursive Evaluation Process Logic", "Recursive Evaluation Process Logic"], ["Realtime Environment Parser Level", "Realtime Environment Parser Level"]],
      [0], "REPL stands for Read-Eval-Print Loop, an interactive shell.", "REPL là môi trường dòng lệnh tương tác trực tiếp.", "python_foundations", "easy"),
    q("How are single-line comments written in Python?", "Chú thích dòng đơn trong Python viết như thế nào?",
      [["Using the # character", "Dùng ký tự #"], ["Using // characters", "Dùng ký tự //"], ["Using -- characters", "Dùng ký tự --"], ["Using /* */ delimiters", "Dùng cặp /* */"]],
      [0], "# is used for single-line comments in Python.", "Dấu # dùng cho chú thích dòng đơn.", "python_foundations", "easy"),
    q("What command displays The Zen of Python?", "Lệnh nào hiển thị triết lý The Zen of Python?",
      [["import this", "import this"], ["import zen", "import zen"], ["help(zen)", "help(zen)"], ["show_zen()", "show_zen()"]],
      [0], "'import this' triggers Tim Peters' Zen of Python guiding aphorisms.", "'import this' in ra 19 triết lý thiết kế của Python.", "python_foundations", "easy"),
    q("Which file extension is standard for compiled Python bytecode?", "Phần mở rộng nào là chuẩn cho tệp bytecode đã biên dịch?",
      [[".pyc", ".pyc"], [".py", ".py"], [".class", ".class"], [".pyd", ".pyd"]],
      [0], ".pyc stores cached compiled bytecode inside __pycache__.", ".pyc chứa bytecode biên dịch sẵn lưu trong thư mục __pycache__.", "python_foundations", "medium"),
    q("Why does Python use indentation instead of curly braces {}?", "Tại sao Python sử dụng thụt lề thay vì ngoặc nhọn {}?",
      [["To enforce clean visual structure and readability", "Để bắt buộc cấu trúc đồng nhất và dễ đọc"], ["Because computers parse indentation faster than braces", "Vì máy tính đọc thụt lề nhanh hơn"], ["Because ASCII lacked curly braces when Python was born", "Vì bảng mã ASCII cũ thiếu dấu ngoặc nhọn"], ["Indentation is optional in Python", "Thụt lề là tùy chọn"]],
      [0], "Python enforces indentation as syntax to ensure readable codebases.", "Python quy định thụt lề như một cú pháp bắt buộc để mã nguồn luôn dễ đọc.", "python_foundations", "medium"),
    q("What is CPython?", "CPython là gì?",
      [["The reference implementation of Python written in C", "Bản triển khai tham chiếu tiêu chuẩn của Python viết bằng C"], ["A compiler translating C code to Python", "Trình biên dịch mã C sang Python"], ["A Python library for microcontrollers", "Thư viện Python cho vi điều khiển"], ["A closed-source proprietary distribution", "Bản phân phối mã nguồn đóng"]],
      [0], "CPython is the official, standard Python implementation maintained by python.org.", "CPython là bản triển khai tham chiếu chuẩn mực của Python.", "python_foundations", "medium"),
    q("Which built-in function writes text to standard output?", "Hàm tích hợp sẵn nào xuất văn bản ra console?",
      [["print()", "print()"], ["echo()", "echo()"], ["display()", "display()"], ["console.log()", "console.log()"]],
      [0], "print() is the built-in output function in Python.", "print() là hàm xuất dữ liệu có sẵn trong Python.", "python_foundations", "easy"),
    q("What happens when a Python script has a SyntaxError?", "Điều gì xảy ra khi mã nguồn Python có lỗi SyntaxError?",
      [["It halts during parsing before running any code", "Chương trình dừng ngay ở bước phân tích cú pháp trước khi chạy bất kỳ dòng mã nào"], ["It runs up to the bad line and then crashes", "Chương trình chạy đến dòng lỗi rồi mới dừng"], ["It auto-fixes the syntax and continues", "Tự động sửa cú pháp và chạy tiếp"], ["The error is ignored", "Lỗi bị bỏ qua"]],
      [0], "Syntax errors prevent bytecode compilation entirely.", "Lỗi cú pháp khiến chương trình không thể biên dịch ra bytecode.", "python_foundations", "hard"),
    q("How does Python categorize typing discipline?", "Python thuộc loại ngôn ngữ định kiểu nào?",
      [["Dynamically and strongly typed", "Định kiểu động và định kiểu mạnh (dynamically & strongly typed)"], ["Statically and weakly typed", "Định kiểu tĩnh và định kiểu yếu"], ["Dynamically and weakly typed", "Định kiểu động và định kiểu yếu"], ["Purely untyped", "Hoàn toàn không có kiểu"]],
      [0], "Python binds types at runtime and prevents invalid cross-type operations.", "Python gán kiểu động lúc chạy và kiểm soát chặt chẽ phép toán giữa các kiểu.", "python_foundations", "medium"),
    q("Where are compiled .pyc files cached by default in Python 3?", "Trong Python 3, tệp .pyc mặc định được lưu ở đâu?",
      [["__pycache__ directory", "Thư mục __pycache__"], [".bin directory", "Thư mục .bin"], ["/tmp directory", "Thư mục /tmp"], ["In the root directory alongside .py", "Cùng cấp trong thư mục gốc"]],
      [0], "Python 3 stores cached bytecode in __pycache__.", "Python 3 gom bytecode vào thư mục __pycache__.", "python_foundations", "medium"),
    q("Which module provides interpreter runtime info like sys.version?", "Mô-đun nào cung cấp thông tin hệ thống và phiên bản Python?",
      [["sys", "sys"], ["os", "os"], ["platform", "platform"], ["env", "env"]],
      [0], "sys module gives direct access to interpreter parameters.", "Mô-đun sys cung cấp các thông số của trình thông dịch.", "python_foundations", "easy"),
    q("What does PEP stand for in Python development?", "Thuật ngữ PEP trong hệ sinh thái Python viết tắt của gì?",
      [["Python Enhancement Proposal", "Python Enhancement Proposal (Đề xuất Cải tiến Python)"], ["Program Execution Protocol", "Program Execution Protocol"], ["Python Error Prevention", "Python Error Prevention"], ["Package Extension Process", "Package Extension Process"]],
      [0], "PEPs are design documents for Python features and standards.", "PEP là các tài liệu đề xuất tính năng và tiêu chuẩn cho Python.", "python_foundations", "medium"),
    q("What is PEP 8?", "PEP 8 là tiêu chuẩn gì trong Python?",
      [["The official Style Guide for Python Code", "Hướng dẫn chuẩn phong cách viết mã nguồn Python (Style Guide)"], ["The Python compiler specification", "Đặc tả kỹ thuật của trình biên dịch Python"], ["The memory management protocol", "Giao thức quản lý bộ nhớ của Python"], ["The asyncio standard library specification", "Đặc tả thư viện bất đồng bộ asyncio"]],
      [0], "PEP 8 specifies naming conventions, 4-space indentation, line length, etc.", "PEP 8 quy định quy chuẩn đặt tên, thụt lề 4 dấu cách, độ dài dòng, v.v.", "python_foundations", "easy"),
    q("What is the result of executing print('Python'[0])?", "Kết quả khi thực thi lệnh print('Python'[0]) là gì?",
      [["'P'", "'P'"], ["'y'", "'y'"], ["'Python'", "'Python'"], ["IndexError", "IndexError"]],
      [0], "Python uses 0-based indexing for sequence indexing, so index 0 returns 'P'.", "Python sử dụng chỉ mục bắt đầu từ 0, do đó chỉ mục 0 trả về ký tự 'P'.", "python_foundations", "easy")
  ],
  exercises: [
    ex('fix_code', "Fix Case-Sensitive Print Function", "Sửa Lỗi Hàm Print Viết Hoa",
      "Change Print to lowercase print to fix the NameError.", "Đổi Print thành chữ thường print để sửa lỗi NameError.",
      'Print("Welcome to 4TM Python!")', 'print("Welcome to 4TM Python!")',
      "Use lowercase print()", "Dùng hàm print() chữ thường",
      "Built-in functions in Python are case-sensitive and lowercase.", "Các hàm tích hợp sẵn trong Python bắt buộc phải viết chữ thường."),
    ex('complete_code', "Output Two Computed Values", "In Hai Giá Trị Tính Toán",
      "Complete the print call to output the result of 15 * 4.", "Hoàn thiện lệnh print để in ra kết quả phép nhân 15 * 4.",
      'print("Result is:", )', 'print("Result is:", 15 * 4)',
      "Pass 15 * 4 as the second argument.", "Truyền 15 * 4 làm tham số thứ hai.",
      "print() accepts multiple comma-separated arguments.", "print() có thể nhận nhiều tham số ngăn cách bởi dấu phẩy."),
    ex('write_code', "Print System Banner", "In Biểu Ngữ Hệ Thống",
      "Write a print statement that outputs '=== 4TM Python Engine Active ==='.", "Viết lệnh print in ra dòng chữ '=== 4TM Python Engine Active ==='.",
      '# Write your code below:\n', 'print("=== 4TM Python Engine Active ===")',
      "Use print with the exact string.", "Dùng print với chuỗi ký tự chính xác.",
      "print() writes the specified string to standard output followed by a newline.", "print() xuất chuỗi ra stdout và kết thúc bằng ký tự xuống dòng."),
    ex('predict_output', "Predict Python Version Output", "Dự Đoán Đầu Ra",
      "Complete the code to import sys and print sys.platform.", "Hoàn thiện mã để nạp mô-đun sys và in sys.platform.",
      'import sys\n# print platform below\n', 'import sys\nprint(sys.platform)',
      "Use print(sys.platform)", "Dùng print(sys.platform)",
      "sys.platform indicates the underlying operating system platform.", "sys.platform cho biết nền tảng hệ điều hành đang chạy."),
    ex('problem_solving', "Calculate and Display Ellipse Area", "Tính và In Diện Tích Hình Elip",
      "Given a = 7 and b = 4, compute area = 3.14159 * a * b and print 'Area: ' followed by the rounded area.", "Cho a = 7 và b = 4, tính area = 3.14159 * a * b và in 'Area: ' kèm diện tích làm tròn 2 chữ số.",
      'a = 7\nb = 4\n# Calculate area and print\n', 'a = 7\nb = 4\narea = round(3.14159 * a * b, 2)\nprint("Area:", area)',
      "Formula is 3.14159 * a * b", "Công thức là 3.14159 * a * b",
      "Variables store intermediate numeric computations cleanly.", "Biến số lưu trữ kết quả tính toán số học rõ ràng.")
  ]
};

console.log("Part 1 topic data ready.");
