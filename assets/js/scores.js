// saves scores from local storage to array
function saveScores(){
    let scorelist = JSON.parse(window.localStorage.getItem("scorelist"))
 
    // set scores from highest to lowest
    scorelist.sort(function(a, b) {
        return b.score - a.score;
    });
    // creates li tag for each score then displays on page
scorelist.forEach(function(score){
    let liTag = document.createElement("li")
    liTag.textContent = score.alias + " - " + score.score;

    let olElement = document.getElementById("scorelist")
    olElement.appendChild(liTag);
});
}
// delete button functions
document.getElementById("delete").onclick = deletescores;
// clears scores
function deletescores(){
    window.localStorage.removeItem("scorelist")
    // reloads window to show blank list
    window.localStorage.reload();
}

saveScores();