class ControlsSocket{
    constructor(){
        this.socket = io();
        this.socket.emit('register');
    }

    move(){
        this.socket.emit('move');
    }
}