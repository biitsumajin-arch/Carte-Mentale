import React, { useState, useEffect } from 'react';
import { Plus, X, Sparkles, BookOpen, Terminal } from 'lucide-react';
import { SoftwareFunction } from '../../types';
import { ToolFunctionsGroup } from '../../data/softwareFunctionsData';

interface AddFunctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableTools: ToolFunctionsGroup[];
  defaultToolId?: string;
  onAddFunction: (newFunction: SoftwareFunction, addToChecklist: boolean) => void;
}

export const AddFunctionModal: React.FC<AddFunctionModalProps> = ({
  isOpen,
  onClose,
  availableTools,
  defaultToolId,
  onAddFunction,
}) => {
  const [selectedToolId, setSelectedToolId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('Logique & Flux');
  const [level, setLevel] = useState<'Débutant' | 'Intermédiaire' | 'Avancé'>('Intermédiaire');
  const [description, setDescription] = useState<string>('');
  const [practicalUseCase, setPracticalUseCase] = useState<string>('');
  const [shortcutOrSyntax, setShortcutOrSyntax] = useState<string>('');
  const [addToChecklist, setAddToChecklist] = useState<boolean>(true);

  useEffect(() => {
    if (defaultToolId) {
      setSelectedToolId(defaultToolId);
    } else if (availableTools.length > 0 && !selectedToolId) {
      setSelectedToolId(availableTools[0].toolId);
    }
  }, [defaultToolId, availableTools, isOpen]);

  if (!isOpen) return null;

  const currentTool = availableTools.find((t) => t.toolId === selectedToolId) || availableTools[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !practicalUseCase.trim() || !currentTool) return;

    const fnId = `fn-custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const newFunction: SoftwareFunction = {
      id: fnId,
      toolId: currentTool.toolId,
      toolName: currentTool.toolName,
      name: name.trim(),
      category: category.trim() || 'Général',
      description: description.trim(),
      level,
      practicalUseCase: practicalUseCase.trim(),
      shortcutOrSyntax: shortcutOrSyntax.trim() || undefined,
    };

    onAddFunction(newFunction, addToChecklist);
    onClose();

    // Reset form
    setName('');
    setDescription('');
    setPracticalUseCase('');
    setShortcutOrSyntax('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Ajouter une Fonction / Compétence
              </h3>
              <p className="text-xs text-slate-300">
                Format standardisé avec cas d'usage professionnel et syntaxe
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Target Tool Selection */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Logiciel Cible <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedToolId}
              onChange={(e) => setSelectedToolId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-semibold cursor-pointer"
              required
            >
              {availableTools.map((tool) => (
                <option key={tool.toolId} value={tool.toolId}>
                  M{tool.moduleNumber} • {tool.toolName} ({tool.category})
                </option>
              ))}
            </select>
          </div>

          {/* Function Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Intitulé de la Fonction <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Formules de calcul conditionnel, Webhook entrant, Lookup relationnel..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-semibold"
            />
          </div>

          {/* Category & Level in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Catégorie Fonctionnelle
              </label>
              <input
                type="text"
                placeholder="Ex: Déclencheurs, Logique, API, Formules..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Niveau de Difficulté
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-semibold cursor-pointer"
              >
                <option value="Débutant">🟢 Débutant</option>
                <option value="Intermédiaire">🟡 Intermédiaire</option>
                <option value="Avancé">🔴 Avancé</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Description Détaillée <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              placeholder="Expliquez le fonctionnement technique, les paramètres requis et ce que produit cette fonction..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Practical Use Case */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Cas d'Usage Professionnel Concret <span className="text-rose-500">*</span></span>
            </label>
            <textarea
              rows={2}
              required
              placeholder="Ex: Synchroniser en temps réel les leads qualifiés vers le CRM commercial et alerter l'équipe sur Slack..."
              value={practicalUseCase}
              onChange={(e) => setPracticalUseCase(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Shortcut / Syntax */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
              <span>Raccourci / Syntaxe / Formule (Optionnel)</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Lookup(Table, ID = RecordID) ou {{formatDate(now; 'DD/MM/YYYY')}}"
              value={shortcutOrSyntax}
              onChange={(e) => setShortcutOrSyntax(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white font-mono text-slate-800"
            />
          </div>

          {/* Checkbox: add to practice list */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                checked={addToChecklist}
                onChange={(e) => setAddToChecklist(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="font-semibold text-indigo-950">
                Ajouter immédiatement cette fonction à "Ma Liste de Travail (Checklist)"
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter la Fonction</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
