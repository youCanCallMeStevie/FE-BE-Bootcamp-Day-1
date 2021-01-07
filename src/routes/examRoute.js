const express = require("express");
const {
  examPostController,
  examStartController,
  examGetController,
  
} = require("../controllers/exam");
const { examValidator, validatorResult, examResultValidator } = require("../middlewares/validator");

const router = express.Router();

router.get("/:examId", validatorResult, examGetController);

router.post("/start", examValidator, validatorResult, examStartController);

router.post(
  "/:examId/answer",
  examResultValidator, validatorResult, examPostController
);


module.exports = router;
