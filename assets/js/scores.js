


// saves scores from local storage to array
function saveScores(){
    let scoreList = JSON.parse(window.localStorage.getItem("scorelist"))
 
    // set scores from highest to lowest
    scoreList.sort(function(a, b) {
        return b.score - a.score;
    });

scoreList.forEach(function(score){
    let liTag = document.createElement("link")
    liTag.textContent = score.alias + " - " + score.score;

    let olElement = document.getElementById("scorelist")
    olElement.appendChild(liTag);
});
}

// clears scores
function deleteScores(){
    window.localStorage.removeItem("scorelist")
    window.localStorage.reload();
}

document.getElementById("delete").onclick = deleteScores;

saveScores();