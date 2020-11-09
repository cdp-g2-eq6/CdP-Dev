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

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 37 | 41 | - | **Créer la structure du projet.** Il doit y avoir (relatif à la racine), ces répertoires et fichiers: *voir au dessus*. Les fichiers sont vides à ce stade. Les fichiers gitignore sont générés à partir du site gitignore.io lien: (https://www.toptal.com/developers/gitignore/api/vscode,node) avec, en plus pour le serveur, la ligne config.js. | 1 | nlesne | Done (05/11/20) |
| 37 | 42 | 41 | **Initialiser node et ses dépendances.** Dans le répertoire `server/src`, executer la commande `npm init` pour créer package.json. Executer ensuite `npm install express` pour installer express. Executer la commande `npm install mongodb` pour installer mongodb. Dans le répertoire `server/client`, executer la commande `npm init` pour créer package.json. Ensuite executer `npm install vue` et `npm install bluefy`. Pour le client et le serveur, executer `npm install jest`, `npm install eslint` et `./node_modules/.bin/eslint --init` (choisir Google pour les conventions). Editer les deux fichiers `package.json` pour ajouter `{ "scripts": { "test": "jest" } }`. | 2 | nlesne | Done (05/11/20) |
| 37 | 43 | 41 | **(Client) Avoir une page d'accueil vide, mais qui fonctionne**. Il faut ajouter une ligne à `client/package.json` pour qu'il reconnaisse la commande `start` de `npm`. Cette commande execute la commande `node src/main.js` qui va lancer le client sur le port `8080`. `main.js` doit charger `App.vue` lorsque `/` est accedé en `GET`. `App.vue` affiche un simple message "Homepage", et n'a pas d'autres fonctionnalités à ce stade. **DOD:** Il est alors possible d'aller (après avoir tapé `npm start`) sur http://localhost:8080/. Cela doit afficher "Homepage" en texte brut. | 3 | nlesne | Done (05/11/20) |
| 37 | 44 | 41 | **(Serveur) Avoir un serveur qui fonctionne**. Il faut ajouter une ligne à `server/package.json` pour qu'il reconnaisse la commande `start` de `npm`. Cette commande execute la commande `node src/server.js` qui va lancer le serveur sur le port `3000`. **DOD:** L'adresse `/api/ping` est accessible et renvoie "pong" lorsqu'elle est accédée avec une requête GET. (Il est possible de tester cela avec l'application postman ou insomnia). | 3 | nlesne | Done (05/11/20) |
| 37 | 45 | 43, 44 | **"Dockeriser" l'application node/express/mongoDB et le serveur peut se connecter à la base mongoDB.** Le `Dockerfile` doit exposer les ports `3000` (serveur) et `8080` (client). Il doit aussi utiliser la dernière version de node et doit installer les dépendance du client ET du serveur et doit lancer ces deux derniers avec `npm start` (dans les bons répertoires). Le répertoire de travail de Dockerfile est celui par défaut soit `/usr/src/app`. Il doit evidemment clone le dépôt git. Le fichier `docker-compose.yml` doit aussi définir un conteneur `server` accessible au port `3000` et qui est lié au conteneur `mongo`. Il doit aussi définir un conteneur mongo qui sera accessible à aprtir du port `27017`. Les données (volume) seront stockées dans le répertoire par défaut définit par mongo, cest-à-dire `./data:/data/db`. Il faut mettre à jour le code de `server.js` pour qu'il effectue (au lancement) une connection à la base de données. Si cela echoue, un message d'erreur doit être envoyé, et la commande `docker-compose up` doit échouer. **DOD**: La commande `docker-compose up` dans `docker/` doit lancer le client, et le serveur. Il doit aussi faire fonctionner la BD. Aucune erreur survient, et le serveur est accessible (la route `api/ping` en `GET` donne "pong") et le site sur `/` affiche "Homepage".  | 8 | nlesne, lgallon | Done (07/11/20) |
| 37 | 46 | 45 | **Configurer Github Actions pour vérifier le build à chaque push et pull request sur main.** Créer un fichier dans .github/workflows.yml qui executera les tests avec jest, et qui vérifira que les scripts dockers fonctionnent. Ce script devra être executé à chaque push ou pull request sur main. **DOD:** Cela devra fonctionner, et passer au vert. Puisque le build docker est censé fonctionner (tâche 45). | 5 | lgallon | Done (07/11/20) |

### US 2

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 2  | 47 | 43 | **Créer un composant pour la barre de navigation.** Créer un composant `navbar.vue` dans `client/src/components`. Ce composant doit afficher une barre de navigation sur le côté gauche de l'écran. Il est possible de réduire cette barre de navigation en cliquant sur un bouton acordéon. Il est construit en tant que "menu" (https://buefy.org/documentation/menu/) avec `Buefy`. Il doit y avoir un titre "Nom projet", deux simples boutons "Backlog" et "Tâches", et un bouton "Sprint" avec un sous-bouton "Nouveau sprint". Ce dernier sous bouton est affiché lorsque on clique sur "Sprint". Les boutons sont colorés pour montré qu'ils sont selectionnés dans plusieurs cas: `/backlog`: "Backlog" coloré, `/tasks`: "Tâches" coloré. | 5 | lgallon | In Progress |
| 2  | 48 | 47 | **Ajouter la barre de navigation à la page principale** Le fichier `client/src/App.vue` charge le composant `client/src/components/navbar.vue`. **DOD** Lorsque l'on accède à http://localhost:8080/, la navbar est correctement affichée.  | 3 | | |

### US 1

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 1  | 49  | 43  | **Créer un composant pour activer / désactiver le mode edition**. Créer un composant `edit-button.vue` dans `client/src/components`. Le composant doit être construit avec les "checkbox" de Buefy (https://buefy.org/documentation/checkbox). Il ressemble à un bouton, mais qui est actif / non actif en fonction de si l'utilisateur clique dessus ou non (voir "Checkbox Button" de Buefy). Le composant doit avoir une variable accessible qui dit si oui, ou non le mode édition est activé en fonction de l'état du bouton. | 5 | | |
| 2  | 50 | 47, 49 | **Ajouter le bouton d'édition à la barre de navigation** Le composant `client/src/components/navbar.vue` charge le composant `client/src/components/edit-button.vue`. Le bouton est affichée en bas de la barre de navigation. **DOD** Lorsque l'on accède à http://localhost:8080/, la navbar est correctement affichée avec le bouton d'édition tout en bas de celle-ci. | 3 | | |

### US 11

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 11 | 51  | 50  | **Mettre à jour la navbar pour agir sur le clic de "Nouveau Sprint"** Modifier `client/src/components/navbar.vue` et ajouter une fonction qui est appelée lorsque l'utilisateur clique sur le bouton "Nouveau Sprint". Cette fonction ajoute un sprint au composant (il faut donc créer une liste de sprints dans le composant). En dessous du bouton "Sprint" est alors affiché les boutons "Sprint x" (avec x le numéro du sprint) et le bouton "Nouveau Sprint" (dans cet ordre). Le bouton "Sprint x" redirige vers `/sprint/x`. | 5 | | |
| 11 | 52  | 51  | **Mettre à jour App.vue pour prendre en compte la route /sprint/{x}** Modifier `client/src/App.vue` (et peut être `client/src/main.js`) pour prendre en compte la différence entre `/` et `/sprint/x`. Lorsque l'on accède à `/`, la barre de navigation est correctement affichée, et le texte "Homepage" est affiché. Lorsque l'on accède à `/sprint/x`, la barre de navigation est correctement affichée aussi, et le texte "Sprint x" est affiché (avec x le numéro du sprint). Le bouton "Sprint x" de la barre de navigation est coloré pour montré qu'il est selectionné. Il faudra donc potentiellement mettre à jour `client/src/components/navbar.vue` aussi. | ? | | |

### US 12

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 12 | 53 | 44 | **Créer les routes permettant de gérer les US coté serveur** Créer le fichier `server/src/routes/issues.js`, ajouter les routes pour récupérer, créer, modifier et supprimer les US. Sauvegarder les changements dans la base MongoDB. | 5 | | |
| 12 | 54 | 53 | **Créer le service coté client pour gérer les US avec l'API back-end** Créer un service `client/src/services/IssuesService.js`. Implémenter les méthodes permettant de récupérer, créer, modifier, ou supprimer une US en utilisant `client/src/services/api.js`. | 3 | | |
20| 12  | 55 | - | **Créer un composant pour une US.** Créer un composant `issue.vue` dans `client/src/components`. Ce composant doit être construit avec une tuile présentée sur cette page (https://bulma.io/documentation/layout/tiles). Cette tuile devra contenir l'ID, titre, description, difficulté et importance de la user-story. Les niveaux de difficulté et d'importance seront représentés avec des codes couleurs et un petit icone(cliquable pour afficher l'echelle utilisée) et seront placés le plus à droite possible dans la tuile. Pour la difficulté, on aura comme couleur vert(facile), jaune(moyen), orange(dur), rouge(très dur) avec comme icône 3 pointié et pour l'importance vert(minimum), jaune(normale), rouge(maximale) avec comme îcone un point d'exclamation. Ces informations seront récuperées sous format json depuis sont composant parent.    | 5 | | |
| 12  | 56 | 55 | **Créer un composant pour visualiser la difficulté et l'importance.** Créer un composant `gradient.vue` dans `client/src/components`. Ce composant affiche un dégradé de couleurs du vert au rouge à côté du curseur de la souris. Ce degradé sera repartie sur 4 cases contenant consecutivement les lettres: f(vert), m(jaune), d(orange), td(rouge) dans le cas de la difficulté est répartie sur 3 cases: mn(vert), n(jaune), mx(rouge) dans le cas de l'importance. Lors de l'appel à ce composant un paramètre sera nécessaire pour distinguer les 2 cas. **DOD** Lorsque la souris survole le niveau de difficulté un dégradé avec 4 cases sera affiché et si le niveau d'importance est survolé, un gradient à 3 cases sera affichée.  | 3 |
| 12  | 57 | 56 | **Survole d'une US.** Lorsque le titre ou la description d'une issue sont survolés, les tâches liées à celle-ci sont affichés dans une bulle(tooltip) en forme de liste. Pareil pour les cases difficulté et importance, une bulle décrivant la case sera affichée lors du survole des icônes. **DOD** Lors d'une survole de la souris d'un élément de l'issue, une bulle d'information de ce dernier doit apparaître à la hauteur du curseur. | 3 | | |
| 12  | 58 | 55 | **Créer un composant pour lister les US.** Créer un composant `backlog.vue` dans `client/src/components`. Ce composant affiche une liste d'issues(en utilisant le composant `issue.vue`) et un bouton (avec un symbole plus) pour créer une nouvelle user-story qui devra rester au premier plan peut importe la taille du backlog (le bouton apparaîtra seulement si le mode edition est activé). Chaque user-story sera cliquable pour pouvoir la modifier/supprimer. Les informations affichées seront récuperées sous format json depuis `client/src/services/IssuesService.js`. **DOD** Le Backlog devra ressembler à ça ![maquette](https://db3pap007files.storage.live.com/y4m4O5LDRs02MbpcbwXEsENgIYvGCAz0Xx7W-Dkd8qouawkBrP8uNoN9K_9MvFacvrKPi6wp8Oqj6SED0TKm5WzDTIcc51lcBnDvWPK3OjPzrLBZeGvwNG_mkF4kcwiz2hOUE0WfrKAcUfRl-o3jXiSDizsxaa-XHYm6YVWZxf3pYaidrWlbizWLhPAp2GGcJjwjdj0KqU1I368L7dwO32Kxg/backlog.jpg?psid=1&width=400&height=183).  | 5 | | |


### US 13

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 13  | 59  |  58 | **Créer une US.** Modifier le composant `issue.vue` dans `client/src/components`. Lorsque le bouton de création d'issue est actioné (et que le mode edition est activé), un formulaire(http://bulma.io/documentation/form/general/) s'affiche avec quatre "input" pour récupérer: le titre, les champs "En tant que", "Je souahite que", "Afin de". Le compteur d'id des issues devra s'incrémenter à chaque création d'issue, afin que chaque issue ait un id unique. Il y a aussi deux boutons "importance" et "difficulté". Lorsqu'un clic survient, un menu déroulant "dropdown" est affiché pour selectionner une valeur. Pour la difficulté, il y aura : 2, 3, 5, 8, 13, 21 et pour l'importance : minimale, normale, maximale. Quand le bouton "valider" est sélectionné ou que la touche "entrer" est tapée alors on doit vérifier les champs. Un champ est valide si toute les cases ont été remplies sauf pour la case des "A fin de" qui peut être laissée vide. Si c'est valide, une requête `POST` est envoyée au serveur à l'adresse `/api/user-story`, avec les données au format json. Si l'US n'est pas valide alors les champs non validés sont entourés en rouge et un message d'erreur est affiché. Quand la touche "echap" est appuyée ou que le bouton "annuler" alors le mode edition du componsant est desactivé, et il n'est possible que de le lire.  | 5 | | |
| 13  | 60  |  44 | **Route pour ajouter une US.** Ajouter une route `/api/issue` au serveur, et lorsqu'elle est accédée avec une requête `POST`, la US passée en paramètre `POST` est ajoutée à la base de données si les champs sont valides. Renvoie une erreur si cela a échoué avec la raison, ou renvoie code `ok` si cela a réussi. **DOD** Lorsque le mode édition est activé et que l'utilisateur est sur la page Backlog, un bouton de création d'US apparaît. Lorsque, ce bouton sera actionné, un formulaire de création apparaîttra et quand le bouton "validé" sera actionné, la liste d'US sera actualisée prenant en compte la nouvelle US venant d'être créée.  | 5 | | |

### US 14

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 14  | 61  | 59  | **Modifier une US** Modifier le composant `issue.vue` dans `client/src/components`. Lorsque le mode édition est activé, un bouton "modifier" est affiché lorsqu'on clique sur une US dans la liste des US. Le même formualire que lors de la création de l'US sera affiché mais avec les champs pré-remplie avec les informations de l'US selectionné. La seule chose qu'il sera impossible de modifier est l'ID de l'US. De la même manière qu'on peut créer une US, on peut l'éditer en envoyant les données au serveur à l'url `/api/issue` avec une requête `PUT`. | 5 | | |
| 14  | 62  | 61,44  | **Route pour modifier une US** Ajouter une route `/api/issue` au serveur, et lorsqu'elle est accédée avec une requête `PUT`, la US passée en paramètre `PUT` est modifiée dans la base de données si les champs sont valides. Renvoie une erreur si cela a échoué avec la raison, ou renvoie code `ok` si cela a réussi. **DOD** Lorsque le mode édition est activé et que l'utilisateur clique sur une US, un bouton "modifier" apparaît sur la tuile de l'issue. Lorsque, ce bouton sera actionné, un formulaire de modification apparaîttra et quand le bouton "validé" est actionné, la liste d'US sera actualisée prenant en compte la modification venant d'être réalisée. | 5 | | |

### US 15

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 15  | 63  | 59  | **Suppression d'US** Modifier le composant `issue.vue` dans `client/src/components`. Lorsque le mode édition est activé, un bouton "supprimer" est affiché lorsqu'on clique sur une US dans la liste des US. De la même manière qu'on peut créer une US, on peut la supprimer en envoyant les données au serveur à l'url `/api/issue` avec une requête `DELETE`. Avant d'envoyer la requête, une popup de confirmation demande à l'utilisateur de confirmer son choix. | 8 |
| 15  | 64  | 63,44  | **Route pour Supprimer d'US** Ajouter une route `/api/issue` au serveur, et lorsqu'elle est accédée avec une requête `DELETE`, la US passée en paramètre (avec son id) est supprimée de la base de données. Renvoie une erreur si cela a échoué avec la raison, ou renvoie code `ok` si cela a réussi. Il faut alors supprimer toutes les tâches qui faisaient référence à cette US. **DOD** Lorsque le mode édition est activé et que l'utilisateur clique sur une US, un bouton "supprimer" apparaît sur la tuile de l'issue. Lorsque, ce bouton sera actionné, un pop-up de confirmation apparaîttra et quand le bouton "validé" est actionné, la liste d'US sera actualisée prenant en compte la suppression venant d'être réalisée. | 5 | | |

### US 16

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 16  | 65  | 52, 58  | **Glissé/deposé d'une issue dans un sprint** Mettre à jour les propriétés du composant `issue.vue`  dans `client/src/components` pour rendre celui-ci 'draggable'. Lorsque l'utilisateur selectionne une issue en maintenant le clic droit enfoncé, il est possible de le dupliquer et de le déplacer avec la souris. Enfin, si le clic droit est relacher, le composant dupliquer doit disparaître. Mettre à jour les propriétés du composant `navbar.vue` et  dans `client/src/components` pour rendre celui-ci sensible au 'drop'. Lorsque le clic droit est relaché au dessus du bouton Sprint'x'(x = ID du sprint) dans la bar de navigation, l'ID de l'issue est récuperer puis on fait appel à une fonction dans `client/src/services/SprintsService.js` permettant l'ajout de tâches associées à cette issue dans le kanban. **DOD** Lorsque l'utilisateur fait un glissé/deposé d'une issue dans un sprint, la liste des tâches associées à cette issue devra apparaître dans le kanban | 5 | | |

### US 17

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 17  | 66  | - |  **Créer un composant pour afficher une tâche.** Créer un composant `task.vue` dans `client/src/components`. Ce composant doit être construit avec une tuile présentée sur cette page (https://bulma.io/documentation/layout/tiles). Cette tuile devra contenir l'ID, titre, l'ID de l'US à laquelle est liée, difficulté et importance de la tâche, les participants ainsi que le status de la tâche. Les niveaux de difficulté et d'importance seront représentés avec des codes couleurs et un petit icone(cliquable pour afficher l'echelle utilisée) et seront placés le plus à droite possible dans la tuile. Pour la difficulté, on aura comme couleur vert(facile), jaune(moyen), orange(dur), rouge(très dur) avec comme icône 3 pointié et pour l'importance vert(minimum), jaune(normale), rouge(maximale) avec comme îcone un point d'exclamation. Ces informations seront récuperées sous format json depuis sont composant parent. | 5 | | |
| 12  | 67 | 56,65 | **Utilisation du composant 'gradient.vue' pour visualiser la difficulté et l'importance.** Utiliser le composant `gradient.vue` dans `client/src/components`pour afficher un dégradé de couleurs du vert au rouge lorsque la souris survole l'indicateur de difficulté ou d'importance d'une tâche. Cela permet de distinguer l'echelle utiliser pour chacune des cas. Pour cela lors de l'appel de la fonction affichant le degradé, un paramètre sera passer à celle-ci pour afficher la bonne echelle. **DOD** Lorsque la souris survole le niveau de difficulté un dégradé avec 4 cases sera affiché et si le niveau d'importance est survolé, un gradient à 3 cases sera affichée.  | 1 | | |
| 12  | 68 | 56 | **Sélectionner une tâche.** Lorsque l'utilisateur clique sur une tâche, la description, DOD et les dépendances de celle-ci sont affichés dans une la même tuile en forme de liste. Si l'utilisateur clique encore une fois sur cette dernière, les details seront masqués. **DOD** Lors d'un clique de souris sur la tâche, une liste d'information de cette dernière doit apparaître dans la tuile en dessous du titre de la tâche. Si, les détails d'une tâche ont visible et que l'utilisateur clique sur cette dernière, les détails seront masqués. | 3 | | |
| 12  | 69 | 55 | **Créer un composant pour lister les tâches.** Créer un composant `tasks.vue` dans `client/src/components`. Ce composant affiche une liste de tâches(en utilisant le composant `task.vue`) et un bouton (avec un symbole plus) pour créer une nouvelle tâche qui devra rester au premier plan peut importe la taille de la liste. Les informations affichées seront récuperées sous format json depuis `client/src/services/TasksService.js`. **DOD** La liste des tâches devra ressembler à ça ![maquette](https://db3pap007files.storage.live.com/y4m05oTV_fnmmgt0ISb1QX0t3Ei0JUc3RegDs7aznmbszxt1fuZlwsb4ZqpRJsfVQEBTDgVf9nTnDK4r3-c4C1bUac3vOPapwMIaUDybFwSzFtiqKDsqUphqFVdcXQQMFFuzVdf4C7KdJPY4KJPcchR95TypoXy04ve_0v6rczpAiCEKjNk33_WPBzLUBWMhG9NAl6Um8iB1xfxOYbOdTR2Sg/tasks.jpg?psid=1&width=400&height=183) | | |
 
### US 20

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 20  | 70  | 69  | **Créer une tâche.** Mettre à jour le composant `tasks.vue` dans  `client/src/components`. Lorsque le mode édition et activé et que le bouton de création d'issue est actioné, un formulaire(http://bulma.io/documentation/form/general/) s'affiche avec deux "input" pour le titre et l'ID de l'US à laquelle elle est liée ainsi que les dépendances et les participants qui seront des options à choix de la tâche. Le compteur d'id des tâches devra s'incrémente à chaque création de tâche, afin que chaque tâche ait un id unique. Pour la difficulté, il y aura : 2, 3, 5, 8, 13, 21 et pour l'importance : minimale, normale, maximale. Pour "choix des US", il affichera toutes les US déjà créer et pour "dépendance", il affichera les tâches déjà créer. Quand le bouton "validé" est actioné ou que la touche "entrée" est tapée alors on doit vérifié les champs. Un champ est valide si le titre et la description sont présent, et s'il y a un choix de validé pour "importance", "difficulté" et "choix des US". Si c'est valide, une requête `POST` est envoyée au serveur à l'adresse `/api/task` avec les données de la tâche. Si la tâche n'est pas valide alors entouré en rouge les champs non valide et afficher un message d'erreur en rouge. Quand la touche "echap" est appuyer ou que le bouton "annulé" est sélectionné alors le mode edition du composant est desactivé. | 5 | | |
| 20  | 71  | 44  | **Route pour créer une tâche** Ajouter une route `/api/task` au serveur, et lorsqu'elle est accédée avec une requête `POST`, la tâche passée en paramètre est ajoutée dans la base de données si les champs sont valides. Renvoie une erreur si cela a échoué avec la raison, ou renvoie code `ok` si cela a réussi.**DOD** Lorsque le mode édition est activé et que l'utilisateur est sur la page des sprints, un bouton de création d'US apparaît. Lorsque, ce bouton sera actionné, un formulaire de création apparaîttra et quand le bouton "validé" sera actionné, la liste d'tâches sera actualisée prenant en compte la nouvelle tâche venant d'être créée.  | 5 | | |


### US 22

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 22  | 72  | 69  | **Suppression d'une tâche.** Lorsque le mode édition est activé, un bouton "supprimer" est affiché lorsqu'on clique sur une tâche dans la liste des tâches. De la même manière qu'on peut créer une US, on peut la supprimer en envoyant les données au serveur à l'url `/api/task` avec une requête `DELETE`. Avant d'envoyer la requête, une popup de confirmation demande à l'utilisateur de confirmer son choix.| 1 | | |
| 22  | 73  | 72  | **Route pour supprimer une tâche** Ajouter une route `/api/task` au serveur, et lorsqu'elle est accédée avec une requête `DELETE`, la tâche passée en paramètre est supprimée dans la base de données si les champs sont valides. Renvoie une erreur si cela a échoué avec la raison, ou renvoie code `ok` si cela a réussi. **DOD** Lorsque le mode édition est activé et que l'utilisateur clique sur une tâche, un bouton "supprimer" apparaît sur la tuile de l'issue. Lorsque, ce bouton sera actionné, un pop-up de confirmation apparaîttra et quand le bouton "validé" est actionné, la liste des tâches sera actualisée prenant en compte la suppression venant d'être réalisée. | 5 | | |

### US 23

| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| 23  | 74  | -  | **Créer un composant tâche déstiné au kanban.** Créer un composant `k-task.vue` dans  `client/src/components`. Il affiche une tâche avec son ID, son titre, sa difficulté et son importance. Les niveaux de difficulté et d'importance seront représentés avec des codes couleurs et un petit icône(cliquable pour afficher l'echelle utilisée) et seront placés le plus à droite possible dans la tuile. Pour la difficulté, on aura comme couleur vert(facile), jaune(moyen), orange(dur), rouge(très dur) avec comme icône 3 pointiés et pour l'importance vert(minimum), jaune(normale), rouge(maximale) avec comme îcone un point d'exclamation. Ces informations seront récuperées sous format json depuis sont composant parent.    | 5 | | |
| 23 | 75  | 74 | **Survole d'une tâche dans le kanban.** Lorsque l'ID ou le titre d'une tâche sont survolés, les participants liées à celle-ci sont affichés dans une bulle(tooltip) en forme de liste. Pareil pour les cases difficulté et importance, une bulle décrivant la case sera affichée lors du survole des icônes. **DOD** Lors d'une survole de la souris d'un élément du kanban, une bulle d'information de ce dernier doit apparaître à la hauteur du curseur. | 3 | | |
| 23  | 76  | 56, 75 | **Utilisation du composant 'gradient.vue' pour visualiser la difficulté et l'importance.** Utiliser le composant `gradient.vue` dans `client/src/components`pour afficher un dégradé de couleurs du vert au rouge lorsque la souris survole l'indicateur de difficulté ou d'importance d'une tâche. Cela permet de distinguer l'echelle utiliser pour chacune des cas. Pour cela lors de l'appel de la fonction affichant le degradé, un paramètre sera passer à celle-ci pour afficher la bonne echelle. **DOD** Lorsque la souris survole le niveau de difficulté un dégradé avec 4 cases sera affiché et si le niveau d'importance est survolé, un gradient à 3 cases sera affichée.  | 1 | | |
| 23  | 77  | 75  | **Afficher les tâches dans un kanban.** Créer un composant `kanban.vue` dans  `client/src/components`. Il affiche le titre du Sprint, ainsi qu'un tableau de quatre colonnes : "to do", "in progress", "testing", "done". Chaque colonne aura dans son en-tête son titre et contiendra une liste de tâches (en utilisant le composant `k-task.vue`). La hauteur de chaque colonne sera limitée à la longueur de liste des tâches. **DOD** ![maquette](https://db3pap007files.storage.live.com/y4mcUveWue5Y7Fb_DDRlf1ABdmGRWE_uz_egdS7DBxAzf1ZudkTSgcBqw1wrtpvOy-4XeIaIxqDMT43JXIw2BNsDGtNmx6x2PZs3Kdso2yvqQMq8rSeNBevDxipf2I7iMLDmmghkl5YqpBIt4Ew6kT_NzT_kK-gyfyrAn9Fu3S_r3agT1sf5kmX8c4zP5LsgVrXReTMYECssSj5HxCxGe2HZQ/sprint_x.jpg?psid=1&width=400&height=183)  | 5 | | |
| 23  | 78  | 77  | **Insérer le kanban dans la page backlog.** Modifier le serveur pour afficher le kanban d'un sprint lorsqu'un utilisateur accède à `/sprint/{x}`.  | 4 | | |
