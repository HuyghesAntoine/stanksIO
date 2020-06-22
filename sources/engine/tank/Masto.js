const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');

class Masto extends Tank {
    constructor(id, socket, color){
        super(id, socket, color);
        this.myUpgrade = ["HEALTH UP", "SPEED UP", "ATTACK UP", "ATK SPEED UP"];
        this.maxHealth = 15;
        this.health = 15;
        this.size = 25;
        this.speed = 1.5;
        this.attack = 2;
        this.bulletSize = 9;
        this.bulletSpeed = 6;
        this.attackSpeed = 1500;
    }

    upgrade(value) {
        if (this.level.xpPoint <= 0) return;
        if (value == 0) {
            this.maxHealth += 0.2;
        } else if (value == 1) {
            this.speed += 0.3;
        } else if (value == 2) {
            this.attack *= 1.1;
        } else if (value == 3) {
            this.attackSpeed *= 0.9;
        }
        this.size += 2;
        this.level.xpPoint--;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Masto;