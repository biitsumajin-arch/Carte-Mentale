import React, { useState } from 'react';
import { TrainingProgram } from '../types';
import { generatePlantUMLCode, NotesMap } from '../utils/generators';
import { Copy, Check, Download, Binary, ExternalLink, Info } from 'lucide-react';

interface PlantUMLViewProps {
  program: TrainingProgram;
  userNotes: NotesMap;
}

export const PlantUMLView: React.FC<PlantUMLViewProps> = ({ program, userNotes }) => {
  const [copied, setCopied] = useState(false);

  const plantUMLCode = generatePlantUMLCode(program, userNotes);

  const handleCopy = () => {
    navigator.clipboard.writeText(plantUMLCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([plantUMLCode], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `mindmap-formation-winside.puml`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
            <Binary className="w-3.5 h-3.5" />
            Syntaxe PlantUML Mindmap
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            • Compatible avec PlantUML Server, VS Code PlantUML extension, Draw.io et IntelliJ
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.plantuml.com/plantuml/uml/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
          >
            <span>Ouvrir PlantUML Web</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              copied
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié !' : 'Copier le code PlantUML'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Télécharger (.puml)</span>
          </button>
        </div>
      </div>

      {/* Helper Box */}
      <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-indigo-950">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Comment utiliser ce fichier PlantUML :</p>
          <p className="text-indigo-800">
            Copiez le code ci-dessous et collez-le directement dans le serveur PlantUML en ligne ou enregistrez le fichier <code className="bg-indigo-100 px-1.5 py-0.5 rounded font-mono text-[11px]">.puml</code> dans votre projet VS Code avec l'extension officielle PlantUML pour générer des exports vectoriels SVG/PNG haute résolution.
          </p>
        </div>
      </div>

      {/* Code Display */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
          <span className="font-mono">mindmap-formation-winside.puml</span>
          <span>Syntaxe @startmindmap</span>
        </div>
        <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
          {plantUMLCode}
        </pre>
      </div>
    </div>
  );
};
