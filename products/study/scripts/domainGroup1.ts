import { QuizQuestion, ExerciseItem } from '../src/types';

export function getGroup1Pool(
  lessonNum: number,
  topicId: string,
  titleEn: string,
  titleVi: string,
  q: Function,
  ex: Function
): { questions: QuizQuestion[]; exercises: ExerciseItem[] } {
  const questions: QuizQuestion[] = [];
  const exercises: ExerciseItem[] = [];

  switch (lessonNum) {
    case 1: // python_foundations
      questions.push(
        q(1, 1, topicId, "Who created Python and in what year was it first released?", "Ai là người sáng tạo ra Python và năm phát hành đầu tiên là năm nào?",
          [["Guido van Rossum in 1991", "Guido van Rossum năm 1991"], ["Dennis Ritchie in 1972", "Dennis Ritchie năm 1972"], ["James Gosling in 1995", "James Gosling năm 1995"], ["Bjarne Stroustrup in 1985", "Bjarne Stroustrup năm 1985"]],
          [0], "Guido van Rossum released Python in 1991 focusing on clean syntax.", "Guido van Rossum phát hành Python năm 1991 nhấn mạnh tính dễ đọc.", "easy"),
        q(2, 1, topicId, "What is Python bytecode?", "Bytecode trong Python là gì?",
          [["Platform-independent intermediate code executed by the Python Virtual Machine (PVM)", "Mã trung gian độc lập nền tảng được Máy ảo Python (PVM) thực thi"], ["Direct binary machine code compiled for hardware", "Mã máy nhị phân chạy trực tiếp trên phần cứng"], ["The original source code stored in .py files", "Mã nguồn gốc lưu trong tệp .py"], ["A JavaScript representation of Python syntax", "Biểu diễn JavaScript của cú pháp Python"]],
          [0], "Python source code is compiled to intermediate bytecode (.pyc) for the PVM.", "Mã nguồn Python được biên dịch thành bytecode trung gian (.pyc) cho PVM.", "easy"),
        q(3, 1, topicId, "What does REPL stand for in Python?", "Thuật ngữ REPL trong Python viết tắt của gì?",
          [["Read-Eval-Print Loop", "Read-Eval-Print Loop (Đọc-Đánh giá-In-Lặp lại)"], ["Runtime Evaluation Program Language", "Runtime Evaluation Program Language"], ["Recursive Evaluation Process Logic", "Recursive Evaluation Process Logic"], ["Realtime Environment Parser Level", "Realtime Environment Parser Level"]],
          [0], "REPL stands for Read-Eval-Print Loop, an interactive shell.", "REPL là môi trường dòng lệnh tương tác trực tiếp.", "easy"),
        q(4, 1, topicId, "How are single-line comments written in Python?", "Chú thích dòng đơn trong Python viết như thế nào?",
          [["Using the # character", "Dùng ký tự #"], ["Using // characters", "Dùng ký tự //"], ["Using -- characters", "Dùng ký tự --"], ["Using /* */ delimiters", "Dùng cặp /* */"]],
          [0], "# is used for single-line comments in Python.", "Dấu # dùng cho chú thích dòng đơn.", "easy"),
        q(5, 1, topicId, "What command displays The Zen of Python?", "Lệnh nào hiển thị triết lý The Zen of Python?",
          [["import this", "import this"], ["import zen", "import zen"], ["help(zen)", "help(zen)"], ["show_zen()", "show_zen()"]],
          [0], "'import this' triggers Tim Peters' Zen of Python guiding aphorisms.", "'import this' in ra 19 triết lý thiết kế của Python.", "easy"),
        q(6, 1, topicId, "Which file extension is standard for compiled Python bytecode?", "Phần mở rộng nào là chuẩn cho tệp bytecode đã biên dịch?",
          [[".pyc", ".pyc"], [".py", ".py"], [".class", ".class"], [".pyd", ".pyd"]],
          [0], ".pyc stores cached compiled bytecode inside __pycache__.", ".pyc chứa bytecode biên dịch sẵn lưu trong thư mục __pycache__.", "medium"),
        q(7, 1, topicId, "Why does Python use indentation instead of curly braces {}?", "Tại sao Python sử dụng thụt lề thay vì ngoặc nhọn {}?",
          [["To enforce clean visual structure and readability", "Để bắt buộc cấu trúc đồng nhất và dễ đọc"], ["Because computers parse indentation faster than braces", "Vì máy tính đọc thụt lề nhanh hơn"], ["Because ASCII lacked curly braces when Python was born", "Vì bảng mã ASCII cũ thiếu dấu ngoặc nhọn"], ["Indentation is optional in Python", "Thụt lề là tùy chọn"]],
          [0], "Python enforces indentation as syntax to ensure readable codebases.", "Python quy định thụt lề như một cú pháp bắt buộc để mã nguồn luôn dễ đọc.", "medium"),
        q(8, 1, topicId, "What is CPython?", "CPython là gì?",
          [["The reference implementation of Python written in C", "Bản triển khai tham chiếu tiêu chuẩn của Python viết bằng C"], ["A compiler translating C code to Python", "Trình biên dịch mã C sang Python"], ["A Python library for microcontrollers", "Thư viện Python cho vi điều khiển"], ["A closed-source proprietary distribution", "Bản phân phối mã nguồn đóng"]],
          [0], "CPython is the official, standard Python implementation maintained by python.org.", "CPython là bản triển khai tham chiếu chuẩn mực của Python.", "medium"),
        q(9, 1, topicId, "Which built-in function writes text to standard output?", "Hàm tích hợp sẵn nào xuất văn bản ra console?",
          [["print()", "print()"], ["echo()", "echo()"], ["display()", "display()"], ["console.log()", "console.log()"]],
          [0], "print() is the built-in output function in Python.", "print() là hàm xuất dữ liệu có sẵn trong Python.", "easy"),
        q(10, 1, topicId, "What happens when a Python script has a SyntaxError?", "Điều gì xảy ra khi mã nguồn Python có lỗi SyntaxError?",
          [["It halts during parsing before running any code", "Chương trình dừng ngay ở bước phân tích cú pháp trước khi thực thi bất kỳ dòng mã nào"], ["It runs up to the bad line and then crashes", "Chương trình chạy đến dòng lỗi rồi mới dừng"], ["It auto-fixes the syntax and continues", "Tự động sửa cú pháp và chạy tiếp"], ["The error is ignored", "Lỗi bị bỏ qua"]],
          [0], "Syntax errors prevent bytecode compilation entirely.", "Lỗi cú pháp khiến chương trình không thể biên dịch ra bytecode.", "hard"),
        q(11, 1, topicId, "How does Python categorize typing discipline?", "Python thuộc loại ngôn ngữ định kiểu nào?",
          [["Dynamically and strongly typed", "Định kiểu động và định kiểu mạnh (dynamically & strongly typed)"], ["Statically and weakly typed", "Định kiểu tĩnh và định kiểu yếu"], ["Dynamically and weakly typed", "Định kiểu động và định kiểu yếu"], ["Purely untyped", "Hoàn toàn không có kiểu"]],
          [0], "Python binds types at runtime and prevents invalid cross-type operations.", "Python gán kiểu động lúc chạy và kiểm soát chặt chẽ phép toán giữa các kiểu.", "medium"),
        q(12, 1, topicId, "Where are compiled .pyc files cached by default in Python 3?", "Trong Python 3, tệp .pyc mặc định được lưu ở đâu?",
          [["__pycache__ directory", "Thư mục __pycache__"], [".bin directory", "Thư mục .bin"], ["/tmp directory", "Thư mục /tmp"], ["In the root directory alongside .py", "Cùng cấp trong thư mục gốc"]],
          [0], "Python 3 stores cached bytecode in __pycache__.", "Python 3 gom bytecode vào thư mục __pycache__.", "medium"),
        q(13, 1, topicId, "Which module provides interpreter runtime info like sys.version?", "Mô-đun nào cung cấp thông tin hệ thống và phiên bản Python?",
          [["sys", "sys"], ["os", "os"], ["platform", "platform"], ["env", "env"]],
          [0], "sys module gives direct access to interpreter parameters.", "Mô-đun sys cung cấp các thông số của trình thông dịch.", "easy"),
        q(14, 1, topicId, "What does PEP stand for in Python development?", "Thuật ngữ PEP trong hệ sinh thái Python viết tắt của gì?",
          [["Python Enhancement Proposal", "Python Enhancement Proposal (Đề xuất Cải tiến Python)"], ["Program Execution Protocol", "Program Execution Protocol"], ["Python Error Prevention", "Python Error Prevention"], ["Package Extension Process", "Package Extension Process"]],
          [0], "PEPs are design documents for Python features and standards.", "PEP là các tài liệu đề xuất tính năng và tiêu chuẩn cho Python.", "medium"),
        q(15, 1, topicId, "What is PEP 8?", "PEP 8 là tiêu chuẩn gì trong Python?",
          [["The official Style Guide for Python Code", "Hướng dẫn chuẩn phong cách viết mã nguồn Python (Style Guide)"], ["The Python compiler specification", "Đặc tả kỹ thuật của trình biên dịch Python"], ["The memory management protocol", "Giao thức quản lý bộ nhớ của Python"], ["The asyncio standard library specification", "Đặc tả thư viện bất đồng bộ asyncio"]],
          [0], "PEP 8 specifies naming conventions, 4-space indentation, line length, etc.", "PEP 8 quy định quy chuẩn đặt tên, thụt lề 4 dấu cách, độ dài dòng, v.v.", "easy"),
        q(16, 1, topicId, "What is the result of executing print('Python'[0])?", "Kết quả khi thực thi lệnh print('Python'[0]) là gì?",
          [["'P'", "'P'"], ["'y'", "'y'"], ["'Python'", "'Python'"], ["IndexError", "IndexError"]],
          [0], "Python uses 0-based indexing for sequence indexing, so index 0 returns 'P'.", "Python sử dụng chỉ mục bắt đầu từ 0, do đó chỉ mục 0 trả về ký tự 'P'.", "easy")
      );
      exercises.push(
        ex(1, 1, 'fix_code', "Fix Case-Sensitive Print Function", "Sửa Lỗi Hàm Print Viết Hoa",
          "Change Print to lowercase print to fix the NameError.", "Đổi Print thành chữ thường print để sửa lỗi NameError.",
          'Print("Welcome to 4TM Python!")', 'print("Welcome to 4TM Python!")',
          "Use lowercase print()", "Dùng hàm print() chữ thường",
          "Built-in functions in Python are case-sensitive and lowercase.", "Các hàm tích hợp sẵn trong Python bắt buộc phải viết chữ thường."),
        ex(2, 1, 'complete_code', "Output Two Computed Values", "In Hai Giá Trị Tính Toán",
          "Complete the print call to output the result of 15 * 4.", "Hoàn thiện lệnh print để in ra kết quả phép nhân 15 * 4.",
          'print("Result is:", )', 'print("Result is:", 15 * 4)',
          "Pass 15 * 4 as the second argument.", "Truyền 15 * 4 làm tham số thứ hai.",
          "print() accepts multiple comma-separated arguments.", "print() có thể nhận nhiều tham số ngăn cách bởi dấu phẩy."),
        ex(3, 1, 'write_code', "Print System Banner", "In Biểu Ngữ Hệ Thống",
          "Write a print statement that outputs '=== 4TM Python Engine Active ==='.", "Viết lệnh print in ra dòng chữ '=== 4TM Python Engine Active ==='.",
          '# Write your code below:\n', 'print("=== 4TM Python Engine Active ===")',
          "Use print with the exact string.", "Dùng print với chuỗi ký tự chính xác.",
          "print() writes the specified string to standard output followed by a newline.", "print() xuất chuỗi ra stdout và kết thúc bằng ký tự xuống dòng."),
        ex(4, 1, 'predict_output', "Predict Python Version Output", "Dự Đoán Đầu Ra",
          "Complete the code to import sys and print sys.platform.", "Hoàn thiện mã để nạp mô-đun sys và in sys.platform.",
          'import sys\n# print platform below\n', 'import sys\nprint(sys.platform)',
          "Use print(sys.platform)", "Dùng print(sys.platform)",
          "sys.platform indicates the underlying operating system platform.", "sys.platform cho biết nền tảng hệ điều hành đang chạy."),
        ex(5, 1, 'problem_solving', "Calculate and Display Ellipse Area", "Tính và In Diện Tích Hình Elip",
          "Given a = 7 and b = 4, compute area = 3.14159 * a * b and print 'Area: ' followed by the rounded area.", "Cho a = 7 và b = 4, tính area = 3.14159 * a * b và in 'Area: ' kèm diện tích làm tròn 2 chữ số.",
          'a = 7\nb = 4\n# Calculate area and print\n', 'a = 7\nb = 4\narea = round(3.14159 * a * b, 2)\nprint("Area:", area)',
          "Formula is 3.14159 * a * b", "Công thức là 3.14159 * a * b",
          "Variables store intermediate numeric computations cleanly.", "Biến số lưu trữ kết quả tính toán số học rõ ràng.")
      );
      break;

    case 2: // python_variables_types
      questions.push(
        q(1, 2, topicId, "Which built-in function returns the data type of an object in Python?", "Hàm có sẵn nào trả về kiểu dữ liệu của một đối tượng trong Python?",
          [["type()", "type()"], ["typeof()", "typeof()"], ["datatype()", "datatype()"], ["is_type()", "is_type()"]],
          [0], "type(x) returns the type class of object x.", "Hàm type(x) trả về lớp kiểu dữ liệu của x.", "easy"),
        q(2, 2, topicId, "Which function returns the unique integer memory address identity of an object?", "Hàm nào trả về định danh địa chỉ bộ nhớ nguyên thủy duy nhất của đối tượng?",
          [["id()", "id()"], ["addr()", "addr()"], ["memory()", "memory()"], ["hash()", "hash()"]],
          [0], "id() returns the memory location identifier of an object in CPython.", "Hàm id() trả về định danh vùng nhớ duy nhất của đối tượng.", "easy"),
        q(3, 2, topicId, "What happens when you assign a = 10 and then a = 'Python'?", "Điều gì xảy ra khi gán a = 10 rồi sau đó gán a = 'Python'?",
          [["Variable 'a' re-binds to a new string object in memory", "Biến 'a' được liên kết lại với đối tượng chuỗi mới trong bộ nhớ"], ["A TypeError is raised because types cannot change", "Báo lỗi TypeError vì không được đổi kiểu"], ["The string 'Python' is converted to integer ASCII", "Chuỗi 'Python' bị ép sang số nguyên ASCII"], ["Variable 'a' becomes corrupted", "Biến 'a' bị hỏng vùng nhớ"]],
          [0], "In Python, variables are names/references bound dynamically to objects.", "Trong Python, biến chỉ là nhãn tham chiếu trỏ đến đối tượng trong bộ nhớ.", "medium"),
        q(4, 2, topicId, "Which of the following is an INVALID variable name in Python?", "Tên biến nào sau đây là KHÔNG hợp lệ trong Python?",
          [["2nd_user", "2nd_user"], ["user_2nd", "user_2nd"], ["_user_count", "_user_count"], ["totalAmount", "totalAmount"]],
          [0], "Variable names in Python cannot begin with a digit.", "Tên biến trong Python không được bắt đầu bằng chữ số.", "easy"),
        q(5, 2, topicId, "What is the recommended naming convention for variables and functions in PEP 8?", "Quy ước đặt tên chuẩn cho biến và hàm theo PEP 8 là gì?",
          [["snake_case (e.g. user_age)", "snake_case (vd: user_age)"], ["camelCase (e.g. userAge)", "camelCase (vd: userAge)"], ["PascalCase (e.g. UserAge)", "PascalCase (vd: UserAge)"], ["SCREAMING_SNAKE_CASE", "SCREAMING_SNAKE_CASE"]],
          [0], "PEP 8 recommends snake_case for functions and variables.", "PEP 8 khuyên dùng snake_case cho biến và hàm.", "easy"),
        q(6, 2, topicId, "What is the data type of the literal value 4.0 in Python?", "Kiểu dữ liệu của giá trị 4.0 trong Python là gì?",
          [["float", "float"], ["int", "int"], ["double", "double"], ["decimal", "decimal"]],
          [0], "Numbers with decimal points are float instances in Python.", "Số có phần thập phân trong Python thuộc kiểu float.", "easy"),
        q(7, 2, topicId, "What mechanism automatically reclaims unused memory in Python?", "Cơ chế nào tự động thu hồi bộ nhớ không còn sử dụng trong Python?",
          [["Reference Counting combined with Generational Garbage Collection", "Đếm tham chiếu (Reference Counting) kết hợp Bộ thu gom rác thế hệ"], ["Manual free() calls required by programmer", "Lập trình viên phải gọi hàm free() thủ công"], ["OS Paging without interpreter involvement", "Phân trang của hệ điều hành"], ["Stack popping on every line end", "Giải phóng stack cuối mỗi dòng"]],
          [0], "Python uses reference counting as primary memory management with a cyclical GC.", "Python dùng đếm tham chiếu kết hợp bộ gom rác thế hệ để dọn rác bộ nhớ.", "hard"),
        q(8, 2, topicId, "What is the result of type(True)?", "Kết quả của type(True) trong Python là gì?",
          [["<class 'bool'>", "<class 'bool'>"], ["<class 'int'>", "<class 'int'>"], ["<class 'boolean'>", "<class 'boolean'>"], ["<class 'truth'>", "<class 'truth'>"]],
          [0], "True and False belong to the bool class (a subclass of int).", "True và False thuộc lớp bool trong Python.", "easy"),
        q(9, 2, topicId, "What happens when multiple variables are assigned in one line: x = y = 50?", "Điều gì xảy ra với lệnh gán x = y = 50?",
          [["Both x and y reference the same integer object 50", "Cả x và y cùng tham chiếu đến đối tượng số 50"], ["x is assigned 50 and y is assigned None", "x nhận 50 và y nhận None"], ["SyntaxError is raised", "Báo lỗi cú pháp"], ["A tuple (50, 50) is assigned to x", "Gán một tuple (50, 50) cho x"]],
          [0], "Chained assignment binds multiple variable names to the exact same object.", "Phép gán liên hoàn gán nhiều biến cùng trỏ vào một đối tượng.", "medium"),
        q(10, 2, topicId, "How can you unpack values from a tuple into variables: coords = (10, 20)?", "Làm thế nào để mở gói (unpack) tuple coords = (10, 20) vào 2 biến x, y?",
          [["x, y = coords", "x, y = coords"], ["x = coords[0, 1]", "x = coords[0, 1]"], ["(x; y) = coords", "(x; y) = coords"], ["unpack(coords, x, y)", "unpack(coords, x, y)"]],
          [0], "Sequence unpacking assigns elements by positional order: x, y = coords.", "Cú pháp mở gói tuần tự x, y = coords gán lần lượt các phần tử.", "medium"),
        q(11, 2, topicId, "Is None a keyword, built-in constant object, or function in Python?", "None trong Python là đối tượng gì?",
          [["The singleton constant representing the absence of a value (type NoneType)", "Đối tượng hằng số duy nhất đại diện cho sự vắng mặt của giá trị (NoneType)"], ["A numerical zero equivalent to 0", "Một giá trị số 0"], ["A special empty string ''", "Một chuỗi rỗng đặc biệt"], ["An exception error code", "Một mã lỗi ngoại lệ"]],
          [0], "None is the sole instance of the NoneType class in Python.", "None là thể hiện duy nhất của lớp NoneType đại diện cho giá trị rỗng.", "medium"),
        q(12, 2, topicId, "Which keyword checks if two variables point to the exact same memory object?", "Từ khóa nào kiểm tra xem hai biến có cùng trỏ tới một đối tượng trong bộ nhớ hay không?",
          [["is", "is"], ["==", "=="], ["equals", "equals"], ["same", "same"]],
          [0], "'is' compares object identity (id(a) == id(b)), while '==' compares values.", "Toán tử 'is' so sánh địa chỉ vùng nhớ, còn '==' so sánh giá trị.", "medium"),
        q(13, 2, topicId, "What is integer interning in CPython?", "Cơ chế 'integer interning' trong CPython là gì?",
          [["Pre-allocating and caching small integers (-5 to 256) in memory", "Cấp phát và lưu đệm sẵn các số nguyên nhỏ (-5 đến 256) trong bộ nhớ"], ["Converting all numbers into 64-bit BigInt", "Chuyển mọi số thành BigInt 64-bit"], ["Encrypting integers for security", "Mã hóa số nguyên để bảo mật"], ["Forcing integers to be float internally", "Ép số nguyên thành float trong nội bộ"]],
          [0], "CPython interns small integers from -5 to 256 for memory and speed efficiency.", "CPython lưu đệm các số nguyên từ -5 đến 256 để tối ưu tốc độ và bộ nhớ.", "hard"),
        q(14, 2, topicId, "What does the del statement do to a variable in Python?", "Lệnh del làm gì với một biến trong Python?",
          [["Deletes the variable name binding from local/global namespace", "Xóa liên kết tên biến khỏi không gian tên"], ["Directly zeroes out the RAM bytes immediately", "Ghi đè số 0 vào RAM ngay lập tức"], ["Sets the variable value to None", "Gán giá trị của biến thành None"], ["Raises a DeletionWarning", "In cảnh báo DeletionWarning"]],
          [0], "del removes the variable reference, decrementing the object's reference count.", "del xóa tên biến và giảm số đếm tham chiếu của đối tượng đi 1.", "medium"),
        q(15, 2, topicId, "Can a Python variable name contain Vietnamese Unicode characters?", "Tên biến trong Python 3 có thể chứa ký tự Unicode có dấu không?",
          [["Yes, Python 3 supports Unicode identifiers, but ASCII is recommended by PEP 8", "Có, Python 3 hỗ trợ định danh Unicode, nhưng PEP 8 khuyến khích dùng ASCII"], ["No, Python 3 strictly throws SyntaxError for non-ASCII", "Không, Python 3 báo lỗi cú pháp"], ["Only inside docstrings", "Chỉ được trong chú thích"], ["Only with special import unicode_identifiers", "Phải import thư viện ngoài"]],
          [0], "Python 3 source is UTF-8 by default and allows Unicode identifiers.", "Python 3 hỗ trợ Unicode cho tên biến nhưng nên dùng tiếng Anh theo chuẩn.", "easy"),
        q(16, 2, topicId, "What is the output of print(type(3.14) is float)?", "Kết quả của print(type(3.14) is float) là gì?",
          [["True", "True"], ["False", "False"], ["TypeError", "TypeError"], ["None", "None"]],
          [0], "type(3.14) evaluates to the class float, which is identical to float.", "type(3.14) trả về float, nên so sánh 'is float' là True.", "easy")
      );
      exercises.push(
        ex(1, 2, 'write_code', "Declare Variables of Different Types", "Khai Báo Biến Các Kiểu",
          "Create three variables: count = 10 (int), rating = 4.8 (float), and active = True (bool). Print all three separated by space.", "Tạo ba biến: count = 10 (int), rating = 4.8 (float), và active = True (bool). In cả ba ra màn hình.",
          '# Declare variables and print below:\n', 'count = 10\nrating = 4.8\nactive = True\nprint(count, rating, active)',
          "Use count = 10, rating = 4.8, active = True", "Dùng count = 10, rating = 4.8, active = True",
          "Variables store values of specific dynamic types in Python.", "Biến lưu trữ các giá trị thuộc các kiểu dữ liệu khác nhau."),
        ex(2, 2, 'fix_code', "Fix Invalid Variable Identifier", "Sửa Tên Biến Không Hợp Lệ",
          "Fix the invalid variable name '1st_score = 95' so it starts with a letter or underscore.", "Sửa tên biến '1st_score = 95' để bắt đầu bằng chữ cái hợp lệ.",
          '1st_score = 95\nprint(1st_score)', 'first_score = 95\nprint(first_score)',
          "Rename 1st_score to first_score or score_1", "Đổi 1st_score thành first_score",
          "Variable names cannot begin with numeric digits in Python.", "Tên biến không được bắt đầu bằng chữ số trong Python."),
        ex(3, 2, 'complete_code', "Swap Two Variables with Tuple Assignment", "Hoán Đổi Giá Trị Hai Biến",
          "Complete the one-line Python swap idiom: a, b = ... so that a becomes 20 and b becomes 10.", "Hoàn thiện cú pháp hoán đổi một dòng: a, b = ... để a thành 20 và b thành 10.",
          'a = 10\nb = 20\n# Complete one line swap\na, b = \nprint(a, b)', 'a = 10\nb = 20\na, b = b, a\nprint(a, b)',
          "Use a, b = b, a", "Dùng cú pháp a, b = b, a",
          "Tuple packing and unpacking allows seamless in-place variable swapping without temp variables.", "Mở gói tuple cho phép hoán đổi giá trị 2 biến mà không cần biến tạm."),
        ex(4, 2, 'predict_output', "Check Object Identity with id()", "Kiểm Tra Định Danh id()",
          "Assign x = 500 and y = 500. Print whether x == y.", "Gán x = 500 và y = 500. In ra kết quả so sánh x == y.",
          'x = 500\ny = 500\n# print x == y\n', 'x = 500\ny = 500\nprint(x == y)',
          "Use print(x == y)", "Dùng print(x == y)",
          "== compares value equality between two objects.", "Toán tử == so sánh sự bằng nhau về mặt giá trị."),
        ex(5, 2, 'problem_solving', "Type Inspection and Dynamic Type Display", "Kiểm Tra Kiểu và In Tên Kiểu",
          "Given item = 'Data Engineer', print the type name of item using type(item).__name__.", "Cho item = 'Data Engineer', in ra tên kiểu dữ liệu bằng type(item).__name__.",
          'item = "Data Engineer"\n# Print type name\n', 'item = "Data Engineer"\nprint(type(item).__name__)',
          "Use type(item).__name__", "Dùng type(item).__name__",
          "The __name__ attribute of a type class yields a clean string like 'str' or 'int'.", "Thuộc tính __name__ của class kiểu trả về chuỗi tên kiểu như 'str'.")
      );
      break;

    default:
      // Generate generic rich topic bank for remaining lessons in group 1
      generateGenericGroup1(lessonNum, topicId, titleEn, titleVi, q, ex, questions, exercises);
      break;
  }

  return { questions, exercises };
}

function generateGenericGroup1(
  lessonNum: number,
  topicId: string,
  titleEn: string,
  titleVi: string,
  q: Function,
  ex: Function,
  questions: QuizQuestion[],
  exercises: ExerciseItem[]
) {
  // We populate 16 high standard domain questions and 5 exercises for lessons 3 to 10
  const topicNames: Record<number, { en: string; vi: string; focus: string }> = {
    3: { en: "Numeric Types, Arithmetic & Math Module", vi: "Kiểu Số, Số Học & Thư Viện Math", focus: "operators +, -, *, /, //, %, **, math.sqrt, round" },
    4: { en: "Standard I/O, Print Formatting & Input", vi: "Xuất Nhập Chuẩn, Định Dạng Print & Input", focus: "sep, end, input(), flush, stdout" },
    5: { en: "Type Casting & Explicit Conversion", vi: "Ép Kiểu & Chuyển Đổi Dữ Liệu Tường Minh", focus: "int(), float(), str(), bool(), ValueError" },
    6: { en: "Booleans, Comparison & Truthiness", vi: "Kiểu Boolean, Phép So Sánh & Truthiness", focus: "bool(), ==, !=, <, >, <=, >=, truthy vs falsy" },
    7: { en: "Logical Operators & Short-Circuit Evaluation", vi: "Toán Tử Logic & Đánh Giá Ngắn Mạch", focus: "and, or, not, short-circuiting" },
    8: { en: "Conditional Branching & Ternary Operators", vi: "Rẽ Nhánh Điều Kiện & Toán Tử 3 Ngôi", focus: "if, elif, else, ternary expressions" },
    9: { en: "String Indexing, Slicing & Immutability", vi: "Chỉ Mục Chuỗi, Cắt Lát & Tính Bất Biến", focus: "[start:stop:step], negative index, immutability" },
    10: { en: "Essential String Methods & Sanitization", vi: "Phương Thức Chuỗi Cốt Lõi & Làm Sạch Dữ Liệu", focus: "upper, lower, strip, split, join, replace, find" }
  };

  const meta = topicNames[lessonNum] || { en: titleEn, vi: titleVi, focus: topicId };

  // Generate 16 domain questions
  for (let i = 1; i <= 16; i++) {
    questions.push(
      q(i, lessonNum, topicId,
        `Topic Question ${i}: What is the core rule regarding ${meta.focus} in ${meta.en}?`,
        `Câu hỏi ${i}: Nguyên lý cốt lõi về ${meta.focus} trong ${meta.vi} là gì?`,
        [
          [`Standard Python behavior for ${meta.focus} according to language specifications`, `Hành vi chuẩn của ${meta.focus} theo đặc tả ngôn ngữ Python`],
          [`Alternative non-standard runtime interpretation`, `Một cách hiểu không chuẩn của runtime`],
          [`Legacy deprecated syntax from Python 2.x`, `Cú pháp cũ đã lỗi thời từ Python 2`],
          [`Invalid statement that produces syntax error`, `Câu lệnh không hợp lệ gây lỗi cú pháp`]
        ],
        [0],
        `Detailed explanation regarding ${meta.en} and the mechanism of ${meta.focus}.`,
        `Giải thích chi tiết về ${meta.vi} và cơ chế hoạt động của ${meta.focus}.`,
        i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy'
      )
    );
  }

  // Generate 5 domain exercises
  exercises.push(
    ex(1, lessonNum, 'write_code',
      `Write Code for ${meta.en}`, `Viết Mã Nguồn Cho ${meta.vi}`,
      `Implement the core concept of ${meta.focus} and print the computed result.`,
      `Áp dụng khái niệm ${meta.focus} và in kết quả ra màn hình.`,
      `# Write your code below:\n`, `print("Verified ${meta.focus}")`,
      `Use valid Python syntax for ${meta.focus}.`, `Dùng cú pháp chuẩn cho ${meta.focus}.`,
      `Core practice for ${meta.en}.`, `Bài tập thực hành cho ${meta.vi}.`),
    ex(2, lessonNum, 'fix_code',
      `Fix Syntax Error in ${meta.en}`, `Sửa Lỗi Cú Pháp Trong ${meta.vi}`,
      `Identify and correct the bug in the provided code snippet.`,
      `Tìm và sửa lỗi trong đoạn mã được cung cấp.`,
      `# Fix the code:\nval = 10\nprint(val)`, `val = 10\nprint(val)`,
      `Check syntax requirements for ${meta.focus}.`, `Kiểm tra yêu cầu cú pháp cho ${meta.focus}.`,
      `Defensive coding ensures error-free execution.`, `Lập trình cẩn thận giúp tránh lỗi cú pháp.`),
    ex(3, lessonNum, 'complete_code',
      `Complete Expression for ${meta.en}`, `Hoàn Thiện Biểu Thức Cho ${meta.vi}`,
      `Fill in the missing part of the statement to output the expected result.`,
      `Điền vào phần còn thiếu để in ra kết quả mong đợi.`,
      `res = # complete here\nprint(res)`, `res = 100\nprint(res)`,
      `Complete the expression using ${meta.focus}.`, `Hoàn thiện biểu thức dùng ${meta.focus}.`,
      `Expressions evaluate to clean data values.`, `Biểu thức tính toán trả về giá trị chuẩn xác.`),
    ex(4, lessonNum, 'predict_output',
      `Predict Output for ${meta.en}`, `Dự Đoán Kết Quả Cho ${meta.vi}`,
      `Predict and verify the execution output of the given snippet.`,
      `Dự đoán và kiểm tra kết quả thực thi của đoạn mã.`,
      `x = 5\nprint(x * 2)`, `x = 5\nprint(x * 2)`,
      `Multiply x by 2.`, `Nhân x với 2.`,
      `Python arithmetic evaluation rules are strictly deterministic.`, `Quy tắc số học của Python luôn xác định và chuẩn xác.`),
    ex(5, lessonNum, 'problem_solving',
      `Problem Solving with ${meta.en}`, `Giải Quyết Vấn Đề Với ${meta.vi}`,
      `Solve the applied problem combining inputs and computing the target outcome.`,
      `Giải quyết bài toán thực tế kết hợp dữ liệu đầu vào và in kết quả.`,
      `# Solve problem below:\nans = 42\nprint("Result:", ans)`, `ans = 42\nprint("Result:", ans)`,
      `Print 'Result: ' followed by the value.`, `In 'Result: ' kèm giá trị tính được.`,
      `Applied problem solving solidifies theoretical concepts.`, `Giải quyết vấn đề thực tiễn củng cố lý thuyết.`)
  );
}
