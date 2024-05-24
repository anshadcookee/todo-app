const { Router } = require("express");
const {
  getToDo,
  saveTodo,
  updateToDo,
  deleteToDo,
  updateCompleteKey,
  saveOrUpdateTodo,
  searchUser,
} = require("../controllers/todo_controller");
const { register, login,forgotPassword,resetPassword} = require("../controllers/auth_controller");
const { authenticateToken } = require("../utlity/auth_utlity");
const { customerModel, getAllCustomers, addCustomer } = require("../controllers/customer_controller");
const { setFollowUp } = require("../controllers/follow_up_controller");
const { setPayment } = require("../controllers/payment_controller");
const { searchCustomer } = require("../controllers/search_customer");

const router = Router();

// CRUD
router.get("/list",authenticateToken, getToDo);
router.post("/update",authenticateToken, saveOrUpdateTodo);
router.delete("/delete",authenticateToken, deleteToDo);
router.post("/status",authenticateToken, updateCompleteKey);
// router.post("/add",customerModel);

// Search Usernames
router.get("/search-user",searchUser);

// forget and reset password
// router.post('/forgot-password',forgotPassword)
// router.post('/reset-password',resetPassword)


// authentication
router.post("/register",register);
router.post("/login", login);


// SHOW customers
router.get("/show_customer",getAllCustomers);
// ADD customers
router.post("/add_customer",addCustomer);
// FollowUp api
router.post("/follow_up",setFollowUp);
// Payment api
router.post("/payment",setPayment);
// Search customer
router.get("/search-customer",searchCustomer);

router.post("/search-customer", (req, res) => {
  debouncedSearchCustomer(req, res);
});

module.exports = router;
