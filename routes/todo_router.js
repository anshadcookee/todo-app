const { Router } = require("express");
const {
  getToDo,
  saveTodo,
  updateToDo,
  deleteToDo,
  updateCompleteKey,
  saveOrUpdateTodo,
} = require("../Controllers/todoController");
const { register, login} = require("../Controllers/authController");
const { athenticateToken } = require("../Utlis/authUtlis");

const router = Router();
// CRUD
router.get("/list",athenticateToken, getToDo);
router.post("/update", saveOrUpdateTodo);
router.delete("/delete", deleteToDo);
router.post("/status",updateCompleteKey);
// authentication
router.post("/register",register);
router.post("/login" , login);


module.exports = router;