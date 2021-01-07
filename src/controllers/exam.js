const {
  randomQuestions,
  calcTotalDuration,
  findByID,
  writeEditedExam,
  calcTotalScore,
} = require("../helpers/exam");
const uniqid = require("uniqid");
const { writeExam, readExam } = require("../helpers/exam");
const { join } = require("path");

// const reducer = (accumulator, item) => {
//     return accumulator + item.duration;
// }
exports.examStartController = async (req, res, next) => {
  try {
    const newExam = {
      ...req.body,
      _id: uniqid(),
      examDate: new Date(),
      isCompleted: false,
    };
    const questions = await randomQuestions();
    newExam.questions = questions;
    // const totalDuration = newExam.questions.reduce(reducer, 0)

    newExam.totalDuration = calcTotalDuration(newExam.questions);
    await writeExam(newExam);
    res.send(201).json({ success: true, data: newExam });
  } catch (error) {
    console.log("Exam start error", error);
    res
      .sendStatus(500)
      .json({ success: false, errors: "Internal Server Error" });
  }
};

exports.examPostController = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const foundExam = await findByID(examId);
    if (!foundExam) {
      res
        .status(404)
        .json({ success: false, errors: "No exam found with that ID" });
    } else {
      const requestArray = req.body;
      console.log(requestArray);
      foundExam.questions.map(
        (question, index) =>
          (question.providedAnswer = requestArray[index].answer)
      );
      await writeEditedExam(foundExam);
      res.status(201).json({ success: true, data: "Exam Found" });
    }
  } catch (error) {
    console.log("exam POST controller error", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};

exports.examGetController = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const foundExam = await findByID(examId);
    if (!foundExam) {
      res
        .status(404)
        .json({ success: false, errors: "No exam found with that ID" });
    } else {
      const totalScore = calcTotalScore(foundExam);
      const examDetails = { score: totalScore };
      res.status(200).json({ success: true, data: examDetails });
    }
  } catch (error) {
    console.log("Exam GET controller error", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};


