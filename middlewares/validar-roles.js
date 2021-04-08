const esAdminRole = (req, res, next) => {
  if (!req.user) {
    res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador - no puede hacer esto`,
    });
  }

  next();
};

const tieneRol = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }

    if ( !roles.includes(req.user.role) ) {
        return res.status(401).json({
            msg:`El servicio prefiere uno de estos roles ${roles}`
        })
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRol,
};