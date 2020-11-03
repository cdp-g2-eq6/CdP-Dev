## Conventions

Trucs à valider:
- Commit en angalis ou français?
- Doc en anglais ou français?

### Utilisation de git et github

**Initialisation dépôt:**

```
git init

git remote add origin git@github.com:cdp-g2-eq6/CdP-Dev.git
OU
git remote add origin https://github.com/cdp-g2-eq6/CdP-Dev.git

git pull origin main
```

**Développement d'une tâche:**

Pour développer une nouvelle tâche, il faut se mettre sur la dernière version de la branche main du dépôt de développement.

```
git checkout main
git pull origin main
```

> Il ne doit pas y avoir de conflit. **Ne pas faire de merge**. Si on veut faire des modifications, on commit et push en expliquant ce qu'on a fait.

Créer une branche en fonction de la tâche sur laquelle on va travailler. Faire attention à ce que personne ne travaille déjà dessus.

```
git checkout -b task-ID
```

Ensuite, envoyer la branche sur le dépôt pour notifier aux autres qu'on travaille dessus

```
git push origin task-ID
```

**Commits:**

Les commits doivent être en anglais et court. Ne pas faire de géant commits (commit qui ajoute plusieurs fonctions non liées entre elles par exemple). De cette manière il sera beaucoup plus simple d'analyser l'historique des modifications. S'il est trop compliqué d'écrire un message de commit court, c'est parce que trop de choses ont été modifiées en même temps.

**Pull request:**

Lorsque qu'on pense avoir terminé une tâche, on va sur la page github du dépôt et on créé une pull request de notre branche (`task-ID`) vers `main`. L'intégration continue va faire tous les checks nécessaire, et quelqu'un pourra faire une review et apporter un feedback. Lorsque la pull request est validée par les reviewers, il sera possible de merge les modifications sur `main`.

### Documentation

Chaque nouvelle fonction doit être documentée (auteur, date, résumé, paramètres en entrée, paramètres en sortie). Cette documentation sera rédigée en anglais.

### Conventions de developpement

Les conventions sont appliquées par le linter fourni. Il faut donc faire en sorte que l'IDE prenne en compte les conventions dictées par le linter. L'intégration continue va échouer si les conventions ne sont pas suivies.