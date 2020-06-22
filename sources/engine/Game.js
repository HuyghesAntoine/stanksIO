'use strict'

/**
 * Import Tank class.
 */

const Tank = require('./Tank');
const Farmer = require('./tank/Farmer');
const Hunter = require('./tank/Hunter');
const Masto = require('./tank/Masto');
const Sniper = require('./tank/Sniper');
const Factory = require('./Factory');
const Bonus = require('./Bonus');
const Leaderboard = require('./Leaderboard');

/**
* Game class.
*/

class Game {
  // Constructor that take a name parameter
  constructor(name) {
    this.mapSizeX = 1200;
    this.mapSizeY = 800;
    this.nbJ = 1;
    this.name = name;
    this.players = {};
    this.factory = new Factory(this.mapSizeX, this.mapSizeY);
    this.bonus = new Bonus(this.mapSizeX, this.mapSizeY);
    this.leaderboard = new Leaderboard();
    // Array for tank colors.
    this.colors = ['#000000', '#bada55', '#7fe5f0', '#ff0000', '#ff80ed', '#407294', '#420420', '#065535', '#ffa500', '#5ac18e', '#660066', '#990000', '#ffd700'];
  }

  register(id, socket, cls) {
    console.log("Création d'un tank : " + cls);


    if (cls == "cls1")
      this.players[id] = new Masto(id, socket, this.getRandomColor(), this.mapSizeX, this.mapSizeY);
    else if (cls == "cls2")
      this.players[id] = new Hunter(id, socket, this.getRandomColor(), this.mapSizeX, this.mapSizeY);
    else if (cls == "cls3")
      this.players[id] = new Farmer(id, socket, this.getRandomColor(), this.mapSizeX, this.mapSizeY);
    else if (cls == "cls4")
      this.players[id] = new Sniper(id, socket, this.getRandomColor(), this.mapSizeX, this.mapSizeY);
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
      this.bonus.removeAll();
      this.factory.removeAll();
      this.factory.touchAll(player);
      this.bonus.touchAll(player);
      player.gun.forEach(canon => {
        canon.moveAll();
      });
      Object.values(this.players).forEach(tank => {
        if (tank != player) player.touchAll(tank);
      });
      if (player.Alive() == false) this.delist(player.id, player.socketId);
    });
  }

  getRandomColor() {
    return this.colors[Math.floor(getRandom(0, this.colors.length - 1))];
  }
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = Game;
