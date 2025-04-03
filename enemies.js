function addEnemies() {
    for (let i = 0; i < difficulty; i++) {
        const randArray = Math.floor(Math.random() * numOfRows);
        const randPos = Math.floor(Math.random() * rowLength);

        if (mazeMatrix[randArray][randPos] == 0) {
            mazeMatrix[randArray][randPos] = 3;
            console.log('Enemy @ ', randArray, randPos);
        } else {
            i--;
        }
    }
}
addEnemies();