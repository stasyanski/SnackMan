function addEnemies() {
    // log the difficulty level for adding enemies
    console.log('Adding enemies for difficulty:', difficulty);

    // iterate through the maze matrix to reset enemy positions
    for (let i = 0; i < mazeMatrix.length; i++) {
        for (let j = 0; j < mazeMatrix[i].length; j++) {
            // change enemy position (3) to empty space (0)
            if (mazeMatrix[i][j] === 3) {
                mazeMatrix[i][j] = 0; 
            }
        }
    }

    // add enemies based on the difficulty level
    for (let i = 0; i < difficulty; i++) {
        // generate random positions in the maze
        const randArray = Math.floor(Math.random() * numOfRows);
        const randPos = Math.floor(Math.random() * rowLength);

        // check if the position is empty (0) to place an enemy
        if (mazeMatrix[randArray][randPos] === 0) {
            mazeMatrix[randArray][randPos] = 3; // set position to enemy (3)
            console.log('Enemy @', randArray, randPos); // log enemy position
        } else {
            i--; // if the position is not empty, try again
        }
    }
}
addEnemies(); // call the function to add enemies

function startEnemyMovement() {
    // start enemy movement after a delay
    setTimeout(() => {
        enemyMovementInterval = setInterval(moveEnemies, 1250); // set interval for enemy movement
    }, 4000);
}

function moveEnemies() {
    // select all enemy elements in the document
    const enemies = document.querySelectorAll('.enemy');

    // iterate through each enemy to move them
    enemies.forEach(enemy => {
        let enemyTop = parseInt(enemy.style.top) || 0; // get current top position
        let enemyLeft = parseInt(enemy.style.left) || 0; // get current left position
        let randDirection = Math.floor(Math.random() * 6); // random initial direction

        if (enemy.interval) clearInterval(enemy.interval); // clear previous interval if exists

        // set an interval for continuous movement of the enemy
        enemy.interval = setInterval(() => {
            randDirection = moveEnemy(enemy, enemyTop, enemyLeft, randDirection); // move enemy
            enemyTop = parseInt(enemy.style.top) || 0; // update enemy top position
            enemyLeft = parseInt(enemy.style.left) || 0; // update enemy left position
        }, 10); // update every 10 milliseconds
    });
}

function moveEnemy(enemy, enemyTop, enemyLeft, randDirection) {
    // get the bounding rectangle of the enemy for collision detection
    const enemyRect = enemy.getBoundingClientRect();
    let canMove = false; // flag to check if movement is possible

    // determine movement direction based on random direction
    switch (randDirection) {
        case 1: 
            canMove = canMoveTo(enemyRect, 'down'); // check if can move down
            if (canMove) {
                enemyTop++; // increment top position
                enemy.style.top = enemyTop + 'px'; // update enemy position
            }
            break;
        case 2:
            canMove = canMoveTo(enemyRect, 'up'); // check if can move up
            if (canMove) {
                enemyTop--; // decrement top position
                enemy.style.top = enemyTop + 'px'; // update enemy position
            }
            break;
        case 3:
            canMove = canMoveTo(enemyRect, 'left'); // check if can move left
            if (canMove) {
                enemyLeft--; // decrement left position
                enemy.style.left = enemyLeft + 'px'; // update enemy position
            }
            break;
        case 4:
            canMove = canMoveTo(enemyRect, 'right'); // check if can move right
            if (canMove) {
                enemyLeft++; // increment left position
                enemy.style.left = enemyLeft + 'px'; // update enemy position
            }
            break;
        case 5: 
            break; // do nothing for case 5
    }

    // if movement is not possible, get a new direction
    if (!canMove) {
        randDirection = randomExcludeDir(randDirection); // exclude the current direction
    }

    return randDirection; // return the new direction
}

function randomExcludeDir(excluded) {
    let randDirection;
    // generate a random direction excluding the specified one
    do {
        randDirection = Math.floor(Math.random() * 5); // random direction between 0 and 4
    } while (randDirection === excluded); // ensure it's not the excluded direction
    return randDirection; // return the new direction
} 