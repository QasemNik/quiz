const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const containerList = document.querySelector("ol");

 containerList.innerHTML = highScores.map((score, index) => {
  return `<li>
    <span>
    ${index + 1}
    </span>
    <p>${score.name}</p>
    <span>${score.score}</span>
    </li>`;
}).join('')

