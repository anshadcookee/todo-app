const Customer = require("../Models/customer");

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
  const { name, phone, address, amount_due } = req.body;
  const newCustomer = new Customer({ name, phone, address, amount_due });
  try {
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
    console.log(newCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error adding customer", error });
    console.log(error);
  }
};
