const Customer = require("../models/customer");
const debounce = require("../utlity/debounce");

const searchCustomer = async (req, res) => {
  const { name, /*phone, area,cid_no,*/ } = req.body;

  try {
    // Prepare the aggregation pipeline
    const pipeline = [
      // Create a new field 'fullName' by concatenating 'first_name' and 'last_name'
      {
        $addFields: {
          full_name: { $concat: ['$first_name', ' ', '$last_name'] }
        }
      },
      // Match the concatenated 'fullName' field against the provided 'name'
      {
        $match: {
          $or: [
            { first_name: { $regex: new RegExp(name, 'i') } },
            { last_name: { $regex: new RegExp(name, 'i') } },
            { full_name: { $regex: new RegExp(name, 'i') } },
            // { phone: { $regex: new RegExp(phone, 'i') } },
            // { area: { $regex: new RegExp(area, 'i') } },


          ]
        }
      }
    ];
    // Execute the aggregation pipeline
    const customers = await Customer.aggregate(pipeline);

    if (customers.length === 0) {
      console.log("Customer not found for name:", name);
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log(customers);
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error searching for Customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  };
  
const debouncedSearchCustomer = debounce(searchCustomer, 300);

module.exports.searchCustomer = (req, res) => {
    debouncedSearchCustomer(req, res);
};
 