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

    socket.on('register', (cls) => game.register(id, socket.id, cls));//receive register from a client and use the function register on him

    socket.on('move', (direction) => game.move(id, direction));//receive move from a client and use the function move on him with the direction of the player

    socket.on('stopMove', () => game.stopMove(id) );//receive stopMove from a client and use the function stopMove 

    socket.on('shoot', (direction) => game.shoot(id, direction));//receive shoot from a client and use the function shoot with the direction of the gun

    socket.on('upgrade', (value) => game.upgrade(id, value));//receive upgrade from a client and use the function upgrade on him wit hthe value of the upgrade

    socket.on('pseudo', (pseudo) => game.changePseudo(id,pseudo));//receive pseudo from a client and use the function chengePseudo with the pseudo chose by the player

    socket.on('disconnect', () => game.delist(id, socket.id));//receive disconnect from a client and use the function disconnect on him

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
