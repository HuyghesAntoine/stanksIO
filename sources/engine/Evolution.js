class Evolution {
    constructor(evolutions){
        this.evolutions = evolutions;
        this.levelNeeded = 5;
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
                this.levelNeeded += 5;  
            }
        }
        return directions;
    }
}

module.exports = Evolution;