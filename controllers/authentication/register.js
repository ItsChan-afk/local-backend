const bcrypt = require("bcrypt");
const User = require("../../models/auth.users");

const register = async (req, res) => {
  const { username, fullname, password } = req.body;
  console.log(req.body)

  try {
    //to avoid empty credentials
    if (!username || !fullname || !password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //hashing password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const createUser = await User.create({
      username,
      fullname,
      password: hashedPassword,
    });

    if (!createUser) {
      return res.status(400).json({ message: "Bad Request!" });
    } else {
      return res.status(200).json({ message: "User created Successfully!" });
      
    }
  } catch (error) {
    console.log("Error Occured at Register", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = register;
