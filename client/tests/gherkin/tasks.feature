Feature: Fonctionnalités liées aux tasks
    Fonctionnalités diverses et variées liées à la gestion des tasks

    Scenario: L'utilisateur crée une nouvelle task
        Given L'utilisateur est sur la page tasks d'un projet
        When Il clique sur le bouton "Mode édition"
        Then Un bouton "+" est affiché
        And Il clique sur une le bouton "+"
        Then Un formulaire s'affiche
        Then Il remplit chacun des champs
        And Il clique sur valider
        Then Le formulaire se ferme
        And La nouvelle task est affichée

    Scenario: L'utilisateur modifie une task
        Given L'utilisateur est sur la page tasks d'un projet
        When Il clique sur le bouton "Mode édition"
        And Il clique sur une task
        Then Un formulaire s'affiche
        Then Il remplit chacun des champs
        And Il clique sur valider
        Then Le formulaire se ferme
        And L'task est modifiée

    Scenario: L'utilisateur supprime une task
        Given L'utilisateur est sur la page tasks d'un projet
        When Il clique sur le bouton "Mode édition"
        And Il clique sur une task
        Then Un formulaire s'affiche
        Then Il clique sur supprimer
        Then Une popup s'affiche
        Then Il clique sur confirmer
        Then L'task n'est plus affichée

    Scenario: L'utilisateur visualise les informations d'une task
        Given L'utilisateur est sur la page tasks d'un projet
        And Il y a au moins une task sur la page
        Then Il doit pouvoir voir l'ID, le titre, la description, et le cout
