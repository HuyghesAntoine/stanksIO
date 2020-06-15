//ajouter la class level
const Level = require('./Level');
const Bullet = require('./Bullet');

class Tank {
    constructor(name) {
        this.name = name;
        this.size = 10;
        this.coor = [0, 0];
        this.direction = 0;
        this.health = 3;
        this.speed = 1;
        this.attack = 1;
        this.attackSpeed = 1;
        this.level = new Level();
    }

    move(direction) {
        this.direction = direction;

        if (direction == 0 || direction == 1 || direction == 7) //droite
            this.coor[0] += this.speed;
        else if (direction == 3 || direction == 4 || direction == 5) //droite
            this.coor[0] -= this.speed;
        else if (direction == 1 || direction == 2 || direction == 3) //droite
            this.coor[1] += this.speed;
        else if (direction == 5 || direction == 6 || direction == 7) //droite
            this.coor[1] -= this.speed;
    }

    shoot() {
        return new Bullet(this.attack, this.direction);
    }
}