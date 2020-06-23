const Entity = require('./Entity');
const Chrono = require('./Chrono');
// Bonus class 
class Bonus {
    // Constructor that take mapSize parameter.
    constructor(mapSizeX, mapSizeY) {
        this.entities = new Array();
        this.mapSizeX = mapSizeX;
        this.mapSizeY = mapSizeY;
        this.delay = 10000;
        this.chrono = new Chrono();
    }
    // Add a bonus in the entities array when the chrono is over.
    addEntity() {
        // 5 bonus maximum on the map.
        if (this.chrono.isOver(this.delay) && this.entities.length <= 5) {
            // Add a new Entity in the array, with this properties. 
            this.entities.push(new Entity(10, getRandom(0, this.mapSizeX), getRandom(0, this.mapSizeY), 1, '#E40000', this.mapSizeX, this.mapSizeY));
            // Reset the chrono and get a random number for the delay.
            this.chrono.reset();
            this.delay = getRandom(5000, 10000);
        }
    }

    // Function that check if the tank or an ammo touch a bonus.
    touchAll(tank) {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].touch(tank)) {
                // If a bonus is touched by a tank, then apply heal on this tank, and remove the bonus from the array.
                tank.heal();
                this.entities[i].health -= 1;
            }
            else {
                let rm = false;
                tank.gun.forEach(canon => {
                    if (rm == false) {
                        for (let j = 0; j < canon.ammos.length; j++) {
                            if (this.entities[i].touch(canon.ammos[j])) {
                                // If a bonus is touched by a bullet, then apply heal on the tank and remove the bonus from the array.
                                tank.heal();
                                this.entities[i].health -= 1;
                                rm = true;
                                break;
                            }
                        }
                    }
                });
            }
        }
    }

    removeAll() {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].isDead()) {
                this.remove(i);
            }
        }
    }
    // Function that remove the bonus from the array.
    remove(i) {
        this.entities.splice(i, 1);
    }

}
// Function that return a random number in a given interval.
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Bonus