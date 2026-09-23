import { ReaderPaperTheme } from '../types';

export interface ReaderThemeTokens {
  // Base Page
  pageBg: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Surfaces
  cardSurface: string;
  innerSurface: string;
  highlightSurface: string;

  // Borders
  borderBase: string;
  borderSubtle: string;
  borderAccent: string;

  // Code Blocks
  codeBg: string;
  codeText: string;
  codeBorder: string;
  codeHeaderBg: string;
  codeHeaderText: string;
  codePreBg: string;
  codePreText: string;
  codeExplanationBg: string;

  // Inline Code
  inlineCodeBg: string;
  inlineCodeText: string;
  inlineCodeBorder: string;

  // Callouts & Highlights
  calloutBg: string;
  calloutBorder: string;
  calloutText: string;

  // Accents & Links
  accentText: string;
  accentBg: string;
  accentBorder: string;

  // Editorial Elements
  numeral: string;
  eyebrow: string;
  abstractBg: string;
  metaText: string;
}

export const READER_THEME_TOKENS: Record<ReaderPaperTheme, ReaderThemeTokens> = {
  default: {
    pageBg: 'bg-[#FFFFFF]',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-700',
    textMuted: 'text-slate-500',

    cardSurface: 'bg-[#F8FAFC]',
    innerSurface: 'bg-white',
    highlightSurface: 'bg-slate-100/80',

    borderBase: 'border-slate-200',
    borderSubtle: 'border-slate-200/60',
    borderAccent: 'border-teal-600',

    codeBg: 'bg-[#F8FAFC]',
    codeText: 'text-slate-800',
    codeBorder: 'border-slate-200',
    codeHeaderBg: 'bg-slate-100',
    codeHeaderText: 'text-slate-600',
    codePreBg: 'bg-[#F8FAFC]',
    codePreText: 'text-slate-800',
    codeExplanationBg: 'bg-slate-50',

    inlineCodeBg: 'bg-slate-100',
    inlineCodeText: 'text-teal-800',
    inlineCodeBorder: 'border-slate-200',

    calloutBg: 'bg-teal-50/50',
    calloutBorder: 'border-teal-200',
    calloutText: 'text-slate-800',

    accentText: 'text-teal-600',
    accentBg: 'bg-teal-50',
    accentBorder: 'border-teal-200',

    numeral: 'text-slate-900',
    eyebrow: 'text-teal-700',
    abstractBg: 'bg-slate-50 border-l-4 border-l-teal-600 text-slate-700',
    metaText: 'text-slate-500',
  },

  sepia: {
    pageBg: 'bg-[#F8F3E6]',
    textPrimary: 'text-[#2C2216]',
    textSecondary: 'text-[#4A3B2C]',
    textMuted: 'text-[#7D6B56]',

    cardSurface: 'bg-[#F0E8D5]',
    innerSurface: 'bg-[#FAF6ED]',
    highlightSurface: 'bg-[#E8DFC9]',

    borderBase: 'border-[#E2D6BC]',
    borderSubtle: 'border-[#EADEC6]',
    borderAccent: 'border-[#8C531B]',

    codeBg: 'bg-[#EDE4CD]',
    codeText: 'text-[#2C2216]',
    codeBorder: 'border-[#DFCAB0]',
    codeHeaderBg: 'bg-[#E5D7BC]',
    codeHeaderText: 'text-[#5C4830]',
    codePreBg: 'bg-[#2A2118]',
    codePreText: 'text-[#F4ECE1]',
    codeExplanationBg: 'bg-[#F2E8D4]',

    inlineCodeBg: 'bg-[#EFE3CA]',
    inlineCodeText: 'text-[#6E3C1B]',
    inlineCodeBorder: 'border-[#DECDB0]',

    calloutBg: 'bg-[#EDE2C9]',
    calloutBorder: 'border-[#DCC8A8]',
    calloutText: 'text-[#3A2D1F]',

    accentText: 'text-[#8C531B]',
    accentBg: 'bg-[#EADDC2]',
    accentBorder: 'border-[#DFC8A4]',

    numeral: 'text-[#2C2216]',
    eyebrow: 'text-[#8C531B]',
    abstractBg: 'bg-[#EDE3D1] border-l-4 border-l-[#8C531B] text-[#433422]',
    metaText: 'text-[#7D6B56]',
  },

  dark: {
    pageBg: 'bg-[#18181B]',
    textPrimary: 'text-zinc-100',
    textSecondary: 'text-zinc-300',
    textMuted: 'text-zinc-400',

    cardSurface: 'bg-zinc-900',
    innerSurface: 'bg-zinc-950/80',
    highlightSurface: 'bg-zinc-800/60',

    borderBase: 'border-zinc-800',
    borderSubtle: 'border-zinc-800/60',
    borderAccent: 'border-teal-500',

    codeBg: 'bg-zinc-900',
    codeText: 'text-zinc-200',
    codeBorder: 'border-zinc-800',
    codeHeaderBg: 'bg-zinc-950',
    codeHeaderText: 'text-zinc-400',
    codePreBg: 'bg-zinc-950',
    codePreText: 'text-zinc-200',
    codeExplanationBg: 'bg-zinc-900/60',

    inlineCodeBg: 'bg-zinc-800/90',
    inlineCodeText: 'text-teal-300',
    inlineCodeBorder: 'border-zinc-700/50',

    calloutBg: 'bg-zinc-900/90',
    calloutBorder: 'border-zinc-700/80',
    calloutText: 'text-zinc-200',

    accentText: 'text-teal-400',
    accentBg: 'bg-teal-950/40',
    accentBorder: 'border-teal-800/50',

    numeral: 'text-zinc-100',
    eyebrow: 'text-teal-400',
    abstractBg: 'bg-zinc-900/90 border-l-4 border-l-teal-500 text-zinc-300',
    metaText: 'text-zinc-400',
  },

  midnight: {
    pageBg: 'bg-[#0B0F19]',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',

    cardSurface: 'bg-[#111827]',
    innerSurface: 'bg-[#070B14]',
    highlightSurface: 'bg-[#1E293B]/60',

    borderBase: 'border-slate-800',
    borderSubtle: 'border-slate-800/60',
    borderAccent: 'border-teal-500',

    codeBg: 'bg-[#060A12]',
    codeText: 'text-slate-200',
    codeBorder: 'border-slate-800',
    codeHeaderBg: 'bg-[#04060C]',
    codeHeaderText: 'text-slate-400',
    codePreBg: 'bg-[#030509]',
    codePreText: 'text-slate-200',
    codeExplanationBg: 'bg-[#0D1527]',

    inlineCodeBg: 'bg-slate-800/90',
    inlineCodeText: 'text-teal-300',
    inlineCodeBorder: 'border-slate-700/50',

    calloutBg: 'bg-[#131D33]',
    calloutBorder: 'border-slate-700/80',
    calloutText: 'text-slate-200',

    accentText: 'text-teal-400',
    accentBg: 'bg-teal-950/40',
    accentBorder: 'border-teal-800/50',

    numeral: 'text-slate-100',
    eyebrow: 'text-teal-400',
    abstractBg: 'bg-[#111827] border-l-4 border-l-teal-500 text-slate-300',
    metaText: 'text-slate-400',
  },
};

export function getReaderThemeTokens(theme: ReaderPaperTheme = 'default'): ReaderThemeTokens {
  return READER_THEME_TOKENS[theme] || READER_THEME_TOKENS.default;
}
