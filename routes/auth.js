/*
path: api/login
*/
const {Router}= require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();

router.post('/new',[//definicion de middlewars para validaciones
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),//validando que venga el nombre
    check('email', 'Debe ingresar un correo').not().isEmpty(),//validando que venga el nombre
    check('email', 'Correo ingresado es invalido').isEmail(),//validando que venga el nombre
    check('password', 'Debe ingresar una contraseña').not().isEmpty(),//validando que venga el nombre
    validarCampos,
],crearUsuario);


router.post('/',[//definicion de middlewars para validaciones
    check('email', 'Debe ingresar un correo').not().isEmpty(),//validando que venga el nombre
    check('email', 'Correo ingresado es invalido').isEmail(),//validando que venga el nombre
    check('password', 'Debe ingresar una contraseña').not().isEmpty(),//validando que venga el nombre
    validarCampos,
],login);

//validarJWT
router.get('/renew',validarJWT, renewToken);


module.exports = router;
