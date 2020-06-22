/**
 * Socket example.
 * Essentially for client socket communications.
 */

class ControlsSocket {
  constructor(cls) {
    this.socket = io();
    this.socket.emit('register', cls);
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
    this.me;
    data.players.forEach(player => {
      if (this.socket.id == player.socketId) {
        this.me = player;
        document.querySelector('#expValue').style.width = player.level.xp / player.level.xpNeeded * 100 + "%";
        document.querySelector('#lifeValue').style.width = (player.health / player.maxHealth) * 100 + "%";
        document.querySelector('#score').innerHTML = player.score;
        document.querySelector('#level').innerHTML = "Level : " + player.level.levelNumber;
        exist = true;
        this.leveling(player);
      }
    });
    if (exist == false) {
      var url = location.protocol + '//' + location.host + location.pathname + '?pseudo=' + this.me.pseudo;
      window.location.href = url;
    }
  }

  leveling(player) {
    if (player.level.xpPoint == 0) {
      document.getElementById("attackUpgrade").style.display = "none";
      document.getElementById("speedUpgrade").style.display = "none";
      document.getElementById("sizeUpgrade").style.display = "none";
      document.getElementById("attackSpeedUpgrade").style.display = "none";
    } else {
      this.displayUpgrade(player);
    }
  }

  displayUpgrade(player) {
    document.getElementById("attackUpgrade").style.display = "block";
    document.getElementById("speedUpgrade").style.display = "block";
    document.getElementById("sizeUpgrade").style.display = "block";
    document.getElementById("attackSpeedUpgrade").style.display = "block";

    var i = 0;
    document.querySelectorAll('.btnUpgr').forEach((upgrade)=>{
      upgrade.innerHTML = player.myUpgrade[i];
      i++;
    });
  }
}
