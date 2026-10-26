# Chapitres

Le dÃ©pÃ´t conserve le commit initial et importe ensuite le projet fourni. Chaque chapitre complÃ©tÃ© possÃ¨de son propre commit avec sa date rÃ©elle.

## Chapitres 1â€“2 : composants, Signals et communication
- Exemples de binding et compteur dans Home ; set, update, computed et effect.
- Carte rÃ©utilisable avec input requis et output consommÃ© par la liste.
- @if, @for/@empty, @switch, ngClass/ngStyle et pipes date/currency/uppercase.
- DÃ©tail rÃ©actif Ã  lâ€™identifiant et affichage si lâ€™Ã©lÃ©ment est absent.

## Chapitre 3 : services et injection
- Modèle Conference typé, service singleton fourni à la racine et consommation par inject().
- État partagé exposé en lecture seule, compteur computed et mutations immuables.
- Création, modification, suppression et vérification du nombre de places.
- Les périmètres root/route/composant sont des alternatives ; le service partagé utilise root.

## Chapitre 4 : routage et lazy loading
- Routes autonomes chargées par loadComponent et section chargée par loadChildren.
- Layout parent et outlet enfant, redirections historiques /list et /details/:id, wildcard.
- Paramètre id via input, recherche via query parameter et withComponentInputBinding.
- Resolver et RouterLinkActive ; test de navigation avec RouterTestingHarness.

## Formulaires réactifs (support fourni aussi nommé cours 3)
- Création et modification, FormBuilder nonNullable, FormControl et FormGroup imbriqué.
- Required, minLength, min, pattern et validateur personnalisé nonBlank.
- Erreurs après interaction, soumission invalide bloquée, reset/getRawValue.
- valueChanges/statusChanges convertis avec toSignal et valeurs dérivées avec computed.

## Chapitre 6 : HttpClient et Signals
- provideHttpClient, URL dans environment, backend json-server 0.17.4 et db.json.
- GET liste/détail et HttpParams ; POST, PUT, PATCH et DELETE typés.
- Service à état avec Signals en lecture seule, computed, chargement, erreurs, annulation de lecture et blocage des doubles écritures.
- Mise à jour de l’état après succès ; erreurs réseau/404/serveur visibles, réessai et formulaires conservés après échec.
- Resolver HTTP pour détails/modification, abonnements de mutation nettoyés à la destruction.
- Le service à état est l’approche B du cours ; toSignal est déjà utilisé pour les formulaires. httpResource est une alternative de lecture, pas une obligation à cumuler pour la même requête.
