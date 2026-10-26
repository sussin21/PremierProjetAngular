# angluarwork

Application Angular 21 de gestion de conférences, complétée chapitre par chapitre à partir du projet fourni. Consulter [CHAPTERS.md](CHAPTERS.md) pour retrouver les notions et leurs commits.

## Lancer

Node.js 22.12+ ou 24 et npm sont nécessaires.

```sh
npm ci
npm run api
```

Dans un deuxième terminal :

```sh
npm start
```

Ouvrir http://localhost:4200. L’API tourne sur http://localhost:3000/conferences et conserve les modifications dans `db.json`. La version json-server 0.17.4 correspond au support de cours et utilise des identifiants numériques. Il s’agit d’un backend local de TP.

## Parcours

- `/home` : exemples des bindings, Signals, computed et effect.
- `/conferences/list` : cartes, recherche (`?search=Angular`), sélection enfant/parent, réservation et suppression.
- `/conferences/new` : formulaire de création avec validation.
- `/conferences/details/1` et `/conferences/edit/1` : détails et modification, données résolues avant activation.
- `/list` et `/details/1` restent utilisables via redirection.

Les conférences adaptent le modèle EventM du chapitre HTTP : name correspond à title et place à location ; description, date, price et nbPlaces sont conservés. L’URL configurable se trouve dans `src/environments/environment.ts`. Les appels HttpClient restent dans le service, les templates lisent des Signals. Les écritures mettent à jour l’état local après succès uniquement. Arrêter l’API permet de vérifier les messages d’erreur et la reprise via Réessayer.

## Vérifier

```sh
npm run build
npm test -- --watch=false
```

Les tests HTTP emploient HttpTestingController ; aucune API réelle n’est nécessaire pour les tests unitaires. Pour le TP, vérifier aussi GET/POST/PUT/PATCH/DELETE dans l’onglet Réseau du navigateur. Le build produit plusieurs chunks pour les routes chargées à la demande.
