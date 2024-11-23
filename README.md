# Installation

* Télécharger la dernière version de l'image mongo (docker) : `docker pull mongo:latest`
* Créer un conteneur : `docker run -d mongo`
* Ouvrir le conteneur : `docker exec -ti [container_id] bash` ou container_id est l'id du conteneur. On peut l'obtenir avec : `docker container ls`
* Dans le conteneur :
    * installer git : `apt update` puis `apt install git`
    * Créer le dossier TP3 : `mkdir /TP3`
    * S'y rendre : `cd /TP3`
    * cloner ce repo : `git clone https://github.com/mael-grn/TP3-BD-S5.git` ATTENTION utiliser son pseudo github, et un personnal access token comme mot de passe.

# Création de la BD

**Nous pouvons importer les données :**

* Partie 1 :
  ```bash
  mongoimport --db bd_uqac \
               --collection professeurs \
               --file part1/bd_uqac.json \
               --jsonArray

* Partie 2 :
    ```bash
    mongoimport --db bd_uqac \
               --collection cours \
               --file part2/bd_uqac_cours.json \
               --jsonArray

*Note : ces deux commandes créent la base de données et créent les collections avec leurs données. Pour réinitialiser les données, il faudra se connecter à la BD, executer `db.professeurs.drop();` ou `db.cours.drop();` selon la partie concernée, puis réexecuter la commande mongoimport correspondant à la partie.*

# Connexion a la BD

* Dans le conteneur, executer : `mongosh`
* Se connecter à la BD : `use bd_uqac`
* Afficher les collections : `show collections`

# Executer les scripts

***Attention : si vous voulez réexecuter un script, il faudra réinitialiser les données (cf. création de la bd).***

Se connecter à la la bd, puis executer les commandes suivantes : 
```js
load("/TP3/part1/instructions.js");
```
```js
load("/TP3/part2/instructions.js");
```