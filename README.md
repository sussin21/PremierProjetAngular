# angluarwork

Application Angular de gestion de conférences.

## Installation

```sh
npm ci
```

## Lancement

Dans un premier terminal :

```sh
npm run api
```

Dans un deuxième terminal :

```sh
npm start
```

Application : http://localhost:4200

API : http://localhost:3000/conferences

Les données sont enregistrées dans `db.json`. L'URL de l'API est définie dans `src/environments/environment.ts`.

## Fonctionnalités

- Liste et recherche de conférences.
- Consultation des détails.
- Ajout et modification avec validation du formulaire.
- Suppression et réservation de places.

## Vérification

```sh
npm run build
npm test -- --watch=false
```
