
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

    if (canMoveTo({ left: newLeft, right: newRight, top: newTop, bottom: newBottom }, direction)) {
        playerLeft += deltaX;
        playerTop += deltaY;
        player.style.left = playerLeft + 'px';
        player.style.top = playerTop + 'px';
        playerMouth.className = direction;
    }
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