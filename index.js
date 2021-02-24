const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io')

//configuracion de puerto
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')))

//iniciar el servidor
const server = app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
});

//configuracion Socket.io
const io = SocketIO(server);

//webSckets
io.on('connection', (socket) => {
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    })
});
