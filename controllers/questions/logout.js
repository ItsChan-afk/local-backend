const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error occured at Logout ", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = logout;
