
 //Creation du tableau de jeu
 let grilleDonjon = new Array(15);

for(let ligne = 0; ligne < 15; ligne++){
    grilleDonjon[ligne] = new Array(25); //dans chaque ligne il y a 25 colonne
}

//Remplissage des cases (tous des murs)
for(let ligne = 0; ligne < 15; ligne++){
    for(let colonne = 0; colonne < 25; colonne++){
        grilleDonjon[ligne][colonne] = "Mur";
    }
}

//Remplisage du sol
grilleDonjon[2][15] = "Tresor"; // Tresor
grilleDonjon[2][16] = "Sol";
grilleDonjon[2][17] = "Sol";
grilleDonjon[2][18] = "Sol";
grilleDonjon[3][15] = "Sol";
grilleDonjon[3][16] = "Sol";
grilleDonjon[3][17] = "Sol";
grilleDonjon[3][18] = "Sol";
grilleDonjon[4][18] = "Sol";
grilleDonjon[5][18] = "Sol";
grilleDonjon[5][19] = "Sol";
grilleDonjon[6][15] = "Sol";
grilleDonjon[6][16] = "Sol";
grilleDonjon[6][17] = "Monstre"; // Monstre
grilleDonjon[6][18] = "Sol";
grilleDonjon[6][19] = "Sol";
grilleDonjon[6][20] = "Sol";
grilleDonjon[7][15] = "Sol";
grilleDonjon[7][16] = "Sol";
grilleDonjon[7][17] = "Sol";
grilleDonjon[7][18] = "Sol";
grilleDonjon[7][19] = "Sol";
grilleDonjon[7][20] = "Sol";
grilleDonjon[8][15] = "Sol";
grilleDonjon[8][19] = "Sol";
grilleDonjon[9][12] = "Sol";
grilleDonjon[9][13] = "Sol";
grilleDonjon[9][15] = "Sol";
grilleDonjon[9][19] = "Sol";
grilleDonjon[10][11] = "Tresor";  // Tresor
grilleDonjon[10][12] = "Sol";
grilleDonjon[10][13] = "Sol";
grilleDonjon[10][14] = "Sol";
grilleDonjon[10][15] = "Sol";
grilleDonjon[10][19] = "Sol";
grilleDonjon[10][20] = "Sol";
grilleDonjon[11][11] = "Sol";
grilleDonjon[11][12] = "Sol";
grilleDonjon[11][13] = "Sol";
grilleDonjon[11][19] = "Sol";
grilleDonjon[11][20] = "Sol";
grilleDonjon[11][21] = "Sol";
grilleDonjon[12][20] = "Monstre"; // Monstre
grilleDonjon[12][21] = "Sol";
grilleDonjon[13][20] = "Sol";
grilleDonjon[13][21] = "Sol";
grilleDonjon[14][20] = "Sol";
grilleDonjon[14][21] = "Bonhomme"; //Bonhomme
grilleDonjon[14][22] = "Sol";







console.table(grilleDonjon)