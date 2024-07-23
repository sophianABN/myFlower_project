***DOC API***

Le backend est un serveur Node.js qui utilise les dépendances suivantes :

   bcryptjs: "^2.4.3", pour crypter le mot de passe en base de donnée

   cors: "^2.8.5", gestion des requetes avec le front

   dotenv: "^16.4.5", gestion .env

   express: "^4.19.2", route API

   jsonwebtoken: "^9.0.2", JWT token pour l'authtification

   mongoose: "^8.5.1", gestion de la base de donnée

   multer: "^1.4.5-lts.1" gestion de l'upload images


**DATABASE**

La base de donnée est MongoDB 

Nous avons 2 Collections : USERS et PLANTS

Pour la collection USERS nous utilisons le model suivant "User.js" 
-email 
-password
-pseudo

Pour la collection PLANTS nous utilisons le model suivant "Plant.js" 
-user (objectid)
-name
-species
-purchaseDate
-image
-description
-waterNeeds {quantity,frequency}
-lastWatered
-wateringHistory


**ROUTES**

Les requetes sont faite aux endpoints suivant :

- INSCRIPTION : /api/auth/register
 requete POST {{api_url}}/api/auth/register qui est appelé coté client sur la page /register lors du formulaire d'inscription. 
 La requete require email, password et pseudo. 
 L'utilisateur est enregistré en base de donné, un JWT TOKEN lui est attribué et il est redirigé sur /dashboard

- CONNEXION : /api/auth/login
requete POST {{api_url}}/api/auth/login qui est appelée coté client sur la page /login lors de la connexion. 
La requete require email et password.
Un JWT TOKEN est attribué à l'utilisateur et il est redirigé sur /dashboard

- PROFILE : /api/user/profil
requete GET {{api_url}}/api/user/profile qui est appelé coté client sur la page /dashboard.
Le JWT TOKEN est requis.
La requete renvoi les informations du profile utilisateurs et les affiche sur le dashboard.

- AJOUT PLANTE : /api/plants/add
requete POST {{api_url}}/api/plants/add qui est appelé sur le composant AddPlant qui est sur /dashboard.
Le JWT TOKEN est requis.
L'utilisateur rempli le formulaire d'ajout de plante avec les informations suivante:
name
species
description
purchaseDate
waterNeeds[quantity]
waterNeeds[frequency]
image
La plante est ajouté en base de donné. 

- AFFICHAGE DES PLANTES : /api/plants
requete GET {{api_url}}/api/plants qui est appelé sur la page /dashboard
Le JWT TOKEN est requis.
Toute les plantes de l'utilisateur enregistrées en base de donnée sont affichées sous forme de card.

- AFFICHER LA PAGE D'UNE PLANTE : /api/plants/{{plant_id}}
requete GET {{api_url}}/api/plants/{{plant_id}} qui est appelé sur la page type de la plante que l'utilisateur consulte.
Le JWT TOKEN est requis.
La page affiche toute les information relative à la plante en question.

- ARROSAGE : }/api/plants/{{plant_id}}/water
requete POST {{api_url}}/api/plants/{{plant_id}}/water qui est appelé sur la page type de la plante consulté par l'utilisateur.
Le JWT TOKEN est requis.
La page affiche l'historique des arrosage