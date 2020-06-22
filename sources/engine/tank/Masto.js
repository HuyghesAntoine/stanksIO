const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');
const Evolution = require('../Evolution');

class Masto extends Tank {
    constructor(id, socket, color, mapSizeX, mapSizeY) {
        super(id, socket, color, mapSizeX, mapSizeY);
        this.myUpgrade = ["HEALTH", "SPEED", "ATTACK", "ATTACKSPEED"];
        this.maxHealth = 15;
        this.health = 15;
        this.size = 25;
        this.speed = 1.5;
        this.attack = 2;
        this.bulletSize = 9;
        this.bulletSpeed = 6;
        this.attackSpeed = 1500;
        this.evolution = new Evolution([Math.PI, Math.PI / 2, 3 * Math.PI / 2, Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4]);
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

module.exports = Masto;