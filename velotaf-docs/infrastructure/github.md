---
title: GitHub — workflow multi-postes
sidebar_position: 2
---

# GitHub — Le workflow multi-postes

## Pourquoi GitHub ?

Le code source est hébergé sur GitHub pour deux raisons :

1. **Sauvegarde** : si ton Mac tombe en panne, le code est intact sur GitHub. Rien n'est perdu.
2. **Multi-postes** : tu peux travailler sur n'importe quelle machine et retrouver exactement le même état du projet.

Le repo est **privé** — personne ne peut le voir sauf toi.

---

## La règle d'or

**GitHub est la source de vérité.** Jamais iCloud, jamais Dropbox, jamais un dossier partagé. Ces solutions corrompent silencieusement les fichiers Git et les dépendances Flutter — tu te retrouves avec un projet cassé sans savoir pourquoi.

---

## Le workflow quotidien

### Avant de quitter un poste

```bash
git add -A                          # prendre en compte tous les fichiers modifiés
git commit -m "feat: ce que j'ai fait"  # sauvegarder avec un message
git push                            # envoyer sur GitHub
```

### En arrivant sur un autre poste

```bash
git pull                            # récupérer les derniers changements
```

Puis lire `docs/STATUS.md` pour se remettre dans le contexte.

---

## Les messages de commit — convention

On suit les *Conventional Commits* : le message commence par un type qui indique la nature du changement.

| Préfixe | Quand l'utiliser |
|---------|-------------------|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `docs:` | Modification de documentation uniquement |
| `chore:` | Maintenance (dépendances, config...) |
| `refactor:` | Réécriture de code sans changer le comportement |

Exemples : `feat: écran profil vélo`, `fix: crash au démarrage sans .env`, `docs: mise à jour STATUS.md`

**Pourquoi cette convention :** l'historique Git devient lisible d'un coup d'œil. Dans 6 mois, tu peux retrouver exactement quand et pourquoi quelque chose a été ajouté.

---

## Préparer un nouveau poste

1. **Installer `gh` CLI** (outil GitHub en ligne de commande) :
   ```bash
   brew install gh
   gh auth login   # s'authentifier, un code s'affiche dans le terminal
   ```

2. **Installer Flutter** :
   ```bash
   git clone --depth 1 -b stable https://github.com/flutter/flutter.git ~/development/flutter
   echo 'export PATH="$HOME/development/flutter/bin:$PATH"' >> ~/.zshrc
   # Rouvrir le terminal, puis :
   flutter doctor
   ```

3. **Cloner le projet** :
   ```bash
   gh repo clone valentin-durand-git/velotaf ~/vélotaff
   cd ~/vélotaff
   ```

4. **Recréer le `.env`** (jamais dans Git, à refaire sur chaque poste) :
   ```bash
   cp .env.example .env
   # Ouvrir .env et renseigner SUPABASE_URL et SUPABASE_ANON_KEY
   # (valeurs disponibles dans la console Supabase)
   ```

5. **Récupérer les dépendances** :
   ```bash
   flutter pub get
   ```

6. **Vérifier** :
   ```bash
   flutter analyze   # doit afficher "No issues found!"
   flutter test      # doit afficher "All tests passed!"
   ```

---

## Pourquoi le `.env` n'est pas dans Git ?

Le `.env` contient des clés secrètes (Supabase, Mapbox...). Si ces clés se retrouvent sur GitHub — même dans un repo privé, même une seconde — elles sont considérées comme compromises. Des robots scannent GitHub en permanence à la recherche de clés.

Le `.env.example` (committé) documente quelles clés sont nécessaires, sans en révéler les valeurs. C'est le modèle à copier sur chaque nouveau poste.

