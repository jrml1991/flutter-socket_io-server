const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Config
require('./database/config').dbConnection();//llamando a la funcion

//app de express la cual es compatible con server socket io
const app = express();


//lectura y parse de body de peticion http
app.use(express.json());

// crear codigo asociado a servidor node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');


//path publico en donde este el servidor
const publicPath = path.resolve( __dirname, 'public');
//le decimos al app de express que utilice el public path
app.use(express.static(publicPath));

//Mis Rutas
app.use('/api/login', require('./routes/auth'));


server.listen(process.env.PORT, (err) => {
    if(err){
        throw new Error(err);
    }

    console.log('Servidor corriendo en puerto!!',process.env.PORT);
})