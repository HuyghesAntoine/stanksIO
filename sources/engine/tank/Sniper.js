const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');
const Evolution = require('../Evolution');

class Sniper extends Tank {
    constructor(id, socket, color, mapSizeX, mapSizeY) {
        super(id, socket, color, mapSizeX, mapSizeY);
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
        this.evolution = new Evolution([Math.PI, Math.PI / 6, 7 * Math.PI / 6]);
    }
    upgrade(i) {
        super.upgrade(i);
        let evolutions = this.evolution.evolute(this.level.levelNumber);
        for (let i = 0; i < evolutions.length; i++) {
            this.addCanon(evolutions[i]);
        }
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Sniper;
