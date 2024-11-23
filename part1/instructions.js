const printResult = (res) => {
    if (!res) print("Aucun résultat trouvé");
    else {
        let arrayRes = res.toArray(); // Convertit le curseur en tableau et le stocker, car le curseur ne peut être parcouru qu'une seule fois
        if (arrayRes.length === 0) print("Aucun résultat trouvé");
        else arrayRes.forEach((doc, index) => {
            print(JSON.stringify(doc, null, 2)); // Affiche chaque document formaté
        });
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
reponse = professeurs.find(etienne_tremblay, champs_a_conserver)
print("Résultats de la recherche: ")
printResult(reponse);

print("\nNOTE: Il semble que le professeur Étienne Tremblay ne soit pas dans la base de données fournie avec les fichiers du TP.")
print("Cependant, il existe un professeur nommé Etienne Marceau : \n")
etienne_marceau = {"nom": "Marceau", "prenom": "Etienne"}
reponse = professeurs.find(etienne_marceau, champs_a_conserver)
printResult(reponse);

// 2 - trouvez le professeur Luc Lamontagne
print("\n----------------------------------------")
print("2 - trouver le professeur Luc Lamontagne")
print("----------------------------------------\n")

luc_lamontagne = {"Nom": "Lamontagne", "Prenom": "Luc"}
response = professeurs.find(luc_lamontagne)
print("Résultats de la recherche: ")
printResult(reponse);

// pourtant il y a bel et bien un professeur nommé Luc Lamontagne. quel est le problème ??
print("\nNous remarquons que nous ne trouvons pas le professeur dans la base de données, même s'il est présent.")
print("Cela est dû au fait que nous filtrons les résultats en utilisant les clés 'Nom' et 'Prenom' au lieu de 'nom' et 'prenom'.")
print("Réessayons en utilisant les clés 'nom' et 'prenom' : \n")
luc_lamontagne_corrige = {"nom": "Lamontagne", "prenom": "Luc"}
response = professeurs.find(luc_lamontagne_corrige)
printResult(reponse);

// 3 - Enlevez les cours donnés à la session précédente par Richard Khoury

// 4 - Ajouter un nouveau professeur de votre choix. Il devrait au moins avoir un nom, prenom et une date de naissance ?

// 5 - Il semble qu'il y ait un professeur qui soit en double. Est-ce possible d'enlever la deuxieme occurence ? 

// 6 - Comment trouver tous les professeurs d'un département commençant par DI - (par exemple DIM) ?

// 7 - Est-ce qu'il serait possible de n'avoir que leur nom et prénom ?

// 8 - Est-ce qu'il serait possible de normaliser les noms dans la base de données pour que les prénoms soient en minuscule et les noms en majuscule? 

// 9 - A quelle date a été ajouté le professeur Richard Khoury dans la base de données ?

print("\n\n");
