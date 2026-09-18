import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Users, 
  Plus, 
  Sparkles, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Database,
  BarChart3,
  Clock,
  Ban,
  Search,
  RefreshCw,
  MailCheck,
  AlertCircle,
  Settings,
  Megaphone,
  Globe,
  Radio,
  ToggleLeft,
  ToggleRight,
  Zap,
  Crown
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { allCourses } from '../data/coursesData';
import { CostAndSecurityAuditor } from './CostAndSecurityAuditor';
import { 
  fetchLearnerProfiles, 
  adminSetUserStatus, 
  adminSetUserAdFree, 
  LearnerSummary, 
  getCurrentUser, 
  isDemoUser 
} from '../services/storageService';
import { supabase } from '../services/supabase';
import { 
  fetchSystemSettings, 
  adminUpdateSystemSetting, 
  subscribeSystemSettings, 
  SystemSettings, 
  DEFAULT_SYSTEM_SETTINGS 
} from '@shared';
import { AccountStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const { t, dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'courses' | 'questions' | 'learners' | 'settings' | 'auditor'>('courses');

  const currentUser = getCurrentUser();
  // DEV-ONLY Admin Demo Security Guard:
  // In production builds, Admin Demo is blocked. Real admin access requires authenticated Supabase session with active status.
  const isAuthorized = import.meta.env.DEV
    ? currentUser.role === 'admin'
    : (currentUser.role === 'admin' && currentUser.status === 'active' && !isDemoUser(currentUser));

  // Learners state
  const [learners, setLearners] = useState<LearnerSummary[]>([]);
  const [loadingLearners, setLoadingLearners] = useState(false);
  const [learnerFilter, setLearnerFilter] = useState<'all' | AccountStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // System Settings & Ads State
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(DEFAULT_SYSTEM_SETTINGS);
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  const loadSettings = async () => {
    setLoadingSettings(true);
    try {
      const s = await fetchSystemSettings(supabase);
      setSystemSettings(s);
    } catch (err) {
      console.error('Failed to load system settings:', err);
    } finally {
      setLoadingSettings(false);
    }
  };

  useEffect(() => {
    loadSettings();
    const unsub = subscribeSystemSettings((newSettings) => {
      setSystemSettings(newSettings);
    });
    return () => unsub();
  }, []);

  const handleUpdateSetting = async (key: keyof SystemSettings, val: any) => {
    setUpdatingKey(key);
    setActionMessage(null);
    try {
      const res = await adminUpdateSystemSetting(supabase, key, val);
      if (res.success) {
        setSystemSettings(prev => ({ ...prev, [key]: val }));
        setActionMessage({
          text: `Setting "${key}" successfully saved to database.`,
          type: 'success'
        });
      } else {
        setActionMessage({
          text: res.error || `Failed to update ${key}.`,
          type: 'error'
        });
      }
    } catch (err: any) {
      setActionMessage({
        text: err?.message || 'Failed to update setting.',
        type: 'error'
      });
    } finally {
      setUpdatingKey(null);
    }
  };

  const handleToggleProductAd = async (productKey: 'study' | 'ebook' | 'tools' | 'games' | 'apps' | 'root') => {
    const updatedProducts = {
      ...systemSettings.ads_products,
      [productKey]: !systemSettings.ads_products[productKey]
    };
    await handleUpdateSetting('ads_products', updatedProducts);
  };

  const handleToggleAdFree = async (userId: string, currentAdFree: boolean) => {
    setActionMessage(null);
    const newAdFree = !currentAdFree;
    const res = await adminSetUserAdFree(userId, newAdFree);
    if (res.success) {
      setActionMessage({
        text: `Learner ad-free entitlement updated to ${newAdFree ? 'VIP Ad-Free' : 'Standard'}.`,
        type: 'success'
      });
      await loadLearners();
    } else {
      setActionMessage({
        text: res.error || 'Failed to update ad-free status.',
        type: 'error'
      });
    }
  };

  const loadLearners = async () => {
    if (!isAuthorized) return;
    setLoadingLearners(true);
    try {
      const data = await fetchLearnerProfiles();
      setLearners(data);
    } catch (err) {
      console.error('Failed to load learners:', err);
    } finally {
      setLoadingLearners(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'learners') {
      loadLearners();
    }
  }, [activeTab]);

  const handleStatusChange = async (userId: string, newStatus: AccountStatus) => {
    setActionMessage(null);
    const res = await adminSetUserStatus(userId, newStatus);
    if (res.success) {
      setActionMessage({ 
        text: `User status successfully updated to ${newStatus}.`, 
        type: 'success' 
      });
      // Refresh list
      await loadLearners();
    } else {
      setActionMessage({ 
        text: res.error || 'Failed to update user status.', 
        type: 'error' 
      });
    }
  };

  // Compute platform statistics
  let totalLessons = 0;
  let totalQuestions = 0;
  allCourses.forEach(c => {
    Object.values(c.levels).forEach(lvl => {
      lvl.modules.forEach(m => {
        totalLessons += m.lessons.length;
        m.lessons.forEach(l => {
          totalQuestions += l.quizQuestionPool?.length || 10;
        });
      });
    });
  });

  const pendingCount = learners.filter(l => l.status === 'pending_approval').length;

  const filteredLearners = learners.filter(l => {
    const matchesFilter = learnerFilter === 'all' ? true : l.status === learnerFilter;
    const matchesSearch = 
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-500" />
          <h2 className="text-base font-bold mb-1">Access Restricted</h2>
          <p className="text-xs">Platform Admin is only accessible to verified administrators in production.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Dev-Only Demo Mode Indicator */}
      {import.meta.env.DEV && isDemoUser(currentUser) && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
              DEV MODE
            </span>
            <span>
              <strong>Platform Admin Demo:</strong> Local simulated interface isolated from Supabase production.
            </span>
          </div>
          <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400">
            Storage: demo_admin namespace
          </span>
        </div>
      )}

      {/* Admin Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-100 to-slate-100 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 border border-amber-200 dark:border-amber-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono uppercase font-bold text-amber-700 dark:text-amber-400">
              Admin & CMS Dashboard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {dict.admin.title}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {dict.admin.subtitle}
          </p>
        </div>

        {/* Quick Top Stats */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
            <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">{dict.admin.statsCourses}</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{allCourses.length}</p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
            <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">{dict.admin.tabs.lessons}</p>
            <p className="text-xl font-black text-blue-600 dark:text-blue-400">{totalLessons}</p>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
            <p className="text-[10px] font-mono uppercase text-slate-500 font-bold">{dict.admin.tabs.questionBank}</p>
            <p className="text-xl font-black text-amber-600 dark:text-amber-400">{totalQuestions}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'courses'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{dict.admin.tabs.courses}</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'questions'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{dict.admin.tabs.questionBank}</span>
        </button>

        <button
          onClick={() => setActiveTab('learners')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'learners'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{dict.admin.tabs.approvals}</span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Global Controls & Ads</span>
        </button>

        <button
          onClick={() => setActiveTab('auditor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'auditor'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{dict.admin.tabs.auditor}</span>
        </button>
      </div>

      {/* Tab 1: Course Management */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Curriculum Tracks</h3>
            <button className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              <span>{dict.admin.createCourse}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allCourses.map(c => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${c.accentBg}`}>
                      {c.id}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">{t(c.title)}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">{t(c.tagline)}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>3 Levels (Basic / Int / Adv)</span>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Questions Bank */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{dict.admin.tabs.questionBank}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Manage 10-question pools per lesson with auto-verification.</p>
            </div>
            <button className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              <span>{dict.admin.createLesson}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
            <p className="font-bold text-slate-900 dark:text-slate-200">50+ Validated Questions Loaded in In-Memory Bank</p>
            <p className="mt-1">All questions include strict answer indices, bilingual translations, and concept explanations.</p>
          </div>
        </div>
      )}

      {/* Tab 3: Learners & Approval Management */}
      {activeTab === 'learners' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{dict.admin.approvalsTitle}</span>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 font-semibold">
                    {pendingCount} Pending Approval
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {dict.admin.approvalsSubtitle}
              </p>
            </div>

            <button 
              onClick={loadLearners}
              disabled={loadingLearners}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingLearners ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {actionMessage && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              actionMessage.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300'
            }`}>
              {actionMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{actionMessage.text}</span>
            </div>
          )}

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button
                onClick={() => setLearnerFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  learnerFilter === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All ({learners.length})
              </button>
              <button
                onClick={() => setLearnerFilter('pending_approval')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  learnerFilter === 'pending_approval'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Pending Approval ({learners.filter(l => l.status === 'pending_approval').length})
              </button>
              <button
                onClick={() => setLearnerFilter('active')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  learnerFilter === 'active'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Active ({learners.filter(l => l.status === 'active').length})
              </button>
              <button
                onClick={() => setLearnerFilter('suspended')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  learnerFilter === 'suspended'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Suspended ({learners.filter(l => l.status === 'suspended').length})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by email or name..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Learners Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-950/60 text-[11px] font-mono uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Learner</th>
                    <th className="py-3 px-4">Email Verification</th>
                    <th className="py-3 px-4">Account Status</th>
                    <th className="py-3 px-4">Ad-Free Entitlement</th>
                    <th className="py-3 px-4">Joined / Approved</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredLearners.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                        No learners found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLearners.map(learner => {
                      const isPending = learner.status === 'pending_approval';
                      const isActive = learner.status === 'active';
                      const isSuspended = learner.status === 'suspended';
                      const isAdFree = Boolean(learner.ad_free);

                      return (
                        <tr key={learner.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900 dark:text-white">{learner.displayName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{learner.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            {learner.emailVerified ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Verified</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Pending OTP</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                                Active
                              </span>
                            )}
                            {isPending && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                                Pending Approval
                              </span>
                            )}
                            {isSuspended && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800">
                                Suspended
                              </span>
                            )}
                            {learner.status === 'pending_verification' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                Unverified
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleAdFree(learner.id, isAdFree)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                                isAdFree
                                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700 hover:bg-amber-500/20'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                              }`}
                              title={isAdFree ? 'Click to revoke VIP Ad-Free' : 'Click to grant VIP Ad-Free'}
                            >
                              <Crown className={`w-3 h-3 ${isAdFree ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                              <span>{isAdFree ? 'VIP Ad-Free' : 'Standard'}</span>
                            </button>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px]">
                            <div>{new Date(learner.createdAt).toLocaleDateString()}</div>
                            {learner.approvedAt && (
                              <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                                Approved {new Date(learner.approvedAt).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {learner.role === 'admin' ? (
                                <span className="text-[11px] font-mono text-slate-400 italic">System Admin</span>
                              ) : (
                                <>
                                  {!isActive && (
                                    <button
                                      onClick={() => handleStatusChange(learner.id, 'active')}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                                    >
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>{dict.admin.approveBtn}</span>
                                    </button>
                                  )}

                                  {!isSuspended && (
                                    <button
                                      onClick={() => handleStatusChange(learner.id, 'suspended')}
                                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Ban className="w-3 h-3" />
                                      <span>{dict.admin.suspendBtn}</span>
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: System Settings & Global Ad Controls */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>4TM Ecosystem System Settings & Policies</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Centralized database policies, public registration gates, and global advertising networks across all 4TM products.
              </p>
            </div>

            <button
              onClick={loadSettings}
              disabled={loadingSettings}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingSettings ? 'animate-spin' : ''}`} />
              <span>Refresh Settings</span>
            </button>
          </div>

          {actionMessage && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              actionMessage.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300'
            }`}>
              {actionMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{actionMessage.text}</span>
            </div>
          )}

          {/* Setting 1: Public Registration Control */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    AUTH GATEWAY
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Public User Registration</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Enforces global sign-up availability across all 4TM applications. Guarded database-side by Supabase triggers.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  systemSettings.public_registration_enabled
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                }`}>
                  {systemSettings.public_registration_enabled ? 'OPEN (Active)' : 'CLOSED (Locked)'}
                </span>

                <button
                  type="button"
                  id="toggle-public-registration-btn"
                  disabled={updatingKey === 'public_registration_enabled'}
                  onClick={() => handleUpdateSetting('public_registration_enabled', !systemSettings.public_registration_enabled)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                    systemSettings.public_registration_enabled
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                  }`}
                >
                  {systemSettings.public_registration_enabled ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  <span>{systemSettings.public_registration_enabled ? 'Lock Registration' : 'Enable Public Registration'}</span>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Security Architecture Note:</p>
              <p>
                When registration is locked (<code className="font-mono text-purple-600 dark:text-purple-400">false</code>), sign-up requests are rejected at both the UI boundary and directly inside the database via <code className="font-mono text-purple-600 dark:text-purple-400">auth.users</code> trigger. Existing users and manual admin invitations remain operational.
              </p>
            </div>
          </div>

          {/* Setting 2: Global Ad Network System */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    4TM ADS ENGINE
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Master Advertising Network</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Global non-intrusive ad unit mounted above footers. Automatically bypassed for VIP Ad-Free learners.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  systemSettings.ads_enabled
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}>
                  {systemSettings.ads_enabled ? 'GLOBAL ON' : 'GLOBAL OFF'}
                </span>

                <button
                  type="button"
                  id="toggle-master-ads-btn"
                  disabled={updatingKey === 'ads_enabled'}
                  onClick={() => handleUpdateSetting('ads_enabled', !systemSettings.ads_enabled)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                    systemSettings.ads_enabled
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                  }`}
                >
                  {systemSettings.ads_enabled ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  <span>{systemSettings.ads_enabled ? 'Disable All Ads' : 'Enable Ad System'}</span>
                </button>
              </div>
            </div>

            {/* Per-Product Granular Controls */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Per-Product Display Matrix
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {(['study', 'ebook', 'tools', 'games', 'apps', 'root'] as const).map((prod) => {
                  const isEnabled = systemSettings.ads_products?.[prod] !== false;
                  return (
                    <div
                      key={prod}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isEnabled
                          ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40'
                          : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-60'
                      }`}
                    >
                      <span className="text-[11px] font-mono font-bold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                        {prod}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleProductAd(prod)}
                        className={`w-full py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                          isEnabled
                            ? 'bg-blue-600 text-white hover:bg-blue-500'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300'
                        }`}
                      >
                        {isEnabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ad Provider & Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-900 dark:text-white block">
                  Ad Provider Engine
                </label>
                <select
                  value={systemSettings.ad_provider}
                  onChange={(e) => handleUpdateSetting('ad_provider', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="custom_house_ads">4TM Custom House Campaigns (Internal Network)</option>
                  <option value="google_adsense">Google AdSense Responsive Unit</option>
                </select>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Custom house ads cross-promote 4TM ecosystem products with zero third-party tracking.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-900 dark:text-white block">
                  House Ads Active Campaign
                </label>
                <select
                  value={systemSettings.custom_ad_campaign}
                  onChange={(e) => handleUpdateSetting('custom_ad_campaign', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="auto_rotate">Auto Rotate All Campaigns (Study, Ebook, Tools)</option>
                  <option value="study_pro">Study Pro: Interactive WASM Python & SQL Track</option>
                  <option value="ebook_hub">4TM Ebook: 54 Engineering Handbooks</option>
                  <option value="developer_tools">DevTools: Fast Developer Utilities & Formatters</option>
                </select>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select a targeted product campaign or allow smart automatic rotation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Cost & Security Auditor */}
      {activeTab === 'auditor' && (
        <CostAndSecurityAuditor />
      )}

    </div>
  );
};
