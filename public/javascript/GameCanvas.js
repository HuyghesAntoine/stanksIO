class GameCanvas {
    constructor() {
        this.canvas = document.querySelector('#game-canvas');
        this.context = this.canvas.getContext('2d');
    }

    drawTank(tank) {
        const { x, y, size, color } = tank;
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }

<<<<<<< HEAD
    drawBullet(bullet) {
        const { x, y, size, color } = bullet;
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }

    redraw(data) {
        this.context.clearRect(0, 0, 800, 800);
        const { players } = data;
        players.forEach((tank) => this.drawTank(tank));
        players.forEach((player) => {
            for (let i = 0; i < player.gun.ammos.length; i++) {
                this.drawBullet(player.gun.ammos[i]);
            }
        });
        /*const {bullets} = data;
        bullets.forEach((bullet)=> this.drawBullet(bullet));*/
=======
    drawBullet(bullet){
        console.log(bullet);
        const{x, y, size, color} = bullet;
        this.context.beginPath();
        this.context.arc(x,y,size,0,2*Math.PI,false);
        this.context.fillStyle = "#AA0000";
        this.context.fill();
    }

    redraw(data){
        this.context.clearRect(0,0,800,800);
        const { players } = data; 
        players.forEach((tank)=> this.drawTank(tank));
        const {bullets} = data;
        bullets.forEach((bullet)=> this.drawBullet(bullet));
>>>>>>> c88f0f7a746536c20faa643e3b8aaccf2b6ca182
    }
}