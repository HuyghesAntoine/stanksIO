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

  barexp(data) {
    var exist = false;
    data.players.forEach(player => {
      if (this.socket.id == player.socketId) {
        document.querySelector('#expValue').style.width = player.level.xp + "%";
        document.querySelector('#lifeValue').style.width = (player.health / 3) * 100 + "%";
        document.querySelector('#score').innerHTML = player.score;
        exist = true;
      }
    });
    if(exist == false)
      window.location.reload();
  }
}
