const mongoose = require("mongoose");

const followUpSchema = mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ["Open", "Not Attended", "Follow Up","Closed"]
  },
  nextFollowUpDate: {
    type: String,
    required: true,
  },
  duration:{
    minutes:{
        type:String,
        required:true
    },
    seconds:{
        type:String,
        required:true
    },
  },
  comment: {
    type: String,
    required: true,
  },
},{ timestamps: true });

module.exports = mongoose.model("FollowUp", followUpSchema);
