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