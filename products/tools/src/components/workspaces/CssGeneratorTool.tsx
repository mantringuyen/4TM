import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../i18n/translations';
import { CopyButton, ResetButton } from '../common/ActionButtons';
import {
  Layout,
  Grid,
  Box,
  Circle,
  Layers,
  Sparkles,
  Sliders,
  Palette,
  Eye,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface CssGeneratorToolProps {
  language: Language;
}

type GeneratorTab =
  | 'flexbox'
  | 'grid'
  | 'box-shadow'
  | 'border-radius'
  | 'linear-gradient'
  | 'radial-gradient'
  | 'glassmorphism';

export const CssGeneratorTool: React.FC<CssGeneratorToolProps> = ({ language }) => {
  const dict = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<GeneratorTab>('flexbox');

  // --- 1. FLEXBOX STATE ---
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>('space-between');
  const [alignItems, setAlignItems] = useState<'stretch' | 'flex-start' | 'center' | 'flex-end'>('center');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap' | 'wrap-reverse'>('wrap');
  const [flexGap, setFlexGap] = useState<number>(16);
  const [flexItemCount, setFlexItemCount] = useState<number>(4);

  // --- 2. CSS GRID STATE ---
  const [gridCols, setGridCols] = useState<number>(3);
  const [gridRows, setGridRows] = useState<number>(2);
  const [gridColGap, setGridColGap] = useState<number>(16);
  const [gridRowGap, setGridRowGap] = useState<number>(16);
  const [gridJustifyItems, setGridJustifyItems] = useState<'stretch' | 'start' | 'center' | 'end'>('stretch');
  const [gridAlignItems, setGridAlignItems] = useState<'stretch' | 'start' | 'center' | 'end'>('stretch');

  // --- 3. BOX SHADOW STATE ---
  const [shadowX, setShadowX] = useState<number>(0);
  const [shadowY, setShadowY] = useState<number>(12);
  const [shadowBlur, setShadowBlur] = useState<number>(28);
  const [shadowSpread, setShadowSpread] = useState<number>(-4);
  const [shadowColor, setShadowColor] = useState<string>('#0f172a');
  const [shadowOpacity, setShadowOpacity] = useState<number>(0.18);
  const [shadowInset, setShadowInset] = useState<boolean>(false);

  // --- 4. BORDER RADIUS STATE ---
  const [radiusTL, setRadiusTL] = useState<number>(24);
  const [radiusTR, setRadiusTR] = useState<number>(24);
  const [radiusBR, setRadiusBR] = useState<number>(24);
  const [radiusBL, setRadiusBL] = useState<number>(24);
  const [linkedRadius, setLinkedRadius] = useState<boolean>(true);

  // --- 5. LINEAR GRADIENT STATE ---
  const [gradientAngle, setGradientAngle] = useState<number>(135);
  const [gradColor1, setGradColor1] = useState<string>('#10b981');
  const [gradStop1, setGradStop1] = useState<number>(0);
  const [gradColor2, setGradColor2] = useState<string>('#06b6d4');
  const [gradStop2, setGradStop2] = useState<number>(50);
  const [gradColor3, setGradColor3] = useState<string>('#6366f1');
  const [gradStop3, setGradStop3] = useState<number>(100);

  // --- 6. RADIAL GRADIENT STATE ---
  const [radShape, setRadShape] = useState<'circle' | 'ellipse'>('circle');
  const [radColor1, setRadColor1] = useState<string>('#ec4899');
  const [radColor2, setRadColor2] = useState<string>('#8b5cf6');
  const [radColor3, setRadColor3] = useState<string>('#1e1b4b');

  // --- 7. GLASSMORPHISM STATE ---
  const [glassBlur, setGlassBlur] = useState<number>(16);
  const [glassBgOpacity, setGlassBgOpacity] = useState<number>(0.25);
  const [glassBorderOpacity, setGlassBorderOpacity] = useState<number>(0.3);
  const [glassBorderWidth, setGlassBorderWidth] = useState<number>(1);

  // --- GENERATED CODE LOGIC ---
  const { vanillaCss, tailwindCss } = useMemo(() => {
    switch (activeTab) {
      case 'flexbox': {
        const v = `display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
flex-wrap: ${flexWrap};
gap: ${flexGap}px;`;

        const twDirectionMap: Record<string, string> = {
          row: 'flex-row',
          'row-reverse': 'flex-row-reverse',
          column: 'flex-col',
          'column-reverse': 'flex-col-reverse',
        };
        const twJustifyMap: Record<string, string> = {
          'flex-start': 'justify-start',
          center: 'justify-center',
          'flex-end': 'justify-end',
          'space-between': 'justify-between',
          'space-around': 'justify-around',
          'space-evenly': 'justify-evenly',
        };
        const twAlignMap: Record<string, string> = {
          stretch: 'items-stretch',
          'flex-start': 'items-start',
          center: 'items-center',
          'flex-end': 'items-end',
        };
        const twWrapMap: Record<string, string> = {
          nowrap: 'flex-nowrap',
          wrap: 'flex-wrap',
          'wrap-reverse': 'flex-wrap-reverse',
        };
        const tw = `flex ${twDirectionMap[flexDirection]} ${twJustifyMap[justifyContent]} ${twAlignMap[alignItems]} ${twWrapMap[flexWrap]} gap-[${flexGap}px]`;
        return { vanillaCss: v, tailwindCss: tw };
      }

      case 'grid': {
        const v = `display: grid;
grid-template-columns: repeat(${gridCols}, minmax(0, 1fr));
grid-template-rows: repeat(${gridRows}, minmax(0, 1fr));
column-gap: ${gridColGap}px;
row-gap: ${gridRowGap}px;
justify-items: ${gridJustifyItems};
align-items: ${gridAlignItems};`;

        const tw = `grid grid-cols-${gridCols} gap-x-[${gridColGap}px] gap-y-[${gridRowGap}px] justify-items-${gridJustifyItems} items-${gridAlignItems}`;
        return { vanillaCss: v, tailwindCss: tw };
      }

      case 'box-shadow': {
        // Convert hex to rgba
        const r = parseInt(shadowColor.slice(1, 3), 16) || 0;
        const g = parseInt(shadowColor.slice(3, 5), 16) || 0;
        const b = parseInt(shadowColor.slice(5, 7), 16) || 0;
        const rgba = `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
        const compactRgba = `rgba(${r},${g},${b},${shadowOpacity})`;
        const insetStr = shadowInset ? 'inset ' : '';
        const shadowVal = `${insetStr}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${rgba}`;
        const compactShadowVal = `${insetStr}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${compactRgba}`;
        const v = `box-shadow: ${shadowVal};`;
        const tw = `shadow-[${compactShadowVal.trim().replace(/\s+/g, '_')}]`;
        return { vanillaCss: v, tailwindCss: tw };
      }

      case 'border-radius': {
        const v = `border-top-left-radius: ${radiusTL}px;
border-top-right-radius: ${radiusTR}px;
border-bottom-right-radius: ${radiusBR}px;
border-bottom-left-radius: ${radiusBL}px;
/* Shorthand */
border-radius: ${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px;`;
        const tw =
          radiusTL === radiusTR && radiusTR === radiusBR && radiusBR === radiusBL
            ? `rounded-[${radiusTL}px]`
            : `rounded-tl-[${radiusTL}px] rounded-tr-[${radiusTR}px] rounded-br-[${radiusBR}px] rounded-bl-[${radiusBL}px]`;
        return { vanillaCss: v, tailwindCss: tw };
      }

      case 'linear-gradient': {
        const v = `background: linear-gradient(
  ${gradientAngle}deg,
  ${gradColor1} ${gradStop1}%,
  ${gradColor2} ${gradStop2}%,
  ${gradColor3} ${gradStop3}%
);`;
        const tw = `bg-[linear-gradient(${gradientAngle}deg,${gradColor1}_${gradStop1}%,${gradColor2}_${gradStop2}%,${gradColor3}_${gradStop3}%)]`;
        return { vanillaCss: v, tailwindCss: tw };
      }

      case 'radial-gradient': {
        const v = `background: radial-gradient(
  ${radShape} at center,
  ${radColor1} 0%,
  ${radColor2} 55%,
  ${radColor3} 100%
);`;
        const tw = `bg-[radial-gradient(${radShape}_at_center,${radColor1}_0%,${radColor2}_55%,${radColor3}_100%)]`;
        return { vanillaCss: v, tailwindCss: tw };
      }

      case 'glassmorphism': {
        const v = `background: rgba(255, 255, 255, ${glassBgOpacity});
backdrop-filter: blur(${glassBlur}px);
-webkit-backdrop-filter: blur(${glassBlur}px);
border: ${glassBorderWidth}px solid rgba(255, 255, 255, ${glassBorderOpacity});
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);`;
        const tw = `bg-white/[${glassBgOpacity}] backdrop-blur-[${glassBlur}px] border-[${glassBorderWidth}px] border-white/[${glassBorderOpacity}] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]`;
        return { vanillaCss: v, tailwindCss: tw };
      }
    }
  }, [
    activeTab,
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    flexGap,
    gridCols,
    gridRows,
    gridColGap,
    gridRowGap,
    gridJustifyItems,
    gridAlignItems,
    shadowX,
    shadowY,
    shadowBlur,
    shadowSpread,
    shadowColor,
    shadowOpacity,
    shadowInset,
    radiusTL,
    radiusTR,
    radiusBR,
    radiusBL,
    gradientAngle,
    gradColor1,
    gradStop1,
    gradColor2,
    gradStop2,
    gradColor3,
    gradStop3,
    radShape,
    radColor1,
    radColor2,
    radColor3,
    glassBlur,
    glassBgOpacity,
    glassBorderOpacity,
    glassBorderWidth,
  ]);

  const handleRadiusAll = (val: number) => {
    setRadiusTL(val);
    setRadiusTR(val);
    setRadiusBR(val);
    setRadiusBL(val);
  };

  const tabs: { id: GeneratorTab; label: string; icon: any }[] = [
    { id: 'flexbox', label: 'Flexbox', icon: Layout },
    { id: 'grid', label: 'CSS Grid', icon: Grid },
    { id: 'box-shadow', label: 'Box Shadow', icon: Box },
    { id: 'border-radius', label: 'Border Radius', icon: Circle },
    { id: 'linear-gradient', label: 'Linear Gradient', icon: Layers },
    { id: 'radial-gradient', label: 'Radial Gradient', icon: Sparkles },
    { id: 'glassmorphism', label: 'Glassmorphism', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Generator Sub-Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/40'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Controls + Live Preview & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Controls */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-500" />
              <span>Visual Controls</span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">Interactive</span>
          </div>

          {/* 1. FLEXBOX CONTROLS */}
          {activeTab === 'flexbox' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  flex-direction
                </label>
                <select
                  value={flexDirection}
                  onChange={(e) => setFlexDirection(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <option value="row">row</option>
                  <option value="row-reverse">row-reverse</option>
                  <option value="column">column</option>
                  <option value="column-reverse">column-reverse</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  justify-content
                </label>
                <select
                  value={justifyContent}
                  onChange={(e) => setJustifyContent(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <option value="flex-start">flex-start</option>
                  <option value="center">center</option>
                  <option value="flex-end">flex-end</option>
                  <option value="space-between">space-between</option>
                  <option value="space-around">space-around</option>
                  <option value="space-evenly">space-evenly</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  align-items
                </label>
                <select
                  value={alignItems}
                  onChange={(e) => setAlignItems(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <option value="stretch">stretch</option>
                  <option value="flex-start">flex-start</option>
                  <option value="center">center</option>
                  <option value="flex-end">flex-end</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  flex-wrap
                </label>
                <select
                  value={flexWrap}
                  onChange={(e) => setFlexWrap(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <option value="nowrap">nowrap</option>
                  <option value="wrap">wrap</option>
                  <option value="wrap-reverse">wrap-reverse</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>gap ({flexGap}px)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  value={flexGap}
                  onChange={(e) => setFlexGap(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Preview Items</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setFlexItemCount((c) => Math.max(2, c - 1))}
                    className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs w-4 text-center">{flexItemCount}</span>
                  <button
                    type="button"
                    onClick={() => setFlexItemCount((c) => Math.min(8, c + 1))}
                    className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. CSS GRID CONTROLS */}
          {activeTab === 'grid' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Columns ({gridCols})</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={gridCols}
                  onChange={(e) => setGridCols(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Rows ({gridRows})</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={gridRows}
                  onChange={(e) => setGridRows(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Column Gap ({gridColGap}px)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  value={gridColGap}
                  onChange={(e) => setGridColGap(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Row Gap ({gridRowGap}px)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="48"
                  value={gridRowGap}
                  onChange={(e) => setGridRowGap(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  justify-items
                </label>
                <select
                  value={gridJustifyItems}
                  onChange={(e) => setGridJustifyItems(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <option value="stretch">stretch</option>
                  <option value="start">start</option>
                  <option value="center">center</option>
                  <option value="end">end</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  align-items
                </label>
                <select
                  value={gridAlignItems}
                  onChange={(e) => setGridAlignItems(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <option value="stretch">stretch</option>
                  <option value="start">start</option>
                  <option value="center">center</option>
                  <option value="end">end</option>
                </select>
              </div>
            </div>
          )}

          {/* 3. BOX SHADOW CONTROLS */}
          {activeTab === 'box-shadow' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>X Offset ({shadowX}px)</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowX}
                  onChange={(e) => setShadowX(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Y Offset ({shadowY}px)</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowY}
                  onChange={(e) => setShadowY(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Blur Radius ({shadowBlur}px)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Spread Radius ({shadowSpread}px)</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={shadowSpread}
                  onChange={(e) => setShadowSpread(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Shadow Color
                  </label>
                  <input
                    type="color"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-full h-8 rounded-lg cursor-pointer bg-transparent"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Opacity ({Math.round(shadowOpacity * 100)}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={shadowOpacity}
                    onChange={(e) => setShadowOpacity(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="inset-check"
                  type="checkbox"
                  checked={shadowInset}
                  onChange={(e) => setShadowInset(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="inset-check" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Inset Shadow
                </label>
              </div>
            </div>
          )}

          {/* 4. BORDER RADIUS CONTROLS */}
          {activeTab === 'border-radius' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Link All Corners</span>
                <input
                  type="checkbox"
                  checked={linkedRadius}
                  onChange={(e) => setLinkedRadius(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              {linkedRadius ? (
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Uniform Radius ({radiusTL}px)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={radiusTL}
                    onChange={(e) => handleRadiusAll(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span>Top Left ({radiusTL}px)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={radiusTL}
                      onChange={(e) => setRadiusTL(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span>Top Right ({radiusTR}px)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={radiusTR}
                      onChange={(e) => setRadiusTR(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span>Bottom Right ({radiusBR}px)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={radiusBR}
                      onChange={(e) => setRadiusBR(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span>Bottom Left ({radiusBL}px)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={radiusBL}
                      onChange={(e) => setRadiusBL(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. LINEAR GRADIENT CONTROLS */}
          {activeTab === 'linear-gradient' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Angle ({gradientAngle}&deg;)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={gradientAngle}
                  onChange={(e) => setGradientAngle(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Stop 1: {gradColor1} ({gradStop1}%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={gradColor1}
                    onChange={(e) => setGradColor1(e.target.value)}
                    className="w-10 h-7 rounded cursor-pointer bg-transparent"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gradStop1}
                    onChange={(e) => setGradStop1(Number(e.target.value))}
                    className="flex-1 accent-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Stop 2: {gradColor2} ({gradStop2}%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={gradColor2}
                    onChange={(e) => setGradColor2(e.target.value)}
                    className="w-10 h-7 rounded cursor-pointer bg-transparent"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gradStop2}
                    onChange={(e) => setGradStop2(Number(e.target.value))}
                    className="flex-1 accent-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Stop 3: {gradColor3} ({gradStop3}%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={gradColor3}
                    onChange={(e) => setGradColor3(e.target.value)}
                    className="w-10 h-7 rounded cursor-pointer bg-transparent"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gradStop3}
                    onChange={(e) => setGradStop3(Number(e.target.value))}
                    className="flex-1 accent-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 6. RADIAL GRADIENT CONTROLS */}
          {activeTab === 'radial-gradient' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Shape
                </label>
                <select
                  value={radShape}
                  onChange={(e) => setRadShape(e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <option value="circle">circle</option>
                  <option value="ellipse">ellipse</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Inner
                  </label>
                  <input
                    type="color"
                    value={radColor1}
                    onChange={(e) => setRadColor1(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer bg-transparent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Middle
                  </label>
                  <input
                    type="color"
                    value={radColor2}
                    onChange={(e) => setRadColor2(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer bg-transparent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Outer
                  </label>
                  <input
                    type="color"
                    value={radColor3}
                    onChange={(e) => setRadColor3(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 7. GLASSMORPHISM CONTROLS */}
          {activeTab === 'glassmorphism' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Backdrop Blur ({glassBlur}px)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={glassBlur}
                  onChange={(e) => setGlassBlur(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Background Opacity ({Math.round(glassBgOpacity * 100)}%)</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={glassBgOpacity}
                  onChange={(e) => setGlassBgOpacity(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Border Opacity ({Math.round(glassBorderOpacity * 100)}%)</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={glassBorderOpacity}
                  onChange={(e) => setGlassBorderOpacity(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Border Width ({glassBorderWidth}px)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={glassBorderWidth}
                  onChange={(e) => setGlassBorderWidth(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Preview & Generated Code */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Preview Canvas */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-500" />
                <span>Live Interactive Preview</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                60 FPS Render
              </span>
            </div>

            {/* Stage Box */}
            <div className="min-h-[280px] p-6 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden relative">
              {/* Flexbox Stage */}
              {activeTab === 'flexbox' && (
                <div
                  className="w-full h-full min-h-[220px] p-4 rounded-xl border border-dashed border-emerald-500/40 bg-white/60 dark:bg-slate-900/60"
                  style={{
                    display: 'flex',
                    flexDirection: flexDirection,
                    justifyContent: justifyContent,
                    alignItems: alignItems,
                    flexWrap: flexWrap,
                    gap: `${flexGap}px`,
                  }}
                >
                  {Array.from({ length: flexItemCount }).map((_, i) => (
                    <div
                      key={i}
                      className="px-4 py-3 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs shadow-md shadow-emerald-600/20 shrink-0"
                    >
                      Box {i + 1}
                    </div>
                  ))}
                </div>
              )}

              {/* Grid Stage */}
              {activeTab === 'grid' && (
                <div
                  className="w-full h-full min-h-[220px] p-4 rounded-xl border border-dashed border-emerald-500/40 bg-white/60 dark:bg-slate-900/60"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
                    columnGap: `${gridColGap}px`,
                    rowGap: `${gridRowGap}px`,
                    justifyItems: gridJustifyItems,
                    alignItems: gridAlignItems,
                  }}
                >
                  {Array.from({ length: gridCols * gridRows }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs shadow-sm flex items-center justify-center min-h-[48px]"
                    >
                      Cell {i + 1}
                    </div>
                  ))}
                </div>
              )}

              {/* Box Shadow Stage */}
              {activeTab === 'box-shadow' && (
                <div
                  className="w-48 h-36 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-200 transition-all"
                  style={{
                    boxShadow: `${shadowInset ? 'inset ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}${Math.round(
                      shadowOpacity * 255
                    )
                      .toString(16)
                      .padStart(2, '0')}`,
                  }}
                >
                  Shadow Target Card
                </div>
              )}

              {/* Border Radius Stage */}
              {activeTab === 'border-radius' && (
                <div
                  className="w-56 h-40 bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl flex items-center justify-center text-xs font-bold text-white font-mono transition-all"
                  style={{
                    borderTopLeftRadius: `${radiusTL}px`,
                    borderTopRightRadius: `${radiusTR}px`,
                    borderBottomRightRadius: `${radiusBR}px`,
                    borderBottomLeftRadius: `${radiusBL}px`,
                  }}
                >
                  Radius Target
                </div>
              )}

              {/* Linear Gradient Stage */}
              {activeTab === 'linear-gradient' && (
                <div
                  className="w-full h-48 rounded-2xl shadow-lg transition-all"
                  style={{
                    background: `linear-gradient(${gradientAngle}deg, ${gradColor1} ${gradStop1}%, ${gradColor2} ${gradStop2}%, ${gradColor3} ${gradStop3}%)`,
                  }}
                />
              )}

              {/* Radial Gradient Stage */}
              {activeTab === 'radial-gradient' && (
                <div
                  className="w-full h-48 rounded-2xl shadow-lg transition-all"
                  style={{
                    background: `radial-gradient(${radShape} at center, ${radColor1} 0%, ${radColor2} 55%, ${radColor3} 100%)`,
                  }}
                />
              )}

              {/* Glassmorphism Stage */}
              {activeTab === 'glassmorphism' && (
                <div className="w-full h-56 rounded-2xl relative overflow-hidden flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-400 p-6">
                  {/* Background graphic elements */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-cyan-400 blur-sm opacity-80" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-yellow-300 blur-md opacity-70" />

                  {/* Frosted Glass Container */}
                  <div
                    className="w-64 p-5 rounded-2xl shadow-2xl transition-all relative z-10 text-white"
                    style={{
                      background: `rgba(255, 255, 255, ${glassBgOpacity})`,
                      backdropFilter: `blur(${glassBlur}px)`,
                      WebkitBackdropFilter: `blur(${glassBlur}px)`,
                      border: `${glassBorderWidth}px solid rgba(255, 255, 255, ${glassBorderOpacity})`,
                      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <h3 className="font-bold text-sm">Frosted Glass Card</h3>
                    <p className="text-[11px] opacity-90 mt-1">
                      Pure client-side backdrop blur rendered over high-contrast visuals.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Generated Code Snippets */}
          <div className="space-y-4">
            {/* Vanilla CSS Output */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                  Vanilla CSS
                </span>
                <CopyButton text={vanillaCss} label={dict.common.copy} />
              </div>
              <pre className="p-4 font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 bg-slate-50/50 dark:bg-slate-950/40 overflow-x-auto leading-relaxed">
                {vanillaCss}
              </pre>
            </div>

            {/* Tailwind CSS Output */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                  Tailwind CSS
                </span>
                <CopyButton text={tailwindCss} label={dict.common.copy} />
              </div>
              <pre className="p-4 font-mono text-xs sm:text-sm text-cyan-600 dark:text-cyan-400 bg-slate-50/50 dark:bg-slate-950/40 overflow-x-auto leading-relaxed">
                {tailwindCss}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
