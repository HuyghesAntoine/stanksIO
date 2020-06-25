const Entity = require("./Entity");
// Bullet class 
class Bullet extends Entity{
    // Constructor for bullet, need a tank parameter.
    constructor(tank, gunDirection){
        // Apply properties of the bullet, in function of the given tank.
        let direction  = tank.look + gunDirection;
        super(tank.bulletSize, (tank.x + (Math.cos(direction) * (tank.size*1.2))), (tank.y + (Math.sin(direction) * (tank.size*1.2))), 1, tank.color, tank.mapSizeX, tank.mapSizeY);
        this.damage = tank.attack;
        this.direction = direction;
        this.maxSize = this.size;
        this.speed = tank.bulletSpeed;
    }

    // Function that allow the bullet to move in the map, with his own speed.
    move(){
        this.x += (Math.cos(this.direction) * this.speed);
        this.y += (Math.sin(this.direction) * this.speed);
        return false;
    }

    // Check if the bullet goes out of of the map borders.
    isOut(){
        if(this.x > this.mapSizeX || this.x < 0 || this.y > this.mapSizeY || this.y <0)
            return true;
        else
            return false;
    }
}

module.exports = Bullet;