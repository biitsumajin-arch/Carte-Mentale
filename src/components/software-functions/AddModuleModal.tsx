import React, { useState } from 'react';
import { Layers, X } from 'lucide-react';
import { ToolFunctionsGroup } from '../../data/softwareFunctionsData';

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddModule: (newModule: ToolFunctionsGroup) => void;
}

const MODULE_OPTIONS = [
  { number: 1, title: 'Fondations & Automation', color: 'amber' },
  { number: 2, title: 'Applications & Web', color: 'blue' },
  { number: 3, title: 'Microsoft Power Platform', color: 'purple' },
  { number: 4, title: 'Vibe Coding & Dev IA', color: 'emerald' },
  { number: 5, title: 'Certification & Fil Rouge', color: 'rose' },
];

export const AddModuleModal: React.FC<AddModuleModalProps> = ({
  isOpen,
  onClose,
  onAddModule,
}) => {
  const [selectedModuleNum, setSelectedModuleNum] = useState<number>(1);
  const [customModuleNum, setCustomModuleNum] = useState<string>('');
  const [isCustomModule, setIsCustomModule] = useState<boolean>(false);
  const [moduleTitle, setModuleTitle] = useState<string>('Fondations & Automation');
  const [toolName, setToolName] = useState<string>('');
  const [category, setCategory] = useState<string>('iPaaS & Automatisation');
  const [color, setColor] = useState<string>('amber');
  const [description, setDescription] = useState<string>('');

  if (!isOpen) return null;

  const handleModuleSelect = (num: number) => {
    setIsCustomModule(false);
    setSelectedModuleNum(num);
    const opt = MODULE_OPTIONS.find((m) => m.number === num);
    if (opt) {
      setModuleTitle(opt.title);
      setColor(opt.color);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName.trim()) return;

    const modNum = isCustomModule ? (customModuleNum.trim() || 'X') : selectedModuleNum;
    const toolId = `tool-${toolName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;

    const newGroup: ToolFunctionsGroup = {
      toolId,
      toolName: toolName.trim(),
      category: category.trim() || 'Général',
      moduleNumber: modNum,
      moduleTitle: moduleTitle.trim() || `Module ${modNum}`,
      color,
      iconName: 'Zap',
      description: description.trim() || `Outil et compétences pour le module ${modNum}.`,
      functions: [],
    };

    onAddModule(newGroup);
    onClose();
    // Reset form
    setToolName('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Ajouter un Module / Logiciel
              </h3>
              <p className="text-xs text-slate-300">
                Créez une nouvelle section de logiciel pour le cursus
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
          
          {/* Module Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Module de rattachement
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MODULE_OPTIONS.map((opt) => (
                <button
                  key={opt.number}
                  type="button"
                  onClick={() => handleModuleSelect(opt.number)}
                  className={`p-2 rounded-xl border text-left text-xs transition-all ${
                    !isCustomModule && selectedModuleNum === opt.number
                      ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 font-bold text-indigo-950'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-bold text-indigo-600">M{opt.number}</div>
                  <div className="truncate text-[11px]">{opt.title}</div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setIsCustomModule(true);
                  setModuleTitle('Module Spécifique');
                }}
                className={`p-2 rounded-xl border text-left text-xs transition-all ${
                  isCustomModule
                    ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 font-bold text-indigo-950'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="text-[10px] font-bold text-indigo-600">Autre</div>
                <div className="truncate text-[11px]">Personnalisé</div>
              </button>
            </div>
            {isCustomModule && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Numéro/Code (ex: 6 ou M6)"
                  value={customModuleNum}
                  onChange={(e) => setCustomModuleNum(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/40"
                  required
                />
                <input
                  type="text"
                  placeholder="Titre du module"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/40"
                  required
                />
              </div>
            )}
          </div>

          {/* Tool Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Nom du Logiciel / Outil <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: n8n, Supabase, FlutterFlow, Zapier..."
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-semibold"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Catégorie Métier
            </label>
            <input
              type="text"
              placeholder="Ex: iPaaS & Automatisation, No-Code Apps, Base de données..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Color theme */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Thème Couleur du Badge
            </label>
            <div className="flex items-center gap-2">
              {[
                { id: 'amber', name: 'Ambre / Orange', bg: 'bg-amber-400' },
                { id: 'blue', name: 'Bleu', bg: 'bg-blue-400' },
                { id: 'purple', name: 'Violet', bg: 'bg-purple-400' },
                { id: 'emerald', name: 'Émeraude / Vert', bg: 'bg-emerald-400' },
                { id: 'rose', name: 'Rose / Rouge', bg: 'bg-rose-400' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border transition-all ${
                    color === c.id
                      ? 'border-slate-800 bg-slate-100 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${c.bg}`} />
                  <span className="text-[11px]">{c.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Description Synthétique
            </label>
            <textarea
              rows={2}
              placeholder="Explication claire du rôle du logiciel et de sa valeur ajoutée..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-none"
            />
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
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Créer le Logiciel / Module
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
