import React, { useState } from 'react';
import { SlidersHorizontal, Eye, EyeOff, Search, RotateCcw } from 'lucide-react';
import { ToolFunctionsGroup } from '../../data/softwareFunctionsData';
import { PracticeItem } from '../../types';

interface ManageVisibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  catalog: ToolFunctionsGroup[];
  hiddenToolIds: string[];
  practiceList: PracticeItem[];
  applyVisibilityToChecklist: boolean;
  onToggleToolVisibility: (toolId: string) => void;
  onShowAllTools: () => void;
  onHideAllTools: () => void;
  onSetApplyVisibilityToChecklist: (val: boolean) => void;
  onResetToDefaultCatalog?: () => void;
}

export const ManageVisibilityModal: React.FC<ManageVisibilityModalProps> = ({
  isOpen,
  onClose,
  catalog,
  hiddenToolIds,
  practiceList,
  applyVisibilityToChecklist,
  onToggleToolVisibility,
  onShowAllTools,
  onHideAllTools,
  onSetApplyVisibilityToChecklist,
  onResetToDefaultCatalog,
}) => {
  const [visibilityModalSearch, setVisibilityModalSearch] = useState<string>('');
  const [visibilityModalModuleFilter, setVisibilityModalModuleFilter] = useState<string>('all');

  if (!isOpen) return null;

  const totalToolsCount = catalog.length;
  const visibleToolsCount = totalToolsCount - hiddenToolIds.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">
                  Afficher / Masquer les Logiciels
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/40">
                  {visibleToolsCount} / {totalToolsCount} visibles
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Personnalisez votre tableau de bord en choisissant les logiciels à afficher dans le catalogue et la checklist.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Quick Actions & Filters Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-3">
          
          {/* Top Quick Buttons & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            
            {/* Bulk Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onShowAllTools}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                <span>Tout afficher ({totalToolsCount})</span>
              </button>
              <button
                onClick={onHideAllTools}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <EyeOff className="w-3.5 h-3.5 text-rose-600" />
                <span>Tout masquer</span>
              </button>
              {onResetToDefaultCatalog && (
                <button
                  onClick={onResetToDefaultCatalog}
                  className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 hover:bg-amber-50 text-amber-900 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  title="Restaurer le catalogue initial officiel"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                  <span>Réinitialiser catalogue</span>
                </button>
              )}
            </div>

            {/* Filter Search inside modal */}
            <div className="relative w-full sm:w-60">
              <input
                type="text"
                value={visibilityModalSearch}
                onChange={(e) => setVisibilityModalSearch(e.target.value)}
                placeholder="Chercher un logiciel..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800 placeholder-slate-400"
              />
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              {visibilityModalSearch && (
                <button
                  onClick={() => setVisibilityModalSearch('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Module Filter Pills within modal */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
            <span className="text-[11px] font-bold text-slate-500 mr-1 whitespace-nowrap">
              Module :
            </span>
            <button
              onClick={() => setVisibilityModalModuleFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                visibilityModalModuleFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Tous les modules
            </button>
            {[
              { id: '1', name: 'M1 Fondations' },
              { id: '2', name: 'M2 Apps & Web' },
              { id: '3', name: 'M3 Power Platform' },
              { id: '4', name: 'M4 Vibe Coding / IA' },
              { id: '5', name: 'M5 Certification' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setVisibilityModalModuleFilter(m.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  visibilityModalModuleFilter === m.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

        </div>

        {/* Software List Container (Scrollable) */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[50vh] space-y-3 scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {catalog
              .filter((tool) => {
                if (visibilityModalModuleFilter !== 'all' && String(tool.moduleNumber) !== visibilityModalModuleFilter) {
                  return false;
                }
                if (visibilityModalSearch.trim()) {
                  const q = visibilityModalSearch.toLowerCase();
                  const matchName = tool.toolName.toLowerCase().includes(q);
                  const matchCategory = tool.category.toLowerCase().includes(q);
                  const matchDesc = tool.description.toLowerCase().includes(q);
                  return matchName || matchCategory || matchDesc;
                }
                return true;
              })
              .map((tool) => {
                const isHidden = hiddenToolIds.includes(tool.toolId);
                const isVisible = !isHidden;
                const countInPractice = practiceList.filter(
                  (p) => p.toolName === tool.toolName || p.toolId === tool.toolId
                ).length;

                return (
                  <div
                    key={tool.toolId}
                    onClick={() => onToggleToolVisibility(tool.toolId)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between gap-3 ${
                      isVisible
                        ? 'bg-white hover:bg-indigo-50/40 border-slate-200 hover:border-indigo-300 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        tool.color === 'emerald'
                          ? 'bg-emerald-100 text-emerald-800'
                          : tool.color === 'amber'
                          ? 'bg-amber-100 text-amber-800'
                          : tool.color === 'purple'
                          ? 'bg-purple-100 text-purple-800'
                          : tool.color === 'blue'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        M{tool.moduleNumber}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {tool.toolName}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            {tool.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {tool.functions.length} fonctions disponibles
                          {countInPractice > 0 && ` • ${countInPractice} dans la liste`}
                        </p>
                      </div>
                    </div>

                    {/* Toggle Button Badge */}
                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleToolVisibility(tool.toolId);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isVisible
                            ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {isVisible ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                            <span>Masqué</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          {/* Option: sync with checklist */}
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 select-none">
            <input
              type="checkbox"
              checked={applyVisibilityToChecklist}
              onChange={(e) => onSetApplyVisibilityToChecklist(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <span className="font-semibold">
              Appliquer également ces masquages à l'onglet "Ma Liste de Travail (Checklist)"
            </span>
          </label>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs transition-colors self-end sm:self-center"
          >
            Valider & Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
