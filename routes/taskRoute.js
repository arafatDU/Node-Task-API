import express from "express";
import { getAllTasks, addTask, getTask, updateTask, deleteTask } from "../controllers/taskController.js";
const router = express.Router();

router.get('/', getAllTasks);
router.post('/', addTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);


export default router;