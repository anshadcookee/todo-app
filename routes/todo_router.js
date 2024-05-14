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
const { register, login} = require("../Controllers/authController");
const { authenticateToken } = require("../Utlis/authUtlis");

const router = Router();

// CRUD
router.get("/list",authenticateToken, getToDo);
router.post("/update", saveOrUpdateTodo);
router.delete("/delete",deleteToDo);
router.post("/status",updateCompleteKey);
// Search Usernames
router.get("/search-user",searchUser);
// authentication
router.post("/register",register);
router.post("/login", login);

module.exports = router;