const express = require("express");
const router = express.Router();
const {
    getQuestionsController,
    getOneQuestionController,
    createQuestionController,
    editQuestionController
  } = require("../controllers/question");

  const { questionValidator, validatorResult } = require("../middlewares/validator");


router.get("/", getQuestionsController )
router.get("/:questionId", getOneQuestionController )
router.post("/", questionValidator, validatorResult, createQuestionController )
router.put("/:questionId", editQuestionController)

module.exports = router;