/* in code references to the audio 

        1. point_collect-audacity.mp3:
            https://pixabay.com/sound-effects/8-bit-video-game-points-version-1-145826/

        2. game_music.mp3
            https://pixabay.com/sound-effects/8bit-music-for-game-68698/

*/

const GAME_MUSIC = new Audio('sfx/game_music.mp3')
const POINT_COLLECT_AUDIO = new Audio('sfx/point_collect-audacity.mp3');

// additional feature - IIFE function for game sfx, with VOLUME SLIDER and session storage to keep the VOLUME level consistent
(() => {    
    // set the SLIDER value to the VOLUME stored in sessionStorage, default to 1 if not found
    const SLIDER = document.querySelector('.volumeSlider');
    const STORED_VOLUME = sessionStorage.getItem('VOLUME') || 1;
    SLIDER.value = STORED_VOLUME;

    // set the initial VOLUME for the audio elements
    GAME_MUSIC.volume = STORED_VOLUME;
    POINT_COLLECT_AUDIO.volume = STORED_VOLUME;

    // update VOLUME based on SLIDER input and store the value in sessionStorage
    SLIDER.addEventListener('input', () => {
        const VOLUME = SLIDER.value;
        GAME_MUSIC.volume = VOLUME;
        POINT_COLLECT_AUDIO.volume = VOLUME;
        sessionStorage.setItem('VOLUME', VOLUME);  // save the new VOLUME value
    });
})();