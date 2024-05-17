const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const { model } = require("mongoose");
const crypto = require("crypto");
const { sendResetEmail } = require("../Utlis/authUtlis");

//Register
const register = async (req, res) => {
  const { username,email, password, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
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
  const { username,email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user) {
      res.status(401).json({ message: "Invalid password..Try again" });
    }
    // Generate Web Token
    const token = jwt.sign({ user }, "secret");
    res.json({ token });
    console.log(token);
  } catch (error) {
    res.status(500).json({ message: "Login failed..", error: error.message });
  }
};
//Forget password
const forgotPassword = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ error: "User Not Found" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 36000000;
    await user.save();
    await sendResetEmail(user.email, token);
    res.status(200).json({ message: "Password  reset email sent" });
  } catch (error) {
    console.error("error during forgot password", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.param;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      res.status(404).json({ error: "User Not Found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({ message: "Password Has Been Reset" });
  } catch (error) {
    console.error("Error During Password Reset", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
