const express = require("express");
const login = require("../controllers/authentication/login");
const register = require("../controllers/authentication/register");

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

module.exports = router;
