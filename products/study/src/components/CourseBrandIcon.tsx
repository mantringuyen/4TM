import React from 'react';
import { CourseId } from '../types';

interface CourseBrandIconProps {
  courseId: CourseId | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBackground?: boolean;
}

export const getCourseTheme = (courseId: CourseId | string) => {
  switch (courseId) {
    case 'python':
      return {
        name: 'Python',
        primaryColor: '#3776AB',
        secondaryColor: '#FFD43B',
        badgeBg: 'bg-[#3776AB]/15 text-[#3776AB] dark:text-[#5B9BD5] border-[#3776AB]/30',
        gradient: 'from-[#3776AB] to-[#FFD43B]',
        glow: 'shadow-[#3776AB]/20',
        ring: 'ring-[#3776AB]/40',
        accentText: 'text-[#3776AB] dark:text-[#60A5FA]',
        cardBorder: 'hover:border-[#3776AB]/50',
      };
    case 'excel':
      return {
        name: 'Microsoft Excel',
        primaryColor: '#107C41',
        secondaryColor: '#185C37',
        badgeBg: 'bg-[#107C41]/15 text-[#107C41] dark:text-[#34D399] border-[#107C41]/30',
        gradient: 'from-[#107C41] via-[#185C37] to-[#0A5C2B]',
        glow: 'shadow-[#107C41]/20',
        ring: 'ring-[#107C41]/40',
        accentText: 'text-[#107C41] dark:text-[#34D399]',
        cardBorder: 'hover:border-[#107C41]/50',
      };
    case 'sql':
      return {
        name: 'SQL',
        primaryColor: '#00758F',
        secondaryColor: '#0284C7',
        badgeBg: 'bg-[#00758F]/15 text-[#00758F] dark:text-[#38BDF8] border-[#00758F]/30',
        gradient: 'from-[#00758F] to-[#0284C7]',
        glow: 'shadow-[#00758F]/20',
        ring: 'ring-[#00758F]/40',
        accentText: 'text-[#00758F] dark:text-[#38BDF8]',
        cardBorder: 'hover:border-[#00758F]/50',
      };
    case 'html':
      return {
        name: 'HTML5',
        primaryColor: '#E34F26',
        secondaryColor: '#EF652A',
        badgeBg: 'bg-[#E34F26]/15 text-[#E34F26] dark:text-[#F97316] border-[#E34F26]/30',
        gradient: 'from-[#E34F26] to-[#EF652A]',
        glow: 'shadow-[#E34F26]/20',
        ring: 'ring-[#E34F26]/40',
        accentText: 'text-[#E34F26] dark:text-[#FB923C]',
        cardBorder: 'hover:border-[#E34F26]/50',
      };
    case 'css':
      return {
        name: 'CSS3',
        primaryColor: '#1572B6',
        secondaryColor: '#33A9DC',
        badgeBg: 'bg-[#1572B6]/15 text-[#1572B6] dark:text-[#60A5FA] border-[#1572B6]/30',
        gradient: 'from-[#1572B6] to-[#33A9DC]',
        glow: 'shadow-[#1572B6]/20',
        ring: 'ring-[#1572B6]/40',
        accentText: 'text-[#1572B6] dark:text-[#60A5FA]',
        cardBorder: 'hover:border-[#1572B6]/50',
      };
    case 'javascript':
      return {
        name: 'JavaScript',
        primaryColor: '#F7DF1E',
        secondaryColor: '#000000',
        badgeBg: 'bg-amber-400/20 text-amber-700 dark:text-amber-300 border-amber-400/40',
        gradient: 'from-amber-400 to-yellow-500',
        glow: 'shadow-amber-400/20',
        ring: 'ring-amber-400/40',
        accentText: 'text-amber-600 dark:text-amber-400',
        cardBorder: 'hover:border-amber-400/50',
      };
    case 'ai':
      return {
        name: 'AI & Generative Engineering',
        primaryColor: '#8B5CF6',
        secondaryColor: '#6366F1',
        badgeBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
        gradient: 'from-[#8B5CF6] via-[#6366F1] to-[#3B82F6]',
        glow: 'shadow-purple-500/20',
        ring: 'ring-purple-500/40',
        accentText: 'text-purple-600 dark:text-purple-400',
        cardBorder: 'hover:border-purple-500/50',
      };
    case 'powerbi':
    default:
      return {
        name: 'Power BI',
        primaryColor: '#F2C811',
        secondaryColor: '#EAA300',
        badgeBg: 'bg-[#F2C811]/20 text-amber-800 dark:text-amber-300 border-[#F2C811]/40',
        gradient: 'from-[#F2C811] via-[#EAA300] to-[#C98A00]',
        glow: 'shadow-[#F2C811]/20',
        ring: 'ring-[#F2C811]/40',
        accentText: 'text-amber-600 dark:text-amber-400',
        cardBorder: 'hover:border-[#F2C811]/60',
      };
  }
};

export const CourseBrandIcon: React.FC<CourseBrandIconProps> = ({
  courseId,
  className = '',
  size = 'md',
  showBackground = true,
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
    xl: 'w-16 h-16 p-3.5',
    '2xl': 'w-20 h-20 p-4',
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-9 h-9',
    '2xl': 'w-12 h-12',
  }[size];

  const renderLogo = () => {
    switch (courseId) {
      case 'python':
        return (
          // Official Python Dual-Snake Emblem
          <svg viewBox="0 0 128 128" className={`${iconSizes} ${className}`} fill="none">
            <path
              d="M63.4 4c-16.1 0-25.1 6.9-25.1 19.3v14.1h25.7v3.7H28.7C12.6 41.1 4 50.1 4 66.2c0 16.1 8.6 25.1 24.7 25.1h7.8v-11.8c0-8.8 7.3-16.3 16.3-16.3h25.4c7.6 0 13.9-6.3 13.9-13.9V23.3C92.1 10.9 82.5 4 63.4 4zM47.7 14.5c3.2 0 5.8 2.6 5.8 5.8 0 3.2-2.6 5.8-5.8 5.8-3.2 0-5.8-2.6-5.8-5.8 0-3.2 2.6-5.8 5.8-5.8z"
              fill="#3776AB"
            />
            <path
              d="M64.6 124c16.1 0 25.1-6.9 25.1-19.3V90.6H64V86.9h35.3c16.1 0 24.7-9 24.7-25.1 0-16.1-8.6-25.1-24.7-25.1h-7.8v11.8c0 8.8-7.3 16.3-16.3 16.3H49.8c-7.6 0-13.9 6.3-13.9 13.9v26c0 12.4 9.6 19.3 28.7 19.3zM80.3 113.5c-3.2 0-5.8-2.6-5.8-5.8 0-3.2 2.6-5.8 5.8-5.8 3.2 0 5.8 2.6 5.8 5.8 0 3.2-2.6 5.8-5.8 5.8z"
              fill="#FFD43B"
            />
          </svg>
        );

      case 'excel':
        return (
          // Official Microsoft Excel Grid & 'X' Badge Emblem
          <svg viewBox="0 0 32 32" className={`${iconSizes} ${className}`} fill="none">
            {/* Main Green Spreadsheet Table Body */}
            <rect x="7" y="5" width="21" height="22" rx="2.5" fill="#107C41" />
            <path d="M14 5v22M21 5v22M7 11h21M7 16h21M7 21h21" stroke="#21A366" strokeWidth="1" strokeOpacity="0.6" />
            {/* Front Raised 'X' Tile */}
            <rect x="4" y="9" width="13" height="14" rx="2" fill="#185C37" />
            <path
              d="M7.5 12.8L9.7 16l-2.3 3.2h2.2l1.2-2 1.2 2h2.1l-2.3-3.2 2.2-3.2h-2.1L12 14.8l-1.2-2H8.6z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'sql':
        return (
          // Official Relational Database SQL Cylinder Emblem
          <svg viewBox="0 0 24 24" className={`${iconSizes} ${className}`} fill="none" stroke="#00758F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" fill="#00758F" fillOpacity="0.2" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path d="M12 12v3" stroke="#0284C7" />
            <path d="M12 5v4" stroke="#0284C7" />
          </svg>
        );

      case 'html':
        return (
          // Official HTML5 Shield Emblem
          <svg viewBox="0 0 512 512" className={`${iconSizes} ${className}`}>
            <path d="M413.6 450.8L375.4 24.8H136.6L98.4 450.8 256 494.6l157.6-43.8z" fill="#E34F26" />
            <path d="M256 461.5l126.9-35.2 32.5-364.5H256v399.7z" fill="#EF652A" />
            <path d="M256 208.5h-57.1l-3.9-44.5H256v-44.5H146.4l11.7 133.5H256v-44.5zM256 339.2l-.4.1-47.5-12.8-3-34.1h-44.7l5.9 66.8 89.7 24.9v-44.9z" fill="#EBEBEB" />
            <path d="M256 208.5v44.5h53.2l-5 56.4-48.2 13v44.9l89.6-24.9 12.3-133.9H256zm0-89v44.5h105.7l3.9-44.5H256z" fill="#FFFFFF" />
          </svg>
        );

      case 'css':
        return (
          // Official CSS3 Shield Emblem
          <svg viewBox="0 0 512 512" className={`${iconSizes} ${className}`}>
            <path d="M413.6 450.8L375.4 24.8H136.6L98.4 450.8 256 494.6l157.6-43.8z" fill="#1572B6" />
            <path d="M256 461.5l126.9-35.2 32.5-364.5H256v399.7z" fill="#33A9DC" />
            <path d="M256 208.4H198.8l-3.9-44.5H256v-44.5H146.4l11.7 133.5H256v-44.5zM256 339.1l-.4.1-47.5-12.8-3-34.1h-44.7l5.9 66.8 89.7 24.9v-44.9z" fill="#EBEBEB" />
            <path d="M256 208.4h53.2l-5 56.4-48.2 13v44.9l89.6-24.9 12.3-133.9H256v44.5zm0-89h105.7l3.9-44.5H256v44.5z" fill="#FFFFFF" />
          </svg>
        );

      case 'javascript':
        return (
          // Official JavaScript Emblem
          <svg viewBox="0 0 630 630" className={`${iconSizes} ${className}`}>
            <rect width="630" height="630" rx="80" fill="#F7DF1E" />
            <path d="m165.7 477.8c11.9 19.5 28.1 33.9 57.3 33.9 24.3 0 39.8-12.3 39.8-29.4 0-20.5-16.3-27.7-43.7-39.6l-15-6.5c-43.2-18.5-71.8-41.9-71.8-91.8 0-45.7 35.1-80.1 89.9-80.1 38.8 0 66.8 13.9 86.4 48.7l-43.2 27.7c-9.5-16.9-22.1-24.5-43.2-24.5-20.1 0-33.1 12.6-33.1 26.9 0 18.5 13.1 25.7 37.4 36.3l15 6.5c51.9 22.4 80.6 44.9 80.6 95.8 0 54.8-43.1 84.4-97.6 84.4-53.7 0-88.7-27.3-104.9-63.4zm181.7-18.7c10.3 18.2 23.9 31.8 48.9 31.8 20.8 0 34.1-10.4 34.1-25.1 0-17.5-13.8-23.7-37.2-33.8l-12.8-5.5c-36.9-15.8-61.3-35.8-61.3-78.4 0-39 30-68.4 76.8-68.4 33.1 0 57 11.9 73.8 41.6l-36.9 23.7c-8.1-14.4-18.9-20.9-36.9-20.9-17.2 0-28.3 10.7-28.3 22.9 0 15.8 11.2 22 31.9 31l12.8 5.5c44.3 19.1 68.8 38.3 68.8 81.8 0 46.8-36.8 72.1-83.3 72.1-45.9 0-75.7-23.3-89.6-54.1z" fill="#000000" />
          </svg>
        );

      case 'powerbi':
      default:
        return (
          // Official Microsoft Power BI Multi-Tier Bar Chart Emblem
          <svg viewBox="0 0 32 32" className={`${iconSizes} ${className}`} fill="none">
            {/* Background pill / base */}
            <rect x="22" y="6" width="6" height="20" rx="2" fill="#F2C811" />
            <rect x="13" y="11" width="6" height="15" rx="2" fill="#E5A800" />
            <rect x="4" y="16" width="6" height="10" rx="2" fill="#C98A00" />
            <path d="M22 8C22 6.89543 22.8954 6 24 6H26C27.1046 6 28 6.89543 28 8V24C28 25.1046 27.1046 26 26 26H24C22.8954 26 22 25.1046 22 24V8Z" fill="#F2C811" />
            <path d="M13 13C13 11.8954 13.8954 11 15 11H17C18.1046 11 19 11.8954 19 13V24C19 25.1046 18.1046 26 17 26H15C13.8954 26 13 25.1046 13 24V13Z" fill="#EAA300" />
            <path d="M4 18C4 16.8954 4.89543 16 6 16H8C9.10457 16 10 16.8954 10 18V24C10 25.1046 9.10457 26 8 26H6C4.89543 26 4 25.1046 4 24V18Z" fill="#C98A00" />
          </svg>
        );
    }
  };

  if (!showBackground) {
    return <span className="inline-flex items-center justify-center">{renderLogo()}</span>;
  }

  const theme = getCourseTheme(courseId);

  return (
    <div
      className={`rounded-2xl flex items-center justify-center transition-transform shrink-0 ${sizeClasses} ${
        courseId === 'javascript'
          ? 'bg-amber-400/15 border border-amber-400/30'
          : courseId === 'python'
          ? 'bg-[#3776AB]/15 border border-[#3776AB]/30'
          : courseId === 'excel'
          ? 'bg-[#107C41]/15 border border-[#107C41]/30'
          : courseId === 'sql'
          ? 'bg-[#00758F]/15 border border-[#00758F]/30'
          : courseId === 'html'
          ? 'bg-[#E34F26]/15 border border-[#E34F26]/30'
          : courseId === 'css'
          ? 'bg-[#1572B6]/15 border border-[#1572B6]/30'
          : 'bg-[#F2C811]/15 border border-[#F2C811]/30'
      }`}
    >
      {renderLogo()}
    </div>
  );
};
