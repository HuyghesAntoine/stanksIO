// Level class
class Level {
    constructor(bonus = 1) {
        this.mult = bonus; // Multiplicator for exp points 
        this.levelNumber = 1; // Set the base level on 1 
        this.xp = 0; // Set the xp to 0 points, empty bar
        this.xpNeeded = 100; // Set the default exp needed to 100 points 
        this.xpPoint = 0; // Set the number of upgrades that you can make to 0
    }
    // Function that add exp points 
    addXp(xp){
        let realXp = xp*this.mult;
        while (true){ // Level up the player if he has enough exp 
            if (this.xp + realXp >= this.xpNeeded){
                realXp -= (this.xpNeeded - this.xp);
                this.xp = this.xpNeeded;
                this.levelUp();
            }
            else {
                this.xp += realXp;
                this.levelUp();
                break;
            }

        }
    }

    changeMult(mult){
        this.mult = mult;
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