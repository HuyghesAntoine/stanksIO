class Leaderboard {
    constructor(){
        this.board = new Array();
    }
    refresh(players){
        this.board = [];
        Object.values(players).forEach((player) => {
            this.board.push(player);
        });
        this.board.sort(function(a,b){return b.score - a.score;});
    }
}

module.exports = Leaderboard;