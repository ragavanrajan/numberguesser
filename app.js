/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI elements
// if u r using queryselector if it is a id use # and then id idname
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    // if u r using queryselector if it is a id use # and then id idname
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

// play again event lisener 
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }

});


//Listen for guess 
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    console.log(guessInput.value);

    //validate the input 
    if (isNaN(guess) | guess < min | guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    //Check if won 
    if (guess === winningNum) {
        //Game over won 
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
        //wrong number
        guessesLeft -= 1;
        // guessesLeft = guessesLeft  -1. we could also do this in this way
        if (guessesLeft === 0) {
            //Game over lost 
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

        } else {
            // Game continues - Answer wrong

            //Change border to red 
            guessInput.style.borderColor = 'red';

            //Clear Input 
            guessInput.value = '';
            //Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left `, 'red');
        }
    }
});

// Game over 
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable input 
    guessInput.disabled = true;
    //Change border to green 
    guessInput.style.borderColor = color;
    //set text color 
    message.style.color = color;
    //Set Message - remember use bactics
    setMessage(msg);
    //Play again 
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}
//Get Winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}