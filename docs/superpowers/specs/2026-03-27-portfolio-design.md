# Portfolio — Alexandre Roy

## Overview

Portfolio personnel one-page stylisé comme un éditeur de code / file explorer. Simple, élégant, noir & blanc.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **next-intl** pour i18n (FR/EN)
- **next-themes** pour dark/light mode
- Déploiement: Vercel

## Design

### Concept visuel

Le site entier ressemble à une fenêtre d'éditeur de code (style VS Code):

- **Titlebar** — dots macOS (rouge/jaune/vert), titre "alexandre-roy — ~/portfolio", toggle langue FR/EN, toggle theme (lune/soleil)
- **Sidebar gauche** — file tree avec les sections comme fichiers:
  - `~/alexandre-roy/`
    - `README.md` (hero + intro)
    - `about.md` (à propos)
    - `projects/` (dossier avec les projets)
    - `experience.md` (parcours)
    - `contact.json` (contact)
    - `cv.pdf` (téléchargement)
- **Tabs** — onglets comme dans un éditeur, tab active = section visible
- **Zone de contenu** — contenu avec numéros de ligne à gauche, styled comme du Markdown/code
- **Status bar** — branche git, encoding, type de fichier, copyright

### Palette

- **Dark mode** (défaut): fond #050505/#0e0e0e, texte #d4d4d4, bordures #1a1a1a
- **Light mode**: fond #fafafa/#fff, texte #333, bordures #e5e5e5
- **Aucune couleur d'accent** — noir et blanc pur uniquement
- Syntax highlighting subtil: commentaires gris, strings vert doux, propriétés bleu doux (style éditeur classique)

### Typographie

- Font monospace: `SF Mono`, `Fira Code`, `Cascadia Code`, `Consolas` (fallback)
- Taille de base: 13px

## Sections

### 1. README.md (Hero + Intro)

Contenu affiché comme un fichier Markdown:
- `# Alexandre Roy`
- `## Développeur · Québec`
- Paragraphe de bio courte

### 2. Projects/ (Projets)

Sous-section dans le README ou accessible via le file tree:
- Grille 2x2 de cartes de projet
- Chaque carte = un "fichier" (projet-01.md, etc.)
- Affiche: nom, description courte, tags de technos
- Cliquable (ouvre un détail ou lien externe)

### 3. Experience.md (Expérience)

Timeline verticale avec barre gauche:
- Rôle, entreprise, dates, description courte
- Basé sur le CV existant (DDLC, Camp Kéno, Qualité Étudiants, IGA)

### 4. Contact.json (Contact)

Format clé-valeur style JSON:
- email, linkedin, github
- Bouton de téléchargement CV

### Status bar

- Branche git (main)
- Encoding (UTF-8)
- Type fichier (Markdown)
- Copyright

## Structure

### Navigation

- **One-page scroll** — le contenu défile dans la zone principale
- **Sidebar cliquable** — cliquer sur un fichier scroll vers la section correspondante
- **Tabs** — reflètent la section active pendant le scroll
- **Responsive** — sur mobile, la sidebar se collapse en menu hamburger

### i18n

- Routing: `/fr` et `/en`
- Toggle dans la titlebar
- Contenu dans `messages/fr.json` et `messages/en.json`

### Dark/Light mode

- Toggle dans la titlebar (icône lune/soleil)
- Persiste en localStorage via `next-themes`
- Dark mode par défaut

## Structure de fichiers

```
src/
  app/
    [locale]/
      layout.tsx          # Layout principal avec providers
      page.tsx            # Page one-page
  components/
    Window.tsx            # Container fenêtre (titlebar + layout)
    Titlebar.tsx          # Barre de titre avec dots, toggle langue/theme
    Sidebar.tsx           # File tree navigation
    Tabs.tsx              # Onglets
    StatusBar.tsx         # Barre de statut
    sections/
      Hero.tsx            # README.md content
      Projects.tsx        # Grille de projets
      Experience.tsx      # Timeline
      Contact.tsx         # Clé-valeur contact
  i18n/
    request.ts
    routing.ts
messages/
  fr.json
  en.json
public/
  cv.pdf
```
