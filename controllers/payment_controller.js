const paymentSchema = require("../models/Payment");

exports.setPayment = async (req,res) =>{
    const {amount,payment_type,proof} = req.body;

    const newPayment = new paymentSchema({
        amount,
        payment_type,
        proof
    })
    try {
        const savedPayment = await newPayment.save();
        res.status(201).json(savedPayment)
        console.log(savedPayment)
    } catch (error) {
        res.status(500).json({message:"Error setting Payment"});
        console.log(error);
    }
}