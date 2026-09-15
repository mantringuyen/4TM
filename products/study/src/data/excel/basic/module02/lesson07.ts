import { Lesson } from '../../../../types';

export const lesson07: Lesson = {
  "id": "excel_lesson_7",
  "order": 7,
  "moduleId": "excel_mod_2",
  "courseId": "excel",
  "levelId": "basic",
  "topicId": "excel_dates",
  "title": {
    "en": "Date & Time Fundamentals: TODAY, NOW, DATE, YEAR, MONTH, DAY & NETWORKDAYS",
    "vi": "Cốt Lõi Ngày & Giờ: TODAY, NOW, DATE, YEAR, MONTH, DAY & NETWORKDAYS"
  },
  "summary": {
    "en": "Master Excel serial date numbering architecture (Day 1 = Jan 1, 1900), dynamic clock functions (TODAY, NOW), component extractions (YEAR, MONTH, DAY), and working business day modeling with NETWORKDAYS and WORKDAY.",
    "vi": "Làm chủ kiến trúc số sê-ri ngày tháng của Excel (Ngày 1 = 01/01/1900), các hàm đồng hồ động (TODAY, NOW), bóc tách thành phần (YEAR, MONTH, DAY) và tính toán ngày làm việc thực tế với NETWORKDAYS và WORKDAY."
  },
  "learn": {
    "introduction": {
      "en": "Dates in Excel are not static text—they are continuous sequential integers starting from 1 on January 1, 1900 (e.g. August 29, 2026 is stored as serial integer 46263). Fractional decimals represent time of day (0.5 = 12:00 PM noon). Understanding this serial architecture allows you to perform seamless date math, compute project durations, and track invoice aging.",
      "vi": "Ngày tháng trong Excel không phải là văn bản tĩnh—chúng là các số nguyên tuần tự liên tục bắt đầu từ 1 vào ngày 01/01/1900 (ví dụ ngày 29/08/2026 được lưu dưới dạng số nguyên sê-ri 46263). Phần số thập phân đại diện cho thời gian trong ngày (0.5 = 12:00 trưa). Hiểu kiến trúc này giúp bạn thực hiện các phép cộng trừ ngày tháng, tính thời lượng dự án và theo dõi tuổi nợ hóa đơn."
    },
    "conceptExplanation": {
      "en": "### 1. The Excel Serial Date & Time System\n- **Serial Integer**: Represents whole days since Jan 1, 1900.\n- **Serial Fraction**: Represents time of day (`0.25` = 6:00 AM, `0.50` = 12:00 PM, `0.75` = 6:00 PM).\n- **Date Math**: `=EndDate - StartDate` computes exact calendar days elapsed.\n\n### 2. Core Date Functions\n- **`=TODAY()`**: Volatile function returning the current system date at midnight (e.g. `2026-08-29`).\n- **`=NOW()`**: Volatile function returning current date AND exact time (e.g. `2026-08-29 15:30`).\n- **`=DATE(year, month, day)`**: Assembles a valid serial date from numeric components safely avoiding regional `mm/dd` vs `dd/mm` confusion.\n- **`=YEAR(date)` / `=MONTH(date)` / `=DAY(date)`**: Extracts individual numerical date components.\n\n### 3. Business Calendar Functions\n- **`=NETWORKDAYS(start_date, end_date, [holidays])`**: Calculates total working business days between two dates, automatically excluding Saturdays, Sundays, and optional holiday dates.\n- **`=WORKDAY(start_date, days, [holidays])`**: Returns the completion date that is a specific number of working days ahead of the start date.\n- **`=EOMONTH(start_date, months)`**: Returns the last day of the month after a specified number of months (e.g. `=EOMONTH(TODAY(), 0)` returns end of current month).",
      "vi": "### 1. Hệ Thống Số Sê-ri Ngày & Giờ Trong Excel\n- **Số nguyên sê-ri**: Đại diện cho số ngày kể từ ngày 01/01/1900.\n- **Số thập phân**: Đại diện cho thời gian trong ngày (`0.25` = 6:00 sáng, `0.50` = 12:00 trưa, `0.75` = 6:00 chiều).\n- **Phép toán ngày**: `=NgayKetThuc - NgayBatDau` tính chính xác số ngày theo lịch đã trôi qua.\n\n### 2. Các Hàm Ngày Tháng Cốt Lõi\n- **`=TODAY()`**: Hàm biến đổi trả về ngày hệ thống hiện tại tại mốc 00:00 (ví dụ: `2026-08-29`).\n- **`=NOW()`**: Hàm biến đổi trả về cả ngày hiện tại VÀ thời gian chính xác (ví dụ: `2026-08-29 15:30`).\n- **`=DATE(nam, thang, ngay)`**: Ghép nối các thành phần số thành một ngày sê-ri chuẩn xác, tránh nhầm lẫn giữa định dạng `mm/dd` và `dd/mm`.\n- **`=YEAR(ngay)` / `=MONTH(ngay)` / `=DAY(ngay)`**: Bóc tách từng thành phần số năm, tháng, ngày.\n\n### 3. Các Hàm Tính Toán Ngày Làm Việc Doanh Nghiệp\n- **`=NETWORKDAYS(ngay_bat_dau, ngay_ket_thuc, [ngay_le])`**: Tính tổng số ngày làm việc thực tế giữa 2 mốc thời gian, tự động trừ các ngày Thứ Bảy, Chủ Nhật và danh sách ngày nghỉ lễ tùy chọn.\n- **`=WORKDAY(ngay_bat_dau, so_ngay_lam_viec, [ngay_le])`**: Trả về ngày hoàn thành sau đúng số ngày làm việc quy định.\n- **`=EOMONTH(ngay_bat_dau, so_thang)`**: Trả về ngày cuối cùng của tháng sau một số tháng nhất định (ví dụ `=EOMONTH(TODAY(), 0)` trả về ngày cuối cùng của tháng hiện tại)."
    },
    "syntax": "# Basic Date Functions:\n=TODAY()\n=NOW()\n=DATE(2026, 8, 29)\n=YEAR(A2)\n=MONTH(A2)\n=DAY(A2)\n\n# Business Days:\n=NETWORKDAYS(start_date, end_date, [holidays])\n=WORKDAY(start_date, days, [holidays])\n=EOMONTH(start_date, months)",
    "examples": [
      {
        "title": {
          "en": "Calculating Invoice Aging in Days",
          "vi": "Tính Tuổi Nợ Hóa Đơn Theo Số Ngày"
        },
        "code": "Invoice Date in B2: 2026-07-15\n\nAging in Days Formula in C2: =TODAY() - B2\n(Format C2 as General/Number to view elapsed integer days, e.g. 45 days overdue)",
        "description": {
          "en": "Subtracting the invoice date from TODAY() dynamically updates overdue days every time the workbook opens.",
          "vi": "Trừ ngày hóa đơn cho TODAY() sẽ tự động cập nhật số ngày quá hạn mỗi khi mở bảng tính."
        }
      },
      {
        "title": {
          "en": "Project Working Days Schedule",
          "vi": "Lịch Trình Ngày Làm Việc Dự Án"
        },
        "code": "Project Start Date in B2: 2026-09-01\nProject Duration: 20 Working Days\nCompany Holidays Range in H2:H5\n\nFormula for Completion Date in B3: =WORKDAY(B2, 20, H2:H5)",
        "description": {
          "en": "WORKDAY automatically skips all weekends and specified company holidays to pinpoint the exact delivery date.",
          "vi": "WORKDAY tự động bỏ qua tất cả các ngày cuối tuần và ngày lễ công ty để xác định chính xác ngày bàn giao."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Entering dates as text strings \"08/29/2026\" inside formulas without DATE(), leading to #VALUE! errors when switching regional machine settings.",
          "vi": "Nhập ngày tháng dưới dạng chuỗi văn bản \"08/29/2026\" trong công thức thay vì dùng DATE(), gây lỗi #VALUE! khi đổi ngôn ngữ máy tính."
        },
        "correction": {
          "en": "Always use =DATE(year, month, day) to ensure universal compatibility regardless of regional settings.",
          "vi": "Luôn sử dụng =DATE(năm, tháng, ngày) để đảm bảo tính tương thích toàn cầu bất kể cài đặt vùng máy tính."
        }
      },
      {
        "mistake": {
          "en": "Seeing a date displayed as a random 5-digit number (e.g. 46263) and assuming the cell is broken.",
          "vi": "Thấy ngày tháng hiển thị thành con số 5 chữ số (ví dụ 46263) và tưởng rằng ô bị hỏng."
        },
        "correction": {
          "en": "Press Ctrl + Shift + 3 (Short Date format) to switch the raw serial integer display back to a formatted calendar date.",
          "vi": "Nhấn Ctrl + Shift + 3 (Định dạng ngày ngắn) để chuyển số nguyên sê-ri thô về định dạng ngày tháng lịch quen thuộc."
        }
      }
    ],
    "tips": [
      {
        "en": "Insert Static Timestamp: Press Ctrl + ; (semi-colon) to insert the current static date, or Ctrl + Shift + ; to insert the current static time (these will not update when recalculated).",
        "vi": "Chèn ngày giờ tĩnh: Nhấn Ctrl + ; để chèn ngày tĩnh hiện tại, hoặc Ctrl + Shift + ; để chèn giờ tĩnh (các giá trị này sẽ không bị thay đổi khi tính toán lại)."
      },
      {
        "en": "EOMONTH for Due Dates: Use =EOMONTH(A2, 1) to find the end of next month, a standard convention for supplier payment terms.",
        "vi": "EOMONTH cho hạn thanh toán: Dùng =EOMONTH(A2, 1) để tìm ngày cuối cùng của tháng sau, quy chuẩn kế toán phổ biến cho hạn thanh toán nhà cung cấp."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l7_ex1",
      "type": "complete_code",
      "title": {
        "en": "Calculate Working Days Between Project Milestones",
        "vi": "Tính Số Ngày Làm Việc Giữa Hai Mốc Dự Án"
      },
      "instruction": {
        "en": "Write the formula using NETWORKDAYS to compute working days between Start Date in A2 and End Date in B2.",
        "vi": "Viết công thức dùng NETWORKDAYS để tính số ngày làm việc giữa Ngày bắt đầu ở A2 và Ngày kết thúc ở B2."
      },
      "starterCode": "=NETWORKDAYS(",
      "solutionCode": "=NETWORKDAYS(A2, B2)",
      "expectedOutput": "=NETWORKDAYS(A2, B2)",
      "hint": {
        "en": "Pass A2 as start_date and B2 as end_date.",
        "vi": "Truyền A2 làm ngày bắt đầu và B2 làm ngày kết thúc."
      },
      "explanation": {
        "en": "=NETWORKDAYS(A2, B2) calculates net working business days excluding Saturdays and Sundays.",
        "vi": "=NETWORKDAYS(A2, B2) tính số ngày làm việc thực tế không tính Thứ Bảy và Chủ Nhật."
      }
    },
    {
      "id": "excel_l7_ex2",
      "type": "complete_code",
      "title": {
        "en": "Extract Birth Year from Date of Birth",
        "vi": "Trích Xuất Năm Sinh Từ Ngày Sinh"
      },
      "instruction": {
        "en": "Write the formula to extract the 4-digit year from the birth date in cell C2.",
        "vi": "Viết công thức trích xuất 4 chữ số năm từ ngày sinh trong ô C2."
      },
      "starterCode": "=",
      "solutionCode": "=YEAR(C2)",
      "expectedOutput": "=YEAR(C2)",
      "hint": {
        "en": "Use the YEAR function.",
        "vi": "Sử dụng hàm YEAR."
      },
      "explanation": {
        "en": "=YEAR(C2) returns the 4-digit year integer from the serial date.",
        "vi": "=YEAR(C2) trả về số nguyên năm 4 chữ số từ ngày sê-ri."
      }
    }
  ],
  "challenge": {
    "id": "excel_l7_challenge",
    "title": {
      "en": "Calculate Due Date at End of Billing Month",
      "vi": "Tính Hạn Thanh Toán Vào Ngày Cuối Tháng"
    },
    "description": {
      "en": "Write the formula for cell D2 to calculate the payment due date, defined as the last day of the same month as the invoice date in B2.",
      "vi": "Viết công thức cho ô D2 tính ngày hạn thanh toán, được quy định là ngày cuối cùng của chính tháng xuất hóa đơn ở B2."
    },
    "requirements": [
      {
        "en": "Use the EOMONTH function",
        "vi": "Sử dụng hàm EOMONTH"
      },
      {
        "en": "Pass 0 as the month offset for the current month",
        "vi": "Truyền 0 làm số tháng bù cho tháng hiện tại"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=EOMONTH(B2, 0)",
    "hints": [
      {
        "en": "Syntax: =EOMONTH(B2, 0)",
        "vi": "Cú pháp: =EOMONTH(B2, 0)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l7_q1",
      "type": "single_choice",
      "question": {
        "en": "How does Microsoft Excel internally store dates in its calculation engine?",
        "vi": "Microsoft Excel lưu trữ ngày tháng bên trong bộ tính toán của mình như thế nào?"
      },
      "options": [
        {
          "en": "As sequential serial numbers representing days elapsed since January 1, 1900",
          "vi": "Dưới dạng các số sê-ri tuần tự đại diện cho số ngày đã trôi qua kể từ ngày 01/01/1900"
        },
        {
          "en": "As text strings formatted as YYYY-MM-DD",
          "vi": "Dưới dạng chuỗi văn bản định dạng YYYY-MM-DD"
        },
        {
          "en": "As Unix timestamps in milliseconds",
          "vi": "Dưới dạng dấu thời gian Unix theo mili-giây"
        },
        {
          "en": "As binary byte arrays",
          "vi": "Dưới dạng mảng byte nhị phân"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Excel stores dates as integer serial numbers where Day 1 corresponds to January 1, 1900.",
        "vi": "Excel lưu ngày tháng dưới dạng số sê-ri nguyên trong đó Ngày 1 tương ứng với ngày 01/01/1900."
      },
      "difficulty": "easy",
      "topicId": "excel_dates"
    },
    {
      "id": "excel_l7_q2",
      "type": "single_choice",
      "question": {
        "en": "What is the main difference between `TODAY()` and `NOW()` in Excel?",
        "vi": "Sự khác biệt chính giữa `TODAY()` và `NOW()` trong Excel là gì?"
      },
      "options": [
        {
          "en": "TODAY returns only the current date; NOW returns both current date and current time",
          "vi": "TODAY chỉ trả về ngày hiện tại; NOW trả về cả ngày hiện tại và giờ hiện tại"
        },
        {
          "en": "TODAY is static; NOW updates",
          "vi": "TODAY là tĩnh; NOW tự cập nhật"
        },
        {
          "en": "TODAY returns UTC time; NOW returns local time",
          "vi": "TODAY trả về giờ UTC; NOW trả về giờ địa phương"
        },
        {
          "en": "TODAY returns year only; NOW returns full date",
          "vi": "TODAY chỉ trả về năm; NOW trả về toàn bộ ngày"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "TODAY() returns the serial integer for the current date. NOW() includes decimal fractions representing current hours, minutes, and seconds.",
        "vi": "TODAY() trả về số nguyên sê-ri cho ngày hiện tại. NOW() bao gồm cả phần thập phân đại diện cho giờ, phút và giây hiện tại."
      },
      "difficulty": "easy",
      "topicId": "excel_dates"
    },
    {
      "id": "excel_l7_q3",
      "type": "single_choice",
      "question": {
        "en": "What does the function `=NETWORKDAYS(A1, B1)` automatically exclude from its calculation?",
        "vi": "Hàm `=NETWORKDAYS(A1, B1)` tự động loại trừ những ngày nào khỏi phép tính của nó?"
      },
      "options": [
        {
          "en": "Saturdays and Sundays (weekends)",
          "vi": "Thứ Bảy và Chủ Nhật (các ngày cuối tuần)"
        },
        {
          "en": "Only Sundays",
          "vi": "Chỉ ngày Chủ Nhật"
        },
        {
          "en": "Mondays and Fridays",
          "vi": "Thứ Hai và Thứ Sáu"
        },
        {
          "en": "All days in December",
          "vi": "Tất cả các ngày trong tháng 12"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "NETWORKDAYS automatically excludes standard weekend days (Saturday and Sunday), plus any optional dates specified in the holiday argument.",
        "vi": "NETWORKDAYS tự động loại trừ các ngày cuối tuần tiêu chuẩn (Thứ Bảy và Chủ Nhật), cộng với bất kỳ ngày nghỉ lễ nào được chỉ định."
      },
      "difficulty": "medium",
      "topicId": "excel_dates"
    },
    {
      "id": "excel_l7_q4",
      "type": "single_choice",
      "question": {
        "en": "What does the function `=EOMONTH(DATE(2026, 2, 10), 0)` return?",
        "vi": "Hàm `=EOMONTH(DATE(2026, 2, 10), 0)` trả về ngày nào?"
      },
      "options": [
        {
          "en": "February 28, 2026",
          "vi": "28/02/2026"
        },
        {
          "en": "February 10, 2026",
          "vi": "10/02/2026"
        },
        {
          "en": "March 31, 2026",
          "vi": "31/03/2026"
        },
        {
          "en": "January 31, 2026",
          "vi": "31/01/2026"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "EOMONTH with offset 0 returns the final day of the same month. 2026 is not a leap year, so February ends on Feb 28.",
        "vi": "EOMONTH với tham số bù 0 trả về ngày cuối cùng của chính tháng đó. Năm 2026 không phải năm nhuận nên tháng 2 kết thúc vào ngày 28/02."
      },
      "difficulty": "medium",
      "topicId": "excel_dates"
    },
    {
      "id": "excel_l7_q5",
      "type": "single_choice",
      "question": {
        "en": "Which keyboard shortcut inserts the current static date into a cell?",
        "vi": "Phím tắt nào chèn ngày tĩnh hiện tại vào một ô?"
      },
      "options": [
        {
          "en": "Ctrl + ; (semi-colon)",
          "vi": "Ctrl + ; (dấu chấm phẩy)"
        },
        {
          "en": "Ctrl + Shift + ;",
          "vi": "Ctrl + Shift + ;"
        },
        {
          "en": "Ctrl + D",
          "vi": "Ctrl + D"
        },
        {
          "en": "Alt + D",
          "vi": "Alt + D"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Ctrl + ; inserts the current date as a static value that does not recalculate.",
        "vi": "Ctrl + ; chèn ngày hiện tại dưới dạng giá trị tĩnh không bị tính toán lại."
      },
      "difficulty": "easy",
      "topicId": "excel_dates"
    },
    {
      "id": "excel_l7_q6",
      "type": "single_choice",
      "question": {
        "en": "Why is `=DATE(2026, 8, 29)` preferred over entering text `\"08/29/2026\"` in formulas?",
        "vi": "Tại sao `=DATE(2026, 8, 29)` lại được ưu tiên hơn việc nhập văn bản `\"08/29/2026\"` trong công thức?"
      },
      "options": [
        {
          "en": "It eliminates ambiguity between US (MM/DD/YYYY) and International (DD/MM/YYYY) date settings",
          "vi": "Nó loại bỏ sự mơ hồ giữa định dạng ngày tháng kiểu Mỹ (MM/DD) và Quốc tế (DD/MM)"
        },
        {
          "en": "It makes the formula run 10x faster",
          "vi": "Nó làm công thức chạy nhanh hơn 10 lần"
        },
        {
          "en": "It locks the cell against editing",
          "vi": "Nó khóa ô ngăn không cho chỉnh sửa"
        },
        {
          "en": "It applies bold styling automatically",
          "vi": "Nó tự động áp dụng kiểu in đậm"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "DATE explicitly provides year, month, and day as numeric arguments, preventing misinterpretation across international computers.",
        "vi": "DATE cung cấp rõ ràng năm, tháng và ngày dưới dạng số, tránh diễn giải sai trên các máy tính có cài đặt quốc tế khác nhau."
      },
      "difficulty": "medium",
      "topicId": "excel_dates"
    },
    {
      "id": "excel_l7_q7",
      "type": "single_choice",
      "question": {
        "en": "What does `=MONTH(DATE(2026, 12, 25))` return?",
        "vi": "Công thức `=MONTH(DATE(2026, 12, 25))` trả về kết quả gì?"
      },
      "options": [
        {
          "en": "12",
          "vi": "12"
        },
        {
          "en": "\"December\"",
          "vi": "\"December\""
        },
        {
          "en": "25",
          "vi": "25"
        },
        {
          "en": "2026",
          "vi": "2026"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "MONTH returns an integer from 1 to 12 representing the month of the date (12 for December).",
        "vi": "MONTH trả về một số nguyên từ 1 đến 12 đại diện cho tháng trong năm (12 cho tháng Mười Hai)."
      },
      "difficulty": "easy",
      "topicId": "excel_dates"
    },
    {
      "id": "excel_l7_q8",
      "type": "true_false",
      "question": {
        "en": "True or False: In Excel, the decimal number `0.5` represents 12:00 PM (noon) in serial time format.",
        "vi": "Đúng hay Sai: Trong Excel, số thập phân `0.5` đại diện cho 12:00 trưa theo định dạng thời gian sê-ri."
      },
      "options": [
        {
          "en": "True",
          "vi": "Đúng"
        },
        {
          "en": "False",
          "vi": "Sai"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "True. 24 hours equals 1.0, so 12 hours (half a day) is stored as 0.5.",
        "vi": "Đúng. 24 giờ tương ứng với 1.0, vì vậy 12 giờ (nửa ngày) được lưu trữ là 0.5."
      },
      "difficulty": "easy",
      "topicId": "excel_dates"
    },
    {
      "id": "excel_l7_q9",
      "type": "single_choice",
      "question": {
        "en": "If a project starts on Monday (Sept 1) and requires 5 working days, what completion date does `=WORKDAY(\"2026-09-01\", 5)` return (assuming no holidays)?",
        "vi": "Nếu dự án bắt đầu vào Thứ Hai (01/09) và cần 5 ngày làm việc, ngày hoàn thành mà `=WORKDAY(\"2026-09-01\", 5)` trả về là ngày nào (không có ngày lễ)?"
      },
      "options": [
        {
          "en": "The following Tuesday (Sept 8)",
          "vi": "Thứ Ba tuần kế tiếp (08/09)"
        },
        {
          "en": "Saturday (Sept 6)",
          "vi": "Thứ Bảy (06/09)"
        },
        {
          "en": "Friday (Sept 5)",
          "vi": "Thứ Sáu (05/09)"
        },
        {
          "en": "Sunday (Sept 7)",
          "vi": "Chủ Nhật (07/09)"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "WORKDAY counts 5 business days: Tue (1), Wed (2), Thu (3), Fri (4), skips weekend (Sat/Sun), and lands on Tue Sept 8 (5th work day after start).",
        "vi": "WORKDAY đếm 5 ngày làm việc: Thứ Ba (1), Thứ Tư (2), Thứ Năm (3), Thứ Sáu (4), bỏ qua Thứ Bảy/Chủ Nhật và đến Thứ Ba 08/09 (ngày làm việc thứ 5 sau khi bắt đầu)."
      },
      "difficulty": "hard",
      "topicId": "excel_dates"
    },
    {
      "id": "excel_l7_q10",
      "type": "single_choice",
      "question": {
        "en": "What function returns the day of the week as an integer (e.g. 1 for Sunday or 2 for Monday)?",
        "vi": "Hàm nào trả về thứ trong tuần dưới dạng số nguyên (ví dụ 1 cho Chủ Nhật hoặc 2 cho Thứ Hai)?"
      },
      "options": [
        {
          "en": "WEEKDAY",
          "vi": "WEEKDAY"
        },
        {
          "en": "DAYNAME",
          "vi": "DAYNAME"
        },
        {
          "en": "DAYS",
          "vi": "DAYS"
        },
        {
          "en": "DOW",
          "vi": "DOW"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "WEEKDAY(serial_number, [return_type]) returns a number from 1 to 7 corresponding to the day of the week.",
        "vi": "WEEKDAY(so_se_ri, [kieu_tra_ve]) trả về một số từ 1 đến 7 tương ứng với thứ trong tuần."
      },
      "difficulty": "easy",
      "topicId": "excel_dates"
    }
  ]
};
export default lesson07;
