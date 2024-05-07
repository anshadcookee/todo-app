const{Router} = require("express");
const { getToDo, saveTodo, updateToDo, deleteToDo } = require("../Controllers/todoController");

const router = Router();
router.get('/',getToDo)
router.post('/save',saveTodo);
router.post('/update',updateToDo);
router.delete('/delete',deleteToDo);


module.exports = router;