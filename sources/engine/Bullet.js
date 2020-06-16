const Entity = require("./Entity");

class Bullet extends Entity{
    constructor(color, size, mapSize, x, y, attack, direction){
        super(color, size, mapSize, x, y, 1, speed, attack);
        this.direction = direction;
    }

    move(){
        this.x += (Math.cos(this.direction) * this.speed);
        this.y += (Math.sin(this.direction) * this.speed);
    }
}

module.exports = Bullet;