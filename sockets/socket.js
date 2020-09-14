const {io}  = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

//Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente Conectado');

    const clientsWithToken = client.handshake.headers['x-token'];
    const [valido, uid] = comprobarJWT(clientsWithToken);

    // console.log(valido, uid);
    //Verificar Autentificacion
    if(!valido) return client.disconnect();
    // console.log('Cliente autenticado');
    usuarioConectado(uid);

    //Ingresar al usuario a una sala en particular
    //Sala global
    client.join(uid);

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal',async(payload) => {
      // console.log(payload);
      //Grabar mensaje
      await grabarMensaje(payload);
      io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => { 
        console.log('Cliente Desconectado');
        usuarioDesconectado(uid);
     });
     

   //   client.on('emitir-mensaje',(payload) => {
   //      //  console.log(payload);
   //      // io.emit('nuevo-mensaje', payload); //emite a todos
   //      // client.broadcast.emit('nuevo-mensaje:', payload);// emite a todos menos al que lo emitio
   //      client.broadcast.emit('nuevo-mensaje', payload);
   //   })
  });
