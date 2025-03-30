let difficulty = 1;

function addEnemies(numOfEnemies) {
    const numOfRows = window.mazeMatrix.length;
    const rowLength = window.mazeMatrix[0].length;

    for (let i = 0; i < numOfEnemies; i++) {
        let randArray = Math.floor(Math.random() * numOfRows);
        let randPos = Math.floor(Math.random() * rowLength);

        if (window.mazeMatrix[randArray][randPos] == 0) {
            window.mazeMatrix[randArray][randPos] = 3;
        } else {
            i--;
        }
    }
}
addEnemies(difficulty);