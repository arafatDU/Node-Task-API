import { Task } from "../models/taskModel.js";


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


const addTask = async (req, res) => {
  try {
    if(
      !req.body.title ||
      !req.body.description
    ){
      return res.status(400).json({
        message: "Send all required fields: title, description, completed"
      });
    }

    const newTask = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    }
    const task = await Task.create(newTask);

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if(!task){
      res.status(404).json({message: "Task Not Found"});
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if(!task){
      res.status(404).json({message: "Task Not Found"});
    }
    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if(!task){
      res.status(404).json({message: "Task Not Found"});
    }
    res.status(200).json({message: "Task Deleted Successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}



export {getAllTasks, addTask, getTask, updateTask, deleteTask};