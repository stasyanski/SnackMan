
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

    const pointsToCheck = [
        { x: newLeft, y: newTop }, 
        { x: newRight, y: newTop },
        { x: newLeft, y: newBottom }, 
        { x: newRight, y: newBottom }, 
    ];

    if (canMove(pointsToCheck)) {
        playerLeft += deltaX;
        playerTop += deltaY;
        player.style.left = playerLeft + 'px';
        player.style.top = playerTop + 'px';
        playerMouth.className = direction; 
    }
}

function canMove(points) {
    for (const point of points) {
        const element = document.elementFromPoint(point.x, point.y);
        if (element && element.classList.contains('wall')) {
            return false; 
        }
    }
    return true; 
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
            moveEnemy(enemy, enemyTop, enemyLeft, randDirection);
        }, 10);
    });
}

function moveEnemy(enemy, enemyTop, enemyLeft, randDirection) {
    const enemyRect = enemy.getBoundingClientRect();

    switch (randDirection) {
        case 1: // Down
            if (canMove(enemyRect.left, enemyRect.bottom + 1, 'down')) {
                enemyTop++;
                enemy.style.top = enemyTop + 'px';
            } else {
                randDirection = randomExcludeDir(randDirection);
            }
            break;
        case 2: // Up
            if (canMove(enemyRect.left, enemyRect.top - 1, 'up')) {
                enemyTop--;
                enemy.style.top = enemyTop + 'px';
            } else {
                randDirection = randomExcludeDir(randDirection);
            }
            break;
        case 3: // Left
            if (canMove(enemyRect.left - 1, enemyRect.top, 'left')) {
                enemyLeft--;
                enemy.style.left = enemyLeft + 'px';
            } else {
                randDirection = randomExcludeDir(randDirection);
            }
            break;
        case 4: // Right
            if (canMove(enemyRect.right + 1, enemyRect.top, 'right')) {
                enemyLeft++;
                enemy.style.left = enemyLeft + 'px';
            } else {
                randDirection = randomExcludeDir(randDirection);
            }
            break;
        case 5: // Do nothing
            break;
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
