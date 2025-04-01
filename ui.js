// additional feature - IIFE dynamic title, each letter is displayed one by one, creates cool effect / type writer effect
(() => {
    let title = document.querySelector('header h1');
    let titleText = title.innerHTML;                    // store the title text as a var to be used to dynamically display
    title.innerHTML = '';                               // clears the title text so it can be added one by one

    for (let i = 0; i < titleText.length; i++) {
       setTimeout(() => {
            title.innerHTML += titleText[i];            // adds each character to the title one by one with every timeout
        }, i * 200);                                    // each character is added every 200ms, when i is 1 its 200ms timeout, i++ makes it 2 * 200ms, 3 * 200ms etc so each character is added every 200ms
    }
})();
