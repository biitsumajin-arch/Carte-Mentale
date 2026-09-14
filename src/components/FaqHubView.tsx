import React, { useState, useMemo } from 'react';
import { TrainingProgram } from '../types';
import { HelpCircle, Search, Sparkles, Filter, ChevronRight, ChevronDown } from 'lucide-react';

interface FaqHubViewProps {
  program: TrainingProgram;
  searchQuery: string;
}

export const FaqHubView: React.FC<FaqHubViewProps> = ({ program, searchQuery }) => {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  // Flatten all tools across modules
  const allTools = useMemo(() => {
    const list: Array<{
      tool: NonNullable<NonNullable<TrainingProgram['modules'][0]['topics'][0]['tools']>[0]>;
      moduleNumber: number | string;
      moduleTitle: string;
      topicTitle: string;
    }> = [];

    program.modules.forEach((mod) => {
      mod.topics.forEach((topic) => {
        if (topic.tools) {
          topic.tools.forEach((tool) => {
            list.push({
              tool,
              moduleNumber: mod.number,
              moduleTitle: mod.title,
              topicTitle: topic.title,
            });
          });
        }
      });
    });

    return list;
  }, [program]);

  const effectiveSearch = localSearch || searchQuery;

  const filteredTools = useMemo(() => {
    return allTools.filter((item) => {
      if (selectedModule !== 'all' && item.moduleNumber.toString() !== selectedModule) {
        return false;
      }
      if (selectedTool !== 'all' && item.tool.id !== selectedTool) {
        return false;
      }
      if (effectiveSearch.trim()) {
        const query = effectiveSearch.toLowerCase();
        const matchesName = item.tool.name.toLowerCase().includes(query);
        const matchesCategory = item.tool.category.toLowerCase().includes(query);
        const matchesFaqs = item.tool.faqs.some(
          (f) => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)
        );
        return matchesName || matchesCategory || matchesFaqs;
      }
      return true;
    });
  }, [allTools, selectedModule, selectedTool, effectiveSearch]);

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllInView = () => {
    const state: Record<string, boolean> = {};
    filteredTools.forEach((item) => {
      item.tool.faqs.forEach((faq) => {
        state[faq.id] = true;
      });
    });
    setExpandedFaqs(state);
  };

  const collapseAllInView = () => {
    setExpandedFaqs({});
  };

  const totalQuestions = useMemo(() => {
    return allTools.reduce((acc, curr) => acc + curr.tool.faqs.length, 0);
  }, [allTools]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm text-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Répertoire de Questions Fréquentes & Anticipation
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              FAQ des Outils & Technologies Clés
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              2 à 3 questions essentielles par outil (Make, SharePoint, Power Apps, Power Automate, Cursor, AI Studio, Airtable, Bubble, etc.)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-center">
              <div className="text-xl font-bold text-indigo-400">{allTools.length}</div>
              <div className="text-[11px] text-slate-400 font-medium">Outils catalogués</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-center">
              <div className="text-xl font-bold text-emerald-400">{totalQuestions}</div>
              <div className="text-[11px] text-slate-400 font-medium">Questions & Réponses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Rechercher par question, mot-clé ou technologie (ex: rate limit, délégation, webhook)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Module Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tous les modules (1 à 5)</option>
              {program.modules.map((m) => (
                <option key={m.id} value={m.number.toString()}>
                  Module {m.number} : {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>
            {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} affiché{filteredTools.length > 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={expandAllInView}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Tout déplier
            </button>
            <span>•</span>
            <button
              onClick={collapseAllInView}
              className="text-slate-500 hover:text-slate-800 font-medium"
            >
              Tout replier
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTools.map(({ tool, moduleNumber, moduleTitle, topicTitle }) => (
          <div
            key={tool.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      M{moduleNumber} • {topicTitle}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {tool.name}
                  </h3>
                  <span className="text-xs text-indigo-600 font-medium">{tool.category}</span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-500 bg-indigo-50/70 border border-indigo-100 px-2 py-1 rounded-md">
                    {tool.faqs.length} Questions
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-2">{tool.description}</p>

              {/* Questions List */}
              <div className="mt-4 space-y-2">
                {tool.faqs.map((faq, idx) => {
                  const isExpanded = expandedFaqs[faq.id] ?? true;

                  return (
                    <div
                      key={faq.id}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left p-2.5 flex items-start justify-between gap-2 hover:bg-slate-100/70 transition-colors"
                      >
                        <div className="text-xs font-bold text-slate-800 flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold shrink-0">Q{idx + 1}:</span>
                          <span>{faq.question}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-3 pb-3 pt-1 text-xs text-slate-700 bg-white border-t border-slate-100 pl-6 border-l-2 border-l-indigo-500">
                          <span className="font-semibold text-indigo-700">💡 Réponse : </span>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>Module {moduleNumber} : {moduleTitle}</span>
              <span className="text-indigo-600 font-medium">Programme WinSide</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
