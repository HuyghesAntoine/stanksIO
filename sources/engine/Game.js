'use strict'

/**
 * Import Tank class.
 */

const Tank = require('./Tank');
const Factory = require('./Factory');
const Bonus = require('./Bonus');
const Leaderboard = require('./Leaderboard');

/**
* Game class.
*/

class Game {
  constructor(name) {
    this.nbJ = 1;
    this.name = name;
    this.players = {};
    this.factory = new Factory(800);
    this.bonus = new Bonus(800);
    this.leaderboard = new Leaderboard();
  }

  register(id, socket) {
    this.players[id] = new Tank(id, socket);
    this.nbJ += 1;
  }

  move(id, direction) {
    if (typeof (this.players[id]) != 'undefined') {
      this.players[id].direction = direction;
      this.players[id].isMoving = true;
    }
  }

  stopMove(id) {
    if (typeof (this.players[id]) != 'undefined')
      this.players[id].isMoving = false;
  }

  shoot(id, direction) {
    if (typeof (this.players[id]) != 'undefined')
      this.players[id].look = direction;
  }

  testPlayer() {
    Object.values(this.players).forEach(player => {
      //console.log(player);
    });
  }

  changePseudo(id, pseudo) {
    if (typeof (this.players[id]) != 'undefined')
      this.players[id].changePseudo(pseudo);
  }

  delist(id, socket) {
    if (typeof (this.players[id]) != 'undefined') {
      if (this.players[id].socketId == socket)
        delete this.players[id];
    }
  }

  upgrade(id, value) {
    if (typeof (this.players[id]) != 'undefined') {
      this.players[id].upgrade(value);
    }
  }

  refresh() {
    this.leaderboard.refresh(this.players);
    this.factory.addEntity();
    this.bonus.addEntity();
    Object.values(this.players).forEach(player => {
      if (player.isMoving == true) {
        player.move();
      }
      player.shoot();
      this.factory.touchAll(player);
      this.bonus.touchAll(player);
      //console.log(player);
      player.gun.moveAll();

      Object.values(this.players).forEach(tank => {
        if (tank != player)
          player.touchAll(tank);
      });

      if (player.Alive() == false)
        this.delist(player.id, player.socketId);
    });
  }
}

module.exports = Game;
