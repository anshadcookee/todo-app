const ToDoModel = require("../Models/todoModels");
const mongoose = require("mongoose");


// GET
module.exports.getToDo = async (req, res) => {
  try {
    const toDo = await ToDoModel.find();
    res.send(toDo);
  } catch (error) {
    console.log(error);
  }
};
// POST
module.exports.saveTodo = async (req, res) => {
  try {
    const text = req.body;
    const saveTodo = await ToDoModel.create(text);
    console.log("Created Sucessfuly..");
    res.send(saveTodo);
  } catch (error) {
    console.log(error);
  }
};
// Create & Update
module.exports.saveOrUpdateTodo = async (req, res) => {
  try {
    const { _id, text, completed } = req.body;

    let todo;

    if (_id && mongoose.isValidObjectId(_id)) {
      // Update existing todo if _id is provided and valid ObjectId
      todo = await ToDoModel.findByIdAndUpdate(
        _id,
        { text, completed },
        { new: true }
      );
      if (!todo) {
        return res.status(404).send("Todo not found");
      }
    } else {
      // Create new todo with a generated _id (UUID)
      const newTodo = await ToDoModel.create({ text, completed });
      todo = newTodo;
    }
    return res.send("Todo saved/updated successfully");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

//DELETE
module.exports.deleteToDo = async (req, res) => {
  try {
    const { _id } = req.body;
    const deleteTodo = await ToDoModel.findByIdAndDelete(_id);
    res.send("Deleted Succesfully...");
  } catch (error) {
    console.log(error);
  }
};
// Update Complete Key
module.exports.updateCompleteKey = async (req, res) => {
  try {
    const { _id, complete } = req.body;
    const updateCompleteKey = await ToDoModel.findByIdAndUpdate(
      { _id },
      { complete }
    );
    res.send("Completed Key Value Has been updated.....");
  } catch (error) {
    console.log(error);
  }
};
