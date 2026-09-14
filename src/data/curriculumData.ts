import { TrainingProgram } from '../types';

export const trainingProgramData: TrainingProgram = {
  title: "Formation Chef.fe de Projet en Transformation Numérique",
  subtitle: "Parcours Professionnalisant No-Code, Low-Code, Power Platform & IA Vibe Coding",
  organization: "WinSide",
  meta: {
    durationHours: 413,
    durationWeeks: 13,
    startDate: "22 Juin 2026",
    endDate: "2 Octobre 2026",
    location: "14 rue de la Concertation, 75018 Paris & Distanciel",
    format: "Hybride (Présentiel + Distanciel)",
    prerequisites: "Ordinateur portable, appétence technologique, esprit d'analyse et sens de l'organisation"
  },
  modules: [
    {
      id: "mod-1",
      number: 1,
      title: "Fondations & Automation",
      weeks: "Semaines 1 à 3",
      duration: "3 semaines (~95h)",
      color: "amber",
      iconName: "Zap",
      description: "Acquérir les fondamentaux méthodologiques, la modélisation de données et maîtriser l'automatisation de workflows complexes.",
      topics: [
        {
          id: "m1-t1",
          title: "Onboarding, PIX & Projet Pro",
          summary: "Positionnement des compétences numériques, découverte des référentiels et définition du projet professionnel.",
          keyConcepts: ["Évaluation PIX", "Cartographie des compétences", "Posture de Chef de Projet", "Plan de formation individuel"],
          defaultNotes: "Noter mes scores de positionnement PIX et mes objectifs clés de transformation pour le bilan final.",
          tools: [
            {
              id: "tool-pix",
              name: "PIX Certification",
              category: "Évaluation & Compétences",
              description: "Plateforme nationale d'évaluation et de certification des compétences numériques.",
              faqs: [
                {
                  id: "faq-pix-1",
                  question: "Comment fonctionne l'algorithme adaptatif de PIX ?",
                  answer: "PIX ajuste la difficulté des questions en temps réel selon les réponses données, mesurant ainsi précisément le niveau (1 à 8) sur 5 grands domaines numériques."
                },
                {
                  id: "faq-pix-2",
                  question: "Pourquoi certifier PIX dans un rôle de Chef de Projet ?",
                  answer: "Elle atteste officiellement de la maîtrise opérationnelle des données, de la cybersécurité, de la communication et de l'environnement numérique auprès des recruteurs."
                },
                {
                  id: "faq-pix-3",
                  question: "Quelle est la validité de la certification PIX ?",
                  answer: "La certification est reconnue par l'État français et l'Union Européenne et a une validité officielle de 3 ans."
                }
              ]
            }
          ]
        },
        {
          id: "m1-t2",
          title: "Intro No-Code, IA & Outils collaboratifs",
          summary: "Panorama du paysage No-Code/Low-Code, culture de l'IA générative et mise en place d'espaces de travail collaboratifs.",
          keyConcepts: ["Écosystème No-Code", "Prompting IA initial", "Gestion des flux de communication", "Centralisation de la connaissance"],
          defaultNotes: "Structurer mon espace de travail partagé avec les conventions de nommage d'équipe.",
          tools: [
            {
              id: "tool-notion",
              name: "Notion",
              category: "Productivité & Base de Connaissance",
              description: "Workspace tout-en-un combinant wikis, gestion de projets et bases de données relationnelles.",
              faqs: [
                {
                  id: "faq-notion-1",
                  question: "Quelle est la différence entre une simple page et une base de données Notion ?",
                  answer: "Une base de données contient des propriétés structurées (dates, relations, formules, tags) et permet plusieurs vues (Kanban, Table, Calendrier, Galerie) de la même donnée."
                },
                {
                  id: "faq-notion-2",
                  question: "Comment fonctionnent les relations et rollups dans Notion ?",
                  answer: "La relation lie deux bases de données entre elles, et le Rollup extrait ou agrège (somme, moyenne, comptage) des valeurs spécifiques issues de la base liée."
                },
                {
                  id: "faq-notion-3",
                  question: "Quelles sont les limites de sécurité de Notion en entreprise ?",
                  answer: "Notion n'offre pas de permissions fines au niveau d'une ligne ou d'une colonne spécifique au sein d'une même base de données."
                }
              ]
            },
            {
              id: "tool-slack",
              name: "Slack / Teams",
              category: "Communication & Hub d'équipe",
              description: "Plateformes de messagerie instantanée, canaux thématiques et intégrations d'alertes automatisées.",
              faqs: [
                {
                  id: "faq-slack-1",
                  question: "Pourquoi privilégier les canaux publics aux messages privés en gestion de projet ?",
                  answer: "Pour éviter les silos d'information, garantir la traçabilité des décisions et permettre à tout membre de retrouver l'historique via la recherche."
                },
                {
                  id: "faq-slack-2",
                  question: "Comment brancher un webhook entrant (Incoming Webhook) sur Slack ?",
                  answer: "On génère une URL de webhook via l'interface API Slack, puis on envoie une requête HTTP POST au format JSON avec le corps du message."
                }
              ]
            }
          ]
        },
        {
          id: "m1-t3",
          title: "Design Thinking",
          summary: "Méthodologie d'innovation centrée utilisateur : Empathie, Définition, Idéation, Prototypage et Test.",
          keyConcepts: ["User Persona", "Customer Journey Map", "Ateliers d'Idéation (Crazy 8)", "Tests Utilisateurs & Feedback Loop"],
          defaultNotes: "Documenter les irritants utilisateurs majeurs identifiés pendant la phase d'interviews.",
          tools: [
            {
              id: "tool-miro",
              name: "Miro / FigJam",
              category: "Tableau blanc collaboratif",
              description: "Espace visuel infini pour animer des ateliers agiles, cartographier des parcours et prototyper rapidement.",
              faqs: [
                {
                  id: "faq-miro-1",
                  question: "Comment structurer un board Miro pour un atelier de Design Thinking ?",
                  answer: "Créer des zones délimitées par des cadres (Frames) séquencés par étape (Empathie, Idéation, Matrice Impact/Effort) et verrouiller les éléments fixes."
                },
                {
                  id: "faq-miro-2",
                  question: "Quels plugins ou fonctionnalités facilitent la facilitation en direct ?",
                  answer: "Le Timer intégré, le mode de vote anonyme, le masquage des curseurs et la musique d'ambiance pour focaliser l'attention du groupe."
                },
                {
                  id: "faq-miro-3",
                  question: "Comment exporter les livrables d'atelier vers des outils de ticketing ?",
                  answer: "En convertissant directement les post-its en cartes Jira, Trello ou en exportant un fichier CSV/PDF structuré."
                }
              ]
            }
          ]
        },
        {
          id: "m1-t4",
          title: "Bases de données & Formulaires",
          summary: "Modélisation relationnelle (MCD/MLD), normalisation des données, collecte intelligente et validation d'entrées.",
          keyConcepts: ["Clés primaires & étrangères", "Relations 1-N et N-N", "Validation de schéma", "Formulaires conditionnels"],
          defaultNotes: "Créer le schéma relationnel avec diagramme entité-association avant toute saisie dans Airtable.",
          tools: [
            {
              id: "tool-airtable",
              name: "Airtable",
              category: "Base de Données Hybride No-Code",
              description: "Plateforme relationnelle combinant la simplicité d'un tableur et la puissance d'une base SQL.",
              faqs: [
                {
                  id: "faq-airtable-1",
                  question: "Quelle est la différence fondamentale entre Excel et Airtable ?",
                  answer: "Excel traite les cellules de façon isolée (formules ad hoc), tandis qu'Airtable est une base relationnelle stricte où chaque ligne est un enregistrement typé."
                },
                {
                  id: "faq-airtable-2",
                  question: "Qu'est-ce qu'une table de jonction dans Airtable ?",
                  answer: "Une table intermédiaire indispensable pour modéliser une relation plusieurs-à-plusieurs (N-N), permettant d'y associer des attributs spécifiques au lien."
                },
                {
                  id: "faq-airtable-3",
                  question: "Quelles sont les limites de volume à anticiper sur Airtable ?",
                  answer: "Selon le plan (Free, Team, Business), la limite varie de 1 000 à 125 000 enregistrements par base, nécessitant une stratégie d'archivage."
                }
              ]
            },
            {
              id: "tool-tally",
              name: "Tally / Typeform",
              category: "Formulaires Intelligents",
              description: "Générateurs de formulaires dynamiques avec logique conditionnelle, calculs et intégrations directes.",
              faqs: [
                {
                  id: "faq-tally-1",
                  question: "Pourquoi privilégier Tally pour les formulaires No-Code ?",
                  answer: "Tally s'édite comme un document Notion (commandes /slash), offre 99% de ses fonctionnalités gratuitement (champs cachés, logique) et s'intègre nativement à Airtable et Make."
                },
                {
                  id: "faq-tally-2",
                  question: "Comment utiliser les champs cachés (Hidden Fields) dans un formulaire ?",
                  answer: "Ils permettent de pré-remplir des variables (ex: ID client, campagne source UTM) transmises via l'URL sans que l'utilisateur n'ait à les ressaisir."
                }
              ]
            }
          ]
        },
        {
          id: "m1-t5",
          title: "Focus complet : Automation avec Make",
          summary: "Architecture de flux d'automatisation avancés, gestion d'erreurs, manipulation JSON et webhooks.",
          keyConcepts: ["Scénarios & Modules", "Webhooks instantanés vs Polling", "Routeurs & Filtres", "Iterators & Aggregators", "Gestion des erreurs (Resume, Ignore, Rollback)"],
          defaultNotes: "Toujours prévoir une branche de gestion des erreurs (Error Handler Directive) sur les modules critiques comme les requêtes HTTP.",
          tools: [
            {
              id: "tool-make",
              name: "Make (ex-Integromat)",
              category: "iPaaS & Moteur d'Automatisation",
              description: "Plateforme visuelle d'intégration pour connecter des API et orchestrer des scénarios automatisés complexes.",
              faqs: [
                {
                  id: "faq-make-1",
                  question: "Quelle est la différence entre un déclencheur 'Instant' (Webhook) et 'ACID/Polling' dans Make ?",
                  answer: "Un Webhook instantané s'exécute immédiatement dès réception du payload sans consommer d'opérations d'attente, alors que le Polling interroge l'API à intervalles réguliers."
                },
                {
                  id: "faq-make-2",
                  question: "Quand utiliser un Iterator vs un Array Aggregator dans Make ?",
                  answer: "L'Iterator découpe un tableau (Array) en plusieurs paquets individuels (Bundles), alors que l'Array Aggregator fusionne plusieurs paquets distincts en un seul tableau."
                },
                {
                  id: "faq-make-3",
                  question: "Comment gérer une erreur 429 (Rate Limit) ou 500 dans un scénario Make ?",
                  answer: "En rattachant une directive 'Break' pour retenter la requête avec un délai exponentiel, ou 'Resume' avec une valeur par défaut de secours."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mod-2",
      number: 2,
      title: "Applications & Web",
      weeks: "Semaines 4 & 5",
      duration: "2 semaines (~60h)",
      color: "blue",
      iconName: "Globe",
      description: "Concevoir des sites web transactionnels, brancher des CRM et développer des applications web et mobiles No-Code complètes.",
      topics: [
        {
          id: "m2-t1",
          title: "CRM & Website Builder",
          summary: "Gestion du cycle de vie client, architecture CMS, landing pages haute conversion et SEO technique.",
          keyConcepts: ["Pipeline de ventes & Leads", "Modélisation CMS collections", "Responsive Design", "Intégration d'outils d'analytics"],
          defaultNotes: "Vérifier la conformité RGPD des formulaires de capture et le paramétrage des tags de tracking.",
          tools: [
            {
              id: "tool-hubspot",
              name: "HubSpot CRM",
              category: "Gestion de la Relation Client (CRM)",
              description: "Suite CRM tout-en-un pour gérer les contacts, entreprises, deals, tickets et séquences marketing.",
              faqs: [
                {
                  id: "faq-hubspot-1",
                  question: "Comment s'organise la structure d'objets standards dans HubSpot ?",
                  answer: "Elle repose sur 4 objets interconnectés : Contacts (individus), Entreprises (sociétés), Transactions (deals/opportunités) et Tickets (support SAV)."
                },
                {
                  id: "faq-hubspot-2",
                  question: "Quelle est la différence entre une propriété de contact et un événement personnalisé ?",
                  answer: "Une propriété stocke un état permanent (ex: statut du lead, ville), tandis qu'un événement enregistre une action temporelle (ex: téléchargement de livre blanc)."
                },
                {
                  id: "faq-hubspot-3",
                  question: "Comment synchroniser HubSpot avec une base de données No-Code externe ?",
                  answer: "Via les Webhooks de workflows HubSpot déclenchés sur modification d'objet pour transmettre la donnée à Make ou une API tierce."
                }
              ]
            },
            {
              id: "tool-webflow",
              name: "Webflow / Framer",
              category: "Website & CMS Builder Visuel",
              description: "Constructeurs web visuels générant du code HTML/CSS/JS sémantique et responsive haute fidélité.",
              faqs: [
                {
                  id: "faq-webflow-1",
                  question: "Pourquoi le modèle de boîte (Box Model CSS) est-il capital dans Webflow ?",
                  answer: "Comprendre Margins, Borders, Padding et Content permet de construire une mise en page fluide et pérenne sans casser la grille responsive."
                },
                {
                  id: "faq-webflow-2",
                  question: "Comment exploiter le CMS dynamique dans Webflow ?",
                  answer: "En créant des Collections avec des champs typés qui alimentent automatiquement des pages modèles (Template Pages) et des listes dynamiques."
                },
                {
                  id: "faq-webflow-3",
                  question: "Comment optimiser les Core Web Vitals sur un site Webflow ?",
                  answer: "En compressant les images au format WebP, en activant le lazy loading, et en limitant les scripts tiers non essentiels."
                }
              ]
            }
          ]
        },
        {
          id: "m2-t2",
          title: "Développement Web App / Mobile App",
          summary: "Création d'applications complètes avec authentification, permissions par rôles, logique métier et backend No-Code.",
          keyConcepts: ["CRUD & State Management", "Sécurité & Privacy Rules", "Responsive PWA & Mobile Native", "API Connectors"],
          defaultNotes: "Toujours tester les Privacy Rules avec différents profils d'utilisateurs (Admin, Utilisateur standard, Anonyme) avant la mise en production.",
          tools: [
            {
              id: "tool-bubble",
              name: "Bubble",
              category: "Plateforme Full-Stack No-Code",
              description: "Leader des outils No-Code pour créer des applications web complexes avec base de données intégrée et workflows côté serveur.",
              faqs: [
                {
                  id: "faq-bubble-1",
                  question: "Pourquoi les 'Privacy Rules' sont-elles critiques dans Bubble ?",
                  answer: "Elles s'exécutent côté serveur et empêchent physiquement les navigateurs d'accéder aux données sensibles, contrairement aux filtres d'affichage côté client qui sont vulnérables."
                },
                {
                  id: "faq-bubble-2",
                  question: "Quelle est la différence entre un Workflow 'Page' et un 'Backend Workflow' (API Workflow) ?",
                  answer: "Les Workflows de page tournent dans le navigateur utilisateur, alors que les Backend Workflows tournent sur le serveur Bubble (idéaux pour les tâches lourdes, récurrentes ou sécurisées)."
                },
                {
                  id: "faq-bubble-3",
                  question: "Qu'est-ce que l'unité de charge de travail 'Workload Unit' (WU) dans Bubble ?",
                  answer: "C'est la métrique de consommation de ressources serveur calculée selon les requêtes de base de données, les actions de workflows et les appels API."
                }
              ]
            },
            {
              id: "tool-flutterflow",
              name: "FlutterFlow / Glide / Softr",
              category: "Constructeur Mobile & PWA Rapide",
              description: "Outils visuels spécialisés pour concevoir des applications mobiles natives (Flutter/Dart) ou des portails clients reliés à Airtable/Google Sheets.",
              faqs: [
                {
                  id: "faq-flutterflow-1",
                  question: "Quel est le grand avantage de FlutterFlow pour le mobile ?",
                  answer: "Il génère du vrai code Flutter/Dart propre exportable, connectable à Firebase/Supabase, et publiable directement sur l'App Store et Google Play."
                },
                {
                  id: "faq-flutterflow-2",
                  question: "Dans quel cas choisir Glide ou Softr plutôt que Bubble ?",
                  answer: "Quand on veut déployer en quelques heures un portail interne ou un annuaire client en s'appuyant directement sur une base Airtable ou Google Sheets existante."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mod-3",
      number: 3,
      title: "Écosystème Microsoft Power Platform",
      weeks: "Semaines 8 à 13",
      duration: "6 semaines (~180h)",
      color: "emerald",
      iconName: "Layers",
      description: "Maîtriser les technologies d'entreprise Microsoft pour moderniser les processus métiers, concevoir des portails et intégrer des copilotes d'IA.",
      topics: [
        {
          id: "m3-t1",
          title: "SharePoint & Power Pages",
          summary: "Gestion documentaire sécurisée, intranets d'entreprise, listes collaboratives et portails web externes connectés à Dataverse.",
          keyConcepts: ["Listes & Bibliothèques de documents", "Permissions & Groupes M365", "Dataverse Architecture", "Authentification externe B2B/B2C sur Power Pages"],
          defaultNotes: "Éviter de dépasser le seuil de 5 000 éléments par affichage dans les listes SharePoint en indexant les colonnes clés.",
          tools: [
            {
              id: "tool-sharepoint",
              name: "Microsoft SharePoint",
              category: "Collaboration & Gestion Documentaire (GED)",
              description: "Plateforme cloud de Microsoft pour organiser, stocker et partager des documents et données métiers en toute sécurité.",
              faqs: [
                {
                  id: "faq-sharepoint-1",
                  question: "Qu'est-ce que le 'seuil d'affichage de liste' (List View Threshold) de 5 000 éléments ?",
                  answer: "C'est une limite de requête SQL côté serveur pour éviter les blocages de table ; on la contourne en créant des colonnes indexées et des vues filtrées précises."
                },
                {
                  id: "faq-sharepoint-2",
                  question: "Quelle est la différence entre une Liste SharePoint et Microsoft Lists ?",
                  answer: "Microsoft Lists est l'application moderne et intuitive issue de la même technologie sous-jacente SharePoint, enrichie de modèles prêts à l'emploi et d'une interface simplifiée."
                },
                {
                  id: "faq-sharepoint-3",
                  question: "Comment fonctionne l'héritage des autorisations dans SharePoint ?",
                  answer: "Par défaut, un sous-dossier ou une liste hérite des droits du site parent ; on peut 'rompre l'héritage' pour attribuer des permissions uniques et restreintes."
                }
              ]
            },
            {
              id: "tool-power-pages",
              name: "Microsoft Power Pages",
              category: "Portail Web d'Entreprise Sécurisé",
              description: "Générateur de sites web low-code d'entreprise permettant d'exposer des données Dataverse à des utilisateurs externes sécurisés.",
              faqs: [
                {
                  id: "faq-power-pages-1",
                  question: "À qui s'adresse Power Pages par rapport à Power Apps ?",
                  answer: "Power Pages est conçu pour les utilisateurs externes à l'organisation (clients, fournisseurs, partenaires), alors que Canvas Apps vise les collaborateurs internes."
                },
                {
                  id: "faq-power-pages-2",
                  question: "Comment est assurée la sécurité des données sur Power Pages ?",
                  answer: "Via les autorisations de table Dataverse (Table Permissions) assignées à des rôles web (Web Roles) spécifiques avec des règles de portée stricts."
                },
                {
                  id: "faq-power-pages-3",
                  question: "Peut-on personnaliser le design d'un site Power Pages avec du code ?",
                  answer: "Oui, via l'intégration de Visual Studio Code pour le Web (HTML/Liquid/CSS/JavaScript) pour personnaliser les templates de pages."
                }
              ]
            }
          ]
        },
        {
          id: "m3-t2",
          title: "Power Apps & Power Automate",
          summary: "Développement d'applications Canvas et Model-Driven, gouvernance de données sur Dataverse et automatisation des flux de travail.",
          keyConcepts: ["Formules Power Fx", "Applications Canvas vs Model-Driven", "Dataverse Tables & Relationships", "Automatisations Cloud & Desktop (RPA)"],
          defaultNotes: "Utiliser des collections locales (ClearCollect) pour limiter les appels réseau et respecter les règles de délégation Power Fx.",
          tools: [
            {
              id: "tool-power-apps",
              name: "Microsoft Power Apps",
              category: "Développement Low-Code d'Applications",
              description: "Suite d'outils Microsoft pour concevoir des applications métiers riches sur mesure avec le langage Power Fx.",
              faqs: [
                {
                  id: "faq-power-apps-1",
                  question: "Qu'est-ce que le problème de 'délégation' dans les formules Power Fx ?",
                  answer: "C'est quand une fonction (ex: Search, Filter non délégable) ne peut pas être exécutée par la source de données distante, limitant le traitement aux 500 ou 2 000 premiers enregistrements."
                },
                {
                  id: "faq-power-apps-2",
                  question: "Quelle est la différence fondamentale entre Canvas Apps et Model-Driven Apps ?",
                  answer: "Les Canvas Apps offrent une liberté totale de design 'pixel-perfect' sur un canevas blanc, tandis que les Model-Driven Apps se génèrent automatiquement à partir de la structure de données Dataverse."
                },
                {
                  id: "faq-power-apps-3",
                  question: "Qu'est-ce que Dataverse et pourquoi l'utiliser plutôt que SharePoint ?",
                  answer: "Dataverse est une véritable base de données relationnelle d'entreprise (avec intégrité référentielle, RBAC au niveau de la ligne, audit et gestion de volume sans limitation de 5k)."
                }
              ]
            },
            {
              id: "tool-power-automate",
              name: "Microsoft Power Automate",
              category: "Orchestration de Flux & RPA",
              description: "Moteur d'automatisation Microsoft reliant plus de 1 000 connecteurs cloud et permettant la RPA desktop.",
              faqs: [
                {
                  id: "faq-power-automate-1",
                  question: "Quels sont les 3 principaux types de flux dans Power Automate ?",
                  answer: "Les Flux Cloud automatisés (sur événement), instantanés (bouton manuel) et planifiés (tâche cron), ainsi que les flux de processus métier (BFP) et flux Desktop (RPA)."
                },
                {
                  id: "faq-power-automate-2",
                  question: "Comment gérer les boucles 'Apply to each' sans dégrader les performances ?",
                  answer: "En activant le contrôle de concurrence (Concurrency Control) dans les paramètres du bloc pour exécuter jusqu'à 50 itérations en parallèle."
                },
                {
                  id: "faq-power-automate-3",
                  question: "Comment sécuriser les variables sensibles dans l'historique d'exécution ?",
                  answer: "En activant les options 'Sécuriser les entrées' (Secure Inputs) et 'Sécuriser les sorties' (Secure Outputs) dans les paramètres d'action pour masquer les mots de passe et tokens des logs."
                }
              ]
            }
          ]
        },
        {
          id: "m3-t3",
          title: "IA Appliquée (Cas pratiques)",
          summary: "Intégration d'agents conversationnels intelligents, extraction automatisée de documents avec AI Builder et prompt engineering d'entreprise.",
          keyConcepts: ["Copilots personnalisés", "AI Builder Models (OCR, classification)", "Génération augmentée de récupération (RAG)", "Sécurité et conformité IA"],
          defaultNotes: "Évaluer la précision des modèles AI Builder sur un échantillon de test représentatif d'au moins 20 factures ou formulaires réels.",
          tools: [
            {
              id: "tool-copilot-studio",
              name: "Microsoft Copilot Studio",
              category: "Agents Conversationnels & IA Générative",
              description: "Plateforme pour créer, tester et déployer des agents d'IA conversationnelle connectés aux données d'entreprise.",
              faqs: [
                {
                  id: "faq-copilot-1",
                  question: "Comment Copilot Studio utilise-t-il les réponses génératives (Generative Answers) ?",
                  answer: "Il applique le pattern RAG : il indexe les sites web internes, fichiers SharePoint ou bases de connaissances pour synthétiser des réponses vérifiées avec citations de sources."
                },
                {
                  id: "faq-copilot-2",
                  question: "Quelle est la différence entre un 'Topic' classique et un 'Plugin' dans Copilot Studio ?",
                  answer: "Un Topic est un flux conversationnel prédéfini, alors qu'un Plugin (connecteur ou flow Power Automate) permet à l'IA d'appeler dynamiquement une action externe (ex: réserver une salle)."
                },
                {
                  id: "faq-copilot-3",
                  question: "Comment s'assure-t-on de la modération des réponses de l'agent ?",
                  answer: "En paramétrant le niveau de modération du contenu (Low, Medium, High) et en configurant des consignes strictes dans le System Prompt."
                }
              ]
            },
            {
              id: "tool-ai-builder",
              name: "AI Builder",
              category: "IA Low-Code intégrée à Power Platform",
              description: "Capacités d'IA clé en main pour extraire du texte de factures, classifier des emails et prédire des comportements.",
              faqs: [
                {
                  id: "faq-ai-builder-1",
                  question: "Combien de documents minimum faut-il pour entraîner un modèle de traitement de formulaire ?",
                  answer: "Il faut au minimum 5 documents par mise en page (template), mais 15 à 20 exemples variés sont recommandés pour une précision optimale."
                },
                {
                  id: "faq-ai-builder-2",
                  question: "Qu'est-ce qu'un modèle pré-entraîné vs un modèle personnalisé dans AI Builder ?",
                  answer: "Le pré-entraîné est prêt à l'emploi (lecteur de reçus, cartes de visite, détection de langue), alors que le personnalisé s'entraîne sur vos propres formats de documents métiers spécifiques."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mod-4",
      number: 4,
      title: "Vibe Coding & Dev IA",
      weeks: "Semaine 14",
      duration: "1 semaine (~35h)",
      color: "purple",
      iconName: "Code2",
      description: "Accélérer la création logicielle grâce aux assistants d'IA générative modernes, au versioning Git et aux environnements de développement augmentés.",
      topics: [
        {
          id: "m4-t1",
          title: "Google AI Studio & Vibe Coding",
          summary: "Prototypage ultra-rapide en langage naturel, ingénierie de prompt avancée, paramétrage système et génération d'applications complètes.",
          keyConcepts: ["Philosophie Vibe Coding", "System Prompts & Temperature", "Multi-modality (Images, Audio, Code)", "Structured JSON Output"],
          defaultNotes: "Toujours spécifier explicitement les contraintes de formats et les personas dans le System Prompt pour obtenir un code déterministe.",
          tools: [
            {
              id: "tool-ai-studio",
              name: "Google AI Studio",
              category: "Prototypage IA & Suite Gemini",
              description: "Environnement web rapide de Google pour tester les modèles Gemini, créer des prompts système et générer des applications.",
              faqs: [
                {
                  id: "faq-aistudio-1",
                  question: "Qu'est-ce que le concept de 'Vibe Coding' rendu possible par AI Studio ?",
                  answer: "C'est une approche où le développeur guide l'IA par intentions en langage naturel, itère par feedbacks visuels continus et laisse l'IA écrire et ajuster le code sous-jacent."
                },
                {
                  id: "faq-aistudio-2",
                  question: "Comment choisir entre Gemini Flash et Gemini Pro dans AI Studio ?",
                  answer: "Gemini Flash est ultra-rapide et économique pour les tâches réactives et l'interface utilisateur, tandis que Gemini Pro excelle dans le raisonnement complexe, la modélisation et le débogage approfondi."
                },
                {
                  id: "faq-aistudio-3",
                  question: "À quoi sert la fonctionnalité de 'System Instructions' dans AI Studio ?",
                  answer: "Elle définit le contexte persistant, le persona, les contraintes de format strictes et les règles métier que le modèle doit respecter tout au long des échanges."
                }
              ]
            }
          ]
        },
        {
          id: "m4-t2",
          title: "GitHub & Premier déploiement",
          summary: "Gestion de versions d'équipe, branches, pull requests et pipelines de déploiement continu (CI/CD) sur le cloud.",
          keyConcepts: ["Git workflow (commit, push, branch, merge)", "Gestion des secrets d'environnement (.env)", "Déploiement continu automatisé", "Monitoring & Logs"],
          defaultNotes: "Ne JAMAIS commiter de clés d'API dans un dépôt GitHub public ; toujours utiliser le fichier .gitignore et les secrets de plateforme.",
          tools: [
            {
              id: "tool-github",
              name: "GitHub & Cloud Deployment",
              category: "Versioning & Hébergement Cloud",
              description: "Plateforme centrale de collaboration de code et d'automatisation de déploiements continus.",
              faqs: [
                {
                  id: "faq-github-1",
                  question: "Quelle est la règle d'or pour protéger les clés d'API avec Git ?",
                  answer: "Déclarer impérativement le fichier .env dans le .gitignore avant le premier commit et configurer les variables d'environnement dans l'interface de l'hébergeur."
                },
                {
                  id: "faq-github-2",
                  question: "Qu'est-ce qu'une Pull Request (PR) et pourquoi est-elle indispensable ?",
                  answer: "C'est une demande de fusion d'une branche vers la branche principale permettant la revue de code par les pairs et l'exécution de tests automatiques avant déploiement."
                },
                {
                  id: "faq-github-3",
                  question: "Comment fonctionne le déploiement continu (CI/CD) vers Cloud Run ou Vercel ?",
                  answer: "Chaque push sur la branche 'main' déclenche un webhook qui reconstruit l'application et la publie instantanément en production sous forme de conteneur ou d'assets statiques."
                }
              ]
            }
          ]
        },
        {
          id: "m4-t3",
          title: "IDE IA : Cursor avec Kilo Code",
          summary: "Développement assisté par IA dans l'éditeur, indexation complète du codebase, édition multi-fichiers et règles personnalisées.",
          keyConcepts: ["Indexation du codebase (.cursorrules)", "Composers & Multi-file editing", "Chat inline contextuel (Cmd+K / Cmd+I)", "Refactoring assisté"],
          defaultNotes: "Configurer un fichier .cursorrules à la racine du projet avec les conventions de stack, styles et bonnes pratiques pour calibrer l'agent.",
          tools: [
            {
              id: "tool-cursor",
              name: "Cursor IDE & Kilo Code",
              category: "Éditeur de Code Augmenté par l'IA",
              description: "Fork de VS Code intégrant nativement des agents IA capables de lire l'intégralité du projet et d'effectuer des modifications chirurgicales.",
              faqs: [
                {
                  id: "faq-cursor-1",
                  question: "Comment Cursor comprend-il le contexte global d'un projet ?",
                  answer: "Cursor génère un index vectoriel sémantique (Embeddings) de l'ensemble des fichiers du dépôt, lui permettant d'injecter automatiquement les extraits de code pertinents dans ses réponses."
                },
                {
                  id: "faq-cursor-2",
                  question: "Qu'est-ce que le fichier .cursorrules et pourquoi est-il essentiel ?",
                  answer: "C'est un fichier markdown ou texte placé à la racine qui dicte les standards de code (Tailwind, TypeScript strict, conventions de nommage) que l'IA applique systématiquement à chaque génération."
                },
                {
                  id: "faq-cursor-3",
                  question: "Quelle est la différence entre le mode Chat (Cmd+L) et Composer (Cmd+I) ?",
                  answer: "Le Chat répond à des questions et suggère des blocs à intégrer, tandis que le Composer peut créer, modifier et supprimer plusieurs fichiers simultanément à travers tout le projet."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "mod-5",
      number: 5,
      title: "Certification & Projet Fil Rouge",
      weeks: "Semaines 15 à 17",
      duration: "3 semaines (~95h)",
      color: "rose",
      iconName: "Award",
      description: "Validation des acquis officiels, finalisation du cas d'usage professionnel complet et soutenance devant le jury d'experts.",
      topics: [
        {
          id: "m5-t1",
          title: "Préparation aux Certifications & Tutorat",
          summary: "Révisions intensives, examens blancs, validation des compétences clés PIX et certifications Microsoft (PL-900 / PL-100).",
          keyConcepts: ["Examens blancs chronométrés", "Stratégie de passage QCM", "Synthèse des acquis No-Code", "Accompagnement individualisé"],
          defaultNotes: "Planifier 3 sessions d'examens blancs sur Microsoft Learn et identifier les thématiques nécessitant un renforcement.",
          tools: [
            {
              id: "tool-ms-learn",
              name: "Microsoft Learn & Certifications",
              category: "Plateforme d'Apprentissage Officielle",
              description: "Portail officiel de préparation aux examens de certification Microsoft Power Platform (PL-900, PL-100).",
              faqs: [
                {
                  id: "faq-mslearn-1",
                  question: "Quel est le score minimum requis pour valider l'examen PL-900 (Power Platform Fundamentals) ?",
                  answer: "Il faut obtenir un score minimum de 700 sur 1 000 points lors du test chronométré d'environ 45 minutes."
                },
                {
                  id: "faq-mslearn-2",
                  question: "Quels sont les thèmes les plus lourdement pondérés dans le PL-900 ?",
                  answer: "La valeur commerciale de Power Platform, les capacités de Dataverse, la création d'applications Power Apps et l'automatisation avec Power Automate."
                },
                {
                  id: "faq-mslearn-3",
                  question: "Comment utiliser les bacs à sable (Sandbox / Developer Environment) pour réviser ?",
                  answer: "En activant un plan Power Apps Developer gratuit qui offre un environnement Dataverse personnel sans impacter les tenants de production."
                }
              ]
            }
          ]
        },
        {
          id: "m5-t2",
          title: "Projet / Cas d'usage professionnel",
          summary: "Cadrage, développement complet et recette d'une solution de transformation numérique pour une entreprise cliente réelle ou simulée.",
          keyConcepts: ["Cahier des charges fonctionnel & technique", "Architecture applicative globale", "Recette & Plan de tests", "Conduite du changement & Documentation utilisateur"],
          defaultNotes: "Rédiger le guide d'administration et préparer la matrice de traçabilité des exigences du projet fil rouge.",
          tools: [
            {
              id: "tool-project-toolkit",
              name: "Boîte à Outils Cadrage Projet",
              category: "Méthodologie & Pilotage",
              description: "Ensemble de matrices de gouvernance (RACI, RICE, Cahier des charges, Backlog Agile) pour piloter la transformation.",
              faqs: [
                {
                  id: "faq-proj-1",
                  question: "Comment prioriser les fonctionnalités avec le framework RICE ?",
                  answer: "En calculant le score : (Reach x Impact x Confidence) / Effort, afin d'objectiver rationnellement les priorités de la roadmap MVP."
                },
                {
                  id: "faq-proj-2",
                  question: "Pourquoi réaliser une matrice RACI dès le cadrage du projet fil rouge ?",
                  answer: "Pour clarifier qui est Responsable (R), Approbateur (A), Consulté (C) et Informé (I) sur chaque livrable et éviter les blocages décisionnels."
                }
              ]
            }
          ]
        },
        {
          id: "m5-t3",
          title: "Demo Day & Clôture (2 Octobre 2026)",
          summary: "Présentation des réalisations en soutenance live devant le jury d'experts professionnels, bilan de compétences et clôture de promo.",
          keyConcepts: ["Pitch deck structuré (Problème, Solution, ROI)", "Démonstration live sans couture", "Réponses aux questions du jury", "Validation du titre professionnel"],
          defaultNotes: "Préparer un plan de secours (vidéo préenregistrée de démo) en cas d'aléa réseau le jour de la soutenance.",
          tools: [
            {
              id: "tool-pitch-deck",
              name: "Pitch & Live Demo Toolkit",
              category: "Communication & Soutenance",
              description: "Outils de présentation visuelle d'impact et scénarisation de démonstrations logicielles en direct.",
              faqs: [
                {
                  id: "faq-pitch-1",
                  question: "Quelle est la structure idéale d'un pitch de transformation numérique en 10 minutes ?",
                  answer: "2 min : Contexte & Irritants métier / 2 min : Architecture & Choix No-Code / 4 min : Démo live du parcours utilisateur / 2 min : ROI mesuré & Perspectives."
                },
                {
                  id: "faq-pitch-2",
                  question: "Comment réagir sereinement si un bug survient pendant la démonstration live ?",
                  answer: "Expliquer calmement ce qui était attendu, basculer sur les captures ou le schéma d'architecture et valoriser la démarche de débogage méthodologique."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
