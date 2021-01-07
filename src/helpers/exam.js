const { readDB, writeDB } = require("./fileOperations");
const { join } = require("path");
const questionPath = join(__dirname, "../models/question.json");
const examsPath = join(__dirname, "../models/exams.json");

function shuffle(array) {
  let newArray = [...array];
  let currentIndex = newArray.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
}

exports.randomQuestions = async () => {
  const allQuestions = await readDB(questionPath);
  // console.log(allQuestions);
  const shuffledQuestions = shuffle(allQuestions);
  const questions = shuffledQuestions.slice(0, 5);
  return questions;
};

exports.calcTotalDuration = questions => {
  let totalDuration = 0; // needs to equal 0, instead of null because it is an integer
  for (let question of questions) {
    console.log("dur", question.duration, "type", typeof question.duration);
    totalDuration += question.duration;
  }
  return totalDuration
};
exports.readExam = () => {
  return readDB(examsPath);
};
exports.writeExam = async exam => {
  const allExams = await readDB(examsPath);
  allExams.push(exam);
  await writeDB(examsPath, allExams);
};

exports.findByID = async id => {
  const allExams = await readDB(examsPath);
  const foundExam = allExams.find(exam => exam._id === id);
  if (foundExam) {
    return foundExam;
  } else {
    return false;
  }
};

exports.writeEditedExam = async exam => {
  const { _id } = exam;
  let allExams = await readDB(examsPath);
  const foundExam = allExams.find(exam => exam._id === _id);
  allExams = allExams.filter(exam => exam._id !== _id);
  foundExam.questions = exam.questions;
  allExams.push(foundExam)
  await writeDB(examsPath, allExams);
};

exports.calcTotalScore = exam => {
  //for every question, find true answer index

  //compare true answer index to providedAnswer index
  //change the total score
  let totalScore = 0;
  for (let question of exam.questions) {
    const trueIndex = question.answers.findIndex(
        (answer) => answer.isCorrect === true
    );
    if (trueIndex === question?.providedAnswer){
        totalScore += 1;
    }
  }
  return totalScore;
};
