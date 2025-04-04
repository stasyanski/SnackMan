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
let movementAllowed = true;                                          // used to disable movement for 1.5sec 

let difficulty = 1; // difficulty level is used for tracking nr of enemies and the text level of the game, and points to take away when there is an additional enemy 
let score=0;

let player;
let playerMouth;
let playerTop = 0;
let playerLeft = 0;

const gameMusic = new Audio('sfx/game_music.mp3'); 
const pointCollectAudio = new Audio('sfx/point_collect-audacity.mp3'); 

let playerMovementInterval, pointCollisionInterval, enemyCollisionInterval, enemyMovementInterval;

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector('main');
const startDiv = document.querySelector('.startDiv')                   