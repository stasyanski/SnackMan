// Constants for the pulsating effect
const PULSE_INTERVAL = 50;        // time interval for each step in milliseconds
const FADE_STEP = 0.1;            // amount to change opacity in each step
const MIN_OPACITY = 0.1;          // minimum opacity level
const MAX_OPACITY = 1;            // maximum opacity level
const INVINCIBILITY_DURATION = 5000; // duration of invincibility in milliseconds

function preventCollision() {
    const PLAYER = document.querySelector('#player');
    let currentOpacity = MAX_OPACITY; // Start at maximum opacity
    let fadeOut = true;               // flag to determine fading direction
    canCollide = false;               // prevent multiple collisions

    const PULSATE = setInterval(() => {
        currentOpacity += fadeOut ? -FADE_STEP : FADE_STEP;
        // clamp opacity between MIN_OPACITY and MAX_OPACITY
        currentOpacity = Math.max(MIN_OPACITY, Math.min(MAX_OPACITY, currentOpacity));
        PLAYER.style.opacity = currentOpacity;

        // switch fading direction if limits are reached
        if (currentOpacity <= MIN_OPACITY || currentOpacity >= MAX_OPACITY) {
            fadeOut = !fadeOut;
        }
        // stop pulsating if collisions are enabled 
        if (canCollide) {
            clearInterval(PULSATE);
        }
    }, PULSE_INTERVAL);

    // ed pulsating after the invincibility 
    setTimeout(() => {
        canCollide = true;                       // enable collision
        PLAYER.style.opacity = MAX_OPACITY;      // reset opacity to max
    }, INVINCIBILITY_DURATION);
}