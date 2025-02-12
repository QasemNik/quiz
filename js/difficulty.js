const buttons = document.querySelectorAll("button");
const selectHandler = (e) => {
  const level = e.target.innerText.toLowerCase();

  localStorage.setItem("level", level);
  window.location.assign("../HTML/game.html");
};
buttons.forEach((button) => button.addEventListener("click", selectHandler));
