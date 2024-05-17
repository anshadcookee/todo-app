const followUp = require("../Models/followUp");

exports.setFollowUp = async(req,res)=>{
    const {status,date,comment} = req.body;
    const newFollowUp = new followUpSchema({status,date,comment})
    try {
        const savedFollowUp = await newFollowUp.save();
        res.status(201).json(savedFollowUp);
        console.log("follow Up registered Successfully completed");

        console.log(savedFollowUp);
    } catch (error) {
        res.status(500).json({message:"Error setting followUp"})
        console.log(error);
    }
};