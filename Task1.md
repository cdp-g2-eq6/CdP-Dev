## Tâches du sprint 1

- Coût (echelle de comparaison): 1, 2, 3, 5, 8, 13, 21
- Importance: maximale (doit être fait en priorité), normale, minimale (pourra être réalisée quand on aura le temps)

### US 37

Architecture (pour y voir mieux que dans le tableau):

```
root/
    client/
        src/
            assets/
                style/
                images/
                fonts/
            components/ # Nos composants vue
            services/ # Communication avec l'API back-end
            views/ # Pages du site
            App.vue # Page d'accueil
            main.js # Point d'entrée pour lancer le site
            router.js #
        .gitignore
        package-lock.json # Généré par node
        package.json # Genéré par node

    server/
        src/
            config/ # configuration de la base de données et des variables d'env
            controller/ # On gère la réponse en fonction des routes
            model/ # Définition de la bd
            routes/ # Définition des routes
            server.js # Point d'entrée du serveur
            config.js # Variables d'environnement (doit être ignoré par git)
        package-lock.json # généré par node
        package.json # genéré par node

    docker/
        Dockerfile
        docket-compose.yml

    README.md
    etc...
```

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 37 | 41 | - | **Créer la structure du projet.** Il doit y avoir (relatif à la racine), ces répertoires et fichiers: *voir au dessus*. Les fichiers sont vides à ce stade. Les fichiers gitignore sont générés à partir du site gitignore.io lien: (https://www.toptal.com/developers/gitignore/api/vscode,node) avec, en plus pour le serveur, la ligne config.js. | 1 |
| 37 | 42 | 41 | **Initialiser node et ses dépendances.** Dans le répertoire `server/src`, executer la commande `npm init` pour créer package.json. Executer ensuite `npm install express` pour installer express. Executer la commande `npm install mongodb` pour installer mongodb. Dans le répertoire `server/client`, executer la commande `npm init` pour créer package.json. Ensuite executer `npm install vue` et `npm install bluefy`. Pour le client et le serveur, executer `npm install jest`, `npm install eslint` et `./node_modules/.bin/eslint --init` (choisir Google pour les conventions). Editer les deux fichiers `package.json` pour ajouter `{ "scripts": { "test": "jest" } }`. | 2 |
| 37 | 43 | 41 | **(Client) Avoir une page d'accueil vide, mais qui fonctionne**. Il faut ajouter une ligne à `client/package.json` pour qu'il reconnaisse la commande `start` de `npm`. Cette commande execute la commande `node src/main.js` qui va lancer le client sur le port `8080`. `main.js` doit charger `App.vue` lorsque `/` est accedé en `GET`. `App.vue` affiche un simple message "Homepage", et n'a pas d'autres fonctionnalités à ce stade. **DOD:** Il est alors possible d'aller (après avoir tapé `npm start`) sur http://localhost:8080/. Cela doit afficher "Homepage" en texte brut. | 3 |
| 37 | 44 | 41 | **(Serveur) Avoir un serveur qui fonctionne**. Il faut ajouter une ligne à `server/package.json` pour qu'il reconnaisse la commande `start` de `npm`. Cette commande execute la commande `node src/server.js` qui va lancer le serveur sur le port `3000`. **DOD:** L'adresse `/api/ping` est accessible et renvoie "pong" lorsqu'elle est accédée avec une requête GET. (Il est possible de tester cela avec l'application postman ou insomnia). | 3 |
| 37 | 45 | 43, 44 | **"Dockeriser" l'application node/express/mongoDB et le serveur peut se connecter à la base mongoDB.** Le `Dockerfile` doit exposer les ports `3000` (serveur) et `8080` (client). Il doit aussi utiliser la dernière version de node et doit installer les dépendance du client ET du serveur et doit lancer ces deux derniers avec `npm start` (dans les bons répertoires). Le répertoire de travail de Dockerfile est celui par défaut soit `/usr/src/app`. Il doit evidemment clone le dépôt git. Le fichier `docker-compose.yml` doit aussi définir un conteneur `server` accessible au port `3000` et qui est lié au conteneur `mongo`. Il doit aussi définir un conteneur mongo qui sera accessible à aprtir du port `27017`. Les données (volume) seront stockées dans le répertoire par défaut définit par mongo, cest-à-dire `./data:/data/db`. Il faut mettre à jour le code de `server.js` pour qu'il effectue (au lancement) une connection à la base de données. Si cela echoue, un message d'erreur doit être envoyé, et la commande `docker-compose up` doit échouer. **DOD**: La commande `docker-compose up` dans `docker/` doit lancer le client, et le serveur. Il doit aussi faire fonctionner la BD. Aucune erreur survient, et le serveur est accessible (la route `api/ping` en `GET` donne "pong") et le site sur `/` affiche "Homepage".  | 8 |
| 37 | 46 | 45 | **Configurer Github Actions pour vérifier le build à chaque push et pull request sur main.** Créer un fichier dans .github/workflows.yml qui executera les tests avec jest, et qui vérifira que les scripts dockers fonctionnent. Ce script devra être executé à chaque push ou pull request sur main. **DOD:** Cela devra fonctionner, et passer au vert. Puisque le build docker est censé fonctionner (tâche 45). | 5 |

### US 2

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 2  | 47 | 43 | **Créer un composant pour la barre de navigation.** Créer un composant `navbar.vue` dans `client/src/components`. Ce composant doit afficher une barre de navigation sur le côté gauche de l'écran. Il est possible de réduire cette barre de navigation en cliquant sur un bouton acordéon. Il est construit en tant que "menu" (https://buefy.org/documentation/menu/) avec `Buefy`. Il doit y avoir un titre "Nom projet", deux simples boutons "Backlog" et "Tâches", et un bouton "Sprint" avec un sous-bouton "Nouveau sprint". Ce dernier sous bouton est affiché lorsque on clique sur "Sprint". Les boutons sont colorés pour montré qu'ils sont selectionnés dans plusieurs cas: `/backlog`: "Backlog" coloré, `/tasks`: "Tâches" coloré. | 5 |
| 2  | 48 | 47 | **Ajouter la barre de navigation à la page principale** Le fichier `client/src/App.vue` charge le composant `client/src/components/navbar.vue`. **DOD** Lorsque l'on accède à http://localhost:8080/, la navbar est correctement affichée.  | 3 |

### US 1

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 1  | 49  | 43  | **Créer un composant pour activer / désactiver le mode edition**. Créer un composant `edit-button.vue` dans `client/src/components`. Le composant doit être construit avec les "checkbox" de Buefy (https://buefy.org/documentation/checkbox). Il ressemble à un bouton, mais qui est actif / non actif en fonction de si l'utilisateur clique dessus ou non (voir "Checkbox Button" de Buefy). Le composant doit avoir une variable accessible qui dit si oui, ou non le mode édition est activé en fonction de l'état du bouton. | 5 |
| 2  | 50 | 47, 49 | **Ajouter le bouton d'édition à la barre de navigation** Le composant `client/src/components/navbar.vue` charge le composant `client/src/components/edit-button.vue`. Le bouton est affichée en bas de la barre de navigation. **DOD** Lorsque l'on accède à http://localhost:8080/, la navbar est correctement affichée avec le bouton d'édition tout en bas de celle-ci. | 3 |

### US 11

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 11 | 51  | 50  | **Mettre à jour la navbar pour agir sur le clic de "Nouveau Sprint"** Modifier `client/src/components/navbar.vue` et ajouter une fonction qui est appelée lorsque l'utilisateur clique sur le bouton "Nouveau Sprint". Cette fonction ajoute un sprint au composant (il faut donc créer une liste de sprints dans le composant). En dessous du bouton "Sprint" est alors affiché les boutons "Sprint x" (avec x le numéro du sprint) et le bouton "Nouveau Sprint" (dans cet ordre). Le bouton "Sprint x" redirige vers `/sprint/x`. | 5 |
| 11 | 52  | 51  | **Mettre à jour App.vue pour prendre en compte la route /sprint/{x}** Modifier `client/src/App.vue` (et peut être `client/src/main.js`) pour prendre en compte la différence entre `/` et `/sprint/x`. Lorsque l'on accède à `/`, la barre de navigation est correctement affichée, et le texte "Homepage" est affiché. Lorsque l'on accède à `/sprint/x`, la barre de navigation est correctement affichée aussi, et le texte "Sprint x" est affiché (avec x le numéro du sprint). Le bouton "Sprint x" de la barre de navigation est coloré pour montré qu'il est selectionné. Il faudra donc potentiellement mettre à jour `client/src/components/navbar.vue` aussi. | ? |

### US 12

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 12 | 53 | 44 | **Créer les routes permettant de gérer les US coté serveur** Créer le fichier `server/src/routes/issues.js`, ajouter les routes pour récupérer, créer, modifier et supprimer les US. Sauvegarder les changements dans la base MongoDB. | 5 |
| 12 | 54 | 53 | **Créer le service coté client pour gérer les US avec l'API back-end** Créer un service `client/src/services/IssuesService.js`. Implémenter les méthodes permettant de récupérer, créer, modifier, ou supprimer une US en utilisant`client/src/services/api.js`. | 3 |
| 12 | 55 | 54 | **Créer un composant pour visualiser la liste des US** Créer un composant `issues.vue` dans `client/src/components`. #TODO Layout du composant. Le composant récupère US grâce au service `client/src/services/IssuesService.js` | 5 |

### US 13

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 13  | ?  | ?  | **Titre** desc **DOD** (si pas explicite dans la description)  | ? |

### US 14

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 14  | ?  | ?  | **Titre** desc **DOD** (si pas explicite dans la description)  | ? |

### US 15

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 15  | ?  | ?  | **Titre** desc **DOD** (si pas explicite dans la description)  | ? |

### US 16

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 16  | ?  | ?  | **Titre** desc **DOD** (si pas explicite dans la description)  | ? |

### US 17

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 17  | ?  | ?  | **Titre** desc **DOD** (si pas explicite dans la description)  | ? |

### US 20

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 20  | ?  | ?  | **Titre** desc **DOD** (si pas explicite dans la description)  | ? |

### US 22

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 22  | ?  | ?  | **Titre** desc **DOD** (si pas explicite dans la description)  | ? |

### US 23

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 23  | ?  | ?  | **Titre** desc **DOD** (si pas explicite dans la description)  | ? |
