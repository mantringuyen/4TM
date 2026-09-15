import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Table as TableIcon, 
  GitFork, 
  FunctionSquare, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Filter, 
  Database, 
  ArrowRight,
  TrendingUp, 
  DollarSign, 
  PieChart as PieIcon, 
  Sparkles,
  Info,
  ChevronRight,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  sampleDataModel, 
  evaluateDaxExpression, 
  DaxEvaluationResult,
  DataTable,
  ModelRelationship 
} from '../services/daxEngine';

interface PowerBiWorkspaceProps {
  initialDax?: string;
  targetTask?: string;
  expectedValue?: number | string;
  onSuccess?: () => void;
  height?: string;
  showAllTabs?: boolean;
}

export const PowerBiWorkspace: React.FC<PowerBiWorkspaceProps> = ({
  initialDax = 'Total Sales = SUM(Sales[Revenue])',
  targetTask,
  expectedValue,
  onSuccess,
  height = '520px',
  showAllTabs = true,
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'report' | 'data' | 'model' | 'dax'>('report');
  const [selectedTable, setSelectedTable] = useState<string>('Sales');
  const [daxFormula, setDaxFormula] = useState<string>(initialDax);
  const [daxResult, setDaxResult] = useState<DaxEvaluationResult | null>(() => evaluateDaxExpression(initialDax));
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('All');
  const [activeSegmentFilter, setActiveSegmentFilter] = useState<string>('All');
  const [userCreatedMeasures, setUserCreatedMeasures] = useState<Array<{ name: string; formula: string; value: number | string | boolean }>>([
    { name: 'Total Sales', formula: 'SUM(Sales[Revenue])', value: 8584.0 },
    { name: 'Total Profit', formula: 'SUM(Sales[Profit])', value: 2988.0 },
    { name: 'Total Orders', formula: 'COUNTROWS(Sales)', value: 10 },
  ]);

  // Handle DAX evaluation
  const handleRunDax = () => {
    const res = evaluateDaxExpression(daxFormula);
    setDaxResult(res);

    if (res.isSuccess && res.scalarValue !== undefined && res.measureName) {
      setUserCreatedMeasures(prev => {
        const filtered = prev.filter(m => m.name !== res.measureName);
        return [...filtered, { name: res.measureName!, formula: res.expression, value: res.scalarValue! }];
      });

      if (expectedValue !== undefined && onSuccess) {
        if (typeof expectedValue === 'number' && typeof res.scalarValue === 'number') {
          if (Math.abs(expectedValue - res.scalarValue) < 0.01) {
            onSuccess();
          }
        } else if (String(res.scalarValue).toLowerCase() === String(expectedValue).toLowerCase()) {
          onSuccess();
        }
      }
    }
  };

  // Filtered dataset for Report view visuals
  const filteredSalesData = useMemo(() => {
    let data = [...sampleDataModel.tables.Sales.data];
    if (selectedRegionFilter !== 'All') {
      data = data.filter(d => d.Region === selectedRegionFilter);
    }
    if (activeSegmentFilter !== 'All') {
      const validCustomerIds = sampleDataModel.tables.Customers.data
        .filter(c => c.Segment === activeSegmentFilter)
        .map(c => c.CustomerID);
      data = data.filter(d => validCustomerIds.includes(d.CustomerID));
    }
    return data;
  }, [selectedRegionFilter, activeSegmentFilter]);

  // Aggregate KPI Metrics dynamically
  const kpis = useMemo(() => {
    const revenue = filteredSalesData.reduce((sum, r) => sum + r.Revenue, 0);
    const profit = filteredSalesData.reduce((sum, r) => sum + r.Profit, 0);
    const orders = filteredSalesData.length;
    const avgOrderValue = orders > 0 ? revenue / orders : 0;
    const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

    return {
      revenue,
      profit,
      orders,
      avgOrderValue,
      profitMargin,
    };
  }, [filteredSalesData]);

  // Regional breakdown
  const regionalSales = useMemo(() => {
    const map: Record<string, number> = {};
    filteredSalesData.forEach(r => {
      map[r.Region] = (map[r.Region] || 0) + r.Revenue;
    });
    return Object.entries(map).map(([region, rev]) => ({ region, rev }));
  }, [filteredSalesData]);

  // Product Category breakdown
  const categorySales = useMemo(() => {
    const map: Record<string, number> = {};
    filteredSalesData.forEach(r => {
      const prod = sampleDataModel.tables.Products.data.find(p => p.ProductID === r.ProductID);
      const cat = prod?.Category || 'Other';
      map[cat] = (map[cat] || 0) + r.Revenue;
    });
    return Object.entries(map).map(([category, rev]) => ({ category, rev }));
  }, [filteredSalesData]);

  const currentTableData: DataTable = sampleDataModel.tables[selectedTable] || sampleDataModel.tables.Sales;

  return (
    <div 
      className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 flex flex-col shadow-xl overflow-hidden font-sans transition-colors"
      style={{ minHeight: height }}
    >
      {/* Top Power BI App Bar */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/90 flex flex-wrap items-center justify-between gap-3 transition-colors">
        <div className="flex items-center gap-3">
          {/* Power BI Multi-Bar Icon */}
          <div className="w-7 h-7 rounded-lg bg-[#F2C811]/15 border border-[#F2C811]/40 flex items-center justify-center shadow-inner">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <rect x="17" y="4" width="4" height="16" rx="1" fill="#F2C811" />
              <rect x="10" y="8" width="4" height="12" rx="1" fill="#EAA300" />
              <rect x="3" y="13" width="4" height="7" rx="1" fill="#C98A00" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Power BI Interactive Studio</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#F2C811]/20 text-amber-800 dark:text-[#F2C811] border border-amber-500/30 dark:border-[#F2C811]/30 font-semibold">
                Live Data Engine
              </span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs (Report, Data, Model, DAX) */}
        <div className="flex items-center bg-slate-200/70 dark:bg-slate-900 p-1 rounded-xl border border-slate-300/70 dark:border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'report'
                ? 'bg-[#F2C811] text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Báo Cáo (Report)' : 'Report View'}</span>
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'data'
                ? 'bg-[#F2C811] text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Dữ Liệu (Data)' : 'Data View'}</span>
          </button>

          <button
            onClick={() => setActiveTab('model')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'model'
                ? 'bg-[#F2C811] text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Mô Hình (Model)' : 'Model View'}</span>
          </button>

          <button
            onClick={() => setActiveTab('dax')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'dax'
                ? 'bg-[#F2C811] text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
            }`}
          >
            <FunctionSquare className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Hàm DAX (Studio)' : 'DAX Studio'}</span>
          </button>
        </div>
      </div>

      {/* Target Task Banner if provided */}
      {targetTask && (
        <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between transition-colors">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span><strong>{language === 'vi' ? 'Nhiệm Vụ Thực Hành:' : 'Practice Objective:'}</strong> {targetTask}</span>
          </div>
          {expectedValue !== undefined && (
            <span className="font-mono text-[11px] bg-amber-500/20 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded border border-amber-500/30">
              Target: {expectedValue}
            </span>
          )}
        </div>
      )}

      {/* Main Workspace Body */}
      <div className="flex-1 p-4 overflow-y-auto">
        
        {/* ======================= TAB 1: REPORT VIEW ======================= */}
        {activeTab === 'report' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Top Interactive Slicers / Filters Bar */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#F2C811]" />
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                  {language === 'vi' ? 'Bộ Lọc Tương Tác (Slicers)' : 'Interactive Slicers'}:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Region Slicer */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600 dark:text-slate-400">Region:</span>
                  <select
                    value={selectedRegionFilter}
                    onChange={(e) => setSelectedRegionFilter(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:border-[#F2C811]"
                  >
                    <option value="All">All Regions (4)</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="Central">Central</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </select>
                </div>

                {/* Customer Segment Slicer */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600 dark:text-slate-400">Segment:</span>
                  <select
                    value={activeSegmentFilter}
                    onChange={(e) => setActiveSegmentFilter(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-none focus:border-[#F2C811]"
                  >
                    <option value="All">All Segments (3)</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Consumer">Consumer</option>
                    <option value="Small Business">Small Business</option>
                  </select>
                </div>

                {(selectedRegionFilter !== 'All' || activeSegmentFilter !== 'All') && (
                  <button
                    onClick={() => {
                      setSelectedRegionFilter('All');
                      setActiveSegmentFilter('All');
                    }}
                    className="text-[11px] text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Visual KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-1">
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">Total Revenue</span>
                <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-[#F2C811]">
                  ${kpis.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <TrendingUp className="w-3 h-3" /> DAX: SUM(Sales[Revenue])
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-1">
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">Total Profit</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  ${kpis.profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Margin: {kpis.profitMargin.toFixed(1)}%</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-1">
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">Orders Count</span>
                <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-300">{kpis.orders}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">COUNTROWS(Sales)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-1">
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">Avg Order Value</span>
                <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-300">
                  ${kpis.avgOrderValue.toFixed(1)}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">DIVIDE(Revenue, Orders)</span>
              </div>
            </div>

            {/* Visual Charts Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Regional Clustered Bar Chart */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
                    <span>Revenue by Sales Region</span>
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Clustered Bar Visual</span>
                </div>

                <div className="space-y-2 pt-1">
                  {regionalSales.map(({ region, rev }) => {
                    const maxRev = Math.max(...regionalSales.map(r => r.rev), 1);
                    const pct = Math.round((rev / maxRev) * 100);
                    return (
                      <div key={region} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-700 dark:text-slate-300">{region}</span>
                          <span className="text-amber-700 dark:text-[#F2C811] font-bold">${rev.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-[#F2C811] transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Breakdown Donut / Proportions */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <PieIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Revenue by Product Category</span>
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Relationship: Products[Category]</span>
                </div>

                <div className="space-y-2 pt-1">
                  {categorySales.map(({ category, rev }, idx) => {
                    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'];
                    const color = colors[idx % colors.length];
                    const pct = kpis.revenue > 0 ? ((rev / kpis.revenue) * 100).toFixed(1) : '0';

                    return (
                      <div key={category} className="p-2 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${color}`} />
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{category}</span>
                        </div>
                        <div className="font-mono text-right">
                          <span className="font-bold text-slate-900 dark:text-slate-100">${rev.toLocaleString()}</span>
                          <span className="text-slate-500 dark:text-slate-400 text-[10px] ml-2">({pct}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick DAX Measure Calculator Bar inside Report */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <FunctionSquare className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
                <span>Want to write custom measures? Switch to <strong>DAX Studio</strong> tab anytime.</span>
              </div>
              <button
                onClick={() => setActiveTab('dax')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer border border-slate-200 dark:border-transparent"
              >
                <span>Open DAX Studio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ======================= TAB 2: DATA / TABLE VIEW ======================= */}
        {activeTab === 'data' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Table Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Select Table Dataset:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.keys(sampleDataModel.tables).map(tName => (
                  <button
                    key={tName}
                    onClick={() => setSelectedTable(tName)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedTable === tName
                        ? 'bg-[#F2C811] text-slate-950 font-extrabold'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {tName} ({sampleDataModel.tables[tName].data.length})
                  </button>
                ))}
              </div>
            </div>

            {/* Table Grid Display */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {currentTableData.columns.map(col => (
                      <th key={col} className="p-2.5 font-bold uppercase text-[11px] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{col}</span>
                          <span className="text-[9px] font-normal text-amber-700 dark:text-amber-400/80 lowercase px-1.5 py-0.5 rounded bg-amber-500/10 dark:bg-slate-800 border border-amber-500/20 dark:border-transparent">
                            {currentTableData.types[col] || 'text'}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                  {currentTableData.data.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                      {currentTableData.columns.map(col => (
                        <td key={col} className="p-2.5 whitespace-nowrap">
                          {typeof row[col] === 'number' && (col.toLowerCase().includes('price') || col.toLowerCase().includes('revenue') || col.toLowerCase().includes('cost') || col.toLowerCase().includes('profit'))
                            ? `$${Number(row[col]).toFixed(2)}`
                            : String(row[col] ?? 'NULL')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================= TAB 3: MODEL / RELATIONSHIP VIEW ======================= */}
        {activeTab === 'model' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <GitFork className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
                <span>Star Schema Data Model & Cardinality</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Visual representation of relationships between Fact (Sales) and Dimension tables (Customers, Products, Calendar).
              </p>
            </div>

            {/* Model Diagram Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dimension: Customers */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border-2 border-blue-500/40 space-y-2 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Dim_Customers (1)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300">Dimension</span>
                </div>
                <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400">
                  <div className="text-amber-600 dark:text-amber-400 font-bold">🔑 CustomerID (PK)</div>
                  <div>CustomerName</div>
                  <div>Segment</div>
                  <div>City, Country</div>
                </div>
              </div>

              {/* Fact: Sales (Center) */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border-2 border-[#F2C811]/70 space-y-2 shadow-lg shadow-[#F2C811]/10">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-amber-700 dark:text-[#F2C811]">Fact_Sales (*)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F2C811]/20 text-amber-800 dark:text-[#F2C811]">Fact Table</span>
                </div>
                <div className="text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
                  <div className="text-slate-500 dark:text-slate-400">OrderID (PK)</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">🔗 CustomerID (FK) &rarr; Dim_Customers</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">🔗 ProductID (FK) &rarr; Dim_Products</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">🔗 OrderDate (FK) &rarr; Dim_Calendar</div>
                  <div>Quantity, UnitPrice, Discount</div>
                  <div className="text-amber-700 dark:text-amber-300 font-bold">Revenue, Cost, Profit</div>
                </div>
              </div>

              {/* Dimension: Products */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border-2 border-emerald-500/40 space-y-2 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Dim_Products (1)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">Dimension</span>
                </div>
                <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-slate-400">
                  <div className="text-amber-600 dark:text-amber-400 font-bold">🔑 ProductID (PK)</div>
                  <div>ProductName</div>
                  <div>Category, SubCategory</div>
                  <div>UnitCost, UnitPrice</div>
                </div>
              </div>
            </div>

            {/* Relationships Table List */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">Active Relationships Configured:</h5>
              <div className="space-y-2">
                {sampleDataModel.relationships.map(rel => (
                  <div key={rel.id} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-700 dark:text-[#F2C811] font-bold">{rel.fromTable}[{rel.fromColumn}]</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{rel.toTable}[{rel.toColumn}]</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px]">Cardinality: {rel.cardinality}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px]">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 4: DAX STUDIO / FORMULA BUILDER ======================= */}
        {activeTab === 'dax' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Quick Formula Starters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Quick Templates:</span>
              <button
                onClick={() => setDaxFormula('Total Sales = SUM(Sales[Revenue])')}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent text-xs font-mono cursor-pointer"
              >
                SUM(Sales[Revenue])
              </button>
              <button
                onClick={() => setDaxFormula('High Revenue Orders = CALCULATE(SUM(Sales[Revenue]), Sales[Region] = "North")')}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent text-xs font-mono cursor-pointer"
              >
                CALCULATE(North Region)
              </button>
              <button
                onClick={() => setDaxFormula('Profit Margin = DIVIDE(SUM(Sales[Profit]), SUM(Sales[Revenue]), 0)')}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent text-xs font-mono cursor-pointer"
              >
                DIVIDE Profit Margin
              </button>
              <button
                onClick={() => setDaxFormula('Total Units Sold = SUMX(Sales, Sales[Quantity])')}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-transparent text-xs font-mono cursor-pointer"
              >
                SUMX Iterator
              </button>
            </div>

            {/* DAX Formula Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FunctionSquare className="w-3.5 h-3.5 text-amber-600 dark:text-[#F2C811]" />
                  <span>DAX Formula Expression Bar:</span>
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Supports SUM, CALCULATE, DIVIDE, SUMX, FILTER, TOTALYTD</span>
              </div>

              <div className="flex gap-2">
                <textarea
                  value={daxFormula}
                  onChange={(e) => setDaxFormula(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                      e.preventDefault();
                      handleRunDax();
                    }
                  }}
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  spellCheck={false}
                  data-gramm="false"
                  rows={3}
                  placeholder="Enter DAX measure, e.g.: Total Sales = SUM(Sales[Revenue])"
                  className="code-runner-textarea flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-[#F2C811] rounded-xl p-3 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none resize-none leading-relaxed"
                />

                <button
                  onClick={handleRunDax}
                  className="px-5 py-3 rounded-xl bg-[#F2C811] hover:bg-[#e2bb0f] text-slate-950 font-extrabold text-xs flex flex-col items-center justify-center gap-1 shadow-lg shadow-[#F2C811]/20 cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Evaluate</span>
                </button>
              </div>
            </div>

            {/* DAX Output Display */}
            {daxResult && (
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border ${
                  daxResult.isSuccess 
                    ? 'bg-emerald-50/70 dark:bg-slate-950 border-emerald-500/40 text-slate-800 dark:text-slate-200' 
                    : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-400 dark:border-rose-500/50 text-rose-900 dark:text-rose-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {daxResult.isSuccess ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Info className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      )}
                      <span className="text-xs font-mono font-bold uppercase">
                        {daxResult.isSuccess ? 'DAX Evaluation Successful' : 'DAX Evaluation Error'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      {daxResult.executionTimeMs}ms
                    </span>
                  </div>

                  <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto text-slate-800 dark:text-slate-300">
                    {daxResult.formattedOutput}
                  </pre>

                  {daxResult.breakdown && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs space-y-1 text-slate-600 dark:text-slate-400">
                      <div className="font-bold text-slate-800 dark:text-slate-300">Execution Diagnostics:</div>
                      <div>&bull; Table Evaluated: <span className="text-amber-600 dark:text-amber-300 font-semibold">{daxResult.breakdown.tableUsed}</span></div>
                      <div>&bull; Rows Computed: <span className="text-blue-600 dark:text-blue-300 font-semibold">{daxResult.breakdown.rowsEvaluated}</span></div>
                      {daxResult.breakdown.filtersApplied.length > 0 && (
                        <div>&bull; Filter Context: {daxResult.breakdown.filtersApplied.join(', ')}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Measures in Model Table */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">Model Measures Pool ({userCreatedMeasures.length}):</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {userCreatedMeasures.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-amber-700 dark:text-[#F2C811] flex items-center gap-1">
                      <FunctionSquare className="w-3 h-3" />
                      <span>[{m.name}]</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">{m.formula}</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{typeof m.value === 'number' ? `$${m.value.toLocaleString()}` : String(m.value)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
