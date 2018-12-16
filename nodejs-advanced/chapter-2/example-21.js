
exports.loaded = false;

const a = require('./example-20'); // './a'

module.exports = {
    aWasLoaded: a.loaded,
    loaded: true
};