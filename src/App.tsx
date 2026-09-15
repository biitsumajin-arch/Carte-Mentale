import React, { useState, useEffect, useMemo } from 'react';
import { ViewMode } from './types';
import { trainingProgramData } from './data/curriculumData';
import { NotesMap, countFilledNotes, getStructuredNote } from './utils/generators';
import { StructuredNote, NoteValue } from './types';
import { Navbar } from './components/Navbar';
import { MindmapView } from './components/MindmapView';
import { MarkdownView } from './components/MarkdownView';
import { MermaidView } from './components/MermaidView';
import { PlantUMLView } from './components/PlantUMLView';
import { FaqHubView } from './components/FaqHubView';
import { FlashcardsView } from './components/FlashcardsView';
import { SoftwareFunctionsView } from './components/SoftwareFunctionsView';

const STORAGE_KEY = 'winside_training_notes_v2';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('mindmap');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Load notes from localStorage or initialize with default notes from data
  const [userNotes, setUserNotes] = useState<NotesMap>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('winside_training_notes_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load notes from localStorage', e);
    }
    
    // Seed default notes
    const initialNotes: NotesMap = {
      global: {
        green: 'Objectif : Obtenir la certification Microsoft PL-900 & le titre Chef de Projet Transfo Numérique avec mention.',
        orange: 'Maintenir un rythme régulier sur les livrables No-Code et le mémoire de projet.',
        red: 'Points de vigilance : Modélisation Dataverse complexe & sécurité des flux Power Automate.'
      },
    };
    trainingProgramData.modules.forEach((m) => {
      m.topics.forEach((t) => {
        if (t.defaultNotes) {
          initialNotes[t.id] = getStructuredNote(undefined, t.defaultNotes);
        }
      });
    });
    return initialNotes;
  });

  // Persist notes changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userNotes));
    } catch (e) {
      console.error('Failed to save notes to localStorage', e);
    }
  }, [userNotes]);

  const handleUpdateNote = (id: string, note: StructuredNote | string) => {
    setUserNotes((prev) => ({
      ...prev,
      [id]: note,
    }));
  };

  // Compute total counts
  const totalFaqsCount = useMemo(() => {
    let count = 0;
    trainingProgramData.modules.forEach((mod) => {
      mod.topics.forEach((topic) => {
        if (topic.tools) {
          topic.tools.forEach((tool) => {
            count += tool.faqs.length;
          });
        }
      });
    });
    return count;
  }, []);

  const notesCount = useMemo(() => {
    return countFilledNotes(userNotes);
  }, [userNotes]);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        notesCount={notesCount}
        totalFaqsCount={totalFaqsCount}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'mindmap' && (
          <MindmapView
            program={trainingProgramData}
            userNotes={userNotes}
            onUpdateNote={handleUpdateNote}
            searchQuery={searchQuery}
          />
        )}

        {currentView === 'software_functions' && (
          <SoftwareFunctionsView
            searchQuery={searchQuery}
            onNavigateToView={setCurrentView}
          />
        )}

        {currentView === 'markdown' && (
          <MarkdownView
            program={trainingProgramData}
            userNotes={userNotes}
          />
        )}

        {currentView === 'mermaid' && (
          <MermaidView
            program={trainingProgramData}
            userNotes={userNotes}
            onUpdateNote={handleUpdateNote}
          />
        )}

        {currentView === 'plantuml' && (
          <PlantUMLView
            program={trainingProgramData}
            userNotes={userNotes}
          />
        )}

        {currentView === 'faqs' && (
          <FaqHubView
            program={trainingProgramData}
            searchQuery={searchQuery}
          />
        )}

        {currentView === 'flashcards' && (
          <FlashcardsView
            program={trainingProgramData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">
              Formation Chef.fe de Projet en Transformation Numérique
            </span>
            <span>•</span>
            <span>WinSide Paris (413h / 13 semaines)</span>
          </div>
          <div className="text-slate-400 flex items-center gap-3">
            <span>22 Juin - 2 Octobre 2026</span>
            <span>•</span>
            <span className="text-indigo-400 font-medium">Formats Markdown • Mermaid.js</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
