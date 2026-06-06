---
title: Supabase — ce qui est en place
sidebar_position: 1
---

# Supabase — Ce qui est en place et pourquoi

## Résumé rapide

| Quoi | Valeur |
|------|--------|
| Nom du projet | `velotaf` |
| Région | Paris (`eu-west-3`) |
| Statut | Actif — free tier |
| Dashboard | https://supabase.com/dashboard/project/whxqfndtxhrghtyhcony |

---

## Pourquoi Paris ?

Deux raisons :
1. **RGPD** : héberger les données en Europe est une obligation légale pour une app française. Les données des utilisateurs (email, trajets GPS...) ne doivent pas transiter hors UE sans consentement explicite.
2. **Latence** : un serveur proche des utilisateurs = des réponses plus rapides dans l'app.

---

## Ce qui est créé en base

### Table `bike_profiles`

C'est la table qui stocke le profil vélo de chaque utilisateur. Elle a été créée le 2026-06-05.

**Structure :**

| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| `user_id` | UUID | ✅ | Identifiant de l'utilisateur (lié à auth.users) |
| `type` | text | ✅ | Type de vélo : ville, route, vtt, gravel, cargo, pliant |
| `is_electric` | boolean | ✅ | Vélo électrique ? |
| `battery_range_km` | integer | Non | Autonomie de la batterie (si électrique) |
| `avg_speed_kmh` | numeric | Non | Vitesse moyenne habituelle |
| `nickname` | text | Non | Surnom du vélo |
| `created_at` | timestamp | ✅ | Date de création |
| `updated_at` | timestamp | ✅ | Date de dernière modification (mis à jour automatiquement) |

**Pourquoi un vélo par utilisateur (et pas plusieurs) :** c'est une décision MVP consciente. La majorité des vélotaffeurs ont un seul vélo. Ajouter la gestion multi-vélos maintenant ajouterait de la complexité (sélection, écrans...) sans valeur immédiate. On migrerait facilement si le besoin se confirme.

**Pourquoi `updated_at` est géré automatiquement :** un "trigger" PostgreSQL met à jour ce champ à chaque modification. Ça garantit que la valeur est toujours correcte, indépendamment de ce que fait l'app Flutter. On ne peut pas oublier de le mettre à jour.

### La sécurité RLS en pratique

Quatre règles sont posées sur `bike_profiles` :
- **SELECT** : tu ne peux lire que ton propre profil
- **INSERT** : tu ne peux créer que ton propre profil
- **UPDATE** : tu ne peux modifier que ton propre profil
- **DELETE** : tu ne peux supprimer que ton propre profil

`auth.uid()` est la fonction Supabase qui retourne l'identifiant de l'utilisateur actuellement connecté. Chaque règle vérifie que cet identifiant correspond au `user_id` de la ligne demandée.

---

## Ce qui reste à faire dans Supabase

### Activer l'auth email ⚠️

Dans la console Supabase → Authentication → Providers → Email :
- Activer le provider
- **Désactiver "Confirm email"** en développement — sinon chaque inscription envoie un email de confirmation, ce qui rend les tests sur simulateur fastidieux
- Réactiver avant la mise en production

### Google OAuth (plus tard)

Nécessite de créer des credentials dans Google Cloud Console. Non bloquant pour les premiers tests — l'auth email suffit.

---

## Comment les clés arrivent dans l'app

L'app Flutter lit le fichier `.env` au démarrage via `flutter_dotenv`. Ce fichier contient :

```
SUPABASE_URL=https://whxqfndtxhrghtyhcony.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

La `SUPABASE_ANON_KEY` est une **clé publique** — elle peut être vue dans l'app compilée, c'est normal. Ce qu'elle permet : accéder aux données *selon les règles RLS*. Sans être connecté, tu ne peux rien faire. La vraie sécurité est dans les règles RLS côté base de données.

Ce fichier `.env` n'est jamais dans Git. Sur un nouveau poste, il faut le recréer manuellement (les valeurs sont dans la console Supabase).

