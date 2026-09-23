import React from 'react';
import { Header, HeaderNavItem, HeaderNavCategory } from '@shared';
import { Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  FileSpreadsheet,
  BarChart3,
  Database,
  Layers,
  Sparkles,
  Terminal,
  Globe,
  BookOpen,
  GraduationCap,
  Gamepad2,
  Wrench,
} from 'lucide-react';
import type { User } from '@supabase/supabase-js';

export interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  user,
  onSignIn,
  onSignOut,
  searchQuery = '',
  onSearchChange,
}) => {
  const dict = TRANSLATIONS[language];

  const handleSelectTool = (slug: string) => {
    const targetUrl = `/${slug.replace(/^\/+/, '')}`;
    window.history.pushState(null, '', targetUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
    const el = document.getElementById('workbench');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toolsDropdownCategories: HeaderNavCategory[] = [
    {
      name: 'Excel',
      items: [
        {
          id: 'excel-formula-explainer',
          label: 'Excel Formula Explainer',
          description: language === 'vi' ? 'Giải thích công thức Excel & lỗi' : 'Deconstruct nested formulas & syntax',
          href: '/excel-formula-explainer',
          icon: FileSpreadsheet,
          onClick: () => handleSelectTool('excel-formula-explainer'),
        },
        {
          id: 'excel-formula-builder',
          label: 'Excel Formula Builder',
          description: language === 'vi' ? 'Bộ dựng công thức trực quan' : 'Interactive lookup & date wizard',
          href: '/excel-formula-builder',
          icon: FileSpreadsheet,
          onClick: () => handleSelectTool('excel-formula-builder'),
        },
        {
          id: 'excel-formula-debugger',
          label: 'Excel Formula Debugger',
          description: language === 'vi' ? 'Chẩn đoán #REF!, #VALUE!' : 'Static error analyzer & fixer',
          href: '/excel-formula-debugger',
          icon: FileSpreadsheet,
          onClick: () => handleSelectTool('excel-formula-debugger'),
        },
      ],
    },
    {
      name: 'Power BI / DAX',
      items: [
        {
          id: 'dax-explainer',
          label: 'DAX Measure Explainer',
          description: language === 'vi' ? 'Phân tích Filter Context & CALCULATE' : 'Context transition & CALCULATE breakdown',
          href: '/dax-explainer',
          icon: BarChart3,
          onClick: () => handleSelectTool('dax-explainer'),
        },
        {
          id: 'dax-time-intelligence',
          label: 'DAX Time Intelligence',
          description: language === 'vi' ? 'Mẫu tính YTD, MTD, YoY % chuẩn' : 'YTD, MTD, Prior Year & Growth measures',
          href: '/dax-time-intelligence',
          icon: BarChart3,
          onClick: () => handleSelectTool('dax-time-intelligence'),
        },
        {
          id: 'powerquery-m-explainer',
          label: 'Power Query M Explainer',
          description: language === 'vi' ? 'Giải thích chuỗi biến đổi ETL' : 'Deconstruct let...in transformation pipelines',
          href: '/powerquery-m-explainer',
          icon: BarChart3,
          onClick: () => handleSelectTool('powerquery-m-explainer'),
        },
      ],
    },
    {
      name: 'SQL',
      items: [
        {
          id: 'sql-join-visualizer',
          label: 'SQL Join Visualizer',
          description: language === 'vi' ? 'Trực quan hóa INNER, LEFT, FULL join' : 'Interactive Venn & dataset simulator',
          href: '/sql-join-visualizer',
          icon: Database,
          onClick: () => handleSelectTool('sql-join-visualizer'),
        },
        {
          id: 'sql-null-tester',
          label: 'SQL NULL & 3VL Tester',
          description: language === 'vi' ? 'Logic 3 giá trị & cạm bẫy NOT IN' : 'Three-valued logic truth tables',
          href: '/sql-null-tester',
          icon: Database,
          onClick: () => handleSelectTool('sql-null-tester'),
        },
        {
          id: 'sql-query-explainer',
          label: 'SQL Execution Order',
          description: language === 'vi' ? 'Thứ tự thực thi FROM → WHERE → SELECT' : 'Logical query execution phases',
          href: '/sql-query-explainer',
          icon: Database,
          onClick: () => handleSelectTool('sql-query-explainer'),
        },
        {
          id: 'sql-formatter',
          label: 'SQL Formatter',
          description: language === 'vi' ? 'Định dạng câu lệnh SQL chuẩn' : 'Standardize SQL indentation & casing',
          href: '/sql-formatter',
          icon: Database,
          onClick: () => handleSelectTool('sql-formatter'),
        },
      ],
    },
    {
      name: 'Python',
      items: [
        {
          id: 'python-error-explainer',
          label: 'Python Error Explainer',
          description: language === 'vi' ? 'Giải thích traceback & lỗi runtime' : 'Parse tracebacks & actionable fixes',
          href: '/python-error-explainer',
          icon: Layers,
          onClick: () => handleSelectTool('python-error-explainer'),
        },
        {
          id: 'python-structure-visualizer',
          label: 'Data Structures & Slicing',
          description: language === 'vi' ? 'Bộ nhớ & cắt lát List/Dict/Set/Tuple' : 'Interactive memory & slicing layout',
          href: '/python-structure-visualizer',
          icon: Layers,
          onClick: () => handleSelectTool('python-structure-visualizer'),
        },
        {
          id: 'python-complexity-inspector',
          label: 'Big-O Complexity Inspector',
          description: language === 'vi' ? 'Ước lượng độ phức tạp thuật toán' : 'Estimate Time & Space Big-O',
          href: '/python-complexity-inspector',
          icon: Layers,
          onClick: () => handleSelectTool('python-complexity-inspector'),
        },
        {
          id: 'pandas-expression-explorer',
          label: 'Pandas Expression Explorer',
          description: language === 'vi' ? '.loc/.iloc & Vectorization' : '.loc vs .iloc & GroupBy aggregations',
          href: '/pandas-expression-explorer',
          icon: Layers,
          onClick: () => handleSelectTool('pandas-expression-explorer'),
        },
      ],
    },
    {
      name: 'AI & Generative Engineering',
      items: [
        {
          id: 'prompt-structure-analyzer',
          label: 'Prompt Structure Analyzer',
          description: language === 'vi' ? 'Chấm điểm cấu trúc 5 trụ cột Prompt' : 'Evaluate persona, constraints & schema',
          href: '/prompt-structure-analyzer',
          icon: Sparkles,
          onClick: () => handleSelectTool('prompt-structure-analyzer'),
        },
        {
          id: 'prompt-diff',
          label: 'Prompt Diff & Tokens',
          description: language === 'vi' ? 'So sánh A/B & đo lường token' : 'Side-by-side prompt iteration diff',
          href: '/prompt-diff',
          icon: Sparkles,
          onClick: () => handleSelectTool('prompt-diff'),
        },
        {
          id: 'rag-chunking-playground',
          label: 'RAG Chunking Playground',
          description: language === 'vi' ? 'Thử nghiệm Chunk Size & Overlap' : 'Test vector document splitting',
          href: '/rag-chunking-playground',
          icon: Sparkles,
          onClick: () => handleSelectTool('rag-chunking-playground'),
        },
        {
          id: 'json-schema-prompt-builder',
          label: 'JSON Schema Prompt Builder',
          description: language === 'vi' ? 'Thiết kế output JSON chuẩn cho LLM' : 'Generate strict structured output prompts',
          href: '/json-schema-prompt-builder',
          icon: Sparkles,
          onClick: () => handleSelectTool('json-schema-prompt-builder'),
        },
        {
          id: 'react-trace-visualizer',
          label: 'ReAct Agent Trace Visualizer',
          description: language === 'vi' ? 'Thought → Action → Observation' : 'Reasoning + Acting execution loop',
          href: '/react-trace-visualizer',
          icon: Sparkles,
          onClick: () => handleSelectTool('react-trace-visualizer'),
        },
        {
          id: 'prompt-defense-playground',
          label: 'Prompt Injection Defense',
          description: language === 'vi' ? 'Phòng thủ tấn công Prompt Injection' : 'Boundary XML tag protection patterns',
          href: '/prompt-defense-playground',
          icon: Sparkles,
          onClick: () => handleSelectTool('prompt-defense-playground'),
        },
      ],
    },
    {
      name: 'Developer & Web',
      items: [
        {
          id: 'data-converter',
          label: 'Data Format Converter',
          description: language === 'vi' ? 'JSON, CSV, YAML, XML' : 'Bi-directional conversions & validation',
          href: '/data-converter',
          icon: Terminal,
          onClick: () => handleSelectTool('data-converter'),
        },
        {
          id: 'jsonpath-explorer',
          label: 'JSONPath Explorer',
          description: language === 'vi' ? 'Trích xuất dữ liệu JSONPath' : 'Evaluate deep nested JSON queries',
          href: '/jsonpath-explorer',
          icon: Terminal,
          onClick: () => handleSelectTool('jsonpath-explorer'),
        },
        {
          id: 'regex-playground',
          label: 'Regex Playground',
          description: language === 'vi' ? 'Kiểm tra biểu thức chính quy' : 'Interactive regex tester & presets',
          href: '/regex-playground',
          icon: Terminal,
          onClick: () => handleSelectTool('regex-playground'),
        },
        {
          id: 'css-specificity-calculator',
          label: 'CSS Specificity Calculator',
          description: language === 'vi' ? 'Tính độ ưu tiên selector CSS' : 'Compare cascade priority matrices',
          href: '/css-specificity-calculator',
          icon: Globe,
          onClick: () => handleSelectTool('css-specificity-calculator'),
        },
        {
          id: 'html-accessibility-inspector',
          label: 'HTML a11y Inspector',
          description: language === 'vi' ? 'Kiểm tra khả năng tiếp cận WCAG' : 'Static semantic accessibility audit',
          href: '/html-accessibility-inspector',
          icon: Globe,
          onClick: () => handleSelectTool('html-accessibility-inspector'),
        },
        {
          id: 'url-inspector',
          label: 'URL & Query Inspector',
          description: language === 'vi' ? 'Phân tích chi tiết URL & tham số' : 'Deconstruct protocol, path & params',
          href: '/url-inspector',
          icon: Globe,
          onClick: () => handleSelectTool('url-inspector'),
        },
      ],
    },
  ];

  const navItems: HeaderNavItem[] = [
    {
      id: 'nav-study',
      label: language === 'vi' ? 'Study' : 'Study',
      href: 'https://study.4tm.io.vn',
      icon: GraduationCap,
    },
    {
      id: 'nav-ebook',
      label: language === 'vi' ? 'Ebook' : 'Ebook',
      href: 'https://ebook.4tm.io.vn',
      icon: BookOpen,
    },
    {
      id: 'nav-tools',
      label: language === 'vi' ? 'Tools' : 'Tools',
      href: '#workbench',
      icon: Wrench,
      active: true,
      dropdownCategories: toolsDropdownCategories,
    },
    {
      id: 'nav-games',
      label: language === 'vi' ? 'Games' : 'Games',
      href: 'https://games.4tm.io.vn',
      icon: Gamepad2,
    },
  ];

  return (
    <Header
      productId="tools"
      productName="tools"
      navItems={navItems}
      showSearch={false}
      language={language}
      onLanguageChange={onLanguageChange}
      user={user ? { email: user.email, name: user.user_metadata?.full_name } : null}
      onSignIn={onSignIn}
      onSignOut={onSignOut}
      signInLabel={dict.nav.signIn}
      signOutLabel={dict.nav.signOut}
      menuItems={navItems}
    />
  );
};
