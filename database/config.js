const mongoose = require('mongoose');

const dbConnection = async()=>{
    try{
       //await para que espere que termine de conectar 
       await mongoose.connect(process.env.DB_CNN);
       console.log('Base de Datos Online');
    }catch{
        console.log(errror);
        throw new Error('Error en la bse de Datos. Contacte al administrador');
    }
}

module.exports = {
    dbConnection
}