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
    upgrade(i){
        super.upgrade(i);
        if (this.level.levelNumber == 5){
            this.addCanon(Math.PI/2);
        }
        if (this.level.levelNumber == 10){
            this.addCanon(-Math.PI/2);
        }
        if (this.level.levelNumber == 20){
            this.addCanon(Math.PI);
        }
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Masto;