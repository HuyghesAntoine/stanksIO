class GameSocket {
    constructor(canvas){
        this.canvas = canvas;
        this.socket = io();
        this.socket.on('update', (data) => this.canvas.redraw(data));
    }
}