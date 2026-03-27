# Portfolio — Alexandre Roy

## Overview

Portfolio personnel one-page stylisé comme un éditeur de code / file explorer. Simple, élégant, noir & blanc. Animation d'intro: un MacBook qui s'ouvre au scroll, puis zoom dans l'écran pour révéler le site.

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

## Intro Animation

Animation scroll-driven au chargement de la page, avant le contenu du site:

1. **Bird's eye view** — MacBook fermé vu d'en haut, centré sur fond noir
2. **Scroll → ouverture** — le lid s'ouvre progressivement, le MacBook pivote pour faire face à l'utilisateur
3. **Zoom dans l'écran** — on zoom dans l'écran du MacBook qui contient déjà l'interface file explorer
4. **Transition seamless** — l'écran du MacBook devient le site à 100% du viewport, l'animation est terminée

L'animation doit être fluide et réaliste. Utiliser CSS 3D transforms avec `perspective`, `rotateX`, `transform-origin`. Le MacBook doit être un rendu CSS fidèle (pas d'image). L'intérieur de l'écran contient déjà le vrai contenu du site (titlebar, sidebar, tabs, etc.) visible pendant le zoom.

Techniquement:
- Section sticky avec `height: ~400vh` pour le scroll space
- `requestAnimationFrame` ou scroll listener optimisé
- Easing curves pour des transitions naturelles
- Une fois l'animation terminée, le scroll continue normalement dans le contenu du site

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
    MacbookIntro.tsx      # Animation d'ouverture du MacBook (scroll-driven)
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
