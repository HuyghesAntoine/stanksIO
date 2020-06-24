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
    this.mapSizeY = 700;
    this.nbJ = 1;
    this.totalPlayers = 0;
    this.name = name;
    this.players = {};
    this.factory = new Factory(this.mapSizeX, this.mapSizeY, '#63d07b');
    this.bonus = new Bonus(this.mapSizeX, this.mapSizeY, '#8b0000');
    this.leaderboard = new Leaderboard();
    // Array for tank colors.
    this.colors = ['#ff1d58', '#f75990', '#fff685', '#00ddff', '#0049b7', '#657a00', '#7d3cff', '#e1b382', '#9bc400', '#7c677f', '#ffde22', '#ff8928', '#6b7a8f', '#f7882f', '#a4893d', '#ff3a22', '#76c1d4', '#781a44', '#ff5a09', '#73a90e', '#46a9a4', '#8caae7', '#a28bdf', '#a54de7', '#ef07e1', '#b84568'];//'#000000', '#bada55', '#7fe5f0', '#ff0000', '#ff80ed', '#407294', '#420420', '#065535', '#ffa500', '#5ac18e', '#660066', '#990000', '#ffd700'];
  }

  register(id, socket, cls) {
    console.log("Création d'un tank : " + cls);
    //create the right class
    if (cls == "cls1")
      this.players[id] = new Masto(id, socket, this.getRandomColor(), this.mapSizeX, this.mapSizeY);
    else if (cls == "cls2")
      this.players[id] = new Hunter(id, socket, this.getRandomColor(), this.mapSizeX, this.mapSizeY);
    else if (cls == "cls3")
      this.players[id] = new Farmer(id, socket, this.getRandomColor(), this.mapSizeX, this.mapSizeY);
    else if (cls == "cls4")
      this.players[id] = new Sniper(id, socket, this.getRandomColor(), this.mapSizeX, this.mapSizeY);
    this.nbJ += 1;
    this.totalPlayers +=1;
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
      if (this.players[id].socketId == socket){
        delete this.players[id];
        this.totalPlayers-=1;
      }
    }
  }

  upgrade(id, value) {
    if (typeof (this.players[id]) != 'undefined') {
      this.players[id].upgrade(value);
    }
  }

  refresh() {
    //refresh the leaderboard
    this.leaderboard.refresh(this.players);
    //try to add xppoint or bonus
    this.factory.addEntity(30*this.totalPlayers);
    this.bonus.addEntity(this.totalPlayers);
    //move all the players, their shoots and remove useless shoots
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
        canon.removeAll();
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
