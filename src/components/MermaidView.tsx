import React, { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import { TrainingProgram, ModuleItem, TopicItem, ToolItem, StructuredNote } from '../types';
import { 
  generateMermaidCode, 
  NotesMap, 
  MermaidNatureTheme, 
  MERMAID_NATURE_THEMES,
  getStructuredNote 
} from '../utils/generators';
import { 
  Copy, 
  Check, 
  Download, 
  GitFork, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Code, 
  Eye, 
  Trees, 
  FileImage,
  Sliders,
  Maximize,
  Minimize,
  Move,
  Search,
  X,
  HelpCircle,
  ExternalLink,
  Edit3,
  CheckCircle,
  AlertCircle,
  Info,
  Layers,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Laptop,
  BookOpen,
  Award,
  ChevronRight,
  MessageSquare,
  FileCheck
} from 'lucide-react';

interface MermaidViewProps {
  program: TrainingProgram;
  userNotes: NotesMap;
  onUpdateNote?: (id: string, note: StructuredNote | string) => void;
}

interface SelectedNodeInfo {
  type: 'root' | 'module' | 'topic' | 'tool' | 'note' | 'meta';
  title: string;
  module?: ModuleItem;
  topic?: TopicItem;
  tool?: ToolItem;
  noteColor?: 'green' | 'orange' | 'red';
}

export const MermaidView: React.FC<MermaidViewProps> = ({ 
  program, 
  userNotes, 
  onUpdateNote 
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'diagram' | 'code'>('diagram');
  const [renderError, setRenderError] = useState<string | null>(null);
  
  // Nature Theme & Filters
  const [currentTheme, setCurrentTheme] = useState<MermaidNatureTheme>('forest');
  const [includeFaq, setIncludeFaq] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(true);
  
  // Interactive Pan & Zoom State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Search within diagram
  const [diagramSearch, setDiagramSearch] = useState('');
  
  // Selected Node for Interactive Details Modal / Sidebar
  const [selectedNode, setSelectedNode] = useState<SelectedNodeInfo | null>(null);
  const [savedNoteFeedback, setSavedNoteFeedback] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const lastTouchDistRef = useRef<number | null>(null);

  const mermaidCode = generateMermaidCode(program, userNotes, {
    theme: currentTheme,
    includeFaq,
    includeNotes,
  });

  const activeThemeMeta = MERMAID_NATURE_THEMES[currentTheme];

  // Helper to find Topic or Module from text
  const findItemByText = useCallback((text: string): SelectedNodeInfo | null => {
    const cleanText = text
      .replace(/[\n\r\t]+/g, ' ')
      .replace(/[()[\]{}"#▫️🍃🎋🌿🌱🌾🌲🍀🍂🌳⚙️🛠️⏱️📅📍💻❓💡🟢🟠🔴]/g, ' ')
      .trim()
      .toLowerCase();

    if (
      cleanText.includes('chef.fe de projet') || 
      cleanText.includes('transformation numérique') ||
      cleanText.includes('formation chef') ||
      cleanText.includes('winside')
    ) {
      return { type: 'root', title: program.title };
    }

    if (
      cleanText.includes('cadre & infos') || 
      cleanText.includes('cadre et infos') || 
      cleanText.includes('paris 18e') ||
      cleanText.includes('413h') ||
      cleanText.includes('22 juin') ||
      cleanText.includes('prérequis')
    ) {
      return { type: 'meta', title: 'Cadre & Informations Pratiques' };
    }

    // Check modules first
    for (const mod of program.modules) {
      const modTitleClean = mod.title.toLowerCase();
      if (
        cleanText.includes(`m${mod.number}`) ||
        cleanText.includes(`module ${mod.number}`) ||
        cleanText.includes(modTitleClean) ||
        modTitleClean.includes(cleanText)
      ) {
        return { type: 'module', title: `Module ${mod.number} - ${mod.title}`, module: mod };
      }
    }

    // Check topics & tools inside topics
    for (const mod of program.modules) {
      for (const topic of mod.topics) {
        const topicTitleClean = topic.title.toLowerCase();
        
        // Exact or strong substring match with topic title
        if (
          cleanText.includes(topicTitleClean) || 
          topicTitleClean.includes(cleanText) ||
          cleanText.split(' ').filter(w => w.length > 3).some(w => topicTitleClean.includes(w))
        ) {
          return { type: 'topic', title: topic.title, module: mod, topic };
        }

        // Check tools
        if (topic.tools) {
          for (const tool of topic.tools) {
            const toolNameClean = tool.name.toLowerCase();
            if (cleanText.includes(toolNameClean) || toolNameClean.includes(cleanText)) {
              return { type: 'tool', title: tool.name, module: mod, topic, tool };
            }
          }
        }
      }
    }

    // Check if it's a note node
    if (cleanText.includes('acquis') || cleanText.includes('vigilance') || cleanText.includes('bloquant')) {
      const color: 'green' | 'orange' | 'red' = cleanText.includes('acquis') ? 'green' : cleanText.includes('vigilance') ? 'orange' : 'red';
      return { type: 'note', title: text, noteColor: color };
    }

    // Generic fallback with clean title
    return { type: 'topic', title: text.replace(/[()[\]{}"#]/g, '').trim() };
  }, [program]);

  // Mermaid Render & SVG Node Enhancement
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: activeThemeMeta.primary,
        primaryTextColor: activeThemeMeta.nodeText,
        primaryBorderColor: activeThemeMeta.primary,
        lineColor: activeThemeMeta.line,
        secondaryColor: activeThemeMeta.accent,
        tertiaryColor: activeThemeMeta.bgLight,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '13px',
      },
      securityLevel: 'loose',
    });

    let isMounted = true;

    const renderDiagram = async () => {
      try {
        setRenderError(null);
        const id = 'mermaid-mindmap-' + Math.random().toString(36).substring(2, 9);
        const { svg } = await mermaid.render(id, mermaidCode);
        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
          const svgEl = containerRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.width = '100%';
            svgEl.style.height = 'auto';
            svgEl.style.minWidth = '800px';
            svgEl.style.overflow = 'visible';

            // Enhance all SVG node groups and text elements with interactive handlers
            // In Mermaid mindmaps, nodes are rendered as <g class="mindmap-node"> or <g> containing <text> / <path> / <rect> / <circle>
            const allGroups = svgEl.querySelectorAll('g');

            allGroups.forEach((group) => {
              const textContent = (group.textContent || '').trim();

              // Only attach to groups with meaningful text that are not large structural container groups
              if (textContent.length > 1 && group.children.length <= 6) {
                const htmlGroup = group as HTMLElement;
                htmlGroup.style.cursor = 'pointer';
                htmlGroup.style.transition = 'transform 0.15s ease, filter 0.15s ease';
                htmlGroup.setAttribute('title', `🔍 Cliquer pour voir les données de : "${textContent.slice(0, 40)}"`);

                // Hover effect
                htmlGroup.onmouseenter = () => {
                  htmlGroup.style.filter = 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.9))';
                };
                htmlGroup.onmouseleave = () => {
                  htmlGroup.style.filter = '';
                };

                // Direct Click handler with drag distinction
                htmlGroup.onclick = (e) => {
                  e.stopPropagation();
                  // Find and set the selected node
                  const found = findItemByText(textContent);
                  if (found) {
                    setSelectedNode(found);
                  }
                };
              }
            });

            // Also attach directly to all <text> elements as fallback
            const allTexts = svgEl.querySelectorAll('text');
            allTexts.forEach((textEl) => {
              const textContent = (textEl.textContent || '').trim();
              if (textContent.length > 1) {
                const htmlText = textEl as HTMLElement;
                htmlText.style.cursor = 'pointer';
                htmlText.onclick = (e) => {
                  e.stopPropagation();
                  const found = findItemByText(textContent);
                  if (found) {
                    setSelectedNode(found);
                  }
                };
              }
            });
          }
        }
      } catch (err: unknown) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setRenderError((err as Error)?.message || 'Erreur de rendu du schéma Mermaid');
        }
      }
    };

    if (activeTab === 'diagram') {
      renderDiagram();
    }

    return () => {
      isMounted = false;
    };
  }, [mermaidCode, activeTab, currentTheme, findItemByText]);

  // Handle Search Highlighting in Diagram
  useEffect(() => {
    if (!containerRef.current || !diagramSearch.trim()) {
      // Clear highlights
      const highlighted = containerRef.current?.querySelectorAll('[data-highlighted="true"]');
      highlighted?.forEach((el) => {
        (el as HTMLElement).style.filter = '';
        (el as HTMLElement).removeAttribute('data-highlighted');
      });
      return;
    }

    const query = diagramSearch.toLowerCase().trim();
    const groups = containerRef.current.querySelectorAll('g');
    let firstMatched: HTMLElement | null = null;

    groups.forEach((g) => {
      const text = (g.textContent || '').toLowerCase();
      const el = g as HTMLElement;
      if (text.includes(query) && text.length > 2) {
        el.style.filter = 'drop-shadow(0 0 12px #f59e0b) brightness(1.15)';
        el.setAttribute('data-highlighted', 'true');
        if (!firstMatched) firstMatched = el;
      } else if (el.getAttribute('data-highlighted') === 'true') {
        el.style.filter = '';
        el.removeAttribute('data-highlighted');
      }
    });
  }, [diagramSearch]);

  // Pan & Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on left button
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel Zoom with smooth scaling
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    setZoomLevel((prevZoom) => {
      const newZoom = Math.min(Math.max(prevZoom * zoomFactor, 0.35), 3.5);
      return Number(newZoom.toFixed(2));
    });
  };

  // Touch Handlers for Mobile (Pinch to zoom & 1-finger pan)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastTouchDistRef.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && lastTouchDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / lastTouchDistRef.current;
      lastTouchDistRef.current = dist;
      setZoomLevel((prev) => Math.min(Math.max(prev * factor, 0.35), 3.5));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastTouchDistRef.current = null;
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((z) => Math.min(3.5, Number((z + 0.2).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoomLevel((z) => Math.max(0.35, Number((z - 0.2).toFixed(2))));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mermaidCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMmd = () => {
    const blob = new Blob([mermaidCode], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `mindmap-nature-${currentTheme}-winside.mmd`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSvg = () => {
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindmap-nature-${currentTheme}-winside.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Note update handler inside Inspector
  const handleInspectorNoteChange = (
    topicId: string,
    field: 'green' | 'orange' | 'red',
    val: string,
    defaultNotes?: string | StructuredNote
  ) => {
    if (!onUpdateNote) return;
    const current = getStructuredNote(userNotes[topicId], defaultNotes);
    const updated: StructuredNote = {
      ...current,
      [field]: val,
    };
    onUpdateNote(topicId, updated);
    setSavedNoteFeedback(field);
    setTimeout(() => setSavedNoteFeedback(null), 1200);
  };

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900 p-4 overflow-hidden flex flex-col' : ''}`}>
      {/* Top Banner with Nature Aesthetics & Palette Selector */}
      {!isFullscreen && (
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-800/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700/60 border border-emerald-500/40 flex items-center justify-center text-emerald-200 shadow-inner">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    Mindmap Mermaid Interactive • Zoom & Exploration Végétale
                  </h3>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                    Interactif + Pan/Zoom
                  </span>
                </div>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  Glissez pour déplacer, zoomez à la molette et cliquez sur un nœud pour ouvrir ses détails et 3 cases de notes.
                </p>
              </div>
            </div>

            {/* Theme Palette Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-emerald-800/50">
              {(Object.keys(MERMAID_NATURE_THEMES) as MermaidNatureTheme[]).map((themeKey) => {
                const item = MERMAID_NATURE_THEMES[themeKey];
                const isSelected = currentTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => setCurrentTheme(themeKey)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs border border-emerald-400/50'
                        : 'text-emerald-100/70 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="text-[11px]">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Options & Search Row */}
          <div className="mt-4 pt-3 border-t border-emerald-800/50 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-emerald-300 font-semibold flex items-center gap-1 text-[11px]">
                <Sliders className="w-3 h-3" /> Options du schéma :
              </span>
              <label className="flex items-center gap-1.5 cursor-pointer text-emerald-100 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={includeNotes}
                  onChange={(e) => setIncludeNotes(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 border-emerald-700 bg-slate-800"
                />
                <span className="text-[11px]">Cases Notes (🟢 Vert / 🟠 Orange / 🔴 Rouge)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-emerald-100 hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={includeFaq}
                  onChange={(e) => setIncludeFaq(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 border-emerald-700 bg-slate-800"
                />
                <span className="text-[11px]">Questions FAQ des outils</span>
              </label>
            </div>

            {/* Quick Filter Search */}
            <div className="relative flex items-center min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-emerald-300/80 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                value={diagramSearch}
                onChange={(e) => setDiagramSearch(e.target.value)}
                placeholder="Rechercher dans le schéma..."
                className="w-full bg-slate-950/70 border border-emerald-700/60 rounded-lg pl-8 pr-7 py-1 text-xs text-white placeholder-emerald-300/50 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
              {diagramSearch && (
                <button
                  onClick={() => setDiagramSearch('')}
                  className="absolute right-2 text-emerald-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-emerald-100 rounded-xl p-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'diagram'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Schéma Interactif
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Code Mermaid Nature
            </button>
          </div>

          <span className="hidden xl:inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Nœuds cliquables • Glisser pour naviguer
          </span>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'diagram' && (
            <div className="flex items-center bg-emerald-50/90 rounded-lg border border-emerald-200 p-0.5">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100 rounded transition-colors"
                title="Zoom arrière (Molette vers le bas)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetView}
                className="text-[11px] font-mono px-2 py-0.5 text-emerald-900 font-bold hover:bg-emerald-100 rounded transition-colors"
                title="Cliquer pour réinitialiser le zoom à 100%"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100 rounded transition-colors"
                title="Zoom avant (Molette vers le haut)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <div className="h-3 w-px bg-emerald-200 mx-0.5" />
              <button
                onClick={handleResetView}
                className="p-1.5 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100 rounded transition-colors"
                title="Centrer le schéma"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100 rounded transition-colors"
                title={isFullscreen ? 'Quitter le plein écran' : 'Mode Plein Écran'}
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          <button
            onClick={handleDownloadSvg}
            className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 border border-emerald-200"
            title="Exporter l'image vectorielle SVG"
          >
            <FileImage className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">Export SVG</span>
          </button>

          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              copied
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié !' : 'Copier Code'}</span>
          </button>

          <button
            onClick={handleDownloadMmd}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.mmd</span>
          </button>
        </div>
      </div>

      {/* Interactive Diagram Canvas or Raw Code */}
      {activeTab === 'diagram' ? (
        <div 
          ref={viewportRef}
          className={`bg-gradient-to-b from-[#FAFDFB] to-[#F1F8F4] border border-emerald-200/80 rounded-2xl shadow-sm overflow-hidden relative select-none ${
            isFullscreen ? 'flex-1 h-full' : 'min-h-[580px] h-[640px]'
          }`}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Floating Canvas Badges & Quick Controls */}
          <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-emerald-900 border border-emerald-300 text-xs font-bold shadow-xs">
              <GitFork className="w-3.5 h-3.5 text-emerald-700" />
              {activeThemeMeta.icon} {activeThemeMeta.name}
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-slate-700 border border-slate-200 text-xs shadow-xs">
              <Move className="w-3 h-3 text-slate-500" />
              <span>Glissez pour déplacer • Molette pour zoomer</span>
            </div>
          </div>

          {/* Floating Zoom Preset Shortcuts */}
          <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-1 bg-white/95 backdrop-blur-xs border border-emerald-200 p-1 rounded-xl shadow-xs pointer-events-auto">
            <button
              onClick={() => setZoomLevel(0.6)}
              className={`px-2 py-0.5 text-[10px] font-semibold rounded ${zoomLevel === 0.6 ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              60%
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className={`px-2 py-0.5 text-[10px] font-semibold rounded ${zoomLevel === 1 ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              100%
            </button>
            <button
              onClick={() => setZoomLevel(1.5)}
              className={`px-2 py-0.5 text-[10px] font-semibold rounded ${zoomLevel === 1.5 ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              150%
            </button>
            <button
              onClick={() => setZoomLevel(2)}
              className={`px-2 py-0.5 text-[10px] font-semibold rounded ${zoomLevel === 2 ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              200%
            </button>
            <button
              onClick={handleResetView}
              className="px-2 py-0.5 text-[10px] font-semibold text-emerald-800 hover:bg-emerald-50 rounded border-l border-slate-200 ml-1"
            >
              Centrer
            </button>
          </div>

          {/* Floating Quick Action Buttons (Bottom Right) */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs border border-emerald-200 p-1 rounded-xl shadow-xs pointer-events-auto">
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors"
              title="Zoom Avant (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors"
              title="Zoom Arrière (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors"
              title="Réinitialiser"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg transition-colors"
              title="Plein Écran"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>

          {renderError ? (
            <div className="h-full flex items-center justify-center p-6">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-800 text-xs max-w-lg text-center space-y-2">
                <p className="font-bold">Affichage du schéma :</p>
                <p>{renderError}</p>
                <p className="text-[11px] text-slate-500">
                  Vous pouvez basculer sur l'onglet "Code Mermaid Nature" pour copier la syntaxe.
                </p>
              </div>
            </div>
          ) : (
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
            >
              <div 
                ref={containerRef} 
                className="w-full h-full flex items-center justify-center [&_svg]:drop-shadow-sm p-8 pointer-events-auto" 
              />
            </div>
          )}

          {/* Interactive Ultra-Complete Inspector Slide-over / Modal */}
          {selectedNode && (
            <div 
              className="absolute top-0 right-0 h-full w-full sm:w-[450px] md:w-[480px] bg-white/98 backdrop-blur-md border-l border-emerald-300/80 shadow-2xl z-30 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {selectedNode.type === 'module' && `Module ${selectedNode.module?.number}`}
                      {selectedNode.type === 'topic' && 'Fiche Pédagogique & Outils'}
                      {selectedNode.type === 'tool' && 'Outil & FAQ Technologique'}
                      {selectedNode.type === 'root' && 'Titre & Référentiel Métier'}
                      {selectedNode.type === 'meta' && 'Organisation & Logistique'}
                      {selectedNode.type === 'note' && `Annotation Personnalisée (${selectedNode.noteColor === 'green' ? '🟢 Acquis' : selectedNode.noteColor === 'orange' ? '🟠 Vigilance' : '🔴 Bloquant'})`}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 leading-snug truncate-2">
                      {selectedNode.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="p-1.5 rounded-xl hover:bg-slate-200/80 text-slate-400 hover:text-slate-700 transition-colors"
                    title="Fermer le volet"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs text-slate-700">
                
                {/* 1. TOPIC VIEW (Comprehensive details, tools list, interactive 3-box notes) */}
                {selectedNode.topic && (
                  <div className="space-y-4">
                    {/* Module Context Breadcrumb */}
                    {selectedNode.module && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Module {selectedNode.module.number} : <strong>{selectedNode.module.title}</strong></span>
                        <span className="text-slate-400">({selectedNode.module.weeks})</span>
                      </div>
                    )}

                    {/* Summary & Objectives */}
                    <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-xl p-3.5 space-y-2">
                      <div className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Objectifs & Synthèse de la séance :
                      </div>
                      <p className="text-slate-700 leading-relaxed">{selectedNode.topic.summary}</p>
                      
                      <div className="pt-2 border-t border-emerald-200/50">
                        <div className="font-bold text-emerald-900 mb-1.5">Concepts clés & Compétences :</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNode.topic.keyConcepts.map((c, i) => (
                            <span 
                              key={i} 
                              className="bg-white/90 text-emerald-900 border border-emerald-300 text-[11px] px-2 py-0.5 rounded-md shadow-xs font-medium"
                            >
                              ✓ {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3-Box Interactive Notes System */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                          <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                          Prise de Notes Pédagogique (3 Cases) :
                        </div>
                        {savedNoteFeedback && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold animate-pulse">
                            Enregistré ✓
                          </span>
                        )}
                      </div>

                      {(() => {
                        const sNote = getStructuredNote(userNotes[selectedNode.topic.id], selectedNode.topic.defaultNotes);
                        return (
                          <div className="space-y-2.5">
                            {/* Vert */}
                            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-2.5 space-y-1">
                              <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                  🟢 Vert — Acquis & Maîtrisé
                                </label>
                                <span className="text-[10px] text-emerald-700 font-medium">Points forts</span>
                              </div>
                              <textarea
                                rows={2}
                                value={sNote.green}
                                onChange={(e) =>
                                  handleInspectorNoteChange(
                                    selectedNode.topic!.id,
                                    'green',
                                    e.target.value,
                                    selectedNode.topic!.defaultNotes
                                  )
                                }
                                placeholder="Indiquez vos acquis consolidés sur ce sujet..."
                                className="w-full text-xs text-slate-800 bg-white border border-emerald-300/80 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none shadow-xs"
                              />
                            </div>

                            {/* Orange */}
                            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-2.5 space-y-1">
                              <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                                  <Info className="w-3.5 h-3.5 text-amber-600" />
                                  🟠 Orange — À approfondir & Vigilance
                                </label>
                                <span className="text-[10px] text-amber-700 font-medium">À réviser</span>
                              </div>
                              <textarea
                                rows={2}
                                value={sNote.orange}
                                onChange={(e) =>
                                  handleInspectorNoteChange(
                                    selectedNode.topic!.id,
                                    'orange',
                                    e.target.value,
                                    selectedNode.topic!.defaultNotes
                                  )
                                }
                                placeholder="Notions ou cas pratiques à revoir..."
                                className="w-full text-xs text-slate-800 bg-white border border-amber-300/80 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none shadow-xs"
                              />
                            </div>

                            {/* Rouge */}
                            <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-2.5 space-y-1">
                              <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-rose-900 flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                  🔴 Rouge — Difficultés & Points bloquants
                                </label>
                                <span className="text-[10px] text-rose-700 font-medium">À demander</span>
                              </div>
                              <textarea
                                rows={2}
                                value={sNote.red}
                                onChange={(e) =>
                                  handleInspectorNoteChange(
                                    selectedNode.topic!.id,
                                    'red',
                                    e.target.value,
                                    selectedNode.topic!.defaultNotes
                                  )
                                }
                                placeholder="Questions bloquantes pour le formateur..."
                                className="w-full text-xs text-slate-800 bg-white border border-rose-300/80 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none shadow-xs"
                              />
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Tools & FAQ Embedded */}
                    {selectedNode.topic.tools && selectedNode.topic.tools.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="font-bold text-slate-900 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs">
                            <Layers className="w-4 h-4 text-emerald-700" />
                            Outils & FAQ Technologique ({selectedNode.topic.tools.length}) :
                          </span>
                        </div>

                        {selectedNode.topic.tools.map((t) => (
                          <div 
                            key={t.name} 
                            className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-xs hover:border-emerald-300 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                                🛠️ {t.name}
                              </span>
                              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                                {t.category}
                              </span>
                            </div>
                            <p className="text-slate-600 text-[11px] leading-relaxed">{t.description}</p>
                            
                            {t.faqs && t.faqs.length > 0 && (
                              <div className="space-y-2 pt-1 border-t border-slate-200/80">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                  Questions / Réponses Clés :
                                </div>
                                {t.faqs.map((faq, i) => (
                                  <div key={faq.id || i} className="bg-white border border-slate-200 rounded-lg p-2.5 space-y-1">
                                    <div className="font-bold text-indigo-950 flex items-start gap-1">
                                      <span className="text-indigo-600">Q{i + 1} :</span>
                                      <span>{faq.question}</span>
                                    </div>
                                    <div className="text-slate-600 pl-4 border-l-2 border-emerald-400 text-[11px] leading-relaxed">
                                      💡 {faq.answer}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. MODULE VIEW (Deep summary, duration, full chapter hierarchy) */}
                {selectedNode.module && !selectedNode.topic && (
                  <div className="space-y-4">
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-950">
                          Module {selectedNode.module.number}
                        </span>
                        <span className="text-[11px] bg-white text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                          {selectedNode.module.weeks}
                        </span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{selectedNode.module.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60 text-xs">
                        <div className="bg-white/90 p-2 rounded-lg border border-emerald-100">
                          <span className="text-[10px] text-slate-500 block">Durée estimée</span>
                          <strong className="text-slate-800">{selectedNode.module.duration}</strong>
                        </div>
                        <div className="bg-white/90 p-2 rounded-lg border border-emerald-100">
                          <span className="text-[10px] text-slate-500 block">Nombre de chapitres</span>
                          <strong className="text-slate-800">{selectedNode.module.topics.length} séances</strong>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                        <span>Séances au programme du module :</span>
                        <span className="text-[10px] text-slate-400">Cliquez pour explorer</span>
                      </div>
                      
                      {selectedNode.module.topics.map((top, idx) => {
                        const sNote = getStructuredNote(userNotes[top.id], top.defaultNotes);
                        const hasNotes = Boolean(sNote.green || sNote.orange || sNote.red);
                        return (
                          <div
                            key={top.id}
                            onClick={() => setSelectedNode({ type: 'topic', title: top.title, module: selectedNode.module, topic: top })}
                            className="bg-white hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl p-3 cursor-pointer transition-all shadow-xs group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1">
                                <div className="font-bold text-slate-900 text-xs group-hover:text-emerald-800 flex items-center gap-1.5">
                                  <span className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-emerald-200 text-slate-700 group-hover:text-emerald-900 text-[10px] flex items-center justify-center font-bold">
                                    {idx + 1}
                                  </span>
                                  <span>{top.title}</span>
                                </div>
                                <p className="text-slate-500 text-[11px] line-clamp-2 pl-6.5">
                                  {top.summary}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                            </div>

                            {/* Badges indicators */}
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 pl-6.5 text-[10px]">
                              {top.tools && top.tools.length > 0 && (
                                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
                                  🛠️ {top.tools.map(t => t.name).join(', ')}
                                </span>
                              )}
                              {hasNotes && (
                                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5" /> Annoté
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. TOOL VIEW (Deep breakdown, category, and full list of FAQs) */}
                {selectedNode.tool && (
                  <div className="space-y-4">
                    <div className="bg-slate-900 text-slate-100 rounded-xl p-4 space-y-2 shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                          🛠️ {selectedNode.tool.name}
                        </span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                          {selectedNode.tool.category}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{selectedNode.tool.description}</p>
                    </div>

                    {/* All FAQs */}
                    {selectedNode.tool.faqs && selectedNode.tool.faqs.length > 0 && (
                      <div className="space-y-3">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                          Questions Fréquentes & Réponses Clés ({selectedNode.tool.faqs.length}) :
                        </div>
                        {selectedNode.tool.faqs.map((faq, i) => (
                          <div key={faq.id || i} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2 shadow-xs">
                            <div className="font-bold text-indigo-950 flex items-start gap-1.5 text-xs">
                              <span className="text-indigo-600 font-extrabold">Q{i + 1} :</span>
                              <span>{faq.question}</span>
                            </div>
                            <div className="text-slate-700 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200/60 leading-relaxed text-xs">
                              <div className="font-semibold text-emerald-900 text-[10px] uppercase mb-0.5">Réponse Synthétique :</div>
                              {faq.answer}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. ROOT VIEW (Global Program Overview, Objectives & Metas) */}
                {selectedNode.type === 'root' && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-xl p-4 space-y-3 shadow-lg">
                      <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        {program.organization} • Titre Professionnel
                      </div>
                      <h3 className="text-sm font-extrabold leading-snug">{program.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{program.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1 shadow-xs">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                          <Clock className="w-3 h-3 text-emerald-600" /> Volume horaire
                        </div>
                        <div className="font-bold text-slate-900 text-xs">{program.meta.durationHours} heures</div>
                        <div className="text-[10px] text-slate-500">Sur {program.meta.durationWeeks} semaines</div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1 shadow-xs">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                          <Calendar className="w-3 h-3 text-emerald-600" /> Calendrier
                        </div>
                        <div className="font-bold text-slate-900 text-xs">{program.meta.startDate}</div>
                        <div className="text-[10px] text-slate-500">au {program.meta.endDate}</div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1 shadow-xs">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                          <MapPin className="w-3 h-3 text-emerald-600" /> Format & Lieu
                        </div>
                        <div className="font-bold text-slate-900 text-xs">{program.meta.format}</div>
                        <div className="text-[10px] text-slate-500 truncate">Paris 18e & Distanciel</div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1 shadow-xs">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                          <Award className="w-3 h-3 text-emerald-600" /> Modules
                        </div>
                        <div className="font-bold text-slate-900 text-xs">{program.modules.length} Modules clés</div>
                        <div className="text-[10px] text-slate-500">Évaluations & Livrables</div>
                      </div>
                    </div>

                    {/* Global Goal Note */}
                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 space-y-2">
                      <div className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                        <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                        Objectif Personnel Global :
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed italic bg-white p-2.5 rounded-lg border border-emerald-200">
                        "{getStructuredNote(userNotes['global']).green || 'Obtenir la certification et valider le titre de Chef de Projet.'}"
                      </p>
                    </div>
                  </div>
                )}

                {/* 5. NOTE NODE VIEW (When clicking directly on a note node in the mindmap) */}
                {selectedNode.type === 'note' && (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border space-y-2 shadow-xs ${
                      selectedNode.noteColor === 'green'
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : selectedNode.noteColor === 'orange'
                        ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                        : 'bg-rose-50/80 border-rose-300 text-rose-950'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-xs">
                        {selectedNode.noteColor === 'green' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                        {selectedNode.noteColor === 'orange' && <Info className="w-4 h-4 text-amber-600" />}
                        {selectedNode.noteColor === 'red' && <AlertCircle className="w-4 h-4 text-rose-600" />}
                        <span>
                          {selectedNode.noteColor === 'green' && '🟢 Note : Notions Acquises & Maîtrisées'}
                          {selectedNode.noteColor === 'orange' && '🟠 Note : Points de Vigilance & À Approfondir'}
                          {selectedNode.noteColor === 'red' && '🔴 Note : Points Bloquants & Questions Formateur'}
                        </span>
                      </div>
                      <div className="text-xs leading-relaxed bg-white/90 p-3 rounded-lg border border-slate-200/80 text-slate-800 font-medium">
                        {selectedNode.title.replace(/^\[?"?[🟢🟠🔴\s]*(Acquis|Vigilance|Bloquant|Vert|Orange|Rouge)\s*(\([^)]*\))?\s*:\s*/i, '').replace(/\]?"?$/, '')}
                      </div>
                    </div>

                    {selectedNode.topic && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                          Rattaché au sujet : {selectedNode.topic.title}
                        </div>
                        <p className="text-slate-600">{selectedNode.topic.summary}</p>
                        <button
                          onClick={() => setSelectedNode({ type: 'topic', title: selectedNode.topic!.title, module: selectedNode.module, topic: selectedNode.topic })}
                          className="mt-1 text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold underline flex items-center gap-1"
                        >
                          Éditer toutes les notes de ce sujet →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 6. META VIEW (Practical Information) */}
                {selectedNode.type === 'meta' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                      <div className="font-bold text-slate-900 text-xs">Modalités Pédagogiques & Logistique :</div>
                      
                      <div className="space-y-2.5 text-xs">
                        <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-slate-200">
                          <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-800">Rythme & Volume :</div>
                            <p className="text-slate-600">{program.meta.durationHours} heures réparties sur {program.meta.durationWeeks} semaines intensives.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-slate-200">
                          <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-800">Période de déroulement :</div>
                            <p className="text-slate-600">Du {program.meta.startDate} au {program.meta.endDate}.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-slate-200">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-800">Localisation :</div>
                            <p className="text-slate-600">{program.meta.location}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-slate-200">
                          <Laptop className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-800">Prérequis & Matériel :</div>
                            <p className="text-slate-600">{program.meta.prerequisites}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-900 border border-emerald-900/60 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-emerald-300">
            <span className="font-mono">%% Mindmap Nature Theme ({activeThemeMeta.name}) %%</span>
            <span className="text-slate-400">Prêt pour Obsidian, Mermaid Live, Notion, GitHub</span>
          </div>
          <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
            {mermaidCode}
          </pre>
        </div>
      )}
    </div>
  );
};


