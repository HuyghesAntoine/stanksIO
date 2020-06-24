const Bullet = require('./Bullet');

// a gun is a bullet array
class Gun {
    constructor(mapSizeX, mapSizeY, direction) {
        this.ammos = new Array(); // an array of bullets
        this.mapSizeX = mapSizeX; // useful to check if a bullet is out of map
        this.mapSizeY = mapSizeY; // useful to check if a bullet is out of map
        this.direction = direction; // direction of the gun
    }

    // shoot = add a bullet to the gun
    shoot(ammo) {
        this.ammos.push(ammo);
    }

    // make all the gun's bullets move
    moveAll() {
        if (this.ammos.length > 0) {
            for (let i = 0; i < this.ammos.length; i++) {
                this.ammos[i].move();
            }
        }
    }

    // checks if the gun's bullets are touching another entity
    touchAll(entity) {
        if (this.ammos.length > 0) {
            for (let i = 0; i < this.ammos.length; i++) {
                if (this.ammos[i].touch(entity)) {
                    entity.health -= this.ammos[i].damage;
                    this.remove(i);
                }
            }
        }
    }

    // supprime toutes les balles
    removeAll() {
        for (let i = 0; i < this.ammos.length; i++) {
            if (this.ammos[i].isOut() || this.ammos[i].isDead())
                this.remove(i);
        }
    }

    // supprime la balle à l'indice i du tableau et de la scène
    remove(i) {
        this.ammos.splice(i, 1);
    }
}

module.exports = Gun;
