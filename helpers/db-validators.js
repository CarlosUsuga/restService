const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role = ' ') => {
    const existRole = await Role.findOne({ role });
    if(!existRole){
        throw new Error(`El Rol ${ role } que intenta ingresar no es admitido`);
    }
}

const isEmailValid = async(correo = ' ') => {
    //Verificacion del correo existente
    const existEmail = await User.findOne({ correo });
    if( existEmail ) {
        throw new Error(`El correo ${ correo } ya existe`);
    }
}

const existUserForId = async( id ) => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    isRoleValid,
    isEmailValid,
    existUserForId
}