const {io} = require('../index.js');

//Mensajes de sockets "on"(escuchar), "emit"(transmitir/hablar)
io.on('connection', client => {
    console.log("Cliente Conectado");
    client.on('disconnect', () => { 
        console.log("Cliente Desconectado");
     });

     client.on('mensaje',(payload)=>{
         console.log('Mensaje recibido',payload);
         io.emit('mensaje', {
             admin: 'Nuevo Mensaje'
         });
     });
});
