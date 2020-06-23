class GameCanvas {
    constructor() {
        this.canvas = document.querySelector('#game-canvas');
        this.context = this.canvas.getContext('2d');
    }

    drawLife(tank) {
        const { x, y, size, color, health, maxHealth } = tank;

    }

    drawCannon(tank, canonDirection) {
        const { x, y, size, look, alpha } = tank;
        this.context.beginPath();
        this.context.arc((x + Math.cos(look + canonDirection) * (size)), (y + Math.sin(look + canonDirection) * (size)), (size / 2), 0, 2 * Math.PI, false);
        this.context.arc((x + Math.cos(look + canonDirection) * (size * 1.2)), (y + Math.sin(look + canonDirection) * (size * 1.2)), (size / 2), 0, 2 * Math.PI, false);
        
        if (typeof(tank.alpha) != "undefined")
            this.context.fillStyle = 'rgba(0,0,0,'+alpha+')';
        else
            this.context.fillStyle = 'rgba(0,0,0,1)';
        this.context.fill();
    }

    drawBorders(x,y,size){
        this.context.beginPath();
        this.context.arc(x, y, size+2, 0, 2 * Math.PI, false);
        this.context.fillStyle = '#000000';
        this.context.fill();
    }

   /* drawHealthBar(x,y,size){
        this.beginPath();
        this.context.fillRect(x,y, size, size/2);
        this.context.fillStyle = '#123123';
        this.context.fill();
    } */

    drawTank(tank) {
        const { x, y, size, color, alpha } = tank;
        tank.gun.forEach(canon => {
            for (let i = 0; i < canon.ammos.length; i++) {
                this.drawBullet(canon.ammos[i]);
            }
            this.drawCannon(tank, canon.direction);
        });
        this.drawBorders(x,y,size);
        //this.drawHealthBar(x,y,size);
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        console.log(alpha);
        if (typeof(tank.alpha) != "undefined")
            this.context.fillStyle = "rgba("+ color.slice(1,3) +',' + color.slice(3,5) +','+ color.slice(5,7) +','+ alpha+")";
        else
            this.context.fillStyle = color;
        this.context.fill();
        this.context.textAlign = "center";
        this.context.fillText(tank.pseudo, x, y - (2 * size - 5));
    }

    drawBullet(bullet) {
        const { x, y, size, color } = bullet;
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }

    redraw(data) {
        this.context.clearRect(0, 0, 1200, 750);
        const { players, factory, bonus } = data;
        factory[0].forEach((entity) => this.drawBullet(entity));
        bonus[0].forEach((entity) => this.drawBullet(entity));
        players.forEach((player) => {
            /*player.gun.forEach(canon => {
                for (let i = 0; i < canon.ammos.length; i++) {
                    this.drawBullet(canon.ammos[i]);
                }
                this.drawCannon(player, canon.direction);
            });*/
            this.drawTank(player);
        });
    }

    update(data) {
        this.redraw(data);
    }
}