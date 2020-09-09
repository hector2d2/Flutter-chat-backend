const {io}  = require('../index');

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    
    client.on('disconnect', () => { 
        console.log('Cliente Desconectado');
     });
     

   //   client.on('emitir-mensaje',(payload) => {
   //      //  console.log(payload);
   //      // io.emit('nuevo-mensaje', payload); //emite a todos
   //      // client.broadcast.emit('nuevo-mensaje:', payload);// emite a todos menos al que lo emitio
   //      client.broadcast.emit('nuevo-mensaje', payload);
   //   })
  });
