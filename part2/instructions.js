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

cours = db.cours

// 0. Quel est le nom du cours 8TRD157 et quel est son enseignant?
print("\n-------------------------------------")
print("0 - Nom du cours 8TRD157 et de son enseignant")
print("-------------------------------------\n")
printResult(cours.find(
        {"cours.sigle":"8TRD157"},
        { _id: false, "cours.nom":true, enseignat_actuel: true}
));

// 1. Corrigez le typo dans le nom de la cle pour l'enseignant actuel du cours 8TRD157 
print("\n-------------------------------------")
print("1 - Corriger le nom de la cle pour l'enseignant actuel du cours 8TRD157")
print("-------------------------------------\n")
print("Modification de la typo ...");

cours.updateOne({"cours.sigle":"8TRD157"},
        {
                $set: {enseignant_actuel:"Jimmy Girard-Nault"},
                $unset :  {enseignat_actuel: 1}
        }
)
printResult(cours.find(
        {"cours.sigle":"8TRD157"},
        { _id: false, "cours.nom":true, enseignant_actuel: true}
));

// 2. Il faut incrémenter le compteur de 1 pour tous les cours de l'automne
let compteur = 0;

session_automne = {"session": "Automne"};
cours.updateMany(
        { session: "Automne" },
        { $inc: { compteur: 1 } }
);
print(compteur);

// 3. Il semble qu'il manque trois professeurs pour le cours 8INF433. Veuillez ajouter "Michel Louvain", "Rick Ashtley" et "Elon Musk" à la liste.
print("\n-------------------------------------")
print("3 - Ajout des 3 professeurs au cours 8INF433")
print("-------------------------------------\n")
print("cours avant modif :")
printResult(cours.find({"cours.sigle": "8INF433"},
        {_id: false,  "cours.nom":true, "anciens_enseignants":true}
));
cours.updateOne(
        {"cours.sigle": "8INF433"}, 
        { $addToSet: { "anciens_enseignants": { $each: ["Michel Louvain", "Rick Ashtley", "Elon Musk"] } } }
      );

printResult(cours.find(
        {"cours.sigle":"8INF433"},
        { _id: false, "cours.nom":true, "anciens_enseignants":true}
));


// 4. Après avoir parlé au département des ressources humaines, vous décidez d'enlever "Michel Louvain" car ils ne sera plus professeur à l'université.
print("\n-------------------------------------")
print("4 - Supression du professeur Michel Louvain")
print("-------------------------------------\n")

cours.updateMany(
        { "anciens_enseignants": "Michel Louvain" },
        { $pull: { "anciens_enseignants": "Michel Louvain" } }
)
    
printResult(cours.find(
        { "cours.sigle": "8INF433" },
        { _id: false, "cours.nom": true, "anciens_enseignants": true }
));

// Pour préparer des réponse aux question fréquente des étudiants, vous décidez de faire une peu d'exploration dans vos données

// 5. Combien de cours on eu moins de 2 enseignants ?
print("\n-------------------------------------")
print("5 - Cours qui ont eu au moins deux enseignants")
print("-------------------------------------\n")

let nombre = cours.countDocuments({
        $expr: { $gte: [{ $size: "$anciens_enseignants" }, 2] }
      });
print("Nombre de cours qui ont eu au moins 2 enseignants :" + nombre);
      
// 6. Quels sont les 2 cours du DIM (débutant par 8) ou du DSA (débutant par 6) ayant été donnés le plus souvent et combien de fois ont-ils ete offerts?
print("\n-------------------------------------")
print("6 - Les deux cours du DIM ou DSA qui ont étaient les plus offerts")
print("-------------------------------------\n")
cours_DIM_DSA = { $or: [ { "cours.sigle": /^8/ }, { "cours.sigle": /^6/ } ] }
printResult(cours.find(
       cours_DIM_DSA,
        { "cours.sigle": true, "nombre_de_fois_offert": true }
    ).sort({ nombre_de_fois_offert: -1 }).limit(2));
    
// 7. Quels cours sont donnés à l'automne et à l'hiver ?
print("\n-------------------------------------")
print("7 - Cours donnés à l'automne et à l'hiver")
print("-------------------------------------\n")

printResult(cours.find(
        {
             "session": {$all:["Automne", "Hiver"]}   
        }, { "_id": false, "session": true, "cours.sigle":true }
))

// 8. Quel est le cours ayant eu son local officiel au P1-6350 13 fois ?
print("\n-------------------------------------")
print("8 - Cours ayant eu son local officiel au P1-6350 13 fois")
print("-------------------------------------\n")

printResult(cours.find({
        "local_officiel":{
                $elemMatch:{
                        "nombre_de_cours": 13,
                        "local": "P1-6350"
                }
        }
}, {_id:false, "cours.sigle":true, "local_officiel.nombre_de_cours":true, "local_officiel.local":true}));
// 9. Quel est le cours le plus constant en terme de nombre d'étudiants? On cherche un cours qui a toujours eu entre 30 et 60 étudiants
print("\n-------------------------------------")
print("9 - Cours ayant eu un nombre d'étudiant constant")
print("-------------------------------------\n")
printResult(cours.find({
        "nombre_etudiants": { 
            $exists: true,
            $not: { 
                $elemMatch: { 
                    $lt: 30
                }
            }, $not: { 
                $elemMatch: { 
                    $gt: 60
                }
            }
        },
    }, {"_id":false, "cours.sigle":true, "nombre_etudiants":true}
));    