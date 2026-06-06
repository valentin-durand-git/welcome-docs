---
title: La stack technique
sidebar_position: 1
---

# La stack technique — chaque outil expliqué

> Avant de lire le code, il faut comprendre les outils. Cette page explique **ce que fait chaque outil, pourquoi on l'a choisi, et ce qu'il nous apporte concrètement**.

---

## Flutter — le framework de l'app

**Ce que c'est :** Flutter est un outil créé par Google qui permet de créer une application mobile en écrivant le code **une seule fois** et de la faire tourner à la fois sur iPhone (iOS) et Android.

**Sans Flutter :** il faudrait écrire deux applications séparées — une en Swift pour iOS, une en Kotlin pour Android. Double le travail, double la maintenance.

**Pourquoi Flutter spécifiquement :** Flutter est particulièrement performant pour les apps avec carte et GPS en temps réel. Il affiche les animations à 60 images/seconde, ce qui est essentiel pour une carte fluide.

**Le langage utilisé :** Dart. C'est le langage de Flutter, créé par Google. Syntaxe proche du JavaScript/Java, relativement simple à prendre en main.

---

## Supabase — le backend "tout en un"

**Ce que c'est :** Supabase est un service qui remplace ce qu'il aurait fallu construire soi-même : une base de données, un système de connexion utilisateur, un système de fichiers, et des APIs. Tout ça sans écrire une ligne de code serveur.

**Sans Supabase :** il faudrait gérer un serveur (Node.js, Python...), une base de données (PostgreSQL, MySQL...), un système d'auth (JWT, sessions...), le tout hébergé quelque part. C'est des semaines de travail.

**Avec Supabase :** on configure tout depuis une console web et on appelle des fonctions depuis l'app Flutter. Supabase gère le reste.

**Ce qu'on utilise :** 
- La **base de données** (PostgreSQL) pour stocker les profils, les trajets
- L'**authentification** pour la connexion email et Google
- La **sécurité RLS** (voir ci-dessous)

### C'est quoi la RLS ?

RLS = *Row Level Security* = Sécurité au niveau des lignes. C'est une règle qu'on pose dans la base de données qui dit : **chaque utilisateur ne peut voir et modifier que ses propres données**.

Concrètement : quand tu te connectes à VéloTaf, tu ne peux pas voir le profil vélo d'un autre utilisateur. Même si quelqu'un essaie de bricoler les requêtes, la base de données refuse. Cette règle est appliquée automatiquement côté serveur — pas besoin d'y penser dans le code Flutter.

---

## Mapbox — la carte et le routing

**Ce que c'est :** Mapbox est un service de cartographie (comme Google Maps, mais plus flexible). Il fournit les tuiles de carte (les images qui s'affichent) et surtout une **API de calcul d'itinéraire**.

**Pourquoi pas Google Maps :** Google Maps ne permet pas de personnaliser les profils de routing. On ne peut pas dire "calcule un itinéraire en favorisant les pistes cyclables et en évitant les routes à forte circulation". Mapbox le permet — c'est indispensable pour le différenciateur de VéloTaf.

**Ce qu'on utilise :**
- Les **tuiles OSM** (OpenStreetMap) pour afficher la carte — gratuit, pas de clé requise
- L'**API Directions Mapbox** pour calculer les itinéraires avec des préférences vélo personnalisées

---

## Riverpod — la gestion d'état

**Ce que c'est :** Dans une app mobile, l'*état* c'est toutes les données qui changent : est-ce que l'utilisateur est connecté ? Quel est son profil ? Sa position GPS actuelle ?

Riverpod est la solution choisie pour **gérer cet état de façon fiable et testable**.

**Sans Riverpod :** on utiliserait `setState()` natif Flutter — simple pour les petits projets, mais ça devient vite ingérable quand plusieurs écrans ont besoin des mêmes données.

**Ce que Riverpod apporte :**
- Un seul endroit pour chaque donnée (pas de doublon)
- Les écrans se mettent à jour automatiquement quand une donnée change
- Facile à tester (on peut remplacer les vraies données par des fausses en test)

**La règle qu'on suit :** tous les widgets (écrans) sont des `ConsumerWidget` — c'est le type de widget Riverpod qui peut "observer" des données et se reconstruire automatiquement. Jamais de `StatefulWidget` ni de `setState()`.

---

## go_router — la navigation

**Ce que c'est :** go_router gère les transitions entre les écrans (login → accueil → profil...) et surtout la **garde d'authentification** : si tu n'es pas connecté, tu es automatiquement redirigé vers l'écran de connexion, peu importe où tu essaies d'aller.

---

## flutter_background_geolocation — le GPS

**Ce que c'est :** Un plugin qui permet de **continuer à enregistrer la position GPS même quand l'app est en arrière-plan** (téléphone verrouillé, autre app ouverte). C'est indispensable pour enregistrer un trajet complet.

**Particularité :** ce plugin est payant pour les builds Android en production (gratuit en développement et sur iOS). C'est un coût à prévoir pour la mise en production.

---

## En résumé

| Outil | Rôle |
|-------|------|
| Flutter | Créer l'app iOS + Android avec un seul code |
| Supabase | Base de données + Auth + Sécurité |
| Mapbox | Carte + Calcul d'itinéraires personnalisés |
| Riverpod | Gérer les données qui changent dans l'app |
| go_router | Navigation entre écrans + garde d'auth |
| flutter_background_geolocation | GPS en arrière-plan |

