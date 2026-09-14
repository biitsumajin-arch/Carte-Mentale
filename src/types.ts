export interface StructuredNote {
  green: string;   // Vert : Acquis, points forts, notions maîtrisées
  orange: string;  // Orange : En cours d'assimilation, à approfondir, points de vigilance
  red: string;     // Rouge : Difficultés, points bloquants, questions pour le formateur
}

export type NoteValue = string | StructuredNote;

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badgeColor?: string;
  faqs: FaqItem[];
}

export interface TopicItem {
  id: string;
  title: string;
  summary: string;
  tools?: ToolItem[];
  keyConcepts: string[];
  defaultNotes?: string | StructuredNote;
}

export interface ModuleItem {
  id: string;
  number: number | string;
  title: string;
  duration: string;
  weeks: string;
  color: string;
  iconName: string;
  description: string;
  topics: TopicItem[];
}

export interface TrainingProgram {
  title: string;
  subtitle: string;
  organization: string;
  meta: {
    durationHours: number;
    durationWeeks: number;
    startDate: string;
    endDate: string;
    location: string;
    format: string;
    prerequisites: string;
  };
  modules: ModuleItem[];
}

export interface SoftwareFunction {
  id: string;
  toolId: string;
  toolName: string;
  name: string;
  category: string;
  description: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  practicalUseCase: string;
  shortcutOrSyntax?: string;
}

export interface PracticeItem {
  id: string;
  functionId: string;
  toolId: string;
  toolName: string;
  name: string;
  category: string;
  description: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  practicalUseCase: string;
  status: 'todo' | 'in_progress' | 'mastered';
  priority: 'low' | 'medium' | 'high';
  addedAt: string;
  targetDate?: string;
  notes?: string;
}

export type ViewMode = 'mindmap' | 'markdown' | 'mermaid' | 'plantuml' | 'faqs' | 'flashcards' | 'software_functions';
