//ajouter la class level
const Level = require('./Level');
const Bullet = require('./Bullet');
const Entity = require('./Entity');
const Gun = require('./Gun');
const Chrono = require('./Chrono');

class Tank extends Entity {
    constructor(id, socketid, color, cls) {
        super(20, 800 / 2, 800 / 2, 3, color, 800);
        this.x = getRandom(0 + this.size, this.mapSize - this.size);
        this.y = getRandom(0 + this.size, this.mapSize - this.size);
        this.id = id;
        this.socketId = socketid;
        this.gun = new Array();
        this.gun.push(new Gun(this.mapSize, 0));
        this.gun.push(new Gun(this.mapSize, Math.PI));
        if (cls == "cls1") this.masto();
        if (cls == "cls2") this.hunter();
        if (cls == "cls3") this.farmer();
        if (cls == "cls4") this.sniper();
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
        else if (this.isOut(xMove, this.x) && !this.isOut(this.x, yMove)) {
            console.log('depasse en x');
            this.y = yMove;
        }
        else if (this.isOut(this.x, yMove) && !this.isOut(xMove, this.y)) {
            console.log('depasse en y');
            this.x = xMove;
        }
    }

    shoot() {
        if (this.chrono.isOver(this.attackSpeed)) {
            this.gun.forEach(canon => {
                canon.shoot(new Bullet(this,canon.direction));
            });
            //this.gun.shoot(new Bullet(this));
            this.chrono.reset();
        }

    }

    changePseudo(val) {
        if (val == "eagleFlo") {
            this.attack = 3;
            this.speed = 10;
            this.bulletSize = 15;
            this.attackSpeed = 250;
            this.color = "#ffd700";
        }
        if (val == "grimtous") {
            this.health = 6;
            this.maxHealth = 6;
            this.attack = 3;
            this.speed = 2;
            this.bulletSize = 15;
            this.size = 40;
            this.attackSpeed = 3000;
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
        this.gun.forEach(canon => {
            if (canon.ammos.length > 0) {
                let rm = false;
                for (let i = 0; i < canon.ammos.length; i++) {

                    // bullet vs entity bullet
                    entity.gun.forEach(canonEntity => {
                        for (let j = 0; j < canonEntity.ammos.length; j++) {
                            if (canon.ammos[i].touch(canonEntity.ammos[j])) {
                                canonEntity.remove(j);
                                rm = true;
                                break;
                            }
                        }
                    });

                    // bullet vs entity
                    if (canon.ammos[i].touch(entity)) {
                        entity.health -= canon.ammos[i].damage;
                        if (entity.isDead()) {
                            this.score += entity.getScore();
                            this.level.addXp(entity.getXp());
                        }
                        rm = true;
                    }
                    if (rm)
                        canon.remove(i);
                }
            }

        });

    }

    upgrade(value) {
        if (this.level.xpPoint <= 0) return;
        if (value == 0) {
            this.attack += 0.5;
        } else if (value == 1) {
            this.speed += 1;
        } else if (value == 2) {
            this.bulletSize *= 1.5;
        } else if (value == 3) {
            this.attackSpeed *= 0.8;
        }
        this.size += 2;
        this.level.xpPoint--;
    }

    heal() {
        if (this.health == this.maxHealth) {
            this.maxHealth++;
        }
        this.health++;
    }

    getScore() {
        return (this.score / 2) + 500;
    }
    getXp() {
        return this.level.levelNumber * 100;
    }

    masto() {
        this.pseudo = "noname";
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.level = new Level();
        this.score = 0;
        this.chrono = new Chrono();
        this.isMoving = false;
        this.maxHealth = 5;
        this.size = 30;
        this.speed = 2;
        this.attack = 1.5;
        this.bulletSize = 10;
        this.attackSpeed = 1000;
    }

    hunter() {
        this.pseudo = "noname";
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.level = new Level();
        this.score = 0;
        this.chrono = new Chrono();
        this.isMoving = false;
        this.maxHealth = 3;
        this.size = 20;
        this.speed = 8;
        this.attack = 0.7;
        this.bulletSize = 5;
        this.attackSpeed = 500;
    }

    farmer() {
        this.pseudo = "noname";
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.level = new Level();
        this.score = 0;
        this.chrono = new Chrono();
        this.isMoving = false;
        this.maxHealth = 2;
        this.size = 20;
        this.speed = 3;
        this.attack = 0.5;
        this.bulletSize = 5;
        this.attackSpeed = 1500;
    }

    sniper() {
        this.pseudo = "noname";
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.level = new Level();
        this.score = 0;
        this.chrono = new Chrono();
        this.isMoving = false;
        this.maxHealth = 3;
        this.size = 15;
        this.speed = 5;
        this.attack = 2;
        this.bulletSize = 17;
        this.attackSpeed = 3000;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Tank;