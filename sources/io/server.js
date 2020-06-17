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
  io.on('connection', function (socket) {
    socket.id = game.nbJ;

    socket.on('register', () => game.register(socket.id));

    socket.on('move', (direction) => game.move(socket.id, direction));

    socket.on('shoot', (direction) => game.shoot(socket.id, direction));

    socket.on('pseudo', (pseudo) => game.changePseudo(socket.id,pseudo));

    socket.on('disconnect', () => game.delist(socket.id));

  });

  setInterval(() =>{
    const data = {
      message: 'display',
      player: Object.values(game.players)
    };
    io.volatile.emit('control', data);
  }, 1000 / 5);

  setInterval(() => {
    game.refresh();
    const data = {
      message: 'Server update !',
      players: Object.values(game.players),
      factory: Object.values(game.factory),
      bonus: Object.values(game.bonus)
    };
    io.volatile.emit('update', data);
  }, 1000 / 25);
}

module.exports = io;
