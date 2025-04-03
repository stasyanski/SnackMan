/* in code references to the audio 

        1. point_collect-audacity.mp3:
            https://pixabay.com/sound-effects/8-bit-video-game-points-version-1-145826/

        2. game_music.mp3
            https://pixabay.com/sound-effects/8bit-music-for-game-68698/

*/

const gameMusic = new Audio('sfx/game_music.mp3')
const pointCollectAudio = new Audio('sfx/point_collect-audacity.mp3');

// additional feature - IIFE function for game sfx, with VOLUME slider and session storage to keep the VOLUME level consistent
(() => {    
    // set the slider value to the VOLUME stored in sessionStorage, default to 1 if not found
    const slider = document.querySelector('.volumeSlider');
    const storedVolume = sessionStorage.getItem('VOLUME') || 1;
    slider.value = storedVolume;

    // set the initial VOLUME for the audio elements
    gameMusic.volume = storedVolume;
    pointCollectAudio.volume = storedVolume;

    // update VOLUME based on slider input and store the value in sessionStorage
    slider.addEventListener('input', () => {
        const VOLUME = slider.value;
        gameMusic.volume = VOLUME;
        pointCollectAudio.volume = VOLUME;
        sessionStorage.setItem('VOLUME', VOLUME);  // save the new VOLUME value
    });
})();