import React, { useState } from 'react';
import { TrainingProgram, ModuleItem, TopicItem, ToolItem, StructuredNote } from '../types';
import { NotesMap, getStructuredNote } from '../utils/generators';
import { 
  ChevronDown, 
  ChevronRight, 
  HelpCircle, 
  Edit3, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Laptop, 
  Layers, 
  Sparkles, 
  Tag,
  Maximize2,
  Minimize2,
  Share2,
  AlertCircle,
  HelpCircle as QuestionIcon,
  CheckCircle,
  Info
} from 'lucide-react';

interface MindmapViewProps {
  program: TrainingProgram;
  userNotes: NotesMap;
  onUpdateNote: (id: string, note: StructuredNote | string) => void;
  searchQuery: string;
}

export const MindmapView: React.FC<MindmapViewProps> = ({
  program,
  userNotes,
  onUpdateNote,
  searchQuery,
}) => {
  // Collapsed state map
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});
  const [activeFaqTool, setActiveFaqTool] = useState<string | null>(null);
  const [viewStyle, setViewStyle] = useState<'tree' | 'cards'>('tree');
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);
  const [showGlobalDetails, setShowGlobalDetails] = useState<boolean>(false);

  const toggleModule = (id: string) => {
    setCollapsedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTopic = (id: string) => {
    setCollapsedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setCollapsedModules({});
    setCollapsedTopics({});
  };

  const collapseAll = () => {
    const mods: Record<string, boolean> = {};
    const tops: Record<string, boolean> = {};
    program.modules.forEach((m) => {
      mods[m.id] = true;
      m.topics.forEach((t) => {
        tops[t.id] = true;
      });
    });
    setCollapsedModules(mods);
    setCollapsedTopics(tops);
  };

  const handleStructuredNoteChange = (
    id: string,
    field: 'green' | 'orange' | 'red',
    value: string,
    defaultNotes?: string | StructuredNote
  ) => {
    const current = getStructuredNote(userNotes[id], defaultNotes);
    const updated: StructuredNote = {
      ...current,
      [field]: value,
    };
    onUpdateNote(id, updated);
    setSavedFeedback(`${id}-${field}`);
    setTimeout(() => {
      setSavedFeedback(null);
    }, 1200);
  };

  const getModuleBadgeColor = (color: string) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300/40 dark:border-amber-700/50';
      case 'blue':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-300/40 dark:border-blue-700/50';
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300/40 dark:border-emerald-700/50';
      case 'purple':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300/40 dark:border-purple-700/50';
      case 'rose':
        return 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-300/40 dark:border-rose-700/50';
      default:
        return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300/40 dark:border-indigo-700/50';
    }
  };

  const getModuleAccentBorder = (color: string) => {
    switch (color) {
      case 'amber': return 'border-l-amber-500';
      case 'blue': return 'border-l-blue-500';
      case 'emerald': return 'border-l-emerald-500';
      case 'purple': return 'border-l-purple-500';
      case 'rose': return 'border-l-rose-500';
      default: return 'border-l-indigo-500';
    }
  };

  const filterMatches = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const globalStructuredNote = getStructuredNote(userNotes['global']);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Practical Information Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Sujet Central & Structure Pédagogique
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {program.title}
            </h1>
            <p className="text-slate-300 text-sm">
              {program.subtitle} — Organisé par <strong className="text-indigo-300">{program.organization}</strong>
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="flex items-center gap-2 text-indigo-400 text-xs mb-1">
                <Clock className="w-4 h-4" />
                <span>Volume horaire</span>
              </div>
              <div className="text-lg font-bold text-white">{program.meta.durationHours}h</div>
              <div className="text-[11px] text-slate-400">{program.meta.durationWeeks} semaines</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="flex items-center gap-2 text-purple-400 text-xs mb-1">
                <Calendar className="w-4 h-4" />
                <span>Période</span>
              </div>
              <div className="text-xs font-bold text-white leading-snug">
                {program.meta.startDate}
              </div>
              <div className="text-[11px] text-slate-400">au {program.meta.endDate}</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs mb-1">
                <MapPin className="w-4 h-4" />
                <span>Lieu & Modalité</span>
              </div>
              <div className="text-xs font-bold text-white truncate">Paris 18e & Dist.</div>
              <div className="text-[11px] text-slate-400">Hybride flexible</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs mb-1">
                <Laptop className="w-4 h-4" />
                <span>Prérequis</span>
              </div>
              <div className="text-xs font-bold text-white truncate">PC Portable</div>
              <div className="text-[11px] text-slate-400">Appétence Tech</div>
            </div>
          </div>
        </div>

        {/* Global 3-Box Notes System for Overall Training */}
        <div className="mt-6 pt-5 border-t border-slate-800/90 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-200">
              <Edit3 className="w-4 h-4 text-indigo-400" />
              <span>[📝 Mes notes globales de cadrage - 3 Cases pédagogiques]</span>
            </div>
            <button
              onClick={() => setShowGlobalDetails(!showGlobalDetails)}
              className="text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>{showGlobalDetails ? 'Masquer détails' : 'Afficher les 3 cases globales'}</span>
              {showGlobalDetails ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 transition-all ${showGlobalDetails ? 'block' : 'grid'}`}>
            {/* Global Vert */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 space-y-1.5 focus-within:ring-2 focus-within:ring-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs" />
                  🟢 Vert : Objectifs & Acquis
                </span>
                {savedFeedback === 'global-green' && (
                  <span className="text-[10px] text-emerald-400 font-medium">Enregistré ✓</span>
                )}
              </div>
              <textarea
                rows={2}
                value={globalStructuredNote.green}
                onChange={(e) => handleStructuredNoteChange('global', 'green', e.target.value)}
                placeholder="Objectifs professionnels, compétences clés visées, victoires..."
                className="w-full text-xs bg-slate-900/80 border border-emerald-900/60 rounded-lg p-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Global Orange */}
            <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 space-y-1.5 focus-within:ring-2 focus-within:ring-amber-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs" />
                  🟠 Orange : Vigilance & Calendrier
                </span>
                {savedFeedback === 'global-orange' && (
                  <span className="text-[10px] text-amber-400 font-medium">Enregistré ✓</span>
                )}
              </div>
              <textarea
                rows={2}
                value={globalStructuredNote.orange}
                onChange={(e) => handleStructuredNoteChange('global', 'orange', e.target.value)}
                placeholder="Jalons intermédiaires, révisions, points à surveiller..."
                className="w-full text-xs bg-slate-900/80 border border-amber-900/60 rounded-lg p-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            {/* Global Rouge */}
            <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-3 space-y-1.5 focus-within:ring-2 focus-within:ring-rose-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs" />
                  🔴 Rouge : Risques & Blocages
                </span>
                {savedFeedback === 'global-red' && (
                  <span className="text-[10px] text-rose-400 font-medium">Enregistré ✓</span>
                )}
              </div>
              <textarea
                rows={2}
                value={globalStructuredNote.red}
                onChange={(e) => handleStructuredNoteChange('global', 'red', e.target.value)}
                placeholder="Points de blocage identifiés, questions tuteur..."
                className="w-full text-xs bg-slate-900/80 border border-rose-900/60 rounded-lg p-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mindmap Controls & Display Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">Affichage :</span>
          <button
            onClick={() => setViewStyle('tree')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              viewStyle === 'tree'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Arborescence Complète
          </button>
          <button
            onClick={() => setViewStyle('cards')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              viewStyle === 'cards'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            Grille Synthétique
          </button>
        </div>

        {/* Legend of 3 note boxes */}
        <div className="hidden lg:flex items-center gap-3 text-xs bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-lg">
          <span className="font-semibold text-slate-500 text-[11px]">Cases Notes :</span>
          <span className="flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Vert (Acquis)
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Orange (À approfondir)
          </span>
          <span className="flex items-center gap-1 text-rose-700 font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Rouge (Bloquants)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
          >
            <Maximize2 className="w-3 h-3" />
            Tout déplier
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
          >
            <Minimize2 className="w-3 h-3" />
            Tout replier
          </button>
        </div>
      </div>

      {/* Main Content: Tree View */}
      <div className="space-y-6">
        {program.modules.map((module) => {
          const isModCollapsed = collapsedModules[module.id];
          const hasMatchingTopics = module.topics.some(
            (t) =>
              filterMatches(t.title) ||
              filterMatches(t.summary) ||
              t.keyConcepts.some((c) => filterMatches(c)) ||
              (t.tools && t.tools.some((tl) => filterMatches(tl.name) || filterMatches(tl.description)))
          );

          if (searchQuery && !hasMatchingTopics && !filterMatches(module.title)) {
            return null;
          }

          return (
            <div
              key={module.id}
              className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all ${
                viewStyle === 'tree' ? 'p-1' : 'p-4'
              }`}
            >
              {/* Module Header Bar */}
              <div
                onClick={() => toggleModule(module.id)}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50/80 rounded-xl transition-colors border-l-4 ${getModuleAccentBorder(
                  module.color
                )}`}
              >
                <div className="flex items-center gap-3">
                  <button className="p-1 text-slate-400 hover:text-slate-700">
                    {isModCollapsed ? (
                      <ChevronRight className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getModuleBadgeColor(module.color)}`}>
                        Module {module.number}
                      </span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {module.weeks}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        • {module.duration}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mt-1">
                      {module.title}
                    </h2>
                  </div>
                </div>

                <div className="text-right hidden md:block max-w-sm">
                  <p className="text-xs text-slate-500 italic">
                    {module.description}
                  </p>
                </div>
              </div>

              {/* Module Topics / Items */}
              {!isModCollapsed && (
                <div className="px-4 pb-4 pt-2 space-y-4">
                  {module.topics.map((topic, topicIdx) => {
                    const isTopCollapsed = collapsedTopics[topic.id];
                    const structuredNote = getStructuredNote(userNotes[topic.id], topic.defaultNotes);

                    return (
                      <div
                        key={topic.id}
                        className="relative pl-4 sm:pl-6 border-l-2 border-slate-200 hover:border-indigo-400 transition-colors ml-2 sm:ml-4"
                      >
                        {/* Connecting bullet / dot */}
                        <div className="absolute -left-[7px] top-4 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white shadow-xs" />

                        <div className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3">
                          
                          {/* Topic Title and Summary */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-indigo-600">
                                  Item {topicIdx + 1}
                                </span>
                                <h3 className="text-base font-bold text-slate-800">
                                  {topic.title}
                                </h3>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {topic.summary}
                              </p>
                            </div>

                            <button
                              onClick={() => toggleTopic(topic.id)}
                              className="text-xs text-slate-400 hover:text-slate-700 p-1"
                              title="Replier/Déplier"
                            >
                              {isTopCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>

                          {!isTopCollapsed && (
                            <>
                              {/* Key concepts pill tags */}
                              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                <span className="text-[11px] font-semibold text-slate-500 mr-1 flex items-center gap-1">
                                  <Tag className="w-3 h-3" />
                                  Concepts :
                                </span>
                                {topic.keyConcepts.map((concept, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[11px] font-medium bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md"
                                  >
                                    {concept}
                                  </span>
                                ))}
                              </div>

                              {/* 3 Dedicated Note-taking Boxes: Vert, Orange, Rouge */}
                              <div className="space-y-2 pt-2 border-t border-slate-200/70">
                                <div className="flex items-center justify-between">
                                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                                    <span>[📝 Mes notes : 3 Niveaux de suivi]</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {structuredNote.green.trim() && (
                                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                                        🟢 Acquis
                                      </span>
                                    )}
                                    {structuredNote.orange.trim() && (
                                      <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded">
                                        🟠 À revoir
                                      </span>
                                    )}
                                    {structuredNote.red.trim() && (
                                      <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-1.5 py-0.5 rounded">
                                        🔴 Bloquant
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                                  {/* Case 1: Vert */}
                                  <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-xl p-2.5 space-y-1 transition-all focus-within:ring-2 focus-within:ring-emerald-400 focus-within:bg-emerald-50/90">
                                    <div className="flex items-center justify-between">
                                      <label className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                                        <span>🟢 Case Verte : Acquis / Maîtrisé</span>
                                      </label>
                                      {savedFeedback === `${topic.id}-green` && (
                                        <span className="text-[9px] text-emerald-700 font-medium">✓</span>
                                      )}
                                    </div>
                                    <textarea
                                      rows={2}
                                      value={structuredNote.green}
                                      onChange={(e) =>
                                        handleStructuredNoteChange(topic.id, 'green', e.target.value, topic.defaultNotes)
                                      }
                                      placeholder="Points clés bien compris, astuces retenues, acquis..."
                                      className="w-full text-xs text-slate-800 bg-white/95 border border-emerald-200 rounded p-2 focus:outline-none focus:bg-white resize-y"
                                    />
                                  </div>

                                  {/* Case 2: Orange */}
                                  <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-2.5 space-y-1 transition-all focus-within:ring-2 focus-within:ring-amber-400 focus-within:bg-amber-50/90">
                                    <div className="flex items-center justify-between">
                                      <label className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                                        <Info className="w-3 h-3 text-amber-600" />
                                        <span>🟠 Case Orange : À approfondir</span>
                                      </label>
                                      {savedFeedback === `${topic.id}-orange` && (
                                        <span className="text-[9px] text-amber-700 font-medium">✓</span>
                                      )}
                                    </div>
                                    <textarea
                                      rows={2}
                                      value={structuredNote.orange}
                                      onChange={(e) =>
                                        handleStructuredNoteChange(topic.id, 'orange', e.target.value, topic.defaultNotes)
                                      }
                                      placeholder="Notions à réviser, vigilance, détails à éclaircir..."
                                      className="w-full text-xs text-slate-800 bg-white/95 border border-amber-200 rounded p-2 focus:outline-none focus:bg-white resize-y"
                                    />
                                  </div>

                                  {/* Case 3: Rouge */}
                                  <div className="bg-rose-50/70 border border-rose-200/90 rounded-xl p-2.5 space-y-1 transition-all focus-within:ring-2 focus-within:ring-rose-400 focus-within:bg-rose-50/90">
                                    <div className="flex items-center justify-between">
                                      <label className="text-[11px] font-bold text-rose-900 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3 text-rose-600" />
                                        <span>🔴 Case Rouge : Bloquants</span>
                                      </label>
                                      {savedFeedback === `${topic.id}-red` && (
                                        <span className="text-[9px] text-rose-700 font-medium">✓</span>
                                      )}
                                    </div>
                                    <textarea
                                      rows={2}
                                      value={structuredNote.red}
                                      onChange={(e) =>
                                        handleStructuredNoteChange(topic.id, 'red', e.target.value, topic.defaultNotes)
                                      }
                                      placeholder="Points bloquants, questions à poser au tuteur..."
                                      className="w-full text-xs text-slate-800 bg-white/95 border border-rose-200 rounded p-2 focus:outline-none focus:bg-white resize-y"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Tools & FAQs Section */}
                              {topic.tools && topic.tools.length > 0 && (
                                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                                    <span>Outils mentionnés & Questions fréquentes (FAQ) :</span>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {topic.tools.map((tool) => (
                                      <ToolFaqCard
                                        key={tool.id}
                                        tool={tool}
                                        isActive={activeFaqTool === tool.id}
                                        onToggle={() =>
                                          setActiveFaqTool(activeFaqTool === tool.id ? null : tool.id)
                                        }
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

interface ToolFaqCardProps {
  tool: ToolItem;
  isActive: boolean;
  onToggle: () => void;
}

const ToolFaqCard: React.FC<ToolFaqCardProps> = ({ tool, isActive, onToggle }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-sm transition-all">
      <div
        onClick={onToggle}
        className="p-3 cursor-pointer hover:bg-slate-50 flex items-start justify-between gap-2"
      >
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-900">{tool.name}</h4>
            <span className="text-[10px] font-medium bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded border border-indigo-100">
              {tool.category}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{tool.description}</p>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50/80 px-2 py-0.5 rounded-full border border-indigo-100/80 min-w-max">
          <span>{tool.faqs.length} FAQs</span>
          {isActive ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </div>
      </div>

      {isActive && (
        <div className="bg-slate-50/90 border-t border-slate-100 p-3 space-y-2.5">
          {tool.faqs.map((faq, idx) => (
            <div key={faq.id} className="bg-white border border-slate-200/80 rounded-lg p-2.5 space-y-1">
              <div className="text-xs font-bold text-slate-800 flex items-start gap-1.5">
                <span className="text-indigo-600 font-bold">Q{idx + 1}:</span>
                <span>{faq.question}</span>
              </div>
              <div className="text-xs text-slate-600 pl-4 border-l-2 border-indigo-300">
                <span className="font-semibold text-slate-700">💡 Réponse : </span>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

