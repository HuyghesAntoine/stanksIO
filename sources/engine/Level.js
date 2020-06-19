class Level {
    constructor() {
        this.levelNumber = 1;
        this.xp = 0;
        this.xpNeeded = 100;
        this.xpPoint = 0;
    }

    addXp(xp){
        this.xp += xp;
        this.levelUp();
    }
    
    levelUp(){
        if (this.xp >= this.xpNeeded){
            this.xpPoint++;
            this.levelNumber++;
            this.xp = 0;
            this.xpNeeded *= 1.1;
            return true;
        }
        return false;
    }
}
module.exports = Level;