const Entity = require('./Entity');
const Chrono = require('./Chrono');

// Factory class
class Factory {
    // Constructor that take mapSize parameter.
    constructor(mapSizeX, mapSizeY, color) {
        this.entities = new Array(); // Initialise a new array for bonus entities
        this.mapSizeX = mapSizeX; // Get map size 
        this.mapSizeY = mapSizeY;
        this.delay = 800; // Set delay to 800 ms 
        this.maxDelay = 20000; // Set max delay to 20000 ms 
        this.max = 100; // Set max factory entities to 100 units. 
        this.chrono = new Chrono(); // Initialise new chrono from Chrono.js 
        this.score = 100; // Set the score from a factory to 100 points. 
        this.xp = 15; // Set exp that occure a factory to 15 points
        this.color = color; // Set a color 
    }

    // Function that add a factory entity in an array?
    addEntity(max) {
        // 10 factory entites maximum in the map.
        this.max = max;
        if (this.entities.length > (this.max/2) && this.delay < this.maxDelay)
            this.delay += 100;
        else if (this.delay > 300)
            this.delay -= 100;
        if (this.chrono.isOver(this.delay) && this.entities.length < this.max) {
            // Add the entity in the array with given properties.
            this.entities.push(new Entity(5, getRandom(0, this.mapSizeX), getRandom(0, this.mapSizeY), 1, this.color, this.mapSizeX, this.mapSizeY));
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
                let rm = false;
                tank.gun.forEach(canon => {
                    if (rm == false) {
                        for (let j = 0; j < canon.ammos.length; j++) {
                            if (this.entities[i].touch(canon.ammos[j])) {
                                // If a bullet touch a factory dot, the add exp and score points and remove the factory.
                                this.entities[i].health -= 1;
                                if (this.entities[i].isDead()) {
                                    tank.level.addXp(this.xp);
                                    tank.score += this.score;
                                }
                                rm = true;
                                break;
                            }
                        }
                    }
                });
            }
        }
    }

    // Function that remove a factory entity from the array.
    remove(i) {
        this.entities.splice(i, 1);
    }

    removeAll() {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].isDead()) {
                this.remove(i);
            }
        }
    }

}

// Function that return a number between a given interval.
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Factory