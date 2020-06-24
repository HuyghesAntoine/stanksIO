//ajouter la class level
const Level = require('./Level');
const Bullet = require('./Bullet');
const Entity = require('./Entity');
const Gun = require('./Gun');
const Chrono = require('./Chrono');

class Tank extends Entity {
    constructor(id, socketid, color, mapSizeX, mapSizeY) {
        super(20, 800 / 2, 800 / 2, 3, color, mapSizeX, mapSizeY);
        const myUpgrade = ["TANK", "TANK", "TANK", "TANK"];
        this.x = getRandom(0 + this.size, this.mapSizeX - this.size);
        this.y = getRandom(0 + this.size, this.mapSizeY - this.size);
        this.id = id;
        this.socketId = socketid;
        this.gun = new Array();
        this.gun.push(new Gun(this.mapSizeX, this.mapSizeY, 0));
        this.chrono = new Chrono();
        this.level = new Level();
        this.direction = 0;
        this.look = getRandom(0, 2 * Math.PI);
        this.score = 0;
        this.isMoving = false;
    }

    isOut(x, y) {
        return !(x > (this.size / 2) && x < (this.mapSizeX - (this.size / 2)) && y > (this.size / 2) && y < (this.mapSizeY - (this.size / 2)));
    }

    move() {
        let xMove = this.x + (Math.cos(this.direction) * this.speed);
        let yMove = this.y + (Math.sin(this.direction) * this.speed);
        if (!this.isOut(xMove, yMove)) {
            this.x = xMove;
            this.y = yMove;
        }
        else if (this.isOut(xMove, this.x) && !this.isOut(this.x, yMove)) {
            this.y = yMove;
        }
        else if (this.isOut(this.x, yMove) && !this.isOut(xMove, this.y)) {
            this.x = xMove;
        }
    }

    shoot() {
        if (this.chrono.isOver(this.attackSpeed)) {
            this.gun.forEach(canon => {
                canon.shoot(new Bullet(this, canon.direction));
            });
            //this.gun.shoot(new Bullet(this));
            this.chrono.reset();
        }
    }

    changePseudo(val) {
        if (val == '') {
            console.log('pseudo vide');
            this.pseudo = 'noname';
        }
        else {
            if (val == "eagleFlo") {
                this.attack = 3;
                this.speed = 10;
                this.bulletSize = 15;
                this.bulletSpeed = 10;
                this.attackSpeed = 250;
                this.color = "#ffd700";
            }
            if (val == "grimtous") {
                this.attack = 5;
                this.speed = 4;
                this.bulletSize = 30;
                this.bulletSpeed = 10;
                this.size = 40;
                this.attackSpeed = 1500;
                this.color = "#ff1493";
            }
            this.pseudo = val;
        }
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
                    entity.gun.forEach(canonEntity => {
                        for (let j = 0; j < canonEntity.ammos.length; j++) {
                            if (canon.ammos[i].touch(canonEntity.ammos[j])) {
                                canon.ammos[i].size -= 2;
                                canonEntity.ammos[j].size -= 2;
                                if (canon.ammos[i].size <= 3) rm = true;
                                if (canonEntity.ammos[j].size <= 3) canonEntity.remove(j);
                                break;
                            }
                        }
                    });
                    if (rm == false && canon.ammos[i].touch(entity)) {
                        rm = true;
                        entity.health -= canon.ammos[i].damage;
                        if (entity.isDead()) {
                            this.score += entity.getScore();
                            this.level.addXp(entity.getXp());
                        }
                    }
                    if (rm) canon.remove(i);
                }
            }
        });
    }

    upgrade(i) {
        if (this.level.xpPoint <= 0) return;
        let value = this.myUpgrade[i];
        if (value == "ATTACK") {
            this.attack += 0.15;
        } else if (value == "SPEED") {
            this.speed += 0.15;
        } else if (value == "BULLETSIZE") {
            this.bulletSize += 0.5;
        } else if (value == "ATTACKSPEED") {
            this.attackSpeed *= 0.95;
        } else if (value == "BULLETSPEED") {
            this.bulletSpeed += 0.25;
        } else if (value == "HEALTH") {
            this.healh += 2;
            this.maxHealth += 2;
        } else if (value == "XP") {
            this.level.changeMult(this.level.mult * 1.1);
        }
        this.size += 0.5;
        this.level.xpPoint--;
    }

    heal() {
        if (this.health < this.maxHealth) {
            this.health += 2.5;
        }
    }

    getScore() {
        return Math.floor((this.score / 2) + 500);
    }
    getXp() {
        return this.level.levelNumber * 50;
    }
    addCanon(direction) {
        this.gun.push(new Gun(this.mapSizeX, this.mapSizeY, direction));
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Tank;