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
    this.nbJ = 1;
    this.name = name;
    this.players = {};
  }

  register(id) {
    this.players[id] = new Tank(id);
    this.nbJ += 1;
  }

  move(id, direction) {
    this.players[id].move(direction);
  }

  shoot(id) {
    this.players[id].shoot();
  }

  delist(id) {
    delete this.players[id];
    console.log("delist");
  }

  refresh(){
    Object.values(this.players).forEach( player => {
      console.log(player);
      player.gun.moveAll();
      if(player.Alive() == false)
        this.delist(player.id);
      Object.values(this.players).forEach( tank => {
        if(tank != player)
          player.gun.touchAll(tank);
      });
    });
  }
}

module.exports = Game;
