import React, { useState, useMemo } from 'react';
import { TrainingProgram } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, CheckCircle, HelpCircle } from 'lucide-react';

interface FlashcardsViewProps {
  program: TrainingProgram;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ program }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>({});

  // Flatten all FAQs into flashcards
  const flashcards = useMemo(() => {
    const list: Array<{
      id: string;
      question: string;
      answer: string;
      toolName: string;
      category: string;
      moduleNumber: number | string;
      moduleTitle: string;
    }> = [];

    program.modules.forEach((mod) => {
      mod.topics.forEach((topic) => {
        if (topic.tools) {
          topic.tools.forEach((tool) => {
            tool.faqs.forEach((faq) => {
              list.push({
                id: faq.id,
                question: faq.question,
                answer: faq.answer,
                toolName: tool.name,
                category: tool.category,
                moduleNumber: mod.number,
                moduleTitle: mod.title,
              });
            });
          });
        }
      });
    });

    return list;
  }, [program]);

  const currentCard = flashcards[currentIndex];
  const isMastered = currentCard ? !!masteredIds[currentCard.id] : false;
  const masteredCount = Object.values(masteredIds).filter(Boolean).length;
  const progressPercent = Math.round((masteredCount / flashcards.length) * 100) || 0;

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const toggleMastered = () => {
    if (!currentCard) return;
    setMasteredIds((prev) => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id],
    }));
  };

  const handleReset = () => {
    setMasteredIds({});
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  if (!currentCard) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header & Stats */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Entraînement & Mémorisation Active
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Flashcards des Questions Fréquentes
          </h2>
          <p className="text-xs text-slate-500">
            Testez vos connaissances sur chaque outil du programme de transformation numérique
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-w-[120px] text-center">
            <div className="text-xs text-slate-500 font-medium">Progression</div>
            <div className="text-base font-bold text-indigo-600">
              {masteredCount} / {flashcards.length}
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            title="Réinitialiser la progression"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Flashcard Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm text-center relative overflow-hidden min-h-[360px] flex flex-col justify-between">
        
        {/* Card Header metadata */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Module {currentCard.moduleNumber} • {currentCard.toolName}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Carte {currentIndex + 1} sur {flashcards.length}
          </span>
        </div>

        {/* Card Content Area */}
        <div className="py-8 space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Question Fréquente</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 max-w-xl mx-auto leading-relaxed">
            « {currentCard.question} »
          </h3>

          {showAnswer ? (
            <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-5 text-sm text-slate-800 max-w-xl mx-auto text-left space-y-2 animate-in fade-in duration-200">
              <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                <span>💡 Réponse Clé :</span>
              </div>
              <p className="leading-relaxed text-slate-700">{currentCard.answer}</p>
            </div>
          ) : (
            <button
              onClick={() => setShowAnswer(true)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-indigo-600/20 transition-all hover:scale-105"
            >
              Révéler la Réponse
            </button>
          )}
        </div>

        {/* Card Actions & Navigation */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Précédente</span>
          </button>

          <button
            onClick={toggleMastered}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              isMastered
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isMastered ? 'Maîtrisée !' : 'Marquer comme apprise'}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            <span>Suivante</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
