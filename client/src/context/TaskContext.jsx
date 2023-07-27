import { createContext, useContext, useState } from "react";
import {
  getTasksRequest,
  getTaskRequest,
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from "../api/tasks.js";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within an TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);  
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;  
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const deleteTask = async(id)=>{
    try{
      const res = await deleteTaskRequest(id)
      if(res.status===204){
        setTasks(tasks.filter(task=>task._id!==id))
      }
    }catch(error){
      console.log(error)
    }

  }

  const updateTask = async(id,task)=>{
    try{
      await updateTaskRequest(id,task) 
    }catch(error){
      console.log(error)
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, getTasks, getTask,createTask ,deleteTask,updateTask}}>
      {children}
    </TaskContext.Provider>
  );
};
