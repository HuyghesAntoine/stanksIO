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
      this.socket.emit('move',direction);
    }
    shoot(direction){
      this.socket.emit('shoot', direction);
    }
    ChangePseudo(pseudo){
      this.socket.emit('pseudo',pseudo);
    }
    barexp(data){
      console.log("xp " + data.player[0].level.xp);
      console.log("score " + data.player[0].score);
      document.querySelector('#expValue').style.width = data.player[0].level.xp + "%";
      document.querySelector('#lifeValue').style.width = (data.player[0].health/3)*100 + "%";
      document.querySelector('#score').innerHTML = data.player[0].score;
    }
  }
  