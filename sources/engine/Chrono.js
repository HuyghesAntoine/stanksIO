// Chrono class
// Create an intern chronometer that can be use if the factory and bonus classes.
class Chrono {
    constructor() {
        this.start = Date.now();
    }

    reset() {
        this.start = Date.now();
    }

    isOver(time) {
        return Date.now() - this.start > time;
    }
}

module.exports = Chrono;