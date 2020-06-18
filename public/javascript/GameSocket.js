class GameSocket {
    constructor(canvas){
        this.canvas = canvas;
        this.socket = io();
        this.socket.on('update', (data) => this.canvas.update(data));
        this.socket.on('leaderboard', (leaderboard) => this.drawLeaderboard(leaderboard));
    }

    drawLeaderboard(leaderboard){
        let list = document.getElementById('leaderboard');
        list.innerHTML='<ul>';
        leaderboard.board.forEach((player) => {
            list.innerHTML += '<li>'+ player.pseudo + ' : ' + player.score + '</li>';
        });
        list.innerHTML += '</ul>';
    }
}