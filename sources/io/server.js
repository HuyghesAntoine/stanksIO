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

    socket.on('move', (direction) => game.move(socket.id,direction));

    socket.on('shoot', () => game.shoot(socket.id));

    socket.on('disconnect', () => game.delist(socket.id));

  });

  setInterval(()=> {
    game.moveAll();
    const data = {
      message: 'Server update !',
      players: Object.values(game.players)
    };
    io.volatile.emit('update', data);
  }, 1000/25);
}

module.exports = io;
