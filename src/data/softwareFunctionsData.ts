import { SoftwareFunction } from '../types';

export interface ToolFunctionsGroup {
  toolId: string;
  toolName: string;
  category: string;
  moduleNumber: number | string;
  moduleTitle: string;
  color: string;
  iconName: string;
  description: string;
  websiteUrl?: string;
  functions: SoftwareFunction[];
}

export const softwareFunctionsDataset: ToolFunctionsGroup[] = [
  // --- MODULE 1: FONDATIONS & AUTOMATION ---
  {
    toolId: 'tool-make',
    toolName: 'Make (ex-Integromat)',
    category: 'iPaaS & Automatisation de Flux',
    moduleNumber: 1,
    moduleTitle: 'Fondations & Automation',
    color: 'amber',
    iconName: 'Zap',
    description: 'Plateforme visuelle d\'orchestration pour interconnecter les API et automatiser des processus métier complexes.',
    websiteUrl: 'https://www.make.com',
    functions: [
      {
        id: 'make-fn-1',
        toolId: 'tool-make',
        toolName: 'Make',
        name: 'Webhooks instantanés & Parsing JSON',
        category: 'Déclencheurs & API',
        description: 'Configurer un Webhook entrant personnalisé (Custom Webhook) pour recevoir des événements en temps réel depuis une application tierce et structurer automatiquement les données JSON reçues.',
        level: 'Débutant',
        practicalUseCase: 'Recevoir instantanément les soumissions d\'un formulaire Tally ou Typeform et déclencher le workflow sans délai.',
        shortcutOrSyntax: 'Custom Webhook -> Run once -> Payload inspector'
      },
      {
        id: 'make-fn-2',
        toolId: 'tool-make',
        toolName: 'Make',
        name: 'Routeurs & Filtres Conditionnels Multi-Branches',
        category: 'Logique & Flux',
        description: 'Diviser un flux en plusieurs branches conditionnelles avec des règles de filtrage strictes basées sur des opérateurs logiques (égal, contient, regex, supérieur à).',
        level: 'Intermédiaire',
        practicalUseCase: 'Router un prospect vers le commercial dédié selon le montant estimé du projet et la zone géographique saisie.',
        shortcutOrSyntax: 'Router -> Setup filter (Text operators / Number operators)'
      },
      {
        id: 'make-fn-3',
        toolId: 'tool-make',
        toolName: 'Make',
        name: 'Iterators & Array Aggregators',
        category: 'Manipulation de Données',
        description: 'Découper un tableau complexe en paquets unitaires distincts (Iterator) pour les traiter individuellement, puis fusionner plusieurs paquets en un tableau unique structuré (Array Aggregator).',
        level: 'Avancé',
        practicalUseCase: 'Extraire les lignes d\'une commande client reçue pour créer chaque article dans Airtable, puis agréger le récapitulatif dans un email unique.',
        shortcutOrSyntax: 'Iterator: {{1.items[]}} -> Action -> Array Aggregator'
      },
      {
        id: 'make-fn-4',
        toolId: 'tool-make',
        toolName: 'Make',
        name: 'Directives de Gestion d\'Erreurs (Error Handlers)',
        category: 'Résilience & Sécurité',
        description: 'Attacher des modules de secours aux étapes critiques avec les directives Resume (valeur par défaut), Ignore (passer au suivant), Break (retenter plus tard) ou Rollback.',
        level: 'Avancé',
        practicalUseCase: 'Gérer les indisponibilités de serveurs ou les limites de taux (HTTP 429) en rejouant automatiquement la requête 3 fois avec délai exponentiel.',
        shortcutOrSyntax: 'Right click on module -> Add error handler -> Break / Resume'
      },
      {
        id: 'make-fn-5',
        toolId: 'tool-make',
        toolName: 'Make',
        name: 'Requêtes HTTP / REST génériques (Make an API Call)',
        category: 'Intégration API',
        description: 'Interroger n\'importe quelle API externe non listée dans les modules standards via des requêtes HTTP GET/POST/PATCH/DELETE avec headers personnalisés et authentification Bearer.',
        level: 'Avancé',
        practicalUseCase: 'Se connecter à l\'API d\'un logiciel métier interne ou appeler un modèle d\'IA Gemini personnalisé avec prompt JSON.',
        shortcutOrSyntax: 'HTTP Module -> Make a request -> JSON Body parser'
      },
      {
        id: 'make-fn-6',
        toolId: 'tool-make',
        toolName: 'Make',
        name: 'Formules de transformation de chaînes & dates',
        category: 'Transformation',
        description: 'Utiliser les fonctions intégrées de Make pour formater les dates (formatDate), manipuler les textes (split, substring, lower) et faire des calculs mathématiques sans code.',
        level: 'Intermédiaire',
        practicalUseCase: 'Convertir une date ISO UTC en format français JJ/MM/AAAA et nettoyer les espaces superflus d\'un numéro SIRET.',
        shortcutOrSyntax: '{{formatDate(now; "DD/MM/YYYY HH:mm"; "Europe/Paris")}}'
      },
      {
        id: 'make-fn-7',
        toolId: 'tool-make',
        toolName: 'Make',
        name: 'Data Stores internes & Variables globales',
        category: 'Persistance',
        description: 'Créer et interroger des tables de stockage internes à Make pour mémoriser des états, des compteurs ou des clés de déduplication entre exécutions.',
        level: 'Intermédiaire',
        practicalUseCase: 'Empêcher le traitement en doublon d\'un même identifiant client lors d\'imports en masse.',
        shortcutOrSyntax: 'Data Store -> Add/Replace a record (Key-Value pair)'
      }
    ]
  },
  {
    toolId: 'tool-airtable',
    toolName: 'Airtable',
    category: 'Base de Données Hybride No-Code',
    moduleNumber: 1,
    moduleTitle: 'Fondations & Automation',
    color: 'amber',
    iconName: 'Database',
    description: 'Système relationnel combinant l\'ergonomie visuelle d\'un tableur et la rigueur de modélisation d\'une base de données SQL.',
    websiteUrl: 'https://airtable.com',
    functions: [
      {
        id: 'airtable-fn-1',
        toolId: 'tool-airtable',
        toolName: 'Airtable',
        name: 'Modélisation Relationnelle & Clés Étrangères',
        category: 'Modélisation',
        description: 'Créer des liaisons entre tables (Link to another record) pour modéliser des relations 1-N (un client a plusieurs commandes) et N-N via table de jonction.',
        level: 'Débutant',
        practicalUseCase: 'Lier la table "Clients", "Projets" et "Livrables" pour garantir l\'intégrité des références sans duplication de texte.',
        shortcutOrSyntax: 'Field Type: Link to another record -> Limit to single/multiple'
      },
      {
        id: 'airtable-fn-2',
        toolId: 'tool-airtable',
        toolName: 'Airtable',
        name: 'Formules Avancées, Lookups & Rollups Conditionnels',
        category: 'Calculs & Données',
        description: 'Extraire des valeurs liées via Lookup et agréger des métriques précises (Somme, Moyenne, Ratio) avec la fonction Rollup soumise à des conditions de filtre.',
        level: 'Intermédiaire',
        practicalUseCase: 'Calculer automatiquement le chiffre d\'affaires total encaissé par client uniquement pour les factures avec le statut "Payée".',
        shortcutOrSyntax: 'Rollup: SUM(values) avec condition [Statut = "Payée"]'
      },
      {
        id: 'airtable-fn-3',
        toolId: 'tool-airtable',
        toolName: 'Airtable',
        name: 'Automatisations Natives Déclenchées par Événement',
        category: 'Automatisation',
        description: 'Configurer des déclencheurs internes (quand un enregistrement entre dans une vue, quand un formulaire est soumis) pour envoyer des emails, notifier Slack ou créer des enregistrements.',
        level: 'Intermédiaire',
        practicalUseCase: 'Alerter le chef de projet par notification dès qu\'un livrable passe au statut "En revue bloquée".',
        shortcutOrSyntax: 'Automations -> Trigger: When record enters view -> Action: Send email'
      },
      {
        id: 'airtable-fn-4',
        toolId: 'tool-airtable',
        toolName: 'Airtable',
        name: 'Vues Multiples & Permissions de Filtres',
        category: 'Affichage & Ergonomie',
        description: 'Créer des vues personnalisées (Grille, Kanban par statut, Calendrier d\'échéances, Galerie, Chronologie Gantt) avec filtres verrouillés et masquage de colonnes sensibles.',
        level: 'Débutant',
        practicalUseCase: 'Créer une vue Kanban pour le suivi des sprints de l\'équipe et une vue Calendrier partagée avec le client.',
        shortcutOrSyntax: 'View options: Filter -> Sort -> Group by -> Hide fields'
      },
      {
        id: 'airtable-fn-5',
        toolId: 'tool-airtable',
        toolName: 'Airtable',
        name: 'Interfaces Designer & Tableaux de Bord par Rôle',
        category: 'Interface & Dashboard',
        description: 'Construire des pages d\'applications interactives avec graphiques, boutons d\'action, formulaires et listes éditables personnalisées selon les profils utilisateurs.',
        level: 'Avancé',
        practicalUseCase: 'Concevoir un portail interne pour que les consultants saisissent leurs temps passés sans voir les marges financières globales.',
        shortcutOrSyntax: 'Interfaces -> Add page -> Chart element / Record review layout'
      },
      {
        id: 'airtable-fn-6',
        toolId: 'tool-airtable',
        toolName: 'Airtable',
        name: 'Scripts JavaScript d\'Automatisation & API Sync',
        category: 'Code & Extension',
        description: 'Rédiger des scripts en JavaScript au sein du module Scripting Extension pour effectuer des traitements par lots complexes ou synchroniser des bases distantes.',
        level: 'Avancé',
        practicalUseCase: 'Calculer la marge prévisionnelle pondérée de 500 dossiers clients en une seule exécution de script.',
        shortcutOrSyntax: 'base.getTable("Projets").selectRecordsAsync()'
      }
    ]
  },
  {
    toolId: 'tool-notion',
    toolName: 'Notion',
    category: 'Productivité & Base de Connaissance',
    moduleNumber: 1,
    moduleTitle: 'Fondations & Automation',
    color: 'amber',
    iconName: 'FileText',
    description: 'Espace de travail tout-en-un réunissant documentation technique, wikis d\'équipe et bases de données relationnelles.',
    websiteUrl: 'https://www.notion.so',
    functions: [
      {
        id: 'notion-fn-1',
        toolId: 'tool-notion',
        toolName: 'Notion',
        name: 'Bases de Données Relationnelles & Relations Bidirectionnelles',
        category: 'Gestion de Données',
        description: 'Relier des bases entre elles (ex: Objectifs OKR et Projets) avec synchronisation bidirectionnelle automatique des attributs.',
        level: 'Débutant',
        practicalUseCase: 'Associer chaque tâche à un livrable et calculer l\'avancement global du projet via Rollup.',
        shortcutOrSyntax: 'Property -> Relation -> Link to database'
      },
      {
        id: 'notion-fn-2',
        toolId: 'tool-notion',
        toolName: 'Notion',
        name: 'Formules 2.0 avec Fonctions Lambda & Manipulation de Listes',
        category: 'Formules Avancées',
        description: 'Exploiter le nouveau moteur de formules Notion pour filtrer des listes d\'éléments liés, manipuler du texte enrichi et exécuter des opérations mathématiques conditionnelles.',
        level: 'Avancé',
        practicalUseCase: 'Afficher une barre de progression visuelle textuelle (ex: 🟩🟩🟩⬜⬜ 60%) calculée à partir des tâches terminées.',
        shortcutOrSyntax: 'prop("Tâches").filter(current.prop("Statut") == "Fait").length() / prop("Tâches").length()'
      },
      {
        id: 'notion-fn-3',
        toolId: 'tool-notion',
        toolName: 'Notion',
        name: 'Boutons d\'Action d\'Automatisation (Buttons)',
        category: 'Automatisation',
        description: 'Insérer des boutons interactifs pour insérer des blocs préformatés, créer des enregistrements par lot ou modifier des propriétés en un clic.',
        level: 'Intermédiaire',
        practicalUseCase: 'Créer un bouton "Nouveau Compte-Rendu de Réunion" qui génère la trame standard avec la date du jour et les participants.',
        shortcutOrSyntax: '/button -> Add action: Insert blocks / Add page to database'
      },
      {
        id: 'notion-fn-4',
        toolId: 'tool-notion',
        toolName: 'Notion',
        name: 'Notion AI pour la Synthèse & Génération de Documentation',
        category: 'Intelligence Artificielle',
        description: 'Utiliser l\'assistant IA intégré pour générer des résumés de réunions, extraire des plans d\'actions et traduire de la documentation technique.',
        level: 'Débutant',
        practicalUseCase: 'Synthétiser un verbatim client de 10 pages en 5 points clés décisionnels pour le comité de pilotage.',
        shortcutOrSyntax: 'Spacebar -> /ai summarize / Action items'
      },
      {
        id: 'notion-fn-5',
        toolId: 'tool-notion',
        toolName: 'Notion',
        name: 'Gestion des Droits d\'Accès & Espaces d\'Équipe (Teamspaces)',
        category: 'Gouvernance & Sécurité',
        description: 'Organiser l\'espace en Teamspaces avec des permissions granulaires (Lecture seule, Commentaire, Édition complète) par groupe d\'utilisateurs.',
        level: 'Intermédiaire',
        practicalUseCase: 'Isoler les documents de cadrage stratégique et RH de la documentation générale partagée aux stagiaires.',
        shortcutOrSyntax: 'Settings -> Teamspaces -> Manage permissions'
      }
    ]
  },
  {
    toolId: 'tool-tally',
    toolName: 'Tally / Typeform',
    category: 'Formulaires Intelligents & Collecte de Données',
    moduleNumber: 1,
    moduleTitle: 'Fondations & Automation',
    color: 'amber',
    iconName: 'CheckSquare',
    description: 'Générateurs de formulaires dynamiques avec logique conditionnelle avancée et intégrations instantanées.',
    websiteUrl: 'https://tally.so',
    functions: [
      {
        id: 'tally-fn-1',
        toolId: 'tool-tally',
        toolName: 'Tally',
        name: 'Logique Conditionnelle & Sauts de Pages (Branching)',
        category: 'Logique & Parcours',
        description: 'Afficher ou masquer des questions spécifiques selon les réponses précédentes de l\'utilisateur pour créer un parcours sur-mesure.',
        level: 'Débutant',
        practicalUseCase: 'Adapter les questions d\'un audit selon que l\'entreprise compte moins de 10 ou plus de 250 salariés.',
        shortcutOrSyntax: '/conditional logic -> If answer is X then show block Y'
      },
      {
        id: 'tally-fn-2',
        toolId: 'tool-tally',
        toolName: 'Tally',
        name: 'Champs Cachés (Hidden Fields) & Traçabilité UTM',
        category: 'Tracking & Pré-remplissage',
        description: 'Transmettre des paramètres dynamiques via l\'URL (ID client, source marketing, code campagne) pour les stocker sans action de l\'utilisateur.',
        level: 'Intermédiaire',
        practicalUseCase: 'Pré-remplir l\'adresse email et l\'ID client dans un formulaire de satisfaction envoyé par newsletter.',
        shortcutOrSyntax: '/hidden fields -> url?client_id=123&source=newsletter'
      },
      {
        id: 'tally-fn-3',
        toolId: 'tool-tally',
        toolName: 'Tally',
        name: 'Variables de Calcul & Devis Dynamique en Direct',
        category: 'Calculs',
        description: 'Définir des variables mathématiques qui s\'incrémentent en fonction des options cochées pour afficher un prix ou un score en temps réel.',
        level: 'Avancé',
        practicalUseCase: 'Calculer instantanément le coût prévisionnel d\'une prestation No-Code et afficher le total sur la page finale.',
        shortcutOrSyntax: '/calculated fields -> @score = @score + 10'
      }
    ]
  },

  // --- MODULE 2: APPLICATIONS & WEB ---
  {
    toolId: 'tool-bubble',
    toolName: 'Bubble',
    category: 'Plateforme Full-Stack No-Code',
    moduleNumber: 2,
    moduleTitle: 'Applications & Web',
    color: 'blue',
    iconName: 'Globe',
    description: 'Moteur full-stack No-Code leader pour concevoir des applications web complexes avec base de données et workflows backend.',
    websiteUrl: 'https://bubble.io',
    functions: [
      {
        id: 'bubble-fn-1',
        toolId: 'tool-bubble',
        toolName: 'Bubble',
        name: 'Modélisation de Données & Relations de Listes',
        category: 'Data Types',
        description: 'Définir des types de données personnalisés (Data Types), des champs typés et des relations de listes d\'éléments pour structurer l\'application.',
        level: 'Intermédiaire',
        practicalUseCase: 'Créer un type de données "Contrat" avec des sous-champs "Signataires" (List of Users) et "Statut" (Option Set).',
        shortcutOrSyntax: 'Data tab -> Data types -> Create new field'
      },
      {
        id: 'bubble-fn-2',
        toolId: 'tool-bubble',
        toolName: 'Bubble',
        name: 'Règles de Confidentialité Côté Serveur (Privacy Rules)',
        category: 'Sécurité & RGPD',
        description: 'Configurer des règles de sécurité strictes exécutées sur le serveur pour empêcher tout accès non autorisé aux enregistrements sensibles.',
        level: 'Avancé',
        practicalUseCase: 'Garantir qu\'un utilisateur ne peut lire que ses propres factures et que seul l\'administrateur peut modifier le statut d\'un paiement.',
        shortcutOrSyntax: 'Data -> Privacy -> When Current User is Admin -> View all fields'
      },
      {
        id: 'bubble-fn-3',
        toolId: 'tool-bubble',
        toolName: 'Bubble',
        name: 'Workflows Backend & Tâches Planifiées (API Workflows)',
        category: 'Workflows & Serveur',
        description: 'Créer des flux de traitement s\'exécutant en arrière-plan sur le serveur Bubble sans bloquer l\'interface utilisateur du navigateur.',
        level: 'Avancé',
        practicalUseCase: 'Générer et envoyer par email 500 rapports PDF mensuels le premier jour de chaque mois à minuit.',
        shortcutOrSyntax: 'Backend Workflows -> New API Workflow -> Schedule API Workflow'
      },
      {
        id: 'bubble-fn-4',
        toolId: 'tool-bubble',
        toolName: 'Bubble',
        name: 'Connecteur d\'API REST (API Connector)',
        category: 'Intégration API',
        description: 'Configurer des appels d\'API externes (GET, POST, PUT, DELETE) avec en-têtes d\'authentification (Bearer, OAuth) et typage automatique des réponses JSON.',
        level: 'Avancé',
        practicalUseCase: 'Intégrer la passerelle de paiement Stripe ou connecter l\'API de signature électronique Yousign.',
        shortcutOrSyntax: 'Plugins -> API Connector -> Add another API -> Expand call'
      },
      {
        id: 'bubble-fn-5',
        toolId: 'tool-bubble',
        toolName: 'Bubble',
        name: 'Responsive Engine (Flexbox Layout & Alignement)',
        category: 'Interface & Responsive',
        description: 'Structurer les pages avec des conteneurs Row, Column et Align to Parent pour concevoir des interfaces s\'adaptant parfaitement du mobile à l\'écran 4K.',
        level: 'Intermédiaire',
        practicalUseCase: 'Concevoir un tableau de bord adaptatif avec barre latérale rétractable sur smartphone.',
        shortcutOrSyntax: 'Layout tab -> Container layout: Column/Row -> Min/Max width'
      },
      {
        id: 'bubble-fn-6',
        toolId: 'tool-bubble',
        toolName: 'Bubble',
        name: 'Gestion des États Personnalisés (Custom States)',
        category: 'Gestion d\'État UI',
        description: 'Stocker temporairement des variables dans la mémoire du navigateur pour gérer des étapes d\'inscription, des filtres en direct ou des onglets sans requêter la base.',
        level: 'Intermédiaire',
        practicalUseCase: 'Créer un tunnel de commande multi-étapes (Étape 1 > 2 > 3) ultra-fluide sans rechargement de page.',
        shortcutOrSyntax: 'Element inspector -> Set state (name, type, value)'
      }
    ]
  },
  {
    toolId: 'tool-webflow',
    toolName: 'Webflow / Framer',
    category: 'CMS Visuel & Sites Web Haute Fidélité',
    moduleNumber: 2,
    moduleTitle: 'Applications & Web',
    color: 'blue',
    iconName: 'Layout',
    description: 'Outil de design web professionnel générant du code HTML/CSS/JS propre et sémantique avec CMS dynamique intégré.',
    websiteUrl: 'https://webflow.com',
    functions: [
      {
        id: 'webflow-fn-1',
        toolId: 'tool-webflow',
        toolName: 'Webflow',
        name: 'Maîtrise du Modèle de Boîte CSS (Box Model)',
        category: 'Design & Intégration',
        description: 'Appliquer rigoureusement les concepts de Margin, Border, Padding et Content avec les propriétés Flexbox et CSS Grid.',
        level: 'Débutant',
        practicalUseCase: 'Structurer une landing page professionnelle avec grille bento responsive et espacements harmonieux.',
        shortcutOrSyntax: 'Style Panel -> Spacing (Padding/Margin) & Display (Flex/Grid)'
      },
      {
        id: 'webflow-fn-2',
        toolId: 'tool-webflow',
        toolName: 'Webflow',
        name: 'Collections CMS Dynamiques & Pages Modèles (Templates)',
        category: 'CMS & Données',
        description: 'Structurer des schémas de données CMS (Articles, Études de cas, Offres d\'emploi) alimentant automatiquement des pages modèles dynamiques.',
        level: 'Intermédiaire',
        practicalUseCase: 'Créer un blog d\'entreprise avec 50 articles indexables générés à partir d\'une seule maquette de page modèle.',
        shortcutOrSyntax: 'CMS Collections -> Add Field -> Template Page binding'
      },
      {
        id: 'webflow-fn-3',
        toolId: 'tool-webflow',
        toolName: 'Webflow',
        name: 'Animations & Déclencheurs d\'Interactions (Scroll / Hover)',
        category: 'Interactivité',
        description: 'Concevoir des micro-interactions visuelles basées sur le défilement de page, le survol de souris ou le chargement d\'éléments.',
        level: 'Intermédiaire',
        practicalUseCase: 'Animer une barre de navigation qui se réduit au scroll et révéler les témoignages clients en fondu progressif.',
        shortcutOrSyntax: 'Interactions Panel (H) -> Element trigger / Page trigger'
      },
      {
        id: 'webflow-fn-4',
        toolId: 'tool-webflow',
        toolName: 'Webflow',
        name: 'Optimisation SEO & Core Web Vitals',
        category: 'Performance & Référencement',
        description: 'Configurer les balises OpenGraph dynamiques, les attributs alt d\'images, les balises sémantiques Hn et la compression WebP pour maximiser la vitesse.',
        level: 'Intermédiaire',
        practicalUseCase: 'Obtenir un score Google PageSpeed supérieur à 95/100 sur un site vitrine commercial.',
        shortcutOrSyntax: 'Page Settings -> SEO Settings -> Title Tag & Meta Description'
      }
    ]
  },
  {
    toolId: 'tool-hubspot',
    toolName: 'HubSpot CRM',
    category: 'Gestion de la Relation Client (CRM)',
    moduleNumber: 2,
    moduleTitle: 'Applications & Web',
    color: 'blue',
    iconName: 'Users',
    description: 'Plateforme CRM centralisant la gestion des contacts, les pipelines de vente, le support client et les campagnes marketing automatisées.',
    websiteUrl: 'https://www.hubspot.com',
    functions: [
      {
        id: 'hubspot-fn-1',
        toolId: 'tool-hubspot',
        toolName: 'HubSpot',
        name: 'Gestion des Objets Standards & Propriétés Personnalisées',
        category: 'Architecture CRM',
        description: 'Modéliser et interconnecter les 4 objets pivots (Contacts, Entreprises, Transactions, Tickets) avec des champs personnalisés spécifiques au métier.',
        level: 'Débutant',
        practicalUseCase: 'Créer une propriété "Budget estimé No-Code" sur l\'objet Entreprise et l\'associer à chaque nouveau contact.',
        shortcutOrSyntax: 'Settings -> Data Management -> Properties -> Create Property'
      },
      {
        id: 'hubspot-fn-2',
        toolId: 'tool-hubspot',
        toolName: 'HubSpot',
        name: 'Pipelines d\'Opportunités & Règles d\'Étapes Commerciales',
        category: 'Ventes & Processus',
        description: 'Configurer les étapes de qualification d\'un deal commercial avec probabilités de clôture et champs obligatoires au passage d\'étape.',
        level: 'Intermédiaire',
        practicalUseCase: 'Forcer la saisie de la date de soutenance avant de pouvoir déplacer une opportunité en étape "Proposition envoyée".',
        shortcutOrSyntax: 'Sales -> Deals -> Board View -> Customize stage properties'
      },
      {
        id: 'hubspot-fn-3',
        toolId: 'tool-hubspot',
        toolName: 'HubSpot',
        name: 'Workflows d\'Automatisation Marketing & Nurturing',
        category: 'Automatisation',
        description: 'Construire des séquences d\'emails automatiques, d\'assignation de tâches commerciales et de mise à jour de statuts selon le comportement du prospect.',
        level: 'Avancé',
        practicalUseCase: 'Envoyer une séquence de 3 emails personnalisés à tout prospect ayant téléchargé le livre blanc sans avoir pris de rendez-vous.',
        shortcutOrSyntax: 'Automation -> Workflows -> Create workflow -> Enrollment triggers'
      }
    ]
  },

  // --- MODULE 3: MICROSOFT POWER PLATFORM ---
  {
    toolId: 'tool-power-apps',
    toolName: 'Microsoft Power Apps',
    category: 'Développement Low-Code d\'Applications',
    moduleNumber: 3,
    moduleTitle: 'Écosystème Microsoft Power Platform',
    color: 'emerald',
    iconName: 'Layers',
    description: 'Suite d\'outils Microsoft pour concevoir des applications métiers d\'entreprise Canvas et Model-Driven avec le langage Power Fx.',
    websiteUrl: 'https://powerapps.microsoft.com',
    functions: [
      {
        id: 'papps-fn-1',
        toolId: 'tool-power-apps',
        toolName: 'Power Apps',
        name: 'Formules Power Fx Avancées (LookUp, Filter, Patch, Concat)',
        category: 'Formules & Logique',
        description: 'Écrire des expressions déclaratives performantes pour manipuler les sources de données, créer ou mettre à jour des enregistrements via la fonction Patch.',
        level: 'Intermédiaire',
        practicalUseCase: 'Enregistrer une nouvelle demande de congé dans Dataverse avec calcul automatique des jours ouvrés restants via Patch.',
        shortcutOrSyntax: 'Patch(DemandesConges; Defaults(DemandesConges); {Employe: User().FullName; Jours: 5})'
      },
      {
        id: 'papps-fn-2',
        toolId: 'tool-power-apps',
        toolName: 'Power Apps',
        name: 'Gestion des Collections Locales (ClearCollect & Collect)',
        category: 'Mémoire & Performance',
        description: 'Charger des sous-ensembles de données en mémoire locale pour fluidifier la navigation hors-ligne et réduire les requêtes serveur.',
        level: 'Intermédiaire',
        practicalUseCase: 'Stocker le panier d\'articles commandés par un technicien sur le terrain avant de soumettre la commande finale.',
        shortcutOrSyntax: 'ClearCollect(colPanier; Filter(Catalogue; Categorie = "Outillage"))'
      },
      {
        id: 'papps-fn-3',
        toolId: 'tool-power-apps',
        toolName: 'Power Apps',
        name: 'Gestion de la Délégation des Données (Data Delegation)',
        category: 'Performance & Requêtes',
        description: 'Identifier et corriger les avertissements de délégation pour s\'assurer que les filtres et recherches s\'exécutent sur le serveur (Dataverse / SQL) et non sur le client limité à 2 000 lignes.',
        level: 'Avancé',
        practicalUseCase: 'Optimiser une recherche multicritère sur une table Dataverse de 50 000 dossiers clients sans bloquer l\'application.',
        shortcutOrSyntax: 'Filter(Clients; StartsWith(NomClient; txtSearch.Text))'
      },
      {
        id: 'papps-fn-4',
        toolId: 'tool-power-apps',
        toolName: 'Power Apps',
        name: 'Conception Canvas Responsive (Containers Auto-Layout)',
        category: 'Interface & Ergonomie',
        description: 'Utiliser les conteneurs horizontaux et verticaux avec dimensionnement flexible pour que l\'application s\'adapte dynamiquement du smartphone à l\'écran large.',
        level: 'Intermédiaire',
        practicalUseCase: 'Concevoir un écran unique compatible tablette d\'inspection terrain et poste de bureau d\'administration.',
        shortcutOrSyntax: 'Insert -> Horizontal Container -> Flexible width: On (Portion: 1)'
      },
      {
        id: 'papps-fn-5',
        toolId: 'tool-power-apps',
        toolName: 'Power Apps',
        name: 'Création d\'Applications Pilotées par Modèle (Model-Driven Apps)',
        category: 'Architecture Entreprise',
        description: 'Générer des applications de gestion complexes et sécurisées directement à partir du schéma de données Dataverse avec formulaires, vues, graphiques et flux de processus.',
        level: 'Avancé',
        practicalUseCase: 'Déployer le portail de gestion de conformité réglementaire de la direction juridique en 2 jours.',
        shortcutOrSyntax: 'Power Apps Studio -> New App -> Model-Driven -> Navigation map'
      },
      {
        id: 'papps-fn-6',
        toolId: 'tool-power-apps',
        toolName: 'Power Apps',
        name: 'Composants Réutilisables & Power Apps Component Framework (PCF)',
        category: 'Composants & Extensibilité',
        description: 'Créer des bibliothèques de composants d\'interface réutilisables (en-tête standard, barre de navigation, modales) ou intégrer des contrôles PCF en TypeScript.',
        level: 'Avancé',
        practicalUseCase: 'Standardiser l\'expérience utilisateur sur les 10 applications internes de l\'entreprise avec la même charte graphique.',
        shortcutOrSyntax: 'Components tab -> New component -> Custom properties (Input/Output)'
      }
    ]
  },
  {
    toolId: 'tool-power-automate',
    toolName: 'Microsoft Power Automate',
    category: 'Orchestration de Flux & RPA',
    moduleNumber: 3,
    moduleTitle: 'Écosystème Microsoft Power Platform',
    color: 'emerald',
    iconName: 'Shuffle',
    description: 'Moteur d\'automatisation cloud et desktop (RPA) reliant plus de 1 000 connecteurs certifiés Microsoft et services tiers.',
    websiteUrl: 'https://powerautomate.microsoft.com',
    functions: [
      {
        id: 'pauto-fn-1',
        toolId: 'tool-power-automate',
        toolName: 'Power Automate',
        name: 'Flux Cloud Automatisés, Instantanés & Planifiés',
        category: 'Types de Flux',
        description: 'Maîtriser les 3 architectures de déclenchement : sur événement (ex: nouveau mail / nouvelle ligne Dataverse), sur bouton utilisateur, ou sur calendrier périodique.',
        level: 'Débutant',
        practicalUseCase: 'Exécuter chaque lundi à 8h00 la compilation des KPI de production et l\'envoyer par Teams.',
        shortcutOrSyntax: 'Trigger: Recurrence (Frequency: Week, Interval: 1, On these days: Monday)'
      },
      {
        id: 'pauto-fn-2',
        toolId: 'tool-power-automate',
        toolName: 'Power Automate',
        name: 'Contrôle de Concurrence sur les Boucles (Apply to each)',
        category: 'Performance',
        description: 'Activer le parallélisme dans les paramètres de la boucle pour traiter jusqu\'à 50 éléments simultanément au lieu d\'un traitement séquentiel lent.',
        level: 'Intermédiaire',
        practicalUseCase: 'Traiter un lot de 300 factures en 30 secondes au lieu de 15 minutes.',
        shortcutOrSyntax: 'Apply to each -> Settings -> Concurrency Control: On -> Degree: 20'
      },
      {
        id: 'pauto-fn-3',
        toolId: 'tool-power-automate',
        toolName: 'Power Automate',
        name: 'Expressions WDL Avancées (Workflow Definition Language)',
        category: 'Expressions & Calculs',
        description: 'Rédiger des formules d\'évaluation complexes avec coalesce, formatDateTime, xpath, uriComponent, indexOf et manipulateurs de tableaux.',
        level: 'Avancé',
        practicalUseCase: 'Remplacer une valeur nulle par une valeur de repli sans faire planter le flux grâce à coalesce().',
        shortcutOrSyntax: 'coalesce(triggerOutputs()?[\'body/Email\'], \'contact@winside.fr\')'
      },
      {
        id: 'pauto-fn-4',
        toolId: 'tool-power-automate',
        toolName: 'Power Automate',
        name: 'Flux d\'Approbations d\'Entreprise (Approvals)',
        category: 'Gouvernance & RH',
        description: 'Créer des workflows d\'approbation séquentiels ou parallèles avec cartes adaptatives Teams interactives et suivi d\'historique dans Dataverse.',
        level: 'Intermédiaire',
        practicalUseCase: 'Gérer la validation hiérarchique d\'une note de frais supérieure à 500€ avec bouton d\'approbation direct dans Teams.',
        shortcutOrSyntax: 'Start and wait for an approval -> Approval type: Everyone must approve'
      },
      {
        id: 'pauto-fn-5',
        toolId: 'tool-power-automate',
        toolName: 'Power Automate',
        name: 'Sécurisation des Entrées / Sorties (Secure Inputs/Outputs)',
        category: 'Sécurité & Audit',
        description: 'Masquer les mots de passe, tokens et données personnelles confidentielles dans l\'historique d\'exécution du flux pour se conformer au RGPD.',
        level: 'Avancé',
        practicalUseCase: 'Masquer le numéro de carte bancaire ou le secret d\'API dans les logs visibles par les administrateurs.',
        shortcutOrSyntax: 'Action -> Settings -> Secure Inputs: On / Secure Outputs: On'
      },
      {
        id: 'pauto-fn-6',
        toolId: 'tool-power-automate',
        toolName: 'Power Automate',
        name: 'Automatisation Robotisée des Processus (Power Automate Desktop - RPA)',
        category: 'RPA & Desktop',
        description: 'Enregistrer et rejouer des actions utilisateurs sur des logiciels Windows legacy qui ne disposent d\'aucune API (saisie d\'écran, clics, OCR).',
        level: 'Avancé',
        practicalUseCase: 'Extraire des données d\'un logiciel comptable sur serveur local et les injecter dans Dataverse sans intervention humaine.',
        shortcutOrSyntax: 'Desktop Flow -> Record actions -> UI Element selector'
      }
    ]
  },
  {
    toolId: 'tool-sharepoint',
    toolName: 'Microsoft Dataverse & SharePoint',
    category: 'Gestion de Données d\'Entreprise & GED',
    moduleNumber: 3,
    moduleTitle: 'Écosystème Microsoft Power Platform',
    color: 'emerald',
    iconName: 'Server',
    description: 'Socle de données relationnel et gestionnaire documentaire sécurisé de l\'écosystème Microsoft 365.',
    websiteUrl: 'https://learn.microsoft.com/power-apps/maker/data-platform/data-platform-intro',
    functions: [
      {
        id: 'dverse-fn-1',
        toolId: 'tool-sharepoint',
        toolName: 'Dataverse & SharePoint',
        name: 'Modélisation de Tables & Relations Relationnelles (Dataverse)',
        category: 'Modélisation',
        description: 'Concevoir des tables standard et personnalisées avec colonnes de choix, recherches relationnelles (Lookup 1-N, N-N) et intégrité référentielle.',
        level: 'Intermédiaire',
        practicalUseCase: 'Structurer le référentiel des actifs matériels et les lier aux collaborateurs avec historique d\'attribution.',
        shortcutOrSyntax: 'Dataverse -> Tables -> New column -> Data type: Lookup'
      },
      {
        id: 'dverse-fn-2',
        toolId: 'tool-sharepoint',
        toolName: 'Dataverse & SharePoint',
        name: 'Règles Métier Sans Code (Business Rules)',
        category: 'Validation & Logique',
        description: 'Définir des règles de validation côté serveur pour rendre des champs obligatoires, masquer des sections ou bloquer la saisie en fonction de conditions.',
        level: 'Débutant',
        practicalUseCase: 'Rendre le champ "Justificatif médical" obligatoire uniquement si le motif de congé sélectionné est "Maladie".',
        shortcutOrSyntax: 'Table -> Business Rules -> Set field value / Set visibility'
      },
      {
        id: 'dverse-fn-3',
        toolId: 'tool-sharepoint',
        toolName: 'Dataverse & SharePoint',
        name: 'Rôles de Sécurité RBAC & Hiérarchie Granulaire (Dataverse)',
        category: 'Sécurité & Accès',
        description: 'Configurer des rôles de sécurité personnalisés avec des privilèges stricts par niveau (Utilisateur, Unité d\'organisation, Organisation globale).',
        level: 'Avancé',
        practicalUseCase: 'Permettre à un chef de secteur de consulter les rapports de son agence uniquement, sans visibilité sur les agences voisines.',
        shortcutOrSyntax: 'Power Platform Admin Center -> Security Roles -> Privileges matrix'
      },
      {
        id: 'dverse-fn-4',
        toolId: 'tool-sharepoint',
        toolName: 'Dataverse & SharePoint',
        name: 'Contournement du Seuil de 5 000 Éléments (SharePoint Lists)',
        category: 'Optimisation SharePoint',
        description: 'Configurer des colonnes indexées et concevoir des vues filtrées précises pour dépasser les limitations historiques de requête de SharePoint.',
        level: 'Intermédiaire',
        practicalUseCase: 'Maintenir les performances d\'affichage d\'un registre d\'inventaire SharePoint contenant plus de 30 000 références.',
        shortcutOrSyntax: 'List Settings -> Indexed Columns -> Create index on status & date'
      },
      {
        id: 'dverse-fn-5',
        toolId: 'tool-sharepoint',
        toolName: 'Dataverse & SharePoint',
        name: 'Gestion des Droits d\'Accès & Rupture d\'Héritage (SharePoint)',
        category: 'Gouvernance GED',
        description: 'Gérer les autorisations fines au niveau de dossiers ou bibliothèques en rompant l\'héritage du site parent.',
        level: 'Débutant',
        practicalUseCase: 'Créer un sous-dossier confidentiel "Comité de Direction" au sein d\'un site SharePoint accessible à tous les salariés.',
        shortcutOrSyntax: 'Manage Access -> Advanced -> Stop Inheriting Permissions'
      }
    ]
  },
  {
    toolId: 'tool-copilot-studio',
    toolName: 'Microsoft Copilot Studio',
    category: 'Agents Conversationnels & IA Générative',
    moduleNumber: 3,
    moduleTitle: 'Écosystème Microsoft Power Platform',
    color: 'emerald',
    iconName: 'Bot',
    description: 'Plateforme pour créer, tester et orchestrer des agents d\'IA conversationnels connectés aux sources de données d\'entreprise.',
    websiteUrl: 'https://www.microsoft.com/microsoft-copilot/microsoft-copilot-studio',
    functions: [
      {
        id: 'copilot-fn-1',
        toolId: 'tool-copilot-studio',
        toolName: 'Copilot Studio',
        name: 'Réponses Génératives avec RAG sur SharePoint & Dataverse',
        category: 'IA & RAG',
        description: 'Connecter l\'agent à des bibliothèques documentaires SharePoint, des sites intranet ou des tables Dataverse pour générer des réponses étayées avec sources citées.',
        level: 'Intermédiaire',
        practicalUseCase: 'Déployer un assistant RH interne capable de répondre précisément sur les accords d\'entreprise à partir des PDF officiels.',
        shortcutOrSyntax: 'Generative AI -> Knowledge sources -> Add SharePoint folder / URL'
      },
      {
        id: 'copilot-fn-2',
        toolId: 'tool-copilot-studio',
        toolName: 'Copilot Studio',
        name: 'Création de Sujets Conversationnels (Topics) & Arbres de Décision',
        category: 'Scénarisation',
        description: 'Construire des parcours de dialogue structurés avec phrases de déclenchement, questions à choix multiples et conditions d\'aiguillage.',
        level: 'Débutant',
        practicalUseCase: 'Guider un collaborateur pas à pas pour déclarer un incident matériel informatique.',
        shortcutOrSyntax: 'Topics -> Add a topic -> Trigger phrases -> Question node'
      },
      {
        id: 'copilot-fn-3',
        toolId: 'tool-copilot-studio',
        toolName: 'Copilot Studio',
        name: 'Appel d\'Actions Dynamiques via Flux Power Automate (Plugins)',
        category: 'Actions & Intégration',
        description: 'Permettre à l\'agent de déclencher des actions concrètes (créer un ticket, réserver une ressource, modifier un statut) en appelant un flux cloud.',
        level: 'Avancé',
        practicalUseCase: 'Permettre à un utilisateur de demander en langage naturel : "Réserve-moi la salle Athéna pour demain 14h".',
        shortcutOrSyntax: 'Topic node -> Call an action -> Select Power Automate flow'
      },
      {
        id: 'copilot-fn-4',
        toolId: 'tool-copilot-studio',
        toolName: 'Copilot Studio',
        name: 'Variables Globales & Gestion du Contexte de Session',
        category: 'Gestion d\'État',
        description: 'Mémoriser des informations fournies par l\'utilisateur au fil de l\'échange pour les réutiliser dans les branches de dialogue suivantes.',
        level: 'Intermédiaire',
        practicalUseCase: 'Conserver l\'identifiant client pour personnaliser l\'ensemble des réponses sans redemander l\'information.',
        shortcutOrSyntax: 'Variable scope: Global (accessible across all topics in session)'
      },
      {
        id: 'copilot-fn-5',
        toolId: 'tool-copilot-studio',
        toolName: 'Copilot Studio',
        name: 'Paramétrage de la Modération & Directives de Marque (System Prompt)',
        category: 'Gouvernance & Sécurité',
        description: 'Définir le niveau de modération du contenu et rédiger des instructions système strictes pour garantir le ton et la conformité des réponses.',
        level: 'Intermédiaire',
        practicalUseCase: 'Interdire à l\'agent d\'aborder des sujets hors périmètre et forcer un ton professionnel bienveillant.',
        shortcutOrSyntax: 'Generative AI settings -> Content moderation: High / System Instructions'
      }
    ]
  },
  {
    toolId: 'tool-ai-builder',
    toolName: 'AI Builder (Power Platform)',
    category: 'IA Prête à l\'Emploi & Modèles Custom',
    moduleNumber: 3,
    moduleTitle: 'Écosystème Microsoft Power Platform',
    color: 'emerald',
    iconName: 'Cpu',
    description: 'Capacités d\'intelligence artificielle intégrées sans code pour l\'extraction documentaire, la prédiction et la classification.',
    websiteUrl: 'https://learn.microsoft.com/ai-builder/',
    functions: [
      {
        id: 'aibul-fn-1',
        toolId: 'tool-ai-builder',
        toolName: 'AI Builder',
        name: 'Traitement Automatique de Formulaires & Factures (Document Processing)',
        category: 'Extraction Documentaire',
        description: 'Entraîner un modèle OCR personnalisé sur des exemples réels pour extraire automatiquement les montants HT/TTC, dates et lignes de facture.',
        level: 'Intermédiaire',
        practicalUseCase: 'Automatiser la saisie comptable de 1 000 factures fournisseurs reçues par email chaque mois.',
        shortcutOrSyntax: 'AI Builder -> Extract custom information from documents -> Tag fields'
      },
      {
        id: 'aibul-fn-2',
        toolId: 'tool-ai-builder',
        toolName: 'AI Builder',
        name: 'Classification de Texte & Analyse de Sentiment',
        category: 'Traitement du Langage',
        description: 'Classifier automatiquement les emails ou messages entrants par thématique et évaluer leur tonalité (positive, neutre, négative).',
        level: 'Débutant',
        practicalUseCase: 'Aiguiller en priorité les emails de réclamation client avec sentiment négatif vers les superviseurs.',
        shortcutOrSyntax: 'AI Builder -> Analyze sentiment / Classify text categories'
      },
      {
        id: 'aibul-fn-3',
        toolId: 'tool-ai-builder',
        toolName: 'AI Builder',
        name: 'Intégration Directe dans les Flux Power Automate',
        category: 'Intégration Workflow',
        description: 'Appeler un modèle AI Builder en tant qu\'étape de traitement au sein d\'un flux pour transformer des pièces jointes en données structurées.',
        level: 'Intermédiaire',
        practicalUseCase: 'Recevoir un bon de commande en PDF par email, extraire les références et créer automatiquement la commande dans l\'ERP.',
        shortcutOrSyntax: 'Action: Predict (AI Builder model) -> Pass document content'
      }
    ]
  },
  {
    toolId: 'tool-power-pages',
    toolName: 'Microsoft Power Pages',
    category: 'Portails Web Low-Code Sécurisés',
    moduleNumber: 3,
    moduleTitle: 'Écosystème Microsoft Power Platform',
    color: 'emerald',
    iconName: 'Globe',
    description: 'Création de sites web professionnels d\'entreprise connectés à Dataverse pour les utilisateurs externes.',
    websiteUrl: 'https://powerpages.microsoft.com',
    functions: [
      {
        id: 'ppages-fn-1',
        toolId: 'tool-power-pages',
        toolName: 'Power Pages',
        name: 'Autorisations de Table (Table Permissions) & Rôles Web',
        category: 'Sécurité & Accès',
        description: 'Paramétrer les permissions de lecture, création et modification des tables Dataverse attribuées aux utilisateurs web selon leurs rôles.',
        level: 'Avancé',
        practicalUseCase: 'Permettre aux fournisseurs d\'un portail de ne voir et modifier que leurs propres bons de livraison.',
        shortcutOrSyntax: 'Security -> Table Permissions -> Scope: Account / Global / Self'
      },
      {
        id: 'ppages-fn-2',
        toolId: 'tool-power-pages',
        toolName: 'Power Pages',
        name: 'Formulaires Web Multisteps Connectés à Dataverse',
        category: 'Collecte & Formulaires',
        description: 'Concevoir des formulaires en plusieurs étapes enregistrant les données directement dans les tables Dataverse avec validation en direct.',
        level: 'Intermédiaire',
        practicalUseCase: 'Créer un portail de candidature pour déposer un dossier de subvention avec pièces jointes.',
        shortcutOrSyntax: 'Pages -> Add component -> Multistep Form -> Bind Dataverse tab'
      },
      {
        id: 'ppages-fn-3',
        toolId: 'tool-power-pages',
        toolName: 'Power Pages',
        name: 'Personnalisation Avancée avec Liquid Templates & Code JS',
        category: 'Code & Template',
        description: 'Intégrer du code Liquid, HTML et JavaScript via VS Code pour le Web afin de concevoir des affichages sur-mesure non couverts par les blocs natifs.',
        level: 'Avancé',
        practicalUseCase: 'Afficher un graphique dynamique personnalisé généré côté client à partir des données Dataverse sécurisées.',
        shortcutOrSyntax: 'Edit code (VS Code for Web) -> {% fetchxml %} -> Liquid loop'
      }
    ]
  },

  // --- MODULE 4: VIBE CODING & DEV IA ---
  {
    toolId: 'tool-ai-studio',
    toolName: 'Google AI Studio',
    category: 'Prototypage IA & Suite Gemini',
    moduleNumber: 4,
    moduleTitle: 'Vibe Coding & Dev IA',
    color: 'purple',
    iconName: 'Code2',
    description: 'Environnement web de pointe de Google pour concevoir, tester et prototyper des applications propulsées par les modèles Gemini.',
    websiteUrl: 'https://aistudio.google.com',
    functions: [
      {
        id: 'aistudio-fn-1',
        toolId: 'tool-ai-studio',
        toolName: 'Google AI Studio',
        name: 'System Prompts & Calibration de Température',
        category: 'Prompt Engineering',
        description: 'Rédiger des consignes système strictes et régler la température (0.0 pour du code déterministe, 0.7+ pour la créativité) pour cadrer le comportement de Gemini.',
        level: 'Débutant',
        practicalUseCase: 'Calibrer un modèle pour qu\'il agisse en architecte de données strict produisant exclusivement des schémas JSON valides.',
        shortcutOrSyntax: 'System Instructions panel -> Model Parameters (Temperature: 0.2, Top-P: 0.95)'
      },
      {
        id: 'aistudio-fn-2',
        toolId: 'tool-ai-studio',
        toolName: 'Google AI Studio',
        name: 'Schémas de Sortie JSON Structurés (Structured Outputs)',
        category: 'Sortie Déterministe',
        description: 'Imposer un schéma JSON strict avec types, descriptions et champs requis pour que la réponse de l\'IA soit directement exploitable par une API.',
        level: 'Intermédiaire',
        practicalUseCase: 'Générer une liste de questions/réponses d\'examen formatée exactement selon le modèle TypeScript de l\'application.',
        shortcutOrSyntax: 'Output format: JSON -> Define Response Schema (Schema JSON format)'
      },
      {
        id: 'aistudio-fn-3',
        toolId: 'tool-ai-studio',
        toolName: 'Google AI Studio',
        name: 'Multi-modalité & Analyse de Documents Mixtes (PDF, Images, Audio)',
        category: 'Multi-modalité',
        description: 'Injecter conjointement des maquettes graphiques, des schémas d\'architecture ou des enregistrements audio pour guider la génération de code.',
        level: 'Intermédiaire',
        practicalUseCase: 'Fournir la capture d\'une interface UI existante pour que Gemini génère le code de composant React et Tailwind correspondant.',
        shortcutOrSyntax: 'Insert File -> Upload Image/PDF -> "Transform this UI mockup into React"'
      },
      {
        id: 'aistudio-fn-4',
        toolId: 'tool-ai-studio',
        toolName: 'Google AI Studio',
        name: 'Vibe Coding & Itération en Langage Naturel',
        category: 'Méthodologie Vibe Coding',
        description: 'Piloter la création logicielle par intentions descriptives, évaluer le rendu visuel en temps réel et guider l\'agent par corrections incrémentales.',
        level: 'Intermédiaire',
        practicalUseCase: 'Créer une application complète de gestion en une après-midi sans écrire manuellement chaque ligne de boilerplate.',
        shortcutOrSyntax: 'Intent-driven prompt -> Live preview -> Targeted refinement prompt'
      },
      {
        id: 'aistudio-fn-5',
        toolId: 'tool-ai-studio',
        toolName: 'Google AI Studio',
        name: 'Exportation de Code vers SDK TypeScript / Python / REST',
        category: 'Intégration Dev',
        description: 'Générer l\'extrait de code prêt à l\'emploi intégrant la bibliothèque officielle @google/genai pour l\'intégrer dans le backend applicatif.',
        level: 'Débutant',
        practicalUseCase: 'Exporter le prompt testé pour l\'intégrer dans une route Express.js sécurisée côté serveur.',
        shortcutOrSyntax: 'Get Code -> Select TypeScript / Python / cURL'
      }
    ]
  },
  {
    toolId: 'tool-cursor',
    toolName: 'Cursor IDE & Kilo Code',
    category: 'Éditeur de Code Augmenté par l\'IA',
    moduleNumber: 4,
    moduleTitle: 'Vibe Coding & Dev IA',
    color: 'purple',
    iconName: 'Terminal',
    description: 'Environnement de développement basé sur VS Code intégrant des agents d\'IA capables d\'indexer et de modifier l\'ensemble du projet.',
    websiteUrl: 'https://www.cursor.com',
    functions: [
      {
        id: 'cursor-fn-1',
        toolId: 'tool-cursor',
        toolName: 'Cursor',
        name: 'Composer Multi-Fichiers (Cmd+I / Ctrl+I)',
        category: 'Édition Globale',
        description: 'Donner une consigne d\'évolution globale pour que l\'IA crée, modifie et refactorise simultanément plusieurs fichiers du projet.',
        level: 'Intermédiaire',
        practicalUseCase: 'Ajouter une nouvelle entité de données dans types.ts, son composant UI dans components/ et son routage dans App.tsx en une commande.',
        shortcutOrSyntax: 'Cmd + I (Composer) -> "Add practice items tracker across the app"'
      },
      {
        id: 'cursor-fn-2',
        toolId: 'tool-cursor',
        toolName: 'Cursor',
        name: 'Configuration du Fichier de Règles (.cursorrules)',
        category: 'Standards de Code',
        description: 'Définir les règles architecturales, conventions de nommage et contraintes techniques que l\'IA doit obligatoirement respecter à chaque génération.',
        level: 'Intermédiaire',
        practicalUseCase: 'Forcer l\'IA à utiliser Tailwind CSS v4, TypeScript strict et des composants modulaires sans jamais toucher au fichier de config.',
        shortcutOrSyntax: 'Create .cursorrules in project root -> specify stack, patterns and tone'
      },
      {
        id: 'cursor-fn-3',
        toolId: 'tool-cursor',
        toolName: 'Cursor',
        name: 'Chat Inline Contextuel & Évolution Chirurgicale (Cmd+K)',
        category: 'Édition Locale',
        description: 'Sélectionner une portion de code pour lui appliquer une modification ciblée, optimiser sa performance ou corriger un bug.',
        level: 'Débutant',
        practicalUseCase: 'Sélectionner une fonction de tri pour la rendre insensible à la casse et sécurisée contre les valeurs nulles.',
        shortcutOrSyntax: 'Select code -> Cmd + K -> "Refactor to handle undefined values"'
      },
      {
        id: 'cursor-fn-4',
        toolId: 'tool-cursor',
        toolName: 'Cursor',
        name: 'Indexation Sémantique & Recherche par Embeddings du Codebase',
        category: 'Compréhension du Projet',
        description: 'Exploiter l\'index vectoriel local pour que l\'IA comprenne automatiquement les dépendances et réutilise les fonctions existantes.',
        level: 'Débutant',
        practicalUseCase: 'Demander à l\'IA : "@codebase où sont gérées les notes utilisateur ?" pour cibler immédiatement les bons fichiers.',
        shortcutOrSyntax: '@codebase in Chat -> "Where is localStorage persistence handled?"'
      }
    ]
  },
  {
    toolId: 'tool-github',
    toolName: 'GitHub & Déploiement Cloud',
    category: 'Versioning & CI/CD',
    moduleNumber: 4,
    moduleTitle: 'Vibe Coding & Dev IA',
    color: 'purple',
    iconName: 'GitBranch',
    description: 'Plateforme centrale de collaboration de code, gestion de versions d\'équipe et pipelines de déploiement continu.',
    websiteUrl: 'https://github.com',
    functions: [
      {
        id: 'github-fn-1',
        toolId: 'tool-github',
        toolName: 'GitHub',
        name: 'Workflow de Branches & Pull Requests avec Revues de Code',
        category: 'Collaboration',
        description: 'Créer des branches de fonctionnalités isolées, soumettre des Pull Requests et valider les relectures de code avant fusion.',
        level: 'Débutant',
        practicalUseCase: 'Isoler le développement d\'un nouveau module dans "feature/liste-fonctions" sans perturber la branche principale "main".',
        shortcutOrSyntax: 'git checkout -b feature/nom -> git push origin feature/nom -> Open PR'
      },
      {
        id: 'github-fn-2',
        toolId: 'tool-github',
        toolName: 'GitHub',
        name: 'Protection des Secrets d\'Environnement & .gitignore',
        category: 'Cybersécurité',
        description: 'Exclure impérativement les fichiers de secrets locaux (.env) et configurer les variables sécurisées dans GitHub Secrets ou le cloud.',
        level: 'Débutant',
        practicalUseCase: 'Empêcher la fuite d\'une clé d\'API Gemini ou Stripe sur un dépôt public.',
        shortcutOrSyntax: 'echo ".env" >> .gitignore -> Settings -> Secrets and variables -> Actions'
      },
      {
        id: 'github-fn-3',
        toolId: 'tool-github',
        toolName: 'GitHub',
        name: 'Pipelines d\'Intégration & Déploiement Continu (GitHub Actions)',
        category: 'CI/CD & DevOps',
        description: 'Automatiser la construction du projet, l\'exécution des tests et le déploiement sur Cloud Run ou Vercel à chaque commit sur main.',
        level: 'Avancé',
        practicalUseCase: 'Publier la nouvelle version de l\'application en production en moins de 2 minutes dès qu\'une Pull Request est fusionnée.',
        shortcutOrSyntax: '.github/workflows/deploy.yml -> on: push branches: [main]'
      }
    ]
  },

  // --- MODULE 5: CERTIFICATION & PROJET FIL ROUGE ---
  {
    toolId: 'tool-ms-learn',
    toolName: 'Microsoft Learn & Certifications PL-900 / PL-100',
    category: 'Préparation & Certification Officielle',
    moduleNumber: 5,
    moduleTitle: 'Certification & Projet Fil Rouge',
    color: 'rose',
    iconName: 'Award',
    description: 'Parcours d\'apprentissage officiel Microsoft pour valider les examens de certification reconnus mondialement.',
    websiteUrl: 'https://learn.microsoft.com/credentials/certifications/power-platform-fundamentals/',
    functions: [
      {
        id: 'msl-fn-1',
        toolId: 'tool-ms-learn',
        toolName: 'Microsoft Learn',
        name: 'Examens Blancs Chronométrés & Analyse des Écarts',
        category: 'Entraînement Examen',
        description: 'Passer des simulations d\'examens complets de 45 minutes pour évaluer son score par rapport au seuil requis de 700/1 000 points.',
        level: 'Débutant',
        practicalUseCase: 'Identifier les faiblesses sur les questions pièges portant sur la valeur commerciale de Dataverse.',
        shortcutOrSyntax: 'Microsoft Learn -> PL-900 Practice Assessment -> 50 questions / 45 min'
      },
      {
        id: 'msl-fn-2',
        toolId: 'tool-ms-learn',
        toolName: 'Microsoft Learn',
        name: 'Environnements de Développement Gratuits (Developer Plan)',
        category: 'Bac à Sable',
        description: 'Activer un environnement Power Apps Developer personnel pour pratiquer toutes les fonctionnalités sans risque sur les données réelles.',
        level: 'Débutant',
        practicalUseCase: 'Créer et tester des flux Power Automate et des tables Dataverse gratuitement pour ses révisions.',
        shortcutOrSyntax: 'powerapps.microsoft.com/developerplan -> Create personal environment'
      }
    ]
  },
  {
    toolId: 'tool-project-toolkit',
    toolName: 'Boîte à Outils Cadrage Projet & Fil Rouge',
    category: 'Méthodologie & Pilotage de Transformation',
    moduleNumber: 5,
    moduleTitle: 'Certification & Projet Fil Rouge',
    color: 'rose',
    iconName: 'Briefcase',
    description: 'Ensemble de matrices et livrables de cadrage méthodologique pour mener un projet de transformation numérique de bout en bout.',
    websiteUrl: 'https://winside.fr',
    functions: [
      {
        id: 'proj-fn-1',
        toolId: 'tool-project-toolkit',
        toolName: 'Cadrage Projet',
        name: 'Matrice de Priorisation RICE / MoSCoW',
        category: 'Cadrage Fonctionnel',
        description: 'Calculer le score RICE (Reach x Impact x Confidence / Effort) pour arbitrer objectivement les fonctionnalités du MVP.',
        level: 'Intermédiaire',
        practicalUseCase: 'Démontrer au comité de direction pourquoi l\'automatisation de la facturation passe avant le portail client dans la V1.',
        shortcutOrSyntax: 'RICE Score = (R x I x C) / E -> Sort by highest ROI'
      },
      {
        id: 'proj-fn-2',
        toolId: 'tool-project-toolkit',
        toolName: 'Cadrage Projet',
        name: 'Matrice RACI des Rôles & Responsabilités',
        category: 'Gouvernance',
        description: 'Formaliser qui est Responsable (R), Approbateur (A), Consulté (C) et Informé (I) pour chaque étape du projet fil rouge.',
        level: 'Débutant',
        practicalUseCase: 'Clarifier les responsabilités entre la DSI, les métiers et l\'équipe No-Code pour éviter les blocages de validation.',
        shortcutOrSyntax: 'RACI Matrix: Tasks (rows) x Stakeholders (columns)'
      },
      {
        id: 'proj-fn-3',
        toolId: 'tool-project-toolkit',
        toolName: 'Cadrage Projet',
        name: 'Cahier des Charges Fonctionnel & Plan de Recette (UAT)',
        category: 'Livrables & Recette',
        description: 'Rédiger la matrice des exigences et les scénarios de tests d\'acceptation utilisateur avant le passage en production.',
        level: 'Intermédiaire',
        practicalUseCase: 'Faire signer le procès-verbal de recette officielle sans réserve par le commanditaire du projet.',
        shortcutOrSyntax: 'UAT Template: Scenario -> Steps -> Expected result -> Status (Pass/Fail)'
      }
    ]
  },
  {
    toolId: 'tool-miro',
    toolName: 'Miro / FigJam',
    category: 'Ateliers Visuels & Design Thinking',
    moduleNumber: 1,
    moduleTitle: 'Fondations & Automation',
    color: 'amber',
    iconName: 'PenTool',
    description: 'Espace visuel collaboratif infini pour animer des ateliers d\'idéation, cartographier les parcours utilisateurs et prototyper.',
    websiteUrl: 'https://miro.com',
    functions: [
      {
        id: 'miro-fn-1',
        toolId: 'tool-miro',
        toolName: 'Miro',
        name: 'Cartographie de Parcours Utilisateur (Customer Journey Map)',
        category: 'Design Thinking',
        description: 'Visualiser les étapes, actions, points de contact, émotions et irritants d\'un utilisateur tout au long de son expérience.',
        level: 'Débutant',
        practicalUseCase: 'Identifier les 3 points de friction majeurs lors de l\'onboarding d\'un nouveau client pour les automatiser.',
        shortcutOrSyntax: 'Template: Customer Journey Map -> Stages / Thoughts / Pain points'
      },
      {
        id: 'miro-fn-2',
        toolId: 'tool-miro',
        toolName: 'Miro',
        name: 'Facilitation d\'Atelier d\'Idéation & Vote par Gommettes (Dot Voting)',
        category: 'Animation Agile',
        description: 'Utiliser le minuteur intégré, la musique de concentration et la session de vote anonyme pour faire émerger les meilleures idées d\'équipe.',
        level: 'Débutant',
        practicalUseCase: 'Animer une séance de Crazy 8s avec 6 collaborateurs et converger sur 2 concepts phares en 30 minutes.',
        shortcutOrSyntax: 'Voting tool -> Number of votes per person -> Timer (5 min) -> Reveal results'
      },
      {
        id: 'miro-fn-3',
        toolId: 'tool-miro',
        toolName: 'Miro',
        name: 'Exportation de Post-its vers Tickets Jira / Trello / CSV',
        category: 'Intégration Backlog',
        description: 'Convertir les post-its retenus lors de l\'atelier directement en tâches de backlog actionnables.',
        level: 'Intermédiaire',
        practicalUseCase: 'Transformer les idées d\'ateliers en user stories dans le tableau de bord de développement sans ressaisie.',
        shortcutOrSyntax: 'Select sticky notes -> Convert to Jira cards / Export as CSV'
      }
    ]
  },
  {
    toolId: 'tool-pix',
    toolName: 'PIX Certification',
    category: 'Évaluation & Compétences Numériques',
    moduleNumber: 1,
    moduleTitle: 'Fondations & Automation',
    color: 'amber',
    iconName: 'CheckCircle',
    description: 'Plateforme nationale d\'évaluation des compétences numériques reconnue par l\'État et l\'Union Européenne.',
    websiteUrl: 'https://pix.fr',
    functions: [
      {
        id: 'pix-fn-1',
        toolId: 'tool-pix',
        toolName: 'PIX',
        name: 'Évaluation Adaptative sur les 5 Domaines Numériques',
        category: 'Bilan de Compétences',
        description: 'Passer les épreuves adaptatives (Information et données, Communication, Création de contenu, Protection et sécurité, Environnement numérique).',
        level: 'Débutant',
        practicalUseCase: 'Mesurer son niveau initial et cibler les compétences à consolider avant le passage de la certification officielle.',
        shortcutOrSyntax: 'pix.fr -> Se positionner -> 5 domaines / 16 compétences'
      },
      {
        id: 'pix-fn-2',
        toolId: 'tool-pix',
        toolName: 'PIX',
        name: 'Entraînement Cybersécurité & Hygiène Numérique',
        category: 'Sécurité & RGPD',
        description: 'Valider les bonnes pratiques en matière de mots de passe, détection de phishing, chiffrement et protection des données d\'entreprise.',
        level: 'Intermédiaire',
        practicalUseCase: 'Garantir un score maximal sur le domaine 4 "Protection et sécurité" pour le dossier professionnel.',
        shortcutOrSyntax: 'Domaine 4 : Sécuriser l\'environnement numérique & protéger les données'
      }
    ]
  }
];

// Helper to get total number of functions
export const getTotalFunctionsCount = (): number => {
  return softwareFunctionsDataset.reduce((acc, tool) => acc + tool.functions.length, 0);
};

// Preset Recommended Function Packs to quickly kickstart practice
export const PRESET_PRACTICE_PACKS = [
  {
    id: 'pack-power-platform-expert',
    name: '🌟 Pack Essentiel Microsoft Power Platform',
    badge: '180h Programme',
    color: 'emerald',
    description: 'Les fonctions clés à maîtriser pour le titre et la certification PL-900 (Power Apps, Power Automate, Dataverse, Copilot Studio).',
    functionIds: [
      'papps-fn-1',
      'papps-fn-2',
      'papps-fn-3',
      'papps-fn-5',
      'pauto-fn-1',
      'pauto-fn-2',
      'pauto-fn-3',
      'pauto-fn-4',
      'dverse-fn-1',
      'dverse-fn-3',
      'copilot-fn-1',
      'copilot-fn-3',
      'aibul-fn-1',
      'ppages-fn-1'
    ]
  },
  {
    id: 'pack-automation-make',
    name: '⚡ Pack Moteur d\'Automation & No-Code',
    badge: 'Semaines 1 à 3',
    color: 'amber',
    description: 'Maîtriser l\'architecture des flux complexes sur Make, les bases relationnelles Airtable et formulaires intelligents.',
    functionIds: [
      'make-fn-1',
      'make-fn-2',
      'make-fn-3',
      'make-fn-4',
      'make-fn-5',
      'airtable-fn-1',
      'airtable-fn-2',
      'airtable-fn-3',
      'notion-fn-1',
      'notion-fn-2',
      'tally-fn-1'
    ]
  },
  {
    id: 'pack-vibe-coding-ai',
    name: '🚀 Pack Vibe Coding & IDE IA',
    badge: 'Semaine 14',
    color: 'purple',
    description: 'Prototypage ultra-rapide sur Google AI Studio, multi-modalité, Cursor Composer et versioning GitHub sécurisé.',
    functionIds: [
      'aistudio-fn-1',
      'aistudio-fn-2',
      'aistudio-fn-3',
      'aistudio-fn-4',
      'cursor-fn-1',
      'cursor-fn-2',
      'cursor-fn-3',
      'github-fn-1',
      'github-fn-2'
    ]
  },
  {
    id: 'pack-fullstack-bubble',
    name: '🌐 Pack Applications Web & Bubble',
    badge: 'Semaines 4 & 5',
    color: 'blue',
    description: 'Conception full-stack No-Code, règles de confidentialité serveur (Privacy Rules), Backend Workflows et connecteur API.',
    functionIds: [
      'bubble-fn-1',
      'bubble-fn-2',
      'bubble-fn-3',
      'bubble-fn-4',
      'bubble-fn-5',
      'webflow-fn-1',
      'webflow-fn-2',
      'hubspot-fn-1'
    ]
  }
];
