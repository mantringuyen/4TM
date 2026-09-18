import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { InputPanel, OutputPanel, FormatSelector, ErrorMessage } from '../common/Panels';
import { ResetButton, FileUploadButton } from '../common/ActionButtons';
import { ArrowLeftRight, Binary, FileCode, Hash, Image as ImageIcon, Sparkles, ShieldCheck } from 'lucide-react';

interface EncoderDecoderToolProps {
  language: Language;
}

type Mode =
  | 'base64'
  | 'url'
  | 'html'
  | 'hex'
  | 'unicode'
  | 'number-bases'
  | 'data-uri';

type Action = 'encode' | 'decode';

// UTF-8 safe Base64 encoder/decoder
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToUtf8(b64: string): string {
  const cleaned = b64.replace(/\s+/g, '');
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

// Text to Hex and Hex to Text
function textToHex(str: string, delimiter: string = ' '): string {
  const bytes = new TextEncoder().encode(str);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(delimiter);
}

function hexToText(hex: string): string {
  const cleaned = hex.replace(/[^0-9a-fA-F]/g, '');
  if (cleaned.length % 2 !== 0) {
    throw new Error('Hexadecimal string must have an even number of characters.');
  }
  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = parseInt(cleaned.substr(i, 2), 16);
  }
  return new TextDecoder().decode(bytes);
}

// HTML Entities
function encodeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (match) => {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return match;
    }
  });
}

function decodeHtml(str: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

// Unicode escape / decode
function encodeUnicode(str: string): string {
  return str
    .split('')
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code > 127) {
        return '\\u' + code.toString(16).padStart(4, '0');
      }
      return c;
    })
    .join('');
}

function decodeUnicode(str: string): string {
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

// Number Bases conversion
function convertNumberBase(input: string, action: Action): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  if (action === 'encode') {
    // Decimal -> Hex, Binary, Octal
    const lines = trimmed.split('\n');
    return lines
      .map((l) => {
        const val = l.trim();
        if (!val) return '';
        const num = Number(val);
        if (isNaN(num)) return `Invalid Decimal: "${val}"`;
        return `Decimal: ${num} | Hex: 0x${num.toString(16).toUpperCase()} | Binary: 0b${num.toString(2)} | Octal: 0o${num.toString(8)}`;
      })
      .join('\n');
  } else {
    // Binary or Hex -> Decimal
    const lines = trimmed.split('\n');
    return lines
      .map((l) => {
        const val = l.trim();
        if (!val) return '';
        let dec: number;
        if (val.startsWith('0x') || val.startsWith('0X') || /^[0-9a-fA-F]+$/.test(val)) {
          dec = parseInt(val, 16);
        } else if (val.startsWith('0b') || val.startsWith('0B') || /^[01]+$/.test(val)) {
          dec = parseInt(val.replace(/^0b/i, ''), 2);
        } else {
          dec = Number(val);
        }
        if (isNaN(dec)) return `Invalid Input: "${val}"`;
        return `Decimal: ${dec}`;
      })
      .join('\n');
  }
}

export const EncoderDecoderTool: React.FC<EncoderDecoderToolProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const [mode, setMode] = useState<Mode>('base64');
  const [action, setAction] = useState<Action>('encode');
  const [inputText, setInputText] = useState<string>('Hello, 4TM Ecosystem! ✨ Welcome to developer utilities.');
  const [outputText, setOutputText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const modeOptions: { value: Mode; label: string; badge?: string }[] = [
    { value: 'base64', label: 'Base64 (UTF-8 Safe)', badge: 'RFC 4648' },
    { value: 'url', label: 'URL / URI Component', badge: 'RFC 3986' },
    { value: 'html', label: 'HTML Entities', badge: 'DOM' },
    { value: 'hex', label: 'Hexadecimal (Hex)', badge: 'Base16' },
    { value: 'unicode', label: 'Unicode Escape (\\uXXXX)', badge: 'UTF-16' },
    { value: 'number-bases', label: 'Binary ↔ Decimal ↔ Hex', badge: 'Radix' },
    { value: 'data-uri', label: 'Base64 Data URI Helper', badge: 'MIME' },
  ];

  // Perform Encoding / Decoding
  useEffect(() => {
    setError(null);
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      let res = '';
      if (mode === 'base64') {
        res = action === 'encode' ? utf8ToBase64(inputText) : base64ToUtf8(inputText);
      } else if (mode === 'url') {
        res = action === 'encode' ? encodeURIComponent(inputText) : decodeURIComponent(inputText);
      } else if (mode === 'html') {
        res = action === 'encode' ? encodeHtml(inputText) : decodeHtml(inputText);
      } else if (mode === 'hex') {
        res = action === 'encode' ? textToHex(inputText) : hexToText(inputText);
      } else if (mode === 'unicode') {
        res = action === 'encode' ? encodeUnicode(inputText) : decodeUnicode(inputText);
      } else if (mode === 'number-bases') {
        res = convertNumberBase(inputText, action);
      } else if (mode === 'data-uri') {
        if (action === 'encode') {
          // Wrap text as data:text/plain;base64,...
          res = `data:text/plain;charset=utf-8;base64,${utf8ToBase64(inputText)}`;
        } else {
          // Parse data URI
          const match = inputText.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            const mime = match[1];
            const rawB64 = match[2];
            res = `MIME Type: ${mime}\nDecoded Content:\n${base64ToUtf8(rawB64)}`;
          } else {
            res = base64ToUtf8(inputText);
          }
        }
      }
      setOutputText(res);
    } catch (err: any) {
      setError(`Failed to ${action} ${mode}: ${err?.message || 'Invalid input sequence.'}`);
      setOutputText('');
    }
  }, [inputText, mode, action]);

  const handleSwap = () => {
    if (outputText) {
      setInputText(outputText);
      setAction((prev) => (prev === 'encode' ? 'decode' : 'encode'));
    }
  };

  const handleImageLoaded = (buffer: ArrayBuffer, filename: string) => {
    // Generate Data URI from uploaded image
    const ext = filename.split('.').pop()?.toLowerCase() || 'png';
    const mimeMap: Record<string, string> = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      svg: 'image/svg+xml',
      webp: 'image/webp',
      gif: 'image/gif',
    };
    const mime = mimeMap[ext] || 'application/octet-stream';
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const b64 = btoa(binary);
    setMode('data-uri');
    setAction('decode');
    setInputText(`data:${mime};base64,${b64}`);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Selector */}
          <FormatSelector
            label="Codec"
            value={mode}
            options={modeOptions}
            onChange={(val) => setMode(val as Mode)}
          />

          {/* Action: Encode vs Decode */}
          <div className="flex items-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setAction('encode')}
              className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                action === 'encode'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Encode</span>
            </button>
            <button
              type="button"
              onClick={() => setAction('decode')}
              className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                action === 'decode'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Decode</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            disabled={!outputText}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            title={dict.common.swap}
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {mode === 'data-uri' && (
            <FileUploadButton
              onFileLoaded={() => {}}
              asBinary={true}
              onBinaryLoaded={handleImageLoaded}
              accept="image/*"
              label="Upload Image &rarr; Data URI"
            />
          )}

          <ResetButton
            onReset={() => {
              setMode('base64');
              setAction('encode');
              setInputText('Hello, 4TM Ecosystem! ✨ Welcome to developer utilities.');
            }}
            label={dict.common.reset}
          />
        </div>
      </div>

      {/* Editor Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InputPanel
          title={`Input (${action.toUpperCase()})`}
          value={inputText}
          onChange={setInputText}
          onClear={() => setInputText('')}
          onSample={() => {
            if (mode === 'number-bases') {
              setInputText(action === 'encode' ? '10\n42\n255\n1024' : '0xFF\n0b101010\n42');
            } else {
              setInputText('Hello, 4TM Ecosystem! ✨ Welcome to developer utilities.');
            }
          }}
          sampleLabel={dict.common.sample}
          clearLabel={dict.common.clear}
          error={error}
        />

        <OutputPanel
          title={`Output (${mode.toUpperCase()})`}
          value={outputText}
          downloadFilename={`${mode}-${action}.txt`}
          copyLabel={dict.common.copy}
          downloadLabel={dict.common.download}
          formatBadge={`${mode.toUpperCase()} • ${action.toUpperCase()}`}
          extraActions={
            <button
              type="button"
              onClick={() => setInputText(outputText)}
              disabled={!outputText}
              className="px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Use as Input
            </button>
          }
        />
      </div>

      {/* Security Privacy Notice */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Zero-Leakage Guarantee:</strong> All encoders, decoders, base converters, and data URI processors execute in sandboxed client memory. Sensitive tokens and credentials never leave your device.
          </span>
        </div>
        <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          Client-Side Only
        </span>
      </div>
    </div>
  );
};
