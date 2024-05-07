const ToDoModel= require("../Models/todoModels");

// GET
module.exports.getToDo =async(req,res)=>{
    const toDo = await ToDoModel.find()
    res.send(toDo);
}

// POST
module.exports.saveTodo =async (req,res)=>{
    const text = req.body;
    console.log(text);
    ToDoModel
        .create(text)
        .then((data)=>{
            console.log("Added Sucessfuly");
            console.log(data);
            res.send(data);
        }) 
}
module.exports.updateToDo = async (req,res)=>{
    const{_id,text} = req.body;
    ToDoModel
    .updateOne({text})
    .then(()=> res.send("Updated Succesfully..."))
    .catch((err)=> console.log(err))
}
module.exports.deleteToDo = async (req,res)=>{
    const{_id} = req.body;
    ToDoModel
    .findByIdAndDelete(_id)
    .then(()=> res.send("Deleteded Succesfully..."))
    .catch((err)=> console.log(err))
}