const Entity = require('./Entity');
const Chrono = require('./Chrono');

class Factory {
    constructor(mapSize) {
        this.entities = new Array();
        this.mapSize = mapSize;
        this.delay = 5000;
        this.chrono = new Chrono();
        this.score = 100;
        this.xp = 10;
    }

    addEntity() {
        if (this.chrono.isOver(this.delay) && this.entities.length <= 50) {
            this.entities.push(new Entity(5, getRandom(0, this.mapSize), getRandom(0, this.mapSize), 1, '#FFFF00', this.mapSize));
            this.chrono.reset();
        }
    }

    touchAll(tank) {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i].touch(tank)) {
                tank.level.addXp(this.xp);
                tank.score += this.score;
                this.remove(i);
            }
            else{
                for (let j = 0; j < tank.gun.ammos.length; j++) {
                    if (this.entities[i].touch(tank.gun.ammos[j])) {
                        tank.level.addXp(this.xp);
                        tank.score += this.score;
                        this.remove(i);
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

module.exports = Factory