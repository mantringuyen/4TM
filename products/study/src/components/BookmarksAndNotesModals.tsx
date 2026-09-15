import React from 'react';
import { 
  Bookmark, 
  FileText, 
  X, 
  Trash2, 
  ArrowRight, 
  BookOpen,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { UserProfile, CourseId, LevelId } from '../types';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onNavigateLesson: (courseId: CourseId, levelId: LevelId, lessonId: string) => void;
  onRemoveBookmark: (lessonId: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  user,
  onNavigateLesson,
  onRemoveBookmark,
}) => {
  const { dict, language } = useLanguage();
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 dark:bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">{dict.nav.bookmarks} ({user.bookmarks.length})</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {user.bookmarks.length > 0 ? (
          <div className="space-y-2.5">
            {user.bookmarks.map(bm => (
              <div
                key={bm.lessonId}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-sm"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {typeof bm.lessonTitle === 'object' ? (bm.lessonTitle[language] || bm.lessonTitle.en) : (bm.lessonTitle || bm.lessonId)}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500 uppercase mt-0.5">
                    {bm.courseId} • {bm.levelId}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onNavigateLesson(bm.courseId, bm.levelId, bm.lessonId);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(bm.lessonId)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-slate-500">
            No bookmarks saved yet. Click the bookmark button in any lesson to save it here!
          </div>
        )}
      </div>
    </div>
  );
};

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onNavigateLesson: (lessonId: string) => void;
  onDeleteNote: (lessonId: string) => void;
}

export const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  user,
  onNavigateLesson,
  onDeleteNote,
}) => {
  const { dict } = useLanguage();
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 dark:bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">{dict.nav.notes} ({user.notes.length})</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {user.notes.length > 0 ? (
          <div className="space-y-3">
            {user.notes.map(note => (
              <div
                key={note.lessonId}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                    Lesson: {note.lessonId}
                  </span>
                  <button
                    onClick={() => onDeleteNote(note.lessonId)}
                    className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 p-1 cursor-pointer"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-300 whitespace-pre-wrap font-mono bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  {note.content}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                  <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => {
                      onNavigateLesson(note.lessonId);
                      onClose();
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <span>Go to Lesson</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-slate-500">
            No study notes taken yet. Open any lesson and click the Notes button to record key points!
          </div>
        )}
      </div>
    </div>
  );
};
