const Task = require("../models/task");

const tasksGet = async (req, res) => {

    const id = req.body.id
    const tasks = await Task.find({ user: id})
    console.log(tasks)
  res.json({
    msg: "holi-get",
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

module.exports = {
  tasksGet,
  tasksPost,
};
