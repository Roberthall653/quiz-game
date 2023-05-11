var textBank = document.querySelector(".text-bank");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var restartButton = document.querySelector(".restart");
var clearButton = document.querySelector(".clear")
var answers = document.querySelector(".answers");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var initials = document.querySelector("#initials");
var scores = document.querySelector("#scores")
var submit = document.querySelector(".submit");
var answerArray = [""];
var buttonAns = ""
var correctAns = ""
var outcomes = document.querySelector(".outcome")
var isWin = false;
var timer;
var timerCount;
var questions = [question1, question2, question3];
var storedScore = [];



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

nextQuestion = function () {
    if (questions.length === 0) {
        return winGame();

    } else {
        return questions[0]();
    }

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
        questions.shift();
        nextQuestion();

    }

    else {
        timerCount -= 15;
        incorrect();
    }
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
    outcomes.style.display = 'none'
    clearButton.style.display = 'none'
    restartButton.style.display = ''
    initials.style.display = ''
    submit.style.display = ''
}



function init() {
    hideButtons();
    textBank.textContent = "Coding Quiz Challenge";
    startButton.style.display = ''
    scoreCard.style.display = 'none'
    clearButton.style.display = 'none'
    var storedScore = JSON.parse(localStorage.getItem("scores"));
    if (storedScore !== null) {
        scores = storedScore;
    }
}

function hideButtons() {
    answers.style.display = 'none';
    initials.style.display = 'none';
    submit.style.display = 'none';
    restartButton.style.display = 'none';
    clearButton.style.display = 'none'
}

// The startGame function is called when the start button is clicked
function startGame() {
    questions = [question1, question2, question3];
    timerCount = 60;
    questions[0]();
    // Prevents start button from being clicked when round is in progress
    startButton.style.display = 'none';

    answers.style.display = ''
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
            if (timerCount > 0 && nextQuestion.length >= 4) {
                winGame();
            }
        }
        // Tests if time has run out
        if (timerCount <= 0) {
            timerElement.textContent = "Time:" + 0;
            // Clears interval
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}


function winGame() {
    textBank.textContent = "You Win!"
    answers.style.display = 'none';
    outcomes.style.display = 'none'
    initials.style.display = ''
    submit.style.display = ''
    clearInterval(timer);

}

submit.addEventListener("click", function (event) {
    event.preventDefault();
    storedScore = JSON.parse(localStorage.getItem("scoreInfo"));

    var scoreInfo = {
        initials: initials.value,
        timerCount,
    };
    storedScore.push(scoreInfo);
    localStorage.setItem("scoreInfo", JSON.stringify(storedScore));

    renderScores();
    console.log(scoreInfo);
});

function renderScores() {
    clearButton.style.display = ''
    scoreCard.style.display = ''
    initials.style.display = 'none';
    textBank.textContent = "High Scores:";
    submit.style.display = 'none';
    answers.style.display = 'none';
    startButton.style.display = 'none';
    restartButton.style.display = ''
    clearInterval(timer);

    storedScore = JSON.parse(localStorage.getItem("scoreInfo"));
    storedScore.sort(function (x, y) {
        return y.timerCount - x.timerCount;
    });
    for (var i = 0; i < storedScore.length; i++) {
        var li = document.createElement("li");
        li.textContent = "Name: " + storedScore[i].initials +
            " Score: " + storedScore[i].timerCount;
        storedScore.push;

        scoreCard.appendChild(li);
    }
}

function clearScores() {
    storedScore = [];
    localStorage.setItem("scoreInfo", JSON.stringify(storedScore));
    scoreCard.style.display = 'none'
    console.log(storedScore)
}



init();

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

answers.addEventListener("click", checkanswer);

scores.addEventListener("click", renderScores);

restartButton.addEventListener("click", init);

clearButton.addEventListener("click", clearScores)
