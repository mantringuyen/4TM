import React, { useState } from 'react';
import { Copy, Check, Search, Code2, Plus, Terminal } from 'lucide-react';
import { Language } from '../../types';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
}

const PRESET_SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'Python Safe HTTP Request with Retries',
    language: 'python',
    code: `import httpx

with httpx.Client(timeout=10.0) as client:
    response = client.get("https://4tm.io.vn/api/health")
    response.raise_for_status()
    print(response.json())`,
    tags: ['Python', 'HTTP', 'Networking'],
  },
  {
    id: '2',
    title: 'TypeScript Cryptographic Random Nonce',
    language: 'typescript',
    code: `export function generateSecureNonce(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}`,
    tags: ['TypeScript', 'Crypto', 'Security'],
  },
  {
    id: '3',
    title: 'Wrangler Secret Deployment Command',
    language: 'bash',
    code: `npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY --config wrangler.jsonc`,
    tags: ['Bash', 'Cloudflare', 'Ops'],
  },
];

export const SnippetNotebookSandbox: React.FC<{ language: Language }> = ({ language }) => {
  const [snippets, setSnippets] = useState<Snippet[]>(PRESET_SNIPPETS);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet>(PRESET_SNIPPETS[0]);
  const [copied, setCopied] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = snippets.filter(
    (s) =>
      s.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.language.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-slate-900 dark:text-white">
      {/* Sidebar: Snippet List */}
      <div className="space-y-3 md:border-r md:border-slate-100 md:dark:border-slate-800 md:pr-4">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search snippets..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-1.5 max-h-60 overflow-y-auto">
          {filtered.map((snippet) => (
            <div
              key={snippet.id}
              onClick={() => setSelectedSnippet(snippet)}
              className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                selectedSnippet.id === snippet.id
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300'
              }`}
            >
              <div className="truncate">{snippet.title}</div>
              <div className="text-[10px] font-mono opacity-70 uppercase">{snippet.language}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Preview */}
      <div className="md:col-span-2 space-y-3">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-xs sm:text-sm font-bold truncate">{selectedSnippet.title}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                {selectedSnippet.language}
              </span>
              {selectedSnippet.tags.map((t) => (
                <span key={t} className="text-[10px] text-slate-400 font-mono">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed max-h-56">
          <code>{selectedSnippet.code}</code>
        </pre>
      </div>
    </div>
  );
};
