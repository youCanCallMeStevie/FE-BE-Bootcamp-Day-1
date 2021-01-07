const express = require("express");
const {
  examPostController,
  examStartController,
  examGetController,
} = require("../controllers/exam");
const { examValidator, validatorResult } = require("../middlewares/validator");

const router = express.Router();

router.get("/:examId", examGetController);

router.post("/start", examStartController);

router.post(
  "/:examId/answer",
//   examValidator,
//   validatorResult,
  examPostController
);


module.exports = router;

//1 when user sents a post "/start" req  we need to generate
//2
