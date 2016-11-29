


var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

whiteboard.on('draw', function(start, end, strokecolor){
	socket.emit('draw', start, end, strokecolor);
});

socket.on('friend_draw', function(start, end, strokecolor) {
  whiteboard.draw(start, end, strokecolor, false);
});
