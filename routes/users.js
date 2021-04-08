const {Router} = require('express');
const { check } = require("express-validator");

const {
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRol
  } = require('../middlewares');


const { esRolValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const {
    usersGet,
    usersPost
} = require('../controllers/users');


const router = Router();

router.get('/', usersGet);
router.post('/', [
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('password','el password debe de ser de más de 6 letras').isLength({min: 6}),
    check('email','el correo no es válido').isEmail(),
    check('email').custom( emailExiste ),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( esRolValido ),
    validarCampos
  ], usersPost);


module.exports = router;