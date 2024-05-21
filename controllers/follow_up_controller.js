const followUpSchema = require("../models/followUp");

exports.setFollowUp = async(req,res)=>{
    const {status,nextFollowUpDate,comment,duration} = req.body;
        
      // Create the new follow-up document with the nested duration object
    const newFollowUp = new followUpSchema({
        status,
        nextFollowUpDate,
        comment,
        duration: {
        minutes:duration.minutes,
        seconds:duration.seconds
        }
  });
    try {
        const savedFollowUp = await newFollowUp.save();
        res.status(201).json(savedFollowUp);
        console.log("follow Up registered Successfully completed",savedFollowUp);
    } catch (error) {
        res.status(500).json({message:"Error setting followUp"})
        console.log(error);
    }
};