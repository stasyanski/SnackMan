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

function startEnemyMovement() {
    setTimeout(() => {
        enemyMovementInterval = setInterval(moveEnemies, 1250);
    }, 4000);
}

function moveEnemies() {
    const enemies = document.querySelectorAll('.enemy');

    enemies.forEach(enemy => {
        let enemyTop = parseInt(enemy.style.top) || 0;
        let enemyLeft = parseInt(enemy.style.left) || 0;
        let randDirection = Math.floor(Math.random() * 6);

        if (enemy.interval) clearInterval(enemy.interval);

        enemy.interval = setInterval(() => {
            randDirection = moveEnemy(enemy, enemyTop, enemyLeft, randDirection);
            enemyTop = parseInt(enemy.style.top) || 0;
            enemyLeft = parseInt(enemy.style.left) || 0;
        }, 10);
    });
}

function moveEnemy(enemy, enemyTop, enemyLeft, randDirection) {
    const enemyRect = enemy.getBoundingClientRect();
    let canMove = false;

    switch (randDirection) {
        case 1: 
            canMove = canMoveTo(enemyRect, 'down');
            if (canMove) {
                enemyTop++;
                enemy.style.top = enemyTop + 'px';
            }
            break;
        case 2:
            canMove = canMoveTo(enemyRect, 'up');
            if (canMove) {
                enemyTop--;
                enemy.style.top = enemyTop + 'px';
            }
            break;
        case 3:
            canMove = canMoveTo(enemyRect, 'left');
            if (canMove) {
                enemyLeft--;
                enemy.style.left = enemyLeft + 'px';
            }
            break;
        case 4:
            canMove = canMoveTo(enemyRect, 'right');
            if (canMove) {
                enemyLeft++;
                enemy.style.left = enemyLeft + 'px';
            }
            break;
        case 5: 
            break;
    }

    if (!canMove) {
        randDirection = randomExcludeDir(randDirection);
    }

    return randDirection;
}

function randomExcludeDir(excluded) {
    let randDirection;
    do {
        randDirection = Math.floor(Math.random() * 5);
    } while (randDirection === excluded);
    return randDirection;
}