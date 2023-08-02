const SOL = "s";
const MUR = "m";
const JOUEUR = "b";
const MONSTRE = "ms";
const TRESOR = "t";

document.addEventListener("DOMContentLoaded", () => {
let jsGrille = [
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","s","s","s","s","s","b","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","t","t","s","s","s","s","s","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","s","s","t","s","s","s","s","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","s","ms","t","s","s","s","s","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","s","s","s","s","s","t","s","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"]

];


let htmlGrille = document.getElementById("grillejeux");
let afficheurScore = document.getElementById("afficheur_de_score");
let score = 0;
let bonhomme; // [x, y]
let positionMonstre; // [x, y]
let partieTerminee = false; // Variable pour indiquer si la partie est terminée

updateTable(jsGrille);

let bouton_haut = document.getElementById("btn_haut");
let bouton_bas = document.getElementById("btn_bas");
let bouton_gauche = document.getElementById("btn_gauche");
let bouton_droit = document.getElementById("btn_droit");
let boutonReset = document.getElementById("btn_reset");

bouton_bas.addEventListener("click", () => { bougerBonhomme("bas") });
bouton_haut.addEventListener("click", () => { bougerBonhomme("haut") });
bouton_gauche.addEventListener("click", () => { bougerBonhomme("gauche") });
bouton_droit.addEventListener("click", () => { bougerBonhomme("droit") });

function updateTable(table) {
  console.log("Update:");
  htmlGrille.innerHTML = null;
  for (let i = 0; i < table.length; i++) {
    let tableRow = document.createElement("tr");

    for (let j = 0; j < table[i].length; j++) {
      let tableData = document.createElement("td");
      tableData.innerHTML = table[i][j];
      tableRow.appendChild(tableData);

      switch (table[i][j]) {
        case JOUEUR:
          bonhomme = [i, j];
          tableData.setAttribute("id", "bonhomme");
          console.log("Le bonhomme est a: " + bonhomme); //debug
          break;
        case MONSTRE:
          positionMonstre = [i, j];
          console.log("Le monstre est a: " + positionMonstre);
          tableData.setAttribute("class", "monstre");
          break;
        case TRESOR:
          tableData.setAttribute("class", "tresor");
          break;
        case SOL:
          tableData.setAttribute("class", "sol");
          break;
        case MUR:
          tableData.setAttribute("class", "mur");
          break;
      }
    }

    htmlGrille.appendChild(tableRow);
  }
}

function bougerBonhomme(direction) {
    if (partieTerminee) {
        return; // Si la partie est terminée, ne pas permettre de mouvement supplémentaire
      }
  // Bouger le bonhomme selon direction
  if (direction === "bas") {
    if (jsGrille[bonhomme[0] + 1][bonhomme[1]] !== MUR && jsGrille[bonhomme[0] + 1][bonhomme[1]] !== MONSTRE) {
      if (jsGrille[bonhomme[0] + 1][bonhomme[1]] === TRESOR) {
        score += 1;
        console.log("Score: "+ score);
        afficheurScore.innerHTML = "Score: " + score;
      }
      jsGrille[bonhomme[0] + 1][bonhomme[1]] = JOUEUR;
      jsGrille[bonhomme[0]][bonhomme[1]] = SOL;
      bonhomme[0]++;
      bougerMonstre(jsGrille,randomNumber(),randomNumber());
      updateTable(jsGrille);
    } else if (jsGrille[bonhomme[0] + 1][bonhomme[1]] === MONSTRE) {
      gameOver();
    }
  } else if (direction === "haut") {
    if (jsGrille[bonhomme[0] - 1][bonhomme[1]] !== MUR && jsGrille[bonhomme[0] - 1][bonhomme[1]] !== MONSTRE) {
      if (jsGrille[bonhomme[0] - 1][bonhomme[1]] === TRESOR) {
        score += 1;
        console.log("Score: "+ score);
        afficheurScore.innerHTML = "Score: " + score;
      }
      jsGrille[bonhomme[0] - 1][bonhomme[1]] = JOUEUR;
      jsGrille[bonhomme[0]][bonhomme[1]] = SOL;
      bonhomme[0]--;
      bougerMonstre(jsGrille,randomNumber(),randomNumber());
      updateTable(jsGrille);
    } else if (jsGrille[bonhomme[0] - 1][bonhomme[1]] === MONSTRE) {
      gameOver();
    }
  } else if (direction === "gauche") {
    if (jsGrille[bonhomme[0]][bonhomme[1] - 1] !== MUR && jsGrille[bonhomme[0]][bonhomme[1] - 1] !== MONSTRE) {
      if (jsGrille[bonhomme[0]][bonhomme[1] - 1] === TRESOR) {
        score += 1;
        console.log("Score: "+ score);
        afficheurScore.innerHTML = "Score: " + score;
      }
      jsGrille[bonhomme[0]][bonhomme[1] - 1] = JOUEUR;
      jsGrille[bonhomme[0]][bonhomme[1]] = SOL;
      bonhomme[1]--;
      bougerMonstre(jsGrille,randomNumber(),randomNumber());
      updateTable(jsGrille);
    } else if (jsGrille[bonhomme[0]][bonhomme[1] - 1] === MONSTRE) {
      gameOver();
    }
  } else if (direction === "droit") {
    if (jsGrille[bonhomme[0]][bonhomme[1] + 1] !== MUR && jsGrille[bonhomme[0]][bonhomme[1] + 1] !== MONSTRE) {
      if (jsGrille[bonhomme[0]][bonhomme[1] + 1] === TRESOR) {
        score += 1;
        console.log("Score: "+ score);
        afficheurScore.innerHTML = "Score: " + score;
      }
      jsGrille[bonhomme[0]][bonhomme[1] + 1] = JOUEUR;
      jsGrille[bonhomme[0]][bonhomme[1]] = SOL;
      bonhomme[1]++;
      bougerMonstre(jsGrille,randomNumber(),randomNumber());
      updateTable(jsGrille);
    } else if (jsGrille[bonhomme[0]][bonhomme[1] + 1] === MONSTRE) {
      gameOver();
    }
  }
  if (jsGrille[bonhomme[0]][bonhomme[1]].includes(MONSTRE)) {
    gameOver();
    return; // Arrêter la fonction ici pour éviter tout déplacement supplémentaire
  }
}



function gameOver() {
    partieTerminee = true; // La partie est terminée, désactiver les mouvements du joueur

    // Trouver la position du monstre


  for (let i = 0; i < jsGrille.length; i++) {

    for (let j = 0; j < jsGrille[i].length; j++) {

      if (jsGrille[i][j].includes(MONSTRE)) {

        positionMonstre = [i, j];

        break;

      }
    }
  }

  // Mettre à jour la position du joueur avec la position du monstre

  jsGrille[bonhomme[0]][bonhomme[1]] = SOL;

  jsGrille[positionMonstre[0]][positionMonstre[1]] = JOUEUR;

  bonhomme = positionMonstre;

  // Mettre à jour l'affichage de la grille

    updateTable(jsGrille);

    setTimeout(() => {

      alert("Le jeu est terminé. Vous avez été capturé par un monstre !");

    }, 0);

  }
});
function bougerMonstre(jsGrille,directionVertical, directionHorizontal){

  //trouver le montre dans la grille
  for(i = 0; i < 15; i++){
    for(j = 0; j < 25; j++){
      if(jsGrille[i][j].includes(MONSTRE)){
        positionMonstre = [i,j];
        break;
      }
    }
  }

  if(directionHorizontal !== 0 || directionVertical !== 0){
    //le faire bouger de maniere aleatoire seulement si une des direction n'est pas null
    if (jsGrille[positionMonstre[0] + directionHorizontal][positionMonstre[1] + directionVertical] !== MUR && jsGrille[positionMonstre[0] + directionHorizontal][positionMonstre[1] + directionVertical] !== TRESOR) {
      jsGrille[positionMonstre[0] + directionHorizontal][positionMonstre[1] + directionVertical] = MONSTRE;
      jsGrille[positionMonstre[0]][positionMonstre[1]] = SOL;
      positionMonstre = [positionMonstre[0] + directionHorizontal, positionMonstre[1] + directionVertical]
    }
    else{ //vas dans la direction opposé si devant toi il y a un murs
      jsGrille[positionMonstre[0] + directionHorizontal*-1][positionMonstre[1] + directionVertical*-1] = MONSTRE;
      jsGrille[positionMonstre[0]][positionMonstre[1]] = SOL;
      positionMonstre = [positionMonstre[0] + directionHorizontal*-1, positionMonstre[1] + directionVertical*-1]
    }
  }

}
function randomNumber(){
  //Formule our code qui genere un nombre aleatoire dans une intervale : Math.random() * ((max - min) + min)
  let random = Math.floor(Math.random() * (1 - (-1)) + (-1)); //donne un nombre entre -1 et 1
  console.log("random: " + random);
  return random;
}