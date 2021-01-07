const { readDB, writeDB } = require("./fileOperations");
const { join } = require("path");
const questionPath = join(__dirname, "../models/question.json");


exports.readQuestions = () => {
    return readDB(questionPath);
  };
  exports.writeQuestion = async question => {
    const allQuestions = await readDB(questionPath);
    allQuestions.push(question);
    await writeDB(questionPath, allQuestions);
  };

  exports.writeAllQuestions = async questions => {
    const allQuestions = await readDB(questionPath);
    allQuestions.push(questions);
    await writeDB(questionPath, allQuestions);
  };
  exports.findByIDQuestion = async id => {
    const allQuestions = await readDB(questionPath);
    const foundQuestion = allQuestions.find(question => question._id === id);
    if (foundQuestion) {
      return foundQuestion;
    } else {
      return false;
    }
  };