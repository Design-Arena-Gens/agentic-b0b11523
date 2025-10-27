# Boutik Express

Boutik Express aide les petits commerçants africains (boutiques de quartier, coiffeurs, couturiers, artisans, réparateurs, vendeurs de marché) à créer une vitrine en ligne en quelques minutes et à recevoir des commandes via WhatsApp.

## Fonctionnalités clés

- Authentification email/mot de passe + Google (Firebase Auth)
- Tableau de bord commerçant avec statistiques (vues, contacts WhatsApp)
- Gestion des produits (ajout, modification, suppression, catégories, upload image Firebase Storage)
- Limitation automatique à 10 produits pour le plan gratuit et page de mise à niveau
- Page publique de boutique (`/store/[slug]`) avec bouton WhatsApp ou SMS
- Génération automatique d'un slug unique pour chaque boutique
- Page paramètres (profil, description, numéro WhatsApp, slug personnalisable)
- Page admin (optionnelle) pour désactiver/réactiver les boutiques
- Design responsive mobile-first, palettes bleu/blanc/gris

## Prérequis

- Node.js 18+
- Compte Firebase avec Firestore, Auth et Storage activés

## Configuration

1. Dupliquez `.env.local.example` vers `.env.local` et remplissez les variables Firebase :

```bash
cp .env.local.example .env.local
```

2. Dans Firebase, activez l'authentification email/mot de passe et Google.
3. Créez dans Firestore les collections `users`, `products`, `storeStats` (elles se créeront automatiquement aux premières écritures).

## Installation et lancement

```bash
npm install
npm run dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

## Déploiement

Cette application est prête pour un déploiement sur Vercel. Configurez les variables d'environnement de production (Firebase + `NEXT_PUBLIC_SITE_URL`) avant d'exécuter :

```bash
npm run build
npm start
```

Ou utilisez la commande Vercel fournie par le workflow.

## Structure de la base de données

### users
- `name`, `email`, `phoneNumber`
- `businessName`, `businessDescription`
- `storeSlug`, `whatsappNumber`, `plan` (`free` | `premium`)
- `photoURL`, `createdAt`, `isDisabled`

### products
- `ownerId`, `name`, `description`, `price`, `imageURL`, `category`
- `isArchived`, `createdAt`, `updatedAt`

### storeStats
- `storeId`, `viewsCount`, `ordersCount`
- `lastVisitDate`, `updatedAt`

## Données de démonstration

Quelques profils à créer pour tester :
- **Chez Aïcha** — Perruques et soins capillaires
- **Couture Bella** — Vêtements sur mesure
- **TechPhone** — Accessoires et réparation téléphones
- **Snack Délice** — Plats locaux et jus naturels

## Prochaines évolutions (préparées)

- Intégration des paiements mobile money (Orange Money, MTN, MoMo)
- Génération automatique de flyers produits
- Notifications push lors des nouvelles commandes
- Interface multilingue (FR/EN)
- Optimisations SEO sur les pages boutiques publiques

