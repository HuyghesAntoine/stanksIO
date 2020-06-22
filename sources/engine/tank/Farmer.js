const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');

class Farmer extends Tank {
    constructor(id, socket, color, cls){
        console.log("Farmer");
        super(id, socket, color, cls);
        this.myUpgrade = ["XP", "SPEED", "ATTACK", "FARMER"];
        this.pseudo = "noname";
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.level = new Level(2);
        this.score = 0;
        //this.chrono = new Chrono();
        this.isMoving = false;
        this.maxHealth = 2;
        this.size = 20;
        this.speed = 3;
        this.attack = 0.5;
        this.bulletSize = 5;
        this.bulletSpeed = 10;
        this.attackSpeed = 1500;

        /*this.gun = new Array();
        this.gun.push(new Gun(this.mapSize, 0));
        this.gun.push(new Gun(this.mapSize, Math.PI));*/
    }

    /*shoot() {
        if (this.chrono.isOver(this.attackSpeed)) {
            this.gun.forEach(canon => {
                canon.shoot(new Bullet(this,canon.direction));
            });
            //this.gun.shoot(new Bullet(this));
            this.chrono.reset();
        }
    }*/
    
    upgrade(value) {
        if (this.level.xpPoint <= 0) return;
        if (value == 0) {
            this.level.changeMult(this.level.mult*1.1);
        } else if (value == 1) {
            this.speed *= 1.5;
        } else if (value == 2) {
            this.attack *= 1.5;
        } else if (value == 3) {
            this.attackSpeed *= 0.8;
        }
        this.size += 2;
        this.level.xpPoint--;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Farmer;