class Evolution {
    constructor(){
        this.evolutions = new Array();
        this.levelNeeded = 5;
        this.indice = 0;
    }
    add(direction){
        this.evolutions.push(direction);
    }
    evolute(level){
        directions = new Array();
        while (level >= this.levelNeeded){
            if (this.evolutions.length<=0){
                break;
            }
            else {
                direction.push(this.evolutions[0]);
                this.evolutions.splice(0,1);
                this.levelNeeded += 5;  
            }
        }
        return directions;
    }
}

module.exports = Evolution;