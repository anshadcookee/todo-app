const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true, 
      unique: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    amount_due: { 
      type: Number, 
      required: true 
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;