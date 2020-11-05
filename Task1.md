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
| 12  | 55 | - | **Créer un composant pour une US.** Créer un composant `issue.vue` dans `client/src/components`. Ce composant doit être construit avec une tuile présentée sur cette page (https://bulma.io/documentation/layout/tiles). Cette tuile devra contenir l'ID, titre, description, difficulté et importance de la user-story. Les niveaux de difficulté et d'importance seront représentés avec des codes couleurs et un petit icone(cliquable pour afficher l'echelle utilisée) et seront placés le plus à droite possible dans la tuile. Pour la difficulté, on aura comme couleur vert(facile), jaune(moyen), orange(dur), rouge(très dur) avec comme icône 3 pointié et pour l'importance vert(minimum), jaune(normale), rouge(maximale) avec comme îcone un point d'exclamation. Ces informations seront récuperées sous format json depuis sont composant parent.  **DOD** (si pas explicite dans la description)  | 5 |
| 12  | 56 | 55 | **Créer un composant pour visualiser la difficulté et l'importance.** Créer un composant `gradient.vue` dans `client/src/components`. Ce composant affiche un dégradé de couleurs du vert au rouge à côté du curseur de la souris. Ce degradé sera repartie sur 4 cases contenant consecutivement les lettres: f(vert), m(jaune), d(orange), td(rouge) dans le cas de la difficulté est répartie sur 3 cases: mn(vert), n(jaune), mx(rouge) dans le cas de l'importance. Lors de l'appel à ce composant un paramètre sera nécessaire pour distinguer les 2 cas. **DOD** Lorsque la souris survole le niveau de difficulté un dégradé avec 4 cases sera affiché et si le niveau d'importance est survolé, un gradient à 3 cases sera affichée.  | 3 |
| 12  | 57 | 56 | **Survole d'une US.** Lorsque le titre ou la description d'une issue sont survolés, les tâches liées à celle-ci sont affichés dans une bulle(tooltip) en forme de liste. Pareil pour les cases difficulté et importance, une bulle décrivant la case sera affichée lors du survole des icônes. **DOD** Lors d'une survole de la souris d'un élément de l'issue, une bulle d'information de ce dernier doit apparaître à la hauteur du curseur. | 3 |
| 12  | 58 | 55 | **Créer un composant pour lister les US.** Créer un composant `backlog.vue` dans `client/src/components`. Ce composant affiche une liste d'issues(en utilisant le composant `issue.vue`) et un bouton (avec un symbole plus) pour créer une nouvelle user-story qui devra rester au premier plan peut importe la taille du backlog. Chaque user-story sera cliquable pour pouvoir la modifier/supprimer. Les informations affichées seront récuperées sous format json depuis `client/src/services/IssuesService.js`. **DOD** Le Backlog devra ressembler à ça ![maquette](https://db3pap007files.storage.live.com/y4m4O5LDRs02MbpcbwXEsENgIYvGCAz0Xx7W-Dkd8qouawkBrP8uNoN9K_9MvFacvrKPi6wp8Oqj6SED0TKm5WzDTIcc51lcBnDvWPK3OjPzrLBZeGvwNG_mkF4kcwiz2hOUE0WfrKAcUfRl-o3jXiSDizsxaa-XHYm6YVWZxf3pYaidrWlbizWLhPAp2GGcJjwjdj0KqU1I368L7dwO32Kxg/backlog.jpg?psid=1&width=400&height=183).  | 5 |


### US 13

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 13  | 59  |  58 | **Créer une US.** Créer un composant `createUS.vue` dans  `client/src/components`. Ce composant affiche quatre "input" pour récupérer les données saisis, le titre, les champ "En tant que", "Je souahite que", "A fin de". Le compteur d'id des issues devra s'incrémente à chaque création d'issue, afin que chaque issue ont un id unique. le bouton "importance" et la "difficulté", avec un clique génére une menu déroulant "dropdown" pour afficher un choix multiple "checkBox" avec leurs valeurs possible. Pour la difficulté, il y aura : 2, 3, 5, 8, 13, 21 et pour l'importance : minimale, normale, maximale. Quand le bouton "validé" est sélectionné ou que la touche "entrée" est tapée alors on doit vérifié les champs. Un champ est valide si toute les cases ont été remplis et cocher sauf pour la case des "A fin de" qui peut être laissé vide. Si c'est valide, on enregistre dans la base de donnée l'US avec un "POST". Si l'US n'est pas valide alors entouré en rouge les champs non valide et afficher un message d'erreur en rouge. Quand la touche "echap" est appuyer ou que le bouton "annulé" est sélectionné alors revenir sur la page du backlog.  **DOD** (si pas explicite dans la description)  | 5 |

### US 14

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 14  | 60  | 59  | **Modifier une US** Créer un composant `modifyUS.vue` dans  `client/src/components`. Ce composant affiche quatre "input" pour récupérer les données saisis ete ils seront remplis des données de l'US, le titre, les champ "En tant que", "Je souahite que", "A fin de". L'id ne changera pas. Le bouton "importance" et la "difficulté", avec un clique génére une menu déroulant "dropdown" pour afficher un choix multiple "checkBox" avec leurs valeurs possible et les choix déjà selectionné. Pour la difficulté, il y aura : 2, 3, 5, 8, 13, 21 et pour l'importance : minimale, normale, maximale. Quand le bouton "validé" est sélectionné ou que la touche "entrée" est tapée alors on doit vérifié les champs. Un champ est valide si toute les cases ont été remplis et cocher sauf pour la case des "A fin de" qui peut être laissé vide.  Si c'est valide, on enregistre dans la base de donnée l'US avec un "PUT" les modifications voulu. Si l'US n'est pas valide alors entouré en rouge les champs non valide et afficher un message d'erreur en rouge. Quand la touche "echap" est appuyer ou que le bouton "annulé" est sélectionné alors revenir sur la page du backlog.  **DOD** (si pas explicite dans la description)  | 5 |

### US 15

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 15  | 61  | 59  | **Suppression d'US** Quand on clique sur supression pour l'US, on fait un "DELETE" pour supprimer l'US. **DOD** (si pas explicite dans la description)  | 1 |

### US 16

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 16  | 62  | 59  | **Déplacement d'une US** **DOD** (si pas explicite dans la description)  | ? |
### US 17

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 17  | 64  | - |  **Créer un composant pour une tâche.** Créer un composant `task.vue` dans `client/src/components`. Ce composant doit être construit avec une tuile présentée sur cette page (https://bulma.io/documentation/layout/tiles). Cette tuile devra contenir l'ID, titre, l'ID de l'US à laquelle est liée, difficulté et importance de la tâche. Les niveaux de difficulté et d'importance seront représentés avec des codes couleurs et un petit icone(cliquable pour afficher l'echelle utilisée) et seront placés le plus à droite possible dans la tuile. Pour la difficulté, on aura comme couleur vert(facile), jaune(moyen), orange(dur), rouge(très dur) avec comme icône 3 pointié et pour l'importance vert(minimum), jaune(normale), rouge(maximale) avec comme îcone un point d'exclamation. Ces informations seront récuperées sous format json depuis sont composant parent.  **DOD** (si pas explicite dans la description)  | 5 |
| 12  | 65 | 56,64 | **Utilisation du composant 'gradient.vue' pour visualiser la difficulté et l'importance.** Utiliser le composant `gradient.vue` dans `client/src/components`pour afficher un dégradé de couleurs du vert au rouge lorsque la souris survole l'indicateur de difficulté ou d'importance d'une tâche. Cela permet de distinguer l'echelle utiliser pour chacune des cas. Pour cela lors de l'appel de la fonction affichant le degradé, un paramètre sera passer à celle-ci pour afficher la bonne echelle. **DOD** Lorsque la souris survole le niveau de difficulté un dégradé avec 4 cases sera affiché et si le niveau d'importance est survolé, un gradient à 3 cases sera affichée.  | 1 |
| 12  | 66 | 56 | **Sélectionner une tâche.** Lorsque l'utilisateur clique sur une tâche, la description, DOD et les dépendances de celle-ci sont affichés dans une la même tuile en forme de liste. Si l'utilisateur clique encore une fois sur cette dernière, les details seront masqués. **DOD** Lors d'un clique de souris sur la tâche, une liste d'information de cette dernière doit apparaître dans la tuile en dessous du titre de la tâche. Si, les détails d'une tâche ont visible et que l'utilisateur clique sur cette dernière, les détails seront masqués. | 3 |
| 12  | 67 | 55 | **Créer un composant pour lister les tâches.** Créer un composant `tasks.vue` dans `client/src/components`. Ce composant affiche une liste de tâches(en utilisant le composant `task.vue`) et un bouton (avec un symbole plus) pour créer une nouvelle tâche qui devra rester au premier plan peut importe la taille de la liste. Les informations affichées seront récuperées sous format json depuis `client/src/services/TasksService.js`. **DOD** La liste des tâches devra ressembler à ça ![maquette](https://db3pap007files.storage.live.com/y4m05oTV_fnmmgt0ISb1QX0t3Ei0JUc3RegDs7aznmbszxt1fuZlwsb4ZqpRJsfVQEBTDgVf9nTnDK4r3-c4C1bUac3vOPapwMIaUDybFwSzFtiqKDsqUphqFVdcXQQMFFuzVdf4C7KdJPY4KJPcchR95TypoXy04ve_0v6rczpAiCEKjNk33_WPBzLUBWMhG9NAl6Um8iB1xfxOYbOdTR2Sg/tasks.jpg?psid=1&width=400&height=183)

### US 20

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 20  | 68  | 67  | **Créer une tâche.** Créer un composant `createTask.vue` dans  `client/src/components`. Ce composant affiche deux "input", le premier pour le titre et le deuxième pour la description.Le compteur d'id des tâches devra s'incrémente à chaque création de tâche, afin que chaque tâche a un id unique. les boutons "importance", "difficulté", "choix des US" et "dépendance", avec un clique, génére une menu déroulant "dropdown" pour afficher un choix multiple "checkBox" avec leurs valeurs possible. Pour la difficulté, il y aura : 2, 3, 5, 8, 13, 21 et pour l'importance : minimale, normale, maximale. Pour "choix des US", il affichera toutes les US déjà créer et pour "dépendance", il affichera les tâches déjà créer. Quand le bouton "validé" est sélectionné ou que la touche "entrée" est tapée alors on doit vérifié les champs. Un champ est valide si le titre et la description sont présent, et si il y a un choix de validé pour "importance", "difficulté" et "choix des US". Si c'est valide, on enregistre dans la base de donnée des tâche avec un "POST". Si la tâche n'est pas valide alors entouré en rouge les champs non valide et afficher un message d'erreur en rouge. Quand la touche "echap" est appuyer ou que le bouton "annulé" est sélectionné alors revenir sur la page des tâche.  **DOD** (si pas explicite dans la description)  | 5 |

### US 22

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 22  | 69  | 68  | **Suppression d'une tâche.** Quand on clique sur supression pour la tâche, on fait un "DELETE" pour supprimer la tâche. **DOD** (si pas explicite dans la description)  | 1 |

### US 23

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 23  | ?  | ?  | **Afficher les tâches dans un kanban.** Créer un composant `kanban.vue` dans  `client/src/components`. Il affiche le titre du Sprint, ainsi qu'un tableau de quatre colonnes : "to do", "in progress", "testing", "done". Chaque colonne contiendra une liste qui affichera les tâches (en utilisant le composant `task.vue`). **DOD** (si pas explicite dans la description)  | 3 |
