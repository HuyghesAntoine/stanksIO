class GameSocket {
    constructor(canvas){
        this.canvas = canvas;
        this.socket = io();
        this.socket.on('update', (data) => this.canvas.update(data));
        this.socket.on('leaderboard', (leaderboard) => this.drawLeaderboard(leaderboard));
    }

    drawLeaderboard(leaderboard){
        let list = document.getElementById('leaderboard');
        list.innerHTML='<table> <thead><tr><th scope="col">Pseudo</th><th scope="col">Level</th><th scope="col">Score</th> </tr></thead>';
        leaderboard.board.forEach((player) => {
            list.innerHTML += ' <tbody> <tr> <td>' + player.pseudo + '</td> <td>' + player.level.levelNumber +'</td> <td>'+  player.score + '</td> </tr> </tbody>';
        });
        list.innerHTML += '</table>';
    }
}