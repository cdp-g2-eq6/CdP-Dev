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
| 37 | 42 | 41 | **Initialiser node et ses dépendances.** Dans le répertoire `server/src`, executer la commande `npm init` pour créer package.json. Executer ensuite `npm install express` pour installer express. Executer la commande `npm install mongodb` pour installer mongodb. Dans le répertoire `server/client`, executer la commande `npm init` pour créer package.json. Ensuite executer `npm install vue` et `npm install bluefy`. Pour le client et le serveur, executer `npm install jest`. Editer les deux fichiers `package.json` pour ajouter `{ "scripts": { "test": "jest" } }`. | 2 |
| 37 | 43 | 42 | **"Dockeriser" l'application node/express/mongoDB.** Todo: dod | 8 |
| 37 | 44 | 42 | **Ajouter un linter au projet.** Todo: dod | 3 |
| 37 | 45 | 43 | **Configurer Github Actions pour vérifier le build à chaque push et pull request sur main.** Todo: dod | 5 |
| 37 | 46 | 43 | **Avoir une page d'accueil vide, mais qui fonctionne**. Todo: dod (ajouter la route "/" dans routes.js, définir la template .ejs à utiliser pour cette route) | 3 |

### US 2

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 2  | 47 | 42 | **Créer un nouveau composant pour la barre de navigation.** Todo: dod | Todo |
| 2  | 48 | 47, 46 | **Ajouter la barre de navigation à la page principale** Todo: dod | Todo |