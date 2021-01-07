const {
  writeQuestion,
  writeAllQuestions,
  readQuestions,
  findByIDQuestion,
} = require("../helpers/questions");
const uniqid = require("uniqid");

exports.createQuestionController = async (req, res, next) => {
  try {
    const newQuestion = { ...req.body };
    await writeQuestion(newQuestion);
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.log("POST question error", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};

exports.getQuestionsController = async (req, res, next) => {
  try {
    const allQuestions = readQuestions();
    res.status(200).json({ success: true, data: allQuestions });
  } catch (error) {
    console.log("Question GET controller error", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};

exports.getOneQuestionController = async (req, res, next) => {
  const { questionId } = req.params;

  try {
    const foundQuestion = await findByIDQuestion();
    if (!foundQuestion) {
      res
        .status(404)
        .json({ success: false, errors: "No question found with that ID" });
    } else {
    }
  } catch (error) {
    console.log("Question GET controller error", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};

exports.editQuestionController = async (req, res, next) => {
  const { questionId } = req.params;
  try {
    const foundQuestion = await findByIDQuestion(questionId);
    if (!foundQuestion) {
      res
        .status(404)
        .json({ success: false, errors: "No question found with that ID" });
    } else {
      const editedQuestion = { ...foundQuestion, ...req.body };
      const allQuestions = await readQuestions();
      const newQuestion = allQuestions.filter(q => q?._id !== questionId);
      newQuestion.push(editedQuestion);
      await writeAllQuestions(newQuestion);
      res.status(201).json({ success: true, data: editedQuestion  });
    }
  } catch (error) {
    console.log("edit Question PUT controller error", error);
    res.status(500).json({ success: false, errors: "Internal Server Error" });
  }
};
