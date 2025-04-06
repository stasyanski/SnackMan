// function to create a random maze matrix with walls, player, enemy, and points
function createMaze() {
    resetMazeMatrix(); // reset maze matrix to remove walls
    let retries = 0; // initialize retries count
    for (let i = 0; i < 10; i++) { // attempt to create 10 walls
        if (retries > 100) { // check if retries exceed 100
            console.log('Failed to create maze after 100 retries'); // log failure
            break; // exit loop if too many retries
        }
        const randArray = Math.floor(Math.random() * numOfRows); // random row
        const randPos = Math.floor(Math.random() * rowLength); // random column

        // check conditions to place a wall (1)
        if (mazeMatrix[randArray][randPos] == 0 && mazeMatrix[randArray][randPos] != 2 && mazeMatrix[randArray][randPos] != 3 &&
            (randArray - 1 < 0 || randPos - 1 < 0 || mazeMatrix[randArray - 1][randPos - 1] != 1) &&
            (randArray - 1 < 0 || randPos + 1 >= rowLength || mazeMatrix[randArray - 1][randPos + 1] != 1) &&
            (randArray + 1 >= numOfRows || randPos - 1 < 0 || mazeMatrix[randArray + 1][randPos - 1] != 1) &&
            (randArray + 1 >= numOfRows || randPos + 1 >= rowLength || mazeMatrix[randArray + 1][randPos + 1] != 1)
        ) {
            mazeMatrix[randArray][randPos] = 1; // set wall in maze
            console.log('Wall @ ', randArray, randPos); // log wall position
        } else {
            i--; // decrease the count if wall not placed
            retries++; // increment retries
        }
    }
}
createMaze(); // call function to create maze

// function to populate the maze matrix with divs including wall, player, enemy, or point
function mazeMatrixPopulate() {
    for (let y of mazeMatrix) { // iterate through rows
        for (let x of y) { // iterate through columns
            const block = document.createElement('div'); // create a new div for each block
            block.classList.add('block'); // add base class for styling

            // switch case to determine block type
            switch (x) {
                case 1: // wall
                    block.classList.add('wall'); // add wall class
                    break;
                case 2: // player
                    block.id = 'player'; // set player ID
                    const mouth = document.createElement('div'); // create mouth element for player
                    mouth.classList.add('mouth'); // add class for styling
                    block.appendChild(mouth); // append mouth to player block
                    break;
                case 3: // enemy
                    block.classList.add('enemy'); // add enemy class
                    break;
                default: // point (0)
                    block.classList.add('point'); // add point class
                    block.style.height = '1vh'; // set height for point
                    block.style.width = '1vh'; // set width for point
            }
            main.appendChild(block); // append block to main container
        }
    }
}
mazeMatrixPopulate(); // call function to populate maze

// function to reset maze matrix, removing walls
function resetMazeMatrix() {
    for (let i = 1; i < mazeMatrix.length - 1; i++) { // skip the first and last rows
        for (let j = 1; j < mazeMatrix[i].length - 1; j++) { // skip the first and last columns
            if (mazeMatrix[i][j] === 1) { // check if cell is a wall
                mazeMatrix[i][j] = 0; // reset wall to empty space
            }
        }
    }
}

// function to reset maze and initialize a new game
function mazeReset() {
    main.innerHTML = ''; // clear the main container
    difficulty++; // increment game difficulty
    stopIntervals(); // stop any ongoing intervals
    createMaze(); // create a new maze
    addEnemies(); // add enemies to the maze
    mazeMatrixPopulate(); // populate the maze with new blocks
    initializePlayer(); // initialize player position
    startGame(); // start the game
}