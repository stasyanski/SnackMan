let mazeMatrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const numOfRows = mazeMatrix.length;
const rowLength = mazeMatrix[0].length;

let canCollide = true;                                               // used to prevent multiple collisions from happening in a row, for example, if colliding with an enemy, the player can only collide once
let collisionStatus = false;                                         // prevents the collision from being called a quintillion times (or however fast js is) over and over while the collision if statement is active
let enemyMovementInterval;                                           // global var to be used in the stopInterval function to stop the enemy movement interval
let enemyCollisionInterval;                                          // global var used in the stopInterval function to stop the enemy collision interval
let movementAllowed = true;                                          // used to disable movement for 1.5sec 

let difficulty = 1; // difficulty level is used for tracking nr of enemies and the text level of the game, and points to take away when there is an additional enemy 

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector('main');
const startDiv = document.querySelector('.startDiv')                   