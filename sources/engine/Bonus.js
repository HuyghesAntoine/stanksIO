const Entity = require('./Entity');
const Chrono = require('./Chrono');

class Bonus {
    constructor(mapSize) {
        this.entities = new Array();
        this.mapSize = mapSize;
        this.delay = 10000;
        this.chrono = new Chrono();
    }

    addEntity() {
        if (this.chrono.isOver(this.delay) && this.entities.length <= 5) {
            this.entities.push(new Entity(10, getRandom(0, this.mapSize), getRandom(0, this.mapSize), 1, '#E40000', this.mapSize));
            this.chrono.reset();
            this.delay = getRandom(10000,30000);
        }
    }

    touchAll(tank) {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].touch(tank)) {
                tank.heal();
                this.remove(i);
            }
            else{
                for (let j = 0; j < tank.gun.ammos.length; j++) {
                    if (this.entities[i].touch(tank.gun.ammos[j])) {
                        tank.heal();
                        this.remove(i);
                        break;
                    }
                }
            }
        }
    }

    remove(i) {
        this.entities.splice(i, 1);
    }

}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Bonus