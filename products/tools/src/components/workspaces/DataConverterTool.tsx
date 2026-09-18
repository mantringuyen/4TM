import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { InputPanel, OutputPanel, FormatSelector, ErrorMessage } from '../common/Panels';
import { FileUploadButton, ResetButton } from '../common/ActionButtons';
import { ArrowLeftRight, FileSpreadsheet, Sparkles, Check, Database } from 'lucide-react';
import YAML from 'yaml';

interface DataConverterToolProps {
  language: Language;
}

type DataFormat = 'json' | 'csv' | 'tsv' | 'xml' | 'yaml' | 'markdown' | 'html' | 'sql' | 'xlsx';

const SAMPLE_DATA = {
  json: JSON.stringify(
    [
      { id: 1, name: 'Alice Smith', role: 'Data Analyst', department: 'Analytics', salary: 85000, active: true },
      { id: 2, name: 'Bob Jones', role: 'Software Engineer', department: 'Engineering', salary: 92000, active: true },
      { id: 3, name: 'Charlie Kim', role: 'Product Manager', department: 'Product', salary: 97000, active: false },
      { id: 4, name: 'Diana Prince', role: 'UI/UX Designer', department: 'Design', salary: 78000, active: true },
    ],
    null,
    2
  ),
  csv: `id,name,role,department,salary,active\n1,"Alice Smith","Data Analyst","Analytics",85000,true\n2,"Bob Jones","Software Engineer","Engineering",92000,true\n3,"Charlie Kim","Product Manager","Product",97000,false\n4,"Diana Prince","UI/UX Designer","Design",78000,true`,
  tsv: `id\tname\trole\tdepartment\tsalary\tactive\n1\tAlice Smith\tData Analyst\tAnalytics\t85000\ttrue\n2\tBob Jones\tSoftware Engineer\tEngineering\t92000\ttrue\n3\tCharlie Kim\tProduct Manager\tProduct\t97000\tfalse\n4\tdiana Prince\tUI/UX Designer\tDesign\t78000\ttrue`,
  yaml: `- id: 1\n  name: Alice Smith\n  role: Data Analyst\n  department: Analytics\n  salary: 85000\n  active: true\n- id: 2\n  name: Bob Jones\n  role: Software Engineer\n  department: Engineering\n  salary: 92000\n  active: true`,
  xml: `<?xml version="1.0" encoding="UTF-8"?>\n<records>\n  <row>\n    <id>1</id>\n    <name>Alice Smith</name>\n    <role>Data Analyst</role>\n    <department>Analytics</department>\n    <salary>85000</salary>\n    <active>true</active>\n  </row>\n  <row>\n    <id>2</id>\n    <name>Bob Jones</name>\n    <role>Software Engineer</role>\n    <department>Engineering</department>\n    <salary>92000</salary>\n    <active>true</active>\n  </row>\n</records>`,
};

// Robust CSV/TSV Parser
function parseDelimited(text: string, delimiter: string = ','): Record<string, any>[] {
  const lines: string[] = [];
  let current = '';
  let insideQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (insideQuote && next === '"') {
        current += '"';
        i++;
      } else {
        insideQuote = !insideQuote;
      }
    } else if ((char === '\r' && next === '\n') || char === '\n' || char === '\r') {
      if (insideQuote) {
        current += char;
      } else {
        lines.push(current);
        current = '';
        if (char === '\r' && next === '\n') i++;
      }
    } else {
      current += char;
    }
  }
  if (current) lines.push(current);

  const cleanLines = lines.map((l) => l.trim()).filter((l) => l.length > 0);
  if (cleanLines.length < 1) return [];

  const splitLine = (line: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      const next = line[i + 1];
      if (c === '"') {
        if (inQ && next === '"') {
          cur += '"';
          i++;
        } else {
          inQ = !inQ;
        }
      } else if (c === delimiter && !inQ) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const headers = splitLine(cleanLines[0]);
  const rows: Record<string, any>[] = [];

  for (let i = 1; i < cleanLines.length; i++) {
    const values = splitLine(cleanLines[i]);
    const obj: Record<string, any> = {};
    headers.forEach((h, idx) => {
      let val: any = values[idx] ?? '';
      // infer numbers / booleans
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (val !== '' && !isNaN(Number(val))) val = Number(val);
      obj[h] = val;
    });
    rows.push(obj);
  }

  return rows;
}

// Convert Array of Objects to CSV/TSV
function toDelimited(rows: Record<string, any>[], delimiter: string = ','): string {
  if (!rows || rows.length === 0) return '';
  const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const escapeCell = (val: any): string => {
    if (val === null || val === undefined) return '';
    const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headerLine = headers.map(escapeCell).join(delimiter);
  const dataLines = rows.map((row) => headers.map((h) => escapeCell(row[h])).join(delimiter));
  return [headerLine, ...dataLines].join('\n');
}

// Convert Array of Objects to Markdown Table
function toMarkdownTable(rows: Record<string, any>[]): string {
  if (!rows || rows.length === 0) return '';
  const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const headerLine = `| ${headers.join(' | ')} |`;
  const separatorLine = `| ${headers.map(() => '---').join(' | ')} |`;
  const dataLines = rows.map((row) => {
    const cells = headers.map((h) => {
      const val = row[h];
      if (val === null || val === undefined) return '';
      const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
      return str.replace(/\|/g, '\\|');
    });
    return `| ${cells.join(' | ')} |`;
  });
  return [headerLine, separatorLine, ...dataLines].join('\n');
}

// Convert Array of Objects to HTML Table
function toHtmlTable(rows: Record<string, any>[]): string {
  if (!rows || rows.length === 0) return '<table></table>';
  const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const escapeHtml = (val: any) => {
    if (val === null || val === undefined) return '';
    const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const thead = `  <thead>\n    <tr>\n${headers.map((h) => `      <th>${escapeHtml(h)}</th>`).join('\n')}\n    </tr>\n  </thead>`;
  const tbody = `  <tbody>\n${rows
    .map(
      (r) =>
        `    <tr>\n${headers.map((h) => `      <td>${escapeHtml(r[h])}</td>`).join('\n')}\n    </tr>`
    )
    .join('\n')}\n  </tbody>`;

  return `<table border="1" cellpadding="8" cellspacing="0">\n${thead}\n${tbody}\n</table>`;
}

// Convert Array of Objects to SQL INSERT statements
function toSqlInsert(rows: Record<string, any>[], tableName: string = 'my_table'): string {
  if (!rows || rows.length === 0) return `-- No rows to generate INSERT for table ${tableName}`;
  const headers = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const colList = headers.map((h) => `\`${h.replace(/`/g, '``')}\``).join(', ');

  const escapeSqlVal = (val: any) => {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') return isNaN(val) ? 'NULL' : String(val);
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
    return `'${str.replace(/'/g, "''")}'`;
  };

  const statements = rows.map((row) => {
    const valList = headers.map((h) => escapeSqlVal(row[h])).join(', ');
    return `INSERT INTO \`${tableName}\` (${colList}) VALUES (${valList});`;
  });

  return `-- SQL Insert Generated by 4TM Tools\n-- Target Table: ${tableName} (${rows.length} rows)\n\n` + statements.join('\n');
}

// XML Helpers
function xmlToJson(xmlStr: string): any[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlStr, 'text/xml');
  const parseError = xmlDoc.getElementsByTagName('parsererror');
  if (parseError.length > 0) {
    throw new Error(parseError[0].textContent || 'XML Syntax Error');
  }

  const root = xmlDoc.documentElement;
  const rows: Record<string, any>[] = [];

  const children = Array.from(root.children);
  if (children.length === 0) return [];

  for (const child of children) {
    const rowObj: Record<string, any> = {};
    if (child.children.length === 0) {
      rowObj[child.tagName] = child.textContent;
    } else {
      for (const prop of Array.from(child.children)) {
        let val: any = prop.textContent;
        if (val === 'true') val = true;
        else if (val === 'false') val = false;
        else if (val !== '' && !isNaN(Number(val))) val = Number(val);
        rowObj[prop.tagName] = val;
      }
    }
    rows.push(rowObj);
  }

  return rows;
}

function jsonToXml(rows: Record<string, any>[], rootName = 'records', rowName = 'row'): string {
  if (!rows || rows.length === 0) return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}/>`;
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n`;
  for (const row of rows) {
    xml += `  <${rowName}>\n`;
    for (const [key, val] of Object.entries(row)) {
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
      const str = val === null || val === undefined ? '' : typeof val === 'object' ? JSON.stringify(val) : String(val);
      const sanitizedVal = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      xml += `    <${sanitizedKey}>${sanitizedVal}</${sanitizedKey}>\n`;
    }
    xml += `  </${rowName}>\n`;
  }
  xml += `</${rootName}>`;
  return xml;
}

export const DataConverterTool: React.FC<DataConverterToolProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const [inputFormat, setInputFormat] = useState<DataFormat>('json');
  const [outputFormat, setOutputFormat] = useState<DataFormat>('csv');
  const [inputText, setInputText] = useState<string>(SAMPLE_DATA.json);
  const [outputText, setOutputText] = useState<string>('');
  const [tableName, setTableName] = useState<string>('users');
  const [error, setError] = useState<string | null>(null);
  const [detectedStats, setDetectedStats] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });

  const inputOptions = [
    { value: 'json', label: 'JSON (Array/Objects)' },
    { value: 'csv', label: 'CSV (Comma Delimited)' },
    { value: 'tsv', label: 'TSV (Tab Delimited)' },
    { value: 'xml', label: 'XML' },
    { value: 'yaml', label: 'YAML' },
  ];

  const outputOptions = [
    { value: 'csv', label: 'CSV (Comma Separated)' },
    { value: 'json', label: 'JSON' },
    { value: 'tsv', label: 'TSV (Tab Separated)' },
    { value: 'sql', label: 'SQL INSERT Statements' },
    { value: 'markdown', label: 'Markdown Table' },
    { value: 'html', label: 'HTML <table>' },
    { value: 'xml', label: 'XML' },
    { value: 'yaml', label: 'YAML' },
  ];

  // Perform Transformation
  useEffect(() => {
    setError(null);
    if (!inputText.trim()) {
      setOutputText('');
      setDetectedStats({ rows: 0, cols: 0 });
      return;
    }

    try {
      let intermediateRows: Record<string, any>[] = [];

      // Parse Input
      if (inputFormat === 'json') {
        const parsed = JSON.parse(inputText);
        if (Array.isArray(parsed)) {
          intermediateRows = parsed.map((item) => (typeof item === 'object' && item !== null ? item : { value: item }));
        } else if (typeof parsed === 'object' && parsed !== null) {
          intermediateRows = [parsed];
        } else {
          throw new Error('JSON input must be an array of objects or an object.');
        }
      } else if (inputFormat === 'csv') {
        intermediateRows = parseDelimited(inputText, ',');
      } else if (inputFormat === 'tsv') {
        intermediateRows = parseDelimited(inputText, '\t');
      } else if (inputFormat === 'xml') {
        intermediateRows = xmlToJson(inputText);
      } else if (inputFormat === 'yaml') {
        const parsed = YAML.parse(inputText);
        if (Array.isArray(parsed)) {
          intermediateRows = parsed;
        } else if (typeof parsed === 'object' && parsed !== null) {
          intermediateRows = [parsed];
        } else {
          throw new Error('YAML input must parse into an array or object.');
        }
      }

      if (intermediateRows.length === 0) {
        setOutputText('');
        setDetectedStats({ rows: 0, cols: 0 });
        return;
      }

      const cols = Array.from(new Set(intermediateRows.flatMap((r) => Object.keys(r))));
      setDetectedStats({ rows: intermediateRows.length, cols: cols.length });

      // Generate Output
      let result = '';
      if (outputFormat === 'json') {
        result = JSON.stringify(intermediateRows, null, 2);
      } else if (outputFormat === 'csv') {
        result = toDelimited(intermediateRows, ',');
      } else if (outputFormat === 'tsv') {
        result = toDelimited(intermediateRows, '\t');
      } else if (outputFormat === 'markdown') {
        result = toMarkdownTable(intermediateRows);
      } else if (outputFormat === 'html') {
        result = toHtmlTable(intermediateRows);
      } else if (outputFormat === 'sql') {
        result = toSqlInsert(intermediateRows, tableName.trim() || 'data_table');
      } else if (outputFormat === 'yaml') {
        result = YAML.stringify(intermediateRows);
      } else if (outputFormat === 'xml') {
        result = jsonToXml(intermediateRows);
      }

      setOutputText(result);
    } catch (err: any) {
      setError(err?.message || 'Data conversion error. Please verify input syntax.');
      setOutputText('');
    }
  }, [inputText, inputFormat, outputFormat, tableName]);

  const handleSwap = () => {
    // Only swap if output format is a valid input format
    if (['json', 'csv', 'tsv', 'xml', 'yaml'].includes(outputFormat) && outputText) {
      const nextInputFormat = outputFormat as DataFormat;
      const nextOutputFormat = inputFormat;
      setInputText(outputText);
      setInputFormat(nextInputFormat);
      setOutputFormat(nextOutputFormat);
    }
  };

  const handleLoadSample = () => {
    if (inputFormat === 'json') setInputText(SAMPLE_DATA.json);
    else if (inputFormat === 'csv') setInputText(SAMPLE_DATA.csv);
    else if (inputFormat === 'tsv') setInputText(SAMPLE_DATA.tsv);
    else if (inputFormat === 'yaml') setInputText(SAMPLE_DATA.yaml);
    else if (inputFormat === 'xml') setInputText(SAMPLE_DATA.xml);
  };

  // Handle Binary Excel XLSX File Upload
  const handleBinaryLoaded = async (buffer: ArrayBuffer, filename: string) => {
    try {
      const XLSX = await import('xlsx');
      const wb = XLSX.read(buffer, { type: 'array' });
      const firstSheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      setInputFormat('json');
      setInputText(JSON.stringify(json, null, 2));
      setError(null);
    } catch (e: any) {
      setError(`Excel parsing error for ${filename}: ${e.message}`);
    }
  };

  const getDownloadFilename = () => {
    const extMap: Record<DataFormat, string> = {
      json: 'json',
      csv: 'csv',
      tsv: 'tsv',
      xml: 'xml',
      yaml: 'yaml',
      markdown: 'md',
      html: 'html',
      sql: 'sql',
      xlsx: 'xlsx',
    };
    return `converted-data.${extMap[outputFormat] || 'txt'}`;
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <FormatSelector
            label="From"
            value={inputFormat}
            options={inputOptions}
            onChange={(val) => {
              setInputFormat(val as DataFormat);
            }}
          />

          <button
            type="button"
            onClick={handleSwap}
            disabled={!['json', 'csv', 'tsv', 'xml', 'yaml'].includes(outputFormat) || !outputText}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            title={dict.common.swap}
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          <FormatSelector
            label="To"
            value={outputFormat}
            options={outputOptions}
            onChange={(val) => setOutputFormat(val as DataFormat)}
          />

          {outputFormat === 'sql' && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-300">Table:</span>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="table_name"
                className="w-28 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* File Upload for text files and Excel files */}
          <FileUploadButton
            onFileLoaded={(content) => {
              setInputText(content);
            }}
            asBinary={true}
            onBinaryLoaded={handleBinaryLoaded}
            accept=".json,.csv,.tsv,.xml,.yaml,.yml,.xlsx,.xls,.txt"
            label="Upload File / Excel"
          />

          <ResetButton
            onReset={() => {
              setInputFormat('json');
              setOutputFormat('csv');
              setInputText(SAMPLE_DATA.json);
              setTableName('users');
            }}
            label={dict.common.reset}
          />
        </div>
      </div>

      {/* Conversion Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InputPanel
          title={`Input (${inputFormat.toUpperCase()})`}
          value={inputText}
          onChange={setInputText}
          onClear={() => setInputText('')}
          onSample={handleLoadSample}
          sampleLabel={dict.common.sample}
          clearLabel={dict.common.clear}
          footerInfo={
            detectedStats.rows > 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Detected: {detectedStats.rows} {dict.common.rows} &bull; {detectedStats.cols} {dict.common.columns}
              </span>
            ) : null
          }
          error={error}
        />

        <OutputPanel
          title={`Output (${outputFormat.toUpperCase()})`}
          value={outputText}
          downloadFilename={getDownloadFilename()}
          copyLabel={dict.common.copy}
          downloadLabel={dict.common.download}
          formatBadge={outputFormat.toUpperCase()}
          footerInfo={
            detectedStats.rows > 0 ? (
              <span className="text-slate-500 dark:text-slate-400">
                Ready for copy or download
              </span>
            ) : null
          }
        />
      </div>

      {/* Feature capabilities note */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Supported Formats:</strong> JSON, CSV, TSV, XML, YAML, Excel (.xlsx), Markdown Tables, HTML Tables, SQL INSERTs. 100% Client-Side.
          </span>
        </div>
        <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          Zero Server Upload
        </span>
      </div>
    </div>
  );
};
