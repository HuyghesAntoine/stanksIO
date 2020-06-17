/**
 * Socket example.
 * Essentially for client socket communications.
 */

class ControlsSocket {
    constructor() {
      this.socket = io();
      this.socket.emit('register');
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
  }
  