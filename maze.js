
// create a random maze matrix with walls, player, enemy and points
function createMaze() {
    resetMazeMatrix(); // gets rid of all inner walls
    const randArray = Math.floor(Math.random() * numOfRows);
    const randPos = Math.floor(Math.random() * rowLength);

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
        retries++;
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

function resetMazeMatrix() {
    for (let i = 1; i < mazeMatrix.length - 1; i++) { // Skip the first and last rows
        for (let j = 1; j < mazeMatrix[i].length - 1; j++) { // Skip the first and last columns
            if (mazeMatrix[i][j] === 1) { // Reset only walls (1)
                mazeMatrix[i][j] = 0;
            }
        }
    }
}

function mazeReset() {
    main.innerHTML = '';
    difficulty++;
    stopIntervals();
    createMaze();
    addEnemies();
    mazeMatrixPopulate();
    initializePlayer();
    startGame();
}