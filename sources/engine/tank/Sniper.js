const Chrono = require('../Entity');
const Tank = require('../Tank');
const Level = require('../Level');

class Sniper extends Tank {
    constructor(id, socket, color, cls){
        console.log("Snipers");
        super(id, socket, color, cls);
        this.myUpgrade = ["XP", "SPEED", "ATTACK", "SNIPER"];
        this.pseudo = "noname";
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.level = new Level();
        this.score = 0;
        //this.chrono = new Chrono();
        this.isMoving = false;
        this.maxHealth = 3;
        this.size = 15;
        this.speed = 5;
        this.attack = 2;
        this.bulletSize = 17;
        this.bulletSpeed = 40;
        this.attackSpeed = 3000;

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
            this.attackSpeed += 0.5;
        } else if (value == 1) {
            this.size += 1;
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

module.exports = Sniper;