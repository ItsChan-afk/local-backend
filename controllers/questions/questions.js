const Questions = require("../../models/resource.questions");

const displayQuestions = async (req, res) => {
  try {
    const data = await Questions.find(
      {},
      { _id: 1, question: 1, options: 1 }
    ).lean();

    if (data.length === 0) {
      return res.status(200).json({ message: "There are no questions" });
    }
    return res.status(200).json({ storedData: data });
  } catch (error) {
    console.log("Error Occurred at display Questions", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = displayQuestions;
