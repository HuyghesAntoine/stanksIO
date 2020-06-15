//ajouter la class level
const Level = require('./Level');
const Bullet = require('./Bullet');

class Tank extends Entity{
    constructor(name) {
        color = '#'+((1<<24)*Math.random()|0).toString(16); //random color
        super(10, 0, 0, color, 800);
        
        this.name = name;

        this.direction = 0;
        this.speed = 1;
        this.attack = 1;
        this.attackSpeed = 1;
        this.level = new Level();
    }

    move(direction) {
        this.direction = direction;

        if (direction == 0 || direction == 1 || direction == 7) 
            this.coor[0] += this.speed;
        else if (direction == 3 || direction == 4 || direction == 5)
            this.coor[0] -= this.speed;
        else if (direction == 1 || direction == 2 || direction == 3)
            this.coor[1] += this.speed;
        else if (direction == 5 || direction == 6 || direction == 7)
            this.coor[1] -= this.speed;
    }

    shoot() {
        return new Bullet(this.attack, this.direction);
    }
}