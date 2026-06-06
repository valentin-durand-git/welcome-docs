---
id: intro
title: VéloTaf — Introduction
sidebar_position: 1
---

# VéloTaf — C'est quoi, pourquoi, pour qui

## Le projet en une phrase

VéloTaf est une application mobile (iPhone + Android) conçue **exclusivement pour le cycliste qui va au travail à vélo tous les jours**. Pas pour le randonneur du week-end, pas pour le touriste — pour le vélotaffeur quotidien.

## Le différenciateur : un routing qui apprend

La plupart des apps vélo (Waze, Google Maps, Komoot) calculent un itinéraire en fonction de règles fixes. VéloTaf fait différemment : il **apprend tes habitudes**. Avec le temps, il sait que tu préfères les pistes cyclables même si elles rallongent de 5 minutes, que tu évites le boulevard X le matin, que tu roules à 18 km/h.

C'est ça le cœur du produit. Tout le reste (auth, profil, carte) est au service de cette feature.

## Stade actuel

Le projet est en **construction active**. On construit les fondations dans l'ordre logique :

1. ✅ Se connecter (Auth)
2. ✅ Décrire son vélo (Profil vélo)
3. ⏳ Voir une carte et calculer un itinéraire (Routing Mapbox)
4. ⬜ Enregistrer un trajet GPS en arrière-plan
5. ⬜ Consulter son historique de trajets

## Comment lire cette documentation

- Tu veux comprendre **les outils utilisés** → [Stack technique](/velotaf/comprendre/stack)
- Tu veux comprendre **comment le code est organisé** → [Architecture](/velotaf/comprendre/architecture)
- Tu veux comprendre **pourquoi ces choix** → [Décisions](/velotaf/comprendre/decisions)
- Tu veux savoir **où on en est aujourd'hui** → [Infrastructure](/velotaf/infrastructure/supabase)

