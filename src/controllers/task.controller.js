import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    const taskSaved = await newTask.save();
    res.json(taskSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ mssage: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(404).json({ mssage: "Task not found" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ mssage: "Task not found" });
    return res.senStatis(204);
  } catch (error) {
    return res.status(404).json({ mssage: "Task not found" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ mssage: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(404).json({ mssage: "Task not found" });
  }
};
