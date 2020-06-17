'use strict'

/**
 * Import Tank class.
 */

const Tank = require('./Tank');
const Factory = require('./Factory');

/**
* Game class.
*/

class Game {
  constructor(name) {
    this.nbJ = 1;
    this.name = name;
    this.players = {};
    this.factory = new Factory(800);
  }

  register(id) {
    this.players[id] = new Tank(id);
    this.nbJ += 1;
  }

  move(id, direction) {
    this.players[id].move(direction);
  }

  shoot(id, direction){
    this.players[id].shoot(direction);    
  }

  changePseudo(id,pseudo){
    this.players[id].changePseudo(pseudo);
    console.log("argh")
  }

  delist(id) {
    delete this.players[id];
    console.log("delist");
  }

  refresh(){
    this.factory.addEntity();
    Object.values(this.players).forEach( player => {
      this.factory.touchAll(player);
      //console.log(player);
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
