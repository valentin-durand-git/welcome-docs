---
title: Architecture
sidebar_position: 2
---

# Architecture — Comment le code est organisé

> Cette page explique **comment les dossiers et fichiers sont organisés, et pourquoi**. L'objectif : quand tu ouvres le projet, tu sais immédiatement où chercher.

---

## Le principe : feature-first

Le code est découpé par **fonctionnalité** (feature), pas par type de fichier.

**Ce que ça veut dire concrètement :**

❌ Organisation par type (ce qu'on évite) :
```
lib/
├── screens/         ← tous les écrans mélangés
├── models/          ← tous les modèles mélangés
└── services/        ← tous les services mélangés
```

✅ Organisation par feature (ce qu'on fait) :
```
lib/
├── core/            ← partagé par tout le monde
└── features/
    ├── auth/        ← tout ce qui concerne la connexion
    ├── profile/     ← tout ce qui concerne le profil vélo
    ├── routing/     ← tout ce qui concerne la carte et les itinéraires
    └── tracking/    ← tout ce qui concerne l'enregistrement GPS
```

**Pourquoi :** quand tu travailles sur le profil vélo, tu ouvres `features/profile/` et tout est là. Tu n'as pas besoin de fouiller dans 5 dossiers différents.

---

## Les 3 couches de chaque feature

Chaque feature est elle-même organisée en 3 couches :

```
features/auth/
├── domain/       ← le métier pur
├── data/         ← la communication avec l'extérieur
└── presentation/ ← l'écran et son état
```

### Domain — le métier pur

C'est le cœur de la feature : les objets et les règles métier. **Aucune dépendance externe** — pas de Supabase, pas de Flutter, rien.

Exemple pour l'auth : l'objet `AppUser` (qui représente un utilisateur connecté) et `AuthFailure` (qui représente une erreur de connexion avec un message en français).

**Pourquoi l'isoler :** si demain on change Supabase pour Firebase, le domain ne change pas d'une ligne. C'est stable.

### Data — la communication avec l'extérieur

C'est la couche qui parle à Supabase, à Google, à Mapbox. Elle traduit les réponses des APIs en objets du domain.

Exemple : `SupabaseAuthRepository` appelle `supabase.auth.signInWithPassword()` et retourne soit un `AppUser` soit un `AuthFailure`. L'écran ne sait jamais que Supabase existe.

### Presentation — l'écran et son état

C'est ce que l'utilisateur voit. Composé de :
- L'**écran** (`login_screen.dart`) : uniquement du code d'affichage, zéro logique
- Le **contrôleur** (`auth_controller.dart`) : gère l'état (chargement, erreur, succès) et orchestre les appels

**Règle d'or :** l'écran ne fait jamais d'appel réseau directement. Il dit au contrôleur "l'utilisateur a appuyé sur Se connecter", et le contrôleur s'occupe du reste.

---

## Comment une action traverse les couches

Exemple concret : tu appuies sur "Se connecter" avec ton email.

```
1. LoginScreen        → "l'utilisateur a appuyé, voilà email + mdp"
2. AuthController     → "je lance la connexion, je passe en état chargement"
3. AuthRepository     → "j'appelle Supabase"
4. Supabase           → répond "ok" ou "mot de passe incorrect"
5. AuthRepository     → traduit en AppUser ou AuthFailure
6. AuthController     → met à jour l'état (succès ou erreur)
7. LoginScreen        → se met à jour : affiche l'erreur ou disparaît
8. go_router          → détecte la session ouverte → redirige vers l'accueil
```

Chaque couche a une responsabilité unique. Si quelque chose casse, on sait immédiatement où chercher.

---

## Le dossier `core/`

`core/` contient ce qui est partagé par toutes les features :

| Dossier | Contenu |
|---------|---------|
| `core/config/` | Lecture du `.env` (clés Supabase, Mapbox...) |
| `core/network/` | Le client Supabase (une seule instance pour toute l'app) |
| `core/router/` | go_router : les routes + la garde d'auth |
| `core/theme/` | Les couleurs, les polices, le design system |

---

## Les fichiers `.g.dart` — le code généré

Dans le projet, tu verras des fichiers comme `auth_controller.g.dart`. Le `.g.dart` signifie "généré" — ce fichier est créé automatiquement par un outil (`build_runner`) et **ne doit jamais être modifié à la main**.

Ils existent parce que Riverpod utilise un système d'annotations (`@riverpod`) qui génère du code répétitif automatiquement. Tu modifies `auth_controller.dart`, tu lances `dart run build_runner build`, et le `.g.dart` correspondant est mis à jour.

Ces fichiers sont committés dans Git pour éviter d'avoir à les régénérer à chaque clone.

