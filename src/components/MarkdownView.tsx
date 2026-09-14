import React, { useState } from 'react';
import { TrainingProgram } from '../types';
import { generateMarkdownOutput, NotesMap, getStructuredNote } from '../utils/generators';
import { Copy, Check, Download, FileText, Eye, Code, CheckCircle, Info, AlertCircle } from 'lucide-react';

interface MarkdownViewProps {
  program: TrainingProgram;
  userNotes: NotesMap;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ program, userNotes }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');

  const markdownContent = generateMarkdownOutput(program, userNotes);
  const globalNote = getStructuredNote(userNotes['global']);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `carte-mentale-formation-winside.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Rendu Mis en Forme
            </button>
            <button
              onClick={() => setActiveTab('raw')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'raw'
                  ? 'bg-white text-indigo-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Code Markdown Brut
            </button>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            • Structure arborescente avec 3 cases de notes (Vert, Orange, Rouge) & FAQ
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              copied
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié !' : 'Copier le Markdown'}</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Télécharger (.md)</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'preview' ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Header */}
          <div className="border-b border-slate-200 pb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5" />
              Format Markdown Annotable
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              🧠 CARTE MENTALE & PLAN DE FORMATION
            </h1>
            <h2 className="text-lg font-semibold text-indigo-700 mt-1">
              🎯 Sujet Central : {program.title} ({program.organization})
            </h2>
            <p className="text-sm text-slate-600 italic">{program.subtitle}</p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4 text-xs space-y-2 text-slate-700">
              <div className="font-bold text-slate-900 mb-1">📌 Cadre & Infos Pratiques :</div>
              <div>⏱️ <strong>Durée :</strong> {program.meta.durationHours}h / {program.meta.durationWeeks} semaines ({program.meta.startDate} - {program.meta.endDate})</div>
              <div>📍 <strong>Lieu :</strong> {program.meta.location}</div>
              <div>💻 <strong>Prérequis :</strong> {program.meta.prerequisites}</div>
              <div>🎒 <strong>Format :</strong> {program.meta.format}</div>
              
              <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                  📝 Mes notes générales de cadrage (3 Cases) :
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-2 rounded-lg text-xs">
                    <span className="font-bold">🟢 Vert (Objectifs) : </span>
                    <span>{globalNote.green || '...'}</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 text-amber-900 p-2 rounded-lg text-xs">
                    <span className="font-bold">🟠 Orange (Vigilance) : </span>
                    <span>{globalNote.orange || '...'}</span>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 text-rose-900 p-2 rounded-lg text-xs">
                    <span className="font-bold">🔴 Rouge (Blocages) : </span>
                    <span>{globalNote.red || '...'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-8">
            {program.modules.map((mod) => (
              <div key={mod.id} className="space-y-4">
                <div className="border-b-2 border-slate-200 pb-2">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>📦 Module {mod.number} - {mod.title}</span>
                    <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      ({mod.weeks})
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 italic mt-0.5">
                    Durée indicative : {mod.duration} | Objectif : {mod.description}
                  </p>
                </div>

                <div className="space-y-6 pl-2 sm:pl-4">
                  {mod.topics.map((topic) => {
                    const topicNote = getStructuredNote(userNotes[topic.id], topic.defaultNotes);

                    return (
                      <div key={topic.id} className="space-y-3 bg-slate-50/50 border border-slate-200/80 rounded-xl p-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="text-indigo-600 font-bold">🔹</span>
                            <span>{topic.title}</span>
                          </h4>
                          <p className="text-xs text-slate-600 pl-4">{topic.summary}</p>
                          <div className="text-xs text-slate-500 pl-4">
                            <strong>Concepts clés :</strong> {topic.keyConcepts.join(', ')}
                          </div>
                        </div>

                        {/* 3 Note Boxes Rendering */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-bold text-slate-700">
                            [📝 Mes notes : 3 Niveaux de synthèse]
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-950 space-y-1">
                              <div className="font-bold flex items-center gap-1 text-emerald-800 text-[11px]">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                🟢 Vert (Acquis & Maîtrisé)
                              </div>
                              <p className="text-slate-800 text-xs">{topicNote.green || <span className="text-slate-400 italic">Aucune note</span>}</p>
                            </div>

                            <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-950 space-y-1">
                              <div className="font-bold flex items-center gap-1 text-amber-800 text-[11px]">
                                <Info className="w-3 h-3 text-amber-600" />
                                🟠 Orange (À approfondir)
                              </div>
                              <p className="text-slate-800 text-xs">{topicNote.orange || <span className="text-slate-400 italic">Aucune note</span>}</p>
                            </div>

                            <div className="bg-rose-50/80 border border-rose-200 rounded-lg p-2.5 text-xs text-rose-950 space-y-1">
                              <div className="font-bold flex items-center gap-1 text-rose-800 text-[11px]">
                                <AlertCircle className="w-3 h-3 text-rose-600" />
                                🔴 Rouge (Points bloquants)
                              </div>
                              <p className="text-slate-800 text-xs">{topicNote.red || <span className="text-slate-400 italic">Aucune note</span>}</p>
                            </div>
                          </div>
                        </div>

                        {/* Tools and FAQs */}
                        {topic.tools && topic.tools.length > 0 && (
                          <div className="space-y-3 pl-4 border-l-2 border-indigo-200 pt-1">
                            <div className="text-xs font-bold text-slate-700">
                              🛠️ Outils & Technologies abordés :
                            </div>

                            {topic.tools.map((tool) => (
                              <div key={tool.id} className="bg-white border border-slate-200 rounded-lg p-3 space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900">⚙️ {tool.name}</span>
                                  <span className="text-[10px] text-slate-500 italic">({tool.category})</span>
                                </div>
                                <p className="text-slate-600 text-[11px]">{tool.description}</p>

                                <div className="space-y-2 pt-1 border-t border-slate-100">
                                  <div className="font-semibold text-slate-700">
                                    ❓ Questions fréquentes & Réponses clés (FAQ Outil) :
                                  </div>
                                  {tool.faqs.map((faq, fIdx) => (
                                    <div key={faq.id} className="pl-2 border-l-2 border-slate-300 space-y-0.5">
                                      <div className="font-bold text-slate-800">
                                        {fIdx + 1}. Q : {faq.question}
                                      </div>
                                      <div className="text-slate-600 text-[11px]">
                                        💡 <em>R : {faq.answer}</em>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm relative">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
            <span>Syntaxe Markdown brute prête à exporter vers Notion, Obsidian, GitHub ou VSCode</span>
            <span>UTF-8</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
            {markdownContent}
          </pre>
        </div>
      )}
    </div>
  );
};
