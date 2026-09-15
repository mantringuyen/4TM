import { Lesson } from '../../../../types';

export const lesson12: Lesson = {
  id: 'pbi_lesson_12',
  moduleId: 'pbi_mod_4',
  levelId: 'intermediate',
  courseId: 'powerbi',
  order: 12,
  topicId: 'date_table_calendar_design',
  title: {
    en: 'Date Tables, Calendar Design & Mark as Date Table',
    vi: 'Bảng Ngày Tháng, Thiết Kế Lịch & Thiết Lập "Mark as Date Table"'
  },
  summary: {
    en: 'Generate contiguous date tables using CALENDAR/CALENDARAUTO, sort text months chronologically, and configure "Mark as Date Table".',
    vi: 'Tạo bảng ngày liên tục bằng CALENDAR/CALENDARAUTO, sắp xếp tháng chữ theo trình tự thời gian và thiết lập "Mark as Date Table".'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'A dedicated Date table (Dim_Calendar) is an absolute mandatory prerequisite for all Time Intelligence calculations in Power BI. Auto Date/Time creates hidden bloat tables behind every date column. Building an explicit, contiguous Date table and marking it as the official Date Table guarantees accurate period-over-period calculations and compact model memory.',
      vi: 'Một bảng Ngày chuyên dụng (Dim_Calendar) là điều kiện tiên quyết bắt buộc cho mọi phép tính Thời gian (Time Intelligence) trong Power BI. Tính năng tự động "Auto Date/Time" tạo ra các bảng ngày ngầm làm phình to bộ nhớ. Xây dựng một bảng Ngày liên tục tường minh và thiết lập "Mark as Date Table" đảm bảo tính toán tăng trưởng chính xác và tối ưu dung lượng RAM.'
    },
    conceptExplanation: {
      en: 'Date Table Requirements & Best Practices:\n1. Contiguity: Must contain every single calendar day from start date to end date without any gaps or missing days.\n2. Data Type: Must have a primary key column of data type "Date" containing strictly unique values.\n3. Mark as Date Table: Flags the table to the VertiPaq engine as the canonical date reference, allowing automatic removal of hidden auto-date hierarchies.\n4. Chronological Sorting: Month names ("Jan", "Feb", "Mar") sort alphabetically by default. You MUST set their "Sort by Column" to a numeric MonthOfYear (1-12) or YearMonth (202401) column.',
      vi: 'Yêu cầu & Quy chuẩn Bảng Ngày (Date Table):\n1. Tính liên tục (Contiguous): Bắt buộc phải chứa đầy đủ tất cả các ngày từ ngày bắt đầu đến ngày kết thúc, tuyệt đối không được có ngày khuyết thiếu.\n2. Kiểu dữ liệu: Cột khóa chính phải có kiểu "Date" và chứa các giá trị duy nhất (không trùng lặp).\n3. Mark as Date Table: Đánh dấu bảng với VertiPaq là bảng ngày chuẩn, cho phép vô hiệu hóa các bảng ngày ngầm lãng phí bộ nhớ.\n4. Sắp xếp thứ tự tháng (Sort by Column): Tên tháng ("Jan", "Feb", "Tháng 1") mặc định bị xếp theo bảng chữ cái A-Z. Bắt buộc phải gán "Sort by Column" theo cột số nguyên MonthOfYear (1-12) hoặc YearMonth (202401).'
    },
    syntax: '// 1. Generating Date Table with CALENDAR in DAX:\nDim_Calendar = \nVAR MinYear = 2020\nVAR MaxYear = 2026\nRETURN\nADDCOLUMNS(\n    CALENDAR(DATE(MinYear, 1, 1), DATE(MaxYear, 12, 31)),\n    "Year", YEAR([Date]),\n    "Quarter", "Q" & FORMAT([Date], "Q"),\n    "MonthNum", MONTH([Date]),\n    "MonthName", FORMAT([Date], "mmm"),\n    "YearMonth", YEAR([Date]) * 100 + MONTH([Date]),\n    "DayOfWeek", FORMAT([Date], "dddd")\n)',
    examples: [
      {
        title: {
          en: 'CALENDARAUTO vs CALENDAR',
          vi: 'So Sánh CALENDARAUTO Và CALENDAR'
        },
        code: `// CALENDARAUTO automatically scans all datetime columns in the model:
Dim_Calendar_Auto = 
ADDCOLUMNS(
    CALENDARAUTO(12), // 12 represents fiscal year ending in December
    "Year", YEAR([Date]),
    "Month", FORMAT([Date], "mmmm"),
    "MonthKey", MONTH([Date])
)`,
        language: 'dax',
        explanation: {
          en: 'CALENDARAUTO scans all date columns in the model to find minimum and maximum years automatically.',
          vi: 'CALENDARAUTO tự động quét toàn bộ các cột ngày trong mô hình để xác định năm bắt đầu và kết thúc tự động.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Leaving the global "Auto Date/Time" setting enabled in Power BI Options.',
          vi: 'Để tùy chọn "Auto Date/Time" tự động bật trong cài đặt Power BI Options.'
        },
        correction: {
          en: 'Disable Auto Date/Time in File > Options > Current File > Data Load. It generates a hidden internal date table for every single date column, causing massive file bloat.',
          vi: 'Tắt tính năng Auto Date/Time trong File > Options > Data Load. Tính năng này tạo bảng ngày ngầm cho từng cột ngày, làm tệp .pbix phình to gấp nhiều lần.'
        }
      },
      {
        mistake: {
          en: 'Forgetting to set "Sort by Column" on MonthName, resulting in months sorting alphabetically (April, August, December...).',
          vi: 'Quên thiết lập "Sort by Column" cho cột Tháng, khiến tên tháng bị xếp theo thứ tự bảng chữ cái (August, December, February...).'
        },
        correction: {
          en: 'Select the MonthName column in Column Tools, click "Sort by Column", and choose MonthNum (1 to 12).',
          vi: 'Chọn cột MonthName trong Column Tools, bấm "Sort by Column" và chọn cột số thứ tự tháng MonthNum (1 đến 12).'
        }
      }
    ],
    tips: [
      {
        en: 'Right-click your calendar table in the Data pane and select "Mark as date table", then designate the [Date] column.',
        vi: 'Nhấp chuột phải vào bảng lịch trong bảng Data, chọn "Mark as date table" và chọn cột [Date] làm khóa ngày chuẩn.'
      },
      {
        en: 'Include a numeric YearMonth column (e.g. 202401, 202402) for sorting combined "Jan 2024" month-year labels across multiple years.',
        vi: 'Tạo cột số YearMonth (như 202401, 202402) để sắp xếp đúng các nhãn hiển thị dạng "Jan 2024" qua nhiều năm.'
      }
    ],
    practiceStarterCode: `// Generate continuous DAX Calendar table
Dim_Calendar = CALENDAR(DATE(2022, 1, 1), DATE(2025, 12, 31))`
  },
  exercisePool: [
    {
      id: 'pbi_ex_12_1',
      type: 'predict_output',
      title: {
        en: 'Identify Date Table Contiguity Rule',
        vi: 'Quy Tắc Tính Liên Tục Của Bảng Ngày'
      },
      instruction: {
        en: 'If a company was closed on Sundays and those dates are missing from the Date table, will Time Intelligence functions (like TOTALYTD) work correctly?',
        vi: 'Nếu công ty nghỉ chủ nhật và các ngày chủ nhật bị thiếu trong bảng Ngày, các hàm Time Intelligence (như TOTALYTD) có tính đúng không?'
      },
      starterCode: '// Will Time Intelligence work with missing dates?',
      solutionCode: 'No, Time Intelligence requires a contiguous, unbroken range of daily dates with zero gaps.',
      options: [
        'No, Time Intelligence requires a contiguous, unbroken range of daily dates with zero gaps.',
        'Yes, Power BI automatically skips missing Sundays.',
        'Yes, but only in Matrix visuals.',
        'Sundays are never included in calendars.'
      ],
      correctOptionIndex: 0,
      explanation: {
        en: 'All DAX Time Intelligence algorithms require an unbroken sequence of daily dates across the entire period.',
        vi: 'Mọi thuật toán Time Intelligence trong DAX bắt buộc phải có chuỗi ngày liên tục từng ngày một không có khoảng trống.'
      }
    },
    {
      id: 'pbi_ex_12_2',
      type: 'complete_code',
      title: {
        en: 'Sort Month Name by Month Number',
        vi: 'Sắp Xếp Tên Tháng Theo Thứ Tự Số'
      },
      instruction: {
        en: 'Complete the YearMonth calculation: YEAR([Date]) * 100 + MONTH([Date]).',
        vi: 'Hoàn thiện công thức tính cột số YearMonth: YEAR([Date]) * 100 + MONTH([Date]).'
      },
      starterCode: 'YearMonth = YEAR([Date]) * 100 + __([Date])',
      solutionCode: 'YearMonth = YEAR([Date]) * 100 + MONTH([Date])',
      hint: {
        en: 'MONTH',
        vi: 'MONTH'
      },
      explanation: {
        en: 'YEAR * 100 + MONTH produces integer sort keys like 202401, 202402 for proper chronological ordering.',
        vi: 'YEAR * 100 + MONTH tạo ra mã số nguyên như 202401, 202402 giúp sắp xếp trình tự thời gian chuẩn xác.'
      }
    }
  ],
  challenge: {
    id: 'pbi_ch_12',
    title: {
      en: 'Generate Production-Grade Calendar Table',
      vi: 'Tạo Bảng Lịch Doanh Nghiệp Chuẩn Hóa Bằng DAX'
    },
    description: {
      en: 'Write the complete DAX formula to generate a rich Dim_Calendar table covering 2022 to 2026 with Month, Quarter, and YearMonth attributes.',
      vi: 'Viết công thức DAX hoàn chỉnh để tạo bảng Dim_Calendar phong phú từ 2022 đến 2026 kèm các trường Tháng, Quý và YearMonth.'
    },
    requirements: [
      { en: '1. Date range: 2022-01-01 to 2026-12-31 using CALENDAR', vi: '1. Khoảng ngày: 2022-01-01 đến 2026-12-31 dùng hàm CALENDAR' },
      { en: '2. Year = YEAR([Date])', vi: '2. Year = YEAR([Date])' },
      { en: '3. MonthName = FORMAT([Date], "mmm")', vi: '3. MonthName = FORMAT([Date], "mmm")' },
      { en: '4. MonthNum = MONTH([Date])', vi: '4. MonthNum = MONTH([Date])' },
      { en: '5. YearMonth = YEAR([Date]) * 100 + MONTH([Date])', vi: '5. YearMonth = YEAR([Date]) * 100 + MONTH([Date])' }
    ],
    starterCode: `Dim_Calendar = 
ADDCOLUMNS(
    CALENDAR(DATE(2022, 1, 1), DATE(2026, 12, 31)),
    "Year", YEAR([Date]),
    "MonthName", FORMAT([Date], "mmm"),
    "MonthNum", MONTH([Date]),
    "YearMonth", YEAR([Date]) * 100 + MONTH([Date])
)`,
    solutionCode: `Dim_Calendar = 
ADDCOLUMNS(
    CALENDAR(DATE(2022, 1, 1), DATE(2026, 12, 31)),
    "Year", YEAR([Date]),
    "MonthName", FORMAT([Date], "mmm"),
    "MonthNum", MONTH([Date]),
    "YearMonth", YEAR([Date]) * 100 + MONTH([Date])
)`,
    hints: [
      {
        en: 'Use ADDCOLUMNS to wrap the base CALENDAR function with rich analytical date properties.',
        vi: 'Dùng ADDCOLUMNS để bọc hàm CALENDAR cơ sở và bổ sung các trường thuộc tính phân tích thời gian phong phú.'
      }
    ],
    solutionExplanation: {
      en: 'This canonical Date table provides the bedrock for all YTD, MTD, YoY, and period-over-period time intelligence formulas.',
      vi: 'Bảng Ngày chuẩn mực này là nền tảng vững chắc cho mọi công thức Time Intelligence như YTD, MTD, YoY và so sánh cùng kỳ.'
    }
  },
  quizQuestionPool: [
    {
      id: 'pbi_q_12_1',
      type: 'single_choice',
      question: {
        en: 'What is a mandatory requirement for a table to be designated as an official Date Table in Power BI?',
        vi: 'Yêu cầu bắt buộc nào phải có để một bảng được công nhận là Date Table chính thức trong Power BI?'
      },
      options: [
        {
          en: 'It must contain at least one column of data type Date with unique, contiguous (unbroken) daily values spanning full years',
          vi: 'Bắt buộc phải có ít nhất một cột kiểu Date chứa các giá trị ngày liên tục không bị gián đoạn và không trùng lặp qua các năm'
        },
        {
          en: 'It must have fewer than 100 rows',
          vi: 'Bắt buộc phải có ít hơn 100 dòng'
        },
        {
          en: 'It must be imported from a CSV file only',
          vi: 'Chỉ được phép nhập từ tệp CSV'
        },
        {
          en: 'It must be connected with bidirectional filters to all tables',
          vi: 'Phải kết nối lọc 2 chiều với tất cả các bảng'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Official Date tables require an unbroken sequence of daily dates with no duplicates and data type Date.',
        vi: 'Bảng Ngày chính thức bắt buộc phải có chuỗi ngày liên tục từng ngày một, không trùng lặp và có kiểu dữ liệu Date.'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_12_2',
      type: 'single_choice',
      question: {
        en: 'Why should you turn OFF the global "Auto Date/Time" feature in Power BI settings when building professional models?',
        vi: 'Vì sao bạn nên TẮT tính năng tự động "Auto Date/Time" trong cài đặt Power BI khi xây dựng mô hình chuyên nghiệp?'
      },
      options: [
        {
          en: 'Auto Date/Time generates hidden background tables for every single date column, significantly inflating model size and RAM consumption',
          vi: 'Auto Date/Time tạo các bảng ngày ngầm trong nền cho từng cột ngày, làm phình to dung lượng tệp và lãng phí bộ nhớ RAM'
        },
        {
          en: 'Auto Date/Time deletes the sales table',
          vi: 'Auto Date/Time xóa bảng sales'
        },
        {
          en: 'Auto Date/Time forces the report into monochromatic grayscale',
          vi: 'Auto Date/Time ép báo cáo thành màu đen trắng'
        },
        {
          en: 'Auto Date/Time disables all mouse clicks',
          vi: 'Auto Date/Time vô hiệu hóa thao tác chuột'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Disabling Auto Date/Time eliminates hidden internal hierarchy tables, keeping models lean and performance optimized.',
        vi: 'Tắt Auto Date/Time giúp loại bỏ hàng loạt bảng ngày ẩn trong nền, giữ cho mô hình dữ liệu luôn gọn nhẹ và tối ưu tốc độ.'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_12_3',
      type: 'single_choice',
      question: {
        en: 'How do you fix Month names (January, February, March) that appear in alphabetical order (April, August, December...) in a chart?',
        vi: 'Làm thế nào để khắc phục lỗi tên tháng bị xếp theo thứ tự bảng chữ cái (April, August, December...) trên biểu đồ?'
      },
      options: [
        {
          en: 'Select the MonthName column -> Column Tools ribbon -> Click "Sort by Column" -> Select the numeric MonthNum (1-12) column',
          vi: 'Chọn cột MonthName -> Thẻ Column Tools -> Bấm "Sort by Column" -> Chọn cột số thứ tự tháng MonthNum (1-12)'
        },
        {
          en: 'Rename January to 1January',
          vi: 'Đổi tên January thành 1January'
        },
        {
          en: 'Delete the chart and recreate it',
          vi: 'Xóa biểu đồ và tạo lại'
        },
        {
          en: 'Switch language to Spanish',
          vi: 'Đổi ngôn ngữ sang tiếng Tây Ban Nha'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: '"Sort by Column" instructs Power BI to sort the text descriptions by the underlying chronological numeric key.',
        vi: '"Sort by Column" hướng dẫn Power BI sắp xếp các nhãn văn bản theo giá trị cột số thứ tự thời gian tương ứng.'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_12_4',
      type: 'true_false',
      question: {
        en: 'The CALENDARAUTO() function scans all date columns across your model to automatically determine the minimum and maximum calendar dates.',
        vi: 'Hàm CALENDARAUTO() tự động quét tất cả các cột ngày trong toàn bộ mô hình để xác định ngày bắt đầu và ngày kết thúc.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'True. CALENDARAUTO() scans model date fields and generates a contiguous calendar covering full fiscal/calendar years.',
        vi: 'Đúng. CALENDARAUTO() quét các trường ngày trong mô hình và tạo ra chuỗi ngày liên tục bao trọn các năm tài chính/dương lịch.'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_12_5',
      type: 'single_choice',
      question: {
        en: 'What is the purpose of explicitly setting "Mark as Date Table" on your Calendar table?',
        vi: 'Mục đích của việc thiết lập "Mark as Date Table" trên bảng Lịch của bạn là gì?'
      },
      options: [
        {
          en: 'It designates the table as the primary date reference for DAX time intelligence functions and optimizes internal filter transitions',
          vi: 'Xác định bảng này là tham chiếu ngày chuẩn cho các hàm Time Intelligence trong DAX và tối ưu hóa chuyển đổi bộ lọc ngày'
        },
        {
          en: 'It locks the report so users cannot edit it',
          vi: 'Khóa báo cáo để người dùng không chỉnh sửa được'
        },
        {
          en: 'It automatically sends daily emails to management',
          vi: 'Tự động gửi email hàng ngày cho ban giám đốc'
        },
        {
          en: 'It converts the calendar into an Excel add-in',
          vi: 'Chuyển đổi lịch thành tiện ích Excel'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Mark as Date Table ensures DAX Time Intelligence functions properly recognize the table and handles filter context correctly.',
        vi: 'Mark as Date Table đảm bảo các hàm DAX Time Intelligence nhận diện chuẩn xác bảng ngày và xử lý ngữ cảnh lọc đúng đắn.'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'medium'
    },
    {
      id: 'pbi_q_12_6',
      type: 'predict_output',
      question: {
        en: 'What does FORMAT(DATE(2024, 7, 15), "mmmm yyyy") return?',
        vi: 'Hàm FORMAT(DATE(2024, 7, 15), "mmmm yyyy") trả về kết quả gì?'
      },
      options: [
        { en: '"July 2024"', vi: '"July 2024"' },
        { en: '"07/15/2024"', vi: '"07/15/2024"' },
        { en: '"2024-07"', vi: '"2024-07"' },
        { en: '"Q3 2024"', vi: '"Q3 2024"' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '"mmmm" formats the full English month name (July) and "yyyy" outputs the 4-digit year (2024).',
        vi: '"mmmm" định dạng tên tháng đầy đủ (July) và "yyyy" trả về năm 4 chữ số (2024).'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_12_7',
      type: 'multiple_choice',
      question: {
        en: 'Which of the following columns are standard best practice attributes to include in a Dim_Calendar table? (Select all that apply)',
        vi: 'Những cột nào sau đây là các trường thuộc tính chuẩn nên có trong một bảng Dim_Calendar? (Chọn tất cả đáp án đúng)'
      },
      options: [
        { en: 'Date (PK, Unique)', vi: 'Date (Khóa chính, Duy nhất)' },
        { en: 'Year (Integer)', vi: 'Year (Năm dạng số nguyên)' },
        { en: 'MonthName & MonthNumber', vi: 'MonthName (Tên tháng) & MonthNumber (Số tháng)' },
        { en: 'Quarter & YearQuarter', vi: 'Quarter (Quý) & YearQuarter (Năm Quý)' }
      ],
      correctAnswers: [0, 1, 2, 3],
      explanation: {
        en: 'A comprehensive calendar table includes Date, Year, Quarter, MonthName, MonthNum, WeekNum, and DayOfWeek attributes.',
        vi: 'Một bảng lịch toàn diện bao gồm các trường Date, Year, Quarter, MonthName, MonthNum, WeekNum và DayOfWeek.'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_12_8',
      type: 'true_false',
      question: {
        en: 'A Date table can have duplicate dates if there were multiple sales on that day.',
        vi: 'Một Date table có thể chứa các ngày trùng lặp nếu trong ngày đó có nhiều đơn hàng phát sinh.'
      },
      options: [
        { en: 'True', vi: 'Đúng' },
        { en: 'False', vi: 'Sai' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'False. The Date table is a Dimension table (1-side), meaning the Date primary key column must contain strictly unique values with zero duplicates.',
        vi: 'Sai. Bảng Date là bảng Dimension (phía 1), nghĩa là cột khóa chính Date bắt buộc phải có giá trị duy nhất tuyệt đối không trùng lặp.'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_12_9',
      type: 'single_choice',
      question: {
        en: 'What DAX function generates a single-column table containing a contiguous sequence of dates between a specified start date and end date?',
        vi: 'Hàm DAX nào tạo ra một bảng gồm 1 cột duy nhất chứa chuỗi ngày liên tục giữa ngày bắt đầu và ngày kết thúc chỉ định?'
      },
      options: [
        { en: 'CALENDAR()', vi: 'CALENDAR()' },
        { en: 'DATERANGE()', vi: 'DATERANGE()' },
        { en: 'DATESBETWEEN()', vi: 'DATESBETWEEN()' },
        { en: 'CREATE_TIMELINE()', vi: 'CREATE_TIMELINE()' }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'CALENDAR(StartDate, EndDate) generates a single-column table named [Date] containing all daily dates in that interval.',
        vi: 'CALENDAR(StartDate, EndDate) tạo một bảng 1 cột có tên là [Date] chứa tất cả các ngày liên tục trong khoảng thời gian đó.'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'easy'
    },
    {
      id: 'pbi_q_12_10',
      type: 'single_choice',
      question: {
        en: 'Why is YearMonth = YEAR([Date]) * 100 + MONTH([Date]) preferred as an integer sort column over string representations like "2024-01"?',
        vi: 'Vì sao YearMonth = YEAR([Date]) * 100 + MONTH([Date]) dạng số nguyên được ưa chuộng làm cột sắp xếp hơn dạng chuỗi như "2024-01"?'
      },
      options: [
        {
          en: 'Integers compress significantly better in the VertiPaq engine and provide instant numeric sorting without string comparison overhead',
          vi: 'Số nguyên được nén tối ưu hơn nhiều trong VertiPaq và sắp xếp trực tiếp bằng toán học mà không tốn chi phí so khớp chuỗi'
        },
        {
          en: 'String columns cannot be displayed in Power BI',
          vi: 'Cột dạng chuỗi không thể hiển thị trong Power BI'
        },
        {
          en: 'Integers make report charts load in 3D',
          vi: 'Số nguyên giúp biểu đồ chuyển sang dạng 3D'
        },
        {
          en: 'DAX does not support text formats',
          vi: 'DAX không hỗ trợ định dạng văn bản'
        }
      ],
      correctAnswers: [0],
      explanation: {
        en: 'Integer keys (e.g. 202401, 202412) optimize columnar memory encoding and speed up chronological sort operations.',
        vi: 'Khóa số nguyên (như 202401, 202412) tối ưu hóa việc nén bộ nhớ cột và tăng tốc thao tác sắp xếp theo thời gian.'
      },
      topicId: 'date_table_calendar_design',
      difficulty: 'medium'
    }
  ]
};

export default lesson12;
