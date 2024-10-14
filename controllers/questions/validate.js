const Question = require("../../models/resource.questions");
const User = require("../../models/auth.users");

const validateAnswers = async (req, res) => {
  let student_marks = 0;

  try {
    const user = req.user;
    const answers = req.body;
    console.log("Received Answers:", answers); // Log the received answers

    if (!user) {
      return res.status(401).json({ message: "UnAuthorized Access" });
    }

    const userInfo = await User.findById(user.id);

    if (!userInfo) {
      return res.status(400).json({ message: "User Doesn't exist" });
    }

    console.log(answers);

    const questionIds = Object.keys(answers);
    const questions = await Question.find({ _id: { $in: questionIds } });

    questions.forEach((question) => {
      const selectedAnswer = answers[question._id];

      if (question.correctOption === selectedAnswer) {
        student_marks += question.marks;
      }
    });

    if (!userInfo.answeredOnce) {
      userInfo.answeredOnce = true;
      userInfo.results = student_marks;
      await userInfo.save();
    } else {
      return res.status(400).json({ message: "Already answered the exam!" });
    }
    res.status(200).json({ message: "Success", marks: student_marks });
  } catch (error) {
    console.log("Error Occurred at Validate Answers", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = validateAnswers;