class GameCanvas {
    constructor() {
        this.canvas = document.querySelector('#game-canvas');
        this.context = this.canvas.getContext('2d');
        this.backGroundColor = '#eeeeee';
        this.otherColor = '#000000';
        this.lifeColor = '#00a86b';
        this.redColor = '#8b0000';
        this.xpColor = '#005b96';
        this.emptyXpColor = '#cccccc';
        this.mapSizeX = 1200;
        this.mapSizeY = 700;
    }

    drawLife(x, y, size, health, maxHealth, level) {
        let width = 2*size;
        let height = 7;
        let border = 2;
        let ratio = health / maxHealth;
        let ratioXp = level.xp / level.xpNeeded;
        let X = x - (width / 2);
        let Y = y + size + 20;

        this.context.fillStyle = this.otherColor;
        this.context.fillRect(X-border, Y-border, width+(2*border), height+(2*border));

        this.context.fillStyle = this.lifeColor;
        this.context.fillRect(X, Y, ratio * width, height * (2 / 3));
        this.context.fillStyle = this.redColor;
        this.context.fillRect(X + (ratio * width), Y, (1 - ratio) * width, height * (2 / 3));

        this.context.fillStyle = this.xpColor;
        this.context.fillRect(X, Y+(height*2/3), ratioXp * width, height * (1 / 3));
        this.context.fillStyle = this.emptyXpColor;
        this.context.fillRect(X + (ratioXp * width), Y+(height*2/3), (1-ratioXp) * width, height * (1 / 3));
    }

    drawCannon(tank, canonDirection) {
        const { x, y, size, look, bulletSize } = tank;
        this.context.beginPath();
        this.context.arc((x + Math.cos(look + canonDirection) * (size)), (y + Math.sin(look + canonDirection) * (size)), bulletSize+2, 0, 2 * Math.PI, false);
        this.context.arc((x + Math.cos(look + canonDirection) * (size * 1.2)), (y + Math.sin(look + canonDirection) * (size * 1.2)), bulletSize+2, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.otherColor;
        this.context.fill();
    }

    drawBorders(x, y, size) {
        this.context.beginPath();
        this.context.arc(x, y, size + 2, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.otherColor;
        this.context.fill();
    }

    drawTank(tank) {
        const { x, y, size, color, alpha, health, maxHealth, level } = tank;
        this.drawLife(x, y, size, health, maxHealth, level);
        tank.gun.forEach(canon => {
            for (let i = 0; i < canon.ammos.length; i++) {
                this.drawBullet(canon.ammos[i]);
            }
            this.drawCannon(tank, canon.direction);
        });
        this.drawBorders(x, y, size);
        //this.drawHealthBar(x,y,size);
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.font = "12px Arial";
        this.context.textAlign = "center";
        this.context.fillText(tank.pseudo, x, y - (tank.size + 20));
        if (level.xpPoint>0){
            this.context.font = "30px Arial";
            this.context.textAlign = "center";
            this.context.fillText('*', x, y - (tank.size + 30));
        }
    }

    drawBullet(bullet) {
        const { x, y, size, color } = bullet;
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }

    redraw(data) {
        this.context.clearRect(0, 0, this.mapSizeX, this.mapSizeY);
        this.context.fillStyle = this.backGroundColor;
        this.context.fillRect(0,0,this.mapSizeX, this.mapSizeY);
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