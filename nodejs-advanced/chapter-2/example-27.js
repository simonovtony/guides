
// function Logger(name) {
//     this.name = name;
// }

// Logger.prototype.log = function (message) {
//     console.log(`[${this.name}] ${message}`);
// };

// Logger.prototype.info = function (message) {
//     this.log(`info: ${message}`);
// }

// Logger.prototype.verbose = function (message) {
//     this.log(`verbose: ${message}`);
// };

// module.exports = Logger;

class Logger {
    constructor(name) {
        this.name = name;
    }

    log(message) {
        console.log(`[${this.name}] ${message}`);
    }

    info(message) {
        this.log(`info: ${message}`);
    }

    verbose(message) {
        this.log(`verbose: ${message}`);
    }
}

module.exports = Logger;