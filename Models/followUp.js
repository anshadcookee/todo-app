const mongoose = require("mongoose");

const followUpSchema = mongoose.Schema({
    status:{type:String,required:true},
    // date :{type:Date,required:true},
    comment:{type:String,required:true},
});

module.exports = mongoose.model("FollowUp",followUpSchema)