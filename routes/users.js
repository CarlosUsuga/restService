const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validetion-camp');
const { isRoleValid, isEmailValid, existUserForId } = require('../helpers/db-validators');

const { 
    userGet, 
    userPost,
    userPut,
    userPatch,
    userDelete
} = require('../controllers/users');
const role = require('../models/role');

const router = Router();

router.get('/', userGet );

router.post('/', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('typeDocument', 'El tipo de documento es obligatorio').not().isEmpty(),
    check('firtName', 'El nombre debe ser obligatorio').not().isEmpty(),
    check('lastName', 'El Apellido es obligatorio').not().isEmpty(),
  //  check('correo', 'Este correo no es valido').isEmail(),
    check('correo').custom(isEmailValid),
    check('password', 'El password debe contener como minimo 6 caracteres').isLength({ min: 6 }),
 //   check('role', 'Este no es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    validarCampo
], userPost );

router.put('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existUserForId),
  check('role').custom(isRoleValid),
  validarCampo
], userPut );

router.patch('/', userPatch );

router.delete('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existUserForId),
  validarCampo
], userDelete );

module.exports = router;