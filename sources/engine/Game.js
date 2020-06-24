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
    //size of canvas
    this.mapSizeX = 1200;
    this.mapSizeY = 700;
    this.nbJ = 1; //id of a new player
    this.name = name; //name of game
    this.players = {}; //list of player
    this.factory = new Factory(this.mapSizeX, this.mapSizeY, '#63d07b'); //factory for create xp
    this.bonus = new Bonus(this.mapSizeX, this.mapSizeY, '#8b0000'); //bonus for create heart
    this.leaderboard = new Leaderboard(); //leaderboard of players 
    // Array for tank colors.
    this.colors = ['#ff1d58', '#f75990', '#00ddff', '#0049b7', '#657a00', '#7d3cff', '#e1b382', '#9bc400', '#7c677f', '#ffde22', '#ff8928', '#6b7a8f', '#f7882f', '#a4893d', '#ff3a22', '#76c1d4', '#781a44', '#ff5a09', '#73a90e', '#46a9a4', '#8caae7', '#a28bdf', '#a54de7', '#ef07e1', '#b84568'];//'#000000', '#bada55', '#7fe5f0', '#ff0000', '#ff80ed', '#407294', '#420420', '#065535', '#ffa500', '#5ac18e', '#660066', '#990000', '#ffd700'];
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
    this.nbJ += 1; //add 1 to nbJ for the next player
  }

  move(id, direction) {
    if (typeof (this.players[id]) != 'undefined') { //check if player exist
      this.players[id].direction = direction; //updates the direction of movement
      this.players[id].isMoving = true; //move
    }
  }

  stopMove(id) {
    if (typeof (this.players[id]) != 'undefined')//check if player exist
      this.players[id].isMoving = false; //stop moving
  }

  shoot(id, direction) {
    if (typeof (this.players[id]) != 'undefined')//check if player exist
      this.players[id].look = direction; //change the direction of cannon
  }

  changePseudo(id, pseudo) {
    if (typeof (this.players[id]) != 'undefined') //check if player exist
      this.players[id].changePseudo(pseudo);
  }

  delist(id, socket) {
    if (typeof (this.players[id]) != 'undefined') {//check if player exist
      if (this.players[id].socketId == socket) { //check if request is send by the right player
        delete this.players[id]; //delete it
      }
    }
  }

  upgrade(id, value) {
    if (typeof (this.players[id]) != 'undefined') {//check if player exist
      this.players[id].upgrade(value);
    }
  }

  refresh() {
    //refresh the leaderboard
    this.leaderboard.refresh(this.players);
    //try to add xpPoint or bonus
    this.factory.addEntity(30 * Object.keys(this.players).length);
    this.bonus.addEntity(Math.ceil((Object.keys(this.players).length+1)/2));
    //move all the players, their shoots and remove useless shoots
    this.checkPlayers();
  }

  checkPlayers(){
    //for each players
    Object.values(this.players).forEach(player => {
      player.isInvicible(); //check if player is invicible
      if (player.isMoving == true) { //if player moving 
        player.move(); //move
      }
      player.shoot();
      this.bonus.removeAll(); //remove bonus
      this.factory.removeAll(); //remove factory
      this.factory.touchAll(player); //check if player touch a factory
      this.bonus.touchAll(player); //check if player touch a bonus
      player.gun.forEach(canon => { //for each canons of player
        canon.removeAll(); //remove all the bullets
        canon.moveAll(); //move all the billets
      });
      Object.values(this.players).forEach(tank => { //for each players
        if (tank != player) player.touchAll(tank); //check all the bullet of player if touch tank
      });
      if (player.Alive() == false) this.delist(player.id, player.socketId); //if players is dead, remove it
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
