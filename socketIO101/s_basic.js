// We need http because we don't have express
const http = require('http');
// We need socketio ... it's 3rd party!
const socketio = require('socket.io')

// We make an http server with node!
const server = http.createServer((req, res) => {
    res.end('I am connected!');
});

const io = socketio(server);

io.on('connection', (socket, req) => {
    // ws.send becomes socket.emit
    socket.emit('welcome','Welcome to websocket server!')
    // no change here ...
    socket.on('message', (msg) => {
        console.log(msg)
    })
})

server.listen(8000);