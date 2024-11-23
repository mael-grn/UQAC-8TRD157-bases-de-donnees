const printResult = (res) => {
    if (!res || res.toArray().length === 0) print("Aucun résultat trouvé");
    else {
        if (res.toArray()) res.toArray().forEach((doc) => print("\t " + doc + JSON.stringify(doc)));
        else print("\t " + res + JSON.stringify(res));
    }
}

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

etienne_tremblay = {"nom": "Marceau", "prenom": "Etienne"}
champs_a_conserver = {"nom":true, "prenom":true}
reponse = professeurs.find(etienne_tremblay, champs_a_conserver)
print("-> Résultats de la recherche: ")
printResult(reponse);

// 2 - trouvez le professeur Luc Lamontagne
print("\n----------------------------------------")
print("2 - trouver le professeur Luc Lamontagne")
print("----------------------------------------\n")

luc_lamontagne = {"Nom": "Lamontagne", "Prenom": "Luc"}
response = professeurs.find(luc_lamontagne)
print("-> Résultats de la recherche: ")
printResult(reponse);

// pourtant il y a bel et bien un professeur nommé Luc Lamontagne. quel est le problème ??

// 3 - Enlevez les cours donnés à la session précédente par Richard Khoury

// 4 - Ajouter un nouveau professeur de votre choix. Il devrait au moins avoir un nom, prenom et une date de naissance ?

// 5 - Il semble qu'il y ait un professeur qui soit en double. Est-ce possible d'enlever la deuxieme occurence ? 

// 6 - Comment trouver tous les professeurs d'un département commençant par DI - (par exemple DIM) ?

// 7 - Est-ce qu'il serait possible de n'avoir que leur nom et prénom ?

// 8 - Est-ce qu'il serait possible de normaliser les noms dans la base de données pour que les prénoms soient en minuscule et les noms en majuscule? 

// 9 - A quelle date a été ajouté le professeur Richard Khoury dans la base de données ?

print("\n\n");
