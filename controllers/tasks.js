const Task = require("../models/task");

const tasksGet = async (req, res) => {
  const id = req.user.id;
  const tasks = await Task.find({ user: id });

  res.status(200).json({
    total_tasks: tasks.length,
    tasks,
  });
};

const tasksPost = async (req, res) => {
  const { note } = req.body;
  const data = {
    note,
    user: req.user._id,
  };
  const task = new Task(data);

  // Guardar en DB
  await task.save();

  res.status(201).json(task);
};

const tasksUpdate = async (req, res) => {
  const { id } = req.params;
  const note = req.body.note;

  // const task = await Task.findOne({ _id: id });
  const task = await Task.findById(id)
  if (task && task.user == req.user.id) {
    await Task.findByIdAndUpdate(id, { note });
    return res.status(200).json({ msg: "task updated" });
  }
  res.status(401).json({ msg: "unauthorized" });
};

const tasksDelete = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id)
  if (task && task.user == req.user.id) {
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ msg: "task deleted" });
  }
  res.status(401).json({ msg: "could not be deleted" });

};

module.exports = {
  tasksGet,
  tasksPost,
  tasksUpdate,
  tasksDelete,
};
