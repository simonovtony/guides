
exports.loaded = false;

const b = require('./example-21'); // './b'

module.exports = {
    bWasLoaded: b.loaded,
    loaded: true
};