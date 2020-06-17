class Level {
    constructor() {
        this.levelNumber = 1;
        this.xp = 0;
        this.xpNeeded = 100;
    }

    addXp(xp){
        this.xp += xp;
    }
    
    levelUp(){
        if (this.xp >= this.xpNeeded){
            this.levelNumber++;
            this.xp = 0;
            this.xpNeeded *= 1.1;
            return true;
        }
        return false;
    }
}
module.exports = Level;