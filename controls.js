function setupEventListeners() {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    setupArrowButtons();
}

function keyDown(event) {
    if (movementAllowed) {
        switch (event.key) {
            case 'ArrowUp': upPressed = true; break;
            case 'ArrowDown': downPressed = true; break;
            case 'ArrowLeft': leftPressed = true; break;
            case 'ArrowRight': rightPressed = true; break;
        }
    }
}

function keyUp(event) {
    if (movementAllowed) {
        switch (event.key) {
            case 'ArrowUp': upPressed = false; break;
            case 'ArrowDown': downPressed = false; break;
            case 'ArrowLeft': leftPressed = false; break;
            case 'ArrowRight': rightPressed = false; break;
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