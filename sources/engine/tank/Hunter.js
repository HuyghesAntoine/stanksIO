const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');

class Hunter extends Tank {
    constructor(id, socket, color, cls){
        console.log("Hunter");
        super(id, socket, color, cls);
        this.myUpgrade = ["ATTACK", "ATTACKSPEED", "SPEED", "BULLETSIZE"];
        this.pseudo = "noname";
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.score = 0;
        this.isMoving = false;
        this.maxHealth = 10;
        this.health = 10;
        this.size = 20;
        this.speed = 3;
        this.attack = 1;
        this.bulletSize = 6;
        this.bulletSpeed = 5;
        this.attackSpeed = 850;
    }
    
    upgrade(value) {
        if (this.level.xpPoint <= 0) return;
        if (value == 0) {
            this.attack += 1;
        } else if (value == 1) {
            this.attackSpeed -= 50;
        } else if (value == 2) {
            this.attackSpeed *= 0.8;
        } else if (value == 3) {
            this.bulletSize += 1;
        }
        this.size += 2;
        this.level.xpPoint--;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Hunter;