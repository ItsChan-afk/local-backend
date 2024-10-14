const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/auth.users");
const cookieParser = require("cookie-parser");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //handling empty credentials
    if (!username || !password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //find user
    const user = await User.findOne({ username });

    //check password
    const passwordCheck = await bcrypt.compare(password, user.password);

    //check credentials
    if (!user || !passwordCheck) {
      return res.status(400).json({ message: "Bad Request" });
    } else {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res
        .status(200)
        .json({
          message: "Login Successful",
          user: { id: user._id, username: user.username },
        });
    }
  } catch (error) {
    console.log("Error Occured at Login", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = login;
