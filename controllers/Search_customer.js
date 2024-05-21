const Customer = require("../models/customer");
const debounce = require("../utlity/debounce");

const searchCustomer = async (req, res) => {
    const { name } = req.body;
    try {
      //list the matching usernames
      const user = await Customer.aggregate([
        { $match: { name:{ $regex: new RegExp(`^${name}`, 'i')}
        }  },// { $regex: new RegExp(req.body.username, "i") }

      ]);
      if (!user) {
        console.log("Customer not found for name:", customerName);
        return res.status(404).json({ error: "Customer not found" });
      }
      console.log(user);
      res.status(200).json(user.length !== 0 ? user : "not found");
    } catch (error) {
      console.error("Error searching for Customer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
const debouncedSearchCustomer = debounce(searchCustomer, 300);

module.exports.searchCustomer = (req, res) => {
    debouncedSearchCustomer(req, res);
};
 