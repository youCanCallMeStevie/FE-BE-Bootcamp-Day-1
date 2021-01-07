const { check, validationResult } = require("express-validator");

exports.examValidator = [
  check("question")
    .notEmpty()
    .isNumeric()
    .withMessage("Question field is required and should be number"),
  check("answer")
    .notEmpty()
    .withMessage("Answer field is required and should be number")
    .isNumeric(),
];

exports.questionValidator = [
  check("text")
    .notEmpty()
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
  check("answer.*.isCorrect").exists().withMessage("Please show which answer is correct"),
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
