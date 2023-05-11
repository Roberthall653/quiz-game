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


//shuffles button text so no replay is the same
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
//checks to see if there are questions left and either moves to the next or triggers a win.
nextQuestion = function () {
    if (questions.length === 0) {
        return winGame();

    } else {
        return questions[0]();
    }

}

//function for displaying a correct answer
function correct() {
    outcomes.textContent = "Correct"
}

//function for displaying an incorrect answer
function incorrect() {
    outcomes.textContent = "Incorrect"
}

//checks whether answer is correct. Moves to the next question if correct, deducts points if not.
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

//bank of questions
function question1() {
    textBank.textContent = "commonly used data types do NOT include:";
    correctAns = "booleans"
    answerArray = ["strings", "booleans", "alerts", "numbers"]
    shuffle(answerArray);
    answer1.textContent = answerArray[0];
    answer2.textContent = answerArray[1];
    answer3.textContent = answerArray[2];
    answer4.textContent = answerArray[3];
}

function question2() {
    textBank.textContent = "Arrays in JavaScript can be used to store ______:";
    correctAns = "all"
    answerArray = ["numbers and strings", "booleans", "other arrays", "all"]
    shuffle(answerArray);
    answer1.textContent = answerArray[0];
    answer2.textContent = answerArray[1];
    answer3.textContent = answerArray[2];
    answer4.textContent = answerArray[3];
}

function question3() {
    textBank.textContent = "String values must be enclosed within ______ when being assigned to variables?";
    correctAns = "quotes"
    answerArray = ["commas", "quotes", "curly braackets", "parenthesis"]
    shuffle(answerArray);
    answer1.textContent = answerArray[0];
    answer2.textContent = answerArray[1];
    answer3.textContent = answerArray[2];
    answer4.textContent = answerArray[3];
}

//game loss state
function loseGame() {
    textBank.textContent = "GAME OVER";
    answers.style.display = 'none'
    outcomes.style.display = 'none'
    clearButton.style.display = 'none'
    restartButton.style.display = ''
    initials.style.display = ''
    submit.style.display = ''
}


//starting page code
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

//used to hide various buttons that appear throughout the game
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

//game win state
function winGame() {
    textBank.textContent = "You Win!"
    answers.style.display = 'none';
    outcomes.style.display = 'none'
    initials.style.display = ''
    submit.style.display = ''
    clearInterval(timer);

}

//stores scores for the scoreCard
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

//displays the stored scores
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

//clears scores from the scoreCard
function clearScores() {
    storedScore = [];
    localStorage.setItem("scoreInfo", JSON.stringify(storedScore));
    scoreCard.style.display = 'none'
    console.log(storedScore)
}



init();

startButton.addEventListener("click", startGame);

answers.addEventListener("click", checkanswer);

scores.addEventListener("click", renderScores);

restartButton.addEventListener("click", init);

clearButton.addEventListener("click", clearScores)
