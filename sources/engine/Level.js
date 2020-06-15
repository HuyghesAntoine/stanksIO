class Level {
    constructor() {
        this.levelNumber = 1;
        this.xp = 0;
        this.xpNeeded = 100;
    }
    levelUp(xp){
        this.xp += xp;
        if (this.xp >= this.xpNeeded){
            this.levelNumber++;
            this.xp = 0;
            this.xpNeeded *= 1.1;
            return true;
        }
        return false;
    }
}