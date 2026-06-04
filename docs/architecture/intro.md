---
title: Setup Docusaurus
description: Comment mettre en place Docusaurus avec GitHub Pages et déploiement automatique
tags: [docusaurus, github, ci-cd, documentation]
last_updated: 2026-06-04
author: valentin
---

# Setup Docusaurus + GitHub Pages

## Stack utilisée

- **Docusaurus v3** — générateur de site de documentation
- **GitHub** — source de vérité (versioning)
- **GitHub Actions** — déploiement automatique à chaque push
- **GitHub Pages** — hébergement gratuit

## Prérequis

- Node.js >= 20
- npm
- GitHub CLI (`gh`)

## Installation

```bash
npx create-docusaurus@latest welcome-docs classic
cd welcome-docs
npm run start # vérifier en local sur http://localhost:3000
```

## Configuration

Modifier `docusaurus.config.js` :

```js
url: 'https://TON_USERNAME.github.io',
baseUrl: '/NOM_DU_REPO/',
organizationName: 'TON_USERNAME',
projectName: 'NOM_DU_REPO',
deploymentBranch: 'gh-pages',
```

## Déploiement automatique

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy Docusaurus

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## Activer GitHub Pages

1. Aller sur `github.com/TON_USERNAME/NOM_DU_REPO/settings/pages`
2. Source → **Deploy from a branch**
3. Branche → **gh-pages** → dossier **/ (root)**
4. Sauvegarder

## Conventions Markdown

Chaque fichier doit avoir un frontmatter YAML :

```markdown
---
title: Titre de la page
description: Résumé en une ligne
tags: [tag1, tag2]
last_updated: YYYY-MM-DD
author: prenom
---
```

## Structure des dossiers

```
docs/
├── architecture/   # Stack technique, choix d'archi
├── apis/           # Documentation des APIs
├── workflows/      # Process et automatisations
├── onboarding/     # Guide pour les nouveaux devs
└── decisions/      # ADRs (Architecture Decision Records)
```