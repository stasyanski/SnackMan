
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

function initializePlayer() {
    player = document.querySelector('#player');
    playerMouth = player.querySelector('.mouth');
    playerTop = 0;
    playerLeft = 0;
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