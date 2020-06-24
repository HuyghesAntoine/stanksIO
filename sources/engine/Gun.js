const Bullet = require('./Bullet');

// une arme est un tableau de balles
class Gun {
    constructor(mapSizeX, mapSizeY, direction) {
        this.ammos = new Array();
        this.mapSizeX = mapSizeX;
        this.mapSizeY = mapSizeY;
        this.direction = direction;
    }

    // tirer avec une arme revient à ajouter une balle dans le tableau ammos
    shoot(ammo) {
        this.ammos.push(ammo);
    }

    // gère le mouvement et la suppression de toutes les balles dans le tableau
    moveAll() {
        if (this.ammos.length > 0) {
            for (let i = 0; i < this.ammos.length; i++) {
                this.ammos[i].move();
                //if (this.ammos[i].move() || this.ammos[i].isOut())
                //    this.remove(i);
            }
        }
    }

    // gère la collision de toutes les balles avec une certaine entité
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
