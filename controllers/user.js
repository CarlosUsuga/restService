const { response, request } = require('express');

const userGet = (req = request, res = response) => {
    const {
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
    } = req.query;

    res.json({
        msg: 'get API - controlador',
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

const userPost = (req, res) => {
    const body = req.body;

    res.status(201).json({
        msg: 'post API - controlador',
        body
    });
}

const userPut = (req, res) => {
    const { id } = req.params;

    res.status(500).json({
        msg: 'put API - controlador',
        id
    });
}

const userPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const userDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut, 
    userPatch,
    userDelete
}