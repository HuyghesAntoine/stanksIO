'use strict'

/**
 * Import Tank class.
 */

const Tank = require('./Tank');

/**
* Game class.
*/

class Game {
  constructor(name) {
    this.nbJ = 5;
    this.name = name;
    this.players = new Array;
  }

  register(id) {
    this.players[id] = new Tank(id);
    this.nbJ++;
  }

  move(id, direction) {
    this.players[id].move(direction);
  }

  shoot(id) {
    this.players[id].shoot();
  }

  delist(id) {
    delete this.players[id];
    this.nbJ--;
  }

  refresh() {
    console.log(this.players);
    this.players.forEach(player => {
      console.log(player);
      player.gun.moveAll();
    });
  }

  refresh() {
    console.log('refresh');
  }
}

module.exports = Game;
