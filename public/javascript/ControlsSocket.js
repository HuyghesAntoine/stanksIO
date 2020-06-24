/**
 * Socket example.
 * Essentially for client socket communications.
 */

class ControlsSocket {
  constructor(cls) {
    this.socket = io();
    this.socket.emit('register', cls); //send the register request
    this.socket.on('control', (data) => this.barexp(data)); //receive the refresh of data
  }

  // Emit stopMove signal to the server
  stopMove() {
    this.socket.emit('stopMove');
  }

  // Emit move signal to the server
  move(direction) {
    this.socket.emit('move', direction);
  }

  // Emit shoot signal to the server 
  shoot(direction) {
    this.socket.emit('shoot', direction);
  }

  // Emit psuedo signal to the server
  ChangePseudo(pseudo) {
    this.socket.emit('pseudo', pseudo);
  }

  // Emit upgrade signal to the server
  upgrade(value) {
    this.socket.emit('upgrade', value);
  }

  barexp(data) {
    var exist = false; 
    this.me;
    data.players.forEach(player => { //watch all the player
      if (this.socket.id == player.socketId) { //if this player is me
        this.me = player;
        //refresh all the data on controls.html
        document.querySelector('#expValue').style.width = player.level.xp / player.level.xpNeeded * 100 + "%";
        document.querySelector('#lifeValue').style.width = (player.health / player.maxHealth) * 100 + "%";
        document.querySelector('#score').innerHTML = player.score;
        document.querySelector('#level').innerHTML = "Level : " + player.level.levelNumber;
        exist = true; //i'm exist
        this.leveling(player); //manage the upgrade button
      }
    });
    if (exist == false) { //if i'm dead
      //refresh the page with my pseudo
      var url = location.protocol + '//' + location.host + location.pathname + '?pseudo=' + this.me.pseudo;
      window.location.href = url; 
    }
  }

  leveling(player) {
    if (player.level.xpPoint == 0) { //if i don't have any xpPoint
      //hide all the upgrade button
      document.getElementById("attackUpgrade").style.display = "none";
      document.getElementById("speedUpgrade").style.display = "none";
      document.getElementById("sizeUpgrade").style.display = "none";
      document.getElementById("attackSpeedUpgrade").style.display = "none";
    } else {
      //display the upgrades of my class
      var i = 0;
      document.querySelectorAll('.btnUpgr').forEach((upgrade)=>{
        upgrade.style.display = "block";
        upgrade.innerHTML = player.myUpgrade[i];
        i++;
      });
    }
  }
}
