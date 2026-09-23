import React, { useState } from 'react';
import { Language } from '../../../types';
import {
  Wrench,
  Copy,
  Check,
  Search,
  Type,
  Calendar,
  Sparkles,
  Sliders,
  Layers,
} from 'lucide-react';

interface ExcelFormulaBuilderToolProps {
  language: Language;
}

type BuilderType = 'lookup' | 'text' | 'date' | 'conditional';

export const ExcelFormulaBuilderTool: React.FC<ExcelFormulaBuilderToolProps> = ({ language }) => {
  const [activeType, setActiveType] = useState<BuilderType>('lookup');
  const [copied, setCopied] = useState(false);

  // Lookup state
  const [lookupType, setLookupType] = useState<'xlookup' | 'vlookup' | 'indexmatch'>('xlookup');
  const [lookupValue, setLookupValue] = useState('A2');
  const [lookupTable, setLookupTable] = useState('Products');
  const [lookupCol, setLookupCol] = useState('$A$2:$A$100');
  const [returnCol, setReturnCol] = useState('$C$2:$C$100');
  const [fallbackValue, setFallbackValue] = useState('Not Found');
  const [vlookupIndex, setVlookupIndex] = useState('3');

  // Text state
  const [textOp, setTextOp] = useState<'textsplit' | 'substitute' | 'leftmidright' | 'textjoin'>('textsplit');
  const [textCell, setTextCell] = useState('A2');
  const [textDelimiter, setTextDelimiter] = useState(';');
  const [subOldText, setSubOldText] = useState('-');
  const [subNewText, setSubNewText] = useState('/');
  const [charCount, setCharCount] = useState('5');

  // Date state
  const [dateOp, setDateOp] = useState<'eomonth' | 'edate' | 'datedif' | 'workday'>('eomonth');
  const [startDateCell, setStartDateCell] = useState('A2');
  const [endDateCell, setEndDateCell] = useState('B2');
  const [monthsOffset, setMonthsOffset] = useState('0');
  const [dateUnit, setDateUnit] = useState<'Y' | 'M' | 'D' | 'YM'>('Y');

  // Conditional Formatting formula state
  const [condOp, setCondOp] = useState<'duplicate' | 'greater' | 'multicondition'>('multicondition');
  const [condRange, setCondRange] = useState('$A$2:$D$100');
  const [condCell1, setCondCell1] = useState('$C2');
  const [condVal1, setCondVal1] = useState('1000');
  const [condCell2, setCondCell2] = useState('$D2');
  const [condVal2, setCondVal2] = useState('Active');

  // Generate formula based on current state
  const generateFormula = (): { formula: string; explanation: string; notes: string[] } => {
    switch (activeType) {
      case 'lookup': {
        if (lookupType === 'xlookup') {
          const fallbackStr = fallbackValue ? `, "${fallbackValue}"` : '';
          const formula = `=XLOOKUP(${lookupValue}, ${lookupTable}!${lookupCol}, ${lookupTable}!${returnCol}${fallbackStr}, 0)`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Tìm giá trị ở ô ${lookupValue} trong cột ${lookupCol} của bảng ${lookupTable}, trả về giá trị cùng hàng ở cột ${returnCol}. Nếu không tìm thấy, trả về "${fallbackValue}".`
                : `Looks up the value from ${lookupValue} in column ${lookupCol} of ${lookupTable}, and returns the matching value from ${returnCol}. Returns "${fallbackValue}" if no match is found.`,
            notes: [
              language === 'vi' ? 'Không cần sắp xếp dữ liệu trước' : 'No sorting required',
              language === 'vi' ? 'Hỗ trợ tra cứu từ phải sang trái hoặc từ trái sang phải' : 'Supports left-to-right and right-to-left lookups',
            ],
          };
        } else if (lookupType === 'vlookup') {
          const formula = `=VLOOKUP(${lookupValue}, ${lookupTable}!$A$2:$G$100, ${vlookupIndex}, FALSE)`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Tìm giá trị ${lookupValue} trong cột đầu tiên của bảng và lấy giá trị ở cột thứ ${vlookupIndex}. FALSE đảm bảo khớp chính xác.`
                : `Searches for ${lookupValue} in the first column of the table and returns the value in column index ${vlookupIndex}. FALSE enforces exact match.`,
            notes: [
              language === 'vi' ? 'Cột tìm kiếm bắt buộc phải là cột đầu tiên bên trái của vùng' : 'Lookup column must be the leftmost column',
            ],
          };
        } else {
          const formula = `=INDEX(${lookupTable}!${returnCol}, MATCH(${lookupValue}, ${lookupTable}!${lookupCol}, 0))`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Dùng MATCH để tìm vị trí hàng của ${lookupValue} trong ${lookupCol}, sau đó dùng INDEX để trích xuất giá trị tại hàng đó từ ${returnCol}.`
                : `Uses MATCH to locate the row position of ${lookupValue} in ${lookupCol}, then INDEX retrieves that position from ${returnCol}.`,
            notes: [
              language === 'vi' ? 'Tương thích với mọi phiên bản Excel từ Excel 2003 trở lên' : 'Compatible with all Excel versions (2003+)',
            ],
          };
        }
      }

      case 'text': {
        if (textOp === 'textsplit') {
          const formula = `=TEXTSPLIT(${textCell}, "${textDelimiter}")`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Tách chuỗi tại ô ${textCell} thành các cột riêng biệt dựa trên dấu phân cách "${textDelimiter}". Tự động tràn mảng sang ngang.`
                : `Splits the text in cell ${textCell} across columns using delimiter "${textDelimiter}". Automatically spills.`,
            notes: [
              language === 'vi' ? 'Có sẵn trên Microsoft 365 và Excel 2024' : 'Available in Microsoft 365 & Excel 2024',
            ],
          };
        } else if (textOp === 'substitute') {
          const formula = `=SUBSTITUTE(${textCell}, "${subOldText}", "${subNewText}")`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Thay thế toàn bộ chuỗi "${subOldText}" thành "${subNewText}" trong ô ${textCell}.`
                : `Replaces every occurrence of "${subOldText}" with "${subNewText}" in cell ${textCell}.`,
            notes: [
              language === 'vi' ? 'Phân biệt chữ hoa/chữ thường (Case-sensitive)' : 'Case-sensitive replacement',
            ],
          };
        } else if (textOp === 'textjoin') {
          const formula = `=TEXTJOIN(", ", TRUE, ${textCell})`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Gộp các giá trị trong dải ${textCell} ngăn cách bằng dấu phẩy và khoảng trắng, bỏ qua ô rỗng.`
                : `Concatenates all values in range ${textCell} separated by commas, automatically ignoring empty cells.`,
            notes: [
              language === 'vi' ? 'Hỗ trợ dải ô 1D hoặc 2D' : 'Works with 1D and 2D cell arrays',
            ],
          };
        } else {
          const formula = `=LEFT(${textCell}, ${charCount})`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Trích xuất ${charCount} ký tự đầu tiên từ phía bên trái của ô ${textCell}.`
                : `Extracts the first ${charCount} characters from the left side of cell ${textCell}.`,
            notes: [
              language === 'vi' ? 'Dùng RIGHT() để lấy từ bên phải, MID() để lấy từ vị trí bất kỳ' : 'Use RIGHT() for trailing chars, MID() for middle substring',
            ],
          };
        }
      }

      case 'date': {
        if (dateOp === 'eomonth') {
          const formula = `=EOMONTH(${startDateCell}, ${monthsOffset})`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Trả về ngày cuối cùng của tháng, cách ngày tại ${startDateCell} một khoảng ${monthsOffset} tháng (0 = cuối tháng hiện tại).`
                : `Returns the last day of the month that is ${monthsOffset} months away from ${startDateCell} (0 = end of current month).`,
            notes: [
              language === 'vi' ? 'Rất hữu ích để tính chu kỳ báo cáo tài chính hàng tháng' : 'Ideal for monthly financial reporting close dates',
            ],
          };
        } else if (dateOp === 'edate') {
          const formula = `=EDATE(${startDateCell}, ${monthsOffset})`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Cộng/trừ ${monthsOffset} tháng vào ngày tại ${startDateCell} (giữ nguyên số ngày).`
                : `Adds/subtracts ${monthsOffset} months to the date in ${startDateCell}.`,
            notes: [
              language === 'vi' ? 'Tự động điều chỉnh ngày cuối tháng (ví dụ 31/01 + 1 tháng = 28/02)' : 'Handles varying month lengths automatically',
            ],
          };
        } else if (dateOp === 'datedif') {
          const formula = `=DATEDIF(${startDateCell}, ${endDateCell}, "${dateUnit}")`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Tính khoảng cách giữa 2 ngày theo đơn vị "${dateUnit}" (Y = năm, M = tháng, D = ngày, YM = số tháng lẻ).`
                : `Calculates duration between two dates in unit "${dateUnit}" (Y = full years, M = full months, D = days, YM = remaining months).`,
            notes: [
              language === 'vi' ? 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc' : 'Start date must be earlier than or equal to end date',
            ],
          };
        } else {
          const formula = `=WORKDAY(${startDateCell}, 10)`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Tính ngày sau 10 ngày làm việc (tự động bỏ qua Thứ Bảy và Chủ Nhật).`
                : `Calculates the date after 10 working days, automatically excluding weekends.`,
            notes: [
              language === 'vi' ? 'Có thể thêm danh sách ngày nghỉ lễ ở tham số thứ 3' : 'Optionally pass holiday array as 3rd parameter',
            ],
          };
        }
      }

      case 'conditional': {
        if (condOp === 'multicondition') {
          const formula = `=AND(${condCell1}>${condVal1}, ${condCell2}="${condVal2}")`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Định dạng có điều kiện cho cả hàng trong bảng: Khóa cột bằng dấu $ (${condCell1}, ${condCell2}) để toàn bộ hàng được tô màu khi thỏa mãn cả 2 điều kiện.`
                : `Row-level conditional formatting rule: Locks column references with $ (${condCell1}, ${condCell2}) so the entire row highlights when both conditions are true.`,
            notes: [
              language === 'vi' ? 'Áp dụng cho vùng $A$2:$D$100 trong cửa sổ Conditional Formatting' : 'Apply to range $A$2:$D$100 in CF Rules Manager',
            ],
          };
        } else if (condOp === 'duplicate') {
          const formula = `=COUNTIF($A$2:$A$100, A2)>1`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Tô màu các ô xuất hiện nhiều hơn 1 lần trong cột A.`
                : `Highlights cells that appear more than once in column A.`,
            notes: [
              language === 'vi' ? 'Khóa cố định dải đếm $A$2:$A$100 và để ô so sánh A2 tương đối' : 'Lock count range $A$2:$A$100 while keeping cell A2 relative',
            ],
          };
        } else {
          const formula = `=$C2>AVERAGE($C$2:$C$100)`;
          return {
            formula,
            explanation:
              language === 'vi'
                ? `Tô màu các hàng có giá trị cột C cao hơn mức trung bình của toàn bộ cột.`
                : `Highlights rows where column C exceeds the average of the entire dataset.`,
            notes: [
              language === 'vi' ? 'Tính toán động dựa trên trung bình cột' : 'Dynamically compares against column mean',
            ],
          };
        }
      }
    }
  };

  const { formula, explanation, notes } = generateFormula();

  const handleCopy = () => {
    navigator.clipboard.writeText(formula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveType('lookup')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer ${
            activeType === 'lookup'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Tra cứu (XLOOKUP / INDEX)' : 'Lookup (XLOOKUP / INDEX)'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveType('text')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer ${
            activeType === 'text'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Xử lý văn bản (TEXTSPLIT / JOIN)' : 'Text Processing'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveType('date')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer ${
            activeType === 'date'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Ngày tháng (EOMONTH / DATEDIF)' : 'Date & Time'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveType('conditional')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer ${
            activeType === 'conditional'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Định dạng có điều kiện (CF)' : 'Conditional Formatting'}</span>
        </button>
      </div>

      {/* Structured Controls Section */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
        {activeType === 'lookup' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Loại hàm tra cứu' : 'Lookup Paradigm'}
              </label>
              <select
                value={lookupType}
                onChange={(e) => setLookupType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="xlookup">XLOOKUP (Khuyên dùng - Excel 365/2021+)</option>
                <option value="indexmatch">INDEX + MATCH (Chuẩn mọi phiên bản)</option>
                <option value="vlookup">VLOOKUP (Cổ điển)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Ô chứa giá trị tìm kiếm (lookup_value)' : 'Lookup Cell / Value'}
              </label>
              <input
                type="text"
                value={lookupValue}
                onChange={(e) => setLookupValue(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Tên bảng / Sheet tra cứu' : 'Source Sheet / Table'}
              </label>
              <input
                type="text"
                value={lookupTable}
                onChange={(e) => setLookupTable(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Cột đối chiếu (lookup_array)' : 'Lookup Array Range'}
              </label>
              <input
                type="text"
                value={lookupCol}
                onChange={(e) => setLookupCol(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Cột trả kết quả (return_array)' : 'Return Array Range'}
              </label>
              <input
                type="text"
                value={returnCol}
                onChange={(e) => setReturnCol(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>

            {lookupType === 'xlookup' ? (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'vi' ? 'Giá trị nếu không tìm thấy (if_not_found)' : 'Not Found Fallback'}
                </label>
                <input
                  type="text"
                  value={fallbackValue}
                  onChange={(e) => setFallbackValue(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            ) : lookupType === 'vlookup' ? (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'vi' ? 'Số thứ tự cột kết quả (col_index_num)' : 'Column Index Number'}
                </label>
                <input
                  type="text"
                  value={vlookupIndex}
                  onChange={(e) => setVlookupIndex(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            ) : null}
          </div>
        )}

        {activeType === 'text' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Thao tác văn bản' : 'Text Operation'}
              </label>
              <select
                value={textOp}
                onChange={(e) => setTextOp(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="textsplit">TEXTSPLIT (Tách chuỗi theo ký tự)</option>
                <option value="substitute">SUBSTITUTE (Thay thế từ khóa)</option>
                <option value="textjoin">TEXTJOIN (Gộp dải ô với dấu phẩy)</option>
                <option value="leftmidright">LEFT (Trích xuất ký tự đầu)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Ô văn bản nguồn' : 'Target Text Cell / Range'}
              </label>
              <input
                type="text"
                value={textCell}
                onChange={(e) => setTextCell(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>

            {textOp === 'textsplit' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'vi' ? 'Dấu phân cách (delimiter)' : 'Delimiter Character'}
                </label>
                <input
                  type="text"
                  value={textDelimiter}
                  onChange={(e) => setTextDelimiter(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            )}

            {textOp === 'substitute' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {language === 'vi' ? 'Ký tự cũ cần đổi (old_text)' : 'Old Text to Replace'}
                  </label>
                  <input
                    type="text"
                    value={subOldText}
                    onChange={(e) => setSubOldText(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {language === 'vi' ? 'Ký tự mới thay vào (new_text)' : 'New Replacement Text'}
                  </label>
                  <input
                    type="text"
                    value={subNewText}
                    onChange={(e) => setSubNewText(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </>
            )}

            {textOp === 'leftmidright' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'vi' ? 'Số ký tự trích xuất' : 'Number of Characters'}
                </label>
                <input
                  type="number"
                  value={charCount}
                  onChange={(e) => setCharCount(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            )}
          </div>
        )}

        {activeType === 'date' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Hàm ngày tháng' : 'Date Function'}
              </label>
              <select
                value={dateOp}
                onChange={(e) => setDateOp(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="eomonth">EOMONTH (Ngày cuối cùng của tháng)</option>
                <option value="edate">EDATE (Cộng/trừ số tháng)</option>
                <option value="datedif">DATEDIF (Tính tuổi / thâm niên)</option>
                <option value="workday">WORKDAY (Ngày làm việc loại trừ cuối tuần)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Ô ngày bắt đầu' : 'Start Date Cell'}
              </label>
              <input
                type="text"
                value={startDateCell}
                onChange={(e) => setStartDateCell(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>

            {dateOp === 'datedif' ? (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {language === 'vi' ? 'Ô ngày kết thúc' : 'End Date Cell'}
                  </label>
                  <input
                    type="text"
                    value={endDateCell}
                    onChange={(e) => setEndDateCell(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {language === 'vi' ? 'Đơn vị tính' : 'Duration Unit'}
                  </label>
                  <select
                    value={dateUnit}
                    onChange={(e) => setDateUnit(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
                  >
                    <option value="Y">Y (Số năm nguyên)</option>
                    <option value="M">M (Số tháng nguyên)</option>
                    <option value="D">D (Số ngày)</option>
                    <option value="YM">YM (Số tháng lẻ sau khi trừ số năm)</option>
                  </select>
                </div>
              </>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'vi' ? 'Độ lệch tháng (months offset)' : 'Months Offset'}
                </label>
                <input
                  type="number"
                  value={monthsOffset}
                  onChange={(e) => setMonthsOffset(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>
            )}
          </div>
        )}

        {activeType === 'conditional' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'vi' ? 'Mẫu định dạng điều kiện' : 'Condition Rule Type'}
              </label>
              <select
                value={condOp}
                onChange={(e) => setCondOp(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="multicondition">Tô màu cả hàng theo 2 điều kiện ($C2 &gt; 1000 AND $D2="Active")</option>
                <option value="duplicate">Đánh dấu trùng lặp (Duplicate Detection)</option>
                <option value="greater">Lớn hơn mức trung bình của cột</option>
              </select>
            </div>

            {condOp === 'multicondition' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {language === 'vi' ? 'Cột điều kiện 1 (Khóa cột)' : 'Condition 1 Cell ($C2)'}
                  </label>
                  <input
                    type="text"
                    value={condCell1}
                    onChange={(e) => setCondCell1(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {language === 'vi' ? 'Giá trị so sánh 1' : 'Threshold 1'}
                  </label>
                  <input
                    type="text"
                    value={condVal1}
                    onChange={(e) => setCondVal1(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Generated Formula Output Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'vi' ? 'Công thức Excel đã tạo' : 'Generated Excel Formula'}</span>
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied!') : (language === 'vi' ? 'Sao chép công thức' : 'Copy Formula')}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base font-bold overflow-x-auto border border-slate-800 shadow-inner">
          {formula}
        </div>

        {/* Explanation */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white">{language === 'vi' ? 'Giải thích: ' : 'Logic: '}</span>
            {explanation}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {notes.map((note, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
              >
                ✓ {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
