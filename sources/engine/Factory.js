const Entity = require('./Entity');
const Chrono = require('./Chrono');

class Factory {
    constructor(mapSize) {
        this.entities = new Array();
        this.mapSize = mapSize;
        this.delay = 2000;
        this.chrono = new Chrono();
        this.score = 100;
    }

    addEntity() {
        if (this.chrono.isOver(this.delay)) {
            this.entities.push(new Entity(5, getRandom(0, this.mapSize), getRandom(0, this.mapSize), 1, '#FFFF00', this.mapSize));
            this.chrono.reset();
        }
    }

    touchAll(tank) {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].touch(tank)) {
                tank.level.addXp(this.score);
                this.remove(i);
            }
            for (let j = 0; j < tank.gun.ammos.length; j++) {
                if (this.entities[i].touch(tank.gun.ammos[i])){
                    tank.level.addXp(this.score);
                    this.remove(i);
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

module.exports = Factory