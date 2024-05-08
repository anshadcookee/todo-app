
const ToDoModel= require("../Models/todoModels");

// GET
module.exports.getToDo =async(req,res)=>{
    try {
        const toDo = await ToDoModel.find()
        res.send(toDo);
    } catch (error) {
        console.log(error);
    }
}
// POST
module.exports.saveTodo =async (req,res)=>{
    try {
        const text = req.body;
        console.log(text);
        const saveTodo = await ToDoModel.create(text);
        console.log("Created Sucessfuly..");
        res.send(saveTodo);
    } catch (error) {
        console.log(error)
    }
}

//UPDATE
module.exports.updateToDo = async (req,res)=>{
    try {
        const{_id,text,completed} = req.body;
        const updatTodo = await ToDoModel.updateOne({_id},{completed,text})
         res.send("Updated Succesfully...")
    } catch (error) {
        console.log(error)
    }
}
//DELETE
module.exports.deleteToDo = async (req,res)=>{
    try {
        const{_id} = req.body;
        const deleteTodo = await  ToDoModel.findByIdAndDelete(_id)   
        res.send("Deleted Succesfully...")
    } catch (error) {
        console.log(err)
    }

}