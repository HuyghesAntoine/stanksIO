const Entity = require('./Entity');
const Chrono = require('./Chrono');

// Factory class
class Factory {
    // Constructor that take mapSize parameter.
    constructor(mapSize) {
        this.entities = new Array();
        this.mapSize = mapSize;
        this.delay = 2000;
        this.chrono = new Chrono();
        this.score = 100;
        this.xp = 10;
    }

    // Function that add a factory entity in an array?
    addEntity() {
        // 10 factory entites maximum in the map.
        if (this.chrono.isOver(this.delay) && this.entities.length <= 10) { 
            // Add the entity in the array with given properties.
            this.entities.push(new Entity(5, getRandom(0, this.mapSize), getRandom(0, this.mapSize), 1, '#1FE400', this.mapSize));
            // Reset the chrono for a new factory entity to spawn.
            this.chrono.reset();
        }
    }

    // Function that check if a tank or an ammo touch a factory 
    touchAll(tank) {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].touch(tank)) {
                // If the tank touch a factory dot, the add exp and score points and remove the factory.
                tank.level.addXp(this.xp);
                tank.score += this.score;
                this.remove(i);
            }
            else {
                for (let j = 0; j < tank.gun.ammos.length; j++) {
                    if (this.entities[i].touch(tank.gun.ammos[j])) {
                        // If a bullet touch a factory dot, the add exp and score points and remove the factory.
                        tank.level.addXp(this.xp);
                        tank.score += this.score;
                        this.remove(i);
                        break;
                    }
                }
            }
        }
    }

    // Function that remove a factory entity from the array.
    remove(i) {
        this.entities.splice(i, 1);
    }

}

// Function that return a number between a given interval.
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Factory