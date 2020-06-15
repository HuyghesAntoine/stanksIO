'use strict'
/**
 * Import Game class.
 */

const Game = require('../engine/Game');

const game = new Game('Game');

/**
 * Socket.io server. 
 */

const socketio = require('socket.io');

function io(server) {
  
  const io = socketio(server);

  io.on('connection', function(socket) {
    socket.on('register', () => game.register(socket.id));

    socket.on('move', () => game.move(socket.id));

    socket.on('disconnect', () => game.delist(socket.id));

  });

}

module.exports = io;
