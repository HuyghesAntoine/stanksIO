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
    this.name = name;
    this.players = {};
  }

  register(id) {
    this.players[id] = new Tank(id);
  }

  move(id,direction) {
    this.players[id].move(direction);
  }
  shoot(id){
    this.players[id].shoot();    
  }

  delist(id) {
    delete this.players[id];
  }
}

module.exports = Game;
