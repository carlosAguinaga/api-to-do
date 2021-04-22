const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const usersGet = async (req, res) => {
  res.send("user desde controller");
};

const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userModel = new User({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(); // defauld is 10
  userModel.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  const user = await userModel.save();
  const token = await generarJWT(user.id);

  res.status(201).json({
    msg: "post user",
    id: user.id,
    email: user.email,
    nombre: user.nombre,
    token,
  });
};

module.exports = {
  usersGet,
  usersPost,
};
