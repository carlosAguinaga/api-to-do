const { Router } = require("express");
const { validarJWT } = require("../middlewares");

const {
  tasksGet,
  tasksPost,
  tasksUpdate,
  tasksDelete,
} = require("../controllers/tasks");

const router = Router();

router.get("/", [validarJWT], tasksGet);

router.post("/", [validarJWT], tasksPost);

router.put("/:id", [validarJWT], tasksUpdate);

router.delete("/:id", [validarJWT], tasksDelete);

module.exports = router;
