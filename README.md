# Installation

* Télécharger l'image mongo (docker)
* Créer un conteneur
* Dans le conteneur, tirer ce repo dans un dossier

# Création de la BD

**Executer la commande suivante pour chaque étapes :**
  ```bash
  mongoimport --db bd_uqac \
               --collection profs \
               --file bd_uqac.json \
               --jsonArray
```

# Connexion a la BD

* Dans le conteneur, executer : `mongosh`
* Se connecter à la BD : `use bd_uqac`
* Afficher les collections : `show collections`

# Executer les scripts

* Executer les commandes suivantes : 
```bash
mongosh bd_uqac /TP3/part1/instructions.js
```
```bash
mongosh bd_uqac /TP3/part2/instructions.js
```