//ajouter la class level
const Level = require('./Level');
const Bullet = require('./Bullet');
const Entity = require('./Entity');
const Gun = require('./Gun');
const Chrono = require('./Chrono');

// a tank is an entity with many other functions (shoot, upgrade, heal ...)
class Tank extends Entity {
    constructor(id, socketid, color, mapSizeX, mapSizeY) {
        super(20, 800 / 2, 800 / 2, 3, color, mapSizeX, mapSizeY);
        this.x = getRandom(0 + this.size, this.mapSizeX - this.size); // to spawn with random position
        this.y = getRandom(0 + this.size, this.mapSizeY - this.size);
        this.id = id; // useful to gear socket
        this.socketId = socketid; // useful to gear socket
        this.gun = new Array(); // an array that contains all the tank's canons
        this.gun.push(new Gun(this.mapSizeX, this.mapSizeY, 0)); // add a primary canon to the gun
        this.chrono = new Chrono(); // useful to shoot at every ammount of time
        this.level = new Level(); // tank's level
        this.direction = 0; // tank's diretion (in radians)
        this.look = getRandom(0, 2 * Math.PI); // gun's direction (in radians)
        this.score = 0; // tank's score
        this.isMoving = false; // useful to know if the tank is moving
        this.invincibleChrono = new Chrono(); // useful to be invicible many seconds when respawn
        this.invincible = true;
    }

    // checks if the tank is out at x and y positions
    isOut(x, y) {
        return !(x > (this.size / 2) && x < (this.mapSizeX - (this.size / 2)) && y > (this.size / 2) && y < (this.mapSizeY - (this.size / 2)));
    }

    // gears the movement of the tank: the tank slides on a border instead of stopping 
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

    // add a munition to each canon of the tank's gun when the chrono is over, then reset the chrono
    shoot() {
        if (this.chrono.isOver(this.attackSpeed)) {
            this.gun.forEach(canon => {
                canon.shoot(new Bullet(this, canon.direction));
            });
            this.chrono.reset();
        }
    }

    // gears when the pseudo is submitted
    changePseudo(val) {
        if (val == '') this.pseudo = 'noname';
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

    // return true if the tank is alive, false if not
    Alive() {
        if (this.health <= 0)
            return false;
        else
            return true;
    }

    // checks if the tank's gun touches another tank body or tank bullet
    // if a bullet touches the enemy tank, he loses hp
    // if a bullet touches one of the enemy tank's bullets, both bullets lose size
    // if a bullet is too small, delete it
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
                        entity.loseHealth(canon.ammos[i].damage);
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

    // make the tank lose hp if not invincible
    loseHealth(damage){
        if (this.invincible == false){
            this.health -= damage;
        }
    }

    // gear all the possible upgrades, increase tank's size and consume an xpPoint
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

    // after 2 seconds, the tank isn't invincible anymore
    isInvicible(){
        if (this.invincible){
            if (this.invincibleChrono.isOver(2000)){
                this.invincible = false;
            }
        }
    }

    // heals 2 hp or less
    heal() {
        let heal = 2;
        this.health = (this.health + heal >= this.maxHealth) ? this.maxHealth : this.health + heal;
    }

    // returns the tank's score when killed
    getScore() {
        return Math.floor((this.score / 2) + 500);
    }

    // returns the tank's xp when killed
    getXp() {
        return this.level.levelNumber * 50;
    }

    // add a canon to the tank's gun in a defined direction
    addCanon(direction) {
        this.gun.push(new Gun(this.mapSizeX, this.mapSizeY, direction));
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Tank;