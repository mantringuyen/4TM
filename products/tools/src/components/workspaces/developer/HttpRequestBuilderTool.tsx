import React, { useState } from 'react';
import { Language } from '../../../types';
import {
  Send,
  Copy,
  Check,
  Code,
  Sparkles,
  AlertTriangle,
  Play,
  CheckCircle2,
  RefreshCw,
  Info,
} from 'lucide-react';

interface HttpRequestBuilderToolProps {
  language: Language;
}

export const HttpRequestBuilderTool: React.FC<HttpRequestBuilderToolProps> = ({ language }) => {
  const [method, setMethod] = useState('POST');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts');
  const [headers, setHeaders] = useState('Content-Type: application/json\nAccept: application/json');
  const [body, setBody] = useState('{\n  "title": "4TM Tools Update",\n  "body": "Production-ready testing",\n  "userId": 1\n}');
  const [copied, setCopied] = useState(false);

  // Active testing state
  const [isSending, setIsSending] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseData, setResponseData] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Generate clean cURL command
  const parsedHeaders = headers.split('\n').map((h) => h.trim()).filter(Boolean);
  const hasBody = method !== 'GET' && method !== 'HEAD' && body.trim().length > 0;

  const curlCommand = `curl -X ${method} "${url}" \\
${parsedHeaders.map((h) => `  -H "${h}" \\`).join('\n')}${hasBody ? `\n  -d '${body.replace(/\n/g, ' ').replace(/'/g, "\\'")}'` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendRequest = async () => {
    setIsSending(true);
    setResponseStatus(null);
    setResponseData(null);
    setErrorMessage(null);
    setResponseHeaders({});

    try {
      const headerObj: Record<string, string> = {};
      parsedHeaders.forEach((line) => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const val = parts.slice(1).join(':').trim();
          headerObj[key] = val;
        }
      });

      const options: RequestInit = {
        method,
        headers: headerObj,
      };

      if (hasBody) {
        options.body = body;
      }

      const res = await fetch(url, options);
      setResponseStatus(res.status);

      const respHeaders: Record<string, string> = {};
      res.headers.forEach((v, k) => {
        respHeaders[k] = v;
      });
      setResponseHeaders(respHeaders);

      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setResponseData(JSON.stringify(json, null, 2));
      } catch {
        setResponseData(text);
      }
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          (language === 'vi'
            ? 'Không thể gửi yêu cầu. Có thể do lỗi mạng hoặc chính sách CORS của máy chủ đích.'
            : 'Request failed. This may be caused by CORS restrictions or network connectivity.')
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Request Config */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold text-xs cursor-pointer text-slate-900 dark:text-white shrink-0"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
            <option value="HEAD">HEAD</option>
          </select>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 min-w-0 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white"
            placeholder="https://api.example.com/v1/resource"
          />

          <button
            type="button"
            onClick={handleSendRequest}
            disabled={isSending || !url.trim()}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isSending ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>
              {isSending
                ? language === 'vi'
                  ? 'Đang gửi...'
                  : 'Sending...'
                : language === 'vi'
                ? 'Gửi yêu cầu'
                : 'Send Request'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-slate-500">
              {language === 'vi' ? 'Headers (Mỗi header trên một dòng)' : 'Headers (One per line)'}
            </label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              rows={4}
              placeholder="Content-Type: application/json"
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-slate-500">
              {language === 'vi' ? 'Nội dung Body (JSON / Raw Text)' : 'Request Body (JSON / Raw)'}
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              disabled={method === 'GET' || method === 'HEAD'}
              placeholder="{}"
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Generated cURL */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'vi' ? 'Câu lệnh cURL chuẩn Terminal' : 'Generated cURL Command'}</span>
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Sao chép cURL' : 'Copy cURL')}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
          {curlCommand}
        </pre>
      </div>

      {/* Response Box if user sent request */}
      {(responseStatus !== null || errorMessage || isSending) && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
              {language === 'vi' ? 'Kết quả phản hồi (Browser Response)' : 'Browser Fetch Response'}
            </span>
            {responseStatus !== null && (
              <span
                className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold ${
                  responseStatus >= 200 && responseStatus < 300
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                }`}
              >
                HTTP {responseStatus}
              </span>
            )}
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{language === 'vi' ? 'Lỗi mạng hoặc CORS' : 'Network / CORS Error'}</span>
              </div>
              <p>{errorMessage}</p>
              <p className="text-[11px] opacity-80 pt-1">
                {language === 'vi'
                  ? 'Gợi ý: Trình duyệt chặn gửi request chéo miền (Cross-Origin) nếu máy chủ đích không gửi header Access-Control-Allow-Origin. Bạn có thể sao chép câu lệnh cURL ở trên để chạy trực tiếp trên Terminal.'
                  : 'Tip: Web browsers enforce CORS restrictions when querying external domains directly. Use the generated cURL command above to execute the request from your terminal without browser CORS constraints.'}
              </p>
            </div>
          )}

          {responseData && (
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 max-h-64">
              {responseData}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};
