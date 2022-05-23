// dom
let timerElement = document.querySelector("#time")
let startBtn = document.querySelector("#start")
let questionsElement = document.querySelector("#questions")
let choicesElement = document.querySelector("#choices")
let feedbackElement = document.querySelector("#feedback")
let initialsElement = document.querySelector("#initials")
let submitBtn = document.querySelector("#submit")
let timerId;
let time = 75;
let currentQuestionIndex = 0;

// activate start button
startBtn.onclick = startQuiz;
// function for starting quiz after click
function startQuiz() {
    // hides start screen
    let startScreenElement = document.getElementById("start-screen")
    startScreenElement.setAttribute("class", "hide");
    // reveals questions
    questionsElement.removeAttribute("class");
    // starts timer
    timerId = setInterval(clockTick, 1000)
    // reveals start time
    timerElement.textContent = time;
    getQuestion()
}

function clockTick() {
    // time updates
    time--;
    timerElement.textContent = time;
    // checks time remaining
    if (time <= 0) {
        quizEnd();
    }
}
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex]
    let headerElement = document.getElementById("question-header")
    headerElement.textContent = currentQuestion.title;
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {
        let choiceList = document.createElement("button")
        choiceList.setAttribute("class","choice");
        choiceList.setAttribute("value", choice)

        choiceList.textContent = i + 1 + ". " + choice;
        choiceList.onclick = questionClick;
        choicesElement.appendChild(choiceList)
        
    });
}
