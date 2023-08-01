//grille interne du jeux

let jsGrille = [
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","b","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","s","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","m","m","m","m","m","s","m","m","m","m","m","m","m","m","m"],
                ["m","m","m","m","m","m","m","m","m","m","ms1","s","s","s","s","s","m","m","m","m","m","m","m","m","m"],
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

document.addEventListener("keydown", (event) => {
    if(event.code == "ArrowLeft"){
        console.log("ArrowLeft"); //debug
        moveOnXAxis(-1);
        updateTable(jsGrille)
    }
})
//htmlBody.appendChild(htmlGrille);

function updateTable(table){
    htmlGrille.innerHTML = null;
    for(let i = 0; i < 15; i++){  
        let tableRow = document.createElement("tr");  
    
        for(let j = 0; j < 25; j++){
            let tableData = document.createElement("td");
            tableData.innerHTML = jsGrille[i][j];
            tableRow.appendChild(tableData);
    
            switch(jsGrille[i][j]){
                case "b":
                    bonhomme = [i,j];
                    console.log("Le bonhomme est a: " + bonhomme); //debug
                    break;
                case "ms1":
                    monstre1 = [i,j];
                    console.log("Le monstre est a: " + monstre1); //debug
                    break;
            }
            if(jsGrille[i][j-1] != "m"){
                jsGrille[i][j-1] = "b";
                jsGrille[i][j] = "s";
            }

        }
    
        htmlGrille.appendChild(tableRow);
    }
}

function moveOnXAxis(direction){
    let temp;
    temp = jsGrille[bonhomme[0], bonhomme[1] + direction];
    jsGrille[bonhomme[0], bonhomme[1] + direction] = jsGrille[bonhomme[0], bonhomme[1]];
    jsGrille[bonhomme[0], bonhomme[1]] = temp;
    //bonhomme = [bonhomme[0], bonhomme[1] + direction];
    console.log("Le bonhomme est a: " + bonhomme); //debug
}
function moveOnYAxis(direction){
    let temp;
    temp = jsGrille[bonhomme[0] + direction, bonhomme[1]];
    jsGrille[bonhomme[0] + direction, bonhomme[1]] = jsGrille[bonhomme[0], bonhomme[1]];
    jsGrille[bonhomme[0], bonhomme[1]] = temp;
    bonhomme = [bonhomme[0] + direction, bonhomme[1]];
    console.log("Le bonhomme est a: " + bonhomme); //debug
}
