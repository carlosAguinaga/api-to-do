const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarJWT,
  validarCampos,
  esAdminRole,
  tieneRol,
} = require("../middlewares");

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const { tasksGet, tasksPost } = require("../controllers/tasks");

const router = Router();

router.get(
  "/",
  [
    validarJWT,
    check("id", "no es un ID válido").isMongoId(),
    check("id").custom( existeUsuarioPorId ),
    validarCampos,
  ],
  tasksGet
);

router.post("/", [validarJWT], tasksPost);

module.exports = router;
