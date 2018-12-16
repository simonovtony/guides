
// function Logger(name) {
//     if (!(this instanceof Logger)) {
//         return new Logger(name);
//     }
//     this.name = name;
// }

function Logger(name) {
    if (!new.target) {
        return new Logger(name);
    }
    this.name = name;
}

Logger.prototype.log = function (message) {
    console.log(`[${this.name}] ${message}`);
};

Logger.prototype.verbose = function (message) {
    this.log(`verbose: ${message}`);
};

module.exports = Logger;