const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');

class Sniper extends Tank {
    constructor(id, socket, color){
        super(id, socket, color);
        this.myUpgrade = ["ATTACK", "BULLETSPEED", "BULLETSIZE", "ALPHA"];
        this.health = 10;
        this.maxHealth = 10;
        this.size = 15;
        this.speed = 3;
        this.attack = 3;
        this.bulletSize = 10;
        this.bulletSpeed = 10;
        this.attackSpeed = 2500;
        this.alpha = 1;
    }
    upgrade(i){
        super.upgrade(i);
        if (this.level.levelNumber == 5){
            this.addCanon(Math.PI);
        }
        if (this.level.levelNumber == 10){
            this.addCanon(Math.PI/6);
        }
        if (this.level.levelNumber == 20){
            this.addCanon(7*Math.PI/6);
        }
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Sniper;
