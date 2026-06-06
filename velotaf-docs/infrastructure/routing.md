---
title: Routing Mapbox
sidebar_position: 3
---

# Routing Mapbox — Ce qui a été construit

> Priorité MVP n°3 — la feature cœur de VéloTaf. Construite le 2026-06-06.

## Ce que fait cette feature

Elle permet d'afficher une carte et de calculer un itinéraire vélo entre deux points. C'est le début du routing adaptatif qui est le différenciateur de VéloTaf.

**État actuel :**
- ✅ Carte OpenStreetMap affichée (gratuite, sans clé)
- ✅ Calcul d'itinéraire via Mapbox Directions API (code prêt, clé à configurer)
- ✅ Affichage du tracé sur la carte
- ✅ Bandeau résumé (distance + durée estimée)
- ⚠️ Points de départ/arrivée fixes pour l'instant (Gare de Lyon → Bastille) — le GPS réel viendra avec la priorité n°4

---

## Comment c'est organisé

```
features/routing/
├── domain/
│   ├── route_waypoint.dart   ← un point GPS (lat, lon, label optionnel)
│   ├── bike_route.dart       ← un itinéraire calculé (tracé + distance + durée)
│   └── route_failure.dart    ← les erreurs possibles (typées, en français)
├── data/
│   ├── routing_repository.dart          ← l'interface (le contrat)
│   └── mapbox_routing_repository.dart   ← l'implémentation (appel Mapbox)
└── presentation/
    ├── routing_providers.dart   ← providers Riverpod (état de la carte)
    └── map_screen.dart          ← l'écran carte
```

Le même principe que pour l'auth et le profil : **domaine → data → présentation**, avec une interface pour rendre le code testable.

---

## Pourquoi deux outils pour la carte ?

On utilise **deux outils distincts** :

| Outil | Rôle |
|-------|------|
| `flutter_map` + OpenStreetMap | **Afficher** la carte — gratuit, sans clé |
| Mapbox Directions API | **Calculer** l'itinéraire — nécessite une clé |

C'est intentionnel : l'affichage de la carte fonctionne tout de suite, même sans clé Mapbox. Le calcul d'itinéraire s'active dès que la clé est configurée. L'app ne crashe jamais — elle affiche un message d'erreur clair si la clé manque.

---

## Activer le calcul d'itinéraire

La carte s'affiche sans clé. Pour que le bouton **"Calculer"** fonctionne :

1. Créer un compte sur https://account.mapbox.com (gratuit jusqu'à 100k requêtes/mois)
2. Copier le **token public** (commence par `pk.`)
3. L'ajouter dans `.env` :
   ```
   MAPBOX_PUBLIC_TOKEN=pk.eyJ1...
   ```
4. Relancer l'app — le calcul fonctionne

---

## Ce qui se passe quand tu appuies sur "Calculer"

```
1. MapScreen          → "l'utilisateur a appuyé"
2. RouteNotifier      → "je lance le calcul, état = chargement"
3. RoutingRepository  → "j'appelle l'API Mapbox Directions"
4. Mapbox API         → répond avec le tracé GeoJSON
5. Repository         → traduit en BikeRoute (liste de points GPS + distance + durée)
6. RouteNotifier      → met à jour l'état avec le BikeRoute
7. MapScreen          → affiche le tracé sur la carte + le bandeau résumé
```

Si la clé est absente ou invalide, l'étape 3 retourne immédiatement une erreur `RouteFailureInvalidToken` — aucun appel réseau, aucun crash.

---

## Décision d'architecture (ADR-007)

Le choix d'utiliser un appel HTTP simple plutôt que le SDK natif Mapbox est documenté dans [ADR-007](https://github.com/valentin-durand-git/velotaf/blob/main/docs/decisions/ADR-007-routing-feature.md). En résumé : le SDK natif est lourd et nécessite une config native complexe ; un appel HTTP suffit pour le MVP et reste testable sans émulateur.

