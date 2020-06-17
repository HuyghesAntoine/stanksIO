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
        let x = this.x - entity.x;
        let y = this.y - entity.y;
        let dist = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
        if (dist < (this.size + entity.size)){
            return true;
        }
        return false;
    }
}

module.exports = Entity;