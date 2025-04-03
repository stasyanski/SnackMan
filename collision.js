// constants for the pulsating effect
const pulseInterval = 50;        // time interval for each step in milliseconds
const fadeStep = 0.1;            // amount to change opacity in each step
const minOpacity = 0.1;          // minimum opacity level
const maxOpacity = 1;            // maximum opacity level
const invincibilityDuration = 5000; // duration of invincibility in milliseconds

function preventCollision() {
    const PLAYER = document.querySelector('#player');
    let currentOpacity = maxOpacity; // start at maximum opacity
    let fadeOut = true;               // flag to determine fading direction
    canCollide = false;               // prevent multiple collisions

    const PULSATE = setInterval(() => {
        currentOpacity += fadeOut ? -fadeStep : fadeStep;
        // clamp opacity between minOpacity and maxOpacity
        currentOpacity = Math.max(minOpacity, Math.min(maxOpacity, currentOpacity));
        PLAYER.style.opacity = currentOpacity;

        // switch fading direction if limits are reached
        if (currentOpacity <= minOpacity || currentOpacity >= maxOpacity) {
            fadeOut = !fadeOut;
        }
        // stop pulsating if collisions are enabled 
        if (canCollide) {
            clearInterval(PULSATE);
        }
    }, pulseInterval);

    // end pulsating after the invincibility 
    setTimeout(() => {
        canCollide = true;                       // enable collision
        PLAYER.style.opacity = maxOpacity;      // reset opacity to max
    }, invincibilityDuration);
}