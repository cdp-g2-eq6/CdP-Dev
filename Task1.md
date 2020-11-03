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
            templates/ # Templates ejs -> nécessaire ou pas avec vue?
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
| 37 | 43 | 41 | **(Client) Avoir une page d'accueil vide, mais qui fonctionne**. Il faut ajouter une ligne à `client/package.json` pour qu'il reconnaisse la commande `start` de `npm`. Cette commande execute la commande `node src/main.js` qui va lancer le client sur le port `8080`. Il est alors possible d'aller (après avoir tapé `npm start`) sur http://localhost:8080/. Cela doit afficher "Homepage" en texte brut. | 3 |
| 37 | 44 | 41 | **(Serveur) Avoir un serveur qui fonctionne**. Il faut ajouter une ligne à `server/package.json` pour qu'il reconnaisse la commande `start` de `npm`. Cette commande execute la commande `node src/server.js` qui va lancer le serveur sur le port `3000`. L'adresse `/api/ping` est accessible et renvoie "pong" lorsqu'elle est accédée avec une requête GET. (Il est possible de tester cela avec l'application postman ou insomnia). | 3 |
| 37 | 45 | 43, 44 | **"Dockeriser" l'application node/express/mongoDB et le serveur peut se connecter à la base mongoDB.** Todo: dod | 8 |
| 37 | 46 | 45 | **Configurer Github Actions pour vérifier le build à chaque push et pull request sur main.** Créer un fichier dans .github/workflows.yml qui executera les tests avec jest, et qui vérifira que les scripts dockers fonctionnent. Ce script devra être executé à chaque push ou pull request sur main. Cela devra fonctionner, et passer au vert. | 5 |

### US 2

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 2  | 46 | 45 | **Créer un nouveau composant pour la barre de navigation.** Todo: dod | Todo |
| 2  | 47 | 46 | **Ajouter la barre de navigation à la page principale** Todo: dod | Todo |