// Chrono class
// Create an intern chronometer that can be use if the factory and bonus classes.
class Chrono {
    // the chrono starts when instanciated
    constructor() {
        this.start = Date.now();
    }

    // resests the chrono
    reset() {
        this.start = Date.now();
    }

    // checks if time is over
    isOver(time) {
        return Date.now() - this.start > time;
    }
}

module.exports = Chrono;