// additional feature - IIFE dynamic title, each letter is displayed one by one, creating a cool typewriter effect
(() => {
    const title = document.querySelector('header h1');
    const titleText = title.innerHTML; // store the title text as a variable to be used for dynamic display
    title.innerHTML = ''; // clears the title text so it can be added one by one

    titleText.split('').forEach((char, i) => {
        setTimeout(() => {
            title.innerHTML += char; // adds each character to the title one by one with every timeout
        }, i * 200); // each character is added every 200ms
    });
})();

// additional feature - level text displayed on each level, e.g., "LEVEL 1, GOOD LUCK"
function levelText() {
    const displayDiv = document.createElement('div'); // create the text
    displayDiv.innerHTML = `LEVEL ${difficulty}! GOOD LUCK`;
    displayDiv.className = 'level-text'; // add the CSS properties to the text

    document.body.appendChild(displayDiv); // display the text on the screen

    setTimeout(() => { // fade-in effect for the text
        displayDiv.style.opacity = '1';
        setTimeout(() => {
            displayDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(displayDiv); // removes the text to avoid conflicts like pointer events
            }, 2000);
        }, 3000);
    }, 0);
}

// append player lives to ui
function addPlayerLives() {
    let heartsCount = 3;                                                      // heart count set to 3 controlled by this variable
    const livesUL = document.querySelector('.lives ul');

    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('li');
        livesUL.appendChild(heart);                                           // appends the heart to the livel ul for each iteration of loop and it iterates 3 times as heartCount is 3                          
    }
}
document.addEventListener('DOMContentLoaded', addPlayerLives);