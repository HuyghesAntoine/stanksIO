'use strict'
/**
 * Import Game class.
 */

const Game = require('../engine/Game');
const control = require('../../controller/userController');


const game = new Game('Game');

/**
 * Socket.io server. 
 */

const socketio = require('socket.io');

function io(server) {

  const io = socketio(server);
  io.on('connection', function (socket) { //every socket.emit the server receive by players are managed here
    var id = game.nbJ;

    socket.on('register', (cls) => game.register(id, socket.id, cls));

    socket.on('move', (direction) => game.move(id, direction));

    socket.on('stopMove', () => game.stopMove(id) );

    socket.on('shoot', (direction) => game.shoot(id, direction));

    socket.on('upgrade', (value) => game.upgrade(id, value));

    socket.on('pseudo', (pseudo) => game.changePseudo(id,pseudo));

    socket.on('disconnect', () => game.delist(id, socket.id));

  });

  setInterval(() =>{
    const data = {
      message: 'display',
      players: Object.values(game.players)
    };
    io.volatile.emit('control', data); // emit control at 5 frame per second
  }, 1000 / 5);

  setInterval(() => {
    game.refresh();
    const data = {
      message: 'Server update !',
      players: Object.values(game.players),
      factory: Object.values(game.factory),
      bonus: Object.values(game.bonus)
    };
    io.volatile.emit('update', data); // Refresh all data at 60 frame per second
  }, 1000 / 60);

  setInterval( ()=> {
    io.volatile.emit('leaderboard', game.leaderboard); // Refresh leaderboard every seconds
  },1000);
}

module.exports = io;
