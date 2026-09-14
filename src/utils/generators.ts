import { TrainingProgram, StructuredNote, NoteValue } from '../types';

export interface NotesMap {
  [key: string]: StructuredNote | string;
}

export function getStructuredNote(rawNote?: NoteValue, defaultNotes?: NoteValue): StructuredNote {
  const target = rawNote !== undefined ? rawNote : defaultNotes;
  if (!target) {
    return { green: '', orange: '', red: '' };
  }
  if (typeof target === 'object' && target !== null) {
    return {
      green: target.green || '',
      orange: target.orange || '',
      red: target.red || ''
    };
  }
  return {
    green: typeof target === 'string' ? target : '',
    orange: '',
    red: ''
  };
}

export function isNoteEmpty(note?: NoteValue): boolean {
  if (!note) return true;
  if (typeof note === 'string') return note.trim().length === 0;
  return (
    (note.green || '').trim().length === 0 &&
    (note.orange || '').trim().length === 0 &&
    (note.red || '').trim().length === 0
  );
}

export function countFilledNotes(notesMap: NotesMap): number {
  let count = 0;
  Object.values(notesMap).forEach((val) => {
    if (!isNoteEmpty(val)) {
      count++;
    }
  });
  return count;
}

export function generateMarkdownOutput(program: TrainingProgram, userNotes: NotesMap): string {
  let md = `# 🧠 CARTE MENTALE & PLAN DE FORMATION\n\n`;
  md += `## 🎯 Sujet Central : ${program.title} (${program.organization})\n`;
  md += `> **Sous-titre :** ${program.subtitle}\n\n`;

  md += `### 📌 Cadre & Infos Pratiques :\n`;
  md += `- ⏱️ **Durée :** ${program.meta.durationHours}h / ${program.meta.durationWeeks} semaines (${program.meta.startDate} - ${program.meta.endDate})\n`;
  md += `- 📍 **Lieu :** ${program.meta.location}\n`;
  md += `- 💻 **Prérequis :** ${program.meta.prerequisites}\n`;
  md += `- 🎒 **Format :** ${program.meta.format}\n\n`;

  const globalNote = getStructuredNote(userNotes['global']);
  md += `### 📝 Mes notes générales de cadrage (3 Cases) :\n`;
  md += `- 🟢 **Vert (Objectifs & Acquis) :** ${globalNote.green || '...'}\n`;
  md += `- 🟠 **Orange (À approfondir & Vigilance) :** ${globalNote.orange || '...'}\n`;
  md += `- 🔴 **Rouge (Difficultés & Points bloquants) :** ${globalNote.red || '...'}\n\n`;
  md += `---\n\n`;

  program.modules.forEach((mod) => {
    md += `## 📦 Module ${mod.number} - ${mod.title} (${mod.weeks})\n`;
    md += `*Durée indicative : ${mod.duration}*  \n`;
    md += `*Objectif : ${mod.description}*\n\n`;

    mod.topics.forEach((topic) => {
      md += `### 🔹 ${topic.title}\n`;
      md += `- **Résumé :** ${topic.summary}\n`;
      md += `- **Concepts clés :** ${topic.keyConcepts.join(', ')}\n\n`;

      const topicNote = getStructuredNote(userNotes[topic.id], topic.defaultNotes);
      md += `#### 📝 Mes notes (3 Niveaux) :\n`;
      md += `- 🟢 **Vert (Acquis / Points forts) :** ${topicNote.green || '...'}\n`;
      md += `- 🟠 **Orange (En cours / Vigilance) :** ${topicNote.orange || '...'}\n`;
      md += `- 🔴 **Rouge (Bloquants / Questions tuteur) :** ${topicNote.red || '...'}\n\n`;

      if (topic.tools && topic.tools.length > 0) {
        md += `#### 🛠️ Outils & Technologies abordés :\n\n`;
        topic.tools.forEach((tool) => {
          md += `##### ⚙️ ${tool.name} *(${tool.category})*\n`;
          md += `> ${tool.description}\n\n`;
          md += `**❓ Questions fréquentes & Réponses clés (FAQ Outil) :**\n`;
          tool.faqs.forEach((faq, index) => {
            md += `  ${index + 1}. **Q : ${faq.question}**\n`;
            md += `     - 💡 *R : ${faq.answer}*\n`;
          });
          md += `\n`;
        });
      }
      md += `---\n\n`;
    });
  });

  return md;
}

function sanitizeForMermaid(text: string): string {
  return text
    .replace(/[()[\]{}"#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export type MermaidNatureTheme = 'forest' | 'sage' | 'earth' | 'eucalyptus';

export const MERMAID_NATURE_THEMES: Record<
  MermaidNatureTheme,
  {
    name: string;
    icon: string;
    primary: string;
    line: string;
    accent: string;
    bgLight: string;
    nodeText: string;
    branchColors: string[];
  }
> = {
  forest: {
    name: 'Forêt & Émeraude',
    icon: '🌲',
    primary: '#1b4332',
    line: '#2d6a4f',
    accent: '#52b788',
    bgLight: '#f4fbf7',
    nodeText: '#ffffff',
    branchColors: ['#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#1b4332', '#358f68', '#4d7c0f', '#0f766e'],
  },
  sage: {
    name: 'Sauge & Bambou',
    icon: '🌿',
    primary: '#365314',
    line: '#4d7c0f',
    accent: '#84cc16',
    bgLight: '#f7fee7',
    nodeText: '#ffffff',
    branchColors: ['#4d7c0f', '#65a30d', '#84cc16', '#3f6212', '#a3e635', '#22c55e', '#15803d', '#4ade80', '#166534'],
  },
  earth: {
    name: 'Terre & Bois de Chêne',
    icon: '🍂',
    primary: '#451a03',
    line: '#78350f',
    accent: '#b45309',
    bgLight: '#fffbeb',
    nodeText: '#ffffff',
    branchColors: ['#78350f', '#92400e', '#b45309', '#d97706', '#854d0e', '#a16207', '#573312', '#8c531b', '#6b3e15'],
  },
  eucalyptus: {
    name: 'Eucalyptus & Brume',
    icon: '🍃',
    primary: '#134e4a',
    line: '#0f766e',
    accent: '#14b8a6',
    bgLight: '#f0fdfa',
    nodeText: '#ffffff',
    branchColors: ['#0f766e', '#14b8a6', '#2dd4bf', '#115e59', '#0d9488', '#5eead4', '#047857', '#059669', '#10b981'],
  },
};

export function generateMermaidCode(
  program: TrainingProgram,
  userNotes: NotesMap,
  options?: {
    theme?: MermaidNatureTheme;
    includeFaq?: boolean;
    includeNotes?: boolean;
    truncateNotes?: boolean;
  }
): string {
  const themeKey = options?.theme || 'forest';
  const theme = MERMAID_NATURE_THEMES[themeKey] || MERMAID_NATURE_THEMES.forest;
  const includeFaq = options?.includeFaq ?? true;
  const includeNotes = options?.includeNotes ?? true;
  const truncateNotes = options?.truncateNotes ?? false;

  let code = `%%{init: {
  "theme": "base",
  "themeVariables": {
    "primaryColor": "${theme.primary}",
    "primaryTextColor": "${theme.nodeText}",
    "primaryBorderColor": "${theme.primary}",
    "lineColor": "${theme.line}",
    "secondaryColor": "${theme.accent}",
    "tertiaryColor": "${theme.bgLight}",
    "fontFamily": "system-ui, -apple-system, sans-serif",
    "fontSize": "13px"
  }
}}%%\n`;

  code += `mindmap\n`;
  code += `  root((🌱 Formation Chef.fe de Projet\\nTransformation Numérique\\nWinSide))\n`;
  code += `    🌿 Cadre & Infos Pratiques\n`;
  code += `      ⏱️ Durée: 413h / 13 semaines\n`;
  code += `      📅 Dates: 22 Juin - 2 Oct 2026\n`;
  code += `      📍 Paris 18e & Distanciel\n`;
  code += `      💻 Prérequis: Ordinateur PC portable\n`;

  const formatNoteForMermaid = (label: string, text: string): string => {
    let clean = sanitizeForMermaid(text);
    if (truncateNotes && clean.length > 50) {
      clean = clean.substring(0, 50) + '...';
    } else if (clean.length > 45) {
      // Split into multi-lines if long so Mermaid displays it cleanly
      const words = clean.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      words.forEach((word) => {
        if ((currentLine + ' ' + word).trim().length > 40) {
          if (currentLine) lines.push(currentLine.trim());
          currentLine = word;
        } else {
          currentLine = (currentLine + ' ' + word).trim();
        }
      });
      if (currentLine) lines.push(currentLine.trim());
      clean = lines.join('\\n');
    }
    return `["${label}: ${clean}"]`;
  };

  const globalNote = getStructuredNote(userNotes['global']);
  if (includeNotes) {
    if (globalNote.green.trim()) {
      code += `      ${formatNoteForMermaid('🟢 Acquis', globalNote.green)}\n`;
    }
    if (globalNote.orange.trim()) {
      code += `      ${formatNoteForMermaid('🟠 Vigilance', globalNote.orange)}\n`;
    }
    if (globalNote.red.trim()) {
      code += `      ${formatNoteForMermaid('🔴 Bloquant', globalNote.red)}\n`;
    }
  }

  const moduleNatureIcons = ['🍃', '🎋', '🌿', '🌱', '🌾', '🌲', '🍀', '🍂', '🌳'];

  program.modules.forEach((mod, modIdx) => {
    const icon = moduleNatureIcons[modIdx % moduleNatureIcons.length];
    const modTitle = sanitizeForMermaid(`${icon} M${mod.number}: ${mod.title} (${mod.weeks})`);
    code += `    ${modTitle}\n`;

    mod.topics.forEach((topic) => {
      const topicTitle = sanitizeForMermaid(`▫️ ${topic.title}`);
      code += `      ${topicTitle}\n`;

      if (includeNotes) {
        const topicNote = getStructuredNote(userNotes[topic.id], topic.defaultNotes);
        if (topicNote.green.trim()) {
          code += `        ${formatNoteForMermaid('🟢 Vert (Acquis)', topicNote.green)}\n`;
        }
        if (topicNote.orange.trim()) {
          code += `        ${formatNoteForMermaid('🟠 Orange (Vigilance)', topicNote.orange)}\n`;
        }
        if (topicNote.red.trim()) {
          code += `        ${formatNoteForMermaid('🔴 Rouge (Bloquant)', topicNote.red)}\n`;
        }
      }

      if (topic.tools && topic.tools.length > 0) {
        topic.tools.forEach((tool) => {
          const toolName = sanitizeForMermaid(`🛠️ ${tool.name}`);
          code += `        ${toolName}\n`;
          if (includeFaq && tool.faqs && tool.faqs.length > 0) {
            tool.faqs.forEach((faq) => {
              const q = sanitizeForMermaid(faq.question);
              const a = sanitizeForMermaid(faq.answer);
              const cleanQ = q.length > 45 ? q.substring(0, 45) + '...' : q;
              code += `          💡 FAQ: ${cleanQ}\n`;
            });
          }
        });
      }
    });
  });

  return code;
}

export function generatePlantUMLCode(program: TrainingProgram, userNotes: NotesMap): string {
  let puml = `@startmindmap\n`;
  puml += `<style>\nmindmapDiagram {\n  node {\n    BackgroundColor #F8FAFC\n    BorderColor #64748B\n    FontName Arial\n  }\n  :depth(1) {\n    BackgroundColor #EDE9FE\n    BorderColor #7C3AED\n  }\n  :depth(2) {\n    BackgroundColor #E0F2FE\n    BorderColor #0284C7\n  }\n}\n</style>\n\n`;

  puml += `* **Formation Chef.fe de Projet en Transformation Numérique**\\n(WinSide)\n`;
  puml += `** 📌 Cadre & Infos Pratiques\n`;
  puml += `*** ⏱️ 413h / 13 semaines (22 Juin - 2 Oct 2026)\n`;
  puml += `*** 📍 14 rue de la Concertation, 75018 Paris & Distanciel\n`;
  puml += `*** 💻 Prérequis : Ordinateur portable\n`;

  program.modules.forEach((mod) => {
    puml += `** 📦 Module ${mod.number} - ${mod.title}\\n(${mod.weeks})\n`;
    mod.topics.forEach((topic) => {
      puml += `*** 🔹 ${topic.title}\n`;
      const topicNote = getStructuredNote(userNotes[topic.id], topic.defaultNotes);
      
      if (topicNote.green.trim()) {
        const cleanG = topicNote.green.replace(/[\n\r]+/g, ' ');
        puml += `**** 🟢 Vert (Acquis) : ${cleanG}\n`;
      }
      if (topicNote.orange.trim()) {
        const cleanO = topicNote.orange.replace(/[\n\r]+/g, ' ');
        puml += `**** 🟠 Orange (Vigilance) : ${cleanO}\n`;
      }
      if (topicNote.red.trim()) {
        const cleanR = topicNote.red.replace(/[\n\r]+/g, ' ');
        puml += `**** 🔴 Rouge (Bloquant) : ${cleanR}\n`;
      }

      if (topic.tools && topic.tools.length > 0) {
        topic.tools.forEach((tool) => {
          puml += `**** 🛠️ ${tool.name}\n`;
          tool.faqs.forEach((faq) => {
            const cleanQ = faq.question.replace(/[\n\r]+/g, ' ');
            const cleanA = faq.answer.replace(/[\n\r]+/g, ' ');
            puml += `***** ❓ Q: ${cleanQ}\\n💡 R: ${cleanA}\n`;
          });
        });
      }
    });
  });

  puml += `@endmindmap\n`;
  return puml;
}
