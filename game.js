
if (startDiv !== null) {
    startDiv.addEventListener('click', remove_startDiv); // add click event to remove startDiv
    startDiv.addEventListener('click', startGame); // add click event to start the game
}

function remove_startDiv() {
    startDiv.style.display = 'none'; // hide the startDiv
}

function startGame() {
    setupGame(); // initialize game settings
    setupEventListeners(); // set up event listeners for the game
    startGameMusic(); // start the background music for the game
    initializePlayer(); // initialize player settings
    startPlayerMovement(); // start player movement logic
    startPointCollision(); // initiate point collision detection
    startEnemyCollision(); // initiate enemy collision detection
    startEnemyMovement(); // start enemy movement logic
}

function setupGame() {
    levelText(); // display current level text
    resetScore(); // reset the score to zero
}

function initializePlayer() {
    player = document.querySelector('#player'); // select the player element
    playerMouth = player.querySelector('.mouth'); // select the player's mouth element
    playerTop = 0; // initialize player's vertical position
    playerLeft = 0; // initialize player's horizontal position
}

function stopIntervals() {
    clearInterval(playerMovementInterval); // stop player movement interval
    clearInterval(pointCollisionInterval); // stop point collision interval
    clearInterval(enemyCollisionInterval); // stop enemy collision interval
    clearInterval(enemyMovementInterval); // stop enemy movement interval
    document.querySelectorAll('.enemy').forEach(enemy => {
        clearInterval(enemy.interval); // stop each enemy's individual interval
    });
}

function gameOver() {
    player.classList.add('dead'); // add dead class to player
    const startH1 = document.querySelector('.start h1'); // select the heading in startDiv
    const startDiv = document.querySelector('.startDiv'); // select the startDiv
    startH1.innerHTML = 'You lost! Restart?'; // update heading text to indicate game over
    startDiv.style.display = 'flex'; // show startDiv again
    stopIntervals(); // stop all game intervals
    saveScorePrompt(); // prompt user to save their score
    startDiv.addEventListener('click', restartGame); // add click event to restart game
}

function restartGame() {
    location.reload(); // reload the page to restart the game
}

function saveScorePrompt() {
    const user = prompt('Enter your name to save your score!', 'type here!'); // prompt user for their name
    const score = document.querySelector('.score p').innerHTML; // get current score

    if (user != null) {
        localStorage.setItem(user, score); // save score to local storage with user's name
    }
}