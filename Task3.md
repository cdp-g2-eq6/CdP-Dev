## Tâches du sprint 3

- Coût (echelle de comparaison): 1, 2, 3, 5, 8, 13, 21
- Importance: maximale (doit être fait en priorité), normale, minimale (pourra être réalisée quand on aura le temps)


| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| -  | 83  | -  | **Mettre à jour le style en suivant notre chart graphique.** Changer le css des composants pour utiliser notre charte graphique. Voir les maquettes pour savoir quelles couleurs utiliser où | 5 | |  |
| -  | 83  | -  | **Tester l'api pour les issues** Tester toutes les routes /issues dans server/test/api.test.js. Il faudra utiliser le serveur de test (npm run start_testing_server). | 8 | lgallon | Done 17 Novembre |
| -  | 84  | -  | **Tester l'api pour les tasks** Tester toutes les routes /tasks dans server/test/api.test.js. Il faudra utiliser le serveur de test (npm run start_testing_server). | 8 | |  |
| -  | 85  | -  | **Tester l'api pour les sprints** Tester toutes les routes /sprints dans server/test/api.test.js. Il faudra utiliser le serveur de test (npm run start_testing_server). | 8 | |  |
| 30 | 88 | 87 | **Test backend des tests**. Créer les tests pour la /tests | 5 | - | |
| 06 | 89 | - | **Voir la page d'accueil**. créer un composant `home.vue` pour afficher le titre, la description et les participants du projet.  | 5 | - | |
| 07 | 90 | 89 | **Modifier la page d'accueil**. Quand le bouton "édition" est activé, lorsqu'on clique sur la page, le même formulaire pour la création de projet sera affiché mais avec les champs pré-remplie.  | 3 | - | |
| 07 | 91 | - | **API modifier/supprimer/recupérer un projet**. créer les routes `api/projects/:id` pour modifier, supprimer et récupérer un projet. (titre, description, liste de participants, et liste d'id de US) ) | 5 | - | |
| 07 | 92| - | **Tester l'api pour les projets**. Créer les tests pour la route /projects | 5 | - | |
| 05 | 93 | - | **Création d'un projet**. Créer un composant `projectForm.vue`. Quand le bouton création est actionné alors un formulaire (https://buefy.org/documentation/modal#programmatic) avec trois champs: le titre, la description et les participants | 3 | - | |
| 05 | 94 | - | **API d'un projet**. Créer la base de donnée pour un projet et la route `api/projects`. | 5 | - | |
| 03 | 95 | - | **voir la liste des projets**. Créer un composant `projects.vue`. Sur la page, un bouton pour créer un projet est affiché et la liste de tous les projets créer est affichés.| 3 | - | |
| 03 | 96 | - | **Créer un composant projet**. Créer un composant `project.vue`. Il permet d'afficher le titre et l'id du projet. | 3 | - | |
| 03 | 97 | 96 | **Survole d'un composant projet**. Quand la souris survole le projet, la description du projet s'affiche dans une bulle(tooltip). | 3 | - | |
| 04 | 98 | 95 | **supprimer un projet**. Lorsque le mode édition est activé, quand on clique sur le projet, on peut supprimer le projet.| 5 | - | |
| 08 | 99 | 90 | **ajouter un participant au projet**. Lorsque le mode édition est activé, quand on clique sur le bouton pour ajouter un participant, un formulaire s'affiche et on peut rajouter un ou des participants.| 5 | - | |
| 09 | 100 | 99 | **supprimer un participant au projet**. Lorsque le mode édition est activé, quand on clique sur le bouton pour supprimer un participant et une boite de dialogue s'ouvre pour confirmer la supression du participant, la liste des participants se met à jour.| 5 | - | |
| 10 | 100 | 89 | **Voir la progression d'un sprint**. Sur la page d'accueil, il y a une barre de progression des sprints (https://buefy.org/documentation/progress).| 5 | - | |
| 6, 7, 8, 9, 10 | 102 | - | **Le composants des US doit avoir accès au projet selectionné** De la même manière que l'on a fait pour edit, il faut une variable project_id que le composant peut accéder | 3 | | |
| 6, 7, 8, 9, 10 | 103 | 102 | **Mettre à jour la suppression / création des US pour être compatible avec le projet** utiliser la variable project_id pour ajouter / supprimer une US d'un projet (en plus de la supprimer tout court). Parce que les projets ont un champ avec la liste des US. | 5 | | |

