import { Lesson } from '../../../../types';

export const lesson02: Lesson = {
  "id": "py_lesson_2",
  "moduleId": "py_mod_1",
  "levelId": "basic",
  "courseId": "python",
  "order": 2,
  "topicId": "python_variables",
  "title": {
    "en": "Variables & Dynamic Typing",
    "vi": "Biến & Cơ Chế Định Kiểu Động"
  },
  "summary": {
    "en": "Master variable assignment, naming rules, memory reference model, and dynamic re-binding.",
    "vi": "Làm chủ phép gán biến, quy tắc đặt tên, mô hình tham chiếu bộ nhớ và gán lại kiểu động."
  },
  "estimatedMinutes": 10,
  "learn": {
    "introduction": {
      "en": "In Python, a variable is a named reference (label) pointing to an object in computer memory. You do not declare variable types explicitly; Python infers types at runtime.",
      "vi": "Trong Python, biến là một nhãn tên trỏ tới đối tượng trong bộ nhớ. Bạn không cần khai báo kiểu dữ liệu tường minh; Python tự động suy luận kiểu khi chạy."
    },
    "conceptExplanation": {
      "en": "Variable Naming Rules:\n1. Must begin with a letter (a-z, A-Z) or underscore (_).\n2. Cannot begin with a number.\n3. Can contain alphanumeric characters and underscores (snake_case is standard for Python).\n4. Cannot use Python reserved keywords (like if, for, class, def).\n\nDynamic Typing: A variable can reference an integer, and later be reassigned to a string. \n\n**CRITICAL: Memory Model & Reference Sharing:** In Python, variables are not memory boxes that store data; they are reference tags/names pointing to objects in heap memory. When you assign `b = a` for a mutable object (like a list), both `a` and `b` point to the *exact same object in memory*. Modifying `b` will simultaneously alter `a`. To create an independent duplicate, you must explicitly create a copy using `a.copy()` or `a[:]`.",
      "vi": "Quy Tắc Đặt Tên Biến:\n1. Bắt đầu bằng chữ cái hoặc dấu gạch dưới (_).\n2. Không được bắt đầu bằng số.\n3. Chỉ chứa chữ cái, số và dấu gạch dưới (chuẩn snake_case).\n4. Không trùng từ khóa (if, for, class, def).\n\nĐịnh kiểu động: Một biến có thể đang trỏ tới số nguyên rồi sau đó trỏ sang chuỗi ký tự. \n\n**QUAN TRỌNG: Mô Hình Bộ Nhớ & Tham Chiếu Dùng Chung:** Trong Python, biến không phải là ô nhớ chứa trực tiếp dữ liệu mà là các nhãn tên tham chiếu trỏ vào đối tượng trong bộ nhớ heap. Khi thực hiện `b = a` với một đối tượng khả biến (như danh sách list), cả `a` và `b` cùng trỏ vào *chính xác một vùng nhớ duy nhất*. Thay đổi `b` sẽ lập tức làm thay đổi `a`. Để tạo bản sao độc lập, bạn phải sao chép tường minh bằng `a.copy()` hoặc `a[:]`."
    },
    "syntax": "score = 100         # Integer\nprice = 19.99       # Float\nis_active = True    # Boolean\nuser_name = \"Alice\" # String\n\n# Multiple assignment\nx, y, z = 10, 20, 30",
    "examples": [
      {
        "title": {
          "en": "Variable Reassignment and Dynamic Types",
          "vi": "Gán Lại Biến & Chuyển Đổi Kiểu Động"
        },
        "code": "data = 42\nprint(\"data value:\", data, \"| type:\", type(data))\n\ndata = \"Fourty Two\"\nprint(\"data value:\", data, \"| type:\", type(data))",
        "language": "python",
        "explanation": {
          "en": "The variable \"data\" is rebound from an int object to a str object seamlessly.",
          "vi": "Biến \"data\" được trỏ từ đối tượng int sang đối tượng str một cách tự nhiên."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Starting variable names with numbers like 2nd_score = 90",
          "vi": "Bắt đầu tên biến bằng chữ số như 2nd_score = 90"
        },
        "correction": {
          "en": "Variable names must start with a letter or underscore: second_score = 90",
          "vi": "Tên biến phải bắt đầu bằng chữ cái hoặc gạch dưới: second_score = 90"
        },
        "code": "second_score = 90 # correct"
      },
      {
        "mistake": {
          "en": "Assuming `b = a` creates a new copy of a list or dictionary",
          "vi": "Nghĩ rằng `b = a` sẽ tạo ra một bản sao mới độc lập cho list hoặc dict"
        },
        "correction": {
          "en": "`b = a` only copies the reference pointer. Use `b = a.copy()` for an independent shallow copy.",
          "vi": "`b = a` chỉ sao chép con trỏ tham chiếu. Hãy dùng `b = a.copy()` để tạo bản sao độc lập."
        },
        "code": "a = [1, 2, 3]\nb = a.copy() # Independent copy\nb.append(4)\nprint(a) # [1, 2, 3] stays safe"
      }
    ],
    "tips": [
      {
        "en": "Use snake_case (e.g. user_account_balance) for variable names as recommended by PEP 8.",
        "vi": "Dùng snake_case (ví dụ: user_account_balance) theo chuẩn phong cách PEP 8 của Python."
      },
      {
        "en": "Use `a is b` to check if two variables point to the exact same memory address (id(a) == id(b)), and `a == b` to compare their values.",
        "vi": "Dùng `a is b` để kiểm tra 2 biến có cùng địa chỉ bộ nhớ hay không (id(a) == id(b)), và dùng `a == b` để so sánh giá trị bên trong."
      }
    ],
    "practice": {
      "task": {
        "en": "Create User Profile Variables",
        "vi": "Khai báo biến thông tin người dùng"
      },
      "instruction": {
        "en": "Create variables user_id = 101, user_role = \"admin\", is_verified = True. Print all three.",
        "vi": "Khai báo user_id = 101, user_role = \"admin\", is_verified = True. In cả ba biến."
      },
      "starterCode": "# Declare the 3 variables and print them\n",
      "solutionCode": "user_id = 101\nuser_role = \"admin\"\nis_verified = True\nprint(user_id, user_role, is_verified)\n",
      "expectedOutput": "101 admin True",
      "requiredPatterns": [],
      "hint": {
        "en": "Assign values to user_id, user_role, is_verified, then call print.",
        "vi": "Gán giá trị cho user_id, user_role, is_verified rồi gọi lệnh print."
      }
    },
    "consolidationPractice": {
      "task": {
        "en": "Multiple Assignment & Value Swapping",
        "vi": "Gán Nhiều Biến & Hoán Đổi Giá Trị"
      },
      "instruction": {
        "en": "Assign a, b = 15, 30. Swap their values using a, b = b, a. Print a and b.",
        "vi": "Gán a, b = 15, 30. Hoán đổi giá trị bằng a, b = b, a. In ra a và b."
      },
      "starterCode": "a, b = 15, 30\n# Swap values in one line\na, b = b, a\nprint(\"a:\", a, \"b:\", b)\n",
      "solutionCode": "a, b = 15, 30\na, b = b, a\nprint(\"a:\", a, \"b:\", b)\n",
      "expectedOutput": "a: 30 b: 15",
      "requiredPatterns": [],
      "hint": {
        "en": "Python allows swapping directly: a, b = b, a",
        "vi": "Python cho phép hoán đổi trực tiếp: a, b = b, a"
      }
    }
  },
  "exercisePool": [
    {
      "id": "py_ex_2_1",
      "type": "write_code",
      "title": {
        "en": "Demonstrate Reference Sharing vs Independent Copy",
        "vi": "Minh Họa Tham Chiếu Chung và Bản Sao Độc Lập"
      },
      "instruction": {
        "en": "Create original_config = ['auth', 'cache']. Create alias_config = original_config and copy_config = original_config.copy(). Append 'metrics' to alias_config. Print original_config and copy_config.",
        "vi": "Tạo original_config = ['auth', 'cache']. Tạo alias_config = original_config và copy_config = original_config.copy(). Thêm 'metrics' vào alias_config. In original_config và copy_config."
      },
      "starterCode": "original_config = [\"auth\", \"cache\"]\n# Create alias and copy, append to alias, print both:\n",
      "solutionCode": "original_config = [\"auth\", \"cache\"]\nalias_config = original_config\ncopy_config = original_config.copy()\nalias_config.append(\"metrics\")\nprint(\"Original:\", original_config)\nprint(\"Copy:\", copy_config)",
      "hint": {
        "en": "alias_config shares the same memory as original_config, while copy_config is independent.",
        "vi": "alias_config dùng chung vùng nhớ, còn copy_config là bản sao độc lập."
      },
      "explanation": {
        "en": "Modifying a shared reference mutates the underlying object, whereas .copy() isolates changes.",
        "vi": "Sửa đổi biến tham chiếu chung sẽ thay đổi đối tượng gốc, trong khi .copy() cô lập dữ liệu."
      }
    },
    {
      "id": "py_ex_2_2",
      "type": "fix_code",
      "title": {
        "en": "Fix Inadvertent List Mutation Bug",
        "vi": "Sửa Lỗi Vô Tình Sửa Đổi Danh Sách Gốc"
      },
      "instruction": {
        "en": "Fix the code so that primary_nodes is NOT mutated when backup_nodes is modified. Use .copy() on line 2.",
        "vi": "Sửa mã nguồn để primary_nodes KHÔNG bị thay đổi khi backup_nodes bị sửa. Dùng .copy() ở dòng 2."
      },
      "starterCode": "primary_nodes = [\"node-1\", \"node-2\"]\nbackup_nodes = primary_nodes\nbackup_nodes.append(\"node-3-standby\")\nprint(\"Primary Nodes:\", primary_nodes)",
      "solutionCode": "primary_nodes = [\"node-1\", \"node-2\"]\nbackup_nodes = primary_nodes.copy()\nbackup_nodes.append(\"node-3-standby\")\nprint(\"Primary Nodes:\", primary_nodes)",
      "hint": {
        "en": "Change 'backup_nodes = primary_nodes' to 'backup_nodes = primary_nodes.copy()'",
        "vi": "Đổi thành backup_nodes = primary_nodes.copy()"
      },
      "explanation": {
        "en": "Using .copy() prevents unintentional side-effects on the original list.",
        "vi": "Dùng .copy() ngăn ngừa tác dụng phụ ngoài ý muốn lên danh sách gốc."
      }
    },
    {
      "id": "py_ex_2_3",
      "type": "complete_code",
      "title": {
        "en": "Inspect Object Identity with is and id()",
        "vi": "Kiểm Tra Định Danh Vùng Nhớ"
      },
      "instruction": {
        "en": "Complete the identity check using the 'is' operator to verify if x and y point to the same memory object.",
        "vi": "Hoàn thiện câu lệnh kiểm tra định danh bằng toán tử 'is' để xem x và y có cùng trỏ vào một vùng nhớ hay không."
      },
      "starterCode": "x = [1, 2, 3]\ny = [1, 2, 3]\nprint(\"Values equal:\", x == y)\nprint(\"Identities same:\", )",
      "solutionCode": "x = [1, 2, 3]\ny = [1, 2, 3]\nprint(\"Values equal:\", x == y)\nprint(\"Identities same:\", x is y)",
      "hint": {
        "en": "Use 'x is y' in the second print call.",
        "vi": "Dùng 'x is y' trong lệnh in thứ hai."
      },
      "explanation": {
        "en": "x and y have equal values but exist in separate memory addresses, so x is y evaluates to False.",
        "vi": "x và y có giá trị giống nhau nhưng nằm ở 2 địa chỉ RAM khác nhau nên 'x is y' là False."
      }
    },
    {
      "id": "py_ex_2_4",
      "type": "predict_output",
      "title": {
        "en": "Check Type Name of System Metric",
        "vi": "Kiểm Tra Tên Kiểu Dữ Liệu"
      },
      "instruction": {
        "en": "Given latency_ms = 45.8, print the type name using type(latency_ms).__name__.",
        "vi": "Cho latency_ms = 45.8, in ra tên kiểu dữ liệu bằng type(latency_ms).__name__."
      },
      "starterCode": "latency_ms = 45.8\n# Print type name below:\n",
      "solutionCode": "latency_ms = 45.8\nprint(type(latency_ms).__name__)",
      "hint": {
        "en": "Use type(latency_ms).__name__",
        "vi": "Dùng type(latency_ms).__name__"
      },
      "explanation": {
        "en": "type(45.8).__name__ evaluates to the clean string 'float'.",
        "vi": "type(45.8).__name__ trả về chuỗi 'float'."
      }
    },
    {
      "id": "py_ex_2_5",
      "type": "problem_solving",
      "title": {
        "en": "User Session Payload Memory State",
        "vi": "Quản Lý Trạng Thái Phiên Người Dùng"
      },
      "instruction": {
        "en": "Create user_id = 10402 (int), user_email = 'alex@company.com' (str), and is_admin = False (bool). Print 'User:' followed by user_id, user_email, and is_admin.",
        "vi": "Tạo user_id = 10402 (int), user_email = 'alex@company.com' (str), và is_admin = False (bool). In 'User:' kèm theo 3 biến trên."
      },
      "starterCode": "# Declare user session state and print:\n",
      "solutionCode": "user_id = 10402\nuser_email = \"alex@company.com\"\nis_admin = False\nprint(\"User:\", user_id, user_email, is_admin)",
      "hint": {
        "en": "Declare all 3 variables and print them separated by commas.",
        "vi": "Khai báo 3 biến và in ra ngăn cách bởi dấu phẩy."
      },
      "explanation": {
        "en": "Dynamic variable declaration cleanly models application session states.",
        "vi": "Khai báo biến động mô hình hóa chính xác trạng thái phiên làm việc."
      }
    }
  ],
  "challenge": {
    "id": "py_ch_2",
    "title": {
      "en": "E-Commerce Product Model",
      "vi": "Mô Hình Sản Phẩm Thương Mại Điện Tử"
    },
    "description": {
      "en": "Store product information: title = \"Wireless Mouse\", base_price = 25.0, discount_rate = 0.15, stock = 120. Calculate final_price = base_price * (1 - discount_rate) and print product name and final_price.",
      "vi": "Lưu thông tin sản phẩm: title = \"Wireless Mouse\", base_price = 25.0, discount_rate = 0.15, stock = 120. Tính final_price = base_price * (1 - discount_rate) và in tên sản phẩm kèm giá cuối."
    },
    "requirements": [
      {
        "en": "Define title, base_price, discount_rate, and stock",
        "vi": "Khai báo title, base_price, discount_rate và stock"
      },
      {
        "en": "Calculate final_price = base_price * (1 - discount_rate)",
        "vi": "Tính final_price = base_price * (1 - discount_rate)"
      },
      {
        "en": "Print title and final_price",
        "vi": "In title và final_price"
      }
    ],
    "starterCode": "# Declare product variables and calculate final_price\n",
    "solutionCode": "title = \"Wireless Mouse\"\nbase_price = 25.0\ndiscount_rate = 0.15\nstock = 120\nfinal_price = base_price * (1 - discount_rate)\nprint(\"Product:\", title)\nprint(\"Final Price:\", final_price)\n",
    "hints": [
      {
        "en": "final_price = base_price * (1 - discount_rate)",
        "vi": "final_price = base_price * (1 - discount_rate)"
      }
    ],
    "solutionExplanation": {
      "en": "Calculates discounted unit price using dynamic arithmetic.",
      "vi": "Tính giá bán sau chiết khấu dựa trên các biến số học."
    }
  },
  "quizQuestionPool": [
    {
      "id": "py_q_2_1",
      "type": "single_choice",
      "question": {
        "en": "Which built-in function returns the data type of an object in Python?",
        "vi": "Hàm có sẵn nào trả về kiểu dữ liệu của một đối tượng trong Python?"
      },
      "options": [
        {
          "en": "type()",
          "vi": "type()"
        },
        {
          "en": "typeof()",
          "vi": "typeof()"
        },
        {
          "en": "datatype()",
          "vi": "datatype()"
        },
        {
          "en": "is_type()",
          "vi": "is_type()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "type(x) returns the type class of object x.",
        "vi": "Hàm type(x) trả về lớp kiểu dữ liệu của x."
      },
      "topicId": "python_variables",
      "difficulty": "easy"
    },
    {
      "id": "py_q_2_2",
      "type": "single_choice",
      "question": {
        "en": "Which function returns the unique integer memory address identity of an object in CPython?",
        "vi": "Hàm nào trả về định danh địa chỉ bộ nhớ nguyên thủy duy nhất của đối tượng?"
      },
      "options": [
        {
          "en": "id()",
          "vi": "id()"
        },
        {
          "en": "addr()",
          "vi": "addr()"
        },
        {
          "en": "memory()",
          "vi": "memory()"
        },
        {
          "en": "hash()",
          "vi": "hash()"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "id() returns the memory location identifier of an object in CPython.",
        "vi": "Hàm id() trả về định danh vùng nhớ duy nhất của đối tượng."
      },
      "topicId": "python_variables",
      "difficulty": "easy"
    },
    {
      "id": "py_q_2_3",
      "type": "single_choice",
      "question": {
        "en": "What happens when you execute list_b = list_a where list_a is a mutable list [1, 2, 3]?",
        "vi": "Điều gì xảy ra khi thực hiện list_b = list_a với list_a là danh sách [1, 2, 3]?"
      },
      "options": [
        {
          "en": "Both variables reference the exact same list object in memory (shared reference)",
          "vi": "Cả hai biến cùng trỏ vào một đối tượng danh sách duy nhất trong bộ nhớ (tham chiếu chung)"
        },
        {
          "en": "A brand new independent duplicate copy of the list is created",
          "vi": "Một bản sao độc lập mới của danh sách được tạo ra"
        },
        {
          "en": "list_b becomes a read-only view of list_a",
          "vi": "list_b trở thành view chỉ đọc"
        },
        {
          "en": "A TypeError is raised because lists cannot be assigned directly",
          "vi": "Báo lỗi TypeError"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "In Python, variable assignment '=' binds a reference to the same object. Modifying list_b mutates list_a.",
        "vi": "Lệnh gán '=' chỉ gán tham chiếu cùng trỏ tới 1 vùng nhớ. Thay đổi list_b sẽ làm thay đổi list_a."
      },
      "topicId": "python_variables",
      "difficulty": "hard"
    },
    {
      "id": "py_q_2_4",
      "type": "single_choice",
      "question": {
        "en": "Which operator checks if two variables point to the exact same memory object (identity)?",
        "vi": "Toán tử nào kiểm tra xem hai biến có cùng trỏ tới một địa chỉ bộ nhớ hay không?"
      },
      "options": [
        {
          "en": "is",
          "vi": "is"
        },
        {
          "en": "==",
          "vi": "=="
        },
        {
          "en": "equals",
          "vi": "equals"
        },
        {
          "en": "same",
          "vi": "same"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "'is' checks identity (id(a) == id(b)), while '==' checks value equality.",
        "vi": "'is' so sánh địa chỉ vùng nhớ, còn '==' so sánh giá trị bên trong."
      },
      "topicId": "python_variables",
      "difficulty": "medium"
    },
    {
      "id": "py_q_2_5",
      "type": "single_choice",
      "question": {
        "en": "What is the result of type(True)?",
        "vi": "Kết quả của type(True) trong Python là gì?"
      },
      "options": [
        {
          "en": "<class 'bool'>",
          "vi": "<class 'bool'>"
        },
        {
          "en": "<class 'int'>",
          "vi": "<class 'int'>"
        },
        {
          "en": "<class 'boolean'>",
          "vi": "<class 'boolean'>"
        },
        {
          "en": "<class 'truth'>",
          "vi": "<class 'truth'>"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "True and False belong to the bool class (a subclass of int).",
        "vi": "True và False thuộc lớp bool trong Python."
      },
      "topicId": "python_variables",
      "difficulty": "easy"
    },
    {
      "id": "py_q_2_6",
      "type": "single_choice",
      "question": {
        "en": "Which of the following is an INVALID variable name in Python?",
        "vi": "Tên biến nào sau đây là KHÔNG hợp lệ trong Python?"
      },
      "options": [
        {
          "en": "2nd_metric",
          "vi": "2nd_metric"
        },
        {
          "en": "metric_2nd",
          "vi": "metric_2nd"
        },
        {
          "en": "_metric_count",
          "vi": "_metric_count"
        },
        {
          "en": "totalAmount",
          "vi": "totalAmount"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Variable names in Python cannot begin with a digit.",
        "vi": "Tên biến trong Python không được bắt đầu bằng chữ số."
      },
      "topicId": "python_variables",
      "difficulty": "easy"
    },
    {
      "id": "py_q_2_7",
      "type": "single_choice",
      "question": {
        "en": "What mechanism automatically reclaims unused memory in Python?",
        "vi": "Cơ chế nào tự động thu hồi bộ nhớ không còn sử dụng trong Python?"
      },
      "options": [
        {
          "en": "Reference Counting combined with Generational Garbage Collection",
          "vi": "Đếm tham chiếu (Reference Counting) kết hợp Bộ thu gom rác thế hệ"
        },
        {
          "en": "Manual free() calls required by programmer",
          "vi": "Lập trình viên phải gọi hàm free() thủ công"
        },
        {
          "en": "OS Paging without interpreter involvement",
          "vi": "Phân trang của hệ điều hành"
        },
        {
          "en": "Stack popping on every line end",
          "vi": "Giải phóng stack cuối mỗi dòng"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Python uses reference counting as primary memory management with a cyclical GC.",
        "vi": "Python dùng đếm tham chiếu kết hợp bộ gom rác thế hệ để dọn rác bộ nhớ."
      },
      "topicId": "python_variables",
      "difficulty": "hard"
    },
    {
      "id": "py_q_2_8",
      "type": "single_choice",
      "question": {
        "en": "What is integer interning in CPython?",
        "vi": "Cơ chế 'integer interning' trong CPython là gì?"
      },
      "options": [
        {
          "en": "Pre-allocating and caching small integers (-5 to 256) in memory",
          "vi": "Cấp phát và lưu đệm sẵn các số nguyên nhỏ (-5 đến 256) trong bộ nhớ"
        },
        {
          "en": "Converting all numbers into 64-bit BigInt",
          "vi": "Chuyển mọi số thành BigInt 64-bit"
        },
        {
          "en": "Encrypting integers for security",
          "vi": "Mã hóa số nguyên để bảo mật"
        },
        {
          "en": "Forcing integers to be float internally",
          "vi": "Ép số nguyên thành float trong nội bộ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "CPython interns small integers from -5 to 256 for memory and speed efficiency.",
        "vi": "CPython lưu đệm các số nguyên từ -5 đến 256 để tối ưu tốc độ và bộ nhớ."
      },
      "topicId": "python_variables",
      "difficulty": "hard"
    },
    {
      "id": "py_q_2_9",
      "type": "single_choice",
      "question": {
        "en": "What happens when multiple variables are assigned in one line: x = y = 50?",
        "vi": "Điều gì xảy ra với lệnh gán x = y = 50?"
      },
      "options": [
        {
          "en": "Both x and y reference the same integer object 50",
          "vi": "Cả x và y cùng tham chiếu đến đối tượng số 50"
        },
        {
          "en": "x is assigned 50 and y is assigned None",
          "vi": "x nhận 50 và y nhận None"
        },
        {
          "en": "SyntaxError is raised",
          "vi": "Báo lỗi cú pháp"
        },
        {
          "en": "A tuple (50, 50) is assigned to x",
          "vi": "Gán một tuple (50, 50) cho x"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Chained assignment binds multiple variable names to the exact same object.",
        "vi": "Phép gán liên hoàn gán nhiều biến cùng trỏ vào một đối tượng."
      },
      "topicId": "python_variables",
      "difficulty": "medium"
    },
    {
      "id": "py_q_2_10",
      "type": "single_choice",
      "question": {
        "en": "How can you unpack coordinates from a tuple: coords = (100, 250)?",
        "vi": "Làm thế nào để mở gói (unpack) tuple coords = (100, 250) vào 2 biến x, y?"
      },
      "options": [
        {
          "en": "x, y = coords",
          "vi": "x, y = coords"
        },
        {
          "en": "x = coords[0, 1]",
          "vi": "x = coords[0, 1]"
        },
        {
          "en": "(x; y) = coords",
          "vi": "(x; y) = coords"
        },
        {
          "en": "unpack(coords, x, y)",
          "vi": "unpack(coords, x, y)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Sequence unpacking assigns elements by positional order: x, y = coords.",
        "vi": "Cú pháp mở gói tuần tự x, y = coords gán lần lượt các phần tử."
      },
      "topicId": "python_variables",
      "difficulty": "medium"
    },
    {
      "id": "py_q_2_11",
      "type": "single_choice",
      "question": {
        "en": "Is None a keyword, built-in constant object, or function in Python?",
        "vi": "None trong Python là đối tượng gì?"
      },
      "options": [
        {
          "en": "The singleton constant representing the absence of a value (type NoneType)",
          "vi": "Đối tượng hằng số duy nhất đại diện cho sự vắng mặt của giá trị (NoneType)"
        },
        {
          "en": "A numerical zero equivalent to 0",
          "vi": "Một giá trị số 0"
        },
        {
          "en": "A special empty string ''",
          "vi": "Một chuỗi rỗng đặc biệt"
        },
        {
          "en": "An exception error code",
          "vi": "Một mã lỗi ngoại lệ"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "None is the sole instance of the NoneType class in Python.",
        "vi": "None là thể hiện duy nhất của lớp NoneType đại diện cho giá trị rỗng."
      },
      "topicId": "python_variables",
      "difficulty": "medium"
    },
    {
      "id": "py_q_2_12",
      "type": "single_choice",
      "question": {
        "en": "If a = [10, 20] and b = a.copy(), what is the result of (a == b, a is b)?",
        "vi": "Nếu a = [10, 20] và b = a.copy(), kết quả của (a == b, a is b) là gì?"
      },
      "options": [
        {
          "en": "(True, False)",
          "vi": "(True, False)"
        },
        {
          "en": "(True, True)",
          "vi": "(True, True)"
        },
        {
          "en": "(False, False)",
          "vi": "(False, False)"
        },
        {
          "en": "(False, True)",
          "vi": "(False, True)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "b is an independent copy with identical values, so values match (True) but identities differ (False).",
        "vi": "b là bản sao độc lập nên giá trị giống nhau (True) nhưng địa chỉ vùng nhớ khác nhau (False)."
      },
      "topicId": "python_variables",
      "difficulty": "hard"
    },
    {
      "id": "py_q_2_13",
      "type": "single_choice",
      "question": {
        "en": "What does the del statement do to a variable in Python?",
        "vi": "Lệnh del làm gì với một biến trong Python?"
      },
      "options": [
        {
          "en": "Deletes the variable name binding from local/global namespace",
          "vi": "Xóa liên kết tên biến khỏi không gian tên"
        },
        {
          "en": "Directly zeroes out the RAM bytes immediately",
          "vi": "Ghi đè số 0 vào RAM ngay lập tức"
        },
        {
          "en": "Sets the variable value to None",
          "vi": "Gán giá trị của biến thành None"
        },
        {
          "en": "Raises a DeletionWarning",
          "vi": "In cảnh báo DeletionWarning"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "del removes the variable reference, decrementing the object's reference count.",
        "vi": "del xóa tên biến và giảm số đếm tham chiếu của đối tượng đi 1."
      },
      "topicId": "python_variables",
      "difficulty": "medium"
    },
    {
      "id": "py_q_2_14",
      "type": "single_choice",
      "question": {
        "en": "What is the recommended naming convention for variables and functions in PEP 8?",
        "vi": "Quy ước đặt tên chuẩn cho biến và hàm theo PEP 8 là gì?"
      },
      "options": [
        {
          "en": "snake_case (e.g. user_age)",
          "vi": "snake_case (vd: user_age)"
        },
        {
          "en": "camelCase (e.g. userAge)",
          "vi": "camelCase (vd: userAge)"
        },
        {
          "en": "PascalCase (e.g. UserAge)",
          "vi": "PascalCase (vd: UserAge)"
        },
        {
          "en": "SCREAMING_SNAKE_CASE",
          "vi": "SCREAMING_SNAKE_CASE"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "PEP 8 recommends snake_case for functions and variables.",
        "vi": "PEP 8 khuyên dùng snake_case cho biến và hàm."
      },
      "topicId": "python_variables",
      "difficulty": "easy"
    },
    {
      "id": "py_q_2_15",
      "type": "single_choice",
      "question": {
        "en": "Can a Python variable name contain Unicode characters like Vietnamese letters?",
        "vi": "Tên biến trong Python 3 có thể chứa ký tự Unicode có dấu không?"
      },
      "options": [
        {
          "en": "Yes, Python 3 supports Unicode identifiers, but ASCII is recommended by PEP 8",
          "vi": "Có, Python 3 hỗ trợ định danh Unicode, nhưng PEP 8 khuyến khích dùng ASCII"
        },
        {
          "en": "No, Python 3 strictly throws SyntaxError for non-ASCII",
          "vi": "Không, Python 3 báo lỗi cú pháp"
        },
        {
          "en": "Only inside docstrings",
          "vi": "Chỉ được trong chú thích"
        },
        {
          "en": "Only with special import unicode_identifiers",
          "vi": "Phải import thư viện ngoài"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Python 3 source is UTF-8 by default and allows Unicode identifiers.",
        "vi": "Python 3 hỗ trợ Unicode cho tên biến nhưng nên dùng tiếng Anh theo chuẩn."
      },
      "topicId": "python_variables",
      "difficulty": "easy"
    },
    {
      "id": "py_q_2_16",
      "type": "single_choice",
      "question": {
        "en": "What is the output of print(type(3.14) is float)?",
        "vi": "Kết quả của print(type(3.14) is float) là gì?"
      },
      "options": [
        {
          "en": "True",
          "vi": "True"
        },
        {
          "en": "False",
          "vi": "False"
        },
        {
          "en": "TypeError",
          "vi": "TypeError"
        },
        {
          "en": "None",
          "vi": "None"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "type(3.14) evaluates to the class float, which is identical to float.",
        "vi": "type(3.14) trả về float, nên so sánh 'is float' là True."
      },
      "topicId": "python_variables",
      "difficulty": "easy"
    }
  ]
};

export default lesson02;
