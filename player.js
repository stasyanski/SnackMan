function addPlayerLives() {
    let heartsCount = 3;                                                      // heart count set to 3 controlled by this variable
    let livesUL = document.querySelector('.lives ul');

    for (let i = 0; i < heartsCount; i++) {
        let heart = document.createElement('li');
        livesUL.appendChild(heart);                                           // appends the heart to the livel ul for each iteration of loop and it iterates 3 times as heartCount is 3                          
    }
}

document.addEventListener('DOMContentLoaded', addPlayerLives);
