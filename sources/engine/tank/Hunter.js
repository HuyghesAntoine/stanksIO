const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');
const Evolution = require('../Evolution');

class Hunter extends Tank {
    constructor(id, socket, color, mapSizeX, mapSizeY) {
        super(id, socket, color, mapSizeX, mapSizeY);
        this.myUpgrade = ["ATTACK", "ATTACKSPEED", "SPEED", "BULLETSIZE"];
        this.maxHealth = 10;
        this.health = 10;
        this.size = 20;
        this.speed = 3;
        this.attack = 1;
        this.bulletSize = 6;
        this.bulletSpeed = 5;
        this.attackSpeed = 850;
        this.evolution = new Evolution([Math.PI / 6, Math.PI / 2, -Math.PI / 2, -Math.PI / 6]);

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

module.exports = Hunter;