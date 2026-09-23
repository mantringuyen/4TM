import React, { useState } from 'react';
import { Language } from '../../../types';
import {
  Code,
  Copy,
  Check,
  Sparkles,
  Layers,
  FileCode,
} from 'lucide-react';

interface JsonSchemaPromptBuilderToolProps {
  language: Language;
}

export const JsonSchemaPromptBuilderTool: React.FC<JsonSchemaPromptBuilderToolProps> = ({
  language,
}) => {
  const [rootType, setRootType] = useState('object');
  const [schemaName, setSchemaName] = useState('DataAnalysisResponse');
  const [fields, setFields] = useState<
    { name: string; type: string; description: string; required: boolean }[]
  >([
    { name: 'summary', type: 'string', description: 'Executive summary of the dataset', required: true },
    { name: 'anomaly_detected', type: 'boolean', description: 'Whether an outlier was found', required: true },
    { name: 'key_metrics', type: 'array', description: 'List of computed KPI metrics', required: true },
    { name: 'confidence_score', type: 'number', description: 'Model confidence between 0.0 and 1.0', required: false },
  ]);
  const [copied, setCopied] = useState(false);

  const addField = () => {
    setFields([
      ...fields,
      { name: `field_${fields.length + 1}`, type: 'string', description: 'Field description', required: true },
    ]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: any) => {
    const updated = [...fields];
    (updated[index] as any)[key] = value;
    setFields(updated);
  };

  const generatedSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: schemaName,
    type: rootType,
    properties: fields.reduce((acc, f) => {
      acc[f.name] = {
        type: f.type,
        description: f.description,
      };
      return acc;
    }, {} as Record<string, any>),
    required: fields.filter((f) => f.required).map((f) => f.name),
    additionalProperties: false,
  };

  const systemInstruction = `You must output ONLY valid JSON adhering strictly to the following JSON Schema:
${JSON.stringify(generatedSchema, null, 2)}
Do not wrap in markdown tags or include explanations outside the JSON object.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(systemInstruction);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Schema Designer Fields */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Schema Title</label>
            <input
              type="text"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
            />
          </div>

          <button
            type="button"
            onClick={addField}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer"
          >
            + {language === 'vi' ? 'Thêm trường dữ liệu' : 'Add Property'}
          </button>
        </div>

        <div className="space-y-2">
          {fields.map((f, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2 text-xs"
            >
              <input
                type="text"
                value={f.name}
                onChange={(e) => updateField(i, 'name', e.target.value)}
                placeholder="Field name"
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-purple-600 dark:text-purple-400 font-bold w-32 bg-transparent"
              />

              <select
                value={f.type}
                onChange={(e) => updateField(i, 'type', e.target.value)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-mono bg-transparent"
              >
                <option value="string">string</option>
                <option value="number">number</option>
                <option value="boolean">boolean</option>
                <option value="array">array</option>
                <option value="object">object</option>
              </select>

              <input
                type="text"
                value={f.description}
                onChange={(e) => updateField(i, 'description', e.target.value)}
                placeholder="Description"
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 flex-1 min-w-[150px] bg-transparent"
              />

              <label className="flex items-center gap-1 font-mono text-[11px] text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={f.required}
                  onChange={(e) => updateField(i, 'required', e.target.checked)}
                />
                <span>Required</span>
              </label>

              <button
                type="button"
                onClick={() => removeField(i)}
                className="text-rose-500 font-bold hover:underline px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Generated JSON Prompt Output */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>{language === 'vi' ? 'System Instruction & Schema sẵn sàng nhúng' : 'Complete JSON Schema Prompt Injection'}</span>
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-900 text-purple-300 font-mono text-xs overflow-x-auto border border-slate-800">
          {systemInstruction}
        </pre>
      </div>
    </div>
  );
};
