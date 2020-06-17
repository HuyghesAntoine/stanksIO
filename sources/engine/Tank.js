//ajouter la class level
const Level = require('./Level');
const Bullet = require('./Bullet');
const Entity = require('./Entity');
const Gun = require('./Gun');

class Tank extends Entity {
    constructor(id) {
        super(10, 800/2, 800/2,3, '#' + ((1 << 24) * Math.random() | 0).toString(16), 800);
        this.id = id;
        this.pseudo = "noname";
        this.gun = new Gun(this.mapSize);
        this.direction = 0;
        this.speed = 10;
        this.attack = 1;
        this.attackSpeed = 1;
        this.level = new Level();
    }

    isOut(x, y) {
        return !(x > (this.size / 2) && x < (this.mapSize - (this.size / 2)) && y > (this.size / 2) && y < (this.mapSize - (this.size / 2)));
    }

    move(direction) {
        let xMove = this.x + (Math.cos(direction) * this.speed);
        let yMove = this.y + (Math.sin(direction) * this.speed);
        if (!this.isOut(xMove, yMove)) {
            this.x = xMove;
            this.y = yMove;
        }
    }

    shoot(direction) {
        this.direction = direction;
        this.gun.shoot(new Bullet(this));
    }

    changePseudo(val){
        this.pseudo = val;
    }
    Alive(){
        if(this.health <= 0)
            return false;
    }
}

module.exports = Tank;