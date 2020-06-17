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
    data.players.forEach(player => {
      if (this.socket.id == player.socketId) {
        document.querySelector('#expValue').style.width = player.level.xp + "%";
        document.querySelector('#lifeValue').style.width = (player.health / 3) * 100 + "%";
        document.querySelector('#score').innerHTML = player.score;
      }

    });
  }
}
