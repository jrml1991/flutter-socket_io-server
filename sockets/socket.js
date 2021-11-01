const {io} = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands();
bands.addBand(new Band('Rescate'));
bands.addBand(new Band('Redimi2'));
bands.addBand(new Band('En Espiritu y en Verdad'));
bands.addBand(new Band('Barak'));
bands.addBand(new Band('Alex Zurdo'));

//Mensajes de sockets "on"(escuchar), "emit"(transmitir/hablar)
io.on('connection', client => {
    console.log("Cliente Conectado");

    client.emit('bandas-activas',bands.getBands());

    client.on('disconnect', () => { 
        console.log("Cliente Desconectado");
     });

     client.on('mensaje',(payload)=>{
         console.log('Mensaje recibido',payload);
         io.emit('mensaje', {
             admin: 'Nuevo Mensaje'
         });
     });

     client.on('emitir-mensaje',(payload)=>{
         console.log(payload);
        //io.emit('nuevo-mensaje', payload); //emite a todos los clientes conectados
        client.broadcast.emit('nuevo-mensaje', payload);//emite a todos los clientes excepto al cliente emisor
    });

    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('bandas-activas',bands.getBands());
   });

   client.on('add-band',(payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit('bandas-activas',bands.getBands()); 
    });

    
   client.on('delete-band',(payload)=>{
    bands.deleteBand(payload.id);
    io.emit('bandas-activas',bands.getBands()); 
});
});
