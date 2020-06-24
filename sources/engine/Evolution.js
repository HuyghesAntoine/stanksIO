class Evolution {
    // an evolution is an array of directions (in radians)
    // when a tank evolutes, it takes the first element of the Array (a direction),
    // it creates a new canon with this direction,
    // it removes the first element in the Array
    constructor(evolutions){
        this.evolutions = evolutions;
        this.levelNeeded = 5;
        this.indice = 0;
    }

    // add a direction in the array
    add(direction){
        this.evolutions.push(direction);
    }

    // checks if one ore more evolution are ready at a given level and store it/them in an Array
    // returns the array of directions
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