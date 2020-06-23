const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');
const Evolution = require('../Evolution');
// Farmer class with his own stats and upgrades
class Farmer extends Tank {
    constructor(id, socket, color, mapSizeX, mapSizeY) {
        super(id, socket, color, mapSizeX, mapSizeY);
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
        this.evolution = new Evolution([Math.PI / 4, -Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4]);
    }
    upgrade(i) {
        super.upgrade(i);
        let evolutions = this.evolution.evolute(this.level.levelNumber);
        for (let i = 0; i < evolutions.length; i++) {
            this.addCanon(evolutions[i]); // Evolve the tank and pick a canon to add in the array. ( same for hunter, masto and sniper)
        }
    }
}
module.exports = Farmer;