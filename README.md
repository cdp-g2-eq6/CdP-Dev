# Projet de CdP 2020-2021

## Description
Ce projet vise à créer une application web permettant de gérer la production logicielle (en agile).

## Equipe:
  - **GALLON** Lilian
  - **DAURIAC** Lucile
  - **LESNÉ** Nathan
  - **SIMBA** Florian

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

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| 03 | **En tant que** chef de projet **je souhaite** pouvoir créer un nouveau projet lorsque je suis sur la page d'accueil et que le mode edition est activé **afin d**'avoir la possibilité de gérer plusieurs projets sur le même site. **Pour cela**, un bouton "+" est affiché en dessous de la liste des projets déjà créés. Lorsque je clique sur ce bouton, un champ de texte limité en caractères s'ouvre et me permet d'entrer le nom du nouveau projet. Lorsque je valide, en appuyant sur entrée ou sur le bouton validé qui est affiché à côté de ce champ de texte, un nouveau projet est créé avec le nom que je lui ait donné. Il apparait alors dans la liste des projets déjà créés. Si j'annule, en cliquant sur le bouton annuler qui est affiché à côté de ce champ de texte ou en appuyant sur la touche echap, alors le champ de texte devient tout simplement un texte (non editable donc) et aucun nouveau projet n'est créé. Le champ de texte disparait dans les deux cas et laisse apparaître le bouton "+" (qui était caché lors de l'édition) | 5 | Maximale |
| 04 | **En tant que**' chef de projet **je souhaite** pouvoir supprimer un projet déjà créé lorsque je suis sur la page d'accueil et que le mode edition est activé **afin d**'avoir la possibilité de supprimer un projet terminé ou inactif. **Pour cela**, un bouton "supprimer" (qui peut simplement être un icone) est affiché à côté de chaque projet dans la liste des projets créés. Lorsque je clique sur ce bouton, une boite d'alerte me demande de confirmer mon action. Si je valide, le projet est immédiatement supprimé et disparait de la liste des projets. Si je ne valide pas cette alerte (donc la suppression), le projet n'est pas supprimé, et tout reste tel quel.  | 3 | Normale |
| 05 | **En tant qu**'utilisateur **je souhaite** pouvoir accéder à un projet déjà créé lorsque je suis sur la page d'accueil **afin de** gérer ou simplement consulter un projet. **Pour cela**, il me suffit de cliquer sur un des projets listés sur la page d'accueil. Je suis alors redirigé vers la page d'accueil du projet. | 2 | Maximale |

### Page d'accueil d'un projet

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| 06 | **En tant que** utilisateur **je souhaire** avoir un aperçu simple du projet lorsque je suis sur sa page d'accueil **afin d'** avoir un peu de contexte vis-à-vis de celui-ci, de voir les participants, et d'y naviguer simplement. **Pour cela**, la barre de navigation (affichée sur la gauche) affiche plusieurs liens: backlog et tâches. La barre de navigation affiche aussi sprint 1, sprint 2, jusqu'à n en fonction des sprints qui ont été créés au sein du projet. Quant au contenu de la page, il m'est possible de lire le nom du projet, sa description, et la liste des participants. | 2 | Maximale |
| 07 | **En tant que** chef de projet **je souhaite** modifier les détails d'un projet lorsque je suis sur sa page d'accueil **afin d**'apporter des précisions sur ce projet. **Pour cela**, si le mode edition est activé, il m'est possible de modifier le titre en cliquant dessus. Le texte se transforme alors en champ de texte et je peux éditer le titre. Lorsque je clique sur ma touche "entrer" ou si j'appuie sur le bouton valider qui est à côté de ce champ de texte, alors, si le titre respecte un nombre maximum de caractères, la modification est appliquée; autrement, la modification est annulée et le champ de texte devient simplement un texte (non editable donc). Même chose lorsque j'appuie sur le bouton annuler ou sur la touche echap de mon claver (la modification est annulée). Le comportement attendu est le même lorsque je clique sur la description. Le champ de texte est cependant un champ de texte multiligne au lieu d'être un champ de texte simple. | 3 | Normale |
| 08 | **En tant que** chef de projet **je souhaite** ajouter des participants au projet **afin de** leur attribuer des tâches durant celui-ci. **Pour cela**, et si le mode edition est activé, il m'est possible de cliquer sur un bouton "+" en dessous de la liste des participants. Un champ de texte s'affiche alors et me permet d'enter le nom d'une personne. Lorsque je valide (en appuyant sur la touche entrer ou en cliquant sur le bouton valider), le participant est ajouté au projet et est affiché à la liste des participants du projet. Si j'annule (en appuyant sur la touche entrée ou en cliquant sur le bouton annuler), le participant n'est pas ajouté au projet et la liste des participants du projet reste la même. Le champ de texte disparait dans les deux cas et laisse apparaître le bouton "+" (qui était caché lors de l'édition) | 3 | Maximale |
| 09 | **En tant que**' chef de projet **je souhaite** pouvoir supprimer un participant lorsque je suis sur la page d'accueil du projet et que le mode edition est activé **afin de** pouvoir gérer les participants. **Pour cela**, un bouton "supprimer" (qui peut simplement être un icone) est affiché à côté de chaque participant dans la liste des participants du projet. Lorsque je clique sur ce bouton, une boite d'alerte me demande de confirmer mon action. Si je valide, le participant est immédiatement supprimé et disparait du projets. Tout les tâches qui lui étaient assignées restent assignées à lui car il a pu travailler avant d'être retiré du projet. Si je ne valide pas cette alerte (donc la suppression), le participant n'est pas supprimé, et tout reste tel quel. | 3 | Normale |

### Page Backlog d'un projet

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| - | - | - | - |

### Page Tâches d'un projet

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| - | - | - | - |

### Page SprintX d'un projet

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| - | - | - | - |


### à faire

| ID | Fonctionnalité | Difficulté | Importance |
|----|----------------|------------|------------|
| 06 | En tant qu'utilisateur je souhaite créer une issue | Facile | Elevée |
| 07 | En tant qu'utilisateur je souhaite modifier une issue | Moyenne | Elevée |
| 08 | En tant qu'utilisateur je souhaite supprimer une issue | Facile | Elevée |
| 09 | En tant qu'utilisateur je souhaite créer une tâche | Facile | Elevée |
| 10 | En tant qu'utilisateur je souhaite lier une tâche à une issue | Facile | Elevée |
| 11 | En tant qu'utilisateur je souhaite modifier une tâche | Moyenne | Elevée |
| 12 | En tant qu'utilisateur je souhaite supprimer une tâche | Facile | Elevée |
| 13 | En tant qu'utilisateur je souhaite ajouter une durée aux tâches | Facile | Elevée |
| 14 | En tant qu'utilisateur je souhaite créer un sprint | Facile | Elevée |
| 15 | En tant qu'utilisateur je souhaite ajouter des tâches aux sprints | Moyenne | Elevée |
| 16 | En tant qu'utilisateur je souhaite déplacer les tâches dans les sections (Todo, In progress, Testing, Done) du sprint | Difficile | Elevée |
| 17 | En tant qu'utilisateur je souhaite supprimer des tâches du sprint | Facile | Elevée |
| 18 | En tant qu'utilisateur je souhaite consulter l'état global du projet afin de connaître son évolution | Facile | Moyenne |
| 19 | En tant qu'utilisateur je souhaite ajouter des dépendances à une tâche afin d'organiser le travail | Difficile | Moyenne |
| 20 | En tant qu'utilisateur je souhaite associer un participant à une tâche afin de répartir le travail| Difficile | Moyenne |
| 22 | En tant qu'utilisateur je souhaite avoir une liste des projets déjà créés afin de choisir sur lequel travailler | Moyenne | Faible |
| 23 | En tant qu'utilisateur je souhaite générer le diagramme de Pert | Moyenne | Faible |
| 24 | En tant qu'utilisateur je souhaite avoir un calendrier afin d'organiser le travail | Moyenne | Faible |