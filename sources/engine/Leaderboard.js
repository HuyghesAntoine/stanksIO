class Leaderboard {
    constructor(){
        this.board = new Array(); // the leaderboard is an array of tanks
    }

    // take the players list and set the leaderboard sorted by player score decreasing
    refresh(players){
        this.board = [];
        Object.values(players).forEach((player) => {
            this.board.push(player);
        });
        this.board.sort(function(a,b){return b.score - a.score;});
    }
}

module.exports = Leaderboard;