const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn, revalidarToken } = require("../controllers/auth");
const { validarJWT } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/login", [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

router.post("/google", [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
],googleSignIn);

router.get('/renew', [validarJWT], revalidarToken )



module.exports = router;