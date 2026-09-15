import { Lesson, LearnPractice, CodeExecutionResult } from '../types';

export interface PracticeValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * Validates whether the student's solution correctly fixed the intended error
 * and preserved the intended logic and output.
 */
export function validateLearnPractice(
  code: string,
  result: CodeExecutionResult,
  practice: LearnPractice,
  lang: 'en' | 'vi' = 'en'
): PracticeValidationResult {
  const isVi = lang === 'vi';

  // 1. Code execution check
  if (!result.isSuccess || result.error) {
    return {
      isValid: false,
      message: isVi
        ? 'Mã nguồn vẫn còn lỗi khi thực thi. Hãy sửa lỗi dựa theo thông báo bên dưới.'
        : 'The code still contains errors during execution. Please fix the error and run again.',
    };
  }

  // 2. Unmodified starter code check
  const trimmedCode = code.trim();
  const trimmedStarter = practice.starterCode.trim();
  if (trimmedCode === trimmedStarter) {
    return {
      isValid: false,
      message: isVi
        ? 'Bạn chưa chỉnh sửa đoạn mã nào. Hãy sửa lỗi theo yêu cầu của bài thực hành.'
        : 'You have not modified the code yet. Please fix the intentional error.',
    };
  }

  // 3. Forbidden patterns check (e.g. initial typo or incorrect modification)
  if (practice.forbiddenPatterns && practice.forbiddenPatterns.length > 0) {
    for (const pattern of practice.forbiddenPatterns) {
      const regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
      if (regex.test(code)) {
        return {
          isValid: false,
          message: isVi
            ? 'Đoạn mã vẫn còn chứa lỗi chưa được khắc phục hoặc đã thay đổi sai mục tiêu bài học.'
            : 'The code still contains the uncorrected error or an unintended modification.',
        };
      }
    }
  }

  // 4. Required patterns check (ensures expected syntax and logic preservation)
  if (practice.requiredPatterns && practice.requiredPatterns.length > 0) {
    for (const pattern of practice.requiredPatterns) {
      const regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;
      if (!regex.test(code)) {
        return {
          isValid: false,
          message: isVi
            ? 'Đoạn mã chưa sửa đúng theo cú pháp mong đợi hoặc đã làm thay đổi logic/giá trị ban đầu.'
            : 'The code is missing the expected fix or has modified the original logic/values.',
        };
      }
    }
  }

  // 5. Expected output check
  if (practice.expectedOutput !== undefined) {
    const normalize = (s: string) =>
      s
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map((l) => l.trimEnd())
        .filter((l) => l.length > 0)
        .join('\n')
        .trim();

    const actualOutput = normalize(result.output || '');
    const expected = normalize(practice.expectedOutput);

    if (actualOutput !== expected) {
      return {
        isValid: false,
        message: isVi
          ? `Kết quả đầu ra (${actualOutput || 'trống'}) không khớp với kết quả mong đợi (${expected}). Hãy giữ nguyên các giá trị và biến ban đầu, chỉ sửa lỗi cú pháp.`
          : `Output (${actualOutput || 'empty'}) does not match the expected result (${expected}). Please preserve original values and only fix the syntax error.`,
      };
    }
  }

  return {
    isValid: true,
    message: isVi
      ? 'Chính xác! Bạn đã sửa lỗi thành công.'
      : 'Correct! You fixed the error successfully.',
  };
}

/**
 * Provides structured error-fixing practice activities for the Learn stage.
 * Ensures the learner is given a clear task, intentional small error in starter code,
 * an editable runner, beginner-friendly feedback, and hints.
 */
export function getLessonLearnPractice(lesson: Lesson, courseId: string): LearnPractice {
  // If the lesson already has explicitly defined practice
  if (lesson.learn.practice) {
    return lesson.learn.practice;
  }

  const topic = (lesson.topicId || '').toLowerCase();
  const lang = (lesson.courseId || courseId || 'python').toLowerCase();

  // ==========================================
  // 1. PYTHON TRACK PRACTICES
  // ==========================================
  if (lang === 'python') {
    // Variables & Print
    if (topic.includes('variable') || topic.includes('intro') || topic.includes('print')) {
      return {
        task: {
          en: 'Practice: Fix the error in the code below.',
          vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
        },
        instruction: {
          en: 'Fix the misspelled function name so the code prints the message successfully.',
          vi: 'Sửa lỗi chính tả tên hàm để đoạn mã in ra thông điệp thành công.',
        },
        starterCode: '# Fix the typo in the function below\nmessage = "Hello, Python learner!"\nprnit(message)\n',
        solutionCode: 'message = "Hello, Python learner!"\nprint(message)\n',
        expectedOutput: 'Hello, Python learner!',
        requiredPatterns: [
          /message\s*=\s*["']Hello, Python learner!["']/,
          /print\s*\(\s*message\s*\)/
        ],
        forbiddenPatterns: [
          /\bprnit\b/
        ],
        hint: {
          en: 'Look at line 3: the function name should be "print" instead of "prnit".',
          vi: 'Xem dòng 3: tên hàm chuẩn là "print" thay vì "prnit".',
        },
        explanation: {
          en: 'Python is case-sensitive and requires exact spelling for built-in functions like print().',
          vi: 'Python phân biệt chữ hoa chữ thường và yêu cầu viết chính xác tên hàm tích hợp như print().',
        }
      };
    }

    // Conditionals / If-else
    if (topic.includes('condition') || topic.includes('if') || topic.includes('bool')) {
      return {
        task: {
          en: 'Practice: Fix the error in the code below.',
          vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
        },
        instruction: {
          en: 'Fix the missing syntax symbol at the end of the if statement without altering the score value.',
          vi: 'Sửa lỗi cú pháp thiếu ký tự ở cuối câu lệnh if mà không thay đổi giá trị điểm số score.',
        },
        starterCode: 'score = 85\n\nif score >= 80\n    print("Passed with Distinction!")\n',
        solutionCode: 'score = 85\n\nif score >= 80:\n    print("Passed with Distinction!")\n',
        expectedOutput: 'Passed with Distinction!',
        requiredPatterns: [
          /score\s*=\s*85/,
          /if\s+score\s*>=\s*80\s*:/,
          /print\s*\(\s*["']Passed with Distinction!["']\s*\)/
        ],
        hint: {
          en: 'Every if/elif/else statement in Python must end with a colon (:).',
          vi: 'Mọi câu lệnh if/elif/else trong Python phải kết thúc bằng dấu hai chấm (:).',
        },
        explanation: {
          en: 'The colon (:) tells Python that an indented code block follows.',
          vi: 'Dấu hai chấm (:) báo hiệu cho Python biết phía sau là một khối lệnh thụt lề.',
        }
      };
    }

    // Loops (For / While)
    if (topic.includes('loop') || topic.includes('for') || topic.includes('while')) {
      return {
        task: {
          en: 'Practice: Fix the error in the code below.',
          vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
        },
        instruction: {
          en: 'Add the missing colon (:) after range(1, 3) without changing the numbers 1 and 3 or the print statement.',
          vi: 'Thêm dấu hai chấm (:) bị thiếu sau range(1, 3) mà không thay đổi các số 1 và 3 hay câu lệnh print.',
        },
        starterCode: '# Add the missing colon\nfor i in range(1, 3)\n    print(i)\n',
        solutionCode: 'for i in range(1, 3):\n    print(i)\n',
        expectedOutput: '1\n2',
        requiredPatterns: [
          /for\s+i\s+in\s+range\s*\(\s*1\s*,\s*3\s*\)\s*:/,
          /print\s*\(\s*i\s*\)/
        ],
        forbiddenPatterns: [
          /for\s+i\s+in\s+range\s*\(\s*1\s*,\s*[4-9]\s*\)/,
          /for\s+i\s+in\s+range\s*\(\s*[02-9]\s*,/
        ],
        hint: {
          en: 'Add a colon (:) at the end of "for i in range(1, 3)". Do not change 1 or 3.',
          vi: 'Thêm dấu hai chấm (:) vào cuối câu lệnh "for i in range(1, 3)". Giữ nguyên giá trị 1 và 3.',
        },
        explanation: {
          en: 'Loops in Python require a colon (:) after the iterable expression.',
          vi: 'Vòng lặp trong Python bắt buộc có dấu hai chấm (:) sau biểu thức lặp.',
        }
      };
    }

    // Functions
    if (topic.includes('func') || topic.includes('def')) {
      return {
        task: {
          en: 'Practice: Fix the error in the code below.',
          vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
        },
        instruction: {
          en: 'Fix the function definition header so it properly defines greet(name).',
          vi: 'Sửa lỗi dòng định nghĩa hàm để hàm greet(name) hoạt động bình thường.',
        },
        starterCode: 'def greet(name)\n    return f"Welcome, {name}!"\n\nprint(greet("Alex"))\n',
        solutionCode: 'def greet(name):\n    return f"Welcome, {name}!"\n\nprint(greet("Alex"))\n',
        expectedOutput: 'Welcome, Alex!',
        requiredPatterns: [
          /def\s+greet\s*\(\s*name\s*\)\s*:/,
          /greet\s*\(\s*["']Alex["']\s*\)/
        ],
        hint: {
          en: 'Function definitions in Python must end with a colon (:).',
          vi: 'Định nghĩa hàm trong Python phải kết thúc bằng dấu hai chấm (:).',
        },
        explanation: {
          en: 'def function_name(args): requires a colon at the end of the header.',
          vi: 'def tên_hàm(tham_số): bắt buộc phải có dấu hai chấm ở cuối dòng tiêu đề hàm.',
        }
      };
    }

    // Lists & Dicts & Strings
    if (topic.includes('list') || topic.includes('dict') || topic.includes('string')) {
      return {
        task: {
          en: 'Practice: Fix the error in the code below.',
          vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
        },
        instruction: {
          en: 'Fix the unterminated string quote so the list prints without syntax error.',
          vi: 'Sửa lỗi thiếu dấu ngoặc kép đóng để danh sách được in ra thành công.',
        },
        starterCode: 'fruits = ["Apple", "Banana, "Cherry"]\nprint(fruits[0])\n',
        solutionCode: 'fruits = ["Apple", "Banana", "Cherry"]\nprint(fruits[0])\n',
        expectedOutput: 'Apple',
        requiredPatterns: [
          /fruits\s*=\s*\[\s*["']Apple["']\s*,\s*["']Banana["']\s*,\s*["']Cherry["']\s*\]/,
          /print\s*\(\s*fruits\[0\]\s*\)/
        ],
        hint: {
          en: 'Look at "Banana - it is missing a closing quote mark (").',
          vi: 'Xem từ "Banana - đang thiếu dấu ngoặc kép đóng (").',
        },
        explanation: {
          en: 'String literals must have matching opening and closing quotation marks.',
          vi: 'Chuỗi ký tự bắt buộc phải có đủ cặp dấu ngoặc kép hoặc đơn mở và đóng.',
        }
      };
    }

    // Classes & OOP
    if (topic.includes('class') || topic.includes('oop')) {
      return {
        task: {
          en: 'Practice: Fix the error in the code below.',
          vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
        },
        instruction: {
          en: 'Fix the missing colon in the constructor method header.',
          vi: 'Sửa lỗi thiếu dấu hai chấm trong hàm khởi tạo constructor.',
        },
        starterCode: 'class Student:\n    def __init__(self, name)\n        self.name = name\n\ns = Student("Alex")\nprint(s.name)\n',
        solutionCode: 'class Student:\n    def __init__(self, name):\n        self.name = name\n\ns = Student("Alex")\nprint(s.name)\n',
        expectedOutput: 'Alex',
        requiredPatterns: [
          /def\s+__init__\s*\(\s*self\s*,\s*name\s*\)\s*:/
        ],
        hint: {
          en: 'Add a colon (:) at the end of def __init__(self, name).',
          vi: 'Thêm dấu hai chấm (:) vào cuối dòng def __init__(self, name).',
        },
        explanation: {
          en: 'All Python methods defined with def must end with a colon (:).',
          vi: 'Mọi phương thức định nghĩa bằng def trong Python phải kết thúc bằng dấu hai chấm (:).',
        }
      };
    }

    // Default Python practice
    return {
      task: {
        en: 'Practice: Fix the error in the code below.',
        vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
      },
      instruction: {
        en: 'Fix the typo in the print function call to run the code successfully.',
        vi: 'Sửa lỗi chính tả hàm print để chạy đoạn mã thành công.',
      },
      starterCode: 'name = "Python"\nprnit(f"Learning {name}")\n',
      solutionCode: 'name = "Python"\nprint(f"Learning {name}")\n',
      expectedOutput: 'Learning Python',
      requiredPatterns: [
        /name\s*=\s*["']Python["']/,
        /print\s*\(\s*f?["']Learning \{?name\}?["']\s*\)/
      ],
      forbiddenPatterns: [
        /\bprnit\b/
      ],
      hint: {
        en: 'Check the spelling of "prnit" on line 2.',
        vi: 'Kiểm tra lỗi chính tả của từ "prnit" ở dòng 2.',
      },
      explanation: {
        en: 'Fixing small syntax errors is a core daily coding skill.',
        vi: 'Sửa các lỗi cú pháp nhỏ là kỹ năng lập trình thực tế quan trọng hàng ngày.',
      }
    };
  }

  // ==========================================
  // 2. SQL TRACK PRACTICES
  // ==========================================
  if (lang === 'sql' || lang === 'sqlite') {
    if (topic.includes('group') || topic.includes('agg')) {
      return {
        task: {
          en: 'Practice: Fix the error in the code below.',
          vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
        },
        instruction: {
          en: 'Fix the misspelled GROUP BY clause in the query.',
          vi: 'Sửa lỗi chính tả mệnh đề GROUP BY trong câu truy vấn.',
        },
        starterCode: 'SELECT course, AVG(grade) as avg_grade\nFROM students\nGROUP BYY course;\n',
        solutionCode: 'SELECT course, AVG(grade) as avg_grade\nFROM students\nGROUP BY course;\n',
        requiredPatterns: [
          /GROUP\s+BY\s+course/i
        ],
        forbiddenPatterns: [
          /\bGROUP\s+BYY\b/i
        ],
        hint: {
          en: 'Change "GROUP BYY" to "GROUP BY" on line 3.',
          vi: 'Sửa "GROUP BYY" thành "GROUP BY" ở dòng 3.',
        },
        explanation: {
          en: 'SQL clause keywords like GROUP BY must be spelled accurately.',
          vi: 'Từ khóa SQL như GROUP BY phải được viết chính xác.',
        }
      };
    }

    return {
      task: {
        en: 'Practice: Fix the error in the code below.',
        vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
      },
      instruction: {
        en: 'Fix the misspelled SQL keyword in the query.',
        vi: 'Sửa lỗi chính tả từ khóa SQL trong câu truy vấn.',
      },
      starterCode: 'SELCT id, name, grade\nFROM students\nWHERE grade >= 85;\n',
      solutionCode: 'SELECT id, name, grade\nFROM students\nWHERE grade >= 85;\n',
      requiredPatterns: [
        /SELECT\s+id,\s*name,\s*grade/i,
        /FROM\s+students/i,
        /WHERE\s+grade\s*>=\s*85/i
      ],
      forbiddenPatterns: [
        /\bSELCT\b/i
      ],
      hint: {
        en: 'The keyword "SELCT" on line 1 should be spelled "SELECT".',
        vi: 'Từ khóa "SELCT" ở dòng 1 cần sửa thành "SELECT".',
      },
      explanation: {
        en: 'SQL keywords like SELECT must be spelled correctly to execute queries.',
        vi: 'Các từ khóa SQL như SELECT phải được viết đúng chính tả để thực thi truy vấn.',
      }
    };
  }

  // ==========================================
  // 3. HTML / CSS TRACK PRACTICES
  // ==========================================
  if (lang === 'html' || lang === 'css') {
    if (lang === 'css' || topic.includes('css')) {
      return {
        task: {
          en: 'Practice: Fix the error in the code below.',
          vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
        },
        instruction: {
          en: 'Fix the missing colon in the CSS color property declaration.',
          vi: 'Sửa lỗi thiếu dấu hai chấm trong thuộc tính color của CSS.',
        },
        starterCode: '.button {\n  background-color: #4f46e5;\n  color white;\n  padding: 8px 16px;\n}',
        solutionCode: '.button {\n  background-color: #4f46e5;\n  color: white;\n  padding: 8px 16px;\n}',
        requiredPatterns: [
          /color\s*:\s*white\s*;/
        ],
        hint: {
          en: 'Add a colon (:) between "color" and "white".',
          vi: 'Thêm dấu hai chấm (:) giữa "color" và "white".',
        },
        explanation: {
          en: 'CSS properties require a colon (:) between property name and value.',
          vi: 'Thuộc tính CSS yêu cầu dấu hai chấm (:) giữa tên thuộc tính và giá trị.',
        }
      };
    }

    return {
      task: {
        en: 'Practice: Fix the error in the code below.',
        vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
      },
      instruction: {
        en: 'Fix the unclosed tag or syntax issue in the markup below.',
        vi: 'Sửa thẻ chưa đóng hoặc lỗi cú pháp trong đoạn mã dưới đây.',
      },
      starterCode: '<div class="card">\n  <h2>Welcome Learner</h2>\n  <p>Practice writing clean markup.<p>\n</div>',
      solutionCode: '<div class="card">\n  <h2>Welcome Learner</h2>\n  <p>Practice writing clean markup.</p>\n</div>',
      requiredPatterns: [
        /<p>Practice writing clean markup\.<\/p>/
      ],
      forbiddenPatterns: [
        /<p>Practice writing clean markup\.<p>/
      ],
      hint: {
        en: 'The paragraph tag closing on line 3 should be </p> instead of <p>.',
        vi: 'Thẻ đóng đoạn văn ở dòng 3 phải là </p> thay vì <p>.',
      },
      explanation: {
        en: 'HTML opening tags must have matching closing tags (e.g., <p>...</p>).',
        vi: 'Thẻ mở HTML phải có thẻ đóng tương ứng (ví dụ: <p>...</p>).',
      }
    };
  }

  // ==========================================
  // 4. JAVASCRIPT TRACK PRACTICES
  // ==========================================
  if (lang === 'javascript' || lang === 'js') {
    return {
      task: {
        en: 'Practice: Fix the error in the code below.',
        vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
      },
      instruction: {
        en: 'Fix the misspelled console.log method call.',
        vi: 'Sửa lỗi chính tả khi gọi hàm console.log.',
      },
      starterCode: 'const message = "Hello, JavaScript!";\nconosle.log(message);\n',
      solutionCode: 'const message = "Hello, JavaScript!";\nconsole.log(message);\n',
      expectedOutput: 'Hello, JavaScript!',
      requiredPatterns: [
        /const\s+message\s*=\s*["']Hello,\s*JavaScript!["']/,
        /console\.log\s*\(\s*message\s*\)/
      ],
      forbiddenPatterns: [
        /\bconosle\b/
      ],
      hint: {
        en: 'Change "conosle" on line 2 to "console".',
        vi: 'Sửa "conosle" ở dòng 2 thành "console".',
      },
      explanation: {
        en: 'JavaScript object and method names must be spelled exactly as defined.',
        vi: 'Tên đối tượng và phương thức trong JavaScript bắt buộc phải viết đúng chính tả.',
      }
    };
  }

  // ==========================================
  // 5. POWER BI / DAX PRACTICES
  // ==========================================
  if (lang === 'powerbi' || lang === 'dax') {
    return {
      task: {
        en: 'Practice: Fix the error in the code below.',
        vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
      },
      instruction: {
        en: 'Fix the misspelled DAX aggregator function.',
        vi: 'Sửa lỗi chính tả tên hàm tổng hợp DAX.',
      },
      starterCode: 'Total Sales = SM(orders[amount])',
      solutionCode: 'Total Sales = SUM(orders[amount])',
      requiredPatterns: [
        /SUM\s*\(\s*orders\[amount\]\s*\)/i
      ],
      forbiddenPatterns: [
        /\bSM\b/i
      ],
      hint: {
        en: 'Change "SM" to the standard DAX function "SUM".',
        vi: 'Sửa "SM" thành tên hàm DAX chuẩn "SUM".',
      },
      explanation: {
        en: 'DAX uses SUM(...) to aggregate numeric column values.',
        vi: 'DAX sử dụng hàm SUM(...) để tính tổng các giá trị trong cột số.',
      }
    };
  }

  // Fallback Practice
  return {
    task: {
      en: 'Practice: Fix the error in the code below.',
      vi: 'Thực hành: Hãy sửa lỗi trong đoạn code dưới đây.',
    },
    instruction: {
      en: 'Fix the syntax error in the code to ensure clean execution.',
      vi: 'Sửa lỗi cú pháp để đoạn mã được thực thi chính xác.',
    },
    starterCode: lesson.learn.practiceStarterCode || '# Fix the code below\nx = 10\nprint(x)\n',
    solutionCode: lesson.learn.practiceStarterCode || 'x = 10\nprint(x)\n',
    expectedOutput: '10',
    hint: {
      en: 'Review the code carefully for typos or punctuation errors.',
      vi: 'Kiểm tra kỹ đoạn mã xem có lỗi chính tả hoặc dấu câu nào không.',
    },
    explanation: {
      en: 'Careful debugging is a key developer superpower.',
      vi: 'Kỹ năng tìm và sửa lỗi cẩn thận là nền tảng của mọi lập trình viên.',
    }
  };
}
