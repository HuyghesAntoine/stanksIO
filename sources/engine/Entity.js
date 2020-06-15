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
        return this.life <= 0;
    }

    isOut(){
        return !(x > (this.size / 2) && x < (this.mapSize - (this.size / 2)) && y > (this.size / 2) && y < (this.mapSize - (this.size / 2)));
    }
}