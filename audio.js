/* in code references to the audio 

        1. point_collect-audacity.mp3:
            https://pixabay.com/sound-effects/8-bit-video-game-points-version-1-145826/

        2. game_music.mp3
            https://pixabay.com/sound-effects/8bit-music-for-game-68698/

*/

let gameMusic = new Audio('sfx/game_music.mp3')
let pointCollectAudio = new Audio('sfx/point_collect-audacity.mp3');

// additional feature - IIFE function for game sfx, with volume slider and session storage to keep the volume level consistent
(() => {
    const slider = document.querySelector('.volumeSlider');
    
    // set the slider value to the volume stored in sessionStorage, default to 1 if not found
    const storedVolume = sessionStorage.getItem('volume') || 1;
    slider.value = storedVolume;

    // set the initial volume for the audio elements
    gameMusic.volume = storedVolume;
    pointCollectAudio.volume = storedVolume;

    // update volume based on slider input and store the value in sessionStorage
    slider.addEventListener('input', () => {
        const volume = slider.value;
        gameMusic.volume = volume;
        pointCollectAudio.volume = volume;
        sessionStorage.setItem('volume', volume);  // save the new volume value
    });
})();