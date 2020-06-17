const Entity = require("./Entity");

class Bullet extends Entity{
    constructor(tank){
        super(5, tank.x, tank.y, 1, tank.color, tank.mapSize);
        this.damage = tank.attack;
        this.direction = tank.look;
        this.speed = 1;
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

    /*touch(entity){
        if(this.x < entity.x+entity.size/2 && this.x > entity.x-entity.size/2 && this.y<entity.y+entity.size/2 && this.y > entity.y-entity.size/2){
            console.log("toucher");
            entity.health -= this.damage;
            return true;
        }
        return false;
    }*/
}

module.exports = Bullet;