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
    var id = game.nbJ;

    socket.on('register', () => game.register(id, socket.id));

    socket.on('move', (direction) => game.move(id, direction));

    socket.on('stopMove', () => game.stopMove(id) );

    socket.on('shoot', (direction) => game.shoot(id, direction));

    socket.on('upgrade', (value) => game.upgrade(id, value));

    socket.on('pseudo', (pseudo) => game.changePseudo(id,pseudo));

    socket.on('disconnect', () => game.delist(id, socket.id));

  });

  setInterval(() =>{
    //game.testPlayer();
    const data = {
      message: 'display',
      players: Object.values(game.players)
    };
    io.volatile.emit('control', data);
  }, 1000 / 5);

  setInterval(() => {
    game.refresh();
    //console.log(game.bonus.entities);
    const data = {
      message: 'Server update !',
      players: Object.values(game.players),
      factory: Object.values(game.factory),
      bonus: Object.values(game.bonus)
    };
    io.volatile.emit('update', data);
  }, 1000 / 60);

  setInterval( ()=> {
    io.volatile.emit('leaderboard', game.leaderboard);
  },1000);
}

module.exports = io;
