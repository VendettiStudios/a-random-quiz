// dom
let timerEl = document.querySelector("#sec")
let startBtn = document.querySelector("#start")
let questionsEl = document.querySelector("#questions")
let choicesEl = document.querySelector("#choices")
let feedbackEl = document.querySelector("#feedback")
let aliasEl = document.querySelector("#alias")
let submitBtn = document.querySelector("#submit")

// Declaring timer as a global scope
let timerId;
// setting timer to 75 seconds
let sec = 75;
// sets current Q index to 0
let currentQuestionIndex = 0;

// activate start button
startBtn.onclick = startQuiz;
// function for starting quiz after click
function startQuiz() {
    // hides start screen
    let startScreenEl = document.getElementById("start-screen")
    startScreenEl.setAttribute("class", "hide");
    // reveals questions
    questionsEl.removeAttribute("class");
    // starts timer
    timerId = setInterval(clockTick, 1000)
    // reveals start time
    timerEl.textContent = sec;
    getQuestion()
}

function clockTick() {
    // time updates
    sec--;
    timerEl.textContent = sec;
    // checks time remaining
    if (sec <= 0) {
        quizEnd();
    }
}

function getQuestion() {
    // reveals question header selecting current one in array
    let currentQuestion = questions[currentQuestionIndex]
    let headerEl = document.getElementById("question-header")
    headerEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    // creates loop
    currentQuestion.choices.forEach(function (choice, i) {
        // creates new buttons
        let choiceList = document.createElement("button")
        choiceList.setAttribute("class", "choice");
        choiceList.setAttribute("value", choice)
        // sets choice of each button for corresponding question
        choiceList.textContent = i + 1 + ". " + choice;
        choiceList.onclick = questionClick;
        choicesEl.appendChild(choiceList)

    });
}

function questionClick() {
    // subtract 15 seconds for every wrong answer as long as its greater than 0
    if (this.value !== questions[currentQuestionIndex].answer) {
        sec -= 15

        if (sec < 0) {
            sec = 0;
        }

        timerEl.textContent = sec;
        // give feedback when questions are wrong/right!
        feedbackEl.style.fontSize = "900%";
        feedbackEl.style.color = "red";
        feedbackEl.textContent = "Wrong!"
    } else {
        feedbackEl.style.fontSize = "900%";
        feedbackEl.style.color = "green";
        feedbackEl.textContent = "Good Job!"
    }
    // show feedback for 2.5 seconds
    feedbackEl.setAttribute("class", "feedback")
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide")
        feedbackEl.setAttribute("class", "feedback hide")
    }, 2500)
    // advance to next question
    currentQuestionIndex++
    // end quiz if the Array is finished
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }

}

function quizEnd() {
    // stop time
    clearInterval(timerId)
    // reveal final screen
    let finalScreenEl = document.getElementById("quiz-finished")
    finalScreenEl.removeAttribute("class");
    //reveal score
    let finalScoreEl = document.getElementById("finalScore")
    finalScoreEl.textContent = sec;
    // hide questions
    questionsEl.setAttribute("class", "hide")
}
// activate submit button
submitBtn.onclick = saveScore;
// saves score
function saveScore() {
    // get box value
    let alias = aliasEl.value.trim();
    // pulls saved scorelist array
    if (alias !== "") {
        let scorelist =
            JSON.parse(window.localStorage.getItem("scorelist")) || [];
        // adds new score to saved array
        let newScore = {
            score: sec,
            alias: alias
        };
        // pushes score to saved scorelist array
        scorelist.push( newScore );
        window.localStorage.setItem("scorelist", JSON.stringify(scorelist))

        window.location.href = "scores.html"

    }
}

function checkForEnter(event) {
    // 13 = error key
    if (event.key === "Enter") {
        saveScore();
    }
}
aliasEl.onkeyup = checkForEnter;
