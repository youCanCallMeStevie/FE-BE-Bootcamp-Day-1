const { check, validationResult } = require("express-validator");

exports.examResultValidator = [
  check(".*.question")
    .exists()
    .withMessage("You need to identify the question you want to answer")
    .isNumeric()
    .withMessage(
      "Use a number to identify the index position of the question you are answering"
    ),
  check(".*.answer")
    .exists()
    .withMessage("You need to identify the answer you want to select")
    .isNumeric()
    .withMessage(
      "Use a number to identify the index position of the answer you are selecting"
    ),
];

exports.examValidator = [
  check("candidateName")
    .exists()
    .withMessage("Candidate name is required.")
    .isString()
    .withMessage("Name message should be text"),
  check("name")
    .exists()
    .withMessage("Name of exam is required")
    ,
];

exports.questionValidator = [
  check("text")
    .exists()
    .withMessage("Text field is required")
    .isString()
    .withMessage("Text field should be a string")
    .isLength({ min: 10 })
    .withMessage("Question needs to be at least 10 characters"),
  check("duration")
    .exists()
    .withMessage("Duration field is required")
    .isNumeric()
    .withMessage("Duration should be numeric"),
  check("answer").exists(),
  check("answer.*.text").exists().withMessage("Please provide answer"),
  check("answer.*.isCorrect")
    .exists()
    .withMessage("Please show which answer is correct"),
];

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();

  if (hasError) {
    const errorMsg = result.array()[0].msg;
    return res.status(400).json({ success: false, errors: errorMsg });
  }
  next();
};
