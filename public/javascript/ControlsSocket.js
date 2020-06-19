/**
 * Socket example.
 * Essentially for client socket communications.
 */

class ControlsSocket {
  constructor() {
    this.socket = io();
    this.socket.emit('register');
    this.socket.on('control', (data) => this.barexp(data));
  }

  stopMove() {
    this.socket.emit('stopMove');
  }

  move(direction) {
    this.socket.emit('move', direction);
  }
  shoot(direction) {
    this.socket.emit('shoot', direction);
  }
  ChangePseudo(pseudo) {
    this.socket.emit('pseudo', pseudo);
  }

  upgrade(value) {
    this.socket.emit('upgrade', value);
  }

  barexp(data) {
    var exist = false;
    data.players.forEach(player => {
      if (this.socket.id == player.socketId) {
        document.querySelector('#expValue').style.width = player.level.xp / player.level.xpNeeded * 100 + "%";
        document.querySelector('#lifeValue').style.width = (player.health / player.healthMax) * 100 + "%";
        document.querySelector('#score').innerHTML = player.score;
        document.querySelector('#level').innerHTML = "Level : " + player.level.levelNumber;
        exist = true;
        this.leveling(player);
      }
    });
    if (exist == false)
      window.location.reload();
  }

  leveling(player) {
    if (player.bulletSize >= 15)
      document.getElementById("sizeUpgrade").disabled = true;
    if (player.attackSpeed <= 500)
      document.getElementById("attackSpeedUpgrade").disabled = true;
    if (player.speed >= 10)
      document.getElementById("speedUpgrade").disabled = true;
    if (player.attack >= 3)
      document.getElementById("attackUpgrade").disabled = true;
    if (player.level.xpPoint == 0) {
      if (document.getElementById("attackUpgrade").disabled == false)
        document.getElementById("attackUpgrade").style.display = "none";
      if (document.getElementById("speedUpgrade").disabled == false)
        document.getElementById("speedUpgrade").style.display = "none";
      if (document.getElementById("sizeUpgrade").disabled == false)
        document.getElementById("sizeUpgrade").style.display = "none";
      if (document.getElementById("attackSpeedUpgrade").disabled == false)
        document.getElementById("attackSpeedUpgrade").style.display = "none";
    } else {
      document.getElementById("attackUpgrade").style.display = "block";
      document.getElementById("speedUpgrade").style.display = "block";
      document.getElementById("sizeUpgrade").style.display = "block";
      document.getElementById("attackSpeedUpgrade").style.display = "block";
    }
  }
}
