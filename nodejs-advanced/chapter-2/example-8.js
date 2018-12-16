
const fs = require('fs');
const cache = {};

function consistentReadSync(filename) {
    if (cache[filename]) {
        return cache[filename];
    } else {
        cache[filename] = fs.readFileSync(filename, 'utf8');
        return cache[filename];
    }
}

module.exports = consistentReadSync;

/*
console.log( consistentReadSync('./data/data.txt') );
console.log( consistentReadSync('./data/data.txt') );
*/