const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
// const io = socketio(expressServer);
const io = socketio();
io.attach(expressServer); // Same thing

io.on('connection', (socket) => {
    socket.emit('messageFromServer', { data: "Welcome to the socketio server" })
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient)
    })

    socket.on('newMessageToServer', (msg) => {
        // console.log(msg)
        io.emit('messageToClients', {text: msg.text})
        // 중요!!! io를 쓰는 이유는, 열려 있는 every socket에 대해서 처리하기 위해.
    })
})

