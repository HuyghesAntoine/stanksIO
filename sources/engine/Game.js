'use strict'

/**
 * Import Tank class.
 */

const Tank = require('./Tank');
const Factory = require('./Factory');
const Bonus = require('./Bonus.js');

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
  }

  register(id, socket) {
    this.players[id] = new Tank(id, socket);
    this.nbJ += 1;
  }

  move(id, direction) {
    this.players[id].direction = direction;
    this.players[id].isMoving = true;
  }

  stopMove(id) {
    this.players[id].isMoving = false;
  }

  shoot(id, direction) {
    this.players[id].shoot(direction);
  }

  testPlayer(){
    Object.values(this.players).forEach(player => {
      console.log(player);
    });
  }

  changePseudo(id, pseudo) {
    this.players[id].changePseudo(pseudo);
    console.log("argh")
  }

  delist(id) {
    delete this.players[id];
    console.log("delist");
  }

  refresh() {
    this.factory.addEntity();
    Object.values(this.players).forEach(player => {
      if (player.isMoving == true) {
        player.move();
      }
      this.factory.touchAll(player);
      this.bonus.touchAll(player);
      //console.log(player);
      player.gun.moveAll();
      if (player.Alive() == false)
        this.delist(player.id);
      Object.values(this.players).forEach(tank => {
        if (tank != player)
          player.gun.touchAll(tank);
      });
    });
  }
}

module.exports = Game;
