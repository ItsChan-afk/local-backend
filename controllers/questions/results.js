const User = require("../../models/auth.users");

const calculateResults = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Validation Error!" });
  }
  try {
    const userDetails = await User.findById(user.id);
    if (!userDetails) {
      return res.status(400).json({ message: "Cannot find Id!" });
    }

    return res.status(200).json(userDetails);
  } catch (error) {
    console.log("Error Occured while calculating results", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

module.exports = calculateResults;
