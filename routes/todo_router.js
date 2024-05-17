const { Router } = require("express");
const {
  getToDo,
  saveTodo,
  updateToDo,
  deleteToDo,
  updateCompleteKey,
  saveOrUpdateTodo,
  searchUser,
} = require("../Controllers/todoController");
const { register, login,forgotPassword,resetPassword} = require("../Controllers/authController");
const { authenticateToken } = require("../Utlis/authUtlis");
const { customerModel, getAllCustomers, addCustomer } = require("../Controllers/customerController");
const { setFollowUp } = require("../Controllers/followUpController");

const router = Router();

// CRUD
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


//SHOW customers
router.get("/show_customer",getAllCustomers);
//ADD customers
router.post("/add_customer",addCustomer);
// FollowUp api
router.post("/follow_up",setFollowUp);

module.exports = router;
