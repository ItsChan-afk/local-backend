const express = require("express");
const router = express.Router();
const displayQuestions = require("../controllers/questions/questions");
const validateAnswers = require("../controllers/questions/validate");
const calculateResults = require("../controllers/questions/results");
const cookieValidation = require("../middleware/validation");
const logout = require("../controllers/questions/logout");

router.get("/questions", cookieValidation, displayQuestions);

router.post("/answer", cookieValidation, validateAnswers);

router.get("/results", cookieValidation, calculateResults);

router.get("/logout", cookieValidation, logout);

module.exports = router;
