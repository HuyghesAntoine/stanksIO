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
    this.players = new Array;
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

  refresh(){
    console.log(this.players);
    this.players.forEach( player => {
      console.log(player);
      player.gun.moveAll();
    });
  }
}

module.exports = Game;
