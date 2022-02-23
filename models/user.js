const { Schema, model } = require('mongoose');

const userSchema = Schema({
    id: { 
        type: String,
        required: [true, 'El documento debe ser obligatorio'],
        unique: true   
    },
    typeDocument: {
        type: String,
        required: [true, 'Debe seleccionar algun tipo de documento']
    }, 
    firtName:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    }, 
    secondName:{
        type: String
    }, 
    lastName:{
        type: String,
        required: [true, 'El apellido es obligatorio']
    }, 
    secondLastName:{
        type: String
    }, 
    cargo:{
        type: String
    }, 
    salario:{
        type: String
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', userSchema);