const Entity = require("./Entity");

class Bullet extends Entity{
    constructor(tank){
        super(5, tank.x, tank.y, 1, tank.color, tank.mapSize);
        this.damage = tank.attack;
        this.direction = tank.look;
        this.speed = 2*tank.speed;
    }

    move(){
        this.x += (Math.cos(this.direction) * this.speed);
        this.y += (Math.sin(this.direction) * this.speed);
        return false;
    }

    isOut(){
        if(this.x > this.mapSize || this.x < 0 || this.y > this.mapSize || this.y <0)
            return true;
        else
            return false;
    }
}

module.exports = Bullet;