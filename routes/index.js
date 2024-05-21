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
const { searchCustomer } = require("../controllers/Search_customer");

const router = Router();

// CRUD
router.get("/customer",authenticateToken, getToDo);
router.get("/list",authenticateToken, getToDo);
router.post("/update", saveOrUpdateTodo);
router.delete("/delete",deleteToDo);
router.post("/status",updateCompleteKey);
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

router.get("/search-customer",searchCustomer)
module.exports = router;
