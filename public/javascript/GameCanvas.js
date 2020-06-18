class GameCanvas {
    constructor() {
        this.canvas = document.querySelector('#game-canvas');
        this.context = this.canvas.getContext('2d');
        this.lead = document.querySelector('#lead-canvas');
        this.cxt = this.lead.getContext('2d');
    }


    drawCannon(tank) {
        const { x, y, size, look } = tank;
        this.context.beginPath();
        this.context.arc((x + Math.cos(look) * (size)), (y + Math.sin(look) * (size)), size / 2, 0, 2 * Math.PI, false);
        this.context.arc((x + Math.cos(look) * (size*1.2)), (y + Math.sin(look) * (size*1.2)), size / 2, 0, 2 * Math.PI, false);
        this.context.fillStyle = '#777777';
        this.context.fill();
    }

    drawTank(tank) {
        const { x, y, size, color } = tank;
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.textAlign = "center";
        this.context.fillText(tank.pseudo, x, y + (2 * size));
        this.cxt.fill();
        this.cxt.fillText(tank.pseudo, 10, 20*tank.id);
        this.cxt.fillText(tank.score, 180, 20*tank.id);
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
        this.cxt.clearRect(0, 0, 100, 100);
        const { players, factory, bonus } = data;
        factory[0].forEach((entity) => this.drawBullet(entity));
        bonus[0].forEach((entity) => this.drawBullet(entity));
        /*factory.entities.forEach((entity) => {
            console.log('ah');
            this.drawBullet(entity)});*/
        players.forEach((player) => {
            for (let i = 0; i < player.gun.ammos.length; i++) {
                this.drawBullet(player.gun.ammos[i]);
            }
        });
        players.forEach((tank) => {
            this.drawCannon(tank);
            this.drawTank(tank);
        });

        /*const {bullets} = data;
        bullets.forEach((bullet)=> this.drawBullet(bullet));*/
    }

    update(data) {
        this.redraw(data);
    }
}