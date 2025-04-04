
if (startDiv !== null) {
    startDiv.addEventListener('click', remove_startDiv);
    startDiv.addEventListener('click', startGame);
}

function remove_startDiv() {
    startDiv.style.display = 'none';
}

function startGame() {
    setupGame();
    setupEventListeners();
    startGameMusic();
    initializePlayer();
    startPlayerMovement();
    startPointCollision();
    startEnemyCollision();
    startEnemyMovement();
}

function setupGame() {
    levelText();
    resetScore();
}

function startGameMusic() {
    gameMusic.loop = true;
    gameMusic.play();
}

function resetScore() {
    score = 0;
    const scoreP = document.querySelector('.score p');
    scoreP.innerHTML = '0';
}

function initializePlayer() {
    player = document.querySelector('#player');
    playerMouth = player.querySelector('.mouth');
    playerTop = 0;
    playerLeft = 0;
}

function setupEventListeners() {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    setupArrowButtons();
}

function keyDown(event) {
    if (movementAllowed) {
        switch (event.key) {
            case 'ArrowUp':
                upPressed = true;
                break;
            case 'ArrowDown':
                downPressed = true;
                break;
            case 'ArrowLeft':
                leftPressed = true;
                break;
            case 'ArrowRight':
                rightPressed = true;
                break;
        }
    }
}

function keyUp(event) {
    if (movementAllowed) {
        switch (event.key) {
            case 'ArrowUp':
                upPressed = false;
                break;
            case 'ArrowDown':
                downPressed = false;
                break;
            case 'ArrowLeft':
                leftPressed = false;
                break;
            case 'ArrowRight':
                rightPressed = false;
                break;
        }
    }
}

function setupArrowButtons() {
    const up = document.querySelector('#ubttn');
    const down = document.querySelector('#dbttn');
    const left = document.querySelector('#lbttn');
    const right = document.querySelector('#rbttn');

    up.addEventListener('click', () => setDirection('up'));
    down.addEventListener('click', () => setDirection('down'));
    left.addEventListener('click', () => setDirection('left'));
    right.addEventListener('click', () => setDirection('right'));
}

function setDirection(direction) {
    if (movementAllowed) {
        upPressed = direction === 'up';
        downPressed = direction === 'down';
        leftPressed = direction === 'left';
        rightPressed = direction === 'right';
    }
}

function startPlayerMovement() {
    playerMovementInterval = setInterval(movePlayer, 10);
}


function movePlayer() {
    const position = player.getBoundingClientRect();
    if (downPressed) {
        movePlayerInDirection(position, 0, 1, 'down');
    } else if (upPressed) {
        movePlayerInDirection(position, 0, -1, 'up');
    } else if (leftPressed) {
        movePlayerInDirection(position, -1, 0, 'left');
    } else if (rightPressed) {
        movePlayerInDirection(position, 1, 0, 'right');
    }
}

function movePlayerInDirection(position, deltaX, deltaY, direction) {
    const newLeft = position.left + deltaX;
    const newTop = position.top + deltaY;
    const newRight = position.right + deltaX;
    const newBottom = position.bottom + deltaY;

    // Use canMoveTo for player movement
    if (canMoveTo({ left: newLeft, right: newRight, top: newTop, bottom: newBottom }, direction)) {
        playerLeft += deltaX;
        playerTop += deltaY;
        player.style.left = playerLeft + 'px';
        player.style.top = playerTop + 'px';
        playerMouth.className = direction; 
    }
}

function startPointCollision() {
    pointCollisionInterval = setInterval(checkPointCollision, 10);
}

function checkPointCollision() {
    const position = player.getBoundingClientRect();
    const points = document.querySelectorAll('.point');
    const scoreP = document.querySelector('.score p');

    points.forEach(point => {
        const pointPos = point.getBoundingClientRect();
        if (isColliding(position, pointPos)) {
            handlePointCollision(point, scoreP, points);
        }
    });
}

function isColliding(position, pointPos) {
    return (
        position.right > pointPos.left &&
        position.left < pointPos.right &&
        position.bottom > pointPos.top &&
        position.top < pointPos.bottom
    );
}

function handlePointCollision(point, scoreP, points) {
    if (point.style.opacity != '0.15') {
        point.style.opacity = '0.15';
        score++;
        scoreP.innerHTML = parseInt(scoreP.innerHTML) + 1;
        pointCollectAudio.play();
        if (score === points.length) mazeReset();
    }
}

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
            // Update enemyTop and enemyLeft with the new positions after movement
            enemyTop = parseInt(enemy.style.top) || 0;
            enemyLeft = parseInt(enemy.style.left) || 0;
        }, 10);
    });
}

function canMoveTo(rect, direction) {
    if (direction === 'down') {
        return !document.elementFromPoint(rect.left, rect.bottom + 1)?.classList.contains('wall') &&
               !document.elementFromPoint(rect.right, rect.bottom + 1)?.classList.contains('wall');
    } else if (direction === 'up') {
        return !document.elementFromPoint(rect.left, rect.top - 1)?.classList.contains('wall') &&
               !document.elementFromPoint(rect.right, rect.top - 1)?.classList.contains('wall');
    } else if (direction === 'left') {
        return !document.elementFromPoint(rect.left - 1, rect.top)?.classList.contains('wall') &&
               !document.elementFromPoint(rect.left - 1, rect.bottom)?.classList.contains('wall');
    } else if (direction === 'right') {
        return !document.elementFromPoint(rect.right + 1, rect.top)?.classList.contains('wall') &&
               !document.elementFromPoint(rect.right + 1, rect.bottom)?.classList.contains('wall');
    }
    return false;
}

function moveEnemy(enemy, enemyTop, enemyLeft, randDirection) {
    const enemyRect = enemy.getBoundingClientRect();
    let canMove = false;

    switch (randDirection) {
        case 1: // Down
            canMove = canMoveTo(enemyRect, 'down');
            if (canMove) {
                enemyTop++;
                enemy.style.top = enemyTop + 'px';
            }
            break;
        case 2: // Up
            canMove = canMoveTo(enemyRect, 'up');
            if (canMove) {
                enemyTop--;
                enemy.style.top = enemyTop + 'px';
            }
            break;
        case 3: // Left
            canMove = canMoveTo(enemyRect, 'left');
            if (canMove) {
                enemyLeft--;
                enemy.style.left = enemyLeft + 'px';
            }
            break;
        case 4: // Right
            canMove = canMoveTo(enemyRect, 'right');
            if (canMove) {
                enemyLeft++;
                enemy.style.left = enemyLeft + 'px';
            }
            break;
        case 5: // Do nothing
            break;
    }

    if (!canMove) {
        randDirection = randomExcludeDir(randDirection);
    }

    return randDirection; // Return the possibly updated direction
}

function randomExcludeDir(excluded) {
    let randDirection;
    do {
        randDirection = Math.floor(Math.random() * 5);
    } while (randDirection === excluded);
    return randDirection;
}

function startEnemyCollision() {
    enemyCollisionInterval = setInterval(checkEnemyCollision, 10);
}

function checkEnemyCollision() {
    if (canCollide) {
        const position = player.getBoundingClientRect();
        const enemies = document.querySelectorAll('.enemy');

        enemies.forEach(enemy => {
            const enemyPos = enemy.getBoundingClientRect();
            if (isColliding(position, enemyPos)) {
                handleEnemyCollision();
            }
        });
    }
}

function handleEnemyCollision() {
    if (!collisionStatus) {
        collisionStatus = true;
        disableMovement_1500ms();
        removeLife();
        preventCollision();
        setTimeout(() => {
            collisionStatus = false;
            player.classList.remove('hit');
        }, 1500);
    }
}

function randomExcludeDir(excluded) {
    let randDirection;
    do {
        randDirection = Math.floor(Math.random() * 5);
    } while (randDirection === excluded);
    return randDirection;
}

function stopIntervals() {
    clearInterval(playerMovementInterval);
    clearInterval(pointCollisionInterval);
    clearInterval(enemyCollisionInterval);
    clearInterval(enemyMovementInterval);
    document.querySelectorAll('.enemy').forEach(enemy => {
        clearInterval(enemy.interval);
    });
}

function removeLife() {
    const lives = document.querySelectorAll('.lives li');

    if (lives.length > 1) {
        lives[0].remove();
        player.classList.add('hit');
    } else {
        gameOver();
    }
}

function gameOver() {
    player.classList.add('dead');
    const startH1 = document.querySelector('.start h1');
    const startDiv = document.querySelector('.startDiv');
    startH1.innerHTML = 'You lost! Restart?';
    startDiv.style.display = 'flex';
    stopIntervals();
    saveScorePrompt();

    startDiv.addEventListener('click', restartGame);
}

function restartGame() {
    location.reload();
}

function saveScorePrompt() {
    const user = prompt('Enter your name to save your score!', 'type here!');
    const score = document.querySelector('.score p').innerHTML;

    if (user != null) {
        localStorage.setItem(user, score);
    }
}

function disableMovement_1500ms() {
    movementAllowed = false;
    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;

    setTimeout(() => {
        movementAllowed = true;
    }, 1500);
}

function mazeReset() {
    MAIN.innerHTML = '';
    difficulty++;
    stopIntervals();
    createMaze();
    addEnemies();
    mazePopulate();
    startGame();
}
