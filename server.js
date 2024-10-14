const express = require("express");
const dbConnection = require("./database/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

//Cross Origin Resource Sharing
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // This allows the browser to send and receive cookies
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 4040;

app.get("/", (req, res) => {
  res.send("Server Home!");
});

app.use(express.json());
app.use("/api/auth", require("./routes/main.routes"));
app.use("/api/exam", require("./routes/question.routes"));

app.listen(PORT, () => {
  dbConnection();
  console.log(`PORT : ${PORT} has started !`);
});
