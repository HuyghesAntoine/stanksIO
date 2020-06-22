class Evolution {
    constructor(evolutions){
        this.evolutions = evolutions;
        this.levelNeeded = 2;
        this.indice = 0;
    }
    add(direction){
        this.evolutions.push(direction);
    }
    evolute(level){
        let directions = new Array();
        while (level >= this.levelNeeded){
            if (this.evolutions.length<=0){
                break;
            }
            else {
                directions.push(this.evolutions[0]);
                this.evolutions.splice(0,1);
                this.levelNeeded += 1;  
            }
        }
        return directions;
    }
}

module.exports = Evolution;