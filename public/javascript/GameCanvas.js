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
    }

    update(data){
        this.redraw(data);
    }
}