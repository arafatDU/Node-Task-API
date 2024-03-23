import express from "express";
import mongoose from "mongoose";
import taskRoute from "./routes/taskRoute.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const mongodb_connect = process.env.MONGO_URI;
const app = express();


// middleware
app.use(express.json());

// routes
app.use('/api/tasks', taskRoute);


app.get('/', (req, res) => {
  res.send("<h1>Task Manager</h1>");
});


mongoose.connect(mongodb_connect)
  .then(() =>{
    console.log("Connected to Database");
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  })
