if (startDiv !== null) {
    function startGame() {                                              // function startGame is created which maps player movement allowing game to function as intended
        levelText();                                                    // call level Text function to display text on each level
        GAME_MUSIC.loop = true;                                          // loops the audio so it plays forever during the game
        GAME_MUSIC.play();                                               // plays the game music when the game starts, cant be called before, as web browsers block autoplaying audio, tested on Edge
        let score = 0;                                                  // resets the score to 0 on startgame so that it can be compared with points.length

        let player = document.querySelector('#player');
        let playerMouth = player.querySelector('.mouth');
        let playerTop = 0;
        let playerLeft = 0;

        function keyUp(event) {
            if (movementAllowed) {
                if (event.key === 'ArrowUp') {
                    upPressed = false;
                } else if (event.key === 'ArrowDown') {
                    downPressed = false;
                } else if (event.key === 'ArrowLeft') {
                    leftPressed = false;
                } else if (event.key === 'ArrowRight') {
                    rightPressed = false;
                }
            }
        }

        function keyDown(event) {
            if (movementAllowed) {
                if (event.key === 'ArrowUp') {
                    upPressed = true;
                } else if (event.key === 'ArrowDown') {
                    downPressed = true;
                } else if (event.key === 'ArrowLeft') {
                    leftPressed = true;
                } else if (event.key === 'ArrowRight') {
                    rightPressed = true;
                }
            }
        }

        // 6) Implement the arrow buttons. The player will continue moving in that direction when an arrow button is clicked. Only one arrow direction can be used at a time. The player should only move in that direction.
        (() => {                        // mapping the css buttons to the player movement using event listeners, wrapped in an immediately invoked function expression (IIFE), running as soon as defined
            let up = document.querySelector('#ubttn');
            let down = document.querySelector('#dbttn');
            let left = document.querySelector('#lbttn');
            let right = document.querySelector('#rbttn');

            up.addEventListener('click', () => {
                if (movementAllowed) {
                    upPressed = true;
                    downPressed = false;
                    leftPressed = false;
                    rightPressed = false;
                }
            });

            down.addEventListener('click', () => {
                if (movementAllowed) {
                    upPressed = false;
                    downPressed = true;                     // sets the respective direction to true which moves the snack man when button is pressed
                    leftPressed = false;
                    rightPressed = false;
                }
            });

            left.addEventListener('click', () => {
                if (movementAllowed) {
                    upPressed = false;
                    downPressed = false;
                    leftPressed = true;
                    rightPressed = false;
                }
            });

            right.addEventListener('click', () => {
                if (movementAllowed) {
                    upPressed = false;
                    downPressed = false;
                    leftPressed = false;
                    rightPressed = true;
                }
            });
        })();

        // 3) Stop the player from walking through the newMaze's walls (blue squares).
        let playerMovementInterval = setInterval(() => {
            if (downPressed) {
                let position = player.getBoundingClientRect()                                 // returns size of CSS element and its relative position using px
                let newBottom = position.bottom + 1;                                          // newBottom is set to the bottom of the player position + 1px

                let btmL = document.elementFromPoint(position.left, newBottom);               // reference the bottom left of the CSS element, position.left and newBottom are x,y coords respectively
                let btmR = document.elementFromPoint(position.right, newBottom);

                if (btmL && btmR && btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false) { // allows movement only if btmL and btmR does not contain CSS wall class
                    playerTop++;                                                              // increments playerTop by 1 which moves the player down
                    player.style.top = playerTop + 'px';                                      // sets the player position to the new playerTop which was incemented by 1
                }
                playerMouth.classList = 'down';
            }
            else if (upPressed) {
                let position = player.getBoundingClientRect();
                let newTop = position.top - 1;

                let topL = document.elementFromPoint(position.left, newTop);
                let topR = document.elementFromPoint(position.right, newTop);

                if (topL && topR && topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
                    playerTop--;
                    player.style.top = playerTop + 'px';
                }
                playerMouth.classList = 'up';
            }
            else if (leftPressed) {
                let position = player.getBoundingClientRect();
                let newLeft = position.left - 1;

                let topL = document.elementFromPoint(newLeft, position.top);
                let topR = document.elementFromPoint(newLeft, position.bottom);

                if (topL && topR && topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
                    playerLeft--;
                    player.style.left = playerLeft + 'px';
                }
                playerMouth.classList = 'left';
            }
            else if (rightPressed) {
                let position = player.getBoundingClientRect();
                let newRight = position.right + 1;

                let topL = document.elementFromPoint(newRight, position.top);
                let topR = document.elementFromPoint(newRight, position.bottom);

                if (topL && topR && topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
                    playerLeft++;
                    player.style.left = playerLeft + 'px';
                }
                playerMouth.classList = 'right';
            }
        }, 10);

        // 4) When the player touches a point (small white circle element), the point is removed from the newMaze.
        let pointCollisionInterval = setInterval(() => {
            // for point collision, scoreP, score, points and position is initialised here so the for loop doesn't initialise it every time for code efficiency
            let scoreP = document.querySelector('.score p');
            let points = document.querySelectorAll('.point');
            let position = player.getBoundingClientRect();

            for (let i = 0; i < points.length; i++) {                   // 0 is initialised, i<points.length is the condition, i++ increments i by 1 at end of each loop
                let pointPos = points[i].getBoundingClientRect();       // pointsPos initialised here as it is different for each iteration of the loop

                if (                                                    // if statement checks if the player is within the point position                  
                    position.right > pointPos.left &&
                    position.left < pointPos.right &&
                    position.bottom > pointPos.top &&
                    position.top < pointPos.bottom
                ) {
                    if (points[i].style.opacity != '0.15') {            // check if current point opacity is not 0.15, if it isnt increment score by one and change opacity to 0.15
                        // 5) Update the score for every point the player collects (<p> tag in .score).
                        scoreP.innerHTML = parseInt(scoreP.innerHTML) + 1;
                        // pointCollectAudio.play();                           // plays the point collect audio when playermodel collides with point, this can be controlled by volume slider 
                        score++;                                            // increment score by 1, score and score p tag is separate so that score can be compaerd to points.length and keep score consistent between levels
                    }
                    points[i].style.opacity = '0.15';

                    if (score == points.length) {
                        // 6) A game-over message will appear when the player collects all the points.
                        mazeReset();                                    // calls mazeReset function to reset the newMaze and player position to make a new layout and continue game
                    }
                }
            }
        }, 10);

        // 7) If the player touches an enemy (green circle element), a game-over message will appear,and the player will display the dead animation (css class .dead).
        enemyCollisionInterval = setInterval(() => {
            if (canCollide == true) {                                               // if statement to check if canCollide is true, if it is, the function is called
                let enemies = document.querySelectorAll('.enemy');
                let position = player.getBoundingClientRect();

                enemies.forEach(function enemyColl(enemy) {                         // for each is used to iterate over each enemy in the enemies list / array
                    let enemyPos = enemy.getBoundingClientRect();

                    if (
                        position.right > enemyPos.left &&
                        position.left < enemyPos.right &&
                        position.bottom > enemyPos.top &&
                        position.top < enemyPos.bottom
                    ) {
                        if (collisionStatus == false) {
                            collisionStatus = true;
                            disableMovement_1500ms();                               // disables movement for 1.5 seconds when playermodel collides with enemy
                            removeLife();
                            preventCollision();                                     // prevents collision for 5 seconds after a collision, giving invincibility

                            setTimeout(() => {
                                collisionStatus = false;
                                player.classList.remove('hit');                     // need to remove classlist so that later it can be re - added 
                            }, 1500);                                               // delay of 1.5 seconds as per as2 brief
                        }
                    }                                                               // calls removeLife function to remove a life from the player
                });
            }
        }, 10);

        // If they hit a wall, they should move in a new direction (they should not get stuck).
        function randomExcludeDir(excluded) {
            let randDirection = Math.floor(Math.random() * 5);
            while (randDirection === excluded) {                    // while loop to check that new randDirection is not the same as excluded direction
                randDirection = Math.floor(Math.random() * 5);      // only out of 5 dir as i did not want enemy to do nothing by chance after getting stuck on wall
            }
            return randDirection;                                   // returns the new randDirection  if not === excluded                 
        }

        // 3) The enemies randomly move around in the newMaze. If they hit a wall, they should move in a new direction (they should not get stuck).
        setTimeout(() => { // 4 seconds delay before enemy movement starts, giving player chance to start game and move
            enemyMovementInterval = setInterval(() => {
                let enemies = document.querySelectorAll('.enemy');

                enemies.forEach(function enemyMove(enemy) {
                    let enemyTop = parseInt(enemy.style.top) || 0;
                    let enemyLeft = parseInt(enemy.style.left) || 0;

                    let randDirection = Math.floor(Math.random() * 6);

                    if (enemy.interval) {
                        clearInterval(enemy.interval); // clears any direction intervals the enemies have
                    }

                    enemy.interval = setInterval (()=> {
                        let enemyRect = enemy.getBoundingClientRect();

                        // using the same logic as the player movement to check if the enemy can move in the direction it is going, essentially predicting the next move
                        if (randDirection === 1) {
                            let newBottom = enemyRect.bottom + 1;
                            let btmL = document.elementFromPoint(enemyRect.left, newBottom);
                            let btmR = document.elementFromPoint(enemyRect.right, newBottom);

                            if (btmL && btmR && btmL.classList.contains('wall') == false && btmR.classList.contains('wall') == false) {
                                enemyTop++;
                                enemy.style.top = enemyTop + 'px';

                            } // If they hit a wall, they should move in a new direction (they should not get stuck).
                            else if (btmL && btmR && btmL.classList.contains('wall') == true && btmR.classList.contains('wall') == true) {
                                randDirection = randomExcludeDir(1);
                            }
                        } else if (randDirection === 2) {
                            let newTop = enemyRect.top - 1;
                            let topL = document.elementFromPoint(enemyRect.left, newTop);
                            let topR = document.elementFromPoint(enemyRect.right, newTop);

                            if (topL && topR && topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
                                enemyTop--;
                                enemy.style.top = enemyTop + 'px';

                            } else if (topL && topR && topL.classList.contains('wall') == true && topR.classList.contains('wall') == true) {
                                randDirection = randomExcludeDir(2);
                            }
                        } else if (randDirection === 3) {
                            let newLeft = enemyRect.left - 1;
                            let topL = document.elementFromPoint(newLeft, enemyRect.top);
                            let topR = document.elementFromPoint(newLeft, enemyRect.bottom);

                            if (topL && topR && topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
                                enemyLeft--;
                                enemy.style.left = enemyLeft + 'px';

                            } else if (topL && topR && topL.classList.contains('wall') == true && topR.classList.contains('wall') == true) {
                                randDirection = randomExcludeDir(3);
                            }
                        } else if (randDirection === 4) {
                            let newRight = enemyRect.right + 1;
                            let topL = document.elementFromPoint(newRight, enemyRect.top);
                            let topR = document.elementFromPoint(newRight, enemyRect.bottom);

                            if (topL && topR && topL.classList.contains('wall') == false && topR.classList.contains('wall') == false) {
                                enemyLeft++;
                                enemy.style.left = enemyLeft + 'px';

                            } else if (topL && topR && topL.classList.contains('wall') == true && topR.classList.contains('wall') == true) {
                                randDirection = randomExcludeDir(4);
                            }
                        } else if (randDirection === 5) {   // sometimes the enemy will do nothing
                            return;
                        }
                    }, 10);                                 // enemy movement interval set to 10ms same as player movement interval
                });
            }, 1250);                                       // enemy movement interval set to 1250ms, movement direction gets updated every 1.25s
        }, 4000)                                            // 4 seconds delay before enemy movement starts, giving player chance to start game and move

        // 4) Enemies stop moving when the game-over state has been reached.
        function stopInterval() {
            let enemies = document.querySelectorAll('.enemy');
            clearInterval(enemyMovementInterval);   // stops the enemy movement interval and is called when the player collides with an enemy
            clearInterval(enemyCollisionInterval);  // stops enemy Collision interval to prevent the function being called over and over while the collision if statement is true
            clearInterval(playerMovementInterval);  // stops player movement interval which prevents playermodel from moving further after game over state reached
            clearInterval(pointCollisionInterval);  // stops point collision interval to prevent the function being called over and over while the collision if statement is true
            enemies.forEach(function(enemy) {
                clearInterval(enemy.interval);      // stops the interval immediately instead of waiting for it to end (1.25s!)
            });
        }

        // 5) Instead of the game-over message display "Restart?" to allow the player to restart the gameif they lose, the game should reset back to its original state upon clicking restart.
        function restartGame() {
            location.reload();                      // replicates the reload  / ctrl + r function in the browser onclick of restart button
        }

        // 1) At the end of the game, ask the player to enter their name (use a prompt()) and save their name along with their score using local storage.
        function saveScorePrompt() {
            let user = prompt('Enter your name to save your score!', 'type here!');
            let score = document.querySelector('.score p').innerHTML;

            if (user != null) {
                localStorage.setItem(user, score);         // saves the user and score to local storage using a dict 
            }
            // leaderboard();                     // calls to display leaderboard after update to local storage the call to this fun is in leadrboard.js
        }

        //5) When the player collides with an enemy, remove a life instead of ending the game. The player should use the hit animation (.hit css class) and be unable to move for 1.5 secondswhile the animation is being played.
        function removeLife() {
            let lives = document.querySelectorAll('.lives li');

            if (lives.length > 1) {                     // was not sure if lives.length > 1 is correct or lives.length > 0, but this way, the player has EXACTLY 3 lives and dies after 3 hits. 
                lives[0].remove();                      // removes the index 0 life from the lives list
                player.classList.add('hit');            // adds the hit class to the player model when colliding with enemy
            } else {                                    // 6) If all three lives are lost, display the game-over/restart message.
                player.classList.add('dead')            // adds dead classlist
                let startH1 = document.querySelector('.start h1');
                let startDiv = document.querySelector('.startDiv');
                startH1.innerHTML = 'You lost! Restart?';
                startDiv.style.display = 'flex';
                stopInterval();                          // calls stopInterval function when player collides with enemy and stops the enemy movement (and other intervals)
                saveScorePrompt();                       // promps the user to save their score

                startDiv.addEventListener('click', ()=> {
                    restartGame();
                });
            }
        }

        // and be unable to move for 1.5 secondswhile the animation is being played.
        function disableMovement_1500ms() {
            movementAllowed = false;                    // disables all current movement by setting it to false
            upPressed = false;
            downPressed = false;
            leftPressed = false;
            rightPressed = false;

            setTimeout(() => {
                movementAllowed = true;
            }, 1500);                                   // sets movement back to true after 1500ms / 1.5s
        }

        // the newMaze layout is automatically randomised each time.
        function mazeReset() {
            newMaze = [
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
            ];                                          // resets the newMaze to the original newMaze layout

            main.innerHTML = '';                        // clears the main div to remove all the blocks avoiding conflicts
            difficulty++;                               // increases the difficulty by 1 each time the player collects all the points, increasing level and enemy count

            stopInterval();                             // stops all intervals to prevent conflicts
            createMaze();                               // creates a new newMaze layout that is randomly generated
            addEnemies();                     // adds enemies based on difficulty level
            mazePopulate();                             // populates the new newMaze layout in the main div with the html and css elements
            startGame();                                // starts the game again
        }

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
    }

    startDiv.addEventListener('click', remove_startDiv)                     // calls remove_startDiv function on click event
    startDiv.addEventListener('click', startGame)                           // calls startGame function on click event

    function remove_startDiv() {
        startDiv.style.display = 'none'                                     // sets display none on click event
    }
}
