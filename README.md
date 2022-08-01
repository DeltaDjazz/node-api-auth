# node-api-auth
Le projet ** NODEJS API AUTH** est une API REST avec authentification 

## Initialisation
### 1) Cloner le projet, installer les dépendances et vérifier les routes en local

S'assurer d'avoir  **node > v10** d'installé sur son OS.
Ouvrir un terminal, se positioner dans le repertoire où l'on souhaite installer le projet et faire : 
``` 
git clone https://github.com/deltadjazz/nodejs-api-auth
cd nodejs-api-auth
npm install
```
Créer à la racine du projet un fichier .env et y ajouter le **TOKEN_SECRET**, voir l'exemple ci dessous
```
TOKEN_SECRET = JFIOEFZOF98784HXXXXXXX
```

Puis pour lancer l'api retourner dans le terminal et faire :
``` 
npm start
``` 
Ouvrez votre navigateur et vérifier que l'API marche en accedant à l'url :
`http://localhost:5000/api`   


## Authentification

Une authentification est nécessaire pour accéder à la route `http://localhost:5000/api/project` 
pour celà il faut envoyer en Post au format json les données suivantes à l'url `http://localhost:5000/api/common/auth/authorize`
```
'name':'webmaster',
'password': 'kawabunga'
```
l'api retourne alors l'accessKeyId, l'accessSecretKey et un token valide au format json
![autentification et récupération du token](/docs/authent.png)

## Autorisation
Acceder maintenant en GET à l'url `http://localhost:5000/api/project` en envoyant dans le header 
- la clé **HEADERS** avec pour valeur l'**accesKeyId** et l'**accessSecretKey** séparé d'un espace
- la clé **AUTH** contenant le **token** au format Bearer
![autorisation](/docs/autorisation.png)