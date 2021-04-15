const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el email existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: "Usuario/Password no son correctos",
    });
  }

  // Si el usuario no esta activo
  if (!user.state) {
    return res.status(400).json({
      msg: "Usuario/Password no son correctos",
    });
  }

  // Verificar la contraseña
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "Usuario/Password no son correctos",
    });
  }

  // Generar el JWT
  const token = await generarJWT(user.id);

  try {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};





const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { email, name, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      //tengo que crearlo
      const data = {
        name,
        email,
        password: ":P",
        img,
        google: true,
        role: "ADMIN_ROLE",
      };

      user = new User(data);
      await user.save();
    }

    // si el usuario esta en BD
    if (!user.state) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      usuario: user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "token de google no es valido",
    });
  }
};


const revalidarToken = async (req, res) => {

  const uid = req.user._id;
  const token = await generarJWT(uid)

  res.json({
    ok: true,
    token
  })

}

module.exports = {
  login,
  googleSignIn,
  revalidarToken
};
