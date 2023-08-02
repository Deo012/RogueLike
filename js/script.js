//grille interne du jeux

let jsGrille = [
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","b","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","s","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","s","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","ms","s","s","s","s","s","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","t","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"]

            ];


let htmlGrille = document.getElementById("grillejeux");
let htmlBody = document.querySelector("#body");

let bonhomme;//[x,y]
let monstre1;//[x,y]

updateTable(jsGrille);

let bouton_haut = document.getElementById("btn_haut");
let bouton_bas = document.getElementById("btn_bas")
let bouton_gauche = document.getElementById("btn_gauche");
let bouton_droit = document.getElementById("btn_droit");
let boutonReset = document.getElementById("btn_reset");

bouton_bas.addEventListener("click", ()=>{bougerBonhomme("bas")});
bouton_haut.addEventListener("click", ()=>{bougerBonhomme("haut")});
bouton_gauche.addEventListener("click", ()=>{bougerBonhomme("gauche")});
bouton_droit.addEventListener("click", ()=>{bougerBonhomme("droit")});

function updateTable(table){
    console.log("Update:");
    htmlGrille.innerHTML = null;
    for(let i = 1; i < 15; i++){  
        let tableRow = document.createElement("tr");  
    
        for(let j = 1; j < 25; j++){
            let tableData = document.createElement("td");
            tableData.innerHTML = jsGrille[i][j];
            tableRow.appendChild(tableData);
    
            switch(jsGrille[i][j]){
                case "b":
                    bonhomme = [i,j];
                    tableData.setAttribute("id","bonhomme");
                    console.log("Le bonhomme est a: " + bonhomme); //debug
                    break;
                case "ms":
                    monstre1 = [i,j];
                    console.log("Le monstre est a: " + monstre1); //debug
                    break;
                case "s":
                    tableData.setAttribute("class","sol");
            }
        }
    
        htmlGrille.appendChild(tableRow);
    }
}

function bougerBonhomme(direction){
    
    //trouver le bonhomme
    for(let i = 1; i < 15; i++){
        for(let j = 1; j < 25; j++){
            if(jsGrille[i][j] == "b"){
                bonhomme = [parseInt(i),parseInt(j)]; //[y,x]
                break;
            }
        }
    }

    //bouger le bonhomme selon direction
    if(direction == "bas"){
        if(jsGrille[bonhomme[0]+1][bonhomme[1]] != "m" && jsGrille[bonhomme[0]+1][bonhomme[1]] != "ms"){
            console.log("bas");
            jsGrille[bonhomme[0]+1][bonhomme[1]] = "b";
            jsGrille[bonhomme[0]][bonhomme[1]] = "s";
            bonhomme = [bonhomme[0]+1][bonhomme[1]];
            updateTable(jsGrille);
        }
        else if(jsGrille[bonhomme[0]+1][bonhomme[1]] == "ms"){
            gameOver();
        }
    }
    
    if(direction == "haut"){
        if(jsGrille[bonhomme[0]-1][bonhomme[1]] != "m"){
            console.log("haut");
            jsGrille[bonhomme[0]-1][bonhomme[1]] = "b";
            jsGrille[bonhomme[0]][bonhomme[1]] = "s";
            bonhomme = [bonhomme[0]-1][bonhomme[1]];
            updateTable(jsGrille);
        }
    }
    
    if(direction == "gauche"){
        if(jsGrille[bonhomme[0]][bonhomme[1]-1] != "m" && jsGrille[bonhomme[0]][bonhomme[1]-1] != "ms"){
            console.log("gauche");
            jsGrille[bonhomme[0]][bonhomme[1]-1] = "b";
            jsGrille[bonhomme[0]][bonhomme[1]] = "s";
            bonhomme = [bonhomme[0]][bonhomme[1]-1];
            updateTable(jsGrille);
        }
        else if(jsGrille[bonhomme[0]][bonhomme[1]-1] == "ms"){
            gameOver();
        }
    }

    if(direction == "droit"){
        if(jsGrille[bonhomme[0]][bonhomme[1]+1] != "m" && jsGrille[bonhomme[0]][bonhomme[1]+1] != "ms"){
            console.log("droit");
            jsGrille[bonhomme[0]][bonhomme[1]+1] = "b";
            jsGrille[bonhomme[0]][bonhomme[1]] = "s";
            bonhomme = [bonhomme[0]][bonhomme[1]+1];
            updateTable(jsGrille);
        }
        else if(jsGrille[bonhomme[0]][bonhomme[1]+1] == "ms"){
            gameOver();
        }
    }
}

function gameOver(){
    console.log("Le jeu est terminer");
    bouton_droit.removeEventListener("click",bougerBonhomme("droit"));
    //bouton_droit.addEventListener("click", gameOver)
    //bouton_gauche.removeEventListener("click",gameOver);
    //bouton_haut.removeEventListener("click",gameOver);
    //bouton_bas.removeEventListener("click",gameOver);
}