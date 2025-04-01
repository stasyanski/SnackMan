function addEnemies(numOfEnemies) {
    for (let i = 0; i < numOfEnemies; i++) {
        let randArray = Math.floor(Math.random() * numOfRows);
        let randPos = Math.floor(Math.random() * rowLength);

        if (mazeMatrix[randArray][randPos] == 0) {
            mazeMatrix[randArray][randPos] = 3;
        } else {
            i--;
        }
    }
}
addEnemies(difficulty);