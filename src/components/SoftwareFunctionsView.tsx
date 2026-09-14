import React, { useState, useEffect, useMemo } from 'react';
import { 
  SoftwareFunction, 
  PracticeItem 
} from '../types';
import { 
  softwareFunctionsDataset, 
  ToolFunctionsGroup, 
  PRESET_PRACTICE_PACKS 
} from '../data/softwareFunctionsData';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Copy, 
  Download, 
  ChevronDown, 
  ChevronRight, 
  Zap, 
  Layers, 
  Check, 
  BookOpen, 
  AlertCircle, 
  Calendar, 
  Edit3, 
  Share2, 
  ListChecks, 
  Terminal, 
  BarChart3,
  BookmarkPlus,
  RefreshCw,
  FolderPlus,
  Eye,
  EyeOff,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

import { AddModuleModal } from './software-functions/AddModuleModal';
import { AddFunctionModal } from './software-functions/AddFunctionModal';
import { ManageVisibilityModal } from './software-functions/ManageVisibilityModal';
import { DeleteConfirmModal } from './software-functions/DeleteConfirmModal';

const PRACTICE_STORAGE_KEY = 'winside_practice_functions_v1';
const CATALOG_STORAGE_KEY = 'winside_software_catalog_v3';
const VISIBILITY_STORAGE_KEY = 'winside_software_visibility_v1';
const VISIBILITY_CHECKLIST_SYNC_KEY = 'winside_software_visibility_checklist_sync_v1';

interface SoftwareFunctionsViewProps {
  searchQuery?: string;
  onNavigateToView?: (view: any) => void;
}

export const SoftwareFunctionsView: React.FC<SoftwareFunctionsViewProps> = ({ 
  searchQuery: initialSearchQuery = '' 
}) => {
  // Navigation tabs within this view
  const [activeTab, setActiveTab] = useState<'catalog' | 'checklist'>('catalog');
  
  // Dynamic Catalog State with localStorage persistence
  const [catalog, setCatalog] = useState<ToolFunctionsGroup[]>(() => {
    try {
      const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load catalog from localStorage', e);
    }
    return softwareFunctionsDataset;
  });

  // Persist catalog to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
    } catch (e) {
      console.error('Failed to persist catalog to localStorage', e);
    }
  }, [catalog]);

  // Selection states for the catalog
  const [selectedToolId, setSelectedToolId] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>(initialSearchQuery);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Practice checklist state persisted in localStorage
  const [practiceList, setPracticeList] = useState<PracticeItem[]>(() => {
    try {
      const saved = localStorage.getItem(PRACTICE_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load practice list from localStorage', e);
    }
    
    // Default seed with starter high-impact functions
    const defaultSeedIds = [
      'make-fn-1',
      'make-fn-2',
      'airtable-fn-1',
      'papps-fn-1',
      'pauto-fn-1',
      'dverse-fn-1',
      'aistudio-fn-1',
      'cursor-fn-1'
    ];

    const seed: PracticeItem[] = [];
    softwareFunctionsDataset.forEach((tool) => {
      tool.functions.forEach((fn) => {
        if (defaultSeedIds.includes(fn.id)) {
          seed.push({
            id: `practice-${fn.id}-${Date.now()}`,
            functionId: fn.id,
            toolId: fn.toolId,
            toolName: fn.toolName,
            name: fn.name,
            category: fn.category,
            description: fn.description,
            level: fn.level,
            practicalUseCase: fn.practicalUseCase,
            status: 'todo',
            priority: fn.level === 'Avancé' ? 'high' : 'medium',
            addedAt: new Date().toISOString(),
          });
        }
      });
    });
    return seed;
  });

  // State for filtering inside the checklist tab
  const [checklistStatusFilter, setChecklistStatusFilter] = useState<'all' | 'todo' | 'in_progress' | 'mastered'>('all');
  const [checklistToolFilter, setChecklistToolFilter] = useState<string>('all');
  const [checklistSearch, setChecklistSearch] = useState<string>('');
  
  // Software Visibility Configuration state persisted in localStorage
  const [hiddenToolIds, setHiddenToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(VISIBILITY_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load hidden tool ids from localStorage', e);
    }
    return [];
  });

  // Checklist visibility synchronization preference
  const [applyVisibilityToChecklist, setApplyVisibilityToChecklist] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(VISIBILITY_CHECKLIST_SYNC_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load checklist visibility sync preference', e);
    }
    return true;
  });

  // Modals state
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState<boolean>(false);
  const [isAddFunctionModalOpen, setIsAddFunctionModalOpen] = useState<boolean>(false);
  const [targetToolForNewFunction, setTargetToolForNewFunction] = useState<string>('');
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState<boolean>(false);
  
  // Delete confirmation modal state
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    type: 'module' | 'function' | 'reset';
    title: string;
    message: string;
    itemName: string;
    badgeText?: string;
    targetId: string;
    parentToolId?: string;
  }>({
    isOpen: false,
    type: 'module',
    title: '',
    message: '',
    itemName: '',
    targetId: '',
  });

  // Persist practice list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(practiceList));
    } catch (e) {
      console.error('Failed to save practice list to localStorage', e);
    }
  }, [practiceList]);

  // Persist visibility to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(VISIBILITY_STORAGE_KEY, JSON.stringify(hiddenToolIds));
    } catch (e) {
      console.error('Failed to save visibility settings to localStorage', e);
    }
  }, [hiddenToolIds]);

  // Persist checklist sync preference
  useEffect(() => {
    try {
      localStorage.setItem(VISIBILITY_CHECKLIST_SYNC_KEY, JSON.stringify(applyVisibilityToChecklist));
    } catch (e) {
      console.error('Failed to save checklist sync preference', e);
    }
  }, [applyVisibilityToChecklist]);

  // Toggle tool visibility
  const toggleToolVisibility = (toolId: string) => {
    setHiddenToolIds((prev) => {
      const isCurrentlyHidden = prev.includes(toolId);
      const updated = isCurrentlyHidden
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId];
      
      const tool = catalog.find((t) => t.toolId === toolId);
      const name = tool ? tool.toolName : 'Logiciel';
      showToast(isCurrentlyHidden ? `👁️ ${name} est maintenant visible.` : `🙈 ${name} est maintenant masqué.`);
      return updated;
    });
  };

  // Direct hide single tool from card
  const hideTool = (toolId: string, toolName: string) => {
    if (!hiddenToolIds.includes(toolId)) {
      setHiddenToolIds((prev) => [...prev, toolId]);
      showToast(`🙈 ${toolName} a été masqué du catalogue.`);
    }
  };

  // Show all tools
  const showAllTools = () => {
    setHiddenToolIds([]);
    showToast('👁️ Tous les logiciels sont désormais visibles.');
  };

  // Hide all tools
  const hideAllTools = () => {
    const allIds = catalog.map((t) => t.toolId);
    setHiddenToolIds(allIds);
    showToast('🙈 Tous les logiciels ont été masqués.');
  };

  // Helper toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // =========================================================================
  // MODULE & FUNCTION MANAGEMENT HANDLERS (ADD / DELETE)
  // =========================================================================

  // Add a new module / tool group
  const handleAddModule = (newModule: ToolFunctionsGroup) => {
    setCatalog((prev) => [newModule, ...prev]);
    setSelectedToolId(newModule.toolId);
    showToast(`✓ Nouveau module "${newModule.toolName}" créé avec succès !`);
  };

  // Add a new function / item
  const handleAddFunctionToCatalog = (newFunction: SoftwareFunction, addToChecklist: boolean) => {
    setCatalog((prev) =>
      prev.map((toolGroup) => {
        if (toolGroup.toolId === newFunction.toolId) {
          return {
            ...toolGroup,
            functions: [newFunction, ...toolGroup.functions],
          };
        }
        return toolGroup;
      })
    );

    if (addToChecklist) {
      const newPracticeItem: PracticeItem = {
        id: `practice-${newFunction.id}-${Date.now()}`,
        functionId: newFunction.id,
        toolId: newFunction.toolId,
        toolName: newFunction.toolName,
        name: newFunction.name,
        category: newFunction.category,
        description: newFunction.description,
        level: newFunction.level,
        practicalUseCase: newFunction.practicalUseCase,
        status: 'todo',
        priority: newFunction.level === 'Avancé' ? 'high' : 'medium',
        addedAt: new Date().toISOString(),
      };
      setPracticeList((prev) => [newPracticeItem, ...prev]);
      showToast(`✓ Fonction "${newFunction.name}" ajoutée au catalogue et à votre checklist !`);
    } else {
      showToast(`✓ Fonction "${newFunction.name}" ajoutée au catalogue !`);
    }
  };

  // Trigger Delete Module Dialog
  const triggerDeleteModule = (toolGroup: ToolFunctionsGroup) => {
    setDeleteModalState({
      isOpen: true,
      type: 'module',
      title: 'Supprimer ce Module / Logiciel',
      message: `Êtes-vous sûr de vouloir supprimer définitivement le logiciel "${toolGroup.toolName}" ainsi que ses ${toolGroup.functions.length} fonctions associées du catalogue ?`,
      itemName: `${toolGroup.toolName} (M${toolGroup.moduleNumber} • ${toolGroup.functions.length} fonctions)`,
      badgeText: `Module ${toolGroup.moduleNumber}`,
      targetId: toolGroup.toolId,
    });
  };

  // Trigger Delete Function Dialog
  const triggerDeleteFunction = (fn: SoftwareFunction, toolId: string) => {
    setDeleteModalState({
      isOpen: true,
      type: 'function',
      title: 'Supprimer cette Fonction',
      message: `Êtes-vous sûr de vouloir supprimer la fonction "${fn.name}" du catalogue pour le logiciel ${fn.toolName} ?`,
      itemName: `${fn.name} (${fn.level} • ${fn.category})`,
      badgeText: fn.toolName,
      targetId: fn.id,
      parentToolId: toolId,
    });
  };

  // Trigger Reset Catalog Dialog
  const triggerResetCatalog = () => {
    setDeleteModalState({
      isOpen: true,
      type: 'reset',
      title: 'Réinitialiser le Catalogue par Défaut',
      message: 'Cette action restaurera l\'ensemble des 11 logiciels et des 88+ fonctions officielles d\'origine du programme WinSide.',
      itemName: 'Catalogue officiel complet (Modules 1 à 5)',
      badgeText: 'Réinitialisation',
      targetId: 'reset',
    });
  };

  // Execute Confirmed Deletion
  const handleConfirmDelete = () => {
    const { type, targetId, parentToolId } = deleteModalState;

    if (type === 'module') {
      const toolToDelete = catalog.find((t) => t.toolId === targetId);
      const toolName = toolToDelete ? toolToDelete.toolName : 'Logiciel';
      
      // Remove from catalog
      setCatalog((prev) => prev.filter((t) => t.toolId !== targetId));
      
      // Remove from hidden tools
      setHiddenToolIds((prev) => prev.filter((id) => id !== targetId));
      
      // Clean up practice list items belonging to this tool
      setPracticeList((prev) => prev.filter((item) => item.toolId !== targetId && item.toolName !== toolName));

      if (selectedToolId === targetId) {
        setSelectedToolId('all');
      }

      showToast(`🗑️ Module / Logiciel "${toolName}" supprimé.`);
    } else if (type === 'function') {
      // Remove function from catalog
      setCatalog((prev) =>
        prev.map((toolGroup) => {
          if (toolGroup.toolId === parentToolId) {
            return {
              ...toolGroup,
              functions: toolGroup.functions.filter((fn) => fn.id !== targetId),
            };
          }
          return toolGroup;
        })
      );

      // Remove from practice list if present
      setPracticeList((prev) => prev.filter((item) => item.functionId !== targetId && item.id !== targetId));
      showToast('🗑️ Fonction supprimée du catalogue et de la checklist.');
    } else if (type === 'reset') {
      setCatalog(softwareFunctionsDataset);
      setHiddenToolIds([]);
      setSelectedToolId('all');
      setSelectedModule('all');
      setSelectedLevel('all');
      showToast('✓ Catalogue réinitialisé aux fonctions officielles d\'origine.');
    }
  };

  // =========================================================================
  // CHECKLIST ITEMS HANDLERS
  // =========================================================================

  // Check if a function is already in the practice list
  const getPracticeItem = (functionId: string): PracticeItem | undefined => {
    return practiceList.find((item) => item.functionId === functionId);
  };

  // Add single function to practice list
  const handleAddFunction = (fn: SoftwareFunction) => {
    const existing = getPracticeItem(fn.id);
    if (existing) {
      showToast(`⚠️ "${fn.name}" est déjà dans votre liste.`);
      return;
    }

    const newItem: PracticeItem = {
      id: `practice-${fn.id}-${Date.now()}`,
      functionId: fn.id,
      toolId: fn.toolId,
      toolName: fn.toolName,
      name: fn.name,
      category: fn.category,
      description: fn.description,
      level: fn.level,
      practicalUseCase: fn.practicalUseCase,
      status: 'todo',
      priority: fn.level === 'Avancé' ? 'high' : 'medium',
      addedAt: new Date().toISOString(),
    };

    setPracticeList((prev) => [newItem, ...prev]);
    showToast(`✓ Ajouté à votre liste : "${fn.name}"`);
  };

  // Toggle function in practice list (Add if not present, Remove if present)
  const handleToggleFunction = (fn: SoftwareFunction) => {
    const existing = getPracticeItem(fn.id);
    if (existing) {
      handleRemovePracticeItem(existing.id);
      showToast(`🗑️ Retiré de votre liste : "${fn.name}"`);
    } else {
      handleAddFunction(fn);
    }
  };

  // Add all functions from a specific tool
  const handleAddAllFromTool = (tool: ToolFunctionsGroup) => {
    let addedCount = 0;
    const newItems: PracticeItem[] = [];

    tool.functions.forEach((fn) => {
      const exists = practiceList.some((item) => item.functionId === fn.id);
      if (!exists) {
        newItems.push({
          id: `practice-${fn.id}-${Date.now()}-${Math.random()}`,
          functionId: fn.id,
          toolId: fn.toolId,
          toolName: fn.toolName,
          name: fn.name,
          category: fn.category,
          description: fn.description,
          level: fn.level,
          practicalUseCase: fn.practicalUseCase,
          status: 'todo',
          priority: fn.level === 'Avancé' ? 'high' : 'medium',
          addedAt: new Date().toISOString(),
        });
        addedCount++;
      }
    });

    if (addedCount > 0) {
      setPracticeList((prev) => [...newItems, ...prev]);
      showToast(`✓ ${addedCount} fonctions de ${tool.toolName} ajoutées à votre liste.`);
    } else {
      showToast(`Toutes les fonctions de ${tool.toolName} sont déjà dans votre liste.`);
    }
  };

  // Add a preset pack
  const handleAddPresetPack = (packId: string) => {
    const pack = PRESET_PRACTICE_PACKS.find((p) => p.id === packId);
    if (!pack) return;

    let addedCount = 0;
    const newItems: PracticeItem[] = [];

    catalog.forEach((tool) => {
      tool.functions.forEach((fn) => {
        if (pack.functionIds.includes(fn.id)) {
          const exists = practiceList.some((item) => item.functionId === fn.id);
          if (!exists) {
            newItems.push({
              id: `practice-${fn.id}-${Date.now()}-${Math.random()}`,
              functionId: fn.id,
              toolId: fn.toolId,
              toolName: fn.toolName,
              name: fn.name,
              category: fn.category,
              description: fn.description,
              level: fn.level,
              practicalUseCase: fn.practicalUseCase,
              status: 'todo',
              priority: fn.level === 'Avancé' ? 'high' : 'medium',
              addedAt: new Date().toISOString(),
            });
            addedCount++;
          }
        }
      });
    });

    if (addedCount > 0) {
      setPracticeList((prev) => [...newItems, ...prev]);
      showToast(`✓ ${addedCount} fonctions du ${pack.name} ajoutées !`);
    } else {
      showToast(`Toutes les fonctions du pack sont déjà dans votre liste.`);
    }
  };

  // Update item status in practice list
  const handleUpdateStatus = (itemId: string, status: 'todo' | 'in_progress' | 'mastered') => {
    setPracticeList((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status } : item))
    );
  };

  // Update item priority
  const handleUpdatePriority = (itemId: string, priority: 'low' | 'medium' | 'high') => {
    setPracticeList((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, priority } : item))
    );
  };

  // Update target date or personal note
  const handleUpdateItemDetails = (itemId: string, updates: Partial<PracticeItem>) => {
    setPracticeList((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
    );
  };

  // Remove practice item
  const handleRemovePracticeItem = (itemId: string) => {
    setPracticeList((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear completed items
  const handleClearMastered = () => {
    setPracticeList((prev) => prev.filter((item) => item.status !== 'mastered'));
    showToast('Les fonctions maîtrisées ont été archivées de la liste.');
  };

  // Copy checklist as Markdown
  const handleCopyMarkdown = () => {
    let md = `# 📋 Liste des Fonctions Logicielles à Travailler\n`;
    md += `*Formation Chef.fe de Projet en Transformation Numérique - WinSide Paris*\n\n`;
    
    md += `## 📊 Bilan de Progression\n`;
    md += `- Total : ${practiceList.length} fonctions sélectionnées\n`;
    md += `- ✅ Maîtrisées : ${stats.masteredCount} (${stats.percentMastered}%)\n`;
    md += `- 🔄 En cours d'assimilation : ${stats.inProgressCount}\n`;
    md += `- ⏳ À travailler : ${stats.todoCount}\n\n`;
    md += `---\n\n`;

    // Group by tool
    const grouped: Record<string, PracticeItem[]> = {};
    practiceList.forEach((item) => {
      if (!grouped[item.toolName]) grouped[item.toolName] = [];
      grouped[item.toolName].push(item);
    });

    Object.entries(grouped).forEach(([tool, items]) => {
      md += `### 🛠️ ${tool}\n`;
      items.forEach((item) => {
        const check = item.status === 'mastered' ? '[x]' : '[ ]';
        const statusLabel = 
          item.status === 'mastered' ? '✅ Maîtrisé' : 
          item.status === 'in_progress' ? '🔄 En cours' : '⏳ À travailler';
        const priorityLabel = item.priority === 'high' ? '🔴 Priorité Haute' : item.priority === 'medium' ? '🟡 Priorité Moyenne' : '🟢 Basse';
        
        md += `- ${check} **${item.name}** (${item.level} • ${item.category}) - *${statusLabel}* [${priorityLabel}]\n`;
        md += `  - *Description :* ${item.description}\n`;
        md += `  - *Cas d'usage :* ${item.practicalUseCase}\n`;
        if (item.targetDate) {
          md += `  - *Objectif / Échéance :* ${item.targetDate}\n`;
        }
        if (item.notes) {
          md += `  - *Notes personnelles :* ${item.notes}\n`;
        }
      });
      md += `\n`;
    });

    navigator.clipboard.writeText(md).then(() => {
      showToast('✓ Checklist complète copiée au format Markdown !');
    });
  };

  // Export as .md file
  const handleDownloadMarkdown = () => {
    let md = `# 📋 Liste des Fonctions Logicielles à Travailler\n\n`;
    practiceList.forEach((item) => {
      const check = item.status === 'mastered' ? '[x]' : '[ ]';
      md += `- ${check} [${item.toolName}] **${item.name}** (${item.status}) - ${item.description}\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `winside-fonctions-a-travailler-${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✓ Fichier Markdown téléchargé !');
  };

  // Compute Statistics
  const stats = useMemo(() => {
    const totalSelected = practiceList.length;
    const masteredCount = practiceList.filter((i) => i.status === 'mastered').length;
    const inProgressCount = practiceList.filter((i) => i.status === 'in_progress').length;
    const todoCount = practiceList.filter((i) => i.status === 'todo').length;
    const percentMastered = totalSelected > 0 ? Math.round((masteredCount / totalSelected) * 100) : 0;
    const percentActive = totalSelected > 0 ? Math.round(((masteredCount + inProgressCount) / totalSelected) * 100) : 0;
    const totalCatalogFunctions = catalog.reduce((acc, t) => acc + t.functions.length, 0);

    return {
      totalSelected,
      masteredCount,
      inProgressCount,
      todoCount,
      percentMastered,
      percentActive,
      totalCatalog: totalCatalogFunctions,
      visibleToolsCount: catalog.length - hiddenToolIds.length,
      totalToolsCount: catalog.length,
      hiddenToolsCount: hiddenToolIds.length
    };
  }, [practiceList, hiddenToolIds, catalog]);

  // Filter tools and functions in the Catalog tab
  const filteredCatalog = useMemo(() => {
    const search = searchFilter.toLowerCase().trim();

    return catalog
      .filter((toolGroup) => {
        // Software visibility filter
        if (selectedToolId === 'all' && hiddenToolIds.includes(toolGroup.toolId)) {
          return false;
        }
        if (selectedModule !== 'all' && toolGroup.moduleNumber.toString() !== selectedModule) {
          return false;
        }
        if (selectedToolId !== 'all' && toolGroup.toolId !== selectedToolId) {
          return false;
        }
        return true;
      })
      .map((toolGroup) => {
        const matchingFunctions = toolGroup.functions.filter((fn) => {
          if (selectedLevel !== 'all' && fn.level !== selectedLevel) {
            return false;
          }
          if (search) {
            const matchName = fn.name.toLowerCase().includes(search);
            const matchDesc = fn.description.toLowerCase().includes(search);
            const matchCategory = fn.category.toLowerCase().includes(search);
            const matchUseCase = fn.practicalUseCase.toLowerCase().includes(search);
            const matchTool = toolGroup.toolName.toLowerCase().includes(search);
            return matchName || matchDesc || matchCategory || matchUseCase || matchTool;
          }
          return true;
        });

        return {
          ...toolGroup,
          functions: matchingFunctions,
        };
      })
      // Keep groups if search is empty or if matching functions exist, or if user explicitly selected this tool
      .filter((toolGroup) => toolGroup.functions.length > 0 || (!search && selectedLevel === 'all'));
  }, [catalog, selectedModule, selectedToolId, selectedLevel, searchFilter, hiddenToolIds]);

  // Filter items in the Checklist tab
  const filteredChecklist = useMemo(() => {
    const search = checklistSearch.toLowerCase().trim();
    return practiceList.filter((item) => {
      // Visibility sync check: if tool is hidden and sync is enabled, hide from checklist
      if (applyVisibilityToChecklist && checklistToolFilter === 'all') {
        const isHidden = hiddenToolIds.some((id) => {
          if (id === item.toolId) return true;
          const tool = catalog.find((t) => t.toolId === id);
          return tool && tool.toolName.toLowerCase() === item.toolName.toLowerCase();
        });
        if (isHidden) return false;
      }

      if (checklistStatusFilter !== 'all' && item.status !== checklistStatusFilter) {
        return false;
      }
      if (checklistToolFilter !== 'all' && item.toolName !== checklistToolFilter) {
        return false;
      }
      if (search) {
        const matchName = item.name.toLowerCase().includes(search);
        const matchTool = item.toolName.toLowerCase().includes(search);
        const matchDesc = item.description.toLowerCase().includes(search);
        const matchNotes = item.notes?.toLowerCase().includes(search);
        return matchName || matchTool || matchDesc || matchNotes;
      }
      return true;
    });
  }, [catalog, practiceList, checklistStatusFilter, checklistToolFilter, checklistSearch, applyVisibilityToChecklist, hiddenToolIds]);

  // List of unique tool names in checklist for filter
  const checklistTools = useMemo(() => {
    const set = new Set<string>();
    practiceList.forEach((i) => set.add(i.toolName));
    return Array.from(set).sort();
  }, [practiceList]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Mastery Progress Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md text-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Répertoire de Pratique & Compétences Opérationnelles
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Fonctions Logicielles & Liste de Travail
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explorez les fonctionnalités concrètes de chaque logiciel, créez vos propres modules ou fonctions personnalisées, et suivez votre montée en compétences.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-xl p-4 min-w-[280px] sm:min-w-[320px] space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                Progression de Maîtrise
              </span>
              <span className="font-bold text-indigo-400 text-sm">
                {stats.percentMastered}%
              </span>
            </div>

            {/* Double Bar (Mastered + In Progress) */}
            <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full transition-all duration-500 rounded-l-full"
                style={{ width: `${stats.percentMastered}%` }}
                title={`Maîtrisé : ${stats.masteredCount}`}
              />
              <div
                className="bg-amber-500 h-full transition-all duration-500"
                style={{ width: `${stats.totalSelected > 0 ? (stats.inProgressCount / stats.totalSelected) * 100 : 0}%` }}
                title={`En cours : ${stats.inProgressCount}`}
              />
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[11px]">
              <div className="bg-slate-900/60 rounded-lg p-1.5 border border-slate-700/40">
                <div className="font-bold text-emerald-400 text-sm">{stats.masteredCount}</div>
                <div className="text-slate-400 text-[10px]">✅ Maîtrisées</div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-1.5 border border-slate-700/40">
                <div className="font-bold text-amber-400 text-sm">{stats.inProgressCount}</div>
                <div className="text-slate-400 text-[10px]">🔄 En cours</div>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-1.5 border border-slate-700/40">
                <div className="font-bold text-indigo-300 text-sm">{stats.todoCount}</div>
                <div className="text-slate-400 text-[10px]">⏳ À travailler</div>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs & Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Catalogue ({stats.totalToolsCount} logiciels)</span>
              <span className="text-[10px] bg-slate-900/80 px-1.5 py-0.2 rounded-full text-slate-300 border border-slate-700">
                {stats.totalCatalog}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'checklist'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>Ma Liste de Travail</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                stats.totalSelected > 0
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-700'
              }`}>
                {stats.totalSelected}
              </span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* ADD MODULE BUTTON */}
            <button
              onClick={() => setIsAddModuleModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
              title="Ajouter un nouveau logiciel / module au catalogue"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>+ Nouveau Module / Logiciel</span>
            </button>

            {/* ADD FUNCTION BUTTON */}
            <button
              onClick={() => {
                setTargetToolForNewFunction(selectedToolId !== 'all' ? selectedToolId : (catalog[0]?.toolId || ''));
                setIsAddFunctionModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-xs"
              title="Ajouter une nouvelle fonction / item au catalogue"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Ajouter une Fonction</span>
            </button>

            {/* MANAGE VISIBILITY */}
            <button
              onClick={() => setIsVisibilityModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors shadow-xs"
              title="Gérer les logiciels visibles dans le catalogue et la checklist"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Visibilité ({stats.visibleToolsCount}/{stats.totalToolsCount})</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors shadow-xs"
              title="Copier toute la liste sous forme de checklist Markdown"
            >
              <Copy className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Copier MD</span>
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors shadow-xs"
              title="Télécharger la checklist au format fichier .md"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Exporter .md</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Software Active Filter Banner */}
      {hiddenToolIds.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-400/30 rounded-2xl p-3.5 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-amber-950">
                {hiddenToolIds.length} logiciel{hiddenToolIds.length > 1 ? 's' : ''} masqué{hiddenToolIds.length > 1 ? 's' : ''}
              </span>
              <span className="text-amber-800/90 ml-1">
                ({stats.visibleToolsCount} actif{stats.visibleToolsCount > 1 ? 's' : ''} sur {stats.totalToolsCount})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={showAllTools}
              className="px-3 py-1 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 text-amber-900 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
              <span>Tout réafficher</span>
            </button>
            <button
              onClick={() => setIsVisibilityModalOpen(true)}
              className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Gérer les logiciels</span>
            </button>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1 : CATALOG & INTERACTIVE SOFTWARE DROPDOWN SELECTOR                  */}
      {/* ========================================================================= */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          
          {/* Preset Function Packs (One-Click Accelerators) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Packs Recommandés par Phase d'Apprentissage (1 Clic)
              </span>
              <span className="text-[11px] text-slate-600">
                Ajout groupé selon vos priorités de révision
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRESET_PRACTICE_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-slate-50 hover:bg-indigo-50/40 border border-slate-200/90 hover:border-indigo-300 rounded-xl p-3 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                        {pack.badge}
                      </span>
                      <span className="text-[10px] text-slate-600 font-medium">
                        {pack.functionIds.length} fonctions
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-900">
                      {pack.name}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                      {pack.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddPresetPack(pack.id)}
                    className="mt-3 w-full py-1.5 px-2.5 rounded-lg bg-white group-hover:bg-indigo-600 text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter ce pack</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Bar & Dropdown Selectors */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* PRIMARY DROPDOWN: Software Selector */}
              <div className="sm:col-span-5 relative">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  1. Sélectionner un logiciel ({catalog.length} disponibles)
                </label>
                <div className="relative">
                  <select
                    value={selectedToolId}
                    onChange={(e) => setSelectedToolId(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-10 py-2 text-xs font-semibold bg-indigo-50/60 hover:bg-indigo-50 text-indigo-950 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all cursor-pointer"
                  >
                    <option value="all">🌐 Tous les logiciels ({stats.visibleToolsCount} visibles / {stats.totalCatalog} fonctions)</option>
                    {catalog.map((tool) => {
                      const isHidden = hiddenToolIds.includes(tool.toolId);
                      return (
                        <option key={tool.toolId} value={tool.toolId}>
                          🛠️ {tool.toolName} {isHidden ? '🙈 (Masqué)' : ''} ({tool.functions.length} fonctions • M{tool.moduleNumber})
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-indigo-600">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* SECONDARY FILTER: Module Filter */}
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  2. Filtrer par Module
                </label>
                <select
                  value={selectedModule}
                  onChange={(e) => {
                    setSelectedModule(e.target.value);
                  }}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
                >
                  <option value="all">Tous les modules</option>
                  <option value="1">Module 1 : Fondations & Automation</option>
                  <option value="2">Module 2 : Applications & Web</option>
                  <option value="3">Module 3 : Microsoft Power Platform</option>
                  <option value="4">Module 4 : Vibe Coding & Dev IA</option>
                  <option value="5">Module 5 : Certification & Fil Rouge</option>
                </select>
              </div>

              {/* TERTIARY FILTER: Difficulty Level */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  3. Niveau
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
                >
                  <option value="all">Tous niveaux</option>
                  <option value="Débutant">🟢 Débutant</option>
                  <option value="Intermédiaire">🟡 Intermédiaire</option>
                  <option value="Avancé">🔴 Avancé</option>
                </select>
              </div>

              {/* SEARCH INPUT */}
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Recherche
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Chercher..."
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Software Pills Bar with Visibility & Creation triggers */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
              <span className="text-[11px] font-semibold text-slate-500 mr-1 flex items-center gap-1 whitespace-nowrap">
                Accès direct :
              </span>
              <button
                onClick={() => setSelectedToolId('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedToolId === 'all'
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Tous ({stats.visibleToolsCount})
              </button>
              {catalog.map((t) => {
                const isHidden = hiddenToolIds.includes(t.toolId);
                if (isHidden && selectedToolId !== t.toolId) return null;

                const isSelected = selectedToolId === t.toolId;
                const countInList = practiceList.filter((p) => p.toolName === t.toolName || p.toolId === t.toolId).length;
                return (
                  <button
                    key={t.toolId}
                    onClick={() => setSelectedToolId(t.toolId)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                        : isHidden
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isHidden && <span className="text-[10px] text-amber-700 font-bold">🙈</span>}
                    <span>{t.toolName}</span>
                    {countInList > 0 && (
                      <span className={`text-[10px] px-1.5 rounded-full font-bold ${
                        isSelected ? 'bg-indigo-800 text-indigo-100' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {countInList}
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => setIsAddModuleModalOpen(true)}
                className="ml-auto px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold whitespace-nowrap flex items-center gap-1 transition-all"
                title="Ajouter un nouveau logiciel / module"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>+ Logiciel</span>
              </button>
            </div>

          </div>

          {/* CATALOG DISPLAY: Filtered Software Groups */}
          {filteredCatalog.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3 shadow-xs">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">Aucune fonction logicielle trouvée</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {hiddenToolIds.length > 0
                  ? `${hiddenToolIds.length} logiciel(s) sont actuellement masqués. Vous pouvez les réafficher ou modifier votre recherche.`
                  : 'Essayez de modifier votre recherche ou ajoutez un nouveau logiciel/module.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {hiddenToolIds.length > 0 && (
                  <button
                    onClick={showAllTools}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Réafficher tous les logiciels</span>
                  </button>
                )}
                <button
                  onClick={() => setIsAddModuleModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>Ajouter un Logiciel</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedToolId('all');
                    setSelectedModule('all');
                    setSelectedLevel('all');
                    setSearchFilter('');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCatalog.map((toolGroup) => {
                const totalInTool = toolGroup.functions.length;
                const addedFromTool = toolGroup.functions.filter((fn) =>
                  practiceList.some((item) => item.functionId === fn.id)
                ).length;
                const allAdded = addedFromTool === totalInTool && totalInTool > 0;

                return (
                  <div
                    key={toolGroup.toolId}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs space-y-0"
                  >
                    {/* Software Group Header */}
                    <div className="bg-slate-50/80 border-b border-slate-200 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs ${
                          toolGroup.color === 'emerald'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : toolGroup.color === 'amber'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : toolGroup.color === 'purple'
                            ? 'bg-purple-100 text-purple-800 border border-purple-300'
                            : toolGroup.color === 'blue'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          M{toolGroup.moduleNumber}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="font-bold text-slate-900 text-base">
                              {toolGroup.toolName}
                            </h2>
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
                              {toolGroup.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {toolGroup.description}
                          </p>
                        </div>
                      </div>

                      {/* Tool Actions */}
                      <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
                        <span className="text-xs text-slate-500 font-medium mr-1">
                          {addedFromTool} / {totalInTool} dans la liste
                        </span>
                        
                        {/* ADD FUNCTION TO THIS TOOL BUTTON */}
                        <button
                          onClick={() => {
                            setTargetToolForNewFunction(toolGroup.toolId);
                            setIsAddFunctionModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                          title={`Ajouter une nouvelle fonction à ${toolGroup.toolName}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Fonction</span>
                        </button>

                        {/* Quick Hide Tool button */}
                        <button
                          onClick={() => hideTool(toolGroup.toolId, toolGroup.toolName)}
                          className="px-2.5 py-1.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                          title={`Masquer ${toolGroup.toolName} du catalogue`}
                        >
                          <EyeOff className="w-3.5 h-3.5" />
                          <span className="hidden md:inline">Masquer</span>
                        </button>

                        {/* DELETE MODULE BUTTON */}
                        <button
                          onClick={() => triggerDeleteModule(toolGroup)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all shadow-2xs"
                          title={`Supprimer le module / logiciel ${toolGroup.toolName}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        {/* ADD ALL BUTTON */}
                        <button
                          onClick={() => handleAddAllFromTool(toolGroup)}
                          disabled={allAdded || totalInTool === 0}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            allAdded && totalInTool > 0
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                              : totalInTool === 0
                              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                              : 'bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200 hover:border-indigo-300 shadow-2xs'
                          }`}
                        >
                          {allAdded && totalInTool > 0 ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Toutes ajoutées</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Tout ajouter ({totalInTool})</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Functions Grid */}
                    {toolGroup.functions.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50/50 space-y-2">
                        <p className="text-xs text-slate-500 font-medium">
                          Aucune fonction n'a encore été ajoutée pour ce logiciel.
                        </p>
                        <button
                          onClick={() => {
                            setTargetToolForNewFunction(toolGroup.toolId);
                            setIsAddFunctionModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Ajouter la première fonction</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {toolGroup.functions.map((fn) => {
                          const existingPractice = getPracticeItem(fn.id);
                          const isInList = !!existingPractice;

                          return (
                            <div
                              key={fn.id}
                              className={`border rounded-xl p-4 flex flex-col justify-between transition-all ${
                                isInList
                                  ? 'bg-indigo-50/30 border-indigo-200 ring-1 ring-indigo-500/20'
                                  : 'bg-white hover:bg-slate-50/60 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="space-y-2.5">
                                
                                {/* Top badges & Delete Item Button */}
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                    {fn.category}
                                  </span>
                                  
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      fn.level === 'Débutant'
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : fn.level === 'Intermédiaire'
                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                    }`}>
                                      {fn.level === 'Débutant' ? '🟢 Débutant' : fn.level === 'Intermédiaire' ? '🟡 Intermédiaire' : '🔴 Avancé'}
                                    </span>

                                    {/* DELETE ITEM BUTTON FROM CATALOG */}
                                    <button
                                      onClick={() => triggerDeleteFunction(fn, toolGroup.toolId)}
                                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                      title="Supprimer cette fonction du catalogue"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                                  {fn.name}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-slate-600 leading-relaxed">
                                  {fn.description}
                                </p>

                                {/* Practical Use Case */}
                                <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-200/80 space-y-1">
                                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                    <BookOpen className="w-3 h-3 text-indigo-600" />
                                    Cas d'usage professionnel :
                                  </div>
                                  <div className="text-[11px] text-slate-800 leading-relaxed font-medium">
                                    {fn.practicalUseCase}
                                  </div>
                                </div>

                                {/* Shortcut / Formula hint if available */}
                                {fn.shortcutOrSyntax && (
                                  <div className="bg-slate-900 text-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-mono flex items-center gap-1.5 overflow-x-auto">
                                    <Terminal className="w-3 h-3 text-emerald-400 shrink-0" />
                                    <span className="truncate">{fn.shortcutOrSyntax}</span>
                                  </div>
                                )}

                              </div>

                              {/* Action Bar (Click to Add / Status toggle) */}
                              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                {isInList ? (
                                  <div className="flex items-center justify-between w-full">
                                    {/* Status Selector */}
                                    <div className="flex items-center gap-1.5">
                                      <select
                                        value={existingPractice.status}
                                        onChange={(e) =>
                                          handleUpdateStatus(
                                            existingPractice.id,
                                            e.target.value as any
                                          )
                                        }
                                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border cursor-pointer ${
                                          existingPractice.status === 'mastered'
                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                            : existingPractice.status === 'in_progress'
                                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                                            : 'bg-indigo-50 text-indigo-800 border-indigo-300'
                                        }`}
                                      >
                                        <option value="todo">⏳ À travailler</option>
                                        <option value="in_progress">🔄 En cours</option>
                                        <option value="mastered">✅ Maîtrisé</option>
                                      </select>
                                    </div>

                                    <button
                                      onClick={() => handleToggleFunction(fn)}
                                      className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 px-2 py-1 rounded-md hover:bg-rose-50 transition-colors"
                                      title="Retirer de ma liste"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span className="text-[11px]">Retirer</span>
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleAddFunction(fn)}
                                    className="w-full py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs hover:shadow-sm"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Ajouter à ma liste à travailler</span>
                                  </button>
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
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2 : MY PRACTICE CHECKLIST (FEUILLE DE ROUTE D'APPRENTISSAGE)          */}
      {/* ========================================================================= */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          
          {/* Checklist Summary Card with Filters */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-indigo-600" />
                  Tableau de Bord & Checklist Personnalisée
                </h2>
                <p className="text-xs text-slate-500">
                  {filteredChecklist.length} fonction{filteredChecklist.length > 1 ? 's' : ''} affichée{filteredChecklist.length > 1 ? 's' : ''} sur {practiceList.length} au total
                </p>
              </div>

              {/* Top Checklist Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                {stats.masteredCount > 0 && (
                  <button
                    onClick={handleClearMastered}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Retirer les fonctions déjà maîtrisées pour alléger votre vue"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Archiver les maîtrisées ({stats.masteredCount})</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setTargetToolForNewFunction(catalog[0]?.toolId || '');
                    setIsAddFunctionModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Nouvelle compétence</span>
                </button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100 items-center">
              
              {/* Status Filter Tabs */}
              <div className="sm:col-span-5 flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'all', label: 'Toutes', count: practiceList.length },
                  { id: 'todo', label: '⏳ À travailler', count: stats.todoCount },
                  { id: 'in_progress', label: '🔄 En cours', count: stats.inProgressCount },
                  { id: 'mastered', label: '✅ Maîtrisées', count: stats.masteredCount },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setChecklistStatusFilter(tab.id as any)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center gap-1 ${
                      checklistStatusFilter === tab.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-75 font-normal">({tab.count})</span>
                  </button>
                ))}
              </div>

              {/* Tool Filter inside Checklist */}
              <div className="sm:col-span-4">
                <select
                  value={checklistToolFilter}
                  onChange={(e) => setChecklistToolFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
                >
                  <option value="all">Tous les logiciels représentés</option>
                  {checklistTools.map((toolName) => (
                    <option key={toolName} value={toolName}>
                      🛠️ {toolName} ({practiceList.filter((p) => p.toolName === toolName).length})
                    </option>
                  ))}
                </select>
              </div>

              {/* Search inside Checklist */}
              <div className="sm:col-span-3">
                <div className="relative">
                  <input
                    type="text"
                    value={checklistSearch}
                    onChange={(e) => setChecklistSearch(e.target.value)}
                    placeholder="Filtrer ma liste..."
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>

            {/* Visibility synchronization toggle row in checklist */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900 select-none">
                <input
                  type="checkbox"
                  checked={applyVisibilityToChecklist}
                  onChange={(e) => setApplyVisibilityToChecklist(e.target.checked)}
                  className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="font-medium">
                  Appliquer le masquage des logiciels à cette checklist
                </span>
                {hiddenToolIds.length > 0 && applyVisibilityToChecklist && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    {hiddenToolIds.length} masqué{hiddenToolIds.length > 1 ? 's' : ''}
                  </span>
                )}
              </label>

              <button
                onClick={() => setIsVisibilityModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <SlidersHorizontal className="w-3 h-3 text-indigo-600" />
                <span>Gérer les logiciels visibles ({stats.visibleToolsCount}/{stats.totalToolsCount})</span>
              </button>
            </div>
          </div>

          {/* Checklist Items List */}
          {filteredChecklist.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3 shadow-xs">
              <ListChecks className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">
                {practiceList.length === 0
                  ? 'Votre liste de travail est vide'
                  : 'Aucune fonction ne correspond à ces critères'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {practiceList.length === 0
                  ? 'Basculez sur l\'onglet "Catalogue" pour piocher les fonctions logicielles de votre choix ou créez une compétence sur-mesure.'
                  : hiddenToolIds.length > 0 && applyVisibilityToChecklist
                  ? `Certaines tâches peuvent être masquées car ${hiddenToolIds.length} logiciel(s) sont exclus. Décochez "Appliquer le masquage" ou réinitialisez vos filtres.`
                  : 'Modifiez vos critères de statut ou de logiciel pour afficher les éléments.'}
              </p>
              {practiceList.length === 0 ? (
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                >
                  Ouvrir le catalogue de fonctions →
                </button>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {hiddenToolIds.length > 0 && applyVisibilityToChecklist && (
                    <button
                      onClick={() => setApplyVisibilityToChecklist(false)}
                      className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 text-xs font-semibold transition-colors"
                    >
                      Afficher les tâches des logiciels masqués
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setChecklistStatusFilter('all');
                      setChecklistToolFilter('all');
                      setChecklistSearch('');
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredChecklist.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white border rounded-2xl p-4 sm:p-5 transition-all shadow-xs ${
                    item.status === 'mastered'
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : item.status === 'in_progress'
                      ? 'border-amber-200 bg-amber-50/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    
                    {/* Left: Check Status + Main Info */}
                    <div className="flex items-start gap-3 min-w-0">
                      
                      {/* Interactive Status Indicator Button */}
                      <button
                        onClick={() => {
                          const nextStatus: Record<string, 'todo' | 'in_progress' | 'mastered'> = {
                            todo: 'in_progress',
                            in_progress: 'mastered',
                            mastered: 'todo',
                          };
                          handleUpdateStatus(item.id, nextStatus[item.status]);
                        }}
                        className={`p-2 rounded-xl border transition-all mt-0.5 shrink-0 ${
                          item.status === 'mastered'
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                            : item.status === 'in_progress'
                            ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-400 border-slate-300'
                        }`}
                        title="Cliquer pour changer de statut"
                      >
                        {item.status === 'mastered' ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : item.status === 'in_progress' ? (
                          <Clock className="w-5 h-5 animate-pulse" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      {/* Item Details */}
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                            🛠️ {item.toolName}
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                            {item.category}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.level === 'Débutant'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : item.level === 'Intermédiaire'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {item.level}
                          </span>

                          {/* Priority Selector */}
                          <select
                            value={item.priority}
                            onChange={(e) => handleUpdatePriority(item.id, e.target.value as any)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border cursor-pointer ${
                              item.priority === 'high'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : item.priority === 'medium'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            <option value="high">🔴 Priorité Haute</option>
                            <option value="medium">🟡 Priorité Moyenne</option>
                            <option value="low">🟢 Priorité Basse</option>
                          </select>
                        </div>

                        <h3 className={`font-bold text-sm sm:text-base ${
                          item.status === 'mastered' ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}>
                          {item.name}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-200 text-xs space-y-1">
                          <span className="font-bold text-[10px] uppercase text-slate-500 tracking-wider flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-indigo-600" />
                            Cas d'usage professionnel :
                          </span>
                          <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                            {item.practicalUseCase}
                          </p>
                        </div>

                        {/* Personal Notes / Target Date Toggle Section */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                          <div className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>Objectif :</span>
                            <input
                              type="date"
                              value={item.targetDate || ''}
                              onChange={(e) => handleUpdateItemDetails(item.id, { targetDate: e.target.value })}
                              className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="flex-1 w-full sm:w-auto">
                            <input
                              type="text"
                              placeholder="Ajouter une note personnelle..."
                              value={item.notes || ''}
                              onChange={(e) => handleUpdateItemDetails(item.id, { notes: e.target.value })}
                              className="w-full text-[11px] px-2.5 py-1 bg-white border border-slate-200 rounded-md text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center sm:flex-col gap-2 shrink-0 self-end sm:self-start">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item.id, e.target.value as any)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer ${
                          item.status === 'mastered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : item.status === 'in_progress'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-indigo-50 text-indigo-800 border-indigo-300'
                        }`}
                      >
                        <option value="todo">⏳ À travailler</option>
                        <option value="in_progress">🔄 En cours</option>
                        <option value="mastered">✅ Maîtrisé</option>
                      </select>

                      <button
                        onClick={() => handleRemovePracticeItem(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Retirer de ma liste"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL : ADD MODULE / SOFTWARE GROUP                                       */}
      {/* ========================================================================= */}
      <AddModuleModal
        isOpen={isAddModuleModalOpen}
        onClose={() => setIsAddModuleModalOpen(false)}
        onAddModule={handleAddModule}
      />

      {/* ========================================================================= */}
      {/* MODAL : ADD FUNCTION / ITEM TO CATALOG                                    */}
      {/* ========================================================================= */}
      <AddFunctionModal
        isOpen={isAddFunctionModalOpen}
        onClose={() => setIsAddFunctionModalOpen(false)}
        availableTools={catalog}
        defaultToolId={targetToolForNewFunction}
        onAddFunction={handleAddFunctionToCatalog}
      />

      {/* ========================================================================= */}
      {/* MODAL : MANAGE SOFTWARE VISIBILITY                                        */}
      {/* ========================================================================= */}
      <ManageVisibilityModal
        isOpen={isVisibilityModalOpen}
        onClose={() => setIsVisibilityModalOpen(false)}
        catalog={catalog}
        hiddenToolIds={hiddenToolIds}
        practiceList={practiceList}
        applyVisibilityToChecklist={applyVisibilityToChecklist}
        onToggleToolVisibility={toggleToolVisibility}
        onShowAllTools={showAllTools}
        onHideAllTools={hideAllTools}
        onSetApplyVisibilityToChecklist={setApplyVisibilityToChecklist}
        onResetToDefaultCatalog={triggerResetCatalog}
      />

      {/* ========================================================================= */}
      {/* MODAL : DELETE CONFIRMATION                                               */}
      {/* ========================================================================= */}
      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title={deleteModalState.title}
        message={deleteModalState.message}
        itemName={deleteModalState.itemName}
        badgeText={deleteModalState.badgeText}
      />

    </div>
  );
};
