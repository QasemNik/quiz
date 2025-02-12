const score = JSON.parse(localStorage.getItem("score"));
const highScore = JSON.parse(localStorage.getItem("highScores")) || [];

const scoreElem = document.querySelector("p");
const button = document.querySelector("button");
const input = document.querySelector("input");

scoreElem.innerText = score;

const saveHandler = () => {
  if (!input.value || !score) {
    alert("Invalid username or score");
  } else {
    const finalScore = { name: input.value, score };

    input.value = "";
    scoreElem.innerText = "0";

    highScore.push(finalScore);

    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(10);

    localStorage.setItem("highScores", JSON.stringify(highScore));
    localStorage.removeItem(score);
    button.innerText = "Saved";

    setTimeout(() => {
      window.location.assign("../HTML/index.html");
    }, 1500);
  }
};
button.addEventListener("click", saveHandler);
