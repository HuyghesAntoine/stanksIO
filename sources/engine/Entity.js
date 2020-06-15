class Entity {
    constructor(size, x, y, color, mapSize) {
        this.health = 1;
        this.size = size;
        this.x = x;
        this.y = y;
        this.color = color;
        this.mapSize = mapSize;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    isDead(){
        return this.life <= 0;
    }

    isOut(){
        return !(this.x > (this.size / 2) && this.x < (this.mapSize - (this.size / 2)) && this.y > (this.size / 2) && this.y < (this.mapSize - (this.size / 2)));
    }
}

module.exports = Entity;