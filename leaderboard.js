// 2) display the five highest player scores in the leaderboard (.leaderboard div).
// 3) the leaderboard should be organised in order from the highest score to the lowest score.
function leaderboard() {
    const leaderboard = document.querySelector('.leaderboard ol');
    leaderboard.innerHTML = '';  // clears the leaderboard

    // get and sort scores from localStorage
    const scores = Object.entries(localStorage)
        .map(([user, score]) => [user.trim(), Number(score)])  //ensure score is a number
        .sort(([, score1], [, score2]) => score2 - score1)  // sort in descending order by score

    // slice top 5 scores
    .slice(0, 5);

    // Llop through the top 5 scores and display them
    scores.forEach(([user, score]) => {
        // Truncate the user name to 15 characters, add dots for consistency
        user = user.replace(/^\s+|\s+$/g, '');  // remove leading/trailing whitespace
        user = user.length > 15 ? user.slice(0, 15) : user;  // ensure user name is no longer than 15 chars

        const dotsLength = 20 - user.length - String(score).length;  // calculate the number of dots needed
        const dots = '.'.repeat(dotsLength);

        // create list item and append it to the leaderboard
        const li = document.createElement('li');
        li.textContent = `${user}${dots}${score}`;
        leaderboard.appendChild(li);
    });
}

// event listener to clear the scoreboard
document.querySelector('.clearScore').addEventListener('click', () => {
    const leaderboard = document.querySelector('.leaderboard ol');
    leaderboard.innerHTML = '';  // clears the leaderboard
    localStorage.clear();  // clears all stored scores
    leaderboard();  // re-display the (now empty) leaderboard
});

// call the display function when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', leaderboard);