
const fs = require('fs');

function readJSONThrows(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        // нет ошибок, передаются только данные
        callback(null, JSON.parse(data));
    });
}

readJSONThrows('./data/data.txt', err => console.log(err));

module.exports = readJSONThrows;