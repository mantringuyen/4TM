import React from 'react';
import { CourseId, UserProfile } from '../types';
import { CourseCatalogSection } from './CourseCatalogSection';
import { useLanguage } from '../i18n/LanguageContext';

interface CoursesListProps {
  user: UserProfile;
  onNavigate: (view: string, payload?: any) => void;
  onSelectCourse?: (courseId: CourseId) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const CoursesList: React.FC<CoursesListProps> = ({
  user,
  onNavigate,
  onSelectCourse,
  searchQuery,
  onSearchChange,
}) => {
  const { dict } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in">
      <CourseCatalogSection
        user={user}
        onNavigate={onNavigate}
        onSelectCourse={onSelectCourse}
        initialSearchQuery={searchQuery}
        onSearchChange={onSearchChange}
        headingText={dict.home.coursesHeading}
        subheadingText={dict.home.coursesSubheading}
        showSectionHeader={true}
      />
    </div>
  );
};
