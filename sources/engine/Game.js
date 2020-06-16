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

  move(id,direction) {
    this.players[id].move(direction);
  }

  shoot(id){
    this.players[id].shoot();    
  }

  changePseudo(id,pseudo){
    this.players[id].changePseudo(pseudo);
    console.log("argh")
  }

  delist(id) {
    delete this.players[id];
    this.nbJ--;
  }

  refresh(){
    this.players.forEach( player => {
      player.gun.moveAll();
    });
  }
}

module.exports = Game;
