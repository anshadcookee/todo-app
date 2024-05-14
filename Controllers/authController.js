const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const { model } = require("mongoose");

//Register
const register = async (req, res) => {
  const { username, password, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      gender: gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase(),
    });
    const test = await user.save();
    console.log(test);
    res.status(201).json({ message: "Registered Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register user ", error: error.message });
  }
};
//Login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      res.status(401).json({ message: "Invalid password..Try again" });
    }
    // Genarate Web Tocken
    const token = jwt.sign({ user }, "secret");
    res.json({ token });
    console.log(token);
  } catch (error) {
    res.status(500).json({ message: "Login failed..", error: error.message });
  }
};
module.exports = { register, login };
