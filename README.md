
# Projet : WatchSpace

WatchSpace est un projet de fin d'année réalisé dans le cadre de notre formation à la Coding Factory visant à créer une plateforme de partage de vidéos en ligne. 


## Dépendances

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)


## Technologies utilisées

- Serveur: NodeJS - Framework Express

- Client: ReactJS - Framework NextJS

- Framework CSS - Material UI

- Base de données: MySQL - ORM Sequelize


## Installation

Installer yarn

```bash
  npm install --global yarn
```

Check version
```bash
  yarn --version
```

Cloner le projet

```bash
  git clone https://github.com/supercrocman/L1_ALT_CLONE_YOUTUBE.git
```

Aller dans le dossier du projet

```bash
  cd L1_ALT_CLONE_YOUTUBE
```


Installer les dépendances dans le dossier frontend puis lancer avec yarn

```bash
  cd frontend
  yarn
```

Installer les dépendances dans le dossier backend puis lancer avec yarn

```bash
  cd backend
  yarn
```


## Lancement

Dans le dossier frontend
```bash
  cd frontend
  yarn dev
```
Dans le dossier backend
```bash
  cd backend
  yarn dev
```


## Production

Build

Dans le dossier frontend
```bash
  cd frontend
  docker build -t nextjs-docker .
```
Dans le dossier backend
```bash
  cd backend
  docker build -t express-docker .
```

Lancement

Dans le dossier frontend
```bash
  cd frontend
  sudo docker run -p 80:3000 nextjs-docker
```
Dans le dossier backend
```bash
  cd backend
  sudo docker run -p 3001:3001 express-docker
```
## Crédit

- [@supercrocman](https://github.com/supercrocman/)
- [@alexsv](https://github.com/alxesv/)
- [@kvong92](https://github.com/kvong92/)
- [@DevMehd](https://github.com/DevMehd/)
- [@esemedo](https://github.com/esemedo/)
- [@leandre0](https://github.com/leandre0/)
- [@Ktghrn](https://github.com/Ktghrn/)
- [@CharlesHenrynoah](https://github.com/CharlesHenrynoah/)
- [@Elmani335](https://github.com/Elmani335/)
