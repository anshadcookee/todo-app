const Customer = require("../models/customer");
const moment = require("moment")

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
    console.log(customers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customers", error });
  }
};

// Add a new customer
exports.addCustomer = async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    address,
    status,
    total_amount,
    amount_due,
    area,
    last_contact_days,
    cid_no,
    total_calls_count,
    balance_amount,
    lsd_date,
    lobd_date,
    received_amount,
    next_follow_up,
    description,
    
  } = req.body;

  // Convert lsd_date and lobd_date from strings to Date objects
  const formattedLsdDate = lsd_date ? moment(lsd_date, 'DD-MM-YYYY').format('DD-MM-YYYY') : null;
  const formattedLobdDate = lobd_date ?  moment(lobd_date, 'DD-MM-YYYY').format('DD-MM-YYYY') : null;
  const formattedFollowUpDate = next_follow_up ?  moment(next_follow_up, 'DD-MM-YYYY').format('DD-MM-YYYY') : null;

  const newCustomer = new Customer({
    first_name,
    last_name,
    phone,
    address,
    total_amount,
    amount_due,
    status,
    area,
    last_contact_days,
    cid_no,
    total_calls_count,
    balance_amount,
    lsd_date: formattedLsdDate,
    lobd_date: formattedLobdDate,
    received_amount,
    next_follow_up:formattedFollowUpDate,
    description,
  });

  try {
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
    console.log(newCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error adding customer", error });
    console.log(error);
  }
};
