"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<string, Record<string, string>> = {
  fr: {
    // Header
    about: "À propos",
    experience: "Expérience",
    technologies: "Technologies",
    projects: "Projets",
    contact: "Contact",
    downloadCV: "Télécharger CV",
    languages: "Langues",
    languageLabelFr: "Français",
    languageLabelEn: "English",
    languageShortFr: "FR",
    languageShortEn: "EN",
  lightMode: "Light Mode",
  darkMode: "Dark Mode",

    // Hero
    hello: "Bonjour, je suis",
    fullName: "Houssam Eddine Ben Kheder",
    title: "Ingénieur IA appliquée / Data Scientist",
    description:
      "Ingénieur IA appliquée et Data Scientist spécialisé dans les systèmes agentiques, le RAG multimodal et les solutions d'intelligence artificielle pour la finance.",
    contactMe: "Me contacter",
    location: "Ariana Essoghra, Tunisie",
  esprit: "ESPRIT",
  aiAbbr: "IA",
  and: "et",

    // About
    aboutTitle: "À propos de moi",
    aboutP1:
      "Je suis Houssam Eddine Ben Kheder, ingénieur IA appliquée et Data Scientist. Je conçois des systèmes d'intelligence artificielle agentiques qui transforment des données complexes en outils fiables et utiles.",
    aboutP2:
      "Je combine l'ingénierie des données, les modèles multimodaux et la recherche hybride pour construire des assistants capables d'exploiter des documents financiers et d'en restituer les informations pertinentes.",
    aboutP3:
      "Mon approche associe la puissance des LLM à des calculs déterministes et vérifiables, afin de créer des expériences conversationnelles utiles sans compromettre la fiabilité des résultats.",
    aboutP4:
      "Lors de mon stage de fin d'études chez Value Digital Services, j'ai travaillé sur deux solutions pour son client Tunisie Valeurs : un RAG multimodal pour la recherche financière et un CRM agentique destiné aux Relationship Managers.",
    education: "Formation",
    certifications: "Certifications",
    present: "Présent",
    // Education / Degrees
    degree1_date: "Sep. 2020 - Juin 2026",
    degree1_title: "Cycle d'ingénieur - Spécialité Data Science",
    degree1_institution: "ESPRIT - Ariana, Tunisie",
    degree2_date: "Juin 2021",
    degree2_title: "Bac Mathématiques",
    degree2_institution: "Lycée Wafa - Cité gazella, Ariana, Tunisie",
    // Languages in About
    lang_arabic: "Arabe (maternelle)",
    lang_french: "Français (excellent)",
    lang_english: "Anglais (excellent)",
    spoken_arabic: "Arabe — langue maternelle",
    spoken_french: "Français — courant",
    spoken_english: "Anglais — courant",

    // Experience
    experienceTitle: "Expérience Professionnelle",
  // Experience entries
  exp1_title: "Data Scientist & Ingénieur IA Agentique",
  exp1_company: "Value Digital Services",
  exp1_period: "Déc. 2025 - Juin 2026 | Tunis, Tunisie",
  exp1_desc_0: "Pilotage d'un système de RAG agentique multimodal en production pour Tunisie Valeurs, couvrant plus de 120 rapports de recherche actions de plus de 130 pages chacun",
  exp1_desc_1: "Construction du pipeline d'ingestion : YOLOv10 détecte la mise en page et route les pages vers GPT-4o Vision pour rendre les tableaux et graphiques interrogeables",
  exp1_desc_2: "Développement d'un ETL multimodal agentique qui extrait et enrichit le contenu des images en base de données, avec des contrôles de validation",
  exp1_desc_3: "Implémentation d'un agent orienté objectifs avec planification hiérarchique, appels d'outils dynamiques, raisonnement multi-persona et mémoire long terme",
  exp1_desc_4: "Optimisation de la recherche hybride pgvector et plein texte PostgreSQL avec multilingual-e5-large, pour retrouver le sens et les chiffres exacts",
  exp1_desc_5: "Développement d'un CRM agentique et d'un moteur de conseil où chaque réponse conversationnelle s'appuie sur des KPI déterministes",
  exp1_desc_6: "Livraison full stack avec FastAPI, Next.js et Docker, avec traçage Laminar pour l'observabilité de bout en bout",

  exp2_title: "Stagiaire Data Science",
  exp2_company: "VALUE Enterprise",
  exp2_period: "Juin 2025 - Août 2025 | Tunis, Tunisie",
  exp2_desc_0: "Création de simulations multi-agents pour l'analyse géomarketing macro et micro de segments professionnels à forte valeur (avocats, médecins, ingénieurs)",
  exp2_desc_1: "Modélisation de scénarios économiques et de perturbations du marché par méthodes de Monte Carlo et frameworks de tests d'événements",
  exp2_desc_2: "Génération de données synthétiques tabulaires avec CTGAN; normalisation par loi normale des données démographiques concentrées géographiquement et segmentation par KNN",
  exp2_desc_3: "Ajout d'un chatbot agentique qui explique les résultats des simulations et estime la conversion des marchés cibles",

  exp3_title: "Stagiaire Machine Learning",
  exp3_company: "TRITUX",
  exp3_period: "Juin 2024 - Août 2024 | Tunis, Tunisie",
  exp3_desc_0: "Construction d'un pipeline de churn télécom sur 2 666 clients, avec équilibrage SMOTE+ENN et comparaison de Logistic Regression, SVC, Gradient Boosting, XGBoost, AdaBoost et d'un réseau de neurones",
  exp3_desc_1: "Gradient Boosting atteint 99,01 % de précision et un AUC de 1,00 sur un jeu de test de 912 échantillons",
  exp3_desc_2: "Explication des facteurs de churn avec SHAP et segmentation des clients en trois groupes avec K-Means",
  exp3_desc_3: "Workflow MLOps avec suivi des expériences, paramètres et métriques dans MLflow, enregistrement au Model Registry, API FastAPI (/predict, /metrics), interface Flask et automatisation via Makefile",

    // Technologies
    technologiesTitle: "Technologies & Compétences",
  // Technology categories
  tech_cat_languages: "Langages de programmation",
  tech_cat_ai: "IA & Data",
  tech_cat_frameworks: "Frameworks & Bibliothèques",
  tech_cat_models: "Modèles & Algorithmes",
  tech_cat_backend: "Backend & MLOps",
  tech_cat_data: "Données & Recherche",
  tech_cat_spoken: "Langues parlées",

    // Projects
    projectsTitle: "Projets Sélectionnés",
    viewProject: "Voir le projet",
    projectHighlights: "Contributions clés",
    projectTechStack: "Stack & méthodes",
    imagePreviewDescription: "Aperçu de l'image du projet.",
    videoPreviewDescription: "Lecture de la démonstration vidéo du projet.",
      // Project entries
      proj1_title: "RAG Agentique Multimodal - Tunisie Valeurs",
      proj1_period: "Déc. 2025 - Juin 2026",
      proj1_description:
        "Système de recherche multimodale en production, réalisé chez Value Digital Services pour son client Tunisie Valeurs.",
      proj1_highlight_0: "Répond aux questions des analystes à partir de plus de 120 rapports de recherche actions de plus de 130 pages chacun, ainsi que de notes de marché.",
      proj1_highlight_1: "Pipeline d'ingestion avec détection de mise en page YOLOv10 et routage des pages vers GPT-4o Vision pour rendre tableaux et graphiques interrogeables.",
      proj1_highlight_2: "ETL multimodal agentique qui extrait et enrichit le contenu des images en base, avec des contrôles de validation; recherche hybride pgvector et plein texte PostgreSQL avec multilingual-e5-large.",
      proj1_highlight_3: "Agent orienté objectifs avec planification hiérarchique, appels d'outils dynamiques, raisonnement multi-persona et mémoire long terme; traçage Laminar pour l'observabilité.",

      proj2_title: "CRM Agentique & Moteur de Conseil Financier",
      proj2_period: "Déc. 2025 - Juin 2026",
      proj2_description:
        "Assistant CRM et moteur de conseil financier destinés aux Relationship Managers de Tunisie Valeurs.",
      proj2_highlight_0: "Aide les gestionnaires de relation à évaluer la situation financière de leurs clients et à préparer leurs échanges.",
      proj2_highlight_1: "Les KPI financiers sont calculés par des règles déterministes afin que chaque réponse s'appuie sur des valeurs cohérentes et vérifiables.",
      proj2_highlight_2: "Le LLM apporte l'interface conversationnelle et formule des explications à partir des résultats calculés, sans remplacer le moteur KPI.",
      proj2_highlight_3: "Application full stack avec Next.js et TypeScript, API FastAPI, LangChain et persistance SQLite.",

      proj3_title: "Simulation Multi-Agents - Banque",
      proj3_period: "Juil. - Août 2025",
      proj3_description:
        "Simulations multi-agents pour l'analyse géomarketing de segments professionnels à forte valeur.",
      proj3_highlight_0: "Analyse macro et micro de segments de professionnels tels que les avocats, médecins et ingénieurs.",
      proj3_highlight_1: "Méthodes de Monte Carlo et tests d'événements pour modéliser les scénarios économiques et les perturbations du marché.",
      proj3_highlight_2: "Données tabulaires synthétiques CTGAN pour pallier le manque de données; normalisation des données démographiques concentrées dans certaines zones.",
      proj3_highlight_3: "Segmentation client par KNN et chatbot agentique pour expliquer les simulations et estimer la conversion des marchés cibles.",

      proj4_title: "DueXpert - Due Diligence Crypto",
      proj4_period: "2024 - 2025",
      proj4_description:
        "Outil de due diligence des fonds crypto combinant évaluation des risques, analyse documentaire et génération de rapports.",
      proj4_highlight_0: "Système LLM et RAG qui évalue les risques selon 15 dimensions, dont la réglementation, la cybersécurité, la manipulation et la liquidité; résultats conservés dans MongoDB.",
      proj4_highlight_1: "Traitement de plus de 800 questions de risque issues de whitepapers sur des postes de travail GPU.",
      proj4_highlight_2: "Prévisions LSTM de la volatilité de Bitcoin et Ethereum.",
      proj4_highlight_3: "Agent de génération de rapports PowerPoint qui réduit la préparation d'une due diligence de trois jours à moins de dix minutes.",

      proj5_title: "Détection de Tumeurs Cérébrales",
      proj5_period: "2024 - 2025",
      proj5_description:
        "Évaluation comparative de modèles de deep learning pour la classification de tumeurs cérébrales sur IRM.",
      proj5_highlight_0: "Comparaison d'un CNN personnalisé à un modèle VGG16 fine-tuné sur un jeu de test indépendant de 673 examens.",
      proj5_highlight_1: "Le CNN personnalisé atteint 92 % de précision et un F1 macro de 0,92.",
      proj5_highlight_2: "VGG16 atteint 96 % de précision et un F1 macro de 0,96.",
      proj5_highlight_3: "VGG16 obtient de meilleurs résultats sur les quatre classes; le F1 de la classe méningiome progresse de 0,83 à 0,93.",

      proj6_title: "Reconnaissance des Émotions Vocales",
      proj6_period: "2024 - 2025",
      proj6_description:
        "Classification des émotions vocales à partir de spectrogrammes Mel avec embeddings ResNet-50 et augmentation par diffusion.",
      proj6_highlight_0: "Entraînement sur les corpus EmoDB et RAVDESS; augmentation avec des spectrogrammes générés par diffusion.",
      proj6_highlight_1: "Comparaison des classifieurs Logistic Regression, Random Forest et MLP.",
      proj6_highlight_2: "Random Forest atteint 98,50 % de précision sur le jeu de test.",
      proj6_highlight_3: "Random Forest atteint 98,26 % ± 1,91 % en validation croisée; le MLP atteint 97,10 % de précision au test.",

      proj7_title: "Churn Prediction & Retention Strategy",
      proj7_period: "2024 - 2025",
      proj7_description:
        "Pipeline de machine learning de bout en bout pour prédire et analyser le churn télécom.",
      proj7_highlight_0: "Analyse de 2 666 clients; rééquilibrage des classes avec SMOTE+ENN et comparaison de Logistic Regression, SVC, Gradient Boosting, XGBoost, AdaBoost et d'un réseau de neurones.",
      proj7_highlight_1: "Gradient Boosting atteint 99,01 % de précision et un AUC de 1,00 sur un jeu de test de 912 clients.",
      proj7_highlight_2: "SHAP explique les principaux facteurs de churn et K-Means identifie trois groupes de clients.",
      proj7_highlight_3: "Workflow MLOps avec suivi des expériences, paramètres et métriques dans MLflow, enregistrement du modèle, API FastAPI (/predict, /metrics), interface Flask et automatisation Makefile.",

    // Contact
    contactTitle: "Contactez-moi",
    contactDescription: "Pour échanger sur mes projets ou une opportunité, n'hésitez pas à me contacter.",
    sendMessage: "Envoyer un message",
    stayInTouch: "Restons en contact",
    contactIntro:
      "N'hésitez pas à me contacter pour échanger sur mes projets, mon expérience ou de futures opportunités.",
    email: "houssameddine.benkheder@esprit.tn",
    phone: "+216 26 684 385",

    // Footer
    builtBy: "Conçu et développé par Firas Bouguerra",
    copyright: "© 2026 Houssam Eddine Ben Kheder. Tous droits réservés.",
    builtWith: "Conçu et développé avec",
  },
  en: {
    // Header
    about: "About",
    experience: "Experience",
    technologies: "Technologies",
    projects: "Projects",
    contact: "Contact",
    downloadCV: "Download CV",
  languages: "Languages",
  languageShortFr: "FR",
  languageShortEn: "EN",

    // Hero
    hello: "Hello, I'm",
    fullName: "Houssam Eddine Ben Kheder",
    title: "Applied AI Engineer / Data Scientist",
    description:
      "Applied AI Engineer and Data Scientist focused on agentic systems, multimodal RAG, and artificial intelligence solutions for financial services.",
    contactMe: "Contact Me",
    location: "Ariana Essoghra, Tunis",
  esprit: "ESPRIT",
  aiAbbr: "AI",
  and: "and",

    // About
    aboutTitle: "About Me",
    aboutP1:
      "I am Houssam Eddine Ben Kheder, an Applied AI Engineer and Data Scientist. I build agentic AI systems that turn complex data into reliable and useful tools.",
    aboutP2:
      "I combine data engineering, multimodal models, and hybrid search to build assistants that can explore financial documents and surface the information that matters.",
    aboutP3:
      "My approach pairs the capabilities of LLMs with deterministic, verifiable calculations to create useful conversational experiences without compromising reliability.",
    aboutP4:
      "During my end-of-study internship at Value Digital Services, I worked on two solutions for its client Tunisie Valeurs: a multimodal RAG system for financial research and an agentic CRM for Relationship Managers.",
    education: "Education",
    certifications: "Certifications",
    present: "Present",
    // Education / Degrees
    degree1_date: "Sep. 2020 - Jun. 2026",
    degree1_title: "Engineering Cycle - Data Science Specialization",
    degree1_institution: "ESPRIT - Ariana, Tunisia",
    degree2_date: "June 2021",
    degree2_title: "Mathematics Baccalaureate",
    degree2_institution: "Lycée Wafa - Cité gazella, Ariana, Tunisia",
    // Languages in About
    lang_arabic: "Arabic (native)",
    lang_french: "French (excellent)",
    lang_english: "English (excellent)",
    spoken_arabic: "Arabic — Native",
    spoken_french: "French — Fluent",
    spoken_english: "English — Fluent",

    // Experience
    experienceTitle: "Professional Experience",
  // Experience entries
  exp1_title: "Data Scientist & Agentic AI Engineer",
  exp1_company: "Value Digital Services",
  exp1_period: "Dec. 2025 - Jun. 2026 | Tunis, Tunisia",
  exp1_desc_0: "Led a production multimodal agentic RAG system for Tunisie Valeurs, covering 120+ equity research reports of 130+ pages each",
  exp1_desc_1: "Built the ingestion pipeline: YOLOv10 layout detection routes pages to GPT-4o Vision, making charts and tables searchable",
  exp1_desc_2: "Built an agentic multimodal ETL that extracts and enriches image content into the database, with validation checks",
  exp1_desc_3: "Implemented a goal-driven agent with hierarchical planning, dynamic tool calling, multi-persona reasoning, and long-term memory",
  exp1_desc_4: "Tuned hybrid pgvector and PostgreSQL full-text retrieval with multilingual-e5-large to match meaning and exact figures",
  exp1_desc_5: "Built an agentic CRM and advisory engine where deterministic KPI calculations back every conversational answer",
  exp1_desc_6: "Shipped the full stack with FastAPI, Next.js, and Docker, using Laminar for end-to-end agent observability",

  exp2_title: "Data Science Intern",
  exp2_company: "VALUE Enterprise",
  exp2_period: "Jun. 2025 - Aug. 2025 | Tunis, Tunisia",
  exp2_desc_0: "Built agent-based simulations for macro and micro geomarketing analysis of high-value professional segments (lawyers, doctors, engineers)",
  exp2_desc_1: "Modeled economic scenarios and market disruptions using Monte Carlo methods and event-testing frameworks",
  exp2_desc_2: "Generated synthetic tabular data with CTGAN, normalized geographically concentrated demographics using a normal distribution, and used KNN for customer segmentation",
  exp2_desc_3: "Added an agentic chatbot to explain simulation outputs and estimate target-market conversion",

  exp3_title: "Machine Learning Intern",
  exp3_company: "TRITUX",
  exp3_period: "Jun. 2024 - Aug. 2024 | Tunis, Tunisia",
  exp3_desc_0: "Built a telecom churn pipeline for 2,666 customers with SMOTE+ENN balancing, benchmarking Logistic Regression, SVC, Gradient Boosting, XGBoost, AdaBoost, and a neural network",
  exp3_desc_1: "Gradient Boosting achieved 99.01% accuracy and AUC 1.00 on a 912-sample test set",
  exp3_desc_2: "Used SHAP to explain churn drivers and K-Means to identify three customer clusters",
  exp3_desc_3: "Packaged the MLOps workflow with MLflow experiment, parameter, and metric tracking plus model registration; served predictions via FastAPI (/predict, /metrics) and a Flask UI, with Makefile automation",

    // Technologies
    technologiesTitle: "Technologies & Skills",
  // Technology categories
  tech_cat_languages: "Programming Languages",
  tech_cat_ai: "AI & Data",
  tech_cat_frameworks: "Frameworks & Libraries",
  tech_cat_models: "Models & Algorithms",
  tech_cat_backend: "Backend & MLOps",
  tech_cat_data: "Data & Search",
  tech_cat_spoken: "Spoken Languages",

    // Projects
    projectsTitle: "Selected Projects",
    viewProject: "View Project",
    projectHighlights: "Key Contributions",
    projectTechStack: "Stack & Methods",
    imagePreviewDescription: "Preview of the project image.",
    videoPreviewDescription: "Playing the project demo video.",
      // Project entries
      proj1_title: "Multimodal Agentic RAG - Tunisie Valeurs",
      proj1_period: "Dec. 2025 - Jun. 2026",
      proj1_description:
        "Production multimodal research system built at Value Digital Services for its client Tunisie Valeurs.",
      proj1_highlight_0: "Answers analyst questions across 120+ equity research reports of 130+ pages each, as well as market notes.",
      proj1_highlight_1: "Ingestion pipeline uses YOLOv10 layout detection to route pages to GPT-4o Vision, making tables and charts searchable.",
      proj1_highlight_2: "Agentic multimodal ETL extracts and enriches image content into the database with validation checks; hybrid pgvector and PostgreSQL full-text retrieval uses multilingual-e5-large.",
      proj1_highlight_3: "Goal-driven agent with hierarchical planning, dynamic tool calling, multi-persona reasoning, and long-term memory; Laminar provides end-to-end observability.",

      proj2_title: "Agentic CRM & Financial Advisory Engine",
      proj2_period: "Dec. 2025 - Jun. 2026",
      proj2_description:
        "Agentic CRM and financial advisory engine for Tunisie Valeurs Relationship Managers.",
      proj2_highlight_0: "Helps Relationship Managers assess client financial status and prepare for client conversations.",
      proj2_highlight_1: "Deterministic financial KPI rules ensure each answer is grounded in consistent, verifiable calculations.",
      proj2_highlight_2: "The LLM provides the conversational interface and explains calculated results; it does not replace the KPI calculation engine.",
      proj2_highlight_3: "Full-stack application built with Next.js and TypeScript, a FastAPI API, LangChain, and SQLite persistence.",

      proj3_title: "AI Client Simulation - Bank Simulation",
      proj3_period: "Jul. - Aug. 2025",
      proj3_description:
        "Agent-based simulations for geomarketing analysis of high-value professional segments.",
      proj3_highlight_0: "Analyzed macro and micro markets for professional segments including lawyers, doctors, and engineers.",
      proj3_highlight_1: "Used Monte Carlo methods and event-testing frameworks to model economic scenarios and market disruptions.",
      proj3_highlight_2: "Generated synthetic tabular data with CTGAN to address data scarcity and normalized demographics concentrated in specific areas.",
      proj3_highlight_3: "Trained KNN models for customer segmentation and added an agentic chatbot to explain simulation results and estimate target-market conversion.",

      proj4_title: "DueXpert - Due Diligence Crypto",
      proj4_period: "2024 - 2025",
      proj4_description:
        "Crypto fund due-diligence platform combining risk scoring, document analysis, and report generation.",
      proj4_highlight_0: "Built an LLM and RAG system to score funds across 15 risk dimensions, including regulatory, cybersecurity, manipulation, and liquidity risks; results stored in MongoDB.",
      proj4_highlight_1: "Processed 800+ whitepaper risk questions on GPU workstations.",
      proj4_highlight_2: "Added LSTM volatility forecasts for Bitcoin and Ethereum.",
      proj4_highlight_3: "Built a PowerPoint reporting agent that reduced due-diligence report preparation from three days to under ten minutes.",

      proj5_title: "Brain Tumor Detection",
      proj5_period: "2024 - 2025",
      proj5_description:
        "Compared deep-learning models for MRI brain-tumor classification.",
      proj5_highlight_0: "Evaluated a custom CNN against fine-tuned VGG16 on a 673-sample holdout test set.",
      proj5_highlight_1: "The custom CNN reached 92% accuracy and 0.92 macro F1.",
      proj5_highlight_2: "Fine-tuned VGG16 reached 96% accuracy and 0.96 macro F1.",
      proj5_highlight_3: "VGG16 scored higher on all four classes, with meningioma F1 improving from 0.83 to 0.93.",

      proj6_title: "Speech Emotion Recognition",
      proj6_period: "2024 - 2025",
      proj6_description:
        "Speech emotion classification using Mel spectrograms, ResNet-50 embeddings, and diffusion augmentation.",
      proj6_highlight_0: "Trained on EmoDB and RAVDESS, augmented with diffusion-generated spectrograms.",
      proj6_highlight_1: "Benchmarked Logistic Regression, Random Forest, and MLP classifiers.",
      proj6_highlight_2: "Random Forest reached 98.50% test accuracy.",
      proj6_highlight_3: "Random Forest reached 98.26% ± 1.91% cross-validated accuracy; MLP achieved 97.10% test accuracy.",

      proj7_title: "Churn Prediction & Retention Strategy",
      proj7_period: "2024 - 2025",
      proj7_description:
        "End-to-end machine-learning pipeline for telecom churn prediction and analysis.",
      proj7_highlight_0: "Analyzed 2,666 customers with SMOTE+ENN balancing; benchmarked Logistic Regression, SVC, Gradient Boosting, XGBoost, AdaBoost, and a neural network.",
      proj7_highlight_1: "Gradient Boosting reached 99.01% accuracy and AUC 1.00 on a 912-customer test set.",
      proj7_highlight_2: "Used SHAP to explain churn drivers and K-Means to identify three customer clusters.",
      proj7_highlight_3: "MLOps workflow tracks experiments, parameters, and metrics in MLflow and registers the model; includes FastAPI (/predict, /metrics), Flask UI, and Makefile automation.",

    // Contact
    contactTitle: "Get In Touch",
    contactDescription: "Get in touch to discuss my projects, experience, or future opportunities.",
    sendMessage: "Send Message",
    stayInTouch: "Stay in touch",
    contactIntro: "Feel free to get in touch to discuss my projects, experience, or future opportunities.",
    email: "houssameddine.benkheder@esprit.tn",
    phone: "+216 26 684 385",

    // Footer
    builtBy: "Designed and built by Houssam Eddine Ben Kheder",
    copyright: "© 2026 Houssam Eddine Ben Kheder. All rights reserved.",
    builtWith: "Designed and built with",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    const langMap = translations[language]
    if (!langMap) return key
    return langMap[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
