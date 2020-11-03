## Tâches du sprint 1

- Coût (echelle de comparaison): 1, 2, 3, 5, 8, 13, 21
- Importance: maximale (doit être fait en priorité), normale, minimale (pourra être réalisée quand on aura le temps)

### US X

| US | ID | Dépendance(s) | DOD | Coût |
|----|----|---------------|-----|------|
| 37 | 41 | - | **Créer la structure du projet.** Il doit y avoir (relatif à la racine), ces répertoires et fichiers: client/assets/, client/components/, client/App.vue, client/router.js, client/config.js, server/config/, server/controller/, server/model/, server/routes/, server/server.js, docker/Dockerfile, docker/docker-compose.yml. Les fichiers sont vides à ce stade. |  | 1 |
| 37 | 42 | 41 | **Initialiser node et ses dépendances (express, vue, mongoDB).** Todo: dod | 3 |
| 37 | 43 | 42 | **"Dockeriser" l'application node/express/mongoDB** Todo: dod | 8 |
| 37 | 44 | 42 | **Importer Buefy au projet** Todo: dod | 1 |
| 37 | 45 | 42 | **Ajouter un linter au projet** Todo: dod | 3 |
| 37 | 46 | 43 | **Configurer Github Actions pour vérifier le build à chaque push et pull request sur main** Todo: dod | 3 |

**Trucs à pas oublier:**
- Selenium?
- Framework de test unitaires?