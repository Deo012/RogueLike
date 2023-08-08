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
      updateTable(jsGrille);
      detecterMonstre(jsGrille);
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
      updateTable(jsGrille);
      detecterMonstre(jsGrille);
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
      updateTable(jsGrille);
      detecterMonstre(jsGrille);
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
      updateTable(jsGrille);
      detecterMonstre(jsGrille);
    } else if (jsGrille[bonhommeY][bonhommeX + 1] === MONSTRE) {
      gameOver(bonhommeY,bonhommeX + 1);
    }
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
  console.log("Detecting monsters..."); //track le mouvement
  let YRandom;
  let XRandom;
  let countPourConsole = 0; //track le mouvement
  for(let i = 0; i < table.length; i++){
    YRandom = randomNumber();
    XRandom = randomNumber();
    for(let j = 0; j < table[i].length; j++){
      if(table[i][j] == MONSTRE){
        countPourConsole++;//track le mouvement
        console.log("Monstre " + countPourConsole + " vas bouger:");//track le mouvement
        bougerMontre(i,j,YRandom,XRandom);
        console.log("Monstre " + countPourConsole + " a fini son mouvement!!!");//track le mouvement
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
function bougerMontre(y,x, yDirection, xDirection){ //x,y sont les positions du monstre

  if(yDirection !== 0 || xDirection !== 0){ //empecher de faire du surplace

    if(jsGrille[y + yDirection][x + xDirection] === SOL){ //il peut avancer si devant lui ces le sol...
      jsGrille[y + yDirection][x + xDirection] = MONSTRE;
      jsGrille[y][x] = SOL;
      console.log("Monstre bougé");
    }
    else{
      switch(chercheCoteLibre(y,x)){
        case "BAS_LIBRE":
          console.log("Forcer a avancer en bas")
          bougerMontre(y,x,1,0);
          break;
        case "HAUT_LIBRE":
          console.log("Forcer a avancer en haut")
          bougerMontre(y,x,-1,0);
          break;
        case "DROITE_LIBRE":
          console.log("Forcer a avancer a droite")
          bougerMontre(y,x,0,1);
          break;
        case "GAUCHE_LIBRE":
          console.log("Forcer a avancer a gauche")
          bougerMontre(y,x,0,-1);
          break;
        default:
          console.log("Rien ne le fait bouger");
          break;
      }
    }

  }
}
function chercheCoteLibre(y,x){
  if(jsGrille[y + 1][x ] === SOL){
    return "BAS_LIBRE";
  }
  else if(jsGrille[y - 1][x ] === SOL){
    return "HAUT_LIBRE";
  }
  else if(jsGrille[y][x + 1] === SOL){
    return "DROITE_LIBRE";
  }
  else if(jsGrille[y][x - 1] === SOL){
    return "GAUCHE_LIBRE";
  }
  else return "NULL"
}