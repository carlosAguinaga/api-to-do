const Role = require("../models/role");
const User = require("../models/user");

const esRolValido = async (role = "") => {
  const existeRol = await Role.findOne({ role: role });
  if (!existeRol) {
    throw new Error(`el rol ${role} no está registrado en la BD`);
  }
};

// Verificar si el email existe
const emailExiste = async (email = '') => {
  const existeCorreo = await User.findOne({ email });
  if (existeCorreo) {
      throw new Error(`El correo ${email} ya está registrado`)
  }
};


const existeUsuarioPorId = async (id) => {
  const existeUsuario = await User.findById(id);
  if (!existeUsuario) {
    throw new Error(`el ${id} no existe`);
  }
};



module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId
};