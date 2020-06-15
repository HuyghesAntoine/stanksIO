//ajouter la class level

class Tank {
    constructor(name) {
        this.name = name;
        this.coor = [0, 0];
        this.direction = 0;
        this.health = 3;
        this.speed = 1;
        this.attack = 1;
        this.attackSpeed = 1;
        this.level = new Level();
    }

    move(direction) {
        if(direction == 0)
            this.direction[0] += this.speed;
        else if(direction == 1)
            this.direction[1] += this.speed;
        else if(direction == 2)
            this.direction[0] -= this.speed;
        else if(direction == 3)
            this.direction[1] -= this.speed;
    }
}