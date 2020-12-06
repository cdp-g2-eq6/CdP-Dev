## Tâches du sprint 3

- Coût (echelle de comparaison): 1, 2, 3, 5, 8, 13, 21
- Importance: maximale (doit être fait en priorité), normale, minimale (pourra être réalisée quand on aura le temps)


| US | ID | Dépendance(s) | DOD | Coût | Participant | Status |
|----|----|---------------|-----|------|-------------|--------|
| -  | 83  | -  | **Tester l'api pour les issues** Tester toutes les routes /issues dans server/test/issues.test.js. Il faudra utiliser le serveur de test (npm run start_testing_server). | 8 | lgallon | Done 17 Novembre |
| -  | 84  | -  | **Tester l'api pour les tasks** Tester toutes les routes /tasks dans server/test/tasks.test.js. Il faudra utiliser le serveur de test (npm run start_testing_server). | 8 | nlesne | Done (04/12/20)  |
| -  | 85  | -  | **Tester l'api pour les sprints** Tester toutes les routes /sprints dans server/test/sprints.test.js. Il faudra utiliser le serveur de test (npm run start_testing_server). | 8 | | |
| 30 | 88 | 87 | **Tester l'api pour les tests** Tester toutes les routes /tests dans server/test/tests.test.js. Il faudra utiliser le serveur de test (npm run start_testing_server). | 5 |  | |
| 06 | 89 | - | **Voir la page d'accueil**. créer un composant `home.vue` pour afficher le titre, la description et les participants du projet.  | 5 | - | |
| 07 | 90 | 89 | **Modifier la page d'accueil**. Quand le bouton "édition" est activé, lorsqu'on clique sur la page, le même formulaire pour la création de projet sera affiché mais avec les champs pré-remplie.  | 3 | ldauriac/lgallon | done 6 dec |
| 07 | 91 | - | **API modifier/supprimer/recupérer un projet**. créer les routes `api/projects/:id` pour modifier, supprimer et récupérer un projet. (titre, description, liste de participants, et liste d'id de US) ) | 5 | nlesne | done 6 dec |
| 07 | 92| - | **Tester l'api pour les projets**. Créer les tests pour la route /projects | 5 | - | |
| 05 | 93 | - | **Création d'un projet**. Créer un composant `projectForm.vue`. Quand le bouton création est actionné alors un formulaire (https://buefy.org/documentation/modal#programmatic) avec trois champs: le titre, la description et les participants | 3 | ldauriac/lgallon | done 6 dec |
| 05 | 94 | - | **API d'un projet**. Créer la base de donnée pour un projet et la route `api/projects`. | 5 | nlesne | done 6 dec |
| 03 | 95 | - | **voir la liste des projets**. Créer un composant `projects.vue`. Sur la page, un bouton pour créer un projet est affiché et la liste de tous les projets créer est affichés. | 3 | ldauriac/lgallon | done 6 dec |
| 03 | 96 | - | **Créer un composant projet**. Créer un composant `project.vue`. Il permet d'afficher le titre et l'id du projet. | 3 | ldauriac/lgallon | done 6 dec |
| 03 | 97 | 96 | **Survole d'un composant projet**. Quand la souris survole le projet, la description du projet s'affiche dans une bulle(tooltip). | 3 | - | |
| 04 | 98 | 95 | **supprimer un projet**. Lorsque le mode édition est activé, quand on clique sur le projet, on peut supprimer le projet.| 5 | ldauriac/lgallon | done 6 dec |
| 08 | 99 | 90 | **ajouter un participant au projet**. Lorsque le mode édition est activé, quand on clique sur le bouton pour ajouter un participant, un formulaire s'affiche et on peut rajouter un ou des participants.| 5 | ldauriac/lgallon | done 6 dec |
| 09 | 100 | 99 | **supprimer un participant au projet**. Lorsque le mode édition est activé, quand on clique sur le bouton pour supprimer un participant et une boite de dialogue s'ouvre pour confirmer la supression du participant, la liste des participants se met à jour.| 5 | ldauriac/lgallon | done 6 dec |
| 10 | 100 | 89 | **Voir la progression d'un sprint**. Sur la page d'accueil, il y a une barre de progression des sprints (https://buefy.org/documentation/progress).| 5 | - | |
| 6, 7, 8, 9, 10 | 102 | - | **Le composants des US doit avoir accès au projet selectionné** De la même manière que l'on a fait pour edit, il faut une variable project_id que le composant peut accéder | 3 | lgallon | 5 dec |
| 6, 7, 8, 9, 10 | 103 | 102 | **Mettre à jour la suppression / création des US pour être compatible avec le projet** utiliser la variable project_id pour ajouter / supprimer une US d'un projet (en plus de la supprimer tout court). Parce que les projets ont un champ avec la liste des US. | 5 | lgallon | in progress |
| 18 | 104 | - | **Barre de recherche pour les tâches** voir la description de l'US pour les détails. Faire attention lors de la modification de la liste des tâches affichées, elle est peut etre utilisée pour autre chose (il faudrait créer une nouvelle liste displayedTasks qui est une copie de tasks) | 8 | | |
| 35 | 105 | 91 | **API pour récupérer les tests d'un projet** voir la description de l'US pour les détails. Le but est d'ajouter une route qui prend en paramètre l'id du projet et retourne tous les tests du projet | 5 | | |
| - | 106 | - | **Créer les tests E2E** créer les tests E2E pour les tâches (description gherkin et implementation selenium) | 8 | | |
| - | 107 | - | **Créer les tests E2E** créer les tests E2E pour les issues (description gherkin et implementation selenium) | 8 | lgallon | Done 14 dec |
| - | 108 | - | **Créer les tests E2E** créer les tests E2E pour les tests (description gherkin et implementation selenium) | 8 | | |
| - | 109 | - | **Créer les tests E2E** créer les tests E2E pour le kanban (description gherkin et implementation selenium) | 8 | | |
| - | 110 | - | **Release automatique** créer un système de release automatique avec github actions | 5 | | |
| 41 | 111 | 89 | **Suivi de la progression du sprint** ajouter un champ date_done (ou qqch du genre) aux US qui contient la date de quand toutes ses tâches sont passées à done. Il faudra donc faire un check lorsqu'on passe une tâche à donne pour vérifier si toutes les tâches d'une US ont été done. Pareil de l'autre sens. Si on déplace une tâche de done à autre chose, il faut vérifier si l'US était dans l'état done, si elle l'était, alors on la passe à une progress (en gros on met le champ date done à null) | 5 | lgallon | done 5 dec |
| 41 | 112 | 111 | **Générer le burnup chart sur la page projet** générer la burnup chart du projet en cours sur la page du projet grâce au champ "date_done" de chaque US. Il faut récupérer le sprint en cours s'il y en a un (on peut récupérer les dates de début et de fin d'un sprint). Et on a l'information de quand chaque US est passé à done et de toutes les US dans un projet. On pourra surement utiliser chart.js pour générer le graphe (pas sûr de ça, mais c'est une possibilité) | 8 | lgallon | done 5 dec |
| -  | 113  | -  | **Mettre à jour le style en suivant notre chart graphique.** Changer le css des composants pour utiliser notre charte graphique. Voir les maquettes pour savoir quelles couleurs utiliser où | 5 | |  |
