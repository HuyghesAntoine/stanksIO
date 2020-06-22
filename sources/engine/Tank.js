//ajouter la class level
const Level = require('./Level');
const Bullet = require('./Bullet');
const Entity = require('./Entity');
const Gun = require('./Gun');
const Chrono = require('./Chrono');

class Tank extends Entity {
    constructor(id, socketid, color, cls) {
        super(20, 800 / 2, 800 / 2, 3, color, 800);
        const myUpgrade = ["TANK", "TANK", "TANK", "TANK"];
        this.x = getRandom(0 + this.size, this.mapSize - this.size);
        this.y = getRandom(0 + this.size, this.mapSize - this.size);
        this.id = id;
        this.socketId = socketid;
        this.gun = new Array();
        this.gun.push(new Gun(this.mapSize, 0));
        this.gun.push(new Gun(this.mapSize, Math.PI));
        this.chrono = new Chrono();
        this.level = new Level();
        this.attackSpeed = 100;
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
                canon.shoot(new Bullet(this, canon.direction));
            });
            this.chrono.reset();
        }
    }

    changePseudo(val) {
        if (val == "eagleFlo") {
            this.attack = 3;
            this.speed = 10;
            this.bulletSize = 15;
            this.bulletSpeed = 10;
            this.attackSpeed = 250;
            this.color = "#ffd700";
        }
        if (val == "grimtous") {
            this.health = 6;
            this.maxHealth = 6;
            this.attack = 3;
            this.speed = 2;
            this.bulletSize = 15;
            this.bulletSpeed = 10;
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
                    entity.gun.forEach(canonEntity => {
                        for (let j = 0; j < canonEntity.ammos.length; j++) {
                            if (canon.ammos[i].touch(canonEntity.ammos[j])) {
                                canonEntity.remove(j);
                                rm = true;
                                break;
                            }
                        }
                    });
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

    upgrade(i) {
        if (this.level.xpPoint <= 0) return;
        let value = this.myUpgrade[i];
        if (value == "ATTACK") {
            this.attack += 0.5;
        } else if (value == "SPEED") {
            this.speed += 1;
        } else if (value == "BULLETSIZE") {
            this.bulletSize += 1;
        } else if (value == "ATTACKSPEED") {
            this.attackSpeed *= 0.9;
        } else if (value=="BULLETSPEED"){
            this.bulletSpeed += 1;
        } else if (value=="HEALTH"){
            this.healh += 2;
            this.maxHealth += 2;
        } else if(value=="XP"){
            this.level.changeMult(this.level.mult * 1.1);
        } else if (value=="ALPHA"){

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
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Tank;