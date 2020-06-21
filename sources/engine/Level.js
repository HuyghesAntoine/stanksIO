// Level class
class Level {
    constructor() {
        this.levelNumber = 1;
        this.xp = 0;
        this.xpNeeded = 100;
        this.xpPoint = 0;
    }
    // Function that add exp points 
    addXp(xp){
        this.xp += xp;
        this.levelUp();
    }
    // Function that check if the amount of exp is enough to gain a level. 
    levelUp(){
        if (this.xp >= this.xpNeeded){
            this.xpPoint++;
            this.levelNumber++; // Increase the level number for html 
            this.xp = 0; // Set exp  to 0
            this.xpNeeded *= 1.1; // Increase the amount of exp needed for next level up
            return true;
        }
        return false;
    }
}
module.exports = Level;