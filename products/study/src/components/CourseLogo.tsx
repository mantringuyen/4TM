import React from 'react';
import { CourseId } from '../types';

interface CourseLogoProps {
  courseId: CourseId | string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const CourseLogo: React.FC<CourseLogoProps> = ({
  courseId,
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  switch (courseId) {
    case 'python':
      return (
        <svg
          viewBox="0 0 128 128"
          className={`${currentSize} ${className} shrink-0 drop-shadow-sm`}
          aria-label="Python Logo"
        >
          <path
            fill="#3776AB"
            d="M63.5 6.3c-23.7 0-22.3 10.3-22.3 10.3l.1 10.6h22.7v3.2H32.6S17 28.6 17 52.2s13.6 22.8 13.6 22.8h8.1v-11.4s-.4-13.6 13.4-13.6h23.1s12.8.2 12.8-12.4V20.1S89.8 6.3 63.5 6.3zm-12.9 7c2.3 0 4.1 1.8 4.1 4.1s-1.8 4.1-4.1 4.1-4.1-1.8-4.1-4.1 1.8-4.1 4.1-4.1z"
          />
          <path
            fill="#FFD43B"
            d="M64.5 121.7c23.7 0 22.3-10.3 22.3-10.3l-.1-10.6H64v-3.2h31.4s15.6 1.8 15.6-21.8-13.6-22.8-13.6-22.8h-8.1v11.4s.4 13.6-13.4 13.6H52.8s-12.8-.2-12.8 12.4v17.5s-1.8 13.8 24.5 13.8zm12.9-7c-2.3 0-4.1-1.8-4.1-4.1s1.8-4.1 4.1-4.1 4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1z"
          />
        </svg>
      );

    case 'sql':
      return (
        <svg
          viewBox="0 0 128 128"
          className={`${currentSize} ${className} shrink-0 drop-shadow-sm`}
          aria-label="SQL Database Logo"
        >
          <defs>
            <linearGradient id="sqlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00758F" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <rect width="128" height="128" rx="28" fill="url(#sqlGrad)" />
          {/* 3 Tier Relational Database Cylinders */}
          <ellipse cx="64" cy="36" rx="40" ry="14" fill="#E0F2FE" />
          <path
            d="M24 36v24c0 7.7 17.9 14 40 14s40-6.3 40-14V36c0 7.7-17.9 14-40 14S24 43.7 24 36z"
            fill="#BAE6FD"
          />
          <path
            d="M24 64v24c0 7.7 17.9 14 40 14s40-6.3 40-14V64c0 7.7-17.9 14-40 14S24 71.7 24 64z"
            fill="#7DD3FC"
          />
          <text
            x="64"
            y="82"
            textAnchor="middle"
            fill="#0C4A6E"
            fontWeight="900"
            fontFamily="monospace"
            fontSize="18"
            letterSpacing="2"
          >
            SQL
          </text>
        </svg>
      );

    case 'html':
      return (
        <svg
          viewBox="0 0 128 128"
          className={`${currentSize} ${className} shrink-0 drop-shadow-sm`}
          aria-label="HTML5 Logo"
        >
          <path fill="#E34F26" d="M19 13l9 101 36 10 36-10 9-101H19z" />
          <path fill="#EF652A" d="M64 22v91.8l27.9-7.7 7.3-84.1H64z" />
          <path
            fill="#ECECEC"
            d="M64 45.4H44.6l1.3 14.5H64v14.4H47.2l1.3 14.5 15.5 4.3v14.9l-28-7.8-3.4-38.3-.3-3.6-.3-3.6h32v-9.3z"
          />
          <path
            fill="#FFFFFF"
            d="M63.9 45.4h19.5l-1.8 20.3H63.9v14.4h15.9l-1.5 16.9-14.4 3.9v14.9l27.9-7.7 3.5-39.7.3-3.6.3-3.6-.1-1.3H63.9v-9.3z"
          />
        </svg>
      );

    case 'css':
      return (
        <svg
          viewBox="0 0 128 128"
          className={`${currentSize} ${className} shrink-0 drop-shadow-sm`}
          aria-label="CSS3 Logo"
        >
          <path fill="#1572B6" d="M19 13l9 101 36 10 36-10 9-101H19z" />
          <path fill="#33A9DC" d="M64 22v91.8l27.9-7.7 7.3-84.1H64z" />
          <path
            fill="#ECECEC"
            d="M64 45.4H43.3l.7 7.3 1.3 14.5H64v-14.4H53.1l-.6-7.4H64v-7.4zm0 33.1H50.8l.9 9.9 12.3 3.3v15.2l-24.8-6.9-1.8-19.8h14.5l.3 3.6 1.8 4.7 10.1-2.7v-7.3z"
          />
          <path
            fill="#FFFFFF"
            d="M63.9 45.4h20.7l-.6 7.4-1.3 14.5H63.9v14.4h13.9l-1.3 14.4-12.6 3.4v15.2l25-6.9.3-3.6 2.8-31.5.3-3.6.3-3.6.6-7.4H63.9v-9.3z"
          />
        </svg>
      );

    case 'javascript':
      return (
        <svg
          viewBox="0 0 128 128"
          className={`${currentSize} ${className} shrink-0 drop-shadow-sm`}
          aria-label="JavaScript Logo"
        >
          <rect width="128" height="128" rx="24" fill="#F7DF1E" />
          <path
            fill="#000000"
            d="M37.6 99.4c3.2 5.1 7.4 9.1 14.9 9.1 6.3 0 10.3-3.1 10.3-7.5 0-5.2-4.1-7.1-11.1-10.1-10-4.3-16.7-9.7-16.7-20.9 0-10.4 8-18.4 20.6-18.4 8.9 0 15.3 3.1 19.8 11.2l-10.6 6.8c-2.3-4.1-4.8-5.8-9.1-5.8-4.2 0-6.9 2.7-6.9 6.2 0 4.3 2.7 6.1 9 8.8 11.7 5 18.9 10 18.9 22.3 0 12.7-9.9 19.5-23.7 19.5-13.4 0-21.5-6.3-26-14.8l10.6-6.4zm54.7 18.5c-4.1 0-7.5-1.5-9.6-5.5l9.4-5.5c1.2 2.1 2.5 3.3 4.9 3.3 2.6 0 4.3-1.1 4.3-5.3V52h13.5v52.6c0 8.6-5 13.3-13.5 13.3h-9z"
          />
        </svg>
      );

    case 'ai':
      return (
        <svg
          viewBox="0 0 128 128"
          className={`${currentSize} ${className} shrink-0 drop-shadow-sm`}
          aria-label="AI Logo"
        >
          <defs>
            <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <rect width="128" height="128" rx="28" fill="url(#aiGrad)" />
          {/* Sparkles / Neural AI Emblem */}
          <path
            d="M64 24C64 46.0914 46.0914 64 24 64C46.0914 64 64 81.9086 64 104C64 81.9086 81.9086 64 104 64C81.9086 64 64 46.0914 64 24Z"
            fill="#FFFFFF"
          />
          <path
            d="M92 28C92 35.732 85.732 42 78 42C85.732 42 92 48.268 92 56C92 48.268 98.268 42 106 42C98.268 42 92 35.732 92 28Z"
            fill="#E0E7FF"
            opacity="0.9"
          />
        </svg>
      );

    default:
      return (
        <div
          className={`${currentSize} ${className} rounded-xl bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-xs`}
        >
          {String(courseId).slice(0, 3).toUpperCase()}
        </div>
      );
  }
};

export interface CourseBrandingInfo {
  id: CourseId;
  name: string;
  badgeText: string;
  pillBg: string;
  pillText: string;
  pillBorder: string;
  gradient: string;
  heroGradient: string;
  lightCardBorder: string;
  darkCardBorder: string;
  iconBg: string;
}

export const getCourseBranding = (courseId: CourseId | string): CourseBrandingInfo => {
  switch (courseId) {
    case 'python':
      return {
        id: 'python',
        name: 'Python',
        badgeText: 'PYTHON 3.11',
        pillBg: 'bg-blue-500/10 dark:bg-[#3776AB]/20',
        pillText: 'text-[#3776AB] dark:text-[#60a5fa]',
        pillBorder: 'border-blue-500/30 dark:border-[#3776AB]/40',
        gradient: 'from-[#3776AB] to-[#FFD43B]',
        heroGradient: 'from-blue-600/20 via-blue-900/10 to-amber-500/10',
        lightCardBorder: 'hover:border-blue-400',
        darkCardBorder: 'hover:border-blue-500/50',
        iconBg: 'bg-blue-50 dark:bg-blue-950/50',
      };
    case 'excel':
      return {
        id: 'excel',
        name: 'Excel',
        badgeText: 'EXCEL FORMULAS & VBA',
        pillBg: 'bg-emerald-500/10 dark:bg-emerald-900/30',
        pillText: 'text-[#107C41] dark:text-emerald-400',
        pillBorder: 'border-emerald-500/30 dark:border-emerald-500/40',
        gradient: 'from-[#107C41] to-[#185C37]',
        heroGradient: 'from-emerald-600/20 via-green-900/10 to-teal-500/10',
        lightCardBorder: 'hover:border-emerald-400',
        darkCardBorder: 'hover:border-emerald-500/50',
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/50',
      };
    case 'sql':
      return {
        id: 'sql',
        name: 'SQL',
        badgeText: 'SQLITE / SQL',
        pillBg: 'bg-sky-500/10 dark:bg-sky-900/30',
        pillText: 'text-sky-600 dark:text-sky-400',
        pillBorder: 'border-sky-500/30 dark:border-sky-500/40',
        gradient: 'from-[#00758F] to-[#0284C7]',
        heroGradient: 'from-sky-600/20 via-cyan-900/10 to-blue-500/10',
        lightCardBorder: 'hover:border-sky-400',
        darkCardBorder: 'hover:border-sky-500/50',
        iconBg: 'bg-sky-50 dark:bg-sky-950/50',
      };
    case 'html':
      return {
        id: 'html',
        name: 'HTML5',
        badgeText: 'HTML5 SEMANTIC',
        pillBg: 'bg-orange-500/10 dark:bg-orange-900/30',
        pillText: 'text-[#E34F26] dark:text-orange-400',
        pillBorder: 'border-orange-500/30 dark:border-orange-500/40',
        gradient: 'from-[#E34F26] to-[#EF652A]',
        heroGradient: 'from-orange-600/20 via-red-900/10 to-amber-500/10',
        lightCardBorder: 'hover:border-orange-400',
        darkCardBorder: 'hover:border-orange-500/50',
        iconBg: 'bg-orange-50 dark:bg-orange-950/50',
      };
    case 'css':
      return {
        id: 'css',
        name: 'CSS3',
        badgeText: 'CSS3 / FLEX / GRID',
        pillBg: 'bg-blue-500/10 dark:bg-blue-900/30',
        pillText: 'text-[#1572B6] dark:text-blue-400',
        pillBorder: 'border-blue-500/30 dark:border-blue-500/40',
        gradient: 'from-[#1572B6] to-[#33A9DC]',
        heroGradient: 'from-blue-600/20 via-blue-900/10 to-cyan-500/10',
        lightCardBorder: 'hover:border-blue-400',
        darkCardBorder: 'hover:border-blue-500/50',
        iconBg: 'bg-blue-50 dark:bg-blue-950/50',
      };
    case 'javascript':
      return {
        id: 'javascript',
        name: 'JavaScript',
        badgeText: 'JAVASCRIPT ES6+',
        pillBg: 'bg-amber-400/20 dark:bg-yellow-500/20',
        pillText: 'text-amber-700 dark:text-yellow-300 font-bold',
        pillBorder: 'border-amber-400/40 dark:border-yellow-500/40',
        gradient: 'from-amber-400 to-yellow-500',
        heroGradient: 'from-amber-600/20 via-yellow-900/10 to-orange-500/10',
        lightCardBorder: 'hover:border-amber-400',
        darkCardBorder: 'hover:border-yellow-500/50',
        iconBg: 'bg-amber-50 dark:bg-yellow-950/50',
      };
    case 'ai':
      return {
        id: 'ai',
        name: 'AI',
        badgeText: 'GEN AI / LLMS / RAG',
        pillBg: 'bg-purple-500/10 dark:bg-purple-900/30',
        pillText: 'text-purple-600 dark:text-purple-400',
        pillBorder: 'border-purple-500/30 dark:border-purple-500/40',
        gradient: 'from-[#8B5CF6] via-[#6366F1] to-[#3B82F6]',
        heroGradient: 'from-purple-600/20 via-indigo-900/10 to-blue-500/10',
        lightCardBorder: 'hover:border-purple-400',
        darkCardBorder: 'hover:border-purple-500/50',
        iconBg: 'bg-purple-50 dark:bg-purple-950/50',
      };
    case 'powerbi':
    default:
      return {
        id: 'powerbi',
        name: 'Power BI',
        badgeText: 'POWER BI / DAX',
        pillBg: 'bg-amber-500/10 dark:bg-amber-900/30',
        pillText: 'text-amber-600 dark:text-amber-400',
        pillBorder: 'border-amber-500/30 dark:border-amber-500/40',
        gradient: 'from-[#F2C811] via-[#EAA300] to-[#C98A00]',
        heroGradient: 'from-amber-600/20 via-yellow-900/10 to-orange-500/10',
        lightCardBorder: 'hover:border-[#F2C811]/60',
        darkCardBorder: 'hover:border-amber-500/50',
        iconBg: 'bg-amber-50 dark:bg-amber-950/50',
      };
  }
};
