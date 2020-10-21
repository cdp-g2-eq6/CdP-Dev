# Projet de CdP 2020-2021

## Description
Ce projet vise à créer une application web permettant de gérer la production logicielle (en agile).

## Equipe:
  - **GALLON** Lilian
  - **DAURIAC** Lucile
  - **LESNÉ** Nathan
  - **SIMBA** Florian

## Charte graphique:

- Couleurs: [Nord](https://www.nordtheme.com/)
- Police: [Rubik](https://fonts.google.com/specimen/Rubik)

## Issues:

Elles sont séparées par catégories pour être plus simple à lire.

- Difficulté (echelle de comparaison): 2, 3, 5, 8, 13, 21
- Importance: maximale (doit être fait en priorité), normale, minimale (pourra être réalisée quand on aura le temps)

### Général

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| 01 | **En tant qu**'utilisateur **je souhaite** pouvoir consulter le site web sans risquer de modifier ce dernier **afin de** rendre plus agréable la navigation du site. **Pour cela**, je peut cliquer sur un bouton qui est sur la barre de navigation (tout en bas) et qui permet d'activer ou de desactiver le mode d'édition. Il est desactivé par défaut. | 2 | Maximale |
| 02 | **En tant qu**'utilisateur **je souhaite** pouvoir naviger sur le site web grâce à une barre de navigation **afin de** rendre plus rapide la navigation au sein du site. **Pour cela**, le site web a une barre de navigation sur le côté gauche. Il m'est possible de la cacher et de la montrer en cliquant sur un bouton accordeon. Le titre de cette barre de navigation correspond au nom du projet selectionné. Si aucun projet n'a encore été selectionné (je suis donc sur la page d'accueil), alors le titre est "Selectionnez un projet". | 2 | Maximale |

### Page d'accueil du site

![maquette](https://db3pap007files.storage.live.com/y4mtjlDNu0vNYJ8F12kUyWkKV2vL3JrobPRBllLXzncVasMM2UfYgZLpBIxy_nQOO21MldWYXtH8eOs-OWhv8GaL0o8MBQGwT9XobyKA_M8Gy9wkH3X4IzX6oDEpIBu6azDjKJoh_xHxJ_nXC06bphRnAiXtIqJU8VFtp5xD_2lnWeKSYdTnKORj_L_nifLWLIhiAJZgN5_HyPioZpXQ9KCdg/project_selection.jpg?psid=1&width=400&height=183)

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| 03 | **En tant que** chef de projet **je souhaite** pouvoir créer un nouveau projet lorsque je suis sur la page d'accueil et que le mode edition est activé **afin d**'avoir la possibilité de gérer plusieurs projets sur le même site. **Pour cela**, un bouton "+" est affiché en dessous de la liste des projets déjà créés. Lorsque je clique sur ce bouton, un champ de texte limité en caractères s'ouvre et me permet d'entrer le nom du nouveau projet. Lorsque je valide, en appuyant sur entrée ou sur le bouton validé qui est affiché à côté de ce champ de texte, un nouveau projet est créé avec le nom que je lui ait donné. Il apparait alors dans la liste des projets déjà créés. Si j'annule, en cliquant sur le bouton annuler qui est affiché à côté de ce champ de texte ou en appuyant sur la touche echap, alors le champ de texte devient tout simplement un texte (non editable donc) et aucun nouveau projet n'est créé. Le champ de texte disparait dans les deux cas et laisse apparaître le bouton "+" (qui était caché lors de l'édition) | 5 | Maximale |
| 04 | **En tant que**' chef de projet **je souhaite** pouvoir supprimer un projet déjà créé lorsque je suis sur la page d'accueil et que le mode edition est activé **afin d**'avoir la possibilité de supprimer un projet terminé ou inactif. **Pour cela**, un bouton "supprimer" (qui peut simplement être un icone) est affiché à côté de chaque projet dans la liste des projets créés. Lorsque je clique sur ce bouton, une boite d'alerte me demande de confirmer mon action. Si je valide, le projet est immédiatement supprimé et disparait de la liste des projets. Si je ne valide pas cette alerte (donc la suppression), le projet n'est pas supprimé, et tout reste tel quel.  | 3 | Normale |
| 05 | **En tant qu**'utilisateur **je souhaite** pouvoir accéder à un projet déjà créé lorsque je suis sur la page d'accueil **afin de** gérer ou simplement consulter un projet. **Pour cela**, il me suffit de cliquer sur un des projets listés sur la page d'accueil. Je suis alors redirigé vers la page d'accueil du projet. | 2 | Maximale |

### Page d'accueil d'un projet

![maquette](https://db3pap007files.storage.live.com/y4mK-XcfLqxR6VnjFJJ62-fSblvCiX-Q6sNcdksXbkCHy_sMbcLW39pHpwIXnCgL-k9bGVZzEC_LNoF4FvqtBk9lqyiDB61fPdjbgIO3jUy-SeL4RxcmIfRWjuZJckOT5wkJiKVUo1kjgWmYTRQUd8j_o1ziHg8uWoGd9eIH0185ZPf_laLXGDt82DBp6LBp3BhehGllrhKtUoDnau-YX-RDQ/homepage.jpg?psid=1&width=400&height=183)

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| 06 | **En tant que** utilisateur **je souhaire** avoir un aperçu simple du projet lorsque je suis sur sa page d'accueil **afin d'** avoir un peu de contexte vis-à-vis de celui-ci, de voir les participants, et d'y naviguer simplement. **Pour cela**, la barre de navigation (affichée sur la gauche) affiche plusieurs liens: backlog et tâches. La barre de navigation affiche aussi sprint 1, sprint 2, jusqu'à n en fonction des sprints qui ont été créés au sein du projet. Quant au contenu de la page, il m'est possible de lire le nom du projet, sa description, et la liste des participants. | 2 | Maximale |
| 07 | **En tant que** chef de projet **je souhaite** modifier les détails d'un projet lorsque je suis sur sa page d'accueil **afin d**'apporter des précisions sur ce projet. **Pour cela**, si le mode edition est activé, il m'est possible de modifier le titre en cliquant dessus. Le texte se transforme alors en champ de texte et je peux éditer le titre. Lorsque je clique sur ma touche "entrer" ou si j'appuie sur le bouton valider qui est à côté de ce champ de texte, alors, si le titre respecte un nombre maximum de caractères, la modification est appliquée; autrement, la modification est annulée et le champ de texte devient simplement un texte (non editable donc). Même chose lorsque j'appuie sur le bouton annuler ou sur la touche echap de mon claver (la modification est annulée). Le comportement attendu est le même lorsque je clique sur la description. Le champ de texte est cependant un champ de texte multiligne au lieu d'être un champ de texte simple. | 3 | Normale |
| 08 | **En tant que** chef de projet **je souhaite** ajouter des participants au projet **afin de** leur attribuer des tâches durant celui-ci. **Pour cela**, et si le mode edition est activé, il m'est possible de cliquer sur un bouton "+" en dessous de la liste des participants. Un champ de texte s'affiche alors et me permet d'enter le nom d'une personne. Lorsque je valide (en appuyant sur la touche entrer ou en cliquant sur le bouton valider), le participant est ajouté au projet et est affiché à la liste des participants du projet. Si j'annule (en appuyant sur la touche entrée ou en cliquant sur le bouton annuler), le participant n'est pas ajouté au projet et la liste des participants du projet reste la même. Le champ de texte disparait dans les deux cas et laisse apparaître le bouton "+" (qui était caché lors de l'édition) | 3 | Maximale |
| 09 | **En tant que** chef de projet **je souhaite** pouvoir supprimer un participant lorsque je suis sur la page d'accueil du projet et que le mode edition est activé **afin de** pouvoir gérer les participants. **Pour cela**, un bouton "supprimer" (qui peut simplement être un icone) est affiché à côté de chaque participant dans la liste des participants du projet. Lorsque je clique sur ce bouton, une boite d'alerte me demande de confirmer mon action. Si je valide, le participant est immédiatement supprimé et disparait du projets. Tout les tâches qui lui étaient assignées restent assignées à lui car il a pu travailler avant d'être retiré du projet. Si je ne valide pas cette alerte (donc la suppression), le participant n'est pas supprimé, et tout reste tel quel. | 3 | Normale |
| 10 | **En tant que** chef de projet **je souhaite** avoir un aperçu de l'avancée du projet **afin de** gérer correctement mes ressources. **Pour cela**, sur la page d'accueil d'un projet, je peux consulter l'état d'avancement du sprint en cours avec deux barres de progressions et le titre qui indique le temps avant la fin du sprint en jours. Il y a une barre de progression pour les issues (users stories). Dedans, est affiché la progression en pourcentage ainsi que le nombre de issues complétées sur le nombre total d'issues attribuées à ce sprint. Je peux aussi consulter une autre barre de progression avec le pourcentage de tâches dans l'état "done", le pourcentage de tâches dans l'état "testing", et le pourcentage de tâches dans l'état "in progress". Chacune de ses progressions sont dans une couleur différente, qui sont un dégradé de la couleur d'accent du site. Je peux aussi consulter un court résumé de chaque sprint terminé avec la date de fin et un lien vers la release. | 5 | Normale |
| 11 | **En tant que** chef de projet **je souhaite** pouvoir ajouter un nouveau sprint **afin de** gérer mon projet lors de celui ci. **Pour cela**, lorsque le mode edition est activé, je peux appuyer sur le bouton "Nouveau Sprint" en dessous du dernier sprint créé dans la barre de navigation, ou en dessous de "Tâches" si aucun sprint n'a encore été créé. Après avoir cliqué sur nouveau sprint, un sprint est créé dont le numéro suit le numéro du dernier sprint créé (si aucun, alors le premier sera 1). Je suis ensuite redirigé vers la page du sprint avec les valeurs par défaut. | 3 | Maximale

### Page Backlog d'un projet

![maquette](https://db3pap007files.storage.live.com/y4m4O5LDRs02MbpcbwXEsENgIYvGCAz0Xx7W-Dkd8qouawkBrP8uNoN9K_9MvFacvrKPi6wp8Oqj6SED0TKm5WzDTIcc51lcBnDvWPK3OjPzrLBZeGvwNG_mkF4kcwiz2hOUE0WfrKAcUfRl-o3jXiSDizsxaa-XHYm6YVWZxf3pYaidrWlbizWLhPAp2GGcJjwjdj0KqU1I368L7dwO32Kxg/backlog.jpg?psid=1&width=400&height=183)

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| 12 | **En tant qu** utilisateur **je souhaite** pouvoir visualiser les US déjà créées **afin d**'avoir un aperçu des features prévues pour le projet. **Pour cela**, lorsque je suis sur la page "Backlog", je vois la liste des US avec, pour chacune, leur id, titre, description, difficulté et importance. La difficulté et l'importance sont visualisables avec des couleurs. Un dégradé vers / rouge permet de rapidement visualiser l'importance et la difficulté d'une US. Lorsque je met mon curseur sur une US, une bulle d'information est affichée et m'indique les tâches liées à cette US. Même chose pour l'importance et la difficulté, qui montrent la valeur brute de chacunes: nombre fibbonachi de 2 à 21 et minimale/normale/maximale (respectivement). | 3 | Maximale |

Ce qu'il manque:
- Mettre à jour une US (tout sauf id)
- Créer une US
- Supprimer une US (en supprimer une ne supprime pas les tâches liées, ça delink juste ses tâches liées)
- Possibilité de cliquer / deposer une US créée dans un des sprints

### Page Tâches d'un projet

![maquette](https://db3pap007files.storage.live.com/y4m05oTV_fnmmgt0ISb1QX0t3Ei0JUc3RegDs7aznmbszxt1fuZlwsb4ZqpRJsfVQEBTDgVf9nTnDK4r3-c4C1bUac3vOPapwMIaUDybFwSzFtiqKDsqUphqFVdcXQQMFFuzVdf4C7KdJPY4KJPcchR95TypoXy04ve_0v6rczpAiCEKjNk33_WPBzLUBWMhG9NAl6Um8iB1xfxOYbOdTR2Sg/tasks.jpg?psid=1&width=400&height=183)

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| - | - | - | - |

Ce qu'il manque:
- Afficher liste des taches (id, titre, us liée(s), description, dod, dépendances, difficulté, importance, cliquer dessus affiche le détail)
- Mettre à jour une tache (tout sauf id)
- Créer une tâche
- Supprimer une tâche

### Page SprintX d'un projet

![maquette](https://db3pap007files.storage.live.com/y4mcUveWue5Y7Fb_DDRlf1ABdmGRWE_uz_egdS7DBxAzf1ZudkTSgcBqw1wrtpvOy-4XeIaIxqDMT43JXIw2BNsDGtNmx6x2PZs3Kdso2yvqQMq8rSeNBevDxipf2I7iMLDmmghkl5YqpBIt4Ew6kT_NzT_kK-gyfyrAn9Fu3S_r3agT1sf5kmX8c4zP5LsgVrXReTMYECssSj5HxCxGe2HZQ/sprint_x.jpg?psid=1&width=400&height=183)

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| - | - | - | - |

Ce qu'il manque:
- Afficher le kanban avec les 4 parties et les taches associées ) ces parties
- Cliquer / déposer les tâches au sein du kanban
- Importer des US importe automatiquement les tâches liées dans la partie todo
- Afficher la liste des US en bas
- Possibilité de définir la date de fin et de début d'un sprint
- Possibilité d'éditer une tâche (pour par ex ajouter un participant)

### Divers

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| - | - | - | - |

Ce qu'il manque:
- En tant qu'utilisateur je souhaite générer le diagramme de Pert
- En tant qu'utilisateur je souhaite avoir un calendrier afin d'organiser le travail