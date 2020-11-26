## Guide de release:

*Vous aurez besoin de docker compose pour effectuer le déploiement.*

- Téléchargez la version voulue sur [https://github.com/cdp-g2-eq6/CdP-Dev/releases](https://github.com/cdp-g2-eq6/CdP-Dev/releases)
- Extraire le fichier .zip et aller à la racine du projet
- Aller dans /scripts et executer:
  - Windows: `./run_docker.bat`
  - Linux/MacOS: `./run_docker.sh`
- Le serveur sera accessible sur le port 3000 de votre machine
- Le site web sera accessible sur le port 8080 (ou 8081, 8082 en fonction de si les ports sont libres ou non) de votre machine