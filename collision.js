// constants for the pulsating effect
const pulseInterval = 50;        // time interval for each step in milliseconds
const fadeStep = 0.1;            // amount to change opacity in each step
const minOpacity = 0.1;          // minimum opacity level
const maxOpacity = 1;            // maximum opacity level
const invincibilityDuration = 5000; // duration of invincibility in milliseconds

function preventCollision() {
    const player = document.querySelector('#player');
    let currentOpacity = maxOpacity; // start at maximum opacity
    let fadeOut = true;               // flag to determine fading direction
    canCollide = false;               // prevent multiple collisions

    const pulsate = setInterval(() => {
        currentOpacity += fadeOut ? -fadeStep : fadeStep;
        // clamp opacity between minOpacity and maxOpacity
        currentOpacity = Math.max(minOpacity, Math.min(maxOpacity, currentOpacity));
        player.style.opacity = currentOpacity;

        // switch fading direction if limits are reached
        if (currentOpacity <= minOpacity || currentOpacity >= maxOpacity) {
            fadeOut = !fadeOut;
        }
        // stop pulsating if collisions are enabled 
        if (canCollide) {
            clearInterval(pulsate);
        }
    }, pulseInterval);

    // end pulsating after the invincibility 
    setTimeout(() => {
        canCollide = true;                       // enable collision
        player.style.opacity = maxOpacity;      // reset opacity to max
    }, invincibilityDuration);
}

function isColliding(position, pointPos) {
    return (
        position.right > pointPos.left &&
        position.left < pointPos.right &&
        position.bottom > pointPos.top &&
        position.top < pointPos.bottom
    );
}

function canMoveTo(rect, direction) {
    if (direction === 'down') {
        return !document.elementFromPoint(rect.left, rect.bottom + 1)?.classList.contains('wall') &&
            !document.elementFromPoint(rect.right, rect.bottom + 1)?.classList.contains('wall');
    } else if (direction === 'up') {
        return !document.elementFromPoint(rect.left, rect.top - 1)?.classList.contains('wall') &&
            !document.elementFromPoint(rect.right, rect.top - 1)?.classList.contains('wall');
    } else if (direction === 'left') {
        return !document.elementFromPoint(rect.left - 1, rect.top)?.classList.contains('wall') &&
            !document.elementFromPoint(rect.left - 1, rect.bottom)?.classList.contains('wall');
    } else if (direction === 'right') {
        return !document.elementFromPoint(rect.right + 1, rect.top)?.classList.contains('wall') &&
            !document.elementFromPoint(rect.right + 1, rect.bottom)?.classList.contains('wall');
    }
    return false;
}