import { Task } from "../models/taskModel.js";


const getAllTasks = async (req, res) => {
  try {
    res.send("Get All Tasks");
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


const addTask = async (req, res) => {
  try {
    res.send("Add a task");
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


const getTask = async (req, res) => {
  try {
    res.send(req.params);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


const updateTask = async (req, res) => {
  try {
    res.send(req.params);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


const deleteTask = async (req, res) => {
  try {
    res.send(req.params);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}



export {getAllTasks, addTask, getTask, updateTask, deleteTask};