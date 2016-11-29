var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

io.on('connection', function (socket) {
    console.log('A new client has connected!');
    console.log(socket.id);
    socket.on('disconnect', function(){
     	console.log('socket is disconnected');
    });
    socket.on('draw', function(start, end, strokecolor) {
      socket.broadcast.emit('friend_draw', start, end, strokecolor);
    });
});

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});