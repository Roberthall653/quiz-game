var textBank = document.querySelector(".text-bank");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var restartButton = document.querySelector(".restart");
var answers = document.querySelector(".answers");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var answerArray = [""];
var buttonAns = ""
var correctAns = ""
var outcomes = document.querySelector(".outcome")
var isWin = false;
var timer;
var timerCount;
var questions = [question1, question2, question3];


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function correct() {
    outcomes.textContent = "Correct"
}

function incorrect() {
    outcomes.textContent = "Incorrect"
}
function checkanswer(event) {
        if (event.target.textContent === correctAns) {
            correct();
            }
        
        else {
            timerCount-= 15;
            incorrect();
        }
    }

function correct() {
    outcomes.textContent = "Correct"
}

function incorrect() {
    outcomes.textContent = "Incorrect"
}

function question1() {
    textBank.textContent = "What is question 1?";
    correctAns = "booleans"
    answerArray = ["strings", "booleans", "alerts", "numbers"]
    shuffle(answerArray);
    answer1.textContent = answerArray[0];
    answer2.textContent = answerArray[1];
    answer3.textContent = answerArray[2];
    answer4.textContent = answerArray[3];
}

function question2() {
    textBank.textContent = "What is question 2?";
    correctAns = "strings"
    answerArray = ["strings", "booleans", "alerts", "numbers"]
    shuffle(answerArray);
    answer1.textContent = answerArray[0];
    answer2.textContent = answerArray[1];
    answer3.textContent = answerArray[2];
    answer4.textContent = answerArray[3];
}

function question3() {
    textBank.textContent = "What is question 3?";
    correctAns = "numbers"
    answerArray = ["strings", "booleans", "alerts", "numbers"]
    shuffle(answerArray);
    answer1.textContent = answerArray[0];
    answer2.textContent = answerArray[1];
    answer3.textContent = answerArray[2];
    answer4.textContent = answerArray[3];
}

function loseGame() {
    textBank.textContent = "GAME OVER";
    answers.style.display = 'none'
    restartButton.style.display = 'block'
}



function init() {
    hideAnswers();
    hideRestart();
}

function hideAnswers() {
    answers.style.display = 'none';
}

function hideRestart() {
    restartButton.style.display = 'none';
}

// The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    timerCount = 60;
    questions[0]();
    console.log(questions[0])
    // Prevents start button from being clicked when round is in progress
    startButton.style.display = 'none';
    answers.style.display = 'flex'
    startTimer()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = "Time: " + timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                winGame();
            }
        }
        // Tests if time has run out
        if (timerCount <= 0) {
            // Clears interval
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

init();

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

answers.addEventListener("click", checkanswer);