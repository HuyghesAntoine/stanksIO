class Entity {
    constructor(size, x, y, health, color, mapSize) {
        this.health = health;
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
        return this.health <= 0;
    }

    isOut(){
        return !(this.x > (this.size / 2) && this.x < (this.mapSize - (this.size / 2)) && this.y > (this.size / 2) && this.y < (this.mapSize - (this.size / 2)));
    }

    touch(entity) {
        if (this.x + (this.size / 2) > entity.x - (entity.size / 2) &&
            this.x - (this.size / 2) < entity.x + (entity.size / 2) &&
            this.y + (this.size / 2) > entity.y - (entity.size / 2) &&
            this.y - (this.size / 2) < entity.y + (entity.size / 2)) {
            return true;
        }
        return false;
    }
}

module.exports = Entity;