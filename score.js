function resetScore() {
    // reset the score to zero
    score = 0;
}

function handlePointCollision(point, scoreP, points) {
    // check if the point is not already collected
    if (point.style.opacity != '0.15') {
        // mark the point as collected
        point.style.opacity = '0.15';
        // increment the score
        score++;
        // update the score display
        scoreP.innerHTML = parseInt(scoreP.innerHTML) + 1;
        // play the point collection audio
        pointCollectAudio.play();
        // reset the maze if score exceeds the number of points
        if (score > points.length) {
            mazeReset();
        }
    }
}

function disableMovement_1500ms() {
    // disable player movement
    movementAllowed = false;
    // reset movement keys
    upPressed = false;
    downPressed = false;
    leftPressed = false;
    rightPressed = false;

    // re-enable movement after 1500 milliseconds
    setTimeout(() => {
        movementAllowed = true;
    }, 1500);
}

function checkPointCollision() {
    // get the player's current position
    const position = player.getBoundingClientRect();
    // select all point elements
    const points = document.querySelectorAll('.point');
    // get the score display element
    const scoreP = document.querySelector('.score p');

    // check each point for collision with the player
    points.forEach(point => {
        const pointPos = point.getBoundingClientRect();
        if (isColliding(position, pointPos)) {
            // handle point collision if detected
            handlePointCollision(point, scoreP, points);
        }
    });
}

function startPointCollision() {
    // start checking for point collisions at regular intervals
    pointCollisionInterval = setInterval(checkPointCollision, 10);
}

function startEnemyCollision() {
    // start checking for enemy collisions at regular intervals
    enemyCollisionInterval = setInterval(checkEnemyCollision, 10);
}

function checkEnemyCollision() {
    // check if collisions can occur
    if (canCollide) {
        // get the player's current position
        const position = player.getBoundingClientRect();
        // select all enemy elements
        const enemies = document.querySelectorAll('.enemy');

        // check each enemy for collision with the player
        enemies.forEach(enemy => {
            const enemyPos = enemy.getBoundingClientRect();
            if (isColliding(position, enemyPos)) {
                // handle enemy collision if detected
                handleEnemyCollision();
            }
        });
    }
}

function handleEnemyCollision() {
    // check if a collision is not already being handled
    if (!collisionStatus) {
        // mark the collision as active
        collisionStatus = true;
        // disable player movement temporarily
        disableMovement_1500ms();
        // remove a life from the player
        removeLife();
        // prevent further collisions during the cooldown
        preventCollision();
        // reset the collision status after 1500 milliseconds
        setTimeout(() => {
            collisionStatus = false;
            // remove the hit class from the player
            player.classList.remove('hit');
        }, 1500);
    }
}