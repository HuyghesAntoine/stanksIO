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
    this.nbJ = 0;
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

  delist(id) {
    //delete this.players[id];
  }

  refresh(){
    this.players.forEach( player => {
      console.log(player);
      player.gun.moveAll();
      /*if(!player.Alive())
        Game.delist();*/
      this.players.forEach( tank => {
        if(tank != player)
          player.gun.touchAll(tank);
      });
    });
  }
}

module.exports = Game;
