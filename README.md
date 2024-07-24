# myFlower_back

Site web qui permet aux utilisateurs d'ajouter les différentes plantes de leur appartement/maison et de suivre les besoins en eau de chacune. 

## installation 

```bash
git clone https://github.com/sophianABN/myFlower_project

// installer les dépendances
npm i 
```

## .env

Pour que le projet fonctionne il faudra créer un fichier .env pour le front à la racine du projet avec API_URL=votre_base_api, et un fichier .env pour le back dans le dossier server qui contient MONGODB_URI=votre_connexion_a_mongo, JWT_SECRET=un_code_secret, et OPENAI_API_KEY=votre_cle_api_openai.

### lancer le projet

```bash
// lancer le front depuis le dossier racine du projet
npm run dev

// lancer le back
cd server
// si nodemon installé
npm run dev
// sinon
npm run start
```

