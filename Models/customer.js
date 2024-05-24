const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    status: { 
      type: String, 
      required: true, 
      enum: ["open", "black_list", "suspicious"] 
    },
    last_contact_days: {
      type: Number,
      required: true,
    },
    cid_no: {
      type: String,
      required: true,
    },
    total_calls_count: {
      type: Number,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },

    balance_amount: {
      type: Number,
      required: true,
    },
    lsd_date: {
      type: String,
      required: true,
    },
    lobd_date: {
      type: String,
      required: true,
    },
    received_amount: {
      type: Number,
      required: true,
    },
    next_follow_up: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
