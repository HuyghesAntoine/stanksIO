//ajouter la class level
const Level = require('./Level');
const Bullet = require('./Bullet');
const Entity = require('./Entity');
const Gun = require('./Gun');
const Chrono = require('./Chrono');

class Tank extends Entity {
    constructor(id, socketid) {
        super(20, 800 / 2, 800 / 2, 3, '#' + ((1 << 24) * Math.random() | 0).toString(16), 800);
        this.x = getRandom(0+this.size , this.mapSize-this.size);
        this.y = getRandom(0+this.size , this.mapSize-this.size);
        this.id = id;
        this.socketId = socketid;
        this.pseudo = "noname";
        this.gun = new Gun(this.mapSize);
        this.direction = 0;
        this.look = getRandom(0,2*Math.PI);
        this.speed = 5;
        this.attack = 1;
        this.attackSpeed = 1000;
        this.level = new Level();
        this.score = 0;
        this.chrono = new Chrono();
        this.isMoving = false;
    }

    isOut(x, y) {
        return !(x > (this.size / 2) && x < (this.mapSize - (this.size / 2)) && y > (this.size / 2) && y < (this.mapSize - (this.size / 2)));
    }

    move() {
        let xMove = this.x + (Math.cos(this.direction) * this.speed);
        let yMove = this.y + (Math.sin(this.direction) * this.speed);
        if (!this.isOut(xMove, yMove)) {
            this.x = xMove;
            this.y = yMove;
        }
    }

    shoot() {
        if (this.chrono.isOver(this.attackSpeed)) {
            this.gun.shoot(new Bullet(this));
            this.chrono.reset();
        }

    }

    changePseudo(val) {
        this.pseudo = val;
    }

    scorePlayer(value) {
        const score = document.getElementById("score");
        this.score += value;
        score.innerHTML = this.score;
    }

    Alive() {
        if (this.health <= 0)
            return false;
        else
            return true;
    }

    touchAll(entity) {
        if (this.gun.ammos.length > 0) {
            for (let i = 0; i < this.gun.ammos.length; i++) {
                if (this.gun.ammos[i].touch(entity)) {
                    entity.health -= this.gun.ammos[i].damage;
                    if (entity.isDead()){
                        this.score += 500;
                    }
                    this.gun.remove(i);
                }
            }
        }
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Tank;