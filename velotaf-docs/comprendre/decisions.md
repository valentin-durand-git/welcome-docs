---
title: Pourquoi ces choix
sidebar_position: 3
---

# Pourquoi ces choix — Les décisions et leur contexte

> Chaque décision technique a une raison. Cette page explique **le raisonnement derrière les choix principaux**, en langage accessible. Les détails techniques complets sont dans les ADRs (Architecture Decision Records) du repo velotaf.

---

## Pourquoi Flutter plutôt que React Native ?

**Le contexte :** on avait besoin d'une app iOS + Android avec GPS en arrière-plan et carte en temps réel.

**Le choix :** Flutter.

**Pourquoi :** Flutter est significativement plus performant pour les animations et le rendu carte (60 images/seconde garantis). React Native passe par un "bridge" JavaScript → natif qui introduit des latences — problématique pour une app où la carte doit être fluide. De plus, les plugins GPS background sont plus fiables et mieux maintenus côté Flutter.

**La contrepartie :** Dart est un langage moins répandu que JavaScript. La courbe d'apprentissage est réelle.

---

## Pourquoi Supabase plutôt qu'un backend custom ?

**Le contexte :** fondateur solo, stade MVP. Pas question de passer 3 semaines à construire un backend.

**Le choix :** Supabase.

**Pourquoi :** Supabase donne accès en quelques minutes à une vraie base de données PostgreSQL, un système d'auth complet (email + Google + Apple...), et des APIs automatiques. Pour un MVP, c'est 80% du travail backend fait sans écrire une ligne de code serveur.

**La contrepartie :** on dépend d'un service externe. Si Supabase change ses tarifs ou ferme, il faudra migrer. Ce risque est accepté pour le MVP — la migration vers un backend custom reste possible.

---

## Pourquoi Mapbox plutôt que Google Maps ?

**Le contexte :** le routing adaptatif est le différenciateur de VéloTaf. Il faut pouvoir personnaliser les profils de routing.

**Le choix :** Mapbox.

**Pourquoi :** Google Maps ne permet pas de créer des profils de routing personnalisés. On ne peut pas dire "préfère les pistes cyclables, évite les routes à forte circulation, adapte-toi à la vitesse de cet utilisateur". Mapbox le permet via son API de custom profiles. C'est non-négociable pour le produit.

**La contrepartie :** clé API à gérer, coût à surveiller au-delà de 100 000 requêtes/mois.

---

## Pourquoi Riverpod plutôt que BLoC ou GetX ?

**Le contexte :** gestion d'état dans une app avec données temps réel (GPS, Supabase Realtime).

**Le choix :** Riverpod.

**Pourquoi :**
- **BLoC** : excellent mais très verbeux. Pour chaque fonctionnalité, il faut écrire 3-4 fichiers (Events, States, Bloc, BlocBuilder...). Over-engineering pour un MVP solo.
- **GetX** : simple mais trop "magique" — il cache ce qui se passe vraiment, ce qui rend les bugs difficiles à trouver et le code difficile à comprendre.
- **Riverpod** : le juste milieu. Compile-safe (les erreurs apparaissent à la compilation, pas au runtime), async natif (parfait pour Supabase), testable facilement.

---

## Pourquoi ne pas avoir de `setState()` ?

`setState()` est le mécanisme natif Flutter pour mettre à jour l'écran. Pour les très petits projets, ça suffit. Mais dès qu'on a plusieurs écrans qui partagent des données (par exemple, l'état de connexion qui affecte tous les écrans), `setState()` devient incontrôlable.

On interdit `setState()` pour forcer une discipline : **toutes les données qui changent passent par Riverpod**. Ça garantit qu'on sait toujours où une donnée est définie et qui l'observe.

---

## Pourquoi deux stacks cartographiques ?

On utilise à la fois `flutter_map` (avec tuiles OpenStreetMap, gratuit) ET `mapbox_maps_flutter` (payant).

**Pourquoi les deux :**
- `flutter_map` sert pour tout ce qui ne nécessite pas de routing personnalisé — afficher une position, une carte simple. Zéro coût, zéro clé.
- `mapbox_maps_flutter` est réservé au routing adaptatif, le cœur du produit. Garder flutter_map en parallèle offre un fallback gratuit si Mapbox a un problème.

---

## Pourquoi les secrets ne sont jamais dans le code ?

Les clés API (Supabase, Mapbox, Google) sont stockées dans un fichier `.env` qui n'est **jamais committé sur GitHub**. Si ces clés se retrouvaient dans le repo (même une seconde), elles seraient considérées comme compromises — GitHub scanne automatiquement les repos publics, et des robots font de même sur les repos privés.

La règle : `.env` gitignoré, `.env.example` committé (sans valeurs). Sur un nouveau poste, on recrée le `.env` manuellement.

