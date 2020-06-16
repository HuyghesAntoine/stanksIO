const Entity = require("./Entity");

class Bullet extends Entity{
    constructor(tank){
        super(5, tank.x, tank.y, 1, tank.color, tank.mapSize);
        this.damage = tank.attack;
        this.direction = tank.direction;
    }

    move(){
        this.x += (Math.cos(this.direction) * this.speed);
        this.y += (Math.sin(this.direction) * this.speed);
    }
}

module.exports = Bullet;