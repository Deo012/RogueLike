const SOL = "s";
const MUR = "m";
const JOUEUR = "b";
const MONSTRE = "ms";
const TRESOR = "t";


  let jsGrille = [
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
    ["m","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","m","m","m","s","s","t","m"],
    ["m","s","s","m","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","s","m"],
    ["m","s","s","s","s","s","s","s","s","s","s","m","m","m","s","s","m","m","m","m","m","m","s","s","m"],
    ["m","s","s","s","s","s","m","m","s","s","s","s","s","s","s","b","s","s","s","s","s","s","s","s","m"],
    ["m","s","s","m","m","m","m","m","s","s","t","s","s","m","m","m","s","s","m","m","m","m","s","s","m"],
    ["t","s","m","m","m","m","m","m","s","s","s","m","s","m","m","m","s","s","m","m","m","m","s","s","m"],
    ["m","s","m","m","m","m","m","m","s","s","ms","t","s","s","s","s","s","s","m","m","m","m","s","s","m"],
    ["m","s","s","s","s","s","s","s","s","s","s","s","m","m","m","s","s","s","s","s","s","s","s","s","m"],
    ["m","s","s","s","s","s","s","s","s","s","s","s","ms","s","s","s","s","m","m","m","m","m","s","s","m"],
    ["m","s","m","m","m","m","m","m","s","m","s","m","s","m","t","s","s","s","s","s","s","m","s","s","m"],
    ["m","s","s","s","s","s","s","s","s","m","s","m","s","m","m","s","s","m","m","m","m","m","s","s","m"],
    ["m","s","s","s","s","s","s","s","s","s","s","m","s","m","m","s","s","m","m","m","m","m","s","s","m"],
    ["m","s","m","m","m","m","m","m","m","m","t","s","s","s","s","ms","t","s","s","s","s","s","s","s","m"],
    ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"]
  ];


let htmlGrille = document.getElementById("grillejeux");
let bonhommeX;
let bonhommeY;
let listMonstrePosition = [];
let afficheurScore = document.getElementById("afficheur_de_score");
let score = 0;
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
boutonReset.addEventListener("click",()=>{ reset("btn_reset")});
function updateTable(table) {
  console.log("Update:");
  htmlGrille.innerHTML = null;
  
  for (let i = 0; i < table.length; i++) {
    let tableRow = document.createElement("tr");

    for (let j = 0; j < table[i].length; j++) {
      let tableData = document.createElement("td");
      tableRow.appendChild(tableData);

      switch (table[i][j]) {
        case JOUEUR:
          bonhommeY = i;
          bonhommeX = j;
          tableData.classList.add("bonhomme");

          console.log("Le bonhomme est a: " + bonhommeX + ", " + bonhommeY); //debug
          break;
        case MONSTRE:
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
    if (jsGrille[bonhommeY + 1][bonhommeX] !== MUR && jsGrille[bonhommeY + 1][bonhommeX] !== MONSTRE) {
      if (jsGrille[bonhommeY + 1][bonhommeX] === TRESOR) {
        score += 1;
        console.log("Score: "+ score);
        afficheurScore.innerHTML = "Score: " + score;
      }
      jsGrille[bonhommeY + 1][bonhommeX] = JOUEUR;
      jsGrille[bonhommeY][bonhommeX] = SOL;
      bonhommeY++;
      detecterMonstre(jsGrille);
      bougerTousMonstres();
      updateTable(jsGrille);
    } else if (jsGrille[bonhommeY + 1][bonhommeX] === MONSTRE) {
      gameOver(bonhommeY + 1,bonhommeX);
    }
  } else if (direction === "haut") {
    if (jsGrille[bonhommeY - 1][bonhommeX] !== MUR && jsGrille[bonhommeY - 1][bonhommeX] !== MONSTRE) {
      if (jsGrille[bonhommeY - 1][bonhommeX] === TRESOR) {
        score += 1;
        console.log("Score: "+ score);
        afficheurScore.innerHTML = "Score: " + score;
      }
      jsGrille[bonhommeY - 1][bonhommeX] = JOUEUR;
      jsGrille[bonhommeY][bonhommeX] = SOL;
      bonhommeY--;
      detecterMonstre(jsGrille);
      bougerTousMonstres();
      updateTable(jsGrille);
    } else if (jsGrille[bonhommeY - 1][bonhommeX] === MONSTRE) {
      gameOver(bonhommeY - 1,bonhommeX);
    }
  } else if (direction === "gauche") {
    if (jsGrille[bonhommeY][bonhommeX - 1] !== MUR && jsGrille[bonhommeY][bonhommeX - 1] !== MONSTRE) {
      if (jsGrille[bonhommeY][bonhommeX - 1] === TRESOR) {
        score += 1;
        console.log("Score: "+ score);
        afficheurScore.innerHTML = "Score: " + score;
      }
      jsGrille[bonhommeY][bonhommeX - 1] = JOUEUR;
      jsGrille[bonhommeY][bonhommeX] = SOL;
      bonhommeX--;
      detecterMonstre(jsGrille);
      bougerTousMonstres();
      updateTable(jsGrille);
    } else if (jsGrille[bonhommeY][bonhommeX - 1] === MONSTRE) {
      gameOver(bonhommeY,bonhommeX - 1);
    }
  } else if (direction === "droit") {
    if (jsGrille[bonhommeY][bonhommeX + 1] !== MUR && jsGrille[bonhommeY][bonhommeX + 1] !== MONSTRE) {
      if (jsGrille[bonhommeY][bonhommeX + 1] === TRESOR) {
        score += 1;
        console.log("Score: "+ score);
        afficheurScore.innerHTML = "Score: " + score;
      }
      jsGrille[bonhommeY][bonhommeX + 1] = JOUEUR;
      jsGrille[bonhommeY][bonhommeX] = SOL;
      bonhommeX++;
      detecterMonstre(jsGrille);
      bougerTousMonstres();
      updateTable(jsGrille);
    } else if (jsGrille[bonhommeY][bonhommeX + 1] === MONSTRE) {
      gameOver(bonhommeY,bonhommeX + 1);
    }
  }

   // Vérifier si le joueur a recupéré tous les trésors.
   let nbTresorsRestants = 0;
   for (let i = 0; i < jsGrille.length; i++) {
     for (let j = 0; j < jsGrille[i].length; j++) {
       if (jsGrille[i][j] === TRESOR) {
         nbTresorsRestants++;
       }
     }
   }
 
   if (nbTresorsRestants === 0) {
     partieTerminee = true;
     alert("Félicitations ! Vous avez recupéré tous les trésors et gagné la partie !");
     return;
   }

  if (jsGrille[bonhommeY][bonhommeX].includes(MONSTRE)) {
    gameOver();
    return; // Arrêter la fonction ici pour éviter tout déplacement supplémentaire
  }
}



function gameOver(y,x) {
   
  partieTerminee = true; // La partie est terminée, désactiver les mouvements du joueur

  // Mettre à jour la position du joueur avec la position du monstre
  jsGrille[bonhommeY][bonhommeX] = SOL;
  jsGrille[y][x] = JOUEUR;
  bonhommeX = x;
  bonhommeY = y;

  // Mettre à jour l'affichage de la grille
  updateTable(jsGrille);
  setTimeout(() => {
    alert("Le jeu est terminé. Vous avez été capturé par un monstre !");
  }, 0);
}
document.addEventListener("keydown", function (event) {
  if (!partieTerminee) {
    if (event.key === "ArrowUp" || event.key === "Up") {
      bougerBonhomme("haut");
    } else if (event.key === "ArrowDown" || event.key === "Down") {
      bougerBonhomme("bas");
    } else if (event.key === "ArrowLeft" || event.key === "Left") {
      bougerBonhomme("gauche");
    } else if (event.key === "ArrowRight" || event.key === "Right") {
      bougerBonhomme("droit");
    }
  }
});
  
function reset() {
    window.location.reload(true)
}
  
function detecterMonstre(table){
  listMonstrePosition.length = 0;
  console.log("Detecting monsters..."); //track le mouvement
  for(let i = 0; i < table.length; i++){
    for(let j = 0; j < table[i].length; j++){
      if(table[i][j] == MONSTRE){
        listMonstrePosition.push([i,j])
      }
    }
  }
}
function randomNumber(){
  let random;

  do{
    //Formule ou code qui genere un nombre aleatoire dans une intervale : Math.random() * ((max - min) + min)
    random = Math.floor(Math.random() * (2 - (-1)) + (-1)); //donne un nombre entre -1 et 1
  }while(random === 0)

  //console.log("random: " + random);
  return random;
}
function bougerTousMonstres(){
  let xRandom;
  let yRandom;
  listMonstrePosition.forEach(element => {
    xRandom = randomNumber();
    yRandom = randomNumber();
  
    bougerMontre(element[0],element[1], yRandom, xRandom);
  });
}
function bougerMontre(y,x, yDirection, xDirection){ //x,y sont les positions du monstre

  if(jsGrille[y + yDirection][x + xDirection] === SOL ){ //il peut avancer si devant lui ces le sol...
    jsGrille[y + yDirection][x + xDirection] = MONSTRE;
    jsGrille[y][x] = SOL;
    console.log("Monstre bougé");
  }

}
