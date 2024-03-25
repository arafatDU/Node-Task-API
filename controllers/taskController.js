import { Task } from "../models/taskModel.js";
import mongoose from "mongoose";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js";

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
})


const addTask = asyncWrapper( async (req, res) => {
    

    const newTask = {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    }
    const task = await Task.create(newTask);

    res.status(201).json(task);

})


const getTask = asyncWrapper( async (req, res, next) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createCustomError(`Invalid ID`, 404));
      //return res.status(404).json({message: "Invalid ID"});
    }
    const task = await Task.findOne({_id: id});
    if(!task){
      return next(createCustomError(`No Task with id : ${id}`, 404));
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
      return next(createCustomError(`No Task with id : ${id}`, 404));
    }

    res.status(200).json(task);

})


const deleteTask = asyncWrapper( async (req, res) => {

    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if(!task){
      return next(createCustomError(`No Task with id : ${id}`, 404));
    }
    res.status(200).json({message: "Task Deleted Successfully"});

})



export {getAllTasks, addTask, getTask, updateTask, deleteTask};