// function to listen for key presses and call the appropriate functions
function setupEventListeners() {
    document.addEventListener('keydown', keyDown); // listen for key down events
    document.addEventListener('keyup', keyUp); // listen for key up events
    setupArrowButtons(); // set up button event listeners for arrow buttons
}

// function to handle key down events
function keyDown(event) {
    if (movementAllowed) { // check if movement is allowed
        switch (event.key) { // check which key was pressed
            case 'ArrowUp': upPressed = true; break; // set upPressed to true for up arrow
            case 'ArrowDown': downPressed = true; break; // set downPressed to true for down arrow
            case 'ArrowLeft': leftPressed = true; break; // set leftPressed to true for left arrow
            case 'ArrowRight': rightPressed = true; break; // set rightPressed to true for right arrow
        }
    }
}

// function to handle key up events
function keyUp(event) {
    if (movementAllowed) { // check if movement is allowed
        switch (event.key) { // check which key was released
            case 'ArrowUp': upPressed = false; break; // set upPressed to false for up arrow
            case 'ArrowDown': downPressed = false; break; // set downPressed to false for down arrow
            case 'ArrowLeft': leftPressed = false; break; // set leftPressed to false for left arrow
            case 'ArrowRight': rightPressed = false; break; // set rightPressed to false for right arrow
        }
    }
}

// function to set up button event listeners for arrow buttons
function setupArrowButtons() {
    const up = document.querySelector('#ubttn'); // select up button
    const down = document.querySelector('#dbttn'); // select down button
    const left = document.querySelector('#lbttn'); // select left button
    const right = document.querySelector('#rbttn'); // select right button

    up.addEventListener('click', () => setDirection('up')); // set direction to up on button click
    down.addEventListener('click', () => setDirection('down')); // set direction to down on button click
    left.addEventListener('click', () => setDirection('left')); // set direction to left on button click
    right.addEventListener('click', () => setDirection('right')); // set direction to right on button click
}

// function to set the direction based on button or key press
function setDirection(direction) {
    if (movementAllowed) { // check if movement is allowed
        upPressed = direction === 'up'; // set upPressed based on direction
        downPressed = direction === 'down'; // set downPressed based on direction
        leftPressed = direction === 'left'; // set leftPressed based on direction
        rightPressed = direction === 'right'; // set rightPressed based on direction
    }
}