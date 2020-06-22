const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');

class Farmer extends Tank {
    constructor(id, socket, color, cls){
        super(id, socket, color, cls);
        this.myUpgrade = ["XP", "SPEED", "ATTACK", "ATTACKSPEED"];
        this.level = new Level(2);
        this.maxHealth = 10;
        this.health = 10;
        this.size = 20;
        this.speed = 2;
        this.attack = 1;
        this.bulletSize = 7;
        this.bulletSpeed = 6;
        this.attackSpeed = 1000;
    }
    
    upgrade(value) {
        if (this.level.xpPoint <= 0) return;
        if (value == 0) {
            this.level.changeMult(this.level.mult*1.1);
        } else if (value == 1) {
            this.speed += 0.3;
        } else if (value == 2) {
            this.attack *= 1.1;
        } else if (value == 3) {
            this.attackSpeed *= 0.8;
        }
        this.size += 2;
        this.level.xpPoint--;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Farmer;