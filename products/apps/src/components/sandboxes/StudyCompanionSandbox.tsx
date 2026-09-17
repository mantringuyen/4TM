import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { Language } from '../../types';

export const StudyCompanionSandbox: React.FC<{ language: Language }> = ({ language }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [completedSessions, setCompletedSessions] = useState(0);

  const [tasks, setTasks] = useState([
    { id: '1', text: 'Read Python Tips chapter on Star Unpacking', done: true },
    { id: '2', text: 'Solve 2 algorithm challenges in Study LMS', done: false },
    { id: '3', text: 'Inspect Supabase SSO ticket headers', done: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((s) => s - 1);
        } else if (minutes > 0) {
          setMinutes((m) => m - 1);
          setSeconds(59);
        } else {
          // Timer finished
          setIsActive(false);
          if (mode === 'focus') {
            setCompletedSessions((c) => c + 1);
            setMode('break');
            setMinutes(5);
            setSeconds(0);
          } else {
            setMode('focus');
            setMinutes(25);
            setSeconds(0);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (newMode: 'focus' | 'break' = 'focus') => {
    setIsActive(false);
    setMode(newMode);
    setMinutes(newMode === 'focus' ? 25 : 5);
    setSeconds(0);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newTaskText.trim(), done: false },
    ]);
    setNewTaskText('');
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
      {/* Timer Display */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase">
          <span>{mode === 'focus' ? 'Deep-Work Focus' : 'Short Break'}</span>
          <span>&bull;</span>
          <span>{completedSessions} Sessions Finished</span>
        </div>

        <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        {/* Timer Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={toggleTimer}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 transition-all cursor-pointer ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause' : 'Start Focus'}</span>
          </button>

          <button
            type="button"
            onClick={() => resetTimer(mode)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Task Checklist */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Session Learning Goals ({tasks.filter((t) => t.done).length}/{tasks.length})
        </span>

        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
            >
              <div
                onClick={() => toggleTask(task.id)}
                className="flex items-center gap-2 cursor-pointer flex-1 select-none mr-2"
              >
                {task.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span
                  className={
                    task.done
                      ? 'line-through text-slate-400'
                      : 'text-slate-700 dark:text-slate-200 font-medium'
                  }
                >
                  {task.text}
                </span>
              </div>

              <button
                type="button"
                onClick={() => removeTask(task.id)}
                className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add new study goal..."
            className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>
      </div>
    </div>
  );
};
