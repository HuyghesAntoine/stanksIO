class GameSocket {
    constructor(canvas){
        this.canvas = canvas;
        this.socket = io();
        this.socket.on('update', (data) => this.canvas.update(data)); //receive the new Data and send it to GameCanvas.js
        this.socket.on('leaderboard', (leaderboard) => this.drawLeaderboard(leaderboard)); //receive the data of leaderboard
    }

    drawLeaderboard(leaderboard){
        //display and refresh the leaderboard. Using <table> tag.
        let list = document.getElementById('leaderboard');
        list.innerHTML=' <thead><tr><th scope="col">Pseudo</th><th scope="col">Level</th><th scope="col">Score</th> </tr></thead>';
        leaderboard.board.forEach((player) => {
            list.innerHTML += ' <tbody id="tt"> <tr> <td>' + player.pseudo + '</td> <td>' + player.level.levelNumber +'</td> <td>'+  player.score + '</td> </tr> </tbody>';
        });
        list.innerHTML += '';
    }
}