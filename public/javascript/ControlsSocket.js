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

  upgrade(value){
    this.socket.emit('upgrade', value);
  }

  barexp(data) {
    var exist = false;
    data.players.forEach(player => {
      if (this.socket.id == player.socketId) {
        document.querySelector('#expValue').style.width = player.level.xp/player.level.xpNeeded*100 + "%";
        document.querySelector('#lifeValue').style.width = (player.health / 3) * 100 + "%";
        document.querySelector('#score').innerHTML = player.score;
        document.querySelector('#level').innerHTML = "Level : " + player.level.levelNumber;
        exist = true;
        this.leveling(player);
      }
    });
    if(exist == false)
      window.location.reload();
  }

  leveling(player){
    if(player.level.levelNumber == 1){
      /*document.getElementById("attackUpgrade").style.display = "none";
      document.getElementById("speedUpgrade").style.display = "none";
      document.getElementById("sizeUpgrade").style.display = "none";
      document.getElementById("attackSpeedUpgrade").style.display = "none";*/
    }else{
      document.getElementById("attackUpgrade").style.display = "block";
      document.getElementById("speedUpgrade").style.display = "block";
      document.getElementById("sizeUpgrade").style.display = "block";
      document.getElementById("attackSpeedUpgrade").style.display = "block";
    }
  }
}
