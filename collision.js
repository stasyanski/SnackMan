// additional feature, prevents collision for 5 seconds after a collision, giving invincibility, invincibility is shows by localplayer opacity pulsating
function preventCollision() {
    canCollide = false;                                                  // a condition used to prevent multiple collisions from happening in row
    let player = document.querySelector('#player');
    let fadeCondition = true;                                            // condition used to check if the opacity is fading in or out
    let currentOpacity = 1;                                              // current opacity of the player model ; the opacity is set to 1 in the setTimeout, so opacity will be 1.                             

    let pulsate = setInterval(() => {
        if (currentOpacity >= 0.1 && fadeCondition == true) {
            currentOpacity -= 0.1;                                       // decrement the current opacity by 0.1 if current opacity more than 0.1 and fadeCondition true             
            player.style.opacity = currentOpacity;                       // set the player opacity to the current opacity decrementing it by 0.1
            if (currentOpacity <= 0.1) {
                fadeCondition = false;                                   // if current opacity is less than 0.1, set fadeCondition to false which enables the other else if condition
            }
        } else if (currentOpacity <= 1 && fadeCondition == false) {
            currentOpacity += 0.1;
            player.style.opacity = currentOpacity;
            if (currentOpacity >= 1) {
                fadeCondition = true;
            }
        }
    }, 50);

    setTimeout(() => {
        clearInterval(pulsate);                                           // ensure the interval doesnt continue forever
        canCollide = true;                                                // re enables collision
        player.style.opacity = '1';                                       // re sets the player opacity back to 1 after 5 seconds of invincibility                      
    }, 5000);
}