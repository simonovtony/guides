
const fs = require('fs');
const cache = {};

function inconsistentRead(filename, callback) {
    if (cache[filename]) {
        // вызывается синхронно
        callback(cache[filename]);
    } else {
        // асинхронная функция
        fs.readFile(filename, 'utf8', (err, data) => {
            cache[filename] = data;
            callback(data);
        });
    }
}

module.exports = inconsistentRead;

//////////////////////////////////////////////////////////
/*
inconsistentRead('./data/data.txt', result => {
    console.log('асинхронный вызов');
    console.log(result);
    inconsistentRead('./data/data.txt', result => {
        console.log('синхронный вызов');
        console.log(result);
    });
});
*/