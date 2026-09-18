import React, { useState } from 'react';
import { Copy, Check, Download, RotateCcw, Upload, FileUp } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
  disabled?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className = '',
  disabled = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text || disabled) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled || !text}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        copied
          ? 'bg-emerald-600 text-white shadow-sm'
          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
      } ${className}`}
      title={label}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
};

interface DownloadButtonProps {
  content: string | Blob;
  filename: string;
  label?: string;
  mimeType?: string;
  disabled?: boolean;
  className?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  content,
  filename,
  label = 'Download',
  mimeType = 'text/plain;charset=utf-8',
  disabled = false,
  className = '',
}) => {
  const handleDownload = () => {
    if (!content || disabled) return;
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={disabled || !content}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      title={label}
    >
      <Download className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
};

interface ResetButtonProps {
  onReset: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  onReset,
  label = 'Reset',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      title={label}
    >
      <RotateCcw className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
};

interface FileUploadButtonProps {
  onFileLoaded: (content: string, filename: string) => void;
  accept?: string;
  label?: string;
  asBinary?: boolean;
  onBinaryLoaded?: (buffer: ArrayBuffer, filename: string) => void;
  className?: string;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileLoaded,
  accept = '*/*',
  label = 'Upload File',
  asBinary = false,
  onBinaryLoaded,
  className = '',
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (asBinary && onBinaryLoaded) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          onBinaryLoaded(reader.result, file.name);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onFileLoaded(reader.result, file.name);
        }
      };
      reader.readAsText(file);
    }
    // reset input so the same file can be reloaded
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload-input"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer ${className}`}
      >
        <FileUp className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        <span>{label}</span>
      </button>
    </div>
  );
};
