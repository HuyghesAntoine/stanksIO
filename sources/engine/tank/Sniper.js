const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');

class Sniper extends Tank {
    constructor(id, socket, color, cls){
        console.log("Snipers");
        super(id, socket, color, cls);
        this.myUpgrade = ["DAMAGE", "BULLET SPEED", "BULLET SIZE", "CAMO"];
        this.pseudo = "noname";
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.level = new Level();
        this.score = 0;
        //this.chrono = new Chrono();
        this.isMoving = false;
        this.health = 10;
        this.maxHealth = 10;
        this.size = 15;
        this.speed = 5;
        this.attack = 2;
        this.bulletSize = 10;
        this.bulletSpeed = 10;
        this.attackSpeed = 3000;
        this.alpha = 1;
    }
    
    upgrade(value) {
        if (this.level.xpPoint <= 0) return;
        if (value == 0) {
            this.attack += 1;
        } else if (value == 1) {
            this.bulletSpeed += 5;
        } else if (value == 2) {
            this.bulletSize += 4;
        } else if (value == 3) {
            this.alpha -= 0.2;
        }
        this.size += 2;
        this.level.xpPoint--;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Sniper;