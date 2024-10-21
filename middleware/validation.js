  const jwt = require("jsonwebtoken");

  const cookieValidation = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Validation Error" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.log("Error occured at Cookie Validation Middlware", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  module.exports = cookieValidation;
