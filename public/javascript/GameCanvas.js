class GameCanvas {
    // We initialise every color that we use in the game.
    // We can easely change one of the color if we need to.
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

    // Draw life bar and exp bar under the player's tank. 
    // Green bar for actual life points, red for the life that we lose.
    // Blue bar for the actual experience points.
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

    // Draw canon on a tank, in a specific direction (based on trigonometry)
    drawCannon(tank, canonDirection) {
        const { x, y, size, look, bulletSize } = tank;
        this.context.beginPath();
        this.context.arc((x + Math.cos(look + canonDirection) * (size)), (y + Math.sin(look + canonDirection) * (size)), bulletSize+2, 0, 2 * Math.PI, false);
        this.context.arc((x + Math.cos(look + canonDirection) * (size * 1.2)), (y + Math.sin(look + canonDirection) * (size * 1.2)), bulletSize+2, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.otherColor;
        this.context.fill();
    }

    // Draw black borders around the tank for better visibilty.
    drawBorders(x, y, size) {
        this.context.beginPath();
        this.context.arc(x, y, size + 2, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.otherColor;
        this.context.fill();
    }

    // Draw a tank on position.
    // We use other draw function because every thing is part of a tank.
    drawTank(tank) {
        const { x, y, size, color, health, maxHealth, level } = tank;
        // Draw the life and exp bar.
        this.drawLife(x, y, size, health, maxHealth, level);
        // Draw canon and bullet of the tank.
        tank.gun.forEach(canon => {
            for (let i = 0; i < canon.ammos.length; i++) {
                this.drawBullet(canon.ammos[i]);
            }
            this.drawCannon(tank, canon.direction);
        });
        // Draw borders of the tank.
        this.drawBorders(x, y, size);
        this.context.beginPath();
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.font = "12px Arial";
        this.context.textAlign = "center";
        // Write the pseudo of the player above the tank.
        this.context.fillText(tank.pseudo, x, y - (tank.size + 20));
        if (level.xpPoint>0){
            this.context.font = "30px Arial";
            this.context.textAlign = "center";
            // Draw a "*" when the player can upgrade his tank.
            this.context.fillText('*', x, y - (tank.size + 30));
        }
    }

    // Draw bullet (dots) for exp dots and bullets from the gun.
    drawBullet(bullet) {
        const { x, y, size, color } = bullet;
        this.context.beginPath();
        this.context.strokeStyle = "#000000";
        this.context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }

    // Draw little hearths for the bonus. This fonction come from the "drawing in canvas" tutorial.
    drawHearth(bullet){
        const { x, y, size, color } = bullet;
        this.context.beginPath();
        this.context.fillStyle = color;
        var prop = 8;
        this.context.moveTo(x,y);
        this.context.bezierCurveTo(x, y-3/prop, x-5/prop, y-15/prop, x-20/prop, y-15/prop);
        this.context.bezierCurveTo(x-55/prop, y-15/prop, x-55/prop, y+22.5/prop, x-55/prop, y+22.5/prop);
        this.context.bezierCurveTo(x-55/prop, y+40/prop, x-35/prop, y+62/prop, x, y+80/prop);
        this.context.bezierCurveTo(x+35/prop, y+62/prop, x+55/prop, y+40/prop, x+55/prop, y+22.5/prop);
        this.context.bezierCurveTo(x+55/prop, y+22.5/prop, x+55/prop, y-15/prop, x+25/prop, y-15/prop);
        this.context.bezierCurveTo(x+10/prop, y-15/prop, x, y-3/prop, x, y);
        this.context.fill();
    }

    // Use everys draw function from above to redraw everything at their positions. 
    redraw(data) {
        this.context.clearRect(0, 0, this.mapSizeX, this.mapSizeY);
        this.context.fillStyle = this.backGroundColor;
        this.context.fillRect(0,0,this.mapSizeX, this.mapSizeY);
        const { players, factory, bonus } = data;
        bonus[0].forEach((entity) => this.drawHearth(entity));
        factory[0].forEach((entity) => this.drawBullet(entity));
        players.forEach((player) => {
            this.drawTank(player);
        });
    }

    // Calling redraw
    update(data) {
        this.redraw(data);
    }
}