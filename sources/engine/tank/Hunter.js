const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');

class Hunter extends Tank {
    constructor(id, socket, color, cls){
        super(id, socket, color, cls);
        this.myUpgrade = ["ATTACK", "ATTACKSPEED", "SPEED", "BULLETSIZE"];
        this.maxHealth = 10;
        this.health = 10;
        this.size = 20;
        this.speed = 3;
        this.attack = 1;
        this.bulletSize = 6;
        this.bulletSpeed = 5;
        this.attackSpeed = 850;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Hunter;