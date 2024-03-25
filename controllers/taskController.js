import { Task } from "../models/taskModel.js";
import mongoose from "mongoose";
import asyncWrapper from "../middleware/async.js";

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
})


const addTask = asyncWrapper( async (req, res) => {
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

})


const getTask = asyncWrapper( async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({message: "Task Not Found"});
    }
    const task = await Task.findById(id);
    if(!task){
      res.status(404).json({message: "Task Not Found"});
    }
    res.status(200).json(task);
  
})


const updateTask = asyncWrapper( async (req, res) => {

    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if(!task){
      res.status(404).json({message: "Task Not Found"});
    }

    res.status(200).json(task);

})


const deleteTask = asyncWrapper( async (req, res) => {

    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if(!task){
      res.status(404).json({message: "Task Not Found"});
    }
    res.status(200).json({message: "Task Deleted Successfully"});

})



export {getAllTasks, addTask, getTask, updateTask, deleteTask};