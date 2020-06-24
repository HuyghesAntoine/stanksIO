// Entity class : it represents an entity in the map (tank, bullet, xp bullets, hearts)
class Entity {
    // Constructor that need a size, positions, health points, color, and the size of the map. 
    constructor(size, x, y, health, color, mapSizeX, mapSizeY) {
        this.health = health; // entity's health
        this.maxHealth = health; // entity's health
        this.size = size; // entity's radius
        this.x = x; // entity's x position
        this.y = y; // entity's y position
        this.color = color; // entity's color
        this.mapSizeX = mapSizeX; // useful to know the map limits
        this.mapSizeY = mapSizeY; // useful to know the map limits
    }

    // Allow an entity to move in x and y coordinate
    move(x, y) {
        this.x += x;
        this.y += y;
    }
    // Return entity's health points if bellow or equal to 0.
    isDead() {
        return this.health <= 0;
    }

    // Check if the entity is out of the map borders. 
    isOut() {
        return !(this.x > (this.size / 2) && this.x < (this.mapSizeX - (this.size / 2)) && this.y > (this.size / 2) && this.y < (this.mapSizeY - (this.size / 2)));
    }

    // Check if the entity is touched.
    touch(entity) {
        let x = this.x - entity.x;
        let y = this.y - entity.y;
        let dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (dist < (this.size + entity.size)) {
            return true;
        }
        return false;
    }
}

module.exports = Entity;