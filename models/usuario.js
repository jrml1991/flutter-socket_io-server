const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true, 
        unique: true       
    },
    password: {
        type: String,
        required: true,        
    },
    online: {
        type: Boolean,
        default: false,        
    },
});

//sobrescribiendo el metodo
UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object}//excluyo las primeras 3 propiedas y ...(lo restante) lo inserto en object
                                         = this.toObject();
    object.uid = _id;
    return object;
});

//para importar es necesario exportar explicitamente
module.exports = model('Usuario',UsuarioSchema);
