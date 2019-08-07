$(document).ready(() => {
    const words = ['artichoke', 'eggplant', 'asparagus', 'broccoli', 'cabbage', 'mushroom', 'beans', 'carrots', 'onion', 'potato'];
    
    const index = Math.floor(Math.random() * words.length)
    const randomWord = words[index]
    const splitWord = randomWord.split('')
    let correct = 0;
    let wrong = 0;
    let gameOver = false;

    // add border-bottom for each letter of the word
    for (let i = 0; i < randomWord.length; i++) {
        $(".guess").append($('<div class="guessLine"></div>'))
    }

    // gamed ends
    if (wrong >= 6) {
        window.alert(`You lose! The answer was ${randomWord}`)
    }
})