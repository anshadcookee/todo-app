const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: 
    { type: String, 
      required: true 
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    gender: { 
      type: String, 
      required: true, 
      enum: ["Male", "Female", "Other"] 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
