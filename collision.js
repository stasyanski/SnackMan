// constants for the pulsating effect
const pulseInterval = 50;        // time interval for each step in milliseconds
const fadeStep = 0.1;            // amount to change opacity in each step
const minOpacity = 0.1;          // minimum opacity level
const maxOpacity = 1;            // maximum opacity level
const invincibilityDuration = 5000; // duration of invincibility in milliseconds

// function to prevent collision by making the player pulsate
function preventCollision() {
    const player = document.querySelector('#player'); // select the player element
    let currentOpacity = maxOpacity; // start at maximum opacity
    let fadeOut = true;               // flag to determine fading direction
    canCollide = false;               // prevent multiple collisions

    // set up a pulsating effect using setInterval
    const pulsate = setInterval(() => {
        currentOpacity += fadeOut ? -fadeStep : fadeStep; // change opacity based on fade direction
        // clamp opacity between minOpacity and maxOpacity
        currentOpacity = Math.max(minOpacity, Math.min(maxOpacity, currentOpacity));
        player.style.opacity = currentOpacity; // apply the new opacity to the player

        // switch fading direction if limits are reached
        if (currentOpacity <= minOpacity || currentOpacity >= maxOpacity) {
            fadeOut = !fadeOut; // toggle fade direction
        }
        // stop pulsating if collisions are enabled 
        if (canCollide) {
            clearInterval(pulsate); // clear the interval if collisions are allowed
        }
    }, pulseInterval); // run this every pulseInterval milliseconds

    // end pulsating after the invincibility duration
    setTimeout(() => {
        canCollide = true;                       // enable collision
        player.style.opacity = maxOpacity;      // reset opacity to max
    }, invincibilityDuration); // wait for invincibility duration
}

// function to check if two rectangles are colliding
function isColliding(position, pointPos) {
    return (
        position.right > pointPos.left &&   // check right edge
        position.left < pointPos.right &&    // check left edge
        position.bottom > pointPos.top &&     // check bottom edge
        position.top < pointPos.bottom        // check top edge
    );
}

// function to check if the player can move in a given direction
function canMoveTo(rect, direction) {
    if (direction === 'down') {
        // check for walls below the player
        return !document.elementFromPoint(rect.left, rect.bottom + 1)?.classList.contains('wall') &&
            !document.elementFromPoint(rect.right, rect.bottom + 1)?.classList.contains('wall');
    } else if (direction === 'up') {
        // check for walls above the player
        return !document.elementFromPoint(rect.left, rect.top - 1)?.classList.contains('wall') &&
            !document.elementFromPoint(rect.right, rect.top - 1)?.classList.contains('wall');
    } else if (direction === 'left') {
        // check for walls to the left of the player
        return !document.elementFromPoint(rect.left - 1, rect.top)?.classList.contains('wall') &&
            !document.elementFromPoint(rect.left - 1, rect.bottom)?.classList.contains('wall');
    } else if (direction === 'right') {
        // check for walls to the right of the player
        return !document.elementFromPoint(rect.right + 1, rect.top)?.classList.contains('wall') &&
            !document.elementFromPoint(rect.right + 1, rect.bottom)?.classList.contains('wall');
    }
    return false; // return false if direction is not recognized
}