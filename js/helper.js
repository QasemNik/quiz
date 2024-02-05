
function formatData(questionData) {
  // console.log(questionData);
  const result = questionData.map(item => {
    const questionObj = { question: item.question };
    // console.log(questionObj);
    const answers = [...item.incorrect_answers];
    // console.log(item.incorrect_answers);

    //!Create  random index
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    // console.log(correctAnswerIndex);
    answers.splice(correctAnswerIndex, 0, item.correct_answers);
    questionObj.answers = answers;
    questionObj.correctAnswerIndex = correctAnswerIndex;
    return questionObj;
  });

  return result;
}

export default formatData;
