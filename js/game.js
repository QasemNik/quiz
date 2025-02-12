import formatData from "./helper.js";
const level = localStorage.getItem("level") || "medium";
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

const error = document.getElementById("error");
const loader = document.querySelector("#loader");
const container = document.querySelector("#container");
const questionText = document.getElementById("quiz-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.querySelector(".score");
const nextBtn = document.getElementById("next-btn");
const finishBtn = document.getElementById("finish-btn");
const questionNum = document.querySelector(".question-number");

const CORRECT_BONUS = 10;
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

async function fetchData() {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  } catch (err) {
    console.error("خطا در دریافت داده ها:", err);
    loader.style.display = "none";
    error.style.display = "block";
  }
}

function start() {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
}

function showQuestion() {
  questionNum.innerHTML = questionIndex + 1;
  let { question, answers, correctAnswerIndex } = formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;

  questionText.innerText = question;
  console.log("formattedData:", formattedData);

  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
}
function checkAnswer(event, index) {
  // console.log(index);

  if (!isAccepted) return;
  isAccepted = false;

  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    console.log(isCorrect);

    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
    console.log(answerList[correctAnswer]);
  }
}

function nextHandler() {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    isAccepted = true;
    score += CORRECT_BONUS;
    removeClasses();
    showQuestion();
  } else {
    setTimeout(() => {
      //  localStorage.setItem("score", JSON.stringify(score));
      //  window.location.assign("/HTML/end.html");
      finishHandler();
    }, 1500);

    finishBtn.innerHTML = "Finished";
    finishBtn.style.backgroundColor = "#6757d9";
    finishBtn.style.color = "#eeedfb";
    // console.log("finish");
  }

  function removeClasses() {
    answerList.forEach((button) => (button.className = "answer-text"));
  }
}

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/HTML/end.html");
};
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    checkAnswer(event, index);
  });
});

window.addEventListener("load", fetchData);
nextBtn.addEventListener("click", nextHandler);
finishBtn.addEventListener("click", finishHandler);
