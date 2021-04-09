const { Router } = require("express");
const { check, param } = require("express-validator");

const { validarJWT, validarCampos } = require("../middlewares");

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeTaskPorId
} = require("../helpers/db-validators");

const {
  tasksGet,
  tasksPost,
  tasksUpdate,
  tasksDelete,
} = require("../controllers/tasks");

const router = Router();

router.get("/", [validarJWT], tasksGet);

router.post("/", [validarJWT], tasksPost);

router.put(
  "/:id",
  [
    validarJWT, 
  ],
  tasksUpdate
);

router.delete("/:id", [validarJWT], tasksDelete);

module.exports = router;
