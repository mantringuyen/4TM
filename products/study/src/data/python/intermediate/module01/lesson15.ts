import { Lesson } from '../../../../types';

export const lesson15: Lesson = {
  id: 'py_lesson_15',
  moduleId: 'py_mod_6',
  levelId: 'intermediate',
  courseId: 'python',
  order: 15,
  topicId: 'python_datetime_zoneinfo',
  title: {
    en: 'Date & Time Handling: datetime, timedelta, timezone & zoneinfo',
    vi: 'Xử Lý Thời Gian: datetime, timedelta, timezone & zoneinfo (Naive vs Aware)'
  },
  summary: {
    en: 'Master comprehensive temporal programming in Python: parsing and formatting with strftime/strptime, arithmetic with timedelta, ISO 8601 parsing, and timezone-aware computations using standard zoneinfo (IANA timezones).',
    vi: 'Làm chủ xử lý thời gian toàn diện trong Python: phân tích & định dạng với strftime/strptime, tính toán khoảng thời gian bằng timedelta, chuẩn ISO 8601, và múi giờ nhận biết (timezone-aware) với zoneinfo chuẩn IANA.'
  },
  estimatedMinutes: 15,
  learn: {
    introduction: {
      en: 'Modern applications handle users, servers, and data across multiple geographic regions. Python’s `datetime` module paired with `zoneinfo` (introduced in Python 3.9) provides a robust standard library foundation for working with timestamps, offsets, daylight saving time (DST), and timezone conversions.',
      vi: 'Các ứng dụng hiện đại cần xử lý dữ liệu và người dùng trên nhiều khu vực địa lý khác nhau. Thư viện `datetime` kết hợp với `zoneinfo` (từ Python 3.9) cung cấp nền tảng chuẩn để xử lý timestamp, chênh lệch múi giờ, quy ước giờ mùa hè (DST) và chuyển đổi múi giờ an toàn.'
    },
    conceptExplanation: {
      en: '1. Core Datetime Classes:\n- `date(year, month, day)`: Calendar date without time.\n- `time(hour, minute, second, microsecond, tzinfo)`: Clock time independent of date.\n- `datetime(year, month, day, hour, minute, second, tzinfo)`: Complete combined timestamp.\n- `timedelta(days=0, seconds=0, hours=0, ...)`: Duration representing the difference between two datetime objects.\n\n2. Naive vs Timezone-Aware Datetimes:\n- **Naive**: Contains no `tzinfo` (ambiguous; cannot safely be compared across servers or converted across regions).\n- **Aware**: Contains an explicit `tzinfo` (e.g. `timezone.utc` or `ZoneInfo("Asia/Ho_Chi_Minh")`).\n- Best practice: Always store and transmit timestamps in **UTC aware** (`datetime.now(timezone.utc)` or ISO 8601 format).\n\n3. String Parsing & Formatting:\n- `dt.strftime(format_str)`: Formats datetime to string (`%Y-%m-%d %H:%M:%S`).\n- `datetime.strptime(date_str, format_str)`: Parses a custom-formatted string into a datetime.\n- `datetime.fromisoformat(iso_str)`: Fast standard ISO 8601 parser.\n- `dt.isoformat()`: Outputs standardized ISO 8601 string representation.\n\n4. Modern Timezones with `zoneinfo` (Python 3.9+):\n- `from zoneinfo import ZoneInfo`\n- `dt_local = dt_utc.astimezone(ZoneInfo("Asia/Ho_Chi_Minh"))`\n- Seamlessly handles Daylight Saving Time transitions using the IANA system database.',
      vi: '1. Các Lớp Datetime Cốt Lõi:\n- `date(year, month, day)`: Ngày dương lịch (không có giờ).\n- `time(hour, minute, second, microsecond, tzinfo)`: Giờ đồng hồ (độc lập với ngày).\n- `datetime(year, month, day, hour, minute, second, tzinfo)`: Thời điểm kết hợp đầy đủ.\n- `timedelta(days=0, seconds=0, hours=0, ...)`: Khoảng thời gian biểu diễn độ chênh lệch giữa hai thời điểm.\n\n2. Phân Biệt Naive vs Timezone-Aware:\n- **Naive**: Không có `tzinfo` (dễ gây lỗi mơ hồ khi chạy trên các máy chủ khác múi giờ).\n- **Aware**: Có `tzinfo` rõ ràng (vd: `timezone.utc` hoặc `ZoneInfo("Asia/Ho_Chi_Minh")`).\n- Thực hành chuẩn: Luôn lưu trữ và trao đổi dữ liệu dưới dạng **UTC Aware** (`datetime.now(timezone.utc)` hoặc chuẩn ISO 8601).\n\n3. Định Dạng & Phân Tích Chuỗi:\n- `dt.strftime(format_str)`: Chuyển datetime thành chuỗi theo định dạng (`%Y-%m-%d %H:%M:%S`).\n- `datetime.strptime(date_str, format_str)`: Đọc chuỗi thời gian tùy chỉnh thành datetime.\n- `datetime.fromisoformat(iso_str)`: Phân tích nhanh chuỗi chuẩn ISO 8601.\n- `dt.isoformat()`: Xuất chuỗi thời gian chuẩn ISO 8601.\n\n4. Múi Giờ Hiện Đại Với `zoneinfo` (Python 3.9+):\n- `from zoneinfo import ZoneInfo`\n- `dt_local = dt_utc.astimezone(ZoneInfo("Asia/Ho_Chi_Minh"))`\n- Tự động xử lý giờ mùa hè (DST) chính xác dựa trên cơ sở dữ liệu múi giờ IANA.'
    },
    syntax: `from datetime import datetime, date, timedelta, timezone
from zoneinfo import ZoneInfo

# 1. Aware UTC timestamp
now_utc = datetime.now(timezone.utc)
iso_str = now_utc.isoformat()

# 2. Timezone conversion with zoneinfo
hcm_tz = ZoneInfo("Asia/Ho_Chi_Minh")
now_hcm = now_utc.astimezone(hcm_tz)
formatted = now_hcm.strftime("%d/%m/%Y %H:%M:%S %Z")

# 3. Arithmetic with timedelta
future_deadline = now_utc + timedelta(days=7, hours=12)
elapsed = future_deadline - now_utc  # timedelta object

# 4. Parsing custom and ISO strings
parsed_custom = datetime.strptime("2026-10-15 08:30:00", "%Y-%m-%d %H:%M:%S")
parsed_iso = datetime.fromisoformat("2026-10-15T08:30:00+07:00")`,
    examples: [
      {
        title: {
          en: 'Subscription Expiration & Timezone Display Engine',
          vi: 'Hệ Thống Tính Hạn Đăng Ký & Hiển Thị Đa Múi Giờ'
        },
        code: `from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

def calculate_subscription_plan(start_iso: str, duration_days: int, user_tz_name: str) -> dict:
    # Parse ISO start time (UTC)
    start_utc = datetime.fromisoformat(start_iso)
    expiry_utc = start_utc + timedelta(days=duration_days)
    
    # Convert to user local timezone for display
    user_tz = ZoneInfo(user_tz_name)
    expiry_local = expiry_utc.astimezone(user_tz)
    
    days_remaining = (expiry_utc - datetime.now(timezone.utc)).total_seconds() / 86400
    
    return {
        "expiry_iso_utc": expiry_utc.isoformat(),
        "display_local": expiry_local.strftime("%Y-%m-%d %H:%M:%S %Z"),
        "is_active": days_remaining > 0,
        "days_left": round(days_remaining, 1)
    }

sub = calculate_subscription_plan("2026-08-01T00:00:00+00:00", 30, "Asia/Ho_Chi_Minh")
print(sub)`,
        language: 'python',
        explanation: {
          en: 'Stores everything in UTC while providing local formatted output for the user region using ZoneInfo.',
          vi: 'Lưu trữ toàn bộ thời gian theo chuẩn UTC và chuyển đổi sang múi giờ địa phương bằng ZoneInfo khi hiển thị cho người dùng.'
        }
      }
    ],
    commonMistakes: [
      {
        mistake: {
          en: 'Using `datetime.now()` without a timezone (returns a naive timestamp tied to local server clock).',
          vi: 'Dùng `datetime.now()` không truyền timezone (tạo ra đối tượng naive phụ thuộc vào giờ máy chủ).'
        },
        correction: {
          en: 'Always create aware timestamps with `datetime.now(timezone.utc)`.',
          vi: 'Luôn tạo thời gian timezone-aware với `datetime.now(timezone.utc)`.'
        },
        code: `# Naive:\n# dt = datetime.now()\n# Aware:\ndt = datetime.now(timezone.utc)`
      },
      {
        mistake: {
          en: 'Subtracting a naive datetime from an aware datetime (raises TypeError: can\'t subtract offset-naive and offset-aware datetimes).',
          vi: 'Lấy datetime có múi giờ (aware) trừ đi datetime không có múi giờ (naive) gây lỗi TypeError.'
        },
        correction: {
          en: 'Ensure both datetime objects are timezone-aware before computing differences or comparisons.',
          vi: 'Đảm bảo cả hai đối tượng datetime đều là timezone-aware trước khi so sánh hoặc trừ nhau.'
        },
        code: `dt_aware = datetime.now(timezone.utc)\ndt_naive = datetime(2026, 1, 1)\n# Fix by attaching timezone:\ndt_fixed = dt_naive.replace(tzinfo=timezone.utc)\ndiff = dt_aware - dt_fixed`
      }
    ],
    tips: [
      {
        en: 'Use `timedelta.total_seconds()` instead of `timedelta.seconds` when you need the complete duration including days.',
        vi: 'Dùng `timedelta.total_seconds()` thay vì `timedelta.seconds` để lấy toàn bộ tổng số giây bao gồm cả số ngày.'
      },
      {
        en: '`zoneinfo` is part of standard Python 3.9+. In environments without system tzdata (e.g. Windows), install `pip install tzdata`.',
        vi: '`zoneinfo` thuộc thư viện chuẩn từ Python 3.9+. Trên Windows nếu thiếu dữ liệu múi giờ IANA, cài thêm gói `pip install tzdata`.'
      }
    ]
  },
  exercisePool: [
    {
      id: 'py_15_ex1',
      type: 'write_code',
      title: {
        en: 'Exercise 1: Date Arithmetic & Expiry Calculator',
        vi: 'Bài tập 1: Tính Toán Ngày Hết Hạn Với timedelta'
      },
      instruction: {
        en: 'Write `get_expiry_date(start_date_str: str, days: int) -> str` that parses `start_date_str` in `"YYYY-MM-DD"` format, adds `days`, and returns the new date formatted as `"DD/MM/YYYY"`.',
        vi: 'Viết hàm `get_expiry_date(start_date_str: str, days: int) -> str` nhận vào chuỗi ngày định dạng `"YYYY-MM-DD"`, cộng thêm `days` ngày và trả về chuỗi ngày mới theo định dạng `"DD/MM/YYYY"`.'
      },
      starterCode: `from datetime import datetime, timedelta

def get_expiry_date(start_date_str: str, days: int) -> str:
    # TODO: Parse, add timedelta, and format
    pass`,
      solutionCode: `from datetime import datetime, timedelta

def get_expiry_date(start_date_str: str, days: int) -> str:
    start_dt = datetime.strptime(start_date_str, "%Y-%m-%d")
    expiry_dt = start_dt + timedelta(days=days)
    return expiry_dt.strftime("%d/%m/%Y")`,
      hint: {
        en: 'Use `datetime.strptime(start_date_str, "%Y-%m-%d")`, add `timedelta(days=days)`, and format with `.strftime("%d/%m/%Y")`.',
        vi: 'Dùng `datetime.strptime(start_date_str, "%Y-%m-%d")`, cộng `timedelta(days=days)`, và định dạng với `.strftime("%d/%m/%Y")`.'
      },
      explanation: {
        en: '`timedelta` handles month rollovers and leap years automatically.',
        vi: '`timedelta` tự động tính chuyển tháng và năm nhuận chính xác.'
      }
    },
    {
      id: 'py_15_ex2',
      type: 'write_code',
      title: {
        en: 'Exercise 2: Timezone Converter to Target Zone',
        vi: 'Bài tập 2: Chuyển Đổi Múi Giờ Sang Khu Vực Đích'
      },
      instruction: {
        en: 'Write `convert_utc_to_zone(iso_utc_str: str, target_tz_name: str) -> str` that parses an ISO 8601 UTC string, converts it to `target_tz_name` using `ZoneInfo`, and returns `"YYYY-MM-DD HH:MM:SS"`.',
        vi: 'Viết hàm `convert_utc_to_zone(iso_utc_str: str, target_tz_name: str) -> str` nhận vào chuỗi ISO 8601 UTC, chuyển sang múi giờ `target_tz_name` bằng `ZoneInfo`, và trả về định dạng `"YYYY-MM-DD HH:MM:SS"`.'
      },
      starterCode: `from datetime import datetime
from zoneinfo import ZoneInfo

def convert_utc_to_zone(iso_utc_str: str, target_tz_name: str) -> str:
    # TODO: Parse ISO, convert with astimezone, and format
    pass`,
      solutionCode: `from datetime import datetime
from zoneinfo import ZoneInfo

def convert_utc_to_zone(iso_utc_str: str, target_tz_name: str) -> str:
    dt_utc = datetime.fromisoformat(iso_utc_str)
    target_tz = ZoneInfo(target_tz_name)
    dt_converted = dt_utc.astimezone(target_tz)
    return dt_converted.strftime("%Y-%m-%d %H:%M:%S")`,
      hint: {
        en: 'Use `datetime.fromisoformat()` and call `.astimezone(ZoneInfo(target_tz_name))`.',
        vi: 'Dùng `datetime.fromisoformat()` và gọi `.astimezone(ZoneInfo(target_tz_name))`.'
      },
      explanation: {
        en: '`.astimezone()` recalibrates hour and offset while keeping the underlying instant in time identical.',
        vi: '`.astimezone()` điều chỉnh giờ và độ lệch múi giờ trong khi vẫn bảo toàn thời khắc thực tế.'
      }
    }
  ],
  challenge: {
    id: 'py_15_challenge',
    title: {
      en: 'Multi-Region SLA Uptime & Event Window Evaluator',
      vi: 'Bộ Đánh Giá Cửa Sổ Sự Kiện & SLA Đa Khu Vực'
    },
    description: {
      en: 'Implement `is_within_maintenance_window(event_iso_utc: str, window_start_local_hour: int, window_end_local_hour: int, server_tz_name: str) -> bool` that verifies if an incoming UTC event occurred during the server\'s local maintenance window (`window_start_local_hour <= hour < window_end_local_hour`).',
      vi: 'Xây dựng hàm `is_within_maintenance_window(event_iso_utc: str, window_start_local_hour: int, window_end_local_hour: int, server_tz_name: str) -> bool` kiểm tra xem một sự kiện theo giờ UTC có rơi vào khung bảo trì giờ địa phương của máy chủ hay không (`window_start_local_hour <= hour < window_end_local_hour`).'
    },
    requirements: [
      {
        en: 'Parse ISO 8601 string to timezone-aware UTC datetime',
        vi: 'Phân tích chuỗi ISO 8601 thành datetime UTC timezone-aware'
      },
      {
        en: 'Convert datetime to target server timezone using ZoneInfo',
        vi: 'Chuyển đổi datetime sang múi giờ máy chủ bằng ZoneInfo'
      },
      {
        en: 'Verify if converted hour falls inside maintenance window bounds',
        vi: 'Kiểm tra xem giờ sau chuyển đổi có nằm trong khoảng khung giờ bảo trì không'
      }
    ],
    starterCode: `from datetime import datetime
from zoneinfo import ZoneInfo

def is_within_maintenance_window(event_iso_utc: str, window_start_local_hour: int, window_end_local_hour: int, server_tz_name: str) -> bool:
    # TODO: Convert event to server timezone and check hour range
    pass`,
    solutionCode: `from datetime import datetime
from zoneinfo import ZoneInfo

def is_within_maintenance_window(event_iso_utc: str, window_start_local_hour: int, window_end_local_hour: int, server_tz_name: str) -> bool:
    dt_utc = datetime.fromisoformat(event_iso_utc)
    server_tz = ZoneInfo(server_tz_name)
    local_dt = dt_utc.astimezone(server_tz)
    return window_start_local_hour <= local_dt.hour < window_end_local_hour`,
    hints: [
      {
        en: 'Use dt.astimezone(ZoneInfo(server_tz_name)) to convert timestamps accurately across DST boundaries.',
        vi: 'Dùng dt.astimezone(ZoneInfo(server_tz_name)) để chuyển đổi múi giờ chính xác vượt qua ranh giới DST.'
      }
    ],
    solutionExplanation: {
      en: 'Handles distributed timestamps cleanly without naive datetime bugs.',
      vi: 'Xử lý mốc thời gian phân tán chuẩn xác tránh hoàn toàn lỗi naive datetime.'
    }
  },
  quizQuestionPool: [
    {
      id: 'py_15_q1',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'easy',
      question: {
        en: 'What is the key difference between a "naive" and a "timezone-aware" datetime in Python?',
        vi: 'Điểm khác biệt cốt lõi giữa datetime "naive" và "timezone-aware" trong Python là gì?'
      },
      options: [
        { en: 'Naive datetimes only store dates without hours', vi: 'Naive chỉ lưu ngày mà không có giờ' },
        { en: 'Aware datetimes possess an attached `tzinfo` object defining their timezone/offset, whereas naive datetimes do not', vi: 'Aware có chứa đối tượng `tzinfo` xác định múi giờ/độ lệch, còn naive thì không' },
        { en: 'Naive datetimes cannot be formatted to strings', vi: 'Naive không thể chuyển thành chuỗi' },
        { en: 'Aware datetimes are always stored as Unix integers', vi: 'Aware luôn được lưu dưới dạng số nguyên Unix' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'A timezone-aware datetime object contains timezone offset and DST rules via `tzinfo`.',
        vi: 'Đối tượng datetime timezone-aware chứa thông tin độ lệch múi giờ và quy tắc DST thông qua `tzinfo`.'
      }
    },
    {
      id: 'py_15_q2',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'medium',
      question: {
        en: 'Which module introduced in Python 3.9 is the standard library replacement for third-party `pytz`?',
        vi: 'Thư viện nào được giới thiệu từ Python 3.9 thay thế chuẩn cho thư viện `pytz` của bên thứ ba?'
      },
      options: [
        { en: '`pytime`', vi: '`pytime`' },
        { en: '`zoneinfo`', vi: '`zoneinfo`' },
        { en: '`timelib`', vi: '`timelib`' },
        { en: '`tzdatabase`', vi: '`tzdatabase`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'PEP 615 introduced `zoneinfo.ZoneInfo` into the standard library in Python 3.9.',
        vi: 'PEP 615 đã đưa `zoneinfo.ZoneInfo` vào thư viện chuẩn từ phiên bản Python 3.9.'
      }
    },
    {
      id: 'py_15_q3',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'medium',
      question: {
        en: 'What method is recommended to get the current timestamp in UTC as a timezone-aware object?',
        vi: 'Phương thức nào được khuyến nghị để lấy thời gian hiện tại theo chuẩn UTC ở dạng timezone-aware?'
      },
      options: [
        { en: '`datetime.utcnow()`', vi: '`datetime.utcnow()`' },
        { en: '`datetime.now(timezone.utc)`', vi: '`datetime.now(timezone.utc)`' },
        { en: '`datetime.today()`', vi: '`datetime.today()`' },
        { en: '`datetime.now("UTC")`', vi: '`datetime.now("UTC")`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`datetime.utcnow()` is deprecated in modern Python because it returns a naive datetime. Use `datetime.now(timezone.utc)`.',
        vi: '`datetime.utcnow()` đã bị coi là lỗi thời vì trả về naive datetime. Hãy dùng `datetime.now(timezone.utc)`.'
      }
    },
    {
      id: 'py_15_q4',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'easy',
      question: {
        en: 'What does subtracting one datetime object from another datetime object produce?',
        vi: 'Phép trừ giữa hai đối tượng datetime trong Python sinh ra đối tượng kiểu gì?'
      },
      options: [
        { en: 'A float representing seconds', vi: 'Số thực float biểu diễn số giây' },
        { en: 'A `timedelta` object', vi: 'Một đối tượng `timedelta`' },
        { en: 'An integer representing days', vi: 'Số nguyên int biểu diễn số ngày' },
        { en: 'A new `datetime` object', vi: 'Một đối tượng `datetime` mới' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'The difference between two datetime instances evaluates to a `timedelta` object representing the duration.',
        vi: 'Hiệu giữa hai datetime tạo ra một đối tượng `timedelta` biểu diễn khoảng thời gian.'
      }
    },
    {
      id: 'py_15_q5',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'easy',
      question: {
        en: 'What is the directive code in `strftime` for the 4-digit year?',
        vi: 'Mã chỉ thị trong `strftime` cho năm có 4 chữ số là gì?'
      },
      options: [
        { en: '`%y`', vi: '`%y`' },
        { en: '`%Y`', vi: '`%Y`' },
        { en: '`%YYYY`', vi: '`%YYYY`' },
        { en: '`%year`', vi: '`%year`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`%Y` formats as 4-digit year (e.g. 2026), while `%y` formats as 2-digit year (e.g. 26).',
        vi: '`%Y` định dạng năm 4 chữ số (vd: 2026), còn `%y` là năm 2 chữ số (vd: 26).'
      }
    },
    {
      id: 'py_15_q6',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'medium',
      question: {
        en: 'How do you accurately parse an ISO 8601 string like `"2026-08-31T15:30:00+00:00"` into a Python datetime?',
        vi: 'Làm thế nào để phân tích chuỗi ISO 8601 như `"2026-08-31T15:30:00+00:00"` thành datetime trong Python?'
      },
      options: [
        { en: '`datetime.fromisoformat(iso_string)`', vi: '`datetime.fromisoformat(iso_string)`' },
        { en: '`datetime.parse(iso_string)`', vi: '`datetime.parse(iso_string)`' },
        { en: '`datetime.from_string(iso_string)`', vi: '`datetime.from_string(iso_string)`' },
        { en: '`iso_string.to_datetime()`', vi: '`iso_string.to_datetime()`' }
      ],
      correctAnswers: [0],
      explanation: {
        en: '`datetime.fromisoformat()` is the built-in standard method to deserialize ISO 8601 strings.',
        vi: '`datetime.fromisoformat()` là phương thức chuẩn tích hợp sẵn để phân tích chuỗi ISO 8601.'
      }
    },
    {
      id: 'py_15_q7',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'medium',
      question: {
        en: 'How do you obtain the total duration in seconds from a `timedelta` object `td`?',
        vi: 'Làm thế nào để lấy toàn bộ thời gian tính bằng giây từ đối tượng `timedelta` `td`?'
      },
      options: [
        { en: '`td.seconds`', vi: '`td.seconds`' },
        { en: '`td.total_seconds()`', vi: '`td.total_seconds()`' },
        { en: '`td.get_seconds()`', vi: '`td.get_seconds()`' },
        { en: '`float(td)`', vi: '`float(td)`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`td.seconds` only returns the remaining seconds component (< 86400), while `td.total_seconds()` computes the entire duration.',
        vi: '`td.seconds` chỉ trả về phần giây lẻ trong ngày (< 86400), còn `td.total_seconds()` tính tổng toàn bộ thời gian.'
      }
    },
    {
      id: 'py_15_q8',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'medium',
      question: {
        en: 'What happens when you subtract an offset-naive datetime from an offset-aware datetime?',
        vi: 'Điều gì xảy ra khi bạn trừ một datetime không có múi giờ (naive) cho một datetime có múi giờ (aware)?'
      },
      options: [
        { en: 'Python assumes UTC for the naive datetime automatically', vi: 'Python tự động coi naive là UTC' },
        { en: 'Python raises a `TypeError`', vi: 'Python ném ra lỗi `TypeError`' },
        { en: 'It returns zero', vi: 'Trả về giá trị 0' },
        { en: 'It converts both to string before subtracting', vi: 'Chuyển cả 2 thành chuỗi trước khi trừ' }
      ],
      correctAnswers: [1],
      explanation: {
        en: 'Python strictly forbids arithmetic between naive and aware datetimes to prevent silent timezone bugs.',
        vi: 'Python nghiêm cấm phép tính giữa naive và aware datetime để tránh các lỗi logic múi giờ âm thầm.'
      }
    },
    {
      id: 'py_15_q9',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'medium',
      question: {
        en: 'What is the purpose of `dt.astimezone(ZoneInfo("..."))`?',
        vi: 'Mục đích của phương thức `dt.astimezone(ZoneInfo("..."))` là gì?'
      },
      options: [
        { en: 'It modifies the year of the date', vi: 'Thay đổi năm của ngày tháng' },
        { en: 'It converts the datetime to a different timezone while preserving the exact universal point in time', vi: 'Chuyển đổi datetime sang múi giờ khác trong khi vẫn giữ nguyên thời khắc thực tế' },
        { en: 'It formats the date as UTC only', vi: 'Chỉ định dạng ngày theo UTC' },
        { en: 'It deletes the timezone information', vi: 'Xóa thông tin múi giờ' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`astimezone()` calculates the local time representation in the target timezone for the same instant in universal time.',
        vi: '`astimezone()` tính toán giá trị giờ địa phương tại múi giờ đích cho cùng một thời khắc thực tế.'
      }
    },
    {
      id: 'py_15_q10',
      type: 'single_choice',
      topicId: 'python_datetime_zoneinfo',
      difficulty: 'easy',
      question: {
        en: 'Which class represents a date without any time component (e.g. 2026-10-15)?',
        vi: 'Lớp nào trong module `datetime` đại diện cho một ngày mà không chứa thông tin giờ giấc?'
      },
      options: [
        { en: '`datetime.time`', vi: '`datetime.time`' },
        { en: '`datetime.date`', vi: '`datetime.date`' },
        { en: '`datetime.calendar`', vi: '`datetime.calendar`' },
        { en: '`datetime.day`', vi: '`datetime.day`' }
      ],
      correctAnswers: [1],
      explanation: {
        en: '`datetime.date` stores purely the year, month, and day.',
        vi: '`datetime.date` chỉ lưu trữ năm, tháng và ngày.'
      }
    }
  ]
};
