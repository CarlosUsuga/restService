const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const userGet = async(req = request, res = response) => {
  const {limite = 5, desde = 0} = req.query;
  const query = {estado: true};
  
//  const users = await User.find(query).skip(Number(desde)).limit(Number(limite));
//  const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({ 
        total,
        users
    });
}

const userPost = async(req, res = response) => {
    const { id, typeDocument, firtName, secondName, lastName, secondLastName, correo, password, role, cargo } = req.body;
    const user = new User({ id, typeDocument, firtName, secondName, lastName, secondLastName, correo, password, role, cargo });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //guardar base de datos
    await user.save();

    res.status(201).json({
        user
    });
}

const userPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //validar en la base de datos
    if( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.status(500).json({
        user
    });
}

const userPatch = (req, res) => {
    const {
        id = "Not Id",
        typeDocument = "Not Document", 
        firtName = "Not Name", 
        secondName = "Not Name", 
        lastName = "Not Name", 
        secondLastName = "Not Name", 
        fechaNacimiento = "Not Data", 
        fechaVinculacion = "Not Data", 
        cargo = "Not Data", 
        salario = "Not Data"
    } = req.params;

    res.json({
        msg: 'patch API - controlador',
        id,
        typeDocument, 
        firtName, 
        secondName, 
        lastName, 
        secondLastName, 
        fechaNacimiento, 
        fechaVinculacion, 
        cargo, 
        salario
    });
}

const userDelete = async(req, res) => {
    const { id } = req.params;

    //borrar los datos fisicamente
//    const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate( id, {estado: false});
    res.json({
        user
    });
}

module.exports = {
    userGet,
    userPost,
    userPut, 
    userPatch,
    userDelete
}