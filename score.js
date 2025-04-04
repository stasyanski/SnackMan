function resetScore() {
    score = 0;
    // const scoreP = document.querySelector('.score p');
    // scoreP.innerHTML = '0';
}

function handlePointCollision(point, scoreP, points) {
    if (point.style.opacity != '0.15') {
        point.style.opacity = '0.15';
        score++;
        scoreP.innerHTML = parseInt(scoreP.innerHTML) + 1;
        pointCollectAudio.play();
        if (score === points.length) {
            mazeReset();
        }
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

function startPointCollision() {
    pointCollisionInterval = setInterval(checkPointCollision, 10);
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