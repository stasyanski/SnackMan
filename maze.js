
// create a random maze matrix with walls, player, enemy and points
function createMaze() {
    for (let i = 0; i < 10; i++) {
        const randArray = Math.floor(Math.random() * numOfRows);
        const randPos = Math.floor(Math.random() * rowLength);

        // check if the random position is empty (0) and not a player (2) or enemy (3), and if the surrounding positions are walls (1)
        if (mazeMatrix[randArray][randPos] == 0 && mazeMatrix[randArray][randPos] != 2 && mazeMatrix[randArray][randPos] != 3 &&
            (randArray - 1 < 0 || randPos - 1 < 0 || mazeMatrix[randArray - 1][randPos - 1] != 1) &&
            (randArray - 1 < 0 || randPos + 1 >= rowLength || mazeMatrix[randArray - 1][randPos + 1] != 1) &&
            (randArray + 1 >= numOfRows || randPos - 1 < 0 || mazeMatrix[randArray + 1][randPos - 1] != 1) &&
            (randArray + 1 >= numOfRows || randPos + 1 >= rowLength || mazeMatrix[randArray + 1][randPos + 1] != 1)
        ) {
            mazeMatrix[randArray][randPos] = 1;
            console.log('Wall @ ', randArray, randPos);
        } else {
            i--;
        }
    }
}
createMaze();

// function to populate the maze matrix with divs including wall, player, enemy or point
function mazeMatrixPopulate() {
    for (let y of mazeMatrix) {
        for (let x of y) {
            const block = document.createElement('div');
            block.classList.add('block');

            switch (x) {
                case 1:
                    block.classList.add('wall');
                    break;
                case 2:
                    block.id = 'player';
                    const mouth = document.createElement('div');
                    mouth.classList.add('mouth');
                    block.appendChild(mouth);
                    break;
                case 3:
                    block.classList.add('enemy');
                    break;
                default:
                    block.classList.add('point');
                    block.style.height = '1vh';
                    block.style.width = '1vh';
            }
            main.appendChild(block);
        }
    }
}
mazeMatrixPopulate();