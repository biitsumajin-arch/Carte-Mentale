import React, { useState, useRef, useEffect } from 'react';
import { ViewMode } from '../types';
import { 
  Network, 
  FileText, 
  GitFork, 
  Binary, 
  HelpCircle, 
  Sparkles, 
  Search, 
  BookOpen, 
  ListChecks,
  ChevronDown,
  Check,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  notesCount: number;
  totalFaqsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  searchQuery,
  onSearchChange,
  notesCount,
  totalFaqsCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'mindmap' as ViewMode, label: 'Carte Mentale', icon: Network, badge: 'Interactif', description: 'Exploration visuelle & arborescence' },
    { id: 'software_functions' as ViewMode, label: 'Fonctions & Checklist', icon: ListChecks, badge: 'Catalogue', description: 'Fonctionnalités & suivi des acquis' },
    { id: 'markdown' as ViewMode, label: 'Markdown Annotable', icon: FileText, badge: `${notesCount} notes`, description: 'Programme détaillé & notes perso' },
    { id: 'mermaid' as ViewMode, label: 'Mermaid.js', icon: GitFork, badge: '🌿 Nature', description: 'Diagramme dynamique coloré' },
    { id: 'faqs' as ViewMode, label: 'FAQ Outils', icon: HelpCircle, badge: `${totalFaqsCount} Q&A`, description: 'Questions/Réponses par logiciel' },
    { id: 'flashcards' as ViewMode, label: 'Mode Révision', icon: Sparkles, badge: 'Quiz', description: 'Auto-évaluation & cartes mémoire' },
  ];

  const currentItem = navItems.find((item) => item.id === currentView) || navItems[0];
  const CurrentIcon = currentItem.icon;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSelectView = (view: ViewMode) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-slate-100 truncate">
                  Chef de Projet Transfo Numérique
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                  WinSide
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate">
                Modèle de carte mentale, notes & FAQ outillage (413h / 13 sem.)
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="relative flex-1 max-w-xs hidden xl:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher outil, question, notion..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-800 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* DESKTOP NAVIGATION TABS (Visible on Large Screens) */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                        isActive
                          ? 'bg-indigo-700/80 text-indigo-100'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* MOBILE / TABLET NAVIGATION: Interactive Dropdown Menu */}
          <div className="flex lg:hidden items-center gap-1.5 shrink-0" ref={dropdownRef}>
            
            {/* Search Toggle Button for mobile */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Rechercher"
              className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                isMobileSearchOpen || searchQuery
                  ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-200'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Navigation Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`flex items-center gap-2 pl-2.5 pr-2 py-2 rounded-xl text-xs font-semibold border transition-all shadow-xs min-h-[40px] ${
                  isMobileMenuOpen
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-500/20'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-100 border-slate-700 hover:border-slate-600'
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-haspopup="true"
              >
                <div className={`p-1 rounded-lg ${isMobileMenuOpen ? 'bg-indigo-700 text-white' : 'bg-slate-700/80 text-indigo-400'}`}>
                  <CurrentIcon className="w-3.5 h-3.5" />
                </div>
                <span className="max-w-[110px] sm:max-w-[150px] truncate">
                  {currentItem.label}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180 text-white' : ''}`} />
              </button>

              {/* Mobile Dropdown Popover Menu */}
              {isMobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Menu className="w-3.5 h-3.5 text-indigo-400" />
                      Naviguer vers une page
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold bg-slate-800 px-1.5 py-0.5 rounded-full">
                      {navItems.length} vues
                    </span>
                  </div>

                  <div className="p-1.5 max-h-[70vh] overflow-y-auto space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectView(item.id)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all group ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'hover:bg-slate-800/80 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`p-2 rounded-lg shrink-0 ${
                              isActive 
                                ? 'bg-indigo-700/80 text-white' 
                                : 'bg-slate-800 group-hover:bg-slate-700 text-indigo-400'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-semibold text-xs truncate">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium shrink-0 ${
                                    isActive 
                                      ? 'bg-indigo-700 text-indigo-100 border border-indigo-400/40' 
                                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                                  }`}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className={`text-[11px] truncate ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                                {item.description}
                              </p>
                            </div>
                          </div>

                          {isActive && (
                            <div className="shrink-0 pl-2">
                              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Expandable Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="lg:hidden pb-3 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Rechercher outil, question, notion..."
                autoFocus
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

