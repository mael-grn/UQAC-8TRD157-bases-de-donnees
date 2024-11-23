const printResult = (res) => {
    if (!res) return print("-> Aucun résultat trouvé");

    // Si `res` est un curseur, on le convertis en tableau
    const arrayRes = typeof res.toArray === "function" ? res.toArray() : [res];

    if (arrayRes.length === 0) {
        print("-> Aucun résultat trouvé");
    } else {
        arrayRes.forEach((doc, index) =>
            print(JSON.stringify(doc, null, 2))
        );
    }
};


print("\n\n---------------");
print("Partie 1 du TP3");
print("---------------\n");

print("Utilisation de mongoDB server version 8.0.3\n\n")

professeurs = db.professeurs
professeurs.countDocuments()

print("-> Il y a " + professeurs.count() + " professeurs dans la base de données\n");

// 1 - trouver le professeur Étienne Tremblay
print("------------------------------------------")
print("1 - trouver le professeur Étienne Tremblay")
print("------------------------------------------\n")

etienne_tremblay = {"nom": "Tremblay", "prenom": "Etienne"}
champs_a_conserver = {"nom":true, "prenom":true}
print("Résultats de la recherche: ")
printResult(professeurs.find(etienne_tremblay, champs_a_conserver));

print("\nNOTE: Il semble que le professeur Étienne Tremblay ne soit pas dans la base de données fournie avec les fichiers du TP.")
print("Cependant, il existe un professeur nommé Etienne Marceau :")
etienne_marceau = {"nom": "Marceau", "prenom": "Etienne"}
printResult(professeurs.find(etienne_marceau, champs_a_conserver));

// 2 - trouvez le professeur Luc Lamontagne
print("\n----------------------------------------")
print("2 - trouver le professeur Luc Lamontagne")
print("----------------------------------------\n")

luc_lamontagne = {"Nom": "Lamontagne", "Prenom": "Luc"}
print("Résultats de la recherche: ")
printResult(professeurs.find(luc_lamontagne));

// pourtant il y a bel et bien un professeur nommé Luc Lamontagne. quel est le problème ??
print("\nNous remarquons que nous ne trouvons pas le professeur dans la base de données, même s'il est présent.")
print("Cela est dû au fait que nous filtrons les résultats en utilisant les clés 'Nom' et 'Prenom' au lieu de 'nom' et 'prenom'.")
print("Réessayons en utilisant les clés 'nom' et 'prenom' :")
luc_lamontagne_corrige = {"nom": "Lamontagne", "prenom": "Luc"};
printResult(professeurs.find(luc_lamontagne_corrige));

// 3 - Enlevez les cours donnés à la session précédente par Richard Khoury
print("\n-----------------------------------------------------------------------")
print("3 - Enlever les cours donnés à la session précédente par Richard Khoury")
print("-----------------------------------------------------------------------\n")

print("Actuellement, voici les données de Richard Khoury :")
richard_khoury = {"nom": "Khoury", "prenom": "Richard"};
printResult(professeurs.find(richard_khoury));

print("\nSupprimons les cours donnés à la session précédente par Richard Khoury...")
professeurs.updateMany(richard_khoury, {$unset: {"cours_derniere_session": ""}});
print("Données supprimées.");

print("\nDonnées de Richard Khoury après suppression :")
printResult(professeurs.find(richard_khoury));

// 4 - Ajouter un nouveau professeur de votre choix. Il devrait au moins avoir un nom, prenom et une date de naissance ?
print("\n------------------------------------------------")
print("4 - Ajouter un nouveau professeur de votre choix")
print("------------------------------------------------\n")

print("Nous allons ajouter un nouveau professeur nommé 'Jean Dupont' à la base de données, avec la date de naissance 01/01/1970...")
jean_dupont = {"nom": "Dupont", "prenom": "Jean", "date_naissance": new Date("1970-01-01")};
professeurs.insertOne(jean_dupont);
print("Professeur ajouté.");

print("\nDonnées de Jean Dupont après ajout :")
printResult(professeurs.find(jean_dupont));

// 5 - Il semble qu'il y ait un professeur qui soit en double. Est-ce possible d'enlever la deuxieme occurence ? 
print("\n-------------------------------------")
print("5 - Supprimer un professeur en double")
print("-------------------------------------\n")

print("Recherchons quel professeur est en double...")
printResult(professeurs.aggregate([
    { $group: { _id: { nom: "$nom", prenom: "$prenom" }, count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
]));

print("\nNous remarquons que le professeur en double est 'Philippe Gregoire'.")

print("\nSupprimons une occurrence de Philippe Gregoire...")
professeurs.deleteOne({"nom": "Gregoire", "prenom": "Philippe"});
print("Professeur supprimé.");

print("\nRésultat après suppression :")
printResult(professeurs.find({"nom": "Gregoire", "prenom": "Philippe"}));

// 6 - Comment trouver tous les professeurs d'un département commençant par DI - (par exemple DIM) ?
print("\n------------------------------------------------------------")
print("6 - Trouver les professeurs du département commençant par DI")
print("------------------------------------------------------------\n")

departement_di = {"departement": /^DI/};
print("Résultats de la recherche :")
printResult(professeurs.find(departement_di));

// 7 - Est-ce qu'il serait possible de n'avoir que leur nom et prénom ?
print("\n------------------------------------------------------------")
print("7 - Obtenir seulement le nom et le prénom des professeurs DI")
print("------------------------------------------------------------\n")

print("Résultats de la recherche :")
printResult(professeurs.find(departement_di, {"nom": true, "prenom": true, "_id": false}));

// 8 - Est-ce qu'il serait possible de normaliser les noms dans la base de données pour que les prénoms soient en minuscule et les noms en majuscule? 
print("\n-----------------------------------------------")
print("8 - Normaliser les noms dans la base de données")
print("-----------------------------------------------\n")

print("Nous voulons normaliser les noms dans la base de données pour que les prénoms soient en minuscule et les noms en majuscule.")
print("Voici les données avant normalisation (utilisation de findOne, car il n'est pas utile d'afficher l'ensemble des données) :")
printResult(professeurs.findOne());

print("\nNormalisons les noms dans la base de données...")
professeurs.updateMany(
    {},
    [
        { 
            $set: {
                "nom": { $toUpper: "$nom" },
                "prenom": { $toLower: "$prenom" }
            }
        }
    ]
);print("Noms normalisés.");

print("\nDonnées après normalisation :")
printResult(professeurs.findOne());

// 9 - A quelle date a été ajouté le professeur Richard Khoury dans la base de données ?
print("\n------------------------------------------------")
print("9 - Rechercher la date d'ajout de Richard Khoury")
print("------------------------------------------------\n")

richard_khoury_new = {"nom": "KHOURY", "prenom": "richard"};

print("Voici les données de Richard Khoury :")
let professeur_richard_khoury = professeurs.findOne(richard_khoury_new);
printResult(professeur_richard_khoury);

print("\nNous pouvons extraire la date d'ajout à partir de l'_id du document :")
let dateAjout = professeur_richard_khoury._id.getTimestamp();
print("Date d'ajout de Richard Khoury: " + dateAjout);

print("\n\n");
