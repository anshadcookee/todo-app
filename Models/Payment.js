const mongoose = require("mongoose");

const paymentSchema =  new mongoose.Schema(
    {
        amount:{
            type:Number,
            required:true
        },
        payment_type:{
            type:String,
            required:true,
            enum:["Online","Check","Cash"],
        },
        proof:{
            type:String,
            required:true
        }
    },{timestamps:true}
);

const Payment = mongoose.model("Payment",paymentSchema);
module.exports= Payment;