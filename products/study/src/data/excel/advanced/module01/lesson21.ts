import { Lesson } from '../../../../types';

export const lesson21: Lesson = {
  "id": "excel_lesson_21",
  "order": 21,
  "moduleId": "excel_mod_5",
  "courseId": "excel",
  "levelId": "advanced",
  "topicId": "excel_financial_math",
  "title": {
    "en": "Financial Mathematics, Valuation & Capital Budgeting: NPV, XNPV, IRR, XIRR & PMT",
    "vi": "Toán Tài Chính, Định Giá & Thẩm Định Dự Án Đầu Tư: NPV, XNPV, IRR, XIRR & PMT"
  },
  "summary": {
    "en": "Master enterprise valuation and investment appraisal: Time Value of Money (TVM), loan amortization modeling with PMT, PPMT, and IPMT, Net Present Value with NPV vs date-specific XNPV, and Internal Rate of Return with IRR vs irregular cash flow XIRR.",
    "vi": "Làm chủ định giá doanh nghiệp và thẩm định dự án đầu tư: Giá trị thời gian của tiền tệ (TVM), xây dựng lịch trả nợ vay với PMT, PPMT và IPMT, Giá trị hiện tại thuần với NPV vs XNPV theo ngày chính xác, và Tỷ suất hoàn vốn nội bộ với IRR vs XIRR cho dòng tiền bất thường."
  },
  "learn": {
    "introduction": {
      "en": "A dollar today is worth more than a dollar tomorrow. Capital budgeting is the discipline of discounting future expected cash flows back to the present day to determine whether an acquisition, factory expansion, or startup investment creates real economic value above the hurdle rate. Excel is the global industry standard platform for discounted cash flow (DCF) modeling.",
      "vi": "Một đồng ngày hôm nay luôn có giá trị hơn một đồng trong tương lai. Thẩm định dự án đầu tư là bộ môn chiết khấu dòng tiền kỳ vọng trong tương lai về hiện tại để xác định xem một thương vụ mua lại, mở rộng nhà máy hay đầu tư khởi nghiệp có tạo ra giá trị kinh tế thực sự vượt qua tỷ suất sinh lời tối thiểu hay không. Excel là nền tảng tiêu chuẩn toàn cầu cho việc lập mô hình chiết khấu dòng tiền (DCF)."
    },
    "conceptExplanation": {
      "en": "### 1. Loan Amortization Functions\n- **`=PMT(rate, nper, pv, [fv], [type])`**: Computes total periodic payment (Principal + Interest).\n  - *Monthly adjustment*: Pass `AnnualRate / 12` and `Years * 12`.\n- **`=IPMT()`**: Extracts the **Interest component** of a specific payment period.\n- **`=PPMT()`**: Extracts the **Principal component** of a specific payment period (`PMT = IPMT + PPMT`).\n\n### 2. Net Present Value: NPV vs XNPV\n- **The Fatal Flaw of `NPV()`**: Excel's `=NPV(rate, value1, value2, ...)` assumes *all cash flows occur at the END of equal annual periods*. You must add the initial investment (Time 0) *outside* the function:\n  `=InitialInvestment + NPV(DiscountRate, FutureCashFlows)`\n- **The Gold Standard `XNPV()`**: Takes exact calendar dates for each transaction, delivering mathematically perfect fractional-year discounting:\n  `=XNPV(rate, values, dates)`\n\n### 3. Internal Rate of Return: IRR vs XIRR\n- **`=IRR(values, [guess])`**: Returns the discount rate at which NPV equals exactly $0 for periodic cash flows.\n- **`=XIRR(values, dates, [guess])`**: Computes the exact annualized IRR for irregular, real-world transaction dates.",
      "vi": "### 1. Các Hàm Lập Lịch Trả Nợ Vay\n- **`=PMT(lai_suat, so_ky, gia_tri_hien_tai, [fv], [type])`**: Tính tổng số tiền phải trả định kỳ (Gốc + Lãi).\n  - *Quy đổi theo tháng*: Truyền `LaiSuatNam / 12` và `SoNam * 12`.\n- **`=IPMT()`**: Trích xuất phần **Tiền Lãi** phải trả trong một kỳ cụ thể.\n- **`=PPMT()`**: Trích xuất phần **Tiền Gốc** phải trả trong một kỳ cụ thể (`PMT = IPMT + PPMT`).\n\n### 2. Giá Trị Hiện Tại Thuần: NPV vs XNPV\n- **Điểm yếu chí mạng của hàm `NPV()`**: Hàm `=NPV(lai_suat, value1, ...)` của Excel mặc định *mọi dòng tiền đều xảy ra vào CUỐI các kỳ đều đặn*. Bạn phải cộng chi phí đầu tư ban đầu (Thời điểm 0) *ở bên ngoài* hàm:\n  `=ChiPhiBanDau + NPV(TySuatChietKhau, DongTienTuongLai)`\n- **Chuẩn Mực Vàng `XNPV()`**: Nhận ngày tháng lịch cụ thể cho từng giao dịch, mang lại kết quả chiết khấu dòng tiền theo ngày lẻ chuẩn xác:\n  `=XNPV(lai_suat, mang_dong_tien, mang_ngay_thang)`\n\n### 3. Tỷ Suất Hoàn Vốn Nội Bộ: IRR vs XIRR\n- **`=IRR(mang_dong_tien, [du_doan])`**: Trả về tỷ suất chiết khấu mà tại đó NPV đúng bằng 0$ cho các dòng tiền định kỳ.\n- **`=XIRR(mang_dong_tien, mang_ngay_thang, [du_doan])`**: Tính toán tỷ suất hoàn vốn nội bộ hàng năm hóa chính xác cho các dòng tiền thực tế không đều đặn theo ngày."
    },
    "syntax": "# Loan Payment (Monthly):\n=PMT(7%/12, 30*12, -500000)\n\n# Net Present Value (Periodic vs Irregular):\n=InitialOutlay + NPV(WACC, CashFlowsYear1to5)\n=XNPV(WACC, CashFlows, DateSchedule)\n\n# Internal Rate of Return (Irregular Dates):\n=XIRR(CashFlows, DateSchedule)",
    "examples": [
      {
        "title": {
          "en": "Mortgage Loan Monthly Payment Calculation",
          "vi": "Tính Khoản Tiền Trả Góp Mua Nhà Hàng Tháng"
        },
        "code": "Loan Amount: $400,000 in B1\nAnnual Interest Rate: 6.5% in B2\nLoan Term: 30 Years in B3\n\nMonthly Payment Formula in B4:\n=PMT(B2/12, B3*12, -B1)\nResult: $2,528.27 per month",
        "description": {
          "en": "Entering loan amount as negative returns a positive monthly payment value.",
          "vi": "Nhập số tiền vay là số âm sẽ trả về giá trị số tiền thanh toán hàng tháng là số dương."
        }
      },
      {
        "title": {
          "en": "Appraising Private Equity Deal with XNPV and XIRR",
          "vi": "Thẩm Định Đầu Tư Quỹ Tư Nhân Bằng XNPV và XIRR"
        },
        "code": "Dates in A2:A6: 2024-01-15, 2024-06-30, 2025-03-31, 2025-12-31, 2026-11-15\nCash Flows in B2:B6: -1,000,000, 200,000, 350,000, 400,000, 600,000\nHurdle Rate: 12% in D1\n\nXNPV in D2: =XNPV(D1, B2:B6, A2:A6)  -> $221,845 (Positive -> Invest!)\nXIRR in D3: =XIRR(B2:B6, A2:A6)       -> 21.4% (Exceeds 12% Hurdle Rate -> Strong Buy)",
        "description": {
          "en": "XNPV and XIRR handle exact irregular deal closing and exit dates for institutional private equity modeling.",
          "vi": "XNPV và XIRR xử lý chính xác các ngày giải ngân và thoái vốn thực tế cho các mô hình quỹ đầu tư tổ chức."
        }
      }
    ],
    "commonMistakes": [
      {
        "mistake": {
          "en": "Including the initial negative cash outlay (Year 0) INSIDE the =NPV() function arguments (=NPV(10%, A1:A5 where A1 is Year 0)), which incorrectly discounts Year 0 by a full year.",
          "vi": "Đưa khoản chi đầu tư ban đầu âm (Năm 0) vào BÊN TRONG hàm =NPV() (=NPV(10%, A1:A5 trong đó A1 là Năm 0)), khiến Năm 0 bị chiết khấu sai mất 1 năm."
        },
        "correction": {
          "en": "Initial Year 0 investment must be added outside NPV: =A1 + NPV(Rate, A2:A5), OR use =XNPV() which handles Year 0 natively.",
          "vi": "Khoản đầu tư Năm 0 phải được cộng ở ngoài: =A1 + NPV(LaiSuat, A2:A5), HOẶC dùng hàm =XNPV() vốn đã hỗ trợ Năm 0 nguyên bản."
        }
      }
    ],
    "tips": [
      {
        "en": "Always Prefer XIRR and XNPV: Institutional financial analysts almost exclusively use XNPV and XIRR over legacy NPV/IRR due to date precision.",
        "vi": "Luôn ưu tiên XIRR và XNPV: Các chuyên gia tài chính định chế gần như luôn dùng XNPV và XIRR thay cho NPV/IRR cổ điển nhờ độ chính xác theo ngày."
      },
      {
        "en": "Rule of Decision: If NPV > 0 (or IRR > Cost of Capital / WACC), the project creates shareholder value and should be accepted.",
        "vi": "Quy tắc ra quyết định: Nếu NPV > 0 (hoặc IRR > Chi phí sử dụng vốn WACC), dự án tạo ra giá trị gia tăng và nên được phê duyệt đầu tư."
      }
    ]
  },
  "exercisePool": [
    {
      "id": "excel_l21_ex1",
      "type": "complete_code",
      "title": {
        "en": "Calculate Monthly Mortgage Payment",
        "vi": "Tính Khoản Trả Nợ Vay Mua Nhà Hàng Tháng"
      },
      "instruction": {
        "en": "Write the PMT formula to calculate monthly payment for an 8% annual rate (8%/12), 20 years (20*12), and loan amount $250,000 (-250000).",
        "vi": "Viết công thức PMT để tính số tiền trả hàng tháng với lãi suất năm 8% (8%/12), thời hạn 20 năm (20*12), và khoản vay 250.000$ (-250000)."
      },
      "starterCode": "=PMT(8%/12, ",
      "solutionCode": "=PMT(8%/12, 20*12, -250000)",
      "expectedOutput": "=PMT(8%/12, 20*12, -250000)",
      "hint": {
        "en": "Pass 8%/12, 20*12, -250000.",
        "vi": "Truyền 8%/12, 20*12, -250000."
      },
      "explanation": {
        "en": "PMT calculates periodic fixed payments based on constant interest rates.",
        "vi": "PMT tính toán khoản thanh toán định kỳ cố định dựa trên lãi suất không đổi."
      }
    },
    {
      "id": "excel_l21_ex2",
      "type": "complete_code",
      "title": {
        "en": "Date-Precise Net Present Value with XNPV",
        "vi": "Tính Giá Trị Hiện Tại Thuần Chính Xác Theo Ngày Bằng XNPV"
      },
      "instruction": {
        "en": "Write the XNPV formula for discount rate in cell D1, cash flow values in B2:B10, and dates in A2:A10.",
        "vi": "Viết công thức XNPV cho tỷ suất chiết khấu ở ô D1, các giá trị dòng tiền ở B2:B10, và ngày tháng ở A2:A10."
      },
      "starterCode": "=XNPV(",
      "solutionCode": "=XNPV(D1, B2:B10, A2:A10)",
      "expectedOutput": "=XNPV(D1, B2:B10, A2:A10)",
      "hint": {
        "en": "=XNPV(D1, B2:B10, A2:A10)",
        "vi": "=XNPV(D1, B2:B10, A2:A10)"
      },
      "explanation": {
        "en": "XNPV calculates net present value using fractional calendar year discounting.",
        "vi": "XNPV tính giá trị hiện tại thuần dựa trên số ngày thực tế trong năm."
      }
    }
  ],
  "challenge": {
    "id": "excel_l21_challenge",
    "title": {
      "en": "Compute Exact Annualized Internal Rate of Return",
      "vi": "Tính Tỷ Suất Hoàn Vốn Nội Bộ Hàng Năm Chính Xác"
    },
    "description": {
      "en": "Construct the XIRR formula to determine the annualized internal rate of return for project cash flows in range B2:B12 mapped against exact milestone dates in A2:A12.",
      "vi": "Xây dựng công thức XIRR để xác định tỷ suất hoàn vốn nội bộ hàng năm cho các dòng tiền dự án trong dải B2:B12 tương ứng với các ngày mốc chính xác tại A2:A12."
    },
    "requirements": [
      {
        "en": "Use the XIRR function",
        "vi": "Sử dụng hàm XIRR"
      },
      {
        "en": "Pass values range B2:B12 first",
        "vi": "Truyền dải giá trị B2:B12 trước"
      },
      {
        "en": "Pass dates range A2:A12 second",
        "vi": "Truyền dải ngày tháng A2:A12 thứ hai"
      }
    ],
    "starterCode": "=",
    "solutionCode": "=XIRR(B2:B12, A2:A12)",
    "hints": [
      {
        "en": "Syntax: =XIRR(Values, Dates)",
        "vi": "Cú pháp: =XIRR(GiaTri, NgayThang)"
      }
    ]
  },
  "quizQuestionPool": [
    {
      "id": "excel_l21_q1",
      "type": "single_choice",
      "question": {
        "en": "Why is `XNPV` considered superior to standard `NPV` in financial modeling?",
        "vi": "Tại sao `XNPV` lại được coi là vượt trội hơn `NPV` tiêu chuẩn trong mô hình tài chính?"
      },
      "options": [
        {
          "en": "XNPV discounts cash flows based on exact specific calendar dates rather than assuming equal periodic annual intervals",
          "vi": "XNPV chiết khấu dòng tiền dựa trên các ngày lịch cụ thể chính xác thay vì giả định các khoảng thời gian năm đều đặn"
        },
        {
          "en": "XNPV runs without an internet connection",
          "vi": "XNPV chạy không cần kết nối internet"
        },
        {
          "en": "NPV is deprecated",
          "vi": "NPV đã bị loại bỏ"
        },
        {
          "en": "XNPV only works on tax returns",
          "vi": "XNPV chỉ dùng cho tờ khai thuế"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Real transactions rarely occur on exact 365-day intervals; XNPV accurately accounts for exact calendar cash flow timing.",
        "vi": "Các giao dịch thực tế hiếm khi diễn ra đúng chu kỳ 365 ngày; XNPV tính toán chính xác theo thời điểm thực tế của dòng tiền."
      },
      "difficulty": "easy",
      "topicId": "excel_financial_math"
    },
    {
      "id": "excel_l21_q2",
      "type": "single_choice",
      "question": {
        "en": "What is the mathematical definition of the Internal Rate of Return (IRR)?",
        "vi": "Định nghĩa toán học của Tỷ suất hoàn vốn nội bộ (IRR) là gì?"
      },
      "options": [
        {
          "en": "The discount rate at which the Net Present Value (NPV) of all cash flows equals exactly zero ($0)",
          "vi": "Tỷ suất chiết khấu mà tại đó Giá trị hiện tại thuần (NPV) của tất cả các dòng tiền bằng đúng số không ($0)"
        },
        {
          "en": "The prime bank lending interest rate",
          "vi": "Lãi suất cho vay cơ bản của ngân hàng"
        },
        {
          "en": "Total revenue divided by total cost",
          "vi": "Tổng doanh thu chia cho tổng chi phí"
        },
        {
          "en": "The rate of inflation",
          "vi": "Tỷ lệ lạm phát"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "IRR is the breakeven discount rate that equates the present value of expected cash inflows with initial cash outflows.",
        "vi": "IRR là tỷ suất chiết khấu hòa vốn làm cho giá trị hiện tại của các dòng tiền thu về bằng đúng với vốn đầu tư ban đầu."
      },
      "difficulty": "medium",
      "topicId": "excel_financial_math"
    },
    {
      "id": "excel_l21_q3",
      "type": "single_choice",
      "question": {
        "en": "In loan amortization modeling, what is the mathematical relationship between `PMT`, `IPMT`, and `PPMT` for any given period?",
        "vi": "Trong mô hình trả nợ vay, mối quan hệ toán học giữa `PMT`, `IPMT` và `PPMT` trong bất kỳ kỳ nào là gì?"
      },
      "options": [
        {
          "en": "`PMT = IPMT + PPMT` (Total Payment = Interest Payment + Principal Payment)",
          "vi": "`PMT = IPMT + PPMT` (Tổng tiền trả = Tiền lãi + Tiền gốc)"
        },
        {
          "en": "`PMT = IPMT * PPMT`",
          "vi": "`PMT = IPMT * PPMT`"
        },
        {
          "en": "`IPMT = PMT + PPMT`",
          "vi": "`IPMT = PMT + PPMT`"
        },
        {
          "en": "There is no relationship",
          "vi": "Không có mối liên hệ nào"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Every installment payment (PMT) is split cleanly into an interest component (IPMT) and a principal amortization component (PPMT).",
        "vi": "Mỗi khoản thanh toán định kỳ (PMT) được chia rành mạch thành phần trả lãi (IPMT) và phần trả nợ gốc (PPMT)."
      },
      "difficulty": "easy",
      "topicId": "excel_financial_math"
    },
    {
      "id": "excel_l21_q4",
      "type": "single_choice",
      "question": {
        "en": "When calculating monthly mortgage payments using `=PMT()`, how must an annual interest rate of 6% and a 30-year term be entered?",
        "vi": "Khi tính tiền trả nợ mua nhà hàng tháng bằng `=PMT()`, mức lãi suất năm 6% và kỳ hạn 30 năm phải được nhập như thế nào?"
      },
      "options": [
        {
          "en": "Rate: `6%/12`, Nper: `30*12`",
          "vi": "Lãi suất Rate: `6%/12`, Số kỳ Nper: `30*12`"
        },
        {
          "en": "Rate: `6%`, Nper: `30`",
          "vi": "Rate: `6%`, Nper: `30`"
        },
        {
          "en": "Rate: `0.06*12`, Nper: `30/12`",
          "vi": "Rate: `0.06*12`, Nper: `30/12`"
        },
        {
          "en": "Rate: `6`, Nper: `360/30`",
          "vi": "Rate: `6`, Nper: `360/30`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "All arguments must be calibrated to the payment period: divide annual rate by 12 months, and multiply years by 12 periods.",
        "vi": "Tất cả đối số phải được quy về cùng đơn vị chu kỳ trả nợ: chia lãi suất năm cho 12 tháng, và nhân số năm với 12 kỳ."
      },
      "difficulty": "easy",
      "topicId": "excel_financial_math"
    },
    {
      "id": "excel_l21_q5",
      "type": "single_choice",
      "question": {
        "en": "What is the classic mistake analysts make when using standard `=NPV()` for project valuation?",
        "vi": "Sai lầm kinh điển mà các chuyên gia phân tích thường mắc phải khi dùng hàm `=NPV()` tiêu chuẩn để định giá dự án là gì?"
      },
      "options": [
        {
          "en": "Including the initial investment (Time 0) inside the NPV value range, which discounts Time 0 cash flow by a full year",
          "vi": "Bao gồm cả vốn đầu tư ban đầu (Thời điểm 0) vào dải giá trị bên trong hàm NPV, khiến dòng tiền Năm 0 bị chiết khấu sai mất 1 năm"
        },
        {
          "en": "Entering interest rates as decimals",
          "vi": "Nhập lãi suất dạng số thập phân"
        },
        {
          "en": "Using negative numbers for expenses",
          "vi": "Dùng số âm cho chi phí"
        },
        {
          "en": "Calculating NPV on computers",
          "vi": "Tính NPV trên máy tính"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "Excel's NPV assumes the first item occurs at the end of Period 1. Time 0 initial investments must be added outside the formula: =Outlay0 + NPV(Rate, CashFlows1_to_N).",
        "vi": "Hàm NPV của Excel mặc định khoản tiền đầu tiên xảy ra ở cuối Kỳ 1. Khoản đầu tư Năm 0 bắt buộc phải cộng bên ngoài: =VonDauTu0 + NPV(LaiSuat, DongTien1_den_N)."
      },
      "difficulty": "medium",
      "topicId": "excel_financial_math"
    },
    {
      "id": "excel_l21_q6",
      "type": "single_choice",
      "question": {
        "en": "What does a positive Net Present Value (`NPV > 0`) indicate about an investment opportunity?",
        "vi": "Chỉ số Giá trị hiện tại thuần dương (`NPV > 0`) cho biết điều gì về một cơ hội đầu tư?"
      },
      "options": [
        {
          "en": "The project generates returns exceeding the required hurdle rate / cost of capital, creating net shareholder wealth",
          "vi": "Dự án tạo ra lợi nhuận vượt qua tỷ suất sinh lời tối thiểu / chi phí sử dụng vốn, gia tăng tài sản ròng cho cổ đông"
        },
        {
          "en": "The project is losing money",
          "vi": "Dự án đang bị lỗ"
        },
        {
          "en": "The loan is fully paid off",
          "vi": "Khoản vay đã được thanh toán hết"
        },
        {
          "en": "The investment is risk-free",
          "vi": "Khoản đầu tư không có rủi ro"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "NPV > 0 confirms that the present value of all future cash inflows exceeds the cost of investment discounted at the cost of capital.",
        "vi": "NPV > 0 xác nhận rằng giá trị hiện tại của các dòng tiền thu về trong tương lai lớn hơn chi phí đầu tư ban đầu khi chiết khấu theo chi phí vốn."
      },
      "difficulty": "easy",
      "topicId": "excel_financial_math"
    },
    {
      "id": "excel_l21_q7",
      "type": "true_false",
      "question": {
        "en": "True or False: In cash flow arrays passed to `IRR` or `XIRR`, there MUST be at least one negative value (representing capital outlay) and at least one positive value (representing cash inflow).",
        "vi": "Đúng hay Sai: Trong mảng dòng tiền truyền vào hàm `IRR` hoặc `XIRR`, BẮT BUỘC phải có ít nhất một giá trị âm (chi vốn đầu tư) và ít nhất một giá trị dương (dòng tiền thu về)."
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
        "en": "True. If all cash flows are positive or all negative, no internal rate of return exists and Excel returns #NUM!.",
        "vi": "Đúng. Nếu mọi dòng tiền đều dương hoặc đều âm, không tồn tại tỷ suất hoàn vốn nội bộ và Excel sẽ báo lỗi #NUM!."
      },
      "difficulty": "easy",
      "topicId": "excel_financial_math"
    },
    {
      "id": "excel_l21_q8",
      "type": "single_choice",
      "question": {
        "en": "What optional argument in `IRR` and `XIRR` helps Excel converge on a solution if the formula returns `#NUM!` on complex cash flows?",
        "vi": "Đối số tùy chọn nào trong hàm `IRR` và `XIRR` giúp Excel hội tụ tìm ra nghiệm nếu công thức báo lỗi `#NUM!` trên các dòng tiền phức tạp?"
      },
      "options": [
        {
          "en": "`[guess]` (an initial estimate of the rate, e.g. 0.1)",
          "vi": "`[guess]` (ước tính ban đầu của tỷ suất, ví dụ 0.1)"
        },
        {
          "en": "`[force]`",
          "vi": "`[force]`"
        },
        {
          "en": "`[retry]`",
          "vi": "`[retry]`"
        },
        {
          "en": "`[accuracy]`",
          "vi": "`[accuracy]`"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "IRR uses an iterative algorithm; providing an initial `[guess]` provides a starting point for non-standard cash flow patterns.",
        "vi": "IRR sử dụng thuật toán lặp; cung cấp tham số `[guess]` ban đầu giúp Excel có điểm xuất phát cho các mẫu dòng tiền phức tạp."
      },
      "difficulty": "hard",
      "topicId": "excel_financial_math"
    },
    {
      "id": "excel_l21_q9",
      "type": "single_choice",
      "question": {
        "en": "What does the `PV()` function compute in Excel?",
        "vi": "Hàm `PV()` trong Excel tính toán giá trị nào?"
      },
      "options": [
        {
          "en": "The current Present Value of an annuity series of future fixed periodic payments",
          "vi": "Giá trị hiện tại Present Value của một chuỗi các khoản thanh toán định kỳ cố định trong tương lai"
        },
        {
          "en": "The Peak Value of a stock",
          "vi": "Giá đỉnh của một cổ phiếu"
        },
        {
          "en": "The Page View analytics",
          "vi": "Lượt xem trang web"
        },
        {
          "en": "The Project Velocity",
          "vi": "Tốc độ dự án"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "PV calculates the lump-sum current worth of a series of future constant cash payments discounted at a constant interest rate.",
        "vi": "Hàm PV tính giá trị hiện tại tương đương một lần của một chuỗi các khoản tiền trả định kỳ cố định trong tương lai theo lãi suất nhất định."
      },
      "difficulty": "easy",
      "topicId": "excel_financial_math"
    },
    {
      "id": "excel_l21_q10",
      "type": "single_choice",
      "question": {
        "en": "In loan amortization schedules, why does the interest payment (`IPMT`) decrease each month while the principal payment (`PPMT`) increases?",
        "vi": "Trong lịch trả nợ vay, tại sao số tiền lãi (`IPMT`) giảm dần mỗi tháng trong khi số tiền gốc (`PPMT`) lại tăng dần?"
      },
      "options": [
        {
          "en": "Because interest is calculated on the remaining outstanding loan balance, which shrinks as principal is paid down",
          "vi": "Bởi vì tiền lãi được tính trên dư nợ gốc thực tế còn lại, và dư nợ này giảm dần theo từng kỳ trả gốc"
        },
        {
          "en": "The bank changes the interest rate monthly",
          "vi": "Ngân hàng thay đổi lãi suất hàng tháng"
        },
        {
          "en": "Due to inflation fluctuations",
          "vi": "Do biến động lạm phát"
        },
        {
          "en": "It is a visual formatting illusion",
          "vi": "Đó chỉ là ảo giác định dạng hiển thị"
        }
      ],
      "correctAnswers": [
        0
      ],
      "explanation": {
        "en": "As each monthly installment reduces outstanding principal, the subsequent month's interest charge diminishes, shifting more of the fixed payment toward principal.",
        "vi": "Khi mỗi kỳ trả góp làm giảm dần dư nợ gốc, tiền lãi phát sinh ở kỳ sau sẽ giảm đi, nhường chỗ cho phần trả gốc nhiều hơn trong khoản tiền trả cố định."
      },
      "difficulty": "medium",
      "topicId": "excel_financial_math"
    }
  ]
};
export default lesson21;
