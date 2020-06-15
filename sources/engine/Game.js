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

  move(id) {
    this.players[id].move(direction);
  }

  delist(id) {
    delete this.players[id];
  }
}

module.exports = Game;
