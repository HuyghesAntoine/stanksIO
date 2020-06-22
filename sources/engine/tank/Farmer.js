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
    
    upgrade(i){
        super.upgrade(i);
        if (this.level.levelNumber == 2){
            this.addCanon(Math.PI/4);
        }
        if (this.level.levelNumber == 3){
            this.addCanon(-Math.PI/4);
        }
        if (this.level.levelNumber == 4){
            this.addCanon(3*Math.PI/4);
            this.addCanon(5*Math.PI/4)
        }
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Farmer;