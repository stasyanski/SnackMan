
// create a random maze matrix with walls, player, enemy and points
function createMaze() {
    let retries = 0;
    for (let i = 0; i < 10; i++) {
        if (retries > 100) {
            console.error('Failed to create maze after 100 retries');
            break;
        }
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