const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = async (req, res) => {
  res.send("user desde controller");
};

const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(); // defauld is 10
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await user.save();

  res.json({
    msg: "post user",
    user,
  });
};

module.exports = {
  usersGet,
  usersPost,
};
