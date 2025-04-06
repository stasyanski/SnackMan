
function startPlayerMovement() {
    // start moving the player every 10 milliseconds
    playerMovementInterval = setInterval(movePlayer, 10);
}

function movePlayer() {
    // get the current position of the player
    const position = player.getBoundingClientRect();
    // check which key is pressed and move accordingly
    if (downPressed) {
        movePlayerInDirection(position, 0, 1, 'down'); // move down
    } else if (upPressed) {
        movePlayerInDirection(position, 0, -1, 'up'); // move up
    } else if (leftPressed) {
        movePlayerInDirection(position, -1, 0, 'left'); // move left
    } else if (rightPressed) {
        movePlayerInDirection(position, 1, 0, 'right'); // move right
    }
}

function movePlayerInDirection(position, deltaX, deltaY, direction) {
    // calculate new position based on movement
    const newLeft = position.left + deltaX;
    const newTop = position.top + deltaY;
    const newRight = position.right + deltaX;
    const newBottom = position.bottom + deltaY;

    // check if the player can move to the new position
    if (canMoveTo({ left: newLeft, right: newRight, top: newTop, bottom: newBottom }, direction)) {
        // update player's position and style
        playerLeft += deltaX;
        playerTop += deltaY;
        player.style.left = playerLeft + 'px'; // set new left position
        player.style.top = playerTop + 'px';   // set new top position
        playerMouth.className = direction;      // update player's mouth direction
    }
}

function removeLife() {
    // get all life indicators from the DOM
    const lives = document.querySelectorAll('.lives li');

    // if there are multiple lives left, remove one
    if (lives.length > 1) {
        lives[0].remove(); // remove the first life indicator
        player.classList.add('hit'); // add hit class to player
    } else {
        gameOver(); // trigger game over if no lives are left
    }
}