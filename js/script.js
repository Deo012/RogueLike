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
let boutonReset = document.getElementById("btn_reset")
bouton_haut.addEventListener("click", (event)=>{
    
    for(let i = 1; i < 15; i++){

        for(let j = 1; j < 25; j++){
            if(jsGrille[i][j] == "b"){
                if(jsGrille[i-1][j] != "m" && jsGrille[i-1][j] != "ms"){
                    jsGrille[i-1][j] = "b";
                    jsGrille[i][j] = "s";
                    break;
                }
                else if(jsGrille[i-1][j] == "ms"){
                    bouton_haut.removeEventListener();
                    bouton_bas.removeEventListener();
                    bouton_gauche.removeEventListener();
                    bouton_droit.removeEventListener();
                }
            }
        }

    }
    updateTable();
})
bouton_bas.addEventListener("click", (event)=>{
    
    for(let i = 1; i < 15; i++){

        for(let j = 1; j < 25; j++){
            if(jsGrille[i][j] == "b"){
                if(jsGrille[i+1][j] != "m"){
                    jsGrille[i+1][j] = "b";
                    jsGrille[i][j] = "s";
                    break;
                }
                else if(jsGrille[i+1][j] == "ms"){
                    bouton_haut.removeEventListener();
                    bouton_bas.removeEventListener();
                    bouton_gauche.removeEventListener();
                    bouton_droit.removeEventListener();
                }
            }
        }

    }
    updateTable();
})
bouton_droit.addEventListener("click", (event)=>{
    
    for(let i = 1; i < 15; i++){

        for(let j = 1; j < 25; j++){
            if(jsGrille[i][j] == "b"){
                if(jsGrille[i][j+1] != "m" && jsGrille[i][j+1] != "ms"){
                    jsGrille[i][j+1] = "b";
                    jsGrille[i][j] = "s";
                    break;
                }
                else if(jsGrille[i][j+1] == "ms"){
                    bouton_haut.removeEventListener();
                    bouton_bas.removeEventListener();
                    bouton_gauche.removeEventListener();
                    bouton_droit.removeEventListener();
                }
            }
        }

    }
    updateTable();
})
bouton_gauche.addEventListener("click", (event)=>{
    
    for(let i = 1; i < 15; i++){

        for(let j = 1; j < 25; j++){
            if(jsGrille[i][j] == "b"){
                if(jsGrille[i][j-1] != "m" && jsGrille[i][j-1] != "ms"){
                    jsGrille[i][j-1] = "b";
                    jsGrille[i][j] = "s";
                    break;
                }
                else if(jsGrille[i][j-1] == "ms"){
                    console.log("La partie est fini")
                    bouton_haut.removeEventListener("click", event);
                    bouton_bas.removeEventListener("click", event);
                    bouton_gauche.removeEventListener("click", event);
                    bouton_droit.removeEventListener("click", event);
                }
            }
        }

    }
    updateTable();
})
boutonReset.addEventListener("click", (event)=>{
    console.log("Reset")
    jsGrille = [
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
    updateTable(jsGrille);
})

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
            }
        }
    
        htmlGrille.appendChild(tableRow);
    }
}


/*

    */