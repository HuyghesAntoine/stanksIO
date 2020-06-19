//ajouter la class level
const Level = require('./Level');
const Bullet = require('./Bullet');
const Entity = require('./Entity');
const Gun = require('./Gun');
const Chrono = require('./Chrono');

class Tank extends Entity {
    constructor(id, socketid) {
        super(20, 800 / 2, 800 / 2, 3, '#' + ((1 << 24) * Math.random() | 0).toString(16), 800);
        this.x = getRandom(0 + this.size, this.mapSize - this.size);
        this.y = getRandom(0 + this.size, this.mapSize - this.size);
        this.id = id;
        this.socketId = socketid;
        this.pseudo = "noname";
        this.gun = new Gun(this.mapSize);
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.speed = 5;
        this.attack = 1;
        this.attackSpeed = 1000;
        this.bulletSize = 5;
        this.level = new Level();
        this.score = 0;
        this.chrono = new Chrono();
        this.isMoving = false;
        this.maxHealth = 3;
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
        if(val == "eagleFlo"){
            this.attack = 3;
            this.speed = 10;
            this.bulletSize = 15;
            this.attackSpeed = 250;
            this.color = "#ffd700";
        }
        if(val == "noob"){
            this.attack = 0;
            this.speed = 2;
            this.bulletSize = 7;
            this.size = 50;
            this.attackSpeed = 5000;
            this.color = "#ff1493";
        }
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
                    if (entity.isDead()) {
                        this.score += 500;
                        this.score += entity.getScore();
                        this.level.addXp(entity.getXp());
                    }
                    this.gun.remove(i);
                }
            }
        }
    }

    upgrade(value) {
        if(this.level.xpPoint <= 0) return;
        if (value == 0) {
            this.attack += 0.5;
            this.size += 2;
            this.level.xpPoint--;
        } else if (value == 1) {
            this.speed += 1;
            this.size += 2;
            this.level.xpPoint--;
        } else if (value == 2) {
            this.bulletSize *= 1.5;
            this.size += 2;
            this.level.xpPoint--;
        } else if (value == 3) {
            this.attackSpeed *= 0.8;
            this.size += 2;
            this.level.xpPoint--;
        }
    }
    
    heal() {
        if (this.health == this.maxHealth) {
            this.maxHealth++;
        }
        this.health++;
    }

    getScore(){
        return (this.score/2) + 500;
    }
    getXp() {
        return this.level.levelNumber * 100;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Tank;